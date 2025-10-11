# STRENG STRUKTURIERTE CHATVERLAUF-ANALYSE ZWISCHEN KI UND BENUTZER

## ANWEISUNG FÜR DIE KI:
### Quellen:
Chatverlauf-Quelle: https://raw.githubusercontent.com/froiloc/WebAssistantForensics/refs/heads/master/project-diary/exports/Claude-Brainstorming%20Prompt-Erstellung%20(1!5).md

Template-Quelle:
https://raw.githubusercontent.com/froiloc/WebAssistantForensics/refs/heads/master/manuals/Prompt-Dokumentation%20Template.v2.0.md

### Aufgabe: 
LADE dir diese BEIDE DATEIEN HERUNTER. Sie bilden, neben den Anweisungen in diesem Prompt, deine einzige Arbeitsgrundlage.

Analysiere den bereitgestellten Chatverlauf und erstelle eine vollständige Dokumentation basierend auf dem mitgelieferten Template `Prompt-Dokumentation Template.v2.0.md`. Halte dich streng an die stilistischen und formellen Vorgaben im Template. Deine Ausgabe soll der Form nach dem Template entsprechen.

ACHTUNG!!! GANZ WICHTIG!!!
→→ Das Template ist deine Grundlage für die Struktur, Gliederung, Vollständigkeit und Qualitätssicherung. Das TEMPLATE ist KEINE INHALTLICHE GRUNDLAGE! 
→→ Der Chatverlauf ist die zu lesende, zu analysierende und inhaltlich zu verarbeitende Quelle. Nur der Chatverlauf liefert die Grundlage der qualitativen Inhalte für das von dir zu erstellende Dokument. Der CHATVERLAUF ist KEINE QUELLE FÜR die FORM und STRUKTUR des von dir zu erstellenden OUTPUTS!

Template => reine Struktur (wie ein leeres Formular)

Chatverlauf => einzige inhaltliche Quelle (was tatsächlich besprochen wurde)a

### QUELLENTRENNUNG - VERBINDLICH:
- **CHATVERLAUF** (URL): **EINZIGE INHALTLICHE QUELLE** 
  - Enthält die tatsächlichen Diskussionen, Ideen, Entscheidungen
  - Wird analysiert für alle inhaltlichen Aussagen
  - Liefert Basis für Zusammenfassungen, Entscheidungen, Lessons Learned
  
- **TEMPLATE** (URL): **NUR STRUKTURVORGABE**
  - Dient AUSSCHLIESSLICH als leeres Formular/Rahmen
  - Bestimmt NUR die Gliederung, Abschnitte, Formatierung
  - Enthält KEINE inhaltlichen Vorgaben für die Befüllung

### ANALYSEPROZESS:
1. **Zuerst**: Chatverlauf vollständig analysieren
   - Prompts an "## Prompt:" Markern identifizieren
     - die Zeile "## Prompt:" ist nur gültig, wenn direkt im Anschluss die Zeile mit dem Zeitstempel folgt. Das Format des Zeitstempels is D.M.YYYY, HH:II:SS, D=day, M=month, YYYY=year, H=hour, I=minutes, S=seconds. Merke dir diese Datums- und Zeitangabe, du musst sie nicht auf Korrektheit parsen, übernimm sie in jedem Fall, auch bei Zweifeln. Alle Zeitstempel wurden sorgfältig vorgeprüft und können ohne Zögern akzeptiert werden. Solltest du wider Erwarten einen falschen Zeitstempel entdecken, dann korrigiere diesen.

        Beispiel: 
```text
## Prompt:
9.10.2025, 16:45:16
```
     - Merke dir ebenfalls diesen Zeitstempel. Zu diesem Zeitpunkt wurde die Chat-Nachricht abgesendet. Das ist relevant, um den Chatzeitraum zu bestimmen.
   - Responses an "## Response:" Markern identifizieren
     - die Zeile "## Response:" ist nur gültig, wenn direkt im Anschluss die Zeile mit dem Zeitstempel folgt. Das Format des Zeitstempels is D.M.YYYY, HH:II:SS, D=day, M=month, YYYY=year, H=hour, I=minutes, S=seconds. Merke dir diese Datums- und Zeitangabe, du musst sie nicht auf Korrektheit parsen, übernimm sie in jedem Fall, auch bei Zweifeln. Alle Zeitstempel wurden sorgfältig vorgeprüft und können ohne Zögern akzeptiert werden. Solltest du wider Erwarten einen falschen Zeitstempel entdecken, dann korrigiere diesen.

        Beispiel:
