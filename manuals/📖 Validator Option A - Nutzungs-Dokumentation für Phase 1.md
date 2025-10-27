# 📖 Validator Option A - Nutzungs-Dokumentation für Phase 1

**Version:** 1.0  
**Modul:** `validator.py`  
**Autor:** Phase 1 Development Team  
**Datum:** 2025-10-27

---

## 📋 Inhaltsverzeichnis

1. [Übersicht](#%C3%BCbersicht)
2. [Installation & Dependencies](#installation--dependencies)
3. [Input & Output](#input--output)
4. [Konfiguration (config.yaml)](#konfiguration-configyaml)
5. [Verwendung im Orchestrator](#verwendung-im-orchestrator)
6. [Standalone-Verwendung](#standalone-verwendung)
7. [Validierungsbereiche im Detail](#validierungsbereiche-im-detail)
8. [Fehlerbehandlung](#fehlerbehandlung)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Übersicht

Der **Validator (Option A)** ist ein Python-Modul zur **Basis-Validierung** von Section-HTML-Dateien in Phase 1. Er prüft:

1. ✅ **JSON-LD** - Schema-Struktur und Pflichtfelder
2. ✅ **HTML** - Basic Wellformedness mit BeautifulSoup
3. ✅ **BFSG** - 5 kritische Barrierefreiheits-Regeln
4. ✅ **Links** - data-ref Syntax-Prüfung
5. ✅ **Terminologie** - keywords-Feld im JSON-LD

**Vorteile:**

- Keine zusätzlichen Dependencies (nur BeautifulSoup)
- Schnelle Ausführung (< 1 Sekunde pro Section)
- Einfach zu debuggen
- Ausreichend für ersten Testlauf

---

## 🔧 Installation & Dependencies

### Python-Dependencies

```bash
# Minimal-Installation (nur für Option A)
pip install beautifulsoup4

# Vollständige Installation (empfohlen)
pip install -r requirements.txt
```

**Inhalt von `requirements.txt`:**

```txt
beautifulsoup4>=4.12.0
PyYAML>=6.0
```

### Verzeichnisstruktur

```
phase1/
├── validator.py              # Validator-Modul (Option A)
├── config.yaml               # Konfiguration
├── output/
│   └── sections/            # Section-HTML-Dateien (INPUT)
│       ├── section-axiom-installation.html
│       ├── section-axiom-case-creation.html
│       └── ...
└── logs/
    └── validation.log       # Log-Datei (OUTPUT)
```

---

## 📥 Input & Output

### Input

**1. Section-HTML-Datei**

- **Pfad:** `output/sections/section-{section-id}.html`
- **Format:** HTML5 mit JSON-LD `<script>`-Tag im `<head>`
- **Beispiel:** `section-axiom-installation.html`

**Minimale HTML-Struktur:**

```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Section Title</title>

    <!-- JSON-LD (PFLICHT) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "axiom-installation",
        "name": "AXIOM Installation",
        "description": "...",
        "learningResourceType": "tutorial",
        "inLanguage": "de",
        "keywords": [
            {"term": "Installation", "language": "de"}
        ]
    }
    </script>
</head>
<body>
    <section id="axiom-installation" lang="de">
        <h1>AXIOM Installation</h1>
        <!-- Content -->
    </section>
</body>
</html>
```

**2. Konfiguration (optional)**

- **Pfad:** `config.yaml`
- **Abschnitt:** `validation:`
- **Siehe:** [Konfiguration](#konfiguration-configyaml)

---

### Output

**1. Validierungsergebnis (Dictionary)**

```python
{
    "valid": True,  # bool - True wenn keine Fehler
    "errors": [     # Liste von Fehler-Objekten
        {
            "type": "json-ld",           # Fehlertyp
            "message": "Pflichtfeld fehlt: name",
            "location": "JSON-LD root"   # Wo der Fehler auftritt
        }
    ],
    "warnings": [   # Liste von Warnungs-Objekten
        {
            "type": "bfsg",
            "message": "Image ohne alt-Text",
            "location": "<img src='...'"
        }
    ]
}
```

**2. Log-Ausgaben**

```
[INFO] 🔍 Validiere output/sections/section-axiom-installation.html...
[INFO] ✅ Validierung erfolgreich
```

**3. Statistiken**

```python
validator.get_stats()
# Returns:
{
    "validated": 10,   # Anzahl validierter Sections
    "errors": 3,       # Gesamtzahl Fehler
    "warnings": 15     # Gesamtzahl Warnungen
}
```

---

## ⚙️ Konfiguration (config.yaml)

### Vollständige Validator-Konfiguration

```yaml
# config.yaml

validation:
  # Verhalten bei Fehlern
  fail_on_errors: true          # Workflow bei Fehler abbrechen?

  # Validierungsbereiche (einzeln aktivierbar)
  json_ld_validation: true      # JSON-LD Schema prüfen
  html_validation: true         # HTML Wellformedness
  bfsg_validation: true         # Barrierefreiheit (5 Regeln)
  link_validation: true         # data-ref Syntax
  terminology_validation: true  # keywords vorhanden?

# Logging
logging:
  level: "INFO"                 # DEBUG, INFO, WARNING, ERROR
  file: "logs/validation.log"   # Log-Datei
  console: true                 # Console-Ausgabe
```

### Konfigurationsoptionen im Detail

| Option                   | Typ  | Default | Beschreibung                 |
| ------------------------ | ---- | ------- | ---------------------------- |
| `fail_on_errors`         | bool | `true`  | Workflow bei Fehler stoppen? |
| `json_ld_validation`     | bool | `true`  | JSON-LD Schema prüfen        |
| `html_validation`        | bool | `true`  | HTML Wellformedness          |
| `bfsg_validation`        | bool | `true`  | BFSG-Checks (5 Regeln)       |
| `link_validation`        | bool | `true`  | data-ref Syntax              |
| `terminology_validation` | bool | `true`  | keywords-Feld prüfen         |

**Tipp:** Für schnellere Iterationen während der Entwicklung kannst du `fail_on_errors: false` setzen.

---

## 🔄 Verwendung im Orchestrator

### Integration in `orchestrator.py`

Der Validator wird automatisch vom Orchestrator aufgerufen:

```python
# orchestrator.py (vereinfacht)

from validator import Validator

# 1. Initialisierung
validator = Validator(config=config['validation'])

# 2. Workflow-Schleife
for section in sections:
    # ... (Kontext extrahieren, Prompt generieren) ...

    # 3. Warte auf KI-Output
    input("📝 Drücke Enter wenn Section fertig ist...")

    # 4. Validiere Output
    html_path = f"output/sections/section-{section_id}.html"
    result = validator.validate_section_html(html_path)

    # 5. Prüfe Ergebnis
    if not result['valid']:
        print(f"❌ Validierung fehlgeschlagen:")
        for error in result['errors']:
            print(f"   - {error['type']}: {error['message']}")

        if config['validation']['fail_on_errors']:
            print("⚠️  Workflow gestoppt (fail_on_errors=true)")
            break
    else:
        print("✅ Validierung erfolgreich")
```

### Workflow-Diagramm

```
┌─────────────────────────────────────────────────────────────┐
│ ORCHESTRATOR - Phase 1 Workflow                            │
└─────────────────────────────────────────────────────────────┘
                           │
    ┌──────────────────────┼──────────────────────┐
    │                      │                      │
    ▼                      ▼                      ▼
┌─────────┐          ┌─────────┐          ┌──────────┐
│ Context │          │ Prompt  │          │ KI macht │
│Extract  │   ──►    │Generate │   ──►    │ Section  │
└─────────┘          └─────────┘          └──────────┘
                                                 │
                                                 ▼
                                          ┌──────────┐
                                          │ OUTPUT:  │
                                          │ section- │
                                          │ {id}.html│
                                          └──────────┘
                                                 │
                                                 ▼
                                          ┌──────────┐
                                          │VALIDATOR │ ◄── config.yaml
                                          │(Option A)│
                                          └──────────┘
                                                 │
                                    ┌────────────┼────────────┐
                                    │                         │
                                    ▼                         ▼
                              ┌─────────┐             ┌──────────┐
                              │ ✅ VALID │             │ ❌ ERRORS │
                              │Continue │             │  Stop?   │
                              └─────────┘             └──────────┘
```

---

## 🖥️ Standalone-Verwendung

### Methode 1: Python-Skript

```python
from validator import Validator

# Initialisierung
validator = Validator(config={
    "fail_on_errors": True,
    "json_ld_validation": True,
    "html_validation": True,
    "bfsg_validation": True,
    "link_validation": True,
    "terminology_validation": True
})

# Validiere eine Datei
result = validator.validate_section_html(
    "output/sections/section-axiom-installation.html"
)

# Ergebnis prüfen
if result['valid']:
    print("✅ Validierung erfolgreich")
else:
    print(f"❌ {len(result['errors'])} Fehler gefunden:")
    for error in result['errors']:
        print(f"  [{error['type']}] {error['message']}")
        print(f"    Ort: {error['location']}")

# Statistiken
stats = validator.get_stats()
print(f"\n📊 Statistiken: {stats}")
```

### Methode 2: Command-Line-Wrapper

Erstelle `validate_section.py`:

```python
#!/usr/bin/env python3
"""Command-line wrapper für Validator"""

import sys
import yaml
from validator import Validator

def main():
    if len(sys.argv) < 2:
        print("Usage: python validate_section.py <html-file>")
        sys.exit(1)

    html_path = sys.argv[1]

    # Lade Config
    with open('config.yaml', 'r') as f:
        config = yaml.safe_load(f)

    # Validiere
    validator = Validator(config=config.get('validation', {}))
    result = validator.validate_section_html(html_path)

    # Output
    if result['valid']:
        print("✅ VALID")
        sys.exit(0)
    else:
        print(f"❌ INVALID ({len(result['errors'])} errors)")
        for error in result['errors']:
            print(f"  [{error['type']}] {error['message']}")
        sys.exit(1)

if __name__ == '__main__':
    main()
```

**Verwendung:**

```bash
python validate_section.py output/sections/section-axiom-installation.html
```

---

## 🔍 Validierungsbereiche im Detail

### 1. JSON-LD Validierung

**Was wird geprüft:**

- JSON-LD `<script>`-Tag vorhanden
- JSON ist valide (kein Syntax-Fehler)
- Pflichtfelder vorhanden:
  - `@context` (String)
  - `@type` (String)
  - `identifier` (String)
  - `name` (String)
  - `description` (String)
  - `learningResourceType` (String)
  - `inLanguage` (String)
- Datentypen korrekt

**Optionale Felder (Warnung wenn fehlend):**

- `keywords`
- `about`
- `educationalLevel`
- `timeRequired`

**Häufige Fehler:**

```javascript
// ❌ FEHLER: Pflichtfeld fehlt
{
    "@context": "https://schema.org",
    "@type": "LearningResource",
    // identifier fehlt! ← FEHLER
    "name": "AXIOM Installation"
}

// ✅ KORREKT
{
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "identifier": "axiom-installation",
    "name": "AXIOM Installation",
    "description": "Installation von AXIOM Examine",
    "learningResourceType": "tutorial",
    "inLanguage": "de"
}
```

---

### 2. HTML Wellformedness

**Was wird geprüft:**

- HTML kann von BeautifulSoup geparst werden
- Keine schwerwiegenden Syntax-Fehler
- `<section>`-Tag vorhanden
- `id`-Attribut auf `<section>` vorhanden

**Typische Warnungen:**

- Ungeschlossene Tags
- Fehlende erforderliche Attribute
- Verwaiste Closing-Tags

**Beispiel:**

```html
<!-- ❌ WARNUNG: Ungeschlossenes Tag -->
<section id="axiom-installation">
    <h2>Installation
    <!-- </h2> fehlt -->
</section>

<!-- ✅ KORREKT -->
<section id="axiom-installation">
    <h2>Installation</h2>
</section>
```

---

### 3. BFSG Basis-Checks (5 Regeln)

#### Regel 1: Images haben alt-Text

```html
<!-- ❌ FEHLER: Kein alt-Attribut -->
<img src="axiom-interface.png">

<!-- ✅ KORREKT -->
<img src="axiom-interface.png" alt="AXIOM Examine Hauptoberfläche">
```

#### Regel 2: Sections haben lang-Attribut

```html
<!-- ❌ WARNUNG: Kein lang -->
<section id="axiom-installation">
    <h2>Installation</h2>
</section>

<!-- ✅ KORREKT -->
<section id="axiom-installation" lang="de">
    <h2>Installation</h2>
</section>
```

#### Regel 3: Inputs haben Labels

```html
<!-- ❌ WARNUNG: Input ohne Label -->
<input type="text" id="username">

<!-- ✅ KORREKT: Mit Label -->
<label for="username">Benutzername:</label>
<input type="text" id="username">

<!-- ✅ ALTERNATIV: Mit aria-label -->
<input type="text" id="username" aria-label="Benutzername">
```

#### Regel 4: Links haben aussagekräftigen Text

```html
<!-- ❌ WARNUNG: Nicht-aussagekräftig -->
<a href="#details">hier klicken</a>

<!-- ✅ KORREKT -->
<a href="#details">Details zur Installation anzeigen</a>
```

#### Regel 5: Heading-Hierarchie

```html
<!-- ❌ WARNUNG: Sprung h1 → h3 -->
<h1>Hauptüberschrift</h1>
<h3>Unterüberschrift</h3>  <!-- Sollte h2 sein -->

<!-- ✅ KORREKT -->
<h1>Hauptüberschrift</h1>
<h2>Unterüberschrift</h2>
<h3>Weitere Untergliederung</h3>
```

---

### 4. Link-Validierung (data-ref Syntax)

**Was wird geprüft:**

- Format: `section-id` oder `section-id#heading-id`
- Nur lowercase + Bindestriche erlaubt
- Keine Self-References
- Keine doppelten Bindestriche

**Valides Format:**

```
^[a-z][a-z0-9-]*(?:#[a-z][a-z0-9-]*)?$
```

**Beispiele:**

```html
<!-- ✅ KORREKT -->
<a data-ref="axiom-installation">Installation</a>
<a data-ref="axiom-installation#prerequisites">Voraussetzungen</a>

<!-- ❌ FEHLER: Großbuchstaben -->
<a data-ref="AXIOM-Installation">...</a>

<!-- ❌ FEHLER: Leerzeichen -->
<a data-ref="axiom installation">...</a>

<!-- ⚠️  WARNUNG: Self-Reference -->
<!-- In section-axiom-installation.html: -->
<a data-ref="axiom-installation">...</a>

<!-- ⚠️  WARNUNG: Doppelte Bindestriche -->
<a data-ref="axiom--installation">...</a>
```

---

### 5. Terminologie-Validierung

**Was wird geprüft:**

- `keywords`-Feld im JSON-LD vorhanden
- Mindestens 1 Keyword
- Jedes Keyword hat `term` und `language`

**Beispiel:**

```javascript
// ❌ WARNUNG: keywords fehlt
{
    "@context": "https://schema.org",
    "identifier": "axiom-installation"
    // keywords fehlt!
}

// ✅ KORREKT
{
    "@context": "https://schema.org",
    "identifier": "axiom-installation",
    "keywords": [
        {"term": "Installation", "language": "de"},
        {"term": "AXIOM Examine", "language": "de"},
        {"term": "Magnet Forensics", "language": "en"}
    ]
}

// ❌ FEHLER: term fehlt
{
    "keywords": [
        {"language": "de"}  // term fehlt!
    ]
}
```

---

## 🚨 Fehlerbehandlung

### Fehlertypen

| Typ           | Severity | Bedeutung                   |
| ------------- | -------- | --------------------------- |
| `file`        | ERROR    | Datei nicht gefunden/lesbar |
| `json-ld`     | ERROR    | JSON-LD Schema-Fehler       |
| `html`        | ERROR    | HTML Syntax-Fehler          |
| `bfsg`        | WARNING  | Barrierefreiheits-Warnung   |
| `link`        | ERROR    | data-ref Format-Fehler      |
| `terminology` | WARNING  | keywords-Problem            |

### Workflow bei Fehlern

**Option 1: Workflow stoppen (fail_on_errors=true)**

```python
result = validator.validate_section_html(html_path)

if not result['valid']:
    logger.error("❌ Validierung fehlgeschlagen!")
    for error in result['errors']:
        logger.error(f"  [{error['type']}] {error['message']}")

    if config['validation']['fail_on_errors']:
        raise ValidationError("Workflow gestoppt wegen Validierungsfehlern")
```

**Option 2: Workflow fortsetzen (fail_on_errors=false)**

```python
result = validator.validate_section_html(html_path)

if not result['valid']:
    logger.warning("⚠️  Validierung mit Fehlern, setze fort...")
    # Speichere Fehler für späteren Review
    error_log[section_id] = result['errors']
    # Workflow läuft weiter
```

---

## 🔧 Troubleshooting

### Problem 1: "Datei nicht gefunden"

**Fehlermeldung:**

```
ERROR: Datei nicht gefunden: output/sections/section-axiom-installation.html
```

**Lösung:**

1. Prüfe Dateipfad: `ls output/sections/`
2. Prüfe Dateinamen-Format: `section-{id}.html`
3. Prüfe Working Directory: `pwd`

---

### Problem 2: "JSON-LD ist nicht valide"

**Fehlermeldung:**

```
ERROR [json-ld]: JSON-LD ist nicht valide: Expecting ',' delimiter: line 5 column 1
```

**Lösung:**

1. Validiere JSON mit Online-Tool: https://jsonlint.com/
2. Häufige Fehler:
   - Fehlendes Komma zwischen Feldern
   - Trailing Comma am Ende
   - Falsche Quotes (`'` statt `"`)

**Korrektur:**

```javascript
// ❌ FEHLER: Trailing Comma
{
    "identifier": "axiom-installation",
    "name": "Installation",  // ← Komma entfernen
}

// ✅ KORREKT
{
    "identifier": "axiom-installation",
    "name": "Installation"
}
```

---

### Problem 3: BeautifulSoup-Warnung

**Warnung:**

```
UserWarning: No parser was explicitly specified, so I'm using the best available HTML parser for this system
```

**Lösung:** Installation eines expliziten Parsers:

```bash
pip install lxml
```

Dann in Code:

```python
soup = BeautifulSoup(html_content, 'lxml')  # Statt 'html.parser'
```

---

### Problem 4: Statistiken zeigen 0 validated

**Symptom:**

```python
validator.get_stats()
# {'validated': 0, 'errors': 0, 'warnings': 0}
```

**Ursache:** Statistiken wurden zurückgesetzt oder Validator neu initialisiert

**Lösung:**

```python
# Statistiken zurücksetzen nur wenn gewünscht
validator.reset_stats()

# Ansonsten: Validator-Instanz im Workflow wiederverwenden
validator = Validator(config)  # Einmal initialisieren
for section in sections:
    validator.validate_section_html(...)  # Stats akkumulieren
```

---

## 📊 Best Practices

### 1. Logging-Level anpassen

**Development:**

```yaml
logging:
  level: "DEBUG"  # Alle Details
```

**Production:**

```yaml
logging:
  level: "WARNING"  # Nur Probleme
```

---

### 2. Validierung in Pre-Commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "🔍 Validiere Sections vor Commit..."

python validate_section.py output/sections/*.html

if [ $? -ne 0 ]; then
    echo "❌ Validierung fehlgeschlagen. Commit abgebrochen."
    exit 1
fi

echo "✅ Alle Sections valide"
```

---

### 3. Batch-Validierung

```python
import glob

validator = Validator(config)

section_files = glob.glob("output/sections/section-*.html")
failed_sections = []

for html_path in section_files:
    result = validator.validate_section_html(html_path)
    if not result['valid']:
        failed_sections.append(html_path)

print(f"📊 Validiert: {len(section_files)}")
print(f"❌ Fehlgeschlagen: {len(failed_sections)}")

if failed_sections:
    print("\nFehlgeschlagene Sections:")
    for path in failed_sections:
        print(f"  - {path}")
```

---

## 🎯 Zusammenfassung

**Validator Option A bietet:**

- ✅ Basis-Validierung für Phase 1
- ✅ Schnelle Ausführung
- ✅ Einfache Integration
- ✅ Klare Fehlermeldungen
- ✅ Flexible Konfiguration

**Für 3-Tage-Deadline ideal:** Keine komplexen Dependencies, sofort einsatzbereit.

**Next Steps:**

1. Teste Validator mit erster generierter Section
2. Passe `config.yaml` bei Bedarf an
3. Iteriere basierend auf Validierungsergebnissen

---


