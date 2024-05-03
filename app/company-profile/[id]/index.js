"use client";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Profile({ params }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState([])

  const router = useRouter();
  const session = getSession();
  const fetchUser = async () => {
    if ((await session).user.role === "Individual") {
      router.push("/");
    }
    const email1 = (await session).user.email;
    const response = await fetch(
      `/api/getUserbyid/getCompany?companyid=${params}`
    );
    const data = await response.json();
    // console.log(data)
    let base64 = new Buffer.from(data.user.logo, "base64");
    const imgString = "data:image/jpg;base64," + base64.toString("base64");
    // console.log(imgString)
    setDescription(data.user.description);
    setEmail(data.user.email);
    setName(data.user.name);
    setLogo(imgString);
    setHistory(data.history)
  };

  useEffect(() => {
    fetchUser();
  });
  return (
    <>
      <div className="p-16">
        <div className="container flex gap-14">
          <div style={{ width: 600 }}>
            <img
              src="https://parsadi.com/wp-content/uploads/2022/05/Company.jpg"
              className="rounded-full max-w-72"
            />
          </div>
          <div className="py-12">
            <h2 className="font-bold container text-4xl">{name}</h2>
            <p className="py-4">
              <b>Email:</b> {email}
            </p>
            <p className="py-4">
              <b>About the Company:</b> {description}
            </p>
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
  );
}
