"""
Tests für HTML Loader Module

Testet alle Funktionen des HTMLLoader:
- Laden von Section-HTMLs
- Fallback auf Beispiel-Sections
- Existenz-Prüfung
- Fehlerbehandlung
- Statistiken

Author: Claude (Phase 1 Tests)
Date: 2025-10-24
"""

import pytest
import tempfile
import shutil
from pathlib import Path
import sys
import os

# Füge modules/ zum Python-Path hinzu
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'modules'))

from html_loader import HTMLLoader, load_html, html_exists


@pytest.fixture
def temp_dirs():
    """
    Erstellt temporäre Verzeichnisse für Tests.
    """
    # Erstelle temporäre Verzeichnisse
    temp_root = tempfile.mkdtemp()
    sections_dir = Path(temp_root) / "sections"
    examples_dir = Path(temp_root) / "examples"
    
    sections_dir.mkdir(parents=True)
    examples_dir.mkdir(parents=True)
    
    # Mock-HTML für reguläre Section
    section_html = """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Test Section</title>
</head>
<body>
    <section id="test-section">
        <h1>Test Section Content</h1>
        <p>This is a test section.</p>
    </section>
</body>
</html>"""
    
    # Mock-HTML für Beispiel-Section
    example_html = """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Example Section</title>
</head>
<body>
    <section id="example-section">
        <h1>Example Section Content</h1>
        <p>This is an example section used as fallback.</p>
    </section>
</body>
</html>"""
    
    # Erstelle Mock-Dateien
    (sections_dir / "section-test-section.html").write_text(section_html, encoding='utf-8')
    (examples_dir / "example-fallback-section.html").write_text(example_html, encoding='utf-8')
    (examples_dir / "example-axiom-installation.html").write_text(example_html, encoding='utf-8')
    
    yield {
        "root": temp_root,
        "sections": str(sections_dir),
        "examples": str(examples_dir),
        "section_html": section_html,
        "example_html": example_html
    }
    
    # Cleanup
    shutil.rmtree(temp_root)


def test_html_loader_initialization(temp_dirs):
    """Test: HTMLLoader kann initialisiert werden."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    assert loader.sections_dir == Path(temp_dirs["sections"])
    assert loader.examples_dir == Path(temp_dirs["examples"])
    assert loader.stats["loaded"] == 0


def test_exists_section(temp_dirs):
    """Test: exists() erkennt vorhandene Section."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    assert loader.exists("test-section") is True


def test_exists_example_section(temp_dirs):
    """Test: exists() erkennt Beispiel-Section als Fallback."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    assert loader.exists("fallback-section") is True


def test_exists_missing_section(temp_dirs):
    """Test: exists() gibt False für fehlende Section zurück."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    assert loader.exists("nonexistent-section") is False


def test_load_section_html_success(temp_dirs):
    """Test: Laden einer vorhandenen Section funktioniert."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    html = loader.load_section_html("test-section")
    
    assert html is not None
    assert "Test Section Content" in html
    assert loader.stats["loaded"] == 1
    assert loader.stats["from_examples"] == 0


def test_load_section_html_from_examples(temp_dirs):
    """Test: Fallback auf Beispiel-Section funktioniert."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    html = loader.load_section_html("fallback-section")
    
    assert html is not None
    assert "Example Section Content" in html
    assert loader.stats["loaded"] == 1
    assert loader.stats["from_examples"] == 1


def test_load_section_html_missing(temp_dirs):
    """Test: Laden einer fehlenden Section gibt None zurück."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    html = loader.load_section_html("nonexistent-section")
    
    assert html is None
    assert loader.stats["missing"] == 1


def test_load_multiple_sections(temp_dirs):
    """Test: Mehrere Sections gleichzeitig laden."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    results = loader.load_multiple_sections([
        "test-section",
        "fallback-section",
        "nonexistent-section"
    ])
    
    assert len(results) == 3
    assert results["test-section"] is not None
    assert results["fallback-section"] is not None
    assert results["nonexistent-section"] is None
    
    assert loader.stats["loaded"] == 2
    assert loader.stats["from_examples"] == 1
    assert loader.stats["missing"] == 1


