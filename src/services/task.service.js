const Task=require('../models/Task');


const createTask=async(taskData, userId)=>{
    const task=await Task.create({...taskData, user: userId});
    return task;
}
const getTasks=async( userId )=>{
    const tasks=await Task.find({ user: userId });
    return tasks;
}

const getTaskById=async(taskId, userId)=>{
    const task = await Task.findById(taskId);
    if (!task || task.user.toString() !== userId) {
        throw new Error("Task not found or access denied");
    }
    return task;
}
const updateTask=async(taskId, updateData, userId)=>{
    const task = await Task.findById(taskId);
    if (!task || task.user.toString() !== userId) {
        throw new Error("Task not found or access denied");
    }
    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true, runValidators: true });
    return updatedTask;
};
const deleteTask=async(taskId,userId  )=>{
    const task = await Task.findById(taskId);
    if (!task || task.user.toString() !== userId) {
        throw new Error("Task not found or access denied");
    }
    return await Task.findByIdAndDelete(taskId);
}
module.exports={createTask, getTasks, getTaskById, updateTask, deleteTask}; 