# Alubond Promo Page - Farm Minerals Style

A promotional landing page for Alubond with Farm Minerals-inspired animations and effects.

## Features Implemented

### 1. **Smooth Scrolling with Lenis**
- Momentum-based smooth scroll
- Natural easing and physics
- Optimized performance

### 2. **Mouse Hover Trail Effect**
- Particle trail that follows cursor movement
- Blue glowing particles that fade out
- Canvas-based rendering for performance

### 3. **Page Opening Animation**
- Curtain reveal effect on page load
- Logo fade-in and rise animation
- Content fade-in sequence

### 4. **Scroll-Based Animations**
- Text reveal animations (character-by-character)
- Word reveal animations (word-by-word)
- Element fade-in on scroll
- Parallax effects

### 5. **Glow Effects**
- SVG icons with radial gradient glow
- Mouse position tracking
- Hover state animations

### 6. **Dynamic Navbar**
- Fixed position with backdrop blur
- Appears/changes on scroll
- Smooth transitions

### 7. **Animated Statistics**
- Number counters that animate on scroll
- GSAP-powered smooth counting

## Components Created

### Core Components
- `SmoothScrollProvider.tsx` - Lenis smooth scroll wrapper
- `MouseTrailEffect.tsx` - Cursor particle trail
- `PageTransition.tsx` - Page opening animation
- `TextRevealAnimation.tsx` - Character and word reveals
- `GlowIcon.tsx` - Interactive glow effects
- `ScrollCanvasAnimation.tsx` - Scroll-driven canvas animations (ready for image sequences)

### Page
- `app/promo/page.tsx` - Main promotional page with all sections

## How to Run

1. Navigate to the web directory:
```bash
cd web
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Visit the promo page:
```
http://localhost:3000/promo
```

## Sections on the Promo Page

1. **Hero Section**
   - Large animated title
   - Scroll indicator
   - CTA buttons with glow effects

2. **Product Showcase**
   - Fire-rated panel categories (FR-A1, FR-A2, FR-B1, FR-B2)
   - Exotic finishes
   - Custom solutions
   - Cards with hover glow effects

3. **Global Reach**
   - Animated statistics (25M m², 90 countries, 5 facilities)
   - Manufacturing location badges
   - Counter animations on scroll

4. **Fire Safety Certifications**
   - NFPA 285
   - EN 13501
   - BS 8414
   - Animated certification cards

5. **Applications**
   - Rainscreen facades
   - Solar collectors
   - Corporate signage
   - Various finishes

6. **Call to Action**
   - Contact and download buttons
   - Footer with company info

## Customization

### Changing Colors
The design uses Tailwind classes. Primary colors are:
- Blue: `blue-400`, `blue-600`, `blue-900`
- Gray: `gray-700`, `gray-800`, `gray-900`

### Adding Canvas Scroll Animation
The `ScrollCanvasAnimation` component is ready to use with image sequences:

```tsx
<ScrollCanvasAnimation
  frameCount={100}
  getFramePath={(i) => `/frames/frame-${i.toString().padStart(4, '0')}.jpg`}
  className="h-[300vh]"
/>
```

### Adjusting Animation Timing
- Smooth scroll duration: `SmoothScrollProvider.tsx` line 11
- Text reveal stagger: Component props
- Page transition delay: `PageTransition.tsx`

## Technologies Used

- **Next.js 16** - React framework
- **Framer Motion** - React animation library
- **GSAP** - Professional animation library with ScrollTrigger
- **Lenis** - Smooth scroll library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety

## Performance Notes

- Mouse trail limited to 100 particles
- Canvas animations optimized with RAF
- Scroll triggers properly cleaned up
- Images should be lazy loaded for production

## Next Steps (Optional Enhancements)

1. Add actual product images
2. Create frame sequence for canvas scroll animation
3. Add contact form functionality
4. Implement 3D product viewer
5. Add video backgrounds
6. Create more interactive elements
7. Add loading progress indicator
8. Optimize images with Next.js Image component

## Credits

Inspired by Farm Minerals promotional page design and animations.
Content from Alubond official website.
