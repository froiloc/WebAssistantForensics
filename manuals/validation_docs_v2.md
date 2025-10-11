# HTML-Struktur-Validierung v2.0 - Dokumentation

**Projekt:** WebAssistantForensics  
**Version:** 2.0 (Cluster 2 Extensions)  
**Datum:** 2025-10-08

---

## Übersicht

Das erweiterte Validierungs-Script `validate_html_structure.py` prüft HTML-Dateien auf strukturelle Korrektheit, Barrierefreiheit (BFSG) und Konformität mit dem `main-content.schema.json` Schema.

**Neu in Version 2.0:**
- ✅ Hierarchie-Validierung (Tiefe, Parent-Referenzen, Level-Progression)
- ✅ Heading-Hierarchie (h1-h6 BFSG-konform)
- ✅ Content-Type-Validierung (8 erlaubte Werte)
- ✅ JSON-LD Metadaten-Validierung (inkl. Schema-Check)
- ✅ Metadaten-Konsistenz (identifier = data-section)
- ✅ Agent-Context-Block-Validierung (einer pro Section)
- ✅ data-ref Eindeutigkeit und Pattern-Validierung

---

## Installation

### Abhängigkeiten

```bash
pip install beautifulsoup4 lxml jsonschema
```

**Minimal (ohne Schema-Validierung):**
```bash
pip install beautifulsoup4 lxml
```

---

## Verwendung

### Basis-Aufruf

```bash
python validate_html_structure.py index.html
```

### Mit Root-Tag (Scope einschränken)

```bash
python validate_html_structure.py index.html --root-tag "main"
```

### Mit Schema-Validierung

```bash
python validate_html_structure.py index.html \
    --root-tag "main" \
    --schema ../../schema/main-content.schema.json
```

### Strict-Mode (Fehler statt Warnungen)

```bash
python validate_html_structure.py index.html \
    --root-tag "main" \
    --schema ../../schema/main-content.schema.json \
    --strict-mode
```

### Verbose-Mode (detaillierte Ausgabe)

```bash
python validate_html_structure.py index.html --verbose
```

### Exit-on-Error (für CI/CD)

```bash
python validate_html_structure.py index.html \
    --root-tag "main" \
    --exit-on-error
```

---

## Validierungen im Detail

### 1. ID-Eindeutigkeit (GLOBAL)

**Was wird geprüft:**
- Alle `id`-Attribute im gesamten Dokument müssen eindeutig sein

**Severity:** `error`

**Beispiel-Fehler:**
```
❌ ID 'section-intro' ist 2x vorhanden (muss eindeutig sein)
   └─ <section id='section-intro' class='content-section'>
```

**Lösung:**
```html
<!-- Falsch -->
<section id="section-intro">...</section>
<div id="section-intro">...</div>

<!-- Richtig -->
<section id="section-intro">...</section>
<div id="intro-container">...</div>
```

---

### 2. Standard-Granularität (data-ref)

**Was wird geprüft:**
- Wichtige Elemente (h1-h6, section, ul/ol, etc.) sollten `data-ref` haben

**Severity:** `warning` (Standard), `error` (Strict-Mode)

**Beispiel-Warnung:**
```
⚠️  Element ohne data-ref (empfohlen für Standard-Granularität)
   └─ <h2 id='intro-heading'>
```

**Lösung:**
```html
<!-- Empfohlen -->
<h2 id="intro-heading" data-ref="intro-heading">Überblick</h2>
```

---

### 3. Hierarchie-Tiefe

**Was wird geprüft:**
- `data-level` darf maximal 5 sein (technisches Limit)
- `data-level` >3 löst Warnung aus (empfohlenes Maximum)

**Severity:** `error` (>5), `warning` (>3)

**Beispiel-Warnung:**
```
⚠️  Hierarchie-Tiefe 4 überschreitet Empfehlung (3)
   └─ <section data-level='4' id='section-deep'>
```

**Empfehlung:**
```
Level 1: Topic
Level 2: Chapter
Level 3: Section (empfohlenes Maximum)
Level 4: Subsection (optional)
Level 5: Deep-Dive (nur in Ausnahmefällen)
```

