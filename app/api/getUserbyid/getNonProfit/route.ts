import {sql} from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('nonprofitid');
    // console.log(id)
    const response = await sql `SELECT * FROM Nonprofit WHERE nonprofitid=${id}`;
    const user = response.rows[0];
    // console.log(user)
    return NextResponse.json({ user: user });
  }