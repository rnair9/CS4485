'use client';
import {FormEvent, useEffect, useState} from "react";
import {getSession, signIn} from "next-auth/react";
import {useRouter} from "next/navigation";


export default function Form() {
    const [companyid, setCompanyid] = useState(0)
    const session = getSession()
    const router = useRouter();
    const fetchUser = async () => {
        if ((await session).user.role != "Company") {
            router.push("/");
          }
        // console.log(session)
        const email = (await session).user.email
        const response = await fetch(`api/getUser/getCompany?email=${email}`);
        const data = await response.json();
        setCompanyid(data.user.companyid)
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
            const response = await fetch(`/api/createPost/grant`, {
                method:"POST",
                body: JSON.stringify({
                    name: formData.get("name"),
                    amount: formData.get("amount"),
                    deadline: formData.get("deadline"),
                    status: formData.get("status"),
                    description: formData.get("description"),
                    companyid: companyid
                }),
            }
        );
        await router.push("/");
    };

    useEffect(() => {
        fetchUser()
      });

    return (
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-3xl mt-10">
            <p className="font-semibold pb-1">Grant Name</p>
            <input name="name" id="name" className="border border-black text-black" type="text" required />
            <p className="font-semibold pb-1 pt-5">Value (USD)</p>
            <input name="amount" id="amount" className="border border-black text-black" type="number" min="1" />
            <p className="font-semibold pb-1 pt-5">Description</p>
            <textarea name="description" id="description" rows={6} className="border border-black text-black" required></textarea>
            <p className="font-semibold pb-1 pt-5">Deadline</p> {/* New element for deadline */}
            <input name="deadline" id="deadline" className="border border-black text-black" type="date" required /> {/* Input field for deadline */}
            <p className="pb-5" />
            <button type="submit" className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Post</button>
        </form>
    )
    
}