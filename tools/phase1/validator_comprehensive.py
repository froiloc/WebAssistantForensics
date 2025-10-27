"""
Validator Comprehensive - Haupt-Wrapper (Orchestrator)

Orchestriert alle 7 Validierungs-Module für Section-HTML-Dateien.

Usage:
    python validator_comprehensive.py input/section.html
    python validator_comprehensive.py input/ --recursive
    python validator_comprehensive.py input/section.html --config config.yaml

Author: Claude (Phase 1 Module - Option B Modular)
Date: 2025-10-27
Version: 2.1.0
"""

import argparse
import json
import logging
import sys
import yaml
from pathlib import Path
from typing import Dict, List, Optional
from bs4 import BeautifulSoup

# Import Validators
from modules.validators import (
    JsonLdValidator,
    Html5Validator,
    BfsgValidator,
    LinkValidator,
    TerminologyValidator,
    StructureValidator,
    MediaValidator
)


class ValidatorComprehensive:
    """
    Haupt-Orchestrator für alle Validierungs-Module.
    
    Koordiniert die 7 Module:
    1. JSON-LD (jsonschema)
    2. HTML5 (html5lib)
    3. BFSG (WCAG 2.1)
    4. Links (Cross-References)
    5. Terminologie (Fuzzy-Matching)
    6. Struktur (Matroschka)
    7. Media (Phase 1: Spezifikationen)
    """
    
    def __init__(self, config_path: str = None):
        """
        Initialisiert den Comprehensive Validator.
        
        Args:
            config_path: Pfad zur config.yaml (optional)
        """
        # Lade Konfiguration
        self.config = self._load_config(config_path)
        
        # Setup Logging
        self._setup_logging()
        
        # Statistiken
        self.stats = {
            "validated": 0,
            "errors": 0,
            "warnings": 0,
            "by_type": {}
        }
        
        # Initialisiere Module
        self._init_modules()
        
        self.logger.info("🚀 ValidatorComprehensive initialisiert (Option B - Modular)")
    
    def _load_config(self, config_path: str = None) -> Dict:
        """Lädt Konfiguration aus YAML."""
        if config_path and Path(config_path).exists():
            with open(config_path, 'r') as f:
                return yaml.safe_load(f)
        
        # Default-Konfiguration
        return {
            'general': {
                'fail_on_errors': True,
                'fail_on_warnings': False,
                'max_errors_before_abort': 50
            },
            'modules': {
                'json_ld': True,
                'html5': True,
                'bfsg': True,
                'links': True,
                'terminology': True,
                'structure': True,
                'media': True
            },
            'paths': {
                'output_dir': 'output',
                'log_dir': 'logs'
            },
            'logging': {
                'level': 'INFO',
                'console': True
            }
        }
    
    def _setup_logging(self):
        """Setup Logging-Konfiguration."""
        log_config = self.config.get('logging', {})
        level = getattr(logging, log_config.get('level', 'INFO'))
        
        # Format
        formatter = logging.Formatter(
            log_config.get('format', '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        )
        
        # Root Logger
        self.logger = logging.getLogger('validator_comprehensive')
        self.logger.setLevel(level)
        
        # Console Handler
        if log_config.get('console', True):
            console_handler = logging.StreamHandler()
            console_handler.setFormatter(formatter)
            self.logger.addHandler(console_handler)
        
        # File Handler
        log_file_path = log_config.get('file')
        if log_file_path:
            log_file = Path(log_file_path)
            log_file.parent.mkdir(parents=True, exist_ok=True)
            
            file_handler = logging.FileHandler(log_file)
            file_handler.setFormatter(formatter)
            self.logger.addHandler(file_handler)
    
    def _init_modules(self):
        """Initialisiert alle Validierungs-Module."""
        module_config = self.config.get('modules', {})
        paths = self.config.get('paths', {})
        
        # 1. JSON-LD Validator
        self.json_ld_validator = JsonLdValidator({
            'enabled': module_config.get('json_ld', True),
            'json_schema_path': paths.get('json_schema')
        })
        
        # 2. HTML5 Validator
        self.html5_validator = Html5Validator({
            'enabled': module_config.get('html5', True)
        })
        
        # 3. BFSG Validator
        self.bfsg_validator = BfsgValidator({
            'enabled': module_config.get('bfsg', True)
        })
        
        # 4. Link Validator
        self.link_validator = LinkValidator({
            'enabled': module_config.get('links', True),
            'gliederung_loader': None  # TODO: Implementieren wenn benötigt
        })
        
        # 5. Terminologie Validator
        self.terminology_validator = TerminologyValidator({
            'enabled': module_config.get('terminology', True),
            'terminology_path': paths.get('terminology'),
            'fuzzy_threshold': self.config.get('terminology', {}).get('fuzzy_threshold', 80)
        })
        
        # 6. Struktur Validator
        self.structure_validator = StructureValidator({
            'enabled': module_config.get('structure', True)
        })
        
        # 7. Media Validator (Phase 1)
        media_config = self.config.get('media', {})
        self.media_validator = MediaValidator({
            'enabled': module_config.get('media', True),
            'allowed_image_formats': media_config.get('allowed_image_formats', ['PNG', 'JPG', 'JPEG', 'WebP', 'SVG']),
            'allowed_video_formats': media_config.get('allowed_video_formats', ['MP4', 'WebM']),
            'min_resolution': media_config.get('min_resolution', '400x300')
        })
        
        self.logger.info("✓ Alle 7 Validierungs-Module initialisiert")
    
    def validate_section_html(self, html_path: str, section_id: Optional[str] = None) -> Dict:
        """
        Validiert eine Section-HTML-Datei umfassend.
        
        Args:
            html_path: Pfad zur HTML-Datei
            section_id: Optional Section-ID für Link-Validierung
            
        Returns:
            Dictionary mit Validierungsergebnis
        """
        self.logger.info(f"🔍 Starte umfassende Validierung: {html_path}")
        
        errors = []
        warnings = []
        
        # HTML laden
        try:
            with open(html_path, 'r', encoding='utf-8') as f:
                html_content = f.read()
        except FileNotFoundError:
            return self._create_result(False, [
                {"type": "file", "message": f"Datei nicht gefunden: {html_path}", "location": "filesystem"}
            ], [])
        except Exception as e:
            return self._create_result(False, [
                {"type": "file", "message": f"Fehler beim Laden: {e}", "location": "filesystem"}
            ], [])
        
        # Parse HTML
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # 1. JSON-LD Validierung
        if self.json_ld_validator.is_enabled():
            json_errors, json_warnings = self.json_ld_validator.validate(soup)
            errors.extend(json_errors)
            warnings.extend(json_warnings)
        
        # 2. HTML5 Validierung
        if self.html5_validator.is_enabled():
            html_errors, html_warnings = self.html5_validator.validate(soup, html_path, html_content)
            errors.extend(html_errors)
            warnings.extend(html_warnings)
        
        # 3. BFSG Validierung
        if self.bfsg_validator.is_enabled():
            bfsg_errors, bfsg_warnings = self.bfsg_validator.validate(soup)
            errors.extend(bfsg_errors)
            warnings.extend(bfsg_warnings)
        
        # 4. Link Validierung
        if self.link_validator.is_enabled():
            link_errors, link_warnings = self.link_validator.validate(soup, html_path, section_id)
            errors.extend(link_errors)
            warnings.extend(link_warnings)
        
        # 5. Terminologie Validierung
        if self.terminology_validator.is_enabled():
            term_errors, term_warnings = self.terminology_validator.validate(soup)
            errors.extend(term_errors)
            warnings.extend(term_warnings)
        
        # 6. Struktur Validierung
        if self.structure_validator.is_enabled():
            struct_errors, struct_warnings = self.structure_validator.validate(soup)
            errors.extend(struct_errors)
            warnings.extend(struct_warnings)
        
        # 7. Media Validierung (Phase 1)
        if self.media_validator.is_enabled():
            media_errors, media_warnings = self.media_validator.validate(soup, html_path)
            errors.extend(media_errors)
            warnings.extend(media_warnings)
        
        # Statistiken aktualisieren
        self._update_stats(errors, warnings)
        
        # Ergebnis
        valid = len(errors) == 0
        
        if valid:
            self.logger.info("✅ Umfassende Validierung erfolgreich")
        else:
            self.logger.warning(f"⚠️  Validierung mit {len(errors)} Fehler(n) und {len(warnings)} Warnung(en)")
        
        return self._create_result(valid, errors, warnings)
    
    def _create_result(self, valid: bool, errors: List[Dict], warnings: List[Dict]) -> Dict:
        """Erstellt Validierungs-Result-Dictionary."""
        return {
            "valid": valid,
            "errors": errors,
            "warnings": warnings,
            "stats": {
                "total_errors": len(errors),
                "total_warnings": len(warnings),
                "by_type": self._count_by_type(errors, warnings)
            }
        }
    
    def _count_by_type(self, errors: List[Dict], warnings: List[Dict]) -> Dict:
        """Zählt Errors/Warnings nach Typ."""
        counts = {}
        for item in errors + warnings:
            item_type = item.get("type", "unknown")
            counts[item_type] = counts.get(item_type, 0) + 1
        return counts
    
    def _update_stats(self, errors: List[Dict], warnings: List[Dict]):
        """Aktualisiert Statistiken."""
        self.stats["validated"] += 1
        self.stats["errors"] += len(errors)
        self.stats["warnings"] += len(warnings)
        
        for item in errors + warnings:
            item_type = item.get("type", "unknown")
            self.stats["by_type"][item_type] = self.stats["by_type"].get(item_type, 0) + 1
    
    def get_stats(self) -> Dict:
        """Gibt Validierungs-Statistiken zurück."""
        return self.stats.copy()
    
    def reset_stats(self):
        """Setzt Statistiken zurück."""
        self.stats = {
            "validated": 0,
            "errors": 0,
            "warnings": 0,
            "by_type": {}
        }


def main():
    """CLI Entry Point."""
    parser = argparse.ArgumentParser(
        description='Validator Comprehensive (Option B) - Phase 1',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Beispiele:
  %(prog)s input/section.html
  %(prog)s input/section.html --config config.yaml
  %(prog)s input/section.html --section-id section-1-1
        '''
    )
    
    parser.add_argument('html_path', help='Pfad zur HTML-Datei')
    parser.add_argument('--config', help='Pfad zur config.yaml')
    parser.add_argument('--section-id', help='Section-ID für Link-Validierung')
    parser.add_argument('--output', help='Ausgabe-Datei für JSON-Report')
    
    args = parser.parse_args()
    
    # Initialisiere Validator
    validator = ValidatorComprehensive(args.config)
    
    # Validiere
    result = validator.validate_section_html(args.html_path, args.section_id)
    
    # Output
    json_output = json.dumps(result, indent=2, ensure_ascii=False)
    
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(json_output)
        print(f"✓ Report gespeichert: {args.output}")
    else:
        print(json_output)
    
    # Exit Code
    sys.exit(0 if result['valid'] else 1)


if __name__ == '__main__':
    main()
