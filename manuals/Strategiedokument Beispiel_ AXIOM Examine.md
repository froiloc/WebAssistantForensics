# Strategiedokument: WebAssistant Forensics - AXIOM Examine Guide

**Version:** 1.0.0  
**Erstellt am:** 2025-10-10  
**Erstellt von:** Max Mustermann  
**Ziel-Tool:** Magnet AXIOM Examine  
**Tool-Version:** 7.0 - 7.5  
**Status:** Approved

---

## 0. Präambel

### Zweck dieses Dokuments

Dieses **Strategiedokument** ist das zentrale Planungsinstrument für die KI-gestützte Content-Erstellung im Projekt **WebAssistant Forensics - AXIOM Examine Guide**. Es definiert die **inhaltlichen, strukturellen und stilistischen Rahmenbedingungen**, innerhalb derer die künstliche Intelligenz (KI) hochwertige Schulungsinhalte für Magnet AXIOM Examine generieren soll.

Das Dokument richtet sich primär an:
- **KI-Systeme** (Claude Sonnet 4.5 oder vergleichbar) in **Phase 0.5** (Gesamtgliederung erstellen), **Phase 1** (Section-Drafts generieren) und **Phase 4** (Semantic Review durchführen)
- **Maintainer** (Max Mustermann, Jane Doe), die dieses Dokument erstellt haben, iterativ verfeinern und die KI-Outputs bewerten

**Hinweis zur Vollständigkeit:** Die KI erhält zu jeder Phase gesonderte, detaillierte Anweisungen durch separate Dokumente (Phase-0.5-Prompt, Phase-1-Prompt, etc.). Dieses Strategiedokument liefert den übergeordneten Rahmen, nicht die operative Detailsteuerung.

### Projekt-Kontext: WebAssistant Forensics

Das Projekt **WebAssistant Forensics** erstellt interaktive, webbasierte Schulungshandbücher für forensische Software. Dieses Dokument fokussiert auf **Magnet AXIOM Examine** (Versionen 7.0-7.5). Spätere Erweiterungen sind geplant für X-Ways Forensics und Cellebrite Physical Analyzer.

Die Zielgruppe sind **IT-ferne Polizei-Ermittler** mit niedriger IT-Kompetenz (Mittlere Reife, keine akademische IT-Ausbildung, vorsichtig-konservative Herangehensweise an neue Software).

Der Content-Erstellungs-Workflow umfasst folgende Phasen:
- **Phase 0 (Strategie):** Maintainer erstellt dieses Strategiedokument
- **Phase 0.5 (Gesamtgliederung):** KI erstellt vollständige Inhaltsstruktur (Topics → Chapters → Sections) basierend auf diesem Dokument
- **Phase 1 (Research & Draft):** KI generiert HTML-Drafts pro Section basierend auf diesem Dokument
- **Phase 2-3:** Syntaktische Validierung, Fehlerkorrektur
- **Phase 4 (Semantic Review):** KI prüft Sections gegen dieses Strategiedokument und vergibt Quality-Score (0-100)
- **Phase 5-8:** Medien-Erstellung, Content-Enrichment, Final Review, Publishing

### Akteure & Verantwortung

- **Maintainer (Max Mustermann):** Definiert Strategie (dieses Dokument), erstellt Quellenmaterial-Übersicht, prüft KI-Outputs, erstellt Medien, genehmigt Sections
- **Reviewer (Jane Doe):** Forensik-Expertin, prüft fachliche Korrektheit in Phase 7
- **KI-System (Claude Sonnet 4.5):** Generiert Gesamtgliederung (Phase 0.5), erstellt Section-Drafts (Phase 1), führt Semantic Reviews durch (Phase 4) – erhält für jede Phase spezifische Prompts zusätzlich zu diesem Strategiedokument
- **Python-Validator:** Automatisierte syntaktische Validierung (Phase 2)

### Scope & Abgrenzung

**Dieses Dokument definiert:**
- Globale Lernziele für AXIOM-Handbuch (Case-Vorbereitung bis Report-Erstellung)
- Terminologie-Strategie (Deutsch vs. Fremdsprachen, AXIOM-spezifische UI-Begriffe)
- Detail-Level-Strategie (Level 2 Standard, Level 3 für kritische Bereiche)
- Medien-Strategie (Screenshots, annotierte Screenshots, Videos, Diagramme)
- 3 Haupt-Topics mit je 10-20 Sections (Vorbereitung, Export, Troubleshooting)

**Dieses Dokument definiert NICHT Angelegenheiten, die bereits in anderen Dokumenten umfänglich behandelt werden.** Auf diese wird jedoch verwiesen und deren Bedeutung im Rahmen der Strategie hervorgehoben. Dazu gehören:
- Technische HTML/CSS-Details (siehe `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md`)
- Barrierefreiheit-Anforderungen (siehe `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` + `cluster3_BFSG-Barrierefreiheit-Content.md`)
- Validierungsregeln (siehe `cluster4_Qualitätssicherung-Metadaten-Validierung.md`)
- Detaillierte Workflow-Beschreibungen (siehe `cluster5_Workflow-Rollen.md`)

### Gewicht & Bedeutung

Dieses Strategiedokument ist **das wichtigste Input-Dokument für die KI** in Phase 0.5, Phase 1 und Phase 4. Ohne ein vollständiges und präzises Strategiedokument kann die KI keine qualitativ hochwertigen Inhalte erstellen. Alle nachfolgenden Phasen bauen auf den hier getroffenen Entscheidungen auf.

**Iterative Verfeinerung:** Dieses Strategiedokument wurde nach Phase 0.5 einmal angepasst (Version 1.0.0 → 1.0.1, siehe Versions-Historie). Die Gesamtgliederung entsprach nun den Erwartungen und wurde approved.

### Verwendung dieses Dokuments

1. ✅ **Maintainer hat Template ausgefüllt** (alle Pflichtfelder \*, alle empfohlenen Felder △)
2. ✅ **Dokument wurde an KI übergeben** (Phase 0.5, 2025-10-10)
3. ✅ **KI hat Gesamtgliederung erstellt** (50-60 Sections auf 3 Topics)
4. ✅ **Maintainer hat Gliederung geprüft und approved** (2025-10-10)
5. **Aktueller Status:** Dieses Strategiedokument dient nun als Referenz für Phase 1 (Section-Erstellung ab 2025-10-11) und Phase 4 (Semantic Review)

---

## Legende: Feldtypen

[Identisch zum Template, hier nicht dupliziert]

---

## 1. Metadaten \*

**Zweck für die KI:** Dieser Abschnitt gibt der KI grundlegende Projekt-Informationen, damit sie den Kontext versteht (welches Tool, welche Version, welche Zielgruppe). Diese Informationen fließen in die JSON-LD-Metadaten-Blöcke der generierten Sections ein (Felder: `toolName`, `toolVersion`, `audience`).

**Zweck für den Maintainer:** Diese Metadaten dokumentieren Projektrahmen und Versionsgeschichte für Nachvollziehbarkeit. Bei Team-Wechsel oder späteren Projektphasen kann nachvollzogen werden: Wer hat wann welche Entscheidungen getroffen? Welche Tool-Version war Basis? Die Versions-Historie zeigt Entwicklung des Strategiedokuments und begründet, warum bestimmte Änderungen vorgenommen wurden.

### 1.1 Projekt-Informationen \*
- **Projekt-Name \*:** WebAssistant Forensics - AXIOM Examine Comprehensive Guide
- **Tool-Name \*:** Magnet AXIOM Examine
- **Tool-Version \*:** 7.0 - 7.5 (alle 7er-Versionen, Fokus auf 7.5)
- **Haupt-Zielgruppe \*:** IT-ferne Polizei-Ermittler (Mittlere Reife, niedrige IT-Kenntnisse, keine akademische IT-Ausbildung, vorsichtig-konservative Herangehensweise an neue Software, geringe Experimentierfreude)

