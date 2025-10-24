"""Modul 3: HTML-Sections laden"""

import logging
from pathlib import Path

logger = logging.getLogger(__name__)


class HTMLLoader:
    """Lädt fertige Section-HTMLs"""
    
    def __init__(self, sections_dir: str, examples_dir: str):
        """
        Initialisiert Loader
        
        Args:
            sections_dir: Verzeichnis mit fertigen Sections
            examples_dir: Verzeichnis mit Beispiel-Sections
        """
        self.sections_dir = Path(sections_dir)
        self.examples_dir = Path(examples_dir)
        logger.info(f"📄 HTMLLoader initialisiert (Dummy)")
        logger.debug(f"  Sections: {self.sections_dir}")
        logger.debug(f"  Examples: {self.examples_dir}")
    
    def load_section_html(self, section_id: str) -> str:
        """
        Lädt HTML für Section
        
        Args:
            section_id: ID der Section
        
        Returns:
            HTML-Content als String
        """
        section_path = self.sections_dir / f"section-{section_id}.html"
        
        if not section_path.exists():
            logger.warning(f"⚠️  Section-HTML nicht gefunden: {section_path}")
            raise FileNotFoundError(f"Section-HTML nicht gefunden: {section_id}")
        
        try:
            with open(section_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            logger.debug(f"HTML geladen: {section_id} ({len(content)} Zeichen)")
            return content
        
        except Exception as e:
            logger.error(f"❌ Fehler beim Laden von {section_path}: {e}")
            raise
    
    def load_example_section(self, section_id: str) -> str:
        """
        Lädt Beispiel-Section (für erste 2 Sections)
        
        Args:
            section_id: ID der Section
        
        Returns:
            HTML-Content der Beispiel-Section
        """
        # TODO: Mapping von section_id zu Beispiel-Datei
        # Für jetzt: Dummy-Implementierung
        
        logger.debug(f"Lade Beispiel-Section für {section_id} (Dummy)")
        
        # Versuche Beispiel-Dateien zu laden
        example_files = list(self.examples_dir.glob("example-*.html"))
        
        if not example_files:
            logger.warning(f"⚠️  Keine Beispiel-Sections gefunden in {self.examples_dir}")
            return f"<section><!-- Beispiel-Section für {section_id} --></section>"
        
        # Lade erste Beispiel-Datei als Fallback
        try:
            with open(example_files[0], 'r', encoding='utf-8') as f:
                content = f.read()
            
            logger.debug(f"Beispiel-Section geladen: {example_files[0].name}")
            return content
        
        except Exception as e:
            logger.error(f"❌ Fehler beim Laden der Beispiel-Section: {e}")
            return f"<section><!-- Beispiel-Section für {section_id} --></section>"
    
    def exists(self, section_id: str) -> bool:
        """
        Prüft, ob HTML für Section existiert
        
        Args:
            section_id: ID der Section
        
        Returns:
            True wenn HTML existiert, sonst False
        """
        section_path = self.sections_dir / f"section-{section_id}.html"
        return section_path.exists()
