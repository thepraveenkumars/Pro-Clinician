import { set } from 'mongoose';
import React from 'react';
import {BiMenu} from "react-icons/bi"
const Tabs= ({tab,setTab}) => {
    return(
      
            <div className=' lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center rounded-md'>
    
            <button 
            onClick={()=>setTab('booking')} 
            className={`${
                tab=="booking"
                ?"bg-indigo-100 text-headingColor":"bg-transparent text-headingColor text-black"
                }w-full btn mt-0 rounded-md`}>
                    My Booking
                    </button>
            <button 
            onClick={()=>setTab('setting')}
            className={`${tab=="setting"
            ?"bg-indigo-100 text-headingColor":"bg-transparent text-headingColor text-black"
                
            }w-full btn mt-0 rounded-md`}>
                My Profile
                </button>
            
           
        

        </div>
    )
}
export default Tabs;