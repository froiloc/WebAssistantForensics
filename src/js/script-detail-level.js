// ============================================================================
// SCRIPT-DETAIL-LEVEL.JS - Version 041
// Detail-Level-System: Basic, Best Practice, Expert
// ============================================================================

/**
 * Detail Level Management System
 * Controls progressive disclosure of content across three nested detail levels
 *
 * Features:
 * - Three detail levels: Basic (1), Best Practice (2), Expert (3)
 * - Persistent user preferences via StateManager
 * - Responsive UI controls with active state management
 * - Event-driven architecture for preferences synchronization
 *
 * Structure Rules:
 * - Level 1 ⊆ Level 2 ⊆ Level 3 (Matryoshka pattern)
 * - Level 1: Basic information only
 * - Level 2: Best practices and recommended approaches
 * - Level 3: All technical details and background
 *
 * @version 1.2.0
 * @license MIT
 */

(function() {
    'use strict';

/**
 * Module identifier for logging purposes
 * @constant {string}
 */
const MODULE = 'DETAIL';

/**
 * Mapping between numeric values and level names
 * @constant {Object}
 */
const LEVEL_MAP = {
    '1': '1',
    '2': '2',
    '3': '3',
    'basic': '1',
    'bestpractice': '2',
    'expert': '3',
};

/**
 * Reverse mapping for button activation
 * @constant {Object}
 */
const LEVEL_TO_NUMBER = {
    'basic': '1',
    'bestpractice': '2',
    'expert': '3'
};

/**
 * Global configuration object for detail level system
 * @namespace CONFIG
 */
const CONFIG = {
    /**
     * CSS classes used by the detail level system
     * @namespace classes
     */
    classes : {
        detailLevel1: 'detail-level-1',
        detailLevel2: 'detail-level-2',
        detailLevel3: 'detail-level-3',
        detailLevelBtn: 'detail-level-btn',
        detailBtnMini: 'detail-btn-mini',
        active: 'active'
    }
}

/**
 * Generate CSS selectors from class configuration
 * Converts class names to CSS selectors for DOM queries
 */
CONFIG.selectors = Object.keys(CONFIG.classes).reduce((acc, key) => {
    // Prepend '.' to the class value to create a class selector
    if (typeof CONFIG.classes[key] === 'string')
    {
        acc[key] = `.${CONFIG.classes[key]}`;
    } else if (typeof CONFIG.classes[key] === 'function')
    {
        acc[key] = (a) => `.${CONFIG.classes[key](a)}`;
    }
    return acc;
}, {});

// Extend with additional non-class selectors
CONFIG.selectors = {
    ...CONFIG.selectors,
    // Add new, non-class selectors
    detailLevelInfo: '#detail-level-info'
}

/**
 * Internationalization strings for UI labels
 * @namespace i18n
 */
CONFIG.i18n = {
    de: {
        level1: 'Zeigt nur grundlegende Informationen',
 level2: 'Zeigt Best Practices und empfohlene Ansätze',
 level3: 'Zeigt alle technischen Details und Hintergründe'
    }
};

/**
 * Track initialization state to prevent multiple initializations
 * @private
 * @type {boolean}
 */
let _isInitialized = false;

// ========================================================================
// DETAIL LEVEL MANAGEMENT
// ========================================================================

/**
 * Sets the active detail level and updates all UI components
 * @param {string|number} level - The detail level to set (1/2/3 or basic/bestpractice/expert)
 * @returns {void}
 */
function setDetailLevel(level) {
    // Konvertiere numerischen Wert zu Level-Namen
    const normalizedLevel = LEVEL_MAP[level];

    if (!normalizedLevel) {
        LOG.error(MODULE, `Invalid level: ${level} (expected: 1/2/3 or basic/bestpractice/expert)`);
        return;
    }

    updateDetailVisibility(normalizedLevel);
    updateInfoText(normalizedLevel);
    updateActiveButton(normalizedLevel);

    if (window.StateManager) {
        window.StateManager.set('preferences.detailLevel', level);
    }
}

/**
 * Updates the visibility of detail level elements based on current level
 * @private
 * @param {string} level - The normalized detail level (1/2/3)
 * @returns {void}
 */
function updateDetailVisibility(level) {
    const currentLevel = LEVEL_MAP[level]

    const level1Elements = document.querySelectorAll(CONFIG.selectors.detailLevel1);
    level1Elements.forEach(el => el.style.display = 'block');

    const level2Elements = document.querySelectorAll(CONFIG.selectors.detailLevel2);
    level2Elements.forEach(el => {
        el.style.display = currentLevel >= 2 ? 'block' : 'none';
    });

    const level3Elements = document.querySelectorAll(CONFIG.selectors.detailLevel3);
    level3Elements.forEach(el => {
        el.style.display = currentLevel >= 3 ? 'block' : 'none';
    });
    LOG(MODULE, `Visibility updated: body.detail-level-${currentLevel}`);
}

/**
 * Updates the information text display based on current detail level
 * @private
 * @param {string} level - The detail level name
 * @returns {void}
 */
function updateInfoText(level) {
    const infoElement = document.getElementById(CONFIG.selectors.detailLevelInfo);
    if (!infoElement) {
        LOG.debug(MODULE, `Info element (${CONFIG.selectors.detailLevelInfo}) not found`);
        return;
    }

    const infoTexts = {
        basic: CONFIG.i18n.de.level1,
 best_practice: CONFIG.i18n.de.level2,
 expert: CONFIG.i18n.de.level3
    };

    infoElement.textContent = infoTexts[level] || '';
    LOG.debug(MODULE, `Info text updated: ${infoTexts[level]}`);
}

/**
 * Updates the active state of detail level control buttons
 * @private
 * @param {string} level - The detail level name
 * @returns {void}
 */
function updateActiveButton(level) {
    // Entferne .active von allen Buttons
    document.querySelectorAll(`${CONFIG.i18n.de.detailLevelBtn}, ${CONFIG.i18n.de.detailBtnMini}`).forEach(btn => {
        btn.classList.remove(CONFIG.classes.active);
    });

    // Konvertiere Level zu Nummer für Button-Selektor
    const levelNumber = LEVEL_TO_NUMBER[level];

    LOG.debug(MODULE, `Looking for buttons with data-level="${levelNumber}" or "${level}"`);

    // Aktiviere Buttons mit passendem data-level (numerisch oder Wort)
    const selectors = [
        `${CONFIG.selectors.detailLevelBtn}[data-level="${levelNumber}"]`,
 `${CONFIG.selectors.detailLevelBtn}[data-level="${level}"]`,
 `${CONFIG.selectors.detailBtnMini}[data-level="${levelNumber}"]`,
 `${CONFIG.selectors.detailBtnMini}[data-level="${level}"]`
    ];

    const activeButtons = document.querySelectorAll(selectors.join(', '));

    activeButtons.forEach(btn => {
        btn.classList.add(CONFIG.classes.active);
        LOG.debug(MODULE, `Activated button: data-level="${btn.dataset.level}"`);
    });

    if (activeButtons.length > 0) {
        LOG.info(MODULE, `Active button(s) updated: ${level} (${activeButtons.length} buttons)`);
    } else {
        LOG.warn(MODULE, `No buttons found for level: ${level}/${levelNumber}`);

        // Debug: Liste alle verfügbaren Buttons
        const allButtons = document.querySelectorAll(`${CONFIG.selectors.detailLevelBtn}, ${CONFIG.selectors.detailBtnMini}`);
        LOG.debug(MODULE, 'Available buttons:', Array.from(allButtons).map(btn => ({
            text: btn.textContent.trim(),
                                                                                   level: btn.dataset.level
        })));
    }
}

// ========================================================================
// UI - CONTROLS
// ========================================================================

/**
 * Initializes event listeners for detail level control buttons
 * @private
 * @returns {void}
 */
function initDetailLevelControls() {
    LOG(MODULE, 'Initializing detail level controls...');

    const buttons = document.querySelectorAll(`${CONFIG.selectors.detailLevelBtn}, ${CONFIG.selectors.detailBtnMini}`);

    LOG.debug(MODULE, `Found ${buttons.length} detail level buttons`);

    if (buttons.length === 0) {
        LOG.warn(MODULE, 'No detail level buttons found in DOM!');
        return;
    }

    buttons.forEach(btn => {
        const level = btn.dataset.level;

        LOG.debug(MODULE, `Button: "${btn.textContent.trim()}" with data-level="${level}"`);

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (level) {
                setDetailLevel(level);
            } else {
                LOG.error(MODULE, 'Button has no data-level attribute', btn);
            }
        });
    });

    // Wende initialen Level aus Preferences an
    const initialLevel = window.StateManager.get('preferences.detailLevel');
    LOG(MODULE, `Applying initial detail level: ${initialLevel}`);

    updateDetailVisibility(initialLevel);
    updateInfoText(initialLevel);
    updateActiveButton(initialLevel);

    LOG.info(MODULE, 'Detail level controls initialized');
}

