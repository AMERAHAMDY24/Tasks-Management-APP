import Joi from "joi";

import { objectIdValidation } from "../../utilis/objectId.validation.js";



  // add Task Schema.
  export const addTaskSchema={
    body:Joi.object({
        name:Joi.string().required(),
        user:Joi.string().custom(objectIdValidation).required(),
        category:Joi.string().custom(objectIdValidation),
        shared:Joi.string().valid("public","private").required()

    }),   
    }
    


  // update task Schema.
  export const updateTaskSchema={
    body:Joi.object({

        name:Joi.string(),
        shared:Joi.string().valid("public","private")

    })}
    