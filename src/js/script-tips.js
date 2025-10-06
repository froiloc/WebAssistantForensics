// ============================================================================
// SCRIPT-TIPS.JS - Version 040
// Tips-Footer: Rotierende Hilfe-Tipps mit Preferences
// ============================================================================

(function() {
    'use strict';

    const STATE = window.APP_STATE;
    const CONST = window.APP_CONSTANTS;
    const MODULE = 'TIPS';

    let currentTipIndex = 0;
    let tipRotationTimer = null;
    let tips = [];

    // ========================================================================
    // TIPS DATA
    // ========================================================================

    const TIPS_DATA = [
        "💡 Tipp: Nutzen Sie Alt+1, Alt+2, Alt+3, um schnell zwischen Detailebenen zu wechseln",
        "💡 Tipp: Nutzen Sie Alt+n, um die Navigationsleiste ein- und auszublenden",
        "⌨️ Tastenkombination: ESC schließt den Notizblock, den Agenten und geöffnete Fenster",
        "📝 Ihre Notizen werden automatisch gespeichert und bleiben auch nach dem Schließen erhalten",
        "🔍 Klicken Sie doppelt auf Navigationseinträge, um direkt zum Abschnitt zu springen",
        "📜 Der Verlauf zeigt alle besuchten Abschnitte - öffnen Sie ihn über das Menü oben links",
        "🎯 Fokussierte Abschnitte werden hervorgehoben - andere erscheinen transparent",
        "⚡ Templates sparen Zeit: Speichern Sie häufig genutzte Export-Konfigurationen",
        "📖 Taggen Sie wichtige Beweise vor dem Export für fokussierte Reports",
        "🌐 HTML-Reports eignen sich besonders für Chat-Analysen und mehrsprachige Inhalte",
        "💾 Alle Ihre Einstellungen werden lokal im Browser gespeichert"
    ];

    // ========================================================================
    // TIPS ROTATION
    // ========================================================================

    function startTipRotation() {
        if (tipRotationTimer) {
            clearInterval(tipRotationTimer);
        }

        tipRotationTimer = setInterval(() => {
            showNextTip();
        }, CONST.TIPS_ROTATION_INTERVAL);

        LOG.debug(MODULE, 'Rotation started');
    }

    function stopTipRotation() {
        if (tipRotationTimer) {
            clearInterval(tipRotationTimer);
            tipRotationTimer = null;
        }

        LOG.debug(MODULE, 'Rotation stopped');
    }

    function resetTipRotation() {
        currentTipIndex = 0;
        showCurrentTip();
        startTipRotation();
        LOG(MODULE, 'Rotation reset');
    }

    function showCurrentTip() {
        const tipElement = document.getElementById('tips-text');
        if (!tipElement) {
            LOG.warn(MODULE, 'Tip element (#tips-text) not found');
            return;
        }

        tipElement.textContent = tips[currentTipIndex];
        LOG.debug(MODULE, `Showing tip ${currentTipIndex + 1}/${tips.length}`);
    }

    function showNextTip() {
        currentTipIndex = (currentTipIndex + 1) % tips.length;
        showCurrentTip();
    }

    function showNextTipManual() {
        showNextTip();

        if (STATE.preferences.showTips) {
            startTipRotation();
        }

        LOG(MODULE, 'Manual next tip');
    }

    function showPreviousTip() {
        currentTipIndex = (currentTipIndex - 1 + tips.length) % tips.length;
        showCurrentTip();

        if (STATE.preferences.showTips) {
            startTipRotation();
        }

        LOG(MODULE, 'Manual previous tip');
    }

    // ========================================================================
    // UI - FOOTER
    // ========================================================================

    function initTipsFooter() {
        LOG(MODULE, 'Initializing tips footer...');

        tips = [...TIPS_DATA];

        const footer = document.getElementById('tips-footer');
        const prevBtn = document.getElementById('tips-prev-btn');
        const nextBtn = document.getElementById('tips-next-btn');
        const closeBtn = document.getElementById('close-tips-footer');
        const showBtn = document.getElementById('show-tips-footer-btn');

        LOG.debug(MODULE, 'Tips elements:', {
            footer: !!footer,
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn,
            closeBtn: !!closeBtn,
            showBtn: !!showBtn
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', showPreviousTip);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', showNextTipManual);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', hideTipsFooter);
        }

        if (showBtn) {
            showBtn.addEventListener('click', showTipsFooter);
        }

        // WICHTIG: Warte auf Preferences-Loaded Event
        applyTipsPreference();

        LOG.success(MODULE, 'Tips footer initialized');
    }

    function applyTipsPreference() {
        const shouldShow = STATE.preferences.showTips;

        LOG(MODULE, `Applying tips preference: showTips=${shouldShow}`);

        if (shouldShow) {
            showTipsFooter();
        } else {
            hideTipsFooter();
        }
    }

    function showTipsFooter() {
        const footer = document.getElementById('tips-footer');
        const showBtn = document.getElementById('show-tips-footer-btn');

        if (footer) {
            footer.classList.remove('hidden');
            STATE.preferences.showTips = true;

            document.documentElement.style.setProperty('--tips-footer-height', '80px');

            if (showBtn) {
                showBtn.style.display = 'none';
            }

            showCurrentTip();
            startTipRotation();

            LOG(MODULE, 'Tips footer shown');

            if (window.Preferences) {
                window.Preferences.save();
            }
        }
    }

    function hideTipsFooter() {
        const footer = document.getElementById('tips-footer');
        const showBtn = document.getElementById('show-tips-footer-btn');

        if (footer) {
            footer.classList.add('hidden');
            STATE.preferences.showTips = false;

            document.documentElement.style.setProperty('--tips-footer-height', '0px');

            if (showBtn) {
                showBtn.style.display = 'inline-block';
            }

            stopTipRotation();

            LOG(MODULE, 'Tips footer hidden');

            if (window.Preferences) {
                window.Preferences.save();
            }
        }
    }

    function toggleTipsFooter() {
        if (STATE.preferences.showTips) {
            hideTipsFooter();
        } else {
            showTipsFooter();
        }
    }

    // ========================================================================
    // EVENT LISTENERS
    // ========================================================================

    function initTipsListeners() {
        // Reagiere auf Preferences-Änderungen
        window.addEventListener('preferencesLoaded', () => {
            LOG(MODULE, 'Preferences loaded event received');
            applyTipsPreference();
        });

        window.addEventListener('preferencesReset', () => {
            LOG(MODULE, 'Preferences reset event received');
            applyTipsPreference();
        });
    }

    // ========================================================================
    // INITIALISIERUNG
    // ========================================================================

    function initTips() {
        LOG(MODULE, 'Initializing tips module...');

        initTipsFooter();
        initTipsListeners();

        LOG.success(MODULE, 'Tips module initialized');
    }

    // ========================================================================
    // PUBLIC API
    // ========================================================================

    window.Tips = {
        init: initTips,
 show: showTipsFooter,
 hide: hideTipsFooter,
 toggle: toggleTipsFooter,
 next: showNextTipManual,
 previous: showPreviousTip,
 reset: resetTipRotation
    };

    LOG(MODULE, 'Tips module loaded');

})();
