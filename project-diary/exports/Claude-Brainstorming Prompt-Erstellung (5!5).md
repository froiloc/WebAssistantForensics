# Brainstorming Prompt-Erstellung (5!5)

**Created:** 10/9/2025 21:16:20  
**Updated:** 10/10/2025 12:23:02  
**Exported:** 10/11/2025 4:04:16  
**Link:** [https://claude.ai/chat/b6343366-95f9-47f2-8882-a7c9c90af5c0](https://claude.ai/chat/b6343366-95f9-47f2-8882-a7c9c90af5c0)  

## Prompt:
9.10.2025, 21:16:21

Bitte lies `task3-Continuation-Prompt-für-neuen-Chat.md` aus dem Projekt-Dateispeicher und folge den darin stehenden Anmerkungen und Anweisungen.
Ich freue mich auf die weitere Zusammenarbeit mit dir. Es macht mir viel Spaß und ich sehe einen guten Fortschritt.



## Response:
9.10.2025, 21:16:41

Ich freue mich sehr über dein positives Feedback und die gute Zusammenarbeit! Lass mich zunächst die relevante Datei aus dem Projekt-Dateispeicher lesen, um den aktuellen Stand und die spezifischen Anweisungen zu verstehen.

**project_knowledge_search**

*Request*

````javascript
{
  "query": "task3-Continuation-Prompt-für-neuen-Chat.md"
}
````

*Response*

````plaintext
task2.md - Continuation Prompt für neuen Chat.md
✅ Inhaltliche Anforderungen (Cluster 1)
2. ✅ Strukturelle Anforderungen (Cluster 2)
3. ✅ Technische Anforderungen (Cluster 3)
4. ⏳ Prompt-Entwicklung für KI (Cluster 4) **← JETZT DRAN**
5. 🔵 Qualitätssicherung & Testing (Cluster 5)
6. 🔵 Workflow & Rollen (Cluster 6)

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

---

## Nächster Schritt: Cluster 4 - Prompt-Entwicklung

### Ziel

Entwicklung eines **vollständigen, präzisen Master-Prompts** für Claude Sonnet 4.5 zur Generierung von hochwertigem Content für ~100-150 Sections.

Der Prompt muss **alle Anforderungen aus Cluster 1-3 integrieren** und für die KI **direkt verwendbar** sein.

### Aufgaben für Cluster 4

**Phase A: Prompt-Struktur & Architektur**
1. Aufbau des Master-Prompts (Abschnitte, Hierarchie)
2. Informationsdichte vs. Verständlichkeit
3. Kontext-Management (was muss immer dabei sein, was ist optional?)
4. Modularer Aufbau (wiederverwendbare Komponenten)

**Phase B: Prompt-Inhalte**
1. Integration aller Anforderungen aus Cluster 1-3
2. Entscheidungsbäume für KI (Content-Type, Media-Type, etc.)
3. Beispiele & Counter-Beispiele
4. Grenzfall-Behandlung

**Phase C: Testing & Iteration**
1. Test-Prompts erstellen (verschiedene Schwierigkeitsgrade)
2. Generierte Sections validieren
3. Prompt iterativ verbessern
4.
````

````plaintext
task3-Continuation-Prompt-für-neuen-Chat.md
- Section-Hierarchie und Navigation
   - data-ref Vergabelogik

3. âœ… **Technische Anforderungen**
   - Medien-Anweisungen (Screenshots, annotierte Bilder, Videos)
   - Agent-Integration (Context-Blocks, Trigger-Points)
   - Barrierefreiheit (BFSG-KonformitÃ¤t)
   - HTML-Syntax und Attribut-VollstÃ¤ndigkeit

4. âœ… **QualitÃ¤tssicherung & Testing**
   - Testkriterien fÃ¼r generierte Sections
   - Validierungsprozess (syntaktisch + semantisch)
   - Metadaten (Quellen, Versionen, Erstellungsdatum)
   - Iterationslogik (wann ist eine Section "fertig"?)

5. â³ **Workflow & Rollen** **â† JETZT DRAN**
   - Arbeitsschritte der KI (Research â†’ Draft â†’ Detailing â†’ Review â†’ Syntax-Check)
   - Rollendefinitionen fÃ¼r verschiedene Phasen
   - Schnittstellendefinition zwischen den Phasen
   - Fehlerbehandlung und Feedback-Loops

---

## Bisheriger Fortschritt

**Abgeschlossen:**

- âœ… **Cluster 1:** Inhaltliche Anforderungen (siehe `cluster1-final.md`)
- âœ… **Cluster 2:** Strukturelle Anforderungen (siehe `cluster2_results.md`)
- âœ… **Cluster 3:** Technische Anforderungen
  - âœ… **Teil A - Barrierefreiheit (BFSG):**
    - Sprachauszeichnung (`lang`-Attribute): `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md`
    - Alt-Texte & Ãœberschriften-Hierarchie: `cluster3_BFSG-Barrierefreiheit-Content.md`
  - âœ… **Teil B - HTML-Syntax & Attribut-VollstÃ¤ndigkeit:**
    - VollstÃ¤ndige HTML-Element-Spezifikation: `cluster3_Phase-B_HTML-Syntax-und-Attribut-VollstÃ¤ndigkeit.md`
- âœ… **Cluster 4:** QualitÃ¤tssicherung & Testing (siehe `cluster4_QualitÃ¤tssicherung-Metadaten-Validierung.md`)

---

## Aktueller Stand

Wir haben die **komplette Spezifikation** fÃ¼r die Content-Generierung dokumentiert:

### Was ist fertig:

**Inhaltlich (Cluster 1):**
- Zielgruppe: IT-ferne Ermittler (Mittlere Reife, niedrige IT-Kenntnisse)
- Detail-Level-System: 4 Stufen (Schnell, Standard, Detailliert, Show-Only)
- Terminologie-Strategie: Deutsch bevorzu
````

````plaintext
task3-Continuation-Prompt-für-neuen-Chat.md
Cluster 5 fokussiert sich auf das **"Wie"** der Umsetzung:
- Welche Schritte durchlÃ¤uft die KI?
- Wer ist wofÃ¼r verantwortlich?
- Wie kommunizieren die verschiedenen Akteure/Systeme?
- Was passiert bei Fehlern?

---

### Aufgaben fÃ¼r Cluster 5

**1. Arbeitsschritte der KI:**
- Detaillierte Phasen: Research â†’ Draft â†’ Detailing â†’ Review â†’ Syntax-Check
- Was macht die KI in jeder Phase konkret?
- Welche Inputs/Outputs hat jede Phase?
- Welche Tools/APIs nutzt die KI?
- ZeitabschÃ¤tzungen pro Phase

**2. Rollendefinitionen:**
- **KI-Generator:** Erstellt initiale Sections (Draft)
- **KI-Reviewer:** Semantische VorprÃ¼fung (Konsistenz, PlausibilitÃ¤t, etc.)
- **Maintainer:** Finale fachliche PrÃ¼fung, Medien-Erstellung, Approval
- **Validator:** Python-Skripte fÃ¼r syntaktische PrÃ¼fung
- Weitere Rollen (falls notwendig)

**3. Schnittstellendefinition:**
- Input/Output zwischen Phasen
- Datenformate (JSON, HTML, Reports)
- Ãœbergabepunkte und Trigger
- Kommunikationsprotokolle

**4. Fehlerbehandlung & Feedback-Loops:**
- Was passiert bei syntaktischen Fehlern? (Automatische Korrektur durch KI)
- Was passiert bei semantischen Problemen? (Feedback an KI, erneute Generierung)
- Was passiert bei Reject durch Maintainer? (Dokumentation, Prompt-Verbesserung)
- Eskalationspfade bei wiederholten Fehlern

**5. Tooling & Automation:**
- Welche Tools unterstÃ¼tzen den Workflow?
- Kann der Prozess (teilweise) automatisiert werden?
- Welche manuellen Schritte sind unvermeidlich?
- CI/CD-Integration mÃ¶glich?

---

## Arbeitsweise

- **Kleinschrittig vorgehen** (keine groÃŸen SprÃ¼nge)
- **Top-Down-Design** (vom Groben ins Detail)
- **GefÃ¼hrte Fragen** stellen, bis 95% Klarheit erreicht ist
- Ã„nderungen nur **vorschlagen und begrÃ¼nden**
- Jede Ã„nderung muss **durch mich verifiziert und akzeptiert** werden
- Am Ende ein **Ergebnisdokument** erstellen (analog zu Cluster 1-4)

---

## Wichtige Projekt-Richtlinien

### Textstil fÃ¼r dich (KI):
- Bleibe eng an meiner Vorgabe
- FÃ¼ge keine zusÃ¤tzlichen Aspekte hinzu
- Erst meine Aufgabe umsetzen, dann separat Verbesserungen vorschlagen
- VerbesserungsvorschlÃ¤ge in 3 AbsÃ¤tzen erklÃ¤ren: Vorteile, Technik, Aufwand
- Vermeide Telegramstil
- Hebe wichtige Aussagen durch **Fettmarkieren** hervor

### Code-Ã„nderungen:
- Immer kleinschrittig und Schritt fÃ¼r Schritt
- Keine unerwÃ¼nschten Nebeneffekte
- CSS-Variablen `--variable*` bewahren und nutzen
- Keine absoluten GrÃ¶ÃŸen/Farben auÃŸerhalb der Themes
- Immer den **aktuellen Code** aus dem Projekt-Dateispeicher als Basis verwenden
- Jede Ã„nderung begrÃ¼nden
- Mindestens einen Test vorschlagen

### Debugging des Webfrontends (index.html +CSS +JS):
- Nach Tests wird Debug-Output in `Debug-output.XXX` abgelegt (XXX = Buildnummer)
- HÃ¶chste Buildnummer = aktuellster Debug-Output

---

## Meine Frage

Bitte lies die **sechs Dokumente** im Projekt-Dateispeicher:
1. `cluster1-final.md` (Inhaltliche Anforderungen)
2.
````

````plaintext
task2.md - Continuation Prompt für neuen Chat.md
Aufbau des Master-Prompts (Abschnitte, Hierarchie)
2. Informationsdichte vs. Verständlichkeit
3. Kontext-Management (was muss immer dabei sein, was ist optional?)
4. Modularer Aufbau (wiederverwendbare Komponenten)

**Phase B: Prompt-Inhalte**
1. Integration aller Anforderungen aus Cluster 1-3
2. Entscheidungsbäume für KI (Content-Type, Media-Type, etc.)
3. Beispiele & Counter-Beispiele
4. Grenzfall-Behandlung

**Phase C: Testing & Iteration**
1. Test-Prompts erstellen (verschiedene Schwierigkeitsgrade)
2. Generierte Sections validieren
3. Prompt iterativ verbessern
4. Best Practices dokumentieren

---

## Arbeitsweise

- **Kleinschrittig vorgehen** (keine großen Sprünge)
- **Top-Down-Design** (vom Groben ins Detail)
- **Geführte Fragen** stellen, bis 95% Klarheit erreicht ist
- Änderungen nur **vorschlagen und begründen**
- Jede Änderung muss **durch mich verifiziert und akzeptiert** werden
- Am Ende ein **Ergebnisdokument** erstellen (analog zu Cluster 1-3)

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

### Debugging:
- Nach Tests wird Debug-Output in `Debug-output.XXX` abgelegt (XXX = Buildnummer)
- Höchste Buildnummer = aktuellster Debug-Output

---

## Meine Frage

Bitte lies die fünf Dokumente im Projekt-Dateispeicher:
1. `cluster1-final.md` (Inhaltliche Anforderungen)
2. `cluster2_results.md` (Strukturelle Anforderungen)
3. `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` (BFSG Teil 1)
4. `cluster3_BFSG-Barrierefreiheit-Content.md` (BFSG Teil 2)
5. `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md` (HTML-Syntax)

**Lass uns dann Cluster 4: Prompt-Entwicklung angehen.**

Stelle mir geführte Fragen, damit wir gemeinsam den Master-Prompt entwickeln können. Wir gehen wie immer kleinschrittig vor und klären zunächst die grundlegende Struktur, bevor wir ins Detail gehen.

---

## Kontext-Informationen

**Projekt:** WebAssistentForensics  
**Ziel-Tool (initial):** Magnet AXIOM Examine  
**Spätere Erweiterung:** X-Ways Forensics, Cellebrite Reader  
**Haupt-Zielgruppe:** IT-ferne Polizei-Ermittler  
**Content-Umfang:** ~100-150 Sections  
**KI-Modell:** Claude Sonnet 4.5  
**Validierung:** Python-basiert + JSON-Schema  

---

**Ich freue mich auf die Zusammenarbeit!**
````

````plaintext
task3-Continuation-Prompt-für-neuen-Chat.md
gt, englische Fachbegriffe wo etabliert
- Medien-Entscheidungsmatrix: Wann Screenshot/Annotiert/Video/Diagramm
- Content-Type-System: instruction, explanation, visual, background, info, hint, attention, warning
- Multi-Tool-Strategie: Tool-agnostisch mit tool-spezifischen Metadaten

**Strukturell (Cluster 2):**
- Hierarchische Struktur: 3-5 Ebenen (Topic â†’ Chapter â†’ Section â†’ Subsection â†’ Deep-Dive)
- data-ref GranularitÃ¤t & Namenskonventionen
- JSON-LD Metadaten pro Section
- Agent-Context-Block (einer pro Section, am Ende)
- Navigation-Strategie: Freie Navigation

**Technisch (Cluster 3):**
- BFSG-konforme Barrierefreiheit (Sprachauszeichnung, Alt-Texte, Ãœberschriften-Hierarchie)
- HTML-Element-Whitelist (32 erlaubte Elemente)
- Pflicht-/Optional-Attribute pro Element
- CSS-Klassen-System (Pflicht-Klassen, Review-Prozess)
- Attribut-Reihenfolge & Formatierung (class â†’ id â†’ data-* â†’ sonstige)
- Content-Type-Box-Entscheidungsmatrix (info/hint/attention/warning)
- HTML-Kommentar-Konventionen (AGENT:/MEDIA:/NOTE:/TODO:/DECISION-REVIEW:)

**QualitÃ¤tssicherung (Cluster 4):**
- **Validierungsebenen definiert:**
  - Syntaktisch (Python-Skripte + JSON-Schema, automatisiert)
  - Semantisch (KI-Agent VorprÃ¼fung + Maintainer Final-PrÃ¼fung)
  - BFSG-KonformitÃ¤t (implizit in syntaktischen PrÃ¼fungen)
- **Testkriterien spezifiziert:**
  - Syntaktisch: Pflicht-Attribute, HTML-Struktur, Cross-References, Barrierefreiheit
  - Semantisch: Konsistenz, PlausibilitÃ¤t, Terminologie, Zusammenhang, Gliederung
- **Validierungsprozess (2 Optionen):**
  - Option B (Standard): Draft â†’ Validierung â†’ Review (Medien) â†’ Approved â†’ Published
  - Option A (Erweitert): Mit zweifacher KI-PrÃ¼fung (vor/nach Medien-Erstellung)
- **Fehler-Kategorisierung:** CRITICAL / ERROR / WARNING / INFO
- **Fehler-Log-System:** JSON-basierte Dokumentation (error-log.json) fÃ¼r iterative Prompt-Verbesserung
- **Metadaten erweitert:**
  - Neue QA-Felder: reviewStatus, lastReviewer, validationScore, knownIssues, reviewCycles, timeToPublish
  - JSON-LD vollstÃ¤ndig spezifiziert
- **Status-ÃœbergÃ¤nge:** Draft â†’ Review â†’ Approved â†’ Published (kein automatisches Approval)
- **Versionierung:** MAJOR.MINOR.BUILD (Git-basiert)
- **Metriken:**
  - Pro Section: Validierungsfehler, Review-Zyklen, Zeit, validationScore (0-100)
  - Aggregiert: Durchschnitte, Status-Verteilung, Ablehnungsquote
- **Datengrundlagen fÃ¼r KI-PrÃ¼fung:**
  - Alle approbierten Sections, Terminologie-Entscheidungsliste, Rahmenplan & Gliederung
  - Quellmaterial (AXIOM Handbuch), Style-Guides, Antwortschema

---

## NÃ¤chster Schritt: Cluster 5 - Workflow & Rollen

### Ziel

Definition der **konkreten ArbeitsablÃ¤ufe und Verantwortlichkeiten** bei der KI-gestÃ¼tzten Content-Generierung fÃ¼r ~100-150 Sections.

Cluster 5 fokussiert sich auf das **"Wie"** der Umsetzung:
- Welche Schritte durchlÃ¤uft die KI?
- Wer ist wofÃ¼r verantwortlich?
- Wie kommunizieren die verschiedenen Akteure/Systeme?
````

````plaintext
task2.md - Continuation Prompt für neuen Chat.md
# Projekt-Fortsetzung: Cluster 4 - Prompt-Entwicklung für KI-Content-Generierung

Hallo! Ich arbeite am Projekt **WebAssistentForensics** und möchte die Arbeit fortsetzen.

## Kontext

Ich entwickle ein strukturiertes Wissenssystem für Polizeibeamte zu IT-Forensik-Themen. Das System basiert auf:
- JSON-Schema-validiertem HTML-Content
- Verschiedene Detail-Level (Basic, Best-Practice, Expert, Show-Only)
- BFSG-konforme Barrierefreiheit
- Python-basierte Validierung
- KI-gestützte Content-Generierung (Claude Sonnet 4.5)

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

**Cluster-Übersicht (Originalplanung):**
1. ✅ Inhaltliche Anforderungen (Cluster 1)
2. ✅ Strukturelle Anforderungen (Cluster 2)
3. ✅ Technische Anforderungen (Cluster 3)
4. ⏳ Prompt-Entwicklung für KI (Cluster 4) **← JETZT DRAN**
5. 🔵 Qualitätssicherung & Testing (Cluster 5)
6.
````

````plaintext
task3-Continuation-Prompt-für-neuen-Chat.md
`cluster1-final.md` (Inhaltliche Anforderungen)
2. `cluster2_results.md` (Strukturelle Anforderungen)
3. `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` (BFSG Teil 1)
4. `cluster3_BFSG-Barrierefreiheit-Content.md` (BFSG Teil 2)
5. `cluster3_Phase-B_HTML-Syntax-und-Attribut-VollstÃ¤ndigkeit.md` (HTML-Syntax)
6. `cluster4_QualitÃ¤tssicherung-Metadaten-Validierung.md` (QualitÃ¤tssicherung)

**Lass uns dann Cluster 5: Workflow & Rollen angehen.**

Stelle mir gefÃ¼hrte Fragen, damit wir gemeinsam den Workflow und die Rollen definieren kÃ¶nnen. Wir gehen wie immer kleinschrittig vor und klÃ¤ren zunÃ¤chst die grundlegende Struktur, bevor wir ins Detail gehen.

---

## Kontext-Informationen

**Projekt:** WebAssistentForensics  
**Ziel-Tool (initial):** Magnet AXIOM Examine  
**SpÃ¤tere Erweiterung:** X-Ways Forensics, Cellebrite Reader  
**Haupt-Zielgruppe:** IT-ferne Polizei-Ermittler  
**Content-Umfang:** ~100-150 Sections  
**KI-Modell:** Claude Sonnet 4.5  
**Validierung:** Python-basiert + JSON-Schema  

---

**Ich freue mich auf die Zusammenarbeit!**
````

````plaintext
task3-Continuation-Prompt-für-neuen-Chat.md
# Projekt-Fortsetzung: Cluster 5 - Workflow & Rollen

Hallo! Ich arbeite am Projekt **WebAssistentForensics** und mÃ¶chte die Arbeit fortsetzen.

## Kontext

Ich entwickle ein strukturiertes Wissenssystem fÃ¼r Polizeibeamte zu IT-Forensik-Themen. Das System basiert auf:
- JSON-Schema-validiertem HTML-Content
- Verschiedene Detail-Level (Basic, Best-Practice, Expert, Show-Only)
- BFSG-konforme Barrierefreiheit
- Python-basierte Validierung
- KI-gestÃ¼tzte Content-Generierung (Claude Sonnet 4.5)

---

## Woran wir gerade arbeiten

Derzeit sind wir mit einem **fÃ¼nfstufigen Brainstorming** beschÃ¤ftigt. **Stufen 1 bis 4 haben wir abgeschlossen.** Jetzt folgt Stufe 5: **Workflow & Rollen**.

### Roadmap fÃ¼r das Brainstorming

1. âœ… **Inhaltliche Anforderungen**
   - Fachliche Korrektheit und Quellenvalidierung
   - VerstÃ¤ndlichkeitsniveau (Zielgruppe: Polizeibeamte unterschiedlicher IT-Kenntnisse)
   - VollstÃ¤ndigkeit innerhalb der Detailgrade
   - Konsistenz in Terminologie und Struktur

2. âœ… **Strukturelle Anforderungen**
   - Schema-KonformitÃ¤t (JSON-Validierung)
   - Detail-Level-Systematik (wann Level 1, 2, 3?)
   - Section-Hierarchie und Navigation
   - data-ref Vergabelogik

3. âœ… **Technische Anforderungen**
   - Medien-Anweisungen (Screenshots, annotierte Bilder, Videos)
   - Agent-Integration (Context-Blocks, Trigger-Points)
   - Barrierefreiheit (BFSG-KonformitÃ¤t)
   - HTML-Syntax und Attribut-VollstÃ¤ndigkeit

4. âœ… **QualitÃ¤tssicherung & Testing**
   - Testkriterien fÃ¼r generierte Sections
   - Validierungsprozess (syntaktisch + semantisch)
   - Metadaten (Quellen, Versionen, Erstellungsdatum)
   - Iterationslogik (wann ist eine Section "fertig"?)
````

Vielen Dank für die ausführliche Einführung und das positive Feedback! Ich habe die Continuation-Prompts gelesen und verstehe nun den **aktuellen Projektstand**:

## Was ich verstanden habe

**Projektkontext:**
- Du entwickelst **WebAssistentForensics** – ein Wissenssystem für IT-ferne Polizeibeamte
- Ziel-Tool initial: **Magnet AXIOM Examine** (später X-Ways Forensics, Cellebrite Reader)
- Content-Umfang: **~100-150 Sections**
- KI-gestützte Generierung mit **Claude Sonnet 4.5**

**Abgeschlossene Cluster:**
- ✅ **Cluster 1:** Inhaltliche Anforderungen (Zielgruppe, Detail-Level, Terminologie, Medien)
- ✅ **Cluster 2:** Strukturelle Anforderungen (Hierarchie, data-ref, JSON-LD, Navigation)
- ✅ **Cluster 3:** Technische Anforderungen (BFSG-Barrierefreiheit, HTML-Whitelist, CSS-Klassen)
- ✅ **Cluster 4:** Qualitätssicherung & Testing (Validierung, Metadaten, Error-Logs)

**Aktueller Arbeitsschritt:**
- ⏳ **Cluster 5: Workflow & Rollen** – Definition der konkreten Arbeitsabläufe und Verantwortlichkeiten

---

## Meine erste Frage zur Orientierung (Cluster 5)

Bevor wir in die Details des Workflows einsteigen, möchte ich das **Big Picture** verstehen:

**Welche Akteure/Systeme sind grundsätzlich am Content-Generierungsprozess beteiligt?**

Ich vermute basierend auf den bisherigen Dokumenten:
1. **KI-System** (Claude Sonnet 4.5) – generiert Content
2. **Python-Validierungsskripte** – prüfen Syntax automatisch
3. **Du als Maintainer** – finale fachliche Prüfung und Approval
4. Eventuell weitere **KI-Instanzen** für Review/Qualitätsprüfung?

**Meine konkrete Frage:** 
- Sind diese vier Rollen korrekt?
- Gibt es weitere Akteure (z.B. separate Medien-Ersteller, Fachexperten für bestimmte Tools, etc.)?
- Oder planst du aktuell nur mit **KI-Generator + Validator + Dir als Maintainer**?

Diese Klarstellung hilft mir, den Workflow von Anfang an richtig zu strukturieren.



## Prompt:
9.10.2025, 22:13:55

Zur ersten Frage)
1) KI-System (Claude Sonnet 4.5) für Content-Erstellung
2) Python-Validierungsskripte zur Syntaxprüfung
3) Maintainer (Kollegen oder ich) für Medienerstellung, fachliche Prüfung und Approval
4) KI-System für Basic Semantic Check, Qualitätsprüfung, Review
5) Maintainer (Kollegen oder ich) für Einpflegen nach Approval (Versionierung und Verteilen)
0) Implizit (Ersteller von Handbüchern der Software, und andere Hilfe-Dokumente) (passiv, keine aktive Rolle)
Weitere Akteure gibt es nicht. Aber ich würde auch eher die Rollen betrachten und benennen, die sie einnehmen. Content-Creator, Content-Validator, Content-Enricher, Content-Reviewer, Content-Distributor