---

### 4. Hierarchie-Parent-Referenzen

**Was wird geprüft:**
- `data-parent` muss auf existierendes Element (via `id`) zeigen

**Severity:** `error`

**Beispiel-Fehler:**
```
❌ data-parent='chapter-templates' zeigt auf nicht-existierendes Element
   └─ <section data-parent='chapter-templates' id='section-types'>
```

**Lösung:**
```html
<!-- Parent muss existieren -->
<section id="chapter-templates" data-level="2">...</section>
<section id="section-types" data-level="3" data-parent="chapter-templates">...</section>
```

---

### 5. Hierarchie-Level-Progression

**Was wird geprüft:**
- Level-Sprünge sind unlogisch (z.B. Level 2 → Level 4)
- Level sollte genau `parent_level + 1` sein

**Severity:** `warning`

**Beispiel-Warnung:**
```
⚠️  Level-Sprung: Element hat Level 4, Parent hat Level 2 (erwartet: 3)
   └─ <section data-level='4' data-parent='chapter-basics'>
```

**Lösung:**
```html
<!-- Falsch: Level-Sprung 2 → 4 -->
<section data-level="2" id="chapter">
    <section data-level="4" data-parent="chapter">...</section>
</section>

<!-- Richtig: Level-Progression 2 → 3 -->
<section data-level="2" id="chapter">
    <section data-level="3" data-parent="chapter">...</section>
</section>
```

---

### 6. Heading-Hierarchie (BFSG!)

**Was wird geprüft:**
- h1-h6 Hierarchie darf keine Sprünge haben (z.B. h1 → h3)
- Wichtig für Barrierefreiheit (BFSG-Anforderung)

**Severity:** `error`

**Beispiel-Fehler:**
```
❌ Heading-Hierarchie-Sprung: h3 folgt auf h1 (überspringe 1 Level)
   └─ <h3>Details</h3>
```

**Lösung:**
```html
<!-- Falsch: h1 → h3 (überspringe h2) -->
<h1>Hauptüberschrift</h1>
<h3>Unterüberschrift</h3>

<!-- Richtig: h1 → h2 → h3 -->
<h1>Hauptüberschrift</h1>
<h2>Kapitel</h2>
<h3>Unterkapitel</h3>
```

---

### 7. Content-Type-Validierung

**Was wird geprüft:**
- `data-content-type` muss einen der 8 erlaubten Werte haben

**Erlaubte Werte:**
- `instruction` - Handlungsanweisung
- `example` - Beispiel/Demo
- `explanation` - Erklärung
- `background` - Hintergrundwissen
- `warning` - Kritische Warnung
- `info` - Neutrale Information
- `hint` - Optimierungs-Tipp
- `attention` - Wichtiger Hinweis

**Severity:** `error`

**Beispiel-Fehler:**
```
❌ Ungültiger Content-Type: 'note' (erlaubt: attention, background, ...)
   └─ <aside data-content-type='note'>
```

**Lösung:**
```html
<!-- Falsch -->
<aside data-content-type="note">Hinweis</aside>

<!-- Richtig -->
<aside data-content-type="info">Hinweis</aside>
```

---

### 8. JSON-LD Metadaten

**Was wird geprüft:**
- Jede Section sollte `<script class="section-metadata">` haben
- Pflichtfelder: `@context`, `@type`, `identifier`, `name`, `version`
- Optional: Schema-Validierung gegen `main-content.schema.json`

**Severity:** `warning` (Standard), `error` (Strict-Mode)

**Beispiel-Fehler:**
```
❌ Pflichtfeld 'version' fehlt in Metadaten
   └─ <section id='section-intro' class='content-section'>
```

**Beispiel-Warnung:**
```
⚠️  Section ohne JSON-LD Metadaten
   └─ <section id='section-intro' class='content-section'>
```

