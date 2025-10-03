// Friends list and CRUD Operation
const express = require('express');
const router = express.Router();

// In-memory storage for friends list
let friendLists = {
  "user1@mail.com": { firstName: "John", lastName: "Doe", DOB: "1990-01-01" },
  "user2@mail.com": { firstName: "Jane", lastName: "Smith", DOB: "1992-05-12" }
};

// GET all datas
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'All Friends list retrieved',
    friendLists
  });
});

// Get specific data
router.get('/:email', (req, res) => {
  const email = req.params.email;
  if (!friendLists[email]) {
    return res.status(404).json({ message: 'Friend not found' });
  }
  res.send(friendLists[email]);
});

// Add data to list
router.post('/', (req, res) => {
  if (req.body.email) {
      // Create or update friend's details based on provided email
      friendLists[req.body.email] = {
          "firstName": req.body.firstName,
          "lastname": req.body.lastName,
          "DOB": req.body.DOB
      };
    }
    // Send response indicating user addition
    res.send("The user" + (' ') + (req.body.firstName) + " Has been added!");
});

// update data to list
router.put('/:email', (req, res) => {
  const email = req.params.email;
  let friend = friendLists[email]; // retrive the friend object associated with email

  if (friend) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let DOB = req.body.DOB;
    if(firstName) {
      friend["firstName"] = firstName;
    }
    if(lastName) {
      friend["lastName"] = lastName;
    }
    if(DOB) {
      friend["DOB"] = DOB;
    }
    friendLists[email] = friend;  // Update friend details in 'friends' object
    res.send(`Friend with the email ${email} updated.`);
  } else {
      // Respond if friend with specified email is not found
      res.send("Unable to find friend!");
  }

});

// Delete data from list
router.delete('/:email', (req, res) => {
  const email = req.params.email;
  if (email) {
    delete friendLists[email];
    res.send(`Friend with the email ${email} deleted.`);
  } else {
      // Respond if friend with specified email is not found
      res.send("Unable to find friend!");
  }
});


module.exports = router;