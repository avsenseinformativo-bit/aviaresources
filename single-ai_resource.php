<?php
/**
 * Single AI Resource Template Example
 * 
 * This is an OPTIONAL template file you can add to your theme
 * to have more control over the layout of individual AI resources.
 * 
 * File location: /wp-content/themes/your-theme/single-ai_resource.php
 * 
 * If you don't create this file, WordPress will use the default
 * single.php template, and the plugin will still work fine.
 */

get_header(); ?>

<div class="ai-resource-page-wrapper">
    
    <?php while (have_posts()) : the_post(); ?>
        
        <article id="post-<?php the_ID(); ?>" <?php post_class('ai-resource-article'); ?>>
            
            <!-- Breadcrumbs (optional) -->
            <div class="ai-breadcrumbs">
                <a href="<?php echo home_url(); ?>">Home</a>
                <span class="separator">/</span>
                <a href="<?php echo get_post_type_archive_link('ai_resource'); ?>">AI Resources</a>
                <span class="separator">/</span>
                <span class="current"><?php the_title(); ?></span>
            </div>
            
            <!-- Featured Image (optional) -->
            <?php if (has_post_thumbnail()): ?>
            <div class="ai-resource-featured-image">
                <?php the_post_thumbnail('large'); ?>
            </div>
            <?php endif; ?>
            
            <!-- Categories and Tags -->
            <div class="ai-resource-meta">
                <?php
                $categories = get_the_terms(get_the_ID(), 'resource_category');
                if ($categories && !is_wp_error($categories)):
                ?>
                <div class="ai-resource-categories">
                    <?php foreach ($categories as $category): ?>
                        <a href="<?php echo get_term_link($category); ?>" class="category-badge">
                            <?php echo esc_html($category->name); ?>
                        </a>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
                
                <?php
                $tiers = get_the_terms(get_the_ID(), 'price_tier');
                if ($tiers && !is_wp_error($tiers)):
                ?>
                <div class="ai-resource-tiers">
                    <?php foreach ($tiers as $tier): ?>
                        <span class="tier-badge tier-<?php echo esc_attr($tier->slug); ?>">
                            <?php echo esc_html($tier->name); ?>
                        </span>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
            </div>
            
            <!-- Main Content (rendered by the plugin) -->
            <div class="ai-resource-content">
                <?php
                // The plugin automatically inserts the resource view
                // via the 'the_content' filter
                the_content();
                ?>
            </div>
            
            <!-- Share Buttons (optional) -->
            <div class="ai-resource-share">
                <h3>Share this resource:</h3>
                <div class="share-buttons">
                    <a href="https://twitter.com/intent/tweet?url=<?php echo urlencode(get_permalink()); ?>&text=<?php echo urlencode(get_the_title()); ?>" 
                       target="_blank" 
                       class="share-button twitter">
                        Twitter
                    </a>
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=<?php echo urlencode(get_permalink()); ?>" 
                       target="_blank" 
                       class="share-button linkedin">
                        LinkedIn
                    </a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode(get_permalink()); ?>" 
                       target="_blank" 
                       class="share-button facebook">
                        Facebook
                    </a>
                </div>
            </div>
            
            <!-- Related Resources (optional) -->
            <?php
            $categories = get_the_terms(get_the_ID(), 'resource_category');
            if ($categories && !is_wp_error($categories)):
                $category_ids = wp_list_pluck($categories, 'term_id');
                
                $related_args = array(
                    'post_type' => 'ai_resource',
                    'posts_per_page' => 3,
                    'post__not_in' => array(get_the_ID()),
                    'tax_query' => array(
                        array(
                            'taxonomy' => 'resource_category',
                            'field' => 'term_id',
                            'terms' => $category_ids,
                        ),
                    ),
                );
                
                $related_query = new WP_Query($related_args);
                
                if ($related_query->have_posts()):
            ?>
            <div class="ai-related-resources">
                <h3>Related AI Resources</h3>
                <div class="related-grid">
                    <?php while ($related_query->have_posts()): $related_query->the_post(); ?>
                    <div class="related-item">
                        <?php if (has_post_thumbnail()): ?>
                        <a href="<?php the_permalink(); ?>" class="related-thumbnail">
                            <?php the_post_thumbnail('medium'); ?>
                        </a>
                        <?php endif; ?>
                        <h4><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                        <?php if (has_excerpt()): ?>
                        <p><?php echo wp_trim_words(get_the_excerpt(), 15); ?></p>
                        <?php endif; ?>
                    </div>
                    <?php endwhile; ?>
                </div>
            </div>
            <?php
                wp_reset_postdata();
                endif;
            endif;
            ?>
            
        </article>
        
    <?php endwhile; ?>
    
</div>

<?php get_footer(); ?>
