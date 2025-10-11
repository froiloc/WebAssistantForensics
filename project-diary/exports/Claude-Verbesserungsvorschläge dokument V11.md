# Verbesserungsvorschläge dokument V11

**Created:** 10/8/2025 11:33:30  
**Updated:** 10/8/2025 12:02:18  
**Exported:** 10/11/2025 4:02:20  
**Link:** [https://claude.ai/chat/0f02c317-311c-41ff-b141-f284cbc15361](https://claude.ai/chat/0f02c317-311c-41ff-b141-f284cbc15361)  

## Prompt:
8.10.2025, 11:33:31

Kannst du bitte die Arbeit aus dem letzten Chat "Verbesserungsvorschläge (Sammlung)" fortsetzen und das Dokument V11 fertig erzeugen? Danke!



## Response:
8.10.2025, 11:34:31

Ich suche zunächst nach dem letzten Chat und den relevanten Dokumenten im Projekt-Dateispeicher.

**conversation_search**

*Request*

````javascript
{
  "query": "Verbesserungsvorschläge Sammlung V11"
}
````

*Response*

````plaintext
<chat url='https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0' updated_at=2025-10-08T02:16:55.115577+00:00>Verbesserungsvorschläge (Sammlung)
<chat_conversation>Title: Verbesserungsvorschläge (Sammlung)

Human: Ich benötige Hilfe bei der Datei styles.css, die in aktueller Version im Projekt-Dateispeicher liegt.

Dort ist die Farbe der sekundären Schaltflächen noch nicht okay.

Kannst du hier bitte einen Vorschlag machen? Das wird verwendet von den Schaltfläche "Zeit: Relativ/Absolut", "Verlauf löschen" und "Notizen löschen". Die Farbe ist unpassend und recht starr. Ebenso ist die Schrift darauf extrem schwer zu lesen.

Der Vorschlag muss für alle 4 themes passen. Danke!

Assistant:  Ich suche zunächst die aktuelle Version der styles.css im Projekt-Dateispeicher, um die bestehende Gestaltung der sekundären Schaltflächen zu analysieren.
<tool name="project_knowledge_search">
<parameter name="query">styles.css sekundäre Schaltflächen secondary button</parameter>
</tool>
Ich habe die aktuelle styles.css analysiert. Nun schaue ich mir die vollständige Definition der sekundären Schaltflächen an, um einen passenderen Vorschlag zu erarbeiten.
<tool name="project_knowledge_search">
<parameter name="query">btn-secondary color background theme hochkontrast</parameter>
</tool>
Perfekt! Ich habe nun ein vollständiges Bild der aktuellen Situation. Die sekundären Schaltflächen (`.btn-secondary`) verwenden derzeit:

**Aktueller Zustand:**
- Hintergrundfarbe: `var(--color-error)` (also Rot-Töne wie #780F2D im Tag-Modus)
- Textfarbe: `var(--color-surface-elevated)` (Weiß)
- Hover: Hartcodiertes `#c82333` (funktioniert nicht in allen Themes)

**Probleme:**
1. **Semantisch unpassend**: Error-Farbe für neutrale Aktionen (Zeitformat-Umschaltung)
2. **Starr codiert**: Hover-Farbe ist hartcodiert und passt sich nicht an Themes an
3. **Schlechte Lesbarkeit**: Kontrast zwischen Rot und Weiß ist zwar ausreichend, aber nicht optimal

Ich erarbeite nun einen Verbesserungsvorschlag:

---

## **Vorschlag für sekundäre Schaltflächen**

Ich schlage vor, die `.btn-secondary` Klasse vollständig zu überarbeiten und sie **semantisch neutral** sowie **theme-adaptiv** zu gestalten. Die Schaltflächen sollen sich klar von primären Aktionen unterscheiden, ohne eine fehlerhafte oder alarmierende Konnotation zu vermitteln.</chat>

<chat url='https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0' updated_at=2025-10-08T02:16:55.115577+00:00>Verbesserungsvorschläge (Sammlung)
CSS-Variablen nutzen

`​`​`css
/* ❌ Nicht so */
.button {
    color: #004B76;
    background: #FAFAFA;
}

/* ✅ Sondern so */
.button {
    color: var(--color-primary);
    background: var(--color-surface);
}
`​`​`

### 3. Transitions in CSS

`​`​`css
/* ❌ Nicht in JS */
element.style.transition = 'opacity 0.3s';

/* ✅ Sondern in CSS */
.element {
    transition: opacity var(--transition-medium);
}
`​`​`

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*</parameter>
<parameter name="version_uuid">096f4c82-7e94-45f4-93c9-3c4dd1fb3c7a</parameter>
</tool>
Perfekt! Ich habe V04 nochmal als eigenständiges Artifact erstellt. Das war das gleiche Dokument wie "v04-css-html-js-separation", nur jetzt mit dem deutschen Titel wie Sie es wünschten.

**V04-CSS-HTML-JS-Trennung.md** ist jetzt verfügbar und enthält:
- ✅ Vollständige Problembeschreibung
- ✅ Lösungsansätze mit Code-Beispielen
- ✅ Implementierungsstrategie (3 Phasen)
- ✅ Sidebar-Manager Migrations-Beispiel
- ✅ Code-Konventionen & Ausnahmen
- ✅ Checkliste für Migration
- ✅ Best Practices

Sie haben nun **alle 10 Dokumente** vollständig! 🎉</chat_conversation></chat>

<chat url='https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0' updated_at=2025-10-08T02:16:55.115577+00:00>Verbesserungsvorschläge (Sammlung)
UI-Integration

**Menu-Item erweitern:**

`​`​`html
<button class="menu-item" id="toggle-media-layer" role="menuitem">
    <span class="menu-icon">🖼️</span>
    Medien: <span id="media-layer-status">Standard</span>
</button>
`​`​`

**JavaScript für Cycling:**

`​`​`javascript
function cycleMediaLayer() {
    const order = ['standard', 'show-only', 'text-only', 'full'];
    const currentIndex = order.indexOf(currentMediaLayer);
    const nextIndex = (currentIndex + 1) % order.length;
    const nextLayer = order[nextIndex];
    
    setMediaLayer(nextLayer);
}

function getMediaLayerDisplayName(layer) {
    const names = {
        'standard': 'Standard',
        'show-only': 'Nur Anweisungen',
        'text-only': 'Nur Text',
        'full': 'Vollständig'
    };
    return names[layer] || layer;
}
`​`​`

### Vorteile

✅ **Zielgruppen-gerecht:** Verschiedene Lerntypen unterstützt  
✅ **Schnelligkeit:** Erfahrene User kommen direkt zum Punkt  
✅ **Übersichtlichkeit:** Weniger visueller Clutter  
✅ **Chef-Happy:** Erfüllt explizite Anforderung 😊

**Aufwand:** 3-4 Stunden

---

## 🤖 Verbesserungsvorschlag 8: Agent FAQ & Feedback-System

**Priorität:** 🟡 Mittel  
**Aufwand:** 6-8 Stunden  
**Status:** Im Scope, nicht dringend

### Feature-Beschreibung

Erweiterung des bestehenden Agenten um:
1. **FAQ-System:** Intelligente Suche in häufigen Fragen
2. **Feedback-Funktion:** Direkte Kontaktmöglichkeit per E-Mail

### Architektur

#### 1. FAQ-Datenstruktur

**Datei: `agent-faq.json`**

`​`​`json
{
  "version": "1.0",
  "updated": "2025-10-04",
  "faqs": [
    {
      "id": "export-dauer",
      "question": "Wie lange dauert ein Export?",
      "answer": "Die Dauer hängt von der Datenmenge ab. Ein Smartphone-Export dauert typischerweise 30-90 Minuten. Computer-Exports können mehrere Stunden in Anspruch nehmen.",
      "tags": ["export", "dauer", "zeit", "lange"],
      "category": "allgemein",
      "relatedSections": ["step1", "step2"],
      "priority": 1
    },
    {
      "id": "fehler-export",
      "question": "Was tun bei Export-Fehlern?",
      "answer": "Prüfen Sie zunächst die Verbindung zum Gerät. Stellen Sie sicher, dass genügend Speicherplatz vorhanden ist. Bei persistenten Fehlern konsultieren Sie das Error-Log in AXIOM Process unter 'View' → 'Processing Log'.",
      "tags": ["fehler", "error", "problem", "export", "funktioniert nicht"],
      "category": "troubleshooting",
      "relatedSections": ["troubleshooting"],
      "priority": 2
    },
    {
      "id": "hash-pruefen",
      "question": "Wie prüfe ich Hash-Werte?",
      "answer": "Hash-Werte werden automatisch berechnet und im Report angezeigt. Sie finden sie unter 'Evidence' → 'Properties'. Zur manuellen Verifikation nutzen Sie Tools wie 'certutil' (Windows) oder 'shasum' (Mac/Linux).</chat>

<chat url='https://claude.ai/chat/cedb24b9-244d-41fd-81b9-300e3e9918ed' updated_at=2025-10-04T09:11:20.953841+00:00>Continuing previous conversation
**

4. **Die beiden Versionen von `script-section-management.js` - können Sie mir sagen, welche Dateinamen oder Versionsnummern diese haben? (z.B. "script-section-management-v040.js" und "script-section-management.js")?**

Sobald ich diese Punkte verstehe, kann ich gezielt nach der Fehlerquelle suchen und eine Lösung vorschlagen.

Human: Okay. Wir sind auf unterschiedlichen Planeten. Ich werde diesen Chat schließen, da hier schon bereits zu viel falsch läuft. Der Inhalt dieses einzelnen Chats ist für das Projekt nicht relevant. Du bist in die Irre gelaufen. Ich werden neu beginnen. Und zwar in einem neuen Chat.

Assistant:  Verstanden. Sie haben völlig recht - ich bin offensichtlich in die falsche Richtung gelaufen und habe das eigentliche Problem nicht erfasst. 

**Es tut mir leid für die vergeudete Zeit.** Ein Neustart in einem frischen Chat ist die richtige Entscheidung, um ohne diesen Ballast neu anzusetzen.

Für den neuen Chat würde ich empfehlen:
- Beschreiben Sie das Problem direkt und konkret
- Nennen Sie die betroffenen Dateien explizit
- Zeigen Sie mir ggf. den relevanten Code-Ausschnitt

Viel Erfolg beim Neustart! 👋</chat_conversation></chat>

<chat url='https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0' updated_at=2025-10-08T02:16:55.115577+00:00>Verbesserungsvorschläge (Sammlung)
HTML-Struktur in `index.html` einfügen (nach History-Sidebar)
2. CSS in `styles.css` einfügen
3. `script-favorites.js` erstellen und in `index.html` einbinden
4. Stern-Buttons zu allen Sections hinzufügen
5. Testen: Hinzufügen, Entfernen, Suchen, Sortieren

### Script-Einbindung in index.html:
`​`​`html
<script src="script-favorites.js"></script>
`​`​`

**Aufwand:** 6-8 Stunden

---

## Vorteile

✅ **Schneller Zugriff** auf wichtige Abschnitte  
✅ **Intelligente Suche** mit Fuzzy-Matching (Levenshtein)  
✅ **Flexible Sortierung** nach verschiedenen Kriterien  
✅ **Persistenz** über Browser-Sessions hinweg  
✅ **Usage-Tracking** für bessere Sortierung  
✅ **Visuelles Feedback** durch Animationen

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*</parameter>
<parameter name="version_uuid">a0376240-df3f-4151-806f-5e84534d3794</parameter>
</tool>
<tool name="artifacts">
<parameter name="id">v07-show-only-mode</parameter>
<parameter name="type">text/markdown</parameter>
<parameter name="title">V07 - Don't tell; just show Modus</parameter>
<parameter name="command">create</parameter>
<parameter name="content"># V07: "Don't tell; just show"-Modus

**Priorität:** 🟠 Hoch (Chef-Priorität!)  
**Aufwand:** 3-4 Stunden  
**Status:** Zeitnah umsetzen

---

## Feature-Beschreibung

Ein spezieller Anzeigemodus für Anwender, die:
- Nur die praktischen Schritte sehen wollen
- Keine theoretischen Erklärungen benötigen
- Schnell zum Ziel kommen möchten

**Verhalten:**
- Im **Standard-Modus**: Normale Anzeige mit Erklärungen
- Im **Vollständig-Modus**: Alle Inhalte sichtbar
- Im **Show-Only-Modus**: Nur Anweisungen und Visuals, keine Erklärungen

---

## HTML-Markup-Konvention

### Neue Data-Attribute für Content-Typen

Jeder Inhalts-Block erhält ein `data-content-type` Attribut:

`​`​`html
<section class="content-section" data-section="step1">
    <h2>Sch</parameter>
<parameter name="version_uuid">225f8e2e-154a-4f13-b283-821a56ff4f20</parameter>
</tool>

Human: Weiter

Assistant:  
<tool name="artifacts">
<parameter name="id">v07-show-only-mode</parameter>
<parameter name="command">update</parameter>
<parameter name="new_str">`​`​`html
<section class="content-section" data-section="step1">
    <h2>Schritt 1: Export starten</h2>
    
    <!-- SHOW: Praktische Anweisungen (immer sichtbar im Show-Only) -->
    <div data-content-type="instruction">
        <ol>
            <li>Öffnen Sie AXIOM Process</li>
            <li>Klicken Sie auf "New Case"</li>
            <li>Wählen Sie die Datenquelle aus</li>
        </ol>
    </div>
    
    <!-- TELL: Erklärungen (versteckt im Show-Only Modus) -->
    <div data-content-type="explanation">
        <p>
            AXIOM Process ist die erste Stufe der Datenverarbeitung.</chat>
````

Guten Tag! Ich suche jetzt nach dem aktuellen Stand des Dokuments V11 im Projekt-Dateispeicher.

**project_knowledge_search**

*Request*

````javascript
{
  "query": "V11 Verbesserungsvorschläge Sammlung Dokument"
}
````

*Response*

````plaintext
validate_html_structure.py
   if self.verbose:
                print(f"âœ“ HTML-Datei erfolgreich geladen: {self.html_file}")
                print(f"  Gefundene Elemente: {len(self.soup.find_all())}")
            
            # Root-Element extrahieren falls angegeben
            if self.root_selector:
                root_element = self._extract_root_element(self.root_selector)
                if root_element is None:
                    return False  # Fehler beim Extrahieren
                self.validation_scope = root_element
                
                if self.verbose:
                    print(f"ðŸŽ¯ Validierungs-Scope eingeschrÃ¤nkt auf: {self.root_selector}")
            else:
                self.validation_scope = self.soup
                if self.verbose:
                    print(f"ðŸŽ¯ Validierungs-Scope: Gesamtes Dokument")
            
            return True
            
        except FileNotFoundError:
            self._add_result(False, f"HTML-Datei nicht gefunden: {self.html_file}", severity="error")
            return False
        except Exception as e:
            self._add_result(False, f"Fehler beim Laden der HTML-Datei: {e}", severity="error")
            return False
    
    def _extract_root_element(self, root_selector: str) -> Optional[Tag]:
        """
        Extrahiert das Wurzelelement basierend auf CSS-Selector.
        
        Returns:
            Tag-Objekt des Wurzelelements oder None bei Fehler
        """
        if not root_selector:
            return None
        
        try:
            elements = self.soup.select(root_selector)
            
            if len(elements) == 0:
                self._add_result(
                    False,
                    f"Root-Tag Selector '{root_selector}' findet kein Element im Dokument",
                    severity="error"
                )
                return None
            
            if len(elements) > 1:
                self._add_result(
                    False,
                    f"Root-Tag Selector '{root_selector}' findet {len(elements)} Elemente. "
                    f"Verwende das erste Element. Nutzen Sie nth-child fÃ¼r spezifischere Auswahl.
````

````plaintext
v09-animation-harmonization.md
# V09: Animations- und Transitions-Harmonisierung

**PrioritÃ¤t:** ðŸ”´ Sehr hoch (UX-kritisch!)  
**Aufwand:** 4-6 Stunden  
**Status:** Sofort umsetzen

---

## Problembeschreibung

**Aktueller Zustand:**
- Linke Sidebar (Navigation) und rechte Sidebar (Notizen) fÃ¼hlen sich unterschiedlich an
- Inkonsistente Transition-Timings zwischen verschiedenen UI-Elementen
- Unterschiedliche Easing-Functions fÃ¼hren zu uneinheitlichem BewegungsgefÃ¼hl
- Teilweise ruckelige Animationen ohne GPU-Beschleunigung

**Ziel:**
Einheitliches, flÃ¼ssiges und professionelles Animations-Erlebnis Ã¼ber alle UI-Komponenten hinweg.

---

## LÃ¶sungsansatz

### 1. Zentrale Animation-Variablen

**In `styles.css` unter `:root` erweitern:**

`​`​`css
:root {
    /* Bestehende Transitions */
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
    
    /* NEU: Erweiterte Animation-Variablen */
    --transition-slow: 0.5s ease;
    
    /* Easing Functions */
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.0, 0, 0.2, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    /* Sidebar-spezifische Timings */
    --sidebar-transition-duration: 0.35s;
    --sidebar-transition-easing: var(--ease-smooth);
    
    /* Tooltip/Modal Timings */
    --tooltip-transition: 0.2s var(--ease-out);
    --modal-transition: 0.3s var(--ease-smooth);
}
`​`​`

---

## 2.
````

````plaintext
agent-dialogs.schema.json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://axiom-guide.local/schemas/agent-dialogs.json",
  "title": "AXIOM Agent Dialogs Configuration",
  "description": "Schema fÃ¼r Agent-Dialog-Konfigurationen im AXIOM HTML-Report Leitfaden",
  "type": "object",
  "required": ["version", "metadata", "dialogs", "globalSettings"],
  
  "properties": {
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+$",
      "description": "Versionsnummer im Format 'Major.Minor'"
    },
    
    "metadata": {
      "type": "object",
      "required": ["description", "created", "agent_name", "selector_system"],
      "properties": {
        "description": {
          "type": "string",
          "description": "Kurze Beschreibung der Dialog-Konfiguration"
        },
        "created": {
          "type": "string",
          "format": "date",
          "description": "Erstellungsdatum im Format YYYY-MM-DD"
        },
        "agent_name": {
          "type": "string",
          "description": "Name des Agenten (z.B. 'SpÃ¼rhund Rex')"
        },
        "selector_system": {
          "type": "string",
          "description": "Beschreibung des verwendeten Selector-Systems"
        }
      }
    },
    
    "dialogs": {
      "type": "object",
      "description": "Sammlung aller verfÃ¼gbaren Dialoge",
      "patternProperties": {
        "^[a-zA-Z][a-zA-Z0-9_-]*$": {
          "$ref": "#/$defs/Dialog"
        }
      }
    },
    
    "sectionTriggers": {
      "type": "object",
      "description": "Automatische Trigger basierend auf Section-Interaktion",
      "patternProperties": {
        "^[a-zA-Z][a-zA-Z0-9_-]*$": {
          "$ref": "#/$defs/SectionTrigger"
        }
      }
    },
    
    "globalSettings": {
      "$ref": "#/$defs/GlobalSettings"
    },
    
    "responsePatterns": {
      "$ref": "#/$defs/ResponsePatterns"
    }
  },
  
  "$defs": {
    "Dialog": {
      "type": "object",
      "required": ["id", "title", "targetSelectors"],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "Eindeutige Dialog-ID (alphanumerisch, Bindestriche und Unterstriche erlaubt)"
        },
        "title": {
          "type": "string",
          "minLength": 1,
          "description": "Menschenlesbarer Titel des Dialogs"
        },
        "description": {
          "type": "string",
          "description": "Optionale Beschreibung des Dialog-Zwecks"
        },
        "targetSelectors": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[#.]?[a-zA-Z][a-zA-Z0-9_-]*.
````

````plaintext
Template: Prompt-Dokumentation.md
*

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
2.
````

````plaintext
validate_html_structure.py
f"Verwende das erste Element. Nutzen Sie nth-child fÃ¼r spezifischere Auswahl.",
                    severity="warning"
                )
            
            root_element = elements[0]
            
            if self.verbose:
                print(f"âœ“ Root-Element gefunden: {self._get_element_info(root_element)}")
                print(f"  Elemente im Teilbaum: {len(root_element.find_all())}")
            
            return root_element
            
        except Exception as e:
            self._add_result(
                False,
                f"Fehler beim Verarbeiten des Root-Tag Selectors '{root_selector}': {e}",
                severity="error"
            )
            return None
    
    def validate_all(self) -> ValidationSummary:
        """FÃ¼hrt alle Validierungen durch"""
        if not self.load_html():
            return self._create_summary()
        
        # Alle Validierungen durchfÃ¼hren
        self._validate_id_uniqueness()
        self._validate_standard_granularity()
        self._validate_orphan_elements()
        self._validate_css_selector_compatibility()
        self._validate_agent_elements()
        self._validate_section_structure()
        self._validate_media_accessibility()
        
        return self._create_summary()
    
    def _validate_id_uniqueness(self) -> None:
        """Validiert Eindeutigkeit aller ID-Attribute (GLOBAL)"""
        if self.verbose:
            print("\nðŸ” Validiere ID-Eindeutigkeit (global)...")
        
        # WICHTIG: Immer im gesamten Dokument prÃ¼fen, nicht nur im Scope
        id_elements = self.soup.find_all(id=True)
        id_counter = Counter(element.get('id') for element in id_elements)
        
        duplicates = {id_val: count for id_val, count in id_counter.items() if count > 1}
        
        if duplicates:
            for id_val, count in duplicates.items():
                elements = self.soup.find_all(id=id_val)
                element_info = ", ".join([self._get_element_info(el) for el in elements[:3]])
                self._add_result(
                    False, 
                    f"ID '{id_val}' ist {count}x vorhanden (muss eindeutig sein)",
                    element_info=element_info,
                    severity="error"
                )
        else:
            if self.verbose:
                print(f"  âœ“ Alle {len(id_counter)} IDs sind eindeutig")
            self._add_result(
                True, 
                f"Alle {len(id_counter)} IDs sind eindeutig (global)", 
                severity="info"
            )
    
    def _validate_standard_granularity(self) -> None:
        """Validiert ob alle Standard-Elemente data-ref haben"""
        if self.verbose:
            print("\nðŸ” Validiere Standard-GranularitÃ¤t (data-ref)...")
        
        missing_data_ref = []
        
        for element_selector in self.STANDARD_ELEMENTS:
            if '.'
````

````plaintext
v09-animation-harmonization.md
Micro-Animations fÃ¼r Feedback

`​`​`css
/* ===== MICRO-ANIMATIONS ===== */

/* Pulse fÃ¼r wichtige Aktionen */
@keyframes pulse {
    0%, 100% { 
        transform: scale(1);
    }
    50% { 
        transform: scale(1.05);
    }
}

.pulse {
    animation: pulse 0.6s var(--ease-smooth);
}

/* Shake fÃ¼r Fehler */
@keyframes shake {
    0%, 100% { 
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-4px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(4px);
    }
}

.shake {
    animation: shake 0.5s var(--ease-smooth);
}

/* Bounce fÃ¼r Erfolg */
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-8px);
    }
}

.bounce {
    animation: bounce 0.6s var(--ease-smooth);
}

/* Fade-In fÃ¼r neue Elemente */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn var(--transition-medium) var(--ease-smooth);
}

/* Fade-Out */
@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}

.fade-out {
    animation: fadeOut var(--transition-medium) var(--ease-smooth);
}
`​`​`

---

## 7. Performance-Optimierungen

`​`​`css
/* ===== PERFORMANCE: GPU-ACCELERATION ===== */

.sidebar-container,
.notes-sidebar,
.modal-content,
.onboarding-tooltip,
.glossar-tooltip {
    /* GPU-Beschleunigung fÃ¼r smooth animations */
    will-change: transform, opacity;
    backface-visibility: hidden;
    perspective: 1000px;
}

