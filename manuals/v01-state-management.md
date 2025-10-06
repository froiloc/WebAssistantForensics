# V01: Einheitliche Zustandsverwaltung (State Management)

**Priorität:** 🔴 Sehr hoch  
**Aufwand:** 6-10 Stunden  
**Status:** Zur sofortigen Umsetzung empfohlen

---

## Problembeschreibung

**Aktueller Zustand:**
- Verschiedene Module verwalten ihre Zustände unabhängig
- Verstreute localStorage-Zugriffe in mehreren Dateien
- Potenzielle Synchronisationsprobleme zwischen Komponenten
- Redundante Code-Duplikation für State-Persistierung

**Betroffene Module:**
- `script-sidebar-manager.js` - Sidebar-Status
- `script-notes.js` - Notizen-Panel-Status
- `script-tips.js` - Tipps-Footer-Sichtbarkeit
- `script-theme.js` - Theme-Präferenz
- `script-preferences.js` - Diverse UI-Einstellungen
- `script-history.js` - Zeitformat-Präferenz

**Probleme:**
- ❌ Wartbarkeit: CSS-Änderungen erfordern Änderungen in HTML/JS
- ❌ Konsistenz: Gleiche Zustände mehrfach definiert
- ❌ Synchronisation: Race Conditions möglich
- ❌ Testing: Schwierig zu testen ohne komplettes Setup

---

## Lösungsansatz

**Zentrale Zustandsverwaltung mit Observer-Pattern**

### Neues Modul: `script-state-manager.js`

```javascript
// ============================================================================
// SCRIPT-STATE-MANAGER.JS
// Zentrale Zustandsverwaltung mit Observer-Pattern und Persistierung
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'STATE-MGR';
    
    // ===== ZENTRALER APPLICATION STATE =====
    window.AppState = {
        ui: {
            sidebarOpen: false,
            sidebarActive: null,  // 'navigation', 'history', 'favorites', null
            notesOpen: false,
            tipsVisible: true,
            menuOpen: false
        },
        preferences: {
            theme: 'system',
            detailLevel: 1,
            timeFormat: 'relative',  // 'relative' oder 'absolute'
            mediaLayer: 'standard',
            contrastEnhanced: false
        },
        content: {
            currentSection: null,
            scrollPosition: 0
        }
    };
    
    // ===== OBSERVER SUBSCRIBERS =====
    const subscribers = new Map();
    
    /**
     * Subscribe to state changes
     * @param {string} path - Dot-notation path (e.g., 'ui.sidebarOpen')
     * @param {Function} callback - Called when state changes
     * @returns {Function} Unsubscribe function
     */
    window.AppState.subscribe = function(path, callback) {
        if (!subscribers.has(path)) {
            subscribers.set(path, new Set());
        }
        
        subscribers.get(path).add(callback);
        
        LOG(MODULE, `Subscribed to state path: ${path}`);
        
        // Return unsubscribe function
        return () => {
            subscribers.get(path)?.delete(callback);
            LOG(MODULE, `Unsubscribed from state path: ${path}`);
        };
    };
    
    /**
     * Update state and notify subscribers
     * @param {string} path - Dot-notation path
     * @param {*} value - New value
     */
    window.AppState.update = function(path, value) {
        const keys = path.split('.');
        let current = window.AppState;
        
        // Navigate to target
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        
        // Update value
        const oldValue = current[keys[keys.length - 1]];
        current[keys[keys.length - 1]] = value;
        
        LOG(MODULE, `State updated: ${path}`, { oldValue, newValue: value });
        
        // Notify subscribers
        notifySubscribers(path, value, oldValue);
        
        // Persist to localStorage (debounced)
        debouncedPersist();
    };
    
    /**
     * Get state value
     * @param {string} path - Dot-notation path
     * @returns {*} State value
     */
    window.AppState.get = function(path) {
        const keys = path.split('.');
        let current = window.AppState;
        
        for (const key of keys) {
            current = current[key];
            if (current === undefined) return undefined;
        }
        
        return current;
    };
    
    // ===== INTERNAL FUNCTIONS =====
    
    function notifySubscribers(path, newValue, oldValue) {
        const pathSubscribers = subscribers.get(path);
        
        if (pathSubscribers && pathSubscribers.size > 0) {
            pathSubscribers.forEach(callback => {
                try {
                    callback(newValue, oldValue);
                } catch (error) {
                    LOG.error(MODULE, `Subscriber callback error for ${path}`, error);
                }
            });
            
            LOG(MODULE, `Notified ${pathSubscribers.size} subscriber(s) for: ${path}`);
        }
    }
    
    // ===== PERSISTENCE =====
    
    const STORAGE_KEY = 'axiom-app-state';
    let persistTimeout = null;
    
    function debouncedPersist() {
        clearTimeout(persistTimeout);
        persistTimeout = setTimeout(persistState, 500);
    }
    
    function persistState() {
        try {
            const stateToPersist = {
                ui: window.AppState.ui,
                preferences: window.AppState.preferences
                // content wird nicht persistiert (Session-basiert)
            };
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
            LOG(MODULE, 'State persisted to localStorage');
        } catch (error) {
            LOG.error(MODULE, 'Failed to persist state', error);
        }
    }
    
    function loadPersistedState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            
            if (saved) {
                const parsed = JSON.parse(saved);
                
                // Merge mit default state
                Object.assign(window.AppState.ui, parsed.ui || {});
                Object.assign(window.AppState.preferences, parsed.preferences || {});
                
                LOG.success(MODULE, 'State loaded from localStorage', parsed);
                return true;
            }
        } catch (error) {
            LOG.error(MODULE, 'Failed to load persisted state', error);
        }
        
        return false;
    }
    
    // ===== INITIALIZATION =====
    
    function initStateManager() {
        LOG(MODULE, 'Initializing state manager...');
        
        // Load persisted state
        loadPersistedState();
        
        // Apply initial state to DOM
        applyInitialState();
        
        LOG.success(MODULE, 'State manager initialized', window.AppState);
    }
    
    function applyInitialState() {
        // Theme anwenden
        if (window.AppState.preferences.theme !== 'system') {
            document.documentElement.setAttribute('data-theme', window.AppState.preferences.theme);
        }
        
        // Tips-Footer Sichtbarkeit
        if (!window.AppState.ui.tipsVisible) {
            document.body.classList.add('tips-hidden');
        }
        
        LOG(MODULE, 'Initial state applied to DOM');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStateManager);
    } else {
        initStateManager();
    }
    
    LOG(MODULE, 'State manager module loaded');
    
})();
```

