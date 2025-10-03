const express = require('express');
const router = express.Router();

// import in memory boooks list
const booksList = require('./booksdb');
const jwtAuth = require('../middleware/jwtAuth');

// Get all books
router.get('/books', (req, res) => {
  res.status(200).json({
    message: 'All Books retrieved',
    booksList
  });
});

// Get specific data by isbn
router.get('/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  if (!booksList[isbn]) {
    return res.status(404).json({ message: 'Book not found based on ISBN' });
  }
  res.send(booksList[isbn]);
});

// Get specific data by author
router.get("/author/:author", (req, res) => {
    const authorQuery = req.params.author.toLowerCase();

    const filteredBooks = Object.values(booksList).filter(
        (book) => book.author.toLowerCase().includes(authorQuery)
    );

    if (filteredBooks.length === 0) {
        return res.status(404).json({ message: "Book not found based on author" });
    }

    res.status(200).json({ books: filteredBooks });
});

// Get specific data by title
router.get("/title/:title", (req, res) => {
    const titleQuery = req.params.title.toLowerCase();

    const filteredBooks = Object.values(booksList).filter(
        (book) => book.title.toLowerCase().includes(titleQuery)
    );

    if (filteredBooks.length === 0) {
        return res.status(404).json({ message: "Book not found based on title" });
    }

    res.status(200).json({ books: filteredBooks });
});

// Get specific data by review
router.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  if (!booksList[isbn]) {
    return res.status(404).json({ message: 'Book not found based on review' });
  }
  res.send(booksList[isbn]);
});

// Add or update the review
router.put("/review/:isbn", jwtAuth, (req, res) => {
    const isbn = req.params.isbn;
    const { review } = req.body;

    if (!booksList[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    booksList[isbn].reviews = review;
    res.json({ message: "Review added/updated", reviews: booksList[isbn].reviews });
});

// Delete the review
router.delete("/review/:isbn", jwtAuth, (req, res) => {
    const isbn = req.params.isbn;
    if (!booksList[isbn]) return res.status(404).json({ message: "Book not found" });

    if (booksList[isbn].reviews) {
        delete booksList[isbn].reviews;
        return res.json({ message: "Review deleted" });
    } else {
        return res.status(404).json({ message: "Review not found for this user" });
    }
});

function getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (booksList[isbn]) {
                resolve(booksList[isbn]); // Book found
            } else {
                reject(`Book with ISBN ${isbn} not found`);
            }
        }, 500); // Simulate async delay
    });
}


// async and promise
function getAllBooksAsync(callback) {
    setTimeout(() => {
        // simulate async operation like reading from DB
        callback(booksList);
    }, 500); // 500ms delay
}

router.get('/asyncbooks', (req, res) => {
    getAllBooksAsync((books) => {
        res.json({
            message: "All books retrieved asynchronously",
            books
        });
    });
});


router.get('/promise/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    getBookByISBN(isbn)
        .then((book) => {
            res.json({
                message: `Book with ISBN ${isbn} retrieved successfully`,
                book
            });
        })
        .catch((err) => {
            res.status(404).json({ message: err });
        });
});

function getBooksByAuthor(author) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = Object.values(booksList).filter(
                (book) => book.author.toLowerCase().includes(author.toLowerCase())
            );
            if (result.length > 0) {
                resolve(result);
            } else {
                reject(`No books found by author: ${author}`);
            }
        }, 500);
    });
}

router.get('/promise/author/:author', (req, res) => {
    const author = req.params.author;

    getBooksByAuthor(author)
        .then((books) => {
            res.json({
                message: `Books by author ${author} retrieved successfully`,
                books
            });
        })
        .catch((err) => {
            res.status(404).json({ message: err });
        });
});

function getBooksByTitle(title) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = Object.values(booksList).filter(
                (book) => book.title.toLowerCase().includes(title.toLowerCase())
            );
            if (result.length > 0) {
                resolve(result);
            } else {
                reject(`No books found by author: ${title}`);
            }
        }, 500);
    });
}

router.get('/promise/title/:title', (req, res) => {
    const title = req.params.title;

    getBooksByTitle(title)
        .then((books) => {
            res.json({
                message: `Books with title "${title}" retrieved successfully`,
                books
            });
        })
        .catch((err) => {
            res.status(404).json({ message: err });
        });
});

module.exports = router;