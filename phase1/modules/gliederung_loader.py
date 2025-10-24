"""Modul 1: Gliederung laden und bereitstellen"""

import json
import logging
from pathlib import Path
from typing import List, Optional, Dict

logger = logging.getLogger(__name__)


class GliederungLoader:
    """Lädt und verwaltet Gliederung (output-phase0.5-final.json)"""
    
    def __init__(self, json_path: str):
        """
        Initialisiert Loader
        
        Args:
            json_path: Pfad zu output-phase0.5-final.json
        """
        self.json_path = Path(json_path)
        logger.info(f"📂 GliederungLoader initialisiert: {json_path}")
        
        # Lade Gliederung
        self.data = self._load_gliederung()
        
        # Erstelle Index für schnellen Zugriff
        self._build_indices()
    
    def _load_gliederung(self) -> dict:
        """Lädt Gliederung aus JSON"""
        if not self.json_path.exists():
            logger.error(f"❌ Gliederungsdatei nicht gefunden: {self.json_path}")
            raise FileNotFoundError(f"Gliederung nicht gefunden: {self.json_path}")
        
        try:
            with open(self.json_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            logger.info(f"✅ Gliederung geladen: {len(data.get('sections', []))} Sections")
            return data
        
        except json.JSONDecodeError as e:
            logger.error(f"❌ Fehler beim Parsen der Gliederung: {e}")
            raise
    
    def _build_indices(self):
        """Erstellt Indices für schnellen Zugriff"""
        # Index: sectionId -> Section
        self.sections_by_id = {
            section['sectionId']: section 
            for section in self.data.get('sections', [])
        }
        
        # Reihenfolge: predecessor/successor chain
        self.section_order = self._build_section_order()
        
        logger.debug(f"Indices erstellt: {len(self.sections_by_id)} Sections")
    
    def _build_section_order(self) -> List[str]:
        """
        Erstellt geordnete Liste von Section-IDs basierend auf predecessor/successor
        
        Returns:
            Liste von Section-IDs in korrekter Reihenfolge
        """
        # Finde erste Section (predecessorSection == null)
        first_section = None
        for section in self.data.get('sections', []):
            if section.get('predecessorSection') is None:
                first_section = section['sectionId']
                break
        
        if not first_section:
            logger.warning("⚠️  Keine Start-Section gefunden (predecessorSection == null)")
            # Fallback: Reihenfolge aus JSON
            return [s['sectionId'] for s in self.data.get('sections', [])]
        
        # Baue Kette auf
        order = [first_section]
        current = first_section
        
        # Folge successor chain
        max_iterations = 1000  # Schutz vor Endlosschleife
        iteration = 0
        
        while iteration < max_iterations:
            section = self.sections_by_id.get(current)
            if not section:
                break
            
            successor = section.get('successorSection')
            if not successor:
                break
            
            if successor in order:
                logger.warning(f"⚠️  Zyklus erkannt bei Section {successor}")
                break
            
            order.append(successor)
            current = successor
            iteration += 1
        
        logger.debug(f"Section-Reihenfolge erstellt: {len(order)} Sections")
        return order
    
    def get_all_sections_ordered(self) -> List[Dict]:
        """
        Gibt alle Sections in Predecessor/Successor-Reihenfolge zurück
        
        Returns:
            Liste von Section-Dictionaries (vollständige Metadaten)
        """
        return [
            self.sections_by_id[section_id]
            for section_id in self.section_order
            if section_id in self.sections_by_id
        ]
    
    def get_section_by_id(self, section_id: str) -> Optional[Dict]:
        """
        Gibt Section-Metadaten zurück
        
        Args:
            section_id: ID der Section
        
        Returns:
            Section-Dictionary oder None wenn nicht gefunden
        """
        section = self.sections_by_id.get(section_id)
        if not section:
            logger.warning(f"⚠️  Section nicht gefunden: {section_id}")
        return section
    
    def get_predecessor_sections(self, section_id: str, count: int = 2) -> List[Dict]:
        """
        Gibt N Vorgänger-Sections zurück
        
        Args:
            section_id: ID der aktuellen Section
            count: Anzahl Vorgänger (default: 2)
        
        Returns:
            Liste von Section-Dictionaries (vom ältesten zum neuesten)
        """
        try:
            current_index = self.section_order.index(section_id)
        except ValueError:
            logger.warning(f"⚠️  Section nicht in Reihenfolge gefunden: {section_id}")
            return []
        
        # Berechne Start-Index (mindestens 0)
        start_index = max(0, current_index - count)
        
        # Extrahiere Vorgänger
        predecessor_ids = self.section_order[start_index:current_index]
        
        return [
            self.sections_by_id[pred_id]
            for pred_id in predecessor_ids
            if pred_id in self.sections_by_id
        ]
    
    def get_successor_sections(self, section_id: str, count: int = 2) -> List[Dict]:
        """
        Gibt N Nachfolger-Sections zurück
        
        Args:
            section_id: ID der aktuellen Section
            count: Anzahl Nachfolger (default: 2)
        
        Returns:
            Liste von Section-Dictionaries
        """
        try:
            current_index = self.section_order.index(section_id)
        except ValueError:
            logger.warning(f"⚠️  Section nicht in Reihenfolge gefunden: {section_id}")
            return []
        
        # Berechne End-Index
        end_index = min(len(self.section_order), current_index + count + 1)
        
        # Extrahiere Nachfolger
        successor_ids = self.section_order[current_index + 1:end_index]
        
        return [
            self.sections_by_id[succ_id]
            for succ_id in successor_ids
            if succ_id in self.sections_by_id
        ]
    
    def get_prerequisite_sections(self, section_id: str) -> List[Dict]:
        """
        Gibt Prerequisites (contentual) für Section zurück
        
        Args:
            section_id: ID der aktuellen Section
        
        Returns:
            Liste von Section-Dictionaries
        """
        section = self.get_section_by_id(section_id)
        if not section:
            return []
        
        prerequisite_ids = section.get('prerequisites', {}).get('contentual', [])
        
        return [
            self.sections_by_id[prereq_id]
            for prereq_id in prerequisite_ids
            if prereq_id in self.sections_by_id
        ]
    
    def get_cross_reference_sections(self, section_id: str) -> List[Dict]:
        """
        Gibt Cross-Reference Sections zurück
        
        Args:
            section_id: ID der aktuellen Section
        
        Returns:
            Liste von Tuples: (Section-Dictionary, reason, relevanceScore)
        """
        section = self.get_section_by_id(section_id)
        if not section:
            return []
        
        cross_refs = section.get('crossReferences', [])
        
        result = []
        for ref in cross_refs:
            ref_section = self.sections_by_id.get(ref['sectionId'])
            if ref_section:
                result.append({
                    'section': ref_section,
                    'reason': ref.get('reason', ''),
                    'relevanceScore': ref.get('relevanceScore', 0)
                })
        
        return result
