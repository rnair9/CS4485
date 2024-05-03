import {sql} from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('companyid');
    const response = await sql `SELECT * FROM Company WHERE companyid=${id}`;
    const user = response.rows[0];
    const donationHistory = await sql `select nonprofit.name AS npname, initiative.name as iname, amount 
                                        from nonprofit,initiative,companyinitiativedonations
                                        where companyinitiativedonations.companyid = ${id} 
                                        AND companyinitiativedonations.initiativeid = initiative.initiativeid
                                        AND initiative.nonprofitid = nonprofit.nonprofitid`
    const history = donationHistory.rows;
    return NextResponse.json({ user: user, history: history });
  }