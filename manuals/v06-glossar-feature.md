# V06: Glossar-Feature mit Hover-Tooltips

**Priorität:** 🟡 Mittel (Nice-to-have)  
**Aufwand:** 10-14 Stunden  
**Status:** Geplant

---

## Feature-Beschreibung

Ein intelligentes Glossar-System, das:
- Fachbegriffe automatisch im sichtbaren Text erkennt
- Hover-Tooltips mit Erklärungen, Bildern und Links anzeigt
- Nur im Viewport befindliche Abschnitte verarbeitet (Performance)
- Barrierefrei über Tastatur bedienbar ist
- Begriffe per Tags und RegExp-Patterns identifiziert

**Ziel:** Kontextuelle Hilfe ohne Unterbrechung des Leseflusses

---

## Glossar-Datenstruktur (JSON)

### Datei: `glossar.json`

```json
{
  "version": "1.0",
  "updated": "2025-10-04",
  "terms": [
    {
      "id": "axiom-examine",
      "header": "AXIOM Examine",
      "explanation": "AXIOM Examine ist die primäre Analyse-Software von Magnet Forensics. Sie ermöglicht die Untersuchung digitaler Beweismittel aus verschiedenen Quellen wie Smartphones, Computern und Cloud-Diensten.",
      "image": "images/glossar/axiom-examine.png",
      "tags": ["AXIOM Examine", "Examine", "Magnet AXIOM"],
      "patterns": [
        "AXIOM\\s+Examine",
        "Magnet\\s+AXIOM"
      ],
      "link": "https://www.magnetforensics.com/products/magnet-axiom/",
      "category": "software"
    },
    {
      "id": "artifact",
      "header": "Artefakt",
      "explanation": "Ein digitales Artefakt ist eine Datenspur, die durch die Nutzung digitaler Geräte entsteht. Beispiele sind Browser-Verlauf, Anrufprotokolle oder Nachrichtenverläufe.",
      "image": null,
      "tags": ["Artefakt", "Artefakte", "Artifact", "Digital Artifact"],
      "patterns": [
        "Artefakt[e]?",
        "Artifact[s]?"
      ],
      "link": null,
      "category": "forensik"
    },
    {
      "id": "hash-wert",
      "header": "Hash-Wert",
      "explanation": "Ein Hash-Wert ist eine eindeutige digitale Signatur einer Datei. Er wird zur Verifizierung der Datenintegrität verwendet und ändert sich bei jeder Modifikation der Datei.",
      "image": "images/glossar/hash.png",
      "tags": ["Hash", "MD5", "SHA-256", "Hash-Wert"],
      "patterns": [
        "Hash[-\\s]?[Ww]ert[e]?",
        "MD5",
        "SHA[-]?256"
      ],
      "link": "https://de.wikipedia.org/wiki/Hashfunktion",
      "category": "technik"
    },
    {
      "id": "export",
      "header": "Export",
      "explanation": "Der Export bezeichnet die Extraktion von Daten aus einem Quellsystem in ein Format, das für die Analyse geeignet ist. AXIOM Process führt diesen Export durch.",
      "image": null,
      "tags": ["Export", "Datenexport", "Extraktion"],
      "patterns": [
        "Export[s]?",
        "exportier[t|en]"
      ],
      "link": null,
      "category": "forensik"
    }
  ],
  "categories": {
    "software": {
      "name": "Software & Tools",
      "color": "#004B76"
    },
    "forensik": {
      "name": "Forensische Konzepte",
      "color": "#005C45"
    },
    "technik": {
      "name": "Technische Grundlagen",
      "color": "#780F2D"
    }
  }
}
```

### JSON-Schema Erklärung

