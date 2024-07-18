import mongoose, { model, Schema } from "mongoose";

const categorySchema= new Schema({

name:{
type:String,
reqired:true

},
user:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
}
},{versionKey:
    false
})



export default  mongoose.models.Category ||  model ("Category",categorySchema)