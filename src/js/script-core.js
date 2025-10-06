// ============================================================================
// SCRIPT-CORE.JS - Version 059
// Basis-Funktionen, globale Variablen und Logging-System
// ============================================================================

// ============================================================================
// BUILD INFORMATION
// ============================================================================

window.BUILD_INFO = {
    version: '059',
    buildDate: '2025-10-06', // 4. Oktober 2025
    debugMode: true  // Auf false setzen für Production
};

// ============================================================================
// CENTRALIZED LOGGING SYSTEM
// ============================================================================

/**
 * Zentrales Logging-System
 * Automatisch mit Build-Version, Modul-Name und Zeilennummer
 *
 * Verwendung:
 *   LOG('SECTION', 'Info message');
 *   LOG('NAV', 'Found elements', { count: 5 });
 *   LOG.warn('SECTION', 'Warning message');
 *   LOG.error('NAV', 'Error occurred', errorObject);
 */
window.LOG = function(module, message, data) {
    if (!window.BUILD_INFO.debugMode) return;

    // Hole Caller-Information (Script + Zeile)
    const stack = new Error().stack;
    const callerInfo = extractCallerInfo(stack);

    // Baue Log-Prefix
    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    const location = callerInfo ? ` ${callerInfo}` : '';

    // Log-Ausgabe
    if (data !== undefined) {
        console.log(`${prefix}${location} ${message}`, data);
    } else {
        console.log(`${prefix}${location} ${message}`);
    }
};

/**
 * Warning-Level Logging
 */
window.LOG.warn = function(module, message, data) {
    if (!window.BUILD_INFO.debugMode) return;

    const stack = new Error().stack;
    const callerInfo = extractCallerInfo(stack);

    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    const location = callerInfo ? ` ${callerInfo}` : '';

    if (data !== undefined) {
        console.warn(`${prefix}${location} ⚠️ ${message}`, data);
    } else {
        console.warn(`${prefix}${location} ⚠️ ${message}`);
    }
};

/**
 * Error-Level Logging
 */
window.LOG.error = function(module, message, data) {
    // Errors werden IMMER geloggt, auch wenn debugMode = false

    const stack = new Error().stack;
    const callerInfo = extractCallerInfo(stack);

    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    const location = callerInfo ? ` ${callerInfo}` : '';

    if (data !== undefined) {
        console.error(`${prefix}${location} ❌ ${message}`, data);
    } else {
        console.error(`${prefix}${location} ❌ ${message}`);
    }
};

/**
 * Success-Level Logging (für wichtige Erfolgs-Meldungen)
 */
window.LOG.success = function(module, message, data) {
    if (!window.BUILD_INFO.debugMode) return;

    const stack = new Error().stack;
    const callerInfo = extractCallerInfo(stack);

    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    const location = callerInfo ? ` ${callerInfo}` : '';

    if (data !== undefined) {
        console.log(`${prefix}${location} ✓ ${message}`, data);
    } else {
        console.log(`${prefix}${location} ✓ ${message}`);
    }
};

/**
 * Debug-Level Logging (nur im Debug-Modus)
 */
window.LOG.debug = function(module, message, data) {
    if (!window.BUILD_INFO.debugMode) return;

    const stack = new Error().stack;
    const callerInfo = extractCallerInfo(stack);

    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    const location = callerInfo ? ` ${callerInfo}` : '';

    if (data !== undefined) {
        console.debug(`${prefix}${location} 🔍 ${message}`, data);
    } else {
        console.debug(`${prefix}${location} 🔍 ${message}`);
    }
};

/**
 * Extrahiert Script-Name und Zeilennummer aus Stack-Trace
 *
 * @param {string} stack - Error.stack String
 * @returns {string|null} - Formatierte Caller-Info "script-name.js:123"
 */
/**
 * Extrahiert Script-Name und Zeilennummer aus Stack-Trace
 * Robusterer Ansatz für verschiedene Browser und Umgebungen
 */
