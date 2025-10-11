# Prompt-Dokumentation: Cluster 5 - Workflow & Rollen

**Dateiname:** `prompt_005_cluster5_workflow.md`  
**Format:** Markdown  
**Speicherort:** `/project-diary/prompts/`

---

## Prompt Metadata

**Prompt-ID:** 005  
**Von Datum/Uhrzeit:** 10.10.2025 10:00 Uhr  
**Bis Datum/Uhrzeit:** 10.10.2025 12:00 Uhr  
**Projekttag:** Entwicklungswoche 2, Tag 5  
**Bearbeiter:** Projektleiter WebAssistentForensics  
**KI-Modell:** Claude 3.7 Sonnet  

---

## 📝 Original-Prompt

### Kontext (optional)

Nach Abschluss der Cluster 1-4 (Inhaltliche, Strukturelle, Technische Anforderungen sowie Qualitätssicherung) sollte nun der Workflow und die Rollen für die KI-gestützte Content-Generierung definiert werden. Ziel war es, die konkreten Arbeitsabläufe und Verantwortlichkeiten festzulegen, damit ~100-150 Sections systematisch und effizient erstellt werden können.

### Der Prompt

```
Bitte lies `task3-Continuation-Prompt-für-neuen-Chat.md` aus dem 
Projekt-Dateispeicher und folge den darin stehenden Anmerkungen 
und Anweisungen.

Ich freue mich auf die weitere Zusammenarbeit mit dir. Es macht 
mir viel Spaß und ich sehe einen guten Fortschritt.
```

Die Antwort der KI:

```
Ich freue mich sehr über dein positives Feedback und die gute Zusammenarbeit! Lass mich zunächst die relevante Datei aus dem Projekt-Dateispeicher lesen, um den aktuellen Stand und die spezifischen Anweisungen zu verstehen.

Vielen Dank für die ausführliche Einführung und das positive Feedback! Ich habe die Continuation-Prompts gelesen und verstehe nun den aktuellen Projektstand:

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
```

### Follow-up Prompts (falls vorhanden)

**Prompt 2:** (Klärung Workflow-Phasen)

```
Bezüglich des Workflows fehlt mir noch eine entscheidende, initiale 
Phase. Die Sections sollen zwar einzeln erstellt werden (Draft) aber 
sie sollen sich in ein Gesamtgefüge einpassen. Daher ist es wichtig, 
dass vor dem Draft noch eine Phase für die Erstellung des 
Content-Rahmens und des strategischen Zieles steht.

Diese geben der KI beim Draft die Leitplanken, was sie inhaltlich 
einbetten soll und was nicht, wo der Fokus gesetzt werden soll und 
so weiter.
```

Die Antwort der KI:

```
Ein **ausgezeichneter** Punkt! Du hast völlig Recht, dass eine initiale strategische Phase vor dem eigentlichen Draft-Prozess stehen muss. Diese fehlte tatsächlich in meinem ersten Entwurf.

## Überarbeiteter Workflow mit strategischer Phase

### Phase 0: Strategie & Content-Rahmen
**Verantwortlich:** Maintainer (Du)
**Output:** Strategiedokument mit:
- Lernzielen (Was sollen Benutzer nach Durcharbeitung können?)
- Fokus-Themen (Welche Aspekte des Tools sind zentral/peripher?)
- Umfang (Wie viele Sections? Wie detailliert?)
- Quellen-Priorisierung (Welche Kapitel des Handbuchs sind relevant?)
- Abgrenzung (Was soll explizit NICHT behandelt werden?)

### Phase 0.5: Gesamtstruktur-Entwicklung
**Verantwortlich:** KI mit Maintainer-Review
**Input:** Strategiedokument aus Phase 0
**Output:** 
- Gesamtgliederung mit allen geplanten Sections
- Kurzbeschreibung jeder Section (3-5 Sätze)
- Abhängigkeitsdiagramm (welche Section baut auf welcher auf?)

### Dann erst Phase 1: Research & Draft
**Verantwortlich:** KI
**Input:** 
- Strategiedokument (Phase 0)
- Gesamtgliederung (Phase 0.5)
- Section-spezifische Anforderungen
**Output:** HTML-Draft für spezifische Section

---

Diese Ergänzung ist **entscheidend** für Konsistenz, Fokussierung und strategische Ausrichtung. Ohne diese Phasen würden die einzelnen Sections zwar für sich genommen gut sein können, aber möglicherweise nicht optimal zusammenpassen oder wichtige Aspekte auslassen/unwichtige zu stark betonen.

Was denkst du zu dieser Erweiterung? Würdest du die Phasen 0 und 0.5 noch weiter ausdifferenzieren oder andere Aspekte ergänzen?
```

