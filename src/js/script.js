// ===== GLOBALE VARIABLEN =====
let currentLevel = 1;
let notesOpen = false;
let saveTimeout = null;

// Neue Variablen für Navigation und Tracking
let menuOpen = false;
let navSidebarOpen = false;
let historyModalOpen = false;
let tipsVisible = true;
let currentTipIndex = 0;
let tipInterval = null;
let sectionHistory = [];
let timeFormatRelative = true;

// Neue Variablen für Scroll-Awareness und Navigation-Priorisierung
let lastScrollY = window.scrollY;
let lastScrollDirection = 'down';
let lastNavigatedSection = null;
let lastNavigationTime = 0;
const NAVIGATION_PRIORITY_DURATION = 5000;

// Variablen für Section-Focus-Timer
let sectionFocusTimer = null;
let sectionFocusStartTime = null;

let isProcessingIntersection = false;
let lastSectionChangeTime = 0;
let lastChangedToSection = null;
let userIsScrolling = false;
let scrollTimeout = null;
const SECTION_CHANGE_COOLDOWN = 150;
let lastEndScrollAttempt = 0;
const END_SCROLL_DELAY = 200;

// Globale Variable (falls noch nicht vorhanden)
let scrollCallCounter = 0; // NEU: Zähler für jeden Aufruf
let isProcessingScroll = false;
let recentScrollDeltas = []; // NEU: Tracking der letzten Scroll-Deltas
const MAX_SCROLL_HISTORY = 3; // NEU: Letzte 3 Scroll-Events tracken

let currentActiveSection = 'intro';
let allSections = [];
let lastScrollIntentionTime = 0;
const SCROLL_INTENTION_COOLDOWN = 200; // ms

// ===== TIPPS-ARRAY =====
const tips = [
    "💡 Tipp: Nutzen Sie Alt+1, Alt+2, Alt+3, um schnell zwischen Detailebenen zu wechseln",
    "⌨️ Tastenkombination: ESC schließt den Notizblock, den Agenten und geöffnete Fenster",
    "📝 Ihre Notizen werden automatisch gespeichert und bleiben auch nach dem Schließen erhalten",
    "🔍 Klicken Sie doppelt auf Navigationseinträge, um direkt zum Abschnitt zu springen",
    "📜 Der Verlauf zeigt alle besuchten Abschnitte - öffnen Sie ihn über das Menü oben links",
    "🎯 Fokussierte Abschnitte werden hervorgehoben - andere erscheinen transparent",
    "⚡ Templates sparen Zeit: Speichern Sie häufig genutzte Export-Konfigurationen",
    "📖 Taggen Sie wichtige Beweise vor dem Export für fokussierte Reports",
    "🌐 HTML-Reports eignen sich besonders für Chat-Analysen und mehrsprachige Inhalte",
    "💾 Alle Ihre Einstellungen werden lokal im Browser gespeichert"
];

// ===== INITIALISIERUNG =====
document.addEventListener('DOMContentLoaded', function() {
    initDetailLevelControls();
    initNotesFeature();
    initFocusObserver();
    loadNotesFromStorage();
    initMenu();
    initNavSidebar();
    initHistoryModal();
    initTipsFooter();
    initBreadcrumb();
    loadUserPreferences();
});

// Initialisierung
function initScrollHandling() {
    allSections = Array.from(document.querySelectorAll('main > [data-section]'));

    // 1. Wheel-Event
    window.addEventListener('wheel', (e) => {
        handleScrollIntention(e.deltaY > 0 ? 'down' : 'up');
    }, { passive: false });

    // 2. Keyboard-Events
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

    // 3. Touch-Events
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

    // 4. Normaler Scroll-Event (für Positions-Updates)
    window.addEventListener('scroll', () => {
        updateActiveSectionFromScroll();
    }, { passive: true });
}

function handleScrollIntention(direction) {
    const timestamp = Date.now();

    // Cooldown um Event-Spam zu verhindern
    if (timestamp - lastScrollIntentionTime < SCROLL_INTENTION_COOLDOWN) {
        return;
    }
    lastScrollIntentionTime = timestamp;

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const isAtBottom = scrollY + viewportHeight >= documentHeight - 5;
    const isAtTop = scrollY <= 5;

    console.log(`[INTENTION] ${direction}, bottom: ${isAtBottom}, top: ${isAtTop}`);

    if (isAtBottom && direction === 'down') {
        handleEndScroll('down');
    } else if (isAtTop && direction === 'up') {
        handleEndScroll('up');
    }
    // Bei normalem Scroll passiert nichts hier - scroll-Event behandelt es
}

function handleEndScroll(direction) {
    const currentActiveIndex = allSections.findIndex(
        s => s.dataset.section === currentActiveSection
    );

    if (direction === 'down' && currentActiveIndex < allSections.length - 1) {
        const nextSection = allSections[currentActiveIndex + 1];
        activateSection(nextSection.dataset.section);
    } else if (direction === 'up' && currentActiveIndex > 0) {
        const prevSection = allSections[currentActiveIndex - 1];
        activateSection(prevSection.dataset.section);
    }
}

