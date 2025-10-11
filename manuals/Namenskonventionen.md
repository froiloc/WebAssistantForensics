# Namenskonventionen - WebAssistantForensics

## 📋 Einleitung

Dieses Dokument definiert die einheitlichen Namenskonventionen für das WebAssistantForensics-Projekt. Ziel ist die Verbesserung der Code-Konsistenz, Wartbarkeit und Lesbarkeit.

## 🗂️ Projektstruktur

### Verzeichnisnamen

-   **Kebab-Case** für Verzeichnisnamen
    
-   **Beispiele**: `src/js/`, `tools/validation/`, `assets/images/`
    

### Dateinamen

-   **Kebab-Case** für alle Dateinamen
    
-   **JavaScript**: `script-sidebar-manager.js`, `media-handler.js`
    
-   **Python**: `validate_agent_json.py`, `main_content_parser.py`
    
-   **HTML/CSS**: `index.html`, `main-styles.css`
    

## 🔤 JavaScript Namenskonventionen

### Variablen und Konstanten

```javascript

// ✅ Korrekt
const userPreferences = {};
let currentSection = '';
const MAX_RETRY_COUNT = 3;

// ❌ Vermeiden
const userpreferences = {};
let CurrentSection = '';
const max_retry_count = 3;
```
### Funktionen

```javascript

// ✅ Korrekt
function initializeApplication() {}
function handleMediaUpload() {}
function validateUserInput() {}

// ❌ Vermeiden
function initApp() {}
function media_upload() {}
function ValidateInput() {}
```
### Klassen

```javascript

// ✅ Korrekt
class ScriptStateManager {}
class MediaHandler {}
class SidebarManager {}

// ❌ Vermeiden
class scriptStateManager {}
class media_handler {}
class Sidebar_Manager {}
```
### Event-Handler

```javascript

// ✅ Korrekt
function onSectionClick(event) {}
function handlePreferencesSave() {}
function onMediaLoadComplete() {}

// ❌ Vermeiden
function sectionClick(event) {}
function preferences_save() {}
function mediaLoadComplete() {}
```
## 🐍 Python Namenskonventionen

### Funktionen und Variablen

```python

# ✅ Korrekt
def validate_agent_json():
    pass

def parse_main_content():
    pass

max_retry_count = 3

# ❌ Vermeiden
def validateAgentJson():
    pass

def ParseMainContent():
    pass

MAX_RETRY_COUNT = 3
```
### Klassen

```python

# ✅ Korrekt
class ContentParser:
    pass

class ValidationEngine:
    pass

# ❌ Vermeiden
class content_parser:
    pass

class validationEngine:
    pass
```
## 🌐 HTML/CSS Konventionen

### HTML IDs und Klassen

```html

<!-- ✅ Korrekt -->
<div id="main-sidebar" class="navigation-panel active-section">
<button class="btn-primary large-button">

<!-- ❌ Vermeiden -->
<div id="mainSidebar" class="navigationPanel active_section">
<button class="btnPrimary largeButton">
```
### Data-Attribute

```html

<!-- ✅ Korrekt -->
<div data-section-type="forensic" data-agent-id="12345">

<!-- ❌ Vermeiden -->
<div dataSectionType="forensic" data-agentId="12345">
```
## 📁 Datei- und Modulstruktur

### JavaScript Modulorganisation

```text

src/js/
├── script-core.js           # Kernfunktionalität
├── script-state-manager.js  # Zustandsverwaltung
├── script-navigation.js     # Navigation
├── script-preferences.js    # Einstellungen
├── media-handler.js         # Medienverarbeitung
├── script-section-management.js # Abschnittsverwaltung
└── script-sidebar-manager.js    # Sidebar-Management
```
### Python Validierungstools

```text

tools/validation/
├── validate_agent_json.py       # Agent-JSON Validierung
├── validate_agent_links.py      # Link-Validierung
├── validate_html_structure.py   # HTML-Struktur
├── validate_main_structure.py   # Hauptstruktur
└── validate_media.py           # Medien-Validierung
```
## 🔧 Konfiguration und Konstanten

### Konfigurationsdateien

```javascript

// ✅ Korrekt
const DEFAULT_SETTINGS = {
    maxFileSize: 10485760,
    supportedFormats: ['jpg', 'png', 'pdf'],
    theme: 'dark'
};

// ❌ Vermeiden
const defaultSettings = {
    max_file_size: 10485760,
    SupportedFormats: ['jpg', 'png', 'pdf'],
    Theme: 'dark'
};
```
## 📝 Kommentare und Dokumentation

### JavaScript Doc Comments

```javascript

/**
 * Initialisiert die Anwendung und lädt die Benutzereinstellungen
 * @param {Object} config - Konfigurationsobjekt
 * @returns {boolean} Erfolgsstatus
 */
function initializeApplication(config) {
    // Implementation
}
```
### Python Docstrings

```python

def validate_agent_json(file_path):
    """
    Validiert die Struktur der Agent-JSON-Datei
    
    Args:
        file_path (str): Pfad zur JSON-Datei
        
    Returns:
        bool: True wenn Validierung erfolgreich
    """
    pass
```
## 🔍 Best Practices aus bestehendem Code

### Konsistente Präfixe

-   `script-*` für Hauptanwendungsmodule
    
-   `validate_*` für Validierungsfunktionen
    
-   `handle*` für Event-Handler
    
-   `on*` für Event-Listener
    

### Klare Zustandsverwaltung

```javascript

// ✅ Klare Zustandsbezeichnungen
const appState = {
    currentView: 'dashboard',
    isSidebarOpen: true,
    activeAgent: null
};
```
## 🚀 Empfehlungen für zukünftige Entwicklung

1.  **Beibehalten der etablierten Muster**
    
2.  **Regelmäßige Code-Reviews** zur Einhaltung der Konventionen
    
3.  **ESLint/Pylint Konfiguration** zur automatischen Prüfung
    
4.  **Dokumentation neuer Patterns** bei Erweiterungen
    

----------

_Zuletzt aktualisiert: 2025-10-10
Version 0.1_
