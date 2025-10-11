# Cluster 5: Workflow & Rollen

**Projekt:** WebAssistantForensics  
**Version:** 1.0  
**Datum:** 2025-10-10  
**Status:** Final

---

## 1. Übersicht

### 1.1 Projektziel & Scope

**Ziel:** Entwicklung eines strukturierten Wissenssystems für IT-ferne Polizeibeamte zu IT-Forensik-Tools (initial: Magnet AXIOM Examine).

**Scope Version 1.0:**
- ~100-150 Sections
- KI-gestützte Content-Generierung (Claude Sonnet 4.5)
- JSON-Schema-validiertes HTML
- BFSG-konforme Barrierefreiheit
- Manuelle Kontrolle durch Maintainer bei allen kritischen Entscheidungen
- Git-basierte Versionierung

**Ausgeschlossen in v1.0 (für spätere Versionen):**
- Automatisierte Workflows (teilweise in v2.0)
- Parallelisierung von Draft-Erstellung
- Git-Workflow-Automatisierung
- Automatische Agent-Context-Generierung

---

### 1.2 Akteure & Rollen

#### Akteure

| Akteur | Beschreibung | Technologie |
|--------|--------------|-------------|
| **KI-System** | Claude Sonnet 4.5 für Content-Generierung und -Review | Anthropic Claude API / Web-Interface |
| **Python-Skripte** | Automatisierte Syntax- und Schema-Validierung | Python 3.x + JSON-Schema |
| **Maintainer** | Du oder Kollegen mit Gesamtverantwortung | Manuell |
| **Handbuch-Autoren** | Ersteller von Software-Dokumentation (passiv) | Externe Quellen |

#### Rollen-Matrix

| Rolle | Verantwortung | Akteure |
|-------|---------------|---------|
| **Content-Creator** | Erstellt initialen Content (Drafts, Medien) | KI-System, Maintainer |
| **Content-Validator** | Prüft Syntax, Schema-Konformität | Python-Skripte, Maintainer |
| **Content-Enricher** | Ergänzt Medien, Glossar, Agent-Context | Maintainer |
| **Content-Reviewer** | Prüft Qualität, Konsistenz, Korrektheit | KI-System, Maintainer |
| **Content-Distributor** | Komponiert und verteilt Endprodukt | Maintainer |

---

## 2. Workflow-Phasen

### Phase 0: Strategie

**Verantwortlich:** Maintainer  
**Häufigkeit:** Initial + bei Bedarf (neue Topics/Chapters)

#### Aktivitäten
1. **Lernziel definieren:** Was soll der Ermittler nach Durcharbeitung können?
2. **Fokus-Themen festlegen:** Welche Aspekte sind zentral, welche peripher?
3. **Umfang bestimmen:** Wie viele Sections, welche Detailtiefe?
4. **Software & Version benennen:** Welches Tool in welcher Version?
5. **Forensischer Kontext:** Mobilgerät, PC-System, Cloud, etc.?
6. **Quellen benennen:** AXIOM-Handbuch, interne Dokumentation, etc.

#### Output
- **Strategiedokument(e):**
  - **Global:** Für das Gesamtwerk
  - **Pro Topic/Chapter:** Bei Bedarf für Verfeinerung
- **Quellenliste:** Validierte, autorisierte Quellen

#### Flexibilität
- Strategiedokument ist **anpassbar** (Versionierung)
- Fokus auf **Ergebnis**, nicht auf absolute Perfektion
- Iterationen möglich, wenn sich Qualitätsprobleme zeigen

---

### Phase 0.5: Vorarbeit (iterativ bis Approval)

**Verantwortlich:** KI-System + Maintainer (Approval)  
**Häufigkeit:** Nach jeder Strategiedefinition/-anpassung

#### Aktivitäten (KI)
1. **Quellen analysieren:**
   - Inhaltsverzeichnis vollständig lesen
   - Kapitel-Intros (erste 2-3 Absätze) pro Hauptkapitel
   - Struktur-Hinweise erfassen (Querverweise, Abhängigkeiten)
2. **Gesamtgliederung erstellen:**
   - Topics → Chapters → Sections ableiten
   - Hierarchieebenen festlegen (3-5 Ebenen)
   - Abhängigkeiten identifizieren
3. **Grobe Inhaltsentwürfe pro Section:**
   - Lernziel formulieren
   - Key Topics auflisten
   - Kurzbeschreibung verfassen
   - Vorgänger/Nachfolger-Sections benennen

#### Output-Format (pro Section)

```
Section: axiom-case-creation
Gliederungsebene: 3
Lernziel: Ermittler kann eigenständig einen Fall anlegen
Key Topics:
  - Neuen Fall anlegen (New Case Dialog)
  - Evidenzquellen hinzufügen (Add Evidence)
  - Fall-Metadaten erfassen (Case Properties)
Kurzbeschreibung:
  Diese Section erklärt den kompletten Prozess der Fall-Erstellung in AXIOM.
  Der Fokus liegt auf der korrekten Auswahl der Evidenzquellen und der
  vollständigen Erfassung von Metadaten für spätere Berichte.
Vorgänger-Sections: axiom-installation, axiom-interface
Nachfolger-Sections: axiom-evidence-processing
```

#### Aktivitäten (Maintainer)
1. **Gliederung prüfen:** Ist die Struktur logisch und vollständig?
2. **Vollständigkeit bewerten:** Fehlen Sections? Sind Abhängigkeiten korrekt?
3. **Strategiekonformität prüfen:** Passt die Gliederung zum Strategiedokument?
4. **Entscheidung:**
   - **Approval:** Weiter zu Phase 1
   - **Reject:** Strategiedokument verfeinern → Phase 0.5b (Iteration)

#### Output
- **Section-Liste:** Abgesegnete Gliederung mit groben Inhaltsentwürfen
- **Status:** Approved für Phase 1

---

### Phase 1: Research & Draft (pro Section)

**Verantwortlich:** KI-System  
**Häufigkeit:** Pro Section, sequenziell (keine Parallelisierung in v1.0)

#### Input für KI

