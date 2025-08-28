// Course Management Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupTabNavigation();
    setupSubTabNavigation();
    setupStudentSearch();
    setupStudentModals();
    setupSceneLab();
    setupTestBlueprint();
    setupModalClosing();
    setupAddBlueprintModal();
    setupBlueprintExamples();
}

// Tab Navigation
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

// Sub Tab Navigation (for Scenes)
function setupSubTabNavigation() {
    const subTabButtons = document.querySelectorAll('.sub-tab-btn');
    const subTabContents = document.querySelectorAll('.subtab-content');

    subTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSubTab = button.getAttribute('data-subtab');
            
            // Remove active class from all sub-tabs and contents
            subTabButtons.forEach(btn => btn.classList.remove('active'));
            subTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked sub-tab and corresponding content
            button.classList.add('active');
            document.getElementById(`${targetSubTab}-subtab`).classList.add('active');
        });
    });
}

// Student Search Functionality
function setupStudentSearch() {
    const searchInput = document.getElementById('student-search');
    const studentCards = document.querySelectorAll('.student-card');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        studentCards.forEach(card => {
            const studentName = card.querySelector('h3').textContent.toLowerCase();
            const studentEmail = card.querySelector('.student-email').textContent.toLowerCase();
            
            if (studentName.includes(searchTerm) || studentEmail.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Student Modal Functionality
function setupStudentModals() {
    const studentCards = document.querySelectorAll('.student-card');
    const modal = document.getElementById('student-modal');
    const modalName = document.getElementById('modal-student-name');
    const modalDetails = document.getElementById('modal-student-details');

    studentCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking on action buttons
            if (e.target.closest('.student-actions')) {
                return;
            }
            
            const studentName = card.querySelector('h3').textContent;
            const studentData = getStudentDetails(studentName);
            
            modalName.textContent = `${studentName} - Detailed Feedback`;
            modalDetails.innerHTML = generateStudentDetailsHTML(studentData);
            
            modal.classList.add('active');
        });
    });

    // Remove student functionality
    const removeButtons = document.querySelectorAll('.student-actions .remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Are you sure you want to remove this student from the course?')) {
                button.closest('.student-card').remove();
            }
        });
    });
}

// Get student details data
function getStudentDetails(studentName) {
    const studentData = {
        'Sarah Johnson': {
            email: 'sarah.johnson@example.com',
            progressNarrative: 'Sarah initially struggled with past tense forms and formal language structures, but after 23 practice sessions across different scenarios, she has overcome most pronunciation challenges and significantly improved her confidence in restaurant conversations. Her vocabulary usage has become more natural, though she still needs focused practice with irregular verbs in business contexts.',
            scenarios: [
                {
                    name: 'Ordering Food at Restaurant',
                    attempts: 15,
                    lastAttempt: '2 days ago',
                    performance: 'Excellent'
                },
                {
                    name: 'Hotel Check-in Conversation',
                    attempts: 8,
                    lastAttempt: '1 week ago',
                    performance: 'Good'
                }
            ],
            strengths: [
                'Excellent pronunciation of common words',
                'Strong vocabulary usage in context',
                'Confident in familiar conversation topics'
            ],
            weaknesses: [
                'Inconsistent use of past tense forms',
                'Struggles with irregular verbs',
                'Needs practice with formal register'
            ],
            recommendations: [
                'Focus on irregular past tense verbs in conversation practice',
                'Practice formal language patterns through role-play',
                'Increase exposure to business conversation scenarios'
            ]
        },
        'Michael Chen': {
            email: 'michael.chen@example.com',
            progressNarrative: 'Michael had significant fluency issues when he started, often taking long pauses during conversations. After 18 practice sessions, he has dramatically improved his response time and can now maintain conversations about familiar topics without hesitation. His vocabulary acquisition has been exceptional, though pronunciation of certain sounds still requires attention.',
            scenarios: [
                {
                    name: 'Ordering Food at Restaurant',
                    attempts: 12,
                    lastAttempt: '3 days ago',
                    performance: 'Good'
                },
                {
                    name: 'Hotel Check-in Conversation',
                    attempts: 6,
                    lastAttempt: '5 days ago',
                    performance: 'Fair'
                }
            ],
            strengths: [
                'Strong vocabulary acquisition',
                'Good listening comprehension',
                'Effective use of new words in context'
            ],
            weaknesses: [
                'Fluency issues with complex topics',
                'Long pauses during conversation',
                'Difficulty with pronunciation of certain sounds'
            ],
            recommendations: [
                'Implement fluency-building exercises with timed activities',
                'Practice pronunciation drills for problematic sounds',
                'Increase conversation practice on familiar topics'
            ]
        },
        'Emma Davis': {
            email: 'emma.davis@example.com',
            progressNarrative: 'Emma began with low confidence and would often hesitate before speaking. Through 8 focused practice sessions, she has built a solid foundation in basic grammar and sentence structure. Her confidence has improved noticeably, and she now initiates conversations more readily, though she still avoids complex topics and needs encouragement to use advanced structures.',
            scenarios: [
                {
                    name: 'Ordering Food at Restaurant',
                    attempts: 8,
                    lastAttempt: '1 day ago',
                    performance: 'Good'
                }
            ],
            strengths: [
                'Solid grammar foundation',
                'Good understanding of sentence structure',
                'Accurate use of basic tenses'
            ],
            weaknesses: [
                'Lacks confidence in speaking',
                'Hesitates before responding',
                'Avoids complex sentence structures'
            ],
            recommendations: [
                'Build confidence through positive reinforcement',
                'Start with shorter, structured conversations',
                'Gradually introduce more complex topics'
            ]
        }
    };
    
    return studentData[studentName] || {};
}

