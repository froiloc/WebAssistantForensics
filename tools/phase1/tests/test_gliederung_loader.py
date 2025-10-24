"""
Tests für GliederungLoader Module

Testet alle Funktionen des GliederungLoaders:
- Laden der Gliederung
- Section-Zugriff (by ID, ordered)
- Predecessor/Successor-Chains
- Prerequisites
- Cross-References
- Error-Handling

Author: Claude (Phase 1 Tests)
Date: 2025-10-24
"""

import pytest
import tempfile
import json
from pathlib import Path
import sys
import os

# Füge modules/ zum Python-Path hinzu
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'modules'))

from gliederung_loader import GliederungLoader


# ===========================================
# Test Fixtures - Mock Data
# ===========================================

@pytest.fixture
def simple_gliederung_data():
    """Einfache Gliederung mit 3 Sections in Reihe."""
    return {
        "schemaVersion": "1.0.0",
        "metadata": {
            "title": "Test Gliederung",
            "createdAt": "2025-10-24"
        },
        "sections": [
            {
                "sectionId": "section-1",
                "title": "Section 1",
                "chapter": "chapter-1",
                "topic": "topic-1",
                "predecessorSection": None,
                "successorSection": "section-2",
                "prerequisites": {
                    "contentual": [],
                    "technical": [],
                    "knowledge": []
                },
                "dependencies": [],
                "crossReferences": []
            },
            {
                "sectionId": "section-2",
                "title": "Section 2",
                "chapter": "chapter-1",
                "topic": "topic-1",
                "predecessorSection": "section-1",
                "successorSection": "section-3",
                "prerequisites": {
                    "contentual": ["section-1"],
                    "technical": [],
                    "knowledge": []
                },
                "dependencies": [],
                "crossReferences": []
            },
            {
                "sectionId": "section-3",
                "title": "Section 3",
                "chapter": "chapter-1",
                "topic": "topic-1",
                "predecessorSection": "section-2",
                "successorSection": None,
                "prerequisites": {
                    "contentual": ["section-1", "section-2"],
                    "technical": [],
                    "knowledge": []
                },
                "dependencies": [],
                "crossReferences": [
                    {
                        "sectionId": "section-1",
                        "reason": "Vertiefende Information",
                        "relevanceScore": 4
                    }
                ]
            }
        ]
    }


@pytest.fixture
def complex_gliederung_data():
    """Komplexere Gliederung mit mehreren Chains und Cross-References."""
    return {
        "schemaVersion": "1.0.0",
        "sections": [
            # Chain 1: section-a -> section-b -> section-c
            {
                "sectionId": "section-a",
                "title": "Section A",
                "predecessorSection": None,
                "successorSection": "section-b",
                "prerequisites": {
                    "contentual": [],
                    "technical": [],
                    "knowledge": []
                },
                "dependencies": [],
                "crossReferences": []
            },
            {
                "sectionId": "section-b",
                "title": "Section B",
                "predecessorSection": "section-a",
                "successorSection": "section-c",
                "prerequisites": {
                    "contentual": ["section-a"],
                    "technical": [],
                    "knowledge": []
                },
                "dependencies": [],
                "crossReferences": [
                    {
                        "sectionId": "section-x",
                        "reason": "Related topic",
                        "relevanceScore": 3
                    }
                ]
            },
            {
                "sectionId": "section-c",
                "title": "Section C",
                "predecessorSection": "section-b",
                "successorSection": None,
                "prerequisites": {
                    "contentual": ["section-a", "section-b"],
                    "technical": [],
                    "knowledge": []
                },
                "dependencies": [],
                "crossReferences": []
            },
            # Chain 2: section-x -> section-y (independent)
            {
                "sectionId": "section-x",
                "title": "Section X",
                "predecessorSection": None,
                "successorSection": "section-y",
                "prerequisites": {
                    "contentual": [],
                    "technical": [],
                    "knowledge": []
                },
                "dependencies": [],
                "crossReferences": []
            },
            {
                "sectionId": "section-y",
                "title": "Section Y",
                "predecessorSection": "section-x",
                "successorSection": None,
                "prerequisites": {
                    "contentual": ["section-x"],
                    "technical": [],
                    "knowledge": []
                },
                "dependencies": [],
                "crossReferences": [
                    {
                        "sectionId": "section-a",
                        "reason": "Background info",
                        "relevanceScore": 2
                    }
                ]
            }
        ]
    }


