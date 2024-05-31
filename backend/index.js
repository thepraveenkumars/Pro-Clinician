import express from "express"
import nodemailer from "nodemailer"
import cookieParser from "cookie-parser"
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./Routes/auth.js"
import userRoute from "./Routes/users.js"
import doctorRoute from "./Routes/doctor.js"
import reviewRoute from "./Routes/review.js"
import bookingRoute from "./Routes/booking.js"
import adminRoute from "./Routes/admin.js"
dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOption = {
    origin:true
}

app.get('/', (req,res) =>{
    res.send('Api is working')
});
//database connection
mongoose.set('strictQuery',false)
const connectDB = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
       }) 
       console.log('MongoDB connected')
    } catch (error) {
        console.log('MongoDB connection failed!!!!')
    }
}
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings',bookingRoute);
app.use('/api/v1/admin',adminRoute)



app.listen(port, () =>{
    connectDB();
    console.log('server is running on port' + port);
})




