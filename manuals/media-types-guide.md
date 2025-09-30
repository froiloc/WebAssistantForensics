# Medientypen und Vorgaben für AXIOM HTML-Report Leitfaden

**Dokumentversion:** 1.0  
**Stand:** 30.09.2025  
**Status:** Work in Progress

---

## Übersicht

Dieses Dokument definiert **verbindliche Standards** für alle Medientypen im AXIOM-Leitfaden. Die Vorgaben gewährleisten einheitliche Qualität, optimale Ladezeiten und beste Lesbarkeit auf verschiedenen Endgeräten.

---

## 1. Original-Screenshots

### Technische Spezifikation

| Parameter | Wert |
|-----------|------|
| **Auflösung** | 1920x1080 px (Full HD) |
| **Format** | PNG (verlustfrei) |
| **Dateigröße** | 200-400 KB |
| **Farbtiefe** | 24-bit RGB |

### Begründung

**Warum Full HD?**
- Entspricht der **Standard-Bildschirmauflösung** moderner Arbeitsplätze
- AXIOM Examiner läuft typischerweise auf Windows 11 mit 1080p oder höher
- Ermöglicht gestochen scharfe Darstellung von Interface-Details

**Warum PNG?**
- **Verlustfreie Kompression** erhält Text-Lesbarkeit
- Keine JPEG-Artefakte bei Screenshots mit feinem Text
- Unterstützt Transparenz (falls benötigt)

### Einsatzbereich

- **Vollbild-Ansichten** von AXIOM-Dialogen
- **Detailaufnahmen** wichtiger Interface-Bereiche
- **Workflow-Dokumentation** mit hoher Detailtreue

---

## 2. Thumbnails

### Technische Spezifikation

| Parameter | Empfohlen | Alternative |
|-----------|-----------|-------------|
| **Auflösung** | 600x338 px | 800x450 px |
| **Seitenverhältnis** | 16:9 | 16:9 |
| **Format** | PNG (Screenshots mit Text) | JPEG (Fotos) |
| **Dateigröße** | 30-60 KB | 60-100 KB |

### Begründung

**Warum 600px Breite?**
- **Optimaler Kompromiss** zwischen Dateigröße und Lesbarkeit
- Etwa **30-40% der Originalbreite** (Faustregel)
- Text bleibt auf modernen Bildschirmen **ausreichend lesbar**
- Bei Klick öffnet sich das große Bild im Modal

**Dimensionierungsregeln:**
- **Maximale Breite:** 800px (darüber wird es unnötig groß)
- **Minimale Breite:** 400px (darunter wird Text unleserlich)
- **Empfohlene Breite:** 600px als goldener Mittelweg

### Einsatzbereich

- **Galerie-Ansichten** im Leitfaden
- **Vorschaubilder** vor detaillierter Betrachtung
- **Responsive Darstellung** in verschiedenen Viewport-Größen

---

## 3. Annotierte Screenshots

### Technische Spezifikation

| Parameter | Wert |
|-----------|------|
| **Auflösung** | 1920x1080 px (wie Original) |
| **Format** | PNG (verlustfrei) |
| **Dateigröße** | 250-500 KB |
| **Annotation-Schriftgröße** | Minimum 24pt |

### Begründung

**Warum Original-Auflösung?**
- Annotationen (Pfeile, Nummerierungen, Textboxen) benötigen **ausreichend Platz**
- Hochauflösende Annotationen bleiben **scharf und lesbar**
- Downscaling für Thumbnails erhält Qualität besser als Upscaling

**Besonderheit:**
- Annotationen müssen mit **mind. 24pt Schriftgröße** erstellt werden
- Dadurch bleiben sie im **600px-Thumbnail noch lesbar**
- Pfeile und Markierungen: Mindestens **3-4px Linienstärke**

### Einsatzbereich

- **Schritt-für-Schritt-Anleitungen** mit nummerierten Bereichen
- **Hervorhebung wichtiger UI-Elemente**
- **Erklärung komplexer Interface-Zusammenhänge**

---

## 4. Video-Poster (Vorschaubilder)

### Technische Spezifikation

| Parameter | Wert |
|-----------|------|
| **Auflösung** | 1280x720 px (720p) |
| **Format** | JPEG |
| **Dateigröße** | 100-150 KB |
| **Kompression** | 80-85% Qualität |

### Begründung

**Warum 720p?**
- **Standard für Video-Thumbnails** in modernen Web-Anwendungen
- Kleiner als Full HD, aber **ausreichend scharf** für Vorschau
- Guter Kompromiss zwischen Qualität und Ladezeit

**Warum JPEG?**
- **Kompression ist akzeptabel** für fotografische Inhalte
- Deutlich kleinere Dateigröße als PNG
- Video-Poster enthalten meist keine feinen Text-Details

