# Prompt-Entwicklung: Interaktives Handbuch für Forensik-Software
## Cluster 4: Qualitätssicherung & Testing (ABGESCHLOSSEN)

**Projekt:** WebAssistantForensics - Content-Generierung mit KI  
**Datum:** 09. Oktober 2025  
**Status:** Cluster 4 finalisiert, bereit für Cluster 5  
**Bearbeitungszeit:** ~1,5 Stunden

---

## Projektziel (Reminder)

Entwicklung eines umfassenden, präzisen Prompts für KI (Sonnet 4.5) zur Generierung von hochwertigem Content für ein interaktives Handbuch zur forensischen Software **Magnet Axiom Examine**. 

**Cluster 4 fokussiert sich darauf, wie generierte Sections getestet, validiert und zur Publikationsreife gebracht werden.**

---

## 1. Übersicht & Zielsetzung

### 1.1 Zweck der Qualitätssicherung

Die Qualitätssicherung dient dazu, **vom Ergebnis zurück zum Auftrag zu arbeiten** und dabei:
- **Lücken in den Anforderungen** zu identifizieren
- **Testkriterien** zu definieren, die Qualität messbar machen
- **Iterative Verbesserung** des Prompts zu ermöglichen
- **Konsistenz** über ~100-150 Sections sicherzustellen

### 1.2 Integration in den Gesamt-Workflow

Qualitätssicherung ist eine **der KI-Aktivität nachgelagerte Tätigkeit**, die aber wichtige Rückschlüsse für die Prompt-Entwicklung liefert.

**Workflow-Übersicht:**
```
Prompt → KI generiert Section → Qualitätssicherung → Feedback → Prompt-Verbesserung
```

---

## 2. Validierungsebenen

### 2.1 Syntaktische Validierung (Automatisiert)

**Verantwortlich:** Python-Skripte + JSON-Schema  
**Status:** Bereits implementiert  
**Zeitpunkt:** Sofort nach KI-Generierung

**Prüfumfang:**
- HTML-Struktur valide (alle Tags geschlossen, korrekte Verschachtelung)
- Pflicht-Attribute vollständig (z.B. `data-title`, `data-section`, `data-level`)
- JSON-Schema-Konformität (JSON-LD Metadaten vollständig)
- Cross-Reference-Validierung (alle `data-ref` existieren und sind eindeutig)
- Überschriften-Hierarchie korrekt (keine Sprünge h2 → h4)
- Barrierefreiheit-Grundlagen:
  - Alt-Texte vorhanden (10-120 Zeichen)
  - `lang`-Attribute bei fremdsprachigen Begriffen
  - `scope`-Attribute bei Tabellen
- Attribut-Reihenfolge (class → id → data-* → sonstige)
- CSS-Klassen aus Whitelist

**Fehler-Kategorien:**
- `CRITICAL`: Blocker, Section kann nicht publiziert werden
- `ERROR`: Major, muss behoben werden
- `WARNING`: Minor, sollte behoben werden
- `INFO`: Nice-to-have, Optimierungsvorschläge

**Output:**
- Konsolenausgabe (Python)
- Optional: HTML-Reports (z.B. `validation-report-123.html`)

**Bei CRITICAL/ERROR:**
- Validierungs-Output wird an KI übergeben
- KI korrigiert Fehler
- Erneute Validierung
- **Fehler-Dokumentation** (siehe Abschnitt 4.3)

---

### 2.2 Semantische Validierung (KI-Agent + Maintainer)

**Verantwortlich:** KI-Agent (Vorprüfung) + Maintainer (Final)  
**Zeitpunkt:** Nach syntaktischer Validierung, vor Publikation

#### 2.2.1 KI-Agent: Aufgaben

**Konsistenzprüfung:**
- Werden gleiche Begriffe einheitlich verwendet?
- Beispiel: "Abfrage" vs. "Query" - konsistent über alle Sections?

**Plausibilitätsprüfung:**
- Sind die Anweisungen logisch nachvollziehbar?
- Beispiel: Schritt 3 referenziert nicht-existente Schaltfläche → FEHLER
- **Datengrundlage:** Magnet AXIOM Handbuch, weitere Quellen

**Terminologie-Abgleich:**
- Stimmen verwendete Begriffe mit Terminologie-Entscheidungsliste überein?
- Beispiel: Liste sagt "Cache (engl.)", Section verwendet "Zwischenspeicher" → WARNUNG

**Semantischer Zusammenhang:**
- Passen Sections innerhalb eines Kapitels zusammen?
- Folgen sie einem roten Faden?
- Beispiel: Section "Export starten" vor Section "Export vorbereiten" → WARNUNG

**Gliederungsstruktur:**
- Ist die `<h1>`-`<h6>`-Hierarchie sinnvoll?
- Sind Überschriften aussagekräftig?
- Beispiel: Drei aufeinanderfolgende `<h3>` mit nahezu identischem Inhalt → HINWEIS zur Zusammenfassung

**Medien-Platzhalter-Bewertung:**
- Sind Medien-Platzhalter sinnvoll platziert?
- Sind `MEDIA:`-Kommentare präzise genug?
- Beispiel: "Hier Screenshot einfügen" ohne weitere Details → WARNUNG

**Rahmenplan-Einhaltung:**
- Entspricht die Section dem groben Rahmenplan für das Kapitel?
- Sind alle erwarteten Themen abgedeckt?

#### 2.2.2 KI-Agent: Datengrundlagen

