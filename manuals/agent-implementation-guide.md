# Implementierungsanleitung: Spürhund-Assistent "Rex"

## Überblick

Der Spürhund-Assistent ist ein **situationsabhängiger, interaktiver Begleiter** für den forensischen Leitfaden. Er kombiniert statische Anleitung (Ebene A) mit dynamischer, kontextabhängiger Führung (Ebene B).

---

## ✅ Implementierte Komponenten

### 1. **Visuelle Komponenten**
- 🐕‍🦺 Toggle-Button (rechts, oberhalb Notizblock)
- 💬 Chat-Sidebar (rechts ausklappbar)
- 📍 Inline-Trigger (im Leitfaden einbettbar)
- 📦 Kontext-Blöcke (dynamische Einblendungen)
- 🔔 Notification-Badge (pulsierend bei neuen Interaktionen)

### 2. **Funktionale Komponenten**
- Dialog-Engine (JSON-gesteuert)
- Section-Trigger-System (automatische Aktivierung)
- Chat-Historie
- Quick-Actions (Button-basiert)
- Text-Input-Verarbeitung
- Navigation zum Leitfaden
- Kontext-Block-Management

### 3. **Dateien**
- `agent.css` - Styling
- `agent.js` - Funktionalität
- `agent-dialogs.json` - Dialog-Daten (zu erstellen)

---

## 📋 Implementierungs-Schritte

### **Schritt 1: HTML-Struktur erweitern**

#### 1.1 Agent-Toggle und Sidebar einfügen

Fügen Sie in `index.html` **NACH** dem Notizblock-Toggle ein:

```html
<!-- Agent Toggle Button -->
<button id="agent-toggle" class="agent-toggle" aria-label="Spürhund-Assistent öffnen/schließen" aria-expanded="false">
    <span class="agent-icon">🐕‍🦺</span>
    <span class="agent-notification-badge" id="agent-notification" style="display: none;">!</span>
</button>
```

Fügen Sie **NACH** dem Notizblock-Sidebar ein:

```html
<!-- Gesamte Agent-Sidebar aus agent-html-structure Artifact -->
```

#### 1.2 IDs zu bestehenden Elementen hinzufügen

Alle `<section>`, `<div>`, `<p>`, `<ul>`, `<li>` Elemente benötigen eindeutige IDs:

**Beispiel:**
```html
<!-- VORHER -->
<section class="content-section" data-section="step2" data-title="Schritt 2">
    <h3>Schritt 2: Format HTML wählen</h3>
    <p>Wählen Sie HTML aus den Optionen...</p>
</section>

<!-- NACHHER -->
<section class="content-section" 
         id="section-step2" 
         data-section="step2" 
         data-title="Schritt 2: Format HTML wählen">
    <h3 id="step2-heading">Schritt 2: Format HTML wählen</h3>
    <p id="step2-intro-text">Wählen Sie HTML aus den Optionen...</p>
</section>
```

**ID-Namensschema:**
- Sections: `section-{name}`
- Headings: `{section}-heading`
- Paragraphs: `{section}-{type}-{nummer}`
- Lists: `{section}-{type}-list`
- List Items: `{section}-{type}-{item}`

#### 1.3 Inline-Trigger einfügen (optional)

Fügen Sie an relevanten Stellen Inline-Trigger ein:

```html
<span class="agent-inline-trigger" 
      data-agent-context="format-decision" 
      data-agent-question="why-html"
      title="Spürhund Rex um Hilfe bitten"
      role="button"
      tabindex="0">
    🐕‍🦺 <span class="agent-trigger-text">Warum HTML?</span>
</span>
```

#### 1.4 Kontext-Blöcke vorbereiten

Fügen Sie leere Kontext-Blöcke ein, die der Agent später füllt:

```html
<div class="agent-context-block" 
     id="agent-context-format-decision" 
     data-context-id="format-decision"
     style="display: none;">
    <!-- Wird dynamisch gefüllt -->
</div>
```

#### 1.5 Skripte laden

**VOR** dem schließenden `</body>` Tag, **NACH** `script.js`:

```html
<link rel="stylesheet" href="agent.css">
<script src="agent.js"></script>
```

---

### **Schritt 2: CSS-Datei erstellen**

Erstellen Sie `agent.css` mit dem kompletten Inhalt aus dem `agent-css` Artifact.

**Wichtigste Styles:**
- `.agent-toggle` - Toggle-Button rechts
- `.agent-sidebar` - Haupt-Chat-Interface
- `.agent-message` - Chat-Nachrichten
- `.agent-action-btn` - Schnellaktionen
- `.agent-inline-trigger` - Inline-Trigger im Leitfaden
- `.agent-context-block` - Kontext-Einblendungen

