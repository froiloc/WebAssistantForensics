
# Strategiedokument: [Projekt-Name]

**Version:** 1.0.0  
**Erstellt am:** YYYY-MM-DD  
**Erstellt von:** [Name des Maintainers]  
**Ziel-Tool:** [Name der Software, z.B. "Magnet AXIOM Examine"]  
**Tool-Version:** [Version, z.B. "7.x"]  
**Status:** Draft | Review | Approved

---

## 0. Präambel

### Zweck dieses Dokuments

Dieses **Strategiedokument** ist das zentrale Planungsinstrument für die KI-gestützte Content-Erstellung im Projekt **[Projekt-Name]**. Es definiert die **inhaltlichen, strukturellen und stilistischen Rahmenbedingungen**, innerhalb derer die künstliche Intelligenz (KI) hochwertige Schulungsinhalte für forensische Software generieren soll.

Das Dokument richtet sich primär an:
- **KI-Systeme** (Claude Sonnet 4.5 oder vergleichbar) in **Phase 0.5** (Gesamtgliederung erstellen), **Phase 1** (Section-Drafts generieren) und **Phase 4** (Semantic Review durchführen)
- **Maintainer** (menschliche Projektverantwortliche), die dieses Dokument erstellen, iterativ verfeinern und die KI-Outputs bewerten

**Hinweis zur Vollständigkeit:** Die KI erhält zu jeder Phase gesonderte, detaillierte Anweisungen durch separate Dokumente (Phase-0.5-Prompt, Phase-1-Prompt, etc.). Dieses Strategiedokument liefert den übergeordneten Rahmen, nicht die operative Detailsteuerung.

### Projekt-Kontext: WebAssistant Forensics

Das Projekt **WebAssistant Forensics** erstellt interaktive, webbasierte Schulungshandbücher für forensische Software (initial: Magnet AXIOM Examine, später: X-Ways Forensics, Cellebrite Physical Analyzer). Die Zielgruppe sind **IT-ferne Polizei-Ermittler** mit niedriger IT-Kompetenz (Mittlere Reife, keine akademische IT-Ausbildung).

Der Content-Erstellungs-Workflow umfasst folgende Phasen:
- **Phase 0 (Strategie):** Maintainer erstellt dieses Strategiedokument
- **Phase 0.5 (Gesamtgliederung):** KI erstellt vollständige Inhaltsstruktur (Topics → Chapters → Sections) basierend auf diesem Dokument
- **Phase 1 (Research & Draft):** KI generiert HTML-Drafts pro Section basierend auf diesem Dokument
- **Phase 2-3:** Syntaktische Validierung, Fehlerkorrektur
- **Phase 4 (Semantic Review):** KI prüft Sections gegen dieses Strategiedokument und vergibt Quality-Score
- **Phase 5-8:** Medien-Erstellung, Content-Enrichment, Final Review, Publishing

### Akteure & Verantwortung

- **Maintainer:** Definiert Strategie (dieses Dokument), erstellt Quellenmaterial-Übersicht, prüft KI-Outputs, erstellt Medien, genehmigt Sections
- **KI-System:** Generiert Gesamtgliederung (Phase 0.5), erstellt Section-Drafts (Phase 1), führt Semantic Reviews durch (Phase 4) – erhält für jede Phase spezifische Prompts zusätzlich zu diesem Strategiedokument
- **Python-Validator:** Automatisierte syntaktische Validierung (Phase 2)

### Scope & Abgrenzung

**Dieses Dokument definiert:**
- Globale Lernziele und Fokus des gesamten Handbuchs
- Terminologie-Strategie (Deutsch vs. Fremdsprachen)
- Detail-Level-Strategie (welche Detailstufen erstellt werden)
- Medien-Strategie (wann Screenshots, Videos, Diagramme)
- Topic-spezifische Lernziele und Besonderheiten

**Dieses Dokument definiert NICHT Angelegenheiten, die bereits in anderen Dokumenten umfänglich behandelt werden.** Auf diese wird jedoch verwiesen und deren Bedeutung im Rahmen der Strategie hervorgehoben. Dazu gehören:
- Technische HTML/CSS-Details (siehe Cluster 3-Dokumente)
- Barrierefreiheit-Anforderungen (siehe BFSG-Dokumente)
- Validierungsregeln (siehe Cluster 4-Dokumente)
- Detaillierte Workflow-Beschreibungen (siehe Cluster 5-Dokument)

### Gewicht & Bedeutung

Dieses Strategiedokument ist **das wichtigste Input-Dokument für die KI** in Phase 0.5, Phase 1 und Phase 4. Ohne ein vollständiges und präzises Strategiedokument kann die KI keine qualitativ hochwertigen Inhalte erstellen. Alle nachfolgenden Phasen bauen auf den hier getroffenen Entscheidungen auf.

**Iterative Verfeinerung:** Dieses Strategiedokument wird iterativ verfeinert. Nach Phase 0.5 prüft der Maintainer die Gesamtgliederung. Falls die Gliederung nicht den Erwartungen entspricht, wird dieses Strategiedokument angepasst und Phase 0.5 erneut durchgeführt.

### Verwendung dieses Dokuments

