# Implementierungs-Anleitung: Neue Features für AXIOM Leitfaden

## Übersicht der implementierten Features

### 1. **Tipps-Footer mit automatischem Wechsel**
- ✅ Fixierter Footer am unteren Bildschirmrand
- ✅ 10 verschiedene Tipps zu Tastenkombinationen und Funktionen
- ✅ Automatischer Wechsel alle 15 Sekunden mit Fade-Effekt
- ✅ Ein-/Ausblendbar über Close-Button oder Menü
- ✅ Wiedereinblendbar über statischen Footer-Button
- ✅ Status wird in localStorage gespeichert

### 2. **Navigation-Sidebar (links)**
- ✅ Kollabierbare Sidebar mit Seitennavigation
- ✅ Zeigt aktuelle Position im Leitfaden
- ✅ Einzelklick: Element aufklappen/zuklappen (für spätere Untermenüs)
- ✅ Doppelklick: Direkt zum Abschnitt springen
- ✅ Automatische Hervorhebung des aktiven Abschnitts
- ✅ Ein-/Ausblendbar über Menü oder Close-Button
- ✅ Responsive: Mobile Vollbild-Overlay

### 3. **Verlaufsfenster**
- ✅ Modal-Dialog mit Historie besuchter Abschnitte
- ✅ Zeitstempel in zwei Formaten:
  - **Relativ**: "vor 2 Minuten", "vor 3 Stunden"
  - **Absolut**: "29.09.2025 14:23:45"
- ✅ Umschaltbar über Button im Modal-Header
- ✅ Klick auf Verlaufs-Eintrag springt zum Abschnitt
- ✅ Verlauf wird in localStorage persistiert
- ✅ Lösch-Funktion mit Bestätigungsdialog
- ✅ Öffnung über Hamburger-Menü oben links

### 4. **Hamburger-Menü (oben links)**
- ✅ Zentrale Navigation für alle Features
- ✅ Drei Menüpunkte:
  - Verlauf anzeigen
  - Navigation ein/aus
  - Tipps ein/aus

---

## Schritt-für-Schritt Implementierung

### **Schritt 1: HTML-Struktur ergänzen**

1. **Öffnen Sie `index.html`**

2. **Direkt nach `<body>` Tag einfügen:**
   - Top Navigation mit Hamburger-Menü
   - Menü-Dropdown
   - Navigation Sidebar
   
3. **Vor dem schließenden `</body>` Tag einfügen:**
   - Verlaufsfenster (Modal)
   - Tipps-Footer

4. **Statischen Footer ersetzen** mit der erweiterten Version (enthält Button zum Einblenden der Tipps)

5. **WICHTIG: data-section und data-title Attribute ergänzen**
   ```html
   <section class="content-section" data-section="intro" data-title="Überblick">
   <section class="content-section" data-section="step1" data-title="Schritt 1: Export starten">
   <!-- etc. -->
   ```

**Datei:** `axiom-guide-updates-html` Artifact

---

### **Schritt 2: CSS-Styling hinzufügen**

1. **Öffnen Sie `styles.css`**

2. **Am Ende der Datei einfügen:**
   - Top Navigation Styles
   - Navigation Sidebar Styles
   - Modal/Verlaufsfenster Styles
   - Tipps-Footer Styles
   - Responsive Anpassungen

3. **Beachten Sie die automatischen Anpassungen:**
   - `body` erhält `padding-top: 80px` (für Top-Nav)
   - `body` erhält `padding-bottom: 80px` (für Tipps-Footer)
   - Container-Margins passen sich an geöffnete Sidebars an

**Datei:** `axiom-guide-updates-css` Artifact

---

### **Schritt 3: JavaScript-Funktionalität implementieren**

1. **Öffnen Sie `script.js`**

2. **Am Anfang der Datei (nach bestehenden Variablen):**
   - Neue globale Variablen hinzufügen:
   ```javascript
   let menuOpen = false;
   let navSidebarOpen = false;
   let historyModalOpen = false;
   let tipsVisible = true;
   let currentTipIndex = 0;
   let tipInterval = null;
   let sectionHistory = [];
   let timeFormatRelative = true;
   let currentActiveSection = null;
   ```

