"use client";
import Link from "next/link";
import Logout from "../../app/logout";
import { getServerSession } from "next-auth";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getServerSession();
      setSession(sessionData);
    };
    fetchSession();
  }, []);

  return (
    <nav className="bg-gray-800">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {/* Your logo or brand icon */}
              <span className="text-white">CauseWay</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              {/* Navbar links */}
              <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/">
                Home
              </Link>
              <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/about">
                About
              </Link>
              {!!session ? (
                <Logout />
              ) : (
                <>
                  <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/login">
                    Login
                  </Link>
                  <Link className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="/register">
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