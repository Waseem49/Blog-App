import React, { useState } from "react";

const Register = () => {
  const intialvalue = {
    username: "",
    password: "",
  };
  const [register, setRegister] = useState(intialvalue);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setRegister((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // console.log(register);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      body: JSON.stringify(register),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok === false) {
      alert("Failed to register || username is already available");
    } else {
      alert("Successfully registered");
    }
  };

  return (
    <form className="register" onSubmit={handlesubmit}>
      <h1>Register</h1>
      {/* <p>{ response.ok===false ? "Failed to register ,username is already available":"successfully registered"}</p> */}
      <input
        type="text"
        placeholder="username"
        value={register.username}
        name="username"
        onChange={(e) => handlechange(e)}
      />
      <input
        type="text"
        placeholder="password"
        value={register.password}
        name="password"
        onChange={(e) => handlechange(e)}
      />
      <button>Register</button>
    </form>
  );
};

export default Register;
