## 📊 Validator-Optionen: Detaillierte Gegenüberstellung

### Übersichtstabelle

| #     | Validierungsbereich          | Option A (Basis)        | Option B (Umfassend)                | Entwicklungszeit A | Entwicklungszeit B | Codeumfang A    | Codeumfang B      |
| ----- | ---------------------------- | ----------------------- | ----------------------------------- | ------------------ | ------------------ | --------------- | ----------------- |
| **1** | **JSON-LD Validierung**      | Schema-Struktur prüfen  | Vollständige jsonschema-Validierung | 30 Min             | 2-3h               | ~80 Zeilen      | ~200 Zeilen       |
| **2** | **HTML-Syntax Validierung**  | Basic wellformedness    | HTML5-Validierung mit html5lib      | 30 Min             | 2-3h               | ~60 Zeilen      | ~150 Zeilen       |
| **3** | **BFSG-Konformität**         | Basis-Checks (5 Regeln) | Umfassende A11y-Checks (20+ Regeln) | 1h                 | 4-6h               | ~120 Zeilen     | ~400 Zeilen       |
| **4** | **Link-Validierung**         | Syntax-Prüfung          | Cross-Reference-Validierung         | 30 Min             | 2-3h               | ~70 Zeilen      | ~180 Zeilen       |
| **5** | **Terminologie-Validierung** | Keywords vorhanden?     | Terminologie-Listen-Abgleich        | 20 Min             | 1-2h               | ~40 Zeilen      | ~120 Zeilen       |
| **6** | **Struktur-Validierung**     | —                       | Detail-Level-Hierarchie prüfen      | —                  | 1-2h               | —               | ~100 Zeilen       |
| **7** | **Media-Validierung**        | —                       | Medien-Referenzen prüfen            | —                  | 1h                 | —               | ~80 Zeilen        |
|       | **GESAMT**                   |                         |                                     | **~3h**            | **~14-20h**        | **~370 Zeilen** | **~1.230 Zeilen** |
|       | **Tests**                    | 12-15 Tests             | 40-50 Tests                         | +1h                | +4-6h              | ~400 Zeilen     | ~1.500 Zeilen     |
|       | **GESAMT MIT TESTS**         |                         |                                     | **~4h**            | **~18-26h**        | **~770 Zeilen** | **~2.730 Zeilen** |

---

## 📋 Detaillierte Beschreibung der Validierungsbereiche

### 1. JSON-LD Validierung

#### Option A: Schema-Struktur prüfen

**Umfang:** Die Validierung prüft, ob die grundlegenden JSON-LD-Strukturelemente vorhanden sind und die erwarteten Datentypen aufweisen. Es wird geprüft, ob alle Pflichtfelder existieren (`@context`, `@type`, `identifier`, `name`, `description`, etc.) und ob diese die korrekten Typen haben (String, Array, Object). Die Validierung erkennt fehlende oder falsch typisierte Felder und gibt entsprechende Fehlermeldungen aus.

**Technische Umsetzung:** Implementierung erfolgt mit Python-Standard-Bibliotheken durch rekursives Durchlaufen der JSON-Struktur und Vergleich mit einem definierten Schema-Template. Die Validierung arbeitet mit einfachen Dictionary-Lookups und isinstance()-Checks. Fehlermeldungen werden gesammelt und strukturiert zurückgegeben.

**Aufwand und Wartung:** Die Implementierung ist überschaubar und benötigt etwa 80 Zeilen Code. Die Wartung ist minimal, da sich das JSON-LD-Schema nur bei grundlegenden Änderungen des Datenmodells ändert. Tests sind einfach zu schreiben, da nur definierte Strukturen geprüft werden müssen. Der Performance-Overhead ist vernachlässigbar, da keine externen Bibliotheken oder komplexe Berechnungen erforderlich sind.

#### Option B: Vollständige jsonschema-Validierung

**Umfang:** Die Validierung nutzt das vollständige JSON Schema Draft 2020-12 mit allen erweiterten Features. Neben der Strukturprüfung werden auch Wertebereiche validiert (z.B. `enum`-Constraints für `complexity`-Felder), String-Patterns überprüft (Regex für IDs), Array-Längen kontrolliert (min/maxItems), und Abhängigkeiten zwischen Feldern geprüft (if/then/else-Konstrukte). Die Validierung kann auch verschachtelte Schemas validieren und unterstützt $ref-Auflösung für wiederverwendbare Schema-Komponenten.

