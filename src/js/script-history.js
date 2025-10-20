// ============================================================================
// SCRIPT-HISTORY.JS - Version 68
// Section-History Tracking mit StateManager-Integration
// ============================================================================

(function() {
    'use strict';

    const CONST = window.APP_CONSTANTS;
    const MODULE = 'HISTORY';

    // ========================================================================
    // HISTORY MANAGEMENT
    // ========================================================================

    // Tracking für Mindest-Verweilzeit
    let sectionEnterTime = {};
    const MIN_DWELL_TIME = 5000; // 5 Sekunden

    function addToHistory(sectionId) {
        if (!window.StateManager) {
            LOG.error(MODULE, 'StateManager not available!');
            return;
        }

        const timestamp = Date.now();

        // History aus StateManager holen
        const history = window.StateManager.get('history.entries') || [];

        // Section-Titel holen
        const sectionTitle = getSectionTitle(sectionId);

        const entry = {
            sectionId: sectionId,
            title: sectionTitle,
            timestamp: timestamp
        };

        history.push(entry);

        // Max-Length einhalten
        const maxLength = window.StateManager.get('history.maxLength') || 50;

        if (history.length > maxLength) {
            history.shift();
        }

        // Zurück in StateManager schreiben
        window.StateManager.set('history.entries', history);

        LOG.debug(MODULE, `Added to history: ${sectionId} (${history.length} entries)`);

        updateHistoryDisplay();
    }

    function clearHistory() {
        if (!confirm('Verlauf wirklich löschen?')) {
            return;
        }

        if (!window.StateManager) {
            LOG.error(MODULE, 'StateManager not available!');
            return;
        }

        window.StateManager.set('history.entries', []);
        updateHistoryDisplay();

        LOG(MODULE, '✓ History cleared');
    }

    function loadHistoryFromStorage() {
        LOG(MODULE, 'Loading history...');

        if (!window.StateManager) {
            LOG.error(MODULE, 'StateManager not available!');
            return;
        }

        // StateManager hat bereits beim Init aus localStorage geladen
        const stored = window.StateManager.get('history.entries');

        if (stored && Array.isArray(stored)) {
            LOG.info(MODULE, `✓ Loaded ${stored.length} entries`);
        } else {
            LOG.debug(MODULE, 'No stored history found');
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
                LOG.info(MODULE, 'Shortcut Alt+h registered with SidebarManager');
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

        LOG.info(MODULE, 'History sidebar initialized');
    }

    function toggleTimeFormat() {
        // Preferences aus StateManager holen
        const currentFormat = window.StateManager.get('preferences.timeFormat');

        const newFormat = currentFormat === 'relative' ? 'absolute' : 'relative';

        // In StateManager speichern (oder Fallback)
        if (window.StateManager) {
            window.StateManager.set('preferences.timeFormat', newFormat);
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
        const history = window.StateManager.get('history.entries');

        const timeFormat = window.StateManager.get('preferences.timeFormat');

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
        LOG(MODULE, 'Initializing history event listeners...');

        // Now we just listen for the clean event
        window.addEventListener('sectionVisited', (e) => {
            const sectionId = e.detail.sectionId;

            // Get current history to check for duplicates
            const history = window.StateManager.get('history.entries');

            // Don't add if it's the same as the last entry
            if (history.length === 0 || history[history.length - 1].sectionId !== sectionId) {
                LOG.debug(MODULE, `Adding ${sectionId} to history`);
                addToHistory(sectionId);
            } else {
                LOG.debug(MODULE, `Skipping duplicate history entry: ${sectionId}`);
            }
        });

        // Keep the preferences listener
        window.addEventListener('preferencesLoaded', () => {
            updateHistoryDisplay();
        });

        LOG.info(MODULE, 'History event listeners initialized');
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

        LOG.info(MODULE, 'History module initialized');
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
