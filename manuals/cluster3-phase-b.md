# Cluster 3 - Phase B: HTML-Syntax & Attribut-Vollständigkeit

**Projekt:** WebAssistantForensics  
**Version:** 1.0.0  
**Datum:** 2025-10-09  
**Status:** ✅ Abgeschlossen  

---

## Executive Summary

Dieses Dokument definiert die **vollständige HTML-Syntax-Spezifikation** für die Content-Generierung durch KI (Claude Sonnet 4.5). Es legt fest:

- **HTML-Element-Whitelist** (erlaubte Tags)
- **Pflicht-/Optional-Attribute** pro Element
- **CSS-Klassen-System** (Pflicht-Klassen, optionale Klassen)
- **Attribut-Reihenfolge & Formatierung**
- **JSON-LD Metadaten** (finalisiert)
- **Agent-Context-Block** (vollständige Spezifikation)
- **HTML-Kommentar-Konventionen**
- **Content-Type-Box-Entscheidungsmatrix**

**Zielgruppe:** KI-Systeme zur Content-Generierung, Maintainer, Python-Validator-Entwickler

**Beziehung zu anderen Dokumenten:**
- **Cluster 1:** Inhaltliche Anforderungen (Zielgruppe, Detail-Level, Medien)
- **Cluster 2:** Strukturelle Anforderungen (Hierarchie, data-ref, Navigation)
- **Cluster 3-A:** BFSG-Barrierefreiheit (Sprachauszeichnung, Alt-Texte, Überschriften)
- **Cluster 3-B:** HTML-Syntax (DIESES DOKUMENT)

---

## 1. Übersicht & Zielsetzung

### 1.1 Scope des Dokuments

Dieses Dokument definiert die **technischen Anforderungen** an HTML-Code, der von der KI generiert wird. Es ergänzt die inhaltlichen (Cluster 1) und strukturellen (Cluster 2) Anforderungen um die **konkrete Syntax-Ebene**.

**Was wird definiert:**
- Erlaubte HTML-Elemente
- Pflicht- und Optional-Attribute
- CSS-Klassen-Zuordnung
- Formatierungsrichtlinien
- Validierungsregeln

**Was wird NICHT definiert:**
- Inhaltliche Qualität (siehe Cluster 1)
- Logische Struktur (siehe Cluster 2)
- JavaScript-Funktionalität (außerhalb Scope)

### 1.2 Validierungsstrategie

**Drei Validierungsebenen:**

1. **JSON-Schema** (`main-content.schema.json`)
   - Validiert Metadaten-Struktur
   - Prüft Datentypen, Enums

2. **Python-Validator** (`validate_html_structure.py`)
   - Prüft HTML-Syntax
   - Prüft Attribut-Vollständigkeit
   - Prüft CSS-Klassen
   - Prüft BFSG-Konformität

3. **Manuelle Review** (Maintainer)
   - Inhaltliche Korrektheit
   - Fachliche Richtigkeit
   - Edge Cases

---

## 2. HTML-Element-Whitelist

### 2.1 Erlaubte Elemente (vollständig)

| Kategorie | Elemente |
|-----------|----------|
| **Strukturelemente** | `<article>`, `<section>`, `<div>`, `<aside>` |
| **Überschriften** | `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` |
| **Text & Formatierung** | `<p>`, `<span>`, `<strong>`, `<em>` |
| **Listen** | `<ul>`, `<ol>`, `<li>` |
| **Tabellen** | `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>` |
| **Medien** | `<img>`, `<video>`, `<audio>`, `<figure>`, `<figcaption>` |
| **Code & Spezialtags** | `<code>`, `<pre>`, `<kbd>`, `<abbr>` |
| **Interaktiv** | `<button>`, `<a>` |
| **Meta** | `<script type="application/ld+json">` |

**Gesamt: 32 erlaubte Elemente**

### 2.2 Ausgeschlossene Elemente (mit Begründung)

| Element | Begründung |
|---------|------------|
| `<label>`, `<input>`, `<textarea>`, `<select>` | Formulare derzeit nicht vorgesehen |
| `<dl>`, `<dt>`, `<dd>` | Reserviert für zukünftige Glossar-Erweiterung |
| `<b>`, `<i>`, `<u>` | Nicht semantisch, verwende stattdessen `<strong>`, `<em>` |
| `<div>` innerhalb `<section>` mit `<article>` | `<article>` nicht in `<section>` erlaubt |
| Alle anderen HTML5-Elemente | Nicht benötigt für aktuellen Scope |

---

## 3. Element-Spezifikationen

### 3.1 Strukturelemente

#### `<article>` (Level 1: Topic)

**Verwendung:** Oberste Hierarchie-Ebene (Topic)

**Pflicht-Attribute:**
- `class="content-topic"`
- `id="topic-{name}"` (Pattern: `^topic-[a-z0-9-]+$`)
- `data-level="1"`
- `data-title="..."` (für Navigation)

**Optional-Attribute:**
- `data-ref="..."` (für Agent-Referenzierung)

**NICHT erlaubt:**
- `<article>` innerhalb `<section>`

**Beispiel:**
```html
<article class="content-topic" 
         id="topic-preparation" 
         data-level="1"
         data-title="Vorbereitung"
         data-ref="topic-preparation">
    
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "identifier": "preparation",
        "name": "Vorbereitung"
    }
    </script>
    
    <!-- Content hier -->
    
</article>
```

---

#### `<section>` (Level 2: Chapter, Level 3+: Section)

**Verwendung:** Kapitel (Level 2) oder Sections (Level 3+)

**Pflicht-Attribute:**
- `class` (abhängig von Level):
  - Level 2: `class="content-chapter"`
  - Level 3+: `class="content-section"`
- `id="section-{name}"` (Pattern: `^section-[a-z0-9-]+$`)
- `data-section="{name}"` (Kurzform, muss zu `id` passen: `id="section-" + data-section`)
- `data-level="{number}"` (1-5)
- `data-title="..."` (für Navigation)

**Optional-Attribute:**
- `data-parent="{parent-id}"` (empfohlen ab Level 3)
- `data-ref="..."` (für Agent-Referenzierung)

**Pflicht-Kinder:**
- JSON-LD Metadaten (am Anfang)
- Agent-Context-Block (am Ende)

**Beispiel Level 2 (Chapter):**
```html
<section class="content-chapter" 
         id="section-templates" 
         data-section="templates"
         data-level="2"
         data-parent="topic-preparation"
         data-title="Template-Auswahl">
    
    <script type="application/ld+json" class="section-metadata">
    { ... }
    </script>
    
    <h2 data-ref="templates-heading">Template-Auswahl</h2>
    
    <!-- Content -->
    
    <div class="agent-context-block"
         data-ref="agent-context-templates"
         data-context-id="templates-context"
         style="display: none;">
        <!-- Dynamisch vom Agent gefüllt -->
    </div>
</section>
```

**Beispiel Level 3 (Section):**
```html
<section class="content-section" 
         id="section-template-types" 
         data-section="template-types"
         data-level="3"
         data-parent="section-templates"
         data-title="Template-Typen im Detail">
    
    <script type="application/ld+json" class="section-metadata">
    { ... }
    </script>
    
    <h3 data-ref="template-types-heading">Template-Typen im Detail</h3>
    
    <!-- Content -->
    
    <div class="agent-context-block"
         data-ref="agent-context-template-types"
         data-context-id="template-types-context"
         style="display: none;">
        <!-- Dynamisch vom Agent gefüllt -->
    </div>
</section>
```

---

#### `<div>` (Allgemeiner Container)

**Verwendung:** 
- Detail-Level-Container
- Content-Type-Container
- Agent-Context-Block

**Pflicht-Attribute (abhängig von Verwendung):**

**Detail-Level-Container:**
- `class="detail-level-1/2/3"`
- `data-ref="..."`

**Agent-Context-Block:**
- `class="agent-context-block"`
- `data-ref="agent-context-{section-name}"`
- `data-context-id="{section-name}-context"`
- `style="display: none;"`

**Optional-Attribute:**
- `data-content-type="..."` (bei Content-Klassifikation)

**Beispiel Detail-Level:**
```html
<div class="detail-level-2" 
     data-ref="export-advanced">
    <h4 data-ref="export-advanced-heading">Erweiterte Optionen</h4>
    <p data-ref="export-advanced-text">...</p>
</div>
```

**Beispiel Agent-Context-Block:**
```html
<div class="agent-context-block"
     data-ref="agent-context-export"
     data-context-id="export-context"
     style="display: none;">
    <!-- Dynamisch vom Agent gefüllt -->
</div>
```

---

#### `<aside>` (Info-Boxen)

**Verwendung:** Hervorgehobene Hinweise (info, hint, attention, warning)

**Pflicht-Attribute:**
- `data-content-type` (Werte: `"info"`, `"hint"`, `"attention"`, `"warning"`)
- `class` (abhängig von `data-content-type`):
  - `data-content-type="info"` → `class="info-box"`
  - `data-content-type="hint"` → `class="hint-box"`
  - `data-content-type="attention"` → `class="attention-box"`
  - `data-content-type="warning"` → `class="warning-box"`

**Optional-Attribute:**
- `data-ref="..."`

**Beispiel:**
```html
<aside class="info-box" 
       data-content-type="info"
       data-ref="export-info">
    ℹ️ AXIOM Examiner speichert Reports standardmäßig im Projektordner.
</aside>

<aside class="hint-box" 
       data-content-type="hint"
       data-ref="export-hint">
    💡 Tipp: Nutze Template-Variablen für wiederkehrende Metadaten.
</aside>

<aside class="attention-box" 
       data-content-type="attention"
       data-ref="export-attention">
    ⚠️ Achtung: HTML-Reports können bei großen Datenmengen langsam laden.
</aside>

<aside class="warning-box" 
       data-content-type="warning"
       data-ref="export-warning">
    🚨 Warnung: Ohne Speichern gehen alle Änderungen verloren!
</aside>
```