**Technische Umsetzung:** Implementierung erfolgt mit der `jsonschema`-Bibliothek (Python-Paket), die eine vollständige Draft 2020-12-Implementierung bietet. Das Schema wird als separate JSON-Datei gepflegt und bei Bedarf geladen. Die Validierung erfolgt mit `jsonschema.validate()` und liefert detaillierte Fehlerberichte mit JSON-Pfaden zu fehlerhaften Elementen. Zusätzliche Custom-Validators können für projektspezifische Regeln implementiert werden.

**Aufwand und Wartung:** Die Implementierung umfasst etwa 200 Zeilen Code, hauptsächlich für Error-Handling, Schema-Loading und Custom-Validators. Die initiale Erstellung des vollständigen JSON-Schemas erfordert zusätzliche Zeit (2-3h). Die Wartung ist aufwändiger, da bei Änderungen am Datenmodell sowohl Code als auch Schema angepasst werden müssen. Tests müssen verschiedene Validierungsszenarien abdecken (valide/invalide Schemas, Edge Cases, Custom Rules). Der Performance-Overhead ist moderat, da jsonschema für große Dokumente rechenintensiv sein kann.

---

### 2. HTML-Syntax Validierung

#### Option A: Basic wellformedness

**Umfang:** Die Validierung prüft grundlegende HTML-Wohlgeformtheit durch Parsing mit `BeautifulSoup` im HTML-Parser-Modus. Es wird erkannt, ob alle öffnenden Tags geschlossen sind, ob die Verschachtelung korrekt ist (keine überlappenden Tags), und ob kritische Syntax-Fehler vorliegen (unescapte Sonderzeichen, fehlende Anführungszeichen). Die Validierung gibt Warnungen bei ungewöhnlichen Konstrukten aus, bricht aber nicht bei kleineren Abweichungen ab.

**Technische Umsetzung:** Implementierung nutzt `BeautifulSoup4` mit dem `html.parser`-Backend. Nach dem Parsing wird geprüft, ob BeautifulSoup Fehler gemeldet hat oder ob das Parsing ohne Warnungen durchlief. Zusätzlich wird die Dokument-Struktur auf grundlegende Elemente geprüft (DOCTYPE, html, head, body-Tags vorhanden). Die Implementierung ist tolerant gegenüber HTML5-Konstrukten.

**Aufwand und Wartung:** Die Implementierung benötigt etwa 60 Zeilen Code, hauptsächlich für Parsing, Error-Collection und Reporting. BeautifulSoup ist bereits eine Dependency (für andere Validierungen), daher keine zusätzlichen Abhängigkeiten. Die Wartung ist minimal, da BeautifulSoup sehr stabil ist. Tests prüfen verschiedene HTML-Konstrukte (valide, malformed, verschachtelt). Der Performance-Overhead ist gering, da BeautifulSoup schnell parst.

#### Option B: HTML5-Validierung mit html5lib

**Umfang:** Die Validierung erfolgt nach vollständigem HTML5-Standard mit `html5lib`, einem Standard-konformen Parser. Es werden alle HTML5-Regeln geprüft: korrekte DOCTYPE-Deklaration, erlaubte Element-Verschachtelungen (z.B. `<p>` darf kein `<div>` enthalten), Pflicht-Attribute (z.B. `alt` bei `<img>`), obsolete oder deprecated Elements/Attributes, und ARIA-Attribute-Konsistenz. Die Validierung erkennt auch subtile Fehler wie falsche Content-Models oder ungültige Attribut-Kombinationen.

**Technische Umsetzung:** Implementierung nutzt `html5lib` mit dem TreeBuilder-Interface. Der Parser wird im strict-Mode betrieben und meldet alle Verstöße gegen HTML5-Spezifikation. Parse-Errors werden strukturiert erfasst und mit Zeilennummern und Kontext versehen. Zusätzlich kann optional der W3C Validator Service per API angebunden werden für vollständige HTML5+CSS-Validierung. Custom Checks können für projektspezifische HTML-Patterns implementiert werden.

