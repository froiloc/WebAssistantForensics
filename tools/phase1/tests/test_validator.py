"""
Tests für Validator Module (Option A)

Testet alle 5 Validierungsbereiche:
1. JSON-LD Schema-Struktur
2. HTML Basic Wellformedness
3. BFSG Basis-Checks (5 Regeln)
4. Link-Validierung (Syntax)
5. Terminologie-Validierung

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

from validator import Validator


# ===========================================
# Test Fixtures - Mock HTMLs
# ===========================================

@pytest.fixture
def valid_html():
    """Vollständig valide HTML mit allem was benötigt wird."""
    return """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Test Section</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test-section",
        "name": "Test Section",
        "description": "This is a test section",
        "learningResourceType": "Section",
        "inLanguage": "de",
        "keywords": [
            {"term": "Test", "language": "de", "status": "approved"},
            {"term": "Section", "language": "en", "status": "approved"}
        ]
    }
    </script>
</head>
<body>
    <main>
        <h1>Test Section</h1>
        <p>Some content here.</p>
        <img src="test.png" alt="Test image">
        <a href="https://example.com" data-ref="other-section">Go to other section</a>
    </main>
</body>
</html>"""


@pytest.fixture
def html_missing_json_ld():
    """HTML ohne JSON-LD."""
    return """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Test Section</title>
</head>
<body>
    <h1>Test</h1>
</body>
</html>"""


@pytest.fixture
def html_invalid_json_ld():
    """HTML mit ungültigem JSON-LD."""
    return """<!DOCTYPE html>
<html lang="de">
<head>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test"
        INVALID JSON
    }
    </script>
</head>
<body>
    <h1>Test</h1>
</body>
</html>"""


@pytest.fixture
def html_missing_required_fields():
    """HTML mit JSON-LD aber fehlenden Pflichtfeldern."""
    return """<!DOCTYPE html>
<html lang="de">
<head>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource"
    }
    </script>
</head>
<body>
    <h1>Test</h1>
</body>
</html>"""


@pytest.fixture
def html_no_lang_attribute():
    """HTML ohne lang-Attribut."""
    return """<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test",
        "name": "Test",
        "description": "Test",
        "learningResourceType": "Section",
        "inLanguage": "de"
    }
    </script>
</head>
<body>
    <h1>Test</h1>
</body>
</html>"""


@pytest.fixture
def html_images_no_alt():
    """HTML mit Bildern ohne alt-Attribut."""
    return """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test",
        "name": "Test",
        "description": "Test",
        "learningResourceType": "Section",
        "inLanguage": "de"
    }
    </script>
</head>
<body>
    <h1>Test</h1>
    <img src="test1.png">
    <img src="test2.png" alt="Has alt">
    <img src="test3.png">
</body>
</html>"""


@pytest.fixture
def html_bad_heading_hierarchy():
    """HTML mit schlechter Überschriften-Hierarchie."""
    return """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test",
        "name": "Test",
        "description": "Test",
        "learningResourceType": "Section",
        "inLanguage": "de"
    }
    </script>
</head>
<body>
    <h2>Starting with h2 (should be h1)</h2>
    <h4>Skipping h3</h4>
    <h5>Another level</h5>
</body>
</html>"""


@pytest.fixture
def html_invalid_data_ref():
    """HTML mit ungültigen data-ref Links."""
    return """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test-section",
        "name": "Test",
        "description": "Test",
        "learningResourceType": "Section",
        "inLanguage": "de"
    }
    </script>
</head>
<body>
    <h1>Test</h1>
    <a href="#" data-ref="INVALID REF">Bad ref with spaces</a>
    <a href="#" data-ref="test-section">Self-reference</a>
    <a href="#" data-ref="valid-ref">Valid ref</a>
    <a href="#" data-ref="has--double">Double hyphen</a>
</body>
</html>"""


@pytest.fixture
def html_no_keywords():
    """HTML ohne keywords im JSON-LD."""
    return """<!DOCTYPE html>
