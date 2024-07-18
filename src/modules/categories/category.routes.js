import { Router } from "express";

import * as categoryController from "./category.controller.js"

import { errorHandling } from "../../middlewares/error-handle.middleware.js";
import { auth } from "../../middlewares/authentication.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";


import { addCategorySchema, updateCategorySchema } from "./category.schema.js";



const categoryRouter=Router();


categoryRouter.post("/addCategory",auth(),validation(addCategorySchema),errorHandling(categoryController.addCategory))

categoryRouter.get("/getCategories",errorHandling(categoryController.listCategory))

categoryRouter.patch("/updateCategory/:categoryId",auth(),validation(updateCategorySchema),errorHandling(categoryController.updateCategory))


categoryRouter.delete("/deleteCategory/:categoryId",auth(),errorHandling(categoryController.deleteCategory))

categoryRouter.get("/filterCategories",errorHandling(categoryController.filiterCategories))

categoryRouter.get("/categoriesPagination",errorHandling(categoryController.categoryPagination))

categoryRouter.get("/sortCategories",errorHandling(categoryController.sorteCategories))


export default categoryRouter;