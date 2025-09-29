#!/bin/bash
python="$(whereis python3 | awk '{print $2}')"
# Aus ./tools/validation/ heraus:
cd ./validation
"${python}" validate_html_structure.py ../../src/index.html --verbose
"${python}" validate_agent_json.py ../../src/agent-dialogs.json ../../src/index.html --schema ../../schema/agent-dialogs.schema.json
cd ..
