import { Router } from "express";

import * as userController from "./user.controller.js"

import { errorHandling } from "../../middlewares/error-handle.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";

import { signInSchema, signUpSchema } from "./user.schema.js";



const userRouter=Router();

userRouter.post("/signup",validation(signUpSchema),errorHandling(userController.signup))
userRouter.post("/signin",validation(signInSchema),errorHandling(userController.signin))








export default userRouter;