**Input für semantische Prüfung:**
- **Alle bereits generierten/approbierten Sections** (für Konsistenzprüfung)
- **Terminologie-Entscheidungsliste** (wird vom Maintainer gepflegt)
- **Rahmenplan & Gliederung** für das jeweilige Kapitel
- **Quellmaterial** (Magnet AXIOM Handbuch, weitere Dokumentationen)
- **Style-Guides:**
  - Writing-Guide (aus Cluster 1)
  - Mediennutzungs-Guide (aus Cluster 1)
  - HTML-Syntax-Guide (aus Cluster 3)
- **Erwartetes Antwortschema** für standardisierten Output

**Output-Format (KI-Agent):**
```json
{
  "sectionId": "section-template-types",
  "timestamp": "2025-10-09T15:30:00Z",
  "semanticReview": {
    "consistency": {
      "score": 85,
      "issues": [
        {
          "severity": "WARNING",
          "message": "Begriff 'Abfrage' in Section A, 'Query' in Section B verwendet",
          "suggestion": "Einheitlich 'Abfrage' verwenden (siehe Terminologie-Liste)"
        }
      ]
    },
    "plausibility": {
      "score": 90,
      "issues": []
    },
    "terminology": {
      "score": 95,
      "issues": []
    },
    "structure": {
      "score": 80,
      "issues": [
        {
          "severity": "INFO",
          "message": "Drei aufeinanderfolgende <h3> mit ähnlichem Inhalt",
          "suggestion": "Erwäge Zusammenfassung unter einer <h3>"
        }
      ]
    },
    "mediaPlaceholders": {
      "score": 75,
      "issues": [
        {
          "severity": "WARNING",
          "message": "Medien-Platzhalter Zeile 42: 'Screenshot einfügen' zu unspezifisch",
          "suggestion": "Präzisiere: Welches UI-Element? Welche Annotations-Elemente?"
        }
      ]
    },
    "frameworkCompliance": {
      "score": 100,
      "issues": []
    }
  },
  "overallScore": 87,
  "recommendation": "REVIEW - Minor issues found, review recommended"
}
```

#### 2.2.3 Maintainer: Manuelle Prüfungen

**Fachliche Korrektheit:**
- Stimmen die Anweisungen mit der tatsächlichen Software überein?
- Sind Screenshots/Annotationen korrekt?

**Verständlichkeit für Zielgruppe:**
- Ist die Sprache einfach genug für IT-ferne Ermittler?
- Sind komplexe Konzepte ausreichend erklärt?

**Medien-Qualität:**
- Sind Screenshots aussagekräftig?
- Sind Annotationen klar und verständlich?
- Sind Videos mit Untertiteln versehen?

**Konsistenz über Sections:**
- Gleiche Begriffswahl über Kapitel hinweg?
- Einheitliche Tonalität?

**Final-Entscheidung:**
- Approved → Statusübergang zu `Approved`
- Reject → Zurück zu `Draft` mit Feedback

---

### 2.3 BFSG-Konformität (Implizit)

**Verantwortlich:** Syntaktische Validierung (Python)  
**Status:** Implizit in Cluster 3 definiert, in syntaktischer Validierung integriert

**Prüfumfang:**
- Sprachauszeichnung (`lang`-Attribute bei fremdsprachigen Begriffen)
- Alt-Texte vorhanden und aussagekräftig
- Überschriften-Hierarchie korrekt
- Tabellen mit `<caption>` und `scope`-Attributen
- Formulare mit `<label>`-Elementen

**Keine expliziten BFSG-Validierungen notwendig**, da alle Anforderungen in regulären syntaktischen Prüfungen abgedeckt sind.

---

## 3. Testkriterien für generierte Sections

### 3.1 Syntaktische Kriterien

**Pflicht-Attribute vollständig:**
- Jede `<section>` hat: `class`, `id`, `data-section`, `data-level`, `data-parent`, `data-title`
- Jedes `<img>` hat: `src`, `alt`, `data-media-type`
- Jede `<figcaption>` hat: `aria-describedby` (falls vorhanden)

**HTML-Struktur valide:**
- Alle Tags korrekt geschlossen
- Korrekte Verschachtelung (z.B. `<p>` nicht in `<span>`)
- Nur Elemente aus Whitelist (32 erlaubte Elemente)

**Cross-References korrekt:**
- Alle `data-ref` existieren
- Keine Duplikate
- Pattern: `^[a-z0-9-]+$`

**JSON-LD Metadaten vollständig:**
- Pflichtfelder vorhanden: `@context`, `@type`, `identifier`, `name`, `version`
- Optional, aber empfohlen: `estimatedTime`, `difficultyLevel`, `author`

**Barrierefreiheit:**
- Alt-Texte: 10-120 Zeichen
- `lang`-Attribute bei fremdsprachigen Begriffen
- Überschriften-Hierarchie: keine Sprünge

---

### 3.2 Semantische Kriterien

**Konsistenz der Begriffswahl:**
- Gleicher Begriff = gleiche Bedeutung
- Abgleich mit Terminologie-Entscheidungsliste

**Plausibilität der Anweisungen:**
- Logische Reihenfolge
- Keine Referenzen auf nicht-existente UI-Elemente
- Abgleich mit Quellmaterial (Handbuch)

**Zusammenhang zwischen Sections:**
- Roter Faden erkennbar
- Keine Widersprüche
- Aufeinander aufbauend

**Gliederungsstruktur sinnvoll:**
- Überschriften aussagekräftig
- Hierarchie logisch
- Keine redundanten Sections

