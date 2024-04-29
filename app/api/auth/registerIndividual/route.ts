import {NextResponse} from "next/server";
import {hash} from "bcrypt";
import {sql} from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        const {email, password, firstName, lastName} = await request.json();
        console.log({email, password})
        const hashedPassword = await hash(password, 10);
        const response = await sql
        `INSERT INTO Individual (email, password, firstname, lastname)
        VALUES (${email},${hashedPassword},${firstName},${lastName})`;
    } catch (e) {
        console.log({e});
    }
    return NextResponse.json({message: "success"});
}