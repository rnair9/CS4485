"use client";
import Form from './form';
import {redirect} from "next/navigation";
import { getSession } from 'next-auth/react';

export default async function Donation ({params}){
    const session = await getSession();
    if (!session) {
        redirect("/");
    }
    return (
        <>
        <Form params={params.title}/>
        </>
    );
};
