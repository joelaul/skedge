import React from "react"; 
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./ctx/store";

import { jwtDecode } from "jwt-decode";
import { setCurrentUser } from "./ctx/features/auth/authSlice";

// STYLES

import "./globals.css";

// COMPONENTS

// Layout
import Nav from "./components/layout/Nav/Nav";
import Footer from "./components/layout/Footer";

// Home
import Dashboard from "./components/home/Dashboard/Dashboard";
import Landing from "./components/home/Landing/Landing";

// Auth
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";

// Matches
import Board from "./components/matches/Board";
import Chat from "./components/matches/Chat";

// Profiles
import Profile from "./components/profiles/Profile";
import ProfileEdit from "./components/profiles/ProfileEdit";
import Explore from "./components/profiles/Explore";

// Org
import Blog from "./components/org/Blog";
import Terms from "./components/org/Terms";
import Privacy from "./components/org/Privacy";

const App = () => {
  const dispatch = useDispatch();

  if (localStorage.jwt) {
    const decoded = jwtDecode(localStorage.jwt);
    dispatch(setCurrentUser(decoded));
  }

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/profile" element={<ProfileEdit />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/users/:username" element={<Profile />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/board" element={<Board />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
          <Route path="/privacy" element={<Privacy />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

/* TODO BY FEATURE:

  // ======================================
                      AUTH
  // ======================================

  // LN/RN timeouts not working; misunderstanding of redux thunk states?
  // LN/RN should last from state.auth.status == "pending" -> "succeeded"; on succeeded, set status to idle?
  // reduce LN/RN to one component <Notice /> which takes action type as parameter
  // apply Login UI to Register
  // add Redux authSlice property state.auth.isLoggedIn
  // fix all navigate() redirects (Register -> Login; Login -> Dashboard; Landing -> Dashboard)
  // LOGIN: add "Forgot Password"
  // REGISTER: apply Login UI

  // ======================================
                     HOME
  // ======================================

  // LANDING: kill Cameron; build SaaS-inspired hero / landing page
  // DASHBOARD: inspo from Notion / Figma (last opened Board, Matches, Posts, Profile)

  // ======================================
                    LAYOUT
  // ======================================

  // NAV (user): notifs/inbox, Profile(id).picture -> dropdown: ProfileEdit, Settings, Terms, logout

  // ======================================
                   PROFILES
  // ======================================

  // PROFILE (other): /users/:username 
  // PROFILEEDIT (user): /profile; link to <Explore />; FIELDS: name, picture, bio, workstyle, personality, goals, posts (likes)
  // should profile edit be embedded in the profile component, and rendered only on user match?

  // ======================================
                    MATCHES
  // ======================================

  // EXPLORE: state.compatibleUsers.map(<Card />) -> <Profile user={user} />
  // CHAT: use ask-biden UI
  // BOARD: use notion UI, integrate Chat

*/

/* UX:

  // ======================================
                    FLOW
  // ======================================

  // https://pageflows.com/

  // Register
  // [notice]
  // link to Login
  // [notice]
  // isNewUser ? init ONBOARDING (Profile setup + initial Matches calc -> Explore) : redirect to Dashboard

  // ======================================
     MATCHES: CHOICE, EXCLUSIVITY, LIFESPAN
  // ======================================

    // with hinge, you earn a chat, which should help you fulfill the goal of leaving the app. games, video calls, etc. would contradict hinge's stated goal - to get off the app.

    // with skedge, the goal is to stay ON the app with a partner, and use it as a motivational tool, together.

    // do users interact with a pool of potential partners (dating app), or are they automatically paired? 
    // should core functionality be earned or provided?
    // possible middle ground: tutorial Board to give taste of core functionality, or offer a solo version

    // can users have multiple partners? 

    // do partnered users collaborate on a shared task, or motivate each other to complete their respective tasks?
    // daily tasks or higher-level goals / aspirations?
    // what happens when all tasks are completed?

*/

/* SCHEMA:

  // User - username, email, password
  // Profile - ref->User, ref-Schedule, Partners (User[]), Chats (Chat[])
  // Schedule - [however we define the schedule]
  // Match
  // Chat - Users (User[]), Content (String[])
  // Board

*/

/* CORE FUNCTIONS / ALGORITHMS:
  
  // generateSchedule()
      fetch() POST form data to API -> AI services -> generate schedule text -> format + assign weights for recommendation

  // findMatches()
      fetch() POST user schedule data -> query database -> run recommendation function (calculate compatibility score)-> return X most similar available users -> 
    
  // startChat()
      Friend request -> if approved, open communication channel (websocket) between users
*/

/* THOUGHTS:

  // ASYNC THUNK STATES (3) TRIGGER COMPONENT RE-RENDERS?
  // UI should conform to shape of data structures
  // Frontends and backends both exist on servers, but frontend servers talk once and retire, while backend servers need to talk (process requests) indefinitely
  // Monorepos: can both frontend and backend exist in one codebase? if so, what are the typical arguments against?

*/
