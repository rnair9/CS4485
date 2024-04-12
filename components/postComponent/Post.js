import Link from "next/link";

function Post({ post }) {
  return (
    <div className="flex justify-center">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden my-10">
          <img src={post.image} className="w-full h-64 object-cover" alt={post.title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 text-white">{post.title}</div>
            <p className="text-gray-300 text-base">{post.desc}</p>
          </div>
          <div className="px-6 py-4 flex justify-center">
            <Link href="#" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-full transition duration-300">
              Donate
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;