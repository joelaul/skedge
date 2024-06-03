// IMPORT

import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwtDecode from "jwt-decode";
import styled from "styled-components";

// Utils / Actions
import { setAuthToken } from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

// Redux Store
import store from "./store";

// CSS / Global Styles
import GlobalStyle from "./Global";
import { black, white, primary } from "./utils";

// Components
// Layout
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/layout/Footer";

// Authentication
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// Questions
import Ask from "./components/questions/Ask";
import Question from "./components/questions/Question";

// Profiles
import Profile from "./components/profiles/Profile";
import ProfileEdit from "./components/profiles/ProfileEdit";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}

// STYLES

const AppWrapper = styled.div`
  max-width: 125rem;
  margin: 4rem auto;
  background-color: ${white};
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const SidebarWrapper = styled.nav`
  background-color: ${black};
  flex: 0 0 15%;
  color: ${white};
`;

const MainbarWrapper = styled.div`
  background-color: ${white};
  flex: 1;
`;

// COMPONENT

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppWrapper>
            <Navbar />
            <ContentWrapper>
              <SidebarWrapper>
                <Sidebar />
              </SidebarWrapper>
              <MainbarWrapper>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/ask" component={Ask} />
                <Route exact path="/questions/:id" component={Question} />
                <Route exact path="/users/:id/:name" component={Profile} />
                <Route
                  exact
                  path="/users/:id/:name/edit"
                  component={ProfileEdit}
                />
              </MainbarWrapper>
            </ContentWrapper>
            <Footer />
            <GlobalStyle />
          </AppWrapper>
        </Router>
      </Provider>
    );
  }
}

// EXPORT TO INDEX.JS -> INDEX.HTML

export default App;
