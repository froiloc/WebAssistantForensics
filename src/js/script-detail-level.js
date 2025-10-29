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

    // ========================================================================
    // DEPENDENCY CHECKING
    // ========================================================================

    /**
     * Checks if all required dependencies are available
     * @private
     * @returns {boolean} dependenciesAvailable - Returns true if all dependencies are present
     */
    function _checkDependencies() {
        try {
            // Check for LOG system (required for logging)
            if (typeof window.LOG === 'undefined') {
                console.error(`${MODULE}: LOG object not available. Detail level system disabled.`);
                return false;
            }

            // Check for StateManager (required for preferences)
            if (typeof window.StateManager === 'undefined') {
                LOG.warn(MODULE, 'StateManager not available. Preferences will not be persisted.');
                // Continue without StateManager - system can still function
            }

            LOG.debug(MODULE, 'All dependencies checked successfully');
            return true;
        } catch (error) {
            console.error(`${MODULE}: Error during dependency check:`, error);
            return false;
        }
    }

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
            active: 'active',
            // Single state class for hidden elements
            hidden: 'detail-level--hidden',
            contentSection: 'content-section',
            outOfFocus: 'content-section--out-of-focus'
        }
    }

    /**
     * Generate CSS selectors from class configuration
     * Converts class names to CSS selectors for DOM queries
     */
    CONFIG.selectors = Object.keys(CONFIG.classes).reduce((acc, key) => {
        try {
            // Prepend '.' to the class value to create a class selector
            if (typeof CONFIG.classes[key] === 'string')
            {
                acc[key] = `.${CONFIG.classes[key]}`;
            } else if (typeof CONFIG.classes[key] === 'function')
            {
                acc[key] = (a) => `.${CONFIG.classes[key](a)}`;
            }
            return acc;
        } catch (error) {
            LOG.error(MODULE, `Error generating selector for key "${key}":`, error);
            return acc;
        }
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
     * Validates if a level is supported by the system
     * @private
     * @param {string|number} level - The level to validate
     * @returns {boolean} isValid - Returns true if level is valid
     */
    function _isValidLevel(level) {
        if (level == null || level === '') {
            LOG.warn(MODULE, 'Level validation failed: level is null or empty');
            return false;
        }
        
        const normalizedLevel = LEVEL_MAP[level];
        const isValid = !!normalizedLevel;
        
        if (!isValid) {
            LOG.warn(MODULE, `Level validation failed: "${level}" is not a supported level`);
        }
        
        return isValid;
    }

    /**
     * Sets the active detail level and updates all UI components
     * @param {string|number} level - The detail level to set (1/2/3 or basic/bestpractice/expert)
     * @returns {boolean} success - Returns true if level was set successfully
     */
    function setDetailLevel(level) {
        try {
            // Validate input
            if (!_isValidLevel(level)) {
                LOG.error(MODULE, `Invalid level: ${level} (expected: 1/2/3 or basic/bestpractice/expert)`);
                return false;
            }

            // Convert numeric value to level name
            const normalizedLevel = LEVEL_MAP[level];

            LOG.debug(MODULE, `Setting detail level to: ${level} (normalized: ${normalizedLevel})`);

            // Update all UI components
            _updateDetailVisibility(normalizedLevel);
            _updateInfoText(normalizedLevel);
            _updateActiveButton(normalizedLevel);

            // Only save to StateManager if available
            if (window.StateManager) {
                try {
                    window.StateManager.set('preferences.detailLevel', level);
                    LOG.debug(MODULE, `Preference saved to StateManager: ${level}`);
                } catch (stateError) {
                    LOG.warn(MODULE, 'Failed to save preference to StateManager:', stateError);
                }
            } else {
                LOG.debug(MODULE, 'StateManager not available - skipping preference save');
            }

            LOG.info(MODULE, `Detail level successfully set to: ${level}`);
            return true;

        } catch (error) {
            LOG.error(MODULE, `Error setting detail level to "${level}":`, error);
            return false;
        }
    }

    /**
     * Updates the visibility of detail level elements based on current level
     * @private
     * @param {string} level - The normalized detail level (1/2/3)
     * @returns {boolean} success - Returns true if update was successful
     */
    function _updateDetailVisibility(level) {
        try {
            const currentLevel = LEVEL_MAP[level];

            // Update Level 1 elements - always visible (remove hidden class)
            const level1Elements = document.querySelectorAll(CONFIG.selectors.detailLevel1);
            level1Elements.forEach(el => {
                try {
                    el.classList.remove(CONFIG.classes.hidden);
                } catch (elError) {
                    LOG.warn(MODULE, 'Error updating level 1 element:', elError);
                }
            });

            // Update Level 2 elements - visible if currentLevel >= 2
            const level2Elements = document.querySelectorAll(CONFIG.selectors.detailLevel2);
            level2Elements.forEach(el => {
                try {
                    if (currentLevel >= 2) {
                        el.classList.remove(CONFIG.classes.hidden);
                    } else {
                        el.classList.add(CONFIG.classes.hidden);
                    }
                } catch (elError) {
                    LOG.warn(MODULE, 'Error updating level 2 element:', elError);
                }
            });

            // Update Level 3 elements - visible if currentLevel >= 3
            const level3Elements = document.querySelectorAll(CONFIG.selectors.detailLevel3);
            level3Elements.forEach(el => {
                try {
                    if (currentLevel >= 3) {
                        el.classList.remove(CONFIG.classes.hidden);
                    } else {
                        el.classList.add(CONFIG.classes.hidden);
                    }
                } catch (elError) {
                    LOG.warn(MODULE, 'Error updating level 3 element:', elError);
                }
            });

            // Update content section focus states
            const contentSections = document.querySelectorAll(CONFIG.selectors.contentSection);
            contentSections.forEach(section => {
                try {
                    // Check if section has any visible content for current level
                    const hasVisibleContent = 
                        section.querySelector(CONFIG.selectors.detailLevel1) ||
                        (currentLevel >= 2 && section.querySelector(`${CONFIG.selectors.detailLevel2}:not(.${CONFIG.classes.hidden})`)) ||
                        (currentLevel >= 3 && section.querySelector(`${CONFIG.selectors.detailLevel3}:not(.${CONFIG.classes.hidden})`));

                    if (hasVisibleContent) {
                        section.classList.remove(CONFIG.classes.outOfFocus);
                    } else {
                        section.classList.add(CONFIG.classes.outOfFocus);
                    }
                } catch (sectionError) {
                    LOG.warn(MODULE, 'Error updating content section:', sectionError);
                }
            });

            LOG.debug(MODULE, `Visibility updated for level ${currentLevel} using CSS classes`);
            return true;

        } catch (error) {
            LOG.error(MODULE, `Error updating detail visibility for level "${level}":`, error);
            return false;
        }
    }

    /**
     * Updates the information text display based on current detail level
     * @private
     * @param {string} level - The detail level name
     * @returns {boolean} success - Returns true if update was successful
     */
    function _updateInfoText(level) {
        try {
            const infoElement = document.getElementById(CONFIG.selectors.detailLevelInfo);
            if (!infoElement) {
                LOG.debug(MODULE, `Info element (${CONFIG.selectors.detailLevelInfo}) not found`);
                return false;
            }

            const infoTexts = {
                basic: CONFIG.i18n.de.level1,
                best_practice: CONFIG.i18n.de.level2,
                expert: CONFIG.i18n.de.level3
            };

            const newText = infoTexts[level] || '';
            infoElement.textContent = newText;
            
            LOG.debug(MODULE, `Info text updated: ${newText}`);
            return true;

        } catch (error) {
            LOG.error(MODULE, `Error updating info text for level "${level}":`, error);
            return false;
        }
    }

    /**
     * Updates the active state of detail level control buttons
     * @private
     * @param {string} level - The detail level name
     * @returns {boolean} success - Returns true if update was successful
     */
    function _updateActiveButton(level) {
        try {
            // Remove .active from all buttons
            const allButtons = document.querySelectorAll(`${CONFIG.i18n.de.detailLevelBtn}, ${CONFIG.i18n.de.detailBtnMini}`);
            allButtons.forEach(btn => {
                try {
                    btn.classList.remove(CONFIG.classes.active);
                } catch (btnError) {
                    LOG.warn(MODULE, 'Error removing active class from button:', btnError);
                }
            });

            // Convert level to number for button selector
            const levelNumber = LEVEL_TO_NUMBER[level];

            LOG.debug(MODULE, `Looking for buttons with data-level="${levelNumber}" or "${level}"`);

            // Activate buttons with matching data-level (numeric or word)
            const selectors = [
                `${CONFIG.selectors.detailLevelBtn}[data-level="${levelNumber}"]`,
                `${CONFIG.selectors.detailLevelBtn}[data-level="${level}"]`,
                `${CONFIG.selectors.detailBtnMini}[data-level="${levelNumber}"]`,
                `${CONFIG.selectors.detailBtnMini}[data-level="${level}"]`
            ];

            const activeButtons = document.querySelectorAll(selectors.join(', '));

            activeButtons.forEach(btn => {
                try {
                    btn.classList.add(CONFIG.classes.active);
                    LOG.debug(MODULE, `Activated button: data-level="${btn.dataset.level}"`);
                } catch (btnError) {
                    LOG.warn(MODULE, 'Error adding active class to button:', btnError);
                }
            });

            if (activeButtons.length > 0) {
                LOG.info(MODULE, `Active button(s) updated: ${level} (${activeButtons.length} buttons)`);
                return true;
            } else {
                LOG.warn(MODULE, `No buttons found for level: ${level}/${levelNumber}`);

                // Debug: List all available buttons
                const availableButtons = document.querySelectorAll(`${CONFIG.selectors.detailLevelBtn}, ${CONFIG.selectors.detailBtnMini}`);
                LOG.debug(MODULE, 'Available buttons:', Array.from(availableButtons).map(btn => ({
                    text: btn.textContent.trim(),
                    level: btn.dataset.level
                })));
                return false;
            }

        } catch (error) {
            LOG.error(MODULE, `Error updating active buttons for level "${level}":`, error);
            return false;
        }
    }

    // ========================================================================
    // UI - CONTROLS
    // ========================================================================

    /**
     * Initializes event listeners for detail level control buttons
     * @private
     * @returns {boolean} success - Returns true if initialization was successful
     */
    function _initDetailLevelControls() {
        try {
            LOG(MODULE, 'Initializing detail level controls...');

            const buttons = document.querySelectorAll(`${CONFIG.selectors.detailLevelBtn}, ${CONFIG.selectors.detailBtnMini}`);

            LOG.debug(MODULE, `Found ${buttons.length} detail level buttons`);

            if (buttons.length === 0) {
                LOG.warn(MODULE, 'No detail level buttons found in DOM!');
                return false;
            }

            buttons.forEach(btn => {
                try {
                    const level = btn.dataset.level;

                    LOG.debug(MODULE, `Button: "${btn.textContent.trim()}" with data-level="${level}"`);

                    btn.addEventListener('click', (e) => {
                        try {
                            e.preventDefault();
                            if (level) {
                                setDetailLevel(level);
                            } else {
                                LOG.error(MODULE, 'Button has no data-level attribute', btn);
                            }
                        } catch (clickError) {
                            LOG.error(MODULE, 'Error handling button click:', clickError);
                        }
                    });
                } catch (btnError) {
                    LOG.warn(MODULE, 'Error initializing button:', btnError);
                }
            });

            // Apply initial level from preferences (only if StateManager available)
            let initialLevel = 'basic'; // Default fallback
            if (window.StateManager) {
                try {
                    initialLevel = window.StateManager.get('preferences.detailLevel');
                    LOG(MODULE, `Applying initial detail level from StateManager: ${initialLevel}`);
                } catch (stateError) {
                    LOG.warn(MODULE, 'Error getting initial level from StateManager, using default:', stateError);
                }
            } else {
                LOG(MODULE, `Applying default detail level: ${initialLevel} (StateManager not available)`);
            }

            _updateDetailVisibility(initialLevel);
            _updateInfoText(initialLevel);
            _updateActiveButton(initialLevel);

            LOG.info(MODULE, 'Detail level controls initialized successfully');
            return true;

        } catch (error) {
            LOG.error(MODULE, 'Error initializing detail level controls:', error);
            return false;
        }
    }

    // ========================================================================
    // EVENT LISTENERS
    // ========================================================================

    /**
     * Initializes system-wide event listeners for preferences synchronization
     * @private
     * @returns {boolean} success - Returns true if initialization was successful
     */
    function _initDetailLevelListeners() {
        try {
            LOG(MODULE, 'Initializing event listeners...');

            // Only set up StateManager events if StateManager is available
            if (window.StateManager) {
                // React to Preferences-Loaded Event
                window.addEventListener('preferencesLoaded', () => {
                    try {
                        LOG(MODULE, 'Preferences loaded event received');
                        const level = window.StateManager.get('preferences.detailLevel');
                        LOG(MODULE, `Applying loaded detail level: ${level}`);

                        _updateDetailVisibility(level);
                        _updateInfoText(level);
                        _updateActiveButton(level);
                    } catch (eventError) {
                        LOG.error(MODULE, 'Error handling preferencesLoaded event:', eventError);
                    }
                });

                window.addEventListener('preferencesReset', () => {
                    try {
                        LOG(MODULE, 'Preferences reset event received');
                        const level = window.StateManager.get('preferences.detailLevel');

                        _updateDetailVisibility(level);
                        _updateInfoText(level);
                        _updateActiveButton(level);
                    } catch (eventError) {
                        LOG.error(MODULE, 'Error handling preferencesReset event:', eventError);
                    }
                });
            } else {
                LOG.debug(MODULE, 'StateManager not available - skipping preference event listeners');
            }

            LOG.info(MODULE, 'Event listeners initialized successfully');
            return true;

        } catch (error) {
            LOG.error(MODULE, 'Error initializing event listeners:', error);
            return false;
        }
    }

    // ========================================================================
    // INITIALIZATION
    // ========================================================================

    /**
     * Initializes the detail level management system
     * @public
     * @returns {boolean} success - Returns true if initialization was successful
     */
    function init() {
        try {
            if (_isInitialized) {
                LOG.warn(MODULE, 'Already initialized');
                return false;
            }

            LOG(MODULE, 'Initializing detail level module...');

            // Check dependencies before proceeding
            if (!_checkDependencies()) {
                LOG.error(MODULE, 'Dependency check failed - initialization aborted');
                return false;
            }

            const controlsSuccess = _initDetailLevelControls();
            const listenersSuccess = _initDetailLevelListeners();

            if (controlsSuccess && listenersSuccess) {
                _isInitialized = true;
                LOG.info(MODULE, 'Detail level module initialized successfully');
                return true;
            } else {
                LOG.error(MODULE, 'Detail level module initialization failed - some components did not initialize properly');
                return false;
            }

        } catch (error) {
            LOG.error(MODULE, 'Error during detail level module initialization:', error);
            return false;
        }
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
         * @returns {boolean} success - Returns true if initialization was successful
         */
        init: init,
        
        /**
         * Sets the active detail level
         * @function setLevel
         * @param {string|number} level - The detail level to set
         * @returns {boolean} success - Returns true if level was set successfully
         */
        setLevel: setDetailLevel
    };

    LOG(MODULE, 'Detail level module loaded');

})();