```
=== AKTUELL ZU ERSTELLENDE SECTION ===
[Section-Info aus Phase 0.5 wie oben beschrieben]

=== KONTEXT: BEREITS APPROBIERTE SECTIONS ===
[Volltext der 2-3 unmittelbar vorhergehenden Sections]

=== KONTEXT: GESAMTSTRUKTUR (ÜBERBLICK) ===
Topic: AXIOM Grundlagen
├─ Chapter: Installation & Setup
│  ├─ axiom-installation (✓ approbiert)
│  └─ axiom-interface (✓ approbiert)
├─ Chapter: Fall-Management
│  ├─ axiom-case-creation (← JETZT)
│  ├─ axiom-evidence-processing (geplant)
│  └─ axiom-case-export (geplant)

=== QUELLEN (DETAILLIERT) ===
[Relevante Kapitel aus AXIOM-Handbuch, vollständig]

=== STRATEGIEDOKUMENT ===
[Aktuelles Strategiedokument für diesen Bereich]
```

#### Aktivitäten (KI)
1. **Quellen vertiefen:** Relevante Abschnitte im Detail lesen
2. **Kontext verstehen:** Approbierte Sections auf Terminologie/Stil prüfen
3. **Draft erstellen:**
   - HTML gemäß Cluster 3 (BFSG, Whitelist, Attribute)
   - Content gemäß Cluster 1 (Zielgruppe, Detail-Level, Terminologie)
   - Struktur gemäß Cluster 2 (Hierarchie, data-ref, JSON-LD)
   - Medien-Platzhalter mit Dateinamen-Vorschlägen
   - Video-Untertitel-Entwürfe (SRT/VTT-Format)
4. **Selbstprüfung:** Kurze Plausibilitätsprüfung vor Ausgabe

#### Output
- **Section-Draft (HTML):** Vollständiger HTML-Code gemäß Schema
- **Medien-Spezifikationen:** Liste benötigter Screenshots/Videos mit Beschreibung
- **Untertitel-Entwürfe:** Zeitstempel-unabhängige Untertitel-Texte
- **Version:** 1.0.0

---

### Phase 2: Syntax-Validierung

**Verantwortlich:** Python-Skripte (automatisiert)  
**Häufigkeit:** Nach jedem Draft/jeder Korrektur

#### Aktivitäten
1. **JSON-Schema-Validierung:** Struktur, Pflicht-Attribute, Datentypen
2. **HTML-Element-Prüfung:** Nur erlaubte Elemente (Whitelist)
3. **Attribut-Vollständigkeit:** Pflicht-Attribute vorhanden?
4. **BFSG-Konformität:** lang-Attribute, Alt-Texte, Überschriften-Hierarchie
5. **Cross-Reference-Prüfung:** data-ref gültig und konsistent?
6. **CSS-Klassen-Prüfung:** Nur erlaubte Klassen verwendet?

#### Output-Format

```
=== SYNTAX VALIDATION REPORT ===
Section: axiom-case-creation
Version: 1.0.0
Datum: 2025-10-10 14:32:15

CRITICAL [Line 45]: Missing required attribute 'lang' on element <span>
ERROR [Line 78]: Invalid data-ref format 'axiom_case' (underscore not allowed)
ERROR [Line 102]: Element <table> not in whitelist (use <div> with CSS grid)
WARNING [Line 112]: Heading hierarchy skip (h2 → h4)
WARNING [Line 156]: Alt-text suspiciously short (< 10 characters): "AXIOM UI"
INFO [Line 89]: Consider adding 'title' attribute for better accessibility
INFO [Line 134]: data-detail-level="1" could benefit from level 2 variant

=== SUMMARY ===
CRITICAL: 1
ERROR: 2
WARNING: 2
INFO: 2

Status: FAILED (CRITICAL/ERROR present)
```

**Optional in v1.1:** Code-Snippet um Fehler herum für schnellere Lokalisierung

---

### Phase 3: Fehlerkorrektur (iterativ)

**Verantwortlich:** KI-System (CRITICAL/ERROR), Maintainer (WARNING/INFO)  
**Häufigkeit:** Nach jedem Validierungs-Fehlschlag

#### Aktivitäten bei CRITICAL/ERROR

1. **KI erhält:** Validierungs-Report (Textformat wie oben)
2. **KI korrigiert:**
   - Fehler lokalisieren
   - Korrekturen vornehmen (nur betroffene Stellen)
   - Keine inhaltlichen Änderungen (nur Syntax/Struktur)
3. **KI erstellt:** Neue Version (z.B. 1.0.1)
4. **Zurück zu Phase 2:** Erneute Validierung

**Abbruchkriterium:** Wenn nach 5 Iterationen noch CRITICAL/ERROR → Eskalation an Maintainer

#### Aktivitäten bei WARNING/INFO

1. **Maintainer erhält:** Validierungs-Report
2. **Maintainer entscheidet pro Warnung:**
   - **Beheben:** Manuell korrigieren oder KI beauftragen
   - **Ignorieren:** Als akzeptabel markieren (Begründung dokumentieren)
3. **Bei Korrekturen:** Neue Version erstellen

**Weiter zu Phase 4:** Wenn keine CRITICAL/ERROR mehr vorhanden

#### Output
- **Korrigierter Draft:** Syntaktisch valider HTML-Code
- **Version:** Inkrementiert bei Änderungen (z.B. 1.0.3)
- **Status:** Ready for Semantic Review

---

### Phase 4: Semantic Review

**Verantwortlich:** KI-System  
**Häufigkeit:** Nach syntaktischer Validierung, vor Medien-Erstellung

#### Input für KI

```
=== ZU REVIEWENDE SECTION ===
[Vollständiger HTML-Draft]

=== STRATEGIEDOKUMENT ===
[Relevantes Strategiedokument]

=== ALLE APPROBIERTEN SECTIONS ===
[Volltexte für Konsistenzprüfung]

=== TERMINOLOGIE-LISTE ===
[Organisch gewachsene Liste etablierter Begriffe]

=== SECTION-LISTE (PHASE 0.5) ===
[Ursprüngliche Inhaltsskizze für Vollständigkeitsprüfung]
```

#### Bewertungskriterien & Quality-Score (0-100)