<html lang="de">
<head>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test",
        "name": "Test",
        "description": "Test",
        "learningResourceType": "Section",
        "inLanguage": "de"
    }
    </script>
</head>
<body>
    <h1>Test</h1>
</body>
</html>"""


@pytest.fixture
def temp_html_file():
    """Erstellt temporäre HTML-Datei."""
    def _create_temp_file(content):
        temp_file = tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False, encoding='utf-8')
        temp_file.write(content)
        temp_file.close()
        return temp_file.name
    
    yield _create_temp_file
    
    # Cleanup nicht nötig, da tempfile.NamedTemporaryFile automatisch aufräumt


# ===========================================
# Tests: Validator Initialization
# ===========================================

def test_validator_initialization():
    """Test: Validator kann initialisiert werden."""
    validator = Validator()
    assert validator.config is not None
    assert validator.stats["validated"] == 0


def test_validator_custom_config():
    """Test: Validator akzeptiert Custom-Config."""
    config = {
        "fail_on_errors": False,
        "json_ld_validation": False,
        "html_validation": True
    }
    validator = Validator(config)
    assert validator.config["fail_on_errors"] is False
    assert validator.config["json_ld_validation"] is False


# ===========================================
# Tests: Vollständig valides HTML
# ===========================================

def test_validate_fully_valid_html(temp_html_file, valid_html):
    """Test: Vollständig valides HTML wird akzeptiert."""
    html_file = temp_html_file(valid_html)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    assert result["valid"] is True
    assert len(result["errors"]) == 0
    # Warnings können vorhanden sein (z.B. optionale Felder)
    
    os.unlink(html_file)


# ===========================================
# Tests: JSON-LD Validierung
# ===========================================

def test_validate_missing_json_ld(temp_html_file, html_missing_json_ld):
    """Test: Fehlende JSON-LD wird erkannt."""
    html_file = temp_html_file(html_missing_json_ld)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    assert result["valid"] is False
    assert any(e["type"] == "json-ld" and "fehlt" in e["message"].lower() for e in result["errors"])
    
    os.unlink(html_file)


def test_validate_invalid_json_ld(temp_html_file, html_invalid_json_ld):
    """Test: Ungültiges JSON-LD wird erkannt."""
    html_file = temp_html_file(html_invalid_json_ld)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    assert result["valid"] is False
    assert any(e["type"] == "json-ld" and "nicht valide" in e["message"].lower() for e in result["errors"])
    
    os.unlink(html_file)


def test_validate_missing_required_fields(temp_html_file, html_missing_required_fields):
    """Test: Fehlende Pflichtfelder werden erkannt."""
    html_file = temp_html_file(html_missing_required_fields)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    assert result["valid"] is False
    # Sollte mehrere Fehler haben (identifier, name, description, etc.)
    assert len(result["errors"]) >= 4
    assert any("identifier" in e["message"] for e in result["errors"])
    
    os.unlink(html_file)


# ===========================================
# Tests: HTML Wellformedness
# ===========================================

def test_validate_missing_doctype(temp_html_file):
    """Test: Fehlender DOCTYPE wird als Warnung erkannt."""
    html = """<html lang="de">
<head>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test",
        "name": "Test",
        "description": "Test",
        "learningResourceType": "Section",
        "inLanguage": "de"
    }
    </script>
