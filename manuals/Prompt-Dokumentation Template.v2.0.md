# KI-Einsatz Dokumentation - Generisches Template

**Dateiname:** `prompt_XXX_kurzbeschreibung.md`  
**Format:** Markdown  
**Speicherort:** `/project-diary/prompts/`

---

## Prompt Metadata

**Anweisung an die KI**: Die **Prompt-ID** ist die UUID in der URL hinter **Link:** am Anfang des Dokuments. **Projekttag**: Anzahl der Arbeitstage (Montag bis Freitag) seit dem 29.09.2025. Der **Bearbeiter** ist Alex. Fülle jedes Feld aus. Halte dich streng an diese Vorgaben.

**Prompt-ID:** XXX  
**Von Datum/Uhrzeit:** TT.MM.JJJJ HH:MM Uhr  
**Bis Datum/Uhrzeit:** TT.MM.JJJJ HH:MM Uhr  
**Projekttag:** X  
**Bearbeiter:** [Name]  
**KI-Modell:** [Claude 4.5 Sonnet / GPT-4 / DeepSeek / etc.]  
**Original-Chat-Datei:** [Dateiname des originalen Chat-Exports]

---

## Chronologische Reihenfolge

**Anweisung an die KI**: Erstelle eine Tabelle, welche das Prompt und die Response in der Zeit einordnet

| Nummer | Prompt vom: | Response vom: |
|--------|-------------|---------------|
| flfd Nr. | DD.MM.YYYY HH:II:SS |  DD.MM.YYYY HH:II:SS |

### Hinweis
flfd Nr. = fortlaufende Nummer, beginnend mit 1 und in jeder Zeile um eins erhöht.

Beispiel: 
| Nummer | Prompt vom: | Response vom: |
|--------|-------------|---------------|
|      1 | 09.10.2025 16:45:16 | 09.10.2025 16:45:53 |
|     .. | ... | ... |
|      n | 09.10.2025 21:10:34 | 09.10.2025 21:12:12 |

---

## 💡 Ideen & Entscheidungen

### Von der KI eingebracht

**Anweisung and die KI**: Erstelle eine Liste von Ideen und Entscheidungen, die von der KI (Response) eingebracht worden sind. Gib einen fett geschriebenen Kurztitel und 1 bis 3 Sätze, welche die Idee/Entscheidung umschreiben und den Beweggrund hinter der Idee/Entscheidung hervorheben.

[ENTSCHEIDUNGSSTATUS] **[Kurztitel der Idee]** (Prompt X/Response Y)  
*Beschreibung: 1-3 Sätze die die Idee umschreiben und den Beweggrund hervorheben*

### Vom Nutzer eingebracht

**Anweisung and die KI**: Erstelle eine Liste von Ideen und Entscheidungen, die von dem Benutzer (Prompt) eingebracht worden sind. Gib einen fett geschriebenen Kurztitel und 1 bis 3 Sätze, welche die Idee/Entscheidung umschreiben und den Beweggrund hinter der Idee/Entscheidung hervorheben.

[ENTSCHEIDUNGSSTATUS] **[Kurztitel der Idee]** (Zeilen X-Y)  
*Beschreibung: 1-3 Sätze die die Idee umschreiben und den Beweggrund hervorheben*

**Entscheidungskategorien:**

- ✅ **Vollständig akzeptiert & umgesetzt**

- 🔄 **Teilweise übernommen** (mit Anpassungen)

- ⏳ **Akzeptiert, aber verschoben** (für spätere Versionen)

- 💡 **Als Inspiration genutzt** (aber nicht direkt umgesetzt)

- 🎯 **Für spätere Evaluation vorgemerkt**

- ❌ **Abgewiesen**

---

## 🏆 Zusammenfassung des Chatverlaufs

**Anweisung an die KI**: Erstelle eine allgemeine Zusammenfassung als Fließtext. Beachte dabei die Aspekte, die abgedeckt werden sollen.

*2-3 Absätze (maximal 5) die folgende Aspekte abdecken:*

- **Wichtigsten Output** des Chats

- **Innovationen** gegenüber vorherigen Ansätzen

- **Leitmotive und Entscheidungsgrundsätze**

[HIER FOLGT DIE AUTOMATISCH GENERIERTE ZUSAMMENFASSUNG]

