# Projekt-Fortsetzung: Master-Prompt-Komposition für KI-Content-Generierung

Hallo! Ich arbeite am Projekt **WebAssistantForensics** und möchte die Arbeit fortsetzen.

---

## Kontext

Ich entwickle ein strukturiertes Wissenssystem für Polizeibeamte zu IT-Forensik-Themen. Das System basiert auf:
- JSON-Schema-validiertem HTML-Content
- Verschiedene Detail-Level (Basic, Standard, Expert, Show-Only)
- BFSG-konforme Barrierefreiheit
- Python-basierte Validierung
- KI-gestützte Content-Generierung (Claude Sonnet 4.5)

---

## Projektziel

**Ziel:** Entwicklung eines strukturierten Wissenssystems für IT-ferne Polizeibeamte zu IT-Forensik-Tools.

**Ziel-Tool (initial):** Magnet AXIOM Examine  
**Spätere Erweiterung:** X-Ways Forensics, Cellebrite Reader  
**Haupt-Zielgruppe:** IT-ferne Polizei-Ermittler (Mittlere Reife, niedrige IT-Kenntnisse)  
**Content-Umfang:** ~100-150 Sections  
**KI-Modell:** Claude Sonnet 4.5  
**Validierung:** Python-basiert + JSON-Schema

## Über das Projekt
Das Projekt heißt **WebAssistantForensics**. Dabei handelt es sich um eine webbasierte, interaktive Anwendung zur Unterstützung von Polizeimitarbeitern bei der forensischen Auswertung mit Forensischer Fachsoftware, beispielsweise Magnet Forensics Axiom Examiner. Das Projekt kombiniert statische Anleitungen mit einem ineraktiven, JSON-basierten, situationsabhängigen Assistenten ("Spürhund Rex"), der Benutzer durch komplexe Workflows führt.

### Zielgruppe

-   Polizeimitarbeiter ohne forensische IT-Kenntnisse
-   IT-Laien in Ermittlungsbehörden
-   Vorsichtige, nicht-experimentierfreudige Benutzer

### Kernkonzept: Zwei-Ebenen-System

-   **Ebene A**: Statische Anleitung (klassischer Leitfaden mit progressiver Detailtiefe)
-   **Ebene B**: Dynamischer Agent-Begleiter (kontextabhängige Führung und Erklärungen)
---

## Das Ziel dieses Aufgabenblocks
Wir möchten eine Umgebung schaffen, in welcher die KI anhand gegebener Rahmenparameter die Inhalte für **Ebene A** erschaffen kann.

## Aktueller Stand
* Wenn wir den Bedarf haben, mit der Weboberfläche zu arbeiten und dort ein Debugging zu betreiben, so werde ich ein Datei im Projekt ablegen, die `Debug-output.xxx` heißt, wobei `xxx` für die aktuelle Build-Nummer steht. Im Augenblick ist diese 068. Ich erwarte aber für diesen Aufgabenblock keine Arbeiten an der Weboberfläche.

