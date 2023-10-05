import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/index/Header.js";
import ActivePage from "./pages/ActivePage.js";
import ArchivePage from "./pages/ArchivePage.js";
import NewPage from "./pages/NewPage.js";
import NotfoundPage from "./pages/NotfoundPage.js";
import ViewsPage from "./pages/ViewsPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import { ThemeProvider } from "./contexts/ThemeContext.js";
import { LocaleProvider } from "./contexts/LocaleContext.js";
import { putAccessToken, getUserLogged } from "./utils/network-data.js";

export default class app extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: localStorage.getItem("locale") || "id",
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale =
              prevState.localeContext.locale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLocale,
              },
            };
          });
        },
      },

      theme: localStorage.getItem("theme") || "dark",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "dark" ? "light" : "dark";
          localStorage.setItem("theme", newTheme);
          return {
            theme: newTheme,
          };
        });
      },
    };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async onLogin({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  async componentDidMount() {
    const { data } = await getUserLogged();
    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
  }

  onLogout() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    putAccessToken("");
  }

  render() {
    if (this.state.initializing) {
      return null;
    }
    const ifLogin = this.state.authedUser === null;
    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <ThemeProvider value={this.state}>
            <div className="app-container">
              <Header ifLogin={ifLogin} />
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage success={this.onLogin} />}
                />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </div>
          </ThemeProvider>
        </LocaleProvider>
      );
    }
    return (
      <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider value={this.state}>
          <div className="app-container">
            <Header
              logout={this.onLogout}
              name={this.state.authedUser.name}
              ifLogin={ifLogin}
            />
            <Routes>
              <Route path="/" element={<ActivePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/archives" element={<ArchivePage />} />
              <Route path="/notes/new" element={<NewPage />} />
              <Route path="/notes/:id" element={<ViewsPage />} />
              <Route path="*" element={<NotfoundPage />} />
            </Routes>
          </div>
        </ThemeProvider>
      </LocaleProvider>
    );
  }
}
