# Continuation Prompt: Phase 0.5 - Prompt-Entwicklung für Gesamtgliederung

**Projekt:** WebAssistant Forensics - AXIOM Examine Guide  
**Aktueller Stand:** Phase 0 abgeschlossen, Phase 0.5 steht an  
**Deine Aufgabe:** Entwickle einen Prompt für die KI in Phase 0.5 (Gesamtgliederung erstellen)  
**Datum:** 2025-10-11

---

## 1. Projekt-Kontext

### 1.1 Überblick

**WebAssistant Forensics** erstellt interaktive, webbasierte Schulungshandbücher für forensische Software. Der erste Prototyp fokussiert auf **Magnet AXIOM Examine (v7.0-7.5)** für **IT-ferne Polizei-Ermittler** (Mittlere Reife, niedrige IT-Kenntnisse).

**Workflow:** 9 Phasen (0 → 0.5 → 1-8)

- **Phase 0 (abgeschlossen):** Strategiedokument erstellt
- **Phase 0.5 (aktuell):** Gesamtgliederung erstellen (Topics → Chapters → Sections)
- **Phase 1-8:** Section-Erstellung, Validierung, Medien, Review, Publishing

### 1.2 Akteure

- **Maintainer (du):** Definiert Strategie, prüft Outputs, genehmigt Gliederung
- **KI-System (ich, jetzt):** Entwickelt Prompt für Phase 0.5
- **KI-System (Phase 0.5, später):** Erstellt Gesamtgliederung basierend auf unserem Prompt
- **KI-System (Phase 1, später):** Erstellt Section-Drafts basierend auf Gliederung

---

## 2. Aktueller Projektstand

### 2.1 Was ist fertig?

✅ **Strategiedokument:** `Strategiedokument Beispiel_ AXIOM Examine.md` (Version 1.0.1, approved)

- Definiert 3 Topics: Vorbereitung & Case-Setup, Export & Reporting, Troubleshooting
- Ca. 50-60 Sections geplant
- Lernziele, Terminologie-Strategie, Medien-Strategie definiert

✅ **Template:** `strategy_document_template.md` (mit Abschnitten 1-15)

✅ **Terminologie-Liste:** `terminologie-entscheidungsliste.md` (10 Startwerte)

✅ **Cluster-Dokumente:** 7 Dokumente mit technischen/inhaltlichen Anforderungen (siehe Abschnitt 3)

### 2.2 Was fehlt?

❌ **Prompt für Phase 0.5:** Du sollst diesen entwickeln (siehe Abschnitt 4)
❌ **Output-Format für Gliederung:** Markdown-Schema muss noch definiert werden
❌ **Qualitätskriterien für Gliederung:** Muss noch festgelegt werden
❌ **Template für Phase 1:** Wird später benötigt (nicht jetzt)

---

## 3. Relevante Dokumente (zu laden & verstehen)

### 3.1 Checkliste: Dokumente gelesen?

**Pflicht-Dokumente (unbedingt lesen):**

- ☐ `Strategiedokument Beispiel_ AXIOM Examine.md` – Basis für Phase 0.5
- ☐ `strategy_document_template.md` – Struktur und Feldtypen verstehen
- ☐ `cluster5_Workflow-Rollen.md` – 9-Phasen-Workflow, Phase 0.5 im Detail
- ☐ `Cluster 1 - Inhaltliche Anforderungen (Abgeschlossen).md` – Zielgruppe, Detail-Level, Terminologie

**Empfohlene Dokumente (erhöhen Verständnis):**

- ☐ `terminologie-entscheidungsliste.md` – Begriffskonsistenz
- ☐ `cluster2_Strukturelle-Anforderungen.md` – Hierarchie, data-ref-System
- ☐ `cluster3_Phase-B_HTML-Syntax-und-Attribut-Vollständigkeit.md` – HTML-Element-Whitelist
- ☐ `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md` – Barrierefreiheit
- ☐ `cluster4_Qualitätssicherung-Metadaten-Validierung.md` – Validierungskriterien
- ☐ `media-types-guide.md` – Medien-Typen (aktuell Version 1.0, wird noch aktualisiert)