---

## 📊 Generierte Artifacts

**Anweisung an die KI**: Liste hier auf, welche Artifacte (Dokumente bei claude.ai) erzeugt worden sind.

*Liste aller generierten Code-Artifacts/Dokumente/Konzepte*

1. **[Dateiname]** - [Beschreibung des Inhalts]

2. **[Dateiname]** - [Beschreibung des Inhalts]

3. **[Dateiname]** - [Beschreibung des Inhalts]

---

## 🎓 Lessons Learned

**Anweisung an die KI**: Hier ist nicht der Inhalt der Konversation, sondern deren Durchführung relevant. Haben sich beide Chatpartner verstanden? Haben sie eine gemeinsame Lösung gefunden? Gab es Verständnisschwierigkeiten? Sind sie beim Thema geblieben oder haben sie sich plötzlich um andere Themen gekümmern, die neu auftraten? Sind sie immer wieder zum Hauptthemenstrang zurückgekommen?

### Was gut funktioniert hat

1. [Aspekt 1 der gut funktioniert hat]

2. [Aspekt 2 der gut funktioniert hat]

### Was nicht optimal war

1. [Aspekt 1 der verbessert werden könnte]

2. [Aspekt 2 der verbessert werden könnte]

### Verbesserungen für zukünftige Prompts

- **Präziser formulieren:** [Konkrete Vorschläge]

- **Mehr Kontext geben:** [Was hätte geholfen]

- **Beispiele hinzufügen:** [Welche Beispiele]

---

## 📊 Qualitätsbewertung

**Anweisung an die KI**: Hier ist der Inhalt der Konversation und der sich aus ihr ergebenden Erzeugnisse und Ergebnisse zu bewerten. Es ist NICHT die Art des Chats oder wie er niedergeschrieben oder verlaufen ist zu bewerten. Es geht hier einzig und allein um die Güte der aus der Diskussion im Chat entstandenen Outputs. Bei der Qualitätsbewertung ist das im Template vorgeschlagene 5-Sterne-System zu verwenden. 5 Sterne: alles bestens, 0 Sterne: alles eine Katastrophe. Dabei ist jeder Aspekt aus dem Inhalt des Chats zu Konzept, Dokumentation und Nützlichkeit EINZELN zu bewerten. Bewerte das Konzept nach Vollständigkeit, Korrektheit, Innovation, Einhalten von Standards, Abdeckung von Edgecases, etc. Bewerte die Dokumentation nach Vollständigkeit, Verständlichkeit, Struktur, Umfang (nicht zu wenig nichts unnötiges), gibt es Beispiele, etc. Bewerte die Nützlichkeit nach Einsatzfähigkeit, Zeitersparnis, Wiederverwendbarkeit, abgedecktem Arbeitsvolumen, Effektivität, Effizienz, etc. Du bewertest also die im Chat besprochenen und erstellten Inhalte selbst. Wohlgemerkt, die INHALTE und NICHT den CHAT SELBST.

### Konzept-Qualität

*Bewertung der generierten Konzepte/Ideen (1-5 Sterne)*  
⭐⭐⭐⭐☆ (4/5)  
**Begründung:**  
[Warum diese Bewertung]

### Dokumentations-Qualität

*Bewertung der generierten Dokumentation (1-5 Sterne)*  
⭐⭐⭐⭐☆ (4/5)  
**Begründung:**  
[Warum diese Bewertung]

### Nützlichkeit

*Wie nützlich war die Antwort für das Projekt? (1-5 Sterne)*  
⭐⭐⭐⭐⭐ (5/5)  
**Begründung:**  
[Warum diese Bewertung]

---

## 💭 Kommentare & Notizen

### Technische Notizen

*Technische Details, die wichtig sind*

### Offene Fragen

*Fragen, die sich aus dem Prompt/der Antwort ergeben haben*

1. [Offene Frage 1]

2. [Offene Frage 2]

### Ideen für die Zukunft

*Ideen, die sich aus diesem Prompt ergeben haben*

- [Idee 1]

- [Idee 2]

---

## 🏷️ Tags

*Schlagwörter für einfacheres Suchen*  
`[Thema]` `[Technologie]` `[Konzept]` `[Entscheidungstyp]`


