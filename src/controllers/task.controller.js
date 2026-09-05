const tasks=require('../data/task');

const createTask = (req, res) => {
    const { title, description, status, priority } = req.body;
    const newTask = {
        id:tasks.length +1,
        title,
        description,
        status,
        priority
    };
    tasks.push(newTask)
    res.status(201).json({
        success:true,
        message:"task is created",
        tasks:newTask
    });
}
const getTasks=(req,res)=>{
    res.json({
        success:true,
        message:"tasks fetched successfully",
        tasks:tasks
    });
}
const getTaskById=(req,res)=>{
    const taskId=parseInt(req.params.id);
    const task=tasks.find(t=>t.id===taskId);
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
const UpdateTask=(req,res)=>{
    const taskId=parseInt(req.params.id);
    const task=tasks.find(t=>t.id===taskId);
    if(!task){
        return res.status(404).json({
            success:false,
            message:"task not found"
        });
    }
    const { title, description, status, priority } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;

    res.json({
        success:true,
        message:"task updated successfully",
        tasks:task
    });
}
const DeleteTask=(req,res)=>{
    const taskId=parseInt(req.params.id);
    const taskIndex=tasks.findIndex(t=>t.id===taskId);
    if(taskIndex===-1){
        return res.status(404).json({
            success:false,
            message:"task not found"
        });
    }
    tasks.splice(taskIndex,1);
    res.json({
        success:true,
        message:"task deleted successfully"
    });
}
module.exports={
    createTask,
    getTasks,
    getTaskById,
    UpdateTask,
    DeleteTask
};
