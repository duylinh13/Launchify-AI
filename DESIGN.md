# Design System & UI Guidelines (VoltAgent Awesome-Design inspired)

## 1. Visual Theme & Atmosphere
- **Aesthetic**: "VIP Pro", SaaS, modern, minimal but highly polished.
- **Core Vibe**: Glassmorphism, subtle gradients, high contrast on actionable items.
- **Corners**: Rounded (xl/2xl/3xl for containers, full for buttons).

## 2. Color Palette (Semantic)
- **Primary**: Deep purple/indigo gradients (e.g., \rom-primary to-purple-600\).
- **Background**: Slate/Gray very light tint, or pure white with subtle noise.
- **Borders**: Highly subtle \order-primary/10\ or \order-border/50\.
- **Text**: \	ext-foreground\ for primary, \	ext-muted-foreground\ for secondary. Avoid absolute black.

## 3. Typography
- **Headings**: \ont-extrabold tracking-tight\.
- **Body**: \leading-relaxed\.
- **Buttons**: \ont-semibold tracking-wide\.

## 4. Component Rules
- **Buttons**: Always use icons where appropriate (\lucide-react\). Hover states must include \shadow-lg\ and slight scale or icon translation (\group-hover:translate-x-1\).
- **Cards**: Use \ackdrop-blur-md\ and \g-background/50\ to create depth. Hover states must elevate (\-translate-y-1\).
- **Forms**: Inputs must be \h-11\ with \ounded-xl\. Focus rings must use \ocus-visible:ring-primary/50\.

## 5. Layout & Spacing
- Use \gap-4\ to \gap-8\ generously. 
- Let elements breathe. Avoid dense packing of information.
- Use grid for multi-column layouts, scaling down to \lex-col\ on mobile.

