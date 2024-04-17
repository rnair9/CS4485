import Link from "next/link";
import Navbar from "../components/navbar/Navbar";
import Post from "../components/postComponent/Post";
import {getServerSession} from "next-auth";


export default async function Home() {
  const session = await getServerSession()
  // console.log(session)
  const posts = [
    {
      "id": 1,
      "title": "Post 1",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "image": "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      "owner": "Organization A"
    },
    {
      "id": 2,
      "title": "Post 2",
      "desc": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "image": "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      "owner": "Organization B"
    },
    {
      "id": 3,
      "title": "Post 3",
      "desc": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "image": "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      "owner": "Organization C"
    },
    {
      "id": 4,
      "title": "Post 4",
      "desc": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "image": "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      "owner": "Organization D"
    },
    {
      "id": 5,
      "title": "Post 5",
      "desc": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      "image": "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      "owner": "Organization E"
    }
  ];
  return (
    <main className="min-h-screen items-center justify-between">
      <Navbar session={session}/>
      <div className="flex justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.map((post, index) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      </div>

      <Link href="non-profit-profile" className="text-blue-600">Non profit profile prototype</Link>
      <br/>
      <Link href="person_profile" className="text-blue-600">person profile</Link>
      <br/>
      <Link href="company-profile" className="text-blue-600">company profile</Link>
    </main>
  );
}
