# Prompt-Entwicklung: Interaktives Handbuch für Forensik-Software
## Cluster 1: Inhaltliche Anforderungen (ABGESCHLOSSEN)

**Projekt:** WebAssistantForensics - Content-Generierung mit KI  
**Datum:** 08. Oktober 2025  
**Status:** Cluster 1 finalisiert, bereit für Cluster 2  
**Bearbeitungszeit:** ~2 Stunden von geplanten 12 Stunden

---

## Projektziel

Entwicklung eines umfassenden, präzisen Prompts für KI (Sonnet 4.5) zur Generierung von hochwertigem Content für ein interaktives Handbuch zur forensischen Software **Magnet Axiom Examine**. Das System soll später auf weitere Tools (X-Ways Forensics, Cellebrite Reader) ausgeweitet werden.

---

## 1.1 Zielgruppe und Verständlichkeitsniveau

### Primäre Zielgruppe
- **IT-ferne Ermittler:innen** (Hauptadressaten)
- Bildungsniveau: Mittlere Reife
- Sprachliche Kompetenz: teilweise eingeschränkt
- Leseverstehen: teilweise herausfordernd
- IT-Kenntnisse: sehr niedrig (keine akademische IT-Ausbildung vorausgesetzt)

### Sekundäre Zielgruppe
- **Fortgeschrittene Ermittler:innen** (Detail-Level 3)
- Kenntnisse deutlich unter Bachelor-Niveau IT/Forensik
- Kein Gesellenniveau vorausgesetzt

### Konsequenzen für Content-Generierung
- Einfache, klare Sprache (keine Fachsprache ohne Erklärung)
- Kurze Sätze
- Viel Hilfestellung und Schritt-für-Schritt-Anweisungen
- Komplexität bewusst niedrig halten
- Tipps und Durchführungsanweisungen priorisieren

### Tonalität
**Subtil-unterstützend, aber sachlich**

✅ **Erlaubt:**
- "Dieser Schritt erfordert besondere Sorgfalt."
- "Der Export wurde erfolgreich erstellt."
- "Hinweis: Diese Einstellung kann nicht rückgängig gemacht werden."

❌ **Nicht erlaubt:**
- "Super gemacht!", "Sie schaffen das!", "Toll!"
- Zu motivierend-ermunternde Sprache
- Infantilisierende Ausdrücke

---

## 1.2 Detail-Level-System (4 Stufen)

### Level 1: Schnellübersicht
- **Zielgruppe:** Erfahrene Anwender, die schnellen Überblick benötigen
- **Inhalt:** Grober Ablauf, Richtung vorgeben
- **Voraussetzung:** Anwender kann sich selbst zurechtfinden
- **Umfang:** Minimal, nur Kernschritte
- **Abgrenzung:** "Was muss ich tun?" (Nur Aktionen)

### Level 2: Best-Practice (Standard)
- **Zielgruppe:** Normale Anwender (Hauptzielgruppe)
- **Inhalt:** Best-Practice-Einstellungen und Verfahren, die fast immer passen
- **Umfang:** Vollständige Anleitung, aber fokussiert auf häufigste Szenarien
- **Abgrenzung:** "Wie mache ich es richtig?" (Best-Practice mit Begründung)

### Level 3: Detailliert (Experten)
- **Zielgruppe:** Fortgeschrittene Anwender
- **Inhalt:** 
  - Alle Einstellmöglichkeiten einer Maske erläutert
  - Kurze Hintergründe
  - Erweiterte Tipps
  - Edge Cases
- **Umfang:** Vollständig und umfassend
- **Abgrenzung:** "Warum ist das so, und was sind Alternativen?" (Tiefes Verständnis)

### Level 4: "Don't tell; just show" (Show-Only-Mode)
- **Zielgruppe:** Anwender, die nur praktische Schritte sehen wollen
- **Inhalt:**
  - Nur `data-content-type="instruction"` (Schritt-für-Schritt)
  - Nur `data-content-type="visual"` (Screenshots, Videos)
  - KEINE `data-content-type="explanation"` (Erklärungen)
  - KEINE `data-content-type="background"` (Hintergrundinformationen)
