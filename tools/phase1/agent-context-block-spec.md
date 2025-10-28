# Agent-Context-Block - Spezifikation

**Version:** 1.0.0  
**Datum:** 2025-10-28  
**Projekt:** WebAssistant Forensics - AXIOM Examine Guide  
**Phase:** Phase 4 (KI-Assistent)  
**Status:** 📝 Spezifikation (noch nicht implementiert)

---

## 📋 **ÜBERSICHT**

### **Was ist der Agent-Context-Block?**

Der **Agent-Context-Block** ist ein strukturierter JSON-LD-Datenblock am Ende jeder HTML-Section, der dem KI-Assistenten in **Phase 4** ermöglicht, kontextbewusste Fragen zu beantworten.

### **Zweck:**

1. **Kontext-Erfassung:** Ermöglicht KI, Fragen zur aktuellen Section zu beantworten
2. **Beziehungen:** Verknüpfung mit verwandten Sections und Prerequisites
3. **Semantik:** Strukturierte Metadaten für besseres Verständnis
4. **Navigation:** Unterstützt intelligente Weiterleitung zu relevanten Inhalten

### **Einsatz:**

- **Phase 1:** Noch nicht implementiert (Template-Erstellung)
- **Phase 2-3:** Noch nicht benötigt (Medien, CSS)
- **Phase 4:** Implementierung erforderlich (KI-Assistent)

---

## 🎯 **ANFORDERUNGEN**

### **Funktionale Anforderungen:**

| ID | Anforderung | Priorität |
|----|-------------|-----------|
| **AF-1** | JSON-LD Format für maschinelle Verarbeitung | MUSS |
| **AF-2** | Section-Metadaten erfassen | MUSS |
| **AF-3** | Beziehungen zu anderen Sections | MUSS |
| **AF-4** | Learning-Objective und Key-Topics | MUSS |
| **AF-5** | FAQs zur Section | SOLLTE |
| **AF-6** | Verwandte Begriffe (für Glossar) | SOLLTE |
| **AF-7** | Schwierigkeitsgrad und Komplexität | KANN |

### **Nicht-funktionale Anforderungen:**

| ID | Anforderung | Priorität |
|----|-------------|-----------|
| **NF-1** | Nicht sichtbar für Benutzer | MUSS |
| **NF-2** | Valides JSON-LD | MUSS |
| **NF-3** | Kompakt (<5 KB pro Section) | SOLLTE |
| **NF-4** | Keine Duplikation von Inhalten | SOLLTE |

---

## 📐 **STRUKTUR**

### **HTML-Container:**

