# V08: Agent FAQ & Feedback-System

**Priorität:** 🟡 Mittel  
**Aufwand:** 6-8 Stunden  
**Status:** Im Scope, nicht dringend

---

## Feature-Beschreibung

Erweiterung des bestehenden Agenten um zwei neue Module:

1. **FAQ-System:** Intelligente Suche in häufig gestellten Fragen
2. **Feedback-Funktion:** Direkte Kontaktmöglichkeit per vorkonfigurierter E-Mail

**Ziel:** Self-Service für Nutzer und direkter Feedback-Kanal

---

## FAQ-Datenstruktur (JSON)

### Datei: `agent-faq.json`

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
    },
    {
      "id": "datenquellen",
      "question": "Welche Datenquellen werden unterstützt?",
      "answer": "AXIOM unterstützt Smartphones (iOS, Android), Computer (Windows, Mac, Linux), Cloud-Dienste (Google, Apple, Microsoft), sowie Images und physische Dumps. Eine vollständige Liste finden Sie in der Dokumentation.",
      "tags": ["datenquellen", "quellen", "unterstützt", "devices"],
      "category": "allgemein",
      "relatedSections": ["step2"],
      "priority": 1
    },
    {
      "id": "report-erstellen",
      "question": "Wie erstelle ich einen Report?",
      "answer": "Nach Abschluss der Analyse wählen Sie 'Generate Report' in AXIOM Examine. Wählen Sie das gewünschte Format (PDF, HTML, XLSX) und die einzuschließenden Artefakte. Der Report wird im Output-Ordner gespeichert.",
      "tags": ["report", "bericht", "erstellen", "exportieren"],
      "category": "allgemein",
      "relatedSections": ["step5", "reporting"],
      "priority": 2
    }
  ],
  "categories": {
    "allgemein": {
      "name": "Allgemeine Fragen",
      "icon": "❓"
    },
    "troubleshooting": {
      "name": "Problembehebung",
      "icon": "🔧"
    },
    "forensik": {
      "name": "Forensische Praxis",
      "icon": "🔍"
    },
    "technik": {
      "name": "Technische Details",
      "icon": "⚙️"
    }
  }
}
```

### JSON-Schema Erklärung

| Feld | Typ | Beschreibung | Pflicht |
|------|-----|--------------|---------|
| `id` | string | Eindeutiger Identifier | ✅ |
| `question` | string | Frage | ✅ |
| `answer` | string | Antwort | ✅ |
| `tags` | array | Keywords für Suche | ✅ |
| `category` | string | Kategorie-ID | ✅ |
| `relatedSections` | array | Verwandte Abschnitte (IDs) | ❌ |
| `priority` | number | Sortier-Priorität (1=hoch) | ✅ |

---

## HTML-Integration

### Erweiterung der Agent-Sidebar

```html
<!-- NEUER TAB: FAQ -->
<div class="agent-mode" data-mode="faq">
    <div class="agent-faq-header">
        <h3>💬 Häufige Fragen</h3>
        <p class="agent-faq-subtitle">Finden Sie schnell Antworten auf Ihre Fragen</p>
    </div>
    
    <div class="agent-faq-search">
        <input type="text" 
               id="agent-faq-input"
               class="agent-faq-input"
               placeholder="Stellen Sie eine Frage oder geben Sie Suchbegriffe ein..."
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
        <div class="agent-faq-examples">
            <p><strong>Beispiele:</strong></p>
            <ul>
                <li>"Wie lange dauert ein Export?"</li>
                <li>"Was tun bei Fehlern?"</li>
                <li>"Wie prüfe ich Hashes?"</li>
            </ul>
        </div>
    </div>
</div>

<!-- NEUER TAB: Feedback -->
<div class="agent-mode" data-mode="feedback">
    <div class="agent-feedback-header">
        <h3>📧 Feedback & Ideen</h3>
        <p class="agent-feedback-subtitle">Helfen Sie uns, besser zu werden!</p>
    </div>
    
    <div class="agent-feedback-content">
        <p>Haben Sie Verbesserungsvorschläge oder Fragen? Wählen Sie eine Option:</p>
        
        <div class="agent-feedback-options">
            <button class="agent-feedback-btn" data-type="bug">
                <span class="feedback-icon">🐛</span>
                <span class="feedback-label">Problem melden</span>
                <span class="feedback-desc">Etwas funktioniert nicht?</span>
            </button>
            
            <button class="agent-feedback-btn" data-type="feature">
                <span class="feedback-icon">💡</span>
                <span class="feedback-label">Feature-Idee</span>
                <span class="feedback-desc">Verbesserungsvorschlag</span>
            </button>
            
            <button class="agent-feedback-btn" data-type="question">
                <span class="feedback-icon">❓</span>
                <span class="feedback-label">Frage stellen</span>
                <span class="feedback-desc">Etwas unklar?</span>
            </button>
            
            <button class="agent-feedback-btn" data-type="general">
                <span class="feedback-icon">💬</span>
                <span class="feedback-label">Allgemeines Feedback</span>
                <span class="feedback-desc">Lob oder Kritik</span>
            </button>
        </div>
        
        <div class="agent-feedback-info">
            <p>📨 Klicken Sie auf eine Option, um eine E-Mail zu erstellen.</p>
        </div>
    </div>