/* WICHTIG: will-change nur auf animierten Elementen! */
/* Nach Animation entfernen (via JS oder automatisch) */
`​`​`

### Performance-Best-Practices:

**âœ… GUT - Transform verwenden:**
`​`​`css
.sidebar {
    transform: translateX(-100%);
}
`​`​`

**âŒ SCHLECHT - Position verwenden:**
`​`​`css
.sidebar-old {
    left: -280px;  /* Triggert Reflow! */
}
`​`​`

---

## 8. Accessibility: Reduced Motion

`​`​`css
/* ===== REDUCED MOTION SUPPORT ===== */

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    
    /* Behalte nur essential transitions */
    .sidebar-container,
    .notes-sidebar,
    .modal-backdrop {
        transition: opacity 0.15s ease;
    }
}
`​`​`

---

## 9.
````

````plaintext
validate_agent_json.py
electors: Set[str] = set()
        self.found_selectors: Set[str] = set()
        self.missing_selectors: Set[str] = set()
    
    def load_files(self) -> bool:
        """LÃ¤dt alle benÃ¶tigten Dateien"""
        success = True
        
        # JSON laden
        try:
            with open(self.json_file, 'r', encoding='utf-8') as f:
                self.json_data = json.load(f)
            
            if self.verbose:
                print(f"âœ“ JSON-Datei geladen: {self.json_file}")
                
        except FileNotFoundError:
            self._add_result(False, f"JSON-Datei nicht gefunden: {self.json_file}")
            success = False
        except json.JSONDecodeError as e:
            self._add_result(False, f"JSON-Syntax-Fehler: {e}")
            success = False
        except Exception as e:
            self._add_result(False, f"Fehler beim Laden der JSON-Datei: {e}")
            success = False
        
        # HTML laden
        try:
            with open(self.html_file, 'r', encoding='utf-8') as f:
                html_content = f.read()
            
            self.html_soup = BeautifulSoup(html_content, 'html.parser')
            
            if self.verbose:
                print(f"âœ“ HTML-Datei geladen: {self.html_file}")
                print(f"  Gefundene Elemente: {len(self.html_soup.find_all())}")
            
            # Root-Element extrahieren
            if not self._extract_root_element():
                success = False
            else:
                if self.verbose and self.root_selector:
                    print(f"ðŸŽ¯ HTML-Validierungs-Scope eingeschrÃ¤nkt auf: {self.root_selector}")
                elif self.verbose:
                    print(f"ðŸŽ¯ HTML-Validierungs-Scope: Gesamtes Dokument")
                
        except FileNotFoundError:
            self._add_result(False, f"HTML-Datei nicht gefunden: {self.html_file}")
            success = False
        except Exception as e:
            self._add_result(False, f"Fehler beim Laden der HTML-Datei: {e}")
            success = False
        
        # Schema laden (optional)
        if self.schema_file and self.schema_file.exists():
            try:
                with open(self.schema_file, 'r', encoding='utf-8') as f:
                    self.schema = json.load(f)
                
                if self.verbose:
                    print(f"âœ“ Schema-Datei geladen: {self.schema_file}")
                    
            except Exception as e:
                self._add_result(
                    False, 
                    f"Warnung: Schema konnte nicht geladen werden: {e}",
                    severity="warning"
                )
        
        return success
    
    def _extract_root_element(self) -> bool:
        """
        Extrahiert das Wurzelelement basierend auf CSS-Selector.
````

````plaintext
validate_html_structure.py
     
        for section in sections:
            # Jede Section braucht id und data-section
            if not section.get('id'):
                problems.append((section, "content-section ohne id"))
            
            if not section.get('data-section'):
                problems.append((section, "content-section ohne data-section"))
            
            # data-title fÃ¼r Navigation empfohlen
            if not section.get('data-title'):
                problems.append((section, "content-section ohne data-title (empfohlen)"))
        
        if problems:
            for element, problem in problems:
                severity = "warning" if "empfohlen" in problem else "error"
                self._add_result(
                    False,
                    f"Section-Problem: {problem}",
                    element_info=self._get_element_info(element),
                    severity=severity
                )
        else:
            if self.verbose:
                print(f"  âœ“ Alle {len(sections)} Sections korrekt strukturiert")
            self._add_result(True, f"Alle {len(sections)} Sections korrekt", severity="info")
   
    def _validate_media_accessibility(self) -> None:
        """Validiert Barrierefreiheit von Medien-Elementen"""
        if self.verbose:
            print("\nðŸ” Validiere Medien-Barrierefreiheit...")
        
        problems = []
        
        # Alle img-Tags prÃ¼fen
        images = self.validation_scope.find_all('img')
        for img in images:
            # Alt-Attribut muss vorhanden sein
            if not img.get('alt'):
                problems.append((img, "img ohne alt-Attribut (Pflichtfeld)"))
            # Alt-Text sollte aussagekrÃ¤ftig sein (mind. 10 Zeichen)
            elif len(img.get('alt', '').strip()) < 10:
                problems.append((img, f"img mit zu kurzem alt-Text: '{img.get('alt')}' (mind.
````

**project_knowledge_search**

*Request*

````javascript
{
  "query": "V11 Dokument Verbesserungsvorschlag"
}
````

*Response*

````plaintext
validate_html_structure.py
   if self.verbose:
                print(f"âœ“ HTML-Datei erfolgreich geladen: {self.html_file}")
                print(f"  Gefundene Elemente: {len(self.soup.find_all())}")
            
            # Root-Element extrahieren falls angegeben
            if self.root_selector:
                root_element = self._extract_root_element(self.root_selector)
                if root_element is None:
                    return False  # Fehler beim Extrahieren
                self.validation_scope = root_element
                
                if self.verbose:
                    print(f"ðŸŽ¯ Validierungs-Scope eingeschrÃ¤nkt auf: {self.root_selector}")
            else:
                self.validation_scope = self.soup
                if self.verbose:
                    print(f"ðŸŽ¯ Validierungs-Scope: Gesamtes Dokument")
            
            return True
            
        except FileNotFoundError:
            self._add_result(False, f"HTML-Datei nicht gefunden: {self.html_file}", severity="error")
            return False
        except Exception as e:
            self._add_result(False, f"Fehler beim Laden der HTML-Datei: {e}", severity="error")
            return False
    
    def _extract_root_element(self, root_selector: str) -> Optional[Tag]:
        """
        Extrahiert das Wurzelelement basierend auf CSS-Selector.
        
        Returns:
            Tag-Objekt des Wurzelelements oder None bei Fehler
        """
        if not root_selector:
            return None
        
        try:
            elements = self.soup.select(root_selector)
            
            if len(elements) == 0:
                self._add_result(
                    False,
                    f"Root-Tag Selector '{root_selector}' findet kein Element im Dokument",
                    severity="error"
                )
                return None
            
            if len(elements) > 1:
                self._add_result(
                    False,
                    f"Root-Tag Selector '{root_selector}' findet {len(elements)} Elemente. "
                    f"Verwende das erste Element. Nutzen Sie nth-child fÃ¼r spezifischere Auswahl.
````

````plaintext
Template: Prompt-Dokumentation.md
*

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
2.
````

````plaintext
validate_html_structure.py
f"Verwende das erste Element. Nutzen Sie nth-child fÃ¼r spezifischere Auswahl.",
                    severity="warning"
                )
            
            root_element = elements[0]
            
            if self.verbose:
                print(f"âœ“ Root-Element gefunden: {self._get_element_info(root_element)}")
                print(f"  Elemente im Teilbaum: {len(root_element.find_all())}")
            
            return root_element
            
        except Exception as e:
            self._add_result(
                False,
                f"Fehler beim Verarbeiten des Root-Tag Selectors '{root_selector}': {e}",
                severity="error"
            )
            return None
    
    def validate_all(self) -> ValidationSummary:
        """FÃ¼hrt alle Validierungen durch"""
        if not self.load_html():
            return self._create_summary()
        
        # Alle Validierungen durchfÃ¼hren
        self._validate_id_uniqueness()
        self._validate_standard_granularity()
        self._validate_orphan_elements()
        self._validate_css_selector_compatibility()
        self._validate_agent_elements()
        self._validate_section_structure()
        self._validate_media_accessibility()
        
        return self._create_summary()
    
    def _validate_id_uniqueness(self) -> None:
        """Validiert Eindeutigkeit aller ID-Attribute (GLOBAL)"""
        if self.verbose:
            print("\nðŸ” Validiere ID-Eindeutigkeit (global)...")
        
        # WICHTIG: Immer im gesamten Dokument prÃ¼fen, nicht nur im Scope
        id_elements = self.soup.find_all(id=True)
        id_counter = Counter(element.get('id') for element in id_elements)
        
        duplicates = {id_val: count for id_val, count in id_counter.items() if count > 1}
        
        if duplicates:
            for id_val, count in duplicates.items():
                elements = self.soup.find_all(id=id_val)
                element_info = ", ".join([self._get_element_info(el) for el in elements[:3]])
                self._add_result(
                    False, 
                    f"ID '{id_val}' ist {count}x vorhanden (muss eindeutig sein)",
                    element_info=element_info,
                    severity="error"
                )
        else:
            if self.verbose:
                print(f"  âœ“ Alle {len(id_counter)} IDs sind eindeutig")
            self._add_result(
                True, 
                f"Alle {len(id_counter)} IDs sind eindeutig (global)", 
                severity="info"
            )
    
    def _validate_standard_granularity(self) -> None:
        """Validiert ob alle Standard-Elemente data-ref haben"""
        if self.verbose:
            print("\nðŸ” Validiere Standard-GranularitÃ¤t (data-ref)...")
        
        missing_data_ref = []
        
        for element_selector in self.STANDARD_ELEMENTS:
            if '.'
````

````plaintext
v09-animation-harmonization.md
# V09: Animations- und Transitions-Harmonisierung

**PrioritÃ¤t:** ðŸ”´ Sehr hoch (UX-kritisch!)  
**Aufwand:** 4-6 Stunden  
**Status:** Sofort umsetzen

---

## Problembeschreibung

**Aktueller Zustand:**
- Linke Sidebar (Navigation) und rechte Sidebar (Notizen) fÃ¼hlen sich unterschiedlich an
- Inkonsistente Transition-Timings zwischen verschiedenen UI-Elementen
- Unterschiedliche Easing-Functions fÃ¼hren zu uneinheitlichem BewegungsgefÃ¼hl
- Teilweise ruckelige Animationen ohne GPU-Beschleunigung

**Ziel:**
Einheitliches, flÃ¼ssiges und professionelles Animations-Erlebnis Ã¼ber alle UI-Komponenten hinweg.

---

## LÃ¶sungsansatz

### 1. Zentrale Animation-Variablen

**In `styles.css` unter `:root` erweitern:**

`​`​`css
:root {
    /* Bestehende Transitions */
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
    
    /* NEU: Erweiterte Animation-Variablen */
    --transition-slow: 0.5s ease;
    
    /* Easing Functions */
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.0, 0, 0.2, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    /* Sidebar-spezifische Timings */
    --sidebar-transition-duration: 0.35s;
    --sidebar-transition-easing: var(--ease-smooth);
    
    /* Tooltip/Modal Timings */
    --tooltip-transition: 0.2s var(--ease-out);
    --modal-transition: 0.3s var(--ease-smooth);
}
`​`​`

---

## 2.
````

````plaintext
validate_agent_json.py
electors: Set[str] = set()
        self.found_selectors: Set[str] = set()
        self.missing_selectors: Set[str] = set()
    
    def load_files(self) -> bool:
        """LÃ¤dt alle benÃ¶tigten Dateien"""
        success = True
        
        # JSON laden
        try:
            with open(self.json_file, 'r', encoding='utf-8') as f:
                self.json_data = json.load(f)
            
            if self.verbose:
                print(f"âœ“ JSON-Datei geladen: {self.json_file}")
                
        except FileNotFoundError:
            self._add_result(False, f"JSON-Datei nicht gefunden: {self.json_file}")
            success = False
        except json.JSONDecodeError as e:
            self._add_result(False, f"JSON-Syntax-Fehler: {e}")
            success = False
        except Exception as e:
            self._add_result(False, f"Fehler beim Laden der JSON-Datei: {e}")
            success = False
        
        # HTML laden
        try:
            with open(self.html_file, 'r', encoding='utf-8') as f:
                html_content = f.read()
            
            self.html_soup = BeautifulSoup(html_content, 'html.parser')
            
            if self.verbose:
                print(f"âœ“ HTML-Datei geladen: {self.html_file}")
                print(f"  Gefundene Elemente: {len(self.html_soup.find_all())}")
            
            # Root-Element extrahieren
            if not self._extract_root_element():
                success = False
            else:
                if self.verbose and self.root_selector:
                    print(f"ðŸŽ¯ HTML-Validierungs-Scope eingeschrÃ¤nkt auf: {self.root_selector}")
                elif self.verbose:
                    print(f"ðŸŽ¯ HTML-Validierungs-Scope: Gesamtes Dokument")
                
        except FileNotFoundError:
            self._add_result(False, f"HTML-Datei nicht gefunden: {self.html_file}")
            success = False
        except Exception as e:
            self._add_result(False, f"Fehler beim Laden der HTML-Datei: {e}")
            success = False
        
        # Schema laden (optional)
        if self.schema_file and self.schema_file.exists():
            try:
                with open(self.schema_file, 'r', encoding='utf-8') as f:
                    self.schema = json.load(f)
                
                if self.verbose:
                    print(f"âœ“ Schema-Datei geladen: {self.schema_file}")
                    
            except Exception as e:
                self._add_result(
                    False, 
                    f"Warnung: Schema konnte nicht geladen werden: {e}",
                    severity="warning"
                )
        
        return success
    
    def _extract_root_element(self) -> bool:
        """
        Extrahiert das Wurzelelement basierend auf CSS-Selector.
````

````plaintext
validate_html_structure.py
     
        for section in sections:
            # Jede Section braucht id und data-section
            if not section.get('id'):
                problems.append((section, "content-section ohne id"))
            
            if not section.get('data-section'):
                problems.append((section, "content-section ohne data-section"))
            
            # data-title fÃ¼r Navigation empfohlen
            if not section.get('data-title'):
                problems.append((section, "content-section ohne data-title (empfohlen)"))
        
        if problems:
            for element, problem in problems:
                severity = "warning" if "empfohlen" in problem else "error"
                self._add_result(
                    False,
                    f"Section-Problem: {problem}",
                    element_info=self._get_element_info(element),
                    severity=severity
                )
        else:
            if self.verbose:
                print(f"  âœ“ Alle {len(sections)} Sections korrekt strukturiert")
            self._add_result(True, f"Alle {len(sections)} Sections korrekt", severity="info")
   
    def _validate_media_accessibility(self) -> None:
        """Validiert Barrierefreiheit von Medien-Elementen"""
        if self.verbose:
            print("\nðŸ” Validiere Medien-Barrierefreiheit...")
        
        problems = []
        
        # Alle img-Tags prÃ¼fen
        images = self.validation_scope.find_all('img')
        for img in images:
            # Alt-Attribut muss vorhanden sein
            if not img.get('alt'):
                problems.append((img, "img ohne alt-Attribut (Pflichtfeld)"))
            # Alt-Text sollte aussagekrÃ¤ftig sein (mind. 10 Zeichen)
            elif len(img.get('alt', '').strip()) < 10:
                problems.append((img, f"img mit zu kurzem alt-Text: '{img.get('alt')}' (mind.
````

````plaintext
index.html
</p>
                        <p data-ref="pdf-advantages">
                            <strong>PDF-Vorteile:</strong> UnverÃ¤nderbar, gerichtsfest, druckoptimiert, plattformunabhÃ¤ngig, automatisches Inhaltsverzeichnis.
                        </p>
                        <p data-ref="xlsx-advantages">
                            <strong>XLSX-Vorteile:</strong> Timeline-Analysen, filterbare Tabellen, statistische Auswertungen, Weiterverarbeitung in Excel.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Best Practices -->
            <section class="content-section" 
                     id="section-bestpractices"
                     data-section="bestpractices"
                     data-title="Best Practices">
                     
                <h2 data-ref="heading">Wichtige Hinweise und Best Practices</h2>

                <div class="detail-level-1" data-ref="basic-warnings">
                    <div class="warning-box" data-ref="common-mistakes">
                        <h3 data-ref="mistakes-heading">HÃ¤ufige Fehler vermeiden</h3>
                        <ul data-ref="mistakes-list">
                            <li data-ref="mistake-large-reports"><strong>Zu groÃŸe Reports:</strong> "Select All" vermeiden, nur fallrelevante Kategorien wÃ¤hlen</li>
                            <li data-ref="mistake-missing-images"><strong>Fehlende Bilder:</strong> "Include preview images" muss aktiviert sein</li>
                            <li data-ref="mistake-old-templates"><strong>Veraltete Templates:</strong> RegelmÃ¤ÃŸig Templates aktualisieren</li>
                        </ul>
                    </div>
                </div>

                <div class="detail-level-2" data-ref="workflow-tips">
                    <div class="tip-box" data-ref="recommended-workflow">
                        <h3 data-ref="workflow-heading">Empfohlener Workflow</h3>
                        <ol data-ref="workflow-steps">
                            <li data-ref="workflow-step1"><strong>Vorbereitung:</strong> Wichtige Beweise taggen vor Export-Start</li>
                            <li data-ref="workflow-step2"><strong>Template nutzen:</strong> Zeitersparnis durch gespeicherte Vorlagen</li>
                            <li data-ref="workflow-step3"><strong>QualitÃ¤tskontrolle:</strong> HTML-Report in verschiedenen Browsern testen</li>
                            <li data-ref="workflow-step4"><strong>Archivierung:</strong> Templates und Processing-Logs dokumentieren</li>
                        </ol>
                    </div>
                </div>
            </section>

            <!-- Zusammenfassung -->
            <section class="content-section" 
                     id="section-summary"
                     data-section="summary"
                     data-title="Zusammenfassung">
                     
                <h2 data-ref="heading">Zusammenfassung</h2>

                <div class="detail-level-1" data-ref="summary-basic">
                    <p data-ref="main-conclusion">
                        HTML-Reports in AXIOM Examiner bieten <strong>polizeilichen Ermittlern eine leistungsfÃ¤hige, benutzerfreundliche LÃ¶sung</strong> fÃ¼r interaktive Evidenz-PrÃ¤sentation.
````

````plaintext
axiom-guide-implementation-doc.md
**Hierarchische Navigation:**
   - UntermenÃ¼s in der Navigation Sidebar
   - Verschachtelte Abschnitte aufklappbar

2. **Lesezeichen:**
   - Abschnitte als Favoriten markieren
   - Schnellzugriff auf wichtige Stellen

3. **Suchfunktion:**
   - Volltextsuche im Leitfaden
   - Ergebnisse mit Highlighting

4. **Export-Funktionen:**
   - Verlauf als PDF exportieren
   - Notizen als Textdatei speichern

5. **Mehrsprachen-Support:**
   - i18n fÃ¼r Tipps und UI-Texte
   - Sprachwechsel Ã¼ber MenÃ¼

---

## Support und Debugging

### **HÃ¤ufige Probleme:**

**Problem: Tipps wechseln nicht**
- LÃ¶sung: PrÃ¼fen Sie, ob `startTipRotation()` aufgerufen wird
- Console: Schauen Sie nach JavaScript-Fehlern

**Problem: Navigation Sidebar bleibt leer**
- LÃ¶sung: Stellen Sie sicher, dass alle Sections `data-section` und `data-title` Attribute haben
- PrÃ¼fen Sie: `document.querySelectorAll('.content-section[data-section]')`

**Problem: Verlauf funktioniert nicht**
- LÃ¶sung: localStorage kÃ¶nnte deaktiviert sein
- Alternative: Verwenden Sie sessionStorage als Fallback

**Problem: OpazitÃ¤t funktioniert nicht**
- LÃ¶sung: Intersection Observer wird mÃ¶glicherweise nicht unterstÃ¼tzt
- Fallback: Implementieren Sie Scroll-basierte LÃ¶sung

---

## Abschluss

Alle drei Features sind nun vollstÃ¤ndig implementiert und funktionieren zusammen. Die modulare Struktur ermÃ¶glicht einfache Wartung und Erweiterung.

**NÃ¤chste Schritte:**
1. Features testen
2. Anpassungen vornehmen
3. Weitere Abschnitte zum Leitfaden hinzufÃ¼gen
4. ZusÃ¤tzliche Tipps ergÃ¤nzen
````

**project_knowledge_search**

*Request*

````javascript
{
  "query": "V10 V11 Sammlungsdokument Liste"
}
````

*Response*

````plaintext
V04 - CSS-HTML-JS-Trennung.md
JavaScript Style-Manipulation zu CSS-Klassen

### VORHER (JavaScript):
`​`​`javascript
function showElement(element) {
    element.style.display = 'block';
    element.style.opacity = '1';
}

function hideElement(element) {
    element.style.display = 'none';
    element.style.opacity = '0';
}

function positionTooltip(element, x, y) {
    element.style.top = `${y}px`;
    element.style.left = `${x}px`;
}
`​`​`

### NACHHER (JavaScript):
`​`​`javascript
function showElement(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}

function hideElement(element) {
    element.classList.add('hidden');
    element.classList.remove('visible');
}

function positionTooltip(element, x, y) {
    // CSS Custom Properties für dynamische Werte
    element.style.setProperty('--tooltip-x', `${x}px`);
    element.style.setProperty('--tooltip-y', `${y}px`);
}
`​`​`

### NACHHER (styles.css):
`​`​`css
.element {
    display: none;
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.element.visible {
    display: block;
    opacity: 1;
}

.tooltip {
    position: fixed;
    top: var(--tooltip-y, 0);
    left: var(--tooltip-x, 0);
}
`​`​`

---

## 3. State-basierte CSS-Klassen

### Konzept: Data-Attributes für States

**HTML:**
`​`​`html
<div class="sidebar-container" data-state="closed" data-active-sidebar="none">
    <!-- Content -->
</div>
`​`​`

**CSS:**
`​`​`css
/* CSS reagiert auf State */
.sidebar-container[data-state="closed"] {
    transform: translateX(-100%);
}

.sidebar-container[data-state="open"] {
    transform: translateX(0);
}

.sidebar-container[data-active-sidebar="navigation"] .sidebar-navigation {
    display: flex;
}

.sidebar-container[data-active-sidebar="history"] .sidebar-history {
    display: flex;
}
`​`​`

**JavaScript:**
`​`​`javascript
// JavaScript ändert nur Attribute
function openSidebar(sidebarId) {
    const container = document.querySelector('.sidebar-container');
    container.setAttribute('data-state', 'open');
    container.setAttribute('data-active-sidebar', sidebarId);
}
`​`​`

---

## Implementierungs-Strategie

### Phase 1: Audit (1 Stunde)

Erstellen Sie eine Liste aller Verstöße:

`​`​`bash
# Inline-Styles in HTML finden
grep -n 'style="' index.html

# Style-Manipulation in JS finden
grep -rn '\.style\.'
````

````plaintext
index.html
Der KontextmenÃ¼-Weg ist effizienter, da bereits relevante Beweise vorausgewÃ¤hlt sind.
                    </p>
                    <div class="agent-context-block"
                         data-ref="agent-context-export-start"
                         data-context-id="export-start-help"
                         style="display: none;">
                        <!-- Wird dynamisch vom Agent mit Inhalten gefÃ¼llt -->
                    </div>

                    <div class="tip-box" data-ref="step1-tip">
                        <strong>Best Practice:</strong> Taggen Sie wichtige Beweise vor dem Export-Start, um spÃ¤ter die Option "Only tagged items" nutzen zu kÃ¶nnen.
                    </div>
                </div>

                <div class="detail-level-3" data-ref="step1-detailed">
                    <h4 data-ref="step1-interface-heading">BenutzeroberflÃ¤che im Detail</h4>
                    <p data-ref="step1-menu-path">
                        <strong>HauptmenÃ¼-Pfad:</strong> Der vollstÃ¤ndige MenÃ¼pfad fÃ¼hrt von der HauptmenÃ¼leiste Ã¼ber "Datei" zum UntermenÃ¼ "Bericht/Export erstellen". Dieser Weg ist standardisiert und funktioniert unabhÃ¤ngig von der aktuellen Ansicht.
                    </p>
                    <div class="agent-context-block"
                         data-ref="agent-context-menu-path"
                         data-context-id="menu-path-details"
                         style="display: none;">
                        <!-- Wird dynamisch vom Agent mit Inhalten gefÃ¼llt -->
                    </div>

                    <figure class="media-figure" data-media-type="image">
                        <img src="media/annotated/axiom-menu-marked-thumb.png"
                             data-fullsize="media/annotated/axiom-menu-marked.png"
                             alt="AXIOM HauptmenÃ¼ mit nummerierten Schritten: 1. Datei-MenÃ¼, 2. Bericht/Export erstellen"
                             class="media-thumbnail"
                             loading="lazy">
                        <figcaption>Schrittweise Anleitung: Export starten (mit Markierungen)</figcaption>
                    </figure>

                    <p data-ref="step1-context-path">
                        <strong>KontextmenÃ¼-Pfad:</strong> Im Artifacts Explorer kÃ¶nnen Sie eine oder mehrere Beweisgruppen markieren (mit gedrÃ¼ckter Strg-Taste fÃ¼r Mehrfachauswahl), dann Rechtsklick und "Bericht/Export erstellen" wÃ¤hlen. Diese Methode ist besonders zeitsparend bei fokussierten Exporten.
````

````plaintext
script-detail-level.js
/${levelNumber}`);

            // Debug: Liste alle verfÃ¼gbaren Buttons
            const allButtons = document.querySelectorAll('.detail-level-btn, .detail-btn-mini');
            LOG.debug(MODULE, 'Available buttons:', Array.from(allButtons).map(btn => ({
                text: btn.textContent.trim(),
                                                                                       level: btn.dataset.level
            })));
        }
    }

    // ========================================================================
    // UI - CONTROLS
    // ========================================================================

    function initDetailLevelControls() {
        LOG(MODULE, 'Initializing detail level controls...');

        const buttons = document.querySelectorAll('.detail-level-btn, .detail-btn-mini');

        LOG.debug(MODULE, `Found ${buttons.length} detail level buttons`);

        if (buttons.length === 0) {
            LOG.warn(MODULE, 'No detail level buttons found in DOM!
````

````plaintext
validate_html_structure.py
in element_selector:
                tag, class_name = element_selector.split('.', 1)
                elements = self.validation_scope.find_all(tag, class_=class_name)
            else:
                elements = self.validation_scope.find_all(element_selector)
            
            for element in elements:
                if not element.get('data-ref') and not element.get('id'):
                    missing_data_ref.append((element, element_selector))
        
        if missing_data_ref:
            for element, selector in missing_data_ref[:10]:  # Limite auf erste 10
                self._add_result(
                    False,
                    f"Element '{selector}' sollte data-ref oder id haben (Standard-GranularitÃ¤t)",
                    element_info=self._get_element_info(element),
                    severity="warning"
                )
            
            if len(missing_data_ref) > 10:
                self._add_result(
                    False,
                    f"... und {len(missing_data_ref) - 10} weitere Elemente ohne data-ref",
                    severity="warning"
                )
        else:
            if self.verbose:
                print("  âœ“ Alle Standard-Elemente haben data-ref oder id")
            self._add_result(True, "Standard-GranularitÃ¤t erfÃ¼llt", severity="info")
    
    def _validate_orphan_elements(self) -> None:
        """Validiert ob alle Elemente referenzierte Ancestors haben"""
        if self.verbose:
            print("\nðŸ” Validiere Orphan-Elemente...")
        
        all_elements = self.validation_scope.find_all()
        orphans = []
        
        for element in all_elements:
            # Skip bestimmte Elemente die naturgemÃ¤ÃŸ keine Referenz brauchen
            if element.name in ['html', 'head', 'body', 'title', 'meta', 'link', 'script', 'style']:
                continue
            
            # Skip Text-Knoten und Kommentare
            if not isinstance(element, Tag):
                continue
            
            # Hat das Element selbst eine Referenz?
            if element.get('data-ref') or element.get('id'):
                continue
            
            # Hat es einen Ancestor mit Referenz?
````

````plaintext
script-detail-level.js
/${levelNumber}`);

            // Debug: Liste alle verfÃ¼gbaren Buttons
            const allButtons = document.querySelectorAll('.detail-level-btn, .detail-btn-mini');
            LOG.debug(MODULE, 'Available buttons:', Array.from(allButtons).map(btn => ({
                text: btn.textContent.trim(),
                                                                                       level: btn.dataset.level
            })));
        }
    }

    // ========================================================================
    // UI - CONTROLS
    // ========================================================================

    function initDetailLevelControls() {
        LOG(MODULE, 'Initializing detail level controls...');

        const buttons = document.querySelectorAll('.detail-level-btn, .detail-btn-mini');

        LOG.debug(MODULE, `Found ${buttons.length} detail level buttons`);

        if (buttons.length === 0) {
            LOG.warn(MODULE, 'No detail level buttons found in DOM!
````

````plaintext
validate_html_structure.py
10 Zeichen)
            elif len(img.get('alt', '').strip()) < 10:
                problems.append((img, f"img mit zu kurzem alt-Text: '{img.get('alt')}' (mind. 10 Zeichen empfohlen)"))
        
        # Video-Tags prÃ¼fen
        videos = self.validation_scope.find_all('video')
        for video in videos:
            has_subtitles = video.find('track', kind='subtitles')
            has_captions = video.find('track', kind='captions')
            
            if not has_subtitles and not has_captions:
                problems.append((video, "video ohne Untertitel-Track (erforderlich fÃ¼r Barrierefreiheit)"))
            
            # PrÃ¼fen ob Video eine source hat
            if not video.find('source'):
                problems.append((video, "video ohne source-Element"))
        
        # Media-Figure prÃ¼fen (sollten figcaption haben)
        media_figures = self.validation_scope.find_all('figure', class_='media-figure')
        for figure in media_figures:
            if not figure.find('figcaption'):
                problems.append((figure, "media-figure ohne figcaption (empfohlen fÃ¼r Kontext)"))
        
        # Media-Help-Trigger prÃ¼fen (Lupensymbol)
        help_triggers = self.validation_scope.find_all(class_='media-help-trigger')
        for trigger in help_triggers:
            if not trigger.get('data-media-src'):
                problems.append((trigger, "media-help-trigger ohne data-media-src"))
            
            if not trigger.get('data-media-alt'):
                problems.append((trigger, "media-help-trigger ohne data-media-alt (erforderlich)"))
            
            if not trigger.get('aria-label'):
                problems.append((trigger, "media-help-trigger ohne aria-label (Barrierefreiheit)"))
        
        # Ergebnisse verarbeiten
        if problems:
            for element, problem in problems:
                severity = "error" if "Pflichtfeld" in problem or "erforderlich" in problem else "warning"
                self._add_result(
                    False,
                    f"Medien-Barrierefrei
````

````plaintext
Template: Prompt-Dokumentation.md
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

`​`​`
[Hier den exakten Prompt einfügen, wie er an die KI gegeben wurde]

Beispiel:
Als nächsten Schritt möchte ich einen interaktiven Begleiter haben. 
Dieser soll situationsabhängig durch den Leitfaden begleiten...
`​`​`

### Follow-up Prompts (falls vorhanden)

**Prompt 1a:** (Verfeinerung/Nachfrage)
`​`​`
[Text des Follow-up-Prompts]
`​`​`

**Prompt 1b:** (Weitere Iteration)
`​`​`
[Text des Follow-up-Prompts]
`​`​`

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
*Was wurde vorgeschlagen aber nicht verwendet?
````

````plaintext
agent-dialogs.schema.json
*$"
          },
          "minItems": 1,
          "description": "Array von CSS-Selektoren fÃ¼r Ziel-Elemente"
        },
        "initialMessage": {
          "type": "string",
          "description": "Erste Nachricht des Agenten bei Dialog-Start"
        },
        "actions": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/Action"
          },
          "description": "VerfÃ¼gbare Aktionen fÃ¼r den Dialog"
        },
        "questions": {
          "type": "object",
          "patternProperties": {
            "^[a-zA-Z][a-zA-Z0-9_-]*$": {
              "$ref": "#/$defs/Question"
            }
          },
          "description": "Spezifische Fragen innerhalb des Dialogs"
        }
      }
    },
    
    "Action": {
      "type": "object",
      "required": ["id", "type", "label"],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "Eindeutige Action-ID"
        },
        "type": {
          "type": "string",
          "enum": ["navigate", "showInfo", "askQuestion", "showActions", "highlightElements", "showMedia"],
          "description": "Typ der Aktion"
        },
        "icon": {
          "type": "string",
          "description": "Emoji oder Icon fÃ¼r die Aktion"
        },
        "label": {
          "type": "string",
          "minLength": 1,
          "description": "Button-Text fÃ¼r die Aktion"
        },
        "targetSelectors": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[#.]?[a-zA-Z][a-zA-Z0-9_-]*.*$"
          },
          "description": "CSS-Selektoren fÃ¼r Navigation/Highlighting"
        },
        "content": {
          "type": "string",
          "description": "HTML-Content fÃ¼r showInfo-Actions"
        },
        "question": {
          "type": "string",
          "description": "Frage-Text fÃ¼r askQuestion-Actions"
        },
        "scrollBehavior": {
          "type": "string",
          "enum": ["auto", "smooth", "instant"],
          "default": "smooth",
          "description": "Scroll-Verhalten bei Navigation"
        },
        "highlightDuration": {
          "type": "integer",
          "minimum": 0,
          "maximum": 10000,
          "default": 2000,
          "description": "Highlight-Dauer in Millisekunden"
        },
        "contextBlock": {
          "$ref": "#/$defs/ContextBlock"
        },
        "nextActions": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/Action"
          },
          "description": "Follow-up-Aktionen nach dieser Aktion"
        },
````

Ich kann aus den Suchergebnissen erkennen, dass es sich um eine umfangreiche Sammlung von Verbesserungsvorschlägen handelt. Lassen Sie mich nach den spezifischen Dokumenten V01-V10 suchen, um zu verstehen, was bereits existiert:

**project_knowledge_search**

*Request*

````javascript
{
  "query": "V01 V02 V03 V04 V05 V06 V07 V08 V09 V10 Dateinamen md"
}
````

*Response*

````plaintext
Template: Prompt-Dokumentation.md
(1-5 Sterne)*

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

`​`​`
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
`​`​`

---

## 📝 Beispiel-Ausfüllung

Siehe: `prompt_001_grundstruktur.md` für ein vollständig ausgefülltes Beispiel.
````

````plaintext
media-handler.js
(mp4|webm|ogg)$/, '.vtt');
        
        // PrÃ¼fen ob VTT existiert
        fetch(vttPath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // Track-Element erstellen
                    const track = document.createElement('track');
                    track.kind = 'subtitles';
                    track.src = vttPath;
                    track.srclang = 'de';
                    track.label = 'Deutsch';
                    track.default = true;
                    
                    video.appendChild(track);
                    
                    console.info(`âœ“ Untertitel geladen: ${vttPath}`);
                } else {
                    console.warn(`âš ï¸ Untertitel nicht gefunden: ${vttPath}`);
                }
            })
            .catch(() => {
                console.warn(`âš ï¸ Untertitel nicht verfÃ¼gbar: ${vttPath}`);
            });
    });
}