// ========================================================================
// EVENT LISTENERS
// ========================================================================

/**
 * Initializes system-wide event listeners for preferences synchronization
 * @private
 * @returns {void}
 */
function initDetailLevelListeners() {
    LOG(MODULE, 'Initializing event listeners...');

    // Reagiere auf Preferences-Loaded Event
    window.addEventListener('preferencesLoaded', () => {
        LOG(MODULE, 'Preferences loaded event received');
        const level = window.StateManager.get('preferences.detailLevel');
        LOG(MODULE, `Applying loaded detail level: ${level}`);

        updateDetailVisibility(level);
        updateInfoText(level);
        updateActiveButton(level);
    });

    window.addEventListener('preferencesReset', () => {
        LOG(MODULE, 'Preferences reset event received');
        const level = window.StateManager.get('preferences.detailLevel');

        updateDetailVisibility(level);
        updateInfoText(level);
        updateActiveButton(level);
    });

    LOG.info(MODULE, 'Event listeners initialized');
}

// ========================================================================
// INITIALISIERUNG
// ========================================================================

/**
 * Initializes the detail level management system
 * @public
 * @returns {void}
 */
function initDetailLevel() {
    if (_isInitialized) {
        LOG.warn(MODULE, 'Already initialized');
        return;
    }
    LOG(MODULE, 'Initializing detail level module...');

    initDetailLevelControls();
    initDetailLevelListeners();

    _isInitialized = true;
    LOG.info(MODULE, 'Detail level module initialized');
}

// ========================================================================
// PUBLIC API
// ========================================================================

/**
 * Public API for the Detail Level Management System
 * @namespace DetailLevel
 */
window.DetailLevel = {
    /**
     * Initializes the detail level system
     * @function init
     */
    init: initDetailLevel,

    /**
     * Sets the active detail level
     * @function setLevel
     * @param {string|number} level - The detail level to set
     */
    setLevel: setDetailLevel
};

LOG(MODULE, 'Detail level module loaded');

})();
