import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["haha"]);

  setCookie("haha", "hie", { path: "/" });

  return (
    <div>
      <div>home</div>
      <Link to="/login">
        <button>login</button>
      </Link>
      <button>logout</button>
    </div>
  );
}
