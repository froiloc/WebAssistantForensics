"""
Validator Module - Option A (Basis-Validierung)

Validiert Section-HTML-Dateien auf:
1. JSON-LD Schema-Struktur
2. HTML Basic Wellformedness
3. BFSG Basis-Checks (5 Regeln)
4. Link-Syntax (data-ref)
5. Terminologie-Tags (keywords)

Author: Claude (Phase 1 Module)
Date: 2025-10-24
Version: 1.0 (Option A)
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Optional
from bs4 import BeautifulSoup
import logging

logger = logging.getLogger(__name__)


class Validator:
    """
    Validiert Section-HTML-Dateien (Option A: Basis-Validierung).
    
    Validierungsbereiche:
    1. JSON-LD: Schema-Struktur prüfen
    2. HTML: Basic wellformedness
    3. BFSG: 5 kritische Barrierefreiheits-Regeln
    4. Links: data-ref Syntax prüfen
    5. Terminologie: keywords vorhanden?
    """
    
    def __init__(self, config: Optional[Dict] = None):
        """
        Initialisiert den Validator.
        
        Args:
            config: Validierungs-Konfiguration aus config.yaml
        """
        self.config = config or {
            "fail_on_errors": True,
            "json_ld_validation": True,
            "html_validation": True,
            "bfsg_validation": True,
            "link_validation": True,
            "terminology_validation": True
        }
        
        # Statistiken
        self.stats = {
            "validated": 0,
            "errors": 0,
            "warnings": 0
        }
    
    def validate_section_html(self, html_path: str) -> Dict:
        """
        Validiert eine Section-HTML-Datei.
        
        Args:
            html_path: Pfad zur HTML-Datei
            
        Returns:
            Dictionary mit Validierungsergebnis:
            {
                "valid": bool,
                "errors": [{"type": str, "message": str, "location": str}],
                "warnings": [{"type": str, "message": str, "location": str}]
            }
        """
        logger.info(f"🔍 Validiere {html_path}...")
        
        errors = []
        warnings = []
        
        # HTML laden
        try:
            with open(html_path, 'r', encoding='utf-8') as f:
                html_content = f.read()
        except FileNotFoundError:
            return {
                "valid": False,
                "errors": [{"type": "file", "message": f"Datei nicht gefunden: {html_path}", "location": "filesystem"}],
                "warnings": []
            }
        except Exception as e:
            return {
                "valid": False,
                "errors": [{"type": "file", "message": f"Fehler beim Laden: {e}", "location": "filesystem"}],
                "warnings": []
            }
        
        # Parse HTML
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # 1. JSON-LD Validierung
        if self.config.get("json_ld_validation", True):
            json_ld_errors, json_ld_warnings = self._validate_json_ld(soup)
            errors.extend(json_ld_errors)
            warnings.extend(json_ld_warnings)
        
        # 2. HTML Wellformedness
        if self.config.get("html_validation", True):
            html_errors, html_warnings = self._validate_html_wellformedness(soup, html_content)
            errors.extend(html_errors)
            warnings.extend(html_warnings)
        
        # 3. BFSG Basis-Checks
        if self.config.get("bfsg_validation", True):
            bfsg_errors, bfsg_warnings = self._validate_bfsg_basics(soup)
            errors.extend(bfsg_errors)
            warnings.extend(bfsg_warnings)
        
        # 4. Link-Validierung
        if self.config.get("link_validation", True):
            link_errors, link_warnings = self._validate_links(soup, html_path)
            errors.extend(link_errors)
            warnings.extend(link_warnings)
        
        # 5. Terminologie-Validierung
        if self.config.get("terminology_validation", True):
            term_errors, term_warnings = self._validate_terminology(soup)
            errors.extend(term_errors)
            warnings.extend(term_warnings)
        
        # Statistiken aktualisieren
        self.stats["validated"] += 1
        self.stats["errors"] += len(errors)
        self.stats["warnings"] += len(warnings)
        
        # Ergebnis
        valid = len(errors) == 0
        
        if valid:
            logger.info("✅ Validierung erfolgreich")
        else:
            logger.warning(f"⚠️  Validierung mit {len(errors)} Fehler(n) und {len(warnings)} Warnung(en)")
        
        return {
            "valid": valid,
            "errors": errors,
            "warnings": warnings
        }
    
    # ===========================================
    # 1. JSON-LD Validierung
    # ===========================================
    
    def _validate_json_ld(self, soup: BeautifulSoup) -> tuple[List[Dict], List[Dict]]:
        """
        Validiert JSON-LD Schema-Struktur.
        
        Prüft:
        - JSON-LD script-Tag vorhanden
        - JSON valide
        - Pflichtfelder vorhanden (@context, @type, identifier, name, etc.)
        - Datentypen korrekt
        """
        errors = []
        warnings = []
        
        # Finde JSON-LD script-Tag
        json_ld_script = soup.find('script', type='application/ld+json')
        
        if not json_ld_script:
            errors.append({
                "type": "json-ld",
                "message": "JSON-LD script-Tag fehlt",
                "location": "<head>"
            })
            return errors, warnings
        
        # Parse JSON
        try:
            json_ld = json.loads(json_ld_script.string)
        except json.JSONDecodeError as e:
            errors.append({
                "type": "json-ld",
                "message": f"JSON-LD ist nicht valide: {e}",
                "location": "<script type='application/ld+json'>"
            })
            return errors, warnings
        
        # Pflichtfelder prüfen
        required_fields = {
            "@context": str,
            "@type": str,
            "identifier": str,
            "name": str,
            "description": str,
            "learningResourceType": str,
            "inLanguage": str
        }
        
        for field, expected_type in required_fields.items():
            if field not in json_ld:
                errors.append({
                    "type": "json-ld",
                    "message": f"Pflichtfeld fehlt: {field}",
                    "location": "JSON-LD root"
                })
            elif not isinstance(json_ld[field], expected_type):
                errors.append({
                    "type": "json-ld",
                    "message": f"Falscher Datentyp für '{field}': erwartet {expected_type.__name__}, gefunden {type(json_ld[field]).__name__}",
                    "location": f"JSON-LD.{field}"
                })
        
        # Optionale Felder mit Warnungen
        optional_fields = ["keywords", "about", "educationalLevel", "timeRequired"]
        for field in optional_fields:
            if field not in json_ld:
                warnings.append({
                    "type": "json-ld",
                    "message": f"Optionales Feld fehlt: {field}",
                    "location": "JSON-LD root"
                })
        
        return errors, warnings
    
    # ===========================================
    # 2. HTML Wellformedness
    # ===========================================
    
    def _validate_html_wellformedness(self, soup: BeautifulSoup, html_content: str) -> tuple[List[Dict], List[Dict]]:
        """
        Validiert HTML Basic Wellformedness.
        
        Prüft:
        - DOCTYPE vorhanden
        - <html>, <head>, <body> vorhanden
        - Kritische Parsing-Fehler
        """
        errors = []
        warnings = []
        
        # DOCTYPE prüfen
        if not html_content.strip().startswith('<!DOCTYPE html>'):
            warnings.append({
                "type": "html",
                "message": "DOCTYPE fehlt oder ist nicht <!DOCTYPE html>",
                "location": "document start"
            })
        
        # Basis-Struktur prüfen
        if not soup.find('html'):
            errors.append({
                "type": "html",
                "message": "<html>-Tag fehlt",
                "location": "document"
            })
        
        if not soup.find('head'):
            errors.append({
                "type": "html",
                "message": "<head>-Tag fehlt",
                "location": "document"
            })
        
        if not soup.find('body'):
            errors.append({
                "type": "html",
                "message": "<body>-Tag fehlt",
                "location": "document"
            })
        
        # Meta charset prüfen
        meta_charset = soup.find('meta', charset=True)
        if not meta_charset:
            warnings.append({
                "type": "html",
                "message": "<meta charset='UTF-8'> fehlt",
                "location": "<head>"
            })
        
        return errors, warnings
    
    # ===========================================
    # 3. BFSG Basis-Checks (5 Regeln)
    # ===========================================
    
    def _validate_bfsg_basics(self, soup: BeautifulSoup) -> tuple[List[Dict], List[Dict]]:
        """
        Validiert BFSG Basis-Anforderungen (5 Regeln).
        
        Prüft:
        1. lang-Attribut im <html>-Tag
        2. Alle Bilder haben alt-Attribut
        3. Formular-Inputs haben Labels
        4. Links haben aussagekräftigen Text
        5. Überschriften-Hierarchie ist logisch
        """
        errors = []
        warnings = []
        
        # 1. lang-Attribut prüfen
        html_tag = soup.find('html')
        if html_tag and not html_tag.get('lang'):
            errors.append({
                "type": "bfsg",
                "message": "lang-Attribut fehlt im <html>-Tag",
                "location": "<html>"
            })
        elif html_tag and html_tag.get('lang'):
            lang = html_tag.get('lang')
            # ISO 639-1 Format prüfen (2 Buchstaben)
            if not re.match(r'^[a-z]{2}(-[A-Z]{2})?$', lang):
                warnings.append({
                    "type": "bfsg",
                    "message": f"lang-Attribut hat ungewöhnliches Format: '{lang}' (erwartet: ISO 639-1, z.B. 'de' oder 'de-DE')",
                    "location": "<html>"
                })
        
        # 2. Bilder mit alt-Attribut prüfen
        images = soup.find_all('img')
        for idx, img in enumerate(images):
            if not img.has_attr('alt'):
                errors.append({
                    "type": "bfsg",
                    "message": f"Bild #{idx+1} hat kein alt-Attribut",
                    "location": f"<img src='{img.get('src', '?')}'>"
                })
        
        # 3. Formular-Inputs haben Labels
        inputs = soup.find_all(['input', 'textarea', 'select'])
        for idx, input_elem in enumerate(inputs):
            input_id = input_elem.get('id')
            input_type = input_elem.get('type', 'text')
            
            # Skip hidden inputs
            if input_type == 'hidden':
                continue
            
            # Prüfe: Label mit for-Attribut oder aria-label
            has_label = False
            
            if input_id:
                label = soup.find('label', attrs={'for': input_id})
                if label:
                    has_label = True
            
            if input_elem.has_attr('aria-label'):
                has_label = True
            
            if not has_label:
                warnings.append({
                    "type": "bfsg",
                    "message": f"Input #{idx+1} (type={input_type}) hat kein zugeordnetes Label",
                    "location": f"<input id='{input_id or '?'}'>"
                })
        
        # 4. Links haben aussagekräftigen Text
        links = soup.find_all('a', href=True)
        non_descriptive_texts = ['hier', 'klicken', 'mehr', 'weiter', 'link', 'click here', 'read more']
        
        for idx, link in enumerate(links):
            link_text = link.get_text(strip=True).lower()
            
            if not link_text:
                warnings.append({
                    "type": "bfsg",
                    "message": f"Link #{idx+1} hat keinen Text",
                    "location": f"<a href='{link.get('href')}'>"
                })
            elif link_text in non_descriptive_texts:
                warnings.append({
                    "type": "bfsg",
                    "message": f"Link #{idx+1} hat nicht-aussagekräftigen Text: '{link_text}'",
                    "location": f"<a href='{link.get('href')}'>"
                })
        
        # 5. Überschriften-Hierarchie prüfen
        headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
        prev_level = 0
        
        for idx, heading in enumerate(headings):
            level = int(heading.name[1])  # h1 -> 1, h2 -> 2, etc.
            
            # Erste Überschrift sollte h1 sein
            if idx == 0 and level != 1:
                warnings.append({
                    "type": "bfsg",
                    "message": f"Erste Überschrift sollte <h1> sein, gefunden: <{heading.name}>",
                    "location": f"<{heading.name}>"
                })
            
            # Keine Sprünge (z.B. h1 -> h3)
            if prev_level > 0 and level > prev_level + 1:
                warnings.append({
                    "type": "bfsg",
                    "message": f"Überschriften-Sprung: <h{prev_level}> -> <h{level}> (sollte <h{prev_level+1}> sein)",
                    "location": f"<{heading.name}> '{heading.get_text(strip=True)[:30]}...'"
                })
            
            prev_level = level
        
        return errors, warnings
    
    # ===========================================
    # 4. Link-Validierung (Syntax)
    # ===========================================
    
    def _validate_links(self, soup: BeautifulSoup, html_path: str) -> tuple[List[Dict], List[Dict]]:
        """
        Validiert data-ref Links (Syntax-Prüfung).
        
        Prüft:
        - Format: section-id oder section-id#heading-id
        - Keine Self-References
        - IDs bestehen nur aus lowercase + Bindestriche
        """
        errors = []
        warnings = []
        
        # Extrahiere aktuelle Section-ID aus Dateinamen
        current_section_id = Path(html_path).stem.replace('section-', '')
        
        # Finde alle data-ref Elemente
        data_ref_elements = soup.find_all(attrs={'data-ref': True})
        
        # Pattern für valide data-ref: section-id oder section-id#heading-id
        valid_pattern = r'^[a-z][a-z0-9-]*(?:#[a-z][a-z0-9-]*)?$'
        
        for idx, elem in enumerate(data_ref_elements):
            data_ref = elem.get('data-ref')
            
            # Syntax prüfen
            if not re.match(valid_pattern, data_ref):
                errors.append({
                    "type": "link",
                    "message": f"data-ref #{idx+1} hat ungültiges Format: '{data_ref}' (erwartet: section-id oder section-id#heading-id)",
                    "location": str(elem)[:100]
                })
                continue
            
            # Self-Reference prüfen
            target_section = data_ref.split('#')[0]
            if target_section == current_section_id:
                warnings.append({
                    "type": "link",
                    "message": f"data-ref #{idx+1} ist Self-Reference: '{data_ref}'",
                    "location": str(elem)[:100]
                })
            
            # Doppelte Bindestriche prüfen
            if '--' in data_ref:
                warnings.append({
                    "type": "link",
                    "message": f"data-ref #{idx+1} enthält doppelte Bindestriche: '{data_ref}'",
                    "location": str(elem)[:100]
                })
        
        return errors, warnings
    
    # ===========================================
    # 5. Terminologie-Validierung
    # ===========================================
    
    def _validate_terminology(self, soup: BeautifulSoup) -> tuple[List[Dict], List[Dict]]:
        """
        Validiert Terminologie-Tags (keywords im JSON-LD).
        
        Prüft:
        - keywords-Feld vorhanden
        - Mindestens 1 Keyword
        - Jedes Keyword hat term + language
        """
        errors = []
        warnings = []
        
        # JSON-LD laden
        json_ld_script = soup.find('script', type='application/ld+json')
        if not json_ld_script:
            # Wurde bereits in JSON-LD Validierung gemeldet
            return errors, warnings
        
        try:
            json_ld = json.loads(json_ld_script.string)
        except:
            # Wurde bereits in JSON-LD Validierung gemeldet
            return errors, warnings
        
        # keywords prüfen
        if 'keywords' not in json_ld:
            warnings.append({
                "type": "terminology",
                "message": "keywords-Feld fehlt im JSON-LD",
                "location": "JSON-LD"
            })
            return errors, warnings
        
        keywords = json_ld['keywords']
        
        if not isinstance(keywords, list):
            errors.append({
                "type": "terminology",
                "message": f"keywords muss ein Array sein, gefunden: {type(keywords).__name__}",
                "location": "JSON-LD.keywords"
            })
            return errors, warnings
        
        if len(keywords) == 0:
            warnings.append({
                "type": "terminology",
                "message": "keywords-Array ist leer (mindestens 1 Keyword empfohlen)",
                "location": "JSON-LD.keywords"
            })
        
        # Jedes Keyword prüfen
        for idx, keyword in enumerate(keywords):
            if not isinstance(keyword, dict):
                errors.append({
                    "type": "terminology",
                    "message": f"keyword #{idx+1} muss ein Objekt sein, gefunden: {type(keyword).__name__}",
                    "location": f"JSON-LD.keywords[{idx}]"
                })
                continue
            
            # term prüfen
            if 'term' not in keyword:
                errors.append({
                    "type": "terminology",
                    "message": f"keyword #{idx+1} fehlt 'term'-Feld",
                    "location": f"JSON-LD.keywords[{idx}]"
                })
            
            # language prüfen
            if 'language' not in keyword:
                warnings.append({
                    "type": "terminology",
                    "message": f"keyword #{idx+1} fehlt 'language'-Feld",
                    "location": f"JSON-LD.keywords[{idx}]"
                })
        
        return errors, warnings
    
    # ===========================================
    # Statistiken
    # ===========================================
    
    def get_stats(self) -> Dict:
        """Gibt Validierungs-Statistiken zurück."""
        return self.stats.copy()
    
    def reset_stats(self):
        """Setzt Statistiken zurück."""
        self.stats = {
            "validated": 0,
            "errors": 0,
            "warnings": 0
        }
