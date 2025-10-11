# Projekt-Fortsetzung: Cluster 3 - Technische Anforderungen (Phase B)

Hallo! Ich arbeite am Projekt **WebAssistantForensics** und möchte die Arbeit an **Cluster 3 (Technische Anforderungen)** fortsetzen.

## Kontext

Ich entwickle ein strukturiertes Wissenssystem für Polizeibeamte zu IT-Forensik-Themen. Das System basiert auf:
- JSON-Schema-validiertem HTML-Content
- Verschiedene Detail-Level (Basic, Best-Practice, Expert)
- BFSG-konforme Barrierefreiheit
- Python-basierte Validierung

## Bisheriger Fortschritt

**Abgeschlossen:**
- ✅ **Cluster 1:** Inhaltliche Anforderungen (siehe `cluster1-final.md`)
- ✅ **Cluster 2:** Strukturelle Anforderungen (siehe `cluster2_results.md`)
- ✅ **Cluster 3 - Teil A (Barrierefreiheit):**
  - Sprachauszeichnung (`lang`-Attribute): `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md`
  - Alt-Texte & Überschriften-Hierarchie: `cluster3_BFSG-Barrierefreiheit-Content.md`

**Cluster 3 - Roadmap (Original):**
1. Medien-Anweisungen ✅ (bereits in Cluster 2 geklärt)
2. Agent-Integration 🔵 (bewusst ausgeklammert, wird separat behandelt)
3. Barrierefreiheit (BFSG) ✅ (zwei Dokumente erstellt)
4. HTML-Syntax und Attribut-Vollständigkeit ❌ (jetzt dran)

## Aktueller Stand

Wir haben die **Barrierefreiheit (BFSG)** vollständig dokumentiert. Jetzt fehlt noch:

### **Phase B: HTML-Syntax & Attribut-Vollständigkeit**

Folgende Punkte müssen geklärt werden:

1. **Pflicht-/Optional-Attribute pro HTML-Element**
   - Welche Attribute sind zwingend für `<section>`, `<h1>`-`<h6>`, `<img>`, `<video>`, `<table>`, etc.?
   - Welche sind optional?

2. **Vollständige Element-Spezifikation**
   - Für alle erlaubten HTML-Elemente aus der Whitelist
   - Beispiel: Muss jedes `<img>` ein `data-media-type` haben?

3. **Attribut-Reihenfolge & Formatierung**
   - Gibt es eine bevorzugte Reihenfolge? (z.B. `id` → `class` → `data-*` → sonstige)

4. **JSON-LD Metadaten finalisieren**
   - Welche Felder sind Pflicht vs. optional?
   - Soll die KI `estimatedTime` berechnen? `difficultyLevel` einschätzen?

5. **Agent-Context-Block-Struktur**
   - Welche Attribute sind Pflicht (`data-ref`, `data-context-id`)?
   - Soll der Block leer bleiben oder Platzhalter-Content enthalten?

## Arbeitsweise

- **Kleinschrittig vorgehen** (keine großen Sprünge)
- **Top-Down-Design** (vom Groben ins Detail)
- Codeänderungen nur **vorschlagen und begründen**
- Jede Änderung muss **durch mich verifiziert und akzeptiert** werden
- **Geführte Fragen** stellen, bis 95% Klarheit erreicht ist
- Am Ende ein **Ergebnisdokument** erstellen (analog zu Cluster 1 und 2)

## Meine Frage

Bitte lies die vier Dokumente im Projekt-Dateispeicher (`cluster1-final.md`, `cluster2_results.md`, `cluster3_BFSG-Sprachauszeichnung-Richtlinien.md`, `cluster3_BFSG-Barrierefreiheit-Content.md`), um den Kontext zu verstehen.

Lass uns dann **Phase B: HTML-Syntax & Attribut-Vollständigkeit** angehen. Ich schlage vor, wir starten mit den **wichtigsten HTML-Elementen** (`<section>`, `<h1>`-`<h6>`, `<img>`, `<video>`, `<table>`) und definieren deren Pflicht-/Optional-Attribute.

Wie würdest du vorgehen? Stelle mir geführte Fragen, damit wir gemeinsam die Spezifikation entwickeln können.
