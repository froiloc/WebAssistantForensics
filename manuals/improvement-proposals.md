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
        tooltipElement.id = 'glossar-tooltip';
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
        }, 300); // 300ms Verzögerung
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

### Barrierefreiheit-Überlegungen

**Umgesetzte Features:**
- ✅ `tabindex="0"` für Tastatur-Navigation
- ✅ `role="button"` für Screen Reader
- ✅ `aria-label` mit Kontext
- ✅ Enter/Space zum Öffnen, ESC zum Schließen
- ✅ Focus-Events für Tastatur-Nutzer

**Weitere Überlegungen:**
- Live-Regions für dynamische Inhalte
- ARIA-Beschreibungen für komplexe Tooltips
- High Contrast Mode Support

### Implementierungsschritte

1. **Phase 1:** Glossar-JSON erstellen (2-3 Stunden)
2. **Phase 2:** JavaScript-Modul entwickeln (4-5 Stunden)
3. **Phase 3:** CSS-Styling implementieren (2-3 Stunden)
4. **Phase 4:** Testing & Barrierefreiheit (2-3 Stunden)

**Gesamt-Aufwand:** 10-14 Stunden

---

## 🎬 Verbesserungsvorschlag 7: "Don't tell; just show"-Modus

**Priorität:** 🟠 Hoch  
**Aufwand:** 3-4 Stunden  
**Status:** Zeitnah umsetzen (Chef-Priorität!)

### Feature-Beschreibung

Ein spezieller Anzeigemodus für Anwender, die:
- Nur die praktischen Schritte sehen wollen
- Keine theoretischen Erklärungen benötigen
- Schnell zum Ziel kommen möchten

**Verhalten:**
- Im Standard-Modus: Normale Anzeige
- Im "Vollständig"-Modus: Alle Inhalte sichtbar
- Im "Show-Only"-Modus: Nur Anweisungen, keine Erklärungen

### Architektur

#### 1. HTML-Markup-Konvention

**Neue Data-Attribute:**

```html
<section class="content-section" data-section="step1">
    <h2>Schritt 1: Export starten</h2>
    
    <!-- SHOW: Praktische Anweisungen -->
    <div data-content-type="instruction">
        <ol>
            <li>Öffnen Sie AXIOM Process</li>
            <li>Klicken Sie auf "New Case"</li>
            <li>Wählen Sie die Datenquelle aus</li>
        </ol>
    </div>
    
    <!-- TELL: Erklärungen (im Show-Modus versteckt) -->
    <div data-content-type="explanation">
        <p>
            AXIOM Process ist die erste Stufe der Datenverarbeitung. 
            Es extrahiert und indexiert Daten aus verschiedenen Quellen...
        </p>
    </div>
    
    <!-- SHOW: Screenshots/Visuals -->
    <div data-content-type="visual">
        <img src="images/step1-screenshot.png" alt="AXIOM Process Startbildschirm">
    </div>
    
    <!-- TELL: Hintergrundinformationen -->
    <div data-content-type="background">
        <div class="info-box">
            <strong>Technischer Hintergrund:</strong>
            Die Extraktion erfolgt über proprietäre Parser...
        </div>
    </div>
</section>
```

#### 2. Medien-Layer-System erweitern

**Aktuelles System:**
- Standard: Bilder, Videos
- Nur Text: Keine Medien
- Vollständig: Alle Medien + Animationen

**Neu hinzufügen:**
- **Show-Only:** Nur Instructions + Visuals

#### 3. JavaScript-Erweiterung

**In `script-preferences.js` erweitern:**

```javascript
// Bestehender Code
const MEDIA_LAYERS = {
    STANDARD: 'standard',
    TEXT_ONLY: 'text-only',
    FULL: 'full',
    SHOW_ONLY: 'show-only'  // NEU
};

function applyMediaLayer(layer) {
    document.body.setAttribute('data-media-layer', layer);
    
    // Bestehende Logic für standard/text-only/full
    // ...
    
    // NEU: Show-Only Modus
    if (layer === MEDIA_LAYERS.SHOW_ONLY) {
        applyShowOnlyMode();
    } else {
        removeShowOnlyMode();
    }
}

function applyShowOnlyMode() {
    // Verstecke Erklärungen und Hintergrund-Infos
    const hideTypes = ['explanation', 'background'];
    
    hideTypes.forEach(type => {
        const elements = document.querySelectorAll(`[data-content-type="${type}"]`);
        elements.forEach(el => {
            el.classList.add('content-hidden');
        });
    });
    
    // Zeige nur Instructions und Visuals
    const showTypes = ['instruction', 'visual'];
    
    showTypes.forEach(type => {
        const elements = document.querySelectorAll(`[data-content-type="${type}"]`);
        elements.forEach(el => {
            el.classList.remove('content-hidden');
        });
    });
    
    LOG('PREFS', 'Show-Only mode applied');
}

function removeShowOnlyMode() {
    const allElements = document.querySelectorAll('[data-content-type]');
    allElements.forEach(el => {
        el.classList.remove('content-hidden');
    });
}
```

#### 4. CSS-Styling

```css
/* ===== CONTENT TYPE VISIBILITY ===== */

/* Show-Only Modus */
[data-media-layer="show-only"] [data-content-type="explanation"],
[data-media-layer="show-only"] [data-content-type="background"] {
    display: none;
}

/* Smooth Transition */
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
}

[data-media-layer="show-only"] [data-content-type="visual"] {
    margin: 20px 0;
    box-shadow: 0 4px 12px var(--color-shadow);
}
```

#### 5. UI-Integration

**Menu-Item erweitern:**

```html
<button class="menu-item" id="toggle-media-layer" role="menuitem">
    <span class="menu-icon">🖼️</span>
    Medien: <span id="media-layer-status">Standard</span>
</button>
```

**JavaScript für Cycling:**

```javascript
function cycleMediaLayer() {
    const order = ['standard', 'show-only', 'text-only', 'full'];
    const currentIndex = order.indexOf(currentMediaLayer);
    const nextIndex = (currentIndex + 1) % order.length;
    const nextLayer = order[nextIndex];
    
    setMediaLayer(nextLayer);
}

function getMediaLayerDisplayName(layer) {
    const names = {
        'standard': 'Standard',
        'show-only': 'Nur Anweisungen',
        'text-only': 'Nur Text',
        'full': 'Vollständig'
    };
    return names[layer] || layer;
}
```

### Vorteile

✅ **Zielgruppen-gerecht:** Verschiedene Lerntypen unterstützt  
✅ **Schnelligkeit:** Erfahrene User kommen direkt zum Punkt  
✅ **Übersichtlichkeit:** Weniger visueller Clutter  
✅ **Chef-Happy:** Erfüllt explizite Anforderung 😊

**Aufwand:** 3-4 Stunden

---

## 🤖 Verbesserungsvorschlag 8: Agent FAQ & Feedback-System

**Priorität:** 🟡 Mittel  
**Aufwand:** 6-8 Stunden  
**Status:** Im Scope, nicht dringend

### Feature-Beschreibung

Erweiterung des bestehenden Agenten um:
1. **FAQ-System:** Intelligente Suche in häufigen Fragen
2. **Feedback-Funktion:** Direkte Kontaktmöglichkeit per E-Mail

### Architektur

#### 1. FAQ-Datenstruktur

**Datei: `agent-faq.json`**

```json
{
  "version": "1.0",
  "updated": "2025-10-04",
  "faqs": [
    {
      "id": "export-dauer",
      "question": "Wie lange dauert ein Export?",
      "answer": "Die Dauer hängt von der Datenmenge ab. Ein Smartphone-Export dauert typischerweise 30-90 Minuten. Computer-Exports können mehrere Stunden in Anspruch nehmen.",
      "tags": ["export", "dauer", "zeit", "lange"],
      "category": "allgemein",
      "relatedSections": ["step1", "step2"],
      "priority": 1
    },
    {
      "id": "fehler-export",
      "question": "Was tun bei Export-Fehlern?",
      "answer": "Prüfen Sie zunächst die Verbindung zum Gerät. Stellen Sie sicher, dass genügend Speicherplatz vorhanden ist. Bei persistenten Fehlern konsultieren Sie das Error-Log in AXIOM Process unter 'View' → 'Processing Log'.",
      "tags": ["fehler", "error", "problem", "export", "funktioniert nicht"],
      "category": "troubleshooting",
      "relatedSections": ["troubleshooting"],
      "priority": 2
    },
    {
      "id": "hash-pruefen",
      "question": "Wie prüfe ich Hash-Werte?",
      "answer": "Hash-Werte werden automatisch berechnet und im Report angezeigt. Sie finden sie unter 'Evidence' → 'Properties'. Zur manuellen Verifikation nutzen Sie Tools wie 'certutil' (Windows) oder 'shasum' (Mac/Linux).",
      "tags": ["hash", "md5", "sha256", "verifikation", "integrität"],
      "category": "forensik",
      "relatedSections": ["verification"],
      "priority": 3
    }
  ],
  "categories": {
    "allgemein": "Allgemeine Fragen",
    "troubleshooting": "Problembehebung",
    "forensik": "Forensische Praxis",
    "technik": "Technische Details"
  }
}
```

#### 2. HTML-Erweiterung für Agenten

**In bestehender Agent-Sidebar ergänzen:**

```html
<!-- NEUER TAB: FAQ -->
<div class="agent-mode" data-mode="faq">
    <div class="agent-faq-search">
        <input type="text" 
               id="agent-faq-input"
               class="agent-faq-input"
               placeholder="Stellen Sie eine Frage..."
               aria-label="FAQ durchsuchen">
        <button id="agent-faq-submit" 
                class="agent-faq-submit"
                aria-label="Suchen">
            🔍
        </button>
    </div>
    
    <div class="agent-faq-results" id="agent-faq-results">
        <!-- Wird dynamisch gefüllt -->
    </div>
    
    <div class="agent-faq-empty">
        <p>💡 Stellen Sie eine Frage, um Antworten zu finden.</p>
        <p class="agent-faq-examples">
            Beispiele:<br>
            • "Wie lange dauert ein Export?"<br>
            • "Was tun bei Fehlern?"<br>
            • "Wie prüfe ich Hashes?"
        </p>
    </div>
</div>

<!-- NEUER TAB: Feedback -->
<div class="agent-mode" data-mode="feedback">
    <div class="agent-feedback-content">
        <h3>📧 Feedback & Ideen</h3>
        <p>Haben Sie Verbesserungsvorschläge oder Fragen?</p>
        
        <div class="agent-feedback-options">
            <button class="agent-feedback-btn" data-type="bug">
                🐛 Problem melden
            </button>
            <button class="agent-feedback-btn" data-type="feature">
                💡 Feature-Idee
            </button>
            <button class="agent-feedback-btn" data-type="question">
                ❓ Frage stellen
            </button>
            <button class="agent-feedback-btn" data-type="general">
                💬 Allgemeines Feedback
            </button>
        </div>
        
        <div class="agent-feedback-info">
            <p>Klicken Sie auf eine Option, um eine E-Mail zu erstellen.</p>
        </div>
    </div>
</div>
```