**Lösung:**
```html
<section class="content-section" id="section-intro" data-section="intro">
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": "intro",
        "name": "Überblick",
        "version": "1.0.0"
    }
    </script>
    
    <!-- Content -->
</section>
```

---

### 9. Metadaten-Konsistenz

**Was wird geprüft:**
- `metadata.identifier` muss mit `data-section` übereinstimmen

**Severity:** `error`

**Beispiel-Fehler:**
```
❌ Metadaten-ID 'overview' stimmt nicht mit data-section 'intro' überein
   └─ <section data-section='intro' id='section-intro'>
```

**Lösung:**
```html
<!-- Falsch: identifier ≠ data-section -->
<section data-section="intro">
    <script type="application/ld+json" class="section-metadata">
    { "identifier": "overview", ... }
    </script>
</section>

<!-- Richtig: identifier = data-section -->
<section data-section="intro">
    <script type="application/ld+json" class="section-metadata">
    { "identifier": "intro", ... }
    </script>
</section>
```

---

### 10. Agent-Context-Blocks

**Was wird geprüft:**
- Jede Section sollte genau einen Agent-Context-Block haben
- Block sollte am Ende der Section stehen
- Block muss `data-ref` und `data-context-id` haben

**Severity:** `warning` (fehlend), `error` (mehrere oder falsche Attribute)

**Beispiel-Fehler:**
```
❌ Section mit 2 Agent-Context-Blocks (nur einer erlaubt)
   └─ <section id='section-intro'>
```

**Beispiel-Warnung:**
```
⚠️  Agent-Context-Block nicht am Ende der Section
   └─ <section id='section-intro'>
```

**Lösung:**
```html
<section class="content-section" id="section-intro">
    
    <!-- Content -->
    <h2>Überschrift</h2>
    <p>Text</p>
    
    <!-- Agent-Context-Block (immer am Ende!) -->
    <div class="agent-context-block"
         data-ref="agent-context-intro"
         data-context-id="intro-context"
         style="display: none;">
    </div>
    
</section>
```

---

### 11. data-ref Eindeutigkeit

**Was wird geprüft:**
- Alle `data-ref` Werte müssen eindeutig sein (innerhalb Scope)
- Pattern: nur lowercase, Zahlen, Bindestriche
- Maximale Länge: 64 Zeichen

**Severity:** `error` (doppelt), `warning` (Pattern/Länge)

**Beispiel-Fehler:**
```
❌ data-ref 'intro-heading' ist 2x vorhanden (muss eindeutig sein)
   └─ <h2 data-ref='intro-heading'>, <h3 data-ref='intro-heading'>
```

**Beispiel-Warnung:**
```
⚠️  data-ref 'Intro_Heading' entspricht nicht Pattern (nur lowercase, Zahlen, Bindestriche)
   └─ <h2 data-ref='Intro_Heading'>
```

**Lösung:**
```html
<!-- Falsch: Doppelt -->
<h2 data-ref="intro-heading">Überschrift</h2>
<h3 data-ref="intro-heading">Unterüberschrift</h3>

<!-- Richtig: Eindeutig -->
<h2 data-ref="intro-heading">Überschrift</h2>
<h3 data-ref="intro-subheading">Unterüberschrift</h3>

<!-- Falsch: Großbuchstaben, Underscore -->
<h2 data-ref="Intro_Heading">Überschrift</h2>

<!-- Richtig: lowercase, Bindestriche -->
<h2 data-ref="intro-heading">Überschrift</h2>
```

---

### 12. Medien-Barrierefreiheit (BFSG)

**Was wird geprüft:**
- Alle `<img>` müssen `alt`-Attribut haben

**Severity:** `error`

**Beispiel-Fehler:**
```
❌ Bild ohne alt-Attribut (BFSG-Anforderung)
   └─ <img src='media/screenshots/test.png'>
```

**Lösung:**
```html
<!-- Falsch -->
<img src="media/screenshots/test.png">

<!-- Richtig -->
<img src="media/screenshots/test.png" alt="Screenshot des AXIOM Interface">
```

---

## Severity-Levels

