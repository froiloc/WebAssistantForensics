"""Modul 4: Prompt für KI generieren"""

import logging
from pathlib import Path

logger = logging.getLogger(__name__)


class PromptGenerator:
    """Generiert Prompt für Phase 1 KI"""
    
    def __init__(self, template_path: str):
        """
        Initialisiert Generator
        
        Args:
            template_path: Pfad zum Prompt-Template
        """
        self.template_path = Path(template_path)
        logger.info(f"📝 PromptGenerator initialisiert (Dummy)")
        
        # TODO: Template laden
        # self.template = self._load_template()
    
    def generate_prompt(self, context: dict) -> str:
        """
        Generiert Prompt basierend auf Kontext
        
        Args:
            context: Extrahierter Kontext (von ContextExtractor)
                {
                    "current_section": {...},
                    "predecessors": [...],
                    "successors": [...],
                    "prerequisites": [...],
                    "cross_references": [...]
                }
        
        Returns:
            Vollständiger Prompt als String
        """
        logger.debug(f"Generiere Prompt (Dummy)")
        
        section_id = context['current_section']['sectionId']
        section_title = context['current_section']['title']
        
        # TODO: Echte Implementierung (Template füllen)
        # 1. Lade Strategiedokument
        # 2. Lade JSON-LD Schema
        # 3. Lade HTML-Template-Spezifikation
        # 4. Lade Terminologie-Entscheidungsliste
        # 5. Fülle Template mit Kontext
        
        # Dummy-Prompt
        prompt = f"""# Phase 1 Prompt (DUMMY)

## Section: {section_id}
## Titel: {section_title}

---

### [Hier würde der vollständige Prompt stehen]

**Enthaltene Komponenten:**
- Strategiedokument
- Section-Metadaten (current)
- Vorgänger-HTML ({len(context.get('predecessors', []))} Sections)
- Nachfolger-Metadaten ({len(context.get('successors', []))} Sections)
- Prerequisites-HTML ({len(context.get('prerequisites', []))} Sections)
- Cross-Refs-Metadaten ({len(context.get('cross_references', []))} Sections)
- JSON-LD-Schema
- HTML-Template-Spezifikation
- Terminologie-Entscheidungsliste
- Getting Started Dokument (Stil-Richtlinien)

---

## Section-Metadaten

**Learning Objective:**
{context['current_section'].get('learningObjective', 'N/A')}

**Complexity:**
{context['current_section'].get('complexity', 'N/A')}

**Key Topics:**
"""
        
        # Key Topics hinzufügen
        for topic in context['current_section'].get('keyTopics', []):
            prompt += f"\n- {topic}"
        
        prompt += "\n\n---\n\n[Rest des Prompts würde hier folgen...]"
        
        return prompt
