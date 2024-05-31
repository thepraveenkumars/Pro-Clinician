import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    

    role:{type:String,enum:["patient","doctor"]},
    
    photo:{type:String},
    bloodType:{type:String},
    appointments:[{type:mongoose.Types.ObjectId,ref:"Appointment"}],
    
});
export default mongoose.model("User",UserSchema);