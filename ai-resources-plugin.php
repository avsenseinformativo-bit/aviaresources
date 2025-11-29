<?php
/**
 * Plugin Name: AI Resources & Monetization System
 * Plugin URI: https://yoursite.com
 * Description: Complete system for AI resources with AdSense monetization and premium content locking
 * Version: 1.0.0
 * Author: Your Name
 * Author URI: https://yoursite.com
 * License: GPL v2 or later
 * Text Domain: ai-resources
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Custom Post Type: AI Resource
 */
function air_register_ai_resource_cpt() {
    $labels = array(
        'name'                  => _x('AI Resources', 'Post Type General Name', 'ai-resources'),
        'singular_name'         => _x('AI Resource', 'Post Type Singular Name', 'ai-resources'),
        'menu_name'             => __('AI Resources', 'ai-resources'),
        'name_admin_bar'        => __('AI Resource', 'ai-resources'),
        'archives'              => __('Resource Archives', 'ai-resources'),
        'attributes'            => __('Resource Attributes', 'ai-resources'),
        'parent_item_colon'     => __('Parent Resource:', 'ai-resources'),
        'all_items'             => __('All Resources', 'ai-resources'),
        'add_new_item'          => __('Add New Resource', 'ai-resources'),
        'add_new'               => __('Add New', 'ai-resources'),
        'new_item'              => __('New Resource', 'ai-resources'),
        'edit_item'             => __('Edit Resource', 'ai-resources'),
        'update_item'           => __('Update Resource', 'ai-resources'),
        'view_item'             => __('View Resource', 'ai-resources'),
        'view_items'            => __('View Resources', 'ai-resources'),
        'search_items'          => __('Search Resource', 'ai-resources'),
        'not_found'             => __('Not found', 'ai-resources'),
        'not_found_in_trash'    => __('Not found in Trash', 'ai-resources'),
    );
    
    $args = array(
        'label'                 => __('AI Resource', 'ai-resources'),
        'description'           => __('AI Tools and Resources', 'ai-resources'),
        'labels'                => $labels,
        'supports'              => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions'),
        'taxonomies'            => array('resource_category', 'price_tier'),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-admin-tools',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rewrite'               => array('slug' => 'resource'),
    );
    
    register_post_type('ai_resource', $args);
}
add_action('init', 'air_register_ai_resource_cpt', 0);

/**
 * Register Custom Taxonomies
 */
function air_register_taxonomies() {
    // Resource Category Taxonomy
    $category_labels = array(
        'name'              => _x('Resource Categories', 'taxonomy general name', 'ai-resources'),
        'singular_name'     => _x('Resource Category', 'taxonomy singular name', 'ai-resources'),
        'search_items'      => __('Search Categories', 'ai-resources'),
        'all_items'         => __('All Categories', 'ai-resources'),
        'parent_item'       => __('Parent Category', 'ai-resources'),
        'parent_item_colon' => __('Parent Category:', 'ai-resources'),
        'edit_item'         => __('Edit Category', 'ai-resources'),
        'update_item'       => __('Update Category', 'ai-resources'),
        'add_new_item'      => __('Add New Category', 'ai-resources'),
        'new_item_name'     => __('New Category Name', 'ai-resources'),
        'menu_name'         => __('Categories', 'ai-resources'),
    );
    
    register_taxonomy('resource_category', array('ai_resource'), array(
        'hierarchical'      => true,
        'labels'            => $category_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'resource-category'),
        'show_in_rest'      => true,
    ));
    
    // Price Tier Taxonomy
    $tier_labels = array(
        'name'              => _x('Price Tiers', 'taxonomy general name', 'ai-resources'),
        'singular_name'     => _x('Price Tier', 'taxonomy singular name', 'ai-resources'),
        'search_items'      => __('Search Tiers', 'ai-resources'),
        'all_items'         => __('All Tiers', 'ai-resources'),
        'edit_item'         => __('Edit Tier', 'ai-resources'),
        'update_item'       => __('Update Tier', 'ai-resources'),
        'add_new_item'      => __('Add New Tier', 'ai-resources'),
        'new_item_name'     => __('New Tier Name', 'ai-resources'),
        'menu_name'         => __('Price Tiers', 'ai-resources'),
    );
    
    register_taxonomy('price_tier', array('ai_resource'), array(
        'hierarchical'      => true,
        'labels'            => $tier_labels,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'price-tier'),
        'show_in_rest'      => true,
    ));
}
add_action('init', 'air_register_taxonomies', 0);

/**
 * Register ACF Field Groups
 * Note: This requires ACF Pro to be installed
 */