function activateSection(sectionId) {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (!section) return;

    console.log(`[ACTIVATE] ${currentActiveSection} -> ${sectionId}`);

    allSections.forEach(s => s.classList.remove('active'));
    section.classList.add('active');

    currentActiveSection = sectionId;
    updateActiveNavItem();

    const sectionTitle = section.dataset.title ||
    section.querySelector('h2')?.textContent ||
    'Unbenannt';
            updateBreadcrumb(sectionTitle);
}

function updateActiveSectionFromScroll() {
    // Ihre neue Logik mit Regeln 1-4
    const candidates = collectVisibleSections();
    const winner = determineWinner(candidates);

    if (winner && winner.id !== currentActiveSection) {
        activateSection(winner.id);
    }
}

// Debug-Info output no: 037

function collectVisibleSections() {
    const visibleSections = [];
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const isAtBottom = scrollY + viewportHeight >= documentHeight - 5;
    const isAtTop = scrollY <= 5;

    console.log(`[COLLECT-037] scrollY: ${scrollY}, isAtBottom: ${isAtBottom}, isAtTop: ${isAtTop}`);

    allSections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.height;

        // Sichtbare Höhe berechnen
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        const sectionRatio = sectionHeight > 0 ? (visibleHeight / sectionHeight) : 0;
        const viewportRatio = viewportHeight > 0 ? (visibleHeight / viewportHeight) : 0;

        // Regel 1: ≥80% der Section sichtbar
        const rule1 = sectionRatio >= 0.8;

        // Regel 2: ≥40% des Viewports
        const rule2 = viewportRatio >= 0.4;

        const sectionId = section.dataset.section;

        // Log ALLE Sections mit ihren Ratios (auch nicht-kandidaten)
        console.log(`[SECTION-037] ${sectionId} (idx:${index}): sectionRatio=${(sectionRatio*100).toFixed(1)}%, viewportRatio=${(viewportRatio*100).toFixed(1)}%, rule1=${rule1}, rule2=${rule2}`);

        if (rule1 || rule2) {
            visibleSections.push({
                id: sectionId,
                index: index,
                visibleHeight: Math.round(visibleHeight),
                                 sectionHeight: Math.round(sectionHeight),
                                 viewportRatio: Math.round(viewportRatio * 1000) / 10, // 1 Dezimalstelle in %
                                 sectionRatio: Math.round(sectionRatio * 1000) / 10,
                                 element: section,
                                 addedByRule: rule1 && rule2 ? 'rule1+2' : (rule1 ? 'rule1' : 'rule2')
            });
        }
    });

    console.log(`[CANDIDATES-AFTER-RULE1-2] Count: ${visibleSections.length}, IDs: ${visibleSections.map(s => s.id).join(', ')}`);

    // Regel 3: isAtBottom
    if (isAtBottom && visibleSections.length > 0) {
        const maxIndex = Math.max(...visibleSections.map(s => s.index));
        console.log(`[RULE3-CHECK] maxIndex in candidates: ${maxIndex}, total sections: ${allSections.length}`);

        allSections.forEach((section, index) => {
            if (index > maxIndex) {
                const rect = section.getBoundingClientRect();
                const sectionHeight = rect.height;
                const visibleTop = Math.max(rect.top, 0);
                const visibleBottom = Math.min(rect.bottom, viewportHeight);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);

                const sectionRatio = sectionHeight > 0 ? (visibleHeight / sectionHeight) : 0;
                const viewportRatio = viewportHeight > 0 ? (visibleHeight / viewportHeight) : 0;

                const sectionId = section.dataset.section;

                console.log(`[RULE3-ADD] ${sectionId} (idx:${index}): sectionRatio=${(sectionRatio*100).toFixed(1)}%, viewportRatio=${(viewportRatio*100).toFixed(1)}%`);

                visibleSections.push({
                    id: sectionId,
                    index: index,
                    visibleHeight: Math.round(visibleHeight),
                                     sectionHeight: Math.round(sectionHeight),
                                     viewportRatio: Math.round(viewportRatio * 1000) / 10,
                                     sectionRatio: Math.round(sectionRatio * 1000) / 10,
                                     element: section,
                                     addedByRule: 'rule3-atBottom'
                });
            }
        });
    }

    // Regel 4: isAtTop
    if (isAtTop && visibleSections.length > 0) {
        const minIndex = Math.min(...visibleSections.map(s => s.index));
        console.log(`[RULE4-CHECK] minIndex in candidates: ${minIndex}`);

        allSections.forEach((section, index) => {
            if (index < minIndex) {
                const rect = section.getBoundingClientRect();
                const sectionHeight = rect.height;
                const visibleTop = Math.max(rect.top, 0);
                const visibleBottom = Math.min(rect.bottom, viewportHeight);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);

                const sectionRatio = sectionHeight > 0 ? (visibleHeight / sectionHeight) : 0;
                const viewportRatio = viewportHeight > 0 ? (visibleHeight / viewportHeight) : 0;

                const sectionId = section.dataset.section;

                console.log(`[RULE4-ADD] ${sectionId} (idx:${index}): sectionRatio=${(sectionRatio*100).toFixed(1)}%, viewportRatio=${(viewportRatio*100).toFixed(1)}%`);

                visibleSections.push({
                    id: sectionId,
                    index: index,
                    visibleHeight: Math.round(visibleHeight),
                                     sectionHeight: Math.round(sectionHeight),
                                     viewportRatio: Math.round(viewportRatio * 1000) / 10,
                                     sectionRatio: Math.round(sectionRatio * 1000) / 10,
                                     element: section,
                                     addedByRule: 'rule4-atTop'
                });
            }
        });
    }

    console.log(`[FINAL-CANDIDATES-037] Count: ${visibleSections.length}, Details:`,
                visibleSections.map(s => `${s.id}(${s.addedByRule}, vp:${s.viewportRatio}%, sec:${s.sectionRatio}%)`).join(', '));

    return visibleSections;
}

