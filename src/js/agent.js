// ===== AGENT.JS - Spürhund-Assistent Funktionalität =====

// ===== GLOBALE VARIABLEN =====
let agentOpen = false;
let agentDialogData = null; // Wird mit JSON-Daten geladen
let agentCurrentContext = null;
let agentConversationHistory = [];
let agentWaitingForInput = false;

// ===== INITIALISIERUNG =====
document.addEventListener('DOMContentLoaded', function() {
    initAgent();
    loadAgentDialogs();
});

// ===== AGENT INITIALISIEREN =====
function initAgent() {
    const toggleBtn = document.getElementById('agent-toggle');
    const closeBtn = document.getElementById('close-agent-sidebar');
    const sendBtn = document.getElementById('agent-send-btn');
    const input = document.getElementById('agent-input');
    
    // Toggle Button
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleAgent);
    }
    
    // Close Button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAgent);
    }
    
    // Send Button
    if (sendBtn) {
        sendBtn.addEventListener('click', sendAgentInput);
    }
    
    // Enter-Taste im Input
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAgentInput();
            }
        });
    }
    
    // ESC schließt Agent
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && agentOpen) {
            closeAgent();
        }
    });
    
    // Inline Triggers initialisieren
    initInlineTriggers();
    
    // Section-Enter Events für Trigger
    initSectionTriggers();
}

// ===== AGENT ÖFFNEN/SCHLIESSEN =====
function toggleAgent() {
    if (agentOpen) {
        closeAgent();
    } else {
        openAgent();
    }
}

function openAgent(contextId = null) {
    agentOpen = true;
    document.body.classList.add('agent-open');

    const toggleBtn = document.getElementById('agent-toggle');
    if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'true');

        // ⭐ Bei schmalen Viewports: Focus entfernen wenn Toggle aus Viewport verschwindet
        if (window.innerWidth <= 1024) {
            // Warte bis Transform-Animation abgeschlossen (350ms + 50ms Buffer)
            setTimeout(() => {
                if (document.activeElement === toggleBtn) {
                    toggleBtn.blur(); // Focus entfernen
                }
            }, 400);
        }
    }

    // Notification Badge ausblenden
    hideAgentNotification();

    // Wenn mit spezifischem Kontext geöffnet, Dialog starten
    if (contextId) {
        startAgentDialog(contextId);
    }
}

function closeAgent() {
    agentOpen = false;
    document.body.classList.remove('agent-open');

    const toggleBtn = document.getElementById('agent-toggle');
    if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');

        // ⭐ Bei schmalen Viewports: Focus kann wieder gesetzt werden
        // (Toggle kehrt zurück in den Viewport)
        // Kein automatischer Focus hier, da Nutzer möglicherweise mit Tastatur navigiert
    }
}

// ===== NOTIFICATION BADGE =====
function showAgentNotification(message) {
    const badge = document.getElementById('agent-notification');
    if (badge) {
        badge.style.display = 'flex';
        
        // Optional: Message als Tooltip anzeigen
        if (message) {
            badge.title = message;
            badge.textContent = '💡';
        } else {
            badge.textContent = '!';
        }
    }
}

function hideAgentNotification() {
    const badge = document.getElementById('agent-notification');
    if (badge) {
        badge.style.display = 'none';
    }
}

// ===== CHAT NACHRICHTEN =====
function addAgentMessage(message, isUser = false) {
    const container = document.getElementById('agent-chat-container');
    if (!container) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'agent-message agent-message-user' : 'agent-message agent-message-assistant';
    
    if (!isUser) {
        // Agent-Nachricht mit Avatar
        messageDiv.innerHTML = `
            <div class="agent-message-avatar">🐕‍🦺</div>
            <div class="agent-message-bubble">
                ${message}
            </div>
        `;
    } else {
        // Benutzer-Nachricht
        messageDiv.innerHTML = `
            <div class="agent-message-bubble">
                ${message}
            </div>
            <div class="agent-message-avatar">👤</div>
        `;
    }
    
    container.appendChild(messageDiv);
    
    // Scroll zu neuer Nachricht
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    
    // Zur Historie hinzufügen
    agentConversationHistory.push({
        message: message,
        isUser: isUser,
        timestamp: Date.now()
    });
}