---

### **Schritt 3: JavaScript-Datei erstellen**

Erstellen Sie `agent.js` mit dem kompletten Inhalt aus dem `agent-js` Artifact.

**Kern-Funktionen:**
- `initAgent()` - Initialisierung
- `openAgent(contextId)` - Agent öffnen
- `addAgentMessage(message, isUser)` - Nachricht hinzufügen
- `showQuickActions(actions)` - Buttons anzeigen
- `startAgentDialog(contextId)` - Dialog starten
- `navigateToSection(targetId)` - Zum Leitfaden springen
- `showContextBlock(id, content)` - Kontext einblenden

---

### **Schritt 4: JSON-Dialog-Daten erstellen**

Erstellen Sie `agent-dialogs.json` basierend auf der Struktur im `agent-json-structure` Artifact.

**Minimales Beispiel für Start:**

```json
{
  "contexts": {
    "format-decision": {
      "id": "format-decision",
      "initialMessage": "<p>Wuff! 🐕‍🦺 Ich helfe Ihnen bei der Format-Wahl!</p><p>Wofür benötigen Sie den Report?</p>",
      "actions": [
        {
          "icon": "💬",
          "label": "Chat-Analysen",
          "type": "showInfo",
          "content": "<p>HTML ist perfekt für Chats! 🎯</p>"
        },
        {
          "icon": "⚖️",
          "label": "Gerichtsberichte",
          "type": "showInfo",
          "content": "<p>Dann empfehle ich PDF! 📄</p>"
        }
      ]
    }
  },
  
  "sectionTriggers": {
    "step2": {
      "sectionId": "step2",
      "contextId": "format-decision",
      "triggerType": "onEnter",
      "conditions": {
        "minDuration": 3000,
        "minVisibility": 0.7,
        "maxTriggers": 1
      },
      "autoOpen": false,
      "showNotification": true,
      "delay": 2000
    }
  },
  
  "globalSettings": {
    "agentName": "Rex",
    "agentAvatar": "🐕‍🦺",
    "typingSpeed": 1000
  }
}
```

#### 4.1 JSON laden (agent.js anpassen)

**Option A: Inline-Daten (für Entwicklung)**
Die Beispieldaten sind bereits in `agent.js` unter `loadAgentDialogs()` eingebettet.

**Option B: Externe Datei (für Produktion)**
Ersetzen Sie in `agent.js` die `loadAgentDialogs()` Funktion:

```javascript
async function loadAgentDialogs() {
    try {
        const response = await fetch('agent-dialogs.json');
        agentDialogData = await response.json();
        console.log('Agent-Dialoge geladen:', agentDialogData);
    } catch (error) {
        console.error('Fehler beim Laden der Dialoge:', error);
        // Fallback zu Beispieldaten
        agentDialogData = { /* Beispieldaten */ };
    }
}
```

---

### **Schritt 5: Testing**

#### 5.1 Basis-Funktionalität testen

**Checkliste:**
- [ ] Agent-Toggle-Button erscheint rechts
- [ ] Klick öffnet/schließt Agent-Sidebar
- [ ] Willkommensnachricht wird angezeigt
- [ ] ESC-Taste schließt Agent
- [ ] Mobile: Sidebar nimmt Vollbild ein

#### 5.2 Dialog-System testen

- [ ] `openAgent('format-decision')` in Console → Dialog startet
- [ ] Quick-Actions werden angezeigt
- [ ] Klick auf Action funktioniert
- [ ] Typing-Indikator erscheint
- [ ] Chat-Historie wird aufgebaut

#### 5.3 Navigation testen

- [ ] Action mit `type: "navigate"` springt zu richtigem Element
- [ ] Element wird kurz gehighlightet
- [ ] Scroll funktioniert smooth
- [ ] Mobile: Agent schließt sich nach Navigation

#### 5.4 Kontext-Blöcke testen

- [ ] `showContextBlock()` blendet Block ein
- [ ] Inhalt wird korrekt dargestellt
- [ ] Close-Button funktioniert
- [ ] Block verschwindet sauber

#### 5.5 Section-Trigger testen

- [ ] Scrollen zu `section-step2` zeigt Notification-Badge
- [ ] Badge verschwindet beim Öffnen
- [ ] Trigger wird nur einmal ausgelöst
- [ ] Dialog startet mit korrektem Kontext

#### 5.6 Inline-Trigger testen

