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
    let _unsubscribeFromHistory = null;
    let _unsubscribeFunctions = [];
    // Event target for native event system
    let _eventTarget;

    // ============================================================
    //  Event System Constants & Variables
    // ============================================================

    /**
     * Event types for favorites system
     * @constant
     */
    const FAVORITES_EVENTS = {
        CHANGED: 'favorites:changed',
        SECTION_STATUS: 'favorites:section-status',
        INITIALIZED: 'favorites:initialized',
        STATS_UPDATED: 'favorites:stats-updated'
    };

    // Configuration
    const CONFIG = {
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
            disabled: 'favorite--disabled',
            favoriteMain: 'favorite-main',
            favoriteRemoveBtn: 'favorite-remove-btn',
            favoriteDetails: 'favorite-details',
            detailsToggle: 'favorite-details-toggle',
            detailsToggleActive: 'favorite-details-toggle--active',
            accessStats: 'access-stats',
            statItem: 'stat-item',
            statLabel: 'stat-label',
            statValue: 'stat-value',
            favoritesEmptySuggestion: 'favorites-empty-suggestion',
            favoriteCreated: 'favorite-created',
            favoriteAccessCount: 'favorite-access-count',
            favoriteLastAccessed: 'favorite-last-accessed',
            folderDropdown: 'favorites-folder-dropdown',
            folderDropdownButton: 'favorites-folder-dropdown__button',
            folderDropdownMenu: 'favorites-folder-dropdown__menu',
            folderDropdownOpen: 'favorites-folder-dropdown--open',
            folderDropdownItems: 'favorites-folder-dropdown__items',
            folderDropdownItem: 'favorites-folder-dropdown__item',
            folderDropdownItemActive: 'favorites-folder-dropdown__item--active',
            folderDropdownCreate: 'favorites-folder-dropdown__create',
            folderDropdownEmpty: 'favorites-folder-dropdown__empty',
            folderDropdownDisabled: 'favorites-folder-dropdown--disabled',
            folderManagementButtons: 'favorites-folder-management__buttons',
            folderDropdownCurrent: 'favorites-folder-dropdown__current',
            folderDropdownFolderCount: 'favorites-folder-dropdown__folder-count',
            folderDropdownItemCount: 'favorites-folder-dropdown__item-count',
            folderRenameBtn: 'favorites-folder-rename',
            folderDeleteBtn: 'favorites-folder-delete',
            hidden: 'hidden',
            filteredOut: 'filtered-out'
        }
    };

    // Generate CONFIG.selectors from classes
    CONFIG.selectors = Object.keys(CONFIG.classes).reduce((acc, key) => {
        // Prepend '.' to the class value to create a class selector
        acc[key] = `.${CONFIG.classes[key]}`;
        return acc;
    }, {});

    // Extend/Modify CONFIG.selectors
    CONFIG.selectors = {
        ...CONFIG.selectors,
        // Add new, non-class selectors
        sections: 'main section.content-section',
        sidebar: '#sidebar-favorites',
        header: '#sidebar-favorites .sidebar-subheader',
        body: '#sidebar-favorites .sidebar-body',
        footer: '#sidebar-favorites .sidebar-footer',
        favoritesList: '#favorites-list',
        favoritesSkeleton: '#favorites-skeleton',
        folderNav: '#favorites-folder-nav',
        emptyState: '#favorites-empty-state',
    }

    // extend CONFIG with i18n
    CONFIG.i18n = {
        de: {
            today: 'Heute',
            yesterday: 'Gestern',
            daysAgo: (daysAgo) => `Vor ${daysAgo} Tagen`,
            weeksAgo: (weeksAgo) => `Vor ${weeksAgo} Wochen`,
            monthsAgo: (monthsAgo) => `Vor ${monthAgo} Monaten`,
            navigationFailed: (target) => `Navigation zu "${target}" fehlgeschlagen`,
            navigationUnavailable: 'Navigation nicht verfügbar',
            sectionNotFound: (target) => `Abschnitt "${target}" nicht gefunden`,
            favoriteRemoved: 'Lesezeichen entfernt',
            favoriteAlreadySaved: 'Bereits als Lesezeichen gespeichert',
            savedAsFavorite: 'Als Lesezeichen gespeichert',
            showStatistics: 'Zugriffsstatistiken anzeigen',
            accessCount: 'Zugriffe',
            lastAccessed: 'Letzter Zugriff',
            created: 'Erstellt',
            never: 'Nie',
            unknown: 'Unbekannt',
            editFavorite: 'Lesezeichen bearbeiten',
            removeFavorite: 'Lesezeichen entfernen',
            noCustomFolders: 'Erstellen Sie zuerst einen benutzerdefinierten Ordner',
            createFolder: 'Neuen Ordner erstellen',
            renameFolder: 'Ordner umbenennen',
            deleteFolder: 'Ordner löschen',
            folderManagement: 'Ordner verwalten',
            confirmDelete: (folderName) => `Möchten Sie den Ordner "${folderName}" wirklich löschen? Alle Lesezeichen werden in den Standardordner verschoben.`,
            enterFolderName: 'Ordnernamen eingeben',
            folderCreated: 'Ordner erstellt',
            folderRenamed: 'Ordner umbenannt',
            folderDeleted: 'Ordner gelöscht',
            folders: 'Ordner',
            favorites: 'Lesezeichen',
            renameFolderToast: 'Ordnernamen-Funktion wird in Phase 2 implementiert',
            deleteFolderToast: 'Ordner löschen-Funktion wird in Phase 2 implementiert',
            createFolderToast: 'Neuen Ordner erstellen-Funktion wird in Phase 2 implementiert'
        }
    };

    // extend CONFIG with templates
    CONFIG.templates = {
        favoriteItem: (favorite) => {
            // ✅ Extract sectionId from target for backward compatibility
            const sectionId = getSectionIdFromTarget(favorite.target);
            const displayName = favorite.title || CONFIG.i18n.de.unknown;
            // ✅ PROPERLY ENCODE the target for HTML attributes
            const encodedTarget = favorite.target.replace(/"/g, '&quot;');

            return `
            <li class="${CONFIG.classes.favoriteItem}" data-section="${sectionId}" data-favorite-id="${favorite.id}">
                <button class="${CONFIG.classes.favoriteLink}" data-target="${encodedTarget}">
                    <span class="favorite-item-title">${displayName}</span>
                    <span class="favorite-item-meta" hidden>
                    <span class="favorite-item-path">${favorite.target}</span>
                </button>
                <div class="favorite-actions">
                    <button class="favorite-action ${CONFIG.classes.detailsToggle}" aria-expanded="false" data-favorite-id="${favorite.id}" aria-label="${CONFIG.i18n.de.showStatistics}"></button>
                    <button class="favorite-action ${CONFIG.classes.favoriteEditBtn}" data-favorite-id="${favorite.id}" aria-label="${CONFIG.i18n.de.editFavorite}"></button>
                    <button class="favorite-action ${CONFIG.classes.favoriteRemoveBtn}" data-favorite-id="${favorite.id}" aria-label="${CONFIG.i18n.de.removeFavorite}"></button>
                    <!-- Statistics as last child of favorite-actions -->
                    <div class="${CONFIG.classes.favoriteDetails}">
                        ${StatisticsManager?.createStatisticsHTML(favorite)}
                    </div>
                </div>
            </li>
            `},
        subsectionFavorite: (favorite) => `
            <li class="${CONFIG.classes.favoriteItem} favorite-item--subsection" data-selector="${favorite.selector}" data-favorite-id="${favorite.id}">
                <button class="${CONFIG.classes.favoriteLink}" data-selector="${favorite.selector}">
                    <span class="favorite-item-title">${favorite.name}</span>
                    <span class="favorite-item-meta" hidden>
                    <span class="favorite-item-context">in ${favorite.sectionTitle}</span>
                </button>
                <div class="favorite-actions">
                    <button class="favorite-action ${CONFIG.classes.detailsToggle}" aria-expanded="false" data-favorite-id="${favorite.id}" aria-label="${CONFIG.i18n.de.showStatistics}"></button>
                    <button class="favorite-action ${CONFIG.classes.favoriteEditBtn}" data-favorite-id="${favorite.id}" aria-label="${CONFIG.i18n.de.editFavorite}"></button>
                    <button class="favorite-action ${CONFIG.classes.favoriteRemoveBtn}" data-favorite-id="${favorite.id}" aria-label="${CONFIG.i18n.de.removeFavorite}"></button>
                    <!-- Statistics as last child of favorite-actions -->
                    <div class="${CONFIG.classes.favoriteDetails}">
                        ${StatisticsManager?.createStatisticsHTML(favorite)}
                    </div>
                </div>
            </li>
            `,
        folderDropdownItem: (folder, isActive, favoriteCount) => `
            <button class="${CONFIG.classes.folderDropdownItem} ${isActive ? CONFIG.classes.folderDropdownItemActive : ''}" data-folder-id="${folder.id}" role="menuitem" aria-checked="${isActive}">
                <span class="favorites-folder-dropdown__item-name">${folder.name}</span>
                <span class="favorites-folder-dropdown__item-badge">${favoriteCount}</span>
                <div class="${CONFIG.classes.folderManagementButtons} ${CONFIG.classes.hidden}">
                    <button class="${CONFIG.classes.folderRenameBtn}" data-folder-id="${folder.id}" aria-label="${CONFIG.i18n.de.renameFolder}"></button>
                    <button class="${CONFIG.classes.folderDeleteBtn}" data-folder-id="${folder.id}" aria-label="${CONFIG.i18n.de.deleteFolder}"></button>
                </div>
            </button>
            `
    };

    // ========================================================================
    // FAVORITES STATISTICS - Expandable access statistics
    // ========================================================================

    const StatisticsManager = {
        /**
        * Create statistics HTML
        */
        createStatisticsHTML(favoriteData) {
            // ✅ Use meta data from new structure
            const lastAccessed = this.formatLastAccessed(favoriteData.meta?.lastAccessed);
            const accessCount = favoriteData.meta?.accessCount || 0;
            const createdAt = this.formatCreatedAt(favoriteData.meta?.createdAt);

            return `
                <div class="${CONFIG.classes.accessStats}">
                    <div class="${CONFIG.classes.statItem} ${CONFIG.classes.favoriteAccessCount}">
                        <span class="${CONFIG.classes.statLabel}">${CONFIG.i18n.de.accessCount}:</span>
                        <span class="${CONFIG.classes.statValue}">${accessCount}</span>
                    </div>
                    <div class="${CONFIG.classes.statItem} ${CONFIG.classes.favoriteLastAccessed}">
                        <span class="${CONFIG.classes.statLabel}">${CONFIG.i18n.de.lastAccessed}:</span>
                        <span class="${CONFIG.classes.statValue}">${lastAccessed}</span>
                    </div>
                    <div class="${CONFIG.classes.statItem} ${CONFIG.classes.favoriteCreated}">
                        <span class="${CONFIG.classes.statLabel}">${CONFIG.i18n.de.created}:</span>
                        <span class="${CONFIG.classes.statValue}">${createdAt}</span>
                    </div>
                </div>
            `;
        },

        /**
        * Update existing statistics display
        */
        updateStatistics(statsContainer, favoriteData) {
            const statItems = statsContainer.querySelectorAll(CONFIG.selectors.statItem);
            statItems.forEach(item => {
                const label = item.querySelector(CONFIG.selectors.statLabel)?.textContent;
                const valueElement = item.querySelector(CONFIG.selectors.statValue);

                if (label && valueElement) {
                    if (label.includes(CONFIG.i18n.de.accessCount)) {
                        valueElement.textContent = favoriteData.accessCount || 0;
                    } else if (label.includes(CONFIG.i18n.de.lastAccessed)) {
                        valueElement.textContent = this.formatLastAccessed(favoriteData.lastAccessed);
                    }
                }
            });
        },

        /**
        * Format last accessed date
        */
        formatLastAccessed(timestamp) {
            if (!timestamp) return CONFIG.i18n.de.never;

            // Use relative time formatting if available, otherwise simple date
            try {
                const date = new Date(timestamp);
                const now = new Date();
                const diffTime = Math.abs(now - date);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays < 1) return window.getRelativeTime(date);
                if (diffDays === 1) return CONFIG.i18n.de.yesterday;
                if (diffDays < 7) return CONFIG.i18n.de.daysAgo(diffDays);
                if (diffDays < 30) return CONFIG.i18n.de.weeksAgo(Math.floor(diffDays / 7));

                return date.toLocaleDateString('de-DE');
            } catch (e) {
                return CONFIG.i18n.de.unknown;
            }
        },

        /**
        * Format creation date
        */
        formatCreatedAt(timestamp) {
            if (!timestamp) return CONFIG.i18n.de.unknown;

            try {
                const date = new Date(timestamp);
                return date.toLocaleDateString('de-DE');
            } catch (e) {
                return CONFIG.i18n.de.unknown;
            }
        }
    };

    /**
     * Initialize statistics update bridge between section visits and favorites
     */
    function initStatisticsUpdateBridge() {
        if (!window.StateManager) {
            LOG.error(MODULE, 'StateManager not available for statistics bridge');
            return;
        }

        // Listen for section visited events
        window.addEventListener('sectionVisited', (event) => {
            const { sectionId, timestamp } = event.detail;

            LOG.debug(MODULE, `Section visited: ${sectionId}, updating favorite statistics if applicable`);

            // Update statistics for any favorite matching this section
            updateFavoriteStatisticsForSection(sectionId, timestamp);
        });

        LOG.info(MODULE, 'Statistics update bridge initialized');
    }

    /**
     * Update statistics for favorites matching the visited section
     */
    function updateFavoriteStatisticsForSection(sectionId, timestamp) {
        const favorites = getFavorites();
        let updated = false;

        favorites.forEach(favorite => {
            // Check if this favorite targets the visited section
            if (favorite.target.includes(`[data-section="${sectionId}"]`)) {
                // Update access count and last accessed
                if (!favorite.meta) favorite.meta = {};
                favorite.meta.accessCount = (favorite.meta.accessCount || 0) + 1;
                favorite.meta.lastAccessed = timestamp;
                updated = true;

                LOG.debug(MODULE, `Updated statistics for favorite: ${favorite.title}`, {
                    newAccessCount: favorite.meta.accessCount,
                    lastAccessed: new Date(timestamp).toISOString()
                });
            }
        });

        // Save updated favorites and trigger UI update
        if (updated) {
            window.StateManager.set('favorites.items', favorites);

            // The StateManager change will trigger our event system
            // which will update the favorites sidebar automatically
            LOG.debug(MODULE, 'Favorites statistics updated and saved');
        }
    }

    // ============================================================
    //  Native Event System
    // ============================================================

    /**
     * Initialize the native event system for favorites
     */
    function initFavoritesEventSystem() {
        _eventTarget = new EventTarget();
        LOG.debug(MODULE, 'Native event system initialized');
    }

    /**
     * Dispatch custom event with structured data
     * @param {string} eventType - One of FAVORITES_EVENTS
     * @param {object} detail - Event payload data
     */
    function dispatchFavoritesEvent(eventType, detail = {}) {
        if (!_eventTarget) {
            LOG.error(MODULE, `Event system not initialized - cannot dispatch: ${eventType}`);
            return false;
        }

        // Validate event type
        if (!Object.values(FAVORITES_EVENTS).includes(eventType)) {
            LOG.error(MODULE, `Invalid event type: ${eventType}`);
            return false;
        }

        const event = new CustomEvent(eventType, {
            detail: {
                timestamp: Date.now(),
                                      ...detail
            },
            bubbles: true,
            cancelable: true
        });

        LOG.debug(MODULE, `📢 Dispatching event: ${eventType}`, detail);
        return _eventTarget.dispatchEvent(event);
    }

    /**
     * Add event listener for favorites events (native DOM API pattern)
     * @param {string} eventType - One of FAVORITES_EVENTS
     * @param {Function} callback - Event handler function
     * @param {object} options - Native addEventListener options
     */
    function addEventListener(eventType, callback, options) {
        if (!_eventTarget) {
            LOG.error(MODULE, `Event system not initialized - cannot listen to: ${eventType}`);
            return;
        }

        _eventTarget.addEventListener(eventType, callback, options);
        LOG.debug(MODULE, `👂 Event listener added for: ${eventType}`);
    }

    /**
     * Remove event listener for favorites events
     * @param {string} eventType - One of FAVORITES_EVENTS
     * @param {Function} callback - Event handler function
     * @param {object} options - Native removeEventListener options
     */
    function removeEventListener(eventType, callback, options) {
        if (!_eventTarget) return;

        _eventTarget.removeEventListener(eventType, callback, options);
        LOG.debug(MODULE, `🔇 Event listener removed for: ${eventType}`);
    }

    // ============================================================================
    // FOLDER DROPDOWN MANAGEMENT
    // ============================================================================

    /**
     * Initialize the folder dropdown system
     */
    function initFolderDropdown() {
        LOG.debug(MODULE, 'Initializing folder dropdown system');

        // Initialize functionality
        setupDropdownInteractions();
        updateFolderDropdown();

        LOG.info(MODULE, 'Folder dropdown initialized successfully');
    }

    /**
     * Set up dropdown event listeners and interactions
     */
    function setupDropdownInteractions() {
        const dropdownButton = document.querySelector(CONFIG.selectors.folderDropdownButton);
        const dropdownMenu = document.querySelector(CONFIG.selectors.folderDropdownMenu);
        const dropdown = document.querySelector(CONFIG.selectors.folderDropdown);

        if (!dropdownButton || !dropdownMenu) {
            LOG.error(MODULE, 'Dropdown elements not found for interaction setup');
            return;
        }

        // Toggle dropdown on button click
        dropdownButton.addEventListener('click', (e) => {
            const isDisabled = dropdown.classList.contains(CONFIG.classes.folderDropdownDisabled);

            if (isDisabled) {
                LOG.debug(MODULE, 'Dropdown disabled - showing tooltip message');
                Toast.show(CONFIG.i18n.de.noCustomFolders, 'info');
                return;
            }

            e.stopPropagation();
            const isExpanded = dropdownButton.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;

            dropdownButton.setAttribute('aria-expanded', newState.toString());
            dropdownMenu.classList.toggle(CONFIG.classes.hidden, !newState);
            dropdown.classList.toggle(CONFIG.classes.folderDropdownOpen, newState);

            LOG.debug(MODULE, `Dropdown ${newState ? 'opened' : 'closed'}`);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdownButton.setAttribute('aria-expanded', 'false');
                dropdownMenu.classList.add(CONFIG.classes.hidden);
                dropdown.classList.remove(CONFIG.classes.folderDropdownOpen);
            }
        });

        // Handle dropdown menu interactions
        dropdownMenu.addEventListener('click', (e) => {
            const folderItem = e.target.closest(CONFIG.selectors.folderDropdownItem);
            const renameBtn = e.target.closest(CONFIG.selectors.folderRenameBtn);
            const deleteBtn = e.target.closest(CONFIG.selectors.folderDeleteBtn);
            const createBtn = e.target.closest(CONFIG.selectors.folderDropdownCreate);

            if (folderItem && !renameBtn && !deleteBtn) {
                // Folder selection
                const folderId = folderItem.dataset.folderId;
                LOG.debug(MODULE, `Folder selected: ${folderId}`);
                switchToFolder(folderId);
                closeDropdown();
            } else if (renameBtn) {
                // Rename folder
                e.stopPropagation();
                const folderId = renameBtn.dataset.folderId;
                LOG.debug(MODULE, `Rename folder requested: ${folderId}`);
                renameFolder(folderId);
            } else if (deleteBtn) {
                // Delete folder
                e.stopPropagation();
                const folderId = deleteBtn.dataset.folderId;
                LOG.debug(MODULE, `Delete folder requested: ${folderId}`);
                deleteFolder(folderId);
            } else if (createBtn) {
                // Create new folder
                e.stopPropagation();
                LOG.debug(MODULE, 'Create folder requested');
                createNewFolder();
                closeDropdown();
            }
        });

        LOG.debug(MODULE, 'Dropdown interactions setup complete');
    }

    /**
     * Close the dropdown menu
     */
    function closeDropdown() {
        const dropdownButton = document.querySelector(CONFIG.selectors.folderDropdownButton);
        const dropdownMenu = document.querySelector(CONFIG.selectors.folderDropdownMenu);
        const dropdown = document.querySelector(CONFIG.selectors.folderDropdown);

        if (dropdownButton && dropdownMenu && dropdown) {
            dropdownButton.setAttribute('aria-expanded', 'false');
            dropdownMenu.classList.add(CONFIG.classes.hidden);
            dropdown.classList.remove(CONFIG.classes.folderDropdownOpen);
        }
    }

    /**
     * Update the dropdown display based on current state
     */
    function updateFolderDropdown() {
        const folders = window.StateManager.getFolders();
        const currentFolder = _currentFolder || 'default';
        const customFolders = folders.filter(f => f.id !== 'default');

        const dropdown = document.querySelector(CONFIG.selectors.folderDropdown);
        const dropdownButton = document.querySelector(CONFIG.selectors.folderDropdownButton);
        const dropdownItems = document.querySelector(CONFIG.selectors.folderDropdownItems);
        const emptyState = document.querySelector(CONFIG.selectors.folderDropdownEmpty);

        // TEMPORARY DEBUG
        console.log('Dropdown selectors debug:', {
            dropdownSelector: CONFIG.selectors.folderDropdown,
            dropdownButtonSelector: CONFIG.selectors.folderDropdownButton,
            dropdownItemsSelector: CONFIG.selectors.folderDropdownItems,
            emptyStateSelector: CONFIG.selectors.folderDropdownEmpty,
            dropdownElement: dropdown,
            dropdownButtonElement: dropdownButton,
            dropdownItemsElement: dropdownItems,
            emptyStateElement: emptyState
        });

        if (!dropdown || !dropdownButton || !dropdownItems || !emptyState) {
            LOG.error(MODULE, 'Dropdown elements not found for update');
            return;
        }

        // Handle disabled state (no custom folders)
        if (customFolders.length === 0) {
            dropdown.classList.add(CONFIG.classes.folderDropdownDisabled);
            dropdownButton.setAttribute('title', CONFIG.i18n.de.noCustomFolders);
            emptyState.classList.remove(CONFIG.classes.hidden);
        } else {
            dropdown.classList.remove(CONFIG.classes.folderDropdownDisabled);
            dropdownButton.removeAttribute('title');
            emptyState.classList.add(CONFIG.classes.hidden);
        }

        // Update dropdown button content
        updateDropdownButton(currentFolder, folders);

        // Render folder items
        renderFolderDropdownItems(folders, currentFolder, dropdownItems);

        LOG.debug(MODULE, 'Folder dropdown updated', {
            currentFolder: currentFolder,
            customFoldersCount: customFolders.length,
            totalFolders: folders.length
        });
    }

    /**
     * Update the dropdown button display
     */
    function updateDropdownButton(currentFolderId, folders) {
        const currentFolder = folders.find(f => f.id === currentFolderId);
        const button = document.querySelector(CONFIG.selectors.folderDropdownButton);
        const currentSpan = button.querySelector(CONFIG.selectors.folderDropdownCurrent);
        const folderCountBadge = button.querySelector(CONFIG.selectors.folderDropdownFolderCount);
        const itemCountBadge = button.querySelector(CONFIG.selectors.folderDropdownItemCount);

        if (!currentFolder || !currentSpan || !folderCountBadge || !itemCountBadge) {
            LOG.warn(MODULE, 'Dropdown button elements not found for update');
            return;
        }

        currentSpan.textContent = currentFolder.name;

        // Update badges
        const customFolderCount = folders.filter(f => f.id !== 'default').length;
        const totalFavorites = window.StateManager.get('favorites.items')?.length || 0;

        folderCountBadge.textContent = customFolderCount;
        itemCountBadge.textContent = totalFavorites;

        // Hide badges if zero
        folderCountBadge.style.display = customFolderCount > 0 ? 'inline-block' : 'none';
        itemCountBadge.style.display = totalFavorites > 0 ? 'inline-block' : 'none';
    }

    /**
     * Render folder items in the dropdown
     */
    function renderFolderDropdownItems(folders, currentFolderId, container) {
        if (!container) {
            LOG.error(MODULE, 'Dropdown items container not found');
            return;
        }

        container.innerHTML = '';

        const customFolders = folders.filter(f => f.id !== 'default');

        customFolders.forEach(folder => {
            const favoriteCount = window.StateManager.getFolderFavoriteCount(folder.id);
            const isActive = folder.id === currentFolderId;

            const itemHTML = CONFIG.templates.folderDropdownItem(folder, isActive, favoriteCount);
            container.insertAdjacentHTML('beforeend', itemHTML);
        });

        LOG.debug(MODULE, `Rendered ${customFolders.length} folder items in dropdown`);
    }

    /**
     * Initialize folder management functions (rename/delete)
     */
    function initFolderManagement() {
        // These will be called from the dropdown interaction handlers
        LOG.debug(MODULE, 'Folder management system ready');
    }

    // Stub functions for folder management (to be implemented)
    function renameFolder(folderId) {
        LOG.debug(MODULE, `Rename folder: ${folderId}`);
        Toast.show(CONFIG.i18n.de.renameFolderToast, 'info');
    }

    function deleteFolder(folderId) {
        LOG.debug(MODULE, `Delete folder: ${folderId}`);
        Toast.show(CONFIG.i18n.de.deleteFolderToast, 'info');
    }

    function createNewFolder() {
        LOG.debug(MODULE, 'Create new folder');
        Toast.show(CONFIG.i18n.de.createFolderToast, 'info');
    }

    // ========================================================================
    // FOLDER MANAGEMENT - ADD TO script-favorites.js
    // ========================================================================

    /**
     * Switches to a specific folder and updates the UI
     */
    function switchToFolder(folderId) {
        LOG.debug(MODULE, `Switching to folder: ${folderId}`);

        // Update active states
        document.querySelectorAll('.favorites-folder-tab').forEach(tab => {
            const isActive = tab.dataset.folderId === folderId;
            tab.classList.toggle('favorites-folder-tab--active', isActive);
            tab.setAttribute('aria-selected', isActive.toString());
        });

        _currentFolder = folderId;

        // Render the favorites for this folder
        renderFavoritesList(folderId);

        LOG.info(MODULE, `Switched to folder: ${folderId}`);
    }

    /* FOR DEBUGGING ONLY */
    // Add this to track folder switches
    const originalSwitchToFolder = switchToFolder;
    switchToFolder = function(folderId) {
        LOG.debug(MODULE, '📁 [FOLDER SWITCH]', {
            from: _currentFolder,
            to: folderId,
            timestamp: Date.now()
        });
        return originalSwitchToFolder.call(this, folderId);
    };

    /**
     * Updates folder badge counts when favorites change
     */
    function updateFolderBadges() {
        const folders = window.StateManager.getFolders();

        folders.forEach(folder => {
            const badge = document.querySelector(`.favorites-folder-tab[data-folder-id="${folder.id}"] .favorites-folder-tab__badge`);
            if (badge) {
                const count = window.StateManager.getFolderFavoriteCount(folder.id);
                badge.textContent = count;
            }
        });

        LOG.debug(MODULE, 'Updated all folder badges');
    }

    function initFolderStateObserver() {
        if (!window.StateManager || !window.StateManager.subscribe) {
            LOG.error(MODULE, 'StateManager subscription not available for folders');
            return;
        }

        // Subscribe to favorites changes to update dropdown badges
        const unsubscribeFavorites = window.StateManager.subscribe('favorites.items', (newFavorites, oldFavorites) => {
            LOG.debug(MODULE, 'Favorites changed - updating dropdown badges');
            updateFolderDropdown();
        });

        // Subscribe to folder changes
        const unsubscribeFolders = window.StateManager.subscribe('favorites.folders', (newFolders, oldFolders) => {
            LOG.debug(MODULE, 'Folders changed - updating dropdown');
            updateFolderDropdown();
        });

        // Store unsubscribe functions for cleanup
        _unsubscribeFunctions.push(unsubscribeFavorites, unsubscribeFolders);
        LOG.info(MODULE, 'Folder dropdown state observers initialized');
    }

    // ============================================================
    //  Favorites List Rendering Function
    // ============================================================

    function renderFavoritesList(folderId = _currentFolder) {
        const favorites = window.StateManager.getFolderFavorites(folderId);

        const emptyState = document.querySelector(CONFIG.selectors.emptyState);
        const favoritesList = document.querySelector(CONFIG.selectors.favoritesList);
        const skeleton = document.querySelector(CONFIG.selectors.favoritesSkeleton);

        // Always hide skeleton first
        hideSkeletonLoading();

        if (favorites.length === 0) {
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
        favoritesList.innerHTML = favorites.map(favorite =>
            CONFIG.templates.favoriteItem(favorite)
        ).join('');

        updateFolderBadgeCounts();

        LOG.debug(MODULE, `Rendered ${favorites.length} favorites for folder: ${folderId}`);
    }

    function updateFavoritesDisplay(updatedFavorite = null) {
        LOG.debug(MODULE, `Updating favorites display for section: ${updatedFavorite?.sectionId || 'all'}`);

        const favoritesList = document.querySelector(CONFIG.selectors.favoritesList);

        if (!favoritesList) {
            LOG.warn(MODULE, 'Favorites list element not found');
            return;
        }

        // If we have a specific section update and the favorite data
        if (updatedFavorite) {
            // Find and update the specific favorite item in the DOM
            const favoriteElement = favoritesList.querySelector(`${CONFIG.selectors.favoriteItem}[data-favorite-id="${updatedFavorite.id}"]`);
            if (favoriteElement) {
                updateSingleFavoriteElement(favoriteElement, updatedFavorite);
                LOG.debug(MODULE, `Updated display for section: ${updatedFavorite.sectionId}`);
            } else {
                // Element not found - log warning but don't force full re-render
                LOG.warn(MODULE, `Favorite element not found for ID: ${updatedFavorite.id}. Stats update skipped.`);
            }
        }
    }

    function updateSingleFavoriteElement(element, favorite) {
        // Update access count display if it exists
        const accessCountElement = element.querySelector(CONFIG.selectors.favoriteAccessCount);
        if (accessCountElement && favorite.accessCount) {
            accessCountElement.textContent = favorite.accessCount;
        }

        // Update last accessed display if it exists
        const lastAccessedElement = element.querySelector(CONFIG.selectors.favoriteLastAccessed);
        if (lastAccessedElement && favorite.lastAccessed) {
            lastAccessedElement.textContent = StatisticsManager.formatLastAccessed(favorite.lastAccessed);
        }

        // Update statistics badge if it exists
        const statsBadge = element.querySelector('.favorite-stats-badge');
        if (statsBadge) {
            updateStatsBadge(statsBadge, favorite);
        }
    }

    function updateStatsBadge(statsBadge, favorite) {
        // this is a dummy function, because these badges are not implemented yet.
        return true;
    }

    // ============================================================
    //  Add/Remove Favorites functions
    // ============================================================

    /**
     * Detect favorite type based on target pattern
     */
    function getFavoriteType(target) {
        // Section: matches [data-section="section-id"] pattern
        if (/\[data-section="[^"]+"\]$/.test(target)) {
            return 'section';
        }
        // Subsection: anything else (CSS selectors, IDs, classes, etc.)
        return 'subsection';
    }

    /**
     * Generate display title based on target
     */
    function generateFavoriteTitle(target, customTitle = null) {
        if (customTitle) return customTitle;

        const isSection = getFavoriteType(target) === 'section';
        let element;

        try {
            element = document.querySelector(`main ${target}`);
        } catch (e) {
            LOG.warn(MODULE, `Invalid selector for title generation: ${target}`, e);
            return isSection ? target : 'Element';
        }

        if (isSection) {
            // For sections: get first heading content
            return element?.querySelector('h1, h2, h3, h4, h5, h6')?.textContent?.trim() || target;
        } else {
            // For subsections: get element text content
            return element?.textContent?.trim().substring(0, 50) || 'Element';
        }
    }

    /**
     * Unified favorite creation for both sections and subsections
     */
    function createFavorite(target, customTitle = null, favoriteType = 'section', folderId = 'default') {
        LOG.debug(MODULE, `Creating ${favoriteType} favorite for target: ${target} in folder: ${folderId}`);

        const favorites = window.StateManager.get('favorites.items') || [];

        // Check for duplicates (same target in same folder)
        const existingFavorite = favorites.find(fav =>
        fav.target === target && fav.folderId === folderId
        );

        if (existingFavorite) {
            LOG.debug(MODULE, 'Favorite already exists', existingFavorite);
            return { success: false, reason: 'duplicate', favorite: existingFavorite };
        }

        const favorite = {
            id: generateId(),
            target: target,
            title: generateFavoriteTitle(target, customTitle),
            folderId: folderId, // ← Use the folder ID, not name!
            type: favoriteType,
            meta: {
                createdAt: new Date().toISOString(),
                lastAccessed: null,
                accessCount: 0
            }
        };

        // Add subsection-specific data if needed
        if (favoriteType === 'subsection') {
            favorite.selector = target;
            favorite.sectionId = getSectionIdFromTarget(target);
        }

        favorites.push(favorite);
        window.StateManager.set('favorites.items', favorites);

        LOG.info(MODULE, `Favorite created: ${favorite.title} (${favoriteType}) in folder: ${folderId}`);
        return { success: true, favorite: favorite };
    }

    /**
     * Add section favorite (existing API - now enhanced for subsections)
     */
    function addFavorite(target, sectionName = null, sectionPath = null, favoriteType = 'section') {
        showFavoriteLoadingState(target);

        // For subsection favorites, use the provided name directly
        const customTitle = favoriteType === 'subsection' ? sectionName : sectionName;

        const result = createFavorite(target, customTitle, favoriteType);

        if (result.success) {
            hideFavoriteLoadingState(target);

            // Dispatch events for UI synchronization
            dispatchFavoritesEvent(FAVORITES_EVENTS.CHANGED, {
                favorites: getFavorites(),
                                   action: 'added',
                                   target: target,
                                   favorite: result.favorite
            });

            dispatchFavoritesEvent(FAVORITES_EVENTS.SECTION_STATUS, {
                target: target,
                isFavorited: true,
                favoriteType: favoriteType,
                favorite: result.favorite
            });

            LOG.debug(MODULE, `✅ Favorite added with event emission: ${target}`);
            Toast.show(CONFIG.i18n.de.savedAsFavorite, 'success');
        } else {
            hideFavoriteLoadingState(target);
            Toast.show(CONFIG.i18n.de.favoriteAlreadySaved, 'info');
        }

        return result;
    }

    function removeFavorite(favoriteId) {
        // FIRST: Get the target before we remove the favorite
        const favorites = window.StateManager.get('favorites.items') || [];
        const favoriteToRemove = favorites.find(fav => fav.id === favoriteId);
        const target = favoriteToRemove?.target;

        // ✅ ADD THIS: Show loading state for consistent UX
        if (target) {
            showFavoriteLoadingState(target);
        }

        const favoriteItem = document.querySelector(`main [data-favorite-id="${favoriteId}"]`);

        if (favoriteItem) {
            // Add removing class for smooth animation
            favoriteItem.classList.add(CONFIG.classes.removing);

            // Dispatch events for UI synchronization
            dispatchFavoritesEvent(FAVORITES_EVENTS.CHANGED, {
                favorites: getFavorites(),
                                   action: 'removed',
                                   target: target,
                                   removedFavorite: favoriteToRemove
            });

            dispatchFavoritesEvent(FAVORITES_EVENTS.SECTION_STATUS, {
                target: target,
                isFavorited: false,
                favoriteType: getFavoriteType(target)
            });

            LOG.debug(MODULE, `✅ Favorite removed with event emission: ${target}`);

            // Wait for animation to complete before actual removal
            setTimeout(() => {
                const updatedFavorites = favorites.filter(fav => fav.id !== favoriteId);
                window.StateManager.set('favorites.items', updatedFavorites);

                // Hide loading state
                if (target) {
                    hideFavoriteLoadingState(target);
                }

                Toast.show(CONFIG.i18n.de.favoriteRemoved, 'info');
            }, 300);
        } else {
            // Fallback if DOM element not found
            const updatedFavorites = favorites.filter(fav => fav.id !== favoriteId);
            window.StateManager.set('favorites.items', updatedFavorites);

            // Hide loading state
            if (target) {
                hideFavoriteLoadingState(target);
            }

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
            item.target === sectionId && item.folderId === 'default'
        );
    }

    // ============================================================
    //  Toggle Favorite Function
    // ============================================================

    function toggleFavorite(target) {
        LOG.debug(MODULE, `Toggling favorite for section: ${target}`);

        // Show immediate visual feedback
        showFavoriteLoadingState(target);

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
            item.target === target && item.folderId === 'default'
        );

        if (existingFavorite) {
            // Remove existing favorite
            LOG.debug(MODULE, `Removing existing favorite: ${existingFavorite.id}`);
            removeFavorite(existingFavorite.id);
        } else {
            // Add new favorite
            LOG.debug(MODULE, `Adding new favorite for section: ${target}`);
            addFavorite(target);
        }

        // Loading state will be cleared by addFavorite/removeFavorite functions
    }

    // ============================================================
    //  visual feedback functions
    // ============================================================

    function showFavoriteLoadingState(target) {
        const favoriteItem = document.querySelector(`main ${target}`);
        if (favoriteItem) {
            favoriteItem.classList.add(CONFIG.classes.loading, CONFIG.classes.disabled);
        }
    }

    function hideFavoriteLoadingState(target) {
        const favoriteItem = document.querySelector(`main ${target}`);
        if (favoriteItem) {
            favoriteItem.classList.remove(CONFIG.classes.loading, CONFIG.classes.disabled);
        }
    }

    function showFavoriteSuccessState(target) {
        const favoriteItem = document.querySelector(`main ${target}`);
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

    /**
     * Get current favorites array (safety wrapper)
     * @returns {Array} Current favorites array
     */
    function getFavorites() {
        if (!window.StateManager) {
            LOG.error(MODULE, 'StateManager not available');
            return [];
        }

        const favorites = window.StateManager.get('favorites.items');

        // Ensure we always return an array
        return Array.isArray(favorites) ? favorites : [];
    }

    /**
     * Get current favorite folders array (safety wrapper)
     * @returns {Array} Current favorite folders array
     */
    function getFolders() {
        if (!window.StateManager) {
            LOG.error(MODULE, 'StateManager not available');
            return [];
        }

        const folders = window.StateManager.get('favorites.folders');

        // Ensure we always return an array
        return Array.isArray(folders) ? folders : [];
    }

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

    /**
     * Extract sectionId from target for backward compatibility
     */
    function getSectionIdFromTarget(target) {
        // For section favorites: [data-section="section-id"] → section-id
        const sectionMatch = target.match(/\[data-section="([^"]+)"\]/);
        if (sectionMatch) {
            return sectionMatch[1];
        }

        // For subsection favorites: try to find containing section
        try {
            const element = document.querySelector(`main ${target}`);
            const section = element?.closest('[data-section]');
            return section?.dataset.section || CONFIG.i18n.de.unknown;
        } catch (e) {
            return CONFIG.i18n.de.unknown;
        }
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

    /**
     * Initialize favorites event listeners for the sidebar itself
     */
    function initFavoritesSidebarEventListeners() {
        // Listen to our own native events for sidebar updates
        addEventListener(FAVORITES_EVENTS.CHANGED, (event) => {
            LOG.debug(MODULE, 'Favorites sidebar received change event, re-rendering');
            renderFavoritesList();
        });

        addEventListener(FAVORITES_EVENTS.INITIALIZED, (event) => {
            LOG.debug(MODULE, 'Favorites initialized event received');
            renderFavoritesList();
        });

        LOG.info(MODULE, 'Favorites sidebar event listeners initialized');
    }

    /**
     * Navigate to favorite target (section or subsection)
     */
    function navigateToFavorite(target) {
        try {
            // Use the new scrollTo function when it's implemented
            if (window.SectionManagement && window.SectionManagement.scrollTo) {
                const highlight = getFavoriteType(target) === 'subsection';
                window.SectionManagement.scrollTo(target, highlight);
            } else {
                // Fallback to old scrollToSection for now
                const sectionId = getSectionIdFromTarget(target);
                if (sectionId && sectionId !== CONFIG.i18n.de.unknown) {
                    window.SectionManagement.scrollToSection(sectionId);
                }
            }
        } catch (error) {
            LOG.error(MODULE, `Navigation to favorite failed: ${target}`, error);
            Toast.show(CONFIG.i18n.de.navigationFailed(target), 'error');
        }
    }

    function handleFavoritesClick(e) {
        LOG.debug(MODULE, 'Click target:', e.target);
        LOG.debug(MODULE, 'Click target class:', e.target.className);

        // Handle subsection selection button in sidebar
        if (e.target.closest('.subsection-selection-btn')) {
            const subsectionButton = e.target.closest('.subsection-selection-btn');
            handleSidebarSubsectionClick.call(subsectionButton, e);
            return;
        }

        // Handle statistics toggle clicks
        else if (e.target.closest(CONFIG.selectors.favoriteDetailsBtn)) {
            const toggleBtn = e.target.closest(CONFIG.selectors.favoriteDetailsBtn);
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';

            // Close all other expanded details first
            if (!isExpanded) {
                document.querySelectorAll(`${CONFIG.selectors.favoriteDetailsBtn}[aria-expanded="true"]`).forEach(otherToggle => {
                    if (otherToggle !== toggleBtn) {
                        otherToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            }

            // Toggle current button
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            e.stopPropagation();
            return;
        }

        // Handle favorite link clicks (updated for new structure)
        if (e.target.closest(CONFIG.selectors.favoriteLink)) {
            const link = e.target.closest(CONFIG.selectors.favoriteLink);
            // ✅ Use data-target instead of data-section
            const target = link.dataset.target;

            if (target) {
                navigateToFavorite(target);
            } else {
                // Fallback for old structure
                const sectionId = link.dataset.section;
                if (sectionId) {
                    navigateToFavorite(`[data-section="${sectionId}"]`);
                }
            }
            return;
        }

        // Handle favorite edit clicks (from favorites list)
        else if (e.target.closest(CONFIG.selectors.favoriteEditBtn)) {
            const btn = e.target.closest(CONFIG.selectors.favoriteEditBtn);
            e.stopPropagation();
            const favoriteId = btn.dataset.favoriteId;
            editFavorite(favoriteId);
        }

        // Handle empty state suggestion clicks
        else if (e.target.classList.contains(CONFIG.selectors.favoritesEmptySuggestion)) {
            const sectionId = e.target.dataset.section;
            LOG.debug(MODULE, `Empty state suggestion clicked: ${sectionId}`);
            navigateToSection(sectionId);
        }

        // Handle remove button clicks
        else if (e.target.closest(CONFIG.selectors.favoriteRemoveBtn)) {
            const btn = e.target.closest(CONFIG.selectors.favoriteRemoveBtn);
            e.stopPropagation();
            const favoriteId = btn.dataset.favoriteId;
            removeFavorite(favoriteId);
        }
    }

    /**
     * Handle subsection selection button click in favorites sidebar
     */
    function handleSidebarSubsectionClick(event) {
        event.preventDefault();
        event.stopPropagation();

        LOG.debug(MODULE, 'Subsection selection button clicked in favorites sidebar');

        // Get the current active section from StateManager
        const currentSectionId = window.StateManager.get('sections.currentActive');

        if (!currentSectionId) {
            LOG.error(MODULE, 'No active section found for subsection selection');
            Toast.show('Kein aktiver Abschnitt gefunden', 'error');
            return;
        }

        // Visual feedback
        const button = event.currentTarget || this;
        button.classList.add('subsection-selection-btn--active');

        // Enter subsection selection mode
        if (window.SubsectionSelection) {
            window.SubsectionSelection.enterSelectionMode(currentSectionId, () => {
                // Callback when selection mode exits - remove active state
                button.classList.remove('subsection-selection-btn--active');
            });
        } else {
            LOG.error(MODULE, 'SubsectionSelection module not available');
            Toast.show('Präzises Lesezeichen-System nicht verfügbar', 'error');
            button.classList.remove('subsection-selection-btn--active');
        }
    }

    /**
     * Navigate to favorite target (section or subsection)
     */
    function navigateToFavorite(target) {
        try {
            // Use the enhanced scrollTo function that now exists
            if (window.SectionManagement && window.SectionManagement.scrollTo) {
                const highlight = getFavoriteType(target) === 'subsection';
                window.SectionManagement.scrollTo(target, highlight);
                LOG.debug(MODULE, `✅ Using enhanced scrollTo for: ${target}, highlight: ${highlight}`);
            } else {
                // Fallback to old scrollToSection for compatibility
                const sectionId = getSectionIdFromTarget(target);
                if (sectionId && sectionId !== CONFIG.i18n.de.unknown) {
                    window.SectionManagement.scrollToSection(sectionId);
                    LOG.debug(MODULE, `🔄 Fallback to scrollToSection for: ${sectionId}`);
                }
            }
        } catch (error) {
            LOG.error(MODULE, `Navigation to favorite failed: ${target}`, error);
            Toast.show(CONFIG.i18n.de.navigationFailed(target), 'error');
        }
    }

    function editFavorite(sectionId) {
        Toast.show('The edit modal will be implemented in late phase 2.0', 'warn');
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
                updateFavoritesDisplay(updatedFavorites);
                // renderFavoritesList(); ← this was here before
            }
        }
    }

    /**
     * Initialize folder tab click handlers for ALL folders (including default)
     */
    function initFolderTabClickHandlers() {
        const folderNav = document.getElementById('favorites-folder-nav');
        if (!folderNav) return;

        // Use event delegation to handle clicks on ANY folder tab
        folderNav.addEventListener('click', (event) => {
            const folderTab = event.target.closest('.favorites-folder-tab');
            if (folderTab) {
                const folderId = folderTab.dataset.folderId;
                if (folderId) {
                    switchToFolder(folderId);
                }
            }
        });

        LOG.debug(MODULE, 'Folder tab click handlers initialized (event delegation)');
    }

    function initializeFavoritesHistorySync() {
        LOG.debug(MODULE, 'initializeFavoritesHistorySync() called!');

        // Add safety check
        if (!window.StateManager || !window.StateManager.subscribe) {
            LOG.error(MODULE, 'StateManager subscription not available');
            return;
        }

        // Subscribe to history.entries changes
        _unsubscribeFromHistory = window.StateManager.subscribe('history.entries', (newEntries, oldEntries) => {
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

        LOG.info(MODULE, 'Favorites history sync initialized');
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

        // Attach the SINGLE event listener that handles everything
        attachFavoritesEventListeners();

        // Add subsection selection button listener
        const subsectionButton = favoritesContainer.querySelector(CONFIG.selectors.subsectionSelectionBtn);
        if (subsectionButton) {
            subsectionButton.addEventListener('click', handleSidebarSubsectionClick);
            LOG.debug(MODULE, 'Subsection selection button listener added');
        }

        // Subscribe to favorites changes for UI updates
        initFavoritesStateObserver();

        // Initialize sidebar event listeners
        initFavoritesSidebarEventListeners();

        // Show skeleton loading immediately
        showSkeletonLoading();

        // Simulate loading delay
        setTimeout(() => {
            // 1. Ensure favorites data structure exists
            initializeFavoritesData();

            // 2. Render initial list
            renderFavoritesList();

            // 3. THEN start watching history
            if (window.StateManager && window.StateManager.subscribe) {
                initializeFavoritesHistorySync();
            }

            // Mark as initialized
            _isInitialized = true;

            LOG.info(MODULE, 'Favorites initialized');
        }, 800);
    }

    /**
     * Initialize favorites state observation (UPDATED: Bridge StateManager to native events)
     * This ensures when StateManager changes favorites, we emit native events for UI components
     */
    function initFavoritesStateObserver() {
        if (!window.StateManager || !window.StateManager.subscribe) {
            LOG.error(MODULE, 'StateManager subscription not available');
            return;
        }

        // Subscribe to StateManager favorites changes and convert to native events
        const unsubscribe = window.StateManager.subscribe('favorites.items', (newFavorites, oldFavorites) => {
            LOG.debug(MODULE, 'StateManager favorites changed - converting to native event', {
                oldCount: oldFavorites?.length || 0,
                newCount: newFavorites?.length || 0
            });

            // Only emit if favorites actually changed (prevent loops)
            if (newFavorites !== oldFavorites) {
                dispatchFavoritesEvent(FAVORITES_EVENTS.CHANGED, {
                    favorites: newFavorites,
                    action: 'state-updated',
                    source: 'statemanager',
                    timestamp: Date.now()
                });
            }
        });

        // Store unsubscribe function for cleanup
        _unsubscribeFunctions.push(unsubscribe);
        LOG.info(MODULE, 'Favorites state observer initialized as StateManager→Event bridge');
    }

    function initializeFavoritesData() {
        const currentFavorites = window.StateManager.get('favorites');

        if (!currentFavorites) {
            const initialFavorites = {
                version: '1.0',
                items: [],
                folders: [
                    {
                        id: 'default',
                        name: CONFIG.i18n.favorites,
                        created: new Date().toISOString()
                    }
                ],
                lastUpdated: new Date().toISOString()
            };
            window.StateManager.set('favorites', initialFavorites);
        }

        dispatchFavoritesEvent(FAVORITES_EVENTS.INITIALIZED, {
            favorites: getFavorites(),
            folders: getFolders(),
            statistics: StatisticsManager?.getAllStatistics?.() || {}
        });

        LOG.info(MODULE, 'Favorites data initialized with event emission');
    }

    /**
     * Creates a subsection favorite from element selection data
     * (now a wrapper for addFavorite)
     * @param {string} sectionId - Parent section ID
     * @param {string} selector - CSS selector for the element
     * @param {string} name - Display name for the favorite
     */
    function createSubsectionFavorite(sectionId, selector, name) {
        LOG.debug('FAVORITES_MANAGER', `Creating subsection favorite: ${name}`, {
            sectionId,
            selector
        });

        try {
            // Use the unified addFavorite function
            const result = addFavorite(selector, name, null, 'subsection');

            if (result.success) {
                LOG.info('FAVORITES_MANAGER', `Subsection favorite created: ${name}`);
                return result.favorite;
            } else {
                throw new Error('Failed to create subsection favorite: ' + result.reason);
            }
        } catch (error) {
            LOG.error('FAVORITES_MANAGER', 'Error creating subsection favorite:', error);
            throw error;
        }
    }

    /**
     * Initialize subsection favorites event listeners
     */
    function initSubsectionFavorites() {
        LOG.debug('FAVORITES_MANAGER', 'Initializing subsection favorites');

        // Listen for element selection events from subsection selection mode
        window.addEventListener('subsectionElementSelected', function(event) {
            LOG.debug('FAVORITES_MANAGER', 'Subsection element selected event received', event.detail);

            const { selector, name, sectionId } = event.detail;

            try {
                createSubsectionFavorite(sectionId, selector, name);
            } catch (error) {
                LOG.error('FAVORITES_MANAGER', 'Failed to create favorite from selection:', error);
            }
        });

        LOG.info('FAVORITES_MANAGER', 'Subsection favorites initialized');
    }

    function destroyFavorites() {
        // Clean up observer when favorites system is destroyed
        if (_unsubscribeFromHistory) {
            _unsubscribeFromHistory();
            _unsubscribeFromHistory = null;
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
        if (diffDays < 7) return CONFIG.i18n.de.daysAgo(diffDays);
        if (diffDays < 30) return CONFIG.i18n.de.weeksAgo(Math.floor(diffDays / 7));
        return CONFIG.i18n.de.monthsAgo(Math.floor(diffDays / 30));
    }

    function initVisitTracking() {
        LOG(MODULE, 'Initializing favorites visit tracking...');

        window.addEventListener('sectionVisited', (e) => {
            const { sectionId, timestamp } = e.detail;
            updateFavoriteAccessStats(sectionId, timestamp);
        });

        LOG.debug(MODULE, 'Visit tracking initialized');
    }

    function updateFavoriteAccessStats(sectionId, timestamp) {
        const favorites = window.StateManager.get('favorites.items') || [];
        let updatedFavorites = [];
        let hasUpdates = false;

        // Find ALL favorites that match this sectionId, not just the first
        favorites.forEach(favorite => {
            if (favorite && favorite.sectionId === sectionId) {
                // Update access count and last accessed for each matching favorite
                favorite.accessCount = (favorite.accessCount || 0) + 1;
                favorite.lastAccessed = timestamp;
                updatedFavorites.push(favorite);
                hasUpdates = true;

                LOG.debug(MODULE, `Updated access stats for ${sectionId}: count=${favorite.accessCount}`);
            }
        });

        if (hasUpdates) {
            // Save all updated favorites
            window.StateManager.set('favorites.items', favorites);
            LOG.debug(MODULE, `Updated ${updatedFavorites.length} favorites for section: ${sectionId}`);

            // Update UI for all affected favorites
            updatedFavorites.forEach(updatedFavorite => {
                updateFavoritesDisplay(updatedFavorite);
            });
        }
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

        // Check dependencies
        if (!window.StateManager) {
            LOG.error(MODULE, 'StateManager not available - Favorites disabled');
            return false;
        }

        try {
            initFavoritesEventSystem();
            initStatisticsUpdateBridge();
            initSubsectionFavorites();

            // Get container from the DOM, just like navigation and history do
            _favoritesContainer = document.querySelector(CONFIG.selectors.sidebar);

            if (!_favoritesContainer) {
                LOG.error(MODULE, 'Favorites Manager: Favorites container not found');
                return false;
            }

            // Shortcut beim SidebarManager registrieren
            if (window.SidebarManager) {
                const registered = window.SidebarManager.registerShortcut('favorites', 'f');

                if (registered) {
                    LOG.info(MODULE, 'Shortcut Alt+f registered with SidebarManager');
                } else {
                    LOG.warn(MODULE, 'Shortcut Alt+f already taken');
                }
            } else {
                LOG.error(MODULE, 'SidebarManager not available!');
            }

            // Initial render
            initializeFavorites();
            initVisitTracking();

            initFolderStateObserver();
            initFolderTabClickHandlers();
            initFolderDropdown();

            _isInitialized = true;

            LOG.info(MODULE, 'Favorites Manager initialized successfully');
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
        // Core favorites functionality
        init: init,
        refresh: refresh,
        addFavorite: addFavorite,
        createFavorite: createFavorite,
        isSectionFavorited: isSectionFavorited,
        removeFavorite: removeFavorite,
        toggleFavorite: toggleFavorite,
        getFavorites: getFavorites,
        getFolders: getFolders,

        // ✅ NEW: Native Event System
        addEventListener: addEventListener,
        removeEventListener: removeEventListener,
        EVENTS: FAVORITES_EVENTS, // Export event constants

        // Utility functions
        isInitialized: () => _isInitialized,
        getFavoriteType: getFavoriteType,

        // Debug functions (only when debugMode active)
        _debug: window.BUILD_INFO?.debugMode ? {
            StatisticsManager: StatisticsManager,
            generateFavoriteTitle: generateFavoriteTitle,
            // ✅ NEW: Event system debug access
            _eventTarget: _eventTarget,
            dispatchFavoritesEvent: dispatchFavoritesEvent,
            navigateToFavorite: navigateToFavorite,
            _currentFolder: () => _currentFolder,
            createSubsectionFavorite: createSubsectionFavorite
        } : undefined
    };
    LOG.debug(MODULE, 'FavoritesManager API exported with toggle support');

    LOG.debug(MODULE, 'Favorites Manager: Module loaded and auto-initialization scheduled');
})();
