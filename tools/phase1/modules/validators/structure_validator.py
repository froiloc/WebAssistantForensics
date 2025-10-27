"""
Modul 6: Struktur-Validierung (Matroschka)

Validiert Struktur nach Matroschka-Prinzip.

Prüft:
- Matroschka-Struktur (Level 1 ⊆ 2 ⊆ 3)
- Detail-Level Attribute korrekt
- Verschachtelung
- Section Pflicht-Attribute

Author: Claude (Phase 1 Module)
Date: 2025-10-27
"""

from typing import Dict, List, Tuple
from bs4 import BeautifulSoup
import logging

from .base_validator import BaseValidator

logger = logging.getLogger(__name__)


class StructureValidator(BaseValidator):
    """Validiert Struktur nach Matroschka-Prinzip."""
    
    def validate(self, soup: BeautifulSoup, html_path: str = None, **kwargs) -> Tuple[List[Dict], List[Dict]]:
        """Validiert Struktur."""
        errors = []
        warnings = []
        
        # 1. Prüfe Section-Element
        section = soup.find('section', class_='content-section')
        
        if not section:
            errors.append(self._create_error(
                'structure',
                "Keine <section class='content-section'> gefunden",
                "document",
                severity="critical"
            ))
            return errors, warnings
        
        # 2. Pflicht-Attribute
        required_attrs = ['id', 'data-section', 'data-level', 'data-title', 'lang']
        for attr in required_attrs:
            if not section.get(attr):
                errors.append(self._create_error(
                    'structure-section',
                    f"Section fehlt Pflicht-Attribut: {attr}",
                    "<section>"
                ))
        
        # 3. data-detail-level validieren
        section_detail_level = section.get('data-detail-level')
        if section_detail_level:
            try:
                level = int(section_detail_level)
                if level not in [1, 2, 3]:
                    errors.append(self._create_error(
                        'structure-detail-level',
                        f"Ungültiger data-detail-level: {section_detail_level} (erwartet: 1, 2, oder 3)",
                        "<section>"
                    ))
            except ValueError:
                errors.append(self._create_error(
                    'structure-detail-level',
                    f"data-detail-level ist keine Zahl: {section_detail_level}",
                    "<section>"
                ))
        
        # 4. Matroschka: Detail-Level Divs
        detail_level_1 = section.find_all('div', class_='detail-level-1')
        detail_level_2 = section.find_all('div', class_='detail-level-2')
        detail_level_3 = section.find_all('div', class_='detail-level-3')
        
        # 5. Verschachtelungs-Regeln: Level 1 nicht in Level 2/3
        for div_l1 in detail_level_1:
            parent = div_l1.parent
            while parent and parent.name != 'section':
                if parent.get('class'):
                    parent_classes = parent.get('class', [])
                    if 'detail-level-2' in parent_classes:
                        errors.append(self._create_error(
                            'structure-nesting',
                            "Level 1 darf nicht in Level 2 verschachtelt sein",
                            str(div_l1)[:100]
                        ))
                    if 'detail-level-3' in parent_classes:
                        errors.append(self._create_error(
                            'structure-nesting',
                            "Level 1 darf nicht in Level 3 verschachtelt sein",
                            str(div_l1)[:100]
                        ))
                parent = parent.parent
        
        # 6. Content-Type Boxen
        content_type_boxes = section.find_all(attrs={'data-content-type': True})
        valid_content_types = ['info', 'warning', 'tip', 'example', 'definition', 'note']
        
        for box in content_type_boxes:
            content_type = box.get('data-content-type')
            if content_type not in valid_content_types:
                warnings.append(self._create_warning(
                    'structure-content-type',
                    f"Unbekannter data-content-type: '{content_type}'",
                    str(box)[:100]
                ))
        
        # 7. Agent-Context Block
        agent_context = section.find('div', class_='agent-context-block')
        if not agent_context:
            warnings.append(self._create_warning(
                'structure-agent',
                "Agent-Context Block fehlt (empfohlen)",
                "<section>"
            ))
        
        logger.debug(f"Struktur Validierung: L1={len(detail_level_1)}, L2={len(detail_level_2)}, L3={len(detail_level_3)}")
        return errors, warnings
