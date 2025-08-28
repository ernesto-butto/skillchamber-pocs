// Student Journey Prototype JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupFilterNavigation();
    setupConversationInteractions();
    setupFAB();
    setupModals();
    setupSceneCreationChat();
}

// Filter Navigation
function setupFilterNavigation() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const statusFilterNav = document.getElementById('status-filter');
    const statusFilterBtns = document.querySelectorAll('.status-filter-btn');
    const conversationItems = document.querySelectorAll('.conversation-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Show/hide status filter for scenes
            const filter = this.dataset.filter;
            if (filter === 'scenes') {
                statusFilterNav.style.display = 'flex';
            } else {
                statusFilterNav.style.display = 'none';
                // Reset status filter to all when not in scenes view
                statusFilterBtns.forEach(b => b.classList.remove('active'));
                statusFilterBtns[0].classList.add('active');
            }

            // Filter conversations
            filterConversations(filter, conversationItems);
        });
    });

    // Status filter navigation
    statusFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active status filter button
            statusFilterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter by status
            const status = this.dataset.status;
            filterScenesByStatus(status, conversationItems);
        });
    });
}

function filterConversations(filter, items) {
    items.forEach(item => {
        const type = item.dataset.type;
        
        if (filter === 'all') {
            item.classList.remove('hidden');
        } else if (filter === 'scenes' && type === 'scene') {
            item.classList.remove('hidden');
        } else if (filter === 'challenges' && type === 'challenge') {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

function filterScenesByStatus(status, items) {
    items.forEach(item => {
        const type = item.dataset.type;
        const itemStatus = item.dataset.status;
        
        if (type !== 'scene') {
            item.classList.add('hidden');
            return;
        }
        
        if (status === 'all') {
            item.classList.remove('hidden');
        } else if (status === 'completed' && itemStatus === 'completed') {
            item.classList.remove('hidden');
        } else if (status === 'in-progress' && itemStatus === 'in-progress') {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Conversation Interactions
function setupConversationInteractions() {
    const conversationItems = document.querySelectorAll('.conversation-item');
    
    conversationItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking on action buttons
            if (e.target.closest('.action-btn')) {
                return;
            }
            
            const type = this.dataset.type;
            
            if (type === 'scene') {
                handleSceneClick(this);
            } else if (type === 'challenge') {
                handleChallengeClick(this);
            }
        });
    });

    // Action button handlers
    setupActionButtons();
}

function setupActionButtons() {
    // Resume buttons
    document.querySelectorAll('.resume-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const conversationItem = this.closest('.conversation-item');
            const title = conversationItem.querySelector('h3').textContent;
            showNotification(`Resuming "${title}"...`);
            // In a real app, this would navigate to the conversation interface
        });
    });

    // Review buttons
    document.querySelectorAll('.review-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const conversationItem = this.closest('.conversation-item');
            const title = conversationItem.querySelector('h3').textContent;
            showNotification(`Opening review for "${title}"...`);
            // In a real app, this would show conversation history/review
        });
    });

    // Create buttons (for challenges)
    document.querySelectorAll('.create-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const conversationItem = this.closest('.conversation-item');
            const title = conversationItem.querySelector('h3').textContent;
            openSceneCreationModal(title);
        });
    });
}

function handleSceneClick(sceneItem) {
    const title = sceneItem.querySelector('h3').textContent;
    const status = sceneItem.querySelector('.progress-indicator').textContent.trim();
    
    if (status.includes('Completed')) {
        showNotification(`Opening review for "${title}"...`);
    } else {
        showNotification(`Resuming "${title}"...`);
    }
    // In a real app, this would navigate to the conversation interface
}

function handleChallengeClick(challengeItem) {
    const title = challengeItem.querySelector('h3').textContent;
    openSceneCreationModal(title);
}

// Floating Action Button
function setupFAB() {
    const fab = document.getElementById('create-scene-fab');
    const createSceneModal = document.getElementById('create-scene-modal');
    
    fab.addEventListener('click', function() {
        createSceneModal.classList.add('active');
    });
}