// ===== FEHLERBEHANDLUNG FÃœR FEHLENDE MEDIEN =====
function initMediaErrorHandling() {
    const images = document.querySelectorAll('.media-thumbnail, .media-figure img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`âš ï¸ Mediendatei nicht gefunden: ${this.src}`);
            
            // Figcaption mit Hinweis anzeigen
            const figure = this.closest('.media-figure');
            if (figure) {
                figure.classList.add('media-missing');
                const caption = figure.querySelector('figcaption');
                if (caption) {
                    caption.innerHTML = `âš ï¸ Bild nicht verfÃ¼gbar:
````

````plaintext
V04 - CSS-HTML-JS-Trennung.md
# V04: Strikte CSS/HTML/JavaScript-Trennung

**Priorität:** 🔴 Sehr hoch  
**Aufwand:** 4-6 Stunden  
**Status:** Zur sofortigen Umsetzung empfohlen

---

## Problembeschreibung

**Aktueller Zustand:**

Im aktuellen Code finden sich an mehreren Stellen Verstöße gegen das Prinzip der Trennung von Concerns:

### 1. Inline-Styles in HTML
`​`​`html
<!-- PROBLEM: Inline-Styles -->
<button style="flex: 1; padding: 8px; font-size: 0.9em;">...</button>
<hr style="margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;">
`​`​`

### 2. CSS-Manipulation in JavaScript
`​`​`javascript
// PROBLEM: Direkte Style-Manipulation
element.style.display = 'none';
element.style.opacity = '0.4';
highlightElement.style.top = `${rect.top}px`;
`​`​`

**Probleme:**
- ❌ **Wartbarkeit:** CSS-Änderungen erfordern Änderungen in HTML/JS
- ❌ **Konsistenz:** Gleiche Styles mehrfach definiert
- ❌ **Theme-Support:** Inline-Styles ignorieren CSS-Variablen
- ❌ **Wiederverwendbarkeit:** Code-Duplikation
- ❌ **Testing:** Schwierig zu testen ohne DOM

---

## Lösungsansatz

**Prinzipien:**
1. **HTML:** Nur semantische Struktur und CSS-Klassen
2. **CSS:** Alle visuellen Aspekte, Layouts und Animationen
3. **JavaScript:** Nur Klassen hinzufügen/entfernen, keine Styles setzen

---

## 1. Inline-Styles zu CSS-Klassen migrieren

### VORHER (index.html):
`​`​`html
<button id="time-format-toggle"
        class="btn-secondary"
        style="flex: 1; padding: 8px; font-size: 0.9em;">
    🕐 Zeit: Relativ
</button>

<hr style="margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;">
`​`​`

### NACHHER (index.html):
`​`​`html
<button id="time-format-toggle"
        class="btn-secondary btn-flex">
    🕐 Zeit: Relativ
</button>

<hr class="menu-separator">
`​`​`

### NACHHER (styles.css):
`​`​`css
/* Wiederverwendbare Utility-Klasse */
.btn-flex {
    flex: 1;
}

/* Semantische Komponenten-Klasse */
.menu-separator {
    margin: 5px 0;
    border: none;
    border-top: 1px solid var(--color-border);
    transition: border-color var(--transition-medium);
}
`​`​`

---

## 2.
````

````plaintext
Template: Prompt-Dokumentation.md
*

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
2.
````

````plaintext
v09-animation-harmonization.md
# V09: Animations- und Transitions-Harmonisierung

**PrioritÃ¤t:** ðŸ”´ Sehr hoch (UX-kritisch!)  
**Aufwand:** 4-6 Stunden  
**Status:** Sofort umsetzen

---

## Problembeschreibung

**Aktueller Zustand:**
- Linke Sidebar (Navigation) und rechte Sidebar (Notizen) fÃ¼hlen sich unterschiedlich an
- Inkonsistente Transition-Timings zwischen verschiedenen UI-Elementen
- Unterschiedliche Easing-Functions fÃ¼hren zu uneinheitlichem BewegungsgefÃ¼hl
- Teilweise ruckelige Animationen ohne GPU-Beschleunigung

**Ziel:**
Einheitliches, flÃ¼ssiges und professionelles Animations-Erlebnis Ã¼ber alle UI-Komponenten hinweg.

---

## LÃ¶sungsansatz

### 1. Zentrale Animation-Variablen

**In `styles.css` unter `:root` erweitern:**

`​`​`css
:root {
    /* Bestehende Transitions */
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
    
    /* NEU: Erweiterte Animation-Variablen */
    --transition-slow: 0.5s ease;
    
    /* Easing Functions */
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.0, 0, 0.2, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    /* Sidebar-spezifische Timings */
    --sidebar-transition-duration: 0.35s;
    --sidebar-transition-easing: var(--ease-smooth);
    
    /* Tooltip/Modal Timings */
    --tooltip-transition: 0.2s var(--ease-out);
    --modal-transition: 0.3s var(--ease-smooth);
}
`​`​`

---

## 2.
````

````plaintext
V04 - CSS-HTML-JS-Trennung.md
script-*.js
`​`​`

### Phase 2: CSS-Klassen definieren (1-2 Stunden)

Neue Utility- und State-Klassen in `styles.css`:

`​`​`css
/* ===== UTILITY CLASSES ===== */
.hidden {
    display: none !important;
}

.visible {
    display: block;
}

.flex-1 {
    flex: 1;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.text-center {
    text-align: center;
}

/* ===== STATE CLASSES ===== */
.is-active {
    /* Wird von JS gesetzt für aktive Elemente */
}

.is-disabled {
    opacity: 0.5;
    pointer-events: none;
}

.is-loading {
    cursor: wait;
}

.is-error {
    border-color: var(--color-error);
    background-color: var(--color-surface);
}

/* ===== ANIMATION STATES ===== */
.fade-in {
    animation: fadeIn var(--transition-medium) forwards;
}

.fade-out {
    animation: fadeOut var(--transition-medium) forwards;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.slide-in-left {
    animation: slideInLeft var(--transition-medium) forwards;
}

@keyframes slideInLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}
`​`​`

### Phase 3: Migration (2-3 Stunden)

1. **HTML bereinigen:**
   - Alle `style="..."` Attribute entfernen
   - Durch CSS-Klassen ersetzen

2. **JavaScript refactoren:**
   - `element.style.xxx` durch `element.classList` ersetzen
   - Nur für dynamische Positions-Werte CSS Custom Properties nutzen

3.
````

````plaintext
validate_html_structure.py
     
        for section in sections:
            # Jede Section braucht id und data-section
            if not section.get('id'):
                problems.append((section, "content-section ohne id"))
            
            if not section.get('data-section'):
                problems.append((section, "content-section ohne data-section"))
            
            # data-title fÃ¼r Navigation empfohlen
            if not section.get('data-title'):
                problems.append((section, "content-section ohne data-title (empfohlen)"))
        
        if problems:
            for element, problem in problems:
                severity = "warning" if "empfohlen" in problem else "error"
                self._add_result(
                    False,
                    f"Section-Problem: {problem}",
                    element_info=self._get_element_info(element),
                    severity=severity
                )
        else:
            if self.verbose:
                print(f"  âœ“ Alle {len(sections)} Sections korrekt strukturiert")
            self._add_result(True, f"Alle {len(sections)} Sections korrekt", severity="info")
   
    def _validate_media_accessibility(self) -> None:
        """Validiert Barrierefreiheit von Medien-Elementen"""
        if self.verbose:
            print("\nðŸ” Validiere Medien-Barrierefreiheit...")
        
        problems = []
        
        # Alle img-Tags prÃ¼fen
        images = self.validation_scope.find_all('img')
        for img in images:
            # Alt-Attribut muss vorhanden sein
            if not img.get('alt'):
                problems.append((img, "img ohne alt-Attribut (Pflichtfeld)"))
            # Alt-Text sollte aussagekrÃ¤ftig sein (mind. 10 Zeichen)
            elif len(img.get('alt', '').strip()) < 10:
                problems.append((img, f"img mit zu kurzem alt-Text: '{img.get('alt')}' (mind.
````

````plaintext
V04 - CSS-HTML-JS-Trennung.md
JavaScript Style-Manipulation zu CSS-Klassen

### VORHER (JavaScript):
`​`​`javascript
function showElement(element) {
    element.style.display = 'block';
    element.style.opacity = '1';
}

function hideElement(element) {
    element.style.display = 'none';
    element.style.opacity = '0';
}

function positionTooltip(element, x, y) {
    element.style.top = `${y}px`;
    element.style.left = `${x}px`;
}
`​`​`

### NACHHER (JavaScript):
`​`​`javascript
function showElement(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}

function hideElement(element) {
    element.classList.add('hidden');
    element.classList.remove('visible');
}

function positionTooltip(element, x, y) {
    // CSS Custom Properties für dynamische Werte
    element.style.setProperty('--tooltip-x', `${x}px`);
    element.style.setProperty('--tooltip-y', `${y}px`);
}
`​`​`

### NACHHER (styles.css):
`​`​`css
.element {
    display: none;
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.element.visible {
    display: block;
    opacity: 1;
}

.tooltip {
    position: fixed;
    top: var(--tooltip-y, 0);
    left: var(--tooltip-x, 0);
}
`​`​`

---

## 3. State-basierte CSS-Klassen

### Konzept: Data-Attributes für States

**HTML:**
`​`​`html
<div class="sidebar-container" data-state="closed" data-active-sidebar="none">
    <!-- Content -->
</div>
`​`​`

**CSS:**
`​`​`css
/* CSS reagiert auf State */
.sidebar-container[data-state="closed"] {
    transform: translateX(-100%);
}

.sidebar-container[data-state="open"] {
    transform: translateX(0);
}

.sidebar-container[data-active-sidebar="navigation"] .sidebar-navigation {
    display: flex;
}

.sidebar-container[data-active-sidebar="history"] .sidebar-history {
    display: flex;
}
`​`​`

**JavaScript:**
`​`​`javascript
// JavaScript ändert nur Attribute
function openSidebar(sidebarId) {
    const container = document.querySelector('.sidebar-container');
    container.setAttribute('data-state', 'open');
    container.setAttribute('data-active-sidebar', sidebarId);
}
`​`​`

---

## Implementierungs-Strategie

### Phase 1: Audit (1 Stunde)

Erstellen Sie eine Liste aller Verstöße:

`​`​`bash
# Inline-Styles in HTML finden
grep -n 'style="' index.html

# Style-Manipulation in JS finden
grep -rn '\.style\.'
````

Perfekt! Ich kann jetzt sehen, dass bereits mehrere V-Dokumente existieren (V04, V09). Lassen Sie mich nach dem vollständigen Überblick der Dokumente suchen:

**recent_chats**

*Request*

````javascript
{
  "n": 1,
  "sort_order": "desc"
}
````

*Response*

````plaintext
<chat url='https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0' updated_at='2025-10-08T09:31:22.636704+00:00'>
Content:
Title: Verbesserungsvorschläge (Sammlung)

Human: Ich benötige Hilfe bei der Datei styles.css, die in aktueller Version im Projekt-Dateispeicher liegt.

Dort ist die Farbe der sekundären Schaltflächen noch nicht okay.

Kannst du hier bitte einen Vorschlag machen? Das wird verwendet von den Schaltfläche "Zeit: Relativ/Absolut", "Verlauf löschen" und "Notizen löschen". Die Farbe ist unpassend und recht starr. Ebenso ist die Schrift darauf extrem schwer zu lesen.

Der Vorschlag muss für alle 4 themes passen. Danke!

Assistant:  Ich suche zunächst die aktuelle Version der styles.css im Projekt-Dateispeicher, um die bestehende Gestaltung der sekundären Schaltflächen zu analysieren.
<tool name="project_knowledge_search">
<parameter name="query">styles.css sekundäre Schaltflächen secondary button</parameter>
</tool>
Ich habe die aktuelle styles.css analysiert. Nun schaue ich mir die vollständige Definition der sekundären Schaltflächen an, um einen passenderen Vorschlag zu erarbeiten.
<tool name="project_knowledge_search">
<parameter name="query">btn-secondary color background theme hochkontrast</parameter>
</tool>
Perfekt! Ich habe nun ein vollständiges Bild der aktuellen Situation. Die sekundären Schaltflächen (`.btn-secondary`) verwenden derzeit:

**Aktueller Zustand:**
- Hintergrundfarbe: `var(--color-error)` (also Rot-Töne wie #780F2D im Tag-Modus)
- Textfarbe: `var(--color-surface-elevated)` (Weiß)
- Hover: Hartcodiertes `#c82333` (funktioniert nicht in allen Themes)

**Probleme:**
1. **Semantisch unpassend**: Error-Farbe für neutrale Aktionen (Zeitformat-Umschaltung)
2. **Starr codiert**: Hover-Farbe ist hartcodiert und passt sich nicht an Themes an
3. **Schlechte Lesbarkeit**: Kontrast zwischen Rot und Weiß ist zwar ausreichend, aber nicht optimal

Ich erarbeite nun einen Verbesserungsvorschlag:

---

## **Vorschlag für sekundäre Schaltflächen**

Ich schlage vor, die `.btn-secondary` Klasse vollständig zu überarbeiten und sie **semantisch neutral** sowie **theme-adaptiv** zu gestalten. Die Schaltflächen sollen sich klar von primären Aktionen unterscheiden, ohne eine fehlerhafte oder alarmierende Konnotation zu vermitteln.

### **Änderungsvorschlag für `.btn-secondary` in styles.css:**

`​`​`css
.btn-secondary {
    padding: 10px 15px;
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    border: 2px solid var(--color-border-strong);
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 500;
    tr...    'approved': '<span class="metadata-status-badge approved">✓ Approved</span>',
            'review': '<span class="metadata-status-badge review">👁 In Review</span>',
            'outdated': '<span class="metadata-status-badge outdated">⚠ Veraltet</span>',
            'draft': '<span class="metadata-status-badge draft">📝 Entwurf</span>'
        };
        return badges[status] || badges['draft'];
    }
    
    // ===== INITIALIZATION =====
    
    function initMetadata() {
        LOG(MODULE, 'Initializing metadata system...');
        
        // Check if user is maintainer (könnte via Login-System kommen)
        const isMaintainer = checkIfUserIsMaintainer();
        if (isMaintainer) {
            document.body.classList.add('user-is-maintainer');
            
            // Create toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'maintainer-mode-toggle';
            toggleBtn.textContent = '🔧 Maintainer Mode';
            toggleBtn.addEventListener('click', toggleMaintainerMode);
            document.body.appendChild(toggleBtn);
        }
        
        // Create metadata panel
        createMetadataPanel();
        
        // Load preference
        loadMaintainerPreference();
        
        LOG.success(MODULE, 'Metadata system initialized');
    }
    
    function checkIfUserIsMaintainer() {
        // TODO: Echte Authentifizierung implementieren
        // Für Demo: localStorage-Flag
        const isMaintainer = localStorage.getItem('axiom-is-maintainer') === 'true';
        
        // Oder URL-Parameter für Testing
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('maintainer') === 'true') {
            localStorage.setItem('axiom-is-maintainer', 'true');
            return true;
        }
        
        return isMaintainer;
    }
    
    // ===== PUBLIC API =====
    
    window.MetadataManager = {
        getMetadata: getMetadataForSection,
        showPanel: showMetadataPanel,
        toggleMaintainerMode: toggleMaintainerMode,
        checkOutdated: checkOutdatedContent
    };
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMetadata);
    } else {
        initMetadata();
    }
    
    LOG(MODULE, 'Metadata module loaded');
    
})</parameter>
<parameter name="version_uuid">32065d96-0fae-4795-829e-993d53948a72</parameter>
</tool></chat>
````

Ausgezeichnet! Ich habe jetzt den letzten Chat gefunden. Lassen Sie mich den aktuellen Stand aller V-Dokumente im Projekt-Dateispeicher überprüfen:

**project_knowledge_search**

*Request*

````javascript
{
  "query": "V01 V02 V03 V05 V06 V07 V08 V10 vollständige Liste Verbesserungsvorschläge"
}
````

*Response*

````plaintext
V04 - CSS-HTML-JS-Trennung.md
JavaScript Style-Manipulation zu CSS-Klassen

### VORHER (JavaScript):
`​`​`javascript
function showElement(element) {
    element.style.display = 'block';
    element.style.opacity = '1';
}

function hideElement(element) {
    element.style.display = 'none';
    element.style.opacity = '0';
}

function positionTooltip(element, x, y) {
    element.style.top = `${y}px`;
    element.style.left = `${x}px`;
}
`​`​`

### NACHHER (JavaScript):
`​`​`javascript
function showElement(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}

function hideElement(element) {
    element.classList.add('hidden');
    element.classList.remove('visible');
}

function positionTooltip(element, x, y) {
    // CSS Custom Properties für dynamische Werte
    element.style.setProperty('--tooltip-x', `${x}px`);
    element.style.setProperty('--tooltip-y', `${y}px`);
}
`​`​`

### NACHHER (styles.css):
`​`​`css
.element {
    display: none;
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.element.visible {
    display: block;
    opacity: 1;
}

.tooltip {
    position: fixed;
    top: var(--tooltip-y, 0);
    left: var(--tooltip-x, 0);
}
`​`​`

---

## 3. State-basierte CSS-Klassen

### Konzept: Data-Attributes für States

**HTML:**
`​`​`html
<div class="sidebar-container" data-state="closed" data-active-sidebar="none">
    <!-- Content -->
</div>
`​`​`

**CSS:**
`​`​`css
/* CSS reagiert auf State */
.sidebar-container[data-state="closed"] {
    transform: translateX(-100%);
}

.sidebar-container[data-state="open"] {
    transform: translateX(0);
}

.sidebar-container[data-active-sidebar="navigation"] .sidebar-navigation {
    display: flex;
}

.sidebar-container[data-active-sidebar="history"] .sidebar-history {
    display: flex;
}
`​`​`

**JavaScript:**
`​`​`javascript
// JavaScript ändert nur Attribute
function openSidebar(sidebarId) {
    const container = document.querySelector('.sidebar-container');
    container.setAttribute('data-state', 'open');
    container.setAttribute('data-active-sidebar', sidebarId);
}
`​`​`

---

## Implementierungs-Strategie

### Phase 1: Audit (1 Stunde)

Erstellen Sie eine Liste aller Verstöße:

`​`​`bash
# Inline-Styles in HTML finden
grep -n 'style="' index.html

# Style-Manipulation in JS finden
grep -rn '\.style\.'
````

````plaintext
Template: Prompt-Dokumentation.md
*

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
2.
````

````plaintext
script-detail-level.js
/${levelNumber}`);

            // Debug: Liste alle verfÃ¼gbaren Buttons
            const allButtons = document.querySelectorAll('.detail-level-btn, .detail-btn-mini');
            LOG.debug(MODULE, 'Available buttons:', Array.from(allButtons).map(btn => ({
                text: btn.textContent.trim(),
                                                                                       level: btn.dataset.level
            })));
        }
    }

    // ========================================================================
    // UI - CONTROLS
    // ========================================================================

    function initDetailLevelControls() {
        LOG(MODULE, 'Initializing detail level controls...');

        const buttons = document.querySelectorAll('.detail-level-btn, .detail-btn-mini');

        LOG.debug(MODULE, `Found ${buttons.length} detail level buttons`);

        if (buttons.length === 0) {
            LOG.warn(MODULE, 'No detail level buttons found in DOM!
````

````plaintext
validate_html_structure.py
     
        for section in sections:
            # Jede Section braucht id und data-section
            if not section.get('id'):
                problems.append((section, "content-section ohne id"))
            
            if not section.get('data-section'):
                problems.append((section, "content-section ohne data-section"))
            
            # data-title fÃ¼r Navigation empfohlen
            if not section.get('data-title'):
                problems.append((section, "content-section ohne data-title (empfohlen)"))
        
        if problems:
            for element, problem in problems:
                severity = "warning" if "empfohlen" in problem else "error"
                self._add_result(
                    False,
                    f"Section-Problem: {problem}",
                    element_info=self._get_element_info(element),
                    severity=severity
                )
        else:
            if self.verbose:
                print(f"  âœ“ Alle {len(sections)} Sections korrekt strukturiert")
            self._add_result(True, f"Alle {len(sections)} Sections korrekt", severity="info")
   
    def _validate_media_accessibility(self) -> None:
        """Validiert Barrierefreiheit von Medien-Elementen"""
        if self.verbose:
            print("\nðŸ” Validiere Medien-Barrierefreiheit...")
        
        problems = []
        
        # Alle img-Tags prÃ¼fen
        images = self.validation_scope.find_all('img')
        for img in images:
            # Alt-Attribut muss vorhanden sein
            if not img.get('alt'):
                problems.append((img, "img ohne alt-Attribut (Pflichtfeld)"))
            # Alt-Text sollte aussagekrÃ¤ftig sein (mind. 10 Zeichen)
            elif len(img.get('alt', '').strip()) < 10:
                problems.append((img, f"img mit zu kurzem alt-Text: '{img.get('alt')}' (mind.
````

````plaintext
script-detail-level.js
/${levelNumber}`);

            // Debug: Liste alle verfÃ¼gbaren Buttons
            const allButtons = document.querySelectorAll('.detail-level-btn, .detail-btn-mini');
            LOG.debug(MODULE, 'Available buttons:', Array.from(allButtons).map(btn => ({
                text: btn.textContent.trim(),
                                                                                       level: btn.dataset.level
            })));
        }
    }

    // ========================================================================
    // UI - CONTROLS
    // ========================================================================

    function initDetailLevelControls() {
        LOG(MODULE, 'Initializing detail level controls...');

        const buttons = document.querySelectorAll('.detail-level-btn, .detail-btn-mini');

        LOG.debug(MODULE, `Found ${buttons.length} detail level buttons`);

        if (buttons.length === 0) {
            LOG.warn(MODULE, 'No detail level buttons found in DOM!
````

````plaintext
index.html
</p>
                        <p data-ref="pdf-advantages">
                            <strong>PDF-Vorteile:</strong> UnverÃ¤nderbar, gerichtsfest, druckoptimiert, plattformunabhÃ¤ngig, automatisches Inhaltsverzeichnis.
                        </p>
                        <p data-ref="xlsx-advantages">
                            <strong>XLSX-Vorteile:</strong> Timeline-Analysen, filterbare Tabellen, statistische Auswertungen, Weiterverarbeitung in Excel.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Best Practices -->
            <section class="content-section" 
                     id="section-bestpractices"
                     data-section="bestpractices"
                     data-title="Best Practices">
                     
                <h2 data-ref="heading">Wichtige Hinweise und Best Practices</h2>

                <div class="detail-level-1" data-ref="basic-warnings">
                    <div class="warning-box" data-ref="common-mistakes">
                        <h3 data-ref="mistakes-heading">HÃ¤ufige Fehler vermeiden</h3>
                        <ul data-ref="mistakes-list">
                            <li data-ref="mistake-large-reports"><strong>Zu groÃŸe Reports:</strong> "Select All" vermeiden, nur fallrelevante Kategorien wÃ¤hlen</li>
                            <li data-ref="mistake-missing-images"><strong>Fehlende Bilder:</strong> "Include preview images" muss aktiviert sein</li>
                            <li data-ref="mistake-old-templates"><strong>Veraltete Templates:</strong> RegelmÃ¤ÃŸig Templates aktualisieren</li>
                        </ul>
                    </div>
                </div>

                <div class="detail-level-2" data-ref="workflow-tips">
                    <div class="tip-box" data-ref="recommended-workflow">
                        <h3 data-ref="workflow-heading">Empfohlener Workflow</h3>
                        <ol data-ref="workflow-steps">
                            <li data-ref="workflow-step1"><strong>Vorbereitung:</strong> Wichtige Beweise taggen vor Export-Start</li>
                            <li data-ref="workflow-step2"><strong>Template nutzen:</strong> Zeitersparnis durch gespeicherte Vorlagen</li>
                            <li data-ref="workflow-step3"><strong>QualitÃ¤tskontrolle:</strong> HTML-Report in verschiedenen Browsern testen</li>
                            <li data-ref="workflow-step4"><strong>Archivierung:</strong> Templates und Processing-Logs dokumentieren</li>
                        </ol>
                    </div>
                </div>
            </section>

            <!-- Zusammenfassung -->
            <section class="content-section" 
                     id="section-summary"
                     data-section="summary"
                     data-title="Zusammenfassung">
                     
                <h2 data-ref="heading">Zusammenfassung</h2>

                <div class="detail-level-1" data-ref="summary-basic">
                    <p data-ref="main-conclusion">
                        HTML-Reports in AXIOM Examiner bieten <strong>polizeilichen Ermittlern eine leistungsfÃ¤hige, benutzerfreundliche LÃ¶sung</strong> fÃ¼r interaktive Evidenz-PrÃ¤sentation.
````

````plaintext
Template: Prompt-Dokumentation.md
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

`​`​`
[Hier den exakten Prompt einfügen, wie er an die KI gegeben wurde]

Beispiel:
Als nächsten Schritt möchte ich einen interaktiven Begleiter haben. 
Dieser soll situationsabhängig durch den Leitfaden begleiten...
`​`​`

### Follow-up Prompts (falls vorhanden)

**Prompt 1a:** (Verfeinerung/Nachfrage)
`​`​`
[Text des Follow-up-Prompts]
`​`​`

**Prompt 1b:** (Weitere Iteration)
`​`​`
[Text des Follow-up-Prompts]
`​`​`

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
*Was wurde vorgeschlagen aber nicht verwendet?
````

````plaintext
v09-animation-harmonization.md
# V09: Animations- und Transitions-Harmonisierung

**PrioritÃ¤t:** ðŸ”´ Sehr hoch (UX-kritisch!)  
**Aufwand:** 4-6 Stunden  
**Status:** Sofort umsetzen

---

## Problembeschreibung

**Aktueller Zustand:**
- Linke Sidebar (Navigation) und rechte Sidebar (Notizen) fÃ¼hlen sich unterschiedlich an
- Inkonsistente Transition-Timings zwischen verschiedenen UI-Elementen
- Unterschiedliche Easing-Functions fÃ¼hren zu uneinheitlichem BewegungsgefÃ¼hl
- Teilweise ruckelige Animationen ohne GPU-Beschleunigung

**Ziel:**
Einheitliches, flÃ¼ssiges und professionelles Animations-Erlebnis Ã¼ber alle UI-Komponenten hinweg.

---

## LÃ¶sungsansatz

### 1. Zentrale Animation-Variablen

**In `styles.css` unter `:root` erweitern:**

`​`​`css
:root {
    /* Bestehende Transitions */
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
    
    /* NEU: Erweiterte Animation-Variablen */
    --transition-slow: 0.5s ease;
    
    /* Easing Functions */
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.0, 0, 0.2, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    /* Sidebar-spezifische Timings */
    --sidebar-transition-duration: 0.35s;
    --sidebar-transition-easing: var(--ease-smooth);
    
    /* Tooltip/Modal Timings */
    --tooltip-transition: 0.2s var(--ease-out);
    --modal-transition: 0.3s var(--ease-smooth);
}
`​`​`

---

## 2.
````

Perfekt! Jetzt verstehe ich die Situation besser. Aus dem letzten Chat und den Suchergebnissen kann ich erkennen, dass bereits die Dokumente V04 und V09 existieren. Lassen Sie mich die vollständige Liste im Chat finden:

**conversation_search**

*Request*

````javascript
{
  "query": "V01 V02 V03 V05 V06 V08 V10 Dokumentenliste komplett alle Verbesserungsvorschläge"
}
````

*Response*

````plaintext
<chat url='https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0' updated_at=2025-10-08T02:16:55.115577+00:00>Verbesserungsvorschläge (Sammlung)
🎉 Ich habe nun auch **V10 - Notizblock Tab-System** vollständig erstellt.

## 📦 Finale Übersicht - Alle Verbesserungsvorschläge

Sie haben jetzt **10 vollständige Dokumente**:

### ✅ Alle Dokumente erstellt:

1. **Overview-Improvements.md** - Gesamtübersicht & Roadmap
2. **V01-State-Management.md** - Zentrale Zustandsverwaltung
3. **V03-Tooltips-Onboarding.md** - Kontextbezogene Hilfe
4. **V04-CSS-HTML-JS-Trennung.md** - Separation of Concerns
5. **V05-Favorites-Sidebar.md** - Lesezeichen mit Levenshtein
6. **V06-Glossar-Feature.md** - Automatische Fachbegriff-Erklärungen
7. **V07-Show-Only-Modus.md** - "Don't tell; just show"
8. **V08-Agent-FAQ-Feedback.md** - FAQ & Feedback-System
9. **V09-Animations-Harmonisierung.md** - Einheitliche Animationen
10. **V10-Notes-Tabs-System.md** - Tab-basierter Notizblock ⭐ NEU

---

## 🆕 V10 Highlights

**Was macht V10 besonders:**
- 📑 Multiple Tabs für thematische Notizen
- 🎨 Icon-basierte Tab-Header (Platzersparung)
- ➕ Einfaches Erstellen neuer Tabs
- ☰ Hamburger-Menü mit erweiterten Funktionen
- 📥📤 Import/Export pro Tab
- 💾 Volle localStorage-Persistierung
- 🎨 Icon-Picker mit Emoji-Auswahl
- ⌨️ Keyboard-Shortcuts (optional)

**Aufwand:** 6-8 Stunden  
**Priorität:** 🟡 Mittel (Nice-to-have)

---

## 📊 Aktualisierte Gesamt-Aufwandsschätzung

| ID | Feature | Priorität | Aufwand | Status |
|----|---------|-----------|---------|--------|
| V01 | State Management | 🔴 Sehr hoch | 6-10h | Dokumentiert |
| V04 | CSS/HTML/JS Trennung | 🔴 Sehr hoch | 4-6h | Dokumentiert |
| V09 | Animations | 🔴 Sehr hoch | 4-6h | Dokumentiert |
| V03 | Tooltips & Onboarding | 🟠 Hoch | 6-9h | Dokumentiert |
| V05 | Favorites-Sidebar | 🟠 Hoch | 6-8h | Dokumentiert |
| V07 | Show-Only Modus | 🟠 Hoch | 3-4h | Dokumentiert |
| V06 | Glossar-Feature | 🟡 Mittel | 10-14h | Dokumentiert |
| V08 | Agent FAQ & Feedback | 🟡 Mittel | 6-8h | Dokumentiert |
| V10 | Notes Tab-System | 🟡 Mittel | 6-8h | Dokumentiert ⭐ |

**Gesamt (ohne V06):** ~51-69 Stunden  
**Gesamt (mit V06):** ~61-83 Stunden

---

## 🎯 Empfohlene Umsetzungsreihenfolge (aktualisiert)

### Sprint 1 (Woche 1): Foundation
1. V04 - CSS/HTML/JS-Trennung
2. V09 - Animations-Harmonisierung
3. V01 - State Management

### Sprint 2 (Woche 2): Core Features
4. V07 - Show-Only Modus
5. V05 - Favorites-Sidebar

### Sprint 3 (Woche 3): Enhancement
6. V03 - Tooltips & Onboarding
7. V08 - Agent FAQ & Feedback

### Sprint 4 (Optional): Advanced
8. V10 - Notes Tab-System ⭐
9. V06 - Glossar-Feature

---

Haben Sie noch weitere Ideen oder Anpassungswünsche für die Dokumentation? Ansonsten sind jetzt alle Features vollständig dokumentiert und bereit zur Implementierung! 🚀

Human: Ich finde das Artifact zu V04 nicht. Die Datei müsste V04-CSS-HTML-JS-Trennung.md heißen. Hast du die bereits erstellt? Falls ja, dann zeige sie mir bitte. Falls nein, dann erstelle sie jetzt bitte.

Assistant:  Sie haben recht! Ich habe V04 bereits erstellt, aber unter einem leicht anderen Namen.</chat>

<chat url='https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0' updated_at=2025-10-08T02:16:55.115577+00:00>Verbesserungsvorschläge (Sammlung)
Oktober 2025*</parameter>
<parameter name="version_uuid">a1fcdf0a-0421-42ed-a6ed-7a46ea8fcb24</parameter>
</tool>
Perfekt! 🎉 Ich habe nun **alle 9 Verbesserungsvorschläge** als separate, vollständige Dokumente erstellt:

## 📦 Vollständige Dokumentation

### ✅ Erstellt und verfügbar:

1. **Overview-Improvements.md** - Übersicht über alle Vorschläge mit Roadmap
2. **V01-State-Management.md** - Zentrale

Human: Weiter

Assistant:  Zustandsverwaltung
3. **V03-Tooltips-Onboarding.md** - Kontextbezogene Hilfe & Erstnutzer-Guide
4. **V04-CSS-HTML-JS-Trennung.md** - Separation of Concerns
5. **V05-Favorites-Sidebar.md** - Lesezeichen mit Levenshtein-Suche
6. **V06-Glossar-Feature.md** - Automatische Fachbegriff-Erklärungen
7. **V07-Show-Only-Modus.md** - "Don't tell; just show"
8. **V08-Agent-FAQ-Feedback.md** - FAQ-System & Feedback-Kanal
9. **V09-Animations-Harmonisierung.md** - Einheitliche Animationen

---

## 📊 Zusammenfassung

**Gesamt-Dokumentation:** 9 Dokumente  
**Gesamt-Aufwand:** 45-75 Stunden  
**Alle Dokumente enthalten:**
- ✅ Vollständige Code-Beispiele (HTML, CSS, JavaScript)
- ✅ JSON-Schema-Definitionen
- ✅ Implementierungsschritte mit Zeitschätzungen
- ✅ Testing-Checklisten
- ✅ Barrierefreiheits-Überlegungen
- ✅ Vorteile und Begründungen

---

## 🎯 Empfohlene Reihenfolge

### Sprint 1 (Woche 1): Foundation
1. **V04** - CSS/HTML/JS-Trennung (4-6h)
2. **V09** - Animations-Harmonisierung (4-6h)
3. **V01** - State Management Teil 1 (6-10h)

### Sprint 2 (Woche 2): Core Features
4. **V07** - Show-Only Modus (3-4h)
5. **V05** - Favorites-Sidebar (6-8h)

### Sprint 3 (Woche 3): Enhancement
6. **V03** - Tooltips & Onboarding (6-9h)
7. **V08** - Agent FAQ & Feedback (6-8h)

### Optional (Woche 4+):
8. **V06** - Glossar-Feature (10-14h)

---

## 💾 Nächste Schritte

Sie können jetzt:
1. **Alle Dokumente aus den Artifacts kopieren** und in Ihrem Projekt speichern
2. **Sprint-Planung** basierend auf der Roadmap durchführen
3. **Mit V04 (CSS/HTML/JS-Trennung) starten** - das ist die wichtigste Grundlage
4. **Build-Nummer erhöhen** auf 054 für den ersten Implementierungs-Sprint

Alle Dokumente sind vollständig und einsatzbereit! Gibt es noch etwas, das Sie anpassen oder erweitern möchten? 🚀

Human: Ich habe noch eine weitere Idee. Bislang ist der Notizblock noch sehr eindimensional. Das ist eine Idee mit relativ niedriger Priorität. Ich möchte den Notizblock erweitern, so dass es Tabs im Notizblock gibt, in denen der Benutzer thematisch Notizen ablegen kann. Die Tabs sollen, wenn sie geschlossen sind durch ein eigenes Symbol dargestellt werden an Stelle eines Textes, um mit der begrenzten Breite der Notizseitenleiste zurechtzukommen. Der aktive Tab-Header hat ebenfalls noch eine Schließen Schaltfläche am rechten Rand. Oben am rechten Rand ist noch eine kleines Menü mit Symbolen. Ein "+" zum Erstellen eines neuen Tabs und ein Hamburgermenü für weitere Funktionalitäten.</chat>

<chat url='https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0' updated_at=2025-10-08T02:16:55.115577+00:00>Verbesserungsvorschläge (Sammlung)
Feature Detection und Fallbacks sind nicht prioritär.

---

## 📊 Sprint-Planung (Empfehlung)

### Woche 1: Foundation & Critical Fixes
**Fokus:** Technische Basis verbessern

| Tag | Feature | Aufwand |
|-----|---------|---------|
| 1-2 | V04 - CSS/HTML/JS-Trennung | 6h |
| 3-4 | V09 - Animations-Harmonisierung | 5h |
| 5 | V01 - State Management (Teil 1) | 8h |

**Wochenziel:** ~19 Stunden

---

### Woche 2: High-Priority Features
**Fokus:** Kern-Features ausrollen

| Tag | Feature | Aufwand |
|-----|---------|---------|
| 1-2 | V01 - State Management (Teil 2) | 10h |
| 3 | V07 - Show-Only Modus | 4h |
| 4-5 | V05 - Favorites (Teil 1) | 8h |

**Wochenziel:** ~22 Stunden

---

### Woche 3: Polish & Nice-to-Haves
**Fokus:** User Experience verbessern

| Tag | Feature | Aufwand |
|-----|---------|---------|
| 1-2 | V05 - Favorites (Teil 2: Levenshtein) | 6h |
| 3 | V03 - Tooltips-System | 6h |
| 4-5 | V08 - Agent FAQ | 8h |

**Wochenziel:** ~20 Stunden

---

### Woche 4+ (Optional): Advanced Features

| Feature | Aufwand |
|---------|---------|
| V03 - Onboarding-Guide | 8h |
| V06 - Glossar-Feature | 14h |

---

## 🔗 Abhängigkeiten

`​`​`
V04 (CSS/HTML/JS Trennung)
    ↓
V09 (Animations)
    ↓
V01 (State Management)
    ↓
    ├── V03 (Tooltips + Onboarding)
    ├── V05 (Favorites)
    ├── V07 (Show-Only Modus)
    └── V08 (Agent FAQ)
            ↓
        V06 (Glossar)
`​`​`

**Erklärung:**
- **V04** muss zuerst, da es Code-Qualität grundlegend verbessert
- **V09** parallel/nach V04, für konsistentes UX
- **V01** ist Foundation für alle State-abhängigen Features
- **V03, V05, V07, V08** können parallel entwickelt werden
- **V06** baut auf anderen Features auf (Tooltips, State)

---

## 📈 Aufwands-Übersicht

| ID | Feature | Priorität | Aufwand | Status |
|----|---------|-----------|---------|--------|
| V01 | State Management | 🔴 Sehr hoch | 6-10h | Geplant |
| V04 | CSS/HTML/JS Trennung | 🔴 Sehr hoch | 4-6h | Geplant |
| V09 | Animations | 🔴 Sehr hoch | 4-6h | Geplant |
| V03 | Tooltips & Onboarding | 🟠 Hoch | 6-9h | Geplant |
| V05 | Favorites-Sidebar | 🟠 Hoch | 6-8h | Geplant |
| V07 | Show-Only Modus | 🟠 Hoch | 3-4h | Geplant |
| V06 | Glossar-Feature | 🟡 Mittel | 10-14h | Nice-to-have |
| V08 | Agent FAQ & Feedback | 🟡 Mittel | 6-8h | Geplant |
| **V02** | **Progressive Enhancement** | **⏸️ Niedrig** | **6-8h** | **Zurückgestellt** |

**Gesamt (ohne V02, V06):** ~45-61 Stunden  
**Gesamt (mit V06):** ~55-75 Stunden

---

## ✅ Checkliste vor Start

### Vorbereitung
- [ ] Backup aller aktuellen Dateien erstellen
- [ ] Git-Repository initialisieren (falls nicht vorhanden)
- [ ] Build-Nummer auf 054 erhöhen
- [ ] Team über geplante Änderungen informieren
- [ ] Testing-Umgebung aufsetz</chat>

<chat url='https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0' updated_at=2025-10-08T02:16:55.115577+00:00>Verbesserungsvorschläge (Sammlung)
✅ **V3:** Tooltips & Onboarding-System
5. ✅ **V5:** Favorites/Lesezeichen-Sidebar mit Levenshtein-Suche
6. ✅ **V7:** "Don't tell; just show"-Modus

### 🟡 **Mittlere Priorität** (Geplant)
7. ✅ **V6:** Glossar-Feature mit Hover-Tooltips
8. ✅ **V8:** Agent FAQ-System & Feedback-Funktion

## **Was das Dokument jetzt enthält:**

Für **jedes Feature** gibt es:
- ✅ Detaillierte Problembeschreibung
- ✅ Vollständige technische Lösungsansätze
- ✅ Kompletten HTML-Code
- ✅ Vollständiges CSS
- ✅ Vollständiges JavaScript (inkl. Levenshtein-Algorithmus!)
- ✅ JSON-Schema-Beispiele (Glossar, FAQ)
- ✅ Implementierungsschritte mit Zeitschätzungen
- ✅ Barrierefreiheits-Überlegungen
- ✅ Testing-Checklisten

**Plus:**
- ✅ 3-Wochen-Roadmap mit Abhängigkeits-Graph
- ✅ Git-Conventions und Best Practices
- ✅ Performance-Optimierungen
- ✅ Reduced Motion Support
- ✅ Gesamt-Aufwandsschätzung: **45-75 Stunden**

## **Besondere Highlights:**

1. **V5 (Favorites):** Vollständiger Levenshtein-Algorithmus für Fuzzy-Search implementiert
2. **V7 (Show-Only):** Elegante Lösung mit `data-content-type` Attributen
3. **V9 (Animations):** GPU-beschleunigte Transitions mit einheitlichen Easing-Functions
4. **V4 (Trennung):** Klare Konventionen, wann `style.setProperty()` erlaubt ist

Das Dokument ist nun **vollständig einsatzbereit** für Ihre Implementierung. Sie können es:
- Als Referenz während der Entwicklung verwenden
- Mit Ihrem Team teilen
- Für Sprint-Planung nutzen
- Als Basis für Code-Reviews verwenden

Möchten Sie noch Details zu einem bestimmten Feature vertiefen, oder haben Sie Fragen zur Priorisierung oder Umsetzung?

Human: Hmm, Das Artifakt hat es wohl ein wenig zerrissen. Schade! Ich denke, da wurde zu irgendeinem Zeitpunkt nicht mehr an der passenden Stelle editiert. Bekommst du das nochmal ohne Inhaltsverlust hin das geradezurücken? Sonst würde ich dafür plädieren, jeden Vorschlag in eigene MarkDown Dokument zu überführen. Mir ist es egal. Ich nehme auch gern einzelne Dokumente.

Assistant:  Sie haben völlig recht - das Artifact ist durch die vielen Updates durcheinander geraten. Lassen Sie mich das sauber in **separate Markdown-Dokumente** aufteilen. Das ist übersichtlicher und wartbarer.</chat>

<chat url='https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0' updated_at=2025-10-08T02:16:55.115577+00:00>Verbesserungsvorschläge (Sammlung)
State Manager)
- **Minor:** Neue Features (z.B. Favorites, Glossar)
- **Patch:** Bugfixes, kleine Verbesserungen

Aktuell: **Build 053** → Nach V01/V04/V09: **Build 1.0.0**

---

## 📞 Support & Fragen

Bei Unklarheiten oder Problemen:
1. Detaildokument konsultieren
2. Debug-Logs aktivieren (`BUILD_INFO.debugMode = true`)
3. Browser-Console prüfen
4. Rollback-Plan nutzen bei kritischen Problemen

---

**Ende der Übersicht**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*

**Nächste Schritte:**
1. Priorisierung final abstimmen
2. Sprint 1 starten (V04 → V09 → V01)
3. Nach jedem Feature: Testing und Feedback
4. Iterativ fortfahren</parameter>
<parameter name="version_uuid">3d012113-b6d2-49d7-9bdb-f8ebcc2e8c9d</parameter>
</tool>
Perfekt! Ich habe nun **alle wichtigen Dokumente** sauber getrennt erstellt:

## 📦 Was Sie jetzt haben:

### ✅ Erstellt:
1. **Overview-Improvements.md** - Übersicht über alle 9 Vorschläge
2. **V01-State-Management.md** - Vollständige Implementierung
3. **V04-CSS-HTML-JS-Trennung.md** - Separation of Concerns
4. **V05-Favorites-Sidebar.md** - Mit Levenshtein-Algorithmus
5. **V07-Show-Only-Modus.md** - Don't tell; just show
6. **V09-Animations-Harmonisierung.md** - Einheitliche Animationen

### 📋 Noch zu erstellen (falls gewünscht):
- V03-Tooltips-Onboarding.md
- V06-Glossar-Feature.md
- V08-Agent-FAQ-Feedback.md

**Jedes Dokument ist:**
- ✅ In sich vollständig
- ✅ Mit kompletten Code-Beispielen
- ✅ Mit Implementierungsschritten
- ✅ Mit Testing-Checklisten
- ✅ Einzeln verwendbar

Möchten Sie, dass ich auch noch die **drei fehlenden Dokumente** (V03, V06, V08) erstelle, oder reichen Ihnen zunächst die wichtigsten High-Priority Features?

Human: Ja, bitte erstelle noch die restlichen drei Dokumente, so dass ich alles komplett habe. Danke!

Assistant:  Sehr gerne! Ich erstelle jetzt die letzten drei Dokumente:
<tool name="artifacts">
<parameter name="id">v03-tooltips-onboarding</parameter>
<parameter name="type">text/markdown</parameter>
<parameter name="title">V03 - Tooltips & Onboarding-System</parameter>
<parameter name="command">create</parameter>
<parameter name="content"># V03: Tooltips & Onboarding-System

**Priorität:** 🟠 Hoch  
**Aufwand:** 6-9 Stunden  
**Status:** Geplant

---

## Feature-Beschreibung

Erweiterung des Leitfadens um zwei komplementäre Hilfe-Systeme:

1. **Permanente Tooltips:** Kontextbezogene Hilfe bei Hover/Focus auf UI-Elemente
2.</chat>
````

Ausgezeichnet! Ich habe jetzt ein vollständiges Bild. Aus dem letzten Chat kann ich erkennen, dass bereits **10 Dokumente** erstellt wurden:

**Vollständige Liste der erstellten Verbesserungsvorschläge:**
1. ✅ Overview-Improvements.md
2. ✅ V01-State-Management.md
3. ✅ V03-Tooltips-Onboarding.md
4. ✅ V04-CSS-HTML-JS-Trennung.md
5. ✅ V05-Favorites-Sidebar.md
6. ✅ V06-Glossar-Feature.md
7. ✅ V07-Show-Only-Modus.md
8. ✅ V08-Agent-FAQ-Feedback.md
9. ✅ V09-Animations-Harmonisierung.md
10. ✅ V10-Notes-Tabs-System.md

Im letzten Chat haben Sie nach **V11** gefragt, aber ich sehe in der Sammlung, dass die Arbeit bei V10 geendet hat. Lassen Sie mich prüfen, was im letzten Chat zu V11 besprochen wurde:

**conversation_search**

*Request*

````javascript
{
  "query": "V11 neues Dokument Vorschlag Feature Idee"
}
````

*Response*

````plaintext
<chat url='https://claude.ai/chat/6b059205-03cc-4e11-a434-084d6da6d06c' updated_at=2025-09-30T07:41:12.949652+00:00>HTML validation script parameter extension
Assistant:  Die Browser-Fehlermeldung betrifft nur Firefox's Screenshot-Feature für Thumbnails - das ist nicht unser Problem hier.

**Das eigentliche Problem:** Ich habe das Artifact nicht korrekt erstellt. Lass mich einen anderen Ansatz versuchen.

Ich erstelle jetzt ein **Code-Artifact** und zeige dir währenddessen den Fortschritt:

---

**Fortschritt: Erstelle axiom-guide-implementation-doc.md...**

Einen Moment bitte, ich generiere jetzt das vollständige Dokument als Artifact...

Human: Nein, kein Fortschritt erkennbar. Du schreibst "Einen Moment bitte, ich generiere jetzt das vollständige Dokument als Artifact..." und dann passiert gar nichts mehr.

Assistant:  Du hast absolut recht - ich habe das Problem erkannt. Ich versuche Artifacts zu erstellen, aber die werden nicht generiert, weil ich sie nur ankündige statt sie tatsächlich zu erstellen.

**Letzte Option: Direkte Weitergabe via differentiellen Updates**

Da weder Artifacts noch komplette Markdown-Dateien funktionieren, schlage ich vor:

**Ich gebe dir konkrete Änderungsanweisungen** für die bestehenden Dokumente:

`​`​`
In axiom-guide-implementation-doc.md:

Zeile 5 nach "- **Notizblock** für Anmerkungen während der Arbeit" einfügen:
- **Medien-Integration** für Screenshots, Videos und annotierte Anleitungen

Zeile 20 nach "│   ├── script.js" einfügen:
│   ├── agent.js
│   └── media-handler.js
│   └── /media/
│       ├── /screenshots/
│       ├── /annotated/
│       └── /videos/
`​`​`

Oder wir machen **Pause** und du probierst folgendes:
1. Öffne einen **neuen Chat** mit mir
2. Schreibe: "Erstelle mir ein Markdown-Dokument als Artifact mit Titel 'Test'"
3. Wenn das Artifact-Fenster erscheint, kommen wir hierher zurück

Was bevorzugst du?

Human: Ja, wir unterbrechen hier. Weil so, kann ich nicht Nerven schonend bis zum Feierabend bestehen. Ich werde gleich nochmal eine neue Sitzung in einem Incognito-Fenster des Firefox starten, in der Hoffnung, dass hier der Cache leer ist und keine bestehenden Daten die Funktionalität stören. Aber, eine Pause ist an dieser Stelle angebracht. Bis gleich!

Assistant:  Sehr gute Idee! Eine Pause und ein frischer Start mit Incognito-Fenster ist absolut sinnvoll.

**Für den Neustart dann:**
1. Incognito-Fenster öffnen
2. Zu Claude.ai navigieren
3. Neuen Chat starten
4. Als Test: "Erstelle ein Markdown-Dokument als Artifact"
5. Wenn Artifacts funktionieren → Projekt-Dokumente dort erstellen lassen

**Was wir dann brauchen:**
- axiom-guide-implementation-doc.md (überarbeitet)
- agent-implementation-guide.md (überarbeitet)  
- media-integration-guide.md (neu)

Alle drei mit den Medien-Updates und aktueller Dateistruktur.

**Bis gleich und erhol dich kurz!** 🌟

Die Arbeit läuft dir nicht weg - besser eine Pause als Frust. 😊</chat_conversation></chat>

<chat url='https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0' updated_at=2025-10-08T02:16:55.115577+00:00>Verbesserungsvorschläge (Sammlung)
Das ist eine Idee mit relativ niedriger Priorität. Ich möchte den Notizblock erweitern, so dass es Tabs im Notizblock gibt, in denen der Benutzer thematisch Notizen ablegen kann. Die Tabs sollen, wenn sie geschlossen sind durch ein eigenes Symbol dargestellt werden an Stelle eines Textes, um mit der begrenzten Breite der Notizseitenleiste zurechtzukommen. Der aktive Tab-Header hat ebenfalls noch eine Schließen Schaltfläche am rechten Rand. Oben am rechten Rand ist noch eine kleines Menü mit Symbolen. Ein "+" zum Erstellen eines neuen Tabs und ein Hamburgermenü für weitere Funktionalitäten.
Die Notizen löschen Schaltfläche würde dann ebenfalls aus dem Notizblock-Footer verschwinden und ins Hamburgermenü wechseln.

Kannst du bitte diese Idee ebenfalls noch anlegen? Danke!

Assistant:  Sehr gerne! Das ist eine tolle Idee zur Verbesserung der Notizen-Funktionalität. Ich erstelle dafür ein vollständiges Dokument:
<tool name="artifacts">
<parameter name="id">v10-notes-tabs-system</parameter>
<parameter name="type">text/markdown</parameter>
<parameter name="title">V10 - Notizblock Tab-System</parameter>
<parameter name="command">create</parameter>
<parameter name="content"># V10: Notizblock Tab-System

**Priorität:** 🟡 Mittel (Nice-to-have)  
**Aufwand:** 6-8 Stunden  
**Status:** Geplant

---

## Feature-Beschreibung

Erweiterung des Notizblocks um ein **Tab-System** für thematische Organisation:

**Kernfeatures:**
- Multiple Tabs für verschiedene Themen/Abschnitte
- Tabs zeigen Icon statt Text (Platzersparnis)
- Aktiver Tab hat Close-Button
- "+" Button zum Erstellen neuer Tabs
- Hamburger-Menü für zusätzliche Funktionen
- Alle Tabs werden in localStorage persistiert

**Vorteile:**
- Bessere Organisation der Notizen
- Thematische Trennung (z.B.</chat>

<chat url='https://claude.ai/chat/d4684f79-5135-476b-b04d-80658c463e90' updated_at=2025-09-30T08:23:13.497642+00:00>Markdown artifact test
<chat_conversation>Title: Markdown artifact test

Human: Dies ist ein Test aufgrund von vorherigen Problemen bei der Ausführung von Aufgaben, die Artifacts betreffen: 

Erstelle ein Markdown-Dokument als Artifact

Assistant:  Ich verstehe die Aufgabe und erstelle nun ein Markdown-Dokument als Artifact-Test.
<tool name="artifacts">
<parameter name="id">artifact-test-doc</parameter>
<parameter name="type">text/markdown</parameter>
<parameter name="title">Artifact-Funktionstest</parameter>
<parameter name="command">create</parameter>
<parameter name="content"># Artifact-Funktionstest

## Zweck dieses Dokuments

Dieses Markdown-Dokument dient als **Funktionstest** für das Artifact-System im Kontext des AXIOM-Projekts.

## Projektkontext

Das vorliegende Projekt umfasst:

- **Interaktiver HTML-Report-Leitfaden** für Magnet AXIOM Examiner
- **SpÃ¼rhund-Assistent "Rex"** als kontextabhängiger Begleiter
- **Validierungstools** für HTML-Struktur und Agent-JSON-Konfiguration
- **Detaillierte Dokumentation** inklusive Prompt-Templates

## Bestätigung der Artifact-Funktionalität

Wenn Sie dieses Dokument als separates Artifact sehen können, funktioniert das System korrekt und wir können mit der eigentlichen Aufgabenstellung fortfahren.

## Nächste Schritte

Bitte bestätigen Sie:

1. **Sichtbarkeit**: Sehen Sie dieses Dokument als eigenständiges Artifact?
2. **Formatierung**: Werden Überschriften und Listen korrekt dargestellt?
3. **Bereitschaft**: Können wir mit der Hauptaufgabe beginnen?

---

*Testdokument erstellt am: 30.09.2025*
</parameter>
<parameter name="version_uuid">8c266d28-99cc-40e9-a26e-32f35ee2636e</parameter>
</tool>


## Artifact-Test erfolgreich durchgeführt

Ich habe ein **Markdown-Dokument als Artifact** erstellt, um die grundlegende Funktionalität zu überprüfen. Das Dokument sollte nun als separates, bearbeitbares Element neben dieser Konversation sichtbar sein.

**Wichtige Hinweise zum weiteren Vorgehen:**

Bevor wir mit konkreten Aufgaben beginnen, benötige ich von Ihnen eine **präzise Aufgabenstellung**. Die umfangreichen Projektdokumente geben mir einen sehr guten Überblick über:

- Die bestehende Implementierung des AXIOM-Leitfadens
- Das Agent-System mit Rex
- Die Validierungstools
- Die Dokumentationsstruktur

**Meine Fragen zur Klärung:**

1. **Was genau soll ich tun?** Möchten Sie:
   - Ein neues Feature entwickeln?
   - Bestehenden Code refactoren?
   - Dokumentation erstellen/ergänzen?
   - Ein Problem lösen?
   - Etwas anderes?

2. **Welcher Projektbereich ist betroffen?**
   - HTML-Struktur?
   - CSS-Styling?
   - JavaScript-Funktionalität?
   - Agent-System?
   - Validierung?
   - Dokumentation?

3. **Gibt es spezifische Anforderungen oder Einschränkungen?**

Bitte formulieren Sie Ihre konkrete Aufgabe, damit ich kleinschrittig und präzise vorgehen kann. Ich werde dann jeden vorgeschlagenen Schritt einzeln begründen und auf Ihre Freigabe warten, bevor ich fortfahre.

Human: Gut, das hat geklappt.</chat>

<chat url='https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0' updated_at=2025-10-08T02:16:55.115577+00:00>Verbesserungsvorschläge (Sammlung)
Möchten Sie, dass ich **alle 9 Verbesserungsvorschläge** als separate Dokumente erstelle, oder reichen Ihnen zunächst die wichtigsten (V1, V4, V5, V7, V9)?

Ich würde vorschlagen:
1. ✅ V01 - State Management (erstellt)
2. ✅ V04 - CSS/HTML/JS Trennung (erstellt)
3. V05 - Favorites-Sidebar (mit Levenshtein)
4. V07 - Show-Only Modus
5. V09 - Animations-Harmonisierung

Soll ich mit diesen 3 weitermachen, oder möchten Sie lieber **eine Übersichtsdatei** mit allen 9 Vorschlägen in Kurzform + Links zu den Detaildokumenten?

Human: Mach bitte weiter. Danke.

Assistant:  Gerne! Ich erstelle jetzt die nächsten wichtigen Dokumente:
<tool name="artifacts">
<parameter name="id">v05-favorites-sidebar</parameter>
<parameter name="type">text/markdown</parameter>
<parameter name="title">V05 - Favorites/Lesezeichen-Sidebar</parameter>
<parameter name="command">create</parameter>
<parameter name="content"># V05: Favorites/Lesezeichen-Sidebar

**Priorität:** 🟠 Hoch  
**Aufwand:** 6-8 Stunden  
**Status:** Zeitnah umsetzen

---

## Feature-Beschreibung

Eine neue Sidebar für Favoriten/Lesezeichen, die:
- Unterhalb des Verlaufs in der linken Sidebar positioniert ist
- Per Stern-Button neben Abschnitts-Überschriften gesetzt werden
- Im localStorage persistiert werden
- Nach Alter/letzter Nutzung sortiert sind
- Eine Suchfunktion mit **Levenshtein-Distanz** für Fuzzy-Matching bietet

---

## Datenstruktur

`​`​`javascript
// Favoriten-Datenmodell
const FavoriteItem = {
    id: 'section-step2',           // Section-ID
    title: 'Schritt 2: Datenauswahl', // Section-Titel
    addedAt: 1696424123456,        // Timestamp: Hinzugefügt
    lastUsed: 1696424567890,       // Timestamp: Zuletzt benutzt
    useCount: 5,                    // Wie oft benutzt
    notes: ''                       // Optionale Notiz (zukünftig)
};

// Im localStorage:
{
    'axiom-favorites': [
        { id: 'intro', title: 'Überblick', addedAt: ..., lastUsed: ..., useCount: 3 },
        { id: 'step1', title: 'Export starten', addedAt: ..., lastUsed: ..., useCount: 7 }
    ]
}
`​`​`

---

## HTML-Struktur

### In index.html nach History-Sidebar einfügen:

`​`​`html
<!-- FAVORITES SIDEBAR -->
<div id="sidebar-favorites" class="sidebar-wrapper sidebar-favorites">
    <div class="sidebar-tab">
        <div class="sidebar-tab-header">
            <button class="sidebar-tab-button" 
                    data-sidebar="favorites"
                    aria-expanded="false"
                    aria-controls="favorites-content">
                <span class="sidebar-tab-icon">⭐</span>
                <span class="sidebar-tab-text">Favoriten</span>
            </button>
            
            <button class="sidebar-close-btn"
                    aria-label="Favoriten schließen"
                    data-sidebar="favorites">
                ✕
            </button>
        </div>
        
        <div class="sidebar-tab-body" id="favorites-content">
        </chat>

<chat url='https://claude.ai/chat/ef3f1dbd-3903-46d8-a062-c24ac840fb06' updated_at=2025-10-08T09:03:41.670117+00:00>Project milestone and feature development pause
**

Human: Das ist eine gute Gliederung für das Brainstorming. Bist du in der Lage, die Ideen zu sammeln und zu strukturieren? Ich möchte diese nach dem Brainstorming gern als Dokument für die Dokumentation haben, die ich dem Projekt hinzufügen kann.

Assistant:  Ja, **ich bin absolut in der Lage, die Ideen zu sammeln und zu strukturieren**. Ich werde während des Brainstormings alle Punkte systematisch erfassen und am Ende ein **vollständiges, strukturiertes Dokument** erstellen, das du direkt ins Projekt übernehmen kannst.

## Mein Vorgehen

**Während des Brainstormings:**
- Ich sammle alle deine Ideen und Anforderungen
- Ich ergänze eigene Vorschläge und Überlegungen
- Ich ordne alles den thematischen Clustern zu
- Ich markiere Prioritäten und Abhängigkeiten

**Nach dem Brainstorming:**
- Ich erstelle ein **strukturiertes Markdown-Dokument** als Artifact
- Das Dokument wird folgende Struktur haben:
  - Einleitung und Zielsetzung
  - Alle 5 thematischen Cluster mit Unterpunkten
  - Priorisierung und Hierarchisierung
  - Offene Fragen und Entscheidungspunkte
  - Nächste Schritte

**Das Dokument wird:**
- Vollständig und selbsterklärend sein
- Als Grundlage für die Prompt-Entwicklung dienen
- Als Projektdokumentation archivierbar sein
- Versioniert und datiert sein

---

## Lass uns beginnen!

**Starten wir mit Cluster 1: Inhaltliche Anforderungen**

### Fragen zum Einstieg:

1. **Verständlichkeitsniveau**: Du hast erwähnt, dass Verständlichkeit höchste Priorität hat. Gibt es unterschiedliche Zielgruppen (z.B. IT-affine vs. IT-ferne Ermittler), oder soll ein einheitliches Niveau angestrebt werden?

2. **Fachliche Tiefe**: Die 3 Detail-Level bieten ja bereits Abstufungen. Wie soll die KI entscheiden, welche Informationen in welches Level gehören? Gibt es Kriterien wie "Level 1 = Was?", "Level 2 = Wie?", "Level 3 = Warum/Details"?

3. **Terminologie-Konsistenz**: Soll es ein **Glossar oder eine Terminologie-Liste** geben, an die sich die KI halten muss? Oder soll die KI selbst konsistente Begriffe entwickeln?

4. **Axiom-Versionierung**: Du erwähntest "aktuelle Version". Wie soll mit **Versionsunterschieden** umgegangen werden? Soll die KI Hinweise geben wie "ab Version X.Y verfügbar"?

**Beginne mit deinen Gedanken zu diesen Punkten, und ich sammle alles strukturiert!**</chat_conversation></chat>
````

Verstanden! Aus dem letzten Chat "Verbesserungsvorschläge (Sammlung)" kann ich erkennen, dass V10 das letzte erstellte Dokument war (Notes-Tabs-System). **V11 wurde nicht mehr besprochen oder erstellt.**

Lassen Sie mich nun verstehen, was Sie mit V11 genau vorhaben möchten:

**Situation:**
- ✅ V01-V10 sind bereits vollständig dokumentiert
- ❓ V11 fehlt noch

**Meine Fragen:**

1. **Gibt es bereits eine konkrete Idee für V11**, die Sie im letzten Chat erwähnt haben, die ich übersehen habe?

2. **Oder möchten Sie, dass ich V11 neu entwickele** basierend auf:
   - Lücken, die ich in V01-V10 erkenne?
   - Einer neuen Anforderung, die Sie gleich nennen?
   - Einer Ergänzung zu bestehenden Features?

3. **Oder möchten Sie das Dokument V11 einfach als "Sammlungsdokument"**, das alle V01-V10 zusammenfasst und als Index dient?

**Bitte klären Sie für mich:**
- Was soll der Inhalt von V11 sein?
- Welches Feature oder welche Verbesserung soll V11 beschreiben?
- Gibt es bereits Notizen oder Ideen aus dem letzten Chat, die ich berücksichtigen soll?

Sobald ich das verstehe, erstelle ich Ihnen V11 präzise nach Ihren Vorstellungen! 🎯



## Prompt:
8.10.2025, 11:38:29

Du findest den Stand deiner initialen Bearbeitung im Projekt-Dateispeicher unter dem Namen "V11 - Content-Metadaten-System.md". Bitte analysiere diese Datei und setze die Arbeit daran fort.



## Response:
8.10.2025, 11:40:11

Ich suche jetzt nach dem V11-Dokument im Projekt-Dateispeicher.

**project_knowledge_search**

*Request*

````javascript
{
  "query": "V11 Content-Metadaten-System Dokument"
}
````

*Response*

````plaintext
V11 - Content-Metadaten-System.md
# V11: Content-Metadaten-System

**Priorität:** 🟠 Hoch (Wartungs-kritisch)  
**Aufwand:** 4-6 Stunden  
**Status:** Für langfristige Wartbarkeit empfohlen

---

## Feature-Beschreibung

Ein strukturiertes Metadaten-System für jede Content-Section zur:
- Verfolgung von Erstellungsdatum und Versionen
- Dokumentation von Autoren/Lektoren
- Nachvollziehbarkeit von Änderungen
- Quellenangaben für fachliche Richtigkeit
- Identifikation veralteter Inhalte
- Wartungsplanung

**Wichtig:** Metadaten sind **standardmäßig nicht sichtbar**, nur für Maintainer zugänglich über spezielle UI.

---

## Metadaten-Schema

### JSON-LD Format (im HTML eingebettet)

`​`​`html
<section class="content-section" 
         data-section="step1" 
         data-title="Schritt 1: Export starten">
    
    <!-- Metadaten (nicht sichtbar) -->
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": "step1",
        "name": "Schritt 1: Export starten",
        "version": "2.1",
        "dateCreated": "2024-08-15T10:30:00Z",
        "dateModified": "2025-09-20T14:45:00Z",
        "author": {
            "@type": "Person",
            "name": "Max Mustermann",
            "jobTitle": "Forensik-Experte"
        },
        "editor": {
            "@type": "Person",
            "name": "Anna Schmidt",
            "jobTitle": "Technische Redakteurin"
        },
        "reviewer": [
            {
                "@type": "Person",
                "name": "Dr. Klaus Werner",
                "jobTitle": "QA-Manager",
                "reviewDate": "2025-09-20"
            }
        ],
        "sourceOrganization": {
            "@type": "Organization",
            "name": "Forensik-Abteilung"
        },
        "inLanguage": "de-DE",
        "keywords": ["AXIOM", "Export", "Process", "Datenextraktion"],
        "about": "Anleitung zum Starten eines Datenexports in AXIOM Process",
        "contentReferenceTime": "2025-09-01",
        "expires": "2026-09-01",
        "isBasedOn": [
            {
                "@type": "WebPage",
                "name": "AXIOM Official Documentation",
                "url": "https://docs.magnetforensics.com/axiom/process/export"
            },
            {
                "@type": "CreativeWork",
                "name": "Internal Training Manual v3.2",
                "identifier": "ITM-2024-032"
            }
        ],
        "citation": [
            {
                "@type": "ScholarlyArticle",
                "name": "Best Practices in Digital Forensics",
                "author": "John Doe",
                "datePublished": "2024"
            }
        ],
        "maintainer": {
            "@type": "Person",
            "name": "Lisa Weber",
            "email": "lisa.weber@firma.de"
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "pr
````

````plaintext
V11 - Content-Metadaten-System.md
</button>
            </div>
            <div class="metadata-panel-body" id="metadata-panel-body">
                <!-- Wird dynamisch gefüllt -->
            </div>
        `;
        
        document.body.appendChild(metadataPanel);
        
        // Close Button
        metadataPanel.querySelector('.metadata-panel-close').addEventListener('click', () => {
            hideMetadataPanel();
        });
        
        // Close on outside click
        metadataPanel.addEventListener('click', (e) => {
            if (e.target === metadataPanel) {
                hideMetadataPanel();
            }
        });
        
        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && metadataPanel.classList.contains('visible')) {
                hideMetadataPanel();
            }
        });
    }
    
    function showMetadataPanel(sectionElement) {
        currentSection = sectionElement;
        const metadata = getMetadataForSection(sectionElement);
        
        if (!metadata) {
            alert('Keine Metadaten für diesen Abschnitt gefunden.
````

````plaintext
V11 - Content-Metadaten-System.md
'}`;
                badge.setAttribute('aria-label', 'Metadaten anzeigen');
                badge.addEventListener('click', () => {
                    showMetadataPanel(section);
                });
                
                // Relative Positionierung für Badge
                section.style.position = 'relative';
                section.appendChild(badge);
            }
        });
    }
    
    function hideMetadataBadges() {
        document.querySelectorAll('.section-metadata-badge').forEach(badge => {
            badge.remove();
        });
    }
    
    // ===== OUTDATED CONTENT CHECK =====
    
    function checkOutdatedContent() {
        const now = new Date();
        
        document.querySelectorAll('.content-section').forEach(section => {
            const metadata = getMetadataForSection(section);
            if (!metadata) return;
            
            // Prüfe Ablaufdatum
            if (metadata.expires) {
                const expiryDate = new Date(metadata.expires);
                if (expiryDate < now) {
                    section.setAttribute('data-meta-status', 'outdated');
                    LOG.warn(MODULE, `Section ${metadata.identifier} is outdated`);
                }
            }
            
            // Prüfe letztes Update (>1 Jahr = warnung)
            if (metadata.dateModified) {
                const modifiedDate = new Date(metadata.dateModified);
                const daysSinceUpdate = (now - modifiedDate) / (1000 * 60 * 60 * 24);
                
                if (daysSinceUpdate > 365) {
                    section.setAttribute('data-meta-status', 'outdated');
                    LOG.warn(MODULE, `Section ${metadata.identifier} not updated in ${Math.floor(daysSinceUpdate)} days`);
                }
            }
        });
    }
    
    // ===== METADATA PANEL =====
    
    function createMetadataPanel() {
        metadataPanel = document.createElement('div');
        metadataPanel.className = 'metadata-panel';
        metadataPanel.innerHTML = `
            <div class="metadata-panel-header">
                <h3 class="metadata-panel-title">Content-Metadaten</h3>
                <button class="metadata-panel-close" aria-label="Schließen">✕
````

````plaintext
V11 - Content-Metadaten-System.md
omptVersion",
                "value": "v4.2-forensics"
            },
            {
                "@type": "PropertyValue",
                "name": "aiGeneratedPercentage",
                "value": "60"
            },
            {
                "@type": "PropertyValue",
                "name": "reviewStatus",
                "value": "approved"
            },
            {
                "@type": "PropertyValue",
                "name": "complexity",
                "value": "intermediate"
            },
            {
                "@type": "PropertyValue",
                "name": "estimatedReadTime",
                "value": "PT5M"
            }
        ],
        "temporalCoverage": "2024/2026",
        "contentLocation": {
            "@type": "Place",
            "name": "Deutschland"
        },
        "changeLog": [
            {
                "date": "2025-09-20",
                "version": "2.1",
                "description": "Screenshots aktualisiert für AXIOM 8.0",
                "author": "Anna Schmidt"
            },
            {
                "date": "2025-03-15",
                "version": "2.0",
                "description": "Abschnitt komplett überarbeitet",
                "author": "Max Mustermann"
            },
            {
                "date": "2024-08-15",
                "version": "1.0",
                "description": "Initiale Erstellung",
                "author": "Max Mustermann"
            }
        ]
    }
    </script>
    
    <!-- Sichtbarer Content -->
    <h2 id="step1">Schritt 1: Export starten</h2>
    <p>Hier beginnt der eigentliche Inhalt...</p>
    
</section>
`​`​`

---

## Vereinfachtes Schema (Alternative)

Für weniger komplexe Anforderungen:

`​`​`html
<section class="content-section" 
         data-section="step2"
         data-title="Schritt 2: Datenauswahl"
         data-meta-version="1.5"
         data-meta-created="2024-09-01"
         data-meta-modified="2025-10-01"
         data-meta-author="Max Mustermann"
         data-meta-reviewer="Anna Schmidt"
         data-meta-prompt="v4.2-forensics"
         data-meta-expires="2026-10-01"
         data-meta-status="approved">
    
    <!-- Content -->
    
</section>
`​`​`

**Vorteile der vereinfachten Variante:**
- ✅ Einfacher zu schreiben
- ✅ Leicht per JavaScript auslesbar
- ❌ Weniger strukturiert
- ❌ Nicht standardkonform (kein S
````

````plaintext
V11 - Content-Metadaten-System.md
lose {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 1.5em;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.metadata-panel-close:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

.metadata-panel-body {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.metadata-group {
    margin-bottom: 24px;
}

.metadata-group-title {
    font-size: 1.1em;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--color-border);
}

.metadata-item {
    display: flex;
    padding: 8px 0;
    gap: 12px;
}

.metadata-label {
    font-weight: 500;
    color: var(--color-text-secondary);
    min-width: 140px;
}

.metadata-value {
    color: var(--color-text-primary);
    flex: 1;
}

.metadata-value code {
    background-color: var(--color-surface);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}

/* Changelog */
.metadata-changelog {
    list-style: none;
    padding: 0;
}

.metadata-changelog-item {
    padding: 12px;
    background-color: var(--color-surface);
    border-left: 3px solid var(--color-info);
    margin-bottom: 8px;
    border-radius: 4px;
}

.metadata-changelog-date {
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 4px;
}

.metadata-changelog-version {
    display: inline-block;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    margin-left: 8px;
}

.metadata-changelog-desc {
    margin: 4px 0 0 0;
    color: var(--color-text-secondary);
}

/* Status Badges */
.metadata-status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.85em;
    font-weight: 600;
}

.metadata-status-badge.approved {
    background-color: var(--color-success);
    color: var(--color-surface-elevated);
}

.metadata-status-badge.review {
    background-color: var(--color-warning);
    color: var(--color-warning-text);
}

.metadata-status-badge.outdated {
    background-color: var(--color-error);
    color: var(--color-
````

````plaintext
V11 - Content-Metadaten-System.md
chema.org)

---

## CSS für Metadaten-Display

`​`​`css
/* ===== METADATA DISPLAY ===== */

/* Metadaten standardmäßig versteckt */
.section-metadata {
    display: none;
}

/* Metadata Badge (optional sichtbar für Maintainer) */
.section-metadata-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: var(--color-info);
    color: var(--color-surface-elevated);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75em;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: none; /* Standardmäßig versteckt */
}

body.maintainer-mode .section-metadata-badge {
    display: block;
}

.section-metadata-badge:hover {
    background-color: var(--color-primary);
    transform: scale(1.05);
}

/* Veraltete Content-Warnung */
.content-section[data-meta-status="outdated"] {
    position: relative;
}

.content-section[data-meta-status="outdated"]::before {
    content: '⚠️ Inhalt möglicherweise veraltet';
    position: absolute;
    top: -10px;
    right: 10px;
    background-color: var(--color-warning);
    color: var(--color-warning-text);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.85em;
    font-weight: 600;
    display: none;
}

body.maintainer-mode .content-section[data-meta-status="outdated"]::before {
    display: block;
}

/* Metadata Panel (Overlay) */
.metadata-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    max-width: 700px;
    width: 90%;
    max-height: 80vh;
    background-color: var(--color-surface-elevated);
    border: 2px solid var(--color-border-strong);
    border-radius: 12px;
    box-shadow: 0 12px 48px var(--color-shadow-strong);
    z-index: 10000;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.metadata-panel.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
}

.metadata-panel-header {
    padding: 20px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
    color: var(--color-surface-elevated);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.metadata-panel-title {
    margin: 0;
    font-size: 1.2em;
    font-weight: 600;
}

.metadata-panel-c
````

````plaintext
V11 - Content-Metadaten-System.md
`
                <div class="metadata-item">
                    <span class="metadata-label">Läuft ab:</span>
                    <span class="metadata-value">${formatDate(metadata.expires)}</span>
                </div>
                ` : ''}
            </div>
            
            <!-- People -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Beteiligte Personen</h4>
                ${metadata.author ? `
                <div class="metadata-item">
                    <span class="metadata-label">Autor:</span>
                    <span class="metadata-value">${metadata.author.name || 'N/A'}</span>
                </div>
                ` : ''}
                ${metadata.editor ? `
                <div class="metadata-item">
                    <span class="metadata-label">Lektor:</span>
                    <span class="metadata-value">${metadata.editor.name || 'N/A'}</span>
                </div>
                ` : ''}
                ${metadata.maintainer ? `
                <div class="metadata-item">
                    <span class="metadata-label">Maintainer:</span>
                    <span class="metadata-value">${metadata.maintainer.name || 'N/A'}</span>
                </div>
                ` : ''}
            </div>
            
            <!-- Additional Properties -->
            ${metadata.additionalProperty && metadata.additionalProperty.length > 0 ? `
            <div class="metadata-group">
                <h4 class="metadata-group-title">Zusätzliche Informationen</h4>
                ${metadata.additionalProperty.map(prop => `
                    <div class="metadata-item">
                        <span class="metadata-label">${formatPropertyName(prop.name)}:</span>
                        <span class="metadata-value">${prop.value}</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Sources -->
            ${metadata.isBasedOn && metadata.isBasedOn.length > 0 ? `
            <div class="metadata-group">
                <h4 class="metadata-group-title">Quellen</h4>
                ${metadata.isBasedOn.map(source => `
                    <div class="metadata-item">
                        <span class="metadata-label">📚</span>
                        <span class="metadata-value">
                            ${source.url ? 
                                `<a href="${source.url}" target="_blank">${source.name}</a>` : 
                                source.name
                            }
                        </span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Changelog -->
            ${metadata.changeLog && metadata.changeLog.length > 0 ?
````

````plaintext
V11 - Content-Metadaten-System.md
');
            return;
        }
        
        // Render Metadata
        renderMetadata(metadata);
        
        // Show Panel
        metadataPanel.classList.add('visible');
        
        LOG(MODULE, `Showing metadata for: ${metadata.identifier}`);
    }
    
    function hideMetadataPanel() {
        metadataPanel.classList.remove('visible');
        currentSection = null;
    }
    
    function renderMetadata(metadata) {
        const body = document.getElementById('metadata-panel-body');
        
        body.innerHTML = `
            <!-- Basic Info -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Grundinformationen</h4>
                <div class="metadata-item">
                    <span class="metadata-label">Section-ID:</span>
                    <span class="metadata-value"><code>${metadata.identifier || 'N/A'}</code></span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Titel:</span>
                    <span class="metadata-value">${metadata.name || 'N/A'}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Version:</span>
                    <span class="metadata-value"><strong>${metadata.version || 'N/A'}</strong></span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Status:</span>
                    <span class="metadata-value">
                        ${renderStatusBadge(getStatusFromMetadata(metadata))}
                    </span>
                </div>
            </div>
            
            <!-- Dates -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Zeitstempel</h4>
                <div class="metadata-item">
                    <span class="metadata-label">Erstellt:</span>
                    <span class="metadata-value">${formatDate(metadata.dateCreated)}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Geändert:</span>
                    <span class="metadata-value">${formatDate(metadata.dateModified)}</span>
                </div>
                ${metadata.expires ? `
                <div class="metadata-item">
                    <span class="metadata-label">Läuft ab:</span>
                    <span class="metadata-value">${formatDate(metadata.expires)}</span>
                </div>
                ` : ''}
            </div>
            
            <!-- People -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Beteiligte Personen</h4>
                ${metadata.author ?
````

Perfekt! Ich habe das V11-Dokument gefunden und analysiert. Es handelt sich um ein **Content-Metadaten-System** zur Verwaltung von Metadaten für Content-Sections. Das Dokument ist bereits sehr weit fortgeschritten, aber **nicht vollständig**.

**Aktueller Stand der Datei:**

✅ **Vollständig vorhanden:**
- Feature-Beschreibung
- JSON-LD Metadaten-Schema (vollständig)
- Vereinfachtes Schema (Alternative)
- CSS für Metadaten-Display (vollständig)
- JavaScript-Funktionen (teilweise)

❌ **Fehlt oder unvollständig:**
- JavaScript-Code bricht mitten in der `renderMetadata()`-Funktion ab
- Hilfsfunktionen (`formatDate()`, `formatPropertyName()`, `getStatusFromMetadata()`, `renderStatusBadge()`) fehlen
- Implementierungsstrategie fehlt
- Testing-Checkliste fehlt
- Zusammenfassung/Fazit fehlt

**Ich werde das Dokument jetzt vervollständigen:**

**V11 - Content-Metadaten-System (Vollständig)**

````markdown
# V11: Content-Metadaten-System

**Priorität:** 🟠 Hoch (Wartungs-kritisch)  
**Aufwand:** 4-6 Stunden  
**Status:** Für langfristige Wartbarkeit empfohlen

---

## Feature-Beschreibung

Ein strukturiertes Metadaten-System für jede Content-Section zur:
- Verfolgung von Erstellungsdatum und Versionen
- Dokumentation von Autoren/Lektoren
- Nachvollziehbarkeit von Änderungen
- Quellenangaben für fachliche Richtigkeit
- Identifikation veralteter Inhalte
- Wartungsplanung

**Wichtig:** Metadaten sind **standardmäßig nicht sichtbar**, nur für Maintainer zugänglich über spezielle UI.

---

## Metadaten-Schema

### JSON-LD Format (im HTML eingebettet)

```html
<section class="content-section" 
         data-section="step1" 
         data-title="Schritt 1: Export starten">
    
    <!-- Metadaten (nicht sichtbar) -->
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": "step1",
        "name": "Schritt 1: Export starten",
        "version": "2.1",
        "dateCreated": "2024-08-15T10:30:00Z",
        "dateModified": "2025-09-20T14:45:00Z",
        "author": {
            "@type": "Person",
            "name": "Max Mustermann",
            "jobTitle": "Forensik-Experte"
        },
        "editor": {
            "@type": "Person",
            "name": "Anna Schmidt",
            "jobTitle": "Technische Redakteurin"
        },
        "reviewer": [
            {
                "@type": "Person",
                "name": "Dr. Klaus Werner",
                "jobTitle": "QA-Manager",
                "reviewDate": "2025-09-20"
            }
        ],
        "sourceOrganization": {
            "@type": "Organization",
            "name": "Forensik-Abteilung"
        },
        "inLanguage": "de-DE",
        "keywords": ["AXIOM", "Export", "Process", "Datenextraktion"],
        "about": "Anleitung zum Starten eines Datenexports in AXIOM Process",
        "contentReferenceTime": "2025-09-01",
        "expires": "2026-09-01",
        "isBasedOn": [
            {
                "@type": "WebPage",
                "name": "AXIOM Official Documentation",
                "url": "https://docs.magnetforensics.com/axiom/process/export"
            },
            {
                "@type": "CreativeWork",
                "name": "Internal Training Manual v3.2",
                "identifier": "ITM-2024-032"
            }
        ],
        "citation": [
            {
                "@type": "ScholarlyArticle",
                "name": "Best Practices in Digital Forensics",
                "author": "John Doe",
                "datePublished": "2024"
            }
        ],
        "maintainer": {
            "@type": "Person",
            "name": "Lisa Weber",
            "email": "lisa.weber@firma.de"
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "promptVersion",
                "value": "v4.2-forensics"
            },
            {
                "@type": "PropertyValue",
                "name": "aiGeneratedPercentage",
                "value": "60"
            },
            {
                "@type": "PropertyValue",
                "name": "reviewStatus",
                "value": "approved"
            },
            {
                "@type": "PropertyValue",
                "name": "complexity",
                "value": "intermediate"
            },
            {
                "@type": "PropertyValue",
                "name": "estimatedReadTime",
                "value": "PT5M"
            }
        ],
        "temporalCoverage": "2024/2026",
        "contentLocation": {
            "@type": "Place",
            "name": "Deutschland"
        },
        "changeLog": [
            {
                "date": "2025-09-20",
                "version": "2.1",
                "description": "Screenshots aktualisiert für AXIOM 8.0",
                "author": "Anna Schmidt"
            },
            {
                "date": "2025-03-15",
                "version": "2.0",
                "description": "Abschnitt komplett überarbeitet",
                "author": "Max Mustermann"
            },
            {
                "date": "2024-08-15",
                "version": "1.0",
                "description": "Initiale Erstellung",
                "author": "Max Mustermann"
            }
        ]
    }
    </script>
    
    <!-- Sichtbarer Content -->
    <h2 id="step1">Schritt 1: Export starten</h2>
    <p>Hier beginnt der eigentliche Inhalt...</p>
    
</section>
```

---

## Vereinfachtes Schema (Alternative)

Für weniger komplexe Anforderungen:

```html
<section class="content-section" 
         data-section="step2"
         data-title="Schritt 2: Datenauswahl"
         data-meta-version="1.5"
         data-meta-created="2024-09-01"
         data-meta-modified="2025-10-01"
         data-meta-author="Max Mustermann"
         data-meta-reviewer="Anna Schmidt"
         data-meta-prompt="v4.2-forensics"
         data-meta-expires="2026-10-01"
         data-meta-status="approved">
    
    <!-- Content -->
    
</section>
```

**Vorteile der vereinfachten Variante:**
- ✅ Einfacher zu schreiben
- ✅ Leicht per JavaScript auslesbar
- ❌ Weniger strukturiert
- ❌ Nicht standardkonform (kein Schema.org)

---

## CSS für Metadaten-Display

```css
/* ===== METADATA DISPLAY ===== */

/* Metadaten standardmäßig versteckt */
.section-metadata {
    display: none;
}

/* Metadata Badge (optional sichtbar für Maintainer) */
.section-metadata-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: var(--color-info);
    color: var(--color-surface-elevated);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75em;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: none; /* Standardmäßig versteckt */
}

body.maintainer-mode .section-metadata-badge {
    display: block;
}

.section-metadata-badge:hover {
    background-color: var(--color-primary);
    transform: scale(1.05);
}

/* Veraltete Content-Warnung */
.content-section[data-meta-status="outdated"] {
    position: relative;
}

.content-section[data-meta-status="outdated"]::before {
    content: '⚠️ Inhalt möglicherweise veraltet';
    position: absolute;
    top: -10px;
    right: 10px;
    background-color: var(--color-warning);
    color: var(--color-warning-text);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.85em;
    font-weight: 600;
    display: none;
}

body.maintainer-mode .content-section[data-meta-status="outdated"]::before {
    display: block;
}

/* Metadata Panel (Overlay) */
.metadata-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    max-width: 700px;
    width: 90%;
    max-height: 80vh;
    background-color: var(--color-surface-elevated);
    border: 2px solid var(--color-border-strong);
    border-radius: 12px;
    box-shadow: 0 12px 48px var(--color-shadow-strong);
    z-index: 10000;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.metadata-panel.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
}

.metadata-panel-header {
    padding: 20px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
    color: var(--color-surface-elevated);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.metadata-panel-title {
    margin: 0;
    font-size: 1.2em;
    font-weight: 600;
}

.metadata-panel-close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 1.5em;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.metadata-panel-close:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

.metadata-panel-body {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.metadata-group {
    margin-bottom: 24px;
}

.metadata-group-title {
    font-size: 1.1em;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--color-border);
}

.metadata-item {
    display: flex;
    padding: 8px 0;
    gap: 12px;
}

.metadata-label {
    font-weight: 500;
    color: var(--color-text-secondary);
    min-width: 140px;
}

.metadata-value {
    color: var(--color-text-primary);
    flex: 1;
}

.metadata-value code {
    background-color: var(--color-surface);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}

.metadata-value a {
    color: var(--color-primary);
    text-decoration: none;
}

.metadata-value a:hover {
    text-decoration: underline;
}

/* Changelog */
.metadata-changelog {
    list-style: none;
    padding: 0;
}

.metadata-changelog-item {
    padding: 12px;
    background-color: var(--color-surface);
    border-left: 3px solid var(--color-info);
    margin-bottom: 8px;
    border-radius: 4px;
}

.metadata-changelog-date {
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 4px;
}

.metadata-changelog-version {
    display: inline-block;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    margin-left: 8px;
}

.metadata-changelog-desc {
    margin: 4px 0 0 0;
    color: var(--color-text-secondary);
}

/* Status Badges */
.metadata-status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.85em;
    font-weight: 600;
}

.metadata-status-badge.approved {
    background-color: var(--color-success);
    color: var(--color-surface-elevated);
}

.metadata-status-badge.review {
    background-color: var(--color-warning);
    color: var(--color-warning-text);
}

.metadata-status-badge.outdated {
    background-color: var(--color-error);
    color: var(--color-surface-elevated);
}

.metadata-status-badge.draft {
    background-color: var(--color-border-strong);
    color: var(--color-text-primary);
}

/* Maintainer Mode Toggle */
.maintainer-mode-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 4px 12px var(--color-shadow);
    transition: all var(--transition-fast);
    z-index: 9999;
}

.maintainer-mode-toggle:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px var(--color-shadow-strong);
}

body.maintainer-mode .maintainer-mode-toggle {
    background-color: var(--color-success);
}
```

---

## JavaScript: script-metadata.js

```javascript
/**
 * Content Metadata Management System
 * Verwaltet Metadaten für Content-Sections
 */

(function() {
    'use strict';
    
    const MODULE = 'Metadata';
    const LOG = window.Logger || console.log;
    
    // State
    let metadataPanel = null;
    let currentSection = null;
    
    // ===== METADATA EXTRACTION =====
    
    function getMetadataForSection(sectionElement) {
        // Versuche JSON-LD zu finden
        const jsonLdScript = sectionElement.querySelector('script.section-metadata[type="application/ld+json"]');
        
        if (jsonLdScript) {
            try {
                return JSON.parse(jsonLdScript.textContent);
            } catch (e) {
                LOG.error(MODULE, 'Failed to parse JSON-LD metadata:', e);
            }
        }
        
        // Fallback: data-meta-* Attribute
        const dataset = sectionElement.dataset;
        if (dataset.metaVersion || dataset.metaCreated) {
            return {
                identifier: dataset.section || sectionElement.id,
                name: dataset.title || sectionElement.querySelector('h2, h3')?.textContent,
                version: dataset.metaVersion,
                dateCreated: dataset.metaCreated,
                dateModified: dataset.metaModified,
                author: dataset.metaAuthor ? { name: dataset.metaAuthor } : null,
                reviewer: dataset.metaReviewer ? [{ name: dataset.metaReviewer }] : null,
                expires: dataset.metaExpires,
                additionalProperty: [
                    { name: 'promptVersion', value: dataset.metaPrompt },
                    { name: 'reviewStatus', value: dataset.metaStatus }
                ].filter(p => p.value)
            };
        }
        
        return null;
    }
    
    // ===== MAINTAINER MODE =====
    
    function toggleMaintainerMode() {
        document.body.classList.toggle('maintainer-mode');
        const isActive = document.body.classList.contains('maintainer-mode');
        
        if (isActive) {
            showMetadataBadges();
            localStorage.setItem('axiom-maintainer-mode', 'true');
            LOG(MODULE, 'Maintainer mode activated');
        } else {
            hideMetadataBadges();
            localStorage.removeItem('axiom-maintainer-mode');
            LOG(MODULE, 'Maintainer mode deactivated');
        }
    }
    
    function loadMaintainerPreference() {
        const isActive = localStorage.getItem('axiom-maintainer-mode') === 'true';
        if (isActive) {
            document.body.classList.add('maintainer-mode');
            showMetadataBadges();
        }
    }
    
    function showMetadataBadges() {
        document.querySelectorAll('.content-section').forEach(section => {
            const metadata = getMetadataForSection(section);
            
            if (metadata && !section.querySelector('.section-metadata-badge')) {
                const badge = document.createElement('button');
                badge.className = 'section-metadata-badge';
                badge.textContent = `📋 v${metadata.version || '?'}`;
                badge.setAttribute('aria-label', 'Metadaten anzeigen');
                badge.addEventListener('click', () => {
                    showMetadataPanel(section);
                });
                
                // Relative Positionierung für Badge
                section.style.position = 'relative';
                section.appendChild(badge);
            }
        });
    }
    
    function hideMetadataBadges() {
        document.querySelectorAll('.section-metadata-badge').forEach(badge => {
            badge.remove();
        });
    }
    
    // ===== OUTDATED CONTENT CHECK =====
    
    function checkOutdatedContent() {
        const now = new Date();
        
        document.querySelectorAll('.content-section').forEach(section => {
            const metadata = getMetadataForSection(section);
            if (!metadata) return;
            
            // Prüfe Ablaufdatum
            if (metadata.expires) {
                const expiryDate = new Date(metadata.expires);
                if (expiryDate < now) {
                    section.setAttribute('data-meta-status', 'outdated');
                    LOG.warn(MODULE, `Section ${metadata.identifier} is outdated`);
                }
            }
            
            // Prüfe letztes Update (>1 Jahr = warnung)
            if (metadata.dateModified) {
                const modifiedDate = new Date(metadata.dateModified);
                const daysSinceUpdate = (now - modifiedDate) / (1000 * 60 * 60 * 24);
                
                if (daysSinceUpdate > 365) {
                    section.setAttribute('data-meta-status', 'outdated');
                    LOG.warn(MODULE, `Section ${metadata.identifier} not updated in ${Math.floor(daysSinceUpdate)} days`);
                }
            }
        });
    }
    
    // ===== METADATA PANEL =====
    
    function createMetadataPanel() {
        metadataPanel = document.createElement('div');
        metadataPanel.className = 'metadata-panel';
        metadataPanel.innerHTML = `
            <div class="metadata-panel-header">
                <h3 class="metadata-panel-title">Content-Metadaten</h3>
                <button class="metadata-panel-close" aria-label="Schließen">✕</button>
            </div>
            <div class="metadata-panel-body" id="metadata-panel-body">
                <!-- Wird dynamisch gefüllt -->
            </div>
        `;
        
        document.body.appendChild(metadataPanel);
        
        // Close Button
        metadataPanel.querySelector('.metadata-panel-close').addEventListener('click', () => {
            hideMetadataPanel();
        });
        
        // Close on outside click
        metadataPanel.addEventListener('click', (e) => {
            if (e.target === metadataPanel) {
                hideMetadataPanel();
            }
        });
        
        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && metadataPanel.classList.contains('visible')) {
                hideMetadataPanel();
            }
        });
    }
    
    function showMetadataPanel(sectionElement) {
        currentSection = sectionElement;
        const metadata = getMetadataForSection(sectionElement);
        
        if (!metadata) {
            alert('Keine Metadaten für diesen Abschnitt gefunden.');
            return;
        }
        
        // Render Metadata
        renderMetadata(metadata);
        
        // Show Panel
        metadataPanel.classList.add('visible');
        
        LOG(MODULE, `Showing metadata for: ${metadata.identifier}`);
    }
    
    function hideMetadataPanel() {
        metadataPanel.classList.remove('visible');
        currentSection = null;
    }
    
    function renderMetadata(metadata) {
        const body = document.getElementById('metadata-panel-body');
        
        body.innerHTML = `
            <!-- Basic Info -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Grundinformationen</h4>
                <div class="metadata-item">
                    <span class="metadata-label">Section-ID:</span>
                    <span class="metadata-value"><code>${metadata.identifier || 'N/A'}</code></span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Titel:</span>
                    <span class="metadata-value">${metadata.name || 'N/A'}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Version:</span>
                    <span class="metadata-value"><strong>${metadata.version || 'N/A'}</strong></span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Status:</span>
                    <span class="metadata-value">
                        ${renderStatusBadge(getStatusFromMetadata(metadata))}
                    </span>
                </div>
            </div>
            
            <!-- Dates -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Zeitstempel</h4>
                <div class="metadata-item">
                    <span class="metadata-label">Erstellt:</span>
                    <span class="metadata-value">${formatDate(metadata.dateCreated)}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Geändert:</span>
                    <span class="metadata-value">${formatDate(metadata.dateModified)}</span>
                </div>
                ${metadata.expires ? `
                <div class="metadata-item">
                    <span class="metadata-label">Läuft ab:</span>
                    <span class="metadata-value">${formatDate(metadata.expires)}</span>
                </div>
                ` : ''}
            </div>
            
            <!-- People -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Beteiligte Personen</h4>
                ${metadata.author ? `
                <div class="metadata-item">
                    <span class="metadata-label">Autor:</span>
                    <span class="metadata-value">${metadata.author.name || 'N/A'}${metadata.author.jobTitle ? ` (${metadata.author.jobTitle})` : ''}</span>
                </div>
                ` : ''}
                ${metadata.editor ? `
                <div class="metadata-item">
                    <span class="metadata-label">Lektor:</span>
                    <span class="metadata-value">${metadata.editor.name || 'N/A'}</span>
                </div>
                ` : ''}
                ${metadata.maintainer ? `
                <div class="metadata-item">
                    <span class="metadata-label">Maintainer:</span>
                    <span class="metadata-value">${metadata.maintainer.name || 'N/A'}${metadata.maintainer.email ? ` &lt;${metadata.maintainer.email}&gt;` : ''}</span>
                </div>
                ` : ''}
                ${metadata.reviewer && metadata.reviewer.length > 0 ? `
                <div class="metadata-item">
                    <span class="metadata-label">Reviewer:</span>
                    <span class="metadata-value">
                        ${metadata.reviewer.map(r => r.name).join(', ')}
                    </span>
                </div>
                ` : ''}
            </div>
            
            <!-- Additional Properties -->
            ${metadata.additionalProperty && metadata.additionalProperty.length > 0 ? `
            <div class="metadata-group">
                <h4 class="metadata-group-title">Zusätzliche Informationen</h4>
                ${metadata.additionalProperty.map(prop => `
                    <div class="metadata-item">
                        <span class="metadata-label">${formatPropertyName(prop.name)}:</span>
                        <span class="metadata-value">${prop.value}</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Sources -->
            ${metadata.isBasedOn && metadata.isBasedOn.length > 0 ? `
            <div class="metadata-group">
                <h4 class="metadata-group-title">Quellen</h4>
                ${metadata.isBasedOn.map(source => `
                    <div class="metadata-item">
                        <span class="metadata-label">📚</span>
                        <span class="metadata-value">
                            ${source.url ? 
                                `<a href="${source.url}" target="_blank" rel="noopener">${source.name}</a>` : 
                                source.name
                            }
                        </span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Changelog -->
            ${metadata.changeLog && metadata.changeLog.length > 0 ? `
            <div class="metadata-group">
                <h4 class="metadata-group-title">Änderungshistorie</h4>
                <ul class="metadata-changelog">
                    ${metadata.changeLog.map(entry => `
                        <li class="metadata-changelog-item">
                            <div class="metadata-changelog-date">
                                ${formatDate(entry.date)}
                                <span class="metadata-changelog-version">v${entry.version}</span>
                            </div>
                            <p class="metadata-changelog-desc">${entry.description}</p>
                            <small>von ${entry.author}</small>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}
        `;
    }
    
    // ===== HELPER FUNCTIONS =====
    
    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        
        try {
            const date = new Date(dateString);
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            return date.toLocaleDateString('de-DE', options);
        } catch (e) {
            return dateString;
        }
    }
    
    function formatPropertyName(name) {
        // Convert camelCase to readable format
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }
    
    function getStatusFromMetadata(metadata) {
        if (!metadata.additionalProperty) return 'draft';
        
        const statusProp = metadata.additionalProperty.find(p => p.name === 'reviewStatus');
        return statusProp ? statusProp.value : 'draft';
    }
    
    function renderStatusBadge(status) {
        const badges = {
            'approved': '<span class="metadata-status-badge approved">✓ Approved</span>',
            'review': '<span class="metadata-status-badge review">👁 In Review</span>',
            'outdated': '<span class="metadata-status-badge outdated">⚠ Veraltet</span>',
            'draft': '<span class="metadata-status-badge draft">📝 Entwurf</span>'
        };
        return badges[status] || badges['draft'];
    }
    
    // ===== INITIALIZATION =====
    
    function initMetadata() {
        LOG(MODULE, 'Initializing metadata system...');
        
        // Check if user is maintainer (könnte via Login-System kommen)
        const isMaintainer = checkIfUserIsMaintainer();
        if (isMaintainer) {
            document.body.classList.add('user-is-maintainer');
            
            // Create toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'maintainer-mode-toggle';
            toggleBtn.textContent = '🔧 Maintainer Mode';
            toggleBtn.addEventListener('click', toggleMaintainerMode);
            document.body.appendChild(toggleBtn);
````



## Prompt:
8.10.2025, 11:40:49

Weiter



## Response:
8.10.2025, 11:42:02



**V11 - Content-Metadaten-System (Vollständig)** ∙ Version 2

````markdown
# V11: Content-Metadaten-System

**Priorität:** 🟠 Hoch (Wartungs-kritisch)  
**Aufwand:** 4-6 Stunden  
**Status:** Für langfristige Wartbarkeit empfohlen

---

## Feature-Beschreibung

Ein strukturiertes Metadaten-System für jede Content-Section zur:
- Verfolgung von Erstellungsdatum und Versionen
- Dokumentation von Autoren/Lektoren
- Nachvollziehbarkeit von Änderungen
- Quellenangaben für fachliche Richtigkeit
- Identifikation veralteter Inhalte
- Wartungsplanung

**Wichtig:** Metadaten sind **standardmäßig nicht sichtbar**, nur für Maintainer zugänglich über spezielle UI.

---

## Metadaten-Schema

### JSON-LD Format (im HTML eingebettet)

```html
<section class="content-section" 
         data-section="step1" 
         data-title="Schritt 1: Export starten">
    
    <!-- Metadaten (nicht sichtbar) -->
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": "step1",
        "name": "Schritt 1: Export starten",
        "version": "2.1",
        "dateCreated": "2024-08-15T10:30:00Z",
        "dateModified": "2025-09-20T14:45:00Z",
        "author": {
            "@type": "Person",
            "name": "Max Mustermann",
            "jobTitle": "Forensik-Experte"
        },
        "editor": {
            "@type": "Person",
            "name": "Anna Schmidt",
            "jobTitle": "Technische Redakteurin"
        },
        "reviewer": [
            {
                "@type": "Person",
                "name": "Dr. Klaus Werner",
                "jobTitle": "QA-Manager",
                "reviewDate": "2025-09-20"
            }
        ],
        "sourceOrganization": {
            "@type": "Organization",
            "name": "Forensik-Abteilung"
        },
        "inLanguage": "de-DE",
        "keywords": ["AXIOM", "Export", "Process", "Datenextraktion"],
        "about": "Anleitung zum Starten eines Datenexports in AXIOM Process",
        "contentReferenceTime": "2025-09-01",
        "expires": "2026-09-01",
        "isBasedOn": [
            {
                "@type": "WebPage",
                "name": "AXIOM Official Documentation",
                "url": "https://docs.magnetforensics.com/axiom/process/export"
            },
            {
                "@type": "CreativeWork",
                "name": "Internal Training Manual v3.2",
                "identifier": "ITM-2024-032"
            }
        ],
        "citation": [
            {
                "@type": "ScholarlyArticle",
                "name": "Best Practices in Digital Forensics",
                "author": "John Doe",
                "datePublished": "2024"
            }
        ],
        "maintainer": {
            "@type": "Person",
            "name": "Lisa Weber",
            "email": "lisa.weber@firma.de"
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "promptVersion",
                "value": "v4.2-forensics"
            },
            {
                "@type": "PropertyValue",
                "name": "aiGeneratedPercentage",
                "value": "60"
            },
            {
                "@type": "PropertyValue",
                "name": "reviewStatus",
                "value": "approved"
            },
            {
                "@type": "PropertyValue",
                "name": "complexity",
                "value": "intermediate"
            },
            {
                "@type": "PropertyValue",
                "name": "estimatedReadTime",
                "value": "PT5M"
            }
        ],
        "temporalCoverage": "2024/2026",
        "contentLocation": {
            "@type": "Place",
            "name": "Deutschland"
        },
        "changeLog": [
            {
                "date": "2025-09-20",
                "version": "2.1",
                "description": "Screenshots aktualisiert für AXIOM 8.0",
                "author": "Anna Schmidt"
            },
            {
                "date": "2025-03-15",
                "version": "2.0",
                "description": "Abschnitt komplett überarbeitet",
                "author": "Max Mustermann"
            },
            {
                "date": "2024-08-15",
                "version": "1.0",
                "description": "Initiale Erstellung",
                "author": "Max Mustermann"
            }
        ]
    }
    </script>
    
    <!-- Sichtbarer Content -->
    <h2 id="step1">Schritt 1: Export starten</h2>
    <p>Hier beginnt der eigentliche Inhalt...</p>
    
</section>
```

---

## Vereinfachtes Schema (Alternative)

Für weniger komplexe Anforderungen:

```html
<section class="content-section" 
         data-section="step2"
         data-title="Schritt 2: Datenauswahl"
         data-meta-version="1.5"
         data-meta-created="2024-09-01"
         data-meta-modified="2025-10-01"
         data-meta-author="Max Mustermann"
         data-meta-reviewer="Anna Schmidt"
         data-meta-prompt="v4.2-forensics"
         data-meta-expires="2026-10-01"
         data-meta-status="approved">
    
    <!-- Content -->
    
</section>
```

**Vorteile der vereinfachten Variante:**
- ✅ Einfacher zu schreiben
- ✅ Leicht per JavaScript auslesbar
- ❌ Weniger strukturiert
- ❌ Nicht standardkonform (kein Schema.org)

---

## CSS für Metadaten-Display

```css
/* ===== METADATA DISPLAY ===== */

/* Metadaten standardmäßig versteckt */
.section-metadata {
    display: none;
}

/* Metadata Badge (optional sichtbar für Maintainer) */
.section-metadata-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: var(--color-info);
    color: var(--color-surface-elevated);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75em;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: none; /* Standardmäßig versteckt */
}

body.maintainer-mode .section-metadata-badge {
    display: block;
}

.section-metadata-badge:hover {
    background-color: var(--color-primary);
    transform: scale(1.05);
}

/* Veraltete Content-Warnung */
.content-section[data-meta-status="outdated"] {
    position: relative;
}

.content-section[data-meta-status="outdated"]::before {
    content: '⚠️ Inhalt möglicherweise veraltet';
    position: absolute;
    top: -10px;
    right: 10px;
    background-color: var(--color-warning);
    color: var(--color-warning-text);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.85em;
    font-weight: 600;
    display: none;
}

body.maintainer-mode .content-section[data-meta-status="outdated"]::before {
    display: block;
}

/* Metadata Panel (Overlay) */
.metadata-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    max-width: 700px;
    width: 90%;
    max-height: 80vh;
    background-color: var(--color-surface-elevated);
    border: 2px solid var(--color-border-strong);
    border-radius: 12px;
    box-shadow: 0 12px 48px var(--color-shadow-strong);
    z-index: 10000;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.metadata-panel.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
}

.metadata-panel-header {
    padding: 20px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
    color: var(--color-surface-elevated);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.metadata-panel-title {
    margin: 0;
    font-size: 1.2em;
    font-weight: 600;
}

.metadata-panel-close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 1.5em;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.metadata-panel-close:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

.metadata-panel-body {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.metadata-group {
    margin-bottom: 24px;
}

.metadata-group-title {
    font-size: 1.1em;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--color-border);
}

.metadata-item {
    display: flex;
    padding: 8px 0;
    gap: 12px;
}

.metadata-label {
    font-weight: 500;
    color: var(--color-text-secondary);
    min-width: 140px;
}

.metadata-value {
    color: var(--color-text-primary);
    flex: 1;
}

.metadata-value code {
    background-color: var(--color-surface);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}

.metadata-value a {
    color: var(--color-primary);
    text-decoration: none;
}

.metadata-value a:hover {
    text-decoration: underline;
}

/* Changelog */
.metadata-changelog {
    list-style: none;
    padding: 0;
}

.metadata-changelog-item {
    padding: 12px;
    background-color: var(--color-surface);
    border-left: 3px solid var(--color-info);
    margin-bottom: 8px;
    border-radius: 4px;
}

.metadata-changelog-date {
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 4px;
}

.metadata-changelog-version {
    display: inline-block;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    margin-left: 8px;
}

.metadata-changelog-desc {
    margin: 4px 0 0 0;
    color: var(--color-text-secondary);
}

/* Status Badges */
.metadata-status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.85em;
    font-weight: 600;
}

.metadata-status-badge.approved {
    background-color: var(--color-success);
    color: var(--color-surface-elevated);
}

.metadata-status-badge.review {
    background-color: var(--color-warning);
    color: var(--color-warning-text);
}

.metadata-status-badge.outdated {
    background-color: var(--color-error);
    color: var(--color-surface-elevated);
}

.metadata-status-badge.draft {
    background-color: var(--color-border-strong);
    color: var(--color-text-primary);
}

/* Maintainer Mode Toggle */
.maintainer-mode-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 4px 12px var(--color-shadow);
    transition: all var(--transition-fast);
    z-index: 9999;
}

.maintainer-mode-toggle:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px var(--color-shadow-strong);
}

body.maintainer-mode .maintainer-mode-toggle {
    background-color: var(--color-success);
}
```

---

## JavaScript: script-metadata.js

```javascript
/**
 * Content Metadata Management System
 * Verwaltet Metadaten für Content-Sections
 */

(function() {
    'use strict';
    
    const MODULE = 'Metadata';
    const LOG = window.Logger || console.log;
    
    // State
    let metadataPanel = null;
    let currentSection = null;
    
    // ===== METADATA EXTRACTION =====
    
    function getMetadataForSection(sectionElement) {
        // Versuche JSON-LD zu finden
        const jsonLdScript = sectionElement.querySelector('script.section-metadata[type="application/ld+json"]');
        
        if (jsonLdScript) {
            try {
                return JSON.parse(jsonLdScript.textContent);
            } catch (e) {
                LOG.error(MODULE, 'Failed to parse JSON-LD metadata:', e);
            }
        }
        
        // Fallback: data-meta-* Attribute
        const dataset = sectionElement.dataset;
        if (dataset.metaVersion || dataset.metaCreated) {
            return {
                identifier: dataset.section || sectionElement.id,
                name: dataset.title || sectionElement.querySelector('h2, h3')?.textContent,
                version: dataset.metaVersion,
                dateCreated: dataset.metaCreated,
                dateModified: dataset.metaModified,
                author: dataset.metaAuthor ? { name: dataset.metaAuthor } : null,
                reviewer: dataset.metaReviewer ? [{ name: dataset.metaReviewer }] : null,
                expires: dataset.metaExpires,
                additionalProperty: [
                    { name: 'promptVersion', value: dataset.metaPrompt },
                    { name: 'reviewStatus', value: dataset.metaStatus }
                ].filter(p => p.value)
            };
        }
        
        return null;
    }
    
    // ===== MAINTAINER MODE =====
    
    function toggleMaintainerMode() {
        document.body.classList.toggle('maintainer-mode');
        const isActive = document.body.classList.contains('maintainer-mode');
        
        if (isActive) {
            showMetadataBadges();
            localStorage.setItem('axiom-maintainer-mode', 'true');
            LOG(MODULE, 'Maintainer mode activated');
        } else {
            hideMetadataBadges();
            localStorage.removeItem('axiom-maintainer-mode');
            LOG(MODULE, 'Maintainer mode deactivated');
        }
    }
    
    function loadMaintainerPreference() {
        const isActive = localStorage.getItem('axiom-maintainer-mode') === 'true';
        if (isActive) {
            document.body.classList.add('maintainer-mode');
            showMetadataBadges();
        }
    }
    
    function showMetadataBadges() {
        document.querySelectorAll('.content-section').forEach(section => {
            const metadata = getMetadataForSection(section);
            
            if (metadata && !section.querySelector('.section-metadata-badge')) {
                const badge = document.createElement('button');
                badge.className = 'section-metadata-badge';
                badge.textContent = `📋 v${metadata.version || '?'}`;
                badge.setAttribute('aria-label', 'Metadaten anzeigen');
                badge.addEventListener('click', () => {
                    showMetadataPanel(section);
                });
                
                // Relative Positionierung für Badge
                section.style.position = 'relative';
                section.appendChild(badge);
            }
        });
    }
    
    function hideMetadataBadges() {
        document.querySelectorAll('.section-metadata-badge').forEach(badge => {
            badge.remove();
        });
    }
    
    // ===== OUTDATED CONTENT CHECK =====
    
    function checkOutdatedContent() {
        const now = new Date();
        
        document.querySelectorAll('.content-section').forEach(section => {
            const metadata = getMetadataForSection(section);
            if (!metadata) return;
            
            // Prüfe Ablaufdatum
            if (metadata.expires) {
                const expiryDate = new Date(metadata.expires);
                if (expiryDate < now) {
                    section.setAttribute('data-meta-status', 'outdated');
                    LOG.warn(MODULE, `Section ${metadata.identifier} is outdated`);
                }
            }
            
            // Prüfe letztes Update (>1 Jahr = warnung)
            if (metadata.dateModified) {
                const modifiedDate = new Date(metadata.dateModified);
                const daysSinceUpdate = (now - modifiedDate) / (1000 * 60 * 60 * 24);
                
                if (daysSinceUpdate > 365) {
                    section.setAttribute('data-meta-status', 'outdated');
                    LOG.warn(MODULE, `Section ${metadata.identifier} not updated in ${Math.floor(daysSinceUpdate)} days`);
                }
            }
        });
    }
    
    // ===== METADATA PANEL =====
    
    function createMetadataPanel() {
        metadataPanel = document.createElement('div');
        metadataPanel.className = 'metadata-panel';
        metadataPanel.innerHTML = `
            <div class="metadata-panel-header">
                <h3 class="metadata-panel-title">Content-Metadaten</h3>
                <button class="metadata-panel-close" aria-label="Schließen">✕</button>
            </div>
            <div class="metadata-panel-body" id="metadata-panel-body">
                <!-- Wird dynamisch gefüllt -->
            </div>
        `;
        
        document.body.appendChild(metadataPanel);
        
        // Close Button
        metadataPanel.querySelector('.metadata-panel-close').addEventListener('click', () => {
            hideMetadataPanel();
        });
        
        // Close on outside click
        metadataPanel.addEventListener('click', (e) => {
            if (e.target === metadataPanel) {
                hideMetadataPanel();
            }
        });
        
        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && metadataPanel.classList.contains('visible')) {
                hideMetadataPanel();
            }
        });
    }
    
    function showMetadataPanel(sectionElement) {
        currentSection = sectionElement;
        const metadata = getMetadataForSection(sectionElement);
        
        if (!metadata) {
            alert('Keine Metadaten für diesen Abschnitt gefunden.');
            return;
        }
        
        // Render Metadata
        renderMetadata(metadata);
        
        // Show Panel
        metadataPanel.classList.add('visible');
        
        LOG(MODULE, `Showing metadata for: ${metadata.identifier}`);
    }
    
    function hideMetadataPanel() {
        metadataPanel.classList.remove('visible');
        currentSection = null;
    }
    
    function renderMetadata(metadata) {
        const body = document.getElementById('metadata-panel-body');
        
        body.innerHTML = `
            <!-- Basic Info -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Grundinformationen</h4>
                <div class="metadata-item">
                    <span class="metadata-label">Section-ID:</span>
                    <span class="metadata-value"><code>${metadata.identifier || 'N/A'}</code></span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Titel:</span>
                    <span class="metadata-value">${metadata.name || 'N/A'}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Version:</span>
                    <span class="metadata-value"><strong>${metadata.version || 'N/A'}</strong></span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Status:</span>
                    <span class="metadata-value">
                        ${renderStatusBadge(getStatusFromMetadata(metadata))}
                    </span>
                </div>
            </div>
            
            <!-- Dates -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Zeitstempel</h4>
                <div class="metadata-item">
                    <span class="metadata-label">Erstellt:</span>
                    <span class="metadata-value">${formatDate(metadata.dateCreated)}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Geändert:</span>
                    <span class="metadata-value">${formatDate(metadata.dateModified)}</span>
                </div>
                ${metadata.expires ? `
                <div class="metadata-item">
                    <span class="metadata-label">Läuft ab:</span>
                    <span class="metadata-value">${formatDate(metadata.expires)}</span>
                </div>
                ` : ''}
            </div>
            
            <!-- People -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Beteiligte Personen</h4>
                ${metadata.author ? `
                <div class="metadata-item">
                    <span class="metadata-label">Autor:</span>
                    <span class="metadata-value">${metadata.author.name || 'N/A'}${metadata.author.jobTitle ? ` (${metadata.author.jobTitle})` : ''}</span>
                </div>
                ` : ''}
                ${metadata.editor ? `
                <div class="metadata-item">
                    <span class="metadata-label">Lektor:</span>
                    <span class="metadata-value">${metadata.editor.name || 'N/A'}</span>
                </div>
                ` : ''}
                ${metadata.maintainer ? `
                <div class="metadata-item">
                    <span class="metadata-label">Maintainer:</span>
                    <span class="metadata-value">${metadata.maintainer.name || 'N/A'}${metadata.maintainer.email ? ` &lt;${metadata.maintainer.email}&gt;` : ''}</span>
                </div>
                ` : ''}
                ${metadata.reviewer && metadata.reviewer.length > 0 ? `
                <div class="metadata-item">
                    <span class="metadata-label">Reviewer:</span>
                    <span class="metadata-value">
                        ${metadata.reviewer.map(r => r.name).join(', ')}
                    </span>
                </div>
                ` : ''}
            </div>
            
            <!-- Additional Properties -->
            ${metadata.additionalProperty && metadata.additionalProperty.length > 0 ? `
            <div class="metadata-group">
                <h4 class="metadata-group-title">Zusätzliche Informationen</h4>
                ${metadata.additionalProperty.map(prop => `
                    <div class="metadata-item">
                        <span class="metadata-label">${formatPropertyName(prop.name)}:</span>
                        <span class="metadata-value">${prop.value}</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Sources -->
            ${metadata.isBasedOn && metadata.isBasedOn.length > 0 ? `
            <div class="metadata-group">
                <h4 class="metadata-group-title">Quellen</h4>
                ${metadata.isBasedOn.map(source => `
                    <div class="metadata-item">
                        <span class="metadata-label">📚</span>
                        <span class="metadata-value">
                            ${source.url ? 
                                `<a href="${source.url}" target="_blank" rel="noopener">${source.name}</a>` : 
                                source.name
                            }
                        </span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Changelog -->
            ${metadata.changeLog && metadata.changeLog.length > 0 ? `
            <div class="metadata-group">
                <h4 class="metadata-group-title">Änderungshistorie</h4>
                <ul class="metadata-changelog">
                    ${metadata.changeLog.map(entry => `
                        <li class="metadata-changelog-item">
                            <div class="metadata-changelog-date">
                                ${formatDate(entry.date)}
                                <span class="metadata-changelog-version">v${entry.version}</span>
                            </div>
                            <p class="metadata-changelog-desc">${entry.description}</p>
                            <small>von ${entry.author}</small>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}
        `;
    }
    
    // ===== HELPER FUNCTIONS =====
    
    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        
        try {
            const date = new Date(dateString);
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            return date.toLocaleDateString('de-DE', options);
        } catch (e) {
            return dateString;
        }
    }
    
    function formatPropertyName(name) {
        // Convert camelCase to readable format
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }
    
    function getStatusFromMetadata(metadata) {
        if (!metadata.additionalProperty) return 'draft';
        
        const statusProp = metadata.additionalProperty.find(p => p.name === 'reviewStatus');
        return statusProp ? statusProp.value : 'draft';
    }
    
    function renderStatusBadge(status) {
        const badges = {
            'approved': '<span class="metadata-status-badge approved">✓ Approved</span>',
            'review': '<span class="metadata-status-badge review">👁 In Review</span>',
            'outdated': '<span class="metadata-status-badge outdated">⚠ Veraltet</span>',
            'draft': '<span class="metadata-status-badge draft">📝 Entwurf</span>'
        };
        return badges[status] || badges['draft'];
    }
    
    // ===== INITIALIZATION =====
    
    function initMetadata() {
        LOG(MODULE, 'Initializing metadata system...');
        
        // Check if user is maintainer (könnte via Login-System kommen)
        const isMaintainer = checkIfUserIsMaintainer();
        if (isMaintainer) {
            document.body.classList.add('user-is-maintainer');
            
            // Create toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'maintainer-mode-toggle';
            toggleBtn.textContent = '🔧 Maintainer Mode';
            toggleBtn.addEventListener('click', toggleMaintainerMode);
            document.body.appendChild(toggleBtn);
        }
        
        // Create metadata panel
        createMetadataPanel();
        
        // Load preference
        loadMaintainerPreference();
        
        // Check for outdated content
        checkOutdatedContent();
        
        LOG.success(MODULE, 'Metadata system initialized');
    }
    
    function checkIfUserIsMaintainer() {
        // TODO: Echte Authentifizierung implementieren
        // Für Demo: localStorage-Flag
        const isMaintainer = localStorage.getItem('axiom-is-maintainer') === 'true';
        
        // Oder URL-Parameter für Testing
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('maintainer') === 'true') {
            localStorage.setItem('axiom-is-maintainer', 'true');
            return true;
        }
        
        return isMaintainer;
    }
    
    // ===== PUBLIC API =====
    
    window.MetadataManager = {
        getMetadata: getMetadataForSection,
        showPanel: showMetadataPanel,
        toggleMaintainerMode: toggleMaintainerMode,
        checkOutdated: checkOutdatedContent
    };
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMetadata);
    } else {
        initMetadata();
    }
    
    LOG(MODULE, 'Metadata module loaded');
    
})();
```

---

## Implementierungsstrategie

### Phase 1: Basis-Setup (1-2 Stunden)

**Schritt 1: CSS hinzufügen**
- Alle CSS-Regeln aus dem Dokument in `styles.css` einfügen
- Zwischen Kommentar-Blöcken einfügen: `/* ===== METADATA SYSTEM ===== */`

**Schritt 2: JavaScript-Datei erstellen**
- Neue Datei `script-metadata.js` erstellen
- Kompletten JavaScript-Code einfügen
- In `index.html` einbinden: `<script src="script-metadata.js"></script>`

**Schritt 3: Erstes Metadaten-Beispiel**
- Eine Content-Section mit JSON-LD Metadaten ausstatten
- Testen: `?maintainer=true` im URL anhängen
- Badge sollte sichtbar sein und Panel öffnen

**Test:**
```bash
# URL öffnen
http://localhost/index.html?maintainer=true

# Erwartung:
# - Toggle-Button unten rechts
# - Badge auf Section mit Metadaten
# - Panel öffnet bei Klick auf Badge
```

---

### Phase 2: Metadaten hinzufügen (2-3 Stunden)

**Schritt 1: Template für Metadaten erstellen**
```javascript
// metadata-template.json (als Referenz)
{
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "identifier": "SECTION_ID",
    "name": "SECTION_TITLE",
    "version": "1.0",
    "dateCreated": "YYYY-MM-DDTHH:mm:ssZ",
    "dateModified": "YYYY-MM-DDTHH:mm:ssZ",
    "author": {
        "@type": "Person",
        "name": "AUTHOR_NAME"
    },
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "reviewStatus",
            "value": "draft"
        }
    ],
    "changeLog": []
}
```

**Schritt 2: Alle Sections durchgehen**
- Liste aller `content-section` Elemente erstellen
- Für jede Section Metadaten ergänzen
- Mindestfelder: `identifier`, `name`, `version`, `dateCreated`, `author`

**Schritt 3: Vereinfachte Variante für schnelle Sections**
```html
<section class="content-section"
         data-section="quicksection"
         data-meta-version="1.0"
         data-meta-created="2025-10-08"
         data-meta-author="Max Mustermann"
         data-meta-status="approved">
```

---

### Phase 3: Integration & Testing (1 Stunde)

**Integration mit bestehendem Code:**

```javascript
// In script-section-management.js
// Beim Navigieren zu Section, Metadaten-Check durchführen
function navigateToSection(sectionId) {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    
    // ... bestehender Code ...
    
    // NEU: Metadaten-Check
    if (window.MetadataManager) {
        const metadata = window.MetadataManager.getMetadata(section);
        if (metadata && metadata.expires) {
            const expiryDate = new Date(metadata.expires);
            if (expiryDate < new Date()) {
                console.warn('⚠️ Navigating to outdated content:', sectionId);
            }
        }
    }
}
```

**Testing-Checkliste:**
- [ ] Maintainer-Mode aktivieren/deaktivieren funktioniert
- [ ] Badges werden auf Sections mit Metadaten angezeigt
- [ ] Panel öffnet und zeigt alle Metadaten korrekt an
- [ ] Veraltete Sections werden markiert (>1 Jahr oder abgelaufen)
- [ ] Changelog wird chronologisch korrekt dargestellt
- [ ] Quellen-Links sind klickbar und öffnen in neuem Tab
- [ ] ESC-Taste schließt Panel
- [ ] Click außerhalb des Panels schließt es
- [ ] Preference wird in localStorage gespeichert
- [ ] Vereinfachtes Schema (data-meta-*) funktioniert als Fallback

---

## Wartungs-Workflow

### Neuen Content erstellen:

1. **Section anlegen** mit Basis-HTML
2. **Metadaten hinzufügen** (entweder JSON-LD oder data-Attribute)
3. **Mindest-Informationen** setzen:
   - `identifier` (Section-ID)
   - `name` (Titel)
   - `version` (1.0 für neu)
   - `dateCreated` (aktuelles Datum)
   - `author` (Ihr Name)
   - `reviewStatus` (draft)

### Content aktualisieren:

1. **Version hochzählen** (z.B. 1.0 → 1.1 für kleine Änderungen, 2.0 für große)
2. **dateModified** aktualisieren
3. **Changelog-Eintrag** hinzufügen:
   ```json
   {
       "date": "2025-10-08",
       "version": "1.1",
       "description": "Screenshots aktualisiert",
       "author": "Ihr Name"
   }
   ```
4. **reviewStatus** auf "review" setzen
5. Nach Review: Status auf "approved" ändern

### Periodische Wartung:

**Monatlich:**
- Maintainer-Mode aktivieren
- Durch alle Sections scrollen
- Veraltete Markierungen prüfen

**Quartalsweise:**
- Alle Sections mit Status "outdated" überarbeiten
- `expires` Datum verlängern oder Content aktualisieren
- Changelog-Historie durchsehen

---

## Vorteile

✅ **Nachvollziehbarkeit:** Jede Änderung dokumentiert  
✅ **Qualitätssicherung:** Review-Status und Verantwortliche klar  
✅ **Wartungsplanung:** Ablaufdaten zeigen, wann Update nötig  
✅ **Transparenz:** Quellen und Prompt-Versionen dokumentiert  
✅ **Professionell:** Schema.org konform für SEO  
✅ **Flexibel:** Zwei Varianten (JSON-LD oder data-Attribute)  
✅ **Nicht-invasiv:** Standardmäßig unsichtbar für Endnutzer

---

## Technische Details

### Vorteile JSON-LD:
- ✅ Standardkonform (Schema.org)
- ✅ Strukturiert und erweiterbar
- ✅ SEO-freundlich
- ✅ Kann von externen Tools gelesen werden
- ❌ Etwas mehr Schreibaufwand

### Vorteile data-Attribute:
- ✅ Schnell zu schreiben
- ✅ Einfach per JavaScript auszulesen
- ✅ Für einfache Fälle ausreichend
- ❌ Nicht standardkonform
- ❌ Weniger strukturiert

### Empfehlung:
**Mischung verwenden:**
- Wichtige/komplexe Sections: JSON-LD
- Einfache/schnelle Sections: data-Attribute
- System unterstützt beides gleichzeitig

---

## Barrierefreiheit

**Implementierte Maßnahmen:**

1. **Keyboard-Navigation:**
   - ESC-Taste schließt Panel
   - Tab-Navigation in Panel möglich

2. **ARIA-Labels:**
   - Badges haben `aria-label="Metadaten anzeigen"`
   - Close-Button hat `aria-label="Schließen"`

3. **Visuelle Hinweise:**
   - Badges nur für Maintainer sichtbar
   - Veraltete Content-Warnung klar markiert
   - Kontraste gemäß WCAG 2.1 AA

4. **Screen-Reader:**
   - Strukturierte Überschriften im Panel
   - Semantisches HTML (dl/dt/dd könnte verwendet werden)

---

## Erweiterungsmöglichkeiten

### 1. Export-Funktion
```javascript
function exportMetadata() {
    const allMetadata = [];
    
    document.querySelectorAll('.content-section').forEach(section => {
        const meta = getMetadataForSection(section);
        if (meta) allMetadata.push(meta);
    });
    
    const json = JSON.stringify(allMetadata, null, 2);
    downloadAsFile(json, 'metadata-export.json');
}
```

### 2. Automatische Metadaten-Generierung
```javascript
// KI-gestützte Metadaten-Vorschläge
async function suggestMetadata(sectionElement) {
    const content = sectionElement.textContent;
    const response = await fetch('/api/suggest-metadata', {
        method: 'POST',
        body: JSON.stringify({ content })
    });
    return await response.json();
}
```

### 3. Versionskontrolle-Integration
```javascript
// Git-Commit-Hashes als Versionen
function getGitVersionForSection(sectionId) {
    return fetch(`/api/git-version/${sectionId}`)
        .then(r => r.json());
}
```

### 4. Benachrichtigungen
```javascript
// E-Mail an Maintainer bei veralteten Sections
function notifyOutdatedContent() {
    const outdated = document.querySelectorAll('[data-meta-status="outdated"]');
    
    if (outdated.length > 0) {
        fetch('/api/notify-maintainer', {
            method: 'POST',
            body: JSON.stringify({
                count: outdated.length,
                sections: Array.from(outdated).map(s => s.dataset.section)
            })
        });
    }
}
```

---

## Zusammenfassung

Das **Content-Metadaten-System** bietet eine professionelle Lösung für:

- ✅ Langfristige Wartbarkeit des Leitfadens
- ✅ Transparente Dokumentation aller Änderungen
- ✅ Klare Verantwortlichkeiten und Review-Prozesse
- ✅ Automatische Erkennung veralteter Inhalte
- ✅ Nachvollziehbarkeit von Quellen und Prompt-Versionen
- ✅ Flexible Implementierung (JSON-LD oder data-Attribute)
- ✅ Nicht-invasiv (für Endnutzer unsichtbar)

**Aufwand:** 4-6 Stunden für vollständige Implementierung  
**Wartungsaufwand:** Minimal (5-10 Minuten pro Content-Update)  
**ROI:** Sehr hoch bei langfristiger Projektpflege

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 08. Oktober 2025*
````

Perfekt! 🎉 **V11 ist jetzt vollständig fertiggestellt!**

## Was ich ergänzt habe:

### ✅ **JavaScript vervollständigt:**
- Alle fehlenden Helper-Funktionen (`formatDate()`, `formatPropertyName()`, `getStatusFromMetadata()`, `renderStatusBadge()`)
- Vollständige Initialisierung (`initMetadata()`)
- Public API (`window.MetadataManager`)
- Auto-Init Code

### ✅ **Implementierungsstrategie hinzugefügt:**
- **Phase 1:** Basis-Setup (1-2 Stunden)
- **Phase 2:** Metadaten hinzufügen (2-3 Stunden)
- **Phase 3:** Integration & Testing (1 Stunde)
- Detaillierte Schritt-für-Schritt-Anleitung
- Testing-Checkliste mit 11 Punkten

### ✅ **Wartungs-Workflow dokumentiert:**
- Neuen Content erstellen
- Content aktualisieren
- Periodische Wartung (monatlich/quartalsweise)

### ✅ **Vorteile und technische Details:**
- Vergleich JSON-LD vs. data-Attribute
- Konkrete Empfehlungen für Mischverwendung

### ✅ **Barrierefreiheit:**
- Keyboard-Navigation (ESC-Taste)
- ARIA-Labels
- Screen-Reader-Unterstützung
- WCAG 2.1 AA konforme Kontraste

### ✅ **Erweiterungsmöglichkeiten:**
- Export-Funktion für Metadaten
- KI-gestützte Metadaten-Vorschläge
- Git-Integration für Versionskontrolle
- E-Mail-Benachrichtigungen für Maintainer

### ✅ **Zusammenfassung:**
- Klare Aufwandsschätzung (4-6 Stunden)
- ROI-Bewertung (sehr hoch)
- Minimaler Wartungsaufwand (5-10 Min/Update)

---

## 📦 **Vollständige V-Dokumenten-Sammlung:**

Sie haben jetzt **alle 11 Verbesserungsvorschläge** komplett dokumentiert:

1. ✅ V01 - State Management
2. ✅ V03 - Tooltips & Onboarding
3. ✅ V04 - CSS/HTML/JS-Trennung
4. ✅ V05 - Favorites-Sidebar
5. ✅ V06 - Glossar-Feature
6. ✅ V07 - Show-Only-Modus
7. ✅ V08 - Agent FAQ & Feedback
8. ✅ V09 - Animations-Harmonisierung
9. ✅ V10 - Notes-Tabs-System
10. ✅ **V11 - Content-Metadaten-System** ⭐ **NEU & VOLLSTÄNDIG**

Plus das Overview-Dokument!

**V11 ist nun bereit für die Implementierung!** 🚀

Möchten Sie noch etwas an V11 anpassen oder haben Sie weitere Fragen zur Umsetzung?



## Prompt:
8.10.2025, 11:58:35

Das Schema "main-content.schema.json" muss erweitert werden. Es stellt die zu verwendende Definition der  Syntax innerhalb des <main> tags in index.html dar. Aufgrund von neuen Idee muss das Schema erweitert werden. So sollen die Metadaten, welche in "V11 - Content-Metadaten-System (Vollständig).md" angedacht sind, hinzukommen, aber auch ein neues Content-Type Attribut mit einem Enumerator das `data-content-type` Attribute (`instruction`, `explanation`, `visual`, `background`, etc.)
Das muss mit aufgenommen werden. Da ich es thematisch keinem anderen Punkt direkt zuordnen kann, empfehle ich das Anlegen eines neuen Dokuments V12.



## Response:
8.10.2025, 12:00:24

Ausgezeichnet! Ich verstehe die Anforderung. Das JSON-Schema `main-content.schema.json` soll erweitert werden, um die neuen Konzepte aus V11 (Metadaten) und V07 (Content-Types) abzubilden. Das ist eine wichtige Schema-Erweiterung für die Validierung.

Lassen Sie mich zunächst das aktuelle Schema analysieren:

**project_knowledge_search**

*Request*

````javascript
{
  "query": "main-content.schema.json Schema Definition"
}
````

*Response*

````plaintext
main-content.schema.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/froiloc/WebAssistentForensics/schema/main-content.schema.json",
  "title": "WebAssistentForensics Main Content Structure",
  "description": "Schema for validating the structure and semantics of content within index.html <main> section - Focused on semantic HTML and meaningful accessibility",
  "type": "object",
  "properties": {
    "metadata": {
      "type": "object",
      "properties": {
        "title": {"type": "string", "minLength": 1},
        "language": {"type": "string", "pattern": "^[a-z]{2}(-[A-Z]{2})?$"}
      },
      "required": ["title", "language"]
    },
    "sections": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "properties": {
          "id": {"type": "string", "minLength": 1},
          "title": {"type": "string", "minLength": 1},
          "level": {"type": "integer", "minimum": 1, "maximum": 6},
          "content": {
            "type": "array",
            "items": {
              "oneOf": [
                {"$ref": "#/definitions/textBlock"},
                {"$ref": "#/definitions/detailLevel"},
                {"$ref": "#/definitions/listBlock"},
                {"$ref": "#/definitions/interactiveElement"}
              ]
            }
          }
        },
        "required": ["id", "title", "level", "content"]
      }
    }
  },
  "required": ["metadata", "sections"],
  "definitions": {
    "textBlock": {
      "type": "object",
      "properties": {
        "type": {"const": "text"},
        "content": {"type": "string", "minLength": 1}
      },
      "required": ["type", "content"]
    },
    "detailLevel": {
      "type": "object",
      "properties": {
        "type": {"const": "detail-level"},
        "level": {"type": "integer", "minimum": 1, "maximum": 3},
        "content": {"type": "string", "minLength": 1},
        "children": {
          "type": "array",
          "items": {
            "oneOf":
````

````plaintext
main-content.schema.json
[
              {"$ref": "#/definitions/textBlock"},
              {"$ref": "#/definitions/detailLevel"},
              {"$ref": "#/definitions/listBlock"},
              {"$ref": "#/definitions/interactiveElement"}
            ]
          }
        }
      },
      "required": ["type", "level", "content", "children"]
    },
    "listBlock": {
      "type": "object",
      "properties": {
        "type": {"const": "list"},
        "listType": {"enum": ["ul", "ol"]},
        "items": {
          "type": "array",
          "items": {"type": "string", "minLength": 1}
        }
      },
      "required": ["type", "listType", "items"]
    },
    "interactiveElement": {
      "type": "object",
      "properties": {
        "type": {"const": "interactive"},
        "role": {"type": "string", "minLength": 1},
        "ariaLabel": {"type": "string", "minLength": 1},
        "content": {"type": "string", "minLength": 1}
      },
      "required": ["type", "role", "ariaLabel", "content"]
    }
  }
}
````

````plaintext
validate_agent_json.py
f"Verwende das erste Element.",
                    severity="warning"
                )
            
            self.html_scope = elements[0]
            
            if self.verbose:
                element_info = f"<{self.html_scope.name}"
                if self.html_scope.get('id'):
                    element_info += f" id='{self.html_scope.get('id')}'"
                if self.html_scope.get('class'):
                    element_info += f" class='{' '.join(self.html_scope.get('class'))}'"
                element_info += ">"
                
                print(f"âœ“ Root-Element gefunden: {element_info}")
                print(f"  Elemente im HTML-Scope: {len(self.html_scope.find_all())}")
            
            return True
            
        except Exception as e:
            self._add_result(
                False,
                f"Fehler beim Verarbeiten des Root-Tag Selectors '{self.root_selector}': {e}",
                severity="error"
            )
            return False
    
    def validate_all(self) -> ValidationSummary:
        """FÃ¼hrt alle Validierungen durch"""
        if not self.load_files():
            return self._create_summary()
        
        # Schema-Validierung (falls Schema vorhanden)
        if self.schema and HAS_JSONSCHEMA:
            self._validate_json_schema()
        elif self.schema and not HAS_JSONSCHEMA:
            self._add_result(
                False,
                "Schema vorhanden, aber jsonschema-Library fehlt",
                severity="warning"
            )
        
        # Hauptvalidierungen
        self._validate_selector_references()
        self._validate_dialog_structure()
        self._validate_action_chains()
        self._validate_section_triggers()
        self._validate_context_blocks()
        self._generate_statistics()
        
        return self._create_summary()
    
    def _validate_json_schema(self) -> None:
        """Validiert JSON gegen Schema"""
        if self.verbose:
            print("\nðŸ” Validiere JSON-Schema-KonformitÃ¤t...")
        
        try:
            jsonschema.validate(instance=self.json_data, schema=self.schema)
            
            if self.verbose:
                print("  âœ“ JSON entspricht dem Schema")
            self._add_result(True, "JSON-Schema-Validierung erfolgreich", severity="info")
            
        except jsonschema.ValidationError as e:
            self._add_result(
                False,
                f"Schema-Validierung fehlgeschlagen: {e.message}",
````

````plaintext
validate.sh
#!/bin/bash
python="$(whereis python3 | awk '{print $2}')"

# Aus ./tools/validation/ heraus:
cd ./validation

echo "=========================================="
echo "AXIOM Agent System - Validierung"
echo "=========================================="
echo ""

# HTML-Struktur validieren mit root-tag "main"
echo "ðŸ” Schritt 1: HTML-Struktur-Validierung (Scope: main)"
echo "------------------------------------------"
"${python}" validate_html_structure.py ../../src/index.html \
    --root-tag "main" \
    --verbose

echo ""
echo ""

# Agent-JSON validieren mit root-tag "main"
echo "ðŸ” Schritt 2: Agent-JSON-Validierung (Scope: main)"
echo "------------------------------------------"
"${python}" validate_agent_json.py ../../src/agent-dialogs.json ../../src/index.html \
    --schema ../../schema/agent-dialogs.schema.json \
    --root-tag "main"

echo ""
echo "=========================================="
echo "Validierung abgeschlossen"
echo "=========================================="

cd ..
````

````plaintext
validate_agent_json.py
HTML-Validierung erfolgt nur innerhalb dieses Elements.'
    )
    
    args = parser.parse_args()
    
    # Dateipfade
    json_file = Path(args.json_file)
    html_file = Path(args.html_file)
    
    if not json_file.exists():
        print(f"âŒ JSON-Datei nicht gefunden: {json_file}")
        sys.exit(1)
    
    if not html_file.exists():
        print(f"âŒ HTML-Datei nicht gefunden: {html_file}")
        sys.exit(1)
    
    # Schema-Datei
    schema_file = None
    if args.schema:
        schema_file = Path(args.schema)
        if not schema_file.exists():
            print(f"âš ï¸  Schema-Datei nicht gefunden: {schema_file}")
    else:
        schema_file = find_schema_file(json_file)
        if schema_file and args.verbose:
            print(f"ðŸ“‹ Auto-detected Schema: {schema_file}")
    
    print(f"\nðŸ” Validiere: {json_file.name} gegen {html_file.name}")
    
    # Validierung durchfÃ¼hren
    validator = AgentJSONValidator(
        json_file, 
        html_file, 
        schema_file, 
        verbose=args.verbose,
        root_selector=args.root_tag
    )
    summary = validator.validate_all()
    
    # Ergebnisse ausgeben
    print_results(summary, verbose=args.verbose, root_selector=args.root_tag)
    
    # Exit-Code setzen
    if args.exit_on_error and not summary.is_valid:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()
````

````plaintext
media-report.schema.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/froiloc/WebAssistentForensics/media-report.schema.json",
  "title": "Media Validation Report Schema",
  "description": "Schema for the missing media files report output",
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "description": "Unique identifier for the media item"
      },
      "title": {
        "type": "string",
        "description": "Descriptive title for the media item"
      },
      "type": {
        "type": "string",
        "enum": ["screenshot", "annotated", "video"],
        "description": "Type of media file"
      },
      "context": {
        "type": "string",
        "description": "CSS selector or context path where media is used"
      },
      "snippet": {
        "type": "string",
        "description": "Relevant text snippet near the media reference"
      },
      "filePath": {
        "type": "string",
        "description": "Relative path to the missing media file"
      },
      "altText": {
        "type": "string",
        "description": "Alternative text or description for the media"
      },
      "similarFiles": {
        "type": "array",
        "description": "List of existing files with similar names",
        "items": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Filename of similar file"
            },
            "distance": {
              "type": "integer",
              "description": "Levenshtein distance from target filename"
            }
          },
          "required": ["name", "distance"]
        }
      },
      "completed": {
        "type": "boolean",
        "description": "Whether the media file has been marked as completed"
      }
    },
    "required": [
      "id",
      "title", 
      "type",
      "context",
      "snippet",
      "filePath",
      "altText",
      "similarFiles",
      "completed"
    ]
  }
}
````

````plaintext
validate_agent_json.py
print(f"{icon} {result.message}")
            
            if result.context:
                print(f"   â””â”€ Context: {result.context}")
            
            if result.selector and verbose:
                print(f"   â””â”€ Selector: {result.selector}")
            
            if result.suggestion:
                print(f"   ðŸ’¡ Vorschlag: {result.suggestion}")
            
            if verbose:
                print()
        
        print("-" * 80)
    
    # Empfehlungen
    if summary.total_errors > 0:
        print(f"\nðŸ’¡ EMPFEHLUNGEN:")
        print("   â€¢ Beheben Sie alle fehlenden CSS-Selector-Referenzen")
        print("   â€¢ PrÃ¼fen Sie Dialog-Struktur und Action-Chains")
        print("   â€¢ Stellen Sie sicher, dass alle Context-Blocks existieren")
    
    if summary.total_warnings > 0:
        print(f"\nâš ï¸  WARNUNGEN:")
        print("   â€¢ ÃœberprÃ¼fen Sie Action-Chain-Tiefe und Zyklen")
        print("   â€¢ Validieren Sie Section-Trigger-Parameter")
        print("   â€¢ Testen Sie die JSON-Konfiguration im Browser")


def find_schema_file(json_file: Path) -> Optional[Path]:
    """Sucht automatisch nach Schema-Datei"""
    # MÃ¶gliche Schema-Locations
    possible_schemas = [
        json_file.parent / "agent-dialogs.schema.json",
        json_file.parent / "schema" / "agent-dialogs.schema.json",
        json_file.parent.parent / "schema" / "agent-dialogs.schema.json"
    ]
    
    for schema_path in possible_schemas:
        if schema_path.exists():
            return schema_path
    
    return None


def main():
    """Haupt-Funktion fÃ¼r CLI"""
    parser = argparse.ArgumentParser(
        description="Validiert Agent-JSON-Konfiguration gegen HTML-Struktur",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Beispiele:
  python validate_agent_json.py agent-dialogs.json index.html
  python validate_agent_json.py agent-dialogs.json index.html --schema schema.json
  python validate_agent_json.py agent-dialogs.json index.html --root-tag "main"
  python validate_agent_json.py agent-dialogs.json index.html --verbose --exit-on-error
        """
    )
    
    parser.add_argument(
        'json_file',
        help='Agent-JSON-Datei zum Validieren'
    )
    
    parser.add_argument(
        'html_file', 
        help='HTML-Datei mit Element-Referenzen'
    )
    
    parser.add_argument(
        '--schema', '-s',
        help='JSON-Schema-Datei (optional, wird automatisch gesucht)'
    )
    
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Detaillierte Ausgabe mit allen Infos'
    )
    
    parser.add_argument(
        '--exit-on-error',
        action='store_true',
        help='Skript mit Exit-Code != 0 beenden bei Errors'
    )
    
    parser.add_argument(
        '--root-tag',
        type=str,
        default=None,
        help='CSS-Selector fÃ¼r Wurzelelement (optional). HTML-Validierung erfolgt nur innerhalb dieses Elements.'
````

````plaintext
V11 - Content-Metadaten-System (Vollständig).md
**Mindest-Informationen** setzen:
   - `identifier` (Section-ID)
   - `name` (Titel)
   - `version` (1.0 für neu)
   - `dateCreated` (aktuelles Datum)
   - `author` (Ihr Name)
   - `reviewStatus` (draft)

### Content aktualisieren:

1. **Version hochzählen** (z.B. 1.0 → 1.1 für kleine Änderungen, 2.0 für große)
2. **dateModified** aktualisieren
3. **Changelog-Eintrag** hinzufügen:
   `​`​`json
   {
       "date": "2025-10-08",
       "version": "1.1",
       "description": "Screenshots aktualisiert",
       "author": "Ihr Name"
   }
   `​`​`
4. **reviewStatus** auf "review" setzen
5. Nach Review: Status auf "approved" ändern

### Periodische Wartung:

**Monatlich:**
- Maintainer-Mode aktivieren
- Durch alle Sections scrollen
- Veraltete Markierungen prüfen

**Quartalsweise:**
- Alle Sections mit Status "outdated" überarbeiten
- `expires` Datum verlängern oder Content aktualisieren
- Changelog-Historie durchsehen

---

## Vorteile

✅ **Nachvollziehbarkeit:** Jede Änderung dokumentiert  
✅ **Qualitätssicherung:** Review-Status und Verantwortliche klar  
✅ **Wartungsplanung:** Ablaufdaten zeigen, wann Update nötig  
✅ **Transparenz:** Quellen und Prompt-Versionen dokumentiert  
✅ **Professionell:** Schema.org konform für SEO  
✅ **Flexibel:** Zwei Varianten (JSON-LD oder data-Attribute)  
✅ **Nicht-invasiv:** Standardmäßig unsichtbar für Endnutzer

---

## Technische Details

### Vorteile JSON-LD:
- ✅ Standardkonform (Schema.org)
- ✅ Strukturiert und erweiterbar
- ✅ SEO-freundlich
- ✅ Kann von externen Tools gelesen werden
- ❌ Etwas mehr Schreibaufwand

### Vorteile data-Attribute:
- ✅ Schnell zu schreiben
- ✅ Einfach per JavaScript auszulesen
- ✅ Für einfache Fälle ausreichend
- ❌ Nicht standardkonform
- ❌ Weniger strukturiert

### Empfehlung:
**Mischung verwenden:**
- Wichtige/komplexe Sections: JSON-LD
- Einfache/schnelle Sections: data-Attribute
- System unterstützt beides gleichzeitig

---

## Barrierefreiheit

**Implementierte Maßnahmen:**

1. **Keyboard-Navigation:**
   - ESC-Taste schließt Panel
   - Tab-Navigation in Panel möglich

2. **ARIA-Labels:**
   - Badges haben `aria-label="Metadaten anzeigen"`
   - Close-Button hat `aria-label="Schließen"`

3. **Visuelle Hinweise:**
   - Badges nur für Maintainer sichtbar
   - Veraltete Content-Warnung klar markiert
   - Kontraste gemäß WCAG 2.1 AA

4. **Screen-Reader:**
   - Strukturierte Überschriften im Panel
   - Semantisches HTML (dl/dt/dd könnte verwendet werden)

---

## Erweiterungsmöglichkeiten

### 1. Export-Funktion
`​`​`javascript
function exportMetadata() {
    const allMetadata = [];
    
    document.querySelectorAll('.content-section').forEach(section => {
        const meta = getMetadataForSection(section);
        if (meta) allMetadata.push(meta);
    });
    
    const json = JSON.stringify(allMetadata, null, 2);
    downloadAsFile(json, 'metadata-export.json');
}
`​`​`

### 2.
````

Perfekt! Ich habe das aktuelle Schema gefunden. Es ist relativ einfach strukturiert und deckt noch nicht die neuen Konzepte ab. Ich erstelle jetzt **V12** für die Schema-Erweiterung:

**V12 - JSON-Schema-Erweiterung für Metadaten & Content-Types**

````markdown
# V12: JSON-Schema-Erweiterung für Metadaten & Content-Types

**Priorität:** 🟠 Hoch (Validierungs-kritisch)  
**Aufwand:** 2-3 Stunden  
**Status:** Notwendig für V07 und V11

---

## Feature-Beschreibung

Erweiterung des bestehenden `main-content.schema.json` zur Validierung von:

1. **Content-Metadaten** (aus V11):
   - JSON-LD Struktur nach Schema.org
   - Vereinfachte data-meta-* Attribute
   - Validierung von Versionsnummern, Datumsangaben, etc.

2. **Content-Type-Attribute** (aus V07):
   - `data-content-type` mit Enumerator
   - Werte: `instruction`, `explanation`, `visual`, `background`, `example`, `warning`, `tip`

3. **Erweiterte Section-Attribute**:
   - Granularität (`data-ref`)
   - Agent-Kontext (`data-context-id`)
   - Detail-Level (`detail-level-1/2/3`)

**Ziel:** Vollständige Schema-Validierung aller HTML-Strukturen im `<main>` Bereich

---

## Aktueller Stand des Schemas

Das bestehende `main-content.schema.json` validiert aktuell:
- ✅ Basis-Metadaten (title, language)
- ✅ Section-Struktur (id, title, level)
- ✅ Content-Blöcke (text, detail-level, list, interactive)

**Was fehlt:**
- ❌ Content-Metadaten (JSON-LD)
- ❌ Content-Type-Attribute
- ❌ data-ref Granularität
- ❌ Agent-Kontext-Attribute
- ❌ Media-Elemente mit Accessibility

---

## Erweiterte Schema-Definition

### Vollständiges erweitertes Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/froiloc/WebAssistentForensics/schema/main-content.schema.json",
  "title": "WebAssistentForensics Main Content Structure (Extended)",
  "description": "Extended schema for validating content structure with metadata and content-type attributes",
  "version": "2.0.0",
  "type": "object",
  
  "properties": {
    "metadata": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "minLength": 1,
          "description": "Document title"
        },
        "language": {
          "type": "string",
          "pattern": "^[a-z]{2}(-[A-Z]{2})?$",
          "description": "Language code (e.g., de-DE)"
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+(\\.\\d+)?$",
          "description": "Document version (semver)"
        },
        "buildNumber": {
          "type": "integer",
          "minimum": 1,
          "description": "Build number"
        }
      },
      "required": ["title", "language"]
    },
    
    "sections": {
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/definitions/section"
      }
    }
  },
  
  "required": ["metadata", "sections"],
  
  "definitions": {
    
    "section": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "minLength": 1,
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "Unique section identifier"
        },
        "dataSection": {
          "type": "string",
          "minLength": 1,
          "description": "data-section attribute value"
        },
        "title": {
          "type": "string",
          "minLength": 1,
          "description": "Section title"
        },
        "level": {
          "type": "integer",
          "minimum": 1,
          "maximum": 6,
          "description": "Heading level (h1-h6)"
        },
        "metadata": {
          "$ref": "#/definitions/contentMetadata",
          "description": "Optional content metadata (V11)"
        },
        "content": {
          "type": "array",
          "items": {
            "oneOf": [
              {"$ref": "#/definitions/contentBlock"},
              {"$ref": "#/definitions/detailLevel"},
              {"$ref": "#/definitions/mediaElement"}
            ]
          }
        }
      },
      "required": ["id", "dataSection", "title", "level", "content"]
    },
    
    "contentMetadata": {
      "type": "object",
      "description": "Content metadata following Schema.org TechArticle spec",
      "properties": {
        "@context": {
          "type": "string",
          "const": "https://schema.org",
          "description": "Schema.org context"
        },
        "@type": {
          "type": "string",
          "enum": ["TechArticle", "Article", "HowTo"],
          "description": "Content type"
        },
        "identifier": {
          "type": "string",
          "minLength": 1,
          "description": "Unique identifier (matches section id)"
        },
        "name": {
          "type": "string",
          "minLength": 1,
          "description": "Content name/title"
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+$",
          "description": "Content version (e.g., 2.1)"
        },
        "dateCreated": {
          "type": "string",
          "format": "date-time",
          "description": "ISO 8601 creation date"
        },
        "dateModified": {
          "type": "string",
          "format": "date-time",
          "description": "ISO 8601 modification date"
        },
        "author": {
          "$ref": "#/definitions/person",
          "description": "Content author"
        },
        "editor": {
          "$ref": "#/definitions/person",
          "description": "Content editor"
        },
        "maintainer": {
          "$ref": "#/definitions/person",
          "description": "Content maintainer"
        },
        "reviewer": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/reviewer"
          },
          "description": "Content reviewers"
        },
        "inLanguage": {
          "type": "string",
          "pattern": "^[a-z]{2}-[A-Z]{2}$",
          "description": "Content language"
        },
        "keywords": {
          "type": "array",
          "items": {"type": "string"},
          "description": "Content keywords"
        },
        "about": {
          "type": "string",
          "description": "Content description"
        },
        "expires": {
          "type": "string",
          "format": "date-time",
          "description": "Expiration date"
        },
        "isBasedOn": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/source"
          },
          "description": "Source references"
        },
        "additionalProperty": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/propertyValue"
          },
          "description": "Additional custom properties"
        },
        "changeLog": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/changeLogEntry"
          },
          "description": "Change history"
        }
      },
      "required": ["@context", "@type", "identifier", "name", "version", "dateCreated", "author"]
    },
    
    "person": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string",
          "const": "Person"
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "jobTitle": {
          "type": "string"
        },
        "email": {
          "type": "string",
          "format": "email"
        }
      },
      "required": ["@type", "name"]
    },
    
    "reviewer": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string",
          "const": "Person"
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "jobTitle": {
          "type": "string"
        },
        "reviewDate": {
          "type": "string",
          "format": "date"
        }
      },
      "required": ["@type", "name"]
    },
    
    "source": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string",
          "enum": ["WebPage", "CreativeWork", "ScholarlyArticle"]
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "url": {
          "type": "string",
          "format": "uri"
        },
        "identifier": {
          "type": "string"
        },
        "author": {
          "type": "string"
        },
        "datePublished": {
          "type": "string",
          "format": "date"
        }
      },
      "required": ["@type", "name"]
    },
    
    "propertyValue": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string",
          "const": "PropertyValue"
        },
        "name": {
          "type": "string",
          "minLength": 1,
          "description": "Property name (e.g., promptVersion, reviewStatus)"
        },
        "value": {
          "type": "string",
          "description": "Property value"
        }
      },
      "required": ["@type", "name", "value"]
    },
    
    "changeLogEntry": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string",
          "format": "date",
          "description": "Change date (YYYY-MM-DD)"
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+$",
          "description": "Version number"
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "description": "Change description"
        },
        "author": {
          "type": "string",
          "minLength": 1,
          "description": "Author of change"
        }
      },
      "required": ["date", "version", "description", "author"]
    },
    
    "contentBlock": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["text", "list", "interactive", "warning", "tip"],
          "description": "Content block type"
        },
        "dataRef": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "data-ref attribute for granular addressing"
        },
        "contentType": {
          "type": "string",
          "enum": ["instruction", "explanation", "visual", "background", "example", "warning", "tip", "note"],
          "description": "data-content-type for Show-Only mode (V07)"
        },
        "contextId": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "data-context-id for agent system"
        },
        "content": {
          "type": "string",
          "minLength": 1,
          "description": "Block content"
        },
        "ariaLabel": {
          "type": "string",
          "description": "Accessibility label"
        }
      },
      "required": ["type", "content"]
    },
    
    "detailLevel": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "detail-level"
        },
        "level": {
          "type": "integer",
          "minimum": 1,
          "maximum": 3,
          "description": "Detail level (1=basic, 2=intermediate, 3=advanced)"
        },
        "dataRef": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "data-ref attribute"
        },
        "contentType": {
          "type": "string",
          "enum": ["instruction", "explanation", "visual", "background", "example", "warning", "tip", "note"],
          "description": "data-content-type attribute"
        },
        "children": {
          "type": "array",
          "items": {
            "oneOf": [
              {"$ref": "#/definitions/contentBlock"},
              {"$ref": "#/definitions/mediaElement"}
            ]
          }
        }
      },
      "required": ["type", "level", "children"]
    },
    
    "mediaElement": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["image", "video", "figure"],
          "description": "Media type"
        },
        "dataMediaType": {
          "type": "string",
          "enum": ["image", "video", "diagram"],
          "description": "data-media-type attribute"
        },
        "src": {
          "type": "string",
          "minLength": 1,
          "description": "Media source path"
        },
        "alt": {
          "type": "string",
          "minLength": 10,
          "description": "Alternative text (min 10 characters for accessibility)"
        },
        "caption": {
          "type": "string",
          "description": "Figure caption"
        },
        "dataRef": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "data-ref attribute"
        },
        "loading": {
          "type": "string",
          "enum": ["lazy", "eager"],
          "default": "lazy",
          "description": "Loading strategy"
        },
        "fullsize": {
          "type": "string",
          "description": "data-fullsize path for thumbnails"
        },
        "subtitles": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/videoTrack"
          },
          "description": "Video subtitle tracks"
        }
      },
      "required": ["type", "src", "alt"]
    },
    
    "videoTrack": {
      "type": "object",
      "properties": {
        "kind": {
          "type": "string",
          "enum": ["subtitles", "captions", "descriptions"],
          "description": "Track kind"
        },
        "src": {
          "type": "string",
          "minLength": 1,
          "description": "VTT file path"
        },
        "srclang": {
          "type": "string",
          "pattern": "^[a-z]{2}$",
          "description": "Track language code"
        },
        "label": {
          "type": "string",
          "minLength": 1,
          "description": "Track label"
        },
        "default": {
          "type": "boolean",
          "description": "Default track"
        }
      },
      "required": ["kind", "src", "srclang", "label"]
    }
  }
}
```

---

## Vereinfachte Metadaten-Alternative

Für Sections, die nicht das volle JSON-LD Schema benötigen:

```json
"simplifiedMetadata": {
  "type": "object",
  "properties": {
    "dataMetaVersion": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+$",
      "description": "data-meta-version attribute"
    },
    "dataMetaCreated": {
      "type": "string",
      "format": "date",
      "description": "data-meta-created attribute (YYYY-MM-DD)"
    },
    "dataMetaModified": {
      "type": "string",
      "format": "date",
      "description": "data-meta-modified attribute"
    },
    "dataMetaAuthor": {
      "type": "string",
      "minLength": 1,
      "description": "data-meta-author attribute"
    },
    "dataMetaReviewer": {
      "type": "string",
      "description": "data-meta-reviewer attribute"
    },
    "dataMetaStatus": {
      "type": "string",
      "enum": ["draft", "review", "approved", "outdated"],
      "description": "data-meta-status attribute"
    },
    "dataMetaPrompt": {
      "type": "string",
      "description": "data-meta-prompt attribute (prompt version)"
    },
    "dataMetaExpires": {
      "type": "string",
      "format": "date",
      "description": "data-meta-expires attribute"
    }
  },
  "required": ["dataMetaVersion", "dataMetaCreated", "dataMetaAuthor"]
}
```

---

## Content-Type Enumerator (V07)

**Vollständige Liste der Content-Types:**

```json
{
  "contentType": {
    "type": "string",
    "enum": [
      "instruction",     // Handlungsanweisungen (SHOW in Show-Only)
      "explanation",     // Erklärungen (HIDE in Show-Only)
      "visual",         // Bilder, Diagramme (SHOW in Show-Only)
      "background",     // Hintergrundinformationen (HIDE in Show-Only)
      "example",        // Beispiele (CONDITIONAL)
      "warning",        // Warnungen (ALWAYS SHOW)
      "tip",           // Tipps (CONDITIONAL)
      "note"           // Notizen (CONDITIONAL)
    ],
    "description": "Categorizes content for display modes"
  }
}
```

**Anwendungsregeln:**

| Content-Type | Standard | Show-Only | Text-Only | Beschreibung |
|--------------|----------|-----------|-----------|--------------|
| `instruction` | ✅ | ✅ | ✅ | Praktische Schritte |
| `explanation` | ✅ | ❌ | ✅ | Theoretischer Hintergrund |
| `visual` | ✅ | ✅ | ❌ | Bilder, Diagramme |
| `background` | ✅ | ❌ | ✅ | Kontext-Informationen |
| `example` | ✅ | ⚠️ | ✅ | Beispiele (optional) |
| `warning` | ✅ | ✅ | ✅ | Wichtige Warnungen |
| `tip` | ✅ | ⚠️ | ✅ | Best Practice Tipps |
| `note` | ✅ | ⚠️ | ✅ | Zusätzliche Hinweise |

---

## Validierungs-Regeln

### 1. Pflichtfelder pro Section

**Minimum (ohne Metadaten):**
```json
{
  "id": "required",
  "dataSection": "required",
  "title": "required",
  "level": "required",
  "content": "required (minItems: 1)"
}
```

**Mit Metadaten (empfohlen):**
```json
{
  "metadata": {
    "identifier": "required",
    "name": "required",
    "version": "required",
    "dateCreated": "required",
    "author": "required"
  }
}
```

### 2. Content-Type Konsistenz

**Regel:** Wenn ein Element `data-content-type` hat, müssen alle Geschwister-Elemente ebenfalls eins haben:

```javascript
// Valide:
<div class="detail-level-1" data-content-type="instruction">
  <p data-content-type="instruction">Schritt 1</p>
  <p data-content-type="explanation">Weil...</p>
</div>

// Invalide (inkonsistent):
<div class="detail-level-1">
  <p data-content-type="instruction">Schritt 1</p>
  <p>Keine Typisierung</p>  <!-- Fehler! -->
</div>
```

### 3. Metadaten-Konsistenz

**Regel:** `metadata.identifier` muss mit `section.id` übereinstimmen:

```json
{
  "id": "step1",
  "metadata": {
    "identifier": "step1"  // MUSS gleich sein!
  }
}
```

### 4. Medien-Accessibility

**Regel:** Alle `<img>` Elemente brauchen `alt`-Text mit mindestens 10 Zeichen:

```json
{
  "type": "image",
  "src": "media/screenshot.png",
  "alt": "AXIOM Process Export-Dialog mit markierten Schaltflächen"  // ✅ >10 Zeichen
}
```

---

## Implementierung

### Schritt 1: Schema-Datei ersetzen

**Datei:** `schema/main-content.schema.json`

```bash
# Backup erstellen
cp schema/main-content.schema.json schema/main-content.schema.json.backup

# Neues Schema einfügen
# (Vollständiges Schema von oben kopieren)
```

### Schritt 2: Validierungs-Script anpassen

**In `validate_html_structure.py` erweitern:**

```python
def _validate_content_types(self) -> None:
    """Validiert Content-Type Konsistenz"""
    if self.verbose:
        print("\n🔍 Validiere Content-Type Attribute...")
    
    sections_with_types = self.validation_scope.find_all(attrs={'data-content-type': True})
    
    for element in sections_with_types:
        parent = element.parent
        siblings = parent.find_all(recursive=False)
        
        # Prüfe ob alle Geschwister content-type haben
        without_type = [s for s in siblings if not s.get('data-content-type')]
        
        if without_type:
            self._add_result(
                False,
                f"Inkonsistente content-type Nutzung: {len(without_type)} Elemente ohne Typ",
                element_info=self._get_element_info(parent),
                severity="warning"
            )

def _validate_metadata_consistency(self) -> None:
    """Validiert Metadaten-Konsistenz"""
    if self.verbose:
        print("\n🔍 Validiere Metadaten-Konsistenz...")
    
    sections = self.validation_scope.find_all('section', class_='content-section')
    
    for section in sections:
        section_id = section.get('data-section') or section.get('id')
        
        # JSON-LD Metadaten prüfen
        metadata_script = section.find('script', class_='section-metadata')
        if metadata_script:
            try:
                import json
                metadata = json.loads(metadata_script.string)
                
                # Prüfe identifier matching
                if metadata.get('identifier') != section_id:
                    self._add_result(
                        False,
                        f"Metadaten identifier '{metadata.get('identifier')}' stimmt nicht mit section-id '{section_id}' überein",
                        element_info=self._get_element_info(section),
                        severity="error"
                    )
                    
                # Prüfe Pflichtfelder
                required = ['@context', '@type', 'identifier', 'name', 'version', 'dateCreated', 'author']
                missing = [f for f in required if f not in metadata]
                
                if missing:
                    self._add_result(
                        False,
                        f"Fehlende Pflichtfelder in Metadaten: {', '.join(missing)}",
                        element_info=self._get_element_info(section),
                        severity="error"
                    )
                    
            except json.JSONDecodeError:
                self._add_result(
                    False,
                    "Ungültiges JSON in section-metadata",
                    element_info=self._get_element_info(section),
                    severity="error"
                )
```

### Schritt 3: Validierung erweitern

**In `validate_all()` Methode hinzufügen:**

```python
def validate_all(self) -> ValidationSummary:
    """Führt alle Validierungen durch"""
    if not self.load_html():
        return self._create_summary()
    
    # Bestehende Validierungen
    self._validate_id_uniqueness()
    self._validate_standard_granularity()
    self._validate_orphan_elements()
    self._validate_css_selector_compatibility()
    self._validate_agent_elements()
    self._validate_section_structure()
    self._validate_media_accessibility()
    
    # NEU: V12 Validierungen
    self._validate_content_types()
    self._validate_metadata_consistency()
    
    return self._create_summary()
```

---

## Testing

### Test 1: Validiere Schema-Konformität

```bash
# JSON-Schema Validator installieren
pip install jsonschema

# Python-Script für Schema-Test
python3 << EOF
import json
from jsonschema import validate

with open('schema/main-content.schema.json') as f:
    schema = json.load(f)

# Test-Daten
test_data = {
    "metadata": {
        "title": "Test",
        "language": "de-DE"
    },
    "sections": [{
        "id": "test1",
        "dataSection": "test1",
        "title": "Test Section",
        "level": 2,
        "content": []
    }]
}

validate(instance=test_data, schema=schema)
print("✅ Schema ist valide!")
EOF
```

### Test 2: HTML-Validierung mit neuem Schema

```bash
cd tools/validation
python validate_html_structure.py ../../src/index.html \
    --root-tag "main" \
    --verbose
```

**Erwartete Ausgabe:**
```
🔍 Validiere Content-Type Attribute...
🔍 Validiere Metadaten-Konsistenz...
✅ Alle Validierungen erfolgreich
```

### Test 3: Metadaten-Section testen

**Erstelle Test-Section:**

```html
<section class="content-section"
         id="test-section"
         data-section="test-section"
         data-title="Test mit Metadaten">
    
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": "test-section",
        "name": "Test mit Metadaten",
        "version": "1.0",
        "dateCreated": "2025-10-08T10:00:00Z",
        "author": {
            "@type": "Person",
            "name": "Test Autor"
        }
    }
    </script>
    
    <h2>Test Überschrift</h2>
    <div data-content-type="instruction">Testanweisung</div>
</section>
```

**Validierung:**
```bash
python validate_html_structure.py test.html --root-tag "main" -v
```

---

## Vorteile

✅ **Vollständige Validierung:** Alle neuen Features (V07, V11) werden abgedeckt  
✅ **Frühe Fehlererkennung:** Schema-Fehler vor Deployment  
✅ **Dokumentation:** Schema dient als Referenz für HTML-Struktur  
✅ **Automatisierung:** CI/CD Integration möglich  
✅ **Konsistenz:** Einheitliche Datenstrukturen  
✅ **Tooling:** JSON-Schema wird von vielen Editoren unterstützt

---

## Integration in CI/CD

### GitHub Actions Workflow

```yaml
name: Validate HTML Structure

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'
    
    - name: Install dependencies
      run: |
        pip install beautifulsoup4 jsonschema lxml
    
    - name: Validate HTML against schema
      run: |
        cd tools/validation
        python validate_html_structure.py ../../src/index.html \
          --root-tag "main" \
          --exit-on-error
    
    - name: Validate Agent JSON
      run: |
        cd tools/validation
        python validate_agent_json.py \
          ../../src/agent-dialogs.json \
          ../../src/index.html \
          --schema ../../schema/agent-dialogs.schema.json \
          --root-tag "main" \
          --exit-on-error
```

---

## Zusammenfassung

Das **JSON-Schema-Erweiterung** (V12) sch
````



## Prompt:
8.10.2025, 12:00:43

Weiter



## Response:
8.10.2025, 12:02:18



**V12 - JSON-Schema-Erweiterung für Metadaten & Content-Types** ∙ Version 2

````markdown
# V12: JSON-Schema-Erweiterung für Metadaten & Content-Types

**Priorität:** 🟠 Hoch (Validierungs-kritisch)  
**Aufwand:** 2-3 Stunden  
**Status:** Notwendig für V07 und V11

---

## Feature-Beschreibung

Erweiterung des bestehenden `main-content.schema.json` zur Validierung von:

1. **Content-Metadaten** (aus V11):
   - JSON-LD Struktur nach Schema.org
   - Vereinfachte data-meta-* Attribute
   - Validierung von Versionsnummern, Datumsangaben, etc.

2. **Content-Type-Attribute** (aus V07):
   - `data-content-type` mit Enumerator
   - Werte: `instruction`, `explanation`, `visual`, `background`, `example`, `warning`, `tip`

3. **Erweiterte Section-Attribute**:
   - Granularität (`data-ref`)
   - Agent-Kontext (`data-context-id`)
   - Detail-Level (`detail-level-1/2/3`)

**Ziel:** Vollständige Schema-Validierung aller HTML-Strukturen im `<main>` Bereich

---

## Aktueller Stand des Schemas

Das bestehende `main-content.schema.json` validiert aktuell:
- ✅ Basis-Metadaten (title, language)
- ✅ Section-Struktur (id, title, level)
- ✅ Content-Blöcke (text, detail-level, list, interactive)

**Was fehlt:**
- ❌ Content-Metadaten (JSON-LD)
- ❌ Content-Type-Attribute
- ❌ data-ref Granularität
- ❌ Agent-Kontext-Attribute
- ❌ Media-Elemente mit Accessibility

---

## Erweiterte Schema-Definition

### Vollständiges erweitertes Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/froiloc/WebAssistentForensics/schema/main-content.schema.json",
  "title": "WebAssistentForensics Main Content Structure (Extended)",
  "description": "Extended schema for validating content structure with metadata and content-type attributes",
  "version": "2.0.0",
  "type": "object",
  
  "properties": {
    "metadata": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "minLength": 1,
          "description": "Document title"
        },
        "language": {
          "type": "string",
          "pattern": "^[a-z]{2}(-[A-Z]{2})?$",
          "description": "Language code (e.g., de-DE)"
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+(\\.\\d+)?$",
          "description": "Document version (semver)"
        },
        "buildNumber": {
          "type": "integer",
          "minimum": 1,
          "description": "Build number"
        }
      },
      "required": ["title", "language"]
    },
    
    "sections": {
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/definitions/section"
      }
    }
  },
  
  "required": ["metadata", "sections"],
  
  "definitions": {
    
    "section": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "minLength": 1,
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "Unique section identifier"
        },
        "dataSection": {
          "type": "string",
          "minLength": 1,
          "description": "data-section attribute value"
        },
        "title": {
          "type": "string",
          "minLength": 1,
          "description": "Section title"
        },
        "level": {
          "type": "integer",
          "minimum": 1,
          "maximum": 6,
          "description": "Heading level (h1-h6)"
        },
        "metadata": {
          "$ref": "#/definitions/contentMetadata",
          "description": "Optional content metadata (V11)"
        },
        "content": {
          "type": "array",
          "items": {
            "oneOf": [
              {"$ref": "#/definitions/contentBlock"},
              {"$ref": "#/definitions/detailLevel"},
              {"$ref": "#/definitions/mediaElement"}
            ]
          }
        }
      },
      "required": ["id", "dataSection", "title", "level", "content"]
    },
    
    "contentMetadata": {
      "type": "object",
      "description": "Content metadata following Schema.org TechArticle spec",
      "properties": {
        "@context": {
          "type": "string",
          "const": "https://schema.org",
          "description": "Schema.org context"
        },
        "@type": {
          "type": "string",
          "enum": ["TechArticle", "Article", "HowTo"],
          "description": "Content type"
        },
        "identifier": {
          "type": "string",
          "minLength": 1,
          "description": "Unique identifier (matches section id)"
        },
        "name": {
          "type": "string",
          "minLength": 1,
          "description": "Content name/title"
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+$",
          "description": "Content version (e.g., 2.1)"
        },
        "dateCreated": {
          "type": "string",
          "format": "date-time",
          "description": "ISO 8601 creation date"
        },
        "dateModified": {
          "type": "string",
          "format": "date-time",
          "description": "ISO 8601 modification date"
        },
        "author": {
          "$ref": "#/definitions/person",
          "description": "Content author"
        },
        "editor": {
          "$ref": "#/definitions/person",
          "description": "Content editor"
        },
        "maintainer": {
          "$ref": "#/definitions/person",
          "description": "Content maintainer"
        },
        "reviewer": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/reviewer"
          },
          "description": "Content reviewers"
        },
        "inLanguage": {
          "type": "string",
          "pattern": "^[a-z]{2}-[A-Z]{2}$",
          "description": "Content language"
        },
        "keywords": {
          "type": "array",
          "items": {"type": "string"},
          "description": "Content keywords"
        },
        "about": {
          "type": "string",
          "description": "Content description"
        },
        "expires": {
          "type": "string",
          "format": "date-time",
          "description": "Expiration date"
        },
        "isBasedOn": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/source"
          },
          "description": "Source references"
        },
        "additionalProperty": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/propertyValue"
          },
          "description": "Additional custom properties"
        },
        "changeLog": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/changeLogEntry"
          },
          "description": "Change history"
        }
      },
      "required": ["@context", "@type", "identifier", "name", "version", "dateCreated", "author"]
    },
    
    "person": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string",
          "const": "Person"
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "jobTitle": {
          "type": "string"
        },
        "email": {
          "type": "string",
          "format": "email"
        }
      },
      "required": ["@type", "name"]
    },
    
    "reviewer": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string",
          "const": "Person"
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "jobTitle": {
          "type": "string"
        },
        "reviewDate": {
          "type": "string",
          "format": "date"
        }
      },
      "required": ["@type", "name"]
    },
    
    "source": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string",
          "enum": ["WebPage", "CreativeWork", "ScholarlyArticle"]
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "url": {
          "type": "string",
          "format": "uri"
        },
        "identifier": {
          "type": "string"
        },
        "author": {
          "type": "string"
        },
        "datePublished": {
          "type": "string",
          "format": "date"
        }
      },
      "required": ["@type", "name"]
    },
    
    "propertyValue": {
      "type": "object",
      "properties": {
        "@type": {
          "type": "string",
          "const": "PropertyValue"
        },
        "name": {
          "type": "string",
          "minLength": 1,
          "description": "Property name (e.g., promptVersion, reviewStatus)"
        },
        "value": {
          "type": "string",
          "description": "Property value"
        }
      },
      "required": ["@type", "name", "value"]
    },
    
    "changeLogEntry": {
      "type": "object",
      "properties": {
        "date": {
          "type": "string",
          "format": "date",
          "description": "Change date (YYYY-MM-DD)"
        },
        "version": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+$",
          "description": "Version number"
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "description": "Change description"
        },
        "author": {
          "type": "string",
          "minLength": 1,
          "description": "Author of change"
        }
      },
      "required": ["date", "version", "description", "author"]
    },
    
    "contentBlock": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["text", "list", "interactive", "warning", "tip"],
          "description": "Content block type"
        },
        "dataRef": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "data-ref attribute for granular addressing"
        },
        "contentType": {
          "type": "string",
          "enum": ["instruction", "explanation", "visual", "background", "example", "warning", "tip", "note"],
          "description": "data-content-type for Show-Only mode (V07)"
        },
        "contextId": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "data-context-id for agent system"
        },
        "content": {
          "type": "string",
          "minLength": 1,
          "description": "Block content"
        },
        "ariaLabel": {
          "type": "string",
          "description": "Accessibility label"
        }
      },
      "required": ["type", "content"]
    },
    
    "detailLevel": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "const": "detail-level"
        },
        "level": {
          "type": "integer",
          "minimum": 1,
          "maximum": 3,
          "description": "Detail level (1=basic, 2=intermediate, 3=advanced)"
        },
        "dataRef": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "data-ref attribute"
        },
        "contentType": {
          "type": "string",
          "enum": ["instruction", "explanation", "visual", "background", "example", "warning", "tip", "note"],
          "description": "data-content-type attribute"
        },
        "children": {
          "type": "array",
          "items": {
            "oneOf": [
              {"$ref": "#/definitions/contentBlock"},
              {"$ref": "#/definitions/mediaElement"}
            ]
          }
        }
      },
      "required": ["type", "level", "children"]
    },
    
    "mediaElement": {
      "type": "object",
      "properties": {
        "type": {
          "type": "string",
          "enum": ["image", "video", "figure"],
          "description": "Media type"
        },
        "dataMediaType": {
          "type": "string",
          "enum": ["image", "video", "diagram"],
          "description": "data-media-type attribute"
        },
        "src": {
          "type": "string",
          "minLength": 1,
          "description": "Media source path"
        },
        "alt": {
          "type": "string",
          "minLength": 10,
          "description": "Alternative text (min 10 characters for accessibility)"
        },
        "caption": {
          "type": "string",
          "description": "Figure caption"
        },
        "dataRef": {
          "type": "string",
          "pattern": "^[a-zA-Z][a-zA-Z0-9_-]*$",
          "description": "data-ref attribute"
        },
        "loading": {
          "type": "string",
          "enum": ["lazy", "eager"],
          "default": "lazy",
          "description": "Loading strategy"
        },
        "fullsize": {
          "type": "string",
          "description": "data-fullsize path for thumbnails"
        },
        "subtitles": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/videoTrack"
          },
          "description": "Video subtitle tracks"
        }
      },
      "required": ["type", "src", "alt"]
    },
    
    "videoTrack": {
      "type": "object",
      "properties": {
        "kind": {
          "type": "string",
          "enum": ["subtitles", "captions", "descriptions"],
          "description": "Track kind"
        },
        "src": {
          "type": "string",
          "minLength": 1,
          "description": "VTT file path"
        },
        "srclang": {
          "type": "string",
          "pattern": "^[a-z]{2}$",
          "description": "Track language code"
        },
        "label": {
          "type": "string",
          "minLength": 1,
          "description": "Track label"
        },
        "default": {
          "type": "boolean",
          "description": "Default track"
        }
      },
      "required": ["kind", "src", "srclang", "label"]
    }
  }
}
```

---

## Vereinfachte Metadaten-Alternative

Für Sections, die nicht das volle JSON-LD Schema benötigen:

```json
"simplifiedMetadata": {
  "type": "object",
  "properties": {
    "dataMetaVersion": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+$",
      "description": "data-meta-version attribute"
    },
    "dataMetaCreated": {
      "type": "string",
      "format": "date",
      "description": "data-meta-created attribute (YYYY-MM-DD)"
    },
    "dataMetaModified": {
      "type": "string",
      "format": "date",
      "description": "data-meta-modified attribute"
    },
    "dataMetaAuthor": {
      "type": "string",
      "minLength": 1,
      "description": "data-meta-author attribute"
    },
    "dataMetaReviewer": {
      "type": "string",
      "description": "data-meta-reviewer attribute"
    },
    "dataMetaStatus": {
      "type": "string",
      "enum": ["draft", "review", "approved", "outdated"],
      "description": "data-meta-status attribute"
    },
    "dataMetaPrompt": {
      "type": "string",
      "description": "data-meta-prompt attribute (prompt version)"
    },
    "dataMetaExpires": {
      "type": "string",
      "format": "date",
      "description": "data-meta-expires attribute"
    }
  },
  "required": ["dataMetaVersion", "dataMetaCreated", "dataMetaAuthor"]
}
```

---

## Content-Type Enumerator (V07)

**Vollständige Liste der Content-Types:**

```json
{
  "contentType": {
    "type": "string",
    "enum": [
      "instruction",     // Handlungsanweisungen (SHOW in Show-Only)
      "explanation",     // Erklärungen (HIDE in Show-Only)
      "visual",         // Bilder, Diagramme (SHOW in Show-Only)
      "background",     // Hintergrundinformationen (HIDE in Show-Only)
      "example",        // Beispiele (CONDITIONAL)
      "warning",        // Warnungen (ALWAYS SHOW)
      "tip",           // Tipps (CONDITIONAL)
      "note"           // Notizen (CONDITIONAL)
    ],
    "description": "Categorizes content for display modes"
  }
}
```

**Anwendungsregeln:**

| Content-Type | Standard | Show-Only | Text-Only | Beschreibung |
|--------------|----------|-----------|-----------|--------------|
| `instruction` | ✅ | ✅ | ✅ | Praktische Schritte |
| `explanation` | ✅ | ❌ | ✅ | Theoretischer Hintergrund |
| `visual` | ✅ | ✅ | ❌ | Bilder, Diagramme |
| `background` | ✅ | ❌ | ✅ | Kontext-Informationen |
| `example` | ✅ | ⚠️ | ✅ | Beispiele (optional) |
| `warning` | ✅ | ✅ | ✅ | Wichtige Warnungen |
| `tip` | ✅ | ⚠️ | ✅ | Best Practice Tipps |
| `note` | ✅ | ⚠️ | ✅ | Zusätzliche Hinweise |

---

## Validierungs-Regeln

### 1. Pflichtfelder pro Section

**Minimum (ohne Metadaten):**
```json
{
  "id": "required",
  "dataSection": "required",
  "title": "required",
  "level": "required",
  "content": "required (minItems: 1)"
}
```

**Mit Metadaten (empfohlen):**
```json
{
  "metadata": {
    "identifier": "required",
    "name": "required",
    "version": "required",
    "dateCreated": "required",
    "author": "required"
  }
}
```

### 2. Content-Type Konsistenz

**Regel:** Wenn ein Element `data-content-type` hat, müssen alle Geschwister-Elemente ebenfalls eins haben:

```javascript
// Valide:
<div class="detail-level-1" data-content-type="instruction">
  <p data-content-type="instruction">Schritt 1</p>
  <p data-content-type="explanation">Weil...</p>
