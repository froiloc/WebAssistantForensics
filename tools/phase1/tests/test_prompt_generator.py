"""Tests für PromptGenerator"""

import pytest
from pathlib import Path
import sys
import tempfile

# Füge Parent-Directory zu sys.path hinzu
sys.path.insert(0, str(Path(__file__).parent.parent))

from modules.prompt_generator import PromptGenerator


@pytest.fixture
def mock_template_file():
    """Erstellt temporäres Mock-Template"""
    template_content = """# Phase 1: Section-Erstellung für {{section_id}}

## Section-Übersicht

**Section-ID:** `{{section_id}}`  
**Titel:** {{section_title}}

**Learning Objective:**  
{{learning_objective}}

**Key Topics:**
{{#each key_topics}}
- {{this}}
{{/each}}

**Complexity:** {{complexity}}

---

## Vorgänger-Sections

{{#if predecessors}}
{{#each predecessors}}
### Vorgänger {{@index}}: {{this.metadata.sectionId}}

```html
{{this.html}}
```
{{/each}}
{{else}}
Keine Vorgänger vorhanden.
{{/if}}

---

## Anhänge

### Anhang A: Strategiedokument

```markdown
{{strategiedokument_content}}
```
"""
    
    with tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False) as f:
        f.write(template_content)
        temp_path = f.name
    
    yield temp_path
    
    # Cleanup
    Path(temp_path).unlink()


@pytest.fixture
def mock_resources_dir():
    """Erstellt temporäres Resources-Verzeichnis mit Mock-Dateien"""
    with tempfile.TemporaryDirectory() as temp_dir:
        temp_path = Path(temp_dir)
        
        # Erstelle Mock-Ressourcen
        (temp_path / "Strategiedokument_Beispiel__AXIOM_Examine.md").write_text(
            "# Strategiedokument\n\nDies ist ein Test-Strategiedokument."
        )
        
        (temp_path / "main-content_schema.json").write_text(
            '{"$schema": "test-schema"}'
        )
        
        (temp_path / "Phase_1__HTML-Template_Spezifikation__Matroschka-Prinzip_.md").write_text(
            "# HTML-Template-Spezifikation\n\nTest."
        )
        
        (temp_path / "Terminologie-Entscheidungsliste.md").write_text(
            "# Terminologie\n\nTest."
        )
        
        # Erstelle templates-Subdir
        templates_dir = temp_path / "templates"
        templates_dir.mkdir()
        (templates_dir / "getting-started.md").write_text(
            "# Getting Started\n\nTest."
        )
        
        yield temp_path


@pytest.fixture
def mock_context():
    """Erstellt Mock-Kontext für Tests"""
    return {
        "current_section": {
            "sectionId": "test-section",
            "title": "Test Section",
            "chapterId": "chapter-1",
            "learningObjective": "Test learning objective",
            "keyTopics": ["Topic 1", "Topic 2", "Topic 3"],
            "complexity": "Standard",
            "difficultyLevel": "Beginner",
            "estimatedWordCount": 1000,
            "estimatedReadingTimeL2": 7,
            "estimatedReadingTimeL3": 14,
            "estimatedMedia": {
                "screenshots": 4,
                "videos": 0,
                "annotations": 2,
                "diagrams": 0,
                "infoBoxes": 2
            },
            "shortDescription": "Test description",
            "rationale": "Test rationale",
            "predecessorSection": "prev-section",
            "successorSection": "next-section",
            "prerequisites": {
                "contentual": [],
                "technical": [],
                "knowledge": []
            },
            "dependencies": [],
            "crossReferences": []
        },
        "predecessors": [
            {
                "metadata": {
                    "sectionId": "prev-section",
                    "title": "Previous Section"
                },
                "html": "<section>Previous section HTML</section>",
                "html_source": "section"
            }
        ],
        "successors": [
            {
                "sectionId": "next-section",
                "title": "Next Section"
            }
        ],
        "prerequisites": [],
        "cross_references": [],
        "statistics": {}
    }


def test_prompt_generator_initialization(mock_template_file, mock_resources_dir):
    """Testet Initialisierung des PromptGenerators"""
    generator = PromptGenerator(
        template_path=mock_template_file,
        resources_base_path=str(mock_resources_dir)
    )
    
    assert generator is not None
    assert generator.template_content is not None
    assert len(generator.resources) > 0


def test_template_loading(mock_template_file, mock_resources_dir):
    """Testet Template-Loading"""
    generator = PromptGenerator(
        template_path=mock_template_file,
        resources_base_path=str(mock_resources_dir)
    )
    
    assert "Section-Erstellung" in generator.template_content
    assert "{{section_id}}" in generator.template_content


