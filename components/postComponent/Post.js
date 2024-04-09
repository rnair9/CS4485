import Link from "next/link";

function Post({ post }) {
  return (
    <>
      <div class="p-6 w-96 cursor-pointer rounded-3xl border-2 border-stone-900">
        <img src={post.image} class="mx-auto h-64" />

        <div class="text-center">
          <h3 class="text-center text-4xl font-bold">{post.title}</h3>
          <p class="text-sm mb-10">{post.desc}</p>
        </div>
        <div class="text-center">
          <Link
            class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            href=""
          >
            Donate
          </Link>
        </div>
      </div>
    </>
  );
}

export default Post;
