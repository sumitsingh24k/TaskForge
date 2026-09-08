const taskservices = require('../services/task.service');

const createTask = async (req, res, next) => {
    try {
        const task = await taskservices.createTask(req.body, req.user.id);
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: task
        });
    }
    catch (error) {
        next(error);
    }
};

const getTasks = async (req, res, next) => {
    try {
        const tasks = await taskservices.getTasks(req.user.id);
        res.json({
            success: true,
            message: "Tasks fetched successfully",
            tasks: tasks
        });
    }
    catch (error) {
        next(error);
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const task = await taskservices.getTaskById(req.params.id, req.user.id);
        res.json({
            success: true,
            message: "Task fetched successfully",
            task: task
        });
    }
    catch (error) {
        next(error);
    }
};

const UpdateTask = async (req, res, next) => {
    try {
        const task = await taskservices.updateTask(req.params.id, req.body, req.user.id);
        res.json({
            success: true,
            message: "Task updated successfully",
            task: task
        });
    }
    catch (error) {
        next(error);
    }
};

const DeleteTask = async (req, res, next) => {
    try {
        const task = await taskservices.deleteTask(req.params.id, req.user.id);
        res.json({
            success: true,
            message: "Task deleted successfully",
            task: task
        });
    }
    catch (error) {
        next(error);
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    UpdateTask,
    DeleteTask
};
