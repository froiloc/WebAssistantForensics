#!/usr/bin/env python3
"""
Phase 1 Orchestrator - Section-Erstellung koordinieren

Workflow:
1. Lädt Gliederung (output-phase0.5-final.json)
2. Für jede Section (in Reihenfolge):
   a) Extrahiert Kontext (Vorgänger, Nachfolger, Prerequisites)
   b) Generiert Prompt für KI
   c) Wartet auf manuellen KI-Durchlauf
   d) Validiert Output
3. Erstellt Abschluss-Report
"""

import sys
import logging
from pathlib import Path
from typing import Optional

# Module importieren
from modules.gliederung_loader import GliederungLoader
from modules.context_extractor import ContextExtractor
from modules.html_loader import HTMLLoader
from modules.prompt_generator import PromptGenerator
from modules.validator import Validator

# Konfiguration laden
import yaml

# Logging konfigurieren
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class Phase1Orchestrator:
    """Koordiniert Section-Erstellung für Phase 1"""
    
    def __init__(self, config_path: str = "config.yaml"):
        """
        Initialisiert Orchestrator
        
        Args:
            config_path: Pfad zur Konfigurationsdatei
        """
        logger.info("Initialisiere Phase 1 Orchestrator...")
        
        # Konfiguration laden
        self.config = self._load_config(config_path)
        
        # Module initialisieren
        self.gliederung_loader = GliederungLoader(
            self.config['paths']['gliederung_json']
        )
        self.html_loader = HTMLLoader(
            sections_dir=self.config['paths']['output_sections'],
            examples_dir=self.config['paths']['example_sections']
        )
        self.context_extractor = ContextExtractor(
            gliederung_loader=self.gliederung_loader,
            html_loader=self.html_loader,
            num_predecessors=self.config['context']['num_predecessors'],
            num_successors=self.config['context']['num_successors']
        )
        self.prompt_generator = PromptGenerator(
            template_path=self.config['paths']['prompt_template'],
            resources_base_path=".."  # Pfad zu Ressourcen (eine Ebene höher)
        )
        self.validator = Validator(
            config=self.config['validation']
        )
        
        logger.info("✅ Orchestrator initialisiert")
    
    def _load_config(self, config_path: str) -> dict:
        """Lädt Konfiguration aus YAML"""
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                config = yaml.safe_load(f)
            logger.info(f"✅ Konfiguration geladen: {config_path}")
            return config
        except FileNotFoundError:
            logger.error(f"❌ Konfigurationsdatei nicht gefunden: {config_path}")
            sys.exit(1)
        except yaml.YAMLError as e:
            logger.error(f"❌ Fehler beim Parsen der Konfiguration: {e}")
            sys.exit(1)
    
    def run(self, start_section_id: Optional[str] = None):
        """
        Startet Phase 1 Workflow
        
        Args:
            start_section_id: Optional - startet ab dieser Section (für Resume)
        """
        logger.info("🚀 Starte Phase 1 Workflow...")
        
        # Alle Sections in Reihenfolge laden
        sections = self.gliederung_loader.get_all_sections_ordered()
        logger.info(f"📋 {len(sections)} Sections gefunden")
        
        # Optional: Ab bestimmter Section starten (Resume-Funktion)
        if start_section_id:
            sections = self._skip_to_section(sections, start_section_id)
            logger.info(f"⏩ Starte ab Section: {start_section_id}")
        
        # Für jede Section
        for idx, section in enumerate(sections, 1):
            logger.info(f"\n{'='*60}")
            logger.info(f"Section {idx}/{len(sections)}: {section['sectionId']}")
            logger.info(f"{'='*60}")
            
            try:
                self._process_section(section)
            except Exception as e:
                logger.error(f"❌ Fehler bei Section {section['sectionId']}: {e}")
                if not self._ask_continue():
                    logger.info("Abbruch durch Benutzer")
                    break
        
        logger.info("\n✅ Phase 1 Workflow abgeschlossen")
    
    def _process_section(self, section: dict):
        """Verarbeitet eine einzelne Section"""
        section_id = section['sectionId']
        
        # Schritt 1: Kontext extrahieren
        logger.info("📦 Extrahiere Kontext...")
        context = self.context_extractor.extract_context(section_id)
        
        # Kontext speichern (für Debugging/Nachvollziehbarkeit)
        if self.config['workflow']['save_contexts']:
            self._save_context(context, section_id)
        
        # Schritt 2: Prompt generieren
        logger.info("📝 Generiere Prompt...")
        prompt = self.prompt_generator.generate_prompt(context)
        
        # Prompt speichern
        prompt_path = self._save_prompt(prompt, section_id)
        logger.info(f"✅ Prompt gespeichert: {prompt_path}")
        
        # Schritt 3: Warte auf manuellen KI-Durchlauf
        if not self.config['workflow']['auto_continue']:
            logger.info("\n⏸️  MANUELLER SCHRITT ERFORDERLICH:")
            logger.info(f"   1. Öffne Prompt: {prompt_path}")
            logger.info(f"   2. Führe KI-Generierung durch")
            logger.info(f"   3. Speichere Output als: output/sections/section-{section_id}.html")
            
            input("\n▶️  Drücke Enter wenn Section fertig ist...")
        
        # Schritt 4: Output validieren
        logger.info("🔍 Validiere Output...")
        section_path = Path(self.config['paths']['output_sections']) / f"section-{section_id}.html"
        
        if not section_path.exists():
            logger.error(f"❌ Section-HTML nicht gefunden: {section_path}")
            raise FileNotFoundError(f"Section {section_id} wurde nicht erstellt")
        
        validation_result = self.validator.validate_section_html(str(section_path))
        
        if validation_result['valid']:
            logger.info("✅ Validierung erfolgreich")
        else:
            if validation_result['warnings']:
                logger.warning(f"⚠️  Validierung mit Warnungen:")
                for warning in validation_result['warnings']:
                    logger.warning(f"   - {warning}")
            
            if validation_result['errors']:
                logger.error("❌ Validierungsfehler:")
                for error in validation_result['errors']:
                    logger.error(f"   - {error}")
                
                if self.config['validation']['fail_on_errors']:
                    raise ValueError(f"Section {section_id} hat Validierungsfehler")
    
    def _save_context(self, context: dict, section_id: str):
        """Speichert extrahierten Kontext als JSON"""
        import json
        output_dir = Path(self.config['paths']['output_contexts'])
        output_dir.mkdir(parents=True, exist_ok=True)
        
        context_path = output_dir / f"context-{section_id}.json"
        with open(context_path, 'w', encoding='utf-8') as f:
            json.dump(context, f, indent=2, ensure_ascii=False)
        
        logger.debug(f"Kontext gespeichert: {context_path}")
    
    def _save_prompt(self, prompt: str, section_id: str) -> Path:
        """Speichert generierten Prompt"""
        output_dir = Path(self.config['paths']['output_prompts'])
        output_dir.mkdir(parents=True, exist_ok=True)
        
        prompt_path = output_dir / f"prompt-{section_id}.md"
        with open(prompt_path, 'w', encoding='utf-8') as f:
            f.write(prompt)
        
        return prompt_path
    
    def _skip_to_section(self, sections: list, start_section_id: str) -> list:
        """Überspringt Sections bis zur Start-Section"""
        for idx, section in enumerate(sections):
            if section['sectionId'] == start_section_id:
                return sections[idx:]
        
        logger.error(f"❌ Start-Section nicht gefunden: {start_section_id}")
        sys.exit(1)
    
    def _ask_continue(self) -> bool:
        """Fragt Benutzer, ob fortgesetzt werden soll"""
        response = input("\n❓ Fortsetzen? (j/n): ").strip().lower()
        return response in ['j', 'ja', 'y', 'yes']


def main():
    """Haupteinstiegspunkt"""
    import argparse
    
    parser = argparse.ArgumentParser(
        description="Phase 1 Orchestrator - Section-Erstellung"
    )
    parser.add_argument(
        '--config',
        default='config.yaml',
        help='Pfad zur Konfigurationsdatei (default: config.yaml)'
    )
    parser.add_argument(
        '--start',
        help='Optional: Startet ab dieser Section-ID (für Resume)'
    )
    
    args = parser.parse_args()
    
    # Orchestrator starten
    orchestrator = Phase1Orchestrator(config_path=args.config)
    orchestrator.run(start_section_id=args.start)


if __name__ == '__main__':
    main()
