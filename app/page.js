import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen items-center justify-between p-8">
      <h1>Cause Way</h1>
      <Link href="person_profile" className="min-h-screen items-center justify-between p-8 text-blue-600">Person profile prototype</Link>
    </main>
  );
}