**Mode-Selector erweitern:**

```html
<div class="agent-mode-selector">
    <button class="agent-mode-btn active" data-mode="chat">💬 Chat</button>
    <button class="agent-mode-btn" data-mode="faq">❓ FAQ</button>
    <button class="agent-mode-btn" data-mode="feedback">📧 Feedback</button>
</div>
```

#### 3. JavaScript-Erweiterung

**FAQ-System in `agent.js` ergänzen:**

```javascript
// ===== FAQ SYSTEM =====

let faqData = null;

async function loadFAQ() {
    try {
        const response = await fetch('agent-faq.json');
        faqData = await response.json();
        LOG('AGENT', `Loaded ${faqData.faqs.length} FAQs`);
    } catch (error) {
        LOG.error('AGENT', 'Failed to load FAQ', error);
    }
}

function searchFAQ(query) {
    if (!faqData || !query) return [];
    
    query = query.toLowerCase().trim();
    
    const results = faqData.faqs.map(faq => {
        let score = 0;
        
        // Exact match in question
        if (faq.question.toLowerCase().includes(query)) {
            score += 10;
        }
        
        // Match in tags
        const tagMatches = faq.tags.filter(tag => 
            tag.toLowerCase().includes(query) || 
            query.includes(tag.toLowerCase())
        );
        score += tagMatches.length * 5;
        
        // Match in answer
        if (faq.answer.toLowerCase().includes(query)) {
            score += 3;
        }
        
        // Keyword matching
        const queryWords = query.split(' ');
        queryWords.forEach(word => {
            if (word.length < 3) return;
            if (faq.question.toLowerCase().includes(word)) score += 2;
            if (faq.tags.some(tag => tag.toLowerCase().includes(word))) score += 2;
        });
        
        return { ...faq, score };
    });
    
    // Filter and sort
    return results
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score || a.priority - b.priority)
        .slice(0, 5); // Top 5 Ergebnisse
}

function renderFAQResults(results) {
    const container = document.getElementById('agent-faq-results');
    const emptyState = document.querySelector('.agent-faq-empty');
    
    if (results.length === 0) {
        container.innerHTML = '<div class="agent-faq-no-results">Keine passenden Antworten gefunden. Versuchen Sie andere Begriffe oder nutzen Sie das Feedback-Formular.</div>';
        return;
    }
    
    emptyState.classList.add('hidden');
    container.classList.remove('hidden');
    
    container.innerHTML = results.map(faq => `
        <div class="agent-faq-result" data-faq-id="${faq.id}">
            <div class="agent-faq-question">
                <strong>❓ ${faq.question}</strong>
            </div>
            <div class="agent-faq-answer">
                ${faq.answer}
            </div>
            ${faq.relatedSections.length > 0 ? `
                <div class="agent-faq-related">
                    <span>📍 Verwandte Abschnitte:</span>
                    ${faq.relatedSections.map(sectionId => `
                        <button class="agent-faq-goto" data-section="${sectionId}">
                            ${getSectionTitle(sectionId)}
                        </button>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
    
    // Event listeners für "Gehe zu Abschnitt"
    container.querySelectorAll('.agent-faq-goto').forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.getAttribute('data-section');
            navigateToSection(sectionId);
        });
    });
}

// ===== FEEDBACK SYSTEM =====

function setupFeedbackButtons() {
    document.querySelectorAll('.agent-feedback-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            openFeedbackEmail(type);
        });
    });
}

function openFeedbackEmail(type) {
    const config = {
        bug: {
            subject: '[AXIOM Leitfaden] Problem melden',
            body: `Hallo,\n\nich möchte folgendes Problem melden:\n\n[Bitte beschreiben Sie das Problem]\n\nSchritte zur Reproduktion:\n1. \n2. \n3. \n\nErwartetes Verhalten:\n[Was sollte passieren?]\n\nTatsächliches Verhalten:\n[Was passiert stattdessen?]\n\n---\nBrowser: ${navigator.userAgent}\nSeite: ${window.location.href}`
        },
        feature: {
            subject: '[AXIOM Leitfaden] Feature-Vorschlag',
            body: `Hallo,\n\nich habe eine Idee für ein neues Feature:\n\n[Beschreiben Sie Ihre Idee]\n\nNutzen:\n[Welches Problem löst dieses Feature?]\n\nZielgruppe:\n[Wer würde davon profitieren?]\n\n---\nSeite: ${window.location.href}`
        },
        question: {
            subject: '[AXIOM Leitfaden] Frage',
            body: `Hallo,\n\nich habe folgende Frage:\n\n[Ihre Frage]\n\n---\nKontext:\n[Wo im Leitfaden sind Sie gerade?]\nSeite: ${window.location.href}`
        },
        general: {
            subject: '[AXIOM Leitfaden] Feedback',
            body: `Hallo,\n\n[Ihr Feedback]\n\n---\nSeite: ${window.location.href}`
        }
    };
    
    const mailConfig = config[type] || config.general;
    const mailto = `mailto:support@ihre-firma.de?subject=${encodeURIComponent(mailConfig.subject)}&body=${encodeURIComponent(mailConfig.body)}`;
    
    window.location.href = mailto;
}

// Init
loadFAQ();
setupFeedbackButtons();
```

#### 4. CSS-Styling

```css
/* ===== AGENT FAQ ===== */
.agent-faq-search {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
}

.agent-faq-input {
    flex: 1;
    padding: 12px;
    border: 2px solid var(--color-border);
    border-radius: 8px;
    font-size: 1em;
}

.agent-faq-submit {
    padding: 12px 20px;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2em;
}

.agent-faq-result {
    background-color: var(--color-surface);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
    border-left: 4px solid var(--color-info);
}

.agent-faq-question {
    margin-bottom: 10px;
    color: var(--color-primary);
}

.agent-faq-answer {
    line-height: 1.6;
    margin-bottom: 10px;
}

.agent-faq-related {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    font-size: 0.9em;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--color-border);
}

.agent-faq-goto {
    padding: 4px 12px;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85em;
}

/* ===== AGENT FEEDBACK ===== */
.agent-feedback-content {
    padding: 20px;
}

.agent-feedback-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 20px 0;
}

.---

## 🎯 Verbesserungsvorschlag 4: Strikte CSS/HTML/JavaScript-Trennung

**Priorität:** 🔴 Sehr hoch  
**Aufwand:** 4-6 Stunden  
**Status:** Zur sofortigen Umsetzung empfohlen

### Problembeschreibung

**Aktueller Zustand:**
Im aktuellen Code finden sich an mehreren Stellen Verstöße gegen das Prinzip der Trennung von Concerns:

1. **Inline-Styles in HTML:**
   ```html
   <!-- PROBLEM: Inline-Styles -->
   <button style="flex: 1; padding: 8px; font-size: 0.9em;">...</button>
   <hr style="margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;">
   ```

2. **CSS-Manipulation in JavaScript:**
   ```javascript
   // PROBLEM: Direkte Style-Manipulation
   element.style.display = 'none';
   element.style.opacity = '0.4';
   highlightElement.style.top = `${rect.top}px`;
   ```

**Probleme:**
- ❌ **Wartbarkeit:** CSS-Änderungen erfordern Änderungen in HTML/JS
- ❌ **Konsistenz:** Gleiche Styles mehrfach definiert
- ❌ **Theme-Support:** Inline-Styles ignorieren CSS-Variablen
- ❌ **Wiederverwendbarkeit:** Code-Duplikation
- ❌ **Testing:** Schwierig zu testen ohne DOM

### Lösungsansatz

**Prinzipien:**
1. **HTML:** Nur semantische Struktur und CSS-Klassen
2. **CSS:** Alle visuellen Aspekte, Layouts und Animationen
3. **JavaScript:** Nur Klassen hinzufügen/entfernen, keine Styles setzen

#### 1. Inline-Styles zu CSS-Klassen migrieren

**VORHER (index.html):**
```html
<button id="time-format-toggle"
        class="btn-secondary"
        style="flex: 1; padding: 8px; font-size: 0.9em; color: var(--color-text-secondary);">
    🕐 Zeit: Relativ
</button>

<hr style="margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;">
```

**NACHHER (index.html):**
```html
<button id="time-format-toggle"
        class="btn-secondary btn-flex">
    🕐 Zeit: Relativ
</button>

<hr class="menu-separator">
```

**NACHHER (styles.css):**
```css
/* Wiederverwendbare Utility-Klasse */
.btn-flex {
    flex: 1;
}

/* Semantische Komponenten-Klasse */
.menu-separator {
    margin: 5px 0;
    border: none;
    border-top: 1px solid var(--color-border);
    transition: border-color var(--transition-medium);
}
```

#### 2. JavaScript Style-Manipulation zu CSS-Klassen

**VORHER (JavaScript):**
```javascript
function showElement(element) {
    element.style.display = 'block';
    element.style.opacity = '1';
}

function hideElement(element) {
    element.style.display = 'none';
    element.style.opacity = '0';
}

function positionTooltip(element, x, y) {
    element.style.top = `${y}px`;
    element.style.left = `${x}px`;
}
```

**NACHHER (JavaScript):**
```javascript
function showElement(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}

function hideElement(element) {
    element.classList.add('hidden');
    element.classList.remove('visible');
}

function positionTooltip(element, x, y) {
    // CSS Custom Properties für dynamische Werte
    element.style.setProperty('--tooltip-x', `${x}px`);
    element.style.setProperty('--tooltip-y', `${y}px`);
}
```