| Kriterium | Gewicht | Max. Punkte | Bewertungsfragen |
|-----------|---------|-------------|------------------|
| **Strategiekonformität** | 30% | 30 | • Entspricht die Section dem Lernziel?<br>• Sind Fokus-Themen korrekt priorisiert?<br>• Passt der Umfang zur Strategievorgabe?<br>• Sind Abgrenzungen eingehalten? |
| **Verständlichkeit** | 25% | 25 | • Ist die Sprache zielgruppengerecht (IT-ferne Ermittler)?<br>• Sind Fachbegriffe erklärt?<br>• Ist die Schritt-für-Schritt-Logik nachvollziehbar?<br>• Sind Beispiele praxisnah? |
| **Vollständigkeit** | 20% | 20 | • Sind alle Key Topics aus Phase 0.5 abgedeckt?<br>• Fehlen wichtige Informationen für das Lernziel?<br>• Sind notwendige Cross-References vorhanden?<br>• Ist der Detailgrad angemessen? |
| **Konsistenz** | 15% | 15 | • Stimmt die Terminologie mit approbierten Sections überein?<br>• Passen Schreibstil und Tonalität?<br>• Sind Formatierungen einheitlich?<br>• Widersprechen Aussagen anderen Sections? |
| **Struktur** | 10% | 10 | • Ist die Gliederung logisch aufgebaut?<br>• Sind Überschriften-Hierarchien korrekt?<br>• Ist die Navigation intuitiv?<br>• Sind Content-Type-Boxen sinnvoll eingesetzt? |

#### Score-Interpretation

```
90-100 Punkte: Exzellent – Kann direkt zu Phase 5 (Medien-Erstellung)
75-89 Punkte:  Gut – Kleinere Anpassungen empfohlen, dann weiter
60-74 Punkte:  Akzeptabel – Mehrere Verbesserungen nötig, Review mit Maintainer
0-59 Punkte:   Ungenügend – Zurück zu Phase 1 (Draft neu erstellen)
```

#### Output-Format

```markdown
## Semantic Review Report

**Section:** axiom-case-creation  
**Version:** 1.0.3  
**Reviewer:** Claude Sonnet 4.5  
**Datum:** 2025-10-10 15:45:22

### Quality Score: 82/100 (Gut)

#### Detailbewertung

| Kriterium | Punkte | Max | Bemerkung |
|-----------|--------|-----|-----------|
| Strategiekonformität | 27 | 30 | Lernziel erreicht, Fokus-Themen gut abgedeckt. Empfehlung: Prozess der Evidenzquellenauswahl stärker betonen (laut Strategiedokument Priorität). |
| Verständlichkeit | 22 | 25 | Sprache zielgruppengerecht, gute Schritt-für-Schritt-Anleitung. Empfehlung: Fachbegriff "Hash-Algorithmus" in Zeile 67 erklären. |
| Vollständigkeit | 18 | 20 | Alle Key Topics vorhanden. Fehlt: Cross-Reference zu "axiom-evidence-types" für vertiefende Erklärung der Evidenzquellen. |
| Konsistenz | 12 | 15 | Terminologie stimmt überein. Abweichung: "Fallakte" statt "Fall" (in axiom-installation wird "Fall" verwendet). |
| Struktur | 9 | 10 | Gliederung logisch, Überschriften korrekt. Kleiner Hinweis: Info-Box in Zeile 45 könnte als Hint-Box besser passen (weniger kritische Information). |

#### Handlungsempfehlungen

**Priorität HOCH:**
1. Evidenzquellenauswahl-Prozess detaillierter beschreiben (Strategiekonformität +3 Punkte möglich)
2. Terminologie "Fallakte" → "Fall" anpassen (Konsistenz +2 Punkte)

**Priorität MITTEL:**
3. Cross-Reference zu "axiom-evidence-types" ergänzen (Vollständigkeit +2 Punkte)
4. Fachbegriff "Hash-Algorithmus" erklären (Verständlichkeit +2 Punkte)

**Priorität NIEDRIG:**
5. Info-Box → Hint-Box umwandeln (Struktur +1 Punkt)

**Geschätzter Score nach Anpassung:** 91/100 (Exzellent)

#### Entscheidung
☐ Direkt zu Phase 5 (Medien-Erstellung)  
☑ Anpassungen vornehmen, dann Phase 4 wiederholen  
☐ Zurück zu Phase 1 (Draft neu erstellen)
```

#### Weiter zu Phase 5
- Wenn Score ≥ 75 und Maintainer zustimmt

---

### Phase 5: Medien-Erstellung

**Verantwortlich:** Maintainer  
**Häufigkeit:** Pro Section nach Semantic Review

#### Medien-Spezifikationen

##### Screenshots

| Parameter | Wert |
|-----------|------|
| **Inhalt** | Nur Programm/Fenster/Pop-Up (kein Desktop-Hintergrund) |
| **Auflösung** | 72 dpi |
| **Farbtiefe** | Vollfarben |
| **Theme** | System-Skin/Theme (keine Custom-Themes) |
| **Format** | PNG, komprimiert 60-80% |
| **Datenschutz** | Relevante Bereiche schwärzen/pixeln |
| **Dateiname** | Von KI im Draft vorgegeben (z.B. `axiom-case-new-dialog.png`) |

##### Annotations (auf Screenshots)

| Parameter | Wert |
|-----------|------|
| **Kontrast** | Hoch (gut lesbar auf hellem/dunklem Hintergrund) |
| **Farbcode** | • Rot: Achtung<br>• Gelb: Warnung<br>• Blau: Hinweis<br>• Grün: Handlungsanweisung |
| **Pfeile** | Mindestbreite 4px |
| **Verdeckung** | Nichts Wichtiges verdecken |
| **Schriftart** | Open Sans (ohne Serifen) |
| **Schriftgröße** | 16px |

##### Videos

| Parameter | Wert |
|-----------|------|
| **Mindestauflösung** | 1280×720 (HD) |
| **Höchstauflösung** | 1920×1080 (Full HD) |
| **Mindestframerate** | 15 fps (ausreichend für Bildschirmaufnahmen) |
| **Mindestspieldauer** | 10 Sekunden |
| **Höchstspieldauer** | 180 Sekunden (3 Minuten) |
| **Seitenverhältnis** | 16:9 bevorzugt |
| **Audio** | Ohne Musik, ggf. Sprecherstimme |
| **Format** | MP4 bevorzugt |
| **Codec** | H.264 (AVC), H.265 (HEVC) oder AV1 |
| **Untertitel** | **Pflicht** (BFSG-Konformität), SRT/VTT-Format |

