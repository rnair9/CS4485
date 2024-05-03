"use client";
import { useEffect, useState } from "react";
import sendEmail from "../../email-utility";
import { useRouter } from 'next/navigation'
import { getSession } from "next-auth/react";

export default function Form() {

  const session = getSession()
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    numberOfPeople: 0
});
const [role, setRole] = useState("")

const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
        ...formData,
        [id]: value
    });
};

const handleSendEmail = async (e) => {
    e.preventDefault()
    if(formData.email == "" || formData.firstName == "" || formData.lastName == ""){
      alert("Fill the necessary fields please: Email, First Name, Last Name")
    }else{

      await sendEmail(`${formData.email}`, `Volunteer Sign-up`, ` <div className="p-8 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <p className="mb-4">Dear ${formData.firstName} ${formData.lastName},</p>
      <h1 className="text-3xl font-bold mb-4">Thank You for Volunteering!</h1>
      <p className="mb-4">We want to express our sincere gratitude for your and your ${formData.numberOfPeople} dear friends' willingness to volunteer your time and efforts.</p>
      <p className="mb-4">Thank you for stepping forward to support the cause; your dedication is invaluable to the nonprofit's mission.</p>
      <p className="mb-4">Thank you once again for your kindness and commitment.</p>
      <p className="mb-4">Best regards,</p>
      <p>CauseWay Team</p>
      </div>
      </div>`);
      alert("Sign Up processed, and email sent for confirmation")
      router.push("/")
    }
  };

  const handleRole = async()=>{
      setRole((await session).user.role)
  }

  useEffect(() => {
    handleRole()
  });
  return (
    <div>
      <form className="m-4 text-center">
        <h1 className="font-bold text-4xl p-4 flex justify-center">
          VOLUNTEER SIGN-UP
        </h1>
        {/* <p>display non-profit info and the event info at the top</p> */}
        <h2 className="text-left container text-3xl p-2">
          Volunteer Information
        </h2>
        <div className="grid gap-6 mb-6 md:grid-cols-4">
          <input
            type="text"
            id="firstName"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="First Name"
            required
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="lastName"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Last Name"
            required
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="email"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            required
            onChange={handleInputChange}
          />
          <input
            type="tel"
            pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxLength={12}
            id="phone_num"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Phone Number: 888 888 8888"
            onChange={handleInputChange}
          />
          {role === "Company"?(
          <input
          type="number"
          id="numberOfPeople"
          className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Number of People to Attend"
          required
          onChange={handleInputChange}
        />
        ):(<></>)}
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSendEmail}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
