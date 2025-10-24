"""
HTML Loader Module

Lädt fertige Section-HTML-Dateien für Context Extraction.
Unterstützt Fallback auf Beispiel-Sections für erste 2 Sections.

Author: Claude (Phase 1 Module)
Date: 2025-10-24
"""

import os
from pathlib import Path
from typing import Optional, Dict


class HTMLLoader:
    """
    Lädt Section-HTML-Dateien aus dem output/sections/-Verzeichnis.
    
    Für die ersten Sections (wenn noch keine Vorgänger vorhanden):
    - Lädt Beispiel-Sections aus templates/example-sections/
    """
    
    def __init__(self, sections_dir: str = "output/sections", 
                 examples_dir: str = "templates/example-sections"):
        """
        Initialisiert den HTML Loader.
        
        Args:
            sections_dir: Verzeichnis mit fertigen Section-HTMLs
            examples_dir: Verzeichnis mit Beispiel-Sections
        """
        self.sections_dir = Path(sections_dir)
        self.examples_dir = Path(examples_dir)
        
        # Statistiken
        self.stats = {
            "loaded": 0,
            "from_examples": 0,
            "missing": 0
        }
    
    def exists(self, section_id: str) -> bool:
        """
        Prüft, ob HTML für Section existiert.
        
        Args:
            section_id: Section ID (z.B. "axiom-installation")
            
        Returns:
            True wenn HTML existiert (in sections oder examples), sonst False
        """
        # Prüfe reguläres Section-Verzeichnis
        section_path = self.sections_dir / f"section-{section_id}.html"
        if section_path.exists():
            return True
        
        # Prüfe Beispiel-Verzeichnis
        example_path = self.examples_dir / f"example-{section_id}.html"
        if example_path.exists():
            return True
        
        return False
    
    def load_section_html(self, section_id: str) -> Optional[str]:
        """
        Lädt HTML für eine Section.
        
        Reihenfolge:
        1. Versuche aus output/sections/ zu laden
        2. Falls nicht vorhanden: Versuche aus examples/
        3. Falls beides fehlt: None zurückgeben
        
        Args:
            section_id: Section ID (z.B. "axiom-installation")
            
        Returns:
            HTML als String oder None wenn nicht gefunden
        """
        # Versuch 1: Lade aus regulärem Verzeichnis
        section_path = self.sections_dir / f"section-{section_id}.html"
        if section_path.exists():
            try:
                with open(section_path, 'r', encoding='utf-8') as f:
                    html = f.read()
                self.stats["loaded"] += 1
                return html
            except Exception as e:
                print(f"⚠️  Fehler beim Laden von {section_path}: {e}")
                self.stats["missing"] += 1
                return None
        
        # Versuch 2: Lade aus Beispiel-Verzeichnis
        example_path = self.examples_dir / f"example-{section_id}.html"
        if example_path.exists():
            try:
                with open(example_path, 'r', encoding='utf-8') as f:
                    html = f.read()
                self.stats["from_examples"] += 1
                self.stats["loaded"] += 1
                return html
            except Exception as e:
                print(f"⚠️  Fehler beim Laden von {example_path}: {e}")
                self.stats["missing"] += 1
                return None
        
        # Beide Versuche gescheitert
        self.stats["missing"] += 1
        return None
    
    def load_multiple_sections(self, section_ids: list[str]) -> Dict[str, Optional[str]]:
        """
        Lädt mehrere Sections auf einmal.
        
        Args:
            section_ids: Liste von Section IDs
            
        Returns:
            Dictionary: {section_id: html_content oder None}
        """
        results = {}
        for section_id in section_ids:
            results[section_id] = self.load_section_html(section_id)
        return results
    
    def get_stats(self) -> Dict[str, int]:
        """
        Gibt Statistiken über geladene Dateien zurück.
        
        Returns:
            Dictionary mit Statistiken
        """
        return self.stats.copy()
    
    def reset_stats(self):
        """Setzt Statistiken zurück."""
        self.stats = {
            "loaded": 0,
            "from_examples": 0,
            "missing": 0
        }
    
    def list_available_sections(self) -> list[str]:
        """
        Listet alle verfügbaren Section-IDs auf.
        
        Returns:
            Liste von Section-IDs (ohne Dateiendung)
        """
        available = []
        
        # Aus sections/
        if self.sections_dir.exists():
            for file in self.sections_dir.glob("section-*.html"):
                section_id = file.stem.replace("section-", "")
                available.append(section_id)
        
        # Aus examples/
        if self.examples_dir.exists():
            for file in self.examples_dir.glob("example-*.html"):
                section_id = file.stem.replace("example-", "")
                if section_id not in available:  # Keine Duplikate
                    available.append(section_id)
        
        return sorted(available)


# Convenience-Funktionen für einfachen Zugriff

def load_html(section_id: str, 
              sections_dir: str = "output/sections",
              examples_dir: str = "templates/example-sections") -> Optional[str]:
    """
    Convenience-Funktion: Lädt HTML für eine Section.
    
    Args:
        section_id: Section ID
        sections_dir: Sections-Verzeichnis
        examples_dir: Examples-Verzeichnis
        
    Returns:
        HTML als String oder None
    """
    loader = HTMLLoader(sections_dir, examples_dir)
    return loader.load_section_html(section_id)


def html_exists(section_id: str,
                sections_dir: str = "output/sections",
                examples_dir: str = "templates/example-sections") -> bool:
    """
    Convenience-Funktion: Prüft ob HTML existiert.
    
    Args:
        section_id: Section ID
        sections_dir: Sections-Verzeichnis
        examples_dir: Examples-Verzeichnis
        
    Returns:
        True wenn HTML existiert, sonst False
    """
    loader = HTMLLoader(sections_dir, examples_dir)
    return loader.exists(section_id)