**Untertitel-Workflow:**
1. KI hat in Phase 1 Untertitel-Texte erstellt (ohne Zeitstempel)
2. Maintainer erstellt Video
3. Maintainer passt Zeitfenster im SRT/VTT-File an

#### Aktivitäten
1. **Medien erstellen:** Gemäß Draft-Spezifikationen und obigen Standards
2. **Qualität prüfen:** Lesbarkeit, Kontrast, Dateigröße
3. **Datenschutz sicherstellen:** Keine personenbezogenen Daten sichtbar
4. **Dateien benennen:** Gemäß Draft-Vorgaben

#### Output
- **Medien-Assets:** Screenshots, annotierte Bilder, Videos (inkl. Untertitel)
- **Dateinamen-Liste:** Mapping Draft-Platzhalter → tatsächliche Files

---

### Phase 6: Content-Enrichment

**Verantwortlich:** Maintainer  
**Häufigkeit:** Pro Section nach Medien-Erstellung

#### Aktivitäten
1. **Medien einbinden:**
   - Platzhalter durch echte Pfade ersetzen
   - `<img>`-Tags mit korrekten `src`, `alt`, `title` Attributen
   - `<video>`-Tags mit Untertitel-Tracks
2. **Glossar-Verweise ergänzen:**
   - Fachbegriffe mit `data-glossary-term` auszeichnen
   - Querverweise zu Glossar-Sections einfügen
3. **Agent-Context erstellen (v1.0: manuell, später: KI-gestützt):**
   - Trigger-Points identifizieren
   - Agent-Context-Block am Section-Ende einfügen
   - JSON-Struktur gemäß Cluster 2
4. **Finale Formatierungsprüfung:**
   - CSS-Klassen korrekt?
   - Barrierefreiheit durchgängig gewährleistet?

#### Output
- **Angereicherte Section:** Vollständig mit Medien, Glossar, Agent-Context
- **Version:** Inkrementiert (z.B. 1.1.0 für Content-Enrichment)
- **Status:** Ready for Final Review

---

### Phase 7: Final Review

**Verantwortlich:** Maintainer  
**Häufigkeit:** Pro Section nach Content-Enrichment

#### Aktivitäten
1. **Fachliche Korrektheit:** Sind alle Informationen korrekt und aktuell?
2. **UX-Prüfung:** Ist die Section intuitiv nutzbar?
3. **Gesamteindruck:** Passt die Section ins Gesamtwerk?
4. **Medienqualität:** Sind Screenshots/Videos verständlich und hilfreich?
5. **Barrierefreiheit:** End-to-End-Test mit Screenreader (stichprobenartig)

#### Entscheidung
- **Approval:** Weiter zu Phase 8 (Distribution)
- **Reject mit Feedback:**
  - **Minor:** Zurück zu Phase 6 (kleine Anpassungen)
  - **Major:** Zurück zu Phase 4 oder Phase 1 (grundlegende Überarbeitung)

#### Output
- **Approval-Status:** Approved / Rejected
- **Feedback-Dokument:** Bei Reject mit konkreten Verbesserungshinweisen

---

### Phase 8: Distribution

**Verantwortlich:** Maintainer  
**Häufigkeit:** Pro Section nach Final Review Approval

#### Aktivitäten
1. **Versionierung:**
   - Git-Commit mit beschreibender Message
   - Tag setzen (z.B. `section-axiom-case-creation-v1.1.0`)
2. **Branch-Überführung:**
   - Von `content-drafts` nach `content-approved`
   - Merge in `main` (falls produktionsreif)
3. **Komponierung:**
   - Section in Gesamt-Dokumentation integrieren
   - Navigation aktualisieren
4. **Veröffentlichung:**
   - Build-Prozess anstoßen (HTML-Generierung, Asset-Optimierung)
   - Deployment auf Zielplattform

#### Output
- **Published Section:** Öffentlich verfügbar in Wissenssystem
- **Git-Repository:** Versioniert und dokumentiert
- **Status:** Published

---

## 3. Schnittstellen & Datenformate

### 3.1 Bevorzugte Formate für KI-Arbeit

| Datentyp | Bevorzugtes Format | Begründung |
|----------|-------------------|------------|
| **Section-Beschreibungen** | Natürliche Sprache (Mischform Stichpunkte + Fließtext) | Besseres Verständnis von Nuancen und Kontext |
| **Fehlerberichte** | Textformat mit Zeilennummern | Direkte Lokalisierung, keine JSON-Interpretation nötig |
| **Strategiedokumente** | Markdown / Strukturierter Text | Gut lesbar, hierarchisch strukturierbar |
| **Quellenmaterial** | Text / Markdown / PDF (extrahiert) | Direkt verarbeitbar |
| **Approbierte Sections** | HTML (Volltext) | Analyse von Stil, Terminologie, Struktur |

### 3.2 Input/Output-Matrix

| Phase | Input | Output |
|-------|-------|--------|
| **0** | Projektziel, Zielgruppe, Rahmenbedingungen | Strategiedokument, Quellenliste |
| **0.5** | Strategiedokument, Quellen (Inhaltsverzeichnis + Intros) | Section-Liste mit groben Inhaltsentwürfen |
| **1** | Section-Info, approbierte Sections, Quellen (detailliert), Strategiedokument | Section-Draft (HTML), Medien-Spezifikationen, Untertitel-Entwürfe |
| **2** | Section-Draft (HTML) | Validierungs-Report (CRITICAL/ERROR/WARNING/INFO) |
| **3** | Validierungs-Report | Korrigierter Draft (neue Version) |
| **4** | Draft, Strategiedokument, approbierte Sections, Terminologie-Liste | Semantic Review Report, Quality-Score |
| **5** | Draft, Medien-Spezifikationen | Medien-Assets (Screenshots, Videos, Untertitel) |
| **6** | Draft, Medien-Assets, Glossar-Daten | Angereicherte Section (mit Medien, Glossar, Agent) |
| **7** | Angereicherte Section | Approval-Status, ggf. Feedback-Dokument |
| **8** | Approved Section | Published Section, Git-Tag |

---

## 4. Quality-Score-System

### 4.1 Kriterien & Gewichtung