| Level | Bedeutung | Aktion |
|-------|-----------|--------|
| `error` | Muss behoben werden | Deployment blockieren |
| `warning` | Sollte beachtet werden | Review empfohlen |
| `info` | Informativ | Keine Aktion nötig |

---

## Output-Format

### Erfolgreiche Validierung

```
================================================================================
🔍 HTML STRUCTURE VALIDATION RESULTS (v2.0)
🎯 Validierungs-Scope: main
================================================================================

📊 ZUSAMMENFASSUNG:
   Total Elemente: 247
   ❌ Errors:      0
   ⚠️  Warnings:    2
   ℹ️  Info:        5

🎯 STATUS: ✅ VALID
```

### Fehlerhafte Validierung

```
================================================================================
🔍 HTML STRUCTURE VALIDATION RESULTS (v2.0)
🎯 Validierungs-Scope: main
================================================================================

📊 ZUSAMMENFASSUNG:
   Total Elemente: 247
   ❌ Errors:      3
   ⚠️  Warnings:    5
   ℹ️  Info:        5

🎯 STATUS: ❌ INVALID

📋 DETAILS:
--------------------------------------------------------------------------------
❌ ID 'section-intro' ist 2x vorhanden (muss eindeutig sein)
❌ Hierarchie-Tiefe 6 überschreitet Maximum (5)
❌ Pflichtfeld 'version' fehlt in Metadaten
⚠️  Hierarchie-Tiefe 4 überschreitet Empfehlung (3)
⚠️  Agent-Context-Block nicht am Ende der Section
--------------------------------------------------------------------------------

💡 EMPFEHLUNGEN:
   • Beheben Sie alle Errors vor dem Deployment
   • Prüfen Sie doppelte IDs/data-refs und korrigieren Sie diese
   • Stellen Sie sicher, dass JSON-LD Metadaten vollständig sind
   • Validieren Sie Hierarchie-Struktur und Parent-Referenzen
```

---

## Integration in CI/CD

### GitHub Actions

```yaml
name: Validate HTML Structure

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'
    
    - name: Install dependencies
      run: |
        pip install beautifulsoup4 lxml jsonschema
    
    - name: Validate HTML
      run: |
        cd tools/validation
        python validate_html_structure.py ../../src/index.html \
          --root-tag "main" \
          --schema ../../schema/main-content.schema.json \
          --exit-on-error
```

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

cd tools/validation
python validate_html_structure.py ../../src/index.html \
    --root-tag "main" \
    --schema ../../schema/main-content.schema.json \
    --exit-on-error

if [ $? -ne 0 ]; then
    echo "❌ HTML-Validierung fehlgeschlagen. Commit abgebrochen."
    exit 1
fi
```

---

## Häufige Fehler & Lösungen

### Fehler: "jsonschema-Modul nicht installiert"

**Problem:**
```
⚠️  WARNUNG: jsonschema-Modul nicht installiert.
   Schema-Validierung wird übersprungen.
```

**Lösung:**
```bash
pip install jsonschema
```

### Fehler: "Root-Element nicht gefunden"

**Problem:**
```
❌ Root-Element 'main' nicht gefunden
```

**Lösung:**
- Prüfen Sie, ob `<main>` im HTML vorhanden ist
- CSS-Selector korrekt? (z.B. `main` nicht `<main>`)

### Fehler: "Mehrere Elemente für Selector gefunden"

**Problem:**
```
⚠️  Mehrere Elemente für 'section' gefunden (5). Verwende das erste Element.
```

**Lösung:**
- Spezifischeren Selector verwenden: `section.content-section:first`
- Oder ID verwenden: `#main-content`

---

## Best Practices

### 1. Validierung vor jedem Commit

```bash
# In Entwicklungs-Workflow integrieren
./tools/validation/validate.sh
```

### 2. Continuous Validation

```bash
# Watch-Mode (mit entr oder nodemon)
ls src/index.html | entr ./tools/validation/validate.sh
```

### 3. Schrittweise Migration

