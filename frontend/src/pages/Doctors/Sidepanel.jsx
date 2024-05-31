/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {BASE_URL, token} from './../../config'

import {toast} from 'react-toastify'
const Sidepanel = ({doctorId,ticketPrice,timeSlots}) => {
    const [loading,setLoading]= useState(false);

    const [formData, setFormData] = useState({
        day:"",
        
    
    });
    const bookingHandler =async()=>{
        try {
            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`,{
                method:'post',
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            const data = await res.json()
            if(!res.ok){
                throw new Error(data.message + 'please try again later')
            }
            if(data.session.url){
                window.location.href = data.session.url
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    const handleInputChange = e=>{
        setFormData({...formData, [e.target.name]: e.target.value });
    };
    const submitHandler = async event=>{
    
        event.preventDefault();
        setLoading(true)
        try {
            
            const res = await fetch(`${BASE_URL}/booking/checkout-session/${doctorId}`,{
                method:"post",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(formData),
            })
            const {message} = await res.json()
            if(!res.ok){
                throw new Error(message)
            }
            setLoading(false)
            toast.success(message)
            
        } catch (err) {
            toast.error(err.message)
            setLoading(false)
        }
    }
    
    return(
        <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
               <div className='flex items-center justify-between'>
                <p className='text__para mt-0 font-semibold'>price</p>
                <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>Rupees:{ticketPrice} only</span>
            </div>
            <div className='mt-[30px]'>
                <p className='text__para mt-0 font-semibold text-headingColor'>Available Time Slots</p>
            </div>
            <ul className='mt-3'>
                {timeSlots?.map((item,index)=>
                <li key={index} className='flex items-center justify-between mb-2'>
                    <form onSubmit={submitHandler}> <input
              type="radio"
              value={formData.day}
             
              onChange={handleInputChange}/></form>
            {item.day.toUpperCase()}
         

                    <p className='text-[15px] leading-6 text-textColor font-semibold'>{item.startingTime} - {item.endingTime}</p>
                </li>
            )}
                
                
            </ul>
            <div className="d-flex flex-column pt-2 mt-2">
                
            
                </div>
<p className='text__para '>[Your appointment will be valid for the working hours mentioned by doctor right from the time you book. so consult the doctor on the same day when you make]</p>
          
            <button  type="submit" onClick={bookingHandler} className='btn px-2 w-full rounded-md'>Book Appointment</button>
        </div>
    )
}
export default Sidepanel