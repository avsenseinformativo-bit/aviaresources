// ============================================
// MOCK DATA FOR AI RESOURCES
// ============================================

const aiResources = [
    // FREE RESOURCES - Only 6 basic resources
    {
        id: 1,
        title: "Social Media Post Generator",
        category: "marketing",
        tier: "free",
        description: "📱 Quick social posts! Generate engaging content for Instagram, Twitter, and LinkedIn. Perfect for daily posting and maintaining consistency.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop",
        link: "resources/social-media-generator.html"
    },
    {
        id: 2,
        title: "JavaScript Debugger",
        category: "coding",
        tier: "free",
        description: "🐛 Fix bugs fast! Analyzes JavaScript errors, explains what went wrong, and suggests fixes. Great for beginners learning to code.",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
        link: "resources/javascript-debugger.html"
    },
    {
        id: 3,
        title: "Color Palette Generator",
        category: "design",
        tier: "free",
        description: "🌈 Beautiful color schemes! Creates harmonious color palettes for your projects. Includes hex codes and accessibility checks.",
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=400&fit=crop",
        link: "resources/color-palette-generator.html"
    },
    {
        id: 4,
        title: "Blog Post Outliner",
        category: "writing",
        tier: "free",
        description: "📝 Never stare at blank pages! Creates detailed blog post outlines with headers, subheaders, and key points to cover.",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop",
        link: "resources/blog-post-outliner.html"
    },
    {
        id: 5,
        title: "Excel Formula Helper",
        category: "data",
        tier: "free",
        description: "📊 Excel made easy! Explains formulas, suggests functions, and helps create complex calculations. No more formula frustration.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
        link: "resources/excel-formula-helper.html"
    },
    {
        id: 6,
        title: "Email Subject Line Creator",
        category: "marketing",
        tier: "free",
        description: "📧 Boost open rates! Creates catchy email subject lines that get clicks. Includes A/B testing suggestions and emoji recommendations.",
        image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=400&fit=crop",
        link: "resources/email-subject-creator.html"
    },

    // PREMIUM RESOURCES - 10 additional premium resources (total 16 with free)
    {
        id: 7,
        title: "ChatGPT Marketing Agent",
        category: "marketing",
        tier: "premium",
        description: "🚀 Transform your marketing in minutes! This AI agent creates complete campaigns with social posts, email sequences, and ad copy. Includes 50+ templates and video tutorials.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
        link: "resources/chatgpt-marketing-agent.html"
    },
    {
        id: 8,
        title: "SEO Content Optimizer",
        category: "marketing",
        tier: "premium",
        description: "📈 Rank #1 on Google! Advanced prompt that analyzes keywords, creates SEO-optimized content, and suggests meta tags. Perfect for bloggers and agencies.",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=400&fit=crop",
        link: "resources/seo-content-optimizer.html"
    },
    {
        id: 9,
        title: "Python Code Assistant Pro",
        category: "coding",
        tier: "premium",
        description: "💻 Your AI pair programmer! Writes clean Python code, suggests optimizations, and explains complex algorithms. Includes debugging templates and best practices.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop",
        link: "resources/python-code-assistant.html"
    },
    {
        id: 10,
        title: "React Component Generator",
        category: "coding",
        tier: "premium",
        description: "⚛️ Build React apps faster! Generates production-ready components with TypeScript, tests, and Storybook docs. Saves hours of boilerplate coding.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
        link: "resources/react-component-generator.html"
    },
    {
        id: 11,
        title: "Brand Identity Designer",
        category: "design",
        tier: "premium",
        description: "🎨 Create stunning brands! AI-powered designer that generates color palettes, typography systems, and brand guidelines. Perfect for startups and freelancers.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
        link: "resources/brand-identity-designer.html"
    },
    {
        id: 12,
        title: "UX Research Analyzer",
        category: "design",
        tier: "premium",
        description: "🔍 Understand your users deeply! Analyzes user feedback, creates personas, and suggests UX improvements. Includes interview templates and analysis frameworks.",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=400&fit=crop",
        link: "resources/ux-research-analyzer.html"
    },
    {
        id: 13,
        title: "Long-Form Content Writer",
        category: "writing",
        tier: "premium",
        description: "✍️ Write 3000+ word articles in minutes! Creates in-depth, well-researched content with proper structure, citations, and SEO optimization.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
        link: "resources/long-form-content-writer.html"
    },
    {
        id: 14,
        title: "Copywriting Genius",
        category: "writing",
        tier: "premium",
        description: "💰 Copy that converts! Master persuasive writing with frameworks like AIDA, PAS, and FAB. Includes 100+ proven templates for ads, landing pages, and emails.",
        image: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&h=400&fit=crop",
        link: "resources/copywriting-genius.html"
    },
    {
        id: 15,
        title: "Data Visualization Expert",
        category: "data",
        tier: "premium",
        description: "📊 Turn data into insights! Creates stunning charts, dashboards, and reports. Suggests best visualization types and tells compelling data stories.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
        link: "resources/data-visualization-expert.html"
    },
    {
        id: 16,
        title: "SQL Query Optimizer",
        category: "data",
        tier: "premium",
        description: "⚡ Lightning-fast queries! Analyzes and optimizes SQL queries, suggests indexes, and explains execution plans. Supports PostgreSQL, MySQL, and SQL Server.",
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop",
        link: "resources/sql-query-optimizer.html"
    },

    // PRO RESOURCES - 10 additional pro resources (total 26 with premium)
    {
        id: 17,
        title: "AI Business Consultant",
        category: "marketing",
        tier: "pro",
        description: "🎯 Your AI C-suite advisor! Provides strategic business insights, market analysis, competitor research, and growth strategies. Like having a $500/hr consultant 24/7.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
        link: "resources/ai-business-consultant.html"
    },
    {
        id: 18,
        title: "Full-Stack Code Architect",
        category: "coding",
        tier: "pro",
        description: "🏗️ Build entire applications! Designs system architecture, generates full-stack code (React + Node + DB), and creates deployment configs. Enterprise-grade quality.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
        link: "resources/full-stack-code-architect.html"
    },
    {
        id: 19,
        title: "Design System Creator",
        category: "design",
        tier: "pro",
        description: "🎭 Complete design systems! Creates comprehensive design systems with components, tokens, documentation, and Figma files. Used by Fortune 500 companies.",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop",
        link: "resources/design-system-creator.html"
    },
    {
        id: 20,
        title: "Bestseller Book Writer",
        category: "writing",
        tier: "pro",
        description: "📚 Write your bestseller! Creates complete book outlines, chapters, and manuscripts. Includes character development, plot structures, and publishing guidance.",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=400&fit=crop",
        link: "resources/bestseller-book-writer.html"
    },
    {
        id: 21,
        title: "Predictive Analytics Engine",
        category: "data",
        tier: "pro",
        description: "🔮 Predict the future with data! Advanced ML models for forecasting, trend analysis, and predictive insights. Includes Python notebooks and deployment guides.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
        link: "resources/predictive-analytics-engine.html"
    },
    {
        id: 22,
        title: "Advanced Email Marketing Suite",
        category: "marketing",
        tier: "pro",
        description: "💌 Complete email automation! Creates entire email funnels, A/B tests, segmentation strategies, and conversion optimization. Includes Mailchimp/ActiveCampaign integration.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",
        link: "resources/advanced-email-marketing-suite.html"
    },
    {
        id: 23,
        title: "DevOps Automation Expert",
        category: "coding",
        tier: "pro",
        description: "🚀 Deploy with confidence! Creates CI/CD pipelines, Docker configs, Kubernetes manifests, and infrastructure as code. Supports AWS, Azure, GCP.",
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop",
        link: "resources/devops-automation-expert.html"
    },
    {
        id: 24,
        title: "3D Design & Animation Pro",
        category: "design",
        tier: "pro",
        description: "🎬 Create stunning 3D content! Generates Blender scripts, Three.js code, and animation sequences. Perfect for product visualization and motion graphics.",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop",
        link: "resources/3d-design-animation-pro.html"
    },
    {
        id: 25,
        title: "Technical Documentation Writer",
        category: "writing",
        tier: "pro",
        description: "📖 Crystal-clear docs! Creates API documentation, user manuals, and technical guides. Includes code examples, diagrams, and interactive tutorials.",
        image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&h=400&fit=crop",
        link: "resources/technical-documentation-writer.html"
    },
    {
        id: 26,
        title: "Machine Learning Model Builder",
        category: "data",
        tier: "pro",
        description: "🤖 Build custom ML models! Creates training pipelines, model architectures, and deployment code. Supports TensorFlow, PyTorch, and scikit-learn.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        link: "resources/machine-learning-model-builder.html"
    }
];

