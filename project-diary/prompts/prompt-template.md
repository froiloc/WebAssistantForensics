# Prompt-Dokumentation Template

**Dateiname:** `prompt_XXX_kurzbeschreibung.md`  
**Format:** Markdown  
**Speicherort:** `/project-diary/prompts/`

---

## Prompt Metadata

**Prompt-ID:** XXX  
**Datum:** TT.MM.JJJJ  
**Uhrzeit:** HH:MM Uhr  
**Tag:** X  
**Bearbeiter:** [Name]  
**KI-Modell:** Claude 3.5 Sonnet / GPT-4 / etc.  
**Iteration:** X (falls mehrere Versuche)

---

## 📝 Original-Prompt

### Kontext (optional)
*Beschreiben Sie den Kontext, in dem dieser Prompt gestellt wurde. Was war die Ausgangssituation?*

Beispiel:
> Nach Implementierung der Basis-Features sollte nun der Spürhund-Assistent konzipiert werden. Ziel war es, ein situationsabhängiges Assistenz-System zu entwickeln.

### Der Prompt

```
[Hier den exakten Prompt einfügen, wie er an die KI gegeben wurde]

Beispiel:
Als nächsten Schritt möchte ich einen interaktiven Begleiter haben. 
Dieser soll situationsabhängig durch den Leitfaden begleiten...
```

### Follow-up Prompts (falls vorhanden)

**Prompt 1a:** (Verfeinerung/Nachfrage)
```
[Text des Follow-up-Prompts]
```

**Prompt 1b:** (Weitere Iteration)
```
[Text des Follow-up-Prompts]
```

---

## 🎯 Ziel des Prompts

### Hauptziel
*Was sollte mit diesem Prompt erreicht werden?*

Beispiel:
- Design-Konzept für Agent-System
- Implementierung der Kern-Funktionalität
- Dokumentation der JSON-Struktur

### Teil-Ziele
1. [Erstes Teilziel]
2. [Zweites Teilziel]
3. [Drittes Teilziel]

### Erwartete Outputs
- [ ] Code-Snippets (HTML/CSS/JS)
- [ ] Dokumentation
- [ ] Konzept/Design
- [ ] Entscheidungshilfe
- [ ] Sonstiges: ___________

---

## 💬 KI-Antwort

### Zusammenfassung der Antwort
*Kurze Zusammenfassung dessen, was die KI geantwortet hat (2-3 Sätze)*

Beispiel:
> Die KI schlug eine modulare Architektur mit separaten Dateien (agent.css, agent.js) vor und definierte eine JSON-basierte Dialogstruktur. Es wurden drei Haupt-Komponenten entworfen: Chat-Interface, Inline-Trigger und Kontext-Blöcke.

### Generierte Artifacts
*Liste aller generierten Code-Artifacts/Dokumente*

1. **agent.html** - HTML-Struktur für Agent-Komponenten
2. **agent.css** - Styling (~600 Zeilen)
3. **agent.js** - Funktionalität (~700 Zeilen)
4. **agent-json-structure.md** - JSON-Dokumentation

### Wichtigste Erkenntnisse
*Bullet-Points der wichtigsten Insights aus der Antwort*

- [Erkenntnis 1]
- [Erkenntnis 2]
- [Erkenntnis 3]

---

## ✅ Verwendung der Antwort

### Direkt übernommen
*Was wurde 1:1 oder mit minimalen Anpassungen übernommen?*

- [ ] Code vollständig übernommen
- [ ] Code mit Anpassungen übernommen (Details: _______)
- [ ] Konzept/Ideen übernommen
- [ ] Nur als Inspiration genutzt

**Details:**
[Beschreibung was übernommen wurde und warum]

### Angepasst/Modifiziert
*Was wurde angepasst und warum?*

| Original | Anpassung | Begründung |
|----------|-----------|------------|
| [Code/Konzept] | [Änderung] | [Warum geändert] |

### Nicht verwendet
*Was wurde vorgeschlagen aber nicht verwendet?*

- [Element 1] - Grund: [Warum nicht verwendet]
- [Element 2] - Grund: [Warum nicht verwendet]

