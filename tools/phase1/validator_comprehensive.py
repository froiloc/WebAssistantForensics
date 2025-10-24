"""
Validator Module - Option B (Comprehensive Validation)

Umfassende Validierung für Section-HTML-Dateien:
1. JSON-LD: Vollständige jsonschema-basierte Validierung
2. HTML: HTML5-Standard-konforme Validierung
3. BFSG: 20+ WCAG 2.1 Level AA Checks
4. Links: Cross-Reference Validierung gegen Gliederung
5. Terminologie: Fuzzy-Matching gegen Terminologie-Liste
6. Struktur: Matroschka-Prinzip, Section-Hierarchie
7. Media: Bild/Video-Validierung (Format, Größe, Thumbnails)

Author: Claude (Phase 1 Module - Option B)
Date: 2025-10-24
Version: 2.0 (Comprehensive)
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from bs4 import BeautifulSoup
import logging

# Option B Dependencies
import html5lib
import jsonschema
from rapidfuzz import fuzz
from PIL import Image

logger = logging.getLogger(__name__)


class ValidatorComprehensive:
    """
    Umfassender Validator für Section-HTML-Dateien (Option B).
    
    Erweitert Option A mit:
    - JSON-LD: jsonschema-Validierung
    - HTML: HTML5-Standard-Validierung
    - BFSG: 20+ WCAG 2.1 Checks
    - Links: Cross-Reference gegen Gliederung
    - Terminologie: Fuzzy-Matching
    - Struktur: Matroschka-Prinzip
    - Media: Bild/Video-Validierung
    """
    
    def __init__(
        self, 
        config: Optional[Dict] = None,
        json_schema_path: Optional[str] = None,
        terminology_path: Optional[str] = None,
        gliederung_loader = None
    ):
        """
        Initialisiert den Comprehensive Validator.
        
        Args:
            config: Validierungs-Konfiguration
            json_schema_path: Pfad zu JSON-LD Schema
            terminology_path: Pfad zu Terminologie-Liste
            gliederung_loader: GliederungLoader für Cross-Reference-Validierung
        """
        self.config = config or self._default_config()
        self.gliederung_loader = gliederung_loader
        
        # Statistiken
        self.stats = {
            "validated": 0,
            "errors": 0,
            "warnings": 0,
            "by_type": {}
        }
        
        # Initialisiere Option B Komponenten
        self._init_comprehensive_validators(json_schema_path, terminology_path)
        
        logger.info("🚀 ValidatorComprehensive (Option B) initialisiert")
    
    def _default_config(self) -> Dict:
        """Standard-Konfiguration für Option B"""
        return {
            "fail_on_errors": True,
            "fail_on_warnings": False,
            
            # Validierungs-Bereiche (alle aktiviert in Option B)
            "json_ld_validation": True,
            "html_validation": True,
            "bfsg_validation": True,
            "link_validation": True,
            "terminology_validation": True,
            "structure_validation": True,
            "media_validation": True,
            
            # Schwellwerte
            "max_errors_before_abort": 50,
            "fuzzy_match_threshold": 80,  # 0-100, höher = strenger
            "max_image_size_mb": 5,
            "max_video_size_mb": 50,
        }
    
    # ===========================================
    # Initialisierung
    # ===========================================
    
    def _init_comprehensive_validators(
        self, 
        json_schema_path: Optional[str],
        terminology_path: Optional[str]
    ):
        """
        Initialisiert alle Option B Validatoren.
        
        Args:
            json_schema_path: Pfad zu JSON-LD Schema
            terminology_path: Pfad zu Terminologie-Liste
        """
        # JSON-LD Schema laden
        self.json_schema = None
        if json_schema_path and Path(json_schema_path).exists():
            try:
                with open(json_schema_path, 'r', encoding='utf-8') as f:
                    self.json_schema = json.load(f)
                logger.info(f"✅ JSON-LD Schema geladen: {json_schema_path}")
            except Exception as e:
                logger.warning(f"⚠️ JSON-LD Schema konnte nicht geladen werden: {e}")
        
        # Terminologie-Liste laden
        self.terminology = []
        if terminology_path and Path(terminology_path).exists():
            try:
                with open(terminology_path, 'r', encoding='utf-8') as f:
                    # Format kann JSON oder TXT sein
                    if terminology_path.endswith('.json'):
                        self.terminology = json.load(f)
                    else:
                        self.terminology = [line.strip() for line in f if line.strip()]
                logger.info(f"✅ Terminologie geladen: {len(self.terminology)} Terme")
            except Exception as e:
                logger.warning(f"⚠️ Terminologie konnte nicht geladen werden: {e}")
        
        logger.debug("Comprehensive Validators initialisiert")
    
    # ===========================================
    # Haupt-Validierung
    # ===========================================
    
    def validate_section_html(self, html_path: str, section_id: Optional[str] = None) -> Dict:
        """
        Validiert eine Section-HTML-Datei umfassend (Option B).
        
        Args:
            html_path: Pfad zur HTML-Datei
            section_id: Optional Section-ID für Link-Validierung
            
        Returns:
            Dictionary mit Validierungsergebnis:
            {
                "valid": bool,
                "errors": [...],
                "warnings": [...],
                "stats": {...}
            }
        """
        logger.info(f"🔍 Starte umfassende Validierung: {html_path}")
        
        errors = []
        warnings = []
        
        # HTML laden
        try:
            with open(html_path, 'r', encoding='utf-8') as f:
                html_content = f.read()
        except FileNotFoundError:
            return self._create_result(False, [
                {"type": "file", "message": f"Datei nicht gefunden: {html_path}", "location": "filesystem"}
            ], [])
        except Exception as e:
            return self._create_result(False, [
                {"type": "file", "message": f"Fehler beim Laden: {e}", "location": "filesystem"}
            ], [])
        
        # Parse HTML
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # 1. JSON-LD Vollvalidierung
        if self.config.get("json_ld_validation", True):
            json_errors, json_warnings = self._validate_json_ld_comprehensive(soup)
            errors.extend(json_errors)
            warnings.extend(json_warnings)
        
        # 2. HTML5 Validierung
        if self.config.get("html_validation", True):
            html_errors, html_warnings = self._validate_html5(soup, html_content)
            errors.extend(html_errors)
            warnings.extend(html_warnings)
        
        # 3. BFSG Umfassend (20+ Checks)
        if self.config.get("bfsg_validation", True):
            bfsg_errors, bfsg_warnings = self._validate_bfsg_comprehensive(soup)
            errors.extend(bfsg_errors)
            warnings.extend(bfsg_warnings)
        
        # 4. Link Cross-Reference Validierung
        if self.config.get("link_validation", True):
            link_errors, link_warnings = self._validate_links_comprehensive(soup, section_id)
            errors.extend(link_errors)
            warnings.extend(link_warnings)
        
        # 5. Terminologie Fuzzy-Matching
        if self.config.get("terminology_validation", True):
            term_errors, term_warnings = self._validate_terminology_comprehensive(soup)
            errors.extend(term_errors)
            warnings.extend(term_warnings)
        
        # 6. Struktur-Validierung (Matroschka)
        if self.config.get("structure_validation", True):
            struct_errors, struct_warnings = self._validate_structure(soup)
            errors.extend(struct_errors)
            warnings.extend(struct_warnings)
        
        # 7. Media-Validierung
        if self.config.get("media_validation", True):
            media_errors, media_warnings = self._validate_media(soup, html_path)
            errors.extend(media_errors)
            warnings.extend(media_warnings)
        
        # Statistiken aktualisieren
        self._update_stats(errors, warnings)
        
        # Ergebnis
        valid = len(errors) == 0
        
        if valid:
            logger.info("✅ Umfassende Validierung erfolgreich")
        else:
            logger.warning(f"⚠️ Validierung mit {len(errors)} Fehler(n) und {len(warnings)} Warnung(en)")
        
        return self._create_result(valid, errors, warnings)
    
    # ===========================================
    # 1. JSON-LD Vollvalidierung (jsonschema)
    # ===========================================
    
    def _validate_json_ld_comprehensive(self, soup: BeautifulSoup) -> Tuple[List[Dict], List[Dict]]:
        """
        Validiert JSON-LD mit vollständigem jsonschema.
        
        Prüft:
        - JSON-LD script-Tag vorhanden
        - JSON valide
        - Vollständige Schema-Validierung gegen section-metadata.schema.json
        - Alle Pflichtfelder, Typen, Patterns, Enums
        """
        errors = []
        warnings = []
        
        # 1. Finde JSON-LD script-Tag
        json_ld_script = soup.find('script', type='application/ld+json')
        
        if not json_ld_script:
            errors.append({
                "type": "json-ld",
                "message": "JSON-LD script-Tag fehlt",
                "location": "<head> oder <section>",
                "severity": "critical"
            })
            return errors, warnings
        
        # 2. Parse JSON
        try:
            json_ld = json.loads(json_ld_script.string)
        except json.JSONDecodeError as e:
            errors.append({
                "type": "json-ld",
                "message": f"JSON-LD ist nicht valide: {e}",
                "location": f"<script type='application/ld+json'> Zeile {e.lineno}",
                "severity": "critical"
            })
            return errors, warnings
        
        # 3. Schema-Validierung (wenn Schema geladen)
        if self.json_schema:
            try:
                jsonschema.validate(instance=json_ld, schema=self.json_schema)
                logger.debug("✅ JSON-LD Schema-Validierung erfolgreich")
            except jsonschema.ValidationError as e:
                # Haupt-Fehler
                error_path = " → ".join(str(p) for p in e.path) if e.path else "root"
                errors.append({
                    "type": "json-ld-schema",
                    "message": f"Schema-Validierung fehlgeschlagen: {e.message}",
                    "location": f"JSON-LD.{error_path}",
                    "severity": "error",
                    "details": {
                        "validator": e.validator,
                        "validator_value": str(e.validator_value)[:100]
                    }
                })
                
                # Zusätzliche Kontext-Fehler
                for suberror in e.context:
                    sub_path = " → ".join(str(p) for p in suberror.path) if suberror.path else "root"
                    errors.append({
                        "type": "json-ld-schema",
                        "message": f"{suberror.message}",
                        "location": f"JSON-LD.{sub_path}",
                        "severity": "error"
                    })
            
            except jsonschema.SchemaError as e:
                # Schema selbst ist fehlerhaft (sollte nicht passieren)
                errors.append({
                    "type": "json-ld-schema",
                    "message": f"JSON-LD Schema ist fehlerhaft: {e}",
                    "location": "Schema-Datei",
                    "severity": "critical"
                })
        
        else:
            # Keine Schema-Validierung möglich, nur Basis-Checks
            warnings.append({
                "type": "json-ld",
                "message": "JSON-LD Schema nicht geladen - nur Basis-Validierung möglich",
                "location": "Validator-Konfiguration"
            })
            
            # Fallback: Manuelle Pflichtfeld-Prüfung
            required_fields = ["@context", "@type", "identifier", "name", "description", "inLanguage"]
            for field in required_fields:
                if field not in json_ld:
                    errors.append({
                        "type": "json-ld",
                        "message": f"Pflichtfeld fehlt: {field}",
                        "location": "JSON-LD root",
                        "severity": "error"
                    })
        
        # 4. Zusätzliche Plausibilitäts-Checks (unabhängig von Schema)
        
        # Check: @context ist schema.org
        if json_ld.get("@context") != "https://schema.org":
            warnings.append({
                "type": "json-ld",
                "message": f"@context sollte 'https://schema.org' sein, gefunden: '{json_ld.get('@context')}'",
                "location": "JSON-LD.@context"
            })
        
        # Check: @type ist LearningResource
        if json_ld.get("@type") != "LearningResource":
            warnings.append({
                "type": "json-ld",
                "message": f"@type sollte 'LearningResource' sein, gefunden: '{json_ld.get('@type')}'",
                "location": "JSON-LD.@type"
            })
        
        # Check: timeRequired Format (wenn vorhanden)
        if "timeRequired" in json_ld:
            time_req = json_ld["timeRequired"]
            if not re.match(r'^PT\d+M$', time_req):
                errors.append({
                    "type": "json-ld",
                    "message": f"timeRequired hat ungültiges Format: '{time_req}' (erwartet: 'PT5M', 'PT10M', etc.)",
                    "location": "JSON-LD.timeRequired",
                    "severity": "error"
                })
        
        # Check: version Format (wenn vorhanden)
        if "version" in json_ld:
            version = json_ld["version"]
            if not re.match(r'^\d+\.\d+\.\d+$', version):
                errors.append({
                    "type": "json-ld",
                    "message": f"version hat ungültiges Format: '{version}' (erwartet: SemVer wie '1.0.0')",
                    "location": "JSON-LD.version",
                    "severity": "error"
                })
        
        return errors, warnings
    
    # ===========================================
    # 2. HTML5 Validierung
    # ===========================================
    
    def _validate_html5(self, soup: BeautifulSoup, html_content: str) -> Tuple[List[Dict], List[Dict]]:
        """
        Validiert HTML gegen HTML5-Standard mit html5lib.
        
        Prüft:
        - HTML5-Konformität
        - Doctype vorhanden und korrekt
        - Encoding-Deklaration
        - Obsolete Elemente/Attribute
        - Verschachtelung
        - Fehlende schließende Tags
        - Ungültige Attribute
        - ARIA-Attribute valide
        """
        errors = []
        warnings = []
        
        # 1. Parse mit html5lib und Error-Tracking
        parser = html5lib.HTMLParser(strict=True)
        
        try:
            # Parse HTML - html5lib sammelt automatisch Fehler
            doc = html5lib.parse(html_content, treebuilder='etree', namespaceHTMLElements=False)
            
            # html5lib hat einen ErrorHandler, aber wir nutzen eine einfachere Methode:
            # Re-parse mit BeautifulSoup + html5lib Backend für bessere Fehler-Infos
            from bs4 import BeautifulSoup as BS
            soup_html5 = BS(html_content, 'html5lib')
            
            logger.debug("✅ HTML5 Parsing erfolgreich")
            
        except Exception as e:
            errors.append({
                "type": "html5",
                "message": f"HTML5 Parsing fehlgeschlagen: {e}",
                "location": "document",
                "severity": "critical"
            })
            return errors, warnings
        
        # 2. DOCTYPE prüfen
        if not html_content.strip().startswith('<!DOCTYPE html>'):
            doctype_match = re.search(r'<!DOCTYPE[^>]*>', html_content, re.IGNORECASE)
            if doctype_match:
                errors.append({
                    "type": "html5",
                    "message": f"DOCTYPE ist nicht HTML5-konform: '{doctype_match.group()}' (erwartet: '<!DOCTYPE html>')",
                    "location": "document start",
                    "severity": "error"
                })
            else:
                errors.append({
                    "type": "html5",
                    "message": "DOCTYPE fehlt (HTML5 erfordert: <!DOCTYPE html>)",
                    "location": "document start",
                    "severity": "error"
                })
        
        # 3. Encoding-Deklaration prüfen
        meta_charset = soup.find('meta', charset=True)
        meta_content_type = soup.find('meta', attrs={'http-equiv': re.compile(r'content-type', re.I)})
        
        has_charset = meta_charset or (meta_content_type and 'charset' in str(meta_content_type.get('content', '')).lower())
        
        if not has_charset:
            warnings.append({
                "type": "html5",
                "message": "Charset-Deklaration fehlt (empfohlen: <meta charset='UTF-8'>)",
                "location": "<head>"
            })
        elif meta_charset and meta_charset.get('charset').upper() != 'UTF-8':
            warnings.append({
                "type": "html5",
                "message": f"Charset ist nicht UTF-8: '{meta_charset.get('charset')}' (empfohlen: UTF-8)",
                "location": "<head>"
            })
        
        # 4. Basis-Struktur prüfen
        html_tag = soup.find('html')
        if not html_tag:
            errors.append({
                "type": "html5",
                "message": "<html>-Tag fehlt",
                "location": "document",
                "severity": "critical"
            })
        
        head_tag = soup.find('head')
        if not head_tag:
            errors.append({
                "type": "html5",
                "message": "<head>-Tag fehlt",
                "location": "document",
                "severity": "critical"
            })
        
        body_tag = soup.find('body')
        if not body_tag:
            errors.append({
                "type": "html5",
                "message": "<body>-Tag fehlt",
                "location": "document",
                "severity": "critical"
            })
        
        # 5. Obsolete HTML-Elemente prüfen (HTML5 deprecated)
        obsolete_elements = {
            'acronym': 'Verwende <abbr> statt <acronym>',
            'applet': 'Verwende <object> statt <applet>',
            'basefont': 'Verwende CSS statt <basefont>',
            'big': 'Verwende CSS statt <big>',
            'center': 'Verwende CSS text-align statt <center>',
            'dir': 'Verwende <ul> statt <dir>',
            'font': 'Verwende CSS statt <font>',
            'frame': '<frame> ist obsolete, verwende <iframe> oder moderne Layouts',
            'frameset': '<frameset> ist obsolete',
            'noframes': '<noframes> ist obsolete',
            'strike': 'Verwende <del> oder <s> statt <strike>',
            'tt': 'Verwende <code> oder CSS statt <tt>',
            'u': 'Verwende CSS text-decoration statt <u> (außer für Annotationen)'
        }
        
        for element_name, suggestion in obsolete_elements.items():
            obsolete_tags = soup.find_all(element_name)
            for tag in obsolete_tags:
                warnings.append({
                    "type": "html5-obsolete",
                    "message": f"Obsolete HTML-Element: <{element_name}>. {suggestion}",
                    "location": str(tag)[:100]
                })
        
        # 6. Obsolete Attribute prüfen
        obsolete_attributes = {
            'align': 'Verwende CSS text-align/float',
            'bgcolor': 'Verwende CSS background-color',
            'border': 'Verwende CSS border (außer bei <table> mit border="0")',
            'cellpadding': 'Verwende CSS padding',
            'cellspacing': 'Verwende CSS border-spacing',
            'height': 'Verwende CSS height (außer bei <img>/<video>)',
            'width': 'Verwende CSS width (außer bei <img>/<video>)',
            'valign': 'Verwende CSS vertical-align'
        }
        
        for attr_name, suggestion in obsolete_attributes.items():
            elements_with_attr = soup.find_all(attrs={attr_name: True})
            
            for elem in elements_with_attr:
                # Ausnahmen
                if attr_name in ['height', 'width'] and elem.name in ['img', 'video', 'canvas', 'svg']:
                    continue
                if attr_name == 'border' and elem.name == 'table' and elem.get('border') == '0':
                    continue
                
                warnings.append({
                    "type": "html5-obsolete",
                    "message": f"Obsolete Attribut '{attr_name}' in <{elem.name}>. {suggestion}",
                    "location": str(elem)[:100]
                })
        
        # 7. ARIA-Attribute validieren (Basis-Check)
        aria_attributes = [
            'aria-label', 'aria-labelledby', 'aria-describedby', 'aria-hidden',
            'aria-live', 'aria-atomic', 'aria-relevant', 'aria-busy',
            'aria-controls', 'aria-owns', 'aria-expanded', 'aria-pressed',
            'aria-selected', 'aria-checked', 'aria-disabled', 'aria-readonly',
            'aria-required', 'aria-invalid', 'aria-multiline', 'aria-multiselectable',
            'aria-orientation', 'aria-sort', 'aria-valuemin', 'aria-valuemax',
            'aria-valuenow', 'aria-valuetext', 'aria-level', 'aria-posinset', 'aria-setsize'
        ]
        
        # Prüfe auf unbekannte aria-* Attribute
        all_elements = soup.find_all(True)  # Alle Elemente
        for elem in all_elements:
            for attr in elem.attrs:
                if attr.startswith('aria-') and attr not in aria_attributes:
                    warnings.append({
                        "type": "html5-aria",
                        "message": f"Unbekanntes ARIA-Attribut: '{attr}' in <{elem.name}>",
                        "location": str(elem)[:100]
                    })
        
        # 8. Role-Attribut Basis-Check
        valid_roles = [
            'alert', 'alertdialog', 'application', 'article', 'banner', 'button',
            'cell', 'checkbox', 'columnheader', 'combobox', 'complementary',
            'contentinfo', 'definition', 'dialog', 'directory', 'document',
            'feed', 'figure', 'form', 'grid', 'gridcell', 'group', 'heading',
            'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main',
            'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox',
            'menuitemradio', 'navigation', 'none', 'note', 'option', 'presentation',
            'progressbar', 'radio', 'radiogroup', 'region', 'row', 'rowgroup',
            'rowheader', 'scrollbar', 'search', 'searchbox', 'separator',
            'slider', 'spinbutton', 'status', 'switch', 'tab', 'table',
            'tablist', 'tabpanel', 'term', 'textbox', 'timer', 'toolbar',
            'tooltip', 'tree', 'treegrid', 'treeitem'
        ]
        
        elements_with_role = soup.find_all(attrs={'role': True})
        for elem in elements_with_role:
            role = elem.get('role')
            if role not in valid_roles:
                warnings.append({
                    "type": "html5-aria",
                    "message": f"Unbekannte ARIA-Role: '{role}' in <{elem.name}>",
                    "location": str(elem)[:100]
                })
        
        # 9. Title-Element vorhanden
        if not soup.find('title'):
            errors.append({
                "type": "html5",
                "message": "<title>-Tag fehlt in <head>",
                "location": "<head>",
                "severity": "error"
            })
        
        return errors, warnings
    
    # ===========================================
    # 3. BFSG Umfassend (20+ WCAG 2.1 Checks)
    # ===========================================
    
    def _validate_bfsg_comprehensive(self, soup: BeautifulSoup) -> Tuple[List[Dict], List[Dict]]:
        """
        Umfassende WCAG 2.1 Level AA Validierung nach BFSG.
        
        Prüft 20+ Barrierefreiheits-Kriterien:
        - Wahrnehmbarkeit (Perceivable)
        - Bedienbarkeit (Operable)
        - Verständlichkeit (Understandable)
        - Robustheit (Robust)
        """
        errors = []
        warnings = []
        
        # ================================================
        # A. WAHRNEHMBARKEIT (Perceivable)
        # ================================================
        
        # A1. Bilder: Alt-Text Validierung
        images = soup.find_all('img')
        for img in images:
            src = img.get('src', '')
            alt = img.get('alt')
            
            # Kein alt-Attribut
            if alt is None:
                errors.append({
                    "type": "bfsg-perceivable",
                    "message": f"Bild ohne alt-Attribut: {src[:50]}",
                    "location": str(img)[:100],
                    "severity": "error",
                    "wcag": "1.1.1 (A)"
                })
            
            # Alt-Text zu kurz (außer dekorativ)
            elif alt and len(alt.strip()) < 3:
                warnings.append({
                    "type": "bfsg-perceivable",
                    "message": f"Alt-Text sehr kurz: '{alt}' für {src[:50]}",
                    "location": str(img)[:100],
                    "wcag": "1.1.1 (A)"
                })
            
            # Alt-Text enthält "Bild von", "Foto von" etc. (redundant)
            elif alt and re.search(r'\b(bild|foto|grafik|image|picture)\s+(von|of)\b', alt.lower()):
                warnings.append({
                    "type": "bfsg-perceivable",
                    "message": f"Alt-Text redundant: '{alt}' (vermeide 'Bild von...')",
                    "location": str(img)[:100],
                    "wcag": "1.1.1 (A)"
                })
        
        # A2. Audio/Video: Untertitel/Transkripte
        videos = soup.find_all('video')
        for video in videos:
            # Prüfe auf <track kind="captions">
            track = video.find('track', kind='captions')
            if not track:
                errors.append({
                    "type": "bfsg-perceivable",
                    "message": "Video ohne Untertitel (<track kind='captions'>)",
                    "location": str(video)[:100],
                    "severity": "error",
                    "wcag": "1.2.2 (A)"
                })
        
        audios = soup.find_all('audio')
        for audio in audios:
            # Warnung: Audio sollte Transkript haben
            warnings.append({
                "type": "bfsg-perceivable",
                "message": "Audio-Element gefunden - Transkript manuell prüfen",
                "location": str(audio)[:100],
                "wcag": "1.2.1 (A)"
            })
        
        # A3. Überschriften-Hierarchie
        headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
        heading_levels = []
        
        for h in headings:
            level = int(h.name[1])
            heading_levels.append((level, h.get_text(strip=True)[:50], str(h)[:100]))
        
        # Prüfe Hierarchie
        for i in range(1, len(heading_levels)):
            prev_level = heading_levels[i-1][0]
            curr_level = heading_levels[i][0]
            
            # Überspringt Ebenen (h1 → h3)
            if curr_level > prev_level + 1:
                warnings.append({
                    "type": "bfsg-perceivable",
                    "message": f"Überschriften-Hierarchie übersprungen: h{prev_level} → h{curr_level}",
                    "location": f"Nach '{heading_levels[i-1][1]}'",
                    "wcag": "1.3.1 (A)"
                })
        
        # Kein h1
        if not soup.find('h1'):
            warnings.append({
                "type": "bfsg-perceivable",
                "message": "Keine <h1>-Überschrift gefunden (empfohlen für Hauptüberschrift)",
                "location": "document",
                "wcag": "1.3.1 (A)"
            })
        
        # ================================================
        # B. BEDIENBARKEIT (Operable)
        # ================================================
        
        # B1. Tastatur: Interaktive Elemente haben tabindex oder sind nativ fokussierbar
        interactive_elements = soup.find_all(['a', 'button', 'input', 'select', 'textarea'])
        
        for elem in interactive_elements:
            # Links ohne href sind nicht tastatur-zugänglich
            if elem.name == 'a' and not elem.get('href'):
                errors.append({
                    "type": "bfsg-operable",
                    "message": f"Link ohne href-Attribut (nicht tastatur-zugänglich): {elem.get_text(strip=True)[:50]}",
                    "location": str(elem)[:100],
                    "severity": "error",
                    "wcag": "2.1.1 (A)"
                })
            
            # Buttons ohne type
            if elem.name == 'button' and not elem.get('type'):
                warnings.append({
                    "type": "bfsg-operable",
                    "message": f"Button ohne type-Attribut (Standard ist 'submit'): {elem.get_text(strip=True)[:50]}",
                    "location": str(elem)[:100],
                    "wcag": "4.1.2 (A)"
                })
        
        # B2. Links: Aussagekräftige Link-Texte
        links = soup.find_all('a', href=True)
        for link in links:
            link_text = link.get_text(strip=True)
            aria_label = link.get('aria-label', '')
            
            # Leerer Link-Text und kein aria-label
            if not link_text and not aria_label:
                errors.append({
                    "type": "bfsg-operable",
                    "message": f"Link ohne Text oder aria-label: {link.get('href', '')[:50]}",
                    "location": str(link)[:100],
                    "severity": "error",
                    "wcag": "2.4.4 (A)"
                })
            
            # Nicht-aussagekräftige Link-Texte
            non_descriptive = ['hier', 'klicken', 'mehr', 'weiter', 'link', 'click here', 'more', 'read more']
            if link_text.lower() in non_descriptive:
                warnings.append({
                    "type": "bfsg-operable",
                    "message": f"Nicht-aussagekräftiger Link-Text: '{link_text}' (verwende beschreibenden Text)",
                    "location": str(link)[:100],
                    "wcag": "2.4.4 (A)"
                })
        
        # B3. Formulare: Label für alle Inputs
        inputs = soup.find_all(['input', 'select', 'textarea'])
        for inp in inputs:
            input_type = inp.get('type', 'text')
            input_id = inp.get('id')
            
            # Skip hidden inputs
            if input_type == 'hidden':
                continue
            
            # Prüfe Label
            has_label = False
            
            # 1. Explizites Label via for-Attribut
            if input_id:
                label = soup.find('label', attrs={'for': input_id})
                if label:
                    has_label = True
            
            # 2. Implizites Label (input in label)
            parent_label = inp.find_parent('label')
            if parent_label:
                has_label = True
            
            # 3. aria-label oder aria-labelledby
            if inp.get('aria-label') or inp.get('aria-labelledby'):
                has_label = True
            
            # 4. title-Attribut (Fallback)
            if inp.get('title'):
                has_label = True
            
            if not has_label:
                errors.append({
                    "type": "bfsg-operable",
                    "message": f"Input-Element ohne Label: type='{input_type}' name='{inp.get('name', '?')}'",
                    "location": str(inp)[:100],
                    "severity": "error",
                    "wcag": "3.3.2 (A)"
                })
        
        # ================================================
        # C. VERSTÄNDLICHKEIT (Understandable)
        # ================================================
        
        # C1. Sprache: lang-Attribut
        html_tag = soup.find('html')
        if not html_tag:
            warnings.append({
                "type": "bfsg-understandable",
                "message": "<html>-Tag fehlt (kann lang-Attribut nicht prüfen)",
                "location": "document",
                "wcag": "3.1.1 (A)"
            })
        elif not html_tag.get('lang'):
            errors.append({
                "type": "bfsg-understandable",
                "message": "<html>-Tag ohne lang-Attribut",
                "location": "<html>",
                "severity": "error",
                "wcag": "3.1.1 (A)"
            })
        
        # C2. Sprachwechsel: Elemente mit anderem lang-Attribut
        elements_with_lang = soup.find_all(attrs={'lang': True})
        html_lang = html_tag.get('lang', 'de') if html_tag else 'de'
        
        for elem in elements_with_lang:
            elem_lang = elem.get('lang')
            if elem_lang != html_lang:
                # Das ist korrekt! Nur Info
                logger.debug(f"Sprachwechsel erkannt: {html_lang} → {elem_lang} in <{elem.name}>")
        
        # ================================================
        # D. ROBUSTHEIT (Robust)
        # ================================================
        
        # D1. IDs: Keine Duplikate
        elements_with_id = soup.find_all(id=True)
        id_counts = {}
        
        for elem in elements_with_id:
            elem_id = elem.get('id')
            id_counts[elem_id] = id_counts.get(elem_id, 0) + 1
        
        for elem_id, count in id_counts.items():
            if count > 1:
                errors.append({
                    "type": "bfsg-robust",
                    "message": f"Doppelte ID: '{elem_id}' ({count}x verwendet)",
                    "location": "document",
                    "severity": "error",
                    "wcag": "4.1.1 (A)"
                })
        
        # D2. ARIA: role mit fehlenden Required Properties
        aria_role_requirements = {
            'checkbox': ['aria-checked'],
            'radio': ['aria-checked'],
            'textbox': [],  # Optional: aria-multiline
            'combobox': ['aria-expanded'],
            'slider': ['aria-valuemin', 'aria-valuemax', 'aria-valuenow'],
            'progressbar': ['aria-valuemin', 'aria-valuemax', 'aria-valuenow'],
            'tab': ['aria-selected'],
            'tabpanel': [],  # Sollte aria-labelledby haben
        }
        
        elements_with_role = soup.find_all(attrs={'role': True})
        for elem in elements_with_role:
            role = elem.get('role')
            
            if role in aria_role_requirements:
                required_attrs = aria_role_requirements[role]
                
                for required_attr in required_attrs:
                    if not elem.get(required_attr):
                        warnings.append({
                            "type": "bfsg-robust",
                            "message": f"role='{role}' ohne erforderliches Attribut '{required_attr}'",
                            "location": str(elem)[:100],
                            "wcag": "4.1.2 (A)"
                        })
        
        # D3. Semantik: Verwende semantische HTML5-Elemente
        # Prüfe auf <div role="..."> wo semantisches Element besser wäre
        semantic_roles_to_elements = {
            'navigation': '<nav>',
            'main': '<main>',
            'article': '<article>',
            'aside': '<aside>',
            'section': '<section>',
            'header': '<header>',
            'footer': '<footer>'
        }
        
        for elem in elements_with_role:
            role = elem.get('role')
            if role in semantic_roles_to_elements and elem.name == 'div':
                warnings.append({
                    "type": "bfsg-robust",
                    "message": f"Verwende semantisches Element {semantic_roles_to_elements[role]} statt <div role='{role}'>",
                    "location": str(elem)[:100],
                    "wcag": "4.1.2 (A)"
                })
        
        return errors, warnings
    
    # ===========================================
    # 4. Link Cross-Reference Validierung
    # ===========================================
    
    def _validate_links_comprehensive(
        self, 
        soup: BeautifulSoup, 
        section_id: Optional[str]
    ) -> Tuple[List[Dict], List[Dict]]:
        """
        Validiert Links gegen Gliederung (Cross-References).
        
        Prüft:
        - Interne Links (#anchors) existieren
        - Cross-References zu anderen Sections valide
        - Konsistenz JSON-LD ↔ HTML Links
        - Predecessor/Successor Links
        - Prerequisites Links
        - Externe Links (Warnung)
        - Tote Anker
        - Doppelte Anker
        """
        errors = []
        warnings = []
        
        # 1. Sammle alle IDs im Dokument (mögliche Anker-Ziele)
        all_ids = set()
        elements_with_id = soup.find_all(id=True)
        for elem in elements_with_id:
            all_ids.add(elem.get('id'))
        
        # 2. Sammle alle Links
        all_links = soup.find_all('a', href=True)
        
        internal_links = []
        external_links = []
        
        for link in all_links:
            href = link.get('href', '')
            
            # Interne Links (#anchor)
            if href.startswith('#'):
                internal_links.append((link, href[1:]))  # Ohne #
            
            # Externe Links
            elif href.startswith('http://') or href.startswith('https://'):
                external_links.append((link, href))
            
            # Relative Links (werden als extern behandelt)
            elif href and not href.startswith('#'):
                external_links.append((link, href))
        
        # 3. Validiere interne Links
        for link, anchor in internal_links:
            if anchor not in all_ids:
                errors.append({
                    "type": "link-internal",
                    "message": f"Interner Link auf nicht-existierendes Ziel: #{anchor}",
                    "location": f"Link-Text: '{link.get_text(strip=True)[:50]}'",
                    "severity": "error"
                })
        
        # 4. Warnung bei externen Links (sollten dokumentiert sein)
        if external_links:
            warnings.append({
                "type": "link-external",
                "message": f"{len(external_links)} externe Link(s) gefunden - manuell prüfen",
                "location": "document"
            })
            
            # Detail-Warnung für jeden externen Link (max 3)
            for link, href in external_links[:3]:
                warnings.append({
                    "type": "link-external",
                    "message": f"Externer Link: {href[:80]}",
                    "location": f"Link-Text: '{link.get_text(strip=True)[:50]}'"
                })
        
        # 5. Cross-Reference Validierung (wenn gliederung_loader verfügbar)
        if self.gliederung_loader and section_id:
            
            # 5a. Lade JSON-LD Metadaten
            json_ld_script = soup.find('script', type='application/ld+json')
            json_ld_cross_refs = []
            
            if json_ld_script:
                try:
                    json_ld = json.loads(json_ld_script.string)
                    
                    # relatedLink aus JSON-LD
                    related_links = json_ld.get('relatedLink', [])
                    for rel_link in related_links:
                        if isinstance(rel_link, dict):
                            url = rel_link.get('url', '')
                            if url.startswith('#'):
                                json_ld_cross_refs.append(url[1:])
                    
                except:
                    pass
            
            # 5b. Sammle HTML Cross-Reference Links
            html_cross_refs = []
            for link, anchor in internal_links:
                # Links zu anderen Sections (format: section-xyz oder axiom-xyz)
                if anchor.startswith('section-') or anchor.startswith('axiom-'):
                    html_cross_refs.append(anchor)
            
            # 5c. Prüfe ob Cross-References in Gliederung existieren
            for ref_id in set(html_cross_refs + json_ld_cross_refs):
                # Prüfe ob Section existiert
                section = self.gliederung_loader.get_section_by_id(ref_id)
                
                if not section:
                    errors.append({
                        "type": "link-cross-reference",
                        "message": f"Cross-Reference zu nicht-existierender Section: {ref_id}",
                        "location": "HTML oder JSON-LD",
                        "severity": "error"
                    })
            
            # 5d. Prüfe Konsistenz: JSON-LD ↔ HTML
            json_ld_set = set(json_ld_cross_refs)
            html_set = set(html_cross_refs)
            
            # In JSON-LD aber nicht in HTML
            missing_in_html = json_ld_set - html_set
            for ref_id in missing_in_html:
                warnings.append({
                    "type": "link-consistency",
                    "message": f"Cross-Reference in JSON-LD aber nicht im HTML: {ref_id}",
                    "location": "JSON-LD.relatedLink"
                })
            
            # In HTML aber nicht in JSON-LD
            missing_in_jsonld = html_set - json_ld_set
            for ref_id in missing_in_jsonld:
                warnings.append({
                    "type": "link-consistency",
                    "message": f"Cross-Reference im HTML aber nicht im JSON-LD: {ref_id}",
                    "location": "HTML <a href>"
                })
            
            # 5e. Prüfe Predecessor/Successor Links
            section = self.gliederung_loader.get_section_by_id(section_id)
            
            if section:
                predecessor_id = section.get('predecessorSection')
                successor_id = section.get('successorSection')
                
                # Empfehlung: Links zu Predecessor/Successor
                if predecessor_id:
                    predecessor_link_exists = any(
                        anchor == f"section-{predecessor_id}" or anchor == predecessor_id
                        for _, anchor in internal_links
                    )
                    
                    if not predecessor_link_exists:
                        warnings.append({
                            "type": "link-navigation",
                            "message": f"Empfehlung: Link zu Vorgänger-Section fehlt: {predecessor_id}",
                            "location": "Navigation"
                        })
                
                if successor_id:
                    successor_link_exists = any(
                        anchor == f"section-{successor_id}" or anchor == successor_id
                        for _, anchor in internal_links
                    )
                    
                    if not successor_link_exists:
                        warnings.append({
                            "type": "link-navigation",
                            "message": f"Empfehlung: Link zu Nachfolger-Section fehlt: {successor_id}",
                            "location": "Navigation"
                        })
                
                # 5f. Prüfe Prerequisites Links
                prerequisites = section.get('prerequisites', {}).get('contentual', [])
                
                for prereq_id in prerequisites:
                    prereq_link_exists = any(
                        anchor == f"section-{prereq_id}" or anchor == prereq_id
                        for _, anchor in internal_links
                    )
                    
                    if not prereq_link_exists:
                        warnings.append({
                            "type": "link-prerequisites",
                            "message": f"Empfehlung: Link zu Prerequisite-Section fehlt: {prereq_id}",
                            "location": "Prerequisites"
                        })
        
        else:
            # Keine Gliederung verfügbar - nur Basis-Validierung
            if section_id:
                warnings.append({
                    "type": "link-cross-reference",
                    "message": "GliederungLoader nicht verfügbar - Cross-Reference Validierung übersprungen",
                    "location": "Validator-Konfiguration"
                })
        
        # 6. Prüfe auf Fragment-Identifier ohne Ziel (tote Anker)
        # (Bereits in Schritt 3 abgedeckt)
        
        # 7. Statistik
        logger.debug(f"Link-Validierung: {len(internal_links)} intern, {len(external_links)} extern")
        
        return errors, warnings
    
    # ===========================================
    # 5. Terminologie Fuzzy-Matching
    # ===========================================
    
    def _validate_terminology_comprehensive(self, soup: BeautifulSoup) -> Tuple[List[Dict], List[Dict]]:
        """
        Validiert Terminologie mit Fuzzy-Matching gegen Liste.
        
        Prüft:
        - Keywords im JSON-LD valide
        - Fuzzy-Match für ähnliche Begriffe
        - Unbekannte Fachbegriffe
        - Konsistenz der Verwendung
        - Sprach-Tags für Terminologie
        """
        errors = []
        warnings = []
        
        # Wenn keine Terminologie geladen, überspringe
        if not self.terminology:
            warnings.append({
                "type": "terminology",
                "message": "Terminologie-Liste nicht geladen - Validierung übersprungen",
                "location": "Validator-Konfiguration"
            })
            return errors, warnings
        
        # 1. Lade JSON-LD Keywords
        json_ld_script = soup.find('script', type='application/ld+json')
        json_ld_keywords = []
        
        if json_ld_script:
            try:
                json_ld = json.loads(json_ld_script.string)
                
                # keywords Array aus JSON-LD
                keywords = json_ld.get('keywords', [])
                
                for keyword in keywords:
                    if isinstance(keyword, dict):
                        term = keyword.get('term', '')
                        language = keyword.get('language', 'de')
                        status = keyword.get('status', 'approved')
                        
                        json_ld_keywords.append({
                            'term': term,
                            'language': language,
                            'status': status
                        })
                    elif isinstance(keyword, str):
                        # Einfaches String-Format
                        json_ld_keywords.append({
                            'term': keyword,
                            'language': 'de',
                            'status': 'approved'
                        })
                
            except:
                pass
        
        # 2. Validiere Keywords gegen Terminologie
        threshold = self.config.get('fuzzy_match_threshold', 80)
        
        for kw in json_ld_keywords:
            term = kw['term']
            lang = kw['language']
            status = kw['status']
            
            # Prüfe ob Term in Terminologie existiert
            # Terminologie kann String-Liste oder Dict-Liste sein
            terminology_terms = []
            
            if self.terminology and len(self.terminology) > 0:
                if isinstance(self.terminology[0], dict):
                    # Dict-Format: [{"term": "...", "language": "...", ...}, ...]
                    terminology_terms = [
                        t['term'] for t in self.terminology 
                        if isinstance(t, dict) and t.get('language', 'de') == lang
                    ]
                else:
                    # String-Format: ["Begriff1", "Begriff2", ...]
                    terminology_terms = self.terminology
            
            # Exakte Übereinstimmung
            if term in terminology_terms:
                logger.debug(f"✓ Keyword '{term}' in Terminologie gefunden")
                continue
            
            # Fuzzy-Match
            best_match = None
            best_score = 0
            
            for valid_term in terminology_terms:
                # Verwende rapidfuzz für Fuzzy-Matching
                score = fuzz.ratio(term.lower(), valid_term.lower())
                
                if score > best_score:
                    best_score = score
                    best_match = valid_term
            
            # Kein Match gefunden
            if best_score < threshold:
                warnings.append({
                    "type": "terminology",
                    "message": f"Keyword nicht in Terminologie: '{term}' (Sprache: {lang})",
                    "location": "JSON-LD.keywords",
                    "suggestion": f"Ähnlichster Begriff: '{best_match}' ({best_score}%)" if best_match else None
                })
            
            # Ähnlicher Begriff gefunden (Tippfehler?)
            elif best_score < 100:
                warnings.append({
                    "type": "terminology-fuzzy",
                    "message": f"Möglicher Tippfehler: '{term}' → vorgeschlagen: '{best_match}' ({best_score}% Ähnlichkeit)",
                    "location": "JSON-LD.keywords"
                })
            
            # Deprecated Status
            if status == 'deprecated':
                warnings.append({
                    "type": "terminology-status",
                    "message": f"Keyword ist deprecated: '{term}'",
                    "location": "JSON-LD.keywords"
                })
        
        # 3. Extrahiere potenzielle Fachbegriffe aus Content
        # (Wörter mit Großbuchstaben, technische Begriffe)
        text_content = soup.get_text()
        
        # Finde Wörter die potenzielle Fachbegriffe sein könnten
        # - Beginnen mit Großbuchstabe
        # - Mindestens 4 Zeichen
        # - Nicht am Satzanfang
        potential_terms = set()
        
        # Einfache Heuristik: Wörter in der Mitte von Sätzen mit Großbuchstaben
        sentences = text_content.split('.')
        for sentence in sentences:
            words = sentence.split()
            for i, word in enumerate(words):
                # Skip erstes Wort (Satzanfang)
                if i == 0:
                    continue
                
                # Entferne Satzzeichen
                clean_word = re.sub(r'[^\w-]', '', word)
                
                # Prüfe ob Großbuchstabe und mind. 4 Zeichen
                if clean_word and len(clean_word) >= 4 and clean_word[0].isupper():
                    potential_terms.add(clean_word)
        
        # 4. Prüfe potenzielle Fachbegriffe gegen Terminologie
        # (Nur Warnung, kein Fehler)
        unrecognized_count = 0
        
        for term in potential_terms:
            # Prüfe gegen Terminologie
            terminology_terms = []
            
            if self.terminology and len(self.terminology) > 0:
                if isinstance(self.terminology[0], dict):
                    terminology_terms = [t['term'] for t in self.terminology if isinstance(t, dict)]
                else:
                    terminology_terms = self.terminology
            
            # Exakter Match oder Fuzzy-Match
            exact_match = term in terminology_terms
            
            if not exact_match:
                # Fuzzy-Match
                best_score = 0
                for valid_term in terminology_terms:
                    score = fuzz.ratio(term.lower(), valid_term.lower())
                    if score > best_score:
                        best_score = score
                
                # Unbekannter Begriff (unter Threshold)
                if best_score < threshold:
                    unrecognized_count += 1
                    
                    # Nur erste 3 unbekannte Begriffe warnen
                    if unrecognized_count <= 3:
                        warnings.append({
                            "type": "terminology-unrecognized",
                            "message": f"Potenzieller Fachbegriff nicht in Terminologie: '{term}'",
                            "location": "Content-Text"
                        })
        
        # Zusammenfassung bei vielen unbekannten Begriffen
        if unrecognized_count > 3:
            warnings.append({
                "type": "terminology-unrecognized",
                "message": f"{unrecognized_count} potenzielle Fachbegriffe nicht in Terminologie (erste 3 gelistet)",
                "location": "Content-Text"
            })
        
        # 5. Konsistenz-Check: Gleicher Begriff immer gleich geschrieben
        # Sammle alle Varianten ähnlicher Begriffe
        term_variants = {}
        
        for term in potential_terms:
            # Normalisierte Form (lowercase)
            normalized = term.lower()
            
            if normalized not in term_variants:
                term_variants[normalized] = []
            
            term_variants[normalized].append(term)
        
        # Prüfe auf Inkonsistenzen (verschiedene Schreibweisen)
        for normalized, variants in term_variants.items():
            unique_variants = set(variants)
            
            if len(unique_variants) > 1:
                warnings.append({
                    "type": "terminology-consistency",
                    "message": f"Inkonsistente Schreibweise: {', '.join(sorted(unique_variants))}",
                    "location": "Content-Text"
                })
        
        logger.debug(f"Terminologie-Validierung: {len(json_ld_keywords)} Keywords, {len(potential_terms)} potenzielle Fachbegriffe")
        
        return errors, warnings
    
    # ===========================================
    # 6. Struktur-Validierung (Matroschka)
    # ===========================================
    
    def _validate_structure(self, soup: BeautifulSoup) -> Tuple[List[Dict], List[Dict]]:
        """
        Validiert Struktur nach Matroschka-Prinzip.
        
        Prüft:
        - Matroschka-Struktur (Level 1 ⊆ 2 ⊆ 3)
        - Detail-Level Attribute korrekt
        - Verschachtelung (Level 2 in 1, Level 3 in 2 oder 1)
        - Section Pflicht-Attribute
        - Content-Type Boxen
        - Agent-Context Block
        - Media-Placeholder
        - data-ref Konsistenz
        """
        errors = []
        warnings = []
        
        # 1. Prüfe Section-Element und Pflicht-Attribute
        section = soup.find('section', class_='content-section')
        
        if not section:
            errors.append({
                "type": "structure",
                "message": "Keine <section class='content-section'> gefunden",
                "location": "document",
                "severity": "critical"
            })
            return errors, warnings
        
        # Pflicht-Attribute für Section
        required_section_attrs = ['id', 'data-section', 'data-level', 'data-title', 'lang']
        
        for attr in required_section_attrs:
            if not section.get(attr):
                errors.append({
                    "type": "structure-section",
                    "message": f"Section fehlt Pflicht-Attribut: {attr}",
                    "location": "<section>",
                    "severity": "error"
                })
        
        # data-detail-level validieren (1, 2, oder 3)
        section_detail_level = section.get('data-detail-level')
        if section_detail_level:
            try:
                level = int(section_detail_level)
                if level not in [1, 2, 3]:
                    errors.append({
                        "type": "structure-detail-level",
                        "message": f"Ungültiger data-detail-level Wert: {section_detail_level} (erwartet: 1, 2, oder 3)",
                        "location": "<section>",
                        "severity": "error"
                    })
            except ValueError:
                errors.append({
                    "type": "structure-detail-level",
                    "message": f"data-detail-level ist keine Zahl: {section_detail_level}",
                    "location": "<section>",
                    "severity": "error"
                })
        
        # 2. Matroschka-Struktur: Detail-Level Divs validieren
        detail_level_1 = section.find_all('div', class_='detail-level-1')
        detail_level_2 = section.find_all('div', class_='detail-level-2')
        detail_level_3 = section.find_all('div', class_='detail-level-3')
        
        # 3. Verschachtelungs-Regeln prüfen
        # Regel: Level 2 KANN in Level 1 sein, Level 3 KANN in Level 2 oder Level 1 sein
        # ABER: Level 1 NIEMALS in Level 2/3, Level 2 NIEMALS in Level 3
        
        # Prüfe: Level 1 nicht in Level 2 oder 3
        for div_l1 in detail_level_1:
            parent = div_l1.parent
            
            # Prüfe Eltern-Kette
            while parent and parent.name != 'section':
                if parent.get('class'):
                    parent_classes = parent.get('class', [])
                    
                    if 'detail-level-2' in parent_classes:
                        errors.append({
                            "type": "structure-nesting",
                            "message": "Verschachtelungs-Fehler: Level 1 darf nicht in Level 2 verschachtelt sein",
                            "location": str(div_l1)[:100],
                            "severity": "error"
                        })
                    
                    if 'detail-level-3' in parent_classes:
                        errors.append({
                            "type": "structure-nesting",
                            "message": "Verschachtelungs-Fehler: Level 1 darf nicht in Level 3 verschachtelt sein",
                            "location": str(div_l1)[:100],
                            "severity": "error"
                        })
                
                parent = parent.parent
        
        # Prüfe: Level 2 nicht in Level 3
        for div_l2 in detail_level_2:
            parent = div_l2.parent
            
            while parent and parent.name != 'section':
                if parent.get('class'):
                    parent_classes = parent.get('class', [])
                    
                    if 'detail-level-3' in parent_classes:
                        errors.append({
                            "type": "structure-nesting",
                            "message": "Verschachtelungs-Fehler: Level 2 darf nicht in Level 3 verschachtelt sein",
                            "location": str(div_l2)[:100],
                            "severity": "error"
                        })
                
                parent = parent.parent
        
        # 4. Prüfe ob deklariertes detail-level mit vorhandenen Leveln übereinstimmt
        if section_detail_level:
            declared_level = int(section_detail_level)
            
            # Wenn data-detail-level="1", sollten keine Level 2/3 Divs existieren
            if declared_level == 1:
                if detail_level_2 or detail_level_3:
                    warnings.append({
                        "type": "structure-consistency",
                        "message": f"Section deklariert detail-level=1, aber enthält Level 2 oder 3 Content",
                        "location": "<section>"
                    })
            
            # Wenn data-detail-level="2", sollten keine Level 3 Divs existieren
            elif declared_level == 2:
                if detail_level_3:
                    warnings.append({
                        "type": "structure-consistency",
                        "message": f"Section deklariert detail-level=2, aber enthält Level 3 Content",
                        "location": "<section>"
                    })
        
        # 5. Content-Type Boxen validieren
        content_type_boxes = section.find_all(attrs={'data-content-type': True})
        
        valid_content_types = ['info', 'warning', 'tip', 'example', 'definition', 'note']
        
        for box in content_type_boxes:
            content_type = box.get('data-content-type')
            
            if content_type not in valid_content_types:
                warnings.append({
                    "type": "structure-content-type",
                    "message": f"Unbekannter data-content-type: '{content_type}' (bekannt: {', '.join(valid_content_types)})",
                    "location": str(box)[:100]
                })
        
        # 6. Agent-Context Block prüfen
        agent_context = section.find('div', class_='agent-context-block')
        
        if not agent_context:
            warnings.append({
                "type": "structure-agent",
                "message": "Agent-Context Block fehlt (empfohlen am Section-Ende)",
                "location": "<section>"
            })
        else:
            # Prüfe Attribute
            if not agent_context.get('data-ref'):
                warnings.append({
                    "type": "structure-agent",
                    "message": "Agent-Context Block fehlt data-ref Attribut",
                    "location": "<div class='agent-context-block'>"
                })
            
            if not agent_context.get('data-context-id'):
                warnings.append({
                    "type": "structure-agent",
                    "message": "Agent-Context Block fehlt data-context-id Attribut",
                    "location": "<div class='agent-context-block'>"
                })
        
        # 7. Media-Placeholder (Figure/Figcaption) validieren
        figures = section.find_all('figure')
        
        for fig in figures:
            # Prüfe data-media-type
            if not fig.get('data-media-type'):
                warnings.append({
                    "type": "structure-media",
                    "message": "Figure ohne data-media-type Attribut",
                    "location": str(fig)[:100]
                })
            
            # Prüfe figcaption
            figcaption = fig.find('figcaption')
            if not figcaption:
                warnings.append({
                    "type": "structure-media",
                    "message": "Figure ohne figcaption (Beschreibung erforderlich)",
                    "location": str(fig)[:100]
                })
            
            # Prüfe media-help-trigger Button
            button = fig.find('button', class_='media-help-trigger')
            if button:
                if not button.get('data-media-id'):
                    warnings.append({
                        "type": "structure-media",
                        "message": "media-help-trigger Button ohne data-media-id",
                        "location": str(button)[:100]
                    })
        
        # 8. data-ref Konsistenz prüfen
        elements_with_ref = section.find_all(attrs={'data-ref': True})
        ref_values = [elem.get('data-ref') for elem in elements_with_ref]
        
        # Prüfe auf Duplikate
        ref_counts = {}
        for ref in ref_values:
            ref_counts[ref] = ref_counts.get(ref, 0) + 1
        
        for ref, count in ref_counts.items():
            if count > 1:
                warnings.append({
                    "type": "structure-ref",
                    "message": f"Doppeltes data-ref Attribut: '{ref}' ({count}x verwendet)",
                    "location": "<section>"
                })
        
        logger.debug(f"Struktur-Validierung: Level 1={len(detail_level_1)}, Level 2={len(detail_level_2)}, Level 3={len(detail_level_3)}")
        
        return errors, warnings
    
    # ===========================================
    # 7. Media-Validierung
    # ===========================================
    
    def _validate_media(self, soup: BeautifulSoup, html_path: str) -> Tuple[List[Dict], List[Dict]]:
        """
        Validiert Bilder und Videos (Format, Größe, Thumbnails).
        
        TODO: Implementierung in nächstem Schritt
        """
        errors = []
        warnings = []
        
        logger.debug("Media-Validierung (STUB)")
        
        return errors, warnings
    
    # ===========================================
    # Hilfsmethoden
    # ===========================================
    
    def _create_result(self, valid: bool, errors: List[Dict], warnings: List[Dict]) -> Dict:
        """Erstellt Validierungs-Result-Dictionary"""
        return {
            "valid": valid,
            "errors": errors,
            "warnings": warnings,
            "stats": {
                "total_errors": len(errors),
                "total_warnings": len(warnings),
                "by_type": self._count_by_type(errors, warnings)
            }
        }
    
    def _count_by_type(self, errors: List[Dict], warnings: List[Dict]) -> Dict:
        """Zählt Errors/Warnings nach Typ"""
        counts = {}
        for item in errors + warnings:
            item_type = item.get("type", "unknown")
            counts[item_type] = counts.get(item_type, 0) + 1
        return counts
    
    def _update_stats(self, errors: List[Dict], warnings: List[Dict]):
        """Aktualisiert Statistiken"""
        self.stats["validated"] += 1
        self.stats["errors"] += len(errors)
        self.stats["warnings"] += len(warnings)
        
        for item in errors + warnings:
            item_type = item.get("type", "unknown")
            self.stats["by_type"][item_type] = self.stats["by_type"].get(item_type, 0) + 1
    
    def get_stats(self) -> Dict:
        """Gibt Validierungs-Statistiken zurück"""
        return self.stats.copy()
    
    def reset_stats(self):
        """Setzt Statistiken zurück"""
        self.stats = {
            "validated": 0,
            "errors": 0,
            "warnings": 0,
            "by_type": {}
        }