1. **Maintainer füllt Template aus** (alle Pflichtfelder \*, möglichst viele empfohlene Felder △)
2. **Maintainer übergibt dieses Dokument an KI** (Phase 0.5)
3. **KI erstellt Gesamtgliederung** basierend auf diesem Dokument
4. **Maintainer prüft Gliederung** und verfeinert ggf. dieses Strategiedokument
5. **Nach Freigabe der Gliederung:** Dieses Strategiedokument dient als Referenz für Phase 1 (Section-Erstellung) und Phase 4 (Semantic Review)

---

## Legende: Feldtypen

- **\*** = **Pflichtfeld**  
  *Ohne diese Angabe kann die KI kein qualitativ geeignetes Ergebnis schaffen. Die KI würde wichtige Aspekte raten müssen, was zu unbrauchbaren Outputs führt.*

- **△** = **Empfohlenes Feld**  
  *Mit dieser Angabe weiß die KI klarer, was zu beachten ist. Die KI kann ohne diese Info arbeiten, aber die Qualität leidet deutlich.*

- **○** = **Optionales Feld**  
  *Ohne diese Angabe bringt die KI dennoch gute Ergebnisse. Die KI hat dann Wissenslücken zum Hintergrund, die sie (möglicherweise fehlerhaft) extrapolieren könnte. Diese Infos erhöhen die Präzision, sind aber nicht zwingend.*

---

## 1. Metadaten \*

**Zweck für die KI:** Dieser Abschnitt gibt der KI grundlegende Projekt-Informationen, damit sie den Kontext versteht (welches Tool, welche Version, welche Zielgruppe). Diese Informationen fließen in die JSON-LD-Metadaten-Blöcke der generierten Sections ein (Felder: `toolName`, `toolVersion`, `audience`).

### 1.1 Projekt-Informationen \*
- **Projekt-Name \*:** [Vollständiger Name, z.B. "WebAssistant Forensics - AXIOM Examine Guide"]
- **Tool-Name \*:** [Offizielle Bezeichnung der zu beschreibenden Software, z.B. "Magnet AXIOM Examine"]
- **Tool-Version \*:** [Konkrete Version(en), z.B. "7.0 - 7.5" oder "7.x für alle 7er-Versionen"]
- **Haupt-Zielgruppe \*:** [Detaillierte Beschreibung inkl. Bildungsniveau und IT-Kenntnisse, z.B. "IT-ferne Polizei-Ermittler mit Mittlerer Reife, niedrigen IT-Kenntnissen, keine akademische IT-Ausbildung"]

### 1.2 Projekt-Umfang △
- **Geschätzter Content-Umfang △:** [Anzahl Sections gesamt, z.B. "~100-150 Sections" oder "8-20 Sections pro Topic, ca. 5 Topics"]
- **Geschätzte Bearbeitungszeit △:** [z.B. "3-6 Monate für vollständige Erstellung inkl. Medien"]
- **Priorität △:** [Hoch / Mittel / Niedrig – hilft bei Ressourcenplanung]

### 1.3 Versions-Historie des Strategiedokuments ○

**Hinweis:** Diese Tabelle dokumentiert Änderungen **an diesem Strategiedokument selbst** (nicht am WebAssistant Forensics-Projekt). Jede Version wird zusätzlich im Git-Branch `[projektname]-content-strategy` versioniert.

| Version | Datum | Änderungen | Bearbeiter |
|---------|-------|------------|------------|
| 1.0.0 | YYYY-MM-DD | Initial erstellt | [Name] |

---

## 2. Globale Lernziele \*

**Zweck für die KI:** Dieser Abschnitt definiert das "Big Picture" – was soll der Anwender am Ende können? Die KI nutzt diese Lernziele, um in Phase 0.5 eine sinnvolle Gliederung zu erstellen, in Phase 1 jeden Section-Draft auf dieses Ziel auszurichten und in Phase 4 zu prüfen, ob die erstellten Sections diese Lernziele unterstützen.

### 2.1 Haupt-Lernziel \*

**Nach Abschluss dieses Handbuchs soll der Anwender in der Lage sein \*:**

[Formuliere ein **prägnantes, messbares Lernziel** in 1-2 Sätzen. Verwende Aktionsverben (können, durchführen, erstellen, analysieren). Beispiel:]

> *"IT-ferne Ermittler können eigenständig forensische Auswertungen mit [Tool-Name] durchführen, von der Case-Vorbereitung über die Datenanalyse bis zur Erstellung eines gerichtsverwertbaren Reports."*

**Hinweise für Formulierung:**
- **Messbar:** "können durchführen" (nicht "verstehen")
- **Konkret:** Benenne Start- und Endpunkt des Prozesses
- **Zielgruppengerecht:** Berücksichtige IT-Kenntnisse der Zielgruppe

### 2.2 Teil-Lernziele △

**Der Anwender soll außerdem △:**

[Liste 3-5 Teil-Lernziele auf, die spezifische Aspekte abdecken. Beispiele:]