### Einsatzbereich

- **Platzhalter** für eingebettete Videos
- **Vorschaubild** vor Video-Start (lazy loading)
- **Fallback-Darstellung** wenn Video nicht geladen werden kann

---

## 5. Videos

### Technische Spezifikation

| Parameter | Wert |
|-----------|------|
| **Auflösung** | 1280x720 px (720p) |
| **Framerate** | 30 fps |
| **Codec** | H.264 (MP4-Container) |
| **Bitrate** | 2000-3000 kbps |
| **Audio** | AAC, 128 kbps (optional) |
| **Dateigröße** | ~5-8 MB pro Minute |

### Begründung

**Warum 720p statt 1080p?**
- **1080p wäre zu groß:** Ein 3-Minuten-Video = 50-100 MB
- **720p ist ausreichend:** Screen-Recordings = 15-25 MB pro 3 Min
- Bei Screen-Recordings gibt es **keine schnellen Bewegungen**, 30 fps genügen

**Warum H.264?**
- **Beste Browser-Kompatibilität** (alle modernen Browser)
- **Hardwarebeschleunigung** auf den meisten Systemen
- **Gutes Kompression/Qualität-Verhältnis**

### Einsatzbereich

- **Workflow-Demonstrationen** im AXIOM Examiner
- **Interaktive Tutorials** für komplexe Vorgänge
- **Ergänzung zu statischen Screenshots**

### Video-Erstellungsrichtlinien

**Aufnahme:**
- Bildschirmauflösung: 1920x1080 px
- Aufnahme mit 30 fps
- **Nach Aufnahme:** Downscaling auf 1280x720 px

**Schnitt:**
- Maximale Videolänge: **3-5 Minuten** (längere Videos splitten)
- Intro/Outro: Maximal 2 Sekunden
- Pausen/Wartezeiten: Herausschneiden oder beschleunigen

**Export:**
- Container: MP4
- Video-Codec: H.264
- Bitrate: 2500 kbps (Zielwert)
- Audio: AAC 128 kbps (falls Sprecher/Kommentar)

---

## 6. Untertitel (.vtt)

### Technische Spezifikation

| Parameter | Wert |
|-----------|------|
| **Format** | WebVTT (.vtt) |
| **Encoding** | UTF-8 |
| **Dateigröße** | 2-5 KB |
| **Sprache** | Deutsch (de) |

### Begründung

**Warum WebVTT?**
- **Web-Standard** für Untertitel in HTML5-Videos
- **Barrierefreiheit** gemäß BFSG-Anforderungen
- Unterstützung von **Zeitstempeln und Formatierung**

**Barrierefreiheit:**
- Untertitel sind **Pflicht** für alle Videos im Leitfaden
- Erleichtern Verständnis in lauten Umgebungen
- Unterstützen nicht-muttersprachliche Nutzer

### Einsatzbereich

- **Alle Videos** im Leitfaden benötigen Untertitel
- Synchronisiert mit gesprochenem Kommentar oder UI-Aktionen
- Beschreibung relevanter visueller Informationen

---

## Dateigrößen-Übersicht

### Richtwerte (Durchschnittswerte)

| Medientyp | Auflösung | Dateigröße | Format |
|-----------|-----------|------------|--------|
| **Original-Screenshot** | 1920x1080 | 200-400 KB | PNG |
| **Thumbnail** | 600x338 | 30-60 KB | PNG/JPEG |
| **Annotierter Screenshot** | 1920x1080 | 250-500 KB | PNG |
| **Video-Poster** | 1280x720 | 100-150 KB | JPEG |
| **Video (3 Min)** | 1280x720 | 15-25 MB | MP4 (H.264) |
| **Untertitel (.vtt)** | - | 2-5 KB | VTT |

---

## Rechenbeispiel: Typischer Leitfaden-Abschnitt

### Szenario: 10 Screenshots + 2 Videos

**Screenshots:**
- 10 Original-Screenshots: `10 × 300 KB = 3 MB`
- 10 Thumbnails: `10 × 45 KB = 450 KB`

**Videos:**
- 2 Videos (je 3 Min): `2 × 20 MB = 40 MB`
- 2 Video-Poster: `2 × 125 KB = 250 KB`
- 2 Untertitel-Dateien: `2 × 3 KB = 6 KB`

**Gesamt-Dateigröße:**
- **Screenshots:** ~3.5 MB
- **Videos:** ~40.3 MB
- **Summe:** ~43.8 MB

**Ladezeit-Abschätzung:**
- DSL 50 Mbit/s: ~7 Sekunden
- DSL 100 Mbit/s: ~3.5 Sekunden
- Mit Lazy Loading: Initiales Laden < 1 Sekunde (nur Thumbnails)

---

## Ordnerstruktur für Medien

