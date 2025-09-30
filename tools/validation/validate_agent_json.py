#!/usr/bin/env python3
"""
Agent JSON Validator für AXIOM Agent System

Validiert:
- JSON-Schema-Konformität gegen agent-dialogs.schema.json
- CSS-Selector-Referenzen gegen HTML-Struktur
- Dialog-Verknüpfungen und Action-Chains
- Context-Block-Target-Existenz
- Section-Trigger-Referenzen

Autor: AXIOM Guide Development
Version: 1.1 (mit --root-tag Support)
"""

import argparse
import json
import sys
import re
from pathlib import Path
from typing import Dict, List, Set, Optional, Any, Tuple
from dataclasses import dataclass
from bs4 import BeautifulSoup, Tag

# Importiere jsonschema falls verfügbar, ansonsten skip Schema-Validation
try:
    import jsonschema
    HAS_JSONSCHEMA = True
except ImportError:
    HAS_JSONSCHEMA = False
    print("⚠️  jsonschema nicht installiert. Schema-Validierung wird übersprungen.")
    print("   Installation: pip install jsonschema")


@dataclass
class ValidationResult:
    """Ergebnis einer einzelnen Validierung"""
    is_valid: bool
    message: str
    context: Optional[str] = None
    selector: Optional[str] = None
    severity: str = "error"  # error, warning, info
    suggestion: Optional[str] = None


@dataclass
class ValidationSummary:
    """Zusammenfassung aller Validierungen"""
    total_dialogs: int
    total_selectors: int
    total_errors: int
    total_warnings: int
    total_info: int
    results: List[ValidationResult]
    
    @property
    def is_valid(self) -> bool:
        return self.total_errors == 0


