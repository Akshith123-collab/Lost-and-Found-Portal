# Lost and Found Website

Full-stack lost-and-found web application for posting, browsing, and managing lost or found item reports.

## Features

- User registration and login with JWT authentication
- Add lost/found item reports with image upload
- Browse all reported items
- View and manage items posted by the logged-in user
- Edit/delete authorization for item owners and admins
- Spring Boot REST API backed by MongoDB
- Vue frontend with routes for login, listing, and item management

## Tech Stack

- Backend: Java, Spring Boot, Spring Security, JWT, MongoDB
- Frontend: Vue 3, Vite, Pinia, Vue Router, Tailwind CSS

## Project Structure

```text
backend/    Spring Boot API
frontend/   Vue frontend
```

## Run Backend

```bash
cd backend
./mvnw spring-boot:run
```

On Windows:

```bash
cd backend
mvnw.cmd spring-boot:run
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## GitHub Notes

Uploaded images and build outputs are intentionally ignored. Keep real credentials and local `.env` files out of Git.
