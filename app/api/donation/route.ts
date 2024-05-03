import {sql} from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    // console.log(email)
    const response = await sql `SELECT * FROM Individual WHERE email=${email};`
    const user = response.rows[0];
    const donationHistory = await sql `select nonprofit.name AS npname, initiative.name as iname, amount 
                                from nonprofit,initiative,individualinitiativedonations
                                where individualinitiativedonations.individualid = ${user.individualid} 
                                AND individualinitiativedonations.initiativeid = initiative.initiativeid
                                AND initiative.nonprofitid = nonprofit.nonprofitid`
                                
    // console.log(user)
    const history = donationHistory.rows;
    console.log("DEBUG--->", history);
    return NextResponse.json({user: user.individualid, history: history });
  }