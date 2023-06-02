import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [redirect, setRedirect] = useState(false);

  const intialvalue = {
    username: "",
    password: "",
  };
  const [login, setlogin] = useState(intialvalue);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setlogin((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // console.log(login);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      body: JSON.stringify(login),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    setlogin(intialvalue);
    // console.log(response);
    const data = await response.json();
    console.log(data);
    if (data === "ok") {
      alert("Login successful");
      setRedirect(true);
    } else if (data.msg === "wrong password") {
      alert("Invalid password");
    }
  };

  if (redirect) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <form className="login" onSubmit={handlesubmit}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={login.username}
        name="username"
        onChange={(e) => handlechange(e)}
      />
      <input
        type="text"
        placeholder="password"
        value={login.password}
        name="password"
        onChange={(e) => handlechange(e)}
      />
      <button>Login</button>
    </form>
  );
};

export default Login;
