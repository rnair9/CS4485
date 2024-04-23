"use client";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function InitiativeForm() {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            name: formData.get("name"),
            description: formData.get("description"),
            category: formData.get("category"),
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
            <p className="font-semibold pb-1">Initiative Name</p>
            <input name="name" className="border border-black text-black" type="text" required />
            <p className="font-semibold pb-1 pt-5">Description</p>
            <textarea name="description" rows={8} className="border border-black text-black" required></textarea>
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