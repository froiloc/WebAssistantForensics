"""Modul 2: Kontext für Section extrahieren"""

import logging
from typing import Dict, List, Optional

logger = logging.getLogger(__name__)


class ContextExtractor:
    """Extrahiert vollständigen Kontext für eine Section"""
    
    def __init__(self, gliederung_loader, html_loader, num_predecessors: int = 2, num_successors: int = 2):
        """
        Initialisiert Extractor
        
        Args:
            gliederung_loader: GliederungLoader-Instanz
            html_loader: HTMLLoader-Instanz
            num_predecessors: Anzahl Vorgänger-Sections (default: 2)
            num_successors: Anzahl Nachfolger-Sections (default: 2)
        """
        self.gliederung_loader = gliederung_loader
        self.html_loader = html_loader
        self.num_predecessors = num_predecessors
        self.num_successors = num_successors
        
        logger.info(f"📦 ContextExtractor initialisiert (Predecessors: {num_predecessors}, Successors: {num_successors})")
    
    def extract_context(self, section_id: str) -> Dict:
        """
        Extrahiert vollständigen Kontext für Section
        
        Args:
            section_id: ID der Section
        
        Returns:
            Dictionary mit vollständigem Kontext:
            {
                "current_section": {...},         # Vollständige Metadaten
                "predecessors": [...],            # N Vorgänger (Metadaten + HTML)
                "successors": [...],              # N Nachfolger (nur Metadaten)
                "prerequisites": [...],           # Prerequisites.contentual (Metadaten + HTML)
                "cross_references": [...],        # Cross-Refs (Metadaten + Grund + Relevanz)
                "statistics": {...}               # Statistiken für Debugging
            }
        """
        logger.info(f"📦 Extrahiere Kontext für Section: {section_id}")
        
        # 1. Lade aktuelle Section
        current_section = self.gliederung_loader.get_section_by_id(section_id)
        if not current_section:
            logger.error(f"❌ Section nicht gefunden: {section_id}")
            raise ValueError(f"Section nicht gefunden: {section_id}")
        
        logger.debug(f"   Aktuelle Section: {current_section.get('title', 'N/A')}")
        
        # 2. Lade Vorgänger (Metadaten + HTML)
        predecessors = self._load_predecessors_with_html(section_id)
        logger.debug(f"   Vorgänger geladen: {len(predecessors)}")
        
        # 3. Lade Nachfolger (nur Metadaten)
        successors = self.gliederung_loader.get_successor_sections(section_id, count=self.num_successors)
        logger.debug(f"   Nachfolger geladen: {len(successors)}")
        
        # 4. Lade Prerequisites (Metadaten + HTML)
        prerequisites = self._load_prerequisites_with_html(section_id)
        logger.debug(f"   Prerequisites geladen: {len(prerequisites)}")
        
        # 5. Lade Cross-References (Metadaten + Zusatzinfos)
        cross_references = self._load_cross_references(section_id)
        logger.debug(f"   Cross-References geladen: {len(cross_references)}")
        
        # 6. Erstelle Statistiken
        statistics = self._create_statistics(
            current_section=current_section,
            predecessors=predecessors,
            successors=successors,
            prerequisites=prerequisites,
            cross_references=cross_references
        )
        
        context = {
            "current_section": current_section,
            "predecessors": predecessors,
            "successors": successors,
            "prerequisites": prerequisites,
            "cross_references": cross_references,
            "statistics": statistics
        }
        
        logger.info(f"✅ Kontext-Extraktion erfolgreich für {section_id}")
        return context
    
    def _load_predecessors_with_html(self, section_id: str) -> List[Dict]:
        """
        Lädt Vorgänger-Sections mit HTML-Content
        
        Returns:
            Liste von Dictionaries: {
                metadata: {...},
                html: "...",
                html_source: "section" | "example" | "missing"
            }
        """
        predecessors = self.gliederung_loader.get_predecessor_sections(
            section_id, 
            count=self.num_predecessors
        )
        
        result = []
        for idx, pred in enumerate(predecessors, 1):
            pred_id = pred['sectionId']
            logger.debug(f"      Lade Vorgänger {idx}/{len(predecessors)}: {pred_id}")
            
            # Versuche HTML zu laden
            html_content = None
            html_source = "missing"
            
            if self.html_loader.exists(pred_id):
                # Echte Section-HTML existiert
                try:
                    html_content = self.html_loader.load_section_html(pred_id)
                    html_source = "section"
                    logger.debug(f"         ✅ HTML geladen aus Sections ({len(html_content)} Zeichen)")
                except Exception as e:
                    logger.warning(f"         ⚠️  Fehler beim Laden: {e}")
                    html_content = self._get_fallback_html(pred_id)
                    html_source = "example"
            else:
                # Fallback: Beispiel-Section verwenden
                logger.debug(f"         ⚠️  Kein HTML vorhanden, verwende Beispiel-Section")
                try:
                    html_content = self.html_loader.load_section_html(pred_id)
                    html_source = "example"
                    logger.debug(f"         ✅ Beispiel-Section geladen ({len(html_content)} Zeichen)")
                except Exception as e:
                    logger.warning(f"         ⚠️  Auch Beispiel-Section fehlgeschlagen: {e}")
                    html_content = self._get_fallback_html(pred_id)
                    html_source = "missing"
            
            result.append({
                'metadata': pred,
                'html': html_content,
                'html_source': html_source
            })
        
        return result
    
    def _load_prerequisites_with_html(self, section_id: str) -> List[Dict]:
        """
        Lädt Prerequisite-Sections mit HTML-Content
        
        Returns:
            Liste von Dictionaries: {
                metadata: {...},
                html: "..." | None,
                html_source: "section" | "example" | "missing"
            }
        """
        prerequisites = self.gliederung_loader.get_prerequisite_sections(section_id)
        
        if not prerequisites:
            logger.debug("      Keine Prerequisites vorhanden")
            return []
        
        result = []
        for idx, prereq in enumerate(prerequisites, 1):
            prereq_id = prereq['sectionId']
            logger.debug(f"      Lade Prerequisite {idx}/{len(prerequisites)}: {prereq_id}")
            
            # Versuche HTML zu laden
            html_content = None
            html_source = "missing"
            
            if self.html_loader.exists(prereq_id):
                # Echte Section-HTML existiert
                try:
                    html_content = self.html_loader.load_section_html(prereq_id)
                    html_source = "section"
                    logger.debug(f"         ✅ HTML geladen aus Sections ({len(html_content)} Zeichen)")
                except Exception as e:
                    logger.warning(f"         ⚠️  Fehler beim Laden: {e}")
                    html_content = None
            else:
                # Prerequisites MÜSSEN existieren, sonst Warnung
                logger.warning(f"         ⚠️  KRITISCH: Prerequisite-HTML fehlt: {prereq_id}")
                logger.warning(f"            Section {section_id} benötigt {prereq_id}, aber HTML nicht vorhanden!")
                html_content = None
            
            result.append({
                'metadata': prereq,
                'html': html_content,
                'html_source': html_source
            })
        
        return result
    
    def _load_cross_references(self, section_id: str) -> List[Dict]:
        """
        Lädt Cross-Reference Sections mit Zusatzinfos
        
        Returns:
            Liste von Dictionaries: {
                metadata: {...},
                reason: str,
                relevanceScore: int
            }
        """
        cross_refs = self.gliederung_loader.get_cross_reference_sections(section_id)
        
        if not cross_refs:
            logger.debug("      Keine Cross-References vorhanden")
            return []
        
        logger.debug(f"      Lade {len(cross_refs)} Cross-References")
        
        result = []
        for ref in cross_refs:
            result.append({
                'metadata': ref['section'],
                'reason': ref.get('reason', ''),
                'relevanceScore': ref.get('relevanceScore', 0)
            })
        
        return result
    
    def _get_fallback_html(self, section_id: str) -> str:
        """
        Erstellt Fallback-HTML wenn keine Section verfügbar ist
        
        Args:
            section_id: ID der Section
        
        Returns:
            Minimales HTML-Stub
        """
        return f"""<section id="{section_id}" data-section-id="{section_id}">
    <h2>Section: {section_id}</h2>
    <p><em>HTML für diese Section ist noch nicht verfügbar.</em></p>
</section>"""
    
    def _create_statistics(
        self,
        current_section: Dict,
        predecessors: List[Dict],
        successors: List[Dict],
        prerequisites: List[Dict],
        cross_references: List[Dict]
    ) -> Dict:
        """
        Erstellt Statistiken über den extrahierten Kontext
        
        Returns:
            Dictionary mit Statistiken (für Debugging und Logging)
        """
        # Zähle HTML-Sources
        predecessor_sources = {}
        for pred in predecessors:
            source = pred.get('html_source', 'unknown')
            predecessor_sources[source] = predecessor_sources.get(source, 0) + 1
        
        prerequisite_sources = {}
        for prereq in prerequisites:
            source = prereq.get('html_source', 'unknown')
            prerequisite_sources[source] = prerequisite_sources.get(source, 0) + 1
        
        # Berechne Gesamt-HTML-Größe
        total_html_size = 0
        for pred in predecessors:
            if pred.get('html'):
                total_html_size += len(pred['html'])
        for prereq in prerequisites:
            if prereq.get('html'):
                total_html_size += len(prereq['html'])
        
        return {
            "section_id": current_section.get('sectionId', 'unknown'),
            "section_title": current_section.get('title', 'unknown'),
            "complexity": current_section.get('complexity', 'unknown'),
            "counts": {
                "predecessors": len(predecessors),
                "successors": len(successors),
                "prerequisites": len(prerequisites),
                "cross_references": len(cross_references)
            },
            "html_sources": {
                "predecessors": predecessor_sources,
                "prerequisites": prerequisite_sources
            },
            "total_html_size_bytes": total_html_size,
            "warnings": self._collect_warnings(predecessors, prerequisites)
        }
    
    def _collect_warnings(self, predecessors: List[Dict], prerequisites: List[Dict]) -> List[str]:
        """
        Sammelt Warnungen über fehlende/problematische HTMLs
        
        Returns:
            Liste von Warnungen als Strings
        """
        warnings = []
        
        # Prüfe Vorgänger
        for pred in predecessors:
            if pred.get('html_source') == 'missing':
                warnings.append(f"Vorgänger {pred['metadata']['sectionId']}: Kein HTML verfügbar")
            elif pred.get('html_source') == 'example':
                warnings.append(f"Vorgänger {pred['metadata']['sectionId']}: Verwendet Beispiel-Section")
        
        # Prüfe Prerequisites (kritischer!)
        for prereq in prerequisites:
            if not prereq.get('html'):
                warnings.append(f"KRITISCH: Prerequisite {prereq['metadata']['sectionId']}: HTML fehlt!")
        
        return warnings
