import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        const {individualid, initiativeid, amount, is_anonymous} = await request.json();
        const response = await sql
        `INSERT INTO IndividualInitiativeDonations (individualid, initiativeid, amount, is_anonymous)
        VALUES (${individualid},${initiativeid}, ${amount},${is_anonymous})`;
    } catch (e) {
        console.log({e});
    }
    
    return NextResponse.json({message: "success"});
}
export async function GET(request:Request){

    const response = await sql `SELECT * FROM IndividualInitiativeDonations`;
    
    const posts = response.rows
     console.log(posts)
    return NextResponse.json({posts: posts});
}