function air_register_acf_fields() {
    if (function_exists('acf_add_local_field_group')) {
        
        // GROUP 1: Public Information (Visible to all - SEO & AdSense)
        acf_add_local_field_group(array(
            'key' => 'group_public_info',
            'title' => 'Public Information (Free Content)',
            'fields' => array(
                array(
                    'key' => 'field_short_description',
                    'label' => 'Short Description',
                    'name' => 'short_description',
                    'type' => 'textarea',
                    'instructions' => 'A compelling hook for the reader (visible to everyone)',
                    'required' => 1,
                    'rows' => 4,
                ),
                array(
                    'key' => 'field_tool_link',
                    'label' => 'Tool Link',
                    'name' => 'tool_link',
                    'type' => 'url',
                    'instructions' => 'External link to the AI tool',
                    'required' => 1,
                ),
                array(
                    'key' => 'field_basic_prompt',
                    'label' => 'Basic Prompt',
                    'name' => 'basic_prompt',
                    'type' => 'textarea',
                    'instructions' => 'A simple example prompt (visible to everyone)',
                    'required' => 1,
                    'rows' => 8,
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'ai_resource',
                    ),
                ),
            ),
            'menu_order' => 0,
            'position' => 'normal',
            'style' => 'default',
        ));
        
        // GROUP 2: Premium Information (Visible only to paying users)
        acf_add_local_field_group(array(
            'key' => 'group_premium_info',
            'title' => 'Premium Content (Paid Users Only)',
            'fields' => array(
                array(
                    'key' => 'field_advanced_system_instruction',
                    'label' => 'Advanced System Instruction',
                    'name' => 'advanced_system_instruction',
                    'type' => 'textarea',
                    'instructions' => 'Complete and complex prompt (premium only)',
                    'required' => 0,
                    'rows' => 12,
                ),
                array(
                    'key' => 'field_configuration_file',
                    'label' => 'Configuration File',
                    'name' => 'configuration_file',
                    'type' => 'file',
                    'instructions' => 'JSON/YAML configuration file for download (premium only)',
                    'required' => 0,
                    'return_format' => 'array',
                    'mime_types' => 'json,yaml,yml,txt',
                ),
                array(
                    'key' => 'field_implementation_video',
                    'label' => 'Implementation Video',
                    'name' => 'implementation_video',
                    'type' => 'oembed',
                    'instructions' => 'Exclusive video tutorial (YouTube, Vimeo, etc.)',
                    'required' => 0,
                ),
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'ai_resource',
                    ),
                ),
            ),
            'menu_order' => 1,
            'position' => 'normal',
            'style' => 'default',
        ));
    }
}
add_action('acf/init', 'air_register_acf_fields');

/**
 * Main Rendering Function
 * Displays AI Resource with AdSense and Premium Content Logic
 */
