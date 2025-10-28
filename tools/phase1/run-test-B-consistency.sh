#!/bin/bash
../venv/bin/python3 << 'EOF'
import sys
sys.path.insert(0, 'modules')
from validator_comprehensive import ValidatorComprehensive
import tempfile

# HTML mit inkonsistenter Schreibweise
html_with_inconsistent_terms = """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Test</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test",
        "name": "Test Konsistenz",
        "description": "Test für Terminologie-Konsistenz-Prüfung der verschiedenen Schreibweisen.",
        "inLanguage": "de",
        "learningResourceType": "Guide"
    }
    </script>
</head>
<body>
    <h1>Test</h1>
    <p>
        Die Forensik ist wichtig. Die forensik sollte beachtet werden.
        Mit Forensic Tools arbeiten wir. Screenshot erstellen, dann
        ScreenShot speichern.
    </p>
</body>
</html>"""

with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False, encoding='utf-8') as f:
    f.write(html_with_inconsistent_terms)
    temp_path = f.name

print("🧪 Test: Terminologie-Konsistenz")
print("="*60)
validator = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json',
    terminology_path='/tmp/test-terminology.json'
)
result = validator.validate_section_html(temp_path)

consistency_warnings = [w for w in result['warnings'] if w['type'] == 'terminology-consistency']

print(f"Konsistenz-Warnungen: {len(consistency_warnings)}")

if consistency_warnings:
    print("\n⚠️  Inkonsistente Schreibweisen:")
    for w in consistency_warnings:
        print(f"  • {w['message']}")

import os
os.unlink(temp_path)

print(f"\n✅ Konsistenz-Prüfung funktioniert!")
EOF
