# Terminologie-Entscheidungsliste

**Version:** 1.0.0  
**Erstellt am:** 2025-10-10  
**Erstellt von:** Claude Sonnet 4.5 (basierend auf Vorgaben von Max Mustermann)  
**Status:** Template / Living Document  
**Projekt:** WebAssistant Forensics (Tool-übergreifend)

---

## 1. About this document

### 1.1 Zweck

Dieses Dokument dokumentiert **alle terminologischen Entscheidungen** für das WebAssistant Forensics-Projekt. Es dient als zentrale Referenz für:

- **Konsistente Begriffsverwendung** über alle Sections hinweg
- **Vermeidung von Widersprüchen** (z.B. "Abfrage" vs. "Query" in verschiedenen Sections)
- **Nachvollziehbarkeit** von Entscheidungen (Warum wurde Begriff X auf Deutsch übersetzt, Begriff Y aber nicht?)
- **Wiederverwendbarkeit** bei Tool-Erweiterungen (X-Ways Forensics, Cellebrite, etc.)

### 1.2 Zielgruppe

- **KI-Agent (Claude Sonnet 4.5):** Nutzt diese Liste in Phase 1 (Section-Erstellung) zur konsistenten Begriffsverwendung
- **Maintainer:** Pflegt die Liste, genehmigt neue Einträge, löst Konflikte
- **Reviewer:** Prüft in Phase 4 (Semantic Review) auf Konsistenz mit dieser Liste

### 1.3 Verwendung in den Phasen

**Phase 0 (Strategie):**
- Maintainer definiert **Startwerte** (initiale Begriffe aus Strategiedokument)
- Liste wird erstellt und versioniert

**Phase 0.5 (Gesamtgliederung):**
- KI konsultiert Liste bei Erstellung von Section-Titeln und Kurzbeschreibungen

**Phase 1 (Section-Erstellung):**
- KI konsultiert Liste bei jedem neuen Begriff
- Wenn Begriff **nicht** in Liste → KI entscheidet basierend auf Terminologie-Strategie (Abschnitt 4 des Strategiedokuments) und **trägt Entscheidung mit Status "Proposed" ein**
- KI dokumentiert Begründung

**Phase 3 (Syntaktische Validierung):**
- Python-Validator prüft: Sind alle verwendeten Begriffe in der Liste dokumentiert? (Warning bei fehlenden Einträgen)

**Phase 4 (Semantic Review):**
- KI prüft: Wurden Begriffe konsistent verwendet? (Abgleich mit Liste)
- Inkonsistenzen werden im Review-Report markiert

**Phase 6 (Maintainer-Review):**
- Maintainer prüft alle "Proposed"-Einträge
- Genehmigt ("Approved") oder ändert Entscheidung
- Bei Änderung: Betroffene Sections werden markiert für Überarbeitung

**Laufende Pflege:**
- Liste wächst organisch mit jedem neuen Projekt/Topic
- Quartalsweise Konsolidierung (Duplikate entfernen, Kategorien aufräumen)

---

## 2. Aufbau der Liste

### 2.1 Tabellenstruktur

Die Liste verwendet folgendes Format:

| Begriff (DE) | Begriff (EN/Original) | Entscheidung | Kategorie | Kontext | Begründung | Quelle | Status | Version |
|--------------|----------------------|--------------|-----------|---------|------------|--------|--------|---------|
| [Deutscher Begriff] | [Englischer/Originalbegriff] | [Präferenz: DE/EN/Kontextabhängig] | [Siehe 2.2] | [Wo verwendet?] | [Warum so entschieden?] | [Welches Dokument?] | [Siehe 2.3] | [Seit wann?] |

### 2.2 Kategorien

Begriffe werden kategorisiert nach:

- **Allgemein:** Tool-unabhängige forensische Begriffe (z.B. "Hash", "Metadaten", "Timeline")
- **Tool-spezifisch:** UI-Elemente des jeweiligen Tools (z.B. "Artifacts Explorer" in AXIOM, "Case Processor" in X-Ways)
- **Forensik-Fachbegriff:** Internationale Standards (z.B. "Chain of Custody", "Write Blocker")
- **Tätigkeitsbegriff:** Allgemeine Aktionen (z.B. "Export", "Suche", "Filter")
- **Technisch:** IT-Begriffe (z.B. "Cache", "Log-Datei", "Datenbank")

### 2.3 Status-Werte

- **Approved:** Von Maintainer genehmigt, verbindlich für alle Sections
- **Proposed:** Von KI vorgeschlagen, wartet auf Maintainer-Prüfung
- **Deprecated:** Nicht mehr verwenden (wird durch anderen Begriff ersetzt, siehe "Ersetzt durch"-Spalte)
- **Under Review:** Widersprüchliche Verwendung festgestellt, Klärung läuft

