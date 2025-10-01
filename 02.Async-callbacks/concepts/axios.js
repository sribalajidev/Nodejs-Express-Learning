const axios = require("axios");

// A public test API (JSONPlaceholder)
const API_URL = "https://jsonplaceholder.typicode.com/posts/1";

// callback concept
function getDataWithCallback(callback) {
  axios.get(API_URL)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((error) => {
      callback(error, null);
    });
}

// promise concept
function getDataWithPromise() {
  return axios.get(API_URL)
          .then((response) => response.data)
          .catch((error) => { throw error; });  
}

// async-await concept
async function getDataWithAsyncAwait() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getDataWithCallback,
  getDataWithPromise,
  getDataWithAsyncAwait
}