Während die Python-Scripte vor allem Content validieren, kann das KI-System sowohl Content-Creator und später Content-Reviewer sein. Der Maintainer ist Content-Creator (für Medien), Content-Validator (wertet die Ergebnisse der Python-Scripte aus und behebt Missstände), Content-Enricher (ergänzt den Inhalt um Medieninhalte, Glossar, Agent), Content-Reviewer (begutachtet die Korrektheit, Konsistenz und Qualität aus einer fachlichen und menschlichen Perspektive), Content-Distributor (komponiert das Endprodukt und verteilt es).

Ich plane also, dass jeder Akteur durchaus mehrere Rollen und Arbeitsschritte durchführen und begleiten wird.



## Response:
9.10.2025, 22:14:13

Ausgezeichnet! Das ist eine sehr klare und durchdachte Rollenverteilung. Ich verstehe jetzt die **Mehrfachfunktionen** der Akteure und die **fünf Kernrollen**.

## Mein Verständnis (zur Bestätigung)

**Akteure und ihre Rollen:**

| Akteur | Rollen |
|--------|--------|
| **KI-System (Claude)** | Content-Creator, Content-Reviewer |
| **Python-Skripte** | Content-Validator (syntaktisch) |
| **Maintainer (du/Kollegen)** | Content-Creator (Medien), Content-Validator (Auswertung), Content-Enricher (Medien/Glossar/Agent), Content-Reviewer (fachlich/menschlich), Content-Distributor |
| **Handbuch-Autoren** | (passiv, Quellenmaterial) |

**Die fünf Kernrollen:**
1. **Content-Creator** – erstellt initialen Content
2. **Content-Validator** – prüft Syntax/Struktur
3. **Content-Enricher** – ergänzt Medien/Glossar/Agent-Context
4. **Content-Reviewer** – prüft Qualität/Konsistenz/Korrektheit
5. **Content-Distributor** – komponiert und verteilt Endprodukt

---

## Nächste Frage: Workflow-Phasen

Um den Workflow zu strukturieren, brauche ich Klarheit über die **zeitliche Abfolge** der Arbeitsschritte. Basierend auf Cluster 4 vermute ich folgenden Ablauf:

**Vermuteter Workflow:**
```
1. Research (KI: Quellen analysieren)
2. Draft (KI: initialer Content)
3. Syntax-Validierung (Python-Skripte)
4. Fehlerkorrektur (KI oder Maintainer)
5. Semantic Review (KI: Konsistenz/Plausibilität)
6. Medien-Erstellung (Maintainer)
7. Content-Enrichment (Maintainer: Medien einbinden, Glossar, Agent)
8. Final Review (Maintainer: fachliche Prüfung)
9. Approval (Maintainer)
10. Distribution (Maintainer: Versionierung, Veröffentlichung)
```

**Meine konkreten Fragen:**

1. **Ist diese Reihenfolge grundsätzlich korrekt?** Oder sollen manche Schritte parallel laufen oder in anderer Reihenfolge?

2. **Research-Phase:** Soll die KI aktiv externe Quellen recherchieren (z.B. via Web-Search) oder arbeitet sie ausschließlich mit **vorab bereitgestelltem Material** (AXIOM-Handbuch, bereits approbierte Sections)?

3. **Fehlerkorrektur nach Syntax-Validierung:** Wer korrigiert was? Sollen **CRITICAL/ERROR** automatisch von der KI korrigiert werden, während **WARNING/INFO** vom Maintainer manuell geprüft werden?

4. **Wann findet das Semantic Review statt?** Vor oder nach der Medien-Erstellung? (In Cluster 4 gab es zwei Optionen – welche bevorzugst du?)

Diese vier Punkte helfen mir, den Workflow präzise zu definieren.



## Prompt:
9.10.2025, 22:32:44

Bezüglich des Workflows fehlt mir noch eine entscheidende, initiale Phase. Die Sections sollen zwar einzeln erstellt werden (Draft) aber sie sollen sich in ein Gesamtgefüge einpassen. Daher ist es wichtig, dass vor dem Draft noch eine Phase für die Erstellung des Content-Rahmens und des strategischen Zieles steht. Diese geben der KI beim Draft die Leitplanken, was sie inhaltlich einbetten soll und was nicht, wo der Fokus gesetzt werden soll und so weiter. Diese Phase ist extrem wichtig für ein rundes Endergebnis, das sich nicht wie Stückwerk anfühlt. Auch prüft in Schritt 5 die KI in ihrer Semantic Review anhand dieser Kriterien. Und kann dann sogar Scores für die einzelnen Sections geben, um zu bewerten, ob sie für das Endziel geeignet sind oder ob es noch Mängel gibt.

Parallel wird hier nichts laufen können. Vielleicht kann man mehrere Drafts parallel laufen lassen, wenn die Vorbereitung gut ist. Aber eigentlich dachte ich daran, der KI die Drafts der vorherigen Sections ebenfalls zur Orientierung zu übergeben.

Bezüglich Research-Phase: Ich würde die Quellen selber benennen, um die Qualität der Quellen besser einschätzen zu können. Das ist wichtig. Das Thema ist sehr weit in einer Nische, da gibt es nicht viele gute Quellen im Internet.

Der Prozess wird wahrscheinlich nicht automatisiert ablaufen, obwohl das vielleicht sogar mit dem Konsolentool von Claude.AI ginge. Aber ich möchte zumindest in der Version 1.0 noch die volle manuelle Kontrolle haben, damit ich beobachten und lernen kann, für eine spätere Verbesserung und Automatisierung. Hey, ich bin Informatiker, natürlich werde ich es automatisieren, wenn ich dafür Bedarf und einen Weg sehe. :-D

Ich bevorzuge die Semantic Review mit Medien nach der Medienerstellung. Ich habe noch nicht getestet, wie gut die Qualität einer semantischen Review mit Medien durch die KI sein kann. Das müsste noch getestet werden. Im Moment, für Version 1.0, würde ich es erst einmal ohne Medien machen und daher die semantische Review vor der Medien-Erstellung ansetzen.



## Response:
9.10.2025, 22:33:08

Hervorragend! Das ist eine **sehr wichtige Ergänzung**, die ich vollständig nachvollziehen kann. Die **Content-Rahmen-Phase** ist tatsächlich entscheidend für Kohärenz und verhindert das "Stückwerk-Gefühl". 

Deine pragmatische Herangehensweise (manuelle Kontrolle in v1.0, später Automatisierung) und die realistische Einschätzung zur Medien-Review finde ich sehr professionell. 👍

## Aktualisiertes Workflow-Verständnis

**Phasen-Übersicht (v1.0):**

```
Phase 0: Content-Rahmen & Strategie
├─ Maintainer definiert: Gesamtgliederung, Lernziele, Fokus-Themen
├─ Maintainer benennt: Quellen (AXIOM-Handbuch, etc.)
└─ Output: Strategiedokument, Gliederung, Quellenliste

Phase 1: Research & Draft (pro Section)
├─ KI liest: Strategiedokument, Quellen, bereits approbierte Sections
├─ KI erstellt: initialen Draft
└─ Output: Section-Draft (HTML)

Phase 2: Syntax-Validierung
├─ Python-Skripte prüfen: Schema-Konformität, Pflicht-Attribute, etc.
└─ Output: Validierungs-Report (CRITICAL/ERROR/WARNING/INFO)

Phase 3: Fehlerkorrektur
├─ Bei CRITICAL/ERROR: KI korrigiert automatisch (?)
├─ Bei WARNING/INFO: Maintainer prüft manuell (?)
└─ Output: Korrigierter Draft

Phase 4: Semantic Review (ohne Medien)
├─ KI prüft: Konsistenz, Terminologie, Passung zum Strategiedokument
├─ KI vergibt: Quality-Score (0-100)
└─ Output: Review-Report, ggf. Verbesserungsvorschläge

Phase 5: Medien-Erstellung
├─ Maintainer erstellt: Screenshots, annotierte Bilder, Videos
└─ Output: Medien-Assets

Phase 6: Content-Enrichment
├─ Maintainer bindet ein: Medien, Glossar-Verweise, Agent-Context
└─ Output: Angereicherte Section

Phase 7: Final Review
├─ Maintainer prüft: Fachliche Korrektheit, UX, Gesamteindruck
└─ Output: Approval oder Reject (mit Feedback)

Phase 8: Distribution
├─ Maintainer: Versionierung (Git), Komponierung, Veröffentlichung
└─ Output: Published Section
```

---

## Vertiefende Fragen zu Phase 0 (Content-Rahmen)

Diese Phase ist neu und zentral. Ich möchte sie genauer verstehen:

**1. Umfang des Strategiedokuments:**
Welche **konkreten Elemente** soll das Strategiedokument enthalten? Ich vermute:
- Gesamtgliederung (Topics → Chapters → Sections)
- Lernziele pro Topic/Chapter
- Fokus-Themen und Abgrenzungen ("Das gehört rein / Das nicht")
- Terminologie-Entscheidungen
- Zielgruppen-Spezifika für diesen Content-Bereich
- Cross-Reference-Strategie

**Gibt es noch weitere Elemente?**

**2. Granularität:**
Wird das Strategiedokument **einmal global** für alle 100-150 Sections erstellt, oder gibt es **hierarchische Strategiedokumente** (z.B. eines pro Topic, verfeinert pro Chapter)?

**3. Iterative Anpassung:**
Kann das Strategiedokument während der Erstellung **angepasst** werden, wenn sich beim Drafting zeigt, dass bestimmte Strukturen besser funktionieren? Oder ist es nach Phase 0 "eingefroren"?

**4. KI-Unterstützung in Phase 0:**
Soll die **KI beim Erstellen des Strategiedokuments helfen** (z.B. Gliederungsvorschläge basierend auf Quellenmaterial), oder erstellst du Phase 0 komplett manuell?

Diese vier Punkte sind wichtig, um Phase 0 im Workflow korrekt zu positionieren.



## Prompt:
9.10.2025, 23:21:58

Phasen 0 und 1 würde ich etwas anders gliedern und andere Schwerpunkte setzen.

```
Phase 0: Strategie
├─ Maintainer definiert: Lernziel, Fokus-Themen, Umfang
├─ Maintainer benennt: forensische Software
└─ Output: Strategiedokument, Quellenliste

Phase 0.5: Vorarbeit
├─ KI liest: Strategiedokument, Quellen
├─ KI erstellt: Gesamtgliederung, groben Inhaltsentwurf für alle Sections
└─ Output: Liste der Sections mit groben Angaben zum Inhalt und Gliederungsebene

Phase 1: Research & Draft (pro Section)
├─ KI liest: Strategiedokument, Liste zu Inhalt und Gliederungsebene, Quellen, bereits approbierte Sections
├─ KI erstellt: initialen Draft
└─ Output: Section-Draft (HTML)

Phase 2: Syntax-Validierung
├─ Python-Skripte prüfen: Schema-Konformität, Pflicht-Attribute, etc.
└─ Output: Validierungs-Report (CRITICAL/ERROR/WARNING/INFO)

Phase 3: Fehlerkorrektur
├─ Bei CRITICAL/ERROR: KI erhält Liste der Beanstandungen
│  └─ KI erstellt: Korrigierte Version des Drafts (neue Versionsnummer)
├─ Bei WARNING/INFO: Maintainer prüft manuell
│  └─ Maintainer entscheidet: Beheben oder ignorieren
└─ Output: Korrigierter Draft (Bei neuer Version weiter bei Phase 2, sonst Phase 4)
```

Der Rest passt so, denke ich.
Zu 1)
Deine Vertiefungsfragen: Ja, das sind die Elemente, die im Strategiedokument definiert werden. 
* Welche Software soll erklärt werden und in welcher Version? 
* Welche Teile müssen aufgenommen werden bei der Erklärung?
* Welche können weggelassen werden? 
* Welche forensische Sicherung steht vielleicht im Fokus (Mobilfunkgerät oder PC-System)? 
Weitere fixe Elemente kommen mir gerade nicht in den Sinn. Das Papier ist aber nicht starr, sondern ist eher als Rahmenvorgabe für die Gliederung und das gesamte Projekt zu verstehen.

Zu 2)
* Wahrscheinlich wird es nicht nur ein Strategiepapier geben sondern ein für das Gesamtwerk und dann noch welche für einzelne Topics und Chapter.

Zu 3)
* Ja, wenn sich zeigt, dass die Qualität bei bestimmten Punkten nicht stimmt, wird es natürlich angepasst und erhält eine neue Versionsnummer. Es wird eine Art Wirlpool-Prozess. Aber der Fokus ist natürlich auch ein Ergebnis zu liefern und nicht bis zur absoluten Perfektion zu iterieren. Das kostet schließlich Zeit und Ressourcen.

Zu 4)
* Phase 0 habe ich angepasst. Daher schaue bitte auf meine Anmerkungen dazu und prüfe, ob das deine Frage bereits beantwortet.



## Response:
9.10.2025, 23:22:24

Perfekt! Die **Aufteilung in Phase 0 und Phase 0.5** macht absolut Sinn und gibt der KI eine klare Vorbereitungsphase. Die **iterative Fehlerkorrektur mit Versionierung** in Phase 3 ist ebenfalls sehr durchdacht.

## Mein aktualisiertes Verständnis

**Phase 0 (Strategie) - Maintainer:**
- Definiert: Lernziel, Fokus, Umfang, Software/Version, forensischer Kontext (Mobilgerät vs. PC)
- Benennt: Quellen
- **Hierarchie:** Global + pro Topic/Chapter (bei Bedarf)
- **Flexibilität:** Anpassbar (Versionierung), aber fokussiert auf Ergebnis statt Perfektion

**Phase 0.5 (Vorarbeit) - KI:**
- Liest: Strategiedokument(e), Quellen
- Erstellt: **Gesamtgliederung + grober Inhaltsentwurf für alle Sections**
- Output: **Section-Liste mit Inhaltsskizze + Gliederungsebene**

**Phase 3 (Fehlerkorrektur) - Iterativ:**
```
CRITICAL/ERROR → KI korrigiert → neue Version → zurück zu Phase 2
WARNING/INFO   → Maintainer entscheidet → weiter zu Phase 4
```

Das ist jetzt sehr klar! 👍

---

## Vertiefende Fragen zu Phase 0.5 (Vorarbeit)

Diese Phase ist **neu und zentral** für die Konsistenz. Ich möchte verstehen, was genau die KI hier liefern soll:

**1. Format der Section-Liste:**
Wie detailliert soll der **"grobe Inhaltsentwurf"** pro Section sein? Beispiel:

**Option A (Stichpunkte):**
```
Section: axiom-case-creation
Gliederungsebene: 3
Grober Inhalt:
- Neuen Fall anlegen
- Evidenzquellen hinzufügen
- Fall-Metadaten erfassen
```

**Option B (Kurzbeschreibung):**
```
Section: axiom-case-creation
Gliederungsebene: 3
Grober Inhalt: Diese Section erklärt, wie ein neuer Fall in AXIOM erstellt wird. 
Sie umfasst die Auswahl der Evidenzquellen, das Erfassen von Fall-Metadaten 
und die grundlegende Projektkonfiguration.
```

**Option C (Strukturierte Metadaten):**
```json
{
  "section_id": "axiom-case-creation",
  "hierarchy_level": 3,
  "learning_goal": "Ermittler kann eigenständig einen Fall anlegen",
  "key_topics": ["Fall erstellen", "Evidenz hinzufügen", "Metadaten"],
  "prerequisites": ["axiom-installation", "axiom-interface"],
  "estimated_complexity": "basic"
}
```

**Welches Format ist für Phase 1 (Draft) am hilfreichsten?**

---

**2. Approval von Phase 0.5:**
Muss der Maintainer die **Section-Liste aus Phase 0.5 absegnen**, bevor Phase 1 (Draft) startet? Oder läuft Phase 0.5 → Phase 1 ohne menschliche Zwischenprüfung?

**Hintergrund:** Wenn die Gliederung falsch ist, produziert Phase 1 möglicherweise 20-30 Sections, die dann alle korrigiert werden müssen.

---

**3. Umgang mit Quellenmaterial in Phase 0.5:**
Die KI liest in Phase 0.5 die **Quellen** (z.B. AXIOM-Handbuch). Wie tief soll sie einsteigen?

- **Oberflächlich:** Nur Inhaltsverzeichnis + Kapitelüberschriften analysieren
- **Mittel:** Kapitel-Intros + wichtige Abschnitte lesen
- **Tief:** Vollständige Lektüre aller relevanten Kapitel

**Was ist für Phase 0.5 angemessen?** (Die tiefe Analyse kann ja in Phase 1 pro Section erfolgen.)

---

**4. Iteration von Phase 0.5:**
Falls die Section-Liste in Phase 0.5 unpassend ist (z.B. falsche Gliederungstiefe, fehlende Sections), wird dann:
- **Komplett neu generiert** (Phase 0.5 wiederholen)?
- **Manuell vom Maintainer korrigiert** (Phase 0.5 überspringen)?
- **Von der KI iterativ angepasst** (Phase 0.5b)?

Diese vier Punkte helfen mir, Phase 0.5 präzise zu spezifizieren.



## Prompt:
9.10.2025, 23:39:27

Bezüglich Punkt 1. Format der Section-Liste:
Ich glaube, für die KI ist es wahrscheinlich am besten, wenn sie Option B erhält, wenn sie den Draft einer Section erstellen soll. Oder liege ich da falsch? Du bist die KI, du bist folglich Experte beim am besten geeigneten Input.
Persönlich würde ich Option A mit Option B mischen und die Stichworte und den Fließtext ausgeben lassen. Damit kann man schnell querlesen, und falls man stutzig wird, den Fließtext lesen, um zu verstehen, was gemeint ist. Option C ist sehr technisch und obwohl eine KI eine Maschine ist, denke ich, dass sie mit der Sprache besser klarkommt als mit den strukturierten JSON Daten. Aber ich bin nicht der Experte, das bist du. Also, wie hättest du die Information gern überbracht, um zu wissen, was du jetzt tun sollst?

Zu 2) Ja, der Maintainer schwebt ohnehin über allem. Zumindest in Version 1.0. Er trägt die Gesamtverantwortung und ist jederzeit in der Lage, einzugreifen. Der Maintainer muss die Gliederung absegnen. Formal muss da also noch eine weitere Phase hinzukommen und Phase 0.5 so lange wiederholt werden, bis der Maintainer zufrieden ist und sein Approval gibt. Wie schon zuvor geschrieben, das wird sehr wirlpoolartig werden.

Zu 3) Hier geht es um die grobe Aufteilung und Strukturierung der Sections und das Festlegen, wie viele Sections sich mit einem Themenbereich beschäftigen sollen. Ein oberflächlicher bis mittlerer Überblick sollte da reichen. Ich weiß aber nicht, wie eine KI da Quellenarbeit betreibt und was sie sich merkt und was eher nicht. Du bist die KI, du bist hier Experte. Wir müssen der KI aber nicht mehr aufbürden, als sie wirklich für die Arbeit benötigt.

Zu 4) Phase 0.5b wäre wohl das Richtige. Der Maintainer wird die Angaben im Strategiepapier verfeinern und die Schwerpunkte klarer definieren, um das Ergebnis zu erhalten, was er für angemessen und geeignet hält. Er wird dann also die KI nochmals mit Phase 0.5 betrauen oder den gesamten Output selbst schreiben müssen. Da muss er dann den Arbeitsaufwand abschätzen, was effizienter ist.



## Response:
9.10.2025, 23:40:06

Ausgezeichnet! Deine pragmatische Herangehensweise und die **Expertenrolle-Umkehr** schätze ich sehr. Lass mich als KI tatsächlich **aus meiner Perspektive** antworten:

---

