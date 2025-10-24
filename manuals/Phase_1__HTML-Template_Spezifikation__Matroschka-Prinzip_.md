# Phase 1: HTML-Template Spezifikation

**Projekt:** WebAssistant Forensics  
**Version:** 1.0.0  
**Datum:** 2025-10-13  
**Status:** ✅ Finalisiert  

---

## Inhaltsverzeichnis

1. [Matroschka-Prinzip (Detail-Levels)](#matroschka-prinzip)
2. [Detail-Level-Matrix (Entscheidungstabelle)](#detail-level-matrix)
3. [HTML-Struktur (Template)](#html-struktur)
4. [CSS-Logik (Frontend-Filterung)](#css-logik)
5. [Verschachtelungsbeispiele](#verschachtelungsbeispiele)
6. [Terminologie-Handling](#terminologie-handling)
7. [Validierungsregeln](#validierungsregeln)

---

## 1. Matroschka-Prinzip (Detail-Levels) {#matroschka-prinzip}

### Grundprinzip

```
Level 1 ⊆ Level 2 ⊆ Level 3

Level 1: Nur Schritte (Schnellübersicht)
Level 2: Level 1 + Best-Practice-Erklärungen (80%-Lösung)
Level 3: Level 2 + Vollständige Tiefe (100%, praxisnah)
```

**Metapher:** Level 1 steckt in Level 2, Level 2 steckt in Level 3 (wie Matroschka-Puppen).

### Detail-Level-Definitionen

#### **Level 1: Schnellübersicht (Checkliste)**

**Zielgruppe:** Ermittler, die den Prozess bereits kennen, aber Schritte-Reihenfolge brauchen.

**Inhalt:**
- ✅ Nummerierte Schritte (nur Aktionen)
- ✅ Kritische Warnungen
- ✅ 1-2 Screenshots (wichtigste UI-Elemente)
- ❌ KEINE Erklärungen ("warum?")
- ❌ KEINE Hintergründe
- ❌ KEINE Alternativen

**Beispiel:**
```
1. Öffnen Sie File → New Case
2. Geben Sie Fallnamen ein
3. Wählen Sie Speicherort
4. Klicken Sie OK
```

---

#### **Level 2: Best-Practice (80%-Lösung, Standard)**

**Zielgruppe:** Normale Ermittler, die effektiv und effizient arbeiten wollen.

**Inhalt:**
- ✅ **Level 1 komplett** (alle Schritte)
- ✅ **+ Kurze Erklärungen** (1-2 Sätze pro Schritt)
- ✅ **+ Kontextualisierung** (Einleitung: "Worum geht's?")
- ✅ **+ Best-Practice-Hinweise**
- ✅ **+ 3-5 Screenshots**
- ❌ KEINE technischen Hintergründe
- ❌ KEINE Sonderfälle
- ❌ KEINE Alternativen

**Beispiel:**
```
1. Öffnen Sie File → New Case
   → Dieser Dialog ist der Startpunkt jeder Analyse.

2. Geben Sie einen aussagekräftigen Fallnamen ein
   → Best Practice: Schema 'Jahr-Aktenzeichen-Beschreibung'
   → Beispiel: 2025-123456-Smartphone-Auswertung
```

---

#### **Level 3: Vollständige Tiefe (100%, praxisnah)**

**Zielgruppe:** Fortgeschrittene Ermittler, die alle Optionen verstehen wollen.

**Inhalt:**
- ✅ **Level 1 + Level 2 komplett**
- ✅ **+ Technische Hintergründe** (5-10 Sätze)
- ✅ **+ Alle Einstellungen erklärt**
- ✅ **+ Sonderfälle / Edge Cases**
- ✅ **+ Alternative Ansätze** (mit Vor-/Nachteilen)
- ✅ **+ 5+ Screenshots + Videos**
- ❌ KEINE akademischen Theorien

**Qualitätsanspruch:** 4,8 ist nah genug an 5 → praktisches Verständnis, nicht theoretische Vollständigkeit.

**Beispiel:**
```
1. Öffnen Sie File → New Case
   → Dieser Dialog ist der Startpunkt jeder Analyse.
   
   [Level 3] AXIOM erstellt intern eine SQLite-Datenbank im Speicherort.
   Der Fallname wird als Dateiname verwendet, ungültige Zeichen 
   (< > : " / \ | ? *) müssen vermieden werden.
   
   Alternative: Statt 'New Case' können Sie ein Template verwenden
   (siehe Section axiom-case-templates).
   ✅ Vorteil: Vordefinierte Einstellungen
   ❌ Nachteil: Weniger Flexibilität
```

---

## 2. Detail-Level-Matrix (Entscheidungstabelle) {#detail-level-matrix}

| Element | Level 1 (Schnell) | Level 2 (Best-Practice) | Level 3 (Detailliert) |
|---------|-------------------|-------------------------|----------------------|
| **Einleitung** | ❌ Keine | ✅ 2-3 Sätze | ✅ 3-5 Sätze |
| **Hintergrund** | ❌ Keine | ✅ Kurz (vor Schritten) | ✅ Ausführlich (eigener Abschnitt) |
| **Schritte** | ✅ Nur Aktionen | ✅ + Kurze Erklärung | ✅ + Ausführliche Erklärung |
| **Erklärungen** | ❌ Keine | ✅ Nach jedem Schritt (1-2 Sätze) | ✅ + Technische Hintergründe (5-10 Sätze) |
| **Content-Type-Boxen** | ❌ Nur Warnings | ✅ Info, Hint, Attention | ✅ + Background-Boxen |
| **Medien** | ✅ 1-2 Screenshots | ✅ 3-5 Screenshots | ✅ 5+ Screenshots + Videos |
| **Cross-References** | ❌ Keine | ✅ 1-3 relevante | ✅ 3-5 + Begründungen |
| **Alternativen** | ❌ Keine | ❌ Keine | ✅ Ja (eigener Abschnitt) |
| **Überschriften** | ✅ h3 + h4 (basic) | ✅ h3 + h4 + h5 | ✅ h3-h6 (volle Hierarchie) |

---

## 3. HTML-Struktur (Template) {#html-struktur}

### Basis-Template

```html
<section class="content-section" 
         id="section-{sectionId}"
         data-section="{sectionId}"
         data-level="3"
         data-parent="{chapterId}"
         data-title="{title}"
         data-detail-level="2"
         lang="de">
  
  <!-- ============================================================
       JSON-LD METADATEN (PFLICHT)
       ============================================================ -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "identifier": "{sectionId}",
    "name": "{title}",
    "description": "{shortDescription}",
    "version": "1.0.0",
    "dateCreated": "2025-10-13",
    "dateModified": "2025-10-13",
    "author": {
      "@type": "Organization",
      "name": "Claude Sonnet 4.5",
      "email": "claude-sonnet-4.5@ai.anthropic.com"
    },
    "inLanguage": "de",
    "audience": {
      "@type": "EducationalAudience",
      "audienceType": "IT-ferne Polizei-Ermittler"
    },
    "educationalLevel": "{difficultyLevel}",
    "timeRequired": "PT{estimatedReadingTimeL2}M",
    "difficultyLevel": "{complexity}",
    "isPartOf": {
      "@type": "Chapter",
      "identifier": "{chapterId}",
      "name": "{chapterTitle}"
    },
    "teaches": ["{keyTopic1}", "{keyTopic2}", "{keyTopic3}"],
    "about": {
      "@type": "SoftwareApplication",
      "name": "{toolName}",
      "softwareVersion": "{toolVersion}"
    },
    "requires": ["{prerequisite1}"],
    "predecessor": "{predecessorSection}",
    "successor": "{successorSection}",
    "relatedLink": [
      {"@type": "LinkRole", "url": "#{crossRef1}", "name": "{reason}"}
    ]
  }
  </script>
  
  
  <!-- ============================================================
       LEVEL 1: BASIS (immer sichtbar)
       ============================================================ -->
  <div class="detail-level-1">
    
    <h3 data-ref="{sectionId}-heading-1">{title}</h3>
    
    <h4 data-ref="{sectionId}-heading-2">Schritte</h4>
    <ol data-content-type="instruction">
      <li><strong>Schritt 1:</strong> {action1}</li>
      <li><strong>Schritt 2:</strong> {action2}</li>
      <li><strong>Schritt 3:</strong> {action3}</li>
    </ol>
    
    <aside class="warning-box" data-content-type="warning">
      <p><strong>🚨 Warnung:</strong> {criticalWarning}</p>
    </aside>
    
    <figure data-media-type="screenshot">
      <button class="media-help-trigger" 
              data-media-id="media-{sectionId}-1"
              aria-label="Screenshot von {description} anfordern">
        📷 Screenshot anfordern
      </button>
      <figcaption id="fig-{sectionId}-1">{description}</figcaption>
      <!-- MEDIA: Screenshot von {dialog} -->
    </figure>
    
  </div>
  
  
  <!-- ============================================================
       LEVEL 2: ERGÄNZT LEVEL 1
       ============================================================ -->
  <div class="detail-level-2">
    
    <p data-content-type="introduction">
      Diese Section behandelt {topic}. Sie lernen, {learningObjective}.
    </p>
    
    <h4 data-ref="{sectionId}-heading-3">Vorbereitung</h4>
    <p data-content-type="background">
      Bevor Sie starten: {prerequisites}
    </p>
    
    <h4 data-ref="{sectionId}-heading-4">Erklärungen</h4>
    <dl data-content-type="explanation">
      <dt><strong>Zu Schritt 1:</strong></dt>
      <dd>{Warum wichtig? 1-2 Sätze}</dd>
      
      <dt><strong>Zu Schritt 2:</strong></dt>
      <dd>{Erklärung 1-2 Sätze}</dd>
    </dl>
    
    <aside class="hint-box" data-content-type="hint">
      <p><strong>💡 Best Practice:</strong> {proTip}</p>
    </aside>
    
    <figure data-media-type="screenshot">
      <button class="media-help-trigger" data-media-id="media-{sectionId}-2">
        📷 Screenshot
      </button>
      <figcaption id="fig-{sectionId}-2">{description}</figcaption>
      <!-- MEDIA: Screenshot von {detailDialog} -->
    </figure>
    
    <h4 data-ref="{sectionId}-heading-5">Weiterführende Informationen</h4>
    <ul>
      <li>
        <a href="#{crossRef1}" data-ref-target="{crossRef1}">
          {crossRef1Title}
        </a> – {reason}
      </li>
    </ul>
    
  </div>
  
  
  <!-- ============================================================
       LEVEL 3: ERGÄNZT LEVEL 1+2
       ============================================================ -->
  <div class="detail-level-3">
    
    <h4 data-ref="{sectionId}-heading-6">Hintergründe (Detail-Level 3)</h4>
    <p data-content-type="background">
      {Technische Erklärung, 5-10 Sätze, praxisnah}
    </p>
    
    <h5 data-ref="{sectionId}-heading-7">Erweiterte Einstellungen</h5>
    <dl data-content-type="explanation">
      <dt><strong>{option1}</strong></dt>
      <dd>{Erklärung}</dd>
    </dl>
    
    <h5 data-ref="{sectionId}-heading-8">Alternative Ansätze</h5>
    <ul data-content-type="background">
      <li>
        <strong>{alternative1}:</strong> {Beschreibung}
        <br>✅ Vorteil: {pro} | ❌ Nachteil: {con}
      </li>
    </ul>
    
    <h5 data-ref="{sectionId}-heading-9">Sonderfälle</h5>
    <p data-content-type="background">
      Falls {edgeCase1}, dann {lösung1}.
    </p>
    
    <figure data-media-type="video">
      <button class="media-help-trigger" data-media-id="media-{sectionId}-video1">
        🎥 Video anfordern
      </button>
      <figcaption id="fig-{sectionId}-video1">{description}</figcaption>
      <!-- MEDIA: Video zeigt {workflow} -->
    </figure>
    
  </div>
  
  
  <!-- ============================================================
       AGENT-CONTEXT-BLOCK (PFLICHT)
       ============================================================ -->
  <div class="agent-context-block"
       data-ref="agent-context-{sectionId}"
       data-context-id="{sectionId}-context"
       style="display: none;">
    <!-- Dynamisch vom Agent gefüllt -->
  </div>
  
</section>
```

---

## 4. CSS-Logik (Frontend-Filterung) {#css-logik}

### Ansichts-Steuerung

```css
/* ============================================
   ANSICHT: Nur Level 1 (Schnellübersicht)
   ============================================ */
body.view-level-1 .detail-level-2,
body.view-level-1 .detail-level-3 {
  display: none;
}

/* ============================================
   ANSICHT: Level 1 + 2 (Best-Practice)
   ============================================ */
body.view-level-2 .detail-level-3 {
  display: none;
}

/* ============================================
   ANSICHT: Level 1 + 2 + 3 (Vollständig)
   ============================================ */
body.view-level-3 .detail-level-1,
body.view-level-3 .detail-level-2,
body.view-level-3 .detail-level-3 {
  display: block;
}
```

### JavaScript-Steuerung (Beispiel)

```javascript
// Nutzer wählt Detail-Level
function setDetailLevel(level) {
  document.body.className = `view-level-${level}`;
}

// Beispiel: Umschalten auf Best-Practice-Ansicht
setDetailLevel(2);
```

---

## 5. Verschachtelungsbeispiele {#verschachtelungsbeispiele}

### Variante A: Flache Struktur

```html
<section>
  <div class="detail-level-1">
    <h3>Titel</h3>
    <ol><li>Schritt 1</li></ol>
  </div>
  
  <div class="detail-level-2">
    <h4>Erklärungen</h4>
    <p>Zu Schritt 1: ...</p>
  </div>
  
  <div class="detail-level-3">
    <h4>Hintergründe</h4>
    <p>Technische Details...</p>
  </div>
</section>
```

### Variante B: Verschachtelt (semantisch näher)

```html
<section>
  <div class="detail-level-1">
    <h3>Titel</h3>
    
    <ol>
      <li>
        <strong>Schritt 1:</strong> {action}
        
        <!-- Level 2 direkt beim Schritt -->
        <div class="detail-level-2">
          <p>Erklärung: {warum?}</p>
          
          <!-- Level 3 direkt bei der Erklärung -->
          <div class="detail-level-3">
            <aside>
              <p><strong>Hintergrund:</strong> {details}</p>
            </aside>
          </div>
        </div>
      </li>
    </ol>
  </div>
</section>
```

### Verschachtelungsregeln

✅ **Erlaubt:**
- Level 2 IN Level 1
- Level 3 IN Level 2
- Level 3 IN Level 1
- Level 2/3 direkt in `<section>`

❌ **NICHT erlaubt:**
- Level 1 IN Level 2 oder 3
- Level 2 IN Level 3

---

## 6. Terminologie-Handling {#terminologie-handling}

### Grundregeln

1. **Konsultiere `terminologie-entscheidungsliste.md` vor Beginn**
   - Nutze bereits definierte Begriffe konsistent
   - Prüfe Status (Approved / Proposed / Deprecated)

2. **Fremdsprachige Begriffe IMMER markieren:**
   ```html
   <span lang="en">Artifacts Explorer</span>
   <span lang="en">Hash</span>
   <span lang="en">Processing Engine</span>
   ```

3. **Tool-spezifische UI-Elemente:**
   - Original-Begriffe verwenden (z.B. "Artifacts Explorer")
   - Immer mit `lang` Attribut markieren
   - NICHT übersetzen

4. **Etablierte Fachbegriffe:**
   - Deutsch bevorzugen, wenn geläufig (z.B. "Abfrage" statt "Query")
   - Englisch nur wenn etabliert (z.B. "Cache", "E-Mail", "Log")

### Neue Begriffe dokumentieren

**Am Ende jeder Section:** Liste alle neuen Begriffe als Kommentar:

```html
<!-- NEUE TERMINOLOGIE (Status: Proposed):
- "Evidence Source" (EN) → verwendet, weil AXIOM-UI-Element
- "Prüfsumme" (DE) → verwendet statt "Hash" (verständlicher für Zielgruppe)
- "Fallakte" (DE) → verwendet statt "Case" (deutscher Polizeikontext)
-->
```

### Selbst-Check vor Output

✅ Habe ich denselben Begriff konsistent verwendet?  
✅ Sind alle fremdsprachigen Begriffe mit `<span lang="...">` markiert?  
✅ Entsprechen meine Entscheidungen der Terminologie-Strategie?

---

## 7. Validierungsregeln {#validierungsregeln}

### Pflicht-Elemente

1. ✅ `<section>` mit allen Pflicht-Attributen
2. ✅ JSON-LD `<script>` Block (am Anfang)
3. ✅ Mindestens ein `<div class="detail-level-1">`
4. ✅ Erste Überschrift `<h3>` mit `data-ref`
5. ✅ Agent-Context-Block (am Ende)

### HTML-Syntax

- Nur Elemente aus Cluster 3 Whitelist
- Alle Überschriften mit `data-ref`
- Keine Überschriften-Hierarchie-Sprünge (h3 → h4 → h5, NICHT h3 → h5)

### BFSG-Konformität

- Fremdsprachige Begriffe: `<span lang="...">`
- Alt-Texte für Medien: `aria-label` max. 120 Zeichen
- Figcaptions bei Diagrammen/Videos: mit `id` für `aria-describedby`

### Metadaten-Vollständigkeit

- Alle Pflichtfelder in JSON-LD ausgefüllt
- `timeRequired` im ISO-8601 Format (z.B. "PT8M")
- `predecessor` / `successor` korrekt verkettet

### Link-Validierung

- Alle `href` mit `#` verweisen auf existierende Section-IDs
- Alle `data-ref-target` Attribute korrekt gesetzt

---

**Ende der Spezifikation**