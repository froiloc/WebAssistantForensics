# Cluster 2 - Ergebnisse: Schema-Design & Strukturfundament

**Projekt:** WebAssistantForensics  
**Datum:** 2025-10-08  
**Status:** ✅ Abgeschlossen  
**Version:** 1.0

---

## Executive Summary

Cluster 2 hat das **Datenschema-Fundament** für die `main-content`-Struktur definiert. Alle konzeptionellen Entscheidungen sind getroffen, und die technische Spezifikation ist vollständig. Die nächsten Schritte sind die Implementierung des JSON-Schemas und die Erweiterung der Validierungs-Scripts.

**Kern-Ergebnisse:**
- ✅ Hierarchische Content-Struktur (3-5 Ebenen)
- ✅ Erweiterte Content-Types (`info`, `hint`, `attention`)
- ✅ Erweiterte Media-Types (`annotation`, `audio`)
- ✅ JSON-LD Metadaten-System pro Section
- ✅ Technische Validierung via Verzeichnis-Pattern
- ✅ HTML-First Architektur bestätigt

---

## 1. Architektur-Entscheidungen

### 1.1 HTML-First Ansatz (bestätigt)

**Entscheidung:** `index.html` bleibt die primäre Content-Quelle. Es wird **keine separate `main-content.json`** geben.

**Begründung:**
- Geringerer Overhead (keine Generierungs-Pipeline nötig)
- Direktes Editieren möglich
- Bestehende Struktur bleibt erhalten
- Schema dient ausschließlich der **Validierung**

**Konsequenz:**
- JSON-Schema validiert HTML-Attribute und -Struktur
- Python-Scripts prüfen Konsistenz
- Metadaten als JSON-LD innerhalb der HTML-Sections

---

### 1.2 Hierarchische Content-Struktur (Hybrid-Ansatz)

**Entscheidung:** 3 empfohlene Ebenen, maximal 5 Ebenen erlaubt

#### Struktur-Definition

```
Level 1: Topic        (z.B. "Vorbereitung")
  Level 2: Chapter    (z.B. "Template-Auswahl")
    Level 3: Section  (z.B. "Template-Typen im Detail")
      Level 4: Subsection (optional, für komplexe Themen)
        Level 5: Deep-Dive (nur in Ausnahmefällen)
```

**HTML-Repräsentation:**

```html
<!-- Level 1: Topic -->
<article class="content-topic" 
         id="topic-preparation" 
         data-level="1"
         data-title="Vorbereitung">
    
    <!-- Level 2: Chapter -->
    <section class="content-chapter" 
             id="chapter-templates" 
             data-level="2"
             data-parent="topic-preparation"
             data-title="Template-Auswahl">
        
        <!-- Level 3: Section -->
        <section class="content-section" 
                 id="section-template-types" 
                 data-level="3"
                 data-parent="chapter-templates"
                 data-section="template-types"
                 data-title="Template-Typen im Detail">
            
            <!-- Content hier -->
            
        </section>
    </section>
</article>
```

**Validierung:**
- **Fehler:** Bei >5 Ebenen (technisches Maximum)
- **Warnung:** Bei >3 Ebenen (empfohlenes Maximum)
- **OK:** Bei 1-3 Ebenen

**Begründung:**
- **Flexibilität:** Erlaubt Sonderfälle ohne Schema-Bruch
- **Konsistenz:** Empfehlung sorgt für einheitliche Struktur
- **Skalierbarkeit:** Bei 100-150 Sections übersichtlich
- **Wartbarkeit:** Klare Richtlinie ohne Zwang

---

## 2. Content-Types (Erweitert)

### 2.1 Bestehende Content-Types (aus V07)

| Type | Definition | Verwendung |
|------|------------|------------|
| `instruction` | Handlungsanweisung | "Klicken Sie auf..." |
| `example` | Beispiel/Demo | Code-Snippets, Musterdaten |
| `explanation` | Erklärung | "Diese Funktion dient..." |
| `background` | Hintergrundwissen | Theoretische Grundlagen |
| `warning` | Kritische Warnung | "Ohne Speichern gehen Daten verloren!" |

### 2.2 Neue Content-Types (Cluster 2)

| Type | Definition | Dringlichkeit | CSS-Styling |
|------|------------|---------------|-------------|
| `info` | Zusätzliche Information (neutral) | Niedrig | Grau, ℹ️ Icon |
| `hint` | Unterstützender Optimierungs-Tipp | Mittel | Blau, 💡 Icon |
| `attention` | Wichtiger Hinweis (nicht kritisch) | Hoch | Orange, ⚠️ Icon |

### 2.3 Abgrenzungs-Schema

**Aufsteigende Dringlichkeit:**

```
info < hint < attention < warning
 ↓      ↓        ↓           ↓
"Gut  "Kann   "Sollte    "MUSS
 zu    helfen" beachtet   beachtet
wissen"          werden"    werden!"
```

### 2.4 HTML-Beispiele

```html
<!-- info: Neutraler Kontext -->
<aside data-content-type="info">
    ℹ️ AXIOM Examiner speichert Reports standardmäßig im Projektordner.
</aside>

<!-- hint: Optimierungs-Tipp -->
<aside data-content-type="hint">
    💡 Tipp: Nutze Template-Variablen für wiederkehrende Metadaten.
</aside>

<!-- attention: Wichtiger Hinweis -->
<aside data-content-type="attention">
    ⚠️ Achtung: HTML-Reports können bei großen Datenmengen langsam laden.
</aside>

<!-- warning: Kritische Warnung -->
<aside data-content-type="warning">
    🚨 Warnung: Ohne Speichern gehen alle Änderungen verloren!
</aside>
```

