"use client";
import { FormEvent, useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function Form({params}) {
    const [desc, setDescription] = useState("")
    const [formData, setFormData] = useState({
        description: desc,
    });
    const router = useRouter()
    const session = getSession()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch(`/api/updatePost/Volunteer`, {
            method: "PUT",
            body: JSON.stringify({
                id: params,
                description: formData.get("description")
            })
        });

        router.push("/")
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const fetchInitiative =async()=>{
        if((await session).user.role==="Nonprofit"){

            const id = params
            const response = await fetch(`/api/updatePost/Volunteer?id=${id}`);
            const data = await response.json()
            setDescription(data.posts.description)
        }else{
            router.push("/")
        }
    }
    useEffect(() => {
        fetchInitiative()
      });


    return (
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-3xl mt-10">
            <p className="font-semibold pb-1 pt-5">Description</p>
            <textarea name="description" id="description" placeholder={desc} rows={6} className="border border-black text-black" onChange={handleInputChange} required></textarea>
            <p className="pb-5" />
            <button type="submit" className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Update</button>
        </form>
    );
}