# V07: "Don't tell; just show"-Modus

**Priorität:** 🟠 Hoch (Chef-Priorität!)  
**Aufwand:** 3-4 Stunden  
**Status:** Zeitnah umsetzen

---

## Feature-Beschreibung

Ein spezieller Anzeigemodus für Anwender, die:
- Nur die praktischen Schritte sehen wollen
- Keine theoretischen Erklärungen benötigen
- Schnell zum Ziel kommen möchten

**Verhalten:**
- Im **Standard-Modus**: Normale Anzeige mit Erklärungen
- Im **Vollständig-Modus**: Alle Inhalte sichtbar
- Im **Show-Only-Modus**: Nur Anweisungen und Visuals, keine Erklärungen

---

## HTML-Markup-Konvention

### Neue Data-Attribute für Content-Typen

Jeder Inhalts-Block erhält ein `data-content-type` Attribut:

```html
<section class="content-section" data-section="step1">
    <h2>Schritt 1: Export starten</h2>
    
    <!-- SHOW: Praktische Anweisungen (immer sichtbar im Show-Only) -->
    <div data-content-type="instruction">
        <ol>
            <li>Öffnen Sie AXIOM Process</li>
            <li>Klicken Sie auf "New Case"</li>
            <li>Wählen Sie die Datenquelle aus</li>
        </ol>
    </div>
    
    <!-- TELL: Erklärungen (versteckt im Show-Only Modus) -->
    <div data-content-type="explanation">
        <p>
            AXIOM Process ist die erste Stufe der Datenverarbeitung. 
            Es extrahiert und indexiert Daten aus verschiedenen Quellen...
        </p>
    </div>
    
    <!-- SHOW: Screenshots/Visuals (immer sichtbar im Show-Only) -->
    <div data-content-type="visual">
        <img src="images/step1-screenshot.png" alt="AXIOM Process Startbildschirm">
    </div>
    
    <!-- TELL: Hintergrundinformationen (versteckt im Show-Only Modus) -->
    <div data-content-type="background">
        <div class="info-box">
            <strong>Technischer Hintergrund:</strong>
            Die Extraktion erfolgt über proprietäre Parser...
        </div>
    </div>
</section>
```

### Content-Type Kategorien

| Typ | Beschreibung | Show-Only Modus |
|-----|--------------|-----------------|
| `instruction` | Schritt-für-Schritt Anweisungen | ✅ Sichtbar |
| `visual` | Screenshots, Diagramme, Videos | ✅ Sichtbar |
| `explanation` | Erklärungen, Theorie | ❌ Versteckt |
| `background` | Hintergrundinformationen, Kontext | ❌ Versteckt |

---

## CSS-Styling

```css
/* ===== CONTENT TYPE VISIBILITY ===== */

/* Show-Only Modus: Verstecke Erklärungen und Hintergründe */
[data-media-layer="show-only"] [data-content-type="explanation"],
[data-media-layer="show-only"] [data-content-type="background"] {
    display: none;
}

/* Smooth Transition beim Wechsel */
[data-content-type] {
    transition: opacity var(--transition-medium),
                max-height var(--transition-medium);
}

.content-hidden {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    margin: 0 !important;
    padding: 0 !important;
}

/* Instructions hervorheben im Show-Only Modus */
[data-media-layer="show-only"] [data-content-type="instruction"] {
    background-color: var(--color-surface);
    padding: 20px;
    border-left: 4px solid var(--color-success);
    border-radius: 8px;
    margin: 20px 0;
    box-shadow: 0 2px 8px var(--color-shadow);
}

[data-media-layer="show-only"] [data-content-type="instruction"] ol,
[data-media-layer="show-only"] [data-content-type="instruction"] ul {
    margin-left: 20px;
}

[data-media-layer="show-only"] [data-content-type="instruction"] li {
    margin-bottom: 12px;
    font-weight: 500;
}

/* Visuals hervorheben im Show-Only Modus */
[data-media-layer="show-only"] [data-content-type="visual"] {
    margin: 20px 0;
    box-shadow: 0 4px 12px var(--color-shadow);
    border-radius: 8px;
    overflow: hidden;
}

[data-media-layer="show-only"] [data-content-type="visual"] img {
    display: block;
    width: 100%;
    height: auto;
}
```

---

## JavaScript-Erweiterung

### In `script-preferences.js` erweitern:

