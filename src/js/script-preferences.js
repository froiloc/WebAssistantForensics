// ============================================================================
// SCRIPT-PREFERENCES.JS - Version 040
// User Preferences: Persistente Speicherung von Einstellungen
// ============================================================================

(function() {
    'use strict';

    const STATE = window.APP_STATE;
    const CONST = window.APP_CONSTANTS;
    const MODULE = 'PREFS';

    // ========================================================================
    // PREFERENCES MANAGEMENT
    // ========================================================================

    // ============================================================================
    // In loadUserPreferences() Funktion, nach dem JSON.parse():
    // ============================================================================

    function loadUserPreferences() {
        LOG(MODULE, 'Loading user preferences...');

        try {
            const stored = localStorage.getItem(CONST.STORAGE_KEYS.PREFERENCES);

            if (stored) {
                const prefs = JSON.parse(stored);

                // MIGRATION 1: Alte Level-Namen (bestehend)
                if (prefs.detailLevel === 'beginner') {
                    prefs.detailLevel = 'basic';
                    LOG(MODULE, 'Migrated detailLevel: beginner → basic');
                }
                if (prefs.detailLevel === 'intermediate') {
                    prefs.detailLevel = 'bestpractice';
                    LOG(MODULE, 'Migrated detailLevel: intermediate → bestpractice');
                }

                // NEU: MIGRATION 2: Alte sidebarOpen (Boolean) → sidebarsOpen (Array)
                if (typeof prefs.sidebarOpen === 'boolean') {
                    prefs.sidebarsOpen = prefs.sidebarOpen ? ['navigation'] : [];
                    delete prefs.sidebarOpen;
                    LOG(MODULE, 'Migrated sidebarOpen (Boolean) → sidebarsOpen (Array)');
                }

                // NEU: Fallback für fehlende Sidebar-Preferences
                if (!prefs.sidebarsOpen) {
                    prefs.sidebarsOpen = ['navigation'];
                }
                if (!prefs.activeSidebarTab) {
                    prefs.activeSidebarTab = 'navigation';
                }

                // Merge mit Default-Preferences
                STATE.preferences = {
                    ...STATE.preferences,
                    ...prefs
                };

                LOG.success(MODULE, 'Loaded preferences:', STATE.preferences);

                // Triggere Event damit andere Module Preferences anwenden können
                window.dispatchEvent(new CustomEvent('preferencesLoaded', {
                    detail: { preferences: STATE.preferences }
                }));

            } else {
                LOG.debug(MODULE, 'No stored preferences, using defaults');

                // Auch bei Defaults das Event triggern
                window.dispatchEvent(new CustomEvent('preferencesLoaded', {
                    detail: { preferences: STATE.preferences }
                }));
            }
        } catch (e) {
            LOG.error(MODULE, 'Failed to load preferences', e);
            STATE.preferences = {
                detailLevel: 'bestpractice',
                timeFormat: 'relative',
                showTips: true,
                autoSaveNotes: true,
                sidebarsOpen: ['navigation'],
                activeSidebarTab: 'navigation'
            };
        }
    }

    function saveUserPreferences() {
        LOG(MODULE, 'Saving user preferences...');

        try {
            localStorage.setItem(
                CONST.STORAGE_KEYS.PREFERENCES,
                JSON.stringify(STATE.preferences)
            );

            LOG.success(MODULE, 'Preferences saved:', STATE.preferences);
        } catch (e) {
            LOG.error(MODULE, 'Failed to save preferences', e);
        }
    }

    function setPreference(key, value) {
        const oldValue = STATE.preferences[key];
        STATE.preferences[key] = value;
        saveUserPreferences();

        LOG(MODULE, `Preference changed: ${key}: ${oldValue} → ${value}`);
    }

    function getPreference(key) {
        return STATE.preferences[key];
    }

    function resetPreferences() {
        if (confirm('Alle Einstellungen zurücksetzen?')) {
            STATE.preferences = {
                detailLevel: 'bestpractice',  // GEÄNDERT
                timeFormat: 'relative',
                showTips: true,
                autoSaveNotes: true
            };

            saveUserPreferences();

            window.dispatchEvent(new CustomEvent('preferencesReset'));

            LOG(MODULE, 'Preferences reset to defaults');
            window.showSaveIndicator('Einstellungen zurückgesetzt');

            // Reload um alle Module neu zu initialisieren
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    // ========================================================================
    // INITIALISIERUNG
    // ========================================================================

    function initPreferences() {
        LOG(MODULE, 'Initializing preferences module...');

        loadUserPreferences();

        LOG.success(MODULE, 'Preferences module initialized');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.Preferences = {
        init: initPreferences,
        load: loadUserPreferences,
        save: saveUserPreferences,
        set: setPreference,
        get: getPreference,
        reset: resetPreferences
    };

    LOG(MODULE, 'Preferences module loaded');

})();
