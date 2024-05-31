/* eslint-disable no-unused-vars */
import {useContext,useState} from "react";
import{authContext} from "../../src/context/AuthContext"

import Profile from './Profile'
import Loader from "../../src/components/loader/Loader"
import Error from "../../src/components/error/Error"
import useGetProfile from '../../src/hooks/useFetchdata'
import { BASE_URL } from "../../src/config";
const MyAccount = () => {

 const [tab,setTab]=useState("booking")
 const {dispatch}= useContext(authContext)
 const{loader,error}= useGetProfile(`${BASE_URL}/admin/profile/me`)
 
 const handleLogout = () =>{
    dispatch({type:'LOGOUT'})
 }

        return(
        <section><div className="max-w-[1170px] px-5 mx-auto">
            {loader && !error && <Loader/>}
            {error && !loader && <Error errMessage={error} />}
        {
            !loader && !error &&(
                <div className="">
            <div className="">
                <div className="">
                    
             </div>
           <div className="">
           
          
           </div>
            </div>
            <div className="">
                <div>
                
                <button  className="w-full btn text-[16px] leading-7 rounded-md">active doctors</button>
               
                    
                </div>
             <Profile/>
            </div> <button onClick={handleLogout} className="w-full btn text-[16px] leading-7 rounded-md">Logout</button>
        </div>
            )
        }
    </div></section>
)};
export default MyAccount;