// ============================================================================
// SCRIPT-DOM-UTILS.JS - Version 1.0.0
// DOM Utility Functions for Robust Selector Generation
//
// Features:
// - Unique relative selector generation with multiple strategies
// - Volatile class filtering for dynamic UI elements
// - Selector validation and uniqueness testing
// - Fallback selector generation for edge cases
// - CSS.escape integration for safe selector strings
//
// @version 1.0.0
// @license MIT
// ============================================================================

(function(scope) {
    'use strict';

    const MODULE = 'DOM_UTILS';
    const _global = scope;

    // ========================================================================
    // CHECK DEPENDENCIES
    // ========================================================================

    if (typeof _global.LOG === 'undefined') {
        console.error(`${MODULE}: LOG object not available. DOM utilities system disabled.`);
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
    // SELECTOR GENERATION FUNCTIONS
    // ========================================================================

    /**
     * List of class patterns that should be excluded from selector generation
     * These are typically dynamic/volatile classes that change state
     * @private
     */
    const CONFIG = {
        constants: {
            moduleName: 'DOMUtils',
            version: '1.0.0',
            VOLATILE_CLASS_PATTERNS : [
                'hover', 'focus', 'active', 'selected', 'highlight',
                'subsection-element-', 'glossary-term' // Add any other dynamic patterns
            ]
        },

        settings: {
            defaultMaxDepth: 20,
            simpleMaxDepth: 10,
            defaultParent: document.body
        },

        classes: {
            // No CSS-classes in this modul
        },

        selectors: {
            // No DOM-selectors in this module
        },

        i18n: {
            de: {
                // No user directed messages in this module
            }
        }
    };

    /**
     * Translates a key using the current document language
     * @param {string} key - The translation key
     * @returns {string} The translated string or the key if not found
     */
    function _t(key) {
        const lang = document.documentElement.lang || 'de';
        return CONFIG.i18n[lang]?.[key] || key;
    }

    /**
     * Filters out volatile classes that shouldn't be used in permanent selectors
     * @private
     * @param {Array} classList - List of classes to be filtered
     * @returns {Array} filteredClassList - Returns the classList without volatile classes
     */
    function _filterVolatileClasses(classList) {
        return classList.filter(className => {
            return !CONFIG.constants.VOLATILE_CLASS_PATTERNS.some(pattern =>
            className.includes(pattern)
            );
        });
    }

    /**
     * Generates a unique CSS selector path for an element relative to a parent.
     * This function creates robust selectors that should survive minor DOM changes.
     *
     * @param {Element} element - The target element to generate selector for
     * @param {Element} [parent=document.body] - The parent element to scope the selector (default: body)
     * @param {number} [maxDepth] - Maximum traversal depth to prevent infinite loops
     * @returns {string|null} CSS selector string or null if invalid input
     */
    function getUniqueRelativeSelector(element, parent = CONFIG.settings.defaultParent, maxDepth = CONFIG.settings.defaultMaxDepth) {
        // Validate input parameters
        if (!element || !element.nodeType || element.nodeType !== Node.ELEMENT_NODE) {
            LOG.warn('Invalid element provided to getUniqueRelativeSelector');
            return null;
        }

        if (!parent || !parent.contains) {
            LOG.warn('Invalid parent provided to getUniqueRelativeSelector');
            return null;
        }

        // Check if element is contained within parent
        if (!parent.contains(element)) {
            LOG.warn('Element is not contained within the specified parent');
            return null;
        }

        // Special case: if element is the parent itself
        if (element === parent) {
            return '';
        }

        try {
            const path = [];
            let current = element;
            let depth = 0;

            // Traverse up the DOM tree until we reach the parent or exceed max depth
            while (current && current !== parent && depth < maxDepth) {
                let selector = current.tagName.toLowerCase();

                // Strategy 1: Use ID if available (most unique identifier)
                if (current.id) {
                    selector = `#${CSS.escape(current.id)}`;
                    path.unshift(selector);
                    break; // ID should be unique globally, so we can stop here
                }

                // Strategy 2: Try to use unique class combination among siblings
                const classList = Array.from(current.classList).filter(cls => cls.length > 0);
                const stableClassList = _filterVolatileClasses(classList);

                if (stableClassList.length > 0) {
                    const uniqueClassSelector = '.' + stableClassList.map(cls => CSS.escape(cls)).join('.');

                    // Check if this class combination is unique among direct siblings
                    if (current.parentElement) {
                        const siblingElementsWithSameClass = current.parentElement.querySelectorAll(
                            `:scope > ${uniqueClassSelector}`
                        );

                        if (siblingElementsWithSameClass.length === 1) {
                            selector = uniqueClassSelector;
                        }
                    }
                }

                // Strategy 3: Use :nth-of-type for precise positioning
                if (selector === current.tagName.toLowerCase() || selector.startsWith('.')) {
                    if (current.parentElement) {
                        const matchingSiblings = current.parentElement.querySelectorAll(`:scope > ${selector}`);

                        if (matchingSiblings.length > 1) {
                            // Find the index of current element among matching siblings
                            let index = -1;
                            for (let i = 0; i < matchingSiblings.length; i++) {
                                if (matchingSiblings[i] === current) {
                                    index = i + 1;
                                    break;
                                }
                            }

                            if (index > 0) {
                                selector += `:nth-of-type(${index})`;
                            }
                        }
                    }
                }

                path.unshift(selector);
                current = current.parentElement;
                depth++;
            }

            // Safety check: if we hit max depth, the selector might be unreliable
            if (depth >= maxDepth) {
                LOG.warn('Maximum depth reached while generating selector');
            }

            return path.join(' > ');
        } catch (error) {
            LOG.error('Error generation selector:', error);
            return null;
        }
    }

    /**
     * Simple fallback selector generator for when the robust method fails
     * Generates a basic selector path without uniqueness guarantees
     * @public
     * @param {Element} element - Element to idetify
     * @param {number} [maxDepth] - Maximum depth to crawl
     * @returns {string} unique selector for the element
     */
    function generateSimpleSelector(element, maxDepth = CONFIG.settings.simpleMaxDepth) {
        if (!element || !element.tagName) return '';

        try {
            const path = [];
            let current = element;
            let depth = 0;

            while (current && current.nodeType === Node.ELEMENT_NODE && depth < maxDepth) {
                let selector = current.tagName.toLowerCase();

                // Add ID if available
                if (current.id) {
                    selector += `#${CSS.escape(current.id)}`;
                }
                // Otherwise add first class if available
                else if (current.className && typeof current.className === 'string') {
                    const firstClass = current.className.split(' ')[0];
                    if (firstClass) {
                        selector += `.${CSS.escape(firstClass)}`;
                    }
                }

                path.unshift(selector);

                // Stop at body element
                if (current.tagName.toLowerCase() === 'body') break;

                current = current.parentElement;
                depth++;
            }

            return path.join(' > ');
        } catch (error) {
            LOG.error('Error generating simple selector:', error);
            return ''; // consistent return type: string
        }
    }

    /**
     * Tests if a selector uniquely identifies the target element.
     * Useful for validating generated selectors before storing them
     * @param {string} selector - CSS selector to validate
     * @param {Element} targetElement - Element that should be uniquely identified
     * @returns {boolean} True if selector uniquely identifies the element
     */
    function validateSelectorUnique(selector, targetElement) {
        if (!selector || !targetElement) return false;

        try {
            const elements = document.querySelectorAll(selector);
            return elements.length === 1 && elements[0] === targetElement;
        } catch (error) {
            LOG.error('Error validating selector:', error);
            return false;
        }
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    _global[CONFIG.constants.moduleName] = {
        getUniqueRelativeSelector: getUniqueRelativeSelector,
        generateSimpleSelector: generateSimpleSelector,
        validateSelectorUnique: validateSelectorUnique,

        // Debug functions (only when debugMode active)
        _debug: !_global.BUILD_INFO?.debugMode ? undefined : {
            CONFIG: CONFIG,
            filterVolatileClasses: (classList) => _filterVolatileClasses(classList)
        }
    };

    LOG.info('Mdule loaded and exposed:', _global[CONFIG.constants.moduleName]);

    // Auto-initialize if in browser environment
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            LOG.info('DOM utilities initialized');
        });
    } else {
        LOG.info('DOM utilities initialized');
    }

})(self);
