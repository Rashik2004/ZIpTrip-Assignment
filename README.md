# ZipTrip Todo Application

A full-stack todo application with a React frontend and Node.js + Express backend, featuring multi-page navigation, CRUD operations, and a premium futuristic UI design.

## Overview

This project implements a complete todo application with:

- **Backend**: Node.js with Express.js API, file-based data persistence
- **Frontend**: React 18 + Vite + React Router DOM, multi-page architecture
- **Design**: Premium futuristic UI with dark theme, cyan accent lighting, glassmorphism cards, and smooth micro-interactions

## Architecture

```
ZipTrip_Assignment/
├── backend/          # Node.js + Express API
│   ├── server.js     # CRUD endpoints
│   ├── todos.json    # Data persistence
│   └── package.json  # Dependencies
└── frontend/         # React Vite app
    ├── src/
    │   ├── App.jsx   # Main component with routing
    │   ├── App.css   # Premium futuristic styling
    │   └── main.jsx  # Entry point
    ├── package.json  # Dependencies
    └── vite.config.js
```

## Backend API (Port 3001)

### Base URL: `http://localhost:3001/api/todos`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/` | List all todos | - | `[{id, title, completed, createdAt}]` |
| `GET` | `/:id` | Get single todo | - | `{id, title, completed, createdAt}` |
| `POST` | `/` | Create new todo | `{ title: string, completed?: boolean }` | `{id, title, completed, createdAt}` |
| `PUT` | `/:id` | Update todo status | `{ completed: boolean }` | `{id, title, completed, createdAt}` |
| `DELETE` | `/:id` | Delete todo | - | `{id, title, completed, createdAt}` |

### Data Model

Each todo object contains:
- `id` (string): Timestamp-based unique identifier
- `title` (string): Task description (required)
- `completed` (boolean): Task completion status
- `createdAt` (string): ISO 8601 creation timestamp

### Persistence

Data is stored in `backend/todos.json`. The file is auto-created if it doesn't exist.

### Running the Backend

```bash
cd backend
npm install          # Install dependencies
npm start            # Start server (port 3001)
# Or: node server.js
```

## Frontend (Port 5173)

### URL: `http://localhost:5173/`

### Pages

1. **Todo List** (`/`)
   - Input field to add new todos
   - List of existing todos with:
     - Click-to-toggle completion
     - Delete button
     - "View" button to navigate to single todo page

2. **Single Todo** (`/todo/:id`)
   - Displays todo title, status, and creation date
   - "Back to List" button
   - Reads todo ID from URL path parameter

### Features

- ✅ Multi-page application (not SPA)
- ✅ CRUD operations via REST APIs
- ✅ Persistent storage in JSON file
- ✅ React Router for page navigation
- ✅ Toggle complete/incomplete
- ✅ Delete todos
- ✅ Create new todos
- ✅ Single item detail view
- ✅ Error handling and loading states

### Running the Frontend

```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start Vite dev server (port 5173)
```

### Tech Stack

**Frontend:**
- React 18
- Vite 8.2.2
- React Router DOM
- CSS3 with custom properties

**Backend:**
- Node.js (CommonJS)
- Express 4.x
- CORS middleware
- File system (JSON persistence)

**Design:**
- Dark theme (`#0a0a0f`) with cyan (`#00d4aa`) and blue (`#0066ff`) accents
- Glassmorphism cards with `backdrop-filter: blur(12px)`
- Gradient text using `background-clip: text`
- Neon glow shadows on interactive states
- Staggered fade-in animations
- Pulse animations on hover
- Respects `prefers-reduced-motion`

### UI Design Highlights

- **Dark futuristic aesthetic** with atmospheric gradient background
- **Glass-panel cards** with blur effects and neon borders
- **Gradient-accented headings** using CSS `background-clip: text`
- **Animated interactions** including:
  - Button hover with lift effect and glow shadow
  - Todo item toggle with strikethrough animation
  - Staggered entry animations for list items
  - Pulse micro-animations
- **Color-coded status badges**:
  - Completed: Cyan tinted background
  - Pending: Blue tinted background
- **Respects user preferences** - reduced motion support

### API Integration

The frontend automatically:
1. Fetches todos on page load
2. Creates new todos via POST
3. Toggles completion via PUT
4. Deletes todos via DELETE
5. Navigates to single todo page with ID from URL
6. Reads single todo by ID from URL path

### Development

Both servers run concurrently:
- Frontend: `localhost:5173` (Vite dev server)
- Backend: `localhost:3001` (Express server)

The frontend proxies API calls to `http://localhost:3001/api/todos`.

### CORS Configuration

Backend includes CORS middleware allowing requests from `http://localhost:5173`. This enables the frontend to call the backend API during development.

### Data Flow

1. User types in input and clicks "Add Todo"
2. Frontend sends `POST /api/todos` with `{ title, completed: false }`
3. Backend creates todo, saves to `todos.json`, returns new object
4. Frontend fetches updated list and re-renders
5. User clicks "View" on any todo
6. Frontend navigates to `/todo/:id` (using the todo's ID)
7. Single Todo component reads ID from URL path, fetches `GET /api/todos/:id`
8. Todo details display with completion status and creation date

## Troubleshooting

### Blank Page / White Screen

1. Open browser Developer Tools (F12)
2. Check the **Console** tab for React errors
3. Ensure both servers are running:
   - `npm run dev` in frontend (port 5173)
   - `npm start` in backend (port 3001)
4. Verify backend is responding: `curl http://localhost:3001/api/todos`

### API Connection Errors

1. Check backend logs for startup errors
2. Ensure port 3001 is not occupied
3. Verify CORS is enabled in `server.js`

### Style Issues

1. CSS is in `frontend/src/App.css`
2. Variables defined in `:root` selector
3. Tailwind-like custom properties for easy theming

## Project Status

✅ Backend APIs fully functional  
✅ Frontend multi-page architecture complete  
✅ CRUD operations verified end-to-end  
✅ Premium futuristic UI designed  
✅ Data persistence via JSON file  
✅ React Router navigation working  
✅ Error handling implemented  
✅ CORS configured  
✅ Responsiveness considered (mobile-friendly max-width constraints)  
✅ Reduced motion support