- **Umfang:** Minimalistisch, nur Handlungsanweisungen
- **Abgrenzung:** "Zeig mir nur die Schritte!" (Keine Worte, nur Taten)

**Referenz:** [v07-show-only-mode.md](https://raw.githubusercontent.com/froiloc/WebAssistantForensics/refs/heads/master/manuals/v07-show-only-mode.md)

---

## 1.3 Terminologie und Konsistenz

### Glossar-Integration
- Glossar ist in Entwicklung, aber noch nicht vorhanden
- **KI-Aufgabe:** Prüfen, ob Begriffe konsistent verwendet werden
- **Strategie:** KI entwickelt eigene **Terminologie-Entscheidungsliste** während der Content-Erstellung
- Spätere Integration mit Glossar-Modul

### Konsistenz-Anforderungen
- Gleicher Begriff = gleiche Bedeutung über alle Sections
- Deutsche vs. englische Begriffe: Konsistente Handhabung
- Axiom-spezifische Terminologie korrekt übernehmen

---

## 1.7 Mehrsprachigkeit und Begriffswahl

### Deutsche Fachbegriffe verwenden, wenn:
- Ein geläufiger deutscher Begriff existiert
  - **Beispiel:** Query → **Abfrage**
- Der Begriff im allgemeinen Sprachgebrauch etabliert ist

### Englische Fachbegriffe beibehalten, wenn:
- Kein etablierter deutscher Begriff existiert
  - **Beispiel:** **E-Mail** (nicht "elektronischer Brief")
- Software-spezifische UI-Elemente
  - **Beispiel:** **Artifacts Explorer**
- Etablierte IT-Fachbegriffe
  - **Beispiel:** Cache, Log-Files

### Terminologie-Entscheidungsliste

**KI führt während Content-Erstellung eine Liste:**

| Begriff (Original) | Entscheidung | Begründung |
|-------------------|--------------|------------|
| Query | Abfrage (dt.) | Geläufiger deutscher Begriff existiert |
| E-Mail | E-Mail (engl.) | Etabliert, keine sinnvolle deutsche Alternative |
| Artifacts Explorer | Artifacts Explorer (engl.) | Software-spezifisches UI-Element |
| Cache | Cache (engl.) | Etablierter IT-Fachbegriff |

### Glossar-Verknüpfung
- Englische Fachbegriffe erhalten **erklärende deutsche Übersetzung** im Glossar
- KI muss **nicht inline erklären**, da Glossar dies übernimmt
- Konsistente Verwendung über alle Sections hinweg

---

## 1.4 Fachliche Korrektheit

### Qualitätssicherung
- Alle Texte werden durch erfahrenen, kritischen Forensiker gegengeprüft
- Einzelfreigabe jeder Section erforderlich
- **Keine groben Fehler oder Fahrlässigkeiten** toleriert

### Quellen-Anforderungen
- **Primärquelle:** Offizielles Axiom-Handbuch
- **Weitere Quellen:** Zu definierende Links und Materialien
- **Versionsinformationen müssen in Metadaten** erfasst werden

---

## 1.5 Vollständigkeit

### Scope
- **Initial:** Wichtige Aspekte für forensische Arbeit mit Magnet Axiom Examine (aktuelle Version)
- **Geschätzter Umfang:** 100-150 Sections

### Vollständigkeit innerhalb Detail-Level
- Jedes Level muss in sich vollständig sein
- Keine Lücken, die zum Scheitern führen könnten

### Langfristige Wartung
- Content wird **zyklisch aktualisiert** (neue Features, Änderungen)
- Anwendung wird **dauerhaft betreut**

---

## 1.6 Axiom-Versionierung und Metadaten

### Metadaten-System (V11 - Content-Metadaten-System)
- Versionsinformationen **nicht im sichtbaren Text**
- Metadaten-Ansicht bei Interesse verfügbar
- Zu erfassende Metadaten:
  - Quellen und deren Version/Stand
  - Prompt-Version (Nummerierung)
  - Erstellungsdatum
  - Letzte Aktualisierung
  - Axiom-Version, auf die sich Content bezieht

**Dokumentation:** V11 - Content-Metadaten-System (Vollständig).md

---

## 1.8 Multi-Tool-Strategie

### Wichtige Erkenntnis
- Axiom ist **eines von mehreren Werkzeugen**
- Weitere geplant: X-Ways Forensics, Cellebrite Reader, andere

### Konsequenzen für Content-Struktur
- Metadaten müssen **tool-spezifisch** sein (nicht nur Version, sondern auch Tool-Name)
- Terminologie kann **tool-übergreifend** konsistent sein
- Schema muss **tool-agnostisch** sein (wiederverwendbar)

### Neue Metadaten-Felder erforderlich
```json
{
  "metadata": {
    "tool": "Magnet Axiom Examine",
    "toolVersion": "7.x",
    "sources": [...],
    "created": "...",
    "promptVersion": "..."
  }
}
```

### Tool-Konzepte
- **Fokus:** Anwendungsorientiert
- Konzepte können redundant an mehreren Stellen erklärt werden
- KI muss nicht zwischen tool-spezifisch und tool-übergreifend unterscheiden

---

## 1.9 Medien-Präzisionsgrad und Entscheidungsmatrix

### Leitprinzip
**Schnellste Wissensübermittlung bei minimalem kognitiven Aufwand**

### Entscheidungsbaum

```
START: Muss visuell unterstützt werden?
│
├─ NEIN → Kein Medium
│
└─ JA → Weiter
    │
    ├─ Ist es ein EINZELNER UI-ELEMENT-ZUSTAND?
    │  (z.B. "Button X ist hier")
    │  └─ JA → EINFACHER SCREENSHOT (Variante B)
    │
    ├─ Ist es eine KOMPLEXE UI mit mehreren relevanten Bereichen?
    │  (z.B. "Diese 3 Einstellungen müssen geprüft werden")
    │  └─ JA → ANNOTIERTER SCREENSHOT (Variante C)
    │
    ├─ Ist es eine ABFOLGE VON SCHRITTEN in der UI?
    │  (z.B. "Menü öffnen → Option wählen → Dialog bestätigen")
    │  └─ JA → Prüfe Komplexität:
    │      ├─ 2-3 einfache Schritte → ANNOTIERTER SCREENSHOT
    │      └─ 4+ Schritte ODER zeitkritisch → VIDEO (15-30 Sek.)
    │
    └─ Ist es ein KONZEPT oder WORKFLOW?
       (z.B. "Überblick über Report-Erstellungsprozess")
       └─ JA → DIAGRAMM oder INFOGRAFIK
```

### Konkrete Kriterien

| Medientyp | Wann verwenden | Beispiel |
|-----------|----------------|----------|
| **Einfacher Screenshot** (B) | - Einzelnes UI-Element zeigen<br>- Eindeutige Position<br>- Keine Interaktion | "Der Export-Button befindet sich oben rechts" |
| **Annotierter Screenshot** (C) | - Mehrere relevante Bereiche<br>- Reihenfolge wichtig<br>- Verwechslungsgefahr<br>- Element schwer zu finden (Fülle, Mehrfachvorkommen) | "Diese 3 Checkboxen müssen aktiviert sein" |
| **Video** (30s max) | - Komplexe Handlungsabfolge (4+ Schritte)<br>- Timing/Reihenfolge kritisch<br>- Dynamische UI-Änderungen | "Der Wizard durchläuft 8 Schritte mit Abhängigkeiten" |
| **Diagramm/Infografik** | - Konzeptuelle Zusammenhänge<br>- Workflow-Übersicht<br>- Keine konkrete UI | "Übersicht: Von der Datenakquise zum Report" |

### Zusätzliche Regeln

**Video nur, wenn:**
- Screenshot + Annotation nicht ausreicht
- Mehr als 3 UI-Interaktionen nacheinander
- Dynamisches Feedback wichtig (z.B. "Balken lädt", "Dialog erscheint")

**Annotation nur, wenn:**
- Mehr als 1 relevantes Element ODER
- Ein Element, aber Verwechslungsgefahr hoch ODER
- Element schwer zu finden (Fülle, Mehrfachvorkommen)

**Kein Medium, wenn:**
- Text allein ausreicht
- UI-Element Standard und selbsterklärend (z.B. "OK"-Button)

### Variante B: Detaillierter Screenshot-Platzhalter

```html
<button class="media-help-trigger" 
        data-media-src="media/screenshots/menu-datei-bericht.png"
        data-media-alt="Screenshot: Menü Datei mit ausgewähltem Eintrag Bericht/Export erstellen">
  📷
</button>
<!-- 
MEDIA-ANWEISUNG:
- Screenshot: Hauptfenster Axiom Examine
- Menü "Datei" geöffnet
- Entry "Bericht/Export erstellen" hervorgehoben (roter Rahmen)
- Kontext: Case bereits geladen
- Auflösung: 1920x1080, Ausschnitt fokussiert auf Menü
-->
```

### Variante C: Maximaler Annotierter Screenshot-Platzhalter

```html
<button class="media-help-trigger" 
        data-media-src="media/screenshots/step1-menu-datei-bericht.png"
        data-media-alt="Screenshot: Menü Datei mit ausgewähltem Eintrag Bericht/Export erstellen"
        data-media-annotation="true">
  📷
</button>
<!-- 
MEDIA-ANWEISUNG [SCREENSHOT-ID: step1-menu-datei-bericht]:

AUFNAHME-BEDINGUNGEN:
- Axiom Examine Version: 7.x
- Bereits geladener Case: Beispiel-Case "Demo_2024"
- Fenstergröße: Maximiert, min. 1920x1080
- Theme: Standard (Hell)

AUFNAHME-SCHRITT:
1. Öffne Axiom Examine mit Demo-Case
2. Klicke auf "Datei" in Menüleiste
3. Erstelle Screenshot BEVOR du auf Eintrag klickst

ANNOTATION (nach Aufnahme):
- Roter Rahmen um Menüeintrag "Bericht/Export erstellen"
- Pfeil von oben zeigend auf diesen Eintrag
- Text-Overlay: "1. Hier klicken"

DATEINAME: step1-menu-datei-bericht.png
SPEICHERORT: media/screenshots/
ALT-TEXT: Screenshot: Menü Datei mit ausgewähltem Eintrag Bericht/Export erstellen (annotiert)
-->
```

### Medien-Budget
**Keine Limitierung** – Was notwendig ist, um den Auftrag zu erfüllen, muss zugelassen werden.

---

## 1.10 Content-Type-Automatik (Hybrid-System)

### Strategie: Option C (Hybrid)
- **Feste Regeln** für eindeutige Fälle
- **KI-gestützte Entscheidung** für Grenzfälle
- **Dokumentation** bei unsicheren Entscheidungen

### Content-Type-Entscheidungsmatrix

#### Feste Regeln (immer anwenden)

| Inhalt | Content-Type | Kriterium |
|--------|--------------|-----------|
| Nummerierte/Aufzählungsliste mit Handlungsanweisungen | `instruction` | Enthält Verben im Imperativ (Klicken Sie, Wählen Sie) |
| Screenshots, Videos, Diagramme | `visual` | Medien-Element oder Media-Help-Trigger |
| Info-Boxen mit "Hinweis:", "Tipp:", "Warnung:" | `background` | Beginnt mit Meta-Label |
| Erklärende Absätze mit "weil", "deshalb", "dient dazu" | `explanation` | Enthält Begründungen/Kausalität |

#### KI-gestützte Entscheidung (bei Grenzfällen)

**Entscheidungsfragen für die KI:**

1. **"Muss der Anwender etwas TUN?"**
   - Ja → `instruction`
   - Nein → weiter zu Frage 2

2. **"Wird etwas ERKLÄRT oder BEGRÜNDET?"**
   - Ja → `explanation`
   - Nein → weiter zu Frage 3

3. **"Ist es ZUSATZINFO oder KONTEXT?"**
   - Ja → `background`
   - Nein → Standardfall `explanation`

4. **"Ist es ein MEDIEN-ELEMENT?"**
   - Ja → `visual`

### Ergänzende Leitlinien

**Prinzip 1: Im Zweifelsfall granularer aufteilen**
- Besser mehrere kleine, klar zugeordnete Blöcke als ein großer unklarer

**Prinzip 2: Show-Only-Mode-Perspektive**
- Frage: "Würde ein erfahrener Anwender nur die instructions + visuals brauchen?"
- Wenn ja → alles andere ist `explanation` oder `background`

**Prinzip 3: Konsistenz über Präzision**
- Ähnliche Inhalte sollten ähnlich getaggt werden
- Bei Unsicherheit: Dokumentiere die Entscheidung in Kommentar

### Grenzfall-Dokumentation

**Format:**
```html
<!-- CONTENT-TYPE-REVIEW: [CONFIDENCE: LOW]
     Grenzfall zwischen: explanation vs background
     Entschieden für: background
     Begründung: Dient primär als Kontext für Zeitplanung, nicht als Konzepterklärung
     Alternative Interpretation: Könnte als explanation gelten, wenn Fokus auf "Warum dauert es?" liegt
-->
<div data-content-type="background">
    <p>Die Auswahl der Datenquellen beeinflusst die Verarbeitungszeit erheblich...</p>
</div>
```

**Confidence-Levels:** `HIGH | MEDIUM | LOW`

### Beispiele

**Beispiel 1: Eindeutig instruction**
```html
<div data-content-type="instruction">
    <ol>
        <li>Öffnen Sie Axiom Examine</li>
        <li>Klicken Sie auf "Datei" → "Bericht erstellen"</li>
        <li>Wählen Sie "HTML" als Format</li>
    </ol>
</div>
```

**Beispiel 2: Eindeutig explanation**
```html
<div data-content-type="explanation">
    <p>
        HTML-Reports bieten den Vorteil, dass sie direkt im Browser 
        geöffnet werden können, ohne zusätzliche Software zu benötigen. 
        Deshalb eignen sie sich besonders für die Weitergabe an 
        externe Stellen wie Staatsanwaltschaften.
    </p>
</div>
```

**Beispiel 3: Grenzfall (KI entscheidet) → background**
```html
<!-- CONTENT-TYPE-REVIEW: [CONFIDENCE: MEDIUM]
     Grenzfall zwischen: explanation vs background
     Entschieden für: background
     Begründung: Warnt vor Zeitaufwand (Kontext), erklärt nicht das "Warum"
-->
<div data-content-type="background">
    <p>
        Die Auswahl der Datenquellen beeinflusst die Verarbeitungszeit 
        erheblich. Bei großen Datenmengen kann der Prozess mehrere 
        Stunden dauern.
    </p>
</div>
```

**Beispiel 4: Kombiniert (mehrere Content-Types)**
```html
<div data-content-type="explanation">
    <p>Der Artifacts Explorer zeigt alle extrahierten Artefakte übersichtlich kategorisiert an.</p>
</div>

<div data-content-type="instruction">
    <ol>
        <li>Öffnen Sie den Artifacts Explorer</li>
        <li>Wählen Sie die Kategorie "Web Related"</li>
    </ol>
</div>

<div data-content-type="visual">
    <button class="media-help-trigger" data-media-src="...">📷</button>
</div>

<div data-content-type="background">
    <div class="info-box">
        <strong>Hinweis:</strong> Nicht alle Kategorien sind bei jedem 
        Case verfügbar. Dies hängt von den gefundenen Datentypen ab.
    </div>
</div>
```

---

## 1.11 Video-Untertitel-System (BFSG)

### Barrierefreiheit-Anforderung
- Alle Videos **müssen Untertitel** enthalten (BFSG-konform)
- KI generiert **Untertitel-Vorlage**
- Menschlicher Maintainer pflegt **Zeitstempel** nach tatsächlichem Video

### KI-generierte Untertitel-Vorlage (.srt)

```srt
1
00:00:00,000 --> 00:00:03,500
Öffnen Sie Axiom Examine und laden Sie einen Case

2
00:00:03,500 --> 00:00:07,000
Klicken Sie auf "Datei" in der Menüleiste

3
00:00:07,000 --> 00:00:10,500
Wählen Sie "Bericht/Export erstellen"

4
00:00:10,500 --> 00:00:15,000
Wählen Sie "HTML" als Exportformat

5
00:00:15,000 --> 00:00:20,000
Konfigurieren Sie die Export-Optionen nach Bedarf

6
00:00:20,000 --> 00:00:25,000
Klicken Sie auf "Export starten"

7
00:00:25,000 --> 00:00:30,000
Der Export wird nun durchgeführt und kann mehrere Minuten dauern
```

### Metadaten im JSON

```json
{
  "media": {
    "type": "video",
    "src": "media/videos/export-workflow.mp4",
    "subtitles": "media/subtitles/export-workflow.de.srt",
    "duration": "00:00:30",
    "transcript": "Vollständiges Transkript des Videos für Screen Reader und Suchmaschinen..."
  }
}
```

### Workflow
1. **KI generiert:** Untertitel-Text mit geschätzten Zeitstempeln
2. **Maintainer erstellt:** Video
3. **Maintainer justiert:** Zeitstempel im .srt nach tatsächlichem Video
4. **Maintainer prüft:** Synchronität und Lesbarkeit

---

## Schema-Erweiterungen erforderlich

### V12 - JSON-Schema-Erweiterung für Metadaten & Content-Types

**Dokumentation:** V12 - JSON-Schema-Erweiterung für Metadaten & Content-Types.md

**Neue Felder:**

```json
{
  "contentType": {
    "type": "string",
    "enum": ["instruction", "explanation", "visual", "background"],
    "description": "Content-Type für Show-Only-Mode und strukturelle Organisation"
  },
  "metadata": {
    "type": "object",
    "properties": {
      "tool": {
        "type": "string",
        "description": "Name des Forensik-Tools (z.B. 'Magnet Axiom Examine')"
      },
      "toolVersion": {
        "type": "string",
        "description": "Version des Tools (z.B. '7.x')"
      },
      "sources": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "version": { "type": "string" },
            "url": { "type": "string" }
          }
        }
      },
      "created": {
        "type": "string",
        "format": "date",
        "description": "Erstellungsdatum (YYYY-MM-DD)"
      },
      "lastUpdated": {
        "type": "string",
        "format": "date",
        "description": "Letztes Update (YYYY-MM-DD)"
      },
      "promptVersion": {
        "type": "string",
        "description": "Version des Prompts, das zur Generierung verwendet wurde"
      }
    }
  },
  "media": {
    "type": "object",
    "properties": {
      "type": {
        "type": "string",
        "enum": ["screenshot", "annotated-screenshot", "video", "diagram", "infographic"]
      },
      "src": { "type": "string" },
      "alt": { "type": "string" },
      "subtitles": { "type": "string" },
      "transcript": { "type": "string" },
      "instructions": { "type": "string" }
    }
  }
}
```

---

## Zusammenfassung Cluster 1

### Abgeschlossene Punkte

✅ **1.1** - Zielgruppe und Verständlichkeitsniveau  
✅ **1.2** - Detail-Level-System (4 Stufen)  
✅ **1.3** - Terminologie und Konsistenz  
✅ **1.4** - Fachliche Korrektheit  
✅ **1.5** - Vollständigkeit  
✅ **1.6** - Axiom-Versionierung und Metadaten  
✅ **1.7** - Mehrsprachigkeit und Begriffswahl  
✅ **1.8** - Multi-Tool-Strategie  
✅ **1.9** - Medien-Präzisionsgrad und Entscheidungsmatrix  
✅ **1.10** - Content-Type-Automatik (Hybrid-System)  
✅ **1.11** - Video-Untertitel-System (BFSG)  

### Offene Punkte für spätere Cluster

- Schema-Definition (Cluster 2)
- Strukturelle Organisation (Cluster 2)
- Technische Implementierung (Cluster 3)
- Qualitätssicherung und Testing (Cluster 4)
- Workflow und Rollen (Cluster 5)

---

## Nächste Schritte

**Cluster 2: Strukturelle Anforderungen**

Fokus:
- Section-Hierarchie und Navigation
- data-ref Granularität
- IDs vs. data-ref
- Agent-Context-Blocks Platzierung
- Schema-Definition und -Validierung

---

**Ende Cluster 1**  
*Bearbeitungszeit: ~2 Stunden*  
*Status: Abgeschlossen und bereit für Cluster 2*