class AgentJSONValidator:
    """Haupt-Validator für Agent-JSON-Konfiguration"""
    
    def __init__(self, json_file: Path, html_file: Path, schema_file: Optional[Path] = None, 
                 verbose: bool = False, root_selector: Optional[str] = None):
        self.json_file = json_file
        self.html_file = html_file
        self.schema_file = schema_file
        self.verbose = verbose
        self.root_selector = root_selector
        
        self.json_data: Optional[Dict] = None
        self.html_soup: Optional[BeautifulSoup] = None
        self.html_scope: Optional[Tag] = None  # Scope für HTML-Validierung
        self.schema: Optional[Dict] = None
        self.results: List[ValidationResult] = []
        
        # Statistiken
        self.all_selectors: Set[str] = set()
        self.found_selectors: Set[str] = set()
        self.missing_selectors: Set[str] = set()
    
    def load_files(self) -> bool:
        """Lädt alle benötigten Dateien"""
        success = True
        
        # JSON laden
        try:
            with open(self.json_file, 'r', encoding='utf-8') as f:
                self.json_data = json.load(f)
            
            if self.verbose:
                print(f"✓ JSON-Datei geladen: {self.json_file}")
                
        except FileNotFoundError:
            self._add_result(False, f"JSON-Datei nicht gefunden: {self.json_file}")
            success = False
        except json.JSONDecodeError as e:
            self._add_result(False, f"JSON-Syntax-Fehler: {e}")
            success = False
        except Exception as e:
            self._add_result(False, f"Fehler beim Laden der JSON-Datei: {e}")
            success = False
        
        # HTML laden
        try:
            with open(self.html_file, 'r', encoding='utf-8') as f:
                html_content = f.read()
            
            self.html_soup = BeautifulSoup(html_content, 'html.parser')
            
            if self.verbose:
                print(f"✓ HTML-Datei geladen: {self.html_file}")
                print(f"  Gefundene Elemente: {len(self.html_soup.find_all())}")
            
            # Root-Element extrahieren
            if not self._extract_root_element():
                success = False
            else:
                if self.verbose and self.root_selector:
                    print(f"🎯 HTML-Validierungs-Scope eingeschränkt auf: {self.root_selector}")
                elif self.verbose:
                    print(f"🎯 HTML-Validierungs-Scope: Gesamtes Dokument")
                
        except FileNotFoundError:
            self._add_result(False, f"HTML-Datei nicht gefunden: {self.html_file}")
            success = False
        except Exception as e:
            self._add_result(False, f"Fehler beim Laden der HTML-Datei: {e}")
            success = False
        
        # Schema laden (optional)
        if self.schema_file and self.schema_file.exists():
            try:
                with open(self.schema_file, 'r', encoding='utf-8') as f:
                    self.schema = json.load(f)
                
                if self.verbose:
                    print(f"✓ Schema-Datei geladen: {self.schema_file}")
                    
            except Exception as e:
                self._add_result(
                    False, 
                    f"Warnung: Schema konnte nicht geladen werden: {e}",
                    severity="warning"
                )
        
        return success
    
    def _extract_root_element(self) -> bool:
        """
        Extrahiert das Wurzelelement basierend auf CSS-Selector.
        
        Returns:
            True wenn erfolgreich oder kein Root-Selector angegeben, False bei Fehler
        """
        if not self.root_selector:
            self.html_scope = self.html_soup
            return True
        
        try:
            elements = self.html_soup.select(self.root_selector)
            
            if len(elements) == 0:
                self._add_result(
                    False,
                    f"Root-Tag Selector '{self.root_selector}' findet kein Element im HTML",
                    severity="error"
                )
                return False
            
            if len(elements) > 1:
                self._add_result(
                    False,
                    f"Root-Tag Selector '{self.root_selector}' findet {len(elements)} Elemente. "
                    f"Verwende das erste Element.",
                    severity="warning"
                )
            
            self.html_scope = elements[0]
            
            if self.verbose:
                element_info = f"<{self.html_scope.name}"
                if self.html_scope.get('id'):
                    element_info += f" id='{self.html_scope.get('id')}'"
                if self.html_scope.get('class'):
                    element_info += f" class='{' '.join(self.html_scope.get('class'))}'"
                element_info += ">"
                
                print(f"✓ Root-Element gefunden: {element_info}")
                print(f"  Elemente im HTML-Scope: {len(self.html_scope.find_all())}")
            
            return True
            
        except Exception as e:
            self._add_result(
                False,
                f"Fehler beim Verarbeiten des Root-Tag Selectors '{self.root_selector}': {e}",
                severity="error"
            )
            return False
    
    def validate_all(self) -> ValidationSummary:
        """Führt alle Validierungen durch"""
        if not self.load_files():
            return self._create_summary()
        
        # Schema-Validierung (falls Schema vorhanden)
        if self.schema and HAS_JSONSCHEMA:
            self._validate_json_schema()
        elif self.schema and not HAS_JSONSCHEMA:
            self._add_result(
                False,
                "Schema vorhanden, aber jsonschema-Library fehlt",
                severity="warning"
            )
        
        # Hauptvalidierungen
        self._validate_selector_references()
        self._validate_dialog_structure()
        self._validate_action_chains()
        self._validate_section_triggers()
        self._validate_context_blocks()
        self._generate_statistics()
        
        return self._create_summary()
    
    def _validate_json_schema(self) -> None:
        """Validiert JSON gegen Schema"""
        if self.verbose:
            print("\n🔍 Validiere JSON-Schema-Konformität...")
        
        try:
            jsonschema.validate(instance=self.json_data, schema=self.schema)
            
            if self.verbose:
                print("  ✓ JSON entspricht dem Schema")
            self._add_result(True, "JSON-Schema-Validierung erfolgreich", severity="info")
            
        except jsonschema.ValidationError as e:
            self._add_result(
                False,
                f"Schema-Validierung fehlgeschlagen: {e.message}",
                context=f"Pfad: {' -> '.join(str(p) for p in e.absolute_path)}"
            )
        except jsonschema.SchemaError as e:
            self._add_result(
                False,
                f"Schema selbst ist ungültig: {e.message}",
                severity="warning"
            )
    
    def _validate_selector_references(self) -> None:
        """Validiert alle CSS-Selector-Referenzen gegen HTML"""
        if self.verbose:
            print("\n🔍 Validiere CSS-Selector-Referenzen...")
        
        # Alle Selektoren aus JSON sammeln
        selectors = self._extract_all_selectors()
        
        for selector in selectors:
            self.all_selectors.add(selector)
            
            if self._test_selector(selector):
                self.found_selectors.add(selector)
                if self.verbose:
                    elements = self.html_scope.select(selector)
                    print(f"  ✓ '{selector}' -> {len(elements)} Element(e)")
            else:
                self.missing_selectors.add(selector)
                self._add_result(
                    False,
                    f"CSS-Selector nicht gefunden: '{selector}'",
                    selector=selector,
                    suggestion=self._suggest_similar_selector(selector)
                )
        
        # Erfolgs-Info
        if len(self.found_selectors) > 0:
            self._add_result(
                True,
                f"{len(self.found_selectors)} von {len(self.all_selectors)} Selektoren gefunden",
                severity="info"
            )
    
    def _validate_dialog_structure(self) -> None:
        """Validiert Dialog-Struktur und Verknüpfungen"""
        if self.verbose:
            print("\n🔍 Validiere Dialog-Struktur...")
        
        dialogs = self.json_data.get('dialogs', {})
        
        for dialog_id, dialog in dialogs.items():
            context = f"Dialog: {dialog_id}"
            
            # Dialog muss targetSelectors haben
            target_selectors = dialog.get('targetSelectors', [])
            if not target_selectors:
                self._add_result(
                    False,
                    f"Dialog ohne targetSelectors",
                    context=context
                )
            
            # ID-Konsistenz prüfen
            if dialog.get('id') != dialog_id:
                self._add_result(
                    False,
                    f"Dialog-ID inkonsistent: Key='{dialog_id}' vs. id='{dialog.get('id')}'",
                    context=context
                )
            
            # Actions validieren
            actions = dialog.get('actions', [])
            for i, action in enumerate(actions):
                self._validate_single_action(action, f"{context} -> Action[{i}]")
            
            # Questions validieren
            questions = dialog.get('questions', {})
            for question_id, question in questions.items():
                question_context = f"{context} -> Question: {question_id}"
                
                # Question-Actions validieren
                if 'actions' in question:
                    for i, action in enumerate(question['actions']):
                        self._validate_single_action(action, f"{question_context} -> Action[{i}]")

    def _validate_single_action(self, action: Dict, context: str) -> None:
        """Validiert eine einzelne Action"""
        action_type = action.get('type')
        action_id = action.get('id', 'unnamed')
        
        if action_type == 'navigate':
            # Navigate-Actions brauchen targetSelectors
            target_selectors = action.get('targetSelectors', [])
            if not target_selectors:
                self._add_result(
                    False,
                    f"Navigate-Action ohne targetSelectors",
                    context=f"{context} (Action: {action_id})"
                )
        
        elif action_type == 'showInfo':
            # ShowInfo-Actions brauchen content
            if not action.get('content'):
                self._add_result(
                    False,
                    f"ShowInfo-Action ohne content",
                    context=f"{context} (Action: {action_id})"
                )
        
        elif action_type == 'askQuestion':
            # AskQuestion-Actions brauchen question
            if not action.get('question'):
                self._add_result(
                    False,
                    f"AskQuestion-Action ohne question",
                    context=f"{context} (Action: {action_id})"
                )
        
        # Context-Block validieren
        if 'contextBlock' in action:
            context_block = action['contextBlock']
            cb_selectors = context_block.get('targetSelectors', [])
            
            if not cb_selectors:
                self._add_result(
                    False,
                    f"ContextBlock ohne targetSelectors",
                    context=f"{context} (Action: {action_id})"
                )
            
            if not context_block.get('content'):
                self._add_result(
                    False,
                    f"ContextBlock ohne content",
                    context=f"{context} (Action: {action_id})"
                )
        
        # Rekursiv: nextActions validieren
        next_actions = action.get('nextActions', [])
        for i, next_action in enumerate(next_actions):
            self._validate_single_action(next_action, f"{context} -> NextAction[{i}]")
    
    def _validate_action_chains(self) -> None:
        """Validiert Action-Chain-Logik"""
        if self.verbose:
            print("\n🔍 Validiere Action-Chains...")
        
        dialogs = self.json_data.get('dialogs', {})
        
        # Zirkuläre Referenzen und tote Enden finden
        for dialog_id, dialog in dialogs.items():
            self._check_action_chain_depth(dialog.get('actions', []), dialog_id, set(), 0)
    
    def _check_action_chain_depth(self, actions: List[Dict], dialog_id: str, visited: Set[str], depth: int) -> None:
        """Prüft Action-Chain auf Tiefe und Zyklen"""
        if depth > 10:  # Maximale Chain-Tiefe
            self._add_result(
                False,
                f"Action-Chain zu tief (>{depth}), möglicherweise zirkulär",
                context=f"Dialog: {dialog_id}",
                severity="warning"
            )
            return
        
        for action in actions:
            action_id = action.get('id', 'unnamed')
            chain_key = f"{dialog_id}::{action_id}"
            
            if chain_key in visited:
                self._add_result(
                    False,
                    f"Zirkuläre Action-Referenz erkannt",
                    context=f"Dialog: {dialog_id}, Action: {action_id}",
                    severity="warning"
                )
                continue
            
            visited.add(chain_key)
            
            # Rekursiv für nextActions
            next_actions = action.get('nextActions', [])
            if next_actions:
                self._check_action_chain_depth(next_actions, dialog_id, visited.copy(), depth + 1)
    
    def _validate_section_triggers(self) -> None:
        """Validiert Section-Trigger-Referenzen"""
        if self.verbose:
            print("\n🔍 Validiere Section-Triggers...")
        
        section_triggers = self.json_data.get('sectionTriggers', {})
        
        for trigger_id, trigger in section_triggers.items():
            context = f"SectionTrigger: {trigger_id}"
            
            # Section-ID muss in HTML existieren
            section_id = trigger.get('sectionId')
            if section_id:
                section_selector = f"[data-section='{section_id}']"
                if not self._test_selector(section_selector):
                    self._add_result(
                        False,
                        f"Section-ID '{section_id}' nicht in HTML gefunden",
                        context=context,
                        selector=section_selector
                    )
            
            # Context-ID muss in dialogs existieren
            context_id = trigger.get('contextId')
            if context_id:
                dialogs = self.json_data.get('dialogs', {})
                if context_id not in dialogs:
                    self._add_result(
                        False,
                        f"Context-ID '{context_id}' nicht in dialogs gefunden",
                        context=context,
                        suggestion=f"Verfügbare Dialoge: {', '.join(dialogs.keys())}"
                    )
            
            # Conditions validieren
            conditions = trigger.get('conditions', {})
            intersection_ratio = conditions.get('intersectionRatio', 0.5)
            if not 0 <= intersection_ratio <= 1:
                self._add_result(
                    False,
                    f"intersectionRatio muss zwischen 0 und 1 liegen (ist: {intersection_ratio})",
                    context=context,
                    severity="warning"
                )
    
    def _validate_context_blocks(self) -> None:
        """Validiert Context-Block-Strukturen"""
        if self.verbose:
            print("\n🔍 Validiere Context-Blocks...")
        
        # Context-Blocks in HTML finden
        html_context_blocks = self.html_scope.find_all(class_='agent-context-block')
        html_block_ids = set()
        
        for block in html_context_blocks:
            if block.get('id'):
                html_block_ids.add(f"#{block.get('id')}")
            if block.get('data-ref'):
                parent_id = None
                # Eltern-Element mit ID suchen
                for parent in block.parents:
                    if parent.get('id'):
                        parent_id = parent.get('id')
                        break
                
                if parent_id:
                    html_block_ids.add(f"#{parent_id} [data-ref='{block.get('data-ref')}']")
        
        if self.verbose:
            print(f"  Gefundene Context-Blocks in HTML: {len(html_block_ids)}")
        
        # Context-Blocks in JSON finden und validieren
        json_context_blocks = set()
        self._extract_context_block_selectors(self.json_data, json_context_blocks)
        
        # Prüfen ob JSON-Context-Blocks in HTML existieren
        for selector in json_context_blocks:
            if not self._test_selector(selector):
                self._add_result(
                    False,
                    f"Context-Block-Target nicht gefunden: '{selector}'",
                    selector=selector,
                    suggestion="Prüfen Sie ob das Element im HTML existiert"
                )
    
    def _extract_context_block_selectors(self, data: Any, result_set: Set[str]) -> None:
        """Extrahiert Context-Block-Selektoren rekursiv"""
        if isinstance(data, dict):
            if 'contextBlock' in data:
                context_block = data['contextBlock']
                selectors = context_block.get('targetSelectors', [])
                for selector in selectors:
                    result_set.add(selector)
            
            for value in data.values():
                self._extract_context_block_selectors(value, result_set)
        
        elif isinstance(data, list):
            for item in data:
                self._extract_context_block_selectors(item, result_set)
    
    def _extract_all_selectors(self) -> Set[str]:
        """Extrahiert alle CSS-Selektoren aus JSON"""
        selectors = set()
        self._extract_selectors_recursive(self.json_data, selectors)
        return selectors
    
    def _extract_selectors_recursive(self, data: Any, result_set: Set[str]) -> None:
        """Extrahiert Selektoren rekursiv aus JSON-Struktur"""
        if isinstance(data, dict):
            # targetSelectors Arrays
            if 'targetSelectors' in data:
                for selector in data['targetSelectors']:
                    result_set.add(selector)
            
            # Rekursiv in alle Werte
            for value in data.values():
                self._extract_selectors_recursive(value, result_set)
        
        elif isinstance(data, list):
            for item in data:
                self._extract_selectors_recursive(item, result_set)
    
    def _test_selector(self, selector: str) -> bool:
        """Testet ob CSS-Selector in HTML existiert"""
        try:
            elements = self.html_scope.select(selector)
            return len(elements) > 0
        except Exception as e:
            # Ungültiger Selector
            self._add_result(
                False,
                f"Ungültiger CSS-Selector: '{selector}' ({e})",
                selector=selector
            )
            return False
    
    def _suggest_similar_selector(self, missing_selector: str) -> Optional[str]:
        """Schlägt ähnliche Selektoren vor"""
        # Einfache Heuristik für Vorschläge
        
        # Wenn data-ref fehlt, nach ähnlichen IDs suchen
        if '[data-ref=' in missing_selector:
            data_ref_match = re.search(r"data-ref='([^']+)'", missing_selector)
            if data_ref_match:
                data_ref_value = data_ref_match.group(1)
                
                # Nach ähnlichen data-ref Werten suchen
                all_data_refs = [
                    el.get('data-ref') for el in self.html_scope.find_all(attrs={'data-ref': True})
                ]
                
                for existing_ref in all_data_refs:
                    if existing_ref and (
                        data_ref_value in existing_ref or 
                        existing_ref in data_ref_value or
                        self._similar_strings(data_ref_value, existing_ref)
                    ):
                        base_selector = missing_selector.split(' [data-ref=')[0]
                        return f"{base_selector} [data-ref='{existing_ref}']"
        
        # Wenn ID fehlt, nach ähnlichen IDs suchen
        if missing_selector.startswith('#'):
            missing_id = missing_selector.split()[0][1:]  # Erstes Wort ohne #
            
            all_ids = [el.get('id') for el in self.html_scope.find_all(id=True)]
            
            for existing_id in all_ids:
                if existing_id and self._similar_strings(missing_id, existing_id):
                    return f"#{existing_id}"
        
        return None
    
    def _similar_strings(self, a: str, b: str, threshold: float = 0.6) -> bool:
        """Einfache String-Ähnlichkeits-Prüfung"""
        if not a or not b:
            return False
        
        # Levenshtein-Distanz approximieren
        longer = max(a, b, key=len)
        shorter = min(a, b, key=len)
        
        if len(longer) == 0:
            return True
        
        # Einfache Ähnlichkeitsprüfung basierend auf gemeinsamen Zeichen
        common_chars = set(shorter) & set(longer)
        similarity = len(common_chars) / len(set(longer))
        
        return similarity >= threshold
    
    def _generate_statistics(self) -> None:
        """Generiert Statistiken über die Validierung"""
        if self.verbose:
            print("\n📊 Generiere Statistiken...")
        
        # Selector-Erfolgsrate
        total_selectors = len(self.all_selectors)
        found_selectors = len(self.found_selectors)
        success_rate = (found_selectors / total_selectors * 100) if total_selectors > 0 else 100
        
        self._add_result(
            True,
            f"Selector-Erfolgsrate: {success_rate:.1f}% ({found_selectors}/{total_selectors})",
            severity="info"
        )
        
        # Dialog-Statistiken
        total_dialogs = len(self.json_data.get('dialogs', {}))
        total_actions = self._count_total_actions()
        
        self._add_result(
            True,
            f"JSON-Struktur: {total_dialogs} Dialoge, {total_actions} Actions",
            severity="info"
        )
        
        # HTML-Element-Statistiken
        if self.html_scope:
            context_blocks = len(self.html_scope.find_all(class_='agent-context-block'))
            inline_triggers = len(self.html_scope.find_all(class_='agent-inline-trigger'))
            sections = len(self.html_scope.find_all('section', class_='content-section'))
            
            scope_info = f" (Scope: {self.root_selector})" if self.root_selector else ""
            
            self._add_result(
                True,
                f"HTML-Agent-Elemente{scope_info}: {context_blocks} Context-Blocks, "
                f"{inline_triggers} Inline-Triggers, {sections} Sections",
                severity="info"
            )
    
    def _count_total_actions(self) -> int:
        """Zählt die Gesamtzahl aller Actions"""
        count = [0]  # Verwende Liste für Mutability in nested function
        
        def count_recursive(data: Any) -> None:
            if isinstance(data, dict):
                if 'actions' in data and isinstance(data['actions'], list):
                    count[0] += len(data['actions'])
                for value in data.values():
                    count_recursive(value)
            elif isinstance(data, list):
                for item in data:
                    count_recursive(item)
        
        count_recursive(self.json_data)
        return count[0]
    
    def _add_result(self, is_valid: bool, message: str, context: str = None, selector: str = None, severity: str = "error", suggestion: str = None) -> None:
        """Fügt ein Validierungsergebnis hinzu"""
        result = ValidationResult(
            is_valid=is_valid,
            message=message,
            context=context,
            selector=selector,
            severity=severity,
            suggestion=suggestion
        )
        self.results.append(result)
    
    def _create_summary(self) -> ValidationSummary:
        """Erstellt Zusammenfassung aller Validierungen"""
        errors = sum(1 for r in self.results if r.severity == "error" and not r.is_valid)
        warnings = sum(1 for r in self.results if r.severity == "warning" and not r.is_valid)
        info = sum(1 for r in self.results if r.severity == "info")
        
        total_dialogs = len(self.json_data.get('dialogs', {})) if self.json_data else 0
        total_selectors = len(self.all_selectors)
        
        return ValidationSummary(
            total_dialogs=total_dialogs,
            total_selectors=total_selectors,
            total_errors=errors,
            total_warnings=warnings,
            total_info=info,
            results=self.results
        )