function showAgentTyping() {
    const container = document.getElementById('agent-chat-container');
    if (!container) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'agent-typing-indicator';
    typingDiv.id = 'agent-typing';
    
    typingDiv.innerHTML = `
        <div class="agent-message-avatar">🐕‍🦺</div>
        <div class="agent-typing-dots">
            <span class="agent-typing-dot"></span>
            <span class="agent-typing-dot"></span>
            <span class="agent-typing-dot"></span>
        </div>
    `;
    
    container.appendChild(typingDiv);
    typingDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

function hideAgentTyping() {
    const typingIndicator = document.getElementById('agent-typing');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// ===== QUICK ACTIONS (BUTTONS) =====
function showQuickActions(actions) {
    const container = document.getElementById('agent-quick-actions');
    const inputContainer = document.getElementById('agent-input-container');
    
    if (!container) return;
    
    // Input verstecken, Actions zeigen
    if (inputContainer) inputContainer.style.display = 'none';
    container.style.display = 'flex';
    container.innerHTML = '';
    
    actions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = 'agent-action-btn';
        btn.innerHTML = `
            <span class="agent-action-icon">${action.icon || '▶'}</span>
            <span>${action.label}</span>
        `;
        
        btn.addEventListener('click', function() {
            handleAgentAction(action);
        });
        
        container.appendChild(btn);
    });
    
    agentWaitingForInput = false;
}

function hideQuickActions() {
    const container = document.getElementById('agent-quick-actions');
    if (container) {
        container.style.display = 'none';
        container.innerHTML = '';
    }
}

// ===== INPUT HANDLING =====
function showAgentInput(placeholder = 'Antwort eingeben...') {
    const inputContainer = document.getElementById('agent-input-container');
    const actionsContainer = document.getElementById('agent-quick-actions');
    const input = document.getElementById('agent-input');
    
    // Actions verstecken, Input zeigen
    if (actionsContainer) actionsContainer.style.display = 'none';
    if (inputContainer) {
        inputContainer.style.display = 'flex';
        agentWaitingForInput = true;
    }
    
    if (input) {
        input.placeholder = placeholder;
        input.value = '';
        input.focus();
    }
}

function hideAgentInput() {
    const inputContainer = document.getElementById('agent-input-container');
    if (inputContainer) {
        inputContainer.style.display = 'none';
    }
    agentWaitingForInput = false;
}

function sendAgentInput() {
    const input = document.getElementById('agent-input');
    if (!input || !input.value.trim()) return;
    
    const userMessage = input.value.trim();
    
    // Benutzer-Nachricht anzeigen
    addAgentMessage(`<p>${userMessage}</p>`, true);
    
    // Input leeren und verstecken
    input.value = '';
    hideAgentInput();
    
    // Verarbeitung mit Verzögerung (simuliert "Nachdenken")
    showAgentTyping();
    
    const delay = getRandomTypingDelay();
    
    setTimeout(function() {
        hideAgentTyping();
        processAgentInput(userMessage);
    }, delay);
}