**Medien-Platzhalter präzise:**
- `MEDIA:`-Kommentare mit klaren Anweisungen
- Platzierung sinnvoll im Kontext

---

## 4. Validierungsprozess (Workflow)

### 4.1 Ablauf (Standard: Option B)

**Aktuell empfohlener Workflow:**

```
1. Draft
   - KI generiert Section (inkl. Medien-Platzhalter)
   - Status: Draft

2. Syntaktische Validierung (Automatisiert)
   - Python-Skripte + JSON-Schema
   - Bei CRITICAL/ERROR: Zurück zu Schritt 1 (mit Fehler-Log)
   - Bei OK/WARNING: Weiter zu Schritt 3

3. Semantische KI-Prüfung (Text & Struktur)
   - KI-Agent prüft: Konsistenz, Plausibilität, Terminologie, Struktur
   - KI-Agent bewertet: Medien-Platzhalter sinnvoll platziert?
   - Output: JSON-Report mit Issues & Scores
   - Statusübergang: Draft → Review

4. Review: Medien-Erstellung & Maintainer-Prüfung
   - Maintainer erstellt Medien (basierend auf Platzhaltern)
   - Maintainer prüft fachliche Korrektheit
   - Maintainer liest KI-Report und bewertet Issues
   - Entscheidung:
     * Approved → Weiter zu Schritt 5
     * Reject → Zurück zu Schritt 1 (mit Feedback)

5. Approved
   - Section ist bereit zur Integration
   - Statusübergang: Review → Approved

6. Published
   - Section wird in index.html integriert
   - Statusübergang: Approved → Published
```

**Wichtig:** Kein automatisches Approval! Der Prozess ist **strikt einzuhalten**.

---

### 4.2 Ablauf (Erweitert: Option A)

**Geplante Erweiterung für zukünftige Iteration:**

```
1. Draft (wie Option B)

2. Syntaktische Validierung (wie Option B)

3. Semantische KI-Prüfung Teil 1 (OHNE Medien)
   - KI prüft Text/Struktur
   - KI bewertet Medien-Platzhalter-Konzeption
   - Statusübergang: Draft → Review

4. Review: Medien-Erstellung
   - Maintainer erstellt Medien

5. Semantische KI-Prüfung Teil 2 (MIT Medien)
   - KI analysiert erstellte Medien:
     * Screenshot zeigt relevanten UI-Bereich?
     * Annotationen klar und verständlich?
     * Alt-Text passt zum Bild?
     * Medien passt zur Textbeschreibung?
   - Output: JSON-Report Teil 2

6. Maintainer Final-Prüfung
   - Liest beide KI-Reports
   - Entscheidet: Approved oder Reject

7. Approved → Published (wie Option B)
```

**Vorteil:** KI prüft Konzeption UND Umsetzung  
**Nachteil:** Zwei KI-Prüfungen = mehr Aufwand

**Empfehlung:** Starten mit Option B, später Upgrade auf Option A wenn Mehrwert erkennbar.

---

### 4.3 Fehler-Dokumentation (Fehler-Log)

**Zweck:**
- Fehler dokumentieren, um der KI zu helfen, Fehler beim nächsten Mal nicht zu wiederholen
- Wiederkehrende Fehler identifizieren
- Prompt iterativ verbessern

**Format:** JSON-Datei (`error-log.json`)

**Beispiel-Struktur:**
```json
{
  "errorLog": [
    {
      "timestamp": "2025-10-09T15:30:00Z",
      "sectionId": "section-template-types",
      "buildNumber": 123,
      "errorType": "MISSING_ATTRIBUTE",
      "severity": "CRITICAL",
      "errorDetails": "Pflicht-Attribut 'data-title' fehlt bei <section> (Zeile 5)",
      "kiResponse": "KI hat vergessen, data-title zu setzen",
      "resolution": "Maintainer hat data-title='Template-Typen' manuell ergänzt",
      "preventionNote": "Prompt muss data-title als PFLICHT-Attribut deutlicher hervorheben - Beispiel hinzufügen",
      "promptVersion": "v1.0.0"
    },
    {
      "timestamp": "2025-10-09T16:15:00Z",
      "sectionId": "section-export-workflow",
      "buildNumber": 124,
      "errorType": "INCONSISTENT_TERMINOLOGY",
      "severity": "WARNING",
      "errorDetails": "Begriff 'Query' verwendet, aber Terminologie-Liste sagt 'Abfrage'",
      "kiResponse": "KI hat Terminologie-Liste nicht konsultiert",
      "resolution": "Maintainer hat 'Query' durch 'Abfrage' ersetzt",
      "preventionNote": "Prompt muss explizit fordern: 'Konsultiere IMMER Terminologie-Liste vor Verwendung fachspezifischer Begriffe'",
      "promptVersion": "v1.0.0"
    }
  ]
}
```

**Verwendung:**
- Nach jedem Validierungsfehler wird Eintrag erstellt
- Logs werden regelmäßig ausgewertet
- Wiederkehrende Fehler → Prompt-Verbesserung
- `promptVersion` ermöglicht Tracking: Hat Prompt-Update Fehler reduziert?

**Speicherort:** `logs/error-log.json`

---

### 4.4 Fehler-Kategorisierung