</div>

// Invalide (inkonsistent):
<div class="detail-level-1">
  <p data-content-type="instruction">Schritt 1</p>
  <p>Keine Typisierung</p>  <!-- Fehler! -->
</div>
```

### 3. Metadaten-Konsistenz

**Regel:** `metadata.identifier` muss mit `section.id` übereinstimmen:

```json
{
  "id": "step1",
  "metadata": {
    "identifier": "step1"  // MUSS gleich sein!
  }
}
```

### 4. Medien-Accessibility

**Regel:** Alle `<img>` Elemente brauchen `alt`-Text mit mindestens 10 Zeichen:

```json
{
  "type": "image",
  "src": "media/screenshot.png",
  "alt": "AXIOM Process Export-Dialog mit markierten Schaltflächen"  // ✅ >10 Zeichen
}
```

---

## Implementierung

### Schritt 1: Schema-Datei ersetzen

**Datei:** `schema/main-content.schema.json`

```bash
# Backup erstellen
cp schema/main-content.schema.json schema/main-content.schema.json.backup

# Neues Schema einfügen
# (Vollständiges Schema von oben kopieren)
```

### Schritt 2: Validierungs-Script anpassen

**In `validate_html_structure.py` erweitern:**

```python
def _validate_content_types(self) -> None:
    """Validiert Content-Type Konsistenz"""
    if self.verbose:
        print("\n🔍 Validiere Content-Type Attribute...")
    
    sections_with_types = self.validation_scope.find_all(attrs={'data-content-type': True})
    
    for element in sections_with_types:
        parent = element.parent
        siblings = parent.find_all(recursive=False)
        
        # Prüfe ob alle Geschwister content-type haben
        without_type = [s for s in siblings if not s.get('data-content-type')]
        
        if without_type:
            self._add_result(
                False,
                f"Inkonsistente content-type Nutzung: {len(without_type)} Elemente ohne Typ",
                element_info=self._get_element_info(parent),
                severity="warning"
            )

