import React from "react";
import DoctorCard from './DoctorCard'
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchdata";
import Loader from "../loader/Loader";
import Error from "../error/Error";
const DoctorList = () => {
    const {data:doctors,loader,error} = useFetchData(`${BASE_URL}/doctors`)
    

    return(<>
    {loader && <Loader/>}
    {error && <Error/>}
        { !loader && !error && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {doctors.map(doctor =>(<DoctorCard key={doctor._id} doctor={doctor}/>))}</div>}</>
    )
}
export default DoctorList;
