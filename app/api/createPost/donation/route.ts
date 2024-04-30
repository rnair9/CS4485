import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        const {name, description, category, nonprofitid} = await request.json();
        console.log(name + " " + description+ " " + category +" " + nonprofitid)
        // const response = await sql
        // `INSERT INTO Initiative (name, description, category, nonprofitid)
        // VALUES (${name},${description},${category}, ${nonprofitid})`;
    } catch (e) {
        console.log({e});
    }
    return NextResponse.json({message: "success"});
}
export async function GET(request:Request){
    
    const response = await sql `SELECT * FROM Initiative`
    const posts = response.rows
    // console.log(posts)
    return NextResponse.json({posts: posts});
}