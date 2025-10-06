#!/usr/bin/env python3
"""
Agent Dialog Validator - Phase 2
Validates CSS selectors against index.html and provides fix suggestions
"""

import json
import os
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple
from bs4 import BeautifulSoup
import Levenshtein


class AgentDialogValidator:
    def __init__(self, base_dir: str = "."):
        self.base_dir = Path(base_dir).resolve()
        self.src_dir = self.base_dir / "../../src"
        self.json_file = self.src_dir / "agent-dialogs.json"
        self.html_file = self.src_dir / "index.html"

    def extract_paths_with_locations(self) -> List[Dict[str, Any]]:
        """Extract all targetSelectors with their JSON locations and line numbers."""
        if not self.json_file.exists():
            print(f"Error: JSON file not found at {self.json_file}")
            return []

        with open(self.json_file, 'r', encoding='utf-8') as f:
            content = f.read()
            try:
                data = json.loads(content)
            except json.JSONDecodeError as e:
                print(f"Error parsing JSON file: {e}")
                return []

        lines = content.split('\n')
        selector_entries = []

        def find_target_selectors(obj, current_path: str = "", depth: int = 0):
            if isinstance(obj, dict):
                if "targetSelectors" in obj and isinstance(obj["targetSelectors"], list):
                    for i, selector in enumerate(obj["targetSelectors"]):
                        if isinstance(selector, str) and selector.strip():
                            line_number = self._find_line_number(lines, current_path, selector.strip(), i)

                            selector_entries.append({
                                "selector": selector.strip(),
                                "json_path": f"{current_path}.targetSelectors[{i}]" if current_path else f"targetSelectors[{i}]",
                                "line_number": line_number,
                                "context": self._get_context(obj),
                                "selector_index": i
                            })

                for key, value in obj.items():
                    new_path = f"{current_path}.{key}" if current_path else key
                    find_target_selectors(value, new_path, depth + 1)

            elif isinstance(obj, list):
                for i, item in enumerate(obj):
                    new_path = f"{current_path}[{i}]"
                    find_target_selectors(item, new_path, depth + 1)

        find_target_selectors(data)
        return selector_entries

    def _find_line_number(self, lines: List[str], json_path: str, selector: str, selector_index: int) -> int:
        """Find the line number using exact selector matching."""
        clean_selector = selector.strip()

        for line_num, line in enumerate(lines, 1):
            if f'"{clean_selector}"' in line:
                return line_num

        for line_num, line in enumerate(lines, 1):
            if clean_selector in line:
                return line_num

        return -1

    def _get_context(self, obj: Dict) -> str:
        """Extract context about what these selectors are used for."""
        context_parts = []

        if obj.get("type"):
            context_parts.append(f"type: {obj['type']}")
        if obj.get("title"):
            context_parts.append(f"title: {obj['title']}")
        if obj.get("message"):
            msg = str(obj["message"])
            if len(msg) > 50:
                msg = msg[:50] + "..."
            context_parts.append(f"message: {msg}")

        return " | ".join(context_parts) if context_parts else "No context"

    def validate_selectors(self) -> List[Dict[str, Any]]:
        """Validate all selectors against the HTML file and provide suggestions."""
        selector_entries = self.extract_paths_with_locations()

        if not self.html_file.exists():
            print(f"Error: HTML file not found at {self.html_file}")
            return []

        with open(self.html_file, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')

        validation_results = []

        for entry in selector_entries:
            selector = entry["selector"]
            elements = soup.select(selector)

            if elements:
                # Selector is valid
                validation_results.append({
                    **entry,
                    "status": "VALID",
                    "element_count": len(elements),
                    "suggestions": []
                })
            else:
                # Selector is broken - find suggestions
                suggestions = self._find_selector_suggestions(selector, soup)
                validation_results.append({
                    **entry,
                    "status": "BROKEN",
                    "element_count": 0,
                    "suggestions": suggestions
                })

        return validation_results

    def _find_selector_suggestions(self, broken_selector: str, soup: BeautifulSoup) -> List[Dict[str, Any]]:
        """Find intelligent suggestions for broken selectors."""
        suggestions = []

        # Strategy 1: Cousin node search in same section
        cousin_suggestions = self._find_cousin_suggestions(broken_selector, soup)
        suggestions.extend(cousin_suggestions)

        # Strategy 2: Similar elements by attributes
        attribute_suggestions = self._find_attribute_suggestions(broken_selector, soup)
        suggestions.extend(attribute_suggestions)

        # Strategy 3: Structural similarity
        structure_suggestions = self._find_structural_suggestions(broken_selector, soup)
        suggestions.extend(structure_suggestions)

        # Remove duplicates and limit results
        unique_suggestions = []
        seen_selectors = set()

        for suggestion in suggestions:
            if suggestion["selector"] not in seen_selectors:
                unique_suggestions.append(suggestion)
                seen_selectors.add(suggestion["selector"])

        return sorted(unique_suggestions, key=lambda x: x["confidence"], reverse=True)[:5]  # Top 5

    def _find_cousin_suggestions(self, broken_selector: str, soup: BeautifulSoup) -> List[Dict[str, Any]]:
        """Find similar elements in the same section (cousin nodes)."""
        suggestions = []

        # Extract section from broken selector
        section_selector = self._extract_section_selector(broken_selector)
        if not section_selector:
            return suggestions

        # Get target element type from broken selector
        target_element = self._extract_target_element(broken_selector)

        # Find all elements of the same type in the section
        section_elements = soup.select(section_selector)
        if not section_elements:
            return suggestions

        section = section_elements[0]
        candidate_elements = section.find_all(target_element) if target_element else []

        for element in candidate_elements:
            # Generate selector for this candidate
            candidate_selector = self._generate_selector_from_section(section_selector, element)

            if candidate_selector != broken_selector:
                # Calculate similarity based on attributes and position
                similarity = self._calculate_element_similarity(broken_selector, candidate_selector, element)

                if similarity > 0.3:  # Minimum similarity threshold
                    suggestions.append({
                        "selector": candidate_selector,
                        "type": "COUSIN_NODE",
                        "confidence": similarity,
                        "reason": f"Similar {target_element} found in same section"
                    })

        return suggestions

    def _find_attribute_suggestions(self, broken_selector: str, soup: BeautifulSoup) -> List[Dict[str, Any]]:
        """Find elements with similar attributes using Levenshtein distance."""
        suggestions = []

        # Extract what we're looking for
        target_id = self._extract_id(broken_selector)
        target_classes = self._extract_classes(broken_selector)
        target_element = self._extract_target_element(broken_selector)

        # Search for elements with similar IDs
        if target_id:
            all_elements_with_ids = soup.find_all(attrs={"id": True})
            for element in all_elements_with_ids:
                element_id = element.get('id')
                similarity = Levenshtein.ratio(target_id, element_id)

                if similarity > 0.7:  # High similarity threshold for IDs
                    new_selector = f"#{element_id}"
                    if target_element:
                        new_selector = f"{target_element}{new_selector}"

                    suggestions.append({
                        "selector": new_selector,
                        "type": "SIMILAR_ID",
                        "confidence": similarity,
                        "reason": f"Found element with similar ID: {element_id}"
                    })

        # Search for elements with similar classes
        if target_classes:
            for target_class in target_classes:
                elements_with_class = soup.find_all(class_=lambda x: x and target_class in x.split())

                for element in elements_with_class:
                    element_classes = element.get('class', [])
                    best_class_similarity = max(
                        [Levenshtein.ratio(target_class, cls) for cls in element_classes],
                        default=0
                    )

                    if best_class_similarity > 0.8:
                        # Generate selector for this element
                        element_selector = self._generate_css_selector(element)
                        suggestions.append({
                            "selector": element_selector,
                            "type": "SIMILAR_CLASS",
                            "confidence": best_class_similarity,
                            "reason": f"Found element with similar class: {target_class}"
                        })

        return suggestions

    def _find_structural_suggestions(self, broken_selector: str, soup: BeautifulSoup) -> List[Dict[str, Any]]:
        """Find elements with similar DOM structure and context."""
        suggestions = []

        # This is a simplified version - in practice you'd analyze parent/child relationships
        # and structural patterns in the broken selector vs existing elements

        return suggestions

    def _extract_section_selector(self, selector: str) -> Optional[str]:
        """Extract the section part of a selector (e.g., #section-workflow)."""
        if ' ' in selector:
            return selector.split(' ')[0]
        return None

    def _extract_target_element(self, selector: str) -> Optional[str]:
        """Extract the target element type from a selector."""
        parts = selector.split(' ')
        if parts:
            last_part = parts[-1]
            if not last_part.startswith(('.', '#')):
                return last_part
        return None

    def _extract_id(self, selector: str) -> Optional[str]:
        """Extract ID from selector."""
        if '#' in selector:
            parts = selector.split('#')
            if len(parts) > 1:
                id_part = parts[1].split('.')[0].split(' ')[0]
                return id_part
        return None

    def _extract_classes(self, selector: str) -> List[str]:
        """Extract classes from selector."""
        classes = []
        parts = selector.split('.')
        for part in parts[1:]:  # Skip first part (element or ID)
            class_name = part.split(' ')[0].split(':')[0]
            if class_name and not class_name.startswith('#'):
                classes.append(class_name)
        return classes

    def _generate_selector_from_section(self, section_selector: str, element) -> str:
        """Generate CSS selector from section to element."""
        # Simplified version - in practice you'd use the algorithm we developed earlier
        element_selector = self._generate_css_selector(element)
        return f"{section_selector} {element_selector}"

    def _generate_css_selector(self, element) -> str:
        """Generate CSS selector for an element (simplified version)."""
        if element.get('id'):
            return f"#{element.get('id')}"

        selector = element.name
        classes = element.get('class', [])
        if classes:
            selector += '.' + '.'.join(classes)

        return selector

    def _calculate_element_similarity(self, original_selector: str, candidate_selector: str, element) -> float:
        """Calculate similarity between original selector and candidate."""
        similarity = 0.0

        # Compare target element types
        original_element = self._extract_target_element(original_selector)
        candidate_element = element.name
        if original_element == candidate_element:
            similarity += 0.3

        # Compare classes
        original_classes = set(self._extract_classes(original_selector))
        candidate_classes = set(element.get('class', []))
        if original_classes and candidate_classes:
            class_overlap = len(original_classes & candidate_classes) / len(original_classes | candidate_classes)
            similarity += class_overlap * 0.4

        # Compare structure length (penalize very different depths)
        original_depth = original_selector.count(' ')
        candidate_depth = candidate_selector.count(' ')
        depth_similarity = 1.0 - abs(original_depth - candidate_depth) / max(original_depth, 1)
        similarity += depth_similarity * 0.3

        return min(similarity, 1.0)

    def generate_validation_report(self) -> str:
        """Generate a comprehensive validation report."""
        validation_results = self.validate_selectors()

        if not validation_results:
            return "No selectors found to validate."

        # Count statistics
        valid_count = sum(1 for r in validation_results if r["status"] == "VALID")
        broken_count = sum(1 for r in validation_results if r["status"] == "BROKEN")

        report_lines = [
            "Agent Dialog Selector Validation Report",
            "=" * 60,
            f"Total selectors: {len(validation_results)}",
            f"✅ Valid: {valid_count}",
            f"❌ Broken: {broken_count}",
            ""
        ]

        # Report valid selectors
        report_lines.append("VALID SELECTORS:")
        report_lines.append("-" * 40)
        for result in validation_results:
            if result["status"] == "VALID":
                report_lines.extend([
                    f"✓ {result['selector']}",
                    f"  Location: {result['json_path']} (line {result['line_number']})",
                    f"  Elements found: {result['element_count']}",
                    f"  Context: {result['context']}",
                    ""
                ])

        # Report broken selectors with suggestions
        report_lines.append("BROKEN SELECTORS (NEED FIXING):")
        report_lines.append("-" * 40)
        for result in validation_results:
            if result["status"] == "BROKEN":
                report_lines.extend([
                    f"✗ {result['selector']}",
                    f"  Location: {result['json_path']} (line {result['line_number']})",
                    f"  Context: {result['context']}",
                    ""
                ])

                if result["suggestions"]:
                    report_lines.append("  Suggested fixes:")
                    for suggestion in result["suggestions"][:3]:  # Top 3 suggestions
                        report_lines.append(
                            f"    - {suggestion['selector']} "
                            f"(confidence: {suggestion['confidence']:.2f}, "
                            f"type: {suggestion['type']})"
                        )
                        report_lines.append(f"      Reason: {suggestion['reason']}")
                else:
                    report_lines.append("  No automatic suggestions available.")
                report_lines.append("")

        return "\n".join(report_lines)

    def use_test_html(self, test_file: str = "index.test.html"):
        """Use a test HTML file instead of the production one."""
        test_path = self.src_dir / test_file
        if test_path.exists():
            self.html_file = test_path
            print(f"🔧 Using test HTML file: {test_file}")
            return True
        else:
            print(f"❌ Test HTML file not found: {test_file}")
            return False

def main():
    """Main execution function."""
    import sys

    validator = AgentDialogValidator()

    # Check for test mode
    if "--test" in sys.argv:
        if not validator.use_test_html():
            return

    print("Agent Dialog Validator - Selector Validation")
    print("=" * 60)

    report = validator.generate_validation_report()
    print(report)

    results = validator.validate_selectors()

    # Print detailed analysis for broken selectors
    broken = [r for r in results if r["status"] == "BROKEN"]
    if broken:
        print("\n" + "🔍 DETAILED BROKEN SELECTOR ANALYSIS:".center(60, "="))
        for result in broken:
            print(f"\n🚨 Broken: {result['selector']}")
            print(f"   Location: {result['json_path']} (line {result['line_number']})")
            print(f"   Context: {result['context']}")

            if result["suggestions"]:
                print("   Top suggestions:")
                for i, suggestion in enumerate(result["suggestions"][:3], 1):
                    print(f"     {i}. {suggestion['selector']}")
                    print(f"        Confidence: {suggestion['confidence']:.2f}")
                    print(f"        Type: {suggestion['type']}")
                    print(f"        Reason: {suggestion['reason']}")
            else:
                print("   ❌ No suggestions available")

    return results


if __name__ == "__main__":
    results = main()

    # Print quick summary
    if results:
        broken = [r for r in results if r["status"] == "BROKEN"]
        if broken:
            print("\n" + "🚨 ACTION REQUIRED:".center(60, "="))
            print(f"Found {len(broken)} broken selectors that need fixing!")
            for result in broken:
                print(f"  - {result['selector']} (line {result['line_number']})")