1. **Fehlerprävention \*:** [z.B. "Häufige Fehlerquellen bei der Case-Vorbereitung vermeiden können"]
2. **Best-Practice-Kenntnisse \*:** [z.B. "Best-Practice-Einstellungen für gängige Analysen (E-Mail, Chat, Browser) kennen und anwenden"]
3. **Troubleshooting △:** [z.B. "Grundlegende Troubleshooting-Strategien bei Fehlermeldungen anwenden können"]
4. **Effizienz ○:** [z.B. "Workflows optimieren und Zeit sparen durch Automatisierungen"]
5. **Qualitätssicherung ○:** [z.B. "Ergebnisse auf Plausibilität prüfen und dokumentieren"]

**Hinweis:** Mindestens 2 Teil-Lernziele sind Pflicht (\*), weitere empfohlen (△) oder optional (○).

---

## 3. Globaler Fokus & Umfang \*

**Zweck für die KI:** Dieser Abschnitt hilft der KI zu verstehen, welche Aspekte besonders betont werden sollen und wo die Grenzen des Handbuchs liegen. In Phase 0.5 beeinflusst dies die Gliederungsstruktur, in Phase 1 die Ausführlichkeit pro Thema und in Phase 4 die Bewertung der inhaltlichen Ausrichtung.

### 3.1 Fokus \*

**Diese Aspekte werden besonders betont \*:**

- [Aspekt 1, z.B. "Fehlerprävention (vermeiden statt korrigieren)"]
- [Aspekt 2, z.B. "Best-Practice-Workflows für Standardfälle"]
- [Aspekt 3, z.B. "Verständlichkeit für IT-Laien"]

### 3.2 Umfang & Tiefe \*

**Detaillierungsgrad:**

- **Standard-Detail-Level \*:** [z.B. "Level 2 (Best-Practice) als Standard"]
- **Maximale Tiefe △:** [z.B. "Level 3 (Detailliert) für kritische Bereiche"]
- **Minimale Tiefe ○:** [z.B. "Level 1 (Schnellübersicht) für Experten-Workflows"]

**Abgrenzung – Was wird NICHT behandelt \*:**

- [Ausschluss 1, z.B. "Programmierung eigener Plugins"]
- [Ausschluss 2, z.B. "Netzwerk-Forensik (separates Handbuch)"]
- [Ausschluss 3, z.B. "Juristische Verwertbarkeit (Zuständigkeit: Rechtsabteilung)"]

### 3.3 Voraussetzungen beim Anwender △

**Der Anwender sollte mitbringen △:**

- [Voraussetzung 1, z.B. "Grundlegende Windows-Kenntnisse (Dateien öffnen, kopieren)"]
- [Voraussetzung 2, z.B. "Verständnis des eigenen Aufgabenbereichs (Ermittlungsarbeit)"]
- [Voraussetzung 3, z.B. "Keine IT-Vorkenntnisse erforderlich"]

---

## 4. Terminologie-Strategie \*

**Zweck für die KI:** Dieser Abschnitt definiert, wann deutsche und wann fremdsprachliche Begriffe verwendet werden. Die KI baut während Phase 1 eine **Terminologie-Entscheidungsliste** auf (separates Dokument), die über alle Sections hinweg Konsistenz sicherstellt. In Phase 4 prüft die KI, ob die Terminologie konsistent angewendet wurde.

### 4.1 Sprach-Präferenzen \*

- **Grundregel \*:** [z.B. "Deutsche Begriffe bevorzugen, fremdsprachliche Fachbegriffe nur wo etabliert oder keine sinnvolle Alternative existiert"]

**Fremdsprachliche Begriffe beibehalten für \*:**
  - [Kategorie 1 \*:] Software-spezifische UI-Elemente (z.B. "Artifacts Explorer", "Case Dashboard")  
    *Begründung: Original-Begriffe aus dem Tool übernehmen, Anwender sieht diese in der Software*
  - [Kategorie 2 \*:] Etablierte Fachbegriffe ohne sinnvolle deutsche Alternative (z.B. "Cache", "E-Mail", "Log", "Hash")  
    *Begründung: Diese Begriffe sind im deutschen Sprachgebrauch etabliert (Englisch, Latein, Griechisch, Französisch)*
  - [Weitere Kategorien △:] [Bei Bedarf ergänzen]

**Deutsche Übersetzungen verwenden für \*:**
  - [Kategorie 1 \*:] Allgemeine Begriffe mit geläufiger deutscher Alternative (z.B. "Query" → "Abfrage", "Search" → "Suche")  
    *Begründung: Erhöht Verständlichkeit für IT-ferne Zielgruppe*
  - [Kategorie 2 △:] Beschreibende Tätigkeiten (z.B. "Export" → beibehalten, aber "Report" → "Bericht")
  - [Weitere Kategorien ○:] [Bei Bedarf ergänzen]

### 4.2 Tool-spezifische Begriffe △

**Original-Begriffe aus [Tool-Name] verwenden für △:**
  - [Liste wichtiger UI-Elemente, z.B.:]
    - "Artifacts Explorer" (Hauptansicht für Analyseergebnisse)
    - "Case Dashboard" (Übersichtsseite)
    - "Processing Engine" (Verarbeitungsmodul)
    - [Weitere...]

**Konsistenz-Regel \*:** Begriffe aus dem offiziellen Handbuch/der Software-UI übernehmen, nicht neu erfinden. Bei Unsicherheit: Original-Begriff verwenden.