### 2.4 Entscheidungs-Werte

- **Präferenz: DE** → Deutscher Begriff wird bevorzugt verwendet
- **Präferenz: EN** → Englischer Begriff wird bevorzugt verwendet (z.B. bei UI-Elementen)
- **Kontextabhängig** → Je nach Kontext deutsch oder englisch (z.B. "Processing" vs. "Verarbeitung")
- **Synonym erlaubt** → Beide Begriffe gleichberechtigt, aber konsistent innerhalb einer Section

---

## 3. Prozedere für neue Begriffe

### 3.1 Wann wird ein Begriff aufgenommen?

**Aufnahme bei:**
- Begriff tritt in **≥2 Sections** auf (Wiederverwendung wahrscheinlich)
- Begriff ist **mehrdeutig** (z.B. "Case" = Fall oder Gehäuse?)
- Begriff ist **Tool-spezifisch** und könnte bei Tool-Wechsel verwirren
- Begriff ist **erklärungsbedürftig** (Fachbegriff, der beim ersten Auftreten definiert wird)

**KEINE Aufnahme bei:**
- Allgemeinsprache (z.B. "öffnen", "klicken", "speichern")
- Einmalige Verwendung in einer Section
- Selbsterklärende Begriffe (z.B. "Datei", "Ordner", "Fenster")

### 3.2 Entscheidungsprozess für KI (Phase 1)

**Schritt 1: Liste konsultieren**
- Ist Begriff bereits in Liste? → Entscheidung übernehmen (Spalte "Entscheidung")

**Schritt 2: Terminologie-Strategie anwenden (falls nicht in Liste)**
- Strategiedokument Abschnitt 4.1 konsultieren:
  - Ist es ein **Software-UI-Element**? → Original-Begriff verwenden (EN)
  - Ist es ein **etablierter Fachbegriff**? → Prüfen ob deutsche Alternative existiert, sonst EN
  - Ist es ein **allgemeiner Begriff mit deutscher Alternative**? → Deutsche Übersetzung bevorzugen

**Schritt 3: Begründung formulieren**
- Warum wurde so entschieden?
- Beispiel: "UI-Element, wie in AXIOM-Oberfläche sichtbar" oder "Deutscher Begriff etabliert und verständlicher für Zielgruppe"

**Schritt 4: Eintrag erstellen**
- Status: **"Proposed"**
- Alle Pflichtfelder ausfüllen (Begriff DE, Begriff EN, Entscheidung, Kategorie, Kontext, Begründung, Quelle)
- In Draft-Kommentar dokumentieren: "Neuer Terminologie-Eintrag vorgeschlagen, siehe Liste Zeile XY"

**Schritt 5: In Section verwenden**
- Gewählten Begriff konsistent in der Section verwenden

### 3.3 Entscheidungsprozess für Maintainer (Phase 6)

**Schritt 1: Alle "Proposed"-Einträge prüfen**
- Liste nach Status "Proposed" filtern

**Schritt 2: Entscheidung treffen**
- ✅ **Genehmigen:** Status → "Approved", Version erhöhen (siehe 4.1)
- ✏️ **Ändern:** Entscheidung anpassen (z.B. DE → EN), Status → "Approved", betroffene Section markieren für Überarbeitung
- ❌ **Ablehnen:** Eintrag löschen (wenn Begriff doch nicht relevant), betroffene Section markieren für Überarbeitung

**Schritt 3: Konflikte lösen**
- Wenn Begriff in mehreren Sections unterschiedlich verwendet wurde:
  - Beste Variante auswählen
  - Alle betroffenen Sections markieren für Überarbeitung
  - Status → "Under Review" bis Überarbeitung abgeschlossen

---

## 4. Versionierungsvorgaben

### 4.1 Wann wird die Version erhöht?

**Format:** `MAJOR.MINOR.PATCH`

**MAJOR (1.x.x → 2.x.x):**
- Grundlegende Überarbeitung der Terminologie-Strategie
- Viele Begriffe werden geändert (>20% aller Einträge)
- Tool-Wechsel (z.B. AXIOM → X-Ways erfordert neue Tool-spezifische Begriffe)

**MINOR (x.1.x → x.2.x):**
- Neue Kategorie hinzugefügt
- Substantielle Erweiterung (>10 neue Einträge auf einmal)
- Änderung an Struktur der Liste (neue Spalte)

**PATCH (x.x.1 → x.x.2):**
- Einzelne neue Begriffe (1-10 Einträge)
- Bugfixes (Tippfehler, falsche Kategorisierung)
- Statusänderungen (Proposed → Approved)

### 4.2 Changelog-Pflicht

Bei jeder Versionserhöhung:
- Datum, Version, Änderungen im Abschnitt 5.2 (Versions-Historie) dokumentieren
- Betroffene Sections listen (bei MAJOR/MINOR-Änderungen)