</div>
```

### Mode-Selector erweitern

```html
<div class="agent-mode-selector">
    <button class="agent-mode-btn active" data-mode="chat">💬 Chat</button>
    <button class="agent-mode-btn" data-mode="faq">❓ FAQ</button>
    <button class="agent-mode-btn" data-mode="feedback">📧 Feedback</button>
</div>
```

---

## CSS-Styling

```css
/* ===== AGENT MODE SELECTOR ===== */
.agent-mode-selector {
    display: flex;
    gap: 5px;
    padding: 10px;
    background-color: var(--color-surface);
    border-bottom: 2px solid var(--color-border);
}

.agent-mode-btn {
    flex: 1;
    padding: 10px;
    background-color: var(--color-surface-elevated);
    border: 2px solid var(--color-border);
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all var(--transition-fast);
}

.agent-mode-btn:hover {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border-color: var(--color-primary);
}

.agent-mode-btn.active {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border-color: var(--color-primary);
}

/* ===== AGENT FAQ ===== */
.agent-mode {
    display: none;
    padding: 20px;
}

.agent-mode.active {
    display: block;
}

.agent-faq-header,
.agent-feedback-header {
    margin-bottom: 20px;
}

.agent-faq-header h3,
.agent-feedback-header h3 {
    margin: 0 0 5px 0;
    color: var(--color-primary);
}

.agent-faq-subtitle,
.agent-feedback-subtitle {
    margin: 0;
    font-size: 0.9em;
    color: var(--color-text-secondary);
}

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
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    transition: all var(--transition-fast);
}

.agent-faq-input:focus {
    outline: none;
    border-color: var(--color-border-strong);
    box-shadow: 0 0 0 3px var(--color-focus);
}

.agent-faq-submit {
    padding: 12px 20px;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2em;
    transition: all var(--transition-fast);
}

.agent-faq-submit:hover {
    background-color: var(--color-primary-hover);
}

/* FAQ Results */
.agent-faq-results {
    display: none;
}

.agent-faq-results.has-results {
    display: block;
}

.agent-faq-result {
    background-color: var(--color-surface);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
    border-left: 4px solid var(--color-info);
    transition: all var(--transition-fast);
}

.agent-faq-result:hover {
    border-left-color: var(--color-primary);
    box-shadow: 0 2px 8px var(--color-shadow);
}

.agent-faq-question {
    margin-bottom: 10px;
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1.05em;
}

.agent-faq-answer {
    line-height: 1.6;
    margin-bottom: 10px;
    color: var(--color-text-primary);
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

.agent-faq-related-label {
    color: var(--color-text-secondary);
}

.agent-faq-goto {
    padding: 4px 12px;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85em;
    transition: all var(--transition-fast);
}

.agent-faq-goto:hover {
    background-color: var(--color-primary-hover);
}

/* FAQ Empty State */
.agent-faq-empty {
    text-align: center;
    padding: 40px 20px;
    color: var(--color-text-secondary);
}

.agent-faq-examples {
    text-align: left;
    display: inline-block;
    margin-top: 20px;
}

.agent-faq-examples ul {
    list-style: none;
    padding: 0;
}

.agent-faq-examples li {
    padding: 8px 0;
    color: var(--color-text-primary);
}

.agent-faq-examples li::before {
    content: "→ ";
    color: var(--color-primary);
    font-weight: bold;
}

.agent-faq-no-results {
    text-align: center;
    padding: 30px 20px;
    color: var(--color-text-secondary);
    background-color: var(--color-surface);
    border-radius: 8px;
}

/* ===== AGENT FEEDBACK ===== */
.agent-feedback-content p {
    margin-bottom: 20px;
}

.agent-feedback-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 20px 0;
}

.agent-feedback-btn {
    padding: 20px 16px;
    background-color: var(--color-surface);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
}

