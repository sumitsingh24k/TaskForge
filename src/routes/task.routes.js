const express= require('express');
const router=express.Router();
const  { createTask , getTasks ,getTaskById,UpdateTask,DeleteTask}=require('../controllers/task.controller');


router.get('/',getTasks);
router.get('/:id',getTaskById);
router.post('/',createTask);
router.patch('/:id',UpdateTask);
router.delete('/:id',DeleteTask);

module.exports=router;