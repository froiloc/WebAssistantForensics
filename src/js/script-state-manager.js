// ============================================================================
// SCRIPT-STATE-MANAGER.JS - Version 001
// Zentrale Zustandsverwaltung mit Observer-Pattern und Auto-Persistierung
// ============================================================================

(function() {
    'use strict';

    const MODULE = 'STATE-MGR';

    // ========================================================================
    // KONSTANTEN
    // ========================================================================

    const STORAGE_KEY = 'appState';
    const DEBOUNCE_DELAY = 500; // ms - Verzögerung vor localStorage-Schreiben
    const MAX_HISTORY_LENGTH = 50; // Maximale Anzahl History-Einträge

    // ========================================================================
    // PRIVATER STATE (nicht direkt zugreifbar)
    // ========================================================================

    /**
     * Der tatsächliche Application State
     * Wird durch Proxy gewrappt für automatische Change Detection
     */
    let _state = {
        // UI-Status
        ui: {
            sidebarOpen: false,
            sidebarsOpen: [],           // Array: ['navigation', 'history']
            activeSidebarTab: null,     // 'navigation' | 'history' | null
            notesOpen: false,
            tipsVisible: true,
            menuOpen: false
        },

        // User Preferences (persistiert)
        preferences: {
            theme: 'system',            // 'light' | 'dark' | 'system'
            detailLevel: 'bestpractice', // 'basic' | 'bestpractice' | 'expert'
            timeFormat: 'relative',     // 'relative' | 'absolute'
            showTips: true,             // boolean
            autoSaveNotes: true,        // boolean
            sidebarsOpen: ['navigation'], // Default-Sidebars
            activeSidebarTab: 'navigation'
        },

        // Section Management (nicht persistiert)
        sections: {
            currentActive: 'intro',
            allSections: [],
            lastNavigationTime: 0,
            lastNavigatedSection: null,
            lastSectionChangeTime: 0,
            lastChangedToSection: null
        },

        // Scroll State (nicht persistiert)
        scroll: {
            lastScrollY: 0,
            lastDirection: 'down',
            userIsScrolling: false,
            scrollTimeout: null,
            isProcessingIntersection: false,
            isProcessingScroll: false,
            lastScrollIntentionTime: 0,
            scrollCallCounter: 0
        },

        // History (persistiert)
        history: {
            entries: [],               // Array von History-Einträgen
            maxLength: MAX_HISTORY_LENGTH
        },

        // Notes (persistiert)
        notes: {
            content: '',
            lastSaved: null,
            saveTimer: null
        },

        // Observers/Misc (nicht persistiert)
        observers: {
            focusObserver: null
        },

        // Favorites state
        favorites: {
            items: [],
            folders: [
                {
                    id: 'default',
                    name: 'Favorites',
                    created: new Date().toISOString()
                }
            ],
            lastUpdated: new Date().toISOString()
        }
    };

    /**
     * Observer-Registry
     * Struktur: { 'path.to.property': [callback1, callback2, ...] }
     */
    const _observers = {};

    /**
     * Debounce-Timer für localStorage-Persistierung
     */
    let _saveTimer = null;

    /**
     * Flag: Ist gerade am Laden aus localStorage?
     * Verhindert unnötige Speicher-Operationen während des Ladens
     */
    let _isLoading = false;

    // ========================================================================
    // HELPER FUNCTIONS
    // ========================================================================

    /**
     * Nested Object Zugriff mit Dot-Notation
     * Beispiel: getNestedValue(obj, 'preferences.theme')
     *
     * @param {Object} obj - Das Objekt
     * @param {String} path - Der Pfad (dot-separated)
     * @returns {*} Der Wert oder undefined
     */
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current?.[key];
        }, obj);
    }

    /**
     * Nested Object Setzen mit Dot-Notation
     * Beispiel: setNestedValue(obj, 'preferences.theme', 'dark')
     *
     * @param {Object} obj - Das Objekt
     * @param {String} path - Der Pfad (dot-separated)
     * @param {*} value - Der neue Wert
     */
    function setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();

        const target = keys.reduce((current, key) => {
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            return current[key];
        }, obj);

        target[lastKey] = value;
    }

    /**
     * Deep Clone eines Objekts
     * Verwendet für Change Detection
     *
     * @param {*} obj - Zu klonendes Objekt
     * @returns {*} Geklontes Objekt
     */
    function deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj);
        if (obj instanceof Array) return obj.map(item => deepClone(item));

        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = deepClone(obj[key]);
            }
        }
        return cloned;
    }

    /**
     * Vergleicht zwei Werte auf Deep-Equality
     *
     * @param {*} a - Wert 1
     * @param {*} b - Wert 2
     * @returns {Boolean} true wenn identisch
     */
    function deepEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (typeof a !== typeof b) return false;

        if (typeof a === 'object') {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);

            if (keysA.length !== keysB.length) return false;

            return keysA.every(key => deepEqual(a[key], b[key]));
        }

        return false;
    }

    // ========================================================================
    // OBSERVER PATTERN
    // ========================================================================

    /**
     * Registriert einen Observer für einen bestimmten State-Pfad
     *
     * @param {String} path - Pfad im State (z.B. 'preferences.theme')
     * @param {Function} callback - Callback-Funktion (newValue, oldValue, path)
     * @returns {Function} Unsubscribe-Funktion
     */
    function subscribe(path, callback) {
        if (typeof callback !== 'function') {
            LOG.error(MODULE, 'Subscribe: callback must be a function');
            return () => {};
        }

        if (!_observers[path]) {
            _observers[path] = [];
        }

        _observers[path].push(callback);

        LOG.debug(MODULE, `Subscribed to: ${path} (${_observers[path].length} observers)`);

        // Return unsubscribe function
        return function unsubscribe() {
            const index = _observers[path].indexOf(callback);
            if (index > -1) {
                _observers[path].splice(index, 1);
                LOG.debug(MODULE, `Unsubscribed from: ${path}`);
            }
        };
    }

    /**
     * Benachrichtigt alle Observer eines bestimmten Pfads
     *
     * @param {String} path - Pfad im State
     * @param {*} newValue - Neuer Wert
     * @param {*} oldValue - Alter Wert
     */
    function notifyObservers(path, newValue, oldValue) {
        // Exakter Pfad
        if (_observers[path]) {
            _observers[path].forEach(callback => {
                try {
                    callback(newValue, oldValue, path);
                } catch (e) {
                    LOG.error(MODULE, `Observer callback error for ${path}:`, e);
                }
            });
        }

        // Wildcard-Observer (z.B. 'preferences.*')
        const wildcardPath = path.split('.').slice(0, -1).join('.') + '.*';
        if (_observers[wildcardPath]) {
            _observers[wildcardPath].forEach(callback => {
                try {
                    callback(newValue, oldValue, path);
                } catch (e) {
                    LOG.error(MODULE, `Wildcard observer callback error for ${wildcardPath}:`, e);
                }
            });
        }

        // Root-Observer ('*')
        if (_observers['*']) {
            _observers['*'].forEach(callback => {
                try {
                    callback(newValue, oldValue, path);
                } catch (e) {
                    LOG.error(MODULE, `Root observer callback error:`, e);
                }
            });
        }
    }

    // ========================================================================
    // PERSISTIERUNG (localStorage)
    // ========================================================================

    /**
     * Bestimmt, welche State-Teile persistiert werden sollen
     *
     * @returns {Object} Zu persistierender State
     */
    function getPersistedState() {
        return {
            preferences: _state.preferences,
            history: {
                entries: _state.history.entries
            },
            notes: {
                content: _state.notes.content,
                lastSaved: _state.notes.lastSaved
            }
        };
    }

    /**
     * Speichert State in localStorage (mit Debouncing)
     * Wird nur aufgerufen, wenn sich persistierbare Werte ändern
     */
    function saveToStorage() {
        // Während des Ladens nicht speichern
        if (_isLoading) return;

        // Debounce: Timer zurücksetzen
        if (_saveTimer) {
            clearTimeout(_saveTimer);
        }

        _saveTimer = setTimeout(() => {
            try {
                const toSave = getPersistedState();
                const serialized = JSON.stringify(toSave);

                localStorage.setItem(STORAGE_KEY, serialized);

                LOG.debug(MODULE, `💾 Saved to localStorage (${serialized.length} chars)`);
            } catch (e) {
                LOG.error(MODULE, 'Failed to save to localStorage:', e);
            }
        }, DEBOUNCE_DELAY);
    }

    /**
     * Lädt State aus localStorage
     * Wird beim Init aufgerufen
     */
    function loadFromStorage() {
        _isLoading = true;

        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (!stored) {
                LOG.debug(MODULE, 'No stored state found, using defaults');
                _isLoading = false;
                return;
            }

            const parsed = JSON.parse(stored);

            // Merge mit aktuellem State (behält Defaults für nicht gespeicherte Werte)
            if (parsed.preferences) {
                _state.preferences = {
                    ..._state.preferences,
                    ...parsed.preferences
                };
            }

            if (parsed.history) {
                _state.history.entries = parsed.history.entries || [];
            }

            if (parsed.notes) {
                _state.notes.content = parsed.notes.content || '';
                _state.notes.lastSaved = parsed.notes.lastSaved;
            }

            LOG.success(MODULE, '📂 Loaded state from localStorage');
            LOG.debug(MODULE, 'Loaded preferences:', _state.preferences);
            LOG.debug(MODULE, `Loaded history: ${_state.history.entries.length} entries`);

        } catch (e) {
            LOG.error(MODULE, 'Failed to load from localStorage:', e);
        } finally {
            _isLoading = false;
        }
    }

    /**
     * Löscht gespeicherten State (für Reset-Funktion)
     */
    function clearStorage() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            LOG(MODULE, '🗑️ Cleared localStorage');
        } catch (e) {
            LOG.error(MODULE, 'Failed to clear localStorage:', e);
        }
    }

    // ========================================================================
    // FAVORITES MANAGEMENT
    // ========================================================================

    /**
     * Adds a section to favorites
     * @param {Object} favoriteData - Favorite item data
     * @returns {string} Favorite ID
     */
    function addFavorite(favoriteData) {
        LOG.debug(MODULE, 'Adding favorite:', favoriteData);

        const favorite = {
            id: generateId(),
            title: favoriteData.title,
            selector: favoriteData.selector, // "main #section-id [data-ref='section-name']"
            sectionId: favoriteData.sectionId,
            addedDate: new Date().toISOString(),
            lastAccessed: new Date().toISOString(),
            accessCount: 0,
            tags: favoriteData.tags || [],
            folderId: favoriteData.folderId || 'default',
            ...favoriteData
        };

        _state.favorites.items.unshift(favorite); // Add to beginning for "newest first"
        _state.favorites.lastUpdated = new Date().toISOString();

        LOG.debug(MODULE, `Favorite added: ${favorite.title} (ID: ${favorite.id})`);
        saveToStorage();

        return favorite.id;
    }

    /**
     * Removes a favorite by ID
     * @param {string} favoriteId - ID of favorite to remove
     * @returns {boolean} Success status
     */
    function removeFavorite(favoriteId) {
        LOG.debug(MODULE, `Removing favorite: ${favoriteId}`);

        const initialLength = _state.favorites.items.length;
        _state.favorites.items = _state.favorites.items.filter(fav => fav.id !== favoriteId);

        const removed = initialLength !== _state.favorites.items.length;

        if (removed) {
            _state.favorites.lastUpdated = new Date().toISOString();
            saveToStorage();
            LOG.debug(MODULE, `Favorite removed: ${favoriteId}`);
        } else {
            LOG.warn(MODULE, `Favorite not found for removal: ${favoriteId}`);
        }

        return removed;
    }

    /**
     * Updates a favorite's data
     * @param {string} favoriteId - ID of favorite to update
     * @param {Object} updates - Key-value pairs to update
     * @returns {boolean} Success status
     */
    function updateFavorite(favoriteId, updates) {
        LOG.debug(MODULE, `Updating favorite: ${favoriteId}`, updates);

        const favorite = _state.favorites.items.find(fav => fav.id === favoriteId);
        if (!favorite) {
            LOG.warn(MODULE, `Favorite not found for update: ${favoriteId}`);
            return false;
        }

        // Apply updates (excluding protected fields)
        const protectedFields = ['id', 'addedDate'];
        Object.keys(updates).forEach(key => {
            if (!protectedFields.includes(key)) {
                favorite[key] = updates[key];
            }
        });

        favorite.lastAccessed = new Date().toISOString();
        _state.favorites.lastUpdated = new Date().toISOString();
        saveToStorage();

        LOG.debug(MODULE, `Favorite updated: ${favoriteId}`);
        return true;
    }

    /**
     * Increments access count for a favorite
     * @param {string} favoriteId - ID of favorite accessed
     */
    function incrementFavoriteAccess(favoriteId) {
        const favorite = _state.favorites.items.find(fav => fav.id === favoriteId);
        if (favorite) {
            favorite.accessCount++;
            favorite.lastAccessed = new Date().toISOString();
            _state.favorites.lastUpdated = new Date().toISOString();
            saveToStorage();

            LOG.debug(MODULE, `Favorite access incremented: ${favorite.title} (${favorite.accessCount} accesses)`);
        }
    }

    /**
     * Gets all favorites, optionally filtered by folder
     * @param {string} folderId - Optional folder ID to filter by
     * @returns {Array} Favorite items
     */
    function getFavorites(folderId = null) {
        let favorites = _state.favorites.items;

        if (folderId) {
            favorites = favorites.filter(fav => fav.folderId === folderId);
        }

        LOG.debug(MODULE, `Retrieved ${favorites.length} favorites${folderId ? ` for folder ${folderId}` : ''}`);
        return [...favorites]; // Return copy to prevent direct mutation
    }

    /**
     * Gets a specific favorite by ID
     * @param {string} favoriteId - ID of favorite to retrieve
     * @returns {Object|null} Favorite data or null if not found
     */
    function getFavorite(favoriteId) {
        const favorite = _state.favorites.items.find(fav => fav.id === favoriteId);
        if (!favorite) {
            LOG.debug(MODULE, `Favorite not found: ${favoriteId}`);
        }
        return favorite ? { ...favorite } : null; // Return copy
    }

    // ========================================================================
    // FOLDER MANAGEMENT
    // ========================================================================

    /**
     * Creates a new folder
     * @param {string} name - Folder name (max 30 chars)
     * @returns {string} Folder ID
     */
    function createFolder(name) {
        if (!name || name.length > 30) {
            LOG.warn(MODULE, `Invalid folder name: ${name}`);
            return null;
        }

        const folder = {
            id: generateId(),
            name: name.trim(),
            created: new Date().toISOString()
        };

        _state.favorites.folders.push(folder);
        _state.favorites.lastUpdated = new Date().toISOString();
        saveToStorage();

        LOG.debug(MODULE, `Folder created: ${folder.name} (ID: ${folder.id})`);
        return folder.id;
    }

    /**
     * Gets all folders
     * @returns {Array} Folder list
     */
    function getFolders() {
        LOG.debug(MODULE, `Retrieved ${_state.favorites.folders.length} folders`);
        return [..._state.favorites.folders]; // Return copy
    }

    /**
     * Updates a folder's name
     * @param {string} folderId - ID of folder to update
     * @param {string} newName - New folder name (max 30 chars)
     * @returns {boolean} Success status
     */
    function updateFolder(folderId, newName) {
        if (!newName || newName.length > 30) {
            LOG.warn(MODULE, `Invalid folder name for update: ${newName}`);
            return false;
        }

        const folder = _state.favorites.folders.find(f => f.id === folderId);
        if (!folder) {
            LOG.warn(MODULE, `Folder not found for update: ${folderId}`);
            return false;
        }

        folder.name = newName.trim();
        _state.favorites.lastUpdated = new Date().toISOString();
        saveToStorage();

        LOG.debug(MODULE, `Folder updated: ${folder.name} (ID: ${folder.id})`);
        return true;
    }

    /**
     * Deletes a folder (moves its favorites to default folder)
     * @param {string} folderId - ID of folder to delete
     * @returns {boolean} Success status
     */
    function deleteFolder(folderId) {
        if (folderId === 'default') {
            LOG.warn(MODULE, 'Cannot delete default folder');
            return false;
        }

        const folder = _state.favorites.folders.find(f => f.id === folderId);
        if (!folder) {
            LOG.warn(MODULE, `Folder not found for deletion: ${folderId}`);
            return false;
        }

        // Move all favorites in this folder to default folder
        _state.favorites.items.forEach(fav => {
            if (fav.folderId === folderId) {
                fav.folderId = 'default';
            }
        });

        // Remove the folder
        _state.favorites.folders = _state.favorites.folders.filter(f => f.id !== folderId);
        _state.favorites.lastUpdated = new Date().toISOString();
        saveToStorage();

        LOG.debug(MODULE, `Folder deleted: ${folder.name} (ID: ${folderId})`);
        return true;
    }

    /**
     * Generates a unique ID
     * @returns {string} Unique ID
     */
    function generateId() {
        return 'fav_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // ========================================================================
    // PUBLIC API - Getter & Setter
    // ========================================================================

    /**
     * Liest einen Wert aus dem State
     * Unterstützt Dot-Notation
     *
     * @param {String} path - Pfad zum Wert (z.B. 'preferences.theme')
     * @returns {*} Der Wert oder undefined
     *
     * @example
     * StateManager.get('preferences.theme') // 'dark'
     * StateManager.get('preferences') // { theme: 'dark', ... }
     */
    function get(path) {
        if (!path) {
            LOG.warn(MODULE, 'get() called without path');
            return undefined;
        }

        const value = getNestedValue(_state, path);

        // Deep Clone bei Objekten/Arrays für Immutability
        if (typeof value === 'object' && value !== null) {
            return deepClone(value);
        }

        return value;
    }

    /**
     * Setzt einen Wert im State
     * Unterstützt Dot-Notation
     * Triggert automatisch Observer und Persistierung
     *
     * @param {String} path - Pfad zum Wert (z.B. 'preferences.theme')
     * @param {*} value - Der neue Wert
     *
     * @example
     * StateManager.set('preferences.theme', 'dark')
     * StateManager.set('notes.content', 'Neue Notiz')
     */
    function set(path, value) {
        if (!path) {
            LOG.error(MODULE, 'set() called without path');
            return;
        }

        const oldValue = getNestedValue(_state, path);

        // Keine Änderung? Nichts tun
        if (deepEqual(oldValue, value)) {
            LOG.debug(MODULE, `No change for ${path}, skipping`);
            return;
        }

        // Wert setzen
        setNestedValue(_state, path, value);

        LOG.debug(MODULE, `✏️ Set: ${path} = ${JSON.stringify(value)}`);

        // Observer benachrichtigen
        notifyObservers(path, value, oldValue);

        // Prüfen ob persistierbar
        const topLevelKey = path.split('.')[0];
        if (['preferences', 'history', 'notes'].includes(topLevelKey)) {
            saveToStorage();
        }
    }

    /**
     * Updated ein Objekt im State (Merge statt Replace)
     * Nützlich für partielle Updates
     *
     * @param {String} path - Pfad zum Objekt
     * @param {Object} updates - Zu mergende Properties
     *
     * @example
     * StateManager.update('preferences', { theme: 'dark', showTips: false })
     */
    function update(path, updates) {
        if (typeof updates !== 'object' || updates === null) {
            LOG.error(MODULE, 'update() requires an object');
            return;
        }

        const current = get(path);

        if (typeof current !== 'object' || current === null) {
            LOG.error(MODULE, `Cannot update non-object at ${path}`);
            return;
        }

        const merged = {
            ...current,
 ...updates
        };

        set(path, merged);
    }

    /**
     * Setzt den gesamten State zurück auf Defaults
     * ACHTUNG: Löscht alle Daten!
     */
    function reset() {
        LOG.warn(MODULE, '⚠️ Resetting entire state to defaults');

        // Alle Observer benachrichtigen VOR dem Reset
        Object.keys(_observers).forEach(path => {
            const oldValue = getNestedValue(_state, path);
            notifyObservers(path, undefined, oldValue);
        });

        // State zurücksetzen
        _state = {
            ui: {
                sidebarOpen: false,
                sidebarsOpen: [],
                activeSidebarTab: null,
                notesOpen: false,
                tipsVisible: true,
                menuOpen: false
                            },
                preferences: {
                    theme: 'system',
                    detailLevel: 'bestpractice',
                    timeFormat: 'relative',
                    showTips: true,
                    autoSaveNotes: true,
                    sidebarsOpen: ['navigation'],
                    activeSidebarTab: 'navigation'
                },
                sections: {
                    currentActive: 'intro',
                    allSections: [],
                    lastNavigationTime: 0,
                    lastNavigatedSection: null,
                    lastSectionChangeTime: 0,
                    lastChangedToSection: null
                },
                scroll: {
                    lastScrollY: 0,
                    lastDirection: 'down',
                    userIsScrolling: false,
                    scrollTimeout: null,
                    isProcessingIntersection: false,
                    isProcessingScroll: false,
                    lastScrollIntentionTime: 0,
                    scrollCallCounter: 0
                },
                history: {
                    entries: [],
                    maxLength: MAX_HISTORY_LENGTH
                },
                notes: {
                    content: '',
                    lastSaved: null,
                    saveTimer: null
                },
                observers: {
                    focusObserver: null
                },
                favorites: {
                    items: [],
                    folders: [
                        {
                            id: 'default',
                            name: 'Favorites',
                            created: new Date().toISOString()
                        }
                    ],
                    lastUpdated: new Date().toISOString()
                }

        };

        // localStorage löschen
        clearStorage();

        LOG.success(MODULE, '✅ State reset complete');
    }

    // ========================================================================
    // INITIALISIERUNG
    // ========================================================================

    /**
     * Initialisiert den State Manager
     * Muss vor allen anderen Modulen aufgerufen werden!
     */
    function init() {
        LOG(MODULE, 'Initializing State Manager...');

        // 1. State aus localStorage laden
        loadFromStorage();

        // 2. Global verfügbar machen
        window.StateManager = {
            get: get,
            set: set,
            update: update,
            subscribe: subscribe,
            reset: reset,
            _observers: _observers,

            // Favorites methods
            addFavorite: addFavorite,
            removeFavorite: removeFavorite,
            updateFavorite: updateFavorite,
            incrementFavoriteAccess: incrementFavoriteAccess,
            getFavorites: getFavorites,
            getFavorite: getFavorite,

            // Folder methods
            createFolder: createFolder,
            getFolders: getFolders,
            updateFolder: updateFolder,
            deleteFolder: deleteFolder,

            // Debug-Funktionen (nur wenn debugMode aktiv)
            _debug: window.BUILD_INFO?.debugMode ? {
                getState: () => deepClone(_state),
                getObservers: () => Object.keys(_observers),
                clearStorage: clearStorage
            } : undefined
        };

        LOG.success(MODULE, '✅ State Manager initialized');
        LOG.debug(MODULE, `   - Preferences loaded: ${Object.keys(_state.preferences).length} keys`);
        LOG.debug(MODULE, `   - History entries: ${_state.history.entries.length}`);
        LOG.debug(MODULE, `   - Notes length: ${_state.notes.content.length} chars`);
    }

    // ========================================================================
    // MODULE REGISTRATION & AUTO-INIT
    // ========================================================================

    // Nur init-Funktion exportieren
    // Die eigentliche API wird in init() unter window.StateManager registriert
    window.StateManagerModule = {
        init: init
    };

    // StateManager MUSS sofort verfügbar sein, daher auto-init
    // Andere Module initialisieren erst bei DOMContentLoaded

    // Sofort initialisieren
    init();

    LOG(MODULE, '🚀 State Manager auto-initialized and ready');

})();
