#!/bin/bash
../venv/bin/python3 << 'EOF'
import sys
sys.path.insert(0, 'modules')
from validator_comprehensive import ValidatorComprehensive
import tempfile

# Test-HTML mit verschiedenen HTML5-Problemen
html_with_issues = """<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test-section",
        "name": "Test Section für HTML5 Validierung",
        "description": "Dies ist eine Test-Section um die HTML5 Validierung zu testen. Sie enthält alle Pflichtfelder.",
        "inLanguage": "de",
        "learningResourceType": "Guide"
    }
    </script>
</head>
<body>
    <center>
        <font color="red" size="3">Alter Stil</font>
    </center>
    
    <table border="1" cellpadding="5" cellspacing="0" align="center" bgcolor="#eeeeee">
        <tr>
            <td>Test</td>
        </tr>
    </table>
    
    <div role="invalid-role" aria-label="Test" aria-unknown="value">
        Content
    </div>
</body>
</html>"""

# Erstelle temp file
with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False, encoding='utf-8') as f:
    f.write(html_with_issues)
    temp_path = f.name

# Test HTML5 Validierung
print("🧪 Test: HTML5 Validierung mit Problemen")
print("="*60)
validator = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json'
)
result = validator.validate_section_html(temp_path)

print(f"Valid: {result['valid']}")
print(f"Errors: {len(result['errors'])}")
print(f"Warnings: {len(result['warnings'])}")

if result['errors']:
    print("\n❌ Fehler (erste 5):")
    for i, e in enumerate(result['errors'][:5], 1):
        print(f"\n{i}. [{e.get('type', '?')}] {e.get('severity', '?')}")
        print(f"   {e['message']}")

if result['warnings']:
    print(f"\n⚠️  Warnungen (erste 5 von {len(result['warnings'])}):")
    for i, w in enumerate(result['warnings'][:5], 1):
        print(f"\n{i}. [{w.get('type', '?')}]")
        print(f"   {w['message']}")

# Cleanup
import os
os.unlink(temp_path)

print(f"\n✅ HTML5 Validierung erkannte {len(result['errors'])} Fehler und {len(result['warnings'])} Warnungen!")
EOF
