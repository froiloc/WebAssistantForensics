#!/usr/bin/env python3
"""
Glossary JSON Validation Script
Validates glossary.json against schema and business rules
"""

import json
import re
import os
import sys
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional
import urllib.request
import urllib.error

class GlossaryValidator:
    def __init__(self, glossary_path: str, schema_path: str):
        self.glossary_path = Path(glossary_path)
        self.schema_path = Path(schema_path)
        self.glossary_data = []
        self.schema = {}
        self.term_ids = set()
        self.errors = []
        self.warnings = []
        
    def load_files(self) -> bool:
        """Load glossary and schema files"""
        try:
            with open(self.glossary_path, 'r', encoding='utf-8') as f:
                self.glossary_data = json.load(f)
            print(f"✓ Loaded glossary with {len(self.glossary_data)} terms")
        except (FileNotFoundError, json.JSONDecodeError) as e:
            self.errors.append(f"Failed to load glossary: {e}")
            return False
            
        try:
            with open(self.schema_path, 'r', encoding='utf-8') as f:
                self.schema = json.load(f)
            print("✓ Loaded schema")
        except (FileNotFoundError, json.JSONDecodeError) as e:
            self.errors.append(f"Failed to load schema: {e}")
            return False
            
        return True
    
    def normalize_term_to_id(self, term: str) -> str:
        """Convert term to normalized ID using our rules"""
        # Step 0: Change to lowercase
        normalized = term.lower()
        
        # Step 1: Replace all non-letters and non-digits by underscore '_'
        normalized = re.sub(r'[^a-z0-9]', '_', normalized)
        
        # Step 2: Remove all leading or trailing underscores
        normalized = normalized.strip('_')
        
        # Step 3: Replace all consecutive underscores with a single underscore
        normalized = re.sub(r'_+', '_', normalized)
        
        return normalized
    
    def validate_schema_compliance(self) -> bool:
        """Basic JSON schema validation (simplified - in production use jsonschema library)"""
        if not isinstance(self.glossary_data, list):
            self.errors.append("Glossary must be a JSON array")
            return False
            
        required_props = self.schema.get('items', {}).get('required', [])
        
        for i, term in enumerate(self.glossary_data):
            # Check required properties
            for prop in required_props:
                if prop not in term:
                    self.errors.append(f"Term {i} ('{term.get('term', 'unknown')}') missing required property: {prop}")
            
            # Check property types
            if 'term' in term and not isinstance(term['term'], str):
                self.errors.append(f"Term {i}: 'term' must be a string")
                
            if 'shortDefinition' in term and not isinstance(term['shortDefinition'], str):
                self.errors.append(f"Term {i}: 'shortDefinition' must be a string")
                
            if 'whitePatterns' in term and not isinstance(term['whitePatterns'], list):
                self.errors.append(f"Term {i}: 'whitePatterns' must be an array")
                
        return len(self.errors) == 0
    
    def validate_term_ids(self) -> bool:
        """Validate and generate term IDs, check for collisions"""
        id_mapping = {}
        collisions = {}
        
        for i, term in enumerate(self.glossary_data):
            term_text = term.get('term', f'term_{i}')
            generated_id = self.normalize_term_to_id(term_text)
            
            # Store mapping for collision detection
            if generated_id not in id_mapping:
                id_mapping[generated_id] = []
            id_mapping[generated_id].append((i, term_text))
            
            # Add to global set for related terms validation
            self.term_ids.add(generated_id)
        
        # Check for collisions and apply resolution
        for base_id, terms in id_mapping.items():
            if len(terms) > 1:
                collisions[base_id] = terms
                # Apply collision resolution
                for index, (term_index, original_term) in enumerate(terms):
                    if index == 0:
                        final_id = base_id
                    else:
                        final_id = f"{base_id}_{index + 1}"
                    
                    # Store the final ID for this term
                    term_obj = self.glossary_data[term_index]
                    term_obj['_generated_id'] = final_id
                    print(f"ℹ️  Term '{original_term}' assigned ID: {final_id} (collision resolved)")
            else:
                # No collision, use base ID
                term_index, original_term = terms[0]
                self.glossary_data[term_index]['_generated_id'] = base_id
                print(f"ℹ️  Term '{original_term}' assigned ID: {base_id}")
        
        # Report collisions
        if collisions:
            self.warnings.append(f"Found {len(collisions)} term ID collision(s) - auto-resolved with suffixes")
            for base_id, terms in collisions.items():
                term_list = [f"'{t[1]}'" for t in terms]
                self.warnings.append(f"Collision for base ID '{base_id}': {', '.join(term_list)}")
        
        return True
    
    def validate_media_files(self) -> bool:
        """Validate media file paths and naming conventions"""
        media_pattern = re.compile(r'^\./media/glossary/[a-z0-9_]+(?:_(?:[2-9]|[1-9][0-9]+))?\.(png|jpg|jpeg|gif)$')
        
        for i, term in enumerate(self.glossary_data):
            if 'media' not in term:
                continue
                
            media = term['media']
            term_id = term.get('_generated_id', 'unknown')
            media_path = media.get('path', '')
            
            # Check path pattern
            if not media_pattern.match(media_path):
                self.errors.append(
                    f"Term {i} ('{term.get('term', 'unknown')}'): "
                    f"Media path '{media_path}' does not match required pattern. "
                    f"Expected: './media/glossary/{term_id}.{{png|jpg|jpeg|gif}}'"
                )
                continue
            
            # Extract filename from path and check against term ID
            filename = Path(media_path).stem  # Get filename without extension
            if filename != term_id:
                self.errors.append(
                    f"Term {i} ('{term.get('term', 'unknown')}'): "
                    f"Media filename '{filename}' does not match term ID '{term_id}'. "
                    f"Media files must use the normalized term ID as filename."
                )
            
            # Check if required alt text is present
            if 'alt' not in media or not media['alt'].strip():
                self.errors.append(
                    f"Term {i} ('{term.get('term', 'unknown')}'): "
                    f"Media missing required 'alt' text (BFSG requirement)"
                )
        
        return len([e for e in self.errors if 'media' in e.lower()]) == 0
    
    def validate_related_terms(self) -> bool:
        """Validate that relatedTerms reference existing term IDs"""
        for i, term in enumerate(self.glossary_data):
            if 'relatedTerms' not in term:
                continue
                
            for related_id in term['relatedTerms']:
                if related_id not in self.term_ids:
                    self.errors.append(
                        f"Term {i} ('{term.get('term', 'unknown')}'): "
                        f"Related term '{related_id}' does not exist in glossary"
                    )
        
        return len([e for e in self.errors if 'related term' in e.lower()]) == 0
    
    def validate_patterns(self) -> bool:
        """Validate whitePatterns and blackPatterns"""
        for i, term in enumerate(self.glossary_data):
            # Check whitePatterns
            white_patterns = term.get('whitePatterns', [])
            if not white_patterns:
                self.errors.append(
                    f"Term {i} ('{term.get('term', 'unknown')}'): "
                    f"Must have at least one whitePattern"
                )
            
            for pattern in white_patterns:
                if not isinstance(pattern, str) or not pattern.strip():
                    self.errors.append(
                        f"Term {i} ('{term.get('term', 'unknown')}'): "
                        f"White pattern must be non-empty string"
                    )
            
            # Check blackPatterns if present
            black_patterns = term.get('blackPatterns', [])
            for pattern in black_patterns:
                if not isinstance(pattern, str) or not pattern.strip():
                    self.errors.append(
                        f"Term {i} ('{term.get('term', 'unknown')}'): "
                        f"Black pattern must be non-empty string"
                    )
                # Try to compile regex to check validity
                try:
                    re.compile(pattern)
                except re.error as e:
                    self.errors.append(
                        f"Term {i} ('{term.get('term', 'unknown')}'): "
                        f"Invalid black pattern regex '{pattern}': {e}"
                    )
        
        return True
    
    def validate_categories(self) -> bool:
        """Validate category values against enum"""
        valid_categories = {'technical', 'legal', 'process', 'tool-specific'}
        
        for i, term in enumerate(self.glossary_data):
            categories = term.get('categories', [])
            for category in categories:
                if category not in valid_categories:
                    self.errors.append(
                        f"Term {i} ('{term.get('term', 'unknown')}'): "
                        f"Invalid category '{category}'. Must be one of: {', '.join(sorted(valid_categories))}"
                    )
        
        return True
    
    def run_validation(self) -> bool:
        """Run all validation steps"""
        print("🔍 Starting glossary validation...")
        
        if not self.load_files():
            return False
        
        steps = [
            ("Schema compliance", self.validate_schema_compliance),
            ("Term IDs", self.validate_term_ids),
            ("Patterns", self.validate_patterns),
            ("Categories", self.validate_categories),
            ("Related terms", self.validate_related_terms),
            ("Media files", self.validate_media_files),
        ]
        
        all_passed = True
        for step_name, step_func in steps:
            print(f"⏳ Validating {step_name}...")
            try:
                step_func()
            except Exception as e:
                self.errors.append(f"Validation error in {step_name}: {e}")
                all_passed = False
        
        # Print results
        print("\n" + "="*50)
        print("VALIDATION RESULTS")
        print("="*50)
        
        if self.errors:
            print(f"❌ Found {len(self.errors)} error(s):")
            for error in self.errors:
                print(f"  • {error}")
            all_passed = False
        else:
            print("✅ No errors found!")
        
        if self.warnings:
            print(f"⚠️  Found {len(self.warnings)} warning(s):")
            for warning in self.warnings:
                print(f"  • {warning}")
        
        return all_passed

def main():
    """Main function"""
    glossary_file = "../../schemas/glossary.example.json"
    schema_file = "../../schemas/glossary.schema.json"
    
    # Check if files exist
    if not Path(glossary_file).exists():
        print(f"❌ Glossary file not found: {glossary_file}")
        sys.exit(1)
    
    if not Path(schema_file).exists():
        print(f"❌ Schema file not found: {schema_file}")
        sys.exit(1)
    
    # Run validation
    validator = GlossaryValidator(glossary_file, schema_file)
    success = validator.run_validation()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
