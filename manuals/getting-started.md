# Getting Started: Section-Erstellung - Stil-Richtlinien

**Version:** 1.0.0  
**Zielgruppe:** KI-Systeme in Phase 1 (Section-Drafts erstellen)  
**Zweck:** Konsistente Tonalität und Stil über alle Sections hinweg

---

## 📋 Übersicht

Dieses Dokument definiert die **Stil-Richtlinien** für die Erstellung von Section-HTMLs. Alle Sections müssen diesen Richtlinien folgen, um eine konsistente Lernerfahrung zu gewährleisten.

---

## 🎯 Zielgruppe

### Demografische Merkmale

- **Berufsgruppe:** Polizei-Ermittler (Kriminalpolizei, Sachbearbeitung)
- **Bildungsniveau:** Mittlere Reife (Realschulabschluss)
- **IT-Kenntnisse:** Niedrig bis mittel
  - Können: Windows bedienen, Office-Programme nutzen, E-Mails schreiben
  - Können NICHT: Programmieren, Datenbanken abfragen, technische Konzepte tief verstehen
- **Alter:** 30-55 Jahre
- **Forensik-Erfahrung:** Wenig bis keine
- **Motivation:** Pflichtschulung, oft skeptisch gegenüber neuer Software

### Lernverhalten

- **Bevorzugter Lernstil:** Praktisch, anwendungsorientiert ("learning by doing")
- **Aufmerksamkeitsspanne:** Kurz (max. 10-15 Minuten pro Section)
- **Frustrations-Toleranz:** Niedrig (bei technischen Problemen schnell demotiviert)
- **Erwartungshaltung:** Sofort anwendbare Lösungen, keine Theorie

### Lernumgebung

- **Kontext:** Am Arbeitsplatz, während der Arbeitszeit
- **Druck:** Hoher Zeitdruck (Ermittlungen laufen parallel)
- **Ablenkungen:** Viele (Telefon, Kollegen, andere Aufgaben)
- **Hardware:** Standard-PC, Windows 10/11, 1-2 Monitore

---

## 💬 Tonalität

### Grundprinzipien

**✅ SO:**
- **Subtil-unterstützend:** Hilft, ohne zu bevormunden
- **Sachlich:** Fakten statt Emotionen
- **Klar:** Kurze, präzise Sätze
- **Respektvoll:** Nimmt die Zielgruppe ernst

**❌ NICHT SO:**
- **Motivierend-ermunernd:** "Super gemacht!", "Toll!", "Klasse!"
- **Infantilisierend:** "Ganz einfach!", "Kinderleicht!", "Das schaffst du!"
- **Akademisch:** "Die Applikation implementiert...", "Theoretisch könnte man..."
- **Vage:** "Eventuell...", "Möglicherweise...", "Es wäre gut, wenn..."

### Vergleichstabelle

| ❌ Falsch | ✅ Richtig |
|-----------|------------|
| "Super! Du hast es geschafft!" | "Fall erfolgreich erstellt." |
| "Das ist ganz einfach!" | "Öffnen Sie File → New Case." |
| "Theoretisch könnte man auch..." | "Alternative: Template verwenden (siehe Section XY)." |
| "Es wäre empfehlenswert, dass..." | "Verwenden Sie einen aussagekräftigen Fallnamen." |
| "Die Applikation implementiert..." | "AXIOM erstellt intern eine SQLite-Datenbank." |

---

## ✍️ Sprachstil

### Satzstruktur

**Kurze Sätze (max. 20 Wörter):**
- ✅ "Öffnen Sie File → New Case. Geben Sie einen Fallnamen ein."
- ❌ "Um einen neuen Fall zu erstellen, öffnen Sie zunächst das Menü File und wählen dann die Option New Case aus, woraufhin sich ein Dialog öffnet."

**Aktive Sprache:**
- ✅ "Öffnen Sie das Menü."
- ❌ "Das Menü wird geöffnet."

**Imperativ für Anweisungen:**
- ✅ "Klicken Sie auf Save."
- ❌ "Sie sollten auf Save klicken."
- ❌ "Es ist ratsam, auf Save zu klicken."

### Formulierungsmuster

#### Level 1: Schritt-für-Schritt-Anleitungen

**Struktur:**
```
1. Schritt 1: Aktion + Ziel
2. Schritt 2: Aktion + Ziel
3. Schritt 3: Aktion + Ziel
```

