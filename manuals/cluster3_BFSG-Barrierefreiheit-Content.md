# BFSG-konforme Content-Erstellung – Alt-Texte & Überschriften-Hierarchie

**Projekt:** WebAssistantForensics  
**Version:** 1.0.0  
**Datum:** 2025-10-09  
**Gültigkeit:** Alle Inhalte im `<main>`-Bereich von `index.html`

---

## Zweck

Diese Richtlinien stellen die **Barrierefreiheit nach BFSG** (Barrierefreiheitsstärkungsgesetz) für Content-Elemente sicher:
- **Alt-Texte** für Medien (Bilder, Videos, Audio)
- **Überschriften-Hierarchie** (h1-h6) ohne Sprünge

**Ziel:** Screenreader-Nutzer können Inhalte vollständig erfassen und navigieren.

---

## Teil 1: Alt-Text-Richtlinien

### Grundregeln

**PFLICHT:** Jedes Bild, Video und Audio MUSS einen beschreibenden Alt-Text haben.

1. **Max. 120 Zeichen** (Screenreader-freundlich, ca. 15-20 Wörter)
2. **Einfache Sprache** (keine unnötigen Fachbegriffe)
3. **Zweck beschreiben**, nicht Aussehen
4. **Kontext berücksichtigen**: Warum ist das Medium hier relevant?

---

### Differenzierung nach Media-Type

#### Screenshot
**Fokus:** UI-Elemente + Hauptaktion

**Beispiele:**
```html
<!-- Gut -->
<img src="media/screenshots/axiom-export.png" 
     alt="AXIOM Export-Dialog mit Schaltfläche Case Summary exportieren"
     data-media-type="screenshot">

<!-- Gut -->
<img src="media/screenshots/windows-defender.png" 
     alt="Windows Defender Einstellungen mit aktiviertem Echtzeitschutz"
     data-media-type="screenshot">

<!-- Schlecht (zu allgemein) -->
<img src="media/screenshots/axiom-export.png" 
     alt="Screenshot der AXIOM Software">
```

---

#### Annotated (Annotierter Screenshot)
**Fokus:** Markierungen und deren Bedeutung beschreiben

**Beispiele:**
```html
<!-- Gut -->
<img src="media/annotated/axiom-menu.png" 
     alt="Screenshot mit rotem Pfeil auf Menüpunkt Processing Options"
     data-media-type="annotated">

<!-- Gut -->
<img src="media/annotated/export-dialog.png" 
     alt="Export-Dialog mit nummerierter Beschriftung der Eingabefelder"
     data-media-type="annotated">

<!-- Schlecht (Markierung nicht erwähnt) -->
<img src="media/annotated/axiom-menu.png" 
     alt="AXIOM Menüleiste">
```

---

#### Diagram (Diagramm)
**Fokus:** Struktur + Kernaussage

**Beispiele:**
```html
<!-- Gut -->
<img src="media/other/forensic-workflow.png" 
     alt="Flussdiagramm: Beweismittelkette von Sicherung bis Archivierung"
     data-media-type="diagram">

<!-- Gut -->
<img src="media/other/network-topology.svg" 
     alt="Netzwerkdiagramm: Router verbindet drei Subnetze"
     data-media-type="diagram">

<!-- Bei komplexen Diagrammen: figcaption nutzen -->
<figure>
  <img src="media/other/complex-workflow.png" 
       alt="Flussdiagramm des forensischen Workflows"
       data-media-type="diagram">
  <figcaption id="workflow-desc">
    Detaillierte Beschreibung: Der Workflow beginnt mit der Sicherung des Datenträgers,
    gefolgt von Hash-Wert-Berechnung, forensischer Analyse und abschließender Dokumentation.
  </figcaption>
</figure>
```

---

#### Video
**Fokus:** Inhalt + Dauer