```javascript
// ===== MEDIA LAYER SYSTEM =====

const MEDIA_LAYERS = {
    STANDARD: 'standard',
    SHOW_ONLY: 'show-only',  // NEU
    TEXT_ONLY: 'text-only',
    FULL: 'full'
};

const MEDIA_LAYER_NAMES = {
    'standard': 'Standard',
    'show-only': 'Nur Anweisungen',  // NEU
    'text-only': 'Nur Text',
    'full': 'Vollständig'
};

let currentMediaLayer = MEDIA_LAYERS.STANDARD;

// ===== APPLY MEDIA LAYER =====

function applyMediaLayer(layer) {
    // Body-Attribut setzen
    document.body.setAttribute('data-media-layer', layer);
    
    // State aktualisieren (wenn State Manager vorhanden)
    if (window.AppState) {
        AppState.update('preferences.mediaLayer', layer);
    }
    
    // Spezifische Modus-Logik
    switch(layer) {
        case MEDIA_LAYERS.STANDARD:
            applyStandardMode();
            break;
        case MEDIA_LAYERS.SHOW_ONLY:
            applyShowOnlyMode();
            break;
        case MEDIA_LAYERS.TEXT_ONLY:
            applyTextOnlyMode();
            break;
        case MEDIA_LAYERS.FULL:
            applyFullMode();
            break;
    }
    
    // UI aktualisieren
    updateMediaLayerUI(layer);
    
    LOG('PREFS', `Media layer applied: ${layer}`);
}

// ===== SHOW-ONLY MODE =====

function applyShowOnlyMode() {
    // Verstecke Erklärungen und Hintergrund-Infos
    const hideTypes = ['explanation', 'background'];
    
    hideTypes.forEach(type => {
        const elements = document.querySelectorAll(`[data-content-type="${type}"]`);
        elements.forEach(el => {
            el.classList.add('content-hidden');
            el.setAttribute('aria-hidden', 'true');
        });
    });
    
    // Zeige nur Instructions und Visuals
    const showTypes = ['instruction', 'visual'];
    
    showTypes.forEach(type => {
        const elements = document.querySelectorAll(`[data-content-type="${type}"]`);
        elements.forEach(el => {
            el.classList.remove('content-hidden');
            el.setAttribute('aria-hidden', 'false');
        });
    });
    
    LOG('PREFS', 'Show-Only mode applied');
}

function removeShowOnlyMode() {
    // Alle Content-Types wieder sichtbar machen
    const allElements = document.querySelectorAll('[data-content-type]');
    allElements.forEach(el => {
        el.classList.remove('content-hidden');
        el.setAttribute('aria-hidden', 'false');
    });
}

// ===== STANDARD MODE =====

function applyStandardMode() {
    // Alle Inhalte sichtbar (außer Detail-Level 3)
    removeShowOnlyMode();
    removeTextOnlyMode();
    removeFullMode();
    
    LOG('PREFS', 'Standard mode applied');
}

// ===== TEXT-ONLY MODE (bestehend) =====

function applyTextOnlyMode() {
    // Bestehende Logik für Text-Only
    const mediaElements = document.querySelectorAll('img, video, iframe');
    mediaElements.forEach(el => {
        el.style.display = 'none';
    });
}

function removeTextOnlyMode() {
    const mediaElements = document.querySelectorAll('img, video, iframe');
    mediaElements.forEach(el => {
        el.style.display = '';
    });
}

// ===== FULL MODE (bestehend) =====

function applyFullMode() {
    // Bestehende Logik für Full Mode
    removeShowOnlyMode();
    removeTextOnlyMode();
}

function removeFullMode() {
    // Cleanup
}

// ===== CYCLE MEDIA LAYER =====

function cycleMediaLayer() {
    const order = ['standard', 'show-only', 'text-only', 'full'];
    const currentIndex = order.indexOf(currentMediaLayer);
    const nextIndex = (currentIndex + 1) % order.length;
    const nextLayer = order[nextIndex];
    
    setMediaLayer(nextLayer);
}

function setMediaLayer(layer) {
    currentMediaLayer = layer;
    applyMediaLayer(layer);
    
    // In localStorage speichern
    try {
        localStorage.setItem('axiom-media-layer', layer);
    } catch (error) {
        LOG.error('PREFS', 'Failed to save media layer preference', error);
    }
}

// ===== UI UPDATE =====

function updateMediaLayerUI(layer) {
    const statusElement = document.getElementById('media-layer-status');
    if (statusElement) {
        statusElement.textContent = MEDIA_LAYER_NAMES[layer] || layer;
    }
}

// ===== INITIALIZATION =====

function loadMediaLayerPreference() {
    try {
        const saved = localStorage.getItem('axiom-media-layer');
        if (saved && Object.values(MEDIA_LAYERS).includes(saved)) {
            currentMediaLayer = saved;
            applyMediaLayer(saved);
        }
    } catch (error) {
        LOG.error('PREFS', 'Failed to load media layer preference', error);
    }
}

// ===== EVENT HANDLERS =====

function initMediaLayerControls() {
    const toggleBtn = document.getElementById('toggle-media-layer');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            cycleMediaLayer();
        });
        
        LOG('PREFS', 'Media layer controls initialized');
    }
}

// ===== AUTO-INIT =====

document.addEventListener('DOMContentLoaded', () => {
    loadMediaLayerPreference();
    initMediaLayerControls();
});
```

