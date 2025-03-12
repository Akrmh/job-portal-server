// importing express
const express = require('express');

// import controllers
const getUsersController = require('../controllers/users/getUsers');
const getUserController = require('../controllers/users/getUser');
const createUserController = require('../controllers/users/createUser');
const updateUserController = require('../controllers/users/updateUser');
const deleteUserController = require('../controllers/users/deleteUser'); 
const authMiddleware = require('../../middleware/authMiddleware');


// create a router instance
const router = express.Router();

// Get users route 
router.get('/users',authMiddleware, getUsersController);

// Get user route
router.get('/users/:userId', getUserController);

// Create a user route
router.post('/users', createUserController);

// Update a user route
router.put('/users/:userId', updateUserController);


// Delete a user route
router.delete('/users/:userId', deleteUserController); 

module.exports = router;