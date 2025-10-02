# Node.js + Express + MongoDB (Local) Setup

## Overview

This folder demonstrates how to integrate MongoDB (local) with a Node.js and Express backend application, covering setup, database connection, Mongoose schema, CRUD operations, and testing using Postman.

---

## Prerequisites

* Node.js and npm installed
* MongoDB installed locally (or running as a service)
* Basic understanding of Node.js and Express
* Postman (or similar tool) for testing API

---

## 1. Installing MongoDB locally

1. Download and install MongoDB Community Edition for your OS.
2. Start MongoDB service:

   ```bash
   brew services start mongodb-community
   ```
3. Verify installation using `mongosh`:

   ```bash
   mongosh
   ```

   Expected prompt: `test>`

---

## 2. Creating the Database

* Switch/create a database:

  ```javascript
  use mydb
  ```
* Note: Database and collections are created only when you insert data.
* Data in MongoDB is stored in JSON-like format (BSON).

---

## 3. Node.js Project Setup

1. Initialize Node.js project:

   ```bash
   npm init -y
   ```
2. Install dependencies:

   ```bash
   npm install express mongoose
   ```
3. Folder structure:

```
05.Mongodb-Connection/
  ├─ Mongodb-Local/
       ├─ models/
       │    └─ note.js
       ├─ routes/
       │    └─ noteRoutes.js
       └─ server.js
```

---

## 4. Connecting Node.js to MongoDB

**server.js**

```javascript
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log(err));

// Import Routes
const noteRoutes = require('./routes/noteRoutes');
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

**Note:** Warnings for `useNewUrlParser` and `useUnifiedTopology` can be ignored in recent Mongoose versions.

---

## 5. Defining Mongoose Schema

**models/note.js**

```javascript
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
```

* The schema defines the structure of the collection (similar to table in SQL).
* Fields: `title`, `content`, and auto timestamps `createdAt` and `updatedAt`.

---

## 6. CRUD Operations with Routes

**routes/noteRoutes.js**

```javascript
const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// GET all notes
router.get('/', async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({ message: 'All notes retrieved', notes });
});

// GET one note by ID
router.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.status(200).json(note);
});

// POST create a new note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.create({ title, content });
    res.status(201).json({ message: 'Note created', note });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a note
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note updated', note });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note deleted', note });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
```

* This connects the model with RESTful routes and enables CRUD operations.

---

## 7. Testing with Postman

1. **GET all notes:** `GET http://localhost:3000/api/notes`
2. **GET one note:** `GET http://localhost:3000/api/notes/:id`
3. **POST create note:** `POST http://localhost:3000/api/notes` with body (JSON):

```json
{
  "title": "My first note",
  "content": "Content of the note"
}
```

4. **PUT update note:** `PUT http://localhost:3000/api/notes/:id` with updated JSON body
5. **DELETE note:** `DELETE http://localhost:3000/api/notes/:id`

All CRUD operations can be tested in Postman or similar tools.

---

## Summary

* Installed MongoDB locally and verified with `mongosh`
* Created a Node.js + Express backend
* Connected to MongoDB using Mongoose
* Defined Mongoose schema for notes
* Implemented RESTful CRUD operations
* Tested API using Postman

This setup gives a full understanding of how a Node.js/Express app interacts with MongoDB locally, forming the foundation for backend development.
