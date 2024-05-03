"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import sendEmail from "../../app/email-utility";

function Grant({ post, sharedBy, role, email }) {
  var date = new Date(post.deadline);
  const [isApplied, setIsApplied] = useState(false);
  const dateFormatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  // console.log(post)

  const handleSendEmail = async (e) => {
    console.log(email);
    await sendEmail(
      `${email}`,
      `Grant Application`,
      ` <div className="p-8 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
  <p className="mb-4">Hello,</p>
  <h1 className="text-3xl font-bold mb-4">Thank You for Volunteering!</h1>
  <p className="mb-4">Your Application for the grant is processed</p>
  <p className="mb-4">Thank you for your interest</p>
  <p className="mb-4">Company will reach out to you from your email</p>
  <p className="mb-4">Best regards,</p>
  <p>CauseWay Team</p>
</div>`
    );
    alert("Application processed, and email sent for confirmation");
    setIsApplied(true)
    // router.push("/")
  };

  useEffect(() => {
    console.log(role);
  });
  return (
    <div className="flex justify-center">
      <div className="max-w-md min-w-80 mx-auto">
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden my-10">
          <div className="relative h-64">
            <Image
              src="https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png"
              layout="fill"
              objectFit="cover"
              alt={post.name}
              className="object-cover rounded-t-lg"
            />
          </div>
          <div className="px-6 py-4">
            <h2 className="text-white text-xl font-bold mb-2">{post.name}</h2>
            <p className="text-gray-400 text-sm mt-2">
              Deadline: {dateFormatted}
            </p>
            <p className="text-gray-400 text-sm mt-2">Amount ${post.amount}</p>
            <p className="text-gray-400 text-sm mt-2">Status: {post.status}</p>
            <p className="text-gray-300 text-base">{post.description}</p>
            {sharedBy && (
              <p className="text-gray-400 text-sm mt-2">
                Shared by: {post.companyid}
              </p>
            )}
          </div>
          {role === "Individual" ? (
            <></>
          ) : role === "Company" ? (
            <div className="px-6 py-4 flex justify-center">
              <Link
                href={"/company-profile/" + post.companyid}
                passHref
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mx-2 rounded-full transition duration-300"
              >
                Go to Profile
              </Link>
            </div>
          ) : isApplied?(
            <div className="px-6 py-4 flex justify-center">

              <Link
                href={"/company-profile/" + post.companyid}
                passHref
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mx-2 rounded-full transition duration-300"
              >
                Go to Profile
              </Link>
            </div>
          ):(
            <div className="px-6 py-4 flex justify-center">
              <Link
                href="#"
                passHref
                onClick={handleSendEmail}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mx-2 rounded-full transition duration-300"
              >
                Apply
              </Link>
              <Link
                href={"/company-profile/" + post.companyid}
                passHref
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mx-2 rounded-full transition duration-300"
              >
                Go to Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Grant;
