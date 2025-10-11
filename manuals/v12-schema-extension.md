# V12: JSON-Schema-Erweiterung für Metadaten & Content-Types

**Priorität:** 🟠 Hoch (Validierungs-kritisch)  
**Aufwand:** 2-3 Stunden  
**Status:** Notwendig für V07 und V11

---

## Feature-Beschreibung

Erweiterung des bestehenden `main-content.schema.json` zur Validierung von:

1. **Content-Metadaten** (aus V11):
   - JSON-LD Struktur nach Schema.org
   - Vereinfachte data-meta-* Attribute
   - Validierung von Versionsnummern, Datumsangaben, etc.

2. **Content-Type-Attribute** (aus V07):
   - `data-content-type` mit Enumerator
   - Werte: `instruction`, `explanation`, `visual`, `background`, `example`, `warning`, `tip`

3. **Erweiterte Section-Attribute**:
   - Granularität (`data-ref`)
   - Agent-Kontext (`data-context-id`)
   - Detail-Level (`detail-level-1/2/3`)

**Ziel:** Vollständige Schema-Validierung aller HTML-Strukturen im `<main>` Bereich

---

## Aktueller Stand des Schemas

Das bestehende `main-content.schema.json` validiert aktuell:
- ✅ Basis-Metadaten (title, language)
- ✅ Section-Struktur (id, title, level)
- ✅ Content-Blöcke (text, detail-level, list, interactive)

**Was fehlt:**
- ❌ Content-Metadaten (JSON-LD)
- ❌ Content-Type-Attribute
- ❌ data-ref Granularität
- ❌ Agent-Kontext-Attribute
- ❌ Media-Elemente mit Accessibility

---

## Erweiterte Schema-Definition