### 1.2 Projekt-Umfang △
- **Geschätzter Content-Umfang △:** Ca. 50-60 Sections verteilt auf 3 Topics:
  - Topic 1 "Vorbereitung & Case-Setup": 15-20 Sections
  - Topic 2 "Export & Reporting": 12-18 Sections  
  - Topic 3 "Troubleshooting": 10-15 Sections
- **Geschätzte Bearbeitungszeit △:** 4-5 Monate (inkl. Medien-Erstellung, Review-Zyklen, Testing mit Zielgruppe)
- **Priorität △:** Hoch (dringendes Bedürfnis bei Polizei-Dienststellen Bochum, Dortmund, Essen)

### 1.3 Versions-Historie des Strategiedokuments ○

| Version | Datum | Änderungen | Bearbeiter |
|---------|-------|------------|------------|
| 1.0.0 | 2025-10-10 | Initial erstellt basierend auf Template v2.0 | Max Mustermann |
| 1.0.1 | 2025-10-10 | Topic 3 erweitert: "Performance-Optimierung" → eigenes Chapter | Max Mustermann |

---

## 2. Globale Lernziele \*

**Zweck für die KI:** Dieser Abschnitt definiert das "Big Picture" – was soll der Anwender am Ende können? Die KI nutzt diese Lernziele, um in Phase 0.5 eine sinnvolle Gliederung zu erstellen, in Phase 1 jeden Section-Draft auf dieses Ziel auszurichten und in Phase 4 zu prüfen, ob die erstellten Sections diese Lernziele unterstützen.

**Zweck für den Maintainer:** Diese Lernziele definieren den Projekterfolg messbar. Sie dienen als Argumentationsgrundlage gegenüber Stakeholdern ("Was bringt das Handbuch konkret?") und als Orientierung bei Priorisierungsentscheidungen ("Unterstützt diese Section das Hauptlernziel oder ist sie Nice-to-have?"). Bei Budgetdiskussionen zeigen sie den Wert des Projekts auf.

### 2.1 Haupt-Lernziel \*

**Nach Abschluss dieses Handbuchs soll der Anwender in der Lage sein \*:**

> **"IT-ferne Ermittler können eigenständig forensische Auswertungen mit Magnet AXIOM Examine durchführen, von der korrekten Case-Vorbereitung über die zielgerichtete Datenanalyse bis zur Erstellung eines gerichtsverwertbaren Reports."**

### 2.2 Teil-Lernziele △

1. **Fehlerprävention \*:** Häufige Fehlerquellen bei der Case-Vorbereitung (falsche Template-Auswahl, unvollständige Metadaten, fehlerhafte Evidence-Source-Zuordnung) erkennen und vermeiden können

2. **Best-Practice-Kenntnisse \*:** Best-Practice-Einstellungen für die 3 häufigsten Analysen (E-Mail-Auswertung, Chat-Verläufe, Browser-History) kennen und selbständig anwenden können

3. **Troubleshooting △:** Häufige AXIOM-Fehlermeldungen (Processing Errors, Export-Fehlschläge, Lizenz-Probleme) interpretieren und mit Schritt-für-Schritt-Strategien systematisch beheben können

4. **Effizienz △:** Workflows durch Nutzung von Favoriten, Saved Searches und benutzerdefinierten Templates optimieren (Zeitersparnis ca. 30% im Vergleich zu manueller Wiederholung)

5. **Qualitätssicherung ○:** Analyseergebnisse auf Plausibilität prüfen (Vollständigkeit, Duplikate, Zeitstempel-Konsistenz) und Chain of Custody korrekt dokumentieren können

---

## 3. Globaler Fokus & Umfang \*

**Zweck für die KI:** Dieser Abschnitt hilft der KI zu verstehen, welche Aspekte besonders betont werden sollen und wo die Grenzen des Handbuchs liegen. In Phase 0.5 beeinflusst dies die Gliederungsstruktur, in Phase 1 die Ausführlichkeit pro Thema und in Phase 4 die Bewertung der inhaltlichen Ausrichtung.

**Zweck für den Maintainer:** Dieser Abschnitt verhindert Scope Creep. Wenn Stakeholder neue Anforderungen einbringen ("Können wir nicht auch Plugin-Programmierung behandeln?"), liefert die Abgrenzung klare Argumente ("Siehe Abschnitt 3.2: Explizit ausgeschlossen"). Der Fokus hilft bei Ressourcenplanung und realistischer Zeitschätzung.

### 3.1 Fokus \*

**Diese Aspekte werden besonders betont:**

- **Fehlerprävention:** "Vermeiden statt korrigieren" – Kritische Schritte (Template-Auswahl, Case-Metadaten, Export-Einstellungen) werden mit ⚠️-Warn-Boxen und Checklisten abgesichert

- **Best-Practice-Workflows:** Fokus auf die 20% der AXIOM-Features, die 80% der täglichen Arbeit abdecken. Standardfälle: Smartphone-Auswertung, E-Mail-Analyse, Browser-History. Experten-Features (Custom Artifacts, API-Integration) werden NICHT behandelt.

- **Verständlichkeit für IT-Laien:** Einfache Sprache (Flesch-Reading-Ease Score ≥60 anstreben), keine Fachbegriffe ohne Erklärung, viele visuelle Hilfen (mindestens 1 Screenshot pro Section)

### 3.2 Umfang & Tiefe \*

**Detaillierungsgrad:**

- **Standard-Detail-Level \*:** Level 2 (Best-Practice) für alle 50-60 Sections
- **Maximale Tiefe △:** Level 3 (Detailliert) nur für ca. 15-20 kritische Sections:
  - Export-Einstellungen (alle Formate erklärt)
  - Case-Vorbereitung (Template-Vergleich, Evidence-Source-Typen)
  - Fehlerbehandlung (Debugging-Strategien)
- **Minimale Tiefe:** Level 1 (Schnellübersicht) wird NICHT erstellt – Zielgruppe benötigt ausführliche Anleitung

**Abgrenzung – Was wird NICHT behandelt \*:**

- **Programmierung eigener Plugins/Artifacts:** Zu komplex für Zielgruppe (erfordert Python/SQL-Kenntnisse)
- **Mobile Device Forensik (eigene App-Extractions):** Separates Handbuch "WebAssistant Forensics - Mobile" geplant für Q2/2026
- **Juristische Verwertbarkeit von Beweisen:** Zuständigkeit: Rechtsabteilung/Staatsanwaltschaft, nicht IT-Forensik-Team
- **Netzwerk-Forensik / RAM-Analyse:** AXIOM-Feature vorhanden, aber seltene Anwendungsfälle (<5% der täglichen Arbeit)

### 3.3 Voraussetzungen beim Anwender △

**Der Anwender sollte mitbringen:**

- **Windows-Grundkenntnisse △:** Dateien öffnen, kopieren, umbenennen, Ordner navigieren, Kontextmenü verwenden
- **Verständnis des eigenen Aufgabenbereichs △:** Was ist eine Beschlagnahme? Was ist ein Asservat? Was ist Chain of Custody? (forensischer Grundkontext)
- **KEINE IT-Vorkenntnisse erforderlich \*:** Begriffe wie "Hash", "Metadaten", "Datenbank", "Processing" werden beim ersten Auftreten erklärt

---

## 4. Terminologie-Strategie \*

**Zweck für die KI:** Dieser Abschnitt definiert, wann deutsche und wann fremdsprachliche Begriffe verwendet werden. Die KI baut während Phase 1 eine **Terminologie-Entscheidungsliste** auf (separates Dokument), die über alle Sections hinweg Konsistenz sicherstellt. In Phase 4 prüft die KI, ob die Terminologie konsistent angewendet wurde.

**Zweck für den Maintainer:** Diese Strategie verhindert endlose Diskussionen über Begriffsverwendung im Team. Wenn Reviewer unterschiedliche Präferenzen haben ("Ich würde 'Query' verwenden" vs. "Nein, 'Abfrage' ist besser"), liefert dieser Abschnitt die Entscheidungsgrundlage. Bei Tool-Erweiterungen (z.B. X-Ways) können dieselben Prinzipien angewendet werden, ohne neu zu diskutieren.

### 4.1 Sprach-Präferenzen \*