**NACHHER (styles.css):**
```css
.element {
    display: none;
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.element.visible {
    display: block;
    opacity: 1;
}

.tooltip {
    position: fixed;
    top: var(--tooltip-y, 0);
    left: var(--tooltip-x, 0);
}
```

#### 3. State-basierte CSS-Klassen

**Konzept: Data-Attributes für States**

```html
<!-- State über data-attribute steuern -->
<div class="sidebar-container" data-state="closed" data-active-sidebar="none">
    <!-- Content -->
</div>
```

```css
/* CSS reagiert auf State */
.sidebar-container[data-state="closed"] {
    transform: translateX(-100%);
}

.sidebar-container[data-state="open"] {
    transform: translateX(0);
}

.sidebar-container[data-active-sidebar="navigation"] .sidebar-navigation {
    display: flex;
}

.sidebar-container[data-active-sidebar="history"] .sidebar-history {
    display: flex;
}
```

```javascript
// JavaScript ändert nur Attribute
function openSidebar(sidebarId) {
    const container = document.querySelector('.sidebar-container');
    container.setAttribute('data-state', 'open');
    container.setAttribute('data-active-sidebar', sidebarId);
}
```

### Implementierungs-Strategie

**Phase 1: Audit (1 Stunde)**

Erstellen Sie eine Liste aller Verstöße:

```bash
# Inline-Styles in HTML finden
grep -n 'style="' index.html

# Style-Manipulation in JS finden
grep -rn '\.style\.' script-*.js
```

**Phase 2: CSS-Klassen definieren (1-2 Stunden)**

Neue Utility- und State-Klassen in `styles.css`:

```css
/* ===== UTILITY CLASSES ===== */
.hidden {
    display: none !important;
}

.visible {
    display: block;
}

.flex-1 {
    flex: 1;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.text-center {
    text-align: center;
}

/* ===== STATE CLASSES ===== */
.is-active {
    /* Wird von JS gesetzt für aktive Elemente */
}

.is-disabled {
    opacity: 0.5;
    pointer-events: none;
}

.is-loading {
    cursor: wait;
}

.is-error {
    border-color: var(--color-error);
    background-color: var(--color-surface);
}

/* ===== ANIMATION STATES ===== */
.fade-in {
    animation: fadeIn var(--transition-medium) forwards;
}

.fade-out {
    animation: fadeOut var(--transition-medium) forwards;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.slide-in-left {
    animation: slideInLeft var(--transition-medium) forwards;
}

@keyframes slideInLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}
```

**Phase 3: Migration (2-3 Stunden)**

1. **HTML bereinigen:**
   - Alle `style="..."` Attribute entfernen
   - Durch CSS-Klassen ersetzen

2. **JavaScript refactoren:**
   - `element.style.xxx` durch `element.classList` ersetzen
   - Nur für dynamische Positions-Werte CSS Custom Properties nutzen

3. **Testen:**
   - Visuelle Regression-Tests
   - Funktionalität prüfen

### Beispiel-Migration: Sidebar-Manager

**VORHER:**
```javascript
function openSidebar(sidebarId) {
    const container = document.getElementById('sidebar-container');
    const sidebar = document.getElementById(`sidebar-${sidebarId}`);
    
    container.style.transform = 'translateX(0)';
    container.style.display = 'flex';
    
    sidebar.style.display = 'flex';
    sidebar.style.opacity = '1';
}

function closeSidebar() {
    const container = document.getElementById('sidebar-container');
    container.style.transform = 'translateX(-100%)';
    
    setTimeout(() => {
        container.style.display = 'none';
    }, 300);
}
```

**NACHHER:**
```javascript
function openSidebar(sidebarId) {
    const container = document.getElementById('sidebar-container');
    const sidebar = document.getElementById(`sidebar-${sidebarId}`);
    
    // Nur Klassen manipulieren
    container.classList.add('open');
    container.classList.remove('closed');
    
    sidebar.classList.add('active');
    sidebar.classList.remove('inactive');
    
    // Oder: Data-Attribute für komplexere States
    container.setAttribute('data-state', 'open');
    container.setAttribute('data-active', sidebarId);
}

function closeSidebar() {
    const container = document.getElementById('sidebar-container');
    
    container.classList.remove('open');
    container.classList.add('closed');
    container.setAttribute('data-state', 'closed');
    
    // CSS transition handled timing automatisch
}
```

**CSS (styles.css):**
```css
.sidebar-container {
    transform: translateX(-100%);
    display: none;
    transition: transform var(--transition-medium);
}

.sidebar-container.open {
    display: flex;
    transform: translateX(0);
}

.sidebar-container.closed {
    transform: translateX(-100%);
}

/* Sidebar wird nach Transition ausgeblendet */
.sidebar-container.closed {
    transition: transform var(--transition-medium),
                display 0s var(--transition-medium);
}
```

### Code-Konventionen

**Erlaubte Ausnahmen für `element.style`:**

Nur in diesen Fällen darf JavaScript Styles direkt setzen:

1. **Dynamische Positionierung (nicht im Voraus bekannt):**
   ```javascript
   // OK: Position basiert auf Maus/Scroll-Position
   tooltip.style.setProperty('--dynamic-x', `${mouseX}px`);
   tooltip.style.setProperty('--dynamic-y', `${mouseY}px`);
   ```

2. **Gemessene Dimensionen:**
   ```javascript
   // OK: Höhe basiert auf Content
   const height = calculateDynamicHeight();
   element.style.setProperty('--calculated-height', `${height}px`);
   ```

3. **Performance-kritische Animationen:**
   ```javascript
   // OK: 60fps-Animation via requestAnimationFrame
   function animate() {
       const progress = calculateProgress();
       element.style.transform = `translateX(${progress}px)`;
       requestAnimationFrame(animate);
   }
   ```

**Verboten:**

```javascript
// ❌ NICHT erlaubt
element.style.display = 'none';
element.style.color = 'red';
element.style.fontSize = '16px';
element.style.padding = '10px';

// ✅ Stattdessen
element.classList.add('hidden');
element.classList.add('text-error');
element.classList.add('text-large');
element.classList.add('padding-medium');
```

### Vorteile nach Umsetzung

✅ **Wartbarkeit:** Alle Styles zentral in CSS  
✅ **Konsistenz:** Keine Style-Duplikation  
✅ **Theme-Support:** CSS-Variablen funktionieren überall  
✅ **Performance:** Browser kann CSS-Klassen besser optimieren  
✅ **Testing:** JS-Tests ohne DOM-Rendering möglich  
✅ **Wiederverwendbarkeit:** Utility-Klassen mehrfach nutzbar

---

## 📑 Verbesserungsvorschlag 5: Favorites/Lesezeichen-Sidebar

**Priorität:** 🟠 Hoch  
**Aufwand:** 6-8 Stunden  
**Status:** Zeitnah umsetzen

### Feature-Beschreibung

Eine neue Sidebar für Favoriten/Lesezeichen, die:
- Unterhalb des Verlaufs positioniert ist
- Per Stern-Button in der Navigation gesetzt werden
- Im localStorage persistiert werden
- Nach Alter/letzter Nutzung sortiert sind
- Eine Suchfunktion mit Levenshtein-Distanz bietet

### Architektur

#### 1. Datenstruktur

```javascript
// Favoriten-Datenmodell
const FavoriteItem = {
    id: 'section-step2',           // Section-ID
    title: 'Schritt 2: Datenauswahl', // Section-Titel
    addedAt: 1696424123456,        // Timestamp: Hinzugefügt
    lastUsed: 1696424567890,       // Timestamp: Zuletzt benutzt
    useCount: 5,                    // Wie oft benutzt
    notes: ''                       // Optionale Notiz (zukünftig)
};

// Im localStorage:
{
    'axiom-favorites': [
        { id: 'intro', title: 'Überblick', addedAt: ..., lastUsed: ..., useCount: 3 },
        { id: 'step1', title: 'Export starten', addedAt: ..., lastUsed: ..., useCount: 7 },
        // ...
    ]
}
```

#### 2. HTML-Struktur

**In index.html nach History-Sidebar einfügen:**

```html
<!-- FAVORITES SIDEBAR -->
<div id="sidebar-favorites" class="sidebar-wrapper sidebar-favorites">
    <div class="sidebar-tab">
        <div class="sidebar-tab-header">
            <button class="sidebar-tab-button" 
                    data-sidebar="favorites"
                    aria-expanded="false"
                    aria-controls="favorites-content">
                <span class="sidebar-tab-icon">⭐</span>
                <span class="sidebar-tab-text">Favoriten</span>
            </button>
            
            <button class="sidebar-close-btn"
                    aria-label="Favoriten schließen"
                    data-sidebar="favorites">
                ✕
            </button>
        </div>
        
        <div class="sidebar-tab-body" id="favorites-content">
            <!-- Subheader: Suchfeld -->
            <div class="sidebar-subheader">
                <div class="favorites-search">
                    <input type="text" 
                           id="favorites-search-input"
                           class="favorites-search-input"
                           placeholder="Favoriten durchsuchen..."
                           aria-label="Favoriten durchsuchen">
                    <button id="favorites-search-clear" 
                            class="favorites-search-clear hidden"
                            aria-label="Suche löschen">
                        ✕
                    </button>
                </div>
            </div>
            
            <!-- Body: Favoriten-Liste -->
            <div class="sidebar-body">
                <div id="favorites-list" class="favorites-list">
                    <!-- Wird von JavaScript gefüllt -->
                </div>
                <div id="favorites-empty" class="favorites-empty">
                    <p>Noch keine Favoriten</p>
                    <p class="favorites-empty-hint">
                        Klicken Sie auf ⭐ neben einem Abschnitt, um ihn zu favorisieren.
                    </p>
                </div>
            </div>
            
            <!-- Footer: Sortierung & Löschen -->
            <div class="sidebar-footer">
                <div class="favorites-controls">
                    <select id="favorites-sort" 
                            class="favorites-sort-select"
                            aria-label="Sortierung wählen">
                        <option value="last-used">Zuletzt verwendet</option>
                        <option value="most-used">Häufig verwendet</option>
                        <option value="alphabetical">Alphabetisch</option>
                        <option value="date-added">Hinzugefügt</option>
                    </select>
                    
                    <button id="clear-favorites-btn"
                            class="btn-secondary btn-secondary-destructive"
                            aria-label="Alle Favoriten löschen">
                        🗑️ Alle löschen
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
```

