// ============================================
// GOOGLE ANALYTICS 4 CONFIGURATION
// ============================================

// TODO: Replace with your actual GA4 Measurement ID
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// ============================================
// INITIALIZE GOOGLE ANALYTICS 4
// ============================================

function initializeGA4() {
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
        'send_page_view': true,
        'anonymize_ip': true // GDPR compliance
    });

    // Make gtag available globally
    window.gtag = gtag;
}

// ============================================
// TRACK CUSTOM EVENTS
// ============================================

const Analytics = {
    // Track resource views
    trackResourceView: function (resourceTitle, resourceCategory, tier) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'view_resource', {
                'resource_title': resourceTitle,
                'resource_category': resourceCategory,
                'resource_tier': tier
            });
        }
    },

    // Track premium upgrades
    trackPremiumUpgrade: function (plan, price) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'purchase', {
                'transaction_id': 'T_' + Date.now(),
                'value': price,
                'currency': 'USD',
                'items': [{
                    'item_name': plan,
                    'item_category': 'Subscription',
                    'price': price,
                    'quantity': 1
                }]
            });
        }
    },

    // Track newsletter signups
    trackNewsletterSignup: function (email) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'generate_lead', {
                'lead_type': 'newsletter',
                'value': 1
            });
        }
    },

    // Track downloads
    trackDownload: function (fileName, fileType) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'file_download', {
                'file_name': fileName,
                'file_type': fileType,
                'link_url': window.location.href
            });
        }
    },

    // Track outbound links
    trackOutboundLink: function (url, linkText) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'outbound',
                'event_label': url,
                'link_text': linkText
            });
        }
    },

    // Track video plays
    trackVideoPlay: function (videoTitle) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'video_start', {
                'video_title': videoTitle
            });
        }
    },

    // Track search queries
    trackSearch: function (searchTerm, resultsCount) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'search', {
                'search_term': searchTerm,
                'results_count': resultsCount
            });
        }
    },

    // Track scroll depth
    trackScrollDepth: function (percentage) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
                'percent_scrolled': percentage
            });
        }
    },

    // Track CTA clicks
    trackCTAClick: function (ctaName, ctaLocation) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                'cta_name': ctaName,
                'cta_location': ctaLocation
            });
        }
    },

    // Track filter usage
    trackFilterUse: function (filterCategory) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'filter_use', {
                'filter_category': filterCategory
            });
        }
    }
};

// ============================================
// SCROLL DEPTH TRACKING
// ============================================

function initializeScrollTracking() {
    const scrollThresholds = [25, 50, 75, 100];
    const triggered = new Set();

    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );

        scrollThresholds.forEach(threshold => {
            if (scrollPercent >= threshold && !triggered.has(threshold)) {
                triggered.add(threshold);
                Analytics.trackScrollDepth(threshold);
            }
        });
    });
}

// ============================================
// OUTBOUND LINK TRACKING
// ============================================

function initializeOutboundTracking() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (href && (href.startsWith('http') || href.startsWith('//'))) {
            const currentDomain = window.location.hostname;
            const linkDomain = new URL(href, window.location.href).hostname;

            if (linkDomain !== currentDomain) {
                Analytics.trackOutboundLink(href, link.textContent.trim());
            }
        }
    });
}

// ============================================
// TIME ON PAGE TRACKING
// ============================================

function initializeTimeTracking() {
    let startTime = Date.now();
    let isActive = true;

    // Track when user leaves page
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'name': 'page_view',
                'value': timeSpent,
                'event_category': 'engagement'
            });
        }
    });

    // Detect user inactivity
    let inactivityTimer;
    const resetTimer = () => {
        clearTimeout(inactivityTimer);
        isActive = true;
        inactivityTimer = setTimeout(() => {
            isActive = false;
        }, 30000); // 30 seconds of inactivity
    };

    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetTimer, true);
    });

    resetTimer();
}

// ============================================
// INITIALIZE ALL TRACKING
// ============================================

function initializeAnalytics() {
    initializeGA4();
    initializeScrollTracking();
    initializeOutboundTracking();
    initializeTimeTracking();

    console.log('📊 Analytics initialized');
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnalytics);
} else {
    initializeAnalytics();
}

// Export Analytics object
window.Analytics = Analytics;
