const taskservices=require('../services/task.service');

const createTask = async (req, res,next ) => {
    try{
        const task = await taskservices.createTask(req.body); 
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task: task
        });
    }
    catch(error){
        next(error);
    }
}
const getTasks=async(req,res,next)=>{
    try{
        const tasks= await  taskservices.getTasks();
        res.json({
            success: true,
            message: "Tasks fetched successfully",
            tasks: tasks
        });
    }
    catch(error){
        next(error);
    }
}
const getTaskById=async(req,res,next)=>{
    try{
        const taskId=(req.params.id);
        const task=await taskservices.getTaskById(taskId);
        if(!task){
            return res.status(404).json({
                success:false,
                message:"task not found"
            });
        }
        res.json({
            success:true,
            message:"task fetched successfully",
            tasks:task
        }); 

    }
    catch(error){
        next(error);  }  
}
const UpdateTask=async(req,res,next)=>{
    try{
        const taskId=req.params.id;
        const task= await taskservices.updateTask(taskId, req.body);
        if(!task){
            return res.status(404).json({
                success:false,
                message:"task not found"
            });
        }
        res.json({
            success:true,
            message:"task updated successfully",
            tasks:task
        });
    }
    catch(error){
        next(error);
    }
}
const DeleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;

        const task = await taskservices.deleteTask(taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "task not found"
            });
        }

        res.json({
            success: true,
            message: "task deleted successfully",
            task: task
        });
    }
    catch (error) {
        next(error);
    }
};
module.exports={
    createTask,
    getTasks,
    getTaskById,
    UpdateTask,
    DeleteTask
};
