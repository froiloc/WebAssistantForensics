"""
Modul 5: Terminologie Fuzzy-Matching

Validiert Terminologie mit Fuzzy-Matching gegen Liste.

Prüft:
- Keywords im JSON-LD valide
- Fuzzy-Match für ähnliche Begriffe
- Unbekannte Fachbegriffe

Author: Claude (Phase 1 Module)
Date: 2025-10-27
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Tuple
from bs4 import BeautifulSoup
import logging

try:
    from rapidfuzz import fuzz
except ImportError:
    fuzz = None

from .base_validator import BaseValidator

logger = logging.getLogger(__name__)


class TerminologyValidator(BaseValidator):
    """Validiert Terminologie mit Fuzzy-Matching."""
    
    def __init__(self, config: Dict = None):
        super().__init__(config)
        
        self.terminology = []
        self.fuzzy_threshold = self.config.get('fuzzy_threshold', 80)
        
        terminology_path = self.config.get('terminology_path')
        if terminology_path and Path(terminology_path).exists():
            try:
                with open(terminology_path, 'r', encoding='utf-8') as f:
                    if terminology_path.endswith('.json'):
                        self.terminology = json.load(f)
                    else:
                        self.terminology = [line.strip() for line in f if line.strip()]
                logger.info(f"✅ Terminologie geladen: {len(self.terminology)} Terme")
            except Exception as e:
                logger.warning(f"⚠️ Terminologie konnte nicht geladen werden: {e}")
        
        if not fuzz:
            logger.warning("⚠️ rapidfuzz nicht installiert - reduzierte Terminologie-Validierung")
    
    def validate(self, soup: BeautifulSoup, html_path: str = None, **kwargs) -> Tuple[List[Dict], List[Dict]]:
        """Validiert Terminologie."""
        errors = []
        warnings = []
        
        if not self.terminology:
            warnings.append(self._create_warning(
                'terminology',
                "Terminologie-Liste nicht geladen - Validierung übersprungen",
                "Validator-Konfiguration"
            ))
            return errors, warnings
        
        # 1. Lade JSON-LD Keywords
        json_ld_script = soup.find('script', type='application/ld+json')
        json_ld_keywords = []
        
        if json_ld_script:
            try:
                json_ld = json.loads(json_ld_script.string)
                keywords = json_ld.get('keywords', [])
                
                for keyword in keywords:
                    if isinstance(keyword, dict):
                        json_ld_keywords.append({
                            'term': keyword.get('term', ''),
                            'language': keyword.get('language', 'de'),
                            'status': keyword.get('status', 'approved')
                        })
                    elif isinstance(keyword, str):
                        json_ld_keywords.append({
                            'term': keyword,
                            'language': 'de',
                            'status': 'approved'
                        })
            except:
                pass
        
        # 2. Validiere Keywords gegen Terminologie
        terminology_terms = []
        if self.terminology and len(self.terminology) > 0:
            if isinstance(self.terminology[0], dict):
                terminology_terms = [t['term'] for t in self.terminology if isinstance(t, dict)]
            else:
                terminology_terms = self.terminology
        
        for kw in json_ld_keywords:
            term = kw['term']
            
            # Exakte Übereinstimmung
            if term in terminology_terms:
                continue
            
            # Fuzzy-Match (wenn verfügbar)
            if fuzz:
                best_score = 0
                best_match = None
                
                for valid_term in terminology_terms:
                    score = fuzz.ratio(term.lower(), valid_term.lower())
                    if score > best_score:
                        best_score = score
                        best_match = valid_term
                
                if best_score < self.fuzzy_threshold:
                    warnings.append(self._create_warning(
                        'terminology',
                        f"Keyword nicht in Terminologie: '{term}'",
                        "JSON-LD.keywords",
                        suggestion=f"Ähnlich: '{best_match}' ({best_score}%)" if best_match else None
                    ))
                elif best_score < 100:
                    warnings.append(self._create_warning(
                        'terminology-fuzzy',
                        f"Möglicher Tippfehler: '{term}' → '{best_match}' ({best_score}%)",
                        "JSON-LD.keywords"
                    ))
            else:
                # Ohne Fuzzy-Matching
                warnings.append(self._create_warning(
                    'terminology',
                    f"Keyword nicht in Terminologie: '{term}'",
                    "JSON-LD.keywords"
                ))
        
        logger.debug(f"Terminologie Validierung: {len(json_ld_keywords)} Keywords geprüft")
        return errors, warnings