3. **Im `DOMContentLoaded` Event-Listener ergänzen:**
   ```javascript
   initMenu();
   initNavSidebar();
   initHistoryModal();
   initTipsFooter();
   loadUserPreferences();
   ```

4. **Am Ende der Datei (vor `window.axiomGuide`):**
   - Alle neuen Funktionen aus dem Artifact einfügen

5. **WICHTIG: Bestehende `initFocusObserver` Funktion ersetzen** mit der erweiterten Version (fügt Verlaufs-Tracking hinzu)

**Datei:** `axiom-guide-updates-js` Artifact

---

## Funktionsweise der Features im Detail

### **1. Tipps-Footer**

**Automatischer Wechsel:**
```javascript
setInterval(showNextTip, 15000); // Alle 15 Sekunden
```

**Tipps-Array erweitern:**
Fügen Sie neue Tipps im `tips` Array hinzu:
```javascript
const tips = [
    "💡 Ihr neuer Tipp hier...",
    // ...
];
```

**Sichtbarkeits-Status:**
- Gespeichert in `localStorage` unter `axiom-guide-preferences`
- Beim Laden der Seite wird Status wiederhergestellt

---

### **2. Navigation-Sidebar**

**Automatische Erkennung der Abschnitte:**
```javascript
const sections = document.querySelectorAll('.content-section[data-section]');
```

**Event-Handling:**
- **Einzelklick**: Aufklappen/Zuklappen (für zukünftige Untermenüs)
- **Doppelklick**: Direkt zum Abschnitt springen mit Smooth-Scroll

**Aktive Section Tracking:**
Der Intersection Observer erkennt, welcher Abschnitt im Fokus ist und hebt den entsprechenden Nav-Eintrag hervor.

---

### **3. Verlaufsfenster**

**Verlaufs-Einträge:**
Jeder Eintrag enthält:
```javascript
{
    sectionId: "step1",
    sectionTitle: "Schritt 1: Export starten",
    timestamp: 1727619845234
}
```

**Zeitformat-Umschaltung:**
- **Relativ**: Berechnet Differenz zwischen jetzt und Timestamp
- **Absolut**: Formatiert Datum als DD.MM.YYYY HH:MM:SS

**Speicherung:**
- localStorage: `axiom-guide-history`
- Maximal 50 Einträge (älteste werden entfernt)

---

### **4. Intersection Observer Integration**

**Erweiterte Funktionalität:**
```javascript
function handleIntersection(entries) {
    entries.forEach(entry => {
        // Opazität setzen
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            entry.target.classList.remove('out-of-focus');
            
            // Aktive Section tracken
            currentActiveSection = entry.target.dataset.section;
            updateActiveNavItem();
            
            // Zum Verlauf hinzufügen (bei >50% Sichtbarkeit)
            if (entry.intersectionRatio > 0.5) {
                addToHistory(sectionId, sectionTitle);
            }
        }
    });
}
```

---

## localStorage Struktur

### **Gespeicherte Daten:**

1. **`axiom-guide-notes`** (String)
   - Inhalt des Notizblocks

2. **`axiom-guide-history`** (JSON Array)
   - Liste aller besuchten Abschnitte mit Zeitstempel

3. **`axiom-guide-preferences`** (JSON Object)
   ```javascript
   {
       navSidebarOpen: true,
       tipsVisible: false,
       timeFormatRelative: true,
       detailLevel: 2
   }
   ```

---

## Tastenkombinationen

### **Bestehende:**
- `Alt + 1, 2, 3`: Detailebenen wechseln
- `ESC`: Notizblock schließen

### **Neue:**
- `ESC`: Verlaufsfenster schließen (zusätzlich)
- Alle anderen Aktionen über Maus/Touch

---

## Barrierefreiheit (BFSG-konform)

### **Implementierte Maßnahmen:**

1. **ARIA-Labels:**
   - Alle Buttons haben `aria-label`
   - Modal hat `aria-modal="true"` und `aria-labelledby`
   - Menü hat `role="menu"` und `role="menuitem"`

2. **Tastatursteuerung:**
   - Alle interaktiven Elemente sind mit Tab erreichbar
   - Focus-Indikatoren (orange Outline)
   - ESC-Taste schließt Overlays