---

### 3.2 Überschriften

#### `<h1>` bis `<h6>`

**Verwendung:** Hierarchische Gliederung des Contents

**Pflicht-Attribute:**
- `data-ref="..."`

**Optional-Attribute:**
- Keine

**BFSG-Anforderungen:**
- Keine Hierarchie-Sprünge (h2 → h3 → h4, NICHT h2 → h4)
- Erste Überschrift richtet sich nach Parent-Level (siehe Cluster 3-A)

**Beispiel:**
```html
<h2 data-ref="export-heading">Export-Funktionen</h2>
<h3 data-ref="export-csv-heading">Export als CSV</h3>
<h4 data-ref="export-csv-options-heading">CSV-Optionen</h4>
```

---

### 3.3 Text & Formatierung

#### `<p>` (Absatz)

**Pflicht-Attribute:**
- `data-ref="..."`

**Optional-Attribute:**
- `data-content-type="..."` (für Content-Klassifikation)

**Beispiel:**
```html
<p data-ref="intro-text" 
   data-content-type="explanation">
    AXIOM bietet verschiedene Export-Optionen für Analyseergebnisse.
</p>
```

---

#### `<span>` (Inline-Container)

**Verwendung:** Inline-Formatierung, Sprachauszeichnung

**Pflicht-Attribute:**
- `lang="..."` (bei fremdsprachigen Begriffen, siehe Cluster 3-A)

**Optional-Attribute:**
- `data-ref="..."` (selten benötigt)

**Beispiel:**
```html
<p data-ref="software-text">
    Öffnen Sie <span lang="en">AXIOM Process</span> und navigieren Sie zu 
    <span lang="en">File → Export → Evidence Items</span>.
</p>
```

---

#### `<strong>` (Wichtige Betonung)

**Verwendung:** Fettmarkierung wichtiger Aussagen (für Querlesen)

**Pflicht-Attribute:**
- Keine

**Optional-Attribute:**
- `data-ref="..."` (selten benötigt)

**Beispiel:**
```html
<p data-ref="important-note">
    <strong>Wichtig:</strong> Speichern Sie Änderungen vor dem Export.
</p>
```

---

#### `<em>` (Sprachliche Betonung)

**Verwendung:** Kursive Hervorhebung, Tonfall

**Pflicht-Attribute:**
- Keine

**Optional-Attribute:**
- `data-ref="..."` (selten benötigt)

**Beispiel:**
```html
<p data-ref="emphasis-text">
    Diese Einstellung ist <em>optional</em>, aber empfohlen.
</p>
```

**Abgrenzung zu `<strong>`:**
- `<strong>`: Wichtigkeit, Gewicht → **fett**
- `<em>`: Betonung, Tonfall → *kursiv*

---

### 3.4 Listen

#### `<ul>` (Ungeordnete Liste)

**Pflicht-Attribute:**
- `data-ref="..."`

**Optional-Attribute:**
- Keine

**Verschachtelung:**
- Maximal 3 Ebenen empfohlen
- Bis zu 5 Ebenen erlaubt (Warning im Validator)
- Innere Listen benötigen eigenes `data-ref`

**Beispiel:**
```html
<ul data-ref="export-checklist">
    <li>Punkt 1</li>
    <li>Punkt 2
        <ul data-ref="export-checklist-sub">
            <li>Unterpunkt 2.1</li>
            <li>Unterpunkt 2.2</li>
        </ul>
    </li>
    <li>Punkt 3</li>
</ul>
```

---

#### `<ol>` (Geordnete Liste)

**Pflicht-Attribute:**
- `data-ref="..."`

**Optional-Attribute:**
- `start="{number}"` (bei Fortsetzung)
- `type="1|a|A|i|I"` (Nummerierungsstil)

**Beispiel:**
```html
<ol data-ref="export-steps">
    <li>Öffnen Sie AXIOM</li>
    <li>Wählen Sie den Case</li>
    <li>Klicken Sie auf Export</li>
</ol>
```

---

#### `<li>` (Listenelement)

**Pflicht-Attribute:**
- Keine

**Optional-Attribute:**
- `data-ref="..."` (bei Referenzierung einzelner Items)
- `data-content-type="..."` (bei Content-Klassifikation)

**Beispiel:**
```html
<ul data-ref="format-list">
    <li data-ref="format-csv" 
        data-content-type="explanation">
        <strong>CSV:</strong> Universell lesbar, für Tabellenkalkulation
    </li>
    <li data-ref="format-html" 
        data-content-type="explanation">
        <strong>HTML:</strong> Interaktiv, mit Suchfunktion
    </li>
</ul>
```

---

### 3.5 Tabellen

#### `<table>`

**Pflicht-Attribute:**
- `data-ref="..."`

**Optional-Attribute:**
- Keine

**Pflicht-Kinder:**
- `<caption>` (BFSG-Anforderung)

**Beispiel:**
```html
<table data-ref="comparison-table">
    <caption>Vergleich der Export-Formate</caption>
    <thead data-ref="comparison-table-header">
        <tr>
            <th scope="col">Format</th>
            <th scope="col">Vorteile</th>
            <th scope="col">Nachteile</th>
        </tr>
    </thead>
    <tbody data-ref="comparison-table-body">
        <tr>
            <th scope="row">CSV</th>
            <td>Universell lesbar</td>
            <td>Keine Formatierung</td>
        </tr>
        <tr>
            <th scope="row">HTML</th>
            <td>Interaktiv</td>
            <td>Größere Dateien</td>
        </tr>
    </tbody>
</table>
```

---

#### `<caption>` (Tabellenbeschriftung)

**Pflicht-Attribute:**
- Keine (aber Element selbst ist Pflicht bei `<table>`)

**Optional-Attribute:**
- `data-ref="..."` (selten benötigt)

**BFSG:** Screenreader lesen Caption vor Tabelleninhalt

**Beispiel:**
```html
<caption>Vergleich der Export-Formate</caption>
```

---

#### `<thead>`, `<tbody>`, `<tfoot>` (Tabellenbereiche)

**Pflicht-Attribute:**
- Keine

**Optional-Attribute:**
- `data-ref="..."` (bei komplexen Tabellen)

**Verwendung:**
- `<thead>`: Kopfzeile(n)
- `<tbody>`: Datenzeilen
- `<tfoot>`: Fußzeile(n) (z.B. Summen)

**Beispiel mit `<tfoot>`:**
```html
<table data-ref="statistics-table">
    <caption>Statistiken</caption>
    <thead>
        <tr>
            <th scope="col">Kategorie</th>
            <th scope="col">Anzahl</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">E-Mails</th>
            <td>1.234</td>
        </tr>
        <tr>
            <th scope="row">Dokumente</th>
            <td>4.444</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row">Gesamt</th>
            <td>5.678</td>
        </tr>
    </tfoot>
</table>
```

---

#### `<tr>` (Tabellenzeile)

**Pflicht-Attribute:**
- Keine

**Optional-Attribute:**
- `data-ref="..."` (bei Referenzierung einzelner Zeilen)

---

#### `<th>` (Tabellen-Kopfzelle)

**Pflicht-Attribute:**
- `scope` (Werte: `"col"` oder `"row"`)
  - `scope="col"`: Spaltenkopf
  - `scope="row"`: Zeilenkopf

**Optional-Attribute:**
- `data-ref="..."` (selten benötigt)

**BFSG:** `scope` hilft Screenreadern, Zellen korrekt zuzuordnen

**Beispiel:**
```html
<thead>
    <tr>
        <th scope="col">Format</th>
        <th scope="col">Dateigröße</th>
    </tr>
</thead>
<tbody>
    <tr>
        <th scope="row">CSV</th>
        <td>Klein</td>
    </tr>
</tbody>
```

---

#### `<td>` (Tabellendatenzelle)

**Pflicht-Attribute:**
- Keine

**Optional-Attribute:**
- `data-ref="..."` (selten benötigt)

---

### 3.6 Medien

#### `<img>` (Bild)

**Pflicht-Attribute:**
- `src="..."` (Pfad zur Datei)
- `alt="..."` (Alt-Text, max. 120 Zeichen, siehe Cluster 3-A)
- `data-media-type` (Werte: `"screenshot"`, `"annotated"`, `"diagram"`, `"image"`)

**Optional-Attribute:**
- `width`, `height` (für Performance)
- `loading="lazy"` (für Performance)

**Pfad-Validierung:**
- `data-media-type="screenshot"` → `src` muss Pattern `^media/screenshots/.*\.(png|jpg|jpeg)$` entsprechen
- `data-media-type="annotated"` → `src` muss Pattern `^media/annotated/.*\.(png|jpg|jpeg)$` entsprechen
- `data-media-type="diagram"` → `src` muss Pattern `^media/other/.*\.(png|svg)$` entsprechen
- `data-media-type="image"` → `src` muss Pattern `^media/other/.*\.(png|jpg|jpeg|svg)$` entsprechen

**Beispiel:**
```html
<img src="media/screenshots/axiom-export.png" 
     alt="AXIOM Export-Dialog mit Schaltfläche Case Summary exportieren"
     data-media-type="screenshot"
     loading="lazy">
```