### Vollständiges erweitertes Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/froiloc/WebAssistantForensics/schema/main-content.schema.json",
  "title": "WebAssistantForensics Main Content Structure (Extended)",
  "description": "Extended schema for validating content structure with metadata and content-type attributes",
  "version": "2.0.0",
  "type": "object",
  
  "properties": {
    "metadata": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "minLength": 1,
          "description": "Document title"
        },
        "language": {
          "type": "string",
          "pattern": "^[a-z]{2}(-[A-Z]{2})?$",
          "description": "Language code (e.g., de-DE)"
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+(\\.\\d+)?$",
          "description": "Document version (semver)"
        },
        "buildNumber": {
          "type": "integer",
          "minimum": 1,
          "description": "Build number"
        }
      },
      "required": ["title", "language"]
    },
    
    "sections": {
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/definitions/section"
      }
    }
  },
  
  "required": ["metadata", "sections"],
  
  "definitions": {
    
    "section": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "minLength": 1,
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "Unique section identifier"
        },
        "dataSection": {
          "type": "string",
          "minLength": 1,
          "description": "data-section attribute value"
        },
        "title": {
          "type": "string",
          "minLength": 1,
          "description": "Section title"
        },
        "level": {
          "type": "integer",
          "minimum": 1,
          "maximum": 6,
          "description": "Heading level (h1-h6)"
        },
        "metadata": {
          "$ref": "#/definitions/contentMetadata",
          "description": "Optional content metadata (V11)"
        },
        "content": {
          "type": "array",
          "items": {
            "oneOf": [
              {"$ref": "#/definitions/contentBlock"},
              {"$ref": "#/definitions/detailLevel"},
              {"$ref": "#/definitions/mediaElement"}
            ]
          }
        }
      },
      "required": ["id", "dataSection", "title", "level", "content"]
    },
    
    "contentMetadata": {
      "type": "object",
      "description": "Content metadata following Schema.org TechArticle spec",
      "properties": {
        "@context": {
          "type": "string",
          "const": "https://schema.org",
          "description": "Schema.org context"
        },
        "@type": {
          "type": "string",
          "enum": ["TechArticle", "Article", "HowTo"],
          "description": "Content type"
        },
        "identifier": {
          "type": "string",
          "minLength": 1,
          "description": "Unique identifier (matches section id)"
        },
        "name": {
          "type": "string",
          "minLength": 1,
          "description": "Content name/title"
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+$",
          "description": "Content version (e.g., 2.1)"
        },
        "dateCreated": {
          "type": "string",
          "format": "date-time",
          "description": "ISO 8601 creation date"
        },
        "dateModified": {
          "type": "string",
          "format": "date-time",
          "description": "ISO 8601 modification date"
        },
        "author": {
          "$ref": "#/definitions/person",
          "description": "Content author"
        },
        "editor": {
          "$ref": "#/definitions/person",
          "description": "Content editor"
        },
        "maintainer": {
          "$ref": "#/definitions/person",
          "description": "Content maintainer"
        },
        "reviewer": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/reviewer"
          },
          "description": "Content reviewers"
        },
        "inLanguage": {
          "type": "string",
          "pattern": "^[a-z]{2}-[A-Z]{2}$",
          "description": "Content language"
        },
        "keywords": {
          "type": "array",
          "items": {"type": "string"},
          "description": "Content keywords"
        },
        "about": {
          "type": "string",
          "description": "Content description"
        },
        "expires": {
          "type": "string",
          "format": "date-time",
          "description": "Expiration date"
        },
        "isBasedOn": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/source"
          },
          "description": "Source references"
        },
        "additionalProperty": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/propertyValue"
          },
          "description": "Additional custom properties"
        },
        "changeLog": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/changeLogEntry"
          },
          "description": "Change history"
        }
      },
      "required": ["@context", "@type", "identifier", "name", "version", "dateCreated", "author"]
    },
    
    "person": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string",
          "const": "Person"
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "jobTitle": {
          "type": "string"
        },
        "email": {
          "type": "string",
          "format": "email"
        }
      },
      "required": ["@type", "name"]
    },
    
    "reviewer": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string",
          "const": "Person"
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "jobTitle": {
          "type": "string"
        },
        "reviewDate": {
          "type": "string",
          "format": "date"
        }
      },
      "required": ["@type", "name"]
    },
    
    "source": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string",
          "enum": ["WebPage", "CreativeWork", "ScholarlyArticle"]
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "url": {
          "type": "string",
          "format": "uri"
        },
        "identifier": {
          "type": "string"
        },
        "author": {
          "type": "string"
        },
        "datePublished": {
          "type": "string",
          "format": "date"
        }
      },
      "required": ["@type", "name"]
    },
    
    "propertyValue": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string",
          "const": "PropertyValue"
        },
        "name": {
          "type": "string",
          "minLength": 1,
          "description": "Property name (e.g., promptVersion, reviewStatus)"
        },
        "value": {
          "type": "string",
          "description": "Property value"
        }
      },
      "required": ["@type", "name", "value"]
    },
    
    "changeLogEntry": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string",
          "format": "date",
          "description": "Change date (YYYY-MM-DD)"
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+$",
          "description": "Version number"
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "description": "Change description"
        },
        "author": {
          "type": "string",
          "minLength": 1,
          "description": "Author of change"
        }
      },
      "required": ["date", "version", "description", "author"]
    },
    
    "contentBlock": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["text", "list", "interactive", "warning", "tip"],
          "description": "Content block type"
        },
        "dataRef": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "data-ref attribute for granular addressing"
        },
        "contentType": {
          "type": "string",
          "enum": ["instruction", "explanation", "visual", "background", "example", "warning", "tip", "note"],
          "description": "data-content-type for Show-Only mode (V07)"
        },
        "contextId": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "data-context-id for agent system"
        },
        "content": {
          "type": "string",
          "minLength": 1,
          "description": "Block content"
        },
        "ariaLabel": {
          "type": "string",
          "description": "Accessibility label"
        }
      },
      "required": ["type", "content"]
    },
    
    "detailLevel": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "detail-level"
        },
        "level": {
          "type": "integer",
          "minimum": 1,
          "maximum": 3,
          "description": "Detail level (1=basic, 2=intermediate, 3=advanced)"
        },
        "dataRef": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "data-ref attribute"
        },
        "contentType": {
          "type": "string",
          "enum": ["instruction", "explanation", "visual", "background", "example", "warning", "tip", "note"],
          "description": "data-content-type attribute"
        },
        "children": {
          "type": "array",
          "items": {
            "oneOf": [
              {"$ref": "#/definitions/contentBlock"},
              {"$ref": "#/definitions/mediaElement"}
            ]
          }
        }
      },
      "required": ["type", "level", "children"]
    },
    
    "mediaElement": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["image", "video", "figure"],
          "description": "Media type"
        },
        "dataMediaType": {
          "type": "string",
          "enum": ["image", "video", "diagram"],
          "description": "data-media-type attribute"
        },
        "src": {
          "type": "string",
          "minLength": 1,
          "description": "Media source path"
        },
        "alt": {
          "type": "string",
          "minLength": 10,
          "description": "Alternative text (min 10 characters for accessibility)"
        },
        "caption": {
          "type": "string",
          "description": "Figure caption"
        },
        "dataRef": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "data-ref attribute"
        },
        "loading": {
          "type": "string",
          "enum": ["lazy", "eager"],
          "default": "lazy",
          "description": "Loading strategy"
        },
        "fullsize": {
          "type": "string",
          "description": "data-fullsize path for thumbnails"
        },
        "subtitles": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/videoTrack"
          },
          "description": "Video subtitle tracks"
        }
      },
      "required": ["type", "src", "alt"]
    },
    
    "videoTrack": {
      "type": "object",
      "properties": {
        "kind": {
          "type": "string",
          "enum": ["subtitles", "captions", "descriptions"],
          "description": "Track kind"
        },
        "src": {
          "type": "string",
          "minLength": 1,
          "description": "VTT file path"
        },
        "srclang": {
          "type": "string",
          "pattern": "^[a-z]{2}$",
          "description": "Track language code"
        },
        "label": {
          "type": "string",
          "minLength": 1,
          "description": "Track label"
        },
        "default": {
          "type": "boolean",
          "description": "Default track"
        }
      },
      "required": ["kind", "src", "srclang", "label"]
    }
  }
}
```

---

## Vereinfachte Metadaten-Alternative

Für Sections, die nicht das volle JSON-LD Schema benötigen:

```json
"simplifiedMetadata": {
  "type": "object",
  "properties": {
    "dataMetaVersion": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+$",
      "description": "data-meta-version attribute"
    },
    "dataMetaCreated": {
      "type": "string",
      "format": "date",
      "description": "data-meta-created attribute (YYYY-MM-DD)"
    },
    "dataMetaModified": {
      "type": "string",
      "format": "date",
      "description": "data-meta-modified attribute"
    },
    "dataMetaAuthor": {
      "type": "string",
      "minLength": 1,
      "description": "data-meta-author attribute"
    },
    "dataMetaReviewer": {
      "type": "string",
      "description": "data-meta-reviewer attribute"
    },
    "dataMetaStatus": {
      "type": "string",
      "enum": ["draft", "review", "approved", "outdated"],
      "description": "data-meta-status attribute"
    },
    "dataMetaPrompt": {
      "type": "string",
      "description": "data-meta-prompt attribute (prompt version)"
    },
    "dataMetaExpires": {
      "type": "string",
      "format": "date",
      "description": "data-meta-expires attribute"
    }
  },
  "required": ["dataMetaVersion", "dataMetaCreated", "dataMetaAuthor"]
}
```

---

## Content-Type Enumerator (V07)

**Vollständige Liste der Content-Types:**

```json
{
  "contentType": {
    "type": "string",
    "enum": [
      "instruction",     // Handlungsanweisungen (SHOW in Show-Only)
      "explanation",     // Erklärungen (HIDE in Show-Only)
      "visual",         // Bilder, Diagramme (SHOW in Show-Only)
      "background",     // Hintergrundinformationen (HIDE in Show-Only)
      "example",        // Beispiele (CONDITIONAL)
      "warning",        // Warnungen (ALWAYS SHOW)
      "tip",           // Tipps (CONDITIONAL)
      "note"           // Notizen (CONDITIONAL)
    ],
    "description": "Categorizes content for display modes"
  }
}
```

**Anwendungsregeln:**

| Content-Type | Standard | Show-Only | Text-Only | Beschreibung |
|--------------|----------|-----------|-----------|--------------|
| `instruction` | ✅ | ✅ | ✅ | Praktische Schritte |
| `explanation` | ✅ | ❌ | ✅ | Theoretischer Hintergrund |
| `visual` | ✅ | ✅ | ❌ | Bilder, Diagramme |
| `background` | ✅ | ❌ | ✅ | Kontext-Informationen |
| `example` | ✅ | ⚠️ | ✅ | Beispiele (optional) |
| `warning` | ✅ | ✅ | ✅ | Wichtige Warnungen |
| `tip` | ✅ | ⚠️ | ✅ | Best Practice Tipps |
| `note` | ✅ | ⚠️ | ✅ | Zusätzliche Hinweise |

---

## Validierungs-Regeln

### 1. Pflichtfelder pro Section

**Minimum (ohne Metadaten):**
```json
{
  "id": "required",
  "dataSection": "required",
  "title": "required",
  "level": "required",
  "content": "required (minItems: 1)"
}
```

**Mit Metadaten (empfohlen):**
```json
{
  "metadata": {
    "identifier": "required",
    "name": "required",
    "version": "required",
    "dateCreated": "required",
    "author": "required"
  }
}
```

### 2. Content-Type Konsistenz

**Regel:** Wenn ein Element `data-content-type` hat, müssen alle Geschwister-Elemente ebenfalls eins haben:

```javascript
// Valide:
<div class="detail-level-1" data-content-type="instruction">
  <p data-content-type="instruction">Schritt 1</p>
  <p data-content-type="explanation">Weil...</p>
