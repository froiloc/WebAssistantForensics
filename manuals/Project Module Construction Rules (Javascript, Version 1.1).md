This is the consolidated and complete rule set for the JavaScript module architecture, following the exact structure and explicit detail for a comprehensive reference document.

This document, **Version 1.1**, incorporates all architectural, communication, error handling, and best practice requirements. Every rule is defined in a single, complete sentence and referenced in the final, complete example.

---

# 🏗️ Project Module Construction Rules (Version 1.1)

---

## I. Core Architecture & Structure

| **Rule ID** | **Rationale**                                                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **1.1.x**   | **Module Isolation & Bootstrap:** Ensures clean scope isolation, proper dependency handling, and safe module initialization. |
| **1.2.x**   | **Identification & Communication:** Provides consistent module identification, documentation, and logging infrastructure.    |
| **1.3.x**   | **Naming Standards:** Establishes clear, consistent naming conventions for all code elements.                                |
| **1.4.x**   | **Code Organization:** Defines logical code structure and separation of concerns.                                            |
| **1.5.x**   | **Formatting & Style:** Ensures consistent code formatting and file structure.                                               |

---

### 1.1 Module Wrapper Requirements

| **Rule ID**     | **Rationale**                                                                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **1.1.1-1.1.4** | **Safe Isolation & Bootstrap:** Prevents global pollution, ensures strict mode safety, and handles dependencies before module execution. |

#### 1.1.1 Isolation (IIFE)

**Definitions:**

- Always use an **Immediately Invoked Function Expression (IIFE)** for scope isolation.

**Example:**

```javascript
// RULE 1.1.1: Always use an IIFE for scope isolation.
(function(scope) {
    // Module code goes here
})(self);

// BAD: Global scope definition
function MyModule() { /* ... */ } // BAD: Pollutes the global scope
```

#### 1.1.2 Strict Mode

**Definitions:**

- Always include `'use strict'` at the top of the IIFE for safety.

**Example:**

```javascript
// RULE 1.1.2: Always include 'use strict' for safety.
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

#### 1.1.3 Global Reference Isolation

**Definitions:**

- The IIFE parameter must be assigned to a `_global` constant and must not access outer scope directly.

**Example:**

```javascript
// RULE 1.1.3: Assign IIFE parameter to _global constant.
(function(scope) {
    const _global = scope; // GOOD: Isolated global reference
    // Module code uses _global, not window/self directly
})(self);

// BAD: Direct outer scope access
(function() {
    const _global = window; // BAD: Accesses outer scope directly
})(self);
```

#### 1.1.4 Dependency Check & Early Return

**Definitions:**

- Check critical dependencies immediately upon execution and return early if requirements are not met.

**Example:**

```javascript
// RULE 1.1.4: Check dependencies and return early if missing.
(function(scope) {
    'use strict';
    const _global = scope;

    // GOOD: Check at module bootstrap
    if (typeof _global.LOG === 'undefined') {
        console.error('MODULE: LOG system required');
        return; // Exit IIFE immediately
    }

    // Module continues only if dependencies are met
})(self);

// BAD: No dependency check
(function(scope) {
    // Module may fail later if LOG is undefined
    _global.LOG.debug('Starting...'); // BAD: Potential crash
})(self);
```

---

### 1.2 Module Identification & Documentation

| **Rule ID**     | **Rationale**                                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **1.2.1-1.2.3** | **Clear Identification & Communication:** Provides consistent module identity, comprehensive documentation, and standardized logging context. |

#### 1.2.1 MODULE Constant

**Definitions:**

- The module must define a top-level `MODULE` constant for logging identification with an **UPPERCASE**, descriptive value.

**Example:**

```javascript
// RULE 1.2.1: The module must define a top-level MODULE constant for identification.
const MODULE = 'EXMPL'; // GOOD: UPPERCASE and descriptive

// BAD: Constant is not uppercase or missing
const module = 'exmpl'; // BAD: Not uppercase
```

#### 1.2.2 Documentation Header

**Definitions:**

- Include a comprehensive file header with the version and features above the IIFE.

**Example:**

```javascript
// RULE 1.2.2: Include a comprehensive file header with the version and features.
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
(function(scope) {
    'use strict';
    // ...
})(self);
```

#### 1.2.3 LOG Object Creation Pattern

**Definitions:**

- Create a local `LOG` object that wraps the global logging system and automatically prepends the MODULE constant.

**Example:**

```javascript
// RULE 1.2.3: Create a local LOG object that prepends MODULE.
const LOG = {
    debug: (message, ...data) => _global.LOG.debug(MODULE, message, ...data),
    info: (message, ...data) => _global.LOG.info(MODULE, message, ...data),
    warn: (message, ...data) => _global.LOG.warn(MODULE, message, ...data),
    error: (message, ...data) => _global.LOG.error(MODULE, message, ...data)
};

// GOOD: Use the local LOG object
LOG.debug('Module initialized'); // Automatically includes MODULE context

// BAD: Direct global LOG usage
_global.LOG.debug('Module initialized'); // BAD: Missing MODULE context
```

---

### 1.3 Naming Conventions

| **Rule ID**     | **Rationale**                                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1.3.1-1.3.8** | **Consistent Identification:** Establishes clear, predictable naming patterns for all code elements while maintaining readability and proper documentation standards. |

#### 1.3.1 Private Naming Convention (_ prefix)

**Definitions:**

- Names of all private internal variables and methods must have a leading underscore `_`.

**Example:**

```javascript
// RULE 1.3.1: Names of all private internal variables and methods must have a leading underscore '_'.
let _isInitialized = false; // GOOD: Private variable
function _initListeners() { /* ... */ } // GOOD: Private method

// BAD: Private elements without underscore
let isInitialized = false; // BAD: Looks like a public variable
function initListeners() { /* ... */ } // BAD: Could be mistaken for public API
```

#### 1.3.2 Public API Naming Convention (PascalCase via CONFIG)

**Definitions:**

- Names of the exposed API object attached to `_global` must use **Pascal Case** and start with a **capital letter**.

**Example:**

```javascript
// RULE 1.3.2: Names of the exposed API object must use PascalCase and start with a capital letter.
_global.ExampleModule = { /* ... */ }; // GOOD: Starts with capital letter
_global.DataManager = { /* ... */ }; // GOOD: PascalCase with capitals

// BAD: API name starts with small letter
_global.exampleModule = { /* ... */ }; // BAD: Prohibited
_global.data_manager = { /* ... */ }; // BAD: Snake case not allowed
```

#### 1.3.3 Internal Function/Variable Naming (camelCase)

**Definitions:**

- Names of internal (non-private, non-API) functions and variables must use **camelCase** and start with a **small letter**.

**Example:**

```javascript
// RULE 1.3.3: Names of internal functions/variables must use camelCase and start with small letter.
const myVariable = 0; // GOOD: Starts small, uses camelCase
function getMyValue() { /* ... */ } // GOOD: Starts small, uses camelCase

// BAD: Starts with capital letter
function GetMyValue() { /* ... */ } // BAD: Prohibited (no Pascal Case for internals)
```

#### 1.3.4 Static String Naming (UPPERCASE snake case in CONFIG)

**Definitions:**

- Static strings (describing states) can be UPPERCASE and snake case. Words are separated by underscores '_' and each word is in **lowercase**.

**Example:**

```javascript
// RULE 1.3.4: Static strings describing states can be UPPERCASE snake case.
const STATES = {
    ACTIVE: 'active', // GOOD: UPPERCASE snake case for states
    INACTIVE: 'inactive',
    PENDING_APPROVAL: 'pending_approval'
};

// BAD: Uses UPPERCASE for variables
let MY_VARIABLE = 0; // BAD: Prohibited (reserved for static strings like STATES)
```

#### 1.3.5 File Naming Convention (kebab-case)

**Definitions:**

- Names of files use **kebab-case**, words are separated by hyphens '-' and each word is **lowercase**.

**Example:**

```javascript
// RULE 1.3.5: Names of files use kebab-case.
// example-module.js - GOOD: kebab-case for files
const imageSrc = 'menu-selected-annotated.png'; // GOOD: kebab-case for assets

// BAD: Other naming conventions for files
// example_module.js - BAD: snake_case not allowed for files
// exampleModule.js - BAD: camelCase not allowed for files
```

#### 1.3.6 Comment Placement (above and inline)

**Definitions:**

- Comments are either on top of the commented line or follow within the line after the command.

**Example:**

```javascript
// RULE 1.3.6: Comments are either above or inline with code.
// This comment is above the code - GOOD
if (a == b) { /*...*/ }

const myVariable = 0; // This comment is inline - GOOD

// BAD: Comments far from relevant code
// This describes the if clause below
// ... lots of other code ...
if (a == b) { /*...*/ } // BAD: Comment too far from code
```

#### 1.3.7 Comment Capitalization (starts with capital/digit/special)

**Definitions:**

- Descriptive text must start with a capital letter, digit or special character.

**Example:**

```javascript
// RULE 1.3.7: Descriptive text must start with capital letter, digit or special character.
// This comment starts with capital letter - GOOD
// 123 This comment starts with digit - GOOD
// - This comment starts with special character - GOOD

// this comment starts with lowercase letter - BAD
```

#### 1.3.8 Comment Punctuation (no periods)

**Definitions:**

- Comments do not require a period at the end.

**Example:**

```javascript
// RULE 1.3.8: Comments do not require a period at the end.
// This comment has no period - GOOD
// This comment has no period - GOOD

// This comment has a period. - BAD
// You should not use periods at the end. - BAD
```

---

### 1.4 Code Organization

| **Rule ID**     | **Rationale**                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1.4.1-1.4.4** | **Logical Structure & Maintainability:** Organizes code into predictable sections with clear separation of configuration, state, and functionality for better readability and maintenance. |

#### 1.4.1 Code Separation Headers (standardized bar-comments throughout)

**Definitions:**

- Separate code into logical sections (e.g., STATE, CONFIG, PRIVATE METHODS) using standardized bar-comments (`// ============`).

**Example:**

```javascript
// RULE 1.4.1: Separate code into logical sections using standardized bar-comments.
// ========================================================================
// CONFIGURATION
// ========================================================================
const CONFIG = { /* ... */ };

// ========================================================================
// STATE
// ========================================================================
let _isInitialized = false;

// BAD: Inconsistent or missing separation
// Configuration - BAD: Not the standard format
const CONFIG = { /* ... */ };
```

#### 1.4.2 Public/Private Separation (private `_` vs public methods)

**Definitions:**

- Maintain a clear separation of private methods (`_privateMethod`) and public API methods within the module's structure.

**Example:**

```javascript
// RULE 1.4.2: Maintain clear separation of private methods and public API methods.
// PUBLIC API structure:
_global.ExampleModule = { 
    init: init, // GOOD: Public API method
    destroy: destroy, // GOOD: Public API method
    // ...
};

// BAD: Private methods in public API
_global.ExampleModule = {
    init: init,
    _privateMethod: _privateMethod // BAD: Private methods must not be in public API
};
```

#### 1.4.3 Configuration Before Logic (CONFIG complete before functions)

**Definitions:**

- The `CONFIG` object must be completely defined before any functional or variable part of the module.

**Example:**

```javascript
// RULE 1.4.3: CONFIG must be defined before any functional code.
// GOOD: Configuration first
const CONFIG = {
    settings: { timeout: 5000 },
    classes: { active: 'is-active' }
};

// Then state variables
let _isInitialized = false;

// Then functions
function init() { /* uses CONFIG */ }

// BAD: Configuration mixed with logic
let _isInitialized = false; // BAD: State before configuration
const CONFIG = { /* ... */ };
function init() { /* ... */ }
```

#### 1.4.4 State Variables Placement (dedicated section after CONFIG)

**Definitions:**

- All state variables must be declared in a dedicated section after configuration and before function definitions.

**Example:**

```javascript
// RULE 1.4.4: State variables in dedicated section after configuration.
// ========================================================================
// CONFIGURATION
// ========================================================================
const CONFIG = { /* ... */ };

// ========================================================================
// STATE
// ========================================================================
let _isInitialized = false; // GOOD: Dedicated state section
let _currentState = null;
let _containerElement = null;

// ========================================================================
// FUNCTIONS
// ========================================================================
function init() { /* ... */ }

// BAD: State variables scattered throughout code
const CONFIG = { /* ... */ };
function init() { 
    let _isInitialized = false; // BAD: State inside function
}
let _currentState = null; // BAD: State after functions
```

---

### 1.5 Formatting & Style

| **Rule ID**     | **Rationale**                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **1.5.1-1.5.2** | **Consistent Readability:** Ensures uniform code formatting and file structure for better collaboration and maintenance. |

#### 1.5.1 Indentation (4 spaces)

**Definitions:**

- The indent for sub structure is 4 spaces. No tabs allowed.

**Example:**

```javascript
// RULE 1.5.1: Indent with 4 spaces.
function example() {
    let variable; // GOOD: 4 spaces
    if (condition) {
        doSomething(); // GOOD: 4 more spaces for substructure
    }
}

// BAD: Mixed or incorrect indentation
function example() {
  let variable; // BAD: 2 spaces
    if (condition) {
        doSomething(); // BAD: Inconsistent
       } // BAD: More than 4 spaces
}
```

#### 1.5.2 File Structure Order (consistent code organization)

**Definitions:**

- Maintain consistent file structure: Wrapper → Identification → Configuration → State → Helpers → Core Logic → Public API → Finalization.

**Example:**

```javascript
// RULE 1.5.2: Maintain consistent file structure order.
(function(scope) {
    'use strict';
    const _global = scope;

    // 1. Identification
    const MODULE = 'EXAMPLE';
    const LOG = { /* ... */ };

    // 2. Configuration
    const CONFIG = { /* ... */ };

    // 3. State
    let _isInitialized = false;

    // 4. Helper Functions
    function _helper() { /* ... */ }

    // 5. Core Logic
    function init() { /* ... */ }

    // 6. Public API
    _global.ExampleModule = { /* ... */ };

    // 7. Finalization
    LOG.info(`Module ${MODULE} loaded`);
})(self);

// BAD: Inconsistent structure order
(function(scope) {
    function init() { /* ... */ } // BAD: Functions before configuration
    const CONFIG = { /* ... */ };
    const MODULE = 'EXAMPLE'; // BAD: Identification not at top
})(self);
```