## Verzeichnisstruktur
```
.  
├── assets  
│ ├── icons  
│ ├── images  
│ └── videos  
├── create-thumbnails.sh  
├── docs  
│ ├── api  
│ ├── architecture  
│ └── user-guide  
├── LICENSE  
├── manuals  
│ ├── agent-implementation-guide.md  
│ ├── axiom-guide-implementation-doc.md  
│ ├── BFSG-Sprachauszeichnung-Richtlinien.md -> cluster3_results.md  
│ ├── cluster1-final.md  
│ ├── cluster2_results.md  
│ ├── cluster3_BFSG-Barrierefreiheit-Content.md  
│ ├── cluster3_BFSG-Sprachauszeichnung-Richtlinien.md  
│ ├── cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md  
│ ├── cluster3-phase-b.md  
│ ├── cluster3-phase-b.md.bak  
│ ├── cluster3_results.md  
│ ├── cluster4_Qualitätssicherung-Metadaten-Validierung.md  
│ ├── diff.txt  
│ ├── improvement-proposals.md  
│ ├── media-types-guide.md  
│ ├── overview-improvements.md  
│ ├── task1.md  
│ ├── task2-continuation.md  
│ ├── task3-Continuation-Prompt-für-neuen-Chat.md  
│ ├── task3-draft.md  
│ ├── task6_continuation_prompt.md  
│ ├── v01-state-management.md  
│ ├── v03-tooltips-onboarding.md  
│ ├── v04-css-html-js-separation.md  
│ ├── v04-css-html-js-trennung.md  
│ ├── v05-favorites-sidebar.md  
│ ├── v06-glossar-feature.md  
│ ├── v07-show-only-mode.md  
│ ├── v08-agent-faq-feedback.md  
│ ├── v09-animation-harmonization.md  
│ ├── v10-notes-tabs-system.md  
│ ├── v11-content-metadata.md  
│ ├── v12-schema-extension.md  
│ └── validation_docs_v2.md  
├── package.json  
├── package-lock.json  
├── project-diary  
│ ├── day-summary-001.md  
│ └── prompts  
│ ├── Continuation Prompt.ms  
│ ├── prompt-001-grundstruktur.md  
│ ├── prompt-002-modulare-struktur.md  
│ ├── prompt-003-interaktive-features.md  
│ ├── prompt-004-agent-system.md  
│ ├── prompt-phoenix.md  
│ ├── prompts-to-remember.txt  
│ ├── Prompts-to-remember.txt  
│ ├── prompt-template.md  
│ └── section-erstellung.md  
├── README.md  
├── run-dev.sh  
├── run-webserver.sh  
├── schema  
│ ├── agent-dialogs.schema.json  
│ ├── main-content.schema.json  
│ └── media-report.schema.json  
├── src  
│ ├── agent-dialogs.json  
│ ├── android-chrome-192x192.png  
│ ├── android-chrome-512x512.png  
│ ├── apple-touch-icon.png  
│ ├── css  
│ │ ├── agent.css  
│ │ ├── media.css  
│ │ ├── styles.before.css  
│ │ └── styles.css  
│ ├── favicon-16x16.png  
│ ├── favicon-32x32.png  
│ ├── favicon.ico  
│ ├── index.html  
│ ├── index.html.backup  
│ ├── index.html.template  
│ ├── index.test.html  
│ ├── js  
│ │ ├── agent.js  
│ │ ├── media-handler.js  
│ │ ├── script-core.js  
│ │ ├── script-detail-level.js  
│ │ ├── script-history.js  
│ │ ├── script-init.js  
│ │ ├── script.js  
│ │ ├── script-navigation.js  
│ │ ├── script-notes.js  
│ │ ├── script-preferences.js  
│ │ ├── script-section-management.js  
│ │ ├── script-sidebar-manager.before.js  
│ │ ├── script-sidebar-manager.js  
│ │ ├── script-state-manager.js  
│ │ ├── script-theme.js  
│ │ └── script-tips.js  
│ ├── media  
│ │ ├── annotated  
│ │ │ ├── axiom-menu-marked.png  
│ │ │ ├── axiom-menu-marked-thumb.png  
│ │ │ ├── format-steps-marked.png  
│ │ │ └── format-steps-marked-thumb.png  
│ │ ├── other  
│ │ ├── screenshots  
│ │ │ ├── format-dialog.png  
│ │ │ ├── format-dialog-thumb.png  
│ │ │ ├── format-html-selection.png  
│ │ │ ├── format-html-selection-thumb.png  
│ │ │ ├── format-selection.png  
│ │ │ ├── format-selection-thumb.png  
│ │ │ ├── menu-datei-bericht.png  
│ │ │ └── menu-datei-bericht-thumb.png  
│ │ └── videos  
│ │ ├── export-workflow.mp4  
│ │ ├── export-workflow-poster.jpg  
│ │ └── export-workflow.vtt  
│ └── site.webmanifest  
├── __tests__  
│ ├── agent.test.js  
│ ├── media-handler.test.js  
│ └── script.test.js  
├── tests  
│ ├── accessibility  
│ ├── integration  
│ └── unit  
├── tools  
│ ├── requirements.txt  
│ ├── validate.sh  
│ └── validation  
│ ├── __init__.py  
│ ├── main_content_parser.py  
│ ├── media-validation-report.html  
│ ├── README.md  
│ ├── requirements.txt  
│ ├── run_validate_agent_links.sh  
│ ├── template.html  
│ ├── validate_agent_json.py  
│ ├── validate_agent_links_prepare_test.py  
│ ├── validate_agent_links.py  
│ ├── validate_commit_msg.js  
│ ├── validate_html_extended.py  
│ ├── validate_html_structure.py  
│ ├── validate_main_structure.py  
│ └── validate_media.py  
└── webserver.log
```
* Die Client-basierte Webanwendung besteht nur aus dem Inhalt des Verzeichnisses `./src/`. Die HTML-Datei `index.html` ist die Hauptdatei. Du findest die meisten wichtigen Dateien auch abgelegt im Projekt-Dateispeicher.
* Bislang ist die Weboberfläche zu 95% fertig. Es fehlen noch kleine Anpassungen und Verbesserungen bezogen auf CSS.
* Auch die Pyhton Validierungs-Skript sind schon sehr weit fortgeschritten und produktiv nutzbar. Einige Funktionen müssen aber noch ergänzt werden.

