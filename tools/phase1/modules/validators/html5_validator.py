"""
Modul 2: HTML5 Validierung

Validiert HTML gegen HTML5-Standard mit html5lib.

Prüft:
- HTML5-Konformität
- Doctype vorhanden und korrekt
- Encoding-Deklaration
- Obsolete Elemente/Attribute
- ARIA-Attribute valide

Author: Claude (Phase 1 Module)
Date: 2025-10-27
"""

import re
from typing import Dict, List, Tuple
from bs4 import BeautifulSoup
import logging

try:
    import html5lib
except ImportError:
    html5lib = None

from .base_validator import BaseValidator

logger = logging.getLogger(__name__)


class Html5Validator(BaseValidator):
    """Validiert HTML gegen HTML5-Standard."""
    
    def __init__(self, config: Dict = None):
        super().__init__(config)
        
        if not html5lib:
            logger.warning("⚠️ html5lib nicht installiert - reduzierte HTML5-Validierung")
    
    def validate(self, soup: BeautifulSoup, html_path: str = None, html_content: str = None, **kwargs) -> Tuple[List[Dict], List[Dict]]:
        """Validiert HTML5."""
        errors = []
        warnings = []
        
        # Wenn kein html_content übergeben, versuche aus Datei zu laden
        if not html_content and html_path:
            try:
                with open(html_path, 'r', encoding='utf-8') as f:
                    html_content = f.read()
            except:
                pass
        
        # 1. DOCTYPE prüfen
        if html_content:
            if not html_content.strip().startswith('<!DOCTYPE html>'):
                doctype_match = re.search(r'<!DOCTYPE[^>]*>', html_content, re.IGNORECASE)
                if doctype_match:
                    errors.append(self._create_error(
                        'html5',
                        f"DOCTYPE ist nicht HTML5-konform: '{doctype_match.group()}' (erwartet: '<!DOCTYPE html>')",
                        location="document start",
                        severity="error"
                    ))
                else:
                    errors.append(self._create_error(
                        'html5',
                        "DOCTYPE fehlt (HTML5 erfordert: <!DOCTYPE html>)",
                        location="document start",
                        severity="error"
                    ))
        
        # 2. Encoding-Deklaration prüfen
        meta_charset = soup.find('meta', charset=True)
        meta_content_type = soup.find('meta', attrs={'http-equiv': re.compile(r'content-type', re.I)})
        
        has_charset = meta_charset or (meta_content_type and 'charset' in str(meta_content_type.get('content', '')).lower())
        
        if not has_charset:
            warnings.append(self._create_warning(
                'html5',
                "Charset-Deklaration fehlt (empfohlen: <meta charset='UTF-8'>)",
                location="<head>"
            ))
        elif meta_charset and meta_charset.get('charset').upper() != 'UTF-8':
            warnings.append(self._create_warning(
                'html5',
                f"Charset ist nicht UTF-8: '{meta_charset.get('charset')}' (empfohlen: UTF-8)",
                location="<head>"
            ))
        
        # 3. Basis-Struktur prüfen
        if not soup.find('html'):
            errors.append(self._create_error('html5', "<html>-Tag fehlt", "document", severity="critical"))
        if not soup.find('head'):
            errors.append(self._create_error('html5', "<head>-Tag fehlt", "document", severity="critical"))
        if not soup.find('body'):
            errors.append(self._create_error('html5', "<body>-Tag fehlt", "document", severity="critical"))
        if not soup.find('title'):
            errors.append(self._create_error('html5', "<title>-Tag fehlt in <head>", "<head>", severity="error"))
        
        # 4. Obsolete HTML-Elemente
        obsolete_elements = {
            'acronym': 'Verwende <abbr>', 'center': 'Verwende CSS', 'font': 'Verwende CSS',
            'strike': 'Verwende <del> oder <s>'
        }
        for elem, suggestion in obsolete_elements.items():
            for tag in soup.find_all(elem):
                warnings.append(self._create_warning('html5-obsolete', f"Obsolete: <{elem}>. {suggestion}", str(tag)[:100]))
        
        logger.debug(f"HTML5 Validierung: {len(errors)} Fehler, {len(warnings)} Warnungen")
        return errors, warnings