// Generate student details HTML
function generateStudentDetailsHTML(data) {
    if (!data.email) return '<p>No detailed information available.</p>';
    
    return `
        <div class="student-detail-section">
            <h4>Contact Information</h4>
            <p><strong>Email:</strong> ${data.email}</p>
        </div>
        
        <div class="student-detail-section">
            <h4>Progress Summary</h4>
            <div class="progress-narrative">
                <p>${data.progressNarrative}</p>
            </div>
        </div>
        
        <div class="student-detail-section">
            <h4>Scenario Practice History</h4>
            ${data.scenarios.map(scenario => `
                <div class="scenario-item">
                    <h5>${scenario.name}</h5>
                    <p><strong>Attempts:</strong> ${scenario.attempts} conversations completed</p>
                    <p><strong>Last Practice:</strong> ${scenario.lastAttempt}</p>
                    <p><strong>Performance:</strong> <span class="performance-${scenario.performance.toLowerCase()}">${scenario.performance}</span></p>
                </div>
            `).join('')}
        </div>
        
        <div class="student-detail-section">
            <h4>Strengths</h4>
            <ul class="strength-list">
                ${data.strengths.map(strength => `<li>${strength}</li>`).join('')}
            </ul>
        </div>
        
        <div class="student-detail-section">
            <h4>Areas for Improvement</h4>
            <ul class="weakness-list">
                ${data.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
            </ul>
        </div>
        
        <div class="student-detail-section">
            <h4>Recommendations</h4>
            <ul class="recommendation-list">
                ${data.recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    `;
}

// SceneLab Functionality
function setupSceneLab() {
    const startButton = document.querySelector('.start-scenelab-btn');
    const modal = document.getElementById('scenelab-modal');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');

    startButton.addEventListener('click', () => {
        modal.classList.add('active');
        chatInput.focus();
    });

    // Send message functionality
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';

        // Generate AI response
        setTimeout(() => {
            const aiResponse = generateAIResponse(message, chatMessages.children.length);
            addMessage(aiResponse, 'ai');
        }, 1000);
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Voice button (placeholder)
    const voiceButton = document.querySelector('.voice-btn');
    voiceButton.addEventListener('click', () => {
        alert('Voice input feature coming soon!');
    });
}

