// ============================================================================
// SCRIPT-DETAIL-LEVEL.JS - Version 1.2.0
// Detail-Level-System: Basic, Best Practice, Expert
// 
// Features:
// - Three detail levels with Matryoshka pattern (Level 1 ⊆ Level 2 ⊆ Level 3)
// - Persistent preferences via StateManager with graceful fallbacks
// - Event delegation for optimal performance
// - Keyboard shortcuts (Alt+1/2/3) and full accessibility support
// - Comprehensive error handling and cleanup
// - Enhanced public API with utility methods
// - Custom events for system integration
//
// Structure Rules:
// - Level 1: Basic information only
// - Level 2: Best practices and recommended approaches  
// - Level 3: All technical details and background
// - Same levels can only be siblings, lower levels cannot be children of higher levels
//
// @version 1.2.0
// @license MIT
// ============================================================================

(function() {
    'use strict';

    /**
     * Module identifier for logging and error reporting
     * @constant {string}
     */
    const MODULE = 'DETAIL';

    // ========================================================================
    // CONFIGURATION CONSTANTS
    // ========================================================================

    /**
     * Level mapping for consistent level normalization
     * @constant {Object}
     */
    const LEVEL_MAP = {
        '1': '1', '2': '2', '3': '3',
        'basic': '1', 'bestpractice': '2', 'expert': '3'
    };

    /**
     * Reverse mapping for button activation
     * @constant {Object} 
     */
    const LEVEL_TO_NUMBER = {
        'basic': '1', 'bestpractice': '2', 'expert': '3'
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
     * Global configuration object following toast system pattern
     * @namespace CONFIG
     */
    const CONFIG = {
        // System defaults
        defaultLevel: 'basic',
        storageKey: 'userDetailLevelPreference',
        
        // CSS classes for consistent theming
        classes: {
            detailLevel1: 'detail-level-1',
            detailLevel2: 'detail-level-2', 
            detailLevel3: 'detail-level-3',
            detailLevelBtn: 'detail-level-btn',
            detailBtnMini: 'detail-btn-mini',
            active: 'active',
            hidden: 'detail-level--hidden',
            contentSection: 'content-section',
            outOfFocus: 'content-section--out-of-focus'
        },

        // Internationalization
        i18n: {
            de: {
                level1: 'Zeigt nur grundlegende Informationen',
                level2: 'Zeigt Best Practices und empfohlene Ansätze', 
                level3: 'Zeigt alle technischen Details und Hintergründe'
            }
        }
    };

    /**
     * Generate CSS selectors from class configuration
     * Consistent with toast system pattern
     */
    CONFIG.selectors = Object.keys(CONFIG.classes).reduce((acc, key) => {
        try {
            if (typeof CONFIG.classes[key] === 'string') {
                acc[key] = `.${CONFIG.classes[key]}`;
            } else if (typeof CONFIG.classes[key] === 'function') {
                acc[key] = (a) => `.${CONFIG.classes[key](a)}`;
            }
            return acc;
        } catch (error) {
            LOG.error(MODULE, `Selector generation failed for "${key}":`, error);
            return acc;
        }
    }, {});

    // Extend with additional selectors
    Object.assign(CONFIG.selectors, {
        detailLevelInfo: '#detail-level-info',
        detailControlContainer: '.detail-control-mini'
    });

    // ========================================================================
    // PRIVATE STATE VARIABLES
    // ========================================================================

    /** @private @type {boolean} */
    let _isInitialized = false;

    /** @private @type {HTMLElement|null} */
    let _delegationContainer = null;

    /** @private @type {string} */
    let _currentLevel = CONFIG.defaultLevel;

    // ========================================================================
    // DEPENDENCY CHECKING
    // ========================================================================

    /**
     * Validates system dependencies
     * @private
     * @returns {boolean}
     */
    function _checkDependencies() {
        try {
            if (typeof window.LOG === 'undefined') {
                console.error(`${MODULE}: LOG system required but not available`);
                return false;
            }

            if (typeof window.StateManager === 'undefined') {
                LOG.warn(MODULE, 'StateManager unavailable - preferences disabled');
            }

            LOG.debug(MODULE, 'Dependency check passed');
            return true;
        } catch (error) {
            console.error(`${MODULE}: Dependency check failed:`, error);
            return false;
        }
    }

    // ========================================================================
    // CORE LEVEL MANAGEMENT
    // ========================================================================

    /**
     * Gets current active level
     * @private
     * @returns {string}
     */
    function _getCurrentLevel() {
        return _currentLevel;
    }

    /**
     * Validates level support
     * @private
     * @param {string|number} level
     * @returns {boolean}
     */
    function _isValidLevel(level) {
        const isValid = level != null && level !== '' && LEVEL_MAP[level] !== undefined;
        
        if (!isValid) {
            LOG.warn(MODULE, `Invalid level: "${level}"`);
        }
        
        return isValid;
    }

    /**
     * Gets system default level
     * @private
     * @returns {string}
     */
    function _getDefaultLevel() {
        return CONFIG.defaultLevel;
    }

    /**
     * Core level setting with full UI synchronization
     * @param {string|number} level
     * @returns {boolean}
     */
    function setDetailLevel(level) {
        try {
            if (!_isValidLevel(level)) {
                LOG.error(MODULE, `Unsupported level: ${level}`);
                return false;
            }

            const normalizedLevel = LEVEL_MAP[level];

            // Skip if no change needed
            if (_currentLevel === level) {
                LOG.debug(MODULE, `Level ${level} already active`);
                return true;
            }

            const previousLevel = _currentLevel;
            _currentLevel = level;

            LOG.debug(MODULE, `Level change: ${previousLevel} → ${level}`);

            // Batch UI updates
            _updateDetailVisibility(normalizedLevel);
            _updateInfoText(normalizedLevel);
            _updateActiveButton(normalizedLevel);

            // Persist preference if available
            if (window.StateManager) {
                try {
                    window.StateManager.set('preferences.detailLevel', level);
                } catch (error) {
                    LOG.warn(MODULE, 'Preference save failed:', error);
                }
            }

            // Notify other components
            window.dispatchEvent(new CustomEvent('detailLevelChanged', {
                detail: { previousLevel, newLevel: level, normalizedLevel }
            }));

            LOG.info(MODULE, `Level set to: ${level}`);
            return true;

        } catch (error) {
            LOG.error(MODULE, `Level setting failed for "${level}":`, error);
            return false;
        }
    }

    // ========================================================================
    // UI UPDATE METHODS
    // ========================================================================

    /**
     * Updates element visibility based on current level
     * @private
     * @param {string} level
     * @returns {boolean}
     */
    function _updateDetailVisibility(level) {
        try {
            const currentLevel = LEVEL_MAP[level];

            // Batch DOM operations for performance
            const operations = [
                { elements: CONFIG.selectors.detailLevel1, condition: () => true },
                { elements: CONFIG.selectors.detailLevel2, condition: (lvl) => lvl >= 2 },
                { elements: CONFIG.selectors.detailLevel3, condition: (lvl) => lvl >= 3 }
            ];

            operations.forEach(({ elements, condition }) => {
                const elementList = document.querySelectorAll(elements);
                const shouldShow = condition(currentLevel);
                
                elementList.forEach(el => {
                    try {
                        if (shouldShow) {
                            el.classList.remove(CONFIG.classes.hidden);
                        } else {
                            el.classList.add(CONFIG.classes.hidden);
                        }
                    } catch (error) {
                        LOG.warn(MODULE, 'Element visibility update failed:', error);
                    }
                });
            });

            // Update content sections
            const contentSections = document.querySelectorAll(CONFIG.selectors.contentSection);
            contentSections.forEach(section => {
                try {
                    const hasContent = 
                        section.querySelector(CONFIG.selectors.detailLevel1) ||
                        (currentLevel >= 2 && section.querySelector(`${CONFIG.selectors.detailLevel2}:not(.${CONFIG.classes.hidden})`)) ||
                        (currentLevel >= 3 && section.querySelector(`${CONFIG.selectors.detailLevel3}:not(.${CONFIG.classes.hidden})`));

                    section.classList.toggle(CONFIG.classes.outOfFocus, !hasContent);
                } catch (error) {
                    LOG.warn(MODULE, 'Content section update failed:', error);
                }
            });

            LOG.debug(MODULE, `Visibility updated for level ${currentLevel}`);
            return true;

        } catch (error) {
            LOG.error(MODULE, 'Visibility update failed:', error);
            return false;
        }
    }

    /**
     * Updates information text display
     * @private
     * @param {string} level
     * @returns {boolean}
     */
    function _updateInfoText(level) {
        try {
            const infoElement = document.getElementById(CONFIG.selectors.detailLevelInfo);
            if (!infoElement) {
                LOG.debug(MODULE, 'Info element not found');
                return false;
            }

            const infoTexts = {
                basic: CONFIG.i18n.de.level1,
                best_practice: CONFIG.i18n.de.level2,
                expert: CONFIG.i18n.de.level3
            };

            infoElement.textContent = infoTexts[level] || '';
            return true;

        } catch (error) {
            LOG.error(MODULE, 'Info text update failed:', error);
            return false;
        }
    }

    /**
     * Updates button active states
     * @private
     * @param {string} level
     * @returns {boolean}
     */
    function _updateActiveButton(level) {
        try {
            const levelNumber = LEVEL_TO_NUMBER[level];
            const allButtons = document.querySelectorAll(
                `${CONFIG.selectors.detailLevelBtn}, ${CONFIG.selectors.detailBtnMini}`
            );

            // Clear all active states
            allButtons.forEach(btn => {
                try {
                    btn.classList.remove(CONFIG.classes.active);
                    btn.setAttribute('aria-pressed', 'false');
                } catch (error) {
                    LOG.warn(MODULE, 'Button state clear failed:', error);
                }
            });

            // Activate matching buttons
            const selectors = [
                `[data-level="${levelNumber}"]`,
                `[data-level="${level}"]`
            ].map(sel => 
                `${CONFIG.selectors.detailLevelBtn}${sel}, ${CONFIG.selectors.detailBtnMini}${sel}`
            ).join(', ');

            const activeButtons = document.querySelectorAll(selectors);
            let activatedCount = 0;

            activeButtons.forEach(btn => {
                try {
                    btn.classList.add(CONFIG.classes.active);
                    btn.setAttribute('aria-pressed', 'true');
                    activatedCount++;
                } catch (error) {
                    LOG.warn(MODULE, 'Button activation failed:', error);
                }
            });

            if (activatedCount > 0) {
                LOG.debug(MODULE, `Activated ${activatedCount} buttons for level ${level}`);
                return true;
            } else {
                LOG.warn(MODULE, `No buttons found for level: ${level}`);
                return false;
            }

        } catch (error) {
            LOG.error(MODULE, 'Button update failed:', error);
            return false;
        }
    }

    // ========================================================================
    // RESET FUNCTIONALITY
    // ========================================================================

    /**
     * Resets system to default state
     * @private
     * @returns {boolean}
     */
    function _resetToDefault() {
        try {
            const previousLevel = _currentLevel;
            _currentLevel = CONFIG.defaultLevel;

            LOG.debug(MODULE, `Resetting from ${previousLevel} to default`);

            _updateDetailVisibility(CONFIG.defaultLevel);
            _updateInfoText(CONFIG.defaultLevel);
            _updateActiveButton(CONFIG.defaultLevel);

            // Clear stored preference
            if (window.StateManager) {
                try {
                    window.StateManager.remove('preferences.detailLevel');
                } catch (error) {
                    LOG.warn(MODULE, 'Preference clear failed:', error);
                }
            }

            window.dispatchEvent(new CustomEvent('detailLevelReset', {
                detail: { previousLevel, newLevel: CONFIG.defaultLevel }
            }));

            LOG.info(MODULE, 'System reset completed');
            return true;

        } catch (error) {
            LOG.error(MODULE, 'System reset failed:', error);
            return false;
        }
    }

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    /**
     * Handles button clicks via event delegation
     * @private
     * @param {Event} event
     */
    function _handleDetailLevelClick(event) {
        try {
            const button = event.target.closest(
                `${CONFIG.selectors.detailLevelBtn}, ${CONFIG.selectors.detailBtnMini}`
            );
            
            if (!button) return;

            event.preventDefault();
            const level = button.dataset.level;
            
            if (level) {
                setDetailLevel(level);
            } else {
                LOG.error(MODULE, 'Button missing data-level', button);
            }
        } catch (error) {
            LOG.error(MODULE, 'Click handler failed:', error);
        }
    }

    /**
     * Handles button keyboard activation
     * @private
     * @param {Event} event
     */
    function _handleDetailLevelKeydown(event) {
        try {
            if (event.key !== 'Enter' && event.key !== ' ') return;

            const button = event.target.closest(
                `${CONFIG.selectors.detailLevelBtn}, ${CONFIG.selectors.detailBtnMini}`
            );
            
            if (!button) return;

            event.preventDefault();
            const level = button.dataset.level;
            
            if (level) {
                setDetailLevel(level);
            }
        } catch (error) {
            LOG.error(MODULE, 'Keydown handler failed:', error);
        }
    }

    /**
     * Handles global keyboard shortcuts
     * @private
     * @param {Event} event
     */
    function _handleKeyboardShortcuts(event) {
        try {
            for (const key in KEYBOARD_SHORTCUTS) {
                const shortcut = KEYBOARD_SHORTCUTS[key];
                
                if (event.key === shortcut.key && event.altKey && 
                    !event.ctrlKey && !event.shiftKey && !event.metaKey) {
                    
                    event.preventDefault();
                    event.stopPropagation();
                    setDetailLevel(shortcut.level);
                    return;
                }
            }
        } catch (error) {
            LOG.error(MODULE, 'Shortcut handler failed:', error);
        }
    }

    // ========================================================================
    // INITIALIZATION
    // ========================================================================

    /**
     * Initializes event delegation system
     * @private
     * @returns {boolean}
     */
    function _initDetailLevelControls() {
        try {
            _delegationContainer = document.querySelector(CONFIG.selectors.detailControlContainer) || document;

            _delegationContainer.addEventListener('click', _handleDetailLevelClick);
            _delegationContainer.addEventListener('keydown', _handleDetailLevelKeydown);
            document.addEventListener('keydown', _handleKeyboardShortcuts);

            // Apply initial level
            let initialLevel = CONFIG.defaultLevel;
            if (window.StateManager) {
                try {
                    const stored = window.StateManager.get('preferences.detailLevel');
                    if (stored && _isValidLevel(stored)) {
                        initialLevel = stored;
                    }
                } catch (error) {
                    LOG.warn(MODULE, 'Preference load failed:', error);
                }
            }

            _currentLevel = initialLevel;
            _updateDetailVisibility(initialLevel);
            _updateInfoText(initialLevel);
            _updateActiveButton(initialLevel);

            LOG.debug(MODULE, 'Controls initialized');
            return true;

        } catch (error) {
            LOG.error(MODULE, 'Controls initialization failed:', error);
            return false;
        }
    }

    /**
     * Initializes preference event listeners
     * @private
     * @returns {boolean}
     */
    function _initDetailLevelListeners() {
        try {
            if (window.StateManager) {
                window.addEventListener('preferencesLoaded', () => {
                    try {
                        const level = window.StateManager.get('preferences.detailLevel');
                        if (level && _isValidLevel(level)) {
                            setDetailLevel(level);
                        }
                    } catch (error) {
                        LOG.error(MODULE, 'Preferences loaded handler failed:', error);
                    }
                });

                window.addEventListener('preferencesReset', _resetToDefault);
            }

            LOG.debug(MODULE, 'Listeners initialized');
            return true;

        } catch (error) {
            LOG.error(MODULE, 'Listeners initialization failed:', error);
            return false;
        }
    }

    /**
     * Main initialization function
     * @public
     * @returns {boolean}
     */
    function init() {
        try {
            if (_isInitialized) {
                LOG.warn(MODULE, 'Already initialized');
                return false;
            }

            if (!_checkDependencies()) {
                return false;
            }

            const success = _initDetailLevelControls() && _initDetailLevelListeners();
            
            if (success) {
                _isInitialized = true;
                LOG.info(MODULE, 'Initialization completed');
            }

            return success;

        } catch (error) {
            LOG.error(MODULE, 'Initialization failed:', error);
            return false;
        }
    }

    // ========================================================================
    // CLEANUP AND DESTRUCTION
    // ========================================================================

    /**
     * Cleans up event listeners
     * @private
     */
    function _cleanupEventListeners() {
        try {
            if (_delegationContainer) {
                _delegationContainer.removeEventListener('click', _handleDetailLevelClick);
                _delegationContainer.removeEventListener('keydown', _handleDetailLevelKeydown);
            }
            
            document.removeEventListener('keydown', _handleKeyboardShortcuts);
            
            if (window.StateManager) {
                window.removeEventListener('preferencesLoaded', _initDetailLevelListeners);
                window.removeEventListener('preferencesReset', _resetToDefault);
            }

            LOG.debug(MODULE, 'Event listeners cleaned up');
        } catch (error) {
            LOG.error(MODULE, 'Listener cleanup failed:', error);
        }
    }

    /**
     * Comprehensive system destruction
     * @public
     * @returns {boolean}
     */
    function destroy() {
        try {
            if (!_isInitialized) {
                LOG.warn(MODULE, 'Not initialized');
                return false;
            }

            _cleanupEventListeners();
            
            // Reset state
            _isInitialized = false;
            _delegationContainer = null;
            _currentLevel = CONFIG.defaultLevel;

            delete window.DetailLevel;

            LOG.info(MODULE, 'Destruction completed');
            return true;

        } catch (error) {
            LOG.error(MODULE, 'Destruction failed:', error);
            return false;
        }
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    /**
     * Public API following toast system pattern
     * @namespace DetailLevel
     */
    window.DetailLevel = {
        // Core functionality
        init: init,
        setLevel: setDetailLevel,
        destroy: destroy,
        reset: _resetToDefault,

        // Utility methods
        getCurrentLevel: _getCurrentLevel,
        getDefaultLevel: _getDefaultLevel,
        isValidLevel: _isValidLevel,
        isInitialized: () => _isInitialized,

        // Constants for programmatic use
        LEVELS: {
            BASIC: 'basic',
            BEST_PRACTICE: 'bestpractice', 
            EXPERT: 'expert',
            LEVEL_1: '1',
            LEVEL_2: '2',
            LEVEL_3: '3'
        },

        // Debug information (following toast pattern)
        _debug: {
            CONFIG: CONFIG,
            currentLevel: () => _currentLevel,
            isInitialized: () => _isInitialized
        }
    };

    LOG.info(MODULE, 'Module loaded and ready');

})();
