#!/bin/bash
../venv/bin/python3 << 'EOF'
import sys
import json
import tempfile
sys.path.insert(0, 'modules')
from validator_comprehensive import ValidatorComprehensive
from gliederung_loader import GliederungLoader

# Erstelle Mock-Gliederung
mock_gliederung = {
    "schemaVersion": "1.0.0",
    "sections": [
        {
            "sectionId": "section-intro",
            "predecessorSection": None,
            "successorSection": "test-section",
            "prerequisites": {"contentual": []}
        },
        {
            "sectionId": "test-section",
            "predecessorSection": "section-intro",
            "successorSection": "section-outro",
            "prerequisites": {"contentual": ["section-intro"]},
            "crossReferences": [
                {"sectionId": "related-section", "reason": "Verweis"}
            ]
        },
        {
            "sectionId": "section-outro",
            "predecessorSection": "test-section",
            "successorSection": None,
            "prerequisites": {"contentual": []}
        },
        {
            "sectionId": "related-section",
            "predecessorSection": None,
            "successorSection": None,
            "prerequisites": {"contentual": []}
        }
    ]
}

# Erstelle temp Gliederung
with tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False) as f:
    json.dump(mock_gliederung, f)
    gliederung_path = f.name

# HTML mit Cross-References
html_with_cross_refs = """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Test Section</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test-section",
        "name": "Test Section für Link-Validierung mit Gliederung",
        "description": "Dies testet Cross-References gegen die Gliederung.",
        "inLanguage": "de",
        "learningResourceType": "Guide",
        "predecessor": "section-intro",
        "successor": "section-outro",
        "requires": ["section-intro"],
        "relatedLink": [
            {"@type": "LinkRole", "url": "#related-section", "name": "Verwandte Section"},
            {"@type": "LinkRole", "url": "#non-existing", "name": "Tote Section"}
        ]
    }
    </script>
</head>
<body>
    <h1>Test Section</h1>
    
    <!-- Link zu related-section (existiert in Gliederung) -->
    <a href="#related-section">Verwandte Section</a>
    
    <!-- Link zu non-existing (existiert NICHT in Gliederung) -->
    <a href="#non-existing">Tote Cross-Reference</a>
    
    <!-- Fehlende Links zu Predecessor/Successor/Prerequisites -->
</body>
</html>"""

with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False) as f:
    f.write(html_with_cross_refs)
    html_path = f.name

# Lade Gliederung
gliederung_loader = GliederungLoader(gliederung_path)

print("🧪 Test: Link-Validierung (mit GliederungLoader)")
print("="*60)
validator = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json',
    gliederung_loader=gliederung_loader
)
result = validator.validate_section_html(html_path, section_id='test-section')

print(f"Valid: {result['valid']}")
print(f"Errors: {len(result['errors'])}")
print(f"Warnings: {len(result['warnings'])}")

link_errors = [e for e in result['errors'] if e['type'].startswith('link')]
link_warnings = [w for w in result['warnings'] if w['type'].startswith('link')]

print(f"\nLink-Spezifisch: {len(link_errors)} Fehler, {len(link_warnings)} Warnungen")

if link_errors:
    print("\n❌ Link-Fehler:")
    for e in link_errors[:5]:
        print(f"  [{e['type']}] {e['message']}")

if link_warnings:
    print(f"\n⚠️  Link-Warnungen:")
    for w in link_warnings:
        print(f"  [{w['type']}] {w['message']}")

import os
os.unlink(gliederung_path)
os.unlink(html_path)

print(f"\n✅ Link-Validierung mit Gliederung erkannte {len(link_errors)} Fehler und {len(link_warnings)} Warnungen!")
EOF