def _validate_metadata_consistency(self) -> None:
    """Validiert Metadaten-Konsistenz"""
    if self.verbose:
        print("\n🔍 Validiere Metadaten-Konsistenz...")
    
    sections = self.validation_scope.find_all('section', class_='content-section')
    
    for section in sections:
        section_id = section.get('data-section') or section.get('id')
        
        # JSON-LD Metadaten prüfen
        metadata_script = section.find('script', class_='section-metadata')
        if metadata_script:
            try:
                import json
                metadata = json.loads(metadata_script.string)
                
                # Prüfe identifier matching
                if metadata.get('identifier') != section_id:
                    self._add_result(
                        False,
                        f"Metadaten identifier '{metadata.get('identifier')}' stimmt nicht mit section-id '{section_id}' überein",
                        element_info=self._get_element_info(section),
                        severity="error"
                    )
                    
                # Prüfe Pflichtfelder
                required = ['@context', '@type', 'identifier', 'name', 'version', 'dateCreated', 'author']
                missing = [f for f in required if f not in metadata]
                
                if missing:
                    self._add_result(
                        False,
                        f"Fehlende Pflichtfelder in Metadaten: {', '.join(missing)}",
                        element_info=self._get_element_info(section),
                        severity="error"
                    )
                    
            except json.JSONDecodeError:
                self._add_result(
                    False,
                    "Ungültiges JSON in section-metadata",
                    element_info=self._get_element_info(section),
                    severity="error"
                )