**Hinweis:** Nutze `project_knowledge_search` zum Laden der Dokumente.

---

## 4. Deine Aufgabe: Prompt für Phase 0.5 entwickeln

### 4.1 Was ist Phase 0.5?

**Input:** Strategiedokument (fertig, approved)  
**Aufgabe:** Erstelle vollständige Inhaltsstruktur (Gesamtgliederung)  
**Output:** Markdown-Dokument mit hierarchischer Struktur:

- Topics (3 Stück: Vorbereitung, Export, Troubleshooting)
- Chapters (pro Topic 3-6 Stück)
- Sections (50-60 gesamt)

**Pro Section wird benötigt:**

- Titel (z.B. "axiom-case-creation")
- Lernziel (z.B. "Ermittler kann eigenständig Fall anlegen")
- Key Topics (3-5 Stichpunkte: Was wird behandelt?)
- Kurzbeschreibung (2-3 Sätze)
- Geschätzte Komplexität (Einfach / Standard / Komplex)
- Geschätzte Medien (z.B. "3 Screenshots, 1 Video")

### 4.2 Dein konkretes Ziel

**Du sollst NICHT die Gliederung selbst erstellen**, sondern einen **Prompt entwickeln**, der eine andere KI-Instanz (Phase 0.5) instruiert, diese Gliederung zu erstellen.

**Der Prompt muss enthalten:**

1. Klare Aufgabenbeschreibung für Phase 0.5-KI
2. Referenz auf Strategiedokument (welche Abschnitte besonders wichtig?)
3. Output-Format-Definition (Markdown-Schema)
4. Qualitätskriterien (Woran erkennt man eine gute Gliederung?)
5. Beispiele (z.B. 1-2 Beispiel-Sections)

### 4.3 Herausforderungen

**1. Output-Format definieren:**

- Markdown mit hierarchischer Struktur (Topics → Chapters → Sections)
- **Maschinell verarbeitbar:** Sections müssen einzeln extrahierbar sein (für Phase 1)
- **Warum wichtig?** In Phase 1 erhält die KI: 2 vorherige Sections + aktuelle Section + 2 folgende Sections (Kontext)

**2. Qualitätskriterien festlegen:**

- Was macht eine gute Gliederung aus?
- Wie detailliert sollen Section-Beschreibungen sein?
- Wann ist eine Section "zu groß" oder "zu klein"?

**3. Balance finden:**

- Prompt muss präzise sein (klare Anweisungen)
- Aber nicht zu rigide (KI braucht Gestaltungsfreiheit)

### 4.4 Was du NICHT tun sollst

❌ Die Gliederung selbst erstellen (das macht Phase 0.5-KI)  
❌ Section-Drafts schreiben (das macht Phase 1-KI)  
❌ Template für Phase 1 entwickeln (kommt später)  
❌ Alleingänge unternehmen (alle Änderungen mit Maintainer absprechen)

---

## 5. Erwartete Arbeitsweise

### 5.1 Schritt 1: Wissenslücken schließen

**Aufgabe:** Lade alle Pflicht-Dokumente (Abschnitt 3.1) und verstehe:

- Was ist das Projekt-Ziel?
- Was wurde in Phase 0 entschieden?
- Was soll Phase 0.5 liefern?
- Wie läuft der Gesamtworkflow (9 Phasen)?

**Output:** Kurze Zusammenfassung deines Verständnisses (3-5 Sätze pro Dokument)

### 5.2 Schritt 2: Offene Fragen identifizieren

**Aufgabe:** Identifiziere, wo du noch Wissenslücken hast:

- Ist dir das Output-Format klar? (Markdown-Schema für Gliederung)
- Verstehst du, wie Sections in Phase 1 verarbeitet werden?
- Kennst du Qualitätskriterien für eine gute Gliederung?

