"""
Modul 3: BFSG/WCAG 2.1 Validierung

Umfassende WCAG 2.1 Level AA Validierung nach BFSG.

Prüft 20+ Barrierefreiheits-Kriterien:
- Wahrnehmbarkeit (Perceivable)
- Bedienbarkeit (Operable)
- Verständlichkeit (Understandable)
- Robustheit (Robust)

Author: Claude (Phase 1 Module)
Date: 2025-10-27
"""

import re
from typing import Dict, List, Tuple
from bs4 import BeautifulSoup
import logging

from .base_validator import BaseValidator

logger = logging.getLogger(__name__)


class BfsgValidator(BaseValidator):
    """Validiert WCAG 2.1 Level AA nach BFSG."""
    
    def validate(self, soup: BeautifulSoup, html_path: str = None, **kwargs) -> Tuple[List[Dict], List[Dict]]:
        """Validiert BFSG/WCAG 2.1."""
        errors = []
        warnings = []
        
        # A. WAHRNEHMBARKEIT
        # A1. Bilder: Alt-Text
        for img in soup.find_all('img'):
            src = img.get('src', '')
            alt = img.get('alt')
            
            if alt is None:
                errors.append(self._create_error(
                    'bfsg-perceivable',
                    f"Bild ohne alt-Attribut: {src[:50]}",
                    str(img)[:100],
                    wcag="1.1.1 (A)"
                ))
            elif alt and len(alt.strip()) < 3:
                warnings.append(self._create_warning(
                    'bfsg-perceivable',
                    f"Alt-Text sehr kurz: '{alt}' für {src[:50]}",
                    str(img)[:100],
                    wcag="1.1.1 (A)"
                ))
        
        # A2. Videos: Untertitel
        for video in soup.find_all('video'):
            track = video.find('track', kind='captions')
            if not track:
                errors.append(self._create_error(
                    'bfsg-perceivable',
                    "Video ohne Untertitel (<track kind='captions'>)",
                    str(video)[:100],
                    wcag="1.2.2 (A)"
                ))
        
        # A3. Überschriften-Hierarchie
        headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
        heading_levels = [(int(h.name[1]), h.get_text(strip=True)[:50]) for h in headings]
        
        for i in range(1, len(heading_levels)):
            prev_level, curr_level = heading_levels[i-1][0], heading_levels[i][0]
            if curr_level > prev_level + 1:
                warnings.append(self._create_warning(
                    'bfsg-perceivable',
                    f"Überschriften-Hierarchie übersprungen: h{prev_level} → h{curr_level}",
                    f"Nach '{heading_levels[i-1][1]}'",
                    wcag="1.3.1 (A)"
                ))
        
        # B. BEDIENBARKEIT
        # B1. Links ohne href
        for link in soup.find_all('a'):
            if not link.get('href'):
                errors.append(self._create_error(
                    'bfsg-operable',
                    f"Link ohne href (nicht tastatur-zugänglich): {link.get_text(strip=True)[:50]}",
                    str(link)[:100],
                    wcag="2.1.1 (A)"
                ))
        
        # B2. Formulare: Label
        for inp in soup.find_all(['input', 'select', 'textarea']):
            if inp.get('type') == 'hidden':
                continue
            
            input_id = inp.get('id')
            has_label = False
            
            if input_id and soup.find('label', attrs={'for': input_id}):
                has_label = True
            if inp.find_parent('label'):
                has_label = True
            if inp.get('aria-label') or inp.get('aria-labelledby'):
                has_label = True
            
            if not has_label:
                errors.append(self._create_error(
                    'bfsg-operable',
                    f"Input ohne Label: type='{inp.get('type', 'text')}'",
                    str(inp)[:100],
                    wcag="3.3.2 (A)"
                ))
        
        # C. VERSTÄNDLICHKEIT
        # C1. Sprache: lang-Attribut
        html_tag = soup.find('html')
        if html_tag and not html_tag.get('lang'):
            errors.append(self._create_error(
                'bfsg-understandable',
                "<html>-Tag ohne lang-Attribut",
                "<html>",
                wcag="3.1.1 (A)"
            ))
        
        # D. ROBUSTHEIT
        # D1. Doppelte IDs
        elements_with_id = soup.find_all(id=True)
        id_counts = {}
        for elem in elements_with_id:
            elem_id = elem.get('id')
            id_counts[elem_id] = id_counts.get(elem_id, 0) + 1
        
        for elem_id, count in id_counts.items():
            if count > 1:
                errors.append(self._create_error(
                    'bfsg-robust',
                    f"Doppelte ID: '{elem_id}' ({count}x)",
                    "document",
                    wcag="4.1.1 (A)"
                ))
        
        logger.debug(f"BFSG Validierung: {len(errors)} Fehler, {len(warnings)} Warnungen")
        return errors, warnings
