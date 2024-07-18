
import mongoose from "mongoose";


export const dbConnection=async()=>{
try{
await mongoose.connect("mongodb://localhost:27017/task-manager-app")
console.log("database connected successfully");
}catch(error){

    console.log("Error connection to database ");

}

}

