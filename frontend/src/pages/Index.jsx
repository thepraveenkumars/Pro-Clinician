/* eslint-disable no-unused-vars */
import React from 'react'

import Aboutus from '../components/aboutus/Aboutus';
import Select from '../components/select/Select';
import ServiceList from '../components/services/ServiceList'
import { Link } from 'react-router-dom';
import hr from '../assets/images/hr.png';
import DoctorList from '../components/doctor/DoctorList';
import Footer from '../components/footer/Footer';


const Home = () => {
    return(
<>
        {/* ================hero section================*/}
    
        <section className="hero_section pt-[60px] 2xl:h-[700px]">
            <div className='container'>
                <section  className='flex flec-col lg:flex-row gap-[90px] items-center justify-between'>
                    {/*===================hero content===========*/}
                    <div>
                        <div className='lg:w-[570px]'>
                            <h1 className='text-[36px] leading-[46px] text-white font-[800] md:text-[60px] md:leading-[70px]'>
                                we help patients to select & connect with an expert.
                            </h1>
                          <b>  <p className='text_para'>Our core values are built around the thought of patient-first and that each doctor at Proclinician is a human care expert,
                               going above and beyond the call of duty as they live by the belief that every single life is priceless. When they embark on 
                               these journeys, stories emerge - stories of grit, determination and never giving up.</p></b>
                                <button className='btn'>Request an Appointment</button>
                        </div></div>
                        </section>
                      
                <br></br><br></br> 
                                
             </div>
        <section><Select/></section>
            

        <section>  <Aboutus/></section>
        <section>
            <div className='container'>
                <div className='xl:w-[470px] mx-auto'>
                    <h2 className='heading text-center'>Our Great Experts</h2>
                    
                </div>
                <DoctorList/> 
            </div>
             </section>

        <section>
            <div className='container'>
                <div className='flex items-center justify-between flex-col lg:flex-row'>
                    <div className='xl:w-[670px]'>
                        <h2 className='heading'>
                            Get virtual treatment<br />anytime.
                        </h2>
                        <ul className="pl-4">
                            <li className='text__para'>
                                1.Schedule the Appointment directly.
                            </li>
                            <li className='text__para'>
                                2.Search for your physician here, and contact their office.
                            </li>
                            <li className='text__para'>
                                3.View our physician who are accepting new patients, use the online scheduling tool to select an appointment time.
                            </li>
                        </ul>
                        <Link to='/'><button className="btn">Learn More</button></Link>
                    </div>
                    <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
                        <img src={hr}  className="w-3/4" alt=""/>
                    </div>
                </div>
            </div>
        </section>
        <section>
        <div className='xl:w-[400px] mx-auto'>
                    <h2 className='heading text-center'>Our Services</h2>
                   
                </div>
                <ServiceList/> <div><Footer/></div>
        </section>
        
          
             
        
            </section>
            
            </> 
    
    );
};
export default Home;