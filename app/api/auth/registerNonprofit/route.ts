import {NextResponse} from "next/server";
import {hash} from "bcrypt";
import {sql} from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        const {email, password, name, description, logo, category} = await request.json();
        console.log({email, password})
        const hashedPassword = await hash(password, 10);
        const response = await sql
        `INSERT INTO Nonprofit (email, password, name, logo, description, category, role)
        VALUES (${email},${hashedPassword},${name},${description},${logo},${category}, 'Nonprofit')`;
    } catch (e) {
        console.log({e});
    }
    return NextResponse.json({message: "success"});
}