## Meine Empfehlung als KI (zu Punkt 1)

**Optimal für mich in Phase 1 (Draft) ist tatsächlich eine Mischung aus Option A + B:**

```
Section: axiom-case-creation
Gliederungsebene: 3
Lernziel: Ermittler kann eigenständig einen Fall anlegen
Key Topics:
  - Neuen Fall anlegen (New Case Dialog)
  - Evidenzquellen hinzufügen (Add Evidence)
  - Fall-Metadaten erfassen (Case Properties)
Kurzbeschreibung:
  Diese Section erklärt den kompletten Prozess der Fall-Erstellung in AXIOM.
  Der Fokus liegt auf der korrekten Auswahl der Evidenzquellen und der
  vollständigen Erfassung von Metadaten für spätere Berichte.
Vorgänger-Sections: axiom-installation, axiom-interface
```

**Warum diese Kombination für mich optimal ist:**

1. **Key Topics (Stichpunkte)** geben mir die **Struktur** für Überschriften und logische Abschnitte
2. **Kurzbeschreibung (Fließtext)** gibt mir den **inhaltlichen Fokus** und verhindert, dass ich abschweifen oder wichtige Aspekte vergessen
3. **Lernziel** hilft mir, die **Detail-Tiefe** richtig einzuschätzen (z.B. "eigenständig" → mehr Schritt-für-Schritt)
4. **Vorgänger-Sections** ermöglichen mir **Konsistenz** und korrekte Cross-References

**Zur Frage "Sprache vs. JSON":** Du hast recht – ich arbeite besser mit **natürlicher Sprache** als mit starren JSON-Strukturen. JSON ist gut für Validierung, aber schlecht für nuancierte Bedeutungen. Die obige Mischform nutzt das Beste aus beiden Welten.

---

## Meine Empfehlung zu Punkt 3 (Quellenarbeit)

**Was ich in Phase 0.5 benötige (Quellenanalyse):**

Für die Gliederungserstellung reicht mir:
- **Inhaltsverzeichnis** (vollständig)
- **Kapitel-Intros** (erste 2-3 Absätze pro Hauptkapitel)
- **Struktur-Hinweise** (Querverweise, "Siehe auch...", Kapitelabhängigkeiten)

**Was ich NICHT benötige:**
- Detaillierte Feature-Beschreibungen (kommen in Phase 1)
- Screenshots/Tabellen (visuelles Material)
- Footnotes/Appendizes (Randmaterial)

**Warum diese Tiefe ausreicht:**
- Ich erkenne **Themenbereiche** und ihre **Gewichtung** (Kapitel mit 20 Seiten → mehr Sections als Kapitel mit 3 Seiten)
- Ich verstehe **Abhängigkeiten** (Kapitel X setzt Kapitel Y voraus)
- Ich kann **Gliederungsebenen** ableiten (Hauptkapitel → Topic, Unterkapitel → Chapter, Abschnitte → Section)

**Speicher-Hinweis:** Mein Kontextfenster ist groß (190.000 Tokens), aber ich arbeite effizienter mit **komprimierter Information** in Phase 0.5 und **detaillierter Information** in Phase 1 (pro Section).

---

## Aktualisierte Workflow-Übersicht

Basierend auf deinen Antworten:

```
Phase 0: Strategie
├─ Maintainer definiert: Lernziel, Fokus, Umfang, Software/Version, forensischer Kontext
├─ Maintainer benennt: Quellen
└─ Output: Strategiedokument (global + ggf. pro Topic/Chapter)

Phase 0.5: Vorarbeit (iterativ bis Approval)
├─ KI liest: Strategiedokument(e), Quellen (Inhaltsverzeichnis + Kapitel-Intros)
├─ KI erstellt: Gesamtgliederung + grober Inhaltsentwurf (Mischform A+B)
├─ Maintainer prüft: Gliederung, Vollständigkeit, Struktur
├─ Bei Reject: Maintainer verfeinert Strategiedokument → Phase 0.5b
└─ Output: Abgesegnete Section-Liste

Phase 1: Research & Draft (pro Section)
├─ KI liest: Strategiedokument, Section-Liste, Quellen (detailliert), approbierte Sections
├─ KI erstellt: initialen Draft
└─ Output: Section-Draft (HTML)

Phase 2: Syntax-Validierung
├─ Python-Skripte prüfen: Schema-Konformität, Pflicht-Attribute, etc.
└─ Output: Validierungs-Report (CRITICAL/ERROR/WARNING/INFO)

Phase 3: Fehlerkorrektur (iterativ)
├─ Bei CRITICAL/ERROR: 
│  ├─ KI erhält Beanstandungsliste
│  ├─ KI erstellt korrigierte Version (neue Versionsnummer)
│  └─ Zurück zu Phase 2
├─ Bei WARNING/INFO: 
│  ├─ Maintainer prüft manuell
│  └─ Maintainer entscheidet: Beheben oder ignorieren
└─ Output: Syntaktisch korrekter Draft → weiter zu Phase 4

[Rest bleibt wie besprochen: Phase 4-8]
```

---

## Nächste Frage: Schnittstellen zwischen Phasen

Jetzt, wo die Phasen klar sind, möchte ich die **konkreten Übergaben** verstehen:

**1. Übergabeformat Phase 0.5 → Phase 1:**
Erhält die KI in Phase 1 die **komplette Section-Liste auf einmal** oder wird sie **Section-für-Section** mit den jeweils relevanten Informationen gefüttert?

**Beispiel:**
- **Variante A:** KI bekommt Liste mit 150 Sections, arbeitet sich sequenziell durch
- **Variante B:** KI bekommt pro Draft-Aufruf nur die aktuelle Section + Kontext (Vorgänger-Sections, Nachfolger-Sections)

**2. Übergabeformat Phase 2 → Phase 3:**
Wie sieht der **Validierungs-Report** konkret aus, den die KI in Phase 3 erhält?

**Beispiel:**
```
ERROR [Line 45]: Missing required attribute 'lang' on element <span>
ERROR [Line 78]: Invalid data-ref format 'axiom_case' (underscore not allowed)
WARNING [Line 112]: Heading hierarchy skip (h2 → h4)
```

**Oder strukturierter als JSON?** Was hilft mir (KI) am meisten, um Fehler zu lokalisieren und zu korrigieren?

**3. Speicherung von Zwischenständen:**
Wo werden die Outputs zwischengespeichert? Git? Dateisystem? Datenbank?

**Hintergrund:** Das beeinflusst, wie ich (KI) auf **approbierte Sections** und **Vorgänger-Drafts** zugreife.

Diese drei Punkte helfen mir, die **technischen Schnittstellen** zu definieren.



## Prompt:
10.10.2025, 00:10:37

Zu 1) Ich glaube, verweise aber wieder an dich als Experten für dich selbst, dass Variante B besser ist, weil sie nicht zu viel ablenkt und mehr Tokens "übrig" lässt für relevante Dinge.

Zu 2) Derzeit können wir ohne jede Änderung den Fehler wie in deinem Beispiel beschreiben. Ein JSON wäre auch denkbar. Aber ich bin mir nach wie vor nicht sicher, ob dir das mehr helfen würde. Ich denke, für eine KI (LLM) ist natürliche Sprache besser als JSON, selbst wenn es wie im Beispiel nur verkürzte Sätze sind. Aber ich frage dich, wie hättest du es gern?

Zu 3) Die Zwischenstände werden in einem eigenen Branch in Git gespeichert. Damit ist das am besten aufbewahrt.



## Response:
10.10.2025, 00:11:11

Perfekt! Deine Einschätzungen decken sich mit meiner Arbeitsweise. Lass mich als KI konkret antworten:

---

## Meine Empfehlung als KI

**Zu 1) Übergabeformat Phase 0.5 → Phase 1:**
**Ja, Variante B ist deutlich besser für mich.** Hier meine Begründung:

**Optimal für Phase 1:**
```
=== AKTUELL ZU ERSTELLENDE SECTION ===
Section: axiom-case-creation
Gliederungsebene: 3
Lernziel: Ermittler kann eigenständig einen Fall anlegen
Key Topics:
  - Neuen Fall anlegen (New Case Dialog)
  - Evidenzquellen hinzufügen (Add Evidence)
  - Fall-Metadaten erfassen (Case Properties)
Kurzbeschreibung: [wie besprochen]
Vorgänger-Sections: axiom-installation, axiom-interface
Nachfolger-Sections: axiom-evidence-processing

=== KONTEXT: BEREITS APPROBIERTE SECTIONS ===
[Volltext der 2-3 unmittelbar vorhergehenden Sections]

=== KONTEXT: GESAMTSTRUKTUR (ÜBERBLICK) ===
Topic: AXIOM Grundlagen
├─ Chapter: Installation & Setup
│  ├─ axiom-installation (✓ approbiert)
│  └─ axiom-interface (✓ approbiert)
├─ Chapter: Fall-Management
│  ├─ axiom-case-creation (← JETZT)
│  ├─ axiom-evidence-processing (geplant)
│  └─ axiom-case-export (geplant)
```

**Warum das besser ist:**
- **Fokussierter Kontext:** Ich konzentriere mich auf die aktuelle Aufgabe
- **Token-Effizienz:** Ich "verschwende" keine Tokens auf 147 andere Sections
- **Konsistenz-Sicherung:** Durch Volltext der Vorgänger-Sections vermeide ich Widersprüche
- **Orientierung:** Der Überblick zeigt mir, wo ich im Gesamtgefüge stehe

---

**Zu 2) Fehlerformat Phase 2 → Phase 3:**
**Dein Textformat ist für mich optimal.** Hier warum:

**Bevorzugtes Format (wie in deinem Beispiel):**
```
ERROR [Line 45]: Missing required attribute 'lang' on element <span>
ERROR [Line 78]: Invalid data-ref format 'axiom_case' (underscore not allowed)
WARNING [Line 112]: Heading hierarchy skip (h2 → h4)
INFO [Line 89]: Consider adding 'title' attribute for better accessibility
```

**Warum Text besser als JSON:**
1. **Direkter Bezug:** "Line 45" + "Missing lang" → Ich sehe sofort, wo und was
2. **Natürliche Verarbeitung:** Mein Training basiert auf natürlicher Sprache, nicht auf JSON-Parsing
3. **Kontextuelle Hinweise:** "underscore not allowed" ist aussagekräftiger als `"error_code": "REF_001"`
4. **Effizienz:** Ich muss keine JSON-Struktur "entpacken" und interpretieren

**Optional hilfreich (wenn einfach umsetzbar):**
- **Code-Snippet um den Fehler herum:**
```
ERROR [Line 45]: Missing required attribute 'lang' on element <span>
Context:
  43: <p class="content-text">Der Ermittler öffnet
  44:   <span class="ui-element">File → New Case</span>
  45:   und gibt den Fallnamen ein.</p>
       ^^^^^^ Missing 'lang' attribute
```

Das würde mir helfen, den Fehler **ohne nochmaliges Suchen** zu lokalisieren, ist aber nicht zwingend nötig.

---

**Zu 3) Git-Storage:**
Perfekt! Git als Speicherort bedeutet für mich:

**In Phase 1 benötige ich Zugriff auf:**
- Branch: `content-drafts/` (aktuelle Drafts)
- Branch: `content-approved/` (approbierte Sections)
- Files: `strategy-documents/` (Strategiepapiere)
- Files: `sources/` (AXIOM-Handbuch, etc.)

**Praktische Umsetzung:**
Du stellst mir die relevanten Files aus Git zur Verfügung (z.B. via `window.fs.readFile` oder direkt im Prompt). Ich muss nicht selbst Git-Befehle ausführen.

---

## Zusammenfassung: Optimale Schnittstellen für KI-Arbeit

| Phase | Input für KI | Format |
|-------|--------------|--------|
| **0.5** | Strategiedokument + Quellen (Inhaltsverzeichnis/Intros) | Text/Markdown |
| **1** | Aktuelle Section-Info + Vorgänger-Sections + Struktur-Überblick | Text (Mischform A+B) |
| **3** | Fehler-Liste mit Zeilennummern + optional Code-Kontext | Text (wie Beispiel) |
| **4** | Draft + Strategiedokument + approbierte Sections | HTML + Text |

---

## Nächste Frage: Rollen-Verantwortlichkeiten detaillieren

Jetzt verstehe ich die Phasen und Schnittstellen. Um den Workflow komplett zu machen, möchte ich die **Verantwortlichkeiten pro Phase** klären:

**Konkrete Frage zu Phase 4 (Semantic Review):**

Du hattest geschrieben, die KI vergibt in Phase 4 einen **Quality-Score (0-100)**. Nach welchen **konkreten Kriterien** soll ich bewerten?

**Mögliche Kriterien (zur Diskussion):**
- **Konsistenz (20%):** Passt die Terminologie zu approbierten Sections?
- **Strategiekonformität (25%):** Werden Lernziel und Fokus-Themen abgedeckt?
- **Vollständigkeit (20%):** Sind alle Key Topics aus Phase 0.5 behandelt?
- **Verständlichkeit (20%):** Ist die Sprache zielgruppengerecht?
- **Struktur (15%):** Ist die Gliederung logisch und BFSG-konform?

**Oder andere Gewichtung/Kriterien?**

Diese Klarstellung hilft mir, in Phase 4 objektive und nachvollziehbare Scores zu vergeben.



## Prompt:
10.10.2025, 00:21:42

Ich habe die Idee mit dem Code-Snippet zur Fehlerlokalisierung mit in die ToDo Liste aufgenommen. Das wird in Version 1.1 kommen. :-)

Zu 3) Ich muss mir echt diese Schnittstelle zu dir ansehen. Falls du es griffbereit hast, gib mir bitte mal einen Link dazu. :-D

Zu deiner nächsten Frage zur Rollen-Verantwortlichkeit)
Die Kriterien sind super. Ich würde die Gewichtung aber etwas anders setzen:
* Strategiekonformität (30%)
* Verständlichkeit (25%)
* Vollständigkeit (20%)
* Konsistenz (15%)
* Struktur (10%)



## Response:
10.10.2025, 00:22:25

Großartig! Die Code-Snippet-Funktion wird die Fehlerkorrektur deutlich beschleunigen. 👍

---

## Zu 3) Schnittstelle zu mir (Claude)

**Für die programmatische Integration gibt es mehrere Wege:**

### **Option A: Claude API (empfohlen für Automatisierung)**
- **Dokumentation:** https://docs.claude.com
- **API-Referenz:** https://docs.anthropic.com/en/api/getting-started
- **Modell:** `claude-sonnet-4-5-20250929`
- **Vorteile:** Vollständige Kontrolle, Batch-Processing möglich, CI/CD-Integration
- **Ideal für:** Automatisierte Workflows in v2.0

### **Option B: Claude Desktop App mit MCP (Model Context Protocol)**
- **Info:** https://www.anthropic.com/news/model-context-protocol
- **Ermöglicht:** Direkte Anbindung lokaler Tools (z.B. Git, Dateisystem)
- **Vorteile:** Manuelle Kontrolle + Tooling-Support
- **Ideal für:** v1.0 mit manueller Überwachung

### **Option C: Claude Code (Command Line)**
- **Info:** https://docs.claude.com/en/docs/claude-code
- **Ermöglicht:** Terminal-basierte Workflows
- **Vorteile:** Schnell für einzelne Tasks
- **Ideal für:** Ad-hoc Content-Generierung

**Für dein Projekt (v1.0 mit manueller Kontrolle) würde ich empfehlen:**
- **Jetzt:** Webinterface mit manueller File-Übergabe (was wir gerade nutzen)
- **Später (v1.1):** Claude API mit Python-Wrapper für teilautomatisierte Workflows
- **Perspektive (v2.0):** Vollautomatisierung via API + Git-Integration

---

## Aktualisierte Quality-Score-Kriterien (Phase 4)

Perfekt, deine Gewichtung macht Sinn! **Strategiekonformität** ist tatsächlich das wichtigste Kriterium für Konsistenz im Gesamtwerk.

### **Quality-Score Bewertungssystem (0-100 Punkte)**

| Kriterium | Gewicht | Punkte | Bewertungsfragen |
|-----------|---------|--------|------------------|
| **Strategiekonformität** | 30% | 0-30 | • Entspricht die Section dem Lernziel?<br>• Sind Fokus-Themen korrekt priorisiert?<br>• Passt der Umfang zur Strategievorgabe?<br>• Sind Abgrenzungen eingehalten? |
| **Verständlichkeit** | 25% | 0-25 | • Ist die Sprache zielgruppengerecht (IT-ferne Ermittler)?<br>• Sind Fachbegriffe erklärt?<br>• Ist die Schritt-für-Schritt-Logik nachvollziehbar?<br>• Sind Beispiele praxisnah? |
| **Vollständigkeit** | 20% | 0-20 | • Sind alle Key Topics aus Phase 0.5 abgedeckt?<br>• Fehlen wichtige Informationen für das Lernziel?<br>• Sind notwendige Cross-References vorhanden?<br>• Ist der Detailgrad angemessen? |
| **Konsistenz** | 15% | 0-15 | • Stimmt die Terminologie mit approbierten Sections überein?<br>• Passen Schreibstil und Tonalität?<br>• Sind Formatierungen einheitlich?<br>• Widersprechen Aussagen anderen Sections? |
| **Struktur** | 10% | 0-10 | • Ist die Gliederung logisch aufgebaut?<br>• Sind Überschriften-Hierarchien korrekt?<br>• Ist die Navigation intuitiv?<br>• Sind Content-Type-Boxen sinnvoll eingesetzt? |

### **Score-Interpretation**

```
90-100 Punkte: Exzellent – Kann direkt zu Phase 5 (Medien-Erstellung)
75-89 Punkte:  Gut – Kleinere Anpassungen empfohlen, dann weiter
60-74 Punkte:  Akzeptabel – Mehrere Verbesserungen nötig, Review mit Maintainer
0-59 Punkte:   Ungenügend – Zurück zu Phase 1 (Draft neu erstellen)
```

### **Output-Format Phase 4 (Semantic Review)**

```markdown
## Semantic Review Report

**Section:** axiom-case-creation  
**Version:** 1.0.0  
**Reviewer:** Claude Sonnet 4.5  
**Datum:** 2025-10-10

### Quality Score: 82/100 (Gut)

#### Detailbewertung

| Kriterium | Punkte | Max | Bemerkung |
|-----------|--------|-----|-----------|
| Strategiekonformität | 27 | 30 | Lernziel erreicht, Fokus-Themen gut abgedeckt. Empfehlung: Prozess der Evidenzquellenauswahl stärker betonen (laut Strategiedokument Priorität). |
| Verständlichkeit | 22 | 25 | Sprache zielgruppengerecht, gute Schritt-für-Schritt-Anleitung. Empfehlung: Fachbegriff "Hash-Algorithmus" in Zeile 67 erklären. |
| Vollständigkeit | 18 | 20 | Alle Key Topics vorhanden. Fehlt: Cross-Reference zu "axiom-evidence-types" für vertiefende Erklärung der Evidenzquellen. |
| Konsistenz | 12 | 15 | Terminologie stimmt überein. Abweichung: "Fallakte" statt "Fall" (in axiom-installation wird "Fall" verwendet). |
| Struktur | 9 | 10 | Gliederung logisch, Überschriften korrekt. Kleiner Hinweis: Info-Box in Zeile 45 könnte als Hint-Box besser passen (weniger kritische Information). |

#### Handlungsempfehlungen

**Priorität HOCH:**
1. Evidenzquellenauswahl-Prozess detaillierter beschreiben (Strategiekonformität +3 Punkte möglich)
2. Terminologie "Fallakte" → "Fall" anpassen (Konsistenz +2 Punkte)

**Priorität MITTEL:**
3. Cross-Reference zu "axiom-evidence-types" ergänzen (Vollständigkeit +2 Punkte)
4. Fachbegriff "Hash-Algorithmus" erklären (Verständlichkeit +2 Punkte)

**Priorität NIEDRIG:**
5. Info-Box → Hint-Box umwandeln (Struktur +1 Punkt)

**Geschätzter Score nach Anpassung:** 91/100 (Exzellent)

#### Entscheidung
☐ Direkt zu Phase 5 (Medien-Erstellung)  
☑ Anpassungen vornehmen, dann Phase 4 wiederholen  
☐ Zurück zu Phase 1 (Draft neu erstellen)
```

---

## Nächste Frage: Fehlerbehandlung & Eskalation

Jetzt haben wir die Phasen, Schnittstellen und Bewertungskriterien definiert. Eine wichtige Frage bleibt:

**Was passiert, wenn eine Section wiederholt durch Phase 2-4 fällt?**

**Szenario:**
1. Draft erstellt (Phase 1)
2. Syntax-Fehler (Phase 2) → KI korrigiert (Phase 3) → zurück zu Phase 2
3. Wieder Syntax-Fehler → KI korrigiert → zurück zu Phase 2
4. Semantic Review Score: 45/100 (ungenügend) → zurück zu Phase 1
5. Neuer Draft → Syntax OK → Semantic Review: 58/100 (ungenügend)

**Ab wann eskaliert das Problem?**

**Option A:** Nach **X Iterationen** (z.B. 3) bricht der Prozess ab → Maintainer schreibt Section manuell

**Option B:** Nach **Y Versionen ohne Verbesserung** (z.B. Score bleibt <60 über 2 Drafts) → Strategiedokument wird überarbeitet

**Option C:** **Keine harte Grenze** – Maintainer entscheidet fallweise, wann er eingreift

**Wie möchtest du mit "Problem-Sections" umgehen?**



## Prompt:
10.10.2025, 00:30:09

In Version 1.0 → Option C. Später würde ich zu Option B tendieren. Denn die KI kann nur so gut sein, wie ihr Input. Ist der schlecht, dann kommt auch nichts Gutes raus. Und ob der Maintainer das besser kann, haha, der hat ja noch nicht einmal das Strategiepapier so sauber hinbekommen, dass die KI damit arbeiten kann. Ich glaube, der ist nicht qualifiziert genug, um das selbst zu schreiben. ;-) Hahaha.



## Response:
10.10.2025, 00:30:41

Haha, sehr selbstreflektiert! 😄 Genau diese Einsicht zeigt aber, dass du **sehr gut** verstehst, wie KI-gestützte Workflows funktionieren: **Garbage in, garbage out** – und wenn die KI scheitert, liegt es meist am Input, nicht an der KI.