// ===== DIALOG HANDLING =====
function startAgentDialog(contextId) {
    agentCurrentContext = contextId;
    
    // Dialog-Daten aus JSON laden
    if (!agentDialogData || !agentDialogData.dialogs || !agentDialogData.dialogs[contextId]) {
        const fallbackMessage = agentDialogData?.globalSettings?.fallbackMessage || 
                               '<p>Wuff! Leider habe ich zu diesem Thema noch keine Informationen. 🤔</p>';
        addAgentMessage(fallbackMessage);
        return;
    }
    
    const dialog = agentDialogData.dialogs[contextId];
    
    // Initial Message
    if (dialog.initialMessage) {
        showAgentTyping();
        const delay = getRandomTypingDelay();
        
        setTimeout(function() {
            hideAgentTyping();
            addAgentMessage(dialog.initialMessage);
            
            // Wenn Actions vorhanden, anzeigen
            if (dialog.actions && dialog.actions.length > 0) {
                showQuickActions(dialog.actions);
            }
            
            // Wenn Input erwartet wird
            if (dialog.expectInput) {
                showAgentInput(dialog.inputPlaceholder || 'Antwort eingeben...');
            }
        }, delay);
    }
}

// ===== TYPING DELAY BERECHNEN =====
function getRandomTypingDelay() {
    const settings = agentDialogData?.globalSettings;
    const min = settings?.typingDelayMin || 800;
    const max = settings?.typingDelayMax || 1200;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===== ACTION HANDLING (ERWEITERT) =====
function handleAgentAction(action) {
    // Benutzer-Wahl als Nachricht anzeigen
    addAgentMessage(`<p>${action.label}</p>`, true);
    
    // Actions verstecken
    hideQuickActions();
    
    // Typing-Indikator
    showAgentTyping();
    
    const delay = getRandomTypingDelay();
    
    setTimeout(function() {
        hideAgentTyping();
        processActionByType(action);
    }, delay);
}

// ===== ACTION-TYPE PROCESSING =====
function processActionByType(action) {
    switch (action.type) {
        case 'navigate':
            handleNavigateAction(action);
            break;
        case 'showInfo':
            handleShowInfoAction(action);
            break;
        case 'askQuestion':
            handleAskQuestionAction(action);
            break;
        case 'highlightElements':
            handleHighlightAction(action);
            break;
        case 'showActions':
            handleShowActionsAction(action);
            break;
        case 'showMedia':  // NEU
            handleShowMediaAction(action);
            break;
        default:
            console.warn('Unbekannter Action-Type:', action.type);
            addAgentMessage(agentDialogData?.globalSettings?.errorMessage || 
                           '<p>Da ist etwas schiefgelaufen! 😅</p>');
    }
}

// ===== NAVIGATE ACTION =====
function handleNavigateAction(action) {
    if (!action.targetSelectors || action.targetSelectors.length === 0) {
        console.error('Navigate action ohne targetSelectors:', action);
        return;
    }
    
    // Erstes verfügbares Target finden und navigieren
    let navigated = false;
    for (const selector of action.targetSelectors) {
        if (navigateToSelector(selector, action.scrollBehavior)) {
            navigated = true;
            break;
        }
    }
    
    if (navigated) {
        const targetTitle = action.targetTitle || 'gewünschter Bereich';
        addAgentMessage(`<p>Wuff! 🎯 Ich bringe Sie zu "${targetTitle}".</p>`);
        
        // Context-Block anzeigen falls vorhanden
        if (action.contextBlock) {
            showContextBlockFromAction(action.contextBlock);
        }
        
        // Mobile: Agent schließen
        if (shouldCloseOnMobile()) {
            setTimeout(closeAgent, 1500);
        }
    } else {
        addAgentMessage('<p>Entschuldigung, ich konnte das Ziel nicht finden. 😅</p>');
    }
    
    // Next Actions anbieten
    if (action.nextActions && action.nextActions.length > 0) {
        setTimeout(() => showQuickActions(action.nextActions), 1000);
    }
}

// ===== SHOW INFO ACTION =====
function handleShowInfoAction(action) {
    if (action.content) {
        addAgentMessage(action.content);
    }
    
    // Next Actions anbieten
    if (action.nextActions && action.nextActions.length > 0) {
        showQuickActions(action.nextActions);
    }
}

// ===== ASK QUESTION ACTION =====
function handleAskQuestionAction(action) {
    if (action.question) {
        addAgentMessage(action.question);
    }
    
    if (action.actions && action.actions.length > 0) {
        showQuickActions(action.actions);
    } else if (action.expectInput) {
        showAgentInput(action.inputPlaceholder || 'Antwort eingeben...');
    }
}

// ===== HIGHLIGHT ACTION =====
function handleHighlightAction(action) {
    if (action.targetSelectors && action.targetSelectors.length > 0) {
        highlightMultipleElements(action.targetSelectors, action.highlightDuration);
        addAgentMessage('<p>Wuff! Ich habe die wichtigen Bereiche markiert! 🎯</p>');
    }
}

// ===== SHOW ACTIONS ACTION =====
function handleShowActionsAction(action) {
    if (action.actions && action.actions.length > 0) {
        showQuickActions(action.actions);
    }
}

// ===== SHOW MEDIA ACTION =====
function handleShowMediaAction(action) {
    if (!action.mediaType || !action.mediaSrc) {
        console.error('showMedia-Action ohne mediaType oder mediaSrc:', action);
        addAgentMessage('<p>Entschuldigung, ich konnte das Medium nicht laden. 😅</p>');
        return;
    }
    
    const mediaType = action.mediaType; // 'image' oder 'video'
    const mediaSrc = action.mediaSrc;
    const mediaAlt = action.mediaAlt || 'Medium vom Agenten';
    const mediaCaption = action.mediaCaption || action.label || '';
    
    // Bestätigung an Nutzer
    const mediaTypeText = mediaType === 'video' ? 'Video' : 'Screenshot';
    addAgentMessage(`<p>Wuff! 🎯 Schau dir diesen ${mediaTypeText} an!</p>`);
    
    // Prüfen ob mediaAPI verfügbar ist
    if (typeof window.mediaAPI !== 'undefined' && window.mediaAPI.openModal) {
        // Modal öffnen über media-handler.js
        window.mediaAPI.openModal(mediaSrc, mediaAlt, mediaType, mediaCaption);
        
        // Mobile: Agent schließen nach Medien-Anzeige
        if (shouldCloseOnMobile()) {
            setTimeout(closeAgent, 1000);
        }
    } else {
        console.error('mediaAPI nicht verfügbar');
        addAgentMessage('<p>Entschuldigung, die Medien-Anzeige ist nicht verfügbar. ⚠️</p>');
    }
    
    // Next Actions anbieten
    if (action.nextActions && action.nextActions.length > 0) {
        setTimeout(() => showQuickActions(action.nextActions), 500);
    }
}

// ===== INPUT PROCESSING =====
function processAgentInput(userInput) {
    // Keyword-Pattern-Matching aus JSON
    const patterns = agentDialogData?.responsePatterns?.keywords;
    
    if (patterns) {
        for (const [pattern, config] of Object.entries(patterns)) {
            // Regex-Pattern aus Key erstellen
            const regex = new RegExp(pattern, 'i');
            if (regex.test(userInput)) {
                // Random Response auswählen
                const responses = config.responses || [];
                if (responses.length > 0) {
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addAgentMessage(randomResponse);
                    
                    // Follow-up Actions
                    if (config.followUpActions && config.followUpActions.length > 0) {
                        showQuickActions(config.followUpActions);
                        return;
                    }
                }
            }
        }
    }
    
    // Fallback-Response
    const fallbackMessage = agentDialogData?.globalSettings?.fallbackMessage || 
                           '<p>Interessante Frage! Lassen Sie mich nachdenken... 🤔 Können Sie mir mehr Details geben?</p>';
    addAgentMessage(fallbackMessage);
    
    // Standard-Actions anbieten
    showQuickActions([
        {
            id: 'back-overview',
            icon: '🏠',
            label: 'Zurück zur Übersicht',
            type: 'navigate',
            targetSelectors: ['#section-intro']
        },
        {
            id: 'ask-question',
            icon: '❓',
            label: 'Weitere Frage stellen',
            type: 'askQuestion',
            question: '<p>Was möchten Sie als nächstes wissen?</p>',
            expectInput: true
        }
    ]);
}

// ===== NAVIGATION ZU LEITFADEN-ELEMENTEN (CSS-SELECTOR) =====
function navigateToSelector(selector, scrollBehavior = 'smooth') {
    const element = document.querySelector(selector);
    
    if (element) {
        // Scroll-Verhalten aus globalSettings oder Parameter
        const behavior = scrollBehavior || 
                        agentDialogData?.globalSettings?.scrollBehavior || 
                        'smooth';
        
        // Smooth scroll zum Element
        element.scrollIntoView({ 
            behavior: behavior, 
            block: 'center' 
        });
        
        // Highlight-Effekt
        const duration = agentDialogData?.globalSettings?.highlightDuration || 2000;
        element.classList.add('agent-highlight');
        setTimeout(function() {
            element.classList.remove('agent-highlight');
        }, duration);
        
        return true;
    } else {
        console.warn(`Element mit Selector "${selector}" nicht gefunden`);
        return false;
    }
}

// ===== MULTIPLE ELEMENTS HIGHLIGHTEN =====
function highlightMultipleElements(selectors, duration) {
    const highlightDuration = duration || 
                             agentDialogData?.globalSettings?.highlightDuration || 
                             2000;
    
    selectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('agent-highlight');
            setTimeout(() => {
                element.classList.remove('agent-highlight');
            }, highlightDuration);
        } else {
            console.warn(`Element mit Selector "${selector}" nicht gefunden`);
        }
    });
}

