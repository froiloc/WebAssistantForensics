// ============================================================================
// SCRIPT-GLOSSARY.JS - Glossary Management System
// ============================================================================

(function() {
    'use strict';

    const MODULE = 'GLOSSARY';

    // Private state
    let _isInitialized = false;
    let _searchIndex = null;
    let _fullGlossary = null;
    let _patternCompiler = null;
    let _activeHighlights = new Map();
    let _scrollTimeout = null;
    let _glossaryTooltip = null;

    // Configuration
    const CONFIG = {
        viewportBuffer: 1000,
        highlightClass: 'glossary-term',
        highlightActiveClass: 'glossary-term--active',
        tooltipClass: 'glossary-tooltip',
        dataUrls: {
            searchIndex: './dist/glossary.index.json',
            fullData: './dist/glossary.validated.json'
        },
        selectors: {
            mainContent: 'main',
            contentSections: '.content-section'
        }
    };

    // ========================================================================
    // PATTERN COMPILER
    // ========================================================================

    const PatternCompiler = {
        compilePatterns(patterns) {
            if (!patterns || !Array.isArray(patterns)) {
                window.LOG.warn(MODULE, 'Invalid patterns for compilation');
                return [];
            }

            const compiledPatterns = patterns.map(pattern => {
                try {
                    return {
                        ...pattern,
                        compiled: new RegExp(pattern.pattern, 'gi')
                    };
                } catch (error) {
                    window.LOG.error(MODULE, `Pattern compilation failed: "${pattern.original}"`, error);
                    return null;
                }
            }).filter(Boolean);

            window.LOG.debug(MODULE, `Compiled ${compiledPatterns.length} patterns`);
            return compiledPatterns;
        },

        findAllTermMatches(text, patterns) {
            if (!text || !patterns) return null;

            const whitePatterns = patterns.filter(p => p.type === 'white');
            const blackPatterns = patterns.filter(p => p.type === 'black');
            const matches = [];

            for (const pattern of whitePatterns) {
                const regex = new RegExp(pattern.pattern, 'gi');
                let match;

                while ((match = regex.exec(text)) !== null) {
                    const matchedText = match[0];

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
                    }

                    if (match.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                }
            }

            return matches.length > 0 ? matches : null;
        },

        findMatchingTerm(text, patterns) {
            if (!text || !patterns) return null;

            const whitePatterns = patterns.filter(p => p.type === 'white');
            const blackPatterns = patterns.filter(p => p.type === 'black');

            for (const pattern of whitePatterns) {
                const tempRegex = new RegExp(pattern.pattern, 'i');
                if (tempRegex.test(text)) {
                    const shouldExclude = blackPatterns.some(blackPattern => {
                        const blackRegex = new RegExp(blackPattern.pattern, 'i');
                        return blackRegex.test(text);
                    });

                    if (!shouldExclude) {
                        return pattern.term_id;
                    }
                }
            }

            return null;
        }
    };

    // ========================================================================
    // VIEWPORT MANAGER
    // ========================================================================

    const ViewportManager = {
        getViewportRange() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollBottom = scrollTop + window.innerHeight;

            return {
                top: Math.max(0, scrollTop - CONFIG.viewportBuffer),
                bottom: scrollBottom + CONFIG.viewportBuffer
            };
        },

        isInViewportRange(element, viewportRange) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.pageYOffset;
            const elementBottom = elementTop + rect.height;

            return elementBottom >= viewportRange.top && elementTop <= viewportRange.bottom;
        },

        findTextNodesInRange(viewportRange) {
            const textNodes = [];
            const mainContent = document.querySelector(CONFIG.selectors.mainContent);

            if (!mainContent) {
                window.LOG.warn(MODULE, 'Main content element not found');
                return textNodes;
            }

            const walker = document.createTreeWalker(
                mainContent,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function(node) {
                        if (!node.textContent.trim() ||
                            node.parentElement.closest(`.${CONFIG.highlightClass}`)) {
                            return NodeFilter.FILTER_REJECT;
                            }
                            return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            let node;
            while ((node = walker.nextNode())) {
                const parentElement = node.parentElement;
                if (parentElement && this.isInViewportRange(parentElement, viewportRange)) {
                    textNodes.push({
                        node: node,
                        element: parentElement,
                        text: node.textContent
                    });
                }
            }

            return textNodes;
        }
    };

    // ========================================================================
    // DOM MANAGER
    // ========================================================================

    const DOMManager = {
        createHighlight(termId, text) {
            const span = document.createElement('span');
            span.className = CONFIG.highlightClass;
            span.setAttribute('data-glossary-term', termId);
            span.setAttribute('tabindex', '0');
            span.setAttribute('role', 'button');
            span.setAttribute('aria-label', `Glossar Begriff: ${text}. Drücke Enter für Details.`);
            span.textContent = text;

            span.addEventListener('click', _handleTermClick);
            span.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    _handleTermClick(event);
                }
            });

            return span;
        },

        replaceWithHighlightMulti(textNode, allMatches) {
            const { node, element } = textNode;
            const fullText = node.textContent;

            const filteredMatches = this.filterToLongestNonOverlapping(allMatches, fullText);
            const sortedMatches = filteredMatches.sort((a, b) => a.start - b.start);
            const fragment = document.createDocumentFragment();
            let lastIndex = 0;

            sortedMatches.forEach(match => {
                if (match.start > lastIndex) {
                    const beforeText = fullText.substring(lastIndex, match.start);
                    fragment.appendChild(document.createTextNode(beforeText));
                }

                const highlight = this.createHighlight(match.termId, match.matchedText);
                fragment.appendChild(highlight);

                lastIndex = match.end + 1;
            });

            if (lastIndex < fullText.length) {
                fragment.appendChild(document.createTextNode(fullText.substring(lastIndex)));
            }

            element.replaceChild(fragment, node);
        },

        filterToLongestNonOverlapping(matches, fullText) {
            if (!matches || matches.length === 0) return [];

            const matchesByTerm = {};
            matches.forEach(match => {
                if (!matchesByTerm[match.termId]) {
                    matchesByTerm[match.termId] = [];
                }
                matchesByTerm[match.termId].push(match);
            });

            const optimizedMatches = [];

            Object.entries(matchesByTerm).forEach(([termId, termMatches]) => {
                if (termMatches.length === 1) {
                    optimizedMatches.push(termMatches[0]);
                    return;
                }

                const sorted = termMatches.sort((a, b) => {
                    if (a.start !== b.start) return a.start - b.start;
                    return b.length - a.length;
                });

                let bestMatch = sorted[0];
                let currentSpan = { start: sorted[0].start, end: sorted[0].end };

                for (let i = 1; i < sorted.length; i++) {
                    const current = sorted[i];
                    if (current.start <= currentSpan.end + 1) {
                        if (current.end > currentSpan.end) {
                            currentSpan.end = current.end;
                        }
                    } else {
                        break;
                    }
                }

                const optimizedMatch = {
                    termId: termId,
                    start: currentSpan.start,
                    end: currentSpan.end,
                    matchedText: fullText.substring(currentSpan.start, currentSpan.end + 1),
                                                length: currentSpan.end - currentSpan.start + 1,
                                                isCombined: true
                };

                optimizedMatches.push(optimizedMatch);
            });

            return this.resolveInterTermConflicts(optimizedMatches);
        },

        resolveInterTermConflicts(optimizedMatches) {
            if (optimizedMatches.length === 0) return [];

            const sorted = [...optimizedMatches].sort((a, b) => a.start - b.start);
            const groups = [];
            let currentGroup = [sorted[0]];

            for (let i = 1; i < sorted.length; i++) {
                const current = sorted[i];
                const lastInGroup = currentGroup[currentGroup.length - 1];

                if (current.start < lastInGroup.end) {
                    currentGroup.push(current);
                } else {
                    groups.push(currentGroup);
                    currentGroup = [current];
                }
            }
            groups.push(currentGroup);

            const filtered = groups.map(group => {
                return group.reduce((longest, current) => {
                    const currentLength = current.end - current.start + 1;
                    const longestLength = longest.end - longest.start + 1;
                    return currentLength > longestLength ? current : longest;
                });
            });

            return filtered.sort((a, b) => a.start - b.start);
        },

        initTooltip() {
            if (_glossaryTooltip) return;

            _glossaryTooltip = document.createElement('div');
            _glossaryTooltip.className = CONFIG.tooltipClass;
            _glossaryTooltip.setAttribute('role', 'tooltip');
            _glossaryTooltip.setAttribute('aria-hidden', 'true');

            document.body.appendChild(_glossaryTooltip);
        },

        showTooltip(termId, targetElement) {
            if (!_glossaryTooltip || !_fullGlossary) return;

            const termIndex = _searchIndex.lookup[termId];
            if (termIndex === undefined) return;

            const term = _fullGlossary[termIndex];
            if (!term) return;

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

            const rect = targetElement.getBoundingClientRect();
            _glossaryTooltip.style.left = `${rect.left + window.pageXOffset}px`;
            _glossaryTooltip.style.top = `${rect.bottom + window.pageYOffset + 5}px`;

            _glossaryTooltip.setAttribute('aria-hidden', 'false');
            _glossaryTooltip.classList.add('glossary-tooltip--visible');

            const moreButton = _glossaryTooltip.querySelector('.glossary-tooltip__more');
            if (moreButton) {
                moreButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    _showDetailedView(termId);
                });
            }
        },

        hideTooltip() {
            if (!_glossaryTooltip) return;
            _glossaryTooltip.setAttribute('aria-hidden', 'true');
            _glossaryTooltip.classList.remove('glossary-tooltip--visible');
        }
    };

    // ========================================================================
    // PRIVATE FUNCTIONS
    // ========================================================================

    function _handleTermClick(event) {
        const termId = event.currentTarget.getAttribute('data-glossary-term');
        if (!termId) return;

        event.preventDefault();
        event.stopPropagation();

        DOMManager.showTooltip(termId, event.currentTarget);
    }

    function _handleDocumentClick(event) {
        if (!_glossaryTooltip) return;

        const isTooltipClick = _glossaryTooltip.contains(event.target);
        const isTermClick = event.target.closest(`.${CONFIG.highlightClass}`);

        if (!isTooltipClick && !isTermClick) {
            DOMManager.hideTooltip();
        }
    }

    function _handleScroll() {
        if (!_isInitialized) return;

        clearTimeout(_scrollTimeout);
        _scrollTimeout = setTimeout(() => {
            _processViewportContent();
        }, 100);
    }

    function _processViewportContent() {
        if (!_isInitialized || !_patternCompiler) return;

        const viewportRange = ViewportManager.getViewportRange();
        const textNodes = ViewportManager.findTextNodesInRange(viewportRange);

        let processedCount = 0;
        let totalTermsFound = 0;

        textNodes.forEach(textNode => {
            const allMatches = PatternCompiler.findAllTermMatches(textNode.text, _patternCompiler);

            if (allMatches && allMatches.length > 0) {
                DOMManager.replaceWithHighlightMulti(textNode, allMatches);
                processedCount++;
                totalTermsFound += allMatches.length;
            }
        });

        window.LOG.debug(MODULE, `Processed ${processedCount} text nodes with ${totalTermsFound} terms`);
    }

    function _showDetailedView(termId) {
        const termIndex = _searchIndex.lookup[termId];
        if (termIndex === undefined) return;

        const term = _fullGlossary[termIndex];
        if (!term || !term.extendedExplanation) return;

        const mediaSection = term.media.path.length > 0 ? `
        <div class="glossary-modal__media">
        <figure>
        <img src="${term.media.path}" alt="${term.media.alt}" class="glossary-modal__image">
        <figcaption>${term.media.caption}</figcaption>
        </figure>
        </div>
        ` : '';

        DOMManager.hideTooltip();

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'glossary-modal-overlay';
        modalOverlay.setAttribute('role', 'dialog');
        modalOverlay.setAttribute('aria-labelledby', 'glossary-modal-title');
        modalOverlay.setAttribute('aria-modal', 'true');

        modalOverlay.innerHTML = `
        <div class="glossary-modal">
        <div class="glossary-modal__header">
        <h2 id="glossary-modal-title">${term.term}</h2>
        <button class="glossary-modal__close" aria-label="Modal schließen">&times;</button>
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

            document.body.appendChild(modalOverlay);

            const closeModal = () => {
                modalOverlay.remove();
                document.removeEventListener('keydown', handleEscape);
            };

            const handleEscape = (event) => {
                if (event.key === 'Escape') closeModal();
            };

                modalOverlay.querySelector('.glossary-modal__close').addEventListener('click', closeModal);
                modalOverlay.querySelector('.glossary-modal__close-btn').addEventListener('click', closeModal);
                modalOverlay.addEventListener('click', (event) => {
                    if (event.target === modalOverlay) closeModal();
                });

                    document.addEventListener('keydown', handleEscape);
                    modalOverlay.querySelector('.glossary-modal__close').focus();
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    /**
     * Initialize glossary manager
     */
    async function init() {
        if (_isInitialized) {
            window.LOG.warn(MODULE, 'Already initialized');
            return true;
        }

        try {
            const indexResponse = await fetch(CONFIG.dataUrls.searchIndex);
            if (!indexResponse.ok) throw new Error(`Search index load failed: ${indexResponse.status}`);

            const fullDataResponse = await fetch(CONFIG.dataUrls.fullData);
            if (!fullDataResponse.ok) throw new Error(`Full data load failed: ${fullDataResponse.status}`);

            _searchIndex = await indexResponse.json();
            _fullGlossary = await fullDataResponse.json();

            _patternCompiler = PatternCompiler.compilePatterns(_searchIndex.patterns);
            DOMManager.initTooltip();

            document.addEventListener('click', _handleDocumentClick);
            window.addEventListener('scroll', _handleScroll, { passive: true });
            window.addEventListener('resize', _handleScroll, { passive: true });

            setTimeout(() => _processViewportContent(), 100);

            _isInitialized = true;
            window.LOG.success(MODULE, 'Glossary manager initialized');

            window.dispatchEvent(new CustomEvent('glossaryReady', {
                detail: { termCount: _searchIndex.metadata.term_count }
            }));

            return true;

        } catch (error) {
            window.LOG.error(MODULE, 'Initialization failed:', error);
            return false;
        }
    }

    /**
     * Destroy glossary manager
     */
    function destroy() {
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

        window.LOG.success(MODULE, 'Glossary manager destroyed');
    }

    // Export public API
    window.GlossaryManager = {
        init: init,
        destroy: destroy,
        isInitialized: () => _isInitialized,
        findTermInText: (text) => {
            if (!_isInitialized || !_patternCompiler) return null;
            return PatternCompiler.findMatchingTerm(text, _patternCompiler);
        },
        getTermDetails: (termId) => {
            if (!_isInitialized || !_searchIndex || !_fullGlossary) return null;
            const termIndex = _searchIndex.lookup[termId];
            return termIndex !== undefined ? _fullGlossary[termIndex] : null;
        }
    };

    window.LOG.debug(MODULE, 'Glossary module loaded');

})();
