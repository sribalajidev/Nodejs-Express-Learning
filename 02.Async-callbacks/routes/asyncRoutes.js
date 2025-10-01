const express = require('express');
const router = express.Router();
// importing functions
const greetUser = require('../concepts/callback'); // callback concept
const readFileCallback = require('../concepts/errorFirstCallback'); // error first callback concept
const path = require('path'); // required for error first callback concept
const runProcess = require('../concepts/callBackHell'); // callback hell concept 
const runPromiseProcess = require('../concepts/promise'); // promise concept
const runAsyncAwaitProcess = require('../concepts/asyncWait'); // async-await concept
const { getDataWithCallback, getDataWithPromise, getDataWithAsyncAwait } = require('../concepts/axios'); // axios concept


// Basic route for test
router.get('/test', (req, res) => {
  res.send('Async callbacks topic route is working!');
})

// Route to demonstrate callback
router.get('/callback', (req, res) => {
  greetUser("User", (message)=> {
    res.send(message);
  });
});

// Error-first callback route
router.get('/read-file', (req, res) => {
  const filePath = path.join(__dirname, '../concepts/sample.txt');
  readFileCallback(filePath, (err, data) => {
    if(err) {
      res.status(500).send(`Error reading file: ${err.message}`);
    } else {
      res.send(`File content: ${data}`);
    }
  })
});

// callback Hell route
router.get('/callback-hell', (req, res) => {
  console.log("Starting callback hell example...");

  runProcess();

  res.send("Check your console for Callback Hell execution!");
});

// promise route
router.get('/promises', (req, res) => {
  console.log("Starting promises example...");

  runPromiseProcess();

  res.send("Check your console for Promises execution!");
});

// async-await route
router.get('/async-await', (req, res) => {
  console.log("Starting async/await example...");

  runAsyncAwaitProcess();

  res.send("Check your console for Async/Await execution!");
});

// axios callback
router.get('/axios-callback', (req, res) => {
  getDataWithCallback((err, data) => {
    if (err) return res.status(500).send("Error: " + err.message);
    res.json({ method: "callback", data });
  });
});

// axios promise
router.get('/axios-promise', (req, res) => {
  getDataWithPromise()
    .then((data) => res.json({ method: "promise", data }))
    .catch((err) => res.status(500).send("Error: " + err.message));
});

// axios async-await
router.get('/axios-async-await', async (req, res) => {
  try {
    const data = await getDataWithAsyncAwait();
    res.json({ method: "async-await", data });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = router;