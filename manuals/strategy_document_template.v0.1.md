# Strategiedokument: [Projekt-Name]

**Version:** 1.0.0  
**Erstellt am:** YYYY-MM-DD  
**Erstellt von:** [Name des Maintainers]  
**Ziel-Tool:** [Name der Software, z.B. "Magnet AXIOM Examine"]  
**Tool-Version:** [Version, z.B. "7.x"]  
**Status:** Draft | Review | Approved

---

## Legende: Feldtypen

- **\*** = **Pflichtfeld** (muss ausgefüllt werden)
- **△** = **Empfohlenes Feld** (sollte ausgefüllt werden, erhöht Qualität)
- **○** = **Optionales Feld** (bei Bedarf ausfüllen)

---

## 1. Metadaten \*

### 1.1 Projekt-Informationen \*
- **Projekt-Name:** [Name des Projekts, z.B. "WebAssistantForensics - AXIOM Examine"]
- **Tool-Name:** [Name der zu beschreibenden Software, z.B. "Magnet AXIOM Examine"]
- **Tool-Version:** [Version(en), z.B. "7.x" oder "7.0 - 7.5"]
- **Haupt-Zielgruppe:** [Beschreibung, z.B. "IT-ferne Polizei-Ermittler mit Mittlerer Reife"]

### 1.2 Projekt-Umfang △
- **Geschätzter Content-Umfang:** [Anzahl Sections, z.B. "~100-150 Sections"]
- **Geschätzte Bearbeitungszeit:** [z.B. "3-6 Monate"]
- **Priorität:** [Hoch / Mittel / Niedrig]

### 1.3 Versions-Historie ○
| Version | Datum | Änderungen | Bearbeiter |
|---------|-------|------------|------------|
| 1.0.0 | YYYY-MM-DD | Initial erstellt | [Name] |

---

## 2. Globale Lernziele \*

### 2.1 Haupt-Lernziel \*
**Nach Abschluss dieses Handbuchs soll der Anwender in der Lage sein:**

[Formuliere ein prägnantes, messbares Lernziel. Beispiel:]
> *"IT-ferne Ermittler können eigenständig forensische Auswertungen mit [Tool-Name] durchführen, von der Case-Vorbereitung über die Analyse bis zur Erstellung eines gerichtsverwertbaren Reports."*

### 2.2 Teil-Lernziele △
**Der Anwender soll außerdem:**

1. [Teil-Lernziel 1, z.B. "Häufige Fehlerquellen bei der Case-Vorbereitung vermeiden können"]
2. [Teil-Lernziel 2, z.B. "Best-Practice-Einstellungen für gängige Analysen kennen"]
3. [Teil-Lernziel 3, z.B. "Grundlegende Troubleshooting-Strategien anwenden können"]

---

## 3. Globaler Fokus & Umfang \*

### 3.1 Fokus \*
**Diese Aspekte werden besonders betont:**

- [Aspekt 1, z.B. "Fehlerprävention (vermeiden statt korrigieren)"]
- [Aspekt 2, z.B. "Best-Practice-Workflows für Standardfälle"]
- [Aspekt 3, z.B. "Verständlichkeit für IT-Laien"]

### 3.2 Umfang & Tiefe \*
**Detaillierungsgrad:**

- **Standard-Detail-Level:** [z.B. "Level 2 (Best-Practice) als Standard"]
- **Maximale Tiefe:** [z.B. "Level 3 (Detailliert) für kritische Bereiche"]
- **Minimale Tiefe:** [z.B. "Level 1 (Schnellübersicht) für Experten-Workflows"]

**Abgrenzung – Was wird NICHT behandelt:**

- [Ausschluss 1, z.B. "Programmierung eigener Plugins"]
- [Ausschluss 2, z.B. "Netzwerk-Forensik (separates Handbuch)"]
- [Ausschluss 3, z.B. "Juristische Verwertbarkeit (Zuständigkeit: Rechtsabteilung)"]

### 3.3 Voraussetzungen beim Anwender △
**Der Anwender sollte mitbringen:**

- [Voraussetzung 1, z.B. "Grundlegende Windows-Kenntnisse (Dateien öffnen, kopieren)"]
- [Voraussetzung 2, z.B. "Verständnis des eigenen Aufgabenbereichs (Ermittlungsarbeit)"]
- [Voraussetzung 3, z.B. "Keine IT-Vorkenntnisse erforderlich"]

---

## 4. Terminologie-Strategie \*

