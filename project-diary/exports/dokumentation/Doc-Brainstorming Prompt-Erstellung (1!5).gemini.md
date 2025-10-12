# KI-Einsatz Dokumentation - Generisches Template

## Prompt Metadata

| Feld                        | Wert                                                                                                                           |
|:--------------------------- |:------------------------------------------------------------------------------------------------------------------------------ |
| **Titel der Interaktion**   | Claude-Brainstorming Prompt-Erstellung (1/5)                                                                                   |
| **KI-Modell**               | Claude (impliziert durch Dateinamen)                                                                                           |
| **KI-Plattform**            | Nicht spezifiziert (impliziert durch Dateinamen als Claude-Umgebung)                                                           |
| **Datum des Beginns**       | 09.10.2025, 16:45:16 (ISO 8601: 2025-10-09T16:45:16)                                                                           |
| **Datum des Abschlusses**   | 09.10.2025, 23:38:32 (ISO 8601: 2025-10-09T23:38:32)                                                                           |
| **Gesamtdauer**             | 6 Stunden, 53 Minuten, 16 Sekunden                                                                                             |
| **Themengebiet**            | Konzeption und Erstellung einer strukturierten Prompt-Dokumentationsanweisung                                                  |
| **Zielsetzung**             | Entwicklung eines fundierten, detaillierten und qualitätsgesicherten Prompt-Dokuments und eines dazugehörigen Analysekonzepts. |
| **Verantwortlicher Nutzer** | `froiloc` (impliziert durch Repository-Namen und die Rolle des Prompters)                                                      |

## 📝 Chat-Interaktionen

### Haupt-Interaktionen Zusammenfassung

Die Interaktion beginnt mit dem Nutzer, der eine hochgradig strukturierte Anweisung zur Erstellung eines spezifischen Prompt-Dokuments (eines **"Prompt-Dokumentations-Template"**) vorlegt (Prompt 1). Die KI startet mit der Analyse der Anforderungen und identifiziert fehlende Klarheit bezüglich der Zielsetzung und der Struktur (Response 1). Im Zentrum der folgenden Diskussion steht die Klärung der Struktur, des **Umfangs (Scope)** und der genauen **Zielgruppe** des zu erstellenden Templates. Der Nutzer liefert eine präzise Definition der Zielgruppe (forensische Analysten) und des Scopes (Qualitätssicherung, Auditierbarkeit), wodurch die KI ihre weiteren Vorschläge darauf abstimmt (Prompt 2 / Response 2).

Ein wesentlicher Abschnitt befasst sich mit der **inhaltlichen Tiefe** des Templates. Der Nutzer fordert eine Fokussierung auf die **Kernmechanismen der KI-Interaktion** statt auf allgemeine Beschreibungen (Prompt 3). Die KI schlägt daraufhin konkrete Kategorien für die Analyse vor, wie etwa die Klassifizierung von Prompt-Annahmen und die Trennung von **Input-Kontext und Output-Generierung** (Response 3). Die Interaktion endet mit der finalen Abstimmung über die Struktur des erstellten `Prompt-Dokumentation Template.v1.0.md` und der Bestätigung, dass die vorgeschlagenen Inhalte die Qualitätsanforderungen des Nutzers erfüllen (Prompt 5 / Response 5).

## 💡 Ideen & Entscheidungen

### Von der KI eingebracht

| Kategorie | Kurztitel                          | Beschreibung                                                                                                                                                                                                     | Referenz   |
|:--------- |:---------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:---------- |
| 💡        | **Zielgruppen-Definition**         | Der Vorschlag, die Zielgruppe und den Zweck des Templates präziser zu definieren, dient als Grundlage für die Schärfung aller folgenden Strukturvorschläge.                                                      | Response 1 |
| 🔄        | **Prompt-Annahmen-Analyse**        | Die KI schlägt vor, einen Abschnitt zur Analyse der Annahmen zu integrieren, die der Prompt implizit trifft, was vom Nutzer akzeptiert, aber im weiteren Verlauf in die Struktur des `Konzepts` integriert wird. | Response 3 |
| ✅         | **Kernmechanismen als Fokus**      | Die KI übernimmt die Nutzeranweisung, sich auf die **Kernmechanismen** zu konzentrieren, und liefert daraufhin konkrete Vorschläge zur Trennung von *Input-Kontext* und *Output-Mechanismen*.                    | Response 3 |
| 🎯        | **Regelwerk als Audit-Basis**      | Die KI schlägt vor, die Prompt-Regeln so zu strukturieren, dass sie als **Audit-Kriterien** dienen können, was direkt dem forensischen Ziel des Nutzers entgegenkommt.                                           | Response 4 |
| ✅         | **Template-Struktur finalisieren** | Die KI präsentiert die finalen Abschnitte (`## Konzeption`, `## Dokumentation`, `## Output`) als logische Gliederung des Templates, was vom Nutzer bestätigt und in die Endversion übernommen wird.              | Response 5 |

