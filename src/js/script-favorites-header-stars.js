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
    let _headersWithListeners = new Set(); // Track headers with active listeners

    // Configuration
    const CONFIG = {
        classes: {
            star: 'header-star',
            active: 'header-star--active',
            loading: 'header-star--loading',
            headerWithStar: 'header-with-star'
        },
        selectors: {
            mainContent: 'main section[data-section]',
            headers: 'h2, h3, h4, h5, h6',
            star: '.header-star'
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
                removeFavorite: 'Favorit entfernen'
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
     * Add stars to ALL headers (one-time initialization)
     */
    function addStarsToAllHeaders() {
        const headers = document.querySelectorAll(CONFIG.selectors.headers);
        LOG.debug(MODULE, `Adding stars to ${headers.length} headers`);

        headers.forEach((header, index) => {
            if (!header.querySelector(CONFIG.selectors.star)) {
                createHeaderStar(header);
                LOG.debug(MODULE, `Added star to header ${index + 1}`);
            }
        });

        LOG.success(MODULE, `Stars added to ${headers.length} headers`);
    }

    // In the future, we could add:
    function createSubsectionStar(header, headerId) {
        // Would use header ID or generated selector instead of sectionId
        // Would store different favorite data structure
        // TODO for future implementation
    }

    /**
    * Add stars only to the first header in each section
    */
    function addStarsToSectionHeaders() {
        const sections = document.querySelectorAll(CONFIG.selectors.mainContent);
        LOG.debug(MODULE, `Processing ${sections.length} sections for header stars`);

        let starCount = 0;

        sections.forEach(section => {
            const sectionId = section.dataset.section;

            // Find the FIRST header in this section (any level)
            const firstHeader = section.querySelector('h1, h2, h3, h4, h5, h6');

            if (firstHeader && !firstHeader.querySelector(CONFIG.selectors.star)) {
                createHeaderStar(firstHeader, sectionId);
                starCount++;
                LOG.debug(MODULE, `Added star to first header in section: ${sectionId}`);
            } else if (!firstHeader) {
                LOG.warn(MODULE, `Section ${sectionId} has no headers`, section);
            } else {
                LOG.debug(MODULE, `Section ${sectionId} already has star or no suitable header`);
            }
        });

        LOG.success(MODULE, `Stars added to ${starCount} section headers`);
    }

    /**
     * Create and add star button to header
     */
    function createHeaderStar(header, sectionId) {
        const starButton = document.createElement('button');
        starButton.className = CONFIG.classes.star;
        starButton.setAttribute('type', 'button');
        starButton.dataset.sectionId = sectionId;

        // Minimal HTML - CSS pseudo-elements will handle visuals
        starButton.innerHTML = `<span class="sr-only">${header.textContent} ${CONFIG.i18n.de.addFavorite}</span>`;

        // Add to header (floating right - Option B)
        header.classList.add(CONFIG.classes.headerWithStar);
        header.appendChild(starButton);

        // Initial visual state
        updateHeaderStarState(starButton, sectionId);

        LOG.debug(MODULE, `Created star for section: ${sectionId}`);
    }

    /**
     * Manage event listeners based on viewport
     */
    function manageViewportEventListeners() {
        const viewportRange = ViewportManager.getViewportRange();
        const headersInViewport = ViewportManager.findHeadersInRange(viewportRange);

        LOG.debug(MODULE, `Managing listeners for ${headersInViewport.length} headers in viewport`);

        // Add listeners to headers in viewport
        headersInViewport.forEach(header => {
            const star = header.querySelector(CONFIG.selectors.star);
            if (star && !_headersWithListeners.has(star)) {
                star.addEventListener('click', handleStarClick);
                _headersWithListeners.add(star);
                LOG.debug(MODULE, `Added listener to header: ${star.dataset.sectionId}`);
            }
        });

        // Remove listeners from headers outside viewport
        _headersWithListeners.forEach(star => {
            const header = star.parentElement;
            if (header && !ViewportManager.isInViewportRange(header, viewportRange)) {
                star.removeEventListener('click', handleStarClick);
                _headersWithListeners.delete(star);
                LOG.debug(MODULE, `Removed listener from header: ${star.dataset.sectionId}`);
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

        const isFavorited = window.FavoritesManager.isSectionFavorited(sectionId);

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

        LOG.debug(MODULE, `Toggling favorite for section: ${sectionId}`);

        // Show loading state
        starButton.classList.add(CONFIG.classes.loading);

        // Toggle favorite
        window.FavoritesManager.toggleFavorite(sectionId);

        // Loading state will be cleared by StateManager subscription
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
        addStarsToSectionHeaders();

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
        LOG.success(MODULE, 'Header stars initialized');
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
        LOG.success(MODULE, 'Header stars destroyed');
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
