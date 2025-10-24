"""Tests für Orchestrator (pre-commit)"""

import pytest
from pathlib import Path
import sys
import tempfile
import json

# Füge Parent-Directory zu sys.path hinzu
sys.path.insert(0, str(Path(__file__).parent.parent))


def test_module_imports():
    """Testet, ob alle Module importierbar sind"""
    from modules.gliederung_loader import GliederungLoader
    from modules.context_extractor import ContextExtractor
    from modules.html_loader import HTMLLoader
    from modules.prompt_generator import PromptGenerator
    from modules.validator import Validator
    
    assert GliederungLoader is not None
    assert ContextExtractor is not None
    assert HTMLLoader is not None
    assert PromptGenerator is not None
    assert Validator is not None


def test_gliederung_loader_with_mock_data():
    """Testet GliederungLoader mit Mock-Daten"""
    from modules.gliederung_loader import GliederungLoader
    
    # Erstelle temporäre Mock-Datei
    mock_data = {
        "schemaVersion": "1.0.0",
        "sections": [
            {
                "sectionId": "test-section-1",
                "title": "Test Section 1",
                "predecessorSection": None,
                "successorSection": "test-section-2"
            },
            {
                "sectionId": "test-section-2",
                "title": "Test Section 2",
                "predecessorSection": "test-section-1",
                "successorSection": None
            }
        ]
    }
    
    with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
        json.dump(mock_data, f)
        temp_path = f.name
    
    try:
        # Teste Loader
        loader = GliederungLoader(temp_path)
        
        # Teste get_all_sections_ordered
        sections = loader.get_all_sections_ordered()
        assert len(sections) == 2
        assert sections[0]['sectionId'] == 'test-section-1'
        assert sections[1]['sectionId'] == 'test-section-2'
        
        # Teste get_section_by_id
        section = loader.get_section_by_id('test-section-1')
        assert section is not None
        assert section['title'] == 'Test Section 1'
        
    finally:
        # Cleanup
        Path(temp_path).unlink()


def test_html_loader_exists():
    """Testet HTMLLoader.exists()"""
    from modules.html_loader import HTMLLoader
    
    with tempfile.TemporaryDirectory() as temp_dir:
        loader = HTMLLoader(
            sections_dir=temp_dir,
            examples_dir=temp_dir
        )
        
        # Sollte nicht existieren
        assert not loader.exists('non-existent-section')
        
        # Erstelle Dummy-Datei
        section_file = Path(temp_dir) / "section-test.html"
        section_file.write_text("<section>Test</section>")
        
        # Sollte jetzt existieren
        assert loader.exists('test')


def test_validator_basic():
    """Testet Validator mit Dummy-Konfiguration"""
    from modules.validator import Validator
    
    config = {
        'check_json_ld': True,
        'check_html_syntax': True,
        'check_bfsg': False,
        'check_links': True,
        'check_terminology_tags': True,
        'fail_on_warnings': False,
        'fail_on_errors': True
    }
    
    validator = Validator(config)
    
    # Teste mit nicht existierender Datei
    result = validator.validate_section_html('/non/existent/file.html')
    assert not result['valid']
    assert len(result['errors']) > 0


def test_config_yaml_structure():
    """Testet ob config.yaml korrekte Struktur hat"""
    import yaml
    
    config_path = Path(__file__).parent.parent / 'config.yaml'
    
    if not config_path.exists():
        pytest.skip("config.yaml nicht gefunden")
    
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    
    # Prüfe erforderliche Sections
    assert 'paths' in config
    assert 'validation' in config
    assert 'context' in config
    assert 'workflow' in config
    assert 'logging' in config
    
    # Prüfe erforderliche Pfade
    assert 'gliederung_json' in config['paths']
    assert 'output_sections' in config['paths']


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
