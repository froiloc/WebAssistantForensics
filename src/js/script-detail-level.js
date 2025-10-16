// ============================================================================
// SCRIPT-DETAIL-LEVEL.JS - Version 041
// Detail-Level-System: Basic, Best Practice, Expert
// ============================================================================

(function() {
    'use strict';

    const MODULE = 'DETAIL';

    // Mapping zwischen numerischen Werten und Level-Namen
    const LEVEL_MAP = {
        '1': '1',
        '2': '2',
        '3': '3',
        'basic': '1',
        'bestpractice': '2',
        'expert': '3',
    };

    // Reverse Mapping für Button-Aktivierung
    const LEVEL_TO_NUMBER = {
        'basic': '1',
        'bestpractice': '2',
        'expert': '3'
    };

    let _isInitialized = false;

    // ========================================================================
    // DETAIL LEVEL MANAGEMENT
    // ========================================================================

    function setDetailLevel(level) {
        // Konvertiere numerischen Wert zu Level-Namen
        const normalizedLevel = LEVEL_MAP[level];

        if (!normalizedLevel) {
            LOG.error(MODULE, `Invalid level: ${level} (expected: 1/2/3 or basic/bestpractice/expert)`);
            return;
        }

        updateDetailVisibility(normalizedLevel);
        updateInfoText(normalizedLevel);
        updateActiveButton(normalizedLevel);

        if (window.StateManager) {
            window.StateManager.set('preferences.detailLevel', level);
        }
    }

    function updateDetailVisibility(level) {
        const currentLevel = LEVEL_MAP[level]

        const level1Elements = document.querySelectorAll('.detail-level-1');
        level1Elements.forEach(el => el.style.display = 'block');

        const level2Elements = document.querySelectorAll('.detail-level-2');
        level2Elements.forEach(el => {
            el.style.display = currentLevel >= 2 ? 'block' : 'none';
        });

        const level3Elements = document.querySelectorAll('.detail-level-3');
        level3Elements.forEach(el => {
            el.style.display = currentLevel >= 3 ? 'block' : 'none';
        });
        LOG(MODULE, `Visibility updated: body.detail-level-${currentLevel}`);
    }

    function updateInfoText(level) {
        const infoElement = document.getElementById('detail-level-info');
        if (!infoElement) {
            LOG.debug(MODULE, 'Info element (#detail-level-info) not found');
            return;
        }

        const infoTexts = {
            basic: 'Zeigt nur grundlegende Informationen',
            bestpractice: 'Zeigt Best Practices und empfohlene Ansätze',
            expert: 'Zeigt alle technischen Details und Hintergründe'
        };

        infoElement.textContent = infoTexts[level] || '';
        LOG.debug(MODULE, `Info text updated: ${infoTexts[level]}`);
    }

    function updateActiveButton(level) {
        // Entferne .active von allen Buttons
        document.querySelectorAll('.detail-level-btn, .detail-btn-mini').forEach(btn => {
            btn.classList.remove('active');
        });

        // Konvertiere Level zu Nummer für Button-Selektor
        const levelNumber = LEVEL_TO_NUMBER[level];

        LOG.debug(MODULE, `Looking for buttons with data-level="${levelNumber}" or "${level}"`);

        // Aktiviere Buttons mit passendem data-level (numerisch oder Wort)
        const selectors = [
            `.detail-level-btn[data-level="${levelNumber}"]`,
            `.detail-level-btn[data-level="${level}"]`,
            `.detail-btn-mini[data-level="${levelNumber}"]`,
            `.detail-btn-mini[data-level="${level}"]`
        ];

        const activeButtons = document.querySelectorAll(selectors.join(', '));

        activeButtons.forEach(btn => {
            btn.classList.add('active');
            LOG.debug(MODULE, `Activated button: data-level="${btn.dataset.level}"`);
        });

        if (activeButtons.length > 0) {
            LOG.success(MODULE, `Active button(s) updated: ${level} (${activeButtons.length} buttons)`);
        } else {
            LOG.warn(MODULE, `No buttons found for level: ${level}/${levelNumber}`);

            // Debug: Liste alle verfügbaren Buttons
            const allButtons = document.querySelectorAll('.detail-level-btn, .detail-btn-mini');
            LOG.debug(MODULE, 'Available buttons:', Array.from(allButtons).map(btn => ({
                text: btn.textContent.trim(),
                                                                                       level: btn.dataset.level
            })));
        }
    }

    // ========================================================================
    // UI - CONTROLS
    // ========================================================================

    function initDetailLevelControls() {
        LOG(MODULE, 'Initializing detail level controls...');

        const buttons = document.querySelectorAll('.detail-level-btn, .detail-btn-mini');

        LOG.debug(MODULE, `Found ${buttons.length} detail level buttons`);

        if (buttons.length === 0) {
            LOG.warn(MODULE, 'No detail level buttons found in DOM!');
            return;
        }

        buttons.forEach(btn => {
            const level = btn.dataset.level;

            LOG.debug(MODULE, `Button: "${btn.textContent.trim()}" with data-level="${level}"`);

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (level) {
                    setDetailLevel(level);
                } else {
                    LOG.error(MODULE, 'Button has no data-level attribute', btn);
                }
            });
        });

        // Wende initialen Level aus Preferences an
        const initialLevel = window.StateManager.get('preferences.detailLevel');
        LOG(MODULE, `Applying initial detail level: ${initialLevel}`);

        updateDetailVisibility(initialLevel);
        updateInfoText(initialLevel);
        updateActiveButton(initialLevel);

        LOG.success(MODULE, 'Detail level controls initialized');
    }

    // ========================================================================
    // EVENT LISTENERS
    // ========================================================================

    function initDetailLevelListeners() {
        LOG(MODULE, 'Initializing event listeners...');

        // Reagiere auf Preferences-Loaded Event
        window.addEventListener('preferencesLoaded', () => {
            LOG(MODULE, 'Preferences loaded event received');
            const level = window.StateManager.get('preferences.detailLevel');
            LOG(MODULE, `Applying loaded detail level: ${level}`);

            updateDetailVisibility(level);
            updateInfoText(level);
            updateActiveButton(level);
        });

        window.addEventListener('preferencesReset', () => {
            LOG(MODULE, 'Preferences reset event received');
            const level = window.StateManager.get('preferences.detailLevel');

            updateDetailVisibility(level);
            updateInfoText(level);
            updateActiveButton(level);
        });

        LOG.success(MODULE, 'Event listeners initialized');
    }

    // ========================================================================
    // INITIALISIERUNG
    // ========================================================================

    function initDetailLevel() {
        if (_isInitialized) {
            LOG.warn(MODULE, 'Already initialized');
            return;
        }
        LOG(MODULE, 'Initializing detail level module...');

        initDetailLevelControls();
        initDetailLevelListeners();

        _isInitialized = true;
        LOG.success(MODULE, 'Detail level module initialized');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.DetailLevel = {
        init: initDetailLevel,
        setLevel: setDetailLevel
    };

    LOG(MODULE, 'Detail level module loaded');

})();
