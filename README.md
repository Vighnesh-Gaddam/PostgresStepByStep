# Express + PostgreSQL + Docker CRUD API

This project demonstrates a simple CRUD API built with **Express.js** and **PostgreSQL**, using **Docker** for easy database setup.

---

## **Features**

* REST API built using **Express.js**
* **PostgreSQL** database running inside Docker
* Automatic table creation (on startup)
* Basic CRUD endpoints:

  * Create User
  * Get All Users
  * Get User By ID
  * Update User
  * Delete User

---

## **Prerequisites**

* [Docker](https://docs.docker.com/get-docker/) installed and running
* [Node.js](https://nodejs.org/) (v18 or newer)
* [Postman](https://www.postman.com/) (optional, for testing)

---

## **1. Run PostgreSQL with Docker**

```bash
# Remove old container if exists (optional)
docker rm -f postgres-db

# Run PostgreSQL container
docker run --name postgres-db \
  -e POSTGRES_PASSWORD=vicky \
  -p 5432:5432 \
  -d postgres
```

### **Check if container is running**

```bash
docker ps
```

Expected output:

```
CONTAINER ID   IMAGE      STATUS          PORTS                    NAMES
abc123         postgres   Up ...          0.0.0.0:5432->5432/tcp   postgres-db
```

---

## **2. Database Connection**

### **Default Credentials**

* **User:** postgres
* **Password:** vicky
* **Host:** localhost
* **Port:** 5432
* **Database:** postgres

These are set in the `.env` file:

```
DB_USER=postgres
DB_PASSWORD=vicky
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=postgres
PORT=3000
```

---

## **3. Install Node.js dependencies**

```bash
npm install
```

---

## **4. Run the app**

```bash
npm start
```

Server should start at:

```
http://localhost:3000
```

---

## **5. API Endpoints**

### **Base URL**

```
http://localhost:3000/api
```

### **Endpoints**

* `GET /users` → Get all users
* `GET /users/:id` → Get a user by ID
* `POST /users` → Create user
  **Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
* `PUT /users/:id` → Update user
* `DELETE /users/:id` → Delete user

---

## **6. Reset Table (Optional)**

To clear the table and reset IDs:

```sql
TRUNCATE TABLE users RESTART IDENTITY;
```

---

## **7. Stop and Remove Container**

```bash
docker stop postgres-db
docker rm postgres-db
```

---

## **8. Build Docker Image for Node App (Optional)**

```bash
# Build image
docker build -t express-crud-app .

# Run app container
docker run -p 3000:3000 --name express-app --link postgres-db:postgres express-crud-app
```

---

### **Tech Stack**

* Node.js
* Express.js
* PostgreSQL
* Docker

---