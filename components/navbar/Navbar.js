import Link from "next/link";
import Logout from "../../app/logout";
import {getServerSession} from "next-auth";
const session = await getServerSession();
export default function Navbar() {
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
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {!!session && <Logout />}
                {!session && <Link href="/login">Login</Link>}
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {!session && <Link href="/login">Register</Link>}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
