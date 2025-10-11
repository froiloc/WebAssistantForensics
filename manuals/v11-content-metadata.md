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

.metadata-value a {
    color: var(--color-primary);
    text-decoration: none;
}

.metadata-value a:hover {
    text-decoration: underline;
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
    background-color: var(--color-border-strong);
    color: var(--color-text-primary);
}

/* Maintainer Mode Toggle */
.maintainer-mode-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--color-primary);
    color: var(--color-surface-elevated);
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    box-shadow: 0 4px 12px var(--color-shadow);
    transition: all var(--transition-fast);
    z-index: 9999;
}

.maintainer-mode-toggle:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px var(--color-shadow-strong);
}

body.maintainer-mode .maintainer-mode-toggle {
    background-color: var(--color-success);
}
```

---

## JavaScript: script-metadata.js

```javascript
/**
 * Content Metadata Management System
 * Verwaltet Metadaten für Content-Sections
 */

(function() {
    'use strict';
    
    const MODULE = 'Metadata';
    const LOG = window.Logger || console.log;
    
    // State
    let metadataPanel = null;
    let currentSection = null;
    
    // ===== METADATA EXTRACTION =====
    
    function getMetadataForSection(sectionElement) {
        // Versuche JSON-LD zu finden
        const jsonLdScript = sectionElement.querySelector('script.section-metadata[type="application/ld+json"]');
        
        if (jsonLdScript) {
            try {
                return JSON.parse(jsonLdScript.textContent);
            } catch (e) {
                LOG.error(MODULE, 'Failed to parse JSON-LD metadata:', e);
            }
        }
        
        // Fallback: data-meta-* Attribute
        const dataset = sectionElement.dataset;
        if (dataset.metaVersion || dataset.metaCreated) {
            return {
                identifier: dataset.section || sectionElement.id,
                name: dataset.title || sectionElement.querySelector('h2, h3')?.textContent,
                version: dataset.metaVersion,
                dateCreated: dataset.metaCreated,
                dateModified: dataset.metaModified,
                author: dataset.metaAuthor ? { name: dataset.metaAuthor } : null,
                reviewer: dataset.metaReviewer ? [{ name: dataset.metaReviewer }] : null,
                expires: dataset.metaExpires,
                additionalProperty: [
                    { name: 'promptVersion', value: dataset.metaPrompt },
                    { name: 'reviewStatus', value: dataset.metaStatus }
                ].filter(p => p.value)
            };
        }
        
        return null;
    }
    
    // ===== MAINTAINER MODE =====
    
    function toggleMaintainerMode() {
        document.body.classList.toggle('maintainer-mode');
        const isActive = document.body.classList.contains('maintainer-mode');
        
        if (isActive) {
            showMetadataBadges();
            localStorage.setItem('axiom-maintainer-mode', 'true');
            LOG(MODULE, 'Maintainer mode activated');
        } else {
            hideMetadataBadges();
            localStorage.removeItem('axiom-maintainer-mode');
            LOG(MODULE, 'Maintainer mode deactivated');
        }
    }
    
    function loadMaintainerPreference() {
        const isActive = localStorage.getItem('axiom-maintainer-mode') === 'true';
        if (isActive) {
            document.body.classList.add('maintainer-mode');
            showMetadataBadges();
        }
    }
    
    function showMetadataBadges() {
        document.querySelectorAll('.content-section').forEach(section => {
            const metadata = getMetadataForSection(section);
            
            if (metadata && !section.querySelector('.section-metadata-badge')) {
                const badge = document.createElement('button');
                badge.className = 'section-metadata-badge';
                badge.textContent = `📋 v${metadata.version || '?'}`;
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
                    <span class="metadata-value">${metadata.author.name || 'N/A'}${metadata.author.jobTitle ? ` (${metadata.author.jobTitle})` : ''}</span>
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
                    <span class="metadata-value">${metadata.maintainer.name || 'N/A'}${metadata.maintainer.email ? ` &lt;${metadata.maintainer.email}&gt;` : ''}</span>
                </div>
                ` : ''}
                ${metadata.reviewer && metadata.reviewer.length > 0 ? `
                <div class="metadata-item">
                    <span class="metadata-label">Reviewer:</span>
                    <span class="metadata-value">
                        ${metadata.reviewer.map(r => r.name).join(', ')}
                    </span>
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
                                `<a href="${source.url}" target="_blank" rel="noopener">${source.name}</a>` : 
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
                    ${metadata.changeLog.map(entry => `
                        <li class="metadata-changelog-item">
                            <div class="metadata-changelog-date">
                                ${formatDate(entry.date)}
                                <span class="metadata-changelog-version">v${entry.version}</span>
                            </div>
                            <p class="metadata-changelog-desc">${entry.description}</p>
                            <small>von ${entry.author}</small>
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
        
        try {
            const date = new Date(dateString);
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            return date.toLocaleDateString('de-DE', options);
        } catch (e) {
            return dateString;
        }
    }
    
    function formatPropertyName(name) {
        // Convert camelCase to readable format
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }
    
    function getStatusFromMetadata(metadata) {
        if (!metadata.additionalProperty) return 'draft';
        
        const statusProp = metadata.additionalProperty.find(p => p.name === 'reviewStatus');
        return statusProp ? statusProp.value : 'draft';
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
        
        // Check for outdated content
        checkOutdatedContent();
        
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
    
})();
```

---

## Implementierungsstrategie

### Phase 1: Basis-Setup (1-2 Stunden)

**Schritt 1: CSS hinzufügen**
- Alle CSS-Regeln aus dem Dokument in `styles.css` einfügen
- Zwischen Kommentar-Blöcken einfügen: `/* ===== METADATA SYSTEM ===== */`

**Schritt 2: JavaScript-Datei erstellen**
- Neue Datei `script-metadata.js` erstellen
- Kompletten JavaScript-Code einfügen
- In `index.html` einbinden: `<script src="script-metadata.js"></script>`

**Schritt 3: Erstes Metadaten-Beispiel**
- Eine Content-Section mit JSON-LD Metadaten ausstatten
- Testen: `?maintainer=true` im URL anhängen
- Badge sollte sichtbar sein und Panel öffnen

**Test:**
```bash
# URL öffnen
http://localhost/index.html?maintainer=true

# Erwartung:
# - Toggle-Button unten rechts
# - Badge auf Section mit Metadaten
# - Panel öffnet bei Klick auf Badge
```

---

### Phase 2: Metadaten hinzufügen (2-3 Stunden)

**Schritt 1: Template für Metadaten erstellen**
```javascript
// metadata-template.json (als Referenz)
{
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "identifier": "SECTION_ID",
    "name": "SECTION_TITLE",
    "version": "1.0",
    "dateCreated": "YYYY-MM-DDTHH:mm:ssZ",
    "dateModified": "YYYY-MM-DDTHH:mm:ssZ",
    "author": {
        "@type": "Person",
        "name": "AUTHOR_NAME"
    },
    "additionalProperty": [
        {
            "@type": "PropertyValue",
            "name": "reviewStatus",
            "value": "draft"
        }
    ],
    "changeLog": []
}
```

**Schritt 2: Alle Sections durchgehen**
- Liste aller `content-section` Elemente erstellen
- Für jede Section Metadaten ergänzen
- Mindestfelder: `identifier`, `name`, `version`, `dateCreated`, `author`

**Schritt 3: Vereinfachte Variante für schnelle Sections**
```html
<section class="content-section"
         data-section="quicksection"
         data-meta-version="1.0"
         data-meta-created="2025-10-08"
         data-meta-author="Max Mustermann"
         data-meta-status="approved">
```

---

### Phase 3: Integration & Testing (1 Stunde)

**Integration mit bestehendem Code:**

```javascript
// In script-section-management.js
// Beim Navigieren zu Section, Metadaten-Check durchführen
function navigateToSection(sectionId) {
    const section = document.querySelector(`[data-section="${sectionId}"]`);
    
    // ... bestehender Code ...
    
    // NEU: Metadaten-Check
    if (window.MetadataManager) {
        const metadata = window.MetadataManager.getMetadata(section);
        if (metadata && metadata.expires) {
            const expiryDate = new Date(metadata.expires);
            if (expiryDate < new Date()) {
                console.warn('⚠️ Navigating to outdated content:', sectionId);
            }
        }
    }
}
```

**Testing-Checkliste:**
- [ ] Maintainer-Mode aktivieren/deaktivieren funktioniert
- [ ] Badges werden auf Sections mit Metadaten angezeigt
- [ ] Panel öffnet und zeigt alle Metadaten korrekt an
- [ ] Veraltete Sections werden markiert (>1 Jahr oder abgelaufen)
- [ ] Changelog wird chronologisch korrekt dargestellt
- [ ] Quellen-Links sind klickbar und öffnen in neuem Tab
- [ ] ESC-Taste schließt Panel
- [ ] Click außerhalb des Panels schließt es
- [ ] Preference wird in localStorage gespeichert
- [ ] Vereinfachtes Schema (data-meta-*) funktioniert als Fallback

---

## Wartungs-Workflow

### Neuen Content erstellen:

1. **Section anlegen** mit Basis-HTML
2. **Metadaten hinzufügen** (entweder JSON-LD oder data-Attribute)
3. **Mindest-Informationen** setzen:
   - `identifier` (Section-ID)
   - `name` (Titel)
   - `version` (1.0 für neu)
   - `dateCreated` (aktuelles Datum)
   - `author` (Ihr Name)
   - `reviewStatus` (draft)

### Content aktualisieren:

1. **Version hochzählen** (z.B. 1.0 → 1.1 für kleine Änderungen, 2.0 für große)
2. **dateModified** aktualisieren
3. **Changelog-Eintrag** hinzufügen:
   ```json
   {
       "date": "2025-10-08",
       "version": "1.1",
       "description": "Screenshots aktualisiert",
       "author": "Ihr Name"
   }
   ```
4. **reviewStatus** auf "review" setzen
5. Nach Review: Status auf "approved" ändern

### Periodische Wartung:

**Monatlich:**
- Maintainer-Mode aktivieren
- Durch alle Sections scrollen
- Veraltete Markierungen prüfen

**Quartalsweise:**
- Alle Sections mit Status "outdated" überarbeiten
- `expires` Datum verlängern oder Content aktualisieren
- Changelog-Historie durchsehen

---

## Vorteile

✅ **Nachvollziehbarkeit:** Jede Änderung dokumentiert  
✅ **Qualitätssicherung:** Review-Status und Verantwortliche klar  
✅ **Wartungsplanung:** Ablaufdaten zeigen, wann Update nötig  
✅ **Transparenz:** Quellen und Prompt-Versionen dokumentiert  
✅ **Professionell:** Schema.org konform für SEO  
✅ **Flexibel:** Zwei Varianten (JSON-LD oder data-Attribute)  
✅ **Nicht-invasiv:** Standardmäßig unsichtbar für Endnutzer

---

## Technische Details

### Vorteile JSON-LD:
- ✅ Standardkonform (Schema.org)
- ✅ Strukturiert und erweiterbar
- ✅ SEO-freundlich
- ✅ Kann von externen Tools gelesen werden
- ❌ Etwas mehr Schreibaufwand

### Vorteile data-Attribute:
- ✅ Schnell zu schreiben
- ✅ Einfach per JavaScript auszulesen
- ✅ Für einfache Fälle ausreichend
- ❌ Nicht standardkonform
- ❌ Weniger strukturiert

### Empfehlung:
**Mischung verwenden:**
- Wichtige/komplexe Sections: JSON-LD
- Einfache/schnelle Sections: data-Attribute
- System unterstützt beides gleichzeitig

---

## Barrierefreiheit

**Implementierte Maßnahmen:**

1. **Keyboard-Navigation:**
   - ESC-Taste schließt Panel
   - Tab-Navigation in Panel möglich

2. **ARIA-Labels:**
   - Badges haben `aria-label="Metadaten anzeigen"`
   - Close-Button hat `aria-label="Schließen"`

3. **Visuelle Hinweise:**
   - Badges nur für Maintainer sichtbar
   - Veraltete Content-Warnung klar markiert
   - Kontraste gemäß WCAG 2.1 AA

4. **Screen-Reader:**
   - Strukturierte Überschriften im Panel
   - Semantisches HTML (dl/dt/dd könnte verwendet werden)

---

## Erweiterungsmöglichkeiten

### 1. Export-Funktion
```javascript
function exportMetadata() {
    const allMetadata = [];
    
    document.querySelectorAll('.content-section').forEach(section => {
        const meta = getMetadataForSection(section);
        if (meta) allMetadata.push(meta);
    });
    
    const json = JSON.stringify(allMetadata, null, 2);
    downloadAsFile(json, 'metadata-export.json');
}
```

### 2. Automatische Metadaten-Generierung
```javascript
// KI-gestützte Metadaten-Vorschläge
async function suggestMetadata(sectionElement) {
    const content = sectionElement.textContent;
    const response = await fetch('/api/suggest-metadata', {
        method: 'POST',
        body: JSON.stringify({ content })
    });
    return await response.json();
}
```

### 3. Versionskontrolle-Integration
```javascript
// Git-Commit-Hashes als Versionen
function getGitVersionForSection(sectionId) {
    return fetch(`/api/git-version/${sectionId}`)
        .then(r => r.json());
}
```

### 4. Benachrichtigungen
```javascript
// E-Mail an Maintainer bei veralteten Sections
function notifyOutdatedContent() {
    const outdated = document.querySelectorAll('[data-meta-status="outdated"]');
    
    if (outdated.length > 0) {
        fetch('/api/notify-maintainer', {
            method: 'POST',
            body: JSON.stringify({
                count: outdated.length,
                sections: Array.from(outdated).map(s => s.dataset.section)
            })
        });
    }
}
```

---

## Zusammenfassung

Das **Content-Metadaten-System** bietet eine professionelle Lösung für:

- ✅ Langfristige Wartbarkeit des Leitfadens
- ✅ Transparente Dokumentation aller Änderungen
- ✅ Klare Verantwortlichkeiten und Review-Prozesse
- ✅ Automatische Erkennung veralteter Inhalte
- ✅ Nachvollziehbarkeit von Quellen und Prompt-Versionen
- ✅ Flexible Implementierung (JSON-LD oder data-Attribute)
- ✅ Nicht-invasiv (für Endnutzer unsichtbar)

**Aufwand:** 4-6 Stunden für vollständige Implementierung  
**Wartungsaufwand:** Minimal (5-10 Minuten pro Content-Update)  
**ROI:** Sehr hoch bei langfristiger Projektpflege

---

**Ende des Dokuments**  
*Version: 1.0*  
*Datum: 08. Oktober 2025*