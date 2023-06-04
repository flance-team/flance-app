"use client";
import Image from "next/image";

// import LoginForm from "./LoginForm/Page";
import UserHome from "./UserHome/page";

export default function Home() {
  return (
    <div className="bg-white p-1">
      <UserHome />
    </div>
  );
}
