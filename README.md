# NE-Warehouse-Admin-Frontend

This document provides an overview of the React-based project named `NEWarehouseAdmin-Frontend`. The project supports React 18+.

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Setup](#setup)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Docker Deployment](#docker-deployment)
- [Cloud Foundry Deployment](#cloud-foundry-deployment)
- [Project Structure](#project-structure)
- [Coding Conventions](#coding-conventions)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Troubleshooting](#troubleshooting)

## Introduction

React-based web application built for warehouse administrators. It enables efficient management of drivers, orders, and stock through an intuitive interface, connecting seamlessly with the backend system.

## Requirements

- Node.js 18+
- npm (comes with Node.js)

## Setup

```bash
npm install
```

## Running Locally

1. Start the development server:

```bash
npm run dev
```

2. Open your browser to `http://localhost:5173`.

> **CORS note:** The app makes API requests that may be blocked by CORS. To disable CORS in Chrome during development:
> ```
> chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
> ```

The app is also deployed on Vercel at: https://ne-warehouse-admin.vercel.app/

## Environment Variables

The project uses Vite, so environment variables are prefixed with `VITE_`. Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=<your-api-url>
```

Refer to `src/api/config.ts` for the full list of expected variables.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Compiles TypeScript and builds for production |
| `npm run lint` | Runs ESLint on TypeScript/TSX files |
| `npm run preview` | Serves the production build locally |
| `npm run format` | Checks code formatting with Prettier |
| `npm run format:fix` | Fixes code formatting with Prettier |
| `npm run test` | Runs unit tests with Jest |
| `npm run test:watch` | Runs Jest in watch mode |

## Docker Deployment

The project includes a multi-stage `Dockerfile`:

- **Stage 1 (build):** Node 18 image — installs dependencies and runs `npm run build`
- **Stage 2 (production):** Nginx 1.25.0-alpine — serves the compiled output

**Build and run locally:**

```bash
docker build -t warehouse-frontend .
docker run -p 8080:80 warehouse-frontend
```

The Nginx configuration is provided in `nginx.conf` and serves the SPA with proper fallback routing.

## Cloud Foundry Deployment

1. Open your terminal inside WSL.
2. Build and push the Docker image:

```bash
docker build -t notionedge984/warehouse-frontend:2.5.1-20250416 .
docker push notionedge984/warehouse-frontend:2.5.1-20250416
```

3. Push to Cloud Foundry:

```bash
cf login -a https://<base-url>.hana.ondemand.com/
```

Enter your credentials when prompted.

```bash
cf push warehouse-frontend -o notionedge984/warehouse-frontend:2.5.1-20250416
```

## Project Structure

```
./
├── public/               # Static assets served directly
├── src/
│   ├── api/              # API client and endpoint configuration
│   ├── assets/           # Images, SVGs, LOTTIE animations, WEBP files
│   │   ├── LOTTIE/
│   │   ├── PNG/
│   │   ├── SVG/
│   │   └── WEBP/
│   ├── component/        # Reusable UI components
│   │   └── <Component>/
│   │       ├── propTypes/types.ts
│   │       ├── <Component>.tsx
│   │       ├── <Component>.scss    (where applicable)
│   │       ├── <Component>.test.tsx
│   │       └── <Component>.md
│   ├── context/          # React context providers (sidebar, timeline)
│   ├── mockServices/     # MSW mock server and handlers
│   ├── models/           # TypeScript interfaces and types
│   ├── resources/labels/ # i18n translation files (en, fr)
│   ├── screens/          # Page-level components
│   ├── styles/           # Global SCSS variables, mixins, typography
│   └── utilities/        # Helper functions and shared column definitions
├── Dockerfile            # Multi-stage production build
├── nginx.conf            # Nginx SPA routing configuration
├── .dockerignore
├── tsconfig.json
├── vite.config.ts
├── jest.config.js
└── package.json
```

## Coding Conventions

1. **Function declarations** for components and callbacks:

```tsx
// Preferred
function MyComponent() { ... }
// Avoid
const MyComponent = () => { ... }
```

2. **Destructuring** for cleaner props and state access:

```tsx
const { title, onPress } = props;
```

3. **Naming conventions:**

- Component files: PascalCase (e.g., `DetailsCard.tsx`)
- Variables, functions: camelCase

4. **Styling:**

- Component-specific styles in `.scss` files
- MUI overrides via the `sx` prop

5. **Component structure:**

```
<Component>/
├── propTypes/types.ts    # Type definitions
├── <Component>.tsx        # Component logic
├── <Component>.scss       # Styles (where applicable)
├── <Component>.test.tsx   # Unit tests
└── <Component>.md         # Documentation
```

## Dependencies

| Package | Purpose |
|---------|---------|
| react, react-dom | UI framework |
| @mui/material, @emotion/react | Material UI component library |
| axios | HTTP client |
| formik + yup | Form state management and validation |
| i18next, react-i18next | Internationalization (en/fr) |
| react-router-dom | Client-side routing |
| date-fns | Date/time utilities |
| react-signature-canvas | Signature capture |
| react-spinners | Loading spinners |
| react-lottie | LOTTIE animation rendering |
| crypto-js | Encryption utilities |
| uuid | Unique ID generation |

## Dev Dependencies

| Package | Purpose |
|---------|---------|
| typescript | Static type checking |
| vite | Development server and build tool |
| jest + ts-jest | Unit test runner |
| @testing-library/react | Component testing utilities |
| eslint + prettier | Code quality and formatting |
| sass | SCSS compilation |
| msw | API mocking for tests |

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm install` fails | Clear npm cache (`npm cache clean --force`) and retry |
| CORS errors in dev | Launch Chrome with `--disable-web-security` (see [Running Locally](#running-locally)) |
| Docker build slow | Ensure `.dockerignore` excludes `node_modules`, `coverage`, and other large dirs |
| Port 5173 already in use | Kill the vite process or specify a different port via `vite.config.ts` |
