"use client";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Form() {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            name: formData.get("name"),
            description: formData.get("description"),
            date: formData.get("date"),
            hour: formData.get("hour"),
            redirect: false,
        });
        console.log({ response });
        if (!response?.error) {
            router.push("/");
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto max-w-3xl mt-10">
            <p className="font-semibold pb-1">Volunteer Opportunity</p>
            <input name="name" className="border border-black text-black" type="text" required />
            <p className="font-semibold pb-1 pt-5">Description</p>
            <textarea name="description" rows={8} className="border border-black text-black" required></textarea>
            <div className="flex pt-5">
                <div className="mr-5">
                    <p className="font-semibold pb-1">Date</p>
                    <input name="date" className="border border-black text-black" type="date" required />
                </div>
                <div>
                    <p className="font-semibold pb-1">Hour</p>
                    <input name="hour" className="border border-black text-black" type="time" required />
                </div>
            </div>
            <p className="pb-5" />
            <button type="submit" className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Post</button>
        </form>
    );
}