**Aufwand und Wartung:** Die Implementierung umfasst etwa 150 Zeilen Code für Parser-Setup, Error-Processing, und Reporting. `html5lib` ist eine zusätzliche Dependency mit eigenen Sub-Dependencies. Die Wartung ist moderat aufwändig, da html5lib gelegentlich Breaking Changes in der API hat. Tests müssen verschiedene HTML5-Konstrukte abdecken (valide HTML5, Edge Cases, deprecated Elements). Der Performance-Overhead ist spürbar, da html5lib langsamer als BeautifulSoup parst (Faktor 3-5x).

---

### 3. BFSG-Konformität (Barrierefreiheit)

#### Option A: Basis-Checks (5 Regeln)

**Umfang:** Die Validierung prüft die fünf kritischsten BFSG-Anforderungen: (1) `lang`-Attribut im `<html>`-Tag vorhanden und korrekt (ISO 639-1), (2) alle Bilder (`<img>`) haben `alt`-Attribut (darf leer sein bei dekorativen Bildern), (3) Formular-Inputs haben zugeordnete Labels (`<label for="...">` oder aria-label), (4) Links haben aussagekräftigen Text (nicht nur "hier" oder "mehr"), (5) Überschriften-Hierarchie ist logisch (`<h1>` → `<h2>` → `<h3>`, keine Sprünge). Diese Checks decken die häufigsten Barrieren ab.

**Technische Umsetzung:** Implementierung erfolgt mit BeautifulSoup durch Suche nach entsprechenden Tags und Prüfung der Attribute. Für Überschriften-Hierarchie wird ein sequenzieller Durchlauf mit Level-Tracking durchgeführt. Link-Text-Prüfung erfolgt mit einfacher Pattern-Matching gegen Blacklist ("hier", "klicken", "mehr"). Die Checks sind pragmatisch und können False Positives haben, sind aber schnell und einfach.

**Aufwand und Wartung:** Die Implementierung benötigt etwa 120 Zeilen Code für die fünf Checks und Reporting. Keine zusätzlichen Dependencies erforderlich. Die Wartung ist minimal, da die BFSG-Grundanforderungen stabil sind. Tests prüfen positive und negative Fälle für jeden Check. Der Performance-Overhead ist minimal, da nur wenige DOM-Traversals erforderlich sind.

#### Option B: Umfassende A11y-Checks (20+ Regeln)

**Umfang:** Die Validierung implementiert über 20 WCAG 2.1 Level AA Regeln und BFSG-spezifische Anforderungen: Alle Basis-Checks aus Option A, plus: Farbkontraste prüfen (mind. 4.5:1 für Text, 3:1 für große Texte), Keyboard-Navigation möglich (tabindex-Reihenfolge logisch, keine Keyboard-Traps), ARIA-Roles korrekt verwendet (keine redundanten Roles, required Properties vorhanden), Tabellen haben korrekte Header-Struktur (`<th>` mit scope), Multimedia hat Alternativen (Video hat Untertitel, Audio hat Transkript), Zeitbasierte Inhalte sind steuerbar, Formulare haben Fehlerbehandlung mit klaren Meldungen, Skip-Links vorhanden, responsive Design für verschiedene Viewport-Größen, keine Autoplay-Elemente, und semantische HTML-Struktur (`<main>`, `<nav>`, `<article>` korrekt verwendet).

**Technische Umsetzung:** Implementierung nutzt eine Kombination aus `BeautifulSoup`, `axe-core` (über Selenium für dynamische Checks), und Custom-Validators. Farbkontrast-Berechnung erfolgt mit `colour-science` oder ähnlicher Library gemäß WCAG-Formel. ARIA-Validierung erfolgt gegen ARIA-in-HTML-Spezifikation. Keyboard-Navigation-Tests erfordern Selenium/Playwright für Browser-basierte Checks. Die Implementierung ist modular aufgebaut mit separaten Validator-Klassen pro WCAG-Kriterium.

