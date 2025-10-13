# ============================================================================
# PHASE 0.5d: SECTION-DEFINITION
# ============================================================================

class Phase0_5d:
    """Section-Definitionen pro Topic erstellen"""
    
    def __init__(self, topics_json: Path, chapters_jsons: List[Path], review_json: Path):
        self.topics_json = topics_json
        self.chapters_jsons = chapters_jsons
        self.review_json = review_json
        self.schema = Validator.load_schema(Config.SCHEMA_0_5D)
        
        # Daten laden
        with open(topics_json, 'r', encoding='utf-8') as f:
            self.topics_data = json.load(f)
        
        self.chapters_data = {}
        for path in chapters_jsons:
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                topic_id = data["topicReference"]["topicId"]
                self.chapters_data[topic_id] = data
        
        with open(review_json, 'r', encoding='utf-8') as f:
            self.review_data = json.load(f)
    
    def prepare_prompts(self) -> List[tuple[str, Path]]:
        """Erstellt Prompts für alle Topics (Section-Definitionen)"""
        print("\n📋 Phase 0.5d: Erstelle Section-Definition-Prompts...")
        
        prompts = []
        
        for topic in self.topics_data["topics"]:
            topic_id = topic["topicId"]
            topic_num = topic_id.split("-")[1]
            
            prompt = self._create_prompt_for_topic(topic_id)
            output_path = Config.OUTPUT_DIR / f"output-phase0.5d-topic-{topic_num}-sections.json"
            
            # Prompt speichern
            prompt_file = Config.OUTPUT_DIR / f"prompt-phase0.5d-topic-{topic_num}-generated.md"
            with open(prompt_file, 'w', encoding='utf-8') as f:
                f.write(prompt)
            
            print(f"✅ Prompt gespeichert: {prompt_file}")
            prompts.append((prompt, output_path))
        
        return prompts
    
    def _create_prompt_for_topic(self, topic_id: str) -> str:
        """Erstellt Prompt für Section-Definitionen eines Topics"""
        
        # Chapter-Daten für dieses Topic laden
        chapters = self.chapters_data[topic_id]
        
        # Review-Findings für dieses Topic extrahieren
        review_findings = self._extract_review_findings_for_topic(topic_id)
        
        prompt = f"""
# Phase 0.5d: Section-Definition für {topic_id}

## Input-Daten

### Topic (aus Phase 0.5a)
{json.dumps(self._get_topic_data(topic_id), indent=2, ensure_ascii=False)}

### Chapters (aus Phase 0.5b)
{json.dumps(chapters, indent=2, ensure_ascii=False)}

### Review-Findings (aus Phase 0.5c)
{json.dumps(review_findings, indent=2, ensure_ascii=False)}

## Aufgabe

Erstelle vollständige Section-Definitionen für alle Chapters in diesem Topic.

**Pro Section benötigt:**
- sectionId (Format: axiom-[aktion]-[objekt])
- title, learningObjective, keyTopics (3-5), shortDescription
- complexity, estimatedWordCount, readingTimeL2, readingTimeL3
- estimatedMedia (screenshots, videos, annotations, diagrams, infoBoxes)
- predecessorSection, successorSection (Section-IDs für Verkettung)
- prerequisites (contentual: Section-IDs, technical, knowledge)
- dependencies (Section-IDs, die auf dieser aufbauen)
- difficultyLevel (Beginner/Intermediate/Advanced)
- crossReferences (max. 5, mit reason und relevanceScore 1-5)

**Wichtige Richtwerte:**
- Wortumfang: 1000-1600 Worte (Level 2)
- Lesedauer L2: 5-15 Min, L3: 10-30 Min
- Lesetempo: 150-180 wpm
- Max. Konzentrationsdauer: 15 Min

## Output-Format

Erstelle valides JSON gemäß Schema (siehe unten).

## Schema
{json.dumps(self.schema, indent=2, ensure_ascii=False)}

## Zusätzliche Hinweise

### Predecessor/Successor-Verkettung
- Erste Section eines Topics: predecessorSection = null
- Letzte Section eines Topics: successorSection = null
- Alle anderen: Korrekte Verkettung sicherstellen (lückenlos)

### Cross-References
- Max. 5 pro Section
- relevanceScore: 1=optional, 5=kritisch
- Nur Cross-References zu anderen Sections (nicht Predecessor/Successor)
- Cross-Topic-References möglich (zu anderen Topics)

### Prerequisites
- contentual: Nur Section-IDs (aus früheren Sections)
- technical: Konkret (z.B. "AXIOM Examine v7.5", "Evidenzdatei verfügbar")
- knowledge: Allgemein (z.B. "Grundlegende Windows-Kenntnisse")

### Dependencies
- Section-IDs, die auf dieser Section aufbauen (Forward-Links)
- Hilft Phase 1 zu verstehen: "Welche späteren Sections nutzen diese Info?"

### AI Self-Review
- Dokumentiere Unsicherheiten
- Schlage Merges vor (wenn 2 Sections zu ähnlich)
- Schlage Splits vor (wenn 1 Section zu groß)

### Terminologie
- Konsultiere terminologie-entscheidungsliste.md
- Bei neuen Begriffen: Status "Proposed" eintragen
- Konsistenz über alle Sections hinweg sichern

## Review-Findings beachten

{self._format_review_findings(review_findings)}

---

**Viel Erfolg!** 🚀
"""
        
        return prompt
    
    def _get_topic_data(self, topic_id: str) -> Dict:
        """Extrahiert Topic-Daten aus topics.json"""
        for topic in self.topics_data["topics"]:
            if topic["topicId"] == topic_id:
                return topic
        return {}
    
    def _extract_review_findings_for_topic(self, topic_id: str) -> Dict:
        """Extrahiert relevante Review-Findings für ein Topic"""
        findings = {
            "gaps": [],
            "redundancies": [],
            "inconsistencies": [],
            "crossTopicConnections": []
        }
        
        # Gaps filtern
        for gap in self.review_data.get("detailedFindings", {}).get("gaps", []):
            if topic_id in gap.get("location", ""):
                findings["gaps"].append(gap)
        
        # Redundancies filtern
        for red in self.review_data.get("detailedFindings", {}).get("redundancies", []):
            locations = red.get("locations", [])
            if any(topic_id in loc for loc in locations):
                findings["redundancies"].append(red)
        
        # Inconsistencies filtern
        for inc in self.review_data.get("detailedFindings", {}).get("inconsistencies", []):
            locations = inc.get("locations", [])
            if any(topic_id in loc for loc in locations):
                findings["inconsistencies"].append(inc)
        
        # Cross-Topic-Connections filtern
        for conn in self.review_data.get("detailedFindings", {}).get("crossTopicConnections", []):
            if topic_id in conn.get("fromLocation", "") or topic_id in conn.get("toLocation", ""):
                findings["crossTopicConnections"].append(conn)
        
        return findings
    
    def _format_review_findings(self, findings: Dict) -> str:
        """Formatiert Review-Findings für Prompt"""
        output = ""
        
        if findings["gaps"]:
            output += "**Identifizierte Lücken:**\n"
            for gap in findings["gaps"]:
                output += f"- {gap['issue']} (Severity: {gap['severity']})\n"
                output += f"  → Vorschlag: {gap['suggestion']}\n"
        
        if findings["redundancies"]:
            output += "\n**Identifizierte Redundanzen:**\n"
            for red in findings["redundancies"]:
                output += f"- {red['overlap']}\n"
                output += f"  → Vorschlag: {red['suggestion']}\n"
        
        if findings["inconsistencies"]:
            output += "\n**Identifizierte Inkonsistenzen:**\n"
            for inc in findings["inconsistencies"]:
                output += f"- {inc['issue']} ({inc['type']})\n"
                output += f"  → Vorschlag: {inc['suggestion']}\n"
        
        if findings["crossTopicConnections"]:
            output += "\n**Relevante Cross-Topic-Connections:**\n"
            for conn in findings["crossTopicConnections"]:
                output += f"- {conn['fromLocation']} → {conn['toLocation']}: {conn['reason']}\n"
        
        if not output:
            output = "**Keine Findings für dieses Topic.**"
        
        return output
    
    def validate_output(self, output_path: Path) -> bool:
        """Validiert Section-Definitionen für ein Topic"""
        print(f"\n🔍 Phase 0.5d: Validiere {output_path.name}...")
        
        try:
            with open(output_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except FileNotFoundError:
            print(f"❌ Output nicht gefunden: {output_path}")
            return False
        except json.JSONDecodeError as e:
            print(f"❌ Kein valides JSON: {output_path}\n{e}")
            return False
        
        is_valid, errors = Validator.validate_json(data, self.schema, f"Phase 0.5d ({output_path.name})")
        
        if is_valid:
            self._additional_checks(data)
        
        return is_valid
    
    def _additional_checks(self, data: Dict):
        """Zusätzliche Plausibilitätsprüfungen"""
        print("\n🔍 Zusätzliche Checks...")
        
        sections = data.get("sections", [])
        
        # Check 1: Sind Section-IDs eindeutig?
        section_ids = [s["sectionId"] for s in sections]
        duplicates = [sid for sid in section_ids if section_ids.count(sid) > 1]
        if duplicates:
            print(f"❌ KRITISCH: Doppelte Section-IDs: {set(duplicates)}")
        else:
            print(f"✅ Alle Section-IDs eindeutig ({len(section_ids)} Sections)")
        
        # Check 2: Ist Predecessor/Successor-Kette konsistent?
        print("\n🔗 Prüfe Predecessor/Successor-Kette...")
        chain_valid = self._validate_section_chain(sections)
        if chain_valid:
            print("✅ Predecessor/Successor-Kette konsistent")
        else:
            print("❌ Predecessor/Successor-Kette inkonsistent!")
        
        # Check 3: Verweisen Prerequisites auf existierende Sections?
        print("\n🔗 Prüfe Prerequisites...")
        invalid_prereqs = []
        for section in sections:
            for prereq_id in section["prerequisites"]["contentual"]:
                if prereq_id not in section_ids:
                    invalid_prereqs.append(f"{section['sectionId']} → {prereq_id}")
        
        if invalid_prereqs:
            print(f"⚠️  Warnung: {len(invalid_prereqs)} Prerequisites verweisen auf nicht-existierende Sections:")
            for inv in invalid_prereqs[:5]:  # Max. 5 anzeigen
                print(f"   - {inv}")
        else:
            print("✅ Alle Prerequisites valide")
        
        # Check 4: Verweisen Cross-References auf existierende Sections?
        print("\n🔗 Prüfe Cross-References...")
        invalid_crossrefs = []
        for section in sections:
            for crossref in section.get("crossReferences", []):
                ref_id = crossref["sectionId"]
                if ref_id not in section_ids:
                    # Könnte Cross-Topic-Reference sein → OK
                    if not ref_id.startswith("axiom-"):
                        invalid_crossrefs.append(f"{section['sectionId']} → {ref_id} (ungültiges Format)")
        
        if invalid_crossrefs:
            print(f"⚠️  Warnung: {len(invalid_crossrefs)} Cross-References ungültig:")
            for inv in invalid_crossrefs[:5]:
                print(f"   - {inv}")
        else:
            print("✅ Cross-References valide (oder Cross-Topic)")
        
        # Check 5: Stimmen qualityMetrics?
        print("\n📊 Prüfe qualityMetrics...")
        stated_total = data["qualityMetrics"]["totalSections"]
        actual_total = len(sections)
        
        if stated_total != actual_total:
            print(f"❌ totalSections ({stated_total}) ≠ actual ({actual_total})")
        else:
            print(f"✅ totalSections korrekt: {stated_total}")
        
        # Check 6: Lesedauer-Verteilung
        reading_dist = data["qualityMetrics"]["readingTimeDistribution"]
        over15 = reading_dist.get("over15min", 0)
        if over15 > 5:  # Max. 5 Sections über 15 Min
            print(f"⚠️  Warnung: {over15} Sections > 15 Min (Konzentrationsgrenze!)")
        else:
            print(f"✅ Lesedauer-Verteilung OK ({over15} Sections > 15 Min)")
    
    def _validate_section_chain(self, sections: List[Dict]) -> bool:
        """Prüft, ob Predecessor/Successor-Kette konsistent ist"""
        section_dict = {s["sectionId"]: s for s in sections}
        
        # Finde erste Section (predecessorSection = null)
        first_sections = [s for s in sections if s["predecessorSection"] is None]
        if len(first_sections) != 1:
            print(f"❌ Fehler: {len(first_sections)} erste Sections (erwartet: 1)")
            return False
        
        # Finde letzte Section (successorSection = null)
        last_sections = [s for s in sections if s["successorSection"] is None]
        if len(last_sections) != 1:
            print(f"❌ Fehler: {len(last_sections)} letzte Sections (erwartet: 1)")
            return False
        
        # Folge der Kette
        current = first_sections[0]
        visited = set()
        chain_length = 0
        
        while current:
            section_id = current["sectionId"]
            
            if section_id in visited:
                print(f"❌ Fehler: Zyklus entdeckt bei {section_id}")
                return False
            
            visited.add(section_id)
            chain_length += 1
            
            successor_id = current["successorSection"]
            if successor_id is None:
                break
            
            if successor_id not in section_dict:
                print(f"❌ Fehler: Successor {successor_id} existiert nicht")
                return False
            
            # Prüfe Rückwärts-Link
            next_section = section_dict[successor_id]
            if next_section["predecessorSection"] != section_id:
                print(f"❌ Fehler: Inkonsistenz bei {section_id} → {successor_id}")
                return False
            
            current = next_section
        
        # Prüfe: Wurden alle Sections besucht?
        if chain_length != len(sections):
            print(f"❌ Fehler: Kette hat nur {chain_length} Sections, erwartet {len(sections)}")
            return False
        
        return True

# Config ergänzen
class Config:
    # ... (vorherige Konfiguration) ...
    
    # Schema für Phase 0.5d
    SCHEMA_0_5D = SCHEMAS_DIR / "output-phase0.5d-sections.schema.json"
    
    # Output für Phase 0.5d
    OUTPUT_0_5D_TEMPLATE = OUTPUT_DIR / "output-phase0.5d-topic-{}-sections.json"

# Main-Funktion ergänzen
def main():
    # ... (vorheriger Code bis Phase 0.5c) ...
    
    # ========================================================================
    # PHASE 0.5d: SECTIONS
    # ========================================================================
    if args.phase in ["0.5d", "all"]:
        print("\n" + "=" * 70)
        print("PHASE 0.5d: Section-Definition")
        print("=" * 70)
        
        # Sammle alle Chapter-JSONs
        chapters_jsons = sorted(Config.OUTPUT_DIR.glob("output-phase0.5b-topic-*-chapters.json"))
        
        if not chapters_jsons:
            print("❌ Keine Chapter-JSONs gefunden. Phase 0.5b erst ausführen.")
            sys.exit(1)
        
        if not Config.OUTPUT_0_5C.exists():
            print("❌ Review-JSON nicht gefunden. Phase 0.5c erst ausführen.")
            sys.exit(1)
        
        phase0_5d = Phase0_5d(Config.OUTPUT_0_5A, chapters_jsons, Config.OUTPUT_0_5C)
        prompts = phase0_5d.prepare_prompts()
        
        print(f"\n⏸️  MANUELLER SCHRITT: {len(prompts)} Prompts erstellt.")
        for i, (prompt, output_path) in enumerate(prompts, 1):
            print(f"\nTopic {i}:")
            print(f"  1. Prompt: {Config.OUTPUT_DIR / f'prompt-phase0.5d-topic-{i}-generated.md'}")
            print(f"  2. Output speichern als: {output_path}")
        
        print("\n3. Drücke Enter wenn alle Topics fertig sind...")
        input()
        
        # Validiere alle Topic-Outputs
        all_valid = True
        for _, output_path in prompts:
            if not phase0_5d.validate_output(output_path):
                all_valid = False
        
        if not all_valid:
            print("\n❌ Phase 0.5d Validierung fehlgeschlagen. Abbruch.")
            sys.exit(1)
        
        print("\n✅ Phase 0.5d abgeschlossen!")
    
    # ========================================================================
    # ABSCHLUSS & KONSOLIDIERUNG
    # ========================================================================
    print("\n" + "=" * 70)
    print("✅ Phase 0.5 komplett abgeschlossen!")
    print("=" * 70)
    
    # Finale Konsolidierung (alle Teile zusammenführen)
    print("\n📦 Konsolidiere alle Outputs zu Gesamt-Gliederung...")
    consolidate_final_output()
    
    print("\n✅ Fertig! Nächster Schritt: Phase 1 (Section-Content-Erstellung)")

def consolidate_final_output():
    """Konsolidiert alle Phase-0.5-Outputs zu einem finalen JSON"""
    print("\n🔧 Erstelle konsolidiertes Gesamt-Output...")
    
    # Topics laden
    with open(Config.OUTPUT_0_5A, 'r', encoding='utf-8') as f:
        topics_data = json.load(f)
    
    # Chapters laden (alle Topics)
    chapters_by_topic = {}
    for path in Config.OUTPUT_DIR.glob("output-phase0.5b-topic-*-chapters.json"):
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            topic_id = data["topicReference"]["topicId"]
            chapters_by_topic[topic_id] = data["chapters"]
    
    # Sections laden (alle Topics)
    sections_by_topic = {}
    for path in Config.OUTPUT_DIR.glob("output-phase0.5d-topic-*-sections.json"):
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            topic_id = data["topicReference"]["topicId"]
            sections_by_topic[topic_id] = data["sections"]
    
    # Review laden
    with open(Config.OUTPUT_0_5C, 'r', encoding='utf-8') as f:
        review_data = json.load(f)
    
    # Konsolidiertes Output erstellen
    final_output = {
        "schemaVersion": "1.0.0",
        "projectMetadata": topics_data["projectMetadata"],
        "createdAt": datetime.utcnow().isoformat() + "Z",
        "phase0_5_complete": True,
        "topics": []
    }
    
    # Topics mit Chapters und Sections zusammenführen
    for topic in topics_data["topics"]:
        topic_id = topic["topicId"]
        
        consolidated_topic = {
            "topicId": topic_id,
            "title": topic["title"],
            "learningObjective": topic["learningObjective"],
            "chapters": []
        }
        
        # Chapters für dieses Topic
        if topic_id in chapters_by_topic:
            for chapter in chapters_by_topic[topic_id]:
                chapter_id = chapter["chapterId"]
                
                # Sections für dieses Chapter filtern
                chapter_sections = [
                    s for s in sections_by_topic.get(topic_id, [])
                    if s["chapterId"] == chapter_id
                ]
                
                consolidated_chapter = {
                    "chapterId": chapter_id,
                    "title": chapter["title"],
                    "sections": chapter_sections
                }
                
                consolidated_topic["chapters"].append(consolidated_chapter)
        
        final_output["topics"].append(consolidated_topic)
    
    # Review-Zusammenfassung hinzufügen
    final_output["phase0_5c_review_summary"] = {
        "overallScore": review_data["overallAssessment"]["overallScore"],
        "recommendation": review_data["overallAssessment"]["recommendation"],
        "totalGaps": len(review_data["detailedFindings"]["gaps"]),
        "totalRedundancies": len(review_data["detailedFindings"]["redundancies"]),
        "totalInconsistencies": len(review_data["detailedFindings"]["inconsistencies"])
    }
    
    # Statistik berechnen
    total_sections = sum(len(sections_by_topic.get(t["topicId"], [])) for t in topics_data["topics"])
    total_chapters = sum(len(chapters_by_topic.get(t["topicId"], [])) for t in topics_data["topics"])
    
    final_output["statistics"] = {
        "totalTopics": len(topics_data["topics"]),
        "totalChapters": total_chapters,
        "totalSections": total_sections
    }
    
    # Speichern
    with open(Config.OUTPUT_0_5_FINAL, 'w', encoding='utf-8') as f:
        json.dump(final_output, f, indent=2, ensure_ascii=False)
    
    print(f"✅ Konsolidiertes Output gespeichert: {Config.OUTPUT_0_5_FINAL}")
    print(f"\n📊 Statistik:")
    print(f"   - Topics: {final_output['statistics']['totalTopics']}")
    print(f"   - Chapters: {final_output['statistics']['totalChapters']}")
    print(f"   - Sections: {final_output['statistics']['totalSections']}")
