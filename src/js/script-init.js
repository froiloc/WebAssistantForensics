// ============================================================================
// COMPLETE MODULE INITIALIZATION
// ============================================================================
(function() {
    'use strict';

    const MODULE = 'INIT';

    // Check dependencies
    if (typeof window.LOG === 'undefined') {
        console.error(`${MODULE}: LOG object not available. Favorites Manager disabled.`);
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        LOG(MODULE, 'DOM ready, initializing all modules in order...');

        // CRITICAL FOUNDATION (must initialize first)
        const criticalModules = [
            { name: 'StateManagerModule', required: true },
            { name: 'Preferences', required: true },
            { name: 'SectionManagement', required: true },
            { name: 'SidebarManager', required: true }
        ];

        // CORE MODULES
        const coreModules = [
            { name: 'NavigationStarsManager', required: false }, // ← init before NavigationManager
            { name: 'NavigationManager', required: true },
            { name: 'BreadcrumbManager', required: true },
            { name: 'MainMenuManager', required: true },
            { name: 'FavoritesManager', required: true },
            { name: 'Toast', required: true }
        ];

        // UI ENHANCEMENTS
        const uiModules = [
            { name: 'History', required: false },
            { name: 'Notes', required: false },
            { name: 'DetailLevel', required: false },
            { name: 'Tips', required: false },
            { name: 'BreadcrumbStarManager', required: false },
            { name: 'GlossaryManager', required: false }
        ];

        // Initialize in proper dependency order
        initializeModuleGroup(criticalModules, 'Critical Foundation');
        initializeModuleGroup(coreModules, 'Core Modules');
        initializeModuleGroup(uiModules, 'UI Enhancements');

        LOG.separator(MODULE, '✅ INITIALIZATION COMPLETE');
        LOG.success(MODULE, `✅ All modules initialized! Build ${window.BUILD_INFO.version}`);

        // Final system ready event
        window.dispatchEvent(new CustomEvent('appInitialized'));
    });

    /**
    * Initialize a group of modules with proper error handling
    */
    function initializeModuleGroup(modules, groupName) {
        LOG(MODULE, `Initializing ${groupName}...`);

        modules.forEach(module => {
            const globalName = module.name;
            const manager = window[globalName];

            if (manager && typeof manager.init === 'function') {
                try {
                    manager.init();
                    LOG.success(MODULE, `✅ ${globalName} initialized`);
                } catch (error) {
                    LOG.error(MODULE, `❌ ${globalName} initialization failed:`, error);
                }
            } else {
                const message = `${globalName} not available`;
                module.required ? LOG.error(MODULE, `❌ ${message}`) : LOG.warn(MODULE, `⚠️ ${message}`);
            }
        });
    }

})();