**Stern-Button in Navigation hinzufügen:**

```html
<!-- In jeder Section, neben der Überschrift -->
<section class="content-section" data-section="intro" data-title="Überblick">
    <div class="section-header">
        <h2 id="intro">Überblick</h2>
        <button class="favorite-toggle" 
                data-section="intro"
                aria-label="Als Favorit markieren"
                aria-pressed="false">
            <span class="favorite-icon">☆</span>
        </button>
    </div>
    <!-- Rest der Section -->
</section>
```

#### 3. CSS-Styling

```css
/* ===== FAVORITES SIDEBAR ===== */

/* Section Header mit Favoriten-Button */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.favorite-toggle {
    background: none;
    border: 2px solid var(--color-border);
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.2em;
    transition: all var(--transition-fast);
    color: var(--color-text-secondary);
}

.favorite-toggle:hover {
    border-color: var(--color-warning);
    color: var(--color-warning);
    transform: scale(1.1);
}

.favorite-toggle[aria-pressed="true"] {
    background-color: var(--color-warning);
    border-color: var(--color-warning);
    color: var(--color-warning-text);
}

.favorite-toggle[aria-pressed="true"] .favorite-icon::before {
    content: '⭐';
}

.favorite-toggle[aria-pressed="false"] .favorite-icon::before {
    content: '☆';
}

/* Suchfeld */
.favorites-search {
    position: relative;
    width: 100%;
}

.favorites-search-input {
    width: 100%;
    padding: 10px 35px 10px 12px;
    border: 2px solid var(--color-border);
    border-radius: 6px;
    font-size: 0.95em;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    transition: all var(--transition-fast);
}

.favorites-search-input:focus {
    outline: none;
    border-color: var(--color-border-strong);
    box-shadow: 0 0 0 3px var(--color-focus);
}

.favorites-search-clear {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 1.2em;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all var(--transition-fast);
}

.favorites-search-clear:hover {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
}

/* Favoriten-Liste */
.favorites-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.favorite-item {
    padding: 12px;
    background-color: var(--color-surface);
    border-left: 4px solid var(--color-warning);
    border-radius: 6px;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.favorite-item:hover {
    background-color: var(--color-surface-elevated);
    border-left-width: 6px;
    transform: translateX(2px);
}

.favorite-item-content {
    flex: 1;
}

.favorite-item-title {
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 4px;
}

.favorite-item-meta {
    font-size: 0.85em;
    color: var(--color-text-secondary);
    display: flex;
    gap: 12px;
}

.favorite-item-meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
}

.favorite-item-actions {
    display: flex;
    gap: 4px;
}

.favorite-item-remove {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 1.1em;
    transition: all var(--transition-fast);
}

.favorite-item-remove:hover {
    background-color: var(--color-error);
    color: var(--color-surface-elevated);
}

/* Empty State */
.favorites-empty {
    text-align: center;
    padding: 40px 20px;
    color: var(--color-text-disabled);
}

.favorites-empty p {
    margin-bottom: 10px;
}

.favorites-empty-hint {
    font-size: 0.9em;
    font-style: italic;
}

/* Sortierung & Controls */
.favorites-controls {
    display: flex;
    gap: 10px;
    align-items: center;
}

.favorites-sort-select {
    flex: 1;
    padding: 8px 12px;
    border: 2px solid var(--color-border);
    border-radius: 6px;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    font-size: 0.9em;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.favorites-sort-select:focus {
    outline: none;
    border-color: var(--color-border-strong);
}

/* Suchergebnis-Highlighting */
.favorite-item.search-match {
    animation: searchHighlight 0.5s ease;
}

@keyframes searchHighlight {
    0%, 100% { background-color: var(--color-surface); }
    50% { background-color: var(--color-warning); }
}

/* Levenshtein-Distanz Visualisierung */
.favorite-item[data-search-distance="0"] {
    /* Exakte Übereinstimmung */
    border-left-color: var(--color-success);
}

.favorite-item[data-search-distance="1"],
.favorite-item[data-search-distance="2"] {
    /* Nahe Übereinstimmung */
    border-left-color: var(--color-warning);
}

.favorite-item[data-search-distance="3"],
.favorite-item[data-search-distance="4"] {
    /* Entfernte Übereinstimmung */
    border-left-color: var(--color-info);
    opacity: 0.8;
}
```

#### 4. JavaScript-Modul

**Neues Modul: `script-favorites.js`**

