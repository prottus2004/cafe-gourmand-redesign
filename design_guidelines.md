# Design Guidelines for Cafe Gourmand Dubai

## Design Approach
**Reference-Based with Animation Excellence**: Drawing inspiration from premium e-commerce sites (Shopify, luxury brand sites) combined with cutting-edge 3D and parallax effects from modern web showcases. The design must elevate the existing brand while maintaining ALL original fonts, sizes, and color schemes.

## Critical Constraints
- **Preserve Existing Visual Identity**: Maintain all font families, font sizes, and color combinations from the original site
- **Focus Areas for Enhancement**: Layout structure, responsiveness, spacing, 3D effects, transitions, and user experience
- **Animation Priority**: Implement sophisticated 3D effects and smooth transitions throughout inspired by provided Instagram references

## Layout System

### Spacing Framework
- Use Tailwind spacing units: 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 md:py-24 lg:py-32 for generous breathing room
- Component spacing: gap-6 md:gap-8 lg:gap-12 for grid layouts
- Container constraints: max-w-7xl for content sections

### Responsive Grid System
- Mobile (base): Single column, full-width cards
- Tablet (md:): 2-column grids for products
- Desktop (lg:): 3-4 column grids for product showcases
- Product cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Typography Hierarchy
Maintain all existing font families and sizes exactly as specified on original site. Focus on:
- Clear heading-to-body relationships using existing sizes
- Proper line-height for readability
- Strategic font-weight variations for emphasis (as per original)

## Component Library

### Hero Section
- Full-viewport hero (min-h-screen) with parallax background
- 3D layered elements with depth using transform: translateZ()
- Smooth scroll-triggered animations
- Floating CTA buttons with glass-morphism backdrop-blur effect
- Parallax scrolling speed: background (0.5x), mid-layer (0.7x), foreground (1x)

### Product Cards (Coffee Blends & Machines)
- 3D card hover effects: rotateY(10deg) with perspective(1000px)
- Smooth scale transitions on hover: scale(1.05)
- Image zoom effects within cards
- Floating "Add to Cart" button reveals on hover
- Shadow elevation changes: shadow-lg to shadow-2xl
- Card flip animations for detailed specs (front/back)

### Image Galleries
- Smooth carousel/slider with 3D carousel effect (perspective transformation)
- Thumbnail navigation with active state indicators
- Lightbox modal with smooth fade-in/scale transitions
- Lazy loading with skeleton screens

### Shopping Cart
- Floating cart icon with item count badge
- Slide-in cart drawer from right with smooth translation
- Quantity adjusters with number animations
- Smooth item add/remove transitions
- Sticky cart summary on checkout

### Navigation
- Transparent header with scroll-triggered background blur
- Smooth scroll-to-section behavior
- Mobile: Slide-in hamburger menu with staggered menu item animations
- Active section highlighting in navigation

## Animation Specifications

### 3D Effects
- Card perspective: perspective(1000px) on container
- Transform layers: translateZ(-50px) to translateZ(100px) for depth
- Preserve-3d on parent elements for nested transforms
- Smooth rotation effects: rotateX(), rotateY() on hover

### Scroll-Triggered Animations
- Fade-in + slide-up: opacity 0→1, translateY(30px)→0
- Stagger delays: each-child[0.1s, 0.2s, 0.3s]
- Parallax sections with different scroll speeds
- Reveal animations at 80% viewport intersection

### Transitions
- Base transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Hover effects: 0.2s ease-out
- Page transitions: 0.5s with fade + scale
- Micro-interactions: 0.15s for buttons, inputs

### Specific Animation Patterns
- Product cards: 3D tilt on mouse move (following cursor)
- Coffee bean floating animation in hero
- Steam/smoke particle effects (subtle)
- Ripple effects on button clicks
- Smooth number counting for statistics
- Morphing gradient backgrounds

## Section Structure

### Hero
- Full-screen parallax background with coffee imagery
- Animated headline with staggered word reveals
- 3D floating coffee elements
- Dual CTAs with glass-morphism buttons

### About Sections (Know, Care, Taste)
- Side-by-side layout: md:grid-cols-2
- Icon animations on scroll-in
- Staggered content reveals

### Products
**Coffee Blends**: 4-column grid (lg:grid-cols-4), 3D flip cards
**Commercial Machines**: 2-column grid (lg:grid-cols-2), detailed spec expandables
**Home Machines**: Full-width showcase with image carousels

### Maintenance Service
- Split layout with image + content
- Animated checkmark list reveals
- CTA with pulse animation

### Contact
- 3-column grid for contact methods
- Animated contact form with floating labels
- Map integration with smooth zoom
- Form validation with smooth error states

## Responsiveness Strategy
- Mobile-first approach with progressive enhancement
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-optimized interactions for mobile (larger tap targets)
- Simplified animations on mobile to maintain performance
- Hamburger menu with full-screen overlay on mobile
- Stackable product grids: 1→2→3→4 columns

## Images
**Hero Image**: Large, immersive coffee-related imagery (coffee beans, brewing, cafe ambiance) as background with parallax
**Product Images**: All real images from original site for each coffee blend and machine
**Gallery Images**: Multiple product angles for machines (Cadorna, Anima Class)
**Decorative**: Coffee-related graphics and icons throughout

## Performance Considerations
- CSS-based animations where possible (avoid JS overhead)
- GPU-accelerated properties: transform, opacity
- Will-change hints for animated elements
- Reduced motion media query support
- Lazy load images below fold
- Intersection Observer for scroll animations