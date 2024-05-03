"use client";

import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Profile() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [history, setHistory] = useState([])

  const session = getSession();
  const router = useRouter();


  

  const fetchUser = async () => {
    // console.log((await session).user.role)
    if ((await session).user.role != "Individual") {
      router.push("/");
    }
    const email = (await session).user.email;
    const response = await fetch(`api/getUser/getIndividual?email=${email}`);
    const data = await response.json();
    // console.log(data)
    setEmail(data.user.email);
    setFirstName(data.user.firstname);
    setLastName(data.user.lastname);
    setHistory(data.history)
    
    
  };

  useEffect(() => {
    fetchUser();
  });

  return (
    <>
      <div className="p-8">
        <form className="m-4 flex">
          <h2 className="container text-3xl">
            {firstname} {lastname}
          </h2>
        </form>
        <div className="container flex gap-20">
          <div>
            <div className="container divide-y divide-black my-4">
              <p className="font-bold pb-4 px-2 py-10">Email: {email}</p>
              <p></p>
            </div>
            <div className="px-6">
              <div className="box-content  h-76 w-64 p-4 border-4 bg-gray-400">
                {/*<h2 className="font-bold text-xl pb-4">Organizations </h2>
                <p className="py-4 px-2">Make-A-Wish</p>
                <p className="py-4 px-2">Save Children</p>
                <p className="py-4 px-2">Save Children</p>
                <p className="py-4 px-2">Save Children</p>
                <p className="py-4 px-2">Save Children</p>*/}
                <p className="font-bold pb-4 px-2">Previous Donations:</p>
                <table>
                  <tbody>
                    <tr>
                      <th>Nonprofit</th>
                      <th>Initiative</th>
                      <th>Amount (USD)</th>
                    </tr>
                    {history!=[] && history.map(donation => 
                    <tr key={donation.iname}>
                      <td>{donation.npname}</td>
                      <td>{donation.iname}</td>
                      <td>{donation.amount}</td>
                    </tr>
                   )}
                  </tbody>  
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
