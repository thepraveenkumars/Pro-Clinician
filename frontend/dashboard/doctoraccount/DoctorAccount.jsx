import{ useState } from 'react'
import useGetProfile from "../../src/hooks/useFetchdata"
import { BASE_URL } from '../../src/config'
import Loader from '../../src/components/loader/Loader'
import Error from '../../src/components/error/Error'

import Tabs from './tabs'
import DoctorAbout from "../../src/pages/Doctors/DoctorAbout"
import Profile from "../doctoraccount/Profile"
import Appointments from './Appointments'
const MyAccount = () => {
   const{data,loader,error} = useGetProfile(`${BASE_URL}/doctors/profile/me`);
   const [tab,setTab]=useState('overview')
    return(
        <section>
            <div className='max-w-[1170] px-5 mx-auto '>
                {loader && !error &&<Loader/>}{error && !loader &&<Error/>}
                {
                    !loader && !error &&(<div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
                            <Tabs tab={tab} setTab={setTab}/>
                            <div className='lg:col-span-2'>
                            {data.isApproved=='pending' && (<div className='flex p-4 mb-4 text-yellow-80 bg-yellow-50 rounded-lg'>
                                <span className='sr-only'>Info</span>
                                <div className='ml-3 text-sm font-medium'>To get approval please complete your profile. we will review manually and approve within 3 working days</div>
                            </div> )}
                            <div className='mt-8'>
                                {tab=='overview'&& (
                                    <div>
                                        <div className='flex items-center gap-4 mb-10'>
                                            <figure className='max-w-[200px] max-h-[200px]'>
                                                <img src={data?.photo} alt="" className='w-full'/>
                                            </figure>
                                            <div>
                                                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold'>{data.specialization}</span>
                                       <h3 className='text-[22px] leading-9 font-bold text-headingColor'>Dr.{data.name}</h3>
                                       <div className='flex items-center gap-[6px] '>
                                        <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] leading-6 font-semibold'>total-rating:{data.totalRating}</span>
                                       
                                       </div>
                                       <div className='flex items-center gap-[6px] '>
                                        <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] leading-6 font-semibold'>average-rating:{data.averageRating}</span>
                                       
                                       </div>
                                       <p className='text__para font-[15px] lg:max-w-[390] leading-6'>{data.bio}</p>


                                        </div>
                                    </div>
                                    <DoctorAbout name={data.name} about={data.about} qualification={data.qualification} experiences={data.experiences}/>
                                </div>

                                )}
                            
                                {tab=='settings'&& <Profile  doctorData={data}/>}
                                {tab=='appointments'&& <Appointments appointments={data.appointments}/>}
                                </div>
                        </div></div>
                )}
            
            </div>
        </section>
    )
}
export default MyAccount;