**Mit `<figure>` (empfohlen):**
```html
<figure data-ref="export-screenshot">
    <img src="media/screenshots/axiom-export.png" 
         alt="AXIOM Export-Dialog mit Schaltfläche Case Summary exportieren"
         data-media-type="screenshot">
    <figcaption>AXIOM Export-Dialog</figcaption>
</figure>
```

---

#### `<video>` (Video)

**Pflicht-Attribute:**
- `src="..."` (Pfad zur Datei)
- `data-media-type="video"`
- `controls` (für Benutzersteuerung)

**Pflicht-Kinder:**
- `<track kind="captions">` (für Untertitel, BFSG)

**Optional-Attribute:**
- `width`, `height`
- `poster="..."` (Vorschaubild)

**Pfad-Validierung:**
- `src` muss Pattern `^media/videos/.*\.(mp4|webm)$` entsprechen

**BFSG:** Videos MÜSSEN Untertitel haben (`.vtt`-Datei)

**Beispiel:**
```html
<figure data-ref="export-tutorial">
    <video src="media/videos/export-workflow.mp4" 
           data-media-type="video"
           controls
           poster="media/videos/export-workflow-poster.jpg">
        <track kind="captions" 
               src="media/subtitles/export-workflow.de.vtt" 
               srclang="de"
               label="Deutsch">
        Ihr Browser unterstützt kein HTML5-Video.
    </video>
    <figcaption>Screencast: Export-Vorgang in AXIOM (2:30 Min)</figcaption>
</figure>
```

---

#### `<audio>` (Audio)

**Pflicht-Attribute:**
- `src="..."` (Pfad zur Datei)
- `data-media-type="audio"`
- `controls` (für Benutzersteuerung)

**Optional-Attribute:**
- Keine

**Pfad-Validierung:**
- `src` muss Pattern `^media/audio/.*\.(mp3|wav|ogg|m4a)$` entsprechen

**Beispiel:**
```html
<figure data-ref="chain-of-custody-audio">
    <audio src="media/audio/chain-of-custody-explanation.mp3" 
           data-media-type="audio"
           controls>
        Ihr Browser unterstützt kein HTML5-Audio.
    </audio>
    <figcaption>Audiokommentar: Erklärung zur Chain of Custody (3:20 Min)</figcaption>
</figure>
```

---

#### `<figure>` (Medien-Container)

**Verwendung:** Umschließt Medien mit optionaler Beschriftung

**Pflicht-Attribute:**
- `data-ref="..."`

**Optional-Attribute:**
- Keine

**Pflicht-Kinder (bei bestimmten Media-Types):**
- `<figcaption>` ist **Pflicht** bei:
  - `data-media-type="diagram"`
  - `data-media-type="annotated"`
  - `data-media-type="video"`
  - `data-media-type="audio"`

**Beispiel:**
```html
<figure data-ref="workflow-diagram">
    <img src="media/other/forensic-workflow.png" 
         alt="Flussdiagramm des forensischen Workflows"
         data-media-type="diagram"
         aria-describedby="workflow-desc">
    <figcaption id="workflow-desc">
        <strong>Detaillierte Beschreibung:</strong>
        Der Workflow umfasst fünf Phasen: 1) Sicherung, 2) Hash-Berechnung, 
        3) Analyse, 4) Dokumentation, 5) Archivierung.
    </figcaption>
</figure>
```

---

#### `<figcaption>` (Medien-Beschriftung)

**Verwendung:** Beschreibung/Erklärung zum Medium

**Pflicht-Attribute:**
- `id="..."` (falls `aria-describedby` referenziert)

**Optional-Attribute:**
- `data-ref="..."` (selten benötigt)

**BFSG:** Bei komplexen Diagrammen muss `<img aria-describedby="...">` auf `<figcaption id="...">` verweisen

**Beispiel siehe `<figure>`**

---

#### `<button>` (Media-Platzhalter)

**Verwendung:** Platzhalter für noch zu erstellende Medien

**Pflicht-Attribute:**
- `class="media-help-trigger"`
- `data-media-src="..."` (Pfad wo Medium erstellt werden soll)
- `data-media-alt="..."` (Alt-Text für finales Medium)
- `data-media-type` (Werte: `"screenshot"`, `"annotated"`, `"video"`, `"diagram"`, `"image"`)

**Optional-Attribute:**
- `data-media-annotation="true"` (bei annotierten Screenshots)

**HTML-Kommentar:**
- Nach `<button>` sollte ein `<!-- MEDIA: ... -->` Kommentar folgen mit Anweisungen zur Erstellung

**Beispiel:**
```html
<button class="media-help-trigger" 
        data-media-src="media/screenshots/axiom-menu-export.png"
        data-media-alt="Screenshot: AXIOM Menü Datei mit hervorgehobenem Eintrag Export"
        data-media-type="screenshot">
    📷
</button>
<!-- MEDIA:
AUFNAHME-BEDINGUNGEN:
- AXIOM Version: 7.x
- Case geladen: Beispiel-Case "Demo_2024"
- Fenstergröße: Maximiert, min. 1920x1080

AUFNAHME-SCHRITT:
1. Öffne AXIOM mit Demo-Case
2. Klicke auf "Datei" in Menüleiste
3. Erstelle Screenshot

DATEINAME: axiom-menu-export.png
SPEICHERORT: media/screenshots/
-->
```

---

### 3.7 Code & Spezialtags

#### `<code>` (Inline-Code)

**Verwendung:** 
- Inline-Code in Fließtext
- Code-Blöcke innerhalb `<pre>`

**Pflicht-Attribute:**
- `class="language-{name}"` (nur bei `<code>` innerhalb `<pre>`)
  - Werte: `python`, `javascript`, `sql`, `bash`, `json`, `xml`, `html`, `css`, etc.

**Optional-Attribute:**
- `data-ref="..."` (bei `<pre><code>`)

**KEINE `lang`-Attribute bei Code!** (Code ist sprachneutral)

**Beispiel Inline:**
```html
<p data-ref="function-text">
    Verwenden Sie die Funktion <code>hashlib.sha256()</code> zur Berechnung.
</p>
```

**Beispiel Block:**
```html
<pre data-ref="hash-example">
<code class="language-python">
import hashlib

def calculate_hash(file_path):
    with open(file_path, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()
</code>
</pre>
```

---

#### `<pre>` (Vorformatierter Text)

**Verwendung:** Code-Blöcke, ASCII-Art, vorformatierter Text

**Pflicht-Attribute:**
- `data-ref="..."`

**Optional-Attribute:**
- Keine

**Pflicht-Kinder:**
- Bei Code: `<code class="language-...">`

**Beispiel:**
```html
<pre data-ref="sql-example">
<code class="language-sql">
SELECT * FROM artifacts 
WHERE type = 'email' 
  AND timestamp > '2024-01-01';
</code>
</pre>
```

---

#### `<kbd>` (Tastatureingabe)

**Verwendung:** Tasten, Tastenkombinationen

**Pflicht-Attribute:**
- `lang="en"` (nur bei benannten Tasten wie Ctrl, Shift, Enter)
- `lang="de"` (nur bei deutschen Tastennamen wie Strg, Umschalt, Eingabe)

**Optional-Attribute:**
- Keine

**NICHT markieren:** Buchstaben, Zahlen, Sonderzeichen (z.B. `<kbd>C</kbd>`, `<kbd>F5</kbd>`)

**Beispiel:**
```html
<p data-ref="shortcut-text">
    Drücken Sie <kbd lang="en">Ctrl</kbd> + <kbd>C</kbd> zum Kopieren.
</p>

<p data-ref="refresh-text">
    Drücken Sie <kbd>F5</kbd> zum Aktualisieren.
</p>
```

---

#### `<abbr>` (Abkürzung)

**Verwendung:** Abkürzungen, Akronyme

**Pflicht-Attribute:**
- `title="..."` (Langform)
- `lang="..."` (bei fremdsprachigen Abkürzungen)

**Optional-Attribute:**
- Keine

**Beispiel:**
```html
<p data-ref="fbi-text">
    Die <abbr title="Federal Bureau of Investigation" lang="en">FBI</abbr>-Richtlinien 
    empfehlen die Verwendung eines <span lang="en">Write Blocker</span>.
</p>

<p data-ref="bka-text">
    Das <abbr title="Bundeskriminalamt" lang="de">BKA</abbr> hat neue Leitlinien 
    veröffentlicht.
</p>
```

---

### 3.8 Links

#### `<a>` (Hyperlink)

**Verwendung:**
- Externe Links (zu Quellen, Dokumentationen)
- Interne Anker (zu Sections innerhalb der Applikation)

**Externe Links - Pflicht-Attribute:**
- `href="https://..."` (vollständige URL)
- `target="_blank"` (öffnet in neuem Tab)
- `rel="noopener noreferrer"` (Sicherheit gegen Tabnabbing)
- `aria-label="..."` (mit Hinweis "öffnet in neuem Tab" und Domain)

**Interne Anker - Pflicht-Attribute:**
- `href="#{section-id}"` (Anker zu Section)

**Optional-Attribute:**
- `data-ref="..."` (bei Referenzierung)

**Domain im Text:**
- Domain muss in Klammern am Ende des Linktexts stehen

**Beispiel Extern:**
```html
<p data-ref="docs-link">
    Weitere Informationen finden Sie in der 
    <a href="https://www.magnetforensics.com/docs" 
       target="_blank" 
       rel="noopener noreferrer"
       aria-label="Axiom-Dokumentation (magnetforensics.com) - öffnet in neuem Tab">
        Axiom-Dokumentation (magnetforensics.com)
    </a>.
</p>
```

**Beispiel Intern:**
```html
<p data-ref="see-also">
    Siehe auch: <a href="#section-basics">Grundlagen</a>
</p>
```