**Gesamtscore:** 0-100 Punkte

| Kriterium | Gewicht | Max. Punkte | Fokus |
|-----------|---------|-------------|-------|
| Strategiekonformität | 30% | 30 | Passung zum Lernziel und Strategievorgaben |
| Verständlichkeit | 25% | 25 | Zielgruppengerechte Sprache und Didaktik |
| Vollständigkeit | 20% | 20 | Abdeckung aller Key Topics |
| Konsistenz | 15% | 15 | Terminologie, Stil, Format |
| Struktur | 10% | 10 | Logik, Hierarchie, Navigation |

### 4.2 Bewertungsmatrix (Strategiekonformität Beispiel)

| Punkte | Beschreibung |
|--------|--------------|
| 28-30 | Perfekte Umsetzung des Lernziels, alle Fokus-Themen priorisiert, exakte Umfangstreue |
| 24-27 | Lernziel erreicht, Fokus-Themen gut abgedeckt, minimale Abweichungen |
| 18-23 | Lernziel größtenteils erreicht, einige Fokus-Themen unterrepräsentiert |
| 12-17 | Lernziel teilweise verfehlt, wichtige Fokus-Themen fehlen oder falsch gewichtet |
| 0-11 | Lernziel nicht erreicht, gravierende Abweichungen von Strategievorgaben |

*(Analoge Matrizen für alle Kriterien)*

### 4.3 Report-Template

Siehe Phase 4 Output-Format (Markdown-basiert, strukturiert, mit konkreten Handlungsempfehlungen)

---

## 5. Fehlerbehandlung & Eskalation

### 5.1 Version 1.0: Manuelle Kontrolle (Option C)

**Prinzip:** Maintainer hat jederzeit volle Kontrolle und greift bei Bedarf ein.

#### Problem-Section-Handling

```
Maintainer beobachtet:
├─ Anzahl Iterationen (Phase 2 ↔ 3)
├─ Quality-Scores (Phase 4)
├─ Fehlermuster (wiederkehrende Probleme)
└─ Zeitaufwand pro Section

Maintainer entscheidet fallweise:
├─ Strategiedokument verfeinern → Phase 0.5b (neue Iteration)
├─ KI-Prompt anpassen (mehr Kontext, präzisere Anweisungen)
├─ Section-Beschreibung in Phase 0.5 präzisieren
├─ Quellenmaterial erweitern/verbessern
├─ Als letzter Ausweg: Section manuell schreiben
└─ Lessons Learned dokumentieren für v2.0
```

**Keine harte Abbruchgrenze:** Pragmatische Entscheidung basierend auf Aufwand-Nutzen-Verhältnis.

#### Eskalations-Trigger (informell)

- **Syntax-Fehler:** >5 Iterationen ohne Besserung → Maintainer prüft, ob Fehler systematisch ist
- **Semantic Review:** Score <60 über 2 Draft-Versionen → Strategiedokument überarbeiten
- **Zeitüberschreitung:** Section benötigt >4 Stunden → Prozess hinterfragen

#### Dokumentation

**Lessons Learned Log:**
```markdown
## Problem-Section: axiom-advanced-search
**Datum:** 2025-10-15
**Problem:** Score blieb bei 52-58 über 3 Drafts
**Ursache:** Strategiedokument zu vage ("erweiterte Suchfunktionen")
**Lösung:** Konkretisierung: "Boolean-Operatoren, Regex, Filter-Kombinationen"
**Ergebnis:** Score 87 nach neuem Draft
**Learning:** Strategiedokument braucht konkrete Feature-Namen, nicht nur Kategorien
```

---

### 5.2 Version 2.0: Automatische Eskalation (Option B) - Perspektivisch

**Prinzip:** System erkennt Problem-Sections automatisch und schlägt Lösungen vor.

#### Automatische Trigger

```
System überwacht:
├─ Syntax-Fehler-Häufigkeit (CRITICAL/ERROR pro Version)
├─ Semantic Review Scores (Trend über Versionen)
├─ Iterationszyklen (Anzahl Phase-2-3-Durchläufe)
└─ Zeitverbrauch (Dauer seit Phase 1 Start)

Eskalations-Schwellen:
├─ Score < 60 über 2 Draft-Versionen ODER
├─ >5 Syntax-Fehler-Iterationen ODER
├─ >3 Semantic-Review-Durchläufe ohne Verbesserung
└─ System markiert Section als "problematic"
```

#### Automatische Analyse

```
System analysiert:
├─ Fehlerhistorie:
│  ├─ Welche Kriterien scheitern wiederholt?
│  ├─ Sind Fehler syntaktisch oder semantisch?
│  └─ Gibt es Muster (z.B. immer Konsistenz-Probleme)?
├─ Strategiedokument-Qualität:
│  ├─ Sind Lernziele präzise formuliert?
│  ├─ Sind Key Topics spezifisch genug?
│  └─ Gibt es widersprüchliche Vorgaben?
├─ Quellenmaterial-Verfügbarkeit:
│  ├─ Ist das Thema ausreichend dokumentiert?
│  ├─ Sind Quellen aktuell?
│  └─ Fehlen wichtige Informationen?
└─ Komplexität:
   ├─ Ist die Section zu umfangreich?
   ├─ Sollte sie aufgeteilt werden?
   └─ Sind Vorgänger-Sections unzureichend?
```

#### System-Vorschläge

```markdown
## Eskalations-Report: axiom-advanced-search

**Status:** PROBLEMATIC  
**Trigger:** Score < 60 über 2 Drafts (52 → 58)  
**Datum:** 2025-10-15

### Analyse

**Fehler-Muster:**
- Strategiekonformität: Wiederholt niedrig (15-18/30)
- Vollständigkeit: Schwankend (12-16/20)
- Andere Kriterien: Akzeptabel (>80% Punktzahl)

**Strategiedokument-Prüfung:**
- Lernziel zu allgemein: "Ermittler kann erweiterte Suchen durchführen"
- Key Topics zu vage: "Erweiterte Suchfunktionen", "Filter"
- Keine konkreten Features genannt

**Quellen-Prüfung:**
- AXIOM-Handbuch Kapitel 7.2 "Advanced Search" vollständig verfügbar
- Keine Quellenprobleme erkennbar

### Empfohlene Maßnahmen

**PRIORITÄT 1: Strategiedokument verfeinern**

Vorschlag für neues Strategiedokument:
```
Lernziel: Ermittler kann Boolean-Operatoren (AND, OR, NOT), 
Regex-Patterns und Filter-Kombinationen für präzise Suchen einsetzen.