| Feld | Typ | Beschreibung | Pflicht |
|------|-----|--------------|---------|
| `id` | string | Eindeutiger Identifier | ✅ |
| `header` | string | Überschrift im Tooltip | ✅ |
| `explanation` | string | Erklärtext (max. 250 Zeichen) | ✅ |
| `image` | string/null | Pfad zu Bild (max. 300x200px) | ❌ |
| `tags` | array | Exakte Begriffe zum Matchen | ✅ |
| `patterns` | array | RegExp-Patterns zum Matchen | ❌ |
| `link` | string/null | Weiterführender Link | ❌ |
| `category` | string | Kategorie-ID | ✅ |

---

## CSS-Styling

```css
/* ===== GLOSSAR TERMS (im Text) ===== */

.glossar-term {
    position: relative;
    border-bottom: 2px dashed var(--color-info);
    cursor: help;
    transition: all var(--transition-fast);
    text-decoration: none;
    color: inherit;
}

.glossar-term:hover,
.glossar-term:focus {
    border-bottom-color: var(--color-primary);
    background-color: rgba(0, 75, 118, 0.1);
}

/* Kategorie-basierte Farben */
.glossar-term[data-category="software"] {
    border-bottom-color: #004B76;
}

.glossar-term[data-category="forensik"] {
    border-bottom-color: #005C45;
}

.glossar-term[data-category="technik"] {
    border-bottom-color: #780F2D;
}

/* ===== GLOSSAR TOOLTIP ===== */

.glossar-tooltip {
    position: fixed;
    max-width: 400px;
    background-color: var(--color-surface-elevated);
    border: 2px solid var(--color-border-strong);
    border-radius: 12px;
    box-shadow: 0 12px 40px var(--color-shadow-strong);
    z-index: 10001;
    opacity: 0;
    pointer-events: none;
    transform: scale(0.95) translateY(-10px);
    transition: all 0.2s ease;
}

.glossar-tooltip.visible {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1) translateY(0);
}

/* Header */
.glossar-tooltip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 2px solid var(--color-border);
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
    color: var(--color-surface-elevated);
    border-radius: 10px 10px 0 0;
}

.glossar-tooltip-title {
    margin: 0;
    font-size: 1.1em;
    font-weight: 600;
}

.glossar-tooltip-close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 1.3em;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.glossar-tooltip-close:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

/* Body */
.glossar-tooltip-body {
    padding: 20px;
}

.glossar-tooltip-image {
    width: 100%;
    max-height: 200px;
    margin-bottom: 15px;
    border-radius: 8px;
    overflow: hidden;
    display: none;
}

.glossar-tooltip-image.has-image {
    display: block;
}

.glossar-tooltip-image img {
    width: 100%;
    height: auto;
    display: block;
}

.glossar-tooltip-text {
    margin: 0;
    line-height: 1.6;
    color: var(--color-text-primary);
}

/* Footer */
.glossar-tooltip-footer {
    padding: 12px 20px;
    border-top: 2px solid var(--color-border);
    display: none;
}

.glossar-tooltip-footer.has-link {
    display: block;
}

.glossar-tooltip-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all var(--transition-fast);
}

.glossar-tooltip-link:hover {
    color: var(--color-primary-hover);
    gap: 8px;
}

/* Tooltip-Pfeil */
.glossar-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-bottom-color: var(--color-primary);
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .glossar-tooltip {
        max-width: calc(100vw - 40px);
        left: 20px !important;
        right: 20px;
        bottom: 80px !important;
        top: auto !important;
        transform: scale(0.95) translateY(10px);
    }
    
    .glossar-tooltip.visible {
        transform: scale(1) translateY(0);
    }
    
    .glossar-tooltip::before {
        bottom: auto;
        top: 100%;
        border-bottom-color: transparent;
        border-top-color: var(--color-border-strong);
    }
}

/* Accessibility: Tastatur-Navigation */
.glossar-term:focus {
    outline: 3px solid var(--color-focus);
    outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    .glossar-tooltip {
        transition: opacity 0.1s;
        transform: none;
    }
    
    .glossar-tooltip.visible {
        transform: none;
    }
}
```

---

## JavaScript-Modul

### Neues Modul: `script-glossar.js`

