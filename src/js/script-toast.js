/**
 * Toast Notification System
 * Provides accessible, theme-aware notifications across the application
 * @version 1.0.0
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

    // Configuration
    const CONFIG = {
        defaultDuration: 5000,
        maxToasts: 3,
        types: {
            success: { icon: '✓', class: 'toast--success' },
            warning: { icon: '⚠', class: 'toast--warning' },
            error: { icon: '✗', class: 'toast--error' },
            info: { icon: 'ℹ', class: 'toast--info' }
        }
    };

    // Private variables
    let _toastContainer = null;
    let _activeToasts = new Set();

    /**
     * Initializes the toast system
     */
    function init() {
        LOG.debug(MODULE, 'Toast System: Starting initialization');

        _toastContainer = document.getElementById('toast-container');

        if (!_toastContainer) {
            LOG.error(MODULE, 'Toast System: Toast container not found in DOM');
            return false;
        }

        LOG.success(MODULE, 'Toast System: Initialized successfully');
        return true;
    }

    /**
     * Creates and shows a toast notification
     * @param {string} message - The message to display
     * @param {string} type - Toast type: 'success', 'warning', 'error', 'info'
     * @param {number} duration - Duration in milliseconds (optional)
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

        const toastType = CONFIG.types[type] || CONFIG.types.info;

        LOG.debug(MODULE, `Toast System: Showing ${type} toast: "${message.substring(0, 50)}..."`);

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${toastType.class}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');

        // Build toast content using only CSS classes - no inline styles
        toast.innerHTML = `
        <span class="toast__icon" aria-hidden="true">${toastType.icon}</span>
        <span class="toast__content">${escapeHtml(message)}</span>
        <button class="toast__close" aria-label="Notification schließen">×</button>
        `;

        // Add to container
        _toastContainer.appendChild(toast);

        // Store reference
        _activeToasts.add(toast);

        // Enforce maximum toasts
        if (_activeToasts.size > CONFIG.maxToasts) {
            const oldestToast = Array.from(_activeToasts)[0];
            removeToast(oldestToast);
        }

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.add('toast--visible');
        });

        // Set up close button
        const closeButton = toast.querySelector('.toast__close');
        closeButton.addEventListener('click', () => {
            removeToast(toast);
        });

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

        toast.classList.remove('toast--visible');

        // Wait for animation to complete before removing
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            _activeToasts.delete(toast);
        }, 300); // Match CSS transition duration
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

    // ========================================================================
    // Public API
    // ========================================================================

    window.Toast = {
        init,
        show,
        clearAll
    };

    LOG.success(MODULE, 'Toast System: Module loaded and ready');
})();
