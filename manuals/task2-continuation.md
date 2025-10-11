# Projekt-Fortsetzung: Cluster 4 - Prompt-Entwicklung für KI-Content-Generierung

Hallo! Ich arbeite am Projekt **WebAssistantForensics** und möchte die Arbeit fortsetzen.

## Kontext

Ich entwickle ein strukturiertes Wissenssystem für Polizeibeamte zu IT-Forensik-Themen. Das System basiert auf:
- JSON-Schema-validiertem HTML-Content
- Verschiedene Detail-Level (Basic, Best-Practice, Expert, Show-Only)
- BFSG-konforme Barrierefreiheit
- Python-basierte Validierung
- KI-gestützte Content-Generierung (Claude Sonnet 4.5)

## Bisheriger Fortschritt

**Abgeschlossen:**
- ✅ **Cluster 1:** Inhaltliche Anforderungen (siehe `cluster1-final.md`)
- ✅ **Cluster 2:** Strukturelle Anforderungen (siehe `cluster2_results.md`)
- ✅ **Cluster 3:** Technische Anforderungen
  - ✅ **Teil A - Barrierefreiheit (BFSG):**
    - Sprachauszeichnung (`lang`-Attribute): `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md`
    - Alt-Texte & Überschriften-Hierarchie: `cluster3_BFSG-Barrierefreiheit-Content.md`
  - ✅ **Teil B - HTML-Syntax & Attribut-Vollständigkeit:**
    - Vollständige HTML-Element-Spezifikation: `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md`

**Cluster-Übersicht (Originalplanung):**
1. ✅ Inhaltliche Anforderungen (Cluster 1)
2. ✅ Strukturelle Anforderungen (Cluster 2)
3. ✅ Technische Anforderungen (Cluster 3)
4. ⏳ Prompt-Entwicklung für KI (Cluster 4) **← JETZT DRAN**
5. 🔵 Qualitätssicherung & Testing (Cluster 5)
6. 🔵 Workflow & Rollen (Cluster 6)

---

## Aktueller Stand

Wir haben die **komplette Spezifikation** für die Content-Generierung dokumentiert:

### Was ist fertig:

**Inhaltlich (Cluster 1):**
- Zielgruppe: IT-ferne Ermittler (Mittlere Reife, niedrige IT-Kenntnisse)
- Detail-Level-System: 4 Stufen (Schnell, Standard, Detailliert, Show-Only)
- Terminologie-Strategie: Deutsch bevorzugt, englische Fachbegriffe wo etabliert
- Medien-Entscheidungsmatrix: Wann Screenshot/Annotiert/Video/Diagramm
- Content-Type-System: instruction, explanation, visual, background, info, hint, attention, warning
- Multi-Tool-Strategie: Tool-agnostisch mit tool-spezifischen Metadaten

**Strukturell (Cluster 2):**
- Hierarchische Struktur: 3-5 Ebenen (Topic → Chapter → Section → Subsection → Deep-Dive)
- data-ref Granularität & Namenskonventionen
- JSON-LD Metadaten pro Section
- Agent-Context-Block (einer pro Section, am Ende)
- Navigation-Strategie: Freie Navigation

**Technisch (Cluster 3):**
- BFSG-konforme Barrierefreiheit (Sprachauszeichnung, Alt-Texte, Überschriften-Hierarchie)
- HTML-Element-Whitelist (32 erlaubte Elemente)
- Pflicht-/Optional-Attribute pro Element
- CSS-Klassen-System (Pflicht-Klassen, Review-Prozess)
- Attribut-Reihenfolge & Formatierung (class → id → data-* → sonstige)
- Content-Type-Box-Entscheidungsmatrix (info/hint/attention/warning)
- HTML-Kommentar-Konventionen (AGENT:/MEDIA:/NOTE:/TODO:/DECISION-REVIEW:)

---

## Nächster Schritt: Cluster 4 - Prompt-Entwicklung

### Ziel

