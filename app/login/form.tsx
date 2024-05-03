'use client';
import {FormEvent} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";


export default function Form() {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get("email"),
            password: formData.get("password"),
            accountType: formData.get("accountType"),
            redirect: false,
        })
        console.log({response});
        if(!response?.error) {
            router.push("/");
            router.refresh();
        }
        else {
            alert('Invalid credentials. Please try again.')
        }
        
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
            <label htmlFor="accountType">Select the account type: </label>
            <select name="accountType"  id="accountType">
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
                <option value="Nonprofit">Nonprofit</option>
            </select>
            <label htmlFor="email">Email:</label>
            <input name="email" id="email" required className="border border-black text-black" type="email" />
            <label htmlFor="password">Password:</label>
            <input name="password" id="password" required className="border border-black text-black" type="password" />
			<button type="submit" className="bg-black hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">Login</button>
        </form>
    )
    
}