</div>

// Invalide (inkonsistent):
<div class="detail-level-1">
  <p data-content-type="instruction">Schritt 1</p>
  <p>Keine Typisierung</p>  <!-- Fehler! -->
</div>
```

### 3. Metadaten-Konsistenz

**Regel:** `metadata.identifier` muss mit `section.id` übereinstimmen:

```json
{
  "id": "step1",
  "metadata": {
    "identifier": "step1"  // MUSS gleich sein!
  }
}
```

### 4. Medien-Accessibility

**Regel:** Alle `<img>` Elemente brauchen `alt`-Text mit mindestens 10 Zeichen:

```json
{
  "type": "image",
  "src": "media/screenshot.png",
  "alt": "AXIOM Process Export-Dialog mit markierten Schaltflächen"  // ✅ >10 Zeichen
}
```

---

## Implementierung

### Schritt 1: Schema-Datei ersetzen

**Datei:** `schema/main-content.schema.json`

```bash
# Backup erstellen
cp schema/main-content.schema.json schema/main-content.schema.json.backup

# Neues Schema einfügen
# (Vollständiges Schema von oben kopieren)
```

### Schritt 2: Validierungs-Script anpassen

**In `validate_html_structure.py` erweitern:**

```python
def _validate_content_types(self) -> None:
    """Validiert Content-Type Konsistenz"""
    if self.verbose:
        print("\n🔍 Validiere Content-Type Attribute...")
    
    sections_with_types = self.validation_scope.find_all(attrs={'data-content-type': True})
    
    for element in sections_with_types:
        parent = element.parent
        siblings = parent.find_all(recursive=False)
        
        # Prüfe ob alle Geschwister content-type haben
        without_type = [s for s in siblings if not s.get('data-content-type')]
        
        if without_type:
            self._add_result(
                False,
                f"Inkonsistente content-type Nutzung: {len(without_type)} Elemente ohne Typ",
                element_info=self._get_element_info(parent),
                severity="warning"
            )

