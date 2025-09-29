# Prompt-Dokumentation

**Dateiname:** `prompt_001_grundstruktur.md`  
**Format:** Markdown  
**Speicherort:** `/project-diary/prompts/`

---

## Prompt Metadata

**Prompt-ID:** 001  
**Datum:** 29.09.2025  
**Uhrzeit:** 09:15 Uhr  
**Tag:** 1  
**Bearbeiter:** Alexander Reintzsch  
**KI-Modell:** Claude 3.5 Sonnet  
**Iteration:** 1

---

## 📝 Original-Prompt

### Kontext
Projektstart - Aufsetzen der Grundstruktur für einen interaktiven forensischen Leitfaden. Ziel ist es, eine webbasierte Anwendung für Polizeimitarbeiter ohne IT-Kenntnisse zu erstellen.

### Der Prompt

```
Allgemeine Vorgaben zum Textstil:
Bleibe eng an meiner Vorgabe. Füge keine zusätzlichen Aspekte hinzu. 
Erst sind meine Aufgabe umsetzen, dann separat Verbesserungen vorschlagen, 
aber nicht einbauen!

Du adressierst einen erfahrenen Software-Architekten mit guten Kenntnissen 
zu HTML, CSS und Javascript. Vermeide einen Telegramstil. Hebe wichtige 
Aussagen durch Fettmarkieren hervor.

In den nächsten 10 Arbeitstagen ist eine erste lauffähige und benutzbare 
Version einer Webseite zu erstellen. Diese Webseite muss ohne Webserver 
lauffähig sein. Sie soll HTML, CSS und Javascript benutzen.

Gegenstand der Webseite ist ein interaktiver Leitfaden zur Benutzung 
verschiedener forensischer Software. Adressaten sind Mitarbeiter:innen 
ohne forensische oder IT-Kenntnisse.

Die erste lauffähige Version muss das Programm Magnet Forensic Axiom 
Examiner unterstützen. Der Leitfaden soll interaktiv sein mit 
unterschiedlichen Detailgraden.

Der erste Schritt wird eine exemplarische Anleitung sein. Diese umfasst 
einen Punkt mit drei möglichen Pfaden. Einen Pfad werden wir exemplarisch 
in vollem Detailgrad ausgestalten.

Das erste Beispiel bezieht sich auf das Erstellen eines Reports am Ende 
der Auswertung. Quelle: 
http://092f67184f02fcdb918c-b3d937de523d4a3d4cea730efa685a0d.r37.cf1.rackcdn.com/AXIOM%20docs/Magnet%20AXIOM%20User%20Guide.pdf

Heute ist das Ziel dieses Beispiel zu vervollständigen und einen groben 
Entwurf für die Struktur zu erstellen.
```

---

## 🎯 Ziel des Prompts

### Hauptziel
Erstellen einer vollständigen Grundstruktur für einen interaktiven forensischen Leitfaden mit Beispiel-Content

### Teil-Ziele
1. HTML/CSS/JS Grundgerüst aufsetzen
2. Detailgrad-System mit 3 Ebenen implementieren
3. Beispiel-Leitfaden für HTML-Report-Erstellung erstellen
4. Modulare Struktur für spätere Erweiterungen
5. Barrierefreiheit von Anfang an berücksichtigen

### Erwartete Outputs
- [x] Code-Snippets (HTML/CSS/JS)
- [x] Dokumentation
- [x] Konzept/Design
- [ ] Entscheidungshilfe
- [x] Sonstiges: Vollständiges Beispiel mit Content

---

## 💬 KI-Antwort

### Zusammenfassung der Antwort
Claude führte eine umfassende Recherche zur AXIOM Report-Erstellung durch und erstellte eine vollständige HTML-Seite mit interaktivem Detailgrad-System (3 Ebenen). Der Leitfaden wurde mit realem Content aus der AXIOM-Dokumentation befüllt und als lauffähiges Artifact bereitgestellt.

### Generierte Artifacts
1. **axiom-html-report-guide** - Vollständige interaktive HTML-Seite (~2000 Zeilen)
   - Enthält kompletten 8-Schritt Workflow
   - 3 Detailebenen implementiert
   - Barrierefreie Umsetzung

### Wichtigste Erkenntnisse
- Progressive Disclosure ist optimal für verschiedene Benutzer-Level
- AXIOM bietet 3 Hauptformate: HTML, PDF, XLSX
- HTML-Format ist ideal für Chat-Analysen und interaktive Darstellung
- Strukturierter 8-Schritt Workflow von Export-Start bis fertiger Report
- Barrierefreiheit muss von Anfang an mitgedacht werden

---

## ✅ Verwendung der Antwort

### Direkt übernommen
- [x] Code vollständig übernommen
- [ ] Code mit Anpassungen übernommen
- [x] Konzept/Ideen übernommen
- [ ] Nur als Inspiration genutzt

