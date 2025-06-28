# 📝 React & Node.js ToDo List App (Ver 1.0)

A full-stack ToDo List application with a React frontend and Node.js/Express backend, using MongoDB for persistent storage. Users can add, edit, delete, and filter tasks with a clean, responsive UI and smooth user interactions.

---

## 🚀 Features

### ✅ Core Functionality
- **Add Tasks**  
  Users can input and add tasks. Empty inputs are not allowed.
- **Display Tasks**  
  All tasks are shown in a clean list layout with:
  - Task text
  - Checkbox to mark complete/incomplete
  - Edit button
  - Delete button
- **Mark as Completed**  
  Toggling the checkbox updates task status with strikethrough style for completed items.
- **Edit Tasks**  
  Inline editing or modal/input field for task updates.
- **Delete Tasks**  
  Instantly remove a task from the list.
- **Filter Tasks**  
  Show All, Active, or Completed tasks using filter buttons.
- **Clear Completed**  
  Bulk-remove all completed tasks.

### 🗄️ Backend API
- RESTful API for CRUD operations on todos
- MongoDB for persistent storage
- Express.js for routing

---

## 📁 Folder Structure

```
backend/           # Node.js/Express API server
  models/          # Mongoose models (Todo.js)
  routes/          # API routes (todos.js)
  server.js        # Entry point for backend
  package.json     # Backend dependencies
frontend/          # React app
  src/
    components/    # React components (TodoList, TodoItem, etc.)
    services/      # API service (api.js)
    ...            # Other React files
  public/          # Static assets
  package.json     # Frontend dependencies
README.md          # Project documentation
```

---

## ⚡ Getting Started

### 1. Clone the repository
```sh
git clone <repo-url>
cd ToDo List App
```

### 2. Setup Backend
```sh
cd backend
npm install
# Create a .env file for MongoDB connection string
npm start
```

### 3. Setup Frontend
```sh
cd ../frontend
npm install
npm start
```

The React app will run on [http://localhost:3000](http://localhost:3000) and the backend API on [http://localhost:5000](http://localhost:5000) by default.

---

## 🔗 API Endpoints
- `GET    /api/todos`         - Get all todos
- `POST   /api/todos`         - Add a new todo
- `PUT    /api/todos/:id`     - Update a todo
- `DELETE /api/todos/:id`     - Delete a todo

---

## ✨ Optional Enhancements (Planned or In Progress)

- 🔁 Drag-and-drop task reordering
- ⏰ Due date and reminder functionality
- 📄 Pagination for large task lists

---

## 🛠️ Tech Stack
- **Frontend:** React, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)

---