### 4.3 Terminologie-Entscheidungsliste (Verweis) \*

**Separates Dokument:** `terminologie-entscheidungsliste.md`

**Verwendung in Phase 1 \*:**
- Die KI **baut während der Section-Erstellung** eine Terminologie-Entscheidungsliste auf
- Bei jedem neuen Begriff entscheidet die KI: Deutsch oder Fremdsprache? (Basierend auf 4.1 + 4.2)
- Die Entscheidung wird in `terminologie-entscheidungsliste.md` dokumentiert
- Bei späteren Sections konsultiert die KI diese Liste für konsistente Begriffsverwendung

**Verwendung in Phase 4:**
- Die KI prüft, ob Begriffe konsistent verwendet wurden (Abgleich mit der Liste)

**Umgang mit Konflikten:**
- Falls ein Begriff bereits in der Liste steht, wird diese Entscheidung übernommen
- Falls die KI eine andere Entscheidung treffen würde, markiert sie dies im Draft-Kommentar

**Hinweis:** Die Liste wird vom Maintainer in Phase 3/4 geprüft und bei Bedarf korrigiert. Nach Korrekturen werden betroffene Sections überarbeitet.

---

## 5. Detail-Level-Strategie \*

**Zweck für die KI:** Dieser Abschnitt definiert, welche Detailstufen (1-4) generiert werden sollen und in welcher Reihenfolge. Die KI erstellt in Phase 1 nur die hier spezifizierten Detail-Levels. In Phase 4 prüft die KI, ob das richtige Detail-Level verwendet wurde.

**Hintergrund – Die 4 Detail-Level im System:**

Das WebAssistant Forensics-System unterstützt 4 Detail-Level für unterschiedliche Anwenderbedürfnisse:

- **Level 1 (Schnellübersicht):** Grober Ablauf, nur Kernschritte, für erfahrene Anwender die sich schnell orientieren wollen
- **Level 2 (Best-Practice):** Standard-Anleitung mit Best-Practice-Einstellungen und Begründungen, für die Hauptzielgruppe
- **Level 3 (Detailliert):** Alle Optionen erklärt, Hintergründe, Edge Cases, für fortgeschrittene Anwender mit tieferem Verständnisbedarf
- **Level 4 (Show-Only):** Nur Anweisungen + Screenshots/Videos, keine Erklärungen, für "Learning by Doing"-Anwender

### 5.1 Zu erstellende Detail-Levels \*

**In Phase 1 werden folgende Detail-Levels initial generiert \*:**

- [ ] **Level 1 (Schnellübersicht) ○:** [Ja/Nein + Begründung]  
  *Beispiel-Begründung für "Nein": "Zielgruppe benötigt ausführliche Anleitung, kein Schnelleinstieg"*
- [x] **Level 2 (Best-Practice) \*:** [Standard, fast immer erstellen]  
  *Beispiel-Begründung: "Hauptzielgruppe (IT-ferne Ermittler) braucht klare Best-Practice-Workflows"*
- [ ] **Level 3 (Detailliert) △:** [Ja/Nein + ggf. nur für kritische Sections]  
  *Beispiel-Begründung: "Nur für kritische Bereiche (Export, Case-Vorbereitung), erhöht Verständnis"*
- [ ] **Level 4 (Show-Only) ○:** [Ja/Nein + ggf. später als Erweiterung]  
  *Beispiel-Begründung für "Später": "Erst nach Feedback der Zielgruppe entscheiden, ob gewünscht"*

### 5.2 Priorisierung & Reihenfolge (Top-Down-Ansatz) △

**Die KI erstellt Detail-Levels in folgender Reihenfolge △:**

1. **Level 1 (Schnellübersicht)** – falls aktiviert  
   *Begründung: Grobes Verständnis zuerst, Top-Down-Ansatz*
2. **Level 2 (Best-Practice)**  
   *Begründung: Standard-Level, Basis für alle weiteren*
3. **Level 4 (Show-Only)** – falls aktiviert  
   *Begründung: Basiert stark auf Level 2, verwendet dieselben Screenshots*
4. **Level 3 (Detailliert)**  
   *Begründung: Erweitert Level 2, setzt dessen Verständnis voraus*

**Warum Top-Down?**
- KI startet mit Überblick (Level 1), verfeinert dann schrittweise
- Level 4 nutzt Medien aus Level 2 (Effizienz)
- Level 3 baut auf Level 2 auf (inhaltliche Kohärenz)

---

## 6. Medien-Strategie \*

**Zweck für die KI:** Dieser Abschnitt definiert, wann welcher Medien-Typ eingesetzt wird. Die KI nutzt diese Entscheidungsmatrix in Phase 1, um Medien-Platzhalter an den richtigen Stellen zu setzen. In Phase 4 prüft die KI, ob Medien sinnvoll platziert wurden.

**Hinweis:** Technische Details zur Medien-Erstellung (Auflösung, Format, Annotation-Spezifikationen) sind im separaten Dokument **`media-types-guide.md`** definiert. Dieses Dokument fokussiert auf die **Strategie** (wann welcher Typ).

### 6.1 Medien-Präferenzen (Entscheidungsmatrix) \*

