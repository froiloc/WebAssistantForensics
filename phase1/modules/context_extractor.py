"""Modul 2: Kontext für Section extrahieren"""

import logging
from typing import Dict, List

logger = logging.getLogger(__name__)


class ContextExtractor:
    """Extrahiert vollständigen Kontext für eine Section"""
    
    def __init__(self, gliederung_loader, html_loader):
        """
        Initialisiert Extractor
        
        Args:
            gliederung_loader: GliederungLoader-Instanz
            html_loader: HTMLLoader-Instanz
        """
        self.gliederung_loader = gliederung_loader
        self.html_loader = html_loader
        logger.info("📦 ContextExtractor initialisiert (Dummy)")
    
    def extract_context(self, section_id: str) -> Dict:
        """
        Extrahiert Kontext für Section
        
        Args:
            section_id: ID der Section
        
        Returns:
            Dictionary mit vollständigem Kontext:
            {
                "current_section": {...},         # Vollständige Metadaten
                "predecessors": [...],            # 2 Vorgänger (Metadaten + HTML)
                "successors": [...],              # 2 Nachfolger (nur Metadaten)
                "prerequisites": [...],           # Prerequisites.contentual (Metadaten + HTML)
                "cross_references": [...]         # Cross-Refs (nur Metadaten)
            }
        """
        logger.debug(f"Extrahiere Kontext für {section_id} (Dummy)")
        
        # TODO: Echte Implementierung
        # 1. Lade aktuelle Section
        current_section = self.gliederung_loader.get_section_by_id(section_id)
        
        # 2. Lade Vorgänger (Metadaten + HTML)
        predecessors = self._load_predecessors_with_html(section_id)
        
        # 3. Lade Nachfolger (nur Metadaten)
        successors = self.gliederung_loader.get_successor_sections(section_id, count=2)
        
        # 4. Lade Prerequisites (Metadaten + HTML)
        prerequisites = self._load_prerequisites_with_html(section_id)
        
        # 5. Lade Cross-References (nur Metadaten)
        cross_references = self.gliederung_loader.get_cross_reference_sections(section_id)
        
        return {
            "current_section": current_section,
            "predecessors": predecessors,
            "successors": successors,
            "prerequisites": prerequisites,
            "cross_references": cross_references
        }
    
    def _load_predecessors_with_html(self, section_id: str) -> List[Dict]:
        """
        Lädt Vorgänger-Sections mit HTML-Content
        
        Returns:
            Liste von Dictionaries: {metadata: {...}, html: "..."}
        """
        predecessors = self.gliederung_loader.get_predecessor_sections(section_id, count=2)
        
        result = []
        for pred in predecessors:
            pred_id = pred['sectionId']
            
            # Versuche HTML zu laden
            html_content = None
            if self.html_loader.exists(pred_id):
                html_content = self.html_loader.load_section_html(pred_id)
            else:
                logger.debug(f"Kein HTML für Vorgänger {pred_id}, verwende Beispiel-Section")
                html_content = self.html_loader.load_example_section(pred_id)
            
            result.append({
                'metadata': pred,
                'html': html_content
            })
        
        return result
    
    def _load_prerequisites_with_html(self, section_id: str) -> List[Dict]:
        """
        Lädt Prerequisite-Sections mit HTML-Content
        
        Returns:
            Liste von Dictionaries: {metadata: {...}, html: "..."}
        """
        prerequisites = self.gliederung_loader.get_prerequisite_sections(section_id)
        
        result = []
        for prereq in prerequisites:
            prereq_id = prereq['sectionId']
            
            # Versuche HTML zu laden
            html_content = None
            if self.html_loader.exists(prereq_id):
                html_content = self.html_loader.load_section_html(prereq_id)
            else:
                logger.warning(f"⚠️  Kein HTML für Prerequisite {prereq_id}")
                html_content = None
            
            result.append({
                'metadata': prereq,
                'html': html_content
            })
        
        return result