---

### 3.9 Meta-Elemente

#### `<script type="application/ld+json">` (JSON-LD Metadaten)

**Verwendung:** Strukturierte Metadaten pro Section (Schema.org-konform)

**Pflicht-Attribute:**
- `type="application/ld+json"` (MIME-Type)
- `class="section-metadata"` (für CSS/JS-Selektion)

**Pflicht-Kinder:**
- JSON-Objekt (siehe Abschnitt 5)

**Platzierung:**
- **Am Anfang** der Section, direkt nach öffnendem `<section>`-Tag

**Beispiel:**
```html
<section class="content-section" 
         id="section-export" 
         data-section="export"
         data-level="3">
    
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": "export",
        "name": "Export-Funktionen",
        "version": "1.0.0",
        "dateCreated": "2025-10-09T10:00:00Z",
        "dateModified": "2025-10-09T14:30:00Z",
        "author": {
            "@type": "Person",
            "name": "Claude Sonnet 4.5",
            "email": "claude-sonnet-4.5@ai.anthropic.com"
        },
        "dependencies": ["section-basics"],
        "learningObjectives": [
            "Export-Formate kennenlernen",
            "Report-Erstellung durchführen"
        ],
        "estimatedTime": "PT10M",
        "difficultyLevel": "Intermediate"
    }
    </script>
    
    <!-- Section Content -->
    
</section>
```

---

## 4. Attribut-Reihenfolge & Formatierung

### 4.1 Attribut-Reihenfolge

**Standard-Reihenfolge (empfohlen, Warning bei Abweichung):**

1. `class`
2. `id`
3. `data-*` (alphabetisch sortiert)
4. Sonstige Attribute (alphabetisch sortiert)

**Beispiel:**
```html
<section class="content-section" 
         id="section-export" 
         data-level="3"
         data-parent="chapter-basics"
         data-section="export"
         data-title="Export-Funktionen"
         aria-label="Export-Funktionen">
```

### 4.2 Mehrzeilige Formatierung

**Regel:** Mehrzeilig ab **>3 Attributen**

**Einrückung:** 4 Spaces (relativ zum Element-Namen)

**Beispiel Einzeilig (≤3 Attribute):**
```html
<p data-ref="intro-text" data-content-type="explanation">...</p>
```

**Beispiel Mehrzeilig (>3 Attribute):**
```html
<section class="content-section" 
         id="section-export" 
         data-section="export"
         data-level="3"
         data-parent="chapter-basics"
         data-title="Export-Funktionen">
```

### 4.3 Einrückung im HTML

**Standard:** 4 Spaces pro Einrückungsebene

**Beispiel:**
```html
<section class="content-section" id="section-export">
    <h2 data-ref="export-heading">Export</h2>
    <p data-ref="export-intro">...</p>
    
    <ul data-ref="export-steps">
        <li>Schritt 1</li>
        <li>Schritt 2</li>
    </ul>
    
    <div class="agent-context-block">
        <!-- Agent Content -->
    </div>
</section>
```

---

## 5. JSON-LD Metadaten (Finalisiert)

### 5.1 Struktur

**Schema.org Type:** `TechArticle` (für technische Dokumentation)

**Pflichtfelder:**
- `@context`: `"https://schema.org"` (immer konstant)
- `@type`: `"TechArticle"` (immer konstant)
- `identifier`: Muss identisch mit `data-section` sein (z.B. `"export"`)
- `name`: Titel der Section (z.B. `"Export-Funktionen"`)
- `version`: Semantic Versioning (z.B. `"1.0.0"`)

**Optionale Felder:**
- `dateCreated`: ISO-8601 Zeitstempel (z.B. `"2025-10-09T10:00:00Z"`)
- `dateModified`: ISO-8601 Zeitstempel (z.B. `"2025-10-09T14:30:00Z"`)
- `author`: Autor-Objekt (siehe unten)
- `dependencies`: Array von Section-IDs (z.B. `["section-basics", "section-preparation"]`)
- `learningObjectives`: Array von Strings (z.B. `["Ziel 1", "Ziel 2"]`)
- `estimatedTime`: ISO-8601 Duration (z.B. `"PT10M"` = 10 Minuten)
- `difficultyLevel`: Enum (`"Beginner"`, `"Intermediate"`, `"Advanced"`)

### 5.2 Autor-Objekt

**KI trägt sich selbst als Autor ein:**

```json
"author": {
    "@type": "Person",
    "name": "Claude Sonnet 4.5",
    "email": "claude-sonnet-4.5@ai.anthropic.com"
}
```

### 5.3 KI-Berechnungsregeln

#### `estimatedTime` (ISO-8601 Duration)

**Kriterien:**
- Wortanzahl (ca. 200 Wörter/Min Lesezeit)
- Anzahl Arbeitsschritte (ca. 1-2 Min/Schritt)
- Anzahl Grafiken (ca. 30 Sek/Grafik)
- Dauer Videos/Audios (addieren)

**Formel (Richtwert):**
```
Lesezeit = Wortanzahl / 200 (Min)
Schrittzeit = Anzahl_Schritte * 1.5 (Min)
Medienzeit = Anzahl_Grafiken * 0.5 + Summe_Video/Audio_Dauer (Min)

Gesamt = Lesezeit + Schrittzeit + Medienzeit (aufgerundet auf volle 5 Min)
```

**Format:**
- `"PT5M"` = 5 Minuten
- `"PT10M"` = 10 Minuten
- `"PT1H30M"` = 1 Stunde 30 Minuten

**Beispiele:**
- 500 Wörter, 3 Schritte, 2 Screenshots → ca. 10 Min → `"PT10M"`
- 1000 Wörter, 8 Schritte, 1 Video (3 Min), 4 Screenshots → ca. 20 Min → `"PT20M"`

**Hinweis:** Abschätzung, Fehler sind toleriert. Maintainer kann überschreiben.

---

#### `difficultyLevel` (Enum)

**Kriterien:**

| Level | Kriterien |
|-------|-----------|
| `"Beginner"` | - Grundlegende Konzepte<br>- Wenige Voraussetzungen<br>- Schritt-für-Schritt sehr detailliert<br>- Meist Detail-Level 2 |
| `"Intermediate"` | - Baut auf Grundlagen auf<br>- Einige Voraussetzungen<br>- Mittlerer Detailgrad<br>- Meist Detail-Level 2-3 |
| `"Advanced"` | - Komplexe Konzepte<br>- Viele Voraussetzungen<br>- Weniger Erklärungen<br>- Meist Detail-Level 3<br>- Edge Cases, Optimierungen |

**Heuristik:**
- Keine `dependencies` → wahrscheinlich `"Beginner"`
- 1-2 `dependencies` → wahrscheinlich `"Intermediate"`
- 3+ `dependencies` → wahrscheinlich `"Advanced"`
- Detail-Level 1-2 → eher `"Beginner"` oder `"Intermediate"`
- Detail-Level 3 → eher `"Intermediate"` oder `"Advanced"`

**Hinweis:** Abschätzung, subjektiv. Maintainer kann überschreiben.

---

### 5.4 Vollständiges Beispiel

```json
{
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "identifier": "export-advanced",
    "name": "Erweiterte Export-Optionen",
    "version": "1.2.1",
    "dateCreated": "2025-09-15T08:30:00Z",
    "dateModified": "2025-10-09T14:15:00Z",
    "author": {
        "@type": "Person",
        "name": "Claude Sonnet 4.5",
        "email": "claude-sonnet-4.5@ai.anthropic.com"
    },
    "dependencies": [
        "section-export-basics",
        "section-templates"
    ],
    "learningObjectives": [
        "Erweiterte Template-Anpassungen durchführen",
        "Custom-Export-Skripte erstellen",
        "Performance-Optimierungen anwenden"
    ],
    "estimatedTime": "PT25M",
    "difficultyLevel": "Advanced"
}
```

---

## 6. Agent-Context-Block

### 6.1 Struktur & Platzierung

**Anzahl:** Genau **einer pro Section** (Error bei 0 oder >1)

**Platzierung:** **Am Ende** der Section, nach allem Content (Warning bei falscher Platzierung)

**Pflicht-Attribute:**
- `class="agent-context-block"`
- `data-ref="agent-context-{section-name}"`
- `data-context-id="{section-name}-context"`
- `style="display: none;"`

**Pflicht-Kommentar:**
- Innerhalb des Blocks: `<!-- Dynamisch vom Agent gefüllt -->`

### 6.2 Vollständiges Beispiel

```html
<section class="content-section" 
         id="section-export" 
         data-section="export"
         data-level="3">
    
    <script type="application/ld+json" class="section-metadata">
    { ... }
    </script>
    
    <h2 data-ref="export-heading">Export-Funktionen</h2>
    
    <p data-ref="export-intro">
        AXIOM bietet verschiedene Export-Formate...
    </p>
    
    <!-- Weiterer Content -->
    
    <!-- Agent-Context-Block (immer am Ende!) -->
    <div class="agent-context-block"
         data-ref="agent-context-export"
         data-context-id="export-context"
         style="display: none;">
        <!-- Dynamisch vom Agent gefüllt -->
    </div>
    
</section>
```

### 6.3 Validierung

**Python-Validator prüft:**
- ✅ Genau ein Agent-Context-Block pro Section (Error bei 0 oder >1)
- ✅ Block ist letztes Child-Element der Section (Warning bei falscher Position)
- ✅ Pflicht-Attribute vorhanden (Error bei Fehlen)
- ✅ `data-ref` ist eindeutig (Error bei Duplikat)
- ✅ `data-context-id` ist eindeutig (Error bei Duplikat)

