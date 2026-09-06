const Task=require('../models/Task');


const createTask=async(taskData)=>{
    const task=await Task.create(taskData);
    return task;
}
const getTasks=async()=>{
    const tasks=await Task.findall();
    return tasks;
}

const getTaskById=async(taskId)=>{
    const task = await Task.findById(taskId);
    return task;
}
const updateTask=async(taskId, updateData)=>{
    const task=await Task.findByIdAndUpdate(taskId, updateData, { new: true });
    return task;
}

const deleteTask=async(taskId)=>{
    const task= await Task.findByIdAndDelete(taskId);
    return task;
}
module.exports={createTask, getTasks, getTaskById, updateTask, deleteTask};