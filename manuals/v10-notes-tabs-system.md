# V10: Notizblock Tab-System

**Priorität:** 🟡 Mittel (Nice-to-have)  
**Aufwand:** 6-8 Stunden  
**Status:** Geplant

---

## Feature-Beschreibung

Erweiterung des Notizblocks um ein **Tab-System** für thematische Organisation:

**Kernfeatures:**
- Multiple Tabs für verschiedene Themen/Abschnitte
- Tabs zeigen Icon statt Text (Platzersparnis)
- Aktiver Tab hat Close-Button
- "+" Button zum Erstellen neuer Tabs
- Hamburger-Menü für zusätzliche Funktionen
- Alle Tabs werden in localStorage persistiert

**Vorteile:**
- Bessere Organisation der Notizen
- Thematische Trennung (z.B. pro Verfahrensschritt)
- Platzsparend durch Icon-basierte Tabs
- Erweiterte Funktionalität im Hamburger-Menü

---

## Datenstruktur

### Tab-Modell

```javascript
const NoteTab = {
    id: 'tab-1696424123456',      // Eindeutige ID (Timestamp)
    title: 'Export-Notizen',       // Tab-Titel
    icon: '📝',                     // Emoji-Icon für Tab
    content: 'Hier meine Notizen...', // Notiz-Inhalt
    createdAt: 1696424123456,      // Erstellungszeitpunkt
    updatedAt: 1696424567890,      // Letzte Änderung
    color: '#004B76'               // Optional: Tab-Farbe
};

// Im localStorage:
{
    'axiom-notes-tabs': [
        {
            id: 'tab-1',
            title: 'Allgemein',
            icon: '📝',
            content: '...',
            createdAt: ...,
            updatedAt: ...
        },
        {
            id: 'tab-2',
            title: 'Export',
            icon: '📤',
            content: '...',
            createdAt: ...,
            updatedAt: ...
        }
    ],
    'axiom-notes-active-tab': 'tab-1'
}
```

---

## HTML-Struktur

### Überarbeitete Notes-Sidebar

```html
<!-- NOTES SIDEBAR (Rechts) -->
<div class="notes-sidebar">
    <!-- Header mit Tabs -->
    <div class="notes-header">
        <div class="notes-tabs-container">
            <!-- Tab-Liste (scrollbar bei vielen Tabs) -->
            <div class="notes-tabs" id="notes-tabs">
                <!-- Wird dynamisch gefüllt -->
                <!-- Beispiel Tab:
                <button class="notes-tab" 
                        data-tab-id="tab-1"
                        aria-label="Tab: Allgemein"
                        aria-selected="true">
                    <span class="notes-tab-icon">📝</span>
                    <button class="notes-tab-close" 
                            aria-label="Tab schließen">✕</button>
                </button>
                -->
            </div>
            
            <!-- Tab-Aktionen -->
            <div class="notes-tab-actions">
                <button id="notes-add-tab" 
                        class="notes-action-btn"
                        aria-label="Neuen Tab erstellen"
                        title="Neuen Tab erstellen">
                    ➕
                </button>
                
                <button id="notes-menu-toggle" 
                        class="notes-action-btn"
                        aria-label="Notizen-Menü öffnen"
                        aria-expanded="false">
                    ☰
                </button>
            </div>
        </div>
        
        <!-- Close Button (gesamte Sidebar) -->
        <button class="notes-close" 
                aria-label="Notizen schließen">
            ✕
        </button>
    </div>
    
    <!-- Dropdown-Menü -->
    <div class="notes-menu-dropdown" id="notes-menu-dropdown">
        <button class="notes-menu-item" id="notes-rename-tab">
            <span class="notes-menu-icon">✏️</span>
            Tab umbenennen
        </button>
        <button class="notes-menu-item" id="notes-change-icon">
            <span class="notes-menu-icon">🎨</span>
            Icon ändern
        </button>
        <hr class="notes-menu-separator">
        <button class="notes-menu-item" id="notes-export-tab">
            <span class="notes-menu-icon">📥</span>
            Tab exportieren
        </button>
        <button class="notes-menu-item" id="notes-import-tab">
            <span class="notes-menu-icon">📤</span>
            Tab importieren
        </button>
        <hr class="notes-menu-separator">
        <button class="notes-menu-item" id="notes-clear-tab">
            <span class="notes-menu-icon">🗑️</span>
            Tab-Inhalt löschen
        </button>
        <button class="notes-menu-item notes-menu-item-danger" id="notes-delete-tab">
            <span class="notes-menu-icon">❌</span>
            Tab löschen
        </button>
        <hr class="notes-menu-separator">
        <button class="notes-menu-item" id="notes-clear-all">
            <span class="notes-menu-icon">🗑️</span>
            Alle Notizen löschen
        </button>
    </div>
    
    <!-- Body: Notiz-Editor -->
    <div class="notes-body">
        <textarea id="notes-textarea" 
                  class="notes-textarea"
                  placeholder="Notizen hier eingeben..."
                  aria-label="Notizen eingeben"></textarea>
    </div>
    
    <!-- Footer: Auto-Save Indicator -->
    <div class="notes-footer">
        <div class="notes-tab-info">
            <span id="notes-tab-title" class="notes-tab-title-display">Allgemein</span>
        </div>
        <span id="save-indicator" class="save-indicator">
            ✓ Gespeichert
        </span>
    </div>
</div>
```

