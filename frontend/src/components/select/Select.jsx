import React from "react";
import hr from "../../assets/images/hr.png"
import icon2 from "../../assets/images/icon2.png"
import icon3 from "../../assets/images/icon3.png"
import {Link} from 'react-router-dom';
import {BsArrowRight} from 'react-icons/bs'
const Select = () => {
    return <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>     
                                 
    < div className='py-[30px] px-5'>
        <div className='flex items-center justify-center'>
            <img src={hr} alt="" height={"250px"} width={"250px"}/></div>
    
    <div className='mt-[30px]'>
        <h2 className='text-[26px] leading-7 font-[700] text-center'>
            Find A doctor
        </h2>
       <b> <p className=' text-center'>
            We are here to assisst you in finding the best clinician so select and connect
        </p></b>
        <Link to="/doctor" className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group bover:bg-primaryColor hover:border-none'>
            <BsArrowRight className="group-hover:text-white w-6 h-5"/>
        </Link>
        
    </div>
    
   
        
    </div>
    < div className='py-[30px] px-5'>
        <div className='flex items-center justify-center'>
            <img src={icon2} alt=""  height={"250px"} width={"250px"}/></div>
    
    <div className='mt-[30px]'>
        <h2 className='text-[26px] leading-7 font-[700] text-center'>
            Find Location
        </h2>
       <b> <p className=' text-center'>
            find the doctor based on their location so that you dont have have to woory about the distance
        </p></b>
        <Link to="/doctor" className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group bover:bg-primaryColor hover:border-none'>
            <BsArrowRight className="group-hover:text-white w-6 h-5"/>
        </Link>
        
    </div>
    
   
        
    </div>
    < div className='py-[30px] px-5'>
        <div className='flex items-center justify-center'>
            <img src={icon3} alt="" height={"250px"} width={"250px"}/></div>
    
    <div className='mt-[30px]'>
        <h2 className='text-[26px] leading-7 font-[700] text-center'>
            Book Your Slot
        </h2>
       <b> <p className=' text-center'>
            Select the doctor and book your slot and consult the doctor based on your convinience
        </p></b>
        <Link to="/doctor" className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group bover:bg-primaryColor hover:border-none'>
            <BsArrowRight className="group-hover:text-white w-6 h-5"/>
        </Link>
        
</div>           
</div>  </div>
};
export default Select;