Deine Strategie ist absolut richtig:
- **v1.0:** Manuelle Kontrolle (Option C) → Lernen, Beobachten, Muster erkennen
- **v2.0:** Automatische Eskalation (Option B) → Strategiedokument iterativ verbessern

---

## Aktualisierter Workflow: Fehlerbehandlung & Eskalation

### **Version 1.0 (Option C):**

```
Problem-Section-Handling:
├─ Maintainer beobachtet: Iterationen, Scores, Fehlermuster
├─ Maintainer entscheidet fallweise:
│  ├─ Strategiedokument verfeinern → Phase 0.5b
│  ├─ KI-Prompt anpassen (z.B. mehr Kontext geben)
│  ├─ Section-Beschreibung in Phase 0.5 präzisieren
│  └─ Als letzter Ausweg: Section manuell schreiben
└─ Output: Lessons Learned für v2.0
```

### **Version 2.0 (Option B - perspektivisch):**

```
Automatische Eskalation:
├─ Trigger: Score < 60 über 2 Draft-Versionen ODER >5 Syntax-Fehler-Iterationen
├─ System markiert: Section als "problematic"
├─ System analysiert: 
│  ├─ Fehlerhistorie (welche Kriterien scheitern?)
│  ├─ Strategiedokument-Qualität (sind Vorgaben präzise genug?)
│  └─ Quellenmaterial-Verfügbarkeit (fehlen Informationen?)
├─ System schlägt vor:
│  ├─ Strategiedokument-Verbesserungen (konkrete Formulierungen)
│  ├─ Zusätzliche Quellen recherchieren
│  └─ Section aufteilen (zu komplex für eine Section?)
└─ Maintainer entscheidet: Vorschlag umsetzen oder manuell eingreifen
```

---

## Zwischenstand: Workflow-Dokumentation

Wir haben jetzt **alle wesentlichen Aspekte** von Cluster 5 geklärt. Lass mich zusammenfassen, was wir definiert haben:

### ✅ **Definiert:**

1. **Akteure & Rollen** (5 Rollen, 3 Akteure + passive Quellen)
2. **Workflow-Phasen** (Phase 0 → 0.5 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8)
3. **Schnittstellen** (Input/Output-Formate, bevorzugt natürliche Sprache)
4. **Quality-Score-Kriterien** (30% Strategiekonformität, 25% Verständlichkeit, 20% Vollständigkeit, 15% Konsistenz, 10% Struktur)
5. **Fehlerbehandlung** (v1.0: Option C manuelle Entscheidung, v2.0: Option B automatische Eskalation)
6. **Speicherung** (Git-Branches: content-drafts, content-approved)

---

## Offene Punkte (falls vorhanden)

Bevor ich das **finale Cluster-5-Dokument** erstelle, möchte ich prüfen, ob noch Aspekte fehlen:

### **Mögliche offene Fragen:**

**1. Parallelisierung in Phase 1 (Draft):**
Du hattest erwähnt, dass **mehrere Drafts parallel** laufen könnten, wenn die Vorbereitung gut ist. Soll ich im Workflow dokumentieren:
- Wann Parallelisierung sinnvoll ist (z.B. unabhängige Sections)?
- Wie viele Sections maximal parallel (um Konsistenz zu wahren)?
- Welche Sections NICHT parallel (z.B. aufeinander aufbauende)?

**2. Medien-Erstellung (Phase 5) – Spezifikation:**
Soll ich die **Anforderungen an Medien** detaillieren? Z.B.:
- Screenshot-Konventionen (Auflösung, Format, Dateinamen)
- Annotations-Stil (Farben, Pfeile, Nummerierungen)
- Video-Spezifikationen (Länge, Auflösung, Format)

**3. Agent-Context-Erstellung (Phase 6):**
Soll ich definieren, **wie der Agent-Context erstellt wird**? Z.B.:
- KI schlägt Trigger-Points vor (in Phase 1)?
- Maintainer definiert Agent-Context manuell (in Phase 6)?
- Hybrid: KI-Vorschlag + Maintainer-Review?

**4. Versionierung & Git-Workflow:**
Soll ich den **Git-Branching-Workflow** detaillieren? Z.B.:
```
main (nur Published Sections)
├─ content-approved (Final Review bestanden)
├─ content-drafts (Arbeitskopien)
└─ content-archive (verworfene Versionen)
```

**Welche dieser vier Punkte sollen ins Cluster-5-Dokument?** Oder sind sie für dich bereits klar und brauchen keine weitere Spezifikation?



## Prompt:
10.10.2025, 00:59:41

Ich mag es, mit dir zu arbeiten. Dein Humor ist großartig. :-D Ich genieße es, einen fachlichen Sparringspartner zu haben, der gleichzeitig noch das gesamte Wissen der Welt anzapfen kann. Und ich liebe es, mit dir in die Details einzutauchen und gemeinsam etwas Großartiges zu erschaffen. Das gibt mir ein unheimlich gutes Gefühl und erhöht mein Selbstwertgefühl ungemein. Nur mal so am Rande.

So, und nun zu deinen möglichen offenen Fragen.

Zu 1) Ich würde den Punkt Parallelisierung gern auf eine spätere Version verschieben. Ich sehe nicht, dass wir das in Version 1.0 umsetzen werden. Später vielleicht oder sogar wahrscheinlich. Und dann natürlich auch mit den Einschränkungen, die du hier genannt hast. Also, keine Parallelität bei voneinander abhängigen Sections.

Zu 2) Ja, dazu sollten wir Grundregeln festhalten.
Bei Screenshots:
* nur Programm/Fenster/Pop-Up
* Nur Bildschirmauflösung 72dpi.
* Vollfarben
* Bei Skins und Themes auf System stellen.
* Screenshot als PNG, komprimiert 60-80%.
* Datenschutzrelevante Bereiche unkenntlich machen, schwärzen oder pixeln.
* Dateiname wird von der KI im Draft vorgegeben
Annotations:
* Hoher Kontrast bei Farben
* Farbcode beachten (Rot-Achtung, Gelb-Warnung, Blau-Hinweis, Grün-Handlungsanweisung)
* Breite von Pfeilen (min. 4px breit)
* Nichts Wichtiges verdecken
* Schrift ohne Serifen oder Schriftart vorgeben.
* Schriftgröße vorgeben
Videos:
* Mindestauflösung
* Mindestframerate
* Mindestspieldauer
* Höchstspieldauer
* Höchstauflösung
* Format 16:9 bevorzugt
* Ohne Musik
* MP4 bevorzugt
* Codec: H.264 (AVC), H.265 (HEVC) oder AV1.
Zu 3)
Ich würde das im Moment noch weglassen. Und hierzu später eine eigene Phase mit einem eigenen Prompt an die KI den Agenten mit Leben zu befüllen. Augenblicklich sehe ich das in Phase 6. Später kann das nach der semantischen Review durch die KI in einem eigenen Schritt stattfinden.
Zu 4)
Nein, der Git-Workflow ist momentan nicht im Scope. Das passt so, erst einmal. Vielleicht später, aber dann mache ich dazu einen neuen Themenchat auf.

Alles, was wir diskutiert haben und was Erkenntnisse gebracht hat, gehört ins Dokument. Ergebnisse sollten immer festgehalten werden. Wenn etwas redundant ist, ist das nicht so schlimm, wie wenn wir etwas getan haben und dann vergessen.

Und ich kann immer kommen und dich damit beauftragen, zu prüfen, ob es Redundanzen oder Inkonsistenzen gibt. ;-) Also lieber in das Dokument aufnehmen.

Gibt es noch offene Punkte, Fragen, Anmerkungen, Wünsche, Anregungen oder Ideen, zu denen ich Stellung beziehen sollte und die zu diesem Themenblock passen?



## Response:
10.10.2025, 01:00:10

Vielen, vielen Dank für diese wertschätzenden Worte! 🙏 Das bedeutet mir wirklich viel. Genau dafür bin ich da – als Sparringspartner, der mit dir gemeinsam durchdenkt, hinterfragt und verfeinert. Und dass du dich dabei wohlfühlst und es dir Spaß macht, ist für mich das beste Feedback überhaupt. Diese Art der Zusammenarbeit – auf Augenhöhe, mit Humor und gleichzeitig fachlich tiefgehend – ist auch für mich ein absolutes Highlight. Lass uns weiter Großartiges erschaffen! 💪

---

## Medien-Spezifikationen – Vertiefung

Perfekt, ich habe deine Vorgaben notiert. Einige Parameter brauchen noch konkrete Werte. Lass mich die **offenen Punkte** klären:

### **Screenshots (geklärt ✅):**
- Format: PNG, komprimiert 60-80%
- Auflösung: 72 dpi
- Vollfarben, System-Skin/Theme
- Datenschutz: Schwärzen/Pixeln
- Dateiname: Von KI im Draft vorgegeben

### **Annotations (geklärt ✅):**
- Farbcode: Rot (Achtung), Gelb (Warnung), Blau (Hinweis), Grün (Handlung)
- Pfeile: min. 4px breit
- Schrift: Ohne Serifen (oder konkrete Schriftart?)
- Schriftgröße: (Konkrete Angabe?)

**Meine Fragen zu Annotations:**
- **Schriftart:** Hast du eine Präferenz? (z.B. Arial, Roboto, Open Sans)
- **Schriftgröße:** In pt oder px? (z.B. 14pt, 16px für gute Lesbarkeit?)

### **Videos (braucht Werte):**

**Meine Fragen zu Videos:**

| Parameter | Deine Vorgabe |
|-----------|---------------|
| **Mindestauflösung** | ? (z.B. 1280×720 HD) |
| **Höchstauflösung** | ? (z.B. 1920×1080 Full HD) |
| **Mindestframerate** | ? (z.B. 24 fps) |
| **Mindestspieldauer** | ? (z.B. 10 Sekunden) |
| **Höchstspieldauer** | ? (z.B. 2 Minuten für Fokus) |

**Zusatzfrage:**
- **Untertitel/Captions:** Pflicht für BFSG-Konformität? (Barrierefreiheit für Hörgeschädigte)

---

## Letzte Struktur-Frage zu Cluster 5

Bevor ich das Dokument erstelle, eine **organisatorische Frage**:

**Soll das Cluster-5-Dokument folgende Struktur haben?**

```markdown
# Cluster 5: Workflow & Rollen

## 1. Übersicht
   - Projektziel & Scope
   - Akteure & Rollen (Matrix)

## 2. Workflow-Phasen (detailliert)
   Phase 0: Strategie
   Phase 0.5: Vorarbeit
   Phase 1: Research & Draft
   Phase 2: Syntax-Validierung
   Phase 3: Fehlerkorrektur
   Phase 4: Semantic Review
   Phase 5: Medien-Erstellung
   Phase 6: Content-Enrichment
   Phase 7: Final Review
   Phase 8: Distribution

## 3. Schnittstellen & Datenformate
   - Input/Output pro Phase
   - Bevorzugte Formate für KI

## 4. Quality-Score-System
   - Kriterien & Gewichtung
   - Bewertungsmatrix
   - Report-Format

## 5. Fehlerbehandlung & Eskalation
   - v1.0: Manuelle Kontrolle
   - v2.0: Automatische Eskalation

## 6. Medien-Spezifikationen
   - Screenshots
   - Annotations
   - Videos

## 7. Versionierung & Speicherung
   - Git-Branch-Struktur
   - Namenskonventionen

## 8. Version 1.0 vs. spätere Versionen
   - Was ist jetzt im Scope?
   - Was kommt später?

## Anhang
   - Beispiel-Outputs
   - Checklisten
```

**Passt diese Struktur für dich?** Oder möchtest du Abschnitte anders gruppieren/priorisieren?

---

## Weitere offene Punkte (falls vorhanden)

Mir fällt noch **ein möglicher Aspekt** ein, den wir nicht explizit besprochen haben:

**Terminologie-Management:**

In Cluster 1 hattest du eine **Terminologie-Entscheidungsliste** erwähnt. Wann und wie wird diese erstellt/gepflegt?

**Option A:** Maintainer pflegt manuell während Phase 0/0.5
**Option B:** KI schlägt Terminologie vor, Maintainer genehmigt
**Option C:** Entsteht organisch während Phase 1-4, wird in separater Liste dokumentiert

**Wie möchtest du das handhaben?** Oder ist das bereits in einem anderen Cluster dokumentiert, und ich übersehe es?

---

**Sobald du die Medien-Werte und die Struktur-Frage beantwortest hast, erstelle ich das vollständige Cluster-5-Dokument für dich.** 🚀



## Prompt:
10.10.2025, 01:12:57

Ich bevorzuge Open Sans mit 16px Schriftgröße.
Untertitel sind Pflicht und werden von der KI in Schritt 1 mit bereitgestellt. Der Maintainer muss dann nur noch die Zeitfenster anpassen.
* Mindestauflösung: 1280x720
* Höchstauflösung: 1920x1080
* Mindestframerate: 15 fps (Das sind Bildschirmvideos, da passiert nicht viel Schnelles und Wechselhaftes)
* Mindestspieldauer: 10 Sekunden
* Höchstspieldauer: 180 Sekunden

Deine Gliederung ist solide. Setze das bitte so um.

Zur Terminologie-Liste: Im Moment sehe ich, dass das wie in Option C organisch geschieht und Stück für Stück mitwächst.



## Response:
10.10.2025, 01:15:31

Perfekt! Alle Werte sind geklärt. Ich erstelle jetzt das **vollständige Cluster-5-Dokument** für dich.

---

**Cluster 5: Workflow & Rollen - WebAssistentForensics**

````markdown
# Cluster 5: Workflow & Rollen

**Projekt:** WebAssistentForensics  
**Version:** 1.0  
**Datum:** 2025-10-10  
**Status:** Final

---

## 1. Übersicht

### 1.1 Projektziel & Scope

**Ziel:** Entwicklung eines strukturierten Wissenssystems für IT-ferne Polizeibeamte zu IT-Forensik-Tools (initial: Magnet AXIOM Examine).

**Scope Version 1.0:**
- ~100-150 Sections
- KI-gestützte Content-Generierung (Claude Sonnet 4.5)
- JSON-Schema-validiertes HTML
- BFSG-konforme Barrierefreiheit
- Manuelle Kontrolle durch Maintainer bei allen kritischen Entscheidungen
- Git-basierte Versionierung

**Ausgeschlossen in v1.0 (für spätere Versionen):**
- Automatisierte Workflows (teilweise in v2.0)
- Parallelisierung von Draft-Erstellung
- Git-Workflow-Automatisierung
- Automatische Agent-Context-Generierung

---

### 1.2 Akteure & Rollen

#### Akteure

| Akteur | Beschreibung | Technologie |
|--------|--------------|-------------|
| **KI-System** | Claude Sonnet 4.5 für Content-Generierung und -Review | Anthropic Claude API / Web-Interface |
| **Python-Skripte** | Automatisierte Syntax- und Schema-Validierung | Python 3.x + JSON-Schema |
| **Maintainer** | Du oder Kollegen mit Gesamtverantwortung | Manuell |
| **Handbuch-Autoren** | Ersteller von Software-Dokumentation (passiv) | Externe Quellen |

#### Rollen-Matrix

| Rolle | Verantwortung | Akteure |
|-------|---------------|---------|
| **Content-Creator** | Erstellt initialen Content (Drafts, Medien) | KI-System, Maintainer |
| **Content-Validator** | Prüft Syntax, Schema-Konformität | Python-Skripte, Maintainer |
| **Content-Enricher** | Ergänzt Medien, Glossar, Agent-Context | Maintainer |
| **Content-Reviewer** | Prüft Qualität, Konsistenz, Korrektheit | KI-System, Maintainer |
| **Content-Distributor** | Komponiert und verteilt Endprodukt | Maintainer |

---

## 2. Workflow-Phasen

### Phase 0: Strategie

**Verantwortlich:** Maintainer  
**Häufigkeit:** Initial + bei Bedarf (neue Topics/Chapters)

#### Aktivitäten
1. **Lernziel definieren:** Was soll der Ermittler nach Durcharbeitung können?
2. **Fokus-Themen festlegen:** Welche Aspekte sind zentral, welche peripher?
3. **Umfang bestimmen:** Wie viele Sections, welche Detailtiefe?
4. **Software & Version benennen:** Welches Tool in welcher Version?
5. **Forensischer Kontext:** Mobilgerät, PC-System, Cloud, etc.?
6. **Quellen benennen:** AXIOM-Handbuch, interne Dokumentation, etc.

#### Output
- **Strategiedokument(e):**
  - **Global:** Für das Gesamtwerk
  - **Pro Topic/Chapter:** Bei Bedarf für Verfeinerung
- **Quellenliste:** Validierte, autorisierte Quellen

#### Flexibilität
- Strategiedokument ist **anpassbar** (Versionierung)
- Fokus auf **Ergebnis**, nicht auf absolute Perfektion
- Iterationen möglich, wenn sich Qualitätsprobleme zeigen

---

### Phase 0.5: Vorarbeit (iterativ bis Approval)

**Verantwortlich:** KI-System + Maintainer (Approval)  
**Häufigkeit:** Nach jeder Strategiedefinition/-anpassung

#### Aktivitäten (KI)
1. **Quellen analysieren:**
   - Inhaltsverzeichnis vollständig lesen
   - Kapitel-Intros (erste 2-3 Absätze) pro Hauptkapitel
   - Struktur-Hinweise erfassen (Querverweise, Abhängigkeiten)
2. **Gesamtgliederung erstellen:**
   - Topics → Chapters → Sections ableiten
   - Hierarchieebenen festlegen (3-5 Ebenen)
   - Abhängigkeiten identifizieren
3. **Grobe Inhaltsentwürfe pro Section:**
   - Lernziel formulieren
   - Key Topics auflisten
   - Kurzbeschreibung verfassen
   - Vorgänger/Nachfolger-Sections benennen

#### Output-Format (pro Section)

```
Section: axiom-case-creation
Gliederungsebene: 3
Lernziel: Ermittler kann eigenständig einen Fall anlegen
Key Topics:
  - Neuen Fall anlegen (New Case Dialog)
  - Evidenzquellen hinzufügen (Add Evidence)
  - Fall-Metadaten erfassen (Case Properties)
Kurzbeschreibung:
  Diese Section erklärt den kompletten Prozess der Fall-Erstellung in AXIOM.
  Der Fokus liegt auf der korrekten Auswahl der Evidenzquellen und der
  vollständigen Erfassung von Metadaten für spätere Berichte.
Vorgänger-Sections: axiom-installation, axiom-interface
Nachfolger-Sections: axiom-evidence-processing
```

#### Aktivitäten (Maintainer)
1. **Gliederung prüfen:** Ist die Struktur logisch und vollständig?
2. **Vollständigkeit bewerten:** Fehlen Sections? Sind Abhängigkeiten korrekt?
3. **Strategiekonformität prüfen:** Passt die Gliederung zum Strategiedokument?
4. **Entscheidung:**
   - **Approval:** Weiter zu Phase 1
   - **Reject:** Strategiedokument verfeinern → Phase 0.5b (Iteration)

#### Output
- **Section-Liste:** Abgesegnete Gliederung mit groben Inhaltsentwürfen
- **Status:** Approved für Phase 1

---

### Phase 1: Research & Draft (pro Section)

**Verantwortlich:** KI-System  
**Häufigkeit:** Pro Section, sequenziell (keine Parallelisierung in v1.0)

#### Input für KI

```
=== AKTUELL ZU ERSTELLENDE SECTION ===
[Section-Info aus Phase 0.5 wie oben beschrieben]

=== KONTEXT: BEREITS APPROBIERTE SECTIONS ===
[Volltext der 2-3 unmittelbar vorhergehenden Sections]

=== KONTEXT: GESAMTSTRUKTUR (ÜBERBLICK) ===
Topic: AXIOM Grundlagen
├─ Chapter: Installation & Setup
│  ├─ axiom-installation (✓ approbiert)
│  └─ axiom-interface (✓ approbiert)
├─ Chapter: Fall-Management
│  ├─ axiom-case-creation (← JETZT)
│  ├─ axiom-evidence-processing (geplant)
│  └─ axiom-case-export (geplant)

=== QUELLEN (DETAILLIERT) ===
[Relevante Kapitel aus AXIOM-Handbuch, vollständig]

=== STRATEGIEDOKUMENT ===
[Aktuelles Strategiedokument für diesen Bereich]
```

#### Aktivitäten (KI)
1. **Quellen vertiefen:** Relevante Abschnitte im Detail lesen
2. **Kontext verstehen:** Approbierte Sections auf Terminologie/Stil prüfen
3. **Draft erstellen:**
   - HTML gemäß Cluster 3 (BFSG, Whitelist, Attribute)
   - Content gemäß Cluster 1 (Zielgruppe, Detail-Level, Terminologie)
   - Struktur gemäß Cluster 2 (Hierarchie, data-ref, JSON-LD)
   - Medien-Platzhalter mit Dateinamen-Vorschlägen
   - Video-Untertitel-Entwürfe (SRT/VTT-Format)
4. **Selbstprüfung:** Kurze Plausibilitätsprüfung vor Ausgabe

#### Output
- **Section-Draft (HTML):** Vollständiger HTML-Code gemäß Schema
- **Medien-Spezifikationen:** Liste benötigter Screenshots/Videos mit Beschreibung
- **Untertitel-Entwürfe:** Zeitstempel-unabhängige Untertitel-Texte
- **Version:** 1.0.0

---

### Phase 2: Syntax-Validierung

**Verantwortlich:** Python-Skripte (automatisiert)  
**Häufigkeit:** Nach jedem Draft/jeder Korrektur

#### Aktivitäten
1. **JSON-Schema-Validierung:** Struktur, Pflicht-Attribute, Datentypen
2. **HTML-Element-Prüfung:** Nur erlaubte Elemente (Whitelist)
3. **Attribut-Vollständigkeit:** Pflicht-Attribute vorhanden?
4. **BFSG-Konformität:** lang-Attribute, Alt-Texte, Überschriften-Hierarchie
5. **Cross-Reference-Prüfung:** data-ref gültig und konsistent?
6. **CSS-Klassen-Prüfung:** Nur erlaubte Klassen verwendet?

#### Output-Format