```html
<!-- Am Ende der Section, vor </section> -->
<script type="application/ld+json" class="agent-context" data-ref="{{section_id}}-agent-context">
{
  "@context": "https://schema.org",
  "@type": "ContextData",
  
  "identifier": "{{section_id}}",
  "name": "{{section_title}}",
  "description": "{{short_description}}",
  
  "learningObjective": "{{learning_objective}}",
  "keywords": ["{{key_topic_1}}", "{{key_topic_2}}", ...],
  
  "educationalLevel": "{{difficulty_level}}",
  "complexity": "{{complexity}}",
  
  "isPartOf": {
    "@type": "Chapter",
    "identifier": "{{chapter_id}}",
    "name": "{{chapter_title}}"
  },
  
  "hasPart": [
    {
      "@type": "Section",
      "identifier": "{{subsection_id}}",
      "name": "{{subsection_title}}"
    }
  ],
  
  "prerequisite": [
    {
      "@type": "Course",
      "identifier": "{{prerequisite_section_id}}",
      "name": "{{prerequisite_section_title}}"
    }
  ],
  
  "isBasedOn": [
    {
      "@type": "TechArticle",
      "identifier": "{{cross_reference_id}}",
      "name": "{{cross_reference_title}}",
      "relevanceScore": {{relevance_score}}
    }
  ],
  
  "about": [
    {
      "@type": "DefinedTerm",
      "name": "{{term}}",
      "description": "{{term_description}}"
    }
  ],
  
  "faq": [
    {
      "@type": "Question",
      "name": "{{question}}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{answer}}"
      }
    }
  ],
  
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "/search?q={search_term_string}&context={{section_id}}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

---

## 📝 **FELDER-SPEZIFIKATION**

### **Pflichtfelder (MUSS):**

| Feld | Typ | Beschreibung | Beispiel |
|------|-----|--------------|----------|
| `@context` | String | Schema.org Context | `"https://schema.org"` |
| `@type` | String | Typ (ContextData) | `"ContextData"` |
| `identifier` | String | Section-ID | `"axiom-installation"` |
| `name` | String | Section-Titel | `"AXIOM Installation"` |
| `description` | String | Kurzbeschreibung | `"Schritt-für-Schritt..."` |
| `learningObjective` | String | Lernziel | `"Ermittler kann..."` |
| `keywords` | Array[String] | Key Topics | `["Systemanforderungen", ...]` |

---

### **Empfohlene Felder (SOLLTE):**

| Feld | Typ | Beschreibung | Beispiel |
|------|-----|--------------|----------|
| `educationalLevel` | String | Schwierigkeitsgrad | `"Beginner"`, `"Intermediate"`, `"Advanced"` |
| `complexity` | String | Komplexität | `"Simple"`, `"Standard"`, `"Complex"` |
| `isPartOf` | Object | Übergeordnetes Chapter | `{"@type": "Chapter", ...}` |
| `prerequisite` | Array[Object] | Voraussetzungen | `[{"@type": "Course", ...}]` |
| `isBasedOn` | Array[Object] | Querverweise | `[{"@type": "TechArticle", ...}]` |
| `about` | Array[Object] | Relevante Begriffe | `[{"@type": "DefinedTerm", ...}]` |
| `faq` | Array[Object] | Häufige Fragen | `[{"@type": "Question", ...}]` |

---

### **Optionale Felder (KANN):**

| Feld | Typ | Beschreibung | Beispiel |
|------|-----|--------------|----------|
| `hasPart` | Array[Object] | Unterabschnitte | `[{"@type": "Section", ...}]` |
| `potentialAction` | Object | Such-Aktion | `{"@type": "SearchAction", ...}` |
| `timeRequired` | String | Lesezeit (ISO 8601) | `"PT7M"` (7 Minuten) |
| `dateCreated` | String | Erstellungsdatum | `"2025-10-28"` |
| `dateModified` | String | Änderungsdatum | `"2025-10-28"` |

---

## 💡 **BEISPIELE**

### **Beispiel 1: Einfache Section (axiom-installation)**

```json
{
  "@context": "https://schema.org",
  "@type": "ContextData",
  
  "identifier": "axiom-installation",
  "name": "AXIOM Installation",
  "description": "Schritt-für-Schritt-Anleitung zur Installation von AXIOM Examine auf Windows-Systemen",
  
  "learningObjective": "Ermittler kann AXIOM Examine eigenständig auf einem Windows-System installieren und die Lizenz aktivieren",
  "keywords": ["Systemanforderungen", "Installations-Wizard", "Lizenzaktivierung", "Windows"],
  
  "educationalLevel": "Beginner",
  "complexity": "Simple",
  
  "isPartOf": {
    "@type": "Chapter",
    "identifier": "axiom-basics",
    "name": "AXIOM Grundlagen"
  },
  
  "prerequisite": [
    {
      "@type": "Course",
      "identifier": "technical-prerequisites",
      "name": "Technische Voraussetzungen",
      "description": "Windows 10 oder höher, Administratorrechte"
    }
  ],
  
  "about": [
    {
      "@type": "DefinedTerm",
      "name": "AXIOM Examine",
      "description": "Forensische Software zur Analyse digitaler Beweise"
    },
    {
      "@type": "DefinedTerm",
      "name": "Lizenzaktivierung",
      "description": "Prozess zur Freischaltung der Software mit einem Lizenzschlüssel"
    }
  ],
  
  "faq": [
    {
      "@type": "Question",
      "name": "Welche Windows-Version wird benötigt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Windows 10 oder höher wird benötigt. Windows 11 wird ebenfalls unterstützt."
      }
    },
    {
      "@type": "Question",
      "name": "Benötige ich Administratorrechte?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, für die Installation von AXIOM Examine werden Administratorrechte benötigt."
      }
    }
  ]
}
```

---

### **Beispiel 2: Komplexe Section mit Querverweisen (case-analysis)**

```json
{
  "@context": "https://schema.org",
  "@type": "ContextData",
  
  "identifier": "case-analysis-advanced",
  "name": "Erweiterte Fall-Analyse",
  "description": "Fortgeschrittene Techniken zur Analyse komplexer digitaler Beweise mit AXIOM Examine",
  
  "learningObjective": "Ermittler kann komplexe Fall-Analysen durchführen, mehrere Datenquellen korrelieren und Timeline-Analysen erstellen",
  "keywords": ["Timeline-Analyse", "Korrelation", "Erweiterte Filter", "Keyword-Suche"],
  
  "educationalLevel": "Advanced",
  "complexity": "Complex",
  
  "isPartOf": {
    "@type": "Chapter",
    "identifier": "advanced-analysis",
    "name": "Erweiterte Analyse-Techniken"
  },
  
  "prerequisite": [
    {
      "@type": "Course",
      "identifier": "basic-analysis",
      "name": "Grundlegende Fall-Analyse"
    },
    {
      "@type": "Course",
      "identifier": "filter-basics",
      "name": "Filter-Grundlagen"
    },
    {
      "@type": "Course",
      "identifier": "timeline-basics",
      "name": "Timeline-Grundlagen"
    }
  ],
  
  "isBasedOn": [
    {
      "@type": "TechArticle",
      "identifier": "keyword-search-advanced",
      "name": "Erweiterte Keyword-Suche",
      "relevanceScore": 0.9
    },
    {
      "@type": "TechArticle",
      "identifier": "artifact-correlation",
      "name": "Artefakt-Korrelation",
      "relevanceScore": 0.85
    }
  ],
  
  "about": [
    {
      "@type": "DefinedTerm",
      "name": "Timeline-Analyse",
      "description": "Chronologische Darstellung von Ereignissen zur Rekonstruktion von Vorgängen"
    },
    {
      "@type": "DefinedTerm",
      "name": "Korrelation",
      "description": "Verknüpfung von Daten aus verschiedenen Quellen zur Identifikation von Zusammenhängen"
    },
    {
      "@type": "DefinedTerm",
      "name": "Artefakt",
      "description": "Digitale Spuren, die durch Benutzeraktivitäten auf Computersystemen hinterlassen werden"
    }
  ],
  
  "faq": [
    {
      "@type": "Question",
      "name": "Wie viele Datenquellen können gleichzeitig analysiert werden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AXIOM Examine kann mehrere Datenquellen gleichzeitig in einem Fall analysieren. Die Anzahl ist nur durch verfügbaren Speicher begrenzt."
      }
    },
    {
      "@type": "Question",
      "name": "Was ist der Unterschied zwischen Filter und Keyword-Suche?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Filter schränken die Anzeige anhand strukturierter Metadaten ein, während Keyword-Suche Volltextsuche in Inhalten durchführt. Beide können kombiniert werden."
      }
    }
  ],
  
  "timeRequired": "PT25M"
}
```

---

## 🔧 **IMPLEMENTIERUNG**

### **Phase 1 (Template-Erstellung):**

**Status:** 🔶 **Vorbereitet, aber noch nicht implementiert**

**Im Prompt-Template ergänzen (neuer Abschnitt 13):**

```markdown
## 13. AGENT-CONTEXT-BLOCK (PHASE 4)

