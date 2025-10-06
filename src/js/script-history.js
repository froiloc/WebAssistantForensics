// ============================================================================
// SCRIPT-HISTORY.JS - Version 058 (StateManager Migration)
// Section-History Tracking mit StateManager-Integration
// ============================================================================

(function() {
    'use strict';

    const STATE = window.APP_STATE;
    const CONST = window.APP_CONSTANTS;
    const MODULE = 'HISTORY';

    // ========================================================================
    // HISTORY MANAGEMENT
    // ========================================================================

    // Tracking für Mindest-Verweilzeit
    let sectionEnterTime = {};
    const MIN_DWELL_TIME = 5000; // 5 Sekunden

    function addToHistory(sectionId) {
        const timestamp = Date.now();

        // History aus StateManager holen (oder Fallback)
        const history = window.StateManager
        ? window.StateManager.get('history.entries')
        : STATE.history;

        // Section-Titel holen
        const sectionTitle = getSectionTitle(sectionId);

        const entry = {
            sectionId: sectionId,
 title: sectionTitle,
 timestamp: timestamp
        };

        history.push(entry);

        // Max-Length einhalten
        const maxLength = window.StateManager
        ? window.StateManager.get('history.maxLength')
        : 50;

        if (history.length > maxLength) {
            history.shift();
        }

        // Zurück in StateManager schreiben (oder Fallback)
        if (window.StateManager) {
            window.StateManager.set('history.entries', history);
        } else {
            STATE.history = history;
            saveHistoryToStorage();
        }

        LOG.debug(MODULE, `Added to history: ${sectionId} (${history.length} entries)`);

        updateHistoryDisplay();
    }

    function clearHistory() {
        if (!confirm('Verlauf wirklich löschen?')) {
            return;
        }

        // StateManager verwenden
        if (window.StateManager) {
            window.StateManager.set('history.entries', []);
        } else {
            STATE.history = [];
            saveHistoryToStorage();
        }

        updateHistoryDisplay();
        LOG(MODULE, 'History cleared');
    }

    // ========================================================================
    // STORAGE (Legacy-Fallback für Nicht-StateManager-Umgebungen)
    // ========================================================================

    function saveHistoryToStorage() {
        // Nur noch Fallback - StateManager übernimmt normalerweise
        if (window.StateManager) {
            LOG.debug(MODULE, 'StateManager handles saving automatically');
            return;
        }

        try {
            localStorage.setItem(
                CONST.STORAGE_KEYS.HISTORY,
                JSON.stringify(STATE.history)
            );
            LOG.debug(MODULE, `Saved ${STATE.history.length} entries to storage (legacy)`);
        } catch (e) {
            LOG.error(MODULE, 'Failed to save to localStorage', e);
        }
    }

    function loadHistoryFromStorage() {
        LOG(MODULE, 'Loading history...');

        // Aus StateManager laden (oder Legacy-Fallback)
        const stored = window.StateManager
        ? window.StateManager.get('history.entries')
        : (function() {
            try {
                const s = localStorage.getItem(CONST.STORAGE_KEYS.HISTORY);
                return s ? JSON.parse(s) : null;
            } catch (e) {
                LOG.error(MODULE, 'Failed to load from localStorage', e);
                return null;
            }
        })();

        if (stored && Array.isArray(stored)) {
            if (!window.StateManager) {
                // Nur bei Fallback direkt in STATE schreiben
                STATE.history = stored;
            }
            LOG.success(MODULE, `Loaded ${stored.length} entries`);
        } else {
            LOG.debug(MODULE, 'No stored history found');
            if (!window.StateManager) {
                STATE.history = [];
            }
        }
    }

    // ========================================================================
    // SIDEBAR
    // ========================================================================

    function initHistorySidebar() {
        // Registriere Shortcut bei SidebarManager
        if (window.SidebarManager) {
            const registered = window.SidebarManager.registerShortcut('history', 'h');

            if (registered) {
                LOG.success(MODULE, 'Shortcut Alt+h registered with SidebarManager');
            } else {
                LOG.warn(MODULE, 'Shortcut Alt+h already taken');
            }
        }

        // Controls initialisieren
        const clearBtn = document.getElementById('clear-history-btn');
        const timeFormatBtn = document.getElementById('time-format-toggle');

        LOG.debug(MODULE, 'Sidebar elements:', {
            clearBtn: !!clearBtn,
            timeFormatBtn: !!timeFormatBtn
        });

        if (clearBtn) {
            clearBtn.addEventListener('click', clearHistory);
            LOG.debug(MODULE, 'Clear button listener attached');
        }

        if (timeFormatBtn) {
            timeFormatBtn.addEventListener('click', toggleTimeFormat);
            LOG.debug(MODULE, 'Time format toggle listener attached');
        }

        LOG.success(MODULE, 'History sidebar initialized');
    }

    function toggleTimeFormat() {
        // Preferences aus StateManager holen
        const currentFormat = window.StateManager
        ? window.StateManager.get('preferences.timeFormat')
        : STATE.preferences.timeFormat;

        const newFormat = currentFormat === 'relative' ? 'absolute' : 'relative';

        // In StateManager speichern (oder Fallback)
        if (window.StateManager) {
            window.StateManager.set('preferences.timeFormat', newFormat);
        } else {
            STATE.preferences.timeFormat = newFormat;
            if (window.Preferences) {
                window.Preferences.save();
            }
        }

        updateHistoryDisplay();

        LOG(MODULE, `Time format toggled: ${currentFormat} → ${newFormat}`);
    }

    function updateHistoryDisplay() {
        const historyList = document.getElementById('history-list');
        const emptyMsg = document.getElementById('history-empty');

        if (!historyList) {
            LOG.warn(MODULE, 'History list element not found');
            return;
        }

        // History aus StateManager holen
        const history = window.StateManager
        ? window.StateManager.get('history.entries')
        : STATE.history;

        const timeFormat = window.StateManager
        ? window.StateManager.get('preferences.timeFormat')
        : STATE.preferences.timeFormat;

        if (!history || history.length === 0) {
            historyList.innerHTML = '';
            if (emptyMsg) emptyMsg.style.display = 'block';
            return;
        }

        // Empty-Message ausblenden wenn Einträge vorhanden
        if (emptyMsg) emptyMsg.style.display = 'none';

        const reversed = [...history].reverse();

        historyList.innerHTML = reversed.map(entry => {
            const timeStr = timeFormat === 'relative'
            ? window.getRelativeTime(entry.timestamp)
            : window.getAbsoluteTime(entry.timestamp);

            return `
            <li class="history-item" data-section="${entry.sectionId}">
            <button class="history-link" data-section="${entry.sectionId}">
            <span class="history-item-title">${entry.title}</span>
            <span class="history-item-time">${timeStr}</span>
            </button>
            </li>
            `;
        }).join('');

        // Event-Listener für History-Items
        historyList.querySelectorAll('.history-link').forEach(link => {
            link.addEventListener('click', () => {
                const sectionId = link.dataset.section;
                if (window.SectionManagement) {
                    window.SectionManagement.scrollToSection(sectionId);
                }
            });
        });

        LOG.debug(MODULE, `History display updated (${history.length} entries, ${timeFormat} format)`);
    }

    function getSectionTitle(sectionId) {
        const section = document.querySelector(`[data-section="${sectionId}"]`);
        if (!section) return sectionId;

        const heading = section.querySelector('h2, h3');
        return heading ? heading.textContent : sectionId;
    }

    // ========================================================================
    // EVENT LISTENERS
    // ========================================================================

    function initEventListeners() {
        LOG(MODULE, 'Initializing event listeners...');

        // Section-Wechsel tracken mit Mindest-Verweilzeit
        window.addEventListener('sectionActivated', (e) => {
            const sectionId = e.detail.sectionId;
            const timestamp = e.detail.timestamp;

            // Vorherige Section: Prüfen ob Mindest-Verweilzeit erreicht
            for (const [prevSectionId, enterTime] of Object.entries(sectionEnterTime)) {
                if (prevSectionId !== sectionId) {
                    const dwellTime = timestamp - enterTime;

                    if (dwellTime >= MIN_DWELL_TIME) {
                        // Mindest-Verweilzeit erreicht → zur History hinzufügen

                        // History aus StateManager holen
                        const history = window.StateManager
                        ? window.StateManager.get('history.entries')
                        : STATE.history;

                        // Nicht hinzufügen wenn es die gleiche Section wie zuletzt ist
                        if (history.length === 0 || history[history.length - 1].sectionId !== prevSectionId) {
                            LOG.debug(MODULE, `Adding ${prevSectionId} to history (dwelled ${dwellTime}ms)`);
                            addToHistory(prevSectionId);
                        } else {
                            LOG.debug(MODULE, `Skipping duplicate entry: ${prevSectionId}`);
                        }
                    } else {
                        LOG.debug(MODULE, `Skipping ${prevSectionId} (dwelled only ${dwellTime}ms < ${MIN_DWELL_TIME}ms)`);
                    }

                    // Enter-Zeit löschen
                    delete sectionEnterTime[prevSectionId];
                }
            }

            // Neue Section: Enter-Zeit setzen
            sectionEnterTime[sectionId] = timestamp;
            LOG.debug(MODULE, `Section ${sectionId} entered at ${timestamp}`);
        });

        // Time-Format-Präferenz ändern → Display aktualisieren
        window.addEventListener('preferencesLoaded', () => {
            updateHistoryDisplay();
        });

        LOG.success(MODULE, 'Event listeners initialized');
    }

    // ========================================================================
    // INITIALISIERUNG
    // ========================================================================

    function initHistory() {
        LOG(MODULE, 'Initializing history module...');

        loadHistoryFromStorage();
        initHistorySidebar();
        initEventListeners();
        updateHistoryDisplay();

        LOG.success(MODULE, 'History module initialized');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.History = {
        init: initHistory,
        add: addToHistory,
        clear: clearHistory,
        updateDisplay: updateHistoryDisplay
    };

    LOG(MODULE, 'History module loaded');

})();