## Technischer Stack
* Alle Technologien bei der Webanwendung sind Vanilla. → HTML, CSS und JS. Es wird kein Framework benutzt.
* Es gibt keine externen Bibliotheken. Ziel ist es, das Projekt autark zu halten.

## Projekthistorie
* Ursprünglich habe ich noch die Prompts und angegangenen Aufgaben vollständig dokumentiert, aber ich bin dabei nachlässig geworden. 😅
* Für das Projekt existiert ein Git-Repository bei GitHub: → https://github.com/froiloc/WebAssistantForensics

## Roadmap
Ziel ist es, die Version 1.0 in den nächsten Tagen zu erreichen. Das bedeutet, eine Liste von Funktionen und Inhalten muss verfügbar sein, sodass die Anwendung produktiv genutzt und getestet werden kann.
Hiernach sollen noch weitere Funktionen implementiert und in die Version 1.1 integriert werden:
* **Glossar** eine JSON basierte Datenbank mit Fachbegriffen und Erläuterungen, die dynamisch in den Text der Anleitung eingebunden werden und bei Mouse-Hover über den Begriff ein Pop-Over anzeigen sollen, das den jeweiligen Begriff definierend erklärt.
* **Favoriten** Es sollen Lesezeichen abgelegt werden können, um sich Stellen in der Anleitung zu markieren.
* **FAQ** Der Agent soll auch eine FAQ eingebettet bekommen, um häufige Probleme aufzugreifen und zu beantworten.
* **Fokusindikatoren** Visuelle Fokus-Markierungen sollen das Benutzen mit der Tastatur freundlicher gestalten.
* **Snippet-View** Im Validator sollen Stellen, an welchen Probleme identifiziert wurden, zitiert und die Fehlerstelle darin markiert werden. Das soll die Fehlerbehebung leichter machen.
* **Tab-basierte Notizen** Derzeit sind die Notizen nur in einem einzigen Textblock. Das soll erweitert werden um Tabs mit mehren Notizblöcken.

## Konventionen

* **Namenskonventionen** sind in `Namenskonventionen.md` festgelegt.
* CSS-Variablen:
Die vorhandenen CSS Variablen sind bitte den tatsächlichen CSS-Dateien zu entnehmen:
  * `styles.css`
  * `agent.css`
  * `media.css`
* Das Theme-Style-System ist in `styles.css` hinterlegt.

## Bisheriger Fortschritt

Wir haben ein **fünfstufiges Brainstorming** erfolgreich abgeschlossen. Alle Cluster sind dokumentiert und im Projekt-Dateispeicher verfügbar:

### ✅ Abgeschlossene Cluster

**1. Cluster 1: Inhaltliche Anforderungen**
- Dokument: `cluster1-final.md`
- Inhalt:
  - Zielgruppe: IT-ferne Ermittler (Mittlere Reife, niedrige IT-Kenntnisse)
  - Detail-Level-System: 4 Stufen (Basic, Standard, Expert, Show-Only)
  - Terminologie-Strategie: Deutsch bevorzugt, englische Fachbegriffe wo etabliert
  - Medien-Entscheidungsmatrix: Wann Screenshot/Annotiert/Video/Diagramm
  - Content-Type-System: instruction, explanation, visual, background, info, hint, attention, warning
  - Multi-Tool-Strategie: Tool-agnostisch mit tool-spezifischen Metadaten

