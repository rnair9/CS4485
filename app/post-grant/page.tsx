import Form from "./form";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default async function PostGrantPage() {
    const session = await getServerSession();
    if (!session) {
        redirect("/");
    }
    return (
		<div className="container flex-col mx-auto">
		<h2 className="font-bold container text-4xl mx-auto text-center">Post a New Grant</h2>
        <Form />
		</div>
    )
}