.agent-feedback-btn:hover {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--color-shadow);
}

.feedback-icon {
    font-size: 2em;
}

.feedback-label {
    font-weight: 600;
    font-size: 1em;
}

.feedback-desc {
    font-size: 0.85em;
    opacity: 0.8;
}

.agent-feedback-info {
    text-align: center;
    color: var(--color-text-secondary);
    font-size: 0.9em;
    margin-top: 20px;
    padding: 16px;
    background-color: var(--color-surface);
    border-radius: 8px;
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .agent-feedback-options {
        grid-template-columns: 1fr;
    }
}
```

---

## JavaScript-Erweiterung

### FAQ-System im Agent (`agent.js` ergänzen)

```javascript
// ===== FAQ SYSTEM =====

let faqData = null;

async function loadFAQ() {
    try {
        const response = await fetch('agent-faq.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        faqData = await response.json();
        LOG('AGENT', `Loaded ${faqData.faqs.length} FAQs`);
        return true;
    } catch (error) {
        LOG.error('AGENT', 'Failed to load FAQ', error);
        return false;
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
        container.innerHTML = '<div class="agent-faq-no-results">❌ Keine passenden Antworten gefunden. Versuchen Sie andere Begriffe oder nutzen Sie das Feedback-Formular.</div>';
        container.classList.add('has-results');
        emptyState.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    container.classList.add('has-results');
    
    container.innerHTML = results.map(faq => `
        <div class="agent-faq-result" data-faq-id="${faq.id}">
            <div class="agent-faq-question">
                ❓ ${faq.question}
            </div>
            <div class="agent-faq-answer">
                ${faq.answer}
            </div>
            ${faq.relatedSections && faq.relatedSections.length > 0 ? `
                <div class="agent-faq-related">
                    <span class="agent-faq-related-label">📍 Verwandte Abschnitte:</span>
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

function getSectionTitle(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return sectionId;
    
    const heading = section.querySelector('h2, h3');
    return heading ? heading.textContent : sectionId;
}

function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
        LOG.error('AGENT', `Section not found: ${sectionId}`);
        return;
    }
    
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    section.classList.add('scroll-highlight');
    setTimeout(() => {
        section.classList.remove('scroll-highlight');
    }, 2000);
    
    // Schließe Agent-Sidebar (optional)
    // closeAgentSidebar();
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
            body: `Hallo,

ich möchte folgendes Problem melden:

[Bitte beschreiben Sie das Problem]

Schritte zur Reproduktion:
1. 
2. 
3. 

Erwartetes Verhalten:
[Was sollte passieren?]

Tatsächliches Verhalten:
[Was passiert stattdessen?]

---
Browser: ${navigator.userAgent}
Seite: ${window.location.href}
Zeitstempel: ${new Date().toISOString()}`
        },
        feature: {
            subject: '[AXIOM Leitfaden] Feature-Vorschlag',
            body: `Hallo,

ich habe eine Idee für ein neues Feature:

[Beschreiben Sie Ihre Idee]

Nutzen:
[Welches Problem löst dieses Feature?]

Zielgruppe:
[Wer würde davon profitieren?]

---
Seite: ${window.location.href}
Zeitstempel: ${new Date().toISOString()}`
        },
        question: {
            subject: '[AXIOM Leitfaden] Frage',
            body: `Hallo,

ich habe folgende Frage:

[Ihre Frage]

---
Kontext:
[Wo im Leitfaden sind Sie gerade?]
Seite: ${window.location.href}
Zeitstempel: ${new Date().toISOString()}`
        },
        general: {
            subject: '[AXIOM Leitfaden] Feedback',
            body: `Hallo,

[Ihr Feedback]

---
Seite: ${window.location.href}
Zeitstempel: ${new Date().toISOString()}`
        }
    };
    
    const mailConfig = config[type] || config.general;
    const mailto = `mailto:support@ihre-firma.de?subject=${encodeURIComponent(mailConfig.subject)}&body=${encodeURIComponent(mailConfig.body)}`;
    
    window.location.href = mailto;
    
    LOG('AGENT', `Feedback email opened: ${type}`);
}

// ===== MODE SWITCHING =====

function setupModeSwitching() {
    document.querySelectorAll('.agent-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            switchAgentMode(mode);
        });
    });
}