@pytest.fixture
def temp_gliederung_file():
    """Factory für temporäre Gliederungsdateien."""
    created_files = []
    
    def _create_file(data):
        temp_file = tempfile.NamedTemporaryFile(
            mode='w', 
            suffix='.json', 
            delete=False,
            encoding='utf-8'
        )
        json.dump(data, temp_file, ensure_ascii=False)
        temp_file.close()
        created_files.append(temp_file.name)
        return temp_file.name
    
    yield _create_file
    
    # Cleanup
    for file in created_files:
        try:
            os.unlink(file)
        except:
            pass


# ===========================================
# Tests: Initialization & Loading
# ===========================================

def test_gliederung_loader_initialization(temp_gliederung_file, simple_gliederung_data):
    """Test: GliederungLoader kann initialisiert werden."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    
    loader = GliederungLoader(json_path)
    
    assert loader is not None
    assert loader.data is not None
    assert len(loader.sections_by_id) == 3


def test_load_nonexistent_file():
    """Test: Fehler beim Laden nicht-existierender Datei."""
    with pytest.raises(FileNotFoundError):
        GliederungLoader("/nonexistent/path/to/file.json")


def test_load_invalid_json(temp_gliederung_file):
    """Test: Fehler bei ungültigem JSON."""
    # Erstelle Datei mit ungültigem JSON
    temp_file = tempfile.NamedTemporaryFile(
        mode='w',
        suffix='.json',
        delete=False,
        encoding='utf-8'
    )
    temp_file.write("{ invalid json }")
    temp_file.close()
    
    with pytest.raises(json.JSONDecodeError):
        GliederungLoader(temp_file.name)
    
    os.unlink(temp_file.name)


def test_sections_by_id_index(temp_gliederung_file, simple_gliederung_data):
    """Test: sections_by_id Index wird korrekt erstellt."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    assert "section-1" in loader.sections_by_id
    assert "section-2" in loader.sections_by_id
    assert "section-3" in loader.sections_by_id
    assert loader.sections_by_id["section-1"]["title"] == "Section 1"


# ===========================================
# Tests: get_section_by_id
# ===========================================

def test_get_section_by_id_existing(temp_gliederung_file, simple_gliederung_data):
    """Test: Existierende Section kann abgerufen werden."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    section = loader.get_section_by_id("section-2")
    
    assert section is not None
    assert section["sectionId"] == "section-2"
    assert section["title"] == "Section 2"


def test_get_section_by_id_nonexistent(temp_gliederung_file, simple_gliederung_data):
    """Test: Nicht-existierende Section gibt None zurück."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    section = loader.get_section_by_id("nonexistent-section")
    
    assert section is None


# ===========================================
# Tests: get_all_sections_ordered
# ===========================================

def test_get_all_sections_ordered_simple(temp_gliederung_file, simple_gliederung_data):
    """Test: Sections werden in korrekter Reihenfolge zurückgegeben."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    sections = loader.get_all_sections_ordered()
    
    assert len(sections) == 3
    assert sections[0]["sectionId"] == "section-1"
    assert sections[1]["sectionId"] == "section-2"
    assert sections[2]["sectionId"] == "section-3"


def test_get_all_sections_ordered_complex(temp_gliederung_file, complex_gliederung_data):
    """Test: Mehrere Chains werden korrekt geordnet."""
    json_path = temp_gliederung_file(complex_gliederung_data)
    loader = GliederungLoader(json_path)
    
    sections = loader.get_all_sections_ordered()
    
    # Sollte alle 5 Sections enthalten
    assert len(sections) == 5
    
    # Prüfe dass alle Section-IDs vorhanden sind
    section_ids = [s["sectionId"] for s in sections]
    expected_ids = {"section-a", "section-b", "section-c", "section-x", "section-y"}
    assert set(section_ids) == expected_ids
    
    # Chain 1: section-a -> section-b -> section-c sollte zusammenhängend sein
    chain1_positions = {
        sections[i]["sectionId"]: i 
        for i in range(len(sections)) 
        if sections[i]["sectionId"] in ["section-a", "section-b", "section-c"]
    }
    
    # Prüfe Reihenfolge innerhalb der Chain
    assert chain1_positions["section-a"] < chain1_positions["section-b"]
    assert chain1_positions["section-b"] < chain1_positions["section-c"]
    
    # Chain 2: section-x -> section-y sollte zusammenhängend sein
    chain2_positions = {
        sections[i]["sectionId"]: i 
        for i in range(len(sections)) 
        if sections[i]["sectionId"] in ["section-x", "section-y"]
    }
    
    # Prüfe Reihenfolge innerhalb der Chain
    assert chain2_positions["section-x"] < chain2_positions["section-y"]


# ===========================================
# Tests: get_predecessor_sections
# ===========================================

def test_get_predecessor_sections_middle(temp_gliederung_file, simple_gliederung_data):
    """Test: Vorgänger einer mittleren Section."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    predecessors = loader.get_predecessor_sections("section-3", count=2)
    
    assert len(predecessors) == 2
    # Prüfe dass beide Vorgänger vorhanden sind (Reihenfolge kann variieren)
    section_ids = [p["sectionId"] for p in predecessors]
    assert "section-1" in section_ids
    assert "section-2" in section_ids


