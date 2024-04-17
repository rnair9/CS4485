import Form from "./form";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import Navbar from "../../components/navbar/Navbar"

export default async function LoginPage() {
    const session = await getServerSession();
    if (session) {
        redirect("/");
    }
    return (
        <>
        <Navbar session={session}/>
        <Form />
        </>
    )
}