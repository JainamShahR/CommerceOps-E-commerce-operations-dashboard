# CommerceOps - E-commerce Operations Dashboard

A responsive **React + Redux Toolkit + Node.js/Express** starter project for managing a fictional online store. Built as a portfolio project to practice modern frontend development, state management, REST APIs, and responsive design.

> **Project status: Starter / MVP.** This repository uses generated demo data. It is not deployed to a real store and does not have production authentication, payments, or a production database.

## Features implemented

- **Overview:** delivered-order revenue, order count, product count, low-stock alerts, and a 7-day sales chart (Recharts).
- **Products:** searchable/filterable product table with working **add, edit, delete** operations and form validation.
- **Orders:** searchable/filterable order table; update an order's status through the REST API.
- **Inventory:** stock level visualization and low-stock filter (threshold: 10 units).
- **Frontend:** React components, Redux Toolkit async actions (`createAsyncThunk`), responsive CSS, loading and error states.
- **Backend:** Express endpoints, input validation, persistent local JSON demo data, and starter unit tests.

## Technology stack

| Layer | Stack |
|---|---|
| UI | React 18, JavaScript, Vite 6, CSS3, Lucide React |
| State | Redux Toolkit + React Redux |
| Charts | Recharts |
| API | Node.js, Express, REST endpoints |
| Storage | Local JSON file (development/demo only) |
| Tests | Node built-in test runner |

## Getting started (Mac / Windows / Linux)

**Requirements:** Node.js 20.19+ and npm. In VS Code, open the folder containing this README.

```bash
npm install
npm run dev
```

Open **http://localhost:5173**. The Express API runs at **http://localhost:5000**. Running `npm run dev` starts both applications.

Test the API:

```bash
npm test
```

Build the frontend:

```bash
npm run build
```

To reset the sample products and orders: stop the API, run `npm run reset-data`, then start it again with `npm run dev`.

If you prefer separate terminals, run `npm run dev -w server` in one and `npm run dev -w client` in another.

## Pages

1. **Overview** — KPI cards, 7-day revenue chart, recent orders, low stock.
2. **Products** — search, category filter, create/edit/delete product.
3. **Orders** — search, filter, update status.
4. **Inventory** — low-stock alerts and stock visualizations.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health check |
| GET | `/api/overview` | Dashboard KPIs + sales by day |
| GET | `/api/products` | List products |
| POST | `/api/products` | Create product |
| PATCH | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/orders` | List orders |
| PATCH | `/api/orders/:id/status` | Update order status |

Example request:

```bash
curl http://localhost:5000/api/health
```

```bash
curl -X POST http://localhost:5000/api/products \
  -H 'Content-Type: application/json' \
  -d '{"name":"Wireless Speaker","category":"Electronics","price":2499,"stock":15}'
```

Demo data is stored in `server/data/db.json` at runtime and excluded from version control. Changing orders to `Delivered` affects the revenue chart and KPIs. **Revenue counts delivered orders only** (other statuses are not counted). Deleting a product doesn't delete historical demo orders.

## Upload to GitHub

1. Create a new empty GitHub repository named `commerceops-ecommerce-dashboard` (do not initialize with a README).
2. Extract the ZIP and open the **commerceops-starter** folder in VS Code.
3. If Git is installed, run:

```bash
git init
git add .
git commit -m "Initial CommerceOps React and Express starter"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/commerceops-ecommerce-dashboard.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. Alternatively, upload the **extracted files** using GitHub's **Add file → Upload files**; do not upload only the ZIP into the repository.

> The actual website will not run on GitHub's source viewer. Run it locally with `npm run dev`. A live link requires separate frontend/API deployment.

## Suggested next development steps

- **Stage 1 (starter):** run the dashboard and verify the four pages on desktop and mobile.
- **Stage 2:** test product CRUD and order status changes; understand Redux thunks and REST endpoints.
- **Stage 3:** add endpoint tests, order creation, stock adjustments, and allowed status transitions.
- **Stage 4:** add secure authentication and a real database, then deploy frontend and backend.

## Project structure

```text
commerceops-starter/
├── client/
│   ├── public/logo.svg
│   ├── src/
│   │   ├── components/        # Sidebar, modal, badges, metric cards
│   │   ├── features/commerceSlice.js
│   │   ├── pages/             # Overview, Products, Orders, Inventory
│   │   ├── utils/             # API and formatting helpers
│   │   ├── App.jsx
│   │   └── styles.css
│   └── vite.config.js
├── server/
│   ├── src/                # Seed, local storage, validation, KPI logic
│   ├── tests/
│   ├── data/               # Generated JSON on first API run
│   └── index.js            # REST API
├── package.json
└── README.md
```

## Screenshots and demo

After running locally, add images of your actual Overview, Products, Orders and Inventory pages into a `screenshots/` folder and link them here. Add your live demo URL if you deploy it. Do **not** claim a deployment or results you haven't verified.

## Known limitations / planned improvements

- JSON-file persistence is appropriate only for a local demo; replace with PostgreSQL or MongoDB before production deployment.
- No user authentication or role-based authorization yet.
- Demo order status changes are unrestricted; real businesses need allowed transitions and inventory adjustments.
- Demo order records are seeded; this starter doesn't create customer checkout orders.
- Tests cover the analytics and validation helpers; expand with endpoint and React component tests.
- A production deployment will require hosting the frontend and API separately; set `VITE_API_BASE_URL` when building the frontend for a remote backend.

## Resume bullets (ONLY once you verify each feature)

- Developed a responsive e-commerce dashboard using React.js to manage products, inventory, orders, and sales analytics.
- Implemented Redux Toolkit and REST API integration for centralized state management, product operations, and order tracking.
- Built reusable UI components, interactive charts, and responsive layouts for a seamless user experience.

## License

MIT. This is a learning project using generated demonstration records.