---

## 3. Media-Types (Erweitert + Technische Validierung)

### 3.1 Vollständige Media-Type-Definition

| Type | Verzeichnis | Validierungs-Pattern | Beispiel-Dateien | Beschreibung |
|------|-------------|---------------------|------------------|--------------|
| `screenshot` | `media/screenshots/` | `^media/screenshots/.*\.(png\|jpg\|jpeg)$` | `axiom-interface.png` | Unveränderter Bildschirminhalt |
| `annotation` | `media/annotated/` | `^media/annotated/.*\.(png\|jpg\|jpeg)$` | `step1-marked.png` | Bearbeiteter Screenshot mit Markierungen |
| `video` | `media/videos/` | `^media/videos/.*\.(mp4\|webm\|avi)$` | `workflow-demo.mp4` | Video-Tutorials, Demos |
| `audio` | `media/audio/` | `^media/audio/.*\.(mp3\|wav\|ogg\|m4a)$` | `explanation-voice.mp3` | Sprachaufnahmen, Audio-Erklärungen |
| `image` | `media/other/` | `^media/other/.*\.(png\|jpg\|jpeg\|svg)$` | `icon-warning.svg` | Sonstige Bilder (Icons, Grafiken) |
| `diagram` | `media/other/` | `^media/other/.*\.(png\|svg)$` | `flowchart-process.svg` | Schematische Darstellungen |

### 3.2 Verzeichnis-Struktur

```
project-root/
├── media/
│   ├── screenshots/     # Unbearbeitete Screenshots
│   ├── annotated/       # Bearbeitete Screenshots mit Markierungen
│   ├── videos/          # Video-Dateien
│   ├── audio/           # Audio-Dateien
│   └── other/           # Sonstige Medien (Diagramme, Icons)
```

