import { useEffect, useState } from 'react'
import DoctorCard2 from '../../src/components/doctor/DoctorCard2';
import { BASE_URL } from "../../src/config"
import useFetchData from "../../src/hooks/useFetchdata"
import Loader from "../../src/components/loader/Loader";
import Error from "../../src/components/error/Error";
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
        
        <section>
            <div className='container'>
            {loader && <Loader/>}
    {error && <Error/>}
                { !loader && !error &&(<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:gap'>
                    {doctors.map(doctor => (
                        <DoctorCard2 key={doctor.id} doctor={doctor}/>
                    ))}
                </div>)}
            </div>
        </section>
        </>
    )
}
export default Doctors;