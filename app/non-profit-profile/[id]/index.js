"use client";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Profile({params}) {

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [email, setEmail] = useState("")
    const [logo, setLogo] = useState("")
    const [description, setDescription] = useState("")
    const [individualHistory, setIndividualHistory] = useState([])
    const [companyHistory, setCompanyHistory] = useState([])
    const [grantHistory, setGrantHistory] = useState([])

    const session = getSession()


    const fetchUser = async () => {
      // console.log(params)
        const response = await fetch(`/api/getUserbyid/getNonProfit?nonprofitid=${params}`);
        const data = await response.json();
        console.log(data.user)
        let base64 = new Buffer.from(data.user.logo, "base64")
        const imgString="data:image/jpg;base64,"+base64.toString("base64")
        // console.log(imgString)
        setCategory(data.user.category)
        setDescription(data.user.description)
        setEmail(data.user.email)
        setName(data.user.name)
        setLogo(imgString)
        setIndividualHistory(data.individualHistory)
        setCompanyHistory(data.companyHistory)
        setGrantHistory(data.grantHistory)
    }
    
      useEffect(() => {
        fetchUser()
      });

  return (
    <>
    <div className="p-8">
      <h2 className="container text-3xl">{name}</h2>
      <div className="container flex gap-14">
        <div>
          <img
            src="https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png"
            className="rounded-full"
          />
          <div className="container divide-y divide-black my-4">
            <p className="font-bold pb-4 px-2">Email: {email}</p>
            <p className="font-bold pb-4 px-2">Category: {category}</p>
            <p className="py-4 px-2">
              {description}
            </p>
          </div>
        </div>
        <div className="px-6">
          <div className="flex flex-col gap-4 pt-4 w-full">
            <h1>Donors List</h1>
            <h2>Companies:</h2>
            <table>
            <tbody>
              <tr>
                <th>Company</th>
                <th>Initiative</th>
                <th>Amount (USD)</th>
              </tr>
              {companyHistory!=[] && companyHistory.map(donation => 
              <tr key={donation.cname}>
                <td>{donation.is_anonymous ? "Anonymous" : donation.cname}</td>
                <td>{donation.iname}</td>
                <td>{donation.amount}</td>
              </tr>
              )}
            </tbody>  
          </table>
          <h2>Individuals:</h2>
            <table>
            <tbody>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Initiative</th>
                <th>Amount (USD)</th>
              </tr>
              {individualHistory!=[] && individualHistory.map(donation => 
              <tr key={donation.fname + donation.lname}>
                <td>{donation.is_anonymous ? "Anonymous" : donation.fname}</td>
                <td>{donation.is_anonymous ? "N/A" : donation.lname}</td>
                <td>{donation.iname}</td>
                <td>{donation.amount}</td>
              </tr>
              )}
            </tbody>  
          </table>
          <h2>Grants:</h2>
            <table>
            <tbody>
              <tr>
                <th>Grant Name</th>
                <th>Amount (USD)</th>
                <th>Status</th>
              </tr>
              {grantHistory!=[] && grantHistory.map(grant => 
              <tr key={grant.name}>
                <td>{grant.name}</td>
                <td>{grant.amount}</td>
                <td>{grant.status=="Open" ? "Pending" : "Received"}</td>
              </tr>
              )}
            </tbody>  
          </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