// ===== CONTEXT-BLOCK VON ACTION =====
function showContextBlockFromAction(contextBlock) {
    if (!contextBlock.targetSelectors || contextBlock.targetSelectors.length === 0) {
        console.error('ContextBlock ohne targetSelectors:', contextBlock);
        return;
    }
    
    // Erstes verfügbares Target finden
    for (const selector of contextBlock.targetSelectors) {
        const block = document.querySelector(selector);
        if (block) {
            // Content einfügen
            block.innerHTML = contextBlock.content;
            
            // Block anzeigen
            block.style.display = 'block';
            
            // Zum Block scrollen
            block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Auto-Hide falls konfiguriert
            if (contextBlock.autoHide) {
                const hideDelay = contextBlock.hideDelay || 10000;
                setTimeout(() => {
                    block.style.display = 'none';
                }, hideDelay);
            }
            
            return; // Erfolgreich, keine weiteren Selektoren probieren
        }
    }
    
    console.warn('Kein Context-Block-Target gefunden:', contextBlock.targetSelectors);
}

// ===== MOBILE DETECTION =====
function shouldCloseOnMobile() {
    const closeOnMobile = agentDialogData?.globalSettings?.closeOnMobileAfterNavigation;
    return closeOnMobile !== false && window.innerWidth <= 1024;
}

