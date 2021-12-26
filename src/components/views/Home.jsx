import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Home() {
  const Token = useSelector((state) => state.user.Token);

  if (!Token) {
    console.log("home token", Token);
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div>home</div>
      <button>logout</button>
    </div>
  );
}
