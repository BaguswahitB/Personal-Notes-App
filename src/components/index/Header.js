import React from "react";
import { Link } from "react-router-dom";
import { IoSunnyOutline, IoLogInOutline, IoMoonOutline } from "react-icons/io5";
import { MdGTranslate } from "react-icons/md";
import { ThemeConsumer } from "../../contexts/ThemeContext.js";
import { LocaleConsumer } from "../../contexts/LocaleContext.js";
import propTypes from "prop-types";

export default function Header({ name, ifLogin, logout }) {
  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => {
        return (
          <>
            {ifLogin ? (
              <header>
                <h1>
                  <Link to="/">
                    {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
                  </Link>
                </h1>
                <button
                  className="toggle-locale"
                  type="button"
                  onClick={toggleLocale}
                >
                  {locale === "id" ? <MdGTranslate /> : <MdGTranslate />}
                </button>

                <ThemeConsumer>
                  {({ theme, toggleTheme }) => {
                    return (
                      <button
                        className="toggle-theme"
                        type="button"
                        onClick={toggleTheme}
                      >
                        {theme === "light" ? (
                          <IoMoonOutline />
                        ) : (
                          <IoSunnyOutline />
                        )}
                      </button>
                    );
                  }}
                </ThemeConsumer>
              </header>
            ) : (
              <header>
                <h1>
                  <Link to="/">
                    {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
                  </Link>
                </h1>
                <nav className="navigation">
                  <ul>
                    <li>
                      <Link to="/archives">
                        {locale === "id" ? "Arsip" : "Archives"}
                      </Link>
                    </li>
                  </ul>
                </nav>
                <LocaleConsumer>
                  {({ locale, toggleLocale }) => {
                    return (
                      <button
                        className="toggle-locale"
                        type="button"
                        onClick={toggleLocale}
                      >
                        {locale === "id" ? <MdGTranslate /> : <MdGTranslate />}
                      </button>
                    );
                  }}
                </LocaleConsumer>
                <ThemeConsumer>
                  {({ theme, toggleTheme }) => {
                    return (
                      <button
                        className="toggle-theme"
                        type="button"
                        onClick={toggleTheme}
                      >
                        {theme === "light" ? (
                          <IoMoonOutline />
                        ) : (
                          <IoSunnyOutline />
                        )}
                      </button>
                    );
                  }}
                </ThemeConsumer>
                <button
                  className="button-logout"
                  type="button"
                  onClick={logout}
                >
                  <IoLogInOutline /> {name}
                </button>
              </header>
            )}
          </>
        );
      }}
    </LocaleConsumer>
  );
}

Header.propTypes = {
  logout: propTypes.func,
  name: propTypes.string,
  ifLogin: propTypes.bool,
};