```javascript
// ============================================================================
// SCRIPT-GLOSSAR.JS
// Automatische Glossar-Term-Erkennung mit Hover-Tooltips
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'GLOSSAR';
    
    // ===== STATE =====
    let glossarData = null;
    let glossarTerms = [];
    let tooltipElement = null;
    let activeTooltip = null;
    let tooltipTimeout = null;
    
    // ===== GLOSSAR LADEN =====
    
    async function loadGlossar() {
        try {
            const response = await fetch('glossar.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            glossarData = await response.json();
            glossarTerms = glossarData.terms || [];
            
            LOG.success(MODULE, `Loaded ${glossarTerms.length} glossar terms`);
            return true;
        } catch (error) {
            LOG.error(MODULE, 'Failed to load glossar.json', error);
            return false;
        }
    }
    
    // ===== TERM-ERKENNUNG IM VIEWPORT =====
    
    function processVisibleSections() {
        const sections = document.querySelectorAll('.content-section');
        
        sections.forEach(section => {
            // Prüfe ob Section im Viewport
            if (!isInViewport(section)) return;
            
            // Prüfe ob bereits verarbeitet
            if (section.hasAttribute('data-glossar-processed')) return;
            
            processSection(section);
            section.setAttribute('data-glossar-processed', 'true');
        });
    }
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        );
    }
    
    function processSection(section) {
        const textNodes = getTextNodes(section);
        
        textNodes.forEach(node => {
            wrapGlossarTerms(node);
        });
        
        LOG(MODULE, `Processed section: ${section.id}`);
    }
    
    function getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Ignoriere bereits verarbeitete Bereiche
                    if (node.parentElement.classList.contains('glossar-term')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    
                    // Ignoriere bestimmte Tags
                    const tagName = node.parentElement.tagName.toLowerCase();
                    if (['script', 'style', 'code', 'pre'].includes(tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    
                    // Nur Nodes mit Inhalt
                    if (node.textContent.trim().length > 0) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    
                    return NodeFilter.FILTER_REJECT;
                }
            }
        );
        
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        return textNodes;
    }
    
    function wrapGlossarTerms(textNode) {
        const text = textNode.textContent;
        let matches = [];
        
        // Finde alle Übereinstimmungen
        glossarTerms.forEach(term => {
            // Prüfe Tags
            term.tags.forEach(tag => {
                const regex = new RegExp(`\\b${escapeRegex(tag)}\\b`, 'gi');
                let match;
                while ((match = regex.exec(text)) !== null) {
                    matches.push({
                        start: match.index,
                        end: match.index + match[0].length,
                        text: match[0],
                        term: term
                    });
                }
            });
            
            // Prüfe RegExp Patterns
            if (term.patterns) {
                term.patterns.forEach(pattern => {
                    try {
                        const regex = new RegExp(pattern, 'gi');
                        let match;
                        while ((match = regex.exec(text)) !== null) {
                            matches.push({
                                start: match.index,
                                end: match.index + match[0].length,
                                text: match[0],
                                term: term
                            });
                        }
                    } catch (e) {
                        LOG.error(MODULE, `Invalid pattern: ${pattern}`, e);
                    }
                });
            }
        });
        
        // Sortiere und filtere Überlappungen
        matches = removeOverlappingMatches(matches);
        
        if (matches.length === 0) return;
        
        // Ersetze Text durch Spans
        replaceWithSpans(textNode, matches);
    }
    
    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\## Feature-Beschreibung

Ein intelligentes Glossar-System, das:
- Fachbegriffe automatisch im sichtbaren Text erkennt
-');
    }
    
    function removeOverlappingMatches(matches) {
        // Sortiere nach Position
        matches.sort((a, b) => a.start - b.start);
        
        const filtered = [];
        let lastEnd = -1;
        
        matches.forEach(match => {
            if (match.start >= lastEnd) {
                filtered.push(match);
                lastEnd = match.end;
            }
        });
        
        return filtered;
    }
    
    function replaceWithSpans(textNode, matches) {
        const text = textNode.textContent;
        const parent = textNode.parentNode;
        const fragment = document.createDocumentFragment();
        
        let lastIndex = 0;
        
        matches.forEach(match => {
            // Text vor dem Match
            if (match.start > lastIndex) {
                const beforeText = text.substring(lastIndex, match.start);
                fragment.appendChild(document.createTextNode(beforeText));
            }
            
            // Glossar-Term Span
            const span = document.createElement('span');
            span.className = 'glossar-term';
            span.textContent = match.text;
            span.setAttribute('data-glossar-id', match.term.id);
            span.setAttribute('data-category', match.term.category);
            span.setAttribute('tabindex', '0');
            span.setAttribute('role', 'button');
            span.setAttribute('aria-label', `Glossar: ${match.term.header}`);
            
            fragment.appendChild(span);
            
            lastIndex = match.end;
        });
        
        // Restlicher Text
        if (lastIndex < text.length) {
            const afterText = text.substring(lastIndex);
            fragment.appendChild(document.createTextNode(afterText));
        }
        
        // Ersetze Original-Textnode
        parent.replaceChild(fragment, textNode);
    }
    
    // ===== TOOLTIP-VERWALTUNG =====
    
    function createTooltipElement() {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'glossar-tooltip';
        tooltipElement.setAttribute('role', 'tooltip');
        tooltipElement.setAttribute('aria-hidden', 'true');
        
        tooltipElement.innerHTML = `
            <div class="glossar-tooltip-header">
                <h4 class="glossar-tooltip-title"></h4>
                <button class="glossar-tooltip-close" aria-label="Glossar schließen">✕</button>
            </div>
            <div class="glossar-tooltip-body">
                <div class="glossar-tooltip-image"></div>
                <p class="glossar-tooltip-text"></p>
            </div>
            <div class="glossar-tooltip-footer">
                <a class="glossar-tooltip-link" target="_blank" rel="noopener noreferrer">
                    Mehr erfahren →
                </a>
            </div>
        `;
        
        document.body.appendChild(tooltipElement);
        
        // Close Button Handler
        tooltipElement.querySelector('.glossar-tooltip-close').addEventListener('click', () => {
            hideTooltip();
        });
        
        // Tooltip selbst sollte Hover erlauben
        tooltipElement.addEventListener('mouseenter', () => {
            clearTimeout(tooltipTimeout);
        });
        
        tooltipElement.addEventListener('mouseleave', () => {
            scheduleHideTooltip();
        });
    }
    
    function showTooltip(termElement) {
        const termId = termElement.getAttribute('data-glossar-id');
        const term = glossarTerms.find(t => t.id === termId);
        
        if (!term) {
            LOG.error(MODULE, `Term not found: ${termId}`);
            return;
        }
        
        // Tooltip-Inhalt aktualisieren
        updateTooltipContent(term);
        
        // Position berechnen
        positionTooltip(termElement);
        
        // Anzeigen
        tooltipElement.classList.add('visible');
        tooltipElement.setAttribute('aria-hidden', 'false');
        
        activeTooltip = termElement;
        
        LOG(MODULE, `Showing tooltip: ${term.header}`);
    }
    
    function updateTooltipContent(term) {
        // Title
        tooltipElement.querySelector('.glossar-tooltip-title').textContent = term.header;
        
        // Image
        const imageContainer = tooltipElement.querySelector('.glossar-tooltip-image');
        if (term.image) {
            imageContainer.innerHTML = `<img src="${term.image}" alt="${term.header}">`;
            imageContainer.classList.add('has-image');
        } else {
            imageContainer.innerHTML = '';
            imageContainer.classList.remove('has-image');
        }
        
        // Text (max 250 Zeichen)
        let explanation = term.explanation;
        if (explanation.length > 250) {
            explanation = explanation.substring(0, 247) + '...';
        }
        tooltipElement.querySelector('.glossar-tooltip-text').textContent = explanation;
        
        // Link
        const footer = tooltipElement.querySelector('.glossar-tooltip-footer');
        const link = tooltipElement.querySelector('.glossar-tooltip-link');
        if (term.link) {
            link.href = term.link;
            footer.classList.add('has-link');
        } else {
            footer.classList.remove('has-link');
        }
    }
    
    function positionTooltip(termElement) {
        const rect = termElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        // Standardposition: Oberhalb des Terms
        let top = rect.top - tooltipRect.height - 12;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        
        // Viewport-Checks
        if (top < 10) {
            // Unterhalb anzeigen
            top = rect.bottom + 12;
        }
        
        if (left < 10) {
            left = 10;
        }
        
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }
    
    function hideTooltip() {
        clearTimeout(tooltipTimeout);
        
        tooltipElement.classList.remove('visible');
        tooltipElement.setAttribute('aria-hidden', 'true');
        
        activeTooltip = null;
        
        LOG(MODULE, 'Tooltip hidden');
    }
    
    function scheduleHideTooltip() {
        tooltipTimeout = setTimeout(() => {
            hideTooltip();
        }, 300);
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Hover auf Glossar-Terms
        document.addEventListener('mouseenter', (e) => {
            const term = e.target.closest('.glossar-term');
            if (!term) return;
            
            clearTimeout(tooltipTimeout);
            showTooltip(term);
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            const term = e.target.closest('.glossar-term');
            if (!term) return;
            
            scheduleHideTooltip();
        }, true);
        
        // Tastatur-Navigation
        document.addEventListener('keydown', (e) => {
            const term = e.target.closest('.glossar-term');
            if (!term) return;
            
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showTooltip(term);
            }
            
            if (e.key === 'Escape' && activeTooltip) {
                hideTooltip();
            }
        });
        
        // Focus auf Glossar-Terms
        document.addEventListener('focus', (e) => {
            const term = e.target.closest('.glossar-term');
            if (!term) return;
            
            showTooltip(term);
        }, true);
        
        document.addEventListener('blur', (e) => {
            const term = e.target.closest('.glossar-term');
            if (!term) return;
            
            scheduleHideTooltip();
        }, true);
        
        // Scroll-Listener für Viewport-Erkennung
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                processVisibleSections();
            }, 150);
        }, { passive: true });
        
        // Resize-Listener
        window.addEventListener('resize', () => {
            if (activeTooltip) {
                positionTooltip(activeTooltip);
            }
        });
    }
    
    // ===== INITIALIZATION =====
    
    async function initGlossar() {
        LOG(MODULE, 'Initializing glossar system...');
        
        // Lade Glossar-Daten
        const loaded = await loadGlossar();
        if (!loaded) {
            LOG.error(MODULE, 'Failed to initialize - glossar.json not loaded');
            return;
        }
        
        // Erstelle Tooltip-Element
        createTooltipElement();
        
        // Verarbeite initial sichtbare Sections
        processVisibleSections();
        
        // Setup Event Handlers
        setupEventHandlers();
        
        LOG.success(MODULE, 'Glossar system initialized');
    }
    
    // ===== PUBLIC API =====
    
    window.GlossarManager = {
        reload: loadGlossar,
        processSection: processSection,
        refresh: processVisibleSections
    };
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlossar);
    } else {
        initGlossar();
    }
    
    LOG(MODULE, 'Glossar module loaded');
    
})();
```