def test_get_predecessor_sections_first(temp_gliederung_file, simple_gliederung_data):
    """Test: Erste Section hat keine Vorgänger."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    predecessors = loader.get_predecessor_sections("section-1", count=2)
    
    assert len(predecessors) == 0


def test_get_predecessor_sections_limited(temp_gliederung_file, simple_gliederung_data):
    """Test: Count limitiert Anzahl der Vorgänger."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    predecessors = loader.get_predecessor_sections("section-3", count=1)
    
    assert len(predecessors) == 1
    assert predecessors[0]["sectionId"] == "section-2"


# ===========================================
# Tests: get_successor_sections
# ===========================================

def test_get_successor_sections_first(temp_gliederung_file, simple_gliederung_data):
    """Test: Nachfolger der ersten Section."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    successors = loader.get_successor_sections("section-1", count=2)
    
    assert len(successors) == 2
    assert successors[0]["sectionId"] == "section-2"  # Direkter Nachfolger
    assert successors[1]["sectionId"] == "section-3"  # Nachfolger des Nachfolgers


def test_get_successor_sections_last(temp_gliederung_file, simple_gliederung_data):
    """Test: Letzte Section hat keine Nachfolger."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    successors = loader.get_successor_sections("section-3", count=2)
    
    assert len(successors) == 0


def test_get_successor_sections_limited(temp_gliederung_file, simple_gliederung_data):
    """Test: Count limitiert Anzahl der Nachfolger."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    successors = loader.get_successor_sections("section-1", count=1)
    
    assert len(successors) == 1
    assert successors[0]["sectionId"] == "section-2"


# ===========================================
# Tests: get_prerequisite_sections
# ===========================================

def test_get_prerequisite_sections_contentual(temp_gliederung_file, simple_gliederung_data):
    """Test: Contentual Prerequisites werden korrekt zurückgegeben."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    prerequisites = loader.get_prerequisite_sections("section-3")
    
    assert len(prerequisites) == 2
    section_ids = [p["sectionId"] for p in prerequisites]
    assert "section-1" in section_ids
    assert "section-2" in section_ids


def test_get_prerequisite_sections_none(temp_gliederung_file, simple_gliederung_data):
    """Test: Section ohne Prerequisites."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    prerequisites = loader.get_prerequisite_sections("section-1")
    
    assert len(prerequisites) == 0


def test_get_prerequisite_sections_nonexistent_prereq(temp_gliederung_file):
    """Test: Warnung bei nicht-existierenden Prerequisites."""
    data = {
        "schemaVersion": "1.0.0",
        "sections": [
            {
                "sectionId": "section-1",
                "title": "Section 1",
                "prerequisites": {
                    "contentual": ["nonexistent-section"],
                    "technical": [],
                    "knowledge": []
                },
                "predecessorSection": None,
                "successorSection": None,
                "dependencies": [],
                "crossReferences": []
            }
        ]
    }
    
    json_path = temp_gliederung_file(data)
    loader = GliederungLoader(json_path)
    
    # Sollte leere Liste zurückgeben (Prerequisite existiert nicht)
    prerequisites = loader.get_prerequisite_sections("section-1")
    assert len(prerequisites) == 0


# ===========================================
# Tests: get_cross_reference_sections
# ===========================================

def test_get_cross_reference_sections(temp_gliederung_file, simple_gliederung_data):
    """Test: Cross-References werden korrekt zurückgegeben."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    cross_refs = loader.get_cross_reference_sections("section-3")
    
    assert len(cross_refs) == 1
    assert cross_refs[0]["section"]["sectionId"] == "section-1"  # 'section' ist nested
    assert cross_refs[0]["reason"] == "Vertiefende Information"
    assert cross_refs[0]["relevanceScore"] == 4