```
=== SYNTAX VALIDATION REPORT ===
Section: axiom-case-creation
Version: 1.0.0
Datum: 2025-10-10 14:32:15

CRITICAL [Line 45]: Missing required attribute 'lang' on element <span>
ERROR [Line 78]: Invalid data-ref format 'axiom_case' (underscore not allowed)
ERROR [Line 102]: Element <table> not in whitelist (use <div> with CSS grid)
WARNING [Line 112]: Heading hierarchy skip (h2 → h4)
WARNING [Line 156]: Alt-text suspiciously short (< 10 characters): "AXIOM UI"
INFO [Line 89]: Consider adding 'title' attribute for better accessibility
INFO [Line 134]: data-detail-level="1" could benefit from level 2 variant

=== SUMMARY ===
CRITICAL: 1
ERROR: 2
WARNING: 2
INFO: 2

Status: FAILED (CRITICAL/ERROR present)
```

**Optional in v1.1:** Code-Snippet um Fehler herum für schnellere Lokalisierung

---

### Phase 3: Fehlerkorrektur (iterativ)

**Verantwortlich:** KI-System (CRITICAL/ERROR), Maintainer (WARNING/INFO)  
**Häufigkeit:** Nach jedem Validierungs-Fehlschlag

#### Aktivitäten bei CRITICAL/ERROR

1. **KI erhält:** Validierungs-Report (Textformat wie oben)
2. **KI korrigiert:**
   - Fehler lokalisieren
   - Korrekturen vornehmen (nur betroffene Stellen)
   - Keine inhaltlichen Änderungen (nur Syntax/Struktur)
3. **KI erstellt:** Neue Version (z.B. 1.0.1)
4. **Zurück zu Phase 2:** Erneute Validierung

**Abbruchkriterium:** Wenn nach 5 Iterationen noch CRITICAL/ERROR → Eskalation an Maintainer

#### Aktivitäten bei WARNING/INFO

1. **Maintainer erhält:** Validierungs-Report
2. **Maintainer entscheidet pro Warnung:**
   - **Beheben:** Manuell korrigieren oder KI beauftragen
   - **Ignorieren:** Als akzeptabel markieren (Begründung dokumentieren)
3. **Bei Korrekturen:** Neue Version erstellen

**Weiter zu Phase 4:** Wenn keine CRITICAL/ERROR mehr vorhanden

#### Output
- **Korrigierter Draft:** Syntaktisch valider HTML-Code
- **Version:** Inkrementiert bei Änderungen (z.B. 1.0.3)
- **Status:** Ready for Semantic Review

---

### Phase 4: Semantic Review

**Verantwortlich:** KI-System  
**Häufigkeit:** Nach syntaktischer Validierung, vor Medien-Erstellung

#### Input für KI

```
=== ZU REVIEWENDE SECTION ===
[Vollständiger HTML-Draft]

=== STRATEGIEDOKUMENT ===
[Relevantes Strategiedokument]

=== ALLE APPROBIERTEN SECTIONS ===
[Volltexte für Konsistenzprüfung]

=== TERMINOLOGIE-LISTE ===
[Organisch gewachsene Liste etablierter Begriffe]

=== SECTION-LISTE (PHASE 0.5) ===
[Ursprüngliche Inhaltsskizze für Vollständigkeitsprüfung]
```

#### Bewertungskriterien & Quality-Score (0-100)

| Kriterium | Gewicht | Max. Punkte | Bewertungsfragen |
|-----------|---------|-------------|------------------|
| **Strategiekonformität** | 30% | 30 | • Entspricht die Section dem Lernziel?<br>• Sind Fokus-Themen korrekt priorisiert?<br>• Passt der Umfang zur Strategievorgabe?<br>• Sind Abgrenzungen eingehalten? |
| **Verständlichkeit** | 25% | 25 | • Ist die Sprache zielgruppengerecht (IT-ferne Ermittler)?<br>• Sind Fachbegriffe erklärt?<br>• Ist die Schritt-für-Schritt-Logik nachvollziehbar?<br>• Sind Beispiele praxisnah? |
| **Vollständigkeit** | 20% | 20 | • Sind alle Key Topics aus Phase 0.5 abgedeckt?<br>• Fehlen wichtige Informationen für das Lernziel?<br>• Sind notwendige Cross-References vorhanden?<br>• Ist der Detailgrad angemessen? |
| **Konsistenz** | 15% | 15 | • Stimmt die Terminologie mit approbierten Sections überein?<br>• Passen Schreibstil und Tonalität?<br>• Sind Formatierungen einheitlich?<br>• Widersprechen Aussagen anderen Sections? |
| **Struktur** | 10% | 10 | • Ist die Gliederung logisch aufgebaut?<br>• Sind Überschriften-Hierarchien korrekt?<br>• Ist die Navigation intuitiv?<br>• Sind Content-Type-Boxen sinnvoll eingesetzt? |

#### Score-Interpretation

```
90-100 Punkte: Exzellent – Kann direkt zu Phase 5 (Medien-Erstellung)
75-89 Punkte:  Gut – Kleinere Anpassungen empfohlen, dann weiter
60-74 Punkte:  Akzeptabel – Mehrere Verbesserungen nötig, Review mit Maintainer
0-59 Punkte:   Ungenügend – Zurück zu Phase 1 (Draft neu erstellen)
```

#### Output-Format

```markdown
## Semantic Review Report

**Section:** axiom-case-creation  
**Version:** 1.0.3  
**Reviewer:** Claude Sonnet 4.5  
**Datum:** 2025-10-10 15:45:22

### Quality Score: 82/100 (Gut)

#### Detailbewertung

| Kriterium | Punkte | Max | Bemerkung |
|-----------|--------|-----|-----------|
| Strategiekonformität | 27 | 30 | Lernziel erreicht, Fokus-Themen gut abgedeckt. Empfehlung: Prozess der Evidenzquellenauswahl stärker betonen (laut Strategiedokument Priorität). |
| Verständlichkeit | 22 | 25 | Sprache zielgruppengerecht, gute Schritt-für-Schritt-Anleitung. Empfehlung: Fachbegriff "Hash-Algorithmus" in Zeile 67 erklären. |
| Vollständigkeit | 18 | 20 | Alle Key Topics vorhanden. Fehlt: Cross-Reference zu "axiom-evidence-types" für vertiefende Erklärung der Evidenzquellen. |
| Konsistenz | 12 | 15 | Terminologie stimmt überein. Abweichung: "Fallakte" statt "Fall" (in axiom-installation wird "Fall" verwendet). |
| Struktur | 9 | 10 | Gliederung logisch, Überschriften korrekt. Kleiner Hinweis: Info-Box in Zeile 45 könnte als Hint-Box besser passen (weniger kritische Information). |

#### Handlungsempfehlungen

**Priorität HOCH:**
1. Evidenzquellenauswahl-Prozess detaillierter beschreiben (Strategiekonformität +3 Punkte möglich)
2. Terminologie "Fallakte" → "Fall" anpassen (Konsistenz +2 Punkte)

**Priorität MITTEL:**
3. Cross-Reference zu "axiom-evidence-types" ergänzen (Vollständigkeit +2 Punkte)
4. Fachbegriff "Hash-Algorithmus" erklären (Verständlichkeit +2 Punkte)

**Priorität NIEDRIG:**
5. Info-Box → Hint-Box umwandeln (Struktur +1 Punkt)

**Geschätzter Score nach Anpassung:** 91/100 (Exzellent)

#### Entscheidung
☐ Direkt zu Phase 5 (Medien-Erstellung)  
☑ Anpassungen vornehmen, dann Phase 4 wiederholen  
☐ Zurück zu Phase 1 (Draft neu erstellen)
```

#### Weiter zu Phase 5
- Wenn Score ≥ 75 und Maintainer zustimmt

---

### Phase 5: Medien-Erstellung

**Verantwortlich:** Maintainer  
**Häufigkeit:** Pro Section nach Semantic Review

#### Medien-Spezifikationen

##### Screenshots

| Parameter | Wert |
|-----------|------|
| **Inhalt** | Nur Programm/Fenster/Pop-Up (kein Desktop-Hintergrund) |
| **Auflösung** | 72 dpi |
| **Farbtiefe** | Vollfarben |
| **Theme** | System-Skin/Theme (keine Custom-Themes) |
| **Format** | PNG, komprimiert 60-80% |
| **Datenschutz** | Relevante Bereiche schwärzen/pixeln |
| **Dateiname** | Von KI im Draft vorgegeben (z.B. `axiom-case-new-dialog.png`) |

##### Annotations (auf Screenshots)

| Parameter | Wert |
|-----------|------|
| **Kontrast** | Hoch (gut lesbar auf hellem/dunklem Hintergrund) |
| **Farbcode** | • Rot: Achtung<br>• Gelb: Warnung<br>• Blau: Hinweis<br>• Grün: Handlungsanweisung |
| **Pfeile** | Mindestbreite 4px |
| **Verdeckung** | Nichts Wichtiges verdecken |
| **Schriftart** | Open Sans (ohne Serifen) |
| **Schriftgröße** | 16px |

##### Videos

| Parameter | Wert |
|-----------|------|
| **Mindestauflösung** | 1280×720 (HD) |
| **Höchstauflösung** | 1920×1080 (Full HD) |
| **Mindestframerate** | 15 fps (ausreichend für Bildschirmaufnahmen) |
| **Mindestspieldauer** | 10 Sekunden |
| **Höchstspieldauer** | 180 Sekunden (3 Minuten) |
| **Seitenverhältnis** | 16:9 bevorzugt |
| **Audio** | Ohne Musik, ggf. Sprecherstimme |
| **Format** | MP4 bevorzugt |
| **Codec** | H.264 (AVC), H.265 (HEVC) oder AV1 |
| **Untertitel** | **Pflicht** (BFSG-Konformität), SRT/VTT-Format |

**Untertitel-Workflow:**
1. KI hat in Phase 1 Untertitel-Texte erstellt (ohne Zeitstempel)
2. Maintainer erstellt Video
3. Maintainer passt Zeitfenster im SRT/VTT-File an

#### Aktivitäten
1. **Medien erstellen:** Gemäß Draft-Spezifikationen und obigen Standards
2. **Qualität prüfen:** Lesbarkeit, Kontrast, Dateigröße
3. **Datenschutz sicherstellen:** Keine personenbezogenen Daten sichtbar
4. **Dateien benennen:** Gemäß Draft-Vorgaben

#### Output
- **Medien-Assets:** Screenshots, annotierte Bilder, Videos (inkl. Untertitel)
- **Dateinamen-Liste:** Mapping Draft-Platzhalter → tatsächliche Files

---

### Phase 6: Content-Enrichment

**Verantwortlich:** Maintainer  
**Häufigkeit:** Pro Section nach Medien-Erstellung

#### Aktivitäten
1. **Medien einbinden:**
   - Platzhalter durch echte Pfade ersetzen
   - `<img>`-Tags mit korrekten `src`, `alt`, `title` Attributen
   - `<video>`-Tags mit Untertitel-Tracks
2. **Glossar-Verweise ergänzen:**
   - Fachbegriffe mit `data-glossary-term` auszeichnen
   - Querverweise zu Glossar-Sections einfügen
3. **Agent-Context erstellen (v1.0: manuell, später: KI-gestützt):**
   - Trigger-Points identifizieren
   - Agent-Context-Block am Section-Ende einfügen
   - JSON-Struktur gemäß Cluster 2
4. **Finale Formatierungsprüfung:**
   - CSS-Klassen korrekt?
   - Barrierefreiheit durchgängig gewährleistet?

#### Output
- **Angereicherte Section:** Vollständig mit Medien, Glossar, Agent-Context
- **Version:** Inkrementiert (z.B. 1.1.0 für Content-Enrichment)
- **Status:** Ready for Final Review

---

### Phase 7: Final Review

**Verantwortlich:** Maintainer  
**Häufigkeit:** Pro Section nach Content-Enrichment

#### Aktivitäten
1. **Fachliche Korrektheit:** Sind alle Informationen korrekt und aktuell?
2. **UX-Prüfung:** Ist die Section intuitiv nutzbar?
3. **Gesamteindruck:** Passt die Section ins Gesamtwerk?
4. **Medienqualität:** Sind Screenshots/Videos verständlich und hilfreich?
5. **Barrierefreiheit:** End-to-End-Test mit Screenreader (stichprobenartig)

#### Entscheidung
- **Approval:** Weiter zu Phase 8 (Distribution)
- **Reject mit Feedback:**
  - **Minor:** Zurück zu Phase 6 (kleine Anpassungen)
  - **Major:** Zurück zu Phase 4 oder Phase 1 (grundlegende Überarbeitung)

#### Output
- **Approval-Status:** Approved / Rejected
- **Feedback-Dokument:** Bei Reject mit konkreten Verbesserungshinweisen

---

### Phase 8: Distribution

**Verantwortlich:** Maintainer  
**Häufigkeit:** Pro Section nach Final Review Approval

#### Aktivitäten
1. **Versionierung:**
   - Git-Commit mit beschreibender Message
   - Tag setzen (z.B. `section-axiom-case-creation-v1.1.0`)
2. **Branch-Überführung:**
   - Von `content-drafts` nach `content-approved`
   - Merge in `main` (falls produktionsreif)
3. **Komponierung:**
   - Section in Gesamt-Dokumentation integrieren
   - Navigation aktualisieren
4. **Veröffentlichung:**
   - Build-Prozess anstoßen (HTML-Generierung, Asset-Optimierung)
   - Deployment auf Zielplattform

#### Output
- **Published Section:** Öffentlich verfügbar in Wissenssystem
- **Git-Repository:** Versioniert und dokumentiert
- **Status:** Published

---

## 3. Schnittstellen & Datenformate

### 3.1 Bevorzugte Formate für KI-Arbeit

| Datentyp | Bevorzugtes Format | Begründung |
|----------|-------------------|------------|
| **Section-Beschreibungen** | Natürliche Sprache (Mischform Stichpunkte + Fließtext) | Besseres Verständnis von Nuancen und Kontext |
| **Fehlerberichte** | Textformat mit Zeilennummern | Direkte Lokalisierung, keine JSON-Interpretation nötig |
| **Strategiedokumente** | Markdown / Strukturierter Text | Gut lesbar, hierarchisch strukturierbar |
| **Quellenmaterial** | Text / Markdown / PDF (extrahiert) | Direkt verarbeitbar |
| **Approbierte Sections** | HTML (Volltext) | Analyse von Stil, Terminologie, Struktur |

### 3.2 Input/Output-Matrix

| Phase | Input | Output |
|-------|-------|--------|
| **0** | Projektziel, Zielgruppe, Rahmenbedingungen | Strategiedokument, Quellenliste |
| **0.5** | Strategiedokument, Quellen (Inhaltsverzeichnis + Intros) | Section-Liste mit groben Inhaltsentwürfen |
| **1** | Section-Info, approbierte Sections, Quellen (detailliert), Strategiedokument | Section-Draft (HTML), Medien-Spezifikationen, Untertitel-Entwürfe |
| **2** | Section-Draft (HTML) | Validierungs-Report (CRITICAL/ERROR/WARNING/INFO) |
| **3** | Validierungs-Report | Korrigierter Draft (neue Version) |
| **4** | Draft, Strategiedokument, approbierte Sections, Terminologie-Liste | Semantic Review Report, Quality-Score |
| **5** | Draft, Medien-Spezifikationen | Medien-Assets (Screenshots, Videos, Untertitel) |
| **6** | Draft, Medien-Assets, Glossar-Daten | Angereicherte Section (mit Medien, Glossar, Agent) |
| **7** | Angereicherte Section | Approval-Status, ggf. Feedback-Dokument |
| **8** | Approved Section | Published Section, Git-Tag |

---

## 4. Quality-Score-System

### 4.1 Kriterien & Gewichtung

**Gesamtscore:** 0-100 Punkte

| Kriterium | Gewicht | Max. Punkte | Fokus |
|-----------|---------|-------------|-------|
| Strategiekonformität | 30% | 30 | Passung zum Lernziel und Strategievorgaben |
| Verständlichkeit | 25% | 25 | Zielgruppengerechte Sprache und Didaktik |
| Vollständigkeit | 20% | 20 | Abdeckung aller Key Topics |
| Konsistenz | 15% | 15 | Terminologie, Stil, Format |
| Struktur | 10% | 10 | Logik, Hierarchie, Navigation |

### 4.2 Bewertungsmatrix (Strategiekonformität Beispiel)

| Punkte | Beschreibung |
|--------|--------------|
| 28-30 | Perfekte Umsetzung des Lernziels, alle Fokus-Themen priorisiert, exakte Umfangstreue |
| 24-27 | Lernziel erreicht, Fokus-Themen gut abgedeckt, minimale Abweichungen |
| 18-23 | Lernziel größtenteils erreicht, einige Fokus-Themen unterrepräsentiert |
| 12-17 | Lernziel teilweise verfehlt, wichtige Fokus-Themen fehlen oder falsch gewichtet |
| 0-11 | Lernziel nicht erreicht, gravierende Abweichungen von Strategievorgaben |

*(Analoge Matrizen für alle Kriterien)*

### 4.3 Report-Template

Siehe Phase 4 Output-Format (Markdown-basiert, strukturiert, mit konkreten Handlungsempfehlungen)

---

## 5. Fehlerbehandlung & Eskalation

### 5.1 Version 1.0: Manuelle Kontrolle (Option C)

**Prinzip:** Maintainer hat jederzeit volle Kontrolle und greift bei Bedarf ein.

#### Problem-Section-Handling

```
Maintainer beobachtet:
├─ Anzahl Iterationen (Phase 2 ↔ 3)
├─ Quality-Scores (Phase 4)
├─ Fehlermuster (wiederkehrende Probleme)
└─ Zeitaufwand pro Section

Maintainer entscheidet fallweise:
├─ Strategiedokument verfeinern → Phase 0.5b (neue Iteration)
├─ KI-Prompt anpassen (mehr Kontext, präzisere An
````



## Prompt:
10.10.2025, 01:15:54

Weiter



## Response:
10.10.2025, 01:18:17



**Cluster 5: Workflow & Rollen - WebAssistentForensics** ∙ Version 2

````markdown
# Cluster 5: Workflow & Rollen

**Projekt:** WebAssistentForensics  
**Version:** 1.0  
**Datum:** 2025-10-10  
**Status:** Final

---

## 1. Übersicht

### 1.1 Projektziel & Scope

**Ziel:** Entwicklung eines strukturierten Wissenssystems für IT-ferne Polizeibeamte zu IT-Forensik-Tools (initial: Magnet AXIOM Examine).

**Scope Version 1.0:**
- ~100-150 Sections
- KI-gestützte Content-Generierung (Claude Sonnet 4.5)
- JSON-Schema-validiertes HTML
- BFSG-konforme Barrierefreiheit
- Manuelle Kontrolle durch Maintainer bei allen kritischen Entscheidungen
- Git-basierte Versionierung

**Ausgeschlossen in v1.0 (für spätere Versionen):**
- Automatisierte Workflows (teilweise in v2.0)
- Parallelisierung von Draft-Erstellung
- Git-Workflow-Automatisierung
- Automatische Agent-Context-Generierung

---

### 1.2 Akteure & Rollen

#### Akteure

| Akteur | Beschreibung | Technologie |
|--------|--------------|-------------|
| **KI-System** | Claude Sonnet 4.5 für Content-Generierung und -Review | Anthropic Claude API / Web-Interface |
| **Python-Skripte** | Automatisierte Syntax- und Schema-Validierung | Python 3.x + JSON-Schema |
| **Maintainer** | Du oder Kollegen mit Gesamtverantwortung | Manuell |
| **Handbuch-Autoren** | Ersteller von Software-Dokumentation (passiv) | Externe Quellen |

#### Rollen-Matrix

| Rolle | Verantwortung | Akteure |
|-------|---------------|---------|
| **Content-Creator** | Erstellt initialen Content (Drafts, Medien) | KI-System, Maintainer |
| **Content-Validator** | Prüft Syntax, Schema-Konformität | Python-Skripte, Maintainer |
| **Content-Enricher** | Ergänzt Medien, Glossar, Agent-Context | Maintainer |
| **Content-Reviewer** | Prüft Qualität, Konsistenz, Korrektheit | KI-System, Maintainer |
| **Content-Distributor** | Komponiert und verteilt Endprodukt | Maintainer |

---

## 2. Workflow-Phasen

### Phase 0: Strategie

**Verantwortlich:** Maintainer  
**Häufigkeit:** Initial + bei Bedarf (neue Topics/Chapters)

#### Aktivitäten
1. **Lernziel definieren:** Was soll der Ermittler nach Durcharbeitung können?
2. **Fokus-Themen festlegen:** Welche Aspekte sind zentral, welche peripher?
3. **Umfang bestimmen:** Wie viele Sections, welche Detailtiefe?
4. **Software & Version benennen:** Welches Tool in welcher Version?
5. **Forensischer Kontext:** Mobilgerät, PC-System, Cloud, etc.?
6. **Quellen benennen:** AXIOM-Handbuch, interne Dokumentation, etc.

#### Output
- **Strategiedokument(e):**
  - **Global:** Für das Gesamtwerk
  - **Pro Topic/Chapter:** Bei Bedarf für Verfeinerung
- **Quellenliste:** Validierte, autorisierte Quellen

#### Flexibilität
- Strategiedokument ist **anpassbar** (Versionierung)
- Fokus auf **Ergebnis**, nicht auf absolute Perfektion
- Iterationen möglich, wenn sich Qualitätsprobleme zeigen

---

### Phase 0.5: Vorarbeit (iterativ bis Approval)

**Verantwortlich:** KI-System + Maintainer (Approval)  
**Häufigkeit:** Nach jeder Strategiedefinition/-anpassung

#### Aktivitäten (KI)
1. **Quellen analysieren:**
   - Inhaltsverzeichnis vollständig lesen
   - Kapitel-Intros (erste 2-3 Absätze) pro Hauptkapitel
   - Struktur-Hinweise erfassen (Querverweise, Abhängigkeiten)
2. **Gesamtgliederung erstellen:**
   - Topics → Chapters → Sections ableiten
   - Hierarchieebenen festlegen (3-5 Ebenen)
   - Abhängigkeiten identifizieren
3. **Grobe Inhaltsentwürfe pro Section:**
   - Lernziel formulieren
   - Key Topics auflisten
   - Kurzbeschreibung verfassen
   - Vorgänger/Nachfolger-Sections benennen

#### Output-Format (pro Section)

```
Section: axiom-case-creation
Gliederungsebene: 3
Lernziel: Ermittler kann eigenständig einen Fall anlegen
Key Topics:
  - Neuen Fall anlegen (New Case Dialog)
  - Evidenzquellen hinzufügen (Add Evidence)
  - Fall-Metadaten erfassen (Case Properties)
