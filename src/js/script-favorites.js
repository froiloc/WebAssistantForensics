/**
 * Favorites Sidebar Manager
 * Handles the favorites sidebar tab with folder organization and management
 * @version 1.0.0
 * @license MIT
 */

(function() {
    'use strict';

    const MODULE = 'FAVORITES';

    // Check dependencies
    if (typeof window.LOG === 'undefined') {
        console.error(`${MODULE}: LOG object not available. Favorites Manager disabled.`);
        return;
    }

    LOG.debug(MODULE, 'Favorites Manager: Script loading started');

    // Private variables
    let _isInitialized = false;
    let _favoritesContainer = null;
    let _currentFolder = 'default';
    let unsubscribeFromHistory = null;

    // Configuration
    // Configuration
    const CONFIG = {
        selectors: {
            sidebar: '#sidebar-favorites',
            header: '#sidebar-favorites .sidebar-subheader',
            body: '#sidebar-favorites .sidebar-body',
            footer: '#sidebar-favorites .sidebar-footer',
            favoritesList: '#favorites-list',
            folderNav: '#favorites-folder-nav',
            emptyState: '#favorites-empty-state',
            folderTabs: '.favorites-folder-tab',
            favoriteItems: '.favorite-item',
            favoriteLinks: '.favorite-link',
            favoriteRemoveBtns: '.favorite-remove-btn'
        },
        classes: {
            active: 'active',
            hidden: 'hidden',
            favoriteItem: 'favorite-item',
            favoriteLink: 'favorite-link',
            favoriteActive: 'favorite--active',
            folderActive: 'favorites-folder-tab--active'
        },
        templates: {
            favoriteItem: (favorite) => `
                <li class="favorite-item" data-section="${favorite.sectionId}" data-favorite-id="${favorite.id}">
                <button class="favorite-link" data-section="${favorite.sectionId}">
                <span class="favorite-item-title">${favorite.sectionName}</span>
                <span class="favorite-item-meta">
                <span class="favorite-item-path">${favorite.sectionPath}</span>
                <span class="favorite-item-access">• ${favorite.accessCount || 0} Zugriffe</span>
                </span>
                </button>
                <button class="favorite-action favorite-action--edit"
                data-favorite-id="${favorite.id}"
                aria-label="Favorite bearbeiten">
                🖉
                </button>
                <button class="favorite-action favorite-remove-btn"
                data-favorite-id="${favorite.id}"
                aria-label="Favorit entfernen">
                🗑️
                </button>
                </li>
                `
        },
        i18n: {
            de: {
                today: 'Heute',
                yesterday: 'Gestern',
                daysAgo: 'Vor %d Tagen',
                weeksAgo: 'Vor %d Wochen',
                monthsAgo: 'Vor %d Monaten'
            }
        }
    };

    // ============================================================
    //  Favorites List Rendering Function
    // ============================================================

    function renderFavoritesList(folderId = 'default') {
        const favorites = window.StateManager.get('favorites.items') || [];
        const folderFavorites = favorites.filter(fav => fav.folderId === folderId);

        const emptyState = document.querySelector(CONFIG.selectors.emptyState);
        const favoritesList = document.querySelector(CONFIG.selectors.favoritesList);

        if (folderFavorites.length === 0) {
            // Show empty state, hide list
            emptyState.classList.remove(CONFIG.classes.hidden);
            favoritesList.classList.add(CONFIG.classes.hidden);
            return;
        }

        // Hide empty state, show list
        emptyState.classList.add(CONFIG.classes.hidden);
        favoritesList.classList.remove(CONFIG.classes.hidden);

        // Render favorites into the pre-existing list
        favoritesList.innerHTML = folderFavorites.map(favorite =>
        CONFIG.templates.favoriteItem(favorite)
        ).join('');

        attachFavoritesEventListeners();
    }

    function updateFolderTab(folderId) {
        // Update active states on folder tabs
        document.querySelectorAll(CONFIG.selectors.folderTabs).forEach(tab => {
            const isActive = tab.dataset.folderId === folderId;
            tab.classList.toggle(CONFIG.classes.folderActive, isActive);
            tab.setAttribute('aria-selected', isActive.toString());
        });
    }

    // ============================================================
    //  Add/Remove Favorites functions
    // ============================================================

    function addFavorite(sectionId, sectionName = null, sectionPath = null) {
        const favorites = window.StateManager.get('favorites.items') || [];

        // Check if already favorited
        const existingFavorite = favorites.find(fav =>
        fav.sectionId === sectionId && fav.folderId === 'default'
        );

        if (existingFavorite) {
            Toast.show('Bereits als Favorit gespeichert', 'info');
            return;
        }

        const newFavorite = {
            id: generateId(),
            sectionId: sectionId,
            sectionName: sectionName || getSectionDisplayName(sectionId),
            sectionPath: sectionPath || sectionId,
            folderId: 'default',
            createdAt: new Date().toISOString(),
            accessCount: 0,
            lastAccessed: null
        };

        favorites.push(newFavorite);
        window.StateManager.set('favorites.items', favorites);

        // Update UI
        renderFavoritesList();
        Toast.show('Als Favorit gespeichert', 'success');
    }

    function removeFavorite(favoriteId) {
        const favorites = window.StateManager.get('favorites.items') || [];
        const updatedFavorites = favorites.filter(fav => fav.id !== favoriteId);

        window.StateManager.set('favorites.items', updatedFavorites);
        renderFavoritesList();
        Toast.show('Favorit entfernt', 'info');
    }

    // ============================================================
    //  Helper functions
    // ============================================================

    function getSectionDisplayName(sectionId) {
        // This should map section IDs to display names
        // You might want to pull this from your navigation data
        const sectionNames = {
            'template-selection': 'Template-Auswahl',
            'artifact-filtering': 'Artifact-Filterung',
            'export-formats': 'Export-Formate im Detail',
            'common-mistakes': 'Häufige Fehler vermeiden'
        };

        return sectionNames[sectionId] || sectionId;
    }

    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function attachFavoritesEventListeners() {
        // Favorite item click handlers - using SectionManagement
        _favoritesContainer.querySelectorAll(CONFIG.selectors.favoriteLink).forEach(link => {
            link.addEventListener('click', (e) => {
                const sectionId = e.currentTarget.dataset.section;

                // Use the correct navigation method
                if (window.SectionManagement && window.SectionManagement.scrollToSection) {
                    window.SectionManagement.scrollToSection(sectionId);
                } else {
                    LOG.error(MODULE, 'SectionManagement not available');
                    Toast.show('Navigation nicht verfügbar', 'error');
                }
            });
        });

        // Remove button handlers
        _favoritesContainer.querySelectorAll(CONFIG.selectors.favoriteRemoveBtns).forEach(btn => {
                btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the favorite-link click
                const favoriteId = e.currentTarget.dataset.favoriteId;
                removeFavorite(favoriteId);
            });
        });
    }

    function syncFavoriteAccessForHistoryEntry(historyEntry) {
        const favorites = window.StateManager.get('favorites.items') || [];
        const sectionId = historyEntry.sectionId;

        // Check if this section is favorited
        const favoriteIndex = favorites.findIndex(fav => fav.sectionId === sectionId);

        if (favoriteIndex !== -1) {
            LOG.debug(MODULE, `Incrementing access count for favorite: ${sectionId}`);

            // Increment the favorite's access count
            const updatedFavorites = [...favorites];
            updatedFavorites[favoriteIndex] = {
                ...updatedFavorites[favoriteIndex],
                accessCount: (updatedFavorites[favoriteIndex].accessCount || 0) + 1,
                lastAccessed: historyEntry.timestamp || new Date().toISOString()
            };

            window.StateManager.set('favorites.items', updatedFavorites);

            // Update UI if favorites sidebar is visible
            if (isFavoritesSidebarActive()) {
                renderFavoritesList();
            }
        }
    }

    function initializeFavoritesHistorySync() {
        console.log('🎯 initializeFavoritesHistorySync() called!'); // Debug log

        // Subscribe to history.entries changes
        unsubscribeFromHistory = window.StateManager.subscribe('history.entries', (newEntries, oldEntries) => {
            LOG.debug(MODULE, 'History entries changed:', {
                oldLength: oldEntries?.length || 0,
                newLength: newEntries?.length || 0
            });

            // Check if a new entry was added (not just modified)
            if (newEntries && oldEntries && newEntries.length > oldEntries.length) {
                // Find the new entry (assuming newest is first in array)
                const newEntry = newEntries[0];
                if (newEntry) {
                    syncFavoriteAccessForHistoryEntry(newEntry);
                }
            }
        });

        LOG.success(MODULE, 'Favorites history sync initialized');
    }

    function isFavoritesSidebarActive() {
        return document.querySelector(CONFIG.selectors.sidebar)?.classList.contains(CONFIG.classes.active);
    }

    function initializeFavorites() {
        LOG(MODULE, 'Initializing favorites...');

        // Use CONFIG selector for consistency
        const favoritesContainer = document.querySelector(CONFIG.selectors.sidebar);
        if (!favoritesContainer) {
            LOG.error(MODULE, 'Favorites container not found');
            return;
        }

        // Store reference for other functions to use
        _favoritesContainer = favoritesContainer;

        // Initialize history sync
        initializeFavoritesHistorySync();

        // Render initial list
        renderFavoritesList();
        attachFavoritesEventListeners();

        // Mark as initialized
        _isInitialized = true;

        LOG.success(MODULE, 'Favorites initialized');
    }

    function destroyFavorites() {
        // Clean up observer when favorites system is destroyed
        if (unsubscribeFromHistory) {
            unsubscribeFromHistory();
            unsubscribeFromHistory = null;
            LOG.debug(MODULE, 'Favorites history sync destroyed');
        }

        // Optional: Reset initialization state
        _isInitialized = false;
        _favoritesContainer = null;
    }

    /**
    * Formats relative time for display
    * TODO use later or delete
    */
    function formatRelativeTime(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return CONFIG.i18n.de.today;
        if (diffDays === 1) return CONFIG.i18n.de.yesterday;
        if (diffDays < 7) return CONFIG.i18n.de.daysAgo.replace('%d', diffDays);
        if (diffDays < 30) return CONFIG.i18n.de.weeksAgo.replace('%d', Math.floor(diffDays / 7));
        return CONFIG.i18n.de.monthsAgo.replace('%d', Math.floor(diffDays / 30));
    }

    /**
    * Refreshes the favorites display
    */
    function refresh() {
        if (_isInitialized) {
            renderFavoritesList(_currentFolder);
        }
    }

    /**
     * Initializes the favorites manager
     */
    function init() {
        LOG.debug(MODULE, 'Favorites Manager: init() called');

        // Shortcut beim SidebarManager registrieren
        if (window.SidebarManager) {
            const registered = window.SidebarManager.registerShortcut('favorites', 'f');

            if (registered) {
                LOG.success(MODULE, 'Shortcut Alt+f registered with SidebarManager');
            } else {
                LOG.warn(MODULE, 'Shortcut Alt+f already taken');
            }
        } else {
            LOG.error(MODULE, 'SidebarManager not available!');
        }

        if (_isInitialized) {
            LOG.debug(MODULE, 'Favorites Manager: Already initialized');
            return true;
        }

        try {
            // Get container from the DOM, just like navigation and history do
            _favoritesContainer = document.querySelector(CONFIG.selectors.sidebar);

            if (!_favoritesContainer) {
                LOG.error(MODULE, 'Favorites Manager: Favorites container not found');
                return false;
            }

            // Initial render
            initializeFavorites();
            _isInitialized = true;

            LOG.success(MODULE, 'Favorites Manager initialized successfully');
            return true;

        } catch (error) {
            LOG.error(MODULE, 'Favorites Manager: Initialization failed:', error);
            return false;
        }
    }

    // AUTO-INITIALIZE ON SCRIPT LOAD, following the same pattern
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM is already ready, initialize immediately
        init();
    }

    // Export to global scope if needed for direct access
    window.FavoritesManager = {
        init: init,
        refresh: refresh,
        removeFavorite, removeFavorite,
        isInitialized: () => _isInitialized
    };

    LOG.debug(MODULE, 'Favorites Manager: Module loaded and auto-initialization scheduled');

})();