---

## Migration bestehender Module

### Beispiel: `script-sidebar-manager.js` Migration

**VORHER (alt):**
```javascript
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    localStorage.setItem('axiom-sidebar-active', sidebarId);
}
```

**NACHHER (neu):**
```javascript
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    AppState.update('ui.sidebarActive', sidebarId);
    AppState.update('ui.sidebarOpen', true);
}

// Subscribe to changes from other modules
AppState.subscribe('ui.sidebarActive', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        updateSidebarDOM(newValue);
    }
});
```

### Beispiel: `script-theme.js` Migration

**NACHHER:**
```javascript
// Subscribe to theme changes
AppState.subscribe('preferences.theme', (newTheme) => {
    applyTheme(newTheme);
    updateThemeIcon(newTheme);
});

// Update theme
function cycleTheme() {
    const currentTheme = AppState.get('preferences.theme');
    const nextTheme = getNextTheme(currentTheme);
    AppState.update('preferences.theme', nextTheme);
}
```

---

## Implementierungsschritte

### Phase 1: Grundgerüst (1-2 Stunden)
1. Erstellen von `script-state-manager.js`
2. Integration in `index.html` (VOR allen anderen Modulen!)
3. Tests der Basis-Funktionalität

### Phase 2: Migration Kern-Module (2-3 Stunden)
1. `script-theme.js` migrieren
2. `script-sidebar-manager.js` migrieren
3. `script-tips.js` migrieren

### Phase 3: Migration restliche Module (2-3 Stunden)
1. `script-notes.js` migrieren
2. `script-preferences.js` migrieren
3. `script-history.js` (Zeitformat) migrieren

### Phase 4: Testing & Cleanup (1-2 Stunden)
1. Cross-Module-Tests
2. Alte localStorage-Aufrufe entfernen
3. Dokumentation aktualisieren

**Gesamt-Aufwand:** ca. 6-10 Stunden

---

## Vorteile nach Umsetzung

✅ **Zentrale Kontrolle:** Ein Ort für alle UI-Zustände  
✅ **Konsistenz:** Keine Race Conditions mehr  
✅ **Debugging:** Alle State-Changes geloggt an einem Ort  
✅ **Erweiterbarkeit:** Neue Features einfach in State integrieren  
✅ **Performance:** Reduzierte localStorage-Zugriffe durch Debouncing  
✅ **Testbarkeit:** State-Logic isoliert testbar

---

## Integration in index.html

**Reihenfolge der Script-Einbindung (WICHTIG!):**

```html
<!-- Core & State (ZUERST!) -->
<script src="script-core.js"></script>
<script src="script-state-manager.js"></script>

<!-- Basis-Module -->
<script src="script-section-management.js"></script>
<script src="script-sidebar-manager.js"></script>
<script src="script-navigation.js"></script>
<script src="script-history.js"></script>
<script src="script-notes.js"></script>
<script src="script-detail-level.js"></script>
<script src="script-tips.js"></script>
<script src="script-theme.js"></script>
<script src="script-preferences.js"></script>

<!-- Initialisierung (ZULETZT!) -->
<script src="script-init.js"></script>
```

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*