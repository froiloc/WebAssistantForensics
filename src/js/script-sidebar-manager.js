// ============================================================================
// SCRIPT-SIDEBAR-MANAGER.JS - Version 042
// Zentrale Verwaltung der Sidebar-Infrastruktur
// ============================================================================

(function() {
    'use strict';

    const STATE = window.APP_STATE;
    const CONST = window.APP_CONSTANTS;
    const MODULE = 'SIDEBAR-MGR';

    // Shortcut-Registry: Key = Buchstabe, Value = Sidebar-Name
    const shortcuts = new Map();

    // ========================================================================
    // SHORTCUT-VERWALTUNG
    // ========================================================================

    function registerShortcut(sidebarName, key) {
        const normalizedKey = key.toLowerCase();

        if (shortcuts.has(normalizedKey)) {
            LOG.warn(MODULE,
                     `⚠️ Shortcut conflict: Alt+${normalizedKey.toUpperCase()} already registered by '${shortcuts.get(normalizedKey)}'`
            );
            return false;
        }

        shortcuts.set(normalizedKey, sidebarName);
        LOG.success(MODULE, `Registered shortcut: Alt+${normalizedKey.toUpperCase()} → ${sidebarName}`);
        return true;
    }

    // ========================================================================
    // SIDEBAR AKTIVIERUNG / DEAKTIVIERUNG
    // ========================================================================

    function activateSidebar(sidebarName) {
        LOG(MODULE, `Activating sidebar: ${sidebarName}`);

        const sidebar = document.getElementById(`sidebar-${sidebarName}`);
        const container = document.getElementById('sidebar-container');

        if (!sidebar) {
            LOG.error(MODULE, `Sidebar element not found: #sidebar-${sidebarName}`);
            return;
        }

        deactivateAllSidebars();
        sidebar.classList.add('active');
        sidebar.style.display = 'flex'; // ✅ Zeige Sidebar

        container.classList.add('open');

        STATE.activeSidebarTab = sidebarName;

        // ✅ NEU: Füge zu sidebarsOpen hinzu, wenn nicht vorhanden
        if (!STATE.sidebarsOpen.includes(sidebarName)) {
            STATE.sidebarsOpen.push(sidebarName);
        }

        saveSidebarPreferences();
        LOG.success(MODULE, `✓ Sidebar activated: ${sidebarName}`);
    }

    function deactivateSidebar(sidebarName) {
        LOG(MODULE, `Deactivating sidebar: ${sidebarName}`);

        const sidebar = document.getElementById(`sidebar-${sidebarName}`);
        const container = document.getElementById('sidebar-container');

        if (!sidebar) {
            LOG.warn(MODULE, `Sidebar element not found: #sidebar-${sidebarName}`);
            return;
        }

        sidebar.classList.remove('active');
        sidebar.classList.add('closing');

        setTimeout(() => {
            sidebar.style.display = 'none'; // ✅ Verstecke Sidebar
            sidebar.classList.remove('closing');
        }, 300); // Nach Animation verstecken

        STATE.sidebarsOpen = STATE.sidebarsOpen.filter(s => s !== sidebarName);

        if (STATE.sidebarsOpen.length === 0) {
            container.classList.remove('open');
            STATE.activeSidebarTab = null;
            LOG(MODULE, 'All sidebars closed, container hidden');
        } else {
            const firstRemaining = STATE.sidebarsOpen[0];
            const firstSidebar = document.getElementById(`sidebar-${firstRemaining}`);
            if (firstSidebar) {
                firstSidebar.classList.add('active');
                firstSidebar.style.display = 'flex'; // ✅ Zeige verbleibende Sidebar
                STATE.activeSidebarTab = firstRemaining;
                LOG(MODULE, `Auto-activated remaining sidebar: ${firstRemaining}`);
            }
        }

        saveSidebarPreferences();
    }

    function deactivateAllSidebars() {
        document.querySelectorAll('.sidebar-wrapper').forEach(sidebar => {
            sidebar.classList.remove('active');
        });
    }

    function closeSidebarContainer() {
        LOG(MODULE, 'Closing entire sidebar container');

        const container = document.getElementById('sidebar-container');
        if (container) {
            container.classList.remove('open');
        }

        deactivateAllSidebars();
        STATE.sidebarsOpen = [];
        STATE.activeSidebarTab = null;
        saveSidebarPreferences();

        LOG.success(MODULE, 'Sidebar container closed');
    }

    // ========================================================================
    // KEYBOARD-SHORTCUT HANDLING
    // ========================================================================

    function toggleSidebarByShortcut(sidebarName) {
        const sidebar = document.getElementById(`sidebar-${sidebarName}`);
        if (!sidebar) return;

        const isActive = sidebar.classList.contains('active');
        const isInContainer = STATE.sidebarsOpen.includes(sidebarName);

        if (isActive) {
            LOG(MODULE, `Shortcut toggle: Deactivating ${sidebarName}`);
            deactivateSidebar(sidebarName);
        } else if (isInContainer) {
            LOG(MODULE, `Shortcut toggle: Switching to ${sidebarName}`);
            activateSidebar(sidebarName);
        } else {
            LOG(MODULE, `Shortcut toggle: Activating ${sidebarName}`);
            activateSidebar(sidebarName);
        }
    }

    function activateNextSidebar() {
        // ✅ KORRIGIERT: Detailliertes Logging VOR der Prüfung
        LOG.debug(MODULE, `🔍 activateNextSidebar called:`);
        LOG.debug(MODULE, `  - sidebarsOpen: [${STATE.sidebarsOpen.join(', ')}] (length: ${STATE.sidebarsOpen.length})`);
        LOG.debug(MODULE, `  - activeSidebarTab: ${STATE.activeSidebarTab}`);

        if (STATE.sidebarsOpen.length <= 1) {
            LOG.debug(MODULE, `❌ Cannot switch: only ${STATE.sidebarsOpen.length} sidebar(s) open`);
            return;
        }

        const currentIndex = STATE.sidebarsOpen.indexOf(STATE.activeSidebarTab);
        const nextIndex = (currentIndex + 1) % STATE.sidebarsOpen.length;
        const nextSidebar = STATE.sidebarsOpen[nextIndex];

        activateSidebar(nextSidebar);
        LOG(MODULE, `✓ Switched to next sidebar: ${nextSidebar}`);
    }

    function initKeyboardShortcuts() {
        LOG(MODULE, 'Initializing keyboard shortcuts...');

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const container = document.getElementById('sidebar-container');
                if (container && container.classList.contains('open')) {
                    e.preventDefault();
                    closeSidebarContainer();
                    LOG(MODULE, 'ESC: Closed sidebar container');
                }
                return;
            }

            if (e.altKey && e.key === '<') {
                e.preventDefault();
                activateNextSidebar();
                return;
            }

            if (e.altKey && !e.ctrlKey && !e.shiftKey) {
                const key = e.key.toLowerCase();
                if (shortcuts.has(key)) {
                    e.preventDefault();
                    toggleSidebarByShortcut(shortcuts.get(key));
                }
            }
        });

        LOG.success(MODULE, 'Keyboard shortcuts initialized');
    }

    // ========================================================================
    // PREFERENCES
    // ========================================================================

    function saveSidebarPreferences() {
        if (!window.StateManager) {
            LOG.warn(MODULE, 'StateManager not available, sidebar state not saved');
            return;
        }

        // In den StateManager schreiben
        window.StateManager.set('preferences.sidebarsOpen', STATE.sidebarsOpen);
        window.StateManager.set('preferences.activeSidebarTab', STATE.activeSidebarTab);

        LOG.debug(MODULE, `🔍 Saved preferences: open=[${STATE.sidebarsOpen}], active=${STATE.activeSidebarTab}`);
    }

    function loadSidebarStates() {
        LOG(MODULE, 'Loading sidebar states from StateManager...');

        // Preferences aus StateManager holen (oder Fallback auf STATE)
        const sidebarsOpen = window.StateManager
        ? window.StateManager.get('preferences.sidebarsOpen')
        : (STATE.preferences?.sidebarsOpen || []);

        const activeSidebarTab = window.StateManager
        ? window.StateManager.get('preferences.activeSidebarTab')
        : (STATE.preferences?.activeSidebarTab || null);

        LOG.debug(MODULE, `Loading: open=[${sidebarsOpen}], active=${activeSidebarTab}`);

        if (window.innerWidth > 1024) {
            // Schritt 1: Alle Sidebars in STATE.sidebarsOpen registrieren
            // WICHTIG: Initialisieren falls undefined
            if (!STATE.sidebarsOpen) {
                STATE.sidebarsOpen = [];
            }

            sidebarsOpen.forEach(sidebarName => {
                if (!STATE.sidebarsOpen.includes(sidebarName)) {
                    STATE.sidebarsOpen.push(sidebarName);
                }
            });

            // Schritt 2: Nur die aktive Sidebar aktivieren (mit deactivateAllSidebars)
            if (activeSidebarTab && sidebarsOpen.includes(activeSidebarTab)) {
                activateSidebar(activeSidebarTab);
                LOG.success(MODULE, `Restored active sidebar: ${activeSidebarTab}`);
            }

            // Schritt 3: Container öffnen
            const container = document.getElementById('sidebar-container');
            if (STATE.sidebarsOpen.length > 0) {
                container.classList.add('open');
            }
        }

        LOG.debug(MODULE, `Loaded state: open=[${sidebarsOpen}], active=${activeSidebarTab}`);
    }

    // ============================================================================
    // ERWEITERUNG: Close-Buttons im Tab-Header
    // Einfügen in script-sidebar-manager.js nach initKeyboardShortcuts()
    // ============================================================================

    /**
     * Initialisiert Close-Buttons in allen Sidebar Tab-Headers
     *
     * Funktionsweise:
     * - Findet alle .sidebar-close-btn Elemente
     * - Registriert Click-Listener
     * - Verhindert Event-Bubbling (stopPropagation)
     * - Ruft deactivateSidebar() für die entsprechende Sidebar auf
     */
    function initCloseButtons() {
        LOG(MODULE, 'Initializing close buttons in tab headers...');

        // Alle Close-Buttons finden (in allen Sidebars)
        const closeButtons = document.querySelectorAll('.sidebar-close-btn');

        if (closeButtons.length === 0) {
            LOG.warn(MODULE, 'No close buttons found in tab headers');
            return;
        }

        LOG.debug(MODULE, `Found ${closeButtons.length} close button(s)`);

        // Event-Listener für jeden Close-Button registrieren
        closeButtons.forEach(btn => {
            const sidebarName = btn.dataset.sidebar;

            if (!sidebarName) {
                LOG.warn(MODULE, 'Close button missing data-sidebar attribute', btn);
                return;
            }

            btn.addEventListener('click', (e) => {
                // WICHTIG: Event-Bubbling stoppen!
                // Verhindert, dass der Tab-Header-Click (aktivieren) gefeuert wird
                e.stopPropagation();

                LOG(MODULE, `Close button clicked: ${sidebarName}`);

                // Sidebar deaktivieren (schließen)
                deactivateSidebar(sidebarName);
            });

            LOG.debug(MODULE, `Close button registered: ${sidebarName}`);
        });

        LOG.success(MODULE, 'Close buttons initialized');
    }

    /**
     * Initialisiert Click-Verhalten für Tab-Header
     *
     * Funktionsweise:
     * - Tab-Header aktiviert Sidebar (wenn inaktiv)
     * - Tab-Header wechselt zum nächsten Sidebar (wenn bereits aktiv)
     */
    function initTabHeaders() {
        LOG(MODULE, 'Initializing tab header click handlers...');

        const tabButtons = document.querySelectorAll('.sidebar-tab-button');

        tabButtons.forEach(btn => {
            const sidebarName = btn.dataset.sidebar;

            if (!sidebarName) {
                LOG.warn(MODULE, 'Tab button missing data-sidebar attribute', btn);
                return;
            }

            btn.addEventListener('click', (e) => {
                const sidebar = document.getElementById(`sidebar-${sidebarName}`);

                if (!sidebar) {
                    LOG.error(MODULE, `Sidebar not found: #sidebar-${sidebarName}`);
                    return;
                }

                const isActive = sidebar.classList.contains('active');

                if (!isActive) {
                    // Sidebar ist inaktiv → aktivieren
                    LOG(MODULE, `Tab header clicked: Activating ${sidebarName}`);
                    activateSidebar(sidebarName);
                } else {
                    // Sidebar ist aktiv → zur nächsten wechseln
                    LOG(MODULE, `Tab header clicked: Active sidebar, switching to next`);
                    activateNextSidebar();
                }
            });

            LOG.debug(MODULE, `Tab header registered: ${sidebarName}`);
        });

        LOG.success(MODULE, 'Tab header click handlers initialized');
    }

    /**
     * Initialisiert Mobile-Auto-Close
     * Schließt Sidebar automatisch nach Navigation auf Mobile
     */
    function initMobileAutoClose() {
        LOG(MODULE, 'Initializing mobile auto-close...');

        const container = document.getElementById('sidebar-container');

        if (!container) {
            LOG.warn(MODULE, 'Sidebar container not found');
            return;
        }

        // Click-Event auf Container
        container.addEventListener('click', (e) => {
            // Nur auf Mobile reagieren
            if (window.innerWidth >= 768) return;

            // Prüfe ob Event von einem navigierbaren Element kommt
            const isNavigatable = e.target.closest('.nav-item, .history-item');

            if (isNavigatable) {
                LOG(MODULE, 'Mobile: Auto-closing sidebar after navigation');
                closeAll();
            }
        });

        LOG.success(MODULE, 'Mobile auto-close initialized');
    }

    // ========================================================================
    // INITIALISIERUNG
    // ========================================================================

    function initSidebarManager() {
        LOG(MODULE, 'Initializing sidebar manager...');

        initKeyboardShortcuts();
        initCloseButtons();
        initTabHeaders();
        initMobileAutoClose();

        setTimeout(() => {
            loadSidebarStates();
        }, 100);

        LOG.success(MODULE, 'Sidebar manager initialized');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.SidebarManager = {
        init: initSidebarManager,
        registerShortcut: registerShortcut,
        activate: activateSidebar,
        deactivate: deactivateSidebar,
        closeAll: closeSidebarContainer
    };

    LOG(MODULE, 'Sidebar manager module loaded');

})();
