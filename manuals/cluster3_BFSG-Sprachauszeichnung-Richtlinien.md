# BFSG-konforme Sprachauszeichnung – Richtlinien für Content-Erstellung

**Projekt:** WebAssistantForensics  
**Version:** 1.0.0  
**Datum:** 2025-10-09  
**Gültigkeit:** Alle Inhalte im `<main>`-Bereich von `index.html`

---

## Zweck

Diese Richtlinien stellen sicher, dass fremdsprachige Begriffe in generierten HTML-Inhalten korrekt mit `lang`-Attributen ausgezeichnet werden, um die **Barrierefreiheit nach BFSG** (Barrierefreiheitsstärkungsgesetz) zu gewährleisten.

**Ziel:** Screenreader können fremdsprachige Begriffe mit korrekter Aussprache vorlesen.

---

## Grundprinzipien

1. **Sparsam markieren:** Nur dort, wo es für Screenreader-Nutzer wirklich relevant ist
2. **Lesbarkeit bewahren:** Code-Komplexität niedrig halten
3. **Konsistenz:** Einheitliche Anwendung der Regeln über alle Sections hinweg
4. **Deutsche Begriffe bevorzugen:** Wenn im Sprachgebrauch etabliert

---

## Regeln im Detail

### Regel 1: Hybride Begriffe aufteilen

**Definition:** Begriffe, die aus deutschen und fremdsprachigen Bestandteilen zusammengesetzt sind.

**Vorgehen:** Nur den fremdsprachigen Teil markieren.

**Beispiele:**
```html
<!-- Korrekt -->
<span lang="en">Hash</span>-Wert
<span lang="en">E-Mail</span>-Account
<span lang="en">Chain of Custody</span>-Dokumentation

<!-- Falsch -->
<span lang="en">Hash-Wert</span>  <!-- Ganzes Wort markiert -->
Hash-Wert  <!-- Gar nicht markiert -->
```

----------

### Regel 2: Software- und Produktnamen

**Vorgehen:** Markieren, wenn erkennbar fremdsprachlich.

**Beispiele:**
```html
<!-- Markieren -->
<span lang="en">AXIOM Process</span>
<span lang="en">AXIOM Examine</span>
<span lang="en">FTK Imager</span>
<span lang="en">EnCase Forensic</span>
<span lang="en">Cellebrite UFED</span>

<!-- NICHT markieren (eingedeutscht) -->
Windows
Facebook
Twitter
```
**Entscheidungsregel:**

-   Englischer Name, der englisch ausgesprochen wird → `lang="en"`
-   Etablierte Markennamen im deutschen Sprachgebrauch → kein `lang`

----------

### Regel 3: UI-Elemente und Menüpfade

**Vorgehen:** Gesamte Wortgruppe oder Menüpfad in **einem** `<span>` markieren (nicht jedes Wort einzeln).

**Beispiele:**
```html
<!-- Korrekt -->
Wählen Sie <span lang="en">File → Export → Case Summary</span>
Klicken Sie auf <span lang="en">Processing Options</span>
Öffnen Sie den Dialog <span lang="en">Evidence Management</span>

<!-- Falsch (zu komplex) -->
Wählen Sie <span lang="en">File</span> → <span lang="en">Export</span> → <span lang="en">Case Summary</span>
```
----------

### Regel 4: Code und Befehle

**Vorgehen:** Code-Elemente (`<code>`) erhalten **KEIN** `lang`-Attribut.

**Begründung:** Code ist sprachneutral; Lesbarkeit hat Vorrang.

**Beispiele:**
```html
<!-- Korrekt (kein lang) -->
<code>ForensicImageVerify()</code>
<code>SELECT * FROM artifacts WHERE type='email'</code>
<code>cd /media/evidence</code>

<!-- Auch kein lang bei Pfaden -->
<code>C:\Evidence\Case_2024\image.dd</code>
<code>/mnt/evidence/disk1.e01</code>
```
----------

### Regel 5: Tastenkombinationen

