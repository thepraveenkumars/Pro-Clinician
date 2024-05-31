import React from "react";
import aboutimg from "../../assets/images/aboutimg.jpg"

import { Link } from "react-router-dom";

const Aboutus = () => {
    return (
        <section>
            <div className="container">
                <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
                    {/*===========about image==========*/}
                    <div className="relativ w3/4 lg:w-1/2 xl:w-[720px] z-10 order-2 lg:order-1">
                        <img src={aboutimg} alt="" height={"150px"} width={"250px"}/>
                        
                       
                    </div>
                    {/*==============about content=============*/}
                    <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                        <h2 className="heading">
                            Proud to be one of the nations best
                        </h2>
                        <p className="text__para ">
                            for 30 years in a row, Indian news and world report has recognized us as one of the best 
                            publics hospitals in the nationand #1 in the karnataka. 
                        </p>
                        <p className="text__para mt-[30px] ">
                            Our best is something we strive to for each day, caring for our patients-not looking back at what we accomplished but towards what we can do tomorrow.
                            Providing the best.
                        </p>
                        <Link to='/'><button className="btn">Learn more</button></Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Aboutus;