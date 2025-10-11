#!/usr/bin/env python3
"""
DOM Parser for WebAssistantForensics main content
Extracts structure from index.html <main> section for validation
"""

import json
import sys
from pathlib import Path
from bs4 import BeautifulSoup

class MainContentParser:
    def __init__(self, html_content):
        self.soup = BeautifulSoup(html_content, 'html.parser')
        self.extracted_data = {
            "metadata": self._extract_metadata(),
            "sections": self._extract_sections()
        }

    def _extract_metadata(self):
        """Extract metadata from the document"""
        return {
            "title": self._get_document_title(),
            "language": self._get_document_language()
        }

    def _get_document_title(self):
        """Extract document title from <title> tag"""
        title_tag = self.soup.find('title')
        return title_tag.get_text().strip() if title_tag else "Unknown Title"

    def _get_document_language(self):
        """Extract document language from html tag"""
        html_tag = self.soup.find('html')
        return html_tag.get('lang', 'de') if html_tag else 'de'

    def _extract_sections(self):
        """Extract all sections from <main> content"""
        main_content = self.soup.find('main')
        if not main_content:
            return []

        sections = []
        current_section = None

        for element in main_content.find_all(recursive=True):
            if element.name in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
                # Save previous section if exists
                if current_section:
                    sections.append(current_section)

                # Start new section
                current_section = {
                    "id": element.get('id', ''),
                    "title": element.get_text().strip(),
                    "ariaLabel": element.get('aria-label', ''),
                    "level": int(element.name[1]),
                    "content": []
                }
            elif current_section and element.name in ['div', 'p', 'ul', 'ol']:
                content_block = self._parse_content_element(element)
                if content_block:
                    current_section["content"].append(content_block)

        # Add the last section
        if current_section:
            sections.append(current_section)

        return sections

    def _parse_content_element(self, element):
        """Parse individual content elements based on their classes and structure"""
        element_classes = element.get('class', [])

        # Handle detail levels
        if any(cls in element_classes for cls in ['detail-level-1', 'detail-level-2', 'detail-level-3']):
            return self._parse_detail_level(element, element_classes)

        # Handle paragraphs and lists
        elif element.name == 'p':
            return {
                "type": "text",
                "content": element.get_text().strip(),
                "accessibility": {
                    "ariaLabel": element.get('aria-label', ''),
                    "ariaHidden": element.get('aria-hidden', 'false').lower() == 'true'
                }
            }

        # Add more element types as needed
        return None

    def _parse_detail_level(self, element, classes):
        """Parse detail-level divs with their nested structure"""
        detail_level = None
        for cls in classes:
            if cls.startswith('detail-level-'):
                detail_level = int(cls.split('-')[-1])
                break

        return {
            "type": "detail-level",
            "level": detail_level,
            "content": element.get_text().strip(),
            "ariaLabel": element.get('aria-label', ''),
            "children": self._parse_child_elements(element)
        }

    def _parse_child_elements(self, parent_element):
        """Recursively parse child elements within detail levels"""
        children = []
        for child in parent_element.find_all(recursive=False):
            child_data = self._parse_content_element(child)
            if child_data:
                children.append(child_data)
        return children

    def to_json(self):
        """Return extracted data as JSON"""
        return json.dumps(self.extracted_data, indent=2, ensure_ascii=False)

def main():
    if len(sys.argv) != 2:
        print("Usage: python main_content_parser.py <path_to_index.html>")
        sys.exit(1)

    html_file = Path(sys.argv[1])
    if not html_file.exists():
        print(f"Error: File {html_file} not found")
        sys.exit(1)

    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()

        parser = MainContentParser(html_content)
        extracted_json = parser.to_json()

        print(extracted_json)
        return 0

    except Exception as e:
        print(f"Error parsing HTML: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