```

### Schritt 3: Validierung erweitern

**In `validate_all()` Methode hinzufügen:**

```python
def validate_all(self) -> ValidationSummary:
    """Führt alle Validierungen durch"""
    if not self.load_html():
        return self._create_summary()
    
    # Bestehende Validierungen
    self._validate_id_uniqueness()
    self._validate_standard_granularity()
    self._validate_orphan_elements()
    self._validate_css_selector_compatibility()
    self._validate_agent_elements()
    self._validate_section_structure()
    self._validate_media_accessibility()
    
    # NEU: V12 Validierungen
    self._validate_content_types()
    self._validate_metadata_consistency()
    
    return self._create_summary()
```

---

## Testing

### Test 1: Validiere Schema-Konformität

```bash
# JSON-Schema Validator installieren
pip install jsonschema

# Python-Script für Schema-Test
python3 << EOF
import json
from jsonschema import validate

with open('schema/main-content.schema.json') as f:
    schema = json.load(f)

# Test-Daten
test_data = {
    "metadata": {
        "title": "Test",
        "language": "de-DE"
    },
    "sections": [{
        "id": "test1",
        "dataSection": "test1",
        "title": "Test Section",
        "level": 2,
        "content": []
    }]
}

validate(instance=test_data, schema=schema)
print("✅ Schema ist valide!")
EOF
```

### Test 2: HTML-Validierung mit neuem Schema

```bash
cd tools/validation
python validate_html_structure.py ../../src/index.html \
    --root-tag "main" \
    --verbose
