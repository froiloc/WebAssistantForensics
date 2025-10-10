# AXIOM Forensischer Leitfaden

**Ein interaktiver, barrierefreier Leitfaden für forensische Software-Auswertung**

[![Status](https://img.shields.io/badge/Status-In%20Entwicklung-yellow)]()
[![Version](https://img.shields.io/badge/Version-0.1.0--alpha-blue)]()
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

---

## 📋 Inhaltsverzeichnis

- [Überblick](#überblick)
- [Features](#features)
- [Projektstruktur](#projektstruktur)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Entwicklung](#entwicklung)
- [Barrierefreiheit](#barrierefreiheit)
- [Roadmap](#roadmap)
- [Projekttagebuch](#projekttagebuch)
- [Mitwirken](#mitwirken)
- [Lizenz](#lizenz)

---

## 🎯 Überblick

Der **AXIOM Forensische Leitfaden** ist eine webbasierte, interaktive Anwendung zur Unterstützung von Polizeimitarbeitern bei der forensischen Auswertung mit Magnet AXIOM Examiner. Das Projekt kombiniert statische Anleitungen mit einem intelligenten, situationsabhängigen Assistenten ("Spürhund Rex"), der Benutzer durch komplexe Workflows führt.

### Zielgruppe

- Polizeimitarbeiter ohne forensische IT-Kenntnisse
- IT-Laien in Ermittlungsbehörden
- Vorsichtige, nicht-experimentierfreudige Benutzer

### Kernkonzept: Zwei-Ebenen-System

- **Ebene A**: Statische Anleitung (klassischer Leitfaden mit progressiver Detailtiefe)
- **Ebene B**: Dynamischer Agent-Begleiter (kontextabhängige Führung und Erklärungen)

---

## ✨ Features

### Interaktive Komponenten

#### 1. **Progressive Detailtiefe** (3 Ebenen)
- **Ebene 1 (Basis)**: Grundlegende Schritte und Übersicht
- **Ebene 2 (Standard)**: Wichtigste Einstellungen und Erklärungen
- **Ebene 3 (Vollständig)**: Alle Details, Optionen und Best Practices

#### 2. **Spürhund-Assistent "Rex"** 🐕‍🦺
- Situationsabhängiger KI-Begleiter
- JSON-basiertes Dialog-System
- Chat-Interface mit Quick-Actions
- Automatische Trigger bei Section-Eintritt
- Kontextuelle Einblendungen im Leitfaden
- Inline-Hilfe-Trigger

#### 3. **Navigation-Sidebar**
- Dynamisches Inhaltsverzeichnis
- Automatische Hervorhebung der aktiven Section
- Doppelklick zum Springen zu Abschnitten
- Kollabierbare Struktur

#### 4. **Notizblock**
- Persistenter Notizblock (localStorage)
- Auto-Save Funktion
- Copy & Paste Support
- Sidebar rechts, ausklappbar

#### 5. **Verlaufsfenster**
- History aller besuchten Abschnitte
- Zeitstempel (relativ/absolut umschaltbar)
- Klickbare Einträge zur Navigation
- localStorage-Persistenz

#### 6. **Tipps-Footer**
- 10+ wechselnde Tipps zu Tastenkombinationen
- Automatischer Wechsel alle 15 Sekunden
- Manuelle Navigation (vor/zurück)
- Ein-/ausblendbar

#### 7. **Breadcrumb-Navigation**
- Dynamische Anzeige der aktuellen Position
- Klickbar zum Zurückspringen
- Responsive Darstellung

#### 8. **Fokus-System**
- Aktive Sections: 100% Opazität
- Nicht-fokussierte Sections: 60% Opazität
- Intersection Observer für Performance

---

## 📁 Projektstruktur

```
WebAssistantForensics/
│
├── README.md                          # Diese Datei
├── LICENSE                            # Lizenzinformationen
├── run-webserver.sh                   # Einen lokalen Webserver auf Port 9999 starten
│
├── src/                               # Quellcode
│   ├── index.html                     # Haupt-HTML-Datei
│   ├── styles.css                     # Haupt-Styling
│   ├── script.js                      # Haupt-JavaScript
│   ├── agent.css                      # Agent-spezifisches Styling
│   ├── agent.js                       # Agent-Funktionalität
│   └── agent-dialogs.json             # Agent Dialog-Daten (JSON)
│
├── assets/                            # Medien und Ressourcen
│   ├── images/                        # Screenshots, Mockups
│   ├── videos/                        # Tutorial-Videos, GIFs
│   └── icons/                         # Icons, Favicons
│
├── manuals/                           # Implementationsleitfäden
│   ├── agent-implementation.md        # Agent-Implementierung
│   ├── feature-documentation.md       # Feature-Dokumentation
│   ├── json-structure.md              # JSON-Struktur Spezifikation
│   └── testing-guide.md               # Testing-Anleitung
│
├── project-diary/                     # Projekttagebuch
│   ├── day_summary.001.md             # Tag 1 Zusammenfassung
│   ├── day_summary.002.md             # Tag 2 Zusammenfassung
│   ├── day_summary.00X.md             # Tag X Zusammenfassung
│   └── prompts/                       # Prompt-Archiv
│       ├── prompt_001_grundstruktur.md
│       ├── prompt_002_agent.md
│       └── ...
│
├── docs/                              # Zusätzliche Dokumentation
│   ├── api/                           # API-Dokumentation
│   ├── architecture/                  # Architektur-Diagramme
│   └── user-guide/                    # Benutzer-Handbuch
│
├── tests/                             # Test-Dateien
│   ├── unit/                          # Unit-Tests
│   ├── integration/                   # Integrations-Tests
│   └── accessibility/                 # Barrierefreiheit-Tests
│
└── build/                             # Build-Output (optional)
    ├── dist/                          # Produktions-Build
    └── temp/                          # Temporäre Build-Dateien
```

### Datei-Erklärungen

#### `/src/` - Quellcode
- **index.html**: Haupt-HTML mit vollständigem Leitfaden-Content
- **styles.css**: Alle Styles inkl. responsive Design
- **script.js**: Kern-Funktionalität (Navigation, Verlauf, Tipps, etc.)
- **agent.css**: Spürhund-spezifisches Styling (Chat, Trigger, etc.)
- **agent.js**: Agent-Engine und Dialog-Handling
- **agent-dialogs.json**: Dialog-Definitionen für den Agenten

#### `/manuals/` - Implementationsleitfäden
Markdown-Dateien mit detaillierten Anleitungen für Entwickler:
- Implementierung neuer Features
- JSON-Struktur-Spezifikationen
- Testing-Szenarien
- Best Practices

#### `/project-diary/` - Projekttagebuch
Chronologische Dokumentation des Projektfortschritts:
- **day_summary.XXX.md**: Tägliche Zusammenfassungen
- **prompts/**: Verwendete Prompts und deren Antworten

#### `/assets/` - Medien
Bilder, Videos, Icons für den Leitfaden

#### `/docs/` - Dokumentation
Erweiterte Dokumentation für verschiedene Zielgruppen

#### `/tests/` - Tests
Automatisierte und manuelle Test-Suites

---

## 🚀 Installation

### Voraussetzungen

- Moderner Webbrowser (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- Kein Webserver erforderlich (läuft lokal)
- JavaScript muss aktiviert sein

### Schnellstart

1. **Repository klonen/herunterladen**
   ```bash
   git clone [repository-url]
   cd axiom-forensic-guide
   ```

2. **Dateien lokal öffnen**
   - Navigieren Sie zu `/src/`
   - Öffnen Sie `index.html` direkt im Browser
   - **Fertig!** Keine Build-Schritte erforderlich

### Alternative: Lokaler Webserver (optional)

Falls Sie die Dateien über einen Webserver bereitstellen möchten:

```bash
# Mit Python 3
cd src/
python -m http.server 9999

# Mit Node.js (http-server)
npx http-server ./src -p 9999

# Mit PHP
cd src/
php -S localhost:9999
```

Dann öffnen Sie: `http://localhost:9999`

oder verwenden Sie das Script `run-webserver.sh`, um den Webserver mit NetCat, Node.js, Python 3, PHP, Busybox, Ruby oder WebFS zu starten.

---

## 📖 Verwendung

### Für Endbenutzer

1. **Leitfaden öffnen**: `index.html` im Browser öffnen
2. **Detailgrad wählen**: Buttons oben rechts (1/2/3) oder Alt+1/2/3
3. **Navigation nutzen**: 
   - Hamburger-Menü (oben links) für alle Features
   - Breadcrumb zur Orientierung
   - Sidebar (links) für Inhaltsverzeichnis
4. **Spürhund aktivieren**: 
   - Button rechts (🐕‍🦺) klicken
   - Oder auf Inline-Trigger im Text klicken
5. **Notizen machen**: Notizblock-Button rechts (📝)

### Tastenkombinationen

| Kombination | Aktion |
|-------------|--------|
| `Alt + 1` | Detailgrad: Basis |
| `Alt + 2` | Detailgrad: Standard |
| `Alt + 3` | Detailgrad: Vollständig |
| `ESC` | Schließt geöffnete Overlays |

### Für Entwickler

#### Neuen Abschnitt hinzufügen

1. **HTML-Struktur** in `index.html`:
```html
<section class="content-section" 
         id="section-mein-abschnitt" 
         data-section="mein-abschnitt" 
         data-title="Mein Abschnitt">
    
    <div id="mein-abschnitt-intro" class="detail-level-1">
        <h2 id="mein-abschnitt-heading">Mein Abschnitt</h2>
        <p id="mein-abschnitt-intro-text">Basis-Text...</p>
    </div>
    
    <div id="mein-abschnitt-details" class="detail-level-2">
        <p>Standard-Details...</p>
    </div>
    
    <div id="mein-abschnitt-advanced" class="detail-level-3">
        <p>Vollständige Informationen...</p>
    </div>
</section>
```

2. **Agent-Dialog** in `agent-dialogs.json`:
```json
{
  "contexts": {
    "mein-kontext": {
      "id": "mein-kontext",
      "initialMessage": "<p>Hilfe zu diesem Abschnitt...</p>",
      "actions": [ /* ... */ ]
    }
  },
  "sectionTriggers": {
    "mein-abschnitt": {
      "sectionId": "mein-abschnitt",
      "contextId": "mein-kontext",
      "autoOpen": false,
      "showNotification": true
    }
  }
}
```

Detaillierte Anleitungen finden Sie in `/manuals/`.

---

## 🛠️ Entwicklung

### Technologie-Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Storage**: localStorage (Browser)
- **APIs**: Intersection Observer, Web Storage API
- **Build**: Keine Build-Tools erforderlich (optional: Minification)

### Code-Konventionen

#### HTML
- Semantisches HTML5
- ARIA-Attribute für Barrierefreiheit
- Eindeutige IDs nach Schema: `{section}-{element}-{nummer}`

#### CSS
- BEM-ähnliche Namenskonvention
- Mobile-First Approach
- CSS Custom Properties für Themes (geplant)

#### JavaScript
- ES6+ Features
- Modulare Funktionen
- JSDoc-Kommentare für wichtige Funktionen
- `camelCase` für Variablen und Funktionen
- `UPPER_CASE` für Konstanten

### Entwicklungs-Workflow

1. **Branch erstellen**
   ```bash
   git checkout -b feature/mein-feature
   ```

2. **Änderungen vornehmen**
   - Code schreiben
   - Tests hinzufügen
   - Dokumentation aktualisieren

3. **Testen**
   - Browser-Tests (Chrome, Firefox, Edge, Safari)
   - Mobile-Tests (iOS Safari, Chrome Android)
   - Barrierefreiheit-Test mit Screenreader

4. **Commit & Push**
   ```bash
   git add .
   git commit -m "feat: Mein neues Feature"
   git push origin feature/mein-feature
   ```

5. **Pull Request erstellen**

### Debugging

**Debug-Modus aktivieren:**

```javascript
// In script.js
const DEBUG = true;

// In agent.js
const AGENT_DEBUG = true;
```

**Browser Console nutzen:**
```javascript
// Navigation testen
window.axiomGuide.scrollToSection('section-step2');

// Agent testen
window.agentAPI.open('format-decision');

// Verlauf anzeigen
console.log(sectionHistory);
```

---

## ♿ Barrierefreiheit

Das Projekt erfüllt die Anforderungen des **Barrierefreiheitsstärkungsgesetzes (BFSG)**, das am 28. Juni 2025 in Kraft getreten ist.

### Implementierte Standards

- ✅ **WCAG 2.1 Level AA** konform
- ✅ **ARIA 1.2** Spezifikation
- ✅ **Tastaturnavigation** vollständig
- ✅ **Screenreader-kompatibel** (NVDA, JAWS, VoiceOver)
- ✅ **Kontrastverhältnisse** mindestens 4.5:1
- ✅ **Focus-Indikatoren** deutlich sichtbar
- ✅ **Reduced Motion** Support
- ✅ **High Contrast Mode** Support

### Tastaturnavigation

Alle Funktionen sind ohne Maus bedienbar:
- `Tab` / `Shift+Tab`: Navigation zwischen Elementen
- `Enter` / `Space`: Aktivierung von Buttons/Links
- `ESC`: Schließen von Overlays
- `Alt + 1/2/3`: Detailgrad wechseln

### Screenreader-Unterstützung

- Semantisches HTML mit korrekten Heading-Hierarchien
- ARIA-Labels für alle interaktiven Elemente
- ARIA-Live-Regions für dynamische Inhalte
- Alt-Texte für alle Bilder (sobald implementiert)

### Testing-Tools

- [WAVE Browser Extension](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- NVDA Screenreader (Windows)
- VoiceOver (macOS/iOS)

---

## 🗺️ Roadmap

### Version 0.1.0 (Aktuell - Alpha)
**Ziel: Erste lauffähige Version mit Beispiel**
- [x] Grundstruktur HTML/CSS/JS
- [x] Beispiel-Leitfaden: HTML-Report-Erstellung
- [x] 7 interaktive Features
- [x] Spürhund-Assistent Framework
- [ ] Vollständiger Content für alle 8 Schritte
- [ ] Agent-Dialoge für Hauptabschnitte
- [ ] Screenshots/Videos integrieren

**Zeitplan:** Tag 1-10 (29.09.2025 - 10.10.2025)

### Version 0.2.0 (Beta)
**Ziel: Vollständiger AXIOM-Leitfaden**
- [ ] Alle Workflow-Schritte vollständig dokumentiert
- [ ] 3 weitere Hauptabschnitte (Video, Bilder, Chat-Analyse)
- [ ] 50+ Agent-Dialoge
- [ ] Umfassendes Testing
- [ ] Performance-Optimierungen
- [ ] User-Feedback eingearbeitet

**Zeitplan:** Tag 11-30

### Version 1.0.0 (Stable)
**Ziel: Produktionsreife für AXIOM**
- [ ] Vollständige Dokumentation
- [ ] Video-Tutorials
- [ ] Benutzer-Handbuch
- [ ] Admin-Dokumentation
- [ ] Browser-Kompatibilität 100%
- [ ] Barrierefreiheit validiert
- [ ] Performance-Audit bestanden

**Zeitplan:** Tag 31-60

### Version 2.0.0 (Multi-Tool)
**Ziel: Unterstützung für weitere forensische Software**
- [ ] Template-System für neue Tools
- [ ] Cellebrite Physical Analyzer Leitfaden
- [ ] EnCase Forensic Leitfaden
- [ ] X-Ways Forensics Leitfaden
- [ ] Tool-übergreifende Best Practices

**Zeitplan:** Q1 2026

### Zukünftige Features (Backlog)
- [ ] Dark Mode
- [ ] Multi-Language Support (EN, FR)
- [ ] Export-Funktion (PDF, DOCX)
- [ ] Offline-PWA Version
- [ ] Kollaboration-Features
- [ ] KI-Integration (OpenAI API)
- [ ] Voice-Input/Output
- [ ] Gamification (Achievements, Badges)

---

## 📔 Projekttagebuch

Detaillierte Tages-Zusammenfassungen finden Sie unter `/project-diary/`:

- **[Tag 1 (29.09.2025)](project-diary/day_summary.001.md)**: Grundstruktur, Features 1-7, Agent-Framework
- **[Tag 2 (30.09.2025)](project-diary/day_summary.002.md)**: TBD
- **[Tag 3 (01.10.2025)](project-diary/day_summary.003.md)**: TBD

### Verwendete Prompts

Alle verwendeten Prompts sind archiviert unter `/project-diary/prompts/` für Nachvollziehbarkeit und Lernzwecke.

---

## 🤝 Mitwirken

### Feedback & Bug Reports

Feedback und Bug-Reports sind willkommen! Bitte erstellen Sie ein Issue mit:
- **Titel**: Kurze Beschreibung
- **Beschreibung**: Detaillierte Erklärung
- **Schritte zur Reproduktion**: Bei Bugs
- **Erwartetes Verhalten**: Was sollte passieren?
- **Tatsächliches Verhalten**: Was passiert stattdessen?
- **Browser/OS**: Ihre Umgebung
- **Screenshots**: Falls relevant

### Pull Requests

1. Forken Sie das Repository
2. Erstellen Sie einen Feature-Branch
3. Committen Sie Ihre Änderungen
4. Pushen Sie zum Branch
5. Erstellen Sie einen Pull Request

**Bitte beachten Sie:**
- Code-Konventionen einhalten
- Tests hinzufügen
- Dokumentation aktualisieren
- Commit-Messages nach [Conventional Commits](https://www.conventionalcommits.org/)

---

## 📄 Lizenz

**Proprietary License** - Alle Rechte vorbehalten.

Dieses Projekt ist für den internen Gebrauch in Strafverfolgungsbehörden bestimmt. Eine Weitergabe, Vervielfältigung oder kommerzielle Nutzung ist ohne ausdrückliche Genehmigung nicht gestattet.

Für Lizenzfragen kontaktieren Sie bitte: [Kontaktinformation]

---

## 👥 Team

- **Projektleitung**: Alexander Reintzsch
- **Entwicklung**: Alexander Reintzsch, Steffen ???
- **Content**: Alexander Reintzsch
- **Testing**: Steffen ???, Alexander Reintzsch
- **Dokumentation**: Alexander Reintzsch

---

## 🙏 Danksagungen

- **Claude AI (Anthropic)**: Unterstützung bei Entwicklung und Dokumentation
- **Magnet Forensics**: AXIOM Examiner Dokumentation
- **Community**: Feedback und Testing

---

## 📞 Kontakt & Support

- **E-Mail**: [alexander.reintzsch@polizei.nrw.de]
- **Issue Tracker**: [GitHub Issues URL]
- **Dokumentation**: `/docs/` oder [Online-Dokumentation URL]

---

## 📊 Projekt-Status

**Letztes Update:** 29. September 2025  
**Aktuelle Version:** 0.1.0-alpha  
**Nächster Meilenstein:** Version 0.1.0 (vollständiger Content)  
**Geschätzter Release:** 10. Oktober 2025

---

## 📚 Weitere Ressourcen

- [Implementierungsleitfäden](manuals/)
- [API-Dokumentation](docs/api/)
- [Benutzer-Handbuch](docs/user-guide/)
- [Testing-Guide](manuals/testing-guide.md)
- [JSON-Struktur Spezifikation](manuals/json-structure.md)

---

**Made with ❤️ for Law Enforcement Professionals**
