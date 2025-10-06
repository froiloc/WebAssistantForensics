#!/usr/bin/env python3
"""
Robust Main Content Validator with User-Friendly Error Messages
Combines proven selector generation with comprehensive validation
"""

import json
import sys
import re
from pathlib import Path
from bs4 import BeautifulSoup
from jsonschema import validate, ValidationError

class CSSSelectorGenerator:
    """CSS selector generator based on the proven approach from validate_media.py"""

    @staticmethod
    def _generate_css_selector(element):
        """Generate CSS selector for an element based on your working implementation"""
        if not element or not hasattr(element, 'name'):
            return "unknown-element"

        # Start with the element name
        selector_parts = [element.name]

        # Add ID if available (most specific selector)
        if element.get('id'):
            selector_parts.append(f"#{element['id']}")
            return ' > '.join(selector_parts)

        # Add classes if available
        classes = element.get('class', [])
        if classes and all(isinstance(cls, str) for cls in classes):  # ✅ FIX: Check for valid classes
            class_selector = '.'.join([element.name] + classes)
            selector_parts = [class_selector]

        # Build the full selector
        selector = ' > '.join(selector_parts)

        # Add parent context for additional specificity
        parent = element.parent
        if (parent and hasattr(parent, 'name') and
            parent.name not in ['[document]', 'html', 'body', 'main']):

            parent_selector = CSSSelectorGenerator._generate_css_selector(parent)
            if parent_selector != "unknown-element":
                selector = f"{parent_selector} > {selector}"

        return selector

    @staticmethod
    def generate_selector(element):
        """Public method to generate selector rooted at main element"""
        base_selector = CSSSelectorGenerator._generate_css_selector(element)

        # Ensure the selector is rooted at the main element
        if base_selector.startswith('main'):
            return base_selector
        else:
            return f"main > {base_selector}"

class RobustMainContentParser:
    def __init__(self, html_content):
        self.soup = BeautifulSoup(html_content, 'html.parser')
        self.extracted_data = {
            "metadata": self._extract_metadata(),
            "sections": self._extract_sections_robust()
        }

    def _extract_metadata(self):
        """Extract basic document metadata"""
        return {
            "title": self._get_text_or_default(self.soup.find('title'), "WebAssistentForensics"),
            "language": self.soup.find('html').get('lang', 'de') if self.soup.find('html') else 'de'
        }

    def _get_text_or_default(self, element, default=""):
        """Safely extract text from element with fallback"""
        return element.get_text().strip() if element else default

    def _extract_sections_robust(self):
        """Robust section extraction that handles various HTML structures"""
        main_content = self.soup.find('main')
        if not main_content:
            return []

        sections = []
        headings = main_content.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

        for i, heading in enumerate(headings):
            section = {
                "id": heading.get('id', f"section-{i+1}"),
                "title": heading.get_text().strip(),
                "ariaLabel": heading.get('aria-label', ''),
                "level": int(heading.name[1]),
                "content": self._extract_heading_content_robust(heading, headings[i+1] if i+1 < len(headings) else None)
            }
            sections.append(section)

        return sections

    def _extract_heading_content_robust(self, heading, next_heading):
        """Extract content between this heading and the next heading"""
        content_blocks = []
        current = heading.next_sibling

        while current and current != next_heading:
            if hasattr(current, 'name') and current.name in ['p', 'div', 'ul', 'ol', 'section', 'article']:
                content_block = self._parse_content_element_robust(current)
                if content_block:
                    content_blocks.append(content_block)
            current = current.next_sibling if hasattr(current, 'next_sibling') else None

        return content_blocks

    def _parse_content_element_robust(self, element):
        """Robust content element parsing that handles various structures"""
        try:
            # Skip elements with no meaningful content
            text_content = element.get_text().strip()
            if not text_content:
                return None  # Skip empty elements

            element_type = self._determine_element_type(element)

            if element_type == 'detail-level':
                detail_level = self._extract_detail_level(element)
                return {
                    "type": "detail-level",
                    "level": detail_level,
                    "content": text_content,
                    "children": self._parse_child_elements_robust(element)
                }
            elif element_type == 'text':
                return {
                    "type": "text",
                    "content": text_content
                }
            elif element_type == 'list':
                items = [li.get_text().strip() for li in element.find_all('li')]
                # Skip empty lists
                if not any(items):
                    return None
                return {
                    "type": "list",
                    "listType": element.name,
                    "items": items
                }
        except Exception as e:
            return None

        return None

    def _determine_element_type(self, element):
        """Determine the type of content element"""
        if not hasattr(element, 'get'):
            return 'unknown'

        classes = element.get('class', [])
        # ✅ FIX: Handle None classes and ensure they're strings
        if classes and any(cls for cls in classes if cls and 'detail-level' in str(cls)):
            return 'detail-level'
        elif element.name == 'p':
            return 'text'
        elif element.name in ['ul', 'ol']:
            return 'list'
        else:
            return 'text'  # Default fallback

    def _extract_detail_level(self, element):
        """Extract detail level from element classes"""
        classes = element.get('class', [])
        for cls in classes:
            if cls and 'detail-level-' in str(cls):  # ✅ FIX: Ensure cls is string
                try:
                    return int(str(cls).split('-')[-1])
                except (ValueError, IndexError):
                    continue
        return 1  # Default level

    def _parse_child_elements_robust(self, parent_element):
        """Parse child elements with error handling"""
        children = []
        for child in parent_element.find_all(recursive=False):
            child_data = self._parse_content_element_robust(child)
            if child_data:
                children.append(child_data)
        return children