**Wann welcher Medien-Typ einsetzen \*:**

| Situation | Medien-Typ | Begründung |
|-----------|------------|------------|
| **UI-Element lokalisieren** \* | Screenshot | Anwender muss Element auf Bildschirm finden |
| **Komplexe Maske (>5 Optionen)** \* | Annotierter Screenshot | Mehrere Elemente müssen hervorgehoben werden |
| **Mehrstufiger Workflow (>5 Schritte)** △ | Video | Dynamische Abläufe besser als Bilder |
| **Konzeptionelle Zusammenhänge** \* | Diagramm | Abstrakte Beziehungen visualisieren |
| **Prozess-Darstellung** △ | Diagramm oder Flussdiagramm | Schrittfolgen und Entscheidungspunkte |
| **Vergleich mehrerer Optionen** ○ | Tabelle oder Vergleichs-Diagramm | Gegenüberstellung erleichtert Entscheidung |
| **Audio-Erklärung** ○ | Audio (selten) | Nur bei Spezialfällen (z.B. Screenreader-Demo) |

**Ergänzende Regeln:**
- **Mindestens 1 Medium pro Section △** (Richtwert: 1 Medium pro 5-10 Sätze)
- **Videos nur bei echtem Mehrwert \*:** Nicht als "besserer Screenshot", sondern bei Bewegung/Interaktion
- **Annotationen sparsam einsetzen △:** Nur wenn >2 Elemente hervorgehoben werden müssen

### 6.2 Verweis auf technische Medien-Spezifikationen \*

**Separates Dokument:** `media-types-guide.md`

**Inhalt des Dokuments (für Maintainer in Phase 5):**
- Screenshot-Format: PNG, 60-80% Kompression, 72 dpi, min. 1280px Breite
- Video-Format: MP4, 1280×720 bis 1920×1080, min. 15fps, **Untertitel Pflicht** (.vtt-Format, BFSG)
- Annotation-Spezifikationen: Schriftart (Open Sans 16px), Farbcodes für verschiedene Markierungen
- Diagramm-Tools und -Formate

**Hinweis für die KI:** In Phase 1 erstellt die KI nur **Medien-Platzhalter** mit `MEDIA:`-Kommentaren. Die tatsächliche Medien-Erstellung erfolgt durch den Maintainer in Phase 5 basierend auf `media-types-guide.md`.

---

## 7. Wissensquellen \*

**Zweck für die KI:** Dieser Abschnitt dokumentiert, welche Quellen zur Verfügung stehen. Die KI nutzt diese Informationen in Phase 0.5 (Gliederung) und Phase 1 (Section-Drafts) als Grundlage. Quellenangaben fließen in JSON-LD-Metadaten der Sections ein. In Phase 4 kann die KI prüfen, ob Inhalte mit den angegebenen Quellen übereinstimmen.

### 7.1 Primäre Quellen \*

**Diese Quellen werden als Grundlage verwendet \*:**

1. **Offizielles Handbuch/Dokumentation der Ziel-Software \*:**
   - **Quelle:** [Vollständiger Titel + Version, z.B. "Magnet AXIOM Examine User Guide v7.5"]
   - **Status:** [Verfügbar / In Beschaffung / Nicht vorhanden]
   - **Speicherort:** [Pfad oder URL, z.B. "manuals/axiom-user-guide-7.5.pdf"]
   - **Sprache:** [z.B. "Englisch (offizielle Dokumentation)"]
   - **Umfang:** [z.B. "450 Seiten, Kapitel 1-12 relevant"]

2. **Online-Hilfe der Software △:**
   - **URL:** [z.B. "https://docs.magnetforensics.com/axiom"]
   - **Stand:** [Datum des letzten Abrufs, z.B. "2025-10-10"]
   - **Vollständigkeit:** [z.B. "Deckt 80% der Features ab, einige Details fehlen"]

3. **Offline-Hilfe der Software ○:**
   - **Version:** [z.B. "Integrierte Hilfe in AXIOM 7.5"]
   - **Zugriff:** [z.B. "F1-Taste in Software"]

4. **Eigene Expertise des Maintainers \*:**
   - **Fachbereich:** [z.B. "IT-Forensik, 5+ Jahre Erfahrung mit AXIOM Examine"]
   - **Spezialgebiete:** [z.B. "Mobile Forensik, E-Mail-Analyse"]
   - **Limitierungen:** [z.B. "Wenig Erfahrung mit Custom Artifacts"]

### 7.2 Sekundäre Quellen △

**Ergänzende Quellen (erhöhen Qualität) △:**

- **Foren △:** [z.B. "Magnet User Forum, Reddit r/digitalforensics"]
- **Blogbeiträge △:** [z.B. "SANS Digital Forensics Blog, Magnet Forensics Blog"]
- **Akademische Artikel ○:** [z.B. "IEEE Papers zu Forensik-Best-Practices"]
- **Schulungsunterlagen △:** [z.B. "Interne Polizei-Schulungsfolien (vertraulich)"]
- **Vorhandene Schulungsunterlagen △:** [z.B. "Frühere PowerPoint-Präsentationen, interne Wikis"]

### 7.3 Sonstige Quellen ○

