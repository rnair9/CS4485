export default function profile() {
    return (
      <div className="p-8">
        <form class="m-4 flex">
            <h2 className="container text-3xl p-8">John Smith</h2>
            <button class="px-8 rounded-r-lg rounded-l-lg bg-green-400 text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">Follow</button>
        </form>
        <div className="container flex gap-20">
          <div>
            <img
              src="data:image/png;base64,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"
              className="rounded-full"
            />
            <div className="container divide-y divide-black my-4">
              <p className="font-bold pb-4 px-2 py-10">
                Age: 34<br></br>
                Richardson, TX
              </p>
            <p></p>
            </div>
            <div className="px-6">
            <div class="box-content  h-76 w-64 p-4 border-4 bg-gray-400">
                <h2 className="font-bold text-xl pb-4">Organizations </h2> 
                <p className="py-4 px-2">Make-A-Wish</p>
                <p className="py-4 px-2">Save Children</p>
                <p className="py-4 px-2">Save Children</p>
                <p className="py-4 px-2">Save Children</p>
                <p className="py-4 px-2">Save Children</p>
            </div>
          </div>
          </div>
          <div className="px-6">
            <p className="text-l pb-2 ">Hi<br></br> I am bob the builder I like building donating and volunteering</p>
            <p className="font-bold text-xl pb-2 py-10">Total donated: $ 340.65</p>
                <div>Posts/donation Component will be here</div>
          </div>
            

        </div>
      </div>
    )
    }