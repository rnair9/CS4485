"use client";
import { FormEvent, useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function InitiativeForm() {
    const [nonprofitid, setNonprofitid] = useState(0)
    const session = getSession()
    const router = useRouter();
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
            const response = await fetch(`/api/createPost/donation`, {
                method:"POST",
                body: JSON.stringify({
                    name: formData.get("name"),
                    description: formData.get("description"),
                    category: formData.get("category"),
                    nonprofitid: nonprofitid
                }),
            }
        );
        console.log(response)
    };

    useEffect(() => {
        fetchUser()
      });


    return (
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-3xl mt-10">
            <p className="font-semibold pb-1">Initiative Name</p>
            <input name="name" id="name" className="border border-black text-black" type="text" required />
            <p className="font-semibold pb-1 pt-5">Description</p>
            <textarea name="description" id="description" rows={6} className="border border-black text-black" required></textarea>
            <p className="font-semibold pb-1 pt-5">Category</p>
            <select name="category" className="border border-black text-black" required>
                <option value="">Select category</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Environment">Environment</option>
                <option value="Food">Food</option>
            </select>
            <p className="pb-5" />
            <button type="submit" className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Post</button>
        </form>
    );
}