</head>
<body><h1>Test</h1></body>
</html>"""
    
    html_file = temp_html_file(html)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    # Fehlender DOCTYPE ist Warning, nicht Error
    assert any(w["type"] == "html" and "doctype" in w["message"].lower() for w in result["warnings"])
    
    os.unlink(html_file)


# ===========================================
# Tests: BFSG Validierung
# ===========================================

def test_validate_missing_lang_attribute(temp_html_file, html_no_lang_attribute):
    """Test: Fehlendes lang-Attribut wird erkannt."""
    html_file = temp_html_file(html_no_lang_attribute)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    assert result["valid"] is False
    assert any(e["type"] == "bfsg" and "lang-attribut" in e["message"].lower() for e in result["errors"])
    
    os.unlink(html_file)


def test_validate_images_without_alt(temp_html_file, html_images_no_alt):
    """Test: Bilder ohne alt-Attribut werden erkannt."""
    html_file = temp_html_file(html_images_no_alt)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    assert result["valid"] is False
    # 2 Bilder ohne alt
    bfsg_errors = [e for e in result["errors"] if e["type"] == "bfsg" and "alt" in e["message"].lower()]
    assert len(bfsg_errors) == 2
    
    os.unlink(html_file)


def test_validate_heading_hierarchy(temp_html_file, html_bad_heading_hierarchy):
    """Test: Schlechte Überschriften-Hierarchie wird erkannt."""
    html_file = temp_html_file(html_bad_heading_hierarchy)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    # Sollte Warnungen für schlechte Hierarchie haben
    hierarchy_warnings = [w for w in result["warnings"] if w["type"] == "bfsg" and "überschrift" in w["message"].lower()]
    assert len(hierarchy_warnings) >= 2  # Mindestens: Start mit h2, Sprung h2->h4
    
    os.unlink(html_file)


def test_validate_non_descriptive_link_text(temp_html_file):
    """Test: Nicht-aussagekräftige Link-Texte werden erkannt."""
    html = """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test",
        "name": "Test",
        "description": "Test",
        "learningResourceType": "Section",
        "inLanguage": "de"
    }
    </script>
</head>
<body>
    <h1>Test</h1>
    <a href="https://example.com">hier</a>
    <a href="https://example.com">klicken</a>
    <a href="https://example.com">Descriptive link text</a>
</body>
</html>"""
    
    html_file = temp_html_file(html)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    # 2 Links mit nicht-aussagekräftigem Text
    link_warnings = [w for w in result["warnings"] if w["type"] == "bfsg" and "nicht-aussagekräftig" in w["message"].lower()]
    assert len(link_warnings) == 2
    
    os.unlink(html_file)


# ===========================================
# Tests: Link-Validierung
# ===========================================

def test_validate_invalid_data_ref(html_invalid_data_ref):
    """Test: Ungültige data-ref Links werden erkannt."""
    # Erstelle temporäre Datei mit korrektem Namen für Self-Reference-Test
    temp_dir = tempfile.mkdtemp()
    html_file = os.path.join(temp_dir, "section-test-section.html")
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(html_invalid_data_ref)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    # Sollte 1 Error (ungültiges Format mit Leerzeichen) haben
    link_errors = [e for e in result["errors"] if e["type"] == "link"]
    assert len(link_errors) >= 1
    
    # Sollte Warnungen für Self-Reference und doppelte Bindestriche haben
    link_warnings = [w for w in result["warnings"] if w["type"] == "link"]
    assert len(link_warnings) >= 2
    
    # Cleanup
    shutil.rmtree(temp_dir)


def test_validate_valid_data_ref_formats(temp_html_file):
    """Test: Verschiedene valide data-ref Formate werden akzeptiert."""
    html = """<!DOCTYPE html>
<html lang="de">
<head>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test-section",
        "name": "Test",
        "description": "Test",
        "learningResourceType": "Section",
        "inLanguage": "de"
    }
    </script>
</head>
<body>
    <h1>Test</h1>
    <a href="#" data-ref="other-section">Section only</a>
    <a href="#" data-ref="other-section#heading-id">Section with fragment</a>
    <a href="#" data-ref="section-with-multiple-hyphens">Multiple hyphens</a>
