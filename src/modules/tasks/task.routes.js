import { Router } from "express";

import * as taskController from "./task.controller.js"

import { auth } from "../../middlewares/authentication.middleware.js";
import { errorHandling } from "../../middlewares/error-handle.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";


import { addTaskSchema, updateTaskSchema } from "./task.schema.js";



const taskRouter=Router();


taskRouter.post("/addTask",auth(),validation(addTaskSchema),errorHandling(taskController.addTask))

taskRouter.get("/getTasks",auth(),errorHandling(taskController.listTasks))

taskRouter.put("/updateTask/:taskId",auth(),validation(updateTaskSchema),errorHandling(taskController.updateTask))

taskRouter.delete("/deleteTask/:taskId",auth(),errorHandling(taskController.deleteTask))

taskRouter.get("/filterTasks",errorHandling(taskController.filiterTasks))

taskRouter.get("/tasksPagination",errorHandling(taskController.tasksPagination))

taskRouter.get("/sortTasks",errorHandling(taskController.sortTasks))



export default taskRouter;