### 4.3 Git-Integration

- Datei versioniert im Git-Repository: `terminology/terminologie-entscheidungsliste.md`
- Git-Tag bei MAJOR/MINOR-Versionen: `terminology-v1.1.0`
- Commit-Messages: `[Terminology] Added 5 new entries for AXIOM Export features (v1.0.3)`

---

## 5. Versionsstand

### 5.1 Aktuelle Version

**Version:** 1.0.0  
**Datum:** 2025-10-10  
**Status:** Initial (Startwerte aus AXIOM-Strategiedokument)  
**Anzahl Einträge:** 10  
**Tool-Abdeckung:** Magnet AXIOM Examine (v7.0-7.5)

### 5.2 Versions-Historie

| Version | Datum | Änderungen | Bearbeiter | Betroffene Sections |
|---------|-------|------------|------------|---------------------|
| 1.0.0 | 2025-10-10 | Initial erstellt, 10 Startwerte aus AXIOM-Strategiedokument übernommen | Max Mustermann | - |

---

## 6. Terminologie-Entscheidungen

### 6.1 Startwerte (aus AXIOM-Strategiedokument)

| Begriff (DE) | Begriff (EN/Original) | Entscheidung | Kategorie | Kontext | Begründung | Quelle | Status | Version | Ersetzt durch |
|--------------|----------------------|--------------|-----------|---------|------------|--------|--------|---------|---------------|
| Abfrage | Query | **Präferenz: DE** | Tätigkeitsbegriff | Allgemein | Geläufiger deutscher Begriff existiert, erhöht Verständlichkeit für IT-ferne Zielgruppe | Strategiedokument AXIOM v1.0.1, Abschnitt 4.1 | Approved | 1.0.0 | - |
| E-Mail | Email / E-Mail | **Präferenz: EN (ohne Bindestrich)** | Allgemein | Allgemein | Im deutschen Sprachgebrauch etabliert, keine sinnvolle Alternative | Strategiedokument AXIOM v1.0.1, Abschnitt 4.1 | Approved | 1.0.0 | - |
| Artifacts Explorer | Artifacts Explorer | **Präferenz: EN** | Tool-spezifisch (AXIOM) | AXIOM UI | AXIOM-UI-Element, Original verwenden für Orientierung in Software | Strategiedokument AXIOM v1.0.1, Abschnitt 4.2 | Approved | 1.0.0 | - |
| Bericht | Report | **Präferenz: DE** | Tätigkeitsbegriff | Allgemein | Deutsche Übersetzung klar und etabliert | Strategiedokument AXIOM v1.0.1, Abschnitt 4.1 | Approved | 1.0.0 | - |
| Case Dashboard | Case Dashboard | **Präferenz: EN** | Tool-spezifisch (AXIOM) | AXIOM UI | AXIOM-UI-Element, Original verwenden für Orientierung in Software | Strategiedokument AXIOM v1.0.1, Abschnitt 4.2 | Approved | 1.0.0 | - |
| Processing / Verarbeitung | Processing | **Kontextabhängig** | Tool-spezifisch (AXIOM) | AXIOM | "Processing Engine" (UI-Element) → EN; "Verarbeitung starten" (Tätigkeit) → DE | Strategiedokument AXIOM v1.0.1, Abschnitt 4.3 | Approved | 1.0.0 | - |
| Hash / Hash-Wert | Hash / Hash Value | **Präferenz: Hash-Wert (DE)** | Forensik-Fachbegriff | Allgemein | Forensik-Standard, international etabliert, aber "Hash-Wert" verständlicher als "Hash" allein | Strategiedokument AXIOM v1.0.1, Abschnitt 4.1 | Approved | 1.0.0 | - |
| Timeline | Timeline | **Präferenz: EN** | Tool-spezifisch (AXIOM) | AXIOM UI | AXIOM-UI-Element, etablierter Begriff, keine gute deutsche Alternative ("Zeitleiste" unüblich) | Strategiedokument AXIOM v1.0.1, Abschnitt 4.1 | Approved | 1.0.0 | - |
| Vorlage | Template | **Präferenz: DE** | Allgemein | Allgemein | Deutsche Übersetzung klar und verständlich | Strategiedokument AXIOM v1.0.1, Abschnitt 4.1 | Approved | 1.0.0 | - |
| Asservat | Evidence | **Präferenz: DE (Asservat)** | Forensik-Fachbegriff | Forensisch | Deutscher forensischer Fachbegriff, in Polizei-Kontext etabliert | Strategiedokument AXIOM v1.0.1, Abschnitt 4.3 | Approved | 1.0.0 | - |

### 6.2 Erweiterungen (wachsend während Phase 1)

*Dieser Abschnitt wird von der KI in Phase 1 organisch erweitert. Nach Maintainer-Approval werden Einträge hier hinzugefügt.*

