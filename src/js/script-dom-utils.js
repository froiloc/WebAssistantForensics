// ============================================================================
// SCRIPT-DOM-UTILS.JS - DOM utility functions
// ============================================================================

(function() {
    'use strict';

    const MODULE = 'DOM_UTILS';

    // ========================================================================
    // SELECTOR GENERATION FUNCTIONS
    // ========================================================================

    /**
     * List of class patterns that should be excluded from selector generation
     * These are typically dynamic/volatile classes that change state
     */
    const VOLATILE_CLASS_PATTERNS = [
        'hover', 'focus', 'active', 'selected', 'highlight',
        'subsection-element-', 'glossary-term' // Add any other dynamic patterns
    ];

    /**
     * Filters out volatile classes that shouldn't be used in permanent selectors
     */
    function filterVolatileClasses(classList) {
        return classList.filter(className => {
            return !VOLATILE_CLASS_PATTERNS.some(pattern =>
            className.includes(pattern)
            );
        });
    }

    /**
     * Generates a unique CSS selector path for an element relative to a parent.
     * This function creates robust selectors that should survive minor DOM changes.
     *
     * @param {Element} element - The target element to generate selector for
     * @param {Element} parent - The parent element to scope the selector (default: body)
     * @param {number} maxDepth - Maximum traversal depth to prevent infinite loops
     * @returns {string|null} CSS selector string or null if invalid input
     */
    function getUniqueRelativeSelector(element, parent = document.body, maxDepth = 20) {
        // Validate input parameters
        if (!element || !element.nodeType || element.nodeType !== Node.ELEMENT_NODE) {
            LOG.warn(MODULE, 'Invalid element provided to getUniqueRelativeSelector');
            return null;
        }

        if (!parent || !parent.contains) {
            LOG.warn(MODULE, 'Invalid parent provided to getUniqueRelativeSelector');
            return null;
        }

        // Check if element is contained within parent
        if (!parent.contains(element)) {
            LOG.warn(MODULE, 'Element is not contained within the specified parent');
            return null;
        }

        // Special case: if element is the parent itself
        if (element === parent) {
            return '';
        }

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
            const stableClassList = filterVolatileClasses(classList);

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
            LOG.warn(MODULE, 'Maximum depth reached while generating selector');
        }

        return path.join(' > ');
    }

    /**
     * Simple fallback selector generator for when the robust method fails
     * Generates a basic selector path without uniqueness guarantees
     */
    function generateSimpleSelector(element, maxDepth = 10) {
        if (!element || !element.tagName) return '';

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
    }

    /**
     * Tests if a selector uniquely identifies the target element
     * Useful for validating generated selectors before storing them
     */
    function validateSelectorUnique(selector, targetElement) {
        if (!selector || !targetElement) return false;

        try {
            const elements = document.querySelectorAll(selector);
            return elements.length === 1 && elements[0] === targetElement;
        } catch (error) {
            LOG.error(MODULE, 'Error validating selector:', error);
            return false;
        }
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.DOMUtils = {
        getUniqueRelativeSelector: getUniqueRelativeSelector,
        generateSimpleSelector: generateSimpleSelector,
        validateSelectorUnique: validateSelectorUnique
    };

    LOG.debug(MODULE, 'DOM utilities module loaded');

    // Auto-initialize if in browser environment
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            LOG.info(MODULE, 'DOM utilities initialized');
        });
    } else {
        LOG.info(MODULE, 'DOM utilities initialized');
    }

})();