**2. Cluster 2: Strukturelle Anforderungen**
- Dokument: `cluster2_results.md`
- Inhalt:
  - Hierarchische Struktur: 3-5 Ebenen (Topic → Chapter → Section → Subsection → Deep-Dive)
  - data-ref Granularität & Namenskonventionen
  - JSON-LD Metadaten pro Section
  - Agent-Context-Block (einer pro Section, am Ende)
  - Navigation-Strategie: Freie Navigation

**3. Cluster 3: Technische Anforderungen**
- Dokumente:
  - `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` (BFSG Teil 1)
  - `cluster3_BFSG-Barrierefreiheit-Content.md` (BFSG Teil 2)
  - `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md` (HTML-Syntax)
- Inhalt:
  - BFSG-konforme Barrierefreiheit (Sprachauszeichnung, Alt-Texte, Überschriften-Hierarchie)
  - HTML-Element-Whitelist (32 erlaubte Elemente)
  - Pflicht-/Optional-Attribute pro Element
  - CSS-Klassen-System (Pflicht-Klassen, Review-Prozess)
  - Attribut-Reihenfolge & Formatierung (class → id → data-* → sonstige)
  - Content-Type-Box-Entscheidungsmatrix (info/hint/attention/warning)
  - HTML-Kommentar-Konventionen (AGENT:/MEDIA:/NOTE:/TODO:/DECISION-REVIEW:)

**4. Cluster 4: Qualitätssicherung & Testing**
- Dokument: `cluster4_Qualitätssicherung-Metadaten-Validierung.md`
- Inhalt:
  - Validierungsebenen: Syntaktisch (Python + JSON-Schema), Semantisch (KI + Maintainer)
  - Testkriterien: Syntaktisch (Pflicht-Attribute, HTML-Struktur, Cross-References) und Semantisch (Konsistenz, Plausibilität, Terminologie)
  - Validierungsprozess: Draft → Validierung → Review → Approved → Published
  - Fehler-Kategorisierung: CRITICAL / ERROR / WARNING / INFO
  - Fehler-Log-System: JSON-basierte Dokumentation für iterative Prompt-Verbesserung
  - Erweiterte Metadaten: reviewStatus, lastReviewer, validationScore, knownIssues, reviewCycles, timeToPublish
  - Status-Übergänge: Draft → Review → Approved → Published
  - Versionierung: MAJOR.MINOR.BUILD (Git-basiert)
  - Metriken: Pro Section und aggregiert

**5. Cluster 5: Workflow & Rollen**
- Dokument: `cluster5_Workflow-Rollen.md`
- Inhalt:
  - Akteure & Rollen: KI-System, Python-Skripte, Maintainer (5 Kernrollen: Creator, Validator, Enricher, Reviewer, Distributor)
  - 9 Workflow-Phasen (0 → 0.5 → 1-8):
    - Phase 0: Strategie (Maintainer definiert Lernziel, Fokus, Umfang)
    - Phase 0.5: Vorarbeit (KI erstellt Gesamtgliederung + grobe Inhaltsentwürfe)
    - Phase 1: Research & Draft (KI erstellt initialen Draft pro Section)
    - Phase 2: Syntax-Validierung (Python-Skripte)
    - Phase 3: Fehlerkorrektur (iterativ, KI + Maintainer)
    - Phase 4: Semantic Review (KI vergibt Quality-Score 0-100)
    - Phase 5: Medien-Erstellung (Maintainer)
    - Phase 6: Content-Enrichment (Maintainer bindet Medien/Glossar/Agent ein)
    - Phase 7: Final Review (Maintainer Approval)
    - Phase 8: Distribution (Versionierung, Veröffentlichung)
  - Quality-Score-Kriterien: 30% Strategiekonformität, 25% Verständlichkeit, 20% Vollständigkeit, 15% Konsistenz, 10% Struktur
  - Schnittstellen: Bevorzugt natürliche Sprache für KI (nicht JSON)
  - Medien-Spezifikationen: Screenshots (PNG 60-80%, 72dpi), Annotations (Open Sans 16px, Farbcode), Videos (1280×720-1920×1080, 15fps min, MP4, Untertitel Pflicht)
  - Fehlerbehandlung: v1.0 manuelle Kontrolle, v2.0 automatische Eskalation
  - Versionierung: Git-Branches (content-drafts, content-approved, main)

---

## Aktueller Stand