---

## II. Configuration & Standards

| **Rule ID** | **Rationale**                                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **2.1.x**   | **Centralized Configuration:** Provides single source of truth for all configurable values, enabling easy maintenance and consistency. |
| **2.2.x**   | **Configuration Structure:** Defines comprehensive configuration sections with clear responsibilities and organization.                |
| **2.3.x**   | **Configuration Usage:** Ensures consistent reference to configuration values and prevents hardcoded constants in logic.               |
| **2.4.x**   | **Selector Management:** Automates and standardizes CSS selector generation with override capabilities.                                |
| **2.5.x**   | **Internationalization:** Provides consistent localization approach for user-facing content.                                           |

---

### 2.1 Configuration Centralization

| **Rule ID**     | **Rationale**                                                                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **2.1.1-2.1.2** | **Single Source of Truth:** Centralizes all configurable values in one location for easy maintenance and consistency across the module. |

#### 2.1.1 CONFIG Object Requirement

**Definitions:**

- Centralize all module defaults, strings, classes, and templates in a comprehensive **`CONFIG`** object.

**Example:**

```javascript
// RULE 2.1.1: Centralize all configuration in a CONFIG object.
const CONFIG = { // GOOD: Single configuration object
    settings: { defaultTimeout: 5000 },
    classes: { active: 'is-active' },
    templates: { widget: '<div>...</div>' }
};

// BAD: Hard-coded values scattered throughout code
const timeout = 5000; // BAD: Should be in CONFIG
const activeClass = 'is-active'; // BAD: Should be in CONFIG
```

#### 2.1.2 Configuration Composition

**Definitions:**

- The CONFIG object may be composed in steps but must be completed before any functional or variable part of the module.

**Example:**

```javascript
// RULE 2.1.2: CONFIG may be composed in steps but completed before logic.
// GOOD: Step-by-step composition
const CONFIG = {
    settings: { timeout: 5000 }
};

CONFIG.classes = { // GOOD: Adding sections later
    active: 'is-active',
    hidden: 'is-hidden'
};

CONFIG.selectors = { /* ... */ }; // GOOD: Completed before functions

// BAD: Configuration after functional code
function init() { /* ... */ } // BAD: Function before CONFIG complete
CONFIG.templates = { /* ... */ }; // BAD: Configuration after logic
```

---

### 2.2 Configuration Structure

| **Rule ID**     | **Rationale**                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **2.2.1-2.2.6** | **Comprehensive Organization:** Defines clear sections for different configuration types with specific responsibilities and content. |

#### 2.2.1 Required Configuration Sections

**Definitions:**

- The `CONFIG` object must explicitly include sections for `classes`, `selectors`, and `i18n`.

**Example:**

```javascript
// RULE 2.2.1: CONFIG must include classes, selectors, and i18n sections.
const CONFIG = {
    classes: { active: 'is-active' }, // REQUIRED
    selectors: { container: '#main' }, // REQUIRED  
    i18n: { de: { welcome: 'Willkommen' } } // REQUIRED
};

// BAD: Missing required sections
const CONFIG = {
    classes: { active: 'is-active' } // BAD: Missing selectors and i18n
};
```

#### 2.2.2 Optional Configuration Sections

**Definitions:**

- The `CONFIG` object may contain `settings`, `templates`, `constants`, and other optional sections.

**Example:**

```javascript
// RULE 2.2.2: CONFIG may include optional sections.
const CONFIG = {
    classes: { /* ... */ },
    selectors: { /* ... */ },
    i18n: { /* ... */ },
    // OPTIONAL SECTIONS:
    settings: { defaultTimeout: 5000 }, // GOOD: Optional
    templates: { widget: '<div>...</div>' }, // GOOD: Optional
    constants: { VERSION: '1.0.0' } // GOOD: Optional
};
```

#### 2.2.3 Classes Section (static and dynamic class usage)

**Definitions:**

- **classes**: contains all CSS classes introduced or used by the module, including dynamic class generators.

**Example:**

```javascript
// RULE 2.2.3: classes section contains all CSS classes.
const CONFIG = {
    classes: {
        container: 'example-container', // GOOD: Static class
        active: 'is-active', // GOOD: State class
        // GOOD: Dynamic class generators
        typeClass: (type) => `example--${type}`,
        stateClass: (state) => `example--state-${state}`
    }
};
```

#### 2.2.4 Selectors Section (auto-generated + manual overrides)

**Definitions:**

- **selectors**: contains all CSS selectors to elements used by the module.

**Example:**

```javascript
// RULE 2.2.4: selectors section contains all CSS selectors.
const CONFIG = {
    selectors: {
        container: '#example-container', // GOOD: ID selector
        button: '.example-button', // GOOD: Class selector
        dynamicElement: (id) => `#element-${id}` // GOOD: Dynamic selector
    }
};
```

#### 2.2.5 Internationalization Section (German required, proper i18n usage)

**Definitions:**

- **i18n**: contains language objects (ISO 639-1) with translated strings directed to the user. Must contain `de`.

**Example:**

```javascript
// RULE 2.2.5: i18n section contains translated strings with German required.
const CONFIG = {
    i18n: {
        de: { // REQUIRED: German translations
            welcome: 'Willkommen',
            close: 'Schließen'
        },
        en: { // OPTIONAL: English translations
            welcome: 'Welcome', 
            close: 'Close'
        }
    }
};

// BAD: Missing German translations
const CONFIG = {
    i18n: {
        en: { welcome: 'Welcome' } // BAD: German (de) is required
    }
};
```

#### 2.2.6 Constants Section (usage and exposure)

**Definitions:**

- **constants**: contains constants or arrays of constants to be exposed via the API, including events and states.

**Example:**

```javascript
// RULE 2.2.6: constants section contains module constants.
const CONFIG = {
    constants: {
        events: {
            STATE_CHANGED: 'moduleStateChanged', // GOOD: UPPERCASE Snake Case
            INITIALIZED: 'moduleInitialized'
        },
        states: {
            ACTIVE: 'active',
            INACTIVE: 'inactive'
        },
        VERSION: '1.0.0'
    }
};
```

---

### 2.3 Configuration Usage

| **Rule ID**     | **Rationale**                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **2.3.1-2.3.3** | **Consistent Reference & Safety:** Ensures all configurable values are referenced through CONFIG, preventing hardcoded values and maintaining consistency. |

#### 2.3.1 No Hardcoded Values (CONFIG references throughout)

**Definitions:**

- Constant numbers or strings in any function body are prohibited; only references to the `CONFIG` object are allowed.

**Example:**

```javascript
// RULE 2.3.1: Only references to CONFIG allowed; no hardcoded strings/numbers.
// GOOD: Using CONFIG references
if (event.key === CONFIG.settings.shortcutEscape) {
    element.classList.add(CONFIG.classes.active);
}

// BAD: Hard-coded values in functions
if (event.key === 'Escape') { // BAD: Use CONFIG.settings.shortcutEscape
    element.classList.add('is-active'); // BAD: Use CONFIG.classes.active
}
```

#### 2.3.2 Logical Requirement Exceptions (standard events, ARIA roles, browser APIs)

**Definitions:**

- The only exceptions are if a string or value is a strong logical requirement and therefore cannot be the subject of any alteration.

**Example:**

```javascript
// RULE 2.3.2: Exceptions for strong logical requirements.
// GOOD: Exception - strong requirement for specific event type
element.removeEventListener('keydown', handler); 

// GOOD: Exception - strong requirement for specific ARIA role
element.setAttribute('role', 'alert');

// BAD: Unnecessary hardcoded value
if (type === 'success') { // BAD: Should be in CONFIG.constants.types
    element.style.color = 'green'; // BAD: Should use CONFIG.classes
}
```

#### 2.3.3 Selector Definition Placement (in selectors section, not constants)

**Definitions:**

- CONFIG.selectors may contain static/constant strings! Selector definitions must not be placed in CONFIG.constants.

**Example:**

```javascript
// RULE 2.3.3: Selectors belong in CONFIG.selectors, not constants.
// GOOD: Selectors in proper section
const CONFIG = {
    selectors: {
        container: '#main', // GOOD: In selectors section
        button: '.btn-primary'
    },
    constants: {
        events: { /* ... */ } // GOOD: Events in constants
    }
};

// BAD: Selectors in wrong section
const CONFIG = {
    constants: {
        SELECTOR_CONTAINER: '#main' // BAD: Selectors don't belong in constants
    }
};
```

---

### 2.4 Selector Management

| **Rule ID**     | **Rationale**                                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **2.4.1-2.4.3** | **Automated & Flexible Selectors:** Provides automatic selector generation from classes while allowing manual overrides for specific needs. |

#### 2.4.1 Selector Auto-Generation

**Definitions:**

- CSS selectors must be auto-generated from CONFIG.classes using the exact code pattern shown below.

**Example:**

```javascript
// RULE 2.4.1: Auto-generate selectors from classes using exact pattern.
CONFIG.selectors = Object.keys(CONFIG.classes).reduce((acc, key) => {
    if (typeof CONFIG.classes[key] === 'string') {
        acc[key] = `.${CONFIG.classes[key]}`;
    } else if (typeof CONFIG.classes[key] === 'function') {
        acc[key] = (param) => `.${CONFIG.classes[key](param)}`;
    }
    return acc;
}, {});

// BAD: Manual selector creation without auto-generation
CONFIG.selectors = { // BAD: Missing auto-generation step
    container: '.example-container'
};
```

#### 2.4.2 Selector Manual Override

**Definitions:**

- Any manually defined selector in `CONFIG.selectors` may override the automatically generated ones or add new ones.

**Example:**

```javascript
// RULE 2.4.2: Manual selectors may override auto-generated ones.
// After auto-generation:
CONFIG.selectors = { ...CONFIG.selectors,
    container: '#custom-container-id' // GOOD: Manual ID overrides class selector
};

// BAD: Manual override without spread operator
CONFIG.selectors = { // BAD: Overwrites all auto-generated selectors
    container: '#custom-id'
};
```

#### 2.4.3 Selector Extension Pattern

**Definitions:**

- Selector extensions must use the exact spread operator pattern shown below to preserve auto-generated selectors.

**Example:**

```javascript
// RULE 2.4.3: Selector extensions must use spread pattern.
// GOOD: Using spread operator to extend selectors
CONFIG.selectors = { ...CONFIG.selectors, // REQUIRED pattern
    customElement: '#custom-element',
    dynamicElement: (id) => `[data-id="${id}"]`
};

// BAD: Direct assignment loses auto-generated selectors
CONFIG.selectors = { // BAD: No spread operator
    customElement: '#custom-element' // BAD: Loses all auto-generated selectors
};
```

---

### 2.5 Internationalization

| **Rule ID**     | **Rationale**                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **2.5.1-2.5.3** | **Localized User Experience:** Provides consistent translation mechanism for user-facing content with proper fallback handling. |

#### 2.5.1 i18n Helper Function

**Definitions:**

- An internal helper function, such as `_t(key)`, must be used to retrieve localized strings from `CONFIG.i18n`.

**Example:**

```javascript
// RULE 2.5.1: Use i18n helper function for translation lookup.
function _t(key) {
    const lang = document.documentElement.lang || 'de';
    return CONFIG.i18n[lang]?.[key] || key;
}

// BAD: Direct i18n access without helper
const lang = document.documentElement.lang || 'de'; // BAD: Logic should be in helper
const text = CONFIG.i18n[lang]?.welcome; // BAD: Use _t('welcome')
```

#### 2.5.2 i18n Usage Scope

**Definitions:**

- Only use i18n for user directed communication (`.innerText`, `prompt`, `Toast`, `msgbox`, `aria-label`).

**Example:**

```javascript
// RULE 2.5.2: Use i18n only for user-facing content.
// GOOD: User-facing content
element.textContent = _t('welcomeMessage');
element.setAttribute('aria-label', _t('closeButton'));

// BAD: Using i18n for internal logging
LOG.info(_t('initializationStarted')); // BAD: Don't use i18n for logs
```

#### 2.5.3 Logging Language Restriction

**Definitions:**

- Do NOT use i18n in `LOG.debug`, `LOG.info`, `LOG.warn`, or `LOG.error` messages.

**Example:**

```javascript
// RULE 2.5.3: Don't use i18n for logging messages.
// GOOD: English logging messages
LOG.info('Module initialization started');
LOG.error('Data loading failed');

// BAD: Translated logging messages  
LOG.info(_t('initializationStarted')); // BAD: Logs must be in English
LOG.error(_t('dataLoadingFailed')); // BAD: Use English for logs
```

---

## III. Event, Triggers & Communication

| **Rule ID** | **Rationale**                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| **3.1.x**   | **Event System Foundation:** Establishes robust internal event communication infrastructure for module decoupling.        |
| **3.2.x**   | **Event Dispatch & Validation:** Ensures consistent, validated event dispatching with proper metadata and error handling. |
| **3.3.x**   | **Event Subscription:** Provides controlled external access to module events with proper subscription management.         |
| **3.4.x**   | **External Integration:** Manages cross-module communication with proper tracking and cleanup.                            |
| **3.5.x**   | **Method Reliability:** Ensures predictable module behavior through idempotent lifecycle methods.                         |

*These rules only apply to stateful modules.*

---

### 3.1 Event System Foundation

| **Rule ID**     | **Rationale**                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **3.1.1-3.1.2** | **Early Event System Availability:** Ensures event system is ready before module initialization for proper event listening setup. |

#### 3.1.1 Event System Initialization

**Definitions:**

- An internal event system, typically using `EventTarget`, must be initialized during module loading.

**Example:**

```javascript
// RULE 3.1.1: Initialize internal event system at module load.
function _initEventSystem() {
    _eventTarget = new EventTarget(); // GOOD: Event system setup
    LOG.debug('Event system initialized');
}

