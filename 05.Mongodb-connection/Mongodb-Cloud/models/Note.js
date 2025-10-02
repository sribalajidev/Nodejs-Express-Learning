const mongoose = require('mongoose'); // Create a mongoose schema and modal

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true // this field must be provided
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // automatically sets current date if not provided
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;


// Breakdown:
// | Field       | Type   | Required | Default    | Description                         |
// | ----------- | ------ | -------- | ---------- | ----------------------------------- |
// | `title`     | String | Yes      | N/A        | The title of the note               |
// | `content`   | String | Yes      | N/A        | The main content of the note        |
// | `createdAt` | Date   | No       | `Date.now` | Timestamp when the note was created |