def _validate_metadata_consistency(self) -> None:
    """Validiert Metadaten-Konsistenz"""
    if self.verbose:
        print("\n🔍 Validiere Metadaten-Konsistenz...")
    
    sections = self.validation_scope.find_all('section', class_='content-section')
    
    for section in sections:
        section_id = section.get('data-section') or section.get('id')
        
        # JSON-LD Metadaten prüfen
        metadata_script = section.find('script', class_='section-metadata')
        if metadata_script:
            try:
                import json
                metadata = json.loads(metadata_script.string)
                
                # Prüfe identifier matching
                if metadata.get('identifier') != section_id:
                    self._add_result(
                        False,
                        f"Metadaten identifier '{metadata.get('identifier')}' stimmt nicht mit section-id '{section_id}' überein",
                        element_info=self._get_element_info(section),
                        severity="error"
                    )
                    
                # Prüfe Pflichtfelder
                required = ['@context', '@type', 'identifier', 'name', 'version', 'dateCreated', 'author']
                missing = [f for f in required if f not in metadata]
                
                if missing:
                    self._add_result(
                        False,
                        f"Fehlende Pflichtfelder in Metadaten: {', '.join(missing)}",
                        element_info=self._get_element_info(section),
                        severity="error"
                    )
                    
            except json.JSONDecodeError:
                self._add_result(
                    False,
                    "Ungültiges JSON in section-metadata",
                    element_info=self._get_element_info(section),
                    severity="error"
                )
```

### Schritt 3: Validierung erweitern

**In `validate_all()` Methode hinzufügen:**

```python
def validate_all(self) -> ValidationSummary:
    """Führt alle Validierungen durch"""
    if not self.load_html():
        return self._create_summary()
    
    # Bestehende Validierungen
    self._validate_id_uniqueness()
    self._validate_standard_granularity()
    self._validate_orphan_elements()
    self._validate_css_selector_compatibility()
    self._validate_agent_elements()
    self._validate_section_structure()
    self._validate_media_accessibility()
    
    # NEU: V12 Validierungen
    self._validate_content_types()
    self._validate_metadata_consistency()
    
    return self._create_summary()
