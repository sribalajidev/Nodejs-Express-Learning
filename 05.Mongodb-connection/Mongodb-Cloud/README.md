# MongoDB Connection (Cloud)

This project demonstrates connecting a Node.js Express server to using **MongoDB Atlas (Cloud)**.\
It also includes basic **CRUD operations** using Mongoose.

------------------------------------------------------------------------

## Dependencies

Make sure you install the following dependencies:

``` bash
npm install express mongoose nodemon
```

-----------------------------------------------------------------------

## MongoDB Atlas (Cloud) Setup

1.  Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2.  Create a **Cluster** and a **Database User** with password.

3.  Get your **connection string** from Atlas, which looks like this:

        mongodb+srv://<username>:<password>@cluster0.mongodb.net/notesdb?retryWrites=true&w=majority

4.  Replace `<username>` and `<password>` with your actual credentials.

5.  In `server.js`, update your Mongoose connection:

    ``` js
    mongoose.connect("your-cloud-connection-string")
    ```

------------------------------------------------------------------------

## Project Structure

    Mongodb-cloud/
    │── models/
    │   └── Note.js
    │── routes/
    │   └── noteRoutes.js
    │── server.js
    │── .env
    │── package.json

------------------------------------------------------------------------

## Example Mongoose Model (`models/Note.js`)

``` js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
```

------------------------------------------------------------------------

## Example Routes (`routes/noteRoutes.js`)

``` js
const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

// Create Note
router.post("/", async (req, res) => {
  try {
    const note = new Note(req.body);
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Notes
router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Update Note
router.put("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Note
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

module.exports = router;
```

------------------------------------------------------------------------

## `server.js`

``` js
const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/noteRoutes");

require('dotenv').config(); // To load MONGO_URI from .env

const app = express();

// Middleware
app.use(express.json()); // ✅ Important for POST/PUT requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI) // Atlas connection string
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use("/api/notes", noteRoutes);

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
```

------------------------------------------------------------------------

## `.env`

```bash

MONGO_URI = mongodb+srv://<dbuser>:<dbpassword>@cluster91037.ypd2zdj.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=3000

```

------------------------------------------------------------------------

## Testing with Postman

### 1 Create Note (POST)

    POST http://localhost:5000/api/notes
    Content-Type: application/json

    {
      "title": "First Note",
      "content": "This is my first note."
    }

### 2 Get All Notes (GET)

    GET http://localhost:5000/api/notes

### 3 Update Note (PUT)

    PUT http://localhost:5000/api/notes/:id
    Content-Type: application/json

    {
      "title": "Updated Title",
      "content": "Updated content"
    }

### 4 Delete Note (DELETE)

    DELETE http://localhost:5000/api/notes/:id

------------------------------------------------------------------------

## Summary

-   Cloud MongoDB connection work the same way with Mongoose.
-   `express.json()` middleware is **mandatory** for POST/PUT requests.
-   You can switch between **local** and **cloud** by changing the
    connection string.

------------------------------------------------------------------------
