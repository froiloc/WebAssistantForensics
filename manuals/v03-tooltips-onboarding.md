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