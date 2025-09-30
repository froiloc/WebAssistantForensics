// ===== MEDIA-HANDLER.JS - Medien-Funktionalität für AXIOM Leitfaden =====

// ===== GLOBALE VARIABLEN =====
let mediaModalOpen = false;
let mediaLayer = 'standard'; // minimal, standard, full
let highContrastMode = false;

// ===== INITIALISIERUNG =====
document.addEventListener('DOMContentLoaded', function() {
    initMediaHandling();
    initMediaLayer();
    initVideoSubtitles();
    initMediaErrorHandling();
    loadMediaPreferences();
});

// ===== MEDIEN-HANDLING INITIALISIEREN =====
function initMediaHandling() {
    // Modal erstellen falls nicht vorhanden
    createMediaModal();
    
    // Thumbnail-Klicks
    initThumbnailClicks();
    
    // Medien-Hilfe-Buttons (Lupensymbol)
    initMediaHelpButtons();
    
    // Modal-Schließen-Events
    initModalCloseEvents();
}

// ===== MEDIA-MODAL ERSTELLEN =====
function createMediaModal() {
    // Prüfen ob Modal bereits existiert
    if (document.getElementById('media-modal')) {
        return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'media-modal';
    modal.className = 'media-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'media-modal-title');
    
    modal.innerHTML = `
        <div class="media-modal-overlay" aria-hidden="true"></div>
        <div class="media-modal-content">
            <div class="media-modal-header">
                <h3 id="media-modal-title">Medienansicht</h3>
                <button class="media-modal-close" aria-label="Schließen">✕</button>
            </div>
            <div class="media-modal-body">
                <!-- Dynamisch gefüllt -->
            </div>
            <div class="media-modal-caption">
                <!-- Bildunterschrift -->
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ===== THUMBNAIL-KLICKS =====
function initThumbnailClicks() {
    const thumbnails = document.querySelectorAll('.media-thumbnail');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const fullsizeSrc = this.dataset.fullsize || this.src;
            const alt = this.alt;
            const caption = this.closest('.media-figure')?.querySelector('figcaption')?.textContent || '';
            
            openMediaModal(fullsizeSrc, alt, 'image', caption);
        });
        
        // Tastatur-Support
        thumb.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ===== MEDIEN-HILFE-BUTTONS (LUPENSYMBOL) =====
function initMediaHelpButtons() {
    const helpButtons = document.querySelectorAll('.media-help-trigger');
    
    helpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mediaSrc = this.dataset.mediaSrc;
            const mediaAlt = this.dataset.mediaAlt || 'Screenshot';
            const mediaType = this.dataset.mediaType || 'image';
            
            openMediaModal(mediaSrc, mediaAlt, mediaType);
        });
    });
}

// ===== MEDIA-MODAL ÖFFNEN =====
function openMediaModal(src, alt, type = 'image', caption = '') {
    const modal = document.getElementById('media-modal');
    const modalBody = modal.querySelector('.media-modal-body');
    const modalCaption = modal.querySelector('.media-modal-caption');
    const modalTitle = modal.querySelector('#media-modal-title');
    
    // Body leeren
    modalBody.innerHTML = '';
    
    // Loading-Indicator
    modalBody.innerHTML = '<div class="media-loading"></div>';
    
    // Content basierend auf Typ erstellen
    if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        
        if (highContrastMode) {
            img.classList.add('high-contrast');
        }
        
        img.onload = function() {
            modalBody.innerHTML = '';
            modalBody.appendChild(img);
        };
        
        img.onerror = function() {
            modalBody.innerHTML = '<p style="color: #dc3545;">⚠️ Bild konnte nicht geladen werden</p>';
        };
        
        modalTitle.textContent = 'Bildansicht';
        
    } else if (type === 'video') {
        const video = document.createElement('video');
        video.controls = true;
        video.preload = 'metadata';
        
        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        
        video.appendChild(source);
        
        video.onloadedmetadata = function() {
            modalBody.innerHTML = '';
            modalBody.appendChild(video);
        };
        
        video.onerror = function() {
            modalBody.innerHTML = '<p style="color: #dc3545;">⚠️ Video konnte nicht geladen werden</p>';
        };
        
        modalTitle.textContent = 'Videoansicht';
    }
    
    // Caption setzen
    modalCaption.textContent = caption || alt;
    
    // Modal anzeigen
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    mediaModalOpen = true;
    
    // Body-Scroll sperren
    document.body.style.overflow = 'hidden';
}

// ===== MEDIA-MODAL SCHLIESSEN =====
function closeMediaModal() {
    const modal = document.getElementById('media-modal');
    
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    mediaModalOpen = false;
    
    // Body-Scroll freigeben
    document.body.style.overflow = '';
    
    // Cleanup: Video stoppen falls vorhanden
    const video = modal.querySelector('video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
}

// ===== MODAL-SCHLIESSEN-EVENTS =====
function initModalCloseEvents() {
    const modal = document.getElementById('media-modal');
    
    // Close-Button
    const closeBtn = modal.querySelector('.media-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMediaModal);
    }
    
    // Overlay-Klick
    const overlay = modal.querySelector('.media-modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeMediaModal);
    }
    
    // ESC-Taste
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mediaModalOpen) {
            closeMediaModal();
        }
    });
}

// ===== MEDIEN-LAYER INITIALISIEREN =====
function initMediaLayer() {
    // Toggle-Button im Menü
    const toggleBtn = document.getElementById('toggle-media-layer');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleMediaLayer);
    }
    
    // Kontrast-Button
    const contrastBtn = document.getElementById('toggle-contrast');
    if (contrastBtn) {
        contrastBtn.addEventListener('click', toggleHighContrast);
    }
}

// ===== MEDIEN-LAYER UMSCHALTEN =====
function toggleMediaLayer() {
    const modes = ['minimal', 'standard', 'full'];
    const currentIndex = modes.indexOf(mediaLayer);
    const nextIndex = (currentIndex + 1) % modes.length;
    mediaLayer = modes[nextIndex];
    
    // CSS-Klassen setzen
    document.body.className = document.body.className.replace(/media-\w+/g, '');
    document.body.classList.add(`media-${mediaLayer}`);
    
    // Status aktualisieren
    const statusElement = document.getElementById('media-layer-status');
    if (statusElement) {
        const statusText = {
            'minimal': 'Minimal',
            'standard': 'Standard',
            'full': 'Vollständig'
        };
        statusElement.textContent = statusText[mediaLayer];
    }
    
    // Speichern
    saveMediaPreferences();
}

// ===== HIGH-CONTRAST UMSCHALTEN =====
function toggleHighContrast() {
    highContrastMode = !highContrastMode;
    
    // Alle Thumbnails aktualisieren
    const thumbnails = document.querySelectorAll('.media-thumbnail');
    thumbnails.forEach(thumb => {
        if (highContrastMode) {
            thumb.classList.add('high-contrast');
        } else {
            thumb.classList.remove('high-contrast');
        }
    });
    
    // Button-Status aktualisieren
    const btn = document.getElementById('toggle-contrast');
    if (btn) {
        const icon = btn.querySelector('.menu-icon');
        if (icon) {
            icon.textContent = highContrastMode ? '🌕' : '🌗';
        }
    }
    
    // Speichern
    saveMediaPreferences();
}

// ===== VIDEO-UNTERTITEL AUTOMATISCH LADEN =====
function initVideoSubtitles() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Prüfen ob bereits manuelle tracks vorhanden
        if (video.querySelector('track')) {
            return; // Explizites track-tag hat Vorrang
        }
        
        // Video-Src extrahieren
        const source = video.querySelector('source');
        if (!source) return;
        
        const videoSrc = source.getAttribute('src');
        const vttPath = videoSrc.replace(/\.(mp4|webm|ogg)$/, '.vtt');
        
        // Prüfen ob VTT existiert
        fetch(vttPath, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // Track-Element erstellen
                    const track = document.createElement('track');
                    track.kind = 'subtitles';
                    track.src = vttPath;
                    track.srclang = 'de';
                    track.label = 'Deutsch';
                    track.default = true;
                    
                    video.appendChild(track);
                    
                    console.info(`✓ Untertitel geladen: ${vttPath}`);
                } else {
                    console.warn(`⚠️ Untertitel nicht gefunden: ${vttPath}`);
                }
            })
            .catch(() => {
                console.warn(`⚠️ Untertitel nicht verfügbar: ${vttPath}`);
            });
    });
}

// ===== FEHLERBEHANDLUNG FÜR FEHLENDE MEDIEN =====
function initMediaErrorHandling() {
    const images = document.querySelectorAll('.media-thumbnail, .media-figure img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`⚠️ Mediendatei nicht gefunden: ${this.src}`);
            
            // Figcaption mit Hinweis anzeigen
            const figure = this.closest('.media-figure');
            if (figure) {
                figure.classList.add('media-missing');
                const caption = figure.querySelector('figcaption');
                if (caption) {
                    caption.innerHTML = `⚠️ Bild nicht verfügbar: ${this.alt}`;
                }
            } else {
                // Standalone-Bild oder Lupensymbol
                this.style.display = 'none';
                
                // Eltern-Element warnen
                const parent = this.closest('.media-help-trigger');
                if (parent) {
                    parent.style.display = 'none';
                }
            }
        });
    });
    
    // Videos
    const videos = document.querySelectorAll('.media-video');
    videos.forEach(video => {
        video.addEventListener('error', function() {
            console.warn(`⚠️ Video nicht gefunden: ${this.src}`);
            
            const figure = this.closest('.media-figure');
            if (figure) {
                figure.classList.add('media-missing');
                const caption = figure.querySelector('figcaption');
                if (caption) {
                    caption.innerHTML = `⚠️ Video nicht verfügbar`;
                }
            }
        });
    });
}

// ===== EINSTELLUNGEN SPEICHERN =====
function saveMediaPreferences() {
    try {
        localStorage.setItem('axiom-guide-media-layer', mediaLayer);
        localStorage.setItem('axiom-guide-high-contrast', highContrastMode);
    } catch (e) {
        console.error('Fehler beim Speichern der Medien-Einstellungen:', e);
    }
}

// ===== EINSTELLUNGEN LADEN =====
function loadMediaPreferences() {
    try {
        const savedLayer = localStorage.getItem('axiom-guide-media-layer');
        const savedContrast = localStorage.getItem('axiom-guide-high-contrast');
        
        if (savedLayer && ['minimal', 'standard', 'full'].includes(savedLayer)) {
            mediaLayer = savedLayer;
            document.body.classList.add(`media-${mediaLayer}`);
            
            const statusElement = document.getElementById('media-layer-status');
            if (statusElement) {
                const statusText = {
                    'minimal': 'Minimal',
                    'standard': 'Standard',
                    'full': 'Vollständig'
                };
                statusElement.textContent = statusText[mediaLayer];
            }
        } else {
            // Default: Standard
            document.body.classList.add('media-standard');
        }
        
        if (savedContrast === 'true') {
            highContrastMode = true;
            const thumbnails = document.querySelectorAll('.media-thumbnail');
            thumbnails.forEach(thumb => thumb.classList.add('high-contrast'));
            
            const btn = document.getElementById('toggle-contrast');
            if (btn) {
                const icon = btn.querySelector('.menu-icon');
                if (icon) {
                    icon.textContent = '🌕';
                }
            }
        }
    } catch (e) {
        console.error('Fehler beim Laden der Medien-Einstellungen:', e);
        // Fallback: Standard-Modus
        document.body.classList.add('media-standard');
    }
}

// ===== EXPORT FÜR EXTERNE VERWENDUNG =====
window.mediaAPI = {
    openModal: openMediaModal,
    closeModal: closeMediaModal,
    toggleLayer: toggleMediaLayer,
    toggleContrast: toggleHighContrast,
    getLayer: () => mediaLayer,
    isHighContrast: () => highContrastMode
};
