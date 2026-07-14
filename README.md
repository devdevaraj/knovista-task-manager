---
File Path: /home/devaraj/code/works/knovista-task-manager/README.md
Created At: 2026-07-14T13:46:28+05:30
Completed At: 2026-07-14T13:46:28+05:30
---

# KnoVista Task Manager

## About This Project

The KnoVista Task Manager is a full-stack Mini Task Management System built with a robust separation of concerns. It features a responsive React Single Page Application (SPA) on the frontend and a secure Laravel REST API on the backend, using MySQL for data persistence.

### Project Structure
The repository is split into two primary directories:

- `/backend`: A Laravel 11 application acting as a stateless RESTful API. It uses Laravel Sanctum for API token authentication and handles all database interactions, data validation, and business logic.
- `/frontend`: A React 18 application built with Vite and TypeScript. It utilizes React Router for client-side navigation, Axios with interceptors for API communication, and the Context API for global state management (Authentication). The UI is custom-styled with a modern, glassmorphic aesthetic.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite, React Router DOM, Axios, Lucide React (Icons), Vanilla CSS
- **Backend**: PHP 8+, Laravel 11, Laravel Sanctum, MySQL

---

## Step-by-Step Instructions to Run the Project

### Prerequisites
Before you begin, ensure you have the following installed on your system:
- **PHP** (>= 8.2)
- **Composer**
- **Node.js** (>= 18) and **npm**
- **MySQL** Server

### 1. Backend Setup (Laravel API)

1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Configure your environment variables:
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and configure your database credentials. Ensure the database `task_manager` exists in your MySQL server:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=task_manager
     DB_USERNAME=root
     DB_PASSWORD=your_password
     ```

4. Generate the application key:
   ```bash
   php artisan key:generate
   ```

5. Run database migrations to create the necessary tables:
   ```bash
   php artisan migrate
   ```

6. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   *The backend API will now be running at `http://localhost:8000`.*

### 2. Frontend Setup (React SPA)

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables:
   - Copy the `.env.example` file to `.env` (this file has already been configured to point to the local backend API):
     ```bash
     cp .env.example .env
     ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```

5. Access the application:
   Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

### 3. Usage
- **Register**: Create a new account to receive an authentication token.
- **Login**: Log in using your credentials to access the dashboard.
- **Manage Tasks**: Use the Kanban board to create, edit, move, and delete tasks dynamically.