---

## CSS-Styling

```css
/* ===== NOTES HEADER MIT TABS ===== */

.notes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    position: relative;
}

.notes-tabs-container {
    display: flex;
    flex: 1;
    overflow: hidden;
}

/* ===== TABS ===== */

.notes-tabs {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 8px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
    flex: 1;
}

.notes-tabs::-webkit-scrollbar {
    height: 4px;
}

.notes-tabs::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
}

.notes-tab {
    position: relative;
    min-width: 44px;
    height: 44px;
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.notes-tab:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.notes-tab[aria-selected="true"] {
    background-color: var(--color-surface-elevated);
    color: var(--color-primary);
    box-shadow: 0 2px 8px var(--color-shadow);
}

.notes-tab-icon {
    font-size: 1.5em;
}

/* Close Button im aktiven Tab */
.notes-tab-close {
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(0, 0, 0, 0.2);
    border: none;
    color: white;
    font-size: 0.8em;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.notes-tab[aria-selected="true"] .notes-tab-close {
    display: flex;
}

.notes-tab-close:hover {
    background: rgba(255, 0, 0, 0.8);
    transform: scale(1.1);
}

/* ===== TAB ACTIONS (+ und ☰) ===== */

.notes-tab-actions {
    display: flex;
    gap: 4px;
    padding: 8px;
    flex-shrink: 0;
}

.notes-action-btn {
    width: 36px;
    height: 36px;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 6px;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
}

.notes-action-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
}

.notes-action-btn:active {
    transform: scale(0.95);
}

/* ===== NOTES MENU DROPDOWN ===== */

.notes-menu-dropdown {
    position: absolute;
    top: 60px;
    right: 8px;
    background-color: var(--color-surface-elevated);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    box-shadow: 0 4px 16px var(--color-shadow-strong);
    z-index: 1000;
    min-width: 200px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: all var(--transition-fast);
}

.notes-menu-dropdown.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.notes-menu-item {
    width: 100%;
    padding: 12px 16px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--color-text-primary);
    font-size: 0.95em;
    transition: all var(--transition-fast);
}

.notes-menu-item:hover {
    background-color: var(--color-surface);
}

.notes-menu-item:first-child {
    border-radius: 6px 6px 0 0;
}

.notes-menu-item:last-child {
    border-radius: 0 0 6px 6px;
}

.notes-menu-item-danger {
    color: var(--color-error);
}

.notes-menu-item-danger:hover {
    background-color: var(--color-error);
    color: var(--color-surface-elevated);
}

.notes-menu-icon {
    font-size: 1.1em;
}

.notes-menu-separator {
    margin: 4px 0;
    border: none;
    border-top: 1px solid var(--color-border);
}

/* ===== NOTES BODY ===== */

.notes-body {
    flex: 1;
    padding: 0;
    overflow: hidden;
}

.notes-textarea {
    width: 100%;
    height: 100%;
    border: none;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1em;
    line-height: 1.6;
    resize: none;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    transition: background-color var(--transition-medium), 
                color var(--transition-medium);
}

.notes-textarea:focus {
    outline: none;
}

/* ===== NOTES FOOTER ===== */

.notes-footer {
    padding: 12px 20px;
    border-top: 2px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-surface);
    transition: background-color var(--transition-medium), 
                border-color var(--transition-medium);
}

.notes-tab-info {
    display: flex;
    align-items: center;
    gap: 8px;
}

.notes-tab-title-display {
    font-size: 0.9em;
    color: var(--color-text-secondary);
    font-weight: 500;
}

.save-indicator {
    font-size: 0.85em;
    color: var(--color-success);
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.save-indicator.visible {
    opacity: 1;
}

/* ===== MOBILE OPTIMIERUNG ===== */

@media (max-width: 768px) {
    .notes-sidebar {
        width: 100%;
        right: -100%;
    }
    
    .notes-tabs {
        padding: 6px;
    }
    
    .notes-tab {
        min-width: 40px;
        height: 40px;
    }
}

/* ===== ANIMATIONS ===== */

@keyframes tabSlideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.notes-tab.new {
    animation: tabSlideIn 0.3s ease;
}
```

