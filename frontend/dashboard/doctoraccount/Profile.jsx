/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {AiOutlineDelete} from 'react-icons/ai'
import uploadImageToCloudinary from './../../src/utils/uploadCloudinary'
import { BASE_URL,token } from "../../src/config";
import { toast } from "react-toastify";
const Profile=({doctorData})=>{
    const [formData, setFormData]=useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        bio:"",
        gender:"",
        photo:null,
        about:"",
        specialization:"",
        ticketPrice:"0",
        qualification:[],
        experiences:[],
        timeSlots:[],
        isActive:[],
        registrationnumber:"",
        yearofregistration:"",
        smc:"KARNATAKA",


        
    });
    const [nameError, setNameError] = useState(""); // State for name validation error message
    const [regNumberError, setRegNumberError] = useState("");
    const [yearError, setYearError] = useState(""); 
    const [phoneError, setPhoneError] = useState(""); 
    const [smcError, setSmcError] = useState("");
    const [ticketPriceError, setTicketPriceError] = useState("");

    useEffect(()=>{
        setFormData({
            name:doctorData?.name,
            email:doctorData?.email,
        
        phone:doctorData?.phone,
        bio:doctorData?.bio,
        gender:doctorData?.gender,
        photo:doctorData?.photo,
        about:doctorData?.about,
        specialization:doctorData?.specialization,
        ticketPrice:doctorData?.ticketPrice,
        qualification:doctorData?.qualification,
        experiences:doctorData?.experiences,
        timeSlots:doctorData?.timeSlots,
        isActive:doctorData?.isActive,
        registrationnumber:doctorData?.registrationnumber,
        yearofregistration:doctorData?.yearofregistration,
        smc:doctorData?.smc,
        })
    },[doctorData])
    
    
    const handleInputChange = e => {
        const { name, value } = e.target;
        if (name === "name") {
            // Regular expression to match capitalized first letter and no numbers or special characters except space
            const regex = /^[A-Z][a-zA-Z\s]*$/;

            // Check if the value matches the regex pattern
            if (!regex.test(value)) {
                // If it doesn't match, set an error message
                setNameError("Name should start with a capital letter and contain only letters and spaces.");
                // Update form data to prevent invalid input
                setFormData(prevFormData => ({ ...prevFormData, [name]: "" }));
                return; // Exit the function
            }
             else {
                // If it passes validation, clear the error message
                setNameError("");
            }
        }
        if (name === "registrationnumber") {
            const regNumberRegex = /^\d{7}$/;
            if (!regNumberRegex.test(value)) {
                setRegNumberError("Registration number should be exactly 7 digits.");
            } else {
                setRegNumberError("");
            }

            // Ensure the value does not exceed 7 digits
            if (value.length > 7) {
                return;
            }
        }

        if (name === "yearofregistration") {
            const year = parseInt(value, 10);
            if (year >= 2025) {
                setYearError("Year of registration should not exceed current year.");
                setFormData(prevFormData => ({ ...prevFormData, [name]: "" }));
                return;
            } else {
                setYearError("");
            }
        }
        if (name === "phone") {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(value)) {
                setPhoneError("Phone number should be exactly 10 digits.");
            } else {
                setPhoneError("");
            }

            // Ensure the value does not exceed 10 digits
            if (value.length > 10) {
                return;
            }
        }
        if (name === "smc") {
            const smcRegex = /^[A-Za-z\s]*$/; // Updated regex pattern
            if (!smcRegex.test(value)) {
                setSmcError("State Medical Council should contain only alphabets and spaces.");
            } else {
                setSmcError("");
            }
        }
        if (name === "ticketPrice") {
            const price = parseFloat(value);
            if (price > 600) {
                setTicketPriceError("Ticket price should be less than or equal to 600 rupees.");
            } else {
                setTicketPriceError("");
            }
        }
    

        // If the validation passes or if it's not the name field, update the form data
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

        
    
          
    const handleFileInputChange = async event =>{
        const file = event.target.files[0]
        const data = await uploadImageToCloudinary(file);
        setFormData({...formData,photo:data?.url})
    }

    const updateProfileHandler = async e =>{
        e.preventDefault();
        
        try {
            // eslint-disable-next-line react/prop-types
            const res= await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{

                method:'PUT',
                headers:{
                    'content-type':'application/json',
                    Authorization:`Bearer ${token}`
                },
                body:JSON.stringify(formData)
            })
            const result= await res.json()
            if (!res.ok){
                throw Error(result.message)
            }

            toast.success(result.message);


        } catch (err) {
            toast.error(err.message)
        }
    }

   const addItem=(key,item)=>{
    setFormData(prevFormData=>({...prevFormData,[key]:[...prevFormData[key],item]}))
   }
   const handleReusableInputChangeFunc = (key,index,event)=>{
    const{name,value}=event.target

    setFormData(prevFormData=>{
        const updateItems = [...prevFormData[key]]

        updateItems[index][name]=value;

        return{
            ...prevFormData,
            [key]:updateItems,
        }
    })
   }
   const deleteItem = (key,index)=>{
    setFormData(prevFormData=>({...prevFormData,[key]:prevFormData[key].filter((_,i)=>i!=index)}))
   }

    const addQualification = e=>{
        e.preventDefault()

        addItem('qualification',{
            startingDate:"",endingDate:"",degree:"",university:""
        })
    }

    const handleQualificationChange = (event,index)=>{
        handleReusableInputChangeFunc('qualification',index,event)
    }
    const deleteQualification = (e,index)=>{
        e.preventDefault()
        deleteItem('qualification',index)
    }


    const addExperiences = e=>{
        e.preventDefault()

        addItem('experiences',{
            startingDate:"",endingDate:"",position:"",hospital:""
        })
    }

    const handleExperiencesChange = (event,index)=>{
        handleReusableInputChangeFunc('experiences',index,event)
    }
    const deleteExperiences = (e,index)=>{
        e.preventDefault()
        deleteItem('experiences',index)
    }


    const addTimeSlot = e=>{
        e.preventDefault()

        addItem('timeSlots',{
            day:"",startingTime:"",endingTime:""
        })
    }

    const handleTimeSlotChange = (event,index)=>{
        handleReusableInputChangeFunc('timeSlots',index,event)
    }
    const deleteTimeSlot = (e,index)=>{
        e.preventDefault()
        deleteItem('timeSlots',index)
    }
    return<div>
        <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">profile information</h2>
        <form>
        <div className="mb-5">
    <p className="text-textColor font-bold text-[16px] leading-7">Name*</p>
    <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Full Name"
        className="w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;"
    />
    {nameError && <p className="text-red-500">{nameError}</p>}
