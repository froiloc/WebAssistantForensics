# Phase 1: Section-Erstellung für {{section_id}}

**Datum:** {{current_date}}  
**Section:** {{section_id}} ({{section_title}})  
**Chapter:** {{chapter_id}} ({{chapter_title}})  
**Topic:** {{topic_id}} ({{topic_title}})  
**Difficulty:** {{difficulty_level}} | **Complexity:** {{complexity}}

---

## 📋 INHALTSVERZEICHNIS

1. [Projektkontext & Aufgabe](#1-projektkontext--aufgabe)
2. [Aktuelle Section - Anforderungen](#2-aktuelle-section---anforderungen)
3. [Kontext: Vorgänger & Nachfolger](#3-kontext-vorgänger--nachfolger)
4. [HTML-Struktur-Anforderungen](#4-html-struktur-anforderungen)
5. [JSON-LD Metadaten](#5-json-ld-metadaten)
6. [Matroschka-Prinzip (Detail-Levels)](#6-matroschka-prinzip-detail-levels)
7. [Content-Type-Boxen](#7-content-type-boxen)
8. [Terminologie-Strategie](#8-terminologie-strategie)
9. [Barrierefreiheit (BFSG)](#9-barrierefreiheit-bfsg)
10. [Medien-Strategie](#10-medien-strategie)
11. [Qualitätskriterien & Checkliste](#11-qualitätskriterien--checkliste)
12. [Anhang: Ressourcen](#12-anhang-ressourcen)

---

## 1. PROJEKTKONTEXT & AUFGABE

### 1.1 Projekt-Überblick

**WebAssistant Forensics** erstellt interaktive, webbasierte Schulungshandbücher für forensische Software-Tools. Der aktuelle Prototyp fokussiert auf **Magnet AXIOM Examine (v7.0-7.5)** für **IT-ferne Polizei-Ermittler**.

**Zielgruppe:**
- Bildungsniveau: Mittlere Reife
- IT-Kenntnisse: Niedrig bis mittel
- Kontext: Ermittlungsarbeit, keine IT-Ausbildung
- Bedarf: Praktische Anleitung, kein theoretisches Wissen

**Tonalität:**
- ✅ Subtil-unterstützend, sachlich
- ✅ Klar und präzise
- ✅ Praxisorientiert
- ❌ NICHT motivierend-ermunernd ("Super!", "Toll!")
- ❌ NICHT infantilisierend
- ❌ NICHT akademisch

### 1.2 Deine Aufgabe

**Erstelle eine vollständige HTML-Section** mit folgenden Eigenschaften:

1. **Vollständiger HTML-Code** - Produktionsreif, direkt verwendbar
2. **JSON-LD Metadaten** - Schema-konform im `<script>`-Tag
3. **3 Detail-Levels** - Matroschka-Prinzip (Level 1 ⊆ Level 2 ⊆ Level 3)
4. **BFSG-konform** - Barrierefreiheit nach deutschem Gesetz
5. **Terminologie-konsistent** - Gemäß Entscheidungsliste
6. **Agent-Context-Block** - Am Ende der Section (für Phase 4)

**Output-Format:** Vollständiges HTML (keine Markdown-Snippets)

---

## 2. AKTUELLE SECTION - ANFORDERUNGEN

### 2.1 Section-Metadaten

```yaml
Section-ID: {{section_id}}
Titel: {{section_title}}
Chapter: {{chapter_id}} ({{chapter_title}})
Topic: {{topic_id}} ({{topic_title}})

Lernziel: {{learning_objective}}

Key Topics:
{{#each key_topics}}
  - {{this}}
{{/each}}

Kurzbeschreibung: {{short_description}}

Rationale: {{rationale}}

Complexity: {{complexity}}
Difficulty Level: {{difficulty_level}}
Estimated Word Count: {{estimated_word_count}}
Reading Time (L2): {{estimated_reading_time_l2}} Minuten
Reading Time (L3): {{estimated_reading_time_l3}} Minuten
```

### 2.2 Geschätzte Medien

```yaml
Screenshots: {{estimated_media_screenshots}}
Videos: {{estimated_media_videos}}
Annotierte Screenshots: {{estimated_media_annotations}}
Diagramme: {{estimated_media_diagrams}}
Info-Boxen: {{estimated_media_info_boxes}}
```

**Hinweis:** Erstelle Medien-Platzhalter mit `<button class="media-help-trigger">` (siehe Abschnitt 10).

### 2.3 Prerequisites & Dependencies

**Contentual Prerequisites (fachlich):**
{{#if prerequisites_contentual}}
{{#each prerequisites_contentual}}
  - {{this}}
{{/each}}
{{else}}
  - Keine fachlichen Voraussetzungen
{{/if}}

**Technical Prerequisites (technisch):**
{{#if prerequisites_technical}}
{{#each prerequisites_technical}}
  - {{this}}
{{/each}}
{{else}}
  - Keine technischen Voraussetzungen
{{/if}}

**Knowledge Prerequisites (Wissensbasis):**
{{#if prerequisites_knowledge}}
{{#each prerequisites_knowledge}}
  - {{this}}
{{/each}}
{{else}}
  - Keine Wissensvoraussetzungen
{{/if}}

**Dependencies (Abhängigkeiten):**
{{#if dependencies}}
{{#each dependencies}}
  - {{this}}
{{/each}}
{{else}}
  - Keine Abhängigkeiten
{{/if}}

---

## 3. KONTEXT: VORGÄNGER & NACHFOLGER

### 3.1 Vorgänger-Sections (für Stil & Konsistenz)

{{#if predecessors}}
**Du hast {{predecessors.length}} Vorgänger-Section(s). Orientiere dich an deren Stil, Struktur und Terminologie.**

{{#each predecessors}}
---
**Vorgänger {{@index}}: {{metadata.sectionId}}**

**Titel:** {{metadata.title}}

**HTML-Quelle:** {{html_source}} (section = echte Section, example = Beispiel-Section, missing = Fallback)

{{#if html}}
**HTML-Content (zur Orientierung):**

```html
{{html}}
```
{{else}}
**Kein HTML verfügbar** - Verwende allgemeine Richtlinien
{{/if}}

{{/each}}
{{else}}
**Keine Vorgänger-Sections verfügbar.** Dies ist eine der ersten Sections. Orientiere dich am Getting-Started-Dokument (siehe Anhang 12.5).
{{/if}}

### 3.2 Nachfolger-Sections (für Übergänge)

{{#if successors}}
**Diese Section führt zu {{successors.length}} Nachfolger-Section(s).**

{{#each successors}}
  - **{{sectionId}}:** {{title}}
{{/each}}

**Hinweis:** Erstelle am Ende der Section einen sanften Übergang zur nächsten Section ({{successor_section}}).
{{else}}
**Keine Nachfolger-Sections definiert.** Dies ist eine der letzten Sections im Chapter.
{{/if}}

### 3.3 Prerequisite-Sections (mit HTML)

{{#if prerequisites_with_html}}
**Diese Sections müssen VOR der aktuellen Section verstanden sein:**

{{#each prerequisites_with_html}}
---
**Prerequisite: {{metadata.sectionId}}**

**Titel:** {{metadata.title}}

{{#if html}}
**HTML-Content:**

```html
{{html}}
```
{{else}}
**⚠️ KRITISCH: HTML fehlt!** Diese Section ist eine Voraussetzung, aber noch nicht erstellt. Referenziere sie trotzdem.
{{/if}}

{{/each}}
{{else}}
**Keine Prerequisites mit HTML.**
{{/if}}

### 3.4 Cross-Referenced Sections

{{#if cross_references}}
**Diese Sections sind thematisch verwandt (für Cross-Links):**

{{#each cross_references}}
  - **{{section_id}}** (Relevanz: {{relevance_score}}/10)
    Grund: {{reason}}
{{/each}}

**Aufgabe:** Füge 1-3 Cross-References im Abschnitt "Weiterführende Informationen" (Level 2) ein.
{{else}}
**Keine Cross-References definiert.**
{{/if}}

---

## 4. HTML-STRUKTUR-ANFORDERUNGEN

### 4.1 Section-Container (Pflicht-Attribute)

```html
<section class="content-section"
         id="section-{{section_id}}"
         data-section="{{section_id}}"
         data-level="3"
         data-parent="{{chapter_id}}"
         data-title="{{section_title}}"
         data-detail-level="2"
         lang="de">
  
  <!-- Content hier -->
  
</section>
```

**Attribut-Reihenfolge:** `class` → `id` → `data-*` → sonstige

**Formatierung:** 4 Spaces Einrückung, mehrzeilig ab >3 Attributen

### 4.2 Erlaubte HTML-Elemente (Whitelist)

**Strukturierung:**
- `<p>`, `<ul>`, `<ol>`, `<li>`, `<dl>`, `<dt>`, `<dd>`

**Überschriften:**
- `<h3>`, `<h4>`, `<h5>`, `<h6>` (KEINE `<h1>`, `<h2>`)

**Textauszeichnung:**
- `<strong>`, `<em>`, `<code>`, `<kbd>`, `<mark>`

**Links:**
- `<a>` mit `href`, `rel`, `aria-label` (bei externen Links)

**Medien:**
- `<figure>`, `<figcaption>`, `<button>` (für Media-Trigger)

**Content-Type-Boxen:**
- `<aside>` mit CSS-Klassen (siehe Abschnitt 7)

**Sprachauszeichnung:**
- `<span lang="...">` für fremdsprachige Begriffe

**Sonstige:**
- `<div>`, `<section>`, `<script>`, `<br>`

**NICHT erlaubt:**
- `<h1>`, `<h2>`, `<img>`, `<video>`, `<audio>`, `<table>`, `<form>`, `<input>`

### 4.3 Überschriften-Hierarchie (BFSG-Pflicht)

```
<h3> {{section_title}}                    ← Erste Überschrift (Pflicht)
  └─ <h4> Unterabschnitt
      └─ <h5> Detailabschnitt
          └─ <h6> Feingranular (nur Level 3)
```

**Regeln:**
- ✅ Erste Überschrift MUSS `<h3>` sein
- ✅ Keine Sprünge (h3 → h5 ist VERBOTEN, h3 → h4 ist OK)
- ✅ Alle Überschriften mit `data-ref="{{section_id}}-heading-N"`
- ❌ KEINE `<h1>` oder `<h2>` in Sections

**Beispiel:**

```html
<h3 data-ref="{{section_id}}-heading-1">{{section_title}}</h3>
<h4 data-ref="{{section_id}}-heading-2">Vorbereitung</h4>
<h5 data-ref="{{section_id}}-heading-3">Benötigte Tools</h5>
```

### 4.4 data-ref System (Navigation)

**Jedes navigierbare Element braucht `data-ref`:**

```html
<h3 data-ref="{{section_id}}-heading-1">Titel</h3>
<h4 data-ref="{{section_id}}-heading-2">Unterabschnitt</h4>
<ul data-ref="{{section_id}}-list-1">...</ul>
<aside data-ref="{{section_id}}-warning-1">...</aside>
```

**Format:** `{section_id}-{element_type}-{number}`

**Namenskonventionen:**
- heading-N: Überschriften
- list-N: Listen
- warning-N, hint-N, info-N: Content-Type-Boxen
- figure-N: Medien
- agent-context: Agent-Context-Block

---

## 5. JSON-LD METADATEN

### 5.1 Vollständiges JSON-LD Template

**Pflicht: Erstes Element innerhalb `<section>`, vor allem Content**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "identifier": "{{section_id}}",
  "name": "{{section_title}}",
  "description": "{{short_description}}",
  "version": "1.0.0",
  "dateCreated": "{{current_date}}",
  "dateModified": "{{current_date}}",
  "author": {
    "@type": "Organization",
    "name": "Claude Sonnet 4.5",
    "email": "claude-sonnet-4.5@ai.anthropic.com"
  },
  "inLanguage": "de",
  "learningResourceType": "tutorial",
  "audience": {
    "@type": "EducationalAudience",
    "audienceType": "IT-ferne Polizei-Ermittler"
  },
  "educationalLevel": "{{difficulty_level}}",
  "timeRequired": "PT{{estimated_reading_time_l2}}M",
  "difficultyLevel": "{{complexity}}",
  "isPartOf": {
    "@type": "Chapter",
    "identifier": "{{chapter_id}}",
    "name": "{{chapter_title}}"
  },
  "teaches": [
    {{#each key_topics}}
    "{{this}}"{{#unless @last}},{{/unless}}
    {{/each}}
  ],
  "about": {
    "@type": "SoftwareApplication",
    "name": "Magnet AXIOM Examine",
    "softwareVersion": "7.0-7.5"
  },
  {{#if prerequisites_contentual}}
  "requires": [
    {{#each prerequisites_contentual}}
    "{{this}}"{{#unless @last}},{{/unless}}
    {{/each}}
  ],
  {{/if}}
  {{#if predecessor_section}}
  "predecessor": "{{predecessor_section}}",
  {{/if}}
  {{#if successor_section}}
  "successor": "{{successor_section}}",
  {{/if}}
  "keywords": [
    {{#each key_topics}}
    {
      "term": "{{this}}",
      "language": "de"
    }{{#unless @last}},{{/unless}}
    {{/each}}
  ]
}
</script>
```

### 5.2 Wichtige Hinweise zu JSON-LD

1. **Valides JSON:** Keine trailing commas, korrekte Quotes
2. **timeRequired:** ISO-8601 Format (PT8M = 8 Minuten)
3. **keywords:** Mindestens 1 Eintrag mit `term` und `language`
4. **identifier:** MUSS mit `data-section` Attribut übereinstimmen

---

## 6. MATROSCHKA-PRINZIP (DETAIL-LEVELS)

### 6.1 Grundprinzip

```
Level 1 ⊆ Level 2 ⊆ Level 3

Level 1: Nur Schritte (Schnellübersicht)
Level 2: Level 1 + Best-Practice (80%-Lösung)
Level 3: Level 2 + Vollständige Tiefe (100%, praxisnah)
```

**Metapher:** Wie Matroschka-Puppen - jedes Level enthält das vorherige plus mehr.

### 6.2 Level 1: Schnellübersicht (PFLICHT)

**Zielgruppe:** Ermittler, die den Prozess kennen, nur Schritte-Reihenfolge brauchen

**Inhalt:**
- ✅ Nummerierte Schritte (nur Aktionen)
- ✅ Kritische Warnungen
- ✅ 1-2 Screenshots (wichtigste UI-Elemente)
- ❌ KEINE Erklärungen ("warum?")
- ❌ KEINE Hintergründe
- ❌ KEINE Alternativen

**HTML-Struktur:**

```html
<div class="detail-level-1">
  
  <h3 data-ref="{{section_id}}-heading-1">{{section_title}}</h3>
  
  <h4 data-ref="{{section_id}}-heading-2">Schritte</h4>
  <ol data-content-type="instruction">
    <li><strong>Schritt 1:</strong> Öffnen Sie File → New Case</li>
    <li><strong>Schritt 2:</strong> Geben Sie Fallnamen ein</li>
    <li><strong>Schritt 3:</strong> Wählen Sie Speicherort</li>
    <li><strong>Schritt 4:</strong> Klicken Sie OK</li>
  </ol>
  
  <aside class="warning-box" data-ref="{{section_id}}-warning-1" data-content-type="warning">
    <p><strong>🚨 Warnung:</strong> Speichern Sie NIEMALS auf Netzwerklaufwerken (Performance-Probleme).</p>
  </aside>
  
  <figure data-media-type="screenshot" data-ref="{{section_id}}-figure-1">
    <button class="media-help-trigger" 
            data-media-id="media-{{section_id}}-1"
            aria-label="Screenshot von New Case Dialog anfordern">
      📷 Screenshot anfordern
    </button>
    <figcaption id="fig-{{section_id}}-1">New Case Dialog mit Fallnamen-Eingabe</figcaption>
    <!-- MEDIA: Screenshot von File → New Case Dialog -->
  </figure>
  
</div>
```

### 6.3 Level 2: Best-Practice (Standard)

**Zielgruppe:** Normale Ermittler, die effektiv arbeiten wollen

**Inhalt:**
- ✅ **Level 1 komplett** (alle Schritte)
- ✅ **+ Kurze Erklärungen** (1-2 Sätze pro Schritt)
- ✅ **+ Kontextualisierung** (Einleitung: "Worum geht's?")
- ✅ **+ Best-Practice-Hinweise**
- ✅ **+ 3-5 Screenshots**
- ❌ KEINE technischen Hintergründe
- ❌ KEINE Sonderfälle
- ❌ KEINE Alternativen

**HTML-Struktur:**

```html
<div class="detail-level-2">
  
  <p data-content-type="introduction">
    Diese Section behandelt {{short_description}}. Sie lernen, {{learning_objective}}.
  </p>
  
  <h4 data-ref="{{section_id}}-heading-3">Vorbereitung</h4>
  <p data-content-type="background">
    Bevor Sie starten, stellen Sie sicher, dass {{prerequisites_contentual}}.
  </p>
  
  <h4 data-ref="{{section_id}}-heading-4">Erklärungen zu den Schritten</h4>
  <dl data-content-type="explanation">
    <dt><strong>Zu Schritt 1 (File → New Case):</strong></dt>
    <dd>Dieser Dialog ist der Startpunkt jeder Analyse. AXIOM legt hier die Projektstruktur an.</dd>
    
    <dt><strong>Zu Schritt 2 (Fallname):</strong></dt>
    <dd>Verwenden Sie ein Schema wie 'Jahr-Aktenzeichen-Beschreibung' für bessere Übersicht.</dd>
  </dl>
  
  <aside class="hint-box" data-ref="{{section_id}}-hint-1" data-content-type="hint">
    <p><strong>💡 Best Practice:</strong> Verwenden Sie aussagekräftige Fallnamen ohne Sonderzeichen.</p>
  </aside>
  
  <figure data-media-type="screenshot" data-ref="{{section_id}}-figure-2">
    <button class="media-help-trigger" 
            data-media-id="media-{{section_id}}-2"
            aria-label="Screenshot von Fallnamen-Eingabe anfordern">
      📷 Screenshot anfordern
    </button>
    <figcaption id="fig-{{section_id}}-2">Fallnamen-Eingabe mit Best-Practice-Schema</figcaption>
    <!-- MEDIA: Screenshot von Fallnamen-Eingabe -->
  </figure>
  
  <h4 data-ref="{{section_id}}-heading-5">Weiterführende Informationen</h4>
  <ul>
    {{#if cross_references}}
    {{#each cross_references}}
    <li>
      <a href="#{{section_id}}" data-ref-target="{{section_id}}">{{section_id}}</a> – {{reason}}
    </li>
    {{/each}}
    {{else}}
    <li>Keine weiteren Informationen verfügbar</li>
    {{/if}}
  </ul>
  
</div>
```

### 6.4 Level 3: Vollständige Tiefe (Detailliert)

**Zielgruppe:** Fortgeschrittene Ermittler, die alle Optionen verstehen wollen

**Inhalt:**
- ✅ **Level 1 + Level 2 komplett**
- ✅ **+ Technische Hintergründe** (5-10 Sätze, praxisnah)
- ✅ **+ Alle Einstellungen erklärt**
- ✅ **+ Sonderfälle / Edge Cases**
- ✅ **+ Alternative Ansätze** (mit Vor-/Nachteilen)
- ✅ **+ 5+ Screenshots + Videos**
- ❌ KEINE akademischen Theorien

**HTML-Struktur:**

```html
<div class="detail-level-3">
  
  <h4 data-ref="{{section_id}}-heading-6">Hintergründe (Detail-Level 3)</h4>
  <p data-content-type="background">
    AXIOM erstellt intern eine SQLite-Datenbank im gewählten Speicherort. 
    Der Fallname wird als Dateiname verwendet, wobei ungültige Zeichen 
    (< > : " / \ | ? *) automatisch entfernt werden. Die Datenbank speichert 
    alle Metadaten, Artefakte und Analyseresultate. Bei großen Fällen (>500 GB) 
    kann die Datenbank mehrere Gigabyte groß werden.
  </p>
  
  <h5 data-ref="{{section_id}}-heading-7">Erweiterte Einstellungen</h5>
  <dl data-content-type="explanation">
    <dt><strong>Speicherort-Wahl:</strong></dt>
    <dd>Wählen Sie SSDs für beste Performance. Mechanische Festplatten (HDD) 
        führen zu 3-5x langsameren Analysezeiten.</dd>
    
    <dt><strong>Fallnamen-Beschränkungen:</strong></dt>
    <dd>Maximale Länge: 255 Zeichen. Windows-Pfadlimit (260 Zeichen) 
        berücksichtigen bei tiefer Ordnerstruktur.</dd>
  </dl>
  
  <h5 data-ref="{{section_id}}-heading-8">Alternative Ansätze</h5>
  <ul data-content-type="background">
    <li>
      <strong>Case-Templates verwenden:</strong> Vordefinierte Einstellungen für häufige Szenarien.
      <br>✅ Vorteil: Schnellerer Start, konsistente Einstellungen
      <br>❌ Nachteil: Weniger Flexibilität für Sonderfälle
    </li>
    <li>
      <strong>Netzwerk-Share:</strong> Fall auf Netzlaufwerk speichern (NICHT empfohlen).
      <br>✅ Vorteil: Zentrales Backup
      <br>❌ Nachteil: 5-10x langsamere Performance, Risiko bei Netzwerkausfall
    </li>
  </ul>
  
  <h5 data-ref="{{section_id}}-heading-9">Sonderfälle</h5>
  <p data-content-type="background">
    Falls Sie einen sehr langen Pfad haben (>200 Zeichen), verkürzen Sie die 
    Ordnerstruktur oder verwenden Sie symbolische Links (mklink /D).
    
    Bei nicht-lateinischen Zeichen im Fallnamen (z.B. Kyrillisch, Arabisch) 
    kann es zu Anzeigefehlern in Berichten kommen - verwenden Sie ASCII-Zeichen.
  </p>
  
  <figure data-media-type="video" data-ref="{{section_id}}-figure-3">
    <button class="media-help-trigger" 
            data-media-id="media-{{section_id}}-video1"
            aria-label="Video von Fall-Erstellung anfordern">
      🎥 Video anfordern
    </button>
    <figcaption id="fig-{{section_id}}-video1">Video: Vollständiger Workflow der Fall-Erstellung</figcaption>
    <!-- MEDIA: Video zeigt kompletten Workflow von File → New Case bis OK -->
  </figure>
  
</div>
```

### 6.5 Detail-Level-Matrix (Entscheidungshilfe)

| Element | Level 1 | Level 2 | Level 3 |
|---------|---------|---------|---------|
| **Einleitung** | ❌ | ✅ 2-3 Sätze | ✅ 3-5 Sätze |
| **Hintergrund** | ❌ | ✅ Kurz (vor Schritten) | ✅ Ausführlich (eigener Abschnitt) |
| **Schritte** | ✅ Nur Aktionen | ✅ + Kurze Erklärung | ✅ + Ausführliche Erklärung |
| **Content-Boxen** | ❌ Nur Warnings | ✅ Info, Hint, Attention | ✅ + Background-Boxen |
| **Medien** | ✅ 1-2 Screenshots | ✅ 3-5 Screenshots | ✅ 5+ Screenshots + Videos |
| **Cross-References** | ❌ | ✅ 1-3 relevante | ✅ 3-5 + Begründungen |
| **Alternativen** | ❌ | ❌ | ✅ Eigener Abschnitt |
| **Überschriften** | ✅ h3 + h4 | ✅ h3 + h4 + h5 | ✅ h3-h6 |

---

## 7. CONTENT-TYPE-BOXEN

### 7.1 Verfügbare Content-Types

**Verwende `<aside>` mit CSS-Klassen für hervorgehobene Inhalte:**

#### 7.1.1 Warning-Box (🚨 Kritisch)

**Wann:** Fehler vermeiden, Datenverlust verhindern

```html
<aside class="warning-box" data-ref="{{section_id}}-warning-1" data-content-type="warning">
  <p><strong>🚨 Warnung:</strong> Speichern Sie NIEMALS auf Netzwerklaufwerken.</p>
</aside>
```

#### 7.1.2 Attention-Box (⚠️ Wichtig)

**Wann:** Wichtige Hinweise, aber nicht kritisch

```html
<aside class="attention-box" data-ref="{{section_id}}-attention-1" data-content-type="attention">
  <p><strong>⚠️ Achtung:</strong> Dieser Vorgang kann bis zu 30 Minuten dauern.</p>
</aside>
```

#### 7.1.3 Hint-Box (💡 Best Practice)

**Wann:** Tipps, Empfehlungen, Profi-Tricks

```html
<aside class="hint-box" data-ref="{{section_id}}-hint-1" data-content-type="hint">
  <p><strong>💡 Tipp:</strong> Verwenden Sie Tastenkombinationen für schnelleres Arbeiten.</p>
</aside>
```

#### 7.1.4 Info-Box (ℹ️ Zusatzinfo)

**Wann:** Ergänzende Informationen, Kontext

```html
<aside class="info-box" data-ref="{{section_id}}-info-1" data-content-type="info">
  <p><strong>ℹ️ Info:</strong> AXIOM unterstützt bis zu 100 gleichzeitige Analysen.</p>
</aside>
```

#### 7.1.5 Background-Box (nur Level 3)

**Wann:** Technische Hintergründe, Details

```html
<aside class="background-box" data-ref="{{section_id}}-background-1" data-content-type="background">
  <p><strong>🔍 Hintergrund:</strong> Die SQLite-Datenbank verwendet WAL-Modus für bessere Performance.</p>
</aside>
```

### 7.2 Content-Type-Entscheidungsbaum

```
Ist es KRITISCH (Datenverlust, Fehler)?
├─ JA → warning-box (🚨)
└─ NEIN
    ├─ Ist es WICHTIG (ohne Fehler)?
    │   └─ JA → attention-box (⚠️)
    └─ NEIN
        ├─ Ist es ein TIPP?
        │   └─ JA → hint-box (💡)
        └─ NEIN
            ├─ Ist es eine ZUSATZINFO?
            │   └─ JA → info-box (ℹ️)
            └─ NEIN
                └─ Ist es TECHNISCHER HINTERGRUND (nur Level 3)?
                    └─ JA → background-box (🔍)
```

---

## 8. TERMINOLOGIE-STRATEGIE

### 8.1 Grundregeln

1. **Konsultiere Terminologie-Entscheidungsliste ZUERST**
   - Verwende bereits definierte Begriffe konsistent
   - Prüfe Status: Approved (verwenden), Deprecated (vermeiden)

2. **Deutsch bevorzugen, aber pragmatisch**
   - ✅ Deutsch wenn geläufig: "Abfrage" statt "Query"
   - ✅ Englisch bei etablierten Fachbegriffen: "Cache", "Hash", "E-Mail"
   - ✅ Englisch bei UI-Elementen: "Artifacts Explorer" (Original AXIOM-Begriff)

3. **Fremdsprachige Begriffe IMMER markieren**

```html
<span lang="en">Artifacts Explorer</span>
<span lang="en">Hash</span>
<span lang="en">Processing Engine</span>
```

4. **Konsistenz über alles**
   - Entscheide dich für EINEN Begriff pro Konzept
   - Verwende ihn durchgehend
   - Dokumentiere neue Begriffe am Ende (siehe 8.3)

### 8.2 Terminologie-Entscheidungsliste (Auszug)

```
{{terminologie_list_content}}
```

**Vollständige Liste:** Siehe Anhang 12.4

### 8.3 Neue Begriffe dokumentieren

**Am Ende der Section (als HTML-Kommentar):**

```html
<!-- 
NEUE TERMINOLOGIE (Status: Proposed):

- "Evidence Source" (EN) → verwendet, weil AXIOM-UI-Element (keine deutsche Alternative)
- "Prüfsumme" (DE) → verwendet statt "Hash" (verständlicher für Zielgruppe)
- "Fallakte" (DE) → verwendet statt "Case" (passt zu deutschem Polizeikontext)

GRUND FÜR ENTSCHEIDUNG:
Die Zielgruppe (IT-ferne Ermittler) bevorzugt deutsche Begriffe, außer bei 
etablierten Fachbegriffen oder Original-UI-Elementen aus der Software.
-->
```

### 8.4 Selbst-Check vor Output

✅ Habe ich denselben Begriff konsistent verwendet?  
✅ Sind alle fremdsprachigen Begriffe mit `<span lang="...">` markiert?  
✅ Entsprechen meine Entscheidungen der Terminologie-Strategie?  
✅ Habe ich neue Begriffe am Ende dokumentiert?

---

## 9. BARRIEREFREIHEIT (BFSG)

### 9.1 Gesetzliche Grundlage

**Barrierefreiheitsstärkungsgesetz (BFSG)** - In Kraft seit 28. Juni 2025

Alle öffentlichen Webinhalte MÜSSEN barrierefrei sein nach WCAG 2.1 Level AA.

### 9.2 Pflicht-Anforderungen

#### 9.2.1 Sprachauszeichnung

**Regel:** Fremdsprachige Begriffe mit `lang`-Attribut markieren

```html
<!-- ❌ FALSCH -->
<p>Öffnen Sie den Artifacts Explorer</p>

<!-- ✅ RICHTIG -->
<p>Öffnen Sie den <span lang="en">Artifacts Explorer</span></p>
```

**Sprach-Codes (ISO 639-1):**
- `de` - Deutsch
- `en` - Englisch
- `fr` - Französisch
- `es` - Spanisch

#### 9.2.2 Alt-Texte für Medien

**Regel:** Alle Medien-Trigger mit `aria-label` (max. 120 Zeichen)

```html
<button class="media-help-trigger" 
        data-media-id="media-{{section_id}}-1"
        aria-label="Screenshot von New Case Dialog mit Fallnamen-Eingabe anfordern">
  📷 Screenshot anfordern
</button>
```

**Längen-Check:**
- ✅ Gut: "Screenshot von New Case Dialog anfordern" (44 Zeichen)
- ⚠️ Grenzfall: "Screenshot von File → New Case → Fallnamen-Eingabe → Speicherort-Auswahl Dialog" (85 Zeichen)
- ❌ Zu lang: "Screenshot von File → New Case → Fallnamen-Eingabe → Speicherort-Auswahl → Erweiterte Optionen → Database Configuration Dialog mit allen Settings" (157 Zeichen)

#### 9.2.3 Figcaptions bei Diagrammen/Videos

**Regel:** Bei `<figure>` mit `data-media-type="diagram"`, `"video"` oder `"annotated"` MUSS `<figcaption>` vorhanden sein

```html
<figure data-media-type="diagram" data-ref="{{section_id}}-figure-5">
  <button class="media-help-trigger" 
          data-media-id="media-{{section_id}}-diagram1"
          aria-label="Diagramm des AXIOM-Workflows anfordern">
    📊 Diagramm anfordern
  </button>
  <figcaption id="fig-{{section_id}}-diagram1">
    Workflow-Diagramm: Case Creation → Evidence Processing → Artifact Analysis
  </figcaption>
  <!-- MEDIA: Diagramm zeigt vollständigen AXIOM-Workflow -->
</figure>
```

#### 9.2.4 Überschriften-Hierarchie

**Regel:** Keine Sprünge in der Hierarchie

```html
<!-- ❌ FALSCH (h3 → h5) -->
<h3>Hauptüberschrift</h3>
<h5>Unterabschnitt</h5>

<!-- ✅ RICHTIG -->
<h3>Hauptüberschrift</h3>
<h4>Unterabschnitt</h4>
<h5>Detail</h5>
```

#### 9.2.5 Aussagekräftige Link-Texte

**Regel:** Links müssen aus Kontext verständlich sein

```html
<!-- ❌ FALSCH -->
<a href="#axiom-installation">hier klicken</a>

<!-- ✅ RICHTIG -->
<a href="#axiom-installation" data-ref-target="axiom-installation">
  AXIOM Installation
</a>
```

### 9.3 BFSG-Checkliste

✅ Alle fremdsprachigen Begriffe mit `<span lang="...">`?  
✅ Alle Medien-Trigger mit `aria-label` (max. 120 Zeichen)?  
✅ Diagramme/Videos haben `<figcaption>` mit `id`?  
✅ Überschriften-Hierarchie korrekt (keine Sprünge)?  
✅ Link-Texte aussagekräftig (nicht "hier", "mehr", "klicken")?

---

## 10. MEDIEN-STRATEGIE

### 10.1 Medien-Typen

**Verfügbare Typen (`data-media-type`):**

1. **screenshot** - Standard-Screenshot
2. **annotated** - Screenshot mit Markierungen/Pfeilen
3. **video** - Screencast / Video-Tutorial
4. **diagram** - Flussdiagramm, Grafik
5. **comparison** - Vorher/Nachher-Vergleich
6. **audio** - Audio-Erklärung (selten)

### 10.2 Media-Platzhalter erstellen

**Syntax:**

```html
<figure data-media-type="screenshot" data-ref="{{section_id}}-figure-1">
  <button class="media-help-trigger" 
          data-media-id="media-{{section_id}}-1"
          aria-label="Screenshot von [BESCHREIBUNG] anfordern">
    📷 Screenshot anfordern
  </button>
  <figcaption id="fig-{{section_id}}-1">[KURZBESCHREIBUNG]</figcaption>
  <!-- MEDIA: [DETAILLIERTE BESCHREIBUNG FÜR MAINTAINER] -->
</figure>
```

**Beispiele:**

```html
<!-- Screenshot -->
<figure data-media-type="screenshot" data-ref="axiom-case-creation-figure-1">
  <button class="media-help-trigger" 
          data-media-id="media-axiom-case-creation-1"
          aria-label="Screenshot von New Case Dialog anfordern">
    📷 Screenshot anfordern
  </button>
  <figcaption id="fig-axiom-case-creation-1">
    New Case Dialog mit Fallnamen-Eingabe
  </figcaption>
  <!-- MEDIA: Screenshot von File → New Case Dialog, Fokus auf Fallnamen-Eingabefeld -->
</figure>

<!-- Annotierter Screenshot -->
<figure data-media-type="annotated" data-ref="axiom-case-creation-figure-2">
  <button class="media-help-trigger" 
          data-media-id="media-axiom-case-creation-2"
          aria-label="Annotierter Screenshot von Case Settings anfordern">
    📷 Annotierter Screenshot anfordern
  </button>
  <figcaption id="fig-axiom-case-creation-2">
    Case Settings mit Markierungen der wichtigsten Optionen
  </figcaption>
  <!-- MEDIA: Screenshot von Case Settings, rote Pfeile zu "Database Location" und "Case Name" -->
</figure>

<!-- Video -->
<figure data-media-type="video" data-ref="axiom-case-creation-figure-3">
  <button class="media-help-trigger" 
          data-media-id="media-axiom-case-creation-video1"
          aria-label="Video von Case-Erstellung Workflow anfordern">
    🎥 Video anfordern
  </button>
  <figcaption id="fig-axiom-case-creation-video1">
    Video: Vollständiger Case-Erstellung Workflow (2 Minuten)
  </figcaption>
  <!-- MEDIA: Screencast zeigt kompletten Workflow von File → New Case bis fertiger Case (ca. 2 Min) -->
</figure>

<!-- Diagramm -->
<figure data-media-type="diagram" data-ref="axiom-workflow-figure-1">
  <button class="media-help-trigger" 
          data-media-id="media-axiom-workflow-diagram1"
          aria-label="Diagramm des Case-Erstellung Workflows anfordern">
    📊 Diagramm anfordern
  </button>
  <figcaption id="fig-axiom-workflow-diagram1">
    Flussdiagramm: Case Creation → Evidence Processing → Analysis
  </figcaption>
  <!-- MEDIA: Flussdiagramm mit 3 Boxen (Case Creation / Evidence Processing / Analysis) + Pfeilen -->
</figure>
```

### 10.3 Medien-Entscheidungsbaum

```
Welcher Medien-Typ?

Ist es ein UI-Element?
├─ JA
│   ├─ Braucht es Markierungen/Pfeile?
│   │   ├─ JA → annotated
│   │   └─ NEIN → screenshot
│   └─ Ist es ein Prozess/Workflow?
│       └─ JA → video (wenn komplex) oder screenshot (wenn einfach)
└─ NEIN
    └─ Ist es ein Konzept/Ablauf?
        └─ JA → diagram
```

### 10.4 MEDIA-Kommentar-Syntax

**Format:**

```html
<!-- MEDIA: [TYP] [DETAILLIERTE BESCHREIBUNG FÜR MAINTAINER] -->
```

**Beispiele:**

```html
<!-- MEDIA: Screenshot von File → New Case Dialog, Fokus auf Fallnamen-Eingabefeld, Auflösung 1920x1080 -->

<!-- MEDIA: Annotierter Screenshot von Case Settings, rote Pfeile zu "Database Location" (Position 1) und "Case Name" (Position 2) -->

<!-- MEDIA: Video (ca. 2 Min) zeigt kompletten Workflow: File → New Case → Eingaben → OK → Bestätigung -->

<!-- MEDIA: Diagramm (Flussdiagramm) zeigt 3 Phasen: Case Creation (blau) → Evidence Processing (grün) → Analysis (orange), mit Pfeilen dazwischen -->
```

### 10.5 Geschätzte Medien (aus Metadaten)

**Für diese Section sind geschätzt:**

- Screenshots: {{estimated_media_screenshots}}
- Videos: {{estimated_media_videos}}
- Annotierte Screenshots: {{estimated_media_annotations}}
- Diagramme: {{estimated_media_diagrams}}
- Info-Boxen: {{estimated_media_info_boxes}}

**Hinweis:** Dies sind Richtwerte. Erstelle so viele Medien, wie sinnvoll für das Verständnis sind.

---

## 11. QUALITÄTSKRITERIEN & CHECKLISTE

### 11.1 Inhaltliche Qualität

✅ **Lernziel erfüllt?** Section vermittelt {{learning_objective}}  
✅ **Key Topics abgedeckt?** Alle Punkte aus {{key_topics}} behandelt  
✅ **Zielgruppen-gerecht?** Verständlich für IT-ferne Ermittler  
✅ **Praxisnah?** Konkrete Handlungsanweisungen, keine Theorie  
✅ **Vollständigkeit?** Alle notwendigen Schritte vorhanden  

### 11.2 Strukturelle Qualität

✅ **Matroschka-Prinzip?** Level 1 ⊆ Level 2 ⊆ Level 3  
✅ **Überschriften-Hierarchie?** Keine Sprünge (h3 → h4 → h5)  
✅ **Detail-Level-Verteilung?** Sinnvolle Aufteilung zwischen Levels  
✅ **Navigation?** Alle Elemente mit `data-ref`  
✅ **Cross-References?** 1-3 sinnvolle Verlinkungen (wenn vorhanden)  

### 11.3 Technische Qualität

✅ **JSON-LD valide?** Alle Pflichtfelder, korrektes JSON  
✅ **HTML-Elemente?** Nur erlaubte Elemente aus Whitelist  
✅ **Attribute vollständig?** Alle Pflicht-Attribute gesetzt  
✅ **BFSG-konform?** Alle 5 Barrierefreiheits-Regeln erfüllt  
✅ **Terminologie konsistent?** Gemäß Entscheidungsliste  

### 11.4 Medien-Qualität

✅ **Medien-Anzahl?** Richtwerte eingehalten (ca. {{estimated_media_screenshots}} Screenshots)  
✅ **Medien-Typen?** Passende Typen gewählt (screenshot/annotated/video/diagram)  
✅ **MEDIA-Kommentare?** Detaillierte Beschreibungen für Maintainer  
✅ **Alt-Texte?** Alle Medien mit `aria-label` (max. 120 Zeichen)  
✅ **Figcaptions?** Bei Diagrammen/Videos mit `id`-Attribut  

### 11.5 Stil & Tonalität

✅ **Sachlich?** Keine motivierenden Floskeln ("Super!", "Toll!")  
✅ **Klar?** Kurze Sätze, einfache Sprache  
✅ **Präzise?** Keine vagen Formulierungen  
✅ **Unterstützend?** Hilft beim Verstehen, ohne zu bevormunden  
✅ **Konsistent?** Stil passt zu Vorgänger-Sections  

### 11.6 Vollständigkeits-Checkliste

**HTML-Struktur:**
- [ ] `<section>` mit allen Pflicht-Attributen
- [ ] JSON-LD `<script>` Block am Anfang
- [ ] `<div class="detail-level-1">` mit Basis-Content
- [ ] `<div class="detail-level-2">` mit Best-Practice-Content
- [ ] `<div class="detail-level-3">` mit Detailliert-Content (falls Complexity = "Standard" oder "Complex")
- [ ] Agent-Context-Block am Ende

**Content:**
- [ ] Erste Überschrift `<h3>` mit Section-Titel
- [ ] Mindestens 1 Schritt-Liste in Level 1
- [ ] Mindestens 1 Screenshot in Level 1
- [ ] Erklärungen zu Schritten in Level 2
- [ ] Cross-References in Level 2 (falls vorhanden)
- [ ] Hintergründe in Level 3 (falls Complexity >= Standard)
- [ ] Sonderfälle in Level 3 (falls relevant)

**Barrierefreiheit:**
- [ ] Alle fremdsprachigen Begriffe mit `<span lang="...">`
- [ ] Alle Medien mit `aria-label`
- [ ] Überschriften-Hierarchie korrekt
- [ ] Link-Texte aussagekräftig
- [ ] Figcaptions bei Diagrammen/Videos

**Terminologie:**
- [ ] Entscheidungsliste konsultiert
- [ ] Begriffe konsistent verwendet
- [ ] Neue Begriffe am Ende dokumentiert

---

## 12. ANHANG: RESSOURCEN

### 12.1 Strategiedokument (Auszug)

```
{{strategiedokument_content}}
```

**Hinweis:** Dies ist das vollständige Strategiedokument. Konsultiere es bei Unklarheiten über Zielgruppe, Lernziele oder Umfang.

---

### 12.2 JSON-LD Schema

```json
{{json_ld_schema_content}}
```

**Hinweis:** Alle JSON-LD Metadaten MÜSSEN diesem Schema entsprechen.

---

### 12.3 HTML-Template-Spezifikation

```
{{html_template_spec_content}}
```

**Hinweis:** Detaillierte Spezifikation des Matroschka-Prinzips und HTML-Struktur.

---

### 12.4 Terminologie-Entscheidungsliste

```
{{terminologie_list_content}}
```

**Hinweis:** Vollständige Liste mit allen approved, proposed und deprecated Begriffen.

---

### 12.5 Getting Started (Stil-Richtlinien)

```
{{getting_started_content}}
```

**Hinweis:** Detaillierte Stil-Richtlinien, Do's & Don'ts, Beispiele für gute Section-Struktur.

---

## ⚠️ WICHTIGE HINWEISE VOR DEM START

### 1. Lies ZUERST die Vorgänger-Sections (Abschnitt 3.1)

Die HTML-Examples zeigen dir:
- Welcher Stil verwendet wird
- Wie Terminologie gehandhabt wird
- Welche Detail-Level-Aufteilung gut funktioniert
- Wie Medien eingebunden werden

**Orientiere dich STARK an diesen Beispielen!**

### 2. Erstelle einen VOLLSTÄNDIGEN Output

- ❌ NICHT: Nur Snippets oder Teilausschnitte
- ✅ SONDERN: Komplette `<section>` von `<section>` bis `</section>`
- ✅ Direkt verwendbar, keine Platzhalter wie "..." oder "[TODO]"

### 3. Prüfe ALLES gegen die Checkliste (Abschnitt 11.6)

Gehe die Liste systematisch durch BEVOR du den Output abgibst.

### 4. Bei Unsicherheit: Frage NACH

Wenn du dir bei einer Entscheidung unsicher bist (z.B. Content-Type-Box-Wahl, Terminologie), füge einen Kommentar ein:

```html
<!-- DECISION-REVIEW: Unsicher, ob "Hash" oder "Prüfsumme" besser für Zielgruppe. 
     Habe "Prüfsumme" gewählt wegen niedrigem IT-Level, aber "Hash" ist etablierter Fachbegriff. -->
```

---

## 🚀 DEINE AUFGABE

**Erstelle jetzt eine vollständige, produktionsreife Section für `{{section_id}}`.**

Befolge alle Vorgaben aus diesem Prompt. Viel Erfolg!

---

**Ende des Prompts**