// Add message to chat
function addMessage(content, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatarIcon = sender === 'ai' ? 'bi-robot' : 'bi-person-circle';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="bi ${avatarIcon}"></i>
        </div>
        <div class="message-content">
            <p>${content}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Generate AI responses
function generateAIResponse(userMessage, messageCount) {
    if (messageCount === 0) {
        return `Hi! I'm Lu, your AI co-designer. Let's create an amazing language learning scenario together! To get started, I'll need five key pieces of information from you: Title, Learning Goals, Key Concepts, Constraints, and any Additional Context. What specific goal or skill should learners practice in this blueprint? For example: past tense questions, polite requests, formal register, or problem-solving language?`;
    }
    const responses = {
        'past': "Excellent choice! Past tense skills are fundamental. Are you thinking about past tense questions, storytelling in past tense, or past tense in specific contexts like describing experiences? Let's define the exact learning goals for this blueprint.",
        'polite': "Great focus! Polite language is so important. Are you targeting polite requests, formal greetings, apologizing, or complaint handling? What specific politeness skills should students master?",
        'formal': "Perfect! Formal register is crucial for professional communication. Are you focusing on business meetings, academic presentations, job interviews, or customer service interactions? What formal language skills are most important?",
        'problem': "Excellent choice! Problem-solving language is very practical. Are you thinking about complaint handling, negotiation, conflict resolution, or troubleshooting scenarios? What specific problem-solving skills should students develop?",
        'default': "That's an interesting goal! Now let's define the specific learning objectives. What exact skills or language functions should students master through this blueprint? Try to be specific about the communicative goals."
    };
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('past') || lowerMessage.includes('tense') || lowerMessage.includes('yesterday') || lowerMessage.includes('history')) {
        return responses.past;
    } else if (lowerMessage.includes('polite') || lowerMessage.includes('courtesy') || lowerMessage.includes('request') || lowerMessage.includes('please')) {
        return responses.polite;
    } else if (lowerMessage.includes('formal') || lowerMessage.includes('business') || lowerMessage.includes('professional') || lowerMessage.includes('academic')) {
        return responses.formal;
    } else if (lowerMessage.includes('problem') || lowerMessage.includes('solve') || lowerMessage.includes('complaint') || lowerMessage.includes('issue')) {
        return responses.problem;
    } else {
        return responses.default;
    }
}

// Test Blueprint Functionality
function setupTestBlueprint() {
    const testButtons = document.querySelectorAll('.test-btn');
    const testModal = document.getElementById('test-modal');
    const testTitle = document.getElementById('test-blueprint-title');
    const startTestBtn = document.querySelector('.start-test-btn');
    const previewBtn = document.querySelector('.preview-btn');

    testButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const blueprintCard = button.closest('.blueprint-card');
            const blueprintTitle = blueprintCard.querySelector('h3').textContent;
            
            testTitle.textContent = `Test: ${blueprintTitle}`;
            testModal.classList.add('active');
        });
    });

    startTestBtn.addEventListener('click', () => {
        alert('Starting test session... This would launch the conversation simulator where you can experience the blueprint as a student would.');
        testModal.classList.remove('active');
    });

    previewBtn.addEventListener('click', () => {
        alert('Opening blueprint preview... This would show you the detailed structure, learning goals, and conversation flow.');
    });

    // Remix button functionality
    const remixButtons = document.querySelectorAll('.remix-btn');
    remixButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const blueprintCard = button.closest('.blueprint-card');
            const blueprintTitle = blueprintCard.querySelector('h3').textContent;
            
            // Open SceneLab with pre-loaded data
            const scenelabModal = document.getElementById('scenelab-modal');
            const chatMessages = document.getElementById('chat-messages');
            
            // Clear existing messages
            chatMessages.innerHTML = `
                <div class="message ai-message">
                    <div class="message-avatar">
                        <i class="bi bi-robot"></i>
                    </div>
                    <div class="message-content">
                        <p>Hi! I see you want to remix "${blueprintTitle}". I have all the details loaded. What would you like to change about this blueprint? You can modify the learning goals, add new constraints, or adjust the context.</p>
                    </div>
                </div>
            `;
            
            scenelabModal.classList.add('active');
        });
    });

    // Disable/Remove button functionality
    const disableButtons = document.querySelectorAll('.disable-btn');
    const removeButtons = document.querySelectorAll('.blueprint-actions .remove-btn');

    disableButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const blueprintCard = button.closest('.blueprint-card');
            const status = blueprintCard.querySelector('.blueprint-status');
            
            if (status.textContent === 'Active') {
                status.textContent = 'Disabled';
                status.className = 'blueprint-status disabled';
                status.style.background = '#F3F3F3';
                status.style.color = '#666';
                button.innerHTML = '<i class="bi bi-play"></i> Enable';
            } else {
                status.textContent = 'Active';
                status.className = 'blueprint-status active';
                button.innerHTML = '<i class="bi bi-pause"></i> Disable';
            }
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm('Are you sure you want to remove this blueprint from the course?')) {
                button.closest('.blueprint-card').remove();
            }
        });
    });
}

