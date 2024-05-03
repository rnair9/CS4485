import {sql} from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('nonprofitid');
    // console.log(id)
    const response = await sql `SELECT * FROM Nonprofit WHERE nonprofitid=${id}`;
    const user = response.rows[0];
    const individualHistory = await sql `select individual.firstname as fname, individual.lastname as lname, initiative.name as iname, amount, is_anonymous
                                        from individual,initiative,individualinitiativedonations
                                        where initiative.nonprofitid = ${id}
                                        AND individualinitiativedonations.initiativeid = initiative.initiativeid
                                        AND individualinitiativedonations.individualid = individual.individualid`
    
    const companyHistory = await sql `select company.name as cname, initiative.name as iname, amount, is_anonymous
                                      from company,initiative,companyinitiativedonations
                                      where initiative.nonprofitid = ${id}
                                      AND companyinitiativedonations.initiativeid = initiative.initiativeid
                                      AND companyinitiativedonations.companyid = company.companyid`
    
    const grantHistory = await sql `select name, amount, status 
                                    from grants
                                    where awardedto=${id}`

    const individual_history = individualHistory.rows;
    const company_history = companyHistory.rows;
    const grant_history = grantHistory.rows;
    return NextResponse.json({ user: user, individualHistory: individual_history, companyHistory: company_history, grantHistory: grant_history });
  }