| Severity | Definition | Beispiel | Aktion |
|----------|------------|----------|--------|
| `CRITICAL` | Blocker, Section kann nicht publiziert werden | Fehlende Pflicht-Attribute, ungültiges HTML | Sofortige Korrektur durch KI |
| `ERROR` | Major, muss behoben werden | Fehlende Alt-Texte, unvollständige JSON-LD | Korrektur vor Approval |
| `WARNING` | Minor, sollte behoben werden | >3 Hierarchie-Ebenen, fehlende optionale `data-ref` | Review durch Maintainer |
| `INFO` | Nice-to-have, Optimierungsvorschläge | "Erwäge Medien-Element für bessere Verständlichkeit" | Optional |

---

## 5. Metadaten (Quellen, Versionen, Erstellungsdatum)

### 5.1 Bestehende Metadaten (aus Cluster 1)

**JSON-LD Metadaten-Block (am Anfang jeder Section):**

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "identifier": "section-template-types",
  "name": "Template-Typen im Detail",
  "version": "1.0.5",
  "author": {
    "@type": "Person",
    "name": "Claude Sonnet 4.5",
    "email": "claude-sonnet-4.5@ai.anthropic.com"
  },
  "dateCreated": "2025-10-09",
  "dateModified": "2025-10-09",
  "inLanguage": "de-DE",
  "about": "Detaillierte Erklärung der Template-Typen in Magnet Axiom Examine",
  "educationalLevel": "Beginner",
  "timeRequired": "PT10M",
  "toolName": "Magnet Axiom Examine",
  "toolVersion": "7.x",
  "sources": [
    {
      "name": "Magnet Axiom Examine - Official Documentation",
      "version": "7.1",
      "url": "https://www.magnetforensics.com/docs/axiom/7.1/"
    }
  ]
}
```

**Felder:**
- `@context`, `@type`, `identifier`, `name`, `version`: **Pflicht**
- `author`, `dateCreated`, `dateModified`, `inLanguage`: **Pflicht**
- `about`, `educationalLevel`, `timeRequired`: **Empfohlen**
- `toolName`, `toolVersion`, `sources`: **Pflicht** (Multi-Tool-Strategie)

---

### 5.2 Neue Metadaten (Cluster 4)

**Erweiterung für Qualitätssicherung:**

```json
{
  "qualityAssurance": {
    "reviewStatus": "Approved",
    "lastReviewer": "Max Mustermann",
    "lastReviewDate": "2025-10-09",
    "validationScore": 87,
    "knownIssues": [
      {
        "severity": "WARNING",
        "description": "Überschriften-Hierarchie bei >3 Ebenen",
        "status": "Accepted - kein Handlungsbedarf"
      }
    ],
    "reviewCycles": 2,
    "timeToPublish": "PT2H30M"
  }
}
```

**Neue Felder:**
- `reviewStatus`: Draft | Review | Approved | Published
- `lastReviewer`: Name des Maintainers
- `lastReviewDate`: Datum der letzten Prüfung
- `validationScore`: 0-100 (siehe Abschnitt 8.1)
- `knownIssues`: Liste offener Probleme (Array)
- `reviewCycles`: Anzahl Draft→Review→Draft Zyklen
- `timeToPublish`: Zeit von Draft bis Published (ISO-8601)

---

### 5.3 JSON-LD Erweiterung (Vollständig)

**Komplettes Beispiel mit QA-Metadaten:**

```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "identifier": "section-template-types",
  "name": "Template-Typen im Detail",
  "version": "1.0.5",
  "author": {
    "@type": "Person",
    "name": "Claude Sonnet 4.5",
    "email": "claude-sonnet-4.5@ai.anthropic.com"
  },
  "dateCreated": "2025-10-09",
  "dateModified": "2025-10-09",
  "inLanguage": "de-DE",
  "about": "Detaillierte Erklärung der Template-Typen in Magnet Axiom Examine",
  "educationalLevel": "Beginner",
  "timeRequired": "PT10M",
  "toolName": "Magnet Axiom Examine",
  "toolVersion": "7.x",
  "sources": [
    {
      "name": "Magnet Axiom Examine - Official Documentation",
      "version": "7.1",
      "url": "https://www.magnetforensics.com/docs/axiom/7.1/"
    }
  ],
  "qualityAssurance": {
    "reviewStatus": "Approved",
    "lastReviewer": "Max Mustermann",
    "lastReviewDate": "2025-10-09",
    "validationScore": 87,
    "knownIssues": [],
    "reviewCycles": 1,
    "timeToPublish": "PT1H15M"
  }
}
```

---

## 6. Iterationslogik (Wann ist eine Section "fertig"?)

### 6.1 Status-Übergänge

```
Draft → Review → Approved → Published
  ↑        ↓
  └────────┘ (bei Reject)
