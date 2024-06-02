import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 font-bold text-2xl mt-8 bg-teal-500 p-6 max-w-4xl mx-auto rounded-md">
      GraphQL project client side
      <ul className="flex gap-6 font-medium mx-auto text-center cursor-pointer ">
        <Link to="/login" className="hover:font-bold hover:text-white">
          <li>Login</li>
        </Link>
        <Link to="/register" className="hover:font-bold hover:text-white">
          <li>Register</li>
        </Link>
        <Link to="/posts" className="hover:font-bold hover:text-white">
          <li>Posts</li>
        </Link>
      </ul>
    </div>
  );
}