---

## Barrierefreiheit

### Umgesetzte Features:
- ✅ `tabindex="0"` für Tastatur-Navigation
- ✅ `role="button"` für Screen Reader
- ✅ `aria-label` mit Kontext
- ✅ Enter/Space zum Öffnen, ESC zum Schließen
- ✅ Focus-Events für Tastatur-Nutzer

### Screen Reader Verhalten:
- Begriff wird als "Button" angekündigt
- aria-label erklärt: "Glossar: [Begriff]"
- Tooltip-Inhalt wird beim Öffnen vorgelesen

---

## Implementierungsschritte

### Phase 1: Glossar-JSON erstellen (2-3 Stunden)
1. Fachbegriffe sammeln
2. Erklärungen formulieren (max. 250 Zeichen)
3. Bilder vorbereiten (300x200px)
4. Tags und Patterns definieren
5. JSON-Datei erstellen und validieren

### Phase 2: JavaScript-Modul (4-5 Stunden)
1. `script-glossar.js` erstellen
2. Term-Erkennung implementieren
3. Tooltip-Logik entwickeln
4. Event-Handling einbauen
5. Testing: Term-Matching und Tooltip-Anzeige

### Phase 3: CSS-Styling (2-3 Stunden)
1. CSS in `styles.css` einfügen
2. Responsive-Design für Mobile
3. Theme-Kompatibilität sicherstellen
4. Testing: Alle 4 Themes

