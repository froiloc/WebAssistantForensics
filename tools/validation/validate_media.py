#!/usr/bin/env python3
"""
Media Validation Script for WebAssistantForensics (v2.0)
Generates a report of missing media files referenced in HTML and JSON files.

v2.0 Changes:
- Added support for audio, diagram, and image media types
- Improved type detection using data-media-type attribute
- Better path pattern matching for all 6 media types
"""

import json
import os
import re
from pathlib import Path
from typing import List, Dict, Any, Optional
from urllib.parse import urljoin
import html
from bs4 import BeautifulSoup

try:
    import Levenshtein
except ImportError:
    Levenshtein = None
    print("Warning: python-Levenshtein not installed. Similar file detection will be limited.")


class MediaValidator:
    def __init__(self, base_dir: str = "."):
        self.base_dir = Path(base_dir).resolve()
        self.src_dir = self.base_dir / "../../src"
        
        # Extended media directories for all 6 types
        self.media_dirs = {
            "screenshot": self.src_dir / "media" / "screenshots",
            "annotated": self.src_dir / "media" / "annotated",
            "video": self.src_dir / "media" / "videos",
            "audio": self.src_dir / "media" / "audio",
            "diagram": self.src_dir / "media" / "other",
            "image": self.src_dir / "media" / "other"
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
            
        for existing_file in self.existing_files.get(media_type, []):
            distance = Levenshtein.distance(target_filename.lower(), existing_file.lower())
            if distance < threshold and distance > 0:  # Exclude exact matches
                similar.append({"name": existing_file, "distance": distance})
        
        # Sort by distance (closest first)
        similar.sort(key=lambda x: x["distance"])
        return similar
    
    def _determine_media_type(self, element, file_path: str) -> str:
        """
        Determine media type from element and file path.
        Priority: data-media-type attribute > path heuristics > file extension
        """
        # PRIORITY 1: Check data-media-type attribute
        if hasattr(element, 'get'):
            data_media_type = element.get('data-media-type')
            if data_media_type and data_media_type in ['screenshot', 'annotated', 'video', 'audio', 'diagram', 'image']:
                return data_media_type
        
        # PRIORITY 2: Path-based detection
        file_path_lower = file_path.lower()
        
        if 'annotated' in file_path_lower or '/annotated/' in file_path_lower:
            return 'annotated'
        elif 'screenshots' in file_path_lower or '/screenshots/' in file_path_lower:
            return 'screenshot'
        elif 'videos' in file_path_lower or '/videos/' in file_path_lower:
            return 'video'
        elif 'audio' in file_path_lower or '/audio/' in file_path_lower:
            return 'audio'
        elif '/other/' in file_path_lower:
            # For files in 'other' directory, check extension
            if file_path_lower.endswith(('.png', '.svg')) and 'diagram' in file_path_lower:
                return 'diagram'
            elif file_path_lower.endswith(('.png', '.jpg', '.jpeg', '.svg')):
                return 'image'
        
        # PRIORITY 3: Extension-based fallback
        if any(file_path_lower.endswith(ext) for ext in ['.mp4', '.avi', '.mov', '.webm']):
            return 'video'
        elif any(file_path_lower.endswith(ext) for ext in ['.mp3', '.wav', '.ogg', '.m4a']):
            return 'audio'
        elif file_path_lower.endswith('.svg'):
            return 'diagram'
        elif any(file_path_lower.endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.gif']):
            return 'screenshot'
        
        # Final fallback
        return 'screenshot'
    
    def _extract_media_from_html(self) -> List[Dict[str, Any]]:
        """Extract media references from index.html."""
        html_file = self.src_dir / "index.html"
        if not html_file.exists():
            print(f"Warning: HTML file not found at {html_file}")
            return []
        
        with open(html_file, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
        
        media_items = []
        
        # Find images (including screenshots, annotated, diagrams, and generic images)
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if src.startswith('media/'):
                media_type = self._determine_media_type(img, src)
                alt_text = img.get('alt', 'No alt text provided')
                
                # Find context
                context = self._generate_css_selector(img)
                
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
                media_type = self._determine_media_type(video, src)
                alt_text = video.get('title') or "Video content"
                
                context = self._generate_css_selector(video)
                snippet = self._find_snippet_text(video)
                
                media_items.append({
                    "file_path": src,
                    "media_type": media_type,
                    "alt_text": alt_text,
                    "context": context,
                    "snippet": snippet,
                    "source": "html"
                })
        
        # NEW: Find audio elements
        for audio in soup.find_all('audio'):
            src = audio.get('src', '')
            if not src:
                # Check source tags inside audio
                source = audio.find('source')
                if source:
                    src = source.get('src', '')
            
            if src.startswith('media/'):
                media_type = self._determine_media_type(audio, src)
                alt_text = audio.get('title') or "Audio content"
                
                context = self._generate_css_selector(audio)
                snippet = self._find_snippet_text(audio)
                
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
        # Find the closest content section
        section = element.find_parent('section', class_='content-section')
        if not section:
            section = element.find_parent(['section', 'article', 'main'])
        
        if not section:
            return "unknown"
        
        # Build CSS selector path
        selector_parts = []
        
        # Add section ID
        if section.get('id'):
            selector_parts.append(f"#{section.get('id')}")
        
        # Traverse from section to element
        current = element
        path_parts = []
        
        while current and current != section:
            tag = current.name
            classes = current.get('class', [])
            nth = 1
            
            # Count siblings of same type
            for sibling in current.find_previous_siblings(tag):
                if sibling.get('class') == classes:
                    nth += 1
            
            # Build selector for this element
            if classes:
                class_str = '.'.join(classes)
                part = f"{tag}.{class_str}"
            else:
                part = tag
            
            if nth > 1:
                part += f":nth-of-type({nth})"
            
            path_parts.insert(0, part)
            current = current.parent
        
        # Combine section and path
        if path_parts:
            selector_parts.extend(path_parts)
        
        return ' '.join(selector_parts)
    
    def _find_snippet_text(self, element) -> str:
        """Find relevant text snippet near the media element."""
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
                text = current_element.get_text(separator=' ', strip=True)
                if text and len(text) > 10:
                    return text[:200] + "..." if len(text) > 200 else text

            # Check for div with specific classes
            elif current_element.name == 'div':
                class_attr = current_element.get('class', [])
                if any(f"detail-level-{i}" in class_attr for i in [1, 2, 3]):
                    text = current_element.get_text(separator=' ', strip=True)
                    if text and len(text) > 10:
                        return text[:200] + "..." if len(text) > 200 else text

            # Move to parent element
            current_element = current_element.parent

            # Stop if we reach the body element
            if current_element and current_element.name == 'body':
                break

        # Fallback: look for previous siblings
        for sibling in element.find_previous_siblings(allowed_parents[:4]):
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
                    # Determine type from path (no element available in JSON)
                    media_type = self._determine_media_type(None, media_src)
                    alt_text = obj.get("altText") or obj.get("title") or "No description"
                    
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
        
        # Store for later use
        self.media_items = report_items
        
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
    
    print("WebAssistantForensics - Media Validation Report Generator v2.0")
    print("=" * 60)
    
    report_path = validator.generate_report()
    
    if report_path.startswith("Error:"):
        print(f"❌ {report_path}")
        return 1
    
    print(f"✅ Report generated successfully: {report_path}")
    print(f"📊 Found {len(validator.media_items)} missing media files")
    
    # Print summary by type (all 6 types)
    type_counts = {
        'screenshot': 0,
        'annotated': 0,
        'video': 0,
        'audio': 0,
        'diagram': 0,
        'image': 0
    }
    
    for item in validator.media_items:
        media_type = item["type"]
        if media_type in type_counts:
            type_counts[media_type] += 1
    
    print("\n📋 Breakdown by type:")
    for media_type, count in type_counts.items():
        if count > 0:
            icon_map = {
                'screenshot': '📷',
                'annotated': '🖊️',
                'video': '🎥',
                'audio': '🎵',
                'diagram': '📊',
                'image': '🖼️'
            }
            icon = icon_map.get(media_type, '📄')
            print(f"   {icon} {media_type}: {count} files")
    
    return 0


if __name__ == "__main__":
    exit(main())