</body>
</html>"""
    
    html_file = temp_html_file(html)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    # Keine Link-Fehler für valide Formate
    link_errors = [e for e in result["errors"] if e["type"] == "link"]
    assert len(link_errors) == 0
    
    os.unlink(html_file)


# ===========================================
# Tests: Terminologie-Validierung
# ===========================================

def test_validate_missing_keywords(temp_html_file, html_no_keywords):
    """Test: Fehlende keywords werden als Warnung erkannt."""
    html_file = temp_html_file(html_no_keywords)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    # keywords fehlt -> Warning
    assert any(w["type"] == "terminology" and "keywords" in w["message"].lower() for w in result["warnings"])
    
    os.unlink(html_file)


def test_validate_empty_keywords_array(temp_html_file):
    """Test: Leeres keywords-Array wird als Warnung erkannt."""
    html = """<!DOCTYPE html>
<html lang="de">
<head>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test",
        "name": "Test",
        "description": "Test",
        "learningResourceType": "Section",
        "inLanguage": "de",
        "keywords": []
    }
    </script>
</head>
<body>
    <h1>Test</h1>
</body>
</html>"""
    
    html_file = temp_html_file(html)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    assert any(w["type"] == "terminology" and "leer" in w["message"].lower() for w in result["warnings"])
    
    os.unlink(html_file)


def test_validate_invalid_keyword_structure(temp_html_file):
    """Test: Ungültige Keyword-Struktur wird erkannt."""
    html = """<!DOCTYPE html>
<html lang="de">
<head>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test",
        "name": "Test",
        "description": "Test",
        "learningResourceType": "Section",
        "inLanguage": "de",
        "keywords": [
            {"term": "Valid Keyword", "language": "de"},
            "Invalid String Keyword",
            {"language": "de"}
        ]
    }
    </script>
</head>
<body>
    <h1>Test</h1>
</body>
</html>"""
    
    html_file = temp_html_file(html)
    
    validator = Validator()
    result = validator.validate_section_html(html_file)
    
    # Sollte Fehler für String-Keyword und fehlendes 'term'-Feld haben
    term_errors = [e for e in result["errors"] if e["type"] == "terminology"]
    assert len(term_errors) >= 2
    
    os.unlink(html_file)


# ===========================================
# Tests: Statistiken
# ===========================================

def test_validator_statistics(temp_html_file, valid_html, html_missing_json_ld):
    """Test: Statistiken werden korrekt erfasst."""
    validator = Validator()
    
    # Validiere 2 Dateien
    file1 = temp_html_file(valid_html)
    file2 = temp_html_file(html_missing_json_ld)
    
    validator.validate_section_html(file1)
    validator.validate_section_html(file2)
    
    stats = validator.get_stats()
    
    assert stats["validated"] == 2
    assert stats["errors"] >= 1  # file2 hat mindestens 1 Fehler
    
    # Reset
    validator.reset_stats()
    stats = validator.get_stats()
    assert stats["validated"] == 0
    
    os.unlink(file1)
    os.unlink(file2)


# ===========================================
# Tests: Konfigurierbare Validierung
# ===========================================

def test_disable_specific_validations(temp_html_file, html_no_lang_attribute):
    """Test: Einzelne Validierungen können deaktiviert werden."""
    html_file = temp_html_file(html_no_lang_attribute)
    
    # Deaktiviere BFSG-Validierung
    config = {
        "bfsg_validation": False,
        "json_ld_validation": True,
        "html_validation": True,
        "link_validation": True,
        "terminology_validation": True
    }
    
    validator = Validator(config)
    result = validator.validate_section_html(html_file)
    
    # Keine BFSG-Fehler, da deaktiviert
    bfsg_errors = [e for e in result["errors"] if e["type"] == "bfsg"]
    assert len(bfsg_errors) == 0
    
    os.unlink(html_file)


# ===========================================
# Tests: File Handling
# ===========================================

def test_validate_nonexistent_file():
    """Test: Nicht existierende Datei wird korrekt behandelt."""
    validator = Validator()
    result = validator.validate_section_html("/nonexistent/file.html")
    
    assert result["valid"] is False
    assert len(result["errors"]) == 1
    assert result["errors"][0]["type"] == "file"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
