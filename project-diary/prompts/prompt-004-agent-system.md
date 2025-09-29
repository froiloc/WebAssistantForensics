# Prompt-Dokumentation

**Dateiname:** `prompt_004_agent_system.md`  
**Format:** Markdown  
**Speicherort:** `/project-diary/prompts/`

---

## Prompt Metadata

**Prompt-ID:** 004  
**Datum:** 29.09.2025  
**Uhrzeit:** 15:30 Uhr  
**Tag:** 1  
**Bearbeiter:** Alexander Reintzsch  
**KI-Modell:** Claude 3.5 Sonnet  
**Iteration:** 1

---

## 📝 Original-Prompt

### Kontext
Nach Implementierung der Basis-Features wurde das Hauptfeature des Projekts angegangen: Ein situationsabhängiger, interaktiver Begleiter, der Benutzer durch die forensische Auswertung führt.

### Der Prompt

```
Als nächsten Schritt möchte ich einen interaktiven Begleiter haben. 
Dieser soll situationsabhängig durch den Leitfaden begleiten. In einer 
Art statischem Chat soll dieser Fragen stellen und Schaltflächen oder 
Eingabefelder anbieten, mit denen die Benutzer:innen interagieren.

Der Aufbau und Inhalt des Agenten soll in JSON abgebildet sein.

Ein Beispiel: Der Agent fragt: "Was möchtest du als nächstes tun?" 
Als Optionen gibt er an 'Bilder auswerten', 'Videos auswerten' und 
'Bericht erstellen'. Der Agent führt dann zum Schritt im Leitfaden.

Der Agent wird getriggert, wenn ein bestimmtes Nutzungsverhalten 
gezeigt wird. Beispielsweise, der Benutzer "betritt" einen Abschnitt.

Es gibt zwei Ebenen:
- Ebene A: Anleitung zur Software
- Ebene B: Situationsabhängige Begleitung durch den Agenten

Der Agent soll eine lustige Figur sein. Vielleicht ein Spürhund? 
Der Agent erhält sein Fenster ähnlich wie der Notizblock.

Um den Agenten mit Elementen des Leitfadens verknüpfen zu können, 
müssen im HTML die Tags mit eindeutigen IDs versehen werden.

Der Agent soll eine eigene CSS und JS Datei erhalten.
```

---

## 🎯 Ziel des Prompts

### Hauptziel
Entwicklung eines vollständigen Agent-Frameworks mit Chat-Interface, JSON-Dialogen und kontextuellen Einblendungen

### Teil-Ziele
1. Chat-Interface für Agent-Sidebar
2. JSON-basiertes Dialog-System
3. Section-Trigger-System
4. Inline-Hilfe-Trigger im Leitfaden
5. Kontext-Blöcke für dynamische Einblendungen
6. Separate Dateien (agent.css, agent.js)
7. JSON-Struktur-Dokumentation

### Erwartete Outputs
- [x] Code-Snippets (HTML/CSS/JS)
- [x] Dokumentation
- [x] Konzept/Design
- [ ] Entscheidungshilfe
- [x] Sonstiges: JSON-Spezifikation

---

## 💬 KI-Antwort

### Zusammenfassung der Antwort
Claude entwickelte ein vollständiges Agent-Framework mit dem "Spürhund Rex" als Maskottchen. Das System umfasst ein Chat-Interface, JSON-basierte Dialoge mit verschiedenen Action-Types, Section-Trigger für automatische Aktivierung, Inline-Trigger im Leitfaden und Kontext-Blöcke. Eine umfassende JSON-Struktur-Dokumentation wurde ebenfalls erstellt.

### Generierte Artifacts
1. **agent-html-structure** - HTML-Markup für Agent-Komponenten
2. **agent-css** - Vollständiges Styling (~600 Zeilen)
3. **agent-js** - Agent-Engine und Dialog-Handling (~700 Zeilen)
4. **agent-json-structure** - Umfassende JSON-Spezifikation (~1500 Zeilen)
5. **agent-implementation-guide** - Implementierungsanleitung (~2000 Zeilen)

### Wichtigste Erkenntnisse
- JSON-basierte Dialoge ermöglichen Content-Änderungen ohne Code
- Zwei-Ebenen-System (Chat + Inline-Content) ist sehr flexibel
- Section-Trigger mit Intersection Observer für automatische Aktivierung
- Spürhund-Metapher macht System sympathischer und zugänglicher
- Modulare Architektur ermöglicht Wiederverwendung für andere Tools

---

## ✅ Verwendung der Antwort

### Direkt übernommen
- [x] Code vollständig übernommen
- [ ] Code mit Anpassungen übernommen
- [x] Konzept/Ideen übernommen
- [ ] Nur als Inspiration genutzt

**Details:**
Das komplette Agent-Framework wurde übernommen. Die Struktur mit agent.css, agent.js und der JSON-Spezifikation bildet das Herzstück der Zwei-Ebenen-Architektur. Der "Spürhund Rex" als Maskottchen wurde perfekt umgesetzt mit Animationen und sympathischer Persönlichkeit.

