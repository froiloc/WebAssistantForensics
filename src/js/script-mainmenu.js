// ============================================================================
// SCRIPT-MAINMENU.JS - Hamburger Menu & Dropdown
// ============================================================================

(function() {
    'use strict';

    const MODULE = 'MAINMENU';

    let _isInitialized = false;

    // ========================================================================
    // MENU FUNCTIONS
    // ========================================================================

    function init() {
        LOG(MODULE, 'Initializing main menu...');

        const menuBtn = document.getElementById('menu-toggle');
        const menuDropdown = document.getElementById('menu-dropdown');

        // Menu-Items
        const showHistoryBtn = document.getElementById('show-history-btn');
        const toggleNavBtn = document.getElementById('toggle-nav-sidebar-btn');
        const toggleFavBtn = document.getElementById('toggle-favorites-sidebar-btn');
        const toggleTipsBtn = document.getElementById('toggle-tips-footer-btn');

        LOG.debug(MODULE, 'Menu elements:', {
            menuBtn: !!menuBtn,
            menuDropdown: !!menuDropdown,
            showHistoryBtn: !!showHistoryBtn,
            toggleNavBtn: !!toggleNavBtn,
            toggleFavBtn: !!toggleFavBtn,
            toggleTipsBtn: !!toggleTipsBtn
        });

        // Menu Toggle
        if (menuBtn) {
            menuBtn.addEventListener('click', toggleMenu);
        }

        // Show History Sidebar
        if (showHistoryBtn) {
            showHistoryBtn.addEventListener('click', () => {
                if (window.SidebarManager) {
                    window.SidebarManager.toggleSidebar('history');
                }
                closeMenu();
            });
        }

        // Toggle Navigation Sidebar
        if (toggleNavBtn) {
            toggleNavBtn.addEventListener('click', () => {
                if (window.SidebarManager) {
                    window.SidebarManager.toggleSidebar('navigation');
                }
                closeMenu();
            });
        }

        // Toggle Favorites Sidebar
        if (toggleFavBtn) {
            toggleFavBtn.addEventListener('click', () => {
                if (window.SidebarManager) {
                    window.SidebarManager.toggleSidebar('favorites');
                }
                closeMenu();
            });
        }

        // Toggle Tips Footer
        if (toggleTipsBtn) {
            toggleTipsBtn.addEventListener('click', () => {
                if (window.Tips) {
                    window.Tips.toggle();
                }
                closeMenu();
            });
        }

        _isInitialized = true;
        LOG.info(MODULE, 'Main menu initialized');
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
                menuDropdown.setAttribute('aria-hidden', 'false');

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
            menuDropdown.setAttribute('aria-hidden', 'true');

            if (menuBtn) {
                menuBtn.setAttribute('aria-expanded', 'false');
            }

            LOG(MODULE, 'Menu closed');
        }
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.MainMenuManager = {
        init: init,
        toggleMenu: toggleMenu,
        closeMenu: closeMenu,
        isInitialized: () => _isInitialized
    };

    LOG(MODULE, 'Main menu module loaded');

})();