Key Topics:
- Boolean-Operatoren (AND, OR, NOT, Klammersetzung)
- Regex-Grundlagen (., *, +, ?, [])
- Filter-Kombinationen (Dateityp + Zeitraum + Keyword)
- Suchhistorie und Suche speichern
```

**PRIORITÄT 2: Section ggf. aufteilen**

Wenn Strategiedokument-Verbesserung nicht hilft:
- Section 1: "Boolean-Suche in AXIOM" (Grundlagen)
- Section 2: "Regex-Suche in AXIOM" (für Fortgeschrittene)
- Section 3: "Filter-Kombinationen in AXIOM"

### Maintainer-Entscheidung erforderlich

☐ Strategiedokument verfeinern (Vorschlag übernehmen)  
☐ Strategiedokument verfeinern (eigene Formulierung)  
☐ Section aufteilen  
☐ Manuell schreiben (KI-Generierung abbrechen)
```

---

## 6. Medien-Spezifikationen

*(Bereits vollständig in Phase 5 dokumentiert)*

**Zusammenfassung:**

| Medientyp | Key-Parameter |
|-----------|---------------|
| **Screenshots** | PNG 60-80%, 72dpi, System-Theme, Datenschutz beachten |
| **Annotations** | Open Sans 16px, Farbcode (Rot/Gelb/Blau/Grün), Pfeile ≥4px |
| **Videos** | 1280×720 bis 1920×1080, 15fps min, MP4/H.264, Untertitel Pflicht |

---

## 7. Versionierung & Speicherung

### 7.1 Git-Branch-Struktur

```
main
├─ Nur Published Sections (Phase 8)
├─ Tag-basierte Releases (z.B. v1.0.0, v1.1.0)
└─ Protected Branch (nur Maintainer darf mergen)

content-approved
├─ Sections nach Final Review (Phase 7)
├─ Bereit für Deployment
└─ Merge-Target für content-drafts

content-drafts
├─ Arbeitskopien (Phase 1-6)
├─ Unterverzeichnisse pro Section
└─ Versionsnummern in Commit-Messages
```

### 7.2 Namenskonventionen

**Verzeichnisstruktur:**
```
content-drafts/
├─ axiom-grundlagen/
│  ├─ axiom-installation/
│  │  ├─ section.html
│  │  ├─ media/
│  │  │  ├─ axiom-install-welcome.png
│  │  │  └─ axiom-install-process.mp4
│  │  └─ metadata.json
│  └─ axiom-case-management/
└─ axiom-analysis/
```

**Versionsnummern:**
- Format: `MAJOR.MINOR.BUILD`
- MAJOR: Grundlegende Überarbeitung (zurück zu Phase 1)
- MINOR: Content-Enrichment, größere Änderungen
- BUILD: Bugfixes, kleine Korrekturen

**Git-Tags:**
```
section-axiom-installation-v1.0.0
section-axiom-installation-v1.1.0 (nach Content-Enrichment)
section-axiom-installation-v1.1.2 (nach Bugfixes)
```

### 7.3 Metadaten-Datei (metadata.json)

```json
{
  "section_id": "axiom-case-creation",
  "version": "1.1.0",
  "status": "approved",
  "created": "2025-10-10T14:00:00Z",
  "last_modified": "2025-10-10T16:30:00Z",
  "author": "Claude Sonnet 4.5",
  "maintainer": "Max Mustermann",
  "quality_score": 87,
  "review_cycles": 2,
  "validation_errors": {
    "critical": 0,
    "error": 0,
    "warning": 1,
    "info": 3
  },
  "sources": [
    "AXIOM Examine User Guide v7.8, Chapter 4",
    "Internal Best Practices Doc v2.3"
  ],
  "learning_goal": "Ermittler kann eigenständig einen Fall anlegen",
  "hierarchy_level": 3,
  "prerequisites": ["axiom-installation", "axiom-interface"],
  "related_sections": ["axiom-evidence-processing", "axiom-case-export"]
}
```

---

## 8. Version 1.0 vs. spätere Versionen

### 8.1 Scope Version 1.0

**Im Scope:**
- ✅ Manuelle Kontrolle durch Maintainer bei allen kritischen Entscheidungen
- ✅ Sequenzielle Section-Erstellung (keine Parallelisierung)
- ✅ KI-generierte Drafts mit manueller Review
- ✅ Python-basierte Syntax-Validierung (automatisiert)
- ✅ KI-basierte Semantic Review (automatisiert)
- ✅ Manuelle Medien-Erstellung
- ✅ Manuelle Agent-Context-Erstellung
- ✅ Git-basierte Versionierung (manuell)
- ✅ Organisch wachsende Terminologie-Liste
- ✅ Fehlerbehandlung: Option C (manuelle Entscheidung)

**Ausgeschlossen:**
- ❌ Automatisierte End-to-End-Workflows
- ❌ Parallelisierung von Draft-Erstellung
- ❌ Automatische Git-Workflows (CI/CD)
- ❌ Automatische Agent-Context-Generierung
- ❌ Automatische Eskalation (Option B)

---

### 8.2 Roadmap für spätere Versionen

#### Version 1.1 (Quick Wins)

**Geplante Verbesserungen:**
- 🔄 Code-Snippet-Kontext in Fehlerberichten (Phase 2)
- 🔄 Medien-Template-Bibliothek (Annotations schneller erstellen)
- 🔄 Erweiterte Metadaten-Analyse (Trends, Bottlenecks)

**Aufwand:** Niedrig (< 2 Wochen Entwicklung)

---

#### Version 2.0 (Automatisierung & Skalierung)

**Geplante Verbesserungen:**
- 🔄 **Teilautomatisierung:**
  - Claude API-Integration (Python-Wrapper)
  - Batch-Processing für mehrere Sections
  - Automatische Git-Commits nach Approval
- 🔄 **Parallelisierung:**
  - Unabhängige Sections parallel erstellen
  - Dependency-Graph für Reihenfolge