function determineWinner(candidates) {
    if (candidates.length === 0) {
        console.log(`[WINNER-037] No candidates`);
        return null;
    }

    if (candidates.length === 1) {
        console.log(`[WINNER-037] Only one candidate: ${candidates[0].id}`);
        return candidates[0];
    }

    // Scoring
    const scored = candidates.map(c => {
        let score = c.viewportRatio * 10; // Basis-Score: viewport-Ratio

        // Hysterese: Bonus für aktuell aktive Section
        if (c.id === currentActiveSection && c.viewportRatio >= 20) {
            score += 50;
        }

        return {
            ...c,
            score: Math.round(score * 10) / 10
        };
    });

    // Sortiere nach Score
    scored.sort((a, b) => b.score - a.score);

    console.log(`[SCORING-037]`, scored.map(s => `${s.id}: ${s.score}`).join(', '));
    console.log(`[WINNER-037] ${scored[0].id} (score: ${scored[0].score})`);

    return scored[0];
}

function updateActiveSectionFromScroll() {
    const callId = ++scrollCallCounter;
    console.log(`[SCROLL-037-${callId}] ========================================`);

    const candidates = collectVisibleSections();
    const winner = determineWinner(candidates);

    if (winner && winner.id !== currentActiveSection) {
        console.log(`[CHANGE-037-${callId}] ${currentActiveSection} -> ${winner.id}`);
        activateSection(winner.id);
    } else if (winner) {
        console.log(`[NO-CHANGE-037-${callId}] Winner is already active: ${winner.id}`);
    }
}

// Beim Laden initialisieren
document.addEventListener('DOMContentLoaded', initScrollHandling);

// Scroll-Event-Listener initialisieren (beim Laden der Seite / in initFocusObserver)
window.addEventListener('scroll', () => {
    userIsScrolling = true;

    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        userIsScrolling = false;
    }, 200);

    // NEU: Verhindere parallele Ausführungen
    if (!isProcessingScroll) {
        isProcessingScroll = true;
        updateActiveSectionFromScroll();
        // Verzögere Freigabe minimal
        setTimeout(() => {
            isProcessingScroll = false;
        }, 50);
    }
}, { passive: true });

