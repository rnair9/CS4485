"use client";
import Form from './form';

export default function Donation ({params}){
  return (
    <div>
      <Form params={params.id}/>
    </div>
  );
};