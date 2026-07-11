# Changelog

All notable changes to the Monkey's Paw Generator will be documented in this file.

## [1.0.0] - 2026-07-11

### Added
- **Core AI Engine**: Integration with Gemini API to generate darkly ironic short stories based on user wishes.
- **Secure API Layer**: Server-side Route Handlers to protect API keys and system prompts.
- **Internationalization (i18n)**: Full support for English and Portuguese using `next-intl` and locale-based routing.
- **Rate Limiting**: Distributed rate limiting (5 wishes/hour/IP) implemented via Upstash Redis.
- **Thematic UI**: Dark, atmospheric design using Tailwind CSS, featuring a crimson and charcoal palette.
- **Typography**: Implementation of `Pirata One` for headings and `Crimson Text` for story content.
- **Ritual Loading**: An immersive loading sequence with pulsing auras and ominous messages.
- **"Share Your Fate" Feature**: 
    - Ability to save stories to Redis with unique IDs.
    - Unique shareable URLs (`/[locale]/share/[id]`).
    - Integration with Web Share API for mobile devices and clipboard fallback for desktop.
- **Ephemeral Content**: Shared stories automatically vanish after 24 hours.
- **Analytics**: Integrated Vercel Analytics for usage tracking.
- **Infrastructure**: Optimized Next.js 16 build with Turbopack and custom TS aliases.

### Fixed
- Corrected `tsconfig.json` paths to resolve module import issues with `@/` aliases.
- Fixed relative import paths in the sharing dynamic route.

### Changed
- Refactored routing middleware to `proxy.ts` to align with Next.js 16 conventions.
- Moved form logic to a Client Component (`WishForm.tsx`) to optimize SSR and translation performance.
