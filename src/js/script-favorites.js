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
    //  Drag and Drop Placeholder System
    // ============================================================

    // Drag state management
    const _dragState = {
        active: false,
        favoriteId: null,
        sourceFolder: null,
        dropTarget: null,
        hoverTimeout: null,
        isMenuOpenForDrag: false,
        initiatedByHandle: false
    };

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
        settings: {
            maxFolders: 15,
            dropEffect: 'move',
            hoverDelay: 700 // ms for folder switching
        },
        classes: {
            active: 'active',
            hidden: 'hidden',
            favoriteItem: 'favorite-item',
            favoriteItemTitle: 'favorite-item-title',
            favoriteItemMeta: 'favorite-item-meta',
            favoriteItemPath: 'favorite-item-path',
            favoriteLink: 'favorite-link',
            favoriteActive: 'favorite--active',
            folderActive: 'favorites-folder-tab--active',
            loading: 'favorite--loading',
            removing: 'favorite--removing',
            success: 'favorite--success',
            disabled: 'favorite--disabled',
            favoriteItemSubsection: 'favorite-item--subsection',
            favoriteActions: 'favorite-actions',
            favoriteAction: 'favorite-action',
            favoriteMain: 'favorite-main',
            favoriteRemoveBtn: 'favorite-remove-btn',
            favoriteDetails: 'favorite-details',
            favoriteDetailsBtn: 'favorite-details-toggle',
            favoriteDetailsBtnActive: 'favorite-details-toggle--active',
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
            folderManagementButtons: 'favorites-folder-management__buttons',
            folderDropdownCurrent: 'favorites-folder-dropdown__current',
            folderDropdownFolderCount: 'favorites-folder-dropdown__folder-count',
            folderDropdownItemCount: 'favorites-folder-dropdown__item-count',
            folderRenameBtn: 'favorites-folder-rename',
            folderDeleteBtn: 'favorites-folder-delete',
            filteredOut: 'filtered-out',
            folderDropdownBadges: 'favorites-folder-dropdown__badges',
            favoritesCount: 'favorites-count',
            foldersCount: 'folders-count',
            subsectionSelectionBtn: 'subsection-selection-btn',
            favoritesSuggestionsContainer: 'favorites-suggestions-container',
            emptyStateHint: 'favorites-empty-hint',
            favoriteEditBtn: 'favorite-edit-btn',
            folderDropdownCreateBadge: 'favorites-folder-dropdown__create-badge',
            folderDropdownCreateDisabled: 'favorites-folder-dropdown__create--disabled',
            folderDropdownLimitMessage: 'favorites-folder-dropdown__limit-message',
            folderDropdownCreateSection: 'favorites-folder-dropdown__create-section',
            dragHandle: 'favorite-drag-handle',
            dragging: 'favorite-dragging',
            dragOverTop: 'drag-over-top',
            dragOverBottom: 'drag-over-bottom',
            dropTarget: 'drop-target',
            emptyState: 'favorites-empty-state'
        }
    };

    // Generate CONFIG.selectors from classes
    CONFIG.selectors = Object.keys(CONFIG.classes).reduce((acc, key) => {
        // Prepend '.' to the class value to create a class selector
        if (typeof CONFIG.classes[key] === 'string')
        {
            acc[key] = `.${CONFIG.classes[key]}`;
        } else if (typeof CONFIG.classes[key] === 'function')
        {
            acc[key] = (a) => `.${CONFIG.classes[key](a)}`;
        }
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
            enterFolderName: 'Geben Sie einen Namen für den neuen Ordner ein:',
            folderCreated: 'Ordner erfolgreich erstellt',
            folderRenamed: 'Ordner erfolgreich umbenannt',
            folderDeleted: 'Ordner erfolgreich gelöscht',
            folders: 'Ordner',
            favorites: 'Lesezeichen',
            renameFolderToast: 'Ordnernamen-Funktion wird in Phase 2 implementiert',
            deleteFolderToast: 'Ordner löschen-Funktion wird in Phase 2 implementiert',
            createFolderToast: 'Neuen Ordner erstellen-Funktion wird in Phase 2 implementiert',
            folderDeleted: 'Ordner erfolgreich gelöscht',
            folderRenamed: 'Ordner erfolgreich umbenannt',
            confirmDelete: (folderName) => `Möchten Sie den Ordner "${folderName}" wirklich löschen?`,
            foldersRemaining: (count) => `Noch ${count} Ordner möglich`,
            folderLimitReached: 'Maximale Anzahl an Ordnern erreicht',
            folderNameEmpty: 'Ordnername darf nicht leer sein',
            folderNameTooLong: 'Ordnername darf maximal 30 Zeichen lang sein',
            folderNameInvalidChars: 'Ordnername enthält ungültige Zeichen: < > : " / \\ | ? *',
            folderAlreadyExists: 'Ein Ordner mit diesem Namen existiert bereits',
            folderCreationError: 'Fehler beim Erstellen des Ordners',
            folderCreationCancelled: 'Ordnererstellung abgebrochen',
            cannotDeleteDefault: 'Der Standardordner kann nicht gelöscht werden',
            cannotRenameDefault: 'Der Standardordner kann nicht umbenannt werden',
            folderDeleteError: 'Fehler beim Löschen des Ordners',
            folderRenameError: 'Fehler beim Umbenennen des Ordners',
            favoritesMovedToDefault: (count) => `${count} Lesezeichen werden in den Standardordner verschoben.`,
            enterNewFolderName: 'Geben Sie einen neuen Namen für den Ordner ein:',
            folderDeleteCancelled: 'Ordnerlöschung abgebrochen',
            folderRenameCancelled: 'Ordnermumbenennung abgebrochen',
            dragToReorder: 'Zum Sortieren ziehen',
            favoriteMoved: 'Lesezeichen verschoben',
            dropToReorder: 'Zum Umsortieren ablegen',
            dropToMoveToFolder: 'Ablegen, um in Ordner zu verschieben'
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
            <li class="${CONFIG.classes.favoriteItem}" data-section="${sectionId}" data-favorite-id="${favorite.id}" draggable="true">
                <button class="${CONFIG.classes.favoriteLink}" data-target="${encodedTarget}">
                    <span class="${CONFIG.classes.favoriteItemTitle}">${displayName}</span>
                    <span class="${CONFIG.classes.favoriteItemMeta}" hidden>
                    <span class="${CONFIG.classes.favoriteItemPath}">${favorite.target}</span>
                </button>
                <div class="${CONFIG.classes.favoriteActions}">
                    <button class="${CONFIG.classes.favoriteAction} ${CONFIG.classes.favoriteDetailsBtn}" aria-expanded="false" data-favorite-id="${favorite.id}" aria-label="${CONFIG.i18n.de.showStatistics}"></button>
                    <button class="${CONFIG.classes.favoriteAction} ${CONFIG.classes.favoriteEditBtn}" data-favorite-id="${favorite.id}" aria-label="${CONFIG.i18n.de.editFavorite}"></button>
                    <button class="${CONFIG.classes.favoriteAction} ${CONFIG.classes.favoriteRemoveBtn}" data-favorite-id="${favorite.id}" aria-label="${CONFIG.i18n.de.removeFavorite}"></button>
                    <!-- Statistics as last child of favorite-actions -->
                    <div class="${CONFIG.classes.favoriteDetails}">
                        ${StatisticsManager?.createStatisticsHTML(favorite)}
                    </div>
                </div>
                <div class="${CONFIG.classes.dragHandle}" aria-label="${CONFIG.i18n.de.dragToReorder}">⋮⋮</div>
            </li>
            `},

        subsectionFavorite: (favorite) => `
            <li class="${CONFIG.classes.favoriteItem} ${CONFIG.classes.favoriteItemSubsection}" data-selector="${favorite.selector}" data-favorite-id="${favorite.id}">
                <button class="${CONFIG.classes.favoriteLink}" data-selector="${favorite.selector}">
                    <span class="${CONFIG.classes.favoriteItemTitle}">${favorite.name}</span>
                    <span class="${CONFIG.classes.favoriteItemMeta}" hidden>
                    <span class="${CONFIG.classes.favoriteItemPath}">in ${favorite.sectionTitle}</span>
                </button>
                <div class="${CONFIG.classes.favoriteActions}">
                    <button class="${CONFIG.classes.favoriteAction} ${CONFIG.classes.favoriteDetailsBtn}" aria-expanded="false" data-favorite-id="${favorite.id}" aria-label="${CONFIG.i18n.de.showStatistics}"></button>
                    <button class="${CONFIG.classes.favoriteAction} ${CONFIG.classes.favoriteEditBtn}" data-favorite-id="${favorite.id}" aria-label="${CONFIG.i18n.de.editFavorite}"></button>
                    <button class="${CONFIG.classes.favoriteAction} ${CONFIG.classes.favoriteRemoveBtn}" data-favorite-id="${favorite.id}" aria-label="${CONFIG.i18n.de.removeFavorite}"></button>
                    <!-- Statistics as last child of favorite-actions -->
                    <div class="${CONFIG.classes.favoriteDetails}">
                        ${StatisticsManager?.createStatisticsHTML(favorite)}
                    </div>
                </div>
            </li>
            `,

        folderDropdownItem: (folder, isActive, favoriteCount) => `
            <div class="${CONFIG.classes.folderDropdownItem} ${isActive ? CONFIG.classes.folderDropdownItemActive : ''}" data-folder-id="${folder.id}" role="menuitem" aria-checked="${isActive}" aria-label="${folder.name} (${favoriteCount} ${favoriteCount === 1 ? 'Lesezeichen' : 'Lesezeichen'})">
                <span class="${CONFIG.classes.folderDropdownCurrent}">${folder.name}</span>
                <span class="${CONFIG.classes.folderDropdownItemCount}">${favoriteCount}</span>
                <div class="${CONFIG.classes.folderManagementButtons} ${isActive ? '' : CONFIG.classes.hidden}">
                    <button class="${CONFIG.classes.folderRenameBtn}" data-folder-id="${folder.id}" aria-label="${CONFIG.i18n.de.renameFolder}: ${folder.name}"></button>
                    <button class="${CONFIG.classes.folderDeleteBtn}" data-folder-id="${folder.id}" aria-label="${CONFIG.i18n.de.deleteFolder}: ${folder.name}" ${folder.id === 'default' ? 'disabled' : ''}></button>
                </div>
            </div>
            `,

        folderCreationSection: (foldersRemaining) => {
                const canCreateMore = foldersRemaining > 0;

                if (canCreateMore) {
                    return `
                    <div class="${CONFIG.classes.folderDropdownCreateSection}">
                        <button class="${CONFIG.classes.folderDropdownCreate}" type="button">
                            ${CONFIG.i18n.de.createNewFolder}
                            <span class="${CONFIG.classes.folderDropdownCreateBadge}">
                                ${foldersRemaining}
                            </span>
                        </button>
                    </div>
                    `;
                } else {
                    return `
                    <div class="${CONFIG.classes.folderDropdownCreateSection}">
                        <div class="${CONFIG.classes.folderDropdownLimitMessage}">
                            ${CONFIG.i18n.de.folderLimitReached}
                        </div>
                    </div>
                    `;
                }
            }
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
    //  Drag and Drop System
    // ============================================================

    // ============================================================
    //  Enhanced Drag Handle System
    // ============================================================

    /**
     * Initialize enhanced drag handles with hover activation
     */
    function initEnhancedDragHandles() {
        _dragState.isMenuOpenForDrag = false;

        repositionDragHandles();
        setupDragHandleHover();
        setupDragInitiationTracking();

        LOG.info(MODULE, 'Enhanced drag handles with hover activation initialized');
    }

    /**
     * Reposition drag handles to end of favorite items
     */
    function repositionDragHandles() {
        document.querySelectorAll(CONFIG.selectors.favoriteItem).forEach(item => {
            const dragHandle = item.querySelector(CONFIG.selectors.dragHandle);
            if (dragHandle && !dragHandle.classList.contains('repositioned')) {
                item.appendChild(dragHandle);
                dragHandle.classList.add('repositioned');
            }
        });
    }

    /**
     * Set up drag initiation tracking via mousedown events
     */
    function setupDragInitiationTracking() {
        // Track mousedown on drag handles to know if drag was initiated by handle
        document.addEventListener('mousedown', (e) => {
            // Check if the mousedown is on a drag handle
            _dragState.initiatedByHandle = !!e.target.closest(CONFIG.selectors.dragHandle);
            if (_dragState.initiatedByHandle) {
                LOG.debug(MODULE, "🟡 MOUSEDOWN on drag handle - drag initiation tracked");
            }
        });

        // NOTE: No need to reset initiatedByHandle - every dragstart will be preceded by a mousedown
        // that sets the correct value for the upcoming drag operation
    }

    /**
     * Set up drag handle hover behavior
     */
    function setupDragHandleHover() {
        document.addEventListener('mouseenter', (e) => {
            if (e.target.classList.contains(CONFIG.classes.dragHandle) ||
                e.target.closest(CONFIG.selectors.dragHandle)) {

                clearTimeout(_dragState.hoverTimeout);

            _dragState.hoverTimeout = setTimeout(() => {
                if (!isDropdownOpen() && !_dragState.active) {
                    openDropdownForDrag();
                    _dragState.isMenuOpenForDrag = true;
                    LOG.debug(MODULE, "📂 Dropdown opened via drag handle hover");
                }
            }, 300);
                }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (e.target.classList.contains(CONFIG.classes.dragHandle) ||
                e.target.closest(CONFIG.selectors.dragHandle)) {

                clearTimeout(_dragState.hoverTimeout);

            if (_dragState.isMenuOpenForDrag) {
                _dragState.hoverTimeout = setTimeout(() => {
                    if (isDropdownOpen() && !_dragState.active) {
                        closeDropdown();
                        _dragState.isMenuOpenForDrag = false;
                        LOG.debug(MODULE, "📂 Dropdown closed after drag handle leave");
                    }
                }, 500);
            }
                }
        }, true);
    }

    // ============================================================
    //  Core Drag and Drop Functions
    // ============================================================

    /**
     * Initialize favorites drag and drop system
     */
    function initFavoritesDragAndDrop() {
        LOG.debug(MODULE, 'Initializing drag and drop system');

        // Set up event listeners for the entire drag lifecycle
        document.addEventListener('dragstart', handleDragStart);
        document.addEventListener('dragover', handleDragOver);
        document.addEventListener('dragleave', handleDragLeave);
        document.addEventListener('drop', handleDrop);
        document.addEventListener('dragend', handleDragEnd);

        LOG.info(MODULE, 'Drag and drop system initialized');
    }

    /**
     * Handle drag start event
     */
    function handleDragStart(e) {
        // Only handle drag handle drags
        LOG.debug(MODULE, "🟡 DRAG START EVENT TRIGGERED", {
            target: e.target.className,
            isDragHandle: _dragState.initiatedByHandle,
            currentDragState: { ..._dragState }
        });

        const isOurDraggableElement = e.target.className === CONFIG.classes.favoriteItem;

        if (!_dragState.initiatedByHandle) {
            LOG.debug(MODULE, "❌ DRAG START IGNORED - not a drag handle");
            if (isOurDraggableElement)
            {
                // This is our draggable element,
                // but it was not grabbed by its handle.
                // So we must stop the dragging!
                LOG.warn(MODULE, "THIS IS OUR DRAGGABLE ELEMENT BUT ITS NOT GRABBED BY ITS HANDLE!")
                event.preventDefault(); // 🚫 stops the drag from starting
                return false;
            } else
            {
                LOG.debug(MODULE, "❌ DRAG START IGNORED - no our favorite item and not our drag handle");
                // This is not our drag action. Let it bubble up.
                return;
            }
        }

        if (!isOurDraggableElement) {
            LOG.debug(MODULE, "❌ DRAG START IGNORED - no favorite item found for drag handle");
            // This is not our drag action. Let it bubble up.
            return;
        }

        // Set drag state with debug info
        _dragState.active = true;
        _dragState.favoriteId = e.target.dataset.favoriteId;
        _dragState.sourceFolder = _currentFolder;
        _dragState.startTime = Date.now();
        _dragState.lastEvent = 'dragstart';

        // Set drag data
        e.dataTransfer.setData('text/plain', _dragState.favoriteId);
        e.dataTransfer.effectAllowed = CONFIG.settings.dropEffect;

        // Visual feedback
        e.target.classList.add(CONFIG.classes.dragging);

        LOG.debug(MODULE, "🟢 DRAG START SUCCESS", {
            favoriteId: _dragState.favoriteId,
            sourceFolder: _dragState.sourceFolder,
            active: _dragState.active,
            timestamp: _dragState.startTime,
            dropdownOpen: isDropdownOpen()
        });
    }

    /**
     * Handle drag over event with proper drop targeting
     */
    function handleDragOver(e) {
        _dragState.lastEvent = 'dragover';

        if (!_dragState.active) {
            LOG.debug(MODULE, "❌ DRAG OVER IGNORED - drag state not active", {
                currentState: { ..._dragState },
                target: e.target.className
            });
            return;
        }

        e.preventDefault();
        e.dataTransfer.dropEffect = CONFIG.settings.dropEffect;

        const target = analyzeDropTarget(e);
        _dragState.dropTarget = target;

        LOG.debug(MODULE, "🟡 DRAG OVER ANALYSIS", {
            targetType: target.type,
            targetElement: target.element?.className,
            currentState: { ..._dragState }
        });

        switch (target.type) {
            case 'favorite-item':
                handleFavoriteItemDragOver(e, target);
                break;
            case 'folder-item':
                handleFolderItemDragOver(e, target);
                break;
            case 'empty-state':
                handleEmptyStateDragOver(e, target);
                break;
            case 'dropdown-area':
                handleDropdownAreaDragOver(e, target);
                break;
            case 'none':
                LOG.debug(MODULE, "🔵 DRAG OVER - no valid target");
                break;
        }
    }

    /**
     * Analyze the current drop target
     */
    function analyzeDropTarget(e) {
        const favoriteItem = e.target.closest(CONFIG.selectors.favoriteItem);
        const folderItem = e.target.closest(CONFIG.selectors.folderDropdownItem);
        const emptyState = e.target.closest(CONFIG.selectors.emptyState);
        const dropdownMenu = e.target.closest(CONFIG.selectors.folderDropdownMenu);
        const dropdown = e.target.closest(CONFIG.selectors.folderDropdown);

        if (favoriteItem && favoriteItem.dataset.favoriteId !== _dragState.favoriteId) {
            return {
                type: 'favorite-item',
                element: favoriteItem,
                favoriteId: favoriteItem.dataset.favoriteId
            };
        }

        if (folderItem && folderItem.dataset.folderId) {
            return {
                type: 'folder-item',
                element: folderItem,
                folderId: folderItem.dataset.folderId
            };
        }

        if (emptyState) {
            return {
                type: 'empty-state',
                element: emptyState
            };
        }

        if (dropdownMenu || dropdown) {
            return {
                type: 'dropdown-area',
                element: dropdownMenu || dropdown
            };
        }

        return { type: 'none' };
    }

    /**
     * Handle drag over a favorite item (reordering)
     */
    function handleFavoriteItemDragOver(e, target) {
        const rect = target.element.getBoundingClientRect();
        const isAfter = e.clientY > rect.top + rect.height / 2;

        // Clear previous states
        clearDragVisualStates();

        // Set new state
        target.element.classList.toggle(CONFIG.classes.dragOverTop, !isAfter);
        target.element.classList.toggle(CONFIG.classes.dragOverBottom, isAfter);

        LOG.debug(MODULE, "📦 REORDER TARGET", {
            targetFavorite: target.favoriteId,
            position: isAfter ? 'after' : 'before'
        });
    }

    /**
     * Handle drag over a folder item (folder transfer)
     */
    function handleFolderItemDragOver(e, target) {
        clearDragVisualStates();
        target.element.classList.add(CONFIG.classes.dropTarget);

        // Schedule folder switch if different from current
        if (target.folderId !== _currentFolder) {
            clearTimeout(_dragState.hoverTimeout);
            _dragState.hoverTimeout = setTimeout(() => {
                if (target.folderId !== _currentFolder) {
                    LOG.debug(MODULE, "🔄 SWITCHING FOLDER via hover", {
                        from: _currentFolder,
                        to: target.folderId
                    });
                    switchToFolder(target.folderId);
                }
            }, CONFIG.settings.hoverDelay);
        }
    }

    /**
     * Handle drag over empty state
     */
    function handleEmptyStateDragOver(e, target) {
        clearDragVisualStates();
        target.element.classList.add(CONFIG.classes.dropTarget);
    }

    /**
     * Handle drag over dropdown area
     */
    function handleDropdownAreaDragOver(e, target) {
        // Only open dropdown if it's not already open
        // This gives visual feedback but doesn't guarantee folder targets will work
        if (!isDropdownOpen()) {
            document.querySelector(CONFIG.selectors.folderDropdownButton)?.click();
            LOG.debug(MODULE, "📂 DROPDOWN OPENED by drag over area");
        }
    }

    /**
     * Handle drag leave event
     */
    function handleDragLeave(e) {
        _dragState.lastEvent = 'dragleave';

        if (!_dragState.active) {
            LOG.debug(MODULE, "🔵 DRAG LEAVE IGNORED - drag state not active");
            return;
        }

        LOG.debug(MODULE, "🟡 DRAG LEAVE", {
            target: e.target.className,
            relatedTarget: e.relatedTarget?.className,
            currentState: { ..._dragState }
        });

        // Only clear states when leaving relevant areas
        if (!e.relatedTarget ||
            !e.relatedTarget.closest?.(`
            ${CONFIG.selectors.favoritesList},
            ${CONFIG.selectors.folderDropdownMenu},
            ${CONFIG.selectors.emptyState}
            `)) {
            clearDragVisualStates();
            }
    }

    /**
     * Handle drop event
     */
    function handleDrop(e) {
        _dragState.lastEvent = 'drop';

        LOG.debug(MODULE, "🎯 DROP EVENT TRIGGERED", {
            active: _dragState.active,
            currentState: { ..._dragState },
            target: e.target.className,
            dropTarget: _dragState.dropTarget
        });

        if (!_dragState.active) {
            LOG.error(MODULE, "❌ DROP FAILED - drag state not active at drop time!", {
                fullState: { ..._dragState },
                eventTarget: e.target.className
            });
            return;
        }

        e.preventDefault();
        clearTimeout(_dragState.hoverTimeout);
        clearDragVisualStates();

        const target = _dragState.dropTarget;

        LOG.debug(MODULE, "🟢 PROCESSING DROP", {
            targetType: target.type,
            targetDetails: target
        });

        switch (target.type) {
            case 'favorite-item':
                handleFavoriteItemDrop(target);
                break;
            case 'folder-item':
                handleFolderItemDrop(target);
                break;
            case 'empty-state': // Achtung, 2. Check im default:
                handleEmptyStateDrop();
                break;
            default: // Hier 2. Check für empty-state.
                if (e.target.closest(`.${CONFIG.classes.emptyState}`)) {
                    handleEmptyStateDrop();
                    break;
                }
                LOG.debug(MODULE, "❌ DROP CANCELLED - no valid target type", {
                    targetType: target.type
                });
        }

        cleanupDragState();
        closeDropdown();
    }

    /**
     * Handle drop on favorite item (reorder or move)
     */
    function handleFavoriteItemDrop(target) {
        if (_dragState.sourceFolder !== _currentFolder) {
            // This is a move from another folder (via spring-loading)
            LOG.debug(MODULE, "📂 FOLDER TRANSFER (via spring-load drop)", {
                favorite: _dragState.favoriteId,
                from: _dragState.sourceFolder,
                to: _currentFolder
            });
            handleFolderTransfer(_dragState.favoriteId, _dragState.sourceFolder, _currentFolder);
        } else {
            // This is a reorder within the same folder
            handleReorderDrop(_dragState.favoriteId, target.favoriteId);
        }
    }

    /**
     * Handle drop on folder item
     */
    function handleFolderItemDrop(target) {
        // FIXED: Additional safety check for folder items
        if (!target.folderId) {
            LOG.error(MODULE, "❌ FOLDER DROP FAILED - no folder ID", target);
            return;
        }

        LOG.debug(MODULE, "📂 FOLDER TRANSFER DROP", {
            favorite: _dragState.favoriteId,
            from: _dragState.sourceFolder,
            to: target.folderId
        });
        handleFolderTransfer(_dragState.favoriteId, _dragState.sourceFolder, target.folderId);
    }


    /**
     * Handle drop on empty state
     */
    function handleEmptyStateDrop() {
        LOG.debug(MODULE, "📭 EMPTY STATE DROP", {
            favorite: _dragState.favoriteId,
            from: _dragState.sourceFolder,
            to: _currentFolder
        });
        handleFolderTransfer(_dragState.favoriteId, _dragState.sourceFolder, _currentFolder);
    }

    /**
     * Handle drag end event
     */
    function handleDragEnd(e) {
        _dragState.lastEvent = 'dragend';

        LOG.debug(MODULE, "🔚 DRAG END EVENT", {
            activeAtEnd: _dragState.active,
            fullState: { ..._dragState },
            duration: _dragState.startTime ? Date.now() - _dragState.startTime : 'unknown'
        });

        if (!_dragState.active) {
            LOG.warn(MODULE, "⚠️ DRAG END CALLED BUT DRAG WAS NOT ACTIVE", {
                lastEvent: _dragState.lastEvent,
                currentState: { ..._dragState }
            });
        }

        cleanupDragState();

        // Reset hover flag with delay
        if (_dragState.isMenuOpenForDrag) {
            setTimeout(() => {
                if (!_dragState.active) {
                    closeDropdown();
                    _dragState.isMenuOpenForDrag = false;
                    LOG.debug(MODULE, "📂 Dropdown closed after drag completion");
                }
            }, 1000);
        }
    }

    // ============================================================
    //  Drag Utility Functions
    // ============================================================

    /**
     * Clear all drag visual states
     */
    function clearDragVisualStates() {
        document.querySelectorAll(`
        ${CONFIG.selectors.favoriteItem}.${CONFIG.classes.dragOverTop},
        ${CONFIG.selectors.favoriteItem}.${CONFIG.classes.dragOverBottom},
        ${CONFIG.selectors.folderDropdownItem}.${CONFIG.classes.dropTarget},
        ${CONFIG.selectors.emptyState}.${CONFIG.classes.dropTarget}
        `).forEach(el => {
            el.classList.remove(
                CONFIG.classes.dragOverTop,
                CONFIG.classes.dragOverBottom,
                CONFIG.classes.dropTarget
            );
        });
    }

    /**
     * Clean up drag state completely
     */
    function cleanupDragState() {
        LOG.debug(MODULE, "🧹 CLEANUP DRAG STATE", {
            wasActive: _dragState.active,
            lastEvent: _dragState.lastEvent,
            fullStateBeforeCleanup: { ..._dragState }
        });

        clearDragVisualStates();

        // Remove dragging class from any favorite item
        document.querySelectorAll(`${CONFIG.selectors.favoriteItem}.${CONFIG.classes.dragging}`)
        .forEach(el => el.classList.remove(CONFIG.classes.dragging));

        // Clear timeouts
        clearTimeout(_dragState.hoverTimeout);

        // Reset state
        _dragState.active = false;
        _dragState.favoriteId = null;
        _dragState.sourceFolder = null;
        _dragState.dropTarget = null;
        _dragState.startTime = null;
        // Keep lastEvent for debugging

        LOG.debug(MODULE, "🧹 DRAG STATE CLEANUP COMPLETE", {
            newState: { ..._dragState }
        });
    }

    // ============================================================
    //  Drag and Drop Helper Functions
    // ============================================================

    /**
     * Check if dropdown is currently open
     */
    function isDropdownOpen() {
        const dropdownMenu = document.querySelector(CONFIG.selectors.folderDropdownMenu);
        return dropdownMenu && !dropdownMenu.classList.contains(CONFIG.classes.hidden);
    }

    /**
     * Open dropdown for drag operations
     */
    function openDropdownForDrag() {
        const dropdownButton = document.querySelector(CONFIG.selectors.folderDropdownButton);
        const dropdownMenu = document.querySelector(CONFIG.selectors.folderDropdownMenu);
        const dropdown = document.querySelector(CONFIG.selectors.folderDropdown);

        if (dropdownButton && dropdownMenu && dropdown) {
            dropdownButton.setAttribute('aria-expanded', 'true');
            dropdownMenu.classList.remove(CONFIG.classes.hidden);
            dropdown.classList.add(CONFIG.classes.folderDropdownOpen);
        }
    }

    // ============================================================
    //  Existing Core Functions (UNCHANGED)
    // ============================================================

    /**
     * Handles moving a favorite item to a different folder
     */
    function handleFolderTransfer(favoriteId, sourceFolderId, targetFolderId) {
        if (sourceFolderId === targetFolderId) {
            LOG.debug(MODULE, 'Folder transfer cancelled - same folder');
            Toast.show('Cannot move item to the same folder.', 'info');
            return;
        }

        const favorites = window.StateManager.get('favorites.items');
        const favoriteIndex = favorites.findIndex(fav => fav.id === favoriteId);

        if (favoriteIndex === -1) {
            LOG.error(MODULE, `Favorite not found for transfer: ${favoriteId}`);
            return;
        }

        const favoriteToMove = {
            ...favorites[favoriteIndex],
            folderId: targetFolderId
        };

        const updatedFavoritesWithoutMoved = favorites.filter(fav => fav.id !== favoriteId);
        updatedFavoritesWithoutMoved.push(favoriteToMove);

        window.StateManager.set('favorites.items', updatedFavoritesWithoutMoved);

        LOG.info(MODULE, `Transferred favorite ${favoriteId} from ${sourceFolderId} to ${targetFolderId}`);
        Toast.show(CONFIG.i18n.de.favoriteMoved, 'success');

        if (_currentFolder !== targetFolderId) {
            switchToFolder(targetFolderId);
        } else {
            renderFavoritesList(_currentFolder);
        }
    }

    /**
     * Handles reordering favorites within the same folder
     */
    function handleReorderDrop(draggedId, targetId) {
        const favorites = window.StateManager.get('favorites.items');
        const currentFolderFavorites = favorites.filter(fav => fav.folderId === _currentFolder);

        const draggedIndex = currentFolderFavorites.findIndex(fav => fav.id === draggedId);
        const targetIndex = currentFolderFavorites.findIndex(fav => fav.id === targetId);

        if (draggedIndex === -1 || targetIndex === -1) return;

        const [movedFavorite] = currentFolderFavorites.splice(draggedIndex, 1);
        currentFolderFavorites.splice(targetIndex, 0, movedFavorite);

        const otherFavorites = favorites.filter(fav => fav.folderId !== _currentFolder);
        const updatedFavorites = [...otherFavorites, ...currentFolderFavorites];

        window.StateManager.set('favorites.items', updatedFavorites);
        LOG.info(MODULE, `Reordered favorite ${draggedId} to position ${targetIndex}`);
    }

    // ============================================================
    //  Existing Folder Management Functions (UNCHANGED)
    // ============================================================

    function switchToFolder(folderId) {
        if (_currentFolder === folderId) {
            LOG.debug(MODULE, `Already in folder: ${folderId}, skipping switch`);
            closeDropdown();
            return;
        }

        LOG.debug(MODULE, `Switching to folder: ${folderId} from: ${_currentFolder}`);
        _currentFolder = folderId;

        const folders = window.StateManager.getFolders();
        updateDropdownButton(folderId, folders);
        updateDropdownActiveState(folderId);
        renderFavoritesList(folderId);
        closeDropdown();

        LOG.info(MODULE, `Switched to folder: ${folderId}`);
    }

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

    // ============================================================
    // Native Event System
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

        setTimeout(() => {
            try {
                if (!_currentFolder) {
                    _currentFolder = 'default';
                }

                updateFolderDropdown();
                setupDropdownInteractions();

                LOG.info(MODULE, 'Folder dropdown initialized successfully');
            } catch (error) {
                LOG.error(MODULE, 'Folder dropdown initialization failed:', error);
            }
        }, 100);
    }

    /**
     * Set up dropdown event listeners and interactions
     */
    function setupDropdownInteractions() {
        const dropdownButton = document.querySelector(CONFIG.selectors.folderDropdownButton);
        const dropdownMenu = document.querySelector(CONFIG.selectors.folderDropdownMenu);
        const dropdown = document.querySelector(CONFIG.selectors.folderDropdown);
        const createSection = dropdownMenu.querySelector(CONFIG.selectors.folderDropdownCreateSection);

        if (!dropdownButton || !dropdownMenu || !createSection) {
            LOG.error(MODULE, 'Dropdown elements not found for interaction setup');
            return;
        }

        // Toggle dropdown on button click
        dropdownButton.addEventListener('click', (e) => {
            // e.stopPropagation(); // TODO: BAD BAD BAD for drag and drop
            const isExpanded = dropdownButton.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;

            dropdownButton.setAttribute('aria-expanded', newState.toString());
            dropdownMenu.classList.toggle(CONFIG.classes.hidden, !newState);
            dropdown.classList.toggle(CONFIG.classes.folderDropdownOpen, newState);

            LOG.debug(MODULE, `Dropdown ${newState ? 'opened' : 'closed'}, current folder: ${_currentFolder}`);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                closeDropdown();
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
                LOG.debug(MODULE, `Folder selected: ${folderId}, current: ${_currentFolder}`);
                switchToFolder(folderId);
            } else if (renameBtn && !renameBtn.disabled) {
                // Rename folder
                //e.stopPropagation();
                const folderId = renameBtn.dataset.folderId;
                LOG.debug(MODULE, `Rename folder requested: ${folderId}`);
                renameFolder(folderId);
            } else if (deleteBtn && !deleteBtn.disabled) {
                // Delete folder
                //e.stopPropagation();
                const folderId = deleteBtn.dataset.folderId;
                LOG.debug(MODULE, `Delete folder requested: ${folderId}`);
                deleteFolder(folderId);
            } else if (createBtn) {
                // Create new folder
                //e.stopPropagation();
                LOG.debug(MODULE, 'Create folder requested');
                createNewFolder();
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
     * Update the entire dropdown display based on current state
     */
    function updateFolderDropdown() {
        const folders = window.StateManager.getFolders();
        const currentFolder = _currentFolder || 'default';
        const totalFolders = folders.length;
        const customFolders = folders.filter(f => f.id !== 'default');

        const dropdown = document.querySelector(CONFIG.selectors.folderDropdown);
        const dropdownButton = document.querySelector(CONFIG.selectors.folderDropdownButton);
        const dropdownItems = document.querySelector(CONFIG.selectors.folderDropdownItems);
        const dropdownMenu = document.querySelector(CONFIG.selectors.folderDropdownMenu);
        const emptyState = dropdownMenu.querySelector(CONFIG.selectors.folderDropdownEmpty);

        if (!dropdown || !dropdownButton || !dropdownItems || !dropdownMenu || !emptyState) {
            LOG.error(MODULE, 'Dropdown elements not found for update');
            return;
        }

        const hasCustomFolders = customFolders.length > 0;

        if (!hasCustomFolders) {
            // No custom folders - show empty state, hide items and create section
            dropdownButton.setAttribute('title', CONFIG.i18n.de.noCustomFolders);
            emptyState.classList.remove(CONFIG.classes.hidden);
            dropdownItems.classList.add(CONFIG.classes.hidden);
        } else {
            // Has custom folders - show items and create section, hide empty state
            dropdownButton.removeAttribute('title');
            emptyState.classList.add(CONFIG.classes.hidden);
            dropdownItems.classList.remove(CONFIG.classes.hidden);
        }

        // Update dropdown button content
        updateDropdownButton(currentFolder, folders);

        // Render folder items (this will update the create section badge)
        renderFolderDropdownItems(folders, currentFolder, dropdownItems);

        LOG.debug(MODULE, 'Folder dropdown fully updated', {
            currentFolder: currentFolder,
            totalFolders: totalFolders,
            customFolders: customFolders.length //,
            //enabled: !dropdown.classList.contains(CONFIG.classes.folderDropdownDisabled)
        });
    }

    /**
     * Update the dropdown button display
     */
    function updateDropdownButton(currentFolderId, folders) {
        const currentFolder = folders.find(f => f.id === currentFolderId);
        const button = document.querySelector(CONFIG.selectors.folderDropdownButton);
        const currentSpan = button.querySelector(CONFIG.selectors.folderDropdownCurrent);
        const badgesContainer = button.querySelector(CONFIG.selectors.folderDropdownBadges);

        if (!currentFolder || !currentSpan || !badgesContainer) {
            LOG.warn(MODULE, 'Dropdown button elements not found for update');
            return;
        }

        // Update the displayed folder name
        currentSpan.textContent = currentFolder.name;

        // Update badges
        const favoritesCountBadge = badgesContainer.querySelector(CONFIG.selectors.favoritesCount);
        const foldersCountBadge = badgesContainer.querySelector(CONFIG.selectors.foldersCount);

        if (favoritesCountBadge && foldersCountBadge) {
            const totalFavorites = window.StateManager.get('favorites.items')?.length || 0;
            const customFolderCount = folders.filter(f => f.id !== 'default').length;
            const totalFolders = folders.length;

            favoritesCountBadge.textContent = totalFavorites;
            foldersCountBadge.textContent = totalFolders;

            // Hide badges if zero
            favoritesCountBadge.style.display = totalFavorites > 0 ? 'inline-block' : 'none';
            foldersCountBadge.style.display = totalFolders > 0 ? 'inline-block' : 'none';

            LOG.debug(MODULE, 'Updated dropdown badges', {
                favorites: totalFavorites,
                folders: totalFolders,
                currentFolder: currentFolder.name
            });
        }

        _currentFolder = currentFolderId;
    }

    /**
     * Render folder items in the dropdown
     */
    function renderFolderDropdownItems(folders, currentFolderId, container) {
        if (!container) {
            LOG.error(MODULE, 'Dropdown items container not found');
            return;
        }

        // Get the parent dropdown menu to access the static sections
        const dropdownMenu = container.closest(CONFIG.selectors.folderDropdownMenu);
        if (!dropdownMenu) {
            LOG.error(MODULE, 'Dropdown menu not found');
            return;
        }

        // Clear only the folder items container
        container.innerHTML = '';

        const allFolders = folders;
        const customFolders = folders.filter(f => f.id !== 'default');
        const foldersRemaining = CONFIG.settings.maxFolders - customFolders.length;

        // Render all folder items
        allFolders.forEach(folder => {
            const favoriteCount = window.StateManager.getFolderFavoriteCount(folder.id);
            const isActive = folder.id === currentFolderId;

            const itemHTML = CONFIG.templates.folderDropdownItem(folder, isActive, favoriteCount);
            container.insertAdjacentHTML('beforeend', itemHTML);
        });

        // Update the static create section with current state
        updateCreateSection(dropdownMenu, foldersRemaining);

        LOG.debug(MODULE, `Rendered ${allFolders.length} folder items, active: ${currentFolderId}, folders remaining: ${foldersRemaining}`);
    }

    /**
     * Update the existing create section with current state
     */
    function updateCreateSection(dropdownMenu, foldersRemaining) {
        const createSection = dropdownMenu.querySelector(CONFIG.selectors.folderDropdownCreateSection);
        const createButton = dropdownMenu.querySelector(CONFIG.selectors.folderDropdownCreate);
        const createBadge = dropdownMenu.querySelector(CONFIG.selectors.folderDropdownCreateBadge);
        const limitMessage = dropdownMenu.querySelector(CONFIG.selectors.folderDropdownLimitMessage);

        if (!createSection || !createButton || !createBadge || !limitMessage) {
            LOG.error(MODULE, 'Create section elements not found');
            return;
        }

        const canCreateMore = foldersRemaining > 0;

        if (canCreateMore) {
            // Show create button, hide limit message
            createButton.classList.remove(CONFIG.classes.hidden);
            limitMessage.classList.add(CONFIG.classes.hidden);

            // Update the badge with remaining count
            createBadge.textContent = foldersRemaining;
        } else {
            // Show limit message, hide create button
            createButton.classList.add(CONFIG.classes.hidden);
            limitMessage.classList.remove(CONFIG.classes.hidden);
        }

        LOG.debug(MODULE, `Updated create section, folders remaining: ${foldersRemaining}`);
    }

    /**
     * Update active states in dropdown items
     */
    function updateDropdownActiveState(activeFolderId) {
        const dropdownItems = document.querySelectorAll(CONFIG.selectors.folderDropdownItem);

        dropdownItems.forEach(item => {
            const folderId = item.dataset.folderId;
            const isActive = folderId === activeFolderId;

            item.classList.toggle(CONFIG.classes.folderDropdownItemActive, isActive);
            item.setAttribute('aria-checked', isActive.toString());

            // Update the folder management buttons visibility (only show for active folder)
            const managementButtons = item.querySelector(CONFIG.selectors.folderManagementButtons);
            if (managementButtons) {
                managementButtons.classList.toggle(CONFIG.classes.hidden, !isActive);
            }
        });

        LOG.debug(MODULE, `Updated dropdown active state for folder: ${activeFolderId}`);
    }

    // ========================================================================
    // FOLDER MANAGEMENT FUNCTIONS
    // ========================================================================

    /**
     * Switches to a specific folder and updates the UI - FIXED VERSION
     */
    function switchToFolder(folderId) {
        // Prevent unnecessary switches to the same folder
        if (_currentFolder === folderId) {
            LOG.debug(MODULE, `Already in folder: ${folderId}, skipping switch`);
            closeDropdown();
            return;
        }

        LOG.debug(MODULE, `Switching to folder: ${folderId} from: ${_currentFolder}`);

        // Update the current folder
        _currentFolder = folderId;

        // Update the dropdown button display
        const folders = window.StateManager.getFolders();
        updateDropdownButton(folderId, folders);

        // Update active states in dropdown items
        updateDropdownActiveState(folderId);

        // Render the favorites for this folder
        renderFavoritesList(folderId);

        // Close the dropdown after selection
        closeDropdown();

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

    function createNewFolder(presetName = null) {
        const folders = window.StateManager.getFolders();
        const customFolders = folders.filter(f => f.id !== 'default');
        const foldersRemaining = CONFIG.settings.maxFolders - customFolders.length;

        // Check folder limit
        if (foldersRemaining <= 0) {
            Toast.show(CONFIG.i18n.de.folderLimitReached, 'warning');
            return;
        }

        // Determine if this is a retry (has preset name) or first attempt
        const isRetry = presetName !== null;

        // Build appropriate prompt message
        let promptMessage = `${CONFIG.i18n.de.enterFolderName}\n\n${CONFIG.i18n.de.foldersRemaining(foldersRemaining)}`;
        if (isRetry) {
            promptMessage += `\n\n⚠️ ${CONFIG.i18n.de.folderAlreadyExists}`;
        }

        // Use preset name as default if provided, otherwise generate default name
        const defaultName = presetName || `${CONFIG.i18n.de.folders} ${customFolders.length + 1}`;

        let folderName;
        let isValid = false;
        let validationError = '';

        // Validation loop - keep asking until valid input or cancellation
        while (!isValid) {
            folderName = prompt(
                validationError ? `${promptMessage}\n\n❌ ${validationError}` : promptMessage,
                folderName || defaultName // Keep their previous input for correction
            );

            // Handle user cancellation
            if (folderName === null) {
                LOG.debug(MODULE, CONFIG.i18n.de.folderCreationCancelled);
                return;
            }

            const trimmedName = folderName.trim();

            // Validate empty input
            if (!trimmedName) {
                validationError = CONFIG.i18n.de.folderNameEmpty;
                continue;
            }

            // Validate name length
            if (trimmedName.length > 30) {
                validationError = CONFIG.i18n.de.folderNameTooLong;
                continue;
            }

            // Validate name doesn't contain problematic characters
            if (/[<>:"/\\|?*]/.test(trimmedName)) {
                validationError = CONFIG.i18n.de.folderNameInvalidChars;
                continue;
            }

            // All validations passed
            isValid = true;
            folderName = trimmedName;
        }

        try {
            const folderId = window.StateManager.createFolder(folderName);

            if (folderId) {
                Toast.show(CONFIG.i18n.de.folderCreated, 'success');
                LOG.info(MODULE, `New folder created: ${folderName} (ID: ${folderId})`);

                // Switch to the newly created folder
                switchToFolder(folderId);

                // Update the dropdown to reflect changes
                updateFolderDropdown();
            } else {
                // This happens when folder name already exists - allow retry with current input
                Toast.show(CONFIG.i18n.de.folderAlreadyExists, 'warning');

                // Recursive call to allow retry with the same folder name pre-filled
                setTimeout(() => {
                    createNewFolder(folderName); // Recursive call with current name as preset
                }, 100);
            }
        } catch (error) {
            LOG.error(MODULE, 'Error creating folder:', error);
            Toast.show(CONFIG.i18n.de.folderCreationError, 'error');
        }
    }

    /**
     * Delete folder with confirmation and move favorites to default folder
     */
    function deleteFolder(folderId) {
        // Prevent deleting the default folder
        if (folderId === 'default') {
            Toast.show(CONFIG.i18n.de.cannotDeleteDefault, 'warning');
            return;
        }

        const folders = window.StateManager.getFolders();
        const folderToDelete = folders.find(f => f.id === folderId);

        if (!folderToDelete) {
            LOG.error(MODULE, `Folder not found for deletion: ${folderId}`);
            return;
        }

        // Get favorites in this folder to show count in confirmation
        const favoritesInFolder = window.StateManager.getFolderFavorites(folderId);
        const favoriteCount = favoritesInFolder.length;

        // Create confirmation message
        let confirmationMessage = CONFIG.i18n.de.confirmDelete(folderToDelete.name);
        if (favoriteCount > 0) {
            confirmationMessage += `\n\n${CONFIG.i18n.de.favoritesMovedToDefault(favoriteCount)}`;
        }

        // Show confirmation dialog
        const userConfirmed = confirm(confirmationMessage);

        if (!userConfirmed) {
            LOG.debug(MODULE, CONFIG.i18n.de.folderDeleteCancelled);
            return;
        }

        try {
            // Use StateManager to delete the folder (this automatically moves favorites to default)
            const success = window.StateManager.deleteFolder(folderId);

            if (success) {
                Toast.show(CONFIG.i18n.de.folderDeleted, 'success');
                LOG.info(MODULE, `Folder deleted: ${folderToDelete.name} (ID: ${folderId})`);

                // If we were in the deleted folder, switch back to default
                if (_currentFolder === folderId) {
                    switchToFolder('default');
                } else {
                    // Just update the dropdown to reflect the changes
                    updateFolderDropdown();
                }
            } else {
                Toast.show(CONFIG.i18n.de.folderDeleteError, 'error');
                LOG.error(MODULE, `Failed to delete folder: ${folderId}`);
            }
        } catch (error) {
            LOG.error(MODULE, 'Error deleting folder:', error);
            Toast.show(CONFIG.i18n.de.folderDeleteError, 'error');
        }
    }

    /**
     * Rename folder functionality
     */
    function renameFolder(folderId) {
        // Prevent renaming the default folder
        if (folderId === 'default') {
            Toast.show(CONFIG.i18n.de.cannotRenameDefault, 'warning');
            return;
        }

        const folders = window.StateManager.getFolders();
        const folderToRename = folders.find(f => f.id === folderId);

        if (!folderToRename) {
            LOG.error(MODULE, `Folder not found for rename: ${folderId}`);
            return;
        }

        const newName = prompt(
            CONFIG.i18n.de.enterNewFolderName,
            folderToRename.name
        );

        // Handle user cancellation
        if (newName === null) {
            LOG.debug(MODULE, CONFIG.i18n.de.folderRenameCancelled);
            return;
        }

        const trimmedName = newName.trim();

        // Validate input using existing i18n entries
        if (!trimmedName) {
            Toast.show(CONFIG.i18n.de.folderNameEmpty, 'warning');
            return;
        }

        if (trimmedName.length > 30) {
            Toast.show(CONFIG.i18n.de.folderNameTooLong, 'warning');
            return;
        }

        if (/[<>:"/\\|?*]/.test(trimmedName)) {
            Toast.show(CONFIG.i18n.de.folderNameInvalidChars, 'warning');
            return;
        }

        try {
            const success = window.StateManager.updateFolder(folderId, trimmedName);

            if (success) {
                Toast.show(CONFIG.i18n.de.folderRenamed, 'success');
                LOG.info(MODULE, `Folder renamed: ${folderToRename.name} → ${trimmedName} (ID: ${folderId})`);

                // Update the dropdown to reflect the new name
                updateFolderDropdown();

                // If this is the current folder, update the button text
                if (_currentFolder === folderId) {
                    const folders = window.StateManager.getFolders();
                    updateDropdownButton(folderId, folders);
                }
            } else {
                Toast.show(CONFIG.i18n.de.folderAlreadyExists, 'warning');
            }
        } catch (error) {
            LOG.error(MODULE, 'Error renaming folder:', error);
            Toast.show(CONFIG.i18n.de.folderRenameError, 'error');
        }
    }

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
        const favoritesList = document.querySelector(CONFIG.selectors.favoritesList);
        const skeleton = document.querySelector(CONFIG.selectors.favoritesSkeleton);
        const originalEmptyState = document.querySelector(CONFIG.selectors.emptyState);

        // Always hide skeleton first
        hideSkeletonLoading();

        // ✅ QUICK FIX: Always hide the original empty state
        if (originalEmptyState) {
            originalEmptyState.classList.add(CONFIG.classes.hidden);
        }

        if (favorites.length === 0) {
            // ✅ QUICK FIX: Clone the empty state into favorites list
            favoritesList.innerHTML = ''; // Clear any existing content

            if (originalEmptyState) {
                const emptyStateClone = originalEmptyState.cloneNode(true);
                emptyStateClone.classList.remove(CONFIG.classes.hidden);
                emptyStateClone.id = 'favorites-empty-state-clone'; // Avoid ID duplication
                emptyStateClone.setAttribute('data-empty-state', 'true');
                favoritesList.appendChild(emptyStateClone);

                // Update suggestions for the cloned empty state
                updateEmptyStateSuggestions();
            }

            favoritesList.classList.remove(CONFIG.classes.hidden);
            LOG.debug(MODULE, `Rendered cloned empty state for folder: ${folderId}`);
        } else {
            // Normal favorites rendering
            favoritesList.innerHTML = favorites.map(favorite =>
            CONFIG.templates.favoriteItem(favorite)
            ).join('');
            favoritesList.classList.remove(CONFIG.classes.hidden);

            LOG.debug(MODULE, `Rendered ${favorites.length} favorites for folder: ${folderId}`);
        }

        updateFolderBadgeCounts();
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
    function createFavorite(target, customTitle = null, favoriteType = 'section', folderId = _currentFolder) {
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

    function toggleFavorite(target, folderId = _currentFolder) {
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
            item.target === target && item.folderId === folderId
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
            //e.stopPropagation();
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
            //e.stopPropagation();
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
            //e.stopPropagation();
            const favoriteId = btn.dataset.favoriteId;
            removeFavorite(favoriteId);
        }
    }

    /**
     * Handle subsection selection button click in favorites sidebar
     */
    function handleSidebarSubsectionClick(event) {
        //event.preventDefault();
        //event.stopPropagation();

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

        // Initialize Drag And Drop for Favorite items
        initFavoritesDragAndDrop();

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

            // Initialize drag and drop systems
            initFavoritesDragAndDrop();
            initEnhancedDragHandles();

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

        // Native Event System
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
            eventTarget: () => _eventTarget,
            dispatchFavoritesEvent: dispatchFavoritesEvent,
            navigateToFavorite: navigateToFavorite,
            currentFolder: () => _currentFolder,
            createSubsectionFavorite: createSubsectionFavorite,
            dragState: () => _dragState
        } : undefined
    };
    LOG.debug(MODULE, 'FavoritesManager API exported with toggle support');

    LOG.debug(MODULE, 'Favorites Manager: Module loaded and auto-initialization scheduled');
})();