- 🔄 **Fehlerbehandlung:**
  - Option B: Automatische Eskalation
  - System-Vorschläge für Strategiedokument-Verbesserungen
- 🔄 **Erweiterte Metriken:**
  - Dashboard für Workflow-Monitoring
  - Predictive Analytics (Zeitschätzungen pro Section)

**Aufwand:** Mittel (1-2 Monate Entwicklung)

---

#### Version 3.0 (KI-Agent-System)

**Geplante Verbesserungen:**
- 🔄 **Automatische Agent-Context-Generierung:**
  - KI schlägt Trigger-Points vor
  - KI generiert Agent-Kontext-Blöcke
  - Maintainer reviewed und genehmigt
- 🔄 **Multi-Tool-Unterstützung:**
  - X-Ways Forensics, Cellebrite Reader parallel pflegen
  - Tool-spezifische Metadaten automatisch verwalten
- 🔄 **Adaptive Strategiedokumente:**
  - KI lernt aus Problem-Sections
  - Vorschläge zur Strategieverbesserung
  - Self-Healing-Workflows

**Aufwand:** Hoch (3-6 Monate Entwicklung)

---

## Anhang

### A.1 Checkliste: Phase 0 (Strategie)

**Vor Start von Phase 0.5:**

- [ ] Lernziel formuliert (konkret, messbar)
- [ ] Fokus-Themen definiert (inkl. Abgrenzungen)
- [ ] Umfang geschätzt (Anzahl Sections, Detailtiefe)
- [ ] Software & Version benannt
- [ ] Forensischer Kontext geklärt (Mobilgerät/PC/Cloud)
- [ ] Quellen benannt und validiert (min. 1 Hauptquelle)
- [ ] Strategiedokument versioniert (z.B. v1.0.0)

---

### A.2 Checkliste: Phase 5 (Medien-Erstellung)

**Vor Übergabe an Phase 6:**

**Screenshots:**
- [ ] Nur Programm/Fenster (kein Desktop)
- [ ] 72 dpi, Vollfarben, System-Theme
- [ ] PNG 60-80% komprimiert
- [ ] Datenschutz: Relevante Bereiche geschwärzt/gepixelt
- [ ] Dateinamen gemäß Draft-Vorgabe

**Annotations:**
- [ ] Open Sans 16px
- [ ] Farbcode eingehalten (Rot/Gelb/Blau/Grün)
- [ ] Pfeile ≥4px breit
- [ ] Nichts Wichtiges verdeckt
- [ ] Hoher Kontrast

**Videos:**
- [ ] Auflösung 1280×720 bis 1920×1080
- [ ] Framerate ≥15 fps
- [ ] Spieldauer 10-180 Sekunden
- [ ] Format: MP4, Codec: H.264/H.265/AV1
- [ ] 16:9 Seitenverhältnis
- [ ] Untertitel (SRT/VTT) vorhanden und synchronisiert
- [ ] Keine Musik, ggf. Sprecherstimme verständlich

---

### A.3 Beispiel: Strategiedokument

```markdown
# Strategiedokument: AXIOM Case Management

**Version:** 1.0.0  
**Datum:** 2025-10-05  
**Gültigkeit:** Topic "AXIOM Case Management"

## Lernziel

Ermittler können eigenständig Fälle in AXIOM Examine v7.8 erstellen, 
Evidenzquellen hinzufügen, Fälle verwalten und für Berichte exportieren.

## Fokus-Themen

**Priorität HOCH:**
- Fall-Erstellung (New Case Dialog, Metadaten)
- Evidenzquellen-Auswahl (Devices, Images, Cloud)
- Fall-Export (Reports, Evidence Files)

**Priorität MITTEL:**
- Fall-Verwaltung (Öffnen, Schließen, Archivieren)
- Mehrere Evidenzquellen pro Fall

**Priorität NIEDRIG:**
- Erweiterte Metadaten (Custom Fields)
- Fall-Vorlagen (Templates)

**Explizit ausgeschlossen:**
- Case Sharing (Multi-User-Szenarien)
- Server-basierte Fälle (nur lokale Fälle)

## Umfang

**Geschätzte Sections:** 6-8

1. axiom-case-creation (Standard-Detail)
2. axiom-evidence-sources (Standard-Detail)
3. axiom-case-metadata (Basic-Detail)
4. axiom-case-management (Basic-Detail)
5. axiom-multi-evidence (Standard-Detail)
6. axiom-case-export (Standard-Detail)
7. axiom-case-templates (Optional, Show-Only)

## Forensischer Kontext

**Primär:** Mobilgeräte (Smartphones, Tablets)  
**Sekundär:** PC-Systeme (Windows, macOS)  
**Ausgeklammert:** Cloud-Forensik (eigenes Topic)

## Software & Version

**Tool:** Magnet AXIOM Examine  
**Version:** 7.8.x (aktuelle Stable-Version, Stand 2024-Q4)  
**Hinweis:** Screenshots mit Default-Skin, keine Custom-Themes

## Quellen

**Primär:**
- AXIOM Examine User Guide v7.8, Chapter 3-4
- Magnet Forensics Knowledge Base (online)

**Sekundär:**
- Interne Best Practices "Case Management Workflows" v2.3
- AXIOM Release Notes v7.8

## Terminologie-Entscheidungen

| Begriff | Verwendung | Begründung |
|---------|-----------|------------|
| "Fall" | Bevorzugt | Kurz, gebräuchlich in deutschem Polizeikontext |
| "Fallakte" | Vermeiden | Zu formal, potenziell missverständlich |
| "Evidenzquelle" | Bevorzugt | Präziser als "Datenquelle" |
| "Case" | Nur in UI-Kontext | Wenn AXIOM-UI englische Begriffe nutzt |

## Zielgruppen-Spezifika

**Primäre Zielgruppe:** Polizei-Ermittler, IT-fern (Mittlere Reife)  
**Detail-Level-Verteilung:**
- 60% Standard-Detail
- 25% Basic-Detail
- 10% Expert-Detail (nur für Spezialfälle)
- 5% Show-Only (optionale Vertiefungen)

**Sprach-Richtlinien:**
- Deutsch bevorzugt
- Englische UI-Begriffe in Anführungszeichen ("New Case")
- Fachbegriffe beim ersten Auftreten erklären
- Schritt-für-Schritt-Anleitungen mit Screenshots

---

**Approval:**  
☑ Maintainer: Max Mustermann, 2025-10-05  
☐ Fach-Review: [optional]
```

