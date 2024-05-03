import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

export async function POST(request: Request) {
    try {
        const {companyid, initiativeid, amount, is_anonymous} = await request.json();
        const response = await sql
        `INSERT INTO CompanyInitiativeDonations (companyid, initiativeid, amount, is_anonymous)
        VALUES (${companyid},${initiativeid}, ${amount},${is_anonymous})`;
    } catch (e) {
        console.log({e});
    }
    
    return NextResponse.json({message: "success"});
}
export async function GET(request:Request){

    const response = await sql `SELECT * FROM CompanyInitiativeDonations`;
    
    const posts = response.rows
     console.log(posts)
    return NextResponse.json({posts: posts});
}