// ============================================================================
// SCRIPT-TIPS.JS - Version 2.0.1
// Tips Footer System with Rotating Help Tips and Preferences Integration
//
// This module provides a rotating tips footer, managed by user preferences
// via StateManager, and is fully accessible.
//
// Key Features:
// - Stateful module architecture with event dispatching
// - Automatic tip rotation with configurable intervals
// - User preference persistence via StateManager
// - Event delegation for all user interactions
// - Full i18n support for UI text and ARIA labels
// - WCAG-compliant keyboard navigation
// - Uses CSS classes for all state and visibility changes (no .style)
//
// @version 2.0.1
// @author Polizeipräsidium Duisburg
// @license MIT
// ============================================================================

// RULE 1.1: Always use an IIFE for scope isolation
(function(scope) {
    // RULE 1.2: Always include 'use strict' for safety
    'use strict';

    // RULE 1.3: The module must define a top-level MODULE constant for identification
    const MODULE = 'TIPS';
    // RULE 1.1: Scope is the parameter that carries the interface to the outside
    const _global = scope;

    // ========================================================================
    // DEPENDENCY CHECK
    // ========================================================================

    // RULE 4.1: Check critical dependencies immediately upon execution
    if (typeof _global.LOG === 'undefined') {
        // RULE 4.2: Use console.error as a fallback
        console.error(`${MODULE}: LOG system required but not available`);
        // RULE 4.3: Return early to disable the module
        return;
    }

    // This creates a local LOG object that automatically prepends MODULE
    // RULE 5.2: Utilize all four defined logging functions
    const LOG = {
        debug: (message, ...data) => _global.LOG.debug(MODULE, message, ...data),
        info: (message, ...data) => _global.LOG.info(MODULE, message, ...data),
        warn: (message, ...data) => _global.LOG.warn(MODULE, message, ...data),
        error: (message, ...data) => _global.LOG.error(MODULE, message, ...data)
    };

    if (typeof _global.APP_CONSTANTS === 'undefined') {
        LOG.error('APP_CONSTANTS required but not available');
        return; // RULE 4.3
    }

    if (typeof _global.StateManager === 'undefined') {
        LOG.warn('StateManager unavailable - preferences will not be saved');
    }

    // ========================================================================
    // CONFIGURATION
    // ========================================================================

    // RULE 2.1: Centralize all module defaults, strings, classes... in a CONFIG object
    const CONFIG = {
        constants: {
            // RULE 2.2: CONFIG must explicitly include sections for... constants
            events: {
                STATE_CHANGED: 'tipsStateChanged',
                INITIALIZED: 'tipsInitialized'
            },
            version: '2.0.1',
            tipIcons: {
                tip: '💡',
                keyboard: '⌨️',
                note: '📝',
                search: '🔍',
                history: '📜',
                focus: '🎯',
                template: '⚡',
                tag: '📖',
                report: '🌐',
                storage: '💾'
            }
        },
        settings: {
            // RULE 2.2: CONFIG must explicitly include sections for... settings
            rotationInterval: _global.APP_CONSTANTS?.TIPS_ROTATION_INTERVAL || 8000
        },
        classes: {
            // RULE 2.2: CONFIG must explicitly include sections for... classes
            hidden: 'hidden',
            container: 'tips-footer',
            prevBtn: 'tips-prev-btn',
            nextBtn: 'tips-next-btn',
            closeBtn: 'tips-close-btn',
            tipContent: 'tips-content',
            tipIcon: 'tips-icon',
            tipText: 'tips-text',
            bodyHiddenClass: 'tips-hidden' // Class to add to <body>
        },
        selectors: {
            // RULE 2.2: CONFIG must explicitly include sections for... selectors
            // Selectors will be auto-generated
        },
        i18n: {
            // RULE 2.2: CONFIG must explicitly include sections for... i18n
            de: {
                tip1: 'Nutzen Sie Alt+1, Alt+2, Alt+3, um schnell zwischen Detailebenen zu wechseln',
                tip2: 'Nutzen Sie Alt+n, um die Navigationsleiste ein- und auszublenden',
                tip3: 'ESC schließt den Notizblock, den Agenten und geöffnete Fenster',
                tip4: 'Ihre Notizen werden automatisch gespeichert und bleiben auch nach dem Schließen erhalten',
                tip5: 'Klicken Sie doppelt auf Navigationseinträge, um direkt zum Abschnitt zu springen',
                tip6: 'Der Verlauf zeigt alle besuchten Abschnitte - öffnen Sie ihn über das Menü oben links',
                tip7: 'Fokussierte Abschnitte werden hervorgehoben - andere erscheinen transparent',
                tip8: 'Templates sparen Zeit: Speichern Sie häufig genutzte Export-Konfigurationen',
                tip9: 'Taggen Sie wichtige Beweise vor dem Export für fokussierte Reports',
                tip10: 'HTML-Reports eignen sich besonders für Chat-Analysen und mehrsprachige Inhalte',
                tip11: 'Alle Ihre Einstellungen werden lokal im Browser gespeichert',
                // ARIA Labels
                ariaContainer: 'Tipps und Tastenkombinationen',
                ariaPrevTip: 'Vorheriger Tipp',
                ariaNextTip: 'Nächster Tipp',
                ariaCloseTips: 'Tipps ausblenden',
                ariaShowTips: 'Tipps einblenden'
            },
            en: {
                // RULE 2.2: i18n must contain 'de'. Other languages are optional.
                tip1: 'Use Alt+1, Alt+2, Alt+3 to quickly switch between detail levels',
                tip2: 'Use Alt+n to show and hide the navigation bar',
                tip3: 'ESC closes the notepad, the agent, and open windows',
                tip4: 'Your notes are saved automatically and remain even after closing',
                tip5: 'Double-click navigation entries to jump directly to the section',
                tip6: 'History shows all visited sections - open it via the menu in the top left',
                tip7: 'Focused sections are highlighted - others appear transparent',
                tip8: 'Templates save time: Save frequently used export configurations',
                tip9: 'Tag important evidence before exporting for focused reports',
                tip10: 'HTML reports are particularly suitable for chat analyses and multilingual content',
                tip11: 'All your settings are saved locally in the browser',
                // ARIA Labels
                ariaContainer: 'Tips and Keyboard Shortcuts',
                ariaPrevTip: 'Previous Tip',
                ariaNextTip: 'Next Tip',
                ariaCloseTips: 'Hide Tips',
                ariaShowTips: 'Show Tips'
            }
        },
        // Declarative list of tips
        tips: [
            { key: 'tip1', icon: 'keyboard' },
            { key: 'tip2', icon: 'keyboard' },
            { key: 'tip3', icon: 'keyboard' },
            { key: 'tip4', icon: 'note' },
            { key: 'tip5', icon: 'search' },
            { key: 'tip6', icon: 'history' },
            { key: 'tip7', icon: 'focus' },
            { key: 'tip8', icon: 'template' },
            { key: 'tip9', icon: 'tag' },
            { key: 'tip10', icon: 'report' },
            { key: 'tip11', icon: 'storage' }
        ]
    };

    // RULE 2.4: The code for 'Generate selectors from classes' must be used completely
    // Generate selectors from classes
    CONFIG.selectors = Object.keys(CONFIG.classes).reduce((acc, key) => {
        if (typeof CONFIG.classes[key] === 'string') {
            acc[key] = `.${CONFIG.classes[key]}`;
        } else if (typeof CONFIG.classes[key] === 'function') {
            acc[key] = (param) => `.${CONFIG.classes[key](param)}`;
        }
        return acc;
    }, {});

    // RULE 2.4: Manual selectors... may override... or add a new one
    // Replace or add selectors
    CONFIG.selectors = {
        ...CONFIG.selectors, // Use the existing selectors
        container: '#tips-footer', // Override 'container' to use the ID
        showBtn: '#show-tips-footer-btn'
    };

    // ========================================================================
    // STATE
    // ========================================================================

    // RULE 1.5.1: Names of all private internal variables... must have a leading underscore
    let _isInitialized = false;
    let _currentTipIndex = 0;
    let _tipRotationTimer = null;
    let _tips = [];
    let _eventTarget; // RULE 3.1
    let _unsubscribeFunctions = []; // RULE 3.4

    // DOM element references
    let _containerElement = null;
    let _tipTextElement = null;
    let _tipIconElement = null;
    let _showBtnElement = null;

    // ========================================================================
    // HELPER FUNCTIONS
    // ========================================================================

    /**
     * Retrieves a localized string from CONFIG.i18n
     * RULE 2.5: An internal helper function... must be used to retrieve localized strings
     * @param {string} key - The key to translate
     * @returns {string} The translated string or the key itself as a fallback
     */
    function _t(key) {
        // RULE 2.5: ...based on the current document language, with a defined fallback
        const lang = document.documentElement.lang || 'de';
        return CONFIG.i18n[lang]?.[key] || CONFIG.i18n['de']?.[key] || key;
    }

    // ========================================================================
    // EVENT COMMUNICATION
    // ========================================================================

    // RULE 3.1: An internal event system... must be initialized
    /**
     * Initializes the internal EventTarget
     * @private
     */
    function _initEventSystem() {
        try {
            _eventTarget = new EventTarget();
        } catch (error) {
            LOG.error('Failed to initialize EventTarget:', error);
        }
    }

    // RULE 3.2: A dispatchModuleEvent function must be provided
    /**
     * Dispatches a standardized module event
     * @param {string} eventType - The event type from CONFIG.constants.events
     * @param {object} [detail={}] - Additional data to send with the event
     * @returns {boolean} Success of dispatch
     */
    function dispatchModuleEvent(eventType, detail = {}) {
        if (!_eventTarget) {
            LOG.error(`Event system not initialized - cannot dispatch: ${eventType}`);
            return false;
        }

        // RULE 3.2: ...including type validation
        if (!Object.values(CONFIG.constants.events).includes(eventType)) {
            LOG.error(`Invalid event type: ${eventType}`);
            return false;
        }

        // RULE 3.2: ...a detail object with at least a timestamp
        const event = new CustomEvent(eventType, {
            detail: {
                timestamp: Date.now(),
                ...detail
            },
            bubbles: true, // RULE 3.2
            cancelable: true // RULE 3.2
        });

        LOG.debug(`📢 Dispatching event: ${eventType}`, detail);
        return _eventTarget.dispatchEvent(event);
    }

    // RULE 3.3: Public addEventListener... methods must be provided
    /**
     * Subscribes to an internal module event
     * @param {string} eventType - The event type to listen for
     * @param {Function} callback - The function to execute
     * @param {object} [options] - Event listener options
     */
    function addEventListener(eventType, callback, options) {
        if (!_eventTarget) {
            LOG.error(`Event system not initialized - cannot listen to: ${eventType}`);
            return;
        }
        _eventTarget.addEventListener(eventType, callback, options);
        LOG.debug(`👂 Event listener added for: ${eventType}`);
    }

    // RULE 3.3: Public... removeEventListener methods must be provided
    /**
     * Unsubscribes from an internal module event
     * @param {string} eventType - The event type
     * @param {Function} callback - The function to remove
     * @param {object} [options] - Event listener options
     */
    function removeEventListener(eventType, callback, options) {
        if (!_eventTarget) return;
        _eventTarget.removeEventListener(eventType, callback, options);
        LOG.debug(`🔇 Event listener removed for: ${eventType}`);
    }

    // ========================================================================
    // PRIVATE METHODS
    // ========================================================================

    /**
     * Populates the internal _tips array from CONFIG
     * @private
     */
    function _initializeTipsArray() {
        // RULE 4.6: For operations that might fail... use a try...catch block
        try {
            _tips = CONFIG.tips.map(tip => {
                // RULE 2.3: Only references to CONFIG are allowed
                return {
                    icon: CONFIG.constants.tipIcons[tip.icon] || CONFIG.constants.tipIcons.tip,
                    // RULE 5.3: All messages addressed to the end-user must be loaded via... i18n
                    text: _t(tip.key)
                };
            });
            LOG.debug(`Tips array initialized with ${_tips.length} entries`);
        } catch (error) {
            LOG.error('Failed to initialize tips array:', error);
        }
    }

    /**
     * Displays a tip in the UI based on the current index
     * @private
     */
    function _showCurrentTip() {
        if (!_tipTextElement || !_tipIconElement) {
            LOG.warn('Tip elements not found, cannot display tip');
            return;
        }
        if (_tips.length === 0) {
            LOG.warn('No tips available to display');
            return;
        }

        // Ensure index is valid
        _currentTipIndex = (_currentTipIndex + _tips.length) % _tips.length;
        const tip = _tips[_currentTipIndex];

        // RULE 4.5: Prefer using textContent over innerHTML
        _tipIconElement.textContent = tip.icon;
        _tipTextElement.textContent = tip.text;

        LOG.debug(`Showing tip ${_currentTipIndex + 1}/${_tips.length}`);
    }

    /**
     * Shows the next or previous tip
     * @private
     * @param {number} direction - 1 for next, -1 for previous
     */
    function _showTip(direction = 1) {
        _currentTipIndex += direction;
        _showCurrentTip();
        // Restart rotation timer on manual navigation
        if (_isInitialized && !_containerElement.classList.contains(CONFIG.classes.hidden)) {
            _startTipRotation();
        }
    }

    /**
     * Starts the automatic tip rotation interval
     * @private
     */
    function _startTipRotation() {
        // Clear existing timer to prevent duplicates
        _stopTipRotation();
        _tipRotationTimer = setInterval(() => {
            _showTip(1); // Show next tip
        }, CONFIG.settings.rotationInterval); // RULE 2.3
        LOG.debug('Rotation started');
    }

    /**
     * Stops the automatic tip rotation interval
     * @private
     */
    function _stopTipRotation() {
        if (_tipRotationTimer) {
            clearInterval(_tipRotationTimer);
            _tipRotationTimer = null;
        }
        LOG.debug('Rotation stopped');
    }

    /**
     * Consolidated function to show or hide the tips footer
     * @private
     * @param {boolean} shouldShow - True to show, false to hide
     */
    function _setVisibility(shouldShow) {
        if (!_containerElement) {
            LOG.warn('Container element not found, cannot toggle visibility');
            return;
        }

        // RULE 6.1: All visual styling must reside in CSS
        // RULE 6.2: JavaScript's role is strictly limited to toggling state classes
        _containerElement.classList.toggle(CONFIG.classes.hidden, !shouldShow);
        document.body.classList.toggle(CONFIG.classes.bodyHiddenClass, !shouldShow);

        if (_showBtnElement) {
            _showBtnElement.classList.toggle(CONFIG.classes.hidden, shouldShow);
            // RULE 6.6: Utilize correct ARIA attributes
            _showBtnElement.setAttribute('aria-expanded', shouldShow.toString());
        }
        _containerElement.setAttribute('aria-hidden', (!shouldShow).toString());


        if (shouldShow) {
            _showCurrentTip();
            _startTipRotation();
            LOG.info('Tips footer shown');
        } else {
            _stopTipRotation();
            LOG.info('Tips footer hidden');
        }

        // Persist preference
        if (_global.StateManager) {
            // RULE 4.6: Use a try...catch block
            try {
                _global.StateManager.set('preferences.showTips', shouldShow);
            } catch (error) {
                LOG.warn('Failed to persist showTips preference:', error);
            }
        }

        // RULE 3.2: Dispatch internal event
        dispatchModuleEvent(CONFIG.constants.events.STATE_CHANGED, { isVisible: shouldShow });
    }

    /**
     * Toggles the visibility of the tips footer
     * @private
     */
    function _toggleVisibility() {
        if (!_containerElement) {
            LOG.warn('Container element not found, cannot toggle visibility');
            return;
        }
        // Check if it's currently hidden, and pass the opposite (show=true) to _setVisibility
        const isCurrentlyHidden = _containerElement.classList.contains(CONFIG.classes.hidden);
        _setVisibility(isCurrentlyHidden);
    }

    /**
     * Applies the user's saved preference on load
     * @private
     */
    function _applyTipsPreference() {
        // RULE 4.6: Use try...catch for operations that might fail
        try {
            const shouldShow = _global.StateManager?.get('preferences.showTips') ?? true;
            LOG.debug(`Applying tips preference: showTips=${shouldShow}`);
            _setVisibility(shouldShow);
        } catch (error) {
            LOG.error('Failed to apply tips preference:', error);
            _setVisibility(true); // Default to showing tips on failure
        }
    }

    /**
     * Queries and caches DOM elements
     * @private
     * @returns {boolean} True if essential elements were found
     */
    function _initDOM() {
        // RULE 4.7: For iterative DOM operations... (here, finding elements)
        try {
            _containerElement = document.querySelector(CONFIG.selectors.container);
            if (!_containerElement) {
                LOG.error('Tips container not found. Module will not function.');
                return false;
            }

            _tipTextElement = _containerElement.querySelector(CONFIG.selectors.tipText);
            _tipIconElement = _containerElement.querySelector(CONFIG.selectors.tipIcon);
            _showBtnElement = document.querySelector(CONFIG.selectors.showBtn); // May be null

            if (!_tipTextElement || !_tipIconElement) {
                LOG.error('Tip text or icon element not found inside container.');
                return false;
            }

            // RULE 6.6: Utilize correct ARIA attributes, loading text via i18n helper
            // RULE 5.3: All messages addressed to the end-user must be loaded via i18n
            _containerElement.setAttribute('aria-label', _t('ariaContainer'));
            _containerElement.querySelector(CONFIG.selectors.prevBtn)?.setAttribute('aria-label', _t('ariaPrevTip'));
            _containerElement.querySelector(CONFIG.selectors.nextBtn)?.setAttribute('aria-label', _t('ariaNextTip'));
            _containerElement.querySelector(CONFIG.selectors.closeBtn)?.setAttribute('aria-label', _t('ariaCloseTips'));
            if (_showBtnElement) {
                _showBtnElement.setAttribute('aria-label', _t('ariaShowTips'));
                _showBtnElement.setAttribute('aria-controls', 'tips-footer');
                _showBtnElement.innerText = _t('ariaShowTips');
            }

            return true;
        } catch (error) {
            LOG.error('Failed during DOM initialization:', error);
            return false;
        }
    }

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    /**
     * Handles all click events delegated from the container
     * @private
     * @param {Event} event - The click event
     */
    function _handleDelegatedClick(event) {
        // RULE 6.4: Utilize Event Delegation
        const target = event.target;
        
        // Use data-action attributes for reliable delegation
        const action = target.closest('[data-action]')?.dataset.action;

        // RULE 4.7: Use individual try...catch blocks within loops (or delegation)
        try {
            switch (action) {
                case 'prev-tip':
                    event.preventDefault();
                    _showTip(-1); // Previous tip
                    break;
                case 'next-tip':
                    event.preventDefault();
                    _showTip(1); // Next tip
                    break;
                case 'close-tips':
                    event.preventDefault();
                    _setVisibility(false); // Hide
                    break;
            }
        } catch (error) {
            LOG.error('Failed to handle delegated click:', error);
        }
    }

    /**
     * Handles keyboard events for accessibility
     * @private
     * @param {KeyboardEvent} event
     */
    function _handleKeyboardEvents(event) {
        // RULE 6.5: Ensure WCAG compliance by implementing keyboard support
        const target = event.target;

        // Check if the event is on a button (Enter/Space)
        if (target.closest('button')) {
            // RULE 6.5: ...using CONFIG references (e.g., Enter/Space for activation)
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                // We can just re-use the click handler logic
                _handleDelegatedClick(event);
            }
        }

        // Global Escape key for dismissal
        if (event.key === 'Escape') { // RULE 2.3: Exception for strong logical requirement
            // Check if focus is inside the tips footer before closing
            if (_containerElement && _containerElement.contains(document.activeElement)) {
                event.preventDefault();
                _setVisibility(false);
            }
        }
    }

    /**
     * Handles the click on the external "Show Tips" button
     * @private
     * @param {Event} event
     */
    function _handleShowBtnClick(event) {
        try {
            event.preventDefault();
            _setVisibility(true);
        } catch (error) {
            LOG.error('Failed to handle show button click:', error);
        }
    }

    /**
     * Subscribes to external events (like StateManager)
     * @private
     */
    function _subscribeToExternalEvents() {
        // RULE 3.4: External event subscriptions... must be tracked
        if (_global.StateManager) {
            const prefLoadedHandler = () => _applyTipsPreference();
            const prefResetHandler = () => _applyTipsPreference();

            _global.addEventListener('preferencesLoaded', prefLoadedHandler);
            _global.addEventListener('preferencesReset', prefResetHandler);

            // RULE 3.4: ...using an array of unsubscribe functions
            _unsubscribeFunctions.push(() => {
                _global.removeEventListener('preferencesLoaded', prefLoadedHandler);
            });
            _unsubscribeFunctions.push(() => {
                _global.removeEventListener('preferencesReset', prefResetHandler);
            });

            LOG.debug('Subscribed to StateManager events');
        }
    }

    /**
     * Attaches all internal event listeners
     * @private
     */
    function _initEventHandlers() {
        // RULE 6.4: Utilize Event Delegation... on a container element
        _containerElement.addEventListener('click', _handleDelegatedClick);
        _containerElement.addEventListener('keydown', _handleKeyboardEvents);

        if (_showBtnElement) {
            _showBtnElement.addEventListener('click', _handleShowBtnClick);
        }
        LOG.debug('Internal event handlers initialized');
    }

    /**
     * Removes all internal event listeners
     * @private
     */
    function _cleanupEventListeners() {
        // RULE 8.3: The destroy() method must remove all internal DOM event listeners
        if (_containerElement) {
            _containerElement.removeEventListener('click', _handleDelegatedClick);
            _containerElement.removeEventListener('keydown', _handleKeyboardEvents);
        }
        if (_showBtnElement) {
            _showBtnElement.removeEventListener('click', _handleShowBtnClick);
        }
        LOG.debug('Internal event listeners cleaned up');
    }

    // ========================================================================
    // LIFECYCLE
    // ========================================================================

    /**
     * Initializes the Tips module
     * RULE 7.1: All functions must have comprehensive JSDoc
     * @returns {boolean} True if initialization was successful
     */
    function init() {
        // RULE 3.5: All public methods... must be idempotent
        if (_isInitialized) {
            LOG.warn('Already initialized');
            return false;
        }

        // RULE 4.6: For operations that might fail... use a try...catch block
        try {
            LOG.info('Initialization started');

            if (!_initDOM()) {
                LOG.error('DOM initialization failed. Aborting.');
                return false;
            }

            _initializeTipsArray();
            _initEventHandlers();
            _subscribeToExternalEvents();

            // Apply preference last, which will show/hide and start rotation
            _applyTipsPreference();

            _isInitialized = true;
            LOG.info('Initialized successfully');
            
            // Dispatch initialized event
            dispatchModuleEvent(CONFIG.constants.events.INITIALIZED, {
                version: CONFIG.constants.version
            });
            
            // RULE 4.8: Functions with error handling must always return consistent types
            return true;

        } catch (error) {
            LOG.error('Initialization failed:', error);
            _isInitialized = false;
            return false; // RULE 4.8
        }
    }

    // RULE 8.1: Provide a public API destroy() method
    /**
     * Destroys the module and cleans up all resources
     * @returns {boolean} True if destruction was successful
     */
    function destroy() {
        // RULE 3.5: ...destroy() must be idempotent
        if (!_isInitialized) {
            LOG.warn('Not initialized, skipping destroy.');
            return false;
        }

        LOG.info('Destruction started');
        // RULE 4.6: Use try...catch for operations that might fail
        try {
            // RULE 8.2: The destroy() method must reset all internal state
            _isInitialized = false; // Mark as uninitialized first
            _stopTipRotation();
            _cleanupEventListeners(); // RULE 8.3

            // RULE 8.3: ...and execute all external unsubscribe functions
            _unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
            _unsubscribeFunctions = []; // RULE 3.4

            // RULE 8.4: The destroy() method must clear all DOM element... references
            _containerElement = null;
            _tipTextElement = null;
            _tipIconElement = null;
            _showBtnElement = null;
            _eventTarget = null; // RULE 8.4

            // RULE 8.2: ...reset all internal state
            _tips = [];
            _currentTipIndex = 0;

            // RULE 8.5: The destroy() method must remove the public API object
            delete _global.Tips;

            LOG.info('Destroyed successfully');
            return true;
        } catch (error) {
            LOG.error('Destruction failed:', error);
            return false;
        }
    }

    /**
     * Runs at module load time to prepare critical systems
     * @private
     */
    function _loaded() {
        _initEventSystem(); // RULE 3.1
        LOG.debug('Module loaded, event system ready');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    // RULE 1.5.2: Names of the exposed API object must use PascalCase
    _global.Tips = {
        // RULE 8.6: Public API must be structured to include core functionality
        init: init,
        destroy: destroy,

        // Utility methods
        show: () => _setVisibility(true),
        hide: () => _setVisibility(false),
        toggle: _toggleVisibility, // <-- ADDED TOGGLE FUNCTION
        next: () => _showTip(1),
        previous: () => _showTip(-1),

        // RULE 8.6: ...the event system
        addEventListener: addEventListener,
        removeEventListener: removeEventListener,

        // RULE 8.6: ...constants
        EVENTS: CONFIG.constants.events,

        // RULE 8.6: ...state-variables
        // RULE 7.5: The module must use the private variable _isInitialized... exposed via an accessor
        isInitialized: () => _isInitialized,

        // RULE 8.6: ...the _debug object
        // RULE 7.3: Provide a standardized _debug object
        _debug: !_global.BUILD_INFO?.debugMode ? undefined : {
            // RULE 7.4: The _debug object should expose CONFIG
            CONFIG: CONFIG,
            // RULE 7.4: Use a getter function... to prevent direct access
            currentState: () => ({
                isInitialized: _isInitialized,
                isVisible: _containerElement ? !_containerElement.classList.contains(CONFIG.classes.hidden) : false,
                currentTipIndex: _currentTipIndex,
                rotationTimerActive: !!_tipRotationTimer
            }),
            tips: () => [..._tips],
            elements: () => ({
                container: _containerElement,
                showButton: _showBtnElement
            })
        }
    };

    // ========================================================================
    // MODULE EXECUTION
    // ========================================================================

    // RULE 8.7: ...the helper function _loaded() must be called
    _loaded();

    // RULE 8.8: A final LOG.info message must be included
    LOG.info(`Module ${MODULE} loaded and exposed.`, _global.Tips);

})(self); // RULE 1.1
