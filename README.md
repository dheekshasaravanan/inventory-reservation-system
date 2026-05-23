# Inventory Reservation System

A full-stack inventory reservation platform built using Next.js, Prisma, PostgreSQL, and Tailwind CSS.

The system supports real-time inventory tracking across multiple warehouses with automated reservation lifecycle management, concurrency-safe stock reservation, expiry handling, and idempotent API support.

---

# Problem Understanding

The main challenge in inventory reservation systems is preventing inventory inconsistency when multiple users attempt to reserve the same stock simultaneously.

This project focuses on:
- preventing overselling
- handling expired reservations automatically
- supporting retry-safe APIs
- maintaining accurate inventory visibility

---

# Features

- Multi-warehouse inventory tracking
- Real-time stock availability
- Reservation creation, confirmation, and release
- Automatic reservation expiry
- Automatic stock restoration
- Concurrency-safe inventory updates
- Idempotent reservation API
- Real-time countdown timers
- Dark mode dashboard
- Responsive SaaS-style UI

---

# Tech Stack

## Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- Zod Validation

## Database
- Neon PostgreSQL

---

# API Endpoints

| Endpoint | Description |
|---|---|
| GET `/api/products` | Fetch inventory data |
| GET `/api/warehouses` | Fetch warehouses |
| POST `/api/reservations` | Create reservation |
| POST `/api/reservations/confirm` | Confirm reservation |
| POST `/api/reservations/release` | Release reservation |
| POST `/api/reservations/cleanup` | Cleanup expired reservations |

---

# Concurrency Handling

Prisma database transactions are used to prevent overselling.

If multiple users attempt to reserve the final inventory unit simultaneously:
- only one transaction succeeds
- remaining requests fail safely

This guarantees inventory consistency.

---

# Expiry Mechanism

Reservations are created with an `expiresAt` timestamp.

A cleanup process periodically checks for expired reservations using the `/api/reservations/cleanup` endpoint.

When a reservation expires:
- status becomes `EXPIRED`
- reserved inventory is released
- stock becomes available again automatically

For simplicity, cleanup is triggered using frontend polling.

In production, this would typically use:
- cron jobs
- background workers
- queue systems

---

# Idempotency Support

The reservation API supports `Idempotency-Key` headers.

Repeated requests with the same key:
- do not create duplicate reservations
- do not decrement stock multiple times
- return the same response safely

This simulates production-grade retry-safe API behavior.

---

# Engineering Trade-Offs

## Polling vs WebSockets
Polling was used instead of WebSockets to simplify deployment and reduce implementation complexity within the assignment timeline.

## Frontend-triggered Cleanup
Reservation cleanup is triggered through frontend polling instead of background schedulers to keep infrastructure lightweight during development.

## Future Improvements
With more time, the following improvements would be added:
- Redis locking
- WebSocket real-time sync
- Authentication & RBAC
- Reservation history
- Analytics charts
- Queue-based background processing

---

# How to Run Locally

## 1. Clone Repository

```bash
git clone https://github.com/dheekshasaravanan/inventory-reservation-system.git
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create `.env` file:

```env
DATABASE_URL=your_database_url
```

---

## 4. Run Prisma Migration

```bash
npx prisma migrate dev
```

---

## 5. Seed Database

```bash
npx prisma db seed
```

The seed includes:
- 10 products
- 4 warehouses
- realistic inventory distribution

---

## 6. Start Development Server

```bash
npm run dev
```

Application runs at:

```txt
http://localhost:3000
```

---

# Author

Dheeksha Saravanan

GitHub:
https://github.com/dheekshasaravanan