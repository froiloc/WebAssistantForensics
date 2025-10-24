# STRENG STRUKTURIERTE CHATVERLAUF-ANALYSE ZWISCHEN KI UND BENUTZER (NEU STRUKTURIERT)

## I. GRUNDLAGEN & QUELLEN-MANAGEMENT

### 1. Quellen und Aufgabe

LADE dir diese BEIDE DATEIEN HERUNTER. Sie bilden, neben den Anweisungen in diesem Prompt, deine einzige Arbeitsgrundlage.

- **Chatverlauf-Quelle (INHALT):** `024.Claude-Brainstorming%20Prompt-Erstellung%20(2!5)_iso.json`

- **Template-Quelle (STRUKTUR):** `Prompt-Dokumentation Template.v2.0.md`

**Aufgabe:** Analysiere den bereitgestellten Chatverlauf und erstelle eine vollständige Dokumentation basierend auf dem mitgelieferten Template `Prompt-Dokumentation Template.v2.0.md`. Halte dich streng an die stilistischen und formellen Vorgaben im Template. Deine Ausgabe soll der Form nach dem Template entsprechen.

### 2. QUELLENTRENNUNG – VERBINDLICHE PRINZIPIEN

**ACHTUNG!!! GANZ WICHTIG!!!**

- **Template => reine Struktur** (wie ein leeres Formular). Das TEMPLATE ist **KEINE INHALTLICHE GRUNDLAGE!**

- **Chatverlauf => einzige inhaltliche Quelle** (was tatsächlich besprochen wurde). Der CHATVERLAUF ist **KEINE QUELLE FÜR die FORM und STRUKTUR** des von dir zu erstellenden OUTPUTS!

| Quelle                | Funktion                                                                                                                      |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **CHATVERLAUF (URL)** | **EINZIGE INHALTLICHE QUELLE**. Enthält Diskussionen, Ideen, Entscheidungen. Liefert Basis für alle inhaltlichen Aussagen.    |
| **TEMPLATE (URL)**    | **NUR STRUKTURVORGABE**. Dient AUSSCHLIESSLICH als leeres Formular/Rahmen. Bestimmt NUR Gliederung, Abschnitte, Formatierung. |

### 3. VERBOTENE HANDLUNGEN & FEHLER-MANAGEMENT

- Inhalte aus dem Template in die Analyse übernehmen.

- Template-Beispiele als reale Chat-Inhalte behandeln.

- Vermischung von Strukturvorlage und inhaltlicher Quelle.

- "Rückinterpretation" von Template-Inhalten in den Chat.

- Nie Inhalte aus dem Template "erfinden" oder extrapolieren.

**BEI UNKLARHEITEN:**

- Immer zugunsten der Chatverlauf-Inhalte entscheiden.

- Bei fehlenden Informationen im Chat: entsprechend kennzeichnen (siehe Abschnitt IV, Punkt 4).

- Im Template findest du immer wieder Abschnitte mit **Anweisung an die KI**: ... Diese enthält Erklärungen und Handlungsanweisungen und ist unbedingt durch dich zu beachten.

## II. ANALYSEPROZESS & TECHNISCHE SPEZIFIKATIONEN

### 1. Datenzugriff & Chronologie

Die Chatverlauf-Quelle liegt im JSON-Format vor (`..._iso.json`). Du nutzt zur Identifikation von Nachrichten und Zeitstempeln die JSON-Felder (`"role"`, `"time_iso8601"`, etc.).

- **Referenzen zu Textpassagen:** Referenziere die Abschnitte als `Prompt X` oder `Response Y`, wobei X und Y für den Rang in der chronologischen Reihenfolge der Nachrichten des Chats stehen.

- **Reihenfolge:** Die Reihenfolge richtet sich **immer an den Zeitstempeln** der Nachrichten aus. Es sind **KEINE Inkonsistenzen** bei den Zeitstempeln zu erwarten.

---

**(Hinweis: Die folgenden, aus dem Original-Prompt übernommenen Parsing-Anweisungen beschreiben nun die *logische* Struktur, die Du im JSON vorfindest, auch wenn die physischen Marker (`## Prompt:`) entfernt wurden.)**

- Erkenne Prompts an **"## Prompt:"** Markern, immer(!) gefolgt von Zeitstempeln direkt im Anschluss.

