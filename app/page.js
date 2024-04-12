import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar/Navbar";
import Post from "../components/postComponent/Post";

export default function Home() {
  const posts = [
    {
      title: "Post 1",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      owner: "Organization A",
    },
    {
      title: "Post 2",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      owner: "Organization B",
    },
    {
      title: "Post 3",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      owner: "Organization C",
    },
    {
      title: "Post 4",
      desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      owner: "Organization D",
    },
    {
      title: "Post 5",
      desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      image: "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      owner: "Organization E",
    },
    {
      title: "Post 6",
      desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      image: "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      owner: "Organization F",
    },
    {
      title: "Post 7",
      desc: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      image: "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      owner: "Organization G",
    },
    {
      title: "Post 8",
      desc: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
      image: "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      owner: "Organization H",
    },
    {
      title: "Post 9",
      desc: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      image: "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      owner: "Organization I",
    },
    {
      title: "Post 10",
      desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      image: "https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png",
      owner: "Organization J",
    },
  ];
  return (
    <main className="min-h-screen items-center justify-between">
      <Navbar />
      <div className="flex justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.map((post, index) => (
            <Post post={post} />
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
