import useFetchData from "../../src/hooks/useFetchdata";
import { BASE_URL } from "../../src/config";
import DoctorCard2 from '../../src/components/doctor/DoctorCard2'
import Loader from "../../src/components/loader/Loader";
import Error from "../../src/components/error/Error";
const MyBooking = () => {
    const {data:appointments,loader,error}= useFetchData(`${BASE_URL}/users/appointments/my-appointments`)
    const creationTime ="2024-05-26T08:00:00Z";
    console.log("parent component-creationTime:",creationTime)
    return(
        <div>
             {loader && !error && <Loader/>}
            {error && !loader && <Error errMessage={error} />}
            {!loader && !error && (<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
               {
                appointments.map(doctor=>( <DoctorCard2 doctor ={doctor}key={doctor._id} creationTime={creationTime}/>))
               }
               
            </div>)}
            {!loader && !error && appointments.length==0 && (<h2 className="mt-5 text-center text-headingColor leading-6 text-[20px] font-semibold text-primaryColor">you did not book any doctors!!!</h2>)}
        </div>
    )
}
export default MyBooking;