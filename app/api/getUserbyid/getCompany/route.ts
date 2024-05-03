import {sql} from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('companyid');
    const response = await sql `SELECT * FROM Company WHERE companyid=${id}`;
    const user = response.rows[0];
    // console.log(user)
    return NextResponse.json({ user: user });
  }