def print_results(summary: ValidationSummary, verbose: bool = False, root_selector: Optional[str] = None) -> None:
    """Gibt Validierungsergebnisse formatiert aus"""
    
    # Header
    print("\n" + "="*80)
    print("🔍 AGENT JSON VALIDATION RESULTS")
    if root_selector:
        print(f"🎯 HTML-Validierungs-Scope: {root_selector}")
    print("="*80)
    
    # Zusammenfassung
    print(f"\n📊 ZUSAMMENFASSUNG:")
    print(f"   Total Dialoge:    {summary.total_dialogs}")
    print(f"   Total Selektoren: {summary.total_selectors}")
    print(f"   ❌ Errors:        {summary.total_errors}")
    print(f"   ⚠️  Warnings:      {summary.total_warnings}")
    print(f"   ℹ️  Info:          {summary.total_info}")
    
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
            
            if result.context:
                print(f"   └─ Context: {result.context}")
            
            if result.selector and verbose:
                print(f"   └─ Selector: {result.selector}")
            
            if result.suggestion:
                print(f"   💡 Vorschlag: {result.suggestion}")
            
            if verbose:
                print()
        
        print("-" * 80)
    
    # Empfehlungen
    if summary.total_errors > 0:
        print(f"\n💡 EMPFEHLUNGEN:")
        print("   • Beheben Sie alle fehlenden CSS-Selector-Referenzen")
        print("   • Prüfen Sie Dialog-Struktur und Action-Chains")
        print("   • Stellen Sie sicher, dass alle Context-Blocks existieren")
    
    if summary.total_warnings > 0:
        print(f"\n⚠️  WARNUNGEN:")
        print("   • Überprüfen Sie Action-Chain-Tiefe und Zyklen")
        print("   • Validieren Sie Section-Trigger-Parameter")
        print("   • Testen Sie die JSON-Konfiguration im Browser")


