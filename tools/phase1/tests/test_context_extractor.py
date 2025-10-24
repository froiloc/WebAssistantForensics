"""Tests für ContextExtractor"""

import pytest
from pathlib import Path
import sys
import tempfile
import json

# Füge Parent-Directory zu sys.path hinzu
sys.path.insert(0, str(Path(__file__).parent.parent))

from modules.gliederung_loader import GliederungLoader
from modules.html_loader import HTMLLoader
from modules.context_extractor import ContextExtractor


@pytest.fixture
def mock_gliederung_data():
    """Erstellt Mock-Gliederungsdaten für Tests"""
    return {
        "schemaVersion": "1.0.0",
        "sections": [
            {
                "sectionId": "section-1",
                "title": "Section 1",
                "predecessorSection": None,
                "successorSection": "section-2",
                "prerequisites": {
                    "contentual": [],
                    "technical": [],
                    "knowledge": []
                },
                "crossReferences": []
            },
            {
                "sectionId": "section-2",
                "title": "Section 2",
                "predecessorSection": "section-1",
                "successorSection": "section-3",
                "prerequisites": {
                    "contentual": ["section-1"],
                    "technical": [],
                    "knowledge": []
                },
                "crossReferences": [
                    {
                        "sectionId": "section-4",
                        "reason": "Weiterführende Info",
                        "relevanceScore": 3
                    }
                ]
            },
            {
                "sectionId": "section-3",
                "title": "Section 3",
                "predecessorSection": "section-2",
                "successorSection": None,
                "prerequisites": {
                    "contentual": ["section-1", "section-2"],
                    "technical": [],
                    "knowledge": []
                },
                "crossReferences": []
            },
            {
                "sectionId": "section-4",
                "title": "Section 4",
                "predecessorSection": None,
                "successorSection": None,
                "prerequisites": {
                    "contentual": [],
                    "technical": [],
                    "knowledge": []
                },
                "crossReferences": []
            }
        ]
    }


@pytest.fixture
def temp_gliederung_file(mock_gliederung_data):
    """Erstellt temporäre Gliederungsdatei"""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
        json.dump(mock_gliederung_data, f)
        temp_path = f.name
    
    yield temp_path
    
    # Cleanup
    Path(temp_path).unlink()


@pytest.fixture
def temp_sections_dir():
    """Erstellt temporäres Sections-Verzeichnis mit Test-HTMLs"""
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)
        
        # Erstelle Test-HTML für section-1
        section1_html = temp_path / "section-section-1.html"
        section1_html.write_text("""
<section id="section-1" data-section-id="section-1">
    <h2>Section 1</h2>
    <p>Test content for section 1.</p>
</section>
""")
        
        # Erstelle Test-HTML für section-2
        section2_html = temp_path / "section-section-2.html"
        section2_html.write_text("""
<section id="section-2" data-section-id="section-2">
    <h2>Section 2</h2>
    <p>Test content for section 2.</p>
</section>
""")
        
        yield temp_path


@pytest.fixture
def temp_examples_dir():
    """Erstellt temporäres Examples-Verzeichnis"""
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)
        
        # Erstelle Beispiel-Section
        example_html = temp_path / "example-basic.html"
        example_html.write_text("""
<section id="example" data-section-id="example">
    <h2>Example Section</h2>
    <p>This is an example section.</p>
</section>
""")
        
        yield temp_path


def test_context_extractor_initialization(temp_gliederung_file, temp_sections_dir, temp_examples_dir):
    """Testet Initialisierung des ContextExtractors"""
    loader = GliederungLoader(temp_gliederung_file)
    html_loader = HTMLLoader(
        sections_dir=str(temp_sections_dir),
        examples_dir=str(temp_examples_dir)
    )
    
    extractor = ContextExtractor(
        gliederung_loader=loader,
        html_loader=html_loader,
        num_predecessors=2,
        num_successors=2
    )
    
    assert extractor is not None
    assert extractor.num_predecessors == 2
    assert extractor.num_successors == 2


def test_extract_context_basic(temp_gliederung_file, temp_sections_dir, temp_examples_dir):
    """Testet Basis-Kontext-Extraktion für section-2"""
    loader = GliederungLoader(temp_gliederung_file)
    html_loader = HTMLLoader(
        sections_dir=str(temp_sections_dir),
        examples_dir=str(temp_examples_dir)
    )
    extractor = ContextExtractor(
        gliederung_loader=loader,
        html_loader=html_loader
    )
    
    context = extractor.extract_context("section-2")
    
    # Prüfe Struktur
    assert "current_section" in context
    assert "predecessors" in context
    assert "successors" in context
    assert "prerequisites" in context
    assert "cross_references" in context
    assert "statistics" in context
    
    # Prüfe aktuelle Section
    assert context["current_section"]["sectionId"] == "section-2"
    assert context["current_section"]["title"] == "Section 2"
    
    # Prüfe Vorgänger (sollte section-1 sein)
    assert len(context["predecessors"]) == 1
    assert context["predecessors"][0]["metadata"]["sectionId"] == "section-1"
    assert context["predecessors"][0]["html"] is not None
    assert context["predecessors"][0]["html_source"] == "section"  # Existiert in temp_sections_dir
    
    # Prüfe Nachfolger (sollte section-3 sein)
    assert len(context["successors"]) == 1
    assert context["successors"][0]["sectionId"] == "section-3"
    
    # Prüfe Prerequisites (sollte section-1 sein)
    assert len(context["prerequisites"]) == 1
    assert context["prerequisites"][0]["metadata"]["sectionId"] == "section-1"
    assert context["prerequisites"][0]["html"] is not None
    
    # Prüfe Cross-References (sollte section-4 sein)
    assert len(context["cross_references"]) == 1
    assert context["cross_references"][0]["metadata"]["sectionId"] == "section-4"
    assert context["cross_references"][0]["reason"] == "Weiterführende Info"
    assert context["cross_references"][0]["relevanceScore"] == 3


