"use client";
import Link from "next/link";
import Post from "../components/postComponent/Post";
import Volunteer from "../components/postComponent/Volunteer"
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isDonation, setIsDonation] = useState(true);
  const session = getSession();

  const fetchPosts = async () => {
    const response = await fetch(`api/createPost/donation`);
    const data = await response.json();
    // console.log(data.posts)
    setPosts(data.posts);
    setIsDonation(true);
  };

  const fetchVolunteer = async () => {
    const response = await fetch("api/createPost/volunteer");
    const data = await response.json();
    // console.log((await session).user.role);
    setPosts(data.posts);
    setIsDonation(false);
  };

  useEffect(() => {
    fetchPosts()
  },[]);
  return (
    <>
    <main className="min-h-screen items-center justify-between">
      <div className="flex justify-center mb-4 my-4">
        <button
          onClick={fetchPosts}
          className={`mx-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ${
            isDonation ? "bg-gray-700" : ""
          }`}
        >
          Fetch Posts
        </button>
        <button
          onClick={fetchVolunteer}
          className={`mx-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ${
            !isDonation ? "bg-gray-700" : ""
          }`}
        >
          Fetch Volunteer
        </button>
      </div>
      {isDonation ? (
        <div className="flex justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts
              .slice()
              .reverse()
              .map((post, index) => (
                <Post post={post} key={post.initiativeid} />
              ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts
              .slice()
              .reverse()
              .map((post, index) => (
                <Volunteer post={post} key={post.eventid} />
              ))}
          </div>
        </div>
      )}
    </main>

      <Link href="post-volunteer" className="text-blue-600">
        volunteer
      </Link>
      <br />
      <Link href="non-profit-profile" className="text-blue-600">
        Non profit profile prototype
      </Link>
      <br />
      <Link href="person_profile" className="text-blue-600">
        person profile
      </Link>
      <br />
      <Link href="company-profile" className="text-blue-600">
        company profile
      </Link>
      </>
  );
}