**Beispiele:**
```html
<!-- Gut -->
<video src="media/videos/axiom-export-tutorial.mp4" 
       data-media-type="video">
  <track kind="captions" src="media/videos/axiom-export-tutorial.vtt" srclang="de">
  Screencast: Export-Vorgang in AXIOM Process (2:30 Min)
</video>

<!-- Gut -->
<video src="media/videos/hash-verification.mp4" 
       data-media-type="video">
  Tutorial: Hash-Wert-Verifikation mit sha256sum (1:45 Min)
</video>
```

**Hinweis:** Bei Videos sollten zusätzlich **Untertitel** (WebVTT) bereitgestellt werden.

---

#### Audio
**Fokus:** Inhalt + Sprecher (falls relevant)

**Beispiele:**
```html
<!-- Gut -->
<audio src="media/audio/chain-of-custody-explanation.mp3" 
       data-media-type="audio" controls>
  Audiokommentar: Erklärung zur Chain of Custody (Sprecher: Max Müller, 3:20 Min)
</audio>

<!-- Gut -->
<audio src="media/audio/interview-expert.mp3" 
       data-media-type="audio" controls>
  Interview mit IT-Forensik-Experte Dr. Schmidt über Beweismittelsicherung (8:45 Min)
</audio>
```

---

#### Image (Allgemeine Bilder)
**Fokus:** Bildzweck im Kontext

**Beispiele:**
```html
<!-- Gut -->
<img src="media/other/usb-write-blocker.jpg" 
     alt="USB Write Blocker Gerät mit angeschlossenem Datenträger"
     data-media-type="image">

<!-- Gut -->
<img src="media/other/evidence-bag.jpg" 
     alt="Verschlossener Beweismittelbeutel mit Siegelnummer"
     data-media-type="image">
```

---

### Was NICHT in Alt-Texte gehört

❌ **"Bild von..." / "Screenshot von..."**
- Redundant, Screenreader sagt bereits "Grafik"
- Besser: Direkt mit Beschreibung beginnen

❌ **Dateinamen**
- `alt="axiom-export-dialog-v2-final.png"` → Nutzlos

❌ **Dekorative Beschreibungen**
- `alt="schönes, übersichtliches Interface"` → Subjektiv, irrelevant

❌ **Wiederholung von Fließtext**
- Wenn Text bereits im `<p>` davor/danach steht, nicht im Alt-Text wiederholen

---

### Sonderfälle

#### Dekorative Bilder
Rein visuelle Elemente ohne inhaltliche Bedeutung (z.B. Trennlinien, Hintergrundmuster):

```html
<img src="media/decorations/divider.png" alt="" role="presentation">
```

**Wichtig:** Leerer `alt`-Text signalisiert: "Irrelevant für Screenreader, überspringen"

---

#### Komplexe Diagramme
Wenn Beschreibung > 120 Zeichen benötigt:

```html
<figure>
  <img src="media/diagrams/forensic-workflow.png" 
       alt="Flussdiagramm des forensischen Workflows"
       aria-describedby="workflow-desc">
  <figcaption id="workflow-desc">
    <strong>Detaillierte Beschreibung:</strong>
    Der Workflow umfasst fünf Phasen: 
    1) Sicherung des Datenträgers mit Write Blocker,
    2) Erstellung eines forensischen Images,
    3) Hash-Wert-Berechnung zur Integritätssicherung,
    4) Analyse mit AXIOM Process,
    5) Dokumentation und Archivierung.
  </figcaption>
</figure>
```

**Vorteil:** Alt-Text bleibt kurz, `<figcaption>` liefert ausführliche Beschreibung.

---

### Validierung

**Automatische Checks (Python-Validator):**
- ❌ Fehler bei `<img>` ohne `alt`-Attribut
- ⚠️ Warnung bei leerem Alt-Text (außer bei `role="presentation"`)
- ⚠️ Warnung bei Alt-Text > 150 Zeichen

