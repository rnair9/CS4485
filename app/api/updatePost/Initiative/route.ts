import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function PUT(request: Request) {
    try {
        const { id, description } = await request.json();
        console.log(id + " " + description);
        const response = await sql
            `UPDATE Initiative 
             SET description = ${description} 
             WHERE initiativeid = ${id}`;
    } catch (e) {
        console.log({e});
    }
    return NextResponse.json({message: "success"});
}

export async function GET(request:Request){
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const response = await sql `SELECT * FROM Initiative WHERE InitiativeID=${id} `
    const posts = response.rows[0]
    // console.log(posts)
    return NextResponse.json({posts: posts});
}