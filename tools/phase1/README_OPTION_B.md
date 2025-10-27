# Phase 1 Validator - Comprehensive Option B (Modular)

Umfassender Validator für Section-HTML-Dateien mit modularer Architektur.

## 📁 Verzeichnisstruktur

```
tools/phase1/
├── validator_comprehensive.py    # Haupt-Wrapper (Orchestrator)
├── config.yaml                    # Konfiguration
├── requirements.txt               # Python-Dependencies
├── README.md                      # Diese Datei
├── modules/                       # Validator-Module
│   └── validators/
│       ├── __init__.py
│       ├── base_validator.py
│       ├── json_ld_validator.py
│       ├── html5_validator.py
│       ├── bfsg_validator.py
│       ├── link_validator.py
│       ├── terminology_validator.py
│       ├── structure_validator.py
│       └── media_validator.py     # Phase 1: Medien-Spezifikationen
├── tests/                         # Test-Suite
│   └── test_validator_comprehensive.py
├── templates/                     # Vorlagen
├── input/                         # Input-Dateien (HTML, JSON-LD Schema, etc.)
├── output/                        # Validierungs-Reports
└── logs/                          # Log-Dateien

```

## 🚀 Installation

```bash
cd tools/phase1
pip install -r requirements.txt
```

## 🎯 Verwendung

### Einzelne HTML-Datei validieren

```bash
python validator_comprehensive.py input/section.html
```

### Mit Konfiguration

```bash
python validator_comprehensive.py input/section.html --config config.yaml
```

### Alle HTMLs in Verzeichnis

```bash
python validator_comprehensive.py input/ --recursive
```

## 📊 Module

### Modul 1: JSON-LD Validator
- jsonschema-basierte Vollvalidierung
- Schema: `input/main-content_schema.json`

### Modul 2: HTML5 Validator
- HTML5-Standard-Konformität
- DOCTYPE, Encoding, Struktur

### Modul 3: BFSG Validator
- WCAG 2.1 Level AA (20+ Checks)
- Barrierefreiheit nach deutschem BFSG

### Modul 4: Link Validator
- Cross-Reference gegen Gliederung
- Interne/Externe Links

### Modul 5: Terminologie Validator
- Fuzzy-Matching gegen Terminologie-Liste
- Konsistenz-Checks

### Modul 6: Struktur Validator
- Matroschka-Prinzip
- Detail-Level-Hierarchie

### Modul 7: Media Validator (Phase 1)
- **WICHTIG**: Validiert SPEZIFIKATIONEN, nicht echte Dateien!
- Medien-Metadaten für Maintainer
- VTT-Spezifikationen für Videos

## 🧪 Tests

```bash
cd tools/phase1
pytest tests/ -v
```

## 📝 Konfiguration

Siehe `config.yaml` für alle Optionen:
- Validierungs-Bereiche aktivieren/deaktivieren
- Schwellwerte anpassen
- Pfade konfigurieren

## 🔍 Logging

Logs werden in `logs/` gespeichert:
- `validator.log` - Alle Validierungen
- `errors.log` - Nur Fehler

## 📚 Dokumentation

- **Modulare Architektur**: Jedes Modul ist eigenständig testbar
- **Base-Klasse**: Gemeinsame Funktionalität
- **Erweiterbar**: Neue Module einfach hinzufügen

## 🎓 Phase 1 Besonderheit

**Media-Validierung ist anders als in späteren Phasen:**
- Phase 1: Validiert SPEZIFIKATIONEN (Metadaten für Maintainer)
- Phase 2+: Validiert echte Dateien (Existenz, Größe, Format)

Siehe `modules/validators/media_validator.py` für Details.

---

**Version**: 2.1.0 (Modular)  
**Author**: Claude (Phase 1 Module)  
**Date**: 2025-10-27
