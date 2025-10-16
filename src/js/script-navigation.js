// ============================================================================
// SCRIPT-NAVIGATION.JS - Navigation Sidebar & Hooks System
// ============================================================================

(function() {
    'use strict';

    const MODULE = 'NAVIGATION';

    // Private variables
    let _isInitialized = false;
    let _navigationBuilt = false;

    // ========================================================================
    // NAVIGATION HOOKS SYSTEM
    // ========================================================================
    const _navigationHooks = {
        afterItemCreation: []  // Array of callback functions
    };

    /**
     * Register a hook to be called after each nav item is created
     * @param {Function} callback - Receives (navItemElement, sectionId, sectionTitle)
     */
    function registerAfterItemCreation(callback) {
        if (typeof callback === 'function') {
            _navigationHooks.afterItemCreation.push(callback);
            LOG.debug(MODULE, `Navigation hook registered: afterItemCreation (total: ${_navigationHooks.afterItemCreation.length})`);
        } else {
            LOG.error(MODULE, 'registerAfterItemCreation: callback must be a function');
        }
    }

    /**
     * Execute all registered afterItemCreation hooks
     * @param {Element} navItem - The navigation item element
     * @param {string} sectionId - The section identifier
     * @param {string} sectionTitle - The section display title
     */
    function executeAfterItemCreationHooks(navItem, sectionId, sectionTitle) {
        if (_navigationHooks.afterItemCreation.length === 0) return;

        LOG.debug(MODULE, `Executing ${_navigationHooks.afterItemCreation.length} hooks for: ${sectionId}`);

        _navigationHooks.afterItemCreation.forEach((callback, index) => {
            try {
                callback(navItem, sectionId, sectionTitle);
                LOG.debug(MODULE, `Hook ${index} executed successfully for: ${sectionId}`);
            } catch (error) {
                LOG.error(MODULE, `Navigation hook ${index} failed for section ${sectionId}:`, error);
            }
        });
    }

    /**
     * Clear all registered navigation hooks
     * @param {string} hookType - Optional specific hook type to clear
     */
    function clearNavigationHooks(hookType = null) {
        if (hookType && _navigationHooks[hookType]) {
            _navigationHooks[hookType] = [];
            LOG.debug(MODULE, `Cleared hooks for: ${hookType}`);
        } else if (!hookType) {
            Object.keys(_navigationHooks).forEach(key => {
                _navigationHooks[key] = [];
            });
            LOG.debug(MODULE, 'Cleared all navigation hooks');
        }
    }

    // ========================================================================
    // NAVIGATION TREE
    // ========================================================================

    function buildNavigationTree() {
        LOG(MODULE, 'Building navigation tree...');

        const nav = document.querySelector('.nav-tree');

        if (!nav) {
            LOG.error(MODULE, 'Navigation element (.nav-tree) not found');
            return;
        }

        LOG.debug(MODULE, 'Found navigation element, building tree...');

        nav.innerHTML = '';

        // Sections über SectionManagement API abrufen
        const allSections = window.SectionManagement
        ? window.SectionManagement.getAllSections()
        : [];

        if (allSections.length === 0) {
            LOG.warn(MODULE, 'No sections available for navigation tree');
            return;
        }

        allSections.forEach(section => {
            const sectionId = section.dataset.section;
            const sectionTitle = section.dataset.title ||
            section.querySelector('h2')?.textContent?.trim() ||
            section.querySelector('h3')?.textContent?.trim() ||
            section.querySelector('h4')?.textContent?.trim() ||
            section.querySelector('h5')?.textContent?.trim() ||
            section.querySelector('h6')?.textContent?.trim() ||
            sectionId;

            const li = document.createElement('li');
            li.setAttribute('role', 'treeitem');

            const navItem = document.createElement('div');
            navItem.className = 'nav-item';
            navItem.dataset.section = sectionId;

            navItem.innerHTML = `
            <span class="nav-item-icon">▶</span>
            <span class="nav-item-text">${sectionTitle}</span>
            `;

            // Execute registered Callbacks for the afterItemCreation hook
            executeAfterItemCreationHooks(navItem, sectionId, sectionTitle);

            // Initial aktive Section aus StateManager holen
            const currentActive = window.StateManager.get('sections.currentActive');

            if (sectionId === currentActive) {
                navItem.classList.add('active');
            }

            // DOPPELKLICK für Navigation
            navItem.addEventListener('dblclick', (e) => {
                e.preventDefault();
                LOG(MODULE, `Navigation double-click: ${sectionId}`);

                if (window.SectionManagement) {
                    window.SectionManagement.scrollToSection(sectionId);
                }
            });

            li.appendChild(navItem);
            nav.appendChild(li);
        });

        LOG.success(MODULE, `Navigation tree built with ${allSections.length} items`);
    }

    function updateActiveNavItem() {
        // Alle nav-items deaktivieren
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Aktive Section aus StateManager holen (KORRIGIERT!)
        const currentActive = window.StateManager.get('sections.currentActive');

        // Entsprechendes nav-item aktivieren
        const activeItem = document.querySelector(`.nav-item[data-section="${currentActive}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            LOG.debug(MODULE, `Active nav item updated: ${currentActive}`);
        } else {
            LOG.warn(MODULE, `Nav item not found for section: ${currentActive}`);
        }
    }

    // ========================================================================
    // SIDEBAR INITIALIZATION
    // ========================================================================

    function initNavSidebar() {
        LOG(MODULE, 'Initializing navigation sidebar...');

        // Shortcut beim SidebarManager registrieren
        if (window.SidebarManager) {
            const registered = window.SidebarManager.registerShortcut('navigation', 'n');

            if (registered) {
                LOG.success(MODULE, 'Shortcut Alt+n registered with SidebarManager');
            } else {
                LOG.warn(MODULE, 'Shortcut Alt+n already taken');
            }
        } else {
            LOG.error(MODULE, 'SidebarManager not available!');
        }

        LOG.success(MODULE, 'Navigation sidebar initialized');
    }

    // ========================================================================
    // SECTION CHANGE LISTENERS
    // ========================================================================

    function initSectionChangeListeners() {
        LOG(MODULE, 'Initializing section change listeners...');

        window.addEventListener('sectionActivated', (e) => {
            const { sectionId } = e.detail;

            LOG.debug(MODULE, `Section activated event: ${sectionId}`);

            // Navigation aktualisieren
            updateActiveNavItem();
        });

        LOG.success(MODULE, 'Section change listeners initialized');
    }

    // ========================================================================
    // INITIALIZATION
    // ========================================================================

    function init() {
        if (_isInitialized) {
            LOG.warn(MODULE, 'Already initialized');
            return;
        }

        LOG.debug(MODULE, 'Initializing navigation module...');

        buildNavigationTree();
        initNavSidebar();
        initSectionChangeListeners();

        _isInitialized = true;
        LOG.success(MODULE, 'Navigation module initialized');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.NavigationManager = {
        init: init,
        updateActiveNavItem: updateActiveNavItem,
        registerAfterItemCreation: registerAfterItemCreation,
        clearNavigationHooks: clearNavigationHooks,
        isInitialized: () => _isInitialized
    };

    LOG(MODULE, 'Navigation module loaded');

})();