**Vorgehen:** Nur **benannte Tasten** (mit Funktionsnamen) markieren, nicht Buchstaben/Zahlen.

**Beispiele:**
```html
<!-- Markieren -->
<kbd lang="en">Enter</kbd>
<kbd lang="de">Eingabe</kbd>
<kbd lang="en">Shift</kbd>
<kbd lang="de">Umschalt</kbd>
<kbd lang="en">Ctrl</kbd>
<kbd lang="de">Strg</kbd>
<kbd lang="en">Del</kbd>
<kbd lang="de">Entf</kbd>

<!-- NICHT markieren (Buchstaben, Zahlen) -->
<kbd>C</kbd>
<kbd>F5</kbd>
<kbd>+</kbd>
<kbd>→</kbd>

<!-- Kombination -->
Drücken Sie <kbd lang="en">Ctrl</kbd> + <kbd>C</kbd>
```
----------

### Regel 6: Abkürzungen und Akronyme

**Vorgehen:** **IMMER** mit `<abbr>`, `title` und `lang` auszeichnen.

**Beispiele:**
```html
<!-- Englische Akronyme -->
<abbr title="Federal Bureau of Investigation" lang="en">FBI</abbr>
<abbr title="National Institute of Standards and Technology" lang="en">NIST</abbr>
<abbr title="Secure Hash Algorithm" lang="en">SHA</abbr>
<abbr title="Mobile Device" lang="en">MD</abbr>

<!-- Deutsche Akronyme -->
<abbr title="Bundeskriminalamt" lang="de">BKA</abbr>
<abbr title="Landeskriminalamt" lang="de">LKA</abbr>
<abbr title="Strafprozessordnung" lang="de">StPO</abbr>
```
**Wichtig:** Auch wenn das Akronym im Fließtext eingebettet ist:
```html
Die <abbr title="Federal Bureau of Investigation" lang="en">FBI</abbr>-Richtlinien empfehlen...
```
----------

### Regel 7: Ausnahmen (KEIN `lang`-Attribut)

#### A) Eingedeutschte Begriffe

Begriffe, die im deutschen Sprachgebrauch etabliert sind:
```html
Download, Upload, Login, Setup, User, Account, Laptop, Server, Router, 
E-Mail, Smartphone, Tablet, Cloud, Browser, Update
```
#### B) Sprachneutrale Inhalte

-   **Zahlen:** `42`, `192.168.1.1`, `0x4A3F`
-   **UUIDs:** `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
-   **Dateipfade:** `/media/evidence/case001.dd`, `C:\Evidence\`
-   **Code:** (siehe Regel 4)

#### C) Deutsche Begriffe bevorzugen

Wenn ein deutscher Begriff im Polizei-/Rechtskontext üblich ist, verwenden Sie diesen **ohne** `lang`-Attribut:
```html
<!-- Bevorzugt -->
Beweismittelkette (statt Chain of Custody)
Datenträger (statt Storage Device)
Spurensicherung (statt Evidence Collection)

