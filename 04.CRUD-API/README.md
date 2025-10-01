# 04. CRUD API with Node.js and Express

## Overview
In this module, we will learn how to build **RESTful APIs** using **CRUD (Create, Read, Update, Delete) operations** in Node.js with Express.  
We’ll also understand HTTP status codes and test our APIs using **Postman**.

---

## Learning Objectives
By the end of this topic, you will be able to:
- Understand **RESTful API principles**
- Implement **CRUD operations** (GET, POST, PUT, DELETE)
- Handle **JSON request/response**
- Apply correct **HTTP status codes**
- Test APIs with **Postman**

---

## What is a RESTful API?
**REST** stands for **Representational State Transfer**.  
It is an architectural style for building APIs that uses **stateless communication** over HTTP.

### Principles of REST:
1. **Stateless** → Each request contains all necessary info, server does not store client state.
2. **Client-Server separation** → Frontend (client) and backend (server) are independent.
3. **Uniform Interface** → Resources are identified by URLs (e.g., `/api/notes`).
4. **Resource-based** → Everything is treated as a resource (users, posts, notes).
5. **HTTP Methods** → Use HTTP verbs properly:  
   - GET → Retrieve data  
   - POST → Create new data  
   - PUT/PATCH → Update existing data  
   - DELETE → Remove data  

---

## CRUD Operations Example

We will create a simple **Notes API** with **in-memory storage**.

### File: `concepts/crud.js`
```js
const express = require('express');
const router = express.Router();

let notes = []; // In-memory storage (will reset on server restart)
let noteId = 1;

// CREATE - Add a new note
router.post('/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  const newNote = { id: noteId++, title, content };
  notes.push(newNote);
  res.status(201).json({ message: "Note created successfully", note: newNote });
});

// READ - Get all notes
router.get('/notes', (req, res) => {
  res.status(200).json({ message: "All notes retrieved", notes });
});

// READ - Get one note by ID
router.get('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json({ message: "Note retrieved", note });
});

// UPDATE - Update a note by ID
router.put('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  const { title, content } = req.body;
  note.title = title || note.title;
  note.content = content || note.content;
  res.status(200).json({ message: "Note updated successfully", note });
});

// DELETE - Delete a note by ID
router.delete('/notes/:id', (req, res) => {
  const noteIndex = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (noteIndex === -1) {
    return res.status(404).json({ message: "Note not found" });
  }
  notes.splice(noteIndex, 1);
  res.status(200).json({ message: "Note deleted successfully" });
});

module.exports = router;
```

### File: `server.js`
```js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Import CRUD Routes
const crudRoutes = require('./concepts/crud');
app.use('/api/concepts', crudRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

---

## Testing with Postman

| Method | Endpoint | Description | Body (JSON Example) |
|--------|----------|-------------|---------------------|
| **POST** | `/api/concepts/notes` | Create a new note | `{ "title": "Note 1", "content": "My first note" }` |
| **GET** | `/api/concepts/notes` | Get all notes | — |
| **GET** | `/api/concepts/notes/1` | Get one note by ID | — |
| **PUT** | `/api/concepts/notes/1` | Update note by ID | `{ "title": "Updated Title", "content": "Updated Content" }` |
| **DELETE** | `/api/concepts/notes/1` | Delete note by ID | — |

✅ Use **Postman** to send these requests and verify the responses.

---

## HTTP Status Codes Reference

| Code | Meaning | Use Case |
|------|----------|----------|
| **200 OK** | Request succeeded | GET, PUT, DELETE success |
| **201 Created** | Resource created successfully | POST success |
| **400 Bad Request** | Invalid data | Missing fields in POST/PUT |
| **401 Unauthorized** | Authentication required | Protected routes |
| **403 Forbidden** | Access denied | User not allowed |
| **404 Not Found** | Resource doesn’t exist | Wrong ID |
| **500 Internal Server Error** | Server crashed | Unexpected error |

---

## Key Takeaways
- **CRUD** forms the foundation of almost every backend system.  
- REST APIs are **stateless** and use **HTTP methods** consistently.  
- Always return proper **status codes** to help clients understand responses.  
- Use **Postman** or **Insomnia** for API testing.

---