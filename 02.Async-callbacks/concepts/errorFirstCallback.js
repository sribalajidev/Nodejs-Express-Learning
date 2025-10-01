// error first callback concept example
const fs = require('fs');

// Error-first callback function to read a file
function readFileCallback(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      callback(err, null); // Pass error as first argument
    } else {
      callback(null, data); // Pass data as second argument
    }
  });
}

module.exports = readFileCallback;