// Debug-Info output no: 035
function updateActiveSectionFromScroll() {
    const callId = ++scrollCallCounter;
    const timestamp = Date.now();

    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollY;
    const direction = scrollDelta > 0 ? 'down' : (scrollDelta < 0 ? 'up' : 'none');

    // NEU: Scroll-Delta-History tracken
    if (scrollDelta !== 0) {
        recentScrollDeltas.push(scrollDelta);
        if (recentScrollDeltas.length > MAX_SCROLL_HISTORY) {
            recentScrollDeltas.shift();
        }
        lastDirection = direction;
        lastScrollY = scrollY;
    }

    const viewportHeight = window.innerHeight;
    const currentActive = currentActiveSection;

    const documentHeight = document.documentElement.scrollHeight;
    const isAtTop = scrollY === 0;
    const isAtBottom = scrollY + viewportHeight >= documentHeight - 10;

    const navigationPriorityActive = timestamp - lastNavigationTime < NAVIGATION_PRIORITY_DURATION;
    const timeSinceLastChange = timestamp - lastSectionChangeTime;
    const inCooldown = timeSinceLastChange < SECTION_CHANGE_COOLDOWN;

    const allSections = Array.from(document.querySelectorAll('main > [data-section]'));
    const currentActiveIndex = allSections.findIndex(s => s.dataset.section === currentActive);

    // Sammle sichtbare Sections
    let visibleSections = [];

    allSections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.height;
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

        if (visibleHeight > 0 && visibleHeight / viewportHeight > 0.1) {
            const visibilityRatio = (visibleHeight / viewportHeight) * 100;
            const sectionId = section.dataset.section;
            const isCurrentlyActive = sectionId === currentActive;

            visibleSections.push({
                id: sectionId,
                ratio: Math.round(visibilityRatio * 10) / 10,
                top: Math.round(rect.top),
                bottom: Math.round(rect.bottom),
                active: isCurrentlyActive,
                height: Math.round(sectionHeight),
                index: index,
                element: section
            });
        }
    });

    if (visibleSections.length === 0) {
        return;
    }

    let candidates = [...visibleSections];

    // Navigation Priority Filter
    if (navigationPriorityActive && lastNavigatedSection) {
        const navTarget = candidates.find(s => s.id === lastNavigatedSection);
        if (navTarget) {
            candidates = [navTarget];
        }
    }

    // Direction Lock Filter
    if (candidates.length > 1 && currentActiveIndex !== -1 && direction !== 'none') {
        if (direction === 'down') {
            const filtered = candidates.filter(s => s.index >= currentActiveIndex);
            if (filtered.length > 0) {
                candidates = filtered;
            }
        } else if (direction === 'up') {
            const filtered = candidates.filter(s => s.index <= currentActiveIndex);
            if (filtered.length > 0) {
                candidates = filtered;
            }
        }
    }

    // Scoring OHNE Hysterese für End-Check
    const scoredCandidatesForCheck = candidates.map(section => {
        let score = section.ratio * 100;

        if (section.ratio < 15) {
            score -= 100;
        }

        if (!section.active && section.ratio < 25) {
            score -= 50;
        }

        return {
            id: section.id,
            score: Math.round(score * 10) / 10,
            index: section.index,
            element: section.element
        };
    });

    scoredCandidatesForCheck.sort((a, b) => b.score - a.score);
    const potentialWinner = scoredCandidatesForCheck[0];

    // NEU: Prüfe auf konsistente Down-Scroll-Bewegung
    const recentDownScrolls = recentScrollDeltas.filter(d => d > 0).length;
    const hasConsistentDownScroll = recentScrollDeltas.length >= 2 && recentDownScrolls >= 2;

    // Spezialfall - Am Ende und konsistenter Down-Scroll
    if (isAtBottom && hasConsistentDownScroll && currentActiveIndex !== -1) {
        console.log(`[END-CHECK-035-${callId}]`, JSON.stringify({
            isAtBottom: isAtBottom,
            recentScrollDeltas: recentScrollDeltas,
            hasConsistentDownScroll: hasConsistentDownScroll,
            currentScrollDelta: scrollDelta
        }));

        const lastSectionIndex = allSections.length - 1;

        if (currentActiveIndex < lastSectionIndex) {
            const timeSinceLastEndScroll = timestamp - lastEndScrollAttempt;

            if (timeSinceLastEndScroll < END_SCROLL_DELAY) {
                console.log(`[FORCE-DELAY-035-${callId}] ${timeSinceLastEndScroll}ms < ${END_SCROLL_DELAY}ms`);
            } else {
                const nextSection = allSections[currentActiveIndex + 1];

                if (!nextSection) {
                    console.error(`[ERROR-035-${callId}] nextSection undefined`);
                    return;
                }

                const nextSectionId = nextSection.dataset.section;

                const nextSectionInCandidates = scoredCandidatesForCheck.find(c => c.id === nextSectionId);
                const currentSectionInCandidates = scoredCandidatesForCheck.find(c => c.id === currentActive);
                const currentSectionScore = currentSectionInCandidates?.score || 0;

                const cond1_nextVisible = !!nextSectionInCandidates;
                const cond2_nextNotPotentialWinner = potentialWinner.id !== nextSectionId;
                const cond3_currentWouldWinWithHysterese = (currentSectionScore + 50) > potentialWinner.score;

                const shouldForce = cond1_nextVisible &&
                                   (cond2_nextNotPotentialWinner || cond3_currentWouldWinWithHysterese);

                console.log(`[FORCE-CHECK-035-${callId}]`, JSON.stringify({
                    from: currentActive,
                    to: nextSectionId,
                    shouldForce: shouldForce
                }));

                if (shouldForce) {
                    console.log(`[FORCE-EXECUTE-035-${callId}] ${currentActive} -> ${nextSectionId}`);

                    try {
                        allSections.forEach(s => {
                            if (s && s.classList) {
                                s.classList.remove('active');
                            }
                        });

                        if (nextSection && nextSection.classList) {
                            nextSection.classList.add('active');
                        }

                        currentActiveSection = nextSectionId;
                        updateActiveNavItem();

                        lastSectionChangeTime = timestamp;
                        lastChangedToSection = nextSectionId;
                        lastEndScrollAttempt = timestamp;

                        // NEU: Setze Navigation-Priority nur für 250ms
                        lastNavigationTime = timestamp;
                        lastNavigatedSection = nextSectionId;

                        // NEU: Reset Scroll-History nach Force
                        recentScrollDeltas = [];

                        const sectionTitle = nextSection.dataset.title ||
                                            nextSection.querySelector('h2')?.textContent ||
                                            'Unbenannt';
                        updateBreadcrumb(sectionTitle);

                        console.log(`[SUCCESS-035-${callId}]`);
                        return;
                    } catch (error) {
                        console.error(`[ERROR-035-${callId}]`, error.message);
                    }
                }
            }
        }
    }

    // Normales Scoring MIT Hysterese
    const scoredCandidates = candidates.map(section => {
        let score = section.ratio * 100;

        if (section.active && section.ratio >= 20) {
            score += 50;
        }

        if (section.ratio < 15) {
            score -= 100;
        }

        if (!section.active && section.ratio < 25) {
            score -= 50;
        }

        return {
            id: section.id,
            score: Math.round(score * 10) / 10,
            index: section.index,
            element: section.element
        };
    });

    scoredCandidates.sort((a, b) => b.score - a.score);
    const winner = scoredCandidates[0];

    // Cooldown-Prüfung
    if (winner.id !== currentActive && inCooldown && winner.id !== lastChangedToSection) {
        return;
    }

    // Section-Wechsel durchführen
    if (winner.id !== currentActive) {
        console.log(`[CHANGE-035-${callId}] ${currentActive} -> ${winner.id}`);

        allSections.forEach(s => s.classList.remove('active'));
        winner.element.classList.add('active');

        currentActiveSection = winner.id;
        updateActiveNavItem();

        lastSectionChangeTime = timestamp;
        lastChangedToSection = winner.id;

        const sectionTitle = winner.element.dataset.title ||
                            winner.element.querySelector('h2')?.textContent ||
                            'Unbenannt';
        updateBreadcrumb(sectionTitle);
    }
}