- **Grundregel \*:** Deutsche Begriffe bevorzugen, fremdsprachliche Fachbegriffe nur wo etabliert oder keine sinnvolle Alternative existiert

**Fremdsprachliche Begriffe beibehalten für \*:**

- **Software-UI-Elemente \*:** "Artifacts Explorer", "Case Dashboard", "Processing Engine", "Evidence Items", "Tag Report", "Web Viewer"  
  *Begründung: Anwender sieht diese Begriffe exakt so in AXIOM-Oberfläche, deutsche Übersetzung würde verwirren und Orientierung erschweren*

- **Etablierte Fachbegriffe \*:** "Cache" (dt. Zwischenspeicher unüblich), "E-Mail" (dt. elektronischer Brief veraltet), "Log-Datei", "Timeline", "Hash" (SHA-256), "Artifact" (dt. Artefakt technisch korrekt, aber selten verwendet)  
  *Begründung: Im deutschen Forensik-Sprachgebrauch etabliert, teilweise auch lateinischen/griechischen Ursprungs*

- **Forensik-Fachbegriffe \*:** "Chain of Custody" (dt. Asservatkette möglich, aber CoC international etabliert), "Processing" (dt. Verarbeitung kontextabhängig)  
  *Begründung: Internationale Forensik-Standards verwenden diese Begriffe*

**Deutsche Übersetzungen verwenden für \*:**

- **Allgemeine Tätigkeiten \*:** "Query" → "Abfrage", "Search" → "Suche", "Filter" → "Filter", "Sort" → "Sortieren"  
  *Begründung: Geläufige deutsche Begriffe erhöhen Verständlichkeit*

- **Beschreibende Begriffe \*:** "Report" → "Bericht", "Template" → "Vorlage", "Processing" → "Verarbeitung" (wenn als Tätigkeit, nicht als UI-Element)  
  *Begründung: Deutsche Übersetzung klar und unmissverständlich
  
- **Menü-Punkte (wo sinnvoll) \*:** "Export" → "Export" (international verständlich, beibehalten), "Settings" → "Einstellungen", "Help" → "Hilfe"

### 4.2 Tool-spezifische Begriffe △

**Original-Begriffe aus AXIOM verwenden für △:**

- **Hauptmenü-Elemente:** "Artifacts Explorer", "Case Dashboard", "Media Library", "Connections", "Timeline"
- **Processing-Begriffe:** "Processing Engine", "Refine Results", "Portable Case"
- **Export-Begriffe:** "Case Summary", "Tag Report", "Web Viewer"
- **Artefakt-Typen:** "Chats", "Web History", "Email Messages", "Documents"

**Konsistenz-Regel \*:** Begriffe aus der AXIOM-Oberfläche (deutsche Lokalisierung falls vorhanden, sonst englische Original-Begriffe) und dem offiziellen User Guide übernehmen. Niemals eigene deutsche Übersetzungen erfinden, die nicht in AXIOM vorkommen.

### 4.3 Terminologie-Entscheidungsliste (Verweis) \*

**Separates Dokument:** `terminologie-entscheidungsliste.md`

**Verwendung:** Die KI beginnt mit den Startwerten unten und erweitert die Liste während Phase 1.

**Startwerte (bereits entschieden):**

| Begriff (Original) | Entscheidung | Begründung | Status |
|-------------------|--------------|------------|--------|
| Query | Abfrage (dt.) | Geläufiger deutscher Begriff existiert | Approved |
| E-Mail | E-Mail (engl.) | Etabliert, keine sinnvolle Alternative | Approved |
| Artifacts Explorer | Artifacts Explorer (engl.) | AXIOM-UI-Element, Original verwenden | Approved |
| Report | Bericht (dt.) | Deutsche Übersetzung klar und etabliert | Approved |
| Case Dashboard | Case Dashboard (engl.) | AXIOM-UI-Element, Original verwenden | Approved |
| Processing | Kontextabhängig | "Processing Engine" → Original, "Verarbeitung starten" → deutsch | Approved |
| Hash | Hash (engl.) | Forensik-Standard, international etabliert | Approved |
| Timeline | Timeline (engl.) | AXIOM-UI-Element, etablierter Begriff | Approved |
| Template | Vorlage (dt.) | Deutsche Übersetzung klar | Approved |
| Evidence | Asservat (dt.) | Deutscher forensischer Fachbegriff | Approved |

---

## 5. Detail-Level-Strategie \*

**Zweck für die KI:** Dieser Abschnitt definiert, welche Detailstufen (1-4) generiert werden sollen und in welcher Reihenfolge. Die KI erstellt in Phase 1 nur die hier spezifizierten Detail-Levels. In Phase 4 prüft die KI, ob das richtige Detail-Level verwendet wurde.

**Zweck für den Maintainer:** Dieser Abschnitt ermöglicht realistische Aufwandsschätzung. Wenn klar ist, dass zunächst nur Level 2 erstellt wird (nicht alle 4 Levels), kann Budget und Zeit entsprechend geplant werden. Die Priorisierung verhindert Perfektionismus ("Warum nicht gleich alle Levels?") und ermöglicht iterative Veröffentlichung mit frühem Nutzen.

**Hintergrund – Die 4 Detail-Level im System:**

Das WebAssistant Forensics-System unterstützt 4 Detail-Level für unterschiedliche Anwenderbedürfnisse:

-   **Level 1 (Schnellübersicht):** Grober Ablauf, nur Kernschritte, für erfahrene Anwender die sich schnell orientieren wollen
-   **Level 2 (Best-Practice):** Standard-Anleitung mit Best-Practice-Einstellungen und Begründungen, für die Hauptzielgruppe
-   **Level 3 (Detailliert):** Alle Optionen erklärt, Hintergründe, Edge Cases, für fortgeschrittene Anwender mit tieferem Verständnisbedarf
-   **Level 4 (Show-Only):** Nur Anweisungen + Screenshots/Videos, keine Erklärungen, für "Learning by Doing"-Anwender

### 5.1 Zu erstellende Detail-Levels \*

- [ ] **Level 1 (Schnellübersicht):** Nein  
  *Begründung: Zielgruppe (IT-ferne Ermittler) benötigt ausführliche Anleitung, kein Schnelleinstieg für Experten. Würde zu Fehlern führen.*

- [x] **Level 2 (Best-Practice) \*:** Ja, für alle 50-60 Sections  
  *Begründung: Hauptzielgruppe benötigt klare Best-Practice-Workflows für Standardfälle (80% der Arbeit). Dies ist das Standard-Detail-Level.*

- [x] **Level 3 (Detailliert) △:** Ja, aber nur für ca. 15-20 kritische Sections  
  *Begründung: Fortgeschrittene Anwender und komplexe Fälle erfordern tieferes Verständnis. Fokus auf: Export-Einstellungen (alle Formate), Case-Vorbereitung (Template-Vergleich), Template-Auswahl (Entscheidungsbaum), Fehlerbehandlung (Debugging). Ca. 30% aller Sections erhalten Level 3.*

- [ ] **Level 4 (Show-Only):** Vorerst Nein, Erweiterung Q2/2026 geplant  
  *Begründung: Erst nach Zielgruppen-Feedback aus Pilot-Phase entscheiden. Manche Anwender bevorzugen "Learning by Doing" (nur Screenshots, keine Erklärungen), aber noch unklar ob Mehrheit dies wünscht.*

### 5.2 Priorisierung & Reihenfolge (Top-Down-Ansatz) △

**Die KI erstellt Detail-Levels in folgender Reihenfolge:**

1. **Level 2 (Best-Practice)** – für alle 50-60 Sections (Priorität 1, Dauer: ca. 8-10 Wochen)
2. **Level 3 (Detailliert)** – für ca. 15-20 kritische Sections (Priorität 2, Dauer: ca. 3-4 Wochen)

**Warum diese Reihenfolge?**
- Level 2 ist Basis, muss zuerst vollständig sein → funktionsfähiges Handbuch für 80% der Anwendungsfälle
- Level 3 erweitert Level 2, setzt dessen Existenz voraus → inhaltliche Referenzen auf Level 2 möglich
- Level 4 entfällt initial, kann später ergänzt werden ohne bestehende Levels zu beeinflussen