// BAD: Missing event system initialization
// No event system means no internal communication
```

#### 3.1.2 Event System Availability (before initialization)

**Definitions:**

- The event system must be available before initialization to allow listening to initialization events.

**Example:**

```javascript
// RULE 3.1.2: Event system must be ready before initialization.
function _loaded() {
    _initEventSystem(); // GOOD: Event system ready early
    // Now modules can listen to INITIALIZED event
}

_loaded();

// External module (from other class or document) can now safely listen:
ExampleModule.addEventListener(ExampleModule.EVENTS.INITIALIZED, callback);

// BAD: Event system initialized too late
function init() {
    // ... other setup ...
    _initEventSystem(); // BAD: Too late for pre-init listeners
}
```

---

### 3.2 Event Dispatch & Validation

| **Rule ID**     | **Rationale**                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **3.2.1-3.2.4** | **Reliable Event Communication:** Ensures events are properly validated, structured, and dispatched with complete metadata. |

#### 3.2.1 Event Dispatch Function

**Definitions:**

- A `dispatchModuleEvent` function must be provided to dispatch internal `CustomEvent`s.

**Example:**

```javascript
// RULE 3.2.1: Provide dispatchModuleEvent function for internal events.
function dispatchModuleEvent(eventType, detail = {}) {
    if (!_eventTarget) {
        LOG.error(`Event system not initialized - cannot dispatch: ${eventType}`);
        return false;
    }
    // ... validation and dispatch logic
}

// BAD: Direct EventTarget usage without wrapper
_eventTarget.dispatchEvent(new CustomEvent('someEvent')); // BAD: Use dispatchModuleEvent
```

#### 3.2.2 Event Type Validation

**Definitions:**

- Event dispatch must validate event types against defined `CONFIG.constants.events`.

**Example:**

```javascript
// RULE 3.2.2: Validate event types against defined constants.
function dispatchModuleEvent(eventType, detail = {}) {
    // GOOD: Event type validation
    if (!Object.values(CONFIG.constants.events).includes(eventType)) {
        LOG.error(`Invalid event type: ${eventType}`);
        return false;
    }
    // ... proceed with dispatch
}

// BAD: No event type validation
function dispatchModuleEvent(eventType, detail = {}) {
    _eventTarget.dispatchEvent(/* ... */); // BAD: No validation
}
```

#### 3.2.3 Event Detail Structure (timestamp)

**Definitions:**

- Event detail must include at least a `timestamp` and support additional custom data.

**Example:**

```javascript
// RULE 3.2.3: Include timestamp in event detail.
function dispatchModuleEvent(eventType, detail = {}) {
    const event = new CustomEvent(eventType, {
        detail: {
            timestamp: Date.now(), // REQUIRED: Always include timestamp
            ...detail // GOOD: Support custom data
        }
    });
    return _eventTarget.dispatchEvent(event);
}

// BAD: Missing timestamp or detail structure
const event = new CustomEvent(eventType, {
    detail: { someData: 'value' } // BAD: Missing timestamp
});
```

#### 3.2.4 Event Flags (bubbles, cancelable)

**Definitions:**

- CustomEvents must include `bubbles: true` and `cancelable: true` flags.

**Example:**

```javascript
// RULE 3.2.4: Events must be bubbled and cancelable.
function dispatchModuleEvent(eventType, detail = {}) {
    const event = new CustomEvent(eventType, {
        detail: { timestamp: Date.now(), ...detail },
        bubbles: true,    // REQUIRED: Allow event bubbling
        cancelable: true  // REQUIRED: Allow event cancellation
    });
    return _eventTarget.dispatchEvent(event);
}

// BAD: Missing required flags
const event = new CustomEvent(eventType, {
    detail: { timestamp: Date.now() } // BAD: Missing bubbles and cancelable
});
```

---

### 3.3 Event Subscription

| **Rule ID**     | **Rationale**                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **3.3.1-3.3.3** | **Controlled External Access:** Provides safe, managed access to module events with proper error handling and exposure. |

#### 3.3.1 Public Event Subscription

**Definitions:**

- Public `addEventListener` and `removeEventListener` methods must be provided for external subscription.

**Example:**

```javascript
// RULE 3.3.1: Provide public event subscription methods.
function addEventListener(eventType, callback, options) {
    if (!_eventTarget) {
        LOG.error(`Event system not initialized - cannot listen to: ${eventType}`);
        return;
    }
    _eventTarget.addEventListener(eventType, callback, options);
    LOG.debug(`Event listener added for: ${eventType}`);
}

function removeEventListener(eventType, callback, options) {
    if (!_eventTarget) return;
    _eventTarget.removeEventListener(eventType, callback, options);
    LOG.debug(`Event listener removed for: ${eventType}`);
}

// BAD: No public subscription methods
// External modules cannot listen to events
```

#### 3.3.2 Event Type Exposure

**Definitions:**

- Expose subscribable events via the public API using `EVENTS` constant.

**Example:**

```javascript
// RULE 3.3.2: Expose subscribable events via EVENTS constant.
_global.ExampleModule = {
    addEventListener: addEventListener,
    removeEventListener: removeEventListener,
    EVENTS: CONFIG.constants.events // GOOD: Expose available events
};

// External usage:
ExampleModule.addEventListener(ExampleModule.EVENTS.STATE_CHANGED, handler);

// BAD: Events not exposed
_global.ExampleModule = {
    addEventListener: addEventListener
    // BAD: No EVENTS constant for discovery
};
```

#### 3.3.3 Subscription Error Handling

**Definitions:**

- Event subscription methods must handle cases where event system is not initialized.

**Example:**

```javascript
// RULE 3.3.3: Handle uninitialized event system in subscription methods.
function addEventListener(eventType, callback, options) {
    if (!_eventTarget) {
        LOG.error(`Event system not initialized - cannot listen to: ${eventType}`);
        return; // GOOD: Graceful handling
    }
    _eventTarget.addEventListener(eventType, callback, options);
}

// BAD: No error handling for uninitialized system
function addEventListener(eventType, callback, options) {
    _eventTarget.addEventListener(eventType, callback, options); // BAD: Potential crash
}
```

---

### 3.4 External Integration

| **Rule ID**     | **Rationale**                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **3.4.1-3.4.3** | **Managed Cross-Module Communication:** Ensures proper tracking and cleanup of external event subscriptions to prevent memory leaks. |

#### 3.4.1 External Subscription Tracking

**Definitions:**

- External event subscriptions must be tracked using an array of unsubscribe functions.

**Example:**

```javascript
// RULE 3.4.1: Track external subscriptions with unsubscribe functions.
let _unsubscribeFunctions = []; // GOOD: Subscription tracking

function _subscribeToExternalEvents() {
    const handleExternalEvent = (event) => {
        LOG.debug('External event received:', event.type);
    };

    _global.addEventListener('externalEvent', handleExternalEvent);

    // GOOD: Track unsubscribe function
    const unsubscribe = () => {
        _global.removeEventListener('externalEvent', handleExternalEvent);
    };
    _unsubscribeFunctions.push(unsubscribe);
}

// BAD: No tracking of external subscriptions
_global.addEventListener('externalEvent', handler); // BAD: No cleanup tracking
```

#### 3.4.2 Unsubscribe Function Pattern

**Definitions:**

- Use closure-based unsubscribe functions that capture the specific event handler.

**Example:**

```javascript
// RULE 3.4.2: Use closure-based unsubscribe functions.
function _subscribeToExternalEvents() {
    function _handleExternalEvent(event) {
        // Event handling logic
    }

    // GOOD: Closure captures specific handler
    const unsubscribe = () => {
        _global.removeEventListener('externalEvent', _handleExternalEvent);
    };

    _global.addEventListener('externalEvent', _handleExternalEvent);
    _unsubscribeFunctions.push(unsubscribe);
}

// BAD: Incorrect unsubscribe pattern
const unsubscribe = _global.removeEventListener.bind(_global, 'externalEvent'); 
// BAD: Cannot reference the specific handler
```

#### 3.4.3 Mass Unsubscription

**Definitions:**

- All tracked unsubscribe functions must be executed during module destruction.

**Example:**

```javascript
// RULE 3.4.3: Execute all unsubscribe functions during destroy.
function destroy() {
    // GOOD: Mass unsubscription
    _unsubscribeFunctions.forEach(unsubscribe => {
        try {
            unsubscribe();
        } catch (error) {
            LOG.error('Unsubscribe function failed:', error);
        }
    });
    _unsubscribeFunctions = []; // GOOD: Clear tracking array
}

// BAD: No cleanup of external subscriptions
function destroy() {
    // BAD: External subscriptions remain active
}
```

---

### 3.5 Method Reliability

| **Rule ID**     | **Rationale**                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------ |
| **3.5.1-3.5.3** | **Predictable Module Behavior:** Ensures module methods behave consistently regardless of call frequency or order. |

#### 3.5.1 Idempotent Initialization

**Definitions:**

- The `init()` method must be **idempotent**, ensuring consistent state even if called multiple times.

**Example:**

```javascript
// RULE 3.5.1: init() must be idempotent.
function init() {
    if (_isInitialized) { // GOOD: Idempotency check
        LOG.warn('Already initialized');
        return false;
    }

    // Initialization logic...
    _isInitialized = true;
    return true;
}

// BAD: Non-idempotent init
function init() {
    // Will run multiple times if called again
    _setupEventListeners(); // BAD: Listeners attached multiple times
}
```

#### 3.5.2 Idempotent Destruction

**Definitions:**

- The `destroy()` method must be **idempotent**, handling multiple calls gracefully.

**Example:**

```javascript
// RULE 3.5.2: destroy() must be idempotent.
function destroy() {
    if (!_isInitialized && !_global.ExampleModule) {
        LOG.warn('Not initialized, skipping destroy.');
        return false; // GOOD: Idempotent check
    }

    // Cleanup logic...
    _isInitialized = false;
    return true;
}

// BAD: Non-idempotent destroy
function destroy() {
    // May throw errors or cause issues if called multiple times
    delete _global.ExampleModule; // BAD: May throw on second call
}
```

#### 3.5.3 Consistent Return Types

**Definitions:**

- Public methods must return consistent types in both success and failure paths.

**Example:**

```javascript
// RULE 3.5.3: Methods must return consistent types.
function init() {
    if (_isInitialized) {
        return false; // GOOD: Consistent boolean return
    }

    try {
        // Initialization...
        return true; // GOOD: Same type as failure
    } catch (error) {
        return false; // GOOD: Consistent return type
    }
}

// BAD: Inconsistent return types
function init() {
    if (_isInitialized) {
        return; // BAD: undefined vs boolean
    }
    return true; // BAD: Mixed return types
}
```

---

## IV. Safety & Error Handling

| **Rule ID** | **Rationale**                                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| **4.1.x**   | **Security & Input Safety:** Protects against XSS attacks and ensures safe handling of user-provided content.          |
| **4.2.x**   | **Robust Error Handling:** Provides comprehensive error management with graceful degradation and consistent behavior.  |
| **4.3.x**   | **Operational Reliability:** Ensures consistent function behavior and proper resource management under all conditions. |

---

### 4.1 Security & Input Safety

| **Rule ID**     | **Rationale**                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **4.1.1-4.1.3** | **XSS Prevention & Safe Content Handling:** Protects against injection attacks and ensures secure rendering of dynamic content. |

#### 4.1.1 HTML Escaping

**Definitions:**

- Implement Cross-Site Scripting (XSS) prevention for all dynamic content by escaping user-provided strings.

**Example:**

```javascript
// RULE 4.1.1: Escape user-provided strings to prevent XSS.
function _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

const userInput = event.detail.message;
const safeContent = _escapeHtml(userInput); // GOOD: Escaping applied
element.innerHTML = safeContent;

// BAD: Direct use of user input
element.innerHTML = userInput; // BAD: Prone to XSS attacks
```

#### 4.1.2 Safe Content Rendering

**Definitions:**

- Prefer using `textContent` over `innerHTML` where possible for rendering dynamic user-provided content.

**Example:**

```javascript
// RULE 4.1.2: Prefer textContent over innerHTML for user content.
// GOOD: Safe content rendering
element.textContent = userProvidedText;

// Also GOOD: Using escaped content when HTML is needed
const safeHtml = _escapeHtml(userProvidedText);
element.innerHTML = `<div class="message">${safeHtml}</div>`;

// BAD: Unsafe innerHTML with user content
element.innerHTML = `<div>${userProvidedText}</div>`; // BAD: XSS risk
```

#### 4.1.3 ARIA Label Safety

**Definitions:**

- Apply XSS prevention to dynamically set ARIA attributes containing user-provided content.

**Example:**

```javascript
// RULE 4.1.3: Secure ARIA attribute values.
// GOOD: Escaped ARIA labels
const userLabel = event.detail.ariaLabel;
element.setAttribute('aria-label', _escapeHtml(userLabel));

// BAD: Unsafe ARIA attribute setting
element.setAttribute('aria-label', userLabel); // BAD: Potential XSS
```

---

### 4.2 Robust Error Handling

| **Rule ID**     | **Rationale**                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **4.2.1-4.2.4** | **Comprehensive Error Management:** Ensures operations continue gracefully despite failures with proper logging and recovery. |

#### 4.2.1 Try/Catch for Risky Operations

**Definitions:**

- For operations that might fail (API calls, complex logic), use `try...catch` blocks to prevent function termination.

**Example:**

```javascript
// RULE 4.2.1: Use try...catch for operations that might fail.
function riskyOperation() {
    try {
        // Operation that might fail
        const result = _global.externalApi.fetchData();
        return { success: true, data: result }; // GOOD
    } catch (error) {
        LOG.error('Operation failed:', error);
        return { success: false, error: error.message }; // GOOD: Graceful failure
    }
}