**Prompt 3:** (Detailfragen zum Workflow)

```
Dein Vorschlag ist hervorragend. Ich würde dich nun bitten, den Workflow zu detaillieren. Hier ein paar meiner Gedanken dazu.

KI-Instanzen als Reviewer:
1. Agent Blau (KI-Instanz 1) erstellt den Draft.
2. Agent Rot (KI-Instanz 2) reviewed den Draft.

Aber das ist nur eine erste Idee. Ich bin auf deine Empfehlungen gespannt! Die Basis-Rollen hast du schon richtig erkannt.

Wichtig für den Maintainer ist eine Checkliste, an der er ablesen kann, ob er von seiner Seite aus bereits alle Schnittstellen gefüllt hat, damit die KI sauber arbeiten kann (alle Inputs erstellt, Lernziele, etc. definiert).

Wichtig für das Python-Skript ist die Möglichkeit, automatisierte Fehlerbehandlung in den Prozess einzubauen, so dass es eine Rückkopplung und einen Lernprozess gibt, um die Anzahl der Fehler in den gleichen Bereichen zu reduzieren.

Frage: Wie kann ich als Maintainer die notwendigen Lernziele sauber formulieren? Du kannst hier gerne Vorschläge für Formulierungshilfen und einen Beispiel-Katalog anbieten.

Frage 2: Ist es hilfreich der KI eine Liste an priorisierten Quellen anzugeben?
```

Die Antwort der KI:

