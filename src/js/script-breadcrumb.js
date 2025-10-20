// ============================================================================
// SCRIPT-BREADCRUMB.JS - Breadcrumb Functionality
// ============================================================================

(function() {
    'use strict';

    const MODULE = 'BREADCRUMB';

    let _isInitialized = false;

    // ========================================================================
    // BREADCRUMB FUNCTIONS
    // ========================================================================

    function init() {
        if (_isInitialized) {
            LOG.warn(MODULE, 'Already initialized');
            return;
        }

        LOG(MODULE, 'Initializing breadcrumb...');

        const breadcrumbCurrent = document.getElementById('breadcrumb-current');

        LOG.debug(MODULE, 'Breadcrumb element found:', !!breadcrumbCurrent);

        if (breadcrumbCurrent) {
            // Sections über SectionManagement API abrufen
            const allSections = window.SectionManagement
            ? window.SectionManagement.getAllSections()
            : [];

            const firstSection = allSections[0];
            if (firstSection) {
                const title = firstSection.dataset.title ||
                firstSection.querySelector('h2')?.textContent?.trim() ||
                firstSection.querySelector('h3')?.textContent?.trim() ||
                firstSection.querySelector('h4')?.textContent?.trim() ||
                firstSection.querySelector('h5')?.textContent?.trim() ||
                firstSection.querySelector('h6')?.textContent?.trim() ||
                'Überblick';

        updateBreadcrumb(title);
        LOG.debug(MODULE, `Initial breadcrumb set to: ${title}`);
            }
        } else {
            LOG.warn(MODULE, 'Breadcrumb element (#breadcrumb-current) not found');
        }

        // Section change listeners
        initSectionChangeListeners();

        _isInitialized = true;
        LOG.info(MODULE, 'Breadcrumb initialized');
    }

    function updateBreadcrumb(title) {
        const breadcrumbCurrent = document.getElementById('breadcrumb-current');
        if (breadcrumbCurrent) {
            breadcrumbCurrent.textContent = title;
            LOG.debug(MODULE, `Breadcrumb updated to: ${title}`);
        }
    }

    function initSectionChangeListeners() {
        LOG(MODULE, 'Initializing breadcrumb section change listeners...');

        window.addEventListener('sectionActivated', (e) => {
            const { sectionId } = e.detail;

            LOG.debug(MODULE, `Breadcrumb: Section activated event: ${sectionId}`);

            // Breadcrumb aktualisieren
            const section = document.querySelector(`main [data-section="${sectionId}"]`);
            if (section) {
                const title = section.dataset.title?.trim() ||
                section.querySelector('h2')?.textContent?.trim() ||
                section.querySelector('h3')?.textContent?.trim() ||
                section.querySelector('h4')?.textContent?.trim() ||
                section.querySelector('h5')?.textContent?.trim() ||
                section.querySelector('h6')?.textContent?.trim() ||
                'Unbenannt';

        LOG.debug(MODULE, `Breadcrumb title: "${title}" for section: ${sectionId}`);
        updateBreadcrumb(title);
            } else {
                LOG.warn(MODULE, `Section not found for breadcrumb: ${sectionId}`);
            }
        });

        LOG.info(MODULE, 'Breadcrumb section change listeners initialized');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.BreadcrumbManager = {
        init: init,
        updateBreadcrumb: updateBreadcrumb,
        isInitialized: () => _isInitialized
    };

    LOG(MODULE, 'Breadcrumb module loaded');

})();