// Modal Closing Functionality
function setupModalClosing() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Close button functionality
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('active');
        });
    });

    // Click outside to close
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

// Additional CSS for student details modal
const additionalStyles = `
<style>
.student-detail-section {
    margin-bottom: 2rem;
}

.student-detail-section h4 {
    color: #6619BD;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
}

.student-detail-section h5 {
    color: #1A1A1A;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
}

.scenario-item {
    background: #F8F9FA;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.scenario-item p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
}

.performance-excellent {
    color: #2E7D32;
    font-weight: 600;
}

.performance-good {
    color: #1976D2;
    font-weight: 600;
}

.performance-fair {
    color: #F57C00;
    font-weight: 600;
}

.strength-list,
.weakness-list,
.recommendation-list {
    margin: 0;
    padding-left: 1.5rem;
}

.strength-list li {
    color: #2E7D32;
    margin-bottom: 0.5rem;
}

.weakness-list li {
    color: #F57C00;
    margin-bottom: 0.5rem;
}

.recommendation-list li {
    color: #6619BD;
    margin-bottom: 0.5rem;
}
</style>
`;

// Add additional styles to head
document.head.insertAdjacentHTML('beforeend', additionalStyles);



// Add Blueprint Modal Functionality
function setupAddBlueprintModal() {
    const addBlueprintBtn = document.querySelector(".add-blueprint-btn");
    const addBlueprintModal = document.getElementById("add-blueprint-modal");
    const closeButton = addBlueprintModal.querySelector(".close-button");
    const blueprintSearchInput = document.getElementById("blueprint-search-input");
    const blueprintItems = addBlueprintModal.querySelectorAll(".blueprint-item");

    addBlueprintBtn.addEventListener("click", () => {
        addBlueprintModal.classList.add("active");
    });

    closeButton.addEventListener("click", () => {
        addBlueprintModal.classList.remove("active");
        blueprintSearchInput.value = ""; // Clear search on close
        blueprintItems.forEach(item => {
            item.style.display = "flex";
            item.classList.remove("selected");
        });
    });

    blueprintSearchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        blueprintItems.forEach(item => {
            const title = item.querySelector("h3").textContent.toLowerCase();
            const description = item.querySelector("p").textContent.toLowerCase();
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });
    });

    blueprintItems.forEach(item => {
        const selectBtn = item.querySelector(".select-blueprint-btn");
        selectBtn.addEventListener("click", () => {
            // For prototype, just show it's selected and log
            blueprintItems.forEach(bp => bp.classList.remove("selected")); // Deselect others
            item.classList.add("selected");
            alert(`Blueprint '${item.querySelector("h3").textContent}' selected! (In a real app, this would activate it)`);
            addBlueprintModal.classList.remove("active");
        });
    });
}

// Call the new setup function in initializeApp
// Make sure to add setupAddBlueprintModal() to initializeApp() function




// Blueprint Examples Functionality
function setupBlueprintExamples() {
    const blueprintCards = document.querySelectorAll('.blueprint-card');
    const examplesModal = document.getElementById('blueprint-examples-modal');
    const examplesTitle = document.getElementById('blueprint-examples-title');
    const examplesContent = document.getElementById('blueprint-examples-content');

    blueprintCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if clicking on action buttons
            if (e.target.closest('.blueprint-actions')) {
                return;
            }
            
            const blueprintId = card.getAttribute('data-blueprint');
            const blueprintTitle = card.querySelector('h3').textContent;
            const blueprintData = getBlueprintExamples(blueprintId);
            
            examplesTitle.textContent = `${blueprintTitle} - Examples`;
            examplesContent.innerHTML = generateBlueprintExamplesHTML(blueprintData);
            
            examplesModal.classList.add('active');
        });
    });
}

