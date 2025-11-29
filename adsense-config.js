// ============================================
// GOOGLE ADSENSE CONFIGURATION
// ============================================

// TODO: Replace with your actual AdSense Publisher ID
const ADSENSE_PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX';

// AdSense configuration
const adsenseConfig = {
    enabled: true,
    publisherId: ADSENSE_PUBLISHER_ID,

    // Ad slots configuration
    slots: {
        header: {
            id: 'adsense-header',
            format: 'horizontal',
            sizes: [[728, 90], [320, 50]],
            responsive: true
        },
        sidebar: {
            id: 'adsense-sidebar',
            format: 'vertical',
            sizes: [[300, 600], [300, 250]],
            sticky: true
        },
        inContent: {
            id: 'adsense-in-content',
            format: 'rectangle',
            sizes: [[336, 280], [300, 250]],
            responsive: true
        },
        footer: {
            id: 'adsense-footer',
            format: 'horizontal',
            sizes: [[728, 90], [320, 50]],
            responsive: true
        }
    },

    // Lazy loading settings for better performance
    lazyLoad: {
        enabled: true,
        marginPercent: 50, // Load ads when 50% visible
        mobileScaling: 2.0
    },

    // Auto ads settings
    autoAds: {
        enabled: false, // Set to true after testing manual placements
        pageLevel: true
    }
};

// ============================================
// ADSENSE INITIALIZATION
// ============================================

function initializeAdSense() {
    if (!adsenseConfig.enabled) {
        console.log('AdSense is disabled');
        return;
    }

    // Load AdSense script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.publisherId}`;
    script.crossOrigin = 'anonymous';

    script.onerror = () => {
        console.warn('AdSense script failed to load (AdBlocker detected?)');
    };

    document.head.appendChild(script);

    // Initialize lazy loading if enabled
    if (adsenseConfig.lazyLoad.enabled) {
        initializeLazyLoadAds();
    }
}

// ============================================
// LAZY LOAD ADS FOR PERFORMANCE
// ============================================

function initializeLazyLoadAds() {
    const adSlots = document.querySelectorAll('.adsbygoogle');

    if ('IntersectionObserver' in window) {
        const adObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.adLoaded) {
                    loadAd(entry.target);
                    entry.target.dataset.adLoaded = 'true';
                }
            });
        }, {
            rootMargin: `${adsenseConfig.lazyLoad.marginPercent}%`
        });

        adSlots.forEach(slot => adObserver.observe(slot));
    } else {
        // Fallback for browsers without IntersectionObserver
        adSlots.forEach(slot => loadAd(slot));
    }
}

// ============================================
// LOAD INDIVIDUAL AD
// ============================================

function loadAd(adElement) {
    try {
        (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
        console.error('AdSense error:', e);
    }
}

// ============================================
// CREATE AD SLOT DYNAMICALLY
// ============================================

function createAdSlot(slotConfig, container) {
    const adDiv = document.createElement('ins');
    adDiv.className = 'adsbygoogle';
    adDiv.style.display = 'block';
    adDiv.dataset.adClient = adsenseConfig.publisherId;

    if (slotConfig.format) {
        adDiv.dataset.adFormat = slotConfig.format;
    }

    if (slotConfig.responsive) {
        adDiv.dataset.fullWidthResponsive = 'true';
    }

    container.appendChild(adDiv);

    // Load ad if lazy loading is disabled
    if (!adsenseConfig.lazyLoad.enabled) {
        loadAd(adDiv);
    }
}

// ============================================
// TRACK AD PERFORMANCE
// ============================================

function trackAdPerformance() {
    // Track ad viewability and clicks
    const adSlots = document.querySelectorAll('.adsbygoogle');

    adSlots.forEach((slot, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Track ad impression
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'ad_impression', {
                            'ad_slot': index + 1,
                            'ad_position': slot.dataset.adPosition || 'unknown'
                        });
                    }
                }
            });
        }, { threshold: 0.5 });

        observer.observe(slot);
    });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdSense);
} else {
    initializeAdSense();
}

// Export for use in other scripts
window.adsenseConfig = adsenseConfig;
window.createAdSlot = createAdSlot;
