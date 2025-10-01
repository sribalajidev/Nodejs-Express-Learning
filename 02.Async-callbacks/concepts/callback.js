// callback concept example

// simple callback function
function greetUser(name, callback) {
  console.log('Inside greetUser function');
  callback(`Hello, ${name}! Welcome to Nodejs callbacks.`);
}

// using the callback
greetUser("User Name", (message) => {
  console.log(message);
})

module.exports = greetUser;