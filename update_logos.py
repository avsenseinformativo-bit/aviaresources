#!/usr/bin/env python3
import re
import glob

# Pattern to match SVG logo in blog files
svg_pattern = r'<svg width="32" height="32"[^>]*>.*?</svg>\s*<defs>.*?</defs>\s*</svg>'
replacement = '<img src="../logo.png" alt="AV IA Resources" style="height: 40px; width: auto;">'

# Update all blog files
blog_files = glob.glob('/Users/alexvenelin/Desktop/adsensepag2/resources/*.html')

for filepath in blog_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace SVG with image
    content = re.sub(svg_pattern, replacement, content, flags=re.DOTALL)
    
    # Also handle simpler SVG pattern
    simple_svg = r'<svg[^>]*>.*?</svg>'
    if '<img src="../logo.png"' not in content:
        # Find and replace SVG in logo section
        logo_section = r'(<a href="../index.html" class="logo">)\s*<svg[^>]*>.*?</svg>(\s*</a>)'
        content = re.sub(logo_section, r'\1\n                    <img src="../logo.png" alt="AV IA Resources" style="height: 40px; width: auto;">\n                \2', content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated {len(blog_files)} blog files")
