/**
 * Toast Notification System
 * Provides accessible, theme-aware notifications across the application
 *
 * Features:
 * - WCAG 2.1 compliant accessibility
 * - Automatic XSS protection
 * - Responsive design support
 * - Multiple notification types
 * - Configurable timing and limits
 *
 * @version 1.2.0
 * @license MIT
 */

(function(scope) {
    'use strict';

    const MODULE = 'TOAST';
    const _global = scope;

    // ========================================================================
    // CHECK DEPENDENCIES
    // ========================================================================

    if (typeof _global.LOG === 'undefined') {
        console.error(`${MODULE}: LOG object not available. Toast notification system disabled.`);
        return;
    }
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
     * Global configuration object for toast system
     * @namespace CONFIG
     */
    const CONFIG = {
        constants: {
            moduleName: 'Toast',
            version: '1.2.1',
            events: {
                loaded: 'loaded',
                toastShown: 'toastShown',
                initialized: 'initialized'
            },
            TABINDEX_NOT_FOCUSABLE: '-1'
        },
        // Supported notification types
        types: {
            success: 'success',
            warning: 'warning',
            error: 'error',
            info: 'info'
        }
    };

    CONFIG.settings = {
        // Visual display duration in milliseconds
        defaultDuration: 5000,
        // Animation timing for CSS transitions
        animationTimeout: 300,
        // Maximum number of simultaneous toasts
        maxToasts: 3,
        // Maximum length ot the quoted toast message in the debug message
        maxDebugLength: 50,
        // Default language is German
        defaultLanguage: 'de',
        // Default type is 'info'
        defaultType: CONFIG.types.info,
        // Keyboard shortcuts to work with toast messages
        shortcut1: 'Enter',
        shortcut2: ' ',
        shortcut3: 'Escape'
    };

    // Add CSS classes used by toast message system
    CONFIG.classes = {
        toast: 'toast',
        toastVisible: 'toast--visible',
        toastIcon: 'toast__icon',
        toastContent: 'toast__content',
        toastClose: 'toast__close',
        toastType: (type) => {
            return 'toast--' + ( CONFIG.types[type] || CONFIG.types.error ); // Default is error because this should not happen
        }
    };

    // Generate CONFIG.selectors from classes
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

    // Extend/Modify CONFIG.selectors
    CONFIG.selectors = {
        ...CONFIG.selectors,
        // Add new, non-class selectors
        toastContainer: '#toast-container'
    };

    CONFIG.i18n = {
        de: {
            close: 'Benachrichtigung schließen'
        }
    }

    CONFIG.templates = {
        messageBody: () => {
            const escapedAriaLabel = _escapeHtml(_t('close'));
            return `
            <span class="${CONFIG.classes.toastIcon}"></span>
            <span class="${CONFIG.classes.toastContent}"></span>
            <button class="${CONFIG.classes.toastClose}" aria-atomic="true" aria-label="${escapedAriaLabel}"></button>
            `;
        }
    }

    // ========================================================================
    // PRIVATE VARIABLES
    // ========================================================================

    /** @type {HTMLElement|null} */
    let _toastContainer = null;

    /** @type {Map<string, {element: HTMLElement, timeout: number}>} */
    let _activeToasts = new Set();

    /** @type {boolean} */
    let _isInitialized = false;

    /** @type {HTMLElement|null} */
    let _previousActiveElement = null;

    /** @type {Set<string>} */
    let _errorToastsActive = new Set();

    /** @type {EventTarget|null} */
    let _eventTarget = null;

    /** @type {Array<{target: EventTarget, type: string, handler: Function}>} */
    const _unsubscribeFunctions = [];

    // ========================================================================
    // PRIVATE METHODS
    // ========================================================================

    /**
     * Translates a key using the current document language
     * @param {string} key - The translation key
     * @returns {string} The translated string or the key if not found
     */
    function _t(key) {
        const lang = document.documentElement.lang || CONFIG.settings.defaultLanguage;
        return CONFIG.i18n[lang]?.[key] || key;
    }

    /**
     * Escapes HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    function _escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
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
     * Sets up global event delegation for keyboard and mouse interactions.
     * State the performance rationale that **Event Delegation** is used to reduce the number of event listeners and **ensure efficient DOM operations** on dynamic elements.
     */
    function _initEventDelegation() {
        if (!_toastContainer) return;

        // Single event listener for all toasts
        _toastContainer.addEventListener('keydown', _keydownListener);

        // Click delegation for close buttons
        _toastContainer.addEventListener('click', _clickListener);
    }

    function _keydownListener(e) {
        const toast = e.target.closest(CONFIG.selectors.toast);
        if (!toast) return;

        // Close button keyboard activation
        if (e.target.matches(CONFIG.selectors.toastClose) &&
           (e.key === CONFIG.settings.shortcut1 || e.key === CONFIG.settings.shortcut2)) {
            e.preventDefault();
            _removeToast(toast);
        }

        // ESC key to close any toast
        if (e.key === CONFIG.settings.shortcut3) {
            _removeToast(toast);
        }
    }

    function _clickListener(e) {
        if (e.target.matches(CONFIG.selectors.toastClose)) {
            const toast = e.target.closest(CONFIG.selectors.toast);
            if (toast) {
                _removeToast(toast);
            }
        }
    }

    function _clearEventDelegation() {
        if (!_toastContainer) return;

        try {
            _toastContainer.removeEventListener('keydown', _keydownListener);
            _toastContainer.removeEventListener('click', _clickListener);
        } catch (error) {
            return;
        }
    }

    /**
     * Creates and shows a toast notification
     * @param {string} message - The message to display
     * @param {string} ['info'] type - Toast type: 'success', 'warning', 'error', 'info'
     * @param {number} [5000] duration - Duration in milliseconds (optional)
     * @returns {object} toast - The created toast message element
     */
    function show(message, type = CONFIG.types.info, duration = CONFIG.settings.defaultDuration) {
        if (!_toastContainer) {
            LOG.warn('Cannot show toast - system not initialized');
            return null;
        }

        if (!message || typeof message !== 'string') {
            LOG.warn('Invalid message provided');
            return null;
        }

        const validatedToastType = CONFIG.types[type] || CONFIG.types.info; // Default is info

        LOG.debug(`Showing ${type} toast: "${message.substring(0, CONFIG.settings.maxDebugLength)}..."`);

        // Create toast element with enhanced accessibility
        const toast = document.createElement('div');
        toast.classList.add(CONFIG.classes.toast, CONFIG.classes.toastType(validatedToastType));

        // Enhanced ARIA attributes
        toast.setAttribute('role', validatedToastType === CONFIG.types.error ? 'alert' : 'status');
        toast.setAttribute('aria-live', validatedToastType === CONFIG.types.error ? 'assertive' : 'polite');
        toast.setAttribute('aria-atomic', 'true');
        toast.setAttribute('aria-relevant', 'additions text');

        toast.innerHTML = CONFIG.templates.messageBody();

        toast.querySelector(CONFIG.selectors.toastContent).innerText = message;

        // Add to container at the top for proper reading order
        _toastContainer.insertBefore(toast, _toastContainer.firstChild);

        // Make close button focusable for keyboard users
        const closeButton = toast.querySelector(CONFIG.selectors.toastClose);
        closeButton.setAttribute('tabindex', '0');

        // Focus management for important error toasts
        if (validatedToastType === CONFIG.types.error) {
            // Make the toast focusable programmatically (but not via tab) and focus it
            toast.setAttribute('tabindex', CONFIG.constants.TABINDEX_NOT_FOCUSABLE);
            toast.focus();

            // Remember this toast as one where we restore the focus
            _errorToastsActive.add(toast);

            // Return focus when toast is closed and no other error toast is active
            if (_previousActiveElement === null) {
                _previousActiveElement = document.activeElement;
            }

        }

        // Store reference
        _activeToasts.add(toast);

        // Enforce maximum toasts
        if (_activeToasts.size > CONFIG.settings.maxToasts) {
            const oldestToast = Array.from(_activeToasts)[0];
            _removeToast(oldestToast);
        }

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add(CONFIG.classes.toastVisible);
        });

        // Auto-remove if duration is provided and positive
        if (duration > 0) {
            setTimeout(() => {
                if (_activeToasts.has(toast)) {
                    _removeToast(toast);
                }
            }, duration);
        }

        return toast || null;
    }

    /**
     * Removes a toast with animation
     * @param {HTMLElement} toast - The toast element to remove
     */
    function _removeToast(toast) {
        if (!toast || !_activeToasts.has(toast)) {
            return;
        }

        LOG.debug('Removing toast');

        toast.classList.remove(CONFIG.classes.toastVisible);

        // Wait for animation to complete before removing
        setTimeout(() => {
            if (toast.parentNode) {
                // Remove the toast element itself
                toast.remove();

                // If the toast is the last error toast
                if (_errorToastsActive.has(toast)) {
                    _errorToastsActive.delete(toast);
                    // Restore focus if this was a focused error toast
                    if (_errorToastsActive.size === 0 &&
                        _previousActiveElement &&
                        _previousActiveElement.isConnected &&
                        typeof _previousActiveElement.focus === 'function') {
                        // Refocus to the element that was focused before the first error toast
                        _previousActiveElement.focus();
                        // Reset to null
                        _previousActiveElement = null;
                    }
                }
            }
            _activeToasts.delete(toast);
        }, CONFIG.settings.animationTimeout); // Match CSS transition duration
    }

    /**
     * Removes all currently visible toast messages from the DOM.
     * @returns {boolean} success - Returns true if successful
     */
    function clearAll() {
        if (!_isInitialized) {
            LOG.warn('Module not initialized, skipping clearAll');
            return false;
        }
        LOG.debug(`Clearing ${_activeToasts.size} active toasts`);
        try {
            _activeToasts.forEach(toast => {
                _removeToast(toast);
            });
        } catch (error) {
            LOG.error('Failed to clear all active toasts', error);
            return false;
        }
        return true;
    }

    /**
     * This function executes logic after the module is fully defined.
     * It must be called as the absolute last step.
     */
    function _loaded() {
        _initEventSystem();
        _dispatchModuleEvent(CONFIG.constants.events.loaded, { version: CONFIG.constants.version });
    }

    /**
     * Initializes the toast system
     * @returns {boolean} success - Returns true on successful initialization
     */
    function init() {
        if (_isInitialized) {
            LOG.warn('Already initialized, skipping init');
            return true;
        }
        LOG.debug('Starting initialization');

        try {
            _toastContainer = document.querySelector(CONFIG.selectors.toastContainer);

            if (!_toastContainer) {
                LOG.error('Toast container not found in DOM');
                return false;
            }

            // Set up event delegation once
            _initEventDelegation();

            _previousActiveElement = null;
            _isInitialized = true;
        } catch (error) {
            LOG.error('failed to initialize.', error);
            return false;
        }

        LOG.info('Initialized successfully');
        return true;
    }

    /**
     * Completely destroys the toast system and cleans up resources
     * - Removes all active toasts from DOM
     * - Clears all event listeners
     * - Resets internal state
     * - Removes Toast object from window
     * @returns {boolean} success - Returns true on successful destruction
     */
    function destroy() {
        if (!_isInitialized && !_global[CONFIG.constants.moduleName]) {
            LOG.debug('Module not initialized, nothing to destroy');
            return true;
        }
        LOG.debug('Destroying toast system');

        try {
            // Clear all active toasts
            clearAll();

            // Remove all event listeners from container
            if (_toastContainer) {
                const newContainer = _toastContainer.cloneNode(false);
                _toastContainer.parentNode.replaceChild(newContainer, _toastContainer);
                _toastContainer = newContainer;
            }

            _clearEventDelegation();

            // Clear references
            _activeToasts.clear();
            _errorToastsActive.clear();
            _isInitialized = false;
            _previousActiveElement = null;
            _toastContainer = null;
            _eventTarget = null;

            // Remove public API
            delete _global[CONFIG.constants.moduleName];
        } catch (error) {
            LOG.error('Destroy failed', error);
            return false;
        }

        LOG.info('Destroyed completely');
        return true;
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
    // Public API
    // ========================================================================

    _global[CONFIG.constants.moduleName] = {
        init: init,
        show: show,
        clearAll: clearAll,
        TYPES: CONFIG.types,
        EVENTS: CONFIG.constants.events,
        destroy: destroy,
        addEventListener: addEventListener,
        removeEventListener: removeEventListener,
        isInitialized: () => _isInitialized,
        // Debug functions (only when debugMode active)
        _debug: !_global.BUILD_INFO?.debugMode ? undefined : {
            CONFIG: CONFIG,
            removeToast: (toast) => _removeToast(toast),
            activeToasts: () => Array.from(_activeToasts),
            eventTarget: () => _eventTarget,
            toastContainer: () => _toastContainer
        }
    };

    _loaded();

    LOG.info('Module loaded and exposed:', _global[CONFIG.constants.moduleName]);
})(self);
