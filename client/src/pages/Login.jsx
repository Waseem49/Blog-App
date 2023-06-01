import React, { useState } from "react";

const Login = () => {
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
  console.log(login);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/users/login", {
      method: "POST",
      body: JSON.stringify(login),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    // if (response.ok === false) {
    //   alert("Failed to register || username is already available");
    // } else {
    //   alert("Successfully registered");
    // }
  };

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
