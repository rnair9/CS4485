'use client';
import React, {useState, FormEvent} from "react";
import {useRouter} from "next/navigation";


export default function Form() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const router = useRouter();
        if (formData.get("accountType")=="Individual") {
            const response = await fetch(`/api/auth/registerIndividual`, {
                method:"POST",
                body: JSON.stringify({
                    email: formData.get("email"),
                    password: formData.get("password"),
                    firstName: formData.get("firstname"),
                    lastName: formData.get("lastname"),
                }),
            }
            
        );
            console.log({response})
        }
        else if (formData.get("accountType")=="Company") {
            const response = await fetch(`/api/auth/registerCompany`, {
                method:"POST",
                body: JSON.stringify({
                    email: formData.get("email"),
                    password: formData.get("password"),
                    name: formData.get("companyname"),
                    description: formData.get("companydesc"),
                    logo: formData.get("companylogo"),
                }),
            });
            console.log({response})
        }
        else if (formData.get("accountType")=="Nonprofit") {
            const response = await fetch(`/api/auth/registerNonprofit`, {
                method:"POST",
                body: JSON.stringify({
                    email: formData.get("email"),
                    password: formData.get("password"),
                    name: formData.get("nonprofitname"),
                    description: formData.get("nonprofitdesc"),
                    logo: formData.get("nonprofitlogo"),
                    category: formData.get("nonprofitcategory"),
                }),
            });
            console.log({response})
            
            }
            
        
       
    }
    const [accountType, setAccountType] = useState("Individual")

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <label htmlFor="accountType">Select the account type: </label>
            <select name="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)}  id="accountType">
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
                <option value="Nonprofit">Nonprofit</option>
            </select>

            {accountType == "Company" &&
                <>
                    <label htmlFor="companyname">Name:</label>
                    <input name="companyname" id="companyname" required className="border border-black text-black" type="text" />
                    <label htmlFor="companydesc">Description:</label>
                    <input name="companydesc" id="companydesc" className="border border-black text-black" type="text" />
                    <label htmlFor="companylogo">Logo:</label>
                    <input name="companylogo" id="companylogo" className="border border-black text-black" type="file" />
                </>
            }

            {accountType == "Individual" &&
                <>
                    <label htmlFor="firstname">First Name:</label>
                    <input name="firstname" id="firstname" required className="border border-black text-black" type="text" />
                    <label htmlFor="lastname">Last Name:</label>
                    <input name="lastname" id="lastname" required className="border border-black text-black" type="text" />
                </>
            }

            {accountType == "Nonprofit" &&
                <>
                    <label htmlFor="nonprofitname">Name:</label>
                    <input name="nonprofitname" id="nonprofitname" required className="border border-black text-black" type="text" />
                    <label htmlFor="nonprofitdesc">Description:</label>
                    <input name="nonprofitdesc" id="nonprofitdesc" className="border border-black text-black" type="text" />
                    <label htmlFor="nonprofitlogo">Logo:</label>
                    <input name="nonprofitlogo" id="nonprofitlogo" className="border border-black text-black" type="file" />
                    <label htmlFor="nonprofitcategory">Select a category: </label>
                    <select name="nonprofitcategory" id="nonprofitcategory">
                        <option value="Education">Education</option>
                        <option value="Religious">Religious</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Animal Welfare">Animal Welfare</option>
                        <option value="Environmental Conservation">Environmental Conservation</option>
                        <option value="Other">Other</option>
                    </select>
                </>
            }
            
            <label htmlFor="email">Email:</label>
            <input name="email" id="email" required className="border border-black text-black" type="email" />
            <label htmlFor="password">Password:</label>
            <input name="password" id="password" required className="border border-black text-black" type="password" />
			<button type="submit" className="bg-black hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">Register</button>
        </form>
    )
    
}