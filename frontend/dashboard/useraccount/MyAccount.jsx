import {useContext,useState} from "react";
import{authContext} from "../../src/context/AuthContext"
import MyBooking from './MyBooking'
import Profile from './Profile'
import Loader from "../../src/components/loader/Loader"
import Error from "../../src/components/error/Error"
import useGetProfile from '../../src/hooks/useFetchdata'
import { BASE_URL } from "../../src/config";
const MyAccount = () => {

 const [tab,setTab]=useState("booking")
 const {dispatch}= useContext(authContext)
 const{data:userData,loader,error}= useGetProfile(`${BASE_URL}/users/profile/me`)
 console.log(userData,'userdata')
 const handleLogout = () =>{
    dispatch({type:'LOGOUT'})
 }

        return(
        <section><div className="max-w-[1170px] px-5 mx-auto">
            {loader && !error && <Loader/>}
            {error && !loader && <Error errMessage={error} />}
        {
            !loader && !error &&(
                <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
                <div className="flex items-center justify-center">
                    <figure className="w-[100px] h-[100] rounded-full border-2 border-solid border-primaryColor">
                        <img src={userData.photo} alt="" className="w-full h-full"/>

                    </figure>
                </div>
                <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">Name: {userData.name}</h3>
                <p className="text-[18px] leading-[30px] text-headingColor font-bold">Email: {userData.email}</p>
                <p className="text-[18px] leading-[30px] text-headingColor font-bold">Blood Type: {userData.bloodType}</p>
               
             </div>
           <div className="mt-[50px] md:mt-[100px]">
            <button onClick={handleLogout} className="w-full btn text-[16px] leading-7 rounded-md">Logout</button>
            <button className="w-full btn mt-4 p-3 text-[16px] leading-7 rounded-md">Delete Account</button>
          
           </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
                <div>
                      <button onClick={()=>setTab('setting')} className={` ${tab=='setting' && 'bg-primaryColor text-white font-normal'}p-2 mr-5 px-5 rounded-md text-black font-bold text-[20px] leading-7 border border-solid border-primaryColor`}>My Profile</button>
                      <button onClick={()=>setTab('booking')} className={` ${tab=='booking' && 'bg-primaryColor text-white font-normal'}p-2 mr-5 px-5 rounded-md text-black font-bold text-[20px] leading-7 border border-solid border-primaryColor`}>My Bookings</button>
               
                </div>
{tab =='setting' && <Profile user={userData}/>}{tab =='booking' && <MyBooking user={userData}/>}
            </div>
        </div>
            )
        }
    </div></section>
)};
export default MyAccount;