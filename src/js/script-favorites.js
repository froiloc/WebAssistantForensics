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
            sections: 'main section.content-section',
            sidebar: '#sidebar-favorites',
            header: '#sidebar-favorites .sidebar-subheader',
            body: '#sidebar-favorites .sidebar-body',
            footer: '#sidebar-favorites .sidebar-footer',
            favoritesList: '#favorites-list',
            favoritesSkeleton: '#favorites-skeleton',
            folderNav: '#favorites-folder-nav',
            emptyState: '#favorites-empty-state',
            favoritesSuggestionsContainer: '.favorites-suggestions-container',
            suggestionButtons: '.favorites-empty-suggestion',
            emptyStateHint: '.favorites-empty-hint',
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
            folderActive: 'favorites-folder-tab--active',
            loading: 'favorite--loading',
            removing: 'favorite--removing',
            success: 'favorite--success',
            disabled: 'favorite--disabled'
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
                aria-label="Lesezeichen bearbeiten">
                🖉
                </button>
                <button class="favorite-action favorite-remove-btn"
                data-favorite-id="${favorite.id}"
                aria-label="Lesezeichen entfernen">
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
                monthsAgo: 'Vor %d Monaten',
                navigationFailed: 'Navigation zu "%s" fehlgeschlagen',
                navigationUnavailable: 'Navigation nicht verfügbar',
                sectionNotFound: 'Abschnitt "%s" nicht gefunden',
                favoriteRemoved: 'Lesezeichen entfernt',
                favoriteAlreadySaved: 'Bereits als Lesezeichen gespeichert',
                savedAsFavorite: 'Als Lesezeichen gespeichert'
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
        const skeleton = document.querySelector(CONFIG.selectors.favoritesSkeleton);

        // Always hide skeleton first
        hideSkeletonLoading();

        if (folderFavorites.length === 0) {
            // Update with dynamic suggestions before showing
            updateEmptyStateSuggestions();
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

        updateFolderBadgeCounts();
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
        // Show immediate visual feedback
        showFavoriteLoadingState(sectionId);

        const favorites = window.StateManager.get('favorites.items') || [];

        // Check if already favorited
        const existingFavorite = favorites.find(fav =>
            fav.sectionId === sectionId && fav.folderId === 'default'
        );

        if (existingFavorite) {
            hideFavoriteLoadingState(sectionId);
            Toast.show(CONFIG.i18n.de.favoriteAlreadySaved, 'info');
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

        // After success, show confirmation
        hideFavoriteLoadingState(sectionId);
        showFavoriteSuccessState(newFavorite.id);

        // Update UI
        renderFavoritesList();
        Toast.show(CONFIG.i18n.de.savedAsFavorite, 'success');
    }

    function removeFavorite(favoriteId) {
        const favoriteItem = document.querySelector(`[data-favorite-id="${favoriteId}"]`);

        if (favoriteItem) {
            // Add removing class for smooth animation
            favoriteItem.classList.add(CONFIG.classes.removing);

            // Wait for animation to complete before actual removal
            setTimeout(() => {
                const favorites = window.StateManager.get('favorites.items') || [];
                const updatedFavorites = favorites.filter(fav => fav.id !== favoriteId);
                window.StateManager.set('favorites.items', updatedFavorites);
                renderFavoritesList();
                Toast.show(CONFIG.i18n.de.favoriteRemoved, 'info');
            }, 300); // Match CSS transition duration
        } else {
            // Fallback if DOM element not found
            const favorites = window.StateManager.get('favorites.items') || [];
            const updatedFavorites = favorites.filter(fav => fav.id !== favoriteId);
            window.StateManager.set('favorites.items', updatedFavorites);
            renderFavoritesList();
            Toast.show(CONFIG.i18n.de.favoriteRemoved, 'info');
        }
    }

    // ============================================================
    //  Favorite Status Check
    // ============================================================

    function isSectionFavorited(sectionId) {
        const favoritesState = window.StateManager.get('favorites');
        if (!favoritesState || !favoritesState.items) return false;

        return favoritesState.items.some(item =>
        item.sectionId === sectionId && item.folderId === 'default'
        );
    }

    // ============================================================
    //  Toggle Favorite Function
    // ============================================================

    function toggleFavorite(sectionId) {
        window.LOG.debug('Favorites', `Toggling favorite for section: ${sectionId}`);

        // Show immediate visual feedback
        showFavoriteLoadingState(sectionId);

        // Get current favorites state with proper defaults
        const favoritesState = window.StateManager.get('favorites') || {
            version: '1.0',
            items: [],
            folders: [
                {
                    id: 'default',
            name: 'Favoriten',
            created: new Date().toISOString()
                }
            ],
            lastUpdated: new Date().toISOString()
        };

        // Check if section is already favorited in default folder
        const existingFavorite = favoritesState.items.find(item =>
            item.sectionId === sectionId && item.folderId === 'default'
        );

        if (existingFavorite) {
            // Remove existing favorite
            window.LOG.debug('Favorites', `Removing existing favorite: ${existingFavorite.id}`);
            removeFavorite(existingFavorite.id);
        } else {
            // Add new favorite
            window.LOG.debug('Favorites', `Adding new favorite for section: ${sectionId}`);
            addFavorite(sectionId);
        }

        // Loading state will be cleared by addFavorite/removeFavorite functions
    }

    // ============================================================
    //  visual feedback functions
    // ============================================================

    function showFavoriteLoadingState(sectionId) {
        const favoriteItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (favoriteItem) {
            favoriteItem.classList.add(CONFIG.classes.loading, CONFIG.classes.disabled);
        }
    }

    function hideFavoriteLoadingState(sectionId) {
        const favoriteItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (favoriteItem) {
            favoriteItem.classList.remove(CONFIG.classes.loading, CONFIG.classes.disabled);
        }
    }

    function showFavoriteSuccessState(favoriteId) {
        const favoriteItem = document.querySelector(`[data-favorite-id="${favoriteId}"]`);
        if (favoriteItem) {
            favoriteItem.classList.add(CONFIG.classes.success);
            setTimeout(() => {
                favoriteItem.classList.remove(CONFIG.classes.success);
            }, 2000); // Remove after 2 seconds
        }
    }

    function updateFolderBadgeCounts() {
        const favorites = window.StateManager.get('favorites.items') || [];

        // Count favorites in default folder
        const defaultCount = favorites.filter(fav => fav.folderId === 'default').length;
        const defaultBadge = document.getElementById('favorites-default-count');

        if (defaultBadge) {
            defaultBadge.textContent = defaultCount;
            // Hide badge if count is 0
            defaultBadge.style.display = defaultCount > 0 ? 'inline-block' : 'none';
        }
    }

    // ============================================================
    //  Smart Empty State Suggestions
    // ============================================================

    function getSmartEmptyStateSuggestions(length = 2) {
        const favorites = window.StateManager.get('favorites.items') || [];
        const history = window.StateManager.get('history.entries') || [];

        // Get all available sections from DOM
        const sectionElements = document.querySelectorAll(CONFIG.selectors.sections);
        if (sectionElements.length === 0) {
            LOG.debug(MODULE, 'No content sections found in DOM for suggestions');
            return []; // Return empty array
        }

        const favoritedIds = new Set(favorites.map(fav => fav.sectionId));

        // Convert DOM elements to section objects
        const navigationSections = Array.from(sectionElements).map(section => {
            // Use data-section attribute instead of id
            const sectionId = section.dataset.section || ('section-' + section.id);

            // Prefer data-title attribute, fallback to getSectionDisplayName
            const displayName = getSectionDisplayNameFromElement(section);

            return {
                id: sectionId,
                name: displayName,
                level: 1 // Assume all are level 1 for now
            };
        });

        // Score sections based on multiple factors
        const sectionScores = {};

        // Initialize all navigation sections that aren't already favorited
        navigationSections.forEach(section => {
            if (!favoritedIds.has(section.id)) {
                sectionScores[section.id] = {
                    id: section.id,
                    name: section.name,
                    score: 0
                };

                // Base score for being a section
                sectionScores[section.id].score += 5;

                // Bonus for being a main section (we assume all are level 1 for now)
                sectionScores[section.id].score += 10;
            }
        });

        // If no sections available after filtering favorites, return empty
        if (Object.keys(sectionScores).length === 0) {
            return [];
        }

        // Add history-based scores (recent and frequent visits)
        history.forEach(entry => {
            if (sectionScores[entry.sectionId]) {
                // Recent visits get higher scores
                const entryTime = new Date(entry.timestamp);
                const daysAgo = (new Date() - entryTime) / (1000 * 60 * 60 * 24);
                const recencyBonus = Math.max(0, 10 - daysAgo); // Up to 10 points for recency

                sectionScores[entry.sectionId].score += recencyBonus + 2; // +2 for each visit
            }
        });

        // Get top scored sections (shuffle a bit for variety)
        const scoredSections = Object.values(sectionScores)
            .sort((a, b) => b.score - a.score)
            .slice(0, length * 2); // Get top 4 for variety

        // Randomly select 2 from top 4 for variety between visits
        const shuffled = scoredSections.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, length);
    }

    // Enhanced name extraction
    function getSectionDisplayNameFromElement(sectionElement) {
        // 1. First try data-title attribute
        if (sectionElement.dataset.title) {
            return sectionElement.dataset.title;
        }

        // 2. Try to find the first heading inside the section
        const heading = sectionElement.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
            return heading.textContent.trim();
        }

        // 3. Fallback to ID-based name
        return getSectionDisplayName(sectionElement.id);
    }

    function updateEmptyStateSuggestions() {
        const suggestionsContainer = document.querySelector(CONFIG.selectors.favoritesSuggestionsContainer);
        const suggestionButtons = suggestionsContainer.querySelectorAll(CONFIG.selectors.suggestionButtons);
        const emptyStateHint = document.querySelector(CONFIG.selectors.emptyStateHint);

        if (!suggestionsContainer || !emptyStateHint) {
            LOG.debug(MODULE, 'Empty state suggestion elements not found');
            return;
        }

        const suggestedSections = getSmartEmptyStateSuggestions(suggestionButtons.length);

        // Hide everything first
        suggestionsContainer.classList.add(CONFIG.classes.hidden);
        emptyStateHint.classList.add(CONFIG.classes.hidden);
        suggestionButtons.forEach(btn => btn.classList.add(CONFIG.classes.hidden));

        if (suggestedSections.length === 0) {
            // Show helpful message
            emptyStateHint.classList.remove(CONFIG.classes.hidden);
            LOG.debug(MODULE, 'No suggestions available, showing guidance message');
            return;
        }

        // Show suggestion container
        suggestionsContainer.classList.remove(CONFIG.classes.hidden);

        // Show and update available suggestion buttons
        suggestedSections.forEach((section, index) => {
            if (suggestionButtons[index]) {
                const button = suggestionButtons[index];
                button.textContent = section.name;
                button.dataset.section = section.id;

                // ✅ Add tooltip with full title
                button.setAttribute('data-tooltip', section.name);
                button.setAttribute('aria-label', `Navigiere zu: ${section.name}`);

                button.classList.remove(CONFIG.classes.hidden);
            }
        });

        LOG.debug(MODULE, `Updated empty state with ${suggestedSections.length} suggestions`, suggestedSections);
    }

    // ============================================================
    //  Skeleton functions
    // ============================================================

    function showSkeletonLoading() {
        const skeleton = document.querySelector(CONFIG.selectors.favoritesSkeleton);
        const favoritesList = document.querySelector(CONFIG.selectors.favoritesList);
        const emptyState = document.querySelector(CONFIG.selectors.emptyState);

        // Hide everything else, show skeleton
        favoritesList.classList.add(CONFIG.classes.hidden);
        emptyState.classList.add(CONFIG.classes.hidden);
        skeleton.classList.remove(CONFIG.classes.hidden);
    }

    function hideSkeletonLoading() {
        const skeleton = document.querySelector(CONFIG.selectors.favoritesSkeleton);
        skeleton.classList.add(CONFIG.classes.hidden);
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
        const favoritesContainer = document.querySelector(CONFIG.selectors.sidebar);
        if (!favoritesContainer) return;

        // Remove old listeners first (if any)
        favoritesContainer.removeEventListener('click', handleFavoritesClick);

        // ✅ Add SINGLE delegated listener that handles EVERYTHING:
        // - Favorite item clicks
        // - Remove button clicks
        // - Empty state suggestion clicks
        favoritesContainer.addEventListener('click', handleFavoritesClick);

        LOG.debug(MODULE, 'Favorites event listeners attached (single container approach)');
    }

    function handleFavoritesClick(e) {
        LOG.debug(MODULE, 'Click target:', e.target);
        LOG.debug(MODULE, 'Click target class:', e.target.className);

        // Handle favorite link clicks (from favorites list)
        if (e.target.closest(CONFIG.selectors.favoriteLink)) {
            const link = e.target.closest(CONFIG.selectors.favoriteLink);
            const sectionId = link.dataset.section;
            LOG.debug(MODULE, 'Empty state suggestion clicked:', sectionId);
            navigateToSection(sectionId);
        }

        // Handle empty state suggestion clicks
        else if (e.target.classList.contains('favorites-empty-suggestion')) {
            const sectionId = e.target.dataset.section;
            LOG.debug(MODULE, `Empty state suggestion clicked: ${sectionId}`);
            navigateToSection(sectionId);
        }

        // Handle remove button clicks
        else if (e.target.closest(CONFIG.selectors.favoriteRemoveBtns)) {
            const btn = e.target.closest(CONFIG.selectors.favoriteRemoveBtns);
            e.stopPropagation();
            const favoriteId = btn.dataset.favoriteId;
            removeFavorite(favoriteId);
        }
    }

    // Extract navigation logic to reusable function
    function navigateToSection(sectionId) {
        try {
            window.SectionManagement?.scrollToSection(sectionId);
        } catch (error) {
            LOG.error(MODULE, `Navigation to section ${sectionId} failed:`, error);

            let message;
            if (error.message.includes('not available')) {
                message = CONFIG.i18n.de.navigationUnavailable;
            } else if (error.message.includes('not found')) {
                message = CONFIG.i18n.de.sectionNotFound.replace('%s', sectionId);
            } else {
                message = CONFIG.i18n.de.navigationFailed.replace('%s', sectionId);
            }
            Toast.show(message, 'error');
        }
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
        LOG.debug(MODULE, 'initializeFavoritesHistorySync() called!');

        // Add safety check
        if (!window.StateManager || !window.StateManager.subscribe) {
            LOG.error(MODULE, 'StateManager subscription not available');
            return;
        }

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

        // ✅ CRITICAL: Attach the SINGLE event listener that handles everything
        attachFavoritesEventListeners();

        // Show skeleton loading immediately
        showSkeletonLoading();

        // Simulate loading delay
        setTimeout(() => {
            // 1. Render initial list first
            renderFavoritesList();

            // 2. THEN start watching history
            // Initialize history sync
            initializeFavoritesHistorySync();

            // Mark as initialized
            _isInitialized = true;

            LOG.success(MODULE, 'Favorites initialized');
        }, 800);
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
        if (_isInitialized) {
            LOG.warn(MODULE, 'Already initialized');
            return;
        }

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

    // ============================================================
    //  Public API Export
    // ============================================================

    // Export to global scope if needed for direct access
    window.FavoritesManager = {
        init: init,
        refresh: refresh,
        addFavorite: addFavorite,
        isSectionFavorited: isSectionFavorited,
        removeFavorite: removeFavorite,
        toggleFavorite: toggleFavorite,
        isInitialized: () => _isInitialized
    };
    LOG.debug('Favorites', 'FavoritesManager API exported with toggle support');

    LOG.debug(MODULE, 'Favorites Manager: Module loaded and auto-initialization scheduled');
})();