```javascript
// ============================================================================
// SCRIPT-FAVORITES.JS
// Favoriten/Lesezeichen-Management mit Levenshtein-Suche
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'FAVORITES';
    
    // ===== STATE =====
    let favorites = [];
    let currentSort = 'last-used';
    let searchQuery = '';
    
    // ===== DOM ELEMENTS =====
    let favoritesList = null;
    let favoritesEmpty = null;
    let searchInput = null;
    let searchClearBtn = null;
    let sortSelect = null;
    let clearAllBtn = null;
    
    // ===== LEVENSHTEIN DISTANCE =====
    
    /**
     * Berechnet die Levenshtein-Distanz zwischen zwei Strings
     * @param {string} a - Erster String
     * @param {string} b - Zweiter String
     * @returns {number} - Distanz (0 = identisch)
     */
    function levenshteinDistance(a, b) {
        const an = a.length;
        const bn = b.length;
        
        if (an === 0) return bn;
        if (bn === 0) return an;
        
        const matrix = [];
        
        // Initialisiere erste Spalte
        for (let i = 0; i <= bn; i++) {
            matrix[i] = [i];
        }
        
        // Initialisiere erste Zeile
        for (let j = 0; j <= an; j++) {
            matrix[0][j] = j;
        }
        
        // Fülle Matrix
        for (let i = 1; i <= bn; i++) {
            for (let j = 1; j <= an; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // Substitution
                        matrix[i][j - 1] + 1,      // Insertion
                        matrix[i - 1][j] + 1       // Deletion
                    );
                }
            }
        }
        
        return matrix[bn][an];
    }
    
    // ===== FAVORITES MANAGEMENT =====
    
    function loadFavorites() {
        try {
            const saved = localStorage.getItem('axiom-favorites');
            favorites = saved ? JSON.parse(saved) : [];
            LOG(MODULE, `Loaded ${favorites.length} favorites`);
            return favorites;
        } catch (error) {
            LOG.error(MODULE, 'Failed to load favorites', error);
            return [];
        }
    }
    
    function saveFavorites() {
        try {
            localStorage.setItem('axiom-favorites', JSON.stringify(favorites));
            LOG(MODULE, 'Favorites saved');
        } catch (error) {
            LOG.error(MODULE, 'Failed to save favorites', error);
        }
    }
    
    function addFavorite(sectionId, sectionTitle) {
        // Prüfe ob bereits vorhanden
        const existing = favorites.find(f => f.id === sectionId);
        if (existing) {
            LOG.warn(MODULE, `Favorite already exists: ${sectionId}`);
            return false;
        }
        
        const favorite = {
            id: sectionId,
            title: sectionTitle,
            addedAt: Date.now(),
            lastUsed: Date.now(),
            useCount: 0
        };
        
        favorites.push(favorite);
        saveFavorites();
        renderFavorites();
        updateFavoriteButtons();
        
        LOG.success(MODULE, `Added favorite: ${sectionTitle}`);
        return true;
    }
    
    function removeFavorite(sectionId) {
        const index = favorites.findIndex(f => f.id === sectionId);
        if (index === -1) return false;
        
        favorites.splice(index, 1);
        saveFavorites();
        renderFavorites();
        updateFavoriteButtons();
        
        LOG(MODULE, `Removed favorite: ${sectionId}`);
        return true;
    }
    
    function toggleFavorite(sectionId, sectionTitle) {
        const existing = favorites.find(f => f.id === sectionId);
        
        if (existing) {
            removeFavorite(sectionId);
            return false; // Removed
        } else {
            addFavorite(sectionId, sectionTitle);
            return true; // Added
        }
    }
    
    function updateFavoriteUsage(sectionId) {
        const favorite = favorites.find(f => f.id === sectionId);
        if (!favorite) return;
        
        favorite.lastUsed = Date.now();
        favorite.useCount++;
        saveFavorites();
        
        LOG(MODULE, `Updated usage for: ${sectionId}`);
    }
    
    function clearAllFavorites() {
        if (!confirm('Möchten Sie wirklich alle Favoriten löschen?')) {
            return;
        }
        
        favorites = [];
        saveFavorites();
        renderFavorites();
        updateFavoriteButtons();
        
        LOG(MODULE, 'All favorites cleared');
    }
    
    // ===== SORTING =====
    
    function sortFavorites(sortBy) {
        currentSort = sortBy;
        
        switch(sortBy) {
            case 'last-used':
                favorites.sort((a, b) => b.lastUsed - a.lastUsed);
                break;
            case 'most-used':
                favorites.sort((a, b) => b.useCount - a.useCount);
                break;
            case 'alphabetical':
                favorites.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'date-added':
                favorites.sort((a, b) => b.addedAt - a.addedAt);
                break;
        }
        
        renderFavorites();
        LOG(MODULE, `Sorted by: ${sortBy}`);
    }
    
    // ===== SEARCH WITH LEVENSHTEIN =====
    
    function searchFavorites(query) {
        searchQuery = query.toLowerCase().trim();
        
        if (!searchQuery) {
            renderFavorites();
            return;
        }
        
        // Berechne Levenshtein-Distanz für jeden Favoriten
        const results = favorites.map(favorite => {
            const titleLower = favorite.title.toLowerCase();
            const distance = levenshteinDistance(searchQuery, titleLower);
            
            // Normalisiere Distanz (0-1, wobei 0 = exakte Übereinstimmung)
            const maxDistance = Math.max(searchQuery.length, titleLower.length);
            const normalizedDistance = distance / maxDistance;
            
            return {
                ...favorite,
                searchDistance: distance,
                searchScore: 1 - normalizedDistance // Höherer Score = besseres Match
            };
        });
        
        // Sortiere nach Relevanz (beste Matches zuerst)
        results.sort((a, b) => {
            // Exakte Substring-Matches bevorzugen
            const aContains = a.title.toLowerCase().includes(searchQuery);
            const bContains = b.title.toLowerCase().includes(searchQuery);
            
            if (aContains && !bContains) return -1;
            if (!aContains && bContains) return 1;
            
            // Dann nach Levenshtein-Score
            return b.searchScore - a.searchScore;
        });
        
        // Nur relevante Ergebnisse anzeigen (Score > 0.3)
        const filteredResults = results.filter(r => r.searchScore > 0.3);
        
        renderFavorites(filteredResults);
        
        LOG(MODULE, `Search results: ${filteredResults.length}/${favorites.length} for "${query}"`);
    }
    
    // ===== RENDERING =====
    
    function renderFavorites(customList = null) {
        const listToRender = customList || favorites;
        
        favoritesList.innerHTML = '';
        
        if (listToRender.length === 0) {
            favoritesEmpty.classList.remove('hidden');
            favoritesList.classList.add('hidden');
            return;
        }
        
        favoritesEmpty.classList.add('hidden');
        favoritesList.classList.remove('hidden');
        
        listToRender.forEach(favorite => {
            const item = createFavoriteItem(favorite);
            favoritesList.appendChild(item);
        });
    }
    
    function createFavoriteItem(favorite) {
        const item = document.createElement('div');
        item.className = 'favorite-item';
        item.setAttribute('data-section-id', favorite.id);
        
        // Levenshtein-Distanz als Data-Attribut für Styling
        if (favorite.searchDistance !== undefined) {
            item.setAttribute('data-search-distance', favorite.searchDistance);
            item.classList.add('search-match');
        }
        
        // Content
        const content = document.createElement('div');
        content.className = 'favorite-item-content';
        
        const title = document.createElement('div');
        title.className = 'favorite-item-title';
        title.textContent = favorite.title;
        
        const meta = document.createElement('div');
        meta.className = 'favorite-item-meta';
        
        // Last Used
        const lastUsedMeta = document.createElement('span');
        lastUsedMeta.className = 'favorite-item-meta-item';
        lastUsedMeta.innerHTML = `<span>🕐</span> ${formatRelativeTime(favorite.lastUsed)}`;
        
        // Use Count
        const useCountMeta = document.createElement('span');
        useCountMeta.className = 'favorite-item-meta-item';
        useCountMeta.innerHTML = `<span>📊</span> ${favorite.useCount}×`;
        
        meta.appendChild(lastUsedMeta);
        meta.appendChild(useCountMeta);
        
        content.appendChild(title);
        content.appendChild(meta);
        
        // Actions
        const actions = document.createElement('div');
        actions.className = 'favorite-item-actions';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'favorite-item-remove';
        removeBtn.setAttribute('aria-label', 'Favorit entfernen');
        removeBtn.textContent = '🗑️';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFavorite(favorite.id);
        });
        
        actions.appendChild(removeBtn);
        
        // Zusammenbauen
        item.appendChild(content);
        item.appendChild(actions);
        
        // Click-Handler für Navigation
        item.addEventListener('click', () => {
            navigateToSection(favorite.id);
            updateFavoriteUsage(favorite.id);
        });
        
        return item;
    }
    
    function formatRelativeTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `vor ${days} Tag${days !== 1 ? 'en' : ''}`;
        if (hours > 0) return `vor ${hours} Stunde${hours !== 1 ? 'n' : ''}`;
        if (minutes > 0) return `vor ${minutes} Minute${minutes !== 1 ? 'n' : ''}`;
        return 'gerade eben';
    }
    
    function navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) {
            LOG.error(MODULE, `Section not found: ${sectionId}`);
            return;
        }
        
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Highlight-Animation
        section.classList.add('scroll-highlight');
        setTimeout(() => {
            section.classList.remove('scroll-highlight');
        }, 2000);
        
        // Sidebar schließen (mobile)
        if (window.innerWidth <= 768) {
            const sidebarContainer = document.querySelector('.sidebar-container');
            sidebarContainer?.classList.remove('open');
        }
    }
    
    // ===== UPDATE FAVORITE BUTTONS =====
    
    function updateFavoriteButtons() {
        const buttons = document.querySelectorAll('.favorite-toggle');
        
        buttons.forEach(button => {
            const sectionId = button.getAttribute('data-section');
            const isFavorite = favorites.some(f => f.id === sectionId);
            
            button.setAttribute('aria-pressed', isFavorite ? 'true' : 'false');
        });
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Favorite Toggle Buttons in Sections
        document.addEventListener('click', (e) => {
            const toggleBtn = e.target.closest('.favorite-toggle');
            if (!toggleBtn) return;
            
            const sectionId = toggleBtn.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            const sectionTitle = section?.querySelector('h2, h3')?.textContent || sectionId;
            
            const isAdded = toggleFavorite(sectionId, sectionTitle);
            
            // Visuelles Feedback
            toggleBtn.classList.add(isAdded ? 'pulse-animation' : 'shake-animation');
            setTimeout(() => {
                toggleBtn.classList.remove('pulse-animation', 'shake-animation');
            }, 300);
        });
        
        // Search Input
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            searchFavorites(query);
            
            // Show/Hide clear button
            if (query) {
                searchClearBtn.classList.remove('hidden');
            } else {
                searchClearBtn.classList.add('hidden');
            }
        });
        
        // Search Clear Button
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchClearBtn.classList.add('hidden');
            searchFavorites('');
        });
        
        // Sort Select
        sortSelect.addEventListener('change', (e) => {
            sortFavorites(e.target.value);
        });
        
        // Clear All Button
        clearAllBtn.addEventListener('click', () => {
            clearAllFavorites();
        });
    }
    
    // ===== INITIALIZATION =====
    
    function initFavorites() {
        LOG(MODULE, 'Initializing favorites system...');
        
        // Get DOM elements
        favoritesList = document.getElementById('favorites-list');
        favoritesEmpty = document.getElementById('favorites-empty');
        searchInput = document.getElementById('favorites-search-input');
        searchClearBtn = document.getElementById('favorites-search-clear');
        sortSelect = document.getElementById('favorites-sort');
        clearAllBtn = document.getElementById('clear-favorites-btn');
        
        if (!favoritesList || !searchInput) {
            LOG.error(MODULE, 'Required DOM elements not found');
            return;
        }
        
        // Load favorites
        loadFavorites();
        
        // Initial render
        sortFavorites(currentSort);
        
        // Update toggle buttons
        updateFavoriteButtons();
        
        // Setup events
        setupEventHandlers();
        
        LOG.success(MODULE, 'Favorites system initialized');
    }
    
    // ===== PUBLIC API =====
    
    window.FavoritesManager = {
        add: addFavorite,
        remove: removeFavorite,
        toggle: toggleFavorite,
        getAll: () => [...favorites],
        search: searchFavorites
    };
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFavorites);
    } else {
        initFavorites();
    }
    
    LOG(MODULE, 'Favorites module loaded');
    
})();
```

**CSS-Animationen für visuelles Feedback:**

```css
/* Animationen für Favorite-Toggle */
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

.pulse-animation {
    animation: pulse 0.3s ease;
}

.shake-animation {
    animation: shake 0.3s ease;
}
```

### Integration & Testing

**Schritte:**
1. HTML-Struktur in `index.html` einfügen
2. CSS in `styles.css` einfügen
3. `script-favorites.js` erstellen und in `index.html` einbinden
4. Stern-Buttons zu allen Sections hinzufügen
5. Testen: Hinzufügen, Entfernen, Suchen, Sortieren

**Aufwand:** 6-8 Stunden

### Vorteile

✅ **Schneller Zugriff** auf wichtige Abschnitte  
✅ **Intelligente Suche** mit Fuzzy-Matching  
✅ **Flexible Sortierung** nach verschiedenen Kriterien  
✅ **Persistenz** über Browser-Sessions hinweg  
✅ **Usage-Tracking** für bessere Sortierung

---

## 📖 Verbesserungsvorschlag 6: Glossar-Feature mit Hover-Tooltips

**Priorität:** 🟡 Mittel (Nice-to-have)  
**Aufwand:** 10-14 Stunden  
**Status:** Geplant

### Feature-Beschreibung

Ein intelligentes Glossar-System, das:
- Fachbegriffe automatisch im Text erkennt
- Hover-Tooltips mit Erklärungen anzeigt
- Bilder und weiterführende Links bereitstellt
- Barrierefrei über Tastatur bedienbar ist

### Architektur

#### 1. Glossar-Datenstruktur (JSON)

**Datei: `glossar.json`**

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

#### 2. HTML-Struktur

**Glossar-Tooltip-Template:**

```html
<!-- Wird von JavaScript dynamisch erstellt -->
<div id="glossar-tooltip" class="glossar-tooltip" role="tooltip" aria-hidden="true">
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
</div>
```

#### 3. CSS-Styling

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

#### 4. JavaScript-Modul

**Neues Modul: `script-glossar.js`**

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
            term.patterns.forEach(pattern => {
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
            });
        });
        
        // Sortiere und filtere Überlappungen
        matches = removeOverlappingMatches(matches);
        
        if (matches.length === 0) return;
        
        // Ersetze Text durch Spans
        replaceWithSpans(textNode, matches);
    }
    
    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\        LOG.success(MODULE, `Adde');
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
            const afterText = text.substring# Verbesserungsvorschläge für AXIOM Leitfaden

**Dokumentversion:** 1.0  
**Datum:** 04. Oktober 2025  
**Status:** Geplant / Zur Umsetzung vorgemerkt

---

## Übersicht

Dieses Dokument enthält detaillierte Verbesserungsvorschläge für den AXIOM Leitfaden, die nach Analyse der aktuellen Implementierung (Build 053) erarbeitet wurden.

**Prioritäten-Übersicht:**

### 🔴 Sehr hohe Priorität (Sofort umsetzen)
- ✅ **V1:** Einheitliche Zustandsverwaltung
- ✅ **V4:** Strikte Trennung: CSS / HTML / JavaScript
- ✅ **V9:** Animations- und Transitions-Harmonisierung

### 🟠 Hohe Priorität (Zeitnah umsetzen)
- ✅ **V3:** Tooltips & Onboarding-System
- ✅ **V5:** Favorites/Lesezeichen-Sidebar
- ✅ **V7:** "Don't tell; just show"-Modus

### 🟡 Mittlere Priorität (Geplant)
- ✅ **V6:** Glossar-Feature mit Hover-Tooltips
- ✅ **V8:** Agent FAQ-System & Feedback-Funktion

### ⏸️ Zurückgestellt
- ⏸️ **V2:** Progressive Enhancement (nicht benötigt für Corporate Environment)

---

## 🎯 Verbesserungsvorschlag 1: Einheitliche Zustandsverwaltung

### Problembeschreibung

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

### Lösungsansatz

**Zentrale Zustandsverwaltung mit Observer-Pattern:**

#### 1. Neues Modul: `script-state-manager.js`

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
            sidebarActive: null,  // 'navigation', 'history', null
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

#### 2. Migration bestehender Module

**Beispiel: `script-sidebar-manager.js` Migration**

```javascript
// VORHER (alt):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    localStorage.setItem('axiom-sidebar-active', sidebarId);
}