Der Agent-Context-Block wird am Ende jeder Section eingefügt und ermöglicht dem 
KI-Assistenten in Phase 4, kontextbewusste Fragen zu beantworten.

### 13.1 Zweck

- Strukturierte Metadaten für KI-Assistent
- Beziehungen zu anderen Sections
- FAQs zur Section
- Relevante Begriffe für Glossar-Integration

### 13.2 Struktur

```html
<script type="application/ld+json" class="agent-context" data-ref="{{section_id}}-agent-context">
{
  "@context": "https://schema.org",
  "@type": "ContextData",
  
  "identifier": "{{section_id}}",
  "name": "{{section_title}}",
  "description": "{{short_description}}",
  
  "learningObjective": "{{learning_objective}}",
  "keywords": [{{#each key_topics}}"{{this}}"{{#unless @last}}, {{/unless}}{{/each}}],
  
  "educationalLevel": "{{difficulty_level}}",
  "complexity": "{{complexity}}",
  
  {{#if chapter_id}}
  "isPartOf": {
    "@type": "Chapter",
    "identifier": "{{chapter_id}}",
    "name": "{{chapter_title}}"
  },
  {{/if}}
  
  {{#if prerequisites_contentual}}
  "prerequisite": [
    {{#each prerequisites_contentual}}
    {
      "@type": "Course",
      "identifier": "{{this.id}}",
      "name": "{{this.title}}"
    }{{#unless @last}},{{/unless}}
    {{/each}}
  ],
  {{/if}}
  
  "about": [
    // Relevante Begriffe (aus Terminologie-Liste)
  ],
  
  "faq": [
    // Häufige Fragen zur Section
  ]
}
</script>
```
```

---

### **Phase 4 (KI-Assistent Integration):**

**JavaScript für KI-Assistent:**

```javascript
// Lade Agent-Context aus aktueller Section
function loadAgentContext() {
    const contextScript = document.querySelector('.agent-context');
    if (!contextScript) {
        console.warn('Kein Agent-Context gefunden');
        return null;
    }
    
    try {
        const context = JSON.parse(contextScript.textContent);
        return context;
    } catch (e) {
        console.error('Fehler beim Parsen des Agent-Context:', e);
        return null;
    }
}

