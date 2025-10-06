// ============================================================================
// SCRIPT-SECTION-MANAGEMENT.JS - Version 058 (StateManager Migration)
// Section-Management: Scroll-basierte Section-Auswahl
// ============================================================================

(function() {
    'use strict';

    const STATE = window.APP_STATE;
    const CONST = window.APP_CONSTANTS;
    const MODULE = 'SECTION';

    // ========================================================================
    // INITIALISIERUNG
    // ========================================================================

    function initSectionManagement() {
        LOG(MODULE, 'Initializing section management...');

        // DOM-Elemente können NICHT im StateManager gespeichert werden
        // Sie bleiben in STATE (nicht serialisierbar)
        STATE.allSections = Array.from(document.querySelectorAll('main > [data-section]'));

        LOG(MODULE, `Found ${STATE.allSections.length} sections:`,
            STATE.allSections.map(s => s.dataset.section));

        if (STATE.allSections.length > 0) {
            const initialSection = STATE.allSections[0].dataset.section;

            // Nur den Section-Namen (String) im StateManager speichern
            if (window.StateManager) {
                window.StateManager.set('sections.currentActive', initialSection);
            } else {
                STATE.currentActiveSection = initialSection;
            }

            STATE.allSections[0].classList.add('active');
            LOG.success(MODULE, `Initial active section: ${initialSection}`);
        }

        initScrollHandling();
        initFocusObserver();

        LOG.success(MODULE, 'Section management initialized');
    }

    // ========================================================================
    // EVENT LISTENER SETUP
    // ========================================================================

    function initScrollHandling() {
        LOG(MODULE, 'Setting up scroll event listeners...');

        window.addEventListener('wheel', (e) => {
            const direction = e.deltaY > 0 ? 'down' : 'up';
            handleScrollIntention(direction);
        }, { passive: false });

        window.addEventListener('keydown', (e) => {
            const keyActions = {
                'ArrowDown': 'down',
                'ArrowUp': 'up',
                'PageDown': 'down',
                'PageUp': 'up',
                'End': 'down',
                'Home': 'up',
                'Space': e.shiftKey ? 'up' : 'down'
            };

            if (keyActions[e.key]) {
                handleScrollIntention(keyActions[e.key]);
            }
        }, { passive: false });

        let touchStartY = 0;

        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;

            if (Math.abs(deltaY) > 10) {
                handleScrollIntention(deltaY > 0 ? 'down' : 'up');
                touchStartY = touchY;
            }
        }, { passive: true });

        window.addEventListener('scroll', () => {
            STATE.userIsScrolling = true;

            if (STATE.scrollTimeout) {
                clearTimeout(STATE.scrollTimeout);
            }
            STATE.scrollTimeout = setTimeout(() => {
                STATE.userIsScrolling = false;
            }, 200);

            if (!STATE.isProcessingScroll) {
                // StateManager verwenden
                if (window.StateManager) {
                    window.StateManager.set('scroll.isProcessingScroll', true);
                } else {
                    STATE.isProcessingScroll = true;
                }

                updateActiveSectionFromScroll();

                setTimeout(() => {
                    if (window.StateManager) {
                        window.StateManager.set('scroll.isProcessingScroll', false);
                    } else {
                        STATE.isProcessingScroll = false;
                    }
                }, 50);
            }
        }, { passive: true });

        LOG.success(MODULE, 'Scroll event listeners initialized');
    }

    // ========================================================================
    // SCROLL-INTENTION-HANDLER
    // ========================================================================

    function handleScrollIntention(direction) {
        const timestamp = Date.now();

        if (timestamp - STATE.lastScrollIntentionTime < CONST.SCROLL_INTENTION_COOLDOWN) {
            return;
        }
        STATE.lastScrollIntentionTime = timestamp;

        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        const isAtBottom = scrollY + viewportHeight >= documentHeight - 5;
        const isAtTop = scrollY <= 5;

        LOG.debug(MODULE, `Intention: direction=${direction}, isAtBottom=${isAtBottom}, isAtTop=${isAtTop}`);

        if (isAtBottom && direction === 'down') {
            handleEndScroll('down');
        } else if (isAtTop && direction === 'up') {
            handleEndScroll('up');
        }
    }

    function handleEndScroll(direction) {
        // DOM-Elemente sind in STATE, nicht im StateManager
        const allSections = STATE.allSections;

        const currentActive = window.StateManager
        ? window.StateManager.get('sections.currentActive')
        : STATE.currentActiveSection;

        const currentActiveIndex = allSections.findIndex(
            s => s.dataset.section === currentActive
        );

        if (direction === 'down' && currentActiveIndex < allSections.length - 1) {
            const nextSection = allSections[currentActiveIndex + 1];
            LOG(MODULE, `End-scroll DOWN: Activating next → ${nextSection.dataset.section}`);
            activateSection(nextSection.dataset.section);

        } else if (direction === 'up' && currentActiveIndex > 0) {
            const prevSection = allSections[currentActiveIndex - 1];
            LOG(MODULE, `End-scroll UP: Activating previous → ${prevSection.dataset.section}`);
            activateSection(prevSection.dataset.section);
        }
    }

    // ========================================================================
    // SCROLL-BASIERTE SECTION-AUSWAHL
    // ========================================================================

    function updateActiveSectionFromScroll() {
        const callId = ++STATE.scrollCallCounter;
        LOG.separator(MODULE, `Scroll Event #${callId}`);

        const candidates = collectVisibleSections();
        const winner = determineWinner(candidates);

        if (winner && winner.id !== getCurrentActiveSection()) {
            const timestamp = Date.now();
            const timeSinceLastChange = timestamp - STATE.lastSectionChangeTime;

            if (timeSinceLastChange < CONST.SECTION_CHANGE_COOLDOWN) {
                LOG.debug(MODULE, `Cooldown active (${timeSinceLastChange}ms < ${CONST.SECTION_CHANGE_COOLDOWN}ms)`);
                return;
            }

            LOG(MODULE, `Section change: ${getCurrentActiveSection()} → ${winner.id}`);
            activateSection(winner.id);
        } else if (winner) {
            LOG.debug(MODULE, `No change: Winner already active (${winner.id})`);
        } else {
            LOG.debug(MODULE, 'No winner determined');
        }
    }

    function collectVisibleSections() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const isAtBottom = scrollY + viewportHeight >= document.documentElement.scrollHeight - 5;
        const isAtTop = scrollY <= 5;

        LOG.debug(MODULE, `Collect: scrollY=${scrollY}, isAtBottom=${isAtBottom}, isAtTop=${isAtTop}`);

        // DOM-Elemente sind in STATE
        const allSections = STATE.allSections;

        const visibleSections = [];

        allSections.forEach((section, idx) => {
            const rect = section.getBoundingClientRect();
            const sectionHeight = rect.height;
            const viewportTop = 0;
            const viewportBottom = viewportHeight;
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;

            const visibleTop = Math.max(sectionTop, viewportTop);
            const visibleBottom = Math.min(sectionBottom, viewportBottom);
            const sectionHeightInViewport = Math.max(0, visibleBottom - visibleTop);

            const sectionInViewportRatio = sectionHeight > 0
            ? (sectionHeightInViewport / sectionHeight)
            : 0;

            const viewportOccupancyRatio = viewportHeight > 0
            ? (sectionHeightInViewport / viewportHeight)
            : 0;

            const rule1 = sectionInViewportRatio >= 0.4;
            const rule2 = viewportOccupancyRatio >= 0.5;

            LOG.debug(MODULE, `${section.dataset.section} (idx:${idx}): ` +
            `sectionInViewportRatio=${(sectionInViewportRatio * 100).toFixed(1)}%, ` +
            `viewportOccupancyRatio=${(viewportOccupancyRatio * 100).toFixed(1)}%, ` +
            `rule1=${rule1}, rule2=${rule2}`);

            if (rule1 || rule2) {
                visibleSections.push({
                    id: section.dataset.section,
                    element: section,
                    sectionInViewportRatio: sectionInViewportRatio,
                    viewportOccupancyRatio: viewportOccupancyRatio,
                    reason: rule1 && rule2 ? 'rule1+2' : (rule1 ? 'rule1' : 'rule2')
                });
            }
        });

        LOG.debug(MODULE, `Candidates after RULE1+2: Count=${visibleSections.length}, ` +
        `IDs=[${visibleSections.map(s => s.id).join(', ')}]`);

        // HYSTERESE
        const currentActive = getCurrentActiveSection();
        const currentActiveIndex = STATE.allSections.findIndex(
            s => s.dataset.section === currentActive
        );

        if (currentActiveIndex !== -1) {
            const activeSection = STATE.allSections[currentActiveIndex];
            const alreadyCandidate = visibleSections.find(s => s.id === currentActive);

            if (!alreadyCandidate) {
                const rect = activeSection.getBoundingClientRect();
                const sectionHeight = rect.height;
                const viewportTop = 0;
                const viewportBottom = viewportHeight;
                const sectionTop = rect.top;
                const sectionBottom = rect.bottom;
                const visibleTop = Math.max(sectionTop, viewportTop);
                const visibleBottom = Math.min(sectionBottom, viewportBottom);
                const sectionHeightInViewport = Math.max(0, visibleBottom - visibleTop);
                const sectionInViewportRatio = sectionHeight > 0
                ? (sectionHeightInViewport / sectionHeight)
                : 0;
                const viewportOccupancyRatio = viewportHeight > 0
                ? (sectionHeightInViewport / viewportHeight)
                : 0;

                if (sectionInViewportRatio >= 0.2 || viewportOccupancyRatio >= 0.15) {
                    LOG.debug(MODULE, `HYSTERESE: Adding active section ${currentActive} ` +
                    `(sectionRatio=${(sectionInViewportRatio*100).toFixed(1)}%, ` +
                    `viewportRatio=${(viewportOccupancyRatio*100).toFixed(1)}%)`);

                    visibleSections.push({
                        id: currentActive,
                        element: activeSection,
                        sectionInViewportRatio: sectionInViewportRatio,
                        viewportOccupancyRatio: viewportOccupancyRatio,
                        reason: 'hysteresis'
                    });
                }
            }
        }

        return visibleSections;
    }

    function determineWinner(candidates) {
        if (candidates.length === 0) {
            LOG.debug(MODULE, 'No candidates');
            return null;
        }

        LOG.debug(MODULE, `Final candidates: Count=${candidates.length}`);

        const scrollY = window.scrollY;
        const lastScrollY = STATE.lastScrollY;
        const direction = scrollY > lastScrollY ? 'down' : 'up';

        STATE.lastScrollY = scrollY;
        STATE.lastDirection = direction;

        const currentActive = getCurrentActiveSection();
        const navigationPriorityActive = Date.now() - STATE.lastNavigationTime < CONST.NAVIGATION_PRIORITY_DURATION;

        if (navigationPriorityActive && STATE.lastNavigatedSection) {
            const navTarget = candidates.find(c => c.id === STATE.lastNavigatedSection);
            if (navTarget) {
                LOG.debug(MODULE, `Navigation priority: Forcing ${STATE.lastNavigatedSection}`);
                return navTarget;
            }
        }

        let filteredCandidates = [...candidates];

        if (filteredCandidates.length > 1) {
            const hasActiveSectionInCandidates = filteredCandidates.some(c => c.id === currentActive);

            if (hasActiveSectionInCandidates) {
                // DOM-Elemente sind in STATE
                const allSections = STATE.allSections;

                const activeIndex = allSections.findIndex(s => s.dataset.section === currentActive);

                filteredCandidates = filteredCandidates.filter(c => {
                    const candIndex = allSections.findIndex(s => s.dataset.section === c.id);

                    if (direction === 'down') {
                        return candIndex >= activeIndex;
                    } else {
                        return candIndex <= activeIndex;
                    }
                });

                LOG.debug(MODULE, `Direction lock ${direction.toUpperCase()}: Filtered from ${candidates.length} to ${filteredCandidates.length}`);
            }
        }

        if (filteredCandidates.length === 0) {
            filteredCandidates = candidates;
        }

        LOG.group(MODULE, 'Scoring Results');
        const scored = filteredCandidates.map(c => {
            let score = 0;

            score += c.viewportOccupancyRatio * 300;

            if (c.id === currentActive) {
                score += 50;
            }

            LOG(MODULE, `${c.id}: score=${Math.round(score)} (viewportRatio=${(c.viewportOccupancyRatio*100).toFixed(1)}%, active=${c.id === currentActive})`);

            return { ...c, score };
        });
        LOG.groupEnd();

        scored.sort((a, b) => b.score - a.score);

        const winner = scored[0];
        LOG.success(MODULE, `Winner: ${winner.id} (score=${Math.round(winner.score)})`);

        return winner;
    }

    // ========================================================================
    // SECTION ACTIVATION
    // ========================================================================

    function activateSection(sectionId) {
        const section = document.querySelector(`[data-section="${sectionId}"]`);
        if (!section) {
            LOG.error(MODULE, `Section not found: ${sectionId}`);
            return;
        }

        LOG(MODULE, `Activating: ${getCurrentActiveSection()} → ${sectionId}`);

        // DOM-Elemente sind in STATE
        STATE.allSections.forEach(s => s.classList.remove('active'));
        section.classList.add('active');

        const timestamp = Date.now();

        // StateManager verwenden
        if (window.StateManager) {
            window.StateManager.set('sections.currentActive', sectionId);
            window.StateManager.set('sections.lastSectionChangeTime', timestamp);
            window.StateManager.set('sections.lastChangedToSection', sectionId);
        } else {
            STATE.currentActiveSection = sectionId;
            STATE.lastSectionChangeTime = timestamp;
            STATE.lastChangedToSection = sectionId;
        }

        window.dispatchEvent(new CustomEvent('sectionActivated', {
            detail: { sectionId: sectionId, timestamp: timestamp }
        }));
    }

    function scrollToSection(sectionId) {
        LOG(MODULE, `🎯 scrollToSection() called with: ${sectionId}`);

        const targetSection = document.querySelector(`main [data-section="${sectionId}"]`);

        if (!targetSection) {
            LOG.error(MODULE, `❌ Section not found: ${sectionId}`);
            return;
        }

        LOG.debug(MODULE, `✅ Target section found: ${sectionId}, offsetTop=${targetSection.offsetTop}`);

        // StateManager verwenden
        if (window.StateManager) {
            window.StateManager.set('sections.lastNavigatedSection', sectionId);
            window.StateManager.set('sections.lastNavigationTime', Date.now());
        } else {
            STATE.lastNavigatedSection = sectionId;
            STATE.lastNavigationTime = Date.now();
        }

        const rect = targetSection.getBoundingClientRect();
        const scrollY = window.scrollY;
        const targetPosition = scrollY + rect.top - CONST.NAVIGATION_PRIORITY_OFFSET;

        LOG.debug(MODULE, `🔍 Scroll calculation: currentY=${scrollY}, targetY=${targetPosition}`);

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        LOG.success(MODULE, `✅ Scrolling to: ${sectionId}`);

        activateSection(sectionId);
    }

    // ========================================================================
    // INTERSECTION OBSERVER
    // ========================================================================

    function initFocusObserver() {
        LOG(MODULE, 'Setting up Intersection Observer...');

        const observerOptions = {
            root: null,
 rootMargin: '0px',
 threshold: [0, 0.1, 0.5, 1.0]
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        // IntersectionObserver kann NICHT serialisiert werden
        // Bleibt in STATE, nicht im StateManager
        STATE.focusObserver = observer;

        // DOM-Elemente sind in STATE
        STATE.allSections.forEach(section => {
            observer.observe(section);
        });

        LOG.success(MODULE, `Intersection Observer initialized for ${STATE.allSections.length} sections`);
    }

    function handleIntersection(entries, observer) {
        const timestamp = Date.now();

        if (STATE.isProcessingIntersection) {
            return;
        }

        // StateManager verwenden
        if (window.StateManager) {
            window.StateManager.set('scroll.isProcessingIntersection', true);
        } else {
            STATE.isProcessingIntersection = true;
        }

        try {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            const canScroll = documentHeight > viewportHeight + 10;
            const isAtTop = scrollY === 0;
            const isAtBottom = scrollY + viewportHeight >= documentHeight - 10;

            const navigationPriorityActive = timestamp - STATE.lastNavigationTime < CONST.NAVIGATION_PRIORITY_DURATION;

            entries.forEach(entry => {
                const sectionId = entry.target.dataset.section;
                const isNavigationTarget = sectionId === STATE.lastNavigatedSection && navigationPriorityActive;

                if (isNavigationTarget && entry.isIntersecting) {
                    LOG.debug(MODULE, `Navigation target intersecting: ${sectionId}`);
                    activateSection(sectionId);
                    return;
                }
            });

        } finally {
            setTimeout(() => {
                if (window.StateManager) {
                    window.StateManager.set('scroll.isProcessingIntersection', false);
                } else {
                    STATE.isProcessingIntersection = false;
                }
            }, 100);
        }
    }

    // ========================================================================
    // HELPER FUNCTIONS
    // ========================================================================

    function getCurrentActiveSection() {
        return window.StateManager
        ? window.StateManager.get('sections.currentActive')
        : STATE.currentActiveSection;
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.SectionManagement = {
        init: initSectionManagement,
        scrollToSection: scrollToSection,
        activateSection: activateSection,
        getCurrentActive: getCurrentActiveSection
    };

    LOG(MODULE, 'Section management module loaded');

})();
