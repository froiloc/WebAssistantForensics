(function() {
    'use strict';

    const MODULE = 'BREADCRUMB_STAR';

    // Configuration
    const CONFIG = {
        classes: {
            container: 'breadcrumb-star-container',
            star: 'breadcrumb-star',
            active: 'breadcrumb-star--active',
            loading: 'breadcrumb-star--loading'
        },
        selectors: {
            container: '.breadcrumb-star-container',
            star: '#breadcrumb-star',
            section: (sectionId) => `[data-section="${sectionId}"]`
        },
        i18n: {
            de: {
                addFavorite: 'Abschnitt als Favorit speichern',
                removeFavorite: 'Favorit entfernen',
                favoriteLoading: 'Wird verarbeitet...'
            }
        }
    };

    // State
    let _isInitialized = false;
    let _currentSectionId = null;
    let _unsubscribeFunctions = [];

    // DOM Elements
    let _starButton = null;
    let _starContainer = null;

    /**
     * Initialize the breadcrumb star functionality
     */
    function init() {
        if (_isInitialized) {
            LOG.warn(MODULE, 'Already initialized');
            return;
        }

        LOG.debug(MODULE, 'Initializing breadcrumb star');

        // Get existing DOM elements from static HTML
        _starContainer = document.querySelector(CONFIG.selectors.container);
        _starButton = _starContainer?.querySelector(CONFIG.selectors.star);

        if (!_starContainer || !_starButton) {
            LOG.error(MODULE, 'Required DOM elements not found');
            return;
        }

        // Ensure button is visible
        _starContainer.hidden = false;
        _starButton.hidden = false;

        // Add click handler to existing button
        _starButton.addEventListener('click', handleStarClick);

        // Get current active section and set initial state
        _currentSectionId = window.StateManager?.get('sections.currentActive');
        updateStarAppearance(); // Set initial visual state immediately

        // Subscribe to state changes
        subscribeToStateChanges();

        _isInitialized = true;
        LOG.info(MODULE, 'Breadcrumb star initialized');
    }

    /**
     * Subscribe to relevant state changes
     */
    function subscribeToStateChanges() {
        LOG.debug(MODULE, 'Starting state subscriptions...');

        // Subscribe to active section changes
        try {
            const unsubscribeSection = window.StateManager.subscribe(
                'sections.currentActive',
                handleActiveSectionChange
            );
            LOG.debug(MODULE, `Section subscription returned: ${typeof unsubscribeSection}`);
            _unsubscribeFunctions.push(unsubscribeSection);
        } catch (error) {
            LOG.error(MODULE, `Section subscription failed: ${error.message}`);
        }

        // Subscribe to favorites changes
        try {
            const unsubscribeFavorites = window.StateManager.subscribe(
                'favorites',
                handleFavoritesChange
            );
            LOG.debug(MODULE, `Favorites subscription returned: ${typeof unsubscribeFavorites}`);
            _unsubscribeFunctions.push(unsubscribeFavorites);
        } catch (error) {
            LOG.error(MODULE, `Favorites subscription failed: ${error.message}`);
        }

        LOG.debug(MODULE, `Total subscriptions: ${_unsubscribeFunctions.length}`);
        LOG.debug(MODULE, 'Subscribed to state changes');
    }

    /**
     * Handle active section changes
     */
    function handleActiveSectionChange(newSectionId, oldSectionId) {
        LOG.debug(MODULE, `Active section changed: ${oldSectionId} -> ${newSectionId}`);
        _currentSectionId = newSectionId;
        updateStarAppearance();
    }

    /**
     * Handle favorites changes
     */
    function handleFavoritesChange() {
        LOG.debug(MODULE, 'Favorites changed, updating star appearance');
        updateStarAppearance();
    }

    /**
     * Update star appearance based on current section favorite status
     */
    function updateStarAppearance() {
        if (!_starButton || !_currentSectionId) {
            // Hide star if no active section
            _starContainer.hidden = true;
            return;
        }

        const isFavorited = window.FavoritesManager?.isSectionFavorited(CONFIG.selectors.section(_currentSectionId)) || false;

        // Single class toggle - your clean approach!
        _starButton.classList.toggle(CONFIG.classes.active, isFavorited);

        // Update ARIA label
        _starButton.setAttribute('aria-label',
                                 isFavorited ? CONFIG.i18n.de.removeFavorite : CONFIG.i18n.de.addFavorite
        );

        // Ensure button is visible
        _starButton.hidden = false;

        LOG.debug(MODULE, `Star updated for section ${_currentSectionId}: ${isFavorited ? 'favorited' : 'not favorited'}`);
    }

    /**
     * Handle star button click
     */
    function handleStarClick() {
        if (!_currentSectionId) {
            LOG.warn(MODULE, 'Star clicked but no active section');
            return;
        }

        // Convert to proper target selector because stars are only for sections
        const target = `[data-section="${_currentSectionId}"]`;

        LOG.debug(MODULE, `Toggling favorite for target: ${target}`);
        window.FavoritesManager.toggleFavorite(target);
    }

    /**
     * Cleanup and destroy
     */
    function destroy() {
        _unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
        _unsubscribeFunctions = [];

        // Remove event listeners
        if (_starButton) {
            _starButton.removeEventListener('click', handleStarClick);
        }

        _isInitialized = false;
        LOG.info(MODULE, 'Breadcrumb star destroyed');
    }

    // Export public API
    window.BreadcrumbStarManager = {
        init: init,
        destroy: destroy,
        isInitialized: () => _isInitialized
    };
})();
