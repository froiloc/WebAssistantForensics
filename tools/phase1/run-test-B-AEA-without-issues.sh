#!/bin/bash
../venv/bin/python3 << 'EOF'
import sys
sys.path.insert(0, 'modules')
from validator_comprehensive import ValidatorComprehensive
import tempfile

# Barrierefreies HTML
accessible_html = """<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Barrierefreie Test-Section</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test",
        "name": "Barrierefreie Test Section",
        "description": "Dies ist eine barrierefreie Test-Section die alle BFSG-Anforderungen erfüllt.",
        "inLanguage": "de",
        "learningResourceType": "Guide",
        "version": "1.0.0"
    }
    </script>
</head>
<body>
    <nav role="navigation" aria-label="Hauptnavigation">
        <a href="#main">Zum Hauptinhalt springen</a>
    </nav>
    
    <main id="main">
        <h1>Barrierefreie Section</h1>
        
        <p>Dies ist barrierefreier Inhalt.</p>
        
        <img src="screenshot.jpg" alt="Screenshot der AXIOM Examine Oberfläche mit geöffnetem Case">
        
        <form>
            <label for="username">Benutzername:</label>
            <input type="text" id="username" name="username">
            
            <button type="submit">Absenden</button>
        </form>
        
        <a href="details.html">Mehr Informationen zu AXIOM Examine</a>
    </main>
</body>
</html>"""

with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False, encoding='utf-8') as f:
    f.write(accessible_html)
    temp_path = f.name

print("🧪 Test: Barrierefreies HTML")
print("="*60)
validator = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json'
)
result = validator.validate_section_html(temp_path)

print(f"Valid: {result['valid']}")
print(f"Errors: {len(result['errors'])}")
print(f"Warnings: {len(result['warnings'])}")

bfsg_errors = [e for e in result['errors'] if e['type'].startswith('bfsg')]
bfsg_warnings = [w for w in result['warnings'] if w['type'].startswith('bfsg')]

print(f"BFSG-Spezifisch: {len(bfsg_errors)} Fehler, {len(bfsg_warnings)} Warnungen")

if result['valid']:
    print("\n✅ Perfekt! Barrierefreies HTML wird akzeptiert!")
else:
    print("\n❌ Fehler:")
    for e in result['errors']:
        print(f"  - {e['message']}")

import os
os.unlink(temp_path)
EOF
