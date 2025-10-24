# 🚀 Validator Option B - Work in Progress

**Datum:** 2025-10-24  
**Status:** Modul 1-6 von 7 fertig - LETZTES MODUL!  
**Branch:** feature/validator-option-b

---

## ✅ Was ist fertig

### Modul 1: JSON-LD Vollvalidierung

1. **jsonschema-basierte Vollvalidierung**
   - Validiert gegen `section-metadata.schema.json`
   - Alle Pflichtfelder, Typen, Patterns, Enums
   - Detaillierte Fehler-Messages mit Location

2. **Fallback-Validierung**
   - Funktioniert auch ohne Schema
   - Basis-Checks für kritische Felder

3. **Zusätzliche Plausibilitäts-Checks**
   - timeRequired Format (PT5M, PT10M)
   - version Format (SemVer: 1.0.0)
   - @context und @type Werte

### Modul 2: HTML5 Validierung

1. **html5lib-basiertes Parsing**
   - HTML5-Standard-konforme Validierung
   - DOCTYPE und Encoding-Checks

2. **Obsolete Elemente & Attribute**
   - 13 obsolete HTML-Elemente erkannt
   - 8 obsolete Attribute mit intelligenten Ausnahmen

3. **ARIA-Validierung**
   - ~30 bekannte ARIA-Attribute
   - ~70 valide ARIA-Roles
   - Unbekannte Attribute/Roles werden gewarnt

### Modul 3: BFSG Umfassend (WCAG 2.1 Level AA)

1. **Wahrnehmbarkeit (Perceivable)**
   - Alt-Text Validierung für Bilder
   - Video-Untertitel Checks
   - Überschriften-Hierarchie

2. **Bedienbarkeit (Operable)**
   - Tastatur-Zugänglichkeit
   - Aussagekräftige Link-Texte
   - Formular-Labels (4 Erkennungsmethoden)

3. **Verständlichkeit (Understandable)**
   - Sprach-Attribute (lang)
   - Sprachwechsel-Erkennung

4. **Robustheit (Robust)**
   - Duplikat-IDs erkennen
   - ARIA Required Properties
   - Semantische HTML-Elemente bevorzugen

### Test-Ergebnisse:

```
✅ Modul 1: JSON-LD
   - 3 Fehler korrekt erkannt (ungültige Formate)
   - Valides JSON-LD akzeptiert

✅ Modul 2: HTML5
   - 2 Fehler + 9 Warnungen korrekt erkannt
   - Valides HTML5 akzeptiert

✅ Modul 3: BFSG
   - 6 Fehler + 5 Warnungen korrekt erkannt (Barrierefreiheit)
   - Barrierefreies HTML akzeptiert
```

---

## 📦 Dateien

### Core:
- `requirements.txt` - Alle Dependencies für Option A + B
- `modules/validator_comprehensive.py` - Validator mit 7 Modulen (1 fertig, 6 Stubs)
- `schemas/section-metadata.schema.json` - JSON-LD Schema für Sections

### Download-Links:

[View validator_comprehensive.py](computer:///mnt/user-data/outputs/phase1-optionB/modules/validator_comprehensive.py)  
[View section-metadata.schema.json](computer:///mnt/user-data/outputs/phase1-optionB/schemas/section-metadata.schema.json)  
[View requirements.txt](computer:///mnt/user-data/outputs/phase1-optionB/requirements.txt)

---

## 📊 Fortschritt Option B

| Modul | Status | Checks | Zeilen Code |
|-------|--------|--------|-------------|
| **1. JSON-LD** | ✅ **Fertig** | ~15 Checks | ~150 |
| **2. HTML5** | ✅ **Fertig** | ~10 Checks | ~200 |
| **3. BFSG** | ✅ **Fertig** | ~20 Checks | ~250 |
| **4. Links** | ✅ **Fertig** | ~8 Checks | ~180 |
| **5. Terminologie** | ✅ **Fertig** | ~5 Checks | ~180 |
| **6. Struktur** | ✅ **Fertig** | ~10 Checks | ~220 |
| 7. Media | ⏳ In Arbeit | ~8 Checks | — |
| **GESAMT** | **86% fertig** | **~76 Checks** | **~1000+ geplant** |

---

## 🔧 Installation

```bash
# Dependencies installieren
pip install -r requirements.txt --break-system-packages

# Test
python3 << 'EOF'
import sys
sys.path.insert(0, 'modules')
from validator_comprehensive import ValidatorComprehensive

validator = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json'
)
print("✅ Validator Option B geladen!")
EOF
```

---

## 📝 Verwendung (aktuell)

```python
from validator_comprehensive import ValidatorComprehensive

# Initialisieren mit Schema
validator = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json',
    terminology_path='data/terminology.json',  # Optional
    gliederung_loader=gliederung_loader        # Optional für Link-Validierung
)

# Section validieren
result = validator.validate_section_html('output/sections/section-test.html')

if result['valid']:
    print("✅ Validierung erfolgreich")
else:
    print(f"❌ {len(result['errors'])} Fehler:")
    for error in result['errors']:
        print(f"  [{error['type']}] {error['message']}")
        print(f"  → {error['location']}")
```

---

## 🎯 Nächste Schritte

### Sofort (Modul 2):
- HTML5 Validierung mit html5lib
- ~10 zusätzliche Checks
- ~100 Zeilen Code

### Danach:
- Modul 3: BFSG erweitert (~4h)
- Modul 4: Link Cross-References (~2h)
- Modul 5: Terminologie Fuzzy-Match (~3h)
- Modul 6: Struktur-Validierung (~2h)
- Modul 7: Media-Validierung (~2h)

**Geschätzte Gesamt-Zeit:** ~15h für alle 7 Module

---

## 🧪 Tests (geplant)

Nach Fertigstellung aller Module:
- `tests/test_validator_comprehensive.py`
- ~50 Tests für alle 7 Module
- Mock-HTMLs für verschiedene Fehler-Szenarien

---

## ⚠️ Wichtig

**Option B ist noch in Entwicklung!**

Für produktiven Einsatz bitte **Option A** verwenden:
- `modules/validator.py` (vollständig getestet)
- 19 Tests, alle bestehen
- 22 Basis-Checks für kritische Fehler

---

## 📚 Dependencies (Option B)

- beautifulsoup4 (4.14.2) - HTML-Parsing
- lxml (6.0.2) - XML/HTML-Parser
- html5lib (1.1) - HTML5-Validierung
- jsonschema (4.25.1) - Schema-Validierung
- python-Levenshtein (0.27.1) - Fuzzy-Matching
- rapidfuzz (3.14.1) - Schnelles Fuzzy-Matching
- Pillow (11.3.0) - Bild-Validierung
- pyyaml (6.0.3) - Config

---

**Status:** Work in Progress - Modul 1-6 von 7 fertig - LETZTES MODUL! ✅
