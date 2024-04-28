import Form from "./form";

export default async function PostVolunteer() {

    return (
		<div className="container flex-col mx-auto">
		<h2 className="font-bold container text-4xl mx-auto text-center">Post a new Volunteer Event</h2>
        <Form />
		</div>
    )
}