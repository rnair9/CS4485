"use client";
import Form from './form';
import { getSession } from 'next-auth/react';
import {redirect} from "next/navigation";

export default async function UpdateDonation({params}) {
  const session = await getSession();
      if (!session) {
          redirect("/");
      }
  return (
    <div>
      <Form params={params.id}/>
    </div>
  );
};