// Get blueprint examples data
function getBlueprintExamples(blueprintId) {
    const blueprintData = {
        'ordering-cafe': {
            title: 'Past Tense Questions & Polite Requests',
            learningGoals: 'Use past‑tense questions; practise polite requests; respond to complaints politely.',
            keyConcepts: 'Polite request forms, past‑tense WH‑questions, apologising & offering solutions.',
            constraints: 'Student must ask for a recommendation, handle a mistake in the order, and thank the server.',
            additionalContext: 'Target level A2–B1; encourage use of "would like …". Server AI offers menu prompt if learner hesitates twice.',
            examples: [
                {
                    scenario: 'Ordering Food - Restaurant',
                    description: 'Student practices ordering food at a busy restaurant, dealing with menu questions and special requests',
                    keyPhrases: ['Could I have...', 'What would you recommend?', 'I\'d like to order...', 'Excuse me, there seems to be a mistake']
                },
                {
                    scenario: 'Coffee Shop Morning Rush',
                    description: 'Student orders coffee during busy morning hours, practices polite waiting and making requests',
                    keyPhrases: ['I was wondering if...', 'Would it be possible to...', 'Thank you for your patience', 'Could you please...']
                },
                {
                    scenario: 'Café with Dietary Restrictions',
                    description: 'Student asks about ingredients and makes special dietary requests using polite language',
                    keyPhrases: ['Do you happen to know if...', 'I have a dietary restriction...', 'Would you mind checking...', 'I appreciate your help']
                }
            ]
        },
        'formal-register': {
            title: 'Formal Register & Problem-Solving Language',
            learningGoals: 'Practice formal register and problem-solving language',
            keyConcepts: 'Formal greetings, complaint handling, professional communication, solution-oriented language',
            constraints: 'Student must check in formally, handle at least one issue, and maintain professional tone throughout',
            additionalContext: 'Target level B1–B2; focus on hospitality industry language. Include booking confirmations and problem resolution.',
            examples: [
                {
                    scenario: 'Standard Hotel Check-in',
                    description: 'Student checks into hotel, confirms reservation details, and asks about amenities using formal language',
                    keyPhrases: ['I have a reservation under...', 'Could you please confirm...', 'I would appreciate if...', 'Thank you for your assistance']
                },
                {
                    scenario: 'Hotel Booking Problem',
                    description: 'Student deals with booking issues, room problems, or service complaints in a professional manner',
                    keyPhrases: ['I\'m afraid there seems to be...', 'I would like to resolve...', 'Could we find a solution...', 'I understand your position, however...']
                },
                {
                    scenario: 'Business Traveler Check-in',
                    description: 'Student handles business-related requests, meeting room bookings, and professional services',
                    keyPhrases: ['I require business facilities...', 'Could you arrange...', 'I need to confirm...', 'This is quite urgent...']
                }
            ]
        }
    };
    
    return blueprintData[blueprintId] || {};
}

// Generate blueprint examples HTML
function generateBlueprintExamplesHTML(data) {
    if (!data.title) return '<p>No examples available for this blueprint.</p>';
    
    return `
        <div class="blueprint-details-section">
            <h4>Blueprint Overview</h4>
            <div class="blueprint-overview">
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Learning Goals:</strong> ${data.learningGoals}</p>
                <p><strong>Key Concepts:</strong> ${data.keyConcepts}</p>
                <p><strong>Constraints:</strong> ${data.constraints}</p>
                <p><strong>Additional Context:</strong> ${data.additionalContext}</p>
            </div>
        </div>
        
        <div class="blueprint-details-section">
            <h4>Example Scenarios</h4>
            <div class="examples-list">
                ${data.examples.map(example => `
                    <div class="example-item">
                        <h5>${example.scenario}</h5>
                        <p class="example-description">${example.description}</p>
                        <div class="key-phrases">
                            <strong>Key Phrases:</strong>
                            <div class="phrases-list">
                                ${example.keyPhrases.map(phrase => `<span class="phrase-tag">"${phrase}"</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

