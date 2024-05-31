import { useState } from 'react';
import reg from "../assets/images/reg.jpg";
import { Link, useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { BASE_URL } from "../config";
import { toast } from 'react-toastify';

const Signup = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photo: selectedFile,
        gender: "",
        role: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        role: "",
    });

    const navigate = useNavigate();

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validation logic
        let error = "";
        if (name === "name") {
            const nameRegex = /^[A-Za-z\s]+$/;
            if (!value || !nameRegex.test(value)) {
                error = "Name should contain only alphabets and spaces.";
            }
        } else if (name === "email") {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!value || !emailRegex.test(value)) {
                error = "Email should be a valid gmail address.";
            }
        } else if (name === "password") {
            if (!value || value.length < 8) {
                error = "Password should be at least 8 characters long.";
            }
        } else if (name === "gender" || name === "role") {
            if (!value) {
                error = "This field is required.";
            }
        }
        setErrors({ ...errors, [name]: error });
    };

    const handleFileInputChange = async event => {
        const file = event.target.files[0];
        const data = await uploadImageToCloudinary(file);
        setPreviewURL(data.url);
        setSelectedFile(data.url);
        setFormData({ ...formData, photo: data.url });
    };

    const validateForm = () => {
        const { name, email, password, gender, role } = formData;
        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        let valid = true;
        let validationErrors = {};

        if (!name || !nameRegex.test(name)) {
            validationErrors.name = "Name should contain only alphabets and spaces.";
            valid = false;
        }
        if (!email || !emailRegex.test(email)) {
            validationErrors.email = "Email should be a valid gmail address.";
            valid = false;
        }
        if (!password || password.length < 8) {
            validationErrors.password = "Password should be at least 8 characters long.";
            valid = false;
        }
        if (!gender) {
            validationErrors.gender = "This field is required.";
            valid = false;
        }
        if (!role) {
            validationErrors.role = "This field is required.";
            valid = false;
        }

        setErrors(validationErrors);
        return valid;
    };

    const submitHandler = async event => {
        event.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const { message } = await res.json();
            if (!res.ok) {
                throw new Error(message);
            }
            setLoading(false);
            toast.success(message);
            navigate('/signin');
        } catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
    };

    return (
        <section className='px-5 xl:px-0'>
            <div className='max-w-[1170px] mx-auto'>
                <div className='grid grid-cols1 lg:grid-cols-2'>
                    <div className='hidden lg:block  rounded-lg'>
                        <figure className='rounded-l-lg'>
                            <img src={reg} alt="" className='w-full rounded-l-lg' />
                        </figure>
                    </div>
                    <div className='rounded-l-lg lg:pl-16 py-10'>
                        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
                            Create an account
                        </h3>
                        <form onSubmit={submitHandler}>
                            <div className='mb-5'>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 px-4 py-3 border-b border-solid border-black focus:outline-none focus:border-b-black text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className='mb-5'>
                                <input
                                    type="text"
                                    placeholder="Enter Your Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 px-4 py-3 border-b border-solid border-black focus:outline-none focus:border-b-black text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                            <div className='mb-5'>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className='w-full pr-4 px-4 py-3 border-b border-solid border-black focus:outline-none focus:border-b-black text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <div className='mb-5 flex items-center justify-between'>
                                <label htmlFor='' className='text-headingColor font-bold text-[16px] leading-7'>
                                    Are you a:
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
                                    >
                                        <option value="">Select</option>
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </label>
                                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                                <label htmlFor='' className='text-headingColor font-bold text-[16px] leading-7'>
                                    Gender:
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
                                   required >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>
                                </label>
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                            </div>
                            <div className='mb-5 flex items-center gap-3'>
                                {selectedFile && (
                                    <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-black flex items-center justify-center'>
                                        <img src={previewURL} alt="" className='w-full rounded-full' />
                                    </figure>
                                )}
                                <div className='relative w-[130px] h-[50px]'>
                                    <input
                                        type='file'
                                        name="photo"
                                        id="customFile"
                                        onChange={handleFileInputChange}
                                        accept='.jpg, .png'
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                   required />
                                    <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.37rem] text-[15px] leading-6 overflow-hidden bg-[#0066FF46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
                                        Upload photo
                                    </label>
                                </div>
                            </div>
                            <div className='mt-7'>
                                <button
                                    type="submit"
                                    className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'
                                >
                                    Sign-Up
                                </button>
                            </div>
                            <p className='mt-5 text-textColor text-center'>
                                Already have an account?
                                <Link to='/signin' className="text-primaryColor font-medium ml-1">Sign-In</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
