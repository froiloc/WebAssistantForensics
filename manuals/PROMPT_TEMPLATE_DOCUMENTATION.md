# Prompt-Template - Implementierungs-Dokumentation

**Datum**: 2025-10-24  
**Status**: ✅ Vollständig erstellt

---

## 📋 Übersicht

Das **Prompt-Template** ist das zentrale Dokument für Phase 1. Es instruiert die KI, wie sie Section-HTMLs erstellen soll.

---

## ✅ Was wurde erstellt?

### 1. Haupt-Template (`prompt-phase1.md`)

**Größe**: ~25 KB (ohne Anhänge)  
**Struktur**: 10 Hauptabschnitte

#### Abschnitte

1. **Aufgabe** - Was soll erstellt werden?
2. **Section-Übersicht** - Metadaten der aktuellen Section
3. **Kontext** - Einordnung in Gesamtgliederung
4. **Vorgänger-Sections** - HTML-Content als Referenz
5. **Nachfolger-Sections** - Metadaten für Vorbereitung
6. **Prerequisites** - Inhaltliche Abhängigkeiten
7. **Cross-References** - Verwandte Sections
8. **Ressourcen** - Strategiedokument, Schema, etc.
9. **Aufgabenbeschreibung** - Detaillierte Anweisungen
10. **Output-Format** - HTML-Struktur mit Beispielen

#### Besonderheiten

**Platzhalter-System:**
Das Template verwendet Handlebars-Syntax für dynamische Inhalte:
- `{{section_id}}` - ID der Section
- `{{section_title}}` - Titel der Section
- `{{#if predecessors}}...{{/if}}` - Bedingte Blöcke
- `{{#each key_topics}}...{{/each}}` - Schleifen

**Beispiel:**
```handlebars
**Section-ID:** `{{section_id}}`  
**Titel:** {{section_title}}

{{#each key_topics}}
- {{this}}
{{/each}}
```

---

### 2. JSON-Schema für Terminologie-Tags (`terminology-keywords-schema.json`)

**Größe**: ~3 KB  
**Zweck**: Definiert Struktur der `keywords`-Array im JSON-LD Block

#### Schema-Struktur

```json
{
  "term": "Begrif",           // PFLICHT
  "language": "de|en",        // PFLICHT
  "status": "approved|proposed|deprecated",  // PFLICHT
  "type": "domain-concept|technical-term|ui-element|legal-term",  // PFLICHT
  "tool": "AXIOM",           // Nur bei ui-element
  "synonym": "...",          // Optional
  "context": "...",          // Optional
  "definition": "..."        // Optional
}
```

#### Typen

- **`domain-concept`**: Fachbegriff aus der Forensik (z.B. "Evidenzquelle")
- **`technical-term`**: Technischer Begriff (z.B. "Hash", "SQLite")
- **`ui-element`**: UI-Element aus AXIOM (z.B. "Artifacts Explorer")
- **`legal-term`**: Juristischer Begriff (z.B. "Beschlagnahme")
- **`methodology`**: Methodischer Begriff (z.B. "Prüfsummenvergleich")
- **`file-format`**: Dateiformat (z.B. "E01", "ZIP")

#### Validierung

Das Schema enthält:
- Required-Fields-Validierung
- Enum-Validierung für `language`, `status`, `type`
- Conditional-Validation (tool MUSS bei ui-element vorhanden sein)
- uniqueItems-Constraint (keine Duplikate)

---

### 3. Getting Started Dokument (`getting-started.md`)

**Größe**: ~18 KB  
**Zweck**: Detaillierte Stil-Richtlinien für konsistente Tonalität

#### Inhalt

1. **Zielgruppe** - Demografische Merkmale, Lernverhalten
2. **Tonalität** - Subtil-unterstützend, sachlich
3. **Sprachstil** - Satzstruktur, Formulierungsmuster
4. **Gestaltungselemente** - Warnungen, Hinweise, Medien
5. **Terminologie** - Verwendung von Fachbegriffen
6. **Häufige Fehler** - Was zu vermeiden ist
7. **Detail-Level-System** - Level 1, 2, 3 erklärt
8. **Matroschka-Prinzip** - Wie Levels aufeinander aufbauen
9. **Checkliste** - Guter Stil
10. **Beispiel** - Vollständige Section als Stilmuster

