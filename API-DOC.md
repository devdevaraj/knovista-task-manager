# Task Manager - API Documentation

This document describes the complete RESTful backend API for the Task Manager.

## Base URL

The API is available at:
`http://localhost:8000/api`

---

## Authentication & Authorization

The API uses **Laravel Sanctum** for token-based authentication.

- **Unauthenticated requests** to protected endpoints will return a `401 Unauthorized` response.
- **Authenticated requests** must include the provided token in the `Authorization` header as a Bearer token.
- **Data Isolation**: Users can only access, update, or delete tasks that belong to them. Attempts to interact with other users' tasks will result in a `403 Forbidden` response.

**Header Format:**

```http
Authorization: Bearer {your_access_token}
Accept: application/json
Content-Type: application/json
```

---

## 1. Authentication Endpoints

### 1.1 Register a New User

Create a new user account and obtain an access token.

- **Method**: `POST`
- **URL**: `/api/register`
- **Auth Required**: No

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Success Response (200 OK):**

```json
{
  "access_token": "1|gX4eYwA3oPqL...",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-07-14T10:00:00.000000Z",
    "updated_at": "2026-07-14T10:00:00.000000Z"
  }
}
```

### 1.2 User Login

Authenticate an existing user and obtain an access token.

- **Method**: `POST`
- **URL**: `/api/login`
- **Auth Required**: No

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200 OK):**

```json
{
  "access_token": "2|rL9ZtM4kQsV...",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-07-14T10:00:00.000000Z",
    "updated_at": "2026-07-14T10:00:00.000000Z"
  }
}
```

### 1.3 Get Authenticated User

Retrieve the profile of the currently authenticated user.

- **Method**: `GET`
- **URL**: `/api/user`
- **Auth Required**: Yes

**Success Response (200 OK):**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### 1.4 Logout

Revoke the current access token.

- **Method**: `POST`
- **URL**: `/api/logout`
- **Auth Required**: Yes

**Success Response (200 OK):**

```json
{
  "message": "Logged out successfully"
}
```

---

## 2. Tasks Endpoints

All task endpoints require authentication (`Authorization: Bearer {token}`).

### 2.1 List Tasks (with Pagination & Filtering)

Retrieve a paginated list of tasks belonging to the authenticated user.

- **Method**: `GET`
- **URL**: `/api/tasks`
- **Query Parameters**:
  - `status` (Optional): Filter by status (`todo`, `in_progress`, `done`).
  - `priority` (Optional): Filter by priority (`low`, `medium`, `high`).
  - `page` (Optional): The page number for pagination.

**Example Request:**
`GET /api/tasks?status=todo&priority=high&page=1`

**Success Response (200 OK):**
Notice the structure includes paginated `meta` and `links` objects alongside the core `data`.

```json
{
  "data": [
    {
      "id": 5,
      "title": "Complete API Documentation",
      "description": "Write comprehensive Markdown docs.",
      "status": "todo",
      "priority": "high",
      "due_date": "2026-07-20",
      "created_at": "2026-07-14T12:00:00.000000Z",
      "updated_at": "2026-07-14T12:00:00.000000Z",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ],
  "links": {
    "first": "http://localhost:8000/api/tasks?page=1",
    "last": "http://localhost:8000/api/tasks?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "links": [
      {
        "url": null,
        "label": "&laquo; Previous",
        "active": false
      },
      {
        "url": "http://localhost:8000/api/tasks?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": null,
        "label": "Next &raquo;",
        "active": false
      }
    ],
    "path": "http://localhost:8000/api/tasks",
    "per_page": 10,
    "to": 1,
    "total": 1
  }
}
```

### 2.2 Create a Task

Create a new task for the authenticated user.

- **Method**: `POST`
- **URL**: `/api/tasks`

**Request Body:**

```json
{
  "title": "Fix bug in login",
  "description": "Users are experiencing timeout on login page.",
  "status": "todo",
  "priority": "high",
  "due_date": "2026-07-15"
}
```

*Note: Only `title` is required. `status` defaults to `todo`, `priority` defaults to `medium`.*

**Success Response (201 Created):**

```json
{
  "data": {
    "id": 6,
    "title": "Fix bug in login",
    "description": "Users are experiencing timeout on login page.",
    "status": "todo",
    "priority": "high",
    "due_date": "2026-07-15",
    "created_at": "2026-07-14T12:10:00.000000Z",
    "updated_at": "2026-07-14T12:10:00.000000Z",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 2.3 Retrieve a Single Task

Get details of a specific task.

- **Method**: `GET`
- **URL**: `/api/tasks/{task_id}`

**Success Response (200 OK):**

```json
{
  "data": {
    "id": 6,
    "title": "Fix bug in login",
    "description": "Users are experiencing timeout on login page.",
    "status": "todo",
    "priority": "high",
    "due_date": "2026-07-15",
    "created_at": "2026-07-14T12:10:00.000000Z",
    "updated_at": "2026-07-14T12:10:00.000000Z",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 2.4 Update a Task

Update an existing task. You only need to send the fields you wish to change (PATCH behavior).

- **Method**: `PUT` or `PATCH`
- **URL**: `/api/tasks/{task_id}`

**Request Body:**

```json
{
  "status": "in_progress",
  "priority": "medium"
}
```

**Success Response (200 OK):**

```json
{
  "data": {
    "id": 6,
    "title": "Fix bug in login",
    "description": "Users are experiencing timeout on login page.",
    "status": "in_progress",
    "priority": "medium",
    "due_date": "2026-07-15",
    "created_at": "2026-07-14T12:10:00.000000Z",
    "updated_at": "2026-07-14T12:15:00.000000Z",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 2.5 Delete a Task

Permanently delete a task.

- **Method**: `DELETE`
- **URL**: `/api/tasks/{task_id}`

**Success Response (200 OK):**

```json
{
  "message": "Task deleted successfully."
}
```

---

## Standard Error Responses

### 422 Unprocessable Entity (Validation Errors)

When data provided in the request fails validation rules.

```json
{
  "message": "The title field is required.",
  "errors": {
    "title": [
      "The title field is required."
    ],
    "priority": [
      "The selected priority is invalid."
    ]
  }
}
```

### 401 Unauthorized

When no token is provided or the token is invalid/expired.

```json
{
  "message": "Unauthenticated."
}
```

### 403 Forbidden

When a user attempts to view, update, or delete a task that belongs to a different user.

```json
{
  "message": "This action is unauthorized."
}
```

### 404 Not Found

When a requested resource ID does not exist in the database.

```json
{
  "message": "No query results for model [App\\Models\\Task] 999"
}
```
