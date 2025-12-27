# Project Setup Guide

This project is a monorepo containing a **frontend** (Next.js) and a **backend** (Express/Node.js). Follow the instructions below to set up and run the application locally.

### Video Link-- https://drive.google.com/file/d/1p9C3MUVjig3vTDVrF0XBa6CIkYfU1q7_/view?usp=sharing

## Prerequisites

- Node.js (Latest LTS recommended)
- [pnpm](https://pnpm.io/) (Package Manager)
- PostgreSQL (for the backend database)

## Database Setup (Docker)

If you don't have a local PostgreSQL instance, you can spin one up quickly using Docker. This command creates a database that matches the default configuration in `.env.example`:

```bash
docker run --name spur-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -d postgres
```

## 1. Backend Setup

The backend handles the API and database interactions.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Configuration:**
    - Create a `.env` file in the `backend/` directory.
    - You can copy the provided example file:
        ```bash
        cp .env.example .env
        ```
    - **Required Environment Variables:**
        - `DATABASE_URL`: Connection string for your PostgreSQL database (e.g., `postgres://user:password@localhost:5432/mydb`).
        - `PORT`: Port to run the server on (default: `8000`).
        - `OPENAI_API_KEY`: Your OpenAI API key.

4.  **Start the development server:**
    ```bash
    pnpm dev
    ```
    The backend server will verify the database connection and start on the specified port.

## 2. Frontend Setup

The frontend is a Next.js application.

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Configuration:**
    - Create a `.env` file in the `frontend/` directory.
    - If a `.env.example` exists, you can use it as a reference:
        ```bash
        cp .env.example .env
        ```
    - **Required Environment Variables:**
        - `NEXT_PUBLIC_API_URL`: The URL of the backend API (default: `http://localhost:8000/v1`).

4.  **Start the development server:**
    ```bash
    pnpm dev
    ```
    The application will typically run on `http://localhost:3000`.

## Running Both Services

To run the full application, you will need two terminal windows:
1.  One running the **Backend** (`cd backend && pnpm dev`)
2.  One running the **Frontend** (`cd frontend && pnpm dev`)
