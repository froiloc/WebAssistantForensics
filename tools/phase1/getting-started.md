# Getting Started: Section-Erstellung für WebAssistant Forensics

**Version:** 1.0.0  
**Erstellt:** 2025-10-28  
**Projekt:** WebAssistant Forensics - AXIOM Examine Guide  
**Zielgruppe:** KI-Agenten (Phase 1), Maintainer, Reviewer

---

## 📋 **INHALTSVERZEICHNIS**

1. [Einleitung & Zweck](#1-einleitung--zweck)
2. [Zielgruppe & Tonalität](#2-zielgruppe--tonalität)
3. [Matroschka-Prinzip im Detail](#3-matroschka-prinzip-im-detail)
4. [HTML-Struktur Best Practices](#4-html-struktur-best-practices)
5. [Terminologie-Nutzung](#5-terminologie-nutzung)
6. [Content-Type-Boxen richtig einsetzen](#6-content-type-boxen-richtig-einsetzen)
7. [Medien-Strategie in der Praxis](#7-medien-strategie-in-der-praxis)
8. [Barrierefreiheit (BFSG) - Do's & Don'ts](#8-barrierefreiheit-bfsg---dos--donts)
9. [Häufige Fehler vermeiden](#9-häufige-fehler-vermeiden)
10. [Die 10 Goldenen Regeln](#10-die-10-goldenen-regeln)

---

## 1. EINLEITUNG & ZWECK

### 1.1 Was ist dieses Dokument?

**Dieses Getting-Started-Dokument** ist Ihre zentrale Referenz für die **Erstellung hochwertiger HTML-Sections** in Phase 1. Es ergänzt das Prompt-Template (`prompt-phase1.md`) mit:

- **Praxisorientierten Beispielen** (Gut vs. Schlecht)
- **Stilistischen Richtlinien** (Tonalität, Formulierungen)
- **Code-Patterns** (Best Practices für HTML-Strukturen)
- **Häufigen Fehlern** (Was Sie vermeiden sollten)

### 1.2 Wie nutzen Sie dieses Dokument?

**Vor der Section-Erstellung:**
1. Lesen Sie Abschnitt 2 (Zielgruppe & Tonalität)
2. Verstehen Sie Abschnitt 3 (Matroschka-Prinzip)
3. Prägen Sie sich die "10 Goldenen Regeln" ein (Abschnitt 10)

**Während der Section-Erstellung:**
- Konsultieren Sie Abschnitt 4-8 bei spezifischen Fragen
- Nutzen Sie die Code-Beispiele als Vorlagen
- Prüfen Sie Abschnitt 9 (Häufige Fehler) regelmäßig

**Nach der Section-Erstellung:**
- Checkliste aus `prompt-phase1.md` Abschnitt 11.6 durchgehen
- Abschnitt 9 (Häufige Fehler) als finale Kontrolle

### 1.3 Wichtigste Prinzipien

1. **Einfachheit vor Vollständigkeit** - Zielgruppe hat niedrige IT-Kenntnisse
2. **Konsistenz über Kreativität** - Orientieren Sie sich an Vorgänger-Sections
3. **Praxis vor Theorie** - Keine akademischen Erklärungen
4. **Show, don't tell** - Medien statt lange Texte (wo sinnvoll)

---

## 2. ZIELGRUPPE & TONALITÄT

### 2.1 Primäre Zielgruppe

**IT-ferne Polizei-Ermittler:**
- Bildungsniveau: Mittlere Reife
- IT-Kenntnisse: Sehr niedrig bis mittel
- Kontext: Ermittlungsarbeit, keine IT-Ausbildung
- Bedarf: Praktische Anleitung, kein theoretisches Wissen
- Leseverständnis: Teilweise herausfordernd

**Das bedeutet konkret:**
- ❌ NICHT: "Der NTFS-Dateisystemtreiber allokiert Cluster..."
- ✅ SONDERN: "AXIOM findet gelöschte Dateien automatisch."

### 2.2 Sekundäre Zielgruppe

**Fortgeschrittene Ermittler (nur Level 3):**
- Wollen tieferes Verständnis
- Kenntnisse deutlich unter Bachelor-Niveau
- Kein Gesellenniveau vorausgesetzt

**Das bedeutet konkret:**
- Level 1-2: Für Primärzielgruppe optimieren
- Level 3: Erweiterte Details, aber **immer praxisnah**

### 2.3 Tonalität: Subtil-unterstützend, aber sachlich

#### ✅ **RICHTIG: Subtil-unterstützend**

```html
<p>Dieser Schritt erfordert besondere Sorgfalt, da eine falsche Einstellung 
   zu unvollständigen Ergebnissen führen kann.</p>
```

**Warum gut?**
- Sachlich formuliert
- Warnt vor Problemen
- Gibt keine Bewertung des Users

---

```html
<p>Der Export wurde erfolgreich erstellt. Sie finden die Datei im 
   angegebenen Ordner.</p>
```

**Warum gut?**
- Neutral formuliert
- Informativ
- Keine übertriebene Freude

---

```html
<aside class="hint-box">
  <p><strong>💡 Best Practice:</strong> Verwenden Sie aussagekräftige 
     Fallnamen nach dem Schema 'Jahr-Aktenzeichen-Beschreibung'.</p>
</aside>
```

**Warum gut?**
- Hilfreicher Hinweis
- Kein Befehlston
- Begründung implizit (Übersichtlichkeit)

---

#### ❌ **FALSCH: Motivierend-ermunernd**

```html
<p>Super gemacht! Sie haben den ersten Schritt erfolgreich abgeschlossen!</p>
```

**Warum schlecht?**
- Infantilisierend
- Übertrieben positiv
- Nicht angemessen für professionellen Kontext

---

```html
<p>Toll! Jetzt wird es spannend! 🎉</p>
```

**Warum schlecht?**
- Unprofessionell
- Zu enthusiastisch
- Emojis nur in Content-Type-Boxen erlaubt (nicht im Fließtext)

---

```html
<p>Sie schaffen das! Nur noch ein Klick!</p>
```

**Warum schlecht?**
- Bevormundend
- Unnötig motivierend
- Ermittler brauchen Anleitung, keine Ermutigung

---

#### ❌ **FALSCH: Zu technisch/akademisch**

```html
<p>Der AXIOM Processing Engine nutzt einen Multi-Threading-Ansatz zur 
   parallelisierten Analyse von Dateisystem-Metadaten unter Verwendung 
   von SQLite als Backend-Datenbank.</p>
```

**Warum schlecht?**
- Viel zu technisch für Zielgruppe
- Irrelevant für Anwender
- Keine praktische Handlungsanweisung

---

```html
<p>Die SHA-256-Hash-Funktion basiert auf dem Merkle-Damgård-Konstruktionsprinzip 
   und implementiert eine kryptographische Einwegfunktion...</p>
```

**Warum schlecht?**
- Akademisch
- Für Anwendung völlig irrelevant
- Zielgruppe benötigt nur: "Hash-Wert verifiziert Dateiintegrität"

---

### 2.4 Sprach-Niveau: Einfach & Klar

#### ✅ **RICHTIG: Kurze Sätze, klare Sprache**

```html
<p>Öffnen Sie das Menü Datei. Wählen Sie 'Neuer Fall'. 
   Geben Sie einen Fallnamen ein. Klicken Sie auf OK.</p>
```

**Warum gut?**
- Kurze Sätze (max. 15 Wörter)
- Klare Handlungsanweisungen
- Keine Verschachtelungen

---

```html
<p>Der Export dauert je nach Datenmenge zwischen 5 und 30 Minuten. 
   Sie können AXIOM währenddessen weiter nutzen.</p>
```

**Warum gut?**
- Konkrete Zeitangabe
- Praktische Information
- Verständlich formuliert

---

#### ❌ **FALSCH: Lange, verschachtelte Sätze**

```html
<p>Nachdem Sie, wie im vorherigen Schritt beschrieben, den Fall angelegt haben, 
   was voraussetzt, dass Sie die entsprechenden Berechtigungen besitzen und die 
   Software korrekt installiert ist, können Sie nun mit der Datenakquise beginnen, 
   wobei Sie beachten sollten, dass verschiedene Optionen zur Verfügung stehen.</p>
```

**Warum schlecht?**
- 46 Wörter in einem Satz
- Mehrfache Verschachtelungen
- Schwer verständlich

---

#### ❌ **FALSCH: Fachbegriffe ohne Erklärung**

```html
<p>Mounten Sie das Image im read-only-Modus und extrahieren Sie die 
   Artefakte via KAPE-Parser.</p>
```

**Warum schlecht?**
- "Mounten", "read-only", "Artefakte", "KAPE-Parser" ungeklärt
- Zielgruppe versteht nicht, was zu tun ist
- Kein Glossar-Link

---

### 2.5 Satzbau-Regeln

| Regel | Beschreibung | Beispiel |
|-------|--------------|----------|
| **Max. 15 Wörter** | Pro Satz maximal 15 Wörter | ✅ "Der Export dauert 10-20 Minuten." <br> ❌ "Der Export, je nach Datenmenge und Systemleistung, kann zwischen 10 und 20 Minuten dauern." |
| **Ein Gedanke** | Pro Satz nur eine Aussage | ✅ "Klicken Sie auf OK. Der Export startet." <br> ❌ "Klicken Sie auf OK und warten Sie, bis der Export startet, was einige Sekunden dauern kann." |
| **Aktiv statt Passiv** | Aktive Formulierungen bevorzugen | ✅ "AXIOM erstellt den Bericht automatisch." <br> ❌ "Der Bericht wird von AXIOM automatisch erstellt." |
| **Konkret statt vage** | Präzise Angaben machen | ✅ "Der Export dauert 10-20 Minuten." <br> ❌ "Der Export kann etwas dauern." |
| **Positiv formulieren** | Was tun, nicht was nicht tun | ✅ "Wählen Sie SSD-Speicher für beste Performance." <br> ❌ "Verwenden Sie keine langsamen Festplatten." |

---

## 3. MATROSCHKA-PRINZIP IM DETAIL

### 3.1 Das Grundprinzip verstehen

**Metapher:** Wie russische Matroschka-Puppen - **jedes Level enthält das vorherige plus mehr**.

```
Level 1 ⊆ Level 2 ⊆ Level 3

Level 1: Nur Schritte (Schnellübersicht)
Level 2: Level 1 + Best-Practice + Kontext
Level 3: Level 2 + Tiefe + Alternativen + Sonderfälle
```

**Kritisch:** Level 2 wiederholt Level 1 NICHT, sondern **erweitert** es!

---

### 3.2 Level 1: Schnellübersicht

#### **Zielgruppe & Use-Case**

**Wer nutzt Level 1?**
- Erfahrene Ermittler, die den Prozess kennen
- Schnelle Auffrischung vor Aufgabe
- Checkliste während Durchführung

**Was brauchen sie?**
- Nur die Schritte-Reihenfolge
- Kritische Warnungen
- Wichtigste UI-Screenshots

**Was brauchen sie NICHT?**
- Erklärungen ("warum?")
- Hintergründe
- Alternativen

---

#### **Level 1 Struktur (Pflicht-Elemente)**

```html
<div class="detail-level-1">
  
  <!-- 1. Überschrift (Pflicht) -->
  <h3 data-ref="{{section_id}}-heading-1">{{section_title}}</h3>
  
  <!-- 2. Nummerierte Schritte (Pflicht) -->
  <h4 data-ref="{{section_id}}-heading-2">Schritte</h4>
  <ol data-content-type="instruction">
    <li><strong>Schritt 1:</strong> Aktion 1</li>
    <li><strong>Schritt 2:</strong> Aktion 2</li>
    <li><strong>Schritt 3:</strong> Aktion 3</li>
  </ol>
  
  <!-- 3. Warnung (wenn kritisch) -->
  <aside class="warning-box" data-ref="{{section_id}}-warning-1" data-content-type="warning">
    <p><strong>🚨 Warnung:</strong> Text...</p>
  </aside>
  
  <!-- 4. Screenshot (1-2 wichtigste) -->
  <figure data-media-type="screenshot" data-ref="{{section_id}}-figure-1">
    <button class="media-help-trigger" 
            data-media-id="media-{{section_id}}-1"
            aria-label="Screenshot von Dialog anfordern">
      📷 Screenshot anfordern
    </button>
    <figcaption id="fig-{{section_id}}-1">Kurzbeschreibung</figcaption>
    <!-- MEDIA: Detaillierte Beschreibung -->
  </figure>
  
</div>
```

---

#### **Level 1 Beispiele: Gut vs. Schlecht**

##### ✅ **RICHTIG: Klar, präzise, minimal**

```html
<div class="detail-level-1">
  <h3 data-ref="axiom-case-creation-heading-1">Neuen Fall anlegen</h3>
  
  <h4 data-ref="axiom-case-creation-heading-2">Schritte</h4>
  <ol data-content-type="instruction">
    <li><strong>Schritt 1:</strong> Öffnen Sie Datei → Neuer Fall</li>
    <li><strong>Schritt 2:</strong> Geben Sie Fallnamen ein</li>
    <li><strong>Schritt 3:</strong> Wählen Sie Speicherort (SSD empfohlen)</li>
    <li><strong>Schritt 4:</strong> Klicken Sie auf OK</li>
  </ol>
  
  <aside class="warning-box" data-ref="axiom-case-creation-warning-1" data-content-type="warning">
    <p><strong>🚨 Warnung:</strong> Speichern Sie NIEMALS auf Netzwerklaufwerken. 
       Dies führt zu massiven Performance-Problemen.</p>
  </aside>
  
  <figure data-media-type="screenshot" data-ref="axiom-case-creation-figure-1">
    <button class="media-help-trigger" 
            data-media-id="media-axiom-case-creation-1"
            aria-label="Screenshot von New Case Dialog anfordern">
      📷 Screenshot anfordern
    </button>
    <figcaption id="fig-axiom-case-creation-1">New Case Dialog mit Fallnamen-Eingabe</figcaption>
    <!-- MEDIA: Screenshot von Datei → Neuer Fall Dialog, Fokus auf Fallnamen-Feld -->
  </figure>
</div>
```

**Warum gut?**
- Nur 4 Schritte, klar formuliert
- Eine Warnung (kritisch)
- Ein Screenshot (wichtigster Dialog)
- Keine Erklärungen (kommen in Level 2)

---

##### ❌ **FALSCH: Zu viele Erklärungen in Level 1**

```html
<div class="detail-level-1">
  <h3>Neuen Fall anlegen</h3>
  
  <p>In diesem Abschnitt lernen Sie, wie Sie in AXIOM Examine einen neuen 
     Fall anlegen. Dies ist der erste Schritt jeder Analyse und legt die 
     Grundlage für alle weiteren Arbeiten.</p>
  
  <h4>Schritte</h4>
  <ol data-content-type="instruction">
    <li><strong>Schritt 1:</strong> Öffnen Sie Datei → Neuer Fall. 
        Dieser Menüpunkt befindet sich in der oberen linken Ecke.</li>
    <li><strong>Schritt 2:</strong> Geben Sie einen Fallnamen ein. 
        Achten Sie darauf, einen aussagekräftigen Namen zu wählen, 
        z.B. nach dem Schema 'Jahr-Aktenzeichen-Beschreibung'.</li>
    <li><strong>Schritt 3:</strong> Wählen Sie einen Speicherort. 
        SSDs sind deutlich schneller als HDDs und sollten bevorzugt werden.</li>
  </ol>
  
  <p>Nach Abschluss dieser Schritte ist Ihr Fall angelegt und Sie können 
     mit der Datenakquise beginnen.</p>
</div>
```

**Warum schlecht?**
- Zu viele Erklärungen (gehören in Level 2)
- Schritte zu detailliert (Best-Practice gehört in Level 2)
- Einleitung und Abschluss unnötig (Level 1 ist Checkliste)
- Keine `data-ref` Attribute bei Überschriften

---

##### ❌ **FALSCH: Fehlende Pflicht-Elemente**

```html
<div class="detail-level-1">
  <h3>Neuen Fall anlegen</h3>
  
  <p>Klicken Sie auf Datei → Neuer Fall, geben Sie einen Namen ein 
     und speichern Sie den Fall.</p>
</div>
```

**Warum schlecht?**
- Keine nummerierte Schritte-Liste (Pflicht!)
- Keine `data-content-type="instruction"` (Pflicht!)
- Keine Überschrift "Schritte" (Pflicht!)
- Kein Screenshot (Pflicht für Level 1)
- Keine `data-ref` Attribute

---

### 3.3 Level 2: Best-Practice (Standard)

#### **Zielgruppe & Use-Case**

**Wer nutzt Level 2?**
- Normale Ermittler (Hauptzielgruppe)
- Wollen es "richtig" machen
- Brauchen Kontext und Begründungen

**Was brauchen sie zusätzlich zu Level 1?**
- Kurze Erklärungen (1-2 Sätze pro Schritt)
- Kontextualisierung (Einleitung: "Worum geht's?")
- Best-Practice-Hinweise
- Mehr Screenshots (3-5)
- Cross-References zu verwandten Themen

**Was brauchen sie NICHT?**
- Technische Hintergründe (kommen in Level 3)
- Sonderfälle (kommen in Level 3)
- Alternative Ansätze (kommen in Level 3)

---

#### **Level 2 Struktur (Erweitert Level 1)**

```html
<div class="detail-level-2">
  
  <!-- Level 2 WIEDERHOLT NICHT Level 1, sondern ERWEITERT -->
  
  <!-- 1. Einleitung & Kontext (Pflicht) -->
  <p data-content-type="introduction">
    Diese Section behandelt {{short_description}}. Sie lernen, {{learning_objective}}.
  </p>
  
  <!-- 2. Vorbereitung (wenn Prerequisites vorhanden) -->
  <h4 data-ref="{{section_id}}-heading-3">Vorbereitung</h4>
  <p data-content-type="background">
    Bevor Sie starten, stellen Sie sicher, dass {{prerequisites}}.
  </p>
  
  <!-- 3. Erklärungen zu den Schritten (Pflicht) -->
  <h4 data-ref="{{section_id}}-heading-4">Erklärungen zu den Schritten</h4>
  <dl data-content-type="explanation">
    <dt><strong>Zu Schritt 1 (Datei → Neuer Fall):</strong></dt>
    <dd>Dieser Dialog ist der Startpunkt jeder Analyse. AXIOM legt hier die 
        Projektstruktur an.</dd>
    
    <dt><strong>Zu Schritt 2 (Fallname):</strong></dt>
    <dd>Verwenden Sie ein Schema wie 'Jahr-Aktenzeichen-Beschreibung' für 
        bessere Übersicht.</dd>
  </dl>
  
  <!-- 4. Best-Practice-Hinweis (1-2 Stück) -->
  <aside class="hint-box" data-ref="{{section_id}}-hint-1" data-content-type="hint">
    <p><strong>💡 Best Practice:</strong> Verwenden Sie aussagekräftige 
       Fallnamen ohne Sonderzeichen.</p>
  </aside>
  
  <!-- 5. Weitere Screenshots (2-4 zusätzlich) -->
  <figure data-media-type="annotated" data-ref="{{section_id}}-figure-2">
    <button class="media-help-trigger" 
            data-media-id="media-{{section_id}}-2"
            aria-label="Annotierter Screenshot von Case Settings anfordern">
      📷 Annotierter Screenshot anfordern
    </button>
    <figcaption id="fig-{{section_id}}-2">Case Settings mit Markierungen</figcaption>
    <!-- MEDIA: Screenshot mit roten Pfeilen zu wichtigen Feldern -->
  </figure>
  
  <!-- 6. Weiterführende Informationen (wenn Cross-References vorhanden) -->
  <h4 data-ref="{{section_id}}-heading-5">Weiterführende Informationen</h4>
  <ul>
    <li>
      <a href="#axiom-installation" data-ref-target="axiom-installation">
        AXIOM Installation
      </a> – Voraussetzungen für Fall-Erstellung
    </li>
    <li>
      <a href="#axiom-database-config" data-ref-target="axiom-database-config">
        Datenbank-Konfiguration
      </a> – Optimierung für große Fälle
    </li>
  </ul>
  
</div>
```

---

#### **Level 2 Beispiele: Gut vs. Schlecht**

##### ✅ **RICHTIG: Erweitert Level 1 sinnvoll**

```html
<div class="detail-level-2">
  <p data-content-type="introduction">
    Diese Section behandelt das Anlegen eines neuen Falls in AXIOM Examine. 
    Sie lernen, wie Sie einen Fall korrekt strukturieren und benennen.
  </p>
  
  <h4 data-ref="axiom-case-creation-heading-3">Erklärungen zu den Schritten</h4>
  <dl data-content-type="explanation">
    <dt><strong>Zu Schritt 1 (Datei → Neuer Fall):</strong></dt>
    <dd>Dieser Dialog ist der Startpunkt jeder Analyse. AXIOM legt hier 
        die Projektstruktur an, einschließlich Datenbank und Metadaten-Ordner.</dd>
    
    <dt><strong>Zu Schritt 2 (Fallname):</strong></dt>
    <dd>Der Fallname wird als Dateiname verwendet. Verwenden Sie ein Schema 
        wie '2024-AZ123-Betrug' für bessere Übersicht im Dateisystem.</dd>
    
    <dt><strong>Zu Schritt 3 (Speicherort - SSD empfohlen):</strong></dt>
    <dd>SSDs beschleunigen die Analyse um das 3-5-fache im Vergleich zu 
        mechanischen Festplatten. Bei großen Fällen (>100 GB) ist dies essentiell.</dd>
  </dl>
  
  <aside class="hint-box" data-ref="axiom-case-creation-hint-1" data-content-type="hint">
    <p><strong>💡 Best Practice:</strong> Verwenden Sie aussagekräftige Fallnamen 
       ohne Sonderzeichen (<code>&lt; &gt; : " / \ | ? *</code>). Diese werden 
       von Windows im Dateinamen nicht unterstützt.</p>
  </aside>
  
  <figure data-media-type="annotated" data-ref="axiom-case-creation-figure-2">
    <button class="media-help-trigger" 
            data-media-id="media-axiom-case-creation-2"
            aria-label="Annotierter Screenshot von Case Settings anfordern">
      📷 Annotierter Screenshot anfordern
    </button>
    <figcaption id="fig-axiom-case-creation-2">
      Case Settings mit Markierungen der wichtigsten Optionen
    </figcaption>
    <!-- MEDIA: Screenshot von Case Settings, rote Pfeile zu "Database Location" 
         und "Case Name", Auflösung 1920x1080 -->
  </figure>
  
  <h4 data-ref="axiom-case-creation-heading-5">Weiterführende Informationen</h4>
  <ul>
    <li>
      <a href="#axiom-database-config" data-ref-target="axiom-database-config">
        Datenbank-Konfiguration
      </a> – Optimierung für große Fälle über 500 GB
    </li>
    <li>
      <a href="#axiom-case-templates" data-ref-target="axiom-case-templates">
        Case Templates verwenden
      </a> – Vordefinierte Einstellungen für häufige Szenarien
    </li>
  </ul>
</div>
```

**Warum gut?**
- Einleitung gibt Kontext
- Erklärungen zu jedem Schritt (1-2 Sätze)
- Best-Practice-Hinweis konkret
- Annotierter Screenshot zeigt wichtige Felder
- Cross-References sinnvoll gewählt

---

##### ❌ **FALSCH: Wiederholt Level 1 statt zu erweitern**

```html
<div class="detail-level-2">
  <h4>Schritte (nochmal im Detail)</h4>
  <ol>
    <li><strong>Schritt 1:</strong> Öffnen Sie Datei → Neuer Fall</li>
    <li><strong>Schritt 2:</strong> Geben Sie Fallnamen ein</li>
    <li><strong>Schritt 3:</strong> Wählen Sie Speicherort</li>
    <li><strong>Schritt 4:</strong> Klicken Sie auf OK</li>
  </ol>
  
  <p>Jetzt ist Ihr Fall angelegt.</p>
</div>
```

**Warum schlecht?**
- Wiederholt Level 1 komplett (FALSCH!)
- Keine Erklärungen (Level 2 muss erklären!)
- Keine Best-Practice-Hinweise
- Keine Cross-References
- Kein Mehrwert gegenüber Level 1

---

##### ❌ **FALSCH: Zu technisch für Level 2**

```html
<div class="detail-level-2">
  <h4>Technische Hintergründe</h4>
  <p>AXIOM erstellt intern eine SQLite-Datenbank im gewählten Speicherort. 
     Der Fallname wird als Dateiname verwendet, wobei ungültige Zeichen 
     (< > : " / \ | ? *) automatisch entfernt werden. Die Datenbank verwendet 
     das WAL-Modus (Write-Ahead-Logging) für bessere Performance bei 
     gleichzeitigen Schreib- und Lesezugriffen. Bei großen Fällen (>500 GB) 
     kann die Datenbank mehrere Gigabyte groß werden, was bei SSD-Speicher 
     keine Probleme bereitet, bei mechanischen Festplatten jedoch zu 
     Fragmentierung führen kann.</p>
</div>
```

**Warum schlecht?**
- Viel zu technisch (SQLite, WAL-Modus, Fragmentierung)
- Irrelevant für Hauptzielgruppe
- Gehört in Level 3 (wenn überhaupt)
- Keine praktische Handlungsanweisung

---

### 3.4 Level 3: Vollständige Tiefe (Detailliert)

#### **Zielgruppe & Use-Case**

**Wer nutzt Level 3?**
- Fortgeschrittene Ermittler
- Wollen alle Optionen verstehen
- Brauchen tieferes Verständnis für Sonderfälle

**Was brauchen sie zusätzlich zu Level 2?**
- Technische Hintergründe (5-10 Sätze, **praxisnah**)
- Alle Einstellungen erklärt
- Sonderfälle / Edge Cases
- Alternative Ansätze (mit Vor-/Nachteilen)
- Mehr Medien (5+ Screenshots, Videos)

**Was brauchen sie NICHT?**
- Akademische Theorien
- Quellenangaben zu Forschungspapieren
- Implementierungsdetails der Software

---

#### **Level 3 Struktur (Erweitert Level 2)**

```html
<div class="detail-level-3">
  
  <!-- 1. Technische Hintergründe (5-10 Sätze, praxisnah) -->
  <h4 data-ref="{{section_id}}-heading-6">Hintergründe (Detail-Level 3)</h4>
  <p data-content-type="background">
    AXIOM erstellt intern eine SQLite-Datenbank im gewählten Speicherort. 
    Der Fallname wird als Dateiname verwendet, wobei ungültige Zeichen 
    automatisch entfernt werden. Die Datenbank speichert alle Metadaten, 
    Artefakte und Analyseresultate. Bei großen Fällen (>500 GB) kann die 
    Datenbank mehrere Gigabyte groß werden. SSD-Speicher ist hier essentiell, 
    da mechanische Festplatten zu 3-5x langsameren Analysezeiten führen.
  </p>
  
  <!-- 2. Erweiterte Einstellungen -->
  <h5 data-ref="{{section_id}}-heading-7">Erweiterte Einstellungen</h5>
  <dl data-content-type="explanation">
    <dt><strong>Speicherort-Wahl:</strong></dt>
    <dd>Wählen Sie SSDs für beste Performance. Mechanische Festplatten (HDD) 
        führen zu 3-5x langsameren Analysezeiten bei großen Fällen (>200 GB).</dd>
    
    <dt><strong>Fallnamen-Beschränkungen:</strong></dt>
    <dd>Maximale Länge: 255 Zeichen. Beachten Sie das Windows-Pfadlimit 
        (260 Zeichen) bei tiefer Ordnerstruktur.</dd>
    
    <dt><strong>Datenbank-Konfiguration:</strong></dt>
    <dd>AXIOM optimiert die Datenbank automatisch. Manuelle Konfiguration 
        ist nur bei extrem großen Fällen (>1 TB) notwendig.</dd>
  </dl>
  
  <!-- 3. Alternative Ansätze (mit Vor-/Nachteilen) -->
  <h5 data-ref="{{section_id}}-heading-8">Alternative Ansätze</h5>
  <ul data-content-type="background">
    <li>
      <strong>Case-Templates verwenden:</strong> Vordefinierte Einstellungen 
      für häufige Szenarien.
      <br>✅ Vorteil: Schnellerer Start, konsistente Einstellungen über Fälle
      <br>❌ Nachteil: Weniger Flexibilität für Sonderfälle
    </li>
    <li>
      <strong>Netzwerk-Share:</strong> Fall auf Netzlaufwerk speichern 
      (NICHT empfohlen für aktive Analyse).
      <br>✅ Vorteil: Zentrales Backup, Zugriff von mehreren Workstations
      <br>❌ Nachteil: 5-10x langsamere Performance, Risiko bei Netzwerkausfall
    </li>
  </ul>
  
  <!-- 4. Sonderfälle / Edge Cases -->
  <h5 data-ref="{{section_id}}-heading-9">Sonderfälle</h5>
  <p data-content-type="background">
    <strong>Sehr lange Pfade (>200 Zeichen):</strong> Verkürzen Sie die 
    Ordnerstruktur oder verwenden Sie symbolische Links (mklink /D).
  </p>
  <p data-content-type="background">
    <strong>Nicht-lateinische Zeichen im Fallnamen:</strong> Bei kyrillischen, 
    arabischen oder asiatischen Zeichen kann es zu Anzeigefehlern in Berichten 
    kommen. Verwenden Sie ASCII-Zeichen für maximale Kompatibilität.
  </p>
  <p data-content-type="background">
    <strong>Mehrere Fälle gleichzeitig:</strong> AXIOM kann parallel mehrere 
    Fälle öffnen, aber nur einer kann aktiv analysiert werden. Begrenzen Sie 
    auf 2-3 offene Fälle pro Workstation.
  </p>
  
  <!-- 5. Video (wenn Workflow komplex) -->
  <figure data-media-type="video" data-ref="{{section_id}}-figure-3">
    <button class="media-help-trigger" 
            data-media-id="media-{{section_id}}-video1"
            aria-label="Video von Fall-Erstellung Workflow anfordern">
      🎥 Video anfordern
    </button>
    <figcaption id="fig-{{section_id}}-video1">
      Video: Vollständiger Workflow der Fall-Erstellung (2 Minuten)
    </figcaption>
    <!-- MEDIA: Screencast zeigt kompletten Workflow von Datei → Neuer Fall 
         bis fertiger Case mit allen Einstellungen (ca. 2 Min) -->
  </figure>
  
</div>
```

---

#### **Level 3 Beispiele: Gut vs. Schlecht**

##### ✅ **RICHTIG: Praxisnahe Tiefe ohne Akademismus**

```html
<div class="detail-level-3">
  <h4 data-ref="axiom-case-creation-heading-6">Hintergründe (Detail-Level 3)</h4>
  <p data-content-type="background">
    AXIOM erstellt intern eine SQLite-Datenbank im gewählten Speicherort. 
    Der Fallname wird als Dateiname verwendet, wobei ungültige Zeichen 
    (< > : " / \ | ? *) automatisch entfernt werden. Die Datenbank speichert 
    alle Metadaten, Artefakte und Analyseresultate. Bei großen Fällen (>500 GB) 
    kann die Datenbank mehrere Gigabyte groß werden. SSD-Speicher ist hier 
    essentiell, da mechanische Festplatten zu 3-5x langsameren Analysezeiten führen.
  </p>
  
  <h5 data-ref="axiom-case-creation-heading-7">Erweiterte Einstellungen</h5>
  <dl data-content-type="explanation">
    <dt><strong>Speicherort-Wahl:</strong></dt>
    <dd>Wählen Sie SSDs für beste Performance. Mechanische Festplatten (HDD) 
        führen zu 3-5x langsameren Analysezeiten bei großen Fällen (>200 GB). 
        NVMe-SSDs sind optimal für Fälle über 1 TB.</dd>
    
    <dt><strong>Fallnamen-Beschränkungen:</strong></dt>
    <dd>Maximale Länge: 255 Zeichen. Beachten Sie das Windows-Pfadlimit 
        (260 Zeichen) bei tiefer Ordnerstruktur. Beispiel: 
        C:\Cases\2024\Q1\Betrug\... lässt nur 200 Zeichen für Fallname.</dd>
  </dl>
  
  <h5 data-ref="axiom-case-creation-heading-8">Alternative Ansätze</h5>
  <ul data-content-type="background">
    <li>
      <strong>Case-Templates verwenden:</strong> Vordefinierte Einstellungen 
      für häufige Szenarien (Mobilgeräte, Computer, Cloud-Daten).
      <br>✅ Vorteil: Schnellerer Start (5-10 Min gespart), konsistente Einstellungen
      <br>❌ Nachteil: Weniger Flexibilität, nicht alle Optionen anpassbar
    </li>
    <li>
      <strong>Netzwerk-Share:</strong> Fall auf Netzlaufwerk speichern 
      (NICHT empfohlen für aktive Analyse).
      <br>✅ Vorteil: Zentrales Backup, Zugriff von mehreren Workstations
      <br>❌ Nachteil: 5-10x langsamere Performance, Risiko bei Netzwerkausfall, 
      SQLite-Locking-Probleme möglich
    </li>
  </ul>
  
  <h5 data-ref="axiom-case-creation-heading-9">Sonderfälle</h5>
  <p data-content-type="background">
    <strong>Sehr lange Pfade (>200 Zeichen):</strong> Windows hat ein Limit 
    von 260 Zeichen für vollständige Pfade. Falls Ihr Fall in einer tiefen 
    Ordnerstruktur liegt, verkürzen Sie die Ordnernamen oder verwenden Sie 
    symbolische Links: <code>mklink /D C:\Cases\Short C:\Very\Long\Path\2024\Q1</code>
  </p>
  <p data-content-type="background">
    <strong>Nicht-lateinische Zeichen im Fallnamen:</strong> Kyrillische, 
    arabische oder asiatische Zeichen werden von AXIOM unterstützt, können aber 
    in exportierten Berichten (PDF, HTML) zu Kodierungsproblemen führen. 
    Verwenden Sie ASCII-Zeichen für maximale Kompatibilität mit Drittsystemen.
  </p>
</div>
```

**Warum gut?**
- Technische Details, aber praxisnah formuliert
- Konkrete Zahlen (3-5x langsamer, 255 Zeichen, 260 Zeichen Limit)
- Alternative Ansätze mit echten Vor-/Nachteilen
- Sonderfälle mit konkreten Lösungen (<code>mklink</code>-Befehl)
- Keine akademischen Theorien

---

##### ❌ **FALSCH: Zu akademisch/theoretisch**

```html
<div class="detail-level-3">
  <h4>Technische Hintergründe</h4>
  <p>SQLite ist eine eingebettete relationale Datenbank, die das ACID-Prinzip 
     (Atomicity, Consistency, Isolation, Durability) implementiert. Die 
     Datenbank verwendet B-Tree-Indizes für effiziente Abfragen und 
     implementiert einen Write-Ahead-Log (WAL) für verbesserte Concurrency. 
     Die theoretische Maximalgröße beträgt 281 TB, praktisch limitiert durch 
     das Dateisystem (NTFS: 16 EB, FAT32: 4 GB). SQLite wurde von D. Richard 
     Hipp entwickelt und ist Public Domain Software gemäß Blessing-Lizenz.</p>
</div>
```

**Warum schlecht?**
- Viel zu akademisch (ACID-Prinzip, B-Tree, Public Domain)
- Irrelevant für Anwender (281 TB Limit)
- Keine praktische Handlungsanweisung
- Zielgruppe versteht das nicht und braucht es auch nicht

---

##### ❌ **FALSCH: Keine Sonderfälle behandelt**

```html
<div class="detail-level-3">
  <h4>Weitere Details</h4>
  <p>Es gibt keine besonderen Sonderfälle zu beachten. Die Standardeinstellungen 
     funktionieren in allen Szenarien optimal.</p>
</div>
```

**Warum schlecht?**
- Level 3 MUSS Sonderfälle behandeln
- "Standardeinstellungen funktionieren immer" ist unrealistisch
- Kein Mehrwert für fortgeschrittene Nutzer

---

### 3.5 Checkliste: Level-Abgrenzung richtig?

| Level | Inhalt | Prüffrage |
|-------|--------|-----------|
| **Level 1** | Nur Schritte, Warnungen, 1-2 Screenshots | Hat Level 1 KEINE Erklärungen? ✅ |
| **Level 2** | Level 1 + Erklärungen (1-2 Sätze), Best-Practice, 3-5 Screenshots | Erweitert Level 2 Level 1 (statt zu wiederholen)? ✅ |
| **Level 3** | Level 2 + Hintergründe (5-10 Sätze), Sonderfälle, Alternativen | Sind Hintergründe praxisnah (nicht akademisch)? ✅ |

---

## 4. HTML-STRUKTUR BEST PRACTICES

### 4.1 Attribut-Reihenfolge (Pflicht)

**Regel:** `class` → `id` → `data-*` → sonstige

```html
<!-- ✅ RICHTIG -->
<section class="content-section"
         id="section-axiom-installation"
         data-section="axiom-installation"
         data-level="3"
         data-parent="axiom-basics"
         lang="de">

<!-- ❌ FALSCH (falsche Reihenfolge) -->
<section id="section-axiom-installation"
         data-section="axiom-installation"
         class="content-section"
         lang="de">
```

---

### 4.2 Formatierung & Einrückung

**Regel:** 4 Spaces Einrückung, mehrzeilig ab >3 Attributen

```html
<!-- ✅ RICHTIG (2 Attribute → einzeilig) -->
<p class="intro" data-content-type="introduction">Text</p>

<!-- ✅ RICHTIG (5 Attribute → mehrzeilig) -->
<button class="media-help-trigger" 
        data-media-id="media-axiom-installation-1"
        data-media-src="media/screenshots/install-wizard.png"
        data-media-alt="Screenshot vom AXIOM Installations-Wizard"
        aria-label="Screenshot von Installations-Wizard anfordern">
  📷 Screenshot anfordern
</button>

<!-- ❌ FALSCH (5 Attribute einzeilig = unleserlich) -->
<button class="media-help-trigger" data-media-id="media-axiom-installation-1" data-media-src="media/screenshots/install-wizard.png" data-media-alt="Screenshot vom AXIOM Installations-Wizard" aria-label="Screenshot von Installations-Wizard anfordern">📷 Screenshot anfordern</button>
```

---

### 4.3 data-ref Pflicht für Navigation

**Regel:** Alle Überschriften, Figures, Content-Type-Boxen MÜSSEN `data-ref` haben

```html
<!-- ✅ RICHTIG -->
<h3 data-ref="axiom-installation-heading-1">AXIOM Installation</h3>
<h4 data-ref="axiom-installation-heading-2">Systemanforderungen</h4>

<figure data-media-type="screenshot" data-ref="axiom-installation-figure-1">
  ...
</figure>

<aside class="warning-box" data-ref="axiom-installation-warning-1">
  ...
</aside>

<!-- ❌ FALSCH (data-ref fehlt) -->
<h3>AXIOM Installation</h3>
<figure data-media-type="screenshot">
  ...
</figure>
```

---

### 4.4 data-content-type für Semantik

**Regel:** Verwenden Sie semantische Marker für Content-Typen

| Element | data-content-type | Bedeutung |
|---------|-------------------|-----------|
| `<ol>` | `instruction` | Schritt-für-Schritt-Anleitung |
| `<p>` | `introduction` | Einleitung einer Section |
| `<p>` | `background` | Hintergrundinformationen |
| `<dl>` | `explanation` | Erklärungen zu Schritten |
| `<ul>` | `background` | Listen mit Hintergrundinformationen |
| `<aside>` | `warning/hint/note/caution` | Content-Type-Boxen |

```html
<!-- ✅ RICHTIG -->
<p data-content-type="introduction">Diese Section behandelt...</p>

<ol data-content-type="instruction">
  <li><strong>Schritt 1:</strong> ...</li>
</ol>

<dl data-content-type="explanation">
  <dt><strong>Zu Schritt 1:</strong></dt>
  <dd>Erklärung...</dd>
</dl>

<p data-content-type="background">Technische Hintergründe...</p>
```

---

## 5. TERMINOLOGIE-NUTZUNG

### 5.1 Terminologie-Entscheidungsliste konsultieren

**Pflicht:** Vor Verwendung eines Begriffs Liste prüfen!

**Workflow:**
1. Begriff in Liste suchen (Strg+F)
2. Wenn gefunden → Entscheidung übernehmen
3. Wenn nicht gefunden → Terminologie-Strategie anwenden
4. Neue Entscheidung dokumentieren (Status: "Proposed")

---

### 5.2 Deutsche vs. Englische Begriffe

#### **Präferenz: DE (Deutsche Übersetzung verwenden)**

```html
<!-- ✅ RICHTIG -->
<p>Erstellen Sie eine <strong>Abfrage</strong> im Artifacts Explorer.</p>
<p>Der <strong>Bericht</strong> wird im PDF-Format exportiert.</p>
<p>Verwenden Sie eine <strong>Vorlage</strong> für schnelleren Start.</p>

<!-- ❌ FALSCH -->
<p>Erstellen Sie eine <strong>Query</strong> im Artifacts Explorer.</p>
<p>Der <strong>Report</strong> wird im PDF-Format exportiert.</p>
```

**Begründung:** Deutscher Begriff existiert und ist verständlicher für Zielgruppe.

---

#### **Präferenz: EN (Englischer Begriff beibehalten)**

```html
<!-- ✅ RICHTIG -->
<p>Öffnen Sie den <span lang="en">Artifacts Explorer</span>.</p>
<p>Das <span lang="en">Case Dashboard</span> zeigt die Übersicht.</p>
<p>Die <span lang="en">Timeline</span> visualisiert zeitliche Abläufe.</p>

<!-- ❌ FALSCH -->
<p>Öffnen Sie den <strong>Artefakte-Explorer</strong>.</p>
<p>Das <strong>Fall-Übersichtsfenster</strong> zeigt die Übersicht.</p>
```

**Begründung:** 
- UI-Elemente der Software (Orientierung für Nutzer)
- Kein etablierter deutscher Begriff

**WICHTIG:** Englische Begriffe MÜSSEN mit `<span lang="en">` ausgezeichnet werden (BFSG-Pflicht)!

---

#### **Kontextabhängig**

```html
<!-- ✅ RICHTIG (UI-Element → EN) -->
<p>Öffnen Sie die <span lang="en">Processing Engine</span>.</p>

<!-- ✅ RICHTIG (Tätigkeit → DE) -->
<p>Die Verarbeitung der Daten dauert 10-20 Minuten.</p>

<!-- ❌ FALSCH (inkonsistent) -->
<p>Die <span lang="en">Processing</span> der Daten dauert 10-20 Minuten.</p>
```

---

### 5.3 Neue Begriffe dokumentieren

**Workflow:**

1. Begriff ist nicht in Liste → Entscheidung treffen
2. Begründung formulieren
3. Am Ende der Section dokumentieren:

```html
<!-- TERMINOLOGY-PROPOSAL: 
     Begriff: "Prüfsumme" (DE) / "Checksum" (EN)
     Entscheidung: Präferenz DE
     Begründung: Deutsche Übersetzung verständlicher als "Checksum", 
                 aber "Hash-Wert" für kryptographische Hashes
     Kategorie: Forensik-Fachbegriff
     Kontext: Dateiintegrität, Verifikation
     Status: Proposed
-->
```

---

## 6. CONTENT-TYPE-BOXEN RICHTIG EINSETZEN

### 6.1 Die 6 Box-Typen

| Box-Typ | Wann verwenden | Beispiel |
|---------|----------------|----------|
| `warning-box` | Kritische Warnungen (Datenverlust, schwere Fehler) | "🚨 Warnung: Speichern Sie NIEMALS auf Netzwerklaufwerken" |
| `hint-box` | Best-Practice-Hinweise | "💡 Best Practice: Verwenden Sie SSD-Speicher" |
| `note-box` | Zusatzinformationen | "ℹ️ Hinweis: Dieser Vorgang dauert 10-20 Minuten" |
| `caution-box` | Vorsichtshinweise (nicht kritisch) | "⚠️ Vorsicht: Große Dateien können Export verlangsamen" |
| `example-box` | Praktische Beispiele | "📝 Beispiel: '2024-AZ123-Betrug'" |
| `definition-box` | Begriffserklärungen | "📖 Definition: Hash-Wert = digitaler Fingerabdruck" |

---

### 6.2 Entscheidungsbaum

```
Ist es kritisch (Datenverlust / schwerwiegender Fehler)?
├─ JA → warning-box
└─ NEIN
    ├─ Ist es ein Best-Practice-Hinweis? → hint-box
    ├─ Ist es eine Zusatzinformation? → note-box
    ├─ Ist es ein Vorsichtshinweis? → caution-box
    ├─ Ist es ein Beispiel? → example-box
    └─ Ist es eine Definition? → definition-box
```

---

### 6.3 Beispiele: Gut vs. Schlecht

#### ✅ **RICHTIG: warning-box für kritische Warnungen**

```html
<aside class="warning-box" data-ref="axiom-export-warning-1" data-content-type="warning">
  <p><strong>🚨 Warnung:</strong> Löschen Sie NIEMALS Dateien aus dem Case-Ordner 
     während AXIOM läuft. Dies führt zu Datenbank-Korruption und Datenverlust.</p>
</aside>
```

**Warum gut?**
- Kritischer Fehler (Datenverlust)
- Klare Formulierung
- Emoji 🚨 zuerst (visuelle Auffälligkeit)

---

#### ✅ **RICHTIG: hint-box für Best-Practice**

```html
<aside class="hint-box" data-ref="axiom-case-naming-hint-1" data-content-type="hint">
  <p><strong>💡 Best Practice:</strong> Verwenden Sie Fallnamen nach dem Schema 
     'Jahr-Aktenzeichen-Beschreibung' (z.B. '2024-AZ123-Betrug'). Dies verbessert 
     die Übersicht im Dateisystem erheblich.</p>
</aside>
```

**Warum gut?**
- Best-Practice-Hinweis (nicht kritisch)
- Konkretes Beispiel gegeben
- Begründung vorhanden ("verbessert Übersicht")

---

#### ✅ **RICHTIG: note-box für Zusatzinfo**

```html
<aside class="note-box" data-ref="axiom-processing-note-1" data-content-type="note">
  <p><strong>ℹ️ Hinweis:</strong> Die Verarbeitung dauert je nach Datenmenge 
     zwischen 10 und 60 Minuten. Sie können AXIOM währenddessen weiter nutzen.</p>
</aside>
```

**Warum gut?**
- Reine Information (kein Fehler, kein Best-Practice)
- Zeitrahmen konkret
- Praktischer Hinweis (Software weiter nutzbar)

---

#### ❌ **FALSCH: warning-box für nicht-kritische Info**

```html
<aside class="warning-box">
  <p><strong>🚨 Warnung:</strong> Dieser Vorgang kann einige Minuten dauern.</p>
</aside>
```

**Warum schlecht?**
- Nicht kritisch → sollte note-box sein
- "Warnung" inflationiert (User ignoriert echte Warnungen)
- Keine Konsequenz beschrieben

---

#### ❌ **FALSCH: hint-box für Definition**

```html
<aside class="hint-box">
  <p><strong>💡 Best Practice:</strong> Ein Hash-Wert ist ein digitaler 
     Fingerabdruck einer Datei.</p>
</aside>
```

**Warum schlecht?**
- Das ist eine Definition, keine Best-Practice
- Sollte definition-box sein
- Emoji 💡 passt nicht zu Definition

---

### 6.4 Maximale Anzahl pro Section

**Regel:** Nicht mehr als 3-4 Content-Type-Boxen pro Section

```html
<!-- ✅ RICHTIG (3 Boxen, verschiedene Typen) -->
<aside class="warning-box">...</aside>
<aside class="hint-box">...</aside>
<aside class="note-box">...</aside>

<!-- ❌ FALSCH (7 Boxen = zu viel) -->
<aside class="warning-box">...</aside>
<aside class="warning-box">...</aside>
<aside class="hint-box">...</aside>
<aside class="hint-box">...</aside>
<aside class="note-box">...</aside>
<aside class="caution-box">...</aside>
<aside class="example-box">...</aside>
```

**Begründung:** Zu viele Boxen → User scrollt vorbei, ignoriert sie

---

## 7. MEDIEN-STRATEGIE IN DER PRAXIS

### 7.1 Medien-Typen Entscheidungsbaum

```
Muss visuell unterstützt werden?
│
├─ NEIN → Kein Medium
│
└─ JA → Weiter
    │
    ├─ Ist es ein EINZELNES UI-ELEMENT?
    │  (z.B. "Button X ist hier")
    │  └─ JA → SCREENSHOT
    │
    ├─ Ist es eine KOMPLEXE UI mit mehreren Bereichen?
    │  (z.B. "Diese 3 Einstellungen prüfen")
    │  └─ JA → ANNOTIERTER SCREENSHOT
    │
    ├─ Ist es eine ABFOLGE VON SCHRITTEN?
    │  (z.B. "Menü → Option → Dialog")
    │  └─ JA → Prüfe Komplexität:
    │      ├─ 2-3 einfache Schritte → ANNOTIERTER SCREENSHOT
    │      └─ 4+ Schritte ODER zeitkritisch → VIDEO (15-30 Sek.)
    │
    └─ Ist es ein KONZEPT/WORKFLOW?
       (z.B. "Überblick Report-Prozess")
       └─ JA → DIAGRAMM
```

---

### 7.2 Screenshot vs. Annotierter Screenshot

#### **Screenshot (einfach)**

**Wann verwenden:**
- Einzelnes UI-Element zeigen
- Eindeutige Position
- Keine Verwechslungsgefahr

```html
<figure data-media-type="screenshot" data-ref="axiom-menu-figure-1">
  <button class="media-help-trigger" 
          data-media-id="media-axiom-menu-1"
          aria-label="Screenshot von Datei-Menü anfordern">
    📷 Screenshot anfordern
  </button>
  <figcaption id="fig-axiom-menu-1">
    Datei-Menü mit 'Neuer Fall' Option
  </figcaption>
  <!-- MEDIA: Screenshot von Datei-Menü, 'Neuer Fall' hervorgehoben, 
       Auflösung 1920x1080, Fokus auf Menü-Bereich -->
</figure>
```

---

#### **Annotierter Screenshot**

**Wann verwenden:**
- Mehrere relevante Bereiche
- Reihenfolge wichtig
- Verwechslungsgefahr hoch
- Element schwer zu finden

```html
<figure data-media-type="annotated" data-ref="axiom-settings-figure-2">
  <button class="media-help-trigger" 
          data-media-id="media-axiom-settings-2"
          aria-label="Annotierter Screenshot von Case Settings anfordern">
    📷 Annotierter Screenshot anfordern
  </button>
  <figcaption id="fig-axiom-settings-2">
    Case Settings mit Markierungen: (1) Database Location, 
    (2) Case Name, (3) Processing Options
  </figcaption>
  <!-- MEDIA: Screenshot von Case Settings Dialog, 
       rote Pfeile mit Nummern (1), (2), (3) zu den genannten Feldern, 
       Auflösung 1920x1080, vollständiger Dialog sichtbar -->
</figure>
```

---

### 7.3 Video verwenden

**Wann verwenden:**
- 4+ Schritte nacheinander
- Timing/Reihenfolge kritisch
- Dynamische UI-Änderungen (z.B. "Dialog erscheint", "Balken lädt")

**Maximale Länge:** 30 Sekunden (für Level 1-2), 2 Minuten (für Level 3)

```html
<figure data-media-type="video" data-ref="axiom-wizard-video-1">
  <button class="media-help-trigger" 
          data-media-id="media-axiom-wizard-video1"
          aria-label="Video vom Export-Wizard anfordern">
    🎥 Video anfordern
  </button>
  <figcaption id="fig-axiom-wizard-video1">
    Video: Export-Wizard Workflow (30 Sekunden)
  </figcaption>
  <!-- MEDIA: Screencast zeigt kompletten Export-Wizard: 
       1) Datei → Export, 2) Format wählen (PDF), 3) Optionen setzen, 
       4) Speicherort wählen, 5) Export starten, 6) Fortschrittsbalken, 
       7) Fertigmeldung. Dauer: ca. 30 Sek., Auflösung 1920x1080, 
       mit Cursor-Highlighting -->
</figure>
```

---

### 7.4 MEDIA-Kommentar Syntax (Pflicht)

**Format:**

```html
<!-- MEDIA: [TYP] [DETAILLIERTE BESCHREIBUNG] -->
```

**Pflicht-Bestandteile:**
1. **Was:** Was ist zu sehen? (Dialog, Menü, Fenster)
2. **Fokus:** Worauf soll Fokus liegen?
3. **Markierungen:** Welche Annotationen? (Pfeile, Nummern, Rahmen)
4. **Kontext:** Voraussetzungen (z.B. "Case bereits geladen")
5. **Technisch:** Auflösung, Ausschnitt

**Beispiele:**

```html
<!-- ✅ RICHTIG: Vollständig -->
<!-- MEDIA: Screenshot von Datei-Menü, 'Neuer Fall' hervorgehoben 
     (roter Rahmen), Kontext: Hauptfenster von AXIOM Examine, 
     Auflösung 1920x1080, Fokus auf Menü-Bereich oben links -->

<!-- ✅ RICHTIG: Annotiert mit Details -->
<!-- MEDIA: Annotierter Screenshot von Case Settings Dialog, 
     rote Pfeile mit Nummern (1), (2), (3) zu folgenden Feldern: 
     (1) Database Location (oben), (2) Case Name (Mitte), 
     (3) Processing Options (unten). Vollständiger Dialog sichtbar, 
     Auflösung 1920x1080 -->

<!-- ❌ FALSCH: Zu vage -->
<!-- MEDIA: Screenshot von AXIOM -->

<!-- ❌ FALSCH: Fehlt Auflösung -->
<!-- MEDIA: Screenshot von Case Settings -->
```

---

## 8. BARRIEREFREIHEIT (BFSG) - DO'S & DON'TS

### 8.1 Regel 1: Sprachauszeichnung

#### ✅ **RICHTIG: Alle fremdsprachigen Begriffe mit <span lang>**

```html
<p>Öffnen Sie den <span lang="en">Artifacts Explorer</span>.</p>
<p>Das <span lang="en">Case Dashboard</span> zeigt die Übersicht.</p>
<p>Verwenden Sie die <span lang="en">Timeline</span> zur Visualisierung.</p>
```

---

#### ❌ **FALSCH: Fremdsprachige Begriffe ohne <span lang>**

```html
<p>Öffnen Sie den Artifacts Explorer.</p>
<p>Das Case Dashboard zeigt die Übersicht.</p>
```

**Warum schlecht?**
- Screenreader erkennen Sprache nicht
- Deutsche Aussprache von englischen Wörtern
- Verletzt BFSG-Anforderungen

---

### 8.2 Regel 2: aria-label bei Medien (max. 120 Zeichen)

#### ✅ **RICHTIG: Kurz & präzise (unter 120 Zeichen)**

```html
<button class="media-help-trigger" 
        aria-label="Screenshot von New Case Dialog anfordern">
  📷 Screenshot anfordern
</button>
<!-- Länge: 44 Zeichen ✅ -->

<button class="media-help-trigger" 
        aria-label="Annotierter Screenshot von Case Settings anfordern">
  📷 Annotierter Screenshot anfordern
</button>
<!-- Länge: 56 Zeichen ✅ -->
```

---

#### ⚠️ **GRENZFALL: Knapp unter 120 Zeichen**

```html
<button class="media-help-trigger" 
        aria-label="Screenshot von Datei → Neuer Fall → Fallnamen-Eingabe Dialog anfordern">
  📷 Screenshot anfordern
</button>
<!-- Länge: 78 Zeichen ⚠️ -->
```

**Hinweis:** Funktioniert, aber versuchen Sie kürzer zu formulieren

---

#### ❌ **FALSCH: Zu lang (über 120 Zeichen)**

```html
<button class="media-help-trigger" 
        aria-label="Screenshot von Datei → Neuer Fall → Fallnamen-Eingabe → Speicherort-Auswahl → Erweiterte Optionen → Database Configuration Dialog mit allen Settings anfordern">
  📷 Screenshot anfordern
</button>
<!-- Länge: 167 Zeichen ❌ -->
```

**Warum schlecht?**
- Überschreitet 120-Zeichen-Limit
- Zu detailliert (Screenreader-User verliert Übersicht)

**Besser:**
```html
aria-label="Screenshot von Database Configuration Dialog anfordern"
<!-- Länge: 59 Zeichen ✅ -->
```

---

### 8.3 Regel 3: Figcaptions bei Diagrammen/Videos

#### ✅ **RICHTIG: Figcaption mit id-Attribut**

```html
<figure data-media-type="diagram" data-ref="axiom-workflow-figure-1">
  <button class="media-help-trigger" 
          data-media-id="media-axiom-workflow-diagram1"
          aria-label="Diagramm des AXIOM-Workflows anfordern">
    📊 Diagramm anfordern
  </button>
  <figcaption id="fig-axiom-workflow-diagram1">
    Workflow-Diagramm: Case Creation → Evidence Processing → Artifact Analysis
  </figcaption>
  <!-- MEDIA: Flussdiagramm mit 3 Boxen (blau, grün, orange) + Pfeile -->
</figure>
```

---

#### ❌ **FALSCH: Figcaption fehlt**

```html
<figure data-media-type="diagram" data-ref="axiom-workflow-figure-1">
  <button class="media-help-trigger">
    📊 Diagramm anfordern
  </button>
  <!-- MEDIA: Flussdiagramm... -->
</figure>
```

**Warum schlecht?**
- `<figcaption>` Pflicht bei Diagrammen/Videos (BFSG)
- Screenreader-User wissen nicht, was das Medium zeigt

---

### 8.4 Regel 4: Überschriften-Hierarchie (keine Sprünge)

#### ✅ **RICHTIG: Korrekte Hierarchie**

```html
<h3 data-ref="section-heading-1">Hauptüberschrift</h3>
  <h4 data-ref="section-heading-2">Unterabschnitt</h4>
    <h5 data-ref="section-heading-3">Detail</h5>
      <h6 data-ref="section-heading-4">Feingranular (nur Level 3)</h6>
```

---

#### ❌ **FALSCH: Sprung von h3 zu h5**

```html
<h3>Hauptüberschrift</h3>
  <h5>Unterabschnitt</h5>  <!-- ❌ h3 → h5 ist Sprung! -->
```

**Warum schlecht?**
- Verletzt WCAG 2.1 (Web Content Accessibility Guidelines)
- Screenreader-Navigation gestört

**Korrektur:**
```html
<h3>Hauptüberschrift</h3>
  <h4>Unterabschnitt</h4>  <!-- ✅ h3 → h4 ist OK -->
```

---

### 8.5 Regel 5: Aussagekräftige Link-Texte

#### ✅ **RICHTIG: Link-Text aus Kontext verständlich**

```html
<p>Weitere Details finden Sie unter 
   <a href="#axiom-installation" data-ref-target="axiom-installation">
     AXIOM Installation
   </a>.
</p>

<ul>
  <li>
    <a href="#axiom-database-config" data-ref-target="axiom-database-config">
      Datenbank-Konfiguration
    </a> – Optimierung für große Fälle
  </li>
</ul>
```

---

#### ❌ **FALSCH: "hier", "mehr", "klicken"**

```html
<p>Weitere Details finden Sie <a href="#axiom-installation">hier</a>.</p>
<p>Lesen Sie <a href="#axiom-database-config">mehr</a> über Datenbank-Konfiguration.</p>
<p><a href="#axiom-settings">Klicken Sie hier</a> für Einstellungen.</p>
```

**Warum schlecht?**
- Screenreader-User hören nur "hier", "mehr", "klicken"
- Kontext fehlt (wohin führt der Link?)

---

## 9. HÄUFIGE FEHLER VERMEIDEN

### 9.1 Fehler 1: Level 1 enthält Erklärungen

**Problem:** Level 1 ist für Schnellübersicht, KEINE Erklärungen

#### ❌ **FALSCH**
```html
<div class="detail-level-1">
  <ol data-content-type="instruction">
    <li><strong>Schritt 1:</strong> Öffnen Sie Datei → Neuer Fall. 
        Dies ist der Startpunkt jeder Analyse, da AXIOM hier die 
        Projektstruktur anlegt.</li>
  </ol>
</div>
```

#### ✅ **RICHTIG**
```html
<div class="detail-level-1">
  <ol data-content-type="instruction">
    <li><strong>Schritt 1:</strong> Öffnen Sie Datei → Neuer Fall</li>
  </ol>
</div>

<div class="detail-level-2">
  <dl data-content-type="explanation">
    <dt><strong>Zu Schritt 1:</strong></dt>
    <dd>Dies ist der Startpunkt jeder Analyse, da AXIOM hier die 
        Projektstruktur anlegt.</dd>
  </dl>
</div>
```

---

### 9.2 Fehler 2: Level 2 wiederholt Level 1

**Problem:** Level 2 soll erweitern, nicht wiederholen

#### ❌ **FALSCH**
```html
<div class="detail-level-1">
  <ol data-content-type="instruction">
    <li><strong>Schritt 1:</strong> Aktion 1</li>
    <li><strong>Schritt 2:</strong> Aktion 2</li>
  </ol>
</div>

<div class="detail-level-2">
  <h4>Schritte im Detail</h4>
  <ol>
    <li><strong>Schritt 1:</strong> Aktion 1 (nochmal wiederholt)</li>
    <li><strong>Schritt 2:</strong> Aktion 2 (nochmal wiederholt)</li>
  </ol>
</div>
```

#### ✅ **RICHTIG**
```html
<div class="detail-level-1">
  <ol data-content-type="instruction">
    <li><strong>Schritt 1:</strong> Aktion 1</li>
    <li><strong>Schritt 2:</strong> Aktion 2</li>
  </ol>
</div>

<div class="detail-level-2">
  <h4>Erklärungen zu den Schritten</h4>
  <dl data-content-type="explanation">
    <dt><strong>Zu Schritt 1:</strong></dt>
    <dd>Erklärung warum/wie Aktion 1</dd>
    
    <dt><strong>Zu Schritt 2:</strong></dt>
    <dd>Erklärung warum/wie Aktion 2</dd>
  </dl>
</div>
```

---

### 9.3 Fehler 3: Zu viele Content-Type-Boxen

**Problem:** Mehr als 4 Boxen → User ignoriert sie

#### ❌ **FALSCH**
```html
<aside class="warning-box">...</aside>
<aside class="warning-box">...</aside>
<aside class="hint-box">...</aside>
<aside class="hint-box">...</aside>
<aside class="note-box">...</aside>
<aside class="caution-box">...</aside>
<aside class="example-box">...</aside>
<!-- 7 Boxen = viel zu viel! -->
```

#### ✅ **RICHTIG**
```html
<aside class="warning-box">...</aside>  <!-- Nur die EINE kritische Warnung -->
<aside class="hint-box">...</aside>     <!-- Nur der EINE wichtigste Best-Practice -->
<aside class="note-box">...</aside>     <!-- Nur die EINE wichtigste Zusatzinfo -->
<!-- 3 Boxen = optimal -->
```

---

### 9.4 Fehler 4: Fremdsprachige Begriffe ohne <span lang>

**Problem:** Verletzt BFSG-Anforderungen

#### ❌ **FALSCH**
```html
<p>Der Artifacts Explorer zeigt alle gefundenen Artefakte.</p>
```

#### ✅ **RICHTIG**
```html
<p>Der <span lang="en">Artifacts Explorer</span> zeigt alle gefundenen Artefakte.</p>
```

---

### 9.5 Fehler 5: aria-label fehlt oder zu lang

**Problem:** BFSG-Pflicht, max. 120 Zeichen

#### ❌ **FALSCH (fehlt)**
```html
<button class="media-help-trigger" 
        data-media-id="media-axiom-1">
  📷 Screenshot anfordern
</button>
```

#### ❌ **FALSCH (zu lang)**
```html
<button class="media-help-trigger" 
        aria-label="Screenshot von Datei → Neuer Fall → Fallnamen-Eingabe → Speicherort-Auswahl → Erweiterte Optionen → Database Configuration Dialog mit allen Settings und erweiterten Optionen anfordern">
  📷 Screenshot anfordern
</button>
<!-- 187 Zeichen = zu lang! -->
```

#### ✅ **RICHTIG**
```html
<button class="media-help-trigger" 
        data-media-id="media-axiom-1"
        aria-label="Screenshot von New Case Dialog anfordern">
  📷 Screenshot anfordern
</button>
<!-- 44 Zeichen ✅ -->
```

---

### 9.6 Fehler 6: data-ref Attribute fehlen

**Problem:** Navigation funktioniert nicht

#### ❌ **FALSCH**
```html
<h3>AXIOM Installation</h3>
<h4>Systemanforderungen</h4>

<figure data-media-type="screenshot">
  ...
</figure>
```

#### ✅ **RICHTIG**
```html
<h3 data-ref="axiom-installation-heading-1">AXIOM Installation</h3>
<h4 data-ref="axiom-installation-heading-2">Systemanforderungen</h4>

<figure data-media-type="screenshot" data-ref="axiom-installation-figure-1">
  ...
</figure>
```

---

### 9.7 Fehler 7: MEDIA-Kommentare zu vage

**Problem:** Maintainer weiß nicht, was erstellt werden soll

#### ❌ **FALSCH**
```html
<!-- MEDIA: Screenshot -->
```

#### ✅ **RICHTIG**
```html
<!-- MEDIA: Screenshot von Datei-Menü, 'Neuer Fall' hervorgehoben 
     (roter Rahmen), Kontext: Hauptfenster AXIOM Examine, 
     Auflösung 1920x1080, Fokus auf Menü-Bereich oben links -->
```

---

### 9.8 Fehler 8: Zu technisch für Zielgruppe

**Problem:** Zielgruppe hat niedrige IT-Kenntnisse

#### ❌ **FALSCH**
```html
<p>AXIOM implementiert einen Multi-Threading-Ansatz zur parallelisierten 
   Analyse von Dateisystem-Metadaten unter Verwendung von SQLite als 
   Backend-Datenbank mit WAL-Modus für bessere Concurrency.</p>
```

#### ✅ **RICHTIG**
```html
<p>AXIOM analysiert mehrere Dateien gleichzeitig, um Zeit zu sparen. 
   Die Ergebnisse werden in einer Datenbank gespeichert.</p>
```

---

### 9.9 Fehler 9: Motivierende Sprache

**Problem:** Infantilisierend, nicht professionell

#### ❌ **FALSCH**
```html
<p>Super! Sie haben den ersten Schritt erfolgreich abgeschlossen! 
   Toll gemacht! 🎉</p>
```

#### ✅ **RICHTIG**
```html
<p>Der Fall wurde erfolgreich angelegt. Sie können nun mit der 
   Datenakquise beginnen.</p>
```

---

### 9.10 Fehler 10: Überschriften-Sprünge

**Problem:** Verletzt WCAG 2.1

#### ❌ **FALSCH**
```html
<h3>Hauptüberschrift</h3>
  <h5>Unterabschnitt</h5>  <!-- Sprung von h3 zu h5! -->
```

#### ✅ **RICHTIG**
```html
<h3>Hauptüberschrift</h3>
  <h4>Unterabschnitt</h4>  <!-- Korrekte Hierarchie -->
```

---

## 10. DIE 10 GOLDENEN REGELN

### **Regel 1: Zielgruppe im Fokus**
> Schreiben Sie für IT-ferne Ermittler mit Mittlerer Reife. Keine akademische Sprache!

### **Regel 2: Matroschka-Prinzip einhalten**
> Level 1 ⊆ Level 2 ⊆ Level 3. Erweitern, nicht wiederholen!

### **Regel 3: Konsistenz über Kreativität**
> Orientieren Sie sich an Vorgänger-Sections (HTML-Struktur, Terminologie, Stil).

### **Regel 4: Kurze Sätze (max. 15 Wörter)**
> Ein Gedanke pro Satz. Keine Verschachtelungen.

### **Regel 5: BFSG-konform**
> Alle 5 Regeln beachten: Sprachauszeichnung, aria-label, Figcaptions, Überschriften-Hierarchie, Link-Texte.

### **Regel 6: Medien strategisch einsetzen**
> Nicht jedes UI-Element braucht einen Screenshot. Nutzen Sie den Entscheidungsbaum!

### **Regel 7: Content-Type-Boxen sparsam**
> Maximal 3-4 Boxen pro Section. Nur das Wichtigste!

### **Regel 8: Terminologie-Entscheidungsliste nutzen**
> Vor jedem Begriff prüfen: In Liste? Wenn nein → dokumentieren!

### **Regel 9: data-ref Attribute IMMER**
> Alle Überschriften, Figures, Content-Type-Boxen brauchen `data-ref`.

### **Regel 10: MEDIA-Kommentare detailliert**
> Maintainer muss genau wissen, was erstellt werden soll. 5 Pflicht-Bestandteile!

---

## 📋 **FINALE CHECKLISTE**

Vor Abgabe der Section:

- [ ] Zielgruppe beachtet? (IT-ferne Ermittler, einfache Sprache)
- [ ] Matroschka-Prinzip korrekt? (Level 1 ⊆ Level 2 ⊆ Level 3)
- [ ] Sätze kurz? (max. 15 Wörter)
- [ ] Alle 5 BFSG-Regeln erfüllt?
- [ ] Fremdsprachige Begriffe mit `<span lang>`?
- [ ] Alle Medien mit `aria-label` (max. 120 Zeichen)?
- [ ] Figcaptions bei Diagrammen/Videos?
- [ ] Überschriften-Hierarchie korrekt?
- [ ] Link-Texte aussagekräftig?
- [ ] Maximal 3-4 Content-Type-Boxen?
- [ ] Alle Überschriften haben `data-ref`?
- [ ] Alle Figures haben `data-ref`?
- [ ] MEDIA-Kommentare detailliert?
- [ ] Terminologie konsistent?
- [ ] Keine motivierende Sprache?
- [ ] Nicht zu technisch?

---

**Version:** 1.0.0  
**Status:** ✅ Produktionsreif  
**Nächster Schritt:** Erste Section erstellen! 🚀

---

**Ende des Getting-Started-Dokuments**
