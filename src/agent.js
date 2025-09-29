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
    }
}

// ===== NOTIFICATION BADGE =====
function showAgentNotification() {
    const badge = document.getElementById('agent-notification');
    if (badge) {
        badge.style.display = 'flex';
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
    
    setTimeout(function() {
        hideAgentTyping();
        processAgentInput(userMessage);
    }, 1000);
}

// ===== DIALOG HANDLING =====
function startAgentDialog(contextId) {
    agentCurrentContext = contextId;
    
    // Dialog-Daten aus JSON laden
    if (!agentDialogData || !agentDialogData[contextId]) {
        addAgentMessage('<p>Wuff! Leider habe ich zu diesem Thema noch keine Informationen. 🤔</p>');
        return;
    }
    
    const dialog = agentDialogData[contextId];
    
    // Initial Message
    if (dialog.initialMessage) {
        showAgentTyping();
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
        }, 800);
    }
}

function handleAgentAction(action) {
    // Benutzer-Wahl als Nachricht anzeigen
    addAgentMessage(`<p>${action.label}</p>`, true);
    
    // Actions verstecken
    hideQuickActions();
    
    // Typing-Indikator
    showAgentTyping();
    
    setTimeout(function() {
        hideAgentTyping();
        
        // Je nach Action-Type
        if (action.type === 'navigate') {
            // Zum Leitfaden-Element navigieren
            navigateToSection(action.targetId);
            
            // Feedback-Nachricht
            addAgentMessage(`<p>Wuff! 🎯 Ich bringe Sie zu "${action.targetTitle}".</p>`);
            
            // Optional: Kontext-Block im Leitfaden einblenden
            if (action.contextBlockId) {
                showContextBlock(action.contextBlockId, action.contextContent);
            }
            
        } else if (action.type === 'showInfo') {
            // Informationen anzeigen
            addAgentMessage(action.content);
            
            // Weitere Actions?
            if (action.nextActions) {
                showQuickActions(action.nextActions);
            }
            
        } else if (action.type === 'askQuestion') {
            // Neue Frage stellen
            addAgentMessage(action.question);
            
            if (action.actions) {
                showQuickActions(action.actions);
            } else if (action.expectInput) {
                showAgentInput(action.inputPlaceholder);
            }
        }
    }, 1000);
}

function processAgentInput(userInput) {
    // Hier kann später NLP oder Keyword-Matching implementiert werden
    // Für jetzt: Einfache Antwort
    
    const response = generateAgentResponse(userInput);
    addAgentMessage(response);
    
    // Standard-Actions anbieten
    showQuickActions([
        {
            icon: '🏠',
            label: 'Zurück zur Übersicht',
            type: 'navigate',
            targetId: 'section-intro'
        },
        {
            icon: '❓',
            label: 'Weitere Frage stellen',
            type: 'askQuestion',
            question: '<p>Was möchten Sie als nächstes wissen?</p>',
            expectInput: true
        }
    ]);
}

function generateAgentResponse(userInput) {
    // Einfaches Keyword-Matching für Demo
    const input = userInput.toLowerCase();
    
    if (input.includes('html') || input.includes('format')) {
        return '<p>Wuff! HTML-Reports sind ideal für interaktive Darstellung und Chat-Analysen. Sie bieten Hyperlinks und web-basierte Navigation. 🐾</p>';
    } else if (input.includes('pdf')) {
        return '<p>PDF-Reports eignen sich perfekt für Gerichtsberichte und finale Dokumentation. Sie sind unveränderbar und druckoptimiert. 📄</p>';
    } else if (input.includes('hilfe') || input.includes('help')) {
        return '<p>Gerne! Ich kann Ihnen bei folgenden Themen helfen: Report-Format wählen, Daten exportieren, Best Practices. Was interessiert Sie? 🐕‍🦺</p>';
    } else {
        return '<p>Interessante Frage! Lassen Sie mich nachdenken... 🤔 Können Sie mir mehr Details geben?</p>';
    }
}

