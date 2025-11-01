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

(function(scope) {
    'use strict';

    /**
     * Module identifier for logging and error reporting
     * @constant {string}
     */
    const MODULE = 'DETAIL';
    const _global = scope;

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
            if (typeof _global.LOG === 'undefined') {
                console.error(`${MODULE}: LOG system required but not available`);
                return false;
            }

            if (typeof _global.StateManager === 'undefined') {
                LOG.warn('StateManager unavailable - preferences disabled');
            }

            return true;
        } catch (error) {
            console.error(`${MODULE}: Dependency check failed:`, error);
            return false;
        }
    }

    // Check dependencies first
    if (!_checkDependencies()) return false;
    // This creates a local LOG object that automatically prepends MODULE
    const LOG = {
        debug: (message, ...data) => _global.LOG.debug(MODULE, message, ...data),
        info: (message, ...data) => _global.LOG.info(MODULE, message, ...data),
        warn: (message, ...data) => _global.LOG.warn(MODULE, message, ...data),
        error: (message, ...data) => _global.LOG.error(MODULE, message, ...data)
    };
    LOG.debug('Dependency check passed. Loading...');

    // ========================================================================
    // CONFIGURATION AND SETTINGS
    // ========================================================================

    /**
     * Global configuration object following toast system pattern
     * @namespace CONFIG
     */
    const CONFIG = {
        // System defaults
        defaultLevel: 'basic',
        storageKey: 'userDetailLevelPreference',
        constants: {
            moduleName: 'DetailLevel',
            version: '1.2.1',
            events: {
                loaded: 'loaded',
                levelChanged: 'levelChanged',
                initialized: 'initialized'
            },
            // Keyboard shortcuts configuration
            KEYBOARD_SHORTCUTS : {
                '1': { key: '1', altKey: true, level: '1' },
                '2': { key: '2', altKey: true, level: '2' },
                '3': { key: '3', altKey: true, level: '3' }
            },
            // Reverse mapping for button activation
            LEVEL_TO_NUMBER: {
                'basic': '1', 'bestpractice': '2', 'expert': '3'
            },
            // Level mapping for consistent level normalization
            LEVEL_MAP: {
                '1': '1', '2': '2', '3': '3',
                'basic': '1', 'bestpractice': '2', 'expert': '3'
            }
        },

        settings: {
            // Keyboard shortcuts to work with toast messages
            shortcut1: 'Enter',
            shortcut2: ' '
        },
        
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
            LOG.error(`Selector generation failed for "${key}":`, error);
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

    /** @type {EventTarget|null} */
    let _eventTarget = null;

    /** @type {Array<{target: EventTarget, type: string, handler: Function}>} */
    const _unsubscribeFunctions = [];

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
        const isValid = level != null && level !== '' && CONFIG.constants.LEVEL_MAP[level] !== undefined;
        
        if (!isValid) {
            LOG.warn(`Invalid level: "${level}"`);
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
                LOG.error(`Unsupported level: ${level}`);
                return false;
            }

            const normalizedLevel = CONFIG.constants.LEVEL_MAP[level];

            // Skip if no change needed
            if (_currentLevel === level) {
                LOG.debug(`Level ${level} already active`);
                return true;
            }

            const previousLevel = _currentLevel;
            _currentLevel = level;

            LOG.debug(`Level change: ${previousLevel} → ${level}`);

            // Batch UI updates
            _updateDetailVisibility(normalizedLevel);
            _updateInfoText(normalizedLevel);
            _updateActiveButton(normalizedLevel);

            // Persist preference if available
            if (_global.StateManager) {
                try {
                    _global.StateManager.set('preferences.detailLevel', level);
                } catch (error) {
                    LOG.warn('Preference save failed:', error);
                }
            }

            // Notify other components
            _global.dispatchEvent(new CustomEvent('detailLevelChanged', {
                detail: { previousLevel, newLevel: level, normalizedLevel }
            }));

            LOG.info(`Level set to: ${level}`);
            return true;

        } catch (error) {
            LOG.error(`Level setting failed for "${level}":`, error);
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
            const currentLevel = CONFIG.constants.LEVEL_MAP[level];

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
                        LOG.warn('Element visibility update failed:', error);
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
                    LOG.warn('Content section update failed:', error);
                }
            });

            LOG.debug(`Visibility updated for level ${currentLevel}`);
            return true;

        } catch (error) {
            LOG.error('Visibility update failed:', error);
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
            const infoElement = document.querySelector(CONFIG.selectors.detailLevelInfo);
            if (!infoElement) {
                LOG.debug('Info element not found');
                return false;
            }

            const infoTexts = {
                basic: CONFIG.i18n.de.level1,
                bestpractice: CONFIG.i18n.de.level2,
                expert: CONFIG.i18n.de.level3
            };

            infoElement.textContent = infoTexts[level] || '';
            return true;

        } catch (error) {
            LOG.error('Info text update failed:', error);
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
            const levelNumber = CONFIG.constants.LEVEL_TO_NUMBER[level];
            const allButtons = document.querySelectorAll(
                `${CONFIG.selectors.detailLevelBtn}, ${CONFIG.selectors.detailBtnMini}`
            );

            // Clear all active states
            allButtons.forEach(btn => {
                try {
                    btn.classList.remove(CONFIG.classes.active);
                    btn.setAttribute('aria-pressed', 'false');
                } catch (error) {
                    LOG.warn('Button state clear failed:', error);
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
                    LOG.warn('Button activation failed:', error);
                }
            });

            if (activatedCount > 0) {
                LOG.debug(`Activated ${activatedCount} buttons for level ${level}`);
                return true;
            } else {
                LOG.warn(`No buttons found for level: ${level}`);
                return false;
            }

        } catch (error) {
            LOG.error('Button update failed:', error);
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

            LOG.debug(`Resetting from ${previousLevel} to default`);

            _updateDetailVisibility(CONFIG.defaultLevel);
            _updateInfoText(CONFIG.defaultLevel);
            _updateActiveButton(CONFIG.defaultLevel);

            // Clear stored preference
            if (_global.StateManager) {
                try {
                    _global.StateManager.remove('preferences.detailLevel');
                } catch (error) {
                    LOG.warn('Preference clear failed:', error);
                }
            }

            _global.dispatchEvent(new CustomEvent('detailLevelReset', {
                detail: { previousLevel, newLevel: CONFIG.defaultLevel }
            }));

            LOG.info('System reset completed');
            return true;

        } catch (error) {
            LOG.error('System reset failed:', error);
            return false;
        }
    }

    // ========================================================================
    // EVENT SYSTEM & HELPERS
    // ========================================================================

    /**
     * Dispatches a standardized CustomEvent from the module's event target.
     * @param {string} type - The event type (e.g., 'initialized', 'toastShown').
     * @param {Object} [detail={}] - The event detail payload.
     * @returns {void}
     */
    function _dispatchModuleEvent(type, detail = {}) {
        if (!_eventTarget) {
            LOG.warn('Event target not initialized. Cannot dispatch event.', { event: type });
            return;
        }

        // Verify type
        if (!Object.values(CONFIG.constants.events).includes(type)) {
            LOG.warn('Event type not defined. Cannot dispatch event.', { event: type });
            return;
        }

        // Standardize event detail payload
        const eventDetail = {
            ...detail,
            timestamp: Date.now(),
            module: CONFIG.constants.moduleName
        };

        const event = new CustomEvent(`${CONFIG.constants.moduleName}.${type}`, {
            detail: eventDetail,
            bubbles: true,
            cancelable: true
        });

        _eventTarget.dispatchEvent(event);
        LOG.debug(`Event Dispatched: ${type}`, eventDetail);
    }

    /**
     * Initializes the internal event system using EventTarget.
     * @returns {void}
     */
    function _initEventSystem() {
        if (typeof EventTarget !== 'undefined') {
            _eventTarget = new EventTarget();
            LOG.info('Internal EventTarget initialized.', { target: _eventTarget });
        } else {
            LOG.error('EventTarget is not supported. Module events disabled.', null);
            // Fallback: dummy object to avoid runtime errors
            _eventTarget = {
                dispatchEvent: () => {},
                addEventListener: () => {},
                removeEventListener: () => {}
            };
        }
    }

    /**
     * Helper: Unsubscribes all tracking event listeners.
     */
    function _unsubscribeAll() {
        _unsubscribeFunctions.forEach(({ target, type, handler }) => {
            target.removeEventListener(type, handler);
        });
        _unsubscribeFunctions.length = 0; // Clear array
        LOG.debug('Cleared all external subscriptions.', null);
    }

    /**
     * This function executes logic after the module is fully defined.
     * It must be called as the absolute last step.
     */
    function _loaded() {
        _initEventSystem();
        _dispatchModuleEvent(CONFIG.constants.events.loaded, { version: CONFIG.constants.version });
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
                LOG.error('Button missing data-level', button);
            }
        } catch (error) {
            LOG.error('Click handler failed:', error);
        }
    }

    /**
     * Handles button keyboard activation
     * @private
     * @param {Event} event
     */
    function _handleDetailLevelKeydown(event) {
        try {
            if (event.key !== CONFIG.settings.shortcut1 && event.key !== CONFIG.settings.shortcut2) return;

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
            LOG.error('Keydown handler failed:', error);
        }
    }

    /**
     * Handles global keyboard shortcuts
     * @private
     * @param {Event} event
     */
    function _handleKeyboardShortcuts(event) {
        try {
            for (const key in CONFIG.constants.KEYBOARD_SHORTCUTS) {
                const shortcut = CONFIG.constants.KEYBOARD_SHORTCUTS[key];
                
                if (event.key === shortcut.key && event.altKey && 
                    !event.ctrlKey && !event.shiftKey && !event.metaKey) {
                    
                    event.preventDefault();
                    event.stopPropagation();
                    setDetailLevel(shortcut.level);
                    return;
                }
            }
        } catch (error) {
            LOG.error('Shortcut handler failed:', error);
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
            if (_global.StateManager) {
                try {
                    const stored = _global.StateManager.get('preferences.detailLevel');
                    if (stored && _isValidLevel(stored)) {
                        initialLevel = stored;
                    }
                } catch (error) {
                    LOG.warn('Preference load failed:', error);
                }
            }

            _currentLevel = initialLevel;
            _updateDetailVisibility(initialLevel);
            _updateInfoText(initialLevel);
            _updateActiveButton(initialLevel);

            LOG.debug('Controls initialized');
            return true;

        } catch (error) {
            LOG.error('Controls initialization failed:', error);
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
            if (_global.StateManager) {
                _global.addEventListener('preferencesLoaded', _preferencesLoadedAction);

                _global.addEventListener('preferencesReset', _resetToDefault);
            }

            LOG.debug('Listeners initialized');
            return true;

        } catch (error) {
            LOG.error('Listeners initialization failed:', error);
            return false;
        }
    }

    function _preferencesLoadedAction(e) {
        try {
            const level = _global.StateManager.get('preferences.detailLevel');
            if (level && _isValidLevel(level)) {
                setDetailLevel(level);
            }
        } catch (error) {
            LOG.error('Preferences loaded handler failed:', error);
        }
    }

    /**
     * Main initialization function
     * @public
     * @returns {boolean} - Return true is successful
     */
    function init() {
        try {
            if (_isInitialized) {
                LOG.warn('Already initialized');
                return true;
            }

            if (!_checkDependencies()) {
                return false;
            }

            const success = _initDetailLevelControls() && _initDetailLevelListeners();

            if (success) {
                _isInitialized = true;
                LOG.info('Initialization completed');
            }

            return success;

        } catch (error) {
            LOG.error('Initialization failed:', error);
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
            
            if (_global.StateManager) {
                _global.removeEventListener('preferencesLoaded', _preferencesLoadedAction);
                _global.removeEventListener('preferencesReset', _resetToDefault);
            }

            LOG.debug('Event listeners cleaned up');
        } catch (error) {
            LOG.error('Listener cleanup failed:', error);
        }
    }

    /**
     * Comprehensive system destruction
     * @public
     * @returns {boolean} - Returns true if successful
     */
    function destroy() {
        try {
            if (!_isInitialized) {
                LOG.warn('Not initialized');
                return false;
            }

            _cleanupEventListeners();
            
            // Reset state
            _isInitialized = false;
            _delegationContainer = null;
            _currentLevel = CONFIG.defaultLevel;

            delete _global[CONFIG.constants.moduleName];

            LOG.info('Destruction completed');
            return true;

        } catch (error) {
            LOG.error('Destruction failed:', error);
            return false;
        }
    }

    /**
     * Subscribes a handler to a module event (e.g., 'Toast.loaded').
     * @param {string} type - The event type (e.g., 'loaded').
     * @param {Function} handler - The callback function to execute when the event is dispatched.
     * @param {Object} [options={}] - Optional event listener options (e.g., capture, once).
     * @returns {void}
     */
    function addEventListener(type, handler, options) {
        if (_eventTarget) {
            _eventTarget.addEventListener(type, handler, options);
        }
    }

    /**
     * Unsubscribes a handler from a module event.
     * @param {string} type - The event type (e.g., 'loaded').
     * @param {Function} handler - The specific callback function to remove.
     * @param {Object} [options={}] - Optional event listener options.
     * @returns {void}
     */
    function removeEventListener(type, handler, options) {
        if (_eventTarget) {
            _eventTarget.removeEventListener(type, handler, options);
        }
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    /**
     * Public API following toast system pattern
     * @namespace DetailLevel
     */
    _global[CONFIG.constants.moduleName] = {
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

        // Event listener
        addEventListener: addEventListener,
        removeEventListener: removeEventListener,

        // Constants for programmatic use
        EVENTS: CONFIG.constants.events,
        LEVELS: {
            BASIC: 'basic',
            BEST_PRACTICE: 'bestpractice', 
            EXPERT: 'expert',
            LEVEL_1: '1',
            LEVEL_2: '2',
            LEVEL_3: '3'
        },

        // Debug functions (only when debugMode active)
        _debug: !_global.BUILD_INFO?.debugMode ? undefined : {
            CONFIG: CONFIG,
            currentLevel: () => _currentLevel,
            isInitialized: () => _isInitialized,
            delegationContainer: () => _delegationContainer
        }
    };

    _loaded();

    LOG.info('Module loaded and exposed:', _global[CONFIG.constants.moduleName]);
})(self);