---

## JavaScript-Modul

### Überarbeitetes `script-notes.js`

```javascript
// ============================================================================
// SCRIPT-NOTES.JS (V2)
// Notizen-System mit Tab-Verwaltung
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'NOTES';
    
    // ===== STATE =====
    let noteTabs = [];
    let activeTabId = null;
    let saveTimeout = null;
    
    // ===== DOM ELEMENTS =====
    let notesSidebar = null;
    let notesTabsContainer = null;
    let notesTextarea = null;
    let saveIndicator = null;
    let tabTitleDisplay = null;
    let menuDropdown = null;
    
    // ===== DEFAULT ICONS =====
    const DEFAULT_ICONS = [
        '📝', '📄', '📋', '📌', '📍', 
        '📤', '📥', '🔍', '⚙️', '💡',
        '✅', '❓', '⚠️', '🎯', '📊'
    ];
    
    // ===== TAB MANAGEMENT =====
    
    function createTab(title = 'Neue Notiz', icon = '📝', content = '') {
        const tab = {
            id: `tab-${Date.now()}`,
            title: title,
            icon: icon,
            content: content,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        noteTabs.push(tab);
        saveTabs();
        renderTabs();
        switchToTab(tab.id);
        
        LOG.success(MODULE, `Tab created: ${tab.title}`);
        return tab;
    }
    
    function deleteTab(tabId) {
        const tab = noteTabs.find(t => t.id === tabId);
        if (!tab) return;
        
        // Verhindere Löschen des letzten Tabs
        if (noteTabs.length === 1) {
            alert('Sie können den letzten Tab nicht löschen.');
            return;
        }
        
        if (!confirm(`Tab "${tab.title}" wirklich löschen?`)) {
            return;
        }
        
        const index = noteTabs.findIndex(t => t.id === tabId);
        noteTabs.splice(index, 1);
        
        // Wenn aktiver Tab gelöscht wird, wechsle zum vorherigen
        if (activeTabId === tabId) {
            const newActiveIndex = Math.max(0, index - 1);
            switchToTab(noteTabs[newActiveIndex].id);
        }
        
        saveTabs();
        renderTabs();
        
        LOG(MODULE, `Tab deleted: ${tab.title}`);
    }
    
    function switchToTab(tabId) {
        // Speichere aktuellen Content
        if (activeTabId) {
            saveCurrentTabContent();
        }
        
        activeTabId = tabId;
        const tab = noteTabs.find(t => t.id === tabId);
        
        if (!tab) {
            LOG.error(MODULE, `Tab not found: ${tabId}`);
            return;
        }
        
        // Update UI
        notesTextarea.value = tab.content;
        tabTitleDisplay.textContent = tab.title;
        
        // Update Tab States
        document.querySelectorAll('.notes-tab').forEach(tabEl => {
            const isActive = tabEl.getAttribute('data-tab-id') === tabId;
            tabEl.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        
        // Speichere aktiven Tab
        localStorage.setItem('axiom-notes-active-tab', tabId);
        
        LOG(MODULE, `Switched to tab: ${tab.title}`);
    }
    
    function saveCurrentTabContent() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        tab.content = notesTextarea.value;
        tab.updatedAt = Date.now();
        
        saveTabs();
        showSaveIndicator();
    }
    
    function renameTab(tabId, newTitle) {
        const tab = noteTabs.find(t => t.id === tabId);
        if (!tab) return;
        
        tab.title = newTitle;
        tab.updatedAt = Date.now();
        
        saveTabs();
        renderTabs();
        
        if (activeTabId === tabId) {
            tabTitleDisplay.textContent = newTitle;
        }
        
        LOG(MODULE, `Tab renamed: ${newTitle}`);
    }
    
    function changeTabIcon(tabId, newIcon) {
        const tab = noteTabs.find(t => t.id === tabId);
        if (!tab) return;
        
        tab.icon = newIcon;
        tab.updatedAt = Date.now();
        
        saveTabs();
        renderTabs();
        
        LOG(MODULE, `Tab icon changed: ${newIcon}`);
    }
    
    // ===== RENDERING =====
    
    function renderTabs() {
        notesTabsContainer.innerHTML = '';
        
        noteTabs.forEach(tab => {
            const tabElement = createTabElement(tab);
            notesTabsContainer.appendChild(tabElement);
        });
    }
    
    function createTabElement(tab) {
        const tabEl = document.createElement('button');
        tabEl.className = 'notes-tab';
        tabEl.setAttribute('data-tab-id', tab.id);
        tabEl.setAttribute('aria-label', `Tab: ${tab.title}`);
        tabEl.setAttribute('aria-selected', tab.id === activeTabId ? 'true' : 'false');
        
        const iconEl = document.createElement('span');
        iconEl.className = 'notes-tab-icon';
        iconEl.textContent = tab.icon;
        
        const closeEl = document.createElement('button');
        closeEl.className = 'notes-tab-close';
        closeEl.setAttribute('aria-label', 'Tab schließen');
        closeEl.textContent = '✕';
        
        // Event Listeners
        tabEl.addEventListener('click', (e) => {
            // Verhindere Tab-Switch wenn Close geklickt
            if (e.target === closeEl) return;
            switchToTab(tab.id);
        });
        
        closeEl.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTab(tab.id);
        });
        
        tabEl.appendChild(iconEl);
        tabEl.appendChild(closeEl);
        
        return tabEl;
    }
    
    // ===== PERSISTENCE =====
    
    function saveTabs() {
        try {
            localStorage.setItem('axiom-notes-tabs', JSON.stringify(noteTabs));
            LOG(MODULE, `Saved ${noteTabs.length} tabs`);
        } catch (error) {
            LOG.error(MODULE, 'Failed to save tabs', error);
        }
    }
    
    function loadTabs() {
        try {
            const saved = localStorage.getItem('axiom-notes-tabs');
            if (saved) {
                noteTabs = JSON.parse(saved);
                LOG(MODULE, `Loaded ${noteTabs.length} tabs`);
            }
            
            // Erstelle Default-Tab wenn keine vorhanden
            if (noteTabs.length === 0) {
                createTab('Allgemein', '📝', '');
            }
            
            // Lade aktiven Tab
            const savedActiveTab = localStorage.getItem('axiom-notes-active-tab');
            if (savedActiveTab && noteTabs.find(t => t.id === savedActiveTab)) {
                activeTabId = savedActiveTab;
            } else {
                activeTabId = noteTabs[0].id;
            }
            
            return true;
        } catch (error) {
            LOG.error(MODULE, 'Failed to load tabs', error);
            // Erstelle Default-Tab bei Fehler
            createTab('Allgemein', '📝', '');
            return false;
        }
    }
    
    // ===== MENU FUNCTIONS =====
    
    function showIconPicker() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        const newIcon = prompt(
            `Wählen Sie ein neues Icon für "${tab.title}":\n\n` +
            DEFAULT_ICONS.join(' ') +
            '\n\nGeben Sie ein Emoji ein:',
            tab.icon
        );
        
        if (newIcon && newIcon.trim()) {
            changeTabIcon(activeTabId, newIcon.trim());
        }
    }
    
    function promptRenameTab() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        const newTitle = prompt(
            `Neuer Name für Tab:`,
            tab.title
        );
        
        if (newTitle && newTitle.trim()) {
            renameTab(activeTabId, newTitle.trim());
        }
    }
    
    function exportTab() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        const dataStr = JSON.stringify(tab, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${tab.title.replace(/[^a-z0-9]/gi, '_')}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        LOG.success(MODULE, `Tab exported: ${tab.title}`);
    }
    
    function importTab() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    
                    // Neue ID generieren
                    imported.id = `tab-${Date.now()}`;
                    imported.createdAt = Date.now();
                    imported.updatedAt = Date.now();
                    
                    noteTabs.push(imported);
                    saveTabs();
                    renderTabs();
                    switchToTab(imported.id);
                    
                    LOG.success(MODULE, `Tab imported: ${imported.title}`);
                } catch (error) {
                    alert('Fehler beim Importieren der Datei.');
                    LOG.error(MODULE, 'Import failed', error);
                }
            };
            reader.readAsText(file);
        });
        
        input.click();
    }
    
    function clearTabContent() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        if (!confirm(`Inhalt von "${tab.title}" wirklich löschen?`)) {
            return;
        }
        
        tab.content = '';
        tab.updatedAt = Date.now();
        notesTextarea.value = '';
        
        saveTabs();
        
        LOG(MODULE, `Tab content cleared: ${tab.title}`);
    }
    
    function clearAllNotes() {
        if (!confirm('Wirklich ALLE Notizen löschen? Dies kann nicht rückgängig gemacht werden!')) {
            return;
        }
        
        // Lösche alle Tabs und erstelle einen neuen Default-Tab
        noteTabs = [];
        createTab('Allgemein', '📝', '');
        
        LOG(MODULE, 'All notes cleared');
    }
    
    // ===== AUTO-SAVE =====
    
    function setupAutoSave() {
        notesTextarea.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                saveCurrentTabContent();
            }, 500);
        });
    }
    
    function showSaveIndicator() {
        saveIndicator.classList.add('visible');
        setTimeout(() => {
            saveIndicator.classList.remove('visible');
        }, 2000);
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Add Tab Button
        document.getElementById('notes-add-tab')?.addEventListener('click', () => {
            createTab();
        });
        
        // Menu Toggle
        const menuToggle = document.getElementById('notes-menu-toggle');
        menuToggle?.addEventListener('click', () => {
            menuDropdown.classList.toggle('visible');
            const isVisible = menuDropdown.classList.contains('visible');
            menuToggle.setAttribute('aria-expanded', isVisible ? 'true' : 'false');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notes-tab-actions') && 
                !e.target.closest('.notes-menu-dropdown')) {
                menuDropdown.classList.remove('visible');
                menuToggle?.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Menu Items
        document.getElementById('notes-rename-tab')?.addEventListener('click', () => {
            promptRenameTab();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-change-icon')?.addEventListener('click', () => {
            showIconPicker();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-export-tab')?.addEventListener('click', () => {
            exportTab();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-import-tab')?.addEventListener('click', () => {
            importTab();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-clear-tab')?.addEventListener('click', () => {
            clearTabContent();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-delete-tab')?.addEventListener('click', () => {
            deleteTab(activeTabId);
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-clear-all')?.addEventListener('click', () => {
            clearAllNotes();
            menuDropdown.classList.remove('visible');
        });
        
        // Close Sidebar
        document.querySelector('.notes-close')?.addEventListener('click', () => {
            saveCurrentTabContent();
            document.body.classList.remove('notes-open');
        });
    }
    
    // ===== INITIALIZATION =====
    
    function initNotes() {
        LOG(MODULE, 'Initializing notes system...');
        
        // Get DOM elements
        notesSidebar = document.querySelector('.notes-sidebar');
        notesTabsContainer = document.getElementById('notes-tabs');
        notesTextarea = document.getElementById('notes-textarea');
        saveIndicator = document.getElementById('save-indicator');
        tabTitleDisplay = document.getElementById('notes-tab-title');
        menuDropdown = document.getElementById('notes-menu-dropdown');
        
        if (!notesSidebar || !notesTabsContainer || !notesTextarea) {
            LOG.error(MODULE, 'Required DOM elements not found');
            return;
        }
        
        // Load tabs
        loadTabs();
        
        // Render tabs
        renderTabs();
        
        // Switch to active tab
        switchToTab(activeTabId);
        
        // Setup event handlers
        setupEventHandlers();
        setupAutoSave();
        
        LOG.success(MODULE, 'Notes system initialized');
    }
    
    // ===== PUBLIC API =====
    
    window.NotesManager = {
        createTab: createTab,
        deleteTab: deleteTab,
        getTabs: () => [...noteTabs],
        getActiveTab: () => noteTabs.find(t => t.id === activeTabId)
    };
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNotes);
    } else {
        initNotes();
    }
    
    LOG(MODULE, 'Notes module loaded');
    
})();
```

