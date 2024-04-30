"use client";

import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Profile() {

    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const session = getSession()

    const fetchUser = async () => {
        console.log((await session).user)
        const email = (await session).user.email
        const response = await fetch(`api/getUser/getIndividual?email=${email}`);
        const data = await response.json();
        // console.log(data)
        setEmail(data.user.email)
        setFirstName(data.user.firstname)
        setLastName(data.user.lastname)
    }
    
      useEffect(() => {
        fetchUser()
      });

    return (
      <>
      <div className="p-8">
        <form className="m-4 flex">
            <h2 className="container text-3xl">{firstname} {lastname}</h2>
        </form>
        <div className="container flex gap-20">
          <div>
            <div className="container divide-y divide-black my-4">
              <p className="font-bold pb-4 px-2 py-10">
                Email: {email}
              </p>
            <p></p>
            </div>
            <div className="px-6">
            <div className="box-content  h-76 w-64 p-4 border-4 bg-gray-400">
                <h2 className="font-bold text-xl pb-4">Organizations </h2> 
                <p className="py-4 px-2">Make-A-Wish</p>
                <p className="py-4 px-2">Save Children</p>
                <p className="py-4 px-2">Save Children</p>
                <p className="py-4 px-2">Save Children</p>
                <p className="py-4 px-2">Save Children</p>
            </div>
          </div>
          </div>
          <div className="px-6">
            <p className="font-bold text-xl pb-2 py-10">Total donated: $ 340.65</p>
          </div>
            

        </div>
      </div>
      </>
    )
    }