### Empfohlene Struktur

```
/src/
  /media/
    /screenshots/
      /original/
        step1_export-dialog.png
        step2_format-selection.png
      /thumbnails/
        step1_export-dialog_thumb.png
        step2_format-selection_thumb.png
      /annotated/
        step1_export-dialog_annotated.png
    /videos/
      /poster/
        workflow_overview_poster.jpg
      workflow_overview.mp4
      workflow_overview_de.vtt
```

### Benennungskonvention

**Format:** `{section}_{description}_{variant}.{ext}`

**Beispiele:**
- `step2_format-selection.png` (Original)
- `step2_format-selection_thumb.png` (Thumbnail)
- `step2_format-selection_annotated.png` (Annotiert)
- `workflow_export-process.mp4` (Video)
- `workflow_export-process_poster.jpg` (Poster)
- `workflow_export-process_de.vtt` (Untertitel)

**Regeln:**
- Kleinbuchstaben
- Bindestriche statt Leerzeichen
- Unterstrich trennt Abschnitt/Beschreibung/Variante
- Sprechende Namen (selbsterklärend)

---

## Qualitätssicherung

### Checkliste vor Veröffentlichung

**Screenshots:**
- [ ] Auflösung entspricht Vorgabe
- [ ] Format korrekt (PNG für Text, JPEG für Fotos)
- [ ] Dateigröße im Zielbereich
- [ ] Keine sensiblen Daten sichtbar (z.B. echte Fallnummern)
- [ ] Thumbnail generiert und getestet

**Videos:**
- [ ] Auflösung 1280x720 px
- [ ] Framerate 30 fps
- [ ] Codec H.264, Container MP4
- [ ] Bitrate 2000-3000 kbps
- [ ] Untertitel vorhanden und synchronisiert
- [ ] Video-Poster erstellt
- [ ] Maximale Länge 5 Minuten

**Allgemein:**
- [ ] Dateiname entspricht Konvention
- [ ] Korrekte Ordnerstruktur
- [ ] Lazy Loading implementiert (wo sinnvoll)
- [ ] Alt-Texte für Barrierefreiheit vorhanden

---

## Tools und Workflows

### Empfohlene Tools

**Screenshot-Erstellung:**
- **Windows:** Snipping Tool, Greenshot
- **Cross-Platform:** ShareX (Windows), Flameshot (Linux)

**Bildbearbeitung:**
- **Annotation:** Greenshot, Paint.NET, GIMP
- **Batch-Resize:** ImageMagick, XnConvert
- **Optimierung:** TinyPNG, PNGGauntlet

**Video-Aufnahme:**
- **Screen Recording:** OBS Studio, ShareX
- **Schnitt:** DaVinci Resolve (Free), Shotcut

**Video-Kompression:**
- **HandBrake:** Batch-Encoding mit H.264
- **FFmpeg:** Kommandozeilen-Konvertierung

### Batch-Konvertierung mit ImageMagick

**Thumbnails generieren:**
```bash
# Alle PNGs in /original/ zu 600px Breite resizen
magick mogrify -path ../thumbnails/ -resize 600x338 -quality 85 *.png
```

**Video-Poster extrahieren:**
```bash
# Frame bei 5 Sekunden als JPEG speichern
ffmpeg -i video.mp4 -ss 00:00:05 -vframes 1 -q:v 2 video_poster.jpg
```

---

## Barrierefreiheit (BFSG-Konformität)

### Anforderungen

**Bilder:**
- **Alt-Texte:** Alle Bilder benötigen aussagekräftige Alternativtexte
- **Kontrast:** Annotationen müssen ausreichend Kontrast zum Hintergrund haben
- **Vergrößerung:** Bilder müssen ohne Qualitätsverlust vergrößerbar sein

**Videos:**
- **Untertitel:** Pflicht für alle Videos (WebVTT-Format)
- **Transkript:** Optionale Textversion des gesprochenen Inhalts
- **Steuerung:** Play/Pause muss per Tastatur bedienbar sein
- **Audio-Beschreibung:** Bei rein visuellen Informationen

### HTML-Integration

**Barrierefreies Bild:**
```html
<img src="step2_format-selection.png" 
     alt="AXIOM Export-Dialog mit Auswahl des HTML-Formats" 
     loading="lazy">
```

**Barrierefreies Video:**
```html
<video controls poster="workflow_poster.jpg">
  <source src="workflow.mp4" type="video/mp4">
  <track kind="subtitles" src="workflow_de.vtt" 
         srclang="de" label="Deutsch" default>
  Ihr Browser unterstützt das Video-Tag nicht.
</video>
```

---

## Änderungshistorie

| Version | Datum | Änderung | Autor |
|---------|-------|----------|-------|
| 1.0 | 30.09.2025 | Initiale Erstellung | - |

---