- **Zielgruppen-Feedback ○:** [z.B. "Interviews mit 5 Polizeimitarbeitern, Sept. 2025"]
- **Vorgaben von Vorgesetzten ○:** [z.B. "Dienstanweisung XY-2025: Fokus auf gerichtsverwertbare Dokumentation"]
- **Best Practices IT-Forensik ○:** [z.B. "NIST Guidelines for Digital Forensics"]

---

## 8. Topics & Lernziele pro Topic \*

**Zweck für die KI:** Dieser Abschnitt definiert die Haupt-Topics (oberste Hierarchie-Ebene) und deren spezifische Lernziele. Die KI nutzt diese Struktur in Phase 0.5, um die vollständige Gliederung (Topics → Chapters → Sections) zu erstellen. In Phase 1 richtet die KI jeden Section-Draft am Topic-Lernziel aus. In Phase 4 prüft die KI, ob die Sections die Topic-Lernziele unterstützen.

**Hinweis:** Jedes Topic kann durch ein **separates Topic-spezifisches Dokument** ergänzt werden (siehe `topic-specific-requirements-template.md`). Diese Dokumente enthalten detaillierte Vorgaben, die nur für dieses Topic gelten.

### Topic 1: [Topic-Name] \*

- **Lernziel \*:** [Was soll der Anwender nach diesem Topic können? Präzise formulieren. Beispiel: "Ermittler können einen Case korrekt anlegen, das passende Template auswählen und häufige Fehler bei der Vorbereitung vermeiden."]

- **Fokus \*:** [Welche Aspekte werden in diesem Topic besonders betont? Beispiel: "Fehlerprävention durch Schritt-für-Schritt-Anleitung, korrekte Template-Auswahl"]

- **Besonderheiten △:** [Gibt es Topic-spezifische Anforderungen? Beispiel: "Viele Screenshots erforderlich (UI-intensive Schritte), Video für Template-Auswahl-Prozess"]

- **Geschätzter Umfang △:** [Anzahl Chapters und Sections, z.B. "3 Chapters, 12-18 Sections"]

- **Weiterführende Vorgaben ○:** [Verweis auf Topic-spezifisches Dokument, z.B. "Siehe `topic-vorbereitung-requirements.md`" oder "Keine zusätzlichen Vorgaben"]

### Topic 2: [Topic-Name] \*

- **Lernziel \*:** [...]
- **Fokus \*:** [...]
- **Besonderheiten △:** [...]
- **Geschätzter Umfang △:** [...]
- **Weiterführende Vorgaben ○:** [...]

### Topic 3: [Topic-Name] \*

- **Lernziel \*:** [...]
- **Fokus \*:** [...]
- **Besonderheiten △:** [...]
- **Geschätzter Umfang △:** [...]
- **Weiterführende Vorgaben ○:** [...]

**[Weitere Topics nach Bedarf hinzufügen]**

---

## 9. Tonalität & Stil \*

**Zweck für die KI:** Dieser Abschnitt definiert den sprachlichen Stil der Inhalte. Die KI muss diesen Stil in Phase 0.5 (Gliederung), Phase 1 (Section-Drafts) und Phase 4 (Semantic Review) konsequent anwenden bzw. prüfen. Falscher Stil führt zu unbrauchbaren Ergebnissen.

**Warum wichtig für alle Phasen?**
- **Phase 0.5:** Die Gliederung enthält bereits Kurzbeschreibungen pro Section – diese müssen im richtigen Ton formuliert sein
- **Phase 1:** Alle Section-Drafts müssen den definierten Stil einhalten
- **Phase 4:** Die KI prüft, ob Tonalität und Satzstruktur den Vorgaben entsprechen

### 9.1 Tonalität \*

**Grundregel \*:** [z.B. "Subtil-unterstützend, aber sachlich. Professionell, aber nicht steif."]

**Erlaubt \*:**
- [Beispiel 1: "Dieser Schritt erfordert besondere Sorgfalt."]
- [Beispiel 2: "Der Export wurde erfolgreich erstellt."]
- [Beispiel 3: "Hinweis: Diese Einstellung kann nicht rückgängig gemacht werden."]
- [Beispiel 4: "Achten Sie darauf, dass..."]

**Nicht erlaubt \*:**
- [Beispiel 1: "Super gemacht!", "Sie schaffen das!", "Toll!", "Klasse!"]
- [Beispiel 2: Übermäßig motivierend-ermunternde Sprache ("Sie sind auf dem besten Weg!")]
- [Beispiel 3: Infantilisierende Ausdrücke ("Das ist ganz einfach!", "Keine Sorge!")]
- [Beispiel 4: Umgangssprachliche Formulierungen ("Klicken Sie mal auf...", "Das Ding da...")]

**Begründung:** [z.B. "Die Zielgruppe (Polizei-Ermittler) erwartet professionelle, respektvolle Ansprache ohne Bevormundung."]

### 9.2 Satzstruktur △