def find_schema_file(json_file: Path) -> Optional[Path]:
    """Sucht automatisch nach Schema-Datei"""
    # Mögliche Schema-Locations
    possible_schemas = [
        json_file.parent / "agent-dialogs.schema.json",
        json_file.parent / "schema" / "agent-dialogs.schema.json",
        json_file.parent.parent / "schema" / "agent-dialogs.schema.json"
    ]
    
    for schema_path in possible_schemas:
        if schema_path.exists():
            return schema_path
    
    return None


def main():
    """Haupt-Funktion für CLI"""
    parser = argparse.ArgumentParser(
        description="Validiert Agent-JSON-Konfiguration gegen HTML-Struktur",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Beispiele:
  python validate_agent_json.py agent-dialogs.json index.html
  python validate_agent_json.py agent-dialogs.json index.html --schema schema.json
  python validate_agent_json.py agent-dialogs.json index.html --root-tag "main"
  python validate_agent_json.py agent-dialogs.json index.html --verbose --exit-on-error
        """
    )
    
    parser.add_argument(
        'json_file',
        help='Agent-JSON-Datei zum Validieren'
    )
    
    parser.add_argument(
        'html_file', 
        help='HTML-Datei mit Element-Referenzen'
    )
    
    parser.add_argument(
        '--schema', '-s',
        help='JSON-Schema-Datei (optional, wird automatisch gesucht)'
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
        help='CSS-Selector für Wurzelelement (optional). HTML-Validierung erfolgt nur innerhalb dieses Elements.'
    )
    
    args = parser.parse_args()
    
    # Dateipfade
    json_file = Path(args.json_file)
    html_file = Path(args.html_file)
    
    if not json_file.exists():
        print(f"❌ JSON-Datei nicht gefunden: {json_file}")
        sys.exit(1)
    
    if not html_file.exists():
        print(f"❌ HTML-Datei nicht gefunden: {html_file}")
        sys.exit(1)
    
    # Schema-Datei
    schema_file = None
    if args.schema:
        schema_file = Path(args.schema)
        if not schema_file.exists():
            print(f"⚠️  Schema-Datei nicht gefunden: {schema_file}")
    else:
        schema_file = find_schema_file(json_file)
        if schema_file and args.verbose:
            print(f"📋 Auto-detected Schema: {schema_file}")
    
    print(f"\n🔍 Validiere: {json_file.name} gegen {html_file.name}")
    
    # Validierung durchführen
    validator = AgentJSONValidator(
        json_file, 
        html_file, 
        schema_file, 
        verbose=args.verbose,
        root_selector=args.root_tag
    )
    summary = validator.validate_all()
    
    # Ergebnisse ausgeben
    print_results(summary, verbose=args.verbose, root_selector=args.root_tag)
    
    # Exit-Code setzen
    if args.exit_on_error and not summary.is_valid:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()