// BAD: No error handling
function riskyOperation() {
    const result = _global.externalApi.fetchData(); // BAD: May throw and crash
    return result;
}
```

#### 4.2.2 Individual Element Error Handling

**Definitions:**

- For iterative DOM operations, use individual `try...catch` blocks within loops to prevent single element failure from stopping the entire loop.

**Example:**

```javascript
// RULE 4.2.2: Use individual try...catch for iterative DOM operations.
elements.forEach(element => {
    try {
        // GOOD: Isolated operation
        element.classList.add(CONFIG.classes.highlight);
    } catch (elementError) {
        LOG.warn('Element operation failed, skipping element:', elementError);
        // Continue with next element
    }
});

// BAD: Single failure stops entire loop
elements.forEach(element => {
    element.classList.add(CONFIG.classes.highlight); // BAD: One failure stops all
});
```

#### 4.2.3 Error Context Logging

**Definitions:**

- Always log errors with sufficient context including the MODULE constant and relevant operation details.

**Example:**

```javascript
// RULE 4.2.3: Log errors with context and MODULE constant.
try {
    riskyOperation();
} catch (error) {
    LOG.error('Data processing failed:', { 
        operation: 'processUserData',
        userId: user.id,
        error: error 
    }); // GOOD: Comprehensive context
}

// BAD: Minimal error information
try {
    riskyOperation();
} catch (error) {
    console.error('Failed'); // BAD: No context or MODULE
}
```

#### 4.2.4 Graceful Degradation

**Definitions:**

- Provide fallback behavior when non-critical operations fail to maintain module functionality.

**Example:**

```javascript
// RULE 4.2.4: Provide graceful degradation for non-critical failures.
function loadUserPreferences() {
    try {
        return JSON.parse(localStorage.getItem('userPrefs'));
    } catch (error) {
        LOG.warn('Failed to load user preferences, using defaults');
        return CONFIG.settings.defaultPreferences; // GOOD: Fallback
    }
}

// BAD: No fallback behavior
function loadUserPreferences() {
    return JSON.parse(localStorage.getItem('userPrefs')); // BAD: May break module
}
```

---

### 4.3 Operational Reliability

| **Rule ID**     | **Rationale**                                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **4.3.1-4.3.4** | **Consistent & Predictable Behavior:** Ensures functions behave reliably with consistent returns and proper resource management. |

#### 4.3.1 Return Consistency

**Definitions:**

- Functions with error handling must always return consistent types in both success and failure paths.

**Example:**

```javascript
// RULE 4.3.1: Functions must return consistent types.
function loadData() {
    try {
        const data = JSON.parse(localStorage.getItem('myKey'));
        return { success: true, data: data }; // GOOD: Object return
    } catch (error) {
        LOG.error('Data loading failed', error);
        return { success: false, error: error.message }; // GOOD: Same type
    }
}

// BAD: Inconsistent return types
function loadData() {
    try {
        const data = JSON.parse(localStorage.getItem('myKey'));
        return data; // BAD: Raw data (object/array)
    } catch (error) {
        return false; // BAD: Boolean vs object/array
    }
}
```

#### 4.3.2 Null-safe Object Access

**Definitions:**

- Use optional chaining and nullish coalescing for safe object property access.

**Example:**

```javascript
// RULE 4.3.2: Use safe object access patterns.
// GOOD: Safe property access
const userName = user?.profile?.name ?? 'Anonymous';
const setting = CONFIG?.settings?.timeout ?? 5000;

// BAD: Unsafe direct access
const userName = user.profile.name; // BAD: May throw
const setting = CONFIG.settings.timeout; // BAD: May be undefined
```

#### 4.3.3 Resource Cleanup in Finally

**Definitions:**

- Use `finally` blocks for cleanup operations that must run regardless of success or failure.

**Example:**

```javascript
// RULE 4.3.3: Use finally for guaranteed cleanup.
let resource = null;
try {
    resource = acquireResource();
    processResource(resource);
} catch (error) {
    LOG.error('Processing failed:', error);
} finally {
    if (resource) {
        releaseResource(resource); // GOOD: Always runs
    }
}

// BAD: Cleanup may be skipped
try {
    const resource = acquireResource();
    processResource(resource);
    releaseResource(resource); // BAD: May not run on error
} catch (error) {
    LOG.error('Processing failed:', error);
}
```

#### 4.3.4 Operation Timeout Handling

**Definitions:**

- Implement timeout mechanisms for operations that may hang or take excessively long.

**Example:**

```javascript
// RULE 4.3.4: Implement timeouts for potentially long operations.
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('Request timeout');
        }
        throw error;
    }
}

// BAD: No timeout handling
async function fetchData(url) {
    const response = await fetch(url); // BAD: May hang indefinitely
    return response;
}
```

---

## V. Language & Logging Standards

| **Rule ID** | **Rationale**                                                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **5.1.x**   | **Technical Communication:** Ensures consistent language usage for all technical content including code, comments, and logs. |
| **5.2.x**   | **Structured Logging:** Provides comprehensive, contextual logging across all levels with proper module identification.      |
| **5.3.x**   | **User Communication:** Manages all user-facing content through proper internationalization and localization.                |

---

### 5.1 Technical Communication

| **Rule ID**     | **Rationale**                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **5.1.1-5.1.3** | **Consistent Technical Language:** Maintains English-only technical content for universal understanding and maintainability. |

#### 5.1.1 English Technical Content

**Definitions:**

- All internal technical content (comments, private variable names, logs, and error messages) must be in English.

**Example:**

```javascript
// RULE 5.1.1: All technical content must be in English.
// GOOD: English variables, logs, and comments
let _isInitialized = false; // Tracks the module state
LOG.debug('Event listener initialized');
function _calculateTotalPrice() { /* ... */ }

// BAD: Non-English technical content
let _istInitialisiert = false; // BAD: German variable name
LOG.debug('Zuhörer initialisiert'); // BAD: German log message
function _berechneGesamtpreis() { /* ... */ } // BAD: German function name
```

#### 5.1.2 English Comment Standards

**Definitions:**

- Code comments must be in English and follow the capitalization rules from Rule 1.3.4.

**Example:**

```javascript
// RULE 5.1.2: Comments must be in English with proper capitalization.
// This comment describes the initialization process GOOD
function init() {
    const maxRetries = 3; // Maximum number of retry attempts GOOD

    // this comment uses lowercase BAD
    // Bad comment with period at the end. BAD
}
```

#### 5.1.3 English Error Messages

**Definitions:**

- All programmatic error messages and technical descriptions must be in English.

**Example:**

```javascript
// RULE 5.1.3: Error messages must be in English.
// GOOD: English error messages
throw new Error('Failed to initialize module: dependencies missing');
LOG.error('Network request timeout after 5000ms');

// BAD: Non-English error messages
throw new Error('Modul konnte nicht initialisiert werden'); // BAD: German
LOG.error('Netzwerk-Anfrage Zeitüberschreitung'); // BAD: German
```

---

### 5.2 Structured Logging

| **Rule ID**     | **Rationale**                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **5.2.1-5.2.4** | **Comprehensive Logging Infrastructure:** Provides consistent, contextual logging across all levels with proper module identification. |

#### 5.2.1 Four Log Levels Usage

**Definitions:**

- Utilize all four defined logging functions (`LOG.debug`, `LOG.info`, `LOG.warn`, and `LOG.error`) appropriately for different scenarios.

**Example:**

```javascript
// RULE 5.2.1: Use all four log levels appropriately.
LOG.debug('Detailed state information:', { state: _currentState }); // GOOD: Debug details
LOG.info('Module initialization completed successfully'); // GOOD: General information
LOG.warn('Deprecated API called, please update', { api: 'oldMethod' }); // GOOD: Warnings
LOG.error('Critical operation failed:', errorObject); // GOOD: Errors with context

// BAD: Inappropriate level usage
LOG.error('User clicked button'); // BAD: Use debug for user actions
LOG.info('Database connection failed'); // BAD: Use error for failures
```

#### 5.2.2 Context Object Parameter

**Definitions:**

- Support a second parameter for providing context via an object in all logging functions.

**Example:**

```javascript
// RULE 5.2.2: Use context objects for detailed logging.
// GOOD: Context objects for rich information
LOG.debug('User action processed', { 
    action: 'buttonClick', 
    elementId: 'submit-btn',
    timestamp: Date.now()
});

LOG.error('API request failed', {
    url: apiUrl,
    method: 'POST',
    status: response.status,
    error: error.message
});

// BAD: String concatenation without context
LOG.debug('User clicked button with id: ' + elementId); // BAD: Use context object
```

#### 5.2.3 Debug Level for Development

**Definitions:**

- Use `LOG.debug` for detailed development information, state dumps, and non-essential operational details.

**Example:**

```javascript
// RULE 5.2.3: Use debug level for development details.
// GOOD: Debug for detailed internal information
LOG.debug('Event system state:', {
    listeners: _eventTarget?.listenerCount,
    initialized: _isInitialized,
    currentState: _currentState
});

LOG.debug('DOM element found:', {
    selector: CONFIG.selectors.container,
    element: _containerElement,
    children: _containerElement?.children?.length
});

// BAD: Debug for user-facing information
LOG.debug('Welcome message displayed to user'); // BAD: Use info for user actions
```

#### 5.2.4 Info Level for User Actions

**Definitions:**

- Use `LOG.info` for user-initiated actions, module lifecycle events, and important state changes.

**Example:**

```javascript
// RULE 5.2.4: Use info level for user actions and lifecycle.
// GOOD: Info for user actions and important events
LOG.info('User opened settings panel');
LOG.info('Module initialized successfully');
LOG.info('Data saved to storage', { itemCount: data.length });

// BAD: Info for internal technical details
LOG.info('Event listener count: ' + count); // BAD: Use debug for technical details
```

---

### 5.3 User Communication

| **Rule ID**     | **Rationale**                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **5.3.1-5.3.4** | **Localized User Experience:** Ensures all user-facing content is properly internationalized and accessible across languages. |

#### 5.3.1 i18n for User Content

**Definitions:**

- All messages addressed to the end-user must be loaded via the Internationalization (`i18n`) approach.

**Example:**

```javascript
// RULE 5.3.1: Use i18n for all user-facing content.
// GOOD: i18n for user text
element.textContent = _t('welcomeMessage');
button.setAttribute('aria-label', _t('closeButton'));
toast.show(_t('settingsSaved'));

// BAD: Hardcoded user-facing strings
element.textContent = 'Willkommen'; // BAD: Hardcoded German
button.setAttribute('aria-label', 'Schließen'); // BAD: Hardcoded German
```

#### 5.3.2 ARIA Attribute Internationalization

**Definitions:**

- Load any user-facing ARIA text (`aria-label`, `aria-description`, etc.) via the i18n helper.

**Example:**

```javascript
// RULE 5.3.2: Use i18n for ARIA attributes.
// GOOD: Internationalized ARIA attributes
element.setAttribute('aria-label', _t('navigationMenu'));
element.setAttribute('aria-description', _t('mainNavigationDescription'));

// BAD: Hardcoded ARIA attributes
element.setAttribute('aria-label', 'Hauptmenü'); // BAD: Hardcoded German
```

#### 5.3.3 Dynamic Content Internationalization

**Definitions:**

- Use i18n for dynamically generated user content including templates, messages, and notifications.

**Example:**

```javascript
// RULE 5.3.3: Use i18n in dynamic content generation.
// GOOD: i18n in templates and dynamic content
const message = `${_t('hello')} ${userName}, ${_t('welcomeBack')}`;
const htmlTemplate = `
    <div class="notification">
        <span>${_t('newMessage')}</span>
        <button aria-label="${_t('closeNotification')}">×</button>
    </div>
`;

// BAD: Hardcoded dynamic content
const message = `Hallo ${userName}, willkommen zurück`; // BAD: Hardcoded German
```

#### 5.3.4 No i18n for Technical Logs

**Definitions:**

- Do NOT use i18n in technical logging functions (`LOG.debug`, `LOG.info`, `LOG.warn`, `LOG.error`).

**Example:**

```javascript
// RULE 5.3.4: Don't use i18n for technical logs.
// GOOD: English logs without i18n
LOG.info('User preferences loaded successfully');
LOG.error('Database connection timeout');

// BAD: i18n in logging
LOG.info(_t('preferencesLoaded')); // BAD: Use English for logs
LOG.error(_t('connectionTimeout')); // BAD: Logs must be in English
```

---

## VI. UI, Styling & Accessibility

| **Rule ID** | **Rationale**                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| **6.1.x**   | **Separation of Concerns:** Maintains clear separation between presentation (CSS) and behavior (JavaScript). |
| **6.2.x**   | **State Management:** Provides consistent patterns for managing UI states through CSS classes.               |
| **6.3.x**   | **Event Handling Performance:** Optimizes event handling for better performance and maintainability.         |
| **6.4.x**   | **Keyboard Accessibility:** Ensures WCAG compliance through comprehensive keyboard navigation support.       |
| **6.5.x**   | **ARIA & Screen Reader Support:** Provides proper accessibility information for assistive technologies.      |
| **6.6.x**   | **DOM Strategy & Performance:** Optimizes DOM interaction with static-first approach and proper cleanup.     |

---

### 6.1 Separation of Concerns

| **Rule ID**     | **Rationale**                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **6.1.1-6.1.2** | **Clear Presentation-Behavior Separation:** Ensures styling remains in CSS while JavaScript manages behavior and state. |

#### 6.1.1 CSS-Only Styling

**Definitions:**

- All visual styling must reside in **CSS**; JavaScript should never contain styling properties.

**Example:**

```javascript
// RULE 6.1.1: All visual styling must reside in CSS.
// GOOD: Style manipulation via CSS classes
element.classList.add(CONFIG.classes.active);
element.classList.remove(CONFIG.classes.hidden);

// BAD: Direct style manipulation
element.style.opacity = 1; // BAD: Prohibited
element.style.color = 'red'; // BAD: Prohibited
element.style.display = 'none'; // BAD: Use CSS classes
```

#### 6.1.2 JavaScript Role Limitation

**Definitions:**

- JavaScript's role is strictly limited to toggling state classes, managing behavior, and handling data.

**Example:**

```javascript
// RULE 6.1.2: JavaScript only toggles classes and manages behavior.
// GOOD: Class-based state management
element.classList.toggle(CONFIG.classes.hidden, !isVisible);
element.classList.add(CONFIG.classes.loading);

