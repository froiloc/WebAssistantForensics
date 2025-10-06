#!/usr/bin/env python3
"""
Enhanced Test Script for Agent Dialog Validator
Creates a modified HTML file with various edge case flaws for comprehensive testing
"""

import shutil
import re
from pathlib import Path


def create_test_html():
    """Create a test HTML file with various intentional breaks and edge cases."""
    base_dir = Path(".").resolve()
    src_dir = base_dir / "../../src"
    original_html = src_dir / "index.html"
    test_html = src_dir / "index.test.html"

    # Create backup of original
    backup_html = src_dir / "index.html.backup"
    if not backup_html.exists():
        shutil.copy2(original_html, backup_html)
        print("✅ Created backup of index.html")

    # Read original content
    with open(original_html, 'r', encoding='utf-8') as f:
        content = f.read()

    # Apply intentional breaks for testing various edge cases
    modified_content = content

    # EDGE CASE 1: Changed IDs (basic selector breaks)
    modified_content = modified_content.replace(
        'id="section-step2"',
        'id="section-step2-changed"'
    )

    # EDGE CASE 2: Changed data-ref attributes
    modified_content = modified_content.replace(
        'data-ref="format-options"',
        'data-ref="format-options-removed"'
    )
    modified_content = modified_content.replace(
        'data-ref="step1-basic"',
        'data-ref="step1-basic-removed"'
    )

    # EDGE CASE 3: Changed classes
    modified_content = modified_content.replace(
        'class="detail-level-3"',
        'class="detail-level-3-modified"',
        1  # Only replace the first occurrence
    )

    # EDGE CASE 4: Add elements with special characters in attributes
    special_chars_section = '''
    <!-- EDGE CASE: Special characters in attributes -->
    <div id="special[chars]" data-ref="format[1].item" class="test@class">
        <p data-ref="quote\"test">Content with special chars</p>
    </div>
    '''
    modified_content = modified_content.replace(
        '<!-- Best Practices -->',
        special_chars_section + '\n    <!-- Best Practices -->'
    )

    # EDGE CASE 5: Add duplicate IDs (invalid HTML but real-world scenario)
    duplicate_id_section = '''
    <!-- EDGE CASE: Duplicate ID -->
    <div id="section-step2-changed" class="duplicate-section">
        <p>This is a duplicate ID - invalid HTML but happens in practice</p>
    </div>
    '''
    modified_content = modified_content.replace(
        '<!-- Zusammenfassung -->',
        duplicate_id_section + '\n    <!-- Zusammenfassung -->'
    )

    # EDGE CASE 6: Add nested elements with similar selectors
    nested_section = '''
    <!-- EDGE CASE: Nested similar elements -->
    <div class="detail-level-3" id="nested-parent">
        <div class="detail-level-3" id="nested-child">
            <p data-ref="nested-content">Nested element content</p>
        </div>
    </div>
    '''
    modified_content = modified_content.replace(
        '</section>',
        nested_section + '\n    </section>'
    )

    # EDGE CASE 7: Add elements with CSS pseudo-classes in data attributes
    pseudo_class_section = '''
    <!-- EDGE CASE: CSS pseudo-class like syntax in data attributes -->
    <div data-ref="item:hover" class="pseudo-test">
        <p data-ref="nth:child(2)">Pseudo-class like syntax</p>
    </div>
    '''
    modified_content = modified_content.replace(
        '<footer>',
        pseudo_class_section + '\n    <footer>'
    )

    # EDGE CASE 8: Add empty attributes
    empty_attr_section = '''
    <!-- EDGE CASE: Empty attributes -->
    <div id="" data-ref="" class="">
        <p>Elements with empty attributes</p>
    </div>
    '''
    modified_content = modified_content.replace(
        '<footer>',
        empty_attr_section + '\n    <footer>'
    )

    # EDGE CASE 9: Add very long attribute values
    long_attr_section = f'''
    <!-- EDGE CASE: Long attribute values -->
    <div id="{'x' * 100}" data-ref="{'format-' + '-'.join(str(i) for i in range(50))}">
        <p>Element with very long attributes</p>
    </div>
    '''
    modified_content = modified_content.replace(
        '<footer>',
        long_attr_section + '\n    <footer>'
    )

    # Write test file
    with open(test_html, 'w', encoding='utf-8') as f:
        f.write(modified_content)

    print("✅ Created enhanced test HTML file with comprehensive edge cases")
    print("📝 Applied edge case breaks:")
    print("   1. Changed ID: 'section-step2' → 'section-step2-changed'")
    print("   2. Changed data-ref: 'format-options' → 'format-options-removed'")
    print("   3. Changed data-ref: 'step1-basic' → 'step1-basic-removed'")
    print("   4. Changed class: 'detail-level-3' → 'detail-level-3-modified' (first occurrence)")
    print("   5. Added elements with special characters in attributes")
    print("   6. Added duplicate ID scenario")
    print("   7. Added nested elements with similar selectors")
    print("   8. Added CSS pseudo-class like syntax in data attributes")
    print("   9. Added elements with empty attributes")
    print("  10. Added elements with very long attribute values")

    return test_html


def restore_original():
    """Restore the original HTML file from backup."""
    base_dir = Path(".").resolve()
    src_dir = base_dir / "src"
    original_html = src_dir / "index.html"
    backup_html = src_dir / "index.html.backup"

    if backup_html.exists():
        shutil.copy2(backup_html, original_html)
        print("✅ Restored original index.html from backup")

        # Clean up test files
        test_html = src_dir / "index.test.html"
        if test_html.exists():
            test_html.unlink()
            print("✅ Removed test HTML file")
    else:
        print("❌ No backup found to restore from")


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "restore":
        restore_original()
    else:
        create_test_html()
