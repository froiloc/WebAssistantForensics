// ============================================================================
// SCRIPT-NOTES.JS - Version 040 (body.notes-open korrigiert)
// Notizen-Feature: Persistente Notizen mit Auto-Save
// ============================================================================

(function() {
    'use strict';

    const STATE = window.APP_STATE;
    const CONST = window.APP_CONSTANTS;
    const MODULE = 'NOTES';

    // ========================================================================
    // NOTES MANAGEMENT
    // ========================================================================

    function autoSaveNotes() {
        if (STATE.notesSaveTimer) {
            clearTimeout(STATE.notesSaveTimer);
        }

        STATE.notesSaveTimer = setTimeout(() => {
            const textarea = document.getElementById('notes-textarea');
            if (textarea) {
                saveNotesToStorage(textarea.value);
                window.showSaveIndicator('Notizen gespeichert');
                LOG.debug(MODULE, 'Auto-saved notes');
            }
        }, CONST.NOTES_AUTOSAVE_DELAY);
    }

    function saveNotesToStorage(content) {
        STATE.notesContent = content;

        try {
            localStorage.setItem(CONST.STORAGE_KEYS.NOTES, content);
            LOG.debug(MODULE, `Saved ${content.length} characters to storage`);
        } catch (e) {
            LOG.error(MODULE, 'Failed to save notes', e);
        }
    }

    function loadNotesFromStorage() {
        try {
            const stored = localStorage.getItem(CONST.STORAGE_KEYS.NOTES);
            if (stored) {
                STATE.notesContent = stored;
                LOG.success(MODULE, `Loaded ${stored.length} characters from storage`);

                const textarea = document.getElementById('notes-textarea');
                if (textarea) {
                    textarea.value = stored;
                }
            } else {
                LOG.debug(MODULE, 'No stored notes found');
            }
        } catch (e) {
            LOG.error(MODULE, 'Failed to load notes', e);
        }
    }

    function clearNotes() {
        if (confirm('Notizen wirklich löschen?')) {
            STATE.notesContent = '';

            const textarea = document.getElementById('notes-textarea');
            if (textarea) {
                textarea.value = '';
            }

            saveNotesToStorage('');
            window.showSaveIndicator('Notizen gelöscht');
            LOG(MODULE, 'Notes cleared');
        }
    }

    // ========================================================================
    // UI - PANEL
    // ========================================================================

    function initNotesFeature() {
        LOG(MODULE, 'Initializing notes feature...');

        const toggleBtn = document.getElementById('notes-toggle');
        const sidebar = document.getElementById('notes-sidebar');
        const clearBtn = document.getElementById('clear-notes');
        const textarea = document.getElementById('notes-textarea');

        LOG.debug(MODULE, 'Notes elements:', {
            toggleBtn: !!toggleBtn,
            sidebar: !!sidebar,
            clearBtn: !!clearBtn,
            textarea: !!textarea
        });

        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleNotes);
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', clearNotes);
        }

        if (textarea) {
            textarea.addEventListener('input', autoSaveNotes);
            loadNotesFromStorage();
        }

        LOG.success(MODULE, 'Notes feature initialized');
    }

    function toggleNotes(forceState) {
        const sidebar = document.getElementById('notes-sidebar');
        const toggleBtn = document.getElementById('notes-toggle');

        if (sidebar) {
            if (typeof forceState === 'boolean') {
                // Force specific state
                if (forceState) {
                    sidebar.style.right = '0';
                    document.body.classList.add('notes-open');
                } else {
                    sidebar.style.right = '-370px';
                    document.body.classList.remove('notes-open');
                }
            } else {
                // Toggle
                const isOpen = document.body.classList.contains('notes-open');

                if (isOpen) {
                    sidebar.style.right = '-370px';
                    document.body.classList.remove('notes-open');
                    LOG(MODULE, 'Notes panel closed');
                } else {
                    sidebar.style.right = '0';
                    document.body.classList.add('notes-open');
                    LOG(MODULE, 'Notes panel opened');
                }
            }

            if (toggleBtn) {
                const isOpen = document.body.classList.contains('notes-open');
                toggleBtn.setAttribute('aria-expanded', isOpen);
            }
        }
    }

    // ========================================================================
    // INITIALISIERUNG
    // ========================================================================

    function initNotes() {
        LOG(MODULE, 'Initializing notes module...');

        initNotesFeature();

        LOG.success(MODULE, 'Notes module initialized');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.Notes = {
        init: initNotes,
 toggle: toggleNotes,
 clear: clearNotes,
 save: saveNotesToStorage,
 load: loadNotesFromStorage
    };

    LOG(MODULE, 'Notes module loaded');

})();
