#!/usr/bin/env python3
"""
Phase 0.5 Orchestrierungs-Skript
================================
Koordiniert den mehrstufigen Gliederungs-Workflow:
- Phase 0.5a: Topic-Definition
- Phase 0.5b: Chapter-Definition (pro Topic)
- Phase 0.5c: Konsistenz-Review (KI-gestützt, aktuell Dummy)

Verwendung:
    python orchestrate_phase0_5.py --strategy strategiedokument-axiom.md
"""

import json
import jsonschema
import argparse
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional
import sys

# ============================================================================
# KONFIGURATION
# ============================================================================

class Config:
    """Zentrale Konfiguration für alle Phasen"""
    
    # Verzeichnisse
    BASE_DIR = Path(__file__).parent
    SCHEMAS_DIR = BASE_DIR / "schemas"
    OUTPUT_DIR = BASE_DIR / "output"
    PROMPTS_DIR = BASE_DIR / "prompts"
    
    # Schema-Dateien
    SCHEMA_0_5A = SCHEMAS_DIR / "output-phase0.5a-topics.schema.json"
    SCHEMA_0_5B = SCHEMAS_DIR / "output-phase0.5b-chapters.schema.json"
    SCHEMA_0_5C = SCHEMAS_DIR / "output-phase0.5c-review.schema.json"
    
    # Output-Dateien
    OUTPUT_0_5A = OUTPUT_DIR / "output-phase0.5a-topics.json"
    OUTPUT_0_5B_TEMPLATE = OUTPUT_DIR / "output-phase0.5b-topic-{}-chapters.json"
    OUTPUT_0_5C = OUTPUT_DIR / "output-phase0.5c-review.json"
    OUTPUT_0_5_FINAL = OUTPUT_DIR / "output-phase0.5-final.json"
    
    # Prompt-Templates
    PROMPT_0_5A = PROMPTS_DIR / "prompt-phase0.5a-topics.md"
    PROMPT_0_5B = PROMPTS_DIR / "prompt-phase0.5b-chapters.md"
    PROMPT_0_5C = PROMPTS_DIR / "prompt-phase0.5c-review.md"
    
    # Validierung
    STRICT_VALIDATION = True  # Bei False: Warnings statt Errors
    
    # Dummy-Mode für Phase 0.5c
    USE_DUMMY_REVIEW = True  # Später auf False setzen für echtes Review

# ============================================================================
# VALIDIERUNG
# ============================================================================

class Validator:
    """JSON-Schema-Validierung"""
    
    @staticmethod
    def load_schema(schema_path: Path) -> Dict:
        """Lädt JSON-Schema"""
        try:
            with open(schema_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"❌ Schema nicht gefunden: {schema_path}")
            sys.exit(1)
        except json.JSONDecodeError as e:
            print(f"❌ Schema ist kein valides JSON: {schema_path}\n{e}")
            sys.exit(1)
    
    @staticmethod
    def validate_json(data: Dict, schema: Dict, phase: str) -> tuple[bool, List[str]]:
        """
        Validiert JSON gegen Schema
        Returns: (is_valid, error_messages)
        """
        errors = []
        
        try:
            jsonschema.validate(instance=data, schema=schema)
            print(f"✅ {phase}: JSON ist schema-konform")
            return True, []
        except jsonschema.ValidationError as e:
            error_msg = f"{phase}: Validierungsfehler - {e.message}"
            if e.path:
                error_msg += f" (Pfad: {' → '.join(str(p) for p in e.path)})"
            errors.append(error_msg)
            
            if Config.STRICT_VALIDATION:
                print(f"❌ {error_msg}")
                return False, errors
            else:
                print(f"⚠️  {error_msg} (WARNING - fortgesetzt)")
                return True, errors
        except jsonschema.SchemaError as e:
            print(f"❌ {phase}: Schema selbst ist fehlerhaft - {e.message}")
            return False, [str(e)]

# ============================================================================
# PHASE 0.5a: TOPIC-DEFINITION
# ============================================================================

