# **Express + PostgreSQL + Docker CRUD API**

A production-ready **CRUD API** built using **Express.js** and **PostgreSQL**, fully containerized with **Docker** for fast setup and deployment.

---

## **Features**

* REST API using **Express.js**
* **PostgreSQL** database inside Docker
* Automatic table creation (on startup)
* CRUD endpoints:

  * Create User
  * Get All Users
  * Get User by ID
  * Update User
  * Delete User
* Environment variable support (`.env`)
* Optional Dockerized Node.js server

---

## **Tech Stack**

* **Node.js** (Express.js)
* **PostgreSQL**
* **Docker**

---

## **Prerequisites**

* [Docker](https://docs.docker.com/get-docker/) installed & running
* [Node.js](https://nodejs.org/) (v18 or newer)
* [Postman](https://www.postman.com/) (optional, for testing APIs)

---

## **1. Run PostgreSQL with Docker**

Remove old container (optional):

```bash
docker rm -f postgres-db
```

Run PostgreSQL container:

```bash
docker run --name postgres-db \
  -e POSTGRES_PASSWORD=vicky \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -d postgres
```

Check if the container is running:

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
* **Host:** 127.0.0.1
* **Port:** 5432
* **Database:** postgres

### **.env file**

```env
DB_USER=postgres
DB_PASSWORD=vicky
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=postgres
PORT=3000
```

---

## **3. Install Dependencies**

```bash
npm install
```

---

## **4. Run the API Server**

```bash
npm start
```

API is available at:

```
http://localhost:3000
```

---

## **5. API Endpoints**

Base URL:

```
http://localhost:3000/api
```

Endpoints:

* `GET /users` → Fetch all users
* `GET /users/:id` → Fetch a user by ID
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

## **6. Reset the Table**

To clear the table and reset ID:

```sql
TRUNCATE TABLE users RESTART IDENTITY;
```

---

## **7. Stop & Remove Containers**

```bash
docker stop postgres-db
docker rm postgres-db
```

---

## **8. Build & Run Node App with Docker (Optional)**

### **Build image**

```bash
docker build -t express-crud-app .
```

### **Run app container (linked with Postgres)**

```bash
docker run -p 3000:3000 \
  --name express-app \
  --link postgres-db:postgres \
  express-crud-app
```

---

## **Optional: Use Docker Compose**

Create `docker-compose.yml`:

```yaml
version: "3.8"
services:
  postgres:
    image: postgres
    container_name: postgres-db
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: vicky
      POSTGRES_DB: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    container_name: express-app
    restart: always
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    environment:
      DB_USER: postgres
      DB_PASSWORD: vicky
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: postgres
      PORT: 3000

volumes:
  postgres_data:
```

Run everything:

```bash
docker-compose up --build
```

Stop:

```bash
docker-compose down
```

---

## **Conclusion**

With Docker, you don’t need to manually install PostgreSQL locally. Just run the container and connect via your `.env` file. You can easily scale or deploy this project using Docker Compose.


