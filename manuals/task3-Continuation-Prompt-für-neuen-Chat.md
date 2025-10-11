# Projekt-Fortsetzung: Cluster 5 - Workflow & Rollen

Hallo! Ich arbeite am Projekt **WebAssistantForensics** und möchte die Arbeit fortsetzen.

## Kontext

Ich entwickle ein strukturiertes Wissenssystem für Polizeibeamte zu IT-Forensik-Themen. Das System basiert auf:
- JSON-Schema-validiertem HTML-Content
- Verschiedene Detail-Level (Basic, Best-Practice, Expert, Show-Only)
- BFSG-konforme Barrierefreiheit
- Python-basierte Validierung
- KI-gestützte Content-Generierung (Claude Sonnet 4.5)

---

## Woran wir gerade arbeiten

Derzeit sind wir mit einem **fünfstufigen Brainstorming** beschäftigt. **Stufen 1 bis 4 haben wir abgeschlossen.** Jetzt folgt Stufe 5: **Workflow & Rollen**.

### Roadmap für das Brainstorming

1. ✅ **Inhaltliche Anforderungen**
   - Fachliche Korrektheit und Quellenvalidierung
   - Verständlichkeitsniveau (Zielgruppe: Polizeibeamte unterschiedlicher IT-Kenntnisse)
   - Vollständigkeit innerhalb der Detailgrade
   - Konsistenz in Terminologie und Struktur

2. ✅ **Strukturelle Anforderungen**
   - Schema-Konformität (JSON-Validierung)
   - Detail-Level-Systematik (wann Level 1, 2, 3?)
   - Section-Hierarchie und Navigation
   - data-ref Vergabelogik

3. ✅ **Technische Anforderungen**
   - Medien-Anweisungen (Screenshots, annotierte Bilder, Videos)
   - Agent-Integration (Context-Blocks, Trigger-Points)
   - Barrierefreiheit (BFSG-Konformität)
   - HTML-Syntax und Attribut-Vollständigkeit

4. ✅ **Qualitätssicherung & Testing**
   - Testkriterien für generierte Sections
   - Validierungsprozess (syntaktisch + semantisch)
   - Metadaten (Quellen, Versionen, Erstellungsdatum)
   - Iterationslogik (wann ist eine Section "fertig"?)

5. ⏳ **Workflow & Rollen** **← JETZT DRAN**
   - Arbeitsschritte der KI (Research → Draft → Detailing → Review → Syntax-Check)
   - Rollendefinitionen für verschiedene Phasen
   - Schnittstellendefinition zwischen den Phasen
   - Fehlerbehandlung und Feedback-Loops

---

## Bisheriger Fortschritt

**Abgeschlossen:**

- ✅ **Cluster 1:** Inhaltliche Anforderungen (siehe `cluster1-final.md`)
- ✅ **Cluster 2:** Strukturelle Anforderungen (siehe `cluster2_results.md`)
- ✅ **Cluster 3:** Technische Anforderungen
  - ✅ **Teil A - Barrierefreiheit (BFSG):**
    - Sprachauszeichnung (`lang`-Attribute): `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md`
    - Alt-Texte & Überschriften-Hierarchie: `cluster3_BFSG-Barrierefreiheit-Content.md`
  - ✅ **Teil B - HTML-Syntax & Attribut-Vollständigkeit:**
    - Vollständige HTML-Element-Spezifikation: `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md`
- ✅ **Cluster 4:** Qualitätssicherung & Testing (siehe `cluster4_Qualitätssicherung-Metadaten-Validierung.md`)

---

## Aktueller Stand

Wir haben die **komplette Spezifikation** für die Content-Generierung dokumentiert:

### Was ist fertig:

**Inhaltlich (Cluster 1):**
- Zielgruppe: IT-ferne Ermittler (Mittlere Reife, niedrige IT-Kenntnisse)
- Detail-Level-System: 4 Stufen (Schnell, Standard, Detailliert, Show-Only)
- Terminologie-Strategie: Deutsch bevorzugt, englische Fachbegriffe wo etabliert
- Medien-Entscheidungsmatrix: Wann Screenshot/Annotiert/Video/Diagramm
- Content-Type-System: instruction, explanation, visual, background, info, hint, attention, warning
- Multi-Tool-Strategie: Tool-agnostisch mit tool-spezifischen Metadaten