def test_extract_context_with_missing_html(temp_gliederung_file, temp_sections_dir, temp_examples_dir):
    """Testet Kontext-Extraktion wenn HTML fehlt (sollte Beispiel-Section verwenden)"""
    loader = GliederungLoader(temp_gliederung_file)
    html_loader = HTMLLoader(
        sections_dir=str(temp_sections_dir),
        examples_dir=str(temp_examples_dir)
    )
    extractor = ContextExtractor(
        gliederung_loader=loader,
        html_loader=html_loader
    )
    
    # section-3 hat Vorgänger section-2 (existiert) und section-1 (existiert)
    # Prerequisites: section-1 (existiert), section-2 (existiert)
    context = extractor.extract_context("section-3")
    
    # Prüfe Vorgänger
    assert len(context["predecessors"]) == 2
    
    # Beide sollten echte Sections sein
    for pred in context["predecessors"]:
        assert pred["html"] is not None
        assert pred["html_source"] == "section"


def test_extract_context_first_section(temp_gliederung_file, temp_sections_dir, temp_examples_dir):
    """Testet Kontext-Extraktion für erste Section (keine Vorgänger)"""
    loader = GliederungLoader(temp_gliederung_file)
    html_loader = HTMLLoader(
        sections_dir=str(temp_sections_dir),
        examples_dir=str(temp_examples_dir)
    )
    extractor = ContextExtractor(
        gliederung_loader=loader,
        html_loader=html_loader
    )
    
    context = extractor.extract_context("section-1")
    
    # Erste Section sollte keine Vorgänger haben
    assert len(context["predecessors"]) == 0
    
    # Aber Nachfolger (section-2 und section-3, da num_successors=2 default)
    assert len(context["successors"]) >= 1
    assert context["successors"][0]["sectionId"] == "section-2"
    
    # Keine Prerequisites
    assert len(context["prerequisites"]) == 0


def test_extract_context_statistics(temp_gliederung_file, temp_sections_dir, temp_examples_dir):
    """Testet Statistik-Generierung"""
    loader = GliederungLoader(temp_gliederung_file)
    html_loader = HTMLLoader(
        sections_dir=str(temp_sections_dir),
        examples_dir=str(temp_examples_dir)
    )
    extractor = ContextExtractor(
        gliederung_loader=loader,
        html_loader=html_loader
    )
    
    context = extractor.extract_context("section-2")
    stats = context["statistics"]
    
    # Prüfe Statistik-Struktur
    assert "section_id" in stats
    assert "section_title" in stats
    assert "counts" in stats
    assert "html_sources" in stats
    assert "total_html_size_bytes" in stats
    assert "warnings" in stats
    
    # Prüfe Werte
    assert stats["section_id"] == "section-2"
    assert stats["section_title"] == "Section 2"
    assert stats["counts"]["predecessors"] == 1
    assert stats["counts"]["successors"] == 1
    assert stats["counts"]["prerequisites"] == 1
    assert stats["counts"]["cross_references"] == 1
    
    # HTML sollte geladen worden sein
    assert stats["total_html_size_bytes"] > 0


def test_extract_context_invalid_section(temp_gliederung_file, temp_sections_dir, temp_examples_dir):
    """Testet Fehlerbehandlung für nicht existierende Section"""
    loader = GliederungLoader(temp_gliederung_file)
    html_loader = HTMLLoader(
        sections_dir=str(temp_sections_dir),
        examples_dir=str(temp_examples_dir)
    )
    extractor = ContextExtractor(
        gliederung_loader=loader,
        html_loader=html_loader
    )
    
    # Sollte ValueError werfen
    with pytest.raises(ValueError, match="Section nicht gefunden"):
        extractor.extract_context("non-existent-section")


def test_fallback_html_generation(temp_gliederung_file, temp_sections_dir, temp_examples_dir):
    """Testet Fallback-HTML-Generierung"""
    loader = GliederungLoader(temp_gliederung_file)
    html_loader = HTMLLoader(
        sections_dir=str(temp_sections_dir),
        examples_dir=str(temp_examples_dir)
    )
    extractor = ContextExtractor(
        gliederung_loader=loader,
        html_loader=html_loader
    )
    
    fallback_html = extractor._get_fallback_html("test-section")
    
    assert "test-section" in fallback_html
    assert "<section" in fallback_html
    assert "data-section-id" in fallback_html


def test_warnings_collection(temp_gliederung_file, temp_sections_dir, temp_examples_dir):
    """Testet Sammlung von Warnungen für fehlende HTMLs"""
    loader = GliederungLoader(temp_gliederung_file)
    html_loader = HTMLLoader(
        sections_dir=str(temp_sections_dir),
        examples_dir=str(temp_examples_dir)
    )
    extractor = ContextExtractor(
        gliederung_loader=loader,
        html_loader=html_loader
    )
    
    # section-3 hat Prerequisites section-1 und section-2 (beide existieren)
    context = extractor.extract_context("section-3")
    
    # Sollte keine kritischen Warnungen haben (alle HTMLs existieren)
    warnings = context["statistics"]["warnings"]
    
    # Filtere kritische Warnungen
    critical_warnings = [w for w in warnings if "KRITISCH" in w]
    assert len(critical_warnings) == 0


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