// ===== DETAILGRAD-STEUERUNG =====
function initDetailLevelControls() {
    const buttons = document.querySelectorAll('.detail-btn, .detail-btn-mini');

    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const level = parseInt(this.dataset.level);
            setDetailLevel(level);
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key >= '1' && e.key <= '3') {
            e.preventDefault();
            setDetailLevel(parseInt(e.key));
        }
    });

    updateDetailVisibility();
}

function setDetailLevel(level) {
    currentLevel = level;

    const allButtons = document.querySelectorAll('.detail-btn, .detail-btn-mini');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });

    const activeButtons = document.querySelectorAll(
        `.detail-btn[data-level="${level}"], .detail-btn-mini[data-level="${level}"]`
    );
    activeButtons.forEach(btn => {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
    });

    updateDetailVisibility();
    updateInfoText(level);
    saveUserPreferences();
}

function updateDetailVisibility() {
    const level1Elements = document.querySelectorAll('.detail-level-1');
    level1Elements.forEach(el => el.style.display = 'block');

    const level2Elements = document.querySelectorAll('.detail-level-2');
    level2Elements.forEach(el => {
        el.style.display = currentLevel >= 2 ? 'block' : 'none';
    });

    const level3Elements = document.querySelectorAll('.detail-level-3');
    level3Elements.forEach(el => {
        el.style.display = currentLevel >= 3 ? 'block' : 'none';
    });
}

function updateInfoText(level) {
    const infoTexts = {
        1: 'Basis - Grundlegende Schritte',
        2: 'Standard - Wichtigste Einstellungen und Erklärungen',
        3: 'Vollständig - Alle Details, Optionen und Best Practices'
    };

    const infoElement = document.getElementById('current-level-text');
    if (infoElement) {
        infoElement.textContent = infoTexts[level];
    }
}

// ===== NOTIZBLOCK-FUNKTIONALITÄT =====
function initNotesFeature() {
    const toggleBtn = document.getElementById('notes-toggle');
    const clearBtn = document.getElementById('clear-notes');
    const textarea = document.getElementById('notes-textarea');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleNotes);
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', clearNotes);
    }

    if (textarea) {
        textarea.addEventListener('input', function() {
            autoSaveNotes();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && notesOpen) {
            toggleNotes();
        }
    });
}

function toggleNotes() {
    notesOpen = !notesOpen;
    const body = document.body;
    const toggleBtn = document.getElementById('notes-toggle');

    if (notesOpen) {
        body.classList.add('notes-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.setAttribute('aria-label', 'Notizblock schließen');
    } else {
        body.classList.remove('notes-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Notizblock öffnen');
    }
}

function clearNotes() {
    if (confirm('Möchten Sie wirklich alle Notizen löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
        const textarea = document.getElementById('notes-textarea');
        if (textarea) {
            textarea.value = '';
            saveNotesToStorage('');
            showSaveIndicator();
        }
    }
}

function autoSaveNotes() {
    if (saveTimeout) {
        clearTimeout(saveTimeout);
    }

    saveTimeout = setTimeout(function() {
        const textarea = document.getElementById('notes-textarea');
        if (textarea) {
            saveNotesToStorage(textarea.value);
            showSaveIndicator();
        }
    }, 1000);
}

function saveNotesToStorage(content) {
    try {
        localStorage.setItem('axiom-guide-notes', content);
    } catch (e) {
        console.error('Fehler beim Speichern der Notizen:', e);
    }
}

function loadNotesFromStorage() {
    try {
        const savedNotes = localStorage.getItem('axiom-guide-notes');
        const textarea = document.getElementById('notes-textarea');

        if (savedNotes && textarea) {
            textarea.value = savedNotes;
        }
    } catch (e) {
        console.error('Fehler beim Laden der Notizen:', e);
    }
}

function showSaveIndicator() {
    const indicator = document.getElementById('save-indicator');

    if (indicator) {
        indicator.classList.add('visible');

        setTimeout(function() {
            indicator.classList.remove('visible');
        }, 2000);
    }
}

// ===== FOKUS-OBSERVER FÜR SECTIONS =====
function initFocusObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1.0]
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // NEU: Prüfe ob Content komplett im Viewport passt
    checkIfFullyVisible();
    window.addEventListener('resize', checkIfFullyVisible);
}

function checkIfFullyVisible() {
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    // Wenn kein Scrollen möglich ist, entferne alle out-of-focus Klassen
    if (documentHeight <= viewportHeight) {
        const allSections = document.querySelectorAll('.content-section');
        allSections.forEach(section => {
            section.classList.remove('out-of-focus');
        });
    }
}