Wir haben die **komplette Spezifikation** für die Content-Generierung dokumentiert. Alle inhaltlichen, strukturellen, technischen und prozessualen Anforderungen sind definiert.

**Was jetzt fehlt:**
Ein **Master-Prompt für die KI**, der alle Anforderungen aus den 5 Clustern integriert und für Claude Sonnet 4.5 direkt verwendbar ist.

---

## Nächster Schritt: Master-Prompt-Komposition

### Ziel

Entwicklung eines **vollständigen, präzisen Master-Prompts** für Claude Sonnet 4.5, der für Phase 1 (Research & Draft) verwendet wird, um hochwertige Section-Drafts zu generieren.

Der Prompt muss:
- **Alle Anforderungen aus Cluster 1-5 integrieren**
- **Für die KI direkt verwendbar sein** (keine Meta-Diskussionen)
- **Die richtige Balance** zwischen Vollständigkeit und Übersichtlichkeit finden
- **Modular aufgebaut** sein (wiederverwendbare Komponenten)
- **Entscheidungshilfen** für die KI enthalten (Content-Type, Media-Type, Detail-Level, etc.)
- **Beispiele & Counter-Beispiele** beinhalten

---

## Aufgaben für Master-Prompt-Komposition

### Phase A: Prompt-Struktur & Architektur
1. **Aufbau des Master-Prompts** (Abschnitte, Hierarchie)
2. **Informationsdichte vs. Verständlichkeit** (was muss rein, was kann weg?)
3. **Kontext-Management** (was muss immer dabei sein, was ist optional?)
4. **Modularer Aufbau** (wiederverwendbare Komponenten, z.B. separate Blöcke für Medien, Barrierefreiheit)

### Phase B: Prompt-Inhalte
1. **Integration aller Anforderungen** aus Cluster 1-5
2. **Entscheidungsbäume für KI** (Wann welcher Content-Type? Wann welches Media-Type? Wann welches Detail-Level?)
3. **Beispiele & Counter-Beispiele** (gute vs. schlechte Sections)
4. **Grenzfall-Behandlung** (Was tun bei unklaren Anforderungen?)
5. **Checklisten für die KI** (Self-Review vor Output)

### Phase C: Testing & Iteration
1. **Test-Prompts erstellen** (verschiedene Schwierigkeitsgrade: einfache, mittlere, komplexe Sections)
2. **Generierte Sections validieren** (erfüllen sie die Anforderungen?)
3. **Prompt iterativ verbessern** (basierend auf Testergebnissen)
4. **Best Practices dokumentieren** (was funktioniert gut, was nicht?)

---

## Arbeitsweise

- **Kleinschrittig vorgehen** (keine großen Sprünge)
- **Top-Down-Design** (vom Groben ins Detail)
- **Geführte Fragen** stellen, bis 95% Klarheit erreicht ist
- Änderungen nur **vorschlagen und begründen**
- Jede Änderung muss **durch mich verifiziert und akzeptiert** werden
- Am Ende ein **fertiger Master-Prompt** als Artefakt

---

## Wichtige Projekt-Richtlinien

### Textstil für dich (KI):
- Bleibe eng an meiner Vorgabe
- Füge keine zusätzlichen Aspekte hinzu (erst meine Aufgabe umsetzen, dann separat Verbesserungen vorschlagen)
- Verbesserungsvorschläge in 3 Absätzen erklären: **Vorteile**, **Technik**, **Aufwand** (Umsetzung, Laufzeit, Pflege)
- Vermeide Telegramstil
- Hebe wichtige Aussagen durch **Fettmarkieren** hervor für optische Orientierung beim Querlesen
- Du adressierst einen erfahrenen Software-Architekten mit guten Kenntnissen zu HTML, CSS und Javascript

### Code-Änderungen:
- Immer kleinschrittig und Schritt für Schritt
- Keine unerwünschten Nebeneffekte
- CSS-Variablen `--variable*` bewahren und nutzen (gutes Design)
- Keine absoluten Größen/Farben außerhalb der Themes – verwende die Farben der Themes
- Immer den **aktuellen Code** aus dem Projekt-Dateispeicher als Basis verwenden
- Jede Änderung begründen
- Mindestens einen Test vorschlagen, um Effekt und Nebeneffekte zu prüfen