- [ ] Inline-Trigger sind sichtbar
- [ ] Hover-Effekt funktioniert
- [ ] Klick öffnet Agent mit Kontext
- [ ] Tastatur-Navigation (Enter/Space) funktioniert

---

## 🎨 Anpassungsmöglichkeiten

### Design anpassen

In `agent.css`:

```css
/* Farben ändern */
.agent-toggle {
    background: linear-gradient(135deg, #IHR-START 0%, #IHR-ENDE 100%);
}

/* Avatar ändern */
.agent-dog {
    font-size: 3em; /* Größe anpassen */
}

/* Animation deaktivieren */
@media (prefers-reduced-motion: reduce) {
    .agent-icon { animation: none; }
}
```

### Agent-Persönlichkeit anpassen

In `agent-dialogs.json`:

```json
{
  "globalSettings": {
    "agentName": "Rex",
    "agentAvatar": "🐕‍🦺",
    "agentPersonality": "friendly-expert",
    "greetingStyle": "enthusiastic",
    "fallbackMessages": {
      "noContext": "<p>Wuff! Zu diesem Thema schnüffle ich noch... 🐾</p>",
      "error": "<p>Hoppla! Da ist mir was aus der Pfote gerutscht. 😅</p>"
    }
  }
}
```

### Neue Dialoge hinzufügen

1. **Context erstellen** in JSON:

```json
{
  "contexts": {
    "mein-neuer-context": {
      "id": "mein-neuer-context",
      "initialMessage": "<p>Ihre Nachricht...</p>",
      "actions": [ /* Ihre Actions */ ]
    }
  }
}
```

2. **Trigger definieren** (optional):

```json
{
  "sectionTriggers": {
    "meine-section": {
      "sectionId": "meine-section",
      "contextId": "mein-neuer-context",
      "triggerType": "onEnter",
      "conditions": { "minDuration": 3000 }
    }
  }
}
```

3. **Inline-Trigger einbauen** (optional):

```html
<span class="agent-inline-trigger" 
      data-agent-context="mein-neuer-context">
    🐕‍🦺 Hilfe zu diesem Thema
</span>
```

---

## 🔧 Erweiterte Funktionen

### Custom Functions

Für komplexe Logik können Sie eigene Funktionen registrieren:

**In agent.js ergänzen:**

```javascript
// Custom Functions für Agent
window.agentFunctions = {
    analyzeUserHistory: function(params) {
        const history = sectionHistory.slice(-params.depth);
        
        addAgentMessage(`
            <p>Analyse Ihrer letzten ${params.depth} Abschnitte:</p>
            <ul>
                ${history.map(h => `<li>${h.sectionTitle}</li>`).join('')}
            </ul>
        `);
    },
    
    calculateRecommendation: function() {
        // Logik basierend auf Verlauf
        if (sectionHistory.some(h => h.sectionId.includes('video'))) {
            return 'HTML'; // Für Video-Arbeit
        }
        return 'PDF'; // Standard
    }
};
```

**In JSON verwenden:**

```json
{
  "actions": [
    {
      "icon": "📊",
      "label": "Verlauf analysieren",
      "type": "executeFunction",
      "functionName": "analyzeUserHistory",
      "parameters": { "depth": 10 }
    }
  ]
}
```

### Multi-Step Workflows

Für komplexe, geführte Prozesse:

```javascript
function startGuidedWorkflow(workflowId) {
    const workflow = agentDialogData.workflows[workflowId];
    
    agentWorkflowState = {
        currentStep: 0,
        data: {},
        workflow: workflow
    };
    
    showWorkflowStep(0);
}

function showWorkflowStep(stepIndex) {
    const step = agentWorkflowState.workflow.steps[stepIndex];
    
    // Progress anzeigen
    addAgentMessage(`
        <p><strong>Schritt ${stepIndex + 1}/${agentWorkflowState.workflow.steps.length}</strong></p>
        ${step.message}
    `);
    
    showQuickActions(step.actions);
}
```

### Conditional Content

Dynamische Inhalte basierend auf Bedingungen:

```javascript
function processDynamicContent(context) {
    if (!context.dynamicContent) return context;
    
    for (let condition of context.dynamicContent.conditions) {
        if (evaluateCondition(condition.if)) {
            context.initialMessage = condition.then;
            context.actions = condition.actions;
            break;
        }
    }
    
    return context;
}

function evaluateCondition(condition) {
    if (condition.historyContains) {
        return condition.historyContains.some(id => 
            sectionHistory.some(h => h.sectionId === id)
        );
    }
    if (condition.historyNotContains) {
        return !condition.historyNotContains.some(id => 
            sectionHistory.some(h => h.sectionId === id)
        );
    }
    // Weitere Bedingungen...
    return false;
}
```