class UserFriendlyValidator:
    """Provides user-friendly error messages with precise CSS selectors"""

    def __init__(self, schema_path):
        with open(schema_path, 'r', encoding='utf-8') as f:
            self.schema = json.load(f)

    def validate_with_friendly_messages(self, extracted_data, html_content):
        """Validate data and return user-friendly error messages with precise CSS paths"""
        try:
            # Create clean copy for validation
            clean_data = self._prepare_for_validation(extracted_data)
            validate(instance=clean_data, schema=self.schema)
            return True, []
        except ValidationError as e:
            # Parse HTML to generate precise CSS selectors
            soup = BeautifulSoup(html_content, 'html.parser')
            friendly_message = self._create_friendly_error(e, extracted_data, soup)
            return False, [friendly_message]

    def _prepare_for_validation(self, extracted_data):
        """Create a JSON-serializable copy of the data"""
        return json.loads(json.dumps(extracted_data, default=str))

    def _extract_section_index(self, error_path):
        """Extract section index from error path"""
        if not error_path:
            return None
        path_parts = list(error_path)
        if len(path_parts) >= 2 and path_parts[0] == 'sections' and isinstance(path_parts[1], int):
            return path_parts[1]
        return None

    def _get_precise_css_selector(self, error_path, extracted_data, soup):
        """Generate precise CSS selector for the problematic element"""
        if not error_path:
            return "main"

        path_parts = list(error_path)

        try:
            # Handle section-level errors
            if len(path_parts) >= 2 and path_parts[0] == 'sections' and isinstance(path_parts[1], int):
                section_index = path_parts[1]
                if section_index < len(extracted_data['sections']):
                    section_title = extracted_data['sections'][section_index].get('title', '')
                    # Find the actual heading element in the DOM
                    headings = soup.select('main h1, main h2, main h3, main h4, main h5, main h6')
                    matching_headings = [h for h in headings if h.get_text().strip() == section_title]

                    if section_index < len(matching_headings):
                        return CSSSelectorGenerator.generate_selector(matching_headings[section_index])

        except (IndexError, KeyError, AttributeError) as e:
            print(f"Debug: Error generating CSS selector: {e}")  # ✅ DEBUG

        return "main"

    def _create_friendly_error(self, validation_error, extracted_data, soup):
        """Create user-friendly error with precise CSS selector"""
        error_path = " → ".join(str(p) for p in validation_error.path) if validation_error.path else "Dokumentstruktur"

        # Generate precise CSS selector based on error type
        css_selector = self._get_precise_css_selector(validation_error.path, extracted_data, soup)

        if "minLength" in str(validation_error.validator):
            if "id" in error_path:
                section_index = self._extract_section_index(validation_error.path)
                return self._create_missing_id_error(section_index, extracted_data, css_selector)
            elif "ariaLabel" in error_path:
                return self._create_missing_aria_label_error(validation_error.path, extracted_data, css_selector)

        elif "required" in str(validation_error.validator):
            return self._create_missing_required_field_error(validation_error, extracted_data, css_selector)

        # Generic error with precise CSS selector
        return (
            f"❌ STRUKTURELLER VALIDIERUNGSFEHLER\n"
            f"   Ort: {error_path}\n"
            f"   CSS-Pfad: {css_selector}\n"
            f"   Problem: {validation_error.message}\n"
            f"   Lösung: Überprüfen Sie das Element mit dem CSS-Selektor im Browser-Entwicklertool"
        )

    def _create_missing_id_error(self, section_index, extracted_data, css_selector):
        """Create error for missing section ID with precise CSS selector"""
        if section_index is not None and section_index < len(extracted_data.get('sections', [])):
            section = extracted_data['sections'][section_index]
            return (
                f"❌ FEHLENDE SEKTIONS-ID (BFSG-Konformität gefährdet)\n"
                f"   Sektion: '{section.get('title', 'Unbenannte Sektion')}' (Position {section_index + 1})\n"
                f"   Präziser CSS-Pfad: {css_selector}\n"
                f"   Problem: Die Sektion hat keine eindeutige ID\n"
                f"   Lösung: Fügen Sie ein 'id'-Attribut zum Element hinzu\n"
                f"   Beispiel: <h2 id=\"section-meine-sektion\">Meine Sektion</h2>\n"
                f"   Aktuelles Element: {css_selector}"
            )
        return "❌ FEHLENDE SEKTIONS-ID: Eine Sektion benötigt eine eindeutige ID"

    def _create_missing_aria_label_error(self, error_path, extracted_data, css_selector):
        """Create error for missing aria-label with precise CSS selector"""
        section_index = self._extract_section_index(error_path)

        if section_index is not None:
            section = extracted_data['sections'][section_index]
            element_type = "Sektion" if "ariaLabel" in str(error_path) and "content" not in str(error_path) else "Inhaltselement"

            return (
                f"❌ FEHLENDES ARIA-LABEL (BFSG-Verstoß)\n"
                f"   {element_type}: '{section.get('title', 'Unbenannt')}'\n"
                f"   Präziser CSS-Pfad: {css_selector}\n"
                f"   Problem: Fehlendes aria-label für Barrierefreiheit\n"
                f"   Lösung: Fügen Sie aria-label=\"Beschreibung\" zum Element hinzu\n"
                f"   Beispiel: <h2 aria-label=\"Schritt-für-Schritt Anleitung\">...</h2>\n"
                f"   Aktuelles Element: {css_selector}"
            )
        return "❌ FEHLENDES ARIA-LABEL: Element benötigt aria-label für Barrierefreiheit"

    def _create_missing_required_field_error(self, validation_error, extracted_data, css_selector):
        """Create error for missing required fields"""
        missing_field = validation_error.validator_value[0] if validation_error.validator_value else "Unbekannt"

        return (
            f"❌ FEHLENDES PFLICHTFELD\n"
            f"   Feld: '{missing_field}'\n"
            f"   CSS-Pfad: {css_selector}\n"
            f"   Problem: Strukturelles Element ist unvollständig\n"
            f"   Lösung: Stellen Sie sicher, dass '{missing_field}' in allen Elementen vorhanden ist\n"
            f"   Überprüfen Sie die JSON-Struktur gegen das Schema"
        )

    def validate_accessibility(self, extracted_data, html_content):
        """Comprehensive BFSG accessibility validation with user-friendly messages and CSS selectors"""
        issues = []
        soup = BeautifulSoup(html_content, 'html.parser')

        for i, section in enumerate(extracted_data.get('sections', [])):
            # Find the actual section element for CSS selector
            section_selector = self._find_section_selector(section, soup, i)

            # Check section aria-label
            if not section.get('ariaLabel'):
                issues.append(
                    f"❌ FEHLENDES ARIA-LABEL IN SEKTION (BFSG)\n"
                    f"   Sektion: '{section.get('title', 'Unbenannt')}' (Position {i + 1})\n"
                    f"   Präziser CSS-Pfad: {section_selector}\n"
                    f"   Problem: Überschrift hat kein aria-label\n"
                    f"   Auswirkung: Screenreader können den Sektionszweck nicht vermitteln\n"
                    f"   Lösung: Fügen Sie aria-label zur <h1>-<h6> Überschrift hinzu\n"
                    f"   Beispiel: <h2 aria-label=\"Schritt-für-Schritt Anleitung zur Beweissicherung\">...</h2>"
                )

            # Check content accessibility
            for j, content_block in enumerate(section.get('content', [])):
                block_issues = self._validate_content_accessibility(content_block, section, j, soup, section_selector)
                issues.extend(block_issues)

        return len(issues) == 0, issues

    def _find_section_selector(self, section, soup, section_index):
        """Find CSS selector for a section"""
        headings = soup.select('main h1, main h2, main h3, main h4, main h5, main h6')
        matching_headings = [h for h in headings if h.get_text().strip() == section.get('title', '')]

        if section_index < len(matching_headings):
            return CSSSelectorGenerator.generate_selector(matching_headings[section_index])
        return "main"

    def _validate_content_accessibility(self, content_block, section, block_index, soup, parent_selector):
        """Validate accessibility of individual content blocks with CSS selectors"""
        issues = []

        # Simplified content block validation - in practice you'd locate the actual element
        if content_block.get('type') in ['text', 'list']:
            accessibility = content_block.get('accessibility', {})
            if not accessibility.get('ariaLabel'):
                content_preview = content_block.get('content', '')[:60] + "..." if len(content_block.get('content', '')) > 60 else content_block.get('content', '')
                element_type = "Absatz" if content_block.get('type') == 'text' else "Liste"

                # Estimate CSS selector for content block
                content_selector = f"{parent_selector} + *"  # Simplified

                issues.append(
                    f"❌ FEHLENDES ARIA-LABEL IN {element_type.upper()} (BFSG)\n"
                    f"   Ort: {section.get('title')} → {element_type} {block_index + 1}\n"
                    f"   CSS-Pfad: {content_selector}\n"
                    f"   Vorschau: '{content_preview}'\n"
                    f"   Problem: {element_type} hat keine Bildschirmleser-Beschreibung\n"
                    f"   Lösung: Fügen Sie aria-label zum entsprechenden Tag hinzu\n"
                    f"   Beispiel: <p aria-label=\"Erklärung des forensischen Analyseprozesses\">...</p>"
                )

        elif content_block.get('type') == 'detail-level':
            if not content_block.get('ariaLabel'):
                content_preview = content_block.get('content', '')[:60] + "..." if len(content_block.get('content', '')) > 60 else content_block.get('content', '')
                detail_selector = f"{parent_selector} > .detail-level-{content_block.get('level', 1)}"

                issues.append(
                    f"❌ FEHLENDES ARIA-LABEL IN DETAILBEREICH (BFSG)\n"
                    f"   Ort: {section.get('title')} → Detail-Level {content_block.get('level')}\n"
                    f"   CSS-Pfad: {detail_selector}\n"
                    f"   Vorschau: '{content_preview}'\n"
                    f"   Problem: Detailbereich hat keine Zugänglichkeits-Beschreibung\n"
                    f"   Lösung: Fügen Sie aria-label zum Detail-<div> hinzu\n"
                    f"   Beispiel: <div class=\"detail-level-{content_block.get('level')}\" aria-label=\"Technische Details zur Beweissicherung\">...</div>"
                )

            # Validate children
            for k, child in enumerate(content_block.get('children', [])):
                child_issues = self._validate_content_accessibility(child, section, k, soup, parent_selector)
                issues.extend(child_issues)

        return issues