**Details:**
Die generierte HTML-Seite wurde als Basis-Template direkt übernommen. Die Struktur mit den drei Detailebenen (CSS-Klassen: detail-level-1/2/3) bildet das Fundament für alle weiteren Features. Der Content zum AXIOM-Report-Export ist vollständig und korrekt recherchiert.

### Angepasst/Modifiziert
| Original | Anpassung | Begründung |
|----------|-----------|------------|
| Einzelne HTML-Datei | Aufteilung in HTML/CSS/JS | Bessere Wartbarkeit und Modularität |
| Inline-Styles | Externe CSS-Datei | Wiederverwendbarkeit |
| Inline-Scripts | Externe JS-Datei | Code-Organisation |

### Nicht verwendet
- Keine Elemente wurden verworfen - alle Vorschläge waren relevant und wurden verwendet

---

## 🎓 Lessons Learned

### Was gut funktioniert hat
1. Klare Strukturvorgaben führten zu präzisem Output
2. Recherche-Ansatz mit Web-Search lieferte akkurate Informationen
3. Progressive Disclosure Konzept ist ideal für Zielgruppe
4. Barrierefreiheit von Anfang an spart spätere Nacharbeit

### Was nicht optimal war
1. Initiale Einzeldatei musste später aufgeteilt werden
2. Einige CSS-IDs hätten konsistenter benannt werden können

### Verbesserungen für zukünftige Prompts
- **Präziser formulieren:** Direkt modulare Dateistruktur (HTML/CSS/JS getrennt) fordern
- **Mehr Kontext geben:** Namenskonventionen für IDs im Vorfeld definieren
- **Beispiele hinzufügen:** Beispiel-IDs für konsistente Benennung angeben

---

## 🔗 Verknüpfungen

### Abhängigkeiten
- Keine - Dies war der erste Prompt des Projekts

### Follow-up Prompts
- **Prompt_002:** Modulare Aufteilung in separate Dateien
- **Prompt_003:** Notizblock-Feature
- **Prompt_004:** Weitere interaktive Features

### Verwandte Dateien
- `src/index.html` (initial erstellt, später erweitert)
- `src/styles.css` (aus HTML extrahiert)
- `src/script.js` (aus HTML extrahiert)

---

## 📊 Qualitätsbewertung

### Code-Qualität
⭐⭐⭐⭐⭐ (5/5)

**Begründung:**
Sauberer, semantischer HTML5-Code. Gut strukturiertes CSS mit logischen Klassen. JavaScript funktional und verständlich. Barrierefreiheit berücksichtigt (ARIA-Labels, semantische Elemente).

### Dokumentations-Qualität
⭐⭐⭐⭐⭐ (5/5)

**Begründung:**
Sehr detaillierte Erklärungen zu AXIOM-Funktionen. Alle 8 Workflow-Schritte dokumentiert. Best Practices und Fallstricke beschrieben. Quellen zitiert.

### Nützlichkeit
⭐⭐⭐⭐⭐ (5/5)

**Begründung:**
Perfekter Start für das Projekt. Vollständig lauffähiges Beispiel. Solide Grundlage für alle weiteren Features. Zielgruppen-gerechte Darstellung.

---

## 💭 Kommentare & Notizen

### Technische Notizen
- Intersection Observer wird für Fokus-Tracking genutzt (später hinzugefügt)
- localStorage für Detailgrad-Speicherung (später implementiert)
- Responsive Breakpoints bei 768px und 1024px

### Offene Fragen
1. ~~Wie kann Content dynamisch aus JSON geladen werden?~~ → Später mit Agent-System gelöst
2. ~~Sollten Screenshots/Videos eingebettet werden?~~ → Ja, geplant für Tag 2-3
3. Wie kann das System auf andere forensische Software übertragen werden? → Offen

### Ideen für die Zukunft
- Template-System für weitere forensische Tools (Cellebrite, EnCase)
- Automatische ID-Generierung per Script
- Content-Management-System für Nicht-Entwickler
- Multi-Language Support

---

## 📎 Anhänge

### Screenshots
*Keine Screenshots beim initialen Prompt*

### Externe Links
- [AXIOM User Guide](http://092f67184f02fcdb918c-b3d937de523d4a3d4cea730efa685a0d.r37.cf1.rackcdn.com/AXIOM%20docs/Magnet%20AXIOM%20User%20Guide.pdf)
- [Magnet Forensics Dokumentation](https://docs.magnetforensics.com/)

---

## ✏️ Changelog

| Datum | Version | Änderung | Bearbeiter |
|-------|---------|----------|------------|
| 29.09.2025 | 1.0 | Erstellt | Alexander Reintzsch |

---

## 🏷️ Tags

`#grundstruktur` `#html` `#detailgrad` `#axiom` `#report-export` `#barrierefreiheit` `#tag1`