// BAD: JavaScript manages presentation logic
if (_currentState === 'active') {
    element.style.height = '100px'; // BAD: CSS should define height
    element.style.backgroundColor = '#f00'; // BAD: Use CSS classes
}
```

---

### 6.2 State Management

| **Rule ID**     | **Rationale**                                                                                       |
| --------------- | --------------------------------------------------------------------------------------------------- |
| **6.2.1-6.2.3** | **Consistent State Representation:** Provides clear, semantic state management through CSS classes. |

#### 6.2.1 Single State Classes

**Definitions:**

- Use single, clear **state classes** (e.g., `.is-active`, `.has-error`) to manage states.

**Example:**

```javascript
// RULE 6.2.1: Use single state classes for state management.
// GOOD: Single class controls all style changes
element.classList.add(CONFIG.classes.hasError);
element.classList.remove(CONFIG.classes.isLoading);

// BAD: Multiple classes for single state
element.classList.add('error-border'); // BAD: Use single state class
element.classList.add('error-text-color'); // BAD: Use single state class
```

#### 6.2.2 State Class Semantics

**Definitions:**

- State classes should use semantic naming that describes the state, not the visual appearance.

**Example:**

```javascript
// RULE 6.2.2: Use semantic state class names.
// GOOD: Semantic state names
CONFIG.classes = {
    isActive: 'is-active', // GOOD: Describes state
    hasError: 'has-error', // GOOD: Describes condition
    isLoading: 'is-loading' // GOOD: Describes process
};

// BAD: Visual appearance names
CONFIG.classes = {
    redBackground: 'red-bg', // BAD: Describes appearance
    bigText: 'big-text' // BAD: Describes visual result
};
```

#### 6.2.3 State Class Application

**Definitions:**

- Apply state classes to appropriate container elements to leverage CSS inheritance where possible.

**Example:**

```javascript
// RULE 6.2.3: Apply state classes to container elements.
// GOOD: State on container for inheritance
_containerElement.classList.add(CONFIG.classes.hasError);
// CSS can then style children: .has-error .input, .has-error .message

// BAD: State on individual elements
inputElement.classList.add(CONFIG.classes.hasError); // BAD: Less maintainable
messageElement.classList.add(CONFIG.classes.hasError); // BAD: Repetitive
```

---

### 6.3 Event Handling Performance

| **Rule ID**     | **Rationale**                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| **6.3.1-6.3.3** | **Efficient Event Management:** Optimizes event handling for performance and maintainability through delegation. |

#### 6.3.1 Event Delegation

**Definitions:**

- Utilize **Event Delegation** whenever possible on a container element to reduce the number of event listeners.

**Example:**

```javascript
// RULE 6.3.1: Use event delegation for multiple elements.
// GOOD: Single delegated listener
_containerElement.addEventListener('click', _handleEventDelegation);

function _handleEventDelegation(event) {
    const button = event.target.closest(CONFIG.selectors.button);
    if (button) {
        _handleButtonClick(button);
    }
}

// BAD: Individual listeners on many elements
document.querySelectorAll(CONFIG.selectors.button).forEach(btn => {
    btn.addEventListener('click', _handleButtonClick); // BAD: High memory overhead
});
```

#### 6.3.2 Delegation Performance Rationale

**Definitions:**

- Document the performance rationale for event delegation in relevant code sections.

**Example:**

```javascript
// RULE 6.3.2: Document event delegation rationale.
// ========================================================================
// EVENT HANDLERS
// Rationale: Event delegation reduces memory consumption by attaching
// a single listener to the container instead of multiple individual
// listeners. This improves performance, especially for dynamic content.
// ========================================================================

function _handleEventDelegation(event) {
    // Delegation logic here
}
```

#### 6.3.3 Keyboard Event Delegation

**Definitions:**

- Apply event delegation to keyboard events for consistent accessibility handling.

**Example:**

```javascript
// RULE 6.3.3: Use delegation for keyboard events.
// GOOD: Delegated keyboard handling
_containerElement.addEventListener('keydown', _handleKeyboardDelegation);

function _handleKeyboardDelegation(event) {
    const interactiveElement = event.target.closest(CONFIG.selectors.interactive);
    if (interactiveElement) {
        _handleInteractiveKeydown(event, interactiveElement);
    }
}

// BAD: Individual keyboard listeners
document.querySelectorAll(CONFIG.selectors.interactive).forEach(el => {
    el.addEventListener('keydown', _handleKeydown); // BAD: Inefficient
});
```

---

### 6.4 Keyboard Accessibility

| **Rule ID**     | **Rationale**                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------- |
| **6.4.1-6.4.3** | **WCAG Keyboard Compliance:** Ensures full keyboard operability for all interactive elements. |

#### 6.4.1 Keyboard Activation

**Definitions:**

- Ensure **WCAG compliance** by implementing keyboard support using `CONFIG` references for Enter/Space activation.

**Example:**

```javascript
// RULE 6.4.1: Implement Enter/Space activation using CONFIG.
function _handleKeyboardEvents(event) {
    // GOOD: Using CONFIG references
    if (event.key === CONFIG.settings.shortcutEnter || 
        event.key === CONFIG.settings.shortcutSpace) {
        event.preventDefault();
        _activateElement(event.target);
    }
}

// BAD: Hardcoded key values
if (event.key === 'Enter' || event.key === ' ') { // BAD: Use CONFIG
    // Handle activation
}
```

#### 6.4.2 Keyboard Dismissal

**Definitions:**

- Implement Escape key dismissal for dialogs, menus, and modal content using CONFIG references.

**Example:**

```javascript
// RULE 6.4.2: Implement Escape key dismissal.
function _handleKeyboardEvents(event) {
    // GOOD: Escape dismissal using CONFIG
    if (event.key === CONFIG.settings.shortcutEscape) {
        event.preventDefault();
        _closeDialog();
    }
}

// BAD: Hardcoded Escape handling
if (event.key === 'Escape') { // BAD: Use CONFIG
    _closeDialog();
}
```

#### 6.4.3 Focus Management

**Definitions:**

- Manage focus properly for keyboard users, including focus trapping in modal contexts.

**Example:**

```javascript
// RULE 6.4.3: Implement proper focus management.
function _openModal() {
    // GOOD: Save current focus and move to modal
    _previousActiveElement = document.activeElement;
    _modalElement.focus();

    // GOOD: Trap focus within modal
    _modalElement.addEventListener('keydown', _trapFocus);
}

function _closeModal() {
    // GOOD: Restore focus when closing
    if (_previousActiveElement) {
        _previousActiveElement.focus();
    }
}
```

---

### 6.5 ARIA & Screen Reader Support

| **Rule ID**     | **Rationale**                                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **6.5.1-6.5.4** | **Assistive Technology Support:** Provides proper semantic information for screen readers and other assistive technologies. |

#### 6.5.1 ARIA Role Assignment

**Definitions:**

- Utilize correct **ARIA roles** (`role`, `aria-live`, etc.) for accessibility compliance.

**Example:**

```javascript
// RULE 6.5.1: Set appropriate ARIA roles.
// GOOD: Correct ARIA role assignment
element.setAttribute('role', 'button');
container.setAttribute('role', 'dialog');
list.setAttribute('role', 'listbox');

// BAD: Missing or incorrect roles
element.setAttribute('role', 'clickable'); // BAD: Not valid ARIA role
```

#### 6.5.2 ARIA Label Internationalization

**Definitions:**

- Load any user-facing ARIA text via the i18n helper (`_t()`).

**Example:**

```javascript
// RULE 6.5.2: Use i18n for ARIA labels and descriptions.
// GOOD: Internationalized ARIA attributes
element.setAttribute('aria-label', _t('closeDialog'));
element.setAttribute('aria-description', _t('dialogDescription'));

// BAD: Hardcoded ARIA text
element.setAttribute('aria-label', 'Schließen'); // BAD: Hardcoded German
```

#### 6.5.3 ARIA Live Regions

**Definitions:**

- Use `aria-live` attributes for dynamic content updates that should be announced by screen readers.

**Example:**

```javascript
// RULE 6.5.3: Use aria-live for dynamic content.
// GOOD: Live regions for dynamic updates
statusElement.setAttribute('aria-live', 'polite');
notificationElement.setAttribute('aria-live', 'assertive');

// Update content will be announced
statusElement.textContent = _t('dataLoaded');

// BAD: Dynamic content without live regions
statusElement.textContent = _t('dataLoaded'); // BAD: May not be announced
```

#### 6.5.4 ARIA Label Length

**Definitions:**

- Values for `aria-label` shall not have more than 150 characters.

**Example:**

```javascript
// RULE 6.5.4: Keep aria-label under 150 characters.
// GOOD: Concise ARIA labels
element.setAttribute('aria-label', _t('navigationMenu')); // Short and descriptive

// BAD: Excessively long ARIA labels
element.setAttribute('aria-label', 
    'This is the main navigation menu containing links to all sections of the website including home, about, services, contact, and support pages. Use tab to navigate through the menu items.' 
); // BAD: Too long (over 150 chars)
```

---

### 6.6 DOM Strategy & Performance

| **Rule ID**     | **Rationale**                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **6.6.1-6.6.3** | **Optimized DOM Interaction:** Prioritizes static HTML usage with dynamic fallbacks for better performance and resilience. |

#### 6.6.1 Static HTML Preference

**Definitions:**

- Prefer using existing static HTML elements over dynamic creation whenever possible.

**Example:**

```javascript
// RULE 6.6.1: Prefer static HTML over dynamic creation.
function _setupDOM() {
    // GOOD: Look for static container first
    _containerElement = document.querySelector(CONFIG.selectors.container);

    if (!_containerElement) {
        LOG.warn('No static container found, creating dynamic fallback');
        _containerElement = _createDynamicContainer();
    } else {
        LOG.debug('Using existing static container');
    }
}

// BAD: Always creating dynamic elements
function _setupDOM() {
    _containerElement = document.createElement('div'); // BAD: No static check
}
```

#### 6.6.2 Dynamic Fallback Creation

**Definitions:**

- When static HTML doesn't exist, provide a dynamic creation fallback with proper error handling.

**Example:**

```javascript
// RULE 6.6.2: Provide dynamic fallback with error handling.
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
        return null; // GOOD: Graceful failure
    }
}

// BAD: No error handling in dynamic creation
function _createDynamicContainer() {
    const container = document.createElement('div');
    document.body.appendChild(container); // BAD: May throw
    return container;
}
```

#### 6.6.3 Element Reuse Strategy

**Definitions:**

- For existing static elements, reuse and show them instead of creating duplicates. Hide rather than remove static elements during cleanup.

**Example:**

```javascript
// RULE 6.6.3: Reuse and hide static elements instead of removing.
// GOOD: Reuse during initialization
if (_containerElement) {
    _containerElement.classList.remove(CONFIG.classes.hidden);
}

// GOOD: Hide during destruction instead of removing
function destroy() {
    if (_containerElement) {
        _containerElement.classList.add(CONFIG.classes.hidden); // GOOD: Preserves static HTML
    }
}

// BAD: Removing static elements
function destroy() {
    if (_containerElement) {
        _containerElement.remove(); // BAD: Destroys reusable static HTML
    }
}
```

---

## VII. Performance & Maintenance

| **Rule ID** | **Rationale**                                                                                                        |
| ----------- | -------------------------------------------------------------------------------------------------------------------- |
| **7.1.x**   | **Comprehensive Documentation:** Ensures clear, consistent code documentation for maintainability and collaboration. |
| **7.2.x**   | **Debug & Inspection:** Provides controlled access to internal state for development and troubleshooting.            |
| **7.3.x**   | **State Management:** Establishes consistent patterns for module state tracking and exposure.                        |

---

### 7.1 Comprehensive Documentation

| **Rule ID**     | **Rationale**                                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **7.1.1-7.1.3** | **Clear Code Understanding:** Provides complete function documentation with parameters, types, and examples for maintainability. |

#### 7.1.1 JSDoc Parameter Documentation

**Definitions:**

- All functions must have **comprehensive JSDoc** documentation, including parameters with types and descriptions.

**Example:**

```javascript
// RULE 7.1.1: JSDoc must include parameters and types.
/**
 * Processes user data and applies validation rules.
 * @param {string} userId - The unique identifier for the user.
 * @param {Object} userData - The user data object to process.
 * @param {number} [timeout=5000] - Optional timeout in milliseconds.
 * @returns {boolean} True if processing succeeded, false otherwise.
 */
function processUserData(userId, userData, timeout = 5000) {
    // Implementation...
    return true;
}

// BAD: Missing or incomplete documentation
function processUserData(userId, userData, timeout) { // BAD: No JSDoc
    return true;
}
```

#### 7.1.2 Default Value Demonstration

**Definitions:**

- JSDoc must demonstrate default parameter values using bracket notation.

**Example:**

```javascript
// RULE 7.1.2: Demonstrate default values in JSDoc.
/**
 * Initializes the module with optional configuration.
 * @param {Object} [options={}] - Configuration options.
 * @param {number} [options.timeout=3000] - Operation timeout.
 * @param {boolean} [options.debug=false] - Enable debug mode.
 * @returns {boolean} Success status.
 */
function init(options = {}) {
    const { timeout = 3000, debug = false } = options;
    // Implementation...
    return true;
}

// BAD: No default value documentation
/**
 * @param {Object} options - Configuration options. BAD: No default shown
 */
```

#### 7.1.3 Performance Rationale Documentation

**Definitions:**

- Document performance rationale for specific implementation choices in relevant code sections.

**Example:**

```javascript
// RULE 7.1.3: Document performance rationale.
// ========================================================================
// EVENT HANDLERS
// Rationale: Event delegation is used here to reduce the number of event 
// listeners from O(n) to O(1), minimizing memory consumption and improving
// performance for dynamically added elements.
// ========================================================================

function _handleEventDelegation(event) {
    // Single listener handles all similar events
    const target = event.target.closest(CONFIG.selectors.button);
    if (target) {
        _handleButtonAction(target);
    }
}

