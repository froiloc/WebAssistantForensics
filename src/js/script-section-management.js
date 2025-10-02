// ============================================================================
// SCRIPT-SECTION-MANAGEMENT.JS - Version 040
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

        STATE.allSections = Array.from(document.querySelectorAll('main > [data-section]'));
        LOG(MODULE, `Found ${STATE.allSections.length} sections:`,
            STATE.allSections.map(s => s.dataset.section));

        if (STATE.allSections.length > 0) {
            STATE.currentActiveSection = STATE.allSections[0].dataset.section;
            STATE.allSections[0].classList.add('active');
            LOG.success(MODULE, `Initial active section: ${STATE.currentActiveSection}`);
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
                STATE.isProcessingScroll = true;
                updateActiveSectionFromScroll();
                setTimeout(() => {
                    STATE.isProcessingScroll = false;
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
        const currentActiveIndex = STATE.allSections.findIndex(
            s => s.dataset.section === STATE.currentActiveSection
        );

        if (direction === 'down' && currentActiveIndex < STATE.allSections.length - 1) {
            const nextSection = STATE.allSections[currentActiveIndex + 1];
            LOG(MODULE, `End-scroll DOWN: Activating next → ${nextSection.dataset.section}`);
            activateSection(nextSection.dataset.section);

        } else if (direction === 'up' && currentActiveIndex > 0) {
            const prevSection = STATE.allSections[currentActiveIndex - 1];
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

        if (winner && winner.id !== STATE.currentActiveSection) {
            const timestamp = Date.now();
            const timeSinceLastChange = timestamp - STATE.lastSectionChangeTime;

            if (timeSinceLastChange < CONST.SECTION_CHANGE_COOLDOWN) {
                LOG.warn(MODULE, `Cooldown active: ${timeSinceLastChange}ms < ${CONST.SECTION_CHANGE_COOLDOWN}ms`);
                return;
            }

            LOG(MODULE, `Section change: ${STATE.currentActiveSection} → ${winner.id}`);
            activateSection(winner.id);

        } else if (winner) {
            LOG.debug(MODULE, `No change: Winner already active (${winner.id})`);
        } else {
            LOG.warn(MODULE, 'No winner determined');
        }
    }

    function collectVisibleSections() {
        const visibleSections = [];
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;

        const isAtBottom = scrollY + viewportHeight >= documentHeight - 5;
        const isAtTop = scrollY <= 5;

        LOG.debug(MODULE, `Collect: scrollY=${scrollY}, isAtBottom=${isAtBottom}, isAtTop=${isAtTop}`);

        // REGEL 1 & 2
        STATE.allSections.forEach((section, index) => {
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

            const rule1 = sectionInViewportRatio >= 0.8;
            const rule2 = viewportOccupancyRatio >= 0.4;

            const sectionId = section.dataset.section;

            LOG.debug(MODULE, `${sectionId} (idx:${index}): ` +
            `sectionInViewportRatio=${(sectionInViewportRatio*100).toFixed(1)}%, ` +
            `viewportOccupancyRatio=${(viewportOccupancyRatio*100).toFixed(1)}%, ` +
            `rule1=${rule1}, rule2=${rule2}`);

            if (rule1 || rule2) {
                visibleSections.push({
                    id: sectionId,
                    index: index,
                    sectionHeightInViewport: Math.round(sectionHeightInViewport),
                                     sectionHeight: Math.round(sectionHeight),
                                     sectionInViewportRatio: Math.round(sectionInViewportRatio * 1000) / 10,
                                     viewportOccupancyRatio: Math.round(viewportOccupancyRatio * 1000) / 10,
                                     element: section,
                                     addedByRule: rule1 && rule2 ? 'rule1+2' : (rule1 ? 'rule1' : 'rule2')
                });
            }
        });

        LOG.debug(MODULE, `Candidates after RULE1+2: Count=${visibleSections.length}, ` +
        `IDs=[${visibleSections.map(s => s.id).join(', ')}]`);

        // HYSTERESE
        const currentActiveIndex = STATE.allSections.findIndex(
            s => s.dataset.section === STATE.currentActiveSection
        );

        if (currentActiveIndex !== -1) {
            const activeSection = STATE.allSections[currentActiveIndex];
            const alreadyCandidate = visibleSections.find(s => s.id === STATE.currentActiveSection);

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

                if (sectionInViewportRatio >= 0.15 || viewportOccupancyRatio >= 0.15) {
                    LOG.debug(MODULE, `HYSTERESE: Adding active section ${STATE.currentActiveSection} ` +
                    `(sectionRatio=${(sectionInViewportRatio*100).toFixed(1)}%, ` +
                    `viewportRatio=${(viewportOccupancyRatio*100).toFixed(1)}%)`);

                    visibleSections.push({
                        id: STATE.currentActiveSection,
                        index: currentActiveIndex,
                        sectionHeightInViewport: Math.round(sectionHeightInViewport),
                                         sectionHeight: Math.round(sectionHeight),
                                         sectionInViewportRatio: Math.round(sectionInViewportRatio * 1000) / 10,
                                         viewportOccupancyRatio: Math.round(viewportOccupancyRatio * 1000) / 10,
                                         element: activeSection,
                                         addedByRule: 'hysterese'
                    });
                }
            }
        }

        // REGEL 3
        if (isAtBottom && visibleSections.length > 0) {
            const maxIndex = Math.max(...visibleSections.map(s => s.index));
            LOG.debug(MODULE, `RULE3: isAtBottom=true, maxIndex=${maxIndex}`);

            STATE.allSections.forEach((section, index) => {
                if (index > maxIndex) {
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

                    const sectionId = section.dataset.section;

                    LOG.debug(MODULE, `RULE3: Adding ${sectionId} (idx=${index})`);

                    visibleSections.push({
                        id: sectionId,
                        index: index,
                        sectionHeightInViewport: Math.round(sectionHeightInViewport),
                                         sectionHeight: Math.round(sectionHeight),
                                         sectionInViewportRatio: Math.round(sectionInViewportRatio * 1000) / 10,
                                         viewportOccupancyRatio: Math.round(viewportOccupancyRatio * 1000) / 10,
                                         element: section,
                                         addedByRule: 'rule3-atBottom'
                    });
                }
            });
        }

        // REGEL 4
        if (isAtTop && visibleSections.length > 0) {
            const minIndex = Math.min(...visibleSections.map(s => s.index));
            LOG.debug(MODULE, `RULE4: isAtTop=true, minIndex=${minIndex}`);

            STATE.allSections.forEach((section, index) => {
                if (index < minIndex) {
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

                    const sectionId = section.dataset.section;

                    LOG.debug(MODULE, `RULE4: Adding ${sectionId} (idx=${index})`);

                    visibleSections.push({
                        id: sectionId,
                        index: index,
                        sectionHeightInViewport: Math.round(sectionHeightInViewport),
                                         sectionHeight: Math.round(sectionHeight),
                                         sectionInViewportRatio: Math.round(sectionInViewportRatio * 1000) / 10,
                                         viewportOccupancyRatio: Math.round(viewportOccupancyRatio * 1000) / 10,
                                         element: section,
                                         addedByRule: 'rule4-atTop'
                    });
                }
            });
        }

        // FALLBACK
        if (visibleSections.length === 0) {
            LOG.warn(MODULE, `FALLBACK: No candidates found, keeping current: ${STATE.currentActiveSection}`);

            const currentActiveIndex = STATE.allSections.findIndex(
                s => s.dataset.section === STATE.currentActiveSection
            );

            if (currentActiveIndex !== -1) {
                const activeSection = STATE.allSections[currentActiveIndex];
                const rect = activeSection.getBoundingClientRect();

                visibleSections.push({
                    id: STATE.currentActiveSection,
                    index: currentActiveIndex,
                    sectionHeightInViewport: 0,
                    sectionHeight: Math.round(rect.height),
                                     sectionInViewportRatio: 0,
                                     viewportOccupancyRatio: 0,
                                     element: activeSection,
                                     addedByRule: 'fallback'
                });
            }
        }

        LOG.debug(MODULE, `Final candidates: Count=${visibleSections.length}`);

        return visibleSections;
    }

    function determineWinner(candidates) {
        if (candidates.length === 0) {
            LOG.warn(MODULE, 'No candidates for winner selection');
            return null;
        }

        if (candidates.length === 1) {
            LOG.debug(MODULE, `Only one candidate: ${candidates[0].id}`);
            return candidates[0];
        }

        // DIRECTION LOCK
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - STATE.lastScrollY;
        const direction = scrollDelta > 0 ? 'down' : (scrollDelta < 0 ? 'up' : 'none');

        const currentActiveIndex = STATE.allSections.findIndex(
            s => s.dataset.section === STATE.currentActiveSection
        );

        let filteredCandidates = candidates;

        if (direction === 'up' && currentActiveIndex !== -1) {
            const filtered = candidates.filter(c => c.index <= currentActiveIndex);
            if (filtered.length > 0) {
                LOG.debug(MODULE, `Direction lock UP: Filtered from ${candidates.length} to ${filtered.length}`);
                filteredCandidates = filtered;
            }
        } else if (direction === 'down' && currentActiveIndex !== -1) {
            const filtered = candidates.filter(c => c.index >= currentActiveIndex);
            if (filtered.length > 0) {
                LOG.debug(MODULE, `Direction lock DOWN: Filtered from ${candidates.length} to ${filtered.length}`);
                filteredCandidates = filtered;
            }
        }

        // SCORING
        const scored = filteredCandidates.map(c => {
            let score = c.viewportOccupancyRatio * 10;

            if (c.id === STATE.currentActiveSection && c.viewportOccupancyRatio >= 20) {
                score += 50;
            }

            return {
                ...c,
                score: Math.round(score * 10) / 10
            };
        });

        scored.sort((a, b) => b.score - a.score);

        LOG.group(MODULE, 'Scoring Results');
        scored.forEach(s => {
            LOG(MODULE, `${s.id}: score=${s.score} (viewportRatio=${s.viewportOccupancyRatio}%, active=${s.id === STATE.currentActiveSection})`);
        });
        LOG.groupEnd();

        const winner = scored[0];
        LOG.success(MODULE, `Winner: ${winner.id} (score=${winner.score})`);

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

        LOG(MODULE, `Activating: ${STATE.currentActiveSection} → ${sectionId}`);

        STATE.allSections.forEach(s => s.classList.remove('active'));
        section.classList.add('active');

        const timestamp = Date.now();
        STATE.currentActiveSection = sectionId;
        STATE.lastSectionChangeTime = timestamp;
        STATE.lastChangedToSection = sectionId;

        window.dispatchEvent(new CustomEvent('sectionActivated', {
            detail: { sectionId: sectionId, timestamp: timestamp }
        }));
    }

    function scrollToSection(sectionId) {
        const section = document.querySelector(`[data-section="${sectionId}"]`);
        if (!section) {
            LOG.error(MODULE, `Section not found for scroll: ${sectionId}`);
            return;
        }

        LOG(MODULE, `Scrolling to: ${sectionId}`);

        const timestamp = Date.now();
        STATE.lastNavigationTime = timestamp;
        STATE.lastNavigatedSection = sectionId;

        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

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

        STATE.focusObserver = new IntersectionObserver(handleIntersection, observerOptions);

        STATE.allSections.forEach(section => {
            STATE.focusObserver.observe(section);
        });

        LOG.success(MODULE, `Intersection Observer initialized for ${STATE.allSections.length} sections`);
    }

    function handleIntersection(entries, observer) {
        const timestamp = Date.now();

        if (STATE.isProcessingIntersection) {
            return;
        }

        STATE.isProcessingIntersection = true;

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
                const isCurrentlyActive = sectionId === STATE.currentActiveSection;

                if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                    entry.target.classList.remove('out-of-focus');
                } else {
                    const rect = entry.target.getBoundingClientRect();
                    const isSectionVisible = rect.bottom > 0 && rect.top < viewportHeight;
                    const isFullyVisible = rect.top >= 0 && rect.bottom <= viewportHeight;

                    const isFirstSection = entry.target === document.querySelector('main > [data-section]:first-of-type');
                    const isLastSection = entry.target === document.querySelector('main > [data-section]:last-of-type');
                    const atBoundary = (isFirstSection && isAtTop) || (isLastSection && isAtBottom);

                    const shouldBeVisible = isNavigationTarget ||
                    isCurrentlyActive ||
                    !canScroll ||
                    atBoundary ||
                    (isSectionVisible && isFullyVisible);

                    if (!shouldBeVisible) {
                        entry.target.classList.add('out-of-focus');
                    } else {
                        entry.target.classList.remove('out-of-focus');
                    }
                }
            });

        } finally {
            STATE.isProcessingIntersection = false;
        }
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.SectionManagement = {
        init: initSectionManagement,
        activateSection: activateSection,
        scrollToSection: scrollToSection
    };

    LOG(MODULE, 'Section management module loaded');

})();
