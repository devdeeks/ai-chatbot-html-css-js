class ChatBot {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        this.responses = {
            'html': "HTML is used to structure web content. It provides the backbone of web pages with elements like headings, paragraphs, links, and more!",
            'css': "CSS styles your website's design and layout. It controls colors, fonts, spacing, animations, and makes your site beautiful!",
            'javascript': "JavaScript makes your site interactive and dynamic. It handles user interactions, animations, API calls, and brings your website to life!",
            'js': "JavaScript makes your site interactive and dynamic. It handles user interactions, animations, API calls, and brings your website to life!",
            'portfolio': "You can showcase your work beautifully with animations and interactivity. A great portfolio combines design, functionality, and tells your story!",
            'hello': "Hey there! I'm your AI assistant. I'm here to help you with web development questions!",
            'hi': "Hello! Great to see you! I'm ready to help with any web development questions you have.",
            'hey': "Hey! How can I assist you with web development today?",
            'bye': "Goodbye! Have a great day coding! Feel free to come back anytime you need help!",
            'goodbye': "Goodbye! Have a great day coding! Feel free to come back anytime you need help!",
            'thanks': "You're welcome! Happy to help! Feel free to ask me anything else about web development.",
            'thank you': "You're welcome! Happy to help! Feel free to ask me anything else about web development.",
            'responsive': "Responsive design ensures your website looks great on all devices! Use CSS media queries, flexible grids, and relative units.",
            'bootstrap': "Bootstrap is a popular CSS framework that provides pre-built components and a responsive grid system. Great for rapid development!",
            'react': "React is a powerful JavaScript library for building user interfaces. It uses components and virtual DOM for efficient rendering!",
            'vue': "Vue.js is a progressive JavaScript framework that's beginner-friendly yet powerful. Great for building modern web applications!",
            'angular': "Angular is a full-featured TypeScript framework by Google. Perfect for large-scale enterprise applications!",
            'node': "Node.js lets you run JavaScript on the server side. It's great for building APIs, real-time applications, and full-stack development!",
            'api': "APIs (Application Programming Interfaces) allow different applications to communicate. RESTful APIs are popular for web development!",
            'database': "Databases store and organize your application data. Popular choices include MySQL, PostgreSQL, MongoDB, and more!",
            'git': "Git is a version control system that tracks changes in your code. Essential for collaboration and project management!",
            'github': "GitHub is a platform for hosting Git repositories. Great for showcasing projects and collaborating with others!",
            'hosting': "Web hosting services like Netlify, Vercel, and GitHub Pages let you deploy your websites for the world to see!",
            'seo': "SEO (Search Engine Optimization) helps your website rank better in search results. Use semantic HTML, meta tags, and quality content!",
            'performance': "Website performance is crucial! Optimize images, minify code, use CDNs, and lazy loading for faster sites!",
            'accessibility': "Web accessibility ensures your site is usable by everyone. Use semantic HTML, alt text, proper color contrast, and keyboard navigation!",
            'flexbox': "CSS Flexbox is perfect for one-dimensional layouts. Use display: flex to create flexible and responsive designs easily!",
            'grid': "CSS Grid is ideal for two-dimensional layouts. Create complex, responsive grid systems with ease!",
            'sass': "Sass is a CSS preprocessor that adds features like variables, nesting, and mixins. It makes CSS more maintainable!",
            'webpack': "Webpack is a module bundler that helps organize and optimize your JavaScript, CSS, and other assets!",
            'npm': "npm is the package manager for Node.js. It helps you install, manage, and share JavaScript packages easily!",
            'typescript': "TypeScript adds static typing to JavaScript, making your code more reliable and easier to debug!",
            'testing': "Testing ensures your code works correctly. Popular tools include Jest, Cypress, and Testing Library!"
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initTheme();
        this.updateTimestamps();
        
        // Update timestamps periodically
        setInterval(() => this.updateTimestamps(), 60000);
    }

    bindEvents() {
        const chatToggle = document.getElementById('chatToggle');
        const minimizeBtn = document.getElementById('minimizeBtn');
        const themeToggle = document.getElementById('themeToggle');
        const sendBtn = document.getElementById('sendBtn');
        const messageInput = document.getElementById('messageInput');

        chatToggle.addEventListener('click', () => this.toggleChat());
        minimizeBtn.addEventListener('click', () => this.toggleChat());
        themeToggle.addEventListener('click', () => this.toggleTheme());
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        messageInput.addEventListener('input', () => {
            this.updateSendButton();
        });
    }

    toggleChat() {
        const widget = document.getElementById('chatbotWidget');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            widget.classList.add('open');
            document.getElementById('messageInput').focus();
        } else {
            widget.classList.remove('open');
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', theme);
    }

    updateSendButton() {
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');
        
        sendBtn.disabled = !messageInput.value.trim() || this.isTyping;
    }

    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message || this.isTyping) return;

        // Clear input and disable send button
        messageInput.value = '';
        this.updateSendButton();

        // Add user message
        this.addMessage(message, 'user');

        // Show typing indicator
        this.showTyping();

        // Generate and show bot response after delay
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.hideTyping();
            this.addMessage(response, 'bot');
        }, Math.random() * 1000 + 800); // Random delay between 0.8-1.8s
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        const timestamp = new Date();
        
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${sender === 'bot' 
                        ? '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/>'
                        : '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/>'
                    }
                </svg>
            </div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>${text}</p>
                </div>
                <div class="message-time" data-time="${timestamp.toISOString()}">${this.formatTime(timestamp)}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTyping() {
        this.isTyping = true;
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.classList.add('show');
        
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.updateSendButton();
    }

    hideTyping() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        typingIndicator.classList.remove('show');
        
        this.updateSendButton();
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for exact keyword matches first
        for (const [keyword, response] of Object.entries(this.responses)) {
            if (lowerMessage.includes(keyword)) {
                return response;
            }
        }
        
        // Special patterns
        if (lowerMessage.includes('how') && (lowerMessage.includes('learn') || lowerMessage.includes('start'))) {
            return "Great question! Start with HTML for structure, then CSS for styling, and JavaScript for interactivity. Practice by building small projects!";
        }
        
        if (lowerMessage.includes('best') && lowerMessage.includes('practice')) {
            return "Best practices include: writing clean, semantic code, commenting your work, using version control, testing regularly, and keeping up with web standards!";
        }
        
        if (lowerMessage.includes('framework') || lowerMessage.includes('library')) {
            return "Popular frameworks include React, Vue, Angular for frontend, and Express, Django, Laravel for backend. Choose based on your project needs!";
        }
        
        if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
            return "Web development offers great career opportunities! Build a strong portfolio, contribute to open source, network with developers, and keep learning!";
        }
        
        // Default response
        return "Hmm, I'm still learning about that topic! Try asking me about HTML, CSS, JavaScript, frameworks, or other web development topics. I'm here to help!";
    }

    formatTime(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString();
    }

    updateTimestamps() {
        const timeElements = document.querySelectorAll('.message-time[data-time]');
        
        timeElements.forEach(element => {
            const timestamp = new Date(element.getAttribute('data-time'));
            if (!isNaN(timestamp.getTime())) {
                element.textContent = this.formatTime(timestamp);
            }
        });
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});

// Handle system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});
