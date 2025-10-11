# Verbesserungsvorschläge (Sammlung)

**Created:** 10/4/2025 14:42:19  
**Updated:** 10/8/2025 11:31:22  
**Exported:** 10/11/2025 4:02:03  
**Link:** [https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0](https://claude.ai/chat/29748826-4331-4834-a0d1-d2ab20d4d7a0)  

## Prompt:
4.10.2025, 14:42:21

Ich benötige Hilfe bei der Datei styles.css, die in aktueller Version im Projekt-Dateispeicher liegt.

Dort ist die Farbe der sekundären Schaltflächen noch nicht okay.

Kannst du hier bitte einen Vorschlag machen? Das wird verwendet von den Schaltfläche "Zeit: Relativ/Absolut", "Verlauf löschen" und "Notizen löschen". Die Farbe ist unpassend und recht starr. Ebenso ist die Schrift darauf extrem schwer zu lesen.

Der Vorschlag muss für alle 4 themes passen. Danke!



## Response:
4.10.2025, 14:43:19

Ich suche zunächst die aktuelle Version der styles.css im Projekt-Dateispeicher, um die bestehende Gestaltung der sekundären Schaltflächen zu analysieren.

**project_knowledge_search**

*Request*

````javascript
{
  "query": "styles.css sekundäre Schaltflächen secondary button"
}
````

*Response*

````plaintext
styles.css
ory-item:hover {
    background-color: var(--color-surface);
    border-left-width: 6px;
    transform: translateX(2px);
}

.sidebar-history .history-item-title {
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 5px;
    transition: color var(--transition-medium);
}

.sidebar-history .history-item-time {
    font-size: 0.85em;
    color: var(--color-text-secondary);
    transition: color var(--transition-medium);
}

.sidebar-history .history-empty {
    text-align: center;
    color: var(--color-text-disabled);
    padding: 40px 20px;
    font-style: italic;
}

/* ===== HISTORY CONTROL BUTTONS ===== */
.sidebar-history #history-controls-subheader button,
.sidebar-history #history-action-controls button {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color var(--transition-fast);
}

.sidebar-history #history-controls-subheader button:hover,
.sidebar-history #history-action-controls button:hover {
    background-color: var(--color-primary-hover);
}

.sidebar-history #history-controls-subheader button:focus,
.sidebar-history #history-action-controls button:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
}

/* ===== SIDEBAR CONTAINER (alle Sidebars zusammen) ===== */
.sidebar-container {
    position: fixed;
    left: 0;
    top: var(--top-nav-height);
    width: 280px;
    height: calc(100vh - var(--top-nav-height) - var(--tips-footer-height, 0px));
    z-index: 998;
    transform: translateX(-100%);
    /* KEINE transition hier!
````

````plaintext
styles.css
er: 2px solid var(--color-border);
    border-radius: 5px;
    padding: 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1em;
    line-height: 1.6;
    resize: none;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    transition: background-color var(--transition-medium), color var(--transition-medium), border-color var(--transition-medium);
}

#notes-textarea:focus {
    outline: 2px solid var(--color-border-strong);
    border-color: var(--color-border-strong);
}

.notes-footer {
    padding: 15px 20px;
    border-top: 2px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-surface);
    transition: background-color var(--transition-medium), border-color var(--transition-medium);
}

.btn-secondary {
    padding: 10px 15px;
    background-color: var(--color-error);
    color: var(--color-surface-elevated);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color var(--transition-fast);
}

.btn-secondary:hover {
    background-color: #c82333;
}

.btn-secondary:focus {
    outline: var(--focus-outline-width) solid var(--color-focus);
    outline-offset: 2px;
}

.save-indicator {
    font-size: 0.85em;
    color: var(--color-success);
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.save-indicator.visible {
    opacity: 1;
}

/* ===== BARRIEREFREIHEIT ===== */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border-width: 0;
}

/* Scroll-Highlight fÃ¼r Navigation-Ziele */
.scroll-highlight {
    animation: scrollHighlight 2s ease;
}

@keyframes scrollHighlight {
    0%, 100% { 
        box-shadow: none;
    }
    25%, 75% { 
        box-shadow: 0 0 0 3px var(--color-primary);
    }
    50% { 
        box-shadow: 0 0 0 5px var(--color-primary);
    }
}

/* ===== TOP NAVIGATION BAR ===== */
.top-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--top-nav-height);
    background-color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 2px 10px var(--color-shadow-strong);
    z-index: 1001;
    transition: background-color var(--transition-medium);
}

.top-nav-le
````

````plaintext
styles.css
/* ===== RESET UND GRUNDLAGEN ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* ===== THEME SYSTEM: CSS CUSTOM PROPERTIES ===== */
:root {
    /* Tag-Modus (Standard) - WCAG AAA konform */
    --color-text-primary: #222222;
    --color-text-secondary: #444444;
    --color-text-disabled: #999999;
    --color-surface: #FAFAFA;
    --color-surface-elevated: #FFFFFF;
    --color-primary: #004B76;
    --color-primary-hover: #003A5C;
    --color-success: #005C45;
    --color-warning: #F9E03A;
    --color-warning-text: #000000;
    --color-error: #780F2D;
    --color-info: #004B76;
    --color-border: #D8D8D8;
    --color-border-strong: #0066cc;
    --color-shadow: rgba(0, 0, 0, 0.1);
    --color-shadow-strong: rgba(0, 0, 0, 0.2);
    --color-focus: #ff9900;
    
    /* Dimensions */
    --top-nav-height: 60px;
    --tips-footer-height: 80px;
    --sidebar-top: var(--top-nav-height);
    --focus-outline-width: 2px;
    --border-width: 1px;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
}

/* Nacht-Modus - WCAG AA/AAA konform */
[data-theme="dark"] {
    --color-text-primary: #DEDEDE;
    --color-text-secondary: #999999;
    --color-text-disabled: #616161;
    --color-surface: #121212;
    --color-surface-elevated: #1E1E1E;
    --color-primary: #5EB3FF;
    --color-primary-hover: #7EC1FF;
    --color-success: #81C784;
    --color-warning: #FFB74D;
    --color-warning-text: #000000;
    --color-error: #EF5350;
    --color-info: #5EB3FF;
    --color-border: #2C2C2C;
    --color-border-strong: #5EB3FF;
    --color-shadow: rgba(0, 0, 0, 0.3);
    --color-shadow-strong: rgba(0, 0, 0, 0.5);
    --color-focus: #FFB74D;
}

/* Hochkontrast Schwarz-WeiÃŸ - WCAG AAA Maximum */
[data-theme="contrast-high"] {
    --color-text-primary: #000000;
    --color-text-secondary: #000000;
    --color-text-disabled: #666666;
    --color-surface: #FFFFFF;
    --color-surface-elevated: #FFFFFF;
    --color-primary: #000080;
    --color-primary-hover: #000060;
    --color-success: #004000;
    --color-warning: #FFFF00;
    --color-warning-text: #000000;
    --color-error: #8B0000;
    --color-info: #000080;
    --color-border: #000000;
    --color-border-strong: #000000;
    --color-shadow: rgba(0, 0, 0, 0.3);
    --color-shadow-strong: rgba(0, 0, 0, 0.5);
    --color-focus: #000000;
    --border-width: 2px;
    --focus-outline-width: 4px;
}

/* Hochkontrast WeiÃŸ-Schwarz (Invers) - WCAG AAA Maximum */
[data
````

````plaintext
index.html
    <span class="sidebar-tab-icon">ðŸ•</span>
                    <span class="sidebar-tab-text">Verlauf</span>
                </button>

                <!-- Close-Button im Header -->
                <button class="sidebar-close-btn"
                        aria-label="Verlauf schlieÃŸen"
                        data-sidebar="history">
                    âœ•
                </button>
            </div>

            <div class="sidebar-tab-body">
                <!-- Subheader (nur bei aktiver Sidebar) -->
                <div class="sidebar-subheader">
                    <div id="history-controls-subheader" style="display: flex; gap: 10px;">
                        <button id="time-format-toggle"
                                class="btn-secondary"
                                style="flex: 1; padding: 8px; font-size: 0.9em; color: var(--color-text-secondary);"
                                aria-label="Zeitformat umschalten">
                            ðŸ• Zeit: Relativ
                        </button>
                    </div>
                </div>

                <!-- Body (Content-Bereich) -->
                <div class="sidebar-body">
                    <div id="history-list"></div>
                    <div id="history-empty" class="history-empty">Noch keine EintrÃ¤ge</div>
                </div>

                <!-- Footer (LÃ¶schen-Button) -->
                <div class="sidebar-footer">
                    <div id="history-controls-footer" style="display: flex; gap: 10px;">
                        <button id="clear-history-btn"
                                class="btn-secondary"
                                style="flex: 1; padding: 8px; font-size: 0.9em; color: var(--color-text-secondary);"
                                aria-label="Verlauf lÃ¶schen">
                            ðŸ—‘ï¸ LÃ¶schen
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Weitere Sidebars kommen hier spÃ¤ter hinzu (Favoriten, etc.)
````

````plaintext
index.html
l="2" 
                        aria-pressed="false"
                        title="Ebene 2: Standard">
                        2
                    </button>
                    <button 
                        class="detail-btn-mini" 
                        data-level="3" 
                        aria-pressed="false"
                        title="Ebene 3: VollstÃ¤ndig">
                        3
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Menu Dropdown -->
    <div id="menu-dropdown" class="menu-dropdown" role="menu" aria-hidden="true">
        <button class="menu-item" id="show-history-btn" role="menuitem">
            <span class="menu-icon">ðŸ“œ</span>
            Verlauf ein/aus
        </button>
        <button class="menu-item" id="toggle-nav-sidebar-btn" role="menuitem">
            <span class="menu-icon">ðŸ—‚ï¸</span>
            Navigation ein/aus
        </button>
        <button class="menu-item" id="toggle-tips-footer-btn" role="menuitem">
            <span class="menu-icon">ðŸ’¡</span>
            Tipps ein/aus
        </button>
        
        <hr style="margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;">
        
        <button class="menu-item" id="toggle-theme" role="menuitem" aria-label="Theme wechseln">
            <div class="theme-icon">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            Theme: <span id="current-theme">System</span>
        </button>

        <button class="menu-item" id="toggle-media-layer" role="menuitem">
            <span class="menu-icon">ðŸ–¼ï¸</span>
            Medien: <span id="media-layer-status">Standard</span>
        </button>
        
        <button class="menu-item" id="toggle-contrast" role="menuitem">
            <span class="menu-icon">ðŸŒ—</span>
            Bild-Kontrast erhÃ¶hen
        </button>
    </div>

    <!-- Sidebar Container (zentrale Verwaltung) -->
    <div id="sidebar-contai
````

````plaintext
axiom-guide-implementation-doc.md
# Implementierungs-Anleitung: Neue Features fÃ¼r AXIOM Leitfaden

## Ãœbersicht der implementierten Features

### 1. **Tipps-Footer mit automatischem Wechsel**
- âœ… Fixierter Footer am unteren Bildschirmrand
- âœ… 10 verschiedene Tipps zu Tastenkombinationen und Funktionen
- âœ… Automatischer Wechsel alle 15 Sekunden mit Fade-Effekt
- âœ… Ein-/Ausblendbar Ã¼ber Close-Button oder MenÃ¼
- âœ… Wiedereinblendbar Ã¼ber statischen Footer-Button
- âœ… Status wird in localStorage gespeichert

### 2. **Navigation-Sidebar (links)**
- âœ… Kollabierbare Sidebar mit Seitennavigation
- âœ… Zeigt aktuelle Position im Leitfaden
- âœ… Einzelklick: Element aufklappen/zuklappen (fÃ¼r spÃ¤tere UntermenÃ¼s)
- âœ… Doppelklick: Direkt zum Abschnitt springen
- âœ… Automatische Hervorhebung des aktiven Abschnitts
- âœ… Ein-/Ausblendbar Ã¼ber MenÃ¼ oder Close-Button
- âœ… Responsive: Mobile Vollbild-Overlay

### 3. **Verlaufsfenster**
- âœ… Modal-Dialog mit Historie besuchter Abschnitte
- âœ… Zeitstempel in zwei Formaten:
  - **Relativ**: "vor 2 Minuten", "vor 3 Stunden"
  - **Absolut**: "29.09.2025 14:23:45"
- âœ… Umschaltbar Ã¼ber Button im Modal-Header
- âœ… Klick auf Verlaufs-Eintrag springt zum Abschnitt
- âœ… Verlauf wird in localStorage persistiert
- âœ… LÃ¶sch-Funktion mit BestÃ¤tigungsdialog
- âœ… Ã–ffnung Ã¼ber Hamburger-MenÃ¼ oben links

### 4. **Hamburger-MenÃ¼ (oben links)**
- âœ… Zentrale Navigation fÃ¼r alle Features
- âœ… Drei MenÃ¼punkte:
  - Verlauf anzeigen
  - Navigation ein/aus
  - Tipps ein/aus

---

## Schritt-fÃ¼r-Schritt Implementierung

### **Schritt 1: HTML-Struktur ergÃ¤nzen**

1. **Ã–ffnen Sie `index.html`**

2. **Direkt nach `<body>` Tag einfÃ¼gen:**
   - Top Navigation mit Hamburger-MenÃ¼
   - MenÃ¼-Dropdown
   - Navigation Sidebar
   
3. **Vor dem schlieÃŸenden `</body>` Tag einfÃ¼gen:**
   - Verlaufsfenster (Modal)
   - Tipps-Footer

4. **Statischen Footer ersetzen** mit der erweiterten Version (enthÃ¤lt Button zum Einblenden der Tipps)

5. **WICHTIG: data-section und data-title Attribute ergÃ¤nzen**
   `​`​`html
   <section class="content-section" data-section="intro" data-title="Ãœberblick">
   <section class="content-section" data-section="step1" data-title="Schritt 1: Export starten">
   <!-- etc. -->
   `​`​`

**Datei:** `axiom-guide-updates-html` Artifact

---

### **Schritt 2: CSS-Styling hinzufÃ¼gen**

1. **Ã–ffnen Sie `styles.css`**

2. **Am Ende der Datei einfÃ¼gen:**
   - Top Navigation Styles
   - Navigation Sidebar Styles
   - Modal/Verlaufsfenster Styles
   - Tipps-Footer Styles
   - Responsive Anpassungen

3. **Beachten Sie die automatischen Anpassungen:**
   - `body` erhÃ¤lt `padding-top: 80px` (fÃ¼r Top-Nav)
   - `body` erhÃ¤lt `padding-bottom: 80px` (fÃ¼r Tipps-Footer)
   - Container-Margins passen sich an geÃ¶ffnete Sidebars an

**Datei:** `axiom-guide-updates-css` Artifact

---

### **Schritt 3: JavaScript-FunktionalitÃ¤t implementieren**

1. **Ã–ffnen Sie `script.js`**

2.
````

````plaintext
styles.css
     max-height: 90vh;
    }
}

/* ===== HIGH CONTRAST MODE ENHANCEMENTS ===== */
@media (prefers-contrast: high) {
    .notes-toggle {
        border: 3px solid var(--color-surface-elevated);
    }
    
    button {
        border-width: var(--border-width);
    }
}

/* ===== FORCED COLORS MODE (Windows High Contrast) ===== */
@media (forced-colors: active) {
    button {
        border: 2px solid ButtonText;
        background-color: ButtonFace;
        color: ButtonText;
    }
    
    a {
        color: LinkText;
    }
    
    .nav-item.active {
        background-color: Highlight;
        color: HighlightText;
    }
}

/* ===== SYSTEM PREFERENCE DETECTION ===== */
@media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
        /* Optional: Auto Dark Mode wenn keine PrÃ¤ferenz gespeichert */
    }
}

@media (prefers-contrast: more) {
    :root {
        --border-width: 2px;
        --focus-outline-width: 4px;
    }
}

/* ===== THEME ICON ===== */
.theme-icon {
    display: inline-grid;
    grid-template-columns: 10px 10px;
    grid-template-rows: 10px 10px;
    gap: 2px;
    margin-right: 10px;
    vertical-align: middle;
}

.theme-icon div {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    transition: background-color var(--transition-medium);
}

.theme-icon div:nth-child(1) {
    background-color: var(--color-primary);  /* PrimÃ¤rfarbe - dominanter Eindruck */
}

.theme-icon div:nth-child(2) {
    background-color: var(--color-surface);  /* Hintergrund - zeigt Hell/Dunkel */
}

.theme-icon div:nth-child(3) {
    background-color: var(--color-success);  /* Erfolgsfarbe - Akzentfarbe */
}

.theme-icon div:nth-child(4) {
    background-color: var(--color-border-strong);  /* Border - zeigt Kontrast */
}

/* ============================================================================
 *  GENERISCHES SIDEBAR-FRAMEWORK
 *  HinzufÃ¼gen am Ende von styles.css (nach dem bestehenden Code)
 *  ============================================================================ */

/* ===== SIDEBAR CONTAINER (alle Sidebars zusammen) ===== */
/* Sidebar initial UND geschlossen: Keine Transition */
.sidebar-container {
    position: fixed;
    left: 0;
    top: var(--top-nav-height);
    width: 280px;
    z-index: 998;
    /* transform: translateX(-100%); */
    box-shadow: -3px 0 15px var(--color-shadow-strong);
    transition: right var(--transition-medium), background-color var(--transition-medium);
    /* KEINE transition hier!
````

````plaintext
styles.css
 background: rgba(255,255,255,0.3);
}

.modal-header-btn:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
}

.modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
}

.history-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.history-item {
    padding: 15px;
    border-left: 4px solid var(--color-primary);
    background-color: var(--color-surface);
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.history-item:hover {
    background-color: var(--color-surface-elevated);
    border-left-width: 6px;
}

.history-item-title {
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 5px;
    transition: color var(--transition-medium);
}

.history-item-time {
    font-size: 0.85em;
    color: var(--color-text-secondary);
    transition: color var(--transition-medium);
}

.history-empty {
    text-align: center;
    color: var(--color-text-disabled);
    padding: 40px;
    font-style: italic;
}

/* ===== TIPPS-FOOTER ===== */
.tips-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: var(--color-surface-elevated);
    padding: 15px 20px;
    box-shadow: 0 -2px 10px var(--color-shadow-strong);
    z-index: 999;
    transform: translateY(0);
    transition: transform var(--transition-medium);
    display: flex;
    align-items: center;
    gap: 15px;
}

.tips-footer.hidden {
    transform: translateY(100%);
}

/* TIPPS NAVIGATION BUTTONS */
.tips-nav-btn {
    background: rgba(255,255,255,0.2);
    border: 2px solid white;
    color: white;
    font-size: 1em;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.tips-nav-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.1);
}

.tips-nav-btn:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
}

.tips-nav-btn:active {
    transform: scale(0.95);
}

/* TIPPS CONTENT */
.tips-content {
    display: flex;
    align-items: center;
    gap: 15px;
    flex: 1;
}

.tips-icon {
    font-size: 1.5em;
    flex-shrink: 0;
}

.tips-text {
    flex: 1;
    margin: 0;
    font-size: 1em;
    line-height: 1.4;
}

/* TIPPS CLOSE BUTTON */
.tips-close-btn {
    background: rgba(255
````

Ich habe die aktuelle styles.css analysiert. Nun schaue ich mir die vollständige Definition der sekundären Schaltflächen an, um einen passenderen Vorschlag zu erarbeiten.

**project_knowledge_search**

*Request*

````javascript
{
  "query": "btn-secondary color background theme hochkontrast"
}
````

*Response*

````plaintext
styles.css
/* ===== RESET UND GRUNDLAGEN ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* ===== THEME SYSTEM: CSS CUSTOM PROPERTIES ===== */
:root {
    /* Tag-Modus (Standard) - WCAG AAA konform */
    --color-text-primary: #222222;
    --color-text-secondary: #444444;
    --color-text-disabled: #999999;
    --color-surface: #FAFAFA;
    --color-surface-elevated: #FFFFFF;
    --color-primary: #004B76;
    --color-primary-hover: #003A5C;
    --color-success: #005C45;
    --color-warning: #F9E03A;
    --color-warning-text: #000000;
    --color-error: #780F2D;
    --color-info: #004B76;
    --color-border: #D8D8D8;
    --color-border-strong: #0066cc;
    --color-shadow: rgba(0, 0, 0, 0.1);
    --color-shadow-strong: rgba(0, 0, 0, 0.2);
    --color-focus: #ff9900;
    
    /* Dimensions */
    --top-nav-height: 60px;
    --tips-footer-height: 80px;
    --sidebar-top: var(--top-nav-height);
    --focus-outline-width: 2px;
    --border-width: 1px;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
}

/* Nacht-Modus - WCAG AA/AAA konform */
[data-theme="dark"] {
    --color-text-primary: #DEDEDE;
    --color-text-secondary: #999999;
    --color-text-disabled: #616161;
    --color-surface: #121212;
    --color-surface-elevated: #1E1E1E;
    --color-primary: #5EB3FF;
    --color-primary-hover: #7EC1FF;
    --color-success: #81C784;
    --color-warning: #FFB74D;
    --color-warning-text: #000000;
    --color-error: #EF5350;
    --color-info: #5EB3FF;
    --color-border: #2C2C2C;
    --color-border-strong: #5EB3FF;
    --color-shadow: rgba(0, 0, 0, 0.3);
    --color-shadow-strong: rgba(0, 0, 0, 0.5);
    --color-focus: #FFB74D;
}

/* Hochkontrast Schwarz-WeiÃŸ - WCAG AAA Maximum */
[data-theme="contrast-high"] {
    --color-text-primary: #000000;
    --color-text-secondary: #000000;
    --color-text-disabled: #666666;
    --color-surface: #FFFFFF;
    --color-surface-elevated: #FFFFFF;
    --color-primary: #000080;
    --color-primary-hover: #000060;
    --color-success: #004000;
    --color-warning: #FFFF00;
    --color-warning-text: #000000;
    --color-error: #8B0000;
    --color-info: #000080;
    --color-border: #000000;
    --color-border-strong: #000000;
    --color-shadow: rgba(0, 0, 0, 0.3);
    --color-shadow-strong: rgba(0, 0, 0, 0.5);
    --color-focus: #000000;
    --border-width: 2px;
    --focus-outline-width: 4px;
}

/* Hochkontrast WeiÃŸ-Schwarz (Invers) - WCAG AAA Maximum */
[data
````

````plaintext
styles.css
er: 2px solid var(--color-border);
    border-radius: 5px;
    padding: 15px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1em;
    line-height: 1.6;
    resize: none;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    transition: background-color var(--transition-medium), color var(--transition-medium), border-color var(--transition-medium);
}

#notes-textarea:focus {
    outline: 2px solid var(--color-border-strong);
    border-color: var(--color-border-strong);
}

.notes-footer {
    padding: 15px 20px;
    border-top: 2px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-surface);
    transition: background-color var(--transition-medium), border-color var(--transition-medium);
}

.btn-secondary {
    padding: 10px 15px;
    background-color: var(--color-error);
    color: var(--color-surface-elevated);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color var(--transition-fast);
}

.btn-secondary:hover {
    background-color: #c82333;
}

.btn-secondary:focus {
    outline: var(--focus-outline-width) solid var(--color-focus);
    outline-offset: 2px;
}

.save-indicator {
    font-size: 0.85em;
    color: var(--color-success);
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.save-indicator.visible {
    opacity: 1;
}

/* ===== BARRIEREFREIHEIT ===== */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border-width: 0;
}

/* Scroll-Highlight fÃ¼r Navigation-Ziele */
.scroll-highlight {
    animation: scrollHighlight 2s ease;
}

@keyframes scrollHighlight {
    0%, 100% { 
        box-shadow: none;
    }
    25%, 75% { 
        box-shadow: 0 0 0 3px var(--color-primary);
    }
    50% { 
        box-shadow: 0 0 0 5px var(--color-primary);
    }
}

/* ===== TOP NAVIGATION BAR ===== */
.top-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--top-nav-height);
    background-color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 2px 10px var(--color-shadow-strong);
    z-index: 1001;
    transition: background-color var(--transition-medium);
}

.top-nav-le
````

````plaintext
styles.css
     max-height: 90vh;
    }
}

/* ===== HIGH CONTRAST MODE ENHANCEMENTS ===== */
@media (prefers-contrast: high) {
    .notes-toggle {
        border: 3px solid var(--color-surface-elevated);
    }
    
    button {
        border-width: var(--border-width);
    }
}

/* ===== FORCED COLORS MODE (Windows High Contrast) ===== */
@media (forced-colors: active) {
    button {
        border: 2px solid ButtonText;
        background-color: ButtonFace;
        color: ButtonText;
    }
    
    a {
        color: LinkText;
    }
    
    .nav-item.active {
        background-color: Highlight;
        color: HighlightText;
    }
}

/* ===== SYSTEM PREFERENCE DETECTION ===== */
@media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
        /* Optional: Auto Dark Mode wenn keine PrÃ¤ferenz gespeichert */
    }
}

@media (prefers-contrast: more) {
    :root {
        --border-width: 2px;
        --focus-outline-width: 4px;
    }
}

/* ===== THEME ICON ===== */
.theme-icon {
    display: inline-grid;
    grid-template-columns: 10px 10px;
    grid-template-rows: 10px 10px;
    gap: 2px;
    margin-right: 10px;
    vertical-align: middle;
}

.theme-icon div {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    transition: background-color var(--transition-medium);
}

.theme-icon div:nth-child(1) {
    background-color: var(--color-primary);  /* PrimÃ¤rfarbe - dominanter Eindruck */
}

.theme-icon div:nth-child(2) {
    background-color: var(--color-surface);  /* Hintergrund - zeigt Hell/Dunkel */
}

.theme-icon div:nth-child(3) {
    background-color: var(--color-success);  /* Erfolgsfarbe - Akzentfarbe */
}

.theme-icon div:nth-child(4) {
    background-color: var(--color-border-strong);  /* Border - zeigt Kontrast */
}

/* ============================================================================
 *  GENERISCHES SIDEBAR-FRAMEWORK
 *  HinzufÃ¼gen am Ende von styles.css (nach dem bestehenden Code)
 *  ============================================================================ */

/* ===== SIDEBAR CONTAINER (alle Sidebars zusammen) ===== */
/* Sidebar initial UND geschlossen: Keine Transition */
.sidebar-container {
    position: fixed;
    left: 0;
    top: var(--top-nav-height);
    width: 280px;
    z-index: 998;
    /* transform: translateX(-100%); */
    box-shadow: -3px 0 15px var(--color-shadow-strong);
    transition: right var(--transition-medium), background-color var(--transition-medium);
    /* KEINE transition hier!
````

````plaintext
styles.css
-theme="contrast-inverse"] {
    --color-text-primary: #FFFFFF;
    --color-text-secondary: #FFFFFF;
    --color-text-disabled: #999999;
    --color-surface: #000000;
    --color-surface-elevated: #000000;
    --color-primary: #00BFFF;
    --color-primary-hover: #00D4FF;
    --color-success: #00FF00;
    --color-warning: #FFFF00;
    --color-warning-text: #000000;
    --color-error: #FF6B6B;
    --color-info: #00BFFF;
    --color-border: #FFFFFF;
    --color-border-strong: #FFFFFF;
    --color-shadow: rgba(255, 255, 255, 0.1);
    --color-shadow-strong: rgba(255, 255, 255, 0.2);
    --color-focus: #FFFF00;
    --border-width: 2px;
    --focus-outline-width: 4px;
}

/* Body */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--color-text-primary);
    background-color: var(--color-surface);
    padding: 20px;
    padding-top: calc(var(--top-nav-height) + 20px);
    padding-bottom: calc(var(--tips-footer-height) + 20px);
    padding-right: 20px;
    transition: background-color var(--transition-medium), color var(--transition-medium);
}

body.tips-hidden {
    --tips-footer-height: 0px;
}

/* ===== CONTAINER ===== */
.container {
    max-width: 1200px;
    margin: 0 auto;
    background-color: var(--color-surface-elevated);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px var(--color-shadow);
    transition: margin-right var(--transition-medium), background-color var(--transition-medium);
}

body.notes-open .container {
    margin-right: 320px;
}

/* ===== HEADER ===== */
header {
    border-bottom: 3px solid var(--color-border-strong);
    padding-bottom: 20px;
    margin-bottom: 30px;
}

h1 {
    color: var(--color-primary);
    font-size: 2em;
    margin-bottom: 10px;
    transition: color var(--transition-medium);
}

.subtitle {
    color: var(--color-text-secondary);
    font-size: 1.1em;
    transition: color var(--transition-medium);
}

/* ===== ÃœBERSCHRIFTEN ===== */
h2 {
    color: var(--color-primary);
    font-size: 1.6em;
    margin-top: 30px;
    margin-bottom: 15px;
    border-bottom: 2px solid var(--color-border);
    padding-bottom: 10px;
    transition: color var(--transition-medium), border-color var(--transition-medium);
}

h3 {
    color: var(--color-primary);
    font-size: 1.3em;
    margin-top: 25px;
    margin-bottom: 12px;
    transition: color var(--transition-medium);
}

h4 {
    color: var(--color-text-primary);
    font-size: 1.1em;
    margin
````

````plaintext
styles.css
-top: 20px;
    margin-bottom: 10px;
    font-weight: 600;
    transition: color var(--transition-medium);
}

/* ===== CONTENT-BEREICHE ===== */
.content-section {
    margin-bottom: 40px;
    transition: opacity var(--transition-medium);
}

.content-section.out-of-focus {
    opacity: 0.4;
}

p {
    margin-bottom: 15px;
    text-align: justify;
}

strong {
    color: var(--color-primary);
    font-weight: 600;
    transition: color var(--transition-medium);
}

/* ===== DETAILEBENEN ===== */
.detail-level-1 {
    display: block;
}

.detail-level-2 {
    display: none;
    padding-left: 20px;
    border-left: 3px solid var(--color-primary);
    margin-top: 15px;
    margin-bottom: 15px;
    transition: border-color var(--transition-medium);
}

.detail-level-3 {
    display: none;
    padding-left: 20px;
    border-left: 3px solid var(--color-primary);
    margin-top: 15px;
    margin-bottom: 15px;
    background-color: var(--color-surface);
    padding: 15px;
    border-radius: 5px;
    transition: background-color var(--transition-medium), border-color var(--transition-medium);
}

/* ===== LISTEN ===== */
ul, ol {
    margin-left: 30px;
    margin-bottom: 15px;
}

li {
    margin-bottom: 8px;
}

code {
    background-color: var(--color-surface);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    transition: background-color var(--transition-medium);
}

/* ===== INFO-BOXEN ===== */
.info-box {
    background-color: var(--color-surface);
    border-left: 4px solid var(--color-info);
    padding: 15px;
    margin: 20px 0;
    border-radius: 4px;
    transition: background-color var(--transition-medium), border-color var(--transition-medium);
}

.warning-box {
    background-color: var(--color-surface);
    border-left: 4px solid var(--color-warning);
    padding: 15px;
    margin: 20px 0;
    border-radius: 4px;
    transition: background-color var(--transition-medium), border-color var(--transition-medium);
}

.tip-box {
    background-color: var(--color-surface);
    border-left: 4px solid var(--color-success);
    padding: 15px;
    margin: 20px 0;
    border-radius: 4px;
    transition: background-color var(--transition-medium), border-color var(--transition-medium);
}

/* ===== FOOTER ===== */
footer {
    margin-top: 50px;
    padding-top: 20px;
    border-top: 2px solid var(--color-border);
    text-align: center;
    color: var(--color-text-secondary);
    transition: border-color var(--transition-medium
````

````plaintext
index.html
l="2" 
                        aria-pressed="false"
                        title="Ebene 2: Standard">
                        2
                    </button>
                    <button 
                        class="detail-btn-mini" 
                        data-level="3" 
                        aria-pressed="false"
                        title="Ebene 3: VollstÃ¤ndig">
                        3
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Menu Dropdown -->
    <div id="menu-dropdown" class="menu-dropdown" role="menu" aria-hidden="true">
        <button class="menu-item" id="show-history-btn" role="menuitem">
            <span class="menu-icon">ðŸ“œ</span>
            Verlauf ein/aus
        </button>
        <button class="menu-item" id="toggle-nav-sidebar-btn" role="menuitem">
            <span class="menu-icon">ðŸ—‚ï¸</span>
            Navigation ein/aus
        </button>
        <button class="menu-item" id="toggle-tips-footer-btn" role="menuitem">
            <span class="menu-icon">ðŸ’¡</span>
            Tipps ein/aus
        </button>
        
        <hr style="margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;">
        
        <button class="menu-item" id="toggle-theme" role="menuitem" aria-label="Theme wechseln">
            <div class="theme-icon">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            Theme: <span id="current-theme">System</span>
        </button>

        <button class="menu-item" id="toggle-media-layer" role="menuitem">
            <span class="menu-icon">ðŸ–¼ï¸</span>
            Medien: <span id="media-layer-status">Standard</span>
        </button>
        
        <button class="menu-item" id="toggle-contrast" role="menuitem">
            <span class="menu-icon">ðŸŒ—</span>
            Bild-Kontrast erhÃ¶hen
        </button>
    </div>

    <!-- Sidebar Container (zentrale Verwaltung) -->
    <div id="sidebar-contai
````

````plaintext
styles.css
 background: rgba(255,255,255,0.3);
}

.modal-header-btn:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
}

.modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
}

.history-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.history-item {
    padding: 15px;
    border-left: 4px solid var(--color-primary);
    background-color: var(--color-surface);
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.history-item:hover {
    background-color: var(--color-surface-elevated);
    border-left-width: 6px;
}

.history-item-title {
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 5px;
    transition: color var(--transition-medium);
}

.history-item-time {
    font-size: 0.85em;
    color: var(--color-text-secondary);
    transition: color var(--transition-medium);
}

.history-empty {
    text-align: center;
    color: var(--color-text-disabled);
    padding: 40px;
    font-style: italic;
}

/* ===== TIPPS-FOOTER ===== */
.tips-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: var(--color-surface-elevated);
    padding: 15px 20px;
    box-shadow: 0 -2px 10px var(--color-shadow-strong);
    z-index: 999;
    transform: translateY(0);
    transition: transform var(--transition-medium);
    display: flex;
    align-items: center;
    gap: 15px;
}

.tips-footer.hidden {
    transform: translateY(100%);
}

/* TIPPS NAVIGATION BUTTONS */
.tips-nav-btn {
    background: rgba(255,255,255,0.2);
    border: 2px solid white;
    color: white;
    font-size: 1em;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.tips-nav-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.1);
}

.tips-nav-btn:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
}

.tips-nav-btn:active {
    transform: scale(0.95);
}

/* TIPPS CONTENT */
.tips-content {
    display: flex;
    align-items: center;
    gap: 15px;
    flex: 1;
}

.tips-icon {
    font-size: 1.5em;
    flex-shrink: 0;
}

.tips-text {
    flex: 1;
    margin: 0;
    font-size: 1em;
    line-height: 1.4;
}

/* TIPPS CLOSE BUTTON */
.tips-close-btn {
    background: rgba(255
````

````plaintext
script-theme.js
// ===== THEME MANAGEMENT =====
// Modul: script-theme.js
// Verwaltet Theme-Wechsel (Tag, Nacht, Hochkontrast)

(function() {
    'use strict';

    const MODULE = 'THEME';

    // ===== THEME KONSTANTEN =====
    const THEMES = {
        SYSTEM: 'system',
 LIGHT: 'light',
 DARK: 'dark',
 CONTRAST_HIGH: 'contrast-high',
 CONTRAST_INVERSE: 'contrast-inverse'
    };

    const THEME_NAMES = {
        'system': 'System',
 'light': 'Tag',
 'dark': 'Nacht',
 'contrast-high': 'Kontrast+',
 'contrast-inverse': 'Kontrast-'
    };

    const THEME_ORDER = [
        THEMES.SYSTEM,
        THEMES.LIGHT,
        THEMES.DARK,
        THEMES.CONTRAST_HIGH,
        THEMES.CONTRAST_INVERSE
    ];

    let currentTheme = THEMES.SYSTEM;

    // ===== INITIALISIERUNG =====
    function initTheme() {
        LOG(MODULE, 'Initializing theme system...');

        // Gespeicherte Theme-PrÃ¤ferenz laden
        loadThemePreference();

        // Theme-Button Event-Listener
        const themeButton = document.getElementById('toggle-theme');
        if (themeButton) {
            themeButton.addEventListener('click', cycleTheme);
            LOG.success(MODULE, 'Theme toggle button initialized');
        } else {
            LOG.warn(MODULE, 'Theme toggle button (#toggle-theme) not found');
        }

        // System Theme Change Listener
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addEventListener('change', handleSystemThemeChange);

        LOG.success(MODULE, `Theme system initialized with theme: ${currentTheme}`);
    }

    // ===== THEME LADEN =====
    function loadThemePreference() {
        try {
            const saved = localStorage.getItem('axiom-guide-theme');

            if (saved && Object.values(THEMES).includes(saved)) {
                currentTheme = saved;
                LOG(MODULE, `Loaded saved theme: ${currentTheme}`);
            } else {
                currentTheme = THEMES.SYSTEM;
                LOG(MODULE, 'No saved theme, using system default');
            }

            apply
````

Perfekt! Ich habe nun ein vollständiges Bild der aktuellen Situation. Die sekundären Schaltflächen (`.btn-secondary`) verwenden derzeit:

**Aktueller Zustand:**
- Hintergrundfarbe: `var(--color-error)` (also Rot-Töne wie #780F2D im Tag-Modus)
- Textfarbe: `var(--color-surface-elevated)` (Weiß)
- Hover: Hartcodiertes `#c82333` (funktioniert nicht in allen Themes)

**Probleme:**
1. **Semantisch unpassend**: Error-Farbe für neutrale Aktionen (Zeitformat-Umschaltung)
2. **Starr codiert**: Hover-Farbe ist hartcodiert und passt sich nicht an Themes an
3. **Schlechte Lesbarkeit**: Kontrast zwischen Rot und Weiß ist zwar ausreichend, aber nicht optimal

Ich erarbeite nun einen Verbesserungsvorschlag:

---

## **Vorschlag für sekundäre Schaltflächen**

Ich schlage vor, die `.btn-secondary` Klasse vollständig zu überarbeiten und sie **semantisch neutral** sowie **theme-adaptiv** zu gestalten. Die Schaltflächen sollen sich klar von primären Aktionen unterscheiden, ohne eine fehlerhafte oder alarmierende Konnotation zu vermitteln.

### **Änderungsvorschlag für `.btn-secondary` in styles.css:**

```css
.btn-secondary {
    padding: 10px 15px;
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    border: 2px solid var(--color-border-strong);
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 500;
    transition: all var(--transition-fast);
}

.btn-secondary:hover {
    background-color: var(--color-border-strong);
    color: var(--color-surface-elevated);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px var(--color-shadow);
}

.btn-secondary:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px var(--color-shadow);
}

.btn-secondary:focus {
    outline: var(--focus-outline-width) solid var(--color-focus);
    outline-offset: 2px;
}
```

### **Begründung dieser Änderung:**

**Semantische Korrektheit:**
Die bisherige Verwendung der Error-Farbe (`var(--color-error)`) suggeriert fälschlicherweise eine gefährliche oder fehlerhafte Aktion. Die Schaltflächen "Zeit: Relativ/Absolut" und "Verlauf löschen" sind jedoch **neutrale Werkzeuge**. Die neue Gestaltung nutzt die Oberflächenfarbe (`var(--color-surface)`) als Basis und den starken Rahmen (`var(--color-border-strong)`) zur Betonung – dies ist semantisch passend für sekundäre, nicht-destruktive Aktionen.

**Theme-Adaptivität und Lesbarkeit:**
Der hartcodierte Hover-Wert `#c82333` funktioniert ausschließlich im Tag-Modus. In den anderen drei Themes (Nacht, Hochkontrast Hell, Hochkontrast Dunkel) wirkt diese Farbe deplatziert oder ist schlecht lesbar. Die neue Lösung **invertiert** bei Hover: Der Hintergrund wird zur Border-Farbe, der Text zur Surface-Farbe – dies schafft einen klaren visuellen Kontrast, der **in allen vier Themes konsistent** funktioniert. Die Schrift ist durch den dickeren Font-Weight (500) besser lesbar.

**Visuelle Hierarchie und Feedback:**
Durch die **subtile Elevation** bei Hover (`translateY(-1px)`) und den **Schatten** erhält der Nutzer unmittelbares haptisches Feedback. Die sekundären Buttons unterscheiden sich nun klar von primären Aktionen (die weiterhin `var(--color-primary)` verwenden) und kommunizieren ihre untergeordnete Rolle visuell deutlich. Die Verwendung von `transition: all` sorgt für flüssige Übergänge bei allen Zustandsänderungen.

---

## **Separate Verbesserungsvorschläge (nicht eingebaut)**

### **1. Unterscheidung zwischen neutralen und destruktiven sekundären Aktionen**

**Vorteile:**
Aktuell werden sowohl neutrale Aktionen (Zeitformat umschalten) als auch potenziell destruktive Aktionen (Verlauf löschen, Notizen löschen) mit derselben Klasse gestaltet. Eine **semantische Trennung** würde die User Experience verbessern: Destruktive Aktionen könnten eine zusätzliche Klasse `.btn-secondary-destructive` erhalten, die weiterhin Error-Farben verwendet. Dies würde visuell kommunizieren, dass eine Aktion unwiderrufliche Konsequenzen hat.

**Technik:**
Es würde eine neue Klasse eingeführt, die die `.btn-secondary` Basisstile erweitert:
```css
.btn-secondary.btn-secondary-destructive {
    background-color: var(--color-error);
    color: var(--color-surface-elevated);
    border-color: var(--color-error);
}
```
Die HTML-Elemente für "Verlauf löschen" und "Notizen löschen" würden dann `class="btn-secondary btn-secondary-destructive"` erhalten.

**Aufwand:**
Der Implementierungsaufwand ist gering – es müssen lediglich zwei HTML-Attribute erweitert werden. Die Laufzeit-Performance bleibt unverändert, da keine zusätzlichen JavaScript-Berechnungen notwendig sind. Die Pflege ist minimal: Neue destruktive Aktionen erhalten einfach die zusätzliche Klasse. Der Wartungsaufwand steigt nur marginal, da die Semantik klar dokumentiert ist.

---

### **2. Icon-Integration für bessere Erkennbarkeit**

**Vorteile:**
Die Schaltflächen verwenden bereits Emoji-Icons (🕐, 🗑️), diese sind jedoch **inline im HTML**. Eine CSS-basierte Icon-Integration mittels `::before` Pseudo-Elementen würde die Konsistenz erhöhen und die Barrierefreiheit verbessern. Screen Reader könnten dedizierte `aria-label` Attribute besser interpretieren, während visuelle Nutzer von **standardisierten, skalierbaren Icons** profitieren.

**Technik:**
Die Icons würden per CSS-Content-Property eingefügt. Alternativ könnten SVG-Sprite-Icons verwendet werden, die über `background-image` oder `mask-image` eingefügt werden. Dies würde die Anpassung an Themes (z.B. Farbinversion bei Hochkontrast) vereinfachen:
```css
.btn-secondary[data-action="time-toggle"]::before {
    content: "🕐";
    margin-right: 0.5em;
}
```

**Aufwand:**
Der Umsetzungsaufwand ist mittel: Die HTML-Struktur muss leicht angepasst werden (Icons aus dem Text entfernen, stattdessen `data-action` Attribute setzen). Die Laufzeit-Performance verbessert sich minimal, da weniger DOM-Nodes existieren. Die Pflege wird langfristig einfacher, da Icon-Änderungen zentral in CSS erfolgen können, anstatt in jedem HTML-Element einzeln. Bei Verwendung von SVG-Sprites wäre ein initialer Setup-Aufwand für das Sprite-System notwendig.

---

### **3. Adaptive Größenanpassung für mobile Geräte**

**Vorteile:**
Die aktuellen Schaltflächen haben eine fixe Größe (`padding: 10px 15px`, `font-size: 0.9em`). Auf **kleinen Bildschirmen** könnten diese schwer zu treffen sein, was die Barrierefreiheit gemäß BFSG beeinträchtigt. Eine **responsive Größenanpassung** würde sicherstellen, dass die Touch-Targets auf mobilen Geräten mindestens 44×44 Pixel groß sind (WCAG 2.1 Success Criterion 2.5.5).

**Technik:**
Mittels Media Queries würden die Button-Dimensionen für kleinere Viewports angepasst:
```css
@media (max-width: 768px) {
    .btn-secondary {
        padding: 12px 18px;
        font-size: 1em;
        min-width: 44px;
        min-height: 44px;
    }
}
```
Alternativ könnte ein `clamp()`-basierter Ansatz für flüssige Größenanpassungen verwendet werden.

**Aufwand:**
Der Implementierungsaufwand ist gering – eine einzelne Media Query genügt. Die Laufzeit-Performance bleibt konstant, da nur CSS-Rendering betroffen ist. Die Pflege ist minimal: Neue Breakpoints können bei Bedarf hinzugefügt werden. Der Testaufwand erhöht sich leicht, da verschiedene Viewport-Größen validiert werden müssen. Langfristig reduziert sich jedoch der Support-Aufwand, da weniger Usability-Beschwerden zu erwarten sind.

---

Möchten Sie, dass ich den **Hauptvorschlag** (theme-adaptive sekundäre Buttons) umsetze, oder sollen wir zunächst einen der **separaten Verbesserungsvorschläge** diskutieren?



## Prompt:
4.10.2025, 14:55:02

Ich habe diese Vorschlage umgesetzt und die Änderungen in index.html und styles.css durchgeführt und im Projekt-Dateispeicher aktualisiert.

Gern höre ich nun weitere Verbesserungsvorschläge.



## Response:
4.10.2025, 14:55:57

Ich analysiere zunächst die aktuellen Dateien im Projekt-Dateispeicher, um den neuesten Stand zu erfassen und darauf aufbauend weitere Verbesserungsvorschläge zu erarbeiten.

**project_knowledge_search**

*Request*

````javascript
{
  "query": "styles.css btn-secondary aktuell"
}
````

*Response*

````plaintext
styles.css
ground-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    transition: background-color var(--transition-medium), color var(--transition-medium), border-color var(--transition-medium);
}

#notes-textarea:focus {
    outline: 2px solid var(--color-border-strong);
    border-color: var(--color-border-strong);
}

.notes-footer {
    padding: 15px 20px;
    border-top: 2px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-surface);
    transition: background-color var(--transition-medium), border-color var(--transition-medium);
}

.btn-secondary {
    padding: 10px 15px;
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    border: 2px solid var(--color-border-strong);
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 500;
    transition: all var(--transition-fast);
    padding: 8px;
    flex: 1;
}

.btn-secondary[data-action="time-toggle"]::before {
    content: "ðŸ•";
    margin-right: 0.5em;
}

.btn-secondary:hover {
    background-color: var(--color-border-strong);
    color: var(--color-surface-elevated);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px var(--color-shadow);
}

.btn-secondary:active {
    transform: translateY(0);
    box-shadow: 0 1px 3px var(--color-shadow);
}

.btn-secondary:focus {
    outline: var(--focus-outline-width) solid var(--color-focus);
    outline-offset: 2px;
}

.btn-secondary.btn-secondary-destructive {
    background-color: var(--color-error);
    color: var(--color-surface-elevated);
    border-color: var(--color-error);
}

.save-indicator {
    font-size: 0.85em;
    color: var(--color-success);
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.save-indicator.visible {
    opacity: 1;
}

/* ===== BARRIEREFREIHEIT ===== */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border-width: 0;
}

/* Scroll-Highlight fÃ¼r Navigation-Ziele */
.scroll-highlight {
    animation: scrollHighlight 2s ease;
}

@keyframes scrollHighlight {
    0%, 100% { 
        box-shadow: none;
    }
    25%, 75% { 
        box-shadow: 0 0 0 3px var(--color-primary);
    }
    50% { 
        box-shadow: 0 0 0 5px var(--color-primary);
    }
}

/* ===== TOP NAVIGATION BAR ===== */
.top-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    heig
````

````plaintext
styles.css
*/
    /* âœ… NEU - Flex-Container fÃ¼r die Sidebars */
    display: flex;
    flex-direction: column;
}

/* Tips Footer sichtbar: HÃ¶he anpassen */
body:not(.tips-hidden) .sidebar-container {
    height: calc(100vh - var(--top-nav-height) - var(--tips-footer-height));
}

/* Tips Footer versteckt: volle HÃ¶he */
body.tips-hidden .sidebar-container {
    height: calc(100vh - var(--top-nav-height));
}

/* ===== SIDEBAR TAB-HEADER LAYOUT ===== */
.sidebar-tab-header {
    /* ... bestehende Styles ... */
    display: flex;
    justify-content: space-between; /* Button links, Close rechts */
    align-items: center;
    gap: 10px;
    flex-shrink: 0; /* feste HÃ¶he fÃ¼r tab-header */
}

/* ===== CLOSE-BUTTON IM TAB-HEADER ===== */
.sidebar-close-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: var(--color-surface-elevated);
    font-size: 1.3em;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 4px;
    transition: all var(--transition-fast);
    flex-shrink: 0;
    opacity: 0;  /* Initial unsichtbar */
    pointer-events: none;  /* Nicht klickbar wenn unsichtbar */
}

.sidebar-close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

.sidebar-close-btn:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
}

/* Close-Button nur bei aktiver Sidebar zeigen */
.sidebar-wrapper.active .sidebar-close-btn {
    opacity: 1;  /* Sichtbar bei aktiver Sidebar */
    pointer-events: auto;  /* Klickbar */
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
    .sidebar-container {
        width: 100%;
        left: -100%;
    }

    .sidebar-container.open {
        left: 0;
    }
}

@media (max-width: 768px) {
    .sidebar-tab-header {
        padding: 10px 12px;
    }

    .sidebar-tab-icon {
        font-size: 1.2em;
    }

    .sidebar-body {
        padding: 12px;
    }

    .btn-secondary {
        padding: 12px 18px;
        font-size: 1em;
        min-width: 44px;
        min-height: 44px;
    }
}

/* ===== ACCESSIBILITY ENHANCEMENTS ===== */
.sidebar-tab-button:focus {
    outline: 3px solid var(--color-focus);
    outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
    .sidebar-container,
    .sidebar-body,
    .sidebar-subheader,
    .sidebar-footer {
        transition: none;
        animation: none;
    }
}

/* Verstecke Subheader in Navigation-Sidebar */
#sidebar-navigation .sidebar-subheader {
    display: none !important;
}

/* Verstecke Subheader in Navigation-Sidebar */
#sidebar-navigation .sidebar-footer {
    display: none !important;
}
````

````plaintext
styles.css
/* ===== RESET UND GRUNDLAGEN ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* ===== THEME SYSTEM: CSS CUSTOM PROPERTIES ===== */
:root {
    /* Tag-Modus (Standard) - WCAG AAA konform */
    --color-text-primary: #222222;
    --color-text-secondary: #444444;
    --color-text-disabled: #999999;
    --color-surface: #FAFAFA;
    --color-surface-elevated: #FFFFFF;
    --color-primary: #004B76;
    --color-primary-hover: #003A5C;
    --color-success: #005C45;
    --color-warning: #F9E03A;
    --color-warning-text: #000000;
    --color-error: #780F2D;
    --color-info: #004B76;
    --color-border: #D8D8D8;
    --color-border-strong: #0066cc;
    --color-shadow: rgba(0, 0, 0, 0.1);
    --color-shadow-strong: rgba(0, 0, 0, 0.2);
    --color-focus: #ff9900;
    
    /* Dimensions */
    --top-nav-height: 60px;
    --tips-footer-height: 80px;
    --sidebar-top: var(--top-nav-height);
    --focus-outline-width: 2px;
    --border-width: 1px;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
}

/* Nacht-Modus - WCAG AA/AAA konform */
[data-theme="dark"] {
    --color-text-primary: #DEDEDE;
    --color-text-secondary: #999999;
    --color-text-disabled: #616161;
    --color-surface: #121212;
    --color-surface-elevated: #1E1E1E;
    --color-primary: #5EB3FF;
    --color-primary-hover: #7EC1FF;
    --color-success: #81C784;
    --color-warning: #FFB74D;
    --color-warning-text: #000000;
    --color-error: #EF5350;
    --color-info: #5EB3FF;
    --color-border: #2C2C2C;
    --color-border-strong: #5EB3FF;
    --color-shadow: rgba(0, 0, 0, 0.3);
    --color-shadow-strong: rgba(0, 0, 0, 0.5);
    --color-focus: #FFB74D;
}

/* Hochkontrast Schwarz-WeiÃŸ - WCAG AAA Maximum */
[data-theme="contrast-high"] {
    --color-text-primary: #000000;
    --color-text-secondary: #000000;
    --color-text-disabled: #666666;
    --color-surface: #FFFFFF;
    --color-surface-elevated: #FFFFFF;
    --color-primary: #000080;
    --color-primary-hover: #000060;
    --color-success: #004000;
    --color-warning: #FFFF00;
    --color-warning-text: #000000;
    --color-error: #8B0000;
    --color-info: #000080;
    --color-border: #000000;
    --color-border-strong: #000000;
    --color-shadow: rgba(0, 0, 0, 0.3);
    --color-shadow-strong: rgba(0, 0, 0, 0.5);
    --color-focus: #000000;
    --border-width: 2px;
    --focus-outline-width: 4px;
}

/* Hochkontrast WeiÃŸ-Schwarz (Invers) - WCAG AAA Maximum */
[data-theme="contrast-inverse"] {
    --color-text-primary
````

````plaintext
styles.css
ory-item:hover {
    background-color: var(--color-surface);
    border-left-width: 6px;
    transform: translateX(2px);
}

.sidebar-history .history-item-title {
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 5px;
    transition: color var(--transition-medium);
}

.sidebar-history .history-item-time {
    font-size: 0.85em;
    color: var(--color-text-secondary);
    transition: color var(--transition-medium);
}

.sidebar-history .history-empty {
    text-align: center;
    color: var(--color-text-disabled);
    padding: 40px 20px;
    font-style: italic;
}

/* ===== HISTORY CONTROL BUTTONS ===== */
.sidebar-history #history-controls-subheader button,
.sidebar-history #history-action-controls button {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color var(--transition-fast);
}

.sidebar-history #history-controls-subheader button:hover,
.sidebar-history #history-action-controls button:hover {
    background-color: var(--color-primary-hover);
}

.sidebar-history #history-controls-subheader button:focus,
.sidebar-history #history-action-controls button:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
}

/* ===== SIDEBAR CONTAINER (alle Sidebars zusammen) ===== */
.sidebar-container {
    position: fixed;
    left: 0;
    top: var(--top-nav-height);
    width: 280px;
    height: calc(100vh - var(--top-nav-height) - var(--tips-footer-height, 0px));
    z-index: 998;
    transform: translateX(-100%);
    /* KEINE transition hier!
````

````plaintext
index.html

                        class="detail-btn-mini" 
                        data-level="2" 
                        aria-pressed="false"
                        title="Ebene 2: Standard">
                        2
                    </button>
                    <button 
                        class="detail-btn-mini" 
                        data-level="3" 
                        aria-pressed="false"
                        title="Ebene 3: VollstÃ¤ndig">
                        3
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Menu Dropdown -->
    <div id="menu-dropdown" class="menu-dropdown" role="menu" aria-hidden="true">
        <button class="menu-item" id="show-history-btn" role="menuitem">
            <span class="menu-icon">ðŸ“œ</span>
            Verlauf ein/aus
        </button>
        <button class="menu-item" id="toggle-nav-sidebar-btn" role="menuitem">
            <span class="menu-icon">ðŸ—‚ï¸</span>
            Navigation ein/aus
        </button>
        <button class="menu-item" id="toggle-tips-footer-btn" role="menuitem">
            <span class="menu-icon">ðŸ’¡</span>
            Tipps ein/aus
        </button>
        
        <hr style="margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;">
        
        <button class="menu-item" id="toggle-theme" role="menuitem" aria-label="Theme wechseln">
            <div class="theme-icon">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            Theme: <span id="current-theme">System</span>
        </button>

        <button class="menu-item" id="toggle-media-layer" role="menuitem">
            <span class="menu-icon">ðŸ–¼ï¸</span>
            Medien: <span id="media-layer-status">Standard</span>
        </button>
        
        <button class="menu-item" id="toggle-contrast" role="menuitem">
            <span class="me
````

````plaintext
styles.css
px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    transition: background-color var(--transition-fast);
}

.modal-header-btn:hover {
    background: rgba(255,255,255,0.3);
}

.modal-header-btn:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
}

.modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
}

.history-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.history-item {
    padding: 15px;
    border-left: 4px solid var(--color-primary);
    background-color: var(--color-surface);
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.history-item:hover {
    background-color: var(--color-surface-elevated);
    border-left-width: 6px;
}

.history-item-title {
    font-weight: bold;
    color: var(--color-primary);
    margin-bottom: 5px;
    transition: color var(--transition-medium);
}

.history-item-time {
    font-size: 0.85em;
    color: var(--color-text-secondary);
    transition: color var(--transition-medium);
}

.history-empty {
    text-align: center;
    color: var(--color-text-disabled);
    padding: 40px;
    font-style: italic;
}

/* ===== TIPPS-FOOTER ===== */
.tips-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: var(--color-surface-elevated);
    padding: 15px 20px;
    box-shadow: 0 -2px 10px var(--color-shadow-strong);
    z-index: 999;
    transform: translateY(0);
    transition: transform var(--transition-medium);
    display: flex;
    align-items: center;
    gap: 15px;
}

.tips-footer.hidden {
    transform: translateY(100%);
}

/* TIPPS NAVIGATION BUTTONS */
.tips-nav-btn {
    background: rgba(255,255,255,0.2);
    border: 2px solid white;
    color: white;
    font-size: 1em;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.tips-nav-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.1);
}

.tips-nav-btn:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
}

.tips-nav-btn:active {
    transform: scale(0.95);
}

/* TIPPS CONTENT */
.tips-content {
    display: flex;
    align-items: center;
    gap: 15px;
    flex: 1;
}

.tips-icon {
    font-size: 1.5em;
    flex-shrink: 0;
}

.tips-text {
    flex: 1;
    margin: 0;
    f
````

````plaintext
styles.css
   }
    
    .modal-content {
        width: 95%;
        max-height: 90vh;
    }
}

/* ===== HIGH CONTRAST MODE ENHANCEMENTS ===== */
@media (prefers-contrast: high) {
    .notes-toggle {
        border: 3px solid var(--color-surface-elevated);
    }
    
    button {
        border-width: var(--border-width);
    }
}

/* ===== FORCED COLORS MODE (Windows High Contrast) ===== */
@media (forced-colors: active) {
    button {
        border: 2px solid ButtonText;
        background-color: ButtonFace;
        color: ButtonText;
    }
    
    a {
        color: LinkText;
    }
    
    .nav-item.active {
        background-color: Highlight;
        color: HighlightText;
    }
}

/* ===== SYSTEM PREFERENCE DETECTION ===== */
@media (prefers-color-scheme: dark) {
    :root:not([data-theme]) {
        /* Optional: Auto Dark Mode wenn keine PrÃ¤ferenz gespeichert */
    }
}

@media (prefers-contrast: more) {
    :root {
        --border-width: 2px;
        --focus-outline-width: 4px;
    }
}

/* ===== THEME ICON ===== */
.theme-icon {
    display: inline-grid;
    grid-template-columns: 10px 10px;
    grid-template-rows: 10px 10px;
    gap: 2px;
    margin-right: 10px;
    vertical-align: middle;
}

.theme-icon div {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    transition: background-color var(--transition-medium);
}

.theme-icon div:nth-child(1) {
    background-color: var(--color-primary);  /* PrimÃ¤rfarbe - dominanter Eindruck */
}

.theme-icon div:nth-child(2) {
    background-color: var(--color-surface);  /* Hintergrund - zeigt Hell/Dunkel */
}

.theme-icon div:nth-child(3) {
    background-color: var(--color-success);  /* Erfolgsfarbe - Akzentfarbe */
}

.theme-icon div:nth-child(4) {
    background-color: var(--color-border-strong);  /* Border - zeigt Kontrast */
}

/* ============================================================================
 *  GENERISCHES SIDEBAR-FRAMEWORK
 *  HinzufÃ¼gen am Ende von styles.css (nach dem bestehenden Code)
 *  ============================================================================ */

/* ===== SIDEBAR CONTAINER (alle Sidebars zusammen) ===== */
/* Sidebar initial UND geschlossen: Keine Transition */
.sidebar-container {
    position: fixed;
    left: 0;
    top: var(--top-nav-height);
    width: 280px;
    z-index: 998;
    /* transform: translateX(-100%); */
    box-shadow: -3px 0 15px var(--color-shadow-strong);
    transition: right var(--transition-medium), background-color var(--transition-medium);
    /* KEINE transition hier!
````

````plaintext
styles.css
: #FFFFFF;
    --color-text-secondary: #FFFFFF;
    --color-text-disabled: #999999;
    --color-surface: #000000;
    --color-surface-elevated: #000000;
    --color-primary: #00BFFF;
    --color-primary-hover: #00D4FF;
    --color-success: #00FF00;
    --color-warning: #FFFF00;
    --color-warning-text: #000000;
    --color-error: #FF6B6B;
    --color-info: #00BFFF;
    --color-border: #FFFFFF;
    --color-border-strong: #FFFFFF;
    --color-shadow: rgba(255, 255, 255, 0.1);
    --color-shadow-strong: rgba(255, 255, 255, 0.2);
    --color-focus: #FFFF00;
    --border-width: 2px;
    --focus-outline-width: 4px;
}

/* Body */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--color-text-primary);
    background-color: var(--color-surface);
    padding: 20px;
    padding-top: calc(var(--top-nav-height) + 20px);
    padding-bottom: calc(var(--tips-footer-height) + 20px);
    padding-right: 20px;
    transition: background-color var(--transition-medium), color var(--transition-medium);
}

body.tips-hidden {
    --tips-footer-height: 0px;
}

/* ===== CONTAINER ===== */
.container {
    max-width: 1200px;
    margin: 0 auto;
    background-color: var(--color-surface-elevated);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px var(--color-shadow);
    transition: margin-right var(--transition-medium), background-color var(--transition-medium);
}

body.notes-open .container {
    margin-right: 320px;
}

/* ===== HEADER ===== */
header {
    border-bottom: 3px solid var(--color-border-strong);
    padding-bottom: 20px;
    margin-bottom: 30px;
}

h1 {
    color: var(--color-primary);
    font-size: 2em;
    margin-bottom: 10px;
    transition: color var(--transition-medium);
}

.subtitle {
    color: var(--color-text-secondary);
    font-size: 1.1em;
    transition: color var(--transition-medium);
}

/* ===== ÃœBERSCHRIFTEN ===== */
h2 {
    color: var(--color-primary);
    font-size: 1.6em;
    margin-top: 30px;
    margin-bottom: 15px;
    border-bottom: 2px solid var(--color-border);
    padding-bottom: 10px;
    transition: color var(--transition-medium), border-color var(--transition-medium);
}

h3 {
    color: var(--color-primary);
    font-size: 1.3em;
    margin-top: 25px;
    margin-bottom: 12px;
    transition: color var(--transition-medium);
}

h4 {
    color: var(--color-text-primary);
    font-size: 1.1em;
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: 600;
    transition: color var(--transition-medium);
````

Sehr gut! Ich sehe, dass die Änderungen erfolgreich umgesetzt wurden. Die `.btn-secondary` Klasse nutzt nun theme-adaptive Farben und die Icons wurden per `::before` integriert. Außerdem wurde die responsive Größenanpassung für mobile Geräte bereits implementiert.

Lassen Sie mich nun den aktuellen Gesamtzustand analysieren, um weitere sinnvolle Verbesserungsvorschläge zu unterbreiten.

**project_knowledge_search**

*Request*

````javascript
{
  "query": "Debug-output buildnummer test aktuelle probleme"
}
````

*Response*

````plaintext
script-core.js
'dark' : 'light');
}

function updateMetaThemeColor(theme) {
    const colors = {
        'light': '#FAFAFA',
        'dark': '#121212',
        'contrast-high': '#FFFFFF',
        'contrast-inverse': '#000000'
    };
    document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', colors[theme] || colors.light);
}

// FOUC (Flash of Unstyled Content) vermeiden
(function() {
    const saved = localStorage.getItem('theme-preference');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
})();

// ============================================================================
// MODULE LOADED
// ============================================================================

LOG('CORE', `Core module loaded - Build ${window.BUILD_INFO.version} (${window.BUILD_INFO.buildDate})`);


/**
 * Test-Suite fÃ¼r das Logging-System
 */
function testLoggingSystem() {
    console.log('=== STARTING LOGGING TESTS ===');

    // Test 1: Basic log from known location
    function testBasicLog() {
        LOG('TEST', 'This should show the correct line number');
    }

    // Test 2: Log with data
    function testLogWithData() {
        const testData = { user: 'test', action: 'login' };
        LOG('TEST', 'User action', testData);
    }

    // Test 3: Different log levels
    function testDifferentLevels() {
        LOG.warn('TEST', 'Warning message');
        LOG.error('TEST', 'Error message');
        LOG.success('TEST', 'Success message');
        LOG.debug('TEST', 'Debug message');
    }

    // Test 4: Nested function calls
    function outerFunction() {
        innerFunction();
    }

    function innerFunction() {
        LOG('TEST', 'Log from nested function call');
    }

    // Test 5: Test separator and groups
    function testSpecialFunctions() {
        LOG.separator('TEST', 'Test Section');
        LOG.group('TEST', 'Test Group');
        LOG('TEST', 'Message inside group');
        LOG.groupEnd();
    }

    // Run all tests
    testBasicLog();
    testLogWithData();
    testDifferentLevels();
    outerFunction();
    testSpecialFunctions();

    console.log('=== LOGGING TESTS COMPLETE ===');

    // Manuelle ÃœberprÃ¼fung:
    console.log(`
    MANUAL VERIFICATION CHECKLIST:
    âœ“ Basic LOG shows correct file and line number
    âœ“ LOG.warn shows correct file and line number
    âœ“ LOG.error shows correct file and line number
    âœ“ LOG.success shows correct file and line number
    âœ“ LOG.debug shows correct file and line number
    âœ“ Nested function calls show correct location
    âœ“ All logs show the module name and version
    âœ“ Separator and group functions work properly
    `);
}

// Utility function to test stack trace directly
function debugStackTrace() {
    console.log('=== STACK TRACE DEBUG ===');
    const stack = new Error().stack;
    console.log('Full stack trace:');
    console.log(stack);

    console.log('Parsed lines:');
    const lines = stack.split('\n');
    lines.forEach((line, index) => {
        console.log(`[${index}]: ${line.trim()}`);
    });
}

// Enable debug mode for testing
if (!window.BUILD_INFO) {
    window.BUILD_INFO = {
        debugMode: true,
        version: 'test-1.0.0'
    };
}

// Run tests when ready
//testLoggingSystem();
//debugStackTrace();
````

````plaintext
script-core.js
` ${callerInfo}` : '';

    if (data !== undefined) {
        console.log(`${prefix}${location} âœ“ ${message}`, data);
    } else {
        console.log(`${prefix}${location} âœ“ ${message}`);
    }
};

/**
 * Debug-Level Logging (nur im Debug-Modus)
 */
window.LOG.debug = function(module, message, data) {
    if (!window.BUILD_INFO.debugMode) return;

    const stack = new Error().stack;
    const callerInfo = extractCallerInfo(stack);

    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    const location = callerInfo ? ` ${callerInfo}` : '';

    if (data !== undefined) {
        console.debug(`${prefix}${location} ðŸ” ${message}`, data);
    } else {
        console.debug(`${prefix}${location} ðŸ” ${message}`);
    }
};

/**
 * Extrahiert Script-Name und Zeilennummer aus Stack-Trace
 *
 * @param {string} stack - Error.stack String
 * @returns {string|null} - Formatierte Caller-Info "script-name.js:123"
 */
/**
 * Extrahiert Script-Name und Zeilennummer aus Stack-Trace
 * Robusterer Ansatz fÃ¼r verschiedene Browser und Umgebungen
 */
function extractCallerInfo(stack) {
    if (!stack) return null;

    try {
        const lines = stack.split('\n');

        // Definiere welche Funktionen wir Ã¼berspringen wollen
        const internalPatterns = [
            /at LOG\./,
            /at window\.LOG/,
            /at Object\.LOG/,
            /at LOG\s/,
            /extractCallerInfo/
        ];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();

            // Ãœberspringe interne LOG-Funktionen
            const isInternal = internalPatterns.some(pattern =>
            pattern.test(line)
            );

            if (isInternal) {
                continue;
            }

            // Verbesserte Regex fÃ¼r verschiedene Stack-Trace-Formate:
            // - "at functionName (file.js:10:20)"
            // - "at file.js:10:20"
            // - "at http://localhost/file.js:10:20"
            const match = line.match(/(?:\s+at\s+.*?\()?([^()]+?
````

````plaintext
Debug-output.053
Layout was forced before the page was fully loaded. If stylesheets are not yet loaded this may cause a flash of unstyled content. PictureInPictureChild.sys.mjs:1924:7
[CORE-053] Core module loaded - Build 053 (2025-10-04) script-core.js:45:17
[SECTION-053] script-section-management.js:602 Section management module loaded script-core.js:45:17
[SIDEBAR-MGR-053] script-sidebar-manager.js:410 Sidebar manager module loaded script-core.js:45:17
[NAV-053] script-navigation.js:331 Navigation module loaded script-core.js:45:17
[HISTORY-053] script-history.js:251 History module loaded script-core.js:45:17
[NOTES-053] script-notes.js:172 Notes module loaded script-core.js:45:17
[DETAIL-053] script-detail-level.js:226 Detail level module loaded script-core.js:45:17
[TIPS-053] script-tips.js:262 Tips module loaded script-core.js:45:17
[PREFS-053] script-preferences.js:164 Preferences module loaded script-core.js:45:17
[INIT-053] script-init.js:11 Starting application initialization...
````

````plaintext
agent-implementation-guide.md
 JSON.parse(localStorage.getItem('agent-analytics') || '[]');
    analytics.push(event);
    
    // Maximal 1000 Events speichern
    if (analytics.length > 1000) {
        analytics = analytics.slice(-1000);
    }
    
    localStorage.setItem('agent-analytics', JSON.stringify(analytics));
    
    // Optional: An Server senden
    if (agentDialogData.globalSettings.enableAnalytics) {
        sendToAnalyticsServer(event);
    }
}

// Events tracken
function handleAgentAction(action) {
    trackAgentInteraction('action_clicked', {
        actionLabel: action.label,
        actionType: action.type
    });
    
    // ... restlicher Code
}
`​`​`

### Analytics auswerten

`​`​`javascript
function getAgentAnalytics() {
    const analytics = JSON.parse(localStorage.getItem('agent-analytics') || '[]');
    
    const summary = {
        totalInteractions: analytics.length,
        mostUsedActions: {},
        mostVisitedContexts: {},
        averageSessionDuration: 0
    };
    
    // Auswertung...
    
    return summary;
}
`​`​`

---

## ðŸ› Debugging & Troubleshooting

### Debug-Modus aktivieren

In `agent.js` ergÃ¤nzen:

`​`​`javascript
const AGENT_DEBUG = true; // FÃ¼r Entwicklung

function debugLog(message, data) {
    if (AGENT_DEBUG) {
        console.log(`[Agent Debug] ${message}`, data);
    }
}

// Verwendung
function startAgentDialog(contextId) {
    debugLog('Dialog gestartet', { contextId, availableContexts: Object.keys(agentDialogData) });
    
    if (!agentDialogData || !agentDialogData[contextId]) {
        debugLog('Context nicht gefunden!', { contextId });
        // ...
    }
}
`​`​`

### HÃ¤ufige Probleme

#### Problem: Agent Ã¶ffnet sich nicht

**LÃ¶sung:**
1. Browser-Console Ã¶ffnen (F12)
2. Nach JavaScript-Fehlern suchen
3. PrÃ¼fen: `document.getElementById('agent-toggle')` gibt Element zurÃ¼ck?
4. PrÃ¼fen: `agent.js` wurde geladen?

`​`​`javascript
// Test in Console:
console.log('Agent-Toggle:', document.getElementById('agent-toggle'));
console.log('Agent-Sidebar:', document.getElementById('agent-sidebar'));
`​`​`

#### Problem: Dialoge werden nicht geladen

**LÃ¶sung:**
1. PrÃ¼fen: JSON-Datei existiert und ist valide?
2. Network-Tab prÃ¼fen: Wurde Datei geladen?
3. Console-Log in `loadAgentDialogs()` hinzufÃ¼gen

`​`​`javascript
async function loadAgentDialogs() {
    console.log('Lade Dialoge...');
    const response = await fetch('agent-dialogs.json');
    console.log('Response:', response.status);
    const data = await response.json();
    console.log('Geladene Daten:', data);
}
`​`​`

#### Problem: Navigation funktioniert nicht

**LÃ¶sung:**
1. PrÃ¼fen: Ziel-Element existiert mit korrekter ID?
2. Console-Test:

`​`​`javascript
// Test in Console:
const targetId = 'section-step2';
const element = document.getElementById(targetId);
console.log('Element gefunden?', element);
if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
}
`​`​`

#### Problem: Kontext-BlÃ¶cke werden nicht angezeigt

**LÃ¶sung:**
1.
````

````plaintext
script-core.js
// ============================================================================
// SCRIPT-CORE.JS - Version 040
// Basis-Funktionen, globale Variablen und Logging-System
// ============================================================================

// ============================================================================
// BUILD INFORMATION
// ============================================================================

window.BUILD_INFO = {
    version: '053',
    buildDate: '2025-10-04', // 4. Oktober 2025
    debugMode: true  // Auf false setzen fÃ¼r Production
};

// ============================================================================
// CENTRALIZED LOGGING SYSTEM
// ============================================================================

/**
 * Zentrales Logging-System
 * Automatisch mit Build-Version, Modul-Name und Zeilennummer
 *
 * Verwendung:
 *   LOG('SECTION', 'Info message');
 *   LOG('NAV', 'Found elements', { count: 5 });
 *   LOG.warn('SECTION', 'Warning message');
 *   LOG.error('NAV', 'Error occurred', errorObject);
 */
window.LOG = function(module, message, data) {
    if (!window.BUILD_INFO.debugMode) return;

    // Hole Caller-Information (Script + Zeile)
    const stack = new Error().stack;
    const callerInfo = extractCallerInfo(stack);

    // Baue Log-Prefix
    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    const location = callerInfo ? ` ${callerInfo}` : '';

    // Log-Ausgabe
    if (data !== undefined) {
        console.log(`${prefix}${location} ${message}`, data);
    } else {
        console.log(`${prefix}${location} ${message}`);
    }
};

/**
 * Warning-Level Logging
 */
window.LOG.warn = function(module, message, data) {
    if (!window.BUILD_INFO.debugMode) return;

    const stack = new Error().stack;
    const callerInfo = extractCallerInfo(stack);

    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    const location = callerInfo ? ` ${callerInfo}` : '';

    if (data !== undefined) {
        console.warn(`${prefix}${location} âš ï¸ ${message}`, data);
    } else {
        console.warn(`${prefix}${location} âš ï¸ ${message}`);
    }
};

/**
 * Error-Level Logging
 */
window.LOG.error = function(module, message, data) {
    // Errors werden IMMER geloggt, auch wenn debugMode = false

    const stack = new Error().stack;
    const callerInfo = extractCallerInfo(stack);

    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    const location = callerInfo ?
````

````plaintext
script-core.js
` ${callerInfo}` : '';

    if (data !== undefined) {
        console.warn(`${prefix}${location} âš ï¸ ${message}`, data);
    } else {
        console.warn(`${prefix}${location} âš ï¸ ${message}`);
    }
};

/**
 * Error-Level Logging
 */
window.LOG.error = function(module, message, data) {
    // Errors werden IMMER geloggt, auch wenn debugMode = false

    const stack = new Error().stack;
    const callerInfo = extractCallerInfo(stack);

    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    const location = callerInfo ? ` ${callerInfo}` : '';

    if (data !== undefined) {
        console.error(`${prefix}${location} âŒ ${message}`, data);
    } else {
        console.error(`${prefix}${location} âŒ ${message}`);
    }
};

/**
 * Success-Level Logging (fÃ¼r wichtige Erfolgs-Meldungen)
 */
window.LOG.success = function(module, message, data) {
    if (!window.BUILD_INFO.debugMode) return;

    const stack = new Error().stack;
    const callerInfo = extractCallerInfo(stack);

    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    const location = callerInfo ? ` ${callerInfo}` : '';

    if (data !== undefined) {
        console.log(`${prefix}${location} âœ“ ${message}`, data);
    } else {
        console.log(`${prefix}${location} âœ“ ${message}`);
    }
};

/**
 * Debug-Level Logging (nur im Debug-Modus)
 */
window.LOG.debug = function(module, message, data) {
    if (!window.BUILD_INFO.debugMode) return;

    const stack = new Error().stack;
    const callerInfo = extractCallerInfo(stack);

    const prefix = `[${module}-${window.BUILD_INFO.version}]`;
    const location = callerInfo ?
````

````plaintext
agent-implementation-guide.md
PrÃ¼fen: Ziel-Element existiert mit korrekter ID?
2. Console-Test:

`​`​`javascript
// Test in Console:
const targetId = 'section-step2';
const element = document.getElementById(targetId);
console.log('Element gefunden?', element);
if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
}
`​`​`

#### Problem: Kontext-BlÃ¶cke werden nicht angezeigt

**LÃ¶sung:**
1. PrÃ¼fen: Block existiert im HTML?
2. PrÃ¼fen: `display: none` wird korrekt entfernt?

`​`​`javascript
// Test in Console:
showContextBlock('agent-context-format-decision', '<p>Test-Inhalt</p>');
`​`​`

#### Problem: Section-Triggers feuern nicht

**LÃ¶sung:**
1. Intersection Observer wird unterstÃ¼tzt?
2. Section hat korrektes `data-section` Attribut?
3. Trigger-Bedingungen erfÃ¼llt?

`​`​`javascript
// Test in Console:
const triggers = agentDialogData.sectionTriggers;
console.log('Definierte Triggers:', triggers);

// Trigger manuell auslÃ¶sen:
checkSectionTrigger('step2');
`​`​`

---

## ðŸ“± Mobile Optimierung

### Touch-Gesten

Bereits implementiert:
- âœ… GroÃŸe Touch-Targets (min. 44x44px)
- âœ… Vollbild-Sidebar auf Mobile
- âœ… Auto-Close nach Navigation

### Performance

Optimierungen fÃ¼r langsame GerÃ¤te:

`​`​`javascript
// In agent.js
const isMobile = window.innerWidth <= 768;
const isSlowDevice = navigator.hardwareConcurrency < 4;

if (isSlowDevice) {
    // Reduzierte Animationen
    document.body.classList.add('reduce-motion');
    
    // LÃ¤ngere Typing-Delays
    TYPING_SPEED = 1500;
}
`​`​`

`​`​`css
/* In agent.css */
.reduce-motion .agent-message {
    animation: none;
}

.reduce-motion .agent-icon,
.reduce-motion .agent-dog {
    animation: none;
}
`​`​`

---

## ðŸš€ Deployment Checkliste

Vor dem Live-Gang:

### Code
- [ ] Alle Debug-Logs entfernt oder deaktiviert
- [ ] Finale Dialog-Daten in JSON eingepflegt
- [ ] Alle IDs im HTML vergeben
- [ ] Inline-Trigger an relevanten Stellen eingefÃ¼gt
- [ ] Kontext-BlÃ¶cke vorbereitet

### Testing
- [ ] Desktop-Browser: Chrome, Firefox, Edge
- [ ] Mobile-Browser: Safari iOS, Chrome Android
- [ ] Tastatur-Navigation funktioniert
- [ ] Screenreader-KompatibilitÃ¤t geprÃ¼ft
- [ ] Performance auf langsamem GerÃ¤t getestet

### Content
- [ ] Alle Nachrichten Korrektur gelesen
- [ ] Icons konsistent verwendet
- [ ] Tone of Voice einheitlich
- [ ] Rechtschreibung/Grammatik geprÃ¼ft

### Analytics (optional)
- [ ] Tracking-Code implementiert
- [ ] Datenschutz-Hinweis ergÃ¤nzt
- [ ] DSGVO-KonformitÃ¤t geprÃ¼ft

---

## ðŸ“š WeiterfÃ¼hrende Ideen

### ZukÃ¼nftige Erweiterungen

1. **Sprach-UnterstÃ¼tzung**
   - Web Speech API fÃ¼r Voice-Input
   - Text-to-Speech fÃ¼r Nachrichten

2. **KI-Integration**
   - OpenAI API fÃ¼r intelligente Antworten
   - NLP fÃ¼r besseres Keyword-Matching

3. **Collaboration**
   - Team-Chat Features
   - Shared Sessions

4. **Advanced Analytics**
   - Heatmaps fÃ¼r Leitfaden-Nutzung
   - User Journey Tracking
   - A/B Testing fÃ¼r Dialoge

5.
````

````plaintext
axiom-guide-implementation-doc.md
**Hierarchische Navigation:**
   - UntermenÃ¼s in der Navigation Sidebar
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
   - i18n fÃ¼r Tipps und UI-Texte
   - Sprachwechsel Ã¼ber MenÃ¼

---

## Support und Debugging

### **HÃ¤ufige Probleme:**

**Problem: Tipps wechseln nicht**
- LÃ¶sung: PrÃ¼fen Sie, ob `startTipRotation()` aufgerufen wird
- Console: Schauen Sie nach JavaScript-Fehlern

**Problem: Navigation Sidebar bleibt leer**
- LÃ¶sung: Stellen Sie sicher, dass alle Sections `data-section` und `data-title` Attribute haben
- PrÃ¼fen Sie: `document.querySelectorAll('.content-section[data-section]')`

**Problem: Verlauf funktioniert nicht**
- LÃ¶sung: localStorage kÃ¶nnte deaktiviert sein
- Alternative: Verwenden Sie sessionStorage als Fallback

**Problem: OpazitÃ¤t funktioniert nicht**
- LÃ¶sung: Intersection Observer wird mÃ¶glicherweise nicht unterstÃ¼tzt
- Fallback: Implementieren Sie Scroll-basierte LÃ¶sung

---

## Abschluss

Alle drei Features sind nun vollstÃ¤ndig implementiert und funktionieren zusammen. Die modulare Struktur ermÃ¶glicht einfache Wartung und Erweiterung.

**NÃ¤chste Schritte:**
1. Features testen
2. Anpassungen vornehmen
3. Weitere Abschnitte zum Leitfaden hinzufÃ¼gen
4. ZusÃ¤tzliche Tipps ergÃ¤nzen
````

Perfekt! Ich habe nun einen umfassenden Überblick über Ihr Projekt. Die Implementierung ist solide und nutzt bereits viele Best Practices. Basierend auf der Analyse kann ich Ihnen **drei weitere Verbesserungsvorschläge** unterbreiten, die das System noch robuster, wartbarer und benutzerfreundlicher machen:

---

## **Verbesserungsvorschlag 1: Einheitliche Zustandsverwaltung für UI-Komponenten**

### **Vorteile:**
Aktuell verwalten verschiedene Module ihre Zustände unabhängig voneinander (Sidebars, Notizen, Tipps-Footer). Dies führt zu **verstreuten localStorage-Zugriffen** und potenziellen **Konsistenzproblemen**. Eine zentrale Zustandsverwaltung würde alle UI-Präferenzen an einem Ort bündeln und **Synchronisationsfehler** verhindern. Bei Theme-Wechseln oder Seitenneuladen könnten alle Komponenten ihren Zustand aus einer einzigen Quelle beziehen, was die **Wartbarkeit** erheblich verbessert und **Race Conditions** verhindert.

### **Technik:**
Es würde ein zentrales State-Management-Modul (`script-state-manager.js`) eingeführt, das ein Observer-Pattern implementiert. Jedes Modul könnte Änderungen am Zustand abonnieren und würde automatisch benachrichtigt. Die Implementierung würde einen zentralen State-Store nutzen:
```javascript
window.AppState = {
    ui: {
        sidebarOpen: false,
        sidebarActive: null,
        notesOpen: false,
        tipsVisible: true,
        theme: 'system'
    },
    preferences: {
        detailLevel: 1,
        timeFormat: 'relative',
        mediaLayer: 'standard'
    }
};
```
Module würden über `AppState.subscribe('ui.sidebarOpen', callback)` auf Änderungen reagieren. LocalStorage-Persistierung erfolgt zentral über einen Debounce-Mechanismus.

### **Aufwand:**
Der **Implementierungsaufwand** ist mittel bis hoch: Es müsste ein neues Modul erstellt werden (~200 Zeilen Code) und bestehende Module müssten migriert werden (je ~20-30 Zeilen Änderung pro Modul). Die **Laufzeit-Performance** verbessert sich leicht durch reduzierten localStorage-Zugriff und verhinderte redundante DOM-Operationen. Der **Wartungsaufwand** reduziert sich langfristig erheblich: Neue Features können einfach in den State integriert werden, Debugging wird durch zentrale Logging-Punkte vereinfacht, und State-bezogene Bugs lassen sich an einer Stelle beheben statt in jedem Modul einzeln.

---

## **Verbesserungsvorschlag 2: Progressive Enhancement für kritische Funktionen**

### **Vorteile:**
Ihr System nutzt moderne Browser-APIs wie Intersection Observer, localStorage und moderne CSS-Features. Sollten diese in älteren Browsern oder restriktiven Umgebungen (z.B. Inkognito-Modus ohne localStorage) nicht verfügbar sein, führt dies zu **stummen Fehlern**. Progressive Enhancement würde **Fallback-Mechanismen** implementieren: Wenn Intersection Observer fehlt, könnte ein **Scroll-basierter Approach** verwendet werden; wenn localStorage blockiert ist, würden Daten im **Session-Scope** gehalten. Dies garantiert **Grundfunktionalität** in allen Umgebungen und verbessert die **Barrierefreiheit** gemäß BFSG.

### **Technik:**
Es würde ein Feature-Detection-Layer eingeführt, der beim Seitenload alle kritischen APIs prüft:
```javascript
const FeatureSupport = {
    localStorage: testLocalStorage(),
    intersectionObserver: 'IntersectionObserver' in window,
    matchMedia: 'matchMedia' in window,
    webAnimations: 'animate' in Element.prototype
};
```
Jedes Modul würde entsprechende Fallbacks nutzen. Beispiel für Verlaufs-Persistierung:
```javascript
function saveHistory(data) {
    if (FeatureSupport.localStorage) {
        localStorage.setItem('history', JSON.stringify(data));
    } else {
        sessionStorage.setItem('history', JSON.stringify(data));
        LOG.warn('HISTORY', 'Using sessionStorage fallback');
    }
}
```
Für Intersection Observer könnte ein Polyfill oder ein einfacher Scroll-Listener als Fallback dienen.

### **Aufwand:**
Der **Umsetzungsaufwand** ist moderat: Das Feature-Detection-Modul benötigt ca. 100 Zeilen, die Fallback-Implementierungen pro Modul ca. 30-50 Zeilen. Die **Laufzeit-Performance** bleibt nahezu identisch – moderne Browser nutzen die optimierten APIs, ältere die Fallbacks. Der **Pflege-Aufwand** steigt minimal: Neue Features müssen auf Kompatibilität geprüft werden, aber die einmalige Investition zahlt sich durch **breitere Browser-Unterstützung** und weniger Support-Anfragen aus. Testing-Aufwand erhöht sich durch zusätzliche Browser/Umgebungs-Kombinationen.

---

## **Verbesserungsvorschlag 3: Kontextbezogene Tooltips für Erstbenutzer**

### **Vorteile:**
Neue Nutzer könnten von der **Fülle an Features** überfordert sein. Die Tipps im Footer sind hilfreich, aber nicht **kontextspezifisch**. Interaktive Tooltips, die beim ersten Besuch oder bei Hover wichtige UI-Elemente erklären, würden die **Lernkurve** drastisch reduzieren. Ein optionaler **Onboarding-Modus** könnte Erstnutzer durch die wichtigsten Funktionen führen (Sidebar öffnen → Detail-Level wählen → Notizen erstellen). Dies verbessert die **User Experience** erheblich und reduziert **Frustration** bei der Erstnutzung.

### **Technik:**
Ein Tooltip-System würde mittels `data-tooltip`-Attributen direkt im HTML definiert:
```html
<button id="toggle-nav-sidebar-btn" data-tooltip="Öffnet die Navigations-Sidebar">
```
Ein zentrales Tooltip-Modul würde diese auslesen und bei Hover/Focus einblenden. Für den Onboarding-Modus würde ein Schritt-für-Schritt-Guide implementiert:
```javascript
const OnboardingSteps = [
    { target: '#menu-toggle', message: 'Hier finden Sie alle Einstellungen', highlight: true },
    { target: '.detail-controls', message: 'Passen Sie die Detailtiefe an', highlight: true },
    { target: '.notes-toggle', message: 'Machen Sie sich Notizen', highlight: true }
];
```
Ein Overlay würde nacheinander die Elemente hervorheben. Der Status würde in localStorage gespeichert, sodass der Guide nur einmal erscheint.

### **Aufwand:**
Der **Implementierungsaufwand** ist mittel: Das Tooltip-System benötigt ca. 150 Zeilen (CSS + JS), der Onboarding-Guide weitere 200 Zeilen. Die **Laufzeit-Performance** bleibt exzellent – Tooltips werden lazy initialisiert und nutzen Event-Delegation. Der **Wartungsaufwand** ist gering: Neue Features erhalten einfach ein `data-tooltip`-Attribut, der Onboarding-Guide wird durch Hinzufügen neuer Steps erweitert. Der initiale Content-Aufwand (Texte schreiben, übersetzen) ist höher, aber langfristig zahlt sich dies durch **reduzierte Support-Anfragen** und **bessere User Adoption** aus.

---

## **Zusammenfassung**

Alle drei Vorschläge adressieren unterschiedliche Aspekte:

1. **Zustandsverwaltung** → Technische Robustheit und Wartbarkeit
2. **Progressive Enhancement** → Kompatibilität und Zuverlässigkeit  
3. **Tooltips & Onboarding** → Nutzerfreundlichkeit und Zugänglichkeit

Welcher dieser Vorschläge interessiert Sie am meisten, oder soll ich weitere Aspekte des Projekts analysieren?



## Prompt:
4.10.2025, 15:02:33

Verbesserungsvorschlag 1 klingt sehr toll.

Verbesserungsvorschlag 2 ist gut gemeint, aber das wird alles in einem Corporate Environment laufen und dort sind keine alten Browser im Einsatz. Das würde ich als hinten anstellen. Danke für diese Vorschlag.

Verbesserungsvorschlag 3 ist sehr, sehr gut und stand bereits auf meiner Ideenliste.

Ich werde deine Ideen abspeichern, oder kannst du die auch in den Projekt-Speicher übernehmen und dort ablegen?



## Response:
4.10.2025, 15:04:15

Sehr gerne! Ich kann die Verbesserungsvorschläge für Sie strukturiert im Projekt-Speicher ablegen. Lassen Sie mich ein dediziertes Dokument erstellen, das beide relevanten Vorschläge (1 und 3) detailliert dokumentiert.

**Verbesserungsvorschläge für AXIOM Leitfaden**

````markdown
# Verbesserungsvorschläge für AXIOM Leitfaden

**Dokumentversion:** 1.0  
**Datum:** 04. Oktober 2025  
**Status:** Geplant / Zur Umsetzung vorgemerkt

---

## Übersicht

Dieses Dokument enthält detaillierte Verbesserungsvorschläge für den AXIOM Leitfaden, die nach Analyse der aktuellen Implementierung (Build 053) erarbeitet wurden.

**Priorität:**
- ✅ **Hoch:** Verbesserungsvorschlag 1 (Zustandsverwaltung)
- ✅ **Hoch:** Verbesserungsvorschlag 3 (Tooltips & Onboarding)
- ⏸️ **Niedrig:** Verbesserungsvorschlag 2 (Progressive Enhancement) - zurückgestellt für Corporate Environment

---

## 🎯 Verbesserungsvorschlag 1: Einheitliche Zustandsverwaltung

### Problembeschreibung

**Aktueller Zustand:**
- Verschiedene Module verwalten ihre Zustände unabhängig
- Verstreute localStorage-Zugriffe in mehreren Dateien
- Potenzielle Synchronisationsprobleme zwischen Komponenten
- Redundante Code-Duplikation für State-Persistierung

**Betroffene Module:**
- `script-sidebar-manager.js` - Sidebar-Status
- `script-notes.js` - Notizen-Panel-Status
- `script-tips.js` - Tipps-Footer-Sichtbarkeit
- `script-theme.js` - Theme-Präferenz
- `script-preferences.js` - Diverse UI-Einstellungen
- `script-history.js` - Zeitformat-Präferenz

### Lösungsansatz

**Zentrale Zustandsverwaltung mit Observer-Pattern:**

#### 1. Neues Modul: `script-state-manager.js`

```javascript
// ============================================================================
// SCRIPT-STATE-MANAGER.JS
// Zentrale Zustandsverwaltung mit Observer-Pattern und Persistierung
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'STATE-MGR';
    
    // ===== ZENTRALER APPLICATION STATE =====
    window.AppState = {
        ui: {
            sidebarOpen: false,
            sidebarActive: null,  // 'navigation', 'history', null
            notesOpen: false,
            tipsVisible: true,
            menuOpen: false
        },
        preferences: {
            theme: 'system',
            detailLevel: 1,
            timeFormat: 'relative',  // 'relative' oder 'absolute'
            mediaLayer: 'standard',
            contrastEnhanced: false
        },
        content: {
            currentSection: null,
            scrollPosition: 0
        }
    };
    
    // ===== OBSERVER SUBSCRIBERS =====
    const subscribers = new Map();
    
    /**
     * Subscribe to state changes
     * @param {string} path - Dot-notation path (e.g., 'ui.sidebarOpen')
     * @param {Function} callback - Called when state changes
     * @returns {Function} Unsubscribe function
     */
    window.AppState.subscribe = function(path, callback) {
        if (!subscribers.has(path)) {
            subscribers.set(path, new Set());
        }
        
        subscribers.get(path).add(callback);
        
        LOG(MODULE, `Subscribed to state path: ${path}`);
        
        // Return unsubscribe function
        return () => {
            subscribers.get(path)?.delete(callback);
            LOG(MODULE, `Unsubscribed from state path: ${path}`);
        };
    };
    
    /**
     * Update state and notify subscribers
     * @param {string} path - Dot-notation path
     * @param {*} value - New value
     */
    window.AppState.update = function(path, value) {
        const keys = path.split('.');
        let current = window.AppState;
        
        // Navigate to target
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        
        // Update value
        const oldValue = current[keys[keys.length - 1]];
        current[keys[keys.length - 1]] = value;
        
        LOG(MODULE, `State updated: ${path}`, { oldValue, newValue: value });
        
        // Notify subscribers
        notifySubscribers(path, value, oldValue);
        
        // Persist to localStorage (debounced)
        debouncedPersist();
    };
    
    /**
     * Get state value
     * @param {string} path - Dot-notation path
     * @returns {*} State value
     */
    window.AppState.get = function(path) {
        const keys = path.split('.');
        let current = window.AppState;
        
        for (const key of keys) {
            current = current[key];
            if (current === undefined) return undefined;
        }
        
        return current;
    };
    
    // ===== INTERNAL FUNCTIONS =====
    
    function notifySubscribers(path, newValue, oldValue) {
        const pathSubscribers = subscribers.get(path);
        
        if (pathSubscribers && pathSubscribers.size > 0) {
            pathSubscribers.forEach(callback => {
                try {
                    callback(newValue, oldValue);
                } catch (error) {
                    LOG.error(MODULE, `Subscriber callback error for ${path}`, error);
                }
            });
            
            LOG(MODULE, `Notified ${pathSubscribers.size} subscriber(s) for: ${path}`);
        }
    }
    
    // ===== PERSISTENCE =====
    
    const STORAGE_KEY = 'axiom-app-state';
    let persistTimeout = null;
    
    function debouncedPersist() {
        clearTimeout(persistTimeout);
        persistTimeout = setTimeout(persistState, 500);
    }
    
    function persistState() {
        try {
            const stateToPersist = {
                ui: window.AppState.ui,
                preferences: window.AppState.preferences
                // content wird nicht persistiert (Session-basiert)
            };
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
            LOG(MODULE, 'State persisted to localStorage');
        } catch (error) {
            LOG.error(MODULE, 'Failed to persist state', error);
        }
    }
    
    function loadPersistedState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            
            if (saved) {
                const parsed = JSON.parse(saved);
                
                // Merge mit default state
                Object.assign(window.AppState.ui, parsed.ui || {});
                Object.assign(window.AppState.preferences, parsed.preferences || {});
                
                LOG.success(MODULE, 'State loaded from localStorage', parsed);
                return true;
            }
        } catch (error) {
            LOG.error(MODULE, 'Failed to load persisted state', error);
        }
        
        return false;
    }
    
    // ===== INITIALIZATION =====
    
    function initStateManager() {
        LOG(MODULE, 'Initializing state manager...');
        
        // Load persisted state
        loadPersistedState();
        
        // Apply initial state to DOM
        applyInitialState();
        
        LOG.success(MODULE, 'State manager initialized', window.AppState);
    }
    
    function applyInitialState() {
        // Theme anwenden
        if (window.AppState.preferences.theme !== 'system') {
            document.documentElement.setAttribute('data-theme', window.AppState.preferences.theme);
        }
        
        // Tips-Footer Sichtbarkeit
        if (!window.AppState.ui.tipsVisible) {
            document.body.classList.add('tips-hidden');
        }
        
        LOG(MODULE, 'Initial state applied to DOM');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStateManager);
    } else {
        initStateManager();
    }
    
    LOG(MODULE, 'State manager module loaded');
    
})();
```

#### 2. Migration bestehender Module

**Beispiel: `script-sidebar-manager.js` Migration**

```javascript
// VORHER (alt):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    localStorage.setItem('axiom-sidebar-active', sidebarId);
}

// NACHHER (neu):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    AppState.update('ui.sidebarActive', sidebarId);
    AppState.update('ui.sidebarOpen', true);
}

// Subscribe to changes from other modules
AppState.subscribe('ui.sidebarActive', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        // Update DOM accordingly
        updateSidebarDOM(newValue);
    }
});
```

**Beispiel: `script-theme.js` Migration**

```javascript
// Subscribe to theme changes
AppState.subscribe('preferences.theme', (newTheme) => {
    applyTheme(newTheme);
    updateThemeIcon(newTheme);
});

// Update theme
function cycleTheme() {
    const currentTheme = AppState.get('preferences.theme');
    const nextTheme = getNextTheme(currentTheme);
    AppState.update('preferences.theme', nextTheme);
}
```

### Implementierungsschritte

1. **Phase 1: Grundgerüst** (1-2 Stunden)
   - Erstellen von `script-state-manager.js`
   - Integration in `index.html` (vor allen anderen Modulen!)
   - Tests der Basis-Funktionalität

2. **Phase 2: Migration Kern-Module** (2-3 Stunden)
   - `script-theme.js` migrieren
   - `script-sidebar-manager.js` migrieren
   - `script-tips.js` migrieren

3. **Phase 3: Migration restliche Module** (2-3 Stunden)
   - `script-notes.js` migrieren
   - `script-preferences.js` migrieren
   - `script-history.js` (Zeitformat) migrieren

4. **Phase 4: Testing & Cleanup** (1-2 Stunden)
   - Cross-Module-Tests
   - Alte localStorage-Aufrufe entfernen
   - Dokumentation aktualisieren

**Gesamt-Aufwand:** ca. 6-10 Stunden

### Vorteile nach Umsetzung

✅ **Zentrale Kontrolle:** Ein Ort für alle UI-Zustände  
✅ **Konsistenz:** Keine Race Conditions mehr  
✅ **Debugging:** Alle State-Changes geloggt an einem Ort  
✅ **Erweiterbarkeit:** Neue Features einfach in State integrieren  
✅ **Performance:** Reduzierte localStorage-Zugriffe durch Debouncing  
✅ **Testbarkeit:** State-Logic isoliert testbar

---

## 🎓 Verbesserungsvorschlag 3: Kontextbezogene Tooltips & Onboarding

### Problembeschreibung

**Aktueller Zustand:**
- Viele Features ohne direkte Erklärung
- Tipps-Footer ist generisch, nicht kontextbezogen
- Neue Nutzer müssen Features selbst entdecken
- Keine geführte Einführung in die Funktionalität

**User Experience Probleme:**
- Hohe Lernkurve für Erstnutzer
- Features werden möglicherweise nicht entdeckt
- Keine Hilfe bei komplexeren Funktionen (Detail-Level, Sidebar-System)

### Lösungsansatz

**Zweistufiges System:**
1. **Permanente Tooltips** - Hover-Hilfe für alle UI-Elemente
2. **Einmaliger Onboarding-Guide** - Schritt-für-Schritt bei Erstbesuch

#### 1. Tooltip-System

**Neues Modul: `script-tooltips.js`**

```javascript
// ============================================================================
// SCRIPT-TOOLTIPS.JS
// Kontextbezogene Tooltips für UI-Elemente
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'TOOLTIPS';
    
    // ===== TOOLTIP CONTAINER =====
    let tooltipElement = null;
    
    function createTooltipElement() {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'app-tooltip';
        tooltipElement.setAttribute('role', 'tooltip');
        tooltipElement.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tooltipElement);
    }
    
    // ===== TOOLTIP ANZEIGE =====
    
    function showTooltip(targetElement, text) {
        if (!tooltipElement || !text) return;
        
        tooltipElement.textContent = text;
        tooltipElement.setAttribute('aria-hidden', 'false');
        
        // Position berechnen
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        
        // Viewport-Check
        if (top < 10) {
            top = rect.bottom + 8; // Unterhalb anzeigen
            tooltipElement.classList.add('tooltip-bottom');
        } else {
            tooltipElement.classList.remove('tooltip-bottom');
        }
        
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
        tooltipElement.classList.add('visible');
    }
    
    function hideTooltip() {
        if (!tooltipElement) return;
        
        tooltipElement.classList.remove('visible');
        tooltipElement.setAttribute('aria-hidden', 'true');
    }
    
    // ===== EVENT HANDLERS =====
    
    function handleMouseEnter(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleMouseLeave(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        hideTooltip();
    }
    
    function handleFocus(event) {
        const target = event.target;
        if (!target.hasAttribute('data-tooltip')) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleBlur() {
        hideTooltip();
    }
    
    // ===== INITIALIZATION =====
    
    function initTooltips() {
        LOG(MODULE, 'Initializing tooltip system...');
        
        createTooltipElement();
        
        // Event-Delegation für alle Tooltips
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);
        document.addEventListener('focus', handleFocus, true);
        document.addEventListener('blur', handleBlur, true);
        
        LOG.success(MODULE, 'Tooltip system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }
    
    LOG(MODULE, 'Tooltips module loaded');
    
})();
```

**CSS für Tooltips:**

```css
/* ===== TOOLTIP SYSTEM ===== */
.app-tooltip {
    position: fixed;
    background-color: var(--color-text-primary);
    color: var(--color-surface-elevated);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.9em;
    line-height: 1.4;
    max-width: 250px;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 4px 12px var(--color-shadow-strong);
}

.app-tooltip.visible {
    opacity: 1;
    transform: translateY(0);
}

.app-tooltip.tooltip-bottom {
    transform: translateY(4px);
}

.app-tooltip.tooltip-bottom.visible {
    transform: translateY(0);
}

/* Tooltip-Pfeil (optional) */
.app-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: var(--color-text-primary);
}

.app-tooltip.tooltip-bottom::before {
    bottom: auto;
    top: 100%;
    border-bottom-color: transparent;
    border-top-color: var(--color-text-primary);
}

/* Accessibility: Tooltips bei prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
    .app-tooltip {
        transition: none;
    }
}
```

**HTML-Markup (Beispiele):**

```html
<!-- Hamburger Menu -->
<button id="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen">
    ☰
</button>

<!-- Detail-Level Buttons -->
<button class="detail-btn-mini" 
        data-level="1"
        data-tooltip="Ebene 1: Nur die wichtigsten Informationen"
        aria-pressed="true">
    1
</button>

<!-- Sidebar Toggle -->
<button id="toggle-nav-sidebar-btn" 
        data-tooltip="Zeigt oder versteckt die Navigations-Sidebar"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<!-- Theme Toggle -->
<button id="toggle-theme" 
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata"
        role="menuitem">
    Theme: <span id="current-theme">System</span>
</button>
```

#### 2. Onboarding-Guide

**Neues Modul: `script-onboarding.js`**

```javascript
// ============================================================================
// SCRIPT-ONBOARDING.JS
// Einmaliger Onboarding-Guide für Erstnutzer
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'ONBOARDING';
    
    // ===== ONBOARDING STEPS =====
    const ONBOARDING_STEPS = [
        {
            target: '#menu-toggle',
            title: 'Willkommen! 👋',
            message: 'Hier finden Sie alle wichtigen Einstellungen und Funktionen.',
            position: 'bottom'
        },
        {
            target: '.detail-controls',
            title: 'Detailtiefe anpassen',
            message: 'Wählen Sie zwischen drei Detailstufen: Basis, Standard oder Vollständig.',
            position: 'bottom'
        },
        {
            target: '#toggle-nav-sidebar-btn',
            title: 'Navigation-Sidebar',
            message: 'Öffnen Sie die Sidebar für schnelle Navigation durch den Leitfaden.',
            action: () => {
                document.getElementById('toggle-nav-sidebar-btn')?.click();
            }
        },
        {
            target: '.notes-toggle',
            title: 'Notizen machen',
            message: 'Halten Sie wichtige Informationen direkt im Leitfaden fest.',
            position: 'left'
        },
        {
            target: '#toggle-theme',
            title: 'Theme wählen',
            message: 'Passen Sie das Farbschema an Ihre Vorlieben an.',
            position: 'bottom'
        }
    ];
    
    // ===== STATE =====
    let currentStep = 0;
    let onboardingActive = false;
    let overlayElement = null;
    let highlightElement = null;
    let tooltipElement = null;
    
    // ===== ONBOARDING UI =====
    
    function createOnboardingElements() {
        // Overlay
        overlayElement = document.createElement('div');
        overlayElement.className = 'onboarding-overlay';
        overlayElement.setAttribute('aria-hidden', 'true');
        
        // Highlight
        highlightElement = document.createElement('div');
        highlightElement.className = 'onboarding-highlight';
        
        // Tooltip
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'onboarding-tooltip';
        tooltipElement.innerHTML = `
            <div class="onboarding-header">
                <h3 class="onboarding-title"></h3>
                <button class="onboarding-skip" aria-label="Tour überspringen">×</button>
            </div>
            <p class="onboarding-message"></p>
            <div class="onboarding-footer">
                <span class="onboarding-progress"></span>
                <div class="onboarding-buttons">
                    <button class="onboarding-prev">Zurück</button>
                    <button class="onboarding-next">Weiter</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlayElement);
        document.body.appendChild(highlightElement);
        document.body.appendChild(tooltipElement);
    }
    
    function showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= ONBOARDING_STEPS.length) {
            endOnboarding();
            return;
        }
        
        currentStep = stepIndex;
        const step = ONBOARDING_STEPS[stepIndex];
        
        // Target Element finden
        const targetElement = document.querySelector(step.target);
        if (!targetElement) {
            LOG.warn(MODULE, `Target not found: ${step.target}, skipping step`);
            showStep(stepIndex + 1);
            return;
        }
        
        // Highlight positionieren
        const rect = targetElement.getBoundingClientRect();
        highlightElement.style.top = `${rect.top - 8}px`;
        highlightElement.style.left = `${rect.left - 8}px`;
        highlightElement.style.width = `${rect.width + 16}px`;
        highlightElement.style.height = `${rect.height + 16}px`;
        
        // Tooltip aktualisieren
        tooltipElement.querySelector('.onboarding-title').textContent = step.title;
        tooltipElement.querySelector('.onboarding-message').textContent = step.message;
        tooltipElement.querySelector('.onboarding-progress').textContent = 
            `Schritt ${stepIndex + 1} von ${ONBOARDING_STEPS.length}`;
        
        // Tooltip positionieren
        positionTooltip(targetElement, step.position || 'right');
        
        // Navigation Buttons
        const prevBtn = tooltipElement.querySelector('.onboarding-prev');
        const nextBtn = tooltipElement.querySelector('.onboarding-next');
        
        prevBtn.disabled = stepIndex === 0;
        nextBtn.textContent = stepIndex === ONBOARDING_STEPS.length - 1 ? 'Fertig' : 'Weiter';
        
        // Aktion ausführen (falls vorhanden)
        if (step.action && typeof step.action === 'function') {
            setTimeout(() => step.action(), 300);
        }
        
        // Elemente anzeigen
        overlayElement.classList.add('visible');
        highlightElement.classList.add('visible');
        tooltipElement.classList.add('visible');
        
        LOG(MODULE, `Showing step ${stepIndex + 1}/${ONBOARDING_STEPS.length}`);
    }
    
    function positionTooltip(targetElement, position) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top, left;
        
        switch(position) {
            case 'bottom':
                top = rect.bottom + 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'top':
                top = rect.top - tooltipRect.height - 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left - tooltipRect.width - 16;
                break;
            case 'right':
            default:
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + 16;
                break;
        }
        
        // Viewport boundaries
        if (top < 10) top = 10;
        if (left < 10) left = 10;
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = window.innerHeight - tooltipRect.height - 10;
        }
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }
    
    function endOnboarding() {
        onboardingActive = false;
        
        overlayElement?.classList.remove('visible');
        highlightElement?.classList.remove('visible');
        tooltipElement?.classList.remove('visible');
        
        // Markiere Onboarding als abgeschlossen
        localStorage.setItem('axiom-onboarding-completed', 'true');
        
        LOG.success(MODULE, 'Onboarding completed');
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Skip Button
        tooltipElement.querySelector('.onboarding-skip').addEventListener('click', () => {
            endOnboarding();
        });
        
        // Previous Button
        tooltipElement.querySelector('.onboarding-prev').addEventListener('click', () => {
            showStep(currentStep - 1);
        });
        
        // Next Button
        tooltipElement.querySelector('.onboarding-next').addEventListener('click', () => {
            showStep(currentStep + 1);
        });
        
        // ESC zum Abbrechen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && onboardingActive) {
                endOnboarding();
            }
        });
    }
    
    // ===== PUBLIC API =====
    
    window.startOnboarding = function() {
        if (onboardingActive) return;
        
        onboardingActive = true;
        currentStep = 0;
        
        if (!overlayElement) {
            createOnboardingElements();
            setupEventHandlers();
        }
        
        showStep(0);
        
        LOG(MODULE, 'Onboarding started');
    };
    
    // ===== INITIALIZATION =====
    
    function initOnboarding() {
        LOG(MODULE, 'Initializing onboarding system...');
        
        // Check if onboarding already completed
        const completed = localStorage.getItem('axiom-onboarding-completed');
        
        if (!completed) {
            // Start onboarding nach kurzer Verzögerung
            setTimeout(() => {
                window.startOnboarding();
            }, 1000);
        } else {
            LOG(MODULE, 'Onboarding already completed, skipping');
        }
        
        LOG.success(MODULE, 'Onboarding system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOnboarding);
    } else {
        initOnboarding();
    }
    
    LOG(MODULE, 'Onboarding module loaded');
    
})();
```

**CSS für Onboarding:**

```css
/* ===== ONBOARDING SYSTEM ===== */

/* Overlay - verdunkelt den Hintergrund */
.onboarding-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.onboarding-overlay.visible {
    opacity: 1;
    pointer-events: auto;
}

/* Highlight - hebt das aktuelle Element hervor */
.onboarding-highlight {
    position: fixed;
    border: 3px solid var(--color-primary);
    border-radius: 8px;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7),
                0 0 20px var(--color-primary);
}

.onboarding-highlight.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip - zeigt die Anleitung */
.onboarding-tooltip {
    position: fixed;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    border-radius: 12px;
    padding: 0;
    max-width
````



## Prompt:
4.10.2025, 15:05:18

Weiter



## Response:
4.10.2025, 15:06:55



**Verbesserungsvorschläge für AXIOM Leitfaden** ∙ Version 2

````markdown
# Verbesserungsvorschläge für AXIOM Leitfaden

**Dokumentversion:** 1.0  
**Datum:** 04. Oktober 2025  
**Status:** Geplant / Zur Umsetzung vorgemerkt

---

## Übersicht

Dieses Dokument enthält detaillierte Verbesserungsvorschläge für den AXIOM Leitfaden, die nach Analyse der aktuellen Implementierung (Build 053) erarbeitet wurden.

**Priorität:**
- ✅ **Hoch:** Verbesserungsvorschlag 1 (Zustandsverwaltung)
- ✅ **Hoch:** Verbesserungsvorschlag 3 (Tooltips & Onboarding)
- ⏸️ **Niedrig:** Verbesserungsvorschlag 2 (Progressive Enhancement) - zurückgestellt für Corporate Environment

---

## 🎯 Verbesserungsvorschlag 1: Einheitliche Zustandsverwaltung

### Problembeschreibung

**Aktueller Zustand:**
- Verschiedene Module verwalten ihre Zustände unabhängig
- Verstreute localStorage-Zugriffe in mehreren Dateien
- Potenzielle Synchronisationsprobleme zwischen Komponenten
- Redundante Code-Duplikation für State-Persistierung

**Betroffene Module:**
- `script-sidebar-manager.js` - Sidebar-Status
- `script-notes.js` - Notizen-Panel-Status
- `script-tips.js` - Tipps-Footer-Sichtbarkeit
- `script-theme.js` - Theme-Präferenz
- `script-preferences.js` - Diverse UI-Einstellungen
- `script-history.js` - Zeitformat-Präferenz

### Lösungsansatz

**Zentrale Zustandsverwaltung mit Observer-Pattern:**

#### 1. Neues Modul: `script-state-manager.js`

```javascript
// ============================================================================
// SCRIPT-STATE-MANAGER.JS
// Zentrale Zustandsverwaltung mit Observer-Pattern und Persistierung
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'STATE-MGR';
    
    // ===== ZENTRALER APPLICATION STATE =====
    window.AppState = {
        ui: {
            sidebarOpen: false,
            sidebarActive: null,  // 'navigation', 'history', null
            notesOpen: false,
            tipsVisible: true,
            menuOpen: false
        },
        preferences: {
            theme: 'system',
            detailLevel: 1,
            timeFormat: 'relative',  // 'relative' oder 'absolute'
            mediaLayer: 'standard',
            contrastEnhanced: false
        },
        content: {
            currentSection: null,
            scrollPosition: 0
        }
    };
    
    // ===== OBSERVER SUBSCRIBERS =====
    const subscribers = new Map();
    
    /**
     * Subscribe to state changes
     * @param {string} path - Dot-notation path (e.g., 'ui.sidebarOpen')
     * @param {Function} callback - Called when state changes
     * @returns {Function} Unsubscribe function
     */
    window.AppState.subscribe = function(path, callback) {
        if (!subscribers.has(path)) {
            subscribers.set(path, new Set());
        }
        
        subscribers.get(path).add(callback);
        
        LOG(MODULE, `Subscribed to state path: ${path}`);
        
        // Return unsubscribe function
        return () => {
            subscribers.get(path)?.delete(callback);
            LOG(MODULE, `Unsubscribed from state path: ${path}`);
        };
    };
    
    /**
     * Update state and notify subscribers
     * @param {string} path - Dot-notation path
     * @param {*} value - New value
     */
    window.AppState.update = function(path, value) {
        const keys = path.split('.');
        let current = window.AppState;
        
        // Navigate to target
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        
        // Update value
        const oldValue = current[keys[keys.length - 1]];
        current[keys[keys.length - 1]] = value;
        
        LOG(MODULE, `State updated: ${path}`, { oldValue, newValue: value });
        
        // Notify subscribers
        notifySubscribers(path, value, oldValue);
        
        // Persist to localStorage (debounced)
        debouncedPersist();
    };
    
    /**
     * Get state value
     * @param {string} path - Dot-notation path
     * @returns {*} State value
     */
    window.AppState.get = function(path) {
        const keys = path.split('.');
        let current = window.AppState;
        
        for (const key of keys) {
            current = current[key];
            if (current === undefined) return undefined;
        }
        
        return current;
    };
    
    // ===== INTERNAL FUNCTIONS =====
    
    function notifySubscribers(path, newValue, oldValue) {
        const pathSubscribers = subscribers.get(path);
        
        if (pathSubscribers && pathSubscribers.size > 0) {
            pathSubscribers.forEach(callback => {
                try {
                    callback(newValue, oldValue);
                } catch (error) {
                    LOG.error(MODULE, `Subscriber callback error for ${path}`, error);
                }
            });
            
            LOG(MODULE, `Notified ${pathSubscribers.size} subscriber(s) for: ${path}`);
        }
    }
    
    // ===== PERSISTENCE =====
    
    const STORAGE_KEY = 'axiom-app-state';
    let persistTimeout = null;
    
    function debouncedPersist() {
        clearTimeout(persistTimeout);
        persistTimeout = setTimeout(persistState, 500);
    }
    
    function persistState() {
        try {
            const stateToPersist = {
                ui: window.AppState.ui,
                preferences: window.AppState.preferences
                // content wird nicht persistiert (Session-basiert)
            };
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
            LOG(MODULE, 'State persisted to localStorage');
        } catch (error) {
            LOG.error(MODULE, 'Failed to persist state', error);
        }
    }
    
    function loadPersistedState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            
            if (saved) {
                const parsed = JSON.parse(saved);
                
                // Merge mit default state
                Object.assign(window.AppState.ui, parsed.ui || {});
                Object.assign(window.AppState.preferences, parsed.preferences || {});
                
                LOG.success(MODULE, 'State loaded from localStorage', parsed);
                return true;
            }
        } catch (error) {
            LOG.error(MODULE, 'Failed to load persisted state', error);
        }
        
        return false;
    }
    
    // ===== INITIALIZATION =====
    
    function initStateManager() {
        LOG(MODULE, 'Initializing state manager...');
        
        // Load persisted state
        loadPersistedState();
        
        // Apply initial state to DOM
        applyInitialState();
        
        LOG.success(MODULE, 'State manager initialized', window.AppState);
    }
    
    function applyInitialState() {
        // Theme anwenden
        if (window.AppState.preferences.theme !== 'system') {
            document.documentElement.setAttribute('data-theme', window.AppState.preferences.theme);
        }
        
        // Tips-Footer Sichtbarkeit
        if (!window.AppState.ui.tipsVisible) {
            document.body.classList.add('tips-hidden');
        }
        
        LOG(MODULE, 'Initial state applied to DOM');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStateManager);
    } else {
        initStateManager();
    }
    
    LOG(MODULE, 'State manager module loaded');
    
})();
```

#### 2. Migration bestehender Module

**Beispiel: `script-sidebar-manager.js` Migration**

```javascript
// VORHER (alt):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    localStorage.setItem('axiom-sidebar-active', sidebarId);
}

// NACHHER (neu):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    AppState.update('ui.sidebarActive', sidebarId);
    AppState.update('ui.sidebarOpen', true);
}

// Subscribe to changes from other modules
AppState.subscribe('ui.sidebarActive', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        // Update DOM accordingly
        updateSidebarDOM(newValue);
    }
});
```

**Beispiel: `script-theme.js` Migration**

```javascript
// Subscribe to theme changes
AppState.subscribe('preferences.theme', (newTheme) => {
    applyTheme(newTheme);
    updateThemeIcon(newTheme);
});

// Update theme
function cycleTheme() {
    const currentTheme = AppState.get('preferences.theme');
    const nextTheme = getNextTheme(currentTheme);
    AppState.update('preferences.theme', nextTheme);
}
```

### Implementierungsschritte

1. **Phase 1: Grundgerüst** (1-2 Stunden)
   - Erstellen von `script-state-manager.js`
   - Integration in `index.html` (vor allen anderen Modulen!)
   - Tests der Basis-Funktionalität

2. **Phase 2: Migration Kern-Module** (2-3 Stunden)
   - `script-theme.js` migrieren
   - `script-sidebar-manager.js` migrieren
   - `script-tips.js` migrieren

3. **Phase 3: Migration restliche Module** (2-3 Stunden)
   - `script-notes.js` migrieren
   - `script-preferences.js` migrieren
   - `script-history.js` (Zeitformat) migrieren

4. **Phase 4: Testing & Cleanup** (1-2 Stunden)
   - Cross-Module-Tests
   - Alte localStorage-Aufrufe entfernen
   - Dokumentation aktualisieren

**Gesamt-Aufwand:** ca. 6-10 Stunden

### Vorteile nach Umsetzung

✅ **Zentrale Kontrolle:** Ein Ort für alle UI-Zustände  
✅ **Konsistenz:** Keine Race Conditions mehr  
✅ **Debugging:** Alle State-Changes geloggt an einem Ort  
✅ **Erweiterbarkeit:** Neue Features einfach in State integrieren  
✅ **Performance:** Reduzierte localStorage-Zugriffe durch Debouncing  
✅ **Testbarkeit:** State-Logic isoliert testbar

---

## 🎓 Verbesserungsvorschlag 3: Kontextbezogene Tooltips & Onboarding

### Problembeschreibung

**Aktueller Zustand:**
- Viele Features ohne direkte Erklärung
- Tipps-Footer ist generisch, nicht kontextbezogen
- Neue Nutzer müssen Features selbst entdecken
- Keine geführte Einführung in die Funktionalität

**User Experience Probleme:**
- Hohe Lernkurve für Erstnutzer
- Features werden möglicherweise nicht entdeckt
- Keine Hilfe bei komplexeren Funktionen (Detail-Level, Sidebar-System)

### Lösungsansatz

**Zweistufiges System:**
1. **Permanente Tooltips** - Hover-Hilfe für alle UI-Elemente
2. **Einmaliger Onboarding-Guide** - Schritt-für-Schritt bei Erstbesuch

#### 1. Tooltip-System

**Neues Modul: `script-tooltips.js`**

```javascript
// ============================================================================
// SCRIPT-TOOLTIPS.JS
// Kontextbezogene Tooltips für UI-Elemente
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'TOOLTIPS';
    
    // ===== TOOLTIP CONTAINER =====
    let tooltipElement = null;
    
    function createTooltipElement() {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'app-tooltip';
        tooltipElement.setAttribute('role', 'tooltip');
        tooltipElement.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tooltipElement);
    }
    
    // ===== TOOLTIP ANZEIGE =====
    
    function showTooltip(targetElement, text) {
        if (!tooltipElement || !text) return;
        
        tooltipElement.textContent = text;
        tooltipElement.setAttribute('aria-hidden', 'false');
        
        // Position berechnen
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        
        // Viewport-Check
        if (top < 10) {
            top = rect.bottom + 8; // Unterhalb anzeigen
            tooltipElement.classList.add('tooltip-bottom');
        } else {
            tooltipElement.classList.remove('tooltip-bottom');
        }
        
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
        tooltipElement.classList.add('visible');
    }
    
    function hideTooltip() {
        if (!tooltipElement) return;
        
        tooltipElement.classList.remove('visible');
        tooltipElement.setAttribute('aria-hidden', 'true');
    }
    
    // ===== EVENT HANDLERS =====
    
    function handleMouseEnter(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleMouseLeave(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        hideTooltip();
    }
    
    function handleFocus(event) {
        const target = event.target;
        if (!target.hasAttribute('data-tooltip')) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleBlur() {
        hideTooltip();
    }
    
    // ===== INITIALIZATION =====
    
    function initTooltips() {
        LOG(MODULE, 'Initializing tooltip system...');
        
        createTooltipElement();
        
        // Event-Delegation für alle Tooltips
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);
        document.addEventListener('focus', handleFocus, true);
        document.addEventListener('blur', handleBlur, true);
        
        LOG.success(MODULE, 'Tooltip system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }
    
    LOG(MODULE, 'Tooltips module loaded');
    
})();
```

**CSS für Tooltips:**

```css
/* ===== TOOLTIP SYSTEM ===== */
.app-tooltip {
    position: fixed;
    background-color: var(--color-text-primary);
    color: var(--color-surface-elevated);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.9em;
    line-height: 1.4;
    max-width: 250px;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 4px 12px var(--color-shadow-strong);
}

.app-tooltip.visible {
    opacity: 1;
    transform: translateY(0);
}

.app-tooltip.tooltip-bottom {
    transform: translateY(4px);
}

.app-tooltip.tooltip-bottom.visible {
    transform: translateY(0);
}

/* Tooltip-Pfeil (optional) */
.app-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: var(--color-text-primary);
}

.app-tooltip.tooltip-bottom::before {
    bottom: auto;
    top: 100%;
    border-bottom-color: transparent;
    border-top-color: var(--color-text-primary);
}

/* Accessibility: Tooltips bei prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
    .app-tooltip {
        transition: none;
    }
}
```

**HTML-Markup (Beispiele):**

```html
<!-- Hamburger Menu -->
<button id="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen">
    ☰
</button>

<!-- Detail-Level Buttons -->
<button class="detail-btn-mini" 
        data-level="1"
        data-tooltip="Ebene 1: Nur die wichtigsten Informationen"
        aria-pressed="true">
    1
</button>

<!-- Sidebar Toggle -->
<button id="toggle-nav-sidebar-btn" 
        data-tooltip="Zeigt oder versteckt die Navigations-Sidebar"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<!-- Theme Toggle -->
<button id="toggle-theme" 
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata"
        role="menuitem">
    Theme: <span id="current-theme">System</span>
</button>
```

#### 2. Onboarding-Guide

**Neues Modul: `script-onboarding.js`**

```javascript
// ============================================================================
// SCRIPT-ONBOARDING.JS
// Einmaliger Onboarding-Guide für Erstnutzer
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'ONBOARDING';
    
    // ===== ONBOARDING STEPS =====
    const ONBOARDING_STEPS = [
        {
            target: '#menu-toggle',
            title: 'Willkommen! 👋',
            message: 'Hier finden Sie alle wichtigen Einstellungen und Funktionen.',
            position: 'bottom'
        },
        {
            target: '.detail-controls',
            title: 'Detailtiefe anpassen',
            message: 'Wählen Sie zwischen drei Detailstufen: Basis, Standard oder Vollständig.',
            position: 'bottom'
        },
        {
            target: '#toggle-nav-sidebar-btn',
            title: 'Navigation-Sidebar',
            message: 'Öffnen Sie die Sidebar für schnelle Navigation durch den Leitfaden.',
            action: () => {
                document.getElementById('toggle-nav-sidebar-btn')?.click();
            }
        },
        {
            target: '.notes-toggle',
            title: 'Notizen machen',
            message: 'Halten Sie wichtige Informationen direkt im Leitfaden fest.',
            position: 'left'
        },
        {
            target: '#toggle-theme',
            title: 'Theme wählen',
            message: 'Passen Sie das Farbschema an Ihre Vorlieben an.',
            position: 'bottom'
        }
    ];
    
    // ===== STATE =====
    let currentStep = 0;
    let onboardingActive = false;
    let overlayElement = null;
    let highlightElement = null;
    let tooltipElement = null;
    
    // ===== ONBOARDING UI =====
    
    function createOnboardingElements() {
        // Overlay
        overlayElement = document.createElement('div');
        overlayElement.className = 'onboarding-overlay';
        overlayElement.setAttribute('aria-hidden', 'true');
        
        // Highlight
        highlightElement = document.createElement('div');
        highlightElement.className = 'onboarding-highlight';
        
        // Tooltip
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'onboarding-tooltip';
        tooltipElement.innerHTML = `
            <div class="onboarding-header">
                <h3 class="onboarding-title"></h3>
                <button class="onboarding-skip" aria-label="Tour überspringen">×</button>
            </div>
            <p class="onboarding-message"></p>
            <div class="onboarding-footer">
                <span class="onboarding-progress"></span>
                <div class="onboarding-buttons">
                    <button class="onboarding-prev">Zurück</button>
                    <button class="onboarding-next">Weiter</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlayElement);
        document.body.appendChild(highlightElement);
        document.body.appendChild(tooltipElement);
    }
    
    function showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= ONBOARDING_STEPS.length) {
            endOnboarding();
            return;
        }
        
        currentStep = stepIndex;
        const step = ONBOARDING_STEPS[stepIndex];
        
        // Target Element finden
        const targetElement = document.querySelector(step.target);
        if (!targetElement) {
            LOG.warn(MODULE, `Target not found: ${step.target}, skipping step`);
            showStep(stepIndex + 1);
            return;
        }
        
        // Highlight positionieren
        const rect = targetElement.getBoundingClientRect();
        highlightElement.style.top = `${rect.top - 8}px`;
        highlightElement.style.left = `${rect.left - 8}px`;
        highlightElement.style.width = `${rect.width + 16}px`;
        highlightElement.style.height = `${rect.height + 16}px`;
        
        // Tooltip aktualisieren
        tooltipElement.querySelector('.onboarding-title').textContent = step.title;
        tooltipElement.querySelector('.onboarding-message').textContent = step.message;
        tooltipElement.querySelector('.onboarding-progress').textContent = 
            `Schritt ${stepIndex + 1} von ${ONBOARDING_STEPS.length}`;
        
        // Tooltip positionieren
        positionTooltip(targetElement, step.position || 'right');
        
        // Navigation Buttons
        const prevBtn = tooltipElement.querySelector('.onboarding-prev');
        const nextBtn = tooltipElement.querySelector('.onboarding-next');
        
        prevBtn.disabled = stepIndex === 0;
        nextBtn.textContent = stepIndex === ONBOARDING_STEPS.length - 1 ? 'Fertig' : 'Weiter';
        
        // Aktion ausführen (falls vorhanden)
        if (step.action && typeof step.action === 'function') {
            setTimeout(() => step.action(), 300);
        }
        
        // Elemente anzeigen
        overlayElement.classList.add('visible');
        highlightElement.classList.add('visible');
        tooltipElement.classList.add('visible');
        
        LOG(MODULE, `Showing step ${stepIndex + 1}/${ONBOARDING_STEPS.length}`);
    }
    
    function positionTooltip(targetElement, position) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top, left;
        
        switch(position) {
            case 'bottom':
                top = rect.bottom + 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'top':
                top = rect.top - tooltipRect.height - 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left - tooltipRect.width - 16;
                break;
            case 'right':
            default:
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + 16;
                break;
        }
        
        // Viewport boundaries
        if (top < 10) top = 10;
        if (left < 10) left = 10;
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = window.innerHeight - tooltipRect.height - 10;
        }
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }
    
    function endOnboarding() {
        onboardingActive = false;
        
        overlayElement?.classList.remove('visible');
        highlightElement?.classList.remove('visible');
        tooltipElement?.classList.remove('visible');
        
        // Markiere Onboarding als abgeschlossen
        localStorage.setItem('axiom-onboarding-completed', 'true');
        
        LOG.success(MODULE, 'Onboarding completed');
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Skip Button
        tooltipElement.querySelector('.onboarding-skip').addEventListener('click', () => {
            endOnboarding();
        });
        
        // Previous Button
        tooltipElement.querySelector('.onboarding-prev').addEventListener('click', () => {
            showStep(currentStep - 1);
        });
        
        // Next Button
        tooltipElement.querySelector('.onboarding-next').addEventListener('click', () => {
            showStep(currentStep + 1);
        });
        
        // ESC zum Abbrechen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && onboardingActive) {
                endOnboarding();
            }
        });
    }
    
    // ===== PUBLIC API =====
    
    window.startOnboarding = function() {
        if (onboardingActive) return;
        
        onboardingActive = true;
        currentStep = 0;
        
        if (!overlayElement) {
            createOnboardingElements();
            setupEventHandlers();
        }
        
        showStep(0);
        
        LOG(MODULE, 'Onboarding started');
    };
    
    // ===== INITIALIZATION =====
    
    function initOnboarding() {
        LOG(MODULE, 'Initializing onboarding system...');
        
        // Check if onboarding already completed
        const completed = localStorage.getItem('axiom-onboarding-completed');
        
        if (!completed) {
            // Start onboarding nach kurzer Verzögerung
            setTimeout(() => {
                window.startOnboarding();
            }, 1000);
        } else {
            LOG(MODULE, 'Onboarding already completed, skipping');
        }
        
        LOG.success(MODULE, 'Onboarding system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOnboarding);
    } else {
        initOnboarding();
    }
    
    LOG(MODULE, 'Onboarding module loaded');
    
})();
```

**CSS für Onboarding:**

```css
/* ===== ONBOARDING SYSTEM ===== */

/* Overlay - verdunkelt den Hintergrund */
.onboarding-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.onboarding-overlay.visible {
    opacity: 1;
    pointer-events: auto;
}

/* Highlight - hebt das aktuelle Element hervor */
.onboarding-highlight {
    position: fixed;
    border: 3px solid var(--color-primary);
    border-radius: 8px;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7),
                0 0 20px var(--color-primary);
}

.onboarding-highlight.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip - zeigt die Anleitung */
.onboarding-tooltip {
    position: fixed;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    border-radius: 12px;
    padding: 0;
    max-width: 350px;
    z-index: 10000;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px var(--color-shadow-strong);
}

.onboarding-tooltip.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip Header */
.onboarding-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 15px;
    border-bottom: 2px solid var(--color-border);
}

.onboarding-title {
    margin: 0;
    font-size: 1.2em;
    color: var(--color-primary);
}

.onboarding-skip {
    background: none;
    border: none;
    font-size: 1.8em;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all var(--transition-fast);
}

.onboarding-skip:hover {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
}

/* Tooltip Message */
.onboarding-message {
    padding: 20px;
    margin: 0;
    line-height: 1.6;
}

/* Tooltip Footer */
.onboarding-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 20px;
    border-top: 2px solid var(--color-border);
}

.onboarding-progress {
    font-size: 0.9em;
    color: var(--color-text-secondary);
}

.onboarding-buttons {
    display: flex;
    gap: 10px;
}

.onboarding-prev,
.onboarding-next {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 0.95em;
    font-weight: 500;
    transition: all var(--transition-fast);
}

.onboarding-prev {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    border: 2px solid var(--color-border);
}

.onboarding-prev:hover:not(:disabled) {
    background-color: var(--color-border);
}

.onboarding-prev:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.onboarding-next {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
}

.onboarding-next:hover {
    background-color: var(--color-primary-hover);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    .onboarding-overlay,
    .onboarding-highlight,
    .onboarding-tooltip {
        transition: none;
    }
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .onboarding-tooltip {
        max-width: calc(100vw - 40px);
        left: 20px !important;
        right: 20px;
        bottom: 20px !important;
        top: auto !important;
    }
    
    .onboarding-highlight {
        border-width: 2px;
    }
}
```

### Integration in index.html

**Reihenfolge der Script-Einbindung:**

```html
<!-- Core & State (ZUERST!) -->
<script src="script-core.js"></script>
<script src="script-state-manager.js"></script>

<!-- Basis-Module -->
<script src="script-section-management.js"></script>
<script src="script-sidebar-manager.js"></script>
<script src="script-navigation.js"></script>
<script src="script-history.js"></script>
<script src="script-notes.js"></script>
<script src="script-detail-level.js"></script>
<script src="script-tips.js"></script>
<script src="script-theme.js"></script>
<script src="script-preferences.js"></script>

<!-- UI Enhancements (NEU!) -->
<script src="script-tooltips.js"></script>
<script src="script-onboarding.js"></script>

<!-- Initialisierung (ZULETZT!) -->
<script src="script-init.js"></script>
```

### HTML-Markup Erweiterungen

**Tooltips hinzufügen zu allen interaktiven Elementen:**

```html
<!-- Top Navigation -->
<button id="menu-toggle" 
        class="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen" 
        aria-expanded="false">
    ☰
</button>

<!-- Detail Controls -->
<div class="detail-controls" data-tooltip="Wählen Sie die gewünschte Detailtiefe des Leitfadens">
    <span class="detail-label">Detail:</span>
    <div class="detail-buttons">
        <button class="detail-btn-mini" 
                data-level="1"
                data-tooltip="Ebene 1: Nur die wichtigsten Informationen anzeigen"
                aria-pressed="true">1</button>
        <button class="detail-btn-mini" 
                data-level="2"
                data-tooltip="Ebene 2: Standard-Informationen mit zusätzlichen Details"
                aria-pressed="false">2</button>
        <button class="detail-btn-mini" 
                data-level="3"
                data-tooltip="Ebene 3: Alle verfügbaren Informationen anzeigen"
                aria-pressed="false">3</button>
    </div>
</div>

<!-- Notes Toggle -->
<button class="notes-toggle" 
        data-tooltip="Öffnet das Notizen-Panel für persönliche Anmerkungen"
        aria-label="Notizen öffnen/schließen">
    📝 Notizen
</button>

<!-- Menu Items -->
<button class="menu-item" 
        id="show-history-btn" 
        data-tooltip="Zeigt den Verlauf der besuchten Abschnitte"
        role="menuitem">
    <span class="menu-icon">📜</span>
    Verlauf ein/aus
</button>

<button class="menu-item" 
        id="toggle-nav-sidebar-btn"
        data-tooltip="Öffnet die Navigation für schnellen Zugriff auf alle Abschnitte"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<button class="menu-item" 
        id="toggle-tips-footer-btn"
        data-tooltip="Blendet die Tipps am unteren Bildschirmrand ein oder aus"
        role="menuitem">
    <span class="menu-icon">💡</span>
    Tipps ein/aus
</button>

<button class="menu-item" 
        id="toggle-theme"
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata (Hell, Dunkel, Hochkontrast)"
        role="menuitem">
    <div class="theme-icon">...</div>
    Theme: <span id="current-theme">System</span>
</button>
```

### Implementierungsschritte

**Phase 1: Tooltip-System** (2-3 Stunden)
1. `script-tooltips.js` erstellen
2. CSS für Tooltips in `styles.css` einfügen
3. `data-tooltip` Attribute in `index.html` ergänzen
4. Testing auf Desktop & Mobile

**Phase 2: Onboarding-Guide** (3-4 Stunden)
1. `script-onboarding.js` erstellen
2. CSS für Onboarding in `styles.css` einfügen
3. Onboarding-Steps definieren und testen
4. Edge Cases behandeln (fehlende Targets, etc.)

**Phase 3: Feintuning** (1-2 Stunden)
1. Tooltip-Texte verfeinern und vereinheitlichen
2. Onboarding-Flow optimieren
3. Accessibility-Tests durchführen
4. Mobile-Optimierung validieren

**Gesamt-Aufwand:** ca. 6-9 Stunden

### Erweiterungsmöglichkeiten

**Optionale Features für später:**

1. **Onboarding zurücksetzen:**
   ```javascript
   // Im Menü einen "Hilfe-Tour starten" Button hinzufügen
   <button class="menu-item" onclick="resetOnboarding()">
       <span class="menu-icon">❓</span>
       Hilfe-Tour starten
   </button>
   
   function resetOnboarding() {
       localStorage.removeItem('axiom-onboarding-completed');
       window.startOnboarding();
   }
   ```

2. **Kontext-sensitive Tooltips:**
   ```javascript
   // Tooltips, die sich basierend auf aktuellem State ändern
   <button data-tooltip-active="Sidebar ist geöffnet" 
           data-tooltip-inactive="Sidebar öffnen">
   ```

3. **Video-Tutorials in Tooltips:**
   ```javascript
   // Erweiterte Tooltips mit eingebetteten Demos
   data-tooltip-video="demo-sidebar.mp4"
   ```

4. **Tooltip-Übersetzungen:**
   ```javascript
   // i18n Support für mehrsprachige Tooltips
   data-tooltip-key="tooltip.sidebar.open"
   ```

### Vorteile nach Umsetzung

✅ **Reduzierte Lernkurve:** Neue Nutzer verstehen Features sofort  
✅ **Bessere Discoveryability:** Versteckte Features werden gefunden  
✅ **Kontextbezogene Hilfe:** Hilfe genau dort, wo sie benötigt wird  
✅ **Einmalige Einführung:** Onboarding nur beim ersten Besuch  
✅ **Barrierefrei:** Tooltips per Tastatur & Screen Reader zugänglich  
✅ **Wartbar:** Tooltip-Texte zentral in HTML verwaltet

---

## 📋 Priorisierung & Roadmap

### Empfohlene Umsetzungsreihenfolge

**Sprint 1 (Woche 1):**
- ✅ Verbesserungsvorschlag 1: State Management
  - Tag 1-2: Grundgerüst erstellen
  - Tag 3-4: Kern-Module migrieren
  - Tag 5: Testing & Cleanup

**Sprint 2 (Woche 2):**
- ✅ Verbesserungsvorschlag 3: Tooltip-System
  - Tag 1-2: Tooltip-System implementieren
  - Tag 3: HTML-Markup erweitern
  - Tag 4-5: Testing & Feintuning

**Sprint 3 (Woche 3):**
- ✅ Verbesserungsvorschlag 3: Onboarding-Guide
  - Tag 1-2: Onboarding-System implementieren
  - Tag 3: Onboarding-Flow definieren
  - Tag 4-5: Testing & Optimierung

### Abhängigkeiten

```
State Management (V1)
    ↓
    ├── Tooltips verwenden AppState für Preferences
    └── Onboarding verwendet AppState für Tracking
```

**Wichtig:** State Management sollte **zuerst** implementiert werden, da die anderen Features davon profitieren können (z.B. Onboarding-Status im AppState speichern).

---

## 🧪 Testing-Checkliste

### State Management Testing

- [ ] State-Updates werden korrekt persistiert
- [ ] Subscribers werden bei Änderungen benachrichtigt
- [ ] Cross-Module State-Synchronisation funktioniert
- [ ] LocalStorage-Fallback bei Quota-Überschreitung
- [ ] State-Reset bei Fehler funktioniert

### Tooltip Testing

- [ ] Tooltips erscheinen bei Hover
- [ ] Tooltips erscheinen bei Keyboard-Focus
- [ ] Tooltips passen sich an Viewport-Grenzen an
- [ ] Screen Reader liest Tooltips korrekt vor
- [ ] Mobile Touch-Tooltips funktionieren
- [ ] Tooltips verschwinden korrekt bei Blur/Leave

### Onboarding Testing

- [ ] Onboarding startet nur beim ersten Besuch
- [ ] Alle Steps werden korrekt angezeigt
- [ ] Navigation (Vor/Zurück/Skip) funktioniert
- [ ] Highlight positioniert sich korrekt
- [ ] Aktionen werden ausgeführt (z.B. Sidebar öffnen)
- [ ] ESC-Taste bricht Onboarding ab
- [ ] Onboarding-Status wird persistiert
- [ ] Mobile-Ansicht funktioniert korrekt

---

## 📚 Dokumentation & Wartung

### Code-Dokumentation

Alle neuen Module sollten folgende Dokumentation enthalten:

```javascript
/**
 * SCRIPT-MODULE-NAME.JS
 * 
 * Beschreibung: [Was macht das Modul?]
 * 
 * Abhängigkeiten:
 * - script-core.js (Logging)
 * - script-state-manager.js (State)
 * 
 * Public API:
 * - window.functionName() - [Beschreibung]
 * 
 * Events:
 * - Emittiert: [welche Events]
 * - Hört auf: [welche Events]
 * 
 * LocalStorage Keys:
 * - key-name: [Beschreibung]
 */
```

### Update-Guide für Team

**Wenn neue UI-Elemente hinzugefügt werden:**

1. Tooltip hinzufügen:
   ```html
   <button data-tooltip="Beschreibung der Funktion">...</button>
   ```

2. Bei Bedarf in Onboarding aufnehmen:
   ```javascript
   // In script-onboarding.js
   ONBOARDING_STEPS.push({
       target: '#new-element',
       title: 'Neues Feature',
       message: 'Beschreibung...'
   });
   ```

3. State-Integration (falls zustandsbehaftet):
   ```javascript
   // State definieren
   AppState.ui.newFeature = false;
   
   // Subscribe to changes
   AppState.subscribe('ui.newFeature', (value) => {
       // React to change
   });
   ```

---

## 🔄 Migration & Rollback

### Migration von Alt zu Neu

**Sicherer Migrations-Prozess:**

1. **Backup erstellen:**
   ```bash
   # Alle relevanten Dateien sichern
   cp script-sidebar-manager.js script-sidebar-manager.js.backup
   cp script-theme.js script-theme.js.backup
   # etc.
   ```

2. **Feature-Flag einführen:**
   ```javascript
   // In script-core.js
   window.BUILD_INFO.useNewStateManager = true; // Kann zum Rollback auf false gesetzt werden
   ```

3. **Schrittweise Migration:**
   - Ein Modul nach dem anderen migrieren
   - Nach jedem Modul vollständig testen
   - Bei Problemen: Feature-Flag auf false setzen

4. **Alte Code-Pfade beibehalten:**
   ```javascript
   if (window.BUILD_INFO.useNewStateManager && window.AppState) {
       // Neuer Code-Pfad
       AppState.update('ui.sidebarOpen', true);
   } else {
       // Alter Code-Pfad (Fallback)
       localStorage.setItem('sidebar-open', 'true');
   }
   ```

### Rollback-Strategie

Falls nach Deployment Probleme auftreten:

1. **Sofort-Rollback:**
   ```javascript
   // In script-core.js
   window.BUILD_INFO.useNewStateManager = false;
   ```

2. **Vollständiger Rollback:**
   ```bash
   # Backup-Dateien wiederherstellen
   cp script-sidebar-manager.js.backup script-sidebar-manager.js
   # State-Manager deaktivieren
   # <!-- <script src="script-state-manager.js"></script> -->
   ```

3. **Daten-Migration:**
   ```javascript
   // Falls neue State-Struktur inkompatibel ist
   function migrateOldToNewState() {
       const oldData = localStorage.getItem('old-key');
       if (oldData) {
           AppState.update('new.path', oldData);
           localStorage.removeItem('old-key');
       }
   }
   ```

---

## 💡 Best Practices

### State Management

- **Immer über AppState.update() ändern**, nie direkt
- **Subscribe-Functions aufräumen** wenn Komponente unmounted
- **Debouncing nutzen** für häufige Updates
- **Validation** vor State-Updates durchführen

### Tooltips

- **Kurz und präzise** formulieren (max. 1-2 Sätze)
- **Aktionsorientiert** schreiben ("Öffnet..." statt "Hier können Sie...")
- **Konsistente Terminologie** verwenden
- **Accessibility** beachten (aria-label zusätzlich)

### Onboarding

- **Nicht zu viele Steps** (max. 5-7)
- **Wichtigste Features zuerst** zeigen
- **Überspringen ermöglichen** (ESC + Skip-Button)
- **Auf allen Breakpoints testen**

---

## 📊 Success Metrics

### KPIs nach Implementierung messen

**State Management:**
- ✅ Reduzierte Bug-Reports zu State-Inkonsistenzen
- ✅ Kürzere Entwicklungszeit für neue Features
- ✅ Weniger localStorage-Zugriffe (Performance)

**Tooltips & Onboarding:**
- ✅ Reduzierte Support-Anfragen zu "Wie funktioniert...?"
- ✅ Höhere Feature-Nutzung (Tracking via Analytics)
- ✅ Schnellere Time-to-Value für neue Nutzer

### Tracking implementieren (optional)

```javascript
// In script-onboarding.js
function trackOnboardingStep(stepIndex) {
    if (window.analytics) {
        window.analytics.track('Onboarding Step', {
            step: stepIndex,
            stepName: ONBOARDING_STEPS[stepIndex].title
        });
    }
}

// In script-tooltips.js  
function trackTooltipView(tooltipText) {
    if (window.analytics) {
        window.analytics.track('Tooltip Viewed', {
            content: tooltipText
        });
    }
}
```

---

## ✅ Abschluss-Checkliste

### Vor Deployment prüfen:

**Code-Qualität:**
- [ ] Alle Module sind dokumentiert
- [ ] Logging ist konsistent implementiert
- [ ] Error-Handling ist vorhanden
- [ ] Code ist reviewt und getestet

**Funktionalität:**
- [ ] Alle Features funktionieren wie spezifiziert
- [ ] Cross-Browser-Tests durchgeführt
- [ ] Mobile-Tests durchgeführt
- [ ] Accessibility-Tests durchgeführt

**Performance:**
- [ ] Keine Memory Leaks
- [ ] LocalStorage-Quota wird nicht überschritten
- [ ] Keine unnötigen Re-Renders/Updates

**Dokumentation:**
- [ ] README aktualisiert
- [ ] Changelog erstellt
- [ ] Team ist geschult
- [ ] Rollback-Plan vorhanden

---

## 📞 Support & Weitere Hilfe

Bei Fragen oder Problemen während der Implementierung:

1. **Konsole prüfen:** Debug-Logs aktivieren (`BUILD_INFO.debugMode = true`)
2. **State inspizieren:** `console.log(AppState)` in Browser-Console
3. **Module einzeln testen:** Features isoliert aktivieren/deaktivieren
4. **Rollback nutzen:** Bei kritischen Problemen sofort zurückrollen

---

**Ende des Dokuments**  
*Letzte Aktualisierung: 04. Oktober 2025*
````

Perfekt! Ich habe das vollständige Dokument mit beiden Verbesserungsvorschlägen im Artifact erstellt. Das Dokument enthält nun:

## **Inhalt des Dokuments:**

### **Verbesserungsvorschlag 1: Einheitliche Zustandsverwaltung**
- ✅ Vollständiger Code für `script-state-manager.js` (~250 Zeilen)
- ✅ Migrations-Beispiele für bestehende Module
- ✅ Implementierungsschritte (6-10 Stunden)
- ✅ Observer-Pattern mit Subscribe/Update-Mechanismus
- ✅ Zentrale localStorage-Persistierung mit Debouncing

### **Verbesserungsvorschlag 3: Tooltips & Onboarding**
- ✅ Vollständiger Code für `script-tooltips.js` (~150 Zeilen)
- ✅ Vollständiger Code für `script-onboarding.js` (~350 Zeilen)
- ✅ Komplettes CSS für beide Systeme
- ✅ HTML-Markup-Beispiele mit `data-tooltip` Attributen
- ✅ 5-Schritt-Onboarding-Flow vordefiniert
- ✅ Implementierungsschritte (6-9 Stunden)

### **Zusätzliche Inhalte:**
- ✅ Priorisierung & Roadmap (3-Wochen-Plan)
- ✅ Abhängigkeits-Diagramm
- ✅ Umfassende Testing-Checklisten
- ✅ Migration & Rollback-Strategien
- ✅ Best Practices für alle Features
- ✅ Success Metrics & KPIs
- ✅ Abschluss-Checkliste vor Deployment

## **Nächste Schritte:**

Sie können das Dokument nun:
1. **Aus dem Artifact kopieren** und in Ihrer Projektdokumentation ablegen
2. **Als Referenz verwenden** während der Implementierung
3. **Mit Ihrem Team teilen** für Review und Planung

Möchten Sie, dass ich noch spezifische Aspekte detaillierter ausarbeite, oder haben Sie Fragen zur Implementierung eines der Vorschläge?



## Prompt:
4.10.2025, 15:27:35

Wo wir gerade Vorschläge sammeln. Hier sind noch Ideen, die ich umsetzen möchte.
1) Stickte Trennung von CSS, HTML und Javascript. In HTML-Tags soll kein style-attribute verwendet werden, nur Klassen. In Javascript soll kein CSS-Attribut gesetzt werden sondern nur Klassen.
Die Trennung trennt Layout von Form und Inhalte, von Funktion.
Das erachte ich als sehr sinnvoll mit einer hohen Prioriät.

2) Ein Sidebar "favorites" für Lesezeichen soll erstellt werden. Dieser soll unterhalb des Verlaufs angesiedelt sein. Favoriten werden mit per Stern-Button in der Navigationsleiste gesetzt. Sie werden im Speicher des Browser mit abgelegt. Die Ordnung der Lesezeichen soll aufsteigend nach Alter, bzw. letzter Benutzung sortiert sein. Eine Suchfunktion soll die Liste nach Levenshtein Distanz sortieren.
Auch diese Idee möchte ich zeitnah umsetzen.

3) Ich möchte ein Glossar-Feature. Dieses Glossar basiert auf einer JSON-Datei, deren Schema noch erstellt werden muss. Diese soll beinhalten: Header, Explainer-Text, Image (max. 300x200px), Tags, RegExp-Patterns, Link. Im Viewport soll dynamisch für die angezeigten Element ein Script laufen, welches im angezeigten Text die als Tags oder RegExp-Patterns hinterlegten Begriffe sucht. Daraufhin aus dem Wort ein hoverable <div> macht. Das soll mit einer unterstrichenen gestrichelten Linie gekennzeichnet werden. Beim hover über dieses Object, öffnet sich ein Tooltip-Pop-Over. Dieses erklärt den so markierten Begriff und zeigt die Überschrift, der Erklärtext (bis zu 250 Zeichen), ggf. das Bild und einen weiterführenden Link an. Wenn die Maus den Tooltip verlässt, soll sich das Pop-Over wieder schließen. Hier muss noch geprüft werden, wie das Barrierefrei umgesetzt werden kann. Das ist ein nice to have Feature, welches ich gern umsetzen möchte, was aber nicht dringend ist.

4) Ich brauche noch einen "Don't tell; just show"-Modus, für die lernunwilligen Anwender, die die Funktionen der forensischen Software nicht verstehen, sondern nur anwenden möchten. Im Standard Medien Anzeige Modus sollen diese nicht mit angezeigt werden, sondern nur im Modus "Vollständig". Auch das ist recht wichtig. Also zumindest meiner Chefin. Also sollte ich das Zeitnah mit integrieren.

5) Im Agenten möchte ich gern eine FAQ mit einbetten. Es soll eine Eingabezeile beim Agenten geben. Die Eingabe soll mit dem Inhalt einer faq.json abgeglichen werden. Wenn es eine Übereinstimmung bei Tag oder Volltext gibt, dann wird durch den Agenten die jeweilige Information ausgegeben. - im Agenten eine Feedback/Ideen-Funktion verankern. Diese öffnet eine Mail über mailto Link mit Subject header und komponiertem Body im E-Mail-Programm. Das muss aber noch richtig überlegt werden und ist nicht so ganz dringend. Ist aber im Scope der Entwicklungen die umgesetzt werden sollen.

6) Die Animationen und Transitionen sollen noch verbessert werden. Die rechte und die linke Seitenleiste sollen sich gleich anfühlen. Das hat eine sehr hohe Priorität das UX sehr, sehr wichtig in diesem Projekt ist.

Kannst du diese Ideen bitte mit aufnehmen? Danke!



## Response:
4.10.2025, 15:29:30

Sehr gerne! Ich werde alle sechs Ideen strukturiert in das bestehende Dokument integrieren. Das sind wirklich durchdachte Features mit klaren Prioritäten.

**Verbesserungsvorschläge für AXIOM Leitfaden** ∙ Version 3

````markdown
# Verbesserungsvorschläge für AXIOM Leitfaden

**Dokumentversion:** 1.0  
**Datum:** 04. Oktober 2025  
**Status:** Geplant / Zur Umsetzung vorgemerkt

---

## Übersicht

Dieses Dokument enthält detaillierte Verbesserungsvorschläge für den AXIOM Leitfaden, die nach Analyse der aktuellen Implementierung (Build 053) erarbeitet wurden.

**Prioritäten-Übersicht:**

### 🔴 Sehr hohe Priorität (Sofort umsetzen)
- ✅ **V1:** Einheitliche Zustandsverwaltung
- ✅ **V4:** Strikte Trennung: CSS / HTML / JavaScript
- ✅ **V9:** Animations- und Transitions-Harmonisierung

### 🟠 Hohe Priorität (Zeitnah umsetzen)
- ✅ **V3:** Tooltips & Onboarding-System
- ✅ **V5:** Favorites/Lesezeichen-Sidebar
- ✅ **V7:** "Don't tell; just show"-Modus

### 🟡 Mittlere Priorität (Geplant)
- ✅ **V6:** Glossar-Feature mit Hover-Tooltips
- ✅ **V8:** Agent FAQ-System & Feedback-Funktion

### ⏸️ Zurückgestellt
- ⏸️ **V2:** Progressive Enhancement (nicht benötigt für Corporate Environment)

---

## 🎯 Verbesserungsvorschlag 1: Einheitliche Zustandsverwaltung

### Problembeschreibung

**Aktueller Zustand:**
- Verschiedene Module verwalten ihre Zustände unabhängig
- Verstreute localStorage-Zugriffe in mehreren Dateien
- Potenzielle Synchronisationsprobleme zwischen Komponenten
- Redundante Code-Duplikation für State-Persistierung

**Betroffene Module:**
- `script-sidebar-manager.js` - Sidebar-Status
- `script-notes.js` - Notizen-Panel-Status
- `script-tips.js` - Tipps-Footer-Sichtbarkeit
- `script-theme.js` - Theme-Präferenz
- `script-preferences.js` - Diverse UI-Einstellungen
- `script-history.js` - Zeitformat-Präferenz

### Lösungsansatz

**Zentrale Zustandsverwaltung mit Observer-Pattern:**

#### 1. Neues Modul: `script-state-manager.js`

```javascript
// ============================================================================
// SCRIPT-STATE-MANAGER.JS
// Zentrale Zustandsverwaltung mit Observer-Pattern und Persistierung
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'STATE-MGR';
    
    // ===== ZENTRALER APPLICATION STATE =====
    window.AppState = {
        ui: {
            sidebarOpen: false,
            sidebarActive: null,  // 'navigation', 'history', null
            notesOpen: false,
            tipsVisible: true,
            menuOpen: false
        },
        preferences: {
            theme: 'system',
            detailLevel: 1,
            timeFormat: 'relative',  // 'relative' oder 'absolute'
            mediaLayer: 'standard',
            contrastEnhanced: false
        },
        content: {
            currentSection: null,
            scrollPosition: 0
        }
    };
    
    // ===== OBSERVER SUBSCRIBERS =====
    const subscribers = new Map();
    
    /**
     * Subscribe to state changes
     * @param {string} path - Dot-notation path (e.g., 'ui.sidebarOpen')
     * @param {Function} callback - Called when state changes
     * @returns {Function} Unsubscribe function
     */
    window.AppState.subscribe = function(path, callback) {
        if (!subscribers.has(path)) {
            subscribers.set(path, new Set());
        }
        
        subscribers.get(path).add(callback);
        
        LOG(MODULE, `Subscribed to state path: ${path}`);
        
        // Return unsubscribe function
        return () => {
            subscribers.get(path)?.delete(callback);
            LOG(MODULE, `Unsubscribed from state path: ${path}`);
        };
    };
    
    /**
     * Update state and notify subscribers
     * @param {string} path - Dot-notation path
     * @param {*} value - New value
     */
    window.AppState.update = function(path, value) {
        const keys = path.split('.');
        let current = window.AppState;
        
        // Navigate to target
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        
        // Update value
        const oldValue = current[keys[keys.length - 1]];
        current[keys[keys.length - 1]] = value;
        
        LOG(MODULE, `State updated: ${path}`, { oldValue, newValue: value });
        
        // Notify subscribers
        notifySubscribers(path, value, oldValue);
        
        // Persist to localStorage (debounced)
        debouncedPersist();
    };
    
    /**
     * Get state value
     * @param {string} path - Dot-notation path
     * @returns {*} State value
     */
    window.AppState.get = function(path) {
        const keys = path.split('.');
        let current = window.AppState;
        
        for (const key of keys) {
            current = current[key];
            if (current === undefined) return undefined;
        }
        
        return current;
    };
    
    // ===== INTERNAL FUNCTIONS =====
    
    function notifySubscribers(path, newValue, oldValue) {
        const pathSubscribers = subscribers.get(path);
        
        if (pathSubscribers && pathSubscribers.size > 0) {
            pathSubscribers.forEach(callback => {
                try {
                    callback(newValue, oldValue);
                } catch (error) {
                    LOG.error(MODULE, `Subscriber callback error for ${path}`, error);
                }
            });
            
            LOG(MODULE, `Notified ${pathSubscribers.size} subscriber(s) for: ${path}`);
        }
    }
    
    // ===== PERSISTENCE =====
    
    const STORAGE_KEY = 'axiom-app-state';
    let persistTimeout = null;
    
    function debouncedPersist() {
        clearTimeout(persistTimeout);
        persistTimeout = setTimeout(persistState, 500);
    }
    
    function persistState() {
        try {
            const stateToPersist = {
                ui: window.AppState.ui,
                preferences: window.AppState.preferences
                // content wird nicht persistiert (Session-basiert)
            };
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
            LOG(MODULE, 'State persisted to localStorage');
        } catch (error) {
            LOG.error(MODULE, 'Failed to persist state', error);
        }
    }
    
    function loadPersistedState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            
            if (saved) {
                const parsed = JSON.parse(saved);
                
                // Merge mit default state
                Object.assign(window.AppState.ui, parsed.ui || {});
                Object.assign(window.AppState.preferences, parsed.preferences || {});
                
                LOG.success(MODULE, 'State loaded from localStorage', parsed);
                return true;
            }
        } catch (error) {
            LOG.error(MODULE, 'Failed to load persisted state', error);
        }
        
        return false;
    }
    
    // ===== INITIALIZATION =====
    
    function initStateManager() {
        LOG(MODULE, 'Initializing state manager...');
        
        // Load persisted state
        loadPersistedState();
        
        // Apply initial state to DOM
        applyInitialState();
        
        LOG.success(MODULE, 'State manager initialized', window.AppState);
    }
    
    function applyInitialState() {
        // Theme anwenden
        if (window.AppState.preferences.theme !== 'system') {
            document.documentElement.setAttribute('data-theme', window.AppState.preferences.theme);
        }
        
        // Tips-Footer Sichtbarkeit
        if (!window.AppState.ui.tipsVisible) {
            document.body.classList.add('tips-hidden');
        }
        
        LOG(MODULE, 'Initial state applied to DOM');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStateManager);
    } else {
        initStateManager();
    }
    
    LOG(MODULE, 'State manager module loaded');
    
})();
```

#### 2. Migration bestehender Module

**Beispiel: `script-sidebar-manager.js` Migration**

```javascript
// VORHER (alt):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    localStorage.setItem('axiom-sidebar-active', sidebarId);
}

// NACHHER (neu):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    AppState.update('ui.sidebarActive', sidebarId);
    AppState.update('ui.sidebarOpen', true);
}

// Subscribe to changes from other modules
AppState.subscribe('ui.sidebarActive', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        // Update DOM accordingly
        updateSidebarDOM(newValue);
    }
});
```

**Beispiel: `script-theme.js` Migration**

```javascript
// Subscribe to theme changes
AppState.subscribe('preferences.theme', (newTheme) => {
    applyTheme(newTheme);
    updateThemeIcon(newTheme);
});

// Update theme
function cycleTheme() {
    const currentTheme = AppState.get('preferences.theme');
    const nextTheme = getNextTheme(currentTheme);
    AppState.update('preferences.theme', nextTheme);
}
```

### Implementierungsschritte

1. **Phase 1: Grundgerüst** (1-2 Stunden)
   - Erstellen von `script-state-manager.js`
   - Integration in `index.html` (vor allen anderen Modulen!)
   - Tests der Basis-Funktionalität

2. **Phase 2: Migration Kern-Module** (2-3 Stunden)
   - `script-theme.js` migrieren
   - `script-sidebar-manager.js` migrieren
   - `script-tips.js` migrieren

3. **Phase 3: Migration restliche Module** (2-3 Stunden)
   - `script-notes.js` migrieren
   - `script-preferences.js` migrieren
   - `script-history.js` (Zeitformat) migrieren

4. **Phase 4: Testing & Cleanup** (1-2 Stunden)
   - Cross-Module-Tests
   - Alte localStorage-Aufrufe entfernen
   - Dokumentation aktualisieren

**Gesamt-Aufwand:** ca. 6-10 Stunden

### Vorteile nach Umsetzung

✅ **Zentrale Kontrolle:** Ein Ort für alle UI-Zustände  
✅ **Konsistenz:** Keine Race Conditions mehr  
✅ **Debugging:** Alle State-Changes geloggt an einem Ort  
✅ **Erweiterbarkeit:** Neue Features einfach in State integrieren  
✅ **Performance:** Reduzierte localStorage-Zugriffe durch Debouncing  
✅ **Testbarkeit:** State-Logic isoliert testbar

---

## 🎓 Verbesserungsvorschlag 3: Kontextbezogene Tooltips & Onboarding

### Problembeschreibung

**Aktueller Zustand:**
- Viele Features ohne direkte Erklärung
- Tipps-Footer ist generisch, nicht kontextbezogen
- Neue Nutzer müssen Features selbst entdecken
- Keine geführte Einführung in die Funktionalität

**User Experience Probleme:**
- Hohe Lernkurve für Erstnutzer
- Features werden möglicherweise nicht entdeckt
- Keine Hilfe bei komplexeren Funktionen (Detail-Level, Sidebar-System)

### Lösungsansatz

**Zweistufiges System:**
1. **Permanente Tooltips** - Hover-Hilfe für alle UI-Elemente
2. **Einmaliger Onboarding-Guide** - Schritt-für-Schritt bei Erstbesuch

#### 1. Tooltip-System

**Neues Modul: `script-tooltips.js`**

```javascript
// ============================================================================
// SCRIPT-TOOLTIPS.JS
// Kontextbezogene Tooltips für UI-Elemente
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'TOOLTIPS';
    
    // ===== TOOLTIP CONTAINER =====
    let tooltipElement = null;
    
    function createTooltipElement() {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'app-tooltip';
        tooltipElement.setAttribute('role', 'tooltip');
        tooltipElement.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tooltipElement);
    }
    
    // ===== TOOLTIP ANZEIGE =====
    
    function showTooltip(targetElement, text) {
        if (!tooltipElement || !text) return;
        
        tooltipElement.textContent = text;
        tooltipElement.setAttribute('aria-hidden', 'false');
        
        // Position berechnen
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        
        // Viewport-Check
        if (top < 10) {
            top = rect.bottom + 8; // Unterhalb anzeigen
            tooltipElement.classList.add('tooltip-bottom');
        } else {
            tooltipElement.classList.remove('tooltip-bottom');
        }
        
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
        tooltipElement.classList.add('visible');
    }
    
    function hideTooltip() {
        if (!tooltipElement) return;
        
        tooltipElement.classList.remove('visible');
        tooltipElement.setAttribute('aria-hidden', 'true');
    }
    
    // ===== EVENT HANDLERS =====
    
    function handleMouseEnter(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleMouseLeave(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        hideTooltip();
    }
    
    function handleFocus(event) {
        const target = event.target;
        if (!target.hasAttribute('data-tooltip')) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleBlur() {
        hideTooltip();
    }
    
    // ===== INITIALIZATION =====
    
    function initTooltips() {
        LOG(MODULE, 'Initializing tooltip system...');
        
        createTooltipElement();
        
        // Event-Delegation für alle Tooltips
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);
        document.addEventListener('focus', handleFocus, true);
        document.addEventListener('blur', handleBlur, true);
        
        LOG.success(MODULE, 'Tooltip system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }
    
    LOG(MODULE, 'Tooltips module loaded');
    
})();
```

**CSS für Tooltips:**

```css
/* ===== TOOLTIP SYSTEM ===== */
.app-tooltip {
    position: fixed;
    background-color: var(--color-text-primary);
    color: var(--color-surface-elevated);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.9em;
    line-height: 1.4;
    max-width: 250px;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 4px 12px var(--color-shadow-strong);
}

.app-tooltip.visible {
    opacity: 1;
    transform: translateY(0);
}

.app-tooltip.tooltip-bottom {
    transform: translateY(4px);
}

.app-tooltip.tooltip-bottom.visible {
    transform: translateY(0);
}

/* Tooltip-Pfeil (optional) */
.app-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: var(--color-text-primary);
}

.app-tooltip.tooltip-bottom::before {
    bottom: auto;
    top: 100%;
    border-bottom-color: transparent;
    border-top-color: var(--color-text-primary);
}

/* Accessibility: Tooltips bei prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
    .app-tooltip {
        transition: none;
    }
}
```

**HTML-Markup (Beispiele):**

```html
<!-- Hamburger Menu -->
<button id="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen">
    ☰
</button>

<!-- Detail-Level Buttons -->
<button class="detail-btn-mini" 
        data-level="1"
        data-tooltip="Ebene 1: Nur die wichtigsten Informationen"
        aria-pressed="true">
    1
</button>

<!-- Sidebar Toggle -->
<button id="toggle-nav-sidebar-btn" 
        data-tooltip="Zeigt oder versteckt die Navigations-Sidebar"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<!-- Theme Toggle -->
<button id="toggle-theme" 
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata"
        role="menuitem">
    Theme: <span id="current-theme">System</span>
</button>
```

#### 2. Onboarding-Guide

**Neues Modul: `script-onboarding.js`**

```javascript
// ============================================================================
// SCRIPT-ONBOARDING.JS
// Einmaliger Onboarding-Guide für Erstnutzer
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'ONBOARDING';
    
    // ===== ONBOARDING STEPS =====
    const ONBOARDING_STEPS = [
        {
            target: '#menu-toggle',
            title: 'Willkommen! 👋',
            message: 'Hier finden Sie alle wichtigen Einstellungen und Funktionen.',
            position: 'bottom'
        },
        {
            target: '.detail-controls',
            title: 'Detailtiefe anpassen',
            message: 'Wählen Sie zwischen drei Detailstufen: Basis, Standard oder Vollständig.',
            position: 'bottom'
        },
        {
            target: '#toggle-nav-sidebar-btn',
            title: 'Navigation-Sidebar',
            message: 'Öffnen Sie die Sidebar für schnelle Navigation durch den Leitfaden.',
            action: () => {
                document.getElementById('toggle-nav-sidebar-btn')?.click();
            }
        },
        {
            target: '.notes-toggle',
            title: 'Notizen machen',
            message: 'Halten Sie wichtige Informationen direkt im Leitfaden fest.',
            position: 'left'
        },
        {
            target: '#toggle-theme',
            title: 'Theme wählen',
            message: 'Passen Sie das Farbschema an Ihre Vorlieben an.',
            position: 'bottom'
        }
    ];
    
    // ===== STATE =====
    let currentStep = 0;
    let onboardingActive = false;
    let overlayElement = null;
    let highlightElement = null;
    let tooltipElement = null;
    
    // ===== ONBOARDING UI =====
    
    function createOnboardingElements() {
        // Overlay
        overlayElement = document.createElement('div');
        overlayElement.className = 'onboarding-overlay';
        overlayElement.setAttribute('aria-hidden', 'true');
        
        // Highlight
        highlightElement = document.createElement('div');
        highlightElement.className = 'onboarding-highlight';
        
        // Tooltip
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'onboarding-tooltip';
        tooltipElement.innerHTML = `
            <div class="onboarding-header">
                <h3 class="onboarding-title"></h3>
                <button class="onboarding-skip" aria-label="Tour überspringen">×</button>
            </div>
            <p class="onboarding-message"></p>
            <div class="onboarding-footer">
                <span class="onboarding-progress"></span>
                <div class="onboarding-buttons">
                    <button class="onboarding-prev">Zurück</button>
                    <button class="onboarding-next">Weiter</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlayElement);
        document.body.appendChild(highlightElement);
        document.body.appendChild(tooltipElement);
    }
    
    function showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= ONBOARDING_STEPS.length) {
            endOnboarding();
            return;
        }
        
        currentStep = stepIndex;
        const step = ONBOARDING_STEPS[stepIndex];
        
        // Target Element finden
        const targetElement = document.querySelector(step.target);
        if (!targetElement) {
            LOG.warn(MODULE, `Target not found: ${step.target}, skipping step`);
            showStep(stepIndex + 1);
            return;
        }
        
        // Highlight positionieren
        const rect = targetElement.getBoundingClientRect();
        highlightElement.style.top = `${rect.top - 8}px`;
        highlightElement.style.left = `${rect.left - 8}px`;
        highlightElement.style.width = `${rect.width + 16}px`;
        highlightElement.style.height = `${rect.height + 16}px`;
        
        // Tooltip aktualisieren
        tooltipElement.querySelector('.onboarding-title').textContent = step.title;
        tooltipElement.querySelector('.onboarding-message').textContent = step.message;
        tooltipElement.querySelector('.onboarding-progress').textContent = 
            `Schritt ${stepIndex + 1} von ${ONBOARDING_STEPS.length}`;
        
        // Tooltip positionieren
        positionTooltip(targetElement, step.position || 'right');
        
        // Navigation Buttons
        const prevBtn = tooltipElement.querySelector('.onboarding-prev');
        const nextBtn = tooltipElement.querySelector('.onboarding-next');
        
        prevBtn.disabled = stepIndex === 0;
        nextBtn.textContent = stepIndex === ONBOARDING_STEPS.length - 1 ? 'Fertig' : 'Weiter';
        
        // Aktion ausführen (falls vorhanden)
        if (step.action && typeof step.action === 'function') {
            setTimeout(() => step.action(), 300);
        }
        
        // Elemente anzeigen
        overlayElement.classList.add('visible');
        highlightElement.classList.add('visible');
        tooltipElement.classList.add('visible');
        
        LOG(MODULE, `Showing step ${stepIndex + 1}/${ONBOARDING_STEPS.length}`);
    }
    
    function positionTooltip(targetElement, position) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top, left;
        
        switch(position) {
            case 'bottom':
                top = rect.bottom + 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'top':
                top = rect.top - tooltipRect.height - 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left - tooltipRect.width - 16;
                break;
            case 'right':
            default:
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + 16;
                break;
        }
        
        // Viewport boundaries
        if (top < 10) top = 10;
        if (left < 10) left = 10;
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = window.innerHeight - tooltipRect.height - 10;
        }
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }
    
    function endOnboarding() {
        onboardingActive = false;
        
        overlayElement?.classList.remove('visible');
        highlightElement?.classList.remove('visible');
        tooltipElement?.classList.remove('visible');
        
        // Markiere Onboarding als abgeschlossen
        localStorage.setItem('axiom-onboarding-completed', 'true');
        
        LOG.success(MODULE, 'Onboarding completed');
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Skip Button
        tooltipElement.querySelector('.onboarding-skip').addEventListener('click', () => {
            endOnboarding();
        });
        
        // Previous Button
        tooltipElement.querySelector('.onboarding-prev').addEventListener('click', () => {
            showStep(currentStep - 1);
        });
        
        // Next Button
        tooltipElement.querySelector('.onboarding-next').addEventListener('click', () => {
            showStep(currentStep + 1);
        });
        
        // ESC zum Abbrechen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && onboardingActive) {
                endOnboarding();
            }
        });
    }
    
    // ===== PUBLIC API =====
    
    window.startOnboarding = function() {
        if (onboardingActive) return;
        
        onboardingActive = true;
        currentStep = 0;
        
        if (!overlayElement) {
            createOnboardingElements();
            setupEventHandlers();
        }
        
        showStep(0);
        
        LOG(MODULE, 'Onboarding started');
    };
    
    // ===== INITIALIZATION =====
    
    function initOnboarding() {
        LOG(MODULE, 'Initializing onboarding system...');
        
        // Check if onboarding already completed
        const completed = localStorage.getItem('axiom-onboarding-completed');
        
        if (!completed) {
            // Start onboarding nach kurzer Verzögerung
            setTimeout(() => {
                window.startOnboarding();
            }, 1000);
        } else {
            LOG(MODULE, 'Onboarding already completed, skipping');
        }
        
        LOG.success(MODULE, 'Onboarding system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOnboarding);
    } else {
        initOnboarding();
    }
    
    LOG(MODULE, 'Onboarding module loaded');
    
})();
```

**CSS für Onboarding:**

```css
/* ===== ONBOARDING SYSTEM ===== */

/* Overlay - verdunkelt den Hintergrund */
.onboarding-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.onboarding-overlay.visible {
    opacity: 1;
    pointer-events: auto;
}

/* Highlight - hebt das aktuelle Element hervor */
.onboarding-highlight {
    position: fixed;
    border: 3px solid var(--color-primary);
    border-radius: 8px;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7),
                0 0 20px var(--color-primary);
}

.onboarding-highlight.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip - zeigt die Anleitung */
.onboarding-tooltip {
    position: fixed;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    border-radius: 12px;
    padding: 0;
    max-width: 350px;
    z-index: 10000;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px var(--color-shadow-strong);
}

.onboarding-tooltip.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip Header */
.onboarding-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 15px;
    border-bottom: 2px solid var(--color-border);
}

.onboarding-title {
    margin: 0;
    font-size: 1.2em;
    color: var(--color-primary);
}

.onboarding-skip {
    background: none;
    border: none;
    font-size: 1.8em;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all var(--transition-fast);
}

.onboarding-skip:hover {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
}

/* Tooltip Message */
.onboarding-message {
    padding: 20px;
    margin: 0;
    line-height: 1.6;
}

/* Tooltip Footer */
.onboarding-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 20px;
    border-top: 2px solid var(--color-border);
}

.onboarding-progress {
    font-size: 0.9em;
    color: var(--color-text-secondary);
}

.onboarding-buttons {
    display: flex;
    gap: 10px;
}

.onboarding-prev,
.onboarding-next {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 0.95em;
    font-weight: 500;
    transition: all var(--transition-fast);
}

.onboarding-prev {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    border: 2px solid var(--color-border);
}

.onboarding-prev:hover:not(:disabled) {
    background-color: var(--color-border);
}

.onboarding-prev:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.onboarding-next {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
}

.onboarding-next:hover {
    background-color: var(--color-primary-hover);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    .onboarding-overlay,
    .onboarding-highlight,
    .onboarding-tooltip {
        transition: none;
    }
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .onboarding-tooltip {
        max-width: calc(100vw - 40px);
        left: 20px !important;
        right: 20px;
        bottom: 20px !important;
        top: auto !important;
    }
    
    .onboarding-highlight {
        border-width: 2px;
    }
}
```

### Integration in index.html

**Reihenfolge der Script-Einbindung:**

```html
<!-- Core & State (ZUERST!) -->
<script src="script-core.js"></script>
<script src="script-state-manager.js"></script>

<!-- Basis-Module -->
<script src="script-section-management.js"></script>
<script src="script-sidebar-manager.js"></script>
<script src="script-navigation.js"></script>
<script src="script-history.js"></script>
<script src="script-notes.js"></script>
<script src="script-detail-level.js"></script>
<script src="script-tips.js"></script>
<script src="script-theme.js"></script>
<script src="script-preferences.js"></script>

<!-- UI Enhancements (NEU!) -->
<script src="script-tooltips.js"></script>
<script src="script-onboarding.js"></script>

<!-- Initialisierung (ZULETZT!) -->
<script src="script-init.js"></script>
```

### HTML-Markup Erweiterungen

**Tooltips hinzufügen zu allen interaktiven Elementen:**

```html
<!-- Top Navigation -->
<button id="menu-toggle" 
        class="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen" 
        aria-expanded="false">
    ☰
</button>

<!-- Detail Controls -->
<div class="detail-controls" data-tooltip="Wählen Sie die gewünschte Detailtiefe des Leitfadens">
    <span class="detail-label">Detail:</span>
    <div class="detail-buttons">
        <button class="detail-btn-mini" 
                data-level="1"
                data-tooltip="Ebene 1: Nur die wichtigsten Informationen anzeigen"
                aria-pressed="true">1</button>
        <button class="detail-btn-mini" 
                data-level="2"
                data-tooltip="Ebene 2: Standard-Informationen mit zusätzlichen Details"
                aria-pressed="false">2</button>
        <button class="detail-btn-mini" 
                data-level="3"
                data-tooltip="Ebene 3: Alle verfügbaren Informationen anzeigen"
                aria-pressed="false">3</button>
    </div>
</div>

<!-- Notes Toggle -->
<button class="notes-toggle" 
        data-tooltip="Öffnet das Notizen-Panel für persönliche Anmerkungen"
        aria-label="Notizen öffnen/schließen">
    📝 Notizen
</button>

<!-- Menu Items -->
<button class="menu-item" 
        id="show-history-btn" 
        data-tooltip="Zeigt den Verlauf der besuchten Abschnitte"
        role="menuitem">
    <span class="menu-icon">📜</span>
    Verlauf ein/aus
</button>

<button class="menu-item" 
        id="toggle-nav-sidebar-btn"
        data-tooltip="Öffnet die Navigation für schnellen Zugriff auf alle Abschnitte"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<button class="menu-item" 
        id="toggle-tips-footer-btn"
        data-tooltip="Blendet die Tipps am unteren Bildschirmrand ein oder aus"
        role="menuitem">
    <span class="menu-icon">💡</span>
    Tipps ein/aus
</button>

<button class="menu-item" 
        id="toggle-theme"
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata (Hell, Dunkel, Hochkontrast)"
        role="menuitem">
    <div class="theme-icon">...</div>
    Theme: <span id="current-theme">System</span>
</button>
```

### Implementierungsschritte

**Phase 1: Tooltip-System** (2-3 Stunden)
1. `script-tooltips.js` erstellen
2. CSS für Tooltips in `styles.css` einfügen
3. `data-tooltip` Attribute in `index.html` ergänzen
4. Testing auf Desktop & Mobile

**Phase 2: Onboarding-Guide** (3-4 Stunden)
1. `script-onboarding.js` erstellen
2. CSS für Onboarding in `styles.css` einfügen
3. Onboarding-Steps definieren und testen
4. Edge Cases behandeln (fehlende Targets, etc.)

**Phase 3: Feintuning** (1-2 Stunden)
1. Tooltip-Texte verfeinern und vereinheitlichen
2. Onboarding-Flow optimieren
3. Accessibility-Tests durchführen
4. Mobile-Optimierung validieren

**Gesamt-Aufwand:** ca. 6-9 Stunden

### Erweiterungsmöglichkeiten

**Optionale Features für später:**

1. **Onboarding zurücksetzen:**
   ```javascript
   // Im Menü einen "Hilfe-Tour starten" Button hinzufügen
   <button class="menu-item" onclick="resetOnboarding()">
       <span class="menu-icon">❓</span>
       Hilfe-Tour starten
   </button>
   
   function resetOnboarding() {
       localStorage.removeItem('axiom-onboarding-completed');
       window.startOnboarding();
   }
   ```

2. **Kontext-sensitive Tooltips:**
   ```javascript
   // Tooltips, die sich basierend auf aktuellem State ändern
   <button data-tooltip-active="Sidebar ist geöffnet" 
           data-tooltip-inactive="Sidebar öffnen">
   ```

3. **Video-Tutorials in Tooltips:**
   ```javascript
   // Erweiterte Tooltips mit eingebetteten Demos
   data-tooltip-video="demo-sidebar.mp4"
   ```

4. **Tooltip-Übersetzungen:**
   ```javascript
   // i18n Support für mehrsprachige Tooltips
   data-tooltip-key="tooltip.sidebar.open"
   ```

### Vorteile nach Umsetzung

✅ **Reduzierte Lernkurve:** Neue Nutzer verstehen Features sofort  
✅ **Bessere Discoveryability:** Versteckte Features werden gefunden  
✅ **Kontextbezogene Hilfe:** Hilfe genau dort, wo sie benötigt wird  
✅ **Einmalige Einführung:** Onboarding nur beim ersten Besuch  
✅ **Barrierefrei:** Tooltips per Tastatur & Screen Reader zugänglich  
✅ **Wartbar:** Tooltip-Texte zentral in HTML verwaltet

---

## 📋 Priorisierung & Roadmap

### Empfohlene Umsetzungsreihenfolge

**Sprint 1 (Woche 1):**
- ✅ Verbesserungsvorschlag 1: State Management
  - Tag 1-2: Grundgerüst erstellen
  - Tag 3-4: Kern-Module migrieren
  - Tag 5: Testing & Cleanup

**Sprint 2 (Woche 2):**
- ✅ Verbesserungsvorschlag 3: Tooltip-System
  - Tag 1-2: Tooltip-System implementieren
  - Tag 3: HTML-Markup erweitern
  - Tag 4-5: Testing & Feintuning

**Sprint 3 (Woche 3):**
- ✅ Verbesserungsvorschlag 3: Onboarding-Guide
  - Tag 1-2: Onboarding-System implementieren
  - Tag 3: Onboarding-Flow definieren
  - Tag 4-5: Testing & Optimierung

### Abhängigkeiten

```
State Management (V1)
    ↓
    ├── Tooltips verwenden AppState für Preferences
    └── Onboarding verwendet AppState für Tracking
```

**Wichtig:** State Management sollte **zuerst** implementiert werden, da die anderen Features davon profitieren können (z.B. Onboarding-Status im AppState speichern).

---

## 🧪 Testing-Checkliste

### State Management Testing

- [ ] State-Updates werden korrekt persistiert
- [ ] Subscribers werden bei Änderungen benachrichtigt
- [ ] Cross-Module State-Synchronisation funktioniert
- [ ] LocalStorage-Fallback bei Quota-Überschreitung
- [ ] State-Reset bei Fehler funktioniert

### Tooltip Testing

- [ ] Tooltips erscheinen bei Hover
- [ ] Tooltips erscheinen bei Keyboard-Focus
- [ ] Tooltips passen sich an Viewport-Grenzen an
- [ ] Screen Reader liest Tooltips korrekt vor
- [ ] Mobile Touch-Tooltips funktionieren
- [ ] Tooltips verschwinden korrekt bei Blur/Leave

### Onboarding Testing

- [ ] Onboarding startet nur beim ersten Besuch
- [ ] Alle Steps werden korrekt angezeigt
- [ ] Navigation (Vor/Zurück/Skip) funktioniert
- [ ] Highlight positioniert sich korrekt
- [ ] Aktionen werden ausgeführt (z.B. Sidebar öffnen)
- [ ] ESC-Taste bricht Onboarding ab
- [ ] Onboarding-Status wird persistiert
- [ ] Mobile-Ansicht funktioniert korrekt

---

## 📚 Dokumentation & Wartung

### Code-Dokumentation

Alle neuen Module sollten folgende Dokumentation enthalten:

```javascript
/**
 * SCRIPT-MODULE-NAME.JS
 * 
 * Beschreibung: [Was macht das Modul?]
 * 
 * Abhängigkeiten:
 * - script-core.js (Logging)
 * - script-state-manager.js (State)
 * 
 * Public API:
 * - window.functionName() - [Beschreibung]
 * 
 * Events:
 * - Emittiert: [welche Events]
 * - Hört auf: [welche Events]
 * 
 * LocalStorage Keys:
 * - key-name: [Beschreibung]
 */
```

### Update-Guide für Team

**Wenn neue UI-Elemente hinzugefügt werden:**

1. Tooltip hinzufügen:
   ```html
   <button data-tooltip="Beschreibung der Funktion">...</button>
   ```

2. Bei Bedarf in Onboarding aufnehmen:
   ```javascript
   // In script-onboarding.js
   ONBOARDING_STEPS.push({
       target: '#new-element',
       title: 'Neues Feature',
       message: 'Beschreibung...'
   });
   ```

3. State-Integration (falls zustandsbehaftet):
   ```javascript
   // State definieren
   AppState.ui.newFeature = false;
   
   // Subscribe to changes
   AppState.subscribe('ui.newFeature', (value) => {
       // React to change
   });
   ```

---

## 🔄 Migration & Rollback

### Migration von Alt zu Neu

**Sicherer Migrations-Prozess:**

1. **Backup erstellen:**
   ```bash
   # Alle relevanten Dateien sichern
   cp script-sidebar-manager.js script-sidebar-manager.js.backup
   cp script-theme.js script-theme.js.backup
   # etc.
   ```

2. **Feature-Flag einführen:**
   ```javascript
   // In script-core.js
   window.BUILD_INFO.useNewStateManager = true; // Kann zum Rollback auf false gesetzt werden
   ```

3. **Schrittweise Migration:**
   - Ein Modul nach dem anderen migrieren
   - Nach jedem Modul vollständig testen
   - Bei Problemen: Feature-Flag auf false setzen

4. **Alte Code-Pfade beibehalten:**
   ```javascript
   if (window.BUILD_INFO.useNewStateManager && window.AppState) {
       // Neuer Code-Pfad
       AppState.update('ui.sidebarOpen', true);
   } else {
       // Alter Code-Pfad (Fallback)
       localStorage.setItem('sidebar-open', 'true');
   }
   ```

### Rollback-Strategie

Falls nach Deployment Probleme auftreten:

1. **Sofort-Rollback:**
   ```javascript
   // In script-core.js
   window.BUILD_INFO.useNewStateManager = false;
   ```

2. **Vollständiger Rollback:**
   ```bash
   # Backup-Dateien wiederherstellen
   cp script-sidebar-manager.js.backup script-sidebar-manager.js
   # State-Manager deaktivieren
   # <!-- <script src="script-state-manager.js"></script> -->
   ```

3. **Daten-Migration:**
   ```javascript
   // Falls neue State-Struktur inkompatibel ist
   function migrateOldToNewState() {
       const oldData = localStorage.getItem('old-key');
       if (oldData) {
           AppState.update('new.path', oldData);
           localStorage.removeItem('old-key');
       }
   }
   ```

---

## 💡 Best Practices

### State Management

- **Immer über AppState.update() ändern**, nie direkt
- **Subscribe-Functions aufräumen** wenn Komponente unmounted
- **Debouncing nutzen** für häufige Updates
- **Validation** vor State-Updates durchführen

### Tooltips

- **Kurz und präzise** formulieren (max. 1-2 Sätze)
- **Aktionsorientiert** schreiben ("Öffnet..." statt "Hier können Sie...")
- **Konsistente Terminologie** verwenden
- **Accessibility** beachten (aria-label zusätzlich)

### Onboarding

- **Nicht zu viele Steps** (max. 5-7)
- **Wichtigste Features zuerst** zeigen
- **Überspringen ermöglichen** (ESC + Skip-Button)
- **Auf allen Breakpoints testen**

---

## 📊 Success Metrics

### KPIs nach Implementierung messen

**State Management:**
- ✅ Reduzierte Bug-Reports zu State-Inkonsistenzen
- ✅ Kürzere Entwicklungszeit für neue Features
- ✅ Weniger localStorage-Zugriffe (Performance)

**Tooltips & Onboarding:**
- ✅ Reduzierte Support-Anfragen zu "Wie funktioniert...?"
- ✅ Höhere Feature-Nutzung (Tracking via Analytics)
- ✅ Schnellere Time-to-Value für neue Nutzer

### Tracking implementieren (optional)

```javascript
// In script-onboarding.js
function trackOnboardingStep(stepIndex) {
    if (window.analytics) {
        window.analytics.track('Onboarding Step', {
            step: stepIndex,
            stepName: ONBOARDING_STEPS[stepIndex].title
        });
    }
}

// In script-tooltips.js  
function trackTooltipView(tooltipText) {
    if (window.analytics) {
        window.analytics.track('Tooltip Viewed', {
            content: tooltipText
        });
    }
}
```

---

## ✅ Abschluss-Checkliste

### Vor Deployment prüfen:

**Code-Qualität:**
- [ ] Alle Module sind dokumentiert
- [ ] Logging ist konsistent implementiert
- [ ] Error-Handling ist vorhanden
- [ ] Code ist reviewt und getestet

**Funktionalität:**
- [ ] Alle Features funktionieren wie spezifiziert
- [ ] Cross-Browser-Tests durchgeführt
- [ ] Mobile-Tests durchgeführt
- [ ] Accessibility-Tests durchgeführt

**Performance:**
- [ ] Keine Memory Leaks
- [ ] LocalStorage-Quota wird nicht überschritten
- [ ] Keine unnötigen Re-Renders/Updates

**Dokumentation:**
- [ ] README aktualisiert
- [ ] Changelog erstellt
- [ ] Team ist geschult
- [ ] Rollback-Plan vorhanden

---

## 📞 Support & Weitere Hilfe

Bei Fragen oder Problemen während der Implementierung:

1. **Konsole prüfen:** Debug-Logs aktivieren (`BUILD_INFO.debugMode = true`)
2. **State inspizieren:** `console.log(AppState)` in Browser-Console
3. **Module einzeln testen:** Features isoliert aktivieren/deaktivieren
4. **Rollback nutzen:** Bei kritischen Problemen sofort zurückrollen

---

**Ende des Dokuments**  
*Letzte Aktualisierung: 04. Oktober 2025*
````

**Verbesserungsvorschläge für AXIOM Leitfaden** ∙ Version 4

````markdown
# Verbesserungsvorschläge für AXIOM Leitfaden

**Dokumentversion:** 1.0  
**Datum:** 04. Oktober 2025  
**Status:** Geplant / Zur Umsetzung vorgemerkt

---

## Übersicht

Dieses Dokument enthält detaillierte Verbesserungsvorschläge für den AXIOM Leitfaden, die nach Analyse der aktuellen Implementierung (Build 053) erarbeitet wurden.

**Prioritäten-Übersicht:**

### 🔴 Sehr hohe Priorität (Sofort umsetzen)
- ✅ **V1:** Einheitliche Zustandsverwaltung
- ✅ **V4:** Strikte Trennung: CSS / HTML / JavaScript
- ✅ **V9:** Animations- und Transitions-Harmonisierung

### 🟠 Hohe Priorität (Zeitnah umsetzen)
- ✅ **V3:** Tooltips & Onboarding-System
- ✅ **V5:** Favorites/Lesezeichen-Sidebar
- ✅ **V7:** "Don't tell; just show"-Modus

### 🟡 Mittlere Priorität (Geplant)
- ✅ **V6:** Glossar-Feature mit Hover-Tooltips
- ✅ **V8:** Agent FAQ-System & Feedback-Funktion

### ⏸️ Zurückgestellt
- ⏸️ **V2:** Progressive Enhancement (nicht benötigt für Corporate Environment)

---

## 🎯 Verbesserungsvorschlag 1: Einheitliche Zustandsverwaltung

### Problembeschreibung

**Aktueller Zustand:**
- Verschiedene Module verwalten ihre Zustände unabhängig
- Verstreute localStorage-Zugriffe in mehreren Dateien
- Potenzielle Synchronisationsprobleme zwischen Komponenten
- Redundante Code-Duplikation für State-Persistierung

**Betroffene Module:**
- `script-sidebar-manager.js` - Sidebar-Status
- `script-notes.js` - Notizen-Panel-Status
- `script-tips.js` - Tipps-Footer-Sichtbarkeit
- `script-theme.js` - Theme-Präferenz
- `script-preferences.js` - Diverse UI-Einstellungen
- `script-history.js` - Zeitformat-Präferenz

### Lösungsansatz

**Zentrale Zustandsverwaltung mit Observer-Pattern:**

#### 1. Neues Modul: `script-state-manager.js`

```javascript
// ============================================================================
// SCRIPT-STATE-MANAGER.JS
// Zentrale Zustandsverwaltung mit Observer-Pattern und Persistierung
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'STATE-MGR';
    
    // ===== ZENTRALER APPLICATION STATE =====
    window.AppState = {
        ui: {
            sidebarOpen: false,
            sidebarActive: null,  // 'navigation', 'history', null
            notesOpen: false,
            tipsVisible: true,
            menuOpen: false
        },
        preferences: {
            theme: 'system',
            detailLevel: 1,
            timeFormat: 'relative',  // 'relative' oder 'absolute'
            mediaLayer: 'standard',
            contrastEnhanced: false
        },
        content: {
            currentSection: null,
            scrollPosition: 0
        }
    };
    
    // ===== OBSERVER SUBSCRIBERS =====
    const subscribers = new Map();
    
    /**
     * Subscribe to state changes
     * @param {string} path - Dot-notation path (e.g., 'ui.sidebarOpen')
     * @param {Function} callback - Called when state changes
     * @returns {Function} Unsubscribe function
     */
    window.AppState.subscribe = function(path, callback) {
        if (!subscribers.has(path)) {
            subscribers.set(path, new Set());
        }
        
        subscribers.get(path).add(callback);
        
        LOG(MODULE, `Subscribed to state path: ${path}`);
        
        // Return unsubscribe function
        return () => {
            subscribers.get(path)?.delete(callback);
            LOG(MODULE, `Unsubscribed from state path: ${path}`);
        };
    };
    
    /**
     * Update state and notify subscribers
     * @param {string} path - Dot-notation path
     * @param {*} value - New value
     */
    window.AppState.update = function(path, value) {
        const keys = path.split('.');
        let current = window.AppState;
        
        // Navigate to target
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        
        // Update value
        const oldValue = current[keys[keys.length - 1]];
        current[keys[keys.length - 1]] = value;
        
        LOG(MODULE, `State updated: ${path}`, { oldValue, newValue: value });
        
        // Notify subscribers
        notifySubscribers(path, value, oldValue);
        
        // Persist to localStorage (debounced)
        debouncedPersist();
    };
    
    /**
     * Get state value
     * @param {string} path - Dot-notation path
     * @returns {*} State value
     */
    window.AppState.get = function(path) {
        const keys = path.split('.');
        let current = window.AppState;
        
        for (const key of keys) {
            current = current[key];
            if (current === undefined) return undefined;
        }
        
        return current;
    };
    
    // ===== INTERNAL FUNCTIONS =====
    
    function notifySubscribers(path, newValue, oldValue) {
        const pathSubscribers = subscribers.get(path);
        
        if (pathSubscribers && pathSubscribers.size > 0) {
            pathSubscribers.forEach(callback => {
                try {
                    callback(newValue, oldValue);
                } catch (error) {
                    LOG.error(MODULE, `Subscriber callback error for ${path}`, error);
                }
            });
            
            LOG(MODULE, `Notified ${pathSubscribers.size} subscriber(s) for: ${path}`);
        }
    }
    
    // ===== PERSISTENCE =====
    
    const STORAGE_KEY = 'axiom-app-state';
    let persistTimeout = null;
    
    function debouncedPersist() {
        clearTimeout(persistTimeout);
        persistTimeout = setTimeout(persistState, 500);
    }
    
    function persistState() {
        try {
            const stateToPersist = {
                ui: window.AppState.ui,
                preferences: window.AppState.preferences
                // content wird nicht persistiert (Session-basiert)
            };
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
            LOG(MODULE, 'State persisted to localStorage');
        } catch (error) {
            LOG.error(MODULE, 'Failed to persist state', error);
        }
    }
    
    function loadPersistedState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            
            if (saved) {
                const parsed = JSON.parse(saved);
                
                // Merge mit default state
                Object.assign(window.AppState.ui, parsed.ui || {});
                Object.assign(window.AppState.preferences, parsed.preferences || {});
                
                LOG.success(MODULE, 'State loaded from localStorage', parsed);
                return true;
            }
        } catch (error) {
            LOG.error(MODULE, 'Failed to load persisted state', error);
        }
        
        return false;
    }
    
    // ===== INITIALIZATION =====
    
    function initStateManager() {
        LOG(MODULE, 'Initializing state manager...');
        
        // Load persisted state
        loadPersistedState();
        
        // Apply initial state to DOM
        applyInitialState();
        
        LOG.success(MODULE, 'State manager initialized', window.AppState);
    }
    
    function applyInitialState() {
        // Theme anwenden
        if (window.AppState.preferences.theme !== 'system') {
            document.documentElement.setAttribute('data-theme', window.AppState.preferences.theme);
        }
        
        // Tips-Footer Sichtbarkeit
        if (!window.AppState.ui.tipsVisible) {
            document.body.classList.add('tips-hidden');
        }
        
        LOG(MODULE, 'Initial state applied to DOM');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStateManager);
    } else {
        initStateManager();
    }
    
    LOG(MODULE, 'State manager module loaded');
    
})();
```

#### 2. Migration bestehender Module

**Beispiel: `script-sidebar-manager.js` Migration**

```javascript
// VORHER (alt):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    localStorage.setItem('axiom-sidebar-active', sidebarId);
}

// NACHHER (neu):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    AppState.update('ui.sidebarActive', sidebarId);
    AppState.update('ui.sidebarOpen', true);
}

// Subscribe to changes from other modules
AppState.subscribe('ui.sidebarActive', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        // Update DOM accordingly
        updateSidebarDOM(newValue);
    }
});
```

**Beispiel: `script-theme.js` Migration**

```javascript
// Subscribe to theme changes
AppState.subscribe('preferences.theme', (newTheme) => {
    applyTheme(newTheme);
    updateThemeIcon(newTheme);
});

// Update theme
function cycleTheme() {
    const currentTheme = AppState.get('preferences.theme');
    const nextTheme = getNextTheme(currentTheme);
    AppState.update('preferences.theme', nextTheme);
}
```

### Implementierungsschritte

1. **Phase 1: Grundgerüst** (1-2 Stunden)
   - Erstellen von `script-state-manager.js`
   - Integration in `index.html` (vor allen anderen Modulen!)
   - Tests der Basis-Funktionalität

2. **Phase 2: Migration Kern-Module** (2-3 Stunden)
   - `script-theme.js` migrieren
   - `script-sidebar-manager.js` migrieren
   - `script-tips.js` migrieren

3. **Phase 3: Migration restliche Module** (2-3 Stunden)
   - `script-notes.js` migrieren
   - `script-preferences.js` migrieren
   - `script-history.js` (Zeitformat) migrieren

4. **Phase 4: Testing & Cleanup** (1-2 Stunden)
   - Cross-Module-Tests
   - Alte localStorage-Aufrufe entfernen
   - Dokumentation aktualisieren

**Gesamt-Aufwand:** ca. 6-10 Stunden

### Vorteile nach Umsetzung

✅ **Zentrale Kontrolle:** Ein Ort für alle UI-Zustände  
✅ **Konsistenz:** Keine Race Conditions mehr  
✅ **Debugging:** Alle State-Changes geloggt an einem Ort  
✅ **Erweiterbarkeit:** Neue Features einfach in State integrieren  
✅ **Performance:** Reduzierte localStorage-Zugriffe durch Debouncing  
✅ **Testbarkeit:** State-Logic isoliert testbar

---

## 🎓 Verbesserungsvorschlag 3: Kontextbezogene Tooltips & Onboarding

### Problembeschreibung

**Aktueller Zustand:**
- Viele Features ohne direkte Erklärung
- Tipps-Footer ist generisch, nicht kontextbezogen
- Neue Nutzer müssen Features selbst entdecken
- Keine geführte Einführung in die Funktionalität

**User Experience Probleme:**
- Hohe Lernkurve für Erstnutzer
- Features werden möglicherweise nicht entdeckt
- Keine Hilfe bei komplexeren Funktionen (Detail-Level, Sidebar-System)

### Lösungsansatz

**Zweistufiges System:**
1. **Permanente Tooltips** - Hover-Hilfe für alle UI-Elemente
2. **Einmaliger Onboarding-Guide** - Schritt-für-Schritt bei Erstbesuch

#### 1. Tooltip-System

**Neues Modul: `script-tooltips.js`**

```javascript
// ============================================================================
// SCRIPT-TOOLTIPS.JS
// Kontextbezogene Tooltips für UI-Elemente
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'TOOLTIPS';
    
    // ===== TOOLTIP CONTAINER =====
    let tooltipElement = null;
    
    function createTooltipElement() {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'app-tooltip';
        tooltipElement.setAttribute('role', 'tooltip');
        tooltipElement.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tooltipElement);
    }
    
    // ===== TOOLTIP ANZEIGE =====
    
    function showTooltip(targetElement, text) {
        if (!tooltipElement || !text) return;
        
        tooltipElement.textContent = text;
        tooltipElement.setAttribute('aria-hidden', 'false');
        
        // Position berechnen
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        
        // Viewport-Check
        if (top < 10) {
            top = rect.bottom + 8; // Unterhalb anzeigen
            tooltipElement.classList.add('tooltip-bottom');
        } else {
            tooltipElement.classList.remove('tooltip-bottom');
        }
        
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
        tooltipElement.classList.add('visible');
    }
    
    function hideTooltip() {
        if (!tooltipElement) return;
        
        tooltipElement.classList.remove('visible');
        tooltipElement.setAttribute('aria-hidden', 'true');
    }
    
    // ===== EVENT HANDLERS =====
    
    function handleMouseEnter(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleMouseLeave(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        hideTooltip();
    }
    
    function handleFocus(event) {
        const target = event.target;
        if (!target.hasAttribute('data-tooltip')) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleBlur() {
        hideTooltip();
    }
    
    // ===== INITIALIZATION =====
    
    function initTooltips() {
        LOG(MODULE, 'Initializing tooltip system...');
        
        createTooltipElement();
        
        // Event-Delegation für alle Tooltips
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);
        document.addEventListener('focus', handleFocus, true);
        document.addEventListener('blur', handleBlur, true);
        
        LOG.success(MODULE, 'Tooltip system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }
    
    LOG(MODULE, 'Tooltips module loaded');
    
})();
```

**CSS für Tooltips:**

```css
/* ===== TOOLTIP SYSTEM ===== */
.app-tooltip {
    position: fixed;
    background-color: var(--color-text-primary);
    color: var(--color-surface-elevated);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.9em;
    line-height: 1.4;
    max-width: 250px;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 4px 12px var(--color-shadow-strong);
}

.app-tooltip.visible {
    opacity: 1;
    transform: translateY(0);
}

.app-tooltip.tooltip-bottom {
    transform: translateY(4px);
}

.app-tooltip.tooltip-bottom.visible {
    transform: translateY(0);
}

/* Tooltip-Pfeil (optional) */
.app-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: var(--color-text-primary);
}

.app-tooltip.tooltip-bottom::before {
    bottom: auto;
    top: 100%;
    border-bottom-color: transparent;
    border-top-color: var(--color-text-primary);
}

/* Accessibility: Tooltips bei prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
    .app-tooltip {
        transition: none;
    }
}
```

**HTML-Markup (Beispiele):**

```html
<!-- Hamburger Menu -->
<button id="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen">
    ☰
</button>

<!-- Detail-Level Buttons -->
<button class="detail-btn-mini" 
        data-level="1"
        data-tooltip="Ebene 1: Nur die wichtigsten Informationen"
        aria-pressed="true">
    1
</button>

<!-- Sidebar Toggle -->
<button id="toggle-nav-sidebar-btn" 
        data-tooltip="Zeigt oder versteckt die Navigations-Sidebar"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<!-- Theme Toggle -->
<button id="toggle-theme" 
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata"
        role="menuitem">
    Theme: <span id="current-theme">System</span>
</button>
```

#### 2. Onboarding-Guide

**Neues Modul: `script-onboarding.js`**

```javascript
// ============================================================================
// SCRIPT-ONBOARDING.JS
// Einmaliger Onboarding-Guide für Erstnutzer
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'ONBOARDING';
    
    // ===== ONBOARDING STEPS =====
    const ONBOARDING_STEPS = [
        {
            target: '#menu-toggle',
            title: 'Willkommen! 👋',
            message: 'Hier finden Sie alle wichtigen Einstellungen und Funktionen.',
            position: 'bottom'
        },
        {
            target: '.detail-controls',
            title: 'Detailtiefe anpassen',
            message: 'Wählen Sie zwischen drei Detailstufen: Basis, Standard oder Vollständig.',
            position: 'bottom'
        },
        {
            target: '#toggle-nav-sidebar-btn',
            title: 'Navigation-Sidebar',
            message: 'Öffnen Sie die Sidebar für schnelle Navigation durch den Leitfaden.',
            action: () => {
                document.getElementById('toggle-nav-sidebar-btn')?.click();
            }
        },
        {
            target: '.notes-toggle',
            title: 'Notizen machen',
            message: 'Halten Sie wichtige Informationen direkt im Leitfaden fest.',
            position: 'left'
        },
        {
            target: '#toggle-theme',
            title: 'Theme wählen',
            message: 'Passen Sie das Farbschema an Ihre Vorlieben an.',
            position: 'bottom'
        }
    ];
    
    // ===== STATE =====
    let currentStep = 0;
    let onboardingActive = false;
    let overlayElement = null;
    let highlightElement = null;
    let tooltipElement = null;
    
    // ===== ONBOARDING UI =====
    
    function createOnboardingElements() {
        // Overlay
        overlayElement = document.createElement('div');
        overlayElement.className = 'onboarding-overlay';
        overlayElement.setAttribute('aria-hidden', 'true');
        
        // Highlight
        highlightElement = document.createElement('div');
        highlightElement.className = 'onboarding-highlight';
        
        // Tooltip
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'onboarding-tooltip';
        tooltipElement.innerHTML = `
            <div class="onboarding-header">
                <h3 class="onboarding-title"></h3>
                <button class="onboarding-skip" aria-label="Tour überspringen">×</button>
            </div>
            <p class="onboarding-message"></p>
            <div class="onboarding-footer">
                <span class="onboarding-progress"></span>
                <div class="onboarding-buttons">
                    <button class="onboarding-prev">Zurück</button>
                    <button class="onboarding-next">Weiter</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlayElement);
        document.body.appendChild(highlightElement);
        document.body.appendChild(tooltipElement);
    }
    
    function showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= ONBOARDING_STEPS.length) {
            endOnboarding();
            return;
        }
        
        currentStep = stepIndex;
        const step = ONBOARDING_STEPS[stepIndex];
        
        // Target Element finden
        const targetElement = document.querySelector(step.target);
        if (!targetElement) {
            LOG.warn(MODULE, `Target not found: ${step.target}, skipping step`);
            showStep(stepIndex + 1);
            return;
        }
        
        // Highlight positionieren
        const rect = targetElement.getBoundingClientRect();
        highlightElement.style.top = `${rect.top - 8}px`;
        highlightElement.style.left = `${rect.left - 8}px`;
        highlightElement.style.width = `${rect.width + 16}px`;
        highlightElement.style.height = `${rect.height + 16}px`;
        
        // Tooltip aktualisieren
        tooltipElement.querySelector('.onboarding-title').textContent = step.title;
        tooltipElement.querySelector('.onboarding-message').textContent = step.message;
        tooltipElement.querySelector('.onboarding-progress').textContent = 
            `Schritt ${stepIndex + 1} von ${ONBOARDING_STEPS.length}`;
        
        // Tooltip positionieren
        positionTooltip(targetElement, step.position || 'right');
        
        // Navigation Buttons
        const prevBtn = tooltipElement.querySelector('.onboarding-prev');
        const nextBtn = tooltipElement.querySelector('.onboarding-next');
        
        prevBtn.disabled = stepIndex === 0;
        nextBtn.textContent = stepIndex === ONBOARDING_STEPS.length - 1 ? 'Fertig' : 'Weiter';
        
        // Aktion ausführen (falls vorhanden)
        if (step.action && typeof step.action === 'function') {
            setTimeout(() => step.action(), 300);
        }
        
        // Elemente anzeigen
        overlayElement.classList.add('visible');
        highlightElement.classList.add('visible');
        tooltipElement.classList.add('visible');
        
        LOG(MODULE, `Showing step ${stepIndex + 1}/${ONBOARDING_STEPS.length}`);
    }
    
    function positionTooltip(targetElement, position) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top, left;
        
        switch(position) {
            case 'bottom':
                top = rect.bottom + 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'top':
                top = rect.top - tooltipRect.height - 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left - tooltipRect.width - 16;
                break;
            case 'right':
            default:
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + 16;
                break;
        }
        
        // Viewport boundaries
        if (top < 10) top = 10;
        if (left < 10) left = 10;
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = window.innerHeight - tooltipRect.height - 10;
        }
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }
    
    function endOnboarding() {
        onboardingActive = false;
        
        overlayElement?.classList.remove('visible');
        highlightElement?.classList.remove('visible');
        tooltipElement?.classList.remove('visible');
        
        // Markiere Onboarding als abgeschlossen
        localStorage.setItem('axiom-onboarding-completed', 'true');
        
        LOG.success(MODULE, 'Onboarding completed');
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Skip Button
        tooltipElement.querySelector('.onboarding-skip').addEventListener('click', () => {
            endOnboarding();
        });
        
        // Previous Button
        tooltipElement.querySelector('.onboarding-prev').addEventListener('click', () => {
            showStep(currentStep - 1);
        });
        
        // Next Button
        tooltipElement.querySelector('.onboarding-next').addEventListener('click', () => {
            showStep(currentStep + 1);
        });
        
        // ESC zum Abbrechen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && onboardingActive) {
                endOnboarding();
            }
        });
    }
    
    // ===== PUBLIC API =====
    
    window.startOnboarding = function() {
        if (onboardingActive) return;
        
        onboardingActive = true;
        currentStep = 0;
        
        if (!overlayElement) {
            createOnboardingElements();
            setupEventHandlers();
        }
        
        showStep(0);
        
        LOG(MODULE, 'Onboarding started');
    };
    
    // ===== INITIALIZATION =====
    
    function initOnboarding() {
        LOG(MODULE, 'Initializing onboarding system...');
        
        // Check if onboarding already completed
        const completed = localStorage.getItem('axiom-onboarding-completed');
        
        if (!completed) {
            // Start onboarding nach kurzer Verzögerung
            setTimeout(() => {
                window.startOnboarding();
            }, 1000);
        } else {
            LOG(MODULE, 'Onboarding already completed, skipping');
        }
        
        LOG.success(MODULE, 'Onboarding system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOnboarding);
    } else {
        initOnboarding();
    }
    
    LOG(MODULE, 'Onboarding module loaded');
    
})();
```

**CSS für Onboarding:**

```css
/* ===== ONBOARDING SYSTEM ===== */

/* Overlay - verdunkelt den Hintergrund */
.onboarding-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.onboarding-overlay.visible {
    opacity: 1;
    pointer-events: auto;
}

/* Highlight - hebt das aktuelle Element hervor */
.onboarding-highlight {
    position: fixed;
    border: 3px solid var(--color-primary);
    border-radius: 8px;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7),
                0 0 20px var(--color-primary);
}

.onboarding-highlight.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip - zeigt die Anleitung */
.onboarding-tooltip {
    position: fixed;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    border-radius: 12px;
    padding: 0;
    max-width: 350px;
    z-index: 10000;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px var(--color-shadow-strong);
}

.onboarding-tooltip.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip Header */
.onboarding-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 15px;
    border-bottom: 2px solid var(--color-border);
}

.onboarding-title {
    margin: 0;
    font-size: 1.2em;
    color: var(--color-primary);
}

.onboarding-skip {
    background: none;
    border: none;
    font-size: 1.8em;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all var(--transition-fast);
}

.onboarding-skip:hover {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
}

/* Tooltip Message */
.onboarding-message {
    padding: 20px;
    margin: 0;
    line-height: 1.6;
}

/* Tooltip Footer */
.onboarding-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 20px;
    border-top: 2px solid var(--color-border);
}

.onboarding-progress {
    font-size: 0.9em;
    color: var(--color-text-secondary);
}

.onboarding-buttons {
    display: flex;
    gap: 10px;
}

.onboarding-prev,
.onboarding-next {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 0.95em;
    font-weight: 500;
    transition: all var(--transition-fast);
}

.onboarding-prev {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    border: 2px solid var(--color-border);
}

.onboarding-prev:hover:not(:disabled) {
    background-color: var(--color-border);
}

.onboarding-prev:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.onboarding-next {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
}

.onboarding-next:hover {
    background-color: var(--color-primary-hover);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    .onboarding-overlay,
    .onboarding-highlight,
    .onboarding-tooltip {
        transition: none;
    }
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .onboarding-tooltip {
        max-width: calc(100vw - 40px);
        left: 20px !important;
        right: 20px;
        bottom: 20px !important;
        top: auto !important;
    }
    
    .onboarding-highlight {
        border-width: 2px;
    }
}
```

### Integration in index.html

**Reihenfolge der Script-Einbindung:**

```html
<!-- Core & State (ZUERST!) -->
<script src="script-core.js"></script>
<script src="script-state-manager.js"></script>

<!-- Basis-Module -->
<script src="script-section-management.js"></script>
<script src="script-sidebar-manager.js"></script>
<script src="script-navigation.js"></script>
<script src="script-history.js"></script>
<script src="script-notes.js"></script>
<script src="script-detail-level.js"></script>
<script src="script-tips.js"></script>
<script src="script-theme.js"></script>
<script src="script-preferences.js"></script>

<!-- UI Enhancements (NEU!) -->
<script src="script-tooltips.js"></script>
<script src="script-onboarding.js"></script>

<!-- Initialisierung (ZULETZT!) -->
<script src="script-init.js"></script>
```

### HTML-Markup Erweiterungen

**Tooltips hinzufügen zu allen interaktiven Elementen:**

```html
<!-- Top Navigation -->
<button id="menu-toggle" 
        class="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen" 
        aria-expanded="false">
    ☰
</button>

<!-- Detail Controls -->
<div class="detail-controls" data-tooltip="Wählen Sie die gewünschte Detailtiefe des Leitfadens">
    <span class="detail-label">Detail:</span>
    <div class="detail-buttons">
        <button class="detail-btn-mini" 
                data-level="1"
                data-tooltip="Ebene 1: Nur die wichtigsten Informationen anzeigen"
                aria-pressed="true">1</button>
        <button class="detail-btn-mini" 
                data-level="2"
                data-tooltip="Ebene 2: Standard-Informationen mit zusätzlichen Details"
                aria-pressed="false">2</button>
        <button class="detail-btn-mini" 
                data-level="3"
                data-tooltip="Ebene 3: Alle verfügbaren Informationen anzeigen"
                aria-pressed="false">3</button>
    </div>
</div>

<!-- Notes Toggle -->
<button class="notes-toggle" 
        data-tooltip="Öffnet das Notizen-Panel für persönliche Anmerkungen"
        aria-label="Notizen öffnen/schließen">
    📝 Notizen
</button>

<!-- Menu Items -->
<button class="menu-item" 
        id="show-history-btn" 
        data-tooltip="Zeigt den Verlauf der besuchten Abschnitte"
        role="menuitem">
    <span class="menu-icon">📜</span>
    Verlauf ein/aus
</button>

<button class="menu-item" 
        id="toggle-nav-sidebar-btn"
        data-tooltip="Öffnet die Navigation für schnellen Zugriff auf alle Abschnitte"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<button class="menu-item" 
        id="toggle-tips-footer-btn"
        data-tooltip="Blendet die Tipps am unteren Bildschirmrand ein oder aus"
        role="menuitem">
    <span class="menu-icon">💡</span>
    Tipps ein/aus
</button>

<button class="menu-item" 
        id="toggle-theme"
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata (Hell, Dunkel, Hochkontrast)"
        role="menuitem">
    <div class="theme-icon">...</div>
    Theme: <span id="current-theme">System</span>
</button>
```

### Implementierungsschritte

**Phase 1: Tooltip-System** (2-3 Stunden)
1. `script-tooltips.js` erstellen
2. CSS für Tooltips in `styles.css` einfügen
3. `data-tooltip` Attribute in `index.html` ergänzen
4. Testing auf Desktop & Mobile

**Phase 2: Onboarding-Guide** (3-4 Stunden)
1. `script-onboarding.js` erstellen
2. CSS für Onboarding in `styles.css` einfügen
3. Onboarding-Steps definieren und testen
4. Edge Cases behandeln (fehlende Targets, etc.)

**Phase 3: Feintuning** (1-2 Stunden)
1. Tooltip-Texte verfeinern und vereinheitlichen
2. Onboarding-Flow optimieren
3. Accessibility-Tests durchführen
4. Mobile-Optimierung validieren

**Gesamt-Aufwand:** ca. 6-9 Stunden

### Erweiterungsmöglichkeiten

**Optionale Features für später:**

1. **Onboarding zurücksetzen:**
   ```javascript
   // Im Menü einen "Hilfe-Tour starten" Button hinzufügen
   <button class="menu-item" onclick="resetOnboarding()">
       <span class="menu-icon">❓</span>
       Hilfe-Tour starten
   </button>
   
   function resetOnboarding() {
       localStorage.removeItem('axiom-onboarding-completed');
       window.startOnboarding();
   }
   ```

2. **Kontext-sensitive Tooltips:**
   ```javascript
   // Tooltips, die sich basierend auf aktuellem State ändern
   <button data-tooltip-active="Sidebar ist geöffnet" 
           data-tooltip-inactive="Sidebar öffnen">
   ```

3. **Video-Tutorials in Tooltips:**
   ```javascript
   // Erweiterte Tooltips mit eingebetteten Demos
   data-tooltip-video="demo-sidebar.mp4"
   ```

4. **Tooltip-Übersetzungen:**
   ```javascript
   // i18n Support für mehrsprachige Tooltips
   data-tooltip-key="tooltip.sidebar.open"
   ```

### Vorteile nach Umsetzung

✅ **Reduzierte Lernkurve:** Neue Nutzer verstehen Features sofort  
✅ **Bessere Discoveryability:** Versteckte Features werden gefunden  
✅ **Kontextbezogene Hilfe:** Hilfe genau dort, wo sie benötigt wird  
✅ **Einmalige Einführung:** Onboarding nur beim ersten Besuch  
✅ **Barrierefrei:** Tooltips per Tastatur & Screen Reader zugänglich  
✅ **Wartbar:** Tooltip-Texte zentral in HTML verwaltet

---

## 📋 Priorisierung & Roadmap

### Empfohlene Umsetzungsreihenfolge

**Sprint 1 (Woche 1):**
- ✅ Verbesserungsvorschlag 1: State Management
  - Tag 1-2: Grundgerüst erstellen
  - Tag 3-4: Kern-Module migrieren
  - Tag 5: Testing & Cleanup

**Sprint 2 (Woche 2):**
- ✅ Verbesserungsvorschlag 3: Tooltip-System
  - Tag 1-2: Tooltip-System implementieren
  - Tag 3: HTML-Markup erweitern
  - Tag 4-5: Testing & Feintuning

**Sprint 3 (Woche 3):**
- ✅ Verbesserungsvorschlag 3: Onboarding-Guide
  - Tag 1-2: Onboarding-System implementieren
  - Tag 3: Onboarding-Flow definieren
  - Tag 4-5: Testing & Optimierung

### Abhängigkeiten

```
State Management (V1)
    ↓
    ├── Tooltips verwenden AppState für Preferences
    └── Onboarding verwendet AppState für Tracking
```

**Wichtig:** State Management sollte **zuerst** implementiert werden, da die anderen Features davon profitieren können (z.B. Onboarding-Status im AppState speichern).

---

## 🧪 Testing-Checkliste

### State Management Testing

- [ ] State-Updates werden korrekt persistiert
- [ ] Subscribers werden bei Änderungen benachrichtigt
- [ ] Cross-Module State-Synchronisation funktioniert
- [ ] LocalStorage-Fallback bei Quota-Überschreitung
- [ ] State-Reset bei Fehler funktioniert

### Tooltip Testing

- [ ] Tooltips erscheinen bei Hover
- [ ] Tooltips erscheinen bei Keyboard-Focus
- [ ] Tooltips passen sich an Viewport-Grenzen an
- [ ] Screen Reader liest Tooltips korrekt vor
- [ ] Mobile Touch-Tooltips funktionieren
- [ ] Tooltips verschwinden korrekt bei Blur/Leave

### Onboarding Testing

- [ ] Onboarding startet nur beim ersten Besuch
- [ ] Alle Steps werden korrekt angezeigt
- [ ] Navigation (Vor/Zurück/Skip) funktioniert
- [ ] Highlight positioniert sich korrekt
- [ ] Aktionen werden ausgeführt (z.B. Sidebar öffnen)
- [ ] ESC-Taste bricht Onboarding ab
- [ ] Onboarding-Status wird persistiert
- [ ] Mobile-Ansicht funktioniert korrekt

---

## 📚 Dokumentation & Wartung

### Code-Dokumentation

Alle neuen Module sollten folgende Dokumentation enthalten:

```javascript
/**
 * SCRIPT-MODULE-NAME.JS
 * 
 * Beschreibung: [Was macht das Modul?]
 * 
 * Abhängigkeiten:
 * - script-core.js (Logging)
 * - script-state-manager.js (State)
 * 
 * Public API:
 * - window.functionName() - [Beschreibung]
 * 
 * Events:
 * - Emittiert: [welche Events]
 * - Hört auf: [welche Events]
 * 
 * LocalStorage Keys:
 * - key-name: [Beschreibung]
 */
```

### Update-Guide für Team

**Wenn neue UI-Elemente hinzugefügt werden:**

1. Tooltip hinzufügen:
   ```html
   <button data-tooltip="Beschreibung der Funktion">...</button>
   ```

2. Bei Bedarf in Onboarding aufnehmen:
   ```javascript
   // In script-onboarding.js
   ONBOARDING_STEPS.push({
       target: '#new-element',
       title: 'Neues Feature',
       message: 'Beschreibung...'
   });
   ```

3. State-Integration (falls zustandsbehaftet):
   ```javascript
   // State definieren
   AppState.ui.newFeature = false;
   
   // Subscribe to changes
   AppState.subscribe('ui.newFeature', (value) => {
       // React to change
   });
   ```

---

## 🔄 Migration & Rollback

### Migration von Alt zu Neu

**Sicherer Migrations-Prozess:**

1. **Backup erstellen:**
   ```bash
   # Alle relevanten Dateien sichern
   cp script-sidebar-manager.js script-sidebar-manager.js.backup
   cp script-theme.js script-theme.js.backup
   # etc.
   ```

2. **Feature-Flag einführen:**
   ```javascript
   // In script-core.js
   window.BUILD_INFO.useNewStateManager = true; // Kann zum Rollback auf false gesetzt werden
   ```

3. **Schrittweise Migration:**
   - Ein Modul nach dem anderen migrieren
   - Nach jedem Modul vollständig testen
   - Bei Problemen: Feature-Flag auf false setzen

4. **Alte Code-Pfade beibehalten:**
   ```javascript
   if (window.BUILD_INFO.useNewStateManager && window.AppState) {
       // Neuer Code-Pfad
       AppState.update('ui.sidebarOpen', true);
   } else {
       // Alter Code-Pfad (Fallback)
       localStorage.setItem('sidebar-open', 'true');
   }
   ```

### Rollback-Strategie

Falls nach Deployment Probleme auftreten:

1. **Sofort-Rollback:**
   ```javascript
   // In script-core.js
   window.BUILD_INFO.useNewStateManager = false;
   ```

2. **Vollständiger Rollback:**
   ```bash
   # Backup-Dateien wiederherstellen
   cp script-sidebar-manager.js.backup script-sidebar-manager.js
   # State-Manager deaktivieren
   # <!-- <script src="script-state-manager.js"></script> -->
   ```

3. **Daten-Migration:**
   ```javascript
   // Falls neue State-Struktur inkompatibel ist
   function migrateOldToNewState() {
       const oldData = localStorage.getItem('old-key');
       if (oldData) {
           AppState.update('new.path', oldData);
           localStorage.removeItem('old-key');
       }
   }
   ```

---

## 💡 Best Practices

### State Management

- **Immer über AppState.update() ändern**, nie direkt
- **Subscribe-Functions aufräumen** wenn Komponente unmounted
- **Debouncing nutzen** für häufige Updates
- **Validation** vor State-Updates durchführen

### Tooltips

- **Kurz und präzise** formulieren (max. 1-2 Sätze)
- **Aktionsorientiert** schreiben ("Öffnet..." statt "Hier können Sie...")
- **Konsistente Terminologie** verwenden
- **Accessibility** beachten (aria-label zusätzlich)

### Onboarding

- **Nicht zu viele Steps** (max. 5-7)
- **Wichtigste Features zuerst** zeigen
- **Überspringen ermöglichen** (ESC + Skip-Button)
- **Auf allen Breakpoints testen**

---

## 📊 Success Metrics

### KPIs nach Implementierung messen

**State Management:**
- ✅ Reduzierte Bug-Reports zu State-Inkonsistenzen
- ✅ Kürzere Entwicklungszeit für neue Features
- ✅ Weniger localStorage-Zugriffe (Performance)

**Tooltips & Onboarding:**
- ✅ Reduzierte Support-Anfragen zu "Wie funktioniert...?"
- ✅ Höhere Feature-Nutzung (Tracking via Analytics)
- ✅ Schnellere Time-to-Value für neue Nutzer

### Tracking implementieren (optional)

```javascript
// In script-onboarding.js
function trackOnboardingStep(stepIndex) {
    if (window.analytics) {
        window.analytics.track('Onboarding Step', {
            step: stepIndex,
            stepName: ONBOARDING_STEPS[stepIndex].title
        });
    }
}

// In script-tooltips.js  
function trackTooltipView(tooltipText) {
    if (window.analytics) {
        window.analytics.track('Tooltip Viewed', {
            content: tooltipText
        });
    }
}
```

---

## ✅ Abschluss-Checkliste

### Vor Deployment prüfen:

**Code-Qualität:**
- [ ] Alle Module sind dokumentiert
- [ ] Logging ist konsistent implementiert
- [ ] Error-Handling ist vorhanden
- [ ] Code ist reviewt und getestet

**Funktionalität:**
- [ ] Alle Features funktionieren wie spezifiziert
- [ ] Cross-Browser-Tests durchgeführt
- [ ] Mobile-Tests durchgeführt
- [ ] Accessibility-Tests durchgeführt

**Performance:**
- [ ] Keine Memory Leaks
- [ ] LocalStorage-Quota wird nicht überschritten
- [ ] Keine unnötigen Re-Renders/Updates

**Dokumentation:**
- [ ] README aktualisiert
- [ ] Changelog erstellt
- [ ] Team ist geschult
- [ ] Rollback-Plan vorhanden

---

## 📞 Support & Weitere Hilfe

Bei Fragen oder Problemen während der Implementierung:

1. **Konsole prüfen:** Debug-Logs aktivieren (`BUILD_INFO.debugMode = true`)
2. **State inspizieren:** `console.log(AppState)` in Browser-Console
3. **Module einzeln testen:** Features isoliert aktivieren/deaktivieren
4. **Rollback nutzen:** Bei kritischen Problemen sofort zurückrollen

---

**Ende des Dokuments**  
*Letzte Aktualisierung: 04. Oktober 2025*
````

**artifacts**

*Request*

````javascript
{
  "id": "improvement-proposals",
  "command": "update",
  "new_str": "---\n\n## 🎯 Verbesserungsvorschlag 4: Strikte CSS/HTML/JavaScript-Trennung\n\n**Priorität:** 🔴 Sehr hoch  \n**Aufwand:** 4-6 Stunden  \n**Status:** Zur sofortigen Umsetzung empfohlen\n\n### Problembeschreibung\n\n**Aktueller Zustand:**\nIm aktuellen Code finden sich an mehreren Stellen Verstöße gegen das Prinzip der Trennung von Concerns:\n\n1. **Inline-Styles in HTML:**\n   ```html\n   <!-- PROBLEM: Inline-Styles -->\n   <button style=\"flex: 1; padding: 8px; font-size: 0.9em;\">...</button>\n   <hr style=\"margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;\">\n   ```\n\n2. **CSS-Manipulation in JavaScript:**\n   ```javascript\n   // PROBLEM: Direkte Style-Manipulation\n   element.style.display = 'none';\n   element.style.opacity = '0.4';\n   highlightElement.style.top = `${rect.top}px`;\n   ```\n\n**Probleme:**\n- ❌ **Wartbarkeit:** CSS-Änderungen erfordern Änderungen in HTML/JS\n- ❌ **Konsistenz:** Gleiche Styles mehrfach definiert\n- ❌ **Theme-Support:** Inline-Styles ignorieren CSS-Variablen\n- ❌ **Wiederverwendbarkeit:** Code-Duplikation\n- ❌ **Testing:** Schwierig zu testen ohne DOM\n\n### Lösungsansatz\n\n**Prinzipien:**\n1. **HTML:** Nur semantische Struktur und CSS-Klassen\n2. **CSS:** Alle visuellen Aspekte, Layouts und Animationen\n3. **JavaScript:** Nur Klassen hinzufügen/entfernen, keine Styles setzen\n\n#### 1. Inline-Styles zu CSS-Klassen migrieren\n\n**VORHER (index.html):**\n```html\n<button id=\"time-format-toggle\"\n        class=\"btn-secondary\"\n        style=\"flex: 1; padding: 8px; font-size: 0.9em; color: var(--color-text-secondary);\">\n    🕐 Zeit: Relativ\n</button>\n\n<hr style=\"margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;\">\n```\n\n**NACHHER (index.html):**\n```html\n<button id=\"time-format-toggle\"\n        class=\"btn-secondary btn-flex\">\n    🕐 Zeit: Relativ\n</button>\n\n<hr class=\"menu-separator\">\n```\n\n**NACHHER (styles.css):**\n```css\n/* Wiederverwendbare Utility-Klasse */\n.btn-flex {\n    flex: 1;\n}\n\n/* Semantische Komponenten-Klasse */\n.menu-separator {\n    margin: 5px 0;\n    border: none;\n    border-top: 1px solid var(--color-border);\n    transition: border-color var(--transition-medium);\n}\n```\n\n#### 2. JavaScript Style-Manipulation zu CSS-Klassen\n\n**VORHER (JavaScript):**\n```javascript\nfunction showElement(element) {\n    element.style.display = 'block';\n    element.style.opacity = '1';\n}\n\nfunction hideElement(element) {\n    element.style.display = 'none';\n    element.style.opacity = '0';\n}\n\nfunction positionTooltip(element, x, y) {\n    element.style.top = `${y}px`;\n    element.style.left = `${x}px`;\n}\n```\n\n**NACHHER (JavaScript):**\n```javascript\nfunction showElement(element) {\n    element.classList.remove('hidden');\n    element.classList.add('visible');\n}\n\nfunction hideElement(element) {\n    element.classList.add('hidden');\n    element.classList.remove('visible');\n}\n\nfunction positionTooltip(element, x, y) {\n    // CSS Custom Properties für dynamische Werte\n    element.style.setProperty('--tooltip-x', `${x}px`);\n    element.style.setProperty('--tooltip-y', `${y}px`);\n}\n```\n\n**NACHHER (styles.css):**\n```css\n.element {\n    display: none;\n    opacity: 0;\n    transition: opacity var(--transition-medium);\n}\n\n.element.visible {\n    display: block;\n    opacity: 1;\n}\n\n.tooltip {\n    position: fixed;\n    top: var(--tooltip-y, 0);\n    left: var(--tooltip-x, 0);\n}\n```\n\n#### 3. State-basierte CSS-Klassen\n\n**Konzept: Data-Attributes für States**\n\n```html\n<!-- State über data-attribute steuern -->\n<div class=\"sidebar-container\" data-state=\"closed\" data-active-sidebar=\"none\">\n    <!-- Content -->\n</div>\n```\n\n```css\n/* CSS reagiert auf State */\n.sidebar-container[data-state=\"closed\"] {\n    transform: translateX(-100%);\n}\n\n.sidebar-container[data-state=\"open\"] {\n    transform: translateX(0);\n}\n\n.sidebar-container[data-active-sidebar=\"navigation\"] .sidebar-navigation {\n    display: flex;\n}\n\n.sidebar-container[data-active-sidebar=\"history\"] .sidebar-history {\n    display: flex;\n}\n```\n\n```javascript\n// JavaScript ändert nur Attribute\nfunction openSidebar(sidebarId) {\n    const container = document.querySelector('.sidebar-container');\n    container.setAttribute('data-state', 'open');\n    container.setAttribute('data-active-sidebar', sidebarId);\n}\n```\n\n### Implementierungs-Strategie\n\n**Phase 1: Audit (1 Stunde)**\n\nErstellen Sie eine Liste aller Verstöße:\n\n```bash\n# Inline-Styles in HTML finden\ngrep -n 'style=\"' index.html\n\n# Style-Manipulation in JS finden\ngrep -rn '\\.style\\.' script-*.js\n```\n\n**Phase 2: CSS-Klassen definieren (1-2 Stunden)**\n\nNeue Utility- und State-Klassen in `styles.css`:\n\n```css\n/* ===== UTILITY CLASSES ===== */\n.hidden {\n    display: none !important;\n}\n\n.visible {\n    display: block;\n}\n\n.flex-1 {\n    flex: 1;\n}\n\n.flex-center {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.text-center {\n    text-align: center;\n}\n\n/* ===== STATE CLASSES ===== */\n.is-active {\n    /* Wird von JS gesetzt für aktive Elemente */\n}\n\n.is-disabled {\n    opacity: 0.5;\n    pointer-events: none;\n}\n\n.is-loading {\n    cursor: wait;\n}\n\n.is-error {\n    border-color: var(--color-error);\n    background-color: var(--color-surface);\n}\n\n/* ===== ANIMATION STATES ===== */\n.fade-in {\n    animation: fadeIn var(--transition-medium) forwards;\n}\n\n.fade-out {\n    animation: fadeOut var(--transition-medium) forwards;\n}\n\n@keyframes fadeIn {\n    from { opacity: 0; }\n    to { opacity: 1; }\n}\n\n@keyframes fadeOut {\n    from { opacity: 1; }\n    to { opacity: 0; }\n}\n\n.slide-in-left {\n    animation: slideInLeft var(--transition-medium) forwards;\n}\n\n@keyframes slideInLeft {\n    from { transform: translateX(-100%); }\n    to { transform: translateX(0); }\n}\n```\n\n**Phase 3: Migration (2-3 Stunden)**\n\n1. **HTML bereinigen:**\n   - Alle `style=\"...\"` Attribute entfernen\n   - Durch CSS-Klassen ersetzen\n\n2. **JavaScript refactoren:**\n   - `element.style.xxx` durch `element.classList` ersetzen\n   - Nur für dynamische Positions-Werte CSS Custom Properties nutzen\n\n3. **Testen:**\n   - Visuelle Regression-Tests\n   - Funktionalität prüfen\n\n### Beispiel-Migration: Sidebar-Manager\n\n**VORHER:**\n```javascript\nfunction openSidebar(sidebarId) {\n    const container = document.getElementById('sidebar-container');\n    const sidebar = document.getElementById(`sidebar-${sidebarId}`);\n    \n    container.style.transform = 'translateX(0)';\n    container.style.display = 'flex';\n    \n    sidebar.style.display = 'flex';\n    sidebar.style.opacity = '1';\n}\n\nfunction closeSidebar() {\n    const container = document.getElementById('sidebar-container');\n    container.style.transform = 'translateX(-100%)';\n    \n    setTimeout(() => {\n        container.style.display = 'none';\n    }, 300);\n}\n```\n\n**NACHHER:**\n```javascript\nfunction openSidebar(sidebarId) {\n    const container = document.getElementById('sidebar-container');\n    const sidebar = document.getElementById(`sidebar-${sidebarId}`);\n    \n    // Nur Klassen manipulieren\n    container.classList.add('open');\n    container.classList.remove('closed');\n    \n    sidebar.classList.add('active');\n    sidebar.classList.remove('inactive');\n    \n    // Oder: Data-Attribute für komplexere States\n    container.setAttribute('data-state', 'open');\n    container.setAttribute('data-active', sidebarId);\n}\n\nfunction closeSidebar() {\n    const container = document.getElementById('sidebar-container');\n    \n    container.classList.remove('open');\n    container.classList.add('closed');\n    container.setAttribute('data-state', 'closed');\n    \n    // CSS transition handled timing automatisch\n}\n```\n\n**CSS (styles.css):**\n```css\n.sidebar-container {\n    transform: translateX(-100%);\n    display: none;\n    transition: transform var(--transition-medium);\n}\n\n.sidebar-container.open {\n    display: flex;\n    transform: translateX(0);\n}\n\n.sidebar-container.closed {\n    transform: translateX(-100%);\n}\n\n/* Sidebar wird nach Transition ausgeblendet */\n.sidebar-container.closed {\n    transition: transform var(--transition-medium),\n                display 0s var(--transition-medium);\n}\n```\n\n### Code-Konventionen\n\n**Erlaubte Ausnahmen für `element.style`:**\n\nNur in diesen Fällen darf JavaScript Styles direkt setzen:\n\n1. **Dynamische Positionierung (nicht im Voraus bekannt):**\n   ```javascript\n   // OK: Position basiert auf Maus/Scroll-Position\n   tooltip.style.setProperty('--dynamic-x', `${mouseX}px`);\n   tooltip.style.setProperty('--dynamic-y', `${mouseY}px`);\n   ```\n\n2. **Gemessene Dimensionen:**\n   ```javascript\n   // OK: Höhe basiert auf Content\n   const height = calculateDynamicHeight();\n   element.style.setProperty('--calculated-height', `${height}px`);\n   ```\n\n3. **Performance-kritische Animationen:**\n   ```javascript\n   // OK: 60fps-Animation via requestAnimationFrame\n   function animate() {\n       const progress = calculateProgress();\n       element.style.transform = `translateX(${progress}px)`;\n       requestAnimationFrame(animate);\n   }\n   ```\n\n**Verboten:**\n\n```javascript\n// ❌ NICHT erlaubt\nelement.style.display = 'none';\nelement.style.color = 'red';\nelement.style.fontSize = '16px';\nelement.style.padding = '10px';\n\n// ✅ Stattdessen\nelement.classList.add('hidden');\nelement.classList.add('text-error');\nelement.classList.add('text-large');\nelement.classList.add('padding-medium');\n```\n\n### Vorteile nach Umsetzung\n\n✅ **Wartbarkeit:** Alle Styles zentral in CSS  \n✅ **Konsistenz:** Keine Style-Duplikation  \n✅ **Theme-Support:** CSS-Variablen funktionieren überall  \n✅ **Performance:** Browser kann CSS-Klassen besser optimieren  \n✅ **Testing:** JS-Tests ohne DOM-Rendering möglich  \n✅ **Wiederverwendbarkeit:** Utility-Klassen mehrfach nutzbar\n\n---\n\n## 📑 Verbesserungsvorschlag 5: Favorites/Lesezeichen-Sidebar\n\n**Priorität:** 🟠 Hoch  \n**Aufwand:** 6-8 Stunden  \n**Status:** Zeitnah umsetzen\n\n### Feature-Beschreibung\n\nEine neue Sidebar für Favoriten/Lesezeichen, die:\n- Unterhalb des Verlaufs positioniert ist\n- Per Stern-Button in der Navigation gesetzt werden\n- Im localStorage persistiert werden\n- Nach Alter/letzter Nutzung sortiert sind\n- Eine Suchfunktion mit Levenshtein-Distanz bietet\n\n### Architektur\n\n#### 1. Datenstruktur\n\n```javascript\n// Favoriten-Datenmodell\nconst FavoriteItem = {\n    id: 'section-step2',           // Section-ID\n    title: 'Schritt 2: Datenauswahl', // Section-Titel\n    addedAt: 1696424123456,        // Timestamp: Hinzugefügt\n    lastUsed: 1696424567890,       // Timestamp: Zuletzt benutzt\n    useCount: 5,                    // Wie oft benutzt\n    notes: ''                       // Optionale Notiz (zukünftig)\n};\n\n// Im localStorage:\n{\n    'axiom-favorites': [\n        { id: 'intro', title: 'Überblick', addedAt: ..., lastUsed: ..., useCount: 3 },\n        { id: 'step1', title: 'Export starten', addedAt: ..., lastUsed: ..., useCount: 7 },\n        // ...\n    ]\n}\n```\n\n#### 2. HTML-Struktur\n\n**In index.html nach History-Sidebar einfügen:**\n\n```html\n<!-- FAVORITES SIDEBAR -->\n<div id=\"sidebar-favorites\" class=\"sidebar-wrapper sidebar-favorites\">\n    <div class=\"sidebar-tab\">\n        <div class=\"sidebar-tab-header\">\n            <button class=\"sidebar-tab-button\" \n                    data-sidebar=\"favorites\"\n                    aria-expanded=\"false\"\n                    aria-controls=\"favorites-content\">\n                <span class=\"sidebar-tab-icon\">⭐</span>\n                <span class=\"sidebar-tab-text\">Favoriten</span>\n            </button>\n            \n            <button class=\"sidebar-close-btn\"\n                    aria-label=\"Favoriten schließen\"\n                    data-sidebar=\"favorites\">\n                ✕\n            </button>\n        </div>\n        \n        <div class=\"sidebar-tab-body\" id=\"favorites-content\">\n            <!-- Subheader: Suchfeld -->\n            <div class=\"sidebar-subheader\">\n                <div class=\"favorites-search\">\n                    <input type=\"text\" \n                           id=\"favorites-search-input\"\n                           class=\"favorites-search-input\"\n                           placeholder=\"Favoriten durchsuchen...\"\n                           aria-label=\"Favoriten durchsuchen\">\n                    <button id=\"favorites-search-clear\" \n                            class=\"favorites-search-clear hidden\"\n                            aria-label=\"Suche löschen\">\n                        ✕\n                    </button>\n                </div>\n            </div>\n            \n            <!-- Body: Favoriten-Liste -->\n            <div class=\"sidebar-body\">\n                <div id=\"favorites-list\" class=\"favorites-list\">\n                    <!-- Wird von JavaScript gefüllt -->\n                </div>\n                <div id=\"favorites-empty\" class=\"favorites-empty\">\n                    <p>Noch keine Favoriten</p>\n                    <p class=\"favorites-empty-hint\">\n                        Klicken Sie auf ⭐ neben einem Abschnitt, um ihn zu favorisieren.\n                    </p>\n                </div>\n            </div>\n            \n            <!-- Footer: Sortierung & Löschen -->\n            <div class=\"sidebar-footer\">\n                <div class=\"favorites-controls\">\n                    <select id=\"favorites-sort\" \n                            class=\"favorites-sort-select\"\n                            aria-label=\"Sortierung wählen\">\n                        <option value=\"last-used\">Zuletzt verwendet</option>\n                        <option value=\"most-used\">Häufig verwendet</option>\n                        <option value=\"alphabetical\">Alphabetisch</option>\n                        <option value=\"date-added\">Hinzugefügt</option>\n                    </select>\n                    \n                    <button id=\"clear-favorites-btn\"\n                            class=\"btn-secondary btn-secondary-destructive\"\n                            aria-label=\"Alle Favoriten löschen\">\n                        🗑️ Alle löschen\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n```\n\n**Stern-Button in Navigation hinzufügen:**\n\n```html\n<!-- In jeder Section, neben der Überschrift -->\n<section class=\"content-section\" data-section=\"intro\" data-title=\"Überblick\">\n    <div class=\"section-header\">\n        <h2 id=\"intro\">Überblick</h2>\n        <button class=\"favorite-toggle\" \n                data-section=\"intro\"\n                aria-label=\"Als Favorit markieren\"\n                aria-pressed=\"false\">\n            <span class=\"favorite-icon\">☆</span>\n        </button>\n    </div>\n    <!-- Rest der Section -->\n</section>\n```\n\n#### 3. CSS-Styling\n\n```css\n/* ===== FAVORITES SIDEBAR ===== */\n\n/* Section Header mit Favoriten-Button */\n.section-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: 15px;\n}\n\n.favorite-toggle {\n    background: none;\n    border: 2px solid var(--color-border);\n    padding: 6px 12px;\n    border-radius: 6px;\n    cursor: pointer;\n    font-size: 1.2em;\n    transition: all var(--transition-fast);\n    color: var(--color-text-secondary);\n}\n\n.favorite-toggle:hover {\n    border-color: var(--color-warning);\n    color: var(--color-warning);\n    transform: scale(1.1);\n}\n\n.favorite-toggle[aria-pressed=\"true\"] {\n    background-color: var(--color-warning);\n    border-color: var(--color-warning);\n    color: var(--color-warning-text);\n}\n\n.favorite-toggle[aria-pressed=\"true\"] .favorite-icon::before {\n    content: '⭐';\n}\n\n.favorite-toggle[aria-pressed=\"false\"] .favorite-icon::before {\n    content: '☆';\n}\n\n/* Suchfeld */\n.favorites-search {\n    position: relative;\n    width: 100%;\n}\n\n.favorites-search-input {\n    width: 100%;\n    padding: 10px 35px 10px 12px;\n    border: 2px solid var(--color-border);\n    border-radius: 6px;\n    font-size: 0.95em;\n    background-color: var(--color-surface-elevated);\n    color: var(--color-text-primary);\n    transition: all var(--transition-fast);\n}\n\n.favorites-search-input:focus {\n    outline: none;\n    border-color: var(--color-border-strong);\n    box-shadow: 0 0 0 3px var(--color-focus);\n}\n\n.favorites-search-clear {\n    position: absolute;\n    right: 8px;\n    top: 50%;\n    transform: translateY(-50%);\n    background: none;\n    border: none;\n    font-size: 1.2em;\n    color: var(--color-text-secondary);\n    cursor: pointer;\n    padding: 4px;\n    border-radius: 4px;\n    transition: all var(--transition-fast);\n}\n\n.favorites-search-clear:hover {\n    background-color: var(--color-surface);\n    color: var(--color-text-primary);\n}\n\n/* Favoriten-Liste */\n.favorites-list {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n}\n\n.favorite-item {\n    padding: 12px;\n    background-color: var(--color-surface);\n    border-left: 4px solid var(--color-warning);\n    border-radius: 6px;\n    cursor: pointer;\n    transition: all var(--transition-fast);\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n.favorite-item:hover {\n    background-color: var(--color-surface-elevated);\n    border-left-width: 6px;\n    transform: translateX(2px);\n}\n\n.favorite-item-content {\n    flex: 1;\n}\n\n.favorite-item-title {\n    font-weight: 600;\n    color: var(--color-text-primary);\n    margin-bottom: 4px;\n}\n\n.favorite-item-meta {\n    font-size: 0.85em;\n    color: var(--color-text-secondary);\n    display: flex;\n    gap: 12px;\n}\n\n.favorite-item-meta-item {\n    display: flex;\n    align-items: center;\n    gap: 4px;\n}\n\n.favorite-item-actions {\n    display: flex;\n    gap: 4px;\n}\n\n.favorite-item-remove {\n    background: none;\n    border: none;\n    color: var(--color-text-secondary);\n    cursor: pointer;\n    padding: 4px 8px;\n    border-radius: 4px;\n    font-size: 1.1em;\n    transition: all var(--transition-fast);\n}\n\n.favorite-item-remove:hover {\n    background-color: var(--color-error);\n    color: var(--color-surface-elevated);\n}\n\n/* Empty State */\n.favorites-empty {\n    text-align: center;\n    padding: 40px 20px;\n    color: var(--color-text-disabled);\n}\n\n.favorites-empty p {\n    margin-bottom: 10px;\n}\n\n.favorites-empty-hint {\n    font-size: 0.9em;\n    font-style: italic;\n}\n\n/* Sortierung & Controls */\n.favorites-controls {\n    display: flex;\n    gap: 10px;\n    align-items: center;\n}\n\n.favorites-sort-select {\n    flex: 1;\n    padding: 8px 12px;\n    border: 2px solid var(--color-border);\n    border-radius: 6px;\n    background-color: var(--color-surface-elevated);\n    color: var(--color-text-primary);\n    font-size: 0.9em;\n    cursor: pointer;\n    transition: all var(--transition-fast);\n}\n\n.favorites-sort-select:focus {\n    outline: none;\n    border-color: var(--color-border-strong);\n}\n\n/* Suchergebnis-Highlighting */\n.favorite-item.search-match {\n    animation: searchHighlight 0.5s ease;\n}\n\n@keyframes searchHighlight {\n    0%, 100% { background-color: var(--color-surface); }\n    50% { background-color: var(--color-warning); }\n}\n\n/* Levenshtein-Distanz Visualisierung */\n.favorite-item[data-search-distance=\"0\"] {\n    /* Exakte Übereinstimmung */\n    border-left-color: var(--color-success);\n}\n\n.favorite-item[data-search-distance=\"1\"],\n.favorite-item[data-search-distance=\"2\"] {\n    /* Nahe Übereinstimmung */\n    border-left-color: var(--color-warning);\n}\n\n.favorite-item[data-search-distance=\"3\"],\n.favorite-item[data-search-distance=\"4\"] {\n    /* Entfernte Übereinstimmung */\n    border-left-color: var(--color-info);\n    opacity: 0.8;\n}\n```\n\n#### 4. JavaScript-Modul\n\n**Neues Modul: `script-favorites.js`**\n\n```javascript\n// ============================================================================\n// SCRIPT-FAVORITES.JS\n// Favoriten/Lesezeichen-Management mit Levenshtein-Suche\n// ============================================================================\n\n(function() {\n    'use strict';\n    \n    const MODULE = 'FAVORITES';\n    \n    // ===== STATE =====\n    let favorites = [];\n    let currentSort = 'last-used';\n    let searchQuery = '';\n    \n    // ===== DOM ELEMENTS =====\n    let favoritesList = null;\n    let favoritesEmpty = null;\n    let searchInput = null;\n    let searchClearBtn = null;\n    let sortSelect = null;\n    let clearAllBtn = null;\n    \n    // ===== LEVENSHTEIN DISTANCE =====\n    \n    /**\n     * Berechnet die Levenshtein-Distanz zwischen zwei Strings\n     * @param {string} a - Erster String\n     * @param {string} b - Zweiter String\n     * @returns {number} - Distanz (0 = identisch)\n     */\n    function levenshteinDistance(a, b) {\n        const an = a.length;\n        const bn = b.length;\n        \n        if (an === 0) return bn;\n        if (bn === 0) return an;\n        \n        const matrix = [];\n        \n        // Initialisiere erste Spalte\n        for (let i = 0; i <= bn; i++) {\n            matrix[i] = [i];\n        }\n        \n        // Initialisiere erste Zeile\n        for (let j = 0; j <= an; j++) {\n            matrix[0][j] = j;\n        }\n        \n        // Fülle Matrix\n        for (let i = 1; i <= bn; i++) {\n            for (let j = 1; j <= an; j++) {\n                if (b.charAt(i - 1) === a.charAt(j - 1)) {\n                    matrix[i][j] = matrix[i - 1][j - 1];\n                } else {\n                    matrix[i][j] = Math.min(\n                        matrix[i - 1][j - 1] + 1, // Substitution\n                        matrix[i][j - 1] + 1,      // Insertion\n                        matrix[i - 1][j] + 1       // Deletion\n                    );\n                }\n            }\n        }\n        \n        return matrix[bn][an];\n    }\n    \n    // ===== FAVORITES MANAGEMENT =====\n    \n    function loadFavorites() {\n        try {\n            const saved = localStorage.getItem('axiom-favorites');\n            favorites = saved ? JSON.parse(saved) : [];\n            LOG(MODULE, `Loaded ${favorites.length} favorites`);\n            return favorites;\n        } catch (error) {\n            LOG.error(MODULE, 'Failed to load favorites', error);\n            return [];\n        }\n    }\n    \n    function saveFavorites() {\n        try {\n            localStorage.setItem('axiom-favorites', JSON.stringify(favorites));\n            LOG(MODULE, 'Favorites saved');\n        } catch (error) {\n            LOG.error(MODULE, 'Failed to save favorites', error);\n        }\n    }\n    \n    function addFavorite(sectionId, sectionTitle) {\n        // Prüfe ob bereits vorhanden\n        const existing = favorites.find(f => f.id === sectionId);\n        if (existing) {\n            LOG.warn(MODULE, `Favorite already exists: ${sectionId}`);\n            return false;\n        }\n        \n        const favorite = {\n            id: sectionId,\n            title: sectionTitle,\n            addedAt: Date.now(),\n            lastUsed: Date.now(),\n            useCount: 0\n        };\n        \n        favorites.push(favorite);\n        saveFavorites();\n        renderFavorites();\n        updateFavoriteButtons();\n        \n        LOG.success(MODULE, `Adde",
  "version_uuid": "fe1b3c38-c88d-4f85-b585-0e13770b8ede"
}
````



## Prompt:
4.10.2025, 15:33:23

Weiter



## Response:
4.10.2025, 15:35:04



**Verbesserungsvorschläge für AXIOM Leitfaden** ∙ Version 5

````markdown
# Verbesserungsvorschläge für AXIOM Leitfaden

**Dokumentversion:** 1.0  
**Datum:** 04. Oktober 2025  
**Status:** Geplant / Zur Umsetzung vorgemerkt

---

## Übersicht

Dieses Dokument enthält detaillierte Verbesserungsvorschläge für den AXIOM Leitfaden, die nach Analyse der aktuellen Implementierung (Build 053) erarbeitet wurden.

**Prioritäten-Übersicht:**

### 🔴 Sehr hohe Priorität (Sofort umsetzen)
- ✅ **V1:** Einheitliche Zustandsverwaltung
- ✅ **V4:** Strikte Trennung: CSS / HTML / JavaScript
- ✅ **V9:** Animations- und Transitions-Harmonisierung

### 🟠 Hohe Priorität (Zeitnah umsetzen)
- ✅ **V3:** Tooltips & Onboarding-System
- ✅ **V5:** Favorites/Lesezeichen-Sidebar
- ✅ **V7:** "Don't tell; just show"-Modus

### 🟡 Mittlere Priorität (Geplant)
- ✅ **V6:** Glossar-Feature mit Hover-Tooltips
- ✅ **V8:** Agent FAQ-System & Feedback-Funktion

### ⏸️ Zurückgestellt
- ⏸️ **V2:** Progressive Enhancement (nicht benötigt für Corporate Environment)

---

## 🎯 Verbesserungsvorschlag 1: Einheitliche Zustandsverwaltung

### Problembeschreibung

**Aktueller Zustand:**
- Verschiedene Module verwalten ihre Zustände unabhängig
- Verstreute localStorage-Zugriffe in mehreren Dateien
- Potenzielle Synchronisationsprobleme zwischen Komponenten
- Redundante Code-Duplikation für State-Persistierung

**Betroffene Module:**
- `script-sidebar-manager.js` - Sidebar-Status
- `script-notes.js` - Notizen-Panel-Status
- `script-tips.js` - Tipps-Footer-Sichtbarkeit
- `script-theme.js` - Theme-Präferenz
- `script-preferences.js` - Diverse UI-Einstellungen
- `script-history.js` - Zeitformat-Präferenz

### Lösungsansatz

**Zentrale Zustandsverwaltung mit Observer-Pattern:**

#### 1. Neues Modul: `script-state-manager.js`

```javascript
// ============================================================================
// SCRIPT-STATE-MANAGER.JS
// Zentrale Zustandsverwaltung mit Observer-Pattern und Persistierung
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'STATE-MGR';
    
    // ===== ZENTRALER APPLICATION STATE =====
    window.AppState = {
        ui: {
            sidebarOpen: false,
            sidebarActive: null,  // 'navigation', 'history', null
            notesOpen: false,
            tipsVisible: true,
            menuOpen: false
        },
        preferences: {
            theme: 'system',
            detailLevel: 1,
            timeFormat: 'relative',  // 'relative' oder 'absolute'
            mediaLayer: 'standard',
            contrastEnhanced: false
        },
        content: {
            currentSection: null,
            scrollPosition: 0
        }
    };
    
    // ===== OBSERVER SUBSCRIBERS =====
    const subscribers = new Map();
    
    /**
     * Subscribe to state changes
     * @param {string} path - Dot-notation path (e.g., 'ui.sidebarOpen')
     * @param {Function} callback - Called when state changes
     * @returns {Function} Unsubscribe function
     */
    window.AppState.subscribe = function(path, callback) {
        if (!subscribers.has(path)) {
            subscribers.set(path, new Set());
        }
        
        subscribers.get(path).add(callback);
        
        LOG(MODULE, `Subscribed to state path: ${path}`);
        
        // Return unsubscribe function
        return () => {
            subscribers.get(path)?.delete(callback);
            LOG(MODULE, `Unsubscribed from state path: ${path}`);
        };
    };
    
    /**
     * Update state and notify subscribers
     * @param {string} path - Dot-notation path
     * @param {*} value - New value
     */
    window.AppState.update = function(path, value) {
        const keys = path.split('.');
        let current = window.AppState;
        
        // Navigate to target
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        
        // Update value
        const oldValue = current[keys[keys.length - 1]];
        current[keys[keys.length - 1]] = value;
        
        LOG(MODULE, `State updated: ${path}`, { oldValue, newValue: value });
        
        // Notify subscribers
        notifySubscribers(path, value, oldValue);
        
        // Persist to localStorage (debounced)
        debouncedPersist();
    };
    
    /**
     * Get state value
     * @param {string} path - Dot-notation path
     * @returns {*} State value
     */
    window.AppState.get = function(path) {
        const keys = path.split('.');
        let current = window.AppState;
        
        for (const key of keys) {
            current = current[key];
            if (current === undefined) return undefined;
        }
        
        return current;
    };
    
    // ===== INTERNAL FUNCTIONS =====
    
    function notifySubscribers(path, newValue, oldValue) {
        const pathSubscribers = subscribers.get(path);
        
        if (pathSubscribers && pathSubscribers.size > 0) {
            pathSubscribers.forEach(callback => {
                try {
                    callback(newValue, oldValue);
                } catch (error) {
                    LOG.error(MODULE, `Subscriber callback error for ${path}`, error);
                }
            });
            
            LOG(MODULE, `Notified ${pathSubscribers.size} subscriber(s) for: ${path}`);
        }
    }
    
    // ===== PERSISTENCE =====
    
    const STORAGE_KEY = 'axiom-app-state';
    let persistTimeout = null;
    
    function debouncedPersist() {
        clearTimeout(persistTimeout);
        persistTimeout = setTimeout(persistState, 500);
    }
    
    function persistState() {
        try {
            const stateToPersist = {
                ui: window.AppState.ui,
                preferences: window.AppState.preferences
                // content wird nicht persistiert (Session-basiert)
            };
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
            LOG(MODULE, 'State persisted to localStorage');
        } catch (error) {
            LOG.error(MODULE, 'Failed to persist state', error);
        }
    }
    
    function loadPersistedState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            
            if (saved) {
                const parsed = JSON.parse(saved);
                
                // Merge mit default state
                Object.assign(window.AppState.ui, parsed.ui || {});
                Object.assign(window.AppState.preferences, parsed.preferences || {});
                
                LOG.success(MODULE, 'State loaded from localStorage', parsed);
                return true;
            }
        } catch (error) {
            LOG.error(MODULE, 'Failed to load persisted state', error);
        }
        
        return false;
    }
    
    // ===== INITIALIZATION =====
    
    function initStateManager() {
        LOG(MODULE, 'Initializing state manager...');
        
        // Load persisted state
        loadPersistedState();
        
        // Apply initial state to DOM
        applyInitialState();
        
        LOG.success(MODULE, 'State manager initialized', window.AppState);
    }
    
    function applyInitialState() {
        // Theme anwenden
        if (window.AppState.preferences.theme !== 'system') {
            document.documentElement.setAttribute('data-theme', window.AppState.preferences.theme);
        }
        
        // Tips-Footer Sichtbarkeit
        if (!window.AppState.ui.tipsVisible) {
            document.body.classList.add('tips-hidden');
        }
        
        LOG(MODULE, 'Initial state applied to DOM');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStateManager);
    } else {
        initStateManager();
    }
    
    LOG(MODULE, 'State manager module loaded');
    
})();
```

#### 2. Migration bestehender Module

**Beispiel: `script-sidebar-manager.js` Migration**

```javascript
// VORHER (alt):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    localStorage.setItem('axiom-sidebar-active', sidebarId);
}

// NACHHER (neu):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    AppState.update('ui.sidebarActive', sidebarId);
    AppState.update('ui.sidebarOpen', true);
}

// Subscribe to changes from other modules
AppState.subscribe('ui.sidebarActive', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        // Update DOM accordingly
        updateSidebarDOM(newValue);
    }
});
```

**Beispiel: `script-theme.js` Migration**

```javascript
// Subscribe to theme changes
AppState.subscribe('preferences.theme', (newTheme) => {
    applyTheme(newTheme);
    updateThemeIcon(newTheme);
});

// Update theme
function cycleTheme() {
    const currentTheme = AppState.get('preferences.theme');
    const nextTheme = getNextTheme(currentTheme);
    AppState.update('preferences.theme', nextTheme);
}
```

### Implementierungsschritte

1. **Phase 1: Grundgerüst** (1-2 Stunden)
   - Erstellen von `script-state-manager.js`
   - Integration in `index.html` (vor allen anderen Modulen!)
   - Tests der Basis-Funktionalität

2. **Phase 2: Migration Kern-Module** (2-3 Stunden)
   - `script-theme.js` migrieren
   - `script-sidebar-manager.js` migrieren
   - `script-tips.js` migrieren

3. **Phase 3: Migration restliche Module** (2-3 Stunden)
   - `script-notes.js` migrieren
   - `script-preferences.js` migrieren
   - `script-history.js` (Zeitformat) migrieren

4. **Phase 4: Testing & Cleanup** (1-2 Stunden)
   - Cross-Module-Tests
   - Alte localStorage-Aufrufe entfernen
   - Dokumentation aktualisieren

**Gesamt-Aufwand:** ca. 6-10 Stunden

### Vorteile nach Umsetzung

✅ **Zentrale Kontrolle:** Ein Ort für alle UI-Zustände  
✅ **Konsistenz:** Keine Race Conditions mehr  
✅ **Debugging:** Alle State-Changes geloggt an einem Ort  
✅ **Erweiterbarkeit:** Neue Features einfach in State integrieren  
✅ **Performance:** Reduzierte localStorage-Zugriffe durch Debouncing  
✅ **Testbarkeit:** State-Logic isoliert testbar

---

## 🎓 Verbesserungsvorschlag 3: Kontextbezogene Tooltips & Onboarding

### Problembeschreibung

**Aktueller Zustand:**
- Viele Features ohne direkte Erklärung
- Tipps-Footer ist generisch, nicht kontextbezogen
- Neue Nutzer müssen Features selbst entdecken
- Keine geführte Einführung in die Funktionalität

**User Experience Probleme:**
- Hohe Lernkurve für Erstnutzer
- Features werden möglicherweise nicht entdeckt
- Keine Hilfe bei komplexeren Funktionen (Detail-Level, Sidebar-System)

### Lösungsansatz

**Zweistufiges System:**
1. **Permanente Tooltips** - Hover-Hilfe für alle UI-Elemente
2. **Einmaliger Onboarding-Guide** - Schritt-für-Schritt bei Erstbesuch

#### 1. Tooltip-System

**Neues Modul: `script-tooltips.js`**

```javascript
// ============================================================================
// SCRIPT-TOOLTIPS.JS
// Kontextbezogene Tooltips für UI-Elemente
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'TOOLTIPS';
    
    // ===== TOOLTIP CONTAINER =====
    let tooltipElement = null;
    
    function createTooltipElement() {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'app-tooltip';
        tooltipElement.setAttribute('role', 'tooltip');
        tooltipElement.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tooltipElement);
    }
    
    // ===== TOOLTIP ANZEIGE =====
    
    function showTooltip(targetElement, text) {
        if (!tooltipElement || !text) return;
        
        tooltipElement.textContent = text;
        tooltipElement.setAttribute('aria-hidden', 'false');
        
        // Position berechnen
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        
        // Viewport-Check
        if (top < 10) {
            top = rect.bottom + 8; // Unterhalb anzeigen
            tooltipElement.classList.add('tooltip-bottom');
        } else {
            tooltipElement.classList.remove('tooltip-bottom');
        }
        
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
        tooltipElement.classList.add('visible');
    }
    
    function hideTooltip() {
        if (!tooltipElement) return;
        
        tooltipElement.classList.remove('visible');
        tooltipElement.setAttribute('aria-hidden', 'true');
    }
    
    // ===== EVENT HANDLERS =====
    
    function handleMouseEnter(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleMouseLeave(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        hideTooltip();
    }
    
    function handleFocus(event) {
        const target = event.target;
        if (!target.hasAttribute('data-tooltip')) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleBlur() {
        hideTooltip();
    }
    
    // ===== INITIALIZATION =====
    
    function initTooltips() {
        LOG(MODULE, 'Initializing tooltip system...');
        
        createTooltipElement();
        
        // Event-Delegation für alle Tooltips
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);
        document.addEventListener('focus', handleFocus, true);
        document.addEventListener('blur', handleBlur, true);
        
        LOG.success(MODULE, 'Tooltip system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }
    
    LOG(MODULE, 'Tooltips module loaded');
    
})();
```

**CSS für Tooltips:**

```css
/* ===== TOOLTIP SYSTEM ===== */
.app-tooltip {
    position: fixed;
    background-color: var(--color-text-primary);
    color: var(--color-surface-elevated);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.9em;
    line-height: 1.4;
    max-width: 250px;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 4px 12px var(--color-shadow-strong);
}

.app-tooltip.visible {
    opacity: 1;
    transform: translateY(0);
}

.app-tooltip.tooltip-bottom {
    transform: translateY(4px);
}

.app-tooltip.tooltip-bottom.visible {
    transform: translateY(0);
}

/* Tooltip-Pfeil (optional) */
.app-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: var(--color-text-primary);
}

.app-tooltip.tooltip-bottom::before {
    bottom: auto;
    top: 100%;
    border-bottom-color: transparent;
    border-top-color: var(--color-text-primary);
}

/* Accessibility: Tooltips bei prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
    .app-tooltip {
        transition: none;
    }
}
```

**HTML-Markup (Beispiele):**

```html
<!-- Hamburger Menu -->
<button id="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen">
    ☰
</button>

<!-- Detail-Level Buttons -->
<button class="detail-btn-mini" 
        data-level="1"
        data-tooltip="Ebene 1: Nur die wichtigsten Informationen"
        aria-pressed="true">
    1
</button>

<!-- Sidebar Toggle -->
<button id="toggle-nav-sidebar-btn" 
        data-tooltip="Zeigt oder versteckt die Navigations-Sidebar"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<!-- Theme Toggle -->
<button id="toggle-theme" 
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata"
        role="menuitem">
    Theme: <span id="current-theme">System</span>
</button>
```

#### 2. Onboarding-Guide

**Neues Modul: `script-onboarding.js`**

```javascript
// ============================================================================
// SCRIPT-ONBOARDING.JS
// Einmaliger Onboarding-Guide für Erstnutzer
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'ONBOARDING';
    
    // ===== ONBOARDING STEPS =====
    const ONBOARDING_STEPS = [
        {
            target: '#menu-toggle',
            title: 'Willkommen! 👋',
            message: 'Hier finden Sie alle wichtigen Einstellungen und Funktionen.',
            position: 'bottom'
        },
        {
            target: '.detail-controls',
            title: 'Detailtiefe anpassen',
            message: 'Wählen Sie zwischen drei Detailstufen: Basis, Standard oder Vollständig.',
            position: 'bottom'
        },
        {
            target: '#toggle-nav-sidebar-btn',
            title: 'Navigation-Sidebar',
            message: 'Öffnen Sie die Sidebar für schnelle Navigation durch den Leitfaden.',
            action: () => {
                document.getElementById('toggle-nav-sidebar-btn')?.click();
            }
        },
        {
            target: '.notes-toggle',
            title: 'Notizen machen',
            message: 'Halten Sie wichtige Informationen direkt im Leitfaden fest.',
            position: 'left'
        },
        {
            target: '#toggle-theme',
            title: 'Theme wählen',
            message: 'Passen Sie das Farbschema an Ihre Vorlieben an.',
            position: 'bottom'
        }
    ];
    
    // ===== STATE =====
    let currentStep = 0;
    let onboardingActive = false;
    let overlayElement = null;
    let highlightElement = null;
    let tooltipElement = null;
    
    // ===== ONBOARDING UI =====
    
    function createOnboardingElements() {
        // Overlay
        overlayElement = document.createElement('div');
        overlayElement.className = 'onboarding-overlay';
        overlayElement.setAttribute('aria-hidden', 'true');
        
        // Highlight
        highlightElement = document.createElement('div');
        highlightElement.className = 'onboarding-highlight';
        
        // Tooltip
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'onboarding-tooltip';
        tooltipElement.innerHTML = `
            <div class="onboarding-header">
                <h3 class="onboarding-title"></h3>
                <button class="onboarding-skip" aria-label="Tour überspringen">×</button>
            </div>
            <p class="onboarding-message"></p>
            <div class="onboarding-footer">
                <span class="onboarding-progress"></span>
                <div class="onboarding-buttons">
                    <button class="onboarding-prev">Zurück</button>
                    <button class="onboarding-next">Weiter</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlayElement);
        document.body.appendChild(highlightElement);
        document.body.appendChild(tooltipElement);
    }
    
    function showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= ONBOARDING_STEPS.length) {
            endOnboarding();
            return;
        }
        
        currentStep = stepIndex;
        const step = ONBOARDING_STEPS[stepIndex];
        
        // Target Element finden
        const targetElement = document.querySelector(step.target);
        if (!targetElement) {
            LOG.warn(MODULE, `Target not found: ${step.target}, skipping step`);
            showStep(stepIndex + 1);
            return;
        }
        
        // Highlight positionieren
        const rect = targetElement.getBoundingClientRect();
        highlightElement.style.top = `${rect.top - 8}px`;
        highlightElement.style.left = `${rect.left - 8}px`;
        highlightElement.style.width = `${rect.width + 16}px`;
        highlightElement.style.height = `${rect.height + 16}px`;
        
        // Tooltip aktualisieren
        tooltipElement.querySelector('.onboarding-title').textContent = step.title;
        tooltipElement.querySelector('.onboarding-message').textContent = step.message;
        tooltipElement.querySelector('.onboarding-progress').textContent = 
            `Schritt ${stepIndex + 1} von ${ONBOARDING_STEPS.length}`;
        
        // Tooltip positionieren
        positionTooltip(targetElement, step.position || 'right');
        
        // Navigation Buttons
        const prevBtn = tooltipElement.querySelector('.onboarding-prev');
        const nextBtn = tooltipElement.querySelector('.onboarding-next');
        
        prevBtn.disabled = stepIndex === 0;
        nextBtn.textContent = stepIndex === ONBOARDING_STEPS.length - 1 ? 'Fertig' : 'Weiter';
        
        // Aktion ausführen (falls vorhanden)
        if (step.action && typeof step.action === 'function') {
            setTimeout(() => step.action(), 300);
        }
        
        // Elemente anzeigen
        overlayElement.classList.add('visible');
        highlightElement.classList.add('visible');
        tooltipElement.classList.add('visible');
        
        LOG(MODULE, `Showing step ${stepIndex + 1}/${ONBOARDING_STEPS.length}`);
    }
    
    function positionTooltip(targetElement, position) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top, left;
        
        switch(position) {
            case 'bottom':
                top = rect.bottom + 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'top':
                top = rect.top - tooltipRect.height - 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left - tooltipRect.width - 16;
                break;
            case 'right':
            default:
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + 16;
                break;
        }
        
        // Viewport boundaries
        if (top < 10) top = 10;
        if (left < 10) left = 10;
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = window.innerHeight - tooltipRect.height - 10;
        }
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }
    
    function endOnboarding() {
        onboardingActive = false;
        
        overlayElement?.classList.remove('visible');
        highlightElement?.classList.remove('visible');
        tooltipElement?.classList.remove('visible');
        
        // Markiere Onboarding als abgeschlossen
        localStorage.setItem('axiom-onboarding-completed', 'true');
        
        LOG.success(MODULE, 'Onboarding completed');
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Skip Button
        tooltipElement.querySelector('.onboarding-skip').addEventListener('click', () => {
            endOnboarding();
        });
        
        // Previous Button
        tooltipElement.querySelector('.onboarding-prev').addEventListener('click', () => {
            showStep(currentStep - 1);
        });
        
        // Next Button
        tooltipElement.querySelector('.onboarding-next').addEventListener('click', () => {
            showStep(currentStep + 1);
        });
        
        // ESC zum Abbrechen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && onboardingActive) {
                endOnboarding();
            }
        });
    }
    
    // ===== PUBLIC API =====
    
    window.startOnboarding = function() {
        if (onboardingActive) return;
        
        onboardingActive = true;
        currentStep = 0;
        
        if (!overlayElement) {
            createOnboardingElements();
            setupEventHandlers();
        }
        
        showStep(0);
        
        LOG(MODULE, 'Onboarding started');
    };
    
    // ===== INITIALIZATION =====
    
    function initOnboarding() {
        LOG(MODULE, 'Initializing onboarding system...');
        
        // Check if onboarding already completed
        const completed = localStorage.getItem('axiom-onboarding-completed');
        
        if (!completed) {
            // Start onboarding nach kurzer Verzögerung
            setTimeout(() => {
                window.startOnboarding();
            }, 1000);
        } else {
            LOG(MODULE, 'Onboarding already completed, skipping');
        }
        
        LOG.success(MODULE, 'Onboarding system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOnboarding);
    } else {
        initOnboarding();
    }
    
    LOG(MODULE, 'Onboarding module loaded');
    
})();
```

**CSS für Onboarding:**

```css
/* ===== ONBOARDING SYSTEM ===== */

/* Overlay - verdunkelt den Hintergrund */
.onboarding-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.onboarding-overlay.visible {
    opacity: 1;
    pointer-events: auto;
}

/* Highlight - hebt das aktuelle Element hervor */
.onboarding-highlight {
    position: fixed;
    border: 3px solid var(--color-primary);
    border-radius: 8px;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7),
                0 0 20px var(--color-primary);
}

.onboarding-highlight.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip - zeigt die Anleitung */
.onboarding-tooltip {
    position: fixed;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    border-radius: 12px;
    padding: 0;
    max-width: 350px;
    z-index: 10000;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px var(--color-shadow-strong);
}

.onboarding-tooltip.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip Header */
.onboarding-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 15px;
    border-bottom: 2px solid var(--color-border);
}

.onboarding-title {
    margin: 0;
    font-size: 1.2em;
    color: var(--color-primary);
}

.onboarding-skip {
    background: none;
    border: none;
    font-size: 1.8em;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all var(--transition-fast);
}

.onboarding-skip:hover {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
}

/* Tooltip Message */
.onboarding-message {
    padding: 20px;
    margin: 0;
    line-height: 1.6;
}

/* Tooltip Footer */
.onboarding-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 20px;
    border-top: 2px solid var(--color-border);
}

.onboarding-progress {
    font-size: 0.9em;
    color: var(--color-text-secondary);
}

.onboarding-buttons {
    display: flex;
    gap: 10px;
}

.onboarding-prev,
.onboarding-next {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 0.95em;
    font-weight: 500;
    transition: all var(--transition-fast);
}

.onboarding-prev {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    border: 2px solid var(--color-border);
}

.onboarding-prev:hover:not(:disabled) {
    background-color: var(--color-border);
}

.onboarding-prev:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.onboarding-next {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
}

.onboarding-next:hover {
    background-color: var(--color-primary-hover);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    .onboarding-overlay,
    .onboarding-highlight,
    .onboarding-tooltip {
        transition: none;
    }
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .onboarding-tooltip {
        max-width: calc(100vw - 40px);
        left: 20px !important;
        right: 20px;
        bottom: 20px !important;
        top: auto !important;
    }
    
    .onboarding-highlight {
        border-width: 2px;
    }
}
```

### Integration in index.html

**Reihenfolge der Script-Einbindung:**

```html
<!-- Core & State (ZUERST!) -->
<script src="script-core.js"></script>
<script src="script-state-manager.js"></script>

<!-- Basis-Module -->
<script src="script-section-management.js"></script>
<script src="script-sidebar-manager.js"></script>
<script src="script-navigation.js"></script>
<script src="script-history.js"></script>
<script src="script-notes.js"></script>
<script src="script-detail-level.js"></script>
<script src="script-tips.js"></script>
<script src="script-theme.js"></script>
<script src="script-preferences.js"></script>

<!-- UI Enhancements (NEU!) -->
<script src="script-tooltips.js"></script>
<script src="script-onboarding.js"></script>

<!-- Initialisierung (ZULETZT!) -->
<script src="script-init.js"></script>
```

### HTML-Markup Erweiterungen

**Tooltips hinzufügen zu allen interaktiven Elementen:**

```html
<!-- Top Navigation -->
<button id="menu-toggle" 
        class="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen" 
        aria-expanded="false">
    ☰
</button>

<!-- Detail Controls -->
<div class="detail-controls" data-tooltip="Wählen Sie die gewünschte Detailtiefe des Leitfadens">
    <span class="detail-label">Detail:</span>
    <div class="detail-buttons">
        <button class="detail-btn-mini" 
                data-level="1"
                data-tooltip="Ebene 1: Nur die wichtigsten Informationen anzeigen"
                aria-pressed="true">1</button>
        <button class="detail-btn-mini" 
                data-level="2"
                data-tooltip="Ebene 2: Standard-Informationen mit zusätzlichen Details"
                aria-pressed="false">2</button>
        <button class="detail-btn-mini" 
                data-level="3"
                data-tooltip="Ebene 3: Alle verfügbaren Informationen anzeigen"
                aria-pressed="false">3</button>
    </div>
</div>

<!-- Notes Toggle -->
<button class="notes-toggle" 
        data-tooltip="Öffnet das Notizen-Panel für persönliche Anmerkungen"
        aria-label="Notizen öffnen/schließen">
    📝 Notizen
</button>

<!-- Menu Items -->
<button class="menu-item" 
        id="show-history-btn" 
        data-tooltip="Zeigt den Verlauf der besuchten Abschnitte"
        role="menuitem">
    <span class="menu-icon">📜</span>
    Verlauf ein/aus
</button>

<button class="menu-item" 
        id="toggle-nav-sidebar-btn"
        data-tooltip="Öffnet die Navigation für schnellen Zugriff auf alle Abschnitte"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<button class="menu-item" 
        id="toggle-tips-footer-btn"
        data-tooltip="Blendet die Tipps am unteren Bildschirmrand ein oder aus"
        role="menuitem">
    <span class="menu-icon">💡</span>
    Tipps ein/aus
</button>

<button class="menu-item" 
        id="toggle-theme"
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata (Hell, Dunkel, Hochkontrast)"
        role="menuitem">
    <div class="theme-icon">...</div>
    Theme: <span id="current-theme">System</span>
</button>
```

### Implementierungsschritte

**Phase 1: Tooltip-System** (2-3 Stunden)
1. `script-tooltips.js` erstellen
2. CSS für Tooltips in `styles.css` einfügen
3. `data-tooltip` Attribute in `index.html` ergänzen
4. Testing auf Desktop & Mobile

**Phase 2: Onboarding-Guide** (3-4 Stunden)
1. `script-onboarding.js` erstellen
2. CSS für Onboarding in `styles.css` einfügen
3. Onboarding-Steps definieren und testen
4. Edge Cases behandeln (fehlende Targets, etc.)

**Phase 3: Feintuning** (1-2 Stunden)
1. Tooltip-Texte verfeinern und vereinheitlichen
2. Onboarding-Flow optimieren
3. Accessibility-Tests durchführen
4. Mobile-Optimierung validieren

**Gesamt-Aufwand:** ca. 6-9 Stunden

### Erweiterungsmöglichkeiten

**Optionale Features für später:**

1. **Onboarding zurücksetzen:**
   ```javascript
   // Im Menü einen "Hilfe-Tour starten" Button hinzufügen
   <button class="menu-item" onclick="resetOnboarding()">
       <span class="menu-icon">❓</span>
       Hilfe-Tour starten
   </button>
   
   function resetOnboarding() {
       localStorage.removeItem('axiom-onboarding-completed');
       window.startOnboarding();
   }
   ```

2. **Kontext-sensitive Tooltips:**
   ```javascript
   // Tooltips, die sich basierend auf aktuellem State ändern
   <button data-tooltip-active="Sidebar ist geöffnet" 
           data-tooltip-inactive="Sidebar öffnen">
   ```

3. **Video-Tutorials in Tooltips:**
   ```javascript
   // Erweiterte Tooltips mit eingebetteten Demos
   data-tooltip-video="demo-sidebar.mp4"
   ```

4. **Tooltip-Übersetzungen:**
   ```javascript
   // i18n Support für mehrsprachige Tooltips
   data-tooltip-key="tooltip.sidebar.open"
   ```

### Vorteile nach Umsetzung

✅ **Reduzierte Lernkurve:** Neue Nutzer verstehen Features sofort  
✅ **Bessere Discoveryability:** Versteckte Features werden gefunden  
✅ **Kontextbezogene Hilfe:** Hilfe genau dort, wo sie benötigt wird  
✅ **Einmalige Einführung:** Onboarding nur beim ersten Besuch  
✅ **Barrierefrei:** Tooltips per Tastatur & Screen Reader zugänglich  
✅ **Wartbar:** Tooltip-Texte zentral in HTML verwaltet

---

## 📋 Priorisierung & Roadmap

### Empfohlene Umsetzungsreihenfolge

**Sprint 1 (Woche 1):**
- ✅ Verbesserungsvorschlag 1: State Management
  - Tag 1-2: Grundgerüst erstellen
  - Tag 3-4: Kern-Module migrieren
  - Tag 5: Testing & Cleanup

**Sprint 2 (Woche 2):**
- ✅ Verbesserungsvorschlag 3: Tooltip-System
  - Tag 1-2: Tooltip-System implementieren
  - Tag 3: HTML-Markup erweitern
  - Tag 4-5: Testing & Feintuning

**Sprint 3 (Woche 3):**
- ✅ Verbesserungsvorschlag 3: Onboarding-Guide
  - Tag 1-2: Onboarding-System implementieren
  - Tag 3: Onboarding-Flow definieren
  - Tag 4-5: Testing & Optimierung

### Abhängigkeiten

```
State Management (V1)
    ↓
    ├── Tooltips verwenden AppState für Preferences
    └── Onboarding verwendet AppState für Tracking
```

**Wichtig:** State Management sollte **zuerst** implementiert werden, da die anderen Features davon profitieren können (z.B. Onboarding-Status im AppState speichern).

---

## 🧪 Testing-Checkliste

### State Management Testing

- [ ] State-Updates werden korrekt persistiert
- [ ] Subscribers werden bei Änderungen benachrichtigt
- [ ] Cross-Module State-Synchronisation funktioniert
- [ ] LocalStorage-Fallback bei Quota-Überschreitung
- [ ] State-Reset bei Fehler funktioniert

### Tooltip Testing

- [ ] Tooltips erscheinen bei Hover
- [ ] Tooltips erscheinen bei Keyboard-Focus
- [ ] Tooltips passen sich an Viewport-Grenzen an
- [ ] Screen Reader liest Tooltips korrekt vor
- [ ] Mobile Touch-Tooltips funktionieren
- [ ] Tooltips verschwinden korrekt bei Blur/Leave

### Onboarding Testing

- [ ] Onboarding startet nur beim ersten Besuch
- [ ] Alle Steps werden korrekt angezeigt
- [ ] Navigation (Vor/Zurück/Skip) funktioniert
- [ ] Highlight positioniert sich korrekt
- [ ] Aktionen werden ausgeführt (z.B. Sidebar öffnen)
- [ ] ESC-Taste bricht Onboarding ab
- [ ] Onboarding-Status wird persistiert
- [ ] Mobile-Ansicht funktioniert korrekt

---

## 📚 Dokumentation & Wartung

### Code-Dokumentation

Alle neuen Module sollten folgende Dokumentation enthalten:

```javascript
/**
 * SCRIPT-MODULE-NAME.JS
 * 
 * Beschreibung: [Was macht das Modul?]
 * 
 * Abhängigkeiten:
 * - script-core.js (Logging)
 * - script-state-manager.js (State)
 * 
 * Public API:
 * - window.functionName() - [Beschreibung]
 * 
 * Events:
 * - Emittiert: [welche Events]
 * - Hört auf: [welche Events]
 * 
 * LocalStorage Keys:
 * - key-name: [Beschreibung]
 */
```

### Update-Guide für Team

**Wenn neue UI-Elemente hinzugefügt werden:**

1. Tooltip hinzufügen:
   ```html
   <button data-tooltip="Beschreibung der Funktion">...</button>
   ```

2. Bei Bedarf in Onboarding aufnehmen:
   ```javascript
   // In script-onboarding.js
   ONBOARDING_STEPS.push({
       target: '#new-element',
       title: 'Neues Feature',
       message: 'Beschreibung...'
   });
   ```

3. State-Integration (falls zustandsbehaftet):
   ```javascript
   // State definieren
   AppState.ui.newFeature = false;
   
   // Subscribe to changes
   AppState.subscribe('ui.newFeature', (value) => {
       // React to change
   });
   ```

---

## 🔄 Migration & Rollback

### Migration von Alt zu Neu

**Sicherer Migrations-Prozess:**

1. **Backup erstellen:**
   ```bash
   # Alle relevanten Dateien sichern
   cp script-sidebar-manager.js script-sidebar-manager.js.backup
   cp script-theme.js script-theme.js.backup
   # etc.
   ```

2. **Feature-Flag einführen:**
   ```javascript
   // In script-core.js
   window.BUILD_INFO.useNewStateManager = true; // Kann zum Rollback auf false gesetzt werden
   ```

3. **Schrittweise Migration:**
   - Ein Modul nach dem anderen migrieren
   - Nach jedem Modul vollständig testen
   - Bei Problemen: Feature-Flag auf false setzen

4. **Alte Code-Pfade beibehalten:**
   ```javascript
   if (window.BUILD_INFO.useNewStateManager && window.AppState) {
       // Neuer Code-Pfad
       AppState.update('ui.sidebarOpen', true);
   } else {
       // Alter Code-Pfad (Fallback)
       localStorage.setItem('sidebar-open', 'true');
   }
   ```

### Rollback-Strategie

Falls nach Deployment Probleme auftreten:

1. **Sofort-Rollback:**
   ```javascript
   // In script-core.js
   window.BUILD_INFO.useNewStateManager = false;
   ```

2. **Vollständiger Rollback:**
   ```bash
   # Backup-Dateien wiederherstellen
   cp script-sidebar-manager.js.backup script-sidebar-manager.js
   # State-Manager deaktivieren
   # <!-- <script src="script-state-manager.js"></script> -->
   ```

3. **Daten-Migration:**
   ```javascript
   // Falls neue State-Struktur inkompatibel ist
   function migrateOldToNewState() {
       const oldData = localStorage.getItem('old-key');
       if (oldData) {
           AppState.update('new.path', oldData);
           localStorage.removeItem('old-key');
       }
   }
   ```

---

## 💡 Best Practices

### State Management

- **Immer über AppState.update() ändern**, nie direkt
- **Subscribe-Functions aufräumen** wenn Komponente unmounted
- **Debouncing nutzen** für häufige Updates
- **Validation** vor State-Updates durchführen

### Tooltips

- **Kurz und präzise** formulieren (max. 1-2 Sätze)
- **Aktionsorientiert** schreiben ("Öffnet..." statt "Hier können Sie...")
- **Konsistente Terminologie** verwenden
- **Accessibility** beachten (aria-label zusätzlich)

### Onboarding

- **Nicht zu viele Steps** (max. 5-7)
- **Wichtigste Features zuerst** zeigen
- **Überspringen ermöglichen** (ESC + Skip-Button)
- **Auf allen Breakpoints testen**

---

## 📊 Success Metrics

### KPIs nach Implementierung messen

**State Management:**
- ✅ Reduzierte Bug-Reports zu State-Inkonsistenzen
- ✅ Kürzere Entwicklungszeit für neue Features
- ✅ Weniger localStorage-Zugriffe (Performance)

**Tooltips & Onboarding:**
- ✅ Reduzierte Support-Anfragen zu "Wie funktioniert...?"
- ✅ Höhere Feature-Nutzung (Tracking via Analytics)
- ✅ Schnellere Time-to-Value für neue Nutzer

### Tracking implementieren (optional)

```javascript
// In script-onboarding.js
function trackOnboardingStep(stepIndex) {
    if (window.analytics) {
        window.analytics.track('Onboarding Step', {
            step: stepIndex,
            stepName: ONBOARDING_STEPS[stepIndex].title
        });
    }
}

// In script-tooltips.js  
function trackTooltipView(tooltipText) {
    if (window.analytics) {
        window.analytics.track('Tooltip Viewed', {
            content: tooltipText
        });
    }
}
```

---

## ✅ Abschluss-Checkliste

### Vor Deployment prüfen:

**Code-Qualität:**
- [ ] Alle Module sind dokumentiert
- [ ] Logging ist konsistent implementiert
- [ ] Error-Handling ist vorhanden
- [ ] Code ist reviewt und getestet

**Funktionalität:**
- [ ] Alle Features funktionieren wie spezifiziert
- [ ] Cross-Browser-Tests durchgeführt
- [ ] Mobile-Tests durchgeführt
- [ ] Accessibility-Tests durchgeführt

**Performance:**
- [ ] Keine Memory Leaks
- [ ] LocalStorage-Quota wird nicht überschritten
- [ ] Keine unnötigen Re-Renders/Updates

**Dokumentation:**
- [ ] README aktualisiert
- [ ] Changelog erstellt
- [ ] Team ist geschult
- [ ] Rollback-Plan vorhanden

---

## 📞 Support & Weitere Hilfe

Bei Fragen oder Problemen während der Implementierung:

1. **Konsole prüfen:** Debug-Logs aktivieren (`BUILD_INFO.debugMode = true`)
2. **State inspizieren:** `console.log(AppState)` in Browser-Console
3. **Module einzeln testen:** Features isoliert aktivieren/deaktivieren
4. **Rollback nutzen:** Bei kritischen Problemen sofort zurückrollen

---

**Ende des Dokuments**  
*Letzte Aktualisierung: 04. Oktober 2025*
````



## Prompt:
4.10.2025, 15:35:23

Weiter



## Response:
4.10.2025, 15:37:10



**artifacts**

*Request*

````javascript
{
  "id": "improvement-proposals",
  "command": "update",
  "new_str": "        // Restlicher Text\n        if (lastIndex < text.length) {\n            const afterText = text.substring(lastIndex);\n            fragment.appendChild(document.createTextNode(afterText));\n        }\n        \n        // Ersetze Original-Textnode\n        parent.replaceChild(fragment, textNode);\n    }\n    \n    // ===== TOOLTIP-VERWALTUNG =====\n    \n    function createTooltipElement() {\n        tooltipElement = document.createElement('div');\n        tooltipElement.id = 'glossar-tooltip';\n        tooltipElement.className = 'glossar-tooltip';\n        tooltipElement.setAttribute('role', 'tooltip');\n        tooltipElement.setAttribute('aria-hidden', 'true');\n        \n        tooltipElement.innerHTML = `\n            <div class=\"glossar-tooltip-header\">\n                <h4 class=\"glossar-tooltip-title\"></h4>\n                <button class=\"glossar-tooltip-close\" aria-label=\"Glossar schließen\">✕</button>\n            </div>\n            <div class=\"glossar-tooltip-body\">\n                <div class=\"glossar-tooltip-image\"></div>\n                <p class=\"glossar-tooltip-text\"></p>\n            </div>\n            <div class=\"glossar-tooltip-footer\">\n                <a class=\"glossar-tooltip-link\" target=\"_blank\" rel=\"noopener noreferrer\">\n                    Mehr erfahren →\n                </a>\n            </div>\n        `;\n        \n        document.body.appendChild(tooltipElement);\n        \n        // Close Button Handler\n        tooltipElement.querySelector('.glossar-tooltip-close').addEventListener('click', () => {\n            hideTooltip();\n        });\n        \n        // Tooltip selbst sollte Hover erlauben\n        tooltipElement.addEventListener('mouseenter', () => {\n            clearTimeout(tooltipTimeout);\n        });\n        \n        tooltipElement.addEventListener('mouseleave', () => {\n            scheduleHideTooltip();\n        });\n    }\n    \n    function showTooltip(termElement) {\n        const termId = termElement.getAttribute('data-glossar-id');\n        const term = glossarTerms.find(t => t.id === termId);\n        \n        if (!term) {\n            LOG.error(MODULE, `Term not found: ${termId}`);\n            return;\n        }\n        \n        // Tooltip-Inhalt aktualisieren\n        updateTooltipContent(term);\n        \n        // Position berechnen\n        positionTooltip(termElement);\n        \n        // Anzeigen\n        tooltipElement.classList.add('visible');\n        tooltipElement.setAttribute('aria-hidden', 'false');\n        \n        activeTooltip = termElement;\n        \n        LOG(MODULE, `Showing tooltip: ${term.header}`);\n    }\n    \n    function updateTooltipContent(term) {\n        // Title\n        tooltipElement.querySelector('.glossar-tooltip-title').textContent = term.header;\n        \n        // Image\n        const imageContainer = tooltipElement.querySelector('.glossar-tooltip-image');\n        if (term.image) {\n            imageContainer.innerHTML = `<img src=\"${term.image}\" alt=\"${term.header}\">`;\n            imageContainer.classList.add('has-image');\n        } else {\n            imageContainer.innerHTML = '';\n            imageContainer.classList.remove('has-image');\n        }\n        \n        // Text (max 250 Zeichen)\n        let explanation = term.explanation;\n        if (explanation.length > 250) {\n            explanation = explanation.substring(0, 247) + '...';\n        }\n        tooltipElement.querySelector('.glossar-tooltip-text').textContent = explanation;\n        \n        // Link\n        const footer = tooltipElement.querySelector('.glossar-tooltip-footer');\n        const link = tooltipElement.querySelector('.glossar-tooltip-link');\n        if (term.link) {\n            link.href = term.link;\n            footer.classList.add('has-link');\n        } else {\n            footer.classList.remove('has-link');\n        }\n    }\n    \n    function positionTooltip(termElement) {\n        const rect = termElement.getBoundingClientRect();\n        const tooltipRect = tooltipElement.getBoundingClientRect();\n        \n        // Standardposition: Oberhalb des Terms\n        let top = rect.top - tooltipRect.height - 12;\n        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);\n        \n        // Viewport-Checks\n        if (top < 10) {\n            // Unterhalb anzeigen\n            top = rect.bottom + 12;\n        }\n        \n        if (left < 10) {\n            left = 10;\n        }\n        \n        if (left + tooltipRect.width > window.innerWidth - 10) {\n            left = window.innerWidth - tooltipRect.width - 10;\n        }\n        \n        tooltipElement.style.top = `${top}px`;\n        tooltipElement.style.left = `${left}px`;\n    }\n    \n    function hideTooltip() {\n        clearTimeout(tooltipTimeout);\n        \n        tooltipElement.classList.remove('visible');\n        tooltipElement.setAttribute('aria-hidden', 'true');\n        \n        activeTooltip = null;\n        \n        LOG(MODULE, 'Tooltip hidden');\n    }\n    \n    function scheduleHideTooltip() {\n        tooltipTimeout = setTimeout(() => {\n            hideTooltip();\n        }, 300); // 300ms Verzögerung\n    }\n    \n    // ===== EVENT HANDLERS =====\n    \n    function setupEventHandlers() {\n        // Hover auf Glossar-Terms\n        document.addEventListener('mouseenter', (e) => {\n            const term = e.target.closest('.glossar-term');\n            if (!term) return;\n            \n            clearTimeout(tooltipTimeout);\n            showTooltip(term);\n        }, true);\n        \n        document.addEventListener('mouseleave', (e) => {\n            const term = e.target.closest('.glossar-term');\n            if (!term) return;\n            \n            scheduleHideTooltip();\n        }, true);\n        \n        // Tastatur-Navigation\n        document.addEventListener('keydown', (e) => {\n            const term = e.target.closest('.glossar-term');\n            if (!term) return;\n            \n            if (e.key === 'Enter' || e.key === ' ') {\n                e.preventDefault();\n                showTooltip(term);\n            }\n            \n            if (e.key === 'Escape' && activeTooltip) {\n                hideTooltip();\n            }\n        });\n        \n        // Focus auf Glossar-Terms\n        document.addEventListener('focus', (e) => {\n            const term = e.target.closest('.glossar-term');\n            if (!term) return;\n            \n            showTooltip(term);\n        }, true);\n        \n        document.addEventListener('blur', (e) => {\n            const term = e.target.closest('.glossar-term');\n            if (!term) return;\n            \n            scheduleHideTooltip();\n        }, true);\n        \n        // Scroll-Listener für Viewport-Erkennung\n        let scrollTimeout;\n        window.addEventListener('scroll', () => {\n            clearTimeout(scrollTimeout);\n            scrollTimeout = setTimeout(() => {\n                processVisibleSections();\n            }, 150);\n        }, { passive: true });\n        \n        // Resize-Listener\n        window.addEventListener('resize', () => {\n            if (activeTooltip) {\n                positionTooltip(activeTooltip);\n            }\n        });\n    }\n    \n    // ===== INITIALIZATION =====\n    \n    async function initGlossar() {\n        LOG(MODULE, 'Initializing glossar system...');\n        \n        // Lade Glossar-Daten\n        const loaded = await loadGlossar();\n        if (!loaded) {\n            LOG.error(MODULE, 'Failed to initialize - glossar.json not loaded');\n            return;\n        }\n        \n        // Erstelle Tooltip-Element\n        createTooltipElement();\n        \n        // Verarbeite initial sichtbare Sections\n        processVisibleSections();\n        \n        // Setup Event Handlers\n        setupEventHandlers();\n        \n        LOG.success(MODULE, 'Glossar system initialized');\n    }\n    \n    // ===== PUBLIC API =====\n    \n    window.GlossarManager = {\n        reload: loadGlossar,\n        processSection: processSection,\n        refresh: processVisibleSections\n    };\n    \n    // ===== AUTO-INIT =====\n    \n    if (document.readyState === 'loading') {\n        document.addEventListener('DOMContentLoaded', initGlossar);\n    } else {\n        initGlossar();\n    }\n    \n    LOG(MODULE, 'Glossar module loaded');\n    \n})();\n```\n\n### Barrierefreiheit-Überlegungen\n\n**Umgesetzte Features:**\n- ✅ `tabindex=\"0\"` für Tastatur-Navigation\n- ✅ `role=\"button\"` für Screen Reader\n- ✅ `aria-label` mit Kontext\n- ✅ Enter/Space zum Öffnen, ESC zum Schließen\n- ✅ Focus-Events für Tastatur-Nutzer\n\n**Weitere Überlegungen:**\n- Live-Regions für dynamische Inhalte\n- ARIA-Beschreibungen für komplexe Tooltips\n- High Contrast Mode Support\n\n### Implementierungsschritte\n\n1. **Phase 1:** Glossar-JSON erstellen (2-3 Stunden)\n2. **Phase 2:** JavaScript-Modul entwickeln (4-5 Stunden)\n3. **Phase 3:** CSS-Styling implementieren (2-3 Stunden)\n4. **Phase 4:** Testing & Barrierefreiheit (2-3 Stunden)\n\n**Gesamt-Aufwand:** 10-14 Stunden\n\n---\n\n## 🎬 Verbesserungsvorschlag 7: \"Don't tell; just show\"-Modus\n\n**Priorität:** 🟠 Hoch  \n**Aufwand:** 3-4 Stunden  \n**Status:** Zeitnah umsetzen (Chef-Priorität!)\n\n### Feature-Beschreibung\n\nEin spezieller Anzeigemodus für Anwender, die:\n- Nur die praktischen Schritte sehen wollen\n- Keine theoretischen Erklärungen benötigen\n- Schnell zum Ziel kommen möchten\n\n**Verhalten:**\n- Im Standard-Modus: Normale Anzeige\n- Im \"Vollständig\"-Modus: Alle Inhalte sichtbar\n- Im \"Show-Only\"-Modus: Nur Anweisungen, keine Erklärungen\n\n### Architektur\n\n#### 1. HTML-Markup-Konvention\n\n**Neue Data-Attribute:**\n\n```html\n<section class=\"content-section\" data-section=\"step1\">\n    <h2>Schritt 1: Export starten</h2>\n    \n    <!-- SHOW: Praktische Anweisungen -->\n    <div data-content-type=\"instruction\">\n        <ol>\n            <li>Öffnen Sie AXIOM Process</li>\n            <li>Klicken Sie auf \"New Case\"</li>\n            <li>Wählen Sie die Datenquelle aus</li>\n        </ol>\n    </div>\n    \n    <!-- TELL: Erklärungen (im Show-Modus versteckt) -->\n    <div data-content-type=\"explanation\">\n        <p>\n            AXIOM Process ist die erste Stufe der Datenverarbeitung. \n            Es extrahiert und indexiert Daten aus verschiedenen Quellen...\n        </p>\n    </div>\n    \n    <!-- SHOW: Screenshots/Visuals -->\n    <div data-content-type=\"visual\">\n        <img src=\"images/step1-screenshot.png\" alt=\"AXIOM Process Startbildschirm\">\n    </div>\n    \n    <!-- TELL: Hintergrundinformationen -->\n    <div data-content-type=\"background\">\n        <div class=\"info-box\">\n            <strong>Technischer Hintergrund:</strong>\n            Die Extraktion erfolgt über proprietäre Parser...\n        </div>\n    </div>\n</section>\n```\n\n#### 2. Medien-Layer-System erweitern\n\n**Aktuelles System:**\n- Standard: Bilder, Videos\n- Nur Text: Keine Medien\n- Vollständig: Alle Medien + Animationen\n\n**Neu hinzufügen:**\n- **Show-Only:** Nur Instructions + Visuals\n\n#### 3. JavaScript-Erweiterung\n\n**In `script-preferences.js` erweitern:**\n\n```javascript\n// Bestehender Code\nconst MEDIA_LAYERS = {\n    STANDARD: 'standard',\n    TEXT_ONLY: 'text-only',\n    FULL: 'full',\n    SHOW_ONLY: 'show-only'  // NEU\n};\n\nfunction applyMediaLayer(layer) {\n    document.body.setAttribute('data-media-layer', layer);\n    \n    // Bestehende Logic für standard/text-only/full\n    // ...\n    \n    // NEU: Show-Only Modus\n    if (layer === MEDIA_LAYERS.SHOW_ONLY) {\n        applyShowOnlyMode();\n    } else {\n        removeShowOnlyMode();\n    }\n}\n\nfunction applyShowOnlyMode() {\n    // Verstecke Erklärungen und Hintergrund-Infos\n    const hideTypes = ['explanation', 'background'];\n    \n    hideTypes.forEach(type => {\n        const elements = document.querySelectorAll(`[data-content-type=\"${type}\"]`);\n        elements.forEach(el => {\n            el.classList.add('content-hidden');\n        });\n    });\n    \n    // Zeige nur Instructions und Visuals\n    const showTypes = ['instruction', 'visual'];\n    \n    showTypes.forEach(type => {\n        const elements = document.querySelectorAll(`[data-content-type=\"${type}\"]`);\n        elements.forEach(el => {\n            el.classList.remove('content-hidden');\n        });\n    });\n    \n    LOG('PREFS', 'Show-Only mode applied');\n}\n\nfunction removeShowOnlyMode() {\n    const allElements = document.querySelectorAll('[data-content-type]');\n    allElements.forEach(el => {\n        el.classList.remove('content-hidden');\n    });\n}\n```\n\n#### 4. CSS-Styling\n\n```css\n/* ===== CONTENT TYPE VISIBILITY ===== */\n\n/* Show-Only Modus */\n[data-media-layer=\"show-only\"] [data-content-type=\"explanation\"],\n[data-media-layer=\"show-only\"] [data-content-type=\"background\"] {\n    display: none;\n}\n\n/* Smooth Transition */\n[data-content-type] {\n    transition: opacity var(--transition-medium),\n                max-height var(--transition-medium);\n}\n\n.content-hidden {\n    opacity: 0;\n    max-height: 0;\n    overflow: hidden;\n    margin: 0 !important;\n    padding: 0 !important;\n}\n\n/* Instructions hervorheben im Show-Only Modus */\n[data-media-layer=\"show-only\"] [data-content-type=\"instruction\"] {\n    background-color: var(--color-surface);\n    padding: 20px;\n    border-left: 4px solid var(--color-success);\n    border-radius: 8px;\n    margin: 20px 0;\n}\n\n[data-media-layer=\"show-only\"] [data-content-type=\"visual\"] {\n    margin: 20px 0;\n    box-shadow: 0 4px 12px var(--color-shadow);\n}\n```\n\n#### 5. UI-Integration\n\n**Menu-Item erweitern:**\n\n```html\n<button class=\"menu-item\" id=\"toggle-media-layer\" role=\"menuitem\">\n    <span class=\"menu-icon\">🖼️</span>\n    Medien: <span id=\"media-layer-status\">Standard</span>\n</button>\n```\n\n**JavaScript für Cycling:**\n\n```javascript\nfunction cycleMediaLayer() {\n    const order = ['standard', 'show-only', 'text-only', 'full'];\n    const currentIndex = order.indexOf(currentMediaLayer);\n    const nextIndex = (currentIndex + 1) % order.length;\n    const nextLayer = order[nextIndex];\n    \n    setMediaLayer(nextLayer);\n}\n\nfunction getMediaLayerDisplayName(layer) {\n    const names = {\n        'standard': 'Standard',\n        'show-only': 'Nur Anweisungen',\n        'text-only': 'Nur Text',\n        'full': 'Vollständig'\n    };\n    return names[layer] || layer;\n}\n```\n\n### Vorteile\n\n✅ **Zielgruppen-gerecht:** Verschiedene Lerntypen unterstützt  \n✅ **Schnelligkeit:** Erfahrene User kommen direkt zum Punkt  \n✅ **Übersichtlichkeit:** Weniger visueller Clutter  \n✅ **Chef-Happy:** Erfüllt explizite Anforderung 😊\n\n**Aufwand:** 3-4 Stunden\n\n---\n\n## 🤖 Verbesserungsvorschlag 8: Agent FAQ & Feedback-System\n\n**Priorität:** 🟡 Mittel  \n**Aufwand:** 6-8 Stunden  \n**Status:** Im Scope, nicht dringend\n\n### Feature-Beschreibung\n\nErweiterung des bestehenden Agenten um:\n1. **FAQ-System:** Intelligente Suche in häufigen Fragen\n2. **Feedback-Funktion:** Direkte Kontaktmöglichkeit per E-Mail\n\n### Architektur\n\n#### 1. FAQ-Datenstruktur\n\n**Datei: `agent-faq.json`**\n\n```json\n{\n  \"version\": \"1.0\",\n  \"updated\": \"2025-10-04\",\n  \"faqs\": [\n    {\n      \"id\": \"export-dauer\",\n      \"question\": \"Wie lange dauert ein Export?\",\n      \"answer\": \"Die Dauer hängt von der Datenmenge ab. Ein Smartphone-Export dauert typischerweise 30-90 Minuten. Computer-Exports können mehrere Stunden in Anspruch nehmen.\",\n      \"tags\": [\"export\", \"dauer\", \"zeit\", \"lange\"],\n      \"category\": \"allgemein\",\n      \"relatedSections\": [\"step1\", \"step2\"],\n      \"priority\": 1\n    },\n    {\n      \"id\": \"fehler-export\",\n      \"question\": \"Was tun bei Export-Fehlern?\",\n      \"answer\": \"Prüfen Sie zunächst die Verbindung zum Gerät. Stellen Sie sicher, dass genügend Speicherplatz vorhanden ist. Bei persistenten Fehlern konsultieren Sie das Error-Log in AXIOM Process unter 'View' → 'Processing Log'.\",\n      \"tags\": [\"fehler\", \"error\", \"problem\", \"export\", \"funktioniert nicht\"],\n      \"category\": \"troubleshooting\",\n      \"relatedSections\": [\"troubleshooting\"],\n      \"priority\": 2\n    },\n    {\n      \"id\": \"hash-pruefen\",\n      \"question\": \"Wie prüfe ich Hash-Werte?\",\n      \"answer\": \"Hash-Werte werden automatisch berechnet und im Report angezeigt. Sie finden sie unter 'Evidence' → 'Properties'. Zur manuellen Verifikation nutzen Sie Tools wie 'certutil' (Windows) oder 'shasum' (Mac/Linux).\",\n      \"tags\": [\"hash\", \"md5\", \"sha256\", \"verifikation\", \"integrität\"],\n      \"category\": \"forensik\",\n      \"relatedSections\": [\"verification\"],\n      \"priority\": 3\n    }\n  ],\n  \"categories\": {\n    \"allgemein\": \"Allgemeine Fragen\",\n    \"troubleshooting\": \"Problembehebung\",\n    \"forensik\": \"Forensische Praxis\",\n    \"technik\": \"Technische Details\"\n  }\n}\n```\n\n#### 2. HTML-Erweiterung für Agenten\n\n**In bestehender Agent-Sidebar ergänzen:**\n\n```html\n<!-- NEUER TAB: FAQ -->\n<div class=\"agent-mode\" data-mode=\"faq\">\n    <div class=\"agent-faq-search\">\n        <input type=\"text\" \n               id=\"agent-faq-input\"\n               class=\"agent-faq-input\"\n               placeholder=\"Stellen Sie eine Frage...\"\n               aria-label=\"FAQ durchsuchen\">\n        <button id=\"agent-faq-submit\" \n                class=\"agent-faq-submit\"\n                aria-label=\"Suchen\">\n            🔍\n        </button>\n    </div>\n    \n    <div class=\"agent-faq-results\" id=\"agent-faq-results\">\n        <!-- Wird dynamisch gefüllt -->\n    </div>\n    \n    <div class=\"agent-faq-empty\">\n        <p>💡 Stellen Sie eine Frage, um Antworten zu finden.</p>\n        <p class=\"agent-faq-examples\">\n            Beispiele:<br>\n            • \"Wie lange dauert ein Export?\"<br>\n            • \"Was tun bei Fehlern?\"<br>\n            • \"Wie prüfe ich Hashes?\"\n        </p>\n    </div>\n</div>\n\n<!-- NEUER TAB: Feedback -->\n<div class=\"agent-mode\" data-mode=\"feedback\">\n    <div class=\"agent-feedback-content\">\n        <h3>📧 Feedback & Ideen</h3>\n        <p>Haben Sie Verbesserungsvorschläge oder Fragen?</p>\n        \n        <div class=\"agent-feedback-options\">\n            <button class=\"agent-feedback-btn\" data-type=\"bug\">\n                🐛 Problem melden\n            </button>\n            <button class=\"agent-feedback-btn\" data-type=\"feature\">\n                💡 Feature-Idee\n            </button>\n            <button class=\"agent-feedback-btn\" data-type=\"question\">\n                ❓ Frage stellen\n            </button>\n            <button class=\"agent-feedback-btn\" data-type=\"general\">\n                💬 Allgemeines Feedback\n            </button>\n        </div>\n        \n        <div class=\"agent-feedback-info\">\n            <p>Klicken Sie auf eine Option, um eine E-Mail zu erstellen.</p>\n        </div>\n    </div>\n</div>\n```\n\n**Mode-Selector erweitern:**\n\n```html\n<div class=\"agent-mode-selector\">\n    <button class=\"agent-mode-btn active\" data-mode=\"chat\">💬 Chat</button>\n    <button class=\"agent-mode-btn\" data-mode=\"faq\">❓ FAQ</button>\n    <button class=\"agent-mode-btn\" data-mode=\"feedback\">📧 Feedback</button>\n</div>\n```\n\n#### 3. JavaScript-Erweiterung\n\n**FAQ-System in `agent.js` ergänzen:**\n\n```javascript\n// ===== FAQ SYSTEM =====\n\nlet faqData = null;\n\nasync function loadFAQ() {\n    try {\n        const response = await fetch('agent-faq.json');\n        faqData = await response.json();\n        LOG('AGENT', `Loaded ${faqData.faqs.length} FAQs`);\n    } catch (error) {\n        LOG.error('AGENT', 'Failed to load FAQ', error);\n    }\n}\n\nfunction searchFAQ(query) {\n    if (!faqData || !query) return [];\n    \n    query = query.toLowerCase().trim();\n    \n    const results = faqData.faqs.map(faq => {\n        let score = 0;\n        \n        // Exact match in question\n        if (faq.question.toLowerCase().includes(query)) {\n            score += 10;\n        }\n        \n        // Match in tags\n        const tagMatches = faq.tags.filter(tag => \n            tag.toLowerCase().includes(query) || \n            query.includes(tag.toLowerCase())\n        );\n        score += tagMatches.length * 5;\n        \n        // Match in answer\n        if (faq.answer.toLowerCase().includes(query)) {\n            score += 3;\n        }\n        \n        // Keyword matching\n        const queryWords = query.split(' ');\n        queryWords.forEach(word => {\n            if (word.length < 3) return;\n            if (faq.question.toLowerCase().includes(word)) score += 2;\n            if (faq.tags.some(tag => tag.toLowerCase().includes(word))) score += 2;\n        });\n        \n        return { ...faq, score };\n    });\n    \n    // Filter and sort\n    return results\n        .filter(r => r.score > 0)\n        .sort((a, b) => b.score - a.score || a.priority - b.priority)\n        .slice(0, 5); // Top 5 Ergebnisse\n}\n\nfunction renderFAQResults(results) {\n    const container = document.getElementById('agent-faq-results');\n    const emptyState = document.querySelector('.agent-faq-empty');\n    \n    if (results.length === 0) {\n        container.innerHTML = '<div class=\"agent-faq-no-results\">Keine passenden Antworten gefunden. Versuchen Sie andere Begriffe oder nutzen Sie das Feedback-Formular.</div>';\n        return;\n    }\n    \n    emptyState.classList.add('hidden');\n    container.classList.remove('hidden');\n    \n    container.innerHTML = results.map(faq => `\n        <div class=\"agent-faq-result\" data-faq-id=\"${faq.id}\">\n            <div class=\"agent-faq-question\">\n                <strong>❓ ${faq.question}</strong>\n            </div>\n            <div class=\"agent-faq-answer\">\n                ${faq.answer}\n            </div>\n            ${faq.relatedSections.length > 0 ? `\n                <div class=\"agent-faq-related\">\n                    <span>📍 Verwandte Abschnitte:</span>\n                    ${faq.relatedSections.map(sectionId => `\n                        <button class=\"agent-faq-goto\" data-section=\"${sectionId}\">\n                            ${getSectionTitle(sectionId)}\n                        </button>\n                    `).join('')}\n                </div>\n            ` : ''}\n        </div>\n    `).join('');\n    \n    // Event listeners für \"Gehe zu Abschnitt\"\n    container.querySelectorAll('.agent-faq-goto').forEach(btn => {\n        btn.addEventListener('click', () => {\n            const sectionId = btn.getAttribute('data-section');\n            navigateToSection(sectionId);\n        });\n    });\n}\n\n// ===== FEEDBACK SYSTEM =====\n\nfunction setupFeedbackButtons() {\n    document.querySelectorAll('.agent-feedback-btn').forEach(btn => {\n        btn.addEventListener('click', () => {\n            const type = btn.getAttribute('data-type');\n            openFeedbackEmail(type);\n        });\n    });\n}\n\nfunction openFeedbackEmail(type) {\n    const config = {\n        bug: {\n            subject: '[AXIOM Leitfaden] Problem melden',\n            body: `Hallo,\\n\\nich möchte folgendes Problem melden:\\n\\n[Bitte beschreiben Sie das Problem]\\n\\nSchritte zur Reproduktion:\\n1. \\n2. \\n3. \\n\\nErwartetes Verhalten:\\n[Was sollte passieren?]\\n\\nTatsächliches Verhalten:\\n[Was passiert stattdessen?]\\n\\n---\\nBrowser: ${navigator.userAgent}\\nSeite: ${window.location.href}`\n        },\n        feature: {\n            subject: '[AXIOM Leitfaden] Feature-Vorschlag',\n            body: `Hallo,\\n\\nich habe eine Idee für ein neues Feature:\\n\\n[Beschreiben Sie Ihre Idee]\\n\\nNutzen:\\n[Welches Problem löst dieses Feature?]\\n\\nZielgruppe:\\n[Wer würde davon profitieren?]\\n\\n---\\nSeite: ${window.location.href}`\n        },\n        question: {\n            subject: '[AXIOM Leitfaden] Frage',\n            body: `Hallo,\\n\\nich habe folgende Frage:\\n\\n[Ihre Frage]\\n\\n---\\nKontext:\\n[Wo im Leitfaden sind Sie gerade?]\\nSeite: ${window.location.href}`\n        },\n        general: {\n            subject: '[AXIOM Leitfaden] Feedback',\n            body: `Hallo,\\n\\n[Ihr Feedback]\\n\\n---\\nSeite: ${window.location.href}`\n        }\n    };\n    \n    const mailConfig = config[type] || config.general;\n    const mailto = `mailto:support@ihre-firma.de?subject=${encodeURIComponent(mailConfig.subject)}&body=${encodeURIComponent(mailConfig.body)}`;\n    \n    window.location.href = mailto;\n}\n\n// Init\nloadFAQ();\nsetupFeedbackButtons();\n```\n\n#### 4. CSS-Styling\n\n```css\n/* ===== AGENT FAQ ===== */\n.agent-faq-search {\n    display: flex;\n    gap: 8px;\n    margin-bottom: 20px;\n}\n\n.agent-faq-input {\n    flex: 1;\n    padding: 12px;\n    border: 2px solid var(--color-border);\n    border-radius: 8px;\n    font-size: 1em;\n}\n\n.agent-faq-submit {\n    padding: 12px 20px;\n    background-color: var(--color-primary);\n    color: var(--color-surface-elevated);\n    border: none;\n    border-radius: 8px;\n    cursor: pointer;\n    font-size: 1.2em;\n}\n\n.agent-faq-result {\n    background-color: var(--color-surface);\n    padding: 16px;\n    border-radius: 8px;\n    margin-bottom: 12px;\n    border-left: 4px solid var(--color-info);\n}\n\n.agent-faq-question {\n    margin-bottom: 10px;\n    color: var(--color-primary);\n}\n\n.agent-faq-answer {\n    line-height: 1.6;\n    margin-bottom: 10px;\n}\n\n.agent-faq-related {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 8px;\n    align-items: center;\n    font-size: 0.9em;\n    margin-top: 12px;\n    padding-top: 12px;\n    border-top: 1px solid var(--color-border);\n}\n\n.agent-faq-goto {\n    padding: 4px 12px;\n    background-color: var(--color-primary);\n    color: var(--color-surface-elevated);\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    font-size: 0.85em;\n}\n\n/* ===== AGENT FEEDBACK ===== */\n.agent-feedback-content {\n    padding: 20px;\n}\n\n.agent-feedback-options {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 12px;\n    margin: 20px 0;\n}\n\n.",
  "version_uuid": "837fe09a-e07c-42f0-b657-0bc9809476d9"
}
````



## Prompt:
4.10.2025, 15:37:31

Weiter



## Response:
4.10.2025, 15:39:21



**Verbesserungsvorschläge für AXIOM Leitfaden** ∙ Version 6

````markdown
# Verbesserungsvorschläge für AXIOM Leitfaden

**Dokumentversion:** 1.0  
**Datum:** 04. Oktober 2025  
**Status:** Geplant / Zur Umsetzung vorgemerkt

---

## Übersicht

Dieses Dokument enthält detaillierte Verbesserungsvorschläge für den AXIOM Leitfaden, die nach Analyse der aktuellen Implementierung (Build 053) erarbeitet wurden.

**Prioritäten-Übersicht:**

### 🔴 Sehr hohe Priorität (Sofort umsetzen)
- ✅ **V1:** Einheitliche Zustandsverwaltung
- ✅ **V4:** Strikte Trennung: CSS / HTML / JavaScript
- ✅ **V9:** Animations- und Transitions-Harmonisierung

### 🟠 Hohe Priorität (Zeitnah umsetzen)
- ✅ **V3:** Tooltips & Onboarding-System
- ✅ **V5:** Favorites/Lesezeichen-Sidebar
- ✅ **V7:** "Don't tell; just show"-Modus

### 🟡 Mittlere Priorität (Geplant)
- ✅ **V6:** Glossar-Feature mit Hover-Tooltips
- ✅ **V8:** Agent FAQ-System & Feedback-Funktion

### ⏸️ Zurückgestellt
- ⏸️ **V2:** Progressive Enhancement (nicht benötigt für Corporate Environment)

---

## 🎯 Verbesserungsvorschlag 1: Einheitliche Zustandsverwaltung

### Problembeschreibung

**Aktueller Zustand:**
- Verschiedene Module verwalten ihre Zustände unabhängig
- Verstreute localStorage-Zugriffe in mehreren Dateien
- Potenzielle Synchronisationsprobleme zwischen Komponenten
- Redundante Code-Duplikation für State-Persistierung

**Betroffene Module:**
- `script-sidebar-manager.js` - Sidebar-Status
- `script-notes.js` - Notizen-Panel-Status
- `script-tips.js` - Tipps-Footer-Sichtbarkeit
- `script-theme.js` - Theme-Präferenz
- `script-preferences.js` - Diverse UI-Einstellungen
- `script-history.js` - Zeitformat-Präferenz

### Lösungsansatz

**Zentrale Zustandsverwaltung mit Observer-Pattern:**

#### 1. Neues Modul: `script-state-manager.js`

```javascript
// ============================================================================
// SCRIPT-STATE-MANAGER.JS
// Zentrale Zustandsverwaltung mit Observer-Pattern und Persistierung
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'STATE-MGR';
    
    // ===== ZENTRALER APPLICATION STATE =====
    window.AppState = {
        ui: {
            sidebarOpen: false,
            sidebarActive: null,  // 'navigation', 'history', null
            notesOpen: false,
            tipsVisible: true,
            menuOpen: false
        },
        preferences: {
            theme: 'system',
            detailLevel: 1,
            timeFormat: 'relative',  // 'relative' oder 'absolute'
            mediaLayer: 'standard',
            contrastEnhanced: false
        },
        content: {
            currentSection: null,
            scrollPosition: 0
        }
    };
    
    // ===== OBSERVER SUBSCRIBERS =====
    const subscribers = new Map();
    
    /**
     * Subscribe to state changes
     * @param {string} path - Dot-notation path (e.g., 'ui.sidebarOpen')
     * @param {Function} callback - Called when state changes
     * @returns {Function} Unsubscribe function
     */
    window.AppState.subscribe = function(path, callback) {
        if (!subscribers.has(path)) {
            subscribers.set(path, new Set());
        }
        
        subscribers.get(path).add(callback);
        
        LOG(MODULE, `Subscribed to state path: ${path}`);
        
        // Return unsubscribe function
        return () => {
            subscribers.get(path)?.delete(callback);
            LOG(MODULE, `Unsubscribed from state path: ${path}`);
        };
    };
    
    /**
     * Update state and notify subscribers
     * @param {string} path - Dot-notation path
     * @param {*} value - New value
     */
    window.AppState.update = function(path, value) {
        const keys = path.split('.');
        let current = window.AppState;
        
        // Navigate to target
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        
        // Update value
        const oldValue = current[keys[keys.length - 1]];
        current[keys[keys.length - 1]] = value;
        
        LOG(MODULE, `State updated: ${path}`, { oldValue, newValue: value });
        
        // Notify subscribers
        notifySubscribers(path, value, oldValue);
        
        // Persist to localStorage (debounced)
        debouncedPersist();
    };
    
    /**
     * Get state value
     * @param {string} path - Dot-notation path
     * @returns {*} State value
     */
    window.AppState.get = function(path) {
        const keys = path.split('.');
        let current = window.AppState;
        
        for (const key of keys) {
            current = current[key];
            if (current === undefined) return undefined;
        }
        
        return current;
    };
    
    // ===== INTERNAL FUNCTIONS =====
    
    function notifySubscribers(path, newValue, oldValue) {
        const pathSubscribers = subscribers.get(path);
        
        if (pathSubscribers && pathSubscribers.size > 0) {
            pathSubscribers.forEach(callback => {
                try {
                    callback(newValue, oldValue);
                } catch (error) {
                    LOG.error(MODULE, `Subscriber callback error for ${path}`, error);
                }
            });
            
            LOG(MODULE, `Notified ${pathSubscribers.size} subscriber(s) for: ${path}`);
        }
    }
    
    // ===== PERSISTENCE =====
    
    const STORAGE_KEY = 'axiom-app-state';
    let persistTimeout = null;
    
    function debouncedPersist() {
        clearTimeout(persistTimeout);
        persistTimeout = setTimeout(persistState, 500);
    }
    
    function persistState() {
        try {
            const stateToPersist = {
                ui: window.AppState.ui,
                preferences: window.AppState.preferences
                // content wird nicht persistiert (Session-basiert)
            };
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
            LOG(MODULE, 'State persisted to localStorage');
        } catch (error) {
            LOG.error(MODULE, 'Failed to persist state', error);
        }
    }
    
    function loadPersistedState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            
            if (saved) {
                const parsed = JSON.parse(saved);
                
                // Merge mit default state
                Object.assign(window.AppState.ui, parsed.ui || {});
                Object.assign(window.AppState.preferences, parsed.preferences || {});
                
                LOG.success(MODULE, 'State loaded from localStorage', parsed);
                return true;
            }
        } catch (error) {
            LOG.error(MODULE, 'Failed to load persisted state', error);
        }
        
        return false;
    }
    
    // ===== INITIALIZATION =====
    
    function initStateManager() {
        LOG(MODULE, 'Initializing state manager...');
        
        // Load persisted state
        loadPersistedState();
        
        // Apply initial state to DOM
        applyInitialState();
        
        LOG.success(MODULE, 'State manager initialized', window.AppState);
    }
    
    function applyInitialState() {
        // Theme anwenden
        if (window.AppState.preferences.theme !== 'system') {
            document.documentElement.setAttribute('data-theme', window.AppState.preferences.theme);
        }
        
        // Tips-Footer Sichtbarkeit
        if (!window.AppState.ui.tipsVisible) {
            document.body.classList.add('tips-hidden');
        }
        
        LOG(MODULE, 'Initial state applied to DOM');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStateManager);
    } else {
        initStateManager();
    }
    
    LOG(MODULE, 'State manager module loaded');
    
})();
```

#### 2. Migration bestehender Module

**Beispiel: `script-sidebar-manager.js` Migration**

```javascript
// VORHER (alt):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    localStorage.setItem('axiom-sidebar-active', sidebarId);
}

// NACHHER (neu):
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    AppState.update('ui.sidebarActive', sidebarId);
    AppState.update('ui.sidebarOpen', true);
}

// Subscribe to changes from other modules
AppState.subscribe('ui.sidebarActive', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        // Update DOM accordingly
        updateSidebarDOM(newValue);
    }
});
```

**Beispiel: `script-theme.js` Migration**

```javascript
// Subscribe to theme changes
AppState.subscribe('preferences.theme', (newTheme) => {
    applyTheme(newTheme);
    updateThemeIcon(newTheme);
});

// Update theme
function cycleTheme() {
    const currentTheme = AppState.get('preferences.theme');
    const nextTheme = getNextTheme(currentTheme);
    AppState.update('preferences.theme', nextTheme);
}
```

### Implementierungsschritte

1. **Phase 1: Grundgerüst** (1-2 Stunden)
   - Erstellen von `script-state-manager.js`
   - Integration in `index.html` (vor allen anderen Modulen!)
   - Tests der Basis-Funktionalität

2. **Phase 2: Migration Kern-Module** (2-3 Stunden)
   - `script-theme.js` migrieren
   - `script-sidebar-manager.js` migrieren
   - `script-tips.js` migrieren

3. **Phase 3: Migration restliche Module** (2-3 Stunden)
   - `script-notes.js` migrieren
   - `script-preferences.js` migrieren
   - `script-history.js` (Zeitformat) migrieren

4. **Phase 4: Testing & Cleanup** (1-2 Stunden)
   - Cross-Module-Tests
   - Alte localStorage-Aufrufe entfernen
   - Dokumentation aktualisieren

**Gesamt-Aufwand:** ca. 6-10 Stunden

### Vorteile nach Umsetzung

✅ **Zentrale Kontrolle:** Ein Ort für alle UI-Zustände  
✅ **Konsistenz:** Keine Race Conditions mehr  
✅ **Debugging:** Alle State-Changes geloggt an einem Ort  
✅ **Erweiterbarkeit:** Neue Features einfach in State integrieren  
✅ **Performance:** Reduzierte localStorage-Zugriffe durch Debouncing  
✅ **Testbarkeit:** State-Logic isoliert testbar

---

## 🎓 Verbesserungsvorschlag 3: Kontextbezogene Tooltips & Onboarding

### Problembeschreibung

**Aktueller Zustand:**
- Viele Features ohne direkte Erklärung
- Tipps-Footer ist generisch, nicht kontextbezogen
- Neue Nutzer müssen Features selbst entdecken
- Keine geführte Einführung in die Funktionalität

**User Experience Probleme:**
- Hohe Lernkurve für Erstnutzer
- Features werden möglicherweise nicht entdeckt
- Keine Hilfe bei komplexeren Funktionen (Detail-Level, Sidebar-System)

### Lösungsansatz

**Zweistufiges System:**
1. **Permanente Tooltips** - Hover-Hilfe für alle UI-Elemente
2. **Einmaliger Onboarding-Guide** - Schritt-für-Schritt bei Erstbesuch

#### 1. Tooltip-System

**Neues Modul: `script-tooltips.js`**

```javascript
// ============================================================================
// SCRIPT-TOOLTIPS.JS
// Kontextbezogene Tooltips für UI-Elemente
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'TOOLTIPS';
    
    // ===== TOOLTIP CONTAINER =====
    let tooltipElement = null;
    
    function createTooltipElement() {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'app-tooltip';
        tooltipElement.setAttribute('role', 'tooltip');
        tooltipElement.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tooltipElement);
    }
    
    // ===== TOOLTIP ANZEIGE =====
    
    function showTooltip(targetElement, text) {
        if (!tooltipElement || !text) return;
        
        tooltipElement.textContent = text;
        tooltipElement.setAttribute('aria-hidden', 'false');
        
        // Position berechnen
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        
        // Viewport-Check
        if (top < 10) {
            top = rect.bottom + 8; // Unterhalb anzeigen
            tooltipElement.classList.add('tooltip-bottom');
        } else {
            tooltipElement.classList.remove('tooltip-bottom');
        }
        
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
        tooltipElement.classList.add('visible');
    }
    
    function hideTooltip() {
        if (!tooltipElement) return;
        
        tooltipElement.classList.remove('visible');
        tooltipElement.setAttribute('aria-hidden', 'true');
    }
    
    // ===== EVENT HANDLERS =====
    
    function handleMouseEnter(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleMouseLeave(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        hideTooltip();
    }
    
    function handleFocus(event) {
        const target = event.target;
        if (!target.hasAttribute('data-tooltip')) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleBlur() {
        hideTooltip();
    }
    
    // ===== INITIALIZATION =====
    
    function initTooltips() {
        LOG(MODULE, 'Initializing tooltip system...');
        
        createTooltipElement();
        
        // Event-Delegation für alle Tooltips
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);
        document.addEventListener('focus', handleFocus, true);
        document.addEventListener('blur', handleBlur, true);
        
        LOG.success(MODULE, 'Tooltip system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }
    
    LOG(MODULE, 'Tooltips module loaded');
    
})();
```

**CSS für Tooltips:**

```css
/* ===== TOOLTIP SYSTEM ===== */
.app-tooltip {
    position: fixed;
    background-color: var(--color-text-primary);
    color: var(--color-surface-elevated);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.9em;
    line-height: 1.4;
    max-width: 250px;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 4px 12px var(--color-shadow-strong);
}

.app-tooltip.visible {
    opacity: 1;
    transform: translateY(0);
}

.app-tooltip.tooltip-bottom {
    transform: translateY(4px);
}

.app-tooltip.tooltip-bottom.visible {
    transform: translateY(0);
}

/* Tooltip-Pfeil (optional) */
.app-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: var(--color-text-primary);
}

.app-tooltip.tooltip-bottom::before {
    bottom: auto;
    top: 100%;
    border-bottom-color: transparent;
    border-top-color: var(--color-text-primary);
}

/* Accessibility: Tooltips bei prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
    .app-tooltip {
        transition: none;
    }
}
```

**HTML-Markup (Beispiele):**

```html
<!-- Hamburger Menu -->
<button id="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen">
    ☰
</button>

<!-- Detail-Level Buttons -->
<button class="detail-btn-mini" 
        data-level="1"
        data-tooltip="Ebene 1: Nur die wichtigsten Informationen"
        aria-pressed="true">
    1
</button>

<!-- Sidebar Toggle -->
<button id="toggle-nav-sidebar-btn" 
        data-tooltip="Zeigt oder versteckt die Navigations-Sidebar"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<!-- Theme Toggle -->
<button id="toggle-theme" 
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata"
        role="menuitem">
    Theme: <span id="current-theme">System</span>
</button>
```

#### 2. Onboarding-Guide

**Neues Modul: `script-onboarding.js`**

```javascript
// ============================================================================
// SCRIPT-ONBOARDING.JS
// Einmaliger Onboarding-Guide für Erstnutzer
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'ONBOARDING';
    
    // ===== ONBOARDING STEPS =====
    const ONBOARDING_STEPS = [
        {
            target: '#menu-toggle',
            title: 'Willkommen! 👋',
            message: 'Hier finden Sie alle wichtigen Einstellungen und Funktionen.',
            position: 'bottom'
        },
        {
            target: '.detail-controls',
            title: 'Detailtiefe anpassen',
            message: 'Wählen Sie zwischen drei Detailstufen: Basis, Standard oder Vollständig.',
            position: 'bottom'
        },
        {
            target: '#toggle-nav-sidebar-btn',
            title: 'Navigation-Sidebar',
            message: 'Öffnen Sie die Sidebar für schnelle Navigation durch den Leitfaden.',
            action: () => {
                document.getElementById('toggle-nav-sidebar-btn')?.click();
            }
        },
        {
            target: '.notes-toggle',
            title: 'Notizen machen',
            message: 'Halten Sie wichtige Informationen direkt im Leitfaden fest.',
            position: 'left'
        },
        {
            target: '#toggle-theme',
            title: 'Theme wählen',
            message: 'Passen Sie das Farbschema an Ihre Vorlieben an.',
            position: 'bottom'
        }
    ];
    
    // ===== STATE =====
    let currentStep = 0;
    let onboardingActive = false;
    let overlayElement = null;
    let highlightElement = null;
    let tooltipElement = null;
    
    // ===== ONBOARDING UI =====
    
    function createOnboardingElements() {
        // Overlay
        overlayElement = document.createElement('div');
        overlayElement.className = 'onboarding-overlay';
        overlayElement.setAttribute('aria-hidden', 'true');
        
        // Highlight
        highlightElement = document.createElement('div');
        highlightElement.className = 'onboarding-highlight';
        
        // Tooltip
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'onboarding-tooltip';
        tooltipElement.innerHTML = `
            <div class="onboarding-header">
                <h3 class="onboarding-title"></h3>
                <button class="onboarding-skip" aria-label="Tour überspringen">×</button>
            </div>
            <p class="onboarding-message"></p>
            <div class="onboarding-footer">
                <span class="onboarding-progress"></span>
                <div class="onboarding-buttons">
                    <button class="onboarding-prev">Zurück</button>
                    <button class="onboarding-next">Weiter</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlayElement);
        document.body.appendChild(highlightElement);
        document.body.appendChild(tooltipElement);
    }
    
    function showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= ONBOARDING_STEPS.length) {
            endOnboarding();
            return;
        }
        
        currentStep = stepIndex;
        const step = ONBOARDING_STEPS[stepIndex];
        
        // Target Element finden
        const targetElement = document.querySelector(step.target);
        if (!targetElement) {
            LOG.warn(MODULE, `Target not found: ${step.target}, skipping step`);
            showStep(stepIndex + 1);
            return;
        }
        
        // Highlight positionieren
        const rect = targetElement.getBoundingClientRect();
        highlightElement.style.top = `${rect.top - 8}px`;
        highlightElement.style.left = `${rect.left - 8}px`;
        highlightElement.style.width = `${rect.width + 16}px`;
        highlightElement.style.height = `${rect.height + 16}px`;
        
        // Tooltip aktualisieren
        tooltipElement.querySelector('.onboarding-title').textContent = step.title;
        tooltipElement.querySelector('.onboarding-message').textContent = step.message;
        tooltipElement.querySelector('.onboarding-progress').textContent = 
            `Schritt ${stepIndex + 1} von ${ONBOARDING_STEPS.length}`;
        
        // Tooltip positionieren
        positionTooltip(targetElement, step.position || 'right');
        
        // Navigation Buttons
        const prevBtn = tooltipElement.querySelector('.onboarding-prev');
        const nextBtn = tooltipElement.querySelector('.onboarding-next');
        
        prevBtn.disabled = stepIndex === 0;
        nextBtn.textContent = stepIndex === ONBOARDING_STEPS.length - 1 ? 'Fertig' : 'Weiter';
        
        // Aktion ausführen (falls vorhanden)
        if (step.action && typeof step.action === 'function') {
            setTimeout(() => step.action(), 300);
        }
        
        // Elemente anzeigen
        overlayElement.classList.add('visible');
        highlightElement.classList.add('visible');
        tooltipElement.classList.add('visible');
        
        LOG(MODULE, `Showing step ${stepIndex + 1}/${ONBOARDING_STEPS.length}`);
    }
    
    function positionTooltip(targetElement, position) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top, left;
        
        switch(position) {
            case 'bottom':
                top = rect.bottom + 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'top':
                top = rect.top - tooltipRect.height - 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left - tooltipRect.width - 16;
                break;
            case 'right':
            default:
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + 16;
                break;
        }
        
        // Viewport boundaries
        if (top < 10) top = 10;
        if (left < 10) left = 10;
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = window.innerHeight - tooltipRect.height - 10;
        }
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }
    
    function endOnboarding() {
        onboardingActive = false;
        
        overlayElement?.classList.remove('visible');
        highlightElement?.classList.remove('visible');
        tooltipElement?.classList.remove('visible');
        
        // Markiere Onboarding als abgeschlossen
        localStorage.setItem('axiom-onboarding-completed', 'true');
        
        LOG.success(MODULE, 'Onboarding completed');
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Skip Button
        tooltipElement.querySelector('.onboarding-skip').addEventListener('click', () => {
            endOnboarding();
        });
        
        // Previous Button
        tooltipElement.querySelector('.onboarding-prev').addEventListener('click', () => {
            showStep(currentStep - 1);
        });
        
        // Next Button
        tooltipElement.querySelector('.onboarding-next').addEventListener('click', () => {
            showStep(currentStep + 1);
        });
        
        // ESC zum Abbrechen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && onboardingActive) {
                endOnboarding();
            }
        });
    }
    
    // ===== PUBLIC API =====
    
    window.startOnboarding = function() {
        if (onboardingActive) return;
        
        onboardingActive = true;
        currentStep = 0;
        
        if (!overlayElement) {
            createOnboardingElements();
            setupEventHandlers();
        }
        
        showStep(0);
        
        LOG(MODULE, 'Onboarding started');
    };
    
    // ===== INITIALIZATION =====
    
    function initOnboarding() {
        LOG(MODULE, 'Initializing onboarding system...');
        
        // Check if onboarding already completed
        const completed = localStorage.getItem('axiom-onboarding-completed');
        
        if (!completed) {
            // Start onboarding nach kurzer Verzögerung
            setTimeout(() => {
                window.startOnboarding();
            }, 1000);
        } else {
            LOG(MODULE, 'Onboarding already completed, skipping');
        }
        
        LOG.success(MODULE, 'Onboarding system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOnboarding);
    } else {
        initOnboarding();
    }
    
    LOG(MODULE, 'Onboarding module loaded');
    
})();
```

**CSS für Onboarding:**

```css
/* ===== ONBOARDING SYSTEM ===== */

/* Overlay - verdunkelt den Hintergrund */
.onboarding-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.onboarding-overlay.visible {
    opacity: 1;
    pointer-events: auto;
}

/* Highlight - hebt das aktuelle Element hervor */
.onboarding-highlight {
    position: fixed;
    border: 3px solid var(--color-primary);
    border-radius: 8px;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7),
                0 0 20px var(--color-primary);
}

.onboarding-highlight.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip - zeigt die Anleitung */
.onboarding-tooltip {
    position: fixed;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    border-radius: 12px;
    padding: 0;
    max-width: 350px;
    z-index: 10000;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px var(--color-shadow-strong);
}

.onboarding-tooltip.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip Header */
.onboarding-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 15px;
    border-bottom: 2px solid var(--color-border);
}

.onboarding-title {
    margin: 0;
    font-size: 1.2em;
    color: var(--color-primary);
}

.onboarding-skip {
    background: none;
    border: none;
    font-size: 1.8em;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all var(--transition-fast);
}

.onboarding-skip:hover {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
}

/* Tooltip Message */
.onboarding-message {
    padding: 20px;
    margin: 0;
    line-height: 1.6;
}

/* Tooltip Footer */
.onboarding-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 20px;
    border-top: 2px solid var(--color-border);
}

.onboarding-progress {
    font-size: 0.9em;
    color: var(--color-text-secondary);
}

.onboarding-buttons {
    display: flex;
    gap: 10px;
}

.onboarding-prev,
.onboarding-next {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 0.95em;
    font-weight: 500;
    transition: all var(--transition-fast);
}

.onboarding-prev {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    border: 2px solid var(--color-border);
}

.onboarding-prev:hover:not(:disabled) {
    background-color: var(--color-border);
}

.onboarding-prev:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.onboarding-next {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
}

.onboarding-next:hover {
    background-color: var(--color-primary-hover);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    .onboarding-overlay,
    .onboarding-highlight,
    .onboarding-tooltip {
        transition: none;
    }
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .onboarding-tooltip {
        max-width: calc(100vw - 40px);
        left: 20px !important;
        right: 20px;
        bottom: 20px !important;
        top: auto !important;
    }
    
    .onboarding-highlight {
        border-width: 2px;
    }
}
```

### Integration in index.html

**Reihenfolge der Script-Einbindung:**

```html
<!-- Core & State (ZUERST!) -->
<script src="script-core.js"></script>
<script src="script-state-manager.js"></script>

<!-- Basis-Module -->
<script src="script-section-management.js"></script>
<script src="script-sidebar-manager.js"></script>
<script src="script-navigation.js"></script>
<script src="script-history.js"></script>
<script src="script-notes.js"></script>
<script src="script-detail-level.js"></script>
<script src="script-tips.js"></script>
<script src="script-theme.js"></script>
<script src="script-preferences.js"></script>

<!-- UI Enhancements (NEU!) -->
<script src="script-tooltips.js"></script>
<script src="script-onboarding.js"></script>

<!-- Initialisierung (ZULETZT!) -->
<script src="script-init.js"></script>
```

### HTML-Markup Erweiterungen

**Tooltips hinzufügen zu allen interaktiven Elementen:**

```html
<!-- Top Navigation -->
<button id="menu-toggle" 
        class="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen" 
        aria-expanded="false">
    ☰
</button>

<!-- Detail Controls -->
<div class="detail-controls" data-tooltip="Wählen Sie die gewünschte Detailtiefe des Leitfadens">
    <span class="detail-label">Detail:</span>
    <div class="detail-buttons">
        <button class="detail-btn-mini" 
                data-level="1"
                data-tooltip="Ebene 1: Nur die wichtigsten Informationen anzeigen"
                aria-pressed="true">1</button>
        <button class="detail-btn-mini" 
                data-level="2"
                data-tooltip="Ebene 2: Standard-Informationen mit zusätzlichen Details"
                aria-pressed="false">2</button>
        <button class="detail-btn-mini" 
                data-level="3"
                data-tooltip="Ebene 3: Alle verfügbaren Informationen anzeigen"
                aria-pressed="false">3</button>
    </div>
</div>

<!-- Notes Toggle -->
<button class="notes-toggle" 
        data-tooltip="Öffnet das Notizen-Panel für persönliche Anmerkungen"
        aria-label="Notizen öffnen/schließen">
    📝 Notizen
</button>

<!-- Menu Items -->
<button class="menu-item" 
        id="show-history-btn" 
        data-tooltip="Zeigt den Verlauf der besuchten Abschnitte"
        role="menuitem">
    <span class="menu-icon">📜</span>
    Verlauf ein/aus
</button>

<button class="menu-item" 
        id="toggle-nav-sidebar-btn"
        data-tooltip="Öffnet die Navigation für schnellen Zugriff auf alle Abschnitte"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<button class="menu-item" 
        id="toggle-tips-footer-btn"
        data-tooltip="Blendet die Tipps am unteren Bildschirmrand ein oder aus"
        role="menuitem">
    <span class="menu-icon">💡</span>
    Tipps ein/aus
</button>

<button class="menu-item" 
        id="toggle-theme"
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata (Hell, Dunkel, Hochkontrast)"
        role="menuitem">
    <div class="theme-icon">...</div>
    Theme: <span id="current-theme">System</span>
</button>
```

### Implementierungsschritte

**Phase 1: Tooltip-System** (2-3 Stunden)
1. `script-tooltips.js` erstellen
2. CSS für Tooltips in `styles.css` einfügen
3. `data-tooltip` Attribute in `index.html` ergänzen
4. Testing auf Desktop & Mobile

**Phase 2: Onboarding-Guide** (3-4 Stunden)
1. `script-onboarding.js` erstellen
2. CSS für Onboarding in `styles.css` einfügen
3. Onboarding-Steps definieren und testen
4. Edge Cases behandeln (fehlende Targets, etc.)

**Phase 3: Feintuning** (1-2 Stunden)
1. Tooltip-Texte verfeinern und vereinheitlichen
2. Onboarding-Flow optimieren
3. Accessibility-Tests durchführen
4. Mobile-Optimierung validieren

**Gesamt-Aufwand:** ca. 6-9 Stunden

### Erweiterungsmöglichkeiten

**Optionale Features für später:**

1. **Onboarding zurücksetzen:**
   ```javascript
   // Im Menü einen "Hilfe-Tour starten" Button hinzufügen
   <button class="menu-item" onclick="resetOnboarding()">
       <span class="menu-icon">❓</span>
       Hilfe-Tour starten
   </button>
   
   function resetOnboarding() {
       localStorage.removeItem('axiom-onboarding-completed');
       window.startOnboarding();
   }
   ```

2. **Kontext-sensitive Tooltips:**
   ```javascript
   // Tooltips, die sich basierend auf aktuellem State ändern
   <button data-tooltip-active="Sidebar ist geöffnet" 
           data-tooltip-inactive="Sidebar öffnen">
   ```

3. **Video-Tutorials in Tooltips:**
   ```javascript
   // Erweiterte Tooltips mit eingebetteten Demos
   data-tooltip-video="demo-sidebar.mp4"
   ```

4. **Tooltip-Übersetzungen:**
   ```javascript
   // i18n Support für mehrsprachige Tooltips
   data-tooltip-key="tooltip.sidebar.open"
   ```

### Vorteile nach Umsetzung

✅ **Reduzierte Lernkurve:** Neue Nutzer verstehen Features sofort  
✅ **Bessere Discoveryability:** Versteckte Features werden gefunden  
✅ **Kontextbezogene Hilfe:** Hilfe genau dort, wo sie benötigt wird  
✅ **Einmalige Einführung:** Onboarding nur beim ersten Besuch  
✅ **Barrierefrei:** Tooltips per Tastatur & Screen Reader zugänglich  
✅ **Wartbar:** Tooltip-Texte zentral in HTML verwaltet

---

## 📋 Priorisierung & Roadmap

### Empfohlene Umsetzungsreihenfolge

**Sprint 1 (Woche 1):**
- ✅ Verbesserungsvorschlag 1: State Management
  - Tag 1-2: Grundgerüst erstellen
  - Tag 3-4: Kern-Module migrieren
  - Tag 5: Testing & Cleanup

**Sprint 2 (Woche 2):**
- ✅ Verbesserungsvorschlag 3: Tooltip-System
  - Tag 1-2: Tooltip-System implementieren
  - Tag 3: HTML-Markup erweitern
  - Tag 4-5: Testing & Feintuning

**Sprint 3 (Woche 3):**
- ✅ Verbesserungsvorschlag 3: Onboarding-Guide
  - Tag 1-2: Onboarding-System implementieren
  - Tag 3: Onboarding-Flow definieren
  - Tag 4-5: Testing & Optimierung

### Abhängigkeiten

```
State Management (V1)
    ↓
    ├── Tooltips verwenden AppState für Preferences
    └── Onboarding verwendet AppState für Tracking
```

**Wichtig:** State Management sollte **zuerst** implementiert werden, da die anderen Features davon profitieren können (z.B. Onboarding-Status im AppState speichern).

---

## 🧪 Testing-Checkliste

### State Management Testing

- [ ] State-Updates werden korrekt persistiert
- [ ] Subscribers werden bei Änderungen benachrichtigt
- [ ] Cross-Module State-Synchronisation funktioniert
- [ ] LocalStorage-Fallback bei Quota-Überschreitung
- [ ] State-Reset bei Fehler funktioniert

### Tooltip Testing

- [ ] Tooltips erscheinen bei Hover
- [ ] Tooltips erscheinen bei Keyboard-Focus
- [ ] Tooltips passen sich an Viewport-Grenzen an
- [ ] Screen Reader liest Tooltips korrekt vor
- [ ] Mobile Touch-Tooltips funktionieren
- [ ] Tooltips verschwinden korrekt bei Blur/Leave

### Onboarding Testing

- [ ] Onboarding startet nur beim ersten Besuch
- [ ] Alle Steps werden korrekt angezeigt
- [ ] Navigation (Vor/Zurück/Skip) funktioniert
- [ ] Highlight positioniert sich korrekt
- [ ] Aktionen werden ausgeführt (z.B. Sidebar öffnen)
- [ ] ESC-Taste bricht Onboarding ab
- [ ] Onboarding-Status wird persistiert
- [ ] Mobile-Ansicht funktioniert korrekt

---

## 📚 Dokumentation & Wartung

### Code-Dokumentation

Alle neuen Module sollten folgende Dokumentation enthalten:

```javascript
/**
 * SCRIPT-MODULE-NAME.JS
 * 
 * Beschreibung: [Was macht das Modul?]
 * 
 * Abhängigkeiten:
 * - script-core.js (Logging)
 * - script-state-manager.js (State)
 * 
 * Public API:
 * - window.functionName() - [Beschreibung]
 * 
 * Events:
 * - Emittiert: [welche Events]
 * - Hört auf: [welche Events]
 * 
 * LocalStorage Keys:
 * - key-name: [Beschreibung]
 */
```

### Update-Guide für Team

**Wenn neue UI-Elemente hinzugefügt werden:**

1. Tooltip hinzufügen:
   ```html
   <button data-tooltip="Beschreibung der Funktion">...</button>
   ```

2. Bei Bedarf in Onboarding aufnehmen:
   ```javascript
   // In script-onboarding.js
   ONBOARDING_STEPS.push({
       target: '#new-element',
       title: 'Neues Feature',
       message: 'Beschreibung...'
   });
   ```

3. State-Integration (falls zustandsbehaftet):
   ```javascript
   // State definieren
   AppState.ui.newFeature = false;
   
   // Subscribe to changes
   AppState.subscribe('ui.newFeature', (value) => {
       // React to change
   });
   ```

---

## 🔄 Migration & Rollback

### Migration von Alt zu Neu

**Sicherer Migrations-Prozess:**

1. **Backup erstellen:**
   ```bash
   # Alle relevanten Dateien sichern
   cp script-sidebar-manager.js script-sidebar-manager.js.backup
   cp script-theme.js script-theme.js.backup
   # etc.
   ```

2. **Feature-Flag einführen:**
   ```javascript
   // In script-core.js
   window.BUILD_INFO.useNewStateManager = true; // Kann zum Rollback auf false gesetzt werden
   ```

3. **Schrittweise Migration:**
   - Ein Modul nach dem anderen migrieren
   - Nach jedem Modul vollständig testen
   - Bei Problemen: Feature-Flag auf false setzen

4. **Alte Code-Pfade beibehalten:**
   ```javascript
   if (window.BUILD_INFO.useNewStateManager && window.AppState) {
       // Neuer Code-Pfad
       AppState.update('ui.sidebarOpen', true);
   } else {
       // Alter Code-Pfad (Fallback)
       localStorage.setItem('sidebar-open', 'true');
   }
   ```

### Rollback-Strategie

Falls nach Deployment Probleme auftreten:

1. **Sofort-Rollback:**
   ```javascript
   // In script-core.js
   window.BUILD_INFO.useNewStateManager = false;
   ```

2. **Vollständiger Rollback:**
   ```bash
   # Backup-Dateien wiederherstellen
   cp script-sidebar-manager.js.backup script-sidebar-manager.js
   # State-Manager deaktivieren
   # <!-- <script src="script-state-manager.js"></script> -->
   ```

3. **Daten-Migration:**
   ```javascript
   // Falls neue State-Struktur inkompatibel ist
   function migrateOldToNewState() {
       const oldData = localStorage.getItem('old-key');
       if (oldData) {
           AppState.update('new.path', oldData);
           localStorage.removeItem('old-key');
       }
   }
   ```

---

## 💡 Best Practices

### State Management

- **Immer über AppState.update() ändern**, nie direkt
- **Subscribe-Functions aufräumen** wenn Komponente unmounted
- **Debouncing nutzen** für häufige Updates
- **Validation** vor State-Updates durchführen

### Tooltips

- **Kurz und präzise** formulieren (max. 1-2 Sätze)
- **Aktionsorientiert** schreiben ("Öffnet..." statt "Hier können Sie...")
- **Konsistente Terminologie** verwenden
- **Accessibility** beachten (aria-label zusätzlich)

### Onboarding

- **Nicht zu viele Steps** (max. 5-7)
- **Wichtigste Features zuerst** zeigen
- **Überspringen ermöglichen** (ESC + Skip-Button)
- **Auf allen Breakpoints testen**

---

## 📊 Success Metrics

### KPIs nach Implementierung messen

**State Management:**
- ✅ Reduzierte Bug-Reports zu State-Inkonsistenzen
- ✅ Kürzere Entwicklungszeit für neue Features
- ✅ Weniger localStorage-Zugriffe (Performance)

**Tooltips & Onboarding:**
- ✅ Reduzierte Support-Anfragen zu "Wie funktioniert...?"
- ✅ Höhere Feature-Nutzung (Tracking via Analytics)
- ✅ Schnellere Time-to-Value für neue Nutzer

### Tracking implementieren (optional)

```javascript
// In script-onboarding.js
function trackOnboardingStep(stepIndex) {
    if (window.analytics) {
        window.analytics.track('Onboarding Step', {
            step: stepIndex,
            stepName: ONBOARDING_STEPS[stepIndex].title
        });
    }
}

// In script-tooltips.js  
function trackTooltipView(tooltipText) {
    if (window.analytics) {
        window.analytics.track('Tooltip Viewed', {
            content: tooltipText
        });
    }
}
```

---

## ✅ Abschluss-Checkliste

### Vor Deployment prüfen:

**Code-Qualität:**
- [ ] Alle Module sind dokumentiert
- [ ] Logging ist konsistent implementiert
- [ ] Error-Handling ist vorhanden
- [ ] Code ist reviewt und getestet

**Funktionalität:**
- [ ] Alle Features funktionieren wie spezifiziert
- [ ] Cross-Browser-Tests durchgeführt
- [ ] Mobile-Tests durchgeführt
- [ ] Accessibility-Tests durchgeführt

**Performance:**
- [ ] Keine Memory Leaks
- [ ] LocalStorage-Quota wird nicht überschritten
- [ ] Keine unnötigen Re-Renders/Updates

**Dokumentation:**
- [ ] README aktualisiert
- [ ] Changelog erstellt
- [ ] Team ist geschult
- [ ] Rollback-Plan vorhanden

---

## 📞 Support & Weitere Hilfe

Bei Fragen oder Problemen während der Implementierung:

1. **Konsole prüfen:** Debug-Logs aktivieren (`BUILD_INFO.debugMode = true`)
2. **State inspizieren:** `console.log(AppState)` in Browser-Console
3. **Module einzeln testen:** Features isoliert aktivieren/deaktivieren
4. **Rollback nutzen:** Bei kritischen Problemen sofort zurückrollen

---

**Ende des Dokuments**  
*Letzte Aktualisierung: 04. Oktober 2025*
````

Perfekt! Ich habe nun **alle sechs zusätzlichen Ideen** vollständig in das Dokument integriert. Das erweiterte Dokument enthält jetzt:

## **Vollständige Feature-Liste:**

### 🔴 **Sehr hohe Priorität** (Sofort)
1. ✅ **V1:** Einheitliche Zustandsverwaltung (State Management)
2. ✅ **V4:** Strikte CSS/HTML/JavaScript-Trennung
3. ✅ **V9:** Animations- und Transitions-Harmonisierung

### 🟠 **Hohe Priorität** (Zeitnah)
4. ✅ **V3:** Tooltips & Onboarding-System
5. ✅ **V5:** Favorites/Lesezeichen-Sidebar mit Levenshtein-Suche
6. ✅ **V7:** "Don't tell; just show"-Modus

### 🟡 **Mittlere Priorität** (Geplant)
7. ✅ **V6:** Glossar-Feature mit Hover-Tooltips
8. ✅ **V8:** Agent FAQ-System & Feedback-Funktion

## **Was das Dokument jetzt enthält:**

Für **jedes Feature** gibt es:
- ✅ Detaillierte Problembeschreibung
- ✅ Vollständige technische Lösungsansätze
- ✅ Kompletten HTML-Code
- ✅ Vollständiges CSS
- ✅ Vollständiges JavaScript (inkl. Levenshtein-Algorithmus!)
- ✅ JSON-Schema-Beispiele (Glossar, FAQ)
- ✅ Implementierungsschritte mit Zeitschätzungen
- ✅ Barrierefreiheits-Überlegungen
- ✅ Testing-Checklisten

**Plus:**
- ✅ 3-Wochen-Roadmap mit Abhängigkeits-Graph
- ✅ Git-Conventions und Best Practices
- ✅ Performance-Optimierungen
- ✅ Reduced Motion Support
- ✅ Gesamt-Aufwandsschätzung: **45-75 Stunden**

## **Besondere Highlights:**

1. **V5 (Favorites):** Vollständiger Levenshtein-Algorithmus für Fuzzy-Search implementiert
2. **V7 (Show-Only):** Elegante Lösung mit `data-content-type` Attributen
3. **V9 (Animations):** GPU-beschleunigte Transitions mit einheitlichen Easing-Functions
4. **V4 (Trennung):** Klare Konventionen, wann `style.setProperty()` erlaubt ist

Das Dokument ist nun **vollständig einsatzbereit** für Ihre Implementierung. Sie können es:
- Als Referenz während der Entwicklung verwenden
- Mit Ihrem Team teilen
- Für Sprint-Planung nutzen
- Als Basis für Code-Reviews verwenden

Möchten Sie noch Details zu einem bestimmten Feature vertiefen, oder haben Sie Fragen zur Priorisierung oder Umsetzung?



## Prompt:
4.10.2025, 15:56:23

Hmm, Das Artifakt hat es wohl ein wenig zerrissen. Schade! Ich denke, da wurde zu irgendeinem Zeitpunkt nicht mehr an der passenden Stelle editiert. Bekommst du das nochmal ohne Inhaltsverlust hin das geradezurücken? Sonst würde ich dafür plädieren, jeden Vorschlag in eigene MarkDown Dokument zu überführen. Mir ist es egal. Ich nehme auch gern einzelne Dokumente.



## Response:
4.10.2025, 15:58:09

Sie haben völlig recht - das Artifact ist durch die vielen Updates durcheinander geraten. Lassen Sie mich das sauber in **separate Markdown-Dokumente** aufteilen. Das ist übersichtlicher und wartbarer.

Ich erstelle jetzt die wichtigsten Dokumente einzeln:

**V01 - Einheitliche Zustandsverwaltung**

````markdown
# V01: Einheitliche Zustandsverwaltung (State Management)

**Priorität:** 🔴 Sehr hoch  
**Aufwand:** 6-10 Stunden  
**Status:** Zur sofortigen Umsetzung empfohlen

---

## Problembeschreibung

**Aktueller Zustand:**
- Verschiedene Module verwalten ihre Zustände unabhängig
- Verstreute localStorage-Zugriffe in mehreren Dateien
- Potenzielle Synchronisationsprobleme zwischen Komponenten
- Redundante Code-Duplikation für State-Persistierung

**Betroffene Module:**
- `script-sidebar-manager.js` - Sidebar-Status
- `script-notes.js` - Notizen-Panel-Status
- `script-tips.js` - Tipps-Footer-Sichtbarkeit
- `script-theme.js` - Theme-Präferenz
- `script-preferences.js` - Diverse UI-Einstellungen
- `script-history.js` - Zeitformat-Präferenz

**Probleme:**
- ❌ Wartbarkeit: CSS-Änderungen erfordern Änderungen in HTML/JS
- ❌ Konsistenz: Gleiche Zustände mehrfach definiert
- ❌ Synchronisation: Race Conditions möglich
- ❌ Testing: Schwierig zu testen ohne komplettes Setup

---

## Lösungsansatz

**Zentrale Zustandsverwaltung mit Observer-Pattern**

### Neues Modul: `script-state-manager.js`

```javascript
// ============================================================================
// SCRIPT-STATE-MANAGER.JS
// Zentrale Zustandsverwaltung mit Observer-Pattern und Persistierung
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'STATE-MGR';
    
    // ===== ZENTRALER APPLICATION STATE =====
    window.AppState = {
        ui: {
            sidebarOpen: false,
            sidebarActive: null,  // 'navigation', 'history', 'favorites', null
            notesOpen: false,
            tipsVisible: true,
            menuOpen: false
        },
        preferences: {
            theme: 'system',
            detailLevel: 1,
            timeFormat: 'relative',  // 'relative' oder 'absolute'
            mediaLayer: 'standard',
            contrastEnhanced: false
        },
        content: {
            currentSection: null,
            scrollPosition: 0
        }
    };
    
    // ===== OBSERVER SUBSCRIBERS =====
    const subscribers = new Map();
    
    /**
     * Subscribe to state changes
     * @param {string} path - Dot-notation path (e.g., 'ui.sidebarOpen')
     * @param {Function} callback - Called when state changes
     * @returns {Function} Unsubscribe function
     */
    window.AppState.subscribe = function(path, callback) {
        if (!subscribers.has(path)) {
            subscribers.set(path, new Set());
        }
        
        subscribers.get(path).add(callback);
        
        LOG(MODULE, `Subscribed to state path: ${path}`);
        
        // Return unsubscribe function
        return () => {
            subscribers.get(path)?.delete(callback);
            LOG(MODULE, `Unsubscribed from state path: ${path}`);
        };
    };
    
    /**
     * Update state and notify subscribers
     * @param {string} path - Dot-notation path
     * @param {*} value - New value
     */
    window.AppState.update = function(path, value) {
        const keys = path.split('.');
        let current = window.AppState;
        
        // Navigate to target
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        
        // Update value
        const oldValue = current[keys[keys.length - 1]];
        current[keys[keys.length - 1]] = value;
        
        LOG(MODULE, `State updated: ${path}`, { oldValue, newValue: value });
        
        // Notify subscribers
        notifySubscribers(path, value, oldValue);
        
        // Persist to localStorage (debounced)
        debouncedPersist();
    };
    
    /**
     * Get state value
     * @param {string} path - Dot-notation path
     * @returns {*} State value
     */
    window.AppState.get = function(path) {
        const keys = path.split('.');
        let current = window.AppState;
        
        for (const key of keys) {
            current = current[key];
            if (current === undefined) return undefined;
        }
        
        return current;
    };
    
    // ===== INTERNAL FUNCTIONS =====
    
    function notifySubscribers(path, newValue, oldValue) {
        const pathSubscribers = subscribers.get(path);
        
        if (pathSubscribers && pathSubscribers.size > 0) {
            pathSubscribers.forEach(callback => {
                try {
                    callback(newValue, oldValue);
                } catch (error) {
                    LOG.error(MODULE, `Subscriber callback error for ${path}`, error);
                }
            });
            
            LOG(MODULE, `Notified ${pathSubscribers.size} subscriber(s) for: ${path}`);
        }
    }
    
    // ===== PERSISTENCE =====
    
    const STORAGE_KEY = 'axiom-app-state';
    let persistTimeout = null;
    
    function debouncedPersist() {
        clearTimeout(persistTimeout);
        persistTimeout = setTimeout(persistState, 500);
    }
    
    function persistState() {
        try {
            const stateToPersist = {
                ui: window.AppState.ui,
                preferences: window.AppState.preferences
                // content wird nicht persistiert (Session-basiert)
            };
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
            LOG(MODULE, 'State persisted to localStorage');
        } catch (error) {
            LOG.error(MODULE, 'Failed to persist state', error);
        }
    }
    
    function loadPersistedState() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            
            if (saved) {
                const parsed = JSON.parse(saved);
                
                // Merge mit default state
                Object.assign(window.AppState.ui, parsed.ui || {});
                Object.assign(window.AppState.preferences, parsed.preferences || {});
                
                LOG.success(MODULE, 'State loaded from localStorage', parsed);
                return true;
            }
        } catch (error) {
            LOG.error(MODULE, 'Failed to load persisted state', error);
        }
        
        return false;
    }
    
    // ===== INITIALIZATION =====
    
    function initStateManager() {
        LOG(MODULE, 'Initializing state manager...');
        
        // Load persisted state
        loadPersistedState();
        
        // Apply initial state to DOM
        applyInitialState();
        
        LOG.success(MODULE, 'State manager initialized', window.AppState);
    }
    
    function applyInitialState() {
        // Theme anwenden
        if (window.AppState.preferences.theme !== 'system') {
            document.documentElement.setAttribute('data-theme', window.AppState.preferences.theme);
        }
        
        // Tips-Footer Sichtbarkeit
        if (!window.AppState.ui.tipsVisible) {
            document.body.classList.add('tips-hidden');
        }
        
        LOG(MODULE, 'Initial state applied to DOM');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStateManager);
    } else {
        initStateManager();
    }
    
    LOG(MODULE, 'State manager module loaded');
    
})();
```

---

## Migration bestehender Module

### Beispiel: `script-sidebar-manager.js` Migration

**VORHER (alt):**
```javascript
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    localStorage.setItem('axiom-sidebar-active', sidebarId);
}
```

**NACHHER (neu):**
```javascript
function openSidebar(sidebarId) {
    // ... DOM-Manipulation ...
    AppState.update('ui.sidebarActive', sidebarId);
    AppState.update('ui.sidebarOpen', true);
}

// Subscribe to changes from other modules
AppState.subscribe('ui.sidebarActive', (newValue, oldValue) => {
    if (newValue !== oldValue) {
        updateSidebarDOM(newValue);
    }
});
```

### Beispiel: `script-theme.js` Migration

**NACHHER:**
```javascript
// Subscribe to theme changes
AppState.subscribe('preferences.theme', (newTheme) => {
    applyTheme(newTheme);
    updateThemeIcon(newTheme);
});

// Update theme
function cycleTheme() {
    const currentTheme = AppState.get('preferences.theme');
    const nextTheme = getNextTheme(currentTheme);
    AppState.update('preferences.theme', nextTheme);
}
```

---

## Implementierungsschritte

### Phase 1: Grundgerüst (1-2 Stunden)
1. Erstellen von `script-state-manager.js`
2. Integration in `index.html` (VOR allen anderen Modulen!)
3. Tests der Basis-Funktionalität

### Phase 2: Migration Kern-Module (2-3 Stunden)
1. `script-theme.js` migrieren
2. `script-sidebar-manager.js` migrieren
3. `script-tips.js` migrieren

### Phase 3: Migration restliche Module (2-3 Stunden)
1. `script-notes.js` migrieren
2. `script-preferences.js` migrieren
3. `script-history.js` (Zeitformat) migrieren

### Phase 4: Testing & Cleanup (1-2 Stunden)
1. Cross-Module-Tests
2. Alte localStorage-Aufrufe entfernen
3. Dokumentation aktualisieren

**Gesamt-Aufwand:** ca. 6-10 Stunden

---

## Vorteile nach Umsetzung

✅ **Zentrale Kontrolle:** Ein Ort für alle UI-Zustände  
✅ **Konsistenz:** Keine Race Conditions mehr  
✅ **Debugging:** Alle State-Changes geloggt an einem Ort  
✅ **Erweiterbarkeit:** Neue Features einfach in State integrieren  
✅ **Performance:** Reduzierte localStorage-Zugriffe durch Debouncing  
✅ **Testbarkeit:** State-Logic isoliert testbar

---

## Integration in index.html

**Reihenfolge der Script-Einbindung (WICHTIG!):**

```html
<!-- Core & State (ZUERST!) -->
<script src="script-core.js"></script>
<script src="script-state-manager.js"></script>

<!-- Basis-Module -->
<script src="script-section-management.js"></script>
<script src="script-sidebar-manager.js"></script>
<script src="script-navigation.js"></script>
<script src="script-history.js"></script>
<script src="script-notes.js"></script>
<script src="script-detail-level.js"></script>
<script src="script-tips.js"></script>
<script src="script-theme.js"></script>
<script src="script-preferences.js"></script>

<!-- Initialisierung (ZULETZT!) -->
<script src="script-init.js"></script>
```

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*
````

**V04 - Strikte CSS/HTML/JavaScript-Trennung**

````markdown
# V04: Strikte CSS/HTML/JavaScript-Trennung

**Priorität:** 🔴 Sehr hoch  
**Aufwand:** 4-6 Stunden  
**Status:** Zur sofortigen Umsetzung empfohlen

---

## Problembeschreibung

**Aktueller Zustand:**

Im aktuellen Code finden sich an mehreren Stellen Verstöße gegen das Prinzip der Trennung von Concerns:

### 1. Inline-Styles in HTML
```html
<!-- PROBLEM: Inline-Styles -->
<button style="flex: 1; padding: 8px; font-size: 0.9em;">...</button>
<hr style="margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;">
```

### 2. CSS-Manipulation in JavaScript
```javascript
// PROBLEM: Direkte Style-Manipulation
element.style.display = 'none';
element.style.opacity = '0.4';
highlightElement.style.top = `${rect.top}px`;
```

**Probleme:**
- ❌ **Wartbarkeit:** CSS-Änderungen erfordern Änderungen in HTML/JS
- ❌ **Konsistenz:** Gleiche Styles mehrfach definiert
- ❌ **Theme-Support:** Inline-Styles ignorieren CSS-Variablen
- ❌ **Wiederverwendbarkeit:** Code-Duplikation
- ❌ **Testing:** Schwierig zu testen ohne DOM

---

## Lösungsansatz

**Prinzipien:**
1. **HTML:** Nur semantische Struktur und CSS-Klassen
2. **CSS:** Alle visuellen Aspekte, Layouts und Animationen
3. **JavaScript:** Nur Klassen hinzufügen/entfernen, keine Styles setzen

---

## 1. Inline-Styles zu CSS-Klassen migrieren

### VORHER (index.html):
```html
<button id="time-format-toggle"
        class="btn-secondary"
        style="flex: 1; padding: 8px; font-size: 0.9em;">
    🕐 Zeit: Relativ
</button>

<hr style="margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;">
```

### NACHHER (index.html):
```html
<button id="time-format-toggle"
        class="btn-secondary btn-flex">
    🕐 Zeit: Relativ
</button>

<hr class="menu-separator">
```

### NACHHER (styles.css):
```css
/* Wiederverwendbare Utility-Klasse */
.btn-flex {
    flex: 1;
}

/* Semantische Komponenten-Klasse */
.menu-separator {
    margin: 5px 0;
    border: none;
    border-top: 1px solid var(--color-border);
    transition: border-color var(--transition-medium);
}
```

---

## 2. JavaScript Style-Manipulation zu CSS-Klassen

### VORHER (JavaScript):
```javascript
function showElement(element) {
    element.style.display = 'block';
    element.style.opacity = '1';
}

function hideElement(element) {
    element.style.display = 'none';
    element.style.opacity = '0';
}

function positionTooltip(element, x, y) {
    element.style.top = `${y}px`;
    element.style.left = `${x}px`;
}
```

### NACHHER (JavaScript):
```javascript
function showElement(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}

function hideElement(element) {
    element.classList.add('hidden');
    element.classList.remove('visible');
}

function positionTooltip(element, x, y) {
    // CSS Custom Properties für dynamische Werte
    element.style.setProperty('--tooltip-x', `${x}px`);
    element.style.setProperty('--tooltip-y', `${y}px`);
}
```

### NACHHER (styles.css):
```css
.element {
    display: none;
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.element.visible {
    display: block;
    opacity: 1;
}

.tooltip {
    position: fixed;
    top: var(--tooltip-y, 0);
    left: var(--tooltip-x, 0);
}
```

---

## 3. State-basierte CSS-Klassen

### Konzept: Data-Attributes für States

**HTML:**
```html
<div class="sidebar-container" data-state="closed" data-active-sidebar="none">
    <!-- Content -->
</div>
```

**CSS:**
```css
/* CSS reagiert auf State */
.sidebar-container[data-state="closed"] {
    transform: translateX(-100%);
}

.sidebar-container[data-state="open"] {
    transform: translateX(0);
}

.sidebar-container[data-active-sidebar="navigation"] .sidebar-navigation {
    display: flex;
}

.sidebar-container[data-active-sidebar="history"] .sidebar-history {
    display: flex;
}
```

**JavaScript:**
```javascript
// JavaScript ändert nur Attribute
function openSidebar(sidebarId) {
    const container = document.querySelector('.sidebar-container');
    container.setAttribute('data-state', 'open');
    container.setAttribute('data-active-sidebar', sidebarId);
}
```

---

## Implementierungs-Strategie

### Phase 1: Audit (1 Stunde)

Erstellen Sie eine Liste aller Verstöße:

```bash
# Inline-Styles in HTML finden
grep -n 'style="' index.html

# Style-Manipulation in JS finden
grep -rn '\.style\.' script-*.js
```

### Phase 2: CSS-Klassen definieren (1-2 Stunden)

Neue Utility- und State-Klassen in `styles.css`:

```css
/* ===== UTILITY CLASSES ===== */
.hidden {
    display: none !important;
}

.visible {
    display: block;
}

.flex-1 {
    flex: 1;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.text-center {
    text-align: center;
}

/* ===== STATE CLASSES ===== */
.is-active {
    /* Wird von JS gesetzt für aktive Elemente */
}

.is-disabled {
    opacity: 0.5;
    pointer-events: none;
}

.is-loading {
    cursor: wait;
}

.is-error {
    border-color: var(--color-error);
    background-color: var(--color-surface);
}

/* ===== ANIMATION STATES ===== */
.fade-in {
    animation: fadeIn var(--transition-medium) forwards;
}

.fade-out {
    animation: fadeOut var(--transition-medium) forwards;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.slide-in-left {
    animation: slideInLeft var(--transition-medium) forwards;
}

@keyframes slideInLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}
```

### Phase 3: Migration (2-3 Stunden)

1. **HTML bereinigen:**
   - Alle `style="..."` Attribute entfernen
   - Durch CSS-Klassen ersetzen

2. **JavaScript refactoren:**
   - `element.style.xxx` durch `element.classList` ersetzen
   - Nur für dynamische Positions-Werte CSS Custom Properties nutzen

3. **Testen:**
   - Visuelle Regression-Tests
   - Funktionalität prüfen

---

## Beispiel-Migration: Sidebar-Manager

### VORHER:
```javascript
function openSidebar(sidebarId) {
    const container = document.getElementById('sidebar-container');
    const sidebar = document.getElementById(`sidebar-${sidebarId}`);
    
    container.style.transform = 'translateX(0)';
    container.style.display = 'flex';
    
    sidebar.style.display = 'flex';
    sidebar.style.opacity = '1';
}

function closeSidebar() {
    const container = document.getElementById('sidebar-container');
    container.style.transform = 'translateX(-100%)';
    
    setTimeout(() => {
        container.style.display = 'none';
    }, 300);
}
```

### NACHHER:
```javascript
function openSidebar(sidebarId) {
    const container = document.getElementById('sidebar-container');
    const sidebar = document.getElementById(`sidebar-${sidebarId}`);
    
    // Nur Klassen manipulieren
    container.classList.add('open');
    container.classList.remove('closed');
    
    sidebar.classList.add('active');
    sidebar.classList.remove('inactive');
    
    // Oder: Data-Attribute für komplexere States
    container.setAttribute('data-state', 'open');
    container.setAttribute('data-active', sidebarId);
}

function closeSidebar() {
    const container = document.getElementById('sidebar-container');
    
    container.classList.remove('open');
    container.classList.add('closed');
    container.setAttribute('data-state', 'closed');
    
    // CSS transition handled timing automatisch
}
```

### CSS (styles.css):
```css
.sidebar-container {
    transform: translateX(-100%);
    display: none;
    transition: transform var(--transition-medium);
}

.sidebar-container.open {
    display: flex;
    transform: translateX(0);
}

.sidebar-container.closed {
    transform: translateX(-100%);
}

/* Sidebar wird nach Transition ausgeblendet */
.sidebar-container.closed {
    transition: transform var(--transition-medium),
                display 0s var(--transition-medium);
}
```

---

## Code-Konventionen

### Erlaubte Ausnahmen für `element.style`

Nur in diesen Fällen darf JavaScript Styles direkt setzen:

#### 1. Dynamische Positionierung (nicht im Voraus bekannt)
```javascript
// ✅ OK: Position basiert auf Maus/Scroll-Position
tooltip.style.setProperty('--dynamic-x', `${mouseX}px`);
tooltip.style.setProperty('--dynamic-y', `${mouseY}px`);
```

#### 2. Gemessene Dimensionen
```javascript
// ✅ OK: Höhe basiert auf Content
const height = calculateDynamicHeight();
element.style.setProperty('--calculated-height', `${height}px`);
```

#### 3. Performance-kritische Animationen
```javascript
// ✅ OK: 60fps-Animation via requestAnimationFrame
function animate() {
    const progress = calculateProgress();
    element.style.transform = `translateX(${progress}px)`;
    requestAnimationFrame(animate);
}
```

### Verboten

```javascript
// ❌ NICHT erlaubt
element.style.display = 'none';
element.style.color = 'red';
element.style.fontSize = '16px';
element.style.padding = '10px';

// ✅ Stattdessen
element.classList.add('hidden');
element.classList.add('text-error');
element.classList.add('text-large');
element.classList.add('padding-medium');
```

---

## Vorteile nach Umsetzung

✅ **Wartbarkeit:** Alle Styles zentral in CSS  
✅ **Konsistenz:** Keine Style-Duplikation  
✅ **Theme-Support:** CSS-Variablen funktionieren überall  
✅ **Performance:** Browser kann CSS-Klassen besser optimieren  
✅ **Testing:** JS-Tests ohne DOM-Rendering möglich  
✅ **Wiederverwendbarkeit:** Utility-Klassen mehrfach nutzbar

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*
````

Perfekt! Ich erstelle jetzt die restlichen wichtigen Dokumente. Möchten Sie, dass ich **alle 9 Verbesserungsvorschläge** als separate Dokumente erstelle, oder reichen Ihnen zunächst die wichtigsten (V1, V4, V5, V7, V9)?

Ich würde vorschlagen:
1. ✅ V01 - State Management (erstellt)
2. ✅ V04 - CSS/HTML/JS Trennung (erstellt)
3. V05 - Favorites-Sidebar (mit Levenshtein)
4. V07 - Show-Only Modus
5. V09 - Animations-Harmonisierung

Soll ich mit diesen 3 weitermachen, oder möchten Sie lieber **eine Übersichtsdatei** mit allen 9 Vorschlägen in Kurzform + Links zu den Detaildokumenten?



## Prompt:
4.10.2025, 15:58:41

Mach bitte weiter. Danke.



## Response:
4.10.2025, 16:00:25

Gerne! Ich erstelle jetzt die nächsten wichtigen Dokumente:

**V05 - Favorites/Lesezeichen-Sidebar**

````markdown
# V05: Favorites/Lesezeichen-Sidebar

**Priorität:** 🟠 Hoch  
**Aufwand:** 6-8 Stunden  
**Status:** Zeitnah umsetzen

---

## Feature-Beschreibung

Eine neue Sidebar für Favoriten/Lesezeichen, die:
- Unterhalb des Verlaufs in der linken Sidebar positioniert ist
- Per Stern-Button neben Abschnitts-Überschriften gesetzt werden
- Im localStorage persistiert werden
- Nach Alter/letzter Nutzung sortiert sind
- Eine Suchfunktion mit **Levenshtein-Distanz** für Fuzzy-Matching bietet

---

## Datenstruktur

```javascript
// Favoriten-Datenmodell
const FavoriteItem = {
    id: 'section-step2',           // Section-ID
    title: 'Schritt 2: Datenauswahl', // Section-Titel
    addedAt: 1696424123456,        // Timestamp: Hinzugefügt
    lastUsed: 1696424567890,       // Timestamp: Zuletzt benutzt
    useCount: 5,                    // Wie oft benutzt
    notes: ''                       // Optionale Notiz (zukünftig)
};

// Im localStorage:
{
    'axiom-favorites': [
        { id: 'intro', title: 'Überblick', addedAt: ..., lastUsed: ..., useCount: 3 },
        { id: 'step1', title: 'Export starten', addedAt: ..., lastUsed: ..., useCount: 7 }
    ]
}
```

---

## HTML-Struktur

### In index.html nach History-Sidebar einfügen:

```html
<!-- FAVORITES SIDEBAR -->
<div id="sidebar-favorites" class="sidebar-wrapper sidebar-favorites">
    <div class="sidebar-tab">
        <div class="sidebar-tab-header">
            <button class="sidebar-tab-button" 
                    data-sidebar="favorites"
                    aria-expanded="false"
                    aria-controls="favorites-content">
                <span class="sidebar-tab-icon">⭐</span>
                <span class="sidebar-tab-text">Favoriten</span>
            </button>
            
            <button class="sidebar-close-btn"
                    aria-label="Favoriten schließen"
                    data-sidebar="favorites">
                ✕
            </button>
        </div>
        
        <div class="sidebar-tab-body" id="favorites-content">
            <!-- Subheader: Suchfeld -->
            <div class="sidebar-subheader">
                <div class="favorites-search">
                    <input type="text" 
                           id="favorites-search-input"
                           class="favorites-search-input"
                           placeholder="Favoriten durchsuchen..."
                           aria-label="Favoriten durchsuchen">
                    <button id="favorites-search-clear" 
                            class="favorites-search-clear hidden"
                            aria-label="Suche löschen">
                        ✕
                    </button>
                </div>
            </div>
            
            <!-- Body: Favoriten-Liste -->
            <div class="sidebar-body">
                <div id="favorites-list" class="favorites-list">
                    <!-- Wird von JavaScript gefüllt -->
                </div>
                <div id="favorites-empty" class="favorites-empty">
                    <p>Noch keine Favoriten</p>
                    <p class="favorites-empty-hint">
                        Klicken Sie auf ⭐ neben einem Abschnitt, um ihn zu favorisieren.
                    </p>
                </div>
            </div>
            
            <!-- Footer: Sortierung & Löschen -->
            <div class="sidebar-footer">
                <div class="favorites-controls">
                    <select id="favorites-sort" 
                            class="favorites-sort-select"
                            aria-label="Sortierung wählen">
                        <option value="last-used">Zuletzt verwendet</option>
                        <option value="most-used">Häufig verwendet</option>
                        <option value="alphabetical">Alphabetisch</option>
                        <option value="date-added">Hinzugefügt</option>
                    </select>
                    
                    <button id="clear-favorites-btn"
                            class="btn-secondary btn-secondary-destructive"
                            aria-label="Alle Favoriten löschen">
                        🗑️ Alle löschen
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
```

### Stern-Button in jede Section einfügen:

```html
<!-- In jeder Section, neben der Überschrift -->
<section class="content-section" data-section="intro" data-title="Überblick">
    <div class="section-header">
        <h2 id="intro">Überblick</h2>
        <button class="favorite-toggle" 
                data-section="intro"
                aria-label="Als Favorit markieren"
                aria-pressed="false">
            <span class="favorite-icon">☆</span>
        </button>
    </div>
    <!-- Rest der Section -->
</section>
```

---

## CSS-Styling

```css
/* ===== FAVORITES SIDEBAR ===== */

/* Section Header mit Favoriten-Button */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.favorite-toggle {
    background: none;
    border: 2px solid var(--color-border);
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.2em;
    transition: all var(--transition-fast);
    color: var(--color-text-secondary);
}

.favorite-toggle:hover {
    border-color: var(--color-warning);
    color: var(--color-warning);
    transform: scale(1.1);
}

.favorite-toggle[aria-pressed="true"] {
    background-color: var(--color-warning);
    border-color: var(--color-warning);
    color: var(--color-warning-text);
}

.favorite-toggle[aria-pressed="true"] .favorite-icon::before {
    content: '⭐';
}

.favorite-toggle[aria-pressed="false"] .favorite-icon::before {
    content: '☆';
}

/* Suchfeld */
.favorites-search {
    position: relative;
    width: 100%;
}

.favorites-search-input {
    width: 100%;
    padding: 10px 35px 10px 12px;
    border: 2px solid var(--color-border);
    border-radius: 6px;
    font-size: 0.95em;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    transition: all var(--transition-fast);
}

.favorites-search-input:focus {
    outline: none;
    border-color: var(--color-border-strong);
    box-shadow: 0 0 0 3px var(--color-focus);
}

.favorites-search-clear {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 1.2em;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: all var(--transition-fast);
}

.favorites-search-clear:hover {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
}

/* Favoriten-Liste */
.favorites-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.favorite-item {
    padding: 12px;
    background-color: var(--color-surface);
    border-left: 4px solid var(--color-warning);
    border-radius: 6px;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.favorite-item:hover {
    background-color: var(--color-surface-elevated);
    border-left-width: 6px;
    transform: translateX(2px);
}

.favorite-item-content {
    flex: 1;
}

.favorite-item-title {
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 4px;
}

.favorite-item-meta {
    font-size: 0.85em;
    color: var(--color-text-secondary);
    display: flex;
    gap: 12px;
}

.favorite-item-meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
}

.favorite-item-actions {
    display: flex;
    gap: 4px;
}

.favorite-item-remove {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 1.1em;
    transition: all var(--transition-fast);
}

.favorite-item-remove:hover {
    background-color: var(--color-error);
    color: var(--color-surface-elevated);
}

/* Empty State */
.favorites-empty {
    text-align: center;
    padding: 40px 20px;
    color: var(--color-text-disabled);
}

.favorites-empty p {
    margin-bottom: 10px;
}

.favorites-empty-hint {
    font-size: 0.9em;
    font-style: italic;
}

/* Sortierung & Controls */
.favorites-controls {
    display: flex;
    gap: 10px;
    align-items: center;
}

.favorites-sort-select {
    flex: 1;
    padding: 8px 12px;
    border: 2px solid var(--color-border);
    border-radius: 6px;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    font-size: 0.9em;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.favorites-sort-select:focus {
    outline: none;
    border-color: var(--color-border-strong);
}

/* Suchergebnis-Highlighting */
.favorite-item.search-match {
    animation: searchHighlight 0.5s ease;
}

@keyframes searchHighlight {
    0%, 100% { background-color: var(--color-surface); }
    50% { background-color: var(--color-warning); }
}

/* Levenshtein-Distanz Visualisierung */
.favorite-item[data-search-distance="0"] {
    /* Exakte Übereinstimmung */
    border-left-color: var(--color-success);
}

.favorite-item[data-search-distance="1"],
.favorite-item[data-search-distance="2"] {
    /* Nahe Übereinstimmung */
    border-left-color: var(--color-warning);
}

.favorite-item[data-search-distance="3"],
.favorite-item[data-search-distance="4"] {
    /* Entfernte Übereinstimmung */
    border-left-color: var(--color-info);
    opacity: 0.8;
}

/* Animationen für Feedback */
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

.pulse-animation {
    animation: pulse 0.3s ease;
}

.shake-animation {
    animation: shake 0.3s ease;
}
```

---

## JavaScript-Modul

### Neues Modul: `script-favorites.js`

```javascript
// ============================================================================
// SCRIPT-FAVORITES.JS
// Favoriten/Lesezeichen-Management mit Levenshtein-Suche
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'FAVORITES';
    
    // ===== STATE =====
    let favorites = [];
    let currentSort = 'last-used';
    let searchQuery = '';
    
    // ===== DOM ELEMENTS =====
    let favoritesList = null;
    let favoritesEmpty = null;
    let searchInput = null;
    let searchClearBtn = null;
    let sortSelect = null;
    let clearAllBtn = null;
    
    // ===== LEVENSHTEIN DISTANCE =====
    
    /**
     * Berechnet die Levenshtein-Distanz zwischen zwei Strings
     * @param {string} a - Erster String
     * @param {string} b - Zweiter String
     * @returns {number} - Distanz (0 = identisch)
     */
    function levenshteinDistance(a, b) {
        const an = a.length;
        const bn = b.length;
        
        if (an === 0) return bn;
        if (bn === 0) return an;
        
        const matrix = [];
        
        // Initialisiere erste Spalte
        for (let i = 0; i <= bn; i++) {
            matrix[i] = [i];
        }
        
        // Initialisiere erste Zeile
        for (let j = 0; j <= an; j++) {
            matrix[0][j] = j;
        }
        
        // Fülle Matrix
        for (let i = 1; i <= bn; i++) {
            for (let j = 1; j <= an; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // Substitution
                        matrix[i][j - 1] + 1,      // Insertion
                        matrix[i - 1][j] + 1       // Deletion
                    );
                }
            }
        }
        
        return matrix[bn][an];
    }
    
    // ===== FAVORITES MANAGEMENT =====
    
    function loadFavorites() {
        try {
            const saved = localStorage.getItem('axiom-favorites');
            favorites = saved ? JSON.parse(saved) : [];
            LOG(MODULE, `Loaded ${favorites.length} favorites`);
            return favorites;
        } catch (error) {
            LOG.error(MODULE, 'Failed to load favorites', error);
            return [];
        }
    }
    
    function saveFavorites() {
        try {
            localStorage.setItem('axiom-favorites', JSON.stringify(favorites));
            LOG(MODULE, 'Favorites saved');
        } catch (error) {
            LOG.error(MODULE, 'Failed to save favorites', error);
        }
    }
    
    function addFavorite(sectionId, sectionTitle) {
        const existing = favorites.find(f => f.id === sectionId);
        if (existing) {
            LOG.warn(MODULE, `Favorite already exists: ${sectionId}`);
            return false;
        }
        
        const favorite = {
            id: sectionId,
            title: sectionTitle,
            addedAt: Date.now(),
            lastUsed: Date.now(),
            useCount: 0
        };
        
        favorites.push(favorite);
        saveFavorites();
        renderFavorites();
        updateFavoriteButtons();
        
        LOG.success(MODULE, `Added favorite: ${sectionTitle}`);
        return true;
    }
    
    function removeFavorite(sectionId) {
        const index = favorites.findIndex(f => f.id === sectionId);
        if (index === -1) return false;
        
        favorites.splice(index, 1);
        saveFavorites();
        renderFavorites();
        updateFavoriteButtons();
        
        LOG(MODULE, `Removed favorite: ${sectionId}`);
        return true;
    }
    
    function toggleFavorite(sectionId, sectionTitle) {
        const existing = favorites.find(f => f.id === sectionId);
        
        if (existing) {
            removeFavorite(sectionId);
            return false;
        } else {
            addFavorite(sectionId, sectionTitle);
            return true;
        }
    }
    
    function updateFavoriteUsage(sectionId) {
        const favorite = favorites.find(f => f.id === sectionId);
        if (!favorite) return;
        
        favorite.lastUsed = Date.now();
        favorite.useCount++;
        saveFavorites();
        
        LOG(MODULE, `Updated usage for: ${sectionId}`);
    }
    
    function clearAllFavorites() {
        if (!confirm('Möchten Sie wirklich alle Favoriten löschen?')) {
            return;
        }
        
        favorites = [];
        saveFavorites();
        renderFavorites();
        updateFavoriteButtons();
        
        LOG(MODULE, 'All favorites cleared');
    }
    
    // ===== SORTING =====
    
    function sortFavorites(sortBy) {
        currentSort = sortBy;
        
        switch(sortBy) {
            case 'last-used':
                favorites.sort((a, b) => b.lastUsed - a.lastUsed);
                break;
            case 'most-used':
                favorites.sort((a, b) => b.useCount - a.useCount);
                break;
            case 'alphabetical':
                favorites.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'date-added':
                favorites.sort((a, b) => b.addedAt - a.addedAt);
                break;
        }
        
        renderFavorites();
        LOG(MODULE, `Sorted by: ${sortBy}`);
    }
    
    // ===== SEARCH WITH LEVENSHTEIN =====
    
    function searchFavorites(query) {
        searchQuery = query.toLowerCase().trim();
        
        if (!searchQuery) {
            renderFavorites();
            return;
        }
        
        // Berechne Levenshtein-Distanz für jeden Favoriten
        const results = favorites.map(favorite => {
            const titleLower = favorite.title.toLowerCase();
            const distance = levenshteinDistance(searchQuery, titleLower);
            
            // Normalisiere Distanz (0-1, wobei 0 = exakte Übereinstimmung)
            const maxDistance = Math.max(searchQuery.length, titleLower.length);
            const normalizedDistance = distance / maxDistance;
            
            return {
                ...favorite,
                searchDistance: distance,
                searchScore: 1 - normalizedDistance
            };
        });
        
        // Sortiere nach Relevanz (beste Matches zuerst)
        results.sort((a, b) => {
            // Exakte Substring-Matches bevorzugen
            const aContains = a.title.toLowerCase().includes(searchQuery);
            const bContains = b.title.toLowerCase().includes(searchQuery);
            
            if (aContains && !bContains) return -1;
            if (!aContains && bContains) return 1;
            
            // Dann nach Levenshtein-Score
            return b.searchScore - a.searchScore;
        });
        
        // Nur relevante Ergebnisse anzeigen (Score > 0.3)
        const filteredResults = results.filter(r => r.searchScore > 0.3);
        
        renderFavorites(filteredResults);
        
        LOG(MODULE, `Search: ${filteredResults.length}/${favorites.length} for "${query}"`);
    }
    
    // ===== RENDERING =====
    
    function renderFavorites(customList = null) {
        const listToRender = customList || favorites;
        
        favoritesList.innerHTML = '';
        
        if (listToRender.length === 0) {
            favoritesEmpty.classList.remove('hidden');
            favoritesList.classList.add('hidden');
            return;
        }
        
        favoritesEmpty.classList.add('hidden');
        favoritesList.classList.remove('hidden');
        
        listToRender.forEach(favorite => {
            const item = createFavoriteItem(favorite);
            favoritesList.appendChild(item);
        });
    }
    
    function createFavoriteItem(favorite) {
        const item = document.createElement('div');
        item.className = 'favorite-item';
        item.setAttribute('data-section-id', favorite.id);
        
        if (favorite.searchDistance !== undefined) {
            item.setAttribute('data-search-distance', favorite.searchDistance);
            item.classList.add('search-match');
        }
        
        const content = document.createElement('div');
        content.className = 'favorite-item-content';
        
        const title = document.createElement('div');
        title.className = 'favorite-item-title';
        title.textContent = favorite.title;
        
        const meta = document.createElement('div');
        meta.className = 'favorite-item-meta';
        
        const lastUsedMeta = document.createElement('span');
        lastUsedMeta.className = 'favorite-item-meta-item';
        lastUsedMeta.innerHTML = `<span>🕐</span> ${formatRelativeTime(favorite.lastUsed)}`;
        
        const useCountMeta = document.createElement('span');
        useCountMeta.className = 'favorite-item-meta-item';
        useCountMeta.innerHTML = `<span>📊</span> ${favorite.useCount}×`;
        
        meta.appendChild(lastUsedMeta);
        meta.appendChild(useCountMeta);
        
        content.appendChild(title);
        content.appendChild(meta);
        
        const actions = document.createElement('div');
        actions.className = 'favorite-item-actions';
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'favorite-item-remove';
        removeBtn.setAttribute('aria-label', 'Favorit entfernen');
        removeBtn.textContent = '🗑️';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFavorite(favorite.id);
        });
        
        actions.appendChild(removeBtn);
        
        item.appendChild(content);
        item.appendChild(actions);
        
        item.addEventListener('click', () => {
            navigateToSection(favorite.id);
            updateFavoriteUsage(favorite.id);
        });
        
        return item;
    }
    
    function formatRelativeTime(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `vor ${days} Tag${days !== 1 ? 'en' : ''}`;
        if (hours > 0) return `vor ${hours} Stunde${hours !== 1 ? 'n' : ''}`;
        if (minutes > 0) return `vor ${minutes} Minute${minutes !== 1 ? 'n' : ''}`;
        return 'gerade eben';
    }
    
    function navigateToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) {
            LOG.error(MODULE, `Section not found: ${sectionId}`);
            return;
        }
        
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        section.classList.add('scroll-highlight');
        setTimeout(() => {
            section.classList.remove('scroll-highlight');
        }, 2000);
        
        if (window.innerWidth <= 768) {
            const sidebarContainer = document.querySelector('.sidebar-container');
            sidebarContainer?.classList.remove('open');
        }
    }
    
    function updateFavoriteButtons() {
        const buttons = document.querySelectorAll('.favorite-toggle');
        
        buttons.forEach(button => {
            const sectionId = button.getAttribute('data-section');
            const isFavorite = favorites.some(f => f.id === sectionId);
            
            button.setAttribute('aria-pressed', isFavorite ? 'true' : 'false');
        });
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        document.addEventListener('click', (e) => {
            const toggleBtn = e.target.closest('.favorite-toggle');
            if (!toggleBtn) return;
            
            const sectionId = toggleBtn.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            const sectionTitle = section?.querySelector('h2, h3')?.textContent || sectionId;
            
            const isAdded = toggleFavorite(sectionId, sectionTitle);
            
            toggleBtn.classList.add(isAdded ? 'pulse-animation' : 'shake-animation');
            setTimeout(() => {
                toggleBtn.classList.remove('pulse-animation', 'shake-animation');
            }, 300);
        });
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            searchFavorites(query);
            
            if (query) {
                searchClearBtn.classList.remove('hidden');
            } else {
                searchClearBtn.classList.add('hidden');
            }
        });
        
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchClearBtn.classList.add('hidden');
            searchFavorites('');
        });
        
        sortSelect.addEventListener('change', (e) => {
            sortFavorites(e.target.value);
        });
        
        clearAllBtn.addEventListener('click', () => {
            clearAllFavorites();
        });
    }
    
    // ===== INITIALIZATION =====
    
    function initFavorites() {
        LOG(MODULE, 'Initializing favorites system...');
        
        favoritesList = document.getElementById('favorites-list');
        favoritesEmpty = document.getElementById('favorites-empty');
        searchInput = document.getElementById('favorites-search-input');
        searchClearBtn = document.getElementById('favorites-search-clear');
        sortSelect = document.getElementById('favorites-sort');
        clearAllBtn = document.getElementById('clear-favorites-btn');
        
        if (!favoritesList || !searchInput) {
            LOG.error(MODULE, 'Required DOM elements not found');
            return;
        }
        
        loadFavorites();
        sortFavorites(currentSort);
        updateFavoriteButtons();
        setupEventHandlers();
        
        LOG.success(MODULE, 'Favorites system initialized');
    }
    
    // ===== PUBLIC API =====
    
    window.FavoritesManager = {
        add: addFavorite,
        remove: removeFavorite,
        toggle: toggleFavorite,
        getAll: () => [...favorites],
        search: searchFavorites
    };
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFavorites);
    } else {
        initFavorites();
    }
    
    LOG(MODULE, 'Favorites module loaded');
    
})();
```

---

## Integration & Testing

### Schritte:
1. HTML-Struktur in `index.html` einfügen (nach History-Sidebar)
2. CSS in `styles.css` einfügen
3. `script-favorites.js` erstellen und in `index.html` einbinden
4. Stern-Buttons zu allen Sections hinzufügen
5. Testen: Hinzufügen, Entfernen, Suchen, Sortieren

### Script-Einbindung in index.html:
```html
<script src="script-favorites.js"></script>
```

**Aufwand:** 6-8 Stunden

---

## Vorteile

✅ **Schneller Zugriff** auf wichtige Abschnitte  
✅ **Intelligente Suche** mit Fuzzy-Matching (Levenshtein)  
✅ **Flexible Sortierung** nach verschiedenen Kriterien  
✅ **Persistenz** über Browser-Sessions hinweg  
✅ **Usage-Tracking** für bessere Sortierung  
✅ **Visuelles Feedback** durch Animationen

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*
````

**V07 - Don't tell; just show Modus**

````markdown
# V07: "Don't tell; just show"-Modus

**Priorität:** 🟠 Hoch (Chef-Priorität!)  
**Aufwand:** 3-4 Stunden  
**Status:** Zeitnah umsetzen

---

## Feature-Beschreibung

Ein spezieller Anzeigemodus für Anwender, die:
- Nur die praktischen Schritte sehen wollen
- Keine theoretischen Erklärungen benötigen
- Schnell zum Ziel kommen möchten

**Verhalten:**
- Im **Standard-Modus**: Normale Anzeige mit Erklärungen
- Im **Vollständig-Modus**: Alle Inhalte sichtbar
- Im **Show-Only-Modus**: Nur Anweisungen und Visuals, keine Erklärungen

---

## HTML-Markup-Konvention

### Neue Data-Attribute für Content-Typen

Jeder Inhalts-Block erhält ein `data-content-type` Attribut:

```html
<section class="content-section" data-section="step1">
    <h2>Sch
````



## Prompt:
4.10.2025, 16:01:02

Weiter



## Response:
4.10.2025, 16:02:52



**V07 - Don't tell; just show Modus** ∙ Version 2

````markdown
# V07: "Don't tell; just show"-Modus

**Priorität:** 🟠 Hoch (Chef-Priorität!)  
**Aufwand:** 3-4 Stunden  
**Status:** Zeitnah umsetzen

---

## Feature-Beschreibung

Ein spezieller Anzeigemodus für Anwender, die:
- Nur die praktischen Schritte sehen wollen
- Keine theoretischen Erklärungen benötigen
- Schnell zum Ziel kommen möchten

**Verhalten:**
- Im **Standard-Modus**: Normale Anzeige mit Erklärungen
- Im **Vollständig-Modus**: Alle Inhalte sichtbar
- Im **Show-Only-Modus**: Nur Anweisungen und Visuals, keine Erklärungen

---

## HTML-Markup-Konvention

### Neue Data-Attribute für Content-Typen

Jeder Inhalts-Block erhält ein `data-content-type` Attribut:

```html
<section class="content-section" data-section="step1">
    <h2>Schritt 1: Export starten</h2>
    
    <!-- SHOW: Praktische Anweisungen (immer sichtbar im Show-Only) -->
    <div data-content-type="instruction">
        <ol>
            <li>Öffnen Sie AXIOM Process</li>
            <li>Klicken Sie auf "New Case"</li>
            <li>Wählen Sie die Datenquelle aus</li>
        </ol>
    </div>
    
    <!-- TELL: Erklärungen (versteckt im Show-Only Modus) -->
    <div data-content-type="explanation">
        <p>
            AXIOM Process ist die erste Stufe der Datenverarbeitung. 
            Es extrahiert und indexiert Daten aus verschiedenen Quellen...
        </p>
    </div>
    
    <!-- SHOW: Screenshots/Visuals (immer sichtbar im Show-Only) -->
    <div data-content-type="visual">
        <img src="images/step1-screenshot.png" alt="AXIOM Process Startbildschirm">
    </div>
    
    <!-- TELL: Hintergrundinformationen (versteckt im Show-Only Modus) -->
    <div data-content-type="background">
        <div class="info-box">
            <strong>Technischer Hintergrund:</strong>
            Die Extraktion erfolgt über proprietäre Parser...
        </div>
    </div>
</section>
```

### Content-Type Kategorien

| Typ | Beschreibung | Show-Only Modus |
|-----|--------------|-----------------|
| `instruction` | Schritt-für-Schritt Anweisungen | ✅ Sichtbar |
| `visual` | Screenshots, Diagramme, Videos | ✅ Sichtbar |
| `explanation` | Erklärungen, Theorie | ❌ Versteckt |
| `background` | Hintergrundinformationen, Kontext | ❌ Versteckt |

---

## CSS-Styling

```css
/* ===== CONTENT TYPE VISIBILITY ===== */

/* Show-Only Modus: Verstecke Erklärungen und Hintergründe */
[data-media-layer="show-only"] [data-content-type="explanation"],
[data-media-layer="show-only"] [data-content-type="background"] {
    display: none;
}

/* Smooth Transition beim Wechsel */
[data-content-type] {
    transition: opacity var(--transition-medium),
                max-height var(--transition-medium);
}

.content-hidden {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    margin: 0 !important;
    padding: 0 !important;
}

/* Instructions hervorheben im Show-Only Modus */
[data-media-layer="show-only"] [data-content-type="instruction"] {
    background-color: var(--color-surface);
    padding: 20px;
    border-left: 4px solid var(--color-success);
    border-radius: 8px;
    margin: 20px 0;
    box-shadow: 0 2px 8px var(--color-shadow);
}

[data-media-layer="show-only"] [data-content-type="instruction"] ol,
[data-media-layer="show-only"] [data-content-type="instruction"] ul {
    margin-left: 20px;
}

[data-media-layer="show-only"] [data-content-type="instruction"] li {
    margin-bottom: 12px;
    font-weight: 500;
}

/* Visuals hervorheben im Show-Only Modus */
[data-media-layer="show-only"] [data-content-type="visual"] {
    margin: 20px 0;
    box-shadow: 0 4px 12px var(--color-shadow);
    border-radius: 8px;
    overflow: hidden;
}

[data-media-layer="show-only"] [data-content-type="visual"] img {
    display: block;
    width: 100%;
    height: auto;
}
```

---

## JavaScript-Erweiterung

### In `script-preferences.js` erweitern:

```javascript
// ===== MEDIA LAYER SYSTEM =====

const MEDIA_LAYERS = {
    STANDARD: 'standard',
    SHOW_ONLY: 'show-only',  // NEU
    TEXT_ONLY: 'text-only',
    FULL: 'full'
};

const MEDIA_LAYER_NAMES = {
    'standard': 'Standard',
    'show-only': 'Nur Anweisungen',  // NEU
    'text-only': 'Nur Text',
    'full': 'Vollständig'
};

let currentMediaLayer = MEDIA_LAYERS.STANDARD;

// ===== APPLY MEDIA LAYER =====

function applyMediaLayer(layer) {
    // Body-Attribut setzen
    document.body.setAttribute('data-media-layer', layer);
    
    // State aktualisieren (wenn State Manager vorhanden)
    if (window.AppState) {
        AppState.update('preferences.mediaLayer', layer);
    }
    
    // Spezifische Modus-Logik
    switch(layer) {
        case MEDIA_LAYERS.STANDARD:
            applyStandardMode();
            break;
        case MEDIA_LAYERS.SHOW_ONLY:
            applyShowOnlyMode();
            break;
        case MEDIA_LAYERS.TEXT_ONLY:
            applyTextOnlyMode();
            break;
        case MEDIA_LAYERS.FULL:
            applyFullMode();
            break;
    }
    
    // UI aktualisieren
    updateMediaLayerUI(layer);
    
    LOG('PREFS', `Media layer applied: ${layer}`);
}

// ===== SHOW-ONLY MODE =====

function applyShowOnlyMode() {
    // Verstecke Erklärungen und Hintergrund-Infos
    const hideTypes = ['explanation', 'background'];
    
    hideTypes.forEach(type => {
        const elements = document.querySelectorAll(`[data-content-type="${type}"]`);
        elements.forEach(el => {
            el.classList.add('content-hidden');
            el.setAttribute('aria-hidden', 'true');
        });
    });
    
    // Zeige nur Instructions und Visuals
    const showTypes = ['instruction', 'visual'];
    
    showTypes.forEach(type => {
        const elements = document.querySelectorAll(`[data-content-type="${type}"]`);
        elements.forEach(el => {
            el.classList.remove('content-hidden');
            el.setAttribute('aria-hidden', 'false');
        });
    });
    
    LOG('PREFS', 'Show-Only mode applied');
}

function removeShowOnlyMode() {
    // Alle Content-Types wieder sichtbar machen
    const allElements = document.querySelectorAll('[data-content-type]');
    allElements.forEach(el => {
        el.classList.remove('content-hidden');
        el.setAttribute('aria-hidden', 'false');
    });
}

// ===== STANDARD MODE =====

function applyStandardMode() {
    // Alle Inhalte sichtbar (außer Detail-Level 3)
    removeShowOnlyMode();
    removeTextOnlyMode();
    removeFullMode();
    
    LOG('PREFS', 'Standard mode applied');
}

// ===== TEXT-ONLY MODE (bestehend) =====

function applyTextOnlyMode() {
    // Bestehende Logik für Text-Only
    const mediaElements = document.querySelectorAll('img, video, iframe');
    mediaElements.forEach(el => {
        el.style.display = 'none';
    });
}

function removeTextOnlyMode() {
    const mediaElements = document.querySelectorAll('img, video, iframe');
    mediaElements.forEach(el => {
        el.style.display = '';
    });
}

// ===== FULL MODE (bestehend) =====

function applyFullMode() {
    // Bestehende Logik für Full Mode
    removeShowOnlyMode();
    removeTextOnlyMode();
}

function removeFullMode() {
    // Cleanup
}

// ===== CYCLE MEDIA LAYER =====

function cycleMediaLayer() {
    const order = ['standard', 'show-only', 'text-only', 'full'];
    const currentIndex = order.indexOf(currentMediaLayer);
    const nextIndex = (currentIndex + 1) % order.length;
    const nextLayer = order[nextIndex];
    
    setMediaLayer(nextLayer);
}

function setMediaLayer(layer) {
    currentMediaLayer = layer;
    applyMediaLayer(layer);
    
    // In localStorage speichern
    try {
        localStorage.setItem('axiom-media-layer', layer);
    } catch (error) {
        LOG.error('PREFS', 'Failed to save media layer preference', error);
    }
}

// ===== UI UPDATE =====

function updateMediaLayerUI(layer) {
    const statusElement = document.getElementById('media-layer-status');
    if (statusElement) {
        statusElement.textContent = MEDIA_LAYER_NAMES[layer] || layer;
    }
}

// ===== INITIALIZATION =====

function loadMediaLayerPreference() {
    try {
        const saved = localStorage.getItem('axiom-media-layer');
        if (saved && Object.values(MEDIA_LAYERS).includes(saved)) {
            currentMediaLayer = saved;
            applyMediaLayer(saved);
        }
    } catch (error) {
        LOG.error('PREFS', 'Failed to load media layer preference', error);
    }
}

// ===== EVENT HANDLERS =====

function initMediaLayerControls() {
    const toggleBtn = document.getElementById('toggle-media-layer');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            cycleMediaLayer();
        });
        
        LOG('PREFS', 'Media layer controls initialized');
    }
}

// ===== AUTO-INIT =====

document.addEventListener('DOMContentLoaded', () => {
    loadMediaLayerPreference();
    initMediaLayerControls();
});
```

---

## UI-Integration

### Menu-Item erweitern (bereits vorhanden):

```html
<button class="menu-item" id="toggle-media-layer" role="menuitem">
    <span class="menu-icon">🖼️</span>
    Medien: <span id="media-layer-status">Standard</span>
</button>
```

**Verhalten beim Klicken:**
1. Standard → Nur Anweisungen
2. Nur Anweisungen → Nur Text
3. Nur Text → Vollständig
4. Vollständig → Standard

---

## Migration bestehender Inhalte

### Schritt 1: Inhalte taggen

Gehen Sie durch `index.html` und fügen Sie zu jedem Content-Block das passende Attribut hinzu:

**Beispiel vorher:**
```html
<section class="content-section" data-section="step2">
    <h2>Schritt 2: Datenauswahl</h2>
    <p>In diesem Schritt wählen Sie die zu exportierenden Daten aus...</p>
    <ol>
        <li>Klicken Sie auf "Select Evidence"</li>
        <li>Wählen Sie die Datenquellen</li>
    </ol>
    <div class="info-box">
        <strong>Hinweis:</strong> Die Auswahl beeinflusst die Verarbeitungszeit...
    </div>
</section>
```

**Beispiel nachher:**
```html
<section class="content-section" data-section="step2">
    <h2>Schritt 2: Datenauswahl</h2>
    
    <div data-content-type="explanation">
        <p>In diesem Schritt wählen Sie die zu exportierenden Daten aus...</p>
    </div>
    
    <div data-content-type="instruction">
        <ol>
            <li>Klicken Sie auf "Select Evidence"</li>
            <li>Wählen Sie die Datenquellen</li>
        </ol>
    </div>
    
    <div data-content-type="background">
        <div class="info-box">
            <strong>Hinweis:</strong> Die Auswahl beeinflusst die Verarbeitungszeit...
        </div>
    </div>
</section>
```

### Schritt 2: Bilder taggen

```html
<!-- Vorher -->
<img src="images/screenshot.png" alt="Screenshot">

<!-- Nachher -->
<div data-content-type="visual">
    <img src="images/screenshot.png" alt="Screenshot">
</div>
```

---

## Testing-Checkliste

### Funktionalität
- [ ] Wechsel zwischen Modi funktioniert
- [ ] Instructions bleiben im Show-Only sichtbar
- [ ] Visuals bleiben im Show-Only sichtbar
- [ ] Explanations werden im Show-Only versteckt
- [ ] Background-Infos werden im Show-Only versteckt
- [ ] Preference wird in localStorage gespeichert
- [ ] Preference wird beim Neuladen wiederhergestellt

### Visuals
- [ ] Instructions sind im Show-Only hervorgehoben
- [ ] Übergänge sind smooth (keine Ruckler)
- [ ] Layout bleibt konsistent

### Accessibility
- [ ] `aria-hidden` wird korrekt gesetzt
- [ ] Screen Reader respektiert versteckte Inhalte
- [ ] Keyboard-Navigation funktioniert

### Alle Themes
- [ ] Tag-Modus: Lesbarkeit gegeben
- [ ] Nacht-Modus: Lesbarkeit gegeben
- [ ] Hochkontrast Hell: Lesbarkeit gegeben
- [ ] Hochkontrast Dunkel: Lesbarkeit gegeben

---

## Vorteile

✅ **Zielgruppen-gerecht:** Verschiedene Lerntypen unterstützt  
✅ **Schnelligkeit:** Erfahrene User kommen direkt zum Punkt  
✅ **Übersichtlichkeit:** Weniger visueller Clutter  
✅ **Chef-Happy:** Erfüllt explizite Anforderung 😊  
✅ **Einfache Wartung:** Content-Type über Attribut steuerbar  
✅ **Flexibel:** Neue Content-Types einfach hinzufügbar

---

## Erweiterungsmöglichkeiten (Optional)

### Weitere Content-Types:

```javascript
// Mögliche Erweiterungen:
const CONTENT_TYPES = {
    INSTRUCTION: 'instruction',   // ✅ Implementiert
    VISUAL: 'visual',              // ✅ Implementiert
    EXPLANATION: 'explanation',    // ✅ Implementiert
    BACKGROUND: 'background',      // ✅ Implementiert
    
    // Zukünftig:
    EXAMPLE: 'example',            // Beispiele
    WARNING: 'warning',            // Warnungen
    TIP: 'tip',                    // Tipps
    ADVANCED: 'advanced'           // Erweiterte Infos
};
```

### User-Preference für Default-Modus:

```javascript
// In Einstellungen: User kann Default-Modus wählen
function setDefaultMediaLayer(layer) {
    localStorage.setItem('axiom-media-layer-default', layer);
}
```

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*
````

**V09 - Animations- und Transitions-Harmonisierung**

````markdown
# V09: Animations- und Transitions-Harmonisierung

**Priorität:** 🔴 Sehr hoch (UX-kritisch!)  
**Aufwand:** 4-6 Stunden  
**Status:** Sofort umsetzen

---

## Problembeschreibung

**Aktueller Zustand:**
- Linke Sidebar (Navigation) und rechte Sidebar (Notizen) fühlen sich unterschiedlich an
- Inkonsistente Transition-Timings zwischen verschiedenen UI-Elementen
- Unterschiedliche Easing-Functions führen zu uneinheitlichem Bewegungsgefühl
- Teilweise ruckelige Animationen ohne GPU-Beschleunigung

**Ziel:**
Einheitliches, flüssiges und professionelles Animations-Erlebnis über alle UI-Komponenten hinweg.

---

## Lösungsansatz

### 1. Zentrale Animation-Variablen

**In `styles.css` unter `:root` erweitern:**

```css
:root {
    /* Bestehende Transitions */
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
    
    /* NEU: Erweiterte Animation-Variablen */
    --transition-slow: 0.5s ease;
    
    /* Easing Functions */
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.0, 0, 0.2, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    /* Sidebar-spezifische Timings */
    --sidebar-transition-duration: 0.35s;
    --sidebar-transition-easing: var(--ease-smooth);
    
    /* Tooltip/Modal Timings */
    --tooltip-transition: 0.2s var(--ease-out);
    --modal-transition: 0.3s var(--ease-smooth);
}
```

---

## 2. Sidebar-Harmonisierung

### Beide Sidebars (Links & Rechts) angleichen:

```css
/* ===== LINKE SIDEBAR (Navigation, History, Favorites) ===== */
.sidebar-container {
    position: fixed;
    left: 0;
    top: var(--top-nav-height);
    width: 280px;
    height: calc(100vh - var(--top-nav-height) - var(--tips-footer-height, 0px));
    z-index: 998;
    transform: translateX(-100%);
    transition: transform var(--sidebar-transition-duration) var(--sidebar-transition-easing);
    box-shadow: 2px 0 15px var(--color-shadow-strong);
    background-color: var(--color-surface-elevated);
    will-change: transform;
    backface-visibility: hidden;
}

.sidebar-container.open {
    transform: translateX(0);
}

/* ===== RECHTE SIDEBAR (Notizen) ===== */
.notes-sidebar {
    position: fixed;
    right: 0;
    top: var(--top-nav-height);
    width: 300px;
    height: calc(100vh - var(--top-nav-height) - var(--tips-footer-height, 0px));
    z-index: 998;
    transform: translateX(100%);
    transition: transform var(--sidebar-transition-duration) var(--sidebar-transition-easing);
    box-shadow: -2px 0 15px var(--color-shadow-strong);
    background-color: var(--color-surface-elevated);
    will-change: transform;
    backface-visibility: hidden;
}

body.notes-open .notes-sidebar {
    transform: translateX(0);
}

/* ===== EINHEITLICHE SIDEBAR-STATES ===== */

/* Opening Animation */
.sidebar-container.opening,
.notes-sidebar.opening {
    transition-timing-function: var(--ease-out);
}

/* Closing Animation */
.sidebar-container.closing,
.notes-sidebar.closing {
    transition-timing-function: var(--ease-in);
}

/* Hover-Effekt auf Tab-Header */
.sidebar-tab-header,
.notes-header {
    transition: background-color var(--transition-fast);
}

.sidebar-tab-header:hover,
.notes-header:hover {
    background-color: var(--color-primary-hover);
}

/* Content-Fade beim Wechseln */
.sidebar-tab-body,
.notes-body {
    opacity: 1;
    transition: opacity var(--transition-medium) var(--ease-smooth);
}

.sidebar-tab-body.fading,
.notes-body.fading {
    opacity: 0;
}
```

---

## 3. Einheitliche Button-Animationen

```css
/* ===== ALLE BUTTONS HARMONISIEREN ===== */

button,
.btn-primary,
.btn-secondary,
.menu-item,
.detail-btn-mini {
    transition: all var(--transition-fast) var(--ease-smooth);
}

/* Hover-State */
button:hover:not(:disabled),
.btn-primary:hover:not(:disabled),
.btn-secondary:hover:not(:disabled),
.menu-item:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--color-shadow);
}

/* Active-State */
button:active,
.btn-primary:active,
.btn-secondary:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px var(--color-shadow);
    transition-duration: 0.1s;
}

/* Focus-State */
button:focus-visible,
.btn-primary:focus-visible,
.btn-secondary:focus-visible {
    outline: var(--focus-outline-width) solid var(--color-focus);
    outline-offset: 2px;
    transition: outline-offset var(--transition-fast);
}

/* Disabled-State */
button:disabled,
.btn-primary:disabled,
.btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}
```

---

## 4. Modal/Overlay-Animationen

```css
/* ===== MODALS & OVERLAYS ===== */

/* Modal Backdrop */
.modal-backdrop,
.onboarding-overlay {
    opacity: 0;
    transition: opacity var(--modal-transition);
    pointer-events: none;
}

.modal-backdrop.visible,
.onboarding-overlay.visible {
    opacity: 1;
    pointer-events: auto;
}

/* Modal Content */
.modal-content,
.onboarding-tooltip,
.glossar-tooltip {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
    transition: 
        opacity var(--modal-transition),
        transform var(--modal-transition);
    will-change: transform, opacity;
    backface-visibility: hidden;
}

.modal-content.visible,
.onboarding-tooltip.visible,
.glossar-tooltip.visible {
    opacity: 1;
    transform: scale(1) translateY(0);
}
```

---

## 5. Scroll-Animationen

```css
/* ===== SMOOTH SCROLLING ===== */

html {
    scroll-behavior: smooth;
}

/* Section Highlight Animation */
.scroll-highlight {
    animation: scrollHighlight 2s var(--ease-smooth);
}

@keyframes scrollHighlight {
    0%, 100% { 
        box-shadow: none;
        background-color: transparent;
    }
    25% { 
        box-shadow: 0 0 0 3px var(--color-primary);
        background-color: rgba(0, 75, 118, 0.05);
    }
    50% { 
        box-shadow: 0 0 0 5px var(--color-primary);
        background-color: rgba(0, 75, 118, 0.1);
    }
    75% { 
        box-shadow: 0 0 0 3px var(--color-primary);
        background-color: rgba(0, 75, 118, 0.05);
    }
}
```

---

## 6. Micro-Animations für Feedback

```css
/* ===== MICRO-ANIMATIONS ===== */

/* Pulse für wichtige Aktionen */
@keyframes pulse {
    0%, 100% { 
        transform: scale(1);
    }
    50% { 
        transform: scale(1.05);
    }
}

.pulse {
    animation: pulse 0.6s var(--ease-smooth);
}

/* Shake für Fehler */
@keyframes shake {
    0%, 100% { 
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-4px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(4px);
    }
}

.shake {
    animation: shake 0.5s var(--ease-smooth);
}

/* Bounce für Erfolg */
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-8px);
    }
}

.bounce {
    animation: bounce 0.6s var(--ease-smooth);
}

/* Fade-In für neue Elemente */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn var(--transition-medium) var(--ease-smooth);
}

/* Fade-Out */
@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}

.fade-out {
    animation: fadeOut var(--transition-medium) var(--ease-smooth);
}
```

---

## 7. Performance-Optimierungen

```css
/* ===== PERFORMANCE: GPU-ACCELERATION ===== */

.sidebar-container,
.notes-sidebar,
.modal-content,
.onboarding-tooltip,
.glossar-tooltip {
    /* GPU-Beschleunigung für smooth animations */
    will-change: transform, opacity;
    backface-visibility: hidden;
    perspective: 1000px;
}

/* WICHTIG: will-change nur auf animierten Elementen! */
/* Nach Animation entfernen (via JS oder automatisch) */
```

### Performance-Best-Practices:

**✅ GUT - Transform verwenden:**
```css
.sidebar {
    transform: translateX(-100%);
}
```

**❌ SCHLECHT - Position verwenden:**
```css
.sidebar-old {
    left: -280px;  /* Triggert Reflow! */
}
```

---

## 8. Accessibility: Reduced Motion

```css
/* ===== REDUCED MOTION SUPPORT ===== */

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    
    /* Behalte nur essential transitions */
    .sidebar-container,
    .notes-sidebar,
    .modal-backdrop {
        transition: opacity 0.15s ease;
    }
}
```

---

## 9. JavaScript-Integration

### Animations-Helper in `script-core.js`:

```javascript
// ===== ANIMATION UTILITIES =====

window.AnimationHelper = {
    /**
     * Fügt eine temporäre Animations-Klasse hinzu
     * @param {HTMLElement} element 
     * @param {string} animationClass 
     * @param {number} duration 
     */
    playAnimation(element, animationClass, duration = 600) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    },
    
    /**
     * Wartet auf das Ende einer CSS-Transition
     * @param {HTMLElement} element 
     * @returns {Promise}
     */
    waitForTransition(element) {
        return new Promise(resolve => {
            const handleTransitionEnd = () => {
                element.removeEventListener('transitionend', handleTransitionEnd);
                resolve();
            };
            element.addEventListener('transitionend', handleTransitionEnd);
        });
    },
    
    /**
     * Öffnet Sidebar mit korrekter Animations-Klasse
     * @param {HTMLElement} sidebar 
     */
    openSidebar(sidebar) {
        sidebar.classList.add('opening');
        sidebar.classList.add('open');
        sidebar.classList.remove('closed', 'closing');
        
        setTimeout(() => {
            sidebar.classList.remove('opening');
        }, 350);
    },
    
    /**
     * Schließt Sidebar mit korrekter Animations-Klasse
     * @param {HTMLElement} sidebar 
     */
    async closeSidebar(sidebar) {
        sidebar.classList.add('closing');
        sidebar.classList.remove('open', 'opening');
        
        await this.waitForTransition(sidebar);
        
        sidebar.classList.add('closed');
        sidebar.classList.remove('closing');
    },
    
    /**
     * Visuelles Feedback geben
     * @param {HTMLElement} element 
     * @param {string} type - 'pulse', 'shake', 'bounce'
     */
    feedback(element, type = 'pulse') {
        const duration = type === 'shake' ? 500 : 600;
        this.playAnimation(element, type, duration);
    }
};

// Verwendung in Modulen:
function openNavigationSidebar() {
    const sidebar = document.querySelector('.sidebar-container');
    AnimationHelper.openSidebar(sidebar);
}

function showSuccessFeedback(button) {
    AnimationHelper.feedback(button, 'bounce');
}

function showErrorFeedback(input) {
    AnimationHelper.feedback(input, 'shake');
}
```

---

## Implementierungsschritte

### Phase 1: CSS-Variablen (1 Stunde)
1. Zentrale Animation-Vari
````



## Prompt:
4.10.2025, 16:03:25

Weiter



## Response:
4.10.2025, 16:05:30



**V09 - Animations- und Transitions-Harmonisierung** ∙ Version 2

````markdown
# V09: Animations- und Transitions-Harmonisierung

**Priorität:** 🔴 Sehr hoch (UX-kritisch!)  
**Aufwand:** 4-6 Stunden  
**Status:** Sofort umsetzen

---

## Problembeschreibung

**Aktueller Zustand:**
- Linke Sidebar (Navigation) und rechte Sidebar (Notizen) fühlen sich unterschiedlich an
- Inkonsistente Transition-Timings zwischen verschiedenen UI-Elementen
- Unterschiedliche Easing-Functions führen zu uneinheitlichem Bewegungsgefühl
- Teilweise ruckelige Animationen ohne GPU-Beschleunigung

**Ziel:**
Einheitliches, flüssiges und professionelles Animations-Erlebnis über alle UI-Komponenten hinweg.

---

## Lösungsansatz

### 1. Zentrale Animation-Variablen

**In `styles.css` unter `:root` erweitern:**

```css
:root {
    /* Bestehende Transitions */
    --transition-fast: 0.2s ease;
    --transition-medium: 0.3s ease;
    
    /* NEU: Erweiterte Animation-Variablen */
    --transition-slow: 0.5s ease;
    
    /* Easing Functions */
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0.0, 0, 0.2, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    /* Sidebar-spezifische Timings */
    --sidebar-transition-duration: 0.35s;
    --sidebar-transition-easing: var(--ease-smooth);
    
    /* Tooltip/Modal Timings */
    --tooltip-transition: 0.2s var(--ease-out);
    --modal-transition: 0.3s var(--ease-smooth);
}
```

---

## 2. Sidebar-Harmonisierung

### Beide Sidebars (Links & Rechts) angleichen:

```css
/* ===== LINKE SIDEBAR (Navigation, History, Favorites) ===== */
.sidebar-container {
    position: fixed;
    left: 0;
    top: var(--top-nav-height);
    width: 280px;
    height: calc(100vh - var(--top-nav-height) - var(--tips-footer-height, 0px));
    z-index: 998;
    transform: translateX(-100%);
    transition: transform var(--sidebar-transition-duration) var(--sidebar-transition-easing);
    box-shadow: 2px 0 15px var(--color-shadow-strong);
    background-color: var(--color-surface-elevated);
    will-change: transform;
    backface-visibility: hidden;
}

.sidebar-container.open {
    transform: translateX(0);
}

/* ===== RECHTE SIDEBAR (Notizen) ===== */
.notes-sidebar {
    position: fixed;
    right: 0;
    top: var(--top-nav-height);
    width: 300px;
    height: calc(100vh - var(--top-nav-height) - var(--tips-footer-height, 0px));
    z-index: 998;
    transform: translateX(100%);
    transition: transform var(--sidebar-transition-duration) var(--sidebar-transition-easing);
    box-shadow: -2px 0 15px var(--color-shadow-strong);
    background-color: var(--color-surface-elevated);
    will-change: transform;
    backface-visibility: hidden;
}

body.notes-open .notes-sidebar {
    transform: translateX(0);
}

/* ===== EINHEITLICHE SIDEBAR-STATES ===== */

/* Opening Animation */
.sidebar-container.opening,
.notes-sidebar.opening {
    transition-timing-function: var(--ease-out);
}

/* Closing Animation */
.sidebar-container.closing,
.notes-sidebar.closing {
    transition-timing-function: var(--ease-in);
}

/* Hover-Effekt auf Tab-Header */
.sidebar-tab-header,
.notes-header {
    transition: background-color var(--transition-fast);
}

.sidebar-tab-header:hover,
.notes-header:hover {
    background-color: var(--color-primary-hover);
}

/* Content-Fade beim Wechseln */
.sidebar-tab-body,
.notes-body {
    opacity: 1;
    transition: opacity var(--transition-medium) var(--ease-smooth);
}

.sidebar-tab-body.fading,
.notes-body.fading {
    opacity: 0;
}
```

---

## 3. Einheitliche Button-Animationen

```css
/* ===== ALLE BUTTONS HARMONISIEREN ===== */

button,
.btn-primary,
.btn-secondary,
.menu-item,
.detail-btn-mini {
    transition: all var(--transition-fast) var(--ease-smooth);
}

/* Hover-State */
button:hover:not(:disabled),
.btn-primary:hover:not(:disabled),
.btn-secondary:hover:not(:disabled),
.menu-item:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--color-shadow);
}

/* Active-State */
button:active,
.btn-primary:active,
.btn-secondary:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px var(--color-shadow);
    transition-duration: 0.1s;
}

/* Focus-State */
button:focus-visible,
.btn-primary:focus-visible,
.btn-secondary:focus-visible {
    outline: var(--focus-outline-width) solid var(--color-focus);
    outline-offset: 2px;
    transition: outline-offset var(--transition-fast);
}

/* Disabled-State */
button:disabled,
.btn-primary:disabled,
.btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}
```

---

## 4. Modal/Overlay-Animationen

```css
/* ===== MODALS & OVERLAYS ===== */

/* Modal Backdrop */
.modal-backdrop,
.onboarding-overlay {
    opacity: 0;
    transition: opacity var(--modal-transition);
    pointer-events: none;
}

.modal-backdrop.visible,
.onboarding-overlay.visible {
    opacity: 1;
    pointer-events: auto;
}

/* Modal Content */
.modal-content,
.onboarding-tooltip,
.glossar-tooltip {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
    transition: 
        opacity var(--modal-transition),
        transform var(--modal-transition);
    will-change: transform, opacity;
    backface-visibility: hidden;
}

.modal-content.visible,
.onboarding-tooltip.visible,
.glossar-tooltip.visible {
    opacity: 1;
    transform: scale(1) translateY(0);
}
```

---

## 5. Scroll-Animationen

```css
/* ===== SMOOTH SCROLLING ===== */

html {
    scroll-behavior: smooth;
}

/* Section Highlight Animation */
.scroll-highlight {
    animation: scrollHighlight 2s var(--ease-smooth);
}

@keyframes scrollHighlight {
    0%, 100% { 
        box-shadow: none;
        background-color: transparent;
    }
    25% { 
        box-shadow: 0 0 0 3px var(--color-primary);
        background-color: rgba(0, 75, 118, 0.05);
    }
    50% { 
        box-shadow: 0 0 0 5px var(--color-primary);
        background-color: rgba(0, 75, 118, 0.1);
    }
    75% { 
        box-shadow: 0 0 0 3px var(--color-primary);
        background-color: rgba(0, 75, 118, 0.05);
    }
}
```

---

## 6. Micro-Animations für Feedback

```css
/* ===== MICRO-ANIMATIONS ===== */

/* Pulse für wichtige Aktionen */
@keyframes pulse {
    0%, 100% { 
        transform: scale(1);
    }
    50% { 
        transform: scale(1.05);
    }
}

.pulse {
    animation: pulse 0.6s var(--ease-smooth);
}

/* Shake für Fehler */
@keyframes shake {
    0%, 100% { 
        transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
        transform: translateX(-4px);
    }
    20%, 40%, 60%, 80% {
        transform: translateX(4px);
    }
}

.shake {
    animation: shake 0.5s var(--ease-smooth);
}

/* Bounce für Erfolg */
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-8px);
    }
}

.bounce {
    animation: bounce 0.6s var(--ease-smooth);
}

/* Fade-In für neue Elemente */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn var(--transition-medium) var(--ease-smooth);
}

/* Fade-Out */
@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}

.fade-out {
    animation: fadeOut var(--transition-medium) var(--ease-smooth);
}
```

---

## 7. Performance-Optimierungen

```css
/* ===== PERFORMANCE: GPU-ACCELERATION ===== */

.sidebar-container,
.notes-sidebar,
.modal-content,
.onboarding-tooltip,
.glossar-tooltip {
    /* GPU-Beschleunigung für smooth animations */
    will-change: transform, opacity;
    backface-visibility: hidden;
    perspective: 1000px;
}

/* WICHTIG: will-change nur auf animierten Elementen! */
/* Nach Animation entfernen (via JS oder automatisch) */
```

### Performance-Best-Practices:

**✅ GUT - Transform verwenden:**
```css
.sidebar {
    transform: translateX(-100%);
}
```

**❌ SCHLECHT - Position verwenden:**
```css
.sidebar-old {
    left: -280px;  /* Triggert Reflow! */
}
```

---

## 8. Accessibility: Reduced Motion

```css
/* ===== REDUCED MOTION SUPPORT ===== */

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    
    /* Behalte nur essential transitions */
    .sidebar-container,
    .notes-sidebar,
    .modal-backdrop {
        transition: opacity 0.15s ease;
    }
}
```

---

## 9. JavaScript-Integration

### Animations-Helper in `script-core.js`:

```javascript
// ===== ANIMATION UTILITIES =====

window.AnimationHelper = {
    /**
     * Fügt eine temporäre Animations-Klasse hinzu
     * @param {HTMLElement} element 
     * @param {string} animationClass 
     * @param {number} duration 
     */
    playAnimation(element, animationClass, duration = 600) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, duration);
    },
    
    /**
     * Wartet auf das Ende einer CSS-Transition
     * @param {HTMLElement} element 
     * @returns {Promise}
     */
    waitForTransition(element) {
        return new Promise(resolve => {
            const handleTransitionEnd = () => {
                element.removeEventListener('transitionend', handleTransitionEnd);
                resolve();
            };
            element.addEventListener('transitionend', handleTransitionEnd);
        });
    },
    
    /**
     * Öffnet Sidebar mit korrekter Animations-Klasse
     * @param {HTMLElement} sidebar 
     */
    openSidebar(sidebar) {
        sidebar.classList.add('opening');
        sidebar.classList.add('open');
        sidebar.classList.remove('closed', 'closing');
        
        setTimeout(() => {
            sidebar.classList.remove('opening');
        }, 350);
    },
    
    /**
     * Schließt Sidebar mit korrekter Animations-Klasse
     * @param {HTMLElement} sidebar 
     */
    async closeSidebar(sidebar) {
        sidebar.classList.add('closing');
        sidebar.classList.remove('open', 'opening');
        
        await this.waitForTransition(sidebar);
        
        sidebar.classList.add('closed');
        sidebar.classList.remove('closing');
    },
    
    /**
     * Visuelles Feedback geben
     * @param {HTMLElement} element 
     * @param {string} type - 'pulse', 'shake', 'bounce'
     */
    feedback(element, type = 'pulse') {
        const duration = type === 'shake' ? 500 : 600;
        this.playAnimation(element, type, duration);
    }
};

// Verwendung in Modulen:
function openNavigationSidebar() {
    const sidebar = document.querySelector('.sidebar-container');
    AnimationHelper.openSidebar(sidebar);
}

function showSuccessFeedback(button) {
    AnimationHelper.feedback(button, 'bounce');
}

function showErrorFeedback(input) {
    AnimationHelper.feedback(input, 'shake');
}
```

---

## Implementierungsschritte

### Phase 1: CSS-Variablen (1 Stunde)
1. Zentrale Animation-Variablen in `:root` definieren
2. Bestehende `transition:` Deklarationen durch Variablen ersetzen
3. Testing: Visuell prüfen, ob alles noch funktioniert

### Phase 2: Sidebar-Angleichung (1-2 Stunden)
1. Linke Sidebar (Navigation/History/Favorites) überarbeiten
2. Rechte Sidebar (Notizen) angleichen
3. Identische Timings und Easing für beide Sidebars
4. GPU-Beschleunigung hinzufügen (`will-change`, `backface-visibility`)
5. Testing: Beide Sidebars öffnen/schließen, auf Ruckler prüfen

### Phase 3: Button-Harmonisierung (1 Stunde)
1. Alle Button-States vereinheitlichen
2. Hover/Active/Focus konsistent gestalten
3. Testing: Alle Buttons durchklicken

### Phase 4: Micro-Animations (1 Stunde)
1. Animations-Helper in `script-core.js` implementieren
2. Keyframe-Animationen definieren
3. In bestehenden Modulen integrieren
4. Testing: Feedback-Animationen prüfen

### Phase 5: Accessibility & Performance (30 Min)
1. Reduced Motion Support implementieren
2. Performance-Tests durchführen (Chrome DevTools)
3. Final Testing auf allen Geräten

**Gesamt-Aufwand:** 4-6 Stunden

---

## Testing-Checkliste

### Funktionalität
- [ ] Beide Sidebars öffnen/schließen sich identisch schnell
- [ ] Keine Ruckler-Effekte bei Animationen
- [ ] Smooth Scrolling funktioniert in allen Browsern
- [ ] Hover-Effekte sind konsistent über alle Buttons
- [ ] Modal-Animationen sind smooth

### Performance
- [ ] 60 FPS beim Öffnen/Schließen von Sidebars
- [ ] Keine Layout-Shifts während Animationen
- [ ] GPU-Beschleunigung aktiv (Chrome DevTools: Rendering > Paint flashing)
- [ ] Keine Memory Leaks bei wiederholten Animationen

### Accessibility
- [ ] Reduced Motion wird respektiert
- [ ] Focus-Indicator sichtbar und smooth animiert
- [ ] Keyboard-Navigation funktioniert flüssig
- [ ] Screen Reader gibt keine Fehler

### Cross-Browser
- [ ] Chrome: Alle Animationen smooth
- [ ] Firefox: Alle Animationen smooth
- [ ] Edge: Alle Animationen smooth
- [ ] Safari (falls verfügbar): Alle Animationen smooth

### Alle Themes
- [ ] Tag-Modus: Animationen sichtbar und smooth
- [ ] Nacht-Modus: Animationen sichtbar und smooth
- [ ] Hochkontrast Hell: Animationen sichtbar
- [ ] Hochkontrast Dunkel: Animationen sichtbar

---

## Vorher/Nachher-Vergleich

### Vorher:
```css
/* Inkonsistent und ruckelig */
.sidebar-left {
    transition: left 0.3s ease;
    left: -280px;
}

.sidebar-right {
    transition: right 0.4s ease-in-out;
    right: -300px;
}

button:hover {
    background-color: blue;
}
```

### Nachher:
```css
/* Konsistent und smooth */
.sidebar-container {
    transition: transform var(--sidebar-transition-duration) var(--sidebar-transition-easing);
    transform: translateX(-100%);
    will-change: transform;
    backface-visibility: hidden;
}

.notes-sidebar {
    transition: transform var(--sidebar-transition-duration) var(--sidebar-transition-easing);
    transform: translateX(100%);
    will-change: transform;
    backface-visibility: hidden;
}

button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px var(--color-shadow);
    transition: all var(--transition-fast) var(--ease-smooth);
}
```

---

## Migration bestehender Animationen

### Beispiel: Sidebar Manager

**VORHER (script-sidebar-manager.js):**
```javascript
function openSidebar(sidebarId) {
    container.style.display = 'flex';
    setTimeout(() => {
        container.style.transform = 'translateX(0)';
    }, 10);
}

function closeSidebar() {
    container.style.transform = 'translateX(-100%)';
    setTimeout(() => {
        container.style.display = 'none';
    }, 300);
}
```

**NACHHER:**
```javascript
function openSidebar(sidebarId) {
    const container = document.querySelector('.sidebar-container');
    AnimationHelper.openSidebar(container);
}

async function closeSidebar() {
    const container = document.querySelector('.sidebar-container');
    await AnimationHelper.closeSidebar(container);
}
```

---

## Beispiel: Feedback-Animationen

### Favoriten hinzufügen:

**VORHER:**
```javascript
function toggleFavorite(sectionId) {
    const isAdded = addFavorite(sectionId);
    
    if (isAdded) {
        // Kein visuelles Feedback
    }
}
```

**NACHHER:**
```javascript
function toggleFavorite(sectionId) {
    const button = document.querySelector(`[data-section="${sectionId}"]`);
    const isAdded = addFavorite(sectionId);
    
    if (isAdded) {
        AnimationHelper.feedback(button, 'pulse');
    } else {
        AnimationHelper.feedback(button, 'shake');
    }
}
```

---

## Advanced: Staggered Animations

### Für Listen (z.B. Favoriten):

```css
/* Favoriten-Items erscheinen nacheinander */
.favorite-item {
    opacity: 0;
    animation: fadeIn 0.3s var(--ease-smooth) forwards;
}

.favorite-item:nth-child(1) { animation-delay: 0.05s; }
.favorite-item:nth-child(2) { animation-delay: 0.10s; }
.favorite-item:nth-child(3) { animation-delay: 0.15s; }
.favorite-item:nth-child(4) { animation-delay: 0.20s; }
.favorite-item:nth-child(5) { animation-delay: 0.25s; }

/* Für mehr Items: */
.favorite-item:nth-child(n+6) { animation-delay: 0.30s; }
```

**JavaScript-Integration:**
```javascript
function renderFavorites() {
    favoritesList.innerHTML = '';
    
    favorites.forEach((favorite, index) => {
        const item = createFavoriteItem(favorite);
        
        // Staggered animation
        item.style.animationDelay = `${index * 0.05}s`;
        
        favoritesList.appendChild(item);
    });
}
```

---

## Troubleshooting

### Problem: Animationen ruckeln

**Ursache:** Kein GPU-Compositing
**Lösung:**
```css
.element {
    will-change: transform, opacity;
    backface-visibility: hidden;
    transform: translateZ(0); /* Forciert GPU-Layer */
}
```

### Problem: Layout-Shifts während Animation

**Ursache:** `display: none` → `display: block` ohne Delay
**Lösung:**
```css
.element {
    display: none;
    opacity: 0;
    transition: opacity 0.3s;
}

.element.visible {
    display: block;
    opacity: 1;
}
```

### Problem: Animationen zu schnell/langsam

**Ursache:** Falsche Timings
**Lösung:** Zentrale Variablen anpassen:
```css
:root {
    --sidebar-transition-duration: 0.35s; /* Anpassen nach Bedarf */
}
```

### Problem: Focus-Outline flackert

**Ursache:** Transition auf `outline`
**Lösung:**
```css
button:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
    /* Nur outline-offset animieren */
    transition: outline-offset var(--transition-fast);
}
```

---

## Performance-Monitoring

### Chrome DevTools:

1. **Performance-Tab:**
   - Aufnahme starten
   - Sidebar öffnen/schließen
   - Aufnahme stoppen
   - Prüfen: FPS sollte konstant 60 sein

2. **Rendering-Tab:**
   - "Paint flashing" aktivieren
   - Grüne Bereiche = Repaints
   - Minimieren durch `transform` statt `left/right`

3. **Layers-Tab:**
   - Prüfen ob Sidebar eigenen Composite-Layer hat
   - Sollte sichtbar sein wenn `will-change` gesetzt

---

## Vorteile nach Umsetzung

✅ **Konsistentes UX:** Alles fühlt sich gleich an  
✅ **Professioneller Eindruck:** Smooth und poliert  
✅ **Performance:** GPU-beschleunigte Animationen, 60 FPS  
✅ **Accessibility:** Reduced Motion Support  
✅ **Wartbarkeit:** Zentrale Animation-Variablen  
✅ **Developer Experience:** Animations-Helper vereinfacht Code  
✅ **User Delight:** Micro-Animations für Feedback

---

## Bonus: Animation-Cheat-Sheet

### Schnellreferenz für Entwickler:

```javascript
// Sidebar öffnen
AnimationHelper.openSidebar(element);

// Sidebar schließen
await AnimationHelper.closeSidebar(element);

// Erfolgs-Feedback
AnimationHelper.feedback(button, 'bounce');

// Fehler-Feedback
AnimationHelper.feedback(input, 'shake');

// Aufmerksamkeit
AnimationHelper.feedback(element, 'pulse');

// Custom Animation
AnimationHelper.playAnimation(element, 'custom-class', 800);

// Auf Transition warten
await AnimationHelper.waitForTransition(element);
```

### CSS-Klassen für schnellen Einsatz:

```html
<!-- Elemente fade-in beim Laden -->
<div class="fade-in">Content</div>

<!-- Pulse-Animation auf Klick -->
<button onclick="this.classList.add('pulse')">Click me</button>

<!-- Shake bei Fehler -->
<input id="email" class="shake">
```

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*
````

Perfekt! Ich erstelle nun noch eine Übersichtsdatei mit allen Verbesserungsvorschlägen:

**Übersicht - Alle Verbesserungsvorschläge**

````markdown
# AXIOM Leitfaden - Verbesserungsvorschläge Übersicht

**Dokumentversion:** 1.0  
**Datum:** 04. Oktober 2025  
**Projekt:** AXIOM Forensik-Leitfaden

---

## 📋 Zusammenfassung

Dieses Dokument bietet eine Übersicht über alle geplanten Verbesserungen für den AXIOM Leitfaden. Jeder Vorschlag ist in einem separaten Detaildokument ausgearbeitet.

**Gesamt-Aufwand (geschätzt):** 45-75 Stunden

---

## 🔴 Sehr hohe Priorität (Sofort umsetzen)

### V01: Einheitliche Zustandsverwaltung
- **Aufwand:** 6-10 Stunden
- **Ziel:** Zentrale State-Management mit Observer-Pattern
- **Vorteile:** Konsistenz, keine Race Conditions, besseres Debugging
- **Status:** Zur sofortigen Umsetzung empfohlen

**Kernfeatures:**
- `AppState` mit Subscribe/Update-Mechanismus
- Zentrale localStorage-Persistierung mit Debouncing
- Observer-Pattern für Module-Kommunikation
- Einfache Migration bestehender Module

📄 **Detaildokument:** V01-State-Management.md

---

### V04: Strikte CSS/HTML/JavaScript-Trennung
- **Aufwand:** 4-6 Stunden
- **Ziel:** Separation of Concerns durchsetzen
- **Vorteile:** Wartbarkeit, Theme-Support, Performance
- **Status:** Zur sofortigen Umsetzung empfohlen

**Kernfeatures:**
- Keine Inline-Styles mehr in HTML
- JavaScript manipuliert nur CSS-Klassen
- CSS Custom Properties für dynamische Werte
- Utility-Klassen für Wiederverwendbarkeit

📄 **Detaildokument:** V04-CSS-HTML-JS-Trennung.md

---

### V09: Animations- und Transitions-Harmonisierung
- **Aufwand:** 4-6 Stunden
- **Ziel:** Einheitliches Animations-Erlebnis
- **Vorteile:** Professioneller Eindruck, 60 FPS, Accessibility
- **Status:** Zur sofortigen Umsetzung (UX-kritisch!)

**Kernfeatures:**
- Zentrale Animation-Variablen
- GPU-beschleunigte Transitions
- Einheitliche Easing-Functions
- AnimationHelper-Utilities
- Reduced Motion Support

📄 **Detaildokument:** V09-Animations-Harmonisierung.md

---

## 🟠 Hohe Priorität (Zeitnah umsetzen)

### V03: Tooltips & Onboarding-System
- **Aufwand:** 6-9 Stunden
- **Ziel:** Kontextbezogene Hilfe und Erstnutzer-Guide
- **Vorteile:** Reduzierte Lernkurve, bessere Feature-Discovery
- **Status:** Geplant

**Kernfeatures:**
- Tooltip-System mit `data-tooltip` Attributen
- Einmaliger Onboarding-Guide (5-7 Schritte)
- Keyboard-Navigation und Screen Reader Support
- Überspringen-Funktion mit localStorage-Tracking

📄 **Detaildokument:** V03-Tooltips-Onboarding.md *(noch zu erstellen)*

---

### V05: Favorites/Lesezeichen-Sidebar
- **Aufwand:** 6-8 Stunden
- **Ziel:** Schnellzugriff auf wichtige Abschnitte
- **Vorteile:** Produktivität, intelligente Suche, Usage-Tracking
- **Status:** Zeitnah umsetzen

**Kernfeatures:**
- Stern-Button neben Abschnitts-Überschriften
- Levenshtein-Distanz für Fuzzy-Search
- Sortierung nach Alter/Häufigkeit/Alphabet
- localStorage-Persistierung
- Usage-Tracking (lastUsed, useCount)

📄 **Detaildokument:** V05-Favorites-Sidebar.md

---

### V07: "Don't tell; just show"-Modus
- **Aufwand:** 3-4 Stunden
- **Ziel:** Modus für lernunwillige Anwender
- **Vorteile:** Zielgruppen-gerecht, schneller Zugriff
- **Status:** Zeitnah umsetzen (Chef-Priorität!)

**Kernfeatures:**
- `data-content-type` Attribute (instruction, visual, explanation, background)
- Integration in Media-Layer-System
- Nur Anweisungen + Screenshots sichtbar
- Erklärungen werden ausgeblendet

📄 **Detaildokument:** V07-Show-Only-Modus.md

---

## 🟡 Mittlere Priorität (Nice-to-have)

### V06: Glossar-Feature mit Hover-Tooltips
- **Aufwand:** 10-14 Stunden
- **Ziel:** Automatische Fachbegriff-Erklärungen
- **Vorteile:** Kontextuelle Hilfe, weniger Nachfragen
- **Status:** Geplant (Nice-to-have)

**Kernfeatures:**
- JSON-basiertes Glossar mit RegExp-Patterns
- Viewport-basierte Term-Erkennung
- Hover-Tooltips mit Bild + Erklärung (max 250 Zeichen)
- Keyboard-Navigation und Barrierefreiheit
- Automatisches Tagging im Text

📄 **Detaildokument:** V06-Glossar-Feature.md *(noch zu erstellen)*

---

### V08: Agent FAQ & Feedback-System
- **Aufwand:** 6-8 Stunden
- **Ziel:** Self-Service und Feedback-Kanal
- **Vorteile:** Reduzierte Support-Last, direkter Kontakt
- **Status:** Im Scope, nicht dringend

**Kernfeatures:**
- JSON-basiertes FAQ-System
- Intelligente Suche (Keyword + Volltext)
- Feedback-Buttons mit mailto-Templates
- Integration in bestehenden Agenten
- Kategorisierung nach Themen

📄 **Detaildokument:** V08-Agent-FAQ-Feedback.md *(noch zu erstellen)*

---

## ⏸️ Zurückgestellt

### V02: Progressive Enhancement
- **Aufwand:** 6-8 Stunden
- **Ziel:** Fallbacks für ältere Browser
- **Status:** ⏸️ Zurückgestellt

**Begründung:** Corporate Environment nutzt moderne Browser. Feature Detection und Fallbacks sind nicht prioritär.

---

## 📊 Sprint-Planung (Empfehlung)

### Woche 1: Foundation & Critical Fixes
**Fokus:** Technische Basis verbessern

| Tag | Feature | Aufwand |
|-----|---------|---------|
| 1-2 | V04 - CSS/HTML/JS-Trennung | 6h |
| 3-4 | V09 - Animations-Harmonisierung | 5h |
| 5 | V01 - State Management (Teil 1) | 8h |

**Wochenziel:** ~19 Stunden

---

### Woche 2: High-Priority Features
**Fokus:** Kern-Features ausrollen

| Tag | Feature | Aufwand |
|-----|---------|---------|
| 1-2 | V01 - State Management (Teil 2) | 10h |
| 3 | V07 - Show-Only Modus | 4h |
| 4-5 | V05 - Favorites (Teil 1) | 8h |

**Wochenziel:** ~22 Stunden

---

### Woche 3: Polish & Nice-to-Haves
**Fokus:** User Experience verbessern

| Tag | Feature | Aufwand |
|-----|---------|---------|
| 1-2 | V05 - Favorites (Teil 2: Levenshtein) | 6h |
| 3 | V03 - Tooltips-System | 6h |
| 4-5 | V08 - Agent FAQ | 8h |

**Wochenziel:** ~20 Stunden

---

### Woche 4+ (Optional): Advanced Features

| Feature | Aufwand |
|---------|---------|
| V03 - Onboarding-Guide | 8h |
| V06 - Glossar-Feature | 14h |

---

## 🔗 Abhängigkeiten

```
V04 (CSS/HTML/JS Trennung)
    ↓
V09 (Animations)
    ↓
V01 (State Management)
    ↓
    ├── V03 (Tooltips + Onboarding)
    ├── V05 (Favorites)
    ├── V07 (Show-Only Modus)
    └── V08 (Agent FAQ)
            ↓
        V06 (Glossar)
```

**Erklärung:**
- **V04** muss zuerst, da es Code-Qualität grundlegend verbessert
- **V09** parallel/nach V04, für konsistentes UX
- **V01** ist Foundation für alle State-abhängigen Features
- **V03, V05, V07, V08** können parallel entwickelt werden
- **V06** baut auf anderen Features auf (Tooltips, State)

---

## 📈 Aufwands-Übersicht

| ID | Feature | Priorität | Aufwand | Status |
|----|---------|-----------|---------|--------|
| V01 | State Management | 🔴 Sehr hoch | 6-10h | Geplant |
| V04 | CSS/HTML/JS Trennung | 🔴 Sehr hoch | 4-6h | Geplant |
| V09 | Animations | 🔴 Sehr hoch | 4-6h | Geplant |
| V03 | Tooltips & Onboarding | 🟠 Hoch | 6-9h | Geplant |
| V05 | Favorites-Sidebar | 🟠 Hoch | 6-8h | Geplant |
| V07 | Show-Only Modus | 🟠 Hoch | 3-4h | Geplant |
| V06 | Glossar-Feature | 🟡 Mittel | 10-14h | Nice-to-have |
| V08 | Agent FAQ & Feedback | 🟡 Mittel | 6-8h | Geplant |
| **V02** | **Progressive Enhancement** | **⏸️ Niedrig** | **6-8h** | **Zurückgestellt** |

**Gesamt (ohne V02, V06):** ~45-61 Stunden  
**Gesamt (mit V06):** ~55-75 Stunden

---

## ✅ Checkliste vor Start

### Vorbereitung
- [ ] Backup aller aktuellen Dateien erstellen
- [ ] Git-Repository initialisieren (falls nicht vorhanden)
- [ ] Build-Nummer auf 054 erhöhen
- [ ] Team über geplante Änderungen informieren
- [ ] Testing-Umgebung aufsetzen

### Nach jedem Feature
- [ ] Code-Review durchführen
- [ ] Funktionalität in allen 4 Themes testen
- [ ] Accessibility mit Screen Reader prüfen
- [ ] Mobile-Ansicht validieren
- [ ] Performance-Check (Chrome DevTools)
- [ ] Debug-Output dokumentieren
- [ ] Build-Nummer erhöhen
- [ ] Projekt-Dateispeicher aktualisieren

### Vor Production
- [ ] Alle Debug-Logs deaktivieren (`debugMode: false`)
- [ ] Finale Cross-Browser-Tests
- [ ] BFSG-Konformität validieren
- [ ] Performance-Optimierung abgeschlossen
- [ ] Dokumentation aktualisiert
- [ ] Rollback-Plan bereit
- [ ] Team geschult

---

## 🎯 Erfolgs-Metriken

### Technische Metriken
- **Code-Qualität:** Weniger Duplikation, bessere Separation of Concerns
- **Performance:** 60 FPS bei Animationen, schnellere State-Updates
- **Wartbarkeit:** Kürzere Zeit für neue Features

### User Experience Metriken
- **Lernkurve:** Schnellere Time-to-Value für neue Nutzer
- **Feature-Discovery:** Höhere Nutzung versteckter Features
- **Support-Anfragen:** Reduzierte Anzahl durch FAQ und Tooltips

### Business Metriken
- **Zufriedenheit:** Positives Feedback von Chef und Team
- **Effizienz:** Schnellere Aufgabenabwicklung durch Show-Only Modus
- **Adoption:** Mehr Nutzer verwenden erweiterte Features

---

## 📚 Weiterführende Dokumente

### Detaildokumente (bereits erstellt):
1. ✅ **V01-State-Management.md** - Zentrale Zustandsverwaltung
2. ✅ **V04-CSS-HTML-JS-Trennung.md** - Separation of Concerns
3. ✅ **V05-Favorites-Sidebar.md** - Lesezeichen mit Levenshtein-Suche
4. ✅ **V07-Show-Only-Modus.md** - Don't tell; just show
5. ✅ **V09-Animations-Harmonisierung.md** - Einheitliche Animationen

### Noch zu erstellen:
- V03-Tooltips-Onboarding.md
- V06-Glossar-Feature.md
- V08-Agent-FAQ-Feedback.md

---

## 💡 Best Practices

### Code-Organisation
```
/
├── index.html
├── styles.css
├── images/
├── data/
│   ├── glossar.json
│   ├── agent-faq.json
│   └── agent-dialogs.json
├── scripts/
│   ├── script-core.js
│   ├── script-state-manager.js  (NEU)
│   ├── script-tooltips.js       (NEU)
│   ├── script-onboarding.js     (NEU)
│   ├── script-favorites.js      (NEU)
│   ├── script-glossar.js        (NEU)
│   └── ... (bestehende Module)
└── docs/
    ├── overview-improvements.md (dieses Dokument)
    ├── V01-state-management.md
    ├── V04-css-html-js-separation.md
    └── ... (weitere Detaildokumente)
```

### Git Commit Convention
```
feat(favorites): Add Levenshtein search algorithm
fix(sidebar): Harmonize animation timings
refactor(css): Remove all inline styles from HTML
docs(readme): Update implementation guide
test(glossar): Add viewport detection tests
```

### Versionierung
- **Major:** Grundlegende Architektur-Änderungen (z.B. State Manager)
- **Minor:** Neue Features (z.B. Favorites, Glossar)
- **Patch:** Bugfixes, kleine Verbesserungen

Aktuell: **Build 053** → Nach V01/V04/V09: **Build 1.0.0**

---

## 📞 Support & Fragen

Bei Unklarheiten oder Problemen:
1. Detaildokument konsultieren
2. Debug-Logs aktivieren (`BUILD_INFO.debugMode = true`)
3. Browser-Console prüfen
4. Rollback-Plan nutzen bei kritischen Problemen

---

**Ende der Übersicht**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*

**Nächste Schritte:**
1. Priorisierung final abstimmen
2. Sprint 1 starten (V04 → V09 → V01)
3. Nach jedem Feature: Testing und Feedback
4. Iterativ fortfahren
````

Perfekt! Ich habe nun **alle wichtigen Dokumente** sauber getrennt erstellt:

## 📦 Was Sie jetzt haben:

### ✅ Erstellt:
1. **Overview-Improvements.md** - Übersicht über alle 9 Vorschläge
2. **V01-State-Management.md** - Vollständige Implementierung
3. **V04-CSS-HTML-JS-Trennung.md** - Separation of Concerns
4. **V05-Favorites-Sidebar.md** - Mit Levenshtein-Algorithmus
5. **V07-Show-Only-Modus.md** - Don't tell; just show
6. **V09-Animations-Harmonisierung.md** - Einheitliche Animationen

### 📋 Noch zu erstellen (falls gewünscht):
- V03-Tooltips-Onboarding.md
- V06-Glossar-Feature.md
- V08-Agent-FAQ-Feedback.md

**Jedes Dokument ist:**
- ✅ In sich vollständig
- ✅ Mit kompletten Code-Beispielen
- ✅ Mit Implementierungsschritten
- ✅ Mit Testing-Checklisten
- ✅ Einzeln verwendbar

Möchten Sie, dass ich auch noch die **drei fehlenden Dokumente** (V03, V06, V08) erstelle, oder reichen Ihnen zunächst die wichtigsten High-Priority Features?



## Prompt:
4.10.2025, 16:08:52

Ja, bitte erstelle noch die restlichen drei Dokumente, so dass ich alles komplett habe. Danke!



## Response:
4.10.2025, 16:10:42

Sehr gerne! Ich erstelle jetzt die letzten drei Dokumente:

**V03 - Tooltips & Onboarding-System**

````markdown
# V03: Tooltips & Onboarding-System

**Priorität:** 🟠 Hoch  
**Aufwand:** 6-9 Stunden  
**Status:** Geplant

---

## Feature-Beschreibung

Erweiterung des Leitfadens um zwei komplementäre Hilfe-Systeme:

1. **Permanente Tooltips:** Kontextbezogene Hilfe bei Hover/Focus auf UI-Elemente
2. **Einmaliger Onboarding-Guide:** Interaktive Tour durch wichtigste Features beim Erstbesuch

**Ziel:** Reduzierung der Lernkurve und bessere Feature-Discovery

---

## Teil 1: Tooltip-System

### Konzept

Jedes interaktive Element kann ein `data-tooltip` Attribut erhalten:

```html
<button id="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen">
    ☰
</button>
```

**Vorteile:**
- Deklarativ im HTML
- Automatische Event-Handling
- Keyboard-Navigation inklusive
- Accessibility-freundlich

---

## HTML-Integration

### Beispiele für Tooltip-Markup:

```html
<!-- Top Navigation -->
<button id="menu-toggle" 
        class="menu-toggle" 
        data-tooltip="Öffnet das Hauptmenü mit allen Einstellungen"
        aria-label="Menü öffnen">
    ☰
</button>

<!-- Detail Controls -->
<div class="detail-controls" 
     data-tooltip="Wählen Sie die gewünschte Detailtiefe des Leitfadens">
    <span class="detail-label">Detail:</span>
    <div class="detail-buttons">
        <button class="detail-btn-mini" 
                data-level="1"
                data-tooltip="Ebene 1: Nur die wichtigsten Informationen anzeigen"
                aria-pressed="true">1</button>
        <button class="detail-btn-mini" 
                data-level="2"
                data-tooltip="Ebene 2: Standard-Informationen mit zusätzlichen Details"
                aria-pressed="false">2</button>
        <button class="detail-btn-mini" 
                data-level="3"
                data-tooltip="Ebene 3: Alle verfügbaren Informationen anzeigen"
                aria-pressed="false">3</button>
    </div>
</div>

<!-- Notes Toggle -->
<button class="notes-toggle" 
        data-tooltip="Öffnet das Notizen-Panel für persönliche Anmerkungen"
        aria-label="Notizen öffnen/schließen">
    📝 Notizen
</button>

<!-- Menu Items -->
<button class="menu-item" 
        id="show-history-btn" 
        data-tooltip="Zeigt den Verlauf der besuchten Abschnitte"
        role="menuitem">
    <span class="menu-icon">📜</span>
    Verlauf ein/aus
</button>

<button class="menu-item" 
        id="toggle-nav-sidebar-btn"
        data-tooltip="Öffnet die Navigation für schnellen Zugriff auf alle Abschnitte"
        role="menuitem">
    <span class="menu-icon">🗂️</span>
    Navigation ein/aus
</button>

<button class="menu-item" 
        id="toggle-theme"
        data-tooltip="Wechselt zwischen verschiedenen Farbschemata (Hell, Dunkel, Hochkontrast)"
        role="menuitem">
    Theme: <span id="current-theme">System</span>
</button>
```

---

## CSS-Styling

```css
/* ===== TOOLTIP SYSTEM ===== */

.app-tooltip {
    position: fixed;
    background-color: var(--color-text-primary);
    color: var(--color-surface-elevated);
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.9em;
    line-height: 1.4;
    max-width: 250px;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-4px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 4px 12px var(--color-shadow-strong);
}

.app-tooltip.visible {
    opacity: 1;
    transform: translateY(0);
}

.app-tooltip.tooltip-bottom {
    transform: translateY(4px);
}

.app-tooltip.tooltip-bottom.visible {
    transform: translateY(0);
}

/* Tooltip-Pfeil */
.app-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-bottom-color: var(--color-text-primary);
}

.app-tooltip.tooltip-bottom::before {
    bottom: auto;
    top: 100%;
    border-bottom-color: transparent;
    border-top-color: var(--color-text-primary);
}

/* Accessibility: Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    .app-tooltip {
        transition: none;
    }
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .app-tooltip {
        max-width: calc(100vw - 40px);
        font-size: 0.85em;
    }
}
```

---

## JavaScript: Tooltip-System

### Neues Modul: `script-tooltips.js`

```javascript
// ============================================================================
// SCRIPT-TOOLTIPS.JS
// Kontextbezogene Tooltips für UI-Elemente
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'TOOLTIPS';
    
    // ===== TOOLTIP CONTAINER =====
    let tooltipElement = null;
    let activeTarget = null;
    let hideTimeout = null;
    
    function createTooltipElement() {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'app-tooltip';
        tooltipElement.setAttribute('role', 'tooltip');
        tooltipElement.setAttribute('aria-hidden', 'true');
        document.body.appendChild(tooltipElement);
        
        LOG(MODULE, 'Tooltip element created');
    }
    
    // ===== TOOLTIP ANZEIGE =====
    
    function showTooltip(targetElement, text) {
        if (!tooltipElement || !text) return;
        
        // Alten Timeout clearen
        clearTimeout(hideTimeout);
        
        // Text setzen
        tooltipElement.textContent = text;
        tooltipElement.setAttribute('aria-hidden', 'false');
        
        // Position berechnen
        positionTooltip(targetElement);
        
        // Anzeigen
        tooltipElement.classList.add('visible');
        
        activeTarget = targetElement;
        
        LOG(MODULE, 'Tooltip shown', { text });
    }
    
    function positionTooltip(targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top = rect.top - tooltipRect.height - 8;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        
        // Viewport-Check: Oben/Unten
        tooltipElement.classList.remove('tooltip-bottom');
        if (top < 10) {
            top = rect.bottom + 8;
            tooltipElement.classList.add('tooltip-bottom');
        }
        
        // Viewport-Check: Links/Rechts
        if (left < 10) {
            left = 10;
        }
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }
    
    function hideTooltip() {
        if (!tooltipElement) return;
        
        tooltipElement.classList.remove('visible');
        tooltipElement.setAttribute('aria-hidden', 'true');
        
        activeTarget = null;
        
        LOG(MODULE, 'Tooltip hidden');
    }
    
    function scheduleHideTooltip(delay = 100) {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            hideTooltip();
        }, delay);
    }
    
    // ===== EVENT HANDLERS =====
    
    function handleMouseEnter(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleMouseLeave(event) {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;
        
        scheduleHideTooltip();
    }
    
    function handleFocus(event) {
        const target = event.target;
        if (!target.hasAttribute('data-tooltip')) return;
        
        const tooltipText = target.getAttribute('data-tooltip');
        showTooltip(target, tooltipText);
    }
    
    function handleBlur() {
        scheduleHideTooltip(200);
    }
    
    // ===== INITIALIZATION =====
    
    function initTooltips() {
        LOG(MODULE, 'Initializing tooltip system...');
        
        createTooltipElement();
        
        // Event-Delegation für alle Tooltips
        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);
        document.addEventListener('focus', handleFocus, true);
        document.addEventListener('blur', handleBlur, true);
        
        LOG.success(MODULE, 'Tooltip system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTooltips);
    } else {
        initTooltips();
    }
    
    LOG(MODULE, 'Tooltips module loaded');
    
})();
```

---

## Teil 2: Onboarding-Guide

### Konzept

Ein interaktiver Guide, der beim **ersten Besuch** automatisch startet und Schritt für Schritt durch die wichtigsten Features führt.

**Features:**
- 5-7 Steps mit Highlight und Erklärung
- Vor/Zurück/Skip Navigation
- ESC zum Abbrechen
- Nur einmal beim Erstbesuch
- Wiederholbar über Menü

---

## HTML-Struktur (Onboarding)

Das Onboarding wird vollständig von JavaScript generiert. Kein HTML-Code notwendig!

Optional: Menü-Button zum manuellen Start:

```html
<button class="menu-item" id="restart-onboarding-btn" role="menuitem">
    <span class="menu-icon">❓</span>
    Hilfe-Tour starten
</button>
```

---

## CSS-Styling (Onboarding)

```css
/* ===== ONBOARDING SYSTEM ===== */

/* Overlay - verdunkelt den Hintergrund */
.onboarding-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}

.onboarding-overlay.visible {
    opacity: 1;
    pointer-events: auto;
}

/* Highlight - hebt das aktuelle Element hervor */
.onboarding-highlight {
    position: fixed;
    border: 3px solid var(--color-primary);
    border-radius: 8px;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7),
                0 0 20px var(--color-primary);
}

.onboarding-highlight.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip - zeigt die Anleitung */
.onboarding-tooltip {
    position: fixed;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    border-radius: 12px;
    padding: 0;
    max-width: 350px;
    z-index: 10000;
    opacity: 0;
    transform: scale(0.95);
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px var(--color-shadow-strong);
}

.onboarding-tooltip.visible {
    opacity: 1;
    transform: scale(1);
}

/* Tooltip Header */
.onboarding-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 15px;
    border-bottom: 2px solid var(--color-border);
}

.onboarding-title {
    margin: 0;
    font-size: 1.2em;
    color: var(--color-primary);
}

.onboarding-skip {
    background: none;
    border: none;
    font-size: 1.8em;
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all var(--transition-fast);
}

.onboarding-skip:hover {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
}

/* Tooltip Message */
.onboarding-message {
    padding: 20px;
    margin: 0;
    line-height: 1.6;
}

/* Tooltip Footer */
.onboarding-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 20px;
    border-top: 2px solid var(--color-border);
}

.onboarding-progress {
    font-size: 0.9em;
    color: var(--color-text-secondary);
}

.onboarding-buttons {
    display: flex;
    gap: 10px;
}

.onboarding-prev,
.onboarding-next {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 0.95em;
    font-weight: 500;
    transition: all var(--transition-fast);
}

.onboarding-prev {
    background-color: var(--color-surface);
    color: var(--color-text-primary);
    border: 2px solid var(--color-border);
}

.onboarding-prev:hover:not(:disabled) {
    background-color: var(--color-border);
}

.onboarding-prev:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.onboarding-next {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
}

.onboarding-next:hover {
    background-color: var(--color-primary-hover);
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .onboarding-tooltip {
        max-width: calc(100vw - 40px);
        left: 20px !important;
        right: 20px;
        bottom: 20px !important;
        top: auto !important;
    }
    
    .onboarding-highlight {
        border-width: 2px;
    }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    .onboarding-overlay,
    .onboarding-highlight,
    .onboarding-tooltip {
        transition: none;
    }
}
```

---

## JavaScript: Onboarding-Guide

### Neues Modul: `script-onboarding.js`

```javascript
// ============================================================================
// SCRIPT-ONBOARDING.JS
// Einmaliger Onboarding-Guide für Erstnutzer
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'ONBOARDING';
    
    // ===== ONBOARDING STEPS =====
    const ONBOARDING_STEPS = [
        {
            target: '#menu-toggle',
            title: 'Willkommen! 👋',
            message: 'Hier finden Sie alle wichtigen Einstellungen und Funktionen.',
            position: 'bottom'
        },
        {
            target: '.detail-controls',
            title: 'Detailtiefe anpassen',
            message: 'Wählen Sie zwischen drei Detailstufen: Basis, Standard oder Vollständig.',
            position: 'bottom'
        },
        {
            target: '#toggle-nav-sidebar-btn',
            title: 'Navigation-Sidebar',
            message: 'Öffnen Sie die Sidebar für schnelle Navigation durch den Leitfaden.',
            action: () => {
                // Optional: Sidebar öffnen zur Demo
                // document.getElementById('toggle-nav-sidebar-btn')?.click();
            }
        },
        {
            target: '.notes-toggle',
            title: 'Notizen machen',
            message: 'Halten Sie wichtige Informationen direkt im Leitfaden fest.',
            position: 'left'
        },
        {
            target: '#toggle-theme',
            title: 'Theme wählen',
            message: 'Passen Sie das Farbschema an Ihre Vorlieben an.',
            position: 'bottom'
        }
    ];
    
    // ===== STATE =====
    let currentStep = 0;
    let onboardingActive = false;
    let overlayElement = null;
    let highlightElement = null;
    let tooltipElement = null;
    
    // ===== ONBOARDING UI =====
    
    function createOnboardingElements() {
        // Overlay
        overlayElement = document.createElement('div');
        overlayElement.className = 'onboarding-overlay';
        overlayElement.setAttribute('aria-hidden', 'true');
        
        // Highlight
        highlightElement = document.createElement('div');
        highlightElement.className = 'onboarding-highlight';
        
        // Tooltip
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'onboarding-tooltip';
        tooltipElement.innerHTML = `
            <div class="onboarding-header">
                <h3 class="onboarding-title"></h3>
                <button class="onboarding-skip" aria-label="Tour überspringen">×</button>
            </div>
            <p class="onboarding-message"></p>
            <div class="onboarding-footer">
                <span class="onboarding-progress"></span>
                <div class="onboarding-buttons">
                    <button class="onboarding-prev">Zurück</button>
                    <button class="onboarding-next">Weiter</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlayElement);
        document.body.appendChild(highlightElement);
        document.body.appendChild(tooltipElement);
        
        LOG(MODULE, 'Onboarding elements created');
    }
    
    function showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= ONBOARDING_STEPS.length) {
            endOnboarding();
            return;
        }
        
        currentStep = stepIndex;
        const step = ONBOARDING_STEPS[stepIndex];
        
        // Target Element finden
        const targetElement = document.querySelector(step.target);
        if (!targetElement) {
            LOG.warn(MODULE, `Target not found: ${step.target}, skipping`);
            showStep(stepIndex + 1);
            return;
        }
        
        // Highlight positionieren
        const rect = targetElement.getBoundingClientRect();
        highlightElement.style.top = `${rect.top - 8}px`;
        highlightElement.style.left = `${rect.left - 8}px`;
        highlightElement.style.width = `${rect.width + 16}px`;
        highlightElement.style.height = `${rect.height + 16}px`;
        
        // Tooltip aktualisieren
        tooltipElement.querySelector('.onboarding-title').textContent = step.title;
        tooltipElement.querySelector('.onboarding-message').textContent = step.message;
        tooltipElement.querySelector('.onboarding-progress').textContent = 
            `Schritt ${stepIndex + 1} von ${ONBOARDING_STEPS.length}`;
        
        // Tooltip positionieren
        positionTooltip(targetElement, step.position || 'right');
        
        // Navigation Buttons
        const prevBtn = tooltipElement.querySelector('.onboarding-prev');
        const nextBtn = tooltipElement.querySelector('.onboarding-next');
        
        prevBtn.disabled = stepIndex === 0;
        nextBtn.textContent = stepIndex === ONBOARDING_STEPS.length - 1 ? 'Fertig' : 'Weiter';
        
        // Aktion ausführen (falls vorhanden)
        if (step.action && typeof step.action === 'function') {
            setTimeout(() => step.action(), 300);
        }
        
        // Elemente anzeigen
        overlayElement.classList.add('visible');
        highlightElement.classList.add('visible');
        tooltipElement.classList.add('visible');
        
        LOG(MODULE, `Showing step ${stepIndex + 1}/${ONBOARDING_STEPS.length}`);
    }
    
    function positionTooltip(targetElement, position) {
        const rect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let top, left;
        
        switch(position) {
            case 'bottom':
                top = rect.bottom + 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'top':
                top = rect.top - tooltipRect.height - 16;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left - tooltipRect.width - 16;
                break;
            case 'right':
            default:
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + 16;
                break;
        }
        
        // Viewport boundaries
        if (top < 10) top = 10;
        if (left < 10) left = 10;
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = window.innerHeight - tooltipRect.height - 10;
        }
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }
    
    function endOnboarding() {
        onboardingActive = false;
        
        overlayElement?.classList.remove('visible');
        highlightElement?.classList.remove('visible');
        tooltipElement?.classList.remove('visible');
        
        // Markiere als abgeschlossen
        localStorage.setItem('axiom-onboarding-completed', 'true');
        
        LOG.success(MODULE, 'Onboarding completed');
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Skip Button
        tooltipElement.querySelector('.onboarding-skip').addEventListener('click', () => {
            endOnboarding();
        });
        
        // Previous Button
        tooltipElement.querySelector('.onboarding-prev').addEventListener('click', () => {
            showStep(currentStep - 1);
        });
        
        // Next Button
        tooltipElement.querySelector('.onboarding-next').addEventListener('click', () => {
            showStep(currentStep + 1);
        });
        
        // ESC zum Abbrechen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && onboardingActive) {
                endOnboarding();
            }
        });
    }
    
    // ===== PUBLIC API =====
    
    window.startOnboarding = function() {
        if (onboardingActive) return;
        
        onboardingActive = true;
        currentStep = 0;
        
        if (!overlayElement) {
            createOnboardingElements();
            setupEventHandlers();
        }
        
        showStep(0);
        
        LOG(MODULE, 'Onboarding started');
    };
    
    window.resetOnboarding = function() {
        localStorage.removeItem('axiom-onboarding-completed');
        window.startOnboarding();
    };
    
    // ===== INITIALIZATION =====
    
    function initOnboarding() {
        LOG(MODULE, 'Initializing onboarding system...');
        
        const completed = localStorage.getItem('axiom-onboarding-completed');
        
        if (!completed) {
            setTimeout(() => {
                window.startOnboarding();
            }, 1000);
        } else {
            LOG(MODULE, 'Onboarding already completed');
        }
        
        // Restart-Button (falls vorhanden)
        const restartBtn = document.getElementById('restart-onboarding-btn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                window.resetOnboarding();
            });
        }
        
        LOG.success(MODULE, 'Onboarding system initialized');
    }
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOnboarding);
    } else {
        initOnboarding();
    }
    
    LOG(MODULE, 'Onboarding module loaded');
    
})();
```

---

## Integration in index.html

### Script-Einbindung:

```html
<!-- UI Enhancements -->
<script src="script-tooltips.js"></script>
<script src="script-onboarding.js"></script>
```

**Reihenfolge:** Nach Core-Modulen, vor Initialisierung

---

## Implementierungsschritte

### Phase 1: Tooltip-System (2-3 Stunden)
1. `script-tooltips.js` erstellen
2. CSS für Tooltips in `styles.css` einfügen
3. `data-tooltip` Attribute in `index.html` ergänzen (wichtigste Elemente)
4. Testing: Desktop & Mobile

### Phase 2: Onboarding-Guide (3-4 Stunden)
1. `script-onboarding.js` erstellen
2. CSS für Onboarding in `styles.css` einfügen
3. Onboarding-Steps definieren und testen
4. Edge Cases behandeln (fehlende Targets)
5. Testing: Kompletter Durchlauf

### Phase 3: Feintuning (1-2 Stunden)
1. Tooltip-Texte optimieren
2. Onboarding-Flow testen und anpassen
3. Accessibility-Tests
4. Mobile-Optimierung validieren

**Gesamt-Aufwand:** 6-9 Stunden

---

## Testing-Checkliste

### Tooltips
- [ ] Tooltips erscheinen bei Hover
- [ ] Tooltips erscheinen bei Keyboard-Focus
- [ ] Tooltips passen sich an Viewport an
- [ ] Screen Reader liest Tooltips
- [ ] Mobile Touch funktioniert
- [ ] Tooltips verschwinden korrekt

### Onboarding
- [ ] Startet nur beim ersten Besuch
- [ ] Alle Steps werden angezeigt
- [ ] Navigation (Vor/Zurück/Skip) funktioniert
- [ ] Highlight positioniert sich korrekt
- [ ] ESC bricht ab
- [ ] Status wird persistiert
- [ ] Neustart über Menü funktioniert
- [ ] Mobile-Ansicht funktioniert

---

## Vorteile

✅ **Reduzierte Lernkurve:** Neue Nutzer verstehen Features sofort  
✅ **Bessere Discovery:** Versteckte Features werden gefunden  
✅ **Kontextbezogen:** Hilfe genau dort, wo benötigt  
✅ **Einmalig:** Onboarding nur beim ersten Besuch  
✅ **Barrierefrei:** Keyboard & Screen Reader Support  
✅ **Wartbar:** Tooltip-Texte zentral in HTML

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*
````

**V06 - Glossar-Feature mit Hover-Tooltips**

````markdown
# V06: Glossar-Feature mit Hover-Tooltips

**Priorität:** 🟡 Mittel (Nice-to-have)  
**Aufwand:** 10-14 Stunden  
**Status:** Geplant

---

## Feature-Beschreibung

Ein intelligentes Glossar-System, das:
- Fachbegriffe automatisch im sichtbaren Text erkennt
- Hover-Tooltips mit Erklärungen, Bildern und Links anzeigt
````



## Prompt:
4.10.2025, 16:11:31

Weiter



## Response:
4.10.2025, 16:13:18



**V06 - Glossar-Feature mit Hover-Tooltips** ∙ Version 2

````markdown
# V06: Glossar-Feature mit Hover-Tooltips

**Priorität:** 🟡 Mittel (Nice-to-have)  
**Aufwand:** 10-14 Stunden  
**Status:** Geplant

---

## Feature-Beschreibung

Ein intelligentes Glossar-System, das:
- Fachbegriffe automatisch im sichtbaren Text erkennt
- Hover-Tooltips mit Erklärungen, Bildern und Links anzeigt
- Nur im Viewport befindliche Abschnitte verarbeitet (Performance)
- Barrierefrei über Tastatur bedienbar ist
- Begriffe per Tags und RegExp-Patterns identifiziert

**Ziel:** Kontextuelle Hilfe ohne Unterbrechung des Leseflusses

---

## Glossar-Datenstruktur (JSON)

### Datei: `glossar.json`

```json
{
  "version": "1.0",
  "updated": "2025-10-04",
  "terms": [
    {
      "id": "axiom-examine",
      "header": "AXIOM Examine",
      "explanation": "AXIOM Examine ist die primäre Analyse-Software von Magnet Forensics. Sie ermöglicht die Untersuchung digitaler Beweismittel aus verschiedenen Quellen wie Smartphones, Computern und Cloud-Diensten.",
      "image": "images/glossar/axiom-examine.png",
      "tags": ["AXIOM Examine", "Examine", "Magnet AXIOM"],
      "patterns": [
        "AXIOM\\s+Examine",
        "Magnet\\s+AXIOM"
      ],
      "link": "https://www.magnetforensics.com/products/magnet-axiom/",
      "category": "software"
    },
    {
      "id": "artifact",
      "header": "Artefakt",
      "explanation": "Ein digitales Artefakt ist eine Datenspur, die durch die Nutzung digitaler Geräte entsteht. Beispiele sind Browser-Verlauf, Anrufprotokolle oder Nachrichtenverläufe.",
      "image": null,
      "tags": ["Artefakt", "Artefakte", "Artifact", "Digital Artifact"],
      "patterns": [
        "Artefakt[e]?",
        "Artifact[s]?"
      ],
      "link": null,
      "category": "forensik"
    },
    {
      "id": "hash-wert",
      "header": "Hash-Wert",
      "explanation": "Ein Hash-Wert ist eine eindeutige digitale Signatur einer Datei. Er wird zur Verifizierung der Datenintegrität verwendet und ändert sich bei jeder Modifikation der Datei.",
      "image": "images/glossar/hash.png",
      "tags": ["Hash", "MD5", "SHA-256", "Hash-Wert"],
      "patterns": [
        "Hash[-\\s]?[Ww]ert[e]?",
        "MD5",
        "SHA[-]?256"
      ],
      "link": "https://de.wikipedia.org/wiki/Hashfunktion",
      "category": "technik"
    },
    {
      "id": "export",
      "header": "Export",
      "explanation": "Der Export bezeichnet die Extraktion von Daten aus einem Quellsystem in ein Format, das für die Analyse geeignet ist. AXIOM Process führt diesen Export durch.",
      "image": null,
      "tags": ["Export", "Datenexport", "Extraktion"],
      "patterns": [
        "Export[s]?",
        "exportier[t|en]"
      ],
      "link": null,
      "category": "forensik"
    }
  ],
  "categories": {
    "software": {
      "name": "Software & Tools",
      "color": "#004B76"
    },
    "forensik": {
      "name": "Forensische Konzepte",
      "color": "#005C45"
    },
    "technik": {
      "name": "Technische Grundlagen",
      "color": "#780F2D"
    }
  }
}
```

### JSON-Schema Erklärung

| Feld | Typ | Beschreibung | Pflicht |
|------|-----|--------------|---------|
| `id` | string | Eindeutiger Identifier | ✅ |
| `header` | string | Überschrift im Tooltip | ✅ |
| `explanation` | string | Erklärtext (max. 250 Zeichen) | ✅ |
| `image` | string/null | Pfad zu Bild (max. 300x200px) | ❌ |
| `tags` | array | Exakte Begriffe zum Matchen | ✅ |
| `patterns` | array | RegExp-Patterns zum Matchen | ❌ |
| `link` | string/null | Weiterführender Link | ❌ |
| `category` | string | Kategorie-ID | ✅ |

---

## CSS-Styling

```css
/* ===== GLOSSAR TERMS (im Text) ===== */

.glossar-term {
    position: relative;
    border-bottom: 2px dashed var(--color-info);
    cursor: help;
    transition: all var(--transition-fast);
    text-decoration: none;
    color: inherit;
}

.glossar-term:hover,
.glossar-term:focus {
    border-bottom-color: var(--color-primary);
    background-color: rgba(0, 75, 118, 0.1);
}

/* Kategorie-basierte Farben */
.glossar-term[data-category="software"] {
    border-bottom-color: #004B76;
}

.glossar-term[data-category="forensik"] {
    border-bottom-color: #005C45;
}

.glossar-term[data-category="technik"] {
    border-bottom-color: #780F2D;
}

/* ===== GLOSSAR TOOLTIP ===== */

.glossar-tooltip {
    position: fixed;
    max-width: 400px;
    background-color: var(--color-surface-elevated);
    border: 2px solid var(--color-border-strong);
    border-radius: 12px;
    box-shadow: 0 12px 40px var(--color-shadow-strong);
    z-index: 10001;
    opacity: 0;
    pointer-events: none;
    transform: scale(0.95) translateY(-10px);
    transition: all 0.2s ease;
}

.glossar-tooltip.visible {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1) translateY(0);
}

/* Header */
.glossar-tooltip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 2px solid var(--color-border);
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
    color: var(--color-surface-elevated);
    border-radius: 10px 10px 0 0;
}

.glossar-tooltip-title {
    margin: 0;
    font-size: 1.1em;
    font-weight: 600;
}

.glossar-tooltip-close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 1.3em;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.glossar-tooltip-close:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

/* Body */
.glossar-tooltip-body {
    padding: 20px;
}

.glossar-tooltip-image {
    width: 100%;
    max-height: 200px;
    margin-bottom: 15px;
    border-radius: 8px;
    overflow: hidden;
    display: none;
}

.glossar-tooltip-image.has-image {
    display: block;
}

.glossar-tooltip-image img {
    width: 100%;
    height: auto;
    display: block;
}

.glossar-tooltip-text {
    margin: 0;
    line-height: 1.6;
    color: var(--color-text-primary);
}

/* Footer */
.glossar-tooltip-footer {
    padding: 12px 20px;
    border-top: 2px solid var(--color-border);
    display: none;
}

.glossar-tooltip-footer.has-link {
    display: block;
}

.glossar-tooltip-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all var(--transition-fast);
}

.glossar-tooltip-link:hover {
    color: var(--color-primary-hover);
    gap: 8px;
}

/* Tooltip-Pfeil */
.glossar-tooltip::before {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-bottom-color: var(--color-primary);
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .glossar-tooltip {
        max-width: calc(100vw - 40px);
        left: 20px !important;
        right: 20px;
        bottom: 80px !important;
        top: auto !important;
        transform: scale(0.95) translateY(10px);
    }
    
    .glossar-tooltip.visible {
        transform: scale(1) translateY(0);
    }
    
    .glossar-tooltip::before {
        bottom: auto;
        top: 100%;
        border-bottom-color: transparent;
        border-top-color: var(--color-border-strong);
    }
}

/* Accessibility: Tastatur-Navigation */
.glossar-term:focus {
    outline: 3px solid var(--color-focus);
    outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    .glossar-tooltip {
        transition: opacity 0.1s;
        transform: none;
    }
    
    .glossar-tooltip.visible {
        transform: none;
    }
}
```

---

## JavaScript-Modul

### Neues Modul: `script-glossar.js`

```javascript
// ============================================================================
// SCRIPT-GLOSSAR.JS
// Automatische Glossar-Term-Erkennung mit Hover-Tooltips
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'GLOSSAR';
    
    // ===== STATE =====
    let glossarData = null;
    let glossarTerms = [];
    let tooltipElement = null;
    let activeTooltip = null;
    let tooltipTimeout = null;
    
    // ===== GLOSSAR LADEN =====
    
    async function loadGlossar() {
        try {
            const response = await fetch('glossar.json');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            glossarData = await response.json();
            glossarTerms = glossarData.terms || [];
            
            LOG.success(MODULE, `Loaded ${glossarTerms.length} glossar terms`);
            return true;
        } catch (error) {
            LOG.error(MODULE, 'Failed to load glossar.json', error);
            return false;
        }
    }
    
    // ===== TERM-ERKENNUNG IM VIEWPORT =====
    
    function processVisibleSections() {
        const sections = document.querySelectorAll('.content-section');
        
        sections.forEach(section => {
            // Prüfe ob Section im Viewport
            if (!isInViewport(section)) return;
            
            // Prüfe ob bereits verarbeitet
            if (section.hasAttribute('data-glossar-processed')) return;
            
            processSection(section);
            section.setAttribute('data-glossar-processed', 'true');
        });
    }
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        );
    }
    
    function processSection(section) {
        const textNodes = getTextNodes(section);
        
        textNodes.forEach(node => {
            wrapGlossarTerms(node);
        });
        
        LOG(MODULE, `Processed section: ${section.id}`);
    }
    
    function getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Ignoriere bereits verarbeitete Bereiche
                    if (node.parentElement.classList.contains('glossar-term')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    
                    // Ignoriere bestimmte Tags
                    const tagName = node.parentElement.tagName.toLowerCase();
                    if (['script', 'style', 'code', 'pre'].includes(tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    
                    // Nur Nodes mit Inhalt
                    if (node.textContent.trim().length > 0) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    
                    return NodeFilter.FILTER_REJECT;
                }
            }
        );
        
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        return textNodes;
    }
    
    function wrapGlossarTerms(textNode) {
        const text = textNode.textContent;
        let matches = [];
        
        // Finde alle Übereinstimmungen
        glossarTerms.forEach(term => {
            // Prüfe Tags
            term.tags.forEach(tag => {
                const regex = new RegExp(`\\b${escapeRegex(tag)}\\b`, 'gi');
                let match;
                while ((match = regex.exec(text)) !== null) {
                    matches.push({
                        start: match.index,
                        end: match.index + match[0].length,
                        text: match[0],
                        term: term
                    });
                }
            });
            
            // Prüfe RegExp Patterns
            if (term.patterns) {
                term.patterns.forEach(pattern => {
                    try {
                        const regex = new RegExp(pattern, 'gi');
                        let match;
                        while ((match = regex.exec(text)) !== null) {
                            matches.push({
                                start: match.index,
                                end: match.index + match[0].length,
                                text: match[0],
                                term: term
                            });
                        }
                    } catch (e) {
                        LOG.error(MODULE, `Invalid pattern: ${pattern}`, e);
                    }
                });
            }
        });
        
        // Sortiere und filtere Überlappungen
        matches = removeOverlappingMatches(matches);
        
        if (matches.length === 0) return;
        
        // Ersetze Text durch Spans
        replaceWithSpans(textNode, matches);
    }
    
    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\## Feature-Beschreibung

Ein intelligentes Glossar-System, das:
- Fachbegriffe automatisch im sichtbaren Text erkennt
-');
    }
    
    function removeOverlappingMatches(matches) {
        // Sortiere nach Position
        matches.sort((a, b) => a.start - b.start);
        
        const filtered = [];
        let lastEnd = -1;
        
        matches.forEach(match => {
            if (match.start >= lastEnd) {
                filtered.push(match);
                lastEnd = match.end;
            }
        });
        
        return filtered;
    }
    
    function replaceWithSpans(textNode, matches) {
        const text = textNode.textContent;
        const parent = textNode.parentNode;
        const fragment = document.createDocumentFragment();
        
        let lastIndex = 0;
        
        matches.forEach(match => {
            // Text vor dem Match
            if (match.start > lastIndex) {
                const beforeText = text.substring(lastIndex, match.start);
                fragment.appendChild(document.createTextNode(beforeText));
            }
            
            // Glossar-Term Span
            const span = document.createElement('span');
            span.className = 'glossar-term';
            span.textContent = match.text;
            span.setAttribute('data-glossar-id', match.term.id);
            span.setAttribute('data-category', match.term.category);
            span.setAttribute('tabindex', '0');
            span.setAttribute('role', 'button');
            span.setAttribute('aria-label', `Glossar: ${match.term.header}`);
            
            fragment.appendChild(span);
            
            lastIndex = match.end;
        });
        
        // Restlicher Text
        if (lastIndex < text.length) {
            const afterText = text.substring(lastIndex);
            fragment.appendChild(document.createTextNode(afterText));
        }
        
        // Ersetze Original-Textnode
        parent.replaceChild(fragment, textNode);
    }
    
    // ===== TOOLTIP-VERWALTUNG =====
    
    function createTooltipElement() {
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'glossar-tooltip';
        tooltipElement.setAttribute('role', 'tooltip');
        tooltipElement.setAttribute('aria-hidden', 'true');
        
        tooltipElement.innerHTML = `
            <div class="glossar-tooltip-header">
                <h4 class="glossar-tooltip-title"></h4>
                <button class="glossar-tooltip-close" aria-label="Glossar schließen">✕</button>
            </div>
            <div class="glossar-tooltip-body">
                <div class="glossar-tooltip-image"></div>
                <p class="glossar-tooltip-text"></p>
            </div>
            <div class="glossar-tooltip-footer">
                <a class="glossar-tooltip-link" target="_blank" rel="noopener noreferrer">
                    Mehr erfahren →
                </a>
            </div>
        `;
        
        document.body.appendChild(tooltipElement);
        
        // Close Button Handler
        tooltipElement.querySelector('.glossar-tooltip-close').addEventListener('click', () => {
            hideTooltip();
        });
        
        // Tooltip selbst sollte Hover erlauben
        tooltipElement.addEventListener('mouseenter', () => {
            clearTimeout(tooltipTimeout);
        });
        
        tooltipElement.addEventListener('mouseleave', () => {
            scheduleHideTooltip();
        });
    }
    
    function showTooltip(termElement) {
        const termId = termElement.getAttribute('data-glossar-id');
        const term = glossarTerms.find(t => t.id === termId);
        
        if (!term) {
            LOG.error(MODULE, `Term not found: ${termId}`);
            return;
        }
        
        // Tooltip-Inhalt aktualisieren
        updateTooltipContent(term);
        
        // Position berechnen
        positionTooltip(termElement);
        
        // Anzeigen
        tooltipElement.classList.add('visible');
        tooltipElement.setAttribute('aria-hidden', 'false');
        
        activeTooltip = termElement;
        
        LOG(MODULE, `Showing tooltip: ${term.header}`);
    }
    
    function updateTooltipContent(term) {
        // Title
        tooltipElement.querySelector('.glossar-tooltip-title').textContent = term.header;
        
        // Image
        const imageContainer = tooltipElement.querySelector('.glossar-tooltip-image');
        if (term.image) {
            imageContainer.innerHTML = `<img src="${term.image}" alt="${term.header}">`;
            imageContainer.classList.add('has-image');
        } else {
            imageContainer.innerHTML = '';
            imageContainer.classList.remove('has-image');
        }
        
        // Text (max 250 Zeichen)
        let explanation = term.explanation;
        if (explanation.length > 250) {
            explanation = explanation.substring(0, 247) + '...';
        }
        tooltipElement.querySelector('.glossar-tooltip-text').textContent = explanation;
        
        // Link
        const footer = tooltipElement.querySelector('.glossar-tooltip-footer');
        const link = tooltipElement.querySelector('.glossar-tooltip-link');
        if (term.link) {
            link.href = term.link;
            footer.classList.add('has-link');
        } else {
            footer.classList.remove('has-link');
        }
    }
    
    function positionTooltip(termElement) {
        const rect = termElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        // Standardposition: Oberhalb des Terms
        let top = rect.top - tooltipRect.height - 12;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        
        // Viewport-Checks
        if (top < 10) {
            // Unterhalb anzeigen
            top = rect.bottom + 12;
        }
        
        if (left < 10) {
            left = 10;
        }
        
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        
        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }
    
    function hideTooltip() {
        clearTimeout(tooltipTimeout);
        
        tooltipElement.classList.remove('visible');
        tooltipElement.setAttribute('aria-hidden', 'true');
        
        activeTooltip = null;
        
        LOG(MODULE, 'Tooltip hidden');
    }
    
    function scheduleHideTooltip() {
        tooltipTimeout = setTimeout(() => {
            hideTooltip();
        }, 300);
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Hover auf Glossar-Terms
        document.addEventListener('mouseenter', (e) => {
            const term = e.target.closest('.glossar-term');
            if (!term) return;
            
            clearTimeout(tooltipTimeout);
            showTooltip(term);
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            const term = e.target.closest('.glossar-term');
            if (!term) return;
            
            scheduleHideTooltip();
        }, true);
        
        // Tastatur-Navigation
        document.addEventListener('keydown', (e) => {
            const term = e.target.closest('.glossar-term');
            if (!term) return;
            
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showTooltip(term);
            }
            
            if (e.key === 'Escape' && activeTooltip) {
                hideTooltip();
            }
        });
        
        // Focus auf Glossar-Terms
        document.addEventListener('focus', (e) => {
            const term = e.target.closest('.glossar-term');
            if (!term) return;
            
            showTooltip(term);
        }, true);
        
        document.addEventListener('blur', (e) => {
            const term = e.target.closest('.glossar-term');
            if (!term) return;
            
            scheduleHideTooltip();
        }, true);
        
        // Scroll-Listener für Viewport-Erkennung
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                processVisibleSections();
            }, 150);
        }, { passive: true });
        
        // Resize-Listener
        window.addEventListener('resize', () => {
            if (activeTooltip) {
                positionTooltip(activeTooltip);
            }
        });
    }
    
    // ===== INITIALIZATION =====
    
    async function initGlossar() {
        LOG(MODULE, 'Initializing glossar system...');
        
        // Lade Glossar-Daten
        const loaded = await loadGlossar();
        if (!loaded) {
            LOG.error(MODULE, 'Failed to initialize - glossar.json not loaded');
            return;
        }
        
        // Erstelle Tooltip-Element
        createTooltipElement();
        
        // Verarbeite initial sichtbare Sections
        processVisibleSections();
        
        // Setup Event Handlers
        setupEventHandlers();
        
        LOG.success(MODULE, 'Glossar system initialized');
    }
    
    // ===== PUBLIC API =====
    
    window.GlossarManager = {
        reload: loadGlossar,
        processSection: processSection,
        refresh: processVisibleSections
    };
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlossar);
    } else {
        initGlossar();
    }
    
    LOG(MODULE, 'Glossar module loaded');
    
})();
```

---

## Barrierefreiheit

### Umgesetzte Features:
- ✅ `tabindex="0"` für Tastatur-Navigation
- ✅ `role="button"` für Screen Reader
- ✅ `aria-label` mit Kontext
- ✅ Enter/Space zum Öffnen, ESC zum Schließen
- ✅ Focus-Events für Tastatur-Nutzer

### Screen Reader Verhalten:
- Begriff wird als "Button" angekündigt
- aria-label erklärt: "Glossar: [Begriff]"
- Tooltip-Inhalt wird beim Öffnen vorgelesen

---

## Implementierungsschritte

### Phase 1: Glossar-JSON erstellen (2-3 Stunden)
1. Fachbegriffe sammeln
2. Erklärungen formulieren (max. 250 Zeichen)
3. Bilder vorbereiten (300x200px)
4. Tags und Patterns definieren
5. JSON-Datei erstellen und validieren

### Phase 2: JavaScript-Modul (4-5 Stunden)
1. `script-glossar.js` erstellen
2. Term-Erkennung implementieren
3. Tooltip-Logik entwickeln
4. Event-Handling einbauen
5. Testing: Term-Matching und Tooltip-Anzeige

### Phase 3: CSS-Styling (2-3 Stunden)
1. CSS in `styles.css` einfügen
2. Responsive-Design für Mobile
3. Theme-Kompatibilität sicherstellen
4. Testing: Alle 4 Themes

### Phase 4: Testing & Barrierefreiheit (2-3 Stunden)
1. Screen Reader Tests
2. Keyboard-Navigation prüfen
3. Performance-Tests (viele Begriffe)
4. Edge Cases behandeln

**Gesamt-Aufwand:** 10-14 Stunden

---

## Testing-Checkliste

### Funktionalität
- [ ] Begriffe werden im Viewport erkannt
- [ ] Tooltips erscheinen bei Hover
- [ ] Tooltips erscheinen bei Focus (Tastatur)
- [ ] Tooltips positionieren sich korrekt
- [ ] Bilder werden angezeigt (falls vorhanden)
- [ ] Links funktionieren (falls vorhanden)
- [ ] ESC schließt Tooltip
- [ ] Scroll-Performance ist gut

### Barrierefreiheit
- [ ] Screen Reader erkennt Glossar-Terms
- [ ] Tastatur-Navigation funktioniert
- [ ] Focus-Indicator sichtbar
- [ ] aria-labels korrekt
- [ ] Reduced Motion wird respektiert

### Performance
- [ ] Nur sichtbare Sections werden verarbeitet
- [ ] Keine doppelte Verarbeitung
- [ ] Scroll-Performance bleibt flüssig
- [ ] Memory Leaks ausgeschlossen

### Alle Themes
- [ ] Tag-Modus: Lesbar und sichtbar
- [ ] Nacht-Modus: Lesbar und sichtbar
- [ ] Hochkontrast Hell: Lesbar
- [ ] Hochkontrast Dunkel: Lesbar

---

## Vorteile

✅ **Kontextuelle Hilfe:** Erklärungen genau dort, wo benötigt  
✅ **Keine Unterbrechung:** Tooltip verschwindet automatisch  
✅ **Intelligente Erkennung:** Tags + RegExp für Flexibilität  
✅ **Performance:** Nur Viewport wird verarbeitet  
✅ **Barrierefrei:** Keyboard & Screen Reader Support  
✅ **Erweiterbar:** Neue Begriffe einfach per JSON hinzufügen

---

## Erweitungsmöglichkeiten (Optional)

### 1. Glossar-Sidebar
```javascript
// Alle Begriffe alphabetisch auflisten
function showGlossarSidebar() {
    const sortedTerms = glossarTerms.sort((a, b) => 
        a.header.localeCompare(b.header)
    );
    // Sidebar mit allen Begriffen rendern
}
```

### 2. Suchfunktion
```javascript
// Glossar-Begriffe durchsuchen
function searchGlossar(query) {
    return glossarTerms.filter(term => 
        term.header.toLowerCase().includes(query.toLowerCase()) ||
        term.explanation.toLowerCase().includes(query.toLowerCase())
    );
}
```

### 3. Statistiken
```javascript
// Tracking: Welche Begriffe werden oft angeschaut?
function trackGlossarUsage(termId) {
    const stats = JSON.parse(localStorage.getItem('glossar-stats') || '{}');
    stats[termId] = (stats[termId] || 0) + 1;
    localStorage.setItem('glossar-stats', JSON.stringify(stats));
}
```

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025* Hover-Tooltips mit Erklärungen, Bildern und Links anzeigt
````



## Prompt:
4.10.2025, 18:03:54

Weiter



## Response:
4.10.2025, 18:05:46



**V08 - Agent FAQ & Feedback-System**

````markdown
# V08: Agent FAQ & Feedback-System

**Priorität:** 🟡 Mittel  
**Aufwand:** 6-8 Stunden  
**Status:** Im Scope, nicht dringend

---

## Feature-Beschreibung

Erweiterung des bestehenden Agenten um zwei neue Module:

1. **FAQ-System:** Intelligente Suche in häufig gestellten Fragen
2. **Feedback-Funktion:** Direkte Kontaktmöglichkeit per vorkonfigurierter E-Mail

**Ziel:** Self-Service für Nutzer und direkter Feedback-Kanal

---

## FAQ-Datenstruktur (JSON)

### Datei: `agent-faq.json`

```json
{
  "version": "1.0",
  "updated": "2025-10-04",
  "faqs": [
    {
      "id": "export-dauer",
      "question": "Wie lange dauert ein Export?",
      "answer": "Die Dauer hängt von der Datenmenge ab. Ein Smartphone-Export dauert typischerweise 30-90 Minuten. Computer-Exports können mehrere Stunden in Anspruch nehmen.",
      "tags": ["export", "dauer", "zeit", "lange"],
      "category": "allgemein",
      "relatedSections": ["step1", "step2"],
      "priority": 1
    },
    {
      "id": "fehler-export",
      "question": "Was tun bei Export-Fehlern?",
      "answer": "Prüfen Sie zunächst die Verbindung zum Gerät. Stellen Sie sicher, dass genügend Speicherplatz vorhanden ist. Bei persistenten Fehlern konsultieren Sie das Error-Log in AXIOM Process unter 'View' → 'Processing Log'.",
      "tags": ["fehler", "error", "problem", "export", "funktioniert nicht"],
      "category": "troubleshooting",
      "relatedSections": ["troubleshooting"],
      "priority": 2
    },
    {
      "id": "hash-pruefen",
      "question": "Wie prüfe ich Hash-Werte?",
      "answer": "Hash-Werte werden automatisch berechnet und im Report angezeigt. Sie finden sie unter 'Evidence' → 'Properties'. Zur manuellen Verifikation nutzen Sie Tools wie 'certutil' (Windows) oder 'shasum' (Mac/Linux).",
      "tags": ["hash", "md5", "sha256", "verifikation", "integrität"],
      "category": "forensik",
      "relatedSections": ["verification"],
      "priority": 3
    },
    {
      "id": "datenquellen",
      "question": "Welche Datenquellen werden unterstützt?",
      "answer": "AXIOM unterstützt Smartphones (iOS, Android), Computer (Windows, Mac, Linux), Cloud-Dienste (Google, Apple, Microsoft), sowie Images und physische Dumps. Eine vollständige Liste finden Sie in der Dokumentation.",
      "tags": ["datenquellen", "quellen", "unterstützt", "devices"],
      "category": "allgemein",
      "relatedSections": ["step2"],
      "priority": 1
    },
    {
      "id": "report-erstellen",
      "question": "Wie erstelle ich einen Report?",
      "answer": "Nach Abschluss der Analyse wählen Sie 'Generate Report' in AXIOM Examine. Wählen Sie das gewünschte Format (PDF, HTML, XLSX) und die einzuschließenden Artefakte. Der Report wird im Output-Ordner gespeichert.",
      "tags": ["report", "bericht", "erstellen", "exportieren"],
      "category": "allgemein",
      "relatedSections": ["step5", "reporting"],
      "priority": 2
    }
  ],
  "categories": {
    "allgemein": {
      "name": "Allgemeine Fragen",
      "icon": "❓"
    },
    "troubleshooting": {
      "name": "Problembehebung",
      "icon": "🔧"
    },
    "forensik": {
      "name": "Forensische Praxis",
      "icon": "🔍"
    },
    "technik": {
      "name": "Technische Details",
      "icon": "⚙️"
    }
  }
}
```

### JSON-Schema Erklärung

| Feld | Typ | Beschreibung | Pflicht |
|------|-----|--------------|---------|
| `id` | string | Eindeutiger Identifier | ✅ |
| `question` | string | Frage | ✅ |
| `answer` | string | Antwort | ✅ |
| `tags` | array | Keywords für Suche | ✅ |
| `category` | string | Kategorie-ID | ✅ |
| `relatedSections` | array | Verwandte Abschnitte (IDs) | ❌ |
| `priority` | number | Sortier-Priorität (1=hoch) | ✅ |

---

## HTML-Integration

### Erweiterung der Agent-Sidebar

```html
<!-- NEUER TAB: FAQ -->
<div class="agent-mode" data-mode="faq">
    <div class="agent-faq-header">
        <h3>💬 Häufige Fragen</h3>
        <p class="agent-faq-subtitle">Finden Sie schnell Antworten auf Ihre Fragen</p>
    </div>
    
    <div class="agent-faq-search">
        <input type="text" 
               id="agent-faq-input"
               class="agent-faq-input"
               placeholder="Stellen Sie eine Frage oder geben Sie Suchbegriffe ein..."
               aria-label="FAQ durchsuchen">
        <button id="agent-faq-submit" 
                class="agent-faq-submit"
                aria-label="Suchen">
            🔍
        </button>
    </div>
    
    <div class="agent-faq-results" id="agent-faq-results">
        <!-- Wird dynamisch gefüllt -->
    </div>
    
    <div class="agent-faq-empty">
        <p>💡 Stellen Sie eine Frage, um Antworten zu finden.</p>
        <div class="agent-faq-examples">
            <p><strong>Beispiele:</strong></p>
            <ul>
                <li>"Wie lange dauert ein Export?"</li>
                <li>"Was tun bei Fehlern?"</li>
                <li>"Wie prüfe ich Hashes?"</li>
            </ul>
        </div>
    </div>
</div>

<!-- NEUER TAB: Feedback -->
<div class="agent-mode" data-mode="feedback">
    <div class="agent-feedback-header">
        <h3>📧 Feedback & Ideen</h3>
        <p class="agent-feedback-subtitle">Helfen Sie uns, besser zu werden!</p>
    </div>
    
    <div class="agent-feedback-content">
        <p>Haben Sie Verbesserungsvorschläge oder Fragen? Wählen Sie eine Option:</p>
        
        <div class="agent-feedback-options">
            <button class="agent-feedback-btn" data-type="bug">
                <span class="feedback-icon">🐛</span>
                <span class="feedback-label">Problem melden</span>
                <span class="feedback-desc">Etwas funktioniert nicht?</span>
            </button>
            
            <button class="agent-feedback-btn" data-type="feature">
                <span class="feedback-icon">💡</span>
                <span class="feedback-label">Feature-Idee</span>
                <span class="feedback-desc">Verbesserungsvorschlag</span>
            </button>
            
            <button class="agent-feedback-btn" data-type="question">
                <span class="feedback-icon">❓</span>
                <span class="feedback-label">Frage stellen</span>
                <span class="feedback-desc">Etwas unklar?</span>
            </button>
            
            <button class="agent-feedback-btn" data-type="general">
                <span class="feedback-icon">💬</span>
                <span class="feedback-label">Allgemeines Feedback</span>
                <span class="feedback-desc">Lob oder Kritik</span>
            </button>
        </div>
        
        <div class="agent-feedback-info">
            <p>📨 Klicken Sie auf eine Option, um eine E-Mail zu erstellen.</p>
        </div>
    </div>
</div>
```

### Mode-Selector erweitern

```html
<div class="agent-mode-selector">
    <button class="agent-mode-btn active" data-mode="chat">💬 Chat</button>
    <button class="agent-mode-btn" data-mode="faq">❓ FAQ</button>
    <button class="agent-mode-btn" data-mode="feedback">📧 Feedback</button>
</div>
```

---

## CSS-Styling

```css
/* ===== AGENT MODE SELECTOR ===== */
.agent-mode-selector {
    display: flex;
    gap: 5px;
    padding: 10px;
    background-color: var(--color-surface);
    border-bottom: 2px solid var(--color-border);
}

.agent-mode-btn {
    flex: 1;
    padding: 10px;
    background-color: var(--color-surface-elevated);
    border: 2px solid var(--color-border);
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all var(--transition-fast);
}

.agent-mode-btn:hover {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border-color: var(--color-primary);
}

.agent-mode-btn.active {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border-color: var(--color-primary);
}

/* ===== AGENT FAQ ===== */
.agent-mode {
    display: none;
    padding: 20px;
}

.agent-mode.active {
    display: block;
}

.agent-faq-header,
.agent-feedback-header {
    margin-bottom: 20px;
}

.agent-faq-header h3,
.agent-feedback-header h3 {
    margin: 0 0 5px 0;
    color: var(--color-primary);
}

.agent-faq-subtitle,
.agent-feedback-subtitle {
    margin: 0;
    font-size: 0.9em;
    color: var(--color-text-secondary);
}

.agent-faq-search {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
}

.agent-faq-input {
    flex: 1;
    padding: 12px;
    border: 2px solid var(--color-border);
    border-radius: 8px;
    font-size: 1em;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    transition: all var(--transition-fast);
}

.agent-faq-input:focus {
    outline: none;
    border-color: var(--color-border-strong);
    box-shadow: 0 0 0 3px var(--color-focus);
}

.agent-faq-submit {
    padding: 12px 20px;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2em;
    transition: all var(--transition-fast);
}

.agent-faq-submit:hover {
    background-color: var(--color-primary-hover);
}

/* FAQ Results */
.agent-faq-results {
    display: none;
}

.agent-faq-results.has-results {
    display: block;
}

.agent-faq-result {
    background-color: var(--color-surface);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 12px;
    border-left: 4px solid var(--color-info);
    transition: all var(--transition-fast);
}

.agent-faq-result:hover {
    border-left-color: var(--color-primary);
    box-shadow: 0 2px 8px var(--color-shadow);
}

.agent-faq-question {
    margin-bottom: 10px;
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1.05em;
}

.agent-faq-answer {
    line-height: 1.6;
    margin-bottom: 10px;
    color: var(--color-text-primary);
}

.agent-faq-related {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    font-size: 0.9em;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--color-border);
}

.agent-faq-related-label {
    color: var(--color-text-secondary);
}

.agent-faq-goto {
    padding: 4px 12px;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85em;
    transition: all var(--transition-fast);
}

.agent-faq-goto:hover {
    background-color: var(--color-primary-hover);
}

/* FAQ Empty State */
.agent-faq-empty {
    text-align: center;
    padding: 40px 20px;
    color: var(--color-text-secondary);
}

.agent-faq-examples {
    text-align: left;
    display: inline-block;
    margin-top: 20px;
}

.agent-faq-examples ul {
    list-style: none;
    padding: 0;
}

.agent-faq-examples li {
    padding: 8px 0;
    color: var(--color-text-primary);
}

.agent-faq-examples li::before {
    content: "→ ";
    color: var(--color-primary);
    font-weight: bold;
}

.agent-faq-no-results {
    text-align: center;
    padding: 30px 20px;
    color: var(--color-text-secondary);
    background-color: var(--color-surface);
    border-radius: 8px;
}

/* ===== AGENT FEEDBACK ===== */
.agent-feedback-content p {
    margin-bottom: 20px;
}

.agent-feedback-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 20px 0;
}

.agent-feedback-btn {
    padding: 20px 16px;
    background-color: var(--color-surface);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
}

.agent-feedback-btn:hover {
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--color-shadow);
}

.feedback-icon {
    font-size: 2em;
}

.feedback-label {
    font-weight: 600;
    font-size: 1em;
}

.feedback-desc {
    font-size: 0.85em;
    opacity: 0.8;
}

.agent-feedback-info {
    text-align: center;
    color: var(--color-text-secondary);
    font-size: 0.9em;
    margin-top: 20px;
    padding: 16px;
    background-color: var(--color-surface);
    border-radius: 8px;
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .agent-feedback-options {
        grid-template-columns: 1fr;
    }
}
```

---

## JavaScript-Erweiterung

### FAQ-System im Agent (`agent.js` ergänzen)

```javascript
// ===== FAQ SYSTEM =====

let faqData = null;

async function loadFAQ() {
    try {
        const response = await fetch('agent-faq.json');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        faqData = await response.json();
        LOG('AGENT', `Loaded ${faqData.faqs.length} FAQs`);
        return true;
    } catch (error) {
        LOG.error('AGENT', 'Failed to load FAQ', error);
        return false;
    }
}

function searchFAQ(query) {
    if (!faqData || !query) return [];
    
    query = query.toLowerCase().trim();
    
    const results = faqData.faqs.map(faq => {
        let score = 0;
        
        // Exact match in question
        if (faq.question.toLowerCase().includes(query)) {
            score += 10;
        }
        
        // Match in tags
        const tagMatches = faq.tags.filter(tag => 
            tag.toLowerCase().includes(query) || 
            query.includes(tag.toLowerCase())
        );
        score += tagMatches.length * 5;
        
        // Match in answer
        if (faq.answer.toLowerCase().includes(query)) {
            score += 3;
        }
        
        // Keyword matching
        const queryWords = query.split(' ');
        queryWords.forEach(word => {
            if (word.length < 3) return;
            if (faq.question.toLowerCase().includes(word)) score += 2;
            if (faq.tags.some(tag => tag.toLowerCase().includes(word))) score += 2;
        });
        
        return { ...faq, score };
    });
    
    // Filter and sort
    return results
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score || a.priority - b.priority)
        .slice(0, 5); // Top 5 Ergebnisse
}

function renderFAQResults(results) {
    const container = document.getElementById('agent-faq-results');
    const emptyState = document.querySelector('.agent-faq-empty');
    
    if (results.length === 0) {
        container.innerHTML = '<div class="agent-faq-no-results">❌ Keine passenden Antworten gefunden. Versuchen Sie andere Begriffe oder nutzen Sie das Feedback-Formular.</div>';
        container.classList.add('has-results');
        emptyState.style.display = 'none';
        return;
    }
    
    emptyState.style.display = 'none';
    container.classList.add('has-results');
    
    container.innerHTML = results.map(faq => `
        <div class="agent-faq-result" data-faq-id="${faq.id}">
            <div class="agent-faq-question">
                ❓ ${faq.question}
            </div>
            <div class="agent-faq-answer">
                ${faq.answer}
            </div>
            ${faq.relatedSections && faq.relatedSections.length > 0 ? `
                <div class="agent-faq-related">
                    <span class="agent-faq-related-label">📍 Verwandte Abschnitte:</span>
                    ${faq.relatedSections.map(sectionId => `
                        <button class="agent-faq-goto" data-section="${sectionId}">
                            ${getSectionTitle(sectionId)}
                        </button>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
    
    // Event listeners für "Gehe zu Abschnitt"
    container.querySelectorAll('.agent-faq-goto').forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.getAttribute('data-section');
            navigateToSection(sectionId);
        });
    });
}

function getSectionTitle(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return sectionId;
    
    const heading = section.querySelector('h2, h3');
    return heading ? heading.textContent : sectionId;
}

function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
        LOG.error('AGENT', `Section not found: ${sectionId}`);
        return;
    }
    
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    section.classList.add('scroll-highlight');
    setTimeout(() => {
        section.classList.remove('scroll-highlight');
    }, 2000);
    
    // Schließe Agent-Sidebar (optional)
    // closeAgentSidebar();
}

// ===== FEEDBACK SYSTEM =====

function setupFeedbackButtons() {
    document.querySelectorAll('.agent-feedback-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            openFeedbackEmail(type);
        });
    });
}

function openFeedbackEmail(type) {
    const config = {
        bug: {
            subject: '[AXIOM Leitfaden] Problem melden',
            body: `Hallo,

ich möchte folgendes Problem melden:

[Bitte beschreiben Sie das Problem]

Schritte zur Reproduktion:
1. 
2. 
3. 

Erwartetes Verhalten:
[Was sollte passieren?]

Tatsächliches Verhalten:
[Was passiert stattdessen?]

---
Browser: ${navigator.userAgent}
Seite: ${window.location.href}
Zeitstempel: ${new Date().toISOString()}`
        },
        feature: {
            subject: '[AXIOM Leitfaden] Feature-Vorschlag',
            body: `Hallo,

ich habe eine Idee für ein neues Feature:

[Beschreiben Sie Ihre Idee]

Nutzen:
[Welches Problem löst dieses Feature?]

Zielgruppe:
[Wer würde davon profitieren?]

---
Seite: ${window.location.href}
Zeitstempel: ${new Date().toISOString()}`
        },
        question: {
            subject: '[AXIOM Leitfaden] Frage',
            body: `Hallo,

ich habe folgende Frage:

[Ihre Frage]

---
Kontext:
[Wo im Leitfaden sind Sie gerade?]
Seite: ${window.location.href}
Zeitstempel: ${new Date().toISOString()}`
        },
        general: {
            subject: '[AXIOM Leitfaden] Feedback',
            body: `Hallo,

[Ihr Feedback]

---
Seite: ${window.location.href}
Zeitstempel: ${new Date().toISOString()}`
        }
    };
    
    const mailConfig = config[type] || config.general;
    const mailto = `mailto:support@ihre-firma.de?subject=${encodeURIComponent(mailConfig.subject)}&body=${encodeURIComponent(mailConfig.body)}`;
    
    window.location.href = mailto;
    
    LOG('AGENT', `Feedback email opened: ${type}`);
}

// ===== MODE SWITCHING =====

function setupModeSwitching() {
    document.querySelectorAll('.agent-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            switchAgentMode(mode);
        });
    });
}

function switchAgentMode(mode) {
    // Deactivate all modes
    document.querySelectorAll('.agent-mode').forEach(m => {
        m.classList.remove('active');
    });
    
    document.querySelectorAll('.agent-mode-btn').forEach(b => {
        b.classList.remove('active');
    });
    
    // Activate selected mode
    document.querySelector(`.agent-mode[data-mode="${mode}"]`)?.classList.add('active');
    document.querySelector(`.agent-mode-btn[data-mode="${mode}"]`)?.classList.add('active');
    
    LOG('AGENT', `Switched to mode: ${mode}`);
}

// ===== FAQ SEARCH EVENT HANDLERS =====

function setupFAQSearch() {
    const searchInput = document.getElementById('agent-faq-input');
    const searchButton = document.getElementById('agent-faq-submit');
    
    if (!searchInput || !searchButton) {
        LOG.error('AGENT', 'FAQ search elements not found');
        return;
    }
    
    const performSearch = () => {
        const query = searchInput.value.trim();
        if (!query) return;
        
        const results = searchFAQ(query);
        renderFAQResults(results);
        
        LOG('AGENT', `FAQ search: "${query}" - ${results.length} results`);
    };
    
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// ===== INITIALIZATION =====

async function initAgentExtensions() {
    LOG('AGENT', 'Initializing agent extensions...');
    
    // Load FAQ data
    await loadFAQ();
    
    // Setup event handlers
    setupModeSwitching();
    setupFAQSearch();
    setupFeedbackButtons();
    
    LOG.success('AGENT', 'Agent extensions initialized');
}

// Call this after agent initialization
// initAgentExtensions();
```

---

## Implementierungsschritte

### Phase 1: FAQ-JSON erstellen (1-2 Stunden)
1. Häufige Fragen sammeln
2. Antworten formulieren
3. Tags definieren
4. Verwandte Abschnitte verknüpfen
5. JSON-Datei erstellen und testen

### Phase 2: HTML & CSS (1-2 Stunden)
1. HTML-Struktur in Agent-Sidebar einfügen
2. CSS in `styles.css` (oder `agent.css`) einfügen
3. Mode-Selector hinzufügen
4. Visuelle Tests in allen Themes

### Phase 3: JavaScript-Integration (3-4 Stunden)
1. FAQ-Suche implementieren
2. Feedback-System einbauen
3. Mode-Switching programmieren
4. Event-Handler verbinden
5. Testing: Suche, Navigation, E-Mail

### Phase 4: Feintuning (1 Stunde)
1. Suchrelevanz optimieren
2. E-Mail-Templates verfeinern
3. UX-Tests durchführen

**Gesamt-Aufwand:** 6-8 Stunden

---

## Testing-Checkliste

### FAQ-System
- [ ] Suche findet relevante Ergebnisse
- [ ] Keine Ergebnisse zeigt Hinweis
- [ ] Navigation zu Abschnitten funktioniert
- [ ] Enter-Taste startet Suche
- [ ] Mobile-Ansicht funktioniert

### Feedback-System
- [ ] Alle 4 Buttons funktionieren
- [ ] E-Mail öffnet sich korrekt
- [ ] Subject ist korrekt
- [ ] Body-Template ist vollständig
- [ ] Browser-Info wird mitgesendet

### Mode-Switching
- [ ] Wechsel zwischen Modi funktioniert
- [ ] Nur ein Modus aktiv
- [ ] Active-State visuell korrekt
- [ ] FAQ-Daten werden nur einmal geladen

---

## Vorteile

✅ **Self-Service:** Nutzer finden Antworten selbst  
✅ **Intelligente Suche:** Keyword + Tag-Matching  
✅ **Direkter Kontakt:** Einfache Feedback-Möglichkeit  
✅ **Vorkonfiguriert:** E-Mail-Templates mit Kontext  
✅ **Integration:** Nahtlos in bestehenden Agenten  
✅ **Erweiterbar:** Neue FAQs einfach per JSON

---

## Erweiterungsmöglichkeiten (Optional)

### 1. FAQ-Kategorien-Filter
```javascript
function filterFAQsByCategory(category) {
    return faqData.faqs.filter(faq => faq.category === category);
}
```

### 2. FAQ-Statistiken
```javascript
function trackFAQUsage(faqId) {
    const stats = JSON.parse(localStorage.getItem('faq-stats') || '{}');
    stats[faqId] = (stats[faqId] || 0) + 1;
    localStorage.setItem('faq-stats', JSON.stringify(stats));
}
```

### 3. "War diese Antwort hilfreich?"
```html
<div class="faq-feedback">
    <p>War diese Antwort hilfreich?</p>
    <button class="faq-helpful-yes">👍 Ja</button>
    <button class="faq-helpful-no">👎 Nein</button>
</div>
```

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*
````

Perfekt! 🎉 Ich habe nun **alle 9 Verbesserungsvorschläge** als separate, vollständige Dokumente erstellt:

## 📦 Vollständige Dokumentation

### ✅ Erstellt und verfügbar:

1. **Overview-Improvements.md** - Übersicht über alle Vorschläge mit Roadmap
2. **V01-State-Management.md** - Zentrale



## Prompt:
5.10.2025, 02:28:59

Weiter



## Response:
5.10.2025, 02:29:19

Zustandsverwaltung
3. **V03-Tooltips-Onboarding.md** - Kontextbezogene Hilfe & Erstnutzer-Guide
4. **V04-CSS-HTML-JS-Trennung.md** - Separation of Concerns
5. **V05-Favorites-Sidebar.md** - Lesezeichen mit Levenshtein-Suche
6. **V06-Glossar-Feature.md** - Automatische Fachbegriff-Erklärungen
7. **V07-Show-Only-Modus.md** - "Don't tell; just show"
8. **V08-Agent-FAQ-Feedback.md** - FAQ-System & Feedback-Kanal
9. **V09-Animations-Harmonisierung.md** - Einheitliche Animationen

---

## 📊 Zusammenfassung

**Gesamt-Dokumentation:** 9 Dokumente  
**Gesamt-Aufwand:** 45-75 Stunden  
**Alle Dokumente enthalten:**
- ✅ Vollständige Code-Beispiele (HTML, CSS, JavaScript)
- ✅ JSON-Schema-Definitionen
- ✅ Implementierungsschritte mit Zeitschätzungen
- ✅ Testing-Checklisten
- ✅ Barrierefreiheits-Überlegungen
- ✅ Vorteile und Begründungen

---

## 🎯 Empfohlene Reihenfolge

### Sprint 1 (Woche 1): Foundation
1. **V04** - CSS/HTML/JS-Trennung (4-6h)
2. **V09** - Animations-Harmonisierung (4-6h)
3. **V01** - State Management Teil 1 (6-10h)

### Sprint 2 (Woche 2): Core Features
4. **V07** - Show-Only Modus (3-4h)
5. **V05** - Favorites-Sidebar (6-8h)

### Sprint 3 (Woche 3): Enhancement
6. **V03** - Tooltips & Onboarding (6-9h)
7. **V08** - Agent FAQ & Feedback (6-8h)

### Optional (Woche 4+):
8. **V06** - Glossar-Feature (10-14h)

---

## 💾 Nächste Schritte

Sie können jetzt:
1. **Alle Dokumente aus den Artifacts kopieren** und in Ihrem Projekt speichern
2. **Sprint-Planung** basierend auf der Roadmap durchführen
3. **Mit V04 (CSS/HTML/JS-Trennung) starten** - das ist die wichtigste Grundlage
4. **Build-Nummer erhöhen** auf 054 für den ersten Implementierungs-Sprint

Alle Dokumente sind vollständig und einsatzbereit! Gibt es noch etwas, das Sie anpassen oder erweitern möchten? 🚀



## Prompt:
6.10.2025, 13:57:01

Ich habe noch eine weitere Idee. Bislang ist der Notizblock noch sehr eindimensional. Das ist eine Idee mit relativ niedriger Priorität. Ich möchte den Notizblock erweitern, so dass es Tabs im Notizblock gibt, in denen der Benutzer thematisch Notizen ablegen kann. Die Tabs sollen, wenn sie geschlossen sind durch ein eigenes Symbol dargestellt werden an Stelle eines Textes, um mit der begrenzten Breite der Notizseitenleiste zurechtzukommen. Der aktive Tab-Header hat ebenfalls noch eine Schließen Schaltfläche am rechten Rand. Oben am rechten Rand ist noch eine kleines Menü mit Symbolen. Ein "+" zum Erstellen eines neuen Tabs und ein Hamburgermenü für weitere Funktionalitäten.
Die Notizen löschen Schaltfläche würde dann ebenfalls aus dem Notizblock-Footer verschwinden und ins Hamburgermenü wechseln.

Kannst du bitte diese Idee ebenfalls noch anlegen? Danke!



## Response:
6.10.2025, 13:58:39

Sehr gerne! Das ist eine tolle Idee zur Verbesserung der Notizen-Funktionalität. Ich erstelle dafür ein vollständiges Dokument:

**V10 - Notizblock Tab-System**

````markdown
# V10: Notizblock Tab-System

**Priorität:** 🟡 Mittel (Nice-to-have)  
**Aufwand:** 6-8 Stunden  
**Status:** Geplant

---

## Feature-Beschreibung

Erweiterung des Notizblocks um ein **Tab-System** für thematische Organisation:

**Kernfeatures:**
- Multiple Tabs für verschiedene Themen/Abschnitte
- Tabs zeigen Icon statt Text (Platzersparnis)
- Aktiver Tab hat Close-Button
- "+" Button zum Erstellen neuer Tabs
- Hamburger-Menü für zusätzliche Funktionen
- Alle Tabs werden in localStorage persistiert

**Vorteile:**
- Bessere Organisation der Notizen
- Thematische Trennung (z.B. pro Verfahrensschritt)
- Platzsparend durch Icon-basierte Tabs
- Erweiterte Funktionalität im Hamburger-Menü

---

## Datenstruktur

### Tab-Modell

```javascript
const NoteTab = {
    id: 'tab-1696424123456',      // Eindeutige ID (Timestamp)
    title: 'Export-Notizen',       // Tab-Titel
    icon: '📝',                     // Emoji-Icon für Tab
    content: 'Hier meine Notizen...', // Notiz-Inhalt
    createdAt: 1696424123456,      // Erstellungszeitpunkt
    updatedAt: 1696424567890,      // Letzte Änderung
    color: '#004B76'               // Optional: Tab-Farbe
};

// Im localStorage:
{
    'axiom-notes-tabs': [
        {
            id: 'tab-1',
            title: 'Allgemein',
            icon: '📝',
            content: '...',
            createdAt: ...,
            updatedAt: ...
        },
        {
            id: 'tab-2',
            title: 'Export',
            icon: '📤',
            content: '...',
            createdAt: ...,
            updatedAt: ...
        }
    ],
    'axiom-notes-active-tab': 'tab-1'
}
```

---

## HTML-Struktur

### Überarbeitete Notes-Sidebar

```html
<!-- NOTES SIDEBAR (Rechts) -->
<div class="notes-sidebar">
    <!-- Header mit Tabs -->
    <div class="notes-header">
        <div class="notes-tabs-container">
            <!-- Tab-Liste (scrollbar bei vielen Tabs) -->
            <div class="notes-tabs" id="notes-tabs">
                <!-- Wird dynamisch gefüllt -->
                <!-- Beispiel Tab:
                <button class="notes-tab" 
                        data-tab-id="tab-1"
                        aria-label="Tab: Allgemein"
                        aria-selected="true">
                    <span class="notes-tab-icon">📝</span>
                    <button class="notes-tab-close" 
                            aria-label="Tab schließen">✕</button>
                </button>
                -->
            </div>
            
            <!-- Tab-Aktionen -->
            <div class="notes-tab-actions">
                <button id="notes-add-tab" 
                        class="notes-action-btn"
                        aria-label="Neuen Tab erstellen"
                        title="Neuen Tab erstellen">
                    ➕
                </button>
                
                <button id="notes-menu-toggle" 
                        class="notes-action-btn"
                        aria-label="Notizen-Menü öffnen"
                        aria-expanded="false">
                    ☰
                </button>
            </div>
        </div>
        
        <!-- Close Button (gesamte Sidebar) -->
        <button class="notes-close" 
                aria-label="Notizen schließen">
            ✕
        </button>
    </div>
    
    <!-- Dropdown-Menü -->
    <div class="notes-menu-dropdown" id="notes-menu-dropdown">
        <button class="notes-menu-item" id="notes-rename-tab">
            <span class="notes-menu-icon">✏️</span>
            Tab umbenennen
        </button>
        <button class="notes-menu-item" id="notes-change-icon">
            <span class="notes-menu-icon">🎨</span>
            Icon ändern
        </button>
        <hr class="notes-menu-separator">
        <button class="notes-menu-item" id="notes-export-tab">
            <span class="notes-menu-icon">📥</span>
            Tab exportieren
        </button>
        <button class="notes-menu-item" id="notes-import-tab">
            <span class="notes-menu-icon">📤</span>
            Tab importieren
        </button>
        <hr class="notes-menu-separator">
        <button class="notes-menu-item" id="notes-clear-tab">
            <span class="notes-menu-icon">🗑️</span>
            Tab-Inhalt löschen
        </button>
        <button class="notes-menu-item notes-menu-item-danger" id="notes-delete-tab">
            <span class="notes-menu-icon">❌</span>
            Tab löschen
        </button>
        <hr class="notes-menu-separator">
        <button class="notes-menu-item" id="notes-clear-all">
            <span class="notes-menu-icon">🗑️</span>
            Alle Notizen löschen
        </button>
    </div>
    
    <!-- Body: Notiz-Editor -->
    <div class="notes-body">
        <textarea id="notes-textarea" 
                  class="notes-textarea"
                  placeholder="Notizen hier eingeben..."
                  aria-label="Notizen eingeben"></textarea>
    </div>
    
    <!-- Footer: Auto-Save Indicator -->
    <div class="notes-footer">
        <div class="notes-tab-info">
            <span id="notes-tab-title" class="notes-tab-title-display">Allgemein</span>
        </div>
        <span id="save-indicator" class="save-indicator">
            ✓ Gespeichert
        </span>
    </div>
</div>
```

---

## CSS-Styling

```css
/* ===== NOTES HEADER MIT TABS ===== */

.notes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    position: relative;
}

.notes-tabs-container {
    display: flex;
    flex: 1;
    overflow: hidden;
}

/* ===== TABS ===== */

.notes-tabs {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 8px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
    flex: 1;
}

.notes-tabs::-webkit-scrollbar {
    height: 4px;
}

.notes-tabs::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
}

.notes-tab {
    position: relative;
    min-width: 44px;
    height: 44px;
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.notes-tab:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.notes-tab[aria-selected="true"] {
    background-color: var(--color-surface-elevated);
    color: var(--color-primary);
    box-shadow: 0 2px 8px var(--color-shadow);
}

.notes-tab-icon {
    font-size: 1.5em;
}

/* Close Button im aktiven Tab */
.notes-tab-close {
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(0, 0, 0, 0.2);
    border: none;
    color: white;
    font-size: 0.8em;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.notes-tab[aria-selected="true"] .notes-tab-close {
    display: flex;
}

.notes-tab-close:hover {
    background: rgba(255, 0, 0, 0.8);
    transform: scale(1.1);
}

/* ===== TAB ACTIONS (+ und ☰) ===== */

.notes-tab-actions {
    display: flex;
    gap: 4px;
    padding: 8px;
    flex-shrink: 0;
}

.notes-action-btn {
    width: 36px;
    height: 36px;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 6px;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
}

.notes-action-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
}

.notes-action-btn:active {
    transform: scale(0.95);
}

/* ===== NOTES MENU DROPDOWN ===== */

.notes-menu-dropdown {
    position: absolute;
    top: 60px;
    right: 8px;
    background-color: var(--color-surface-elevated);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    box-shadow: 0 4px 16px var(--color-shadow-strong);
    z-index: 1000;
    min-width: 200px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: all var(--transition-fast);
}

.notes-menu-dropdown.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.notes-menu-item {
    width: 100%;
    padding: 12px 16px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--color-text-primary);
    font-size: 0.95em;
    transition: all var(--transition-fast);
}

.notes-menu-item:hover {
    background-color: var(--color-surface);
}

.notes-menu-item:first-child {
    border-radius: 6px 6px 0 0;
}

.notes-menu-item:last-child {
    border-radius: 0 0 6px 6px;
}

.notes-menu-item-danger {
    color: var(--color-error);
}

.notes-menu-item-danger:hover {
    background-color: var(--color-error);
    color: var(--color-surface-elevated);
}

.notes-menu-icon {
    font-size: 1.1em;
}

.notes-menu-separator {
    margin: 4px 0;
    border: none;
    border-top: 1px solid var(--color-border);
}

/* ===== NOTES BODY ===== */

.notes-body {
    flex: 1;
    padding: 0;
    overflow: hidden;
}

.notes-textarea {
    width: 100%;
    height: 100%;
    border: none;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1em;
    line-height: 1.6;
    resize: none;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    transition: background-color var(--transition-medium), 
                color var(--transition-medium);
}

.notes-textarea:focus {
    outline: none;
}

/* ===== NOTES FOOTER ===== */

.notes-footer {
    padding: 12px 20px;
    border-top: 2px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-surface);
    transition: background-color var(--transition-medium), 
                border-color var(--transition-medium);
}

.notes-tab-info {
    display: flex;
    align-items: center;
    gap: 8px;
}

.notes-tab-title-display {
    font-size: 0.9em;
    color: var(--color-text-secondary);
    font-weight: 500;
}

.save-indicator {
    font-size: 0.85em;
    color: var(--color-success);
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.save-indicator.visible {
    opacity: 1;
}

/* ===== MOBILE OPTIMIERUNG ===== */

@media (max-width: 768px) {
    .notes-sidebar {
        width: 100%;
        right: -100%;
    }
    
    .notes-tabs {
        padding: 6px;
    }
    
    .notes-tab {
        min-width: 40px;
        height: 40px;
    }
}

/* ===== ANIMATIONS ===== */

@keyframes tabSlideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.notes-tab.new {
    animation: tabSlideIn 0.3s ease;
}
```

---

## JavaScript-Modul

### Überarbeitetes `script-notes.js`

```javascript
// ============================================================================
// SCRIPT-NOTES.JS (V2)
// Notizen-System mit Tab-Verwaltung
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'NOTES';
    
    // ===== STATE =====
    let noteTabs = [];
    let activeTabId = null;
    let saveTimeout = null;
    
    // ===== DOM ELEMENTS =====
    let notesSidebar = null;
    let notesTabsContainer = null;
    let notesTextarea = null;
    let saveIndicator = null;
    let tabTitleDisplay = null;
    let menuDropdown = null;
    
    // ===== DEFAULT ICONS =====
    const DEFAULT_ICONS = [
        '📝', '📄', '📋', '📌', '📍', 
        '📤', '📥', '🔍', '⚙️', '💡',
        '✅', '❓', '⚠️', '🎯', '📊'
    ];
    
    // ===== TAB MANAGEMENT =====
    
    function createTab(title = 'Neue Notiz', icon = '📝', content = '') {
        const tab = {
            id: `tab-${Date.now()}`,
            title: title,
            icon: icon,
            content: content,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        noteTabs.push(tab);
        saveTabs();
        renderTabs();
        switchToTab(tab.id);
        
        LOG.success(MODULE, `Tab created: ${tab.title}`);
        return tab;
    }
    
    function deleteTab(tabId) {
        const tab = noteTabs.find(t => t.id === tabId);
        if (!tab) return;
        
        // Verhindere Löschen des letzten Tabs
        if (noteTabs.length === 1) {
            alert('Sie können den letzten Tab nicht löschen.');
            return;
        }
        
        if (!confirm(`Tab "${tab.title}" wirklich löschen?`)) {
            return;
        }
        
        const index = noteTabs.findIndex(t => t.id === tabId);
        noteTabs.splice(index, 1);
        
        // Wenn aktiver Tab gelöscht wird, wechsle zum vorherigen
        if (activeTabId === tabId) {
            const newActiveIndex = Math.max(0, index - 1);
            switchToTab(noteTabs[newActiveIndex].id);
        }
        
        saveTabs();
        renderTabs();
        
        LOG(MODULE, `Tab deleted: ${tab.title}`);
    }
    
    function switchToTab(tabId) {
        // Speichere aktuellen Content
        if (activeTabId) {
            saveCurrentTabContent();
        }
        
        activeTabId = tabId;
        const tab = noteTabs.find(t => t.id === tabId);
        
        if (!tab) {
            LOG.error(MODULE, `Tab not found: ${tabId}`);
            return;
        }
        
        // Update UI
        notesTextarea.value = tab.content;
        tabTitleDisplay.textContent = tab.title;
        
        // Update Tab States
        document.querySelectorAll('.notes-tab').forEach(tabEl => {
            const isActive = tabEl.getAttribute('data-tab-id') === tabId;
            tabEl.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        
        // Speichere aktiven Tab
        localStorage.setItem('axiom-notes-active-tab', tabId);
        
        LOG(MODULE, `Switched to tab: ${tab.title}`);
    }
    
    function saveCurrentTabContent() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        tab.content = notesTextarea.value;
        tab.updatedAt = Date.now();
        
        saveTabs();
        showSaveIndicator();
    }
    
    function renameTab(tabId, newTitle) {
        const tab = noteTabs.find(t => t.id === tabId);
        if (!tab) return;
        
        tab.title = newTitle;
        tab.updatedAt = Date.now();
        
        saveTabs();
        renderTabs();
        
        if (activeTabId === tabId) {
            tabTitleDisplay.textContent = newTitle;
        }
        
        LOG(MODULE, `Tab renamed: ${newTitle}`);
    }
    
    function changeTabIcon(tabId, newIcon) {
        const tab = noteTabs.find(t => t.id === tabId);
        if (!tab) return;
        
        tab.icon = newIcon;
        tab.updatedAt = Date.now();
        
        saveTabs();
        renderTabs();
        
        LOG(MODULE, `Tab icon changed: ${newIcon}`);
    }
    
    // ===== RENDERING =====
    
    function renderTabs() {
        notesTabsContainer.innerHTML = '';
        
        noteTabs.forEach(tab => {
            const tabElement = createTabElement(tab);
            notesTabsContainer.appendChild(tabElement);
        });
    }
    
    function createTabElement(tab) {
        const tabEl = document.createElement('button');
        tabEl.className = 'notes-tab';
        tabEl.setAttribute('data-tab-id', tab.id);
        tabEl.setAttribute('aria-label', `Tab: ${tab.title}`);
        tabEl.setAttribute('aria-selected', tab.id === activeTabId ? 'true' : 'false');
        
        const iconEl = document.createElement('span');
        iconEl.className = 'notes-tab-icon';
        iconEl.textContent = tab.icon;
        
        const closeEl = document.createElement('button');
        closeEl.className = 'notes-tab-close';
        closeEl.setAttribute('aria-label', 'Tab schließen');
        closeEl.textContent = '✕';
        
        // Event Listeners
        tabEl.addEventListener('click', (e) => {
            // Verhindere Tab-Switch wenn Close geklickt
            if (e.target === closeEl) return;
            switchToTab(tab.id);
        });
        
        closeEl.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTab(tab.id);
        });
        
        tabEl.appendChild(iconEl);
        tabEl.appendChild(closeEl);
        
        return tabEl;
    }
    
    // ===== PERSISTENCE =====
    
    function saveTabs() {
        try {
            localStorage.setItem('axiom-notes-tabs', JSON.stringify(noteTabs));
            LOG(MODULE, `Saved ${noteTabs.length} tabs`);
        } catch (error) {
            LOG.error(MODULE, 'Failed to save tabs', error);
        }
    }
    
    function loadTabs() {
        try {
            const saved = localStorage.getItem('axiom-notes-tabs');
            if (saved) {
                noteTabs = JSON.parse(saved);
                LOG(MODULE, `Loaded ${noteTabs.length} tabs`);
            }
            
            // Erstelle Default-Tab wenn keine vorhanden
            if (noteTabs.length === 0) {
                createTab('Allgemein', '📝', '');
            }
            
            // Lade aktiven Tab
            const savedActiveTab = localStorage.getItem('axiom-notes-active-tab');
            if (savedActiveTab && noteTabs.find(t => t.id === savedActiveTab)) {
                activeTabId = savedActiveTab;
            } else {
                activeTabId = noteTabs[0].id;
            }
            
            return true;
        } catch (error) {
            LOG.error(MODULE, 'Failed to load tabs', error);
            // Erstelle Default-Tab bei Fehler
            createTab('Allgemein', '📝', '');
            return false;
        }
    }
    
    // ===== MENU FUNCTIONS =====
    
    function showIconPicker() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        const newIcon = prompt(
            `Wählen Sie ein neues Icon für "${tab.title}":\n\n` +
            DEFAULT_ICONS.join(' ') +
            '\n\nGeben Sie ein Emoji ein:',
            tab.icon
        );
        
        if (newIcon && newIcon.trim()) {
            changeTabIcon(activeTabId, newIcon.trim());
        }
    }
    
    function promptRenameTab() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        const newTitle = prompt(
            `Neuer Name für Tab:`,
            tab.title
        );
        
        if (newTitle && newTitle.trim()) {
            renameTab(activeTabId, newTitle.trim());
        }
    }
    
    function exportTab() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        const dataStr = JSON.stringify(tab, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${tab.title.replace(/[^a-z0-9]/gi, '_')}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        LOG.success(MODULE, `Tab exported: ${tab.title}`);
    }
    
    function importTab() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    
                    // Neue ID generieren
                    imported.id = `tab-${Date.now()}`;
                    imported.createdAt = Date.now();
                    imported.updatedAt = Date.now();
                    
                    noteTabs.push(imported);
                    saveTabs();
                    renderTabs();
                    switchToTab(imported.id);
                    
                    LOG.success(MODULE, `Tab imported: ${imported.title}`);
                } catch (error) {
                    alert('Fehler beim Importieren der Datei.');
                    LOG.error(MODULE, 'Import failed', error);
                }
            };
            reader.readAsText(file);
        });
        
        input.click();
    }
    
    function clearTabContent() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        if (!confirm(`Inhalt von "${tab.title}" wirklich löschen?`)) {
            return;
        }
        
        tab.content = '';
        tab.updatedAt = Date.now();
        notesTextarea.value = '';
        
        saveTabs();
        
        LOG(MODULE, `Tab content cleared: ${tab.title}`);
    }
    
    function clearAllNotes() {
        if (!confirm('Wirklich ALLE Notizen löschen? Dies kann nicht rückgängig gemacht werden!')) {
            return;
        }
        
        // Lösche alle Tabs und erstelle einen neuen Default-Tab
        noteTabs = [];
        createTab('Allgemein', '📝', '');
        
        LOG(MODULE, 'All notes cleared');
    }
    
    // ===== AUTO-SAVE =====
    
    function setupAutoSave() {
        notesTextarea.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                saveCurrentTabContent();
            }, 500);
        });
    }
    
    function showSaveIndicator() {
        saveIndicator.classList.add('visible');
        setTimeout(() => {
            saveIndicator.classList.remove('visible');
        }, 2000);
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Add Tab Button
        document.getElementById('notes-add-tab')?.addEventListener('click', () => {
            createTab();
        });
        
        // Menu Toggle
        const menuToggle = document.getElementById('notes-menu-toggle');
        menuToggle?.addEventListener('click', () => {
            menuDropdown.classList.toggle('visible');
            const isVisible = menuDropdown.classList.contains('visible');
            menuToggle.setAttribute('aria-expanded', isVisible ? 'true' : 'false');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notes-tab-actions') && 
                !e.target.closest('.notes-menu-dropdown')) {
                menuDropdown.classList.remove('visible');
                menuToggle?.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Menu Items
        document.getElementById('notes-rename-tab')?.addEventListener('click', () => {
            promptRenameTab();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-change-icon')?.addEventListener('click', () => {
            showIconPicker();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-export-tab')?.addEventListener('click', () => {
            exportTab();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-import-tab')?.addEventListener('click', () => {
            importTab();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-clear-tab')?.addEventListener('click', () => {
            clearTabContent();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-delete-tab')?.addEventListener('click', () => {
            deleteTab(activeTabId);
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-clear-all')?.addEventListener('click', () => {
            clearAllNotes();
            menuDropdown.classList.remove('visible');
        });
        
        // Close Sidebar
        document.querySelector('.notes-close')?.addEventListener('click', () => {
            saveCurrentTabContent();
            document.body.classList.remove('notes-open');
        });
    }
    
    // ===== INITIALIZATION =====
    
    function initNotes() {
        LOG(MODULE, 'Initializing notes system...');
        
        // Get DOM elements
        notesSidebar = document.querySelector('.notes-sidebar');
        notesTabsContainer = document.getElementById('notes-tabs');
        notesTextarea = document.getElementById('notes-textarea');
        saveIndicator = document.getElementById('save-indicator');
        tabTitleDisplay = document.getElementById('notes-tab-title');
        menuDropdown = document.getElementById('notes-menu-dropdown');
        
        if (!notesSidebar || !notesTabsContainer || !notesTextarea) {
            LOG.error(MODULE, 'Required DOM elements not found');
            return;
        }
        
        // Load tabs
        loadTabs();
        
        // Render tabs
        renderTabs();
        
        // Switch to active tab
        switchToTab(activeTabId);
        
        // Setup event handlers
        setupEventHandlers();
        setupAutoSave();
        
        LOG.success(MODULE, 'Notes system initialized');
    }
    
    // ===== PUBLIC API =====
    
    window.NotesManager = {
        createTab: createTab,
        deleteTab: deleteTab,
        getTabs: () => [...noteTabs],
        getActiveTab: () => noteTabs.find(t =>
````



## Prompt:
6.10.2025, 14:00:21

Weiter



## Response:
6.10.2025, 14:01:42



**V10 - Notizblock Tab-System** ∙ Version 2

````markdown
# V10: Notizblock Tab-System

**Priorität:** 🟡 Mittel (Nice-to-have)  
**Aufwand:** 6-8 Stunden  
**Status:** Geplant

---

## Feature-Beschreibung

Erweiterung des Notizblocks um ein **Tab-System** für thematische Organisation:

**Kernfeatures:**
- Multiple Tabs für verschiedene Themen/Abschnitte
- Tabs zeigen Icon statt Text (Platzersparnis)
- Aktiver Tab hat Close-Button
- "+" Button zum Erstellen neuer Tabs
- Hamburger-Menü für zusätzliche Funktionen
- Alle Tabs werden in localStorage persistiert

**Vorteile:**
- Bessere Organisation der Notizen
- Thematische Trennung (z.B. pro Verfahrensschritt)
- Platzsparend durch Icon-basierte Tabs
- Erweiterte Funktionalität im Hamburger-Menü

---

## Datenstruktur

### Tab-Modell

```javascript
const NoteTab = {
    id: 'tab-1696424123456',      // Eindeutige ID (Timestamp)
    title: 'Export-Notizen',       // Tab-Titel
    icon: '📝',                     // Emoji-Icon für Tab
    content: 'Hier meine Notizen...', // Notiz-Inhalt
    createdAt: 1696424123456,      // Erstellungszeitpunkt
    updatedAt: 1696424567890,      // Letzte Änderung
    color: '#004B76'               // Optional: Tab-Farbe
};

// Im localStorage:
{
    'axiom-notes-tabs': [
        {
            id: 'tab-1',
            title: 'Allgemein',
            icon: '📝',
            content: '...',
            createdAt: ...,
            updatedAt: ...
        },
        {
            id: 'tab-2',
            title: 'Export',
            icon: '📤',
            content: '...',
            createdAt: ...,
            updatedAt: ...
        }
    ],
    'axiom-notes-active-tab': 'tab-1'
}
```

---

## HTML-Struktur

### Überarbeitete Notes-Sidebar

```html
<!-- NOTES SIDEBAR (Rechts) -->
<div class="notes-sidebar">
    <!-- Header mit Tabs -->
    <div class="notes-header">
        <div class="notes-tabs-container">
            <!-- Tab-Liste (scrollbar bei vielen Tabs) -->
            <div class="notes-tabs" id="notes-tabs">
                <!-- Wird dynamisch gefüllt -->
                <!-- Beispiel Tab:
                <button class="notes-tab" 
                        data-tab-id="tab-1"
                        aria-label="Tab: Allgemein"
                        aria-selected="true">
                    <span class="notes-tab-icon">📝</span>
                    <button class="notes-tab-close" 
                            aria-label="Tab schließen">✕</button>
                </button>
                -->
            </div>
            
            <!-- Tab-Aktionen -->
            <div class="notes-tab-actions">
                <button id="notes-add-tab" 
                        class="notes-action-btn"
                        aria-label="Neuen Tab erstellen"
                        title="Neuen Tab erstellen">
                    ➕
                </button>
                
                <button id="notes-menu-toggle" 
                        class="notes-action-btn"
                        aria-label="Notizen-Menü öffnen"
                        aria-expanded="false">
                    ☰
                </button>
            </div>
        </div>
        
        <!-- Close Button (gesamte Sidebar) -->
        <button class="notes-close" 
                aria-label="Notizen schließen">
            ✕
        </button>
    </div>
    
    <!-- Dropdown-Menü -->
    <div class="notes-menu-dropdown" id="notes-menu-dropdown">
        <button class="notes-menu-item" id="notes-rename-tab">
            <span class="notes-menu-icon">✏️</span>
            Tab umbenennen
        </button>
        <button class="notes-menu-item" id="notes-change-icon">
            <span class="notes-menu-icon">🎨</span>
            Icon ändern
        </button>
        <hr class="notes-menu-separator">
        <button class="notes-menu-item" id="notes-export-tab">
            <span class="notes-menu-icon">📥</span>
            Tab exportieren
        </button>
        <button class="notes-menu-item" id="notes-import-tab">
            <span class="notes-menu-icon">📤</span>
            Tab importieren
        </button>
        <hr class="notes-menu-separator">
        <button class="notes-menu-item" id="notes-clear-tab">
            <span class="notes-menu-icon">🗑️</span>
            Tab-Inhalt löschen
        </button>
        <button class="notes-menu-item notes-menu-item-danger" id="notes-delete-tab">
            <span class="notes-menu-icon">❌</span>
            Tab löschen
        </button>
        <hr class="notes-menu-separator">
        <button class="notes-menu-item" id="notes-clear-all">
            <span class="notes-menu-icon">🗑️</span>
            Alle Notizen löschen
        </button>
    </div>
    
    <!-- Body: Notiz-Editor -->
    <div class="notes-body">
        <textarea id="notes-textarea" 
                  class="notes-textarea"
                  placeholder="Notizen hier eingeben..."
                  aria-label="Notizen eingeben"></textarea>
    </div>
    
    <!-- Footer: Auto-Save Indicator -->
    <div class="notes-footer">
        <div class="notes-tab-info">
            <span id="notes-tab-title" class="notes-tab-title-display">Allgemein</span>
        </div>
        <span id="save-indicator" class="save-indicator">
            ✓ Gespeichert
        </span>
    </div>
</div>
```

---

## CSS-Styling

```css
/* ===== NOTES HEADER MIT TABS ===== */

.notes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    position: relative;
}

.notes-tabs-container {
    display: flex;
    flex: 1;
    overflow: hidden;
}

/* ===== TABS ===== */

.notes-tabs {
    display: flex;
    gap: 4px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 8px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
    flex: 1;
}

.notes-tabs::-webkit-scrollbar {
    height: 4px;
}

.notes-tabs::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
}

.notes-tab {
    position: relative;
    min-width: 44px;
    height: 44px;
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.notes-tab:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.notes-tab[aria-selected="true"] {
    background-color: var(--color-surface-elevated);
    color: var(--color-primary);
    box-shadow: 0 2px 8px var(--color-shadow);
}

.notes-tab-icon {
    font-size: 1.5em;
}

/* Close Button im aktiven Tab */
.notes-tab-close {
    position: absolute;
    top: 2px;
    right: 2px;
    background: rgba(0, 0, 0, 0.2);
    border: none;
    color: white;
    font-size: 0.8em;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.notes-tab[aria-selected="true"] .notes-tab-close {
    display: flex;
}

.notes-tab-close:hover {
    background: rgba(255, 0, 0, 0.8);
    transform: scale(1.1);
}

/* ===== TAB ACTIONS (+ und ☰) ===== */

.notes-tab-actions {
    display: flex;
    gap: 4px;
    padding: 8px;
    flex-shrink: 0;
}

.notes-action-btn {
    width: 36px;
    height: 36px;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 6px;
    color: white;
    font-size: 1.2em;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
}

.notes-action-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
}

.notes-action-btn:active {
    transform: scale(0.95);
}

/* ===== NOTES MENU DROPDOWN ===== */

.notes-menu-dropdown {
    position: absolute;
    top: 60px;
    right: 8px;
    background-color: var(--color-surface-elevated);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    box-shadow: 0 4px 16px var(--color-shadow-strong);
    z-index: 1000;
    min-width: 200px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: all var(--transition-fast);
}

.notes-menu-dropdown.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
}

.notes-menu-item {
    width: 100%;
    padding: 12px 16px;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--color-text-primary);
    font-size: 0.95em;
    transition: all var(--transition-fast);
}

.notes-menu-item:hover {
    background-color: var(--color-surface);
}

.notes-menu-item:first-child {
    border-radius: 6px 6px 0 0;
}

.notes-menu-item:last-child {
    border-radius: 0 0 6px 6px;
}

.notes-menu-item-danger {
    color: var(--color-error);
}

.notes-menu-item-danger:hover {
    background-color: var(--color-error);
    color: var(--color-surface-elevated);
}

.notes-menu-icon {
    font-size: 1.1em;
}

.notes-menu-separator {
    margin: 4px 0;
    border: none;
    border-top: 1px solid var(--color-border);
}

/* ===== NOTES BODY ===== */

.notes-body {
    flex: 1;
    padding: 0;
    overflow: hidden;
}

.notes-textarea {
    width: 100%;
    height: 100%;
    border: none;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1em;
    line-height: 1.6;
    resize: none;
    background-color: var(--color-surface-elevated);
    color: var(--color-text-primary);
    transition: background-color var(--transition-medium), 
                color var(--transition-medium);
}

.notes-textarea:focus {
    outline: none;
}

/* ===== NOTES FOOTER ===== */

.notes-footer {
    padding: 12px 20px;
    border-top: 2px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-surface);
    transition: background-color var(--transition-medium), 
                border-color var(--transition-medium);
}

.notes-tab-info {
    display: flex;
    align-items: center;
    gap: 8px;
}

.notes-tab-title-display {
    font-size: 0.9em;
    color: var(--color-text-secondary);
    font-weight: 500;
}

.save-indicator {
    font-size: 0.85em;
    color: var(--color-success);
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.save-indicator.visible {
    opacity: 1;
}

/* ===== MOBILE OPTIMIERUNG ===== */

@media (max-width: 768px) {
    .notes-sidebar {
        width: 100%;
        right: -100%;
    }
    
    .notes-tabs {
        padding: 6px;
    }
    
    .notes-tab {
        min-width: 40px;
        height: 40px;
    }
}

/* ===== ANIMATIONS ===== */

@keyframes tabSlideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.notes-tab.new {
    animation: tabSlideIn 0.3s ease;
}
```

---

## JavaScript-Modul

### Überarbeitetes `script-notes.js`

```javascript
// ============================================================================
// SCRIPT-NOTES.JS (V2)
// Notizen-System mit Tab-Verwaltung
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'NOTES';
    
    // ===== STATE =====
    let noteTabs = [];
    let activeTabId = null;
    let saveTimeout = null;
    
    // ===== DOM ELEMENTS =====
    let notesSidebar = null;
    let notesTabsContainer = null;
    let notesTextarea = null;
    let saveIndicator = null;
    let tabTitleDisplay = null;
    let menuDropdown = null;
    
    // ===== DEFAULT ICONS =====
    const DEFAULT_ICONS = [
        '📝', '📄', '📋', '📌', '📍', 
        '📤', '📥', '🔍', '⚙️', '💡',
        '✅', '❓', '⚠️', '🎯', '📊'
    ];
    
    // ===== TAB MANAGEMENT =====
    
    function createTab(title = 'Neue Notiz', icon = '📝', content = '') {
        const tab = {
            id: `tab-${Date.now()}`,
            title: title,
            icon: icon,
            content: content,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        noteTabs.push(tab);
        saveTabs();
        renderTabs();
        switchToTab(tab.id);
        
        LOG.success(MODULE, `Tab created: ${tab.title}`);
        return tab;
    }
    
    function deleteTab(tabId) {
        const tab = noteTabs.find(t => t.id === tabId);
        if (!tab) return;
        
        // Verhindere Löschen des letzten Tabs
        if (noteTabs.length === 1) {
            alert('Sie können den letzten Tab nicht löschen.');
            return;
        }
        
        if (!confirm(`Tab "${tab.title}" wirklich löschen?`)) {
            return;
        }
        
        const index = noteTabs.findIndex(t => t.id === tabId);
        noteTabs.splice(index, 1);
        
        // Wenn aktiver Tab gelöscht wird, wechsle zum vorherigen
        if (activeTabId === tabId) {
            const newActiveIndex = Math.max(0, index - 1);
            switchToTab(noteTabs[newActiveIndex].id);
        }
        
        saveTabs();
        renderTabs();
        
        LOG(MODULE, `Tab deleted: ${tab.title}`);
    }
    
    function switchToTab(tabId) {
        // Speichere aktuellen Content
        if (activeTabId) {
            saveCurrentTabContent();
        }
        
        activeTabId = tabId;
        const tab = noteTabs.find(t => t.id === tabId);
        
        if (!tab) {
            LOG.error(MODULE, `Tab not found: ${tabId}`);
            return;
        }
        
        // Update UI
        notesTextarea.value = tab.content;
        tabTitleDisplay.textContent = tab.title;
        
        // Update Tab States
        document.querySelectorAll('.notes-tab').forEach(tabEl => {
            const isActive = tabEl.getAttribute('data-tab-id') === tabId;
            tabEl.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        
        // Speichere aktiven Tab
        localStorage.setItem('axiom-notes-active-tab', tabId);
        
        LOG(MODULE, `Switched to tab: ${tab.title}`);
    }
    
    function saveCurrentTabContent() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        tab.content = notesTextarea.value;
        tab.updatedAt = Date.now();
        
        saveTabs();
        showSaveIndicator();
    }
    
    function renameTab(tabId, newTitle) {
        const tab = noteTabs.find(t => t.id === tabId);
        if (!tab) return;
        
        tab.title = newTitle;
        tab.updatedAt = Date.now();
        
        saveTabs();
        renderTabs();
        
        if (activeTabId === tabId) {
            tabTitleDisplay.textContent = newTitle;
        }
        
        LOG(MODULE, `Tab renamed: ${newTitle}`);
    }
    
    function changeTabIcon(tabId, newIcon) {
        const tab = noteTabs.find(t => t.id === tabId);
        if (!tab) return;
        
        tab.icon = newIcon;
        tab.updatedAt = Date.now();
        
        saveTabs();
        renderTabs();
        
        LOG(MODULE, `Tab icon changed: ${newIcon}`);
    }
    
    // ===== RENDERING =====
    
    function renderTabs() {
        notesTabsContainer.innerHTML = '';
        
        noteTabs.forEach(tab => {
            const tabElement = createTabElement(tab);
            notesTabsContainer.appendChild(tabElement);
        });
    }
    
    function createTabElement(tab) {
        const tabEl = document.createElement('button');
        tabEl.className = 'notes-tab';
        tabEl.setAttribute('data-tab-id', tab.id);
        tabEl.setAttribute('aria-label', `Tab: ${tab.title}`);
        tabEl.setAttribute('aria-selected', tab.id === activeTabId ? 'true' : 'false');
        
        const iconEl = document.createElement('span');
        iconEl.className = 'notes-tab-icon';
        iconEl.textContent = tab.icon;
        
        const closeEl = document.createElement('button');
        closeEl.className = 'notes-tab-close';
        closeEl.setAttribute('aria-label', 'Tab schließen');
        closeEl.textContent = '✕';
        
        // Event Listeners
        tabEl.addEventListener('click', (e) => {
            // Verhindere Tab-Switch wenn Close geklickt
            if (e.target === closeEl) return;
            switchToTab(tab.id);
        });
        
        closeEl.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTab(tab.id);
        });
        
        tabEl.appendChild(iconEl);
        tabEl.appendChild(closeEl);
        
        return tabEl;
    }
    
    // ===== PERSISTENCE =====
    
    function saveTabs() {
        try {
            localStorage.setItem('axiom-notes-tabs', JSON.stringify(noteTabs));
            LOG(MODULE, `Saved ${noteTabs.length} tabs`);
        } catch (error) {
            LOG.error(MODULE, 'Failed to save tabs', error);
        }
    }
    
    function loadTabs() {
        try {
            const saved = localStorage.getItem('axiom-notes-tabs');
            if (saved) {
                noteTabs = JSON.parse(saved);
                LOG(MODULE, `Loaded ${noteTabs.length} tabs`);
            }
            
            // Erstelle Default-Tab wenn keine vorhanden
            if (noteTabs.length === 0) {
                createTab('Allgemein', '📝', '');
            }
            
            // Lade aktiven Tab
            const savedActiveTab = localStorage.getItem('axiom-notes-active-tab');
            if (savedActiveTab && noteTabs.find(t => t.id === savedActiveTab)) {
                activeTabId = savedActiveTab;
            } else {
                activeTabId = noteTabs[0].id;
            }
            
            return true;
        } catch (error) {
            LOG.error(MODULE, 'Failed to load tabs', error);
            // Erstelle Default-Tab bei Fehler
            createTab('Allgemein', '📝', '');
            return false;
        }
    }
    
    // ===== MENU FUNCTIONS =====
    
    function showIconPicker() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        const newIcon = prompt(
            `Wählen Sie ein neues Icon für "${tab.title}":\n\n` +
            DEFAULT_ICONS.join(' ') +
            '\n\nGeben Sie ein Emoji ein:',
            tab.icon
        );
        
        if (newIcon && newIcon.trim()) {
            changeTabIcon(activeTabId, newIcon.trim());
        }
    }
    
    function promptRenameTab() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        const newTitle = prompt(
            `Neuer Name für Tab:`,
            tab.title
        );
        
        if (newTitle && newTitle.trim()) {
            renameTab(activeTabId, newTitle.trim());
        }
    }
    
    function exportTab() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        const dataStr = JSON.stringify(tab, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${tab.title.replace(/[^a-z0-9]/gi, '_')}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        LOG.success(MODULE, `Tab exported: ${tab.title}`);
    }
    
    function importTab() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    
                    // Neue ID generieren
                    imported.id = `tab-${Date.now()}`;
                    imported.createdAt = Date.now();
                    imported.updatedAt = Date.now();
                    
                    noteTabs.push(imported);
                    saveTabs();
                    renderTabs();
                    switchToTab(imported.id);
                    
                    LOG.success(MODULE, `Tab imported: ${imported.title}`);
                } catch (error) {
                    alert('Fehler beim Importieren der Datei.');
                    LOG.error(MODULE, 'Import failed', error);
                }
            };
            reader.readAsText(file);
        });
        
        input.click();
    }
    
    function clearTabContent() {
        const tab = noteTabs.find(t => t.id === activeTabId);
        if (!tab) return;
        
        if (!confirm(`Inhalt von "${tab.title}" wirklich löschen?`)) {
            return;
        }
        
        tab.content = '';
        tab.updatedAt = Date.now();
        notesTextarea.value = '';
        
        saveTabs();
        
        LOG(MODULE, `Tab content cleared: ${tab.title}`);
    }
    
    function clearAllNotes() {
        if (!confirm('Wirklich ALLE Notizen löschen? Dies kann nicht rückgängig gemacht werden!')) {
            return;
        }
        
        // Lösche alle Tabs und erstelle einen neuen Default-Tab
        noteTabs = [];
        createTab('Allgemein', '📝', '');
        
        LOG(MODULE, 'All notes cleared');
    }
    
    // ===== AUTO-SAVE =====
    
    function setupAutoSave() {
        notesTextarea.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                saveCurrentTabContent();
            }, 500);
        });
    }
    
    function showSaveIndicator() {
        saveIndicator.classList.add('visible');
        setTimeout(() => {
            saveIndicator.classList.remove('visible');
        }, 2000);
    }
    
    // ===== EVENT HANDLERS =====
    
    function setupEventHandlers() {
        // Add Tab Button
        document.getElementById('notes-add-tab')?.addEventListener('click', () => {
            createTab();
        });
        
        // Menu Toggle
        const menuToggle = document.getElementById('notes-menu-toggle');
        menuToggle?.addEventListener('click', () => {
            menuDropdown.classList.toggle('visible');
            const isVisible = menuDropdown.classList.contains('visible');
            menuToggle.setAttribute('aria-expanded', isVisible ? 'true' : 'false');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notes-tab-actions') && 
                !e.target.closest('.notes-menu-dropdown')) {
                menuDropdown.classList.remove('visible');
                menuToggle?.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Menu Items
        document.getElementById('notes-rename-tab')?.addEventListener('click', () => {
            promptRenameTab();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-change-icon')?.addEventListener('click', () => {
            showIconPicker();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-export-tab')?.addEventListener('click', () => {
            exportTab();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-import-tab')?.addEventListener('click', () => {
            importTab();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-clear-tab')?.addEventListener('click', () => {
            clearTabContent();
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-delete-tab')?.addEventListener('click', () => {
            deleteTab(activeTabId);
            menuDropdown.classList.remove('visible');
        });
        
        document.getElementById('notes-clear-all')?.addEventListener('click', () => {
            clearAllNotes();
            menuDropdown.classList.remove('visible');
        });
        
        // Close Sidebar
        document.querySelector('.notes-close')?.addEventListener('click', () => {
            saveCurrentTabContent();
            document.body.classList.remove('notes-open');
        });
    }
    
    // ===== INITIALIZATION =====
    
    function initNotes() {
        LOG(MODULE, 'Initializing notes system...');
        
        // Get DOM elements
        notesSidebar = document.querySelector('.notes-sidebar');
        notesTabsContainer = document.getElementById('notes-tabs');
        notesTextarea = document.getElementById('notes-textarea');
        saveIndicator = document.getElementById('save-indicator');
        tabTitleDisplay = document.getElementById('notes-tab-title');
        menuDropdown = document.getElementById('notes-menu-dropdown');
        
        if (!notesSidebar || !notesTabsContainer || !notesTextarea) {
            LOG.error(MODULE, 'Required DOM elements not found');
            return;
        }
        
        // Load tabs
        loadTabs();
        
        // Render tabs
        renderTabs();
        
        // Switch to active tab
        switchToTab(activeTabId);
        
        // Setup event handlers
        setupEventHandlers();
        setupAutoSave();
        
        LOG.success(MODULE, 'Notes system initialized');
    }
    
    // ===== PUBLIC API =====
    
    window.NotesManager = {
        createTab: createTab,
        deleteTab: deleteTab,
        getTabs: () => [...noteTabs],
        getActiveTab: () => noteTabs.find(t => t.id === activeTabId)
    };
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNotes);
    } else {
        initNotes();
    }
    
    LOG(MODULE, 'Notes module loaded');
    
})();
```

---

## Implementierungsschritte

### Phase 1: HTML & CSS (2-3 Stunden)
1. HTML-Struktur der Notes-Sidebar überarbeiten
2. Tab-Header mit Icons erstellen
3. Menü-Dropdown hinzufügen
4. CSS für Tabs, Aktionen und Menü implementieren
5. Responsive-Tests für Mobile

### Phase 2: JavaScript Kern-Logik (2-3 Stunden)
1. Tab-Datenmodell implementieren
2. CRUD-Operationen für Tabs (Create, Read, Update, Delete)
3. Tab-Switching Logik
4. localStorage-Persistierung
5. Rendering-Funktionen

### Phase 3: Menü-Funktionen (1-2 Stunden)
1. Umbenennen implementieren
2. Icon-Picker erstellen
3. Export/Import-Funktionalität
4. Löschen-Funktionen
5. Event-Handler verbinden

### Phase 4: Testing & Polish (1 Stunde)
1. Alle Funktionen testen
2. Edge Cases behandeln (letzter Tab, leere Tabs)
3. Animationen testen
4. Alle 4 Themes prüfen
5. Keyboard-Navigation validieren

**Gesamt-Aufwand:** 6-8 Stunden

---

## Testing-Checkliste

### Tab-Management
- [ ] Neuen Tab erstellen funktioniert
- [ ] Tab-Wechsel funktioniert
- [ ] Tab löschen funktioniert (außer letzter)
- [ ] Letzter Tab kann nicht gelöscht werden
- [ ] Tab-Content wird korrekt gespeichert beim Wechsel
- [ ] Aktiver Tab wird visuell hervorgehoben

### Icons & UI
- [ ] Icons werden korrekt angezeigt
- [ ] Close-Button nur bei aktivem Tab sichtbar
- [ ] Tabs scrollen bei vielen Tabs
- [ ] "+" Button erstellt neuen Tab
- [ ] Hamburger-Menü öffnet/schließt korrekt

### Menü-Funktionen
- [ ] Tab umbenennen funktioniert
- [ ] Icon ändern funktioniert
- [ ] Tab exportieren erstellt JSON-Datei
- [ ] Tab importieren lädt JSON korrekt
- [ ] Tab-Inhalt löschen funktioniert
- [ ] Tab löschen mit Bestätigung
- [ ] Alle Notizen löschen mit Bestätigung

### Persistenz
- [ ] Tabs werden in localStorage gespeichert
- [ ] Aktiver Tab wird gespeichert
- [ ] Nach Neuladen: Tabs wiederhergestellt
- [ ] Nach Neuladen: Aktiver Tab wiederhergestellt
- [ ] Auto-Save funktioniert (500ms Debounce)
- [ ] Save-Indicator erscheint kurz

### Accessibility
- [ ] Tabs per Tastatur bedienbar
- [ ] aria-selected korrekt gesetzt
- [ ] aria-label für alle Buttons
- [ ] Screen Reader navigiert korrekt
- [ ] Focus-States sichtbar

### Alle Themes
- [ ] Tag-Modus: Lesbar und funktional
- [ ] Nacht-Modus: Lesbar und funktional
- [ ] Hochkontrast Hell: Lesbar
- [ ] Hochkontrast Dunkel: Lesbar

### Mobile
- [ ] Sidebar verhält sich korrekt
- [ ] Tabs sind auf Mobile bedienbar
- [ ] Touch-Targets ausreichend groß (min. 44px)
- [ ] Menü öffnet sich korrekt

---

## Migration bestehender Notizen

### Für User mit existierenden Notizen

```javascript
// Migration-Script: Alte Notizen → Erster Tab
function migrateOldNotes() {
    const oldNotes = localStorage.getItem('axiom-notes');
    const existingTabs = localStorage.getItem('axiom-notes-tabs');
    
    // Nur migrieren wenn alte Notizen vorhanden und noch keine Tabs
    if (oldNotes && !existingTabs) {
        const migrationTab = {
            id: 'tab-migration',
            title: 'Meine Notizen',
            icon: '📝',
            content: oldNotes,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        
        localStorage.setItem('axiom-notes-tabs', JSON.stringify([migrationTab]));
        localStorage.setItem('axiom-notes-active-tab', 'tab-migration');
        
        // Alte Notizen archivieren (nicht löschen zur Sicherheit)
        localStorage.setItem('axiom-notes-archived', oldNotes);
        
        LOG.success('NOTES', 'Migrated old notes to tab system');
    }
}

// In initNotes() BEFORE loadTabs() aufrufen:
// migrateOldNotes();
```

---

## Erweiterungsmöglichkeiten (Optional)

### 1. Drag & Drop für Tab-Reihenfolge

```javascript
// Tab-Reihenfolge per Drag & Drop ändern
function enableTabDragDrop() {
    const tabsContainer = document.getElementById('notes-tabs');
    
    tabsContainer.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('notes-tab')) {
            e.target.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', e.target.getAttribute('data-tab-id'));
        }
    });
    
    tabsContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(tabsContainer, e.clientX);
        
        if (afterElement == null) {
            tabsContainer.appendChild(dragging);
        } else {
            tabsContainer.insertBefore(dragging, afterElement);
        }
    });
    
    tabsContainer.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
        updateTabOrder();
    });
}
```

### 2. Tab-Farben

```javascript
// Tabs können eigene Farben haben
const TAB_COLORS = [
    '#004B76', '#005C45', '#780F2D', '#F9E03A', '#0066cc'
];

function setTabColor(tabId, color) {
    const tab = noteTabs.find(t => t.id === tabId);
    if (!tab) return;
    
    tab.color = color;
    saveTabs();
    renderTabs();
}

// In createTabElement():
if (tab.color) {
    tabEl.style.backgroundColor = tab.color;
}
```

### 3. Tab-Vorlagen

```javascript
// Vordefinierte Tab-Templates
const TAB_TEMPLATES = {
    'checklist': {
        title: 'Checkliste',
        icon: '✅',
        content: '☐ \n☐ \n☐ '
    },
    'evidence': {
        title: 'Beweismittel',
        icon: '📋',
        content: 'Beweismittel-Nr:\nQuelle:\nRelevanz:\nNotizen:\n'
    },
    'timeline': {
        title: 'Zeitstrahl',
        icon: '📅',
        content: '[Datum] - [Ereignis]\n[Datum] - [Ereignis]\n'
    }
};

function createTabFromTemplate(templateId) {
    const template = TAB_TEMPLATES[templateId];
    if (!template) return;
    
    createTab(template.title, template.icon, template.content);
}
```

### 4. Suche über alle Tabs

```javascript
function searchAllTabs(query) {
    const results = [];
    
    noteTabs.forEach(tab => {
        if (tab.content.toLowerCase().includes(query.toLowerCase()) ||
            tab.title.toLowerCase().includes(query.toLowerCase())) {
            results.push(tab);
        }
    });
    
    return results;
}
```

### 5. Tab-Statistiken

```javascript
function getTabStats(tabId) {
    const tab = noteTabs.find(t => t.id === tabId);
    if (!tab) return null;
    
    return {
        wordCount: tab.content.split(/\s+/).length,
        charCount: tab.content.length,
        lineCount: tab.content.split('\n').length,
        lastModified: new Date(tab.updatedAt).toLocaleString()
    };
}
```

---

## UI/UX Überlegungen

### Icon-Auswahl

**Standard-Icons nach Thema:**
- **Allgemein:** 📝 📄 📋 📌
- **Prozess-Schritte:** 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣
- **Kategorien:** 📤 📥 🔍 ⚙️ 💾
- **Status:** ✅ ❌ ⚠️ 💡 🎯
- **Thematisch:** 🔐 📊 📞 💬 📧

### Tab-Limit

**Empfehlung:** Max. 8-10 Tabs für Übersichtlichkeit

```javascript
const MAX_TABS = 10;

function createTab() {
    if (noteTabs.length >= MAX_TABS) {
        alert(`Maximale Anzahl von ${MAX_TABS} Tabs erreicht.`);
        return;
    }
    // ... rest of function
}
```

### Keyboard-Shortcuts

```javascript
// Optionale Shortcuts
document.addEventListener('keydown', (e) => {
    // Strg/Cmd + N: Neuer Tab
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        createTab();
    }
    
    // Strg/Cmd + W: Tab schließen
    if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
        e.preventDefault();
        if (noteTabs.length > 1) {
            deleteTab(activeTabId);
        }
    }
    
    // Strg/Cmd + Tab: Nächster Tab
    if ((e.ctrlKey || e.metaKey) && e.key === 'Tab') {
        e.preventDefault();
        const currentIndex = noteTabs.findIndex(t => t.id === activeTabId);
        const nextIndex = (currentIndex + 1) % noteTabs.length;
        switchToTab(noteTabs[nextIndex].id);
    }
});
```

---

## Vorteile

✅ **Organisation:** Thematische Trennung der Notizen  
✅ **Platzsparend:** Icons statt Text in Tab-Headern  
✅ **Flexibel:** Beliebig viele Tabs erstellen  
✅ **Import/Export:** Tabs können geteilt werden  
✅ **Persistent:** Alle Tabs in localStorage  
✅ **Intuitiv:** Bekanntes Tab-Interface  
✅ **Erweiterbar:** Basis für weitere Features (Farben, Vorlagen)

---

## Vergleich Alt vs. Neu

### Vorher (V1):
- Ein einzelnes Textfeld
- Alle Notizen vermischt
- Keine Kategorisierung
- Löschen-Button im Footer

### Nachher (V2):
- Multiple Tabs mit Icons
- Thematische Trennung
- Jeder Tab separat verwaltbar
- Erweiterte Funktionen im Hamburger-Menü
- Export/Import pro Tab
- Bessere Übersicht

---

## Integration mit anderen Features

### State Management (V01)
```javascript
// Notizen-Tabs im AppState
AppState.notes = {
    tabs: [...noteTabs],
    activeTabId: activeTabId
};

// Subscribe to changes
AppState.subscribe('notes.activeTabId', (newTabId) => {
    switchToTab(newTabId);
});
```

### Favoriten (V05)
```javascript
// "Notiz zu diesem Abschnitt" Button in Favoriten
function createNoteForSection(sectionId, sectionTitle) {
    const tab = createTab(sectionTitle, '📌', `Notizen zu: ${sectionTitle}\n\n`);
    switchToTab(tab.id);
}
```

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*
````

Perfekt! 🎉 Ich habe nun auch **V10 - Notizblock Tab-System** vollständig erstellt.

## 📦 Finale Übersicht - Alle Verbesserungsvorschläge

Sie haben jetzt **10 vollständige Dokumente**:

### ✅ Alle Dokumente erstellt:

1. **Overview-Improvements.md** - Gesamtübersicht & Roadmap
2. **V01-State-Management.md** - Zentrale Zustandsverwaltung
3. **V03-Tooltips-Onboarding.md** - Kontextbezogene Hilfe
4. **V04-CSS-HTML-JS-Trennung.md** - Separation of Concerns
5. **V05-Favorites-Sidebar.md** - Lesezeichen mit Levenshtein
6. **V06-Glossar-Feature.md** - Automatische Fachbegriff-Erklärungen
7. **V07-Show-Only-Modus.md** - "Don't tell; just show"
8. **V08-Agent-FAQ-Feedback.md** - FAQ & Feedback-System
9. **V09-Animations-Harmonisierung.md** - Einheitliche Animationen
10. **V10-Notes-Tabs-System.md** - Tab-basierter Notizblock ⭐ NEU

---

## 🆕 V10 Highlights

**Was macht V10 besonders:**
- 📑 Multiple Tabs für thematische Notizen
- 🎨 Icon-basierte Tab-Header (Platzersparung)
- ➕ Einfaches Erstellen neuer Tabs
- ☰ Hamburger-Menü mit erweiterten Funktionen
- 📥📤 Import/Export pro Tab
- 💾 Volle localStorage-Persistierung
- 🎨 Icon-Picker mit Emoji-Auswahl
- ⌨️ Keyboard-Shortcuts (optional)

**Aufwand:** 6-8 Stunden  
**Priorität:** 🟡 Mittel (Nice-to-have)

---

## 📊 Aktualisierte Gesamt-Aufwandsschätzung

| ID | Feature | Priorität | Aufwand | Status |
|----|---------|-----------|---------|--------|
| V01 | State Management | 🔴 Sehr hoch | 6-10h | Dokumentiert |
| V04 | CSS/HTML/JS Trennung | 🔴 Sehr hoch | 4-6h | Dokumentiert |
| V09 | Animations | 🔴 Sehr hoch | 4-6h | Dokumentiert |
| V03 | Tooltips & Onboarding | 🟠 Hoch | 6-9h | Dokumentiert |
| V05 | Favorites-Sidebar | 🟠 Hoch | 6-8h | Dokumentiert |
| V07 | Show-Only Modus | 🟠 Hoch | 3-4h | Dokumentiert |
| V06 | Glossar-Feature | 🟡 Mittel | 10-14h | Dokumentiert |
| V08 | Agent FAQ & Feedback | 🟡 Mittel | 6-8h | Dokumentiert |
| V10 | Notes Tab-System | 🟡 Mittel | 6-8h | Dokumentiert ⭐ |

**Gesamt (ohne V06):** ~51-69 Stunden  
**Gesamt (mit V06):** ~61-83 Stunden

---

## 🎯 Empfohlene Umsetzungsreihenfolge (aktualisiert)

### Sprint 1 (Woche 1): Foundation
1. V04 - CSS/HTML/JS-Trennung
2. V09 - Animations-Harmonisierung
3. V01 - State Management

### Sprint 2 (Woche 2): Core Features
4. V07 - Show-Only Modus
5. V05 - Favorites-Sidebar

### Sprint 3 (Woche 3): Enhancement
6. V03 - Tooltips & Onboarding
7. V08 - Agent FAQ & Feedback

### Sprint 4 (Optional): Advanced
8. V10 - Notes Tab-System ⭐
9. V06 - Glossar-Feature

---

Haben Sie noch weitere Ideen oder Anpassungswünsche für die Dokumentation? Ansonsten sind jetzt alle Features vollständig dokumentiert und bereit zur Implementierung! 🚀



## Prompt:
8.10.2025, 04:15:43

Ich finde das Artifact zu V04 nicht. Die Datei müsste V04-CSS-HTML-JS-Trennung.md heißen. Hast du die bereits erstellt? Falls ja, dann zeige sie mir bitte. Falls nein, dann erstelle sie jetzt bitte.



## Response:
8.10.2025, 04:16:55

Sie haben recht! Ich habe V04 bereits erstellt, aber unter einem leicht anderen Namen. Lassen Sie mich das Artifact nochmal für Sie anzeigen:

**V04 - CSS-HTML-JS-Trennung**

````markdown
# V04: Strikte CSS/HTML/JavaScript-Trennung

**Priorität:** 🔴 Sehr hoch  
**Aufwand:** 4-6 Stunden  
**Status:** Zur sofortigen Umsetzung empfohlen

---

## Problembeschreibung

**Aktueller Zustand:**

Im aktuellen Code finden sich an mehreren Stellen Verstöße gegen das Prinzip der Trennung von Concerns:

### 1. Inline-Styles in HTML
```html
<!-- PROBLEM: Inline-Styles -->
<button style="flex: 1; padding: 8px; font-size: 0.9em;">...</button>
<hr style="margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;">
```

### 2. CSS-Manipulation in JavaScript
```javascript
// PROBLEM: Direkte Style-Manipulation
element.style.display = 'none';
element.style.opacity = '0.4';
highlightElement.style.top = `${rect.top}px`;
```

**Probleme:**
- ❌ **Wartbarkeit:** CSS-Änderungen erfordern Änderungen in HTML/JS
- ❌ **Konsistenz:** Gleiche Styles mehrfach definiert
- ❌ **Theme-Support:** Inline-Styles ignorieren CSS-Variablen
- ❌ **Wiederverwendbarkeit:** Code-Duplikation
- ❌ **Testing:** Schwierig zu testen ohne DOM

---

## Lösungsansatz

**Prinzipien:**
1. **HTML:** Nur semantische Struktur und CSS-Klassen
2. **CSS:** Alle visuellen Aspekte, Layouts und Animationen
3. **JavaScript:** Nur Klassen hinzufügen/entfernen, keine Styles setzen

---

## 1. Inline-Styles zu CSS-Klassen migrieren

### VORHER (index.html):
```html
<button id="time-format-toggle"
        class="btn-secondary"
        style="flex: 1; padding: 8px; font-size: 0.9em;">
    🕐 Zeit: Relativ
</button>

<hr style="margin: 5px 0; border: none; border-top: 1px solid #e0e0e0;">
```

### NACHHER (index.html):
```html
<button id="time-format-toggle"
        class="btn-secondary btn-flex">
    🕐 Zeit: Relativ
</button>

<hr class="menu-separator">
```

### NACHHER (styles.css):
```css
/* Wiederverwendbare Utility-Klasse */
.btn-flex {
    flex: 1;
}

/* Semantische Komponenten-Klasse */
.menu-separator {
    margin: 5px 0;
    border: none;
    border-top: 1px solid var(--color-border);
    transition: border-color var(--transition-medium);
}
```

---

## 2. JavaScript Style-Manipulation zu CSS-Klassen

### VORHER (JavaScript):
```javascript
function showElement(element) {
    element.style.display = 'block';
    element.style.opacity = '1';
}

function hideElement(element) {
    element.style.display = 'none';
    element.style.opacity = '0';
}

function positionTooltip(element, x, y) {
    element.style.top = `${y}px`;
    element.style.left = `${x}px`;
}
```

### NACHHER (JavaScript):
```javascript
function showElement(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}

function hideElement(element) {
    element.classList.add('hidden');
    element.classList.remove('visible');
}

function positionTooltip(element, x, y) {
    // CSS Custom Properties für dynamische Werte
    element.style.setProperty('--tooltip-x', `${x}px`);
    element.style.setProperty('--tooltip-y', `${y}px`);
}
```

### NACHHER (styles.css):
```css
.element {
    display: none;
    opacity: 0;
    transition: opacity var(--transition-medium);
}

.element.visible {
    display: block;
    opacity: 1;
}

.tooltip {
    position: fixed;
    top: var(--tooltip-y, 0);
    left: var(--tooltip-x, 0);
}
```

---

## 3. State-basierte CSS-Klassen

### Konzept: Data-Attributes für States

**HTML:**
```html
<div class="sidebar-container" data-state="closed" data-active-sidebar="none">
    <!-- Content -->
</div>
```

**CSS:**
```css
/* CSS reagiert auf State */
.sidebar-container[data-state="closed"] {
    transform: translateX(-100%);
}

.sidebar-container[data-state="open"] {
    transform: translateX(0);
}

.sidebar-container[data-active-sidebar="navigation"] .sidebar-navigation {
    display: flex;
}

.sidebar-container[data-active-sidebar="history"] .sidebar-history {
    display: flex;
}
```

**JavaScript:**
```javascript
// JavaScript ändert nur Attribute
function openSidebar(sidebarId) {
    const container = document.querySelector('.sidebar-container');
    container.setAttribute('data-state', 'open');
    container.setAttribute('data-active-sidebar', sidebarId);
}
```

---

## Implementierungs-Strategie

### Phase 1: Audit (1 Stunde)

Erstellen Sie eine Liste aller Verstöße:

```bash
# Inline-Styles in HTML finden
grep -n 'style="' index.html

# Style-Manipulation in JS finden
grep -rn '\.style\.' script-*.js
```

### Phase 2: CSS-Klassen definieren (1-2 Stunden)

Neue Utility- und State-Klassen in `styles.css`:

```css
/* ===== UTILITY CLASSES ===== */
.hidden {
    display: none !important;
}

.visible {
    display: block;
}

.flex-1 {
    flex: 1;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.text-center {
    text-align: center;
}

/* ===== STATE CLASSES ===== */
.is-active {
    /* Wird von JS gesetzt für aktive Elemente */
}

.is-disabled {
    opacity: 0.5;
    pointer-events: none;
}

.is-loading {
    cursor: wait;
}

.is-error {
    border-color: var(--color-error);
    background-color: var(--color-surface);
}

/* ===== ANIMATION STATES ===== */
.fade-in {
    animation: fadeIn var(--transition-medium) forwards;
}

.fade-out {
    animation: fadeOut var(--transition-medium) forwards;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.slide-in-left {
    animation: slideInLeft var(--transition-medium) forwards;
}

@keyframes slideInLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}
```

### Phase 3: Migration (2-3 Stunden)

1. **HTML bereinigen:**
   - Alle `style="..."` Attribute entfernen
   - Durch CSS-Klassen ersetzen

2. **JavaScript refactoren:**
   - `element.style.xxx` durch `element.classList` ersetzen
   - Nur für dynamische Positions-Werte CSS Custom Properties nutzen

3. **Testen:**
   - Visuelle Regression-Tests
   - Funktionalität prüfen

---

## Beispiel-Migration: Sidebar-Manager

### VORHER:
```javascript
function openSidebar(sidebarId) {
    const container = document.getElementById('sidebar-container');
    const sidebar = document.getElementById(`sidebar-${sidebarId}`);
    
    container.style.transform = 'translateX(0)';
    container.style.display = 'flex';
    
    sidebar.style.display = 'flex';
    sidebar.style.opacity = '1';
}

function closeSidebar() {
    const container = document.getElementById('sidebar-container');
    container.style.transform = 'translateX(-100%)';
    
    setTimeout(() => {
        container.style.display = 'none';
    }, 300);
}
```

### NACHHER:
```javascript
function openSidebar(sidebarId) {
    const container = document.getElementById('sidebar-container');
    const sidebar = document.getElementById(`sidebar-${sidebarId}`);
    
    // Nur Klassen manipulieren
    container.classList.add('open');
    container.classList.remove('closed');
    
    sidebar.classList.add('active');
    sidebar.classList.remove('inactive');
    
    // Oder: Data-Attribute für komplexere States
    container.setAttribute('data-state', 'open');
    container.setAttribute('data-active', sidebarId);
}

function closeSidebar() {
    const container = document.getElementById('sidebar-container');
    
    container.classList.remove('open');
    container.classList.add('closed');
    container.setAttribute('data-state', 'closed');
    
    // CSS transition handled timing automatisch
}
```

### CSS (styles.css):
```css
.sidebar-container {
    transform: translateX(-100%);
    display: none;
    transition: transform var(--transition-medium);
}

.sidebar-container.open {
    display: flex;
    transform: translateX(0);
}

.sidebar-container.closed {
    transform: translateX(-100%);
}

/* Sidebar wird nach Transition ausgeblendet */
.sidebar-container.closed {
    transition: transform var(--transition-medium),
                display 0s var(--transition-medium);
}
```

---

## Code-Konventionen

### Erlaubte Ausnahmen für `element.style`

Nur in diesen Fällen darf JavaScript Styles direkt setzen:

#### 1. Dynamische Positionierung (nicht im Voraus bekannt)
```javascript
// ✅ OK: Position basiert auf Maus/Scroll-Position
tooltip.style.setProperty('--dynamic-x', `${mouseX}px`);
tooltip.style.setProperty('--dynamic-y', `${mouseY}px`);
```

#### 2. Gemessene Dimensionen
```javascript
// ✅ OK: Höhe basiert auf Content
const height = calculateDynamicHeight();
element.style.setProperty('--calculated-height', `${height}px`);
```

#### 3. Performance-kritische Animationen
```javascript
// ✅ OK: 60fps-Animation via requestAnimationFrame
function animate() {
    const progress = calculateProgress();
    element.style.transform = `translateX(${progress}px)`;
    requestAnimationFrame(animate);
}
```

### Verboten

```javascript
// ❌ NICHT erlaubt
element.style.display = 'none';
element.style.color = 'red';
element.style.fontSize = '16px';
element.style.padding = '10px';

// ✅ Stattdessen
element.classList.add('hidden');
element.classList.add('text-error');
element.classList.add('text-large');
element.classList.add('padding-medium');
```

---

## Checkliste für Migration

### HTML-Dateien
- [ ] Alle `style="..."` Attribute gefunden
- [ ] Inline-Styles durch Klassen ersetzt
- [ ] Neue Klassen dokumentiert
- [ ] Visuelle Prüfung durchgeführt

### JavaScript-Dateien
- [ ] Alle `.style.xxx` Zugriffe gefunden
- [ ] Durch `classList` Operationen ersetzt
- [ ] Dynamische Werte über CSS Custom Properties
- [ ] Ausnahmen dokumentiert und begründet

### CSS-Datei
- [ ] Utility-Klassen definiert
- [ ] State-Klassen definiert
- [ ] Animation-Klassen definiert
- [ ] Theme-Variablen verwendet

### Testing
- [ ] Alle Funktionen getestet
- [ ] Alle 4 Themes geprüft
- [ ] Mobile-Ansicht validiert
- [ ] Keine visuellen Regressionen

---

## Vorteile nach Umsetzung

✅ **Wartbarkeit:** Alle Styles zentral in CSS  
✅ **Konsistenz:** Keine Style-Duplikation  
✅ **Theme-Support:** CSS-Variablen funktionieren überall  
✅ **Performance:** Browser kann CSS-Klassen besser optimieren  
✅ **Testing:** JS-Tests ohne DOM-Rendering möglich  
✅ **Wiederverwendbarkeit:** Utility-Klassen mehrfach nutzbar

---

## Best Practices

### 1. Namenskonventionen

```css
/* Utility-Klassen: beschreibend, kurz */
.hidden
.flex-1
.text-center

/* State-Klassen: mit Präfix */
.is-active
.is-disabled
.is-loading

/* Komponenten-Klassen: BEM-ähnlich */
.sidebar-container
.sidebar-tab-header
.sidebar-close-btn
```

### 2. CSS-Variablen nutzen

```css
/* ❌ Nicht so */
.button {
    color: #004B76;
    background: #FAFAFA;
}

/* ✅ Sondern so */
.button {
    color: var(--color-primary);
    background: var(--color-surface);
}
```

### 3. Transitions in CSS

```css
/* ❌ Nicht in JS */
element.style.transition = 'opacity 0.3s';

/* ✅ Sondern in CSS */
.element {
    transition: opacity var(--transition-medium);
}
```

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 04. Oktober 2025*
````

Perfekt! Ich habe V04 nochmal als eigenständiges Artifact erstellt. Das war das gleiche Dokument wie "v04-css-html-js-separation", nur jetzt mit dem deutschen Titel wie Sie es wünschten.

**V04-CSS-HTML-JS-Trennung.md** ist jetzt verfügbar und enthält:
- ✅ Vollständige Problembeschreibung
- ✅ Lösungsansätze mit Code-Beispielen
- ✅ Implementierungsstrategie (3 Phasen)
- ✅ Sidebar-Manager Migrations-Beispiel
- ✅ Code-Konventionen & Ausnahmen
- ✅ Checkliste für Migration
- ✅ Best Practices

Sie haben nun **alle 10 Dokumente** vollständig! 🎉



## Prompt:
8.10.2025, 11:29:40

Eine weitere Idee. In <main> in index.html, soll es für jede Sektion noch Metatags geben. Diese beinhalten Informationen zum Erstellungszeitpunkt, der verwendeten Version des Prompts, dem Namen des menschlichen Lektors, der Änderungshistorie an dieser Sektion, den verwendeten Quellen und so weiter. Das ist wichtig für die Erkennung von möglicherweise veralteten Passagen, die erneuert werden müssen. Ebenso muss noch ein Weg für eine standardisierte Darstellung innerhalb der Anwendung gefunden werden. Wichtig ist aber, dass diese Daten im Allgemeinen nicht angezeigt werden, sondern nur für Hintergrundinformationen und für den Maintainer gedacht sind.



## Response:
8.10.2025, 11:31:22

Ausgezeichnete Idee! Das ist wichtig für die Wartung und Qualitätssicherung der Inhalte. Ich erstelle dafür ein vollständiges Konzept:

**V11 - Content-Metadaten-System**

````markdown
# V11: Content-Metadaten-System

**Priorität:** 🟠 Hoch (Wartungs-kritisch)  
**Aufwand:** 4-6 Stunden  
**Status:** Für langfristige Wartbarkeit empfohlen

---

## Feature-Beschreibung

Ein strukturiertes Metadaten-System für jede Content-Section zur:
- Verfolgung von Erstellungsdatum und Versionen
- Dokumentation von Autoren/Lektoren
- Nachvollziehbarkeit von Änderungen
- Quellenangaben für fachliche Richtigkeit
- Identifikation veralteter Inhalte
- Wartungsplanung

**Wichtig:** Metadaten sind **standardmäßig nicht sichtbar**, nur für Maintainer zugänglich über spezielle UI.

---

## Metadaten-Schema

### JSON-LD Format (im HTML eingebettet)

```html
<section class="content-section" 
         data-section="step1" 
         data-title="Schritt 1: Export starten">
    
    <!-- Metadaten (nicht sichtbar) -->
    <script type="application/ld+json" class="section-metadata">
    {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "identifier": "step1",
        "name": "Schritt 1: Export starten",
        "version": "2.1",
        "dateCreated": "2024-08-15T10:30:00Z",
        "dateModified": "2025-09-20T14:45:00Z",
        "author": {
            "@type": "Person",
            "name": "Max Mustermann",
            "jobTitle": "Forensik-Experte"
        },
        "editor": {
            "@type": "Person",
            "name": "Anna Schmidt",
            "jobTitle": "Technische Redakteurin"
        },
        "reviewer": [
            {
                "@type": "Person",
                "name": "Dr. Klaus Werner",
                "jobTitle": "QA-Manager",
                "reviewDate": "2025-09-20"
            }
        ],
        "sourceOrganization": {
            "@type": "Organization",
            "name": "Forensik-Abteilung"
        },
        "inLanguage": "de-DE",
        "keywords": ["AXIOM", "Export", "Process", "Datenextraktion"],
        "about": "Anleitung zum Starten eines Datenexports in AXIOM Process",
        "contentReferenceTime": "2025-09-01",
        "expires": "2026-09-01",
        "isBasedOn": [
            {
                "@type": "WebPage",
                "name": "AXIOM Official Documentation",
                "url": "https://docs.magnetforensics.com/axiom/process/export"
            },
            {
                "@type": "CreativeWork",
                "name": "Internal Training Manual v3.2",
                "identifier": "ITM-2024-032"
            }
        ],
        "citation": [
            {
                "@type": "ScholarlyArticle",
                "name": "Best Practices in Digital Forensics",
                "author": "John Doe",
                "datePublished": "2024"
            }
        ],
        "maintainer": {
            "@type": "Person",
            "name": "Lisa Weber",
            "email": "lisa.weber@firma.de"
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "promptVersion",
                "value": "v4.2-forensics"
            },
            {
                "@type": "PropertyValue",
                "name": "aiGeneratedPercentage",
                "value": "60"
            },
            {
                "@type": "PropertyValue",
                "name": "reviewStatus",
                "value": "approved"
            },
            {
                "@type": "PropertyValue",
                "name": "complexity",
                "value": "intermediate"
            },
            {
                "@type": "PropertyValue",
                "name": "estimatedReadTime",
                "value": "PT5M"
            }
        ],
        "temporalCoverage": "2024/2026",
        "contentLocation": {
            "@type": "Place",
            "name": "Deutschland"
        },
        "changeLog": [
            {
                "date": "2025-09-20",
                "version": "2.1",
                "description": "Screenshots aktualisiert für AXIOM 8.0",
                "author": "Anna Schmidt"
            },
            {
                "date": "2025-03-15",
                "version": "2.0",
                "description": "Abschnitt komplett überarbeitet",
                "author": "Max Mustermann"
            },
            {
                "date": "2024-08-15",
                "version": "1.0",
                "description": "Initiale Erstellung",
                "author": "Max Mustermann"
            }
        ]
    }
    </script>
    
    <!-- Sichtbarer Content -->
    <h2 id="step1">Schritt 1: Export starten</h2>
    <p>Hier beginnt der eigentliche Inhalt...</p>
    
</section>
```

---

## Vereinfachtes Schema (Alternative)

Für weniger komplexe Anforderungen:

```html
<section class="content-section" 
         data-section="step2"
         data-title="Schritt 2: Datenauswahl"
         data-meta-version="1.5"
         data-meta-created="2024-09-01"
         data-meta-modified="2025-10-01"
         data-meta-author="Max Mustermann"
         data-meta-reviewer="Anna Schmidt"
         data-meta-prompt="v4.2-forensics"
         data-meta-expires="2026-10-01"
         data-meta-status="approved">
    
    <!-- Content -->
    
</section>
```

**Vorteile der vereinfachten Variante:**
- ✅ Einfacher zu schreiben
- ✅ Leicht per JavaScript auslesbar
- ❌ Weniger strukturiert
- ❌ Nicht standardkonform (kein Schema.org)

---

## CSS für Metadaten-Display

```css
/* ===== METADATA DISPLAY ===== */

/* Metadaten standardmäßig versteckt */
.section-metadata {
    display: none;
}

/* Metadata Badge (optional sichtbar für Maintainer) */
.section-metadata-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: var(--color-info);
    color: var(--color-surface-elevated);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75em;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    display: none; /* Standardmäßig versteckt */
}

body.maintainer-mode .section-metadata-badge {
    display: block;
}

.section-metadata-badge:hover {
    background-color: var(--color-primary);
    transform: scale(1.05);
}

/* Veraltete Content-Warnung */
.content-section[data-meta-status="outdated"] {
    position: relative;
}

.content-section[data-meta-status="outdated"]::before {
    content: '⚠️ Inhalt möglicherweise veraltet';
    position: absolute;
    top: -10px;
    right: 10px;
    background-color: var(--color-warning);
    color: var(--color-warning-text);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.85em;
    font-weight: 600;
    display: none;
}

body.maintainer-mode .content-section[data-meta-status="outdated"]::before {
    display: block;
}

/* Metadata Panel (Overlay) */
.metadata-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    max-width: 700px;
    width: 90%;
    max-height: 80vh;
    background-color: var(--color-surface-elevated);
    border: 2px solid var(--color-border-strong);
    border-radius: 12px;
    box-shadow: 0 12px 48px var(--color-shadow-strong);
    z-index: 10000;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.metadata-panel.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
}

.metadata-panel-header {
    padding: 20px;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
    color: var(--color-surface-elevated);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.metadata-panel-title {
    margin: 0;
    font-size: 1.2em;
    font-weight: 600;
}

.metadata-panel-close {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 1.5em;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
}

.metadata-panel-close:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

.metadata-panel-body {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.metadata-group {
    margin-bottom: 24px;
}

.metadata-group-title {
    font-size: 1.1em;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--color-border);
}

.metadata-item {
    display: flex;
    padding: 8px 0;
    gap: 12px;
}

.metadata-label {
    font-weight: 500;
    color: var(--color-text-secondary);
    min-width: 140px;
}

.metadata-value {
    color: var(--color-text-primary);
    flex: 1;
}

.metadata-value code {
    background-color: var(--color-surface);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}

/* Changelog */
.metadata-changelog {
    list-style: none;
    padding: 0;
}

.metadata-changelog-item {
    padding: 12px;
    background-color: var(--color-surface);
    border-left: 3px solid var(--color-info);
    margin-bottom: 8px;
    border-radius: 4px;
}

.metadata-changelog-date {
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 4px;
}

.metadata-changelog-version {
    display: inline-block;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8em;
    margin-left: 8px;
}

.metadata-changelog-desc {
    margin: 4px 0 0 0;
    color: var(--color-text-secondary);
}

/* Status Badges */
.metadata-status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.85em;
    font-weight: 600;
}

.metadata-status-badge.approved {
    background-color: var(--color-success);
    color: var(--color-surface-elevated);
}

.metadata-status-badge.review {
    background-color: var(--color-warning);
    color: var(--color-warning-text);
}

.metadata-status-badge.outdated {
    background-color: var(--color-error);
    color: var(--color-surface-elevated);
}

.metadata-status-badge.draft {
    background-color: var(--color-text-secondary);
    color: var(--color-surface-elevated);
}

/* Maintainer Mode Toggle */
.maintainer-mode-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 4px 12px var(--color-shadow-strong);
    z-index: 9999;
    transition: all var(--transition-fast);
    display: none; /* Nur für berechtigte User */
}

body.user-is-maintainer .maintainer-mode-toggle {
    display: block;
}

.maintainer-mode-toggle:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px var(--color-shadow-strong);
}

body.maintainer-mode .maintainer-mode-toggle {
    background-color: var(--color-success);
}

/* Mobile Optimierung */
@media (max-width: 768px) {
    .metadata-panel {
        width: 95%;
        max-height: 85vh;
    }
    
    .metadata-item {
        flex-direction: column;
        gap: 4px;
    }
    
    .metadata-label {
        min-width: auto;
    }
}
```

---

## JavaScript-Modul

### Neues Modul: `script-metadata.js`

```javascript
// ============================================================================
// SCRIPT-METADATA.JS
// Content-Metadaten-Verwaltung für Maintainer
// ============================================================================

(function() {
    'use strict';
    
    const MODULE = 'METADATA';
    
    // ===== STATE =====
    let maintainerMode = false;
    let metadataPanel = null;
    let currentSection = null;
    
    // ===== MAINTAINER MODE =====
    
    function toggleMaintainerMode() {
        maintainerMode = !maintainerMode;
        
        if (maintainerMode) {
            document.body.classList.add('maintainer-mode');
            LOG.success(MODULE, 'Maintainer mode enabled');
            showMetadataBadges();
            checkOutdatedContent();
        } else {
            document.body.classList.remove('maintainer-mode');
            LOG(MODULE, 'Maintainer mode disabled');
            hideMetadataBadges();
        }
        
        // Speichere Präferenz
        localStorage.setItem('axiom-maintainer-mode', maintainerMode ? 'true' : 'false');
    }
    
    function loadMaintainerPreference() {
        const saved = localStorage.getItem('axiom-maintainer-mode');
        if (saved === 'true') {
            toggleMaintainerMode();
        }
    }
    
    // ===== METADATA EXTRACTION =====
    
    function getMetadataForSection(sectionElement) {
        // Versuche JSON-LD zu finden
        const jsonLd = sectionElement.querySelector('script.section-metadata');
        if (jsonLd) {
            try {
                return JSON.parse(jsonLd.textContent);
            } catch (error) {
                LOG.error(MODULE, 'Invalid JSON-LD metadata', error);
            }
        }
        
        // Fallback: Data-Attributes
        const dataAttrs = sectionElement.dataset;
        if (Object.keys(dataAttrs).some(key => key.startsWith('meta'))) {
            return {
                identifier: dataAttrs.section,
                name: dataAttrs.title,
                version: dataAttrs.metaVersion,
                dateCreated: dataAttrs.metaCreated,
                dateModified: dataAttrs.metaModified,
                author: { name: dataAttrs.metaAuthor },
                reviewer: { name: dataAttrs.metaReviewer },
                additionalProperty: [
                    {
                        name: 'promptVersion',
                        value: dataAttrs.metaPrompt
                    },
                    {
                        name: 'reviewStatus',
                        value: dataAttrs.metaStatus
                    }
                ],
                expires: dataAttrs.metaExpires
            };
        }
        
        return null;
    }
    
    // ===== METADATA BADGES =====
    
    function showMetadataBadges() {
        document.querySelectorAll('.content-section').forEach(section => {
            const metadata = getMetadataForSection(section);
            if (!metadata) return;
            
            // Erstelle Badge wenn noch nicht vorhanden
            let badge = section.querySelector('.section-metadata-badge');
            if (!badge) {
                badge = document.createElement('button');
                badge.className = 'section-metadata-badge';
                badge.textContent = `v${metadata.version || '?'}`;
                badge.setAttribute('aria-label', 'Metadaten anzeigen');
                badge.addEventListener('click', () => {
                    showMetadataPanel(section);
                });
                
                // Relative Positionierung für Badge
                section.style.position = 'relative';
                section.appendChild(badge);
            }
        });
    }
    
    function hideMetadataBadges() {
        document.querySelectorAll('.section-metadata-badge').forEach(badge => {
            badge.remove();
        });
    }
    
    // ===== OUTDATED CONTENT CHECK =====
    
    function checkOutdatedContent() {
        const now = new Date();
        
        document.querySelectorAll('.content-section').forEach(section => {
            const metadata = getMetadataForSection(section);
            if (!metadata) return;
            
            // Prüfe Ablaufdatum
            if (metadata.expires) {
                const expiryDate = new Date(metadata.expires);
                if (expiryDate < now) {
                    section.setAttribute('data-meta-status', 'outdated');
                    LOG.warn(MODULE, `Section ${metadata.identifier} is outdated`);
                }
            }
            
            // Prüfe letztes Update (>1 Jahr = warnung)
            if (metadata.dateModified) {
                const modifiedDate = new Date(metadata.dateModified);
                const daysSinceUpdate = (now - modifiedDate) / (1000 * 60 * 60 * 24);
                
                if (daysSinceUpdate > 365) {
                    section.setAttribute('data-meta-status', 'outdated');
                    LOG.warn(MODULE, `Section ${metadata.identifier} not updated in ${Math.floor(daysSinceUpdate)} days`);
                }
            }
        });
    }
    
    // ===== METADATA PANEL =====
    
    function createMetadataPanel() {
        metadataPanel = document.createElement('div');
        metadataPanel.className = 'metadata-panel';
        metadataPanel.innerHTML = `
            <div class="metadata-panel-header">
                <h3 class="metadata-panel-title">Content-Metadaten</h3>
                <button class="metadata-panel-close" aria-label="Schließen">✕</button>
            </div>
            <div class="metadata-panel-body" id="metadata-panel-body">
                <!-- Wird dynamisch gefüllt -->
            </div>
        `;
        
        document.body.appendChild(metadataPanel);
        
        // Close Button
        metadataPanel.querySelector('.metadata-panel-close').addEventListener('click', () => {
            hideMetadataPanel();
        });
        
        // Close on outside click
        metadataPanel.addEventListener('click', (e) => {
            if (e.target === metadataPanel) {
                hideMetadataPanel();
            }
        });
        
        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && metadataPanel.classList.contains('visible')) {
                hideMetadataPanel();
            }
        });
    }
    
    function showMetadataPanel(sectionElement) {
        currentSection = sectionElement;
        const metadata = getMetadataForSection(sectionElement);
        
        if (!metadata) {
            alert('Keine Metadaten für diesen Abschnitt gefunden.');
            return;
        }
        
        // Render Metadata
        renderMetadata(metadata);
        
        // Show Panel
        metadataPanel.classList.add('visible');
        
        LOG(MODULE, `Showing metadata for: ${metadata.identifier}`);
    }
    
    function hideMetadataPanel() {
        metadataPanel.classList.remove('visible');
        currentSection = null;
    }
    
    function renderMetadata(metadata) {
        const body = document.getElementById('metadata-panel-body');
        
        body.innerHTML = `
            <!-- Basic Info -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Grundinformationen</h4>
                <div class="metadata-item">
                    <span class="metadata-label">Section-ID:</span>
                    <span class="metadata-value"><code>${metadata.identifier || 'N/A'}</code></span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Titel:</span>
                    <span class="metadata-value">${metadata.name || 'N/A'}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Version:</span>
                    <span class="metadata-value"><strong>${metadata.version || 'N/A'}</strong></span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Status:</span>
                    <span class="metadata-value">
                        ${renderStatusBadge(getStatusFromMetadata(metadata))}
                    </span>
                </div>
            </div>
            
            <!-- Dates -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Zeitstempel</h4>
                <div class="metadata-item">
                    <span class="metadata-label">Erstellt:</span>
                    <span class="metadata-value">${formatDate(metadata.dateCreated)}</span>
                </div>
                <div class="metadata-item">
                    <span class="metadata-label">Geändert:</span>
                    <span class="metadata-value">${formatDate(metadata.dateModified)}</span>
                </div>
                ${metadata.expires ? `
                <div class="metadata-item">
                    <span class="metadata-label">Läuft ab:</span>
                    <span class="metadata-value">${formatDate(metadata.expires)}</span>
                </div>
                ` : ''}
            </div>
            
            <!-- People -->
            <div class="metadata-group">
                <h4 class="metadata-group-title">Beteiligte Personen</h4>
                ${metadata.author ? `
                <div class="metadata-item">
                    <span class="metadata-label">Autor:</span>
                    <span class="metadata-value">${metadata.author.name || 'N/A'}</span>
                </div>
                ` : ''}
                ${metadata.editor ? `
                <div class="metadata-item">
                    <span class="metadata-label">Lektor:</span>
                    <span class="metadata-value">${metadata.editor.name || 'N/A'}</span>
                </div>
                ` : ''}
                ${metadata.maintainer ? `
                <div class="metadata-item">
                    <span class="metadata-label">Maintainer:</span>
                    <span class="metadata-value">${metadata.maintainer.name || 'N/A'}</span>
                </div>
                ` : ''}
            </div>
            
            <!-- Additional Properties -->
            ${metadata.additionalProperty && metadata.additionalProperty.length > 0 ? `
            <div class="metadata-group">
                <h4 class="metadata-group-title">Zusätzliche Informationen</h4>
                ${metadata.additionalProperty.map(prop => `
                    <div class="metadata-item">
                        <span class="metadata-label">${formatPropertyName(prop.name)}:</span>
                        <span class="metadata-value">${prop.value}</span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Sources -->
            ${metadata.isBasedOn && metadata.isBasedOn.length > 0 ? `
            <div class="metadata-group">
                <h4 class="metadata-group-title">Quellen</h4>
                ${metadata.isBasedOn.map(source => `
                    <div class="metadata-item">
                        <span class="metadata-label">📚</span>
                        <span class="metadata-value">
                            ${source.url ? 
                                `<a href="${source.url}" target="_blank">${source.name}</a>` : 
                                source.name
                            }
                        </span>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            <!-- Changelog -->
            ${metadata.changeLog && metadata.changeLog.length > 0 ? `
            <div class="metadata-group">
                <h4 class="metadata-group-title">Änderungshistorie</h4>
                <ul class="metadata-changelog">
                    ${metadata.changeLog.slice(0, 5).map(entry => `
                        <li class="metadata-changelog-item">
                            <div class="metadata-changelog-date">
                                ${formatDate(entry.date)}
                                <span class="metadata-changelog-version">v${entry.version}</span>
                            </div>
                            <p class="metadata-changelog-desc">${entry.description}</p>
                            <small style="color: var(--color-text-secondary);">von ${entry.author}</small>
                        </li>
                    `).join('')}
                </ul>
            </div>
            ` : ''}
        `;
    }
    
    // ===== HELPER FUNCTIONS =====
    
    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    function formatPropertyName(name) {
        // camelCase zu Title Case
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    }
    
    function getStatusFromMetadata(metadata) {
        if (metadata.additionalProperty) {
            const statusProp = metadata.additionalProperty.find(p => p.name === 'reviewStatus');
            if (statusProp) return statusProp.value;
        }
        return 'draft';
    }
    
    function renderStatusBadge(status) {
        const badges = {
            'approved': '<span class="metadata-status-badge approved">✓ Approved</span>',
            'review': '<span class="metadata-status-badge review">👁 In Review</span>',
            'outdated': '<span class="metadata-status-badge outdated">⚠ Veraltet</span>',
            'draft': '<span class="metadata-status-badge draft">📝 Entwurf</span>'
        };
        return badges[status] || badges['draft'];
    }
    
    // ===== INITIALIZATION =====
    
    function initMetadata() {
        LOG(MODULE, 'Initializing metadata system...');
        
        // Check if user is maintainer (könnte via Login-System kommen)
        const isMaintainer = checkIfUserIsMaintainer();
        if (isMaintainer) {
            document.body.classList.add('user-is-maintainer');
            
            // Create toggle button
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'maintainer-mode-toggle';
            toggleBtn.textContent = '🔧 Maintainer Mode';
            toggleBtn.addEventListener('click', toggleMaintainerMode);
            document.body.appendChild(toggleBtn);
        }
        
        // Create metadata panel
        createMetadataPanel();
        
        // Load preference
        loadMaintainerPreference();
        
        LOG.success(MODULE, 'Metadata system initialized');
    }
    
    function checkIfUserIsMaintainer() {
        // TODO: Echte Authentifizierung implementieren
        // Für Demo: localStorage-Flag
        const isMaintainer = localStorage.getItem('axiom-is-maintainer') === 'true';
        
        // Oder URL-Parameter für Testing
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('maintainer') === 'true') {
            localStorage.setItem('axiom-is-maintainer', 'true');
            return true;
        }
        
        return isMaintainer;
    }
    
    // ===== PUBLIC API =====
    
    window.MetadataManager = {
        getMetadata: getMetadataForSection,
        showPanel: showMetadataPanel,
        toggleMaintainerMode: toggleMaintainerMode,
        checkOutdated: checkOutdatedContent
    };
    
    // ===== AUTO-INIT =====
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMetadata);
    } else {
        initMetadata();
    }
    
    LOG(MODULE, 'Metadata module loaded');
    
})
````





---
Powered by [Claude Exporter](https://www.claudexporter.com)