---

## Implementierungsschritte

### Phase 1: HTML & CSS (2-3 Stunden)
1. HTML-Struktur der Notes-Sidebar überarbeiten
2. Tab-Header mit Icons erstellen
3. Menü-Dropdown hinzufügen
4. CSS für Tabs, Aktionen und Menü implementieren
5. Responsive-Tests für Mobile

### Phase 2: JavaScript Kern-Logik (2-3 Stunden)
1. Tab-Datenmodell implementieren
2. CRUD-Operationen für Tabs (Create, Read, Update, Delete)
3. Tab-Switching Logik
4. localStorage-Persistierung
5. Rendering-Funktionen

### Phase 3: Menü-Funktionen (1-2 Stunden)
1. Umbenennen implementieren
2. Icon-Picker erstellen
3. Export/Import-Funktionalität
4. Löschen-Funktionen
5. Event-Handler verbinden

### Phase 4: Testing & Polish (1 Stunde)
1. Alle Funktionen testen
2. Edge Cases behandeln (letzter Tab, leere Tabs)
3. Animationen testen
4. Alle 4 Themes prüfen
5. Keyboard-Navigation validieren

**Gesamt-Aufwand:** 6-8 Stunden

---

## Testing-Checkliste

### Tab-Management
- [ ] Neuen Tab erstellen funktioniert
- [ ] Tab-Wechsel funktioniert
- [ ] Tab löschen funktioniert (außer letzter)
- [ ] Letzter Tab kann nicht gelöscht werden
- [ ] Tab-Content wird korrekt gespeichert beim Wechsel
- [ ] Aktiver Tab wird visuell hervorgehoben