```

---

## Testing

### Test 1: Validiere Schema-Konformität

```bash
# JSON-Schema Validator installieren
pip install jsonschema

# Python-Script für Schema-Test
python3 << EOF
import json
from jsonschema import validate

with open('schema/main-content.schema.json') as f:
    schema = json.load(f)

# Test-Daten
test_data = {
    "metadata": {
        "title": "Test",
        "language": "de-DE"
    },
    "sections": [{
        "id": "test1",
        "dataSection": "test1",
        "title": "Test Section",
        "level": 2,
        "content": []
    }]
}

validate(instance=test_data, schema=schema)
print("✅ Schema ist valide!")
EOF
```

### Test 2: HTML-Validierung mit neuem Schema

```bash
cd tools/validation
python validate_html_structure.py ../../src/index.html \
    --root-tag "main" \
    --verbose
```

**Erwartete Ausgabe:**
```
🔍 Validiere Content-Type Attribute...
🔍 Validiere Metadaten-Konsistenz...
✅ Alle Validierungen erfolgreich
```

### Test 3: Metadaten-Section testen

**Erstelle Test-Section:**

```html
<section class="content-section"
         id="test-section"
         data-section="test-section"
         data-title="Test mit Metadaten">
    
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": "test-section",
        "name": "Test mit Metadaten",
        "version": "1.0",
        "dateCreated": "2025-10-08T10:00:00Z",
        "author": {
            "@type": "Person",
            "name": "Test Autor"
        }
    }
    </script>
    
    <h2>Test Überschrift</h2>
    <div data-content-type="instruction">Testanweisung</div>
</section>
```

**Validierung:**
```bash
python validate_html_structure.py test.html --root-tag "main" -v
```

---

## Vorteile

✅ **Vollständige Validierung:** Alle neuen Features (V07, V11) werden abgedeckt  
✅ **Frühe Fehlererkennung:** Schema-Fehler vor Deployment  
✅ **Dokumentation:** Schema dient als Referenz für HTML-Struktur  
✅ **Automatisierung:** CI/CD Integration möglich  
✅ **Konsistenz:** Einheitliche Datenstrukturen  
✅ **Tooling:** JSON-Schema wird von vielen Editoren unterstützt

---

## Integration in CI/CD

### GitHub Actions Workflow

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
        pip install beautifulsoup4 jsonschema lxml
    
    - name: Validate HTML against schema
      run: |
        cd tools/validation
        python validate_html_structure.py ../../src/index.html \
          --root-tag "main" \
          --exit-on-error
    
    - name: Validate Agent JSON
      run: |
        cd tools/validation
        python validate_agent_json.py \
          ../../src/agent-dialogs.json \
          ../../src/index.html \
          --schema ../../schema/agent-dialogs.schema.json \
          --root-tag "main" \
          --exit-on-error
```

---

## Zusammenfassung

Das **JSON-Schema-Erweiterung** (V12) schafft die technische Grundlage für:

- ✅ **V07 (Show-Only Modus):** Validierung der Content-Type-Attribute
- ✅ **V11 (Metadaten-System):** Validierung der JSON-LD Struktur
- ✅ **Konsistenz:** Einheitliche Datenstrukturen im gesamten Projekt
- ✅ **Qualitätssicherung:** Automatische Fehlerprüfung vor Deployment
- ✅ **Dokumentation:** Schema als lebende Referenz

**Aufwand:** 2-3 Stunden  
**Abhängigkeiten:** Grundlage für V07 und V11  
**ROI:** Sehr hoch - verhindert strukturelle Fehler

---

## Migration bestehender Sections

### Migrations-Script

Für die Umstellung bestehender Sections auf das neue Schema:

