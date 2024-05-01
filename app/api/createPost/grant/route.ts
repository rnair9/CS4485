import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        const {name, description, deadline, amount, companyid} = await request.json();
        // console.log(name + " " + description+ " " + date +" " + nonprofitid)
        const response = await sql
        `INSERT INTO Grants (name, amount, deadline, status, description, companyid)
        VALUES (${name},${amount},${deadline}, 'Open', ${description}, ${companyid})`;
    } catch (e) {
        console.log({e});
    }
    return NextResponse.json({message: "success"});
}
export async function GET(request:Request){
    
    const response = await sql `SELECT * FROM Grants`
    const posts = response.rows
    // console.log(posts)
    return NextResponse.json({posts: posts});
}