// Beantworte Frage basierend auf Kontext
async function answerQuestion(question) {
    const context = loadAgentContext();
    if (!context) {
        return "Kein Kontext verfügbar";
    }
    
    // Prüfe FAQs
    if (context.faq) {
        for (const faq of context.faq) {
            if (question.toLowerCase().includes(faq.name.toLowerCase())) {
                return faq.acceptedAnswer.text;
            }
        }
    }
    
    // Sende Frage + Kontext an KI-Backend
    const response = await fetch('/api/agent/ask', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            question: question,
            context: context
        })
    });
    
    return await response.json();
}
```

---

## ✅ **VALIDIERUNG**

### **JSON-LD Validierung:**

```python
import json
from jsonschema import validate, ValidationError

# Schema für Agent-Context
AGENT_CONTEXT_SCHEMA = {
    "type": "object",
    "required": ["@context", "@type", "identifier", "name", "description", 
                 "learningObjective", "keywords"],
    "properties": {
        "@context": {"const": "https://schema.org"},
        "@type": {"const": "ContextData"},
        "identifier": {"type": "string", "minLength": 3},
        "name": {"type": "string", "minLength": 3},
        "description": {"type": "string", "minLength": 10},
        "learningObjective": {"type": "string", "minLength": 10},
        "keywords": {
            "type": "array",
            "items": {"type": "string"},
            "minItems": 1
        },
        "educationalLevel": {
            "type": "string",
            "enum": ["Beginner", "Intermediate", "Advanced"]
        },
        "complexity": {
            "type": "string",
            "enum": ["Simple", "Standard", "Complex"]
        }
    }
}

def validate_agent_context(context_json: str) -> bool:
    try:
        context = json.loads(context_json)
        validate(instance=context, schema=AGENT_CONTEXT_SCHEMA)
        return True
    except ValidationError as e:
        print(f"Validierungsfehler: {e.message}")
        return False
    except json.JSONDecodeError as e:
        print(f"JSON-Fehler: {e}")
        return False
```

---

## 📋 **CHECKLISTE FÜR PHASE 4**

### **Vorbereitung:**
- [ ] Agent-Context-Block-Spezifikation finalisiert
- [ ] JSON-Schema definiert
- [ ] Validator implementiert
- [ ] Beispiel-Sections mit Agent-Context erstellt

### **Implementation:**
- [ ] Prompt-Template erweitert (Abschnitt 13)
- [ ] JavaScript für Context-Extraktion
- [ ] KI-Backend-Integration
- [ ] FAQ-Matching implementiert

### **Testing:**
- [ ] Agent-Context in allen Sections vorhanden
- [ ] JSON-LD validiert
- [ ] FAQ-Matching funktioniert
- [ ] Context-basierte Antworten korrekt

---

## 🎯 **ZUSAMMENFASSUNG**

### **Status: 📝 Spezifikation**

Der Agent-Context-Block ist **spezifiziert** und bereit für die Implementierung in Phase 4.

**Für Phase 1:**
- ⚠️ Noch nicht im Prompt-Template implementiert
- ✅ Spezifikation liegt vor
- ✅ Beispiele vorhanden
- ✅ Validator-Konzept definiert

**Für Phase 4:**
- ✅ Spezifikation vollständig
- ✅ JSON-LD Schema definiert
- ✅ Implementierungs-Checkliste vorhanden
- ✅ JavaScript-Beispiele vorhanden

**Nächster Schritt:**
- Abschnitt 13 im `prompt-phase1.md` ergänzen (optional)
- Oder: Warten bis Phase 4 und dann implementieren

---

**Version:** 1.0.0  
**Datum:** 2025-10-28  
**Status:** 📝 Spezifikation (bereit für Phase 4)

---

**Ende der Agent-Context-Block Spezifikation**
