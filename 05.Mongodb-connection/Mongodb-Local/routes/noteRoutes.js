const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); // Mongoose model

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json({ message: "All notes retrieved", notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note retrieved", note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json({ message: "Note created", note: savedNote });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT - update a note by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true } // return the updated document
    );
    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note updated", note: updatedNote });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - delete a note by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted", note: deletedNote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