---

## 7. CSS-Klassen-System

### 7.1 Pflicht-Klassen

**Strukturelemente:**

| Element | Bedingung | Pflicht-Klasse |
|---------|-----------|----------------|
| `<article>` | `data-level="1"` | `class="content-topic"` |
| `<section>` | `data-level="2"` | `class="content-chapter"` |
| `<section>` | `data-level="3+"` | `class="content-section"` |
| `<div>` | Agent-Context | `class="agent-context-block"` |
| `<div>` | Detail-Level | `class="detail-level-1/2/3"` |

**Content-Type-Boxen:**

| Element | `data-content-type` | Pflicht-Klasse |
|---------|---------------------|----------------|
| `<aside>` | `"info"` | `class="info-box"` |
| `<aside>` | `"hint"` | `class="hint-box"` |
| `<aside>` | `"attention"` | `class="attention-box"` |
| `<aside>` | `"warning"` | `class="warning-box"` |

**Media-Platzhalter:**

| Element | Verwendung | Pflicht-Klasse |
|---------|------------|----------------|
| `<button>` | Media-Platzhalter | `class="media-help-trigger"` |

### 7.2 Optionale Klassen

**Freie Benennung erlaubt**, aber:
- Unbekannte Klassen erzeugen **Warning** im Validator
- Neue Klassen erfordern **Review** (siehe Kommentar-Konvention `TODO:`)
- Wildwuchs vermeiden

**Beispiel neue Klasse:**
```html
<div class="custom-highlight-box" 
     data-ref="special-note">
    <!-- TODO: Neue CSS-Klasse "custom-highlight-box" in styles.css definieren -->
    <p>Besonders wichtiger Hinweis...</p>
</div>
```

### 7.3 Validierung

**Python-Validator:**
- **Error:** Pflicht-Klasse fehlt
- **Warning:** Unbekannte Klasse verwendet
- **Info:** Neue Klasse entdeckt (Review empfohlen)

---

## 8. HTML-Kommentar-Konventionen

### 8.1 Kategorien

HTML-Kommentare sind **erlaubt**, aber **sparsam** einsetzen.

**Kategorien (mit Präfix):**

| Kategorie | Zweck | Beispiel |
|-----------|-------|----------|
| `AGENT:` | KI schlägt Agent-Interaktion vor | `<!-- AGENT: Hier könnte der Agent... -->` |
| `MEDIA:` | Anweisungen zur Medien-Erstellung | `<!-- MEDIA: Screenshot mit... -->` |
| `NOTE:` | Allgemeiner Hinweis an Maintainer | `<!-- NOTE: Diese Section ist... -->` |
| `TODO:` | Offene Aufgabe für Maintainer | `<!-- TODO: CSS-Klasse definieren -->` |
| `DECISION-REVIEW:` | KI-Entscheidung bei Grenzfall | `<!-- DECISION-REVIEW: Content-Type... -->` |

### 8.2 Verwendungsrichtlinien

#### `AGENT:` - Agent-Interaktions-Vorschlag

**Wann:** KI erachtet Stelle als geeignet für Agent-Unterstützung

**Beispiel:**
```html
<p data-ref="complex-config">
    Die Konfiguration erfordert mehrere Schritte...
</p>
<!-- AGENT: Hier könnte der Agent eine interaktive Schritt-für-Schritt-Anleitung 
     einblenden, die den Anwender durch den Konfigurations-Wizard führt. 
     Begründung: Komplexer Prozess mit vielen Entscheidungspunkten. -->
```

---

#### `MEDIA:` - Medien-Erstellungs-Anweisungen

**Wann:** Bei `<button class="media-help-trigger">` (Media-Platzhalter)

**Beispiel:**
```html
<button class="media-help-trigger" 
        data-media-src="media/annotated/export-dialog-marked.png"
        data-media-alt="Export-Dialog mit markierten Eingabefeldern"
        data-media-type="annotated">
    📷
</button>
<!-- MEDIA:
AUFNAHME-BEDINGUNGEN:
- AXIOM Version: 7.x
- Case geladen: Demo_2024
- Fenstergröße: Maximiert (min. 1920x1080)
- Theme: Standard (Hell)

AUFNAHME-SCHRITT:
1. Öffne AXIOM Examine mit Demo-Case
2. Klicke auf "File" → "Export"
3. Warte bis Dialog vollständig geladen
4. Erstelle Screenshot

ANNOTATION (nach Aufnahme):
- Rote Nummerierung (1, 2, 3) bei Eingabefeldern:
  1. "Export Format" Dropdown
  2. "Output Path" Textfeld
  3. "Include Artifacts" Checkbox
- Roter Pfeil auf "Export starten" Button

DATEINAME: export-dialog-marked.png
SPEICHERORT: media/annotated/
-->
```

---

#### `NOTE:` - Allgemeiner Hinweis

**Wann:** Wichtiger Kontext für Maintainer

**Beispiel:**
```html
<!-- NOTE: Diese Section behandelt nur CSV-Export. 
     HTML-Export wird in section-export-html behandelt. -->
<section class="content-section" id="section-export-csv">
    ...
</section>
```

---

#### `TODO:` - Offene Aufgabe

**Wann:** Maintainer muss etwas erledigen

**Beispiel:**
```html
<div class="new-callout-box" data-ref="important-note">
    <!-- TODO: Neue CSS-Klasse "new-callout-box" in styles.css definieren.
         Vorschlag: Orangefarbener Rahmen, leicht hervorgehoben, Icon links. -->
    <p>Wichtiger Hinweis...</p>
</div>
```

---

#### `DECISION-REVIEW:` - Grenzfall-Dokumentation

**Wann:** KI ist unsicher bei Entscheidung (z.B. Content-Type-Zuordnung)

**Beispiel:**
```html
<!-- DECISION-REVIEW: [CONFIDENCE: MEDIUM]
     Grenzfall zwischen: "explanation" vs "background"
     Entschieden für: "background"
     Begründung: Warnt vor Zeitaufwand (Kontext), erklärt nicht das "Warum" 
     hinter dem Prozess. Könnte aber auch "explanation" sein, da es den 
     Zusammenhang zwischen Datenauswahl und Verarbeitungszeit erklärt.
     Bitte Review durch Maintainer. -->
<div data-content-type="background">
    <p data-ref="processing-time-note">
        Die Auswahl der Datenquellen beeinflusst die Verarbeitungszeit erheblich. 
        Bei großen Datenmengen kann der Prozess mehrere Stunden dauern.
    </p>
</div>
```

### 8.3 Allgemeine Kommentare (ohne Kategorie)

**Erlaubt**, aber Kategorisierung bevorzugt (bessere Übersicht).

**Beispiel:**
```html
<!-- Dieser Abschnitt wird in v2.0 erweitert -->
```

---

## 9. Content-Type-Box-Entscheidungsmatrix

### 9.1 Übersicht der Content-Types

**Aus Cluster 1 & 2:**

| Content-Type | Dringlichkeit | Icon | CSS-Klasse | Verwendung |
|--------------|---------------|------|------------|------------|
| `info` | Niedrig | ℹ️ | `info-box` | Neutrale Zusatzinformation |
| `hint` | Mittel | 💡 | `hint-box` | Optimierungs-Tipp |
| `attention` | Hoch | ⚠️ | `attention-box` | Wichtiger Hinweis (nicht kritisch) |
| `warning` | Kritisch | 🚨 | `warning-box` | Kritische Warnung (Datenverlust, Fehler) |

### 9.2 Entscheidungsbaum

```
START: Ist es ein Hinweis/Info/Warnung?
│
├─ NEIN → Regulärer Content (kein <aside>)
│
└─ JA → Weiter
    │
    ├─ Kann es zu DATENVERLUST oder FEHLERN führen?
    │  └─ JA → `warning` (🚨)
    │
    ├─ Ist es UNBEDINGT zu beachten (hohe Relevanz)?
    │  └─ JA → `attention` (⚠️)
    │
    ├─ Ist es ein OPTIMIERUNGS-TIPP oder EMPFEHLUNG?
    │  └─ JA → `hint` (💡)
    │
    └─ Ist es eine NEUTRALE ZUSATZINFORMATION?
       └─ JA → `info` (ℹ️)
```

### 9.3 Konkrete Kriterien

#### `info` (ℹ️ Neutrale Information)

**Wann verwenden:**
- Zusätzliche Kontextinformation
- "Gut zu wissen", aber nicht handlungsrelevant
- Keine Empfehlung, nur Fakten

**Beispiele:**
```html
<aside class="info-box" data-content-type="info">
    ℹ️ AXIOM Examiner speichert Reports standardmäßig im Projektordner unter 
    <code>C:\Users\[User]\Documents\AXIOM\Reports\</code>.
</aside>

<aside class="info-box" data-content-type="info">
    ℹ️ Die Export-Funktion ist seit AXIOM Version 6.0 verfügbar.
</aside>
```

**Signalwörter:** "standardmäßig", "übrigens", "zur Information", "es gibt auch"

---

#### `hint` (💡 Optimierungs-Tipp)

**Wann verwenden:**
- Best-Practice-Empfehlung
- Performance-Optimierung
- Zeitsparende Alternative
- "Könnte helfen, ist aber optional"

**Beispiele:**
```html
<aside class="hint-box" data-content-type="hint">
    💡 Tipp: Nutze Template-Variablen für wiederkehrende Metadaten. 
    Das spart Zeit bei der Report-Erstellung.
</aside>

<aside class="hint-box" data-content-type="hint">
    💡 Tipp: Für große Datenmengen (>100 GB) empfiehlt sich der 
    Export in mehreren Teilen, um Speicherprobleme zu vermeiden.
</aside>
```