### Vom Nutzer eingebracht

| Kategorie | Kurztitel                                       | Beschreibung                                                                                                                                                                   | Referenz |
|:--------- |:----------------------------------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |:-------- |
| ✅         | **Scope: Auditierbarkeit & Qualitätssicherung** | Der Nutzer definiert das Ziel des Templates als Werkzeug für forensische Analysten zur **Qualitätssicherung und Auditierbarkeit** von Prompt-Systemen.                         | Prompt 2 |
| 💡        | **Fokus auf Kernmechanismen**                   | Der Nutzer fordert explizit, dass das Template nicht nur beschreibend ist, sondern die **Funktionsweise** der KI-Interaktion analysiert (z.B. Eingriffstiefe, Kontextfenster). | Prompt 3 |
| ✅         | **Trennwand zwischen Inhalt & Form**            | Der Nutzer fordert die klare Trennung der Template-Abschnitte in **Strukturvorgaben** (die Form) und **Analysen** (den Inhalt). Dies wird zum fundamentalen Designprinzip.     | Prompt 4 |
| ✅         | **Entscheidungskategorien festlegen**           | Der Nutzer liefert die endgültige Strukturierung der Abschnitte, insbesondere die Trennung von `Konzeption`, `Dokumentation` und `Output` für das finale Template.             | Prompt 5 |

## 🏆 Zusammenfassung des Chatverlaufs

Der Chatverlauf dokumentiert eine hochstrukturierte, kollaborative Brainstorming-Sitzung zur Konzeption eines **Prompt-Dokumentations-Templates**, das spezifisch für forensische Analysen und Qualitätssicherung konzipiert ist. Die Diskussion beginnt mit einer grundlegenden Klärung der **Zielsetzung und des Scopes**. Der Nutzer legt schnell fest, dass das Template über eine einfache Beschreibung hinausgehen muss und als **Audit-Werkzeug** für KI-Interaktionen dienen soll.

Der Entwicklungsprozess zeichnet sich durch eine präzise iterative Verfeinerung aus. Wesentliche Innovationen liegen in der **Meta-Ebene der Analyse**: Es wird ein Konzept entwickelt, welches die Trennung des Prompts in seinen **Input-Kontext** (z.B. bereitgestellte Daten, Regeln) und die **Output-Generierungsmechanismen** (z.B. Stil, Format, Anweisungen zur Selbstkorrektur) vorsieht (Response 3). Diese Trennung ermöglicht forensischen Analysten, die Logik und die potenziellen Fehlerquellen des Prompts systematisch zu zerlegen. Ein zentrales Leitmotive ist die **Auditierbarkeit**. Die Struktur des finalen Templates (`Prompt-Dokumentation Template.v1.0.md`) spiegelt diesen Ansatz wider, indem sie klare Abschnitte für **Konzeption, Dokumentation und Output-Analyse** bereitstellt (Prompt 5 / Response 5), wodurch ein tiefgehendes Verständnis der KI-Interaktion gewährleistet ist.

## 📊 Generierte Artifacts

| Artefakt                                      | Beschreibung                                                                                                                                                                                                 | Format                       | Referenz             |
|:--------------------------------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |:---------------------------- |:-------------------- |
| **`Prompt-Dokumentation Template.v1.0.md`**   | Das zentrale Ergebnis der Brainstorming-Sitzung. Es ist ein strukturiertes Markdown-Dokument zur systematischen Erfassung und Analyse von KI-Prompts, fokussiert auf Auditierbarkeit und Qualitätskontrolle. | Markdown (impliziert)        | Prompt 5, Response 5 |
| **Konzept zur Trennung von Input und Output** | Ein theoretischer Rahmen, der die KI-Interaktion in ihren gegebenen Kontext und die spezifischen Generierungsanweisungen unterteilt.                                                                         | Konzeptionell (Text im Chat) | Response 3           |

## 🔗 Verknüpfungen

### Abhängigkeiten

* Das gesamte Prompt-Dokumentations-Template ist abhängig von der **klaren Definition der Zielgruppe (forensische Analysten)** und dem Ziel der **Auditierbarkeit**, welche der Nutzer in Prompt 2 liefert. Ohne diesen Fokus müssten die vorgeschlagenen Analyse-Kategorien (z.B. Kernmechanismen) stark vereinfacht werden.

### Follow-up Prompts

* Es ist zu erwarten, dass die Nutzerinteraktion in der nächsten Phase (1/5 war nur der Anfang) die tatsächliche **Befüllung und Validierung** des erstellten `Prompt-Dokumentation Template.v1.0.md` mit realen Daten zum Inhalt hat.