```
Deine Gedanken zum Workflow sind sehr wertvoll! Lass mich den gesamten Workflow detailliert ausarbeiten und auf deine spezifischen Punkte eingehen.

## Detaillierter 9-Phasen-Workflow

### Phase 0: Strategie (Maintainer)
**Verantwortlich:** Maintainer  
**Input:** AXIOM-Handbuch, Bedarfsanalyse  
**Output:** Strategiedokument

**Checkliste für Maintainer:**
- [ ] Lernziel definiert (siehe Formulierungshilfen unten)
- [ ] Fokusthemen festgelegt (primär/sekundär/peripher)
- [ ] Umfang bestimmt (Anzahl Sections, Detailtiefe)
- [ ] Quellen priorisiert (welche Kapitel aus AXIOM-Handbuch)
- [ ] Abgrenzung festgelegt (was wird NICHT behandelt)
- [ ] Fachlichen Kontext definiert (für welche polizeiliche Aufgabe)
- [ ] Verwendete AXIOM-Version spezifiziert

### Phase 0.5: Vorarbeit (KI-Instanz 1 + Maintainer-Review)
**Verantwortlich:** "Agent Blau" (KI-Instanz 1)  
**Input:** Strategiedokument, AXIOM-Handbuch  
**Output:** Gesamtstruktur

**Schritte:**
1. KI erstellt Gesamtgliederung aller Sections
2. KI formuliert 3-5 Satz-Beschreibung je Section
3. KI schlägt Abhängigkeitsbeziehungen vor
4. Maintainer-Review (iterativ bis Approval)

### Phase 1: Research & Draft (KI-Instanz 1)
**Verantwortlich:** "Agent Blau" (KI-Instanz 1)  
**Input:** Strategiedokument, Gesamtstruktur, Section-spezifische Anforderungen  
**Output:** HTML-Draft

**Schritte:**
1. Quellenmaterial lesen (priorisierte Kapitel)
2. HTML-Draft erstellen mit:
   - Barrierefreiheit nach BFSG
   - Alle Detail-Level
   - Content-Types zuweisen
   - Medien-Platzhalter einfügen
   - Terminologie-Konsistenz prüfen

### Phase 2: Syntax-Validierung (Python-Skripte)
**Verantwortlich:** Validierungs-Skripte  
**Input:** HTML-Draft  
**Output:** Validierungsbericht

**Automatisierte Prüfung von:**
1. HTML-Struktur (Whitelist-Elemente)
2. Pflicht-Attribute (data-*, class, etc.)
3. Cross-References (data-ref korrekt?)
4. JSON-LD Metadaten

### Phase 3: Fehlerkorrektur (KI-Instanz 1 + Python)
**Verantwortlich:** "Agent Blau" + Validierungsskript  
**Input:** Validierungsbericht + Draft  
**Output:** Korrigierter Draft

**Fehler-Lernschleife:**
1. Fehler im Error-Log dokumentieren (JSON)
2. KI korrigiert HTML basierend auf Validierungsbericht
3. Erneute Validierung
4. Iteration bis keine CRITICAL/ERROR-Fehler mehr

### Phase 4: Semantische Überprüfung (KI-Instanz 2)
**Verantwortlich:** "Agent Rot" (KI-Instanz 2)  
**Input:** Syntaktisch korrekter Draft + Strategiedokument  
**Output:** Semantischer Review-Bericht

**Prüfung auf:**
1. Inhaltliche Korrektheit (fachlich)
2. Strategiekonformität (Fokus richtig?)
3. Konsistenz mit anderen Sections
4. Verständlichkeit für Zielgruppe
5. Terminologie-Konsistenz

### Phase 5: Medien-Erstellung (Maintainer)
**Verantwortlich:** Maintainer  
**Input:** Draft mit Medien-Platzhaltern  
**Output:** Medien-Dateien (Screenshots, Videos)

**Schritte:**
1. Screenshots erstellen basierend auf Platzhaltern
2. Screenshots annotieren wo spezifiziert
3. Videos aufnehmen wo notwendig
4. Video-Untertitel finalisieren

### Phase 6: Content-Enrichment (Maintainer)
**Verantwortlich:** Maintainer  
**Input:** Draft + Medien + Semantischer Review  
**Output:** Vollständige Section

**Schritte:**
1. Medien einbinden (finale Pfade)
2. Glossar-Verlinkungen hinzufügen
3. Agent-Context-Block finalisieren
4. Optional: Semantische Anpassungen aus Phase 4

### Phase 7: Final Review (Maintainer)
**Verantwortlich:** Maintainer  
**Input:** Vollständige Section  
**Output:** Approval oder Reject

**Finale Prüfung auf:**
1. Fachliche Korrektheit
2. Didaktische Qualität
3. Integration in Gesamtkontext
4. Barrierefreiheit (BFSG-Konformität)

### Phase 8: Distribution (Maintainer)
**Verantwortlich:** Maintainer  
**Input:** Approved Section  
**Output:** Section in Live-System

**Schritte:**
1. Versionierung (Git-Commit)
2. Integration in index.html
3. Qualitätsmetriken erfassen
4. Feedback-Mechanismus aktivieren

---

## Antworten auf deine spezifischen Fragen

### Zu KI-Instanzen als Reviewer:
Deine Idee mit "Agent Blau" (Ersteller) und "Agent Rot" (Reviewer) ist **hervorragend**! Diese Trennung schafft eine wertvolle Qualitätskontrolle. Der separate Reviewer kann Probleme erkennen, die der Ersteller übersehen hat. Ich habe diese Rollenverteilung im detaillierten Workflow integriert.

### Zu Formulierungshilfen für Lernziele:

**Beispiel-Katalog für Lernziele:**

1. **Wissensziele (Know-What):**
   - "Nach Bearbeitung dieser Section kann der Ermittler **das Dashboard von AXIOM beschreiben** und seine Hauptkomponenten benennen."
   - "Der Benutzer kann **drei Methoden zum Export von Beweismitteln aus AXIOM erklären**."

2. **Handlungsziele (Know-How):**
   - "Der Ermittler kann **einen Export von Chat-Verläufen nach PDF durchführen** und dabei relevante Metadaten einbinden."
   - "Nach Durcharbeitung kann der Benutzer **Zeitlinien-Daten nach Excel exportieren und filtern**."

3. **Entscheidungsziele (Know-Why):**
   - "Der Ermittler kann **die geeignete Export-Methode basierend auf Beweistyp und Empfänger auswählen**."
   - "Der Benutzer kann **begründen, wann eine forensische Kopie notwendig ist** und wann ein PDF-Export ausreicht."

**Formulierungsschema:**
"Nach Abschluss dieser Section kann der Ermittler [AKTIONSVERB] [OBJEKT] [KONTEXT/BEDINGUNG]."

**Aktionsverben nach Bloom-Taxonomie:**
- Erinnern: benennen, auflisten, erkennen, identifizieren
- Verstehen: erklären, zusammenfassen, vergleichen
- Anwenden: durchführen, implementieren, ausführen
- Analysieren: unterscheiden, organisieren, zuordnen
- Bewerten: überprüfen, kritisieren, beurteilen
- Erstellen: entwickeln, planen, produzieren

### Zur Quellenpriorisierung:
**Ja, eine priorisierte Quellenliste ist äußerst hilfreich!** Sie gibt der KI klare Anweisungen, welche Teile des umfangreichen Handbuchs besonders relevant sind und welche nur am Rande berücksichtigt werden sollen.

**Beispiel:**
```