---

## 6. Medien-Strategie \*

**Zweck für die KI:** Dieser Abschnitt definiert, wann welcher Medien-Typ eingesetzt wird. Die KI nutzt diese Entscheidungsmatrix in Phase 1, um Medien-Platzhalter an den richtigen Stellen zu setzen. In Phase 4 prüft die KI, ob Medien sinnvoll platziert wurden.

**Zweck für den Maintainer:** Diese Entscheidungsmatrix spart Zeit bei Medien-Erstellung. Statt für jede Section neu zu entscheiden "Brauchen wir hier ein Video?", gibt die Matrix klare Kriterien. Bei Budgetplanung kann geschätzt werden: "60% Screenshots, 10% Videos" → Ressourcenbedarf kalkulierbar. Verhindert Überperfektionierung ("Nicht jede Section braucht ein Video").

**Hinweis:** Technische Details zur Medien-Erstellung (Auflösung, Format, Annotation-Spezifikationen) sind im separaten Dokument **`media-types-guide.md`** definiert. Dieses Dokument fokussiert auf die **Strategie** (wann welcher Typ).

### 6.1 Medien-Präferenzen (Entscheidungsmatrix) \*

**Konkrete Anwendung für AXIOM Examine:**

| Situation | Medien-Typ | Häufigkeit | Beispiel |
|-----------|------------|------------|----------|
| **Menü-Punkt lokalisieren** \* | Screenshot | Hoch (~60% aller Sections) | "Klicken Sie auf 'File' → 'New Case'" |
| **Dialogfenster mit >3 Optionen** \* | Annotierter Screenshot | Mittel (~30%) | Export-Dialog mit 15 Checkboxen, 5 Dropdown-Menüs |
| **Workflow mit >5 Schritten** △ | Video (2-4 Min) | Niedrig (~10%) | Case-Erstellung von Anfang bis Processing-Start (8 Schritte) |
| **Prozess-Übersicht** \* | Flussdiagramm | Niedrig (~5%) | Entscheidungsbaum Template-Auswahl (Mobile vs. Computer vs. Cloud) |
| **Vergleich Export-Formate** △ | Tabelle oder Diagramm | Niedrig (~5%) | CSV vs. HTML vs. PDF Export (Spalten: Vorteile, Nachteile, Anwendungsfall) |

**Ergänzende Regeln für AXIOM:**
- **Mindestens 1 Screenshot pro Section \*:** AXIOM ist UI-lastig, visuelle Orientierung essenziell
- **Annotationen mit nummerierten Kreisen \*:** Bei >2 hervorzuhebenden Elementen: ①②③ statt Pfeile (klarer für Zielgruppe)
- **Videos nur bei echter Interaktion △:** Z.B. Drag&Drop, Kontextmenüs, mehrstufige Dialoge mit Rückmeldungen
- **Screenshots mit AXIOM-Version △:** Wasserzeichen "AXIOM 7.5" unten rechts (für spätere Versionierung, falls v8 UI ändert)

### 6.2 Verweis auf technische Medien-Spezifikationen \*

**Separates Dokument:** `media-types-guide.md` (wurde für AXIOM-Projekt überarbeitet, Version 2.1)