function handleIntersection(entries, observer) {
    const timestamp = Date.now();

    if (isProcessingIntersection) {
        console.log(`[OBSERVER BLOCKED] ${new Date(timestamp).toISOString()}`);
        return;
    }

    isProcessingIntersection = true;

    try {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const currentActive = currentActiveSection; // NUR LESEN

        const documentHeight = document.documentElement.scrollHeight;
        const canScroll = documentHeight > viewportHeight + 10;
        const isAtTop = scrollY === 0;
        const isAtBottom = scrollY + viewportHeight >= documentHeight - 10;

        const navigationPriorityActive = timestamp - lastNavigationTime < NAVIGATION_PRIORITY_DURATION;

        console.log(`[OBSERVER CALLED] ${new Date(timestamp).toISOString()} - Entries: ${entries.length}, CurrentActive: ${currentActive}`);

        // NUR Transparenz-Update, KEINE Section-Auswahl mehr
        entries.forEach(entry => {
            const sectionId = entry.target.dataset.section;
            const isNavigationTarget = sectionId === lastNavigatedSection && navigationPriorityActive;
            const isCurrentlyActive = sectionId === currentActive;

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

        console.log(`[OBSERVER DONE] ${new Date(timestamp).toISOString()}`);

    } finally {
        isProcessingIntersection = false;
    }
}

// ===== MENÜ-FUNKTIONALITÄT =====
function initMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const showHistoryBtn = document.getElementById('show-history-btn');
    const toggleNavBtn = document.getElementById('toggle-nav-sidebar-btn');
    const toggleTipsBtn = document.getElementById('toggle-tips-footer-btn');

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    if (showHistoryBtn) {
        showHistoryBtn.addEventListener('click', function() {
            openHistoryModal();
            closeMenu();
        });
    }

    if (toggleNavBtn) {
        toggleNavBtn.addEventListener('click', function() {
            toggleNavSidebar();
            closeMenu();
        });
    }

    if (toggleTipsBtn) {
        toggleTipsBtn.addEventListener('click', function() {
            toggleTipsFooter();
            closeMenu();
        });
    }

    document.addEventListener('click', function(e) {
        if (menuOpen && !e.target.closest('.top-nav') && !e.target.closest('.menu-dropdown')) {
            closeMenu();
        }
    });
}

function toggleMenu() {
    menuOpen = !menuOpen;
    const menuDropdown = document.getElementById('menu-dropdown');
    const menuToggle = document.getElementById('menu-toggle');

    if (menuOpen) {
        menuDropdown.classList.add('open');
        menuDropdown.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
    } else {
        closeMenu();
    }
}

function closeMenu() {
    menuOpen = false;
    const menuDropdown = document.getElementById('menu-dropdown');
    const menuToggle = document.getElementById('menu-toggle');

    if (menuDropdown) {
        menuDropdown.classList.remove('open');
        menuDropdown.setAttribute('aria-hidden', 'true');
    }

    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// ===== NAVIGATION SIDEBAR =====
function initNavSidebar() {
    buildNavigationTree();

    const closeBtn = document.getElementById('close-nav-sidebar');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNavSidebar);
    }

    updateActiveNavItem();
}

function buildNavigationTree() {
    const navTree = document.querySelector('.nav-tree');
    if (!navTree) return;

    const sections = document.querySelectorAll('.content-section[data-section]');
    navTree.innerHTML = '';

    sections.forEach(section => {
        const sectionId = section.dataset.section;
        const sectionTitle = section.dataset.title || section.querySelector('h2')?.textContent || 'Unbenannt';

        const li = document.createElement('li');
        const navItem = document.createElement('div');
        navItem.className = 'nav-item';
        navItem.dataset.section = sectionId;

        navItem.innerHTML = `
            <span class="nav-item-icon">▶</span>
            <span class="nav-item-text">${sectionTitle}</span>
        `;

        let clickTimer = null;
        const CLICK_DELAY = 250;

        navItem.addEventListener('click', function(e) {
            const self = this;
            const targetSectionId = sectionId;

            if (clickTimer !== null) {
                clearTimeout(clickTimer);
                clickTimer = null;

                scrollToSection(targetSectionId);

                if (window.innerWidth <= 1024) {
                    closeNavSidebar();
                }
            } else {
                clickTimer = setTimeout(function() {
                    self.classList.toggle('expanded');
                    clickTimer = null;
                }, CLICK_DELAY);
            }
        });

        li.appendChild(navItem);
        navTree.appendChild(li);
    });
}

function updateActiveNavItem() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (currentActiveSection && item.dataset.section === currentActiveSection) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function toggleNavSidebar() {
    navSidebarOpen = !navSidebarOpen;
    const sidebar = document.getElementById('nav-sidebar');

    if (navSidebarOpen) {
        sidebar.classList.add('open');
        document.body.classList.add('nav-sidebar-open');
    } else {
        closeNavSidebar();
    }

    saveUserPreferences();
}

function closeNavSidebar() {
    navSidebarOpen = false;
    const sidebar = document.getElementById('nav-sidebar');
    sidebar.classList.remove('open');
    document.body.classList.remove('nav-sidebar-open');
    saveUserPreferences();
}