### 4.1 Sprach-Präferenzen \*
- **Grundregel:** [z.B. "Deutsche Begriffe bevorzugen, englische Fachbegriffe wo etabliert"]
- **Englische Begriffe beibehalten für:**
  - [Kategorie 1, z.B. "Software-spezifische UI-Elemente (z.B. 'Artifacts Explorer')"]
  - [Kategorie 2, z.B. "Etablierte IT-Begriffe ohne sinnvolle deutsche Alternative (z.B. 'Cache', 'E-Mail')"]
- **Deutsche Übersetzungen verwenden für:**
  - [Kategorie 1, z.B. "Allgemeine Begriffe (z.B. 'Query' → 'Abfrage')"]
  - [Kategorie 2, z.B. "Beschreibende Begriffe (z.B. 'Export' → beibehalten, aber 'Report' → 'Bericht')"]

### 4.2 Tool-spezifische Begriffe △
- **Original-Begriffe aus [Tool-Name] verwenden für:**
  - [Liste wichtiger UI-Elemente, z.B. "Artifacts Explorer", "Case Dashboard", "Processing Engine"]
- **Konsistenz-Regel:** Begriffe aus dem offiziellen Handbuch übernehmen, nicht neu erfinden

### 4.3 Terminologie-Entscheidungsliste ○
**Wichtige Begriffsentscheidungen (wird während Phase 1 erweitert):**

| Begriff (Original) | Entscheidung | Begründung |
|-------------------|--------------|------------|
| Query | Abfrage (dt.) | Geläufiger deutscher Begriff existiert |
| E-Mail | E-Mail (engl.) | Etabliert, keine sinnvolle Alternative |
| [Weiterer Begriff] | [Entscheidung] | [Begründung] |

---

## 5. Detail-Level-Strategie \*

### 5.1 Zu erstellende Detail-Levels \*
**In Phase 1 werden folgende Detail-Levels initial generiert:**

- [x] **Level 1 (Schnellübersicht):** [Ja/Nein, ggf. Priorisierung]
- [x] **Level 2 (Best-Practice):** [Standard, immer erstellen]
- [x] **Level 3 (Detailliert):** [Ja/Nein, ggf. nur für kritische Sections]
- [ ] **Level 4 (Show-Only):** [Ja/Nein, ggf. später als Erweiterung]

### 5.2 Priorisierung △
**Reihenfolge der Erstellung:**

1. [z.B. "Level 2 (Best-Practice) für alle Sections"]
2. [z.B. "Level 3 (Detailliert) für kritische Bereiche (Export, Case-Vorbereitung)"]
3. [z.B. "Level 1 (Schnellübersicht) bei Bedarf"]

---

## 6. Medien-Strategie \*

### 6.1 Medien-Präferenzen \*
**Wann welcher Medien-Typ:**

- **Screenshots:** [Wann einsetzen? z.B. "Bei UI-Elementen, die lokalisiert werden müssen"]
- **Annotierte Screenshots:** [Wann einsetzen? z.B. "Bei komplexen Masken mit vielen Optionen"]
- **Videos:** [Wann einsetzen? z.B. "Bei mehrstufigen Workflows (>5 Schritte)"]
- **Diagramme:** [Wann einsetzen? z.B. "Bei Prozess-Darstellungen, konzeptionellen Zusammenhängen"]
- **Audio:** [Wann einsetzen? z.B. "Selten, nur bei Spezialfällen"]

### 6.2 Medien-Qualität △
- **Screenshots:**
  - Format: PNG
  - Kompression: 60-80%
  - Auflösung: 72 dpi
  - Minimale Breite: 1280px
- **Videos:**
  - Format: MP4
  - Minimale Auflösung: 1280×720
  - Minimale Framerate: 15fps
  - **Untertitel:** Pflicht (BFSG-konform, .vtt-Format)
- **Annotationen:**
  - Schriftart: Open Sans, 16px
  - Farben: [Spezifische Farbcodes angeben, z.B. "#FF0000 für Fehler, #00FF00 für Erfolg"]

### 6.3 Medien-Häufigkeit ○
**Empfohlene Verhältnisse:**

- [z.B. "1 Medium pro 5-10 Sätze (als Richtwert)"]
- [z.B. "Mindestens 1 Medium pro Section"]

---

## 7. Wissensquellen \*

### 7.1 Primäre Quellen \*
**Diese Quellen werden als Grundlage verwendet:**