function extractCallerInfo(stack) {
    if (!stack) return null;

    try {
        const lines = stack.split('\n');

        // Definiere welche Funktionen wir überspringen wollen
        const internalPatterns = [
            /at LOG\./,
            /at window\.LOG/,
            /at Object\.LOG/,
            /at LOG\s/,
            /extractCallerInfo/
        ];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();

            // Überspringe interne LOG-Funktionen
            const isInternal = internalPatterns.some(pattern =>
            pattern.test(line)
            );

            if (isInternal) {
                continue;
            }

            // Verbesserte Regex für verschiedene Stack-Trace-Formate:
            // - "at functionName (file.js:10:20)"
            // - "at file.js:10:20"
            // - "at http://localhost/file.js:10:20"
            const match = line.match(/(?:\s+at\s+.*?\()?([^()]+?):(\d+):(\d+)\)?$/);

            if (match) {
                const fullPath = match[1];
                const lineNumber = match[2];

                // Extrahiere nur den Dateinamen aus dem Pfad
                const fileName = fullPath.split(/[\/\\]/).pop();

                // Überspringe unsere eigene Logging-Datei
                if (fileName === 'script-core.js' || !fileName) {
                    continue;
                }

                return `${fileName}:${lineNumber}`;
            }
        }
    } catch (e) {
        // Silent fail - besser kein Logging hier, um Endlosschleifen zu vermeiden
        return null;
    }

    return null;
}

/**
 * Separator für Log-Blöcke (visuelle Trennung)
 */
window.LOG.separator = function(module, title) {
    if (!window.BUILD_INFO.debugMode) return;

    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    console.log(`${prefix} ${'='.repeat(60)}`);
    if (title) {
        console.log(`${prefix} ${title}`);
        console.log(`${prefix} ${'='.repeat(60)}`);
    }
};

/**
 * Gruppen-Logging (collapsible in Browser Console)
 */
window.LOG.group = function(module, title) {
    if (!window.BUILD_INFO.debugMode) return;

    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    console.group(`${prefix} ${title}`);
};

window.LOG.groupEnd = function() {
    if (!window.BUILD_INFO.debugMode) return;
    console.groupEnd();
};

// ============================================================================
// GLOBALE VARIABLEN - Shared State
// WIRD VOM STATE MANAGER GEPROXIED - Struktur muss kompatibel sein!
// ============================================================================

window.APP_STATE = {
    // Section Management (direkt auf Root für Kompatibilität)
    currentActiveSection: 'intro',
    allSections: [],
    lastNavigationTime: 0,
    lastNavigatedSection: null,
    lastSectionChangeTime: 0,
    lastChangedToSection: null,

    // Scroll State (direkt auf Root für Kompatibilität)
    lastScrollY: 0,
    lastDirection: 'down',
    userIsScrolling: false,
    scrollTimeout: null,
    isProcessingIntersection: false,
    isProcessingScroll: false,
    lastScrollIntentionTime: 0,
    focusObserver: null,
    scrollCallCounter: 0,

    // UI State (direkt auf Root für Legacy-Kompatibilität)
    sidebarsOpen: [],  // Array: ['navigation', 'history']
    activeSidebarTab: null,  // 'navigation' | 'history' | 'favorites'

    // Preferences (verschachtelt - wird vom StateManager verwaltet)
    preferences: {
        detailLevel: 'bestpractice',
        timeFormat: 'relative',
        showTips: true,
        autoSaveNotes: true,
        sidebarsOpen: ['navigation'],  // Default: Navigation offen
        activeSidebarTab: 'navigation'
    },

    // History & Notes (direkt auf Root für Kompatibilität)
    history: [],
    notesContent: '',
    notesSaveTimer: null
};

// ============================================================================
// KONSTANTEN
// ============================================================================

window.APP_CONSTANTS = {
    NAVIGATION_PRIORITY_DURATION: 500,
    NAVIGATION_PRIORITY_OFFSET: 80,
    SECTION_CHANGE_COOLDOWN: 150,
    SCROLL_INTENTION_COOLDOWN: 200,
    NOTES_AUTOSAVE_DELAY: 2000,
    TIPS_ROTATION_INTERVAL: 10000,
    STORAGE_KEYS: {
        HISTORY: 'sectionHistory',
        NOTES: 'userNotes',
        PREFERENCES: 'userPreferences'
    }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

window.scrollToElement = function(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

window.checkIfFullyVisible = function(element) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    return rect.top >= 0 && rect.bottom <= viewportHeight;
};

window.getRelativeTime = function(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'gerade eben';
    if (minutes < 60) return `vor ${minutes} Min`;
    if (hours < 24) return `vor ${hours} Std`;
    return `vor ${days} Tag${days !== 1 ? 'en' : ''}`;
};

window.getAbsoluteTime = function(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} Uhr`;
};

window.showSaveIndicator = function(message = 'Gespeichert!', duration = 2000) {
    let indicator = document.getElementById('save-indicator');

    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'save-indicator';
        indicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s;
        `;
        document.body.appendChild(indicator);
    }

    indicator.textContent = message;
    indicator.style.opacity = '1';

    setTimeout(() => {
        indicator.style.opacity = '0';
    }, duration);
};