Priorität 1 (Hauptfokus): 

- AXIOM-Handbuch Kapitel 6.3-6.7 (Export-Funktionen)
- Interne Dokumentation "Standard-Workflow Smartphone-Auswertung" Seite 5-8

Priorität 2 (Wichtig, aber sekundär):

- AXIOM-Handbuch Kapitel 8.2 (Filter-Funktionen)
- Schulungsunterlagen "Export für Staatsanwaltschaft" Folie 12-15

Priorität 3 (Nur für Kontext):

- AXIOM-Handbuch Kapitel 2 (Allgemeine Benutzeroberfläche)
  
  ```
  
  ```

---

## Fehler-Lernprozess (für Python-Skripts)

Wie du angemerkt hast, ist ein Feedback-Loop für das Python-Skript entscheidend. Hier ein konkreter Vorschlag:

1. **Error-Log-System:**
   
   - Jeder Validierungsfehler wird in einem strukturierten JSON-Format gespeichert
   - Fehler werden kategorisiert (CRITICAL/ERROR/WARNING/INFO)
   - Mit jeder Section wird Häufigkeit bestimmter Fehlertypen protokolliert

2. **Muster-Erkennung:**
   
   - Nach z.B. 10 Sections: Automatische Analyse häufiger Fehler
   - KI-Prompt wird entsprechend angepasst
   - Beispiel: "Vermehrt fehlen data-title Attribute bei <section>" → Prompt ergänzen

3. **Fehler-Metrik:**
   
   - Fortschritts-Dashboard zeigt Fehlerreduktion
   - Z.B. "Fehler pro Section" sinkt von initial 12 auf 3-4 nach Optimierung

Was denkst du zu diesem detaillierten Workflow? Habe ich wichtige Aspekte übersehen oder gibt es Phasen, die anders strukturiert werden sollten?

```
**Prompt 4:** (Finalisierung des Workflow-Dokuments)
```

Ich bin begeistert von deinem Vorschlag. Das ist genau das, was ich gesucht habe. Wirklich perfekt!

Bitte erstelle mir auf dieser Basis ein vollständiges Dokument "Cluster 5: Workflow & Rollen" für den Projekt-Dateispeicher, das alle wichtigen Informationen enthält. Ähnlich wie wir es für die vorherigen Cluster gemacht haben.

Besonders wichtig sind:

- Klare Übersicht der Akteure/Rollen
- Detaillierte Workflow-Phasen
- Checklisten für den Maintainer
- Quality-Score für semantische Bewertung
- Beispiel für das Fehler-Log

Nach Abschluss von Cluster 5 würde ich dann gerne mit dem nächsten Chat zur Master-Prompt-Komposition übergehen, in dem wir alle Erkenntnisse aus den Clustern 1-5 zu einem umfassenden Prompt zusammenführen.

Vielen Dank für deine hervorragende Arbeit!

```
Die Antwort der KI (hier stark gekürzt, da das Dokument sehr umfangreich war):
```

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

