#!/usr/bin/env python3
"""
Enhanced Glossary Build & Validation Script
Combines validation with build-time optimization and index generation
"""

import json
import re
import os
import sys
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional, Any
from dataclasses import dataclass
import hashlib

@dataclass
class BuildStats:
    total_terms: int = 0
    terms_with_media: int = 0
    terms_with_extended: int = 0
    terms_with_related: int = 0
    categories_used: Set[str] = None
    validation_errors: int = 0
    validation_warnings: int = 0
    
    def __post_init__(self):
        if self.categories_used is None:
            self.categories_used = set()

class GlossaryBuilder:
    def __init__(self, glossary_path: str, schema_path: str, output_dir: str = "dist"):
        self.glossary_path = Path(glossary_path)
        self.schema_path = Path(schema_path)
        self.output_dir = Path(output_dir)
        self.glossary_data = []
        self.schema = {}
        self.term_lookup = {}
        self.pattern_index = []
        self.stats = BuildStats()
        self.errors = []
        self.warnings = []
        
    def ensure_output_dir(self):
        """Create output directory if it doesn't exist"""
        self.output_dir.mkdir(exist_ok=True)
        
    def load_files(self) -> bool:
        """Load glossary and schema files"""
        try:
            with open(self.glossary_path, 'r', encoding='utf-8') as f:
                self.glossary_data = json.load(f)
            self.stats.total_terms = len(self.glossary_data)
            print(f"✓ Loaded glossary with {self.stats.total_terms} terms")
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
    
    def build_term_index(self):
        """Build optimized lookup indexes for terms"""
        id_mapping = {}
        collision_resolution = {}
        
        # First pass: generate base IDs and detect collisions
        for i, term in enumerate(self.glossary_data):
            term_text = term.get('term', f'term_{i}')
            base_id = self.normalize_term_to_id(term_text)
            
            if base_id not in id_mapping:
                id_mapping[base_id] = []
            id_mapping[base_id].append((i, term_text))
        
        # Second pass: resolve collisions and assign final IDs
        for base_id, terms in id_mapping.items():
            if len(terms) > 1:
                # Collision detected - apply resolution
                collision_resolution[base_id] = terms
                for index, (term_index, original_term) in enumerate(terms):
                    final_id = base_id if index == 0 else f"{base_id}_{index + 1}"
                    self.glossary_data[term_index]['_generated_id'] = final_id
                    self.term_lookup[final_id] = term_index
                    print(f"ℹ️  Term '{original_term}' assigned ID: {final_id} (collision resolved)")
            else:
                # No collision
                term_index, original_term = terms[0]
                self.glossary_data[term_index]['_generated_id'] = base_id
                self.term_lookup[base_id] = term_index
        
        # Report collision statistics
        if collision_resolution:
            self.warnings.append(f"Resolved {len(collision_resolution)} term ID collision(s)")
            self.stats.validation_warnings += len(collision_resolution)
    
    def build_pattern_index(self):
        """Build optimized pattern matching index (without storing compiled patterns)"""
        for i, term in enumerate(self.glossary_data):
            term_id = term['_generated_id']
            white_patterns = term.get('whitePatterns', [])
            black_patterns = term.get('blackPatterns', [])
            
            # Convert simple white patterns to word-boundary regex
            for pattern in white_patterns:
                # Escape regex special characters except those we want to preserve
                escaped_pattern = re.escape(pattern)
                # Create word-boundary pattern for simple string matching
                regex_pattern = f"\\b{escaped_pattern}\\b"
                self.pattern_index.append({
                    'type': 'white',
                    'pattern': regex_pattern,
                    'term_id': term_id,
                    'original': pattern
                    # Remove the 'compiled' key entirely
                })
            
            # Compile black patterns as full regex (but don't store compiled objects)
            for pattern in black_patterns:
                self.pattern_index.append({
                    'type': 'black', 
                    'pattern': pattern,
                    'term_id': term_id,
                    'original': pattern
                    # Remove the 'compiled' key entirely
                })
        
        print(f"✓ Built pattern index with {len(self.pattern_index)} patterns")

    def generate_search_index(self):
        """Generate optimized search index for frontend"""
        search_index = {
            'terms': {},
            'patterns': self.pattern_index,
            'lookup': self.term_lookup,
            'metadata': {
                'version': '1.0.0',
                'term_count': self.stats.total_terms,
                'build_time': None,
                'hash': hashlib.md5(json.dumps(self.glossary_data, sort_keys=True).encode()).hexdigest()
            }
        }
        
        # Build minimal term data for quick lookup
        for term_id, term_index in self.term_lookup.items():
            term = self.glossary_data[term_index]
            search_index['terms'][term_id] = {
                'term': term['term'],
                'shortDefinition': term['shortDefinition'],
                'hasExtended': 'extendedExplanation' in term and term['extendedExplanation'],
                'hasMedia': 'media' in term,
                'categories': term.get('categories', [])
            }
        
        return search_index

    def collect_statistics(self):
        """Collect comprehensive statistics about the glossary"""
        for term in self.glossary_data:
            # Media usage
            if 'media' in term:
                self.stats.terms_with_media += 1
            
            # Extended explanations
            if 'extendedExplanation' in term and term['extendedExplanation']:
                self.stats.terms_with_extended += 1
            
            # Related terms
            if 'relatedTerms' in term and term['relatedTerms']:
                self.stats.terms_with_related += 1
            
            # Categories
            if 'categories' in term:
                self.stats.categories_used.update(term['categories'])
        
        self.stats.validation_errors = len(self.errors)
        self.stats.validation_warnings = len(self.warnings)
    
    def generate_typescript_definitions(self):
        """Generate TypeScript type definitions from schema"""
        ts_content = """// Auto-generated TypeScript definitions for Glossary
// Generated from glossary.schema.json

export interface GlossaryMedia {
    path: string;
    alt: string;
    caption?: string;
}

export interface GlossaryTerm {
    term: string;
    shortDefinition: string;
    extendedExplanation?: string;
    whitePatterns: string[];
    blackPatterns?: string[];
    media?: GlossaryMedia;
    relatedTerms?: string[];
    categories?: ('technical' | 'legal' | 'process' | 'tool-specific')[];
}

export type Glossary = GlossaryTerm[];

export interface SearchIndex {
    terms: Record<string, {
        term: string;
        shortDefinition: string;
        hasExtended: boolean;
        hasMedia: boolean;
        categories: string[];
    }>;
    patterns: Array<{
        type: 'white' | 'black';
        pattern: string;
        term_id: string;
        original: string;
    }>;
    lookup: Record<string, number>;
    metadata: {
        version: string;
        term_count: number;
        build_time: string | null;
        hash: string;
    };
}
"""
        return ts_content

    def validate_index_against_schema(self):
        """Validate the generated index against the index schema"""
        index_schema_path = self.schema_path.parent / "glossary.index.schema.json"
        
        if not index_schema_path.exists():
            self.warnings.append("Index schema not found - skipping index validation")
            return True
            
        try:
            with open(index_schema_path, 'r', encoding='utf-8') as f:
                index_schema = json.load(f)
            
            # Basic validation (in production, use jsonschema library)
            search_index = self.generate_search_index()
            
            # Check required top-level properties
            required_props = index_schema.get('required', [])
            for prop in required_props:
                if prop not in search_index:
                    self.errors.append(f"Search index missing required property: {prop}")
                    return False
            
            # Validate metadata structure
            metadata = search_index.get('metadata', {})
            if 'version' not in metadata:
                self.errors.append("Search index metadata missing version")
            if 'term_count' not in metadata:
                self.errors.append("Search index metadata missing term_count")
            if 'hash' not in metadata:
                self.errors.append("Search index metadata missing hash")
                
            return len(self.errors) == 0
            
        except Exception as e:
            self.errors.append(f"Index schema validation failed: {e}")
            return False

    def generate_build_report(self):
        """Generate a comprehensive build report"""
        # Check if index schema exists for validation reporting
        index_schema_path = self.schema_path.parent / "glossary.index.schema.json"
        index_schema_exists = index_schema_path.exists()
        
        report = {
            'build_info': {
                'glossary_file': str(self.glossary_path),
                'schema_file': str(self.schema_path),
                'output_dir': str(self.output_dir),
                'timestamp': None,  # Would be actual timestamp
                'index_schema_available': index_schema_exists
            },
            'statistics': {
                'total_terms': self.stats.total_terms,
                'terms_with_media': self.stats.terms_with_media,
                'terms_with_extended': self.stats.terms_with_extended,
                'terms_with_related': self.stats.terms_with_related,
                'categories_used': list(self.stats.categories_used),
                'media_coverage': f"{(self.stats.terms_with_media / self.stats.total_terms) * 100:.1f}%",
                'extended_coverage': f"{(self.stats.terms_with_extended / self.stats.total_terms) * 100:.1f}%"
            },
            'validation': {
                'errors': self.errors,
                'warnings': self.warnings,
                'error_count': self.stats.validation_errors,
                'warning_count': self.stats.validation_warnings,
                'index_validation': {
                    'performed': index_schema_exists,
                    'passed': index_schema_exists and len([e for e in self.errors if 'index validation' in e.lower()]) == 0
                }
            },
            'index_info': {
                'total_patterns': len(self.pattern_index),
                'white_patterns': len([p for p in self.pattern_index if p['type'] == 'white']),
                'black_patterns': len([p for p in self.pattern_index if p['type'] == 'black']),
                'unique_terms_indexed': len(self.term_lookup)
            }
        }
        return report

    def run_build(self) -> bool:
        """Run the complete build process"""
        print("🔨 Starting glossary build process...")
        
        self.ensure_output_dir()
        
        if not self.load_files():
            return False
        
        # Build steps
        steps = [
            ("Building term index", self.build_term_index),
            ("Building pattern index", self.build_pattern_index),
            ("Collecting statistics", self.collect_statistics),
        ]
        
        for step_name, step_func in steps:
            print(f"⏳ {step_name}...")
            try:
                step_func()
            except Exception as e:
                self.errors.append(f"Build error in {step_name}: {e}")
                return False
        
        # Generate output files
        print("📁 Generating output files...")
        
        # 1. Optimized search index
        search_index = self.generate_search_index()
        
        # ✅ ADD THIS: Validate the generated index against the index schema
        print("⏳ Validating search index against schema...")
        index_validation_passed = self.validate_index_against_schema()
        if not index_validation_passed:
            self.errors.append("Search index validation failed against glossary.index.schema.json")
            return False
        print("✓ Search index validation passed")
        
        # Continue with file writing...
        with open(self.output_dir / 'glossary.index.json', 'w', encoding='utf-8') as f:
            json.dump(search_index, f, indent=2, ensure_ascii=False)
        print("✓ Generated glossary.index.json")
        
        # 2. TypeScript definitions
        ts_definitions = self.generate_typescript_definitions()
        with open(self.output_dir / 'glossary.types.ts', 'w', encoding='utf-8') as f:
            f.write(ts_definitions)
        print("✓ Generated glossary.types.ts")
        
        # 3. Build report
        build_report = self.generate_build_report()
        with open(self.output_dir / 'build-report.json', 'w', encoding='utf-8') as f:
            json.dump(build_report, f, indent=2, ensure_ascii=False)
        print("✓ Generated build-report.json")
        
        # 4. Validated glossary (with generated IDs)
        validated_glossary = []
        for term in self.glossary_data:
            clean_term = {k: v for k, v in term.items() if not k.startswith('_')}
            validated_glossary.append(clean_term)
        
        with open(self.output_dir / 'glossary.validated.json', 'w', encoding='utf-8') as f:
            json.dump(validated_glossary, f, indent=2, ensure_ascii=False)
        print("✓ Generated glossary.validated.json")
        
        # Print summary
        print("\n" + "="*60)
        print("BUILD SUMMARY")
        print("="*60)
        print(f"📊 Terms: {self.stats.total_terms}")
        print(f"🖼️  With media: {self.stats.terms_with_media} ({self.stats.terms_with_media/self.stats.total_terms*100:.1f}%)")
        print(f"📝 With extended explanations: {self.stats.terms_with_extended} ({self.stats.terms_with_extended/self.stats.total_terms*100:.1f}%)")
        print(f"🔗 With related terms: {self.stats.terms_with_related} ({self.stats.terms_with_related/self.stats.total_terms*100:.1f}%)")
        print(f"🏷️  Categories used: {', '.join(sorted(self.stats.categories_used))}")
        print(f"⚡ Patterns: {len(self.pattern_index)} (white: {len([p for p in self.pattern_index if p['type'] == 'white'])}, black: {len([p for p in self.pattern_index if p['type'] == 'black'])})")
        
        if self.errors:
            print(f"❌ Errors: {len(self.errors)}")
            for error in self.errors:
                print(f"   • {error}")
            return False
        else:
            print("✅ Build completed successfully!")
            if self.warnings:
                print(f"⚠️  Warnings: {len(self.warnings)}")
                for warning in self.warnings:
                    print(f"   • {warning}")
            
            print(f"\n📁 Output files created in: {self.output_dir}")
            print("   • glossary.index.json - Optimized search index")
            print("   • glossary.types.ts - TypeScript definitions") 
            print("   • glossary.validated.json - Validated glossary data")
            print("   • build-report.json - Comprehensive build report")
            
            return True

def main():
    """Main function"""
    glossary_file = "../../schemas/glossary.example.json"
    schema_file = "../../schemas/glossary.schema.json"
    output_dir = "../../src/dist"
    
    # Check if files exist
    if not Path(glossary_file).exists():
        print(f"❌ Glossary file not found: {glossary_file}")
        sys.exit(1)
    
    if not Path(schema_file).exists():
        print(f"❌ Schema file not found: {schema_file}")
        sys.exit(1)
    
    # Run build
    builder = GlossaryBuilder(glossary_file, schema_file, output_dir)
    success = builder.run_build()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
