// ============================================================================
// SCRIPT-INIT.JS - Version 040
// Haupt-Initialisierung: Orchestriert alle Module
// ============================================================================

(function() {
    'use strict';

    const MODULE = 'INIT';

    LOG(MODULE, `Starting application initialization... Build ${window.BUILD_INFO.version}`);

    // ========================================================================
    // INITIALISIERUNGS-REIHENFOLGE
    // ========================================================================

    document.addEventListener('DOMContentLoaded', () => {
        LOG(MODULE, 'DOM ready, initializing modules...');

        // 1. Preferences laden (als erstes)
        if (window.Preferences) {
            window.Preferences.init();
        } else {
            LOG.error(MODULE, 'Preferences module not loaded!');
        }

        // 2. Section Management (Kern-Funktionalität)
        if (window.SectionManagement) {
            window.SectionManagement.init();
        } else {
            LOG.error(MODULE, 'SectionManagement module not loaded!');
        }

        // 3. Sidebar Manager (VOR Navigation/History!)
        if (window.SidebarManager) {
            window.SidebarManager.init();
        } else {
            LOG.error(MODULE, 'SidebarManager module not loaded!');
        }

        // 4. Navigation (benötigt Section Management)
        if (window.Navigation) {
            window.Navigation.init();
        } else {
            LOG.error(MODULE, 'Navigation module not loaded!');
        }

        // 5. History
        if (window.History) {
            window.History.init();
        } else {
            LOG.warn(MODULE, 'History module not loaded');
        }

        // 6. Notes
        if (window.Notes) {
            window.Notes.init();
        } else {
            LOG.warn(MODULE, 'Notes module not loaded');
        }

        // 7. Detail Level
        if (window.DetailLevel) {
            window.DetailLevel.init();
        } else {
            LOG.warn(MODULE, 'DetailLevel module not loaded');
        }

        // 8. Tips
        if (window.Tips) {
            window.Tips.init();
        } else {
            LOG.warn(MODULE, 'Tips module not loaded');
        }

        LOG.separator(MODULE, 'INITIALIZATION COMPLETE');
        LOG.success(MODULE, `✓ Application initialization complete! Build ${window.BUILD_INFO.version}`);

        // Trigger Event für externe Listener
        window.dispatchEvent(new CustomEvent('appInitialized'));
    });

    // ========================================================================
    // ERROR HANDLING
    // ========================================================================

    window.addEventListener('error', (e) => {
        LOG.error(MODULE, 'Global error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
        LOG.error(MODULE, 'Unhandled promise rejection:', e.reason);
    });

})();
