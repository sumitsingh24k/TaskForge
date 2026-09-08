const Task = require('../models/Task');

const httpError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

// task dhoondo aur ownership verify karo
const findOwnedTask = async (taskId, userId) => {
    const task = await Task.findById(taskId);

    if (!task) {
        throw httpError('Task not found', 404);
    }

    if (task.user.toString() !== userId.toString()) {
        throw httpError('Access denied', 403);
    }

    return task;
};

const createTask = async (taskData, userId) => {
    // client jo bhi bheje, task ka owner hamesha logged-in user hi hoga
    const { user, _id, ...safeData } = taskData;
    return await Task.create({ ...safeData, user: userId });
};

const getTasks = async (userId) => {
    return await Task.find({ user: userId }).sort({ createdAt: -1 });
};

const getTaskById = async (taskId, userId) => {
    return await findOwnedTask(taskId, userId);
};

const updateTask = async (taskId, updateData, userId) => {
    await findOwnedTask(taskId, userId);

    // owner change nahi hone dena
    const { user, _id, ...safeData } = updateData;

    return await Task.findByIdAndUpdate(taskId, safeData, {
        new: true,
        runValidators: true
    });
};

const deleteTask = async (taskId, userId) => {
    await findOwnedTask(taskId, userId);
    return await Task.findByIdAndDelete(taskId);
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