```

**Erwartete Ausgabe:**
```
🔍 Validiere Content-Type Attribute...
🔍 Validiere Metadaten-Konsistenz...
✅ Alle Validierungen erfolgreich
```

### Test 3: Metadaten-Section testen

**Erstelle Test-Section:**

```html
<section class="content-section"
         id="test-section"
         data-section="test-section"
         data-title="Test mit Metadaten">
    
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": "test-section",
        "name": "Test mit Metadaten",
        "version": "1.0",
        "dateCreated": "2025-10-08T10:00:00Z",
        "author": {
            "@type": "Person",
            "name": "Test Autor"
        }
    }
    </script>
    
    <h2>Test Überschrift</h2>
    <div data-content-type="instruction">Testanweisung</div>
</section>
```

**Validierung:**
```bash
python validate_html_structure.py test.html --root-tag "main" -v
```

---

## Vorteile

✅ **Vollständige Validierung:** Alle neuen Features (V07, V11) werden abgedeckt  
✅ **Frühe Fehlererkennung:** Schema-Fehler vor Deployment  
✅ **Dokumentation:** Schema dient als Referenz für HTML-Struktur  
✅ **Automatisierung:** CI/CD Integration möglich  
✅ **Konsistenz:** Einheitliche Datenstrukturen  
✅ **Tooling:** JSON-Schema wird von vielen Editoren unterstützt

---

## Integration in CI/CD

### GitHub Actions Workflow

```yaml
name: Validate HTML Structure

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'
    
    - name: Install dependencies
      run: |
        pip install beautifulsoup4 jsonschema lxml
    
    - name: Validate HTML against schema
      run: |
        cd tools/validation
        python validate_html_structure.py ../../src/index.html \
          --root-tag "main" \
          --exit-on-error
    
    - name: Validate Agent JSON
      run: |
        cd tools/validation
        python validate_agent_json.py \
          ../../src/agent-dialogs.json \
          ../../src/index.html \
          --schema ../../schema/agent-dialogs.schema.json \
          --root-tag "main" \
          --exit-on-error