def test_get_stats(temp_dirs):
    """Test: Statistiken werden korrekt zurückgegeben."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    
    loader.load_section_html("test-section")
    loader.load_section_html("fallback-section")
    loader.load_section_html("nonexistent-section")
    
    stats = loader.get_stats()
    assert stats["loaded"] == 2
    assert stats["from_examples"] == 1
    assert stats["missing"] == 1


def test_reset_stats(temp_dirs):
    """Test: Statistiken können zurückgesetzt werden."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    
    loader.load_section_html("test-section")
    assert loader.stats["loaded"] == 1
    
    loader.reset_stats()
    assert loader.stats["loaded"] == 0
    assert loader.stats["from_examples"] == 0
    assert loader.stats["missing"] == 0


def test_list_available_sections(temp_dirs):
    """Test: Verfügbare Sections werden korrekt aufgelistet."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    available = loader.list_available_sections()
    
    assert "test-section" in available
    assert "fallback-section" in available
    assert "axiom-installation" in available
    assert len(available) >= 3


def test_list_available_sections_no_duplicates(temp_dirs):
    """Test: Keine Duplikate in verfügbaren Sections."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    
    # Erstelle Duplikat: Section in beiden Verzeichnissen
    sections_dir = Path(temp_dirs["sections"])
    (sections_dir / "section-axiom-installation.html").write_text(
        "Duplicate", encoding='utf-8'
    )
    
    available = loader.list_available_sections()
    
    # axiom-installation sollte nur einmal vorkommen
    count = available.count("axiom-installation")
    assert count == 1


def test_convenience_load_html(temp_dirs):
    """Test: Convenience-Funktion load_html funktioniert."""
    html = load_html("test-section", 
                     sections_dir=temp_dirs["sections"],
                     examples_dir=temp_dirs["examples"])
    
    assert html is not None
    assert "Test Section Content" in html


def test_convenience_html_exists(temp_dirs):
    """Test: Convenience-Funktion html_exists funktioniert."""
    exists = html_exists("test-section",
                        sections_dir=temp_dirs["sections"],
                        examples_dir=temp_dirs["examples"])
    
    assert exists is True
    
    exists = html_exists("nonexistent-section",
                        sections_dir=temp_dirs["sections"],
                        examples_dir=temp_dirs["examples"])
    
    assert exists is False


def test_priority_sections_over_examples(temp_dirs):
    """Test: Reguläre Sections haben Priorität über Beispiel-Sections."""
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    
    # Erstelle Section mit gleichem Namen in beiden Verzeichnissen
    sections_dir = Path(temp_dirs["sections"])
    examples_dir = Path(temp_dirs["examples"])
    
    section_content = "This is the REAL section"
    example_content = "This is the EXAMPLE section"
    
    (sections_dir / "section-priority-test.html").write_text(section_content, encoding='utf-8')
    (examples_dir / "example-priority-test.html").write_text(example_content, encoding='utf-8')
    
    html = loader.load_section_html("priority-test")
    
    # Sollte die reguläre Section laden, nicht die Beispiel-Section
    assert html == section_content
    assert loader.stats["from_examples"] == 0


def test_empty_directories():
    """Test: Funktioniert auch mit leeren/nicht existierenden Verzeichnissen."""
    with tempfile.TemporaryDirectory() as temp_dir:
        loader = HTMLLoader(
            sections_dir=os.path.join(temp_dir, "nonexistent_sections"),
            examples_dir=os.path.join(temp_dir, "nonexistent_examples")
        )
        
        # Sollte nicht crashen
        assert loader.exists("test") is False
        assert loader.load_section_html("test") is None
        assert loader.list_available_sections() == []


def test_utf8_encoding(temp_dirs):
    """Test: UTF-8 Encoding wird korrekt behandelt."""
    sections_dir = Path(temp_dirs["sections"])
    
    # HTML mit Umlauten und Sonderzeichen
    utf8_html = """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Ümläüt Test</title>
</head>
<body>
    <p>Äöü ßẞ €</p>
</body>
</html>"""
    
    (sections_dir / "section-utf8-test.html").write_text(utf8_html, encoding='utf-8')
    
    loader = HTMLLoader(temp_dirs["sections"], temp_dirs["examples"])
    html = loader.load_section_html("utf8-test")
    
    assert html is not None
    assert "Äöü ßẞ €" in html


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
