import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LocaleConsumer } from "../contexts/LocaleContext.js";
import { register } from "../utils/network-data.js";
import FormRegister from "../components/index/FormRegister.js";

export default function RegisterPage() {
  const navigate = useNavigate();
  async function HandleRegister(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <main>
            <div className="register-page">
              <h2>
                {locale === "id"
                  ? "Isi form untuk mendaftar akun."
                  : "Fill the form to register account."}
              </h2>
              <div className="input-register">
                <FormRegister register={HandleRegister} />
              </div>
              <p>
                {locale === "id"
                  ? "Sudah punya akun?"
                  : "Already have an account?"}{" "}
                <Link to="/">
                  {" "}
                  {locale === "id" ? "Login di sini" : "Login here"}
                </Link>
              </p>
            </div>
          </main>
        );
      }}
    </LocaleConsumer>
  );
}
