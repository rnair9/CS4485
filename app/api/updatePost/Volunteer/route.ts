import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function PUT(request: Request) {
    try {
        const { id, description } = await request.json();
        console.log(id + " " + description);
        const response = await sql
            `UPDATE VolunteerEvent 
             SET description = ${description} 
             WHERE EventID = ${id}`;
    } catch (e) {
        console.log({e});
    }
    return NextResponse.json({message: "success"});
}

export async function GET(request:Request){
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const response = await sql `SELECT * FROM VolunteerEvent WHERE EventID=${id} `
    const posts = response.rows[0]
    // console.log(posts)
    return NextResponse.json({posts: posts});
}