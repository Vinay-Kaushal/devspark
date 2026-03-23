# DevSpark 

> AI-powered project idea generator for developers — inspired by funded startups, personalized to your skill level.

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | NextAuth v5 (GitHub, Google, Email) |
| AI | Google Gemini API |
| Payments | Stripe |
| Rate Limiting | Upstash Redis |

## Features

-  AI-generated project ideas personalized to skill level
-  Inspired by real funded startups
-  Full roadmaps, tech stacks, and time estimates
-  Save and organize your favorite ideas
-  Mark ideas as built with GitHub + live demo links
-  Free and Pro subscription tiers

## Local Development

### Prerequisites
- Node.js 18+
- Docker (for PostgreSQL)
- Git

### Setup
```bash
# Clone the repo
git clone https://github.com/Vinay-Kaushal/devspark.git
cd devspark

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your values

# Start PostgreSQL
docker run --name devspark-db \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=devspark \
  -p 5432:5432 -d postgres:16

# Push database schema
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Status

Currently in active development — building week by week.