#### Highlights

**Tonalität-Vergleichstabelle:**
| ❌ Falsch | ✅ Richtig |
|-----------|------------|
| "Super! Du hast es geschafft!" | "Fall erfolgreich erstellt." |
| "Das ist ganz einfach!" | "Öffnen Sie File → New Case." |

**Formulierungsmuster:**
- Level 1: "Öffnen Sie File → New Case."
- Level 2: "Dieser Schritt ist wichtig, weil..."
- Level 3: "AXIOM erstellt intern eine SQLite-Datenbank."

**Matroschka-Prinzip:**
```
Level 1: Basis-Anleitung
Level 2: Level 1 + Erklärungen
Level 3: Level 2 + Technische Details
```

---

## 🔗 Integration mit Prompt-Generator

### Wie das Template gefüllt wird

Der **Prompt-Generator** (`prompt_generator.py`) lädt:

1. **Template** (`prompt-phase1.md`)
2. **Kontext** (vom Context-Extractor)
3. **Ressourcen** (Strategiedokument, Schema, etc.)

Und füllt alle Platzhalter:

```python
template = load_template('prompt-phase1.md')
context = extractor.extract_context(section_id)

# Fülle Platzhalter
prompt = template.render(
    section_id=context['current_section']['sectionId'],
    section_title=context['current_section']['title'],
    key_topics=context['current_section']['keyTopics'],
    predecessors=context['predecessors'],
    # ... etc.
)
```

---

## 📊 Prompt-Struktur-Übersicht

### Aufbau (Makro-Ebene)

```
1. Aufgabe & Kontext           (~2 KB)
   ├─ Was soll erstellt werden?
   └─ Section-Metadaten

2. Kontext-Informationen        (~5-10 KB)
   ├─ Vorgänger-HTML
   ├─ Nachfolger-Metadaten
   ├─ Prerequisites-HTML
   └─ Cross-References

3. Ressourcen (Hybrid)          (~15-20 KB)
   ├─ Wichtigste Punkte (explizit)
   └─ Vollständige Dokumente (Anhänge)

4. Aufgabenbeschreibung         (~3 KB)
   ├─ Content-Anforderungen
   ├─ Stil-Anforderungen
   ├─ Technische Anforderungen
   └─ Terminologie-Anforderungen

5. Output-Format                (~4 KB)
   ├─ HTML-Struktur
   ├─ JSON-LD Block
   └─ Terminologie-Tags

6. Qualitätskriterien           (~2 KB)
   └─ Checkliste

7. Anhänge                      (~40-60 KB)
   ├─ Strategiedokument
   ├─ JSON-LD Schema
   ├─ HTML-Template-Spezifikation
   ├─ Terminologie-Entscheidungsliste
   └─ Getting Started Dokument

GESAMT: ~70-110 KB pro Prompt
```

---

## 🎯 Design-Entscheidungen (Recap)

Basierend auf deinen Antworten:

### A1: Ressourcen - Option C (Hybrid)
**Umsetzung:**
- Wichtigste Punkte in Abschnitt "Ressourcen" (explizit)
- Vollständige Dokumente in Anhängen A-E
- **Vorteil**: KI sieht wichtigste Punkte sofort, kann bei Bedarf in Anhänge schauen

### A2: Vorgänger-HTML - Option A (Komplett)
**Umsetzung:**
- Vollständiges `<section>`-Element eingefügt
- Kein separater Summary-Block
- **Vorteil**: KI sieht vollständigen Kontext inkl. JSON-LD, Struktur, Stil

### A3: Stil-Richtlinien - Option C (Beides)
**Umsetzung:**
- Wichtigste Stil-Regeln in Abschnitt "Ressourcen"
- Vollständiges Getting Started Dokument in Anhang E
- **Vorteil**: KI hat wichtigste Regeln präsent, kann Details nachschlagen

### A4: Terminologie-Tags - Option A (Automatisch)
**Umsetzung:**
- KI generiert `keywords`-Array automatisch
- Abschnitt "Terminologie-Tags" mit detaillierten Anweisungen
- JSON-Schema als Referenz
- **Vorteil**: Automatisierung, manuelle Korrektur später möglich

