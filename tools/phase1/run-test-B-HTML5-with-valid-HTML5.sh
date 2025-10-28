#!/bin/bash
../venv/bin/python3 << 'EOF'
import sys
sys.path.insert(0, 'modules')
from validator_comprehensive import ValidatorComprehensive
import tempfile

# Valides HTML5
valid_html5 = """<!DOCTYPE html>
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
        "description": "Dies ist eine Test-Section um die Validierung zu testen. Sie enthält alle Pflichtfelder.",
        "inLanguage": "de",
        "learningResourceType": "Guide",
        "version": "1.0.0"
    }
    </script>
</head>
<body>
    <main>
        <section id="test-section">
            <h1>Test Section</h1>
            <p>Modernes, sauberes HTML5.</p>
            <div role="region" aria-label="Test Region">
                <p>Content here.</p>
            </div>
        </section>
    </main>
</body>
</html>"""

with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False, encoding='utf-8') as f:
    f.write(valid_html5)
    temp_path = f.name

print("🧪 Test: Valides HTML5")
print("="*60)
validator = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json'
)
result = validator.validate_section_html(temp_path)

print(f"Valid: {result['valid']}")
print(f"Errors: {len(result['errors'])}")
print(f"Warnings: {len(result['warnings'])}")

if result['valid']:
    print("\n✅ Perfekt! Sauberes HTML5 wird akzeptiert!")
else:
    print("\n❌ Fehler:")
    for e in result['errors']:
        print(f"  - {e['message']}")

import os
os.unlink(temp_path)
EOF

