---
inclusion: fileMatch
fileMatchPattern: "**/*.tsx,**/*.jsx,**/tailwind*,**/globals.css,**/*.css"
---

# Tailwind CSS Patterns (v4)

Modern utility-first CSS with CSS-native configuration.

## v4 Key Changes
| v3 (Legacy) | v4 (Current) |
|-------------|--------------|
| `tailwind.config.js` | CSS-based `@theme` directive |
| PostCSS plugin | Oxide engine (10x faster) |
| Plugin system | CSS-native features |

## CSS-Based Configuration
```css
@theme {
  --color-primary: oklch(0.7 0.15 250);
  --color-surface: oklch(0.98 0 0);
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

## Container Queries (v4 Native)
- Viewport breakpoints: `md:`, `lg:` — page-level layouts
- Container queries: `@sm:`, `@md:` — component-level responsive
- Use container queries for reusable components

## Responsive Design (Mobile-First)
1. Write mobile styles first (no prefix)
2. Add larger screen overrides: `w-full md:w-1/2 lg:w-1/3`

## Dark Mode
```
bg-white dark:bg-zinc-900
text-zinc-900 dark:text-zinc-100
border-zinc-200 dark:border-zinc-700
```

## Layout Patterns
| Pattern | Classes |
|---------|---------|
| Center | `flex items-center justify-center` |
| Stack | `flex flex-col gap-4` |
| Row | `flex gap-4` |
| Space between | `flex justify-between items-center` |
| Auto-fit grid | `grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]` |

## Anti-Patterns
| Don't | Do |
|-------|-----|
| Arbitrary values everywhere | Use design system scale |
| `!important` | Fix specificity properly |
| Duplicate long class lists | Extract component |
| Mix v3 config with v4 | Migrate fully to CSS-first |
| Use `@apply` heavily | Prefer components |
