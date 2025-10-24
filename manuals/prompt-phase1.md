# Phase 1: Section-Erstellung für {{section_id}}

**Projekt:** WebAssistant Forensics - {{project_topic}}
**Phase:** 1 (Section-Drafts erstellen)  
**Datum:** {{current_date}}

---

## 🎯 Deine Aufgabe

Erstelle ein **vollständiges, produktionsreifes HTML** für die Section **{{section_id}}**.

Diese Section ist Teil eines interaktiven Schulungshandbuchs für **IT-ferne Polizei-Ermittler** (Mittlere Reife, niedrige IT-Kenntnisse) zu **{{project_topic}}**.

---

## 📋 Section-Übersicht

### Metadaten

**Section-ID:** `{{section_id}}`  
**Titel:** {{section_title}}  
**Chapter:** {{chapter_id}} - {{chapter_title}}  
**Topic:** {{topic_id}} - {{topic_title}}

**Learning Objective:**  
{{learning_objective}}

**Key Topics:**
{{#each key_topics}}
- {{this}}
{{/each}}

**Complexity:** {{complexity}}  
**Difficulty Level:** {{difficulty_level}}  
**Estimated Word Count:** {{estimated_word_count}}  
**Estimated Reading Time (L2):** {{estimated_reading_time_l2}} Minuten  
**Estimated Reading Time (L3):** {{estimated_reading_time_l3}} Minuten

**Estimated Media:**
- Screenshots: {{estimated_media_screenshots}}
- Videos: {{estimated_media_videos}}
- Annotations: {{estimated_media_annotations}}
- Diagrams: {{estimated_media_diagrams}}
- Info-Boxes: {{estimated_media_info_boxes}}

**Short Description:**  
{{short_description}}

**Rationale:**  
{{rationale}}

---

## 🔗 Kontext: Einordnung in Gesamtgliederung

### Position im Workflow

{{#if predecessor_section}}
**Vorgänger:** {{predecessor_section}} (siehe unten für HTML-Content)
{{else}}
**Vorgänger:** Keine (Dies ist die erste Section im Topic)
{{/if}}

{{#if successor_section}}
**Nachfolger:** {{successor_section}} (siehe unten für Metadaten)
{{else}}
**Nachfolger:** Keine (Dies ist die letzte Section im Topic)
{{/if}}

### Prerequisites

{{#if prerequisites_contentual}}
**Inhaltliche Prerequisites (WICHTIG):**
{{#each prerequisites_contentual}}
- {{this}} (siehe unten für HTML-Content)
{{/each}}

⚠️ **Diese Sections MÜSSEN vom Leser bereits verstanden sein!** Baue darauf auf, aber wiederhole nicht unnötig.
{{else}}
**Inhaltliche Prerequisites:** Keine
{{/if}}

{{#if prerequisites_technical}}
**Technische Prerequisites:**
{{#each prerequisites_technical}}
- {{this}}
{{/each}}
{{/if}}

{{#if prerequisites_knowledge}}
**Wissens-Prerequisites:**
{{#each prerequisites_knowledge}}
- {{this}}
{{/each}}
{{/if}}

### Dependencies

{{#if dependencies}}
**Diese Section wird referenziert von:**
{{#each dependencies}}
- {{this}}
{{/each}}

💡 Stelle sicher, dass diese Sections später darauf aufbauen können.
{{else}}
**Dependencies:** Keine
{{/if}}

### Cross-References

{{#if cross_references}}
**Verwandte Sections (für Querverweise):**
{{#each cross_references}}
- **{{this.section_id}}**: {{this.reason}} (Relevanz: {{this.relevance_score}}/5)
{{/each}}

💡 Erwäge, auf diese Sections zu verweisen, falls relevant.
{{else}}
**Cross-References:** Keine
{{/if}}

---

## 📄 Vorgänger-Sections (Kontext)

{{#if predecessors}}
Die folgenden Sections wurden bereits erstellt. **Orientiere dich an Stil, Tonalität und Detailgrad.**

{{#each predecessors}}
### Vorgänger {{@index}}: {{this.metadata.section_id}} - {{this.metadata.title}}

**HTML-Source:** {{this.html_source}} {{#if (eq this.html_source "example")}}(Beispiel-Section){{/if}}{{#if (eq this.html_source "section")}}(Echte Section){{/if}}

```html
{{this.html}}
```

{{#if (eq this.html_source "example")}}
⚠️ **Hinweis:** Dies ist eine Beispiel-Section. Orientiere dich am Stil, aber die inhaltliche Tiefe kann variieren.
{{/if}}

---

{{/each}}
{{else}}
**Keine Vorgänger-Sections vorhanden.**

Dies ist die erste Section im Handbuch. Du hast keine direkten Vorgänger als Referenz, aber du findest Stil-Richtlinien im Getting Started Dokument (siehe unten).
{{/if}}

---

## 🔮 Nachfolger-Sections (Ausblick)

{{#if successors}}
Die folgenden Sections werden **nach** dieser Section erstellt. **Bereite den Leser darauf vor**, ohne zu viel vorwegzunehmen.

{{#each successors}}
### Nachfolger {{@index}}: {{this.section_id}} - {{this.title}}

**Learning Objective:** {{this.learning_objective}}

**Key Topics:**
{{#each this.key_topics}}
- {{this}}
{{/each}}

**Complexity:** {{this.complexity}}

---

{{/each}}
{{else}}
**Keine Nachfolger-Sections.**

Dies ist die letzte Section im Topic. Gib einen Abschluss, der das Gelernte zusammenfasst.
{{/if}}

---

## 📚 Prerequisites (Inhaltlicher Kontext)

{{#if prerequisites_with_html}}
Die folgenden Sections sind **inhaltliche Prerequisites** für diese Section. Der Leser hat diese bereits gelesen. **Baue darauf auf, wiederhole nicht!**

{{#each prerequisites_with_html}}
### Prerequisite: {{this.metadata.section_id}} - {{this.metadata.title}}

{{#if this.html}}
**HTML-Content:**

```html
{{this.html}}
```
{{else}}
⚠️ **WARNUNG:** HTML für diese Prerequisite-Section fehlt. Der Leser hat diese Section theoretisch gelesen, aber du hast keinen Zugriff auf den genauen Inhalt. **Gehe davon aus, dass die Basics behandelt wurden**, aber erkläre Kernkonzepte kurz, falls notwendig.
{{/if}}

---

{{/each}}
{{else}}
**Keine inhaltlichen Prerequisites.**

Du kannst bei Null anfangen. Erkläre alle Konzepte von Grund auf.
{{/if}}

---

## 🔗 Cross-References (Verwandte Sections)

{{#if cross_references_with_metadata}}
{{#each cross_references_with_metadata}}
### Cross-Reference: {{this.metadata.section_id}} - {{this.metadata.title}}

**Grund für Verweis:** {{this.reason}}  
**Relevanz:** {{this.relevance_score}}/5

**Learning Objective:** {{this.metadata.learning_objective}}

💡 **Empfehlung:** {{#if (gte this.relevance_score 4)}}Verweise explizit auf diese Section (z.B. "Siehe auch: [Section-Titel]").{{else}}Erwähne optional, falls thematisch passend.{{/if}}

---

{{/each}}
{{else}}
**Keine Cross-References.**
{{/if}}

---

## 📖 Ressourcen

Die folgenden Dokumente sind **maßgeblich** für die Erstellung der Section. Beachte sie **strikt**.

### 1. Strategiedokument (Auszug)

**Wichtigste Punkte für diese Section:**

**Zielgruppe:**
- IT-ferne Polizei-Ermittler (Mittlere Reife, niedrige IT-Kenntnisse)
- Alter: 30-55 Jahre
- Forensik-Erfahrung: Wenig bis keine
- Motivation: Pflichtschulung, oft skeptisch gegenüber neuer Software

**Tonalität:**
- Subtil-unterstützend, sachlich
- NICHT motivierend-ermunernd ("Super!", "Toll!")
- KEINE Infantilisierung
- Aktive Sprache, kurze Sätze
- Imperativ für Anweisungen ("Öffnen Sie...", nicht "Sie sollten...")

**Detail-Level-System:**
- **Level 1 (Basis):** Schritt-für-Schritt-Anleitungen (immer sichtbar)
- **Level 2 (Standard):** Erklärungen, Best Practices (ausklappbar)
- **Level 3 (Vertiefung):** Hintergründe, technische Details (ausklappbar)

**Terminologie-Strategie:**
- Deutsche Begriffe bevorzugen (z.B. "Evidenzquelle" statt "Evidence Source")
- UI-Elemente in Originalsprache (z.B. "Artifacts Explorer")
- Bei Erstnennung: deutscher Begriff + englisches Original in Klammern
- Konsistenz mit Terminologie-Entscheidungsliste (siehe unten)

**Vollständiges Strategiedokument:** Siehe Anhang A

---

### 2. JSON-LD Schema

Jede Section MUSS ein `<script type="application/ld+json">` Block enthalten mit **allen erforderlichen Metadaten**.

**Erforderliche Felder (Minimum):**
```json
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": "Section-Titel",
  "description": "Kurzbeschreibung",
  "learningResourceType": "Tutorial",
  "educationalLevel": "Beginner",
  "teaches": ["Lernziel 1", "Lernziel 2"],
  "keywords": [
    {
      "term": "Begriff",
      "language": "de|en",
      "status": "approved|proposed",
      "type": "domain-concept|technical-term|ui-element|legal-term"
    }
  ]
}
```

**Wichtig:**
- Verwende **vollständiges Schema** (siehe Anhang B)
- Fülle **alle Felder** aus (auch optionale, wo sinnvoll)
- `keywords`-Array MUSS alle verwendeten Fachbegriffe enthalten (siehe Abschnitt "Terminologie-Tags")

**Vollständiges JSON-LD Schema:** Siehe Anhang B

---

### 3. HTML-Template-Spezifikation (Matroschka-Prinzip)

**Basis-Struktur (PFLICHT):**

```html
<section id="{{section_id}}" data-section-id="{{section_id}}" class="content-section">
  <!-- JSON-LD Metadaten -->
  <script type="application/ld+json">
    { ... }
  </script>
  
  <!-- Section-Header -->
  <header class="section-header">
    <h2>Section-Titel</h2>
    <p class="section-description">Kurzbeschreibung</p>
  </header>
  
  <!-- Level 1: Basis-Content (immer sichtbar) -->
  <div class="detail-level-1">
    <!-- Schritt-für-Schritt-Anleitungen -->
  </div>
  
  <!-- Level 2: Erklärungen (ausklappbar) -->
  <details class="detail-level-2">
    <summary>Mehr erfahren</summary>
    <!-- Best Practices, Hintergründe -->
  </details>
  
  <!-- Level 3: Vertiefung (ausklappbar) -->
  <details class="detail-level-3">
    <summary>Technische Details</summary>
    <!-- Technische Hintergründe -->
  </details>
  
  <!-- Navigation -->
  <nav class="section-navigation">
    <a href="#{{predecessor_section}}" class="nav-prev">← Zurück</a>
    <a href="#{{successor_section}}" class="nav-next">Weiter →</a>
  </nav>
</section>
```

**Wichtigste Regeln:**
- **Matroschka-Prinzip:** Jedes Level enthält das vorherige vollständig
- **ARIA-Attribute:** `aria-label`, `role` für Barrierefreiheit
- **Sprachauszeichnung:** `lang="de"` für deutsche Texte, `lang="en"` für englische UI-Elemente
- **Semantisches HTML:** `<section>`, `<article>`, `<aside>`, `<figure>`, `<nav>`

**Vollständige HTML-Template-Spezifikation:** Siehe Anhang C

---

### 4. Terminologie-Entscheidungsliste

**Zweck:** Konsistente Verwendung von Fachbegriffen über alle Sections hinweg.

**Wichtigste Begriffe:**

{{#if terminology_list}}
| Deutscher Begriff | Englisches Original | Status | Kontext |
|-------------------|---------------------|--------|---------|
{{#each terminology_list}}
| {{this.german_term}} | {{this.english_term}} | {{this.status}} | {{this.context}} |
{{/each}}
{{else}}
_(Terminologie-Liste wird dynamisch geladen)_
{{/if}}

**Regeln:**
1. **Bei Erstnennung:** Deutscher Begriff + englisches Original in Klammern
   - Beispiel: "Evidenzquelle (Evidence Source)"
2. **Danach:** Nur deutscher Begriff
3. **UI-Elemente:** Immer in Originalsprache (z.B. "Artifacts Explorer")
4. **Konsistenz:** Verwende EXAKT die Begriffe aus dieser Liste

**Vollständige Terminologie-Entscheidungsliste:** Siehe Anhang D

---

### 5. Getting Started Dokument (Stil-Richtlinien)

**Wichtigste Stil-Regeln:**

**Tonalität:**
- ✅ Sachlich, klar, präzise
- ✅ Aktive Sprache ("Öffnen Sie..." statt "Es wird geöffnet...")
- ✅ Kurze Sätze (max. 20 Wörter)
- ❌ Keine Motivationssprüche ("Super!", "Toll!")
- ❌ Keine Infantilisierung ("Ganz einfach!", "Kinderleicht!")

**Formulierungsmuster:**

**Schritte (Level 1):**
- ✅ "Öffnen Sie File → New Case"
- ✅ "Geben Sie einen Fallnamen ein"
- ❌ "Sie sollten File → New Case öffnen"

**Erklärungen (Level 2):**
- ✅ "Dieser Schritt ist wichtig, weil..."
- ✅ "Best Practice: Verwenden Sie Schema XY"
- ❌ "Es ist empfehlenswert, dass..."

**Hintergründe (Level 3):**
- ✅ "AXIOM erstellt intern eine SQLite-Datenbank"
- ✅ "Alternative: Template verwenden (siehe Section...)"
- ❌ "Theoretisch könnte man auch..."

**Häufige Fehler vermeiden:**
- ❌ Zu akademisch: "Die Applikation implementiert..."
- ✅ Praxisnah: "AXIOM erstellt..."

- ❌ Zu vage: "Eventuell sollten Sie..."
- ✅ Konkret: "Wählen Sie Option XY"

- ❌ Redundanz: Dasselbe mehrfach erklären
- ✅ Prägnant: Einmal klar erklären, dann weitermachen

**Vollständiges Getting Started Dokument:** Siehe Anhang E

---

## 🎯 Deine konkrete Aufgabe

### Was du erstellen sollst

Erstelle ein **vollständiges, produktionsreifes HTML** für Section `{{section_id}}` mit folgenden Komponenten:

1. **JSON-LD Metadaten-Block** (siehe Abschnitt "Output-Format")
2. **Section-Header** mit Titel und Kurzbeschreibung
3. **Level 1 Content** (Basis-Anleitung, immer sichtbar)
4. **Level 2 Content** (Erklärungen, ausklappbar)
5. **Level 3 Content** (Vertiefung, ausklappbar) - nur wenn relevant für diese Section
6. **Navigation** (Links zu Vorgänger/Nachfolger)
7. **Terminologie-Tags** im JSON-LD Block

### Wichtige Anforderungen

**Content:**
- ✅ Erfülle das **Learning Objective** vollständig
- ✅ Behandle alle **Key Topics**
- ✅ Beachte die **Complexity** (Einfach/Standard/Komplex)
- ✅ Orientiere dich am **Estimated Word Count** (±20% erlaubt)
- ✅ Baue auf **Prerequisites** auf (wiederhole nicht!)
- ✅ Bereite **Nachfolger** vor (ohne zu viel vorwegzunehmen)

**Stil:**
- ✅ Tonalität: Subtil-unterstützend, sachlich (siehe Getting Started)
- ✅ Zielgruppe: IT-fern, Mittlere Reife
- ✅ Satzlänge: Max. 20 Wörter
- ✅ Imperativ für Anweisungen
- ❌ KEINE Motivationssprüche, keine Infantilisierung

**Technisch:**
- ✅ Valides HTML5
- ✅ BFSG-konform (Barrierefreiheit)
  - `lang`-Attribute für Sprachwechsel
  - ARIA-Labels für interaktive Elemente
  - Semantisches HTML
- ✅ Matroschka-Prinzip beachten
- ✅ JSON-LD vollständig ausgefüllt

**Terminologie:**
- ✅ Verwende Begriffe aus Terminologie-Entscheidungsliste
- ✅ Bei Erstnennung: Deutsch + Englisch in Klammern
- ✅ UI-Elemente in Originalsprache
- ✅ Konsistenz über die Section hinweg

**Medien-Platzhalter:**
- ✅ Füge Platzhalter für geschätzte Medien ein (z.B. `<figure class="placeholder-screenshot">`)
- ✅ Beschreibe in Kommentaren, was das Medium zeigen soll
- ❌ Keine echten Bild-URLs (Medien werden später in Phase 5 erstellt)

---

## 📝 Output-Format

### Struktur

Dein Output muss EXAKT diese Struktur haben:

```html
<section id="{{section_id}}" data-section-id="{{section_id}}" class="content-section" lang="de">
  
  <!-- 1. JSON-LD Metadaten -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Section-Titel",
    "description": "Kurzbeschreibung",
    "learningResourceType": "Tutorial",
    "educationalLevel": "Beginner|Intermediate|Advanced",
    "educationalUse": "instruction",
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    },
    "teaches": [
      "Lernziel 1",
      "Lernziel 2"
    ],
    "keywords": [
      {
        "term": "Begrif 1",
        "language": "de",
        "status": "approved",
        "type": "domain-concept"
      },
      {
        "term": "UI Element",
        "language": "en",
        "status": "approved",
        "type": "ui-element",
        "tool": "AXIOM"
      }
    ],
    "inLanguage": "de-DE",
    "isPartOf": {
      "@type": "Course",
      "name": "{{project_topic}}",
      "provider": {
        "@type": "Organization",
        "name": "WebAssistant Forensics"
      }
    },
    "position": {{section_position}},
    "hasPart": [
      {
        "@type": "HowToStep",
        "name": "Schritt 1",
        "text": "Beschreibung"
      }
    ],
    "accessMode": ["textual", "visual"],
    "accessibilityFeature": [
      "structuralNavigation",
      "alternativeText",
      "longDescription"
    ],
    "accessibilityHazard": ["none"],
    "accessibilityControl": ["fullKeyboardControl", "fullMouseControl"]
  }
  </script>
  
  <!-- 2. Section-Header -->
  <header class="section-header">
    <h2 id="{{section_id}}-heading">{{section_title}}</h2>
    <p class="section-description">{{short_description}}</p>
  </header>
  
  <!-- 3. Level 1: Basis-Content -->
  <div class="detail-level-1" aria-label="Grundlegende Anleitung">
    <!-- Schritt-für-Schritt-Anleitung -->
    <ol class="steps-list">
      <li>
        <strong>Schritt 1:</strong> ...
      </li>
      <li>
        <strong>Schritt 2:</strong> ...
      </li>
    </ol>
    
    <!-- Medien-Platzhalter -->
    <figure class="placeholder-screenshot" data-media-type="screenshot">
      <figcaption>Screenshot: ...</figcaption>
      <!-- TODO: Screenshot wird in Phase 5 hinzugefügt -->
    </figure>
  </div>
  
  <!-- 4. Level 2: Erklärungen (ausklappbar) -->
  <details class="detail-level-2">
    <summary>Mehr erfahren: Hintergründe und Best Practices</summary>
    <div class="detail-content" aria-label="Detaillierte Erklärungen">
      <!-- Best Practices, Hintergründe -->
      <h3>Warum ist dieser Schritt wichtig?</h3>
      <p>...</p>
      
      <aside class="tip-box" role="note">
        <strong>💡 Tipp:</strong> ...
      </aside>
      
      <aside class="warning-box" role="alert">
        <strong>⚠️ Warnung:</strong> ...
      </aside>
    </div>
  </details>
  
  <!-- 5. Level 3: Vertiefung (ausklappbar, optional) -->
  <details class="detail-level-3">
    <summary>Technische Details</summary>
    <div class="detail-content" aria-label="Technische Vertiefung">
      <!-- Technische Hintergründe -->
      <h3>Was passiert im Hintergrund?</h3>
      <p>...</p>
    </div>
  </details>
  
  <!-- 6. Navigation -->
  <nav class="section-navigation" aria-label="Section-Navigation">
    {{#if predecessor_section}}
    <a href="#{{predecessor_section}}" class="nav-prev" aria-label="Zur vorherigen Section">
      ← Zurück: {{predecessor_section_title}}
    </a>
    {{/if}}
    {{#if successor_section}}
    <a href="#{{successor_section}}" class="nav-next" aria-label="Zur nächsten Section">
      Weiter: {{successor_section_title}} →
    </a>
    {{/if}}
  </nav>
  
</section>
```

---

## 🏷️ Terminologie-Tags

**WICHTIG:** Füge im JSON-LD Block ein `keywords`-Array mit **allen verwendeten Fachbegriffen** hinzu.

### Format

```json
"keywords": [
  {
    "term": "Evidenzquelle",
    "language": "de",
    "status": "approved",
    "type": "domain-concept"
  },
  {
    "term": "Hash",
    "language": "en",
    "status": "approved",
    "type": "technical-term"
  },
  {
    "term": "Artifacts Explorer",
    "language": "en",
    "status": "approved",
    "type": "ui-element",
    "tool": "AXIOM"
  }
]
```

### Attribute

- **`term`** (String, PFLICHT): Der Begriff selbst
- **`language`** (String, PFLICHT): `"de"` oder `"en"`
- **`status`** (String, PFLICHT): 
  - `"approved"` - Begriff ist in Terminologie-Liste enthalten
  - `"proposed"` - Neuer Begriff, soll zur Liste hinzugefügt werden
- **`type`** (String, PFLICHT):
  - `"domain-concept"` - Fachbegriff aus der Domäne (z.B. "Evidenzquelle", "Analyse")
  - `"technical-term"` - Technischer Begriff (z.B. "Hash", "SQLite", "Metadaten")
  - `"ui-element"` - UI-Element aus {{project_topic}} (z.B. "Artifacts Explorer", "Case Dashboard")
  - `"legal-term"` - Juristischer Begriff (z.B. "Beweismittel", "Beschlagnahme")
- **`tool`** (String, OPTIONAL): Bei `type: "ui-element"` → Name des Tools (z.B. `"AXIOM"`)

### Regeln

1. **Identifiziere alle Fachbegriffe** in der Section (Nomen, keine Verben)
2. **Prüfe Terminologie-Entscheidungsliste:**
   - Wenn vorhanden → `status: "approved"`
   - Wenn nicht vorhanden → `status: "proposed"`
3. **Kategorisiere** nach `type`
4. **Keine Duplikate** - Jeder Begriff nur einmal
5. **Sortiere** alphabetisch nach `term`

### Beispiel

Angenommen, die Section enthält folgende Begriffe:
- "Evidenzquelle" (in Terminologie-Liste, Fachbegriff)
- "Hash" (in Terminologie-Liste, technisch)
- "Artifacts Explorer" (in Terminologie-Liste, UI-Element)
- "Prüfsumme" (NICHT in Liste, technisch) → NEU!

```json
"keywords": [
  {
    "term": "Artifacts Explorer",
    "language": "en",
    "status": "approved",
    "type": "ui-element",
    "tool": "AXIOM"
  },
  {
    "term": "Evidenzquelle",
    "language": "de",
    "status": "approved",
    "type": "domain-concept"
  },
  {
    "term": "Hash",
    "language": "en",
    "status": "approved",
    "type": "technical-term"
  },
  {
    "term": "Prüfsumme",
    "language": "de",
    "status": "proposed",
    "type": "technical-term"
  }
]
```

---

## ✅ Qualitätskriterien

Vor dem Absenden: Prüfe, ob dein Output alle Kriterien erfüllt.

### Inhalt

- [ ] Learning Objective vollständig erfüllt
- [ ] Alle Key Topics behandelt
- [ ] Complexity angemessen (nicht zu einfach/komplex für Zielgruppe)
- [ ] Word Count im Rahmen (±20% von {{estimated_word_count}})
- [ ] Auf Prerequisites aufgebaut (nicht wiederholt)
- [ ] Nachfolger vorbereitet (ohne zu viel vorwegzunehmen)
- [ ] Cross-References berücksichtigt (falls vorhanden)

### Stil

- [ ] Tonalität: Subtil-unterstützend, sachlich
- [ ] Zielgruppengerecht (IT-fern, Mittlere Reife)
- [ ] Kurze Sätze (max. 20 Wörter)
- [ ] Imperativ für Anweisungen
- [ ] Keine Motivationssprüche, keine Infantilisierung
- [ ] Aktive Sprache (keine Passiv-Konstruktionen)

### Terminologie

- [ ] Begriffe aus Terminologie-Entscheidungsliste verwendet
- [ ] Bei Erstnennung: Deutsch + Englisch in Klammern
- [ ] UI-Elemente in Originalsprache
- [ ] Konsistenz über die Section hinweg
- [ ] Alle Begriffe in `keywords`-Array erfasst

### Technisch

- [ ] Valides HTML5
- [ ] JSON-LD vollständig ausgefüllt
- [ ] Matroschka-Prinzip beachtet (Level 1 → 2 → 3)
- [ ] BFSG-konform (Barrierefreiheit):
  - [ ] `lang`-Attribute für Sprachwechsel
  - [ ] ARIA-Labels für interaktive Elemente
  - [ ] Semantisches HTML
  - [ ] Navigationshilfen
- [ ] Medien-Platzhalter eingefügt (mit Beschreibung in Kommentaren)

### Detail-Levels

- [ ] **Level 1** vorhanden: Schritt-für-Schritt-Anleitung (immer sichtbar)
- [ ] **Level 2** vorhanden: Erklärungen, Best Practices (ausklappbar)
- [ ] **Level 3** optional: Technische Details (nur wenn relevant)
- [ ] Jedes Level ist in sich geschlossen (Matroschka!)

---

## 📎 Anhänge

### Anhang A: Vollständiges Strategiedokument

```markdown
{{strategiedokument_content}}
```

---

### Anhang B: Vollständiges JSON-LD Schema

```json
{{json_ld_schema_content}}
```

---

### Anhang C: Vollständige HTML-Template-Spezifikation

```markdown
{{html_template_spec_content}}
```

---

### Anhang D: Vollständige Terminologie-Entscheidungsliste

```markdown
{{terminologie_list_content}}
```

---

### Anhang E: Vollständiges Getting Started Dokument

```markdown
{{getting_started_content}}
```

---

## 🚀 Los geht's!

Du hast jetzt alle Informationen. **Erstelle das vollständige Section-HTML für `{{section_id}}`.**

Viel Erfolg! 🎯
