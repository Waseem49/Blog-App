import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/usercontext";

const Header = () => {
  const { userinfo, setuserinfo } = useContext(userContext);
  useEffect(() => {
    fetch("http://localhost:5000/users/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((info) => {
        // console.log(info.username);
        setuserinfo(info);
      });
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:5000/users/logout", {
      credentials: "include",
      method: "POST",
    });
    setuserinfo(null);
  };
  const username = userinfo?.username;
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