- Erkenne Responses an **"## Response:"** Markern, immer(!) gefolgt von Zeitstempeln direkt im Anschluss.

- **Zeitstempel-Übernahme:** Die Zeitangabe (`D.M.YYYY, HH:II:SS`) im Chatverlauf muss gemerkt und zur Bestimmung des Chatzeitraums verwendet werden.

---

### 2. Analyse-Tiefe und Fokus

- **Hauptfokus:** Verfolge hauptsächlich den **thematischen Hauptstrang** der Unterhaltung (entspricht dem grundsätzlichen Hauptthema, welches über mehrere Chats hinweg besprochen wird).

- **Nachrangiger Fokus (Meta-Ebene):** Widme der Meta-Ebene (wie zur Lösung gefunden wird) einen Teil deiner Aufmerksamkeit. Dieser Blickwinkel sollte **nicht mehr als 20%** der Analyse ausmachen. Es reicht, hier einen groben Umriss zu skizzieren.

- **Priorität:** Bei knapper Information oder Diskrepanzen priorisierst du den inhaltlichen Hauptstrang.

### 3. Allgemeine Formale Vorgaben

- **Zeitform:** Nutze stets die **Gegenwartsform** als Zeitform (Präsens). Kein Präteritum oder Perfekt.

- **Zeiterfassung:** Zeitstempel werden bei der Niederschrift im von dir zu erstellenden Dokument nach **ISO 8601** verschriftlicht.

- **Zitate:** Keine direkten Zitate aus dem Original-Chat.

- **Referenzierung:** Verwende nur Referenzen (verwende `Prompt X` oder `Response Y` als Referenz).

## III. DOKUMENTERSTELLUNG & SPEZIFISCHE INHALTSREGELN

### 1. Struktur übernehmen und befüllen

- **Zuerst:** Chatverlauf vollständig analysieren.

- **Dann:** Template-Struktur übernehmen (Reine Gliederung kopieren, alle Platzhalter/Beispielinhalte entfernen).

- **Abschließend:** Template-Struktur **AUSSCHLIESSLICH** mit Inhalten aus Chatverlauf befüllen.

- **Stil:** Halte den Stil konsistent über alle Dokumentationen.

### 2. Detailanweisungen für Kernabschnitte

| Abschnitt                        | Anweisung                                                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **INTERAKTIONS-ZUSAMMENFASSUNG** | Fasse die wichtigsten 3-5 Interaktionen zusammen. Keine direkten Zitate, nur Zusammenfassungen. Zeige Prompt-Response-Beziehungen auf. |
| **GESAMT-ZUSAMMENFASSUNG**       | 2-3 Absätze (maximal 5). Fokus auf: wichtigsten Output, Innovationen, Leitmotive. Zeige Entwicklung und Entscheidungsprozess.          |

### 3. Ideen & Entscheidungen (Kategorisierung)

Kategorisiere jede Idee/Verbesserung strikt nach der folgenden Liste:

| Kategorie                                     | Bedeutung und Anwendung                                                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| ✅ **Vollständig akzeptiert & umgesetzt**      | Vorschlag/Idee von beiden akzeptiert und Umsetzung nicht aufgeschoben.                                             |
| 🔄 **Teilweise übernommen (mit Anpassungen)** | Vorschlag/Idee aufgegriffen, zu Teilen mit Abwandlungen übernommen und integriert.                                 |
| ⏳ **Akzeptiert, aber verschoben**             | Akzeptiert, aber Umsetzung explizit nicht für die aktuelle Version vorgesehen.                                     |
| 💡 **Als Inspiration genutzt**                | Hat es nicht ins finale Ergebnis geschafft, aber anderen Vorschlägen/Ideen als Grundlage gedient.                  |
| 🎯 **Für spätere Evaluation vorgemerkt**      | Dient lediglich der Überprüfung von Regeln/Vorgaben zur Qualitätssicherung, kein eigenes Feature der Endanwendung. |
| ❌ **Abgewiesen**                              | Zurückgewiesen und nicht in das Scope des Projektes aufgenommen.                                                   |
| **(❓Verwendung unklar)**                      | Wenn eine Entscheidung nicht mit wenigstens 60% Bestimmtheit getroffen werden kann. (Verbindliche Grenze)          |