</div>
<div className="mb-5">
                    <p className="text-textColor font-bold text-[16px] leading-7">Registration Number*</p>
                    <input
                        type="number"
                        name="registrationnumber"
                        value={formData.registrationnumber}
                        onChange={handleInputChange}
                        placeholder="Registration number"
                        className="w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    />
                    {regNumberError && <p className="text-red-500">{regNumberError}</p>}
                </div>
                <div className="mb-5">
                    <p className="text-textColor font-bold text-[16px] leading-7">Year of Registration*</p>
                    <input
                        type="number"
                        name="yearofregistration"
                        value={formData.yearofregistration}
                        onChange={handleInputChange}
                        placeholder="Year of registration"
                        className="w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    />
                    {yearError && <p className="text-red-500">{yearError}</p>}
                </div>
                <div className="mb-5">
    <p className="text-textColor font-bold text-[16px] leading-7">State Medical Council*</p>
    <input
        type="text"
        name="smc"
        value={formData.smc}
        onChange={handleInputChange}
        placeholder="State Medical Council"
        className={`w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer ${
            smcError ? "border-red-500" : "" // Add red border color if there's an error
        }`}
    />
    {smcError && <p className="text-red-500">{smcError}</p>}
</div>
            <div className="mb-5">
                <p className="text-textColor font-bold text-[16px] leading-7">Email*</p>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address" className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   " readOnly aria-readonly disabled="true"/>

            </div>  
            <div className="mb-5">
                <p className="text-textColor font-bold text-[16px] leading-7">Status*</p>
                   <select name="isActive" value={formData.isActive} onChange={handleInputChange} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   " >  
                            <option value="active">active</option>
                            <option value="inactive">inactive</option>
                
                        </select>
 </div>
 <div className="mb-5">
                    <p className="text-textColor font-bold text-[16px] leading-7">Phone*</p>
                    <input
                        type="text"
                        name="phone"
                        maxLength="10"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone number"
                        className="w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    />
                    {phoneError && <p className="text-red-500">{phoneError}</p>}
                </div>
            <div className="mb-5">
                <p className="text-textColor font-bold text-[16px] leading-7">Bio*</p>
                <input type="text" name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Bio" className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   " maxLength={100} />
             
            </div>
            <div className="mb-5">
                <div className="grid grid-cols-3 gap-5 mb-[30px]">
                    <div>
                        <p className="text-textColor font-bold text-[16px] leading-7">Gender*</p>
                        <select name="gender" value={formData.gender} onChange={handleInputChange} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
    py-3">
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <p className="text-textColor font-bold text-[16px] leading-7">Specialization*</p>
                        <select name="specialization" value={formData.specialization} onChange={handleInputChange} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
    py-3">
                            <option value="">Select</option>
                            <option value="surgeon">Surgeon</option>
                            <option value="neurologist">Neurologist</option>
                            <option value="dermatologist">Dermatologist</option>
                            <option value="dentist">Dentist</option>
                            <option value="ent">Ent</option>
                        </select>
                    </div>
                    <div className="mb-5">
    <p className="text-textColor font-bold text-[16px] leading-7">Ticket Price*</p>
    <input
        type="number"
        name="ticketPrice"
        value={formData.ticketPrice}
        onChange={handleInputChange}
        placeholder="Ticket Price"
        className={`w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer ${
            ticketPriceError ? "border-red-500" : "" // Add red border color if there's an error
        }`}
        min="0" // Set minimum value to 0
        max="600" // Set maximum value to 600
    />
    {ticketPriceError && <p className="text-red-500">{ticketPriceError}</p>}
