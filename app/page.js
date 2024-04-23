import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-between p-8">
      <h1>Cause Way</h1>
      <Link href="person_profile" className="min-h-screen items-center justify-between p-8 text-blue-600">Person profile prototype</Link>
      <Link href="About_us" className="min-h-screen items-center justify-between p-8 text-blue-600">About Us</Link>
      <Link href="donation" className="min-h-screen items-center justify-between p-8 text-blue-600">Donation</Link>
      <Link href="volunteer_signup" className="min-h-screen items-center justify-between p-8 text-blue-600">Volunteer Sign Up</Link>
    </main>
  );
}