```python
#!/usr/bin/env python3
"""
migrate_sections.py - Migriert bestehende Sections zum neuen Schema
"""

import re
from pathlib import Path
from bs4 import BeautifulSoup
from datetime import datetime

def migrate_section_to_schema(section_element, build_number):
    """Fügt Metadaten und Content-Types zu Section hinzu"""
    
    # Extract section info
    section_id = section_element.get('data-section') or section_element.get('id')
    section_title = section_element.get('data-title')
    
    if not section_title:
        h2 = section_element.find('h2')
        section_title = h2.get_text() if h2 else 'Unbenannt'
    
    # Erstelle Basis-Metadaten
    metadata = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": section_id,
        "name": section_title,
        "version": "1.0",
        "dateCreated": datetime.now().isoformat(),
        "dateModified": datetime.now().isoformat(),
        "author": {
            "@type": "Person",
            "name": "Migration Script",
            "jobTitle": "Automated"
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "reviewStatus",
                "value": "draft"
            },
            {
                "@type": "PropertyValue",
                "name": "migratedFrom",
                "value": f"build-{build_number}"
            }
        ],
        "changeLog": [
            {
                "date": datetime.now().strftime("%Y-%m-%d"),
                "version": "1.0",
                "description": "Automatische Migration zu Schema v2.0",
                "author": "Migration Script"
            }
        ]
    }
    
    # JSON-LD Script erstellen
    import json
    metadata_script = section_element.new_tag('script')
    metadata_script['type'] = 'application/ld+json'
    metadata_script['class'] = 'section-metadata'
    metadata_script.string = json.dumps(metadata, indent=2, ensure_ascii=False)
    
    # Als erstes Kind einfügen
    section_element.insert(0, metadata_script)
    section_element.insert(1, section_element.new_tag('br'))  # Whitespace
    
    # Content-Types automatisch zuweisen
    assign_content_types(section_element)
    
    return section_element

def assign_content_types(section):
    """Weist Content-Types basierend auf Heuristiken zu"""
    
    # Alle Paragraphen und Divs finden
    content_elements = section.find_all(['p', 'div', 'ol', 'ul'], recursive=True)
    
    for element in content_elements:
        # Skip wenn bereits content-type vorhanden
        if element.get('data-content-type'):
            continue
        
        text = element.get_text().lower()
        classes = element.get('class', [])
        
        # Heuristische Zuordnung
        if 'warning-box' in classes or 'achtung' in text:
            element['data-content-type'] = 'warning'
        elif 'tip-box' in classes or 'tipp' in text or 'best practice' in text:
            element['data-content-type'] = 'tip'
        elif element.name in ['ol', 'ul']:
            # Listen sind meist Anweisungen
            element['data-content-type'] = 'instruction'
        elif any(word in text for word in ['schritt', 'klicken', 'öffnen', 'wählen']):
            element['data-content-type'] = 'instruction'
        elif any(word in text for word in ['weil', 'daher', 'grund', 'bedeutet']):
            element['data-content-type'] = 'explanation'
        elif any(word in text for word in ['beispiel', 'etwa', 'z.b.']):
            element['data-content-type'] = 'example'
        elif 'detail-level-1' in classes:
            element['data-content-type'] = 'instruction'
        elif 'detail-level-2' in classes:
            element['data-content-type'] = 'explanation'
        elif 'detail-level-3' in classes:
            element['data-content-type'] = 'background'
        else:
            # Default: explanation
            element['data-content-type'] = 'explanation'
    
    # Media-Elemente
    for img in section.find_all('img'):
        parent = img.parent
        if parent.name == 'figure':
            parent['data-media-type'] = 'image'

def migrate_html_file(input_file, output_file, build_number):
    """Migriert gesamte HTML-Datei"""
    
    print(f"🔄 Migriere {input_file}...")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Alle content-sections finden
    sections = soup.find_all('section', class_='content-section')
    
    print(f"   Gefunden: {len(sections)} Sections")
    
    migrated_count = 0
    for section in sections:
        # Prüfe ob bereits Metadaten vorhanden
        if section.find('script', class_='section-metadata'):
            print(f"   ⏭️  Überspringe {section.get('data-section')} (hat bereits Metadaten)")
            continue
        
        migrate_section_to_schema(section, build_number)
        migrated_count += 1
        print(f"   ✅ Migriert: {section.get('data-section')}")
    
    # Speichern
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(str(soup.prettify()))
    
    print(f"\n✅ Migration abgeschlossen:")
    print(f"   {migrated_count} Sections migriert")
    print(f"   Ausgabe: {output_file}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python migrate_sections.py <input.html> [output.html] [build_number]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else input_file.replace('.html', '_migrated.html')
    build_number = sys.argv[3] if len(sys.argv) > 3 else "053"
    
    migrate_html_file(input_file, output_file, build_number)
```

**Verwendung:**

```bash
# Backup erstellen
cp src/index.html src/index.html.backup

# Migration durchführen
python tools/migration/migrate_sections.py src/index.html src/index_migrated.html 053

# Validieren
python tools/validation/validate_html_structure.py src/index_migrated.html --root-tag "main" -v

# Bei Erfolg: Ersetzen
mv src/index_migrated.html src/index.html
```

