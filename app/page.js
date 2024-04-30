"use client";
import Link from "next/link";
import Post from "../components/postComponent/Post";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";


export default function Home() {
  const [posts, setPosts] = useState([])
  const session = getSession()

  const fetchPosts = async () => {
    const response = await fetch(`api/createPost/donation`);
    const data = await response.json();
    // console.log(data.posts)
    setPosts(data.posts)
}

useEffect(() => {
  fetchPosts()
});
  return (
    <main className="min-h-screen items-center justify-between">
      <div className="flex justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.toReversed().map((post, index) => (
            <Post post={post} key={post.initiativeid} />
          ))}
        </div>
      </div>
      <Link href="post-volunteer" className="text-blue-600">volunteer</Link>
      <br/>
      <Link href="non-profit-profile" className="text-blue-600">Non profit profile prototype</Link>
      <br/>
      <Link href="person_profile" className="text-blue-600">person profile</Link>
      <br/>
      <Link href="company-profile" className="text-blue-600">company profile</Link>
    </main>
  );
}