// ===== NAVIGATION ZU LEITFADEN-ELEMENTEN =====
function navigateToSection(targetId) {
    const element = document.getElementById(targetId);
    
    if (element) {
        // Smooth scroll zum Element
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Optional: Element kurz highlighten
        element.classList.add('highlight-flash');
        setTimeout(function() {
            element.classList.remove('highlight-flash');
        }, 2000);
        
        // Agent auf Mobile schließen
        if (window.innerWidth <= 1024) {
            setTimeout(closeAgent, 1500);
        }
    }
}

// ===== KONTEXT-BLÖCKE IM LEITFADEN =====
function showContextBlock(contextBlockId, content) {
    const block = document.getElementById(contextBlockId);
    
    if (!block) return;
    
    // Content einfügen
    block.innerHTML = `
        <div class="agent-context-header">
            <span class="agent-context-icon">🐕‍🦺</span>
            <h4 class="agent-context-title">Rex' Tipp</h4>
            <button class="agent-context-close" onclick="hideContextBlock('${contextBlockId}')" aria-label="Tipp schließen">✕</button>
        </div>
        <div class="agent-context-content">
            ${content}
        </div>
    `;
    
    // Block anzeigen
    block.style.display = 'block';
    
    // Zum Block scrollen
    block.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideContextBlock(contextBlockId) {
    const block = document.getElementById(contextBlockId);
    if (block) {
        block.style.display = 'none';
    }
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
            if (questionId && agentDialogData && agentDialogData[contextId]) {
                const dialog = agentDialogData[contextId];
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
    
    setTimeout(function() {
        hideAgentTyping();
        addAgentMessage(questionData.message);
        
        if (questionData.actions) {
            showQuickActions(questionData.actions);
        }
    }, 800);
}

// ===== SECTION-ENTER TRIGGERS =====
function initSectionTriggers() {
    // Wenn Benutzer eine Section betritt, kann Agent reagieren
    const sections = document.querySelectorAll('.content-section[data-section]');
    
    const triggerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
                const sectionId = entry.target.dataset.section;
                checkSectionTrigger(sectionId);
            }
        });
    }, {
        threshold: [0.7]
    });
    
    sections.forEach(section => {
        triggerObserver.observe(section);
    });
}

function checkSectionTrigger(sectionId) {
    // Prüfen ob für diese Section ein Auto-Trigger definiert ist
    if (!agentDialogData || !agentDialogData.sectionTriggers) return;
    
    const trigger = agentDialogData.sectionTriggers[sectionId];
    
    if (trigger && !trigger.triggered) {
        // Trigger nur einmal auslösen
        trigger.triggered = true;
        
        // Notification Badge anzeigen
        showAgentNotification();
        
        // Optional: Nach Verzögerung automatisch öffnen
        if (trigger.autoOpen) {
            setTimeout(function() {
                openAgent(trigger.contextId);
            }, trigger.delay || 3000);
        }
    }
}

