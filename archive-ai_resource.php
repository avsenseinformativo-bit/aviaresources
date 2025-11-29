<?php
/**
 * Archive Template for AI Resources
 * 
 * This is an OPTIONAL template file for displaying all AI resources
 * in a grid or list layout.
 * 
 * File location: /wp-content/themes/your-theme/archive-ai_resource.php
 */

get_header(); ?>

<div class="ai-resources-archive">
    
    <header class="archive-header">
        <h1 class="archive-title">AI Resources & Agents</h1>
        <p class="archive-description">
            Discover powerful AI tools, prompts, and agents to supercharge your workflow
        </p>
    </header>
    
    <!-- Category Filter -->
    <div class="archive-filters">
        <?php
        $categories = get_terms(array(
            'taxonomy' => 'resource_category',
            'hide_empty' => true,
        ));
        
        if ($categories && !is_wp_error($categories)):
        ?>
        <div class="filter-group">
            <label>Filter by Category:</label>
            <div class="filter-buttons">
                <a href="<?php echo get_post_type_archive_link('ai_resource'); ?>" 
                   class="filter-button <?php echo !is_tax() ? 'active' : ''; ?>">
                    All
                </a>
                <?php foreach ($categories as $category): ?>
                <a href="<?php echo get_term_link($category); ?>" 
                   class="filter-button <?php echo is_tax('resource_category', $category->slug) ? 'active' : ''; ?>">
                    <?php echo esc_html($category->name); ?>
                </a>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>
    </div>
    
    <!-- Resources Grid -->
    <?php if (have_posts()): ?>
    
    <div class="resources-grid">
        <?php while (have_posts()): the_post(); ?>
        
        <article class="resource-card">
            
            <!-- Thumbnail -->
            <?php if (has_post_thumbnail()): ?>
            <a href="<?php the_permalink(); ?>" class="card-thumbnail">
                <?php the_post_thumbnail('medium_large'); ?>
                
                <!-- Price Tier Badge -->
                <?php
                $tiers = get_the_terms(get_the_ID(), 'price_tier');
                if ($tiers && !is_wp_error($tiers)):
                    $tier = $tiers[0];
                ?>
                <span class="tier-badge-overlay tier-<?php echo esc_attr($tier->slug); ?>">
                    <?php echo esc_html($tier->name); ?>
                </span>
                <?php endif; ?>
            </a>
            <?php endif; ?>
            
            <div class="card-content">
                
                <!-- Categories -->
                <?php
                $categories = get_the_terms(get_the_ID(), 'resource_category');
                if ($categories && !is_wp_error($categories)):
                ?>
                <div class="card-categories">
                    <?php foreach (array_slice($categories, 0, 2) as $category): ?>
                    <span class="category-tag"><?php echo esc_html($category->name); ?></span>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
                
                <!-- Title -->
                <h2 class="card-title">
                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </h2>
                
                <!-- Excerpt -->
                <?php if (has_excerpt()): ?>
                <p class="card-excerpt">
                    <?php echo wp_trim_words(get_the_excerpt(), 20); ?>
                </p>
                <?php endif; ?>
                
                <!-- Read More -->
                <a href="<?php the_permalink(); ?>" class="card-button">
                    View Resource
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>
                
            </div>
            
        </article>
        
        <?php endwhile; ?>
    </div>
    
    <!-- Pagination -->
    <div class="archive-pagination">
        <?php
        the_posts_pagination(array(
            'mid_size' => 2,
            'prev_text' => '← Previous',
            'next_text' => 'Next →',
        ));
        ?>
    </div>
    
    <?php else: ?>
    
    <div class="no-resources">
        <p>No AI resources found. Check back soon!</p>
    </div>
    
    <?php endif; ?>
    
</div>

<style>
/* Archive Page Styles */
.ai-resources-archive {
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 20px;
}

.archive-header {
    text-align: center;
    margin-bottom: 60px;
}

.archive-title {
    font-size: 3rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 1rem;
}

.archive-description {
    font-size: 1.25rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
}

/* Filters */
.archive-filters {
    margin-bottom: 40px;
}

.filter-group label {
    display: block;
    font-weight: 600;
    color: #334155;
    margin-bottom: 12px;
}

.filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.filter-button {
    padding: 10px 20px;
    background: #f1f5f9;
    color: #475569;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.filter-button:hover,
.filter-button.active {
    background: #3b82f6;
    color: white;
}

/* Resources Grid */
.resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}

.resource-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.resource-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.card-thumbnail {
    position: relative;
    display: block;
    overflow: hidden;
    aspect-ratio: 16/9;
}

.card-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.resource-card:hover .card-thumbnail img {
    transform: scale(1.05);
}

.tier-badge-overlay {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 14px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 6px;
    backdrop-filter: blur(10px);
}

.tier-badge-overlay.tier-premium {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.tier-badge-overlay.tier-free {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.card-content {
    padding: 24px;
}

.card-categories {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
}

.category-tag {
    padding: 4px 10px;
    background: #e0f2fe;
    color: #0369a1;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 4px;
}

.card-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 12px;
}

.card-title a {
    color: #0f172a;
    text-decoration: none;
    transition: color 0.3s ease;
}

.card-title a:hover {
    color: #3b82f6;
}

.card-excerpt {
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 20px;
}

.card-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: #3b82f6;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.card-button:hover {
    background: #2563eb;
    transform: translateX(4px);
}

.card-button svg {
    width: 16px;
    height: 16px;
}

/* Pagination */
.archive-pagination {
    text-align: center;
}

.archive-pagination .nav-links {
    display: flex;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
}

.archive-pagination a,
.archive-pagination .current {
    padding: 10px 18px;
    background: #f1f5f9;
    color: #475569;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.3s ease;
}

.archive-pagination a:hover,
.archive-pagination .current {
    background: #3b82f6;
    color: white;
}

/* No Resources */
.no-resources {
    text-align: center;
    padding: 60px 20px;
    color: #64748b;
    font-size: 1.125rem;
}

/* Responsive */
@media (max-width: 768px) {
    .archive-title {
        font-size: 2rem;
    }
    
    .archive-description {
        font-size: 1rem;
    }
    
    .resources-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<?php get_footer(); ?>
