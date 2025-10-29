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
 * - Keyboard shortcuts: Alt+1, Alt+2, Alt+3
 * - Comprehensive cleanup and destruction
 * - Enhanced public API with utility methods
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
     * Keyboard shortcuts configuration
     * @constant {Object}
     */
    const KEYBOARD_SHORTCUTS = {
        '1': { key: '1', altKey: true, level: '1' },
        '2': { key: '2', altKey: true, level: '2' },
        '3': { key: '3', altKey: true, level: '3' }
    };

    /**
     * Global configuration object for detail level system
     * @namespace CONFIG
     */
    const CONFIG = {
        /**
         * Default detail level when no preference is set
         * @constant {string}
         */
        defaultLevel: 'basic',
        
        /**
         * Storage key for user preference
         * @constant {string}
         */
        storageKey: 'userDetailLevelPreference',
        
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
        detailLevelInfo: '#detail-level-info',
        // Event delegation containers
        detailControlContainer: '.detail-control-mini',
        body: 'body'
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

    /**
     * Reference to the event delegation container for cleanup
     * @private
     * @type {HTMLElement|null}
     */
    let _delegationContainer = null;

    /**
     * Current active detail level
     * @private
     * @type {string}
     */
    let _currentLevel = CONFIG.defaultLevel;

    // ========================================================================
    // DETAIL LEVEL MANAGEMENT
    // ========================================================================

    /**
     * Gets the current active detail level
     * @private
     * @returns {string} currentLevel - The currently active detail level
     */
    function _getCurrentLevel() {
        return _currentLevel;
    }

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
     * Gets the default detail level
     * @private
     * @returns {string} defaultLevel - The system default detail level
     */
    function _getDefaultLevel() {
        return CONFIG.defaultLevel;
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

            // Check if level is already active
            if (_currentLevel === level) {
                LOG.debug(MODULE, `Level ${level} already active - no change needed`);
                return true;
            }

            const previousLevel = _currentLevel;
            _currentLevel = level;

            LOG.debug(MODULE, `Setting detail level from ${previousLevel} to: ${level} (normalized: ${normalizedLevel})`);

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

            // Dispatch custom event for other modules
            window.dispatchEvent(new CustomEvent('detailLevelChanged', {
                detail: { 
                    previousLevel: previousLevel,
                    newLevel: level,
                    normalizedLevel: normalizedLevel
                }
            }));

            LOG.info(MODULE, `Detail level successfully changed from ${previousLevel} to: ${level}`);
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
    // RESET FUNCTIONALITY
    // ========================================================================

    /**
     * Resets the detail level system to default state without destroying it
     * @private
     * @returns {boolean} success - Returns true if reset was successful
     */
    function _resetToDefault() {
        try {
            LOG.debug(MODULE, 'Resetting detail level system to default...');

            const previousLevel = _currentLevel;
            _currentLevel = CONFIG.defaultLevel;

            // Update UI to default state
            _updateDetailVisibility(CONFIG.defaultLevel);
            _updateInfoText(CONFIG.defaultLevel);
            _updateActiveButton(CONFIG.defaultLevel);

            // Clear stored preference if StateManager is available
            if (window.StateManager) {
                try {
                    window.StateManager.remove('preferences.detailLevel');
                    LOG.debug(MODULE, 'Stored preference cleared from StateManager');
                } catch (stateError) {
                    LOG.warn(MODULE, 'Failed to clear preference from StateManager:', stateError);
                }
            }

            // Dispatch reset event
            window.dispatchEvent(new CustomEvent('detailLevelReset', {
                detail: { 
                    previousLevel: previousLevel,
                    newLevel: CONFIG.defaultLevel
                }
            }));

            LOG.info(MODULE, `Detail level system reset from ${previousLevel} to default: ${CONFIG.defaultLevel}`);
            return true;

        } catch (error) {
            LOG.error(MODULE, 'Error resetting detail level system:', error);
            return false;
        }
    }

    // ========================================================================
    // EVENT DELEGATION
    // ========================================================================

    /**
     * Handles click events for detail level buttons using event delegation
     * @private
     * @param {Event} event - The click event
     * @returns {void}
     */
    function _handleDetailLevelClick(event) {
        try {
            // Find the closest detail level button
            const button = event.target.closest(`${CONFIG.selectors.detailLevelBtn}, ${CONFIG.selectors.detailBtnMini}`);
            
            if (!button) {
                return; // Not a detail level button
            }

            event.preventDefault();

            const level = button.dataset.level;
            
            if (level) {
                LOG.debug(MODULE, `Button clicked: data-level="${level}"`);
                setDetailLevel(level);
            } else {
                LOG.error(MODULE, 'Button has no data-level attribute', button);
            }
        } catch (error) {
            LOG.error(MODULE, 'Error handling detail level click:', error);
        }
    }

    /**
     * Handles keyboard events for detail level buttons (accessibility)
     * @private
     * @param {Event} event - The keydown event
     * @returns {void}
     */
    function _handleDetailLevelKeydown(event) {
        try {
            // Only handle Enter and Space keys
            if (event.key !== 'Enter' && event.key !== ' ') {
                return;
            }

            // Find the closest detail level button
            const button = event.target.closest(`${CONFIG.selectors.detailLevelBtn}, ${CONFIG.selectors.detailBtnMini}`);
            
            if (!button) {
                return; // Not a detail level button
            }

            event.preventDefault();

            const level = button.dataset.level;
            
            if (level) {
                LOG.debug(MODULE, `Button activated via keyboard (${event.key}): data-level="${level}"`);
                setDetailLevel(level);
            }
        } catch (error) {
            LOG.error(MODULE, 'Error handling detail level keydown:', error);
        }
    }

    // ========================================================================
    // KEYBOARD SHORTCUTS
    // ========================================================================

    /**
     * Handles global keyboard shortcuts for detail levels
     * @private
     * @param {Event} event - The keydown event
     * @returns {void}
     */
    function _handleKeyboardShortcuts(event) {
        try {
            // Check for Alt+1, Alt+2, Alt+3 shortcuts
            const shortcutKeys = Object.keys(KEYBOARD_SHORTCUTS);
            
            for (const key of shortcutKeys) {
                const shortcut = KEYBOARD_SHORTCUTS[key];
                
                if (event.key === shortcut.key && event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    LOG.debug(MODULE, `Keyboard shortcut detected: Alt+${key} for level ${shortcut.level}`);
                    setDetailLevel(shortcut.level);
                    return;
                }
            }
        } catch (error) {
            LOG.error(MODULE, 'Error handling keyboard shortcut:', error);
        }
    }

    // ========================================================================
    // UI - CONTROLS
    // ========================================================================

    /**
     * Initializes event delegation for detail level control buttons
     * @private
     * @returns {boolean} success - Returns true if initialization was successful
     */
    function _initDetailLevelControls() {
        try {
            LOG(MODULE, 'Initializing detail level controls with event delegation...');

            // Find the main control container for event delegation
            const controlContainer = document.querySelector(CONFIG.selectors.detailControlContainer);
            
            if (!controlContainer) {
                LOG.warn(MODULE, 'Detail control container not found, using document body for event delegation');
                _delegationContainer = document;
            } else {
                _delegationContainer = controlContainer;
            }

            // Set up click event delegation
            _delegationContainer.addEventListener('click', _handleDetailLevelClick);
            
            // Set up keyboard event delegation for accessibility
            _delegationContainer.addEventListener('keydown', _handleDetailLevelKeydown);

            // Set up global keyboard shortcuts
            document.addEventListener('keydown', _handleKeyboardShortcuts);

            LOG.debug(MODULE, 'Event delegation and keyboard shortcuts initialized');

            // Apply initial level from preferences (only if StateManager available)
            let initialLevel = CONFIG.defaultLevel;
            if (window.StateManager) {
                try {
                    const storedLevel = window.StateManager.get('preferences.detailLevel');
                    if (storedLevel && _isValidLevel(storedLevel)) {
                        initialLevel = storedLevel;
                        LOG(MODULE, `Applying initial detail level from StateManager: ${initialLevel}`);
                    } else {
                        LOG(MODULE, `No valid stored preference found, using default: ${initialLevel}`);
                    }
                } catch (stateError) {
                    LOG.warn(MODULE, 'Error getting initial level from StateManager, using default:', stateError);
                }
            } else {
                LOG(MODULE, `Applying default detail level: ${initialLevel} (StateManager not available)`);
            }

            _currentLevel = initialLevel;
            _updateDetailVisibility(initialLevel);
            _updateInfoText(initialLevel);
            _updateActiveButton(initialLevel);

            LOG.info(MODULE, 'Detail level controls initialized successfully with event delegation and keyboard shortcuts');
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
                        if (level && _isValidLevel(level)) {
                            LOG(MODULE, `Applying loaded detail level: ${level}`);
                            setDetailLevel(level);
                        } else {
                            LOG(MODULE, `No valid detail level in preferences, keeping current: ${_currentLevel}`);
                        }
                    } catch (eventError) {
                        LOG.error(MODULE, 'Error handling preferencesLoaded event:', eventError);
                    }
                });

                window.addEventListener('preferencesReset', () => {
                    try {
                        LOG(MODULE, 'Preferences reset event received');
                        _resetToDefault();
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
    // CLEANUP AND DESTRUCTION
    // ========================================================================

    /**
     * Removes all event listeners and cleans up resources
     * @private
     * @returns {void}
     */
    function _cleanupEventListeners() {
        try {
            LOG.debug(MODULE, 'Cleaning up event listeners...');

            // Remove event delegation listeners
            if (_delegationContainer) {
                _delegationContainer.removeEventListener('click', _handleDetailLevelClick);
                _delegationContainer.removeEventListener('keydown', _handleDetailLevelKeydown);
                LOG.debug(MODULE, 'Event delegation listeners removed');
            }

            // Remove global keyboard shortcuts
            document.removeEventListener('keydown', _handleKeyboardShortcuts);
            LOG.debug(MODULE, 'Keyboard shortcut listeners removed');

            // Remove StateManager event listeners
            if (window.StateManager) {
                window.removeEventListener('preferencesLoaded', _initDetailLevelListeners);
                window.removeEventListener('preferencesReset', _initDetailLevelListeners);
                LOG.debug(MODULE, 'StateManager event listeners removed');
            }

            LOG.info(MODULE, 'All event listeners cleaned up successfully');
        } catch (error) {
            LOG.error(MODULE, 'Error during event listener cleanup:', error);
        }
    }

    /**
     * Resets all detail levels to default visibility
     * @private
     * @returns {void}
     */
    function _resetDetailLevels() {
        try {
            LOG.debug(MODULE, 'Resetting detail levels to default...');

            // Show all level 1 elements
            const level1Elements = document.querySelectorAll(CONFIG.selectors.detailLevel1);
            level1Elements.forEach(el => {
                try {
                    el.classList.remove(CONFIG.classes.hidden);
                } catch (elError) {
                    LOG.warn(MODULE, 'Error resetting level 1 element:', elError);
                }
            });

            // Hide all level 2 and 3 elements
            const level2Elements = document.querySelectorAll(CONFIG.selectors.detailLevel2);
            const level3Elements = document.querySelectorAll(CONFIG.selectors.detailLevel3);
            
            level2Elements.forEach(el => {
                try {
                    el.classList.add(CONFIG.classes.hidden);
                } catch (elError) {
                    LOG.warn(MODULE, 'Error resetting level 2 element:', elError);
                }
            });
            
            level3Elements.forEach(el => {
                try {
                    el.classList.add(CONFIG.classes.hidden);
                } catch (elError) {
                    LOG.warn(MODULE, 'Error resetting level 3 element:', elError);
                }
            });

            // Reset content section focus states
            const contentSections = document.querySelectorAll(CONFIG.selectors.contentSection);
            contentSections.forEach(section => {
                try {
                    section.classList.remove(CONFIG.classes.outOfFocus);
                } catch (sectionError) {
                    LOG.warn(MODULE, 'Error resetting content section:', sectionError);
                }
            });

            // Reset button active states
            const allButtons = document.querySelectorAll(`${CONFIG.selectors.detailLevelBtn}, ${CONFIG.selectors.detailBtnMini}`);
            allButtons.forEach(btn => {
                try {
                    btn.classList.remove(CONFIG.classes.active);
                } catch (btnError) {
                    LOG.warn(MODULE, 'Error resetting button state:', btnError);
                }
            });

            LOG.info(MODULE, 'Detail levels reset to default successfully');
        } catch (error) {
            LOG.error(MODULE, 'Error resetting detail levels:', error);
        }
    }

    /**
     * Completely destroys the detail level system and cleans up all resources
     * @public
     * @returns {boolean} success - Returns true if destruction was successful
     */
    function destroy() {
        try {
            if (!_isInitialized) {
                LOG.warn(MODULE, 'Not initialized - nothing to destroy');
                return false;
            }

            LOG(MODULE, 'Destroying detail level system...');

            // Clean up event listeners
            _cleanupEventListeners();

            // Reset UI to default state
            _resetDetailLevels();

            // Reset internal state
            _isInitialized = false;
            _delegationContainer = null;
            _currentLevel = CONFIG.defaultLevel;

            // Remove public API
            delete window.DetailLevel;

            LOG.info(MODULE, 'Detail level system destroyed completely');
            return true;

        } catch (error) {
            LOG.error(MODULE, 'Error during detail level system destruction:', error);
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
        setLevel: setDetailLevel,

        /**
         * Gets the current active detail level
         * @function getCurrentLevel
         * @returns {string} currentLevel - The currently active detail level
         */
        getCurrentLevel: _getCurrentLevel,

        /**
         * Gets the default detail level
         * @function getDefaultLevel
         * @returns {string} defaultLevel - The system default detail level
         */
        getDefaultLevel: _getDefaultLevel,

        /**
         * Checks if a level is valid and supported
         * @function isValidLevel
         * @param {string|number} level - The level to validate
         * @returns {boolean} isValid - Returns true if level is valid
         */
        isValidLevel: _isValidLevel,

        /**
         * Resets the detail level system to default state
         * @function reset
         * @returns {boolean} success - Returns true if reset was successful
         */
        reset: _resetToDefault,

        /**
         * Completely destroys the detail level system and cleans up all resources
         * @function destroy
         * @returns {boolean} success - Returns true if destruction was successful
         */
        destroy: destroy,

        /**
         * Level constants for programmatic use
         * @constant {Object}
         */
        LEVELS: {
            BASIC: 'basic',
            BEST_PRACTICE: 'bestpractice', 
            EXPERT: 'expert',
            LEVEL_1: '1',
            LEVEL_2: '2',
            LEVEL_3: '3'
        },

        /**
         * Check if the system is initialized
         * @function isInitialized
         * @returns {boolean} isInitialized - Returns true if system is initialized
         */
        isInitialized: () => _isInitialized
    };

    LOG(MODULE, 'Detail level module loaded');

})();
