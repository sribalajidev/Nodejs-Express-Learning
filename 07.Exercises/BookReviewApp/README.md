# Book Review Application - Node.js & Express with JWT Authentication

## Overview

This project is a server-side **Book Review Application** built using **Node.js** and **Express.js**. It demonstrates CRUD operations, session-based authentication, and JWT-protected routes. Users can register, login, view books, and add/update/delete book reviews. Async callbacks and Promises are used for handling API requests.

---

## Folder Structure

```
book-review-app/
│
├─ server.js                 # Main entry file
├─ routes/
│   ├─ auth.js               # User registration & login
│   ├─ booksdb.js            # Static book database
│   └─ booklist.js           # CRUD operations on books
├─ middleware/
│   └─ jwtAuth.js            # JWT authentication middleware
├─ utils/
│   └─ jwt.js                # Helper functions for JWT sign & verify
└─ package.json
```

---

## Node Modules Required

* express
* express-session
* jsonwebtoken
* bcryptjs (optional, for hashing passwords)
* nodemon (optional, for development)

Install dependencies:

```bash
npm install express express-session jsonwebtoken bcryptjs
```

---

## Authentication & Authorization

### Register User

**Endpoint:** `POST /register`

**Request Body:**

```json
{
  "username": "user1",
  "password": "pass123"
}
```

**Response:**

```json
{
  "message": "User successfully registered. Now you can login"
}
```

* Checks if the username already exists.
* Stores user in memory (`users[]`).

### Login User

**Endpoint:** `POST /login`

**Request Body:**

```json
{
  "username": "user1",
  "password": "pass123"
}
```

**Response:**

```json
{
  "message": "User successfully logged in",
  "token": "<JWT_TOKEN>"
}
```

* Validates user credentials.
* Generates a JWT token using `utils/jwt.js`.
* Stores token in session for subsequent authentication.

### JWT Authentication Middleware

**File:** `middleware/jwtAuth.js`

* Protects routes such as adding/updating/deleting reviews.
* Checks for token in session.
* Verifies JWT and attaches user info to `req.user`.

**Example Usage in `booklist.js`:**

```js
router.put('/review/:isbn', jwtAuth, (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.user.username;

  booksList[isbn].reviews[username] = review;
  res.json({ message: 'Review added/updated', reviews: booksList[isbn].reviews });
});
```

---

## Book CRUD Operations (`booklist.js`)

### Get All Books

**GET /books**

**Response:**

```json
{
  "message": "All books retrieved",
  "books": { ...booksList }
}
```

### Get Book by ISBN

**GET /books/isbn/:isbn**

### Get Books by Author

**GET /books/author/:author**

* Case-insensitive search.

### Get Books by Title

**GET /books/title/:title**

* Case-insensitive search.

### Get Book Review

**GET /books/review/:isbn**

* Retrieves all reviews for a book.

### Add/Update Book Review (Protected)

**PUT /books/review/:isbn**

* Only authenticated users can access.
* Adds or updates the review by `req.user.username`.
* Example request body:

```json
{
  "review": "Amazing classic novel!"
}
```

---

## Async & Promises Examples

### Async Callback - Get All Books

```js
async function getAllBooksAsync() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Object.values(booksList)), 500);
  });
}
```

### Search by ISBN using Promises

```js
function getBookByISBN(isbn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = booksList[isbn];
      book ? resolve(book) : reject(`No book found with ISBN: ${isbn}`);
    }, 500);
  });
}
```

### Search by Author using Promises

```js
function getBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Object.values(booksList).filter(
        book => book.author.toLowerCase() === author.toLowerCase()
      );
      result.length ? resolve(result) : reject(`No books found by author: ${author}`);
    }, 500);
  });
}
```

### Search by Title using Promises

```js
function getBooksByTitle(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Object.values(booksList).filter(
        book => book.title.toLowerCase() === title.toLowerCase()
      );
      result.length ? resolve(result) : reject(`No books found with title: ${title}`);
    }, 500);
  });
}
```

---

## Testing Using Postman

1. **Register User:**

   * POST `/register`
   * Body: `{ "username": "user1", "password": "pass123" }`
   * Expected: `User successfully registered`

2. **Login User:**

   * POST `/login`
   * Body: `{ "username": "user1", "password": "pass123" }`
   * Expected: JWT token returned.

3. **Access Protected Routes:**

   * PUT `/books/review/:isbn`
   * Include session cookie from login.
   * Body: `{ "review": "Amazing!" }`

4. **Get Books:**

   * GET `/books` → all books.
   * GET `/books/isbn/:isbn` → specific book.
   * GET `/books/author/:author` → books by author.
   * GET `/books/title/:title` → books by title.

5. **Get Book Reviews:**

   * GET `/books/review/:isbn`

6. **Async & Promises Testing:**

   * GET `/books/async` → fetch using async callback.
   * GET `/books/promise/isbn/:isbn` → fetch using promises.
   * GET `/books/promise/author/:author`
   * GET `/books/promise/title/:title`

---

## Summary of Learning Outcomes

* Setup of **Node.js + Express** server with structured routing.
* Implemented **JWT-based authentication** with session support.
* Created CRUD APIs for books and book reviews.
* Protected routes using **middleware**.
* Implemented async callbacks and promises for API handling.
* Tested all endpoints using **Postman**.

This project is the culmination of authentication, CRUD operations, async programming, and professional project structuring in Node.js.

---

