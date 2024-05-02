import Link from "next/link";
import Image from "next/image";

function Volunteer({ post, sharedBy }) {
    var date = new Date(post.eventdate)
    const dateFormatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(date);
  
  return (
    <div className="flex justify-center">
      <div className="max-w-md min-w-80 mx-auto">
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden my-10">
          <div className="relative h-64">
            <Image 
              src="https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png"
              layout="fill" 
              objectFit="cover" 
              alt={post.name} 
              className="object-cover rounded-t-lg"
            />
          </div>
          <div className="px-6 py-4">
            <h2 className="text-white text-xl font-bold mb-2">{post.name}</h2>
            <p className="text-gray-400 text-sm mt-2">Event Date: {dateFormatted}</p>
            <p className="text-gray-300 text-base">{post.description}</p>
            {sharedBy && (
              <p className="text-gray-400 text-sm mt-2">
                Shared by: {post.nonprofitid}
              </p>
            )}
          </div>
          <div className="px-6 py-4 flex justify-center">
            <Link href={"/volunteer_signup/" + post.name} passHref className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300">
                Volunteer Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Volunteer;