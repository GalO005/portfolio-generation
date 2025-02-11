# Portfolio Generation Project

This project is a full-stack application for generating carbon credit portfolios. It consists of a backend server built with Node.js, Express, and Sequelize, and a frontend client built with React and Vite.

## Overview
The Portfolio Generation Project allows users to generate and manage carbon credit portfolios. It consists of a backend API and a frontend client for user interaction.

## Backend (Server)
The backend is built using:
- **Node.js** and **Express.js** for API endpoints
- **Sequelize** for database interaction
- **PostgreSQL** as the database
- **TypeScript** for static type checking
- **Docker** for containerization

### Backend Files
- `server/src/controllers/portfolioController.ts` - Handles portfolio generation logic.
- `server/src/routes/portfolio.ts` - Defines routes for portfolio-related endpoints.
- `server/src/routes/index.ts` - Main router file that includes all route modules.
- `server/src/utils/importData.ts` - Utility to import data from a CSV file into the database.
- `server/src/data/data.csv` - Sample data in CSV format.
- `server/src/models/Project.ts` - Sequelize model for the Project entity.
- `server/src/models/Country.ts` - Sequelize model for the Country entity.
- `server/src/config/db.ts` - Database configuration and initialization.
- `server/src/index.ts` - Entry point for the server.
- `server/src/app.ts` - Express application setup.
- `server/.env` - Environment variables for the server.
- `server/package.json` - Dependencies and scripts for the server.
- `server/tsconfig.json` - TypeScript configuration for the server.
- `server/Dockerfile.node` - Dockerfile for the server.
- `server/src/tests/controller.test.ts` - Unit tests for the portfolio controller.

## Frontend (Client)
The frontend is built using:
- **React** and **Vite** for fast development
- **Tailwind CSS** for styling
- **Axios** for API requests
- **TypeScript** for static type checking

### Frontend Files
- `client/src/api/axiosInstance.ts` - Axios instance for making API requests.
- `client/src/components/ui/table.tsx` - Table component for displaying data.
- `client/src/components/ui/input.tsx` - Input component.
- `client/src/components/ui/card.tsx` - Card component.
- `client/src/components/ui/button.tsx` - Button component.
- `client/src/components/Portfolio.tsx` - Main portfolio component.
- `client/src/main.tsx` - Entry point for the React application.
- `client/src/App.tsx` - Main application component.
- `client/src/index.css` - Global CSS styles.
- `client/index.html` - HTML template for the client.
- `client/package.json` - Dependencies and scripts for the client.
- `client/tailwind.config.js` - Tailwind CSS configuration.
- `client/postcss.config.js` - PostCSS configuration.
- `client/vite.config.ts` - Vite configuration.
- `client/tsconfig.json` - TypeScript configuration for the client.
- `client/tsconfig.app.json` - TypeScript configuration for the client application.
- `client/tsconfig.node.json` - TypeScript configuration for Node.js.
- `client/eslint.config.js` - ESLint configuration.
- `client/.gitignore` - Git ignore file for the client.

## Docker Setup
- `docker-compose.yaml` - Defines services for:
  - `react-app` (Frontend)
  - `node-server` (Backend)
  - `PostgreSQL` database
  - `test-node-server` (For running backend tests)
- `Dockerfiles` - Define how to build Docker images for the frontend and backend.

## Running the Project

1. **Build and Start Services**: Use Docker Compose to build and start the services.
   ```sh
   docker compose up --build
   ```
2. **Access the Application**:
   - React application: `http://localhost:5173`
   - Backend API: `http://localhost:3000`