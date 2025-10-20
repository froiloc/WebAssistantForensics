// ============================================================================
// SCRIPT-PREFERENCES.JS - Version 040
// User Preferences: Persistente Speicherung von Einstellungen
// ============================================================================

(function() {
    'use strict';

    const CONST = window.APP_CONSTANTS;
    const MODULE = 'PREFS';

    // ========================================================================
    // PREFERENCES MANAGEMENT
    // ========================================================================

    // ============================================================================
    // In loadUserPreferences() Funktion, nach dem JSON.parse():
    // ============================================================================

    function loadUserPreferences() {
        LOG(MODULE, 'Loading user preferences from StateManager...');

        // StateManager hat bereits geladen - nur Migration durchführen
        let tempPrefs;
        if (window.StateManager) {
            tempPrefs = window.StateManager.get('preferences');
            LOG.debug(MODULE, 'Using StateManager for preferences');
        } else {
            LOG.error(MODULE, 'StateManager is not available!');
            // Default-Preferences als Notfall-Fallback
            tempPrefs = {
                detailLevel: 'bestpractice',
                timeFormat: 'relative',
                showTips: true,
                autoSaveNotes: true,
                sidebarsOpen: ['navigation'],
                activeSidebarTab: 'navigation'
            };
        }

        const prefs = tempPrefs;

        // Migrationen (falls nötig)
        let migrated = false;

        if (prefs.detailLevel === 'beginner') {
            prefs.detailLevel = 'basic';
            migrated = true;
        }
        if (prefs.detailLevel === 'intermediate') {
            prefs.detailLevel = 'bestpractice';
            migrated = true;
        }

        if (migrated && window.StateManager) {
            window.StateManager.set('preferences', prefs);
        }

        LOG.info(MODULE, 'Loaded preferences:', prefs);

        window.dispatchEvent(new CustomEvent('preferencesLoaded', {
            detail: { preferences: prefs }
        }));
    }

    function saveUserPreferences() {
        if (!window.StateManager) {
            LOG.warn(MODULE, 'StateManager not available');
            return;
        }

        // StateManager übernimmt automatisches Speichern
        LOG.debug(MODULE, 'Preferences auto-saved by StateManager');

        // Trigger Event für UI-Updates
        window.dispatchEvent(new CustomEvent('preferencesSaved', {
            detail: { preferences: window.StateManager.get('preferences') }
        }));
    }

    function setPreference(key, value) {
        if (!window.StateManager) {
            LOG.error(MODULE, 'StateManager not available');
            return;
        }

        const oldValue = window.StateManager.get(`preferences.${key}`);
        window.StateManager.set(`preferences.${key}`, value);

        LOG(MODULE, `Preference changed: ${key}: ${oldValue} → ${value}`);
    }

    function getPreference(key) {
        return window.StateManager.get(`preferences.${key}`);
    }

    function resetPreferences() {
        if (confirm('Alle Einstellungen zurücksetzen?')) {
            window.StateManager.set(`preferences`, {
                detailLevel: 'bestpractice',
                timeFormat: 'relative',
                showTips: true,
                autoSaveNotes: true
            });

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

        LOG.info(MODULE, 'Preferences module initialized');
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
