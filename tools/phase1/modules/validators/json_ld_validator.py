"""
Modul 1: JSON-LD Vollvalidierung

Validiert JSON-LD mit vollständigem jsonschema.

Prüft:
- JSON-LD script-Tag vorhanden
- JSON valide
- Vollständige Schema-Validierung gegen section-metadata.schema.json
- Alle Pflichtfelder, Typen, Patterns, Enums

Author: Claude (Phase 1 Module)
Date: 2025-10-27
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Tuple
from bs4 import BeautifulSoup
import logging

try:
    import jsonschema
except ImportError:
    jsonschema = None

from .base_validator import BaseValidator

logger = logging.getLogger(__name__)


class JsonLdValidator(BaseValidator):
    """
    Validiert JSON-LD mit vollständigem jsonschema.
    """
    
    def __init__(self, config: Dict = None):
        """
        Initialisiert JSON-LD Validator.
        
        Args:
            config: Konfiguration mit:
                - json_schema_path: Pfad zu section-metadata.schema.json
        """
        super().__init__(config)
        
        self.json_schema = None
        schema_path = self.config.get('json_schema_path')
        
        if schema_path and Path(schema_path).exists():
            try:
                with open(schema_path, 'r', encoding='utf-8') as f:
                    self.json_schema = json.load(f)
                logger.info(f"✅ JSON-LD Schema geladen: {schema_path}")
            except Exception as e:
                logger.warning(f"⚠️ JSON-LD Schema konnte nicht geladen werden: {e}")
        else:
            logger.warning("⚠️ Kein JSON-LD Schema angegeben - nur Basis-Validierung")
    
    def validate(self, soup: BeautifulSoup, html_path: str = None, **kwargs) -> Tuple[List[Dict], List[Dict]]:
        """
        Validiert JSON-LD.
        
        Args:
            soup: BeautifulSoup-Objekt
            
        Returns:
            Tuple[errors, warnings]
        """
        errors = []
        warnings = []
        
        # 1. Finde JSON-LD script-Tag
        json_ld_script = soup.find('script', type='application/ld+json')
        
        if not json_ld_script:
            errors.append(self._create_error(
                'json-ld',
                "JSON-LD script-Tag fehlt",
                location="<head> oder <section>",
                severity="critical"
            ))
            return errors, warnings
        
        # 2. Parse JSON
        try:
            json_ld = json.loads(json_ld_script.string)
        except json.JSONDecodeError as e:
            errors.append(self._create_error(
                'json-ld',
                f"JSON-LD ist nicht valide: {e}",
                location=f"<script type='application/ld+json'> Zeile {e.lineno}",
                severity="critical"
            ))
            return errors, warnings
        
        # 3. Schema-Validierung (wenn Schema geladen)
        if self.json_schema and jsonschema:
            try:
                jsonschema.validate(instance=json_ld, schema=self.json_schema)
                logger.debug("✅ JSON-LD Schema-Validierung erfolgreich")
            except jsonschema.ValidationError as e:
                # Haupt-Fehler
                error_path = " → ".join(str(p) for p in e.path) if e.path else "root"
                errors.append(self._create_error(
                    'json-ld-schema',
                    f"Schema-Validierung fehlgeschlagen: {e.message}",
                    location=f"JSON-LD.{error_path}",
                    severity="error",
                    details={
                        "validator": e.validator,
                        "validator_value": str(e.validator_value)[:100]
                    }
                ))
                
                # Zusätzliche Kontext-Fehler
                for suberror in e.context:
                    sub_path = " → ".join(str(p) for p in suberror.path) if suberror.path else "root"
                    errors.append(self._create_error(
                        'json-ld-schema',
                        f"{suberror.message}",
                        location=f"JSON-LD.{sub_path}",
                        severity="error"
                    ))
            
            except jsonschema.SchemaError as e:
                # Schema selbst ist fehlerhaft (sollte nicht passieren)
                errors.append(self._create_error(
                    'json-ld-schema',
                    f"JSON-LD Schema ist fehlerhaft: {e}",
                    location="Schema-Datei",
                    severity="critical"
                ))
        
        else:
            # Keine Schema-Validierung möglich, nur Basis-Checks
            if not self.json_schema:
                warnings.append(self._create_warning(
                    'json-ld',
                    "JSON-LD Schema nicht geladen - nur Basis-Validierung möglich",
                    location="Validator-Konfiguration"
                ))
            
            # Fallback: Manuelle Pflichtfeld-Prüfung
            required_fields = ["@context", "@type", "identifier", "name", "description", "inLanguage"]
            for field in required_fields:
                if field not in json_ld:
                    errors.append(self._create_error(
                        'json-ld',
                        f"Pflichtfeld fehlt: {field}",
                        location="JSON-LD root",
                        severity="error"
                    ))
        
        # 4. Zusätzliche Plausibilitäts-Checks (unabhängig von Schema)
        
        # Check: @context ist schema.org
        if json_ld.get("@context") != "https://schema.org":
            warnings.append(self._create_warning(
                'json-ld',
                f"@context sollte 'https://schema.org' sein, gefunden: '{json_ld.get('@context')}'",
                location="JSON-LD.@context"
            ))
        
        # Check: @type ist LearningResource
        if json_ld.get("@type") != "LearningResource":
            warnings.append(self._create_warning(
                'json-ld',
                f"@type sollte 'LearningResource' sein, gefunden: '{json_ld.get('@type')}'",
                location="JSON-LD.@type"
            ))
        
        # Check: timeRequired Format (wenn vorhanden)
        if "timeRequired" in json_ld:
            time_req = json_ld["timeRequired"]
            if not re.match(r'^PT\d+M$', time_req):
                errors.append(self._create_error(
                    'json-ld',
                    f"timeRequired hat ungültiges Format: '{time_req}' (erwartet: 'PT5M', 'PT10M', etc.)",
                    location="JSON-LD.timeRequired",
                    severity="error"
                ))
        
        # Check: version Format (wenn vorhanden)
        if "version" in json_ld:
            version = json_ld["version"]
            if not re.match(r'^\d+\.\d+\.\d+$', version):
                errors.append(self._create_error(
                    'json-ld',
                    f"version hat ungültiges Format: '{version}' (erwartet: SemVer wie '1.0.0')",
                    location="JSON-LD.version",
                    severity="error"
                ))
        
        logger.debug(f"JSON-LD Validierung: {len(errors)} Fehler, {len(warnings)} Warnungen")
        
        return errors, warnings
