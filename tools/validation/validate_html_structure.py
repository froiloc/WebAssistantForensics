#!/usr/bin/env python3
"""
HTML Structure Validator für AXIOM Agent System

Validiert:
- ID-Eindeutigkeit (id-Attribute müssen eindeutig sein)
- data-ref Standard-Granularität (alle wichtigen Elemente haben data-ref)
- Orphan-Detection (kein Element ohne referenzierten Ancestor)
- CSS-Selector-Kompatibilität
- Agent-spezifische Element-Struktur

Autor: AXIOM Guide Development
Version: 1.0
"""

import argparse
import sys
import re
from pathlib import Path
from typing import Dict, List, Set, Optional, Tuple
from dataclasses import dataclass
from bs4 import BeautifulSoup, Tag
from collections import defaultdict, Counter


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
    
    def __init__(self, html_file: Path, verbose: bool = False):
        self.html_file = html_file
        self.verbose = verbose
        self.soup: Optional[BeautifulSoup] = None
        self.results: List[ValidationResult] = []
        
    def load_html(self) -> bool:
        """HTML-Datei laden und parsen"""
        try:
            with open(self.html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            self.soup = BeautifulSoup(content, 'html.parser')
            
            if self.verbose:
                print(f"✓ HTML-Datei erfolgreich geladen: {self.html_file}")
                print(f"  Gefundene Elemente: {len(self.soup.find_all())}")
            
            return True
            
        except FileNotFoundError:
            self._add_result(False, f"HTML-Datei nicht gefunden: {self.html_file}", severity="error")
            return False
        except Exception as e:
            self._add_result(False, f"Fehler beim Laden der HTML-Datei: {e}", severity="error")
            return False
    
    def validate_all(self) -> ValidationSummary:
        """Führt alle Validierungen durch"""
        if not self.load_html():
            return self._create_summary()
        
        # Alle Validierungen durchführen
        self._validate_id_uniqueness()
        self._validate_standard_granularity()
        self._validate_orphan_elements()
        self._validate_css_selector_compatibility()
        self._validate_agent_elements()
        self._validate_section_structure()
        
        return self._create_summary()
    
    def _validate_id_uniqueness(self) -> None:
        """Validiert Eindeutigkeit aller ID-Attribute"""
        if self.verbose:
            print("\n🔍 Validiere ID-Eindeutigkeit...")
        
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
                f"Alle {len(id_counter)} IDs sind eindeutig", 
                severity="info"
            )
    
    def _validate_standard_granularity(self) -> None:
        """Validiert ob alle Standard-Elemente data-ref haben"""
        if self.verbose:
            print("\n🔍 Validiere Standard-Granularität (data-ref)...")
        
        missing_data_ref = []
        
        for element_selector in self.STANDARD_ELEMENTS:
            if '.' in element_selector:
                tag, class_name = element_selector.split('.', 1)
                elements = self.soup.find_all(tag, class_=class_name)
            else:
                elements = self.soup.find_all(element_selector)
            
            for element in elements:
                if not element.get('data-ref') and not element.get('id'):
                    missing_data_ref.append((element, element_selector))
        
        if missing_data_ref:
            for element, selector in missing_data_ref[:10]:  # Limite auf erste 10
                self._add_result(
                    False,
                    f"Element '{selector}' sollte data-ref oder id haben (Standard-Granularität)",
                    element_info=self._get_element_info(element),
                    severity="warning"
                )
            
            if len(missing_data_ref) > 10:
                self._add_result(
                    False,
                    f"... und {len(missing_data_ref) - 10} weitere Elemente ohne data-ref",
                    severity="warning"
                )
        else:
            if self.verbose:
                print("  ✓ Alle Standard-Elemente haben data-ref oder id")
            self._add_result(True, "Standard-Granularität erfüllt", severity="info")
    
    def _validate_orphan_elements(self) -> None:
        """Validiert ob alle Elemente referenzierte Ancestors haben"""
        if self.verbose:
            print("\n🔍 Validiere Orphan-Elemente...")
        
        all_elements = self.soup.find_all()
        orphans = []
        
        for element in all_elements:
            # Skip bestimmte Elemente die naturgemäß keine Referenz brauchen
            if element.name in ['html', 'head', 'body', 'title', 'meta', 'link', 'script', 'style']:
                continue
            
            # Skip Text-Knoten und Kommentare
            if not isinstance(element, Tag):
                continue
            
            # Hat das Element selbst eine Referenz?
            if element.get('data-ref') or element.get('id'):
                continue
            
            # Hat es einen Ancestor mit Referenz?
            has_referenced_ancestor = False
            for parent in element.parents:
                if not isinstance(parent, Tag):
                    continue
                if parent.get('data-ref') or parent.get('id'):
                    has_referenced_ancestor = True
                    break
            
            if not has_referenced_ancestor:
                orphans.append(element)
        
        # Filtern: Nur "wichtige" Orphans melden (nicht jeden span/i/b)
        important_orphans = [
            el for el in orphans 
            if el.name not in ['i', 'b', 'strong', 'em', 'span', 'br', 'a'] or 
               'agent' in ' '.join(el.get('class', []))
        ]
        
        if important_orphans:
            for orphan in important_orphans[:5]:  # Erste 5 zeigen
                self._add_result(
                    False,
                    f"Orphan-Element ohne referenzierten Ancestor gefunden",
                    element_info=self._get_element_info(orphan),
                    severity="warning"
                )
            
            if len(important_orphans) > 5:
                self._add_result(
                    False,
                    f"... und {len(important_orphans) - 5} weitere Orphan-Elemente",
                    severity="warning"
                )
        else:
            if self.verbose:
                print("  ✓ Keine problematischen Orphan-Elemente gefunden")
            self._add_result(True, "Keine Orphan-Elemente", severity="info")
    
    def _validate_css_selector_compatibility(self) -> None:
        """Validiert CSS-Selector-Kompatibilität"""
        if self.verbose:
            print("\n🔍 Validiere CSS-Selector-Kompatibilität...")
        
        problems = []
        
        # Prüfe data-ref Attribute auf gültige CSS-Selector-Zeichen
        data_ref_elements = self.soup.find_all(attrs={'data-ref': True})
        
        for element in data_ref_elements:
            data_ref = element.get('data-ref')
            
            # CSS-Selector-kompatible Zeichen: a-zA-Z0-9_-
            if not re.match(r'^[a-zA-Z][a-zA-Z0-9_-]*$', data_ref):
                problems.append((element, f"data-ref='{data-ref}' enthält ungültige Zeichen"))
        
        # Prüfe ID-Attribute
        id_elements = self.soup.find_all(id=True)
        
        for element in id_elements:
            element_id = element.get('id')
            
            # CSS-ID-kompatible Zeichen
            if not re.match(r'^[a-zA-Z][a-zA-Z0-9_-]*$', element_id):
                problems.append((element, f"id='{element_id}' enthält ungültige Zeichen"))
        
        if problems:
            for element, problem in problems:
                self._add_result(
                    False,
                    f"CSS-Selector-Problem: {problem}",
                    element_info=self._get_element_info(element),
                    severity="error"
                )
        else:
            if self.verbose:
                print(f"  ✓ Alle {len(data_ref_elements + id_elements)} Selektoren sind CSS-kompatibel")
            self._add_result(True, "Alle Selektoren sind CSS-kompatibel", severity="info")
    
    def _validate_agent_elements(self) -> None:
        """Validiert Agent-spezifische Elemente"""
        if self.verbose:
            print("\n🔍 Validiere Agent-Elemente...")
        
        # Context-Blöcke prüfen
        context_blocks = self.soup.find_all(class_='agent-context-block')
        inline_triggers = self.soup.find_all(class_='agent-inline-trigger')
        
        problems = []
        
        # Context-Blöcke müssen data-ref haben
        for block in context_blocks:
            if not block.get('data-ref'):
                problems.append((block, "agent-context-block ohne data-ref"))
        
        # Inline-Triggers müssen data-agent-context haben
        for trigger in inline_triggers:
            if not trigger.get('data-agent-context'):
                problems.append((trigger, "agent-inline-trigger ohne data-agent-context"))
        
        if problems:
            for element, problem in problems:
                self._add_result(
                    False,
                    f"Agent-Element-Problem: {problem}",
                    element_info=self._get_element_info(element),
                    severity="error"
                )
        else:
            total_agent_elements = len(context_blocks) + len(inline_triggers)
            if self.verbose:
                print(f"  ✓ Alle {total_agent_elements} Agent-Elemente korrekt konfiguriert")
            if total_agent_elements > 0:
                self._add_result(
                    True, 
                    f"Alle {total_agent_elements} Agent-Elemente korrekt", 
                    severity="info"
                )
    
    def _validate_section_structure(self) -> None:
        """Validiert Section-Struktur für Agent-System"""
        if self.verbose:
            print("\n🔍 Validiere Section-Struktur...")
        
        sections = self.soup.find_all('section', class_='content-section')
        problems = []
        
        for section in sections:
            # Jede Section braucht id und data-section
            if not section.get('id'):
                problems.append((section, "content-section ohne id"))
            
            if not section.get('data-section'):
                problems.append((section, "content-section ohne data-section"))
            
            # data-title für Navigation empfohlen
            if not section.get('data-title'):
                problems.append((section, "content-section ohne data-title (empfohlen)"))
        
        if problems:
            for element, problem in problems:
                severity = "warning" if "empfohlen" in problem else "error"
                self._add_result(
                    False,
                    f"Section-Problem: {problem}",
                    element_info=self._get_element_info(element),
                    severity=severity
                )
        else:
            if self.verbose:
                print(f"  ✓ Alle {len(sections)} Sections korrekt strukturiert")
            self._add_result(True, f"Alle {len(sections)} Sections korrekt", severity="info")
    
    def _get_element_info(self, element: Tag) -> str:
        """Erstellt eine beschreibende Info über ein Element"""
        info_parts = [f"<{element.name}"]
        
        if element.get('id'):
            info_parts.append(f"id='{element.get('id')}'")
        
        if element.get('class'):
            classes = ' '.join(element.get('class'))
            info_parts.append(f"class='{classes}'")
        
        if element.get('data-ref'):
            info_parts.append(f"data-ref='{element.get('data-ref')}'")
        
        info_parts.append(">")
        
        # Textinhalt hinzufügen (gekürzt)
        text = element.get_text(strip=True)
        if text:
            text = text[:50] + "..." if len(text) > 50 else text
            info_parts.append(f" Text: '{text}'")
        
        return " ".join(info_parts)
    
    def _add_result(self, is_valid: bool, message: str, element_info: str = None, severity: str = "error") -> None:
        """Fügt ein Validierungsergebnis hinzu"""
        result = ValidationResult(
            is_valid=is_valid,
            message=message,
            element_info=element_info,
            severity=severity
        )
        self.results.append(result)
    
    def _create_summary(self) -> ValidationSummary:
        """Erstellt Zusammenfassung aller Validierungen"""
        errors = sum(1 for r in self.results if r.severity == "error" and not r.is_valid)
        warnings = sum(1 for r in self.results if r.severity == "warning" and not r.is_valid)
        info = sum(1 for r in self.results if r.severity == "info")
        
        total_elements = len(self.soup.find_all()) if self.soup else 0
        
        return ValidationSummary(
            total_elements=total_elements,
            total_errors=errors,
            total_warnings=warnings,
            total_info=info,
            results=self.results
        )


