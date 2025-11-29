# AI Resources & Monetization System - Installation Guide

## Prerequisites

Before installing this plugin, ensure you have:

1. **WordPress 5.0 or higher**
2. **PHP 7.4 or higher**
3. **Advanced Custom Fields (ACF) Pro** - [Purchase here](https://www.advancedcustomfields.com/pro/)
4. **A payment/membership plugin** (recommended options):
   - [Paid Memberships Pro](https://wordpress.org/plugins/paid-memberships-pro/)
   - [MemberPress](https://memberpress.com/)
   - [WooCommerce Memberships](https://woocommerce.com/products/woocommerce-memberships/)

---

## Installation Steps

### Step 1: Install ACF Pro

1. Purchase and download ACF Pro from [advancedcustomfields.com](https://www.advancedcustomfields.com/pro/)
2. Go to **WordPress Admin → Plugins → Add New → Upload Plugin**
3. Upload the ACF Pro zip file
4. Click **Install Now** and then **Activate**

### Step 2: Install the AI Resources Plugin

#### Option A: Manual Installation (Recommended)

1. Create a new folder in your WordPress plugins directory:
   ```
   /wp-content/plugins/ai-resources-monetization/
   ```

2. Upload both files to this folder:
   - `ai-resources-plugin.php`
   - `ai-resources-styles.css`

3. Go to **WordPress Admin → Plugins**
4. Find **AI Resources & Monetization System**
5. Click **Activate**

#### Option B: ZIP Installation

1. Create a folder named `ai-resources-monetization`
2. Place both files inside
3. Zip the folder
4. Go to **WordPress Admin → Plugins → Add New → Upload Plugin**
5. Upload the zip file and activate

### Step 3: Configure Permalinks

1. Go to **Settings → Permalinks**
2. Select **Post name** or **Custom Structure**
3. Click **Save Changes**

This ensures your AI resources will have clean URLs like: `yoursite.com/resource/chatgpt-marketing-agent`

---

## Configuration

### Step 4: Create Default Taxonomies

1. Go to **AI Resources → Categories**
2. Add your resource categories (examples):
   - Marketing
   - Coding
   - Design
   - Writing
   - Data Analysis

3. Go to **AI Resources → Price Tiers**
4. Add pricing tiers:
   - Free
   - Premium

### Step 5: Set Up Payment Integration

#### Using Paid Memberships Pro (Recommended)

1. Install and activate **Paid Memberships Pro**
2. Install the **Stripe Payment Gateway** add-on
3. Go to **Memberships → Settings → Payment Gateway**
4. Configure your Stripe API keys

5. Create a membership level:
   - **Name**: Premium Access
   - **Price**: $4.99 (one-time) or $9.99/month
   - Go to **Advanced Settings**
   - Add custom capability: `access_premium_content`

6. Save the membership level

#### Using MemberPress

1. Install and activate **MemberPress**
2. Go to **MemberPress → Settings → Payments**
3. Enable Stripe and add your API keys

4. Create a membership:
   - **Title**: Premium Access
   - **Price**: $4.99 or $9.99
   - **Type**: One-time or Recurring
   
5. Go to **MemberPress → Settings → Advanced**
6. Add custom capability: `access_premium_content`

### Step 6: Configure AdSense

1. Get your AdSense code from [Google AdSense](https://www.google.com/adsense/)

2. Edit `ai-resources-plugin.php` (around line 280)

3. Replace the comment with your actual AdSense code:

```php
<div class="ad-slot" data-ad-position="mid-content">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="XXXXXXXXXX"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>
```

4. Add the AdSense script to your theme's header (or use a plugin like **Ad Inserter**)

---

## Creating Your First AI Resource

### Step 7: Add a New Resource

1. Go to **AI Resources → Add New**

2. Fill in the basic WordPress fields:
   - **Title**: e.g., "ChatGPT Marketing Agent"
   - **Content**: Main description (optional, as we use ACF fields)
   - **Featured Image**: Upload an attractive thumbnail
   - **Excerpt**: Short teaser text

3. Select taxonomies:
   - **Category**: Marketing
   - **Price Tier**: Premium

4. Fill in **Public Information** (visible to everyone):
   - **Short Description**: "Transform your marketing with this AI-powered agent that creates campaigns in minutes"
   - **Tool Link**: `https://chat.openai.com`
   - **Basic Prompt**: 
     ```
     You are a marketing assistant. Help me create a social media campaign for [product].
     ```

5. Fill in **Premium Content** (visible only to paying users):
   - **Advanced System Instruction**: Your complete, detailed prompt
   - **Configuration File**: Upload JSON/YAML file
   - **Implementation Video**: Paste YouTube/Vimeo URL

6. Click **Publish**

---

## Display Options

### Option 1: Automatic Display (Default)

The plugin automatically displays the resource view on single `ai_resource` posts. Just visit:
```
yoursite.com/resource/your-resource-slug
```

### Option 2: Using Shortcode

Add the shortcode anywhere:

```
[ai_resource_view]
```

Or specify a particular resource:

```
[ai_resource_view id="123"]
```

### Option 3: Template Tag (for theme developers)

In your theme template files:

```php
<?php
if (function_exists('render_ai_resource_view')) {
    echo render_ai_resource_view();
}
?>
```

---

## Customization

### Changing the Unlock Price Display

Edit `ai-resources-plugin.php` around line 350:

```php
<span class="air-price">$4.99</span>
```

Change to your actual price.

### Changing the Pricing Page Link

Edit line 380:

```php
<a href="<?php echo esc_url(home_url('/pricing')); ?>" class="air-unlock-button">
```

Change `/pricing` to your actual pricing/checkout page URL.

### Styling Customization

Edit `ai-resources-styles.css` to match your brand:

- **Primary Color**: Search for `#3b82f6` and replace
- **Gradient Colors**: Modify the `linear-gradient()` values
- **Fonts**: Change the `font-family` declarations
- **Spacing**: Adjust padding and margin values

---

## Testing

### Test as a Free User

1. Open your resource in an incognito/private browser window
2. Verify you see:
   - ✅ Title, short description, tool link
   - ✅ AdSense ad placeholder
   - ✅ Basic prompt
   - ✅ Content locker with blur effect
   - ❌ Premium content (should be locked)

### Test as a Premium User

1. Create a test user account
2. Manually grant the `access_premium_content` capability:
   - Install **User Role Editor** plugin
   - Edit the user
   - Add capability: `access_premium_content`

3. Log in as this user and verify you see:
   - ✅ All public content
   - ✅ Advanced system instruction
   - ✅ Configuration file download
   - ✅ Implementation video
   - ❌ Content locker (should not appear)

---

## Troubleshooting

### ACF Fields Not Showing

**Solution**: Make sure ACF Pro is activated. Go to **Plugins** and verify.

### 404 Error on Resources

**Solution**: Go to **Settings → Permalinks** and click **Save Changes** to flush rewrite rules.

### CSS Not Loading

**Solution**: 
1. Verify `ai-resources-styles.css` is in the same folder as `ai-resources-plugin.php`
2. Clear your browser cache
3. Clear WordPress cache (if using a caching plugin)

### Premium Content Visible to Everyone

**Solution**: Check that your payment plugin is correctly assigning the `access_premium_content` capability to paying users.

### AdSense Not Showing

**Solution**:
1. Verify you've replaced the placeholder with actual AdSense code
2. Check AdSense account is approved
3. Wait 24-48 hours for ads to start showing

---

## Performance Optimization

### Recommended Plugins

1. **WP Rocket** or **W3 Total Cache** - Caching
2. **Smush** or **ShortPixel** - Image optimization
3. **Autoptimize** - CSS/JS minification

### Core Web Vitals

The plugin is optimized for Core Web Vitals:
- ✅ Minimal CSS (no external dependencies)
- ✅ No JavaScript required
- ✅ Lazy-loaded videos (via WordPress oEmbed)
- ✅ Optimized images (use WebP format)

---

## Security Best Practices

1. **Keep WordPress Updated**: Always use the latest version
2. **Use Strong Passwords**: For admin and database
3. **SSL Certificate**: Use HTTPS (required for Stripe)
4. **Backup Regularly**: Use **UpdraftPlus** or similar
5. **Limit Login Attempts**: Use **Wordfence** or **Limit Login Attempts**

---

## Support & Updates

### Getting Help

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review WordPress error logs: `/wp-content/debug.log`
3. Check browser console for JavaScript errors
4. Verify PHP error logs

### Updating the Plugin

When updating:

1. **Backup your site first**
2. Replace the plugin files
3. Go to **Settings → Permalinks** and save
4. Clear all caches
5. Test thoroughly

---

## Next Steps

1. ✅ Create 5-10 AI resources to populate your site
2. ✅ Set up Google Analytics to track conversions
3. ✅ Create a compelling pricing/sales page
4. ✅ Add testimonials and social proof
5. ✅ Promote your resources on social media
6. ✅ Build an email list for marketing

---

## Additional Resources

- [ACF Pro Documentation](https://www.advancedcustomfields.com/resources/)
- [Paid Memberships Pro Docs](https://www.paidmembershipspro.com/documentation/)
- [Stripe Integration Guide](https://stripe.com/docs)
- [Google AdSense Help](https://support.google.com/adsense/)

---

## License

This plugin is released under GPL v2 or later.

---

**Questions?** Feel free to modify and customize this plugin to fit your specific needs!
