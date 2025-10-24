#!/bin/bash
../venv/bin/python3 << 'EOF'
import sys
sys.path.insert(0, 'modules')
from validator_comprehensive import ValidatorComprehensive
import tempfile

# HTML mit vielen BFSG-Problemen
html_with_a11y_issues = """<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test",
        "name": "Test Section für BFSG",
        "description": "Dies ist eine Test-Section um die BFSG Validierung zu testen. Sie enthält Barrierefreiheits-Probleme.",
        "inLanguage": "de",
        "learningResourceType": "Guide"
    }
    </script>
</head>
<body>
    <!-- Kein h1 -->
    <h3>Direkt zu h3</h3>
    
    <!-- Bild ohne alt -->
    <img src="test.jpg">
    
    <!-- Bild mit schlechtem alt -->
    <img src="test2.jpg" alt="Bild von einem Screenshot">
    
    <!-- Link ohne href -->
    <a>Klicken</a>
    
    <!-- Nicht-aussagekräftiger Link -->
    <a href="#">hier</a>
    
    <!-- Input ohne Label -->
    <input type="text" name="test">
    
    <!-- Video ohne Untertitel -->
    <video src="test.mp4"></video>
    
    <!-- Doppelte IDs -->
    <div id="duplicate">A</div>
    <div id="duplicate">B</div>
    
    <!-- div role statt semantisches Element -->
    <div role="navigation">Menu</div>
    
    <!-- role ohne required attributes -->
    <div role="checkbox">Check me</div>
</body>
</html>"""

with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False, encoding='utf-8') as f:
    f.write(html_with_a11y_issues)
    temp_path = f.name

print("🧪 Test: BFSG Umfassend mit Barrierefreiheits-Problemen")
print("="*70)
validator = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json'
)
result = validator.validate_section_html(temp_path)

print(f"Valid: {result['valid']}")
print(f"Errors: {len(result['errors'])}")
print(f"Warnings: {len(result['warnings'])}")

# Gruppiere nach WCAG-Kategorie
bfsg_errors = [e for e in result['errors'] if e['type'].startswith('bfsg')]
bfsg_warnings = [w for w in result['warnings'] if w['type'].startswith('bfsg')]

print(f"\nBFSG-Spezifisch: {len(bfsg_errors)} Fehler, {len(bfsg_warnings)} Warnungen")

if bfsg_errors:
    print("\n❌ BFSG-Fehler (erste 8):")
    for i, e in enumerate(bfsg_errors[:8], 1):
        wcag = e.get('wcag', '?')
        print(f"\n{i}. [{e['type']}] WCAG {wcag}")
        print(f"   {e['message'][:80]}")

if bfsg_warnings:
    print(f"\n⚠️  BFSG-Warnungen (erste 5 von {len(bfsg_warnings)}):")
    for i, w in enumerate(bfsg_warnings[:5], 1):
        wcag = w.get('wcag', '?')
        print(f"\n{i}. [{w['type']}] WCAG {wcag}")
        print(f"   {w['message'][:80]}")

import os
os.unlink(temp_path)

print(f"\n✅ BFSG Validierung erkannte {len(bfsg_errors)} Barrierefreiheits-Fehler!")
EOF
