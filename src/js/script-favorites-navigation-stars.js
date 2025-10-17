// ============================================================================
// SCRIPT-FAVORITES-NAVIGATION-STARS.JS - Favorite stars for navigation sidebar
// ============================================================================

(function() {
    'use strict';

    const MODULE = 'NAVIGATION_STARS';

    // Configuration
    const CONFIG = {
        classes: {
            star: 'nav-item-star',
            active: 'nav-item-star--active',
            loading: 'nav-item-star--loading'
        },
        selectors: {
            star: '.nav-item-star',
            starIcon: '.nav-item-star-icon'
        },
        i18n: {
            de: {
                addFavorite: 'Als Favorit speichern',
                removeFavorite: 'Favorit entfernen'
            }
        }
    };

    let _isInitialized = false;

    /**
     * Initialize navigation stars
     */
    function init() {
        if (_isInitialized) {
            LOG.warn(MODULE, 'Already initialized');
            return;
        }

        LOG.debug(MODULE, 'Initializing navigation stars');

        // Register our hook with the navigation system
        if (window.NavigationManager && window.NavigationManager.registerAfterItemCreation) {
            if (window.NavigationManager.isInitialized()) {
                LOG.error(MODULE, 'Navigation has already been initializes. Wrong running order.');
                return;
            }
            window.NavigationManager.registerAfterItemCreation(addStarToNavItem);

            LOG.success(MODULE, 'Registered navigation item creation hook');
        } else {
            LOG.error(MODULE, 'Navigation hook system not available');
            return;
        }

        // === CRITICAL MISSING: Subscribe to favorites changes ===
        if (window.StateManager) {
            const unsubscribe = window.StateManager.subscribe('favorites', () => {
                LOG.debug(MODULE, 'Favorites changed, updating all navigation stars');
                updateAllNavigationStars();
            });
            // Store for cleanup if needed
            _unsubscribeFunctions.push(unsubscribe);
            LOG.debug(MODULE, 'Subscribed to favorites changes');
        }

        _isInitialized = true;
        LOG.success(MODULE, 'Navigation stars initialized');
    }

    /**
     * Add star button to navigation item
     */
    function addStarToNavItem(navItem, sectionId, sectionTitle) {
        // Create star button
        const starButton = document.createElement('button');
        starButton.className = CONFIG.classes.star;
        starButton.setAttribute('type', 'button');
        starButton.setAttribute('aria-label', `${sectionTitle} ${CONFIG.i18n.de.addFavorite}`);
        starButton.dataset.sectionId = sectionId;

        // Minimal HTML - stars handled by CSS pseudo-elements
        starButton.innerHTML = `<span class="sr-only">${sectionTitle} ${CONFIG.i18n.de.addFavorite}</span>`;

        // Add click handler
        starButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering nav item double-click
            handleStarClick(sectionId, starButton);
        });

        // Add to nav item (right side)
        navItem.appendChild(starButton);

        // Set initial state
        updateStarAppearance(starButton, sectionId);

        LOG.debug(MODULE, `Added star to nav item: ${sectionId}`);
    }

    /**
     * Handle star button click
     */
    function handleStarClick(sectionId, starButton) {
        LOG.debug(MODULE, `Toggling favorite for section: ${sectionId}`);

        LOG.debug(MODULE, "0) starButton is: ", starButton);
        // Show loading state
        starButton.classList.add(CONFIG.classes.loading);
        LOG.debug(MODULE, `Added loading class to star for: ${sectionId}`);

        // Toggle favorite
        window.FavoritesManager.toggleFavorite(sectionId);

        // Loading state will be cleared by StateManager subscription
    }

    /**
     * Update star appearance based on favorite status
     */
    function updateStarAppearance(starButton, sectionId) {
        if (!starButton || !sectionId) return;

        const isFavorited = window.FavoritesManager.isSectionFavorited(sectionId);

        // Single class toggle - CSS handles the visual change
        starButton.classList.toggle(CONFIG.classes.active, isFavorited);

        // Update ARIA label
        const sectionTitle = starButton.closest('.nav-item')?.querySelector('.nav-item-text')?.textContent || sectionId;
        starButton.setAttribute('aria-label',
                                isFavorited ?
                                `${sectionTitle} ${CONFIG.i18n.de.removeFavorite}` :
                                `${sectionTitle} ${CONFIG.i18n.de.addFavorite}`
        );

        LOG.debug(MODULE, "1) starButton is: ", starButton);
        // Remove loading state
        starButton.classList.remove(CONFIG.classes.loading);

        LOG.debug(MODULE, `Nav star updated for ${sectionId}: ${isFavorited ? 'favorited' : 'not favorited'}`);
    }

    /**
    * Update all navigation stars (e.g., when favorites change globally)
    */
    function updateAllNavigationStars() {
        const stars = document.querySelectorAll(CONFIG.selectors.star);
        LOG.debug(MODULE, `Updating ${stars.length} navigation stars`);

        stars.forEach(starButton => {
            const sectionId = starButton.dataset.sectionId;
            if (!sectionId) {
                LOG.warn(MODULE, 'Star button missing sectionId data attribute', starButton);
                // STILL remove loading state even if sectionId is missing!
                LOG.debug(MODULE, "2) starButton is: ", starButton);
                starButton.classList.remove(CONFIG.classes.loading);
                return;
            }
            updateStarAppearance(starButton, sectionId);
        });
    }

    // ========================================================================
    // STATE OBSERVATION
    // ========================================================================

    function initStateObservation() {
        // Subscribe to favorites changes to update all stars
        if (window.StateManager) {
            window.StateManager.subscribe('favorites', () => {
                LOG.debug(MODULE, 'Favorites changed, updating all navigation stars');
                updateAllNavigationStars();
            });
        }
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.NavigationStarsManager = {
        init: init,
        updateAllNavigationStars: updateAllNavigationStars,
        isInitialized: () => _isInitialized
    };

    LOG(MODULE, 'Navigation stars module loaded');
})();
