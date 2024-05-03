"use client";
import Form from './form';
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default async function UpdateDonation({params}) {
  const session = await getServerSession();
      if (!session) {
          redirect("/");
      }
  return (
    <div>
      <Form params={params.id}/>
    </div>
  );
};