**Manuelle Prüfung:**
- Screenreader-Test: Ist der Alt-Text sinnvoll?
- Kontext-Check: Beschreibt der Alt-Text den Zweck im Kontext?

---

## Teil 2: Überschriften-Hierarchie

### Grundregel

**PFLICHT: Keine Überschriften-Sprünge!**

Dies ist eine **gesetzliche Anforderung (BFSG)** für barrierefreie Webseiten.

**Regel:**
- Überschriften müssen in **natürlicher Reihenfolge** verwendet werden
- `<h1>` → `<h2>` → `<h3>` → `<h4>` → `<h5>` → `<h6>`
- **Keine Sprünge**: `<h2>` → `<h4>` ist verboten (überspringt h3)

---

### Kontext: Section-Hierarchie

**Problem:** Die KI generiert isolierte Sections, kennt aber nicht die Hierarchie im Gesamt-Dokument.

**Lösung:** Die KI erhält im Prompt den **Hierarchie-Kontext**:

```markdown
**Hierarchie-Kontext dieser Section:**
- Section-Level: 3
- Parent-Element: "chapter-basics" (verwendet <h2>)
- Erste Überschrift dieser Section MUSS sein: <h3>
```

---

### Regeln für die KI

#### Regel 1: Erste Überschrift

Die **erste Überschrift** in der Section richtet sich nach dem **Parent-Element**:

| Parent verwendet | Section startet mit |
|------------------|---------------------|
| `<h1>` | `<h2>` |
| `<h2>` | `<h3>` |
| `<h3>` | `<h4>` |
| `<h4>` | `<h5>` |
| `<h5>` | `<h6>` |

**Beispiel:**
```markdown
**Prompt:** Erstelle Section "AXIOM Export"
- Parent: "chapter-basics" (Level 2, verwendet <h2>)
- → Erste Überschrift der Section: <h3>
```

---

#### Regel 2: Weitere Überschriften

Nach der ersten Überschrift folgt die **natürliche Hierarchie**:

```html
<!-- Korrekt -->
<section data-level="3">
  <h3>Hauptthema</h3>           <!-- Erste Überschrift -->
  <p>Einleitung...</p>
  
  <h4>Unterthema A</h4>          <!-- Eine Ebene tiefer -->
  <p>Details zu A...</p>
  
  <h5>Detail zu A</h5>           <!-- Noch eine Ebene tiefer -->
  <p>Feinheiten...</p>
  
  <h4>Unterthema B</h4>          <!-- Zurück auf h4-Ebene -->
  <p>Details zu B...</p>
</section>
```

---

#### Regel 3: Zurück auf höhere Ebene

**Erlaubt:** Nach tieferer Überschrift kann wieder höhere Ebene folgen (neues Thema, gleiche Hierarchie).

```html
<!-- Korrekt -->
<h3>Kapitel 1</h3>
<h4>Abschnitt 1.1</h4>
<h5>Detail 1.1.1</h5>
<h5>Detail 1.1.2</h5>
<h4>Abschnitt 1.2</h4>  <!-- Zurück auf h4 -->
<h3>Kapitel 2</h3>      <!-- Zurück auf h3 -->
```

**Verboten:** Überschriften überspringen.

```html
<!-- FALSCH -->
<h3>Kapitel 1</h3>
<h5>Detail</h5>  <!-- ❌ Überspringt h4 -->

<!-- FALSCH -->
<h4>Abschnitt</h4>
<h2>Hauptkapitel</h2>  <!-- ❌ Geht zu weit hoch -->
```

---

### Maximale Tiefe

**Technisches Limit:** `<h6>` ist die tiefste Überschrift (HTML-Standard).

**Empfehlung:** Maximale Tiefe in Sections: `<h5>`
- `<h6>` sollte Ausnahme sein (nur bei sehr tiefer Verschachtelung)

**Grund:** Zu tiefe Hierarchien erschweren die Orientierung.

---

### Beispiel: Vollständige Section