**Signalwörter:** "Tipp", "empfohlen", "besser", "effizienter", "schneller"

---

#### `attention` (⚠️ Wichtiger Hinweis)

**Wann verwenden:**
- Wichtige Voraussetzung
- Einschränkung der Funktionalität
- Häufige Fehlerquelle (aber nicht kritisch)
- "Sollte beachtet werden"

**Beispiele:**
```html
<aside class="attention-box" data-content-type="attention">
    ⚠️ Achtung: HTML-Reports können bei sehr großen Datenmengen (>1 Mio. Artefakte) 
    langsam laden. Erwägen Sie in diesem Fall CSV- oder PDF-Export.
</aside>

<aside class="attention-box" data-content-type="attention">
    ⚠️ Achtung: Custom-Templates erfordern grundlegende HTML-Kenntnisse. 
    Für Standardfälle nutzen Sie die vorgefertigten Templates.
</aside>
```

**Signalwörter:** "Achtung", "beachten Sie", "wichtig", "Einschränkung"

---

#### `warning` (🚨 Kritische Warnung)

**Wann verwenden:**
- Datenverlust möglich
- Irreversible Aktion
- System-/Rechts-kritisch
- "MUSS beachtet werden"

**Beispiele:**
```html
<aside class="warning-box" data-content-type="warning">
    🚨 Warnung: Ohne vorheriges Speichern gehen alle Änderungen am Report verloren! 
    Klicken Sie auf "Speichern" bevor Sie den Dialog schließen.
</aside>

<aside class="warning-box" data-content-type="warning">
    🚨 Warnung: Das Überschreiben der Original-Datenquelle führt zu unwiederbringlichem 
    Datenverlust und macht die forensische Analyse ungültig. Verwenden Sie IMMER 
    einen Write Blocker!
</aside>
```

**Signalwörter:** "Warnung", "Datenverlust", "unwiederbringlich", "kritisch", "niemals"

---

### 9.4 Grenzfälle & Beispiele

#### Beispiel 1: `hint` vs. `attention`

**Szenario:** "Export kann lange dauern"

**Option A (hint):** Wenn es um Optimierung geht
```html
<aside class="hint-box" data-content-type="hint">
    💡 Tipp: Nutze Filteroptionen, um nur relevante Artefakte zu exportieren. 
    Das reduziert die Export-Dauer erheblich.
</aside>
```

**Option B (attention):** Wenn es um Erwartungsmanagement geht
```html
<aside class="attention-box" data-content-type="attention">
    ⚠️ Achtung: Der Export von großen Cases kann mehrere Stunden dauern. 
    Planen Sie ausreichend Zeit ein.
</aside>
```

**Entscheidung:** Wenn Tipp → `hint`, wenn Warnung → `attention`

---

#### Beispiel 2: `attention` vs. `warning`

**Szenario:** "Aktion kann nicht rückgängig gemacht werden"

**Option A (attention):** Wenn reversibel, aber umständlich
```html
<aside class="attention-box" data-content-type="attention">
    ⚠️ Achtung: Das Löschen dieser Template-Anpassung kann nicht rückgängig gemacht werden. 
    Sie müssen das Template manuell neu erstellen.
</aside>
```

**Option B (warning):** Wenn irreversibel und kritisch
```html
<aside class="warning-box" data-content-type="warning">
    🚨 Warnung: Das Überschreiben der Case-Daten kann NICHT rückgängig gemacht werden! 
    Erstellen Sie vorher ein Backup.
</aside>
```

**Entscheidung:** Wenn umständlich → `attention`, wenn Datenverlust → `warning`

---

### 9.5 Checkliste für KI

**Fragen zur Entscheidungsfindung:**

1. **Kann es zu Datenverlust führen?** → `warning`
2. **Ist es irreversibel und kritisch?** → `warning`
3. **MUSS es beachtet werden (hohe Konsequenz)?** → `attention`
4. **Ist es eine Best-Practice-Empfehlung?** → `hint`
5. **Ist es reine Zusatzinformation?** → `info`

**Bei Unsicherheit:** `DECISION-REVIEW:`-Kommentar einfügen

---

## 10. Validierungsregeln (Zusammenfassung)

### 10.1 Error-Level Regeln

**Python-Validator gibt ERROR aus bei:**

| Regel | Beschreibung |
|-------|--------------|
| **ID-Eindeutigkeit** | `id` muss global eindeutig sein |
| **data-ref Eindeutigkeit** | `data-ref` muss global eindeutig sein |
| **data-context-id Eindeutigkeit** | `data-context-id` muss global eindeutig sein |
| **Pflicht-Attribute fehlen** | Siehe Element-Spezifikationen (Abschnitt 3) |
| **Pflicht-Klassen fehlen** | Siehe CSS-Klassen-System (Abschnitt 7) |
| **Agent-Context-Block** | Genau einer pro Section, 0 oder >1 ist Error |
| **scope-Attribut fehlt** | `<th>` ohne `scope="col/row"` |
| **alt-Attribut fehlt** | `<img>` ohne `alt` (BFSG) |
| **data-media-type fehlt** | `<img>`, `<video>`, `<audio>` ohne `data-media-type` |
| **figcaption fehlt** | `<figure>` mit `data-media-type="diagram/annotated/video/audio"` ohne `<figcaption>` |
| **aria-describedby fehlt** | `<figcaption>` vorhanden, aber kein `aria-describedby` im zugehörigen Element |
| **Hierarchie-Sprünge** | Überschriften überspringen Ebene (h2 → h4) |
| **Hierarchie-Tiefe** | Level > 5 |
| **JSON-LD Pflichtfelder** | `@context`, `@type`, `identifier`, `name`, `version` fehlen |
| **JSON-LD Konsistenz** | `identifier` ≠ `data-section` |
| **estimatedTime Format** | Ungültiges ISO-8601 Duration Format |
| **difficultyLevel Enum** | Wert nicht in [`Beginner`, `Intermediate`, `Advanced`] |
| **Media-Pfad-Mismatch** | Pfad entspricht nicht `data-media-type` Pattern |
| **caption fehlt** | `<table>` ohne `<caption>` |
| **rel fehlt** | `<a target="_blank">` ohne `rel="noopener noreferrer"` |
| **aria-label fehlt** | `<a target="_blank">` ohne `aria-label` |
| **class="language-*" fehlt** | `<code>` in `<pre>` ohne `class` |
| **abbr ohne title** | `<abbr>` ohne `title` |
| **data-title fehlt** | `<section>` ohne `data-title` |
| **id-Pattern Mismatch** | `id` ≠ `"section-" + data-section` |

### 10.2 Warning-Level Regeln

**Python-Validator gibt WARNING aus bei:**

| Regel | Beschreibung |
|-------|--------------|
| **Attribut-Reihenfolge** | Reihenfolge nicht gemäß Standard (class → id → data-* → sonstige) |
| **Agent-Context-Block Position** | Block nicht am Ende der Section |
| **Unbekannte CSS-Klasse** | Klasse nicht in Whitelist (Review empfohlen) |
| **data-ref fehlt** | Element sollte `data-ref` haben (Standard-Granularität) |
| **Hierarchie-Tiefe** | Level > 3 (Warnung, aber technisch erlaubt bis 5) |
| **Listen-Verschachtelung** | Verschachtelung > 3 Ebenen (Warnung, erlaubt bis 5) |
| **Alt-Text zu lang** | Alt-Text > 120 Zeichen |
| **kbd ohne lang** | `<kbd>` mit bekanntem englischen Tastennamen ohne `lang="en"` |

### 10.3 Detaillierte Validator-Dokumentation

**Verweis:** Siehe separates Dokument `Validierungs-Dokumentation v3.0.md` (wird noch erstellt) für:
- Detaillierte Implementierung jeder Regel
- Python-Code-Beispiele
- Test-Cases
- Output-Format

---

## 11. KI-Prompt-Integration

### 11.1 Checkliste für KI bei Content-Erstellung

**VOR dem Schreiben:**
- [ ] Hierarchie-Kontext verstanden (Parent-Level, START_HEADING)?
- [ ] Zielgruppe klar (IT-ferne Ermittler, Mittlere Reife)?
- [ ] Detail-Level festgelegt (1, 2, oder 3)?
- [ ] Terminologie-Entscheidungen dokumentiert?

**WÄHREND des Schreibens:**
- [ ] Alle Pflicht-Attribute gesetzt?
- [ ] Pflicht-CSS-Klassen verwendet?
- [ ] Attribut-Reihenfolge eingehalten (>3 Attribute mehrzeilig)?
- [ ] 4 Spaces Einrückung?
- [ ] `data-ref` eindeutig und semantisch?
- [ ] Alt-Texte max. 120 Zeichen, zweckbeschreibend?
- [ ] Überschriften-Hierarchie ohne Sprünge?
- [ ] Fremdsprachige Begriffe mit `lang` markiert?
- [ ] Content-Type-Boxen korrekt zugeordnet?

**JSON-LD Metadaten:**
- [ ] Pflichtfelder vollständig?
- [ ] `identifier` = `data-section`?
- [ ] `estimatedTime` berechnet (ISO-8601)?
- [ ] `difficultyLevel` eingeschätzt (Beginner/Intermediate/Advanced)?
- [ ] `author` als Claude Sonnet 4.5 eingetragen?

**Agent-Context-Block:**
- [ ] Genau einer pro Section?
- [ ] Am Ende platziert?
- [ ] Alle Pflicht-Attribute gesetzt?
- [ ] Kommentar eingefügt?