**Beispiele:**
- ✅ "Öffnen Sie File → New Case."
- ✅ "Geben Sie einen Fallnamen ein (z.B. 'Fall_2024_001')."
- ✅ "Klicken Sie auf Create."

**Vermeiden:**
- ❌ "Zunächst sollten Sie..."
- ❌ "Als nächstes könnten Sie..."
- ❌ "Jetzt müssen Sie nur noch..."

#### Level 2: Erklärungen und Best Practices

**Struktur:**
```
Warum-Frage → Erklärung → Best Practice
```

**Beispiele:**
- ✅ "Warum ist ein aussagekräftiger Fallname wichtig? Der Fallname wird als Dateiname verwendet. Best Practice: Verwenden Sie Schema 'Fall_JJJJ_NNN'."
- ✅ "Dieser Dialog speichert Ihre Eingaben automatisch. Sie können ihn jederzeit über File → Open Recent aufrufen."

**Vermeiden:**
- ❌ "Es wäre empfehlenswert..."
- ❌ "Idealerweise sollten Sie..."
- ❌ "Man könnte auch..."

#### Level 3: Technische Details

**Struktur:**
```
Technisches Konzept → Auswirkung → Praktische Relevanz
```

**Beispiele:**
- ✅ "AXIOM erstellt intern eine SQLite-Datenbank. Diese speichert alle Metadaten des Falls. Bei großen Datenmengen (>100 GB) kann die Datenbank mehrere Gigabyte groß werden."
- ✅ "Die Hash-Berechnung erfolgt mittels SHA-256. Dies stellt sicher, dass Daten nicht manipuliert wurden. Dauer: ca. 5-10 Minuten pro 100 GB."

**Vermeiden:**
- ❌ "Die Implementierung basiert auf..."
- ❌ "Aus theoretischer Sicht..."
- ❌ "Algorithmisch gesehen..."

---

## 🎨 Gestaltungselemente

### Warnungen und Hinweise

**Typen:**

1. **💡 Tipp:** Hilfreicher Hinweis, optional
   ```html
   <aside class="tip-box" role="note">
     <strong>💡 Tipp:</strong> Verwenden Sie aussagekräftige Fallnamen wie "Fall_2024_001".
   </aside>
   ```

2. **⚠️ Warnung:** Vorsicht, möglicher Fehler
   ```html
   <aside class="warning-box" role="alert">
     <strong>⚠️ Warnung:</strong> Verwenden Sie keine Sonderzeichen (< > : " / \ | ? *) im Fallnamen.
   </aside>
   ```

3. **ℹ️ Information:** Zusätzlicher Kontext
   ```html
   <aside class="info-box" role="note">
     <strong>ℹ️ Information:</strong> AXIOM erstellt automatisch ein Backup.
   </aside>
   ```

4. **🚨 Kritischer Fehler:** Schwerwiegender Fehler, sofortige Handlung nötig
   ```html
   <aside class="error-box" role="alert">
     <strong>🚨 Fehler:</strong> Fall konnte nicht erstellt werden. Prüfen Sie den Speicherplatz.
   </aside>
   ```

**Tonalität in Warnungen:**
- ✅ "Verwenden Sie keine Sonderzeichen."
- ❌ "Bitte verwenden Sie keine Sonderzeichen." (zu höflich)
- ❌ "Verwenden Sie auf keinen Fall Sonderzeichen!" (zu alarmistisch)

### Screenshots und Medien

**Platzhalter-Format:**
```html
<figure class="placeholder-screenshot" data-media-type="screenshot">
  <figcaption>Screenshot: New Case Dialog mit ausgefüllten Feldern</figcaption>
  <!-- TODO Phase 5: Screenshot erstellen
       - Zeige: New Case Dialog
       - Highlight: Fallname-Feld
       - Annotation: "Aussagekräftiger Name verwenden"
  -->
</figure>
```

**Beschreibung in Figcaption:**
- Kurz und präzise
- Beschreibt, was gezeigt wird
- Keine Anweisungen ("Klicken Sie..."), nur Beschreibung

**Kommentare für Phase 5:**
- Was soll gezeigt werden?
- Welche Bereiche sollen hervorgehoben werden?
- Welche Annotationen sind nötig?

---

## 📖 Terminologie

### Grundregeln

1. **Bei Erstnennung:** Deutscher Begriff + englisches Original in Klammern
   - ✅ "Evidenzquelle (Evidence Source)"
   - ✅ "Prüfsumme (Hash)"