// ============================================
// USER STATE MANAGEMENT
// ============================================

const userState = {
    isLoggedIn: false,
    isPremium: false
};

// ============================================
// RENDER RESOURCES FUNCTION
// ============================================

function renderResources(category = 'all') {
    const resourcesGrid = document.getElementById('resourcesGrid');
    if (!resourcesGrid) return;

    let filteredResources = aiResources;

    if (category !== 'all') {
        filteredResources = aiResources.filter(resource => resource.category === category);
    }

    resourcesGrid.innerHTML = filteredResources.map(resource => `
        <div class="resource-card">
            <img src="${resource.image}" alt="${resource.title}" class="resource-thumbnail">
            <div class="resource-content">
                <span class="tier-badge tier-${resource.tier}">${resource.tier.toUpperCase()}</span>
                <h3 class="resource-title">${resource.title}</h3>
                <p class="resource-description">${resource.description}</p>
                <a href="${resource.link}" class="btn-primary">View Resource</a>
            </div>
        </div>
    `).join('');
}

// ============================================
// FILTER FUNCTIONALITY
// ============================================

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter resources
            const category = btn.dataset.category;
            renderResources(category);

            // Track filter usage
            if (typeof Analytics !== 'undefined') {
                Analytics.trackFilterUse(category);
            }
        });
    });
}