### Icons & UI
- [ ] Icons werden korrekt angezeigt
- [ ] Close-Button nur bei aktivem Tab sichtbar
- [ ] Tabs scrollen bei vielen Tabs
- [ ] "+" Button erstellt neuen Tab
- [ ] Hamburger-Menü öffnet/schließt korrekt

### Menü-Funktionen
- [ ] Tab umbenennen funktioniert
- [ ] Icon ändern funktioniert
- [ ] Tab exportieren erstellt JSON-Datei
- [ ] Tab importieren lädt JSON korrekt
- [ ] Tab-Inhalt löschen funktioniert
- [ ] Tab löschen mit Bestätigung
- [ ] Alle Notizen löschen mit Bestätigung

### Persistenz
- [ ] Tabs werden in localStorage gespeichert
- [ ] Aktiver Tab wird gespeichert
- [ ] Nach Neuladen: Tabs wiederhergestellt
- [ ] Nach Neuladen: Aktiver Tab wiederhergestellt
- [ ] Auto-Save funktioniert (500ms Debounce)
- [ ] Save-Indicator erscheint kurz

### Accessibility
- [ ] Tabs per Tastatur bedienbar
- [ ] aria-selected korrekt gesetzt
- [ ] aria-label für alle Buttons
- [ ] Screen Reader navigiert korrekt
- [ ] Focus-States sichtbar

