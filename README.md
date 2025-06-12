
#ContractorHq Project
This web application is built using Next.js, TypeScript, Tailwind CSS, and MongoDB, and it fulfills the technical requirements of the Client-Side Web Development course.

The application includes features such as authentication, protected routes, dynamic content rendering, and responsive design.

1. Functional Pages
The project includes more than 10 fully functional and interconnected pages, such as:

Home – /src/app/page.tsx

Shop / Products – /src/app/shop/

Cart – /src/app/cart/

Admin Panel – /src/app/admin/

User Profile – /src/app/user/

Authentication – /src/app/auth/ (Login, Register)

Support / Contact – /src/app/support/

Search – /src/app/search/

Legal Pages – /src/app/legal/ (Privacy Policy, Terms)

Blogs – /src/app/blogs/

Brands – /src/app/brands/

404 Not Found – /src/app/not-found.tsx

2. Reusable Components
The app uses reusable components structured under:

/src/components/layout/

/src/components/ui/

/src/components/auth/

/src/components/theme/

Examples include:

Header.tsx – site navigation

Footer.tsx – global footer section

Button.tsx – flexible button with variants (primary, ghost, icon, etc.)

ProductCard.tsx – dynamic display of product data

CartToast.tsx, HeroSection.tsx, FAQ.tsx, ContactUs.tsx, etc.

All components follow best practices: TypeScript safety, variant systems, accessibility, and flexible props.

3. Authentication and Role Management
Implemented using NextAuth:

Login/Register handled in /src/app/auth/

Middleware ensures role-based access:

/user/ – accessible only to authenticated users

/admin/ – accessible only to admin users

OAuth (e.g. Google) supported

4. CRUD Functionality
Implemented for the following entities:

Products – /src/app/api/products/

Users – /src/app/api/user/

Blogs – /src/app/api/blogs/

Deals – /src/app/api/deals/

Each API route includes input validation, error handling, and uses RESTful HTTP methods with MongoDB models.

5. MongoDB Integration
MongoDB models are defined in /src/lib/models/, including:

User

Product

Order

Blog

6. Hooks and State Management
The application utilizes:

useState, useEffect – for local state

Context API – via /src/components/provider/ for global state (e.g., user session, cart)

Custom hooks – in /src/app/hooks/

7. Data Fetching (SSR, SSG, ISR)
Various strategies are used depending on the page:

SSR (Server-Side Rendering) – e.g. /shop, /search

ISR (Incremental Static Regeneration) – e.g. product pages, blogs (revalidate: 60)

SSG (Static Site Generation) – e.g. legal pages

8. Forms with Validation
Forms include:

ContactUs.tsx – /src/components/ui/

Login/Register – with validation and user feedback

Validation handled using react-hook-form + zod.

9. Tailwind CSS and Responsive Design
Styled using Tailwind CSS:

Utility-first classes

Fully responsive (mobile, tablet, desktop)

Configuration handled in postcss.config.mjs

10. Testing
Testing is done with Jest and React Testing Library:

Component tests – .test.tsx files

API route tests

11. Deployment and Documentation
Deployed on Vercel

Full documentation in README.md, including:

Project description

Installation instructions

Live demo link

Team members and roles

12. Environment Variables
.env.local used for sensitive data (e.g., MongoDB URI, NextAuth secrets)

Proper environment setup for both local and production (Vercel)

Extra Features
Dark Mode – toggle implemented in /components/theme/ThemeToggle.tsx

Real-Time Features – via WebSockets (e.g., for cart or admin panel)