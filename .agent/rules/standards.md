---
name: picky-corralon-standards
description: "Core standards for Picky Corralón prototype development."
---

# Picky Corralón Development Rules

## 🎨 Design & UI
- **Aesthetics First**: Every component must look premium and professional.
- **Tailwind v4**: Use utility classes based on Tailwind v4 standards.
- **Framer Motion**: Incorporate subtle micro-animations for interactions.
- **Language**: All user-facing text must be in **Spanish (Latin America)**.

## 🏗️ Technical Stack
- **Next.js (App Router)**: Follow best practices for server/client component separation.
- **Supabase**: Use Supabase for Auth and Database persistence.
- **Prisma**: Use Prisma for type-safe database queries.
- **Zustand**: Use for global state management (e.g., Shopping Cart).

## 📦 Componentization
- Extract reusable UI components to `src/components/ui`.
- Use the `cn()` utility for conditional class merging.
- Follow the patterns in `stitch_smart_scanner_interface/` mocked wireframes.

## 🔒 Security & Data
- Implement RLS (Row Level Security) on all Supabase tables.
- Use Server Actions for data mutations when possible.
- Support both Guest and Authenticated checkout flows.