```

---

## Zusammenfassung

Das **JSON-Schema-Erweiterung** (V12) schafft die technische Grundlage für:

- ✅ **V07 (Show-Only Modus):** Validierung der Content-Type-Attribute
- ✅ **V11 (Metadaten-System):** Validierung der JSON-LD Struktur
- ✅ **Konsistenz:** Einheitliche Datenstrukturen im gesamten Projekt
- ✅ **Qualitätssicherung:** Automatische Fehlerprüfung vor Deployment
- ✅ **Dokumentation:** Schema als lebende Referenz

**Aufwand:** 2-3 Stunden  
**Abhängigkeiten:** Grundlage für V07 und V11  
**ROI:** Sehr hoch - verhindert strukturelle Fehler

---

## Migration bestehender Sections

### Migrations-Script

Für die Umstellung bestehender Sections auf das neue Schema:

```python
#!/usr/bin/env python3
"""
migrate_sections.py - Migriert bestehende Sections zum neuen Schema
"""

import re
from pathlib import Path
from bs4 import BeautifulSoup
from datetime import datetime

def migrate_section_to_schema(section_element, build_number):
    """Fügt Metadaten und Content-Types zu Section hinzu"""
    
    # Extract section info
    section_id = section_element.get('data-section') or section_element.get('id')
    section_title = section_element.get('data-title')
    
    if not section_title:
        h2 = section_element.find('h2')
        section_title = h2.get_text() if h2 else 'Unbenannt'
    
    # Erstelle Basis-Metadaten
    metadata = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": section_id,
        "name": section_title,
        "version": "1.0",
        "dateCreated": datetime.now().isoformat(),
        "dateModified": datetime.now().isoformat(),
        "author": {
            "@type": "Person",
            "name": "Migration Script",
            "jobTitle": "Automated"
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "reviewStatus",
                "value": "draft"
            },
            {
                "@type": "PropertyValue",
                "name": "migratedFrom",
                "value": f"build-{build_number}"
            }
        ],
        "changeLog": [
            {
                "date": datetime.now().strftime("%Y-%m-%d"),
                "version": "1.0",
                "description": "Automatische Migration zu Schema v2.0",
                "author": "Migration Script"
            }
        ]
    }
    
    # JSON-LD Script erstellen
    import json
    metadata_script = section_element.new_tag('script')
    metadata_script['type'] = 'application/ld+json'
    metadata_script['class'] = 'section-metadata'
    metadata_script.string = json.dumps(metadata, indent=2, ensure_ascii=False)
    
    # Als erstes Kind einfügen
    section_element.insert(0, metadata_script)
    section_element.insert(1, section_element.new_tag('br'))  # Whitespace
    
    # Content-Types automatisch zuweisen
    assign_content_types(section_element)
    
    return section_element

def assign_content_types(section):
    """Weist Content-Types basierend auf Heuristiken zu"""
    
    # Alle Paragraphen und Divs finden
    content_elements = section.find_all(['p', 'div', 'ol', 'ul'], recursive=True)
    
    for element in content_elements:
        # Skip wenn bereits content-type vorhanden
        if element.get('data-content-type'):
            continue
        
        text = element.get_text().lower()
        classes = element.get('class', [])
        
        # Heuristische Zuordnung
        if 'warning-box' in classes or 'achtung' in text:
            element['data-content-type'] = 'warning'
        elif 'tip-box' in classes or 'tipp' in text or 'best practice' in text:
            element['data-content-type'] = 'tip'
        elif element.name in ['ol', 'ul']:
            # Listen sind meist Anweisungen
            element['data-content-type'] = 'instruction'
        elif any(word in text for word in ['schritt', 'klicken', 'öffnen', 'wählen']):
            element['data-content-type'] = 'instruction'
        elif any(word in text for word in ['weil', 'daher', 'grund', 'bedeutet']):
            element['data-content-type'] = 'explanation'
        elif any(word in text for word in ['beispiel', 'etwa', 'z.b.']):
            element['data-content-type'] = 'example'
        elif 'detail-level-1' in classes:
            element['data-content-type'] = 'instruction'
        elif 'detail-level-2' in classes:
            element['data-content-type'] = 'explanation'
        elif 'detail-level-3' in classes:
            element['data-content-type'] = 'background'
        else:
            # Default: explanation
            element['data-content-type'] = 'explanation'
    
    # Media-Elemente
    for img in section.find_all('img'):
        parent = img.parent
        if parent.name == 'figure':
            parent['data-media-type'] = 'image'

def migrate_html_file(input_file, output_file, build_number):
    """Migriert gesamte HTML-Datei"""
    
    print(f"🔄 Migriere {input_file}...")
    
    with open(input_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Alle content-sections finden
    sections = soup.find_all('section', class_='content-section')
    
    print(f"   Gefunden: {len(sections)} Sections")
    
    migrated_count = 0
    for section in sections:
        # Prüfe ob bereits Metadaten vorhanden
        if section.find('script', class_='section-metadata'):
            print(f"   ⏭️  Überspringe {section.get('data-section')} (hat bereits Metadaten)")
            continue
        
        migrate_section_to_schema(section, build_number)
        migrated_count += 1
        print(f"   ✅ Migriert: {section.get('data-section')}")
    
    # Speichern
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(str(soup.prettify()))
    
    print(f"\n✅ Migration abgeschlossen:")
    print(f"   {migrated_count} Sections migriert")
    print(f"   Ausgabe: {output_file}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python migrate_sections.py <input.html> [output.html] [build_number]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else input_file.replace('.html', '_migrated.html')
    build_number = sys.argv[3] if len(sys.argv) > 3 else "053"
    
    migrate_html_file(input_file, output_file, build_number)
```

**Verwendung:**

```bash
# Backup erstellen
cp src/index.html src/index.html.backup

# Migration durchführen
python tools/migration/migrate_sections.py src/index.html src/index_migrated.html 053

# Validieren
python tools/validation/validate_html_structure.py src/index_migrated.html --root-tag "main" -v

# Bei Erfolg: Ersetzen
mv src/index_migrated.html src/index.html
```

---

## Erweiterungsmöglichkeiten

### 1. Schema-Versionierung

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://github.com/froiloc/WebAssistentForensics/schema/main-content.schema.json",
  "version": "2.0.0",
  "changelog": [
    {
      "version": "2.0.0",
      "date": "2025-10-08",
      "changes": [
        "Added content metadata support (V11)",
        "Added content-type attributes (V07)",
        "Extended media validation"
      ]
    },
    {
      "version": "1.0.0",
      "date": "2025-09-01",
      "changes": ["Initial schema"]
    }
  ]
}
```

### 2. Custom Validators

```python
def validate_version_format(version_string):
    """Validiert Versionsnummern-Format"""
    pattern = r'^\d+\.\d+
    return re.match(pattern, version_string) is not None

def validate_date_not_in_future(date_string):
    """Prüft ob Datum nicht in der Zukunft liegt"""
    date = datetime.fromisoformat(date_string)
    return date <= datetime.now()

def validate_metadata_expiry(metadata):
    """Warnt bei abgelaufenen Metadaten"""
    if 'expires' in metadata:
        expiry = datetime.fromisoformat(metadata['expires'])
        if expiry < datetime.now():
            return False, "Content ist abgelaufen"
    return True, None
```

### 3. IDE-Integration

**VS Code JSON Schema Mapping:**

`.vscode/settings.json`:
```json
{
  "json.schemas": [
    {
      "fileMatch": ["**/schema/main-content.schema.json"],
      "url": "./schema/main-content.schema.json"
    },
    {
      "fileMatch": ["**/schema/agent-dialogs.schema.json"],
      "url": "./schema/agent-dialogs.schema.json"
    }
  ],
  "html.customData": [
    "./schema/html-custom-data.json"
  ]
}
```

**HTML Custom Data für VS Code:**

`schema/html-custom-data.json`:
```json
{
  "version": 1.1,
  "tags": [],
  "globalAttributes": [
    {
      "name": "data-content-type",
      "description": "Kategorisiert Content für verschiedene Anzeigemodi",
      "valueSet": "contentTypes"
    },
    {
      "name": "data-ref",
      "description": "Granulare Adressierung für Content-Blöcke"
    },
    {
      "name": "data-context-id",
      "description": "Agent-Kontext-ID für kontextbezogene Hilfe"
    },
    {
      "name": "data-meta-version",
      "description": "Content-Version (vereinfachte Metadaten)"
    },
    {
      "name": "data-meta-status",
      "description": "Review-Status",
      "valueSet": "metaStatus"
    }
  ],
  "valueSets": [
    {
      "name": "contentTypes",
      "values": [
        {"name": "instruction", "description": "Handlungsanweisungen"},
        {"name": "explanation", "description": "Erklärungen"},
        {"name": "visual", "description": "Visuelle Elemente"},
        {"name": "background", "description": "Hintergrundinformationen"},
        {"name": "example", "description": "Beispiele"},
        {"name": "warning", "description": "Warnungen"},
        {"name": "tip", "description": "Tipps"},
        {"name": "note", "description": "Notizen"}
      ]
    },
    {
      "name": "metaStatus",
      "values": [
        {"name": "draft", "description": "Entwurf"},
        {"name": "review", "description": "In Review"},
        {"name": "approved", "description": "Freigegeben"},
        {"name": "outdated", "description": "Veraltet"}
      ]
    }
  ]
}
```

### 4. Automatische Schema-Generierung

```python
def generate_schema_from_html(html_file):
    """Generiert JSON-Schema aus bestehender HTML-Struktur"""
    
    with open(html_file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    # Analysiere alle verwendeten Attribute
    all_attributes = set()
    for element in soup.find_all():
        all_attributes.update(element.attrs.keys())
    
    # Analysiere Content-Types
    content_types = set()
    for element in soup.find_all(attrs={'data-content-type': True}):
        content_types.add(element['data-content-type'])
    
    # Generiere Schema
    schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "detectedAttributes": list(all_attributes),
        "detectedContentTypes": list(content_types),
        "generatedAt": datetime.now().isoformat()
    }
    
    return schema
```

---

## Checkliste für Implementierung

### Phase 1: Schema-Erstellung (30 Min)
- [ ] Vollständiges Schema in `schema/main-content.schema.json` einfügen
- [ ] Schema-Version auf 2.0.0 setzen
- [ ] Backup des alten Schemas erstellen

### Phase 2: Validierungs-Erweiterung (1 Stunde)
- [ ] `validate_html_structure.py` um Content-Type-Validierung erweitern
- [ ] Metadaten-Konsistenz-Checks hinzufügen
- [ ] Testing mit Beispiel-Sections

### Phase 3: Migration (1 Stunde)
- [ ] Migrations-Script `migrate_sections.py` erstellen
- [ ] Backup von `index.html` erstellen
- [ ] Migration auf Test-Datei ausführen
- [ ] Validierung der migrierten Datei
- [ ] Bei Erfolg: Live-Datei migrieren

### Phase 4: IDE-Integration (30 Min)
- [ ] `.vscode/settings.json` konfigurieren
- [ ] `html-custom-data.json` erstellen
- [ ] Auto-Complete testen

### Phase 5: CI/CD Integration (Optional)
- [ ] GitHub Actions Workflow erstellen
- [ ] Pre-commit Hooks einrichten
- [ ] Build-Prozess anpassen

---

## Wartung des Schemas

### Bei neuen Attributen:

1. **Schema erweitern:**
```json
"newAttribute": {
  "type": "string",
  "description": "Beschreibung des neuen Attributs",
  "pattern": "^[a-zA-Z0-9_-]+$"
}
```

2. **Validierung anpassen:**
```python
def _validate_new_attribute(self) -> None:
    """Validiert neues Attribut"""
    elements = self.validation_scope.find_all(attrs={'data-new-attribute': True})
    # Validierungslogik
```

3. **Custom Data aktualisieren:**
```json
{
  "name": "data-new-attribute",
  "description": "...",
  "valueSet": "newValues"
}
```

4. **Tests erweitern:**
```python
def test_new_attribute_validation():
    # Test-Code
    pass
```

### Versionierung:

**Schema-Version erhöhen bei:**
- **Major (3.0.0):** Breaking Changes, strukturelle Änderungen
- **Minor (2.1.0):** Neue Attribute/Features, abwärtskompatibel
- **Patch (2.0.1):** Bugfixes, Dokumentations-Updates

---

## Best Practices

### 1. Konsistente Benennung

**Gut:**
```html
<div data-content-type="instruction">...</div>
<div data-content-type="explanation">...</div>
```

**Schlecht:**
```html
<div data-content-type="instruction">...</div>
<div data-contentType="explanation">...</div>  <!-- Inkonsistent! -->
```

### 2. Aussagekräftige Metadaten

**Gut:**
```json
{
  "description": "Screenshots aktualisiert für AXIOM 8.0, Textpassagen an neue UI angepasst",
  "author": "Max Mustermann"
}
```

**Schlecht:**
```json
{
  "description": "Update",
  "author": "MM"
}
```

### 3. Realistische Ablaufdaten

**Gut:**
```json
{
  "expires": "2026-10-01"  // 1 Jahr in der Zukunft
}
```

**Schlecht:**
```json
{
  "expires": "2099-12-31"  // Unrealistisch weit
}
```

### 4. Regelmäßige Schema-Reviews

**Quartalsweise:**
- Unused Attributes identifizieren
- Neue Anforderungen einarbeiten
- Deprecated Attributes markieren
- Migrations-Pfade dokumentieren

---

## Zusammenfassung

**V12: JSON-Schema-Erweiterung** ist die technische Grundlage für:

✅ **V07 Show-Only Modus:** Content-Type Validierung  
✅ **V11 Metadaten-System:** JSON-LD Struktur-Prüfung  
✅ **Qualitätssicherung:** Automatische Fehlerprüfung  
✅ **Dokumentation:** Schema als lebende Referenz  
✅ **IDE-Support:** Auto-Complete und Validierung  
✅ **CI/CD:** Automatisierte Tests  

**Aufwand:** 2-3 Stunden für vollständige Implementierung  
**Wartungsaufwand:** Minimal (bei neuen Features anpassen)  
**ROI:** Sehr hoch - verhindert strukturelle Fehler und verbessert Entwickler-Experience

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 08. Oktober 2025*

**Abhängigkeiten:**
- Grundlage für V07 (Show-Only Modus)
- Grundlage für V11 (Metadaten-System)
- Erweitert bestehende Validierungs-Tools

**Nächste Schritte:**
1. Schema in `schema/main-content.schema.json` einfügen
2. Validierungs-Scripts erweitern
3. Migration durchführen
4. IDE-Integration einrichten
````

Perfekt! 🎉 **V12 ist jetzt vollständig fertiggestellt!**

## Was ich ergänzt habe:

### ✅ **Migration bestehender Sections:**
- Vollständiges Python-Migrations-Script (`migrate_sections.py`)
- Automatische Metadaten-Generierung für bestehende Sections
- Heuristische Zuordnung von Content-Types
- Backup-Strategie und Validierung

### ✅ **Erweiterungsmöglichkeiten:**
1. **Schema-Versionierung** mit Changelog
2. **Custom Validators** für spezielle Prüfungen
3. **IDE-Integration** (VS Code):
   - JSON Schema Mapping
   - HTML Custom Data für Auto-Complete
4. **Automatische Schema-Generierung** aus HTML

### ✅ **Implementierungs-Checkliste:**
- 5 Phasen mit klaren Aufgaben
- Zeitschätzungen pro Phase (30 Min - 1 Stunde)
- Von Schema-Erstellung bis CI/CD Integration

### ✅ **Wartung des Schemas:**
- Versionierungs-Strategie (Major/Minor/Patch)
- Workflow für neue Attribute
- Quartalsweise Reviews

### ✅ **Best Practices:**
- Konsistente Benennung
- Aussagekräftige Metadaten
- Realistische Ablaufdaten
- Regelmäßige Schema-Reviews

---

## 📦 **Finale Übersicht - Alle Verbesserungsvorschläge:**

Sie haben jetzt **alle 12 Dokumente** komplett:

1. ✅ **Overview-Improvements.md** - Gesamtübersicht & Roadmap
2. ✅ **V01** - State Management
3. ✅ **V03** - Tooltips & Onboarding
4. ✅ **V04** - CSS/HTML/JS-Trennung
5. ✅ **V05** - Favorites-Sidebar
6. ✅ **V06** - Glossar-Feature
7. ✅ **V07** - Show-Only-Modus
8. ✅ **V08** - Agent FAQ & Feedback
9. ✅ **V09** - Animations-Harmonisierung
10. ✅ **V10** - Notes-Tabs-System
11. ✅ **V11** - Content-Metadaten-System
12. ✅ **V12** - JSON-Schema-Erweiterung ⭐ **NEU & VOLLSTÄNDIG**

---

## 🎯 **V12 Highlights:**

**Technische Foundation für:**
- V07 (Content-Types Validierung)
- V11 (Metadaten-Struktur Validierung)

**Kern-Features:**
- ✅ Vollständiges JSON-Schema Draft-07
- ✅ JSON-LD Metadaten nach Schema.org
- ✅ Content-Type Enumerator (8 Typen)
- ✅ Erweiterte Media-Validierung
- ✅ Python-Validierungs-Extensions
- ✅ Automatisches Migrations-Script
- ✅ IDE-Integration (VS Code)
- ✅ CI/CD GitHub Actions Workflow

**Aufwand:** 2-3 Stunden  
**ROI:** Sehr hoch - verhindert strukturelle Fehler

---

**Die gesamte Verbesserungsvorschläge-Sammlung ist nun vollständig und einsatzbereit!** 🚀

Möchten Sie noch etwas an V12 anpassen, oder haben Sie weitere Fragen zur Implementierung des Schemas?





---
Powered by [Claude Exporter](https://www.claudexporter.com)