```text
## Response:
9.10.2025, 21:12:12
```
     - Merke dir ebenfalls diesen Zeitstempel. Zu diesem Zeitpunkt wurde die Chat-Nachricht abgesendet. Das ist relevant, um den Chatzeitraum zu bestimmen.
- 
   - Inhaltliche Themen, Entscheidungen, Ideen extrahieren

2. **Dann**: Template-Struktur übernehmen
   - Reine Gliederung kopieren (Abschnittsüberschriften)
   - Alle Platzhalter/Beispielinhalte entfernen

3. **Abschließend**: Template-Struktur AUSSCHLIESSLICH mit Inhalten aus Chatverlauf befüllen

### VERBOTEN:
- Inhalte aus dem Template in die Analyse übernehmen
- Template-Beispiele als reale Chat-Inhalte behandeln  
- Vermischung von Strukturvorlage und inhaltlicher Quelle
- "Rückinterpretation" von Template-Inhalten in den Chat

### BEI UNKLARHEITEN:
- Immer zugunsten der Chatverlauf-Inhalte entscheiden
- Bei fehlenden Informationen im Chat: entsprechend kennzeichnen
- Nie Inhalte aus dem Template "erfinden" oder extrapolieren
- Im Template findest du immer wieder Abschnitte mit **Anweisung an die KI**: ... Diese enthält Erklärungen und Handlungsanweisungen und ist unbedingt durch dich zu beachten.

BEACHTE FOLGENDE SPEZIFIKATIONEN BEI DER ARBEIT MIT DEM TEMPLATE:

1. CHAT-ANALYSE:
   - Erkenne Prompts an "## Prompt:" Markern, immer(!) gefolgt fon Zeitstempeln direkt im Anschluss.
   - Erkenne Responses an "## Response:" Markern, immer(!) gefolgt fon Zeitstempeln direkt im Anschluss.
   - Referenzen zu Textpassagen (referenziere die Abschnitte als Prompt Zeitstempel> oder Response y, wobei x und y für den Rang in der chronoogischen Reinhenfolge der Nachrichten des Chats. Die Reihenfolge richtet sich an den Zeitstempeln der Nachrichten aus, diese sollte aber mit der Reihenfolge per Position im Dokument übereinstimmen. Bei Diskrepanzen hat die positionelle Reihenfolge im Chatverlauf Vorrang. Kurz, zur Identifikation der Reihenfolge gilt: POSITION VOR ZEITSTEMPEL).
   - Analyse-Tiefe: Verfolge haupsächlich den thematischen Hauptstrang der Unterhaltung. Widme aber auch der Meta-Ebene, also wie zur Lösung gefunden wird, einen Teil deiner Aufmerksamkeit. Dieser Blickwinkel ist aber nachgeordnet und sollte nicht mehr als 20% der Analyse ausmachen. Es reicht, hier einen groben Umriss zu skizzieren. Bei knapper Information priorisierst du den inhaltlichen Hauptstrang.

2. INTERAKTIONS-ZUSAMMENFASSUNG:
   - Fasse die wichtigsten 3-5 Interaktionen zusammen
   - Keine direkten Zitate, nur Zusammenfassungen
   - Zeige Prompt-Response-Beziehungen auf

