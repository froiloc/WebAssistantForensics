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

    // Configuration
    const CONFIG = {
        selectors: {
            container: '#favorites-container',
            list: '.favorites-list',
            folderHeader: '.favorites-folder-header',
            folderList: '.favorites-folder-list',
            emptyState: '.favorites-empty-state'
        },
        classes: {
            favoriteItem: 'favorite-item',
            favoriteLink: 'favorite-link',
            favoriteMeta: 'favorite-meta',
            favoriteActions: 'favorite-actions',
            folderItem: 'favorite-folder-item',
            folderName: 'favorite-folder-name',
            activeFolder: 'favorite-folder--active'
        }
    };

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
        <div class="favorites-header">
        <h3 class="favorites-title">Favoriten</h3>
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
        const folderTabs = _favoritesContainer.querySelectorAll('.favorites-folder-tab');
        folderTabs.forEach(tab => {
            tab.addEventListener('click', handleFolderTabClick);
        });

        // Favorite link clicks
        const favoriteLinks = _favoritesContainer.querySelectorAll('.favorite-link');
        favoriteLinks.forEach(link => {
            link.addEventListener('click', handleFavoriteClick);
        });

        // Edit button clicks
        const editButtons = _favoritesContainer.querySelectorAll('.favorite-action--edit');
        editButtons.forEach(button => {
            button.addEventListener('click', handleEditClick);
        });

        // Remove button clicks
        const removeButtons = _favoritesContainer.querySelectorAll('.favorite-action--remove');
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

    // Public API
    const publicAPI = {
        /**
            * Initializes the favorites manager
            */
        init() {
            LOG.debug(MODULE, 'Favorites Manager: init() called');

            if (_isInitialized) {
                LOG.debug(MODULE, 'Favorites Manager: Already initialized');
                return true;
            }

            try {
                // Get container from SidebarManager
                _favoritesContainer = document.querySelector(CONFIG.selectors.container);

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
        },

        /**
        * Refreshes the favorites display
        */
        refresh,

        /**
        * Returns initialization status
        */
        isInitialized() {
            return _isInitialized;
        }
    };

    /**
     * Initializes the favorites manager
     */
    function init() {
        LOG.debug(MODULE, 'Favorites Manager: init() called');

        if (_isInitialized) {
            LOG.debug(MODULE, 'Favorites Manager: Already initialized');
            return true;
        }

        try {
            // Get container from the DOM, just like navigation and history do
            _favoritesContainer = document.getElementById('favorites-container');

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
