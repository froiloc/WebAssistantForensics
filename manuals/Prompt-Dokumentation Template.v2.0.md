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

## 📝 Chat-Interaktionen

### Haupt-Interaktionen Zusammenfassung

**Anweisung an die KI**: Erstelle eine Zusammenfassung der wichtigsten Diskussionsstränge. Beschreibe dazu jeweils die Motivation, den Werdegang und das Ergebnis.

*Automatische Erkennung basierend auf ## Prompt: und ## Response: Markern*

[HIER FOLGT DIE AUTOMATISCH GENERIERTE ZUSAMMENFASSUNG DER WICHTIGSTEN INTERAKTIONEN]

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

## 🎯 Ziele der Prompts

### Hauptziele

**Anweisung an die KI**: Führe aus, welche Ziele vorgegeben wurden und erreicht werden sollten. Strategische Ziele, taktische Ziele.

*Was sollte mit diesem Chatverlauf erreicht werden?*

### Teil-Ziele

**Anweisung an die KI**: Führe aus, welche Ziele vorgegeben wurden und erreicht werden sollten. Taktische Ziele, operative Ziele.

1. [Erstes Teilziel]

2. [Zweites Teilziel]

3. [Drittes Teilziel]

### Erwartete Outputs

**Anweisung an die KI**: Erstelle hier eine Liste der Dokumente, die aufgrund des Chats erstellt wurden.

- Code-Snippets (HTML/CSS/JS)

- Dokumentation

- Konzept/Design

- Entscheidungshilfe

- Sonstiges: ___________

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

## 🔗 Verknüpfungen

### Abhängigkeiten

*Von welchen vorherigen Prompts/Arbeiten hingen diese Prompts ab?*

- **Prompt_XXX:** [Kurzbeschreibung der Abhängigkeit]

- **Prompt_YYY:** [Kurzbeschreibung der Abhängigkeit]

### Follow-up Prompts

*Welche Prompts bauten auf diesem auf?*

- **Prompt_ZZZ:** [Was darauf aufbaute]

### Verwandte Dateien

*Welche Projekt-Dateien wurden durch diesen Prompt beeinflusst/erstellt?*

- `[Dateipfad]`

- `[Dateipfad]`

---

## 🎓 Lessons Learned

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

**Anweisung an die KI**: Hier ist der Inhalt der Konversation und der sich aus ihr ergebenden Erzeugnisse und Ergebnisse zu bewerten. Es ist NICHT die Art des Chats oder wie er niedergeschrieben oder verlaufen ist zu bewerten. Es geht hier einzig und allein um die Güte der aus der Diskussion im Chat entstandenen Outputs.

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

## 📎 Anhänge

### Externe Links

*Relevante Links, die im Kontext wichtig sind*

- [Link 1 mit Beschreibung]

- [Link 2 mit Beschreibung]

---

## ✏️ Changelog

*Wenn diese Prompt-Dokumentation später aktualisiert wird*

| Datum                       | Version | Änderung | Bearbeiter |
| --------------------------- | ------- | -------- | ---------- |
| [TT.MM](https://TT.MM).JJJJ | 1.0     | Erstellt | [Name]     |

---

## 🏷️ Tags

*Schlagwörter für einfacheres Suchen*  
`[Thema]` `[Technologie]` `[Konzept]` `[Entscheidungstyp]`