2. **Danach:** Nur deutscher Begriff
   - ✅ "Die Evidenzquelle enthält..."
   - ❌ "Die Evidenzquelle (Evidence Source) enthält..."

3. **UI-Elemente:** Immer in Originalsprache
   - ✅ "Artifacts Explorer"
   - ✅ "Case Dashboard"
   - ❌ "Artefakte-Explorer" (nicht übersetzen!)

4. **Konsistenz:** Verwende EXAKT die Begriffe aus der Terminologie-Entscheidungsliste
   - ✅ "Evidenzquelle" (wenn in Liste)
   - ❌ "Datenquelle" (wenn nicht in Liste als Synonym)

### Sprachauszeichnung (BFSG-konform)

**Deutsche Begriffe:**
```html
<p lang="de">Die Evidenzquelle enthält Beweismittel.</p>
```

**Englische UI-Elemente:**
```html
<p lang="de">Öffnen Sie den <span lang="en">Artifacts Explorer</span>.</p>
```

**Gemischte Sätze:**
```html
<p lang="de">
  Klicken Sie auf 
  <span lang="en">File → New Case</span>.
</p>
```

---

## 🔍 Häufige Fehler vermeiden

### Fehler 1: Zu akademisch

❌ **Falsch:**
> "Die Applikation implementiert eine datenbankgestützte Persistenzschicht, welche mittels eines objektrelationalen Mappings (ORM) auf eine SQLite-Datenbank abbildet."

✅ **Richtig:**
> "AXIOM speichert Ihre Daten in einer SQLite-Datenbank. Diese enthält alle Metadaten des Falls."

---

### Fehler 2: Zu vage

❌ **Falsch:**
> "Eventuell sollten Sie einen aussagekräftigen Fallnamen verwenden. Dies könnte später hilfreich sein."

✅ **Richtig:**
> "Verwenden Sie einen aussagekräftigen Fallnamen (z.B. 'Fall_2024_001'). Der Fallname wird als Dateiname verwendet."

---

### Fehler 3: Redundanz

❌ **Falsch:**
> "Öffnen Sie File → New Case. Um einen neuen Fall zu erstellen, müssen Sie zunächst das File-Menü öffnen und dann auf New Case klicken. Klicken Sie also auf File und dann auf New Case."

✅ **Richtig:**
> "Öffnen Sie File → New Case."

---

### Fehler 4: Infantilisierung

❌ **Falsch:**
> "Super! Du hast es geschafft! Der Fall wurde erfolgreich erstellt. Das war doch gar nicht so schwer, oder? Klasse gemacht!"

✅ **Richtig:**
> "Fall erfolgreich erstellt."

---

### Fehler 5: Übermäßige Höflichkeit

❌ **Falsch:**
> "Bitte klicken Sie nun freundlicherweise auf den Button Save, wenn Sie so nett wären."

✅ **Richtig:**
> "Klicken Sie auf Save."

---

## 📐 Detail-Level-System

### Level 1: Basis (immer sichtbar)

**Inhalt:**
- Schritt-für-Schritt-Anleitung
- Minimale Erklärungen (nur wenn absolut notwendig)
- Screenshots/Medien

**Tonalität:**
- Direktiv, imperativ
- Kurz, präzise
- Keine Hintergründe

**Beispiel:**
```html
<div class="detail-level-1">
  <ol class="steps-list">
    <li><strong>Schritt 1:</strong> Öffnen Sie File → New Case.</li>
    <li><strong>Schritt 2:</strong> Geben Sie einen Fallnamen ein.</li>
    <li><strong>Schritt 3:</strong> Klicken Sie auf Create.</li>
  </ol>
  
  <figure class="placeholder-screenshot">
    <figcaption>Screenshot: New Case Dialog</figcaption>
  </figure>
</div>
```

---

### Level 2: Standard (ausklappbar)

**Inhalt:**
- Erklärungen: Warum ist dieser Schritt wichtig?
- Best Practices
- Häufige Fehler
- Tipps und Warnungen

**Tonalität:**
- Erklärend, kontextualisierend
- Etwas ausführlicher
- Praxisorientiert