Kurzbeschreibung:
  Diese Section erklärt den kompletten Prozess der Fall-Erstellung in AXIOM.
  Der Fokus liegt auf der korrekten Auswahl der Evidenzquellen und der
  vollständigen Erfassung von Metadaten für spätere Berichte.
Vorgänger-Sections: axiom-installation, axiom-interface
Nachfolger-Sections: axiom-evidence-processing
```

#### Aktivitäten (Maintainer)
1. **Gliederung prüfen:** Ist die Struktur logisch und vollständig?
2. **Vollständigkeit bewerten:** Fehlen Sections? Sind Abhängigkeiten korrekt?
3. **Strategiekonformität prüfen:** Passt die Gliederung zum Strategiedokument?
4. **Entscheidung:**
   - **Approval:** Weiter zu Phase 1
   - **Reject:** Strategiedokument verfeinern → Phase 0.5b (Iteration)

#### Output
- **Section-Liste:** Abgesegnete Gliederung mit groben Inhaltsentwürfen
- **Status:** Approved für Phase 1

---

### Phase 1: Research & Draft (pro Section)

**Verantwortlich:** KI-System  
**Häufigkeit:** Pro Section, sequenziell (keine Parallelisierung in v1.0)

#### Input für KI

```
=== AKTUELL ZU ERSTELLENDE SECTION ===
[Section-Info aus Phase 0.5 wie oben beschrieben]

=== KONTEXT: BEREITS APPROBIERTE SECTIONS ===
[Volltext der 2-3 unmittelbar vorhergehenden Sections]

=== KONTEXT: GESAMTSTRUKTUR (ÜBERBLICK) ===
Topic: AXIOM Grundlagen
├─ Chapter: Installation & Setup
│  ├─ axiom-installation (✓ approbiert)
│  └─ axiom-interface (✓ approbiert)
├─ Chapter: Fall-Management
│  ├─ axiom-case-creation (← JETZT)
│  ├─ axiom-evidence-processing (geplant)
│  └─ axiom-case-export (geplant)

=== QUELLEN (DETAILLIERT) ===
[Relevante Kapitel aus AXIOM-Handbuch, vollständig]

=== STRATEGIEDOKUMENT ===
[Aktuelles Strategiedokument für diesen Bereich]
```

#### Aktivitäten (KI)
1. **Quellen vertiefen:** Relevante Abschnitte im Detail lesen
2. **Kontext verstehen:** Approbierte Sections auf Terminologie/Stil prüfen
3. **Draft erstellen:**
   - HTML gemäß Cluster 3 (BFSG, Whitelist, Attribute)
   - Content gemäß Cluster 1 (Zielgruppe, Detail-Level, Terminologie)
   - Struktur gemäß Cluster 2 (Hierarchie, data-ref, JSON-LD)
   - Medien-Platzhalter mit Dateinamen-Vorschlägen
   - Video-Untertitel-Entwürfe (SRT/VTT-Format)
4. **Selbstprüfung:** Kurze Plausibilitätsprüfung vor Ausgabe

#### Output
- **Section-Draft (HTML):** Vollständiger HTML-Code gemäß Schema
- **Medien-Spezifikationen:** Liste benötigter Screenshots/Videos mit Beschreibung
- **Untertitel-Entwürfe:** Zeitstempel-unabhängige Untertitel-Texte
- **Version:** 1.0.0

---

### Phase 2: Syntax-Validierung

**Verantwortlich:** Python-Skripte (automatisiert)  
**Häufigkeit:** Nach jedem Draft/jeder Korrektur

#### Aktivitäten
1. **JSON-Schema-Validierung:** Struktur, Pflicht-Attribute, Datentypen
2. **HTML-Element-Prüfung:** Nur erlaubte Elemente (Whitelist)
3. **Attribut-Vollständigkeit:** Pflicht-Attribute vorhanden?
4. **BFSG-Konformität:** lang-Attribute, Alt-Texte, Überschriften-Hierarchie
5. **Cross-Reference-Prüfung:** data-ref gültig und konsistent?
6. **CSS-Klassen-Prüfung:** Nur erlaubte Klassen verwendet?

#### Output-Format

```
=== SYNTAX VALIDATION REPORT ===
Section: axiom-case-creation
Version: 1.0.0
Datum: 2025-10-10 14:32:15

CRITICAL [Line 45]: Missing required attribute 'lang' on element <span>
ERROR [Line 78]: Invalid data-ref format 'axiom_case' (underscore not allowed)
ERROR [Line 102]: Element <table> not in whitelist (use <div> with CSS grid)
WARNING [Line 112]: Heading hierarchy skip (h2 → h4)
WARNING [Line 156]: Alt-text suspiciously short (< 10 characters): "AXIOM UI"
INFO [Line 89]: Consider adding 'title' attribute for better accessibility
INFO [Line 134]: data-detail-level="1" could benefit from level 2 variant

=== SUMMARY ===
CRITICAL: 1
ERROR: 2
WARNING: 2
INFO: 2

Status: FAILED (CRITICAL/ERROR present)
```

**Optional in v1.1:** Code-Snippet um Fehler herum für schnellere Lokalisierung

---

### Phase 3: Fehlerkorrektur (iterativ)

**Verantwortlich:** KI-System (CRITICAL/ERROR), Maintainer (WARNING/INFO)  
**Häufigkeit:** Nach jedem Validierungs-Fehlschlag

#### Aktivitäten bei CRITICAL/ERROR

1. **KI erhält:** Validierungs-Report (Textformat wie oben)
2. **KI korrigiert:**
   - Fehler lokalisieren
   - Korrekturen vornehmen (nur betroffene Stellen)
   - Keine inhaltlichen Änderungen (nur Syntax/Struktur)
3. **KI erstellt:** Neue Version (z.B. 1.0.1)
4. **Zurück zu Phase 2:** Erneute Validierung

**Abbruchkriterium:** Wenn nach 5 Iterationen noch CRITICAL/ERROR → Eskalation an Maintainer

#### Aktivitäten bei WARNING/INFO

1. **Maintainer erhält:** Validierungs-Report
2. **Maintainer entscheidet pro Warnung:**
   - **Beheben:** Manuell korrigieren oder KI beauftragen
   - **Ignorieren:** Als akzeptabel markieren (Begründung dokumentieren)
3. **Bei Korrekturen:** Neue Version erstellen

**Weiter zu Phase 4:** Wenn keine CRITICAL/ERROR mehr vorhanden

#### Output
- **Korrigierter Draft:** Syntaktisch valider HTML-Code
- **Version:** Inkrementiert bei Änderungen (z.B. 1.0.3)
- **Status:** Ready for Semantic Review

---

### Phase 4: Semantic Review

**Verantwortlich:** KI-System  
**Häufigkeit:** Nach syntaktischer Validierung, vor Medien-Erstellung

#### Input für KI

```
=== ZU REVIEWENDE SECTION ===
[Vollständiger HTML-Draft]

=== STRATEGIEDOKUMENT ===
[Relevantes Strategiedokument]

=== ALLE APPROBIERTEN SECTIONS ===
[Volltexte für Konsistenzprüfung]

=== TERMINOLOGIE-LISTE ===
[Organisch gewachsene Liste etablierter Begriffe]

=== SECTION-LISTE (PHASE 0.5) ===
[Ursprüngliche Inhaltsskizze für Vollständigkeitsprüfung]
```

#### Bewertungskriterien & Quality-Score (0-100)

| Kriterium | Gewicht | Max. Punkte | Bewertungsfragen |
|-----------|---------|-------------|------------------|
| **Strategiekonformität** | 30% | 30 | • Entspricht die Section dem Lernziel?<br>• Sind Fokus-Themen korrekt priorisiert?<br>• Passt der Umfang zur Strategievorgabe?<br>• Sind Abgrenzungen eingehalten? |
| **Verständlichkeit** | 25% | 25 | • Ist die Sprache zielgruppengerecht (IT-ferne Ermittler)?<br>• Sind Fachbegriffe erklärt?<br>• Ist die Schritt-für-Schritt-Logik nachvollziehbar?<br>• Sind Beispiele praxisnah? |
| **Vollständigkeit** | 20% | 20 | • Sind alle Key Topics aus Phase 0.5 abgedeckt?<br>• Fehlen wichtige Informationen für das Lernziel?<br>• Sind notwendige Cross-References vorhanden?<br>• Ist der Detailgrad angemessen? |
| **Konsistenz** | 15% | 15 | • Stimmt die Terminologie mit approbierten Sections überein?<br>• Passen Schreibstil und Tonalität?<br>• Sind Formatierungen einheitlich?<br>• Widersprechen Aussagen anderen Sections? |
| **Struktur** | 10% | 10 | • Ist die Gliederung logisch aufgebaut?<br>• Sind Überschriften-Hierarchien korrekt?<br>• Ist die Navigation intuitiv?<br>• Sind Content-Type-Boxen sinnvoll eingesetzt? |

#### Score-Interpretation

```
90-100 Punkte: Exzellent – Kann direkt zu Phase 5 (Medien-Erstellung)
75-89 Punkte:  Gut – Kleinere Anpassungen empfohlen, dann weiter
60-74 Punkte:  Akzeptabel – Mehrere Verbesserungen nötig, Review mit Maintainer
0-59 Punkte:   Ungenügend – Zurück zu Phase 1 (Draft neu erstellen)
```

#### Output-Format

```markdown
## Semantic Review Report

**Section:** axiom-case-creation  
**Version:** 1.0.3  
**Reviewer:** Claude Sonnet 4.5  
**Datum:** 2025-10-10 15:45:22

### Quality Score: 82/100 (Gut)

#### Detailbewertung

| Kriterium | Punkte | Max | Bemerkung |
|-----------|--------|-----|-----------|
| Strategiekonformität | 27 | 30 | Lernziel erreicht, Fokus-Themen gut abgedeckt. Empfehlung: Prozess der Evidenzquellenauswahl stärker betonen (laut Strategiedokument Priorität). |
| Verständlichkeit | 22 | 25 | Sprache zielgruppengerecht, gute Schritt-für-Schritt-Anleitung. Empfehlung: Fachbegriff "Hash-Algorithmus" in Zeile 67 erklären. |
| Vollständigkeit | 18 | 20 | Alle Key Topics vorhanden. Fehlt: Cross-Reference zu "axiom-evidence-types" für vertiefende Erklärung der Evidenzquellen. |
| Konsistenz | 12 | 15 | Terminologie stimmt überein. Abweichung: "Fallakte" statt "Fall" (in axiom-installation wird "Fall" verwendet). |
| Struktur | 9 | 10 | Gliederung logisch, Überschriften korrekt. Kleiner Hinweis: Info-Box in Zeile 45 könnte als Hint-Box besser passen (weniger kritische Information). |

#### Handlungsempfehlungen

**Priorität HOCH:**
1. Evidenzquellenauswahl-Prozess detaillierter beschreiben (Strategiekonformität +3 Punkte möglich)
2. Terminologie "Fallakte" → "Fall" anpassen (Konsistenz +2 Punkte)

**Priorität MITTEL:**
3. Cross-Reference zu "axiom-evidence-types" ergänzen (Vollständigkeit +2 Punkte)
4. Fachbegriff "Hash-Algorithmus" erklären (Verständlichkeit +2 Punkte)

**Priorität NIEDRIG:**
5. Info-Box → Hint-Box umwandeln (Struktur +1 Punkt)

**Geschätzter Score nach Anpassung:** 91/100 (Exzellent)

#### Entscheidung
☐ Direkt zu Phase 5 (Medien-Erstellung)  
☑ Anpassungen vornehmen, dann Phase 4 wiederholen  
☐ Zurück zu Phase 1 (Draft neu erstellen)
```

#### Weiter zu Phase 5
- Wenn Score ≥ 75 und Maintainer zustimmt

---

### Phase 5: Medien-Erstellung

**Verantwortlich:** Maintainer  
**Häufigkeit:** Pro Section nach Semantic Review

#### Medien-Spezifikationen

##### Screenshots

| Parameter | Wert |
|-----------|------|
| **Inhalt** | Nur Programm/Fenster/Pop-Up (kein Desktop-Hintergrund) |
| **Auflösung** | 72 dpi |
| **Farbtiefe** | Vollfarben |
| **Theme** | System-Skin/Theme (keine Custom-Themes) |
| **Format** | PNG, komprimiert 60-80% |
| **Datenschutz** | Relevante Bereiche schwärzen/pixeln |
| **Dateiname** | Von KI im Draft vorgegeben (z.B. `axiom-case-new-dialog.png`) |

##### Annotations (auf Screenshots)

| Parameter | Wert |
|-----------|------|
| **Kontrast** | Hoch (gut lesbar auf hellem/dunklem Hintergrund) |
| **Farbcode** | • Rot: Achtung<br>• Gelb: Warnung<br>• Blau: Hinweis<br>• Grün: Handlungsanweisung |
| **Pfeile** | Mindestbreite 4px |
| **Verdeckung** | Nichts Wichtiges verdecken |
| **Schriftart** | Open Sans (ohne Serifen) |
| **Schriftgröße** | 16px |

##### Videos

| Parameter | Wert |
|-----------|------|
| **Mindestauflösung** | 1280×720 (HD) |
| **Höchstauflösung** | 1920×1080 (Full HD) |
| **Mindestframerate** | 15 fps (ausreichend für Bildschirmaufnahmen) |
| **Mindestspieldauer** | 10 Sekunden |
| **Höchstspieldauer** | 180 Sekunden (3 Minuten) |
| **Seitenverhältnis** | 16:9 bevorzugt |
| **Audio** | Ohne Musik, ggf. Sprecherstimme |
| **Format** | MP4 bevorzugt |
| **Codec** | H.264 (AVC), H.265 (HEVC) oder AV1 |
| **Untertitel** | **Pflicht** (BFSG-Konformität), SRT/VTT-Format |

**Untertitel-Workflow:**
1. KI hat in Phase 1 Untertitel-Texte erstellt (ohne Zeitstempel)
2. Maintainer erstellt Video
3. Maintainer passt Zeitfenster im SRT/VTT-File an

#### Aktivitäten
1. **Medien erstellen:** Gemäß Draft-Spezifikationen und obigen Standards
2. **Qualität prüfen:** Lesbarkeit, Kontrast, Dateigröße
3. **Datenschutz sicherstellen:** Keine personenbezogenen Daten sichtbar
4. **Dateien benennen:** Gemäß Draft-Vorgaben

#### Output
- **Medien-Assets:** Screenshots, annotierte Bilder, Videos (inkl. Untertitel)
- **Dateinamen-Liste:** Mapping Draft-Platzhalter → tatsächliche Files

---

### Phase 6: Content-Enrichment

**Verantwortlich:** Maintainer  
**Häufigkeit:** Pro Section nach Medien-Erstellung

#### Aktivitäten
1. **Medien einbinden:**
   - Platzhalter durch echte Pfade ersetzen
   - `<img>`-Tags mit korrekten `src`, `alt`, `title` Attributen
   - `<video>`-Tags mit Untertitel-Tracks
2. **Glossar-Verweise ergänzen:**
   - Fachbegriffe mit `data-glossary-term` auszeichnen
   - Querverweise zu Glossar-Sections einfügen
3. **Agent-Context erstellen (v1.0: manuell, später: KI-gestützt):**
   - Trigger-Points identifizieren
   - Agent-Context-Block am Section-Ende einfügen
   - JSON-Struktur gemäß Cluster 2
4. **Finale Formatierungsprüfung:**
   - CSS-Klassen korrekt?
   - Barrierefreiheit durchgängig gewährleistet?

#### Output
- **Angereicherte Section:** Vollständig mit Medien, Glossar, Agent-Context
- **Version:** Inkrementiert (z.B. 1.1.0 für Content-Enrichment)
- **Status:** Ready for Final Review

---

### Phase 7: Final Review

**Verantwortlich:** Maintainer  
**Häufigkeit:** Pro Section nach Content-Enrichment

#### Aktivitäten
1. **Fachliche Korrektheit:** Sind alle Informationen korrekt und aktuell?
2. **UX-Prüfung:** Ist die Section intuitiv nutzbar?
3. **Gesamteindruck:** Passt die Section ins Gesamtwerk?
4. **Medienqualität:** Sind Screenshots/Videos verständlich und hilfreich?
5. **Barrierefreiheit:** End-to-End-Test mit Screenreader (stichprobenartig)

#### Entscheidung
- **Approval:** Weiter zu Phase 8 (Distribution)
- **Reject mit Feedback:**
  - **Minor:** Zurück zu Phase 6 (kleine Anpassungen)
  - **Major:** Zurück zu Phase 4 oder Phase 1 (grundlegende Überarbeitung)

#### Output
- **Approval-Status:** Approved / Rejected
- **Feedback-Dokument:** Bei Reject mit konkreten Verbesserungshinweisen

---

### Phase 8: Distribution

**Verantwortlich:** Maintainer  
**Häufigkeit:** Pro Section nach Final Review Approval

#### Aktivitäten
1. **Versionierung:**
   - Git-Commit mit beschreibender Message
   - Tag setzen (z.B. `section-axiom-case-creation-v1.1.0`)
2. **Branch-Überführung:**
   - Von `content-drafts` nach `content-approved`
   - Merge in `main` (falls produktionsreif)
3. **Komponierung:**
   - Section in Gesamt-Dokumentation integrieren
   - Navigation aktualisieren
4. **Veröffentlichung:**
   - Build-Prozess anstoßen (HTML-Generierung, Asset-Optimierung)
   - Deployment auf Zielplattform

#### Output
- **Published Section:** Öffentlich verfügbar in Wissenssystem
- **Git-Repository:** Versioniert und dokumentiert
- **Status:** Published

---

## 3. Schnittstellen & Datenformate

### 3.1 Bevorzugte Formate für KI-Arbeit

| Datentyp | Bevorzugtes Format | Begründung |
|----------|-------------------|------------|
| **Section-Beschreibungen** | Natürliche Sprache (Mischform Stichpunkte + Fließtext) | Besseres Verständnis von Nuancen und Kontext |
| **Fehlerberichte** | Textformat mit Zeilennummern | Direkte Lokalisierung, keine JSON-Interpretation nötig |
| **Strategiedokumente** | Markdown / Strukturierter Text | Gut lesbar, hierarchisch strukturierbar |
| **Quellenmaterial** | Text / Markdown / PDF (extrahiert) | Direkt verarbeitbar |
| **Approbierte Sections** | HTML (Volltext) | Analyse von Stil, Terminologie, Struktur |

### 3.2 Input/Output-Matrix

| Phase | Input | Output |
|-------|-------|--------|
| **0** | Projektziel, Zielgruppe, Rahmenbedingungen | Strategiedokument, Quellenliste |
| **0.5** | Strategiedokument, Quellen (Inhaltsverzeichnis + Intros) | Section-Liste mit groben Inhaltsentwürfen |
| **1** | Section-Info, approbierte Sections, Quellen (detailliert), Strategiedokument | Section-Draft (HTML), Medien-Spezifikationen, Untertitel-Entwürfe |
| **2** | Section-Draft (HTML) | Validierungs-Report (CRITICAL/ERROR/WARNING/INFO) |
| **3** | Validierungs-Report | Korrigierter Draft (neue Version) |
| **4** | Draft, Strategiedokument, approbierte Sections, Terminologie-Liste | Semantic Review Report, Quality-Score |
| **5** | Draft, Medien-Spezifikationen | Medien-Assets (Screenshots, Videos, Untertitel) |
| **6** | Draft, Medien-Assets, Glossar-Daten | Angereicherte Section (mit Medien, Glossar, Agent) |
| **7** | Angereicherte Section | Approval-Status, ggf. Feedback-Dokument |
| **8** | Approved Section | Published Section, Git-Tag |

---

## 4. Quality-Score-System

### 4.1 Kriterien & Gewichtung

**Gesamtscore:** 0-100 Punkte

| Kriterium | Gewicht | Max. Punkte | Fokus |
|-----------|---------|-------------|-------|
| Strategiekonformität | 30% | 30 | Passung zum Lernziel und Strategievorgaben |
| Verständlichkeit | 25% | 25 | Zielgruppengerechte Sprache und Didaktik |
| Vollständigkeit | 20% | 20 | Abdeckung aller Key Topics |
| Konsistenz | 15% | 15 | Terminologie, Stil, Format |
| Struktur | 10% | 10 | Logik, Hierarchie, Navigation |

### 4.2 Bewertungsmatrix (Strategiekonformität Beispiel)

| Punkte | Beschreibung |
|--------|--------------|
| 28-30 | Perfekte Umsetzung des Lernziels, alle Fokus-Themen priorisiert, exakte Umfangstreue |
| 24-27 | Lernziel erreicht, Fokus-Themen gut abgedeckt, minimale Abweichungen |
| 18-23 | Lernziel größtenteils erreicht, einige Fokus-Themen unterrepräsentiert |
| 12-17 | Lernziel teilweise verfehlt, wichtige Fokus-Themen fehlen oder falsch gewichtet |
| 0-11 | Lernziel nicht erreicht, gravierende Abweichungen von Strategievorgaben |

*(Analoge Matrizen für alle Kriterien)*

### 4.3 Report-Template

Siehe Phase 4 Output-Format (Markdown-basiert, strukturiert, mit konkreten Handlungsempfehlungen)

---

## 5. Fehlerbehandlung & Eskalation

### 5.1 Version 1.0: Manuelle Kontrolle (Option C)

**Prinzip:** Maintainer hat jederzeit volle Kontrolle und greift bei Bedarf ein.

#### Problem-Section-Handling

```
Maintainer beobachtet:
├─ Anzahl Iterationen (Phase 2 ↔ 3)
├─ Quality-Scores (Phase 4)
├─ Fehlermuster (wiederkehrende Probleme)
└─ Zeitaufwand pro Section

