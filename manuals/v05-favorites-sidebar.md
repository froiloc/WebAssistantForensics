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