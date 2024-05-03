"use client";
import Link from "next/link";
import Post from "../components/postComponent/Post";
import Volunteer from "../components/postComponent/Volunteer";
import Grant from "../components/postComponent/Grant";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [isDonation, setIsDonation] = useState(true);
  const [isGrant, setIsGrant] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [userEmail, setEmail] = useState("")
  const [role, setRole] = useState("")
  const session = getSession();

  const fetchPosts = async () => {
    const response = await fetch(`api/createPost/donation`);
    const data = await response.json();
    // console.log(data.posts)
    setPosts(data.posts);
    setIsDonation(true);
    setIsVolunteer(false);
    setIsGrant(false);
    setEmail((await session).user.email)
    setRole((await session).user.role)
  };

  const fetchVolunteer = async () => {
    const response = await fetch("api/createPost/volunteer");
    const data = await response.json();
    // console.log((await session).user.role);
    setPosts(data.posts);
    setIsDonation(false);
    setIsVolunteer(true);
    setIsGrant(false);
  };

  const fetchGrant = async () => {
    const response = await fetch("api/createPost/grant");
    const data = await response.json();
    setPosts(data.posts);
    setIsDonation(false);
    setIsVolunteer(false);
    setIsGrant(true);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
              isVolunteer ? "bg-gray-700" : ""
            }`}
          >
            Fetch Volunteer
          </button>
          <button
            onClick={fetchGrant}
            className={`mx-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ${
              isGrant ? "bg-gray-700" : ""
            }`}
          >
            Fetch Grant
          </button>
        </div>
        {isDonation && !isVolunteer && !isGrant ? (
          <>
            <div className="flex justify-center">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-bold text-4xl py-8 text-center">
                  Initiatives
                </h1>
                {posts
                  .slice()
                  .reverse()
                  .map((post, index) => (
                    <Post post={post} key={post.initiativeid} email={userEmail} role={role}/>
                  ))}
              </div>
            </div>
          </>
        ) : isVolunteer && !isGrant && !isDonation ? (
          <div className="flex justify-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="font-bold text-4xl py-8 text-center">
                Volunteer Opportunities
              </h1>
              {posts
                .slice()
                .reverse()
                .map((post, index) => (
                  <Volunteer post={post} key={post.eventid} email={userEmail} role={role}/>
                ))}
            </div>
          </div>
        ) : isGrant && !isDonation && !isVolunteer ? (
          <div className="flex justify-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="font-bold text-4xl py-8 text-center">Grants</h1>
              {posts
                .slice()
                .reverse()
                .map((post, index) => (
                  <Grant post={post} key={post.eventid} role={role} />
                ))}
            </div>
          </div>
        ) : (
          <div>No content to display</div>
        )}
      </main>
    </>
  );
}