def test_resources_loading(mock_template_file, mock_resources_dir):
    """Testet Ressourcen-Loading"""
    generator = PromptGenerator(
        template_path=mock_template_file,
        resources_base_path=str(mock_resources_dir)
    )
    
    # Prüfe, ob alle Ressourcen geladen wurden
    assert 'strategiedokument' in generator.resources
    assert 'json_ld_schema' in generator.resources
    assert 'html_template_spec' in generator.resources
    assert 'terminologie_list' in generator.resources
    assert 'getting_started' in generator.resources
    
    # Prüfe Inhalte
    assert "Test-Strategiedokument" in generator.resources['strategiedokument']
    assert "test-schema" in generator.resources['json_ld_schema']


def test_generate_prompt_basic(mock_template_file, mock_resources_dir, mock_context):
    """Testet Basis-Prompt-Generierung"""
    generator = PromptGenerator(
        template_path=mock_template_file,
        resources_base_path=str(mock_resources_dir)
    )
    
    prompt = generator.generate_prompt(mock_context)
    
    # Prüfe, ob Prompt generiert wurde
    assert prompt is not None
    assert len(prompt) > 0
    
    # Prüfe, ob Section-Daten eingefügt wurden
    assert "test-section" in prompt
    assert "Test Section" in prompt
    assert "Test learning objective" in prompt


def test_build_template_data(mock_template_file, mock_resources_dir, mock_context):
    """Testet Template-Data-Erstellung"""
    generator = PromptGenerator(
        template_path=mock_template_file,
        resources_base_path=str(mock_resources_dir)
    )
    
    template_data = generator._build_template_data(mock_context)
    
    # Prüfe Basis-Daten
    assert template_data['section_id'] == 'test-section'
    assert template_data['section_title'] == 'Test Section'
    assert template_data['learning_objective'] == 'Test learning objective'
    assert template_data['complexity'] == 'Standard'
    
    # Prüfe Arrays
    assert isinstance(template_data['key_topics'], list)
    assert len(template_data['key_topics']) == 3
    
    # Prüfe Kontext
    assert template_data['predecessor_section'] == 'prev-section'
    assert template_data['successor_section'] == 'next-section'
    
    # Prüfe Ressourcen
    assert 'strategiedokument_content' in template_data
    assert template_data['strategiedokument_content'] is not None


def test_string_replacement_fallback(mock_template_file, mock_resources_dir, mock_context):
    """Testet String-Replacement-Fallback (ohne pybars3)"""
    generator = PromptGenerator(
        template_path=mock_template_file,
        resources_base_path=str(mock_resources_dir)
    )
    
    # Erzwinge Fallback
    generator.compiler = None
    
    template_data = generator._build_template_data(mock_context)
    prompt = generator._render_with_string_replacement(template_data)
    
    # Prüfe, ob einfache Variablen ersetzt wurden
    assert "test-section" in prompt
    assert "Test Section" in prompt
    
    # Handlebars-Blöcke bleiben unverarbeitet (erwartet)
    assert "{{#" in prompt or "{{/" in prompt


def test_missing_template_file():
    """Testet Fehlerbehandlung bei fehlendem Template"""
    with pytest.raises(FileNotFoundError):
        PromptGenerator(
            template_path="/non/existent/template.md",
            resources_base_path="."
        )


def test_missing_resources(mock_template_file):
    """Testet Verhalten bei fehlenden Ressourcen"""
    with tempfile.TemporaryDirectory() as temp_dir:
        # Leeres Verzeichnis (keine Ressourcen)
        generator = PromptGenerator(
            template_path=mock_template_file,
            resources_base_path=temp_dir
        )
        
        # Generator sollte trotzdem initialisiert werden
        assert generator is not None
        
        # Ressourcen sollten Fehlermeldungen enthalten
        assert "[Ressource nicht gefunden" in generator.resources.get('strategiedokument', '')


def test_cross_references_formatting(mock_template_file, mock_resources_dir):
    """Testet Formatierung von Cross-References"""
    generator = PromptGenerator(
        template_path=mock_template_file,
        resources_base_path=str(mock_resources_dir)
    )
    
    cross_refs = [
        {
            'metadata': {'sectionId': 'ref-1'},
            'reason': 'Test reason',
            'relevanceScore': 5
        },
        {
            'metadata': {'sectionId': 'ref-2'},
            'reason': 'Another reason',
            'relevanceScore': 3
        }
    ]
    
    formatted = generator._format_cross_references(cross_refs)
    
    assert len(formatted) == 2
    assert formatted[0]['section_id'] == 'ref-1'
    assert formatted[0]['reason'] == 'Test reason'
    assert formatted[0]['relevance_score'] == 5


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