### Angepasst/Modifiziert
| Original | Anpassung | Begründung |
|----------|-----------|------------|
| - | - | Keine Anpassungen erforderlich - Design war optimal |

### Nicht verwendet
*Alle Vorschläge wurden vollständig verwendet*

---

## 🎓 Lessons Learned

### Was gut funktioniert hat
1. **JSON-basierte Dialoge**: Extrem flexibel und wartungsfreundlich
2. **Spürhund-Metapher**: Macht komplexes System zugänglich und sympathisch
3. **Modulare Architektur**: agent.css/js können für andere Tools wiederverwendet werden
4. **Action-Types**: 4 verschiedene Types (navigate, showInfo, askQuestion, executeFunction) decken alle Use-Cases ab
5. **Section-Triggers**: Automatische Aktivierung verbessert proaktive Hilfe erheblich

### Was nicht optimal war
1. JSON-Datei muss noch manuell befüllt werden (zeitaufwendig)
2. IDs müssen manuell vergeben werden (fehleranfällig)

### Verbesserungen für zukünftige Prompts
- **Präziser formulieren:** Beispiel-Dialoge direkt im Prompt mitgeben
- **Mehr Kontext geben:** Spezifische Use-Cases für Trigger beschreiben
- **Beispiele hinzufügen:** Komplette JSON-Datei mit 5-10 Beispiel-Dialogen generieren lassen

---

## 🔗 Verknüpfungen

### Abhängigkeiten
- **Prompt_001:** Grundstruktur mit Sections
- **Prompt_002:** Modulare Dateiarchitektur
- **Prompt_003:** Notizblock als Vorbild für Sidebar-Pattern

### Follow-up Prompts
- **Prompt_007:** JSON-Dialoge befüllen (geplant für Tag 2)
- **Prompt_008:** Inline-Trigger platzieren (geplant für Tag 2)
- **Prompt_009:** Section-Trigger konfigurieren (geplant für Tag 2)

### Verwandte Dateien
- `src/agent.css` (erstellt)
- `src/agent.js` (erstellt)
- `src/agent-dialogs.json` (zu erstellen)
- `manuals/agent-implementation.md` (erstellt)
- `manuals/json-structure.md` (erstellt)

---

## 📊 Qualitätsbewertung

### Code-Qualität
⭐⭐⭐⭐⭐ (5/5)

**Begründung:**
Exzellente Code-Qualität. Sauber strukturiert, gut kommentiert, moderne JavaScript-Patterns. CSS-Animationen sind smooth und performant. Barrierefreie Umsetzung mit ARIA-Labels.

### Dokumentations-Qualität
⭐⭐⭐⭐⭐ (5/5)

**Begründung:**
Außergewöhnlich umfassende Dokumentation. JSON-Struktur mit vielen Beispielen. Implementierungsanleitung ist detailliert und verständlich. Best Practices dokumentiert.

### Nützlichkeit
⭐⭐⭐⭐⭐ (5/5)

**Begründung:**
Dies ist das Killer-Feature des gesamten Projekts. Der Agent macht die Anwendung von einem statischen Leitfaden zu einem interaktiven, intelligenten Assistenten. Zwei-Ebenen-System ist innovativ und sehr nützlich.

---

## 💭 Kommentare & Notizen

### Technische Notizen
- Agent-Toggle-Button: `position: fixed; right: 0; top: calc(50% - 80px)`
- Chat-Historie in `agentConversationHistory` Array gespeichert
- Typing-Indikator mit CSS-Animation (3 Dots)
- Section-Trigger nutzen Intersection Observer mit 70% Threshold
- Context-Blöcke werden dynamisch in den Leitfaden eingefügt

### Offene Fragen
1. Sollte Agent KI-Integration haben (OpenAI API)? → Später evaluieren
2. Voice-Input/Output für Agent? → Nice-to-Have für v2.0
3. Multi-Language Support für Agent-Dialoge? → Geplant für v2.0

### Ideen für die Zukunft
- **Lernfähiger Agent**: Merkt sich Benutzer-Präferenzen
- **Voice Interface**: Spracheingabe/-ausgabe
- **Video-Integration**: Agent kann Videos als Hilfe anzeigen
- **Gamification**: Agent vergibt Achievements
- **Team-Features**: Agent kann zwischen Kollegen vermitteln
- **Analytics**: Agent trackt welche Hilfen am häufigsten genutzt werden

---

## 📎 Anhänge

### Screenshots
*Geplant für Tag 2*

### Externe Links
- [JSON Schema Specification](https://json-schema.org/)
- [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

## ✏️ Changelog

| Datum | Version | Änderung | Bearbeiter |
|-------|---------|----------|------------|
| 29.09.2025 | 1.0 | Erstellt | Alexander Reintzsch |

---

## 🏷️ Tags

`#agent` `#spürhund` `#rex` `#chat-interface` `#json-dialoge` `#zwei-ebenen-system` `#killer-feature` `#innovation` `#tag1`