```html
<section class="content-section" 
         id="axiom-export" 
         data-section="axiom-export"
         data-level="3"
         data-parent="chapter-basics">
  
  <!-- Erste Überschrift: h3 (da Parent h2 verwendet) -->
  <h3 data-ref="main-heading">AXIOM Export-Funktionen</h3>
  <p data-ref="intro">
    AXIOM bietet verschiedene Export-Optionen für Analyseergebnisse.
  </p>
  
  <!-- Unterthema: h4 -->
  <h4 data-ref="csv-export">Export als CSV</h4>
  <p data-ref="csv-intro">
    CSV-Export eignet sich für tabellarische Daten.
  </p>
  
  <!-- Detail: h5 -->
  <h5 data-ref="csv-options">CSV-Optionen konfigurieren</h5>
  <p data-ref="csv-options-text">
    Wählen Sie Trennzeichen und Zeichenkodierung.
  </p>
  
  <!-- Detail: h5 (gleiche Ebene) -->
  <h5 data-ref="csv-encoding">Zeichenkodierung</h5>
  <p data-ref="csv-encoding-text">
    UTF-8 wird empfohlen für internationale Zeichen.
  </p>
  
  <!-- Zurück zu Unterthema: h4 -->
  <h4 data-ref="pdf-export">Export als PDF</h4>
  <p data-ref="pdf-intro">
    PDF-Export erstellt ein durchsuchbares Dokument.
  </p>
</section>
```

**Hierarchie-Struktur:**
```
h3: AXIOM Export-Funktionen
├── h4: Export als CSV
│   ├── h5: CSV-Optionen konfigurieren
│   └── h5: Zeichenkodierung
└── h4: Export als PDF
```

---

### Validierung

**Automatische Checks (Python-Validator):**
- ❌ Fehler bei Überschriften-Sprüngen (z.B. h2 → h4)
- ⚠️ Warnung bei Hierarchie-Tiefe > 5

**Validator-Output:**
```
❌ Heading-Hierarchie-Sprung: h4 folgt auf h2 (überspringe 1 Level)
   └─ <h4 id='detail-section'>
```

---

### Hinweis: Section-Level vs. Überschriften

**Unterschied verstehen:**

- ** data-level`** (1-5): Logische Struktur der Section
  - Level 1 = Topic
  - Level 2 = Chapter
  - Level 3 = Section

- **`- **`<h1>`-`<h6>`**: Visuelle/strukturelle Hierarchie im HTML

**Beispiel:**
```html
<!-- Section mit data-level="3" kann h3 oder h4 verwenden, 
     je nachdem wo sie im Dokument eingebunden wird -->

<!-- Variante 1: Unter einem Topic (h2) -->
<article data-level="1">
  <h2>Topic: Forensische Tools</h2>
  
  <section data-level="3" data-parent="topic-tools">
    <h3>AXIOM Export</h3>  <!-- Verwendet h3 -->
  </section>
</article>

<!-- Variante 2: Unter einem Chapter (h3) -->
<article data-level="2">
  <h3>Chapter: AXIOM Grundlagen</h3>
  
  <section data-level="3" data-parent="chapter-basics">
    <h4>AXIOM Export</h4>  <!-- Verwendet h4 -->
  </section>
</article>
```

**→ Deshalb ist der START_HEADING-Parameter im Prompt kritisch!**

---

## Teil 3: Prompt-Integration

### Prompt-Vorlage für die KI