**Beispiel für zukünftige Einträge:**

| Begriff (DE) | Begriff (EN/Original) | Entscheidung | Kategorie | Kontext | Begründung | Quelle | Status | Version | Ersetzt durch |
|--------------|----------------------|--------------|-----------|---------|------------|--------|--------|---------|---------------|
| *[Platzhalter für neue Einträge]* | *[...]* | *[...]* | *[...]* | *[...]* | *[...]* | *[...]* | *[...]* | *[...]* | - |

---

## 7. Sonderfälle & Konfliktlösung

### 7.1 Kontextabhängige Begriffe

**Beispiel: "Processing"**
- Als **UI-Element** ("Processing Engine"): → **EN** verwenden
- Als **Tätigkeit** ("Verarbeitung starten"): → **DE** verwenden

**Regel:** In Spalte "Entscheidung" steht "Kontextabhängig", in Spalte "Begründung" wird erklärt wann EN, wann DE.

### 7.2 Synonyme

**Beispiel: "Hash-Wert" vs. "Prüfsumme"**
- Beide Begriffe bezeichnen dasselbe
- **Primärbegriff:** Hash-Wert (in Liste aufgenommen)
- **Sekundärbegriff:** Prüfsumme (kann verwendet werden, aber sparsam)

**Regel:** Sekundärbegriff erhält eigenen Eintrag mit Vermerk "Synonym zu Hash-Wert, primär Hash-Wert verwenden"

### 7.3 Widersprüchliche Verwendung in verschiedenen Sections

**Wenn festgestellt wird:**
- Section A verwendet "Abfrage", Section B verwendet "Query"

**Lösungsprozess:**
1. Maintainer entscheidet: Welcher Begriff soll Standard werden?
2. Eintrag in Liste wird angepasst (Status → "Approved")
3. Betroffene Sections werden markiert für Überarbeitung (Phase 6)
4. Nach Überarbeitung: Status "Under Review" → "Approved"

### 7.4 Tool-Wechsel (z.B. AXIOM → X-Ways)

**Vorgehen:**
- Tool-spezifische Begriffe bleiben in Liste (Spalte "Kontext" differenziert: "AXIOM UI" vs. "X-Ways UI")
- Neue Tool-spezifische Begriffe werden ergänzt
- Allgemeine Begriffe (Forensik-Fachbegriffe, Tätigkeitsbegriffe) bleiben gleich

**Beispiel:**
- "Artifacts Explorer" (AXIOM) ≠ "Case Processor" (X-Ways) → Beide in Liste, unterschiedliche Kontexte

---

## 8. Pflege & Maintenance

### 8.1 Quartalsweise Konsolidierung

**Aufgaben:**
- Duplikate entfernen (falls Begriff versehentlich doppelt aufgenommen)
- Kategorien aufräumen (falsch kategorisierte Begriffe korrigieren)
- "Deprecated"-Einträge archivieren (in separates Dokument `terminologie-archiv.md` verschieben)
- Statistik erstellen (Anzahl Begriffe pro Kategorie, Wachstumsrate)

### 8.2 Verantwortlichkeiten

- **KI-Agent:** Schlägt neue Begriffe vor (Status "Proposed"), nutzt Liste konsistent
- **Maintainer:** Genehmigt neue Begriffe, löst Konflikte, führt Konsolidierung durch
- **Reviewer (Phase 4):** Prüft Konsistenz mit Liste

### 8.3 Backup & Archivierung

- **Git-basiert:** Alle Änderungen werden in Git versioniert, volle Historie verfügbar
- **Monatliches Backup:** Liste wird zusätzlich als PDF exportiert (Langzeitarchivierung)
- **Archiv für "Deprecated" Begriffe:** `terminologie-archiv.md` (nur lesend, keine Änderungen)

---

**Ende der Terminologie-Entscheidungsliste (Template)**

---

## Metadaten des Dokuments

**Dateiname:** `terminologie-entscheidungsliste.md`  
**Version:** 1.0.0  
**Erstellt am:** 2025-10-10  
**Letzte Änderung:** 2025-10-10  
**Erstellt von:** Claude Sonnet 4.5 (basierend auf Vorgaben von Max Mustermann)  
**Status:** Template / Living Document  
**Nächste Review:** 2026-01-10 (nach Phase 1 für AXIOM-Projekt)  
**Speicherort:** `terminology/terminologie-entscheidungsliste.md`  
**Git-Repository:** `webassistant-forensics`  
**Verwendung:** Phase 0, 0.5, 1, 3, 4, 6 (siehe Abschnitt 1.3)  
**Tool-Abdeckung:** Aktuell AXIOM Examine v7.0-7.5, erweiterbar für X-Ways, Cellebrite, etc.

---