class EnhancedCSSSelectorGenerator:
    """Enhanced CSS selector generator that provides precise, full-path selectors"""

    @staticmethod
    def generate_precise_selector(element):
        """Generate full CSS selector path from main to target element"""
        if not element or not hasattr(element, 'name'):
            return "main"

        path_parts = []
        current = element

        # Build path from element up to main
        while current and hasattr(current, 'name'):
            if current.name == 'main':
                break

            selector_part = EnhancedCSSSelectorGenerator._get_element_selector(current)
            path_parts.insert(0, selector_part)

            current = current.parent
            if not current or current.name in ['html', 'body', '[document]']:
                break

        # Always start with main
        full_selector = "main > " + " > ".join(path_parts) if path_parts else "main"
        return full_selector

    @staticmethod
    def _get_element_selector(element):
        """Generate selector for a single element with maximum specificity"""
        # Start with element name
        selector = element.name

        # Add ID if available (most specific)
        if element.get('id'):
            return f"#{element['id']}"

        # Add classes if available
        classes = [cls for cls in element.get('class', []) if cls and isinstance(cls, str)]
        if classes:
            selector += '.' + '.'.join(classes)

        # If no ID or classes, use nth-child for precise positioning
        if not element.get('id') and not classes:
            parent = element.parent
            if parent and hasattr(parent, 'find_all'):
                # Count same-type siblings
                siblings = [sib for sib in parent.find_all(element.name, recursive=False)
                           if sib.name == element.name]
                if len(siblings) > 1:
                    try:
                        index = siblings.index(element) + 1
                        selector += f":nth-of-type({index})"
                    except ValueError:
                        # Fallback to simple selector
                        pass

        return selector

