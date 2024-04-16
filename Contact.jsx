'use client'


import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";



const Contact = () => {
const[data, setData] = useState({
    name: "",
    email:  "",
    subject: "",
    message: "",
});


  const sendEmail = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/send', { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringfy(data),
    })

    if(response.status === 200) {
        setData({})
    toast.success('Hey ${data.name}, thank you for your donation')
    }
  };

}
