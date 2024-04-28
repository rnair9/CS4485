import Form from "./form";

export default async function PostInitiative() {

    return (
		<div className="container flex-col mx-auto">
		<h2 className="font-bold container text-4xl mx-auto text-center">Post a new Initiative</h2>
        <Form />
		</div>
    )
}