### Phase 4: Testing & Barrierefreiheit (2-3 Stunden)
1. Screen Reader Tests
2. Keyboard-Navigation prüfen
3. Performance-Tests (viele Begriffe)
4. Edge Cases behandeln

**Gesamt-Aufwand:** 10-14 Stunden

---

## Testing-Checkliste

### Funktionalität
- [ ] Begriffe werden im Viewport erkannt
- [ ] Tooltips erscheinen bei Hover
- [ ] Tooltips erscheinen bei Focus (Tastatur)
- [ ] Tooltips positionieren sich korrekt
- [ ] Bilder werden angezeigt (falls vorhanden)
- [ ] Links funktionieren (falls vorhanden)
- [ ] ESC schließt Tooltip
- [ ] Scroll-Performance ist gut

### Barrierefreiheit
- [ ] Screen Reader erkennt Glossar-Terms
- [ ] Tastatur-Navigation funktioniert
- [ ] Focus-Indicator sichtbar
- [ ] aria-labels korrekt
- [ ] Reduced Motion wird respektiert

### Performance
- [ ] Nur sichtbare Sections werden verarbeitet
- [ ] Keine doppelte Verarbeitung
- [ ] Scroll-Performance bleibt flüssig
- [ ] Memory Leaks ausgeschlossen

