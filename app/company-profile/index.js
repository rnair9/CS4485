"use client";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Profile() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [logo, setLogo] = useState("")
  const [description, setDescription] = useState("")
  const [history, setHistory] = useState([])
  
  const router = useRouter();
    const session = getSession()
    const fetchUser = async () => {
      if ((await session).user.role != "Company") {
        router.push("/");
      }
        const email1 = (await session).user.email
        const response = await fetch(`api/getUser/getCompany?email=${email1}`);
        const data = await response.json();
        // console.log(data)
        let base64 = new Buffer.from(data.user.logo, "base64")
        const imgString="data:image/jpg;base64,"+base64.toString("base64")
        // console.log(imgString)
        setDescription(data.user.description)
        setEmail(data.user.email)
        setName(data.user.name)
        setLogo(imgString)
        setHistory(data.history)
    }
    
      useEffect(() => {
        fetchUser()
      });
    return (
		<>
      <div className="p-16">
        <div className="container flex gap-14">
          <div style={{ width: 600 }}>
            <img
              src="https://www.placeofhope.com/wp-content/uploads/woocommerce-placeholder.png"
              className="rounded-full"
            />
            
          </div>
          <div className="py-12">
            <h2 className="font-bold container text-4xl">{name}</h2>
			<p className="py-4"><b>About the Company:</b> {description}</p>
            <div className="container flex gap-14 py-8">
			  <div className="container flex-col gap-2">
				<p className="font-bold text-xl pb-4">Grant Name</p>
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiYAAAD6CAMAAACic3wJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABUUExURdnZ2b29vZWVlYeHh6Kior6+vsvLyzY2NszMzERERF9fX6Ojow0NDQAAABsbG1FRUWxsbA4ODikpKUNDQ21tbbGxsYiIiLCwsHp6eigoKHl5eV5eXnZLboYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARlSURBVHhe7dvLYts2EAVQWQ+rkSvZcVI5bv//PytiBhRAiV5kJbbnLGIBFJkFbmZIGlkBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP5Wm92Wy2uxyxWM/7wTpHqzK6+CPHo28x/y2H1SGmX3LY2R7+PIbT6bWLyjbOak0vzEPZlXXc5GhVRhdvOa42OX/KcYqzj8fXHDd2+zyWDjk/qFdrTC7MY5mJyfccV3XNJ6tZ1/v7TfXZ1Eoyer8WFDFZmpmYXGeKbc5OV3OsGNOu85bzrfcxS2KyNHMx2edEeM3ZyWrWntO3lIt1Th/3h8OPsa6MX4qYnFr938eDmYtJVx+ucehjcq0KfZPanWL2EPXjZ4yOx7/KsJ7nAWg5ZmPS/vMei8kkJs1datd18vvnHK4+PqKi1McZMVma2Zg0C38tJn1MYv5X+bPtOvn9nzkcnI/HP/eHekkxWZp7MflR/ryWkygOpZF0McnVLjWl7Trx/fcchfVHfhiIydLci8lbNJO6jHGn8V4Wv4vJ5zCzX/09/Gi7TtyZdG2oJyZLczcmL+VH7SOxqOebmMSp59Vz+XntOvH03BeTnpgszd2YxL1pfWeW3eYmJlFFLos96Tox396sTInJ0tyPSZST8sZ+k8XkNibZc2ouxibzTz+8Iy65fWrkER7T/ZhEBSnl5FRvXacxiTN/XT5Nuk7cAdd3JPdETDp5hMc0E5MoEJcPuaKXh9tpTKJolM7Rd53+Bnjb6F+vdfIIj2kmJs/lfdglFLHmw6JPYxLPP+Vj33W6mMT1U33GFpOlmYlJ/u5unb/zGzYKTGLyUQ4MPad2neG0gZj898zFJMrJvmQj1nwSk6bnZDLqsTgna8sXMTm8NfIIj2kuJhmDUHYdTWLS9JxaezIZcWZe8vllfR6Us/uYZMRYgNmYtGWg3Hr2MYme82MTxjveQYRgsqGtfENMlmo2JvXm9SJWt49JdJZeHoxLTva/qSaLNh+TeMU2iA0BfUxKz5nKhY9j4zWLMicmSzUfk7GcZDS6mIy7Hjt5YtypnNr9sREMMVmqL2JSy0nuLupiEj0n//PEIB6M4mA8JTV3J7vcziYmS/VFTOKXNqcuGXXQPecMuufj3DD9LYe7eOEvJsv1VUzK08m5blVsYxI9J96theaXhRclYJdvv26fntblxLbaZEy69ybttXg4X8Xk+fN0et/Vf/RtTKLndOWgy0HdM31VtkL2MenUMsVD+iomvTYmNz1n0nVucnIqMRKTpfqtmNz2nNp1xrld9p3idNqVZInJUv1WTO70nEnXuTiPBWU/NK5hF4qYLNXzy2B8xVFGk/VPH8Oh2B/ffLwqk92etZfD/vP0+Rpzw+F6yq58tTO9GgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8D+zWv0LJ/BsADyigYcAAAAASUVORK5CYII="/>
				<p className="py-4">Lorem ipsum dolor sit amet, enim ad minim veniam, quis nostrud...</p>
				<button>Apply</button>
			  </div>
			  <div className="container flex-col gap-2">
				<p className="font-bold text-xl pb-4">Grant Name</p>
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiYAAAD6CAMAAACic3wJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABUUExURdnZ2b29vZWVlYeHh6Kior6+vsvLyzY2NszMzERERF9fX6Ojow0NDQAAABsbG1FRUWxsbA4ODikpKUNDQ21tbbGxsYiIiLCwsHp6eigoKHl5eV5eXnZLboYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARlSURBVHhe7dvLYts2EAVQWQ+rkSvZcVI5bv//PytiBhRAiV5kJbbnLGIBFJkFbmZIGlkBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP5Wm92Wy2uxyxWM/7wTpHqzK6+CPHo28x/y2H1SGmX3LY2R7+PIbT6bWLyjbOak0vzEPZlXXc5GhVRhdvOa42OX/KcYqzj8fXHDd2+zyWDjk/qFdrTC7MY5mJyfccV3XNJ6tZ1/v7TfXZ1Eoyer8WFDFZmpmYXGeKbc5OV3OsGNOu85bzrfcxS2KyNHMx2edEeM3ZyWrWntO3lIt1Th/3h8OPsa6MX4qYnFr938eDmYtJVx+ucehjcq0KfZPanWL2EPXjZ4yOx7/KsJ7nAWg5ZmPS/vMei8kkJs1datd18vvnHK4+PqKi1McZMVma2Zg0C38tJn1MYv5X+bPtOvn9nzkcnI/HP/eHekkxWZp7MflR/ryWkygOpZF0McnVLjWl7Trx/fcchfVHfhiIydLci8lbNJO6jHGn8V4Wv4vJ5zCzX/09/Gi7TtyZdG2oJyZLczcmL+VH7SOxqOebmMSp59Vz+XntOvH03BeTnpgszd2YxL1pfWeW3eYmJlFFLos96Tox396sTInJ0tyPSZST8sZ+k8XkNibZc2ouxibzTz+8Iy65fWrkER7T/ZhEBSnl5FRvXacxiTN/XT5Nuk7cAdd3JPdETDp5hMc0E5MoEJcPuaKXh9tpTKJolM7Rd53+Bnjb6F+vdfIIj2kmJs/lfdglFLHmw6JPYxLPP+Vj33W6mMT1U33GFpOlmYlJ/u5unb/zGzYKTGLyUQ4MPad2neG0gZj898zFJMrJvmQj1nwSk6bnZDLqsTgna8sXMTm8NfIIj2kuJhmDUHYdTWLS9JxaezIZcWZe8vllfR6Us/uYZMRYgNmYtGWg3Hr2MYme82MTxjveQYRgsqGtfENMlmo2JvXm9SJWt49JdJZeHoxLTva/qSaLNh+TeMU2iA0BfUxKz5nKhY9j4zWLMicmSzUfk7GcZDS6mIy7Hjt5YtypnNr9sREMMVmqL2JSy0nuLupiEj0n//PEIB6M4mA8JTV3J7vcziYmS/VFTOKXNqcuGXXQPecMuufj3DD9LYe7eOEvJsv1VUzK08m5blVsYxI9J96theaXhRclYJdvv26fntblxLbaZEy69ybttXg4X8Xk+fN0et/Vf/RtTKLndOWgy0HdM31VtkL2MenUMsVD+iomvTYmNz1n0nVucnIqMRKTpfqtmNz2nNp1xrld9p3idNqVZInJUv1WTO70nEnXuTiPBWU/NK5hF4qYLNXzy2B8xVFGk/VPH8Oh2B/ffLwqk92etZfD/vP0+Rpzw+F6yq58tTO9GgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8D+zWv0LJ/BsADyigYcAAAAASUVORK5CYII="/>
				<p className="py-4">Lorem ipsum dolor sit amet, enim ad minim veniam, quis nostrud...</p>
				<button>Apply</button>
			  </div>
			  <div className="container flex-col gap-2">
				<p className="font-bold text-xl pb-4">Grant Name</p>
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAiYAAAD6CAMAAACic3wJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABUUExURdnZ2b29vZWVlYeHh6Kior6+vsvLyzY2NszMzERERF9fX6Ojow0NDQAAABsbG1FRUWxsbA4ODikpKUNDQ21tbbGxsYiIiLCwsHp6eigoKHl5eV5eXnZLboYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARlSURBVHhe7dvLYts2EAVQWQ+rkSvZcVI5bv//PytiBhRAiV5kJbbnLGIBFJkFbmZIGlkBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP5Wm92Wy2uxyxWM/7wTpHqzK6+CPHo28x/y2H1SGmX3LY2R7+PIbT6bWLyjbOak0vzEPZlXXc5GhVRhdvOa42OX/KcYqzj8fXHDd2+zyWDjk/qFdrTC7MY5mJyfccV3XNJ6tZ1/v7TfXZ1Eoyer8WFDFZmpmYXGeKbc5OV3OsGNOu85bzrfcxS2KyNHMx2edEeM3ZyWrWntO3lIt1Th/3h8OPsa6MX4qYnFr938eDmYtJVx+ucehjcq0KfZPanWL2EPXjZ4yOx7/KsJ7nAWg5ZmPS/vMei8kkJs1datd18vvnHK4+PqKi1McZMVma2Zg0C38tJn1MYv5X+bPtOvn9nzkcnI/HP/eHekkxWZp7MflR/ryWkygOpZF0McnVLjWl7Trx/fcchfVHfhiIydLci8lbNJO6jHGn8V4Wv4vJ5zCzX/09/Gi7TtyZdG2oJyZLczcmL+VH7SOxqOebmMSp59Vz+XntOvH03BeTnpgszd2YxL1pfWeW3eYmJlFFLos96Tox396sTInJ0tyPSZST8sZ+k8XkNibZc2ouxibzTz+8Iy65fWrkER7T/ZhEBSnl5FRvXacxiTN/XT5Nuk7cAdd3JPdETDp5hMc0E5MoEJcPuaKXh9tpTKJolM7Rd53+Bnjb6F+vdfIIj2kmJs/lfdglFLHmw6JPYxLPP+Vj33W6mMT1U33GFpOlmYlJ/u5unb/zGzYKTGLyUQ4MPad2neG0gZj898zFJMrJvmQj1nwSk6bnZDLqsTgna8sXMTm8NfIIj2kuJhmDUHYdTWLS9JxaezIZcWZe8vllfR6Us/uYZMRYgNmYtGWg3Hr2MYme82MTxjveQYRgsqGtfENMlmo2JvXm9SJWt49JdJZeHoxLTva/qSaLNh+TeMU2iA0BfUxKz5nKhY9j4zWLMicmSzUfk7GcZDS6mIy7Hjt5YtypnNr9sREMMVmqL2JSy0nuLupiEj0n//PEIB6M4mA8JTV3J7vcziYmS/VFTOKXNqcuGXXQPecMuufj3DD9LYe7eOEvJsv1VUzK08m5blVsYxI9J96theaXhRclYJdvv26fntblxLbaZEy69ybttXg4X8Xk+fN0et/Vf/RtTKLndOWgy0HdM31VtkL2MenUMsVD+iomvTYmNz1n0nVucnIqMRKTpfqtmNz2nNp1xrld9p3idNqVZInJUv1WTO70nEnXuTiPBWU/NK5hF4qYLNXzy2B8xVFGk/VPH8Oh2B/ffLwqk92etZfD/vP0+Rpzw+F6yq58tTO9GgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8D+zWv0LJ/BsADyigYcAAAAASUVORK5CYII="/>
				<p className="py-4">Lorem ipsum dolor sit amet, enim ad minim veniam, quis nostrud...</p>
				<button>Apply</button>
			  </div>
			</div>
		  </div>
      <p className="font-bold pb-4 px-2">Previous Donations:</p>
          <table>
            <tbody>
              <tr>
                <th>Nonprofit</th>
                <th>Initiative</th>
                <th>Amount (USD)</th>
              </tr>
              {history!=[] && history.map(donation => 
              <tr key={donation.iname}>
                <td>{donation.npname}</td>
                <td>{donation.iname}</td>
                <td>{donation.amount}</td>
              </tr>
              )}
            </tbody>  
          </table>
        </div>
        
      </div>
      
	  </>
    )
    }