This is the consolidated and complete rule set for the JavaScript module architecture, following the exact structure and explicit detail for a comprehensive reference document.

This document, **Version 1.0**, incorporates all architectural, communication, error handling, and best practice requirements. Every rule is defined in a single, complete sentence and referenced in the final, complete example.

---

# 🏗️ Project Module Construction Rules (Version 1.0)

---

## I. Core Architecture & Structure

| **Rule ID** | **Rationale**                                                                                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1.1-1.8** | **Isolation & Clarity:** Prevents global namespace pollution, ensures strict parsing, and clearly separates internal logic from the public API, enhancing encapsulation and maintainability. |

### 1.1 Isolation (IIFE)

**Definitions:**

- Always use an **Immediately Invoked Function Expression (IIFE)** for scope isolation. Scope is the parameter that carries the interface to the outside.

**Example:**

```javascript
// RULE 1.1: Always use an IIFE for scope isolation.
(function(scope) {
    // Module code goes here
    const _global = scope;
})(self);

// BAD: Global scope definition
function MyModule() { /* ... */ } // BAD: Pollutes the global scope
```

### 1.2 Strict Mode

**Definitions:**

- Always include `'use strict'` at the top of the IIFE for safety.

**Example:**

```javascript
// RULE 1.2: Always include 'use strict' for safety.
(function() {
    'use strict'; // GOOD
    // ...
})();

// BAD: Missing strict mode
(function() {
    // 'use strict' is missing BAD
    // ...
})();
```

### 1.3 Identification (`MODULE` Constant)

**Definitions:**

- The module must define a top-level `MODULE` constant for logging identification with an **UPPERCASE**, descriptive value.

**Example:**

```javascript
// RULE 1.3: The module must define a top-level MODULE constant for identification.
const MODULE = 'EXMPL'; // GOOD: UPPERCASE and descriptive
LOG.info('Initialization started');

// BAD: Constant is not uppercase
const module = 'exmpl'; // BAD: Not uppercase
```

### 1.4 Documentation Header

**Definitions:**

- Include a comprehensive file header with the version and features above the IIFE.

**Example:**

```javascript
// RULE 1.4: Include a comprehensive file header with the version and features.
// ============================================================================
// MODULE-NAME
// Brief description of module purpose
//
// Key Features:
// - Feature 1
// - Feature 2  
// - Feature 3
//
// @version X.X.X
// @author Polizeipräsidium Duisburg
// @license MIT
// ============================================================================
```(function() { /* ... */ });
```

### 1.5.1 Private Naming Convention

**Definitions:**

- Names of all private internal variables and methods must have a leading underscore `_`.

**Example:**

```javascript
// RULE 1.5.1: Names of all private internal variables and methods must have a leading underscore '_'.
let _isInitialized = false; // GOOD: Private variable
function _initListeners() { /* ... */ } // GOOD: Private method

// BAD: Private elements without underscore
let isInitialized = false; // BAD: Looks like a public variable
```

### 1.5.2 Public API Naming Convention

**Definitions:**

- Names of the exposed API object attached to `_global` must use **Pascal Case** and start with a **capital letter**. Words are concatenated without spaces, and each word starts with a capital letter. Single words are allowed.

**Example:**

```javascript
// RULE 1.5.2: Names of the exposed API object must use CamelCase and start with a capital letter.
_global.ExampleModule = {/* ... */ } // GOOD: Starts with a capital letter on each word
_global.Setup = { // GOOD: starts with a capital letter
    // ...
};

// BAD: API name starts with a small letter
_global.exampleModule = { /* ... */ }; // BAD: Prohibited
```

### 1.5.3 Internal Naming Convention

**Definitions:**

- Names of internal (non-private, non-API) functions and variables must use **CamelCase** and start with a **small letter**. Words are concatenated without spaces, and each word after the first starts with a capital letter.
- Static strings (describing states) can be UPPERCASE and snake case. Words are separated by underscores '_' and each word is in **lowercase**.
- Names of files use **Kebab Case**, words are separated by hyphens '-' and each word is **lowercase**.
- The only exemptions from these rules are MODULE, LOG and CONFIG.

**Example:**

```javascript
// RULE 1.5.3: Names of internal functions/variables must use CamelCase and start with a small letter.
const myVariable = 0; // GOOD: Starts small, uses CamelCase
function getMyValue() { /* ... */ } // GOOD: Starts small, uses CamelCase

// BAD: Uses UPPERCASE and snake case
let MY_VARIABLE = 0; // BAD: Prohibited (Reserved for constants like MODULE)

// BAD: Starts with a capital letter
function GetMyValue() { /* ... */ } // BAD: Prohibited (no Pascal Case)

// GOOD: reference a picture file
const imageSrc = 'menu-selected-annotated.png';
```

### 1.5.4 Comment Convention

**Definitions:**

- Comments are either on top of the commented line or follow within the line after the command.
- Descriptive text must start with a capital letter, digit or special character.
- Comment do not require a period at the end

**Example:**

```javascript
// RULE 1.5.4: Comments must start with a capital letter and have no period.
// This is a GOOD way to describe an if clause
if (a == b) { /*...*/ }

const myVariable = 0; // GOOD: Comment in the same line

// this is BAD because it starts with a lowercase letter BAD
// BAD: You should not use a period at the end. BAD
```

### 1.6 Code Separation (Headers)

**Definitions:**

- Separate code into logical sections (e.g., STATE, CONFIG, PRIVATE METHODS) using standardized bar-comments (`// ============`).

**Example:**

```javascript
// RULE 1.6: Separate code into logical sections using standardized bar-comments.
// ========================================================================
// PRIVATE METHODS
// ========================================================================
function _privateMethod() { /* ... */ }

// BAD: Inconsistent or missing separation
// Private Methods // BAD: Not the standard format
```

### 1.7 Public/Private Separation

**Definitions:**

- Maintain a clear separation of private methods (`_privateMethod`) and public API methods within the module's structure.

**Example:**

```javascript
// RULE 1.7: Maintain a clear separation of private methods and public API methods.
// PUBLIC API structure:
_global.ExampleModule = { 
    init: init, // GOOD: Public API method
    // ...
    _privateFn: _privateMethod // BAD: Private methods must not be in the public API
};
```

### 1.8 Indent

**Definitions:**

- The indent for sub structure is 4 spaces. No tabs allowed.

**Example:**

```javascript
// RULE 1.8: Indent it 4 spaces.
function a { 
    let a; // GOOD: 4 spaces
    if (a == a) {
        a = 1; // GOOD: 4 spaces more for substructure
  } else { // BAD: less than 4 spaces used as indent
        a = 0;
       } // BAD: more than 4 spaces used as indent
};
```

---

## II. Configuration & Standards

| **Rule ID** | **Rationale**                                                                                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **2.1-2.5** | **Single Point of Truth:** Centralizes all configurable values, standardizes selectors, and mandates localization, making the module flexible, robust, and easily maintainable. |

### 2.1 Configuration Centralization

**Definitions:**

- Centralize all module defaults, strings, classes, and templates in a comprehensive **`CONFIG`** object.
- The CONFIG object may be composed in steps but must be completed before any functional or variable part of the module.

**Example:**

```javascript
// RULE 2.1: Centralize all module defaults, strings, classes, and templates in a comprehensive CONFIG object.
const CONFIG = { // GOOD
    settings: {
      defaultTimeout: 5000
    },
    classes: { /* ... */ }
};

// BAD: Hard-coded values scattered throughout the code
const timeout = 5000; // BAD: Should be in CONFIG
```

### 2.2 Configuration Scope

**Definitions:**

- The `CONFIG` object must explicitly include sections for `classes`, `selectors`, and `i18n`. It may contain `settings`, `templates`, `constants` and other sections.
  - **classes**: contains all CSS classes introduced or used by the module
  - **selectors**: contains all CSS slectors to elements used by the module
  - **i18n**: contains language objects ISO 639-1 that contain translated strings directed to the user. Must contain `de`.
  - **settings:** contains settings used in the module.
  - **templates**: contains HTML snippets that are dynamically added. Mandatory if dynamic HTML is used.
  - **constants**: contains constants or arrays of constants to be exposed via the API.