// BAD: No performance documentation
function _handleButtonClick(event) { // BAD: No rationale provided
    // Implementation without context
}
```

---

### 7.2 Debug & Inspection

| **Rule ID**     | **Rationale**                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| **7.2.1-7.2.4** | **Controlled Debug Access:** Provides safe, read-only access to internal state for development and troubleshooting. |

#### 7.2.1 Debug API Structure

**Definitions:**

- Provide a standardized **`_debug`** object within the public API to expose internal state for testing and debugging tools.

**Example:**

```javascript
// RULE 7.2.1: Provide standardized _debug object in public API.
_global.ExampleModule = {
    // ... public methods ...
    _debug: !_global.BUILD_INFO?.debugMode ? undefined : { // GOOD: Conditional
        // Debug contents...
    }
};

// BAD: No debug API or inconsistent naming
_global.ExampleModule = {
    // BAD: No debug access
    debugInfo: { /* ... */ } // BAD: Non-standard name
};
```

#### 7.2.2 Debug Object Conditional Exposure

**Definitions:**

- The `_debug` object should only be exposed when debug mode is active.

**Example:**

```javascript
// RULE 7.2.2: Conditionally expose debug object based on debug mode.
_global.ExampleModule = {
    // ... public API ...
    _debug: !_global.BUILD_INFO?.debugMode ? undefined : { // GOOD: Conditional
        CONFIG: CONFIG,
        currentState: () => _currentState,
        isInitialized: () => _isInitialized
    }
};

// BAD: Always exposing debug information
_global.ExampleModule = {
    _debug: { // BAD: Always available, even in production
        sensitiveData: internalState // BAD: Security risk
    }
};
```

#### 7.2.3 Read-Only Debug Access

**Definitions:**

- The `_debug` object must be read-only (i.e., contain functions that return internal values).

**Example:**

```javascript
// RULE 7.2.3: Use functions for read-only debug access.
_global.ExampleModule = {
    _debug: !_global.BUILD_INFO?.debugMode ? undefined : {
        // GOOD: Function wrappers for read-only access
        currentState: () => _currentState,
        isInitialized: () => _isInitialized,
        activeElements: () => Array.from(_activeElements), // GOOD: Immutable copy

        // GOOD: Expose CONFIG directly (already immutable)
        CONFIG: CONFIG
    }
};

// BAD: Direct mutable access
_global.ExampleModule = {
    _debug: {
        currentState: _currentState, // BAD: Direct mutable reference
        activeElements: _activeElements // BAD: Mutable Set exposed directly
    }
};
```

#### 7.2.4 Private Function Exposure

**Definitions:**

- Only in the API's `_debug` object is it allowed to expose private functions via wrapper functions.

**Example:**

```javascript
// RULE 7.2.4: Expose private functions via debug wrappers.
_global.ExampleModule = {
    _debug: !_global.BUILD_INFO?.debugMode ? undefined : {
        // GOOD: Private function via wrapper
        validateState: (state) => _validateState(state),
        internalProcess: (...args) => _internalProcess(...args)
    }
};

// BAD: Direct private function exposure
_global.ExampleModule = {
    _debug: {
        _validateState: _validateState // BAD: Direct private function exposure
    }
};
```

---

### 7.3 State Management

| **Rule ID**     | **Rationale**                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| **7.3.1-7.3.3** | **Consistent State Tracking:** Provides reliable state management with proper exposure for external monitoring. |

#### 7.3.1 Initialization State Variable

**Definitions:**

- The module must use the private variable `_isInitialized` to track initialization state.

**Example:**

```javascript
// RULE 7.3.1: Use _isInitialized to track module state.
// GOOD: Standard initialization tracking
let _isInitialized = false;

function init() {
    if (_isInitialized) {
        LOG.warn('Already initialized');
        return false;
    }
    // Initialization logic...
    _isInitialized = true;
    return true;
}

// BAD: No initialization state tracking
let initialized = false; // BAD: Wrong naming convention
// OR no state tracking at all
```

#### 7.3.2 State Variable Exposure

**Definitions:**

- Expose `_isInitialized` via an accessor function in the public API for external checking.

**Example:**

```javascript
// RULE 7.3.2: Expose _isInitialized via accessor function.
_global.ExampleModule = {
    // ... other API methods ...
    isInitialized: () => _isInitialized, // GOOD: Read-only accessor

    // Also expose via debug for detailed access
    _debug: !_global.BUILD_INFO?.debugMode ? undefined : {
        isInitialized: () => _isInitialized // GOOD: Debug access
    }
};

// BAD: Direct variable exposure or no exposure
_global.ExampleModule = {
    isInitialized: _isInitialized // BAD: Direct mutable reference
};
```

#### 7.3.3 State Consistency

**Definitions:**

- Ensure state variables are consistently updated and reflect the actual module condition.

**Example**:

```javascript
// RULE 7.3.3: Maintain state variable consistency.
function init() {
    if (_isInitialized) return false;

    try {
        // Set state BEFORE operations that might fail
        _isInitialized = true; // GOOD: Set state early

        // Perform initialization that might throw
        _setupComplexDependencies();

        return true;
    } catch (error) {
        // Reset state on failure
        _isInitialized = false; // GOOD: Consistent state on error
        LOG.error('Initialization failed:', error);
        return false;
    }
}

// BAD: Inconsistent state management
function init() {
    try {
        _setupComplexDependencies();
        _isInitialized = true; // BAD: State set after risky operations
        return true;
    } catch (error) {
        // BAD: State not reset on failure
        LOG.error('Initialization failed:', error);
        return false;
    }
}
```

---

## VIII. Cleanup & Public API Design

| **Rule ID** | **Rationale**                                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| **8.1.x**   | **Lifecycle Management:** Provides complete resource cleanup and state reset for proper module lifecycle.              |
| **8.2.x**   | **Memory Management:** Prevents memory leaks in Single Page Applications through proper reference cleanup.             |
| **8.3.x**   | **Public Interface Design:** Defines consistent, discoverable public API structure with proper functionality grouping. |
| **8.4.x**   | **Module Finalization:** Ensures proper module bootstrap completion and loading notification.                          |

---

### 8.1 Lifecycle Management

| **Rule ID**     | **Rationale**                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **8.1.1-8.1.3** | **Complete Resource Cleanup:** Ensures all resources are properly released and state is reset during module destruction. |

#### 8.1.1 Public Destroy Method

**Definitions:**

- Provide a public API **`destroy()`** method for complete module cleanup.

**Example:**

```javascript
// RULE 8.1.1: Provide public destroy() method.
/**
 * Completely cleans up the module, removing listeners and API exposure.
 * @returns {boolean} True if destruction was successful.
 */
function destroy() {
    if (!_isInitialized) {
        LOG.warn('Not initialized, skipping cleanup.');
        return false;
    }

    try {
        _cleanupEventListeners();
        _unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
        _unsubscribeFunctions = [];
        _resetDOM();
        _clearState();

        _isInitialized = false;
        LOG.info('Destroyed successfully');
        return true;
    } catch (error) {
        LOG.error('Destruction failed:', error);
        return false;
    }
}

// BAD: No cleanup method or private only
function _cleanup() { // BAD: Private, not part of public API
    // Cleanup logic...
}
```

#### 8.1.2 Idempotent Destruction

**Definitions:**

- The `destroy()` method must be **idempotent** (Rule 3.5.2), handling multiple calls gracefully.

**Example:**

```javascript
// RULE 8.1.2: destroy() must be idempotent.
function destroy() {
    // GOOD: Idempotency check
    if (!_isInitialized && !_global.ExampleModule) {
        LOG.debug('Module not initialized, nothing to destroy');
        return true;
    }

    // Cleanup logic that can run multiple times safely...
    _isInitialized = false;
    return true;
}

// BAD: Non-idempotent destruction
function destroy() {
    delete _global.ExampleModule; // BAD: Throws on second call
    // Other cleanup that may fail if called multiple times
}
```

#### 8.1.3 State Reset

**Definitions:**

- The `destroy()` method must reset all internal state to initial values.

**Example:**

```javascript
// RULE 8.1.3: Reset all internal state during destruction.
function destroy() {
    if (!_isInitialized) return false;

    try {
        // GOOD: Reset all state variables
        _isInitialized = false;
        _currentState = CONFIG.constants.states.INACTIVE;
        _activeElements.clear();
        _pendingOperations = 0;
        _lastActionTime = null;

        LOG.info('State reset completed');
        return true;
    } catch (error) {
        LOG.error('State reset failed:', error);
        return false;
    }
}

// BAD: Incomplete state reset
function destroy() {
    _isInitialized = false;
    // BAD: _currentState, _activeElements, etc. not reset
}
```

---

### 8.2 Memory Management

| **Rule ID**     | **Rationale**                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------- |
| **8.2.1-8.2.4** | **Leak Prevention:** Ensures all references are properly cleared to prevent memory leaks in SPAs. |

#### 8.2.1 Listener Removal

**Definitions:**

- The `destroy()` method must remove all internal DOM event listeners.

**Example:**

```javascript
// RULE 8.2.1: Remove all DOM event listeners during destruction.
function destroy() {
    if (!_isInitialized) return false;

    // GOOD: Remove all registered listeners
    _containerElement.removeEventListener('click', _handleClick);
    _containerElement.removeEventListener('keydown', _handleKeydown);
    document.removeEventListener('scroll', _handleScroll);

    // Also remove delegated listeners
    document.removeEventListener('click', _handleDelegatedClick);

    return true;
}

// BAD: Missing listener cleanup
function destroy() {
    _isInitialized = false;
    // BAD: Event listeners remain attached
}
```

#### 8.2.2 External Unsubscription

**Definitions:**

- Execute all external unsubscribe functions tracked per Rule 3.4 during destruction.

**Example:**

```javascript
// RULE 8.2.2: Execute all external unsubscribe functions.
function destroy() {
    if (!_isInitialized) return false;

    // GOOD: Mass external unsubscription
    _unsubscribeFunctions.forEach(unsubscribe => {
        try {
            unsubscribe();
        } catch (error) {
            LOG.error('Unsubscribe function failed:', error);
        }
    });
    _unsubscribeFunctions = []; // GOOD: Clear tracking array

    return true;
}

// BAD: No external subscription cleanup
function destroy() {
    // BAD: External subscriptions remain active
    // Memory leaks from other modules
}
```

#### 8.2.3 Reference Clearing

**Definitions:**

- Clear all DOM element or container references (`null` or `undefined`) to allow garbage collection.

**Example:**

```javascript
// RULE 8.2.3: Clear all DOM references.
function destroy() {
    if (!_isInitialized) return false;

    // GOOD: Clear all references
    _containerElement = null;
    _eventTarget = null;
    _activeButton = null;
    _formElements = null;
    _dynamicContent = null;

    return true;
}

// BAD: Retaining DOM references
function destroy() {
    _isInitialized = false;
    // BAD: _containerElement, _eventTarget still hold references
    // Prevents garbage collection
}
```

#### 8.2.4 Static Element Preservation

**Definitions:**

- Hide rather than remove static elements during cleanup to preserve reusable HTML.

**Example:**

```javascript
// RULE 8.2.4: Hide static elements instead of removing them.
function destroy() {
    if (!_isInitialized) return false;

    // GOOD: Hide static elements for reuse
    if (_containerElement && _containerElement.id === 'static-container') {
        _containerElement.classList.add(CONFIG.classes.hidden);
    }

    // Only remove dynamically created elements
    if (_dynamicOverlay && !_dynamicOverlay.id) {
        _dynamicOverlay.remove();
    }

    return true;
}

// BAD: Removing static HTML elements
function destroy() {
    if (_containerElement) {
        _containerElement.remove(); // BAD: Destroys reusable static HTML
    }
}
```

---

### 8.3 Public Interface Design

| **Rule ID**     | **Rationale**                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **8.3.1-8.3.4** | **Consistent API Structure:** Provides well-organized, discoverable public interface with proper functionality grouping. |

#### 8.3.1 Core API Structure

**Definitions:**

- The public API must include core functionality methods: `init()`, `destroy()`, and essential operations.

**Example:**

```javascript
// RULE 8.3.1: Include core functionality in public API.
_global.ExampleModule = {
    // Core lifecycle
    init: init,
    destroy: destroy,

    // Core operations
    toggleState: toggleState,
    updateData: updateData,
    refresh: refresh
};

// BAD: Incomplete core API
_global.ExampleModule = {
    init: init
    // BAD: Missing destroy and essential operations
};
```

#### 8.3.2 Event System Exposure

**Definitions:**

- Expose event system methods: `addEventListener`, `removeEventListener`, and event constants.

**Example:**

```javascript
// RULE 8.3.2: Expose event system in public API.
_global.ExampleModule = {
    // ... core methods ...

    // Event system
    addEventListener: addEventListener,
    removeEventListener: removeEventListener,
    dispatchEvent: dispatchModuleEvent,

    // Event constants for discovery
    EVENTS: CONFIG.constants.events
};

// BAD: No event system exposure
_global.ExampleModule = {
    init: init,
    destroy: destroy
    // BAD: Cannot listen to module events
};
```

#### 8.3.3 Utility Method Grouping

**Definitions:**

- Group utility methods together in the API structure for better discoverability.

**Example:**

```javascript
// RULE 8.3.3: Group utility methods in API.
_global.ExampleModule = {
    // Core lifecycle
    init: init,
    destroy: destroy,

    // Utility methods
    getState: () => _currentState,
    getVersion: () => CONFIG.constants.VERSION,
    isValid: (input) => _validateInput(input),
    reset: resetToDefaults
};

