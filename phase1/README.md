# Phase 1 Orchestrator - Section-Erstellung

Orchestriert die Erstellung von Section-HTMLs basierend auf der Gliederung aus Phase 0.5.

## 📁 Projektstruktur

```
phase1/
├── orchestrator.py              # Haupt-Orchestrierung
├── config.yaml                  # Konfiguration
├── requirements.txt             # Python-Abhängigkeiten
├── modules/                     # Module (aktuell Dummy-Implementierungen)
│   ├── gliederung_loader.py     # ✅ VOLLSTÄNDIG IMPLEMENTIERT
│   ├── context_extractor.py     # ⏳ Dummy (wird als nächstes implementiert)
│   ├── html_loader.py           # ⏳ Dummy
│   ├── prompt_generator.py      # ⏳ Dummy
│   └── validator.py             # ⏳ Dummy
├── tests/                       # Test-Suite (pre-commit)
│   └── test_orchestrator.py     # ✅ Basis-Tests implementiert
├── templates/                   # Templates (noch zu erstellen)
│   ├── prompt-phase1.md         # Prompt-Template
│   └── example-sections/        # Beispiel-Sections (Hybrid A+C)
├── output/                      # Output-Verzeichnisse (automatisch erstellt)
│   ├── prompts/                 # Generierte Prompts
│   ├── contexts/                # Extrahierte Kontexte (Debug)
│   └── sections/                # Fertige Section-HTMLs
└── output-phase0.5-final.json   # Mock-Datei (33 Sections)
```

## 🚀 Installation

```bash
# Python-Abhängigkeiten installieren
pip install -r requirements.txt

# Tests ausführen (pre-commit)
pytest tests/ -v
```

## 🎯 Verwendung

### Standard-Durchlauf (alle Sections)

```bash
python orchestrator.py
```

### Ab bestimmter Section starten (Resume)

```bash
python orchestrator.py --start axiom-case-creation
```

### Mit anderer Konfiguration

```bash
python orchestrator.py --config custom-config.yaml
```

## 🔧 Konfiguration

Alle Einstellungen in `config.yaml`:

- **Pfade**: Input/Output-Verzeichnisse
- **Validierung**: Welche Checks ausgeführt werden
- **Kontext**: Anzahl Vorgänger/Nachfolger
- **Workflow**: Auto-Continue, Context-Speicherung
- **Logging**: Level, Datei

## 📝 Workflow

Für jede Section:

1. **Kontext extrahieren**
   - Lädt aktuelle Section-Metadaten
   - Lädt 2 Vorgänger-Sections (Metadaten + HTML)
   - Lädt 2 Nachfolger-Sections (nur Metadaten)
   - Lädt Prerequisites (Metadaten + HTML)
   - Lädt Cross-References (nur Metadaten)

2. **Prompt generieren**
   - Füllt Prompt-Template mit Kontext
   - Fügt Strategiedokument hinzu
   - Fügt JSON-LD Schema hinzu
   - Fügt HTML-Template-Spezifikation hinzu
   - Fügt Terminologie-Entscheidungsliste hinzu
   - Speichert in `output/prompts/prompt-{section_id}.md`

3. **Manueller KI-Durchlauf** ⏸️
   - Benutzer öffnet Prompt
   - Führt KI-Generierung durch
   - Speichert Output in `output/sections/section-{section_id}.html`
   - Drückt Enter zum Fortfahren

4. **Output validieren**
   - JSON-LD valide?
   - HTML-Syntax korrekt?
   - BFSG-konform?
   - Links valide?
   - Terminologie-Tags vorhanden?

## 🧪 Tests

### Alle Tests ausführen

```bash
pytest tests/ -v
```

### Mit Coverage

```bash
pytest tests/ --cov=modules --cov-report=html
```

### Pre-Commit Hook einrichten

```bash
# In .git/hooks/pre-commit
#!/bin/bash
cd phase1
pytest tests/ -v
if [ $? -ne 0 ]; then
    echo "❌ Tests fehlgeschlagen. Commit abgebrochen."
    exit 1
fi
```

## 📊 Aktueller Status

### ✅ Fertig

- Orchestrator-Grundgerüst
- Konfiguration (YAML)
- `gliederung_loader.py` vollständig implementiert
- Basis-Tests für pre-commit Hook
- Mock-Datei mit 33 Sections

### ⏳ Nächste Schritte

1. `context_extractor.py` vollständig implementieren
2. Tests für `context_extractor.py` schreiben
3. `html_loader.py` vollständig implementieren
4. Tests für `html_loader.py` schreiben
5. Prompt-Template erstellen
6. `prompt_generator.py` vollständig implementieren
7. Beispiel-Sections erstellen (Hybrid A+C)
8. `validator.py` vollständig implementieren

## 🔍 Module im Detail

### 1. `gliederung_loader.py` ✅

**Status**: Vollständig implementiert

**Funktionen**:
- Lädt `output-phase0.5-final.json`
- Baut Predecessor/Successor-Kette auf
- Stellt Query-Interface bereit
- Findet Vorgänger, Nachfolger, Prerequisites, Cross-References

### 2. `context_extractor.py` ⏳

**Status**: Dummy-Implementierung

**TODO**:
- Vollständige Kontext-Extraktion
- HTML-Loading für Vorgänger und Prerequisites
- Error-Handling

### 3. `html_loader.py` ⏳

**Status**: Dummy-Implementierung

**TODO**:
- HTML-Loading aus `output/sections/`
- Fallback auf Beispiel-Sections
- Mapping von Section-IDs zu Beispiel-Dateien

### 4. `prompt_generator.py` ⏳

**Status**: Dummy-Implementierung

**TODO**:
- Template-Loading
- Template-Filling mit Kontext
- Einbindung von Strategiedokument, Schema, etc.

### 5. `validator.py` ⏳

**Status**: Dummy-Implementierung

**TODO**:
- JSON-LD Validierung
- HTML-Syntax Prüfung
- BFSG-Konformität
- Link-Validierung
- Terminologie-Tags Check

## 📚 Referenzen

- **Phase 0.5 Continuation Prompt**: `continuation-prompt-phase-0_5.md`
- **Strategiedokument**: `Strategiedokument_Beispiel__AXIOM_Examine.md`
- **HTML-Template-Spezifikation**: `Phase_1__HTML-Template_Spezifikation__Matroschka-Prinzip_.md`
- **JSON-LD Schema**: `main-content_schema.json`
- **Terminologie**: `Terminologie-Entscheidungsliste.md`

## 🐛 Debugging

### Context-Extraktion debuggen

```bash
# Context-Speicherung aktivieren (in config.yaml)
workflow:
  save_contexts: true

# Contexts werden gespeichert in: output/contexts/context-{section_id}.json
```

### Logging-Level erhöhen

```bash
# In config.yaml
logging:
  level: "DEBUG"
```

## 📝 Lizenz

Internes Projekt - WebAssistant Forensics