// ===== DIALOG-DATEN LADEN (JSON) =====
function loadAgentDialogs() {
    // Zunächst mit Beispiel-Daten (später aus JSON-Datei)
    agentDialogData = {
        // Context: Format-Entscheidung
        'format-decision': {
            initialMessage: '<p>Wuff! 🐕‍🦺 Ich sehe, Sie müssen ein Report-Format wählen.</p><p>Lassen Sie mich Ihnen helfen! Wofür benötigen Sie den Report?</p>',
            actions: [
                {
                    icon: '💬',
                    label: 'Chat-Analysen und interaktive Darstellung',
                    type: 'showInfo',
                    content: '<p>Perfekt! Für Chat-Analysen ist <strong>HTML</strong> die beste Wahl! 🎯</p><p>HTML-Reports bieten:</p><ul><li>✅ Interaktive Navigation</li><li>✅ Chat-Thread Darstellung</li><li>✅ Hyperlinks zwischen Beweisen</li><li>✅ UTF-8 Support für mehrsprachige Inhalte</li></ul>',
                    nextActions: [
                        {
                            icon: '🎯',
                            label: 'Zu Schritt "HTML wählen" springen',
                            type: 'navigate',
                            targetId: 'step2-intro',
                            targetTitle: 'Format HTML wählen',
                            contextBlockId: 'agent-context-format-decision',
                            contextContent: '<p><strong>Rex\' Expertentipp:</strong> Bei Chat-Daten aus WhatsApp, Telegram oder Signal ist HTML unschlagbar, weil die Threading-Struktur erhalten bleibt und Emojis korrekt dargestellt werden.</p>'
                        }
                    ]
                },
                {
                    icon: '⚖️',
                    label: 'Gerichtsberichte und offizielle Dokumentation',
                    type: 'showInfo',
                    content: '<p>Ah, für offizielle Zwecke! Dann empfehle ich <strong>PDF</strong>. 📄</p><p>PDF-Reports sind:</p><ul><li>✅ Unveränderbar und gerichtsfest</li><li>✅ Druckoptimiert</li><li>✅ Plattformunabhängig</li><li>✅ Mit automatischem Inhaltsverzeichnis</li></ul>',
                    nextActions: [
                        {
                            icon: '📚',
                            label: 'Mehr über PDF-Export erfahren',
                            type: 'navigate',
                            targetId: 'step2-format-pdf'
                        }
                    ]
                },
                {
                    icon: '📊',
                    label: 'Datenanalyse und Timeline-Auswertung',
                    type: 'showInfo',
                    content: '<p>Ausgezeichnet für Analysen! Wählen Sie <strong>XLSX</strong>. 📈</p><p>XLSX-Exports ermöglichen:</p><ul><li>✅ Timeline-Analysen</li><li>✅ Filterbare Tabellen</li><li>✅ Statistische Auswertungen</li><li>✅ Weiterverarbeitung in Excel</li></ul>',
                    nextActions: [
                        {
                            icon: '📊',
                            label: 'Zu Excel-Export Details',
                            type: 'navigate',
                            targetId: 'step2-format-xlsx'
                        }
                    ]
                }
            ],
            questions: {
                'why-html': {
                    message: '<p>Gute Frage! 🤓 HTML ist ideal weil:</p><ul><li>Interaktive Links zwischen Beweisen</li><li>Chat-Threads bleiben strukturiert</li><li>Emojis und Sonderzeichen funktionieren perfekt</li><li>Durchsuchbar im Browser</li></ul><p>Soll ich Ihnen zeigen, wie man HTML auswählt?</p>',
                    actions: [
                        {
                            icon: '✅',
                            label: 'Ja, zeig mir wie!',
                            type: 'navigate',
                            targetId: 'step2-intro',
                            targetTitle: 'Format HTML wählen'
                        },
                        {
                            icon: '❓',
                            label: 'Was ist mit PDF?',
                            type: 'askQuestion',
                            question: '<p>PDF ist super für offizielle Dokumente! Soll ich mehr darüber erzählen?</p>',
                            actions: [
                                {
                                    icon: '📄',
                                    label: 'Ja, erkläre PDF',
                                    type: 'showInfo',
                                    content: '<p>PDF-Reports sind unveränderbar und perfekt für Gerichte...</p>'
                                }
                            ]
                        }
                    ]
                }
            }
        },
        
        // Section Triggers (automatisch wenn Section betreten wird)
        'sectionTriggers': {
            'step2': {
                contextId: 'format-decision',
                autoOpen: false, // Nur Notification, nicht auto-öffnen
                delay: 2000,
                triggered: false
            }
        }
    };
    
    // TODO: Später aus externer JSON-Datei laden:
    // fetch('agent-dialogs.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         agentDialogData = data;
    //     });
}

// ===== UTILITY FUNKTIONEN =====
// Highlight-Effekt für navigierte Elemente
const style = document.createElement('style');
style.textContent = `
    .highlight-flash {
        animation: highlightPulse 2s ease;
    }
    
    @keyframes highlightPulse {
        0%, 100% { background-color: transparent; }
        50% { background-color: rgba(245, 87, 108, 0.2); }
    }
`;
document.head.appendChild(style);

// ===== EXPORT FÜR EXTERNE VERWENDUNG =====
window.agentAPI = {
    open: openAgent,
    close: closeAgent,
    addMessage: addAgentMessage,
    showActions: showQuickActions,
    navigateTo: navigateToSection,
    showContext: showContextBlock,
    hideContext: hideContextBlock
};