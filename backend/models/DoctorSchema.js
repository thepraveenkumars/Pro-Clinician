import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    email:{
        type:String, required:true, unique: true
    },
    password:{
        type:String, required:true
    },
    name:{
        type:String, required:true
    },
    phone:{
        type:Number
    },
    photo:{
        type:String
    },
    ticketPrice:{
        type:Number
    },
    role:{
        type:String
    },
    
    //feilds only for doctors
    specialization:{ type:String },
    registrationnumber:{type:Number},
    yearofregistration:{type:Number},
    smc:{type:String},
    qualification:{type:Array,},
    experiences:{type:Array,},
    bio:{type:String,maxLength:50},
    about:{type:String},
    timeSlots:{type:Array},
    day:{type:Array},
    reviews:[{type:mongoose.Types.ObjectId,ref:"Review"}],
    averageRating:{type:Number,default:0},
    totalRating:{type:Number,default:0},
    isActive:{type:String,enum:["inactive","active","rejected"],default:"inactive",},
    appointments:[{type:mongoose.Types.ObjectId,ref:"Appointment"}],
    
});
export default mongoose.model("Doctor",DoctorSchema);