[... vollständiges Dokument mit allen Workflow-Phasen, Rollen, Checklisten, etc. ...]

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

| Version | Datum      | Änderung                                      |
| ------- | ---------- | --------------------------------------------- |
| 1.0.0   | 2025-10-10 | Initiale Erstellung (Cluster 5 abgeschlossen) |

```
**Prompt 5:** (Übergang zur Master-Prompt-Komposition)
```

Das Dokument ist hervorragend! Vielen Dank. Ich werde es sofort im Projekt-Dateispeicher ablegen.

Wie besprochen, möchte ich nun zum nächsten Schritt übergehen: Der Master-Prompt-Komposition.

Könntest du bitte ein Continuation-Prompt-Dokument vorbereiten, das wir im nächsten Chat verwenden können? Es sollte alle wichtigen Informationen für die Entwicklung des Master-Prompts enthalten, insbesondere:

1. Einen Überblick über alle abgeschlossenen Cluster 1-5
2. Die Aufgabe der Master-Prompt-Komposition klar definieren
3. Eine Struktur für unsere Arbeit vorschlagen (z.B. erst Prompt-Architektur, dann Inhalte, dann Tests)
4. Die wichtigsten Herausforderungen nennen (z.B. Token-Limit vs. Vollständigkeit)

Bitte erstelle dieses Dokument so, dass wir es direkt im neuen Chat verwenden können.

```
Die Antwort der KI:
```

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