---

## 🎓 Lessons Learned

### Was gut funktioniert hat
1. [Aspekt 1 der gut funktioniert hat]
2. [Aspekt 2 der gut funktioniert hat]

### Was nicht optimal war
1. [Aspekt 1 der verbessert werden könnte]
2. [Aspekt 2 der verbessert werden könnte]

### Verbesserungen für zukünftige Prompts
*Wie könnte man ähnliche Prompts in Zukunft besser formulieren?*

- **Präziser formulieren:** [Konkrete Vorschläge]
- **Mehr Kontext geben:** [Was hätte geholfen]
- **Beispiele hinzufügen:** [Welche Beispiele]

---

## 🔗 Verknüpfungen

### Abhängigkeiten
*Von welchen vorherigen Prompts/Arbeiten hing dieser Prompt ab?*

- **Prompt_XXX:** [Kurzbeschreibung der Abhängigkeit]
- **Prompt_YYY:** [Kurzbeschreibung der Abhängigkeit]

### Follow-up Prompts
*Welche Prompts bauten auf diesem auf?*

- **Prompt_ZZZ:** [Was darauf aufbaute]

### Verwandte Dateien
*Welche Projekt-Dateien wurden durch diesen Prompt beeinflusst/erstellt?*

- `src/agent.css`
- `src/agent.js`
- `manuals/agent-implementation.md`

---

## 📊 Qualitätsbewertung

### Code-Qualität
*Bewertung der generierten Code-Qualität (1-5 Sterne)*

⭐⭐⭐⭐⭐ (5/5)

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

[Ihre technischen Notizen hier]

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

### Screenshots (optional)
*Falls Screenshots der Interaktion vorhanden sind*

- `screenshot_prompt_XXX_1.png` - [Beschreibung]
- `screenshot_prompt_XXX_2.png` - [Beschreibung]

### Externe Links
*Relevante Links, die im Kontext wichtig sind*

- [Link 1 mit Beschreibung]
- [Link 2 mit Beschreibung]

---

## ✏️ Changelog

*Wenn diese Prompt-Dokumentation später aktualisiert wird*

| Datum | Version | Änderung | Bearbeiter |
|-------|---------|----------|------------|
| TT.MM.JJJJ | 1.0 | Erstellt | [Name] |
| TT.MM.JJJJ | 1.1 | [Änderung] | [Name] |

---

## 🏷️ Tags

*Schlagwörter für einfacheres Suchen*

`#agent` `#javascript` `#json-struktur` `#interaktiv` `#konzept`

---

**Ende der Prompt-Dokumentation**

---

## 📋 Verwendungshinweise für dieses Template

### Wann ausfüllen?
- **Direkt nach dem Prompt:** Grundinformationen (Prompt-Text, Ziel)
- **Nach Verwendung der Antwort:** Verwendung, Anpassungen
- **Beim Projekt-Review:** Qualitätsbewertung, Lessons Learned

### Was ist Pflicht, was optional?

#### Pflicht-Felder ⭐
- Prompt-ID, Datum, Tag
- Original-Prompt
- Ziel des Prompts
- Zusammenfassung der Antwort
- Verwendung der Antwort

#### Optional-Felder
- Follow-up Prompts
- Screenshots
- Externe Links
- Technische Notizen

### Dateinamen-Schema

Format: `prompt_XXX_kurzbeschreibung.md`

Beispiele:
- `prompt_001_grundstruktur.md`
- `prompt_002_agent_konzept.md`
- `prompt_015_css_responsiveness.md`

**XXX = laufende Nummer (001, 002, ...)**

### Archivierungs-Strategie

```
/project-diary/prompts/
├── by-topic/              # Nach Thema sortiert
│   ├── agent/
│   ├── css/
│   ├── javascript/
│   └── documentation/
├── by-date/               # Nach Datum sortiert
│   ├── 2025-09/
│   └── 2025-10/
└── index.md               # Master-Index aller Prompts
```

---

## 📝 Beispiel-Ausfüllung

Siehe: `prompt_001_grundstruktur.md` für ein vollständig ausgefülltes Beispiel.