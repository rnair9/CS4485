import {NextResponse} from "next/server";
import {hash} from "bcrypt";
import {sql} from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        const {email, password} = await request.json();
        console.log({email, password})
        const hashedPassword = await hash(password, 10);
        const response = await sql
        `INSERT INTO users (email, password)
        VALUES (${email},${hashedPassword})`;
    } catch (e) {
        console.log({e});
    }
    return NextResponse.json({message: "success"});
}