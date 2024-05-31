import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js"

export const updateDoctor = async(req,res)=>{
    const id = req.params.id

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            {$set:req.body} ,
            {new:true}
            );
            res
                .status(200)
                .json({
                    success:true,
                    message:"successfully updated",
                    data:updatedDoctor,
                })
    } catch (error) {
        res.status(500).json({success:false,message:"failed to update"})
    }
}
export const deleteDoctor = async(req,res)=>{
    const id = req.params.id;

    try {
        await Doctor.findByIdAndDelete(
            id,
            
            );
            res
                .status(200)
                .json({
                    success:true,
                    message:"successfully deleted",
                    data:doctor,
                })
    } catch (error) {
        res.status(500).json({success:true,message:"failed to delete"})
    }
}
export const getSingleDoctor = async(req,res)=>{
    const id = req.params.id

    try {
        const doctor = await Doctor.findById(
            id,
           
            ).populate("reviews").select("-password");;
            res
                .status(200)
                .json({
                    success:true,
                    message:"Doctor found",
                    data:doctor,
                })
    } catch (error) {
        res.status(400).json({success:false,message:"No Doctor found"})
    }
}

export const getAllDoctor = async(req,res)=>{
    

    try {
        const {query}=req.query
        let doctors;
        if(query){
            doctors = await Doctor.find({isActive:'active',$or:[
                {name:{$regex:query,$options:"i"}},
                {specialization:{$regex:query,$options:"i"}}
            ],
        }).select("-password");
        }else{
             doctors = await Doctor.find(
                {isActive:"active"}).select("-password");
        }
        
            res
                .status(200)
                .json({
                    success:true,
                    message:"Doctor found",
                    data:doctors,
                })
    } catch (error) {
        res.status(400).json({success:false,message:" Not found"})
    }
}
export const getDoctorProfile = async(req,res)=>{
    const doctorId = req.userId
    try {
        const doctor= await Doctor.findById(doctorId)
        if(!doctor){
            return res.status(200).json({success:true})
        }
        const{password,...rest}=doctor._doc;
        const appointments = await Booking.find({doctor:doctorId})
        res.status(200).json({success:true,message:"profile info is being loaded",data:{...rest,appointments}})
    } catch (error) {
        res.status(500).json({success:false,message:"something went wrong, we are unable to fetch the data"})
    }
}