// ===== INLINE TRIGGERS =====
function initInlineTriggers() {
    const triggers = document.querySelectorAll('.agent-inline-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const contextId = this.dataset.agentContext;
            const questionId = this.dataset.agentQuestion;
            
            // Agent öffnen mit diesem Kontext
            openAgent(contextId);
            
            // Optional: Spezifische Frage starten
            if (questionId && agentDialogData && agentDialogData.dialogs[contextId]) {
                const dialog = agentDialogData.dialogs[contextId];
                if (dialog.questions && dialog.questions[questionId]) {
                    startSpecificQuestion(dialog.questions[questionId]);
                }
            }
        });
        
        // Tastatur-Support
        trigger.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

function startSpecificQuestion(questionData) {
    showAgentTyping();
    
    const delay = getRandomTypingDelay();
    
    setTimeout(function() {
        hideAgentTyping();
        addAgentMessage(questionData.message);
        
        if (questionData.actions) {
            showQuickActions(questionData.actions);
        }
    }, delay);
}

// ===== SECTION-ENTER TRIGGERS =====
function initSectionTriggers() {
    // Wenn Benutzer eine Section betritt, kann Agent reagieren
    const sections = document.querySelectorAll('.content-section[data-section]');
    
    const triggerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                const sectionId = entry.target.dataset.section;
                checkSectionTrigger(sectionId, entry.intersectionRatio);
            }
        });
    }, {
        threshold: [0.1, 0.5, 0.7, 0.9]
    });
    
    sections.forEach(section => {
        triggerObserver.observe(section);
    });
}