```markdown
### BFSG-Barrierefreiheit (Pflicht!)

**Diese Anforderungen sind gesetzlich vorgeschrieben (BFSG) und MÜSSEN eingehalten werden.**

---

#### Alt-Texte für Medien

**Referenzdokument:** `docs/BFSG-Barrierefreiheit-Content.md` (Teil 1)

**Kurzfassung:**
- Jedes `<img>`, `<video>`, `<audio>` MUSS `alt`-Attribut haben
- Max. 120 Zeichen, einfache Sprache
- Zweck beschreiben, nicht Aussehen
- Nach Media-Type differenzieren:
  - Screenshot: "AXIOM Export-Dialog mit Schaltfläche XYZ"
  - Annotated: "Screenshot mit rotem Pfeil auf Menüpunkt XYZ"
  - Diagram: "Flussdiagramm: Prozess von A bis B"
  - Video: "Screencast: Export-Vorgang (Dauer)"
  - Audio: "Audiokommentar: Thema (Sprecher, Dauer)"

**Bei komplexen Diagrammen:** `<figcaption>` mit Detailbeschreibung nutzen.

---

#### Überschriften-Hierarchie

**Referenzdokument:** `docs/BFSG-Barrierefreiheit-Content.md` (Teil 2)

**Hierarchie-Kontext dieser Section:**
- **Section-Level:** {LEVEL}
- **Parent-Element:** {PARENT_ID} (verwendet {PARENT_HEADING})
- **Erste Überschrift dieser Section MUSS sein:** {START_HEADING}

**Regeln:**
1. Erste Überschrift = {START_HEADING}
2. Weitere Überschriften folgen natürlicher Hierarchie (keine Sprünge!)
3. Max. Tiefe: `<h6>` (empfohlen: `<h5>`)

**Beispiel (START_HEADING = h3):**
```html
<h3>Hauptthema</h3>
<h4>Unterthema</h4>
<h5>Detail</h5>
<h4>Weiteres Unterthema</h4>  <!-- Zurück auf h4 erlaubt -->
```

**Verboten:**
```html
<h3>Thema</h3>
<h5>Detail</h5>  <!-- ❌ Überspringt h4 -->
```
```

---

## Zusammenfassung: Checkliste für die KI

### Alt-Texte
- [ ] Jedes Medium hat `alt`-Attribut
- [ ] Alt-Text max. 120 Zeichen
- [ ] Einfache Sprache, keine Fachbegriffe ohne Erklärung
- [ ] Zweck im Kontext beschrieben
- [ ] Media-Type berücksichtigt (Screenshot vs. Diagram vs. Video)
- [ ] Komplexe Diagramme haben zusätzlich `<figcaption>`
- [ ] Keine redundanten Phrasen ("Bild von...", "Screenshot von...")

### Überschriften
- [ ] Erste Überschrift entspricht START_HEADING aus Prompt
- [ ] Keine Sprünge in der Hierarchie (h2 → h3 → h4, nicht h2 → h4)
- [ ] Maximale Tiefe beachtet (≤ h6, empfohlen ≤ h5)
- [ ] Zurück auf höhere Ebene nur wenn logisch (neues Thema)
- [ ] Jede Überschrift hat `data-ref`-Attribut

---

## Validierung

### Automatische Prüfung (Python-Validator)

**Alt-Texte:**
```bash
python validate_html_structure.py index.html \
    --root-tag "main" \
    --schema main-content.schema.json
```

**Prüft:**
- Fehlende `alt`-Attribute → Error
- Leere Alt-Texte (außer `role="presentation"`) → Warning
- Alt-Text > 150 Zeichen → Warning

**Überschriften:**
```bash
python validate_html_structure.py index.html \
    --root-tag "main" \
    --verbose
```

**Prüft:**
- Hierarchie-Sprünge (h2 → h4) → Error
- Hierarchie-Tiefe > 5 → Error
- Hierarchie-Tiefe > 3 → Warning

---

### Manuelle Prüfung

**Alt-Texte:**
1. Screenreader-Test (NVDA oder JAWS)
   - Werden Alt-Texte sinnvoll vorgelesen?
   - Ist der Kontext verständlich?

2. Visueller Review
   - Passen Alt-Texte zum tatsächlichen Medieninhalt?
   - Sind Annotationen korrekt beschrieben?

**Überschriften:**
1. Screenreader-Navigation
   - Kann mit Überschriften-Navigation (H-Taste) sinnvoll navigiert werden?
   - Ist die Hierarchie logisch?

