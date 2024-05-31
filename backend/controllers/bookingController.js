import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import Booking from '../models/BookingSchema.js'
import Stripe from 'stripe'
import {sendMail} from '../sendMail.js';
export const getCheckoutSession = async(req,res)=>{
    
    try{

        const doctor = await Doctor.findById(req.params.doctorId)
        
        const user = await User.findById(req.userId)

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

        //STRIPE CHECKOUT

        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            success_url:`${process.env.CLIENT_SITE_URL}/checkoutsuccess`,
            cancel_url:`${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            customer_email:user.email,
            client_reference_id:req.params.doctorId,
            line_items:[
                {
                    price_data:{
                        currency:'usd',
                        unit_amount:doctor.ticketPrice * 100,
                        product_data:{
                            name:doctor.name,
                            description:doctor.bio,
                            images:[doctor.photo],
                            
                        }

                    },
                    quantity:1
                }
            ]
        })

        const booking = new Booking({
            doctor:doctor._id,
            user:user._id,
            ticketPrice:doctor.ticketPrice,
            session:session.id
        })
        await booking.save()
        await sendMail(
            user.email,
            "Booking Confirmation",
            `Hi ${user.name},\n\nYour booking with ${doctor.name} has been confirmed successfully. Thank you for choosing ProClinician.`,
            `<p>Hi ${user.name},</p><p>Your booking with ${doctor.name} has been confirmed successfully. Thank you for choosing ProClinician.</p>`
        );
        res.status(200).json({success:true,message:'Payment successfull',session})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false,message:'Payment Unsuccessfull'})
    }
}