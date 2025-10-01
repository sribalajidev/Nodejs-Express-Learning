const express = require('express');
const router = express.Router();

// GET route - success response
router.get('/success', (req, res) => {
  res.status(200).json({
    message: 'Request successful',
    data: { info: 'This is a sample JSON response' }
  });
});

// POST route - client error example
router.post('/validate', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ 
      message: 'Validation error: name and age are required' 
    });
  }
  res.status(201).json({ message: 'Data received', data: req.body });
});

// GET route - server error example
router.get('/error', (req, res) => {
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = router;

// Use Postman to send GET/POST requests to:
// http://localhost:3000/api/concepts/success
// http://localhost:3000/api/concepts/validate (POST with JSON body { "name": "user", "age":23 })
// http://localhost:3000/api/concepts/error


// Commonly used HTTP status codes
// | Status Code | Name / Meaning        | Use Case / When to Use                                                                                  |
// | ----------- | --------------------- | ------------------------------------------------------------------------------------------------------- |
// | 200         | OK                    | The request succeeded, and the server is returning the requested data. Typically used for GET requests. |
// | 201         | Created               | Successfully created a new resource. Typically used for POST requests that create something.            |
// | 204         | No Content            | Request succeeded but there’s no content to send back. Often used for DELETE requests.                  |
// | 400         | Bad Request           | The client sent an invalid request (e.g., missing required fields, validation errors).                  |
// | 401         | Unauthorized          | Authentication is required or has failed.                                                               |
// | 403         | Forbidden             | The client is authenticated but does not have permission for this resource.                             |
// | 404         | Not Found             | The requested resource does not exist.                                                                  |
// | 500         | Internal Server Error | Something went wrong on the server side.                                                                |
// | 502         | Bad Gateway           | The server received an invalid response from an upstream server.                                        |
// | 503         | Service Unavailable   | The server is temporarily unable to handle the request (maintenance or overload).                       |

// Pair status codes with a JSON response containing a message and optionally data or error info. Example:
// Successful GET
// res.status(200).json({ message: "All notes retrieved", notes: notesArray });

// Creating a resource
// res.status(201).json({ message: "Note created", note: newNote });

// Handling not found
// res.status(404).json({ message: "Note not found" });

// Validation error
// res.status(400).json({ message: "Title is required" });

// Optional logging: For server-side debugging, you can log status codes with messages:
// console.log(`Request completed with status: ${res.statusCode}`);