// NACHHER (neu):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    AppState.update('ui.sidebarActive', sidebarId);
    AppState.update('ui.sidebarOpen', true);
}

// Subscribe to changes from other modules
AppState.subscribe('ui.sidebarActive', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        // Update DOM accordingly
        updateSidebarDOM(newValue);
    }
});
```

**Beispiel: `script-theme.js` Migration**

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

### Implementierungsschritte

1. **Phase 1: Grundgerüst** (1-2 Stunden)
   - Erstellen von `script-state-manager.js`
   - Integration in `index.html` (vor allen anderen Modulen!)
   - Tests der Basis-Funktionalität

2. **Phase 2: Migration Kern-Module** (2-3 Stunden)
   - `script-theme.js` migrieren
   - `script-sidebar-manager.js` migrieren
   - `script-tips.js` migrieren

3. **Phase 3: Migration restliche Module** (2-3 Stunden)
   - `script-notes.js` migrieren
   - `script-preferences.js` migrieren
   - `script-history.js` (Zeitformat) migrieren

4. **Phase 4: Testing & Cleanup** (1-2 Stunden)
   - Cross-Module-Tests
   - Alte localStorage-Aufrufe entfernen
   - Dokumentation aktualisieren

**Gesamt-Aufwand:** ca. 6-10 Stunden

### Vorteile nach Umsetzung

✅ **Zentrale Kontrolle:** Ein Ort für alle UI-Zustände  
✅ **Konsistenz:** Keine Race Conditions mehr  
✅ **Debugging:** Alle State-Changes geloggt an einem Ort  
✅ **Erweiterbarkeit:** Neue Features einfach in State integrieren  
✅ **Performance:** Reduzierte localStorage-Zugriffe durch Debouncing  
✅ **Testbarkeit:** State-Logic isoliert testbar

---

## 🎓 Verbesserungsvorschlag 3: Kontextbezogene Tooltips & Onboarding

### Problembeschreibung

**Aktueller Zustand:**
- Viele Features ohne direkte Erklärung
- Tipps-Footer ist generisch, nicht kontextbezogen
- Neue Nutzer müssen Features selbst entdecken
- Keine geführte Einführung in die Funktionalität

**User Experience Probleme:**
- Hohe Lernkurve für Erstnutzer
- Features werden möglicherweise nicht entdeckt
- Keine Hilfe bei komplexeren Funktionen (Detail-Level, Sidebar-System)

### Lösungsansatz

**Zweistufiges System:**
1. **Permanente Tooltips** - Hover-Hilfe für alle UI-Elemente
2. **Einmaliger Onboarding-Guide** - Schritt-für-Schritt bei Erstbesuch

#### 1. Tooltip-System

**Neues Modul: `script-tooltips.js`**

```javascript
// ============================================================================
// SCRIPT-TOOLTIPS.JS
// Kontextbezogene Tooltips für UI-Elemente
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'TOOLTIPS';
    
    // ===== TOOLTIP CONTAINER =====
    let tooltipElement = null;
    
    function createTooltipElement() {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'app-tooltip';
        tooltipElement.setAttribute('role', 'tooltip');
        tooltipElement.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tooltipElement);
    }
    
    // ===== TOOLTIP ANZEIGE =====
    
    function showTooltip(targetElement, text) {
        if (!tooltipElement || !text) return;
        
        tooltipElement.textContent = text;
        tooltipElement.setAttribute('aria-hidden', 'false');
        
        // Position berechnen
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        
        // Viewport-Check
        if (top < 10) {
            top = rect.bottom + 8; // Unterhalb anzeigen
            tooltipElement.classList.add('tooltip-bottom');
        } else {
            tooltipElement.classList.remove('tooltip-bottom');
        }
        
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
        tooltipElement.classList.add('visible');
    }
    
    function hideTooltip() {
        if (!tooltipElement) return;
        
        tooltipElement.classList.remove('visible');
        tooltipElement.setAttribute('aria-hidden', 'true');
    }
    
    // ===== EVENT HANDLERS =====
    
    function handleMouseEnter(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleMouseLeave(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        hideTooltip();
    }
    
    function handleFocus(event) {
        const target = event.target;
        if (!target.hasAttribute('data-tooltip')) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleBlur() {
        hideTooltip();
    }
    
    // ===== INITIALIZATION =====
    
    function initTooltips() {
        LOG(MODULE, 'Initializing tooltip system...');
        
        createTooltipElement();
        
        // Event-Delegation für alle Tooltips
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);
        document.addEventListener('focus', handleFocus, true);
        document.addEventListener('blur', handleBlur, true);
        
        LOG.success(MODULE, 'Tooltip system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }
    
    LOG(MODULE, 'Tooltips module loaded');
    
})();
```

**CSS für Tooltips:**

```css
/* ===== TOOLTIP SYSTEM ===== */
.app-tooltip {
    position: fixed;
    background-color: var(--color-text-primary);
    color: var(--color-surface-elevated);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.9em;
    line-height: 1.4;
    max-width: 250px;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 4px 12px var(--color-shadow-strong);
}

.app-tooltip.visible {
    opacity: 1;
    transform: translateY(0);
}

.app-tooltip.tooltip-bottom {
    transform: translateY(4px);
}

.app-tooltip.tooltip-bottom.visible {
    transform: translateY(0);
}

/* Tooltip-Pfeil (optional) */
.app-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: var(--color-text-primary);
}

.app-tooltip.tooltip-bottom::before {
    bottom: auto;
    top: 100%;
    border-bottom-color: transparent;
    border-top-color: var(--color-text-primary);
}