// Modal Management
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-btn');
    
    // Close button handlers
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
        });
    });
    
    // Click outside to close
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Challenge selection handlers
    setupChallengeSelection();
}

function setupChallengeSelection() {
    const challengeOptions = document.querySelectorAll('.challenge-option');
    const selectBtns = document.querySelectorAll('.select-challenge-btn');
    
    challengeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const challengeName = this.querySelector('h5').textContent;
            selectChallenge(challengeName);
        });
    });
    
    selectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const challengeName = this.closest('.challenge-option').querySelector('h5').textContent;
            selectChallenge(challengeName);
        });
    });
}

function selectChallenge(challengeName) {
    // Close create scene modal
    document.getElementById('create-scene-modal').classList.remove('active');
    
    // Open scene creation modal with selected challenge
    openSceneCreationModal(challengeName);
}

function openSceneCreationModal(challengeName) {
    const sceneCreationModal = document.getElementById('scene-creation-modal');
    const modalTitle = sceneCreationModal.querySelector('.modal-header h3');
    
    modalTitle.textContent = `Scene Creator - ${challengeName}`;
    
    // Reset chat messages
    resetSceneCreationChat(challengeName);
    
    sceneCreationModal.classList.add('active');
}

// Scene Creation Chat
function setupSceneCreationChat() {
    const sendBtn = document.getElementById('send-scene-message');
    const chatInput = document.getElementById('scene-chat-input');
    
    sendBtn.addEventListener('click', sendSceneMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendSceneMessage();
        }
    });
}

function resetSceneCreationChat(challengeName) {
    const chatMessages = document.getElementById('scene-chat-messages');
    const chatInput = document.getElementById('scene-chat-input');
    
    // Clear input
    chatInput.value = '';
    
    // Reset to initial AI message with challenge context
    chatMessages.innerHTML = `
        <div class="message ai-message">
            <div class="message-avatar">
                <i class="bi bi-robot"></i>
            </div>
            <div class="message-content">
                <p>Hi! I'm your Scene Creator assistant. I'll help you personalize the "${challengeName}" challenge into an exciting conversation scenario. Let's make it uniquely yours by adding your interests, preferred setting, or specific context. What kind of setting or theme would you like for this conversation?</p>
            </div>
        </div>
    `;
}

function sendSceneMessage() {
    const chatInput = document.getElementById('scene-chat-input');
    const chatMessages = document.getElementById('scene-chat-messages');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user', chatMessages);
    
    // Clear input
    chatInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = generateSceneCreationResponse(message);
        addChatMessage(aiResponse, 'ai', chatMessages);
    }, 1000);
}

function addChatMessage(message, sender, container) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarIcon = sender === 'ai' ? 'bi-robot' : 'bi-person';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="bi ${avatarIcon}"></i>
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function generateSceneCreationResponse(userMessage) {
    const responses = [
        "That's a fantastic idea! I love the creativity. Let me help you build that scenario. What specific situation or context would you like to focus on within that setting?",
        "Excellent choice! That setting will make for an engaging conversation. What role would you like to play in this scenario? Are you a customer, employee, visitor, or something else?",
        "Perfect! That theme will create a memorable learning experience. What specific language skills would you like to practice most in this scenario - vocabulary, pronunciation, or conversation flow?",
        "Great thinking! That context will make the conversation feel natural and fun. Would you like to add any specific challenges or goals to make it more interesting?",
        "Wonderful! I can already see how engaging this will be. Let me create your personalized scene now. This should take just a moment...",
        "Amazing! Your scene is ready. You'll be practicing conversation skills in your chosen setting. Ready to start your personalized language adventure?"
    ];
    
    const messageCount = document.querySelectorAll('#scene-chat-messages .message').length;
    const responseIndex = Math.min(Math.floor((messageCount - 1) / 2), responses.length - 1);
    
    return responses[responseIndex];
}

// Utility Functions
function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #6619BD;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