// BAD: Disorganized method placement
_global.ExampleModule = {
    init: init,
    getState: () => _currentState, // BAD: Mixed with core methods
    destroy: destroy,
    isValid: (input) => _validateInput(input) // BAD: Scattered utilities
};
```

#### 8.3.4 Constant Exposure

**Definitions:**

- Expose useful constants for external consumption via the public API.

**Example:**

```javascript
// RULE 8.3.4: Expose constants via public API.
_global.ExampleModule = {
    // ... methods ...

    // Constants for external use
    EVENTS: CONFIG.constants.events,
    STATES: CONFIG.constants.states,
    CONSTANTS: {
        VERSION: CONFIG.constants.VERSION,
        DEFAULT_TIMEOUT: CONFIG.settings.defaultTimeout,
        MAX_RETRIES: CONFIG.settings.maxRetries
    }
};

// BAD: No constant exposure
_global.ExampleModule = {
    init: init,
    destroy: destroy
    // BAD: External code must hardcode values
};
```

#### 8.3.5. Simple API Construction

**Definition:**

- The API construction may only contain references to functions or very basic one-line functions.

**Example:**

```javascript
_global[CONFIG.constants.moduleName] = {
    /* ... */
    queryElement: queryElement, // GOOD: Reference
    applyVisualState: applyVisualState,
    setElementState: (param) => setElementState('fixedValue', param), // GOOD: Simple one line funcition
    toggleElementVisibility: (element, show) => { // BAD: complex function
        if (!element) return { success: false, error: 'Element not provided' };
        element.classList.toggle(CONFIG.classes.hidden, !show);
        return { success: true };
    },
    /* ... */
}
```

---

### 8.4 Module Finalization

| **Rule ID**     | **Rationale**                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **8.4.1-8.4.3** | **Proper Module Bootstrap:** Ensures module is fully prepared before initialization and properly announced when ready. |

#### 8.4.1 Loaded Function Execution

**Definitions:**

- Call the `_loaded()` helper function at the very end of the IIFE to ensure event system is running before initialization.

**Example:**

```javascript
// RULE 8.4.1: Call _loaded() before IIFE final message.
function _loaded() {
    _initEventSystem(); // Ensure event system is ready
    LOG.debug('Module loaded, event system ready');
}

// At the end of IIFE, before final log:
_loaded(); // GOOD: Prepare module before initialization

// BAD: Missing _loaded() call or wrong placement
// Event system may not be ready for INITIALIZED event listeners
```

#### 8.4.2 API Removal

**Definitions:**

- The `destroy()` method must remove the public API object from the `_global` object.

**Example:**

```javascript
// RULE 8.4.2: Remove public API from _global during destruction.
function destroy() {
    if (!_isInitialized) return false;

    try {
        // ... cleanup logic ...

        // GOOD: Remove global API reference
        delete _global.ExampleModule;

        LOG.info('API removed from global scope');
        return true;
    } catch (error) {
        LOG.error('API removal failed:', error);
        return false;
    }
}

// BAD: API remains in global scope
function destroy() {
    _isInitialized = false;
    // BAD: _global.ExampleModule still exists
    // Prevents proper cleanup and reinitialization
}
```

#### 8.4.3 Final Loading Message

**Definitions:**

- Include a final `LOG.info` message at the end of IIFE execution confirming module loading and exposure.

**Example:**

```javascript
// RULE 8.4.3: Final LOG.info confirms module loading.
_loaded(); // Prepare module

// GOOD: Final loading confirmation
LOG.info(`Module ${MODULE} loaded and exposed.`, _global.ExampleModule);

})(self); // IIFE ends

// BAD: No final confirmation or missing exposed object
LOG.info('Module loaded'); // BAD: No MODULE constant or exposed object
```

---

## 📜 Complete Example Module: `example-module.js`

This final example module includes **only positive (GOOD) code** and quotes **every rule** (1.1 through 8.7) demonstrating its application.

```javascript
// ============================================================================
// EXAMPLE-MODULE.JS - Version 1.0.0
// Complete example module demonstrating all 115 construction rules
//
// Key Features:
// - Production-ready module architecture
// - Comprehensive configuration management  
// - Robust event system with subscription
// - Enterprise error handling & security
// - WCAG-compliant accessibility
// - Performance-optimized DOM handling
// - Memory-safe cleanup & lifecycle
//
// @version 1.0.0
// @license MIT
// ============================================================================

