import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },
   
    status: {
      type: String,
      enum: ["inactive", "active", "cancelled"],
      default: "active",
    },
   
    
    isPaid: {
      type: Boolean,
      default: true,
    },
    creationTime:{
      type:Date,
      default:Date.now,
    }
    
  },
  { timestamps: true }
);
bookingSchema.pre(/^find/, function(next){
  this.populate('user').populate({
    path:'doctor',
    select:'name'
  })
  next()
})



export default mongoose.model("Booking", bookingSchema);