```

---

## 🎯 Ziele der Prompts

### Hauptziele

- Definition eines **strukturierten Workflows** für die KI-gestützte Content-Generierung
- Festlegung klarer **Rollenverantwortlichkeiten** für alle Beteiligten (KI-Systeme, Python-Skripte, Maintainer)
- Entwicklung eines **9-phasigen Prozessmodells** von der Strategie bis zur Distribution
- Erstellung eines vollständigen Dokuments `cluster5_Workflow-Rollen.md`
- Vorbereitung des Übergangs zur **Master-Prompt-Komposition**

### Teil-Ziele

1. Identifikation und Beschreibung aller am Prozess beteiligten Akteure und Rollen
2. Detaillierung der Workflow-Phasen mit konkreten Inputs/Outputs für jede Phase
3. Entwicklung von Checklisten für den Maintainer zur Qualitätssicherung
4. Konzeption eines Fehler-Lernprozesses mit Error-Logging und Feedback-Loop
5. Definition eines Quality-Scores für die semantische Bewertung von Sections

### Erwartete Outputs

- [x] Dokumentation (Gesamtprozess mit allen Rollen)
- [x] Konzept (9-Phasen-Workflow-Design)
- [x] Entscheidungshilfe (Checklisten für Maintainer)
- [x] Continuity-Planung (Übergangsdokument für nächsten Chat)

---

## 💬 KI-Antwort

### Zusammenfassung der Antwort

Die KI entwickelte einen detaillierten 9-phasigen Workflow, der alle Aspekte der Content-Erstellung von der initialen Strategiephase (Phase 0) bis zur finalen Distribution (Phase 8) abdeckt. Besonders wichtig war die Einführung einer zusätzlichen Vorbereitungsphase (Phase 0.5) zur Erstellung einer Gesamtstruktur und Definition der Section-Rahmen. Das Konzept der getrennten KI-Instanzen für Erstellung (Agent Blau) und Review (Agent Rot) wurde integriert, ebenso wie ein Fehler-Lernprozess, der automatisch Erkenntnisse aus Validierungsfehlern gewinnt und in die künftigen Prozesse einfließen lässt.

### Generierte Artifacts

1. **Cluster 5: Workflow & Rollen** - Vollständiges Dokumentationsdokument mit allen Workflow-Phasen, Rollen und Prozessen
2. **Continuation-Prompt-Dokument** - Überleitung zur Master-Prompt-Komposition für den nächsten Chat

### Wichtigste Erkenntnisse

- Der Workflow benötigt eine **strategische Vorbereitungsphase** (0 und 0.5) vor dem eigentlichen Draft-Prozess
- Die **Trennung von Content-Erstellung und Content-Review** in separate KI-Instanzen verbessert die Qualitätssicherung
- **Fehler-Logs** müssen strukturiert erfasst werden, um kontinuierliche Verbesserung zu ermöglichen
- Der Prozess erfordert eine **Balance zwischen Automatisierung und menschlicher Kontrolle**
- Die **Medien-Erstellung** bleibt eine hauptsächlich manuelle Aufgabe des Maintainers

---

## Zusammenfassung

Der Chat hatte zum Ziel, einen strukturierten 9-phasigen Workflow für die KI-gestützte Content-Erstellung zu entwickeln, wobei die Rollen und Verantwortlichkeiten aller Beteiligten (KI-Instanzen, Python-Skripte, Maintainer) klar definiert wurden. Das Ergebnis bildet die Grundlage für die nun folgende Master-Prompt-Komposition, die alle Erkenntnisse aus den 5 Clustern integrieren wird.

Die Dokumentation hebt besonders die wichtigen Innovationen hervor, wie die Einführung der strategischen Phasen 0 und 0.5 vor dem eigentlichen Draft-Prozess, die Trennung von Content-Erstellung und Review in separate KI-Instanzen und die Integration eines systematischen Fehler-Lernprozesses.

---

## ✅ Verwendung der Antwort

### Direkt übernommen

- [x] Konzept des 9-phasigen Workflows vollständig übernommen
- [x] Rolle der separaten KI-Instanzen für Erstellung und Review
- [x] Fehler-Lernprozess mit strukturiertem Error-Logging
- [x] Dokument `cluster5_Workflow-Rollen.md` erstellt und im Projekt-Dateispeicher abgelegt

**Details:**
Das entwickelte Workflow-Modell mit seinen 9 Phasen wurde vollständig akzeptiert und in das Projekt integriert. Besonders die klare Definition der Verantwortlichkeiten und die detaillierten Checklisten für den Maintainer wurden als sehr hilfreich angesehen.

### Angepasst/Modifiziert

| Original                          | Anpassung                                          | Begründung                                                                                                            |
| --------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Ursprüngliches 5-Phasen-Modell    | Erweiterung auf 9 Phasen                           | Die Erkenntnis, dass die strategische Vorbereitung und Gesamtstruktur-Entwicklung vor dem Draft-Prozess stehen müssen |
| Fehlerbehandlung ohne Lernprozess | Integration eines Fehler-Logs mit Muster-Erkennung | Kontinuierliche Verbesserung des Prozesses durch systematische Auswertung von Fehlern                                 |
| Einzelne KI-Instanz               | Zwei separate KI-Instanzen (Blau/Rot)              | Vier-Augen-Prinzip für bessere Qualitätssicherung                                                                     |

### Nicht verwendet

- Vorschlag zur vollautomatischen Validierung - Grund: Für v1.0 zu komplex, menschliche Prüfung weiterhin notwendig
- Detaillierte CI/CD-Pipeline-Integration - Grund: Auf v2.0 verschoben, zunächst manuelle Git-Versionierung
- Vollständige Automatisierung der Fehlerkorrektur - Grund: Zu risikoreich, Maintainer soll kritische Fehler überprüfen

---

## 🎓 Lessons Learned

### Was gut funktioniert hat

1. Die Einführung der strategischen Vorbereitungsphase (0 und 0.5) vor dem Draft-Prozess
2. Das Konzept der getrennten KI-Instanzen für Erstellung und Review
3. Die detaillierten Checklisten für den Maintainer
4. Die Integration eines Fehler-Lernprozesses mit strukturiertem Error-Logging

### Was nicht optimal war

1. Die ursprüngliche Idee eines reinen 5-Phasen-Modells war zu simplifiziert
2. Anfangs fehlte die Gesamtstruktur-Entwicklung als separate Phase
3. Der Übergang zwischen den Phasen könnte noch detaillierter beschrieben werden

### Verbesserungen für zukünftige Prompts

- **Präziser formulieren:** Anforderungen an Input/Output jeder Phase noch klarer definieren
- **Mehr Kontext geben:** Erwähnen, dass eine strategische Planung vor der Content-Erstellung notwendig ist
- **Beispiele hinzufügen:** Konkrete Beispiele für Lernziele, Section-Beschreibungen und Error-Logs

---

## 🔗 Verknüpfungen

### Abhängigkeiten

- **Cluster 1:** Inhaltliche Anforderungen bilden die Basis für Content-Qualitätsanforderungen
- **Cluster 2:** Strukturelle Anforderungen definieren das Schema für die Validierungsprozesse
- **Cluster 3:** Technische Anforderungen bestimmen die HTML-Validierungsregeln
- **Cluster 4:** Qualitätssicherung definiert die Metriken und Validierungsprozesse

### Follow-up Prompts

- **Master-Prompt-Komposition:** Nächster Chat, der auf allen 5 Clustern aufbaut
- **Phase 0 Strategie:** Erste konkrete Anwendung des definierten Workflows

### Verwandte Dateien

- `cluster5_Workflow-Rollen.md` - Hauptdokument dieses Chats
- `task6_continuation_prompt.md` - Überleitung zum nächsten Chat
- Alle vorherigen Cluster-Dokumente (1-4)

---

## 📊 Qualitätsbewertung

### Konzept-Qualität

⭐⭐⭐⭐⭐ (5/5)
**Begründung:**
Der 9-phasige Workflow deckt alle Aspekte der Content-Erstellung ab und berücksichtigt sowohl die strategische Planung als auch die operative Umsetzung. Die klare Definition der Rollen und Verantwortlichkeiten sowie die Integration von Feedback-Loops zeugen von einem durchdachten Konzept.

### Dokumentations-Qualität

⭐⭐⭐⭐⭐ (5/5)
**Begründung:**
Das erstellte Dokument ist klar strukturiert, vollständig und enthält alle notwendigen Details für die Implementierung. Besonders wertvoll sind die Checklisten für den Maintainer und die detaillierten Beschreibungen der Workflow-Phasen.

### Nützlichkeit

⭐⭐⭐⭐⭐ (5/5)
**Begründung:**
Der definierte Workflow bildet die Grundlage für die gesamte weitere Arbeit und ermöglicht die systematische Erstellung von ~100-150 Sections mit konsistenter Qualität. Die Integration von Qualitätssicherungs-Mechanismen und Fehler-Lernprozessen erhöht die Effizienz und Qualität des Gesamtprozesses.

---

## 💭 Kommentare & Notizen

### Technische Notizen

- Die Phasen 0 und 0.5 erfordern einen iterativen Prozess zwischen KI und Maintainer, der durch klare Templates unterstützt werden sollte
- Die Error-Logs sollten in einem standardisierten JSON-Format gespeichert werden
- Die Quality-Score-Berechnung sollte in Python implementiert und in das Validierungsskript integriert werden

### Offene Fragen

1. Wie soll der Übergang von approbiertem Content in das Live-System technisch umgesetzt werden?
2. Wie können die Fehler-Logs automatisch ausgewertet werden, um das KI-Prompt zu verbessern?
3. Sollen für verschiedene Section-Typen unterschiedliche Workflow-Varianten definiert werden?

### Ideen für die Zukunft

- Entwicklung eines Dashboard-Systems zur Visualisierung des Workflow-Status aller Sections
- Integration einer automatischen Benachrichtigung bei Status-Änderungen
- Teilweise Automatisierung der Medien-Erstellung durch KI-generierte Annotations-Vorschläge

---

## 🔎 Anhänge

### Screenshots (optional)

- Nicht verfügbar

### Externe Links

- **BFSG-Gesetzestext:** https://www.bmas.de/barrierefreiheit (Rechtsgrundlage)
- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/ (Barrierefreiheit-Standards)
- **Magnet AXIOM Examine Dokumentation:** https://docs.magnetforensics.com/axiom (Primäre Inhaltsquelle)

---

## ✏️ Changelog

| Datum      | Version | Änderung | Bearbeiter    |
| ---------- | ------- | -------- | ------------- |
| 11.10.2025 | 1.0     | Erstellt | Projektleiter |

---

## 🏷️ Tags

`#workflow` `#rollen` `#prozess` `#content-erstellung` `#qualitätssicherung` `#fehlerbehandlung` `#feedback-loop` `#validierung` `#review` `#phasenmodell` `#master-prompt`

---

**Ende der Prompt-Dokumentation**