### Debugging:
- Nach Tests wird Debug-Output in `Debug-output.XXX` abgelegt (XXX = Buildnummer)
- Höchste Buildnummer = aktuellster Debug-Output
- Buildnummer wird für jede Änderung mit Test um 1 erhöht

---

## Meine Aufgabe an dich

Bitte lies die **sechs Dokumente** aus dem Projekt-Dateispeicher:
1. `cluster1-final.md` (Inhaltliche Anforderungen)
2. `cluster2_results.md` (Strukturelle Anforderungen)
3. `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` (BFSG Teil 1)
4. `cluster3_BFSG-Barrierefreiheit-Content.md` (BFSG Teil 2)
5. `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md` (HTML-Syntax)
6. `cluster4_Qualitätssicherung-Metadaten-Validierung.md` (Qualitätssicherung)
7. `cluster5_Workflow-Rollen.md` (Workflow & Rollen)

**Lass uns dann die Master-Prompt-Komposition angehen.**

Stelle mir geführte Fragen, damit wir gemeinsam den Master-Prompt entwickeln können. Wir gehen wie immer kleinschrittig vor und klären zunächst die **grundlegende Struktur und den Aufbau** des Prompts, bevor wir ins Detail gehen.

---

## Spezifische Anforderungen an den Master-Prompt

### Was der Master-Prompt leisten muss:

1. **Phase-1-Fokus:** Der Prompt ist speziell für **Phase 1 (Research & Draft)** des Workflows gedacht
2. **Input-Kontext:** Die KI erhält zusätzlich zum Master-Prompt:
   - Section-Info aus Phase 0.5 (Lernziel, Key Topics, Kurzbeschreibung)
   - Strategiedokument (Fokus, Umfang, Terminologie-Entscheidungen)
   - Bereits approbierte Sections (2-3 Vorgänger-Sections als Volltext)
   - Gesamtstruktur-Überblick (wo steht die aktuelle Section im Gefüge?)
   - Quellenmaterial (relevante Kapitel aus AXIOM-Handbuch)
3. **Output-Erwartung:** Die KI soll einen **vollständigen HTML-Draft** erstellen, der:
   - Alle Anforderungen aus Cluster 1-5 erfüllt
   - Syntaktisch korrekt ist (Phase 2 bereit)
   - Semantisch kohärent ist (gute Chancen in Phase 4)
   - Medien-Platzhalter mit Spezifikationen enthält
   - Video-Untertitel-Entwürfe beinhaltet

### Herausforderungen:

- **Token-Limit:** Der Prompt muss präzise sein, darf aber nicht zu lang werden
- **Klarheit vs. Vollständigkeit:** Balance zwischen allen Details und Übersichtlichkeit
- **Entscheidungshilfen:** Die KI braucht klare Kriterien, wann sie was tun soll
- **Konsistenz:** Der Prompt muss zu wiederholbar guten Ergebnissen führen

---

## Gewünschtes Endergebnis

Am Ende dieser Arbeitsphase haben wir:

1. **Master-Prompt (Markdown-Artefakt):**
   - Vollständig, direkt verwendbar für Phase 1
   - Modular strukturiert
   - Mit Beispielen und Entscheidungshilfen
   
2. **Test-Szenarien (optional):**
   - 3-5 konkrete Section-Inputs zum Testen
   - Erwartete Outputs als Referenz
   
3. **Anwendungs-Dokumentation:**
   - Wie wird der Master-Prompt in der Praxis verwendet?
   - Welche Anpassungen können vorgenommen werden?
   - Wie wird der Prompt iterativ verbessert?

---

## Kontext-Informationen (Zusammenfassung)

**Projekt:** WebAssistantForensics  
**Phase:** Master-Prompt-Komposition für Phase 1 (Research & Draft)  
**Basis:** 5 abgeschlossene Cluster mit vollständiger Spezifikation  
**Ziel-KI:** Claude Sonnet 4.5  
**Verwendung:** ~100-150 Sections generieren  
**Qualitätssicherung:** Python-Validierung + KI-Semantic-Review + Maintainer-Approval

---

**Ich freue mich auf die Zusammenarbeit und darauf, gemeinsam einen hervorragenden Master-Prompt zu entwickeln!** 🚀

Lass uns mit den geführten Fragen beginnen, um die beste Herangehensweise zu finden.