- The sections may be defined separately but must be defined before any functional or variable part of the module.

**Example:**

```javascript
// RULE 2.2: CONFIG must include sections for classes, selectors, templates, and i18n.
const CONFIG = {
    classes: { active: 'is-active' }, // GOOD
    selectors: { container: '#id' }, // GOOD
    i18n: { de: { /* ... */ } }, // GOOD
    settings: {shortcut1: 'Enter' }, // GOOD, optional
    templates: { widget: '<div>...</div>' }, // GOOD
    constants: { // GOOD, optional
        events: {
            STATE_CHANGED: 'moduleStateChanged', // GOOD, UPPERCASE Snake Case
            DATA_LOADED: 'moduleDataLoaded',
            ERROR: 'moduleError'
        }
    } 
};
```

### 2.3 Single Point of Truth

**Definitions:**

- Constant numbers or strings in any function body are prohibited; only references to the `CONFIG` object are allowed.
- The only exceptions are if a string or value is a strong logical requirement and therefore cannot be the subject of any alteration.
- CONFIG.selectors may contain static/constant strings! Selector definitions must not be placed in CONFIG.constants.

**Example:**

```javascript
// RULE 2.3: Only references to CONFIG are allowed; no constant strings/numbers in functions.
// GOOD: exception because of strong logical requirement, other events could not be used here
_toastContainer.removeEventListener('keydown', _keydownListener); 
// GOOD: exception, there is a strong requirement to set role to 'alert' in case of an error message.
note.setAttribute('role', validatedToastType === CONFIG.types.error ? 'alert' : 'status');

// GOOD: Keyboard navigation uses CONFIG
if (event.key === CONFIG.settings.shortcutEscape) {
    // Handle dismissal
}

// BAD: Hard-coded string/number used in logic
if (event.key === 'Escape') { // BAD: Use CONFIG.settings.shortcutEscape
    // Handle dismissal
}
```

### 2.4 Selector Override

**Definitions:**

- Any manually defined selector in `CONFIG.selectors` may override the automatically generated one or add a new one.

**Example:**

```javascript
// RULE 2.4: Manual selectors in CONFIG.selectors may override automatically generated ones or add a new one.
const CONFIG = {
    classes: { container: 'ex-container' }, // Auto: .ex-container
}
// Generate selectors ← THIS PART MUST BE INCLUDED 
//  after CONFIG.classes has been defined and 
//  before manually adding or changing CONFIG.selectors
    CONFIG.selectors = Object.keys(CONFIG.classes).reduce((acc, key) => {
        if (typeof CONFIG.classes[key] === 'string') {
            acc[key] = `.${CONFIG.classes[key]}`;
        } else if (typeof CONFIG.classes[key] === 'function') {
            acc[key] = (param) => `.${CONFIG.classes[key](param)}`;
        }
        return acc;
    }, {});

// Add or change selectors
CONFIG.selectors: { ...CONFIG.selectors, // Use the existing selectors and extend by the following ones
    container: '#custom-container-id' } // GOOD: Manual ID overrides class selector
};
```

### 2.5 Internationalization (i18n Helper)

**Definitions:**

- An internal helper function, such as `_t(key)`, must be used to retrieve localized strings from `CONFIG.i18n` based on the current document language, with a defined fallback.

**Example:**

```javascript
// RULE 2.5: Use an internal helper function (like _t) for i18n lookup with a fallback.
function _t(key) { // GOOD: Helper function setup
    const lang = document.documentElement.lang || 'de'; // Default language is German
    return CONFIG.i18n[lang]?.[key] || key;
}

// BAD: Language logic scattered
const lang = document.documentElement.lang || 'de'; // BAD: Logic belongs in the helper
```

---

## III. Event, Triggers & Communication

| **Rule ID** | **Rationale**                                                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **3.1-3.5** | **Decoupling & Reliability:** Implements a robust internal and external communication pattern, allowing modules to interact without tight coupling and ensuring consistent execution flow. |

- These rules only apply to stateful modules.

### 3.1 Internal Event System Initialization

**Definitions:**

- An internal event system, typically using `EventTarget` and exposed via the Public API, must be initialized during the loading of the module and before initializtation to allow for listening to the event IS_INITIALIZED.

**Example:**

```javascript
// RULE 3.1: An internal event system must be initialized at module load.
// This function must be called in the _loaded() method.
function _initEventSystem() { // GOOD
    _eventTarget = new EventTarget();
}


function _loaded() {
    _initEventSystem();
}
```

### 3.2 Event System Dispatch

**Definitions:**

- A `dispatchModuleEvent` function must be provided to dispatch internal `CustomEvent`s, including type validation, a `detail` object with at least a `timestamp`, a bubbles and a cancelable flag.

**Example:**

```javascript
// RULE 3.2: Dispatch function must validate type and include timestamp in CustomEvent detail.
// Event system for module communication
// Prerequisite constants (assuming CONFIG.constants.events is defined per Rule 2.2)
/*
CONFIG.constants.events = {
    STATE_CHANGED: 'MODULE_STATE_CHANGED',
    // ...
};
let _eventTarget;
*/

function _initEventSystem() {
    _eventTarget = new EventTarget();
    LOG.debug('Event system initialized');
}

function dispatchModuleEvent(eventType, detail = {}) {
    if (!_eventTarget) {
        LOG.error(`Event system not initialized - cannot dispatch: ${eventType}`);
        return false;
    }

    if (!Object.values(CONFIG.constants.events).includes(eventType)) {
        LOG.error(`Invalid event type: ${eventType}`);
        return false;
    }

    const event = new CustomEvent(eventType, {
        detail: {
            timestamp: Date.now(), // GOOD: Includes timestamp
            ...detail
        },
        bubbles: true,    // GOOD: Required flag
        cancelable: true  // GOOD: Required flag
    });

    LOG.debug(`📢 Dispatching event: ${eventType}`, detail);
    return _eventTarget.dispatchEvent(event);
}

function addEventListener(eventType, callback, options) {
    if (!_eventTarget) {
        LOG.error(`Event system not initialized - cannot listen to: ${eventType}`);
        return;
    }

    _eventTarget.addEventListener(eventType, callback, options);
    LOG.debug(`👂 Event listener added for: ${eventType}`);
}

function removeEventListener(eventType, callback, options) {
    if (!_eventTarget) return;
    _eventTarget.removeEventListener(eventType, callback, options);
    LOG.debug(`🔇 Event listener removed for: ${eventType}`);
}
```

### 3.3 Event System Subscription

**Definitions:**

- Public `addEventListener` and `removeEventListener` methods must be provided to allow other modules to subscribe to internal events using the internal event system.
- Expose the events that are subscribable via the API.

**Example:**

```javascript
/// RULE 3.3: Public addEventListener and removeEventListener methods must be provided.

function addEventListener(eventType, callback, options) {
    if (!_eventTarget) {
        LOG.error('Event system not initialized - cannot listen to:', { eventType: eventType });
        return;
    }
    _eventTarget.addEventListener(eventType, callback, options);
    LOG.debug('👂 Event listener added for:', { eventType: eventType });
}

function removeEventListener(eventType, callback, options) {
    if (!_eventTarget) return;
    _eventTarget.removeEventListener(eventType, callback, options);
    LOG.debug('🔇 Event listener removed for:', { eventType: eventType });
}

_global.ExampleModule = {
    // ...
    addEventListener: addEventListener, // GOOD
    removeEventListener: removeEventListener // GOOD
    EVENT_TYPES: () => CONFIG.constants.events // GOOD, expose the possible events to subscribe
    _debug: {
        dispatchModuleEvent: dispatchModuleEvent
    }
};
```

