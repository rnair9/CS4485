"use client";
import Link from "next/link";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useId, useState } from "react";

export default function Navbar({ session }){
  const [userType, setType] = useState("");
  const [userId, setId] = useState(null)
  // console.log(session)
  const handleClick = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  
  const handleUser = async () => {
    const session1 = getSession();
    let type = ((await session1).user.role)
    let email = ((await session1).user.email)
    setType(type);
    getUser(type, email)
  };

  const getUser = async(type, email) =>{
    if(type==="Company"){
        const response = await fetch(`api/getUser/getCompany?email=${email}`);
        const data = await response.json();
        // console.log(data.user.companyid)
        setId(data.user.companyid)
    }
  }

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <nav className="bg-gray-800">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white">CauseWay</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <Link
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                href="/"
              >
                Home
              </Link>
              <Link
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                href="/about-us"
              >
                About
              </Link>
              {userType === "Individual" ? (
                <Link
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  href="/person_profile"
                >
                  Profile
                </Link>
              ) : userType === "Nonprofit" ? (
                <>
                  <Link
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/non-profit-profile"
                  >
                    Profile
                  </Link>
                  <Link
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/post-initiative"
                  >
                    Create Initiative
                  </Link>
                  <Link
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/post-volunteer"
                  >
                    Create Volunteer Opportunity
                  </Link>
                </>
              ) : userType === "Company" ? (
                <>
                  <Link
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href={"/company-profile/"+userId}
                  >
                    Profile
                  </Link>
                  <Link
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/post-grant"
                  >
                    Create Grant
                  </Link>
                </>
              ) : (
                <></>
              )}
              {!!session ? (
                <button
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={handleClick}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    href="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