```

**Status-Definitionen:**

| Status | Definition | Kriterien |
|--------|------------|-----------|
| `Draft` | KI hat Section generiert | Initiale Generierung abgeschlossen |
| `Review` | Syntaktisch korrekt, semantische Prüfung läuft | Alle CRITICAL/ERROR behoben, Medien werden erstellt |
| `Approved` | Bereit zur Integration | Maintainer hat fachliche Korrektheit bestätigt, alle Issues behoben |
| `Published` | Live im System | In index.html integriert |

---

### 6.2 Review-Zyklen

**Kein automatisches Approval:**
- Jede Section durchläuft **mindestens einen Review-Zyklus**
- Maintainer prüft **immer** fachliche Korrektheit
- Auch bei "perfektem" Validierungs-Score ist manuelle Prüfung Pflicht

**Review-Zyklus-Tracking:**
- Metadaten-Feld `reviewCycles` zählt Iterationen
- Beispiel: `reviewCycles: 1` = Section wurde einmal reviewed und approved
- Beispiel: `reviewCycles: 3` = Section wurde 3x rejected, bevor approved

**Qualitätsziel:**
- Durchschnitt: ≤ 2 Review-Zyklen pro Section
- Bei >3 Zyklen: Analyse, warum Section problematisch war

---

### 6.3 Abbruchkriterien

**Wann wird eine Section verworfen?**

Normalerweise wird eine Section iterativ verbessert, bis sie approved ist. In Ausnahmefällen kann eine Section verworfen werden:

- **Nach >5 Review-Zyklen** ohne signifikante Verbesserung
- **Fachliche Inkorrektheit nicht behebbar** (z.B. Thema nicht durch Quellen abgedeckt)
- **Redundanz** mit anderer Section (Maintainer entscheidet: Merge oder Discard)

**Verwerfen-Prozess:**
- Section erhält Status `Discarded`
- Begründung wird in `knownIssues` dokumentiert
- Fehler-Log erhält Eintrag mit `errorType: "SECTION_DISCARDED"`

---

## 7. Versionierung

### 7.1 Versionsschema

**Format:** `MAJOR.MINOR.BUILD`

**Beispiele:**
- `1.0.0` - Erste veröffentlichte Version
- `1.0.5` - Fünfter Build der Version 1.0
- `1.1.0` - Erste Version mit neuen Features
- `2.0.0` - Breaking change (z.B. neuer Aufbau)

---

### 7.2 Versionsnummern-Erhöhung

**MAJOR (Erste Stelle):**
- Breaking changes (z.B. komplette Neustrukturierung)
- Beispiel: `1.x.x → 2.0.0`

**MINOR (Zweite Stelle):**
- Neue Features/Funktionen hinzugefügt
- Neue Inhalte veröffentlicht (z.B. neues Kapitel)
- Beispiel: `1.0.x → 1.1.0`

**BUILD (Dritte Stelle):**
- Inkrementell pro Test/Validierung
- Bugfixes
- Kleine Anpassungen
- Beispiel: `1.0.5 → 1.0.6`

**Versionierung pro Section:**
- Jede Section hat eigene Versionsnummer in JSON-LD
- Unabhängig von Gesamt-Projekt-Version
- Ermöglicht granulares Tracking

---

### 7.3 Archivierung

**Git-basiert:**
- Alle Versionen werden in Git versioniert
- Keine zusätzliche Archivierung notwendig
- Git-Historie reicht aus für Rollback und Audit

**Best Practice:**
- Commit nach jedem Statusübergang:
  - `Draft → Review`: "Section XYZ: Reviewed"
  - `Review → Approved`: "Section XYZ: Approved"
  - `Approved → Published`: "Section XYZ: Published"

---

## 8. Metriken & Erfolgskriterien

### 8.1 Pro Section

**Anzahl Validierungsfehler:**
- Gesamt
- Nach Severity (CRITICAL/ERROR/WARNING/INFO)

**Review-Zyklen:**
- Wie oft Draft → Review → Draft?
- Ziel: ≤ 2 Zyklen

**Zeit Draft → Published:**
- ISO-8601 Duration (z.B. `PT2H30M` = 2 Stunden 30 Minuten)
- Ziel: < 3 Stunden (bei ersten Sections), < 1 Stunde (bei optimiertem Prozess)

**validationScore (0-100):**
- **Berechnung (einfache Formel, initial):**
  ```
  validationScore = 100 - (CRITICAL × 20) - (ERROR × 10) - (WARNING × 5)
  Minimum: 0
  Maximum: 100
  ```
- **Beispiel:**
  - 0 CRITICAL, 1 ERROR, 2 WARNING
  - Score = 100 - (0×20) - (1×10) - (2×5) = 100 - 10 - 10 = **80**

- **Ziel:** ≥ 85 Punkte vor Approval

**Wichtig:** validationScore-Berechnung wird in Zukunft erweitert (siehe Abschnitt 10).

---

### 8.2 Aggregiert (über alle Sections)

**Durchschnittliche Fehlerrate:**
- Durchschnitt CRITICAL/ERROR/WARNING pro Section
- Ziel: < 5 Fehler pro Section

**Durchschnittliche Zeit:**
- Durchschnitt Zeit Draft → Published
- Ziel: < 2 Stunden (nach Optimierung)

**Status-Verteilung:**
- Anzahl Sections pro Status (Draft/Review/Approved/Published)
- Beispiel: 10 Draft, 15 Review, 5 Approved, 70 Published = 100 Sections total

**Ablehnungsquote:**
- Anzahl Sections mit >3 Review-Zyklen
- Ziel: < 10% der Sections

---

### 8.3 Reporting

**Konsolenausgaben (Python):**
- Validierungs-Ergebnisse während Entwicklung
- Echtzeit-Feedback für Maintainer
- Beispiel: `✓ Section validated: 2 WARNINGS, Score: 90`

**HTML-Reports:**
- `media-validation-report.html` - Übersicht aller Medien-Validierungen
- `validation-summary-report.html` - Aggregierte Metriken
- Generiert nach Batch-Validierung

**JSON-Exports:**
- `error-log.json` - Fehler-Dokumentation (siehe 4.3)
- `section-metrics.json` - Pro-Section Metriken
- `aggregate-metrics.json` - Aggregierte Statistiken

---

## 9. Datengrundlagen für KI-Prüfung

### 9.1 Übersicht

**Die semantische KI-Prüfung benötigt umfassende Datengrundlagen, um qualitativ hochwertige Bewertungen abzugeben.**

---

### 9.2 Detaillierte Datenquellen

**1. Alle bereits generierten Sections:**
- **Zweck:** Konsistenzprüfung über Sections hinweg
- **Format:** HTML-Dateien oder JSON-Struktur
- **Umfang:** Alle Sections im Status `Approved` oder `Published`
- **Verwendung:** Abgleich von Terminologie, Tonalität, Struktur

**2. Terminologie-Entscheidungsliste:**
- **Zweck:** Konsistente Begriffswahl sicherstellen
- **Format:** JSON oder Markdown-Tabelle
- **Beispiel-Struktur:**
  ```json
  {
    "terminology": [
      {
        "term": "Query",
        "decision": "Abfrage",
        "language": "de",
        "rationale": "Geläufiger deutscher Begriff existiert",
        "context": "Allgemein"
      },
      {
        "term": "Artifacts Explorer",
        "decision": "Artifacts Explorer",
        "language": "en",
        "rationale": "Software-spezifisches UI-Element",
        "context": "Magnet AXIOM"
      }
    ]
  }
  ```
- **Pflege:** Durch Maintainer während Content-Generierung
- **Update:** Bei jedem neuen Begriff-Dilemma

**3. Rahmenplan & Gliederung:**
- **Zweck:** Prüfen, ob Section dem geplanten Aufbau entspricht
- **Format:** Hierarchische Struktur (JSON oder Markdown)
- **Beispiel:**
  ```json
  {
    "chapter": "Vorbereitung",
    "sections": [
      {
        "id": "section-template-selection",
        "title": "Template-Auswahl",
        "expectedTopics": [
          "Template-Typen",
          "Best-Practice Empfehlungen",
          "Häufige Fehler"
        ],
        "estimatedLength": "medium",
        "requiredMediaTypes": ["screenshot", "annotated"]
      }
    ]
  }
  ```

**4. Quellmaterial:**
- **Magnet AXIOM Handbuch** (offiziell, verschiedene Versionen)
- **Weitere Dokumentationen** (z.B. Release Notes, Knowledge Base)
- **Format:** PDF, HTML, Markdown
- **Verwendung:** Plausibilitätsprüfung von Anweisungen

**5. Style-Guides:**

**a) Writing-Guide (aus Cluster 1):**
- Zielgruppe: IT-ferne Ermittler
- Tonalität: Subtil-unterstützend, sachlich
- Sprachniveau: Einfache Sprache, kurze Sätze
- Terminologie-Regeln

**b) Mediennutzungs-Guide (aus Cluster 1):**
- Medien-Entscheidungsmatrix
- Wann Screenshot/Annotiert/Video/Diagramm?
- Alt-Text-Richtlinien (10-120 Zeichen)
- Video-Untertitel-Anforderungen

**c) HTML-Syntax-Guide (aus Cluster 3):**
- HTML-Element-Whitelist (32 Elemente)
- Pflicht-/Optional-Attribute pro Element
- Attribut-Reihenfolge (class → id → data-* → sonstige)
- CSS-Klassen-System
- HTML-Kommentar-Konventionen

**6. Erwartetes Antwortschema:**
- **Zweck:** Standardisierung der KI-Prüf-Outputs
- **Format:** JSON-Schema
- **Inhalt:** Struktur des semantischen Review-Reports (siehe 2.2.2)

---

### 9.3 Datenzugriff für KI-Agent

**Bereitstellung:**
- Alle Datenquellen werden der KI als **Kontext** übergeben
- Bei großen Datenmengen: Relevante Ausschnitte extrahieren
- Beispiel: Bei Section "Export" nur Sections aus Kapitel "Export" zur Konsistenzprüfung

**Update-Frequenz:**
- **Terminologie-Liste:** Bei Bedarf (neue Begriffe)
- **Sections:** Nach jedem Approval
- **Rahmenplan:** Zu Beginn jedes Kapitels
- **Quellmaterial:** Bei neuen Versionen von AXIOM

---

## 10. Zukünftige Erweiterungen

### 10.1 ValidationScore-Berechnung (detailliert)

**Aktuelle Formel (einfach):**
```
validationScore = 100 - (CRITICAL × 20) - (ERROR × 10) - (WARNING × 5)
```

**Geplante Erweiterungen:**

**Umfang berücksichtigen:**
- Längere Sections sollten höher bewertet werden (mehr Arbeit)
- Formel-Erweiterung: `+0.1 Punkte pro 100 Wörter` (max. +10 Punkte)

**Anzahl Medien berücksichtigen:**
- Mehr Medien = höherer Aufwand = bessere Bewertung
- Formel-Erweiterung: `+2 Punkte pro Medium` (max. +10 Punkte)

**Verhältnis Medien je Satz:**
- Optimales Verhältnis: 1 Medium pro 5-10 Sätze
- Zu wenig Medien: Abzug
- Zu viele Medien: Kein Abzug (besser zu viel als zu wenig)

**Komplexitätsfaktor:**
- Detail-Level 3 (Detailliert) schwieriger als Level 1 (Schnellübersicht)
- Bonus-Punkte für höhere Detail-Levels

**Beispiel-Formel (erweitert):**
```
validationScore = 100 
  - (CRITICAL × 20) 
  - (ERROR × 10) 
  - (WARNING × 5)
  + (Wortanzahl / 100) × 0.1    (max. +10)
  + (Anzahl Medien × 2)          (max. +10)
  + (DetailLevel × 5)            (max. +15)
  - (Medien-zu-Satz-Abweichung × 2)

