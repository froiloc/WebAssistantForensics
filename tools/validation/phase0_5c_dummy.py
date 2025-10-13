import json
from datetime import datetime

def generate_dummy_review(input_files):
    """
    Generiert Dummy-Review (gibt immer 'alles optimal' zurück)
    """
    
    # Statistik aus Input-Files berechnen (simpel)
    total_sections = 76  # Beispiel: Hardcoded für erste Tests
    
    dummy_review = {
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
            "totalEstimatedSections": total_sections,
            "averageChaptersPerTopic": 5.0,
            "averageSectionsPerChapter": 5.1,
            "topicSizeDistribution": {
                "topic-1": 33,
                "topic-2": 28,
                "topic-3": 15
            },
            "difficultyDistribution": {
                "Beginner": 7,
                "Intermediate": 6,
                "Advanced": 2
            }
        },
        "recommendations": [
            {
                "priority": "LOW",
                "category": "OTHER",
                "recommendation": "DUMMY-MODE: Keine Empfehlungen. Alle Inputs wurden als optimal bewertet.",
                "estimatedEffort": "MINOR"
            }
        ]
    }
    
    return dummy_review

# Verwendung
if __name__ == "__main__":
    input_files = [
        "output-phase0.5a-topics.json",
        "output-phase0.5b-topic-1-chapters.json",
        "output-phase0.5b-topic-2-chapters.json",
        "output-phase0.5b-topic-3-chapters.json"
    ]
    
    review = generate_dummy_review(input_files)
    
    with open("output-phase0.5c-review-DUMMY.json", "w", encoding="utf-8") as f:
        json.dump(review, f, indent=2, ensure_ascii=False)
    
    print("✅ Dummy-Review erstellt: output-phase0.5c-review-DUMMY.json")