**Beispiel:**
```html
<details class="detail-level-2">
  <summary>Mehr erfahren: Hintergründe und Best Practices</summary>
  <div class="detail-content">
    <h3>Warum ist der Fallname wichtig?</h3>
    <p>Der Fallname wird als Dateiname für die Case-Datenbank verwendet. 
       Nachträgliche Änderungen sind aufwändig.</p>
    
    <aside class="tip-box" role="note">
      <strong>💡 Tipp:</strong> Verwenden Sie ein einheitliches Schema wie 
      "Fall_JJJJ_NNN" (z.B. "Fall_2024_001").
    </aside>
    
    <aside class="warning-box" role="alert">
      <strong>⚠️ Warnung:</strong> Vermeiden Sie Sonderzeichen 
      (< > : " / \ | ? *) im Fallnamen.
    </aside>
  </div>
</details>
```

---

### Level 3: Vertiefung (ausklappbar, optional)

**Inhalt:**
- Technische Hintergründe
- Was passiert im Hintergrund?
- Alternativen
- Erweiterte Optionen

**Tonalität:**
- Technisch, aber verständlich
- Für interessierte Nutzer
- Nicht zwingend für Aufgabe

**Beispiel:**
```html
<details class="detail-level-3">
  <summary>Technische Details</summary>
  <div class="detail-content">
    <h3>Was passiert beim Erstellen eines Falls?</h3>
    <p>AXIOM erstellt eine SQLite-Datenbank im Verzeichnis 
       <code>C:\AXIOM\Cases\[Fallname]\</code>. Diese enthält:</p>
    <ul>
      <li>Metadaten (Examiner, Datum, etc.)</li>
      <li>Referenzen auf Evidenzquellen</li>
      <li>Extrahierte Artefakte (nach Processing)</li>
    </ul>
    
    <p><strong>Performance-Tipp:</strong> Bei großen Fällen (>500 GB) 
       speichern Sie die Case-Datenbank auf einer SSD.</p>
  </div>
</details>
```

---

## 🎯 Matroschka-Prinzip

**Konzept:** Jedes höhere Level enthält alle Informationen des vorherigen Levels.

```
Level 1 (Basis):           "Öffnen Sie File → New Case."

Level 2 (+ Erklärung):     "Öffnen Sie File → New Case."
                           + "Der Fallname wird als Dateiname verwendet."
                           + "Best Practice: Verwenden Sie Schema XY."

Level 3 (+ Technik):       "Öffnen Sie File → New Case."
                           + "Der Fallname wird als Dateiname verwendet."
                           + "Best Practice: Verwenden Sie Schema XY."
                           + "AXIOM erstellt eine SQLite-Datenbank."
                           + "Performance-Tipp: SSD verwenden."
```

**Wichtig:**
- Level 1 ist **in sich geschlossen** (Nutzer kann Aufgabe erledigen)
- Level 2 **erweitert** Level 1 (tieferes Verständnis)
- Level 3 **erweitert** Level 2 (technische Details)

---

## ✅ Checkliste: Guter Stil

Vor dem Absenden prüfen:

### Tonalität
- [ ] Subtil-unterstützend, sachlich (nicht motivierend)
- [ ] Keine Infantilisierung ("ganz einfach", "kinderleicht")
- [ ] Kein übermäßig höfliches "Bitte" bei jedem Satz
- [ ] Respektvoll, nimmt Zielgruppe ernst

### Sprache
- [ ] Kurze Sätze (max. 20 Wörter)
- [ ] Aktive Sprache ("Öffnen Sie..." statt "Es wird geöffnet...")
- [ ] Imperativ für Anweisungen
- [ ] Konkret statt vage ("Klicken Sie..." statt "Eventuell...")

### Terminologie
- [ ] Begriffe aus Terminologie-Entscheidungsliste verwendet
- [ ] Bei Erstnennung: Deutsch + Englisch in Klammern
- [ ] UI-Elemente in Originalsprache
- [ ] Sprachauszeichnung mit `lang`-Attribut

### Detail-Levels
- [ ] Level 1 vorhanden und in sich geschlossen
- [ ] Level 2 erweitert Level 1 (nicht wiederholt)
- [ ] Level 3 nur wenn technisch relevant
- [ ] Matroschka-Prinzip beachtet

### Warnungen/Hinweise
- [ ] Richtig kategorisiert (Tipp/Warnung/Info/Fehler)
- [ ] Tonalität angemessen (nicht zu alarmistisch)
- [ ] Konkret und handlungsorientiert

---

## 📚 Beispiel: Vollständige Section (Stilmuster)

