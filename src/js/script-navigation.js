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
            section.querySelector('h2')?.textContent ||
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

                    // Schließe Sidebar auf Mobile nach Navigation
                    if (window.innerWidth <= 1024) {
                        closeNavSidebar();
                    }
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

        const sidebar = document.getElementById('nav-sidebar');
        const closeBtn = document.getElementById('close-nav-sidebar');

        LOG.debug(MODULE, 'Sidebar elements:', {
            sidebar: !!sidebar,
            closeBtn: !!closeBtn
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeNavSidebar);
            LOG.debug(MODULE, 'Close button listener attached');
        }

        // KEYBOARD SHORTCUTS für Navigation-Sidebar
        document.addEventListener('keydown', (e) => {
            // ALT + N: Toggle Navigation-Sidebar
            if (e.altKey && e.key.toLowerCase() === 'n') {
                e.preventDefault();
                toggleNavSidebar();
                LOG(MODULE, 'Alt+N shortcut triggered');
            }
        });

        LOG.success(MODULE, 'Keyboard shortcuts registered: Alt+N (toggle), ESC (close)');

        // Öffne Sidebar initial auf Desktop (> 1024px)
        if (window.innerWidth > 1024 && sidebar) {
            sidebar.classList.add('open');
            document.body.classList.add('nav-sidebar-open');
            LOG(MODULE, 'Sidebar opened initially (desktop)');
        }

        LOG.success(MODULE, 'Navigation sidebar initialized');
    }

    function toggleNavSidebar() {
        const sidebar = document.getElementById('nav-sidebar');
        const body = document.body;

        if (sidebar) {
            const isOpen = sidebar.classList.contains('open');

            if (isOpen) {
                closeNavSidebar();
            } else {
                sidebar.classList.add('open');
                body.classList.add('nav-sidebar-open');
                LOG(MODULE, 'Sidebar opened (toggle)');
            }
        }
    }

    function closeNavSidebar() {
        const sidebar = document.getElementById('nav-sidebar');
        const body = document.body;

        if (sidebar) {
            sidebar.classList.remove('open');
            body.classList.remove('nav-sidebar-open');
            LOG(MODULE, 'Sidebar closed');
        }
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
                if (window.History) {
                    window.History.open();
                }
                closeMenu();
            });
        }

        // Menu-Item: Navigation ein/aus
        if (toggleNavBtn) {
            toggleNavBtn.addEventListener('click', () => {
                toggleNavSidebar();
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
                firstSection.querySelector('h2')?.textContent ||
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

            const section = document.querySelector(`[data-section="${sectionId}"]`);
            if (section) {
                const title = section.dataset.title ||
                section.querySelector('h2')?.textContent ||
                'Unbenannt';
        updateBreadcrumb(title);
            }

            // Schließe Sidebar auf Mobile
            if (window.innerWidth < 768) {
                closeNavSidebar();
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
 toggleSidebar: toggleNavSidebar,
 closeSidebar: closeNavSidebar,
 toggleMenu: toggleMenu,
 closeMenu: closeMenu
    };

    LOG(MODULE, 'Navigation module loaded');

})();
