"use client";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Profile() {

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [email, setEmail] = useState("")
    const [logo, setLogo] = useState("")
    const [description, setDescription] = useState("")

    const session = getSession()


    const fetchUser = async () => {
        // console.log(session)
        const email = (await session).user.email
        const response = await fetch(`api/getUser/getNonProfit?email=${email}`);
        const data = await response.json();
        let base64 = new Buffer.from(data.user.logo, "base64")
        const imgString="data:image/jpg;base64,"+base64.toString("base64")
        // console.log(imgString)
        setCategory(data.user.category)
        setDescription(data.user.description)
        setEmail(data.user.email)
        setName(data.user.name)
        setLogo(imgString)
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
          <p className="font-bold text-xl pb-4">Total raised: $ 3131.31</p>
          <div>
          <Link href="#" passHref className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300">
                Donate Now
            </Link>
          </div>
          <div className="flex flex-col gap-4 pt-4 w-full">
            <h1>Donors List</h1>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