**Bei bestehenden Projekten:**
1. Ohne `--strict-mode` starten (Warnungen statt Fehler)
2. Warnings Schritt für Schritt beheben
3. Dann `--strict-mode` aktivieren

### 4. Schema immer mitvalidieren

```bash
# Immer mit --schema aufrufen
python validate_html_structure.py index.html \
    --root-tag "main" \
    --schema ../../schema/main-content.schema.json
```

---

## Troubleshooting

### Validierung dauert sehr lange

**Ursache:** Sehr große HTML-Dateien (>10 MB)

**Lösung:**
- Scope mit `--root-tag` einschränken
- HTML-Datei aufteilen (mehrere kleinere Sections)
- BeautifulSoup-Parser optimieren (lxml bereits Standard)

### Validierung findet keine Fehler, obwohl welche vorhanden sind

**Ursache:** Falscher Scope (--root-tag zeigt nicht auf richtiges Element)

**Lösung:**
```bash
# Verbose-Mode zum Debugging
python validate_html_structure.py index.html --root-tag "main" --verbose

# Prüfe Output:
# ✓ Root-Element gefunden: <main>
#   Elemente im Teilbaum: 247
```

### Schema-Validierung schlägt fehl mit kryptischen Fehlern

**Ursache:** JSON-LD Metadaten nicht konform zu Schema

**Lösung:**
1. Prüfe JSON-Syntax (valides JSON?)
2. Prüfe Pflichtfelder (@context, @type, identifier, name, version)
3. Vergleiche mit Beispiel-Section aus Dokumentation

---

## Beispiel-Workflow

### Entwicklung einer neuen Section

```bash
# 1. Section erstellen
nano src/index.html

# 2. Validierung durchführen
cd tools/validation
python validate_html_structure.py ../../src/index.html \
    --root-tag "main" \
    --schema ../../schema/main-content.schema.json \
    --verbose

# 3. Fehler beheben (iterativ)
# ... Fehler korrigieren ...

# 4. Erneut validieren bis 0 Errors
python validate_html_structure.py ../../src/index.html \
    --root-tag "main" \
    --schema ../../schema/main-content.schema.json

# 5. Vollständige Validierung
cd ../..
./tools/validation/validate.sh

# 6. Commit
git add src/index.html
git commit -m "feat: Add new section XYZ"
```

---

## Checkliste: Section-Erstellung

Vor dem Commit einer neuen Section prüfen:

- [ ] **IDs eindeutig** (keine Duplikate)
- [ ] **data-section gesetzt** und eindeutig
- [ ] **data-level korrekt** (1-5, idealerweise ≤3)
- [ ] **data-parent zeigt auf existierendes Element**
- [ ] **Level-Progression logisch** (keine Sprünge)
- [ ] **Heading-Hierarchie** (h1→h2→h3, keine Sprünge)
- [ ] **data-ref auf wichtigen Elementen** (h1-h6, ul/ol, etc.)
- [ ] **data-ref eindeutig** (keine Duplikate)
- [ ] **data-content-type korrekt** (einer der 8 erlaubten Werte)
- [ ] **JSON-LD Metadaten vollständig** (alle Pflichtfelder)
- [ ] **identifier = data-section** (Konsistenz)
- [ ] **Agent-Context-Block vorhanden** (genau einer, am Ende)
- [ ] **Agent-Context-Block mit data-ref und data-context-id**
- [ ] **Alle Bilder haben alt-Attribute** (BFSG)
- [ ] **Validierung läuft durch** (0 Errors)

---

## Versions-Historie

### v2.0 (2025-10-08) - Cluster 2 Extensions

**Neue Validierungen:**
- Hierarchie-Tiefe (max 5, Warnung bei >3)
- Hierarchie-Parent-Referenzen
- Hierarchie-Level-Progression
- Heading-Hierarchie (h1-h6 BFSG-konform)
- Content-Type-Validierung (8 erlaubte Werte)
- JSON-LD Metadaten-Validierung (inkl. Schema-Check)
- Metadaten-Konsistenz (identifier = data-section)
- Agent-Context-Block-Validierung (einer pro Section)
- data-ref Eindeutigkeit und Pattern-Validierung

