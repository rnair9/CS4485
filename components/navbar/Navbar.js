"use client";
import Link from "next/link";
import { getSession, signOut } from "next-auth/react";

export default function Navbar({ session }) {
  // console.log(session)
  const handleClick = async() => {
    try {
      await signOut()
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

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