**Rationale für Trennung:**
- **screenshots/** → Quell-Material für Annotations
- **annotated/** → Bearbeitete Versionen für Dokumentation
- Schneller Zugriff auf Rohversionen bei Änderungsbedarf

### 3.3 Validierungs-Regeln

**Python-Pseudo-Code:**

```python
def validate_media_type(element):
    media_type = element.get('data-media-type')
    src = element.get('src')
    
    patterns = {
        'screenshot': r'^media/screenshots/.*\.(png|jpg|jpeg)$',
        'annotation': r'^media/annotated/.*\.(png|jpg|jpeg)$',
        'video': r'^media/videos/.*\.(mp4|webm|avi)$',
        'audio': r'^media/audio/.*\.(mp3|wav|ogg|m4a)$',
        'image': r'^media/other/.*\.(png|jpg|jpeg|svg)$',
        'diagram': r'^media/other/.*\.(png|svg)$'
    }
    
    if media_type in patterns:
        if not re.match(patterns[media_type], src):
            raise ValidationError(
                f"Media-Type '{media_type}' erfordert Pfad in '{patterns[media_type]}'"
            )
```

---

## 4. JSON-LD Metadaten-System

### 4.1 Platzierung

**Entscheidung:** JSON-LD als `<script type="application/ld+json">` innerhalb jeder Section

**Begründung:**
- ✅ Standard-konform (Schema.org)
- ✅ Im Browser via JavaScript verarbeitbar
- ✅ Suchmaschinen-freundlich (SEO)
- ✅ Validierbar mit bestehenden Tools
- ✅ Keine separate Metadaten-Datei nötig

### 4.2 HTML-Struktur

```html
<section class="content-section" 
         id="section-intro" 
         data-section="intro"
         data-level="3"
         data-parent="chapter-basics"
         data-title="Überblick">
    
    <!-- JSON-LD Metadaten -->
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": "intro",
        "name": "Überblick",
        "version": "1.0.0",
        "dateCreated": "2025-10-08T10:00:00Z",
        "dateModified": "2025-10-08T14:30:00Z",
        "author": {
            "@type": "Person",
            "name": "Max Mustermann",
            "email": "max.mustermann@example.com"
        },
        "dependencies": [],
        "learningObjectives": [
            "Verstehen des 8-Schritt-Workflows",
            "Kennenlernen der AXIOM-Interface-Bereiche"
        ],
        "estimatedTime": "PT5M",
        "difficultyLevel": "Beginner"
    }
    </script>
    
    <!-- Eigentlicher Content -->
    <h2 data-ref="heading">Überblick</h2>
    <p data-ref="intro-text">...</p>
    
    <!-- Agent-Context-Block am Ende -->
    <div class="agent-context-block"
         data-ref="agent-context-intro"
         data-context-id="intro-context"
         style="display: none;">
        <!-- Dynamisch gefüllt -->
    </div>
</section>
```

### 4.3 JavaScript-Zugriff

```javascript
// Metadaten auslesen
function getSectionMetadata(sectionId) {
    const section = document.getElementById(sectionId);
    const metadataScript = section.querySelector('script.section-metadata');
    
    if (metadataScript) {
        return JSON.parse(metadataScript.textContent);
    }
    return null;
}

// Verwendung
const metadata = getSectionMetadata('section-intro');
console.log(metadata.version);              // "1.0.0"
console.log(metadata.author.name);          // "Max Mustermann"
console.log(metadata.estimatedTime);        // "PT5M" (5 Minuten)
console.log(metadata.learningObjectives);   // Array
```

### 4.4 Schema-Eigenschaften

**Verpflichtend:**
- `@context`: `"https://schema.org"`
- `@type`: `"TechArticle"` (für technische Dokumentation)
- `identifier`: Eindeutige Section-ID
- `name`: Titel der Section
- `version`: Semantic Versioning (z.B. "1.0.0")

**Optional:**
- `dateCreated`: ISO-8601 Zeitstempel
- `dateModified`: ISO-8601 Zeitstempel
- `author`: Person oder Organization
- `dependencies`: Array von Section-IDs (z.B. `["section-basics"]`)
- `learningObjectives`: Array von Lernzielen
- `estimatedTime`: ISO-8601 Duration (z.B. `"PT10M"` = 10 Minuten)
- `difficultyLevel`: `"Beginner"`, `"Intermediate"`, `"Advanced"`

---

## 5. data-ref Granularität

### 5.1 Entscheidung: Standard-Granularität

**Verpflichtend für:**
- Alle Sections (`<section>`, `<article>`)
- Alle Headings (`<h1>` bis `<h6>`)
- Alle wichtigen Content-Container (`<div class="detail-level-*">`)
- Alle Listen (`<ul>`, `<ol>`)
- Alle Code-Beispiele (`<pre>`, `<code>`)
- Alle Info-Boxen (`<aside>`)
- Alle Agent-Context-Blocks

**Optional für:**
- Einzelne Paragraphen (bei Bedarf)
- Listen-Items (bei Bedarf)
- Inline-Elemente (`<span>`, `<strong>`, etc.)
- Buttons, Links (bei Agent-Interaktion)

### 5.2 Namenskonventionen

**Pattern:** `{section-id}-{element-type}-{descriptor}`

**Beispiele:**
```html
<section data-ref="section-intro">
    <h2 data-ref="intro-heading">Überschrift</h2>
    <p data-ref="intro-text">Text</p>
    <div data-ref="intro-detail-1" class="detail-level-1">
        <p data-ref="intro-step1-explanation">...</p>
    </div>
    <aside data-ref="intro-warning" data-content-type="warning">...</aside>
    <ul data-ref="intro-checklist">
        <li data-ref="intro-checklist-item1">Item 1</li>
        <li data-ref="intro-checklist-item2">Item 2</li>
    </ul>
</section>
```

**Validierung:**
- `data-ref` muss **eindeutig** innerhalb der gesamten HTML-Datei sein
- Pattern: `^[a-z0-9-]+$` (lowercase, Zahlen, Bindestriche)
- Länge: maximal 64 Zeichen

---

## 6. Agent-Context-Blocks

### 6.1 Entscheidung

**Anzahl:** Genau **einer pro Section**  
**Platzierung:** **Am Ende** der Section (nach dem eigentlichen Content)

### 6.2 HTML-Struktur

```html
<section class="content-section" id="section-example" data-section="example">
    
    <!-- Eigentlicher Content -->
    <h2>Beispiel-Section</h2>
    <p>Inhalt...</p>
    
    <!-- Agent-Context-Block (immer am Ende) -->
    <div class="agent-context-block"
         data-ref="agent-context-example"
         data-context-id="example-context"
         style="display: none;">
        <!-- Dynamisch vom Agent gefüllt -->
    </div>
</section>
```

### 6.3 Eigenschaften

- `class="agent-context-block"`: Pflicht (für CSS/JS-Selektion)
- `data-ref`: Pflicht (eindeutige Referenz)
- `data-context-id`: Pflicht (für Agent-System)
- `style="display: none;"`: Initial versteckt
- Keine Kinder im Markup (werden dynamisch eingefügt)

---

## 7. Navigation-Strategie

### 7.1 Entscheidung: Freie Navigation

**Keine explizite Reihenfolge-Attribute (`data-order`) erforderlich.**

**Navigation-Mechanismen:**
- ✅ Sidebar (bereits implementiert)
- ✅ Breadcrumb (bereits implementiert)
- ✅ Verlauf (bereits implementiert)
- ✅ Favoriten (geplant)
- ✅ Suchfunktion (zukünftig)

**Implizite Reihenfolge:**
- Die Reihenfolge der Sections **im HTML** ist die natürliche Reihenfolge
- Keine "Weiter"/"Zurück"-Buttons nötig (Referenzwerk-Charakter)

### 7.2 Konsequenz für Schema

**Nicht erforderlich:**
- `data-order` Attribut
- `next`/`previous` Referenzen
- Lineare Progression-Logik

**Erforderlich:**
- Konsistente Hierarchie (Topic → Chapter → Section)
- Eindeutige `data-section` IDs
- `data-parent` Referenzen für hierarchische Navigation

---

## 8. JSON-Schema Anforderungen (Spezifikation)

### 8.1 Schema-Struktur (Überblick)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/froiloc/WebAssistantForensics/schema/main-content.schema.json",
  "version": "2.0.0",
  "title": "WebAssistantForensics Main Content Structure",
  "description": "Schema for validating HTML structure within <main> element",
  
  "definitions": {
    "hierarchyLevel": { ... },
    "contentTypes": { ... },
    "mediaTypes": { ... },
    "sectionMetadata": { ... },
    "dataRefPattern": { ... }
  },
  
  "properties": {
    "sections": { ... },
    "validationRules": { ... }
  }
}
```

### 8.2 Hierarchie-Level Definition

```json
"hierarchyLevel": {
  "type": "object",
  "properties": {
    "level": {
      "type": "integer",
      "minimum": 1,
      "maximum": 5,
      "description": "Hierarchie-Ebene (1=Topic, 2=Chapter, 3=Section, 4=Subsection, 5=Deep-Dive)"
    },
    "recommended": {
      "type": "integer",
      "const": 3,
      "description": "Empfohlene maximale Tiefe"
    }
  },
  "required": ["level"]
}
```

### 8.3 Content-Types Definition

```json
"contentTypes": {
  "enum": [
    "instruction",
    "example",
    "explanation",
    "background",
    "warning",
    "info",
    "hint",
    "attention"
  ],
  "description": "Erlaubte Content-Type-Werte für data-content-type"
}
```

### 8.4 Media-Types Definition

```json
"mediaTypes": {
  "type": "object",
  "properties": {
    "type": {
      "enum": ["screenshot", "annotation", "video", "audio", "image", "diagram"]
    },
    "src": {
      "type": "string",
      "pattern": "..." 
    }
  },
  "allOf": [
    {
      "if": {
        "properties": { "type": { "const": "screenshot" } }
      },
      "then": {
        "properties": {
          "src": { "pattern": "^media/screenshots/.*\\.(png|jpg|jpeg)$" }
        }
      }
    },
    {
      "if": {
        "properties": { "type": { "const": "annotation" } }
      },
      "then": {
        "properties": {
          "src": { "pattern": "^media/annotated/.*\\.(png|jpg|jpeg)$" }
        }
      }
    },
    {
      "if": {
        "properties": { "type": { "const": "video" } }
      },
      "then": {
        "properties": {
          "src": { "pattern": "^media/videos/.*\\.(mp4|webm|avi)$" }
        }
      }
    },
    {
      "if": {
        "properties": { "type": { "const": "audio" } }
      },
      "then": {
        "properties": {
          "src": { "pattern": "^media/audio/.*\\.(mp3|wav|ogg|m4a)$" }
        }
      }
    },
    {
      "if": {
        "properties": { "type": { "const": "image" } }
      },
      "then": {
        "properties": {
          "src": { "pattern": "^media/other/.*\\.(png|jpg|jpeg|svg)$" }
        }
      }
    },
    {
      "if": {
        "properties": { "type": { "const": "diagram" } }
      },
      "then": {
        "properties": {
          "src": { "pattern": "^media/other/.*\\.(png|svg)$" }
        }
      }
    }
  ]
}
```

### 8.5 Section-Metadaten Definition (JSON-LD)

```json
"sectionMetadata": {
  "type": "object",
  "required": ["@context", "@type", "identifier", "name", "version"],
  "properties": {
    "@context": {
      "const": "https://schema.org"
    },
    "@type": {
      "const": "TechArticle"
    },
    "identifier": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$"
    },
    "name": {
      "type": "string",
      "minLength": 1
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    },
    "dateCreated": {
      "type": "string",
      "format": "date-time"
    },
    "dateModified": {
      "type": "string",
      "format": "date-time"
    },
    "author": {
      "type": "object",
      "properties": {
        "@type": { "const": "Person" },
        "name": { "type": "string" },
        "email": { "type": "string", "format": "email" }
      },
      "required": ["@type", "name"]
    },
    "dependencies": {
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^[a-z0-9-]+$"
      }
    },
    "learningObjectives": {
      "type": "array",
      "items": { "type": "string" }
    },
    "estimatedTime": {
      "type": "string",
      "pattern": "^PT\\d+[MH]$",
      "description": "ISO-8601 Duration (z.B. PT5M = 5 Minuten)"
    },
    "difficultyLevel": {
      "enum": ["Beginner", "Intermediate", "Advanced"]
    }
  }
}
```

### 8.6 data-ref Pattern

```json
"dataRefPattern": {
  "type": "string",
  "pattern": "^[a-z0-9-]+$",
  "maxLength": 64,
  "description": "Eindeutige Referenz (lowercase, Zahlen, Bindestriche)"
}
```

---

## 9. Validierungs-Regeln (Python-Erweiterungen)

### 9.1 Hierarchie-Validierung

```python
def validate_hierarchy_depth(self) -> None:
    """Prüft Hierarchie-Tiefe (max. 5, empfohlen 3)"""
    
    for element in self.validation_scope.find_all(attrs={'data-level': True}):
        level = int(element.get('data-level', 0))
        
        if level > 5:
            self.errors.append({
                'type': 'hierarchy_depth_exceeded',
                'element': element.name,
                'id': element.get('id'),
                'level': level,
                'message': f'Maximale Hierarchie-Tiefe (5) überschritten: {level}'
            })
        elif level > 3:
            self.warnings.append({
                'type': 'hierarchy_depth_warning',
                'element': element.name,
                'id': element.get('id'),
                'level': level,
                'message': f'Empfohlene Hierarchie-Tiefe (3) überschritten: {level}'
            })
```

### 9.2 Content-Type-Validierung

```python
def validate_content_types(self) -> None:
    """Prüft data-content-type Werte"""
    
    allowed_types = {
        'instruction', 'example', 'explanation', 'background', 
        'warning', 'info', 'hint', 'attention'
    }
    
    for element in self.validation_scope.find_all(attrs={'data-content-type': True}):
        content_type = element.get('data-content-type')
        
        if content_type not in allowed_types:
            self.errors.append({
                'type': 'invalid_content_type',
                'element': element.name,
                'id': element.get('id'),
                'value': content_type,
                'message': f'Ungültiger Content-Type: {content_type}'
            })
```

### 9.3 Media-Type-Validierung

```python
import re

def validate_media_types(self) -> None:
    """Prüft data-media-type und Pfad-Konsistenz"""
    
    patterns = {
        'screenshot': r'^media/screenshots/.*\.(png|jpg|jpeg)$',
        'annotation': r'^media/annotated/.*\.(png|jpg|jpeg)$',
        'video': r'^media/videos/.*\.(mp4|webm|avi)$',
        'audio': r'^media/audio/.*\.(mp3|wav|ogg|m4a)$',
        'image': r'^media/other/.*\.(png|jpg|jpeg|svg)$',
        'diagram': r'^media/other/.*\.(png|svg)$'
    }
    
    for element in self.validation_scope.find_all(attrs={'data-media-type': True}):
        media_type = element.get('data-media-type')
        src = element.get('src', '')
        
        if media_type not in patterns:
            self.errors.append({
                'type': 'invalid_media_type',
                'element': element.name,
                'id': element.get('id'),
                'value': media_type,
                'message': f'Ungültiger Media-Type: {media_type}'
            })
            continue
        
        if not re.match(patterns[media_type], src):
            self.errors.append({
                'type': 'media_path_mismatch',
                'element': element.name,
                'id': element.get('id'),
                'media_type': media_type,
                'src': src,
                'message': f'Pfad "{src}" entspricht nicht Pattern für "{media_type}"'
            })
```

### 9.4 JSON-LD-Metadaten-Validierung

```python
import json
from jsonschema import validate, ValidationError

def validate_section_metadata(self) -> None:
    """Prüft JSON-LD Metadaten in Sections"""
    
    for section in self.validation_scope.find_all('section', class_='content-section'):
        metadata_script = section.find('script', class_='section-metadata')
        
        if not metadata_script:
            self.warnings.append({
                'type': 'missing_metadata',
                'section_id': section.get('id'),
                'message': f'Section ohne Metadaten: {section.get("id")}'
            })
            continue
        
        try:
            metadata = json.loads(metadata_script.string)
            
            # Schema-Validierung (vereinfacht)
            required_fields = ['@context', '@type', 'identifier', 'name', 'version']
            for field in required_fields:
                if field not in metadata:
                    self.errors.append({
                        'type': 'metadata_missing_field',
                        'section_id': section.get('id'),
                        'field': field,
                        'message': f'Pflichtfeld fehlt in Metadaten: {field}'
                    })
            
            # Konsistenz-Prüfung
            if metadata.get('identifier') != section.get('data-section'):
                self.errors.append({
                    'type': 'metadata_id_mismatch',
                    'section_id': section.get('id'),
                    'metadata_id': metadata.get('identifier'),
                    'data_section': section.get('data-section'),
                    'message': 'Metadaten-ID stimmt nicht mit data-section überein'
                })
        
        except json.JSONDecodeError as e:
            self.errors.append({
                'type': 'invalid_json',
                'section_id': section.get('id'),
                'message': f'Ungültiges JSON in Metadaten: {str(e)}'
            })
```

### 9.5 data-ref Eindeutigkeit

```python
def validate_data_ref_uniqueness(self) -> None:
    """Prüft Eindeutigkeit von data-ref Attributen"""
    
    refs = {}
    for element in self.validation_scope.find_all(attrs={'data-ref': True}):
        ref = element.get('data-ref')
        
        if ref in refs:
            self.errors.append({
                'type': 'duplicate_data_ref',
                'element': element.name,
                'ref': ref,
                'first_occurrence': refs[ref]['id'],
                'second_occurrence': element.get('id'),
                'message': f'Doppeltes data-ref: {ref}'
            })
        else:
            refs[ref] = {'id': element.get('id'), 'element': element.name}
        
        # Pattern-Validierung
        if not re.match(r'^[a-z0-9-]+, ref):
            self.errors.append({
                'type': 'invalid_data_ref_pattern',
                'element': element.name,
                'ref': ref,
                'message': f'data-ref entspricht nicht Pattern: {ref}'
            })
        
        if len(ref) > 64:
            self.warnings.append({
                'type': 'data_ref_too_long',
                'element': element.name,
                'ref': ref,
                'length': len(ref),
                'message': f'data-ref ist sehr lang ({len(ref)} Zeichen): {ref}'
            })
```

### 9.6 Agent-Context-Block-Validierung

```python
def validate_agent_context_blocks(self) -> None:
    """Prüft Agent-Context-Blocks (genau einer pro Section am Ende)"""
    
    for section in self.validation_scope.find_all('section', class_='content-section'):
        context_blocks = section.find_all('div', class_='agent-context-block', recursive=False)
        
        if len(context_blocks) == 0:
            self.warnings.append({
                'type': 'missing_agent_context',
                'section_id': section.get('id'),
                'message': f'Section ohne Agent-Context-Block: {section.get("id")}'
            })
        elif len(context_blocks) > 1:
            self.errors.append({
                'type': 'multiple_agent_contexts',
                'section_id': section.get('id'),
                'count': len(context_blocks),
                'message': f'Section mit mehreren Agent-Context-Blocks: {section.get("id")}'
            })
        else:
            # Prüfe Platzierung (muss letztes Child sein)
            context_block = context_blocks[0]
            section_children = [child for child in section.children if child.name]
            
            if section_children[-1] != context_block:
                self.warnings.append({
                    'type': 'agent_context_not_last',
                    'section_id': section.get('id'),
                    'message': f'Agent-Context-Block nicht am Ende der Section: {section.get("id")}'
                })
            
            # Prüfe erforderliche Attribute
            if not context_block.get('data-ref'):
                self.errors.append({
                    'type': 'missing_data_ref',
                    'section_id': section.get('id'),
                    'message': 'Agent-Context-Block ohne data-ref'
                })
            
            if not context_block.get('data-context-id'):
                self.errors.append({
                    'type': 'missing_context_id',
                    'section_id': section.get('id'),
                    'message': 'Agent-Context-Block ohne data-context-id'
                })
```

---

## 10. Implementierungs-Roadmap

### Phase 1: JSON-Schema erstellen (Priorität 1)

**Aufgabe:** Vollständiges `main-content.schema.json` Version 2.0

**Dateien:**
- `schema/main-content.schema.json` (erstellen/erweitern)

**Aufwand:** 2-3 Stunden

**Abhängigkeiten:** Keine

**Deliverable:**
- Validierungsfähiges JSON-Schema
- Dokumentation der Schema-Eigenschaften

---

### Phase 2: Python-Validierung erweitern (Priorität 1)

**Aufgabe:** Validierungs-Scripts um neue Regeln erweitern

**Dateien:**
- `tools/validation/validate_html_structure.py` (erweitern)

**Neue Validierungen:**
- ✅ Hierarchie-Tiefe (max. 5, Warnung bei >3)
- ✅ Content-Types (8 erlaubte Werte)
- ✅ Media-Types (6 Typen + Pfad-Validierung)
- ✅ JSON-LD Metadaten (Pflichtfelder, Konsistenz)
- ✅ data-ref Eindeutigkeit
- ✅ Agent-Context-Block-Platzierung

**Aufwand:** 3-4 Stunden

**Abhängigkeiten:** Phase 1

**Deliverable:**
- Erweiterte Validierungs-Scripts
- Test-Suite mit Beispiel-Fällen

---

### Phase 3: HTML-Struktur migrieren (Priorität 2)

**Aufgabe:** Bestehende `index.html` auf neue Struktur migrieren

**Schritte:**
1. Backup erstellen (`index.html.backup`)
2. Hierarchie-Levels hinzufügen (`data-level`, `data-parent`)
3. Content-Type-Attribute ergänzen (wo noch fehlend)
4. Media-Types validieren und korrigieren
5. JSON-LD Metadaten zu jeder Section hinzufügen
6. Agent-Context-Blocks prüfen/korrigieren
7. Validierung durchführen

**Dateien:**
- `src/index.html` (migrieren)

**Tools:**
- `tools/migration/migrate_sections.py` (erstellen)

**Aufwand:** 2-3 Stunden (manuell + automatisiert)

**Abhängigkeiten:** Phase 2

**Deliverable:**
- Migrierte `index.html`
- Validierungs-Report (0 Fehler)

---

### Phase 4: IDE-Support (Priorität 3)

**Aufgabe:** Custom HTML Data für VSCode/IDE

**Dateien:**
- `.vscode/html-custom-data.json` (erstellen)
- `.vscode/settings.json` (erweitern)

**Features:**
- Auto-Complete für `data-content-type`
- Auto-Complete für `data-media-type`
- Inline-Dokumentation
- Validierung in Editor

**Aufwand:** 1 Stunde

**Abhängigkeiten:** Phase 1

**Deliverable:**
- IDE-Support-Dateien
- Dokumentation zur Einrichtung

---

### Phase 5: Dokumentation & Beispiele (Priorität 3)

**Aufgabe:** Vollständige Dokumentation und Beispiele

**Dateien:**
- `docs/schema-guide.md` (erstellen)
- `docs/examples/` (Beispiel-Sections)

**Inhalte:**
- Schema-Referenz
- Best Practices
- Migration-Guide
- Beispiel-Sections (alle Features)

**Aufwand:** 2 Stunden

**Abhängigkeiten:** Phase 1-3

**Deliverable:**
- Vollständige Dokumentation
- Beispiel-Code

---

## 11. Test-Strategie

### 11.1 Unit-Tests (Python)

```python
# test_validation.py

def test_hierarchy_validation():
    """Test für Hierarchie-Tiefe"""
    html = """
    <section data-level="4">...</section>
    """
    validator = HTMLValidator(html)
    validator.validate_hierarchy_depth()
    assert len(validator.errors) == 0
    assert len(validator.warnings) == 1  # Warnung bei Level 4

def test_content_type_validation():
    """Test für Content-Types"""
    html = """
    <div data-content-type="hint">Tipp</div>
    <div data-content-type="invalid">Fehler</div>
    """
    validator = HTMLValidator(html)
    validator.validate_content_types()
    assert len(validator.errors) == 1  # "invalid" nicht erlaubt

def test_media_path_validation():
    """Test für Media-Pfade"""
    html = """
    <img src="media/screenshots/test.png" data-media-type="screenshot">
    <img src="media/wrong/test.png" data-media-type="screenshot">
    """
    validator = HTMLValidator(html)
    validator.validate_media_types()
    assert len(validator.errors) == 1  # Pfad-Mismatch
```

### 11.2 Integrations-Tests

**Test-Szenario 1: Vollständige Section**
```html
<section class="content-section" 
         id="test-section" 
         data-section="test"
         data-level="3"
         data-parent="test-chapter">
    
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": "test",
        "name": "Test Section",
        "version": "1.0.0"
    }
    </script>
    
    <h2 data-ref="test-heading">Test</h2>
    <div data-ref="test-content" data-content-type="explanation">Content</div>
    <img src="media/screenshots/test.png" data-media-type="screenshot" alt="Test">
    
    <div class="agent-context-block"
         data-ref="agent-context-test"
         data-context-id="test-context"
         style="display: none;">
    </div>
</section>
```

**Erwartetes Ergebnis:** 0 Fehler, 0 Warnungen

---

**Test-Szenario 2: Fehlerhafte Section**
```html
<section class="content-section" data-level="6">  <!-- Fehler: Level > 5 -->
    <div data-content-type="invalid">...</div>    <!-- Fehler: Ungültiger Type -->
    <img src="wrong/path.png" data-media-type="screenshot">  <!-- Fehler: Pfad -->
    <!-- Fehler: Keine Metadaten -->
    <!-- Fehler: Kein Agent-Context-Block -->
</section>
```

**Erwartetes Ergebnis:** 5 Fehler

---

### 11.3 End-to-End-Tests

**Workflow:**
1. Erstelle Test-HTML mit allen Features
2. Validiere gegen Schema
3. Prüfe IDE-Auto-Complete
4. Teste JavaScript-Zugriff auf Metadaten
5. Teste Agent-System-Integration

**Erfolgs-Kriterien:**
- ✅ Alle Validierungen bestanden
- ✅ IDE zeigt korrekte Auto-Completion
- ✅ JavaScript kann Metadaten auslesen
- ✅ Agent-System kann Context-Blocks füllen

---

## 12. Offene Punkte & Zukünftige Erweiterungen

### 12.1 Noch zu klären (außerhalb Cluster 2)

- **Suchfunktion:** Wie wird indexiert? (Full-Text? Metadaten?)
- **Favoriten-System:** Struktur und Persistenz
- **Multi-Language:** Mehrsprachigkeit (aktuell nur `language` in Metadaten)
- **Versionierung:** Wie werden Content-Updates gehandhabt?
- **Export:** PDF/Offline-Version aus HTML generieren?

### 12.2 Mögliche Schema-Erweiterungen (V3.0)

**Interaktive Elemente:**
```json
"interactiveTypes": {
  "enum": ["quiz", "exercise", "simulation", "checklist"]
}
```

**Accessibility-Metadaten:**
```json
"accessibility": {
  "textAlternative": "...",
  "captionAvailable": true,
  "transcriptAvailable": false
}
```

**Learning-Path-Integration:**
```json
"learningPath": {
  "prerequisite": ["section-basics"],
  "next": ["section-advanced"],
  "optional": false
}
```

---

## 13. Best Practices & Empfehlungen

### 13.1 Content-Erstellung

**DO:**
- ✅ Konsistente `data-ref` Benennung (z.B. `section-name-element-type`)
- ✅ Aussagekräftige Metadaten (Learning Objectives, Dependencies)
- ✅ Korrekte Content-Types für semantische Klassifikation
- ✅ Medien in richtigen Verzeichnissen ablegen
- ✅ Hierarchie flach halten (max. 3 Ebenen bevorzugen)

**DON'T:**
- ❌ Tiefe Verschachtelungen ohne Grund (>3 Ebenen)
- ❌ Doppelte `data-ref` Werte
- ❌ Medien in falschen Verzeichnissen
- ❌ Metadaten vergessen
- ❌ Agent-Context-Blocks mitten im Content

### 13.2 Validierung-Workflow

**Bei jeder Änderung:**
```bash
# 1. Backup
cp src/index.html src/index.html.backup

# 2. Änderungen vornehmen
# ... (in IDE)

# 3. Validieren
cd tools/validation
python validate_html_structure.py ../../src/index.html --root-tag "main" -v

# 4. Bei Fehlern: Korrigieren und wiederholen
# 5. Bei Erfolg: Commit
git add src/index.html
git commit -m "Content: Add new section XYZ"
```

### 13.3 Metadaten-Pflege

**Version-Updates:**
- **Patch (1.0.1):** Typos, kleine Korrekturen
- **Minor (1.1.0):** Neue Inhalte, Ergänzungen
- **Major (2.0.0):** Strukturelle Änderungen, Breaking Changes

**dateModified aktualisieren:**
```javascript
// Automatisch via Script
function updateSectionMetadata(sectionId) {
    const section = document.getElementById(sectionId);
    const metadataScript = section.querySelector('script.section-metadata');
    const metadata = JSON.parse(metadataScript.textContent);
    
    metadata.dateModified = new Date().toISOString();
    metadataScript.textContent = JSON.stringify(metadata, null, 2);
}
```

---

## 14. Zusammenfassung & Nächste Schritte

### 14.1 Was wurde erreicht?

✅ **Vollständige konzeptionelle Klärung:**
- Hierarchische Struktur (3-5 Ebenen)
- Erweiterte Content-Types (8 Typen)
- Erweiterte Media-Types (6 Typen + Validierung)
- JSON-LD Metadaten-System
- data-ref Granularität
- Agent-Context-Block-Standard

✅ **Technische Spezifikation:**
- JSON-Schema-Anforderungen definiert
- Python-Validierungen spezifiziert
- HTML-Struktur-Patterns dokumentiert
- Test-Strategie festgelegt

✅ **Implementierungs-Roadmap:**
- 5 Phasen mit klaren Prioritäten
- Aufwandsschätzungen
- Abhängigkeiten identifiziert

### 14.2 Nächste Schritte (konkret)

**Sofort umsetzbar:**

1. **JSON-Schema erstellen** (Phase 1)
   - Datei: `schema/main-content.schema.json`
   - Aufwand: 2-3 Stunden
   - Status: Bereit zur Implementierung

2. **Python-Validierung erweitern** (Phase 2)
   - Datei: `tools/validation/validate_html_structure.py`
   - Aufwand: 3-4 Stunden
   - Status: Spezifikation vollständig

3. **Beispiel-Section erstellen** (Test)
   - Vollständige Section mit allen neuen Features
   - Validierung testen
   - Aufwand: 1 Stunde

**Danach:**
- Phase 3: HTML-Migration
- Phase 4: IDE-Support
- Phase 5: Dokumentation

### 14.3 Offene Fragen

**Keine.** Alle Punkte aus Cluster 2 sind geklärt.

**Für Cluster 3 (falls relevant):**
- Detaillierte Agent-Integration
- Suchfunktion-Design
- Performance-Optimierung bei 100+ Sections

---

## 15. Anhang

### 15.1 Referenz-Links

- **JSON-Schema:** https://json-schema.org/
- **Schema.org (JSON-LD):** https://schema.org/TechArticle
- **ISO-8601 Duration:** https://en.wikipedia.org/wiki/ISO_8601#Durations
- **HTML Custom Data (VSCode):** https://code.visualstudio.com/docs/languages/html#_custom-data-format

### 15.2 Glossar

| Begriff | Definition |
|---------|------------|
| **Topic** | Oberste Hierarchie-Ebene (Level 1) |
| **Chapter** | Zweite Hierarchie-Ebene (Level 2) |
| **Section** | Dritte Hierarchie-Ebene (Level 3), primäre Content-Einheit |
| **data-ref** | Eindeutige Referenz für HTML-Elemente |
| **Content-Type** | Semantische Klassifikation von Inhalten |
| **Media-Type** | Klassifikation von Medien-Ressourcen |
| **JSON-LD** | JSON for Linking Data (strukturierte Metadaten) |
| **Agent-Context-Block** | Versteckter Bereich für dynamische Agent-Inhalte |

### 15.3 Beispiel-Section (Vollständig)

```html
<!-- Level 1: Topic -->
<article class="content-topic" 
         id="topic-preparation" 
         data-level="1"
         data-title="Vorbereitung">
    
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "identifier": "topic-preparation",
        "name": "Vorbereitung",
        "version": "1.0.0",
        "dateCreated": "2025-10-08T10:00:00Z"
    }
    </script>
    
    <h1 data-ref="topic-preparation-heading">Vorbereitung</h1>
    
    <!-- Level 2: Chapter -->
    <section class="content-chapter" 
             id="chapter-templates" 
             data-level="2"
             data-parent="topic-preparation"
             data-title="Template-Auswahl">
        
        <script type="application/ld+json" class="section-metadata">
        {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "identifier": "chapter-templates",
            "name": "Template-Auswahl",
            "version": "1.0.0",
            "dateCreated": "2025-10-08T10:00:00Z",
            "author": {
                "@type": "Person",
                "name": "Max Mustermann"
            }
        }
        </script>
        
        <h2 data-ref="chapter-templates-heading">Template-Auswahl</h2>
        
        <!-- Level 3: Section -->
        <section class="content-section" 
                 id="section-template-types" 
                 data-section="template-types"
                 data-level="3"
                 data-parent="chapter-templates"
                 data-title="Template-Typen">
            
            <script type="application/ld+json" class="section-metadata">
            {
                "@context": "https://schema.org",
                "@type": "TechArticle",
                "identifier": "template-types",
                "name": "Template-Typen im Detail",
                "version": "1.0.0",
                "dateCreated": "2025-10-08T10:00:00Z",
                "dateModified": "2025-10-08T14:30:00Z",
                "author": {
                    "@type": "Person",
                    "name": "Max Mustermann",
                    "email": "max@example.com"
                },
                "dependencies": ["chapter-templates"],
                "learningObjectives": [
                    "Unterscheidung der Template-Typen verstehen",
                    "Richtiges Template für Use-Case auswählen"
                ],
                "estimatedTime": "PT10M",
                "difficultyLevel": "Beginner"
            }
            </script>
            
            <h3 data-ref="template-types-heading">Template-Typen im Detail</h3>
            
            <!-- Content -->
            <div class="detail-level-1" data-ref="template-types-basic">
                <p data-ref="template-types-intro" data-content-type="explanation">
                    AXIOM bietet verschiedene Template-Typen für unterschiedliche Szenarien.
                </p>
                
                <aside data-ref="template-types-hint" data-content-type="hint">
                    💡 Tipp: Nutze Standard-Templates für 90% der Fälle.
                </aside>
            </div>
            
            <!-- Media -->
            <figure data-ref="template-types-screenshot">
                <img src="media/screenshots/templates-overview.png" 
                     alt="AXIOM Templates Übersicht"
                     data-media-type="screenshot">
                <figcaption>Übersicht der verfügbaren Templates</figcaption>
            </figure>
            
            <figure data-ref="template-types-annotation">
                <img src="media/annotated/templates-marked.png" 
                     alt="Templates mit Markierungen"
                     data-media-type="annotation">
                <figcaption>Wichtige Bereiche markiert</figcaption>
            </figure>
            
            <!-- Detail Level 2 -->
            <div class="detail-level-2" data-ref="template-types-advanced">
                <h4 data-ref="template-types-types-heading">Template-Kategorien</h4>
                
                <ul data-ref="template-types-list">
                    <li data-ref="template-types-standard" data-content-type="explanation">
                        <strong>Standard:</strong> Für allgemeine Berichte
                    </li>
                    <li data-ref="template-types-custom" data-content-type="explanation">
                        <strong>Custom:</strong> Für spezielle Anforderungen
                    </li>
                </ul>
                
                <aside data-ref="template-types-attention" data-content-type="attention">
                    ⚠️ Achtung: Custom-Templates erfordern mehr Konfigurationsaufwand.
                </aside>
            </div>
            
            <!-- Agent-Context-Block (am Ende) -->
            <div class="agent-context-block"
                 data-ref="agent-context-template-types"
                 data-context-id="template-types-context"
                 style="display: none;">
                <!-- Dynamisch gefüllt -->
            </div>
        </section>
    </section>
</article>
```

---

## 16. Abschluss

**Cluster 2 ist vollständig abgeschlossen.** Alle konzeptionellen Entscheidungen sind getroffen, die technische Spezifikation ist vollständig dokumentiert, und die Implementierungs-Roadmap ist bereit.

**Nächster Schritt:** Implementierung beginnen (Phase 1: JSON-Schema)

**Datum:** 2025-10-08  
**Version:** 1.0  
**Status:** ✅ Abgeschlossen und bereit zur Implementierung