function render_ai_resource_view($post_id = null) {
    // Get current post ID if not provided
    if (!$post_id) {
        $post_id = get_the_ID();
    }
    
    // Verify this is an ai_resource post
    if (get_post_type($post_id) !== 'ai_resource') {
        return '';
    }
    
    // Check if user has premium access
    $has_premium_access = current_user_can('access_premium_content') || current_user_can('administrator');
    
    // Get ACF fields
    $short_description = get_field('short_description', $post_id);
    $tool_link = get_field('tool_link', $post_id);
    $basic_prompt = get_field('basic_prompt', $post_id);
    $advanced_instruction = get_field('advanced_system_instruction', $post_id);
    $config_file = get_field('configuration_file', $post_id);
    $implementation_video = get_field('implementation_video', $post_id);
    
    // Start output buffering
    ob_start();
    ?>
    
    <div class="air-resource-container">
        
        <!-- Title -->
        <h1 class="air-resource-title"><?php echo get_the_title($post_id); ?></h1>
        
        <!-- Short Description (Always visible) -->
        <?php if ($short_description): ?>
        <div class="air-short-description">
            <?php echo wpautop(esc_html($short_description)); ?>
        </div>
        <?php endif; ?>
        
        <!-- Tool Link (Always visible) -->
        <?php if ($tool_link): ?>
        <div class="air-tool-link-container">
            <a href="<?php echo esc_url($tool_link); ?>" target="_blank" rel="noopener noreferrer" class="air-tool-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Visit Tool Website
            </a>
        </div>
        <?php endif; ?>
        
        <!-- AdSense Placeholder (Insert between description and basic prompt) -->
        <div class="ad-slot" data-ad-position="mid-content">
            <!-- Replace this comment with your AdSense code -->
            <!-- Example: 
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="XXXXXXXXXX"
                 data-ad-format="auto"></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
            -->
        </div>
        
        <!-- Basic Prompt (Always visible) -->
        <?php if ($basic_prompt): ?>
        <div class="air-content-section">
            <h2 class="air-section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>
                Basic Prompt Example
            </h2>
            <div class="air-code-block">
                <pre><code><?php echo esc_html($basic_prompt); ?></code></pre>
            </div>
        </div>
        <?php endif; ?>
        
        <!-- Premium Content Section -->
        <?php if ($has_premium_access): ?>
            
            <!-- User HAS premium access - Show full content -->
            <div class="air-premium-content air-unlocked">
                
                <?php if ($advanced_instruction): ?>
                <div class="air-content-section">
                    <h2 class="air-section-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        Advanced System Instruction
                        <span class="air-premium-badge">Premium</span>
                    </h2>
                    <div class="air-code-block air-advanced">
                        <pre><code><?php echo esc_html($advanced_instruction); ?></code></pre>
                    </div>
                </div>
                <?php endif; ?>
                
                <?php if ($config_file): ?>
                <div class="air-content-section">
                    <h2 class="air-section-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                            <polyline points="13 2 13 9 20 9"></polyline>
                        </svg>
                        Configuration File
                    </h2>
                    <a href="<?php echo esc_url($config_file['url']); ?>" download class="air-download-button">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download <?php echo esc_html($config_file['filename']); ?>
                        <span class="file-size">(<?php echo size_format($config_file['filesize']); ?>)</span>
                    </a>
                </div>
                <?php endif; ?>
                
                <?php if ($implementation_video): ?>
                <div class="air-content-section">
                    <h2 class="air-section-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Implementation Video Tutorial
                    </h2>
                    <div class="air-video-container">
                        <?php echo wp_oembed_get($implementation_video); ?>
                    </div>
                </div>
                <?php endif; ?>
                
            </div>
            
        <?php else: ?>
            
            <!-- User DOES NOT have premium access - Show content locker -->
            <div class="air-premium-content air-locked">
                
                <div class="air-content-locker">
                    <div class="air-locker-blur">
                        <div class="air-blur-content">
                            <div class="air-code-block air-advanced">
                                <pre><code>████████████████████████████████
████████████████████████████████
████████████████████████████████
████████████████████████████████</code></pre>
                            </div>
                        </div>
                    </div>
                    
                    <div class="air-locker-overlay">
                        <div class="air-locker-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        
                        <h3 class="air-locker-title">Premium Content Locked</h3>
                        
                        <p class="air-locker-description">
                            Unlock the complete Advanced System Instruction, Configuration Files, and exclusive Video Tutorial
                        </p>
                        
                        <div class="air-locker-features">
                            <div class="air-feature-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Advanced AI Prompts & System Instructions
                            </div>
                            <div class="air-feature-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Ready-to-use Configuration Files (JSON/YAML)
                            </div>
                            <div class="air-feature-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Step-by-step Implementation Video
                            </div>
                        </div>
                        
                        <div class="air-locker-pricing">
                            <span class="air-price">$4.99</span>
                            <span class="air-price-label">One-time payment</span>
                        </div>
                        
                        <a href="<?php echo esc_url(home_url('/pricing')); ?>" class="air-unlock-button">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                            </svg>
                            Unlock Premium Content
                        </a>
                        
                        <p class="air-locker-guarantee">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                            Secure payment via Stripe • Instant access
                        </p>
                    </div>
                </div>
                
            </div>
            
        <?php endif; ?>
        
    </div>
    
    <?php
    return ob_get_clean();
}

/**
 * Register Shortcode
 * Usage: [ai_resource_view] or [ai_resource_view id="123"]
 */
function air_resource_shortcode($atts) {
    $atts = shortcode_atts(array(
        'id' => get_the_ID(),
    ), $atts);
    
    return render_ai_resource_view($atts['id']);
}
add_shortcode('ai_resource_view', 'air_resource_shortcode');

/**
 * Enqueue Styles
 */
function air_enqueue_styles() {
    if (is_singular('ai_resource') || has_shortcode(get_post_field('post_content', get_the_ID()), 'ai_resource_view')) {
        wp_enqueue_style(
            'ai-resources-styles',
            plugin_dir_url(__FILE__) . 'ai-resources-styles.css',
            array(),
            '1.0.0'
        );
    }
}
add_action('wp_enqueue_scripts', 'air_enqueue_styles');

/**
 * Auto-insert content on single ai_resource posts
 */
function air_auto_insert_content($content) {
    if (is_singular('ai_resource') && is_main_query()) {
        $resource_view = render_ai_resource_view();
        return $content . $resource_view;
    }
    return $content;
}
add_filter('the_content', 'air_auto_insert_content');

/**
 * Flush rewrite rules on plugin activation
 */
function air_activation() {
    air_register_ai_resource_cpt();
    air_register_taxonomies();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'air_activation');

/**
 * Flush rewrite rules on plugin deactivation
 */
function air_deactivation() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'air_deactivation');
