import mongoose, { model, Schema } from "mongoose";
const taskSchema= new Schema({
name:{
type:String ,
},
user:{
    type:Schema.Types.ObjectId,
    ref:"User",
},
category:{
    type:Schema.Types.ObjectId,
    ref:"Category",
},
shared:{
    type:String,
    required:true,
    enum:["public","private"]
}
},
{versionKey:false}
)



export default  mongoose.models.Task ||  model ("Task",taskSchema)