function scrollToSection(sectionId) {
    const section = document.querySelector(`main > [data-section="${sectionId}"]`);

    if (!section) {
        console.warn(`Section mit ID "${sectionId}" nicht gefunden`);
        return;
    }

    // Navigation Priority VOR dem Scroll setzen
    lastNavigatedSection = sectionId;
    lastNavigationTime = Date.now();

    // Sofort out-of-focus entfernen (verhindert Flackern)
    section.classList.remove('out-of-focus');

    const topNavHeight = 60;
    const viewportHeight = window.innerHeight;

    // Prüfe ob es die letzte Section ist
    const allSections = document.querySelectorAll('main > [data-section]');
    const isLastSection = section === allSections[allSections.length - 1];

    let targetPosition;

    if (isLastSection) {
        const sectionHeight = section.offsetHeight;
        const maxScroll = document.documentElement.scrollHeight - viewportHeight;

        // Wenn Section kleiner als Viewport (minus TopNav), scrolle bis ganz unten
        if (sectionHeight <= viewportHeight - topNavHeight) {
            targetPosition = maxScroll;
            console.log(`[Navigation] Letzte Section "${sectionId}" passt in Viewport (${sectionHeight}px <= ${viewportHeight - topNavHeight}px) -> Scroll bis ganz unten (${maxScroll}px)`);
        } else {
            // Section zu groß für Viewport: Springe zum Anfang
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - topNavHeight;
            targetPosition = offsetPosition - 20;
            console.log(`[Navigation] Letzte Section "${sectionId}" zu groß für Viewport (${sectionHeight}px > ${viewportHeight - topNavHeight}px) -> Scroll zum Anfang (${targetPosition}px)`);
        }
    } else {
        // Normale Section: Standard-Verhalten
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - topNavHeight;
        targetPosition = offsetPosition - 20;
        console.log(`[Navigation] Normale Section "${sectionId}" -> Scroll zu Position ${targetPosition}px`);
    }

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });

    section.classList.add('scroll-highlight');
    setTimeout(() => {
        section.classList.remove('scroll-highlight');
    }, 2000);

    const sectionTitle = section.dataset.title ||
                        section.querySelector('h2')?.textContent ||
                        'Unbenannt';
    currentActiveSection = sectionId;
    updateActiveNavItem();
    updateBreadcrumb(sectionTitle);
}

// ===== VERLAUFSFENSTER =====
function initHistoryModal() {
    const closeBtn = document.getElementById('close-history-modal');
    const timeFormatToggle = document.getElementById('time-format-toggle');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const modal = document.getElementById('history-modal');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeHistoryModal);
    }

    if (timeFormatToggle) {
        timeFormatToggle.addEventListener('click', toggleTimeFormat);
    }

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearHistory);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && historyModalOpen) {
            closeHistoryModal();
        }
    });

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeHistoryModal();
            }
        });
    }

    loadHistoryFromStorage();
}

function openHistoryModal() {
    historyModalOpen = true;
    const modal = document.getElementById('history-modal');

    if (modal) {
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        updateHistoryDisplay();
    }
}

function closeHistoryModal() {
    historyModalOpen = false;
    const modal = document.getElementById('history-modal');

    if (modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
    }
}

function addToHistory(sectionId, sectionTitle) {
    if (sectionHistory.length > 0) {
        const lastEntry = sectionHistory[sectionHistory.length - 1];
        if (lastEntry.sectionId === sectionId) {
            return;
        }
    }

    const entry = {
        sectionId: sectionId,
        sectionTitle: sectionTitle,
        timestamp: Date.now()
    };

    sectionHistory.push(entry);

    if (sectionHistory.length > 50) {
        sectionHistory.shift();
    }

    saveHistoryToStorage();
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    const historyEmpty = document.getElementById('history-empty');

    if (!historyList || !historyEmpty) return;

    if (sectionHistory.length === 0) {
        historyList.style.display = 'none';
        historyEmpty.style.display = 'block';
        return;
    }

    historyList.style.display = 'block';
    historyEmpty.style.display = 'none';
    historyList.innerHTML = '';

    for (let i = sectionHistory.length - 1; i >= 0; i--) {
        const entry = sectionHistory[i];
        const li = document.createElement('li');
        li.className = 'history-item';
        li.dataset.section = entry.sectionId;

        const timeStr = timeFormatRelative
            ? getRelativeTime(entry.timestamp)
            : getAbsoluteTime(entry.timestamp);

        li.innerHTML = `
            <div class="history-item-title">${entry.sectionTitle}</div>
            <div class="history-item-time">${timeStr}</div>
        `;

        li.addEventListener('click', function() {
            scrollToSection(entry.sectionId);
            closeHistoryModal();
        });

        historyList.appendChild(li);
    }
}

function toggleTimeFormat() {
    timeFormatRelative = !timeFormatRelative;
    const toggleText = document.getElementById('time-format-text');

    if (toggleText) {
        toggleText.textContent = timeFormatRelative ? 'Relativ' : 'Absolut';
    }

    updateHistoryDisplay();
    saveUserPreferences();
}

function getRelativeTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return 'vor wenigen Sekunden';
    } else if (minutes < 60) {
        return `vor ${minutes} Minute${minutes !== 1 ? 'n' : ''}`;
    } else if (hours < 24) {
        return `vor ${hours} Stunde${hours !== 1 ? 'n' : ''}`;
    } else {
        return `vor ${days} Tag${days !== 1 ? 'en' : ''}`;
    }
}

function getAbsoluteTime(timestamp) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

function clearHistory() {
    if (confirm('Möchten Sie wirklich den gesamten Verlauf löschen?')) {
        sectionHistory = [];
        saveHistoryToStorage();
        updateHistoryDisplay();
    }
}