<!-- Nur wenn englischer Fachbegriff etabliert ist -->
<span lang="en">Write Blocker</span> (keine deutsche Entsprechung üblich)
<span lang="en">Forensic Toolkit</span> (etablierter Fachbegriff)
```
**Entscheidungslogik:**

1.  Gibt es einen **etablierten deutschen Begriff** im Fachkontext? → Deutsch verwenden
2.  Ist der **englische Fachbegriff dominant**? → Englisch mit `lang="en"`
3.  **Beide gebräuchlich**? → Kontext entscheidet; Glossar verweist auf beide

----------

## Zusammenfassung: Quick Reference

| Element | Markieren? | Beispiel |
|---------|------------|----------|
| **Hybride Begriffe** | Ja (nur fremdsprachiger Teil) | `<span lang="en">Hash</span>-Wert` |
| **Software-Namen** | Ja (wenn fremdsprachlich) | `<span lang="en">AXIOM Process</span>` |
| **UI-Elemente** | Ja (gesamte Wortgruppe) | `<span lang="en">File → Export</span>` |
| **Code** | Nein | `<code>SELECT * FROM ...</code>` |
| **Tastenkombinationen** | Nur benannte  Tasten | `<kbd lang="en">Ctrl</kbd> + <kbd>C</kbd>` |
| **Abkürzungen** | Ja (immer mit `<abbr>`) | `<abbr title="..." lang="en">FBI</abbr>` |
| **Eingedeutschte Begriffe** | Nein | Download, E-Mail, Login |
| **Zahlen/Pfade** | Nein | `192.168.1.1`, `/media/evidence` |

----------

## Validierung

**Automatische Checks (Python-Validator):**

-   ⚠️ Warnung bei bekannten Akronymen ohne `<abbr>`-Tag (z.B. "FBI", "NIST")
-   ⚠️ Warnung bei verdächtigen englischen Begriffen ohne `lang` (z.B. "Chain of Custody")

**Manuelle Prüfung:**

-   Screenreader-Test mit NVDA/JAWS
-   Stichproben bei neuen Sections

----------

## Beispiele aus dem Projekt-Kontext

### Beispiel 1: Software-Anleitung
```html
<section class="content-section" id="axiom-export">
  <h2 data-ref="heading">Export in <span lang="en">AXIOM Process</span></h2>
  
  <p data-ref="instruction">
    Öffnen Sie <span lang="en">AXIOM Process</span> und navigieren Sie zu
    <span lang="en">File → Export → Evidence Items</span>.
    Der <span lang="en">Hash</span>-Wert wird automatisch berechnet.
  </p>
  
  <p data-ref="note">
    Die <abbr title="Federal Bureau of Investigation" lang="en">FBI</abbr>-Richtlinien
    empfehlen die Verwendung eines <span lang="en">Write Blocker</span>.
  </p>
</section>
```
Beispiel 2: Technische Erklärung
```html
<section class="content-section" id="hash-verification">
  <h2 data-ref="heading"><span lang="en">Hash</span>-Wert-Verifikation</h2>
  
  <p data-ref="explanation">
    Ein <span lang="en">Hash</span>-Wert (auch Prüfsumme genannt) ist ein digitaler Fingerabdruck.
    Die <abbr title="Secure Hash Algorithm" lang="en">SHA</abbr>-256-Funktion
    erzeugt einen eindeutigen Wert.
  </p>
  
  <p data-ref="example">
    Verwenden Sie den Befehl <code>sha256sum image.dd</code>, um den
    <span lang="en">Hash</span>-Wert zu berechnen. Speichern Sie das Ergebnis
    in der <span lang="en">Chain of Custody</span>-Dokumentation.
  </p>
</section>
```
Beispiel 3: Tastenkombinationen
```html
<section class="content-section" id="keyboard-shortcuts">
  <h2 data-ref="heading">Tastenkombinationen</h2>
  
  <dl>
    <dt>Suche öffnen</dt>
    <dd><kbd lang="en">Ctrl</kbd> + <kbd>F</kbd></dd>
    
    <dt>Neuer Fall</dt>
    <dd><kbd lang="en">Ctrl</kbd> + <kbd>N</kbd></dd>
    
    <dt>Aktualisieren</dt>
    <dd><kbd>F5</kbd></dd>
  </dl>
</section>
```
----------

## Versions-Historie
| Version | Datum      | Änderungen                   |
|---------|------------|------------------------------|
| 1.0.0   | 2025-10-09 | Initiale Version (Cluster 3) |
---------

## Weiterführende Ressourcen

-   **BFSG-Dokumentation:** [https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/barrierefreiheitsstaerkungsgesetz.html](https://www.bmas.de/DE/Service/Gesetze-und-Gesetzesvorhaben/barrierefreiheitsstaerkungsgesetz.html)
-   **WCAG 3.1.2 (Language of Parts):** [https://www.w3.org/WAI/WCAG21/Understanding/language-of-parts.html](https://www.w3.org/WAI/WCAG21/Understanding/language-of-parts.html)
-   **HTML `lang`-Attribut:** [https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)
-   **ISO 639-1 Sprachcodes:** [https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)


