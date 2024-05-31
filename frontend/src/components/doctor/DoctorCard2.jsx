import { useEffect, useState } from "react";

const DoctorCard = ({ doctor, creationTime }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        bio: "",
        gender: "",
        photo: null,
        about: "",
        specialization: "",
        ticketPrice: "0",
        qualification: [],
        experiences: [],
        timeSlots: [],
        isActive: [],
    });

    useEffect(() => {
        setFormData({
            name: doctor?.name,
            email: doctor?.email,
            isActive: doctor?.isActive,
            phone: doctor?.phone,
            bio: doctor?.bio,
            gender: doctor?.gender,
            photo: doctor?.photo,
            about: doctor?.about,
            specialization: doctor?.specialization,
            ticketPrice: doctor?.ticketPrice,
            qualification: doctor?.qualification,
            experiences: doctor?.experiences,
            timeSlots: doctor?.timeSlots,
        });
    }, [doctor]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        console.log("DoctorCard - Received creationTime:", creationTime);

        // Use Date.parse for validation
        const parsedCreationTime = Date.parse(creationTime);
        if (isNaN(parsedCreationTime)) {
            console.error("Invalid creationTime:", creationTime);
            return;
        }

        const endTime = new Date(parsedCreationTime);
        console.log("Parsed creationTime:", endTime);

        endTime.setHours(endTime.getHours() + 48);
        console.log("Adjusted endTime (48 hours later):", endTime);

        const calculateTimeLeft = () => {
            const now = new Date();
            const timeDifference = endTime - now;

            console.log("Current time:", now);
            console.log("Time difference:", timeDifference);

            if (timeDifference <= 0) {
                setTimeLeft(0);
            } else {
                setTimeLeft(timeDifference);
            }
        };

        const timer = setInterval(() => {
            calculateTimeLeft();
        }, 1000);

        calculateTimeLeft(); // Initial calculation

        return () => clearInterval(timer);
    }, [creationTime]);

    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <div className="p-3 lg:p-5">
            <div>
                <img src={formData.photo} height={"500px"} width={"500px"} alt="" />
            </div>
            <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700]">
                {formData.name}
            </h2>
            <div className="mt-2 lg:mt-4 flex items-center justify-between">
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {formData.specialization}
                </span>
            </div>
            <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
                <div>
                    <p className="text-[14px] leading-6 font-[400] text-textColor">
                        Reminder!!!!! consult the doctor at: <b>{formData.experiences && formData.experiences[0]?.hospital}</b> without fail
                    </p>
                    <div>
                        <h2>Your appointment validity ends in:</h2>
                        <p>{hours} hours {minutes} minutes {seconds} seconds</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;