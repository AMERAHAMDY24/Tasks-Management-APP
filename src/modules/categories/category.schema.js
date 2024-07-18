import Joi from "joi";

import { objectIdValidation } from "../../utilis/objectId.validation.js";



  // add Task Schema.
  export const addCategorySchema={
    body:Joi.object({
        name:Joi.string().required(),
        user:Joi.string().custom(objectIdValidation).required()

    }),   
    }
    


  // update task Schema.
  export const updateCategorySchema={
    body:Joi.object({

    name:Joi.string().required(),

    })}
    