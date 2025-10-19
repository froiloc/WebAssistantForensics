// ============================================================================
// SCRIPT-SECTION-MANAGEMENT.JS - Version 063 (StateManager Migration Complete)
// Section-Management: Scroll-basierte Section-Auswahl
// Vollständig migriert - keine Legacy-Zugriffe mehr
// ============================================================================

(function() {
    'use strict';

    const CONST = window.APP_CONSTANTS;
    const MODULE = 'SECTION';

    // ========================================================================
    // MODUL-LOKALE KONSTANTEN (nicht im State gespeichert)
    // ========================================================================
    const MIN_DWELL_TIME = 10000; // 10 seconds
    const sectionEnterTime = {};

    // ========================================================================
    // MODUL-LOKALE VARIABLEN (nicht im State gespeichert)
    // ========================================================================

    // DOM-Elemente können NICHT serialisiert werden
    // Daher als Modul-Variable statt in STATE/StateManager
    let allSections = [];

    // ========================================================================
    // INITIALISIERUNG
    // ========================================================================

    function initSectionManagement() {
        LOG(MODULE, 'Initializing section management...');

        // DOM-Elemente können NICHT im StateManager gespeichert werden
        // Sie bleiben in STATE (nicht serialisierbar)
        allSections = Array.from(document.querySelectorAll('main > [data-section]'));

        LOG(MODULE, `Found ${allSections.length} sections:`,
            allSections.map(s => s.dataset.section));

        if (allSections.length > 0) {
            const initialSection = allSections[0].dataset.section;

            // Nur den Section-Namen (String) im StateManager speichern
            if (window.StateManager) {
                window.StateManager.set('sections.currentActive', initialSection);
            }

            allSections[0].classList.add('active');
            LOG.success(MODULE, `Initial active section: ${initialSection}`);
        }

        initScrollHandling();
        initFocusObserver();
        initSectionTracking();

        LOG.success(MODULE, 'Section management initialized');
    }

    // Enhance the existing scrollToSection function or create new timing logic
    function initSectionTracking() {
        LOG(MODULE, 'Initializing section tracking...');

        // Listen for section activation and track dwell time
        window.addEventListener('sectionActivated', (e) => {
            const sectionId = e.detail.sectionId;
            const timestamp = e.detail.timestamp;

            // Check previous sections for minimum dwell time
            for (const [prevSectionId, enterTime] of Object.entries(sectionEnterTime)) {
                if (prevSectionId !== sectionId) {
                    const dwellTime = timestamp - enterTime;

                    if (dwellTime >= MIN_DWELL_TIME) {
                        LOG.debug(MODULE, `Section ${prevSectionId} visited (dwelled ${dwellTime}ms)`);

                        // Emit clean, generic event for consumers
                        window.dispatchEvent(new CustomEvent('sectionVisited', {
                            detail: {
                                sectionId: prevSectionId,
                                dwellTime: dwellTime,
                                timestamp: timestamp
                            }
                        }));
                    } else {
                        LOG.debug(MODULE, `Section ${prevSectionId} skipped (dwelled only ${dwellTime}ms)`);
                    }

                    // Clean up tracking
                    delete sectionEnterTime[prevSectionId];
                }
            }

            // Track new section entry
            sectionEnterTime[sectionId] = timestamp;
        });

        LOG.success(MODULE, 'Section tracking initialized');
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

        // MIGRIERT: userIsScrolling und scrollTimeout
        window.addEventListener('scroll', () => {
            if (window.StateManager) {
                // userIsScrolling auf true setzen
                window.StateManager.set('scroll.userIsScrolling', true);

                // Timeout löschen falls vorhanden
                const currentTimeout = window.StateManager.get('scroll.scrollTimeout');
                if (currentTimeout) {
                    clearTimeout(currentTimeout);
                }

                // Neuen Timeout setzen
                const timeoutId = setTimeout(() => {
                    window.StateManager.set('scroll.userIsScrolling', false);
                }, 200);
                window.StateManager.set('scroll.scrollTimeout', timeoutId);
            }

            // isProcessingScroll Check und Update
            const isProcessing = window.StateManager.get('scroll.isProcessingScroll');

            if (!isProcessing) {
                if (window.StateManager) {
                    window.StateManager.set('scroll.isProcessingScroll', true);
                }

                updateActiveSectionFromScroll();

                setTimeout(() => {
                    if (window.StateManager) {
                        window.StateManager.set('scroll.isProcessingScroll', false);
                    }
                }, 50);
            }
        }, { passive: true });

        LOG.success(MODULE, 'Scroll event listeners initialized');
    }

    // ========================================================================
    // SCROLL-INTENTION-HANDLER
    // ========================================================================

    // MIGRIERT: lastScrollIntentionTime
    function handleScrollIntention(direction) {
        const timestamp = Date.now();

        // StateManager verwenden für lastScrollIntentionTime
        const lastIntentionTime = window.StateManager.get('scroll.lastScrollIntentionTime') || 0;

        if (timestamp - lastIntentionTime < CONST.SCROLL_INTENTION_COOLDOWN) {
            return;
        }

        if (window.StateManager) {
            window.StateManager.set('scroll.lastScrollIntentionTime', timestamp);
        }

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
        const currentActive = window.StateManager.get('sections.currentActive');

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
        // scrollCallCounter über StateManager
        const currentCounter = window.StateManager.get('scroll.scrollCallCounter');
        const callId = (currentCounter || 0) + 1;

        if (window.StateManager) {
            window.StateManager.set('scroll.scrollCallCounter', callId);
        }

        LOG.separator(MODULE, `Scroll Event #${callId}`);

        const candidates = collectVisibleSections();
        const winner = determineWinner(candidates);

        const currentActive = getCurrentActiveSection();

        if (winner && winner.id !== currentActive) {
            const timestamp = Date.now();
            const lastChangeTime =  window.StateManager.get('sections.lastSectionChangeTime') || 0;
            const timeSinceLastChange = timestamp - lastChangeTime;

            if (timeSinceLastChange < CONST.SECTION_CHANGE_COOLDOWN) {
                LOG.debug(MODULE, `Cooldown active: ${timeSinceLastChange}ms < ${CONST.SECTION_CHANGE_COOLDOWN}ms`);
                return;
            }

            LOG(MODULE, `Section change: ${currentActive} → ${winner.id}`);
            activateSection(winner.id);
        } else if (winner) {
            LOG.debug(MODULE, `No change: Winner already active (${winner.id})`);
        }
    }

    function collectVisibleSections() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const isAtBottom = scrollY + viewportHeight >= document.documentElement.scrollHeight - 5;
        const isAtTop = scrollY <= 5;

        LOG.debug(MODULE, `Collect: scrollY=${scrollY}, isAtBottom=${isAtBottom}, isAtTop=${isAtTop}`);

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
            `IDs=[${visibleSections.map(c => c.id).join(', ')}]`);

        // RULE3: FIRST/LAST BEI BOTTOM/TOP
        if (visibleSections.length === 0) {
            if (isAtBottom) {
                const lastSection = allSections[allSections.length - 1];
                LOG.debug(MODULE, `RULE3: At bottom, adding last section: ${lastSection.dataset.section}`);
                visibleSections.push({
                    id: lastSection.dataset.section,
                    element: lastSection,
                    sectionInViewportRatio: 0,
                    viewportOccupancyRatio: 0,
                    reason: 'rule3-atBottom'
                });
            } else if (isAtTop) {
                const firstSection = allSections[0];
                LOG.debug(MODULE, `RULE3: At top, adding first section: ${firstSection.dataset.section}`);
                visibleSections.push({
                    id: firstSection.dataset.section,
                    element: firstSection,
                    sectionInViewportRatio: 0,
                    viewportOccupancyRatio: 0,
                    reason: 'rule3-atTop'
                });
            }
        }

        // RULE4: BEI TOP DIE ERSTEN SECTIONS EINBEZIEHEN
        if (isAtTop && visibleSections.length < 3) {
            allSections.slice(0, 3).forEach((section, index) => {
                if (!visibleSections.find(c => c.id === section.dataset.section)) {
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
            const currentActive = getCurrentActiveSection();
            LOG.warn(MODULE, `FALLBACK: No candidates found, keeping current: ${currentActive}`);

            const currentActiveIndex = allSections.findIndex(
                s => s.dataset.section === currentActive
            );

            if (currentActiveIndex !== -1) {
                const activeSection = allSections[currentActiveIndex];
                const rect = activeSection.getBoundingClientRect();

                visibleSections.push({
                    id: currentActive,
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

    // MIGRIERT: lastScrollY und lastDirection
    function determineWinner(candidates) {
        if (candidates.length === 0) {
            LOG.warn(MODULE, 'No candidates for winner selection');
            return null;
        }

        if (candidates.length === 1) {
            LOG.debug(MODULE, `Only one candidate: ${candidates[0].id}`);
            return candidates[0];
        }

        // DIRECTION LOCK - MIGRIERT
        const scrollY = window.scrollY;
        const lastScrollY = window.StateManager.get('scroll.lastScrollY') || 0;
        const scrollDelta = scrollY - lastScrollY;

        const lastDirection = window.StateManager.get('scroll.lastDirection') || 'down';
        const direction = scrollDelta > 0 ? 'down' : (scrollDelta < 0 ? 'up' : lastDirection);

        // StateManager verwenden
        if (window.StateManager) {
            window.StateManager.set('scroll.lastScrollY', scrollY);
            window.StateManager.set('scroll.lastDirection', direction);
        }

        const currentActive = getCurrentActiveSection();
        const currentIndex = allSections.findIndex(s => s.dataset.section === currentActive);

        let filtered = candidates.filter(c => {
            const cIndex = allSections.findIndex(s => s.dataset.section === c.id);

            if (direction === 'down') {
                return cIndex >= currentIndex;
            } else if (direction === 'up') {
                return cIndex <= currentIndex;
            }
            return true;
        });

        LOG.debug(MODULE, `Direction lock ${direction.toUpperCase()}: Filtered from ${candidates.length} to ${filtered.length}`);

        if (filtered.length === 0) {
            filtered = candidates;
        }

        // SCORING
        LOG.separator(MODULE, 'Scoring Results');
        const scored = filtered.map(c => {
            const isActive = c.id === currentActive;
            const activeBonus = isActive ? 50 : 0;
            const score = (c.viewportOccupancyRatio * 300) + activeBonus;

            LOG(MODULE, `${c.id}: score=${Math.round(score)} (viewportRatio=${(c.viewportOccupancyRatio*100).toFixed(1)}%, active=${isActive})`);

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
        allSections.forEach(s => s.classList.remove('active'));
        section.classList.add('active');

        const timestamp = Date.now();

        // StateManager verwenden
        if (window.StateManager) {
            window.StateManager.set('sections.currentActive', sectionId);
            window.StateManager.set('sections.lastSectionChangeTime', timestamp);
            window.StateManager.set('sections.lastChangedToSection', sectionId);
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
        // Wird im StateManager unter observers.focusObserver gespeichert (nicht persistiert)
        if (window.StateManager) {
            window.StateManager.set('observers.focusObserver', observer);
        }

        // DOM-Elemente sind in STATE
        allSections.forEach(section => {
            observer.observe(section);
        });

        LOG.success(MODULE, `Intersection Observer initialized for ${allSections.length} sections`);
    }

    function handleIntersection(entries, observer) {
        const timestamp = Date.now();

        // isProcessingIntersection über StateManager
        const isProcessing = window.StateManager.get('scroll.isProcessingIntersection');

        if (isProcessing) {
            return;
        }

        // StateManager verwenden
        if (window.StateManager) {
            window.StateManager.set('scroll.isProcessingIntersection', true);
        }

        try {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            const canScroll = documentHeight > viewportHeight + 10;
            const isAtTop = scrollY === 0;
            const isAtBottom = scrollY + viewportHeight >= documentHeight - 10;

            // lastNavigationTime über StateManager
            const lastNavTime = window.StateManager.get('sections.lastNavigationTime') || 0;
            const navigationPriorityActive = timestamp - lastNavTime < CONST.NAVIGATION_PRIORITY_DURATION;

            // lastNavigatedSection über StateManager
            const lastNavSection = window.StateManager.get('sections.lastNavigatedSection');

            entries.forEach(entry => {
                const sectionId = entry.target.dataset.section;
                const isNavigationTarget = sectionId === lastNavSection && navigationPriorityActive;

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
                }
            }, 100);
        }
    }

    // ========================================================================
    // HELPER FUNCTIONS
    // ========================================================================

    function getCurrentActiveSection() {
        return window.StateManager.get('sections.currentActive');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.SectionManagement = {
        init: initSectionManagement,
        scrollToSection: scrollToSection,
        activateSection: activateSection,
        getCurrentActive: getCurrentActiveSection,
        getAllSections: function() {
            return allSections;
        }
    };

    LOG(MODULE, 'Section management module loaded');

})();
