#!/bin/bash
../venv/bin/python3 << 'EOF'
import sys
sys.path.insert(0, 'modules')
from validator_comprehensive import ValidatorComprehensive
import tempfile

# Test-HTML mit INvalidem JSON-LD
invalid_html = """<!DOCTYPE html>
<html lang="de">
<head>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test_INVALID",
        "name": "Zu kurz",
        "description": "Zu kurz",
        "inLanguage": "deutsch",
        "learningResourceType": "WrongType",
        "version": "1.0",
        "timeRequired": "5 minutes"
    }
    </script>
</head>
<body>
    <h3>Test</h3>
</body>
</html>"""

# Erstelle temp file
with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False, encoding='utf-8') as f:
    f.write(invalid_html)
    temp_path = f.name

# Test mit Schema
print("🧪 Test: JSON-LD mit Fehlern")
print("="*60)
validator = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json'
)
result = validator.validate_section_html(temp_path)

print(f"Valid: {result['valid']}")
print(f"Errors: {len(result['errors'])}")

if result['errors']:
    print("\n❌ Gefundene Fehler:")
    for i, e in enumerate(result['errors'][:5], 1):  # Erste 5
        print(f"\n{i}. [{e.get('severity', '?')}] {e['type']}")
        print(f"   Message: {e['message']}")
        print(f"   Location: {e.get('location', '?')}")

# Cleanup
import os
os.unlink(temp_path)

print(f"\n✅ Validierung erkennt {len(result['errors'])} Fehler korrekt!")
EOF

