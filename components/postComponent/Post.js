"use client";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Post({ post, sharedBy, email, role }) {
  const [isRightUser, setIsRightUser] = useState(false)
  const [userid, setID] = useState("")
  const session = getSession()

  const fetchUser = async () => {
    if((await session).user){
      const email = (await session).user.email
      const response = await fetch(`api/getUser/getNonProfit?email=${email}`);
      const data = await response.json();
      setID(post.nonprofitid)
      if(role ==="Nonprofit"){

        if(data.user.nonprofitid == post.nonprofitid){
          setIsRightUser(true)
        }
      }
    }
    // console.log(userid)
}

  useEffect(() => {
    fetchUser()
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
              alt={post.title}
              className="object-cover rounded-t-lg"
            />
          </div>
          <div className="px-6 py-4">
            <h2 className="text-white text-xl font-bold mb-2">{post.name}</h2>
            <p className="text-gray-400 text-sm mt-2">
              <b>Category: </b>
              {post.category}
            </p>
            <p className="text-gray-300 text-base">{post.description}</p>
            {sharedBy && (
              <p className="text-gray-400 text-sm mt-2">
                Shared by: {post.nonprofitid}
              </p>
            )}
          </div>
          {(role === "Nonprofit" && isRightUser) ? (
            <div className="px-6 py-4 flex justify-center">
              <Link
                href={"/updateDonation/" + post.initiativeid}
                passHref
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
              >
                Update
              </Link>
            </div>
          ) : role ==="Nonprofit" ? (
            <><div className="px-6 py-4 flex justify-center">
            <Link
              href={"/non-profit-profile/" + userid}
              passHref
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mx-2 py-2 px-4 rounded-full transition duration-300"
            >
              Non-profit Profile
            </Link>
          </div></>
          ):(
            <div className="px-6 py-4 flex justify-center">
              <Link
                href={"/donation/" + post.category}
                passHref
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mx-2 py-2 px-4 rounded-full transition duration-300"
              >
                Donate Now
                </Link>
                <Link
              href={"/non-profit-profile/" + post.nonprofitid}
              passHref
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mx-2 py-2 px-4 rounded-full transition duration-300"
            >
              Non-profit Profile
            </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