// [RULE 1.1.1] Always use an IIFE for scope isolation
(function(scope) {
    // [RULE 1.1.2] Always include 'use strict' for safety
    'use strict';

    // [RULE 1.1.3] Assign IIFE parameter to _global constant
    const _global = scope;

    // ========================================================================
    // DEPENDENCY CHECK
    // ========================================================================

    // [RULE 1.1.4] Check dependencies and return early if missing
    if (typeof _global.LOG === 'undefined') {
        console.error('MODULE: LOG system required');
        return;
    }

    // ========================================================================
    // MODULE IDENTIFICATION
    // ========================================================================

    // [RULE 1.2.1] Define top-level MODULE constant for identification
    const MODULE = 'EXAMPLE';

    // [RULE 1.2.3] Create local LOG object that prepends MODULE
    const LOG = {
        debug: (message, ...data) => _global.LOG.debug(MODULE, message, ...data),
        info: (message, ...data) => _global.LOG.info(MODULE, message, ...data),
        warn: (message, ...data) => _global.LOG.warn(MODULE, message, ...data),
        error: (message, ...data) => _global.LOG.error(MODULE, message, ...data)
    };

    // ========================================================================
    // CONFIGURATION
    // ========================================================================

    // [RULE 2.1.1] Centralize all configuration in CONFIG object
    const CONFIG = {
        // [RULE 2.2.1] Required sections: classes, selectors, i18n
        classes: {
            container: 'example-container',
            active: 'example--active',
            hidden: 'example--hidden',
            loading: 'example--loading',
            error: 'example--error',
            // [RULE 2.2.3] Dynamic class generators in classes section
            typeClass: (type) => `example--${CONFIG.types[type] || 'primary'}`,
            stateClass: (state) => `example--state-${state}`
        },

        selectors: {}, // Will be auto-generated

        // [RULE 2.2.5] i18n with German required
        i18n: {
            de: {
                buttonLabel: 'Aktion ausführen',
                closeButton: 'Schließen',
                statusActive: 'Aktiv',
                statusInactive: 'Inaktiv',
                widgetTitle: 'Beispiel-Widget'
            },
            en: {
                buttonLabel: 'Execute action', 
                closeButton: 'Close',
                statusActive: 'Active',
                statusInactive: 'Inactive',
                widgetTitle: 'Example Widget'
            }
        },

        // [RULE 2.2.2] Optional sections
        settings: {
            defaultTimeout: 3000,
            defaultLanguage: 'de',
            shortcutEnter: 'Enter',
            shortcutSpace: ' ',
            shortcutEscape: 'Escape'
        },

        types: {
            primary: 'primary',
            success: 'success',
            warning: 'warning',
            error: 'error'
        },

        // [RULE 2.2.6] Constants for external exposure
        constants: {
            events: {
                STATE_CHANGED: 'exampleStateChanged',
                INITIALIZED: 'exampleInitialized',
                ACTION_COMPLETE: 'exampleActionComplete'
            },
            states: {
                ACTIVE: 'active',
                INACTIVE: 'inactive'
            },
            VERSION: '1.0.0',
            moduleName: 'ExampleModule'
        }
    };

    // [RULE 2.4.1] Auto-generate selectors from classes
    CONFIG.selectors = Object.keys(CONFIG.classes).reduce((acc, key) => {
        if (typeof CONFIG.classes[key] === 'string') {
            acc[key] = `.${CONFIG.classes[key]}`;
        } else if (typeof CONFIG.classes[key] === 'function') {
            acc[key] = (param) => `.${CONFIG.classes[key](param)}`;
        }
        return acc;
    }, {});

    // [RULE 2.4.3] Selector extensions with spread pattern
    CONFIG.selectors = { ...CONFIG.selectors,
        container: '#example-container',
        body: 'body'
    };

    // ========================================================================
    // STATE VARIABLES
    // ========================================================================

    // [RULE 1.3.1] Private variables with leading underscore
    // [RULE 1.4.4] State variables in dedicated section after configuration
    // [RULE 7.3.1] Use _isInitialized to track module state
    let _isInitialized = false;
    let _currentState = CONFIG.constants.states.INACTIVE;
    let _containerElement = null;
    let _eventTarget = null;
    let _unsubscribeFunctions = [];
    let _activeElements = new Set();
    let _elementCache = new Map();

    // ========================================================================
    // HELPER FUNCTIONS
    // ========================================================================

    // [RULE 2.5.1] i18n helper function for translation lookup
    function _t(key) {
        const lang = document.documentElement.lang || CONFIG.settings.defaultLanguage;
        return CONFIG.i18n[lang]?.[key] || key;
    }

    // [RULE 4.1.1] Escape user-provided strings to prevent XSS
    function _escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ========================================================================
    // EVENT SYSTEM
    // ========================================================================

    // [RULE 3.1.1] Initialize internal event system at module load
    function _initEventSystem() {
        _eventTarget = new EventTarget();
        LOG.debug('Event system initialized');
    }

    // [RULE 3.2.1] Provide dispatchModuleEvent function for internal events
    // [RULE 3.2.2] Validate event types against defined constants  
    // [RULE 3.2.3] Include timestamp in event detail
    // [RULE 3.2.4] Events must be bubbled and cancelable
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
            detail: { timestamp: Date.now(), ...detail },
            bubbles: true,
            cancelable: true
        });

        LOG.debug(`Dispatching event: ${eventType}`, event.detail);
        return _eventTarget.dispatchEvent(event);
    }

    // [RULE 3.3.1] Provide public event subscription methods
    function addEventListener(eventType, callback, options) {
        if (!_eventTarget) {
            LOG.error(`Event system not initialized - cannot listen to: ${eventType}`);
            return;
        }
        _eventTarget.addEventListener(eventType, callback, options);
        LOG.debug(`Event listener added for: ${eventType}`);
    }

    function removeEventListener(eventType, callback, options) {
        if (!_eventTarget) return;
        _eventTarget.removeEventListener(eventType, callback, options);
        LOG.debug(`Event listener removed for: ${eventType}`);
    }

    // ========================================================================
    // DOM STRATEGY & PERFORMANCE
    // ========================================================================

    // [RULE 6.6.1] Prefer existing static HTML elements
    function _setupDOM() {
        _containerElement = document.querySelector(CONFIG.selectors.container);

        if (!_containerElement) {
            LOG.warn('No static container found, creating dynamic fallback');
            _containerElement = _createDynamicContainer();
            return !!_containerElement;
        }

        LOG.debug('Using existing static container');
        _containerElement.classList.remove(CONFIG.classes.hidden);
        return true;
    }

    // [RULE 6.6.2] Dynamic fallback creation with error handling
    function _createDynamicContainer() {
        try {
            const container = document.createElement('div');
            container.id = 'example-container';
            container.className = CONFIG.classes.container;
            container.innerHTML = `<div class="${CONFIG.classes.content}"></div>`;
            document.body.appendChild(container);
            return container;
        } catch (error) {
            LOG.error('Dynamic container creation failed:', error);
            return null;
        }
    }

    // ========================================================================
    // EVENT HANDLING PERFORMANCE
    // ========================================================================

    // [RULE 6.3.1] Event delegation for multiple elements
    // [RULE 6.3.2] Document performance rationale
    function _handleEventDelegation(event) {
        try {
            const button = event.target.closest(CONFIG.selectors.button);
            if (button) {
                event.preventDefault();
                toggleState();
            }
        } catch (error) {
            LOG.error('Event delegation failed:', error);
        }
    }

    // [RULE 6.3.3] Delegation for keyboard events
    // [RULE 6.4.1] Enter/Space activation using CONFIG references
    // [RULE 6.4.2] Escape key dismissal using CONFIG references
    function _handleKeyboardDelegation(event) {
        try {
            const interactiveEl = event.target.closest(CONFIG.selectors.button);
            if (!interactiveEl) return;

            if (event.key === CONFIG.settings.shortcutEnter || 
                event.key === CONFIG.settings.shortcutSpace) {
                event.preventDefault();
                interactiveEl.click();
            }

            if (event.key === CONFIG.settings.shortcutEscape) {
                event.preventDefault();
                _containerElement?.classList.remove(CONFIG.classes.active);
            }
        } catch (error) {
            LOG.error('Keyboard delegation failed:', error);
        }
    }

    // ========================================================================
    // UI & STATE MANAGEMENT
    // ========================================================================

    // [RULE 6.1.1] All visual styling must reside in CSS
    // [RULE 6.1.2] JavaScript only toggles classes and manages behavior
    function applyVisualState(element, state) {
        if (!element) return { success: false, error: 'Element not provided' };

        try {
            element.classList.toggle(CONFIG.classes.active, state === CONFIG.constants.states.ACTIVE);
            element.classList.toggle(CONFIG.classes.loading, state === 'loading');
            return { success: true };
        } catch (error) {
            LOG.error('Failed to apply visual state:', error);
            return { success: false, error: error.message };
        }
    }

    // [RULE 6.2.1] Use single state classes for state management
    // [RULE 6.2.2] Use semantic state class names
    function setElementState(element, state) {
        if (!element) return { success: false, error: 'Element not provided' };

        try {
            const stateClasses = [CONFIG.classes.active, CONFIG.classes.loading, CONFIG.classes.error];
            element.classList.remove(...stateClasses);

            switch (state) {
                case CONFIG.constants.states.ACTIVE:
                    element.classList.add(CONFIG.classes.active);
                    break;
                case 'loading':
                    element.classList.add(CONFIG.classes.loading);
                    break;
                case 'error':
                    element.classList.add(CONFIG.classes.error);
                    break;
            }
            return { success: true };
        } catch (error) {
            LOG.error('Failed to set element state:', error);
            return { success: false, error: error.message };
        }
    }

    // ========================================================================
    // ACCESSIBILITY SUPPORT
    // ========================================================================

    // [RULE 6.5.1] Utilize correct ARIA roles
    // [RULE 6.5.2] Load user-facing ARIA text via i18n helper
    function setupAccessibilityRoles() {
        if (!_containerElement) return { success: false, error: 'Container not available' };
        
        try {
            _containerElement.setAttribute('role', 'region');
            _containerElement.setAttribute('aria-label', _t('widgetTitle'));
            return { success: true };
        } catch (error) {
            LOG.error('Failed to setup accessibility roles:', error);
            return { success: false, error: error.message };
        }
    }

    function updateAccessibleLabels() {
        if (!_containerElement) return { success: false, error: 'Container not available' };
        
        try {
            const buttons = _containerElement.querySelectorAll(CONFIG.selectors.button);
            buttons.forEach(button => {
                button.setAttribute('aria-label', _t('buttonLabel'));
            });
            return { success: true };
        } catch (error) {
            LOG.error('Failed to update accessible labels:', error);
            return { success: false, error: error.message };
        }
    }

    // [RULE 6.5.3] Use aria-live for dynamic content updates
    function announceStatusChange(messageKey) {
        try {
            let liveRegion = document.getElementById('example-live-region');
            if (!liveRegion) {
                liveRegion = document.createElement('div');
                liveRegion.id = 'example-live-region';
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('aria-atomic', 'true');
                liveRegion.className = 'sr-only';
                document.body.appendChild(liveRegion);
            }
            liveRegion.textContent = _t(messageKey);
            return { success: true };
        } catch (error) {
            LOG.error('Failed to announce status change:', error);
            return { success: false, error: error.message };
        }
    }

    // ========================================================================
    // EXTERNAL INTEGRATION
    // ========================================================================

    // [RULE 3.4.1] Track external subscriptions with unsubscribe functions
    // [RULE 3.4.2] Use closure-based unsubscribe functions
    function _subscribeToExternalEvents() {
        function _handleApplicationStateChange(event) {
            LOG.debug('External application state change received');
            if (event.detail?.state === 'inactive') {
                updateModuleState(CONFIG.constants.states.INACTIVE);
            }
        }

        const unsubscribeAppState = () => {
            _global.removeEventListener('applicationStateChanged', _handleApplicationStateChange);
        };

        _global.addEventListener('applicationStateChanged', _handleApplicationStateChange);
        _unsubscribeFunctions.push(unsubscribeAppState);
        LOG.debug('Subscribed to external events');
    }

    // [RULE 3.4.3] Mass unsubscription during destruction
    function _unsubscribeFromAllExternalEvents() {
        _unsubscribeFunctions.forEach((unsubscribe, index) => {
            try {
                unsubscribe();
            } catch (error) {
                LOG.error(`Unsubscribe function ${index + 1} failed:`, error);
            }
        });
        _unsubscribeFunctions.length = 0;
        LOG.debug('External subscriptions cleaned up');
    }

    // ========================================================================
    // STATE MANAGEMENT & RELIABILITY
    // ========================================================================

    // [RULE 7.3.3] State consistency maintenance
    function updateModuleState(newState) {
        const previousState = _currentState;
        
        try {
            if (!Object.values(CONFIG.constants.states).includes(newState)) {
                return { success: false, error: `Invalid state: ${newState}` };
            }

            _currentState = newState;
            
            // Update UI
            if (_containerElement) {
                applyVisualState(_containerElement, newState);
            }

            dispatchModuleEvent(CONFIG.constants.events.STATE_CHANGED, {
                previousState,
                newState
            });

            LOG.info(`State updated: ${previousState} → ${newState}`);
            return { success: true, previousState, newState };

        } catch (error) {
            _currentState = previousState;
            LOG.error('State update failed, rolled back:', error);
            return { success: false, error: error.message, previousState };
        }
    }

    // [RULE 3.5.1] init() must be idempotent
    // [RULE 3.5.3] Methods must return consistent types
    function toggleState() {
        const newState = _currentState === CONFIG.constants.states.ACTIVE 
            ? CONFIG.constants.states.INACTIVE 
            : CONFIG.constants.states.ACTIVE;
        return updateModuleState(newState);
    }

    // ========================================================================
    // DATA PROCESSING & ERROR HANDLING
    // ========================================================================

    // [RULE 4.2.1] Use try/catch for operations that might fail
    // [RULE 4.2.4] Graceful degradation for non-critical failures
    function loadUserPreferences() {
        try {
            const storedPrefs = localStorage.getItem('exampleModule_preferences');
            if (storedPrefs) {
                const preferences = JSON.parse(storedPrefs);
                LOG.debug('User preferences loaded successfully');
                return { success: true, data: preferences };
            }
            return { success: true, data: { theme: 'light', language: 'de' } };
        } catch (error) {
            LOG.warn('Failed to load user preferences, using defaults:', error);
            return { success: false, error: error.message, data: { theme: 'light', language: 'de' } };
        }
    }

    // [RULE 4.3.1] Return consistency
    // [RULE 4.3.2] Null-safe object access
    function processUserAction(actionType) {
        const defaultResponse = { success: false, data: null, error: null };

        try {
            if (!CONFIG.types?.[actionType]) {
                return { ...defaultResponse, error: 'Invalid action type' };
            }

            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = { 
                        success: true, 
                        data: { actionType, processedAt: Date.now() },
                        error: null 
                    };
                    dispatchModuleEvent(CONFIG.constants.events.ACTION_COMPLETE, { actionType });
                    resolve(result);
                }, CONFIG.settings.defaultTimeout);
            });

        } catch (error) {
            return Promise.resolve({ ...defaultResponse, error: error.message });
        }
    }

    // ========================================================================
    // DOM UTILITIES
    // ========================================================================

    // [RULE 7.1.1] JSDoc must include parameters and types
    // [RULE 7.1.2] Demonstrate default values in JSDoc
    /**
     * Optimized DOM query with caching
     * @param {string} selector - CSS selector string
     * @param {boolean} [useCache=true] - Enable result caching
     * @returns {HTMLElement|null} Found element or null
     */
    function queryElement(selector, useCache = true) {
        if (useCache && _elementCache.has(selector)) {
            return _elementCache.get(selector);
        }
        const element = document.querySelector(selector);
        if (useCache && element) {
            _elementCache.set(selector, element);
        }
        return element;
    }

    // [RULE 8.3.5] Simple function for API construction
    function toggleElementVisibility(element, show) {
        if (!element) return { success: false, error: 'Element not provided' };
        element.classList.toggle(CONFIG.classes.hidden, !show);
        return { success: true };
    }

    // ========================================================================
    // CONFIGURATION MANAGEMENT
    // ========================================================================

    /**
     * Configures module settings with validation
     * @param {Object} settings - Configuration settings
     * @param {number} [settings.timeout=3000] - Operation timeout
     * @param {boolean} [settings.debug=false] - Enable debug mode
     * @returns {Object} Configuration result
     */
    function configureModule(settings = {}) {
        const { timeout = 3000, debug = false } = settings;
        
        try {
            if (timeout < 100 || timeout > 30000) {
                return { success: false, error: 'Timeout must be between 100 and 30000 ms' };
            }

            CONFIG.settings.defaultTimeout = timeout;
            CONFIG.settings.debugMode = debug;

            LOG.debug('Module configuration updated', { timeout, debug });
            return { success: true, settings: { timeout, debug } };

        } catch (error) {
            LOG.error('Module configuration failed:', error);
            return { success: false, error: error.message };
        }
    }

    // ========================================================================
    // CORE LIFECYCLE: INITIALIZATION
    // ========================================================================

    function init(options = {}) {
        // [RULE 3.5.1] Idempotent check
        if (_isInitialized) {
            return { success: true, alreadyInitialized: true };
        }

        try {
            LOG.info('Module initialization started');

            // Setup DOM
            if (!_setupDOM()) {
                throw new Error('DOM setup failed');
            }

            // Event delegation
            document.addEventListener('click', _handleEventDelegation);
            document.addEventListener('keydown', _handleKeyboardDelegation);

            // Accessibility
            setupAccessibilityRoles();
            updateAccessibleLabels();

            // External events
            _subscribeToExternalEvents();

            // Initial state
            const stateResult = updateModuleState(CONFIG.constants.states.INACTIVE);
            if (!stateResult.success) {
                throw new Error(`Initial state setup failed: ${stateResult.error}`);
            }

            _isInitialized = true;

            dispatchModuleEvent(CONFIG.constants.events.INITIALIZED, {
                version: CONFIG.constants.VERSION
            });

            LOG.info('Module initialized successfully');
            return { success: true };

        } catch (error) {
            // Cleanup on failure
            _cleanupEventListeners();
            _unsubscribeFromAllExternalEvents();
            _clearAllReferences();
            _isInitialized = false;
            
            LOG.error('Module initialization failed:', error);
            return { success: false, error: error.message };
        }
    }

    // ========================================================================
    // CORE LIFECYCLE: CLEANUP
    // ========================================================================

    // [RULE 8.1.1] Provide public destroy() method
    // [RULE 8.1.2] destroy() must be idempotent
    function destroy() {
        if (!_isInitialized && !_global[CONFIG.constants.moduleName]) {
            return { success: true, alreadyDestroyed: true };
        }

        try {
            LOG.info('Starting module destruction');

            // [RULE 8.2.1] Remove all DOM event listeners
            _cleanupEventListeners();

            // [RULE 8.2.2] Execute all external unsubscribe functions
            _unsubscribeFromAllExternalEvents();

            // [RULE 8.2.3] Clear all DOM element references
            _clearAllReferences();

            // [RULE 8.1.3] Reset all internal state
            _resetInternalState();

            // [RULE 8.4.2] Remove public API from global scope
            delete _global[CONFIG.constants.moduleName];

            LOG.info('Module destroyed successfully');
            return { success: true };

        } catch (error) {
            LOG.error('Module destruction failed:', error);
            return { success: false, error: error.message };
        }
    }

    // [RULE 8.1.3] Reset all internal state during destruction
    function _resetInternalState() {
        _isInitialized = false;
        _currentState = CONFIG.constants.states.INACTIVE;
        _activeElements.clear();
        _elementCache.clear();
        LOG.debug('Internal state reset completed');
    }

    // [RULE 8.2.1] Remove all internal DOM event listeners
    function _cleanupEventListeners() {
        try {
            document.removeEventListener('click', _handleEventDelegation);
            document.removeEventListener('keydown', _handleKeyboardDelegation);
            LOG.debug('DOM event listeners cleaned up');
        } catch (error) {
            LOG.error('Event listener cleanup failed:', error);
        }
    }

    // [RULE 8.2.3] Clear all DOM element references
    // [RULE 8.2.4] Hide rather than remove static elements
    function _clearAllReferences() {
        if (_containerElement && _containerElement.id === 'example-container') {
            _containerElement.classList.add(CONFIG.classes.hidden);
            LOG.debug('Static container hidden for reuse');
        }
        _containerElement = null;
        _eventTarget = null;
        _elementCache.clear();
        LOG.debug('All DOM references cleared');
    }

    // ========================================================================
    // MODULE FINALIZATION
    // ========================================================================

    // [RULE 8.4.1] Call _loaded() before IIFE final message
    function _loaded() {
        _initEventSystem();
        LOG.debug('Module loaded, event system ready');
    }

    // [RULE 8.4.3] Final loading message with module exposure confirmation
    function _finalizeModuleLoading() {
        const moduleName = CONFIG.constants.moduleName;
        LOG.info(`Module ${MODULE} loaded and exposed successfully`, {
            module: moduleName,
            version: CONFIG.constants.VERSION
        });
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    // [RULE 1.3.2] Names of exposed API object must use PascalCase
    // [RULE 8.3.1] Core API structure with essential functionality
    // [RULE 8.3.2] Event system exposure in public API
    // [RULE 8.3.3] Utility method grouping for discoverability
    // [RULE 8.3.4] Constant exposure via public API
    _global.ExampleModule = {
        // CORE LIFECYCLE
        init: init,
        destroy: destroy,

        // STATE MANAGEMENT
        toggleState: toggleState,
        updateModuleState: updateModuleState,
        getState: () => _currentState,
        isInitialized: () => _isInitialized,

        // CONFIGURATION
        configure: configureModule,

        // DOM & UI
        queryElement: queryElement,
        applyVisualState: applyVisualState,
        setElementState: setElementState,
        toggleElementVisibility: toggleElementVisibility,

        // DATA PROCESSING
        processUserAction: processUserAction,
        loadUserPreferences: loadUserPreferences,

        // ACCESSIBILITY
        announceStatusChange: announceStatusChange,
        updateAccessibleLabels: updateAccessibleLabels,

        // EVENT SYSTEM
        dispatchEvent: dispatchModuleEvent,
        addEventListener: addEventListener,
        removeEventListener: removeEventListener,

        // UTILITIES
        utils: {
            escapeHTML: _escapeHTML,
            translate: _t,
            formatDuration: (ms) => `${ms}ms`
        },

        // CONSTANTS
        EVENTS: CONFIG.constants.events,
        STATES: CONFIG.constants.states,
        CONSTANTS: {
            VERSION: CONFIG.constants.VERSION,
            DEFAULT_TIMEOUT: CONFIG.settings.defaultTimeout
        },

        // [RULE 7.2.1] Standardized debug object structure
        // [RULE 7.2.2] Conditional exposure based on debug mode
        // [RULE 7.2.3] Read-only access via functions
        _debug: !_global.BUILD_INFO?.debugMode ? undefined : {
            CONFIG: Object.freeze({ ...CONFIG }),
            currentState: () => _currentState,
            isInitialized: () => _isInitialized,
            healthCheck: () => ({
                dependencies: typeof _global.LOG !== 'undefined',
                dom: !!_containerElement?.isConnected,
                timestamp: Date.now()
            })
        }
    };

    // ========================================================================
    // MODULE FINALIZATION EXECUTION
    // ========================================================================

    _loaded();
    _finalizeModuleLoading();

})(self);
```


---

## 📄 Document Versioning

| Field                | Value         | Notes                                                                                                                 |
| -------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Document Version** | **1.1**       | Initial comprehensive release                                                                                         |
| **Creation Date**    | November 2025 | Based on the conversation timestamp.                                                                                  |
| **Revision History** | 1.0 10/2025   | This is the base version; all previous iterations are considered drafts.                                              |
| **Next Revision**    | 1.2           | Suggested version for the next planned update.                                                                        |