class Phase0_5a:
    """Topic-Ebene Gliederung erstellen"""
    
    def __init__(self, strategy_doc_path: Path):
        self.strategy_doc_path = strategy_doc_path
        self.schema = Validator.load_schema(Config.SCHEMA_0_5A)
    
    def prepare_prompt(self) -> str:
        """
        Erstellt Prompt für KI (Phase 0.5a)
        Kombiniert: Prompt-Template + Strategiedokument + Schema
        """
        print("\n📋 Phase 0.5a: Erstelle Prompt...")
        
        # Strategiedokument laden
        try:
            with open(self.strategy_doc_path, 'r', encoding='utf-8') as f:
                strategy_content = f.read()
        except FileNotFoundError:
            print(f"❌ Strategiedokument nicht gefunden: {self.strategy_doc_path}")
            sys.exit(1)
        
        # Prompt-Template laden (falls vorhanden)
        if Config.PROMPT_0_5A.exists():
            with open(Config.PROMPT_0_5A, 'r', encoding='utf-8') as f:
                prompt_template = f.read()
        else:
            # Fallback: Minimaler Prompt
            prompt_template = """
# Phase 0.5a: Topic-Definition

## Aufgabe
Erstelle eine Topic-Ebene Gliederung basierend auf dem Strategiedokument.

## Strategiedokument
{strategy_content}

## Output-Format
Erstelle ein valides JSON gemäß dem bereitgestellten Schema.

## Schema
{schema}

## Hinweise
- Berechne qualityMetrics selbst
- Fülle aiSelfReview aus (Unsicherheiten dokumentieren)
- Validiere JSON bevor du ausgibst
"""
        
        # Prompt zusammenbauen
        prompt = prompt_template.format(
            strategy_content=strategy_content,
            schema=json.dumps(self.schema, indent=2, ensure_ascii=False)
        )
        
        # Prompt speichern (für Nachvollziehbarkeit)
        prompt_output = Config.OUTPUT_DIR / "prompt-phase0.5a-generated.md"
        with open(prompt_output, 'w', encoding='utf-8') as f:
            f.write(prompt)
        
        print(f"✅ Prompt gespeichert: {prompt_output}")
        return prompt
    
    def validate_output(self, output_path: Path) -> bool:
        """Validiert KI-Output gegen Schema"""
        print(f"\n🔍 Phase 0.5a: Validiere Output...")
        
        try:
            with open(output_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except FileNotFoundError:
            print(f"❌ Output-Datei nicht gefunden: {output_path}")
            return False
        except json.JSONDecodeError as e:
            print(f"❌ Output ist kein valides JSON: {output_path}\n{e}")
            return False
        
        is_valid, errors = Validator.validate_json(data, self.schema, "Phase 0.5a")
        
        if is_valid:
            # Zusätzliche Checks
            self._additional_checks(data)
        
        return is_valid
    
    def _additional_checks(self, data: Dict):
        """Zusätzliche Plausibilitätsprüfungen"""
        print("\n🔍 Zusätzliche Checks...")
        
        # Check: Sind qualityMetrics korrekt berechnet?
        topics = data.get("topics", [])
        calc_total_chapters = sum(t.get("estimatedChapters", 0) for t in topics)
        calc_total_sections = sum(t.get("estimatedSections", 0) for t in topics)
        
        metrics = data.get("qualityMetrics", {})
        stated_chapters = metrics.get("totalEstimatedChapters", 0)
        stated_sections = metrics.get("totalEstimatedSections", 0)
        
        if calc_total_chapters != stated_chapters:
            print(f"⚠️  Warnung: totalEstimatedChapters ({stated_chapters}) stimmt nicht mit Summe überein ({calc_total_chapters})")
        else:
            print(f"✅ totalEstimatedChapters korrekt: {stated_chapters}")
        
        if calc_total_sections != stated_sections:
            print(f"⚠️  Warnung: totalEstimatedSections ({stated_sections}) stimmt nicht mit Summe überein ({calc_total_sections})")
        else:
            print(f"✅ totalEstimatedSections korrekt: {stated_sections}")
        
        # Check: Sind Topics im Rahmen der Vorgaben? (3-8 Chapters, 18-120 Sections pro Topic)
        for topic in topics:
            tid = topic.get("topicId")
            chapters = topic.get("estimatedChapters", 0)
            sections = topic.get("estimatedSections", 0)
            
            if not (3 <= chapters <= 8):
                print(f"⚠️  {tid}: estimatedChapters ({chapters}) außerhalb Vorgaben (3-8)")
            
            if not (18 <= sections <= 120):
                print(f"⚠️  {tid}: estimatedSections ({sections}) außerhalb Vorgaben (18-120)")

# ============================================================================
# PHASE 0.5b: CHAPTER-DEFINITION
# ============================================================================

class Phase0_5b:
    """Chapter-Ebene Gliederung pro Topic erstellen"""
    
    def __init__(self, topics_json_path: Path):
        self.topics_json_path = topics_json_path
        self.schema = Validator.load_schema(Config.SCHEMA_0_5B)
        
        # Topics laden
        with open(topics_json_path, 'r', encoding='utf-8') as f:
            self.topics_data = json.load(f)
    
    def prepare_prompts(self) -> List[tuple[str, Path]]:
        """
        Erstellt Prompts für alle Topics
        Returns: Liste von (prompt_text, output_path) Tupeln
        """
        print("\n📋 Phase 0.5b: Erstelle Prompts für alle Topics...")
        
        prompts = []
        topics = self.topics_data.get("topics", [])
        
        for topic in topics:
            topic_id = topic["topicId"]
            topic_num = topic_id.split("-")[1]
            
            prompt = self._create_prompt_for_topic(topic)
            output_path = Path(str(Config.OUTPUT_0_5B_TEMPLATE).format(topic_num))
            
            # Prompt speichern
            prompt_file = Config.OUTPUT_DIR / f"prompt-phase0.5b-topic-{topic_num}-generated.md"
            with open(prompt_file, 'w', encoding='utf-8') as f:
                f.write(prompt)
            
            print(f"✅ Prompt gespeichert: {prompt_file}")
            prompts.append((prompt, output_path))
        
        return prompts
    
    def _create_prompt_for_topic(self, topic: Dict) -> str:
        """Erstellt Prompt für ein spezifisches Topic"""
        
        # Minimaler Prompt (kann später aus Template geladen werden)
        prompt = f"""
# Phase 0.5b: Chapter-Definition für {topic['topicId']}

## Topic-Informationen (aus Phase 0.5a)
- **Topic-ID:** {topic['topicId']}
- **Titel:** {topic['title']}
- **Lernziel:** {topic['learningObjective']}
- **Key Content:** {', '.join(topic['keyContent'])}
- **Geschätzte Chapters:** {topic['estimatedChapters']}
- **Geschätzte Sections:** {topic['estimatedSections']}

## Aufgabe
Detailliere dieses Topic in Chapters. Erstelle {topic['estimatedChapters']} Chapters mit insgesamt ~{topic['estimatedSections']} Sections.

## Output-Format
Erstelle valides JSON gemäß Schema (siehe unten).

## Schema
{json.dumps(self.schema, indent=2, ensure_ascii=False)}

## Wichtige Hinweise
- Pro Chapter: 6-15 Sections
- estimatedSections sollte nahe an {topic['estimatedSections']} sein (±10% OK)
- Fülle comparisonToPhase0_5a aus (erkläre Abweichungen)
- Identifiziere crossTopicConnections (zu anderen Topics)
- Fülle aiSelfReview aus
"""
        
        return prompt
    
    def validate_output(self, output_path: Path) -> bool:
        """Validiert Chapter-Definition für ein Topic"""
        print(f"\n🔍 Phase 0.5b: Validiere {output_path.name}...")
        
        try:
            with open(output_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except FileNotFoundError:
            print(f"❌ Output nicht gefunden: {output_path}")
            return False
        except json.JSONDecodeError as e:
            print(f"❌ Kein valides JSON: {output_path}\n{e}")
            return False
        
        is_valid, errors = Validator.validate_json(data, self.schema, f"Phase 0.5b ({output_path.name})")
        
        if is_valid:
            self._additional_checks(data)
        
        return is_valid
    
    def _additional_checks(self, data: Dict):
        """Zusätzliche Plausibilitätsprüfungen"""
        print("\n🔍 Zusätzliche Checks...")
        
        # Check: Stimmt totalEstimatedSections mit Summe überein?
        chapters = data.get("chapters", [])
        calc_total = sum(c.get("estimatedSections", 0) for c in chapters)
        stated_total = data["qualityMetrics"]["totalEstimatedSections"]
        
        if calc_total != stated_total:
            print(f"⚠️  totalEstimatedSections ({stated_total}) ≠ Summe ({calc_total})")
        else:
            print(f"✅ totalEstimatedSections korrekt: {stated_total}")
        
        # Check: Weicht estimatedSections stark von Phase 0.5a ab?
        topic_ref = data.get("topicReference", {})
        original_estimate = topic_ref.get("estimatedSectionsFromPhase0_5a", 0)
        difference = stated_total - original_estimate
        
        if abs(difference) > original_estimate * 0.3:  # >30% Abweichung
            print(f"⚠️  Große Abweichung von Phase 0.5a: {difference:+d} Sections ({difference/original_estimate*100:+.1f}%)")
        else:
            print(f"✅ Abweichung akzeptabel: {difference:+d} Sections")

# ============================================================================
# PHASE 0.5c: KONSISTENZ-REVIEW (DUMMY)
# ============================================================================

class Phase0_5c:
    """KI-gestütztes Konsistenz-Review (aktuell: Dummy)"""
    
    def __init__(self, topics_json: Path, chapters_jsons: List[Path]):
        self.topics_json = topics_json
        self.chapters_jsons = chapters_jsons
        self.schema = Validator.load_schema(Config.SCHEMA_0_5C)
    
    def generate_review(self) -> Dict:
        """Generiert Review (Dummy oder echt, abhängig von Config)"""
        print("\n📋 Phase 0.5c: Generiere Konsistenz-Review...")
        
        if Config.USE_DUMMY_REVIEW:
            return self._generate_dummy_review()
        else:
            # Hier würde echtes KI-Review implementiert werden
            raise NotImplementedError("Echtes Review noch nicht implementiert")
    
    def _generate_dummy_review(self) -> Dict:
        """Generiert Dummy-Review (gibt immer 'alles optimal' zurück)"""
        print("🔧 Verwende Dummy-Mode (gibt 'alles optimal' zurück)")
        
        # Input-Files sammeln
        input_files = [str(self.topics_json.name)]
        input_files.extend([str(p.name) for p in self.chapters_jsons])
        
        # Dummy-Daten
        review = {
            "schemaVersion": "1.0.0",
            "reviewMetadata": {
                "reviewedAt": datetime.utcnow().isoformat() + "Z",
                "reviewedBy": "Claude Sonnet 4.5 (Dummy-Mode)",
                "inputFiles": input_files,
                "isDummyReview": True
            },
            "overallAssessment": {
                "completeness": "EXCELLENT",
                "balance": "EXCELLENT",
                "coherence": "EXCELLENT",
                "overallScore": 100,
                "recommendation": "APPROVE"
            },
            "detailedFindings": {
                "gaps": [],
                "redundancies": [],
                "inconsistencies": [],
                "crossTopicConnections": []
            },
            "statisticalAnalysis": {
                "totalTopics": 3,
                "totalChapters": 15,
                "totalEstimatedSections": 76,
                "averageChaptersPerTopic": 5.0,
                "averageSectionsPerChapter": 5.1,
                "topicSizeDistribution": {},
                "difficultyDistribution": {}
            },
            "recommendations": [
                {
                    "priority": "LOW",
                    "category": "OTHER",
                    "recommendation": "DUMMY-MODE: Alle Inputs als optimal bewertet.",
                    "estimatedEffort": "MINOR"
                }
            ]
        }
        
        return review
    
    def validate_and_save(self, review_data: Dict, output_path: Path) -> bool:
        """Validiert und speichert Review"""
        print(f"\n🔍 Phase 0.5c: Validiere Review...")
        
        is_valid, errors = Validator.validate_json(review_data, self.schema, "Phase 0.5c")
        
        if is_valid:
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(review_data, f, indent=2, ensure_ascii=False)
            print(f"✅ Review gespeichert: {output_path}")
        
        return is_valid

# ============================================================================
# MAIN ORCHESTRATION
# ============================================================================

def main():
    parser = argparse.ArgumentParser(description="Phase 0.5 Orchestrierung")
    parser.add_argument("--strategy", required=True, help="Pfad zum Strategiedokument")
    parser.add_argument("--phase", choices=["0.5a", "0.5b", "0.5c", "all"], default="all",
                        help="Welche Phase ausführen? (default: all)")
    args = parser.parse_args()
    
    print("=" * 70)
    print("Phase 0.5 Orchestrierung")
    print("=" * 70)
    
    # Verzeichnisse erstellen
    Config.OUTPUT_DIR.mkdir(exist_ok=True)
    Config.PROMPTS_DIR.mkdir(exist_ok=True, parents=True)
    
    strategy_path = Path(args.strategy)
    
    # ========================================================================
    # PHASE 0.5a: TOPICS
    # ========================================================================
    if args.phase in ["0.5a", "all"]:
        print("\n" + "=" * 70)
        print("PHASE 0.5a: Topic-Definition")
        print("=" * 70)
        
        phase0_5a = Phase0_5a(strategy_path)
        prompt = phase0_5a.prepare_prompt()
        
        print("\n⏸️  MANUELLER SCHRITT:")
        print(f"1. Gib den Prompt an KI: {Config.OUTPUT_DIR / 'prompt-phase0.5a-generated.md'}")
        print(f"2. Speichere KI-Output als: {Config.OUTPUT_0_5A}")
        print("3. Drücke Enter zum Fortfahren...")
        input()
        
        if not phase0_5a.validate_output(Config.OUTPUT_0_5A):
            print("\n❌ Phase 0.5a Validierung fehlgeschlagen. Abbruch.")
            sys.exit(1)
        
        print("\n✅ Phase 0.5a abgeschlossen!")
    
    # ========================================================================
    # PHASE 0.5b: CHAPTERS
    # ========================================================================
    if args.phase in ["0.5b", "all"]:
        print("\n" + "=" * 70)
        print("PHASE 0.5b: Chapter-Definition")
        print("=" * 70)
        
        phase0_5b = Phase0_5b(Config.OUTPUT_0_5A)
        prompts = phase0_5b.prepare_prompts()
        
        print(f"\n⏸️  MANUELLER SCHRITT: {len(prompts)} Prompts erstellt.")
        for i, (prompt, output_path) in enumerate(prompts, 1):
            print(f"\nTopic {i}:")
            print(f"  1. Prompt: {Config.OUTPUT_DIR / f'prompt-phase0.5b-topic-{i}-generated.md'}")
            print(f"  2. Output speichern als: {output_path}")
        
        print("\n3. Drücke Enter wenn alle Topics fertig sind...")
        input()
        
        # Validiere alle Topic-Outputs
        all_valid = True
        for _, output_path in prompts:
            if not phase0_5b.validate_output(output_path):
                all_valid = False
        
        if not all_valid:
            print("\n❌ Phase 0.5b Validierung fehlgeschlagen. Abbruch.")
            sys.exit(1)
        
        print("\n✅ Phase 0.5b abgeschlossen!")
    
    # ========================================================================
    # PHASE 0.5c: REVIEW
    # ========================================================================
    if args.phase in ["0.5c", "all"]:
        print("\n" + "=" * 70)
        print("PHASE 0.5c: Konsistenz-Review")
        print("=" * 70)
        
        # Sammle alle Chapter-JSONs
        chapters_jsons = list(Config.OUTPUT_DIR.glob("output-phase0.5b-topic-*-chapters.json"))
        
        if not chapters_jsons:
            print("❌ Keine Chapter-JSONs gefunden. Phase 0.5b erst ausführen.")
            sys.exit(1)
        
        phase0_5c = Phase0_5c(Config.OUTPUT_0_5A, chapters_jsons)
        review = phase0_5c.generate_review()
        
        if not phase0_5c.validate_and_save(review, Config.OUTPUT_0_5C):
            print("\n❌ Phase 0.5c Validierung fehlgeschlagen. Abbruch.")
            sys.exit(1)
        
        print("\n✅ Phase 0.5c abgeschlossen!")
    
    # ========================================================================
    # ABSCHLUSS
    # ========================================================================
    print("\n" + "=" * 70)
    print("✅ Phase 0.5 erfolgreich abgeschlossen!")
    print("=" * 70)
    print("\nGenerierte Dateien:")
    print(f"  - Topics: {Config.OUTPUT_0_5A}")
    for p in Config.OUTPUT_DIR.glob("output-phase0.5b-topic-*-chapters.json"):
        print(f"  - Chapters: {p}")
    print(f"  - Review: {Config.OUTPUT_0_5C}")
    print("\nNächster Schritt: Phase 0.5d (Section-Definition)")

if __name__ == "__main__":
    main()
