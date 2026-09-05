# 🚀 TaskForge — Production-Ready Task Management API

> A production-oriented Task Management backend built with **Node.js, Express.js, MongoDB, Redis, Docker, and GitHub Actions**, featuring secure authentication, role-based authorization, caching, background jobs, automated testing, and CI/CD.

TaskForge is designed not as a basic CRUD project, but as a **real-world backend system** that demonstrates practical backend engineering, system design, security, performance optimization, testing, containerization, and DevOps practices.

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Why TaskForge?](#-why-taskforge)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [System Architecture](#-system-architecture)
* [Project Structure](#-project-structure)
* [Authentication & Authorization](#-authentication--authorization)
* [Task Management](#-task-management)
* [Redis Caching](#-redis-caching)
* [Background Jobs](#-background-jobs)
* [Audit Logging](#-audit-logging)
* [Security](#-security)
* [Testing](#-testing)
* [Docker](#-docker)
* [CI/CD](#-cicd)
* [Environment Variables](#-environment-variables)
* [Local Development](#-local-development)
* [API Documentation](#-api-documentation)
* [API Endpoints](#-api-endpoints)
* [Production Deployment](#-production-deployment)
* [Git Workflow](#-git-workflow)
* [Future Improvements](#-future-improvements)
* [Learning Outcomes](#-learning-outcomes)

---

# 🎯 Overview

TaskForge is a backend API for managing tasks across multiple users.

The application supports:

* User registration and authentication
* JWT-based authorization
* Role-based access control
* Task CRUD operations
* Search and filtering
* Sorting and pagination
* Redis caching
* Background task processing
* Rate limiting
* Input validation
* Centralized error handling
* Structured logging
* Audit trails
* API testing
* Dockerized development
* Automated CI/CD

The project follows a **layered backend architecture** to keep business logic maintainable and scalable.

---

# 💡 Why TaskForge?

Most beginner backend projects follow:

```text
Route → Controller → Database
```

TaskForge goes further:

```text
Client
   ↓
Express API
   ↓
Security Middleware
   ↓
Validation
   ↓
Authentication / Authorization
   ↓
Controller
   ↓
Service Layer
   ↓
Repository / Model
   ↓
MongoDB
```

With additional infrastructure:

```text
              ┌──────────────┐
              │   TaskForge  │
              │     API      │
              └──────┬───────┘
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
    MongoDB        Redis       BullMQ
        │            │            │
        │         Caching       Worker
        │                           │
        └──────────────┬────────────┘
                       ↓
                  Audit Logs
```

This makes the project suitable for demonstrating **production backend engineering concepts**.

---

# ✨ Features

## 🔐 Authentication

* User registration
* Secure password hashing using bcrypt
* JWT-based authentication
* Login
* Protected routes
* Current-user endpoint
* Token expiration

---

## 👮 Role-Based Access Control

Supported roles:

```text
USER
ADMIN
```

Example:

```text
USER
 ├── Create own tasks
 ├── Read own tasks
 ├── Update own tasks
 └── Delete own tasks

ADMIN
 ├── Manage users
 ├── Manage tasks
 └── View audit logs
```

Authorization flow:

```text
Request
   ↓
JWT Verification
   ↓
User Identification
   ↓
Role Verification
   ↓
Controller
```

---

# 📋 Task Management

Users can:

* Create tasks
* View tasks
* View individual task
* Update tasks
* Delete tasks
* Change task status
* Set task priority
* Set due dates

Task statuses:

```text
TODO
IN_PROGRESS
COMPLETED
```

Priorities:

```text
LOW
MEDIUM
HIGH
```

---

# 🔎 Advanced Querying

The API supports:

### Search

```http
GET /api/v1/tasks?search=backend
```

### Filtering

```http
GET /api/v1/tasks?status=COMPLETED
```

### Priority filtering

```http
GET /api/v1/tasks?priority=HIGH
```

### Sorting

```http
GET /api/v1/tasks?sort=dueDate
```

### Pagination

```http
GET /api/v1/tasks?page=2&limit=10
```

### Combined query

```http
GET /api/v1/tasks?status=TODO&priority=HIGH&search=backend&page=1&limit=10
```

Response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5
  }
}
```

---

# ⚡ Redis Caching

TaskForge uses Redis to reduce unnecessary database queries.

## Cache Flow

### Cache Hit

```text
Client
  ↓
API
  ↓
Redis
  ↓
Cached Response
  ↓
Client
```

### Cache Miss

```text
Client
  ↓
API
  ↓
Redis
  ↓
Cache MISS
  ↓
MongoDB
  ↓
Store in Redis
  ↓
Response
```

---

## Cache Invalidation

When task data changes:

```text
CREATE Task
     ↓
Invalidate task cache

UPDATE Task
     ↓
Invalidate task cache

DELETE Task
     ↓
Invalidate task cache
```

Cached data uses a TTL to prevent stale entries from living indefinitely.

---

# 🔄 Background Jobs

TaskForge uses **BullMQ + Redis** for asynchronous background processing.

Example use case:

```text
Task created
     ↓
Task has upcoming deadline
     ↓
Job added to queue
     ↓
Redis
     ↓
BullMQ Worker
     ↓
Process reminder
```

The API does not need to perform every operation synchronously.

Architecture:

```text
              API
               │
               ↓
          Create Job
               │
               ↓
             Redis
               │
               ↓
          BullMQ Queue
               │
               ↓
            Worker
               │
               ↓
       Background Processing
```

The worker can also support:

* Retry attempts
* Failed jobs
* Delayed jobs
* Scheduled jobs

---

# 📝 Audit Logging

Important user actions are recorded.

Examples:

```text
USER_REGISTERED
USER_LOGIN
TASK_CREATED
TASK_UPDATED
TASK_DELETED
TASK_STATUS_CHANGED
ADMIN_ACTION
```

Example audit record:

```json
{
  "userId": "user_id",
  "action": "TASK_UPDATED",
  "resource": "Task",
  "resourceId": "task_id",
  "timestamp": "2026-09-05T10:00:00Z"
}
```

Admins can use audit logs to understand who performed important operations.

---

# 🛡️ Security

TaskForge implements multiple security practices.

### Authentication

```text
JWT
bcrypt
Protected Routes
```

### API Security

```text
Helmet
CORS
Rate Limiting
Input Validation
Environment Variables
```

### Password Security

Passwords are never stored in plaintext.

```text
Plain Password
      ↓
    bcrypt
      ↓
Password Hash
      ↓
   MongoDB
```

### Rate Limiting

Sensitive endpoints such as authentication routes use stricter rate limits.

Example:

```text
100 requests / 15 minutes / IP
```

This helps protect against excessive requests and brute-force attempts.

---

# ❌ Centralized Error Handling

Instead of handling errors separately in every controller:

```text
Controller
    ↓
next(error)
    ↓
Global Error Middleware
    ↓
Consistent API Response
```

Example:

```json
{
  "success": false,
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "Task not found"
  }
}
```

---

# ❤️ Health & Readiness Checks

TaskForge exposes health endpoints for production environments.

### Health

```http
GET /health
```

Example:

```json
{
  "status": "ok",
  "database": "connected",
  "redis": "connected"
}
```

### Readiness

```http
GET /ready
```

Used to determine whether the application is ready to receive traffic.

---

# 📊 Logging

Application logging records important information such as:

```text
HTTP method
Request path
Status code
Response time
Errors
Application events
```

Example:

```text
GET /api/v1/tasks 200 124ms
POST /api/v1/tasks 201 89ms
GET /api/v1/tasks 500 32ms
```

---

# 🧪 Testing

TaskForge uses automated API tests.

Testing stack:

```text
Jest
Supertest
```

Tests cover:

### Authentication

* Registration
* Login
* Invalid credentials
* Missing token
* Expired/invalid token

### Authorization

* User permissions
* Admin permissions
* Unauthorized resource access

### Tasks

* Create
* Read
* Update
* Delete
* Filtering
* Pagination
* Validation

### Security

* Rate limiting
* Invalid input
* Unauthorized requests

---

# 🐳 Docker

TaskForge is fully containerized.

Services:

```text
┌───────────────────────────────┐
│        Docker Compose         │
│                               │
│  ┌─────────┐ ┌─────────────┐ │
│  │   API   │ │   MongoDB   │ │
│  └─────────┘ └─────────────┘ │
│                               │
│  ┌─────────┐ ┌─────────────┐ │
│  │  Redis  │ │    Worker   │ │
│  └─────────┘ └─────────────┘ │
└───────────────────────────────┘
```

Start the complete stack:

```bash
docker compose up --build
```

Stop:

```bash
docker compose down
```

Stop and remove volumes:

```bash
docker compose down -v
```

---

# 🏗️ Docker Architecture

```text
                    Docker Compose
                         │
       ┌─────────────────┼─────────────────┐
       ↓                 ↓                 ↓
      API              MongoDB            Redis
       │                                     │
       │                                     │
       └────────────────┐         ┌─────────┘
                        ↓         ↓
                         BullMQ
                           │
                           ↓
                         Worker
```

The API and worker are isolated services.

---

# 🔁 CI/CD

TaskForge uses **GitHub Actions** for automation.

## Continuous Integration

Every push or pull request triggers:

```text
Git Push / Pull Request
          ↓
     GitHub Actions
          ↓
      Install Dependencies
          ↓
          Lint
          ↓
          Tests
          ↓
      Docker Build
```

If any step fails, the pipeline fails.

---

# 🚀 Continuous Deployment

After successful validation:

```text
Developer
    ↓
git push
    ↓
GitHub
    ↓
CI Pipeline
    ↓
Lint
    ↓
Tests
    ↓
Docker Build
    ↓
Deployment
    ↓
Production
```

This removes the need for manually repeating deployment steps after every approved change.

---

# 📁 Project Structure

```text
taskforge/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── redis.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── task.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── task.service.js
│   │   └── cache.service.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   └── task.validator.js
│   │
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── logger.js
│   │   └── response.js
│   │
│   ├── app.js
│   └── server.js
│
├── workers/
│   └── notification.worker.js
│
├── tests/
│   ├── auth.test.js
│   ├── task.test.js
│   └── health.test.js
│
├── docs/
│   └── architecture.md
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
│
├── Dockerfile
├── compose.yaml
├── .dockerignore
├── .gitignore
├── .env
├── .env.example
├── package.json
├── package-lock.json
└── README.md
```

---

# 🧩 Architecture

TaskForge follows a layered architecture.

```text
                       Client
                         │
                         ↓
                  Express Router
                         │
                         ↓
                  Middleware Layer
                         │
             ┌───────────┴───────────┐
             ↓                       ↓
      Authentication             Validation
             │                       │
             └───────────┬───────────┘
                         ↓
                    Controller
                         ↓
                      Service
                    /         \
                   ↓           ↓
              MongoDB        Redis
                               │
                               ↓
                           BullMQ
                               │
                               ↓
                            Worker
```

### Responsibilities

**Routes**

Defines API endpoints.

**Middleware**

Handles authentication, validation, rate limiting and errors.

**Controllers**

Handles HTTP request and response.

**Services**

Contains business logic.

**Models**

Defines database schemas and database interaction.

**Workers**

Processes asynchronous background jobs.

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint                | Authentication | Description   |
| ------ | ----------------------- | -------------- | ------------- |
| POST   | `/api/v1/auth/register` | No             | Register user |
| POST   | `/api/v1/auth/login`    | No             | Login         |
| GET    | `/api/v1/auth/me`       | Yes            | Current user  |

---

## Tasks

| Method | Endpoint            | Authentication | Description |
| ------ | ------------------- | -------------- | ----------- |
| POST   | `/api/v1/tasks`     | Yes            | Create task |
| GET    | `/api/v1/tasks`     | Yes            | Get tasks   |
| GET    | `/api/v1/tasks/:id` | Yes            | Get task    |
| PATCH  | `/api/v1/tasks/:id` | Yes            | Update task |
| DELETE | `/api/v1/tasks/:id` | Yes            | Delete task |

---

## Health

| Method | Endpoint  | Description        |
| ------ | --------- | ------------------ |
| GET    | `/health` | Application health |
| GET    | `/ready`  | Readiness check    |

---

# 🔑 Example Authentication

Register:

```http
POST /api/v1/auth/register
Content-Type: application/json
```

```json
{
  "name": "Sumit",
  "email": "sumit@example.com",
  "password": "StrongPassword123"
}
```

Login:

```http
POST /api/v1/auth/login
```

Response:

```json
{
  "success": true,
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

Use token:

```http
Authorization: Bearer JWT_TOKEN
```

---

# 📝 Example Task Creation

```http
POST /api/v1/tasks
Authorization: Bearer JWT_TOKEN
Content-Type: application/json
```

```json
{
  "title": "Complete backend project",
  "description": "Implement authentication and CI/CD",
  "priority": "HIGH",
  "status": "IN_PROGRESS",
  "dueDate": "2026-09-10"
}
```

---

# ⚙️ Environment Variables

Create `.env`:

```env
NODE_ENV=development

PORT=5000

MONGO_URI=mongodb://localhost:27017/taskforge

REDIS_URL=redis://localhost:6379

JWT_SECRET=your-super-secret-key

JWT_EXPIRES_IN=7d
```

For production, use secure secret management rather than committing secrets to source control.

Create `.env.example`:

```env
NODE_ENV=
PORT=

MONGO_URI=

REDIS_URL=

JWT_SECRET=
JWT_EXPIRES_IN=
```

Never commit:

```text
.env
```

to GitHub.

---

# 💻 Local Development

## 1. Clone Repository

```bash
git clone <repository-url>
cd taskforge
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment

```bash
cp .env.example .env
```

Update the values inside `.env`.

---

## 4. Start MongoDB and Redis

If using Docker:

```bash
docker compose up mongodb redis
```

---

## 5. Start API

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

# 🐳 Run Entire Application with Docker

Build:

```bash
docker compose build
```

Start:

```bash
docker compose up
```

Start in background:

```bash
docker compose up -d
```

View logs:

```bash
docker compose logs -f
```

Stop:

```bash
docker compose down
```

---

# 🧪 Run Tests

Run all tests:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

Generate coverage:

```bash
npm run test:coverage
```

---

# 🔍 Code Quality

Run lint:

```bash
npm run lint
```

Fix lint issues:

```bash
npm run lint:fix
```

---

# 📖 API Documentation

Interactive API documentation is available through Swagger.

After starting the server:

```text
/api-docs
```

Swagger allows developers to:

* Explore endpoints
* Understand request schemas
* View response formats
* Test APIs
* Understand authentication requirements

---

# 🚢 Production Deployment

Production deployment follows:

```text
Developer
    ↓
Git Push
    ↓
GitHub
    ↓
GitHub Actions
    ↓
Automated Tests
    ↓
Docker Build
    ↓
Deployment
    ↓
Production Server
```

Production environment should provide:

```text
NODE_ENV=production
Secure JWT secret
Production MongoDB
Production Redis
HTTPS
Logging
Health checks
```

---

# 🔄 Git Workflow

Feature development:

```bash
git checkout -b feature/task-filtering
```

Make changes:

```bash
git add .
git commit -m "feat: add task filtering"
```

Push:

```bash
git push origin feature/task-filtering
```

Then open a Pull Request.

Recommended commit format:

```text
feat: add task CRUD
feat: implement JWT authentication
feat: add Redis caching
fix: handle invalid task id
test: add task integration tests
refactor: separate business logic into services
docs: update API documentation
ci: add GitHub Actions workflow
build: add Docker configuration
```

---

# 📊 Production Checklist

Before deployment:

```text
[ ] Environment variables configured
[ ] Secrets secured
[ ] NODE_ENV=production
[ ] Authentication tested
[ ] Authorization tested
[ ] Input validation enabled
[ ] Rate limiting enabled
[ ] CORS configured
[ ] Security headers enabled
[ ] Logging enabled
[ ] Health endpoint working
[ ] Redis connected
[ ] MongoDB connected
[ ] Automated tests passing
[ ] Docker build successful
[ ] CI pipeline passing
[ ] Deployment verified
```

---

# 🧠 Engineering Concepts Demonstrated

This project demonstrates practical knowledge of:

### Backend

* REST API design
* HTTP methods and status codes
* Node.js
* Express.js
* MongoDB
* Mongoose
* Middleware
* Layered architecture
* Authentication
* Authorization
* JWT
* Password hashing
* Validation
* Error handling
* Pagination
* Filtering
* Sorting
* Search

### Performance

* Redis
* Caching
* TTL
* Cache invalidation
* Rate limiting

### Distributed/Async Systems

* Background workers
* Queues
* BullMQ
* Retry mechanisms
* Asynchronous processing

### Security

* JWT security
* Password hashing
* CORS
* Helmet
* Rate limiting
* Input validation
* Environment secrets

### DevOps

* Git
* GitHub
* Docker
* Docker Compose
* CI
* CD
* GitHub Actions
* Automated testing
* Automated Docker builds
* Deployment

### Production Engineering

* Health checks
* Readiness checks
* Graceful shutdown
* Structured logging
* Audit logging
* API versioning

---

# 📈 Future Improvements

Possible future enhancements:

* [ ] PostgreSQL support
* [ ] WebSocket-based real-time task updates
* [ ] Email notifications
* [ ] OAuth2 / Google authentication
* [ ] Full-text search using Elasticsearch/OpenSearch
* [ ] Prometheus metrics
* [ ] Grafana dashboards
* [ ] Distributed tracing
* [ ] Kubernetes deployment
* [ ] Terraform infrastructure
* [ ] Load testing
* [ ] Horizontal scaling
* [ ] API gateway
* [ ] Message broker such as Kafka

These are intentionally kept outside the initial project scope to keep the core system maintainable.

---

# 🎓 Learning Outcomes

By building TaskForge, the developer gains practical experience in:

```text
Backend Development
        +
Database Design
        +
Authentication
        +
Caching
        +
Asynchronous Processing
        +
Testing
        +
Security
        +
Docker
        +
CI/CD
        +
Production Deployment
```

The project is designed to bridge the gap between **basic CRUD applications and production-oriented backend engineering**.

---

# ⭐ Project Highlights

```text
🔐 JWT Authentication
👮 Role-Based Access Control
📋 Advanced Task Management
🔎 Search / Filter / Sort / Pagination
⚡ Redis Caching
🔄 BullMQ Background Jobs
📝 Audit Logging
🛡️ API Security
🧪 Automated API Testing
🐳 Docker & Docker Compose
⚙️ GitHub Actions CI/CD
❤️ Health & Readiness Checks
📊 Structured Logging
📖 Swagger API Documentation
🚀 Production Deployment
```

---

# 👨‍💻 Author

**Sumit**

B.Tech — Artificial Intelligence & Data Science

---

## ⭐ If you find this project useful

Give the repository a ⭐ and feel free to explore the implementation.