### Alle Themes
- [ ] Tag-Modus: Lesbar und funktional
- [ ] Nacht-Modus: Lesbar und funktional
- [ ] Hochkontrast Hell: Lesbar
- [ ] Hochkontrast Dunkel: Lesbar

### Mobile
- [ ] Sidebar verhält sich korrekt
- [ ] Tabs sind auf Mobile bedienbar
- [ ] Touch-Targets ausreichend groß (min. 44px)
- [ ] Menü öffnet sich korrekt

---

## Migration bestehender Notizen

### Für User mit existierenden Notizen

```javascript
// Migration-Script: Alte Notizen → Erster Tab
function migrateOldNotes() {
    const oldNotes = localStorage.getItem('axiom-notes');
    const existingTabs = localStorage.getItem('axiom-notes-tabs');
    
    // Nur migrieren wenn alte Notizen vorhanden und noch keine Tabs
    if (oldNotes && !existingTabs) {
        const migrationTab = {
            id: 'tab-migration',
            title: 'Meine Notizen',
            icon: '📝',
            content: oldNotes,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        localStorage.setItem('axiom-notes-tabs', JSON.stringify([migrationTab]));
        localStorage.setItem('axiom-notes-active-tab', 'tab-migration');
        
        // Alte Notizen archivieren (nicht löschen zur Sicherheit)
        localStorage.setItem('axiom-notes-archived', oldNotes);
        
        LOG.success('NOTES', 'Migrated old notes to tab system');
    }
}

// In initNotes() BEFORE loadTabs() aufrufen:
// migrateOldNotes();
```

