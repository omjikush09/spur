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

4.  **Generate Prisma Client:**
    ```bash
    pnpm db:generate
    ```
    This ensures the Prisma client types are generated for your local environment.

5.  **Run Database Migrations:**
    ```bash
    pnpm db:migrate
    ```
    This will apply the Prisma schema changes to your local database.

6.  **Start the development server:**
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

## Short Architecture Overview

### Backend Structure
The backend follows a **modular, feature-based architecture** located in `src/modules/`. Each feature (e.g., `chat`, `message`) is self-contained with its own:
-   **Routes (`*.route.ts`)**: Defines the API endpoints.
-   **Controllers (`*.controller.ts`)**: Handles HTTP requests and Zod schema validation.
-   **Services (`*.service.ts`)**: Contains business logic, database interactions (Prisma), and AI integration.
-   **Schemas (`*.schema.ts`)**: Zod definitions for input validation.

### Interesting Design Decisions
-   **Streaming First**: The message generation (`generateTextService`) uses the Vercel AI SDK's `pipeUIMessageStreamToResponse` to stream tokens directly to the client, providing a responsive "typing" effect.
-   **Monorepo-style**: Both frontend and backend share the same repository structure for easier development context switching.
-   **Zod Everywhere**: We use Zod not just for validation but for inferring TypeScript types, ensuring type safety from the API input to the service layer.

## LLM Notes

### Provider
-   **OpenAI** via the **Vercel AI SDK** (`@ai-sdk/openai`).
-   The implementation uses `streamText` for efficient, real-time responses.

### Prompting Strategy
-   **System Prompt**: Defined in `src/utils/prompt.ts`, the prompt sets the persona as a "friendly and knowledgeable customer support agent for Spur".
-   **Context Awareness**: The `convertToModelMessages` utility is used to transform the chat history into a format the model understands, allowing it to maintain context over multiple turns.

### Trade-offs & "If I had more time..."
-   **RAG Integration**: Currently, the bot relies on general knowledge and the system prompt. With more time, I would implement **RAG (Retrieval-Augmented Generation)** using a vector database to allow the AI to answer specific questions about real-time inventory, shipping policies, or specific order statuses.
-   **Model Configuration**: The model is currently set to `gpt-5.2` (a placeholder/experimental version). A production-ready version would likely stick to `gpt-4o` or `gpt-3.5-turbo` for cost optimization.
-   **Tool Calling**: I would add **Function Calling** capabilities so the agent could perform actions like "Check Order Status" or "Process Refund" directly against the database.
