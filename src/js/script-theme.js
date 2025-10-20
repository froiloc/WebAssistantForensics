// ===== THEME MANAGEMENT =====
// Modul: script-theme.js
// Verwaltet Theme-Wechsel (Tag, Nacht, Hochkontrast)

(function() {
    'use strict';

    const MODULE = 'THEME';

    // ===== THEME KONSTANTEN =====
    const THEMES = {
        SYSTEM: 'system',
        LIGHT: 'light',
        DARK: 'dark',
        CONTRAST_HIGH: 'contrast-high',
        CONTRAST_INVERSE: 'contrast-inverse'
    };

    const THEME_NAMES = {
        'system': 'System',
        'light': 'Tag',
        'dark': 'Nacht',
        'contrast-high': 'Kontrast+',
        'contrast-inverse': 'Kontrast-'
    };

    const THEME_ORDER = [
        THEMES.SYSTEM,
        THEMES.LIGHT,
        THEMES.DARK,
        THEMES.CONTRAST_HIGH,
        THEMES.CONTRAST_INVERSE
    ];

    let _isInitialized = false;
    let currentTheme = THEMES.SYSTEM;

    // ===== INITIALISIERUNG =====
    function initTheme() {
        LOG(MODULE, 'Initializing theme system...');

        // Gespeicherte Theme-Präferenz laden
        loadThemePreference();

        // Theme-Button Event-Listener
        const themeButton = document.getElementById('toggle-theme');
        if (themeButton) {
            themeButton.addEventListener('click', cycleTheme);
            LOG.info(MODULE, 'Theme toggle button initialized');
        } else {
            LOG.warn(MODULE, 'Theme toggle button (#toggle-theme) not found');
        }

        // System Theme Change Listener
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', handleSystemThemeChange);

        _isInitialized = true;

        LOG.info(MODULE, `Theme system initialized with theme: ${currentTheme}`);
    }

    // ===== THEME LADEN =====
    function loadThemePreference() {
        try {
            const saved = localStorage.getItem('axiom-guide-theme');

            if (saved && Object.values(THEMES).includes(saved)) {
                currentTheme = saved;
                LOG(MODULE, `Loaded saved theme: ${currentTheme}`);
            } else {
                currentTheme = THEMES.SYSTEM;
                LOG(MODULE, 'No saved theme, using system default');
            }

            applyTheme(currentTheme);
            updateThemeDisplay();

        } catch (e) {
            LOG.error(MODULE, 'Error loading theme preference:', e);
            currentTheme = THEMES.SYSTEM;
            applyTheme(currentTheme);
        }
    }

    // ===== THEME WECHSELN (ZYKLISCH) =====
    function cycleTheme() {
        const currentIndex = THEME_ORDER.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
        const nextTheme = THEME_ORDER[nextIndex];

        LOG(MODULE, `Cycling theme: ${currentTheme} → ${nextTheme}`);

        currentTheme = nextTheme;
        applyTheme(currentTheme);
        saveThemePreference();
        updateThemeDisplay();
    }

    // ===== THEME ANWENDEN =====
    function applyTheme(theme) {
        const root = document.documentElement;

        if (theme === THEMES.SYSTEM) {
            // System-Präferenz erkennen
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const systemTheme = prefersDark ? 'dark' : 'light';

            // data-theme Attribut entfernen, damit :root greift
            root.removeAttribute('data-theme');

            // Optional: System-Theme als Fallback setzen
            if (prefersDark) {
                root.setAttribute('data-theme', 'dark');
            }

            LOG.debug(MODULE, `Applied system theme (detected: ${systemTheme})`);
        } else {
            // Explizites Theme setzen
            root.setAttribute('data-theme', theme);
            LOG.debug(MODULE, `Applied theme: ${theme}`);
        }

        // Meta Theme Color aktualisieren (für Mobile Browser)
        updateMetaThemeColor(theme);
    }

    // ===== META THEME COLOR (MOBILE) =====
    function updateMetaThemeColor(theme) {
        let metaTheme = document.querySelector('meta[name="theme-color"]');

        if (!metaTheme) {
            metaTheme = document.createElement('meta');
            metaTheme.name = 'theme-color';
            document.head.appendChild(metaTheme);
        }

        const colors = {
            'system': '#FAFAFA',    // Tag als Fallback
            'light': '#FAFAFA',
            'dark': '#121212',
            'contrast-high': '#FFFFFF',
            'contrast-inverse': '#000000'
        };

        // Bei System: Aktuelle System-Präferenz prüfen
        let color = colors[theme];
        if (theme === THEMES.SYSTEM) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            color = prefersDark ? colors.dark : colors.light;
        }

        metaTheme.setAttribute('content', color);
        LOG.debug(MODULE, `Meta theme-color updated: ${color}`);
    }

    // ===== THEME-ANZEIGE AKTUALISIEREN =====
    function updateThemeDisplay() {
        const displayElement = document.getElementById('current-theme');

        if (displayElement) {
            const displayName = THEME_NAMES[currentTheme] || currentTheme;
            displayElement.textContent = displayName;
            LOG.debug(MODULE, `Theme display updated: ${displayName}`);
        }
    }

    // ===== THEME SPEICHERN =====
    function saveThemePreference(theme) {
        if (window.StateManager) {
            window.StateManager.set('preferences.theme', theme);
        } else {
            localStorage.setItem('theme-preference', theme);
        }
    }

    // ===== SYSTEM-THEME-ÄNDERUNG (AUTO-SWITCH) =====
    function handleSystemThemeChange(e) {
        // Nur reagieren, wenn aktuell auf System-Theme
        if (currentTheme === THEMES.SYSTEM) {
            const newSystemTheme = e.matches ? 'dark' : 'light';
            LOG(MODULE, `System theme changed to: ${newSystemTheme}`);
            applyTheme(THEMES.SYSTEM);
        }
    }

    // ===== ÖFFENTLICHE API =====
    window.ThemeManager = {
        init: initTheme,
        setTheme: function(theme) {
            if (Object.values(THEMES).includes(theme)) {
                currentTheme = theme;
                applyTheme(theme);
                saveThemePreference(theme);
                updateThemeDisplay();
                return true;
            }
            return false;
        },
        getTheme: () => currentTheme,
        getAvailableThemes: () => THEMES,
        cycleTheme: cycleTheme,
        isInitialized: () => _isInitialized
    };

})();