---

## Erweiterungsmöglichkeiten (Optional)

### 1. Drag & Drop für Tab-Reihenfolge

```javascript
// Tab-Reihenfolge per Drag & Drop ändern
function enableTabDragDrop() {
    const tabsContainer = document.getElementById('notes-tabs');
    
    tabsContainer.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('notes-tab')) {
            e.target.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-tab-id'));
        }
    });
    
    tabsContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(tabsContainer, e.clientX);
        
        if (afterElement == null) {
            tabsContainer.appendChild(dragging);
        } else {
            tabsContainer.insertBefore(dragging, afterElement);
        }
    });
    
    tabsContainer.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
        updateTabOrder();
    });
}
```

### 2. Tab-Farben

```javascript
// Tabs können eigene Farben haben
const TAB_COLORS = [
    '#004B76', '#005C45', '#780F2D', '#F9E03A', '#0066cc'
];

function setTabColor(tabId, color) {
    const tab = noteTabs.find(t => t.id === tabId);
    if (!tab) return;
    
    tab.color = color;
    saveTabs();
    renderTabs();
}

// In createTabElement():
if (tab.color) {
    tabEl.style.backgroundColor = tab.color;
}
```

### 3. Tab-Vorlagen

```javascript
// Vordefinierte Tab-Templates
const TAB_TEMPLATES = {
    'checklist': {
        title: 'Checkliste',
        icon: '✅',
        content: '☐ \n☐ \n☐ '
    },
    'evidence': {
        title: 'Beweismittel',
        icon: '📋',
        content: 'Beweismittel-Nr:\nQuelle:\nRelevanz:\nNotizen:\n'
    },
    'timeline': {
        title: 'Zeitstrahl',
        icon: '📅',
        content: '[Datum] - [Ereignis]\n[Datum] - [Ereignis]\n'
    }
};

function createTabFromTemplate(templateId) {
    const template = TAB_TEMPLATES[templateId];
    if (!template) return;
    
    createTab(template.title, template.icon, template.content);
}
```

