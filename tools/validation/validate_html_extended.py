#!/usr/bin/env python3
"""
HTML Structure Validator für AXIOM Agent System (Extended v2.0)

Validiert:
- ID-Eindeutigkeit (id-Attribute müssen eindeutig sein)
- data-ref Standard-Granularität (alle wichtigen Elemente haben data-ref)
- Orphan-Detection (kein Element ohne referenzierten Ancestor)
- CSS-Selector-Kompatibilität
- Agent-spezifische Element-Struktur

NEU in v2.0 (Cluster 2):
- Hierarchie-Tiefe (max 5, Warnung bei >3)
- Hierarchie-Konsistenz (Parent-Referenzen, Level-Progression)
- Heading-Hierarchie (h1-h6 BFSG-konform)
- Content-Types (8 erlaubte Werte)
- JSON-LD Metadaten (Schema-Validierung)
- Metadaten-Konsistenz (identifier = data-section)
- Agent-Context-Blocks (einer pro Section am Ende)
- data-ref Eindeutigkeit (erweitert)

Autor: AXIOM Guide Development
Version: 2.0 (Cluster 2 Extensions)
"""

import argparse
import sys
import re
import json
from pathlib import Path
from typing import Dict, List, Set, Optional, Tuple
from dataclasses import dataclass
from bs4 import BeautifulSoup, Tag
from collections import defaultdict, Counter

# Optional: JSON-Schema-Validierung
try:
    from jsonschema import validate, ValidationError as JSONSchemaValidationError
    HAS_JSONSCHEMA = True
except ImportError:
    HAS_JSONSCHEMA = False


@dataclass
class ValidationResult:
    """Ergebnis einer einzelnen Validierung"""
    is_valid: bool
    message: str
    element_info: Optional[str] = None
    line_number: Optional[int] = None
    severity: str = "error"  # error, warning, info


@dataclass
class ValidationSummary:
    """Zusammenfassung aller Validierungen"""
    total_elements: int
    total_errors: int
    total_warnings: int
    total_info: int
    results: List[ValidationResult]
    
    @property
    def is_valid(self) -> bool:
        return self.total_errors == 0