---

## Erweiterungsmöglichkeiten

### 1. Schema-Versionierung

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/froiloc/WebAssistantForensics/schema/main-content.schema.json",
  "version": "2.0.0",
  "changelog": [
    {
      "version": "2.0.0",
      "date": "2025-10-08",
      "changes": [
        "Added content metadata support (V11)",
        "Added content-type attributes (V07)",
        "Extended media validation"
      ]
    },
    {
      "version": "1.0.0",
      "date": "2025-09-01",
      "changes": ["Initial schema"]
    }
  ]
}
```

### 2. Custom Validators

```python
def validate_version_format(version_string):
    """Validiert Versionsnummern-Format"""
    pattern = r'^\d+\.\d+
    return re.match(pattern, version_string) is not None

def validate_date_not_in_future(date_string):
    """Prüft ob Datum nicht in der Zukunft liegt"""
    date = datetime.fromisoformat(date_string)
    return date <= datetime.now()

def validate_metadata_expiry(metadata):
    """Warnt bei abgelaufenen Metadaten"""
    if 'expires' in metadata:
        expiry = datetime.fromisoformat(metadata['expires'])
        if expiry < datetime.now():
            return False, "Content ist abgelaufen"
    return True, None
```

### 3. IDE-Integration

**VS Code JSON Schema Mapping:**

`.vscode/settings.json`:
```json
{
  "json.schemas": [
    {
      "fileMatch": ["**/schema/main-content.schema.json"],
      "url": "./schema/main-content.schema.json"
    },
    {
      "fileMatch": ["**/schema/agent-dialogs.schema.json"],
      "url": "./schema/agent-dialogs.schema.json"
    }
  ],
  "html.customData": [
    "./schema/html-custom-data.json"
  ]
}
```

**HTML Custom Data für VS Code:**

`schema/html-custom-data.json`:
```json
{
  "version": 1.1,
  "tags": [],
  "globalAttributes": [
    {
      "name": "data-content-type",
      "description": "Kategorisiert Content für verschiedene Anzeigemodi",
      "valueSet": "contentTypes"
    },
    {
      "name": "data-ref",
      "description": "Granulare Adressierung für Content-Blöcke"
    },
    {
      "name": "data-context-id",
      "description": "Agent-Kontext-ID für kontextbezogene Hilfe"
    },
    {
      "name": "data-meta-version",
      "description": "Content-Version (vereinfachte Metadaten)"
    },
    {
      "name": "data-meta-status",
      "description": "Review-Status",
      "valueSet": "metaStatus"
    }
  ],
  "valueSets": [
    {
      "name": "contentTypes",
      "values": [
        {"name": "instruction", "description": "Handlungsanweisungen"},
        {"name": "explanation", "description": "Erklärungen"},
        {"name": "visual", "description": "Visuelle Elemente"},
        {"name": "background", "description": "Hintergrundinformationen"},
        {"name": "example", "description": "Beispiele"},
        {"name": "warning", "description": "Warnungen"},
        {"name": "tip", "description": "Tipps"},
        {"name": "note", "description": "Notizen"}
      ]
    },
    {
      "name": "metaStatus",
      "values": [
        {"name": "draft", "description": "Entwurf"},
        {"name": "review", "description": "In Review"},
        {"name": "approved", "description": "Freigegeben"},
        {"name": "outdated", "description": "Veraltet"}
      ]
    }
  ]
}
```

### 4. Automatische Schema-Generierung

```python
def generate_schema_from_html(html_file):
    """Generiert JSON-Schema aus bestehender HTML-Struktur"""
    
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Analysiere alle verwendeten Attribute
    all_attributes = set()
    for element in soup.find_all():
        all_attributes.update(element.attrs.keys())
    
    # Analysiere Content-Types
    content_types = set()
    for element in soup.find_all(attrs={'data-content-type': True}):
        content_types.add(element['data-content-type'])
    
    # Generiere Schema
    schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "detectedAttributes": list(all_attributes),
        "detectedContentTypes": list(content_types),
        "generatedAt": datetime.now().isoformat()
    }
    
    return schema