2. Visueller Review
   - Ergibt die Hierarchie semantisch Sinn?
   - Sind Überschriften-Ebenen konsistent?

---

## Häufige Fehler

### Alt-Texte

❌ **Fehler 1: Zu generisch**
```html
<img src="media/screenshots/dialog.png" alt="Dialog">
```
✅ **Besser:**
```html
<img src="media/screenshots/dialog.png" 
     alt="AXIOM Export-Dialog mit Schaltfläche Case Summary exportieren">
```

---

❌ **Fehler 2: Redundante Phrase**
```html
<img src="media/screenshots/menu.png" alt="Screenshot des AXIOM Menüs">
```
✅ **Besser:**
```html
<img src="media/screenshots/menu.png" alt="AXIOM Hauptmenü mit hervorgehobenem File-Menü">
```

---

❌ **Fehler 3: Zu lang**
```html
<img src="media/diagrams/workflow.png" 
     alt="Dieses Flussdiagramm zeigt den gesamten forensischen Workflow beginnend mit der Sicherung des Datenträgers, gefolgt von der Erstellung eines forensischen Images, dann der Hash-Wert-Berechnung...">
```
✅ **Besser:**
```html
<figure>
  <img src="media/diagrams/workflow.png" 
       alt="Flussdiagramm des forensischen Workflows"
       aria-describedby="workflow-desc">
  <figcaption id="workflow-desc">
    Detaillierte Beschreibung: Der Workflow umfasst fünf Phasen...
  </figcaption>
</figure>
```

---

### Überschriften

❌ **Fehler 1: Hierarchie-Sprung**
```html
<h2>Kapitel</h2>
<h4>Unterkapitel</h4>  <!-- Fehler: Überspringt h3 -->
```
✅ **Besser:**
```html
<h2>Kapitel</h2>
<h3>Unterkapitel</h3>
```

---

❌ **Fehler 2: Falsche erste Überschrift**
```html
<!-- Section unter h2-Parent -->
<section data-parent="chapter-basics">
  <h2>Section-Titel</h2>  <!-- Fehler: Sollte h3 sein -->
</section>
```
✅ **Besser:**
```html
<section data-parent="chapter-basics">
  <h3>Section-Titel</h3>  <!-- h3, da Parent h2 verwendet -->
</section>
```

---

❌ **Fehler 3: Zu tiefe Hierarchie**
```html
<h3>Thema</h3>
<h4>Unterthema</h4>
<h5>Detail</h5>
<h6>Unter-Detail</h6>
<h7>Unter-Unter-Detail</h7>  <!-- Fehler: h7 existiert nicht -->
```
✅ **Besser:**
```html
<!-- Bei so tiefer Verschachtelung: Struktur überdenken -->
<h3>Thema</h3>
<h4>Unterthema A</h4>
<h5>Detail zu A</h5>
<h4>Unterthema B</h4>  <!-- Flachere Struktur -->
```

---

## Versions-Historie

| Version | Datum | Änderungen |
|---------|-------|------------|
| 1.0.0 | 2025-10-09 | Initiale Version (Cluster 3): Alt-Texte + Überschriften-Hierarchie |

---

## Weiterführende Ressourcen

**BFSG & WCAG:**
- BFSG-Dokumentation: https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/barrierefreiheitsstaerkungsgesetz.html
- WCAG 2.1 (Bilder): https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
- WCAG 2.1 (Überschriften): https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html

**Alt-Text-Tutorials:**
- W3C Alt-Text Guide: https://www.w3.org/WAI/tutorials/images/
- WebAIM Alt-Text: https://webaim.org/techniques/alttext/

**Screenreader-Tools:**
- NVDA (kostenlos): https://www.nvaccess.org/
- JAWS (kommerziell): https://www.freedomscientific.com/products/software/jaws/

---

**Ende des Dokuments**
