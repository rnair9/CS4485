import { useState } from 'react';
import sendEmail from '../../email-utility';
import { useRouter } from 'next/navigation'

export default function Form({ params }) {
    // console.log(params)
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        donationAmount: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        anonymousDonation: false
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        setFormData({
            ...formData,
            [id]: checked
        });
    };

    const handleSendEmail = async (e) => {
        e.preventDefault()
        console.log(formData.email)
        await sendEmail(`${formData.email}`, `Donation`, ` <div className="p-8 bg-gray-100"><div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md"><p className="mb-4">Dear ${formData.firstName} ${formData.lastName},</p><h1 className="text-3xl font-bold mb-4">Thank You for Your Donation!</h1><p className="mb-4">We want to express our sincere gratitude for your generous donation of $${formData.donationAmount}.</p><p className="mb-4">Thank you for your generous donation; your support is invaluable to our nonprofit's mission</p><p className="mb-4">Here is the billing address we have on file:</p><address className="mb-4">${formData.streetAddress}<br />${formData.city}, ${formData.state} ${formData.zip}</address><p className="mb-4">Thank you once again for your kindness and generosity.</p><p className="mb-4">Best regards,</p><p>CauseWay Team</p></div></div>`);
        alert("Donation processed, and email sent for confirmation")
        router.push("/")
      };
      
    return (
    <div>
      <form className="m-4 text-center">
        <h1 className="font-bold text-4xl p-4 flex justify-center"> DONATE</h1>
        {/* We will pull post info from database and put the name here and use it on email as well */}
        <p>You are donating for {params}</p>
        <h2 className="text-left container text-3xl p-2">Payment Information</h2>
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
            type="text"
            id="phoneNum"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Phone Number"
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-6 mb-6">
          <input
            type="number"
            id="donationAmount"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block mx-auto w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Donation Amount ($)"
            required
            min="0"
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-4">
          <input
            type="text"
            id="streetAddress"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Street Address"
            required
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="city"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="City"
            required
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="state"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="State"
            required
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="zip"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ZipCode"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-4">
          <input
            type="text"
            id="cardNum"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Card Number"
            required
            onChange={handleInputChange}
          />
          <div className="grid md:grid-cols-2">
          <input
            type="text"
            id="exp"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Expiration Date"
            required
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="cvv"
            className="white border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="CVV"
            required
            onChange={handleInputChange}
          />
          </div>
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              onChange={handleCheckboxChange}
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            I want this donation to be anonymous
          </label>
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