class HTMLValidator:
    """Haupt-Validator für HTML-Struktur"""
    
    # Standard-Elemente die data-ref haben sollten (Standard-Granularität)
    STANDARD_ELEMENTS = {
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',  # Überschriften
        'section', 'article', 'main', 'aside',  # Strukturelle Bereiche
        'div.detail-level-1', 'div.detail-level-2', 'div.detail-level-3',  # Detail-Level
        'ul', 'ol',  # Listen
        'div.info-box', 'div.warning-box', 'div.tip-box',  # Info-Boxen
        'div.agent-context-block',  # Agent-Context-Blöcke
        'span.agent-inline-trigger',  # Agent-Inline-Trigger
        'p.subtitle'  # Wichtige Paragraphen
    }
    
    # Agent-spezifische Elemente
    AGENT_ELEMENTS = {
        'div.agent-context-block',
        'span.agent-inline-trigger'
    }
    
    # NEU: Erlaubte Content-Types (Cluster 2)
    ALLOWED_CONTENT_TYPES = {
        'instruction',
        'example',
        'explanation',
        'background',
        'warning',
        'info',
        'hint',
        'attention'
    }
    
    # NEU: Hierarchie-Limits (Cluster 2)
    MAX_HIERARCHY_LEVEL = 5
    RECOMMENDED_HIERARCHY_LEVEL = 3
    
    def __init__(
        self, 
        html_file: Path, 
        verbose: bool = False, 
        root_selector: Optional[str] = None,
        schema_path: Optional[Path] = None,
        strict_mode: bool = False
    ):
        self.html_file = html_file
        self.verbose = verbose
        self.root_selector = root_selector
        self.schema_path = schema_path
        self.strict_mode = strict_mode
        self.soup: Optional[BeautifulSoup] = None
        self.validation_scope: Optional[Tag] = None
        self.schema: Optional[dict] = None
        self.results: List[ValidationResult] = []
    
    def load_html(self) -> bool:
        """HTML-Datei laden und parsen"""
        try:
            with open(self.html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            self.soup = BeautifulSoup(content, 'html.parser')
            
            # Validierungs-Scope bestimmen
            if self.root_selector:
                self.validation_scope = self._get_root_element(self.root_selector)
                if not self.validation_scope:
                    return False
            else:
                # Gesamtes Dokument
                self.validation_scope = self.soup.find('body') or self.soup
            
            # Schema laden (falls angegeben)
            if self.schema_path:
                self._load_schema()
            
            if self.verbose:
                print(f"✓ HTML geladen: {self.html_file}")
                print(f"  Elemente im Scope: {len(self.validation_scope.find_all())}")
            
            return True
            
        except Exception as e:
            self._add_result(
                False,
                f"Fehler beim Laden der HTML-Datei: {e}",
                severity="error"
            )
            return False
    
    def _load_schema(self) -> None:
        """Lädt JSON-Schema für Metadaten-Validierung"""
        try:
            with open(self.schema_path, 'r', encoding='utf-8') as f:
                self.schema = json.load(f)
            if self.verbose:
                print(f"✓ Schema geladen: {self.schema_path}")
        except Exception as e:
            self._add_result(
                False,
                f"Fehler beim Laden des Schemas: {e}",
                severity="warning"
            )
    
    def _add_result(
        self, 
        is_valid: bool, 
        message: str, 
        element_info: Optional[str] = None,
        severity: str = "error"
    ) -> None:
        """Fügt Validierungsergebnis hinzu"""
        self.results.append(
            ValidationResult(
                is_valid=is_valid,
                message=message,
                element_info=element_info,
                severity=severity
            )
        )
    
    def _get_element_info(self, element: Tag) -> str:
        """Erstellt lesbare Element-Beschreibung"""
        info_parts = [element.name]
        
        if element.get('id'):
            info_parts.append(f"id='{element['id']}'")
        
        if element.get('class'):
            classes = ' '.join(element['class'])
            info_parts.append(f"class='{classes}'")
        
        if element.get('data-ref'):
            info_parts.append(f"data-ref='{element['data-ref']}'")
        
        return f"<{' '.join(info_parts)}>"
    
    def _get_root_element(self, root_selector: str) -> Optional[Tag]:
        """Findet Root-Element basierend auf Selector"""
        try:
            # CSS-Selector verwenden
            elements = self.soup.select(root_selector)
            
            if not elements:
                self._add_result(
                    False,
                    f"Root-Element '{root_selector}' nicht gefunden",
                    severity="error"
                )
                return None
            
            if len(elements) > 1:
                self._add_result(
                    True,
                    f"Mehrere Elemente für '{root_selector}' gefunden ({len(elements)}). "
                    f"Verwende das erste Element.",
                    severity="warning"
                )
            
            root_element = elements[0]
            
            if self.verbose:
                print(f"✓ Root-Element gefunden: {self._get_element_info(root_element)}")
                print(f"  Elemente im Teilbaum: {len(root_element.find_all())}")
            
            return root_element
            
        except Exception as e:
            self._add_result(
                False,
                f"Fehler beim Verarbeiten des Root-Selectors '{root_selector}': {e}",
                severity="error"
            )
            return None
    
    def validate_all(self) -> ValidationSummary:
        """Führt alle Validierungen durch"""
        if not self.load_html():
            return self._create_summary()
        
        # Basis-Validierungen (bestehend)
        self._validate_id_uniqueness()
        self._validate_standard_granularity()
        self._validate_orphan_elements()
        self._validate_css_selector_compatibility()
        self._validate_agent_elements()
        self._validate_section_structure()
        self._validate_media_accessibility()
        
        # NEU: Cluster 2 Validierungen
        self._validate_hierarchy_depth()
        self._validate_hierarchy_parent_refs()
        self._validate_hierarchy_level_progression()
        self._validate_heading_hierarchy()
        self._validate_content_types()
        self._validate_json_ld_metadata()
        self._validate_metadata_consistency()
        self._validate_agent_context_blocks()
        self._validate_data_ref_uniqueness()
        
        return self._create_summary()
    
    # ========================================
    # BESTEHENDE VALIDIERUNGEN
    # ========================================
    
    def _validate_id_uniqueness(self) -> None:
        """Validiert Eindeutigkeit aller ID-Attribute (GLOBAL)"""
        if self.verbose:
            print("\n🔍 Validiere ID-Eindeutigkeit (global)...")
        
        # WICHTIG: Immer im gesamten Dokument prüfen
        id_elements = self.soup.find_all(id=True)
        id_counter = Counter(element.get('id') for element in id_elements)
        
        duplicates = {id_val: count for id_val, count in id_counter.items() if count > 1}
        
        if duplicates:
            for id_val, count in duplicates.items():
                elements = self.soup.find_all(id=id_val)
                element_info = ", ".join([self._get_element_info(el) for el in elements[:3]])
                self._add_result(
                    False,
                    f"ID '{id_val}' ist {count}x vorhanden (muss eindeutig sein)",
                    element_info=element_info,
                    severity="error"
                )
        else:
            if self.verbose:
                print(f"  ✓ Alle {len(id_counter)} IDs sind eindeutig")
            self._add_result(
                True,
                f"Alle {len(id_counter)} IDs sind eindeutig (global)",
                severity="info"
            )
    
    def _validate_standard_granularity(self) -> None:
        """Validiert ob alle Standard-Elemente data-ref haben"""
        if self.verbose:
            print("\n🔍 Validiere Standard-Granularität (data-ref)...")
        
        missing_data_ref = []
        
        for element_selector in self.STANDARD_ELEMENTS:
            if '.' in element_selector:
                # Element mit Klasse (z.B. "div.detail-level-1")
                tag, cls = element_selector.split('.', 1)
                elements = self.validation_scope.find_all(tag, class_=cls)
            else:
                # Nur Tag (z.B. "h1")
                elements = self.validation_scope.find_all(element_selector)
            
            for element in elements:
                if not element.get('data-ref'):
                    missing_data_ref.append(element)
        
        if missing_data_ref:
            # In strict-mode: Error, sonst Warning
            severity = "error" if self.strict_mode else "warning"
            for element in missing_data_ref[:5]:  # Max 5 Beispiele
                self._add_result(
                    False,
                    f"Element ohne data-ref (empfohlen für Standard-Granularität)",
                    element_info=self._get_element_info(element),
                    severity=severity
                )
            if len(missing_data_ref) > 5:
                self._add_result(
                    False,
                    f"... und {len(missing_data_ref) - 5} weitere Elemente ohne data-ref",
                    severity=severity
                )
        else:
            if self.verbose:
                print(f"  ✓ Alle Standard-Elemente haben data-ref")
    
    def _validate_orphan_elements(self) -> None:
        """Prüft auf Orphan-Elemente (ohne referenzierten Ancestor)"""
        if self.verbose:
            print("\n🔍 Validiere Orphan-Elemente...")
        
        # Diese Validierung ist optional und komplex
        # Hier nur Platzhalter für zukünftige Implementierung
        pass
    
    def _validate_css_selector_compatibility(self) -> None:
        """Prüft CSS-Selector-Kompatibilität"""
        if self.verbose:
            print("\n🔍 Validiere CSS-Selector-Kompatibilität...")
        
        # Placeholder für zukünftige CSS-spezifische Checks
        pass
    
    def _validate_agent_elements(self) -> None:
        """Validiert Agent-spezifische Elemente"""
        if self.verbose:
            print("\n🔍 Validiere Agent-spezifische Elemente...")
        
        # Agent-Context-Blocks (wird in _validate_agent_context_blocks detailliert geprüft)
        # Agent-Inline-Triggers
        triggers = self.validation_scope.find_all('span', class_='agent-inline-trigger')
        for trigger in triggers:
            if not trigger.get('data-context-id'):
                self._add_result(
                    False,
                    "Agent-Inline-Trigger ohne data-context-id",
                    element_info=self._get_element_info(trigger),
                    severity="error"
                )
    
    def _validate_section_structure(self) -> None:
        """Validiert Section-Struktur"""
        if self.verbose:
            print("\n🔍 Validiere Section-Struktur...")
        
        sections = self.validation_scope.find_all('section', class_='content-section')
        
        for section in sections:
            # Muss id haben
            if not section.get('id'):
                self._add_result(
                    False,
                    "Section ohne id-Attribut",
                    element_info=self._get_element_info(section),
                    severity="error"
                )
            
            # Muss data-section haben
            if not section.get('data-section'):
                self._add_result(
                    False,
                    "Section ohne data-section-Attribut",
                    element_info=self._get_element_info(section),
                    severity="error"
                )
    
    def _validate_media_accessibility(self) -> None:
        """Validiert Barrierefreiheit von Medien (BFSG)"""
        if self.verbose:
            print("\n🔍 Validiere Medien-Barrierefreiheit (BFSG)...")
        
        # Alle Bilder müssen alt-Attribute haben
        images = self.validation_scope.find_all('img')
        for img in images:
            if not img.get('alt'):
                self._add_result(
                    False,
                    "Bild ohne alt-Attribut (BFSG-Anforderung)",
                    element_info=self._get_element_info(img),
                    severity="error"
                )
    
    # ========================================
    # NEUE VALIDIERUNGEN (Cluster 2)
    # ========================================
    
    def _validate_hierarchy_depth(self) -> None:
        """Validiert Hierarchie-Tiefe (max 5, Warnung bei >3)"""
        if self.verbose:
            print("\n🔍 Validiere Hierarchie-Tiefe...")
        
        elements_with_level = self.validation_scope.find_all(attrs={'data-level': True})
        
        for element in elements_with_level:
            try:
                level = int(element.get('data-level', 0))
                
                if level > self.MAX_HIERARCHY_LEVEL:
                    self._add_result(
                        False,
                        f"Hierarchie-Tiefe {level} überschreitet Maximum ({self.MAX_HIERARCHY_LEVEL})",
                        element_info=self._get_element_info(element),
                        severity="error"
                    )
                elif level > self.RECOMMENDED_HIERARCHY_LEVEL:
                    self._add_result(
                        False,
                        f"Hierarchie-Tiefe {level} überschreitet Empfehlung ({self.RECOMMENDED_HIERARCHY_LEVEL})",
                        element_info=self._get_element_info(element),
                        severity="warning"
                    )
            except (ValueError, TypeError):
                self._add_result(
                    False,
                    f"Ungültiges data-level: '{element.get('data-level')}'",
                    element_info=self._get_element_info(element),
                    severity="error"
                )
    
    def _validate_hierarchy_parent_refs(self) -> None:
        """Validiert dass Parent-Referenzen auf existierende Elemente zeigen"""
        if self.verbose:
            print("\n🔍 Validiere Hierarchie-Parent-Referenzen...")
        
        elements_with_parent = self.validation_scope.find_all(attrs={'data-parent': True})
        
        # Alle IDs im Scope sammeln
        all_ids = {el.get('id') for el in self.validation_scope.find_all(id=True)}
        
        for element in elements_with_parent:
            parent_id = element.get('data-parent')
            
            if parent_id not in all_ids:
                self._add_result(
                    False,
                    f"data-parent='{parent_id}' zeigt auf nicht-existierendes Element",
                    element_info=self._get_element_info(element),
                    severity="error"
                )
    
    def _validate_hierarchy_level_progression(self) -> None:
        """Validiert logische Level-Progression (Level 3 sollte unter Level 2 sein, etc.)"""
        if self.verbose:
            print("\n🔍 Validiere Hierarchie-Level-Progression...")
        
        elements_with_level = self.validation_scope.find_all(attrs={'data-level': True})
        
        for element in elements_with_level:
            try:
                level = int(element.get('data-level', 0))
                parent_id = element.get('data-parent')
                
                if parent_id and level > 1:
                    # Finde Parent-Element
                    parent = self.validation_scope.find(id=parent_id)
                    
                    if parent and parent.get('data-level'):
                        parent_level = int(parent.get('data-level', 0))
                        
                        # Level sollte genau parent_level + 1 sein
                        if level != parent_level + 1:
                            self._add_result(
                                False,
                                f"Level-Sprung: Element hat Level {level}, Parent hat Level {parent_level} "
                                f"(erwartet: {parent_level + 1})",
                                element_info=self._get_element_info(element),
                                severity="warning"
                            )
            except (ValueError, TypeError):
                pass  # Bereits in _validate_hierarchy_depth geprüft
    
    def _validate_heading_hierarchy(self) -> None:
        """Validiert h1-h6 Hierarchie (BFSG-konform, keine Sprünge)"""
        if self.verbose:
            print("\n🔍 Validiere Heading-Hierarchie (BFSG)...")
        
        headings = self.validation_scope.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
        
        if not headings:
            return
        
        previous_level = 0
        
        for heading in headings:
            # Extrahiere Level aus Tag-Name (h1 -> 1, h2 -> 2, etc.)
            current_level = int(heading.name[1])
            
            # Prüfe auf Sprünge (z.B. h1 -> h3 ohne h2)
            if previous_level > 0:
                level_diff = current_level - previous_level
                
                if level_diff > 1:
                    self._add_result(
                        False,
                        f"Heading-Hierarchie-Sprung: {heading.name} folgt auf h{previous_level} "
                        f"(überspringe {level_diff - 1} Level)",
                        element_info=self._get_element_info(heading),
                        severity="error"  # BFSG-Anforderung!
                    )
            
            previous_level = current_level
    
    def _validate_content_types(self) -> None:
        """Validiert data-content-type Werte"""
        if self.verbose:
            print("\n🔍 Validiere Content-Types...")
        
        elements_with_type = self.validation_scope.find_all(attrs={'data-content-type': True})
        
        for element in elements_with_type:
            content_type = element.get('data-content-type')
            
            if content_type not in self.ALLOWED_CONTENT_TYPES:
                self._add_result(
                    False,
                    f"Ungültiger Content-Type: '{content_type}' "
                    f"(erlaubt: {', '.join(sorted(self.ALLOWED_CONTENT_TYPES))})",
                    element_info=self._get_element_info(element),
                    severity="error"
                )
    
    def _validate_json_ld_metadata(self) -> None:
        """Validiert JSON-LD Metadaten in Sections"""
        if self.verbose:
            print("\n🔍 Validiere JSON-LD Metadaten...")
        
        sections = self.validation_scope.find_all('section', class_='content-section')
        
        for section in sections:
            metadata_script = section.find('script', class_='section-metadata')
            
            if not metadata_script:
                severity = "error" if self.strict_mode else "warning"
                self._add_result(
                    False,
                    "Section ohne JSON-LD Metadaten",
                    element_info=self._get_element_info(section),
                    severity=severity
                )
                continue
            
            # JSON-LD parsen
            try:
                metadata = json.loads(metadata_script.string)
                
                # Pflichtfelder prüfen
                required_fields = ['@context', '@type', 'identifier', 'name', 'version']
                for field in required_fields:
                    if field not in metadata:
                        self._add_result(
                            False,
                            f"Pflichtfeld '{field}' fehlt in Metadaten",
                            element_info=self._get_element_info(section),
                            severity="error"
                        )
                
                # Optional: Schema-Validierung
                if self.schema and HAS_JSONSCHEMA:
                    try:
                        # Validiere gegen sectionMetadata-Definition
                        if 'definitions' in self.schema and 'sectionMetadata' in self.schema['definitions']:
                            validate(instance=metadata, schema=self.schema['definitions']['sectionMetadata'])
                    except JSONSchemaValidationError as e:
                        self._add_result(
                            False,
                            f"Schema-Validierung fehlgeschlagen: {e.message}",
                            element_info=self._get_element_info(section),
                            severity="error"
                        )
            
            except json.JSONDecodeError as e:
                self._add_result(
                    False,
                    f"Ungültiges JSON in Metadaten: {str(e)}",
                    element_info=self._get_element_info(section),
                    severity="error"
                )
    
    def _validate_metadata_consistency(self) -> None:
        """Prüft Konsistenz zwischen Metadaten und Attributen"""
        if self.verbose:
            print("\n🔍 Validiere Metadaten-Konsistenz...")
        
        sections = self.validation_scope.find_all('section', class_='content-section')
        
        for section in sections:
            metadata_script = section.find('script', class_='section-metadata')
            
            if not metadata_script:
                continue
            
            try:
                metadata = json.loads(metadata_script.string)
                
                # identifier muss mit data-section übereinstimmen
                if 'identifier' in metadata:
                    data_section = section.get('data-section')
                    if metadata['identifier'] != data_section:
                        self._add_result(
                            False,
                            f"Metadaten-ID '{metadata['identifier']}' stimmt nicht mit "
                            f"data-section '{data_section}' überein",
                            element_info=self._get_element_info(section),
                            severity="error"
                        )
            
            except json.JSONDecodeError:
                pass  # Bereits in _validate_json_ld_metadata geprüft
    
    def _validate_agent_context_blocks(self) -> None:
        """Validiert Agent-Context-Blocks (genau einer pro Section am Ende)"""
        if self.verbose:
            print("\n🔍 Validiere Agent-Context-Blocks...")
        
        sections = self.validation_scope.find_all('section', class_='content-section')
        
        for section in sections:
            # Nur direkte Kinder (nicht verschachtelt)
            context_blocks = section.find_all('div', class_='agent-context-block', recursive=False)
            
            if len(context_blocks) == 0:
                severity = "error" if self.strict_mode else "warning"
                self._add_result(
                    False,
                    "Section ohne Agent-Context-Block",
                    element_info=self._get_element_info(section),
                    severity=severity
                )
            elif len(context_blocks) > 1:
                self._add_result(
                    False,
                    f"Section mit {len(context_blocks)} Agent-Context-Blocks (nur einer erlaubt)",
                    element_info=self._get_element_info(section),
                    severity="error"
                )
            else:
                # Genau ein Block - prüfe Platzierung (sollte letztes Kind sein)
                context_block = context_blocks[0]
                section_children = [child for child in section.children if child.name]
                
                if section_children and section_children[-1] != context_block:
                    self._add_result(
                        False,
                        "Agent-Context-Block nicht am Ende der Section",
                        element_info=self._get_element_info(section),
                        severity="warning"
                    )
                
                # Prüfe erforderliche Attribute
                if not context_block.get('data-ref'):
                    self._add_result(
                        False,
                        "Agent-Context-Block ohne data-ref",
                        element_info=self._get_element_info(section),
                        severity="error"
                    )
                
                if not context_block.get('data-context-id'):
                    self._add_result(
                        False,
                        "Agent-Context-Block ohne data-context-id",
                        element_info=self._get_element_info(section),
                        severity="error"
                    )
    
    def _validate_data_ref_uniqueness(self) -> None:
        """Validiert Eindeutigkeit von data-ref Attributen"""
        if self.verbose:
            print("\n🔍 Validiere data-ref Eindeutigkeit...")
        
        elements_with_ref = self.validation_scope.find_all(attrs={'data-ref': True})
        ref_counter = Counter(element.get('data-ref') for element in elements_with_ref)
        
        duplicates = {ref: count for ref, count in ref_counter.items() if count > 1}
        
        if duplicates:
            for ref, count in duplicates.items():
                elements = self.validation_scope.find_all(attrs={'data-ref': ref})
                element_info = ", ".join([self._get_element_info(el) for el in elements[:3]])
                self._add_result(
                    False,
                    f"data-ref '{ref}' ist {count}x vorhanden (muss eindeutig sein)",
                    element_info=element_info,
                    severity="error"
                )
        
        # Pattern-Validierung
        for element in elements_with_ref:
            ref = element.get('data-ref')
            if not re.match(r'^[a-z0-9-]+$', ref):
                self._add_result(
                    False,
                    f"data-ref '{ref}' entspricht nicht Pattern (nur lowercase, Zahlen, Bindestriche)",
                    element_info=self._get_element_info(element),
                    severity="warning"
                )
            
            if len(ref) > 64:
                self._add_result(
                    False,
                    f"data-ref '{ref}' ist zu lang ({len(ref)} Zeichen, max 64)",
                    element_info=self._get_element_info(element),
                    severity="warning"
                )
    
    # ========================================
    # HELPER METHODS
    # ========================================
    
    def _create_summary(self) -> ValidationSummary:
        """Erstellt Zusammenfassung aller Validierungen"""
        errors = sum(1 for r in self.results if r.severity == "error" and not r.is_valid)
        warnings = sum(1 for r in self.results if r.severity == "warning" and not r.is_valid)
        info = sum(1 for r in self.results if r.severity == "info")
        
        total_elements = len(self.validation_scope.find_all()) if self.validation_scope else 0
        
        return ValidationSummary(
            total_elements=total_elements,
            total_errors=errors,
            total_warnings=warnings,
            total_info=info,
            results=self.results
        )


def print_results(summary: ValidationSummary, verbose: bool = False, root_selector: Optional[str] = None) -> None:
    """Gibt Validierungsergebnisse formatiert aus"""
    
    # Header
    print("\n" + "="*80)
    print("🔍 HTML STRUCTURE VALIDATION RESULTS (v2.0)")
    if root_selector:
        print(f"🎯 Validierungs-Scope: {root_selector}")
    print("="*80)
    
    # Zusammenfassung
    print(f"\n📊 ZUSAMMENFASSUNG:")
    print(f"   Total Elemente: {summary.total_elements}")
    print(f"   ❌ Errors:      {summary.total_errors}")
    print(f"   ⚠️  Warnings:    {summary.total_warnings}")
    print(f"   ℹ️  Info:        {summary.total_info}")
    
    # Status
    status = "✅ VALID" if summary.is_valid else "❌ INVALID"
    print(f"\n🎯 STATUS: {status}")
    
    # Detaillierte Ergebnisse
    if summary.total_errors > 0 or summary.total_warnings > 0 or verbose:
        print(f"\n📋 DETAILS:")
        print("-" * 80)
        
        for result in summary.results:
            if result.severity == "info" and not verbose:
                continue
            
            # Icon basierend auf Severity
            icon = {
                "error": "❌",
                "warning": "⚠️",
                "info": "ℹ️"
            }.get(result.severity, "?")
            
            print(f"{icon} {result.message}")
            
            if result.element_info and verbose:
                print(f"   └─ {result.element_info}")
        
        print("-" * 80)
    
    # Empfehlungen
    if summary.total_errors > 0:
        print(f"\n💡 EMPFEHLUNGEN:")
        print("   • Beheben Sie alle Errors vor dem Deployment")
        print("   • Prüfen Sie doppelte IDs/data-refs und korrigieren Sie diese")
        print("   • Stellen Sie sicher, dass JSON-LD Metadaten vollständig sind")
        print("   • Validieren Sie Hierarchie-Struktur und Parent-Referenzen")
    
    if summary.total_warnings > 0:
        print(f"\n⚠️  WARNUNGEN:")
        print("   • Warnings sollten überprüft werden")
        print("   • Hierarchie-Tiefe >3 kann unübersichtlich werden")
        print("   • Fehlende data-ref Attribute verbessern die Agent-Integration")


def main():
    """Haupt-Funktion für CLI"""
    parser = argparse.ArgumentParser(
        description="Validiert HTML-Struktur für AXIOM Agent System (v2.0 - Cluster 2)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Beispiele:
  python validate_html_structure.py index.html
  python validate_html_structure.py index.html --verbose
  python validate_html_structure.py index.html --root-tag "main"
  python validate_html_structure.py index.html --schema ../../schema/main-content.schema.json
  python validate_html_structure.py index.html --strict-mode
  python validate_html_structure.py *.html --verbose --exit-on-error

Neu in v2.0 (Cluster 2):
  - Hierarchie-Validierung (Tiefe, Parent-Refs, Level-Progression)
  - Heading-Hierarchie (h1-h6 BFSG-konform)
  - Content-Type-Validierung (8 erlaubte Werte)
  - JSON-LD Metadaten-Validierung (inkl. Schema-Check)
  - Agent-Context-Block-Validierung (einer pro Section)
  - data-ref Eindeutigkeit und Pattern-Validierung
        """
    )
    
    parser.add_argument(
        'html_files',
        nargs='+',
        help='HTML-Dateien zum Validieren'
    )
    
    parser.add_argument(
        '--verbose', '-v',
        action='store_true',
        help='Detaillierte Ausgabe mit allen Infos'
    )
    
    parser.add_argument(
        '--exit-on-error',
        action='store_true',
        help='Skript mit Exit-Code != 0 beenden bei Errors'
    )
    
    parser.add_argument(
        '--root-tag',
        type=str,
        default=None,
        help='CSS-Selector für Wurzelelement (optional). Validierung erfolgt nur innerhalb dieses Elements.'
    )
    
    parser.add_argument(
        '--schema',
        type=Path,
        default=None,
        help='Pfad zum JSON-Schema für Metadaten-Validierung (optional)'
    )
    
    parser.add_argument(
        '--strict-mode',
        action='store_true',
        help='Strict-Mode: Fehlende neue Attribute (Metadaten, etc.) werden als Error behandelt'
    )
    
    args = parser.parse_args()
    
    # Prüfe jsonschema-Verfügbarkeit
    if args.schema and not HAS_JSONSCHEMA:
        print("⚠️  WARNUNG: jsonschema-Modul nicht installiert.")
        print("   Schema-Validierung wird übersprungen.")
        print("   Installation: pip install jsonschema")
        print()
    
    total_errors = 0
    total_warnings = 0
    
    for html_file in args.html_files:
        file_path = Path(html_file)
        
        if not file_path.exists():
            print(f"❌ Datei nicht gefunden: {html_file}")
            continue
        
        print(f"\n🔍 Validiere: {html_file}")
        
        validator = HTMLValidator(
            file_path,
            verbose=args.verbose,
            root_selector=args.root_tag,
            schema_path=args.schema,
            strict_mode=args.strict_mode
        )
        summary = validator.validate_all()
        
        print_results(summary, verbose=args.verbose, root_selector=args.root_tag)
        
        total_errors += summary.total_errors
        total_warnings += summary.total_warnings
    
    # Gesamt-Fazit
    if len(args.html_files) > 1:
        print(f"\n🎯 GESAMT-FAZIT:")
        print(f"   Dateien: {len(args.html_files)}")
        print(f"   Errors: {total_errors}")
        print(f"   Warnings: {total_warnings}")
    
    # Exit-Code setzen
    if args.exit_on_error and total_errors > 0:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()