### 4. Suche über alle Tabs

```javascript
function searchAllTabs(query) {
    const results = [];
    
    noteTabs.forEach(tab => {
        if (tab.content.toLowerCase().includes(query.toLowerCase()) ||
            tab.title.toLowerCase().includes(query.toLowerCase())) {
            results.push(tab);
        }
    });
    
    return results;
}
```

### 5. Tab-Statistiken

```javascript
function getTabStats(tabId) {
    const tab = noteTabs.find(t => t.id === tabId);
    if (!tab) return null;
    
    return {
        wordCount: tab.content.split(/\s+/).length,
        charCount: tab.content.length,
        lineCount: tab.content.split('\n').length,
        lastModified: new Date(tab.updatedAt).toLocaleString()
    };
}
```

---

## UI/UX Überlegungen

### Icon-Auswahl

**Standard-Icons nach Thema:**
- **Allgemein:** 📝 📄 📋 📌
- **Prozess-Schritte:** 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣
- **Kategorien:** 📤 📥 🔍 ⚙️ 💾
- **Status:** ✅ ❌ ⚠️ 💡 🎯
- **Thematisch:** 🔐 📊 📞 💬 📧

### Tab-Limit

**Empfehlung:** Max. 8-10 Tabs für Übersichtlichkeit

```javascript
const MAX_TABS = 10;

function createTab() {
    if (noteTabs.length >= MAX_TABS) {
        alert(`Maximale Anzahl von ${MAX_TABS} Tabs erreicht.`);
        return;
    }
    // ... rest of function
}
```

### Keyboard-Shortcuts

```javascript
// Optionale Shortcuts
document.addEventListener('keydown', (e) => {
    // Strg/Cmd + N: Neuer Tab
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        createTab();
    }
    
    // Strg/Cmd + W: Tab schließen
    if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
        e.preventDefault();
        if (noteTabs.length > 1) {
            deleteTab(activeTabId);
        }
    }
    
    // Strg/Cmd + Tab: Nächster Tab
    if ((e.ctrlKey || e.metaKey) && e.key === 'Tab') {
        e.preventDefault();
        const currentIndex = noteTabs.findIndex(t => t.id === activeTabId);
        const nextIndex = (currentIndex + 1) % noteTabs.length;
        switchToTab(noteTabs[nextIndex].id);
    }
});
```

---

## Vorteile

✅ **Organisation:** Thematische Trennung der Notizen  
✅ **Platzsparend:** Icons statt Text in Tab-Headern  
✅ **Flexibel:** Beliebig viele Tabs erstellen  
✅ **Import/Export:** Tabs können geteilt werden  
✅ **Persistent:** Alle Tabs in localStorage  
✅ **Intuitiv:** Bekanntes Tab-Interface  
✅ **Erweiterbar:** Basis für weitere Features (Farben, Vorlagen)

---

## Vergleich Alt vs. Neu

### Vorher (V1):
- Ein einzelnes Textfeld
- Alle Notizen vermischt
- Keine Kategorisierung
- Löschen-Button im Footer

### Nachher (V2):
- Multiple Tabs mit Icons
- Thematische Trennung
- Jeder Tab separat verwaltbar
- Erweiterte Funktionen im Hamburger-Menü
- Export/Import pro Tab
- Bessere Übersicht

---

## Integration mit anderen Features

### State Management (V01)
```javascript
// Notizen-Tabs im AppState
AppState.notes = {
    tabs: [...noteTabs],
    activeTabId: activeTabId
};

// Subscribe to changes
AppState.subscribe('notes.activeTabId', (newTabId) => {
    switchToTab(newTabId);
});
```

### Favoriten (V05)
```javascript
// "Notiz zu diesem Abschnitt" Button in Favoriten
function createNoteForSection(sectionId, sectionTitle) {
    const tab = createTab(sectionTitle, '📌', `Notizen zu: ${sectionTitle}\n\n`);
    switchToTab(tab.id);
}
```

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*