**Strukturell (Cluster 2):**
- Hierarchische Struktur: 3-5 Ebenen (Topic → Chapter → Section → Subsection → Deep-Dive)
- data-ref Granularität & Namenskonventionen
- JSON-LD Metadaten pro Section
- Agent-Context-Block (einer pro Section, am Ende)
- Navigation-Strategie: Freie Navigation

**Technisch (Cluster 3):**
- BFSG-konforme Barrierefreiheit (Sprachauszeichnung, Alt-Texte, Überschriften-Hierarchie)
- HTML-Element-Whitelist (32 erlaubte Elemente)
- Pflicht-/Optional-Attribute pro Element
- CSS-Klassen-System (Pflicht-Klassen, Review-Prozess)
- Attribut-Reihenfolge & Formatierung (class → id → data-* → sonstige)
- Content-Type-Box-Entscheidungsmatrix (info/hint/attention/warning)
- HTML-Kommentar-Konventionen (AGENT:/MEDIA:/NOTE:/TODO:/DECISION-REVIEW:)

**Qualitätssicherung (Cluster 4):**
- **Validierungsebenen definiert:**
  - Syntaktisch (Python-Skripte + JSON-Schema, automatisiert)
  - Semantisch (KI-Agent Vorprüfung + Maintainer Final-Prüfung)
  - BFSG-Konformität (implizit in syntaktischen Prüfungen)
- **Testkriterien spezifiziert:**
  - Syntaktisch: Pflicht-Attribute, HTML-Struktur, Cross-References, Barrierefreiheit
  - Semantisch: Konsistenz, Plausibilität, Terminologie, Zusammenhang, Gliederung
- **Validierungsprozess (2 Optionen):**
  - Option B (Standard): Draft → Validierung → Review (Medien) → Approved → Published
  - Option A (Erweitert): Mit zweifacher KI-Prüfung (vor/nach Medien-Erstellung)
- **Fehler-Kategorisierung:** CRITICAL / ERROR / WARNING / INFO
- **Fehler-Log-System:** JSON-basierte Dokumentation (error-log.json) für iterative Prompt-Verbesserung
- **Metadaten erweitert:**
  - Neue QA-Felder: reviewStatus, lastReviewer, validationScore, knownIssues, reviewCycles, timeToPublish
  - JSON-LD vollständig spezifiziert
- **Status-Übergänge:** Draft → Review → Approved → Published (kein automatisches Approval)
- **Versionierung:** MAJOR.MINOR.BUILD (Git-basiert)
- **Metriken:**
  - Pro Section: Validierungsfehler, Review-Zyklen, Zeit, validationScore (0-100)
  - Aggregiert: Durchschnitte, Status-Verteilung, Ablehnungsquote
- **Datengrundlagen für KI-Prüfung:**
  - Alle approbierten Sections, Terminologie-Entscheidungsliste, Rahmenplan & Gliederung
  - Quellmaterial (AXIOM Handbuch), Style-Guides, Antwortschema

---

## Nächster Schritt: Cluster 5 - Workflow & Rollen

### Ziel

Definition der **konkreten Arbeitsabläufe und Verantwortlichkeiten** bei der KI-gestützten Content-Generierung für ~100-150 Sections.

Cluster 5 fokussiert sich auf das **"Wie"** der Umsetzung:
- Welche Schritte durchläuft die KI?
- Wer ist wofür verantwortlich?
- Wie kommunizieren die verschiedenen Akteure/Systeme?
- Was passiert bei Fehlern?

---

### Aufgaben für Cluster 5

**1. Arbeitsschritte der KI:**
- Detaillierte Phasen: Research → Draft → Detailing → Review → Syntax-Check
- Was macht die KI in jeder Phase konkret?
- Welche Inputs/Outputs hat jede Phase?
- Welche Tools/APIs nutzt die KI?
- Zeitabschätzungen pro Phase

