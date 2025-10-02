// ============================================================================
// SCRIPT-HISTORY.JS - Version 040
// Section-History: Tracking und Anzeige besuchter Sections
// ============================================================================

(function() {
    'use strict';

    const STATE = window.APP_STATE;
    const CONST = window.APP_CONSTANTS;
    const MODULE = 'HISTORY';

    // ========================================================================
    // HISTORY MANAGEMENT
    // ========================================================================

    function addToHistory(sectionId, sectionTitle) {
        const timestamp = Date.now();

        const entry = {
            id: sectionId,
 title: sectionTitle,
 timestamp: timestamp
        };

        if (STATE.history.length > 0) {
            const lastEntry = STATE.history[STATE.history.length - 1];
            if (lastEntry.id === sectionId) {
                LOG.debug(MODULE, 'Skipping duplicate entry');
                return;
            }
        }

        STATE.history.push(entry);
        LOG(MODULE, `Added: ${sectionId}`);

        if (STATE.history.length > 50) {
            STATE.history.shift();
            LOG.debug(MODULE, 'History trimmed to 50 entries');
        }

        saveHistoryToStorage();
        updateHistoryDisplay();
    }

    function clearHistory() {
        STATE.history = [];
        saveHistoryToStorage();
        updateHistoryDisplay();
        LOG(MODULE, 'History cleared');
    }

    // ========================================================================
    // STORAGE
    // ========================================================================

    function saveHistoryToStorage() {
        try {
            localStorage.setItem(
                CONST.STORAGE_KEYS.HISTORY,
                JSON.stringify(STATE.history)
            );
            LOG.debug(MODULE, `Saved ${STATE.history.length} entries to storage`);
        } catch (e) {
            LOG.error(MODULE, 'Failed to save to localStorage', e);
        }
    }

    function loadHistoryFromStorage() {
        try {
            const stored = localStorage.getItem(CONST.STORAGE_KEYS.HISTORY);
            if (stored) {
                STATE.history = JSON.parse(stored);
                LOG.success(MODULE, `Loaded ${STATE.history.length} entries from storage`);
            } else {
                LOG.debug(MODULE, 'No stored history found');
            }
        } catch (e) {
            LOG.error(MODULE, 'Failed to load from localStorage', e);
            STATE.history = [];
        }
    }

    // ========================================================================
    // UI - MODAL
    // ========================================================================

    function initHistoryModal() {
        LOG(MODULE, 'Initializing history modal...');

        const openBtn = document.getElementById('show-history-btn');
        const modal = document.getElementById('history-modal');
        const closeBtn = document.getElementById('close-history-modal');
        const clearBtn = document.getElementById('clear-history-btn');
        const timeFormatBtn = document.getElementById('time-format-toggle');

        LOG.debug(MODULE, 'Modal elements:', {
            openBtn: !!openBtn,
            modal: !!modal,
            closeBtn: !!closeBtn,
            clearBtn: !!clearBtn,
            timeFormatBtn: !!timeFormatBtn
        });

        if (openBtn) {
            openBtn.addEventListener('click', openHistoryModal);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeHistoryModal);
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Verlauf wirklich löschen?')) {
                    clearHistory();
                }
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeHistoryModal();
                }
            });
        }

        if (timeFormatBtn) {
            timeFormatBtn.addEventListener('click', toggleTimeFormat);
        }

        LOG.success(MODULE, 'History modal initialized');
    }

    function openHistoryModal() {
        const modal = document.getElementById('history-modal');

        if (modal) {
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            updateHistoryDisplay();
            LOG(MODULE, 'Modal opened');
        }
    }

    function closeHistoryModal() {
        const modal = document.getElementById('history-modal');

        if (modal) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            LOG(MODULE, 'Modal closed');
        }
    }

    function toggleTimeFormat() {
        STATE.preferences.timeFormat = STATE.preferences.timeFormat === 'relative'
        ? 'absolute'
        : 'relative';

        LOG(MODULE, `Time format switched to: ${STATE.preferences.timeFormat}`);

        updateHistoryDisplay();

        if (window.Preferences) {
            window.Preferences.save();
        }
    }

    function updateHistoryDisplay() {
        const container = document.getElementById('history-list');
        const emptyMsg = document.getElementById('history-empty');

        if (!container) {
            LOG.warn(MODULE, 'History list container not found');
            return;
        }

        container.innerHTML = '';

        if (STATE.history.length === 0) {
            if (container) container.style.display = 'none';
            if (emptyMsg) emptyMsg.style.display = 'block';
            return;
        }

        if (container) container.style.display = 'block';
        if (emptyMsg) emptyMsg.style.display = 'none';

        const reversedHistory = [...STATE.history].reverse();

        reversedHistory.forEach(entry => {
            const item = document.createElement('div');
            item.className = 'history-item';

            const timeStr = STATE.preferences.timeFormat === 'relative'
            ? window.getRelativeTime(entry.timestamp)
            : window.getAbsoluteTime(entry.timestamp);

            item.innerHTML = `
            <div class="history-item-title">${entry.title}</div>
            <div class="history-item-time">${timeStr}</div>
            `;

            item.addEventListener('click', () => {
                if (window.SectionManagement) {
                    window.SectionManagement.scrollToSection(entry.id);
                    closeHistoryModal();
                    LOG(MODULE, `Navigating to: ${entry.id}`);
                }
            });

            container.appendChild(item);
        });

        LOG.debug(MODULE, `Display updated with ${STATE.history.length} entries`);
    }

    // ========================================================================
    // EVENT LISTENERS
    // ========================================================================

    function initHistoryListeners() {
        LOG(MODULE, 'Initializing event listeners...');

        window.addEventListener('sectionActivated', (e) => {
            const { sectionId } = e.detail;

            const section = document.querySelector(`[data-section="${sectionId}"]`);
            if (section) {
                const title = section.dataset.title ||
                section.querySelector('h2')?.textContent ||
                'Unbenannt';
        addToHistory(sectionId, title);
            }
        });

        LOG.success(MODULE, 'Event listeners initialized');
    }

    // ========================================================================
    // INITIALISIERUNG
    // ========================================================================

    function initHistory() {
        LOG(MODULE, 'Initializing history module...');

        loadHistoryFromStorage();
        initHistoryModal();
        initHistoryListeners();

        LOG.success(MODULE, 'History module initialized');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.History = {
        init: initHistory,
 add: addToHistory,
 clear: clearHistory,
 open: openHistoryModal,
 close: closeHistoryModal
    };

    LOG(MODULE, 'History module loaded');

})();
