"""
Validators Package - Option B (Comprehensive Validation)

Modulare Validierungs-Komponenten für Section-HTML-Dateien:
1. JSON-LD: jsonschema-basierte Validierung
2. HTML5: Standard-konforme Validierung
3. BFSG: WCAG 2.1 Level AA Checks
4. Links: Cross-Reference Validierung
5. Terminologie: Fuzzy-Matching
6. Struktur: Matroschka-Prinzip
7. Media: Medien-Spezifikations-Validierung (Phase 1)

Author: Claude (Phase 1 Module - Option B Modular)
Date: 2025-10-27
Version: 2.1 (Modular Architecture)
"""

from .base_validator import BaseValidator
from .json_ld_validator import JsonLdValidator
from .html5_validator import Html5Validator
from .bfsg_validator import BfsgValidator
from .link_validator import LinkValidator
from .terminology_validator import TerminologyValidator
from .structure_validator import StructureValidator
from .media_validator import MediaValidator

__all__ = [
    'BaseValidator',
    'JsonLdValidator',
    'Html5Validator',
    'BfsgValidator',
    'LinkValidator',
    'TerminologyValidator',
    'StructureValidator',
    'MediaValidator'
]

__version__ = "2.1.0"

# Alle Module verfügbar
print("✓ Validators Package geladen: 7 Module verfügbar")
