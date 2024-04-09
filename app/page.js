import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-between p-8">
      <h1>Cause Way</h1>
      <Link href="non-profit-profile" className="text-blue-600">Non profit profile prototype</Link>
      <br/>
      <Link href="person_profile" className="text-blue-600">person profile</Link>
      <br/>
      <Link href="company-profile" className="text-blue-600">company profile</Link>
    </main>
  );

}
  