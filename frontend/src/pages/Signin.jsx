import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import { useState,useContext } from 'react';
import {toast} from 'react-toastify';
import {BASE_URL}from "../config.js";
import {authContext} from "../context/AuthContext.jsx"
const Signin = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    });

    const[loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const{dispatch} = useContext(authContext)


    const handleInputChange = e=>{
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = async event=>{
            event.preventDefault();
            setLoading(true)
            try {
                
                const res = await fetch(`${BASE_URL}/auth/login`,{
                    method:'post',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(formData)
                })
                const result = await res.json()
                if(!res.ok){
                    throw new Error(result.message);
                }
                dispatch({
                    type:'LOGIN_SUCCESS',
                    payload:{
                        user:result.data,
                        token:result.token,
                        role:result.role,
                    },
                })
                console.log(result,"login data");

                setLoading(true)
                toast.success(result.message)
                navigate('/index')
            } catch (err) {
                toast.error(err.message)
                setLoading(false)
            }}
    return(
        <section className='px-5 lg:px-0'>
            <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
            <center>   <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>Hello!!! 
                <span className='text-primaryColor'> Welcome</span> Back</h3></center>
                <form className='py-4 md:py-6' onSubmit={submitHandler}>
                    <div className='mb-5'>
                        <input type="email" placeholder="Enter Your Email" name="email" value={formData.email} onChange={handleInputChange}
                         className='w-full pr-4 py-3 border-b border-solid border-black focus:outline-none focus:border-b-black text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer' required/>
                    </div>
                    <div className='mb-5'>
                        <input type="password" placeholder="Enter Your Password" name="password" value={formData.password} onChange={handleInputChange}
                         className='w-full pr-4 py-3 border-b border-solid border-black focus:outline-none focus:border-b-black text-[16px] leading-7 text-headingColor placeholder:text-textColor  cursor-pointer' required/>
                    </div>
                    <div className='mt-7'>
                        <button type="submit" className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>Sign-In</button>
                    </div>
                    <p className='mt-5 text-textColor text-center'>don&apos;t have an account?<Link to='/signup' className="text-primaryColor font-medium ml-1">Sign-Up</Link> </p>
                </form>
            </div>
        </section>
    )
    }
export default Signin;