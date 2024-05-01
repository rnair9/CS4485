import {sql} from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    // console.log(email)
    const response = await sql `SELECT * FROM Company WHERE email=${email}`;
    const user = response.rows[0];
    // console.log(user)
    return NextResponse.json({ user: user });
  }