
# HyperHire Bookshop

## Overview

HyperHire Bookshop test app

## Tech Stack

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - Prisma
  - [Fly.io](https://fly.io) for hosting
  
- **Frontend:**
  - Next.js
  - [Vercel](https://vercel.com) for hosting

## Project Structure

Explain the structure of your monorepo.

```plaintext
project-root/
│
├── backend/         # Node.js backend
│   ├── src/
│   ├── ...
│   └── README.md
│
├── frontend/        # Next.js frontend
│   ├── components/  # React components
│   ├── app/
│   ├── ...
│   └── README.md
│
└── README.md        # Main README file
```

## Backend

### Local Development

1. Navigate to the `backend` directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.

### API Documentation

Explore the API documentation at [https://hyperhire-bookshop-backend.fly.dev/api-docs](https://hyperhire-bookshop-backend.fly.dev/api-docs).

### Deployment

The backend is hosted on [Fly.io](https://fly.io). Deployments are automated.

### API Base URL

The API base URL is [https://hyperhire-bookshop-backend.fly.dev](https://hyperhire-bookshop-backend.fly.dev).

## Frontend

### Local Development

1. Navigate to the `frontend` directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm run dev`.

### Components

The `components` folder contains reusable React components.

### Deployment

The frontend is hosted on [Vercel](https://vercel.com). Deployments are automated.
 available at (https://hyperhire-bookshop-app.vercel.app/)

## Database

- **Database Provider:** [NeonDB](https://neondb.io)