/* Accessibility: Tooltips bei prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
    .app-tooltip {
        transition: none;
    }
}
```

**HTML-Markup (Beispiele):**

```html
<!-- Hamburger Menu -->
<button id="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen">
    ☰
</button>

<!-- Detail-Level Buttons -->
<button class="detail-btn-mini" 
        data-level="1"
        data-tooltip="Ebene 1: Nur die wichtigsten Informationen"
        aria-pressed="true">
    1
</button>

<!-- Sidebar Toggle -->
<button id="toggle-nav-sidebar-btn" 
        data-tooltip="Zeigt oder versteckt die Navigations-Sidebar"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<!-- Theme Toggle -->
<button id="toggle-theme" 
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata"
        role="menuitem">
    Theme: <span id="current-theme">System</span>
</button>
```

#### 2. Onboarding-Guide

**Neues Modul: `script-onboarding.js`**

```javascript
// ============================================================================
// SCRIPT-ONBOARDING.JS
// Einmaliger Onboarding-Guide für Erstnutzer
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'ONBOARDING';
    
    // ===== ONBOARDING STEPS =====
    const ONBOARDING_STEPS = [
        {
            target: '#menu-toggle',
            title: 'Willkommen! 👋',
            message: 'Hier finden Sie alle wichtigen Einstellungen und Funktionen.',
            position: 'bottom'
        },
        {
            target: '.detail-controls',
            title: 'Detailtiefe anpassen',
            message: 'Wählen Sie zwischen drei Detailstufen: Basis, Standard oder Vollständig.',
            position: 'bottom'
        },
        {
            target: '#toggle-nav-sidebar-btn',
            title: 'Navigation-Sidebar',
            message: 'Öffnen Sie die Sidebar für schnelle Navigation durch den Leitfaden.',
            action: () => {
                document.getElementById('toggle-nav-sidebar-btn')?.click();
            }
        },
        {
            target: '.notes-toggle',
            title: 'Notizen machen',
            message: 'Halten Sie wichtige Informationen direkt im Leitfaden fest.',
            position: 'left'
        },
        {
            target: '#toggle-theme',
            title: 'Theme wählen',
            message: 'Passen Sie das Farbschema an Ihre Vorlieben an.',
            position: 'bottom'
        }
    ];
    
    // ===== STATE =====
    let currentStep = 0;
    let onboardingActive = false;
    let overlayElement = null;
    let highlightElement = null;
    let tooltipElement = null;
    
    // ===== ONBOARDING UI =====
    
    function createOnboardingElements() {
        // Overlay
        overlayElement = document.createElement('div');
        overlayElement.className = 'onboarding-overlay';
        overlayElement.setAttribute('aria-hidden', 'true');
        
        // Highlight
        highlightElement = document.createElement('div');
        highlightElement.className = 'onboarding-highlight';
        
        // Tooltip
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'onboarding-tooltip';
        tooltipElement.innerHTML = `
            <div class="onboarding-header">
                <h3 class="onboarding-title"></h3>
                <button class="onboarding-skip" aria-label="Tour überspringen">×</button>
            </div>
            <p class="onboarding-message"></p>
            <div class="onboarding-footer">
                <span class="onboarding-progress"></span>
                <div class="onboarding-buttons">
                    <button class="onboarding-prev">Zurück</button>
                    <button class="onboarding-next">Weiter</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlayElement);
        document.body.appendChild(highlightElement);
        document.body.appendChild(tooltipElement);
    }
    
    function showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= ONBOARDING_STEPS.length) {
            endOnboarding();
            return;
        }
        
        currentStep = stepIndex;
        const step = ONBOARDING_STEPS[stepIndex];
        
        // Target Element finden
        const targetElement = document.querySelector(step.target);
        if (!targetElement) {
            LOG.warn(MODULE, `Target not found: ${step.target}, skipping step`);
            showStep(stepIndex + 1);
            return;
        }
        
        // Highlight positionieren
        const rect = targetElement.getBoundingClientRect();
        highlightElement.style.top = `${rect.top - 8}px`;
        highlightElement.style.left = `${rect.left - 8}px`;
        highlightElement.style.width = `${rect.width + 16}px`;
        highlightElement.style.height = `${rect.height + 16}px`;
        
        // Tooltip aktualisieren
        tooltipElement.querySelector('.onboarding-title').textContent = step.title;
        tooltipElement.querySelector('.onboarding-message').textContent = step.message;
        tooltipElement.querySelector('.onboarding-progress').textContent = 
            `Schritt ${stepIndex + 1} von ${ONBOARDING_STEPS.length}`;
        
        // Tooltip positionieren
        positionTooltip(targetElement, step.position || 'right');
        
        // Navigation Buttons
        const prevBtn = tooltipElement.querySelector('.onboarding-prev');
        const nextBtn = tooltipElement.querySelector('.onboarding-next');
        
        prevBtn.disabled = stepIndex === 0;
        nextBtn.textContent = stepIndex === ONBOARDING_STEPS.length - 1 ? 'Fertig' : 'Weiter';
        
        // Aktion ausführen (falls vorhanden)
        if (step.action && typeof step.action === 'function') {
            setTimeout(() => step.action(), 300);
        }
        
        // Elemente anzeigen
        overlayElement.classList.add('visible');
        highlightElement.classList.add('visible');
        tooltipElement.classList.add('visible');
        
        LOG(MODULE, `Showing step ${stepIndex + 1}/${ONBOARDING_STEPS.length}`);
    }
    
    function positionTooltip(targetElement, position) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top, left;
        
        switch(position) {
            case 'bottom':
                top = rect.bottom + 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'top':
                top = rect.top - tooltipRect.height - 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left - tooltipRect.width - 16;
                break;
            case 'right':
            default:
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + 16;
                break;
        }
        
        // Viewport boundaries
        if (top < 10) top = 10;
        if (left < 10) left = 10;
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = window.innerHeight - tooltipRect.height - 10;
        }
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }
    
    function endOnboarding() {
        onboardingActive = false;
        
        overlayElement?.classList.remove('visible');
        highlightElement?.classList.remove('visible');
        tooltipElement?.classList.remove('visible');
        
        // Markiere Onboarding als abgeschlossen
        localStorage.setItem('axiom-onboarding-completed', 'true');
        
        LOG.success(MODULE, 'Onboarding completed');
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Skip Button
        tooltipElement.querySelector('.onboarding-skip').addEventListener('click', () => {
            endOnboarding();
        });
        
        // Previous Button
        tooltipElement.querySelector('.onboarding-prev').addEventListener('click', () => {
            showStep(currentStep - 1);
        });
        
        // Next Button
        tooltipElement.querySelector('.onboarding-next').addEventListener('click', () => {
            showStep(currentStep + 1);
        });
        
        // ESC zum Abbrechen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && onboardingActive) {
                endOnboarding();
            }
        });
    }
    
    // ===== PUBLIC API =====
    
    window.startOnboarding = function() {
        if (onboardingActive) return;
        
        onboardingActive = true;
        currentStep = 0;
        
        if (!overlayElement) {
            createOnboardingElements();
            setupEventHandlers();
        }
        
        showStep(0);
        
        LOG(MODULE, 'Onboarding started');
    };
    
    // ===== INITIALIZATION =====
    
    function initOnboarding() {
        LOG(MODULE, 'Initializing onboarding system...');
        
        // Check if onboarding already completed
        const completed = localStorage.getItem('axiom-onboarding-completed');
        
        if (!completed) {
            // Start onboarding nach kurzer Verzögerung
            setTimeout(() => {
                window.startOnboarding();
            }, 1000);
        } else {
            LOG(MODULE, 'Onboarding already completed, skipping');
        }
        
        LOG.success(MODULE, 'Onboarding system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOnboarding);
    } else {
        initOnboarding();
    }
    
    LOG(MODULE, 'Onboarding module loaded');
    
})();
```

**CSS für Onboarding:**

```css
/* ===== ONBOARDING SYSTEM ===== */

/* Overlay - verdunkelt den Hintergrund */
.onboarding-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.onboarding-overlay.visible {
    opacity: 1;
    pointer-events: auto;
}

/* Highlight - hebt das aktuelle Element hervor */
.onboarding-highlight {
    position: fixed;
    border: 3px solid var(--color-primary);
    border-radius: 8px;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7),
                0 0 20px var(--color-primary);
}

.onboarding-highlight.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip - zeigt die Anleitung */
.onboarding-tooltip {
    position: fixed;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    border-radius: 12px;
    padding: 0;
    max-width: 350px;
    z-index: 10000;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px var(--color-shadow-strong);
}

.onboarding-tooltip.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip Header */
.onboarding-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 15px;
    border-bottom: 2px solid var(--color-border);
}

.onboarding-title {
    margin: 0;
    font-size: 1.2em;
    color: var(--color-primary);
}

.onboarding-skip {
    background: none;
    border: none;
    font-size: 1.8em;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all var(--transition-fast);
}

.onboarding-skip:hover {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
}

/* Tooltip Message */
.onboarding-message {
    padding: 20px;
    margin: 0;
    line-height: 1.6;
}

/* Tooltip Footer */
.onboarding-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 20px;
    border-top: 2px solid var(--color-border);
}

.onboarding-progress {
    font-size: 0.9em;
    color: var(--color-text-secondary);
}

.onboarding-buttons {
    display: flex;
    gap: 10px;
}

.onboarding-prev,
.onboarding-next {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 0.95em;
    font-weight: 500;
    transition: all var(--transition-fast);
}

.onboarding-prev {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    border: 2px solid var(--color-border);
}

.onboarding-prev:hover:not(:disabled) {
    background-color: var(--color-border);
}

.onboarding-prev:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.onboarding-next {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
}

.onboarding-next:hover {
    background-color: var(--color-primary-hover);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    .onboarding-overlay,
    .onboarding-highlight,
    .onboarding-tooltip {
        transition: none;
    }
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .onboarding-tooltip {
        max-width: calc(100vw - 40px);
        left: 20px !important;
        right: 20px;
        bottom: 20px !important;
        top: auto !important;
    }
    
    .onboarding-highlight {
        border-width: 2px;
    }
}
```

### Integration in index.html

**Reihenfolge der Script-Einbindung:**

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

<!-- UI Enhancements (NEU!) -->
<script src="script-tooltips.js"></script>
<script src="script-onboarding.js"></script>

<!-- Initialisierung (ZULETZT!) -->
<script src="script-init.js"></script>
```

### HTML-Markup Erweiterungen

**Tooltips hinzufügen zu allen interaktiven Elementen:**

```html
<!-- Top Navigation -->
<button id="menu-toggle" 
        class="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen" 
        aria-expanded="false">
    ☰
</button>

<!-- Detail Controls -->
<div class="detail-controls" data-tooltip="Wählen Sie die gewünschte Detailtiefe des Leitfadens">
    <span class="detail-label">Detail:</span>
    <div class="detail-buttons">
        <button class="detail-btn-mini" 
                data-level="1"
                data-tooltip="Ebene 1: Nur die wichtigsten Informationen anzeigen"
                aria-pressed="true">1</button>
        <button class="detail-btn-mini" 
                data-level="2"
                data-tooltip="Ebene 2: Standard-Informationen mit zusätzlichen Details"
                aria-pressed="false">2</button>
        <button class="detail-btn-mini" 
                data-level="3"
                data-tooltip="Ebene 3: Alle verfügbaren Informationen anzeigen"
                aria-pressed="false">3</button>
    </div>
</div>

<!-- Notes Toggle -->
<button class="notes-toggle" 
        data-tooltip="Öffnet das Notizen-Panel für persönliche Anmerkungen"
        aria-label="Notizen öffnen/schließen">
    📝 Notizen
</button>

<!-- Menu Items -->
<button class="menu-item" 
        id="show-history-btn" 
        data-tooltip="Zeigt den Verlauf der besuchten Abschnitte"
        role="menuitem">
    <span class="menu-icon">📜</span>
    Verlauf ein/aus
</button>

<button class="menu-item" 
        id="toggle-nav-sidebar-btn"
        data-tooltip="Öffnet die Navigation für schnellen Zugriff auf alle Abschnitte"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<button class="menu-item" 
        id="toggle-tips-footer-btn"
        data-tooltip="Blendet die Tipps am unteren Bildschirmrand ein oder aus"
        role="menuitem">
    <span class="menu-icon">💡</span>
    Tipps ein/aus
</button>

<button class="menu-item" 
        id="toggle-theme"
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata (Hell, Dunkel, Hochkontrast)"
        role="menuitem">
    <div class="theme-icon">...</div>
    Theme: <span id="current-theme">System</span>
</button>
```

### Implementierungsschritte

**Phase 1: Tooltip-System** (2-3 Stunden)
1. `script-tooltips.js` erstellen
2. CSS für Tooltips in `styles.css` einfügen
3. `data-tooltip` Attribute in `index.html` ergänzen
4. Testing auf Desktop & Mobile

**Phase 2: Onboarding-Guide** (3-4 Stunden)
1. `script-onboarding.js` erstellen
2. CSS für Onboarding in `styles.css` einfügen
3. Onboarding-Steps definieren und testen
4. Edge Cases behandeln (fehlende Targets, etc.)

**Phase 3: Feintuning** (1-2 Stunden)
1. Tooltip-Texte verfeinern und vereinheitlichen
2. Onboarding-Flow optimieren
3. Accessibility-Tests durchführen
4. Mobile-Optimierung validieren

**Gesamt-Aufwand:** ca. 6-9 Stunden

### Erweiterungsmöglichkeiten

**Optionale Features für später:**

1. **Onboarding zurücksetzen:**
   ```javascript
   // Im Menü einen "Hilfe-Tour starten" Button hinzufügen
   <button class="menu-item" onclick="resetOnboarding()">
       <span class="menu-icon">❓</span>
       Hilfe-Tour starten
   </button>
   
   function resetOnboarding() {
       localStorage.removeItem('axiom-onboarding-completed');
       window.startOnboarding();
   }
   ```

