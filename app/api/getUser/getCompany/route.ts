import {sql} from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    // console.log(email)
    const response = await sql `SELECT * FROM Company WHERE email=${email}`;
    const user = response.rows[0];
    // console.log(user)
    const donationHistory = await sql `select nonprofit.name AS npname, initiative.name as iname, amount 
                                        from nonprofit,initiative,companyinitiativedonations
                                        where companyinitiativedonations.companyid = ${user.companyid} 
                                        AND companyinitiativedonations.initiativeid = initiative.initiativeid
                                        AND initiative.nonprofitid = nonprofit.nonprofitid`
    const history = donationHistory.rows;
    return NextResponse.json({ user: user, history: history });
  }