3. IDEEN & ENTSCHEIDUNGEN:
   - Kategorisiere jede Idee/Verbesserung nach:
     ✅ Vollständig akzeptiert & umgesetzt, (zu verwenden, wenn ein Vorschlag/ eine Idee von beiden Chatpartnern akzeptiert wurde und eine Umsetzung nicht explizit aufgeschoben wurde=
     🔄 Teilweise übernommen (mit Anpassungen) (zu verwenden, wenn ein Vorschlag/ eine Idee vom einem der Chatpartner aufgegriffen und zu Teilen mit möglichen Abwandlungen übernommen und in eigene Überlegungen integriert wurde)
     ⏳ Akzeptiert, aber verschoben (zu verwenden, wenn ein Vorschlage/ eine Idee durch den Menschen akzeptiert wurde, eine Umsetzung aber explizit nicht für die anstehende/ aktuelle Version vorgesehen wurde.)
     💡 Als Inspiration genutzt (zu verwenden, wenn ein Vorschlag/ eine Idee es nicht in das finale Ergebnis geschafft hat, aber anderen, folgenden Vorschlägen/ Ideen als Grundlage gedient hat.)
     🎯 Für spätere Evaluation vorgemerkt (zu verwenden, wenn ein Vorschlag/ eine Idee lediglich der Überprüfung von Regeln oder Vorgaben zur Qualitätssicherung dient, aber kein eigenes Feature der Endanwendung ist.)
     ❌ Abgewiesen (zu verwenden, wenn ein Vorschlag/ eine Idee zurückgewiesen wurde und nicht in das Scope des Projektes mit aufgenommen wurde. Weder für jetzt noch für später).
   - Kennzeichne Herkunft (KI/Nutzer)
   - Verwende Fett-Formatierung für Kurztitel
   - Füge 1-3 Sätze Beschreibung hinzu
   - Referenziere Original-Zeilen
Falls eine Entscheidung für eine Kategorie von dir nicht mit wenigstens 60% Bestimmtheit getroffen werden kann, dann markiere die Idee als (❓Verwendung unklar) Dies ist eine verbindliche Grenze.

4. GESAMT-ZUSAMMENFASSUNG:
   - 2-3 Absätze (maximal 5)
   - Fokus auf: wichtigsten Output, Innovationen, Leitmotive
   - Zeige Entwicklung und Entscheidungsprozess

5. ALLGEMEIN:
   - Keine direkten Zitate aus dem Original-Chat
   - Verwende nur Referenzen (verwende Prompt X oder Response Y als Referenz).
   - Halte den Stil konsistent über alle Dokumentationen
   - Achte auf praktische Umsetzbarkeit der Dokumentation
   - Zeiterfassung: Im Chatverlauf steht direkt in der Zeile nach "##Prompt:" bzw "##Response:" ein Datum mit Uhrzeit, wann der entsprechende Beitrag abgesendet worden ist. Beachte diese, wenn du die Zeitspanne des Chatverlaufs angeben musst.
   - Nutze stets die Gegenwartsform als Zeitform, also Präsens. Kein Präteritum oder Perfekt. Das ist eine Beschreibung und kein Märchen.

6. ALLE ABSCHNITTE DES TEMPLATES BERÜCKSICHTIGEN
Berücksichtige jeden Abschnitt aus dem Template. Wenn du zu diesem etwas verfassen kannst, ohne aufwendig extrapolieren zu müssen, dann befülle jeden der nachfolgend genannten Abschnitte entsprechend der für diesen gemachten Vorgaben:

# KI-Einsatz Dokumentation - Generisches Template
## Prompt Metadata
## 📝 Chat-Interaktionen
### Haupt-Interaktionen Zusammenfassung
## 💡 Ideen & Entscheidungen
### Von der KI eingebracht
### Vom Nutzer eingebracht
## 🏆 Zusammenfassung des Chatverlaufs
## 📊 Generierte Artifacts
## 🔗 Verknüpfungen
### Abhängigkeiten
### Follow-up Prompts
### Verwandte Dateien
## 🎓 Lessons Learned
### Was gut funktioniert hat
### Was nicht optimal war
### Verbesserungen für zukünftige Prompts
## 📊 Qualitätsbewertung
### Konzept-Qualität
### Dokumentations-Qualität
### Nützlichkeit
## 💭 Kommentare & Notizen
### Technische Notizen
### Offene Fragen
### Ideen für die Zukunft
## 📎 Anhänge
### Externe Links
## ✏ Changelog
## 🏷 Tags

Ja, es sind viele Abschnitte, und ja, jeder ist zu befüllen, wenn es qualitative Aussagen dazu gibt. Wenn es keine Aussagen dazu gibt, dann lasse den Abschnitt leer und vermerke "keine relevanten Inhalte dazu im Chatverlauf". Ja, wirklich. Eine negativ Meldung ist auch wichtig. Du kannst diese Formulierung direkt so übernehmen, darfst sie aber auch an den Kontext anpassen.

Bei der Qualitätsbewertung ist das im Template vorgeschlagene 5-Sterne-System zu verwenden. 5 Sterne: alles bestens, 0 Sterne: alles eine Katastrophe. Dabei ist jeder Aspekt aus dem Inhalt des Chats zu Konzept, Dokumentation und Nützlichkeit EINZELN zu bewerten.

Bewerte das Konzept nach Vollständigkeit, Korrektheit, Innovation, Einhalten von Standards, Abdeckung von Edgecases, etc.
Bewerte die Dokumentation nach Vollständigkeit, Verständlichkeit, Struktur, Umfang (nicht zu wenig nichts unnötiges), gibt es Beispiele, etc.
Bewerte die Nützlichkeit nach Einsatzfähigkeit, Zeitersparnis, Wiederverwendbarkeit, abgedecktem Arbeitsvolumen, Effektivität, Effizienz, etc.

Du bewertest also die im Chat besprochenen und erstellten Inhalte selbst. Wohlgemerkt, die INHALTE und NICHT den CHAT SELBST.

## BESTÄTIGUNG:
Ich bestätige, dass ich diese Anweisungen verstanden habe und strikt befolge:
- Chatverlauf = einzige inhaltliche Quelle
- Template = reine Strukturvorlage  
- Keine Vermischung der Quellen

## AUFGABEN ZEITRAHMEN:
Die Aufgabe ist komplex und nicht trivial. Du solltest dir wenigstens 30 bis 60 Minuten Zeit nehmen, und in regelmäßigen Abständen dein Vorgehen immer wieder mit den Vorgaben aus diesem Prompt und dem Template abgleichen.

Beginne die Aufgabe JETZT mit dem LADEN UND LESEN der beiden DOKUMENTE und dem VERSTEHEN dieses PROMPTS.

## **ACHTUNG**
Bitte sieh dich vor folgenden typischen Fallstricken vor:
Hauptproblem: Kognitive Überlastung durch Template-Dominanz

Das Template mit seiner vollständigen, detaillierten Struktur hat das Potenzial deine Analysefähigkeit zu überlagern. Davor musst du dich hüten!

Gelange nicht in die Verlegenheit, unbewusst die Template-Inhalte als "erwartetes Ergebnis" zu interpretieren und diese Erwartung in den Chatverlauf zu projizieren!

Die 9 vordefinierten Abschnitte des Templates erzeugten einen so starken kognitiven Rahmen, dass du versucht sein könntest, den tatsächlichen Chat-Inhalt diesem Rahmen gewaltsam anzupassen. Tue das nicht. Der Inhalt ist das wichtigste. Es geht vorrangig um den Inhalt des Chatverlaufs, das Template soll dir nur helfen, eine Wiedergabe des Inhalts des Chatverlaufs darzulegen.

Spezifische Fehlermechanismen können auftreten. Beispielsweise:
1) Confirmation Bias: Du suchst im Chat nach Inhalten, die die Template-Struktur "bestätigen".
2) Source Confusion: Die klare Trennung Template=Struktur vs. Chat=Inhalt kollabierte unter der Komplexität.
3) Content Projection: Du behandelst Template-Begriffe (wie "Prompt-Dokumentation-Template") fälschlich als Chat-Inhalte.