---

## UI-Integration

### Menu-Item erweitern (bereits vorhanden):

```html
<button class="menu-item" id="toggle-media-layer" role="menuitem">
    <span class="menu-icon">🖼️</span>
    Medien: <span id="media-layer-status">Standard</span>
</button>
```

**Verhalten beim Klicken:**
1. Standard → Nur Anweisungen
2. Nur Anweisungen → Nur Text
3. Nur Text → Vollständig
4. Vollständig → Standard

---

## Migration bestehender Inhalte

### Schritt 1: Inhalte taggen

Gehen Sie durch `index.html` und fügen Sie zu jedem Content-Block das passende Attribut hinzu:

**Beispiel vorher:**
```html
<section class="content-section" data-section="step2">
    <h2>Schritt 2: Datenauswahl</h2>
    <p>In diesem Schritt wählen Sie die zu exportierenden Daten aus...</p>
    <ol>
        <li>Klicken Sie auf "Select Evidence"</li>
        <li>Wählen Sie die Datenquellen</li>
    </ol>
    <div class="info-box">
        <strong>Hinweis:</strong> Die Auswahl beeinflusst die Verarbeitungszeit...
    </div>
</section>
```

**Beispiel nachher:**
```html
<section class="content-section" data-section="step2">
    <h2>Schritt 2: Datenauswahl</h2>
    
    <div data-content-type="explanation">
        <p>In diesem Schritt wählen Sie die zu exportierenden Daten aus...</p>
    </div>
    
    <div data-content-type="instruction">
        <ol>
            <li>Klicken Sie auf "Select Evidence"</li>
            <li>Wählen Sie die Datenquellen</li>
        </ol>
    </div>
    
    <div data-content-type="background">
        <div class="info-box">
            <strong>Hinweis:</strong> Die Auswahl beeinflusst die Verarbeitungszeit...
        </div>
    </div>
</section>
```

### Schritt 2: Bilder taggen

```html
<!-- Vorher -->
<img src="images/screenshot.png" alt="Screenshot">

<!-- Nachher -->
<div data-content-type="visual">
    <img src="images/screenshot.png" alt="Screenshot">
</div>
```

---

## Testing-Checkliste

### Funktionalität
- [ ] Wechsel zwischen Modi funktioniert
- [ ] Instructions bleiben im Show-Only sichtbar
- [ ] Visuals bleiben im Show-Only sichtbar
- [ ] Explanations werden im Show-Only versteckt
- [ ] Background-Infos werden im Show-Only versteckt
- [ ] Preference wird in localStorage gespeichert
- [ ] Preference wird beim Neuladen wiederhergestellt

### Visuals
- [ ] Instructions sind im Show-Only hervorgehoben
- [ ] Übergänge sind smooth (keine Ruckler)
- [ ] Layout bleibt konsistent

### Accessibility
- [ ] `aria-hidden` wird korrekt gesetzt
- [ ] Screen Reader respektiert versteckte Inhalte
- [ ] Keyboard-Navigation funktioniert

### Alle Themes
- [ ] Tag-Modus: Lesbarkeit gegeben
- [ ] Nacht-Modus: Lesbarkeit gegeben
- [ ] Hochkontrast Hell: Lesbarkeit gegeben
- [ ] Hochkontrast Dunkel: Lesbarkeit gegeben

---

## Vorteile

✅ **Zielgruppen-gerecht:** Verschiedene Lerntypen unterstützt  
✅ **Schnelligkeit:** Erfahrene User kommen direkt zum Punkt  
✅ **Übersichtlichkeit:** Weniger visueller Clutter  
✅ **Chef-Happy:** Erfüllt explizite Anforderung 😊  
✅ **Einfache Wartung:** Content-Type über Attribut steuerbar  
✅ **Flexibel:** Neue Content-Types einfach hinzufügbar

---

## Erweiterungsmöglichkeiten (Optional)

### Weitere Content-Types:

```javascript
// Mögliche Erweiterungen:
const CONTENT_TYPES = {
    INSTRUCTION: 'instruction',   // ✅ Implementiert
    VISUAL: 'visual',              // ✅ Implementiert
    EXPLANATION: 'explanation',    // ✅ Implementiert
    BACKGROUND: 'background',      // ✅ Implementiert
    
    // Zukünftig:
    EXAMPLE: 'example',            // Beispiele
    WARNING: 'warning',            // Warnungen
    TIP: 'tip',                    // Tipps
    ADVANCED: 'advanced'           // Erweiterte Infos
};
```

### User-Preference für Default-Modus:

```javascript
// In Einstellungen: User kann Default-Modus wählen
function setDefaultMediaLayer(layer) {
    localStorage.setItem('axiom-media-layer-default', layer);
}
```

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*