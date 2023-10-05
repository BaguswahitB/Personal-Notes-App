import React, { useState } from "react";
import propTypes from "prop-types";

export default function FormLogin({ login }) {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const HandleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const HandleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    login({
      email: email,
      password: password,
    });
  };

  return (
    <form onSubmit={HandleSubmit}>
      <label>Email</label>
      <input type="email" id="email" onChange={HandleChangeEmail} />
      <label>Password</label>
      <input type="password" id="password" onChange={HandleChangePassword} />
      <button>Login</button>
    </form>
  );
}

FormLogin.propTypes = {
  login: propTypes.func,
};
