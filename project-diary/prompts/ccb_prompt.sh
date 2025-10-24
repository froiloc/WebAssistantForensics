#!/bin/bash
find ../exports/ -type f -iname "0??.Claude*_iso.json" -execdir sh -c 'clear; echo "$@"; sed "s#024.Claude-Brainstorming%20Prompt-Erstellung%20(2!5)_iso.json#$(echo ${@#./} | sed "s# #%20#g")#" /opt/WebAssistantForensics/project-diary/prompts/prompt-Chatverlauf-Dokumentation.v4.0.md | xclip -selection clipboard' _ "{}" \; -exec sh -c 'read -p "Press Enter to continue" dummy' \;