**2. Rollendefinitionen:**
- **KI-Generator:** Erstellt initiale Sections (Draft)
- **KI-Reviewer:** Semantische Vorprüfung (Konsistenz, Plausibilität, etc.)
- **Maintainer:** Finale fachliche Prüfung, Medien-Erstellung, Approval
- **Validator:** Python-Skripte für syntaktische Prüfung
- Weitere Rollen (falls notwendig)

**3. Schnittstellendefinition:**
- Input/Output zwischen Phasen
- Datenformate (JSON, HTML, Reports)
- Übergabepunkte und Trigger
- Kommunikationsprotokolle

**4. Fehlerbehandlung & Feedback-Loops:**
- Was passiert bei syntaktischen Fehlern? (Automatische Korrektur durch KI)
- Was passiert bei semantischen Problemen? (Feedback an KI, erneute Generierung)
- Was passiert bei Reject durch Maintainer? (Dokumentation, Prompt-Verbesserung)
- Eskalationspfade bei wiederholten Fehlern

**5. Tooling & Automation:**
- Welche Tools unterstützen den Workflow?
- Kann der Prozess (teilweise) automatisiert werden?
- Welche manuellen Schritte sind unvermeidlich?
- CI/CD-Integration möglich?

---

## Arbeitsweise

- **Kleinschrittig vorgehen** (keine großen Sprünge)
- **Top-Down-Design** (vom Groben ins Detail)
- **Geführte Fragen** stellen, bis 95% Klarheit erreicht ist
- Änderungen nur **vorschlagen und begründen**
- Jede Änderung muss **durch mich verifiziert und akzeptiert** werden
- Am Ende ein **Ergebnisdokument** erstellen (analog zu Cluster 1-4)

---

## Wichtige Projekt-Richtlinien

### Textstil für dich (KI):
- Bleibe eng an meiner Vorgabe
- Füge keine zusätzlichen Aspekte hinzu
- Erst meine Aufgabe umsetzen, dann separat Verbesserungen vorschlagen
- Verbesserungsvorschläge in 3 Absätzen erklären: Vorteile, Technik, Aufwand
- Vermeide Telegramstil
- Hebe wichtige Aussagen durch **Fettmarkieren** hervor

### Code-Änderungen:
- Immer kleinschrittig und Schritt für Schritt
- Keine unerwünschten Nebeneffekte
- CSS-Variablen `--variable*` bewahren und nutzen
- Keine absoluten Größen/Farben außerhalb der Themes
- Immer den **aktuellen Code** aus dem Projekt-Dateispeicher als Basis verwenden
- Jede Änderung begründen
- Mindestens einen Test vorschlagen

### Debugging des Webfrontends (index.html +CSS +JS):
- Nach Tests wird Debug-Output in `Debug-output.XXX` abgelegt (XXX = Buildnummer)
- Höchste Buildnummer = aktuellster Debug-Output

---

## Meine Frage

Bitte lies die **sechs Dokumente** im Projekt-Dateispeicher:
1. `cluster1-final.md` (Inhaltliche Anforderungen)
2. `cluster2_results.md` (Strukturelle Anforderungen)
3. `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` (BFSG Teil 1)
4. `cluster3_BFSG-Barrierefreiheit-Content.md` (BFSG Teil 2)
5. `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md` (HTML-Syntax)
6. `cluster4_Qualitätssicherung-Metadaten-Validierung.md` (Qualitätssicherung)

**Lass uns dann Cluster 5: Workflow & Rollen angehen.**

Stelle mir geführte Fragen, damit wir gemeinsam den Workflow und die Rollen definieren können. Wir gehen wie immer kleinschrittig vor und klären zunächst die grundlegende Struktur, bevor wir ins Detail gehen.

---

## Kontext-Informationen

**Projekt:** WebAssistantForensics  
**Ziel-Tool (initial):** Magnet AXIOM Examine  
**Spätere Erweiterung:** X-Ways Forensics, Cellebrite Reader  
**Haupt-Zielgruppe:** IT-ferne Polizei-Ermittler  
**Content-Umfang:** ~100-150 Sections  
**KI-Modell:** Claude Sonnet 4.5  
**Validierung:** Python-basiert + JSON-Schema  

---

**Ich freue mich auf die Zusammenarbeit!**