---

### A.4 Beispiel: Section-Liste (Phase 0.5 Output)

```markdown
# Section-Liste: AXIOM Case Management

**Erstellt:** 2025-10-06  
**Status:** Awaiting Maintainer Approval  
**Basis:** Strategiedokument v1.0.0

---

## Topic: AXIOM Case Management

### Chapter 1: Grundlagen

#### Section 1.1: axiom-case-creation

**Gliederungsebene:** 3  
**Lernziel:** Ermittler kann eigenständig einen Fall in AXIOM anlegen  
**Key Topics:**
- New Case Dialog öffnen (File → New Case)
- Fall-Namen und Beschreibung eingeben
- Examiner-Informationen erfassen
- Speicherort wählen

**Kurzbeschreibung:**  
Diese Section führt Schritt für Schritt durch die Fall-Erstellung in AXIOM Examine. 
Der Fokus liegt auf der korrekten Erfassung von Metadaten (Fall-Name, Examiner, 
Beschreibung) und der Auswahl eines geeigneten Speicherorts. Es wird erklärt, 
warum vollständige Metadaten für spätere Berichte wichtig sind.

**Vorgänger-Sections:** axiom-installation, axiom-interface  
**Nachfolger-Sections:** axiom-evidence-sources

**Geschätzte Komplexität:** Basic  
**Geschätzte Medien:** 3 Screenshots, ggf. 1 kurzes Video (30 Sek)

---

#### Section 1.2: axiom-evidence-sources

**Gliederungsebene:** 3  
**Lernziel:** Ermittler kann verschiedene Evidenzquellentypen unterscheiden und auswählen  
**Key Topics:**
- Device (direkter Zugriff auf angeschlossenes Gerät)
- Image File (forensisches Abbild laden)
- Cloud (Online-Datenquellen)
- Entscheidungshilfe: Wann welcher Typ?

**Kurzbeschreibung:**  
Diese Section erklärt die verschiedenen Evidenzquellentypen in AXIOM und gibt 
Entscheidungshilfen, wann welcher Typ zu verwenden ist. Sie zeigt die Unterschiede 
zwischen direktem Device-Zugriff (schnell, aber Veränderungsgefahr) und Image Files 
(forensisch sauber, aber mehr Vorbereitungsaufwand). Cloud-Quellen werden nur 
oberflächlich erwähnt, da sie in einem eigenen Topic behandelt werden.

**Vorgänger-Sections:** axiom-case-creation  
**Nachfolger-Sections:** axiom-case-metadata, axiom-multi-evidence

**Geschätzte Komplexität:** Standard  
**Geschätzte Medien:** 4 Screenshots, 1 Entscheidungsdiagramm, ggf. 1 Video (60 Sek)

---

[... weitere Sections analog ...]

---

**Gesamt:**
- 7 Sections (6 regulär, 1 optional)
- Geschätzte Gesamtarbeitszeit: 15-20 Stunden
- Geschätzte Medien: ~25 Screenshots, 3-5 Videos, 2 Diagramme
```

---

### A.5 Terminologie-Liste (organisch wachsend)

```markdown
# Terminologie-Liste: WebAssistantForensics

**Version:** 1.3.5  
**Letztes Update:** 2025-10-10  
**Status:** Living Document (organisch wachsend)

---

## Entscheidungen

| Begriff (DE) | Begriff (EN) | Verwendung | Kontext | Quelle |
|--------------|--------------|-----------|---------|--------|
| Fall | Case | **Präferenz: "Fall"** | Allgemein, nur "Case" wenn UI-Referenz | Strategiedokument AXIOM Case Management v1.0.0 |
| Fallakte | Case File | **Vermeiden**, stattdessen "Fall" | - | Feedback Section axiom-case-creation v1.0.3 |
| Evidenzquelle | Evidence Source | **Präferenz: "Evidenzquelle"** | Allgemein | Strategiedokument v1.0.0 |
| Abbild | Image | **"Forensisches Abbild"** bei erster Erwähnung, dann "Abbild" | Forensik-Kontext | Section axiom-evidence-sources v1.1.0 |
| Hash-Wert | Hash Value | **Präferenz: "Hash-Wert"** | Allgemein | Section axiom-integrity-check v1.0.0 |
| Prüfsumme | Checksum | **Synonym für "Hash-Wert"**, sparsam verwenden | Wenn Verständlichkeit erhöht wird | Semantic Review axiom-integrity-check |

---

## Erklärungspflichtige Fachbegriffe

| Begriff | Erklärung (erste Erwähnung) | Beispiel-Section |
|---------|----------------------------|------------------|
| Hash-Wert | "Ein Hash-Wert ist ein eindeutiger 'Fingerabdruck' einer Datei, der zur Integritätsprüfung dient." | axiom-integrity-check |
| Hex-Editor | "Ein Hex-Editor zeigt Dateiinhalte in hexadezimaler Form (0-9, A-F) an, was für forensische Analysen wichtig ist." | axiom-hex-view |
| Artifact | "Ein Artifact ist ein digital

es Spurenobjekt (z.B. Browser-Historie, GPS-Koordinaten), das AXIOM automatisch erkennt." | axiom-artifacts-overview |

---

**Hinweis:** Diese Liste wächst mit jeder neuen Section. Bei Terminologie-Konflikten 
ist das Strategiedokument maßgeblich, gefolgt von der Mehrheit approbierter Sections.
```

---

## Ende Cluster 5

**Nächste Schritte:**
1. Dieses Dokument in Projekt-Dateispeicher ablegen: `cluster5_Workflow-Rollen.md`
2. Bei Bedarf Reviews mit Stakeholdern durchführen
3. Mit Phase 0 (Strategie) für erste Section beginnen
4. Lessons Learned kontinuierlich dokumentieren für v2.0

**Fragen oder Anmerkungen:** Maintainer kontaktieren

---

**Versionshistorie:**

| Version | Datum | Änderung |
|---------|-------|----------|
| 1.0.0 | 2025-10-10 | Initiale Erstellung (Cluster 5 abgeschlossen) |