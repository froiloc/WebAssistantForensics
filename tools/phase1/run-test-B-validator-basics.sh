#!/bin/bash
../venv/bin/python3 << 'EOF'
# Test: Kann validator_comprehensive importiert werden?
import sys
sys.path.insert(0, 'modules')

try:
    from validator_comprehensive import ValidatorComprehensive
    print("✅ Import erfolgreich")
    
    # Test: Kann Validator initialisiert werden?
    validator = ValidatorComprehensive()
    print(f"✅ Initialisierung erfolgreich")
    print(f"   Config-Keys: {list(validator.config.keys())[:5]}...")
    print(f"   Stats: {validator.stats}")
    
    # Test: Methoden vorhanden?
    methods = [
        '_validate_json_ld_comprehensive',
        '_validate_html5',
        '_validate_bfsg_comprehensive',
        '_validate_links_comprehensive',
        '_validate_terminology_comprehensive',
        '_validate_structure',
        '_validate_media'
    ]
    
    print("\n✅ Alle Methoden vorhanden:")
    for method in methods:
        if hasattr(validator, method):
            print(f"   ✓ {method}")
        else:
            print(f"   ✗ {method} FEHLT")
            sys.exit(1)
    
    print("\n🎉 Grundstruktur ist funktionsfähig!")
    
except Exception as e:
    print(f"❌ Fehler: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
EOF