**Aufwand und Wartung:** Die Implementierung umfasst etwa 400 Zeilen Code, verteilt auf mehrere Module (Kontrast, ARIA, Keyboard, Struktur). Zusätzliche Dependencies: `selenium`, `axe-selenium-python`, `colour-science`, `playwright` (optional). Die Wartung ist aufwändig, da WCAG regelmäßig aktualisiert wird (2.2 ist aktuell, 3.0 in Entwicklung) und Browser-APIs sich ändern können. Tests müssen viele Szenarien abdecken und sind teilweise Browser-abhängig. Der Performance-Overhead ist erheblich, insbesondere bei Selenium-basierten Checks (mehrere Sekunden pro Section), da ein vollständiger Browser gestartet werden muss.

---

### 4. Link-Validierung

#### Option A: Syntax-Prüfung

**Umfang:** Die Validierung prüft, ob `data-ref`-Attribute syntaktisch korrekt sind: Format entspricht dem Schema (`section-id`, `#heading-id`, oder `section-id#heading-id`), IDs bestehen nur aus erlaubten Zeichen (lowercase, Bindestriche, keine Leerzeichen), keine doppelten Bindestriche oder führenden/trailing Bindestriche, und Links zeigen nicht auf die aktuelle Section selbst (Self-References). Die Validierung prüft nicht, ob die Ziel-Section tatsächlich existiert, sondern nur ob das Format valide ist.

**Technische Umsetzung:** Implementierung erfolgt mit Regex-Patterns für die Syntax-Prüfung. Alle Elemente mit `data-ref`-Attribut werden gefunden (BeautifulSoup), der Wert wird gegen Patterns validiert. Self-References werden durch Vergleich mit der aktuellen Section-ID erkannt. Die Implementierung ist stateless und erfordert keine externe Information außer der aktuellen Section-ID.

**Aufwand und Wartung:** Die Implementierung benötigt etwa 70 Zeilen Code für Pattern-Matching und Error-Reporting. Keine zusätzlichen Dependencies. Die Wartung ist minimal, da die Syntax-Regeln stabil sind. Tests prüfen verschiedene Link-Formate (valide, invalide, Edge Cases). Der Performance-Overhead ist minimal, da nur String-Operations durchgeführt werden.

#### Option B: Cross-Reference-Validierung

**Umfang:** Die Validierung prüft nicht nur Syntax, sondern auch semantische Korrektheit der Links: Ziel-Section existiert in der Gliederung, Ziel-Heading existiert im Ziel-Section-HTML, keine "toten Links" (Links zu gelöschten Sections), keine "broken Fragments" (Links zu nicht-existierenden Headings), Bidirektionale Konsistenz (wenn Section A auf B verweist und umgekehrt, sind beide Links valide), und Warnung bei zirkulären Referenzen (A → B → C → A). Die Validierung benötigt Zugriff auf die gesamte Gliederung und alle Section-HTMLs.