Maintainer entscheidet fallweise:
├─ Strategiedokument verfeinern → Phase 0.5b (neue Iteration)
├─ KI-Prompt anpassen (mehr Kontext, präzisere Anweisungen)
├─ Section-Beschreibung in Phase 0.5 präzisieren
├─ Quellenmaterial erweitern/verbessern
├─ Als letzter Ausweg: Section manuell schreiben
└─ Lessons Learned dokumentieren für v2.0
```

**Keine harte Abbruchgrenze:** Pragmatische Entscheidung basierend auf Aufwand-Nutzen-Verhältnis.

#### Eskalations-Trigger (informell)

- **Syntax-Fehler:** >5 Iterationen ohne Besserung → Maintainer prüft, ob Fehler systematisch ist
- **Semantic Review:** Score <60 über 2 Draft-Versionen → Strategiedokument überarbeiten
- **Zeitüberschreitung:** Section benötigt >4 Stunden → Prozess hinterfragen

#### Dokumentation

**Lessons Learned Log:**
```markdown
## Problem-Section: axiom-advanced-search
**Datum:** 2025-10-15
**Problem:** Score blieb bei 52-58 über 3 Drafts
**Ursache:** Strategiedokument zu vage ("erweiterte Suchfunktionen")
**Lösung:** Konkretisierung: "Boolean-Operatoren, Regex, Filter-Kombinationen"
**Ergebnis:** Score 87 nach neuem Draft
**Learning:** Strategiedokument braucht konkrete Feature-Namen, nicht nur Kategorien
```

---

### 5.2 Version 2.0: Automatische Eskalation (Option B) - Perspektivisch

**Prinzip:** System erkennt Problem-Sections automatisch und schlägt Lösungen vor.

#### Automatische Trigger

```
System überwacht:
├─ Syntax-Fehler-Häufigkeit (CRITICAL/ERROR pro Version)
├─ Semantic Review Scores (Trend über Versionen)
├─ Iterationszyklen (Anzahl Phase-2-3-Durchläufe)
└─ Zeitverbrauch (Dauer seit Phase 1 Start)

Eskalations-Schwellen:
├─ Score < 60 über 2 Draft-Versionen ODER
├─ >5 Syntax-Fehler-Iterationen ODER
├─ >3 Semantic-Review-Durchläufe ohne Verbesserung
└─ System markiert Section als "problematic"
```

#### Automatische Analyse

```
System analysiert:
├─ Fehlerhistorie:
│  ├─ Welche Kriterien scheitern wiederholt?
│  ├─ Sind Fehler syntaktisch oder semantisch?
│  └─ Gibt es Muster (z.B. immer Konsistenz-Probleme)?
├─ Strategiedokument-Qualität:
│  ├─ Sind Lernziele präzise formuliert?
│  ├─ Sind Key Topics spezifisch genug?
│  └─ Gibt es widersprüchliche Vorgaben?
├─ Quellenmaterial-Verfügbarkeit:
│  ├─ Ist das Thema ausreichend dokumentiert?
│  ├─ Sind Quellen aktuell?
│  └─ Fehlen wichtige Informationen?
└─ Komplexität:
   ├─ Ist die Section zu umfangreich?
   ├─ Sollte sie aufgeteilt werden?
   └─ Sind Vorgänger-Sections unzureichend?
```

#### System-Vorschläge

```markdown
## Eskalations-Report: axiom-advanced-search

**Status:** PROBLEMATIC  
**Trigger:** Score < 60 über 2 Drafts (52 → 58)  
**Datum:** 2025-10-15

### Analyse

**Fehler-Muster:**
- Strategiekonformität: Wiederholt niedrig (15-18/30)
- Vollständigkeit: Schwankend (12-16/20)
- Andere Kriterien: Akzeptabel (>80% Punktzahl)

**Strategiedokument-Prüfung:**
- Lernziel zu allgemein: "Ermittler kann erweiterte Suchen durchführen"
- Key Topics zu vage: "Erweiterte Suchfunktionen", "Filter"
- Keine konkreten Features genannt

**Quellen-Prüfung:**
- AXIOM-Handbuch Kapitel 7.2 "Advanced Search" vollständig verfügbar
- Keine Quellenprobleme erkennbar

### Empfohlene Maßnahmen

**PRIORITÄT 1: Strategiedokument verfeinern**

Vorschlag für neues Strategiedokument:
```
Lernziel: Ermittler kann Boolean-Operatoren (AND, OR, NOT), 
Regex-Patterns und Filter-Kombinationen für präzise Suchen einsetzen.

Key Topics:
- Boolean-Operatoren (AND, OR, NOT, Klammersetzung)
- Regex-Grundlagen (., *, +, ?, [])
- Filter-Kombinationen (Dateityp + Zeitraum + Keyword)
- Suchhistorie und Suche speichern
```

**PRIORITÄT 2: Section ggf. aufteilen**

Wenn Strategiedokument-Verbesserung nicht hilft:
- Section 1: "Boolean-Suche in AXIOM" (Grundlagen)
- Section 2: "Regex-Suche in AXIOM" (für Fortgeschrittene)
- Section 3: "Filter-Kombinationen in AXIOM"

### Maintainer-Entscheidung erforderlich

☐ Strategiedokument verfeinern (Vorschlag übernehmen)  
☐ Strategiedokument verfeinern (eigene Formulierung)  
☐ Section aufteilen  
☐ Manuell schreiben (KI-Generierung abbrechen)
```

---

## 6. Medien-Spezifikationen

*(Bereits vollständig in Phase 5 dokumentiert)*

**Zusammenfassung:**

| Medientyp | Key-Parameter |
|-----------|---------------|
| **Screenshots** | PNG 60-80%, 72dpi, System-Theme, Datenschutz beachten |
| **Annotations** | Open Sans 16px, Farbcode (Rot/Gelb/Blau/Grün), Pfeile ≥4px |
| **Videos** | 1280×720 bis 1920×1080, 15fps min, MP4/H.264, Untertitel Pflicht |

---

## 7. Versionierung & Speicherung

### 7.1 Git-Branch-Struktur

```
main
├─ Nur Published Sections (Phase 8)
├─ Tag-basierte Releases (z.B. v1.0.0, v1.1.0)
└─ Protected Branch (nur Maintainer darf mergen)

content-approved
├─ Sections nach Final Review (Phase 7)
├─ Bereit für Deployment
└─ Merge-Target für content-drafts

content-drafts
├─ Arbeitskopien (Phase 1-6)
├─ Unterverzeichnisse pro Section
└─ Versionsnummern in Commit-Messages
```

### 7.2 Namenskonventionen

**Verzeichnisstruktur:**
```
content-drafts/
├─ axiom-grundlagen/
│  ├─ axiom-installation/
│  │  ├─ section.html
│  │  ├─ media/
│  │  │  ├─ axiom-install-welcome.png
│  │  │  └─ axiom-install-process.mp4
│  │  └─ metadata.json
│  └─ axiom-case-management/
└─ axiom-analysis/
```

**Versionsnummern:**
- Format: `MAJOR.MINOR.BUILD`
- MAJOR: Grundlegende Überarbeitung (zurück zu Phase 1)
- MINOR: Content-Enrichment, größere Änderungen
- BUILD: Bugfixes, kleine Korrekturen

**Git-Tags:**
```
section-axiom-installation-v1.0.0
section-axiom-installation-v1.1.0 (nach Content-Enrichment)
section-axiom-installation-v1.1.2 (nach Bugfixes)
```

### 7.3 Metadaten-Datei (metadata.json)

```json
{
  "section_id": "axiom-case-creation",
  "version": "1.1.0",
  "status": "approved",
  "created": "2025-10-10T14:00:00Z",
  "last_modified": "2025-10-10T16:30:00Z",
  "author": "Claude Sonnet 4.5",
  "maintainer": "Max Mustermann",
  "quality_score": 87,
  "review_cycles": 2,
  "validation_errors": {
    "critical": 0,
    "error": 0,
    "warning": 1,
    "info": 3
  },
  "sources": [
    "AXIOM Examine User Guide v7.8, Chapter 4",
    "Internal Best Practices Doc v2.3"
  ],
  "learning_goal": "Ermittler kann eigenständig einen Fall anlegen",
  "hierarchy_level": 3,
  "prerequisites": ["axiom-installation", "axiom-interface"],
  "related_sections": ["axiom-evidence-processing", "axiom-case-export"]
}
```

---

## 8. Version 1.0 vs. spätere Versionen

### 8.1 Scope Version 1.0

**Im Scope:**
- ✅ Manuelle Kontrolle durch Maintainer bei allen kritischen Entscheidungen
- ✅ Sequenzielle Section-Erstellung (keine Parallelisierung)
- ✅ KI-generierte Drafts mit manueller Review
- ✅ Python-basierte Syntax-Validierung (automatisiert)
- ✅ KI-basierte Semantic Review (automatisiert)
- ✅ Manuelle Medien-Erstellung
- ✅ Manuelle Agent-Context-Erstellung
- ✅ Git-basierte Versionierung (manuell)
- ✅ Organisch wachsende Terminologie-Liste
- ✅ Fehlerbehandlung: Option C (manuelle Entscheidung)

**Ausgeschlossen:**
- ❌ Automatisierte End-to-End-Workflows
- ❌ Parallelisierung von Draft-Erstellung
- ❌ Automatische Git-Workflows (CI/CD)
- ❌ Automatische Agent-Context-Generierung
- ❌ Automatische Eskalation (Option B)

---

### 8.2 Roadmap für spätere Versionen

#### Version 1.1 (Quick Wins)

**Geplante Verbesserungen:**
- 🔄 Code-Snippet-Kontext in Fehlerberichten (Phase 2)
- 🔄 Medien-Template-Bibliothek (Annotations schneller erstellen)
- 🔄 Erweiterte Metadaten-Analyse (Trends, Bottlenecks)

**Aufwand:** Niedrig (< 2 Wochen Entwicklung)

---

#### Version 2.0 (Automatisierung & Skalierung)

**Geplante Verbesserungen:**
- 🔄 **Teilautomatisierung:**
  - Claude API-Integration (Python-Wrapper)
  - Batch-Processing für mehrere Sections
  - Automatische Git-Commits nach Approval
- 🔄 **Parallelisierung:**
  - Unabhängige Sections parallel erstellen
  - Dependency-Graph für Reihenfolge
- 🔄 **Fehlerbehandlung:**
  - Option B: Automatische Eskalation
  - System-Vorschläge für Strategiedokument-Verbesserungen
- 🔄 **Erweiterte Metriken:**
  - Dashboard für Workflow-Monitoring
  - Predictive Analytics (Zeitschätzungen pro Section)

**Aufwand:** Mittel (1-2 Monate Entwicklung)

---

#### Version 3.0 (KI-Agent-System)

**Geplante Verbesserungen:**
- 🔄 **Automatische Agent-Context-Generierung:**
  - KI schlägt Trigger-Points vor
  - KI generiert Agent-Kontext-Blöcke
  - Maintainer reviewed und genehmigt
- 🔄 **Multi-Tool-Unterstützung:**
  - X-Ways Forensics, Cellebrite Reader parallel pflegen
  - Tool-spezifische Metadaten automatisch verwalten
- 🔄 **Adaptive Strategiedokumente:**
  - KI lernt aus Problem-Sections
  - Vorschläge zur Strategieverbesserung
  - Self-Healing-Workflows

**Aufwand:** Hoch (3-6 Monate Entwicklung)

---

## Anhang

### A.1 Checkliste: Phase 0 (Strategie)

**Vor Start von Phase 0.5:**

- [ ] Lernziel formuliert (konkret, messbar)
- [ ] Fokus-Themen definiert (inkl. Abgrenzungen)
- [ ] Umfang geschätzt (Anzahl Sections, Detailtiefe)
- [ ] Software & Version benannt
- [ ] Forensischer Kontext geklärt (Mobilgerät/PC/Cloud)
- [ ] Quellen benannt und validiert (min. 1 Hauptquelle)
- [ ] Strategiedokument versioniert (z.B. v1.0.0)

---

### A.2 Checkliste: Phase 5 (Medien-Erstellung)

**Vor Übergabe an Phase 6:**

**Screenshots:**
- [ ] Nur Programm/Fenster (kein Desktop)
- [ ] 72 dpi, Vollfarben, System-Theme
- [ ] PNG 60-80% komprimiert
- [ ] Datenschutz: Relevante Bereiche geschwärzt/gepixelt
- [ ] Dateinamen gemäß Draft-Vorgabe

**Annotations:**
- [ ] Open Sans 16px
- [ ] Farbcode eingehalten (Rot/Gelb/Blau/Grün)
- [ ] Pfeile ≥4px breit
- [ ] Nichts Wichtiges verdeckt
- [ ] Hoher Kontrast

**Videos:**
- [ ] Auflösung 1280×720 bis 1920×1080
- [ ] Framerate ≥15 fps
- [ ] Spieldauer 10-180 Sekunden
- [ ] Format: MP4, Codec: H.264/H.265/AV1
- [ ] 16:9 Seitenverhältnis
- [ ] Untertitel (SRT/VTT) vorhanden und synchronisiert
- [ ] Keine Musik, ggf. Sprecherstimme verständlich

---

### A.3 Beispiel: Strategiedokument

```markdown
# Strategiedokument: AXIOM Case Management

**Version:** 1.0.0  
**Datum:** 2025-10-05  
**Gültigkeit:** Topic "AXIOM Case Management"

## Lernziel

Ermittler können eigenständig Fälle in AXIOM Examine v7.8 erstellen, 
Evidenzquellen hinzufügen, Fälle verwalten und für Berichte exportieren.

## Fokus-Themen

**Priorität HOCH:**
- Fall-Erstellung (New Case Dialog, Metadaten)
- Evidenzquellen-Auswahl (Devices, Images, Cloud)
- Fall-Export (Reports, Evidence Files)

**Priorität MITTEL:**
- Fall-Verwaltung (Öffnen, Schließen, Archivieren)
- Mehrere Evidenzquellen pro Fall

**Priorität NIEDRIG:**
- Erweiterte Metadaten (Custom Fields)
- Fall-Vorlagen (Templates)

**Explizit ausgeschlossen:**
- Case Sharing (Multi-User-Szenarien)
- Server-basierte Fälle (nur lokale Fälle)

## Umfang

**Geschätzte Sections:** 6-8

1. axiom-case-creation (Standard-Detail)
2. axiom-evidence-sources (Standard-Detail)
3. axiom-case-metadata (Basic-Detail)
4. axiom-case-management (Basic-Detail)
5. axiom-multi-evidence (Standard-Detail)
6. axiom-case-export (Standard-Detail)
7. axiom-case-templates (Optional, Show-Only)

## Forensischer Kontext

**Primär:** Mobilgeräte (Smartphones, Tablets)  
**Sekundär:** PC-Systeme (Windows, macOS)  
**Ausgeklammert:** Cloud-Forensik (eigenes Topic)

## Software & Version

**Tool:** Magnet AXIOM Examine  
**Version:** 7.8.x (aktuelle Stable-Version, Stand 2024-Q4)  
**Hinweis:** Screenshots mit Default-Skin, keine Custom-Themes

## Quellen

**Primär:**
- AXIOM Examine User Guide v7.8, Chapter 3-4
- Magnet Forensics Knowledge Base (online)

**Sekundär:**
- Interne Best Practices "Case Management Workflows" v2.3
- AXIOM Release Notes v7.8

## Terminologie-Entscheidungen

| Begriff | Verwendung | Begründung |
|---------|-----------|------------|
| "Fall" | Bevorzugt | Kurz, gebräuchlich in deutschem Polizeikontext |
| "Fallakte" | Vermeiden | Zu formal, potenziell missverständlich |
| "Evidenzquelle" | Bevorzugt | Präziser als "Datenquelle" |
| "Case" | Nur in UI-Kontext | Wenn AXIOM-UI englische Begriffe nutzt |

## Zielgruppen-Spezifika

**Primäre Zielgruppe:** Polizei-Ermittler, IT-fern (Mittlere Reife)  
**Detail-Level-Verteilung:**
- 60% Standard-Detail
- 25% Basic-Detail
- 10% Expert-Detail (nur für Spezialfälle)
- 5% Show-Only (optionale Vertiefungen)

**Sprach-Richtlinien:**
- Deutsch bevorzugt
- Englische UI-Begriffe in Anführungszeichen ("New Case")
- Fachbegriffe beim ersten Auftreten erklären
- Schritt-für-Schritt-Anleitungen mit Screenshots

---

**Approval:**  
☑ Maintainer: Max Mustermann, 2025-10-05  
☐ Fach-Review: [optional]
```

---

### A.4 Beispiel: Section-Liste (Phase 0.5 Output)

```markdown
# Section-Liste: AXIOM Case Management

**Erstellt:** 2025-10-06  
**Status:** Awaiting Maintainer Approval  
**Basis:** Strategiedokument v1.0.0

---

## Topic: AXIOM Case Management

### Chapter 1: Grundlagen

#### Section 1.1: axiom-case-creation

**Gliederungsebene:** 3  
**Lernziel:** Ermittler kann eigenständig einen Fall in AXIOM anlegen  
**Key Topics:**
- New Case Dialog öffnen (File → New Case)
- Fall-Namen und Beschreibung eingeben
- Examiner-Informationen erfassen
- Speicherort wählen

**Kurzbeschreibung:**  
Diese Section führt Schritt für Schritt durch die Fall-Erstellung in AXIOM Examine. 
Der Fokus liegt auf der korrekten Erfassung von Metadaten (Fall-Name, Examiner, 
Beschreibung) und der Auswahl eines geeigneten Speicherorts. Es wird erklärt, 
warum vollständige Metadaten für spätere Berichte wichtig sind.

**Vorgänger-Sections:** axiom-installation, axiom-interface  
**Nachfolger-Sections:** axiom-evidence-sources

**Geschätzte Komplexität:** Basic  
**Geschätzte Medien:** 3 Screenshots, ggf. 1 kurzes Video (30 Sek)

---

#### Section 1.2: axiom-evidence-sources

**Gliederungsebene:** 3  
**Lernziel:** Ermittler kann verschiedene Evidenzquellentypen unterscheiden und auswählen  
**Key Topics:**
- Device (direkter Zugriff auf angeschlossenes Gerät)
- Image File (forensisches Abbild laden)
- Cloud (Online-Datenquellen)
- Entscheidungshilfe: Wann welcher Typ?

**Kurzbeschreibung:**  
Diese Section erklärt die verschiedenen Evidenzquellentypen in AXIOM und gibt 
Entscheidungshilfen, wann welcher Typ zu verwenden ist. Sie zeigt die Unterschiede 
zwischen direktem Device-Zugriff (schnell, aber Veränderungsgefahr) und Image Files 
(forensisch sauber, aber mehr Vorbereitungsaufwand). Cloud-Quellen werden nur 
oberflächlich erwähnt, da sie in einem eigenen Topic behandelt werden.

**Vorgänger-Sections:** axiom-case-creation  
**Nachfolger-Sections:** axiom-case-metadata, axiom-multi-evidence

**Geschätzte Komplexität:** Standard  
**Geschätzte Medien:** 4 Screenshots, 1 Entscheidungsdiagramm, ggf. 1 Video (60 Sek)

---

[... weitere Sections analog ...]

---

**Gesamt:**
- 7 Sections (6 regulär, 1 optional)
- Geschätzte Gesamtarbeitszeit: 15-20 Stunden
- Geschätzte Medien: ~25 Screenshots, 3-5 Videos, 2 Diagramme
```

---

### A.5 Terminologie-Liste (organisch wachsend)

```markdown
# Terminologie-Liste: WebAssistentForensics

**Version:** 1.3.5  
**Letztes Update:** 2025-10-10  
**Status:** Living Document (organisch wachsend)

---

## Entscheidungen

| Begriff (DE) | Begriff (EN) | Verwendung | Kontext | Quelle |
|--------------|--------------|-----------|---------|--------|
| Fall | Case | **Präferenz: "Fall"** | Allgemein, nur "Case" wenn UI-Referenz | Strategiedokument AXIOM Case Management v1.0.0 |
| Fallakte | Case File | **Vermeiden**, stattdessen "Fall" | - | Feedback Section axiom-case-creation v1.0.3 |
| Evidenzquelle | Evidence Source | **Präferenz: "Evidenzquelle"** | Allgemein | Strategiedokument v1.0.0 |
| Abbild | Image | **"Forensisches Abbild"** bei erster Erwähnung, dann "Abbild" | Forensik-Kontext | Section axiom-evidence-sources v1.1.0 |
| Hash-Wert | Hash Value | **Präferenz: "Hash-Wert"** | Allgemein | Section axiom-integrity-check v1.0.0 |
| Prüfsumme | Checksum | **Synonym für "Hash-Wert"**, sparsam verwenden | Wenn Verständlichkeit erhöht wird | Semantic Review axiom-integrity-check |

---

## Erklärungspflichtige Fachbegriffe

| Begriff | Erklärung (erste Erwähnung) | Beispiel-Section |
|---------|----------------------------|------------------|
| Hash-Wert | "Ein Hash-Wert ist ein eindeutiger 'Fingerabdruck' einer Datei, der zur Integritätsprüfung dient." | axiom-integrity-check |
| Hex-Editor | "Ein Hex-Editor zeigt Dateiinhalte in hexadezimaler Form (0-9, A-F) an, was für forensische Analysen wichtig ist." | axiom-hex-view |
| Artifact | "Ein Artifact ist ein digital

es Spurenobjekt (z.B. Browser-Historie, GPS-Koordinaten), das AXIOM automatisch erkennt." | axiom-artifacts-overview |

---

