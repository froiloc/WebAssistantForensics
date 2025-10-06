// ============================================================================
// SCRIPT-NOTES.JS - Version 058 (StateManager Migration)
// Notizen-Feature: Persistente Notizen mit Auto-Save und StateManager
// ============================================================================

(function() {
    'use strict';

    const CONST = window.APP_CONSTANTS;
    const MODULE = 'NOTES';

    // ========================================================================
    // NOTES MANAGEMENT
    // ========================================================================

    function autoSaveNotes() {
        // Timer aus StateManager holen (oder Fallback)
        const saveTimer = window.StateManager.get('notes.saveTimer');

        if (saveTimer) {
            clearTimeout(saveTimer);
        }

        const newTimer = setTimeout(() => {
            const textarea = document.getElementById('notes-textarea');
            if (textarea) {
                saveNotesToStorage(textarea.value);
                window.showSaveIndicator('Notizen gespeichert');
                LOG.debug(MODULE, 'Auto-saved notes');
            }
        }, CONST.NOTES_AUTOSAVE_DELAY);

        // Timer in StateManager speichern (oder Fallback)
        if (window.StateManager) {
            window.StateManager.set('notes.saveTimer', newTimer);
        }
    }

    function saveNotesToStorage(content) {
        // In StateManager speichern (oder Legacy-Fallback)
        if (window.StateManager) {
            window.StateManager.set('notes.content', content);
            window.StateManager.set('notes.lastSaved', Date.now());
            LOG.debug(MODULE, `Saved ${content.length} characters via StateManager`);
        }
    }

    function loadNotesFromStorage() {
        LOG(MODULE, 'Loading notes...');

        // Aus StateManager laden (oder Legacy-Fallback)
        const stored = window.StateManager.get('notes.content');

        if (stored) {
            LOG.success(MODULE, `Loaded ${stored.length} characters`);

            const textarea = document.getElementById('notes-textarea');
            if (textarea) {
                textarea.value = stored;
            }
        } else {
            LOG.debug(MODULE, 'No stored notes found');
        }
    }

    function clearNotes() {
        if (!confirm('Notizen wirklich löschen?')) {
            return;
        }

        const textarea = document.getElementById('notes-textarea');
        if (textarea) {
            textarea.value = '';
        }

        // Über StateManager löschen (oder Legacy)
        if (window.StateManager) {
            window.StateManager.set('notes.content', '');
            window.StateManager.set('notes.lastSaved', Date.now());
        }

        LOG(MODULE, 'Notes cleared');
        window.showSaveIndicator('Notizen gelöscht');
    }

    // ========================================================================
    // NOTES SIDEBAR
    // ========================================================================

    function initNotesFeature() {
        LOG(MODULE, 'Initializing notes feature...');

        const toggleBtn = document.getElementById('notes-toggle');
        const sidebar = document.getElementById('notes-sidebar');
        const clearBtn = document.getElementById('clear-notes-btn');
        const textarea = document.getElementById('notes-textarea');

        LOG.debug(MODULE, 'Notes elements:', {
            toggleBtn: !!toggleBtn,
            sidebar: !!sidebar,
            clearBtn: !!clearBtn,
            textarea: !!textarea
        });

        // Load saved notes
        loadNotesFromStorage();

        // Toggle-Button
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleNotesSidebar);
        }

        // Clear-Button
        if (clearBtn) {
            clearBtn.addEventListener('click', clearNotes);
        }

        // Auto-Save bei Eingabe
        if (textarea) {
            // Preferences aus StateManager holen
            const autoSave = window.StateManager.get('preferences.autoSaveNotes');

            if (autoSave) {
                textarea.addEventListener('input', autoSaveNotes);
                LOG.debug(MODULE, 'Auto-save enabled');
            }
        }

        LOG.success(MODULE, 'Notes feature initialized');
    }

    function toggleNotesSidebar() {
        const sidebar = document.getElementById('notes-sidebar');
        if (!sidebar) return;

        const isOpen = sidebar.classList.contains('open');

        if (isOpen) {
            sidebar.classList.remove('open');
            document.body.classList.remove('notes-open');

            // Status in StateManager speichern (oder Fallback)
            if (window.StateManager) {
                window.StateManager.set('ui.notesOpen', false);
            }

            LOG(MODULE, 'Notes sidebar closed');
        } else {
            sidebar.classList.add('open');
            document.body.classList.add('notes-open');

            // Status in StateManager speichern (oder Fallback)
            if (window.StateManager) {
                window.StateManager.set('ui.notesOpen', true);
            }

            LOG(MODULE, 'Notes sidebar opened');

            // Fokus auf Textarea
            const textarea = document.getElementById('notes-textarea');
            if (textarea) {
                textarea.focus();
            }
        }
    }

    // ========================================================================
    // EXPORT / IMPORT
    // ========================================================================

    function exportNotes() {
        // Notizen aus StateManager holen
        const content = window.StateManager.get('notes.content');

        if (!content || content.trim() === '') {
            alert('Keine Notizen zum Exportieren vorhanden');
            return;
        }

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `axiom-notizen-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        LOG(MODULE, 'Notes exported');
    }

    function importNotes() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt';

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target.result;

                const textarea = document.getElementById('notes-textarea');
                if (textarea) {
                    textarea.value = content;
                }

                saveNotesToStorage(content);
                LOG(MODULE, 'Notes imported');
                window.showSaveIndicator('Notizen importiert');
            };

            reader.readAsText(file);
        });

        input.click();
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
        toggle: toggleNotesSidebar,
        clear: clearNotes,
        export: exportNotes,
        import: importNotes,
        save: saveNotesToStorage
    };

    LOG(MODULE, 'Notes module loaded');

})();