**Medien:**
- [ ] Alle Medien mit `data-media-type`?
- [ ] Media-Platzhalter mit `MEDIA:`-Kommentar?
- [ ] `<figcaption>` bei diagram/annotated/video/audio?
- [ ] `aria-describedby` bei `<figcaption>`?

**Links:**
- [ ] Externe Links mit `rel` und `aria-label`?
- [ ] Domain in Klammern im Linktext?

**Tabellen:**
- [ ] `<caption>` vorhanden?
- [ ] `scope` bei allen `<th>`?

**Grenzfälle:**
- [ ] Content-Type-Entscheidungen dokumentiert (bei Unsicherheit)?
- [ ] `DECISION-REVIEW:`-Kommentar bei niedrigem Confidence?

---

### 11.2 Prompt-Template für KI

```markdown
# Section-Generierung: {Section-Name}

## Kontext

**Hierarchie:**
- Section-Level: {LEVEL}
- Parent-Element: {PARENT_ID} (verwendet {PARENT_HEADING})
- Erste Überschrift dieser Section MUSS sein: {START_HEADING}

**Inhaltliche Anforderungen:**
- Zielgruppe: IT-ferne Ermittler (Mittlere Reife, niedrige IT-Kenntnisse)
- Detail-Level: {LEVEL} (1=Schnellübersicht, 2=Best-Practice, 3=Detailliert)
- Tonalität: Subtil-unterstützend, sachlich
- Terminologie: Deutsch bevorzugt, englische Fachbegriffe wo etabliert

**Technische Anforderungen:**
- Dokument: Cluster 3 - Phase B (HTML-Syntax & Attribut-Vollständigkeit)
- BFSG-konform (Barrierefreiheit)
- JSON-LD Metadaten Pflicht
- Agent-Context-Block Pflicht (am Ende)

## Aufgabe

Erstelle eine vollständige Section mit folgendem Inhalt:

{INHALTLICHE VORGABE}

## Anforderungen

**HTML-Struktur:**
- Element: `<section class="content-section" id="section-{name}" ...>`
- Pflicht-Attribute: `data-section`, `data-level`, `data-parent`, `data-title`
- Formatierung: 4 Spaces, mehrzeilig ab >3 Attributen
- Attribut-Reihenfolge: class → id → data-* → sonstige

**JSON-LD Metadaten (am Anfang):**
- Pflichtfelder: @context, @type, identifier, name, version
- Berechne: estimatedTime (ISO-8601), difficultyLevel (Beginner/Intermediate/Advanced)
- Autor: "Claude Sonnet 4.5" <claude-sonnet-4.5@ai.anthropic.com>

**Überschriften:**
- Erste Überschrift: {START_HEADING}
- Keine Sprünge (h{N} → h{N+1})
- Alle mit `data-ref`

**Medien:**
- Entscheide: Screenshot, Annotiert, Video, Diagramm (siehe Entscheidungsbaum Cluster 1)
- Falls benötigt: `<button class="media-help-trigger">` mit `MEDIA:`-Kommentar
- `data-media-type` Pflicht
- Alt-Texte max. 120 Zeichen

**Content-Type-Boxen:**
- Entscheide: info, hint, attention, warning (siehe Entscheidungsmatrix)
- Pflicht-CSS-Klasse: info-box, hint-box, attention-box, warning-box
- Bei Unsicherheit: `DECISION-REVIEW:`-Kommentar

**Agent-Context-Block (am Ende):**
```html
<div class="agent-context-block"
     data-ref="agent-context-{section-name}"
     data-context-id="{section-name}-context"
     style="display: none;">
    <!-- Dynamisch vom Agent gefüllt -->
</div>
```

**Barrierefreiheit:**
- Sprachauszeichnung: `<span lang="en">` bei fremdsprachigen Begriffen
- Alt-Texte: Zweckbeschreibend, max. 120 Zeichen
- Überschriften: Keine Sprünge
- Tabellen: `<caption>`, `scope` bei `<th>`
- Links: `rel="noopener noreferrer"`, `aria-label` mit Domain

## Output

Liefere die vollständige Section als gültiges HTML.
```

---

## 12. Beispiel-Section (Vollständig annotiert)

```html
<section class="content-section" 
         id="section-export-csv" 
         data-section="export-csv"
         data-level="3"
         data-parent="section-export"
         data-title="Export als CSV">
    
    <!-- JSON-LD Metadaten (Pflicht, am Anfang) -->
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": "export-csv",
        "name": "Export als CSV",
        "version": "1.0.0",
        "dateCreated": "2025-10-09T10:00:00Z",
        "dateModified": "2025-10-09T10:00:00Z",
        "author": {
            "@type": "Person",
            "name": "Claude Sonnet 4.5",
            "email": "claude-sonnet-4.5@ai.anthropic.com"
        },
        "dependencies": ["section-export"],
        "learningObjectives": [
            "CSV-Export durchführen",
            "Export-Optionen konfigurieren"
        ],
        "estimatedTime": "PT10M",
        "difficultyLevel": "Beginner"
    }
    </script>
    
    <!-- Erste Überschrift: h3 (Parent ist h2) -->
    <h3 data-ref="export-csv-heading">Export als CSV</h3>
    
    <!-- Einleitung (explanation) -->
    <p data-ref="export-csv-intro" 
       data-content-type="explanation">
        Der CSV-Export eignet sich besonders für tabellarische Daten und ermöglicht 
        die Weiterverarbeitung in Tabellenkalkulations-Programmen wie Excel.
    </p>
    
    <!-- Info-Box (info) -->
    <aside class="info-box" 
           data-content-type="info"
           data-ref="export-csv-info">
        ℹ️ CSV steht für "Comma-Separated Values" und ist ein universelles 
        Dateiformat für tabellarische Daten.
    </aside>
    
    <!-- Anleitung (instruction) -->
    <h4 data-ref="export-csv-steps-heading">Schritt-für-Schritt Anleitung</h4>
    
    <ol data-ref="export-csv-steps">
        <li data-ref="export-csv-step1">
            Öffnen Sie <span lang="en">AXIOM Examine</span> und laden Sie Ihren Case.
        </li>
        <li data-ref="export-csv-step2">
            Klicken Sie auf <span lang="en">File → Export → CSV</span> in der Menüleiste.
        </li>
        <li data-ref="export-csv-step3">
            Wählen Sie die zu exportierenden Artefakte aus.
        </li>
        <li data-ref="export-csv-step4">
            Konfigurieren Sie die CSV-Optionen (siehe unten).
        </li>
        <li data-ref="export-csv-step5">
            Klicken Sie auf <strong>Export starten</strong>.
        </li>
    </ol>
    
    <!-- Media-Platzhalter -->
    <figure data-ref="export-csv-screenshot">
        <button class="media-help-trigger" 
                data-media-src="media/screenshots/axiom-csv-export-dialog.png"
                data-media-alt="AXIOM CSV-Export-Dialog mit Optionen"
                data-media-type="screenshot">
            📷
        </button>
        <!-- MEDIA:
        AUFNAHME-BEDINGUNGEN:
        - AXIOM Version: 7.x
        - Case geladen: Demo_2024
        - Fenstergröße: Maximiert (1920x1080)
        
        AUFNAHME-SCHRITT:
        1. Öffne AXIOM Examine mit Demo-Case
        2. Klicke auf File → Export → CSV
        3. Warte bis Dialog vollständig geladen
        4. Erstelle Screenshot
        
        DATEINAME: axiom-csv-export-dialog.png
        SPEICHERORT: media/screenshots/
        -->
    </figure>
    
    <!-- Detail Level 2: CSV-Optionen -->
    <div class="detail-level-2" 
         data-ref="export-csv-options">
        
        <h4 data-ref="export-csv-options-heading">CSV-Optionen konfigurieren</h4>
        
        <p data-ref="export-csv-options-intro">
            Im Export-Dialog können Sie verschiedene Optionen anpassen:
        </p>
        
        <!-- Tabelle mit Optionen -->
        <table data-ref="export-csv-options-table">
            <caption>Übersicht der CSV-Export-Optionen</caption>
            <thead>
                <tr>
                    <th scope="col">Option</th>
                    <th scope="col">Beschreibung</th>
                    <th scope="col">Empfehlung</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Trennzeichen</th>
                    <td>Zeichen zur Trennung von Spalten</td>
                    <td>Komma (Standard)</td>
                </tr>
                <tr>
                    <th scope="row">Zeichenkodierung</th>
                    <td>Kodierung für Sonderzeichen</td>
                    <td>UTF-8</td>
                </tr>
                <tr>
                    <th scope="row">Kopfzeile</th>
                    <td>Spaltennamen in erster Zeile</td>
                    <td>Aktiviert</td>
                </tr>
            </tbody>
        </table>
        
        <!-- Hint-Box -->
        <aside class="hint-box" 
               data-content-type="hint"
               data-ref="export-csv-encoding-hint">
            💡 Tipp: Verwenden Sie UTF-8 als Zeichenkodierung, um Probleme mit 
            Umlauten und Sonderzeichen zu vermeiden.
        </aside>
        
    </div>
    
    <!-- Attention-Box -->
    <aside class="attention-box" 
           data-content-type="attention"
           data-ref="export-csv-large-datasets">
        ⚠️ Achtung: Bei sehr großen Datenmengen (>100.000 Zeilen) kann das Öffnen 
        der CSV-Datei in Excel langsam sein. Erwägen Sie in diesem Fall die 
        Verwendung spezialisierter CSV-Tools.
    </aside>
    
    <!-- Externe Quelle -->
    <p data-ref="export-csv-docs">
        Weitere Informationen zum CSV-Export finden Sie in der 
        <a href="https://www.magnetforensics.com/docs/axiom/csv-export" 
           target="_blank" 
           rel="noopener noreferrer"
           aria-label="AXIOM CSV-Export Dokumentation (magnetforensics.com) - öffnet in neuem Tab">
            AXIOM CSV-Export Dokumentation (magnetforensics.com)
        </a>.
    </p>
    
    <!-- Agent-Context-Block (Pflicht, am Ende) -->
    <div class="agent-context-block"
         data-ref="agent-context-export-csv"
         data-context-id="export-csv-context"
         style="display: none;">
        <!-- Dynamisch vom Agent gefüllt -->
    </div>
    
</section>
```