def print_results(summary: ValidationSummary, verbose: bool = False) -> None:
    """Gibt Validierungsergebnisse formatiert aus"""
    
    # Header
    print("\n" + "="*80)
    print("🔍 HTML STRUCTURE VALIDATION RESULTS")
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
        print("   • Prüfen Sie doppelte IDs und korrigieren Sie diese")
        print("   • Stellen Sie sicher, dass Agent-Elemente korrekt konfiguriert sind")
    
    if summary.total_warnings > 0:
        print(f"\n⚠️  WARNUNGEN:")
        print("   • Warnings sollten überprüft werden")
        print("   • data-ref Attribute verbessern die Agent-Integration")
        print("   • Orphan-Elemente können Navigations-Probleme verursachen")


def main():
    """Haupt-Funktion für CLI"""
    parser = argparse.ArgumentParser(
        description="Validiert HTML-Struktur für AXIOM Agent System",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Beispiele:
  python validate_html_structure.py index.html
  python validate_html_structure.py index.html --verbose
  python validate_html_structure.py *.html --verbose --exit-on-error
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
    
    args = parser.parse_args()
    
    total_errors = 0
    total_warnings = 0
    
    for html_file in args.html_files:
        file_path = Path(html_file)
        
        if not file_path.exists():
            print(f"❌ Datei nicht gefunden: {html_file}")
            continue
        
        print(f"\n🔍 Validiere: {html_file}")
        
        validator = HTMLValidator(file_path, verbose=args.verbose)
        summary = validator.validate_all()
        
        print_results(summary, verbose=args.verbose)
        
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
