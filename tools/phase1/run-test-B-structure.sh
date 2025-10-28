#!/bin/bash
../venv/bin/python3 << 'EOF'
import sys
sys.path.insert(0, 'modules')
from validator_comprehensive import ValidatorComprehensive
import tempfile

# HTML mit Struktur-Problemen
html_with_structure_issues = """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Test Struktur</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test-structure",
        "name": "Test Section für Struktur-Validierung",
        "description": "Dies testet die Matroschka-Struktur-Validierung mit verschiedenen Verschachtelungs-Fehlern.",
        "inLanguage": "de",
        "learningResourceType": "Guide"
    }
    </script>
</head>
<body>
    <!-- Section ohne Pflicht-Attribute -->
    <section class="content-section" data-detail-level="3">
        
        <h3>Test Section</h3>
        
        <!-- Level 1 Content -->
        <div class="detail-level-1">
            <ol>
                <li>Schritt 1</li>
                <li>Schritt 2</li>
            </ol>
            
            <!-- FEHLER: Level 2 in Level 1 verschachtelt (erlaubt) -->
            <div class="detail-level-2">
                <p>Erklärung zu Schritten</p>
            </div>
        </div>
        
        <!-- FEHLER: Level 1 in Level 2 (NICHT erlaubt) -->
        <div class="detail-level-2">
            <div class="detail-level-1">
                <p>Falsch verschachtelt!</p>
            </div>
        </div>
        
        <!-- FEHLER: Level 2 in Level 3 (NICHT erlaubt) -->
        <div class="detail-level-3">
            <div class="detail-level-2">
                <p>Auch falsch!</p>
            </div>
        </div>
        
        <!-- Content-Type Box ohne bekannten Typ -->
        <aside data-content-type="unknown-type">
            <p>Unbekannter Typ</p>
        </aside>
        
        <!-- Figure ohne figcaption -->
        <figure data-media-type="screenshot">
            <button class="media-help-trigger">Screenshot</button>
        </figure>
        
        <!-- Kein Agent-Context Block -->
        
    </section>
</body>
</html>"""

with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False, encoding='utf-8') as f:
    f.write(html_with_structure_issues)
    temp_path = f.name

print("🧪 Test: Struktur-Validierung (Matroschka-Prinzip)")
print("="*60)
validator = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json'
)
result = validator.validate_section_html(temp_path)

print(f"Valid: {result['valid']}")
print(f"Errors: {len(result['errors'])}")
print(f"Warnings: {len(result['warnings'])}")

structure_errors = [e for e in result['errors'] if e['type'].startswith('structure')]
structure_warnings = [w for w in result['warnings'] if w['type'].startswith('structure')]

print(f"\nStruktur-Spezifisch: {len(structure_errors)} Fehler, {len(structure_warnings)} Warnungen")

if structure_errors:
    print("\n❌ Struktur-Fehler:")
    for e in structure_errors:
        print(f"  [{e['type']}] {e['message']}")

if structure_warnings:
    print(f"\n⚠️  Struktur-Warnungen:")
    for w in structure_warnings[:5]:
        print(f"  [{w['type']}] {w['message']}")

import os
os.unlink(temp_path)

print(f"\n✅ Struktur-Validierung erkannte {len(structure_errors)} Fehler und {len(structure_warnings)} Warnungen!")
EOF
