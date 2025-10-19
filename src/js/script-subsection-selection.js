// ============================================================================
// SCRIPT-SUBSECTION-SELECTION.JS - Visual selection mode for subsection favorites
// ============================================================================

(function() {
    'use strict';

    const MODULE = 'SUBSECTION_SELECTION';

    // Private state
    let _isInitialized = false;
    let _isSelectionModeActive = false;
    let _currentSectionId = null;
    let _selectionCallback = null;
    let _overlayElement = null;
    let _instructionsElement = null;

    // Configuration
    const CONFIG = {
        classes: {
            selectionOverlay: 'subsection-selection-overlay',
            selectionActive: 'subsection-selection--active',
            instructions: 'subsection-selection-instructions',
            elementHighlight: 'subsection-element-highlight',
            elementHover: 'subsection-element-hover'
        },
        selectors: {
            mainContent: 'main',
            clickableElements: 'main *', // All elements within main
            sections: 'main section[data-section]'
        },
        i18n: {
            de: {
                selectionInstructions: 'Klicken Sie auf ein Element, um ein präzises Lesezeichen zu setzen',
                selectionCancel: 'Auswahlmodus abbrechen (ESC)',
                elementSelected: 'Element ausgewählt',
                selectionComplete: 'Präzises Lesezeichen erstellt',
                selectionCancelled: 'Auswahlmodus abgebrochen',
                errorNoElement: 'Kein Element ausgewählt',
                errorInvalidSelection: 'Ungültige Auswahl',
                p: 'Absatz',
                div: 'Bereich',
                span: 'Text',
                li: 'Listenpunkt',
                td: 'Tabellenzelle',
                th: 'Tabellenkopf',
                pre: 'Code',
                code: 'Codeausschnitt',
                blockquote: 'Zitat',
                element: 'Element'
            }
        }
    };

    // ========================================================================
    // SELECTION MODE MANAGEMENT
    // ========================================================================

    /**
     * Enter subsection selection mode
     * @param {string} sectionId - The parent section ID
     * @param {Function} callback - Called when selection completes or cancels
     */
    function enterSelectionMode(sectionId, callback) {
        if (_isSelectionModeActive) {
            LOG.warn(MODULE, 'Selection mode already active');
            return;
        }

        LOG.debug(MODULE, `Entering selection mode for section: ${sectionId}`);

        _isSelectionModeActive = true;
        _currentSectionId = sectionId;
        _selectionCallback = callback;

        // Create and show overlay
        createSelectionOverlay();

        // Add event listeners
        addSelectionEventListeners();

        // Update UI state - blur only the chrome elements
        document.body.classList.add(CONFIG.classes.selectionActive);

        LOG.success(MODULE, 'Selection mode activated');
    }

    /**
     * Exit subsection selection mode
     * @param {boolean} success - Whether selection was successful
     * @param {Object} selectedData - Data about the selected element
     */
    function exitSelectionMode(success = false, selectedData = null) {
        if (!_isSelectionModeActive) {
            return;
        }

        LOG.debug(MODULE, `Exiting selection mode: ${success ? 'success' : 'cancelled'}`);

        // Remove overlay and event listeners
        removeSelectionOverlay();
        removeSelectionEventListeners();

        // Reset UI state - remove blur from chrome elements
        document.body.classList.remove(CONFIG.classes.selectionActive);

        // Call callback with result
        if (_selectionCallback) {
            _selectionCallback(success, selectedData);
        }

        // Reset state
        _isSelectionModeActive = false;
        _currentSectionId = null;
        _selectionCallback = null;

        LOG.success(MODULE, 'Selection mode deactivated');
    }

    // ========================================================================
    // OVERLAY AND VISUAL FEEDBACK
    // ========================================================================

    /**
     * Create the selection mode overlay
     */
    function createSelectionOverlay() {
        // Create overlay element
        _overlayElement = document.createElement('div');
        _overlayElement.className = CONFIG.classes.selectionOverlay;

        // Create instructions element
        _instructionsElement = document.createElement('div');
        _instructionsElement.className = CONFIG.classes.instructions;
        _instructionsElement.innerHTML = `
            <div class="instructions-content">
                <p>${CONFIG.i18n.de.selectionInstructions}</p>
                <p class="instructions-hint">${CONFIG.i18n.de.selectionCancel}</p>
            </div>
        `;

        _overlayElement.appendChild(_instructionsElement);
        document.body.appendChild(_overlayElement);

        LOG.debug(MODULE, 'Selection overlay created');
    }

    /**
     * Remove the selection mode overlay
     */
    function removeSelectionOverlay() {
        if (_overlayElement) {
            _overlayElement.remove();
            _overlayElement = null;
            _instructionsElement = null;
        }

        // Remove any lingering highlights
        document.querySelectorAll(`.${CONFIG.classes.elementHighlight}`).forEach(el => {
            el.classList.remove(CONFIG.classes.elementHighlight);
        });

        LOG.debug(MODULE, 'Selection overlay removed');
    }

    /**
     * Highlight an element on hover
     */
    function highlightElement(element) {
        if (!element || !_isSelectionModeActive) return;

        // Remove previous highlights
        document.querySelectorAll(`.${CONFIG.classes.elementHover}`).forEach(el => {
            el.classList.remove(CONFIG.classes.elementHover);
        });

        // Add highlight to current element
        element.classList.add(CONFIG.classes.elementHover);

        LOG.debug(MODULE, 'Element highlighted', element);
    }

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    /**
     * Add event listeners for selection mode
     */
    function addSelectionEventListeners() {
        // Click handler for element selection
        document.addEventListener('click', handleElementClick, true);

        // Hover handler for visual feedback
        document.addEventListener('mouseover', handleElementHover, true);

        // Escape key to cancel
        document.addEventListener('keydown', handleKeyDown);

        LOG.debug(MODULE, 'Selection event listeners added');
    }

    /**
     * Remove event listeners for selection mode
     */
    function removeSelectionEventListeners() {
        document.removeEventListener('click', handleElementClick, true);
        document.removeEventListener('mouseover', handleElementHover, true);
        document.removeEventListener('keydown', handleKeyDown);

        LOG.debug(MODULE, 'Selection event listeners removed');
    }

    /**
     * Handle element click during selection mode
     */
    function handleElementClick(event) {
        if (!_isSelectionModeActive) return;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        const clickedElement = event.target;
        LOG.debug(MODULE, 'Element clicked in selection mode', clickedElement);

        // Validate the selection
        if (isValidSelection(clickedElement)) {
            processElementSelection(clickedElement);
        } else {
            LOG.warn(MODULE, 'Invalid element selected');
            Toast.show(CONFIG.i18n.de.errorInvalidSelection, 'warning');
        }
    }

    /**
     * Handle element hover during selection mode
     */
    function handleElementHover(event) {
        if (!_isSelectionModeActive) return;

        const hoveredElement = event.target;
        highlightElement(hoveredElement);
    }

    /**
     * Handle keyboard events during selection mode
     */
    function handleKeyDown(event) {
        if (!_isSelectionModeActive) return;

        if (event.key === 'Escape') {
            LOG.debug(MODULE, 'Selection cancelled via ESC key');
            Toast.show(CONFIG.i18n.de.selectionCancelled, 'info');
            exitSelectionMode(false);
        }
    }

    // ========================================================================
    // SELECTION PROCESSING
    // ========================================================================

    /**
     * Check if an element is valid for selection
     */
    function isValidSelection(element) {
        if (!element || !element.closest) return false;

        // Must be within main content area
        const mainContent = element.closest(CONFIG.selectors.mainContent);
        if (!mainContent) return false;

        // Cannot select the overlay itself
        if (element.closest(`.${CONFIG.classes.selectionOverlay}`)) return false;

        // Basic element validation
        const tagName = element.tagName.toLowerCase();
        const excludedTags = ['html', 'body', 'script', 'style', 'meta', 'link'];

        return !excludedTags.includes(tagName) &&
               element.textContent &&
               element.textContent.trim().length > 0;
    }

    /**
     * Process a valid element selection
     */
    function processElementSelection(element) {
        LOG.debug(MODULE, 'Processing element selection', element);

        try {
            // Generate selector and name
            const selector = generateElementSelector(element);
            const name = generateElementName(element);

            // Create favorite data
            const favoriteData = {
                element: element,
                selector: selector,
                name: name,
                sectionId: _currentSectionId,
                timestamp: Date.now()
            };

            // Create the subsection favorite
            createSubsectionFavorite(favoriteData);

            // Exit with success
            exitSelectionMode(true, favoriteData);

            Toast.show(CONFIG.i18n.de.selectionComplete, 'success');

        } catch (error) {
            LOG.error(MODULE, 'Error processing element selection:', error);
            Toast.show(CONFIG.i18n.de.errorInvalidSelection, 'error');
            exitSelectionMode(false);
        }
    }

    /**
     * Generate a CSS selector for the element
     */
    function generateElementSelector(element) {
        // Simple implementation - can be enhanced later
        if (element.id) {
            return `#${element.id}`;
        }

        // Fallback: generate path-based selector
        const path = [];
        let current = element;

        while (current && current !== document.body && path.length < 10) {
            let selector = current.tagName.toLowerCase();

            if (current.className) {
                selector += '.' + current.className.split(' ')[0];
            }

            path.unshift(selector);
            current = current.parentElement;
        }

        return path.join(' > ');
    }

    /**
     * Generate a display name for the element
     */
    function generateElementName(element) {
        // Try to get meaningful text from the element
        let name = element.textContent || '';
        name = name.trim().substring(0, 50); // Limit length

        if (!name) {
            // Fallback names based on element type
            const tagName = element.tagName.toLowerCase();
            const typeNames = {
                'p': CONFIG.i18n.de.p,
                'div': CONFIG.i18n.de.div,
                'span': CONFIG.i18n.de.span,
                'li': CONFIG.i18n.de.li,
                'td': CONFIG.i18n.de.td,
                'th': CONFIG.i18n.de.th,
                'pre': CONFIG.i18n.de.pre,
                'code': CONFIG.i18n.de.code,
                'blockquote': CONFIG.i18n.de.blockquote
            };

            name = typeNames[tagName] || CONFIG.i18n.de.element;
        }

        return name;
    }

    /**
     * Create the actual subsection favorite
     */
    function createSubsectionFavorite(favoriteData) {
        // This will be implemented to integrate with the main favorites system
        LOG.debug(MODULE, 'Creating subsection favorite:', favoriteData);

        // TODO: Integrate with FavoritesManager
        // For now, just log the data
        console.log('Subsection favorite data:', favoriteData);
    }

    // ========================================================================
    // INITIALIZATION
    // ========================================================================

    function init() {
        if (_isInitialized) {
            LOG.warn(MODULE, 'Already initialized');
            return;
        }

        LOG.debug(MODULE, 'Initializing subsection selection');
        _isInitialized = true;
        LOG.success(MODULE, 'Subsection selection initialized');
    }

    function destroy() {
        if (_isSelectionModeActive) {
            exitSelectionMode(false);
        }

        _isInitialized = false;
        LOG.success(MODULE, 'Subsection selection destroyed');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.SubsectionSelection = {
        init: init,
        destroy: destroy,
        enterSelectionMode: enterSelectionMode,
        exitSelectionMode: exitSelectionMode,
        isSelectionModeActive: () => _isSelectionModeActive,
        isInitialized: () => _isInitialized
    };

    LOG.debug(MODULE, 'Subsection selection module loaded');

})();