- **Satzbau △:** [z.B. "Kurze, klare Sätze. Maximal 20 Wörter pro Satz im Durchschnitt. Komplexe Sachverhalte in mehrere Sätze aufteilen."]
- **Fachsprache △:** [z.B. "Fachbegriffe nur mit Erklärung verwenden. Beim ersten Auftreten definieren (inline oder in Info-Box)."]
- **Aktiv vs. Passiv △:** [z.B. "Aktiv bevorzugen ('Klicken Sie auf Export') statt Passiv ('Auf Export wird geklickt')"]
- **Anredeform \*:** [z.B. "Sie-Form (formell)" oder "Du-Form (informell, nur bei expliziter Vorgabe)"]

### 9.3 Strukturelemente △

- **Absatzlänge △:** [z.B. "Max. 4-5 Sätze pro Absatz, dann Leerzeile"]
- **Listen △:** [z.B. "Bei >3 zusammenhängenden Punkten: Liste verwenden. Sonst: Fließtext."]
- **Hervorhebungen ○:** [z.B. "Sparsam mit **fett** und *kursiv*. Nur für wirklich wichtige Begriffe."]

---

## 10. Sonstige Vorgaben & Referenzen \*

**Zweck für die KI:** Dieser Abschnitt verweist auf weitere Dokumente, die für Phase 0.5, Phase 1 und Phase 4 relevant sind. Die KI muss diese Dokumente konsultieren, um alle Anforderungen zu erfüllen.

**Hinweis:** Dieser Abschnitt enthält primär **Verweise**, keine Inhalts-Duplikation. Details stehen in den referenzierten Dokumenten.

### 10.1 Barrierefreiheit (BFSG) \*

**Separates Dokument:** `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` + `cluster3_BFSG-Barrierefreiheit-Content.md`

**Verwendung in Phase 1 \*:**
- KI muss BFSG-konform generieren: `lang="..."` bei fremdsprachigen Begriffen, Alt-Texte max. 120 Zeichen, Überschriften-Hierarchie ohne Sprünge
- Diese Anforderungen sind **Pflicht**, keine Optionen

**Verwendung in Phase 4 \*:**
- KI prüft BFSG-Konformität der generierten Sections

**Umgang:** Die KI konsultiert diese Dokumente bei jeder Section-Erstellung und beim Review. Verstöße führen zu Validierungsfehlern in Phase 2.

### 10.2 HTML-Syntax & Struktur \*

**Separates Dokument:** `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md`

**Verwendung in Phase 1 \*:**
- KI muss HTML-Element-Whitelist beachten (32 erlaubte Elemente)
- Pflicht-Attribute pro Element (z.B. jede `<section>` braucht `data-section`, `data-level`, etc.)
- CSS-Klassen aus vordefinierter Liste

**Verwendung in Phase 4 △:**
- KI kann HTML-Struktur auf semantische Sinnhaftigkeit prüfen

**Umgang:** Die KI generiert nur syntaktisch korrektes HTML gemäß diesem Dokument. Python-Validator prüft in Phase 2.

### 10.3 Qualitätssicherung & Validierung △

**Separates Dokument:** `cluster4_Qualitätssicherung-Metadaten-Validierung.md`

**Verwendung in Phase 1 △:**
- KI kennt Validierungskriterien (syntaktisch + semantisch)
- KI kann JSON-LD-Metadaten korrekt befüllen (inkl. `estimatedTime`, `difficultyLevel`)

**Verwendung in Phase 4 \*:**
- KI nutzt die definierten Kriterien für Semantic Review und Quality-Score-Vergabe

**Umgang:** Die KI nutzt dieses Dokument für Self-Review vor Ausgabe des Drafts (Phase 1) und für systematisches Review (Phase 4).

### 10.4 Workflow & Rollen ○

**Separates Dokument:** `cluster5_Workflow-Rollen.md`

**Verwendung ○:**
- Für KI optional (Kontext-Verständnis)
- Für Maintainer wichtig (Prozess-Übersicht)

---

## 11. Review & Approval △

**Zweck für die KI:** Dieser Abschnitt dokumentiert die Review- und Approval-Prozesse für dieses Strategiedokument selbst. Er gibt dem Dokument formales Gewicht und zeigt den Status. Die KI kann hieraus ablesen, ob dieses Dokument bereits final freigegeben ist.

### 11.1 Review-Prozess △

- **Reviewer △:** [Name(n) der Reviewer, z.B. "Max Mustermann, Jane Doe"]
- **Review-Kriterien △:** [z.B. "Vollständigkeit (alle Pflichtfelder ausgefüllt), Konsistenz (keine Widersprüche), Praxistauglichkeit (realistisch umsetzbar)"]
- **Review-Datum △:** [YYYY-MM-DD]
- **Review-Ergebnis △:** [Approved / Changes Requested / Rejected]
- **Review-Kommentare ○:** [Freitext für Anmerkungen]

### 11.2 Approval △

- **Approved von △:** [Name des Hauptverantwortlichen]
- **Datum △:** [YYYY-MM-DD]
- **Freigabe für Phase 0.5 △:** [Ja / Nein]

**Hinweis:** Erst nach Approval darf dieses Strategiedokument an die KI für Phase 0.5 übergeben werden.

---

## 12. Risiken & Herausforderungen ○

