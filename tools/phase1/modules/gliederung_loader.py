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
        Erstellt geordnete Liste aller Section-IDs
        basierend auf predecessor/successor-Ketten
        """
        ordered = []
        visited = set()
        
        # Finde alle Start-Sections (predecessorSection == None)
        start_sections = [
            s for s in self.data.get('sections', [])
            if s.get('predecessorSection') is None
        ]
        
        # Für jede Start-Section: Folge der Kette
        for start_section in start_sections:
            current = start_section
            
            while current and current['sectionId'] not in visited:
                ordered.append(current['sectionId'])
                visited.add(current['sectionId'])
                
                # Nächste Section
                successor_id = current.get('successorSection')
                if successor_id:
                    current = self.sections_by_id.get(successor_id)
                else:
                    current = None
        
        return ordered
    
    def get_section_by_id(self, section_id: str) -> Optional[Dict]:
        """
        Gibt Section-Metadaten zurück
        
        Args:
            section_id: Section ID (z.B. "axiom-installation")
            
        Returns:
            Section-Dictionary oder None
        """
        return self.sections_by_id.get(section_id)
    
    def get_all_sections_ordered(self) -> List[Dict]:
        """
        Gibt alle Sections in korrekter Reihenfolge zurück
        (basierend auf predecessor/successor-Ketten)
        
        Returns:
            Liste von Section-Dictionaries
        """
        return [self.sections_by_id[sid] for sid in self.section_order]
    
    def get_predecessor_sections(self, section_id: str, count: int = 2) -> List[Dict]:
        """
        Gibt N Vorgänger-Sections zurück
        
        Args:
            section_id: Section ID
            count: Anzahl der Vorgänger
            
        Returns:
            Liste von Section-Dictionaries (neueste zuerst)
        """
        predecessors = []
        current_section = self.get_section_by_id(section_id)
        
        if not current_section:
            return []
        
        # Folge predecessorSection-Kette
        visited = set()  # Zyklus-Schutz
        current_id = current_section.get('predecessorSection')
        
        while current_id and len(predecessors) < count:
            if current_id in visited:
                logger.warning(f"Zyklus in predecessor-Kette erkannt bei {current_id}")
                break
            
            visited.add(current_id)
            predecessor = self.get_section_by_id(current_id)
            
            if predecessor:
                predecessors.append(predecessor)
                current_id = predecessor.get('predecessorSection')
            else:
                break
        
        return predecessors
    
    def get_successor_sections(self, section_id: str, count: int = 2) -> List[Dict]:
        """
        Gibt N Nachfolger-Sections zurück
        
        Args:
            section_id: Section ID
            count: Anzahl der Nachfolger
            
        Returns:
            Liste von Section-Dictionaries
        """
        successors = []
        current_section = self.get_section_by_id(section_id)
        
        if not current_section:
            return []
        
        # Folge successorSection-Kette
        visited = set()  # Zyklus-Schutz
        current_id = current_section.get('successorSection')
        
        while current_id and len(successors) < count:
            if current_id in visited:
                logger.warning(f"Zyklus in successor-Kette erkannt bei {current_id}")
                break
            
            visited.add(current_id)
            successor = self.get_section_by_id(current_id)
            
            if successor:
                successors.append(successor)
                current_id = successor.get('successorSection')
            else:
                break
        
        return successors
    
    def get_prerequisite_sections(self, section_id: str) -> List[Dict]:
        """
        Gibt Prerequisites zurück (nur contentual)
        
        Args:
            section_id: Section ID
            
        Returns:
            Liste von Section-Dictionaries
        """
        section = self.get_section_by_id(section_id)
        if not section:
            return []
        
        prereqs = section.get('prerequisites', {}).get('contentual', [])
        
        # Lade vollständige Section-Daten
        prerequisite_sections = []
        for prereq_id in prereqs:
            prereq_section = self.get_section_by_id(prereq_id)
            if prereq_section:
                prerequisite_sections.append(prereq_section)
            else:
                logger.warning(f"Prerequisite '{prereq_id}' nicht gefunden für Section '{section_id}'")
        
        return prerequisite_sections
    
    def get_cross_reference_sections(self, section_id: str) -> List[Dict]:
        """
        Gibt Cross-References zurück (mit Details)
        
        Args:
            section_id: Section ID
            
        Returns:
            Liste von Dictionaries mit sectionId, reason, relevanceScore
        """
        section = self.get_section_by_id(section_id)
        if not section:
            return []
        
        cross_refs = section.get('crossReferences', [])
        
        # Erweitere mit vollständigen Section-Daten
        enriched_cross_refs = []
        for cross_ref in cross_refs:
            ref_section = self.get_section_by_id(cross_ref['sectionId'])
            if ref_section:
                enriched_cross_refs.append({
                    **cross_ref,
                    'section': ref_section
                })
            else:
                logger.warning(f"Cross-Reference '{cross_ref['sectionId']}' nicht gefunden für Section '{section_id}'")
        
        return enriched_cross_refs