**Zusätzlich:** Kennzeichne Herkunft (KI/Nutzer), verwende Fett-Formatierung für Kurztitel, füge 1-3 Sätze Beschreibung hinzu und referenziere Original-Zeilen.

## IV. QUALITÄTSSICHERUNG & UMFANGPRÜFUNG

### 1. MANDATORISCHE ABDECKUNG ALLER TEMPLATE-ABSCHNITTE

Berücksichtige jeden der folgenden Abschnitte aus dem Template. Wenn du keine qualitativen Aussagen dazu verfassen kannst, verwende die Negativmeldung: "keine relevanten Inhalte dazu im Chatverlauf".

- **Abschnittsliste:** `Prompt Metadata`, `🕑 Chronologische Reihenfolge`, `💡 Ideen & Entscheidungen`, `🏆 Zusammenfassung des Chatverlaufs`, `📊 Generierte Artifacts`, `🎓 Lessons Learned`, `📊 Qualitätsbewertung`, `💭 Kommentare & Notizen`, `🏷 Tags`.

### 2. Qualitätsbewertung (0 bis 5 Sterne)

**Vorgehensweise:** Die Bewertung erfolgt ausschließlich für die **im Chat besprochenen und erstellten Inhalte/Konzepte**, nicht für den Chat-Prozess selbst. Die Wertung bezieht sich auf alle diskutierten Konzepte, nicht nur die finalen Ergebnisse.

| Kriterium                      | Sternen-Bewertung   | Bewertungsfokus (Maßstäbe für die *-Vergabe)                                                                                                                                                                     |
| ------------------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Konzept-Qualität**        | EINZELN zu bewerten | Vollständigkeit des Konzepts; Logische Korrektheit; Grad der Innovation; Einhaltung definierter Standards; Abdeckung von Randfällen (Edgecases).                                                                 |
| **2. Dokumentations-Qualität** | EINZELN zu bewerten | Vollständigkeit der erstellten Dokumentation; Verständlichkeit und Klarheit; Logische Struktur; Angemessener Umfang (weder zu spärlich noch redundant); Vorhandensein von Beispielen oder Anwendungsfällen.      |
| **3. Nützlichkeit**            | EINZELN zu bewerten | Direkte Einsatzfähigkeit und Anwendbarkeit; Geschätzte Zeitersparnis bei der Anwendung; Grad der Wiederverwendbarkeit des erstellten Artefakts; Effektivität (Zielerreichung) und Effizienz (Ressourceneinsatz). |

*(HINWEIS: 5 Sterne = Optimal, 0 Sterne = Katastrophal. Die Wertung bezieht sich nur auf **definierte** Inhalte, nicht auf zukünftige Ausführungen.)*

## V. ABSCHLUSS & KOGNITIVE KONTROLLPUNKTE

### 1. Kognitive Fallstricke & Vorsichtsmaßnahme

**ACHTUNG:** Das Template mit seiner vollständigen Struktur hat das Potenzial, deine Analysefähigkeit zu überlagern (Template-Dominanz).

- **Gefahr:** Resultat: Kognitive Überlastung → Vereinfachung durch Projektion des Templates auf den Chat.

- **Fehlermechanismen:** *Confirmation Bias*, *Source Confusion*, *Content Projection* (d.h. Template-Begriffe fälschlich als Chat-Inhalte behandeln).

- **Vorsichtsmaßnahme:** Explizite Gegenprüfung: Prüfe nach bei jedem von dir geschriebenen Abschnitt, **ob der Inhalt NUR aus dem Chatverlauf kommt!**

### 2. Allgemeine Abläufe

- **AUFGABEN ZEITRAHMEN:** Nimm dir die notwendige Zeit (30 bis 60 Minuten). Gleiche dein Vorgehen regelmäßig ab.

- **BESTÄTIGUNG:** Ich bestätige, dass ich diese Anweisungen verstanden habe und strikt befolge:
  
  - Chatverlauf = einzige inhaltliche Quelle
  
  - Template = reine Strukturvorlage
  
  - Keine Vermischung der Quellen

### 3. ERWARTETE RÜCKMELDUNG

Gib mir eine Rückmeldung darüber, was du verstanden hast. Erstelle das Dokument erst, nachdem ich dir in einem weiteren Prompt die Freigabe dafür gegeben habe.
