"""Modul 4: Prompt für KI generieren"""

import logging
from pathlib import Path
from typing import Dict, Optional, List
from datetime import datetime
import json

logger = logging.getLogger(__name__)

# Versuche pybars3 zu importieren (für Handlebars)
try:
    from pybars import Compiler
    PYBARS_AVAILABLE = True
except ImportError:
    logger.warning("⚠️  pybars3 nicht verfügbar. Verwende String-Replacement als Fallback.")
    PYBARS_AVAILABLE = False


class PromptGenerator:
    """Generiert Prompt für Phase 1 KI"""
    
    def __init__(self, template_path: str, resources_base_path: str = ".."):
        """
        Initialisiert Generator
        
        Args:
            template_path: Pfad zum Prompt-Template (prompt-phase1.md)
            resources_base_path: Basis-Pfad für Ressourcen (Strategiedokument, etc.)
        """
        self.template_path = Path(template_path)
        self.resources_base_path = Path(resources_base_path)
        
        logger.info(f"📝 PromptGenerator initialisiert")
        logger.debug(f"   Template: {self.template_path}")
        logger.debug(f"   Resources: {self.resources_base_path}")
        
        # Lade Template
        self.template_content = self._load_template()
        
        # Lade Ressourcen (einmal, zur Effizienz)
        self.resources = self._load_resources()
        
        # Initialisiere Handlebars-Compiler (falls verfügbar)
        if PYBARS_AVAILABLE:
            self.compiler = Compiler()
            logger.debug("   Handlebars-Compiler initialisiert")
        else:
            self.compiler = None
            logger.debug("   String-Replacement-Fallback aktiviert")
    
    def _load_template(self) -> str:
        """Lädt Template-Datei"""
        if not self.template_path.exists():
            logger.error(f"❌ Template nicht gefunden: {self.template_path}")
            raise FileNotFoundError(f"Template nicht gefunden: {self.template_path}")
        
        try:
            with open(self.template_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            logger.debug(f"✅ Template geladen ({len(content)} Zeichen)")
            return content
        
        except Exception as e:
            logger.error(f"❌ Fehler beim Laden des Templates: {e}")
            raise
    
    def _load_resources(self) -> Dict[str, str]:
        """
        Lädt alle Ressourcen-Dateien
        
        Returns:
            Dictionary mit Ressourcen-Inhalten
        """
        resources = {}
        
        resource_files = {
            'strategiedokument': 'Strategiedokument_Beispiel__AXIOM_Examine.md',
            'json_ld_schema': 'main-content_schema.json',
            'html_template_spec': 'Phase_1__HTML-Template_Spezifikation__Matroschka-Prinzip_.md',
            'terminologie_list': 'Terminologie-Entscheidungsliste.md',
            'getting_started': 'templates/getting-started.md'
        }
        
        for key, filename in resource_files.items():
            filepath = self.resources_base_path / filename
            
            if not filepath.exists():
                logger.warning(f"⚠️  Ressource nicht gefunden: {filepath}")
                resources[key] = f"[Ressource nicht gefunden: {filename}]"
                continue
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    resources[key] = f.read()
                
                logger.debug(f"   ✅ {key} geladen ({len(resources[key])} Zeichen)")
            
            except Exception as e:
                logger.warning(f"   ⚠️  Fehler beim Laden von {filename}: {e}")
                resources[key] = f"[Fehler beim Laden: {filename}]"
        
        return resources
    
    def generate_prompt(self, context: Dict) -> str:
        """
        Generiert vollständigen Prompt basierend auf Kontext
        
        Args:
            context: Extrahierter Kontext (von ContextExtractor)
                {
                    "current_section": {...},
                    "predecessors": [...],
                    "successors": [...],
                    "prerequisites": [...],
                    "cross_references": [...],
                    "statistics": {...}
                }
        
        Returns:
            Vollständiger Prompt als String
        """
        logger.info("📝 Generiere Prompt...")
        
        # Erstelle Template-Data aus Kontext
        template_data = self._build_template_data(context)
        
        # Fülle Template
        if PYBARS_AVAILABLE and self.compiler:
            prompt = self._render_with_handlebars(template_data)
        else:
            prompt = self._render_with_string_replacement(template_data)
        
        logger.info(f"✅ Prompt generiert ({len(prompt)} Zeichen)")
        return prompt
    
    def _build_template_data(self, context: Dict) -> Dict:
        """
        Erstellt Template-Data aus Kontext
        
        Args:
            context: Kontext vom ContextExtractor
        
        Returns:
            Dictionary mit allen Template-Variablen
        """
        current = context['current_section']
        
        # Basis-Daten
        data = {
            # Meta
            'current_date': datetime.now().strftime('%Y-%m-%d'),
            
            # Section-Metadaten
            'section_id': current.get('sectionId', 'unknown'),
            'section_title': current.get('title', 'Unknown Section'),
            'chapter_id': current.get('chapterId', 'unknown'),
            'chapter_title': 'Unknown Chapter',  # TODO: Aus Gliederung laden
            'topic_id': 'unknown',  # TODO: Aus Gliederung laden
            'topic_title': 'Unknown Topic',  # TODO: Aus Gliederung laden
            
            'learning_objective': current.get('learningObjective', ''),
            'key_topics': current.get('keyTopics', []),
            'complexity': current.get('complexity', 'Standard'),
            'difficulty_level': current.get('difficultyLevel', 'Beginner'),
            'estimated_word_count': current.get('estimatedWordCount', 1000),
            'estimated_reading_time_l2': current.get('estimatedReadingTimeL2', 7),
            'estimated_reading_time_l3': current.get('estimatedReadingTimeL3', 14),
            
            'estimated_media_screenshots': current.get('estimatedMedia', {}).get('screenshots', 0),
            'estimated_media_videos': current.get('estimatedMedia', {}).get('videos', 0),
            'estimated_media_annotations': current.get('estimatedMedia', {}).get('annotations', 0),
            'estimated_media_diagrams': current.get('estimatedMedia', {}).get('diagrams', 0),
            'estimated_media_info_boxes': current.get('estimatedMedia', {}).get('infoBoxes', 0),
            
            'short_description': current.get('shortDescription', ''),
            'rationale': current.get('rationale', ''),
            
            # Kontext
            'predecessor_section': current.get('predecessorSection'),
            'successor_section': current.get('successorSection'),
            
            'prerequisites_contentual': current.get('prerequisites', {}).get('contentual', []),
            'prerequisites_technical': current.get('prerequisites', {}).get('technical', []),
            'prerequisites_knowledge': current.get('prerequisites', {}).get('knowledge', []),
            
            'dependencies': current.get('dependencies', []),
            'cross_references': self._format_cross_references(context.get('cross_references', [])),
            
            # Vorgänger/Nachfolger
            'predecessors': context.get('predecessors', []),
            'successors': context.get('successors', []),
            'prerequisites_with_html': context.get('prerequisites', []),
            'cross_references_with_metadata': context.get('cross_references', []),
            
            # Ressourcen (Anhänge)
            'strategiedokument_content': self.resources.get('strategiedokument', ''),
            'json_ld_schema_content': self.resources.get('json_ld_schema', ''),
            'html_template_spec_content': self.resources.get('html_template_spec', ''),
            'terminologie_list_content': self.resources.get('terminologie_list', ''),
            'getting_started_content': self.resources.get('getting_started', ''),
            
            # Terminologie-Liste (TODO: Parsen)
            'terminology_list': None,
            
            # Hilfsvariablen
            'section_position': 0,  # TODO: Aus Gliederung berechnen
        }
        
        # Füge Nachfolger-Titel hinzu (falls vorhanden)
        if data['successor_section'] and context.get('successors'):
            data['successor_section_title'] = context['successors'][0].get('title', 'Unknown')
        
        if data['predecessor_section'] and context.get('predecessors'):
            data['predecessor_section_title'] = context['predecessors'][0]['metadata'].get('title', 'Unknown')
        
        return data
    
    def _format_cross_references(self, cross_refs: List[Dict]) -> List[Dict]:
        """Formatiert Cross-References für Template"""
        formatted = []
        for ref in cross_refs:
            formatted.append({
                'section_id': ref['metadata'].get('sectionId', 'unknown'),
                'reason': ref.get('reason', ''),
                'relevance_score': ref.get('relevanceScore', 0)
            })
        return formatted
    
    def _render_with_handlebars(self, template_data: Dict) -> str:
        """
        Rendert Template mit Handlebars (pybars3)
        
        Args:
            template_data: Dictionary mit Template-Variablen
        
        Returns:
            Gerenderter Prompt
        """
        try:
            # Kompiliere Template
            template = self.compiler.compile(self.template_content)
            
            # Registriere Helper (falls benötigt)
            helpers = {
                'eq': lambda this, a, b: a == b,
                'gte': lambda this, a, b: a >= b
            }
            
            # Rendere Template
            prompt = template(template_data, helpers=helpers)
            
            return prompt
        
        except Exception as e:
            logger.error(f"❌ Fehler beim Rendern mit Handlebars: {e}")
            logger.info("⚠️  Fallback auf String-Replacement")
            return self._render_with_string_replacement(template_data)
    
    def _render_with_string_replacement(self, template_data: Dict) -> str:
        """
        Fallback: Rendert Template mit einfachem String-Replacement
        
        Args:
            template_data: Dictionary mit Template-Variablen
        
        Returns:
            Gerenderter Prompt (mit verbleibenden Handlebars-Blöcken)
        """
        prompt = self.template_content
        
        # Ersetze einfache Variablen {{variable}}
        for key, value in template_data.items():
            if isinstance(value, (str, int, float)):
                placeholder = f"{{{{{key}}}}}"
                prompt = prompt.replace(placeholder, str(value))
            elif isinstance(value, list) and value and isinstance(value[0], str):
                # Einfache Listen (Strings)
                placeholder = f"{{{{{key}}}}}"
                list_str = "\n".join(f"- {item}" for item in value)
                prompt = prompt.replace(placeholder, list_str)
        
        logger.warning("⚠️  String-Replacement-Fallback verwendet. Handlebars-Blöcke (#if, #each) bleiben unverarbeitet.")
        return prompt
