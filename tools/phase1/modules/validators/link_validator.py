"""
Modul 4: Link Cross-Reference Validierung

Validiert Links gegen Gliederung (Cross-References).

Prüft:
- Interne Links (#anchors) existieren
- Cross-References zu anderen Sections valide
- Externe Links (Warnung)

Author: Claude (Phase 1 Module)
Date: 2025-10-27
"""

from typing import Dict, List, Tuple, Optional
from bs4 import BeautifulSoup
import logging

from .base_validator import BaseValidator

logger = logging.getLogger(__name__)


class LinkValidator(BaseValidator):
    """Validiert Links und Cross-References."""
    
    def __init__(self, config: Dict = None):
        super().__init__(config)
        self.gliederung_loader = self.config.get('gliederung_loader')
    
    def validate(self, soup: BeautifulSoup, html_path: str = None, section_id: str = None, **kwargs) -> Tuple[List[Dict], List[Dict]]:
        """Validiert Links."""
        errors = []
        warnings = []
        
        # 1. Sammle alle IDs im Dokument
        all_ids = {elem.get('id') for elem in soup.find_all(id=True)}
        
        # 2. Sammle alle Links
        internal_links = []
        external_links = []
        
        for link in soup.find_all('a', href=True):
            href = link.get('href', '')
            
            if href.startswith('#'):
                internal_links.append((link, href[1:]))
            elif href.startswith('http://') or href.startswith('https://'):
                external_links.append((link, href))
            elif href:
                external_links.append((link, href))
        
        # 3. Validiere interne Links
        for link, anchor in internal_links:
            if anchor not in all_ids:
                errors.append(self._create_error(
                    'link-internal',
                    f"Interner Link auf nicht-existierendes Ziel: #{anchor}",
                    f"Link-Text: '{link.get_text(strip=True)[:50]}'"
                ))
        
        # 4. Warnung bei externen Links
        if external_links:
            warnings.append(self._create_warning(
                'link-external',
                f"{len(external_links)} externe Link(s) gefunden - manuell prüfen",
                "document"
            ))
        
        # 5. Cross-Reference Validierung (wenn gliederung_loader verfügbar)
        if self.gliederung_loader and section_id:
            # Sammle Cross-References
            html_cross_refs = [anchor for _, anchor in internal_links 
                              if anchor.startswith('section-') or anchor.startswith('axiom-')]
            
            # Prüfe ob Sections existieren
            for ref_id in set(html_cross_refs):
                section = self.gliederung_loader.get_section_by_id(ref_id)
                if not section:
                    errors.append(self._create_error(
                        'link-cross-reference',
                        f"Cross-Reference zu nicht-existierender Section: {ref_id}",
                        "HTML"
                    ))
        
        logger.debug(f"Link Validierung: {len(internal_links)} intern, {len(external_links)} extern")
        return errors, warnings