class EnhancedUserFriendlyValidator(UserFriendlyValidator):
    """Enhanced validator with precise CSS selector generation"""

    def _get_precise_css_selector(self, error_path, extracted_data, soup):
        """Generate precise CSS selector for the problematic element"""
        if not error_path:
            return "main"

        path_parts = list(error_path)

        try:
            # Handle section-level errors
            if len(path_parts) >= 2 and path_parts[0] == 'sections' and isinstance(path_parts[1], int):
                section_index = path_parts[1]
                if section_index < len(extracted_data['sections']):
                    section_title = extracted_data['sections'][section_index].get('title', '')

                    # Find ALL heading elements and match by title and position
                    headings = soup.select('main h1, main h2, main h3, main h4, main h5, main h6')

                    # Find heading by title and index position
                    found_headings = []
                    for heading in headings:
                        if heading.get_text().strip() == section_title:
                            found_headings.append(heading)

                    if section_index < len(found_headings):
                        return EnhancedCSSSelectorGenerator.generate_precise_selector(found_headings[section_index])

                    # Fallback: find by position in main
                    if headings and section_index < len(headings):
                        return EnhancedCSSSelectorGenerator.generate_precise_selector(headings[section_index])

        except (IndexError, KeyError, AttributeError) as e:
            print(f"Debug: Error in CSS selector generation: {e}")

        return "main"

    def _find_content_element_selector(self, section_title, content_index, soup):
        """Find precise CSS selector for content elements within a section"""
        # Find the section heading first
        headings = soup.select('main h1, main h2, main h3, main h4, main h5, main h6')
        section_heading = None

        for heading in headings:
            if heading.get_text().strip() == section_title:
                section_heading = heading
                break

        if not section_heading:
            return "main"

        # Find content elements between this heading and next heading
        content_elements = []
        current = section_heading.next_sibling

        while current and (not hasattr(current, 'name') or
                          current.name not in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
            if hasattr(current, 'name') and current.name in ['p', 'div', 'ul', 'ol']:
                content_elements.append(current)
            current = getattr(current, 'next_sibling', None)

        if content_index < len(content_elements):
            return EnhancedCSSSelectorGenerator.generate_precise_selector(content_elements[content_index])

        return EnhancedCSSSelectorGenerator.generate_precise_selector(section_heading)

    def validate_accessibility(self, extracted_data, html_content):
        """Enhanced accessibility validation with precise CSS selectors"""
        issues = []
        soup = BeautifulSoup(html_content, 'html.parser')

        for i, section in enumerate(extracted_data.get('sections', [])):
            # Find precise selector for section heading
            section_selector = self._get_precise_css_selector(['sections', i], extracted_data, soup)

            # Check section aria-label
            if not section.get('ariaLabel'):
                issues.append(
                    f"❌ FEHLENDES ARIA-LABEL IN SEKTION (BFSG)\n"
                    f"   Sektion: '{section.get('title', 'Unbenannt')}' (Position {i + 1})\n"
                    f"   Präziser CSS-Pfad: {section_selector}\n"
                    f"   Problem: Überschrift hat kein aria-label\n"
                    f"   Lösung: Fügen Sie aria-label=\"Beschreibung dieser Sektion\" hinzu\n"
                    f"   Beispiel: <h2 aria-label=\"Schritt-für-Schritt Anleitung zur Beweissicherung\">...</h2>"
                )

            # Check content accessibility with precise selectors
            for j, content_block in enumerate(section.get('content', [])):
                content_selector = self._find_content_element_selector(
                    section.get('title', ''), j, soup
                )
                block_issues = self._validate_content_accessibility(
                    content_block, section, j, content_selector
                )
                issues.extend(block_issues)

        return len(issues) == 0, issues

    def _validate_content_accessibility(self, content_block, section, block_index, css_selector):
        """Validate content blocks with precise CSS selectors"""
        issues = []

        if content_block.get('type') in ['text', 'list']:
            accessibility = content_block.get('accessibility', {})
            if not accessibility.get('ariaLabel'):
                content_preview = content_block.get('content', '')[:60] + "..." if len(content_block.get('content', '')) > 60 else content_block.get('content', '')
                element_type = "Absatz" if content_block.get('type') == 'text' else "Liste"

                issues.append(
                    f"❌ FEHLENDES ARIA-LABEL IN {element_type.upper()} (BFSG)\n"
                    f"   Ort: {section.get('title')} → {element_type} {block_index + 1}\n"
                    f"   Präziser CSS-Pfad: {css_selector}\n"
                    f"   Vorschau: '{content_preview}'\n"
                    f"   Problem: {element_type} hat keine Bildschirmleser-Beschreibung\n"
                    f"   Lösung: Fügen Sie aria-label=\"Beschreibung dieses {element_type.lower()}s\" hinzu\n"
                    f"   Beispiel: <p aria-label=\"Erklärung des forensischen Analyseprozesses\">...</p>"
                )

        elif content_block.get('type') == 'detail-level':
            if not content_block.get('ariaLabel'):
                content_preview = content_block.get('content', '')[:60] + "..." if len(content_block.get('content', '')) > 60 else content_block.get('content', '')

                issues.append(
                    f"❌ FEHLENDES ARIA-LABEL IN DETAILBEREICH (BFSG)\n"
                    f"   Ort: {section.get('title')} → Detail-Level {content_block.get('level')}\n"
                    f"   Präziser CSS-Pfad: {css_selector}\n"
                    f"   Vorschau: '{content_preview}'\n"
                    f"   Problem: Detailbereich hat keine Zugänglichkeits-Beschreibung\n"
                    f"   Lösung: Fügen Sie aria-label=\"Technische Details: Beschreibung\" hinzu\n"
                    f"   Beispiel: <div class=\"detail-level-{content_block.get('level')}\" aria-label=\"Technische Details zur Beweissicherung\">...</div>"
                )

            # Validate children with enhanced selectors
            for k, child in enumerate(content_block.get('children', [])):
                child_selector = f"{css_selector} > *:nth-child({k + 1})"
                child_issues = self._validate_content_accessibility(child, section, k, child_selector)
                issues.extend(child_issues)

        return issues

class SemanticAccessibilityValidator(EnhancedUserFriendlyValidator):
    """Focuses on semantic HTML and meaningful accessibility rather than ARIA overuse"""

    def __init__(self):
        # Don't call parent init since we don't need schema for semantic validation
        pass

    def validate_semantic_accessibility(self, extracted_data, html_content):
        """Validate meaningful accessibility requirements"""
        issues = []
        soup = BeautifulSoup(html_content, 'html.parser')

        for i, section in enumerate(extracted_data.get('sections', [])):
            section_selector = self._get_precise_css_selector(['sections', i], extracted_data, soup)

            # Check for proper heading structure instead of aria-label
            heading_issues = self._validate_heading_semantics(section, section_selector, soup)
            issues.extend(heading_issues)

            # Check content for proper semantic structure
            for j, content_block in enumerate(section.get('content', [])):
                content_selector = self._find_content_element_selector(
                    section.get('title', ''), j, soup
                )
                block_issues = self._validate_content_semantics(
                    content_block, section, j, content_selector, soup
                )
                issues.extend(block_issues)

        return len(issues) == 0, issues

    def _validate_heading_semantics(self, section, section_selector, soup):
        """Validate proper heading semantics with context awareness"""
        issues = []

        section_level = section.get('level', 2)

        # Only warn about heading hierarchy for top-level sections
        # Allow more flexibility for nested content in detail levels
        if section_level > 2:
            # Check if this is a nested section in a detail level
            is_nested = "detail-level" in section_selector

            if not is_nested and section_level > 2:
                issues.append(
                    f"⚠️  ÜBERPRÜFEN SIE DIE ÜBERSCHRIFTENHIERARCHIE\n"
                    f"   Sektion: '{section.get('title', 'Unbenannt')}'\n"
                    f"   CSS-Pfad: {section_selector}\n"
                    f"   Aktuelles Level: H{section_level}\n"
                    f"   Problem: Hauptüberschriften sollten hierarchisch sein (H1 → H2 → H3)\n"
                    f"   Lösung: Stellen Sie sicher, dass keine Überschrift-Ebenen übersprungen werden"
                )

        return issues

    def _validate_content_semantics(self, content_block, section, block_index, css_selector, soup):
        """Validate semantic structure of content blocks"""
        issues = []

        if content_block.get('type') == 'list':
            # Check if lists are used semantically
            items = content_block.get('items', [])
            if len(items) == 0:
                issues.append(
                    f"⚠️  LEERE LISTE GEFUNDEN\n"
                    f"   Ort: {section.get('title')} → Liste {block_index + 1}\n"
                    f"   CSS-Pfad: {css_selector}\n"
                    f"   Problem: Liste enthält keine Einträge\n"
                    f"   Lösung: Entfernen Sie leere Listen oder fügen Sie Inhalte hinzu"
                )

        elif content_block.get('type') == 'interactive':
            # Only interactive elements require aria-label
            if not content_block.get('ariaLabel'):
                issues.append(
                    f"❌ FEHLENDES ARIA-LABEL FÜR INTERAKTIVES ELEMENT (BFSG)\n"
                    f"   Ort: {section.get('title')} → Interaktives Element {block_index + 1}\n"
                    f"   CSS-Pfad: {css_selector}\n"
                    f"   Problem: Interaktives Element benötigt Beschreibung\n"
                    f"   Lösung: Fügen Sie aria-label=\"Funktionsbeschreibung\" hinzu\n"
                    f"   Beispiel: <button aria-label=\"Dialog schließen\">X</button>"
                )

        elif content_block.get('type') == 'detail-level':
            # Check nested structure
            for k, child in enumerate(content_block.get('children', [])):
                child_selector = f"{css_selector} > *:nth-child({k + 1})"
                child_issues = self._validate_content_semantics(
                    child, section, k, child_selector, soup
                )
                issues.extend(child_issues)

        return issues

    def validate_critical_accessibility(self, extracted_data, html_content):
        """Validate only critical accessibility requirements for BFSG"""
        issues = []
        soup = BeautifulSoup(html_content, 'html.parser')

        # Check for page language
        html_tag = soup.find('html')
        if not html_tag or not html_tag.get('lang'):
            issues.append(
                f"❌ FEHLENDE SPRACHAUSZEICHNUNG (BFSG)\n"
                f"   Problem: HTML-Tag hat kein lang-Attribut\n"
                f"   Lösung: Fügen Sie lang=\"de\" zum <html> Tag hinzu\n"
                f"   Beispiel: <html lang=\"de\">"
            )

        # Check for page title
        title_tag = soup.find('title')
        if not title_tag or not title_tag.get_text().strip():
            issues.append(
                f"❌ FEHLENDER SEITENTITEL (BFSG)\n"
                f"   Problem: Die Seite hat keinen <title>\n"
                f"   Lösung: Fügen Sie einen beschreibenden Seitentitel hinzu\n"
                f"   Beispiel: <title>WebAssistent Forensics - Anleitung</title>"
            )

        # Check for main landmark
        main_tag = soup.find('main')
        if not main_tag:
            issues.append(
                f"❌ FEHLENDES MAIN-LANDMARK (BFSG)\n"
                f"   Problem: Die Seite hat kein <main> Element\n"
                f"   Lösung: Fügen Sie <main> um den Hauptinhalt hinzu\n"
                f"   Beispiel: <main role=\"main\">...</main>"
            )

        return len(issues) == 0, issues

def main():
    if len(sys.argv) != 2:
        print("Usage: python validate_main_content.py <path_to_index.html>")
        sys.exit(1)

    html_file = Path(sys.argv[1])
    schema_file = Path(__file__).parent.parent / ".." / "schema" / "main-content.schema.json"

    if not schema_file.exists():
        print(f"Error: Schema file {schema_file} not found")
        sys.exit(1)

    try:
        # Read and parse HTML
        print(f"🔍 Analysiere HTML-Struktur: {html_file}")
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()

        parser = RobustMainContentParser(html_content)
        extracted_data = parser.extracted_data

        print(f"📊 Gefunden: {len(extracted_data['sections'])} Sektionen im Hauptinhalt")

        # Validate structure
        validator = UserFriendlyValidator(schema_file)
        structure_valid, structure_issues = validator.validate_with_friendly_messages(extracted_data, html_content)

        # Validate meaningful accessibility
        semantic_validator = SemanticAccessibilityValidator()
        critical_valid, critical_issues = semantic_validator.validate_critical_accessibility(extracted_data, html_content)
        semantic_valid, semantic_issues = semantic_validator.validate_semantic_accessibility(extracted_data, html_content)

        # Combine all issues
        all_issues = structure_issues + critical_issues + semantic_issues

        if not all_issues:
            print("✅ Validierung erfolgreich abgeschlossen!")
            print("   ✓ Dokumentstruktur entspricht dem Schema")
            print("   ✓ Kritische Barrierefreiheits-Anforderungen erfüllt (BFSG konform)")
            print("   ✓ Semantische HTML-Struktur ist korrekt")
            return 0
        else:
            print(f"🔍 Validierungsergebnis: {len(all_issues)} Hinweis(e) gefunden\n")

            # Group issues by priority
            critical_problems = [issue for issue in all_issues if "❌" in issue]
            warning_problems = [issue for issue in all_issues if "⚠️" in issue]
            structure_problems = [issue for issue in all_issues if "❌" not in issue and "⚠️" not in issue]

            if critical_problems:
                print("KRITISCHE PROBLEME (BFSG-Konformität):")
                for issue in critical_problems:
                    print(f"\n{issue}")

            if warning_problems:
                print("\nEMPFEHLUNGEN ZUR VERBESSERUNG:")
                for issue in warning_problems:
                    print(f"\n{issue}")

            if structure_problems:
                print("\nSTRUKTURELLE HINWEISE:")
                for issue in structure_problems:
                    print(f"\n{issue}")

            print(f"\n💡 ZUSAMMENFASSUNG:")
            print(f"   Kritische Probleme: {len(critical_problems)}")
            print(f"   Verbesserungsempfehlungen: {len(warning_problems)}")
            print(f"   Strukturhinweise: {len(structure_problems)}")
            print(f"   Gesamt: {len(all_issues)} zu berücksichtigende Punkte")

            print(f"\n🎯 BFSG-KONFORMITÄT:")
            if not critical_problems:
                print("   ✅ Keine kritischen BFSG-Verstöße gefunden")
            else:
                print(f"   ❌ {len(critical_problems)} kritische BFSG-Probleme müssen behoben werden")

            return 0 if not critical_problems else 1

    except Exception as e:
        print(f"❌ Kritischer Fehler während der Validierung: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    sys.exit(main())