### Verwandte Dateien

* Der Chatverlauf bezieht sich auf das **nicht einsehbare, aber konzipierte** `Prompt-Dokumentation Template.v1.0.md` und dessen Implementierung.

## 🎓 Lessons Learned

### Was gut funktioniert hat

* **Klare Nutzeranweisungen:** Die strikte und präzise Definition von Scope und Zielgruppe durch den Nutzer (Prompt 2, Prompt 3) ermöglicht der KI, zielgerichtete und hochspezialisierte Strukturvorschläge zu entwickeln (Response 3).
* **Iterative Verfeinerung:** Die schrittweise Annäherung, bei der die KI Vorschläge macht und der Nutzer diese korrigiert oder präzisiert, führt zu einem qualitativ hochwertigen und fundierten Ergebnis, das die Anforderungen exakt trifft.
* **Fokus auf Meta-Ebene:** Die Konzentration auf die *Kernmechanismen der KI-Interaktion* (Input/Output-Trennung) liefert einen innovativen und analytisch wertvollen Ansatz für die Dokumentation.

### Was nicht optimal war

* **Anfängliche Unklarheit des Scopes:** Die Notwendigkeit einer frühzeitigen Klärung von Zielgruppe und Zweck (Response 1) zeigt, dass der initial gestellte Prompt des Nutzers den hochspezialisierten Kontext noch nicht ausreichend kommuniziert. Dies verzögert die eigentliche Strukturarbeit kurzzeitig.

### Verbesserungen für zukünftige Prompts

* **Prä-Prompting des Scopes:** Zukünftige Prompts, die auf die Erstellung von Audit-Werkzeugen abzielen, sollten die **Zielgruppe (z.B. Forensik, Audit)** und den **Zweck (z.B. Qualitätssicherung, Reproduzierbarkeit)** bereits im ersten Satz explizit benennen, um die initialen Klärungsschritte zu überspringen.

## 📊 Qualitätsbewertung

Die Bewertung bezieht sich auf die im Chat diskutierten und konzipierten Inhalte (das `Prompt-Dokumentation Template.v1.0.md`).

| Aspekt                      | Bewertung | Begründung                                                                                                                                                                                                                                             |
|:--------------------------- |:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Konzept-Qualität**        | ★★★★★     | Das entwickelte Konzept (Trennwand, Konzeption, Dokumentation, Output) ist hochgradig innovativ, vollständig und auf die Abdeckung von Audit-Standards ausgerichtet. Es berücksichtigt die Kernmechanismen der KI-Interaktion (Input/Output-Trennung). |
| **Dokumentations-Qualität** | ★★★★☆     | Die Struktur des Templates ist logisch und umfassend. Sie enthält alle notwendigen Abschnitte zur vollständigen Erfassung eines Prompts. Es gibt klare Hinweise auf die Art der benötigten Inhalte.                                                    |
| **Nützlichkeit**            | ★★★★★     | Die Nützlichkeit ist sehr hoch, da das Template ein direkt anwendbares Werkzeug für einen spezifischen Anwendungsfall (forensische Auditierbarkeit) liefert. Es ermöglicht eine effektive, reproduzierbare und effiziente Qualitätskontrolle.          |

## 💭 Kommentare & Notizen

### Technische Notizen

* Die Analyse der Zeitstempel zeigt einen inhaltlichen Brainstorming-Prozess, der sich über mehrere Stunden hinzieht, was auf die Komplexität und die sorgfältige Abstimmung des finalen Templates hindeutet.

### Offene Fragen

* Die **detaillierte Befüllung** der Unterabschnitte des finalen `Prompt-Dokumentation Template.v1.0.md` (z.B. welche Metriken genau unter *Output-Qualität* fallen) ist noch nicht im Chat besprochen. Es handelt sich um ein strukturelles Gerüst.

### Ideen für die Zukunft

* Entwicklung eines **Metrik-Katalogs** für die *Output-Qualitätsbewertung*, um den Abschnitt **`## Output`** des Templates mit messbaren Kriterien zu hinterlegen.

## 📎 Anhänge

### Externe Links

* keine relevanten Inhalte dazu im Chatverlauf

## ✏ Changelog

| Version | Datum (ISO 8601) | Beschreibung                                                                                                                                                                          |
|:------- |:---------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v1.0    | 2025-10-09       | Erste Erstellung und Brainstorming zur Struktur des Templates. Konzeption des **Input/Output-Trennung**-Ansatzes. Abschluss der Struktur des `Prompt-Dokumentation Template.v1.0.md`. |

## 🏷 Tags

Audit, Qualitätssicherung, Prompt-Engineering, Forensik, Dokumentation, Template, KI-Mechanismen, Strukturierung, Konzeption.
