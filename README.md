This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

This project follows a feature-first Next.js App Router layout:

- `public/`: Static assets (images, favicon, `robots.txt`, `sitemap.xml`, self-hosted fonts). No business logic.
- `src/app/`: App Router entry points, layouts, and route groups.
  - `layout.tsx`: Global layout wrapper (providers, theme, nav/footer, auth).
  - `page.tsx`: Route entry points.
  - `(routes)/`, `(marketing)/`, `(dashboard)/`: Route groups for organization without URL changes.
- `src/features/`: Self-contained feature modules (components, hooks, services). Avoid cross-feature imports.
- `src/components/`: Global reusable UI components and design system pieces.
- `src/hooks/`: Reusable global hooks.
- `src/lib/`: Infrastructure and integrations (API clients, config, auth helpers).
- `src/types/`: Shared TypeScript types.
- `src/styles/`: Global styling (e.g., `globals.css`).

## Shadcn UI Setup

We use shadcn/ui for layout primitives (sidebar, top bar). Initialize the CLI and add the sidebar component before running the app:

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add sidebar
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
