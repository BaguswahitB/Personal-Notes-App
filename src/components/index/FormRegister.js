import React, { useState } from "react";
import propTypes from "prop-types";

export default function FormRegister({ register }) {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [name, setName] = useState([]);
  const [nowpassword, setNowpassword] = useState([]);

  const HandleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const HandleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const HandleChangeName = (e) => {
    setName(e.target.value);
  };
  const HandleChangeNowPassword = (e) => {
    setNowpassword(e.target.value);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    register({
      name: name,
      email: email,
      password: password,
      nowpassword: nowpassword,
    });
  };

  return (
    <form onSubmit={HandleSubmit}>
      <label>Name</label>
      <input type="text" id="name" onChange={HandleChangeName} />
      <label>Email</label>
      <input type="email" id="email" onChange={HandleChangeEmail} />
      <label>Password</label>
      <input type="password" id="password" onChange={HandleChangePassword} />
      <label>Confirm Password</label>
      <input
        type="password"
        id="nowpassword"
        onChange={HandleChangeNowPassword}
      />
      <button>Register</button>
    </form>
  );
}

FormRegister.propTypes = {
  register: propTypes.func,
};