**Technische Umsetzung:** Implementierung nutzt den `GliederungLoader` zum Abruf aller Section-IDs und den `HTMLLoader` zum Laden von Ziel-Section-HTMLs. Für jedes `data-ref` wird geprüft: (1) Section-ID in Gliederung vorhanden? (2) Wenn Fragment (#heading-id): Ziel-HTML laden und nach Heading mit dieser ID suchen. (3) Graph-Traversierung für Zirkularitätsprüfung. Die Implementierung cached geladene HTMLs für Performance. Fehlerberichte enthalten volle Pfade (A → B → C) für bessere Debugging-Erfahrung.

**Aufwand und Wartung:** Die Implementierung umfasst etwa 180 Zeilen Code für Link-Resolution, HTML-Parsing, und Graph-Algorithmen. Dependency zu `GliederungLoader` und `HTMLLoader`. Die Wartung ist moderat, da Änderungen an der Gliederungsstruktur angepasst werden müssen. Tests benötigen Mock-Gliederungen und Mock-HTMLs für verschiedene Szenarien. Der Performance-Overhead ist spürbar, da für jeden Link potenziell ein HTML-File geladen und geparst werden muss (Faktor 10-20x langsamer als Option A).

---

### 5. Terminologie-Validierung

#### Option A: Keywords vorhanden?

**Umfang:** Die Validierung prüft lediglich, ob das JSON-LD `keywords`-Feld existiert und mindestens einen Eintrag hat. Es wird geprüft, ob jeder Keyword-Eintrag die Mindeststruktur hat (`term`, `language`), aber nicht, ob die verwendeten Begriffe in der Terminologie-Entscheidungsliste vorkommen. Die Validierung ist binär: Keywords vorhanden oder nicht vorhanden.

**Technische Umsetzung:** Implementierung erfolgt als einfacher Dictionary-Lookup im JSON-LD. Prüfung auf Existenz des `keywords`-Keys und Array-Länge > 0. Optional: Prüfung der Mindeststruktur jedes Eintrags (term + language vorhanden). Die Implementierung ist trivial und benötigt keine externe Datenquelle.

**Aufwand und Wartung:** Die Implementierung benötigt etwa 40 Zeilen Code. Keine zusätzlichen Dependencies. Die Wartung ist minimal. Tests sind einfach (mit/ohne Keywords). Der Performance-Overhead ist vernachlässigbar.

#### Option B: Terminologie-Listen-Abgleich

**Umfang:** Die Validierung prüft, ob verwendete Fachbegriffe mit der Terminologie-Entscheidungsliste konsistent sind: Jedes Keyword im JSON-LD wird gegen die Liste geprüft, Warnung wenn Begriff nicht in Liste (möglicherweise neuer Begriff, der hinzugefügt werden sollte), Fehler wenn Begriff verwendet wird, der als "deprecated" markiert ist, Vorschlag von Alternativen wenn Synonym existiert (z.B. "Datenquelle" → "Evidenzquelle"), und optional: NLP-basierte Erkennung von Begriffen im Fließtext, die als Keywords fehlen. Die Validierung hilft, Terminologie-Konsistenz über alle Sections hinweg zu wahren.

**Technische Umsetzung:** Implementierung lädt `Terminologie-Entscheidungsliste.md`, parst diese in strukturierte Daten (Dictionary: term → status/alternatives), und vergleicht Keywords im JSON-LD gegen diese Liste. Fuzzy-Matching mit `difflib` oder `fuzzywuzzy` für Tippfehler-Erkennung. Optional: Sentence Embeddings (z.B. Sentence-BERT) für semantische Ähnlichkeit bei Synonym-Erkennung. Fließtext-Analyse mit spaCy oder NLTK für Keyword-Extraktion aus HTML-Content.

**Aufwand und Wartung:** Die Implementierung umfasst etwa 120 Zeilen Code für Parsing, Matching, und Fuzzy-Logic. Zusätzliche Dependencies: `fuzzywuzzy`, optional `sentence-transformers`, `spaCy`. Die Wartung ist moderat, da die Terminologie-Liste regelmäßig erweitert wird und das Parsing angepasst werden muss. Tests benötigen Mock-Terminologie-Listen. Der Performance-Overhead ist moderat (Embedding-basierte Checks können rechenintensiv sein, sollten cached werden).

---

### 6. Struktur-Validierung (nur Option B)

#### Option B: Detail-Level-Hierarchie prüfen

**Umfang:** Die Validierung prüft, ob die Detail-Level-Struktur korrekt implementiert ist: Level-1-Content ist immer sichtbar (keine `class="detail-level-2"` oder höher), Level-2-Content ist in `class="detail-level-2"`-Containern, Level-3-Content ist in `class="detail-level-3"`-Containern, keine verschachtelten Level (Level-3 darf nicht in Level-2 sein, sondern muss parallel), und Toggle-Buttons für Level-2/3 sind korrekt verlinkt (data-target-Attribute zeigen auf korrekte IDs). Die Validierung stellt sicher, dass das Matroschka-Prinzip technisch korrekt umgesetzt ist.

**Technische Umsetzung:** Implementierung durchläuft DOM-Tree mit BeautifulSoup und prüft Klassennamen und Verschachtelungen. Für Toggle-Buttons wird geprüft, ob `data-target`-Attribute auf existierende Element-IDs zeigen. Die Validierung baut eine Hierarchie-Karte auf und prüft auf Regel-Verstöße.

**Aufwand und Wartung:** Die Implementierung benötigt etwa 100 Zeilen Code für DOM-Traversierung und Regel-Checks. Keine zusätzlichen Dependencies. Die Wartung ist minimal, solange das Detail-Level-Konzept stabil bleibt. Tests prüfen verschiedene Hierarchie-Konstrukte. Der Performance-Overhead ist gering.

---

### 7. Media-Validierung (nur Option B)

#### Option B: Medien-Referenzen prüfen

**Umfang:** Die Validierung prüft, ob Media-Referenzen korrekt sind: `<img src>`-Pfade zeigen auf existierende Dateien, `<video src>` / `<source src>`-Pfade zeigen auf existierende Dateien, Media-Dateien haben erlaubte Formate (laut Media-Types-Guide), Media-Dateien sind nicht zu groß (Size-Limits), und `data-media-id`-Referenzen sind im JSON-LD `associatedMedia`-Array vorhanden. Die Validierung verhindert "broken images" und inkonsistente Media-Metadaten.

**Technische Umsetzung:** Implementierung durchsucht HTML nach Media-Elementen (`<img>`, `<video>`, `<audio>`, `<source>`), extrahiert Pfade, und prüft mit `os.path.exists()` ob Dateien existieren. File-Size wird mit `os.path.getsize()` geprüft. Format-Validierung erfolgt gegen Whitelist aus Media-Types-Guide. JSON-LD wird auf Konsistenz mit HTML geprüft.

**Aufwand und Wartung:** Die Implementierung benötigt etwa 80 Zeilen Code. Dependency zu Filesystem-Zugriff. Die Wartung ist minimal, solange Media-Types-Guide stabil bleibt. Tests benötigen Mock-Media-Files. Der Performance-Overhead ist gering (nur Filesystem-Checks).

---

## 🎯 Empfohlener Entwicklungspfad

### Strategie: Inkrementelle Erweiterung

**Phase 1 (heute):** Option A implementieren (~4h mit Tests)

- Sofort produktiv einsetzbar
- Deckt kritische Fehler ab
- Schnelles Feedback im Workflow

**Phase 2 (später):** Option B Schritt für Schritt

- Woche 1: JSON-LD + HTML5-Validierung erweitern
- Woche 2: BFSG umfassend implementieren
- Woche 3: Cross-Reference-Validierung
- Woche 4: Restliche Validierungen

**Vorteil dieser Strategie:**

- Kein Blocker für Phase 1 Workflow
- Lernkurve: Erfahrungen aus ersten Sections fließen in erweiterte Validierung ein
- Ressourcen-schonend: Entwicklung über Zeit verteilt

---

## 📊 Zusammenfassung: Option A vs. B

| Kriterium                          | Option A                 | Option B                 |
| ---------------------------------- | ------------------------ | ------------------------ |
| **Entwicklungszeit (inkl. Tests)** | ~4h                      | ~18-26h                  |
| **Codeumfang**                     | ~770 Zeilen              | ~2.730 Zeilen            |
| **Dependencies**                   | Nur BeautifulSoup        | +5-7 Libraries           |
| **Performance pro Section**        | <1 Sekunde               | 3-10 Sekunden            |
| **Wartungsaufwand**                | Niedrig                  | Mittel-Hoch              |
| **Fehlererkennungsrate**           | ~70-80% kritische Fehler | ~95%+ aller Fehler       |
| **False Positives**                | Selten                   | Gelegentlich             |
| **Einsetzbarkeit**                 | Sofort                   | Nach ausgiebigem Testing |

---

## ✅ Meine Empfehlung

**Start mit Option A**, aus folgenden Gründen:

1. **Zeiteffizienz:** 4h vs. 18-26h - du kannst heute noch mit Phase 1 produktiv arbeiten
2. **Pareto-Prinzip:** Option A deckt 70-80% der kritischen Fehler ab (die 20% wichtigsten Checks)
3. **Iteratives Lernen:** Erste Sections zeigen, welche Validierungen wirklich gebraucht werden
4. **Wartbarkeit:** Einfacher Code ist leichter zu debuggen und anzupassen
5. **Performance:** <1s pro Section vs. 3-10s macht Workflow flüssiger

**Option B später erweitern**, wenn:

- Erste 5-10 Sections erstellt sind und Patterns erkennbar sind
- Spezifische Fehlerquellen identifiziert wurden
- Zeit für ausführliches Testing vorhanden ist


