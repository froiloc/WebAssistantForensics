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

    function toggleElementVisibility(selector, isVisible) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.toggle(CONFIG.classes.hidden, !isVisible);
        }
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

                    // Increment access count when navigating via favorites
                    incrementFavoriteAccessCount(sectionId);
                } else {
                    console.error('SectionManagement not available');
                    Toast.show('Navigation nicht verfügbar', 'error');
                }
            });
        });

        // Remove button handlers
        _favoritesContainer.querySelectorAll(CONFIG.selectors.favoriteLink).forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the favorite-link click
                const favoriteId = e.currentTarget.dataset.favoriteId;
                removeFavorite(favoriteId);
            });
        });
    }

    function incrementFavoriteAccessCount(sectionId) {
        const favorites = window.StateManager.get('favorites.items') || [];
        const updatedFavorites = favorites.map(favorite => {
            if (favorite.sectionId === sectionId) {
                return {
                    ...favorite,
                    accessCount: (favorite.accessCount || 0) + 1,
                    lastAccessed: new Date().toISOString()
                };
            }
            return favorite;
        });

        window.StateManager.set('favorites.items', updatedFavorites);

        // Optional: Re-render to update access count display
        renderFavoritesList();
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
        const favoritesSidebar = document.getElementById('sidebar-favorites');
        return favoritesSidebar && favoritesSidebar.classList.contains('active');
    }

    function getLastAccessTime(sectionId, historyEntries) {
        const sectionEntries = historyEntries.filter(entry => entry.sectionId === sectionId);
        if (sectionEntries.length > 0) {
            // Return the most recent timestamp
            return sectionEntries.reduce((latest, entry) =>
            entry.timestamp > latest ? entry.timestamp : latest, ''
            );
        }
        return null;
    }

    function initializeFavoritesAccessSync() {
        // Observe history changes in StateManager
        window.StateManager.observe('history.entries', (newHistory, oldHistory) => {
            if (newHistory.length !== oldHistory.length) {
                // History changed - sync favorite access counts
                syncFavoriteAccessCounts();
            }
        });

        // Initial sync
        syncFavoriteAccessCounts();
    }

    function initializeFavorites() {
        LOG(MODULE, 'Initializing favorites...');

        const favoritesContainer = document.getElementById('sidebar-favorites');
        if (!favoritesContainer) {
            LOG.error(MODULE, 'Favorites container not found');
            return;
        }

        // Initialize history sync
        initializeFavoritesHistorySync();

        // Render initial list
        renderFavoritesList();

        LOG.success(MODULE, 'Favorites initialized');
    }

    function destroyFavorites() {
        // Clean up observer when favorites system is destroyed
        if (unsubscribeFromHistory) {
            unsubscribeFromHistory();
            unsubscribeFromHistory = null;
            LOG.debug(MODULE, 'Favorites history sync destroyed');
        }
    }

    /**
    * Renders the favorites sidebar content
    */
    function renderFavorites() {
        LOG.debug(MODULE, 'Favorites Manager: Rendering favorites sidebar');

        if (!_favoritesContainer) {
            LOG.warn(MODULE, 'Favorites Manager: Container not available for rendering');
            return;
        }

        const favorites = StateManager.getFavorites(_currentFolder);
        const folders = StateManager.getFolders();

        LOG.debug(MODULE, `Favorites Manager: Rendering ${favorites.length} favorites in folder "${_currentFolder}"`);

        // Build HTML structure
        _favoritesContainer.innerHTML = `
        <div class="sidebar-header">
            <div class="favorites-folder-nav">
                ${renderFolderNavigation(folders)}
            </div>
        </div>
        <div class="favorites-content">
            ${favorites.length > 0 ? renderFavoritesList(favorites) : renderEmptyState()}
        </div>
        `;

        // Add event listeners
        attachFavoritesEventListeners();

        LOG.debug(MODULE, 'Favorites Manager: Favorites sidebar rendered successfully');
    }

    /**
    * Renders folder navigation
    */
    function renderFolderNavigation(folders) {
        return folders.map(folder => `
        <button class="favorites-folder-tab ${folder.id === _currentFolder ? 'favorites-folder-tab--active' : ''}"
        data-folder-id="${folder.id}"
        aria-label="Ordner anzeigen: ${folder.name}">
        ${folder.name}
        </button>
        `).join('');
    }

    /**
    * Renders the favorites list
    */
    function renderFavoritesList(favorites) {
        return `
        <ul class="favorites-list" role="list">
        ${favorites.map(favorite => `
            <li class="favorite-item" data-favorite-id="${favorite.id}">
            <button class="favorite-link" data-favorite-id="${favorite.id}">
            <span class="favorite-title">${escapeHtml(favorite.title)}</span>
            <div class="favorite-meta">
            <span class="favorite-access-count">${favorite.accessCount} Zugriffe</span>
            <span class="favorite-last-accessed">${formatRelativeTime(favorite.lastAccessed)}</span>
            </div>
            </button>
            <div class="favorite-actions">
            <button class="favorite-action favorite-action--edit"
            data-favorite-id="${favorite.id}"
            aria-label="Favorite bearbeiten">
            🖉
            </button>
            <button class="favorite-action favorite-action--remove"
            data-favorite-id="${favorite.id}"
            aria-label="Favorite entfernen">
            🗑
            </button>
            </div>
            </li>
            `).join('')}
            </ul>
            `;
    }

    /**
    * Renders empty state
    */
    function renderEmptyState() {
        return `
        <div class="favorites-empty-state">
        <p class="favorites-empty-message">Noch keine Favoriten</p>
        <p class="favorites-empty-hint">Fügen Sie Favoriten hinzu, indem Sie auf das Stern-Symbol ★ in der Navigation klicken.</p>
        </div>
        `;
    }

    /**
    * Attaches event listeners to favorites elements
    */
    function attachFavoritesEventListeners() {
        // Folder tab clicks
        const folderTabs = _favoritesContainer.querySelectorAll(CONFIG.selectors.favoritesFolderTab);
        folderTabs.forEach(tab => {
            tab.addEventListener('click', handleFolderTabClick);
        });

        // Favorite link clicks
        const favoriteLinks = _favoritesContainer.querySelectorAll(CONFIG.selectors.favoriteLink);
        favoriteLinks.forEach(link => {
            link.addEventListener('click', handleFavoriteClick);
        });

        // Edit button clicks
        const editButtons = _favoritesContainer.querySelectorAll(CONFIG.selectors.favoriteActionEdit);
        editButtons.forEach(button => {
            button.addEventListener('click', handleEditClick);
        });

        // Remove button clicks
        const removeButtons = _favoritesContainer.querySelectorAll(CONFIG.selectors.favoriteActionRemove);
        removeButtons.forEach(button => {
            button.addEventListener('click', handleRemoveClick);
        });

        // Keyboard navigation
        _favoritesContainer.addEventListener('keydown', handleKeyboardNavigation);
    }

    /**
    * Handles folder tab clicks
    */
    function handleFolderTabClick(event) {
        const folderId = event.currentTarget.getAttribute('data-folder-id');
        LOG.debug(MODULE, `Favorites Manager: Switching to folder: ${folderId}`);

        _currentFolder = folderId;
        renderFavorites();

        event.preventDefault();
        event.stopPropagation();
    }

    /**
    * Handles favorite item clicks (navigation)
    */
    function handleFavoriteClick(event) {
        const favoriteId = event.currentTarget.getAttribute('data-favorite-id');
        LOG.debug(MODULE, `Favorites Manager: Navigating to favorite: ${favoriteId}`);

        const favorite = StateManager.getFavorite(favoriteId);
        if (favorite) {
            // Increment access count
            StateManager.incrementFavoriteAccess(favoriteId);

            // Navigate to section (using same pattern as navigation)
            navigateToSection(favorite.selector, favorite.sectionId);

            // Show toast confirmation
            Toast.show(`Zu "${favorite.title}" navigiert`, 'success', 2000);
        }

        event.preventDefault();
        event.stopPropagation();
    }

    /**
    * Handles edit button clicks
    */
    function handleEditClick(event) {
        const favoriteId = event.currentTarget.getAttribute('data-favorite-id');
        LOG.debug(MODULE, `Favorites Manager: Edit favorite: ${favoriteId}`);

        // TODO: Implement edit modal in Phase 1.5
        Toast.show('Bearbeitungsfunktion folgt in Phase 1.5', 'info', 3000);

        event.preventDefault();
        event.stopPropagation();
    }

    /**
    * Handles remove button clicks
    */
    function handleRemoveClick(event) {
        const favoriteId = event.currentTarget.getAttribute('data-favorite-id');
        LOG.debug(MODULE, `Favorites Manager: Remove favorite: ${favoriteId}`);

        const favorite = StateManager.getFavorite(favoriteId);
        if (favorite && confirm(`Möchten Sie "${favorite.title}" aus den Favoriten entfernen?`)) {
            StateManager.removeFavorite(favoriteId);
            renderFavorites(); // Re-render after removal
            Toast.show(`"${favorite.title}" aus Favoriten entfernt`, 'success', 2000);
        }

        event.preventDefault();
        event.stopPropagation();
    }

    /**
    * Handles keyboard navigation
    */
    function handleKeyboardNavigation(event) {
        // Implement similar keyboard navigation as navigation sidebar
        if (event.key === 'Enter' || event.key === ' ') {
            const focused = document.activeElement;
            if (focused.classList.contains('favorite-link')) {
                event.preventDefault();
                focused.click();
            }
        }
    }

    /**
    * Navigates to a section (reusing navigation patterns)
    */
    function navigateToSection(selector, sectionId) {
        LOG.debug(MODULE, `Favorites Manager: Navigating to section: ${sectionId}`);

        // Use existing navigation system if available
        if (window.Navigation && typeof window.Navigation.navigateToSection === 'function') {
            window.Navigation.navigateToSection(sectionId);
        } else {
            // Fallback: scroll to element
            const element = document.querySelector(selector);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    /**
    * Formats relative time for display
    */
    function formatRelativeTime(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Heute';
        if (diffDays === 1) return 'Gestern';
        if (diffDays < 7) return `Vor ${diffDays} Tagen`;
        if (diffDays < 30) return `Vor ${Math.floor(diffDays / 7)} Wochen`;
        return `Vor ${Math.floor(diffDays / 30)} Monaten`;
    }

    /**
    * Escapes HTML to prevent XSS
    */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
    * Refreshes the favorites display
    */
    function refresh() {
        if (_isInitialized) {
            renderFavorites();
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
            _favoritesContainer = document.querySelector(CONFIG.selectors.body);

            if (!_favoritesContainer) {
                LOG.error(MODULE, 'Favorites Manager: Favorites container not found');
                return false;
            }

            // Initial render
            renderFavorites();

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
        isInitialized: () => _isInitialized
    };

    LOG.debug(MODULE, 'Favorites Manager: Module loaded and auto-initialization scheduled');

})();
