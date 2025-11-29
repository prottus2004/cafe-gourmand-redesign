# Café Gourmand Dubai - Premium Coffee E-Commerce Platform

## Overview

Café Gourmand Dubai is a premium e-commerce website for selling specialty coffee blends and espresso machines. The platform features Italian coffee roasted in Venice, commercial and home espresso machines (primarily Gaggia brand), and maintenance services. The site emphasizes luxury branding with sophisticated 3D animations, parallax effects, and smooth transitions inspired by premium e-commerce sites.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and optimized production builds
- **Routing:** Wouter (lightweight client-side routing)
- **Styling:** Tailwind CSS with custom theming system
- **UI Components:** Radix UI primitives with shadcn/ui component library
- **Animations:** Framer Motion for 3D effects, parallax scrolling, and transitions
- **State Management:** React Context API for cart functionality
- **Data Fetching:** TanStack Query (React Query) for server state management

**Design System:**
- Custom color scheme based on café/coffee aesthetic (warm browns, neutrals)
- Support for light/dark themes via CSS variables
- Typography using Google Fonts: Lora (serif), Playfair Display (serif), Space Grotesk (sans-serif)
- Responsive grid system with mobile-first approach
- Advanced visual effects: 3D card transforms, parallax backgrounds, glass-morphism

**Component Architecture:**
- Single-page application with section-based layout (Hero, About, Products, Machines, Maintenance, Contact)
- Reusable UI components following atomic design principles
- Custom hooks for scroll animations, parallax effects, and responsive behavior
- Shopping cart implemented as a slide-out drawer

### Backend Architecture

**Technology Stack:**
- **Runtime:** Node.js with Express.js
- **Language:** TypeScript with ES modules
- **ORM:** Drizzle ORM for type-safe database operations
- **Session Management:** Cookie-based sessions for cart persistence

**API Design:**
- RESTful API endpoints under `/api` namespace
- Cart operations: GET/POST/PUT/DELETE for cart items
- Contact form submission endpoint
- Session-based cart tracking (no authentication required)

**Storage Strategy:**
- Primary: In-memory storage (MemStorage class) for development
- Production-ready: PostgreSQL schema defined via Drizzle
- Session persistence via cookie-based session IDs (7-day expiry)

**Data Models:**
- Products: Coffee blends and espresso machines with images, pricing, features
- Cart Items: Session-linked items with quantity tracking
- Contact Messages: Form submissions storage

### Build & Deployment

**Build Process:**
- Client: Vite builds React app to `dist/public`
- Server: esbuild bundles Express server to `dist/index.cjs`
- Selective dependency bundling for faster cold starts
- TypeScript compilation with strict type checking

**Development Environment:**
- Vite dev server with HMR (Hot Module Replacement)
- Middleware mode integration with Express
- Runtime error overlay for debugging
- Replit-specific plugins for cartographer and dev banner

## External Dependencies

### Core Infrastructure
- **Database:** Configured for PostgreSQL via `@neondatabase/serverless`
- **ORM:** Drizzle ORM with PostgreSQL dialect
- **Migration Tool:** drizzle-kit for schema management

### UI & Styling
- **Component Library:** Radix UI primitives (18+ components: accordion, dialog, dropdown, select, etc.)
- **Form Management:** React Hook Form with Zod resolvers for validation
- **CSS Framework:** Tailwind CSS with PostCSS/Autoprefixer
- **Icons:** Lucide React icon library
- **Animation:** Framer Motion for advanced animations
- **Utilities:** class-variance-authority, clsx, tailwind-merge

### Development Tools
- **Type Safety:** Zod for runtime validation and schema inference
- **Date Handling:** date-fns for date manipulation
- **Router:** Wouter for lightweight client-side routing

### Build & Development
- **Bundler (Client):** Vite with React plugin
- **Bundler (Server):** esbuild for production builds
- **TypeScript:** Strict mode with path aliases (@/, @shared/, @assets/)
- **Replit Integration:** Custom plugins for runtime error handling and development banners

### Session & State Management
- **Cart State:** React Context with TanStack Query for server synchronization
- **Session Storage:** Cookie-based with `cookie-parser` middleware
- **PostgreSQL Session Store:** connect-pg-simple for production sessions

### Product Data
- All product information (coffee blends, machines, pricing) is currently hardcoded in `client/src/lib/data.ts`
- Real images hosted on cafegourmandae.com CDN
- Four coffee blends ranging from AED 79-109
- Commercial and home espresso machines with detailed specifications

### Payment Integration
- **Status:** Stripe integration was proposed but user dismissed it
- **Current Implementation:** Checkout page with multiple payment method options (Credit/Debit Card, Apple Pay, Google Pay, Samsung Pay, PayPal, Bank Transfer, Cash on Delivery)
- **Note:** To enable real payment processing, user needs to set up Stripe integration or provide API keys for payment gateways
- When ready to implement real payments, use `search_integrations` tool to find Stripe connector

### Legal Pages
- Privacy Policy: Exact content from cafegourmandae.com/privacy-policy
- Terms of Service: Created for the business (original site doesn't have this page)

## Recent Changes

- Added 3D hover effects with mouse tilt to Commercial Machines and Home Machines sections
- Created Privacy Policy page with exact content from original website
- Created Terms of Service page (original site doesn't have one)
- Implemented comprehensive Checkout page with 7 payment methods
- Added CartDrawer link to Checkout page
- Updated Footer with links to Privacy Policy and Terms of Service