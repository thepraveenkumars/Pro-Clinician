import React, { useState } from 'react'
import setTab from 'react'
import DoctorAbout from "../Doctors/DoctorAbout"
import star from "../../assets/images/star.png"
import Footer from "../../components/footer/Footer"
import Feedback from './Feedback'
import Sidepanel from './Sidepanel'
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchdata";
import Loader from "../../components/loader/Loader"
import Error from "../../components/error/Error";
import { useParams } from 'react-router-dom'
const DoctorDetails = () => {

    const [tab,setTab]=useState("about");

    const {id}=useParams();
    const {data:doctor,loader,error} = useFetchData(`${BASE_URL}/doctors/${id}`)

    
    const{name,qualification,experiences,timeSlots,reviews,bio,averageRating,totalRating,specialization,ticketPrice,photo,about,smc,registrationnumber,yearofregistration}=doctor;
    return(
        <section>
            <div className='max-w-[1170px] px-5 mx-auto'>
            {loader && <Loader/>}
    {error && <Error/>}
                {!loader && !error && (<div className='grid md:grid-cols-3 gap-[50px]'>
                    <div className='md:col-span-2'>
                        <div className='flex items-center gap-5'>
                        
                        <img src={photo}  alt="" className='h-full' />
                    <div>
                    <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                        {specialization}
                    </span>
                    <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold'>
                            {name}
                    </h3>
                    <div className='flex items-center gap-[6px]'>
                        <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
                            Average Rating :{averageRating}
                        </span>
                
                    </div>
                    <p className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>State Medical Council:{smc}</p>
                    <p className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>Year Of Registration:{yearofregistration}</p>
                    
                    <p className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>Registration Number:{registrationnumber}</p>
                    
                    <p className='text__para text-[14px] leading-5 md:text-[15px] max-w-[390]'>{bio}</p> </div>
                
                </div>
                <div className='mt-[50px] border-b border-solid border-black'>
                
                    <button onClick={() => setTab('about')} className={`${tab=="about" && "border-b border-solid border-PrimaryColor"}py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>About</button>
                
                <button onClick={() => setTab('feedback')} className={`${tab=="feedback" && "border-b border-solid border-PrimaryColor"}py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>Feedback</button>
                </div>
                <div className='mt-[50px]'>
                    {
                        tab=="about" && <DoctorAbout name={name} about={about} qualifiacation={qualification} qualification={qualification} experiences={experiences}/>
                    }
                    {
                       tab=="feedback" &&  <Feedback reviews={reviews} totalRating={totalRating}/>
                    }
                </div>
                </div>
                
                <div><Sidepanel doctorId={doctor._id} ticketPrice={ticketPrice} timeSlots={timeSlots}/></div>
                </div>)}
            </div><div><Footer/></div>
        </section>
    )
}
export default DoctorDetails;