**Output:** Liste mit 3-10 konkreten Fragen an Maintainer

### 5.3 Schritt 3: Geführte Fragen stellen

**Wichtig:** Stelle **strukturierte Fragen** mit Kontext und Vorschlägen.

**Beispiel für gute geführte Frage:**

> "Für die Section-Beschreibungen wäre es sinnvoll, auch **Vorgänger- und Nachfolger-Sections** zu benennen, da sich so die logische Abfolge nahtlos ergibt. Beispiel: Section 'axiom-case-creation' → Vorgänger: 'axiom-installation', Nachfolger: 'axiom-evidence-sources'. Sollen wir das so umsetzen? Oder müssen wir noch andere Metadaten berücksichtigen (z.B. Abhängigkeiten, Voraussetzungen)?"

**Nicht gut wäre:**

> "Wie soll das Output-Format aussehen?" (zu vage, keine Vorschläge)

### 5.4 Schritt 4: Vorschläge evaluieren

**Aufgabe:** Entwickle **konkrete Vorschläge** für:

1. Markdown-Schema für Gliederung (mit Beispiel)
2. Qualitätskriterien für Gliederung (3-5 Kriterien)
3. Struktur des Phase-0.5-Prompts (Gliederung mit Abschnitten)

**Für jeden Vorschlag:**

- **Begründung:** Warum ist das sinnvoll?
- **Auswirkungen:** Was ändert sich dadurch?
- **Alternativen:** Welche anderen Optionen gibt es?

**Output:** 3 ausgearbeitete Vorschläge zur Diskussion

### 5.5 Schritt 5: Prompt erstellen (nach Freigabe)

**Erst nach Maintainer-Freigabe:**

- Erstelle den finalen Prompt für Phase 0.5
- Länge: Ca. 2000-3000 Wörter
- Format: Markdown oder strukturierter Text
- Mit Beispielen und Checkliste

---

## 6. Phase 0.5 im Gesamtkontext

### 6.1 Warum ist Phase 0.5 wichtig?

**Kritischer Erfolgsfaktor:** Die Gliederung ist die **Blaupause für alle 50-60 Sections**.

- Fehler hier multiplizieren sich in Phase 1 (50-60x)
- Nachträgliche Änderungen sehr aufwändig (alle Sections betroffen)
- Maintainer muss Gliederung verstehen und genehmigen (2-3 Iterationen erwartet)

**Ohne gute Gliederung:**

- Phase 1 produziert inkonsistente Sections
- Überschneidungen oder Lücken im Inhalt
- Struktur wirkt chaotisch, nicht durchdacht

### 6.2 Einbettung in 9-Phasen-Workflow

```
Phase 0 (Strategie) ✅
    ↓
Phase 0.5 (Gliederung) ← DU BIST HIER (Prompt entwickeln)
    ↓
Phase 1 (Section-Drafts) ← Nutzt Gliederung als Input
    ↓
Phase 2-3 (Validierung)
    ↓
Phase 4 (Semantic Review)
    ↓
Phase 5-8 (Medien, Enrichment, Review, Publishing)
```

**Phase 0.5 ist Scharnier zwischen Strategie und Umsetzung:**

- Übersetzt abstrakte Lernziele → konkrete Sections
- Definiert Umfang präzise (50-60 Sections, nicht 100, nicht 30)
- Legt Reihenfolge fest (didaktisch sinnvoll)

### 6.3 Qualitätsanforderungen

**Maintainer erwartet:**

- **Vollständigkeit:** Alle Topics aus Strategiedokument abgedeckt
- **Balance:** Nicht zu viele, nicht zu wenige Sections pro Topic
- **Klarheit:** Jede Section hat klares Lernziel, keine Überschneidungen
- **Praktikabilität:** Sections sind in Phase 1 umsetzbar (nicht zu groß, nicht zu klein)

**2-3 Iterationen normal:**