// ============================================
// LOGIN SIMULATION - DESACTIVADO
// Este código viejo está desactivado porque ahora usamos auth.js
// ============================================

/*
function simulateLogin() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        userState.isLoggedIn = !userState.isLoggedIn;
        updateLoginButton();
    });
}

function updateLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) return;

    loginBtn.textContent = userState.isLoggedIn ? 'Logout' : 'Login';
}
*/

// ============================================
// PREMIUM UPGRADE FUNCTIONALITY
// ============================================

function upgradeToPremium() {
    userState.isPremium = true;
    userState.isLoggedIn = true;
    unlockPremiumContent();
    updateLoginButton();
    savePremiumAccess();

    alert('🎉 Premium access unlocked! You now have access to all premium content.');
}

function unlockPremiumContent() {
    const lockedContent = document.querySelectorAll('.air-locker-overlay');
    lockedContent.forEach(overlay => {
        overlay.style.display = 'none';
    });

    const premiumBadge = document.querySelector('.air-premium-badge');
    if (premiumBadge) {
        premiumBadge.textContent = '✓ Premium Active';
        premiumBadge.style.background = 'var(--success)';
    }
}

// ============================================
// DOWNLOAD CONFIG FILE
// ============================================

function downloadConfig(filename, content) {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// CHECK IF USER HAS PREMIUM ACCESS
// ============================================

function checkPremiumAccess() {
    // Check localStorage for premium access
    const hasPremium = localStorage.getItem('hasPremiumAccess') === 'true';

    if (hasPremium) {
        userState.isPremium = true;
        userState.isLoggedIn = true;
        unlockPremiumContent();
        updateLoginButton();
    }
}

// ============================================
// SAVE PREMIUM ACCESS TO LOCALSTORAGE
// ============================================

function savePremiumAccess() {
    if (userState.isPremium) {
        localStorage.setItem('hasPremiumAccess', 'true');
    }
}

// ============================================
// FAQ TOGGLE FUNCTIONALITY
// ============================================

function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const wasActive = faqItem.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // Open clicked item if it wasn't active
    if (!wasActive) {
        faqItem.classList.add('active');

        // Track FAQ interaction
        if (typeof Analytics !== 'undefined') {
            Analytics.trackCTAClick('FAQ Opened', button.querySelector('span').textContent);
        }
    }
}

// ============================================
// NEWSLETTER FORM HANDLING
// ============================================

function handleNewsletterSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value;

    // Basic email validation
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    // Track newsletter signup
    if (typeof Analytics !== 'undefined') {
        Analytics.trackNewsletterSignup(email);
    }

    // TODO: Replace with actual newsletter service integration (Mailchimp, ConvertKit, etc.)
    // For now, just show success message
    alert('✅ Thank you for subscribing! Check your email for confirmation.');
    emailInput.value = '';

    // In production, you would send this to your backend:
    /*
    fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        alert('✅ Thank you for subscribing!');
        emailInput.value = '';
    })
    .catch(error => {
        alert('❌ Something went wrong. Please try again.');
    });
    */
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Render resources on homepage
    renderResources();

    // Initialize filters
    initializeFilters();

    // Initialize login - DESACTIVADO (ahora se usa auth.js)
    // simulateLogin();

    // Initialize smooth scroll
    initializeSmoothScroll();

    // Check for premium access
    checkPremiumAccess();

    // Initialize scroll progress
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    console.log('🚀 AI Resources website loaded successfully!');
    console.log('💡 Tip: Click "Unlock Premium Content" to simulate premium access');
    console.log('📊 Analytics and AdSense configured');
    console.log('✨ Visual effects and animations active!');
});

// ============================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================

window.upgradeToPremium = upgradeToPremium;
window.downloadConfig = downloadConfig;
window.toggleFAQ = toggleFAQ;
window.handleNewsletterSubmit = handleNewsletterSubmit;