### 3.4 External Event Subscription

**Definitions:**

- External event subscriptions (e.g., to other modules or `_global. events) must be tracked using an array of unsubscribe functions, which must be executed during `destroy()`.

**Example:**

```javascript
// RULE 3.4: External subscriptions must be tracked for mass-unsubscription.
function _subscribeToExternalEvents() {
    // GOOD: Define an anonymous function to handle the event
    function _handleExternalEvent(event) {
        LOG.debug('External event received:', { type: event.type });
    }

    // GOOD: Define a closure that performs the cleanup
    const unsubscribe = () => {
        _global.removeEventListener('externalEvent', _handleExternalEvent);
    };

    _global.addEventListener('externalEvent', _handleExternalEvent);
    _unsubscribeFunctions.push(unsubscribe); // GOOD: Tracks the function for destroy()
}
```

### 3.5 Idempotency

**Definitions:**

- All public methods, especially `init()` and `destroy()`, must be **idempotent**, ensuring the module remains in a consistent state even if called multiple times.

**Example:**

```javascript
// RULE 3.5: All public methods must be idempotent.
/*
let _isInitialized = false;
*/

function init() {
    if (_isInitialized) {
        LOG.warn('Already initialized');
        return false;
    }

    if (!_checkDependencies()) {
        return false;
    }

    try {
        _initEventSystem();
        _setupDOM();
        _initEventHandlers();
        _loadPreferences();

        // Subscribe to external events
        _subscribeToExternalEvents();

        _isInitialized = true;
        LOG.info('Initialized successfully');
        return true;
    } catch (error) {
        LOG.error('Initialization failed:', error);
        return false;
    }
}

function destroy() {
    if (!_isInitialized) {
        LOG.warn('Not initialized, skipping destroy.');
        return false;
    }

    try {
        _isInitialized = false; // mark as not initialized before destruction

        _cleanupEventListeners();

        // Unsubscribe from external events
        _unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
        _unsubscribeFunctions = [];

        _resetDOM();
        _clearState();

        delete _global.ModuleName; // remove the API

        LOG.info('Destroyed successfully');
        return true;
    } catch (error) {
        LOG.error('Destruction failed:', error);
        return false;
    }
}

// BAD: Non-idempotent init
function init() {
    // Will run multiple times if called again, attaching listeners twice ❌
}
```

---

### IV. Safety & Error Handling

| **Rule ID** | **Rationale**                                                                                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **4.1-4.8** | **Robustness & Predictability:** Guarantees reliable operation by handling expected failures (dependencies, I/O) gracefully, preventing XSS, and ensuring that functions always return expected data types. |

### 4.1 Dependency Check

**Definitions:**

- Check critical dependencies (e.g., `_global.LOG`) immediately upon execution.

**Example:**

```javascript
// RULE 4.1: Check critical dependencies immediately upon execution.
// GOOD: Perform this check at the very start of the IIFE.
if (typeof _global.LOG === 'undefined') { 
    // ... proceed to Rules 4.2 and 4.3 ...
    return;
}
```

### 4.2 Logging Fallback

**Definitions:**

- Use `console.error` as a fallback if the logging system is unavailable.

**Example:**

```javascript
// RULE 4.2: Use console.error as a fallback if the logging system is unavailable.
if (typeof _global.LOG === 'undefined') { 
    // RULE 1.3: Use the MODULE constant for context.
    console.error(`EXMPL: LOG system required`); // GOOD
    return;
}
```

### 4.3 Module Disablement

**Definitions:**

- Return early to disable the module if a critical dependency check fails.

**Example:**

```javascript
// RULE 4.3: Return early to disable the module if a critical dependency check fails.
if (typeof _global.LOG === 'undefined') { 
    console.error(`EXMPL: LOG system required`); 
    return; // GOOD: Immediately exits the IIFE
}
```

### 4.4 XSS Prevention (Escape)

**Definitions:**

- Implement Cross-Site Scripting (XSS) prevention for all dynamic content by escaping user-provided strings (e.g., message content).

**Example:**

```javascript
// RULE 4.4: Implement XSS prevention by escaping user-provided strings.

// Assuming a helper function exists:
// Always escape dynamic content
function _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

const rawInput = event.detail.message;
const escapedContent = _escapeHtml(rawInput); // GOOD: Escaping is necessary

// BAD: Direct use of user input
element.innerHTML = rawInput; // BAD: Prone to XSS
```

### 4.5 XSS Prevention (`textContent`)

**Definitions:**

- Prefer using `textContent` over `innerHTML` where possible for rendering dynamic user-provided content.

**Example:**

```javascript
// RULE 4.5: Prefer using textContent over innerHTML where possible.
// Using escaped content from Rule 4.4
element.textContent = escapedContent; // GOOD: Safe and simple

// BAD: Should be avoided for user content
element.innerHTML = `<span>${escapedContent}</span>`; // BAD: Use textContent for safety
```

### 4.6 Error Handling (Try/Catch Pattern)

**Definitions:**

- For operations that might fail (e.g., API calls, complex logic), use a `try...catch` block to log the failure and prevent function termination.

**Example:**

```javascript
// RULE 4.6: Use try...catch for operations that might fail.
function riskyOperation() {
    try {
        // Operation that might fail
        const result = _global.externalApi.fetchData(); 
        return true; // GOOD
    } catch (error) {
        // RULE 5.2: Always log errors with the MODULE constant and context.
        LOG.error('Operation failed:', error); 
        return false;
    }
}
```

### 4.7 Individual Element Error Handling

**Definitions:**

- For iterative DOM operations, use individual `try...catch` blocks within loops to prevent a single element failure from stopping the entire loop.

**Example:**

```javascript
// RULE 4.7: Use individual try...catch blocks for iterative DOM operations.
elements.forEach(element => {
    try {
        // GOOD: Isolated operation to prevent one failure from stopping the loop
        element.classList.add(CONFIG.classes.highlight); 
    } catch (elementError) {
        // RULE 5.2: Use LOG.warn to alert the failure but continue execution.
        LOG.warn('Element operation failed, skipping element:', elementError); 
    }
});
```

### 4.8 Return Consistency

**Definitions:**

- Functions with error handling must always return consistent types (e.g., `true`/`false`, or a specific object/`null`) in both success and failure paths.

**Example:**

```javascript
// RULE 4.8: Functions must always return consistent types.
function loadData() {
    try {
        // Success
        const data = JSON.parse(localStorage.getItem('myKey'));
        return { data: data }; // GOOD: Returns object
    } catch (error) {
        // Failure
        LOG.error('Data loading failed', error);
        return null; // GOOD: Returns null (consistent type: object or null)
    }
}
```

---

## V. Language & Logging Standards

| **Rule ID** | **Rationale**                                                                                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **5.1-5.3** | **Communication Consistency:** Standardizes internal communication in English, enforces comprehensive logging practices across all four levels, and ensures all user-facing content is localized. |

### 5.1 Technical Language

**Definitions:**

- All internal technical content (comments, private variable names, logs, and error messages) must be in English.

**Example:**

```javascript
// RULE 5.1: All internal technical content must be in English.

// GOOD: Use English for variables, logs, and comments.
let _isInitialized = false; // Tracks the module state
LOG.debug('Listener initialized');

// BAD: Non-English technical content.
let _istInitialisiert = false; // BAD: Verfolgt den Modulzustand
LOG.debug('Zuhörer initialisiert'); // BAD: Logs must be in English
```

### 5.2 Logging Functions

**Definitions:**

- Utilize all four defined logging functions (`LOG.info`, `LOG.debug`, `LOG.error`, and `LOG.warn`), and support a second parameter for providing context via an object.

**Example:**

```javascript
// RULE 5.2: Use all four log levels and support a third context object parameter.
    // This creates a local LOG object that automatically prepends MODULE
    const LOG = {
      debug: (message, ...data) => _global.LOG.debug(MODULE, message, ...data),
      info: (message, ...data) => _global.LOG.info(MODULE, message, ...data),
      warn: (message, ...data) => _global.LOG.warn(MODULE, message, ...data),
      error: (message, ...data) => _global.LOG.error(MODULE, message, ...data)
    };

// GOOD: Always use the structured LOG functions with MODULE and context object.
LOG.debug('Detailed debug information', objectUnderTest); // GOOD: debug with object
LOG.info('General initialization message');
LOG.warn('Warning message: deprecated API used', { apiName: 'oldApi' });
LOG.error('Error message with context:', errorObject); // GOOD: error with object

// BAD: Do not use direct console logs or miss the MODULE constant.
console.log('Status update'); // BAD: Use LOG.info
```

### 5.3 User Content (i18n)

**Definitions:**

- All messages addressed to the end-user must be loaded via the Internationalization (`i18n`) approach defined in `CONFIG`.

**Example:**

```javascript
// RULE 5.3: All messages addressed to the end-user must be loaded via the i18n approach.
// Helper function _t() is defined in RULE 2.5
// GOOD: Uses i18n helper function for all user-visible text.
element.textContent = _t('welcomeMessage');
element.setAttribute('aria-label', _t('closeButton')); // GOOD: Applies to ARIA attributes

// BAD: Hardcoding user-facing strings.
element.textContent = 'Willkommen'; // BAD: Hardcoded string
element.setAttribute('aria-label', 'Schließen'); // BAD: Hardcoded ARIA attribute
```

---

## VI. UI, Styling & Accessibility

| **Rule ID** | **Rationale**                                                                                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **6.1-6.6** | **Separation of Concerns & Inclusivity:** Ensures maintainability by separating presentation from behavior and guarantees WCAG compliance for an inclusive user experience. |

### 6.1 Styling Strategy

**Definitions:**

- All visual styling must reside in **CSS** to follow the Separation of Concerns principle. JavaScript should never contain styling properties (e.g., `element.style.color = 'red'`).

**Example:**

```javascript
// RULE 6.1: All visual styling must reside in CSS.
// GOOD: The style manipulation is delegated to CSS via class manipulation (Rule 6.2/6.3).
element.classList.add(CONFIG.classes.isActive); 

// BAD: Prohibited direct style manipulation.
element.style.opacity = 1; // BAD: Prohibited
```

### 6.2 JS Role

**Definitions:**

- JavaScript's role is strictly limited to toggling state classes, managing behavior, and handling data. It must not manipulate presentation outside of class assignments.

**Example:**

```javascript
// RULE 6.2: JavaScript's role is strictly limited to toggling state classes.
// GOOD: Toggling state class.
element.classList.toggle(CONFIG.classes.hidden); 

// BAD: JavaScript manages calculated styling based on state.
if (_currentState === 'active') {
    element.style.height = '100px'; // BAD: CSS should define height based on a class.
}
```

### 6.3 State Classes

**Definitions:**

- Use single, clear **state classes** (e.g., `.is-active`, `.has-error`) to manage states and override default element behavior. All associated visual rules for that state must be contained within the single class definition in CSS.

**Example:**

```javascript
// RULE 6.3: Use single, clear state classes.
// GOOD: A single class controls all style changes for the error state.
element.classList.add(CONFIG.classes.hasError); 

// BAD: Toggling multiple classes for a single state change.
element.classList.add('error-border'); // BAD: Use a single state class like 'has-error'
element.classList.add('error-text-color');
```

### 6.4 Event Handling & Delegation

**Definitions:**

- Utilize **Event Delegation** whenever possible on a container element to reduce the number of event listeners and bind to keyboard events. This is done for performance.

**Example:**

```javascript
// RULE 6.4: Use Event Delegation on a container for click and keyboard events.
function _initEventDelegation() {
    // Assuming _containerElement is a reference to the main module container
    _containerElement.addEventListener('click', _handleEventDelegation); // GOOD: Click delegation
    _containerElement.addEventListener('keydown', _handleKeyboardEvents); // GOOD: Keyboard delegation
}

// BAD: Adding listeners to many individual elements.
document.querySelectorAll(CONFIG.selectors.button).forEach(btn => {
    btn.addEventListener('click', handler); // BAD: High memory overhead; use delegation.
});
```

### 6.5 Accessibility (WCAG Keyboard)

**Definitions:**

- Ensure **WCAG compliance** by implementing keyboard support using `CONFIG` references (e.g., Enter/Space for activation, Escape key for dismissal).

**Example:**

```javascript
// RULE 6.5: Ensure WCAG compliance by implementing keyboard support using CONFIG references.
function _handleKeyboardEvents(event) {
    // RULE 2.3: Use CONFIG for all constant strings (e.g., key names).
    if (event.key === CONFIG.settings.shortcutEnter || event.key === CONFIG.settings.shortcutSpace) {
        event.preventDefault();
        // GOOD: Handles activation for Enter and Space (WCAG).
    }

    if (event.key === CONFIG.settings.shortcutEscape) {
        event.preventDefault();
        // GOOD: Handles dismissal for Escape key (WCAG).
    }
}
```

### 6.6 Accessibility (ARIA)

**Definitions:**

- Utilize correct **ARIA attributes** (`role`, `aria-live`, `aria-label`, etc.) for accessibility compliance, loading any user-facing ARIA text via the i18n helper (`_t()`).
- Values for aria-label shall not have more than 150 characters

**Example:**

```javascript
// RULE 6.6: Utilize correct ARIA attributes.
function _setupAria() {
    const container = document.querySelector(CONFIG.selectors.container);
    const button = document.querySelector(CONFIG.selectors.interactiveButton);

    // GOOD: Setting a required ARIA role.
    container.setAttribute('role', 'alertdialog'); 

    // GOOD: Setting i18n-enabled ARIA label (Rule 5.3).
    button.setAttribute('aria-label', getText('closeButtonLabel')); 
}

// BAD: Using non-standard or incorrect attributes.
container.setAttribute('accessible', true); // BAD: Not a valid ARIA attribute
```

---

## VII. Performance & Maintenance

| **Rule ID** | **Rationale**                                                                                                                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **7.1-7.5** | **Documentation & Debugging:** Provides comprehensive documentation for clarity, exposes a structured internal view for easier debugging, and ensures the core state variable is properly utilized. |

### 7.1 JSDoc (Parameters)

**Definitions:**

- All functions must have **comprehensive JSDoc** documentation, including parameters with types and descriptions, and demonstration of a default parameter value.

**Example:**

```javascript
// RULE 7.1: JSDoc must include parameters, types, and a default value demonstration.
/**
 * Processes an input value and executes a callback after a timeout.
 * @param {string} input - The string to process.
 * @param {number} [timeout=500] - Optional timeout value in milliseconds. // GOOD: Default value shown
 * @returns {boolean} True if processing succeeds.
 */
function processValue(input, timeout = 500) { 
    // ... implementation ...
    return true; 
}
```

### 7.2 Performance (Delegation Rationale)

**Definitions:**

- State the performance rationale that **Event Delegation** is used to reduce the number of event listeners and ensure efficient DOM operations. This rationale should be documented in the relevant code sections or function headers (Rule 1.6).

**Example:**

```javascript
// RULE 7.2: Document the performance rationale for Event Delegation.
// ========================================================================
// PRIVATE METHODS
// Rationale: Event delegation is used here to reduce the number of event 
// listeners, minimizing memory consumption and improving DOM efficiency.
// ========================================================================

function _handleDelegation(event) {
    // ... logic uses event.target ...
}
```

### 7.3 Debug API Exposure

**Definitions:**

- Provide a standardized **`_debug`** object within the public API to expose internal state for testing and debugging tools. This object must be read-only (i.e., contain functions that return internal values). Only in the API's _debug it is allowed to expose private functions.

**Example:**

```javascript
// RULE 7.3: Provide a standardized _debug object within the public API.
_global.ExampleModule = {
    // ... other API methods ...
    // Debug functions (only when debugMode active)
    _debug: !_global.BUILD_INFO?.debugMode ? undefined : { // GOOD: Standardized name
        // ... contents per Rule 7.4 ...
    }
};
```

### 7.4 Debug Contents

**Definitions:**

- The `_debug` object should expose `CONFIG` variable and internal functions. Use a getter function `var: () => var` to prevent direct access to module variables.

**Example:**

```javascript
// RULE 7.4: The _debug object must expose CONFIG, _currentState, and _isInitialized.
/*
let _currentState = 'active';
let _activeElements = new Set();
function _internalFunction(...params) {
    // Do something
}
*/
_global.ExampleModule = {
    // ...
    _debug: !_global.BUILD_INFO?.debugMode ? undefined : { 
        CONFIG: CONFIG, // GOOD: Exposes the CONFIG object directly (read-only)
        activeElements: () => Array.from(_activeElements), // GOOD: Do expose immutable array instead of mutable Set
        // GOOD: Uses a function to return the value of the private state
        currentState: () => _currentState, 
        internalFunction: (...parameters) => _internalFunction(...parameters) // GOOD: Expose via a wrapper function
    }
};
```

### 7.5 State Variable (`_isInitialized`)

**Definitions:**

- The module must use the private variable `_isInitialized` (Rule 1.5.1) which is exposed via an accessor function (Rule 7.4) for others to see whether the module is ready to work with.

**Example:**

```javascript
// RULE 7.5: The module must use the private _isInitialized variable and expose it via an accessor.

// Private Variable (Rule 1.5.1)
let _isInitialized = false; 

// Exposed Accessor in Public API (Rule 8.6)
_global.ExampleModule = {
    // ...
    isInitialized: () => _isInitialized, // GOOD: Accessor function
};
```

---

## Here is the revised and completed **Section VIII: Cleanup & Public API Design**, which finalizes the architectural standards by ensuring robust cleanup and a standardized, discoverable public interface.

---

## VIII. Cleanup & Public API Design

| **Rule ID** | **Rationale**                                                                                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **8.1-8.8** | **Memory Management & Interface:** Ensures the module is fully cleaned up to prevent memory leaks in SPA environments and defines a consistent, fully featured public interface. |

### 8.1 Public Method (`destroy()`)

**Definitions:**

- Provide a public API **`destroy()`** method. This method must be idempotent (Rule 3.5).

**Example:**

```javascript
// RULE 8.1: Provide a public API destroy() method.
/** * Completely cleans up the module, removing listeners and API exposure. * @returns {boolean} True if destruction was successful. */
function destroy() { // GOOD: Public method, not prefixed with underscore
    if (!_isInitialized) { // GOOD: Idempotency check (Rule 3.5)
        LOG.warn('Not initialized, skipping cleanup.');
        return false;
    }

    _isInitialized = false; // must be done before destroying the module object
    try {
        _cleanupEventListeners();

        // Unsubscribe from external events
        _unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
        _unsubscribeFunctions = [];

        _resetDOM();
        _clearState();


        delete _global.ModuleName;

        LOG.info('Destroyed successfully');
        return true;
    } catch (error) {
        LOG.error('Destruction failed:', error);
        return false;
    }
}
```

### 8.2 State Reset

**Definitions:**

- The `destroy()` method must reset all internal state (e.g., `_isInitialized`, `_currentState`) to their initial values.

**Example:**

```javascript
// RULE 8.2: The destroy() method must reset all internal state.
function destroy() {
    // ...
    // Assuming initial states:
    _isInitialized = false; // must be done before destroying the module object

    _currentState = 'inactive'; // GOOD: Resets module-specific state

    return true;
}
```

### 8.3 Listener Removal

**Definitions:**

- The `destroy()` method must remove all internal DOM event listeners and execute all external unsubscribe functions (tracked per Rule 3.4).

**Example:**

```javascript
// RULE 8.3: Remove all internal DOM listeners and execute external unsubscribe functions.
function destroy() {
    // ...
    // Internal DOM listeners (if _containerElement is not yet cleared):
    _containerElement.removeEventListener('click', _handleEventDelegation); // GOOD

    // External listeners (Rule 3.4):
    _unsubscribeFunctions.forEach(fn => fn()); // GOOD: Executes cleanup closures
    _unsubscribeFunctions = []; // GOOD: Clears the tracking array

    return true;
}
```

### 8.4 Container Clearing

**Definitions:**

- The `destroy()` method must clear all DOM element or container references (`null` or `undefined`) to prevent memory leaks in Single Page Applications (SPAs).

**Example:**

```javascript
// RULE 8.4: The destroy() method must clear all DOM element or container references.
/*let _containerElement = document.querySelector('#id');*/
function destroy() {
    // ...
    _containerElement = null; // GOOD: Clears the reference to allow garbage collection
    _eventTarget = null;      // GOOD: Clears internal EventTarget reference

    return true;
}
```

### 8.5 API Removal

**Definitions:**

- The `destroy()` method must remove the public API object from the `_global. object to fully decommission the module.

**Example:**

```javascript
// RULE 8.5: The destroy() method must remove the public API object from the _global.object.
function destroy() {
    // ...
    delete _global.ExampleModule; // GOOD: Removes the global entry point

    return true;
}
```

### 8.6 Public API Design

**Definitions:**

- The public API must be structured to include core functionality, utility methods, the event system, constants, the `_debug` object, and state-variables.

**Example:**

```javascript
// RULE 8.6: Public API must be fully structured.
_global.ExampleModule = {
    // Core functionality (e.g., lifecycle)
    init: init, 
    destroy: destroy,

    // Utility methods
    getState: getState, 

    // Event system (Rule 3.3)
    addEventListener: addEventListener, 

    // Constants (Rule 2.2)
    EVENTS: CONFIG.constants.events, 

    // Debug information (Rule 7.3)
    _debug: !_global.BUILD_INFO?.debugMode ? undefined : { /* ... */ }, 

    // State variable access (Rule 7.5)
    isInitialized: () => _isInitialized 
};
```

### 8.7 call __loaded() as last step

**Definitions:**

- At the very end, right before the IIFE final message, the helper function `_loaded()` must be called, to ensure that the event system is running before initialization.
- This rule only applies to stateful modules.

**Example:**

```javascript
// RULE 8.7: run _loaded() to make sure the module has working event handlers.
_loaded(); // GOOD: run before the final message
// (Placed at the very end of the IIFE)
LOG.info(`Module ${MODULE} loaded and exposed.`, _global.ExampleModule); // GOOD
})();
```

### 8.8 IIFE Final Message

**Definitions:**

- A final `LOG.info` message must be included at the end of the IIFE execution, confirming the module's loading and exposure, including the exposed object as a third parameter.

**Example:**

```javascript
// RULE 8.8: Final LOG.info message confirms loading and includes exposed object.
// (Placed at the very end of the IIFE)
LOG.info(`Module ${MODULE} loaded and exposed.`, _global.ExampleModule); // GOOD
})();
```

---

## 📜 Complete Example Module: `example-module.js`

This final example module includes **only positive (GOOD) code** and quotes **every rule** (1.1 through 8.7) demonstrating its application.

```javascript
// ============================================================================
// EXAMPLE-MODULE.JS - Version 1.0.0
// Complete example module demonstrating all construction rules
//
// This module serves as a comprehensive reference implementation showing:
// - Proper module structure and isolation
// - Configuration management with types, i18n, classes, selectors, templates
// - Event system with internal and external communication
// - Error handling and logging patterns
// - Accessibility features (ARIA, keyboard navigation)
// - Static HTML preference with dynamic fallback
// - Security measures (XSS prevention, input sanitization)
// - Lifecycle management (init, destroy, cleanup)
// - Debug utilities for development
//
// Key Features:
// - Event-driven architecture with CustomEvents
// - Internationalization support (de/en)
// - Configurable UI components
// - Comprehensive error handling
// - Memory leak prevention
// - ARIA-compliant accessibility
//
// @version 1.0.0
// @author Polizeipräsidium Duisburg
// @license MIT
// ============================================================================
//
// NOTE: Version number in this header should be kept in sync with
// CONFIG.constants.VERSION for consistency
// ============================================================================

// RULE 1.1: Always use an IIFE for scope isolation
(function(scope) {
    // RULE 1.2: Always include 'use strict' for safety
    'use strict';

    // RULE 1.3: The module must define a top-level MODULE constant for identification
    const MODULE = 'EXAMPLE';
    const _global = scope; // RULE 1.1 IIEF must not access outer scope directly.

    // ========================================================================
    // DEPENDENCY CHECK (RULE 4.1)
    // ========================================================================

    // RULE 4.1: Check for required dependencies at the top of the module
    if (typeof _global.LOG === 'undefined') {
        console.error(`${MODULE}: LOG system required but not found`);
        return;
    }

    // ========================================================================
    // CONFIGURATION (RULES 2.1-2.11)
    // ========================================================================

    // RULE 2.1: All configuration must be centralized in a CONFIG object
    const CONFIG = {
        // RULE 2.2: Types must be defined as string constants in CONFIG.types
        types: {
            primary: 'primary',
            secondary: 'secondary',
            success: 'success',
            warning: 'warning',
            danger: 'danger'
        },

        // RULE 2.4: Event names must be defined in CONFIG.constants.events
        constants: {
            events: {
                STATE_CHANGED: 'exampleStateChanged',
                INITIALIZED: 'exampleInitialized',
                ACTION_COMPLETE: 'exampleActionComplete',
                ERROR: 'exampleError'
            },
            // RULE 2.3: Define state strings as constants
            states: {
                ACTIVE: 'active',
                INACTIVE: 'inactive'
            },
            // RULE 2.3: Define ARIA attributes as constants
            aria: {
                ROLE_REGION: 'region',
                LIVE_POLITE: 'polite',
                LABEL: 'aria-label',
                LIVE: 'aria-live',
                ROLE: 'role'
            },
            // RULE 2.3: Define version as constant
            VERSION: '1.0.0',
            // RULE 2.3: Define log message context properties
            logProperties: {
                DETAIL: 'detail',
                TIMESTAMP: 'timestamp'
            }
        },

        // RULE 2.5: Module settings must be defined in CONFIG.settings
        settings: {
            defaultTimeout: 300,
            defaultLanguage: 'de',
            shortcutEnter: 'Enter',
            shortcutSpace: ' ',
            shortcutEscape: 'Escape'
        },

        // RULE 2.6: Internationalization strings must be in CONFIG.i18n
        i18n: {
            de: {
                buttonLabel: 'Aktion ausführen',
                closeButton: 'Schließen',
                statusActive: 'Aktiv',
                statusInactive: 'Inaktiv',
                widgetTitle: 'Beispiel-Widget',
                errorMessage: 'Ein Fehler ist aufgetreten'
            },
            en: {
                buttonLabel: 'Execute action',
                closeButton: 'Close',
                statusActive: 'Active',
                statusInactive: 'Inactive',
                widgetTitle: 'Example Widget',
                errorMessage: 'An error occurred'
            }
        }
    };

    // RULE 2.7: CSS classes must be defined in CONFIG.classes
    CONFIG.classes = {
        container: 'example-container',
        widget: 'example-widget',
        header: 'example-header',
        title: 'example-title',
        closeButton: 'example-close',
        content: 'example-content',
        button: 'example-button',
        active: 'example--active',
        hidden: 'example--hidden',
        loading: 'example--loading',
        // RULE 2.9: Dynamic class generators must be included in CONFIG.classes
        typeClass: (type) => {
            return `example--${CONFIG.types[type] || CONFIG.types.primary}`;
        },
        stateClass: (state) => {
            return `example--state-${state}`;
        }
    };

    // RULE 2.8: CSS selectors must be auto-generated from CONFIG.classes
    CONFIG.selectors = Object.keys(CONFIG.classes).reduce((acc, key) => {
        if (typeof CONFIG.classes[key] === 'string') {
            acc[key] = `.${CONFIG.classes[key]}`;
        } else if (typeof CONFIG.classes[key] === 'function') {
            acc[key] = (param) => `.${CONFIG.classes[key](param)}`;
        }
        return acc;
    }, {});

    // RULE 2.10: ID-based or complex selectors must be added after auto-generation
    CONFIG.selectors = {
        ...CONFIG.selectors,
        container: '#example-container', // RULE 2.3: Use CONFIG.constants.selectors instead of hardcoded strings
        body: 'body'
    };

    // RULE 2.11: HTML templates must be defined in CONFIG.templates
    CONFIG.templates = {
        widget: `
            <div class="${CONFIG.classes.widget}" ${CONFIG.constants.aria.ROLE}="${CONFIG.constants.aria.ROLE_REGION}" ${CONFIG.constants.aria.LIVE}="${CONFIG.constants.aria.LIVE_POLITE}">
                <div class="${CONFIG.classes.header}">
                    <span class="${CONFIG.classes.title}"></span>
                    <button class="${CONFIG.classes.closeButton}" type="button">×</button>
                </div>
                <div class="${CONFIG.classes.content}"></div>
            </div>
        `,
        // RULE 2.11: Templates can be functions that accept parameters
        messageBody: (message, type = 'primary') => {
            const escapedMessage = _escapeHTML(message);
            const typeClass = CONFIG.classes.typeClass(type);
            return `
                <div class="${CONFIG.classes.container} ${typeClass}">
                    <span class="${CONFIG.classes.content}">${escapedMessage}</span>
                    <button class="${CONFIG.classes.button}" 
                            aria-label="${_t('closeButton')}">
                        ${_t('closeButton')}
                    </button>
                </div>
            `;
        }
    };

    // ========================================================================
    // MODULE EVENTS (RULE 2.4)
    // ========================================================================

    // RULE 2.4: Event names must be exported for external use
    const MODULE_EVENTS = CONFIG.constants.events;

    // Initialize state after CONFIG is defined
    // RULE 2.3: Use CONFIG.constants.states instead of hardcoded strings
    if (_currentState === null) {
        _currentState = CONFIG.constants.states.INACTIVE;
    }

    // ========================================================================
    // STATE (RULES 1.5.1)
    // ========================================================================

    // RULE 1.5.1: Names of all private internal variables must have a leading underscore
    let _isInitialized = false;
    let _currentState = null; // Will be set to CONFIG.constants.states.INACTIVE after CONFIG is defined
    let _containerElement = null;
    let _eventTarget = null;
    let _unsubscribeFunctions = [];

    // ========================================================================
    // HELPER FUNCTIONS (RULES 2.3, 4.4, 4.5)
    // ========================================================================

    // RULE 2.3: Internationalization helper must use CONFIG.i18n
    // RULE 1.5.1: Private method name starts with an underscore
    /**
     * Translates a key using the current document language
     * @param {string} key - The translation key
     * @returns {string} The translated string or the key if not found
     */
    function _t(key) {
        // RULE 2.3: Use CONFIG.settings.defaultLanguage instead of hardcoded string
        const lang = document.documentElement.lang || CONFIG.settings.defaultLanguage;
        return CONFIG.i18n[lang]?.[key] || key;
    }

    // RULE 4.4: XSS prevention by escaping user-provided strings
    /**
     * Escapes HTML special characters to prevent XSS attacks
     * @param {string} text - The text to escape
     * @returns {string} The escaped text
     */
    function _escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ========================================================================
    // EVENT COMMUNICATION (RULES 3.1, 3.2, 3.3, 3.4)
    // ========================================================================

    // RULE 3.1: Internal event system must be initialized at module load
    /**
     * Initializes the internal event system using EventTarget
     * @returns {void}
     */
    function _initEventSystem() {
        _eventTarget = new EventTarget();
        LOG.debug('Event system initialized');
    }

    // RULE 3.2: Dispatch function must validate type and include timestamp
    /**
     * Dispatches a module event with validation and timestamp
     * @param {string} eventType - The event type from MODULE_EVENTS
     * @param {Object} [detail={}] - Additional event details
     * @returns {boolean} True if event was dispatched successfully
     */
    function dispatchModuleEvent(eventType, detail = {}) {
        if (!_eventTarget) {
            LOG.error(`Event system not initialized - cannot dispatch: ${eventType}`);
            return false;
        }

        // RULE 3.2: Validate event type against defined MODULE_EVENTS
        if (!Object.values(MODULE_EVENTS).includes(eventType)) {
            LOG.error(`Invalid event type: ${eventType}`);
            return false;
        }

        // RULE 3.2: Include timestamp in CustomEvent detail
        const event = new CustomEvent(eventType, {
            detail: {
                // RULE 2.3: Use CONFIG.constants.logProperties instead of hardcoded property name
                [CONFIG.constants.logProperties.TIMESTAMP]: Date.now(),
                ...detail
            },
            bubbles: true,
            cancelable: true
        });

        // RULE 5.2: Utilize LOG.debug with a context object
        LOG.debug(`📢 Dispatching event: ${eventType}`, event.detail);
        return _eventTarget.dispatchEvent(event);
    }

    // RULE 3.3: Public addEventListener wrapper for module events
    /**
     * Adds an event listener to the module's event system
     * @param {string} eventType - The event type to listen for
     * @param {Function} callback - The callback function
     * @param {Object} [options] - Optional event listener options
     * @returns {void}
     */
    function addEventListener(eventType, callback, options) {
        if (!_eventTarget) {
            LOG.error(`Event system not initialized - cannot listen to: ${eventType}`);
            return;
        }

        _eventTarget.addEventListener(eventType, callback, options);
        LOG.debug(`👂 Event listener added for: ${eventType}`);
    }

    // RULE 3.3: Public removeEventListener wrapper for module events
    /**
     * Removes an event listener from the module's event system
     * @param {string} eventType - The event type
     * @param {Function} callback - The callback function
     * @param {Object} [options] - Optional event listener options
     * @returns {void}
     */
    function removeEventListener(eventType, callback, options) {
        if (!_eventTarget) return;
        _eventTarget.removeEventListener(eventType, callback, options);
        LOG.debug(`🔇 Event listener removed for: ${eventType}`);
    }

    // RULE 3.4: External event subscriptions must be tracked for cleanup
    /**
     * Subscribes to external events and tracks cleanup functions
     * @returns {void}
     */
    function _subscribeToExternalEvents() {
        const handleExternalEvent = (event) => {
            LOG.debug('External event received:', event.type);
            // Handle external module events
        };

        _global.addEventListener('externalModuleEvent', handleExternalEvent);

        // RULE 3.4: Track unsubscribe function for cleanup
        _unsubscribeFunctions.push(() => {
            _global.removeEventListener('externalModuleEvent', handleExternalEvent);
        });

        LOG.debug('Subscribed to external events');
    }

    // ========================================================================
    // DOM SETUP (RULES 6.7, 6.8)
    // ========================================================================

    // RULE 6.7: Prefer existing static HTML elements over dynamic creation
    /**
     * Sets up the DOM by preferring static HTML elements
     * @returns {boolean} True if setup was successful
     */
    function _setupDOM() {
        // RULE 6.7: Look for static container first
        _containerElement = document.querySelector(CONFIG.selectors.container);

        if (!_containerElement) {
            LOG.warn('No static container found, creating dynamic fallback');
            _containerElement = _createDynamicContainer();
            if (!_containerElement) {
                LOG.error('Failed to create dynamic container');
                return false;
            }
        } else {
            LOG.debug('Using existing static container');
            // RULE 6.8: Reuse and show existing element instead of creating new
            _containerElement.classList.remove(CONFIG.classes.hidden);
        }

        return true;
    }

    // RULE 6.7: Create dynamic container only when static HTML doesn't exist
    /**
     * Creates a dynamic container as fallback
     * @returns {HTMLElement|null} The created container or null on failure
     */
    function _createDynamicContainer() {
        try {
            const container = document.createElement('div');
            container.id = 'example-container';
            container.className = CONFIG.classes.container;
            container.innerHTML = CONFIG.templates.widget;
            document.body.appendChild(container);
            return container;
        } catch (error) {
            LOG.error('Dynamic container creation failed:', error);
            return null;
        }
    }

    // ========================================================================
    // UI UPDATE (RULES 4.5, 6.1, 6.2, 6.6)
    // ========================================================================

    // RULE 4.5: Prefer textContent over innerHTML where possible
    /**
     * Updates the UI to reflect the current state
     * @returns {void}
     */
    function _updateUI() {
        // RULE 4.6: Use try...catch for operations that might fail
        try {
            if (!_containerElement) {
                LOG.warn('Cannot update UI: container not available');
                return;
            }

            // RULE 2.3: Use CONFIG.constants.states instead of hardcoded strings
            const statusText = _currentState === CONFIG.constants.states.ACTIVE 
                ? _t('statusActive') 
                : _t('statusInactive');

            const titleElement = _containerElement.querySelector(CONFIG.selectors.title);
            if (titleElement) {
                // RULE 4.5: Use textContent for safety
                titleElement.textContent = statusText;
            }

            // RULE 6.1 & 6.2: Styling in CSS; JS only toggles classes
            _containerElement.classList.toggle(
                CONFIG.classes.active, 
                _currentState === CONFIG.constants.states.ACTIVE
            );

            // RULE 6.6: Utilize correct ARIA attributes for accessibility
            // RULE 2.3: Use CONFIG.constants.aria instead of hardcoded attribute names
            _containerElement.setAttribute(CONFIG.constants.aria.LIVE, CONFIG.constants.aria.LIVE_POLITE);
            _containerElement.setAttribute(CONFIG.constants.aria.LABEL, statusText);

            LOG.debug(`UI updated to state: ${_currentState}`);
        } catch (error) {
            LOG.error('UI update failed:', error);
        }
    }

    // ========================================================================
    // EVENT HANDLERS (RULES 4.7, 6.4, 6.5)
    // ========================================================================

    // RULE 6.4: Use event delegation for DOM events
    /**
     * Handles click events via event delegation
     * @param {Event} event - The click event object
     * @returns {void}
     */
    function _handleButtonClick(event) {
        // RULE 4.7: Use individual try...catch for iterative DOM operations
        try {
            const button = event.target.closest(CONFIG.selectors.button);
            if (!button) return;

            event.preventDefault();
            toggleState();
        } catch (error) {
            LOG.error('Button click handler failed:', error);
        }
    }

    // RULE 6.4 & 6.5: Keyboard navigation must use CONFIG.settings
    /**
     * Handles keyboard events for accessibility
     * @param {KeyboardEvent} event - The keyboard event object
     * @returns {void}
     */
    function _handleKeyboardEvents(event) {
        // RULE 6.5: Use CONFIG.settings for keyboard shortcuts
        if (event.key === CONFIG.settings.shortcutEnter || 
            event.key === CONFIG.settings.shortcutSpace) {
            event.preventDefault();
            const button = event.target.closest(CONFIG.selectors.button);
            if (button) toggleState();
        }

        if (event.key === CONFIG.settings.shortcutEscape) {
            if (_containerElement) {
                _containerElement.classList.remove(CONFIG.classes.active);
            }
        }
    }

    // ========================================================================
    // PUBLIC METHODS (RULES 3.5, 4.8, 5.1, 7.1)
    // ========================================================================

    // RULE 7.1: JSDoc must include parameters, types, and default values
    /**
     * Toggles the module state between active and inactive
     * @returns {boolean} True if state was toggled successfully
     */
    function toggleState() {
        // RULE 4.6: Use try...catch for operations that might fail
        try {
            const previousState = _currentState;
            // RULE 2.3: Use CONFIG.constants.states instead of hardcoded strings
            _currentState = _currentState === CONFIG.constants.states.ACTIVE 
                ? CONFIG.constants.states.INACTIVE 
                : CONFIG.constants.states.ACTIVE;
            _updateUI();

            // Dispatch event to notify state change
            dispatchModuleEvent(MODULE_EVENTS.STATE_CHANGED, {
                previousState,
                newState: _currentState
            });

            // RULE 5.1: Log messages must be in English
            LOG.info(`State toggled from ${previousState} to ${_currentState}`);

            // RULE 4.8: Functions must return consistent types
            return true;
        } catch (error) {
            LOG.error('State toggle failed:', error);
            // RULE 4.8: Return same type on error
            return false;
        }
    }

    // ========================================================================
    // LIFECYCLE: INITIALIZATION (RULES 3.5, 4.6, 7.1)
    // ========================================================================

    // RULE 7.1: JSDoc must include parameters, types, and default values
    /**
     * Initializes the Example Module
     * @param {Object} [options={}] - Optional configuration overrides
     * @returns {boolean} True if initialized successfully
     */
    function init(options = {}) {
        // RULE 3.5: Init and destroy must be idempotent
        if (_isInitialized) {
            LOG.warn('Already initialized, skipping init');
            // RULE 4.8: Return consistent type
            return true;
        }

        // RULE 4.6: Use try...catch for operations that might fail
        try {
            LOG.info('Initialization started');

            // Setup DOM
            if (!_setupDOM()) {
                LOG.error('DOM setup failed');
                return false;
            }

            // RULE 6.4: Use event delegation instead of direct binding
            document.addEventListener('click', _handleButtonClick);
            document.addEventListener('keydown', _handleKeyboardEvents);

            // Subscribe to external events
            _subscribeToExternalEvents();

            // Initial UI setup
            const titleElement = _containerElement.querySelector(CONFIG.selectors.title);
            if (titleElement) {
                // RULE 2.3: Use _t() for internationalized strings
                titleElement.textContent = _t('widgetTitle');
            }

            const closeButton = _containerElement.querySelector(CONFIG.selectors.closeButton);
            if (closeButton) {
                // RULE 6.6: Set ARIA labels for accessibility
                // RULE 2.3: Use CONFIG.constants.aria instead of hardcoded attribute names
                closeButton.setAttribute(CONFIG.constants.aria.LABEL, _t('closeButton'));
            }

            // Update UI to initial state
            _updateUI();

            _isInitialized = true;

            // Dispatch initialization event
            dispatchModuleEvent(MODULE_EVENTS.INITIALIZED, {
                version: CONFIG.constants.VERSION,
                timestamp: Date.now()
            });

            LOG.info('Initialized successfully');
            // RULE 4.8: Return consistent type
            return true;
        } catch (error) {
            LOG.error('Initialization failed:', error);
            // RULE 4.8: Return consistent type
            return false;
        }
    }

    // ========================================================================
    // LIFECYCLE: CLEANUP (RULES 7.4, 8.1, 8.2, 8.3, 8.4, 8.5)
    // ========================================================================

    // RULE 8.1: Provide a public API destroy() method
    /**
     * Destroys the module and cleans up all resources
     * @returns {boolean} True if destroyed successfully
     */
    function destroy() {
        // RULE 3.5: Init and destroy must be idempotent
        if (!_isInitialized && !_global.ExampleModule) {
            LOG.debug('Module not initialized, nothing to destroy');
            return true;
        }

        LOG.debug('Destroying module');

        // RULE 4.6: Use try...catch for operations that might fail
        try {
            // RULE 8.3: Remove all DOM event listeners
            document.removeEventListener('click', _handleButtonClick);
            document.removeEventListener('keydown', _handleKeyboardEvents);

            // RULE 8.3: Execute all external unsubscribe functions
            _unsubscribeFunctions.forEach(unsubscribe => {
                try {
                    unsubscribe();
                } catch (error) {
                    LOG.error('Unsubscribe function failed:', error);
                }
            });
            _unsubscribeFunctions = [];

            // RULE 8.4: Hide static elements instead of removing them
            if (_containerElement) {
                _containerElement.classList.add(CONFIG.classes.hidden);
            }

            // RULE 7.4 & 8.2: Reset all internal state
            _isInitialized = false;
            // RULE 2.3: Use CONFIG.constants.states instead of hardcoded strings
            _currentState = CONFIG.constants.states.INACTIVE;
            // RULE 7.4: Clear container references
            _containerElement = null;
            _eventTarget = null;

            // RULE 8.5: Remove the public API object from the _global.object
            delete _global.ExampleModule;

            LOG.info('Destroyed successfully');
            return true;
        } catch (error) {
            LOG.error('Destruction failed:', error);
            return false;
        }
    }

    // ========================================================================
    // MODULE LOADING (RULE 8.7)
    // ========================================================================

    // RULE 8.7: Helper function called before initialization to prepare module
    /**
     * Performs module loading tasks before initialization
     * Ensures event system is ready for use
     * @returns {void}
     */
    function _loaded() {
        // Initialize event system at module load time
        _initEventSystem();
        LOG.debug('Module loaded, event system ready');
    }

    // ========================================================================
    // PUBLIC API (RULES 1.5.2, 1.7, 7.3, 7.4, 7.5, 8.6)
    // ========================================================================

    // RULE 1.5.2: Names of the exposed API object must use PascalCase
    // RULE 8.6: The public API must be fully structured
    _global.ExampleModule = {
        // Core functionality
        init: init,
        destroy: destroy,
        toggleState: toggleState,

        // RULE 3.3: Event system public methods
        addEventListener: addEventListener,
        removeEventListener: removeEventListener,
        dispatchEvent: dispatchModuleEvent,

        // Utility methods
        getCurrentState: () => _currentState,
        // RULE 2.3: Use CONFIG.constants.states instead of hardcoded strings
        getDefaultState: () => CONFIG.constants.states.INACTIVE,
        isValidState: (state) => Object.values(CONFIG.constants.states).includes(state),

        // Constants for external use
        // RULE 2.3: Expose states from CONFIG.constants.states
        STATES: CONFIG.constants.states,
        EVENTS: MODULE_EVENTS,
        CONSTANTS: {
            VERSION: CONFIG.constants.VERSION,
            DEFAULT_TIMEOUT: CONFIG.settings.defaultTimeout
        },

        // RULE 7.3: Provide a standardized _debug object
        _debug: !_global.BUILD_INFO?.debugMode ? undefined : { 
            // RULE 7.4: Expose CONFIG
            CONFIG: CONFIG,
            // RULE 7.4: Expose _currentState via function
            currentState: () => _currentState,
            // RULE 7.4: Expose _isInitialized via function
            isInitialized: () => _isInitialized,
            // RULE 7.4: Expose _containerElement via function
            containerElement: () => _containerElement,
            // Additional debug information
            eventTarget: () => _eventTarget,
            unsubscribeFunctions: () => _unsubscribeFunctions.length
        },

        // RULE 7.5: Expose _isInitialized via an accessor
        isInitialized: () => _isInitialized
    };

    // RULE 8.7: Call _loaded() to make sure the module has working event handlers
    _loaded();

    // RULE 8.8: Final LOG.info message confirms loading and includes exposed object
    LOG.info(`Module ${MODULE} loaded and exposed.`, _global.ExampleModule);

})(self);
```

---

## 📄 Document Versioning

| Field                | Value        | Notes                                                                                                                 |
| -------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Document Version** | **1.0**      | Initial comprehensive release                                                                                         |
| **Creation Date**    | October 2025 | Based on the conversation timestamp.                                                                                  |
| **Revision History** | N/A          | This is the base version; all previous iterations are considered drafts.                                              |
| **Next Revision**    | 1.1          | Suggested version for the next planned update.                                                                        |
