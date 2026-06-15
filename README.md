# Todoist Clone

A full-stack Todoist-inspired task manager built with Next.js 16, Neon Postgres, and Neon Auth.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

## How this was built

This project was **vibe coded** using [Claude Code](https://claude.ai/code) in approximately **11 minutes**, as part of [Brian Holt's MCP course on Frontend Masters](https://mcp.holt.courses).

**Vibe Coding** is a development style where you describe what you want in plain language and let an AI agent write, run, and iterate on the code — you steer the direction while the AI handles the implementation details.

**MCP (Model Context Protocol)** is an open standard that lets AI agents connect to external tools and data sources. Instead of copy-pasting context into a chat window, MCP servers expose structured capabilities (read a file, run a query, open a browser) that the AI can call directly during a task.

Four MCP servers powered this build:

| MCP Server | Role |
|------------|------|
| **GitHub** | Created the repo, managed commits and branches |
| **Neon** | Provisioned the Postgres database and Neon Auth project |
| **Playwright** | Ran end-to-end browser tests to verify the app worked |
| **Context7** | Pulled up-to-date docs for Next.js, Drizzle, shadcn/ui, and other libraries |

## Features

- **Multi-user authentication** — Sign up, sign in, sign out via Neon Auth (Better Auth)
- **Todo management** — Create, read, update, delete tasks with optional descriptions
- **Mark complete** — Toggle tasks between active and completed
- **Tags** — Create, edit, and delete colour-coded tags; apply multiple tags per task
- **Tag filtering** — Click any tag in the sidebar to filter your task list
- **Per-user isolation** — Each user only sees their own tasks and tags

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Server Actions) |
| Language | TypeScript |
| UI | [shadcn/ui](https://ui.shadcn.com/) + Tailwind CSS v4 |
| Database | [Neon Postgres](https://neon.tech/) (serverless) |
| Auth | [Neon Auth](https://neon.tech/docs/guides/neon-auth) (Better Auth) |
| ORM | [Drizzle ORM](https://orm.drizzle.team/) |
| Testing (unit) | [Vitest](https://vitest.dev/) + Testing Library |
| Testing (E2E) | [Playwright](https://playwright.dev/) |
| Linting | ESLint + Prettier |
| Formatting | EditorConfig + Prettier |

## Getting Started

### Prerequisites

- Node.js 20+
- A [Neon](https://console.neon.tech/) account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/todoist-clone.git
cd todoist-clone
npm install
```

### 2. Create a Neon project

1. Go to [console.neon.tech](https://console.neon.tech/) and create a new project.
2. Copy the connection string — you'll need it for `DATABASE_URL`.

### 3. Enable Neon Auth

In your Neon project dashboard, navigate to **Auth** and enable it. Copy the **Auth URL** for `NEON_AUTH_BASE_URL`.

### 4. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

NEON_AUTH_BASE_URL=https://ep-xxx.neonauth.region.aws.neon.tech/dbname/auth
NEXT_PUBLIC_NEON_AUTH_URL=https://ep-xxx.neonauth.region.aws.neon.tech/dbname/auth
NEON_AUTH_COOKIE_SECRET=your-random-32-plus-char-secret

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Generate a secure cookie secret:
```bash
openssl rand -hex 32
```

### 5. Push the database schema

```bash
npm run db:push
```

### 6. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Database Schema

```
todos        — id, userId, title, description, completed, createdAt, updatedAt
tags         — id, userId, name, color, createdAt
todo_tags    — todoId (FK→todos), tagId (FK→tags)   [junction table]
```

Migrations are managed exclusively by Drizzle Kit — never edit them by hand.

```bash
npm run db:generate   # generate a new migration from schema changes
npm run db:push       # push schema directly (dev / prototyping)
npm run db:migrate    # apply pending migrations
npm run db:studio     # open Drizzle Studio UI
```

## Running Tests

```bash
# Unit tests (Vitest)
npm test

# Unit tests in watch mode
npm run test:watch

# E2E tests (Playwright) — requires the dev server running
npm run test:e2e

# Lint
npm run lint

# Format check
npm run format:check
```

For E2E tests that exercise the authenticated dashboard, provide credentials:

```bash
TEST_USER_EMAIL=test@example.com TEST_USER_PASSWORD=password npm run test:e2e
```

## Deployment (Vercel)

1. Push to GitHub.
2. Import the repository in [vercel.com](https://vercel.com/).
3. Add the following **Environment Variables** in the Vercel dashboard:

   | Variable | Value |
   |----------|-------|
   | `DATABASE_URL` | Your Neon connection string |
   | `NEON_AUTH_BASE_URL` | Your Neon Auth URL |
   | `NEXT_PUBLIC_NEON_AUTH_URL` | Same as above |
   | `NEON_AUTH_COOKIE_SECRET` | 32+ char random secret |

4. Deploy — Vercel auto-detects Next.js, no extra configuration needed.

> **Neon Auth trusted origins** — after deploying, add your Vercel production URL as a trusted origin in the Neon Auth settings so OAuth redirects work correctly.

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # sign-in and sign-up pages
│   ├── (dashboard)/     # protected pages (/ and /tags)
│   └── api/auth/        # Neon Auth route handler
├── actions/             # Server Actions (todos, tags, auth)
├── components/
│   ├── auth/            # Sign-in / sign-up forms
│   ├── layout/          # Sidebar and Header
│   ├── todos/           # Todo list, item, create/edit dialogs
│   ├── tags/            # Tag list, item, create/edit dialogs
│   └── ui/              # shadcn/ui components
├── db/
│   ├── schema.ts        # Drizzle table definitions
│   └── index.ts         # Neon + Drizzle client
├── lib/auth/
│   ├── server.ts        # createNeonAuth (server-side)
│   └── client.ts        # createAuthClient (client-side)
└── test/                # Vitest unit tests
e2e/                     # Playwright E2E tests
```

## License

Apache 2.0 — see [LICENSE](LICENSE).
