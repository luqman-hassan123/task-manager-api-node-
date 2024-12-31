const express = require('express');
const { getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/tasksController');
const authenticate = require('../middleware/auth');  // Import the authentication middleware


const router = express.Router();

// Route to get all tasks (protected)
router.get('/', authenticate, getAllTasks);  // Only authenticated users can access this route

// Route to get a task by ID (protected)
router.get('/:id', authenticate, getTaskById);  // Only authenticated users can access this route

// Route to create a new task (protected)
router.post('/', authenticate, createTask);  // Only authenticated users can create tasks

// Route to update a task by ID (protected)
router.put('/:id', authenticate, updateTask);  // Only authenticated users can update tasks

// Route to delete a task by ID (protected)
router.delete('/:id', authenticate, deleteTask);  // Only authenticated users can delete tasks

module.exports = router;