**Neue Features:**
- `--schema` Parameter für JSON-Schema-Validierung
- `--strict-mode` für strengere Validierung
- Verbesserte Fehler-Meldungen mit Element-Info

### v1.1 (vorherig)

**Features:**
- ID-Eindeutigkeit (global)
- data-ref Standard-Granularität
- Orphan-Detection
- CSS-Selector-Kompatibilität
- Agent-spezifische Element-Struktur
- Section-Struktur
- Medien-Barrierefreiheit (BFSG)
- `--root-tag` Parameter

---

## Support & Feedback

**Bei Problemen oder Fragen:**
1. Prüfe diese Dokumentation
2. Führe Validierung mit `--verbose` aus
3. Prüfe Beispiel-Sections im Projekt
4. Erstelle Issue mit vollständigem Output

**Fehler im Validator gefunden?**
- Erstelle Bug-Report mit:
  - HTML-Snippet (minimal reproduzierbar)
  - Erwartetes Verhalten
  - Tatsächliches Verhalten
  - Validator-Version

---

## Weiterführende Links

- **JSON-Schema:** https://json-schema.org/
- **Schema.org (JSON-LD):** https://schema.org/TechArticle
- **BeautifulSoup Dokumentation:** https://www.crummy.com/software/BeautifulSoup/
- **BFSG (Barrierefreiheit):** https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/barrierefreiheitsstaerkungsgesetz.html

---

## Anhang: Vollständige Kommandoreferenz

### Basis-Parameter

```bash
# Einfachste Validierung
python validate_html_structure.py index.html

# Mit Scope
python validate_html_structure.py index.html --root-tag "main"

# Mit Schema
python validate_html_structure.py index.html --schema schema.json

# Strict-Mode
python validate_html_structure.py index.html --strict-mode

# Verbose
python validate_html_structure.py index.html --verbose

# Exit-on-Error
python validate_html_structure.py index.html --exit-on-error
```

### Kombinationen

```bash
# Vollständige Validierung (empfohlen)
python validate_html_structure.py index.html \
    --root-tag "main" \
    --schema ../../schema/main-content.schema.json \
    --verbose

# Für CI/CD
python validate_html_structure.py index.html \
    --root-tag "main" \
    --schema ../../schema/main-content.schema.json \
    --exit-on-error

# Entwicklung (tolerant)
python validate_html_structure.py index.html \
    --root-tag "main" \
    --verbose

# Produktion (streng)
python validate_html_structure.py index.html \
    --root-tag "main" \
    --schema ../../schema/main-content.schema.json \
    --strict-mode \
    --exit-on-error
```

### Mehrere Dateien

```bash
# Wildcard
python validate_html_structure.py src/*.html --verbose

# Explizit
python validate_html_structure.py index.html section1.html section2.html

# Mit xargs
find src -name "*.html" | xargs python validate_html_structure.py
```

---

## Quick Reference Card

### Exit-Codes

| Code | Bedeutung |
|------|-----------|
| 0 | Validierung erfolgreich (0 Errors) |
| 1 | Validierung fehlgeschlagen (≥1 Error) |

### Severity-Mapping

| Severity | Symbol | Farbe | Aktion |
|----------|--------|-------|--------|
| error | ❌ | Rot | Muss behoben werden |
| warning | ⚠️ | Orange | Sollte geprüft werden |
| info | ℹ️ | Blau | Informativ |

### Häufigste Fehler

| Fehler | Lösung |
|--------|--------|
| Doppelte ID | ID umbenennen (eindeutig machen) |
| Fehlende data-ref | data-ref hinzufügen |
| Hierarchie >5 | Struktur flacher gestalten |
| h1→h3 Sprung | h2 ergänzen |
| Ungültiger Content-Type | Einen der 8 erlaubten Werte verwenden |
| Fehlende Metadaten | JSON-LD Script hinzufügen |
| Mehrere Agent-Context-Blocks | Nur einen Block pro Section |

---

**Ende der Dokumentation**