Entwicklung eines **vollständigen, präzisen Master-Prompts** für Claude Sonnet 4.5 zur Generierung von hochwertigem Content für ~100-150 Sections.

Der Prompt muss **alle Anforderungen aus Cluster 1-3 integrieren** und für die KI **direkt verwendbar** sein.

### Aufgaben für Cluster 4

**Phase A: Prompt-Struktur & Architektur**
1. Aufbau des Master-Prompts (Abschnitte, Hierarchie)
2. Informationsdichte vs. Verständlichkeit
3. Kontext-Management (was muss immer dabei sein, was ist optional?)
4. Modularer Aufbau (wiederverwendbare Komponenten)

**Phase B: Prompt-Inhalte**
1. Integration aller Anforderungen aus Cluster 1-3
2. Entscheidungsbäume für KI (Content-Type, Media-Type, etc.)
3. Beispiele & Counter-Beispiele
4. Grenzfall-Behandlung

**Phase C: Testing & Iteration**
1. Test-Prompts erstellen (verschiedene Schwierigkeitsgrade)
2. Generierte Sections validieren
3. Prompt iterativ verbessern
4. Best Practices dokumentieren

---

## Arbeitsweise

- **Kleinschrittig vorgehen** (keine großen Sprünge)
- **Top-Down-Design** (vom Groben ins Detail)
- **Geführte Fragen** stellen, bis 95% Klarheit erreicht ist
- Änderungen nur **vorschlagen und begründen**
- Jede Änderung muss **durch mich verifiziert und akzeptiert** werden
- Am Ende ein **Ergebnisdokument** erstellen (analog zu Cluster 1-3)

---

## Wichtige Projekt-Richtlinien

### Textstil für dich (KI):
- Bleibe eng an meiner Vorgabe
- Füge keine zusätzlichen Aspekte hinzu
- Erst meine Aufgabe umsetzen, dann separat Verbesserungen vorschlagen
- Verbesserungsvorschläge in 3 Absätzen erklären: Vorteile, Technik, Aufwand
- Vermeide Telegramstil
- Hebe wichtige Aussagen durch **Fettmarkieren** hervor

### Code-Änderungen:
- Immer kleinschrittig und Schritt für Schritt
- Keine unerwünschten Nebeneffekte
- CSS-Variablen `--variable*` bewahren und nutzen
- Keine absoluten Größen/Farben außerhalb der Themes
- Immer den **aktuellen Code** aus dem Projekt-Dateispeicher als Basis verwenden
- Jede Änderung begründen
- Mindestens einen Test vorschlagen

### Debugging:
- Nach Tests wird Debug-Output in `Debug-output.XXX` abgelegt (XXX = Buildnummer)
- Höchste Buildnummer = aktuellster Debug-Output

---

## Meine Frage

Bitte lies die fünf Dokumente im Projekt-Dateispeicher:
1. `cluster1-final.md` (Inhaltliche Anforderungen)
2. `cluster2_results.md` (Strukturelle Anforderungen)
3. `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` (BFSG Teil 1)
4. `cluster3_BFSG-Barrierefreiheit-Content.md` (BFSG Teil 2)
5. `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md` (HTML-Syntax)

**Lass uns dann Cluster 4: Prompt-Entwicklung angehen.**

Stelle mir geführte Fragen, damit wir gemeinsam den Master-Prompt entwickeln können. Wir gehen wie immer kleinschrittig vor und klären zunächst die grundlegende Struktur, bevor wir ins Detail gehen.

---

## Kontext-Informationen

**Projekt:** WebAssistantForensics  
**Ziel-Tool (initial):** Magnet AXIOM Examine  
**Spätere Erweiterung:** X-Ways Forensics, Cellebrite Reader  
**Haupt-Zielgruppe:** IT-ferne Polizei-Ermittler  
**Content-Umfang:** ~100-150 Sections  
**KI-Modell:** Claude Sonnet 4.5  
**Validierung:** Python-basiert + JSON-Schema  

---

**Ich freue mich auf die Zusammenarbeit!**