- Iteration 1: Grobe Struktur, Maintainer gibt Feedback
- Iteration 2: Verfeinert, einige Sections aufgeteilt/zusammengelegt
- Iteration 3: Final, Maintainer approved

---

## 7. Zusammenfassung & Checkliste

### 7.1 Deine Aufgabe in einem Satz

**Entwickle einen Prompt, der eine KI in Phase 0.5 befähigt, eine vollständige, hochwertige Gesamtgliederung (50-60 Sections) für das AXIOM-Handbuch zu erstellen.**

### 7.2 Arbeits-Checkliste

**Vor dem Start:**

- ☐ Alle Pflicht-Dokumente gelesen? (Abschnitt 3.1)
- ☐ Phase 0.5 Aufgabe verstanden? (Abschnitt 4)
- ☐ Arbeitsweise klar? (Abschnitt 5)

**Schritt 1: Wissen aufbauen**

- ☐ Strategiedokument AXIOM analysiert (Topics, Lernziele, Umfang)
- ☐ Cluster-Dokumente konsultiert (Workflow, Hierarchie, Qualität)
- ☐ Verständnis zusammengefasst (kurze Übersicht für Maintainer)

**Schritt 2: Lücken identifizieren**

- ☐ Output-Format unklar? → Frage stellen
- ☐ Qualitätskriterien unklar? → Frage stellen
- ☐ Section-Metadaten unklar? → Frage stellen

**Schritt 3: Vorschläge entwickeln**

- ☐ Markdown-Schema entworfen (mit Beispiel)
- ☐ Qualitätskriterien definiert (3-5 Punkte)
- ☐ Prompt-Struktur skizziert (Abschnitte benannt)
- ☐ Jeder Vorschlag begründet + Auswirkungen analysiert

**Schritt 4: Diskussion & Iteration**

- ☐ Vorschläge präsentiert (geführte Fragen)
- ☐ Maintainer-Feedback verarbeitet
- ☐ Anpassungen vorgenommen

**Schritt 5: Finalisierung**

- ☐ Prompt erstellt (2000-3000 Wörter)
- ☐ Beispiele eingefügt (1-2 Beispiel-Sections)
- ☐ Checkliste für Phase 0.5-KI erstellt
- ☐ Maintainer-Approval eingeholt

---

## 8. Wichtige Prinzipien

### 8.1 Arbeitsweise

✅ **Kleinschrittig vorgehen** – keine großen Alleingänge  
✅ **Enge Abstimmung** – jede Änderung mit Maintainer besprechen  
✅ **Begründungen liefern** – "Warum ist das so?" immer beantworten  
✅ **Alternativen aufzeigen** – nicht nur eine Lösung, sondern Optionen  
✅ **Checklisten nutzen** – strukturierte Arbeitsweise sicherstellen

### 8.2 Kommunikationsstil

✅ **Geführte Fragen** – Vorschläge mit Fragen kombinieren  
✅ **Konkrete Beispiele** – abstrakte Konzepte mit Beispielen erklären  
✅ **Auswirkungen benennen** – "Wenn wir X machen, bedeutet das Y"  
✅ **Transparenz** – Unsicherheiten klar benennen ("Ich bin mir nicht sicher bei...")

### 8.3 Qualitätsanspruch

✅ **Präzise Sprache** – keine schwammigen Formulierungen  
✅ **Vollständigkeit** – alle relevanten Aspekte berücksichtigen  
✅ **Nachvollziehbarkeit** – Entscheidungen dokumentieren  
✅ **Wiederverwendbarkeit** – Lösungen sollen für X-Ways, Cellebrite etc. adaptierbar sein

---

## 9. Start-Anweisung

**Beginne jetzt mit Schritt 1:**

1. Lade die Pflicht-Dokumente aus Abschnitt 3.1
2. Fasse dein Verständnis kurz zusammen (Was ist das Projekt? Was ist Phase 0.5?)
3. Identifiziere Wissenslücken und stelle geführte Fragen

**Viel Erfolg!** 🚀
