#!/bin/bash
../venv/bin/python3 << 'EOF'
import sys
sys.path.insert(0, 'modules')
from validator_comprehensive import ValidatorComprehensive
import tempfile

# Test-HTML mit validem JSON-LD
valid_html = """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Test Section</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test-section",
        "name": "Test Section für Validierung",
        "description": "Dies ist eine Test-Section um die JSON-LD Validierung zu testen. Sie enthält alle Pflichtfelder.",
        "inLanguage": "de",
        "learningResourceType": "Guide",
        "version": "1.0.0",
        "timeRequired": "PT5M"
    }
    </script>
</head>
<body>
    <section id="test-section">
        <h3>Test Section</h3>
        <p>Content here.</p>
    </section>
</body>
</html>"""

# Erstelle temp file
with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False, encoding='utf-8') as f:
    f.write(valid_html)
    temp_path = f.name

# Test ohne Schema (Fallback)
print("🧪 Test 1: JSON-LD Validierung OHNE Schema (Fallback)")
print("="*60)
validator = ValidatorComprehensive()
result = validator.validate_section_html(temp_path)

print(f"Valid: {result['valid']}")
print(f"Errors: {len(result['errors'])}")
print(f"Warnings: {len(result['warnings'])}")

if result['warnings']:
    print("\nWarnungen:")
    for w in result['warnings']:
        print(f"  ⚠️ [{w['type']}] {w['message']}")

if result['errors']:
    print("\nFehler:")
    for e in result['errors']:
        print(f"  ❌ [{e['type']}] {e['message']}")

# Test mit Schema
print("\n\n🧪 Test 2: JSON-LD Validierung MIT Schema")
print("="*60)
validator2 = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json'
)
result2 = validator2.validate_section_html(temp_path)

print(f"Valid: {result2['valid']}")
print(f"Errors: {len(result2['errors'])}")
print(f"Warnings: {len(result2['warnings'])}")

if result2['errors']:
    print("\nFehler:")
    for e in result2['errors']:
        print(f"  ❌ [{e['type']}] {e['message']}")
        if 'location' in e:
            print(f"      Location: {e['location']}")

# Cleanup
import os
os.unlink(temp_path)

if result2['valid']:
    print("\n✅ JSON-LD Validierung funktioniert!")
else:
    print("\n⚠️ Es gab Validierungs-Fehler")
EOF
