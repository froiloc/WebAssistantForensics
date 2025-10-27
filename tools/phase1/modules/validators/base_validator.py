"""
Base Validator - Gemeinsame Funktionalität für alle Validator-Module

Stellt gemeinsame Methoden und Interfaces bereit.

Author: Claude (Phase 1 Module)
Date: 2025-10-27
"""

from typing import Dict, List, Tuple
from bs4 import BeautifulSoup
import logging

logger = logging.getLogger(__name__)


class BaseValidator:
    """
    Basis-Klasse für alle Validator-Module.
    
    Stellt gemeinsame Funktionalität bereit:
    - Error/Warning-Handling
    - Konfiguration
    - Logging
    """
    
    def __init__(self, config: Dict = None):
        """
        Initialisiert Base Validator.
        
        Args:
            config: Modul-spezifische Konfiguration
        """
        self.config = config or {}
        self.module_name = self.__class__.__name__
        
        logger.debug(f"✓ {self.module_name} initialisiert")
    
    def validate(self, soup: BeautifulSoup, html_path: str = None, **kwargs) -> Tuple[List[Dict], List[Dict]]:
        """
        Haupt-Validierungsmethode (muss von Subklassen implementiert werden).
        
        Args:
            soup: BeautifulSoup-Objekt des HTML
            html_path: Optionaler Pfad zur HTML-Datei
            **kwargs: Zusätzliche Parameter
            
        Returns:
            Tuple[errors, warnings]
        """
        raise NotImplementedError(f"{self.module_name}.validate() muss implementiert werden")
    
    def _create_error(
        self, 
        error_type: str, 
        message: str, 
        location: str = None,
        severity: str = "error",
        **kwargs
    ) -> Dict:
        """
        Erstellt strukturierten Error-Dictionary.
        
        Args:
            error_type: Fehler-Typ (z.B. 'json-ld', 'html5')
            message: Fehlermeldung
            location: Ort des Fehlers im Dokument
            severity: Schweregrad ('critical', 'error', 'warning')
            **kwargs: Zusätzliche Felder
            
        Returns:
            Error-Dictionary
        """
        error = {
            "type": error_type,
            "message": message,
            "severity": severity
        }
        
        if location:
            error["location"] = location
        
        # Zusätzliche Felder
        error.update(kwargs)
        
        return error
    
    def _create_warning(
        self,
        warning_type: str,
        message: str,
        location: str = None,
        **kwargs
    ) -> Dict:
        """
        Erstellt strukturierten Warning-Dictionary.
        
        Args:
            warning_type: Warning-Typ
            message: Warning-Meldung
            location: Ort im Dokument
            **kwargs: Zusätzliche Felder
            
        Returns:
            Warning-Dictionary
        """
        warning = {
            "type": warning_type,
            "message": message
        }
        
        if location:
            warning["location"] = location
        
        # Zusätzliche Felder
        warning.update(kwargs)
        
        return warning
    
    def is_enabled(self) -> bool:
        """
        Prüft ob Modul aktiviert ist.
        
        Returns:
            True wenn aktiviert, False sonst
        """
        return self.config.get('enabled', True)
