#!/bin/bash
../venv/bin/python3 << 'EOF'
import sys
sys.path.insert(0, 'modules')
from validator_comprehensive import ValidatorComprehensive
import tempfile

# HTML mit verschiedenen Link-Problemen
html_with_link_issues = """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Test Links</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test-section",
        "name": "Test Section für Link-Validierung",
        "description": "Dies ist eine Test-Section um die Link-Validierung zu testen. Sie enthält verschiedene Link-Probleme.",
        "inLanguage": "de",
        "learningResourceType": "Guide",
        "relatedLink": [
            {"@type": "LinkRole", "url": "#existing-section", "name": "Verweis"},
            {"@type": "LinkRole", "url": "#non-existing-section", "name": "Toter Link"}
        ]
    }
    </script>
</head>
<body>
    <h1 id="main-heading">Test Links</h1>
    
    <!-- Interner Link auf existierendes Ziel -->
    <a href="#main-heading">Zum Anfang</a>
    
    <!-- Interner Link auf NICHT-existierendes Ziel -->
    <a href="#does-not-exist">Toter Link</a>
    
    <!-- Externer Link -->
    <a href="https://example.com">Externe Seite</a>
    
    <!-- Cross-Reference (wird nur mit GliederungLoader validiert) -->
    <a href="#existing-section">Verwandte Section</a>
    
    <section id="existing-section">
        <h2>Existierende Section</h2>
    </section>
</body>
</html>"""

with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False, encoding='utf-8') as f:
    f.write(html_with_link_issues)
    temp_path = f.name

print("🧪 Test: Link-Validierung (ohne GliederungLoader)")
print("="*60)
validator = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json'
)
result = validator.validate_section_html(temp_path, section_id='test-section')

print(f"Valid: {result['valid']}")
print(f"Errors: {len(result['errors'])}")
print(f"Warnings: {len(result['warnings'])}")

link_errors = [e for e in result['errors'] if e['type'].startswith('link')]
link_warnings = [w for w in result['warnings'] if w['type'].startswith('link')]

print(f"\nLink-Spezifisch: {len(link_errors)} Fehler, {len(link_warnings)} Warnungen")

if link_errors:
    print("\n❌ Link-Fehler:")
    for e in link_errors:
        print(f"  [{e['type']}] {e['message']}")

if link_warnings:
    print(f"\n⚠️  Link-Warnungen (erste 3):")
    for w in link_warnings[:3]:
        print(f"  [{w['type']}] {w['message']}")

import os
os.unlink(temp_path)

print(f"\n✅ Link-Validierung erkannte {len(link_errors)} Fehler!")
EOF