### A5: Beispiele - Option B (Nur als Vorgänger)
**Umsetzung:**
- Keine separaten Beispiele im Prompt
- Beispiel-Sections werden als Vorgänger eingefügt (erste 2 Sections)
- Getting Started enthält Code-Snippets
- **Vorteil**: Nutzt Hybrid-Ansatz (A+C), keine Redundanz

---

## 📝 Verwendung

### Manuelle Nutzung (Test)

1. Kopiere Template-Inhalt
2. Ersetze Platzhalter manuell
3. Füge Ressourcen als Anhänge ein
4. Gib Prompt an KI

### Automatische Nutzung (Produktiv)

```python
# Im Orchestrator
prompt = self.prompt_generator.generate_prompt(context)
prompt_path = self._save_prompt(prompt, section_id)

# Maintainer öffnet Prompt und führt KI-Generierung durch
```

---

## ✅ Qualitätssicherung

### Template-Validierung

**Prüfpunkte:**
- [ ] Alle Platzhalter definiert
- [ ] Handlebars-Syntax korrekt
- [ ] Abschnitte logisch strukturiert
- [ ] Ressourcen vollständig referenziert
- [ ] Beispiele korrekt
- [ ] Checkliste vollständig

### JSON-Schema-Validierung

**Prüfpunkte:**
- [ ] Valid JSON-Schema Draft 7
- [ ] Required-Fields definiert
- [ ] Enums vollständig
- [ ] Conditional-Validation korrekt
- [ ] Beispiele valide

### Getting-Started-Validierung

**Prüfpunkte:**
- [ ] Tonalität konsistent
- [ ] Beispiele korrekt
- [ ] Vergleichstabellen vollständig
- [ ] Checkliste vollständig
- [ ] Code-Snippets valide

---

## 🔄 Nächste Schritte

### Sofort (Phase 1b)

1. **Prompt-Generator vollständig implementieren**
   - Template-Loading
   - Template-Filling (Handlebars)
   - Ressourcen-Einbindung
   - Tests schreiben

2. **Test mit erster Section**
   - Generiere Prompt für `axiom-installation`
   - Führe KI-Generierung manuell durch
   - Validiere Output
   - Iteriere Template bei Bedarf

### Mittel (Phase 1c-f)

3. **HTML-Loader implementieren**
4. **Beispiel-Sections erstellen** (3 Stück)
5. **Validator implementieren**
6. **End-to-End-Test**

---

## 📚 Referenzen

### Erstellte Dateien

| Datei | Größe | Beschreibung |
|-------|-------|--------------|
| `templates/prompt-phase1.md` | ~25 KB | Haupt-Template |
| `templates/terminology-keywords-schema.json` | ~3 KB | JSON-Schema für Keywords |
| `templates/getting-started.md` | ~18 KB | Stil-Richtlinien |

### Verwendete Ressourcen (werden als Anhänge eingefügt)

| Ressource | Pfad | Größe (ca.) |
|-----------|------|-------------|
| Strategiedokument | `../Strategiedokument_Beispiel__AXIOM_Examine.md` | ~15 KB |
| JSON-LD Schema | `../main-content_schema.json` | ~8 KB |
| HTML-Template-Spez. | `../Phase_1__HTML-Template_Spezifikation__Matroschka-Prinzip_.md` | ~12 KB |
| Terminologie-Liste | `../Terminologie-Entscheidungsliste.md` | ~5 KB |

---

## 🎓 Zusammenfassung

**Was funktioniert:**
- ✅ Prompt-Template vollständig erstellt (~25 KB)
- ✅ JSON-Schema für Terminologie-Tags definiert
- ✅ Getting Started Dokument mit detaillierten Stil-Richtlinien
- ✅ Hybrid-Ansatz umgesetzt (wichtigste Punkte + Anhänge)
- ✅ Platzhalter-System für dynamische Inhalte
- ✅ Alle Design-Entscheidungen implementiert

**Was noch fehlt:**
- ⏳ Prompt-Generator (muss Template füllen)
- ⏳ Test mit echter Section
- ⏳ Beispiel-Sections (werden als Vorgänger verwendet)

**Nächster Schritt:**
Prompt-Generator vollständig implementieren, um Templates mit echten Daten zu füllen.

---

**Status**: ✅ TEMPLATE FERTIG, BEREIT FÜR IMPLEMENTATION
