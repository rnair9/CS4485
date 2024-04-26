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
            grantname: formData.get("grantname"),
			grantvalue: formData.get("grantvalue"),
            description: formData.get("description"),
            deadline: formData.get("deadline"),
            redirect: false,
        })
        console.log({response});
        if(!response?.error) {
            router.push("/");
            router.refresh();
        }
        
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-3xl mt-10">
            <p className="font-semibold pb-1">Grant Name</p>
            <input name="grantname" className="border border-black text-black" type="text" required />
            <p className="font-semibold pb-1 pt-5">Value (USD)</p>
            <input name="grantvalue" className="border border-black text-black" type="number" min="1" />
            <p className="font-semibold pb-1 pt-5">Description</p>
            <textarea name="description" rows={8} className="border border-black text-black" required></textarea>
            <p className="font-semibold pb-1 pt-5">Deadline</p> {/* New element for deadline */}
            <input name="deadline" className="border border-black text-black" type="date" required /> {/* Input field for deadline */}
            <p className="pb-5" />
            <button type="submit" className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Post</button>
        </form>
    )
    
}