**Zweck für die KI:** Dieser optionale Abschnitt sensibilisiert die KI für projektspezifische Herausforderungen. Die KI kann dadurch in Phase 0.5 und Phase 1 proaktiv Lösungen entwickeln (z.B. extra einfache Sprache bei niedriger IT-Kompetenz der Zielgruppe). In Phase 4 kann die KI prüfen, ob die definierten Mitigation-Strategien in den Sections umgesetzt wurden.

**Hinweis:** Dieser Abschnitt ist **optional**, aber empfohlen bei komplexen Projekten oder schwierigen Zielgruppen.

### 12.1 Bekannte Herausforderungen ○

[Liste projektspezifische Risiken und Herausforderungen auf. Beispiele:]

1. **Niedrige IT-Kenntnisse der Zielgruppe ○:**
   - **Problem:** Begriffe wie "Datenbank", "Hash", "Metadaten" sind unbekannt
   - **Lösungsansatz:** Jeder Fachbegriff muss beim ersten Auftreten erklärt werden (inline oder Info-Box)

2. **Komplexe Software-UI ○:**
   - **Problem:** [Tool-Name] hat >200 Features, UI ist überwältigend für Anfänger
   - **Lösungsansatz:** Fokus auf 20% der Features (80/20-Regel), viele Screenshots zur Orientierung

3. **Gerichtsverwertbarkeit ○:**
   - **Problem:** Fehler in Anleitung können zu unverwertbaren Beweisen führen
   - **Lösungsansatz:** Besondere Sorgfalt bei kritischen Schritten (z.B. Chain of Custody), Warnungen an relevanten Stellen

4. **Schnelle Software-Updates ○:**
   - **Problem:** Software veröffentlicht häufig Updates, UI ändert sich
   - **Lösungsansatz:** Versionierung im Strategiedokument, Screenshots mit Versionsnummer versehen

### 12.2 Mitigation-Strategien ○

[Wie werden die Risiken adressiert? Beispiele:]

- **Extra-einfache Sprache:** Lesetest mit Flesch-Reading-Ease Score ≥60 anstreben
- **Viele Medien:** Mindestens 1 Screenshot pro 5 Sätze bei UI-lastigen Sections
- **Review-Prozess:** Jede Section wird von erfahrenem Forensiker geprüft (Phase 7)
- **Versionierungs-Strategie:** Sections haben `toolVersion`-Metadatum, erlaubt parallele Versionen

---

## 13. Glossar & Begriffsklärungen ○

**Zweck:** Zentrale Begriffe definieren, die im Strategiedokument und in Sections verwendet werden.

**Hinweis:** Dieser Abschnitt ist optional, aber empfohlen bei projekt-spezifischen Begriffen.

| Begriff | Definition | Kontext |
|---------|------------|---------|
| [Begriff 1] | [Definition] | [z.B. Technisch, Forensisch, Tool-spezifisch] |
| [Begriff 2] | [Definition] | [Kontext] |

**Beispiele:**
- **Section:** Kleinste inhaltliche Einheit im Handbuch
- **Detail-Level:** Detaillierungsgrad einer Section (Level 1-4)
- **Maintainer:** Verantwortliche Person für Erstellung und Pflege

---

## 14. Anhänge & Referenzen ○

**Zweck:** Übersicht über alle referenzierten Dokumente und externe Quellen.

### 14.1 Referenzierte interne Dokumente ○

| Dokument | Zweck | Status |
|----------|-------|--------|
| [Dokumentname] | [Beschreibung] | [Abgeschlossen / In Arbeit / Geplant] |

### 14.2 Externe Referenzen ○

- [Quelle 1]: [URL oder Beschreibung]
- [Quelle 2]: [URL oder Beschreibung]

### 14.3 Interne Vorlagen (Templates) ○

- [Template-Name]: [Pfad oder Beschreibung]

---

## 15. Wartung & Änderungshistorie ○

**Zweck:** Wartungsplan und Verantwortlichkeiten für dieses Strategiedokument.

### 15.1 Wartungszyklus ○

- **Quartalsweise Review:** [Beschreibung]
- **Jährliche Vollrevision:** [Beschreibung]
- **Bei Tool-Major-Release:** [Beschreibung]

### 15.2 Verantwortlichkeiten ○

- **Strategiedokument-Pflege:** [Name/Rolle]
- **Terminologie-Listen-Pflege:** [Name/Rolle]
- **Medien-Aktualisierung:** [Name/Rolle]

### 15.3 Eskalationspfade ○

**Bei Unklarheiten/Konflikten:**
1. [Thema]: → [Ansprechpartner/Dokument]
2. [Thema]: → [Ansprechpartner/Dokument]

---

**Ende des Strategiedokuments (Template)**

---

## Hinweise zur Verwendung dieses Templates

1. **Alle Platzhalter ersetzen:** `[...]` durch konkrete Inhalte ersetzen
2. **Pflichtfelder \* ausfüllen:** Ohne diese kann die KI nicht arbeiten
3. **Checkboxen anpassen:** Bei Detail-Levels die Checkboxen entsprechend setzen
4. **Beispiel konsultieren:** Siehe `strategy-document-example-axiom.md` für vollständig ausgefülltes Beispiel
5. **Iterativ verfeinern:** Nach Phase 0.5 ggf. anpassen und erneut durchlaufen
