/**
 * Glossary Manager - Verwaltungssystem für das Glossar-Feature
 * 
 * @description Bietet Funktionalität zur Erkennung und Anzeige von Glossar-Begriffen im Text
 * @version 1.0.0
 * @license MIT
 */

// IIFE für Modul-Isolation
(function() {
    'use strict';

    const CONST = window.APP_CONSTANTS;
    const MODULE = 'GLOSSARY';

    LOG.debug(MODULE, 'Glossary Manager: Script loading started');

    // Warten auf benötigte Abhängigkeiten
    function initializeGlossaryManager() {
        LOG.debug(MODULE, 'Glossary Manager: Checking dependencies');
        
        // Prüfen, ob LOG object verfügbar ist
        if (typeof window.LOG === 'undefined') {
            LOG.error(MODULE, 'Glossary Manager: LOG object nicht verfügbar. Initialisierung abgebrochen.');
            return;
        }

        LOG.debug(MODULE, 'Glossary Manager: Dependencies available, creating module');
        createGlossaryManager();

        // === ADD THIS RIGHT AFTER createGlossaryManager() === //
        LOG.debug(MODULE, 'Glossary Manager: Calling init() on GlossaryManager');
        if (window.GlossaryManager && typeof window.GlossaryManager.init === 'function') {
            window.GlossaryManager.init().then(success => {
                if (success) {
                    LOG.success(MODULE, 'Glossary Manager: Auto-initialization completed successfully');
                } else {
                    LOG.error(MODULE, 'Glossary Manager: Auto-initialization failed');
                }
            }).catch(error => {
                LOG.error(MODULE, 'Glossary Manager: Auto-initialization error:', error);
            });
        } else {
            LOG.error(MODULE, 'Glossary Manager: init method not available on GlossaryManager');
        }
    }

    function createGlossaryManager() {
        try {
            LOG.debug(MODULE, 'Glossary Manager: Creating module instance');
            
            // Private Variablen
            let _isInitialized = false;
            let _searchIndex = null;
            let _fullGlossary = null;
            let _patternCompiler = null;
            let _activeHighlights = new Map();
            let _currentViewportRange = null;

            // DOM Element Referenzen
            let _glossaryTooltip = null;

            // Konfiguration
            const CONFIG = {
                viewportBuffer: 1000, // Pixel Buffer um den Viewport
                highlightClass: 'glossary-term',
                highlightActiveClass: 'glossary-term--active',
                tooltipClass: 'glossary-tooltip',
                overlayClass: 'glossary-overlay',
                dataUrls: {
                    searchIndex: './dist/glossary.index.json',
                    fullData: './dist/glossary.validated.json'
                },
                selectors: {
                    mainContent: 'main',
                    contentSections: '.content-section'
                }
            };

            LOG.debug(MODULE, 'Glossary Manager: Configuration setup completed');

            /**
             * Pattern Compiler für reguläre Ausdrücke
             */
            const PatternCompiler = {
                /**
                 * Kompiliert alle Patterns für die Suche
                 * 
                 * @param {Array} patterns - Pattern-Array aus dem Search Index
                 * @returns {Array} Kompilierte Patterns
                 */
                compilePatterns(patterns) {
                    LOG.debug(MODULE, `Glossary Manager: Compiling ${patterns ? patterns.length : 0} patterns`);
                    if (!patterns || !Array.isArray(patterns)) {
                        LOG.warn(MODULE, 'Glossary Manager: Ungültige Patterns für Kompilierung');
                        return [];
                    }

                    const compiledPatterns = patterns.map(pattern => {
                        try {
                            return {
                                ...pattern,
                                compiled: new RegExp(pattern.pattern, 'gi')
                            };
                        } catch (error) {
                            LOG.error(MODULE, `Glossary Manager: Fehler beim Kompilieren des Patterns "${pattern.original}":`, error);
                            return null;
                        }
                    }).filter(Boolean);

                    LOG.debug(MODULE, `Glossary Manager: Successfully compiled ${compiledPatterns.length} patterns`);
                    return compiledPatterns;
                },

                /**
                * Findet alle Vorkommen eines Begriffs im Text mit genauer Position
                *
                * @param {string} text - Zu durchsuchender Text
                * @param {Array} patterns - Kompilierte Patterns
                * @returns {Array|null} Array von Matches mit Positionen oder null
                */
                findAllTermMatches(text, patterns) {
                    if (!text || !patterns) {
                        LOG.debug(MODULE, 'Glossary Manager: No text or patterns provided for detailed matching');
                        return null;
                    }

                    LOG.debug(MODULE, `Glossary Manager: Detailed matching in text: "${text.substring(0, 50)}..."`);

                    const whitePatterns = patterns.filter(p => p.type === 'white');
                    const blackPatterns = patterns.filter(p => p.type === 'black');

                    const matches = [];

                    for (const pattern of whitePatterns) {
                        const regex = new RegExp(pattern.pattern, 'gi');
                        let match;

                        while ((match = regex.exec(text)) !== null) {
                            const matchedText = match[0];

                            // Prüfen ob black pattern den Fund ausschließen
                            const shouldExclude = blackPatterns.some(blackPattern => {
                                const blackRegex = new RegExp(blackPattern.pattern, 'i');
                                return blackRegex.test(matchedText);
                            });

                            if (!shouldExclude) {
                                matches.push({
                                    termId: pattern.term_id,
                                    matchedText: matchedText,
                                    start: match.index,
                                    end: match.index + matchedText.length - 1
                                });
                                LOG.debug(MODULE, `Glossary Manager: Found term "${pattern.term_id}" at position ${match.index}`);
                            }

                            // Avoid infinite loops with zero-length matches
                            if (match.index === regex.lastIndex) {
                                regex.lastIndex++;
                            }
                        }
                    }

                    LOG.debug(MODULE, `Glossary Manager: Found ${matches.length} detailed matches`);
                    return matches.length > 0 ? matches : null;
                },

                /**
                 * Findet passende Begriffe im Text
                 * 
                 * @param {string} text - Zu durchsuchender Text
                 * @param {Array} patterns - Kompilierte Patterns
                 * @returns {string|null} Term ID des gefundenen Begriffs
                 */
                findMatchingTerm(text, patterns) {
                    if (!text || !patterns) {
                        LOG.debug(MODULE, 'Glossary Manager: No text or patterns provided for matching');
                        return null;
                    }

                    LOG.debug(MODULE, `Glossary Manager: Searching for terms in text: "${text.substring(0, 50)}..."`);
                    
                    // Zuerst nach white patterns suchen
                    const whitePatterns = patterns.filter(p => p.type === 'white');
                    const blackPatterns = patterns.filter(p => p.type === 'black');

                    LOG.debug(MODULE, `Glossary Manager: Checking ${whitePatterns.length} white patterns and ${blackPatterns.length} black patterns`);

                    for (const pattern of whitePatterns) {
                        // Temporären Matcher erstellen, um global flag Zustand zu vermeiden
                        const tempRegex = new RegExp(pattern.pattern, 'i');
                        if (tempRegex.test(text)) {
                            LOG.debug(MODULE, `Glossary Manager: White pattern match found: ${pattern.original}`);
                            
                            // Prüfen ob black pattern den Fund ausschließen
                            const shouldExclude = blackPatterns.some(blackPattern => {
                                const blackRegex = new RegExp(blackPattern.pattern, 'i');
                                const exclude = blackRegex.test(text);
                                if (exclude) {
                                    LOG.debug(MODULE, `Glossary Manager: Excluded by black pattern: ${blackPattern.original}`);
                                }
                                return exclude;
                            });

                            if (!shouldExclude) {
                                LOG.debug(MODULE, `Glossary Manager: Final match found for term: ${pattern.term_id}`);
                                return pattern.term_id;
                            }
                        }
                    }

                    LOG.debug(MODULE, 'Glossary Manager: No matching terms found');
                    return null;
                }
            };

            /**
             * Viewport Manager für effiziente Text-Verarbeitung
             */
            const ViewportManager = {
                /**
                 * Berechnet den aktuellen Viewport-Bereich inklusive Buffer
                 * 
                 * @returns {Object} Viewport-Bereich {top, bottom}
                 */
                getViewportRange() {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollBottom = scrollTop + window.innerHeight;
                    
                    const range = {
                        top: Math.max(0, scrollTop - CONFIG.viewportBuffer),
                        bottom: scrollBottom + CONFIG.viewportBuffer
                    };

                    LOG.debug(MODULE, `Glossary Manager: Viewport range calculated: ${range.top}px to ${range.bottom}px`);
                    return range;
                },

                /**
                 * Prüft ob ein Element im Viewport-Bereich liegt
                 * 
                 * @param {HTMLElement} element - DOM Element
                 * @param {Object} viewportRange - Viewport-Bereich
                 * @returns {boolean} True wenn im Bereich
                 */
                isInViewportRange(element, viewportRange) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.pageYOffset;
                    const elementBottom = elementTop + rect.height;

                    const isInRange = elementBottom >= viewportRange.top && elementTop <= viewportRange.bottom;
                    LOG.debug(MODULE, `Glossary Manager: Element ${isInRange ? 'is' : 'is NOT'} in viewport range`);
                    return isInRange;
                },

                /**
                 * Findet alle Text-Knoten im Viewport-Bereich
                 * 
                 * @param {Object} viewportRange - Viewport-Bereich
                 * @returns {Array} Text-Knoten im Bereich
                 */
                findTextNodesInRange(viewportRange) {
                    LOG.debug(MODULE, 'Glossary Manager: Finding text nodes in viewport range');
                    
                    const textNodes = [];
                    const mainContent = document.querySelector(CONFIG.selectors.mainContent);
                    
                    if (!mainContent) {
                        LOG.warn(MODULE, 'Glossary Manager: Main content element not found');
                        return textNodes;
                    }

                    const walker = document.createTreeWalker(
                        mainContent,
                        NodeFilter.SHOW_TEXT,
                        {
                            acceptNode: function(node) {
                                // Ignoriere leere Knoten und Knoten in bereits verarbeiteten Elementen
                                if (!node.textContent.trim() || 
                                    node.parentElement.closest(`.${CONFIG.highlightClass}`)) {
                                    return NodeFilter.FILTER_REJECT;
                                }
                                return NodeFilter.FILTER_ACCEPT;
                            }
                        }
                    );

                    let node;
                    let nodeCount = 0;
                    while ((node = walker.nextNode())) {
                        nodeCount++;
                        const parentElement = node.parentElement;
                        if (parentElement && this.isInViewportRange(parentElement, viewportRange)) {
                            textNodes.push({
                                node: node,
                                element: parentElement,
                                text: node.textContent
                            });
                        }
                    }

                    LOG.debug(MODULE, `Glossary Manager: Found ${textNodes.length} text nodes in range (from ${nodeCount} total nodes)`);
                    return textNodes;
                }
            };

            /**
             * DOM Manager für Glossar-Highlights und Tooltips
             */
            const DOMManager = {
                /**
                 * Erstellt ein Glossar-Highlight für einen Begriff
                 * 
                 * @param {string} termId - Term ID
                 * @param {string} text - Original Text
                 * @returns {HTMLElement} Highlight Element
                 */
                createHighlight(termId, text) {
                    LOG.debug(MODULE, `Glossary Manager: Creating highlight for term: ${termId}`);
                    
                    const span = document.createElement('span');
                    span.className = CONFIG.highlightClass;
                    span.setAttribute('data-glossary-term', termId);
                    span.setAttribute('tabindex', '0');
                    span.setAttribute('role', 'button');
                    span.setAttribute('aria-label', `Glossar Begriff: ${text}. Drücke Enter für Details.`);
                    span.textContent = text;

                    // Event Listener für Klick
                    span.addEventListener('click', _handleTermClick);
                    span.addEventListener('keydown', function(event) {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            _handleTermClick(event);
                        }
                    });

                    return span;
                },

                /**
                * Enhanced version that processes ALL terms in one pass
                */
                replaceWithHighlight(textNode, allMatches) {
                    const { node, element } = textNode;
                    const fullText = node.textContent;

                    LOG.debug(MODULE, `Glossary Manager: Processing ${allMatches.length} different terms in text node`);

                    // Sort matches by start position to process in order
                    const sortedMatches = allMatches.sort((a, b) => a.start - b.start);
                    const fragment = document.createDocumentFragment();
                    let lastIndex = 0;

                    // Process all matches from all terms in order
                    sortedMatches.forEach(match => {
                        // Add text before this match
                        if (match.start > lastIndex) {
                            const beforeText = fullText.substring(lastIndex, match.start);
                            fragment.appendChild(document.createTextNode(beforeText));
                        }

                        // Create highlight for this specific term
                        const highlight = this.createHighlight(match.termId, match.matchedText);
                        fragment.appendChild(highlight);

                        lastIndex = match.end + 1;
                    });

                    // Add remaining text after the last match
                    if (lastIndex < fullText.length) {
                        fragment.appendChild(document.createTextNode(fullText.substring(lastIndex)));
                    }

                    // Replace the original text node
                    element.replaceChild(fragment, node);
                    LOG.debug(MODULE, `Glossary Manager: Successfully processed ${sortedMatches.length} terms from ${new Set(sortedMatches.map(m => m.termId)).size} unique terms`);
                },

                /**
                * Processes ALL glossary terms in a text node in a single pass
                * Filters to keep only longest non-overlapping matches
                *
                * @param {Object} textNode - TextNode with parent element
                * @param {Array} allMatches - All term matches with positions
                */
                replaceWithHighlightMulti(textNode, allMatches) {
                    const { node, element } = textNode;
                    const fullText = node.textContent;

                    LOG.debug(MODULE, `Glossary Manager: Processing ${allMatches.length} raw matches in text node`);

                    // Step 1: Filter to keep only longest non-overlapping matches
                    const filteredMatches = this.filterToLongestNonOverlapping(allMatches);

                    LOG.debug(MODULE, 'Glossary Manager: After filtering:', filteredMatches.map(m =>
                    `${m.matchedText} (${m.start}-${m.end}) for term: ${m.termId}`
                    ));

                    LOG.debug(MODULE, `Glossary Manager: Filtered to ${filteredMatches.length} non-overlapping matches`);

                    // Step 2: Sort matches by start position to process in order
                    const sortedMatches = filteredMatches.sort((a, b) => a.start - b.start);
                    const fragment = document.createDocumentFragment();
                    let lastIndex = 0;

                    // Step 3: Process all filtered matches in order
                    sortedMatches.forEach(match => {
                        // Add text before this match
                        if (match.start > lastIndex) {
                            const beforeText = fullText.substring(lastIndex, match.start);
                            fragment.appendChild(document.createTextNode(beforeText));
                        }

                        // Create highlight for this specific term
                        const highlight = this.createHighlight(match.termId, match.matchedText);
                        fragment.appendChild(highlight);

                        lastIndex = match.end + 1;
                    });

                    // Add remaining text after the last match
                    if (lastIndex < fullText.length) {
                        fragment.appendChild(document.createTextNode(fullText.substring(lastIndex)));
                    }

                    // Replace the original text node
                    element.replaceChild(fragment, node);

                    const uniqueTermCount = new Set(sortedMatches.map(m => m.termId)).size;
                    LOG.debug(MODULE, 'Glossary Manager: Raw matches found:', allMatches.map(m =>
                    `${m.matchedText} (${m.start}-${m.end}) for term: ${m.termId}`
                    ));
                    LOG.debug(MODULE, `Glossary Manager: Successfully processed ${sortedMatches.length} terms from ${uniqueTermCount} unique terms`);
                },

                /**
                * Filters matches to keep only the longest non-overlapping ones
                * FIXED VERSION - properly handles contained matches
                *
                * @param {Array} matches - All raw matches
                * @returns {Array} Filtered matches with no overlaps
                */
                // Add this detailed debugging to your filterToLongestNonOverlapping function
                filterToLongestNonOverlapping(matches) {
                    if (!matches || matches.length === 0) return [];

                    LOG.debug(MODULE, '=== STARTING NUCLEAR FILTERING ===');
                    LOG.debug(MODULE, 'All matches:', matches.map(m => `${m.matchedText} (${m.start}-${m.end})`));

                    // Sort by start position
                    const sorted = [...matches].sort((a, b) => a.start - b.start);

                    // Group by overlapping regions with STRICT overlap detection
                    const groups = [];
                    let currentGroup = [sorted[0]];

                    LOG.debug(MODULE, `Starting group with: "${sorted[0].matchedText}" (${sorted[0].start}-${sorted[0].end})`);

                    for (let i = 1; i < sorted.length; i++) {
                        const current = sorted[i];
                        const lastInGroup = currentGroup[currentGroup.length - 1];

                        LOG.debug(MODULE, `Checking: "${current.matchedText}" (${current.start}-${current.end}) vs last in group: "${lastInGroup.matchedText}" (${lastInGroup.start}-${lastInGroup.end})`);

                        // STRICT OVERLAP DETECTION: Only group if they actually overlap, not just touch
                        //const hasActualOverlap = current.start < lastInGroup.end;
                        // SUPER STRICT: Only group if they share at least 1 character of overlap
                        const hasActualOverlap = current.start <= lastInGroup.end && current.end >= lastInGroup.start;

                        if (hasActualOverlap) {
                            LOG.debug(MODULE, `→ ACTUAL OVERLAP DETECTED - adding to current group`);
                            currentGroup.push(current);
                        } else {
                            LOG.debug(MODULE, `→ NO OVERLAP (or just touching) - starting new group`);
                            groups.push(currentGroup);
                            currentGroup = [current];
                        }
                    }
                    groups.push(currentGroup);

                    LOG.debug(MODULE, `Formed ${groups.length} overlap groups:`, groups.map(g => g.map(m => m.matchedText)));

                    // From each group, take only the ABSOLUTE longest match by CHARACTER COUNT
                    const filtered = groups.map((group, index) => {
                        const longest = group.reduce((longest, current) => {
                            // Calculate actual character length from positions
                            const currentLength = current.end - current.start + 1;
                            const longestLength = longest.end - longest.start + 1;

                            LOG.debug(MODULE, `Group ${index}: Comparing "${current.matchedText}" (${currentLength} chars) vs "${longest.matchedText}" (${longestLength} chars)`);

                            return currentLength > longestLength ? current : longest;
                        });
                        LOG.debug(MODULE, `Group ${index}: FINAL CHOICE "${longest.matchedText}" (${longest.end - longest.start + 1} chars)`);
                        return longest;
                    });

                    LOG.debug(MODULE, `=== FILTERING COMPLETE: ${matches.length} → ${filtered.length} ===`);
                    return filtered.sort((a, b) => a.start - b.start);
                },

                /**
                 * Initialisiert das Tooltip-Overlay
                 */
                initTooltip() {
                    if (_glossaryTooltip) {
                        LOG.debug(MODULE, 'Glossary Manager: Tooltip already initialized');
                        return;
                    }

                    LOG.debug(MODULE, 'Glossary Manager: Initializing tooltip');
                    
                    _glossaryTooltip = document.createElement('div');
                    _glossaryTooltip.className = CONFIG.tooltipClass;
                    _glossaryTooltip.setAttribute('role', 'tooltip');
                    _glossaryTooltip.setAttribute('aria-hidden', 'true');
                    
                    document.body.appendChild(_glossaryTooltip);
                    LOG.debug(MODULE, 'Glossary Manager: Tooltip created and added to DOM');
                },

                /**
                 * Zeigt Tooltip für einen Begriff an
                 * 
                 * @param {string} termId - Term ID
                 * @param {HTMLElement} targetElement - Zielelement für Positionierung
                 */
                showTooltip(termId, targetElement) {
                    if (!_glossaryTooltip || !_fullGlossary) {
                        LOG.warn(MODULE, 'Glossary Manager: Cannot show tooltip - tooltip or glossary data not available');
                        return;
                    }

                    const termIndex = _searchIndex.lookup[termId];
                    if (termIndex === undefined) {
                        LOG.warn(MODULE, `Glossary Manager: Term ID not found in lookup: ${termId}`);
                        return;
                    }

                    const term = _fullGlossary[termIndex];
                    if (!term) {
                        LOG.warn(MODULE, `Glossary Manager: Term data not found for index: ${termIndex}`);
                        return;
                    }

                    LOG.debug(MODULE, `Glossary Manager: Showing tooltip for term: ${term.term}`);

                    // Tooltip Inhalt erstellen
                    _glossaryTooltip.innerHTML = `
                        <div class="glossary-tooltip__header">
                            <strong>${term.term}</strong>
                        </div>
                        <div class="glossary-tooltip__content">
                            ${term.shortDefinition}
                        </div>
                        ${term.extendedExplanation ? 
                            `<div class="glossary-tooltip__footer">
                                <button class="glossary-tooltip__more" data-term-id="${termId}">
                                    Mehr erfahren
                                </button>
                            </div>` : ''
                        }
                    `;

                    // Position berechnen
                    const rect = targetElement.getBoundingClientRect();
                    _glossaryTooltip.style.left = `${rect.left + window.pageXOffset}px`;
                    _glossaryTooltip.style.top = `${rect.bottom + window.pageYOffset + 5}px`;

                    // Anzeigen
                    _glossaryTooltip.setAttribute('aria-hidden', 'false');
                    _glossaryTooltip.classList.add('glossary-tooltip--visible');

                    LOG.debug(MODULE, 'Glossary Manager: Tooltip positioned and made visible');

                    // Event Listener für "Mehr erfahren" Button
                    const moreButton = _glossaryTooltip.querySelector('.glossary-tooltip__more');
                    if (moreButton) {
                        moreButton.addEventListener('click', (e) => {
                            e.stopPropagation();
                            _showDetailedView(termId);
                        });
                    }
                },

                /**
                 * Versteckt den Tooltip
                 */
                hideTooltip() {
                    if (!_glossaryTooltip) {
                        LOG.debug(MODULE, 'Glossary Manager: No tooltip to hide');
                        return;
                    }
                    
                    _glossaryTooltip.setAttribute('aria-hidden', 'true');
                    _glossaryTooltip.classList.remove('glossary-tooltip--visible');
                    LOG.debug(MODULE, 'Glossary Manager: Tooltip hidden');
                }
            };

            // Replace the stub function with this implementation
            function _showDetailedView(termId) {
                LOG.debug(MODULE, `Glossary Manager: Showing detailed view for term: ${termId}`);

                // Get term details
                const termIndex = _searchIndex.lookup[termId];
                if (termIndex === undefined) {
                    LOG.warn(MODULE, `Glossary Manager: Term ID not found for detailed view: ${termId}`);
                    return;
                }

                const term = _fullGlossary[termIndex];
                if (!term || !term.extendedExplanation) {
                    LOG.warn(MODULE, `Glossary Manager: No extended explanation available for term: ${termId}`);
                    return;
                }

                const mediaSection = term.media.path.length > 0 ? `
                    <div class="glossary-modal__media">
                    <figure>
                    <img src="${term.media.path}"
                    alt="${term.media.alt}"
                    class="glossary-modal__image"
                    onerror="this.style.display='none'; console.warn('Failed to load media for term: ${term.term}')">
                    <figcaption>${term.media.caption}</figcaption>
                    </figure>
                    </div>
                    ` : '';

                // Hide the tooltip first
                DOMManager.hideTooltip();

                // Create modal overlay
                const modalOverlay = document.createElement('div');
                modalOverlay.className = 'glossary-modal-overlay';
                modalOverlay.setAttribute('role', 'dialog');
                modalOverlay.setAttribute('aria-labelledby', 'glossary-modal-title');
                modalOverlay.setAttribute('aria-modal', 'true');

                modalOverlay.innerHTML = `
                <div class="glossary-modal">
                <div class="glossary-modal__header">
                <h2 id="glossary-modal-title">${term.term}</h2>
                <button class="glossary-modal__close" aria-label="Modal schließen">
                &times;
                </button>
                </div>
                <div class="glossary-modal__content">
                <div class="glossary-modal__definition">
                <h3>Definition</h3>
                <p>${term.shortDefinition}</p>
                </div>
                ${mediaSection}
                <div class="glossary-modal__extended">
                <h3>Ausführliche Erklärung</h3>
                <div>${term.extendedExplanation}</div>
                </div>
                ${term.usageExamples ? `
                    <div class="glossary-modal__examples">
                    <h3>Anwendungsbeispiele</h3>
                    <div>${term.usageExamples}</div>
                    </div>
                    ` : ''}
                    </div>
                    <div class="glossary-modal__footer">
                    <button class="glossary-modal__close-btn">Schließen</button>
                    </div>
                    </div>
                    `;

                    // Add to DOM
                    document.body.appendChild(modalOverlay);

                    // Event handlers
                    const closeModal = () => {
                        modalOverlay.remove();
                        document.removeEventListener('keydown', handleEscape);
                        LOG.debug(MODULE, 'Glossary Manager: Modal closed');
                    };

                    const handleEscape = (event) => {
                        if (event.key === 'Escape') {
                            closeModal();
                        }
                    };

                    // Add event listeners
                    modalOverlay.querySelector('.glossary-modal__close').addEventListener('click', closeModal);
                    modalOverlay.querySelector('.glossary-modal__close-btn').addEventListener('click', closeModal);
                    modalOverlay.addEventListener('click', (event) => {
                        if (event.target === modalOverlay) {
                            closeModal();
                        }
                    });

                    document.addEventListener('keydown', handleEscape);

                    // Focus management
                    modalOverlay.querySelector('.glossary-modal__close').focus();

                    LOG.debug(MODULE, 'Glossary Manager: Detailed modal opened');
            }

            function _handleTermClick(event) {
                const termId = event.currentTarget.getAttribute('data-glossary-term');
                if (!termId) {
                    LOG.warn(MODULE, 'Glossary Manager: Term click handled but no term ID found');
                    return;
                }

                LOG.debug(MODULE, `Glossary Manager: Term clicked: ${termId}`);
                
                event.preventDefault();
                event.stopPropagation();

                DOMManager.showTooltip(termId, event.currentTarget);
            }

            function _handleDocumentClick(event) {
                if (!_glossaryTooltip) return;
                
                const isTooltipClick = _glossaryTooltip.contains(event.target);
                const isTermClick = event.target.closest(`.${CONFIG.highlightClass}`);
                
                if (!isTooltipClick && !isTermClick) {
                    LOG.debug(MODULE, 'Glossary Manager: Document click outside tooltip, hiding tooltip');
                    DOMManager.hideTooltip();
                }
            }

            function _handleScroll() {
                if (!_isInitialized) {
                    LOG.debug(MODULE, 'Glossary Manager: Scroll handled but manager not initialized');
                    return;
                }
                
                // Debounced Scroll-Handler
                clearTimeout(_scrollTimeout);
                _scrollTimeout = setTimeout(() => {
                    LOG.debug(MODULE, 'Glossary Manager: Processing viewport after scroll');
                    _processViewportContent();
                }, 100);
            }

            let _scrollTimeout = null;

            function _processViewportContent() {
                if (!_isInitialized || !_patternCompiler) {
                    LOG.debug(MODULE, 'Glossary Manager: Skipping viewport processing - not initialized');
                    return;
                }

                LOG.debug(MODULE, 'Glossary Manager: Starting viewport content processing');
                const viewportRange = ViewportManager.getViewportRange();
                const textNodes = ViewportManager.findTextNodesInRange(viewportRange);

                let processedCount = 0;
                let totalTermsFound = 0;

                textNodes.forEach(textNode => {
                    // Find ALL term matches in this text node
                    const allMatches = PatternCompiler.findAllTermMatches(textNode.text, _patternCompiler);

                    if (allMatches && allMatches.length > 0) {
                        // Process ALL matches in a single pass
                        DOMManager.replaceWithHighlightMulti(textNode, allMatches);
                        processedCount++;
                        totalTermsFound += allMatches.length;

                        LOG.debug(MODULE, `Glossary Manager: Processed ${allMatches.length} terms in one text node`);
                    }
                });

                LOG.debug(MODULE, `Glossary Manager: Viewport processing completed. Processed ${processedCount} text nodes with ${totalTermsFound} total terms`);
            }

            // Public API - Direkt als window.GlossaryManager
            const publicAPI = {
                /**
                 * Initialisiert den Glossary Manager
                 * 
                 * @returns {Promise<boolean>} True wenn erfolgreich
                 */
                async init() {
                    LOG.debug(MODULE, 'Glossary Manager: init() method called');
                    
                    if (_isInitialized) {
                        LOG.warn(MODULE, 'Glossary Manager bereits initialisiert');
                        return true;
                    }
                
                    try {
                        LOG.debug(MODULE, 'Glossary Manager: Starting data loading process');
                        
                        // Enhanced debugging for fetch requests
                        LOG.debug(MODULE, `Glossary Manager: Fetching from ${CONFIG.dataUrls.searchIndex}`);
                        const indexResponse = await fetch(CONFIG.dataUrls.searchIndex);
                        LOG.debug(MODULE, `Glossary Manager: Index response status: ${indexResponse.status}`);
                        
                        if (!indexResponse.ok) {
                            throw new Error(`Failed to load search index: ${indexResponse.status} ${indexResponse.statusText}`);
                        }
                
                        LOG.debug(MODULE, `Glossary Manager: Fetching from ${CONFIG.dataUrls.fullData}`);
                        const fullDataResponse = await fetch(CONFIG.dataUrls.fullData);
                        LOG.debug(MODULE, `Glossary Manager: Full data response status: ${fullDataResponse.status}`);
                        
                        if (!fullDataResponse.ok) {
                            throw new Error(`Failed to load full data: ${fullDataResponse.status} ${fullDataResponse.statusText}`);
                        }
                
                        _searchIndex = await indexResponse.json();
                        _fullGlossary = await fullDataResponse.json();
                
                        LOG.debug(MODULE, `Glossary Manager: Loaded ${_searchIndex.metadata.term_count} terms from index`);
                        LOG.debug(MODULE, `Glossary Manager: Search index structure:`, Object.keys(_searchIndex));
                        LOG.debug(MODULE, `Glossary Manager: Full glossary length: ${_fullGlossary.length}`);
                
                        LOG.debug(MODULE, `Glossary Manager: Loaded ${_searchIndex.metadata.term_count} terms from index`);

                        // Pattern Compiler initialisieren
                        _patternCompiler = PatternCompiler.compilePatterns(_searchIndex.patterns);

                        // DOM Elemente initialisieren
                        DOMManager.initTooltip();

                        // Event Listener
                        document.addEventListener('click', _handleDocumentClick);
                        window.addEventListener('scroll', _handleScroll, { passive: true });
                        window.addEventListener('resize', _handleScroll, { passive: true });

                        // Erste Verarbeitung
                        _processViewportContent();

                        // In your init() method, replace the simple _processViewportContent() call with:
                        setTimeout(() => {
                            LOG.debug(MODULE, 'Glossary Manager: Initial viewport processing');
                            _processViewportContent();
                        }, 100);

                        _isInitialized = true;
                        LOG.success(MODULE, 'Glossary Manager erfolgreich initialisiert');

                        // Custom Event für andere Module
                        window.dispatchEvent(new CustomEvent('glossaryReady', {
                            detail: { termCount: _searchIndex.metadata.term_count }
                        }));

                        return true;

                    } catch (error) {
                        LOG.error(MODULE, 'Fehler bei der Initialisierung des Glossary Managers:', error);
                        return false;
                    }
                },

                /**
                 * Gibt den Initialisierungsstatus zurück
                 * 
                 * @returns {boolean} True wenn initialisiert
                 */
                isInitialized() {
                    const status = _isInitialized;
                    LOG.debug(MODULE, `Glossary Manager: isInitialized() called, returning: ${status}`);
                    return status;
                },

                /**
                 * Sucht nach einem Begriff im Text
                 * 
                 * @param {string} text - Zu durchsuchender Text
                 * @returns {string|null} Term ID des gefundenen Begriffs
                 */
                findTermInText(text) {
                    LOG.debug(MODULE, `Glossary Manager: findTermInText() called with text: "${text.substring(0, 30)}..."`);
                    if (!_isInitialized || !_patternCompiler) {
                        LOG.warn(MODULE, 'Glossary Manager: Cannot find term - manager not initialized');
                        return null;
                    }
                    const result = PatternCompiler.findMatchingTerm(text, _patternCompiler);
                    LOG.debug(MODULE, `Glossary Manager: findTermInText() result: ${result}`);
                    return result;
                },

                /**
                 * Gibt Begriff-Details zurück
                 * 
                 * @param {string} termId - Term ID
                 * @returns {Object|null} Begriff-Details
                 */
                getTermDetails(termId) {
                    LOG.debug(MODULE, `Glossary Manager: getTermDetails() called for term: ${termId}`);
                    if (!_isInitialized || !_searchIndex || !_fullGlossary) {
                        LOG.warn(MODULE, 'Glossary Manager: Cannot get term details - manager not initialized');
                        return null;
                    }
                    
                    const termIndex = _searchIndex.lookup[termId];
                    if (termIndex === undefined) {
                        LOG.warn(MODULE, `Glossary Manager: Term ID not found: ${termId}`);
                        return null;
                    }

                    LOG.debug(MODULE, `Glossary Manager: Found term details for: ${termId}`);
                    return _fullGlossary[termIndex];
                },

                /**
                 * Deinitialisiert den Glossary Manager
                 */
                destroy() {
                    LOG.debug(MODULE, 'Glossary Manager: destroy() method called');
                    
                    document.removeEventListener('click', _handleDocumentClick);
                    window.removeEventListener('scroll', _handleScroll);

                    if (_glossaryTooltip && _glossaryTooltip.parentNode) {
                        _glossaryTooltip.parentNode.removeChild(_glossaryTooltip);
                    }

                    _isInitialized = false;
                    _searchIndex = null;
                    _fullGlossary = null;
                    _patternCompiler = null;
                    _activeHighlights.clear();
                    
                    LOG.success(MODULE, 'Glossary Manager deinitialized');
                }
            };

            // Modul als globale Variable registrieren
            window.GlossaryManager = publicAPI;
            LOG.success(MODULE, 'Glossary Manager module registered successfully as window.GlossaryManager');

            return publicAPI;

        } catch (error) {
            LOG.error(MODULE, 'Glossary Manager: Critical error during initialization:', error);
        }
    }

    // Initialisierungsstrategie
    function startGlossaryInitialization() {
        LOG.debug(MODULE, 'Glossary Manager: Starting initialization process');
        
        // Prüfen ob StateManager verfügbar ist für koordinierte Initialisierung
        if (window.StateManager && typeof window.StateManager.onAppReady === 'function') {
            LOG.debug(MODULE, 'Glossary Manager: Using StateManager for coordinated initialization');
            window.StateManager.onAppReady(() => {
                LOG.debug(MODULE, 'Glossary Manager: StateManager appReady fired, initializing Glossary Manager');
                initializeGlossaryManager();
            });
        } else {
            LOG.debug(MODULE, 'Glossary Manager: StateManager not available, using DOMContentLoaded');
            // Fallback: Warten auf DOMContentLoaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    LOG.debug(MODULE, 'Glossary Manager: DOMContentLoaded fired, initializing');
                    initializeGlossaryManager();
                });
            } else {
                LOG.debug(MODULE, 'Glossary Manager: Document already ready, initializing immediately');
                initializeGlossaryManager();
            }
        }
    }
    
    // Initialisierung starten
    LOG.debug(MODULE, 'Glossary Manager: Starting initialization sequence');
    startGlossaryInitialization();    

})();
