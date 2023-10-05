import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { LocaleConsumer } from "../contexts/LocaleContext.js";
import { login } from "../utils/network-data.js";
import FormLogin from "../components/index/FormLogin.js";

export default function LoginPage({ success }) {
  async function Login({ email, password }) {
    const { error, data } = await login({ email, password });
    if (!error) {
      success(data);
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <main>
            <div className="login-page">
              <h2>
                {locale === "id"
                  ? "Login menggunakan aplikasi."
                  : "Login to use app."}
              </h2>
              <div className="input-login">
                <FormLogin login={Login} />
              </div>
              <p>
                {locale === "id"
                  ? "Belum punya akun?"
                  : "Dont have an account?"}{" "}
                <Link to="/register">
                  {" "}
                  {locale === "id" ? "Daftar di sini" : "Register here"}{" "}
                </Link>{" "}
              </p>
            </div>
          </main>
        );
      }}
    </LocaleConsumer>
  );
}

LoginPage.propTypes = {
  success: propTypes.func.isRequired,
};