function checkSectionTrigger(sectionId, intersectionRatio) {
    // Prüfen ob für diese Section ein Auto-Trigger definiert ist
    const sectionTriggers = agentDialogData?.sectionTriggers;
    if (!sectionTriggers) return;
    
    // Trigger für diese Section finden
    const trigger = Object.values(sectionTriggers).find(t => t.sectionId === sectionId);
    
    if (trigger && !trigger.triggered) {
        const conditions = trigger.conditions || {};
        const minRatio = conditions.intersectionRatio || 0.5;
        const dwellTime = conditions.dwellTime || 3000;
        
        // Prüfen ob Intersection-Ratio ausreicht
        if (intersectionRatio >= minRatio) {
            // Timer für Dwell-Time starten
            setTimeout(() => {
                // Nochmal prüfen ob Section noch im Fokus ist
                const section = document.querySelector(`[data-section="${sectionId}"]`);
                if (section && isElementInViewport(section, minRatio)) {
                    triggerSectionAction(trigger);
                }
            }, dwellTime);
        }
    }
}

function triggerSectionAction(trigger) {
    // Trigger markieren als ausgelöst
    trigger.triggered = true;
    
    // Notification Badge anzeigen
    if (trigger.notificationMessage) {
        showAgentNotification(trigger.notificationMessage);
    } else {
        showAgentNotification();
    }
    
    // Optional: Nach Verzögerung automatisch öffnen
    if (trigger.autoOpen && trigger.contextId) {
        setTimeout(function() {
            openAgent(trigger.contextId);
        }, trigger.delay || 3000);
    }
}

function isElementInViewport(element, minRatio = 0.5) {
    const rect = element.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
    
    const visibleHeight = Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, viewWidth) - Math.max(rect.left, 0);
    
    const elementArea = rect.height * rect.width;
    const visibleArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth);
    
    return elementArea > 0 && (visibleArea / elementArea) >= minRatio;
}

// ===== DIALOG-DATEN LADEN (JSON) =====
function loadAgentDialogs() {
    // JSON-Datei laden
    fetch('agent-dialogs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Agent dialogs loaded successfully:', data.metadata);
            agentDialogData = data;
            
            // Global Settings anwenden
            if (data.globalSettings) {
                applyGlobalSettings(data.globalSettings);
            }
        })
        .catch(error => {
            console.error('Fehler beim Laden der Agent-Dialoge:', error);
            // Fallback auf minimale Konfiguration
            agentDialogData = createFallbackDialogData();
        });
}

// ===== GLOBAL SETTINGS ANWENDEN =====
function applyGlobalSettings(settings) {
    // Agent-Name und Icon aktualisieren
    const agentTitle = document.querySelector('.agent-title h2');
    if (agentTitle && settings.agentName) {
        agentTitle.textContent = settings.agentName;
    }
    
    const agentDog = document.querySelector('.agent-dog');
    const agentIcon = document.querySelector('.agent-icon');
    if (settings.agentIcon) {
        if (agentDog) agentDog.textContent = settings.agentIcon;
        if (agentIcon) agentIcon.textContent = settings.agentIcon;
    }
    
    // Welcome Message aktualisieren
    if (settings.welcomeMessage) {
        const welcomeMessage = document.querySelector('.agent-welcome-message .agent-message-bubble');
        if (welcomeMessage) {
            welcomeMessage.innerHTML = settings.welcomeMessage;
        }
    }
}

