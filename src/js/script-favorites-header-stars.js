// ============================================================================
// SCRIPT-FAVORITES-HEADER-STARS.JS - Header favorite stars
// ============================================================================

(function() {
    'use strict';

    const MODULE = 'HEADER_STARS';

    // Private state
    let _isInitialized = false;
    let _scrollTimeout = null;
    let _unsubscribeFunctions = [];
    let _headersWithStarListeners = new Set();
    let _headersWithTargetListeners = new Set();

    // Configuration
    const CONFIG = {
        classes: {
            star: 'header-star',
            active: 'header-star--active',
            loading: 'header-star--loading',
            target: 'subsection-target',
            iconsWrapper: 'header-with-icons',
            headerTextContent: 'header-text-content',
            subsectionTargetActive: 'subsection-target--active'
        },
        selectors: {
            mainContent: 'main section[data-section]',
            headers: 'h2, h3, h4, h5, h6',
            star: '.header-star',
            target: '.subsection-target',
            iconsWrapper: '.header-with-icons',
            subsectionTargetActive: '.subsection-target--active'
        },
        favoriteScopes: {
            section: 'section',    // Current: whole section favorites
            subsection: 'subsection' // Future: individual header favorites
        },
        currentScope: 'section', // Start with section-level favorites
        viewportBuffer: 500, // Smaller buffer for headers
        i18n: {
            de: {
                addFavorite: 'Abschnitt als Favorit speichern',
                removeFavorite: 'Favorit entfernen',
                addSubsectionFavorite: 'Präzises Lesezeichen setzen',
                ariaSubsectionButton: (textContent) => `Präzises Lesezeichen für ${textContent} setzen`,
                errorNoSubsection: 'Präzises Lesezeichen-System nicht verfügbar'
            }
        }
    };

    // ========================================================================
    // VIEWPORT MANAGEMENT
    // ========================================================================

    const ViewportManager = {
        getViewportRange() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollBottom = scrollTop + window.innerHeight;

            return {
                top: Math.max(0, scrollTop - CONFIG.viewportBuffer),
                bottom: scrollBottom + CONFIG.viewportBuffer
            };
        },

        isInViewportRange(element, viewportRange) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.pageYOffset;
            const elementBottom = elementTop + rect.height;

            return elementBottom >= viewportRange.top && elementTop <= viewportRange.bottom;
        },

        findHeadersInRange(viewportRange) {
            const headers = document.querySelectorAll(CONFIG.selectors.headers);
            const headersInRange = [];

            headers.forEach(header => {
                if (this.isInViewportRange(header, viewportRange)) {
                    headersInRange.push(header);
                }
            });

            return headersInRange;
        }
    };

    // ========================================================================
    // STAR MANAGEMENT
    // ========================================================================

    /**
    * Add stars and target icons to the first header in each section
    */
    function addIconsToSectionHeaders() {
        const sections = document.querySelectorAll(CONFIG.selectors.mainContent);
        LOG.debug(MODULE, `Processing ${sections.length} sections for header icons`);

        let iconCount = 0;

        sections.forEach(section => {
            const sectionId = section.dataset.section;

            // Find the FIRST header in this section (any level)
            const firstHeader = section.querySelector('h1, h2, h3, h4, h5, h6');

            if (firstHeader && !firstHeader.querySelector(CONFIG.selectors.iconsWrapper)) {
                // Create both icons at once
                createHeaderIcons(firstHeader, sectionId);
                iconCount++;
                LOG.debug(MODULE, `Added icons to header in section: ${sectionId}`);
            } else if (!firstHeader) {
                LOG.warn(MODULE, `Section ${sectionId} has no headers`, section);
            }
        });

        LOG.info(MODULE, `Icons added: ${iconCount} stars and targets`);
    }

    /**
     * Create a wrapper for the icons in the header
     */
    function createHeaderIcons(header, sectionId) {
        // FIRST: Wrap the header text content in a span
        const headerText = document.createElement('span');
        headerText.className = CONFIG.classes.headerTextContent;

        // Move all existing child nodes into the text wrapper
        while (header.firstChild) {
            headerText.appendChild(header.firstChild);
        }

        // Create icons wrapper
        const iconsWrapper = document.createElement('div');
        iconsWrapper.classList.add(CONFIG.classes.iconsWrapper);

        // Add buttons to wrapper
        const starButton = createHeaderStarButton(header, sectionId)
        iconsWrapper.appendChild(starButton);

        const targetButton = createHeaderTargetButton(header, sectionId)
        iconsWrapper.appendChild(targetButton);

        header.appendChild(headerText);
        header.appendChild(iconsWrapper);

        // Initial visual state
        updateHeaderStarState(starButton, sectionId);

        LOG.debug(MODULE, `Created star and target icons for section: ${sectionId}`);
    }

    /**
     * Create and add star button to header
     */
    function createHeaderStarButton(header, sectionId) {
        const starButton = document.createElement('button');
        starButton.className = CONFIG.classes.star;
        starButton.setAttribute('type', 'button');
        starButton.dataset.sectionId = sectionId;

        // Minimal HTML - CSS pseudo-elements will handle visuals
        starButton.setAttribute('aria-label', `${header.textContent} ${CONFIG.i18n.de.addFavorite}`);
        return starButton;
    }

    /**
     * Create and add target button to header
     */
    function createHeaderTargetButton(header, sectionId) {
        const targetButton = document.createElement('button');
        targetButton.className = CONFIG.classes.target;
        targetButton.setAttribute('type', 'button');
        targetButton.dataset.sectionId = sectionId;

        // Minimal HTML - CSS pseudo-elements will handle visuals
        targetButton.setAttribute('aria-label', CONFIG.i18n.de.ariaSubsectionButton(header.textContent));
        return targetButton;
    }

    /**
     * Manage event listeners for both star and target buttons based on viewport
     */
    function manageViewportEventListeners() {
        const viewportRange = ViewportManager.getViewportRange();
        const headersInViewport = ViewportManager.findHeadersInRange(viewportRange);

        LOG.debug(MODULE, `Managing listeners for ${headersInViewport.length} headers in viewport`);

        // Add listeners to headers in viewport
        headersInViewport.forEach(header => {
            // Handle star button
            const star = header.querySelector(CONFIG.selectors.star);
            if (star && !_headersWithStarListeners.has(star)) {
                star.addEventListener('click', handleStarClick);
                _headersWithStarListeners.add(star);
                LOG.debug(MODULE, `Added star listener to header: ${star.dataset.sectionId}`);
            }

            // Handle target button
            const target = header.querySelector(CONFIG.selectors.target);
            if (target && !_headersWithTargetListeners.has(target)) {
                target.addEventListener('click', handleTargetClick);
                _headersWithTargetListeners.add(target);
                LOG.debug(MODULE, `Added target listener to header: ${target.dataset.sectionId}`);
            }
        });

        // Remove listeners from headers outside viewport
        _headersWithStarListeners.forEach(star => {
            const header = star.closest('.header-with-icons') || star.parentElement;
            if (header && !ViewportManager.isInViewportRange(header, viewportRange)) {
                star.removeEventListener('click', handleStarClick);
                _headersWithStarListeners.delete(star);
                LOG.debug(MODULE, `Removed star listener from header: ${star.dataset.sectionId}`);
            }
        });

        _headersWithTargetListeners.forEach(target => {
            const header = target.closest('.header-with-icons') || target.parentElement;
            if (header && !ViewportManager.isInViewportRange(header, viewportRange)) {
                target.removeEventListener('click', handleTargetClick);
                _headersWithTargetListeners.delete(target);
                LOG.debug(MODULE, `Removed target listener from header: ${target.dataset.sectionId}`);
            }
        });
    }

    /**
     * Update all header stars (e.g., when favorites change)
     */
    function updateAllHeaderStars() {
        const stars = document.querySelectorAll(CONFIG.selectors.star);
        LOG.debug(MODULE, `Updating ${stars.length} header stars`);

        stars.forEach(star => {
            const sectionId = star.dataset.sectionId;
            if (sectionId) {
                updateHeaderStarState(star, sectionId);
            }
        });
    }

    /**
     * Update individual header star state
     */
    function updateHeaderStarState(starButton, sectionId) {
        if (!starButton || !sectionId) return;

        // Convert to proper target selector because stars are only for sections
        const target = `[data-section="${sectionId}"]`;
        const isFavorited = window.FavoritesManager.isSectionFavorited(target);

        // Single class toggle - CSS handles the visual change via pseudo-elements
        starButton.classList.toggle(CONFIG.classes.active, isFavorited);

        // Update ARIA label
        const header = starButton.parentElement;
        const headerText = header?.textContent?.replace(starButton.textContent, '').trim() || sectionId;
        starButton.setAttribute('aria-label',
                                isFavorited ?
                                `${headerText} ${CONFIG.i18n.de.removeFavorite}` :
                                `${headerText} ${CONFIG.i18n.de.addFavorite}`
        );

        // Remove loading state
        starButton.classList.remove(CONFIG.classes.loading);

        LOG.debug(MODULE, `Header star updated for ${sectionId}: ${isFavorited ? 'favorited' : 'not favorited'}`);
    }

    // ========================================================================
    // EVENT HANDLERS
    // ========================================================================

    function handleStarClick(event) {
        const starButton = event.currentTarget;
        const sectionId = starButton.dataset.sectionId;

        if (!sectionId) {
            LOG.warn(MODULE, 'Star clicked but no section ID found');
            return;
        }

        // Convert to proper target selector because we only deal with sections
        const target = `[data-section="${sectionId}"]`;

        LOG.debug(MODULE, `Toggling favorite for target: ${target}`);

        // Show loading state
        starButton.classList.add(CONFIG.classes.loading);

        // Toggle favorite with correct target
        window.FavoritesManager.toggleFavorite(target);
    }

    /**
     * Handle target button click - enter subsection selection mode
     */
    function handleTargetClick(event) {
        event.preventDefault();
        event.stopPropagation();

        const targetButton = event.currentTarget;
        const sectionId = targetButton.dataset.sectionId;

        LOG.debug(MODULE, `Target button clicked for section: ${sectionId}`);

        // Visual feedback
        targetButton.classList.add(CONFIG.classes.subsectionTargetActive);

        // Enter subsection selection mode
        if (window.SubsectionSelection) {
            window.SubsectionSelection.enterSelectionMode(sectionId, () => {
                // Callback when selection mode exits - remove active state
                targetButton.classList.remove(CONFIG.classes.subsectionTargetActive);
            });
        } else {
            LOG.error(MODULE, 'SubsectionSelection module not available');
            Toast.show(CONFIG.i18n.de.errorNoSubsection, 'error');
            targetButton.classList.remove(CONFIG.classes.subsectionTargetActive);
        }
    }

    function handleScroll() {
        if (!_isInitialized) return;

        clearTimeout(_scrollTimeout);
        _scrollTimeout = setTimeout(() => {
            LOG.debug(MODULE, 'Scroll detected, managing event listeners');
            manageViewportEventListeners();
        }, 100);
    }

    // ========================================================================
    // INITIALIZATION
    // ========================================================================

    function init() {
        if (_isInitialized) {
            LOG.warn(MODULE, 'Already initialized');
            return;
        }

        LOG.debug(MODULE, 'Initializing header stars');

        // ONE-TIME: Add stars only to first header in each section
        addIconsToSectionHeaders();

        // INITIAL: Manage event listeners for current viewport
        manageViewportEventListeners();

        // Subscribe to favorites changes
        if (window.StateManager) {
            const unsubscribe = window.StateManager.subscribe('favorites', () => {
                LOG.debug(MODULE, 'Favorites changed, updating all header stars');
                updateAllHeaderStars();
            });
            _unsubscribeFunctions.push(unsubscribe);
        }

        // Scroll/resize handling for dynamic listener management
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        _isInitialized = true;
        LOG.info(MODULE, 'Header stars initialized');
    }

    function destroy() {
        // Remove event listeners from all stars
        _headersWithListeners.forEach(star => {
            star.removeEventListener('click', handleStarClick);
        });
        _headersWithListeners.clear();

        // Remove global event listeners
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);

        // Unsubscribe from state changes
        _unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
        _unsubscribeFunctions = [];

        _isInitialized = false;
        LOG.info(MODULE, 'Header stars destroyed');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.HeaderStarsManager = {
        init: init,
        destroy: destroy,
        isInitialized: () => _isInitialized,
        updateAllHeaderStars: updateAllHeaderStars
    };

    LOG.debug(MODULE, 'Header stars module loaded');

})();
