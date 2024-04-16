import { EmailTemplate } from ".../.../app/components/eamil-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
    try {
        const body = await request.json();
        console.log("body", body)
        const { email, name, message, subject } = body;
        const data = await resend.emails.send({
            from: "Causeway <causeway4dmin@gmail.com>",
            to: email,
            subject: subject,
            react: EmailTemplate({ fristName: name}),
            text: message,


        });

        if(data.status === 'success') {
            return NextResponse.json({ message: 'Email sent successfully'})
        }
        return NextResponse.json(data)
    } catch (error) {
            console.log('error', error)
    }
}