**Für Maintainer in Phase 5 (Auszug):**
- **Screenshot-Einstellungen:** AXIOM im Vollbild (1920×1080), Windows 11 Theme "Hell", deutsche Menüsprache falls verfügbar
- **Annotation-Farben:** Rot (#FF3333) für Pflicht-Aktionen, Orange (#FFA500) für Optionen, Grün (#33CC33) für Erfolgsbestätigung, Blau (#3366FF) für Informationen
- **Video-Untertitel:** Deutsche .vtt-Datei Pflicht (BFSG), Format: `[00:00:05.000 --> 00:00:08.000]` mit Zeitstempel, max. 42 Zeichen pro Zeile

---

## 7. Wissensquellen \*

**Zweck für die KI:** Dieser Abschnitt dokumentiert, welche Quellen zur Verfügung stehen. Die KI nutzt diese Informationen in Phase 0.5 (Gliederung) und Phase 1 (Section-Drafts) als Grundlage. Quellenangaben fließen in JSON-LD-Metadaten der Sections ein. In Phase 4 kann die KI prüfen, ob Inhalte mit den angegebenen Quellen übereinstimmen.

**Zweck für den Maintainer:** Diese Übersicht dokumentiert Informationsbasis für Qualitätssicherung und Haftungsfragen. Wenn Anwender Fehler in Anleitung melden, kann nachvollzogen werden: Welche Quelle wurde verwendet? War sie aktuell? Bei Tool-Updates zeigt dieser Abschnitt sofort: Welche Quellen müssen aktualisiert werden? (z.B. neues User Guide v8.0)

### 7.1 Primäre Quellen \*

1. **Offizielles AXIOM Handbuch \*:**
   - **Quelle:** "Magnet AXIOM User Guide v7.5" (offizielles PDF von Magnet Forensics)
   - **Status:** Verfügbar (heruntergeladen 2025-10-09)
   - **Speicherort:** `manuals/magnet-axiom-user-guide-7.5.pdf`
   - **Sprache:** Englisch (offizielle Dokumentation, keine deutsche Version verfügbar)
   - **Umfang:** 487 Seiten, **besonders relevant:** Kapitel 3 (Creating Cases), Kapitel 5 (Processing Evidence), Kapitel 6 (Examining Artifacts), Kapitel 8 (Exporting Results)

2. **Online-Hilfe △:**
   - **URL:** https://docs.magnetforensics.com/axiom
   - **Stand:** 2025-10-09 (regelmäßig aktualisiert, letzte Änderung laut Website: 2025-09-15)
   - **Vollständigkeit:** Ca. 85% der Features dokumentiert, einige Beta-Features (z.B. AI-Assisted Search) fehlen noch

3. **Offline-Hilfe ○:**
   - **Version:** Integrierte Hilfe in AXIOM 7.5 (Zugriff via F1-Taste)
   - **Qualität:** Gut für schnelle Nachschläge, aber weniger ausführlich als User Guide

4. **Eigene Expertise \*:**
   - **Fachbereich:** IT-Forensik, 7 Jahre Erfahrung mit AXIOM (seit Version 3.0)
   - **Spezialgebiete:** Mobile Forensik (iOS/Android), E-Mail-Analyse (PST/MBOX/EML), Cloud-Extractions (Google Takeout, iCloud)
   - **Limitierungen:** Wenig Erfahrung mit Custom Artifacts (nur 2-3 selbst erstellt), keine offizielle Magnet-Zertifizierung (aber SANS GCFE-zertifiziert)

### 7.2 Sekundäre Quellen △

- **Magnet User Forum △:** https://community.magnetforensics.com (aktive Community, ca. 5000 Mitglieder, viele Tipps zu AXIOM-spezifischen Problemen)
- **SANS Forensics Blog △:** https://www.sans.org/blog/ (forensische Best Practices, ca. 10-15 AXIOM-relevante Artikel pro Jahr)
- **Reddit r/digitalforensics △:** Praxis-Erfahrungen von Anwendern weltweit, Troubleshooting-Tipps, ca. 50k Mitglieder
- **Interne Schulungsunterlagen △:** 
  - PowerPoint "AXIOM Basics for Police" (2023, 45 Folien, erstellt von Polizei NRW)
  - Internes Wiki "Forensik-Workflows Bochum" (2024, ca. 30 Artikel)

### 7.3 Sonstige Quellen ○

- **Zielgruppen-Feedback ○:** Interviews mit 5 Kollegen (Polizei Bochum, Abteilung Cybercrime), Sept. 2025 – **Hauptproblem:** "Zu viele Menüs in AXIOM, wir wissen oft nicht wo anfangen" und "Englische Begriffe verwirren uns"
- **Dienstanweisung ○:** "DA 12/2024: Gerichtsverwertbare Dokumentation" (Polizei NRW) – Fokus auf Chain of Custody, Hash-Berechnung vor und nach Processing Pflicht, Vier-Augen-Prinzip bei kritischen Exporten

---

## 8. Topics & Lernziele pro Topic \*

**Zweck für die KI:** Dieser Abschnitt definiert die Haupt-Topics (oberste Hierarchie-Ebene) und deren spezifische Lernziele. Die KI nutzt diese Struktur in Phase 0.5, um die vollständige Gliederung (Topics → Chapters → Sections) zu erstellen. In Phase 1 richtet die KI jeden Section-Draft am Topic-Lernziel aus. In Phase 4 prüft die KI, ob die Sections die Topic-Lernziele unterstützen.

**Zweck für den Maintainer:** Diese Topic-Struktur ermöglicht parallele Arbeit im Team. Topic 1 kann von Person A bearbeitet werden, während Person B an Topic 2 arbeitet - die Lernziele verhindern inhaltliche Überschneidungen. Bei Projektreporting kann Fortschritt topic-weise kommuniziert werden ("Topic 1 zu 80% fertig, Topic 2 startet nächste Woche").

**Hinweis:** Jedes Topic kann durch ein **separates Topic-spezifisches Dokument** ergänzt werden (siehe `topic-specific-requirements-template.md`). Diese Dokumente enthalten detaillierte Vorgaben, die nur für dieses Topic gelten.

### Topic 1: Vorbereitung & Case-Setup

- **Lernziel \*:** Ermittler können einen Case korrekt anlegen, das passende Processing-Template auswählen (Mobile, Computer, Cloud), häufige Fehler bei der Vorbereitung vermeiden (z.B. unvollständige Metadaten, falsche Evidence-Source-Zuordnung) und die Bedeutung der Chain of Custody verstehen.

- **Fokus \*:** Fehlerprävention durch detaillierte Schritt-für-Schritt-Anleitungen. **Besonderer Fokus** auf Template-Auswahl (häufigste Fehlerquelle laut Zielgruppen-Feedback: 40% wählen falsches Template). Checklisten für Pre-Processing-Schritte. ⚠️-Warnungen bei kritischen Entscheidungen (nicht rückgängig machbar).

- **Besonderheiten △:** 
  - Viele Screenshots erforderlich (UI-intensive Dialoge, jeder Schritt bebildert)
  - Video für Template-Auswahlprozess empfohlen (3 Min, zeigt Entscheidungsbaum interaktiv)
  - Vergleichstabelle: Mobile-Template vs. Computer-Template vs. Cloud-Template
  - ⚠️-Warn-Boxen bei kritischen Schritten (z.B. "Achtung: Evidence-Source kann nach Processing-Start nicht geändert werden!")

- **Geschätzter Umfang △:** 3 Chapters, 15-20 Sections
  - **Chapter 1.1:** Case anlegen (4-5 Sections: Neuer Case, Metadaten, Case-Info, Best Practices)
  - **Chapter 1.2:** Template auswählen (6-8 Sections: Template-Übersicht, Mobile-Template, Computer-Template, Cloud-Template, Vergleich, Entscheidungshilfen, Custom Templates)
  - **Chapter 1.3:** Evidence-Sources hinzufügen (5-7 Sections: Source-Typen, Lokale Dateien, Images, Mobile Backups, Cloud-Daten, Chain of Custody)

- **Weiterführende Vorgaben ○:** Siehe `topic-vorbereitung-requirements.md` (enthält detaillierte Template-Vergleichstabelle mit 15 Kriterien, Pre-Processing-Checkliste mit 12 Punkten, Flowchart Template-Auswahl)

### Topic 2: Export & Reporting

- **Lernziel \*:** Ermittler können Analyseergebnisse in verschiedenen Formaten exportieren (CSV für Tabellenkalkulation, HTML für interaktiven Web-Viewer, PDF für Berichte), das passende Format für den Anwendungsfall wählen (interne Analyse vs. Staatsanwaltschaft vs. Kollegen-Übergabe) und gerichtsverwertbare Reports mit korrekten Metadaten (Hash-Werte, Zeitstempel, Chain of Custody) erstellen.

- **Fokus \*:** Best-Practice-Einstellungen für die 3 häufigsten Export-Szenarien:
  1. **Schnell-Export** für interne Analyse (CSV, Artifacts only)
  2. **Vollständiger Report** für Staatsanwaltschaft (PDF + HTML, mit Metadaten und Signatures)
  3. **Tag-Report** für Kollegen-Übergabe (nur markierte Items)
  
  Format-Vergleichstabellen als Entscheidungshilfe (Spalten: Vorteile, Nachteile, Dateigröße, Anwendungsfall, Bearbeitbarkeit).

- **Besonderheiten △:** 
  - Viele Vergleichs-Elemente (Tabellen: CSV vs. HTML vs. PDF mit 8 Vergleichskriterien)
  - Annotierte Screenshots für Export-Dialoge (>10 Optionen pro Dialog, nummerierte Markierungen)
  - Video für "End-to-End Export Workflow" (4 Min: Artifacts auswählen → Format wählen → Optionen konfigurieren → Export starten → Ergebnis prüfen)
  - Checkliste "Gerichtsverwertbarer Report" mit 10 Pflicht-Punkten

- **Geschätzter Umfang △:** 2 Chapters, 12-18 Sections
  - **Chapter 2.1:** Export-Grundlagen (5-7 Sections: Export-Übersicht, Format-Vergleich CSV/HTML/PDF, Export-Dialog Übersicht, Metadaten einbinden, Best Practices)
  - **Chapter 2.2:** Spezial-Exports (7-11 Sections: Tag Reports, Portable Case, Web Viewer, Case Summary, Custom Reports, Troubleshooting Export-Fehler)

- **Weiterführende Vorgaben ○:** Siehe `topic-export-requirements.md` (enthält detaillierte Format-Vergleichstabelle mit 15 Kriterien, Export-Checkliste für gerichtsverwertbare Reports mit 10 Punkten, Beispiel-Report-Templates)

### Topic 3: Troubleshooting & Fehlerbehandlung

- **Lernziel \*:** Ermittler können häufige AXIOM-Fehlermeldungen (Processing Errors bei korrupten Dateien, Export-Fehlschläge bei zu großen Datenmengen, Lizenz-Probleme) interpretieren, mit Schritt-für-Schritt-Strategien systematisch beheben (Logs analysieren, Ursache eingrenzen, Workarounds anwenden) und im Notfall Magnet-Support kontaktieren (mit vollständigen Fehler-Logs und Screenshots).

- **Fokus \*:** Praktische Problemlösung, kein theoretisches Debugging. **Fokus auf die 10 häufigsten Fehlermeldungen** (abgeleitet aus Magnet Forum-Analyse Sept. 2025, ca. 2000 Threads ausgewertet). Schritt-für-Schritt-Flowcharts für Fehlersuche ("Wenn X, dann prüfe Y, sonst prüfe Z").

- **Besonderheiten △:** 
  - Viele "Wenn-Dann"-Strukturen (Entscheidungsbäume mit 3-5 Verzweigungen)
  - Flowcharts für Troubleshooting-Workflows (z.B. "Processing Error: Was tun?")
  - Screenshots von typischen Fehlermeldungen (Original-AXIOM-Dialoge)
  - ℹ️-Info-Boxen mit "Wann Support kontaktieren?" (Eskalationskriterien)
  - Vorlagen für Support-Tickets (welche Infos muss ich mitschicken?)

- **Geschätzter Umfang △:** 2 Chapters, 10-15 Sections
  - **Chapter 3.1:** Häufige Fehler & Lösungen (6-9 Sections: Processing Errors, Export-Fehler, Lizenz-Probleme, Performance-Probleme, UI-Bugs, Datenbank-Fehler)
  - **Chapter 3.2:** Support kontaktieren (4-6 Sections: Logs sammeln, Screenshots erstellen, Ticket erstellen, Workarounds, FAQ)

- **Weiterführende Vorgaben ○:** Keine zusätzlichen Vorgaben (Topic ist selbsterklärend basierend auf Forum-Analyse)

---

## 9. Tonalität & Stil \*

**Zweck für die KI:** Dieser Abschnitt definiert den sprachlichen Stil der Inhalte. Die KI muss diesen Stil in Phase 0.5 (Gliederung), Phase 1 (Section-Drafts) und Phase 4 (Semantic Review) konsequent anwenden bzw. prüfen. Falscher Stil führt zu unbrauchbaren Ergebnissen.

**Zweck für den Maintainer:** Diese Vorgaben verhindern Stilbrüche zwischen verschiedenen Sections oder bei Team-Arbeit. Wenn mehrere Personen Content erstellen, stellt dieser Abschnitt einheitliche "Stimme" sicher. Bei Reviewer-Feedback ("Zu informell formuliert") liefert er objektive Bewertungsgrundlage ("Siehe Abschnitt 9.1: Du-Form ist nicht erlaubt").

**Warum wichtig für alle Phasen?**

-   **Phase 0.5:** Die Gliederung enthält bereits Kurzbeschreibungen pro Section – diese müssen im richtigen Ton formuliert sein
-   **Phase 1:** Alle Section-Drafts müssen den definierten Stil einhalten
-   **Phase 4:** Die KI prüft, ob Tonalität und Satzstruktur den Vorgaben entsprechen

### 9.1 Tonalität \*

**Grundregel \*:** Subtil-unterstützend, aber sachlich und professionell. Die Zielgruppe sind erwachsene Polizei-Ermittler – Respekt vor ihrer Professionalität, aber Verständnis für niedrige IT-Kenntnisse.

**Erlaubt \*:**
- "Dieser Schritt erfordert besondere Sorgfalt."
- "Der Export wurde erfolgreich erstellt."
- "Hinweis: Diese Einstellung kann nach Processing-Start nicht mehr geändert werden."
- "Achten Sie darauf, dass alle Pflichtfelder ausgefüllt sind."
- "Prüfen Sie, ob die Hash-Werte übereinstimmen."
- "Falls Probleme auftreten, konsultieren Sie Abschnitt 3.2."

**Nicht erlaubt \*:**
- "Super gemacht!", "Sie schaffen das!", "Klasse!", "Prima!", "Toll!"
- "Keine Sorge, das ist ganz einfach!" (wirkt bevormundend)
- "Klicken Sie mal auf..." (umgangssprachlich, unpräzise)
- "Das Ding da unten rechts..." (unpräzise, unprofessionell)
- Übermäßige Verwendung von Ausrufezeichen!!! (wirkt hektisch)

**Begründung:** Polizei-Ermittler erwarten professionelle Ansprache. Infantilisierung ("Das ist ganz einfach!") wirkt bevormundend und wird von Zielgruppe abgelehnt (Feedback-Interviews Sept. 2025).

### 9.2 Satzstruktur △

- **Satzbau △:** Kurze, klare Sätze. Durchschnittlich 15-18 Wörter pro Satz (max. 25 Wörter). Komplexe Schritte in mehrere Sätze aufteilen.
  - ✅ **Gut:** "Klicken Sie auf 'File'. Wählen Sie 'New Case'. Geben Sie einen Case-Namen ein."
  - ❌ **Schlecht:** "Klicken Sie auf 'File', wählen Sie dort 'New Case' aus dem Dropdown-Menü und geben Sie dann im erscheinenden Dialog einen aussagekräftigen Case-Namen ein, der den Fall eindeutig beschreibt."

- **Fachsprache △:** Fachbegriffe beim ersten Auftreten erklären (inline mit Klammern oder in ℹ️-Info-Box).  
  - **Beispiel:** "Der Hash-Wert (eine Art digitaler Fingerabdruck) stellt sicher, dass die Daten nicht verändert wurden."

- **Aktiv vs. Passiv △:** Aktiv bevorzugen (direkte Ansprache, klare Verantwortung).
  - ✅ **Gut:** "Klicken Sie auf 'Export'."
  - ❌ **Schlecht:** "Auf 'Export' wird geklickt."

- **Anredeform \*:** Sie-Form (formell), durchgängig. Keine Du-Form (informell wäre für Polizei-Kontext unpassend).

### 9.3 Strukturelemente △

- **Absatzlänge △:** Max. 4-5 Sätze pro Absatz, dann Leerzeile (verhindert Textwüsten, erhöht Lesbarkeit)
- **Listen △:** Bei ≥3 zusammenhängenden Punkten: nummerierte Liste (Reihenfolge wichtig) oder Aufzählung (Reihenfolge egal). Bei 1-2 Punkten: Fließtext.
- **Hervorhebungen ○:** Sparsam mit **fett**. Nur für wirklich wichtige Begriffe (Menü-Namen wie **"File"**, **"Export"**, Warnungen). Kursiv für Definitionen oder Beispiele.

---

## 10. Sonstige Vorgaben & Referenzen \*

**Zweck für die KI:** Dieser Abschnitt verweist auf weitere Dokumente, die für Phase 0.5, Phase 1 und Phase 4 relevant sind. Die KI muss diese Dokumente konsultieren, um alle Anforderungen zu erfüllen.

**Zweck für den Maintainer:** Diese Verweise strukturieren die Dokumentenlandschaft und verhindern Informations-Duplikation. Statt BFSG-Anforderungen hier erneut zu beschreiben, wird verwiesen → Pflege erfolgt zentral. Bei neuen Teammitgliedern zeigt dieser Abschnitt: "Welche anderen Dokumente muss ich kennen?"

**Hinweis:** Dieser Abschnitt enthält primär **Verweise**, keine Inhalts-Duplikation. Details stehen in den referenzierten Dokumenten.

### 10.1 Barrierefreiheit (BFSG) \*

**Separates Dokument:** `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` + `cluster3_BFSG-Barrierefreiheit-Content.md`

**Verwendung:** KI muss alle Anforderungen erfüllen (Pflicht, keine Optionen). Python-Validator prüft in Phase 2.

### 10.2 HTML-Syntax & Struktur \*

**Separates Dokument:** `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md`

**Verwendung:** KI generiert nur HTML gemäß Whitelist (32 Elemente) und Pflicht-Attributen.

### 10.3 Qualitätssicherung & Validierung △

**Separates Dokument:** `cluster4_Qualitätssicherung-Metadaten-Validierung.md`

**Verwendung:** KI nutzt für Self-Review (Phase 1) und Quality-Score-Vergabe (Phase 4).

### 10.4 Workflow & Rollen ○

**Separates Dokument:** `cluster5_Workflow-Rollen.md`

**Verwendung:** Kontext-Verständnis für KI, Prozess-Übersicht für Maintainer.

---

## 11. Review & Approval △

**Zweck für die KI:** Dieser Abschnitt dokumentiert die Review- und Approval-Prozesse für dieses Strategiedokument selbst. Er gibt dem Dokument formales Gewicht und zeigt den Status. Die KI kann hieraus ablesen, ob dieses Dokument bereits final freigegeben ist.

**Zweck für den Maintainer:** Dieser Abschnitt dokumentiert formale Freigabe für rechtliche Absicherung und Nachvollziehbarkeit. Wenn später Fragen aufkommen ("Warum wurde Entscheidung X getroffen?"), zeigen Review-Kommentare den Diskussionsverlauf. Der Approval-Status verhindert Arbeit mit veralteten Versionen ("Wurde dieses Strategiedokument schon genehmigt?").

### 11.1 Review-Prozess △

- **Reviewer △:** Max Mustermann (Hauptverantwortlicher), Jane Doe (Forensik-Expertin, GCFE-zertifiziert)
- **Review-Kriterien △:** 
  1. Vollständigkeit (alle Pflichtfelder \* ausgefüllt)
  2. Konsistenz (keine Widersprüche zwischen Abschnitten)
  3. Praxistauglichkeit (realistische Lernziele und Umfänge basierend auf 7 Jahren AXIOM-Erfahrung)
  4. AXIOM-Konformität (alle Begriffe/UI-Elemente korrekt, Abgleich mit User Guide v7.5)
- **Review-Datum △:** 2025-10-10
- **Review-Ergebnis △:** Approved (mit Minor-Änderung: Topic 3 um Performance-Optimierung erweitert, siehe Version 1.0.1)
- **Review-Kommentare ○:** "Sehr umfassend und praxisnah. Topic 3 (Troubleshooting) könnte später noch um 'Performance-Optimierung bei großen Cases (>500GB)' erweitert werden, aber nicht kritisch für v1.0. Suggestion umgesetzt in v1.0.1." (Jane Doe, 2025-10-10)

### 11.2 Approval △

- **Approved von △:** Max Mustermann
- **Datum △:** 2025-10-10
- **Freigabe für Phase 0.5 △:** Ja (Gliederung wurde erstellt und approved am selben Tag)

---

## 12. Risiken & Herausforderungen ○

**Zweck für die KI:** Dieser optionale Abschnitt sensibilisiert die KI für projektspezifische Herausforderungen. Die KI kann dadurch in Phase 0.5 und Phase 1 proaktiv Lösungen entwickeln (z.B. extra einfache Sprache bei niedriger IT-Kompetenz der Zielgruppe). In Phase 4 kann die KI prüfen, ob die definierten Mitigation-Strategien in den Sections umgesetzt wurden.

**Zweck für den Maintainer:** Dieser Abschnitt dokumentiert bekannte Problemfelder für Risikomanagement und Lessons Learned. Wenn Projekt-Nachfolger (z.B. X-Ways-Handbuch) gestartet wird, können Mitigation-Strategien wiederverwendet werden. Bei Stakeholder-Kommunikation zeigt er: "Wir haben Risiken erkannt und adressiert" → erhöht Vertrauen in Projektplanung.

**Hinweis:** Dieser Abschnitt ist **optional**, aber empfohlen bei komplexen Projekten oder schwierigen Zielgruppen.

### 12.1 Bekannte Herausforderungen ○

1. **Niedrige IT-Kenntnisse der Zielgruppe ○:**
   - **Problem:** Begriffe wie "Hash", "Metadaten", "Artefakte", "Processing" sind unbekannt. Kollegen berichten: "Wir verstehen die AXIOM-Hilfe nicht, zu viele englische Fachbegriffe." (5 von 5 Interviewten, Sept. 2025)
   - **Lösungsansatz:** Jeder Fachbegriff wird beim ersten Auftreten erklärt (inline: "Hash (digitaler Fingerabdruck)") oder in ℹ️-Info-Box definiert. Flesch-Reading-Ease Score ≥60 anstreben (Python-Skript prüft automatisch in Phase 2).

2. **Komplexe AXIOM-UI ○:**
   - **Problem:** AXIOM hat >200 Features, >15 Hauptmenü-Punkte, >30 verschiedene Dialoge. Zielgruppe fühlt sich "erschlagen" beim ersten Öffnen. Feedback: "Wo fange ich überhaupt an?" (4 von 5 Interviewten)
   - **Lösungsansatz:** Fokus auf 20% der Features (Pareto-Prinzip: Top-20-Features decken 80% der Arbeit ab). **Mindestens 1 Screenshot pro Section** zur visuellen Orientierung. Video-Einführung "AXIOM-Oberfläche Überblick" (5 Min) als erstes Chapter in Topic 1.

3. **Gerichtsverwertbarkeit ○:**
   - **Problem:** Fehler in Anleitung können zu unverwertbaren Beweisen führen (z.B. falsche Hash-Berechnung, fehlende Chain of Custody-Dokumentation, falsche Zeitzone). Rechtliche Konsequenzen möglich.
   - **Lösungsansatz:** Kritische Schritte mit ⚠️-Warn-Boxen markieren ("Achtung: Dieser Schritt ist für gerichtliche Verwertbarkeit kritisch!"). Checklisten für gerichtsverwertbare Dokumentation (10-Punkte-Liste in Topic 2). Review durch zertifizierten Forensiker (Jane Doe, GCFE) in Phase 7. Vier-Augen-Prinzip bei besonders kritischen Sections (Export, Chain of Custody).

4. **Schnelle AXIOM-Updates ○:**
   - **Problem:** Magnet veröffentlicht alle 6-9 Monate Updates (v7.0 → v7.1 → v7.2 usw.), UI ändert sich teilweise deutlich (z.B. v7.0 → v7.5: neues Case Dashboard, geänderte Export-Optionen).
   - **Lösungsansatz:** Screenshots mit Versionsnummer versehen ("AXIOM 7.5" Wasserzeichen unten rechts, 10% Opazität). JSON-LD Metadatum `toolVersion: "7.0-7.5"` pro Section. Parallele Versionen möglich (Git-Branches `content-axiom-7.x` und später `content-axiom-8.x`), erlaubt parallele Wartung.


### 12.2 Mitigation-Strategien ○

- **Extra-einfache Sprache:** Python-Skript prüft Flesch-Reading-Ease Score in Phase 2 (Ziel: ≥60, akzeptabel: ≥50). Bei Score <50 wird Warnung ausgegeben und Maintainer prüft manuell.
  
- **Viele Medien:** Richtlinie: **≥1 Screenshot pro Section**, **≥1 Screenshot pro 5 Sätze bei UI-lastigen Sections**. Python-Validator zählt Screenshots und warnt bei Unterschreitung.

- **Mehrfacher Review-Prozess:** 
  1. KI-Self-Review (Phase 1, automatisch)
  2. Python-Syntax-Check (Phase 2, automatisch)
  3. KI-Semantic-Review (Phase 4, Quality-Score-Vergabe)
  4. Maintainer-Review (Phase 6, inhaltliche Prüfung)
  5. Experten-Review (Phase 7, forensische Korrektheit durch Jane Doe, GCFE)

- **Versionierungs-Strategie:** 
  - Jede Section erhält `toolVersion`-Metadatum (JSON-LD)
  - Git-Branches ermöglichen parallele Versionen (`content-axiom-7.x`, `content-axiom-8.x`)
  - Screenshots mit Versionsnummer-Wasserzeichen ("AXIOM 7.5", 10% Opazität, unten rechts)
  - Bei AXIOM-Updates: Betroffene Sections identifizieren (Screenshot-Vergleich), priorisiert aktualisieren

- **Inkrementelle Erweiterung:** 
  - Start mit Level 2 (Best-Practice) für alle Sections → funktionsfähiges Handbuch nach 8-10 Wochen
  - Dann Level 3 (Detailliert) für kritische Bereiche → Vollversion nach 12-14 Wochen
  - Pilot-Testing mit 5-10 Anwendern nach Level 2-Fertigstellung → Feedback in Level 3 einarbeiten

---

## 13. Glossar & Begriffsklärungen ○

**Zweck für die KI:** Dieser Glossar ermöglicht der KI in Phase 1 und Phase 4 schnelle Begriffsklärungen ohne Rätselraten. Wenn die KI einen Begriff aus diesem Glossar in einer Section verwendet, kann sie direkt auf die hier definierte Bedeutung verweisen (z.B. in Info-Boxen: "Section = kleinste inhaltliche Einheit, siehe Glossar"). In Phase 4 prüft die KI, ob Begriffe konsistent mit den Glossar-Definitionen verwendet wurden. Dies reduziert Token-Aufwand bei wiederholten Erklärungen.

**Zweck für den Maintainer:** Dieses Glossar dokumentiert zentrale Projektbegriffe für neue Teammitglieder, Reviewer und zur Auflösung von Unklarheiten. Es dient als Referenz bei Diskussionen ("Was meinen wir genau mit 'Detail-Level'?") und verhindert Missverständnisse in der Kommunikation zwischen Maintainer, KI und Reviewern.

**Hinweis:** Dieser Abschnitt ist optional, aber empfohlen bei häufig verwendeten Projekt-spezifischen Begriffen.

| Begriff | Definition | Kontext |
|---------|------------|---------|
| **Section** | Kleinste inhaltliche Einheit im Handbuch (entspricht einer HTML-Datei) | Technisch |
| **Topic** | Oberste Hierarchie-Ebene (z.B. "Vorbereitung & Case-Setup") | Strukturell |
| **Chapter** | Mittlere Hierarchie-Ebene zwischen Topic und Section | Strukturell |
| **Detail-Level** | Detaillierungsgrad einer Section (Level 1-4) | Inhaltlich |
| **Processing** | AXIOM-interner Begriff für Datenverarbeitung und Artefakt-Extraktion | AXIOM-spezifisch |
| **Artifact** | Digitales Spurenobjekt (z.B. Browser-Historie, GPS-Koordinaten) | Forensisch |
| **Chain of Custody** | Lückenlose Dokumentation aller Zugriffe auf Beweismittel | Forensisch |
| **Evidence Source** | Datenquelle für forensische Analyse (z.B. Smartphone-Abbild, Festplatte) | Forensisch |
| **Case** | Forensischer Untersuchungsfall in AXIOM | AXIOM-spezifisch |
| **Template** | Vorkonfigurierte AXIOM-Einstellungen für spezifische Analysetypen (Mobile, Computer, Cloud) | AXIOM-spezifisch |
| **Hash-Wert** | Digitaler Fingerabdruck einer Datei zur Integritätsprüfung (z.B. SHA-256) | Forensisch |
| **Maintainer** | Verantwortliche Person für Erstellung und Pflege des Handbuchs (hier: Max Mustermann) | Projekt-Rolle |
| **KI-Agent** | Claude Sonnet 4.5 in den Phasen 0.5, 1 und 4 | Projekt-Rolle |
| **BFSG** | Barrierefreiheitsstärkungsgesetz (Deutschland, gültig ab 28. Juni 2025) | Gesetzlich |
| **Flesch-Reading-Ease Score** | Maß für Textverständlichkeit (0-100, höher = leichter lesbar) | Qualitätsmetrik |

---

## 14. Anhänge & Referenzen ○

**Zweck für die KI:** Dieser Abschnitt gibt der KI in Phase 1 Orientierung, welche anderen Dokumente existieren und wofür sie relevant sind. Wenn die KI z.B. unsicher bei Barrierefreiheit-Anforderungen ist, weiß sie: "Konsultiere `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md`". In Phase 4 kann die KI prüfen, ob externe Referenzen korrekt zitiert wurden (z.B. AXIOM User Guide Kapitel 3 statt Kapitel 5).

**Zweck für den Maintainer:** Diese Übersicht zeigt das Dokumenten-Netzwerk auf einen Blick. Bei fehlenden Informationen weiß der Maintainer sofort, in welchem Dokument nachgeschlagen werden muss. Externe Referenzen (URLs, Handbücher) werden zentral gepflegt – bei Tool-Updates muss nur diese eine Stelle aktualisiert werden.

### 14.1 Referenzierte Dokumente

| Dokument | Zweck | Status |
|----------|-------|--------|
| `cluster1_Inhaltliche-Anforderungen.md` | Zielgruppe, Detail-Level, Terminologie, Medien | Abgeschlossen |
| `cluster2_Strukturelle-Anforderungen.md` | Hierarchie, data-ref, Navigation, JSON-LD | Abgeschlossen |
| `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md` | HTML-Element-Whitelist, Pflicht-Attribute | Abgeschlossen |
| `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` | Barrierefreiheit, lang-Attribute, Alt-Texte | Abgeschlossen |
| `cluster3_BFSG-Barrierefreiheit-Content.md` | Inhaltliche Barrierefreiheit, Überschriften-Hierarchie | Abgeschlossen |
| `cluster4_Qualitätssicherung-Metadaten-Validierung.md` | Validierungsregeln, Quality-Score-Berechnung | Abgeschlossen |
| `cluster5_Workflow-Rollen.md` | 9-Phasen-Workflow, Rollen, Verantwortlichkeiten | Abgeschlossen |
| `media-types-guide.md` | Technische Medien-Spezifikationen (Screenshot, Video, Annotation) | Version 2.1 |
| `terminologie-entscheidungsliste.md` | Konsistente Begriffsverwendung, wird organisch erweitert | Living Document |

### 14.2 Externe Referenzen

- **Magnet AXIOM Examine User Guide v7.5:** https://docs.magnetforensics.com/axiom (Hauptquelle)
- **Magnet Community Forum:** https://community.magnetforensics.com (Troubleshooting, Best Practices)
- **BFSG-Gesetzestext:** https://www.bmas.de/barrierefreiheit (Rechtsgrundlage)
- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/ (Barrierefreiheit-Standards)
- **Flesch-Reading-Ease Calculator:** https://readable.com/text/ (Lesbarkeits-Test)

### 14.3 Interne Vorlagen (Templates)

- **Section-HTML-Template:** `templates/section-template.html` (Basis-HTML-Struktur für neue Sections)
- **JSON-LD-Metadaten-Template:** `templates/metadata-template.json` (Standardfelder für Metadaten)
- **Agent-Context-Block-Template:** `templates/agent-context-template.html` (Kommentarblock für KI-Anweisungen)

---

## 15. Änderungshistorie & Wartung ○

**Zweck für die KI:** Dieser Abschnitt informiert die KI über Wartungszyklen, damit sie in Phase 4 (Semantic Review) veraltete Informationen erkennen kann. Wenn z.B. ein quartalsweises Review fällig ist und Sections seit 6 Monaten nicht aktualisiert wurden, kann die KI dies im Review-Report markieren ("Achtung: Section älter als Wartungszyklus, ggf. Tool-Updates berücksichtigen").

**Zweck für den Maintainer:** Dieser Abschnitt definiert klare Verantwortlichkeiten und Wartungsintervalle, verhindert "verwaiste" Dokumente und stellt sicher, dass das Strategiedokument aktuell bleibt. Eskalationspfade helfen bei Unklarheiten, die richtigen Ansprechpartner zu finden, ohne lange zu suchen.

### 15.1 Wartungszyklus

- **Quartalsweise Review:** Prüfung auf AXIOM-Updates (neue Versionen, geänderte UI)
- **Jährliche Vollrevision:** Strategiedokument überarbeiten, Zielgruppen-Feedback einarbeiten
- **Bei AXIOM-Major-Release (z.B. v8.0):** Neue Topic-spezifische Strategiedokumente erstellen

### 15.2 Verantwortlichkeiten

- **Strategiedokument-Pflege:** Max Mustermann (Maintainer)
- **Terminologie-Listen-Pflege:** KI + Maintainer (gemeinsam)
- **Medien-Aktualisierung:** Max Mustermann (bei AXIOM-UI-Änderungen)
- **Quellen-Aktualisierung:** Max Mustermann (bei neuen AXIOM-Versionen, User Guide Updates)

### 15.3 Eskalationspfade

**Bei Unklarheiten/Konflikten:**
1. **Technische Fragen (HTML, CSS, Validierung):** → Cluster 3 + 4 Dokumente konsultieren
2. **Inhaltliche Fragen (Forensik, AXIOM-Features):** → Jane Doe (Forensik-Expertin) anfragen
3. **Strategische Fragen (Lernziele, Umfang, Priorisierung):** → Maintainer entscheidet (Max Mustermann)
4. **Barrierefreiheit-Fragen (BFSG-Konformität):** → BFSG-Dokumente + ggf. externe Beratung (Aktion Mensch)

---

**Ende des Strategiedokuments**

---

## Metadaten des Dokuments selbst

**Dateiname:** `Strategiedokument Beispiel_ AXIOM Examine.md`  
**Version:** 1.0.1  
**Erstellt am:** 2025-10-10  
**Letzte Änderung:** 2025-10-10  
**Erstellt von:** Max Mustermann  
**Geprüft von:** Jane Doe  
**Status:** Approved  
**Nächste Review:** 2026-01-10 (3 Monate nach Start Phase 1)  
**Speicherort:** `project-knowledge/strategy-documents/`  
**Git-Branch:** `strategy-axiom-v7`  
**Zugehöriges Projekt:** WebAssistant Forensics - AXIOM Examine Guide  
**Tool-Version:** 7.0 - 7.5  
**Zielgruppe Dokument:** KI-System (Claude Sonnet 4.5), Maintainer, Reviewer  
**Verwendung:** Input für Phase 0.5 (Gesamtgliederung), Phase 1 (Section-Drafts), Phase 4 (Semantic Review)