// ===== FALLBACK DIALOG-DATEN =====
function createFallbackDialogData() {
    return {
        version: "1.0",
        metadata: {
            description: "Fallback Agent-Dialog-Konfiguration",
            agent_name: "Spürhund Rex"
        },
        dialogs: {
            'format-decision': {
                id: 'format-decision',
                title: 'Format-Entscheidungshilfe',
                targetSelectors: ['#section-step2'],
                initialMessage: '<p>Wuff! 🐕‍🦺 Ich helfe bei der Format-Wahl!</p>',
                actions: [
                    {
                        id: 'html-help',
                        icon: '💬',
                        label: 'HTML erklären',
                        type: 'showInfo',
                        content: '<p>HTML ist ideal für interaktive Reports!</p>'
                    }
                ]
            }
        },
        globalSettings: {
            agentName: "Spürhund Rex",
            agentIcon: "🐕‍🦺",
            welcomeMessage: "<p>Wuff! 🎉 Ich bin Rex!</p>",
            fallbackMessage: "<p>Interessante Frage! Können Sie mehr Details geben? 🤔</p>"
        }
    };
}

// ===== LEGACY FUNCTIONS (FÜR RÜCKWÄRTSKOMPATIBILITÄT) =====
// Diese Funktionen sind für bestehende HTML-Referenzen
function navigateToSection(targetId) {
    return navigateToSelector(`#${targetId}`);
}

function showContextBlock(contextBlockId, content) {
    const contextBlock = {
        targetSelectors: [`#${contextBlockId}`],
        content: `
            <div class="agent-context-header">
                <span class="agent-context-icon">🐕‍🦺</span>
                <h4 class="agent-context-title">Rex' Tipp</h4>
                <button class="agent-context-close" onclick="hideContextBlock('${contextBlockId}')" aria-label="Tipp schließen">✕</button>
            </div>
            <div class="agent-context-content">
                ${content}
            </div>
        `
    };
    showContextBlockFromAction(contextBlock);
}

function hideContextBlock(contextBlockId) {
    const block = document.getElementById(contextBlockId);
    if (block) {
        block.style.display = 'none';
    }
}

// ===== UTILITY FUNKTIONEN =====
// Highlight-Effekt für navigierte Elemente
const style = document.createElement('style');
style.textContent = `
    .agent-highlight {
        animation: agentHighlightPulse 2s ease;
    }
    
    @keyframes agentHighlightPulse {
        0%, 100% { 
            background-color: transparent; 
            border-color: transparent; 
        }
        25%, 75% { 
            background-color: rgba(245, 87, 108, 0.2);
            border-color: rgba(245, 87, 108, 0.5);
        }
        50% { 
            background-color: rgba(245, 87, 108, 0.3);
            border-color: rgba(245, 87, 108, 0.8);
        }
    }
    
    /* Legacy Support */
    .highlight-flash {
        animation: agentHighlightPulse 2s ease;
    }
`;
document.head.appendChild(style);

// ===== EXPORT FÜR EXTERNE VERWENDUNG =====
window.agentAPI = {
    open: openAgent,
    close: closeAgent,
    addMessage: addAgentMessage,
    showActions: showQuickActions,
    navigateTo: navigateToSelector,
    navigateToSection: navigateToSection, // Legacy
    showContext: showContextBlockFromAction,
    showContextBlock: showContextBlock, // Legacy  
    hideContext: hideContextBlock,
    highlightElements: highlightMultipleElements,
    loadDialogs: loadAgentDialogs,
    getDialogData: () => agentDialogData,
    validateSelector: (selector) => {
        try {
            const element = document.querySelector(selector);
            return {
                valid: true,
                exists: element !== null,
                element: element
            };
        } catch (e) {
            return {
                valid: false,
                exists: false,
                error: e.message
            };
        }
    }
};
