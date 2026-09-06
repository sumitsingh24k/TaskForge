const taskservices=require('../services/task.service');

const createTask = (req, res,next ) => {
    try{
        const task = taskservices.createTask(req.body); 
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
const getTasks=(req,res,next)=>{
    try{
        const tasks= taskservices.getTasks();
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
const getTaskById=(req,res,next)=>{
    try{
        const taskId=(req.params.id);
        const task=taskservices.getTaskById(taskId);
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
const UpdateTask=(req,res,next)=>{
    try{
        const taskId=req.params.id;
        const task= taskservices.UpdateTask(taskId, req.body);
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
const DeleteTask=(req,res,next)=>{
    try{
          const taskId= req.params.id;
          const task= taskservices.DeleteTask(taskId);
        if (!task){
            return res.status(404).json({
                success:false,
                message:"task not found"
            });
        }
        res.json({
            success:true,
            message:"task deleted successfully"
        });
    }
    catch(error){
        next(error);
    }
}
module.exports={
    createTask,
    getTasks,
    getTaskById,
    UpdateTask,
    DeleteTask
};
