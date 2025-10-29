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

(function() {
    'use strict';

    const MODULE = 'TOAST';


    // Check dependencies
    if (typeof window.LOG === 'undefined') {
        console.error(`${MODULE}: LOG object not available. Toast notification system disabled.`);
        return;
    }

    LOG.debug(MODULE, 'Toast System: Initializing');

    /**
     * Global configuration object for toast system
     * @namespace CONFIG
     */
    const CONFIG = {
        // Visual display duration in milliseconds
        defaultDuration: 5000,
        // Animation timing for CSS transitions
        animationTimeout: 300,
        // Maximum number of simultaneous toasts
        maxToasts: 3,
        // Supported notification types
        types: {
            success: 'success',
            warning: 'warning',
            error: 'error',
            info: 'info'
        }
    };

    // Add CSS classes used by toast message system
    CONFIG.classes = {
        toast: 'toast',
        toastVisible: 'toast--visible',
        toastContent: 'toast__content',
        toastClose: 'toast__close',
        toastType: (type) => {
            return 'toast--' + ( CONFIG.types[type] || CONFIG.types.error ); // default is error because this should not happen
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
        messageBody: (message) => {
            const escapedMessage = escapeHtml(message);
            const escapedAriaLabel = escapeHtml(CONFIG.i18n.de.close);
            return `
            <span class="${CONFIG.classes.toastIcon}"></span>
            <span class="${CONFIG.classes.toastContent}">${escapedMessage}</span>
            <button class="${CONFIG.classes.toastClose}" aria-label="${escapedAriaLabel}"></button>
            `;
        }
    }

    // Private variables
    let _toastContainer = null;
    let _activeToasts = new Set();
    let _isInitialized = false;
    // let _eventListeners = new Map();

    /**
     * Initializes the toast system
     * @returns {boolean} success - Returns true on successful initialization
     */
    function init() {
        LOG.debug(MODULE, 'Toast System: Starting initialization');

        _toastContainer = document.querySelector(CONFIG.selectors.toastContainer);

        if (!_toastContainer) {
            LOG.error(MODULE, 'Toast System: Toast container not found in DOM');
            return false;
        }

        // Set up event delegation once
        initEventDelegation();

        _isInitialized = true;

        LOG.info(MODULE, 'Toast System: Initialized successfully');
        return true;
    }

    /**
     * Sets up global event delegation for keyboard interactions
     */
    function initEventDelegation() {
        if (!_toastContainer) return;

        // Single event listener for all toasts
        _toastContainer.addEventListener('keydown', (e) => {
            const toast = e.target.closest(CONFIG.selectors.toast);
            if (!toast) return;

            // Close button keyboard activation
            if (e.target.matches(CONFIG.selectors.toastClose) &&
                (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                removeToast(toast);
            }

            // ESC key to close any toast
            if (e.key === 'Escape') {
                removeToast(toast);
            }
        });

        // Click delegation for close buttons
        _toastContainer.addEventListener('click', (e) => {
            if (e.target.matches(CONFIG.selectors.toastClose)) {
                const toast = e.target.closest(CONFIG.selectors.toast);
                if (toast) {
                    removeToast(toast);
                }
            }
        });
    }

    /**
     * Creates and shows a toast notification
     * @param {string} message - The message to display
     * @param {string} type - Toast type: 'success', 'warning', 'error', 'info'
     * @param {number} duration - Duration in milliseconds (optional)
     * @returns {object} toast - The created toast message element
     */
    function show(message, type = 'info', duration = CONFIG.defaultDuration) {
        if (!_toastContainer) {
            LOG.warn(MODULE, 'Toast System: Cannot show toast - system not initialized');
            return null;
        }

        if (!message || typeof message !== 'string') {
            LOG.warn(MODULE, 'Toast System: Invalid message provided');
            return null;
        }

        const validatedToastType = CONFIG.types[type] || CONFIG.types.info; // default is info

        LOG.debug(MODULE, `Toast System: Showing ${type} toast: "${message.substring(0, 50)}..."`);

        // Create toast element with enhanced accessibility
        const toast = document.createElement('div');
        toast.classList.add(CONFIG.classes.toast, CONFIG.classes.toastType(validatedToastType));

        // Enhanced ARIA attributes
        toast.setAttribute('role', validatedToastType === CONFIG.types.error ? 'alert' : 'status');
        toast.setAttribute('aria-live', validatedToastType === CONFIG.types.error ? 'assertive' : 'polite');
        toast.setAttribute('aria-atomic', 'true');
        toast.setAttribute('aria-relevant', 'additions text');

        toast.innerHTML = CONFIG.templates.messageBody(message)

        // Add to container at the top for proper reading order
        _toastContainer.insertBefore(toast, _toastContainer.firstChild);

        // Focus management for important toasts
        if (validatedToastType === CONFIG.types.error) {
            toast.setAttribute('tabindex', '0');
            toast.focus();

            // Return focus when toast is closed
            toast._previousActiveElement = document.activeElement;
        }

        // Store reference
        _activeToasts.add(toast);

        // Enforce maximum toasts
        if (_activeToasts.size > CONFIG.maxToasts) {
            const oldestToast = Array.from(_activeToasts)[0];
            removeToast(oldestToast);
        }

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add(CONFIG.classes.toastVisible);
        });

        /** code not required anylonger
        // Set up close button
        const closeButton = toast.querySelector(CONFIG.selectors.toastClose);
        const closeClickCallback = () => {
            removeToast(toast);
        };

        // Delete or Backspace key to close toast
        const closeKeydownCallback = (e) => {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                removeToast(toast);
            }
        };

        // Define event listeners
        const listeners = [
            {target: closeButton, type: 'click', callback: closeClickCallback},
            {target: toast, type: 'keydown', callback: closeKeydownCallback}
        ];

        // Subscribe to each listener
        listeners.forEach(listener => {
            if (listener && listener.target && listener.type && listener.callback) {
                // Remove the listener
                listener.target.addEventListener(listener.type, listener.callback);
            }
        });

        // Store references for cleanup
        _eventListeners.set(toast, listeners);
        **/

        // Auto-remove if duration is provided and positive
        if (duration > 0) {
            setTimeout(() => {
                if (_activeToasts.has(toast)) {
                    removeToast(toast);
                }
            }, duration);
        }

        return toast;
    }

    /**
     * Removes a toast with animation
     * @param {HTMLElement} toast - The toast element to remove
     */
    function removeToast(toast) {
        if (!toast || !_activeToasts.has(toast)) {
            return;
        }

        LOG.debug(MODULE, 'Toast System: Removing toast');

        toast.classList.remove(CONFIG.classes.toastVisible);

        // Wait for animation to complete before removing
        setTimeout(() => {
            if (toast.parentNode) {
                /** Code not required anylonger
                // Remove event listener to prevent memory leak
                // Clean up event listeners
                const listeners = _eventListeners.get(toast);
                listeners.forEach(listener => {
                    if (listener && listener.target && listener.type && listener.callback) {
                        // Remove the listener
                        listener.target.removeEventListener(listener.type, listener.callback);
                    }
                });
                _eventListeners.delete(toast);
                **/
                // Remove the element itself from its parent
                toast.parentNode.removeChild(toast);

                // Restore focus if this was a focused error toast
                if (toast._previousActiveElement &&
                    typeof toast._previousActiveElement.focus === 'function') {
                    toast._previousActiveElement.focus();
                }
            }
            _activeToasts.delete(toast);
        }, CONFIG.animationTimeout); // Match CSS transition duration
    }

    /**
     * Escapes HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Clears all active toasts
     */
    function clearAll() {
        LOG.debug(MODULE, `Toast System: Clearing ${_activeToasts.size} active toasts`);

        _activeToasts.forEach(toast => {
            removeToast(toast);
        });
    }

    /**
     * Completely destroys the toast system and cleans up resources
     * - Removes all active toasts from DOM
     * - Clears all event listeners
     * - Resets internal state
     * - Removes Toast object from window
     */
    function destroy() {
        LOG.debug(MODULE, 'Toast System: Destroying toast system');

        // Clear all active toasts
        clearAll();

        // Remove all event listeners from container
        if (_toastContainer) {
            const newContainer = _toastContainer.cloneNode(false);
            _toastContainer.parentNode.replaceChild(newContainer, _toastContainer);
            _toastContainer = newContainer;
        }

        // Clear references
        _activeToasts.clear();
        _toastContainer = null;

        // Remove public API
        delete window.Toast;

        LOG.info(MODULE, 'Toast System: Destroyed completely');
    }

    // ========================================================================
    // Public API
    // ========================================================================

    window.Toast = {
        init: init,
        show: show,
        clearAll: clearAll,
        TYPES: CONFIG.types,
        destroy: destroy,
        isInitialized: () => _isInitialized,
        _debug: {
            CONFIG: CONFIG,
            removeToast: removeToast,
            activeToasts: () => _activeToasts,
            toastContainer: () => _toastContainer,
            // eventListeners: () => _eventListeners
        }
    };

    LOG.info(MODULE, 'Toast System: Module loaded and ready');
})();
