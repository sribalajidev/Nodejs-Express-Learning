# 02.Async-Callbacks in Node.js

## Overview
In this module, we explore **asynchronous programming in Node.js**, one of its core strengths.  
Node.js is **single-threaded and event-driven**, so it uses async patterns to handle multiple tasks efficiently without blocking the main thread.

We cover:
- Callback functions
- Error-first callbacks
- Callback Hell & Inversion of Control
- Promises
- Async/Await
- Axios API requests with all three approaches

---

## Why Asynchronous Programming?
- Node.js handles **I/O operations** (like file reading, DB queries, API requests) asynchronously.  
- Instead of waiting for one operation to finish, Node.js can process other tasks in the meantime.  
- This makes Node.js **fast and scalable** for backend apps.

**Use Cases:**
- Reading files without blocking the app.
- Fetching data from external APIs.
- Querying databases.
- Handling multiple user requests simultaneously.

---

## Required Node Modules
Install the following if needed:
```bash
npm init -y
npm install express axios
```

- **express** → for creating routes and running backend server.  
- **axios** → for making API requests (used in final examples).  

---

## 1. Callback Functions
### Definition
A **callback** is a function passed as an argument to another function, executed later when the task completes.

### Syntax
```js
function fetchData(callback) {
  setTimeout(() => {
    callback(null, "Data received!");
  }, 1000);
}

fetchData((err, data) => {
  if (err) console.error(err);
  else console.log(data);
});
```

### Use Case
- File system operations (`fs.readFile`)  
- Legacy APIs still use callbacks  

---

## 2. Error-First Callbacks
### Definition
Convention in Node.js where the **first argument is an error** (if any), and the second is the result.

### Syntax
```js
function readFile(callback) {
  const error = null;
  const data = "Hello World";
  callback(error, data);
}

readFile((err, data) => {
  if (err) return console.error("Error:", err);
  console.log("Data:", data);
});
```

---

## 3. Callback Hell / Inversion of Control (IoC)
### Problem
When callbacks are nested inside each other, the code becomes:
- Hard to read  
- Hard to maintain  
- Known as **“Callback Hell”**

### Example
```js
getUser(1, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      console.log(comments);
    });
  });
});
```

---

## 4. Promises
### Definition
A **Promise** represents a value that may be available **now, later, or never**.  
It has 3 states:
- Pending
- Fulfilled
- Rejected

### Syntax
```js
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("Promise resolved!");
  else reject("Promise rejected!");
});

myPromise
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```

### Use Case
- Replaces callback hell  
- Chainable with `.then()` and `.catch()`  

---

## 5. Async / Await
### Definition
`async` and `await` provide a **cleaner syntax** for working with promises.

### Syntax
```js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data received!"), 1000);
  });
}

async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

getData();
```

### Use Case
- Makes async code look like synchronous code  
- Easier to read and maintain  

---

## 6. Axios API Requests (3 Approaches)
We use **Axios** to fetch data from a public API (`https://jsonplaceholder.typicode.com/posts/1`).

### 6.1 Callback Style
```js
function getDataWithCallback(callback) {
  axios.get(API_URL)
    .then((res) => callback(null, res.data))
    .catch((err) => callback(err, null));
}
```

### 6.2 Promise Style
```js
function getDataWithPromise() {
  return axios.get(API_URL)
    .then((res) => res.data)
    .catch((err) => { throw err; });
}
```

### 6.3 Async/Await Style
```js
async function getDataWithAsyncAwait() {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    throw err;
  }
}
```

---

## Summary
- **Callbacks** → basic async handling, prone to callback hell.  
- **Error-first callbacks** → Node.js convention for error handling.  
- **Promises** → improve readability, chainable.  
- **Async/Await** → best modern approach for clean async code.  
- **Axios with all 3** → practical usage to fetch API data.  

---

With this, you now understand the **core async patterns in Node.js** that power scalable backend apps.