```html
<section id="axiom-case-creation" data-section-id="axiom-case-creation" class="content-section" lang="de">
  
  <!-- Header -->
  <header class="section-header">
    <h2>Neuen Fall in AXIOM anlegen</h2>
    <p class="section-description">
      Erstellen Sie einen neuen Fall, um mit der Analyse zu beginnen.
    </p>
  </header>
  
  <!-- Level 1: Basis -->
  <div class="detail-level-1">
    <ol class="steps-list">
      <li><strong>Schritt 1:</strong> Öffnen Sie <span lang="en">File → New Case</span>.</li>
      <li><strong>Schritt 2:</strong> Geben Sie einen Fallnamen ein (z.B. <code>Fall_2024_001</code>).</li>
      <li><strong>Schritt 3:</strong> Füllen Sie die Examiner-Informationen aus.</li>
      <li><strong>Schritt 4:</strong> Klicken Sie auf <span lang="en">Create</span>.</li>
    </ol>
    
    <figure class="placeholder-screenshot">
      <figcaption>Screenshot: <span lang="en">New Case Dialog</span> mit ausgefüllten Feldern</figcaption>
    </figure>
  </div>
  
  <!-- Level 2: Erklärungen -->
  <details class="detail-level-2">
    <summary>Mehr erfahren: Hintergründe und Best Practices</summary>
    <div class="detail-content">
      <h3>Warum ist der Fallname wichtig?</h3>
      <p>
        Der Fallname wird als Dateiname für die Case-Datenbank verwendet.
        Nachträgliche Änderungen sind aufwändig, da alle Referenzen aktualisiert werden müssen.
      </p>
      
      <aside class="tip-box" role="note">
        <strong>💡 Tipp:</strong> Verwenden Sie ein einheitliches Namensschema wie 
        <code>Fall_JJJJ_NNN</code> (z.B. <code>Fall_2024_001</code>).
      </aside>
      
      <aside class="warning-box" role="alert">
        <strong>⚠️ Warnung:</strong> Verwenden Sie keine Sonderzeichen 
        (< > : " / \ | ? *) im Fallnamen. Diese führen zu Fehlern beim Speichern.
      </aside>
      
      <h3>Examiner-Informationen</h3>
      <p>
        Diese Informationen erscheinen später in Reports und dienen der Nachvollziehbarkeit.
        Verwenden Sie Ihren vollständigen Namen und Ihre Dienststelle.
      </p>
    </div>
  </details>
  
  <!-- Level 3: Technische Details -->
  <details class="detail-level-3">
    <summary>Technische Details</summary>
    <div class="detail-content">
      <h3>Was passiert beim Erstellen eines Falls?</h3>
      <p>
        <span lang="en">AXIOM</span> erstellt eine SQLite-Datenbank im Verzeichnis 
        <code>C:\AXIOM\Cases\[Fallname]\</code>. Diese enthält:
      </p>
      <ul>
        <li>Metadaten (Examiner, Datum, Fallnummer)</li>
        <li>Referenzen auf Evidenzquellen (Evidence Sources)</li>
        <li>Extrahierte Artefakte (nach Processing)</li>
      </ul>
      
      <p>
        <strong>Performance-Hinweis:</strong> Bei großen Fällen (>500 GB) 
        speichern Sie die Case-Datenbank auf einer SSD. Dies beschleunigt 
        Suchvorgänge erheblich.
      </p>
    </div>
  </details>
  
  <!-- Navigation -->
  <nav class="section-navigation">
    <a href="#axiom-ui-overview" class="nav-prev">← Zurück: AXIOM-Oberfläche</a>
    <a href="#axiom-evidence-sources" class="nav-next">Weiter: Evidenzquellen hinzufügen →</a>
  </nav>
  
</section>
```

---

## 🎓 Zusammenfassung

**Die 10 wichtigsten Regeln:**

1. **Subtil-unterstützend**, nicht motivierend-ermunernd
2. **Kurze Sätze** (max. 20 Wörter)
3. **Imperativ** für Anweisungen
4. **Aktive Sprache** (keine Passiv-Konstruktionen)
5. **Keine Infantilisierung** ("ganz einfach", "kinderleicht")
6. **Terminologie** aus Entscheidungsliste verwenden
7. **Sprachauszeichnung** mit `lang`-Attribut
8. **Matroschka-Prinzip** beachten
9. **Level 1 in sich geschlossen** (Aufgabe erfüllbar)
10. **Konkret statt vage** ("Klicken Sie..." statt "Eventuell...")

---

**Version:** 1.0.0  
**Letzte Aktualisierung:** {{current_date}}