**Annotationen:**
- ✅ JSON-LD Metadaten vollständig
- ✅ Hierarchie korrekt (h3 → h4)
- ✅ Alle Pflicht-Attribute gesetzt
- ✅ Pflicht-CSS-Klassen verwendet
- ✅ Attribut-Reihenfolge eingehalten
- ✅ 4 Spaces Einrückung
- ✅ Content-Type-Boxen korrekt
- ✅ Sprachauszeichnung bei fremdsprachigen Begriffen
- ✅ Tabelle mit `<caption>` und `scope`
- ✅ Externer Link mit `rel` und `aria-label`
- ✅ Media-Platzhalter mit `MEDIA:`-Kommentar
- ✅ Agent-Context-Block am Ende

---

## 13. Migration bestehender Inhalte

### 13.1 Schritt-für-Schritt Anleitung

**Ziel:** Bestehende `index.html` auf neue Spezifikation migrieren

**Phase 1: Backup & Vorbereitung**
```bash
# Backup erstellen
cp src/index.html src/index.html.backup.$(date +%Y%m%d)

# Validierung vor Migration
python tools/validation/validate_html_structure.py src/index.html --root-tag "main"
```

**Phase 2: JSON-LD Metadaten hinzufügen**
- Jede `<section>` benötigt `<script type="application/ld+json">`
- Pflichtfelder ausfüllen (siehe Abschnitt 5)
- `estimatedTime` und `difficultyLevel` schätzen

**Phase 3: CSS-Klassen prüfen**
- `<section data-level="2">` → `class="content-chapter"` hinzufügen
- `<section data-level="3+">` → `class="content-section"` hinzufügen
- Content-Type-Boxen: Passende `*-box`-Klasse hinzufügen

**Phase 4: Agent-Context-Blocks prüfen**
- Jede Section muss genau einen Block haben
- Block muss am Ende stehen
- Alle Pflicht-Attribute prüfen

**Phase 5: Attribute vervollständigen**
- `data-title` bei allen Sections hinzufügen (falls fehlend)
- `data-media-type` bei allen Medien hinzufügen (falls fehlend)
- `scope` bei allen `<th>` hinzufügen (falls fehlend)

**Phase 6: Validierung nach Migration**
```bash
python tools/validation/validate_html_structure.py src/index.html \
    --root-tag "main" \
    --schema schema/main-content.schema.json \
    --verbose
```

### 13.2 Häufige Fehler vermeiden

**Fehler 1: Falsche CSS-Klasse bei Section-Level**
```html
<!-- FALSCH -->
<section class="content-section" data-level="2">

<!-- RICHTIG -->
<section class="content-chapter" data-level="2">
```

**Fehler 2: Agent-Context-Block nicht am Ende**
```html
<!-- FALSCH -->
<section>
    <div class="agent-context-block">...</div>
    <p>Content...</p>
</section>

<!-- RICHTIG -->
<section>
    <p>Content...</p>
    <div class="agent-context-block">...</div>
</section>
```

**Fehler 3: JSON-LD identifier ≠ data-section**
```html
<!-- FALSCH -->
<section data-section="export">
    <script type="application/ld+json">
    { "identifier": "export-functions" }
    </script>
</section>

<!-- RICHTIG -->
<section data-section="export">
    <script type="application/ld+json">
    { "identifier": "export" }
    </script>
</section>
```

---

## 14. Zusammenfassung & Nächste Schritte

### 14.1 Was wurde erreicht?

✅ **Vollständige HTML-Element-Whitelist** (32 erlaubte Elemente)  
✅ **Detaillierte Element-Spezifikationen** (Pflicht-/Optional-Attribute)  
✅ **CSS-Klassen-System** (Pflicht-Klassen, Review-Prozess)  
✅ **Attribut-Reihenfolge & Formatierung** (Konsistenz-Richtlinien)  
✅ **JSON-LD Metadaten finalisiert** (KI-Berechnung, Autor)  
✅ **Agent-Context-Block vollständig spezifiziert**  
✅ **Content-Type-Box-Entscheidungsmatrix** (info/hint/attention/warning)  
✅ **HTML-Kommentar-Konventionen** (5 Kategorien)  
✅ **KI-Checkliste & Prompt-Template**  
✅ **Vollständig annotiertes Beispiel**  

### 14.2 Nächste Schritte (Implementierung)

**Phase 1: Python-Validator erweitern** (Priorität 1)
- Neue Validierungsregeln implementieren
- CSS-Klassen-Prüfung
- JSON-LD Metadaten-Validierung
- Aufwand: 6-8 Stunden

**Phase 2: JSON-Schema erweitern** (Priorität 1)
- `main-content.schema.json` v2.0 erstellen
- Neue Attribute definieren
- Enum-Validierungen
- Aufwand: 2-3 Stunden

**Phase 3: CSS-Klassen definieren** (Priorität 2)
- `styles.css` erweitern
- `*-box`-Klassen stylen
- Responsive Design
- Aufwand: 4-6 Stunden

**Phase 4: Migration bestehender Inhalte** (Priorität 2)
- `index.html` anpassen
- JSON-LD Metadaten hinzufügen
- Validierung durchführen
- Aufwand: 8-12 Stunden (abhängig von Anzahl Sections)

**Phase 5: KI-Prompt finalisieren** (Priorität 3)
- Master-Prompt erstellen
- Test-Generierung durchführen
- Prompt iterativ verbessern
- Aufwand: 6-10 Stunden

### 14.3 Offene Punkte

**Keine.** Alle Punkte aus Cluster 3 - Phase B sind vollständig geklärt.

**Für spätere Cluster (falls relevant):**
- Detaillierte Agent-Integration-Spezifikation
- Suchfunktion-Implementation
- Glossar-Modul-Integration
- Multi-Version-Management (für verschiedene Tool-Versionen)

---

## 15. Anhang

### 15.1 Referenz-Tabellen

#### Tabelle 1: HTML-Element-Whitelist (Quick Reference)

| Element | Pflicht-Attribute | Pflicht-CSS-Klasse | Verwendung |
|---------|-------------------|-------------------|------------|
| `<article>` | `class`, `id`, `data-level`, `data-title` | `content-topic` | Level 1 Topic |
| `<section>` | `class`, `id`, `data-section`, `data-level`, `data-title` | `content-chapter` (L2), `content-section` (L3+) | Kapitel, Sections |
| `<div>` | Abhängig von Verwendung | `agent-context-block`, `detail-level-*` | Container, Agent-Block |
| `<aside>` | `data-content-type`, `class` | `info-box`, `hint-box`, `attention-box`, `warning-box` | Info-Boxen |
| `<h1>-<h6>` | `data-ref` | - | Überschriften |
| `<p>` | `data-ref` | - | Absatz |
| `<span>` | `lang` (bei Fremdsprache) | - | Inline-Container |
| `<strong>` | - | - | Wichtige Betonung |
| `<em>` | - | - | Sprachliche Betonung |
| `<ul>`, `<ol>` | `data-ref` | - | Listen |
| `<li>` | - | - | Listenelement |
| `<table>` | `data-ref` | - | Tabelle |
| `<caption>` | - | - | Tabellenbeschriftung |
| `<thead>`, `<tbody>`, `<tfoot>` | - | - | Tabellenbereiche |
| `<tr>` | - | - | Tabellenzeile |
| `<th>` | `scope` | - | Tabellenkopf |
| `<td>` | - | - | Tabellendatenzelle |
| `<img>` | `src`, `alt`, `data-media-type` | - | Bild |
| `<video>` | `src`, `data-media-type`, `controls` | - | Video |
| `<audio>` | `src`, `data-media-type`, `controls` | - | Audio |
| `<figure>` | `data-ref` | - | Medien-Container |
| `<figcaption>` | `id` (bei `aria-describedby`) | - | Medien-Beschriftung |
| `<button>` | `class`, `data-media-*` | `media-help-trigger` | Media-Platzhalter |
| `<code>` | `class` (in `<pre>`) | - | Code |
| `<pre>` | `data-ref` | - | Vorformatierter Text |
| `<kbd>` | `lang` (bei benannten Tasten) | - | Tastatureingabe |
| `<abbr>` | `title`, `lang` (bei Fremdsprache) | - | Abkürzung |
| `<a>` | `href`, `target`, `rel`, `aria-label` (extern) | - | Link |
| `<script>` | `type="application/ld+json"`, `class="section-metadata"` | - | JSON-LD Metadaten |

---

#### Tabelle 2: data-media-type Pfad-Validierung

| data-media-type | Erlaubtes Pfad-Pattern | Beispiel |
|-----------------|------------------------|----------|
| `screenshot` | `^media/screenshots/.*\.(png\|jpg\|jpeg) | `media/screenshots/axiom-menu.png` |
| `annotated` | `^media/annotated/.*\.(png\|jpg\|jpeg)

