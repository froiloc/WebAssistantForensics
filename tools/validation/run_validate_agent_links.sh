#!/bin/bash
# backup index.html and manipulate index.html to introduce some flaws
./validate_agent_links_prepare_test.py

# replace original index.html be the modified one
if [ -f '../../src/index.test.html' ]
then
	cp '../../src/index.{test.,}html'
else
	echo "ERROR: Could not find modified index.test.html" >&2
	return 1
fi

# run the validation and detect the flawes
./validate_agent_links.py

# restore the original index.html from its backup.
./validate_agent_links_prepare_test.py restore

# replace original index.html be the modified one
if [ -f '../../src/index.html.backup' ]
then
	cp '../../src/index.html{.backup,}'
else
	echo "ERROR: Could not find backuped index.html.backup" >&2
	return 1
fi

# re-run the validation and detect no flaws.
./validate_agent_links.py
