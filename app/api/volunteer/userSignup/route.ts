import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        const {name, description, date, nonprofitid} = await request.json();
        // console.log(name + " " + description+ " " + date +" " + nonprofitid)
        const response = await sql
        `INSERT INTO VolunteerEvent (name, description, eventdate, nonprofitid)
        VALUES (${name},${description},${date}, ${nonprofitid})`;
    } catch (e) {
        console.log({e});
    }
    return NextResponse.json({message: "success"});
}
export async function GET(request:Request){
    
    const response = await sql `SELECT * FROM IndividualEventSignUp`
    const posts = response.rows
    // console.log(posts)
    return NextResponse.json({posts: posts});
}