// ============================================================================
// Color-Theme
// ============================================================================

function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    // State Manager übernimmt Persistierung
    if (window.StateManager) {
        window.StateManager.set('preferences.theme', themeName);
    }
    updateMetaThemeColor(themeName);
}

function initTheme() {
    const saved = localStorage.getItem('theme-preference');
    if (saved) {
        setTheme(saved);
        return;
    }

    // Respektiere System-Präferenz
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
}

function updateMetaThemeColor(theme) {
    const colors = {
        'light': '#FAFAFA',
        'dark': '#121212',
        'contrast-high': '#FFFFFF',
        'contrast-inverse': '#000000'
    };
    document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', colors[theme] || colors.light);
}

// FOUC (Flash of Unstyled Content) vermeiden
(function() {
    // Temporäre Lösung bis StateManager geladen ist
    const saved = localStorage.getItem('userPreferences');
    let theme = 'light';
    if (saved) {
        try {
            const prefs = JSON.parse(saved);
            theme = prefs.theme || 'light';
        } catch(e) {}
    }
    if (!saved) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
})();

// ============================================================================
// MODULE LOADED
// ============================================================================

LOG('CORE', `Core module loaded - Build ${window.BUILD_INFO.version} (${window.BUILD_INFO.buildDate})`);


/**
 * Test-Suite für das Logging-System
 */
function testLoggingSystem() {
    console.log('=== STARTING LOGGING TESTS ===');

    // Test 1: Basic log from known location
    function testBasicLog() {
        LOG('TEST', 'This should show the correct line number');
    }

    // Test 2: Log with data
    function testLogWithData() {
        const testData = { user: 'test', action: 'login' };
        LOG('TEST', 'User action', testData);
    }

    // Test 3: Different log levels
    function testDifferentLevels() {
        LOG.warn('TEST', 'Warning message');
        LOG.error('TEST', 'Error message');
        LOG.success('TEST', 'Success message');
        LOG.debug('TEST', 'Debug message');
    }

    // Test 4: Nested function calls
    function outerFunction() {
        innerFunction();
    }

    function innerFunction() {
        LOG('TEST', 'Log from nested function call');
    }

    // Test 5: Test separator and groups
    function testSpecialFunctions() {
        LOG.separator('TEST', 'Test Section');
        LOG.group('TEST', 'Test Group');
        LOG('TEST', 'Message inside group');
        LOG.groupEnd();
    }

    // Run all tests
    testBasicLog();
    testLogWithData();
    testDifferentLevels();
    outerFunction();
    testSpecialFunctions();

    console.log('=== LOGGING TESTS COMPLETE ===');

    // Manuelle Überprüfung:
    console.log(`
    MANUAL VERIFICATION CHECKLIST:
    ✓ Basic LOG shows correct file and line number
    ✓ LOG.warn shows correct file and line number
    ✓ LOG.error shows correct file and line number
    ✓ LOG.success shows correct file and line number
    ✓ LOG.debug shows correct file and line number
    ✓ Nested function calls show correct location
    ✓ All logs show the module name and version
    ✓ Separator and group functions work properly
    `);
}

// Utility function to test stack trace directly
function debugStackTrace() {
    console.log('=== STACK TRACE DEBUG ===');
    const stack = new Error().stack;
    console.log('Full stack trace:');
    console.log(stack);

    console.log('Parsed lines:');
    const lines = stack.split('\n');
    lines.forEach((line, index) => {
        console.log(`[${index}]: ${line.trim()}`);
    });
}

// Enable debug mode for testing
if (!window.BUILD_INFO) {
    window.BUILD_INFO = {
        debugMode: true,
        version: 'test-1.0.0'
    };
}

// Run tests when ready
//testLoggingSystem();
//debugStackTrace();