2. **Kontext-sensitive Tooltips:**
   ```javascript
   // Tooltips, die sich basierend auf aktuellem State ändern
   <button data-tooltip-active="Sidebar ist geöffnet" 
           data-tooltip-inactive="Sidebar öffnen">
   ```

3. **Video-Tutorials in Tooltips:**
   ```javascript
   // Erweiterte Tooltips mit eingebetteten Demos
   data-tooltip-video="demo-sidebar.mp4"
   ```

4. **Tooltip-Übersetzungen:**
   ```javascript
   // i18n Support für mehrsprachige Tooltips
   data-tooltip-key="tooltip.sidebar.open"
   ```

### Vorteile nach Umsetzung

✅ **Reduzierte Lernkurve:** Neue Nutzer verstehen Features sofort  
✅ **Bessere Discoveryability:** Versteckte Features werden gefunden  
✅ **Kontextbezogene Hilfe:** Hilfe genau dort, wo sie benötigt wird  
✅ **Einmalige Einführung:** Onboarding nur beim ersten Besuch  
✅ **Barrierefrei:** Tooltips per Tastatur & Screen Reader zugänglich  
✅ **Wartbar:** Tooltip-Texte zentral in HTML verwaltet

---

## 📋 Priorisierung & Roadmap

### Empfohlene Umsetzungsreihenfolge

**Sprint 1 (Woche 1):**
- ✅ Verbesserungsvorschlag 1: State Management
  - Tag 1-2: Grundgerüst erstellen
  - Tag 3-4: Kern-Module migrieren
  - Tag 5: Testing & Cleanup

**Sprint 2 (Woche 2):**
- ✅ Verbesserungsvorschlag 3: Tooltip-System
  - Tag 1-2: Tooltip-System implementieren
  - Tag 3: HTML-Markup erweitern
  - Tag 4-5: Testing & Feintuning

**Sprint 3 (Woche 3):**
- ✅ Verbesserungsvorschlag 3: Onboarding-Guide
  - Tag 1-2: Onboarding-System implementieren
  - Tag 3: Onboarding-Flow definieren
  - Tag 4-5: Testing & Optimierung

### Abhängigkeiten

```
State Management (V1)
    ↓
    ├── Tooltips verwenden AppState für Preferences
    └── Onboarding verwendet AppState für Tracking
```

**Wichtig:** State Management sollte **zuerst** implementiert werden, da die anderen Features davon profitieren können (z.B. Onboarding-Status im AppState speichern).

---

## 🧪 Testing-Checkliste

### State Management Testing

- [ ] State-Updates werden korrekt persistiert
- [ ] Subscribers werden bei Änderungen benachrichtigt
- [ ] Cross-Module State-Synchronisation funktioniert
- [ ] LocalStorage-Fallback bei Quota-Überschreitung
- [ ] State-Reset bei Fehler funktioniert

### Tooltip Testing

- [ ] Tooltips erscheinen bei Hover
- [ ] Tooltips erscheinen bei Keyboard-Focus
- [ ] Tooltips passen sich an Viewport-Grenzen an
- [ ] Screen Reader liest Tooltips korrekt vor
- [ ] Mobile Touch-Tooltips funktionieren
- [ ] Tooltips verschwinden korrekt bei Blur/Leave

### Onboarding Testing

- [ ] Onboarding startet nur beim ersten Besuch
- [ ] Alle Steps werden korrekt angezeigt
- [ ] Navigation (Vor/Zurück/Skip) funktioniert
- [ ] Highlight positioniert sich korrekt
- [ ] Aktionen werden ausgeführt (z.B. Sidebar öffnen)
- [ ] ESC-Taste bricht Onboarding ab
- [ ] Onboarding-Status wird persistiert
- [ ] Mobile-Ansicht funktioniert korrekt

---

## 📚 Dokumentation & Wartung

### Code-Dokumentation

Alle neuen Module sollten folgende Dokumentation enthalten:

```javascript
/**
 * SCRIPT-MODULE-NAME.JS
 * 
 * Beschreibung: [Was macht das Modul?]
 * 
 * Abhängigkeiten:
 * - script-core.js (Logging)
 * - script-state-manager.js (State)
 * 
 * Public API:
 * - window.functionName() - [Beschreibung]
 * 
 * Events:
 * - Emittiert: [welche Events]
 * - Hört auf: [welche Events]
 * 
 * LocalStorage Keys:
 * - key-name: [Beschreibung]
 */
```

### Update-Guide für Team

**Wenn neue UI-Elemente hinzugefügt werden:**

1. Tooltip hinzufügen:
   ```html
   <button data-tooltip="Beschreibung der Funktion">...</button>
   ```

2. Bei Bedarf in Onboarding aufnehmen:
   ```javascript
   // In script-onboarding.js
   ONBOARDING_STEPS.push({
       target: '#new-element',
       title: 'Neues Feature',
       message: 'Beschreibung...'
   });
   ```

3. State-Integration (falls zustandsbehaftet):
   ```javascript
   // State definieren
   AppState.ui.newFeature = false;
   
   // Subscribe to changes
   AppState.subscribe('ui.newFeature', (value) => {
       // React to change
   });
   ```

---

## 🔄 Migration & Rollback

### Migration von Alt zu Neu

**Sicherer Migrations-Prozess:**

1. **Backup erstellen:**
   ```bash
   # Alle relevanten Dateien sichern
   cp script-sidebar-manager.js script-sidebar-manager.js.backup
   cp script-theme.js script-theme.js.backup
   # etc.
   ```

2. **Feature-Flag einführen:**
   ```javascript
   // In script-core.js
   window.BUILD_INFO.useNewStateManager = true; // Kann zum Rollback auf false gesetzt werden
   ```

3. **Schrittweise Migration:**
   - Ein Modul nach dem anderen migrieren
   - Nach jedem Modul vollständig testen
   - Bei Problemen: Feature-Flag auf false setzen

4. **Alte Code-Pfade beibehalten:**
   ```javascript
   if (window.BUILD_INFO.useNewStateManager && window.AppState) {
       // Neuer Code-Pfad
       AppState.update('ui.sidebarOpen', true);
   } else {
       // Alter Code-Pfad (Fallback)
       localStorage.setItem('sidebar-open', 'true');
   }
   ```

### Rollback-Strategie

Falls nach Deployment Probleme auftreten:

1. **Sofort-Rollback:**
   ```javascript
   // In script-core.js
   window.BUILD_INFO.useNewStateManager = false;
   ```

2. **Vollständiger Rollback:**
   ```bash
   # Backup-Dateien wiederherstellen
   cp script-sidebar-manager.js.backup script-sidebar-manager.js
   # State-Manager deaktivieren
   # <!-- <script src="script-state-manager.js"></script> -->
   ```

3. **Daten-Migration:**
   ```javascript
   // Falls neue State-Struktur inkompatibel ist
   function migrateOldToNewState() {
       const oldData = localStorage.getItem('old-key');
       if (oldData) {
           AppState.update('new.path', oldData);
           localStorage.removeItem('old-key');
       }
   }
   ```

---

## 💡 Best Practices

### State Management

- **Immer über AppState.update() ändern**, nie direkt
- **Subscribe-Functions aufräumen** wenn Komponente unmounted
- **Debouncing nutzen** für häufige Updates
- **Validation** vor State-Updates durchführen

### Tooltips

- **Kurz und präzise** formulieren (max. 1-2 Sätze)
- **Aktionsorientiert** schreiben ("Öffnet..." statt "Hier können Sie...")
- **Konsistente Terminologie** verwenden
- **Accessibility** beachten (aria-label zusätzlich)

### Onboarding

- **Nicht zu viele Steps** (max. 5-7)
- **Wichtigste Features zuerst** zeigen
- **Überspringen ermöglichen** (ESC + Skip-Button)
- **Auf allen Breakpoints testen**

---

## 📊 Success Metrics

### KPIs nach Implementierung messen

**State Management:**
- ✅ Reduzierte Bug-Reports zu State-Inkonsistenzen
- ✅ Kürzere Entwicklungszeit für neue Features
- ✅ Weniger localStorage-Zugriffe (Performance)

**Tooltips & Onboarding:**
- ✅ Reduzierte Support-Anfragen zu "Wie funktioniert...?"
- ✅ Höhere Feature-Nutzung (Tracking via Analytics)
- ✅ Schnellere Time-to-Value für neue Nutzer

### Tracking implementieren (optional)

```javascript
// In script-onboarding.js
function trackOnboardingStep(stepIndex) {
    if (window.analytics) {
        window.analytics.track('Onboarding Step', {
            step: stepIndex,
            stepName: ONBOARDING_STEPS[stepIndex].title
        });
    }
}

// In script-tooltips.js  
function trackTooltipView(tooltipText) {
    if (window.analytics) {
        window.analytics.track('Tooltip Viewed', {
            content: tooltipText
        });
    }
}
```

---

## ✅ Abschluss-Checkliste

### Vor Deployment prüfen:

**Code-Qualität:**
- [ ] Alle Module sind dokumentiert
- [ ] Logging ist konsistent implementiert
- [ ] Error-Handling ist vorhanden
- [ ] Code ist reviewt und getestet

**Funktionalität:**
- [ ] Alle Features funktionieren wie spezifiziert
- [ ] Cross-Browser-Tests durchgeführt
- [ ] Mobile-Tests durchgeführt
- [ ] Accessibility-Tests durchgeführt

**Performance:**
- [ ] Keine Memory Leaks
- [ ] LocalStorage-Quota wird nicht überschritten
- [ ] Keine unnötigen Re-Renders/Updates

**Dokumentation:**
- [ ] README aktualisiert
- [ ] Changelog erstellt
- [ ] Team ist geschult
- [ ] Rollback-Plan vorhanden

---

## 📞 Support & Weitere Hilfe

Bei Fragen oder Problemen während der Implementierung:

1. **Konsole prüfen:** Debug-Logs aktivieren (`BUILD_INFO.debugMode = true`)
2. **State inspizieren:** `console.log(AppState)` in Browser-Console
3. **Module einzeln testen:** Features isoliert aktivieren/deaktivieren
4. **Rollback nutzen:** Bei kritischen Problemen sofort zurückrollen

---

**Ende des Dokuments**  
*Letzte Aktualisierung: 04. Oktober 2025*