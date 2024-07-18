import mongoose, { model, Schema } from "mongoose";

const userSchema= new Schema({

name:{
type:String,
reqired:true

},
email:{

    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
},{
    versionKey:false
})


export default  mongoose.models.User ||  model ("User",userSchema)