Minimum: 0
Maximum: 135 (normalisiert auf 100)
```

**Status:** Noch nicht implementiert - **auf Agenda für spätere Iteration**

---

### 10.2 Weitere Metriken nach Bedarf

**Potenzielle zukünftige Metriken:**

**Lesbarkeit-Score:**
- Flesch-Reading-Ease Score (Deutsch-Variante)
- Ziel: ≥ 60 Punkte (leicht verständlich)

**Konsistenz-Score:**
- Wie konsistent ist Terminologie über Sections?
- Berechnung: % einheitlich verwendeter Begriffe

**Medien-Qualität-Score:**
- KI bewertet Screenshot-Qualität (Auflösung, Relevanz)
- Nur bei Option A (erweiterter Workflow mit Medien-Prüfung)

**Interaktivität-Score:**
- Wie viele Agent-Trigger pro Section?
- Ziel: Mindestens 1-2 Trigger pro Section

**Barrierefreiheit-Score:**
- Detaillierter als binäre Prüfung
- Punkte für: Alt-Texte, Sprachauszeichnung, Kontraste, etc.

**Status:** Nicht priorisiert - können bei Bedarf später hinzugefügt werden

---

### 10.3 Automatisierte Prompt-Verbesserung

**Vision:** Fehler-Log automatisch auswerten und Prompt-Verbesserungen vorschlagen

**Mechanismus:**
1. **Fehler-Häufigkeitsanalyse:** Welche Fehler treten am häufigsten auf?
2. **Pattern-Erkennung:** Gibt es systematische Probleme?
3. **Prompt-Diff generieren:** KI schlägt konkrete Prompt-Änderungen vor
4. **A/B-Testing:** Alte vs. neue Prompt-Version testen
5. **Iterative Verbesserung:** Prompt-Version erhöhen bei Erfolg

**Beispiel:**
- Fehler-Log zeigt: 30% aller Sections haben fehlende `data-title`
- KI-Analyse: Prompt erwähnt `data-title` nur einmal, nicht prominent
- KI-Vorschlag: "Füge separaten Abschnitt 'Pflicht-Attribute' mit Beispiel hinzu"
- Maintainer testet neuen Prompt
- Fehlerrate sinkt auf 5% → Prompt-Update wird permanent

**Status:** Zukunftsvision - nicht Teil von Cluster 4

---

## 11. Zusammenfassung & Nächste Schritte

### 11.1 Was wurde in Cluster 4 erreicht?

✅ **Validierungsebenen definiert:**
- Syntaktisch (automatisiert, bereits implementiert)
- Semantisch (KI-Agent + Maintainer)
- BFSG (implizit in syntaktischen Prüfungen)

✅ **Testkriterien spezifiziert:**
- Syntaktische Kriterien (Pflicht-Attribute, HTML-Struktur, Cross-References, etc.)
- Semantische Kriterien (Konsistenz, Plausibilität, Zusammenhang, etc.)

✅ **Validierungsprozess dokumentiert:**
- Standard-Workflow (Option B): Draft → Validierung → Review → Approved → Published
- Erweiterter Workflow (Option A): Mit zweifacher KI-Prüfung (vor/nach Medien)
- Fehler-Kategorisierung (CRITICAL/ERROR/WARNING/INFO)
- Fehler-Dokumentation (error-log.json)

✅ **Metadaten erweitert:**
- Neue QA-Felder: reviewStatus, lastReviewer, validationScore, knownIssues, reviewCycles, timeToPublish
- JSON-LD vollständig spezifiziert

✅ **Iterationslogik geklärt:**
- Status-Übergänge: Draft → Review → Approved → Published
- Kein automatisches Approval
- Review-Zyklen getrackt

✅ **Versionierung definiert:**
- MAJOR.MINOR.BUILD
- Erhöhungs-Regeln klar
- Git-basierte Archivierung

✅ **Metriken & Erfolgskriterien:**
- Pro Section: Fehler, Review-Zyklen, Zeit, validationScore
- Aggregiert: Durchschnitte, Status-Verteilung, Ablehnungsquote
- Reporting: Konsole, HTML, JSON

✅ **Datengrundlagen für KI-Prüfung:**
- Alle Sections, Terminologie-Liste, Rahmenplan, Quellmaterial, Style-Guides, Antwortschema

✅ **Zukünftige Erweiterungen dokumentiert:**
- ValidationScore (detailliert)
- Weitere Metriken nach Bedarf
- Automatisierte Prompt-Verbesserung

---

### 11.2 Offene Punkte für Cluster 5 (Workflow & Rollen)

**Cluster 5 wird sich mit folgenden Themen befassen:**

1. **Arbeitsschritte der KI:**
   - Research → Draft → Detailing → Review → Syntax-Check
   - Welche Tools/APIs nutzt die KI in jeder Phase?

2. **Rollendefinitionen:**
   - KI-Generator (erstellt Sections)
   - KI-Reviewer (semantische Prüfung)
   - Maintainer (finale Prüfung, Medien-Erstellung)
   - Validator (Python-Skripte)

3. **Schnittstellendefinition:**
   - Input/Output zwischen Phasen
   - Datenformate
   - Übergabepunkte

4. **Fehlerbehandlung & Feedback-Loops:**
   - Was passiert bei Fehlern in jeder Phase?
   - Wie wird Feedback zurück an die KI gegeben?
   - Eskalationspfade

5. **Tooling & Automation:**
   - Welche Tools unterstützen den Workflow?
   - Kann der Prozess teilweise automatisiert werden?

---

### 11.3 Nächste Schritte (konkret)

**Sofort umsetzbar (nach Cluster 4):**

1. **Fehler-Log implementieren:**
   - Datei: `logs/error-log.json`
   - Python-Skript erweitern: Bei Fehler → Eintrag erstellen
   - Aufwand: 1-2 Stunden

2. **QA-Metadaten in JSON-LD ergänzen:**
   - `qualityAssurance`-Block hinzufügen
   - Python-Validator erweitern
   - Aufwand: 1 Stunde

3. **ValidationScore berechnen (einfache Formel):**
   - Python-Funktion erstellen
   - In Validierungs-Output integrieren
   - Aufwand: 30 Minuten

4. **Workflow-Dokumentation für Team:**
   - Basierend auf Cluster 4
   - Für Maintainer verständlich aufbereitet
   - Aufwand: 1 Stunde

**Danach:**
- Cluster 5: Workflow & Rollen
- Dann: Prompt-Entwicklung (Integration aller Cluster)
- Testing & Iteration

---

## 12. Anhang

### 12.1 Referenz-Links

- **JSON-Schema:** https://json-schema.org/
- **Schema.org (JSON-LD):** https://schema.org/TechArticle
- **ISO-8601 Duration:** https://en.wikipedia.org/wiki/ISO_8601#Durations
- **BFSG (Barrierefreiheitsstärkungsgesetz):** https://www.gesetze-im-internet.de/bfsg/
- **Flesch Reading Ease (Deutsch):** https://de.wikipedia.org/wiki/Lesbarkeitsindex

---

### 12.2 Glossar

| Begriff | Definition |
|---------|------------|
| **Draft** | Initial generierte Section durch KI |
| **Review** | Section durchläuft semantische Prüfung, Medien werden erstellt |
| **Approved** | Section ist bereit zur Integration in index.html |
| **Published** | Section ist in index.html integriert und live |
| **validationScore** | 0-100 Punkte Score basierend auf Validierungsfehlern |
| **Review-Zyklus** | Anzahl Draft→Review→Draft Iterationen |
| **Fehler-Log** | JSON-Datei zur Dokumentation von Validierungsfehlern |
| **KI-Agent** | KI-System zur semantischen Vorprüfung von Sections |
| **Maintainer** | Mensch, der finale fachliche Prüfung durchführt |
| **Terminologie-Entscheidungsliste** | Liste mit Begriffsentscheidungen (deutsch vs. englisch) |

---

### 12.3 Beispiel: Vollständiger Validierungs-Durchlauf

**Szenario:** Section "Template-Typen im Detail" wird generiert

**Schritt 1: Draft**
- KI generiert Section mit 500 Wörtern, 3 Medien-Platzhaltern
- Status: `Draft`
- `version: 1.0.0`

**Schritt 2: Syntaktische Validierung**
- Python-Skript prüft HTML
- **Ergebnis:** 1 ERROR (fehlende `data-title`), 2 WARNINGS (>3 Hierarchie-Ebenen)
- validationScore = 100 - 10 - 10 = **80**
- Fehler-Log-Eintrag erstellt
- Zurück an KI mit Fehler-Output

**Schritt 3: KI korrigiert**
- KI fügt `data-title` hinzu
- Hierarchie optimiert
- Erneute Validierung: **0 Fehler**
- validationScore = **100**

**Schritt 4: Semantische KI-Prüfung**
- KI-Agent prüft Konsistenz, Plausibilität, etc.
- **Ergebnis:** 1 WARNING (Begriff "Query" statt "Abfrage")
- JSON-Report erstellt
- Statusübergang: `Draft` → `Review`

**Schritt 5: Review durch Maintainer**
- Maintainer liest KI-Report
- Korrigiert "Query" → "Abfrage"
- Erstellt 3 Screenshots basierend auf Platzhaltern
- Prüft fachliche Korrektheit: ✅ OK
- Entscheidung: **Approved**

**Schritt 6: Metadaten-Update**
- `reviewStatus: "Approved"`
- `lastReviewer: "Max Mustermann"`
- `lastReviewDate: "2025-10-09"`
- `validationScore: 100`
- `reviewCycles: 1`
- `timeToPublish: "PT1H30M"`

**Schritt 7: Published**
- Section wird in index.html integriert
- Statusübergang: `Approved` → `Published`
- Git-Commit: "Section template-types: Published"

**Fertig!** ✅

---

### 12.4 Checkliste für Maintainer

**Vor Review:**
- [ ] Section hat Status `Review`
- [ ] Syntaktische Validierung: 0 CRITICAL, 0 ERROR
- [ ] KI-Report liegt vor

**Während Review:**
- [ ] KI-Report gelesen und verstanden
- [ ] Alle Medien-Platzhalter abgearbeitet
- [ ] Screenshots/Videos erstellt und eingefügt
- [ ] Alt-Texte für alle Medien geschrieben
- [ ] Fachliche Korrektheit geprüft (Abgleich mit AXIOM)
- [ ] Terminologie konsistent (Abgleich mit Liste)
- [ ] Verständlichkeit für Zielgruppe gegeben

**Nach Review:**
- [ ] Entscheidung: Approved oder Reject (mit Feedback)
- [ ] Metadaten aktualisiert (`lastReviewer`, `reviewStatus`, etc.)
- [ ] Bei Approved: Git-Commit
- [ ] Bei Reject: Fehler-Log-Eintrag + Feedback an KI

---

**Ende Cluster 4**  
**Status:** Abgeschlossen und bereit für Cluster 5  
**Bearbeitungszeit:** ~1,5 Stunden