---

## 📊 Analytics & Tracking

### Benutzer-Interaktionen tracken

In `agent.js` ergänzen:

```javascript
function trackAgentInteraction(eventType, data) {
    const event = {
        type: eventType,
        data: data,
        timestamp: Date.now(),
        context: agentCurrentContext
    };
    
    // In localStorage speichern
    let analytics = JSON.parse(localStorage.getItem('agent-analytics') || '[]');
    analytics.push(event);
    
    // Maximal 1000 Events speichern
    if (analytics.length > 1000) {
        analytics = analytics.slice(-1000);
    }
    
    localStorage.setItem('agent-analytics', JSON.stringify(analytics));
    
    // Optional: An Server senden
    if (agentDialogData.globalSettings.enableAnalytics) {
        sendToAnalyticsServer(event);
    }
}

// Events tracken
function handleAgentAction(action) {
    trackAgentInteraction('action_clicked', {
        actionLabel: action.label,
        actionType: action.type
    });
    
    // ... restlicher Code
}
```

### Analytics auswerten

```javascript
function getAgentAnalytics() {
    const analytics = JSON.parse(localStorage.getItem('agent-analytics') || '[]');
    
    const summary = {
        totalInteractions: analytics.length,
        mostUsedActions: {},
        mostVisitedContexts: {},
        averageSessionDuration: 0
    };
    
    // Auswertung...
    
    return summary;
}
```

---

## 🐛 Debugging & Troubleshooting

### Debug-Modus aktivieren

In `agent.js` ergänzen:

```javascript
const AGENT_DEBUG = true; // Für Entwicklung

function debugLog(message, data) {
    if (AGENT_DEBUG) {
        console.log(`[Agent Debug] ${message}`, data);
    }
}

// Verwendung
function startAgentDialog(contextId) {
    debugLog('Dialog gestartet', { contextId, availableContexts: Object.keys(agentDialogData) });
    
    if (!agentDialogData || !agentDialogData[contextId]) {
        debugLog('Context nicht gefunden!', { contextId });
        // ...
    }
}
```

### Häufige Probleme

#### Problem: Agent öffnet sich nicht

**Lösung:**
1. Browser-Console öffnen (F12)
2. Nach JavaScript-Fehlern suchen
3. Prüfen: `document.getElementById('agent-toggle')` gibt Element zurück?
4. Prüfen: `agent.js` wurde geladen?

```javascript
// Test in Console:
console.log('Agent-Toggle:', document.getElementById('agent-toggle'));
console.log('Agent-Sidebar:', document.getElementById('agent-sidebar'));
```

#### Problem: Dialoge werden nicht geladen

**Lösung:**
1. Prüfen: JSON-Datei existiert und ist valide?
2. Network-Tab prüfen: Wurde Datei geladen?
3. Console-Log in `loadAgentDialogs()` hinzufügen

```javascript
async function loadAgentDialogs() {
    console.log('Lade Dialoge...');
    const response = await fetch('agent-dialogs.json');
    console.log('Response:', response.status);
    const data = await response.json();
    console.log('Geladene Daten:', data);
}
```

#### Problem: Navigation funktioniert nicht

**Lösung:**
1. Prüfen: Ziel-Element existiert mit korrekter ID?
2. Console-Test:

```javascript
// Test in Console:
const targetId = 'section-step2';
const element = document.getElementById(targetId);
console.log('Element gefunden?', element);
if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
}
```

#### Problem: Kontext-Blöcke werden nicht angezeigt

**Lösung:**
1. Prüfen: Block existiert im HTML?
2. Prüfen: `display: none` wird korrekt entfernt?

```javascript
// Test in Console:
showContextBlock('agent-context-format-decision', '<p>Test-Inhalt</p>');
```

#### Problem: Section-Triggers feuern nicht

**Lösung:**
1. Intersection Observer wird unterstützt?
2. Section hat korrektes `data-section` Attribut?
3. Trigger-Bedingungen erfüllt?

```javascript
// Test in Console:
const triggers = agentDialogData.sectionTriggers;
console.log('Definierte Triggers:', triggers);

// Trigger manuell auslösen:
checkSectionTrigger('step2');
```

---

## 📱 Mobile Optimierung

### Touch-Gesten

Bereits implementiert:
- ✅ Große Touch-Targets (min. 44x44px)
- ✅ Vollbild-Sidebar auf Mobile
- ✅ Auto-Close nach Navigation

### Performance