```

---

## Checkliste für Implementierung

### Phase 1: Schema-Erstellung (30 Min)
- [ ] Vollständiges Schema in `schema/main-content.schema.json` einfügen
- [ ] Schema-Version auf 2.0.0 setzen
- [ ] Backup des alten Schemas erstellen

### Phase 2: Validierungs-Erweiterung (1 Stunde)
- [ ] `validate_html_structure.py` um Content-Type-Validierung erweitern
- [ ] Metadaten-Konsistenz-Checks hinzufügen
- [ ] Testing mit Beispiel-Sections

### Phase 3: Migration (1 Stunde)
- [ ] Migrations-Script `migrate_sections.py` erstellen
- [ ] Backup von `index.html` erstellen
- [ ] Migration auf Test-Datei ausführen
- [ ] Validierung der migrierten Datei
- [ ] Bei Erfolg: Live-Datei migrieren

### Phase 4: IDE-Integration (30 Min)
- [ ] `.vscode/settings.json` konfigurieren
- [ ] `html-custom-data.json` erstellen
- [ ] Auto-Complete testen

### Phase 5: CI/CD Integration (Optional)
- [ ] GitHub Actions Workflow erstellen
- [ ] Pre-commit Hooks einrichten
- [ ] Build-Prozess anpassen

---

## Wartung des Schemas

### Bei neuen Attributen:

1. **Schema erweitern:**
```json
"newAttribute": {
  "type": "string",
  "description": "Beschreibung des neuen Attributs",
  "pattern": "^[a-zA-Z0-9_-]+$"
}
```

2. **Validierung anpassen:**
```python
def _validate_new_attribute(self) -> None:
    """Validiert neues Attribut"""
    elements = self.validation_scope.find_all(attrs={'data-new-attribute': True})
    # Validierungslogik
```

3. **Custom Data aktualisieren:**
```json
{
  "name": "data-new-attribute",
  "description": "...",
  "valueSet": "newValues"
}
```

4. **Tests erweitern:**
```python
def test_new_attribute_validation():
    # Test-Code
    pass
```

### Versionierung:

**Schema-Version erhöhen bei:**
- **Major (3.0.0):** Breaking Changes, strukturelle Änderungen
- **Minor (2.1.0):** Neue Attribute/Features, abwärtskompatibel
- **Patch (2.0.1):** Bugfixes, Dokumentations-Updates

---

## Best Practices

### 1. Konsistente Benennung

**Gut:**
```html
<div data-content-type="instruction">...</div>
<div data-content-type="explanation">...</div>
```

**Schlecht:**
```html
<div data-content-type="instruction">...</div>
<div data-contentType="explanation">...</div>  <!-- Inkonsistent! -->
```

### 2. Aussagekräftige Metadaten

**Gut:**
```json
{
  "description": "Screenshots aktualisiert für AXIOM 8.0, Textpassagen an neue UI angepasst",
  "author": "Max Mustermann"
}
```

**Schlecht:**
```json
{
  "description": "Update",
  "author": "MM"
}
```

### 3. Realistische Ablaufdaten

**Gut:**
```json
{
  "expires": "2026-10-01"  // 1 Jahr in der Zukunft
}
```

**Schlecht:**
```json
{
  "expires": "2099-12-31"  // Unrealistisch weit
}
```

### 4. Regelmäßige Schema-Reviews

**Quartalsweise:**
- Unused Attributes identifizieren
- Neue Anforderungen einarbeiten
- Deprecated Attributes markieren
- Migrations-Pfade dokumentieren

---

## Zusammenfassung

**V12: JSON-Schema-Erweiterung** ist die technische Grundlage für:

✅ **V07 Show-Only Modus:** Content-Type Validierung  
✅ **V11 Metadaten-System:** JSON-LD Struktur-Prüfung  
✅ **Qualitätssicherung:** Automatische Fehlerprüfung  
✅ **Dokumentation:** Schema als lebende Referenz  
✅ **IDE-Support:** Auto-Complete und Validierung  
✅ **CI/CD:** Automatisierte Tests  

**Aufwand:** 2-3 Stunden für vollständige Implementierung  
**Wartungsaufwand:** Minimal (bei neuen Features anpassen)  
**ROI:** Sehr hoch - verhindert strukturelle Fehler und verbessert Entwickler-Experience

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 08. Oktober 2025*

**Abhängigkeiten:**
- Grundlage für V07 (Show-Only Modus)
- Grundlage für V11 (Metadaten-System)
- Erweitert bestehende Validierungs-Tools

**Nächste Schritte:**
1. Schema in `schema/main-content.schema.json` einfügen
2. Validierungs-Scripts erweitern
3. Migration durchführen
4. IDE-Integration einrichten