### Alle Themes
- [ ] Tag-Modus: Lesbar und sichtbar
- [ ] Nacht-Modus: Lesbar und sichtbar
- [ ] Hochkontrast Hell: Lesbar
- [ ] Hochkontrast Dunkel: Lesbar

---

## Vorteile

✅ **Kontextuelle Hilfe:** Erklärungen genau dort, wo benötigt  
✅ **Keine Unterbrechung:** Tooltip verschwindet automatisch  
✅ **Intelligente Erkennung:** Tags + RegExp für Flexibilität  
✅ **Performance:** Nur Viewport wird verarbeitet  
✅ **Barrierefrei:** Keyboard & Screen Reader Support  
✅ **Erweiterbar:** Neue Begriffe einfach per JSON hinzufügen

---

## Erweitungsmöglichkeiten (Optional)

### 1. Glossar-Sidebar
```javascript
// Alle Begriffe alphabetisch auflisten
function showGlossarSidebar() {
    const sortedTerms = glossarTerms.sort((a, b) => 
        a.header.localeCompare(b.header)
    );
    // Sidebar mit allen Begriffen rendern
}
```

### 2. Suchfunktion
```javascript
// Glossar-Begriffe durchsuchen
function searchGlossar(query) {
    return glossarTerms.filter(term => 
        term.header.toLowerCase().includes(query.toLowerCase()) ||
        term.explanation.toLowerCase().includes(query.toLowerCase())
    );
}
```

### 3. Statistiken
```javascript
// Tracking: Welche Begriffe werden oft angeschaut?
function trackGlossarUsage(termId) {
    const stats = JSON.parse(localStorage.getItem('glossar-stats') || '{}');
    stats[termId] = (stats[termId] || 0) + 1;
    localStorage.setItem('glossar-stats', JSON.stringify(stats));
}
```

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025* Hover-Tooltips mit Erklärungen, Bildern und Links anzeigt