3. **Screenreader-Unterstützung:**
   - Semantisches HTML (`<nav>`, `<aside>`, `<main>`)
   - `aria-expanded` und `aria-hidden` States
   - Aussagekräftige Alt-Texte und Labels

4. **Visuelle Klarheit:**
   - Hoher Kontrast (erfüllt WCAG AA)
   - Fokus-Opazität hilft bei Orientierung
   - Große Touch-Targets (min. 44x44px)

5. **High-Contrast-Mode:**
   - Spezielle CSS-Regeln für `@media (prefers-contrast: high)`

---

## Responsive Verhalten

### **Desktop (>1024px):**
- Navigation Sidebar: 280px breit, schiebt Container
- Notizblock: 350px breit, schiebt Container
- Alle Features parallel nutzbar

### **Tablet (768px - 1024px):**
- Navigation Sidebar: Vollbild-Overlay
- Notizblock: Vollbild-Overlay
- Container bleibt zentriert

### **Mobile (<768px):**
- Top-Nav: Reduzierte Höhe (50px)
- Alle Sidebars: Vollbild
- Tipps-Footer: Kleinere Schrift
- Touch-optimierte Bedienung

---

## Testen der Implementierung

### **Checkliste:**

- [ ] Hamburger-Menü öffnet und schließt sich
- [ ] Navigation Sidebar zeigt alle Abschnitte
- [ ] Doppelklick auf Nav-Item springt zu Abschnitt
- [ ] Aktiver Abschnitt wird in Nav hervorgehoben
- [ ] Verlaufsfenster öffnet sich über Menü
- [ ] Verlauf zeigt besuchte Abschnitte
- [ ] Zeitformat wechselt zwischen relativ/absolut
- [ ] Klick auf Verlaufs-Eintrag springt zu Abschnitt
- [ ] Tipps-Footer zeigt Tipps an
- [ ] Tipps wechseln alle 15 Sekunden
- [ ] Tipps-Footer lässt sich aus/einblenden
- [ ] Button im statischen Footer blendet Tipps wieder ein
- [ ] Alle Einstellungen bleiben nach Reload erhalten
- [ ] ESC-Taste schließt Overlays
- [ ] Fokus-Opazität funktioniert beim Scrollen
- [ ] Mobile Ansicht funktioniert korrekt

---

## Erweiterungsmöglichkeiten

### **Zukünftige Features:**

1. **Hierarchische Navigation:**
   - Untermenüs in der Navigation Sidebar
   - Verschachtelte Abschnitte aufklappbar

2. **Lesezeichen:**
   - Abschnitte als Favoriten markieren
   - Schnellzugriff auf wichtige Stellen

3. **Suchfunktion:**
   - Volltextsuche im Leitfaden
   - Ergebnisse mit Highlighting

4. **Export-Funktionen:**
   - Verlauf als PDF exportieren
   - Notizen als Textdatei speichern

5. **Mehrsprachen-Support:**
   - i18n für Tipps und UI-Texte
   - Sprachwechsel über Menü

---

## Support und Debugging

### **Häufige Probleme:**

**Problem: Tipps wechseln nicht**
- Lösung: Prüfen Sie, ob `startTipRotation()` aufgerufen wird
- Console: Schauen Sie nach JavaScript-Fehlern

**Problem: Navigation Sidebar bleibt leer**
- Lösung: Stellen Sie sicher, dass alle Sections `data-section` und `data-title` Attribute haben
- Prüfen Sie: `document.querySelectorAll('.content-section[data-section]')`

**Problem: Verlauf funktioniert nicht**
- Lösung: localStorage könnte deaktiviert sein
- Alternative: Verwenden Sie sessionStorage als Fallback

**Problem: Opazität funktioniert nicht**
- Lösung: Intersection Observer wird möglicherweise nicht unterstützt
- Fallback: Implementieren Sie Scroll-basierte Lösung

---

## Abschluss

Alle drei Features sind nun vollständig implementiert und funktionieren zusammen. Die modulare Struktur ermöglicht einfache Wartung und Erweiterung.

**Nächste Schritte:**
1. Features testen
2. Anpassungen vornehmen
3. Weitere Abschnitte zum Leitfaden hinzufügen
4. Zusätzliche Tipps ergänzen