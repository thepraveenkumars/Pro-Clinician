import { useEffect, useState } from 'react'
import DoctorCard from '../../components/doctor/DoctorCard';
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchdata";
import Loader from "../../components/loader/Loader";
import Error from "../../components/error/Error";
const Doctors = () => {
    const [query,setQuery]=useState("");
    const [debounceQuery,setDebounceQuery]=useState("");

const handleSearch=()=>{
    setQuery(query.trim())
    console.log('handle  search')
}
useEffect(()=>{
    const timeout = setTimeout(()=>{
        setDebounceQuery(query)
    },700)
    return ()=>clearTimeout(timeout)
},[query])

    const {data:doctors,loader,error} = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`)


    return(
        <>
        <section className='bg-[#FFF9EA]'>
           <div className='container text-center'>
            <h2 className='heading'>Find a doctor</h2>
            <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066FF2C] rounded-md flex items-center justify-between'>
                <input type="search" className='py-4 pl-4  pr-2 bg-transparent w-full focus:outline-none cursor-pointer' placeholder="Search doctor by name or specializationn" value={query} onChange={e=>setQuery(e.target.value)}/>
                <button className='btn mt-0 rounded-[0px] rounded-r-md'onClick={handleSearch}>
                    Search
                </button>
            </div>
                </div> 
        </section>
        <section>
            <div className='container'>
            {loader && <Loader/>}
    {error && <Error/>}
                { !loader && !error &&(<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:gap'>
                    {doctors.map(doctor => (
                        <DoctorCard key={doctor.id} doctor={doctor}/>
                    ))}
                </div>)}
            </div>
        </section>
        </>
    )
}
export default Doctors;