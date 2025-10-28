#!/bin/bash
../venv/bin/python3 << 'EOF'
import sys
sys.path.insert(0, 'modules')
from validator_comprehensive import ValidatorComprehensive
import tempfile
from pathlib import Path
from PIL import Image

# Erstelle temporäres Test-Verzeichnis
test_dir = Path(tempfile.mkdtemp())

# Erstelle Test-Bilder
small_img = Image.new('RGB', (50, 50), color='red')
small_img.save(test_dir / 'too-small.jpg')

normal_img = Image.new('RGB', (800, 600), color='blue')
normal_img.save(test_dir / 'normal.jpg')

large_img = Image.new('RGB', (5000, 3000), color='green')
large_img.save(test_dir / 'too-large.png')

print(f"✅ Test-Bilder erstellt in {test_dir}")

# HTML mit Media-Referenzen
html_with_media = f"""<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Test Media</title>
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "LearningResource",
        "identifier": "test-media",
        "name": "Test Section für Media-Validierung",
        "description": "Dies testet die Media-Validierung mit Bildern und Videos verschiedener Formate und Größen.",
        "inLanguage": "de",
        "learningResourceType": "Guide"
    }}
    </script>
</head>
<body>
    <section class="content-section" id="test" data-section="test" data-level="1" data-title="Test" lang="de">
        <h1>Test Media</h1>
        
        <!-- Bild ohne src -->
        <img alt="Fehlt src">
        
        <!-- Zu kleines Bild -->
        <img src="too-small.jpg" alt="Zu klein">
        
        <!-- Normales Bild -->
        <img src="normal.jpg" alt="Normal">
        
        <!-- Zu großes Bild -->
        <img src="too-large.png" alt="Zu groß">
        
        <!-- Nicht-existierendes Bild -->
        <img src="missing.jpg" alt="Fehlt">
        
        <!-- Externes Bild -->
        <img src="https://example.com/external.jpg" alt="Extern">
        
        <!-- Video ohne poster -->
        <video>
            <source src="missing-video.mp4" type="video/mp4">
        </video>
        
        <!-- Media-Button ohne data-media-id -->
        <button class="media-help-trigger">Screenshot anfordern</button>
        
        <!-- Media-Button ohne aria-label -->
        <button class="media-help-trigger" data-media-id="media-1">Screenshot</button>
    </section>
</body>
</html>"""

html_file = test_dir / 'test.html'
html_file.write_text(html_with_media)

print("🧪 Test: Media-Validierung")
print("="*60)
validator = ValidatorComprehensive(
    json_schema_path='schemas/section-metadata.schema.json'
)
result = validator.validate_section_html(str(html_file))

print(f"Valid: {result['valid']}")
print(f"Errors: {len(result['errors'])}")
print(f"Warnings: {len(result['warnings'])}")

media_errors = [e for e in result['errors'] if e['type'].startswith('media')]
media_warnings = [w for w in result['warnings'] if w['type'].startswith('media')]

print(f"\nMedia-Spezifisch: {len(media_errors)} Fehler, {len(media_warnings)} Warnungen")

if media_errors:
    print("\n❌ Media-Fehler:")
    for e in media_errors[:5]:
        print(f"  [{e['type']}] {e['message'][:80]}")

if media_warnings:
    print(f"\n⚠️  Media-Warnungen (erste 5):")
    for w in media_warnings[:5]:
        print(f"  [{w['type']}] {w['message'][:80]}")

# Cleanup
import shutil
shutil.rmtree(test_dir)

print(f"\n✅ Media-Validierung erkannte {len(media_errors)} Fehler und {len(media_warnings)} Warnungen!")
EOF