1. **Offizielles Handbuch/Dokumentation:**
   - Quelle: [z.B. "Magnet AXIOM Examine User Guide v7.5"]
   - Status: [Verfügbar / In Beschaffung]
   - Speicherort: [z.B. "manuals/axiom-user-guide-7.5.pdf"]

2. **Online-Hilfe der Software:**
   - URL: [z.B. "https://docs.magnetforensics.com/axiom"]
   - Stand: [z.B. "2025-10-10"]

3. **Eigene Expertise des Maintainers:**
   - Fachbereich: [z.B. "IT-Forensik, 5+ Jahre Erfahrung mit AXIOM"]

### 7.2 Sekundäre Quellen △
**Ergänzende Quellen:**

- **Foren:** [z.B. "Magnet User Forum, Reddit r/digitalforensics"]
- **Blogbeiträge:** [z.B. "SANS Digital Forensics Blog"]
- **Akademische Artikel:** [z.B. "IEEE Papers zu Forensik-Best-Practices"]
- **Schulungsunterlagen:** [z.B. "Interne Polizei-Schulungen"]

### 7.3 Sonstige Quellen ○
- **Zielgruppen-Feedback:** [z.B. "Interviews mit 5 Polizeimitarbeitern, Sept. 2025"]
- **Vorgaben von Vorgesetzten:** [z.B. "Dienstanweisung XY-2025"]

---

## 8. Topics & Lernziele pro Topic \*

**Hinweis:** Jedes Topic kann durch ein **separates Topic-spezifisches Dokument** ergänzt werden (siehe `topic-specific-requirements-template.md`).

### Topic 1: [Topic-Name] \*
- **Lernziel:** [Was soll der Anwender nach diesem Topic können?]
- **Fokus:** [Welche Aspekte werden betont?]
- **Besonderheiten:** [Gibt es Topic-spezifische Anforderungen?]
- **Weiterführende Vorgaben:** [Verweis auf Topic-spezifisches Dokument, z.B. "Siehe `topic-vorbereitung-requirements.md`"] ○

### Topic 2: [Topic-Name] \*
- **Lernziel:** [...]
- **Fokus:** [...]
- **Besonderheiten:** [...]
- **Weiterführende Vorgaben:** [Verweis oder "Keine zusätzlichen Vorgaben"] ○

### Topic 3: [Topic-Name] \*
- **Lernziel:** [...]
- **Fokus:** [...]
- **Besonderheiten:** [...]
- **Weiterführende Vorgaben:** [Verweis oder "Keine zusätzlichen Vorgaben"] ○

---

## 9. Tonalität & Stil \*

### 9.1 Tonalität \*
**Grundregel:** [z.B. "Subtil-unterstützend, aber sachlich"]

**Erlaubt:**
- [Beispiel 1: "Dieser Schritt erfordert besondere Sorgfalt."]
- [Beispiel 2: "Der Export wurde erfolgreich erstellt."]

**Nicht erlaubt:**
- [Beispiel 1: "Super gemacht!", "Sie schaffen das!", "Toll!"]
- [Beispiel 2: "Zu motivierend-ermunternde Sprache"]

### 9.2 Satzstruktur △
- **Satzbau:** [z.B. "Kurze Sätze, maximal 20 Wörter pro Satz"]
- **Fachsprache:** [z.B. "Vermeiden ohne Erklärung, bei Verwendung definieren"]
- **Aktiv vs. Passiv:** [z.B. "Aktivformulierungen bevorzugen"]

---

## 10. Sonstige Vorgaben ○

### 10.1 Barrierefreiheit △
- **BFSG-konform:** Ja (Pflicht)
- **Sprachauszeichnung:** `lang="en"` bei englischen Begriffen
- **Alt-Texte:** Max. 120 Zeichen, zweckbeschreibend
- **Überschriften-Hierarchie:** Keine Sprünge (h2 → h3 → h4)

### 10.2 Multi-Tool-Vorbereitung ○
- **Spätere Tool-Erweiterungen geplant:** [z.B. "X-Ways Forensics, Cellebrite Physical Analyzer"]
- **Tool-agnostische Formulierungen:** [z.B. "Wo möglich, generische Begriffe verwenden"]

### 10.3 Erweiterbarkeit ○
- **Geplante Erweiterungen:** [z.B. "Glossar-Modul, FAQ-Bereich, Troubleshooting-Guide"]

---

## 11. Review & Approval ○

### 11.1 Review-Prozess
- **Reviewer:** [Name(n) der Reviewer]
- **Review-Kriterien:** [z.B. "Vollständigkeit, Konsistenz, Praxistauglichkeit"]

