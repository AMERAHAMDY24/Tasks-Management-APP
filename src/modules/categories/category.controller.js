import Category from "../../../Database/models/category.model.js";

import { ErrorHandlerClass } from "../../utilis/error-class.utilis.js";

// CRUD Operations For Category
// 1-Create New Category

/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {message ,category}
 * @description add new task 
 */

export const addCategory= async (req,res,next)=>{

// destruct data from body
const {name,user}=req.body;

// collect data in object
const categoryObject={
    name,
    user,
}

//============================================ create new category=================================================

const  newCategory= await Category.create(categoryObject)

// response
res.status(201).json({
    message:"category added Successfully",newCategory
})
}


// =================================================-retrieve all categories========================================

/**
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message, listCategories}
 * @description list categories
 * 
 */

export const  listCategory= async(req,res,next)=>{


// find categories
const listCategories=await Category.find().populate([{path:"user"}])

// check
if(!listCategories){
return next(new ErrorHandlerClass("category not found or you not authorized",404,"error from get categories controller ")) 

}

// response
 res.status(200).json({
    message:"Success",
   listCategories
})
}

  //============================================================update category=====================================

/**
 * @param {object} req
 * @param {object} res 
 * @param {object} next 
 * @returns {message,updatedCategory}
 * @description update category by owner
 */
  export const updateCategory=async(req,res,next)=>{
// destruct data
const {categoryId}=req.params;
const {_id}=req.authUser;
const {name}=req.body;

// update category
const updatedCategory=await Category.findOneAndUpdate(
{_id:categoryId,user:_id},
{name},
{new:true})

// check if category not found
if(!updatedCategory){
return next(new ErrorHandlerClass("category not found or you not authorized",400,"error from update category controller ")) 
}

// response
res.status(200).json({
    message:"category updated Successfully",updatedCategory
})

}


  //===========================================- delete category =============================================
/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {message}
 * @description delete category by owner
 */

export const deleteCategory=async (req,res,next)=>{
// destruct data

const {categoryId}=req.params;
const {_id}=req.authUser;

// delete category

const deletedCategory=await Category.findOneAndDelete({_id:categoryId,user:_id})

if(!deletedCategory){

 return next(new ErrorHandlerClass("category not found or you not authorized",400,"error from delete category controller ")) 
  
}
// response
res.status(200).json({
    message:"category deleted Successfully",deletedCategory

})
}



// ==================================================Pagination===========================================================================
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message,Tasks}
 * @description return 3 categories in each page
 */

export const categoryPagination=async(req,res,next)=>{

    const page=req.query.p || 0;
    const categoryPerPagination=3;
    
    // find categories in specific page
    const Categories= await Category.find().skip(page*categoryPerPagination).limit(categoryPerPagination)
       
    // response
    res.status(200).json({message:"success",Categories})
        }




//======================================================= Filtering===============================================================

/**
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message,tasks}
 * @description return categories depending on category name
 */
export const filiterCategories= async(req,res,next)=> {
   
    // find categories
    const Categories = await Category.find({
        name: new RegExp(req.query.name, 'i'),
    });

    // check if categories not found
    if(!Categories.length){
        return next(new ErrorHandlerClass("categories not found ",404,"error from filtring categories controller ")) 
    }

    // response
        res.status(200).json({message:"Success",Categories})
        
    } 

// =========================================================Sorting=================================================


/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns {message,sortedCategories}
 * @description return sorted categories 
 */

export const sorteCategories=async (req,res,next)=>{

//  sort data 
 const sortedCategories=await Category.find().sort({name:1})
// response
res.status(200).json({message:"Success",sortedCategories})
}