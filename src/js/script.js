// ===== GLOBALE VARIABLEN =====
let currentLevel = 1;
let notesOpen = false;
let saveTimeout = null;

// ===== INITIALISIERUNG =====
document.addEventListener('DOMContentLoaded', function() {
    initDetailLevelControls();
    initNotesFeature();
    initFocusObserver();
    loadNotesFromStorage();
});

// ===== DETAILGRAD-STEUERUNG =====
function initDetailLevelControls() {
    const buttons = document.querySelectorAll('.detail-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const level = parseInt(this.dataset.level);
            setDetailLevel(level);
        });
    });
    
    // Tastatursteuerung: Alt + 1, 2, 3
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key >= '1' && e.key <= '3') {
            e.preventDefault();
            setDetailLevel(parseInt(e.key));
        }
    });
    
    // Initial: Level 1 setzen
    updateDetailVisibility();
}

function setDetailLevel(level) {
    currentLevel = level;
    
    // Alle Buttons zurücksetzen
    const buttons = document.querySelectorAll('.detail-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Aktiven Button markieren
    const activeButton = document.querySelector(`.detail-btn[data-level="${level}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
    }
    
    // Detailebenen ein-/ausblenden
    updateDetailVisibility();
    
    // Info-Text aktualisieren
    updateInfoText(level);
    
    // Smooth scroll zum Anfang des Inhalts
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function updateDetailVisibility() {
    // Level 1 immer sichtbar
    const level1Elements = document.querySelectorAll('.detail-level-1');
    level1Elements.forEach(el => el.style.display = 'block');
    
    // Level 2 abhängig von currentLevel
    const level2Elements = document.querySelectorAll('.detail-level-2');
    level2Elements.forEach(el => {
        el.style.display = currentLevel >= 2 ? 'block' : 'none';
    });
    
    // Level 3 abhängig von currentLevel
    const level3Elements = document.querySelectorAll('.detail-level-3');
    level3Elements.forEach(el => {
        el.style.display = currentLevel >= 3 ? 'block' : 'none';
    });
}

function updateInfoText(level) {
    const infoTexts = {
        1: 'Basis - Grundlegende Schritte',
        2: 'Standard - Wichtigste Einstellungen und Erklärungen',
        3: 'Vollständig - Alle Details, Optionen und Best Practices'
    };
    
    const infoElement = document.getElementById('current-level-text');
    if (infoElement) {
        infoElement.textContent = infoTexts[level];
    }
}

// ===== NOTIZBLOCK-FUNKTIONALITÄT =====
function initNotesFeature() {
    const toggleBtn = document.getElementById('notes-toggle');
    const clearBtn = document.getElementById('clear-notes');
    const textarea = document.getElementById('notes-textarea');
    
    // Toggle Button
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleNotes);
    }
    
    // Clear Button
    if (clearBtn) {
        clearBtn.addEventListener('click', clearNotes);
    }
    
    // Auto-Save bei Texteingabe
    if (textarea) {
        textarea.addEventListener('input', function() {
            autoSaveNotes();
        });
    }
    
    // ESC-Taste schließt Notizblock
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && notesOpen) {
            toggleNotes();
        }
    });
}

function toggleNotes() {
    notesOpen = !notesOpen;
    const body = document.body;
    const toggleBtn = document.getElementById('notes-toggle');
    
    if (notesOpen) {
        body.classList.add('notes-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.setAttribute('aria-label', 'Notizblock schließen');
    } else {
        body.classList.remove('notes-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Notizblock öffnen');
    }
}

function clearNotes() {
    if (confirm('Möchten Sie wirklich alle Notizen löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
        const textarea = document.getElementById('notes-textarea');
        if (textarea) {
            textarea.value = '';
            saveNotesToStorage('');
            showSaveIndicator();
        }
    }
}

function autoSaveNotes() {
    // Debounce: Warte 1 Sekunde nach letzter Eingabe
    if (saveTimeout) {
        clearTimeout(saveTimeout);
    }
    
    saveTimeout = setTimeout(function() {
        const textarea = document.getElementById('notes-textarea');
        if (textarea) {
            saveNotesToStorage(textarea.value);
            showSaveIndicator();
        }
    }, 1000);
}

function saveNotesToStorage(content) {
    try {
        localStorage.setItem('axiom-guide-notes', content);
    } catch (e) {
        console.error('Fehler beim Speichern der Notizen:', e);
    }
}

function loadNotesFromStorage() {
    try {
        const savedNotes = localStorage.getItem('axiom-guide-notes');
        const textarea = document.getElementById('notes-textarea');
        
        if (savedNotes && textarea) {
            textarea.value = savedNotes;
        }
    } catch (e) {
        console.error('Fehler beim Laden der Notizen:', e);
    }
}

function showSaveIndicator() {
    const indicator = document.getElementById('save-indicator');
    
    if (indicator) {
        indicator.classList.add('visible');
        
        setTimeout(function() {
            indicator.classList.remove('visible');
        }, 2000);
    }
}

// ===== FOKUS-OBSERVER FÜR SECTIONS =====
function initFocusObserver() {
    // Intersection Observer Konfiguration
    const observerOptions = {
        root: null, // Viewport als Root
        rootMargin: '-25% 0px -25% 0px', // Mittlerer 50% Bereich des Viewports
        threshold: [0, 0.1, 0.5, 0.9, 1.0]
    };
    
    // Observer erstellen
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Alle content-sections beobachten
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        // Section ist im Fokusbereich (mittlere 60% des Viewports)
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            entry.target.classList.remove('out-of-focus');
        } else {
            entry.target.classList.add('out-of-focus');
        }
    });
}

// ===== HILFSFUNKTIONEN =====

// Scroll zu einem bestimmten Element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

// Exportiere Funktionen für externe Nutzung (falls benötigt)
window.axiomGuide = {
    setDetailLevel: setDetailLevel,
    toggleNotes: toggleNotes,
    scrollToElement: scrollToElement
};

/* 
ANLEITUNG: Fügen Sie diesen JavaScript-Code am Ende der script.js Datei ein
(nach den bestehenden Funktionen, vor window.axiomGuide = {...})
*/

// ===== GLOBALE VARIABLEN FÜR NEUE FEATURES =====
let menuOpen = false;
let navSidebarOpen = false;
let historyModalOpen = false;
let tipsVisible = true;
let currentTipIndex = 0;
let tipInterval = null;
let sectionHistory = [];
let timeFormatRelative = true;
let currentActiveSection = null;

// ===== TIPPS-ARRAY =====
const tips = [
    "💡 Tipp: Nutzen Sie Alt+1, Alt+2, Alt+3, um schnell zwischen Detailebenen zu wechseln",
    "⌨️ Tastenkombination: ESC schließt den Notizblock, den Agenten und geöffnete Fenster",
    "📝 Ihre Notizen werden automatisch gespeichert und bleiben auch nach dem Schließen erhalten",
    "🔍 Klicken Sie doppelt auf Navigationseinträge, um direkt zum Abschnitt zu springen",
    "📜 Der Verlauf zeigt alle besuchten Abschnitte - öffnen Sie ihn über das Menü oben links",
    "🎯 Fokussierte Abschnitte werden hervorgehoben - andere erscheinen transparent",
    "⚡ Templates sparen Zeit: Speichern Sie häufig genutzte Export-Konfigurationen",
    "🔖 Taggen Sie wichtige Beweise vor dem Export für fokussierte Reports",
    "🌐 HTML-Reports eignen sich besonders für Chat-Analysen und mehrsprachige Inhalte",
    "💾 Alle Ihre Einstellungen werden lokal im Browser gespeichert"
];

// ===== INITIALISIERUNG NEUE FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Nach den bestehenden Init-Aufrufen einfügen:
    initMenu();
    initNavSidebar();
    initHistoryModal();
    initTipsFooter();
    loadUserPreferences();
});

// ===== MENÜ-FUNKTIONALITÄT =====
function initMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuDropdown = document.getElementById('menu-dropdown');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Menü-Items
    const showHistoryBtn = document.getElementById('show-history-btn');
    const toggleNavBtn = document.getElementById('toggle-nav-sidebar-btn');
    const toggleTipsBtn = document.getElementById('toggle-tips-footer-btn');
    
    if (showHistoryBtn) {
        showHistoryBtn.addEventListener('click', function() {
            openHistoryModal();
            closeMenu();
        });
    }
    
    if (toggleNavBtn) {
        toggleNavBtn.addEventListener('click', function() {
            toggleNavSidebar();
            closeMenu();
        });
    }
    
    if (toggleTipsBtn) {
        toggleTipsBtn.addEventListener('click', function() {
            toggleTipsFooter();
            closeMenu();
        });
    }
    
    // Klick außerhalb schließt Menü
    document.addEventListener('click', function(e) {
        if (menuOpen && !e.target.closest('.top-nav') && !e.target.closest('.menu-dropdown')) {
            closeMenu();
        }
    });
}

function toggleMenu() {
    menuOpen = !menuOpen;
    const menuDropdown = document.getElementById('menu-dropdown');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (menuOpen) {
        menuDropdown.classList.add('open');
        menuDropdown.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
    } else {
        closeMenu();
    }
}

function closeMenu() {
    menuOpen = false;
    const menuDropdown = document.getElementById('menu-dropdown');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (menuDropdown) {
        menuDropdown.classList.remove('open');
        menuDropdown.setAttribute('aria-hidden', 'true');
    }
    
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
    }
}

// ===== NAVIGATION SIDEBAR =====
function initNavSidebar() {
    buildNavigationTree();
    
    const closeBtn = document.getElementById('close-nav-sidebar');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeNavSidebar);
    }
    
    // Update aktive Section bei Scroll
    updateActiveNavItem();
}

function buildNavigationTree() {
    const navTree = document.querySelector('.nav-tree');
    if (!navTree) return;
    
    const sections = document.querySelectorAll('.content-section[data-section]');
    navTree.innerHTML = '';
    
    sections.forEach(section => {
        const sectionId = section.dataset.section;
        const sectionTitle = section.dataset.title || section.querySelector('h2')?.textContent || 'Unbenannt';
        
        const li = document.createElement('li');
        const navItem = document.createElement('div');
        navItem.className = 'nav-item';
        navItem.dataset.section = sectionId;
        
        navItem.innerHTML = `
            <span class="nav-item-icon">▶</span>
            <span class="nav-item-text">${sectionTitle}</span>
        `;
        
        // Einzelklick: Toggle (für zukünftige Unterelemente)
        navItem.addEventListener('click', function(e) {
            if (e.detail === 1) {
                // Einzelklick - für spätere Erweiterung mit Untermenüs
                this.classList.toggle('expanded');
            }
        });
        
        // Doppelklick: Zu Section springen
        navItem.addEventListener('dblclick', function() {
            scrollToSection(sectionId);
            // Mobile: Sidebar schließen nach Navigation
            if (window.innerWidth <= 1024) {
                closeNavSidebar();
            }
        });
        
        li.appendChild(navItem);
        navTree.appendChild(li);
    });
}

function updateActiveNavItem() {
    // Wird vom Intersection Observer aufgerufen
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (currentActiveSection && item.dataset.section === currentActiveSection) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function toggleNavSidebar() {
    navSidebarOpen = !navSidebarOpen;
    const sidebar = document.getElementById('nav-sidebar');
    
    if (navSidebarOpen) {
        sidebar.classList.add('open');
        document.body.classList.add('nav-sidebar-open');
    } else {
        closeNavSidebar();
    }
    
    saveUserPreferences();
}

function closeNavSidebar() {
    navSidebarOpen = false;
    const sidebar = document.getElementById('nav-sidebar');
    sidebar.classList.remove('open');
    document.body.classList.remove('nav-sidebar-open');
    saveUserPreferences();
}

function scrollToSection(sectionId) {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ===== VERLAUFSFENSTER =====
function initHistoryModal() {
    const closeBtn = document.getElementById('close-history-modal');
    const timeFormatToggle = document.getElementById('time-format-toggle');
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    const modal = document.getElementById('history-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeHistoryModal);
    }
    
    if (timeFormatToggle) {
        timeFormatToggle.addEventListener('click', toggleTimeFormat);
    }
    
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', clearHistory);
    }
    
    // ESC schließt Modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && historyModalOpen) {
            closeHistoryModal();
        }
    });
    
    // Klick auf Overlay schließt Modal
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeHistoryModal();
            }
        });
    }
    
    // Verlauf aus localStorage laden
    loadHistoryFromStorage();
}

function openHistoryModal() {
    historyModalOpen = true;
    const modal = document.getElementById('history-modal');
    
    if (modal) {
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        updateHistoryDisplay();
    }
}

function closeHistoryModal() {
    historyModalOpen = false;
    const modal = document.getElementById('history-modal');
    
    if (modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
    }
}

function addToHistory(sectionId, sectionTitle) {
    // Verhindere doppelte aufeinanderfolgende Einträge
    if (sectionHistory.length > 0) {
        const lastEntry = sectionHistory[sectionHistory.length - 1];
        if (lastEntry.sectionId === sectionId) {
            return;
        }
    }
    
    const entry = {
        sectionId: sectionId,
        sectionTitle: sectionTitle,
        timestamp: Date.now()
    };
    
    sectionHistory.push(entry);
    
    // Maximal 50 Einträge behalten
    if (sectionHistory.length > 50) {
        sectionHistory.shift();
    }
    
    saveHistoryToStorage();
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('history-list');
    const historyEmpty = document.getElementById('history-empty');
    
    if (!historyList || !historyEmpty) return;
    
    if (sectionHistory.length === 0) {
        historyList.style.display = 'none';
        historyEmpty.style.display = 'block';
        return;
    }
    
    historyList.style.display = 'block';
    historyEmpty.style.display = 'none';
    historyList.innerHTML = '';
    
    // Rückwärts durchlaufen (neueste zuerst)
    for (let i = sectionHistory.length - 1; i >= 0; i--) {
        const entry = sectionHistory[i];
        const li = document.createElement('li');
        li.className = 'history-item';
        li.dataset.section = entry.sectionId;
        
        const timeStr = timeFormatRelative 
            ? getRelativeTime(entry.timestamp)
            : getAbsoluteTime(entry.timestamp);
        
        li.innerHTML = `
            <div class="history-item-title">${entry.sectionTitle}</div>
            <div class="history-item-time">${timeStr}</div>
        `;
        
        li.addEventListener('click', function() {
            scrollToSection(entry.sectionId);
            closeHistoryModal();
        });
        
        historyList.appendChild(li);
    }
}

function toggleTimeFormat() {
    timeFormatRelative = !timeFormatRelative;
    const toggleBtn = document.getElementById('time-format-toggle');
    const toggleText = document.getElementById('time-format-text');
    
    if (toggleText) {
        toggleText.textContent = timeFormatRelative ? 'Relativ' : 'Absolut';
    }
    
    updateHistoryDisplay();
    saveUserPreferences();
}

function getRelativeTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) {
        return 'vor wenigen Sekunden';
    } else if (minutes < 60) {
        return `vor ${minutes} Minute${minutes !== 1 ? 'n' : ''}`;
    } else if (hours < 24) {
        return `vor ${hours} Stunde${hours !== 1 ? 'n' : ''}`;
    } else {
        return `vor ${days} Tag${days !== 1 ? 'en' : ''}`;
    }
}

function getAbsoluteTime(timestamp) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

function clearHistory() {
    if (confirm('Möchten Sie wirklich den gesamten Verlauf löschen?')) {
        sectionHistory = [];
        saveHistoryToStorage();
        updateHistoryDisplay();
    }
}

function saveHistoryToStorage() {
    try {
        localStorage.setItem('axiom-guide-history', JSON.stringify(sectionHistory));
    } catch (e) {
        console.error('Fehler beim Speichern des Verlaufs:', e);
    }
}

function loadHistoryFromStorage() {
    try {
        const saved = localStorage.getItem('axiom-guide-history');
        if (saved) {
            sectionHistory = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Fehler beim Laden des Verlaufs:', e);
    }
}

// ===== TIPPS-FOOTER =====
function initTipsFooter() {
    const closeBtn = document.getElementById('close-tips-footer');
    const showBtn = document.getElementById('show-tips-footer-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideTipsFooter();
        });
    }
    
    if (showBtn) {
        showBtn.addEventListener('click', function() {
            showTipsFooter();
        });
    }
    
    // Ersten Tipp anzeigen und Timer starten
    showNextTip();
    startTipRotation();
}

function showNextTip() {
    const tipsText = document.getElementById('tips-text');
    
    if (tipsText && tips.length > 0) {
        tipsText.textContent = tips[currentTipIndex];
        currentTipIndex = (currentTipIndex + 1) % tips.length;
    }
}

function startTipRotation() {
    // Alle 15 Sekunden neuen Tipp anzeigen
    tipInterval = setInterval(showNextTip, 15000);
}

function stopTipRotation() {
    if (tipInterval) {
        clearInterval(tipInterval);
        tipInterval = null;
    }
}

function hideTipsFooter() {
    tipsVisible = false;
    const tipsFooter = document.getElementById('tips-footer');
    const showBtn = document.getElementById('show-tips-footer-btn');
    
    if (tipsFooter) {
        tipsFooter.classList.add('hidden');
    }
    
    if (showBtn) {
        showBtn.style.display = 'inline-block';
    }
    
    document.body.classList.add('tips-hidden');
    stopTipRotation();
    saveUserPreferences();
}

function showTipsFooter() {
    tipsVisible = true;
    const tipsFooter = document.getElementById('tips-footer');
    const showBtn = document.getElementById('show-tips-footer-btn');
    
    if (tipsFooter) {
        tipsFooter.classList.remove('hidden');
    }
    
    if (showBtn) {
        showBtn.style.display = 'none';
    }
    
    document.body.classList.remove('tips-hidden');
    startTipRotation();
    saveUserPreferences();
}

function toggleTipsFooter() {
    if (tipsVisible) {
        hideTipsFooter();
    } else {
        showTipsFooter();
    }
}

// ===== VERBESSERTER FOKUS-OBSERVER =====
// Diese Funktion ersetzt/erweitert die bestehende initFocusObserver Funktion
function initFocusObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0, 0.1, 0.5, 0.9, 1.0]
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            entry.target.classList.remove('out-of-focus');
            
            // Aktive Section tracken
            const sectionId = entry.target.dataset.section;
            const sectionTitle = entry.target.dataset.title || 
                               entry.target.querySelector('h2')?.textContent || 
                               'Unbenannt';
            
            if (sectionId && sectionId !== currentActiveSection) {
                currentActiveSection = sectionId;
                updateActiveNavItem();
                
                // Zum Verlauf hinzufügen wenn Section mindestens 50% sichtbar
                if (entry.intersectionRatio > 0.5) {
                    addToHistory(sectionId, sectionTitle);
                }
            }
        } else {
            entry.target.classList.add('out-of-focus');
        }
    });
}

// ===== BENUTZER-PRÄFERENZEN SPEICHERN/LADEN =====
function saveUserPreferences() {
    const preferences = {
        navSidebarOpen: navSidebarOpen,
        tipsVisible: tipsVisible,
        timeFormatRelative: timeFormatRelative,
        detailLevel: currentLevel
    };
    
    try {
        localStorage.setItem('axiom-guide-preferences', JSON.stringify(preferences));
    } catch (e) {
        console.error('Fehler beim Speichern der Einstellungen:', e);
    }
}

function loadUserPreferences() {
    try {
        const saved = localStorage.getItem('axiom-guide-preferences');
        if (saved) {
            const preferences = JSON.parse(saved);
            
            // Navigation Sidebar Status wiederherstellen
            if (preferences.navSidebarOpen) {
                toggleNavSidebar();
            }
            
            // Tipps Footer Status wiederherstellen
            if (preferences.tipsVisible === false) {
                hideTipsFooter();
            }
            
            // Zeitformat wiederherstellen
            if (preferences.timeFormatRelative !== undefined) {
                timeFormatRelative = preferences.timeFormatRelative;
                const toggleText = document.getElementById('time-format-text');
                if (toggleText) {
                    toggleText.textContent = timeFormatRelative ? 'Relativ' : 'Absolut';
                }
            }
            
            // Detailgrad wiederherstellen
            if (preferences.detailLevel) {
                setDetailLevel(preferences.detailLevel);
            }
        }
    } catch (e) {
        console.error('Fehler beim Laden der Einstellungen:', e);
    }
}

// ===== AKTUALISIERTE EXPORT-FUNKTIONEN =====
// Erweitere das bestehende window.axiomGuide Objekt
if (window.axiomGuide) {
    Object.assign(window.axiomGuide, {
        toggleMenu: toggleMenu,
        toggleNavSidebar: toggleNavSidebar,
        openHistoryModal: openHistoryModal,
        toggleTipsFooter: toggleTipsFooter,
        scrollToSection: scrollToSection
    });
} else {
    window.axiomGuide = {
        setDetailLevel: setDetailLevel,
        toggleNotes: toggleNotes,
        scrollToElement: scrollToElement,
        toggleMenu: toggleMenu,
        toggleNavSidebar: toggleNavSidebar,
        openHistoryModal: openHistoryModal,
        toggleTipsFooter: toggleTipsFooter,
        scrollToSection: scrollToSection
    };
}

// ===== ÄNDERUNG 1: 3-Sekunden Timer für Verlauf =====
// Ersetzen Sie die bestehenden Variablen am Anfang der Datei:

let sectionFocusTimer = null; // NEU: Timer für 3-Sekunden-Regel
let sectionFocusStartTime = null; // NEU: Zeitpunkt des Focus-Starts

// ===== ÄNDERUNG 2: Erweiterte handleIntersection Funktion =====
// Ersetzen Sie die bestehende handleIntersection Funktion komplett:

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            entry.target.classList.remove('out-of-focus');
            
            // Aktive Section tracken
            const sectionId = entry.target.dataset.section;
            const sectionTitle = entry.target.dataset.title || 
                               entry.target.querySelector('h2')?.textContent || 
                               'Unbenannt';
            
            if (sectionId && sectionId !== currentActiveSection) {
                // Vorherigen Timer abbrechen
                if (sectionFocusTimer) {
                    clearTimeout(sectionFocusTimer);
                    sectionFocusTimer = null;
                }
                
                currentActiveSection = sectionId;
                sectionFocusStartTime = Date.now();
                updateActiveNavItem();
                updateBreadcrumb(sectionTitle); // NEU: Breadcrumb aktualisieren
                
                // Timer starten: Nach 3 Sekunden zum Verlauf hinzufügen
                if (entry.intersectionRatio > 0.5) {
                    sectionFocusTimer = setTimeout(function() {
                        addToHistory(sectionId, sectionTitle);
                        sectionFocusTimer = null;
                    }, 3000); // 3 Sekunden
                }
            }
        } else {
            entry.target.classList.add('out-of-focus');
            
            // Wenn Section den Fokus verliert, Timer abbrechen
            const sectionId = entry.target.dataset.section;
            if (sectionId === currentActiveSection && sectionFocusTimer) {
                clearTimeout(sectionFocusTimer);
                sectionFocusTimer = null;
            }
        }
    });
}

// ===== ÄNDERUNG 3: Tipp-Navigation Buttons =====
// Fügen Sie diese Funktionen nach den bestehenden Tips-Funktionen ein:

function showPreviousTip() {
    // Index zurück (mit Wrap-Around)
    currentTipIndex = (currentTipIndex - 1 + tips.length) % tips.length;
    showCurrentTip();
    
    // Timer neu starten
    resetTipRotation();
}

function showNextTipManual() {
    // Nutzt die bestehende showNextTip Funktion
    showNextTip();
    
    // Timer neu starten
    resetTipRotation();
}

function showCurrentTip() {
    const tipsText = document.getElementById('tips-text');
    
    if (tipsText && tips.length > 0) {
        tipsText.textContent = tips[currentTipIndex];
    }
}

function resetTipRotation() {
    // Timer stoppen und neu starten
    stopTipRotation();
    startTipRotation();
}

// ===== ÄNDERUNG 4: Erweiterte initTipsFooter Funktion =====
// Ersetzen Sie die bestehende initTipsFooter Funktion:

function initTipsFooter() {
    const closeBtn = document.getElementById('close-tips-footer');
    const showBtn = document.getElementById('show-tips-footer-btn');
    const prevBtn = document.getElementById('tips-prev-btn'); // NEU
    const nextBtn = document.getElementById('tips-next-btn'); // NEU
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideTipsFooter();
        });
    }
    
    if (showBtn) {
        showBtn.addEventListener('click', function() {
            showTipsFooter();
        });
    }
    
    // NEU: Previous Button
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousTip);
    }
    
    // NEU: Next Button
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextTipManual);
    }
    
    // Ersten Tipp anzeigen und Timer starten
    showNextTip();
    startTipRotation();
}

// ===== ÄNDERUNG 5: Breadcrumb-Funktionalität =====
// Fügen Sie diese neue Funktion hinzu:

function updateBreadcrumb(sectionTitle) {
    const breadcrumbCurrent = document.getElementById('breadcrumb-current');
    
    if (breadcrumbCurrent && sectionTitle) {
        breadcrumbCurrent.textContent = sectionTitle;
    }
}

function initBreadcrumb() {
    const breadcrumbHome = document.getElementById('breadcrumb-home');
    
    if (breadcrumbHome) {
        breadcrumbHome.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ===== ÄNDERUNG 6: Erweiterte DOMContentLoaded =====
// Ergänzen Sie in Ihrer bestehenden DOMContentLoaded Funktion:

document.addEventListener('DOMContentLoaded', function() {
    // ... bestehende Init-Aufrufe ...
    initBreadcrumb(); // NEU hinzufügen
});

// ===== ÄNDERUNG: Erweiterte initDetailLevelControls Funktion =====
// ERSETZEN Sie die bestehende initDetailLevelControls Funktion komplett:

function initDetailLevelControls() {
    // Beide Button-Sets unterstützen (alte große + neue mini in Top-Nav)
    const buttons = document.querySelectorAll('.detail-btn, .detail-btn-mini');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const level = parseInt(this.dataset.level);
            setDetailLevel(level);
        });
    });
    
    // Tastatursteuerung: Alt + 1, 2, 3
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key >= '1' && e.key <= '3') {
            e.preventDefault();
            setDetailLevel(parseInt(e.key));
        }
    });
    
    // Initial: Level 1 setzen
    updateDetailVisibility();
}

// ===== ÄNDERUNG: Erweiterte setDetailLevel Funktion =====
// ERSETZEN Sie die bestehende setDetailLevel Funktion komplett:

function setDetailLevel(level) {
    currentLevel = level;
    
    // BEIDE Button-Sets aktualisieren (alte + neue mini)
    const allButtons = document.querySelectorAll('.detail-btn, .detail-btn-mini');
    allButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Aktive Buttons in BEIDEN Sets markieren
    const activeButtons = document.querySelectorAll(
        `.detail-btn[data-level="${level}"], .detail-btn-mini[data-level="${level}"]`
    );
    activeButtons.forEach(btn => {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
    });
    
    // Detailebenen ein-/ausblenden
    updateDetailVisibility();
    
    // Info-Text aktualisieren (falls vorhanden)
    updateInfoText(level);
    
    // Einstellungen speichern
    saveUserPreferences();
    
    // Optional: Smooth scroll zum Anfang des Inhalts
    // (Auskommentieren falls störend beim Wechsel)
    /*
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    */
}

// Die updateInfoText Funktion bleibt unverändert, funktioniert aber nur 
// wenn Sie die optionale detail-info-box im HTML behalten haben