### 11.2 Approval
- **Approved von:** [Name]
- **Datum:** [YYYY-MM-DD]
- **Unterschrift:** [falls physisch]

---

**Ende des Strategiedokuments**

---

## Anhang: Beispiel-Ausfüllung (AXIOM Examine)

**Hinweis:** Dies ist ein **Beispiel** zur Verdeutlichung. Passe es an dein konkretes Projekt an.

---

# Strategiedokument: WebAssistantForensics - AXIOM Examine

**Version:** 1.0.0  
**Erstellt am:** 2025-10-10  
**Erstellt von:** Max Mustermann  
**Ziel-Tool:** Magnet AXIOM Examine  
**Tool-Version:** 7.x  
**Status:** Approved

---

## 1. Metadaten \*

### 1.1 Projekt-Informationen \*
- **Projekt-Name:** WebAssistantForensics - AXIOM Examine
- **Tool-Name:** Magnet AXIOM Examine
- **Tool-Version:** 7.0 - 7.5
- **Haupt-Zielgruppe:** IT-ferne Polizei-Ermittler (Mittlere Reife, niedrige IT-Kenntnisse)

### 1.2 Projekt-Umfang △
- **Geschätzter Content-Umfang:** ~100-150 Sections
- **Geschätzte Bearbeitungszeit:** 4 Monate
- **Priorität:** Hoch

---

## 2. Globale Lernziele \*

### 2.1 Haupt-Lernziel \*
> *"IT-ferne Ermittler können eigenständig forensische Auswertungen mit AXIOM Examine durchführen, von der Case-Vorbereitung über die Analyse bis zur Erstellung eines gerichtsverwertbaren Reports."*

### 2.2 Teil-Lernziele △
1. Häufige Fehlerquellen bei der Case-Vorbereitung vermeiden können
2. Best-Practice-Einstellungen für gängige Analysen (E-Mail, Chat, Browser) kennen und anwenden
3. Grundlegende Troubleshooting-Strategien bei Fehlermeldungen anwenden können

---

## 3. Globaler Fokus & Umfang \*

### 3.1 Fokus \*
- **Fehlerprävention:** Vermeiden statt korrigieren (z.B. korrekte Template-Auswahl)
- **Best-Practice-Workflows:** Standardfälle abdecken (80% der täglichen Arbeit)
- **Verständlichkeit:** Einfache Sprache, viele Schritt-für-Schritt-Anleitungen

### 3.2 Umfang & Tiefe \*
- **Standard-Detail-Level:** Level 2 (Best-Practice)
- **Maximale Tiefe:** Level 3 (Detailliert) für Export, Case-Vorbereitung, Fehlerbehandlung
- **Minimale Tiefe:** Level 1 (Schnellübersicht) für Experten-Features (z.B. Custom Artifacts)

**Abgrenzung – Was wird NICHT behandelt:**
- Programmierung eigener Plugins (zu komplex für Zielgruppe)
- Mobile Device Forensik (separates Handbuch geplant)
- Juristische Verwertbarkeit (Zuständigkeit: Rechtsabteilung)

---

## 8. Topics & Lernziele pro Topic \*

### Topic 1: Vorbereitung
- **Lernziel:** Ermittler können einen Case korrekt anlegen, Template auswählen und häufige Fehler vermeiden
- **Fokus:** Fehlerprävention, Schritt-für-Schritt-Anleitung
- **Besonderheiten:** Viele Screenshots erforderlich (UI-intensive Schritte)
- **Weiterführende Vorgaben:** Siehe `topic-vorbereitung-requirements.md`

### Topic 2: Export & Reporting
- **Lernziel:** Ermittler können Analyseergebnisse in verschiedenen Formaten exportieren und gerichtsverwertbare Reports erstellen
- **Fokus:** Best-Practice-Einstellungen, Formatwahl-Hilfe
- **Besonderheiten:** Vergleichstabellen (CSV vs. HTML vs. PDF), annotierte Screenshots
- **Weiterführende Vorgaben:** Siehe `topic-export-requirements.md`

### Topic 3: Troubleshooting
- **Lernziel:** Ermittler können häufige Fehlermeldungen interpretieren und Lösungsansätze anwenden
- **Fokus:** Praktische Problemlösung, Schritt-für-Schritt-Debugging
- **Besonderheiten:** Viele "Wenn-Dann"-Strukturen, Entscheidungsbäume
- **Weiterführende Vorgaben:** Keine zusätzlichen Vorgaben

---

**Ende Beispiel-Ausfüllung**