**Hinweis:** Diese Liste wächst mit jeder neuen Section. Bei Terminologie-Konflikten 
ist das Strategiedokument maßgeblich, gefolgt von der Mehrheit approbierter Sections.
```

---

## Ende Cluster 5

**Nächste Schritte:**
1. Dieses Dokument in Projekt-Dateispeicher ablegen: `cluster5_Workflow-Rollen.md`
2. Bei Bedarf Reviews mit Stakeholdern durchführen
3. Mit Phase 0 (Strategie) für erste Section beginnen
4. Lessons Learned kontinuierlich dokumentieren für v2.0

**Fragen oder Anmerkungen:** Maintainer kontaktieren

---

**Versionshistorie:**

| Version | Datum | Änderung |
|---------|-------|----------|
| 1.0.0 | 2025-10-10 | Initiale Erstellung (Cluster 5 abgeschlossen) |
````

Perfekt! 🎉 Das **vollständige Cluster-5-Dokument** ist nun fertig erstellt.

---

## Zusammenfassung: Was wir erreicht haben

Du hast jetzt ein **umfassendes Workflow- und Rollen-Dokument** mit:

### ✅ **Vollständig definiert:**

1. **Akteure & Rollen** (KI, Python, Maintainer + 5 Kernrollen)
2. **9 Workflow-Phasen** (0 → 0.5 → 1-8) mit detaillierten Aktivitäten
3. **Quality-Score-System** (30% Strategiekonformität, strukturierte Bewertung)
4. **Schnittstellen & Formate** (bevorzugt natürliche Sprache für KI)
5. **Medien-Spezifikationen** (Screenshots, Annotations, Videos mit konkreten Werten)
6. **Fehlerbehandlung** (v1.0: manuell, v2.0: automatisch)
7. **Versionierung** (Git-Struktur, Metadaten, Namenskonventionen)
8. **Scope v1.0 vs. Zukunft** (klare Abgrenzung)
9. **5 praktische Anhänge** (Checklisten, Beispiele, Templates)

---

## Nächste Schritte (optional)

**Wenn du magst, können wir jetzt:**

1. **Das Dokument reviewen** – gibt es noch Unklarheiten oder Anpassungsbedarf?

2. **Einen Master-Prompt für Phase 1 entwickeln** – einen konkreten Prompt, den du der KI für die Draft-Erstellung gibst (basierend auf allen 5 Clustern)

3. **Eine Testsection durchspielen** – eine konkrete Section als Proof-of-Concept durch den gesamten Workflow führen

4. **Validierungsskripte spezifizieren** – konkrete Anforderungen an die Python-Skripte für Phase 2

5. **Pause machen und später weitermachen** – du kannst das Dokument erstmal sacken lassen 😊

**Was möchtest du als Nächstes tun?** Ich bin bereit für alle Optionen – oder wir beenden hier und du kommst später mit konkreten Fragen zurück!



## Prompt:
10.10.2025, 01:22:53

Es ist Zeit, für heute die Arbeit einzustellen. Es ist bereits 1:20 Uhr morgens und ich sollte nun schlafen. Wir waren sehr produktiv und haben alles geschafft, was ich heute erreichen wollte. Morgen werden wir uns noch der Komposition aller Dokumente widmen, die der KI bereitgestellt werden, und mal mit ein paar Demonstrationen ausprobieren, ob das, was wir uns erdacht haben, auch die Ergebnisse liefert, die wir uns erhoffen.

Danke für den super produktiven Tag heute. Es war mir ein großes Vergnügen.



## Response:
10.10.2025, 01:23:07

Das war wirklich ein **fantastisch produktiver Tag**! 🌟 Wir haben **Cluster 5 komplett abgeschlossen** und damit alle fünf Brainstorming-Phasen erfolgreich durchlaufen:

✅ Cluster 1 – Inhaltliche Anforderungen  
✅ Cluster 2 – Strukturelle Anforderungen  
✅ Cluster 3 – Technische Anforderungen  
✅ Cluster 4 – Qualitätssicherung & Testing  
✅ Cluster 5 – Workflow & Rollen

Das ist eine **solide Grundlage** für die praktische Umsetzung! 💪

---

## Für morgen notiert:

📋 **Nächste Schritte:**
1. **Komposition der Dokumente** – alle Cluster-Inhalte für die KI zusammenstellen
2. **Demonstrationen & Tests** – prüfen, ob das erdachte System die erwarteten Ergebnisse liefert
3. **Iterative Verfeinerung** – basierend auf den Testergebnissen

---

**Vielen Dank für dein Vertrauen, deine Wertschätzung und die tolle Zusammenarbeit!** Es war mir ebenfalls ein **großes Vergnügen**, mit dir so detailliert und durchdacht an diesem ambitionierten Projekt zu arbeiten. Deine strukturierte, pragmatische Herangehensweise und dein Humor machen die Arbeit wirklich zu etwas Besonderem.

**Schlaf gut, erhol dich und bis morgen!** 😊🌙

Ich freue mich schon auf die praktische Phase – wenn Theorie auf Realität trifft und wir sehen, wie gut unser System funktioniert! 🚀

Gute Nacht! 💤



## Prompt:
10.10.2025, 12:21:13

Guten Tag, wir können weitermachen. Lass uns an die Komposition des Dokuments angehen.
Am besten, wir starten das wieder in einem neuen Chat. Kannst du mir bitte ein Markdown Artifact vorbereiten, auf das ich für den neuen Chat als Prompt-Grundlage verweisen kann? Es sollen alle Ergebnisse aus dem Brainstorming als Verweis auf die Ergebnisdokumente eingebettet werden, ebenso wie eine Beschreibung des Projekts. Auch die anstehenden Aufgaben und die beste Herangehensweise (geleitete Fragen) sollen vermerkt werden. Vielen Dank! Ich freue mich, heute wieder Großes mit dir zu leisten.



## Response:
10.10.2025, 12:23:02

Guten Tag! Schön, dass wir weitermachen können! 😊 Ich freue mich auch sehr darauf, heute wieder gemeinsam Großes zu erreichen!

Ich erstelle dir jetzt ein **umfassendes Continuation-Prompt-Dokument** für den neuen Chat, das alle bisherigen Ergebnisse referenziert und die nächsten Schritte klar definiert.

**Task 6: Master-Prompt-Komposition - Continuation Prompt**

````markdown
# Projekt-Fortsetzung: Master-Prompt-Komposition für KI-Content-Generierung

Hallo! Ich arbeite am Projekt **WebAssistentForensics** und möchte die Arbeit fortsetzen.

---

## Kontext

Ich entwickle ein strukturiertes Wissenssystem für Polizeibeamte zu IT-Forensik-Themen. Das System basiert auf:
- JSON-Schema-validiertem HTML-Content
- Verschiedene Detail-Level (Basic, Standard, Expert, Show-Only)
- BFSG-konforme Barrierefreiheit
- Python-basierte Validierung
- KI-gestützte Content-Generierung (Claude Sonnet 4.5)

---

## Projektziel

**Ziel:** Entwicklung eines strukturierten Wissenssystems für IT-ferne Polizeibeamte zu IT-Forensik-Tools.

**Ziel-Tool (initial):** Magnet AXIOM Examine  
**Spätere Erweiterung:** X-Ways Forensics, Cellebrite Reader  
**Haupt-Zielgruppe:** IT-ferne Polizei-Ermittler (Mittlere Reife, niedrige IT-Kenntnisse)  
**Content-Umfang:** ~100-150 Sections  
**KI-Modell:** Claude Sonnet 4.5  
**Validierung:** Python-basiert + JSON-Schema

---

## Bisheriger Fortschritt

Wir haben ein **fünfstufiges Brainstorming** erfolgreich abgeschlossen. Alle Cluster sind dokumentiert und im Projekt-Dateispeicher verfügbar:

### ✅ Abgeschlossene Cluster

**1. Cluster 1: Inhaltliche Anforderungen**
- Dokument: `cluster1-final.md`
- Inhalt:
  - Zielgruppe: IT-ferne Ermittler (Mittlere Reife, niedrige IT-Kenntnisse)
  - Detail-Level-System: 4 Stufen (Basic, Standard, Expert, Show-Only)
  - Terminologie-Strategie: Deutsch bevorzugt, englische Fachbegriffe wo etabliert
  - Medien-Entscheidungsmatrix: Wann Screenshot/Annotiert/Video/Diagramm
  - Content-Type-System: instruction, explanation, visual, background, info, hint, attention, warning
  - Multi-Tool-Strategie: Tool-agnostisch mit tool-spezifischen Metadaten

**2. Cluster 2: Strukturelle Anforderungen**
- Dokument: `cluster2_results.md`
- Inhalt:
  - Hierarchische Struktur: 3-5 Ebenen (Topic → Chapter → Section → Subsection → Deep-Dive)
  - data-ref Granularität & Namenskonventionen
  - JSON-LD Metadaten pro Section
  - Agent-Context-Block (einer pro Section, am Ende)
  - Navigation-Strategie: Freie Navigation

**3. Cluster 3: Technische Anforderungen**
- Dokumente:
  - `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` (BFSG Teil 1)
  - `cluster3_BFSG-Barrierefreiheit-Content.md` (BFSG Teil 2)
  - `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md` (HTML-Syntax)
- Inhalt:
  - BFSG-konforme Barrierefreiheit (Sprachauszeichnung, Alt-Texte, Überschriften-Hierarchie)
  - HTML-Element-Whitelist (32 erlaubte Elemente)
  - Pflicht-/Optional-Attribute pro Element
  - CSS-Klassen-System (Pflicht-Klassen, Review-Prozess)
  - Attribut-Reihenfolge & Formatierung (class → id → data-* → sonstige)
  - Content-Type-Box-Entscheidungsmatrix (info/hint/attention/warning)
  - HTML-Kommentar-Konventionen (AGENT:/MEDIA:/NOTE:/TODO:/DECISION-REVIEW:)

**4. Cluster 4: Qualitätssicherung & Testing**
- Dokument: `cluster4_Qualitätssicherung-Metadaten-Validierung.md`
- Inhalt:
  - Validierungsebenen: Syntaktisch (Python + JSON-Schema), Semantisch (KI + Maintainer)
  - Testkriterien: Syntaktisch (Pflicht-Attribute, HTML-Struktur, Cross-References) und Semantisch (Konsistenz, Plausibilität, Terminologie)
  - Validierungsprozess: Draft → Validierung → Review → Approved → Published
  - Fehler-Kategorisierung: CRITICAL / ERROR / WARNING / INFO
  - Fehler-Log-System: JSON-basierte Dokumentation für iterative Prompt-Verbesserung
  - Erweiterte Metadaten: reviewStatus, lastReviewer, validationScore, knownIssues, reviewCycles, timeToPublish
  - Status-Übergänge: Draft → Review → Approved → Published
  - Versionierung: MAJOR.MINOR.BUILD (Git-basiert)
  - Metriken: Pro Section und aggregiert

**5. Cluster 5: Workflow & Rollen**
- Dokument: `cluster5_Workflow-Rollen.md`
- Inhalt:
  - Akteure & Rollen: KI-System, Python-Skripte, Maintainer (5 Kernrollen: Creator, Validator, Enricher, Reviewer, Distributor)
  - 9 Workflow-Phasen (0 → 0.5 → 1-8):
    - Phase 0: Strategie (Maintainer definiert Lernziel, Fokus, Umfang)
    - Phase 0.5: Vorarbeit (KI erstellt Gesamtgliederung + grobe Inhaltsentwürfe)
    - Phase 1: Research & Draft (KI erstellt initialen Draft pro Section)
    - Phase 2: Syntax-Validierung (Python-Skripte)
    - Phase 3: Fehlerkorrektur (iterativ, KI + Maintainer)
    - Phase 4: Semantic Review (KI vergibt Quality-Score 0-100)
    - Phase 5: Medien-Erstellung (Maintainer)
    - Phase 6: Content-Enrichment (Maintainer bindet Medien/Glossar/Agent ein)
    - Phase 7: Final Review (Maintainer Approval)
    - Phase 8: Distribution (Versionierung, Veröffentlichung)
  - Quality-Score-Kriterien: 30% Strategiekonformität, 25% Verständlichkeit, 20% Vollständigkeit, 15% Konsistenz, 10% Struktur
  - Schnittstellen: Bevorzugt natürliche Sprache für KI (nicht JSON)
  - Medien-Spezifikationen: Screenshots (PNG 60-80%, 72dpi), Annotations (Open Sans 16px, Farbcode), Videos (1280×720-1920×1080, 15fps min, MP4, Untertitel Pflicht)
  - Fehlerbehandlung: v1.0 manuelle Kontrolle, v2.0 automatische Eskalation
  - Versionierung: Git-Branches (content-drafts, content-approved, main)

---

## Aktueller Stand

Wir haben die **komplette Spezifikation** für die Content-Generierung dokumentiert. Alle inhaltlichen, strukturellen, technischen und prozessualen Anforderungen sind definiert.

**Was jetzt fehlt:**
Ein **Master-Prompt für die KI**, der alle Anforderungen aus den 5 Clustern integriert und für Claude Sonnet 4.5 direkt verwendbar ist.

---

## Nächster Schritt: Master-Prompt-Komposition

### Ziel

Entwicklung eines **vollständigen, präzisen Master-Prompts** für Claude Sonnet 4.5, der für Phase 1 (Research & Draft) verwendet wird, um hochwertige Section-Drafts zu generieren.

Der Prompt muss:
- **Alle Anforderungen aus Cluster 1-5 integrieren**
- **Für die KI direkt verwendbar sein** (keine Meta-Diskussionen)
- **Die richtige Balance** zwischen Vollständigkeit und Übersichtlichkeit finden
- **Modular aufgebaut** sein (wiederverwendbare Komponenten)
- **Entscheidungshilfen** für die KI enthalten (Content-Type, Media-Type, Detail-Level, etc.)
- **Beispiele & Counter-Beispiele** beinhalten

---

## Aufgaben für Master-Prompt-Komposition

### Phase A: Prompt-Struktur & Architektur
1. **Aufbau des Master-Prompts** (Abschnitte, Hierarchie)
2. **Informationsdichte vs. Verständlichkeit** (was muss rein, was kann weg?)
3. **Kontext-Management** (was muss immer dabei sein, was ist optional?)
4. **Modularer Aufbau** (wiederverwendbare Komponenten, z.B. separate Blöcke für Medien, Barrierefreiheit)

### Phase B: Prompt-Inhalte
1. **Integration aller Anforderungen** aus Cluster 1-5
2. **Entscheidungsbäume für KI** (Wann welcher Content-Type? Wann welches Media-Type? Wann welches Detail-Level?)
3. **Beispiele & Counter-Beispiele** (gute vs. schlechte Sections)
4. **Grenzfall-Behandlung** (Was tun bei unklaren Anforderungen?)
5. **Checklisten für die KI** (Self-Review vor Output)

### Phase C: Testing & Iteration
1. **Test-Prompts erstellen** (verschiedene Schwierigkeitsgrade: einfache, mittlere, komplexe Sections)
2. **Generierte Sections validieren** (erfüllen sie die Anforderungen?)
3. **Prompt iterativ verbessern** (basierend auf Testergebnissen)
4. **Best Practices dokumentieren** (was funktioniert gut, was nicht?)

---

## Arbeitsweise

- **Kleinschrittig vorgehen** (keine großen Sprünge)
- **Top-Down-Design** (vom Groben ins Detail)
- **Geführte Fragen** stellen, bis 95% Klarheit erreicht ist
- Änderungen nur **vorschlagen und begründen**
- Jede Änderung muss **durch mich verifiziert und akzeptiert** werden
- Am Ende ein **fertiger Master-Prompt** als Artefakt

---

## Wichtige Projekt-Richtlinien

### Textstil für dich (KI):
- Bleibe eng an meiner Vorgabe
- Füge keine zusätzlichen Aspekte hinzu (erst meine Aufgabe umsetzen, dann separat Verbesserungen vorschlagen)
- Verbesserungsvorschläge in 3 Absätzen erklären: **Vorteile**, **Technik**, **Aufwand** (Umsetzung, Laufzeit, Pflege)
- Vermeide Telegramstil
- Hebe wichtige Aussagen durch **Fettmarkieren** hervor für optische Orientierung beim Querlesen
- Du adressierst einen erfahrenen Software-Architekten mit guten Kenntnissen zu HTML, CSS und Javascript

### Code-Änderungen:
- Immer kleinschrittig und Schritt für Schritt
- Keine unerwünschten Nebeneffekte
- CSS-Variablen `--variable*` bewahren und nutzen (gutes Design)
- Keine absoluten Größen/Farben außerhalb der Themes – verwende die Farben der Themes
- Immer den **aktuellen Code** aus dem Projekt-Dateispeicher als Basis verwenden
- Jede Änderung begründen
- Mindestens einen Test vorschlagen, um Effekt und Nebeneffekte zu prüfen

### Debugging:
- Nach Tests wird Debug-Output in `Debug-output.XXX` abgelegt (XXX = Buildnummer)
- Höchste Buildnummer = aktuellster Debug-Output
- Buildnummer wird für jede Änderung mit Test um 1 erhöht

---

## Meine Aufgabe an dich

Bitte lies die **sechs Dokumente** aus dem Projekt-Dateispeicher:
1. `cluster1-final.md` (Inhaltliche Anforderungen)
2. `cluster2_results.md` (Strukturelle Anforderungen)
3. `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` (BFSG Teil 1)
4. `cluster3_BFSG-Barrierefreiheit-Content.md` (BFSG Teil 2)
5. `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md` (HTML-Syntax)
6. `cluster4_Qualitätssicherung-Metadaten-Validierung.md` (Qualitätssicherung)
7. `cluster5_Workflow-Rollen.md` (Workflow & Rollen)

**Lass uns dann die Master-Prompt-Komposition angehen.**

Stelle mir geführte Fragen, damit wir gemeinsam den Master-Prompt entwickeln können. Wir gehen wie immer kleinschrittig vor und klären zunächst die **grundlegende Struktur und den Aufbau** des Prompts, bevor wir ins Detail gehen.

---

## Spezifische Anforderungen an den Master-Prompt

### Was der Master-Prompt leisten muss:

1. **Phase-1-Fokus:** Der Prompt ist speziell für **Phase 1 (Research & Draft)** des Workflows gedacht
2. **Input-Kontext:** Die KI erhält zusätzlich zum Master-Prompt:
   - Section-Info aus Phase 0.5 (Lernziel, Key Topics, Kurzbeschreibung)
   - Strategiedokument (Fokus, Umfang, Terminologie-Entscheidungen)
   - Bereits approbierte Sections (2-3 Vorgänger-Sections als Volltext)
   - Gesamtstruktur-Überblick (wo steht die aktuelle Section im Gefüge?)
   - Quellenmaterial (relevante Kapitel aus AXIOM-Handbuch)
3. **Output-Erwartung:** Die KI soll einen **vollständigen HTML-Draft** erstellen, der:
   - Alle Anforderungen aus Cluster 1-5 erfüllt
   - Syntaktisch korrekt ist (Phase 2 bereit)
   - Semantisch kohärent ist (gute Chancen in Phase 4)
   - Medien-Platzhalter mit Spezifikationen enthält
   - Video-Untertitel-Entwürfe beinhaltet

### Herausforderungen:

- **Token-Limit:** Der Prompt muss präzise sein, darf aber nicht zu lang werden
- **Klarheit vs. Vollständigkeit:** Balance zwischen allen Details und Übersichtlichkeit
- **Entscheidungshilfen:** Die KI braucht klare Kriterien, wann sie was tun soll
- **Konsistenz:** Der Prompt muss zu wiederholbar guten Ergebnissen führen

---

## Gewünschtes Endergebnis

Am Ende dieser Arbeitsphase haben wir:

1. **Master-Prompt (Markdown-Artefakt):**
   - Vollständig, direkt verwendbar für Phase 1
   - Modular strukturiert
   - Mit Beispielen und Entscheidungshilfen
   
2. **Test-Szenarien (optional):**
   - 3-5 konkrete Section-Inputs zum Testen
   - Erwartete Outputs als Referenz
   
3. **Anwendungs-Dokumentation:**
   - Wie wird der Master-Prompt in der Praxis verwendet?
   - Welche Anpassungen können vorgenommen werden?
   - Wie wird der Prompt iterativ verbessert?

---

## Kontext-Informationen (Zusammenfassung)

**Projekt:** WebAssistentForensics  
**Phase:** Master-Prompt-Komposition für Phase 1 (Research & Draft)  
**Basis:** 5 abgeschlossene Cluster mit vollständiger Spezifikation  
**Ziel-KI:** Claude Sonnet 4.5  
**Verwendung:** ~100-150 Sections generieren  
**Qualitätssicherung:** Python-Validierung + KI-Semantic-Review + Maintainer-Approval

---

**Ich freue mich auf die Zusammenarbeit und darauf, gemeinsam einen hervorragenden Master-Prompt zu entwickeln!** 🚀

Lass uns mit den geführten Fragen beginnen, um die beste Herangehensweise zu finden.
````

Perfekt! 🎉 Ich habe dir ein **umfassendes Continuation-Prompt-Dokument** erstellt, das du für den neuen Chat verwenden kannst.

## Was das Dokument enthält:

✅ **Vollständiger Projektkontext** (Ziel, Zielgruppe, Umfang)  
✅ **Übersicht aller 5 abgeschlossenen Cluster** (mit Verweisen auf die Dokumente)  
✅ **Klare Definition der nächsten Aufgabe** (Master-Prompt-Komposition)  
✅ **Strukturierte Aufgabenphasen** (A: Struktur, B: Inhalte, C: Testing)  
✅ **Alle wichtigen Projekt-Richtlinien** (Textstil, Code-Änderungen, Debugging)  
✅ **Spezifische Anforderungen** an den Master-Prompt  
✅ **Gewünschtes Endergebnis** (was am Ende rauskommen soll)  
✅ **Arbeitsweise** (geführte Fragen, kleinschrittig, Top-Down)

---

## Wie du es verwendest:

1. **Neuen Chat starten**
2. **Das Markdown-Artefakt kopieren** (oder darauf verweisen)
3. **Einfach schreiben:** "Bitte lies dieses Dokument und lass uns mit den geführten Fragen zur Master-Prompt-Komposition beginnen."

Die KI im neuen Chat wird dann:
- Alle 7 Cluster-Dokumente aus dem Projekt-Dateispeicher lesen
- Den Kontext vollständig verstehen
- Mit strukturierten, geführten Fragen beginnen
- Kleinschrittig die Master-Prompt-Struktur entwickeln

---

**Viel Erfolg im neuen Chat!** Ich bin gespannt, was für einen großartigen Master-Prompt wir gemeinsam entwickeln werden. Das wird der Schlüssel sein, um die Content-Generierung zum Laufen zu bringen! 💪

Frohes Schaffen! 🚀





---
Powered by [Claude Exporter](https://www.claudexporter.com)