function switchAgentMode(mode) {
    // Deactivate all modes
    document.querySelectorAll('.agent-mode').forEach(m => {
        m.classList.remove('active');
    });
    
    document.querySelectorAll('.agent-mode-btn').forEach(b => {
        b.classList.remove('active');
    });
    
    // Activate selected mode
    document.querySelector(`.agent-mode[data-mode="${mode}"]`)?.classList.add('active');
    document.querySelector(`.agent-mode-btn[data-mode="${mode}"]`)?.classList.add('active');
    
    LOG('AGENT', `Switched to mode: ${mode}`);
}

// ===== FAQ SEARCH EVENT HANDLERS =====

function setupFAQSearch() {
    const searchInput = document.getElementById('agent-faq-input');
    const searchButton = document.getElementById('agent-faq-submit');
    
    if (!searchInput || !searchButton) {
        LOG.error('AGENT', 'FAQ search elements not found');
        return;
    }
    
    const performSearch = () => {
        const query = searchInput.value.trim();
        if (!query) return;
        
        const results = searchFAQ(query);
        renderFAQResults(results);
        
        LOG('AGENT', `FAQ search: "${query}" - ${results.length} results`);
    };
    
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// ===== INITIALIZATION =====

async function initAgentExtensions() {
    LOG('AGENT', 'Initializing agent extensions...');
    
    // Load FAQ data
    await loadFAQ();
    
    // Setup event handlers
    setupModeSwitching();
    setupFAQSearch();
    setupFeedbackButtons();
    
    LOG.success('AGENT', 'Agent extensions initialized');
}

// Call this after agent initialization
// initAgentExtensions();
```

---

## Implementierungsschritte

### Phase 1: FAQ-JSON erstellen (1-2 Stunden)
1. Häufige Fragen sammeln
2. Antworten formulieren
3. Tags definieren
4. Verwandte Abschnitte verknüpfen
5. JSON-Datei erstellen und testen

### Phase 2: HTML & CSS (1-2 Stunden)
1. HTML-Struktur in Agent-Sidebar einfügen
2. CSS in `styles.css` (oder `agent.css`) einfügen
3. Mode-Selector hinzufügen
4. Visuelle Tests in allen Themes

### Phase 3: JavaScript-Integration (3-4 Stunden)
1. FAQ-Suche implementieren
2. Feedback-System einbauen
3. Mode-Switching programmieren
4. Event-Handler verbinden
5. Testing: Suche, Navigation, E-Mail

### Phase 4: Feintuning (1 Stunde)
1. Suchrelevanz optimieren
2. E-Mail-Templates verfeinern
3. UX-Tests durchführen

**Gesamt-Aufwand:** 6-8 Stunden

---

## Testing-Checkliste

### FAQ-System
- [ ] Suche findet relevante Ergebnisse
- [ ] Keine Ergebnisse zeigt Hinweis
- [ ] Navigation zu Abschnitten funktioniert
- [ ] Enter-Taste startet Suche
- [ ] Mobile-Ansicht funktioniert

### Feedback-System
- [ ] Alle 4 Buttons funktionieren
- [ ] E-Mail öffnet sich korrekt
- [ ] Subject ist korrekt
- [ ] Body-Template ist vollständig
- [ ] Browser-Info wird mitgesendet

### Mode-Switching
- [ ] Wechsel zwischen Modi funktioniert
- [ ] Nur ein Modus aktiv
- [ ] Active-State visuell korrekt
- [ ] FAQ-Daten werden nur einmal geladen

---

## Vorteile

✅ **Self-Service:** Nutzer finden Antworten selbst  
✅ **Intelligente Suche:** Keyword + Tag-Matching  
✅ **Direkter Kontakt:** Einfache Feedback-Möglichkeit  
✅ **Vorkonfiguriert:** E-Mail-Templates mit Kontext  
✅ **Integration:** Nahtlos in bestehenden Agenten  
✅ **Erweiterbar:** Neue FAQs einfach per JSON

---

## Erweiterungsmöglichkeiten (Optional)

### 1. FAQ-Kategorien-Filter
```javascript
function filterFAQsByCategory(category) {
    return faqData.faqs.filter(faq => faq.category === category);
}
```

### 2. FAQ-Statistiken
```javascript
function trackFAQUsage(faqId) {
    const stats = JSON.parse(localStorage.getItem('faq-stats') || '{}');
    stats[faqId] = (stats[faqId] || 0) + 1;
    localStorage.setItem('faq-stats', JSON.stringify(stats));
}
```

### 3. "War diese Antwort hilfreich?"
```html
<div class="faq-feedback">
    <p>War diese Antwort hilfreich?</p>
    <button class="faq-helpful-yes">👍 Ja</button>
    <button class="faq-helpful-no">👎 Nein</button>
</div>
```

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*