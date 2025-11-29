#!/usr/bin/env python3
"""
Script to generate all 26 resource pages with detailed content
"""

resources_data = {
    # FREE RESOURCES
    "social-media-generator": {
        "title": "Social Media Post Generator",
        "tier": "free",
        "emoji": "📱",
        "description": "Create engaging social media content in seconds",
        "category": "marketing"
    },
    "javascript-debugger": {
        "title": "JavaScript Debugger",
        "tier": "free",
        "emoji": "🐛",
        "description": "Fix JavaScript bugs fast with AI-powered analysis",
        "category": "coding"
    },
    "color-palette-generator": {
        "title": "Color Palette Generator",
        "tier": "free",
        "emoji": "🌈",
        "description": "Create beautiful, harmonious color schemes",
        "category": "design"
    },
    "blog-post-outliner": {
        "title": "Blog Post Outliner",
        "tier": "free",
        "emoji": "📝",
        "description": "Never face writer's block again",
        "category": "writing"
    },
    "excel-formula-helper": {
        "title": "Excel Formula Helper",
        "tier": "free",
        "emoji": "📊",
        "description": "Master Excel formulas with AI assistance",
        "category": "data"
    },
    "email-subject-creator": {
        "title": "Email Subject Line Creator",
        "tier": "free",
        "emoji": "📧",
        "description": "Boost email open rates with compelling subject lines",
        "category": "marketing"
    },
    
    # PREMIUM RESOURCES
    "chatgpt-marketing-agent": {
        "title": "ChatGPT Marketing Agent",
        "tier": "premium",
        "emoji": "🚀",
        "description": "Complete marketing campaigns in minutes",
        "category": "marketing"
    },
    "seo-content-optimizer": {
        "title": "SEO Content Optimizer",
        "tier": "premium",
        "emoji": "📈",
        "description": "Rank #1 on Google with optimized content",
        "category": "marketing"
    },
    "python-code-assistant": {
        "title": "Python Code Assistant Pro",
        "tier": "premium",
        "emoji": "💻",
        "description": "Your AI pair programmer for Python",
        "category": "coding"
    },
    "react-component-generator": {
        "title": "React Component Generator",
        "tier": "premium",
        "emoji": "⚛️",
        "description": "Build React apps faster with AI",
        "category": "coding"
    },
    "brand-identity-designer": {
        "title": "Brand Identity Designer",
        "tier": "premium",
        "emoji": "🎨",
        "description": "Create stunning brand identities",
        "category": "design"
    },
    "ux-research-analyzer": {
        "title": "UX Research Analyzer",
        "tier": "premium",
        "emoji": "🔍",
        "description": "Understand your users deeply",
        "category": "design"
    },
    "long-form-content-writer": {
        "title": "Long-Form Content Writer",
        "tier": "premium",
        "emoji": "✍️",
        "description": "Write 3000+ word articles in minutes",
        "category": "writing"
    },
    "copywriting-genius": {
        "title": "Copywriting Genius",
        "tier": "premium",
        "emoji": "💰",
        "description": "Copy that converts like magic",
        "category": "writing"
    },
    "data-visualization-expert": {
        "title": "Data Visualization Expert",
        "tier": "premium",
        "emoji": "📊",
        "description": "Turn data into compelling stories",
        "category": "data"
    },
    "sql-query-optimizer": {
        "title": "SQL Query Optimizer",
        "tier": "premium",
        "emoji": "⚡",
        "description": "Lightning-fast database queries",
        "category": "data"
    },
    
    # PRO RESOURCES
    "ai-business-consultant": {
        "title": "AI Business Consultant",
        "tier": "pro",
        "emoji": "🎯",
        "description": "Your AI C-suite advisor 24/7",
        "category": "marketing"
    },
    "fullstack-code-architect": {
        "title": "Full-Stack Code Architect",
        "tier": "pro",
        "emoji": "🏗️",
        "description": "Build entire applications with AI",
        "category": "coding"
    },
    "design-system-creator": {
        "title": "Design System Creator",
        "tier": "pro",
        "emoji": "🎭",
        "description": "Enterprise design systems made easy",
        "category": "design"
    },
    "bestseller-book-writer": {
        "title": "Bestseller Book Writer",
        "tier": "pro",
        "emoji": "📚",
        "description": "Write your bestselling book",
        "category": "writing"
    },
    "predictive-analytics-engine": {
        "title": "Predictive Analytics Engine",
        "tier": "pro",
        "emoji": "🔮",
        "description": "Predict the future with data",
        "category": "data"
    },
    "email-marketing-suite": {
        "title": "Advanced Email Marketing Suite",
        "tier": "pro",
        "emoji": "💌",
        "description": "Complete email automation system",
        "category": "marketing"
    },
    "devops-automation-expert": {
        "title": "DevOps Automation Expert",
        "tier": "pro",
        "emoji": "🚀",
        "description": "Deploy with confidence",
        "category": "coding"
    },
    "3d-design-animation": {
        "title": "3D Design & Animation Pro",
        "tier": "pro",
        "emoji": "🎬",
        "description": "Create stunning 3D content",
        "category": "design"
    },
    "technical-documentation-writer": {
        "title": "Technical Documentation Writer",
        "tier": "pro",
        "emoji": "📖",
        "description": "Crystal-clear technical docs",
        "category": "writing"
    },
    "ml-model-builder": {
        "title": "Machine Learning Model Builder",
        "tier": "pro",
        "emoji": "🤖",
        "description": "Build custom ML models",
        "category": "data"
    }
}

print(f"Total resources to generate: {len(resources_data)}")
print("Resource data structure ready for generation")
