// ============================================================================
// SCRIPT-NAVIGATION.JS - Version 040 (CSS-Namen korrigiert)
// Navigation, Sidebar, Menu, Breadcrumb
// ============================================================================

(function() {
    'use strict';

    const STATE = window.APP_STATE;
    const MODULE = 'NAV';

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

        STATE.allSections.forEach(section => {
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

            if (sectionId === STATE.currentActiveSection) {
                navItem.classList.add('active');
            }

            // DOPPELKLICK für Navigation (laut styles.css Kommentar)
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

        LOG.success(MODULE, `Navigation tree built with ${STATE.allSections.length} items`);
    }

    function updateActiveNavItem() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeItem = document.querySelector(`.nav-item[data-section="${STATE.currentActiveSection}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
            LOG.debug(MODULE, `Active nav item updated: ${STATE.currentActiveSection}`);
        }
    }

    // ========================================================================
    // SIDEBAR
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
    // MENU (Hamburger-Menü)
    // ========================================================================

    function initMenu() {
        LOG(MODULE, 'Initializing menu...');

        const menuBtn = document.getElementById('menu-toggle');
        const menuDropdown = document.getElementById('menu-dropdown');

        // Menu-Items
        const showHistoryBtn = document.getElementById('show-history-btn');
        const toggleNavBtn = document.getElementById('toggle-nav-sidebar-btn');
        const toggleTipsBtn = document.getElementById('toggle-tips-footer-btn');

        LOG.debug(MODULE, 'Menu elements:', {
            menuBtn: !!menuBtn,
            menuDropdown: !!menuDropdown,
            showHistoryBtn: !!showHistoryBtn,
            toggleNavBtn: !!toggleNavBtn,
            toggleTipsBtn: !!toggleTipsBtn
        });

        if (menuBtn) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu();
            });
        }

        // Menu-Item: History anzeigen
        if (showHistoryBtn) {
            showHistoryBtn.addEventListener('click', () => {
                // Nutze SidebarManager statt History.open()
                if (window.SidebarManager) {
                    window.SidebarManager.activate('history');
                }
                closeMenu();
            });
        }

        // Menu-Item: Navigation ein/aus
        if (toggleNavBtn) {
            toggleNavBtn.addEventListener('click', () => {
                // Nutze SidebarManager zum Toggle
                if (window.SidebarManager) {
                    const sidebar = document.getElementById('sidebar-navigation');

                    if (sidebar && sidebar.classList.contains('active')) {
                        // Sidebar ist aktiv → deaktivieren
                        window.SidebarManager.deactivate('navigation');
                    } else {
                        // Sidebar ist inaktiv → aktivieren
                        window.SidebarManager.activate('navigation');
                    }
                }

                closeMenu();
            });
        }

        // Menu-Item: Tipps ein/aus
        if (toggleTipsBtn) {
            toggleTipsBtn.addEventListener('click', () => {
                if (window.Tips) {
                    window.Tips.toggle();
                }
                closeMenu();
            });
        }

        // Schließe Menu bei Klick außerhalb
        document.addEventListener('click', (e) => {
            if (menuDropdown &&
                !menuDropdown.contains(e.target) &&
                menuBtn &&
                !menuBtn.contains(e.target)) {
                closeMenu();
                }
        });

        LOG.success(MODULE, 'Menu initialized');
    }

    function toggleMenu() {
        const menuDropdown = document.getElementById('menu-dropdown');
        const menuBtn = document.getElementById('menu-toggle');

        if (menuDropdown) {
            const isOpen = menuDropdown.classList.contains('open');

            if (isOpen) {
                closeMenu();
            } else {
                menuDropdown.classList.add('open');

                if (menuBtn) {
                    menuBtn.setAttribute('aria-expanded', 'true');
                }

                LOG(MODULE, 'Menu opened');
            }
        }
    }

    function closeMenu() {
        const menuDropdown = document.getElementById('menu-dropdown');
        const menuBtn = document.getElementById('menu-toggle');

        if (menuDropdown) {
            menuDropdown.classList.remove('open');

            if (menuBtn) {
                menuBtn.setAttribute('aria-expanded', 'false');
            }

            LOG(MODULE, 'Menu closed');
        }
    }

    // ========================================================================
    // BREADCRUMB
    // ========================================================================

    function initBreadcrumb() {
        LOG(MODULE, 'Initializing breadcrumb...');

        const breadcrumbCurrent = document.getElementById('breadcrumb-current');

        LOG.debug(MODULE, 'Breadcrumb element found:', !!breadcrumbCurrent);

        if (breadcrumbCurrent) {
            const firstSection = STATE.allSections[0];
            if (firstSection) {
                const title = firstSection.dataset.title ||
                firstSection.querySelector('h2')?.textContent?.trim() ||
                firstSection.querySelector('h3')?.textContent?.trim() ||
                firstSection.querySelector('h4')?.textContent?.trim() ||
                firstSection.querySelector('h5')?.textContent?.trim() ||
                firstSection.querySelector('h6')?.textContent?.trim() ||
                'Überblick';
        updateBreadcrumb(title);
        LOG.debug(MODULE, `Initial breadcrumb set to: ${title}`);
            }
        } else {
            LOG.warn(MODULE, 'Breadcrumb element (#breadcrumb-current) not found');
        }

        LOG.success(MODULE, 'Breadcrumb initialized');
    }

    function updateBreadcrumb(title) {
        const breadcrumbCurrent = document.getElementById('breadcrumb-current');
        if (breadcrumbCurrent) {
            breadcrumbCurrent.textContent = title;
            LOG.debug(MODULE, `Breadcrumb updated to: ${title}`);
        }
    }

    // ========================================================================
    // EVENT LISTENERS
    // ========================================================================

    function initSectionChangeListeners() {
        LOG(MODULE, 'Initializing section change listeners...');

        window.addEventListener('sectionActivated', (e) => {
            const { sectionId } = e.detail;

            LOG.debug(MODULE, `Section activated event: ${sectionId}`);

            updateActiveNavItem();

            // Nur Elemente im Hauptbereich werden untersucht, daher muss main vorangestellt werden, sonst kommt die Antwort aus dem nav-sidebar
            const section = document.querySelector(`main [data-section="${sectionId}"]`);
            if (section) {
                // Robuste Titel-Ermittlung mit Fallback-Kette
                const title = section.dataset.title?.trim() ||
                section.querySelector('h2')?.textContent?.trim() ||
                section.querySelector('h3')?.textContent?.trim() ||
                section.querySelector('h4')?.textContent?.trim() ||
                section.querySelector('h5')?.textContent?.trim() ||
                section.querySelector('h6')?.textContent?.trim() ||
                'Unbenannt';

                LOG.debug(MODULE, `Breadcrumb title: "${title}" for section: ${sectionId}`);
                updateBreadcrumb(title);
            } else {
                LOG.warn(MODULE, `Section not found: ${sectionId}`);
            }
        });

        LOG.success(MODULE, 'Section change listeners initialized');
    }

    // ========================================================================
    // INITIALISIERUNG
    // ========================================================================

    function initNavigation() {
        LOG(MODULE, 'Initializing navigation module...');

        buildNavigationTree();
        initNavSidebar();
        initMenu();
        initBreadcrumb();
        initSectionChangeListeners();

        LOG.success(MODULE, 'Navigation module initialized');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.Navigation = {
        init: initNavigation,
        updateActiveNavItem: updateActiveNavItem,
        updateBreadcrumb: updateBreadcrumb,
        toggleMenu: toggleMenu,
        closeMenu: closeMenu
    };

    LOG(MODULE, 'Navigation module loaded');

})();
