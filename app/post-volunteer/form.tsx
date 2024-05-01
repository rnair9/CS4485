"use client";
import { FormEvent, useEffect, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Form() {
    const router = useRouter();
    const [nonprofitid, setNonprofitid] = useState(0)
    const session = getSession()
    const fetchUser = async () => {
        if ((await session).user.role != "Nonprofit") {
            router.push("/");
          }
        // console.log(session)
        const email = (await session).user.email
        const response = await fetch(`api/getUser/getNonProfit?email=${email}`);
        const data = await response.json();
        setNonprofitid(data.user.nonprofitid)
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // await fetchUser()
        // console.log(nonprofitid)
        const formData = new FormData(e.currentTarget);
            const response = await fetch(`/api/createPost/volunteer`, {
                method:"POST",
                body: JSON.stringify({
                    name: formData.get("name"),
                    description: formData.get("description"),
                    date: formData.get("date"),
                    nonprofitid: nonprofitid
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
            <p className="font-semibold pb-1">Volunteer Opportunity</p>
            <input name="name" id="name" className="border border-black text-black" type="text" required />
            <p className="font-semibold pb-1 pt-5">Description</p>
            <textarea name="description" id="description" rows={6} className="border border-black text-black" required></textarea>
            <div className="flex pt-5">
                <div className="mr-5">
                    <p className="font-semibold pb-1">Date</p>
                    <input name="date" id="date" className="border border-black text-black" type="date" required />
                </div>
            </div>
            <p className="pb-5" />
            <button type="submit" className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Post</button>
        </form>
    );
}