function saveHistoryToStorage() {
    try {
        localStorage.setItem('axiom-guide-history', JSON.stringify(sectionHistory));
    } catch (e) {
        console.error('Fehler beim Speichern des Verlaufs:', e);
    }
}

function loadHistoryFromStorage() {
    try {
        const saved = localStorage.getItem('axiom-guide-history');
        if (saved) {
            sectionHistory = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Fehler beim Laden des Verlaufs:', e);
    }
}

// ===== TIPPS-FOOTER =====
function initTipsFooter() {
    const closeBtn = document.getElementById('close-tips-footer');
    const showBtn = document.getElementById('show-tips-footer-btn');
    const prevBtn = document.getElementById('tips-prev-btn');
    const nextBtn = document.getElementById('tips-next-btn');

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideTipsFooter();
        });
    }

    if (showBtn) {
        showBtn.addEventListener('click', function() {
            showTipsFooter();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousTip);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', showNextTipManual);
    }

    showNextTip();
    startTipRotation();
}

function showNextTip() {
    const tipsText = document.getElementById('tips-text');

    if (tipsText && tips.length > 0) {
        tipsText.textContent = tips[currentTipIndex];
        currentTipIndex = (currentTipIndex + 1) % tips.length;
    }
}

function showPreviousTip() {
    currentTipIndex = (currentTipIndex - 1 + tips.length) % tips.length;
    showCurrentTip();
    resetTipRotation();
}

function showNextTipManual() {
    showNextTip();
    resetTipRotation();
}

function showCurrentTip() {
    const tipsText = document.getElementById('tips-text');

    if (tipsText && tips.length > 0) {
        tipsText.textContent = tips[currentTipIndex];
    }
}

function resetTipRotation() {
    stopTipRotation();
    startTipRotation();
}

function startTipRotation() {
    tipInterval = setInterval(showNextTip, 15000);
}

function stopTipRotation() {
    if (tipInterval) {
        clearInterval(tipInterval);
        tipInterval = null;
    }
}

function hideTipsFooter() {
    tipsVisible = false;
    const tipsFooter = document.getElementById('tips-footer');
    const showBtn = document.getElementById('show-tips-footer-btn');

    if (tipsFooter) {
        tipsFooter.classList.add('hidden');
    }

    if (showBtn) {
        showBtn.style.display = 'inline-block';
    }

    document.body.classList.add('tips-hidden');
    stopTipRotation();
    saveUserPreferences();
}

function showTipsFooter() {
    tipsVisible = true;
    const tipsFooter = document.getElementById('tips-footer');
    const showBtn = document.getElementById('show-tips-footer-btn');

    if (tipsFooter) {
        tipsFooter.classList.remove('hidden');
    }

    if (showBtn) {
        showBtn.style.display = 'none';
    }

    document.body.classList.remove('tips-hidden');
    startTipRotation();
    saveUserPreferences();
}

function toggleTipsFooter() {
    if (tipsVisible) {
        hideTipsFooter();
    } else {
        showTipsFooter();
    }
}

// ===== BREADCRUMB-FUNKTIONALITÄT =====
function updateBreadcrumb(sectionTitle) {
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');

    if (breadcrumbCurrent && sectionTitle) {
        breadcrumbCurrent.textContent = sectionTitle;
    }
}

function initBreadcrumb() {
    const breadcrumbHome = document.getElementById('breadcrumb-home');

    if (breadcrumbHome) {
        breadcrumbHome.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ===== BENUTZER-PRÄFERENZEN SPEICHERN/LADEN =====
function saveUserPreferences() {
    const preferences = {
        navSidebarOpen: navSidebarOpen,
        tipsVisible: tipsVisible,
        timeFormatRelative: timeFormatRelative,
        detailLevel: currentLevel
    };

    try {
        localStorage.setItem('axiom-guide-preferences', JSON.stringify(preferences));
    } catch (e) {
        console.error('Fehler beim Speichern der Einstellungen:', e);
    }
}

function loadUserPreferences() {
    try {
        const saved = localStorage.getItem('axiom-guide-preferences');
        if (saved) {
            const preferences = JSON.parse(saved);

            if (preferences.navSidebarOpen) {
                toggleNavSidebar();
            }

            if (preferences.tipsVisible === false) {
                hideTipsFooter();
            }

            if (preferences.timeFormatRelative !== undefined) {
                timeFormatRelative = preferences.timeFormatRelative;
                const toggleText = document.getElementById('time-format-text');
                if (toggleText) {
                    toggleText.textContent = timeFormatRelative ? 'Relativ' : 'Absolut';
                }
            }

            if (preferences.detailLevel) {
                setDetailLevel(preferences.detailLevel);
            }
        }
    } catch (e) {
        console.error('Fehler beim Laden der Einstellungen:', e);
    }
}

// ===== HILFSFUNKTIONEN =====
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// ===== EXPORT FÜR EXTERNE VERWENDUNG =====
window.axiomGuide = {
    setDetailLevel: setDetailLevel,
    toggleNotes: toggleNotes,
    scrollToElement: scrollToElement,
    toggleMenu: toggleMenu,
    toggleNavSidebar: toggleNavSidebar,
    openHistoryModal: openHistoryModal,
    toggleTipsFooter: toggleTipsFooter,
    scrollToSection: scrollToSection
};