def test_get_cross_reference_sections_none(temp_gliederung_file, simple_gliederung_data):
    """Test: Section ohne Cross-References."""
    json_path = temp_gliederung_file(simple_gliederung_data)
    loader = GliederungLoader(json_path)
    
    cross_refs = loader.get_cross_reference_sections("section-1")
    
    assert len(cross_refs) == 0


def test_get_cross_reference_sections_with_details(temp_gliederung_file, complex_gliederung_data):
    """Test: Cross-References mit Details."""
    json_path = temp_gliederung_file(complex_gliederung_data)
    loader = GliederungLoader(json_path)
    
    cross_refs = loader.get_cross_reference_sections("section-b")
    
    assert len(cross_refs) == 1
    assert cross_refs[0]["section"]["sectionId"] == "section-x"  # 'section' ist nested
    assert "reason" in cross_refs[0]
    assert "relevanceScore" in cross_refs[0]


# ===========================================
# Tests: Edge Cases
# ===========================================

def test_empty_sections_list(temp_gliederung_file):
    """Test: Gliederung mit leerer Sections-Liste."""
    data = {
        "schemaVersion": "1.0.0",
        "sections": []
    }
    
    json_path = temp_gliederung_file(data)
    loader = GliederungLoader(json_path)
    
    assert len(loader.sections_by_id) == 0
    assert len(loader.get_all_sections_ordered()) == 0


def test_single_section(temp_gliederung_file):
    """Test: Gliederung mit nur einer Section."""
    data = {
        "schemaVersion": "1.0.0",
        "sections": [
            {
                "sectionId": "only-section",
                "title": "Only Section",
                "predecessorSection": None,
                "successorSection": None,
                "prerequisites": {
                    "contentual": [],
                    "technical": [],
                    "knowledge": []
                },
                "dependencies": [],
                "crossReferences": []
            }
        ]
    }
    
    json_path = temp_gliederung_file(data)
    loader = GliederungLoader(json_path)
    
    sections = loader.get_all_sections_ordered()
    assert len(sections) == 1
    assert sections[0]["sectionId"] == "only-section"
    
    # Keine Vorgänger/Nachfolger
    assert len(loader.get_predecessor_sections("only-section")) == 0
    assert len(loader.get_successor_sections("only-section")) == 0


def test_circular_reference_detection(temp_gliederung_file):
    """Test: Zyklische Referenzen werden erkannt (sollten nicht auftreten, aber testen)."""
    data = {
        "schemaVersion": "1.0.0",
        "sections": [
            {
                "sectionId": "section-a",
                "predecessorSection": "section-b",  # Zyklus!
                "successorSection": "section-b",
                "prerequisites": {
                    "contentual": [],
                    "technical": [],
                    "knowledge": []
                },
                "dependencies": [],
                "crossReferences": []
            },
            {
                "sectionId": "section-b",
                "predecessorSection": "section-a",  # Zyklus!
                "successorSection": "section-a",
                "prerequisites": {
                    "contentual": [],
                    "technical": [],
                    "knowledge": []
                },
                "dependencies": [],
                "crossReferences": []
            }
        ]
    }
    
    json_path = temp_gliederung_file(data)
    
    # GliederungLoader sollte mit Zyklen umgehen können
    # (Implementierung sollte max_depth haben)
    loader = GliederungLoader(json_path)
    
    # Predecessors sollten trotz Zyklus terminieren
    predecessors = loader.get_predecessor_sections("section-a", count=5)
    # Sollte nicht unendlich laufen
    assert len(predecessors) <= 10  # Reasonable limit


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
