#!/usr/bin/env python3
"""
Media Validation Script for WebAssistentForensics
Generates a report of missing media files referenced in HTML and JSON files.
"""

import json
import os
import re
from pathlib import Path
from typing import List, Dict, Any, Optional
from urllib.parse import urljoin
import html
from bs4 import BeautifulSoup
import pdb

try:
    import Levenshtein
except ImportError:
    Levenshtein = None
    print("Warning: python-Levenshtein not installed. Similar file detection will be limited.")


class MediaValidator:
    def __init__(self, base_dir: str = "."):
        self.base_dir = Path(base_dir).resolve()
        self.src_dir = self.base_dir / "../../src"
        self.media_dirs = {
            "screenshot": self.src_dir / "media" / "screenshots",
            "annotated": self.src_dir / "media" / "annotated", 
            "video": self.src_dir / "media" / "videos"
        }
        
        self.media_items = []
        self.existing_files = self._scan_existing_files()
    
    def _scan_existing_files(self) -> Dict[str, List[str]]:
        """Scan all media directories for existing files."""
        existing = {}
        for media_type, media_dir in self.media_dirs.items():
            existing[media_type] = []
            if media_dir.exists():
                for file_path in media_dir.iterdir():
                    if file_path.is_file():
                        existing[media_type].append(file_path.name)
        return existing
    
    def _get_similar_files(self, target_filename: str, media_type: str, threshold: int = 10) -> List[Dict[str, Any]]:
        """Find similar files using Levenshtein distance."""
        similar = []
        
        if Levenshtein is None:
            return similar
            
        for existing_file in self.existing_files[media_type]:
            distance = Levenshtein.distance(target_filename.lower(), existing_file.lower())
            if distance < threshold and distance > 0:  # Exclude exact matches
                similar.append({"name": existing_file, "distance": distance})
        
        # Sort by distance (closest first)
        similar.sort(key=lambda x: x["distance"])
        return similar
    
    def _determine_media_type(self, file_path: str) -> str:
        """Determine media type from file path."""
        file_path_lower = file_path.lower()
        if "annotated" in file_path_lower:
            return "annotated"
        elif "screenshot" in file_path_lower or any(file_path_lower.endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.gif']):
            return "screenshot" 
        elif any(file_path_lower.endswith(ext) for ext in ['.mp4', '.avi', '.mov', '.webm']):
            return "video"
        else:
            return "screenshot"  # Default fallback
    
    def _extract_media_from_html(self) -> List[Dict[str, Any]]:
        """Extract media references from index.html."""
        html_file = self.src_dir / "index.html"
        if not html_file.exists():
            print(f"Warning: HTML file not found at {html_file}")
            return []
        
        with open(html_file, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
        
        media_items = []
        
        # Find images
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if src.startswith('media/'):
                media_type = self._determine_media_type(src)
                alt_text = img.get('alt', 'No alt text provided')
                
                # Find context - closest section or meaningful parent
                context_element = img.find_parent(['section', 'div', 'article'])
                context = self._generate_css_selector(img) if context_element else "unknown"
                
                # Find snippet text
                snippet = self._find_snippet_text(img)
                
                media_items.append({
                    "file_path": src,
                    "media_type": media_type,
                    "alt_text": alt_text,
                    "context": context,
                    "snippet": snippet,
                    "source": "html"
                })
        
        # Find videos
        for video in soup.find_all('video'):
            src = video.get('src', '')
            if not src:
                # Check source tags inside video
                source = video.find('source')
                if source:
                    src = source.get('src', '')
            
            if src.startswith('media/'):
                media_type = "video"
                alt_text = video.get('title') or "Video content"
                
                context_element = video.find_parent(['section', 'div', 'article'])
                context = self._generate_css_selector(video) if context_element else "unknown"
                
                snippet = self._find_snippet_text(video)
                
                media_items.append({
                    "file_path": src,
                    "media_type": media_type,
                    "alt_text": alt_text,
                    "context": context,
                    "snippet": snippet,
                    "source": "html"
                })
        
        return media_items
    
    def _generate_css_selector(self, element) -> str:
        """Generate a CSS selector from the closest section parent to the media element."""
        # Find the closest section ancestor
        section_ancestor = element.find_parent('section')
        if not section_ancestor:
            return "unknown"

        #pdb.set_trace()

        # Build the path from section to element
        path = []
        current = element

        # Traverse up to section, collecting each element
        while current and current != section_ancestor:
            path.append(current)
            current = current.parent

        # Add the section itself
        path.append(section_ancestor)

        # Reverse so we have [section, ..., element]
        path.reverse()

        selector_parts = []

        for i, elem in enumerate(path):
            if i == 0:  # Section element
                # For section, use ID if available
                elem_id = elem.get('id')
                if elem_id:
                    selector_parts.append(f"#{elem_id}")
                else:
                    # If no ID, use section with nth-of-type
                    if elem.parent:
                        siblings = elem.parent.find_all(elem.name, recursive=False)
                        if len(siblings) > 1:
                            index = siblings.index(elem) + 1
                            selector_parts.append(f"{elem.name}:nth-of-type({index})")
                        else:
                            selector_parts.append(elem.name)
                    else:
                        selector_parts.append(elem.name)
            else:
                # For other elements
                elem_id = elem.get('id')
                if elem_id:
                    selector_parts.append(f"#{elem_id}")
                else:
                    tag_name = elem.name
                    classes = elem.get('class', [])

                    # Build class selector if classes exist
                    class_selector = ''
                    if classes:
                        if isinstance(classes, list):
                            class_selector = '.' + '.'.join(classes)
                        else:
                            class_selector = '.' + classes

                    # Check if we need nth-of-type
                    parent = elem.parent
                    if parent:
                        siblings = parent.find_all(elem.name, recursive=False)
                        if len(siblings) > 1:
                            index = siblings.index(elem) + 1
                            selector_parts.append(f"{tag_name}{class_selector}:nth-of-type({index})")
                        else:
                            selector_parts.append(f"{tag_name}{class_selector}")
                    else:
                        selector_parts.append(f"{tag_name}{class_selector}")

        return ' '.join(selector_parts)
    
    def _find_snippet_text(self, element) -> str:
        """Find relevant text snippet from the closest parent element of specified types."""
        # Define the allowed parent tags and classes
        allowed_parents = [
            'p', 'ul', 'ol', 'section',
            'div.detail-level-1', 'div.detail-level-2', 'div.detail-level-3'
        ]

        # Start with the element itself and traverse up through parents
        current_element = element
        while current_element:
            # Check if current element matches our criteria
            if current_element.name in ['p', 'ul', 'ol', 'section']:
                # Use get_text with separator to preserve word spacing
                text = current_element.get_text(separator=' ', strip=True)
                if text and len(text) > 10:
                    return text[:200] + "..." if len(text) > 200 else text

            # Check for div with specific classes
            elif current_element.name == 'div':
                class_attr = current_element.get('class', [])
                if any(f"detail-level-{i}" in class_attr for i in [1, 2, 3]):
                    # Use get_text with separator to preserve word spacing
                    text = current_element.get_text(separator=' ', strip=True)
                    if text and len(text) > 10:
                        return text[:200] + "..." if len(text) > 200 else text

            # Move to parent element
            current_element = current_element.parent

            # Stop if we reach the body element
            if current_element and current_element.name == 'body':
                break

        # Fallback: look for previous siblings of allowed types
        for sibling in element.find_previous_siblings(allowed_parents[:4]):  # p, ul, ol, section
            text = sibling.get_text(separator=' ', strip=True)
            if text and len(text) > 10:
                return text[:200] + "..." if len(text) > 200 else text

        # Final fallback
        return "No descriptive text found"
    
    def _extract_media_from_json(self) -> List[Dict[str, Any]]:
        """Extract media references from agent-dialogs.json."""
        json_file = self.src_dir / "agent-dialogs.json"
        if not json_file.exists():
            print(f"Warning: JSON file not found at {json_file}")
            return []
        
        with open(json_file, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError as e:
                print(f"Error parsing JSON file: {e}")
                return []
        
        media_items = []
        
        def extract_from_object(obj, path=""):
            """Recursively extract media references from JSON objects."""
            if isinstance(obj, dict):
                # Check for media fields
                media_src = obj.get("mediaSrc") or obj.get("icon")
                show_media = obj.get("showMedia", False)
                
                if media_src and show_media and media_src.startswith('media/'):
                    media_type = self._determine_media_type(media_src)
                    alt_text = obj.get("altText") or obj.get("title") or "No description"
                    
                    # Try to find context from the structure
                    context = path if path else "agent-dialog"
                    snippet = obj.get("message") or obj.get("content") or "No content provided"
                    if isinstance(snippet, list):
                        snippet = " ".join(str(item) for item in snippet[:2])
                    snippet = str(snippet)[:200] + "..." if len(str(snippet)) > 200 else str(snippet)
                    
                    media_items.append({
                        "file_path": media_src,
                        "media_type": media_type,
                        "alt_text": alt_text,
                        "context": context,
                        "snippet": snippet,
                        "source": "json"
                    })
                
                # Recursively check nested objects
                for key, value in obj.items():
                    new_path = f"{path}.{key}" if path else key
                    extract_from_object(value, new_path)
            
            elif isinstance(obj, list):
                for i, item in enumerate(obj):
                    new_path = f"{path}[{i}]"
                    extract_from_object(item, new_path)
        
        extract_from_object(data)
        return media_items
    
    def validate_media(self) -> List[Dict[str, Any]]:
        """Main validation method that returns missing media items."""
        print("Scanning for media references...")
        
        # Extract media from both sources
        html_media = self._extract_media_from_html()
        json_media = self._extract_media_from_json()
        
        all_media = html_media + json_media
        print(f"Found {len(all_media)} media references total")
        
        # Check which files are missing and prepare report
        report_items = []
        item_id = 1
        
        for media_ref in all_media:
            file_path = Path(media_ref["file_path"])
            media_type = media_ref["media_type"]
            
            # Check if file exists
            full_path = self.src_dir / file_path
            file_exists = full_path.exists()
            
            if not file_exists:
                # File is missing - add to report
                filename = file_path.name
                
                # Find similar files
                similar_files = self._get_similar_files(filename, media_type)
                
                # Generate title from context and filename
                title_parts = []
                if media_ref["source"] == "html":
                    title_parts.append("HTML")
                else:
                    title_parts.append("Agent")
                
                title_parts.append(media_type.title())
                title_parts.append(filename.split('.')[0].replace('-', ' ').title())
                
                report_item = {
                    "id": item_id,
                    "title": " ".join(title_parts),
                    "type": media_type,
                    "context": media_ref["context"],
                    "snippet": media_ref["snippet"],
                    "filePath": str(file_path),
                    "altText": media_ref["alt_text"],
                    "similarFiles": similar_files,
                    "completed": False
                }
                
                report_items.append(report_item)
                item_id += 1
        
        print(f"Found {len(report_items)} missing media files")
        return report_items

    def generate_report(self, output_file: str = "media-validation-report.html") -> str:
        """Generate the complete HTML report."""
        missing_media = self.validate_media()

        # Load template
        template_file = Path(__file__).parent / "template.html"
        if not template_file.exists():
            return "Error: Template file not found"

        with open(template_file, 'r', encoding='utf-8') as f:
            template = f.read()

        # Convert media data to JSON
        media_json = json.dumps(missing_media, indent=2, ensure_ascii=False)

        # Simply inject the JSON data before the closing </body> tag
        script_injection = f'''
        <script>
        // Media data injected by Python script
        window.mediaData = {media_json};
        </script>
        '''

        # Insert the script before </body>
        updated_template = template.replace('</body>', script_injection + '\n</body>')

        # Write output file
        output_path = self.base_dir / output_file
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(updated_template)

        return str(output_path)


def main():
    """Main execution function."""
    validator = MediaValidator()
    
    print("WebAssistentForensics - Media Validation Report Generator")
    print("=" * 60)
    
    report_path = validator.generate_report()
    
    if report_path.startswith("Error:"):
        print(f"❌ {report_path}")
        return 1
    
    print(f"✅ Report generated successfully: {report_path}")
    print(f"📊 Found {len(validator.media_items)} missing media files")
    
    # Print summary by type
    type_counts = {}
    for item in validator.media_items:
        media_type = item["type"]
        type_counts[media_type] = type_counts.get(media_type, 0) + 1
    
    for media_type, count in type_counts.items():
        print(f"   - {media_type}: {count} files")
    
    return 0


if __name__ == "__main__":
    exit(main())