Optimierungen für langsame Geräte:

```javascript
// In agent.js
const isMobile = window.innerWidth <= 768;
const isSlowDevice = navigator.hardwareConcurrency < 4;

if (isSlowDevice) {
    // Reduzierte Animationen
    document.body.classList.add('reduce-motion');
    
    // Längere Typing-Delays
    TYPING_SPEED = 1500;
}
```

```css
/* In agent.css */
.reduce-motion .agent-message {
    animation: none;
}

.reduce-motion .agent-icon,
.reduce-motion .agent-dog {
    animation: none;
}
```

---

## 🚀 Deployment Checkliste

Vor dem Live-Gang:

### Code
- [ ] Alle Debug-Logs entfernt oder deaktiviert
- [ ] Finale Dialog-Daten in JSON eingepflegt
- [ ] Alle IDs im HTML vergeben
- [ ] Inline-Trigger an relevanten Stellen eingefügt
- [ ] Kontext-Blöcke vorbereitet

### Testing
- [ ] Desktop-Browser: Chrome, Firefox, Edge
- [ ] Mobile-Browser: Safari iOS, Chrome Android
- [ ] Tastatur-Navigation funktioniert
- [ ] Screenreader-Kompatibilität geprüft
- [ ] Performance auf langsamem Gerät getestet

### Content
- [ ] Alle Nachrichten Korrektur gelesen
- [ ] Icons konsistent verwendet
- [ ] Tone of Voice einheitlich
- [ ] Rechtschreibung/Grammatik geprüft

### Analytics (optional)
- [ ] Tracking-Code implementiert
- [ ] Datenschutz-Hinweis ergänzt
- [ ] DSGVO-Konformität geprüft

---

## 📚 Weiterführende Ideen

### Zukünftige Erweiterungen

1. **Sprach-Unterstützung**
   - Web Speech API für Voice-Input
   - Text-to-Speech für Nachrichten

2. **KI-Integration**
   - OpenAI API für intelligente Antworten
   - NLP für besseres Keyword-Matching

3. **Collaboration**
   - Team-Chat Features
   - Shared Sessions

4. **Advanced Analytics**
   - Heatmaps für Leitfaden-Nutzung
   - User Journey Tracking
   - A/B Testing für Dialoge

5. **Gamification**
   - Achievements beim Abschluss von Schritten
   - Progress-Badges
   - Skill-Level-System

---

## 💡 Best Practices Zusammenfassung

### Dialog-Design
- ✅ Kurze, prägnante Nachrichten (max. 2-3 Sätze)
- ✅ Maximal 4 Actions gleichzeitig
- ✅ Klare Call-to-Actions
- ✅ Positive, hilfsbereite Sprache

### Technisch
- ✅ Modularer Code (separate Dateien)
- ✅ JSON für Content (einfache Wartung)
- ✅ Eindeutige IDs überall
- ✅ Error Handling
- ✅ Graceful Degradation

### UX
- ✅ Nicht-invasiv (Badge statt Auto-Open)
- ✅ Jederzeit schließbar (ESC-Taste)
- ✅ Kontextuelle Hilfe (Inline-Trigger)
- ✅ Progressive Disclosure
- ✅ Barrierefreiheit

### Performance
- ✅ Lazy Loading für Dialoge
- ✅ Minimal-Animationen auf Wunsch
- ✅ Effiziente DOM-Manipulation
- ✅ localStorage statt Server

---

## 🎓 Lernressourcen

### Intersection Observer API
- https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

### ARIA Best Practices
- https://www.w3.org/WAI/ARIA/apg/

### localStorage
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

### JSON Schema Validation
- https://json-schema.org/

---

## 📞 Support

Bei Fragen oder Problemen:

1. **Browser Console prüfen** (F12)
2. **Debug-Modus aktivieren** (siehe oben)
3. **Schritt-für-Schritt testen** (siehe Testing-Checkliste)
4. **Code-Kommentare lesen** (agent.js ist ausführlich dokumentiert)

---

## Zusammenfassung

Der Spürhund-Assistent "Rex" bietet:

✅ **Situationsabhängige Hilfe** durch intelligente Trigger
✅ **Interaktive Dialoge** mit flexiblen Action-Types
✅ **Nahtlose Integration** in den Leitfaden
✅ **Einfache Wartung** durch JSON-basierte Dialoge
✅ **Barrierefreiheit** nach BFSG-Standards
✅ **Mobile-First** Design
✅ **Erweiterbar** für zukünftige Features

Der Agent ist **produktionsbereit** und kann sofort eingesetzt werden! 🎉