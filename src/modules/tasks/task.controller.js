import Task from "../../../Database/models/task.model.js";

import { ErrorHandlerClass } from "../../utilis/error-class.utilis.js";

// CRUD Operations For Task

// ===================================================Create New Task=================================================

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {message ,task}
 * @description add new task 
 */


export const addTask= async (req,res,next)=>{

// destruct data from body

const {name,user,category,shared}=req.body;
// collect data in object
const taskObject={
    name,
    user,
    category,
    shared
}

// create new Task
const  newTask= await Task.create(taskObject)
// response
res.status(201).json({
    message:"Task added Successfully",newTask
})
}


// ==============================================================-retrieve all Tasks====================================

/**
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message, visibleTasks}
 * @description list visible tasks
 * 
 */

export const  listTasks= async(req,res,next)=>{

const visibleTasks=await Task.find({$or:[{shared:"public"},{shared:"private",user:req.authUser._id}]}).populate([{path:"user"}]).populate([{path:"category"}])
// response
 res.status(200).json({
    message:"Success",
   visibleTasks
})
}

  //============================================================== update Task===================================================

/**
 * @param {object} req
 * @param {object} res 
 * @param {object} next 
 * @returns {message,updatedTask}
 * @description update task by owner
 */
  export const updateTask=async(req,res,next)=>{
// destruct data
const {taskId}=req.params;
const {_id}=req.authUser;
const {name,category,shared}=req.body;

// update task
const updatedTask=await Task.findOneAndUpdate(
{_id:taskId,user:_id},
{name,category,shared},
{new:true})

// check if task not found
if(!updatedTask){
return next(new ErrorHandlerClass("task not found or you not authorized",400,"error from update task controller ")) 
}

// response
res.status(200).json({
    message:"task updated Successfully",updatedTask
})

}


  //==============================================delete Task==========================================================
/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {message}
 * @description delete task by owner
 */

export const deleteTask=async (req,res,next)=>{
// destruct data

const {taskId}=req.params;
const {_id}=req.authUser;

// delete task

const deletedTask=await Task.findOneAndDelete({_id:taskId,user:_id})

if(!deletedTask){

 return next(new ErrorHandlerClass("task not found or you not authorized",404,"error from delete task controller ")) 
  
}
res.status(200).json({
    message:"task deleted Successfully",deletedTask

})
}

// ==================================================Pagination===========================================================================
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message,Tasks}
 * @description return 3 tasks in each page
 */

export const tasksPagination=async(req,res,next)=>{

    const page=req.query.p || 0;
    const TasksperPage=3;
    
    // find tasks in specific page
    const Tasks= await Task.find().skip(page*TasksperPage).limit(TasksperPage)
       
    // response
    res.status(200).json({message:"success",Tasks})
        }




//======================================================= Filtering===============================================================

/**
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message,tasks}
 * @description return tasks depends on shered option in query
 */
export const filiterTasks= async(req,res,next)=> {
   
    // find tasks
    const Tasks = await Task.find({
        shared: new RegExp(req.query.shared, 'i'),
    });

    // check if tasks not found
    if(!Tasks.length){
        return next(new ErrorHandlerClass("tasks not found ",404,"error from filtring tasks controller ")) 
    }

    // response
        res.status(200).json({message:"Success",Tasks})
        
    } 

// =========================================================Sorting=================================================


/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message,sortedTasks}
 * @description return sorted tasks according to private tasks at first then public
 */

export const sortTasks=async (req,res,next)=>{

//  sort data 
 const sortedTasks=await Task.find().sort({shared:1})
// response
res.status(200).json({message:"Success",sortedTasks})
}