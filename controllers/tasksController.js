const tasks = require('../data/tasks.json');

// Get all tasks
exports.getAllTasks = (req, res) => {
    res.status(200).json(tasks);
};

// Get a task by ID
exports.getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
};

// Create a new task
exports.createTask = (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: req.body.completed || false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

// Update a task by ID
exports.updateTask = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    task.title = req.body.title || task.title;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
    res.status(200).json(task);
};

// Delete a task by ID
exports.deleteTask = (req, res) => {
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(index, 1);
    res.status(204).send(); // No content
};