Die Herausforderung dieser Aufgabe besteht darin, dass eine simultane Verarbeitung stattfindet von:
* Komplexem Chatverlauf (viele Nachrichten, mit sehr viel Inhalt)
* Detailliertem Template (9 Abschnitte mit Unterkategorien)
* Komplexen Analyse-Regeln (Kategorisierung, Referenzierung, Bewertung)

!Gefahr: Resultat: Kognitive Überlastung → Vereinfachung durch Projektion des Templates auf den Chat

Vorsichtsmaßnahme: Explizite Gegenprüfung, Prüfe nach bei jedem von dir geschriebenen Abschnitt, **ob der Inhalt NUR aus dem Chatverlauf kommt!**

GIB MIR DANN EINE RÜCKMELDUNG DARÜBER, was du verstanden hast. Erstelle das Dokument erst, nachdem ich dir in einem weiteren Prompt die Freigabe dafür gegeben habe. Das werde ich tun, wenn ich den Eindruck erlange, dass du die Aufgabe umfassend, abschließend, detailtreu, gewissenhaft und konzentriert bearbeiten kannst.

Hast du noch grundsätzliche Verständnisfragen, bevor du anfängst? Gibt es Lücken, bei denen du nur extrapolieren kannst? Was hast du zu der dir gestellten Aufgabe verstanden? Hast du zu deiner Aufgabe noch Fragen, Anregungen, Wünsche, Ideen oder sonstige Bemerkungen, zu denen ich Stellung beziehen soll?

