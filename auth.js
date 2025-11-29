// ============================================
// AUTHENTICATION SYSTEM
// ============================================

// EmailJS Configuration
// TODO: Replace with your EmailJS credentials
const EMAILJS_CONFIG = {
    serviceId: 'service_7ws6omq',
    templateId: 'template_t0mxm9q',
    publicKey: 'KyZVEEMuPO2WZekkD'
};

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.emailJSInitialized = false;
        this.init();
    }

    init() {
        // Initialize EmailJS
        this.initEmailJS();

        // Setup event listeners
        this.setupEventListeners();

        // Check if user is already logged in
        const savedUser = localStorage.getItem('aviaUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUI();
        }

        // Check access permissions for current page
        this.checkAccess();
    }

    initEmailJS() {
        // Load EmailJS script dynamically
        if (typeof emailjs === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => {
                emailjs.init(EMAILJS_CONFIG.publicKey);
                this.emailJSInitialized = true;
                console.log('EmailJS initialized successfully');
            };
            script.onerror = () => {
                console.warn('EmailJS failed to load. Email notifications will not work.');
            };
            document.head.appendChild(script);
        } else {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            this.emailJSInitialized = true;
        }
    }

    setupEventListeners() {
        console.log('🎯 Auth System: Setting up event listeners...');

        // Payment Buttons Interception
        const paymentButtons = document.querySelectorAll('a[href*="stripe.com"]');
        paymentButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!this.currentUser) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🔒 User not logged in. Intercepting purchase.');

                    // Save intended URL to redirect after login
                    sessionStorage.setItem('pendingPurchaseUrl', btn.href);

                    this.showNotification('Please login to continue purchase', 'info');
                    this.showLoginModal();
                } else {
                    // User is logged in, let them proceed
                    const originalText = btn.innerText;
                    btn.innerText = 'Processing...';
                    btn.style.opacity = '0.7';
                    btn.style.pointerEvents = 'none';

                    // Reset after a few seconds
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.opacity = '1';
                        btn.style.pointerEvents = 'auto';
                    }, 5000);
                }
            });
        });

        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }

        // Use event delegation for all auth clicks
        document.addEventListener('click', (e) => {
            // Login Button (handle both static and dynamic)
            if (e.target.id === 'loginBtn' || e.target.closest('#loginBtn')) {
                e.preventDefault();
                e.stopPropagation();
                this.showLoginModal();
            }

            // Logout Button
            if (e.target.id === 'logoutBtn' || e.target.closest('#logoutBtn')) {
                e.preventDefault();
                this.logout();
            }

            // My Resources Button
            if (e.target.innerText === 'My Resources' || e.target.closest('a')?.innerText === 'My Resources') {
                e.preventDefault();
                const resourcesSection = document.getElementById('resources');
                if (resourcesSection) {
                    resourcesSection.scrollIntoView({ behavior: 'smooth' });
                    this.highlightOwnedResources();
                } else {
                    window.location.href = 'index.html#resources';
                }
            }

            // Settings Button
            if (e.target.innerText === 'Settings' || e.target.closest('a')?.innerText === 'Settings') {
                e.preventDefault();
                this.openSettingsModal();
            }
        });

        console.log('✅ Auth System: Event listeners configurados');
    }

    checkAccess() {
        // Only run on resource pages (check if we are in /resources/ directory)
        if (!window.location.pathname.includes('/resources/')) return;

        // Get current filename
        const pathParts = window.location.pathname.split('/');
        const currentFile = pathParts[pathParts.length - 1];

        // Ensure aiResources is available (from app.js)
        if (typeof aiResources === 'undefined') {
            console.warn('⚠️ aiResources not found. Skipping access check.');
            return;
        }

        // Find resource in database
        const resource = aiResources.find(r => r.link.includes(currentFile));

        if (!resource) {
            console.log('ℹ️ Current page is not a tracked resource.');
            return;
        }

        console.log(`🔒 Checking access for: ${resource.title} (${resource.tier})`);

        // Check permissions
        const user = this.currentUser;
        const userPlan = user ? user.plan : 'free'; // Default to free if not logged in

        let hasAccess = false;

        if (resource.tier === 'free') {
            hasAccess = true;
        } else if (resource.tier === 'premium') {
            hasAccess = (userPlan === 'premium' || userPlan === 'pro');
        } else if (resource.tier === 'pro') {
            hasAccess = (userPlan === 'pro');
        }

        if (!hasAccess) {
            console.warn('⛔ Access Denied. Redirecting to pricing...');

            // Create overlay to hide content immediately
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.background = '#030712';
            overlay.style.zIndex = '9999';
            overlay.style.display = 'flex';
            overlay.style.flexDirection = 'column';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.color = 'white';
            overlay.innerHTML = `
                <h1 style="font-size: 2rem; margin-bottom: 1rem;">🔒 Access Restricted</h1>
                <p style="margin-bottom: 2rem;">This is a <strong>${resource.tier.toUpperCase()}</strong> resource.</p>
                <p>Redirecting to pricing...</p>
            `;
            document.body.appendChild(overlay);

            // Redirect after short delay
            setTimeout(() => {
                window.location.href = '../index.html#pricing';
            }, 1500);
        } else {
            console.log('✅ Access Granted');
        }
    }

    highlightOwnedResources() {
        const user = this.currentUser;
        if (!user) return;

        const cards = document.querySelectorAll('.resource-card');
        cards.forEach(card => {
            // Simple logic: if user is premium/pro, highlight premium resources
            // In a real app, you'd check specific resource IDs
            const isPremiumResource = card.querySelector('.tier-premium');

            if (isPremiumResource && (user.plan === 'premium' || user.plan === 'pro')) {
                card.classList.add('owned');
            } else if (!isPremiumResource) {
                // Free resources are owned by everyone
                card.classList.add('owned');
            }
        });
    }

    openSettingsModal() {
        const modal = document.getElementById('settingsModal');
        if (!modal) return;

        const user = this.currentUser;
        if (!user) return;

        // Populate modal data
        document.getElementById('settingsName').innerText = user.name || 'User';
        document.getElementById('settingsEmail').innerText = user.email;
        document.getElementById('settingsAvatar').innerText = (user.name || user.email)[0].toUpperCase();

        const plan = user.plan ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1) : 'Free';
        document.getElementById('settingsPlan').innerText = plan + ' Plan';

        const statusEl = document.getElementById('settingsStatus');
        const badgeEl = document.getElementById('planBadge');
        const cancelSection = document.getElementById('cancelSubscriptionSection');

        if (user.subscriptionStatus === 'cancelling') {
            statusEl.innerText = `Cancels on ${user.accessUntil}`;
            badgeEl.innerText = 'CANCELLING';
            badgeEl.style.color = '#f59e0b';
            badgeEl.style.backgroundColor = 'rgba(245, 158, 11, 0.1)';
            badgeEl.style.borderColor = 'rgba(245, 158, 11, 0.2)';
            cancelSection.style.display = 'none';
        } else if (user.plan && user.plan !== 'free') {
            statusEl.innerText = 'Active';
            badgeEl.innerText = 'ACTIVE';
            badgeEl.style.color = '#10b981';
            badgeEl.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            badgeEl.style.borderColor = 'rgba(16, 185, 129, 0.2)';
            cancelSection.style.display = 'block';
        } else {
            statusEl.innerText = 'Active';
            badgeEl.innerText = 'FREE';
            badgeEl.style.color = '#6b7280';
            badgeEl.style.backgroundColor = 'rgba(107, 114, 128, 0.1)';
            badgeEl.style.borderColor = 'rgba(107, 114, 128, 0.2)';
            cancelSection.style.display = 'none';
        }

        modal.style.display = 'block';
    }

    logout() {
        console.log('Auth System: Logging out...');
        this.currentUser = null;
        localStorage.removeItem('aviaUser');
        localStorage.removeItem('aviaUsers'); // Optional: clear users if needed for testing, but usually we keep them. 
        // Actually, let's NOT clear all users, just the session.

        this.updateUI(); // Update UI immediately
        this.showNotification('Logged out successfully', 'success');

        // Force reload to clear any lingering state
        setTimeout(() => {
            window.location.href = window.location.href; // Force reload
        }, 500);
    }

    updateUI() {
        const navLinks = document.querySelector('.nav-links');
        const loginBtn = document.getElementById('loginBtn');
        const userMenu = document.querySelector('.user-menu');

        if (this.currentUser) {
            // User is logged in
            if (loginBtn) {
                const userMenuHTML = `
                    <div class="user-menu">
                        <button class="user-menu-btn" id="userMenuBtn">
                            <div class="user-avatar">${this.currentUser.name.charAt(0).toUpperCase()}</div>
                            <span>${this.currentUser.name}</span>
                        </button>
                        <div class="user-dropdown" id="userDropdown">
                            <div class="user-info">
                                <strong>${this.currentUser.name}</strong>
                                <small>${this.currentUser.email}</small>
                            </div>
                            <hr>
                            <a href="#" class="dropdown-item">My Resources</a>
                            <a href="#" class="dropdown-item">Settings</a>
                            <hr>
                            <a href="#" class="dropdown-item" id="logoutBtn">Logout</a>
                        </div>
                    </div>
                `;
                loginBtn.outerHTML = userMenuHTML;
                this.setupDropdownListeners();
            }
        } else {
            // User is logged out
            if (userMenu) {
                const loginBtnHTML = `<button class="btn-primary btn-small" id="loginBtn">Login</button>`;
                userMenu.outerHTML = loginBtnHTML;
                // No need to re-attach listener because we use delegation now!
            }
        }
    }

    showLoginModal() {
        console.log('🚀 showLoginModal() iniciado');

        // Create modal HTML
        const modalHTML = `
            <div class="auth-modal-overlay" id="authModalOverlay">
                <div class="auth-modal">
                    <button class="auth-modal-close" onclick="document.getElementById('authModalOverlay').remove()">
                        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 6l12 12M6 18L18 6"/>
                        </svg>
                    </button>
                    
                    <div class="auth-tabs">
                        <button class="auth-tab active" data-tab="login">Login</button>
                        <button class="auth-tab" data-tab="register">Register</button>
                    </div>

                    <!-- Login Form -->
                    <form class="auth-form active" id="loginForm">
                        <h2>Welcome Back!</h2>
                        <p class="auth-subtitle">Login to access your resources</p>
                        
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="loginEmail" required placeholder="your@email.com">
                        </div>
                        
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="loginPassword" required placeholder="••••••••">
                        </div>
                        
                        <button type="submit" class="btn-auth">Login</button>
                        
                        <p class="auth-footer">
                            Don't have an account? 
                            <a href="#" class="auth-link" data-switch="register">Register here</a>
                        </p>
                    </form>

                    <!-- Register Form -->
                    <form class="auth-form" id="registerForm">
                        <h2>Create Account</h2>
                        <p class="auth-subtitle">Join AV IA Resources today</p>
                        
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="registerName" required placeholder="John Doe">
                        </div>
                        
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="registerEmail" required placeholder="your@email.com">
                        </div>
                        
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="registerPassword" required placeholder="••••••••">
                        </div>
                        
                        <button type="submit" class="btn-auth">Create Account</button>
                        
                        <p class="auth-footer">
                            Already have an account? 
                            <a href="#" class="auth-link" data-switch="login">Login here</a>
                        </p>
                    </form>
                </div>
            </div>
        `;

        console.log('📝 HTML del modal creado');

        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        console.log('✅ Modal añadido al DOM');

        // Verificar que el modal existe
        const modalCheck = document.getElementById('authModalOverlay');
        if (modalCheck) {
            console.log('✅ Modal encontrado en el DOM');
            console.log('📏 Estilos del modal:', window.getComputedStyle(modalCheck));
            console.log('📍 Posición del modal:', modalCheck.getBoundingClientRect());
        } else {
            console.error('❌ Modal NO encontrado en el DOM!');
        }

        // Setup modal event listeners
        this.setupModalListeners();
        console.log('✅ Modal listeners configurados');
    }

    setupModalListeners() {
        // Tab switching
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Link switching
        document.querySelectorAll('.auth-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = link.dataset.switch;
                this.switchTab(tabName);
            });
        });

        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Close on overlay click
        document.getElementById('authModalOverlay').addEventListener('click', (e) => {
            if (e.target.id === 'authModalOverlay') {
                e.target.remove();
            }
        });
    }

    switchTab(tabName) {
        // Update tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.toggle('active', form.id === `${tabName}Form`);
        });
    }

    async handleLogin() {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('aviaUsers') || '[]');
        const user = users.find(u => u.email === email && u.password === btoa(password));

        if (user) {
            // Login successful
            this.currentUser = { name: user.name, email: user.email };
            localStorage.setItem('aviaUser', JSON.stringify(this.currentUser));

            this.updateUI();
            document.getElementById('authModalOverlay').remove();
            this.showNotification('👋 Welcome back, ' + user.name + '!', 'success');

            // Check for pending purchase
            const pendingUrl = sessionStorage.getItem('pendingPurchaseUrl');
            if (pendingUrl) {
                sessionStorage.removeItem('pendingPurchaseUrl');
                window.location.href = pendingUrl;
            }
        } else {
            this.showNotification('❌ Invalid email or password', 'error');
        }
    }

    async handleRegister() {
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;

        // Validation
        if (name.length < 2) {
            this.showNotification('Name must be at least 2 characters', 'error');
            return;
        }

        if (!this.isValidEmail(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (password.length < 6) {
            this.showNotification('Password must be at least 6 characters', 'error');
            return;
        }

        // Get existing users
        const users = JSON.parse(localStorage.getItem('aviaUsers') || '[]');

        // Check if email already exists
        if (users.find(u => u.email === email)) {
            this.showNotification('Email already registered', 'error');
            return;
        }

        // Create new user with basic password hashing
        const newUser = {
            name,
            email,
            password: btoa(password), // Basic encoding (NOT secure for production)
            registeredAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('aviaUsers', JSON.stringify(users));

        // Auto login
        this.currentUser = { name, email };
        localStorage.setItem('aviaUser', JSON.stringify(this.currentUser));

        // Send email notification
        await this.sendRegistrationEmail(newUser);

        this.updateUI();
        document.getElementById('authModalOverlay').remove();
        this.showNotification('🎉 Account created successfully!', 'success');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async sendRegistrationEmail(user) {
        if (!this.emailJSInitialized) {
            console.warn('EmailJS not initialized. Skipping email notification.');
            return;
        }

        // Check if credentials are configured
        if (EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID') {
            console.warn('EmailJS credentials not configured. Please update EMAILJS_CONFIG in auth.js');
            return;
        }

        try {
            const templateParams = {
                user_name: user.name,
                user_email: user.email,
                registered_at: new Date(user.registeredAt).toLocaleString('es-ES', {
                    dateStyle: 'full',
                    timeStyle: 'short'
                }),
                to_email: 'avsenseinformativo@gmail.com'
            };

            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );

            console.log('Registration email sent successfully');
        } catch (error) {
            console.error('Error sending registration email:', error);
            // Don't block registration if email fails
        }
    }

    logout() {
        console.log('Auth System: Logging out...');
        this.currentUser = null;
        localStorage.removeItem('aviaUser');
        this.showNotification('Logged out successfully', 'success');

        // Reload page to ensure clean state
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    updateUI() {
        const navLinks = document.querySelector('.nav-links');
        const loginBtn = document.getElementById('loginBtn');
        const userMenu = document.querySelector('.user-menu');

        if (this.currentUser) {
            // User is logged in
            if (loginBtn) {
                // Replace login button with user menu
                const userMenuHTML = `
                    <div class="user-menu">
                        <button class="user-menu-btn" id="userMenuBtn">
                            <div class="user-avatar">${this.currentUser.name.charAt(0).toUpperCase()}</div>
                            <span>${this.currentUser.name}</span>
                        </button>
                        <div class="user-dropdown" id="userDropdown">
                            <div class="user-info">
                                <strong>${this.currentUser.name}</strong>
                                <small>${this.currentUser.email}</small>
                            </div>
                            <hr>
                            <a href="#" class="dropdown-item">My Resources</a>
                            <a href="#" class="dropdown-item">Settings</a>
                            <hr>
                            <a href="#" class="dropdown-item" id="logoutBtn">Logout</a>
                        </div>
                    </div>
                `;
                loginBtn.outerHTML = userMenuHTML;
                this.setupDropdownListeners();
            }
        } else {
            // User is logged out
            if (userMenu) {
                // Replace user menu with login button
                const loginBtnHTML = `<button class="btn-primary btn-small" id="loginBtn">Login</button>`;
                userMenu.outerHTML = loginBtnHTML;

                // Re-attach event listener to new login button
                const newLoginBtn = document.getElementById('loginBtn');
                newLoginBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showLoginModal();
                });
            }
        }
    }

    setupDropdownListeners() {
        const userMenuBtn = document.getElementById('userMenuBtn');
        const userDropdown = document.getElementById('userDropdown');

        if (userMenuBtn && userDropdown) {
            userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('show');
            });

            document.addEventListener('click', () => {
                userDropdown.classList.remove('show');
            });
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize auth system
function initAuth() {
    console.log('Auth System: Initializing...');
    if (!window.authSystem) {
        window.authSystem = new AuthSystem();
        console.log('Auth System: Instance created');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuth);
} else {
    initAuth();
}
