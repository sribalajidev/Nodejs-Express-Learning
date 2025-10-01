// // concepts/crud.js

const express = require('express');
const router = express.Router();

// In-memory storage for notes
let notes = [];
let idCounter = 1;

// ===== CREATE =====
// POST /api/concepts/notes
router.post('/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newNote = { id: idCounter++, title, content };
  notes.push(newNote);

  res.status(201).json({
    message: 'Note created successfully',
    note: newNote
  });
});

// ===== READ ALL =====
// GET /api/concepts/notes
router.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'All notes retrieved',
    notes
  });
});

// ===== READ ONE =====
// GET /api/concepts/notes/:id
router.get('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json({ note });
});

// ===== UPDATE =====
// PUT /api/concepts/notes/:id
router.put('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const { title, content } = req.body;

  const noteIndex = notes.findIndex(n => n.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  notes[noteIndex] = { ...notes[noteIndex], title, content };

  res.status(200).json({
    message: 'Note updated successfully',
    note: notes[noteIndex]
  });
});

// ===== DELETE =====
// DELETE /api/concepts/notes/:id
router.delete('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const noteIndex = notes.findIndex(n => n.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const deletedNote = notes.splice(noteIndex, 1);

  res.status(200).json({
    message: 'Note deleted successfully',
    note: deletedNote[0]
  });
});

module.exports = router;


// Test endpoints in Postman:
// | Method | URL                     | Description         |
// | ------ | ----------------------- | ------------------- |
// | POST   | /api/concepts/notes     | Create a new note   |
// | GET    | /api/concepts/notes     | Get all notes       |
// | GET    | /api/concepts/notes/:id | Get a note by ID    |
// | PUT    | /api/concepts/notes/:id | Update a note by ID |
// | DELETE | /api/concepts/notes/:id | Delete a note by ID |
// 
// POST Body in postman for input
// {
//     "title": "My first note",
//     "content": "This is the content of my note"
// }