</div>

                </div></div>
                <div className="mb-5">
                <p className="text-textColor font-bold text-[16px] leading-7">*Qualification</p>
                {formData.qualification?.map((item,index)=>(
                <div key={index}>
                    <div>
                        <div className="grid grid-cols-2 gap-5">
                         <div>   
                            <p className="text-textColor font-bold text-[16px] leading-7">Starting Date*</p>
                            <input type="date" name="startingDate" value={item.startingDate} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   " onChange={e=>handleQualificationChange(e,index)}/>
                        </div>
                
                         <div>   
                            <p className="text-textColor font-bold text-[16px] leading-7">Ending Date*</p>
                            <input type="date" name="endingDate" value={item.endingDate} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   "onChange={e=>handleQualificationChange(e,index)}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5 mt-5">
                         <div>   
                            <p className="text-textColor font-bold text-[16px] leading-7">Degree*</p>
                            <input type="text" name="degree" value={item.degree} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   "onChange={e=>handleQualificationChange(e,index)}/>
                        </div>
                
                         <div>   
                            <p className="text-textColor font-bold text-[16px] leading-7">University Name*</p>
                            <input type="text" name="university" value={item.university} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   "onChange={e=>handleQualificationChange(e,index)}/>
                        </div>
                    </div>
                    <button onClick={e=>deleteQualification(e,index)} className="btn p-2 rounded text-white text-[18px] mt-2 mb-[30px] cursor-pointer"><AiOutlineDelete /></button>
              </div>  </div>   ))}

              <button onClick={addQualification} className="btn py-2 px-5 rounded text-white h-fit cursor-pointer">Add Qualification</button>
                </div>
                <div className="mb-5">
                <p className="text-textColor font-bold text-[16px] leading-7">*Experiences</p>
                {formData.experiences?.map((item,index)=>(
                <div key={index}>
                    <div>
                        <div className="grid grid-cols-2 gap-5">
                         <div>   
                            <p className="text-textColor font-bold text-[16px] leading-7">Starting Date*</p>
                            <input type="date" name="startingDate" value={item.startingDate} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   "onChange={e=>handleExperiencesChange(e,index)}/>
                        </div>
                
                         <div>   
                            <p className="text-textColor font-bold text-[16px] leading-7">Ending Date*</p>
                            <input type="date" name="endingDate" value={item.endingDate} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   "onChange={e=>handleExperiencesChange(e,index)}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5 mt-5">
                         <div>   
                            <p className="text-textColor font-bold text-[16px] leading-7">Position*</p>
                            <input type="text" name="position" value={item.position} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   "onChange={e=>handleExperiencesChange(e,index)}/>
                        </div>
                
                         <div>   
                            <p className="text-textColor font-bold text-[16px] leading-7">Hospital Name*</p>
                            <input type="text" name="hospital" value={item.hospital} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   "onChange={e=>handleExperiencesChange(e,index)}/>
                        </div>
                    </div>
                    <button onClick={e=>deleteExperiences(e,index)} className="btn p-2 rounded text-white text-[18px] mt-2 mb-[30px] cursor-pointer"><AiOutlineDelete /></button>
              </div>  </div>   ))}

              <button onClick={addExperiences} className="btn py-2 px-5 rounded text-white h-fit cursor-pointer">Add Experiences</button>
                </div>
                <div className="mb-5">
                <p className="text-textColor font-bold text-[16px] leading-7">*Time Slots</p>
                {formData.timeSlots?.map((item,index)=>(
                <div key={index}>
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                         <div>   
                            <p className="text-textColor font-bold text-[16px] leading-7">Day*</p>
                            <select name="day" value={item.day} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
    " onChange={e=>handleTimeSlotChange(e,index)}>
                                <option value="">Select</option>
                                <option value="sunday">Sunday</option>
                                <option value="monday">Monday</option>
                                <option value="tuesday">Tuesday</option>
                                <option value="wednesday">Wednesday</option>
                                <option value="thursday">Thursday</option>
                                <option value="friday">Friday</option>
                                <option value="saturday">Saturday</option>
                            </select>
                           </div>
                
                         <div>   
                            <p className="text-textColor font-bold text-[16px] leading-7">Start Time*</p>
                            <input type="time" name="startingTime" value={item.startingTime} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   " onChange={e=>handleTimeSlotChange(e,index)}/>
                        </div>
                        <div>   
                            <p className="text-textColor font-bold text-[16px] leading-7">Ending Time*</p>
                            <input type="time" name="endingTime" value={item.endingTime} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   "onChange={e=>handleTimeSlotChange(e,index)}/>
                        
                    </div>
                    <div onClick={e=> deleteTimeSlot(e,index)} className="flex items-center"><button className="btn p-2 rounded text-white text-[18px] mb-[30px] cursor-pointer mt-6"><AiOutlineDelete /></button>
              </div>
                    </div>  </div> </div>  ))}

              <button onClick={addTimeSlot} className="btn py-2 px-5 rounded text-white h-fit cursor-pointer">Add TimeSlots</button>
                </div>
                <div className="mb-5>">
                    <p className="text-textColor font-bold text-[16px] leading-7">About</p>
                    <textarea name="about" rows={5} value={formData.about} placeholder="brief about yourself" onChange={handleInputChange} className=" w-full px-4 py-3 border border-solid border-[#0066FF61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer;
   "></textarea>
                </div>
                <div className="mb-5 flex items-center gap-3">
                {formData.photo && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-black flex items-center 
                                     justify-center'>
                            <img 
                            src={formData.photo} 
                            alt="" 
                            className='w-full rounded-full'/>
                        </figure>}
                        <div className='relative w-[130px] h-[50px]'>
                            <input type='file' name="photo" id="customFile" onChange={handleFileInputChange} accept='.jpg, .png' className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"/>
                            
                            <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.37rem] text-[15px] leading-6 overflow-hidden bg-[#0066FF46] text-headingColor font-bold rounded-lg truncate cursor-pointer'>
                                Upload photo
                            </label>
                        </div>
                   
                </div>
                <div className="mt-7 "><button  type="submit" onClick={updateProfileHandler}
                        className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>Update Profile</button></div>
        </form>
    </div>
}
export default Profile;