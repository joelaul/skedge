import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { Provider, useDispatch } from "react-redux";
import { store } from './ctx/store';

import { setCurrentUser } from './ctx/features/auth/authSlice'

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
import Board from "./components/matches/Board"
import Chat from "./components/matches/Chat"

// Profiles
import Profile from "./components/profiles/Profile";
import ProfileEdit from "./components/profiles/ProfileEdit";
import Explore from "./components/profiles/Explore";

// Org
import Blog from "./components/org/Blog"
import Terms from "./components/org/Terms"
import Privacy from "./components/org/Privacy"

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
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/edit" element={<ProfileEdit />}></Route>
          <Route path="/explore" element={<Explore />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/board" element={<Board />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
          <Route path="/privacy" element={<Privacy />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </ Provider>
  </React.StrictMode>
)

// TODO(joe): REPLICATE SANS-REDUX CONDITIONAL NOTICE RENDERING / ERROR HANDLING
// TODO(joe): WRONG PASSWORD STILL CAUSES REDIRECT TO /dashboard

/* NOTES

  CORE FUNCTIONALITY:

    Visitor -> Landing
    User -> Dashboard
    
    Action - generateSchedule()
      fetch() POST form data to API -> AI services -> generate schedule text -> format + assign weights for recommendation

    Action - findMatches()
      fetch() POST user schedule data (weight, etc) -> query database -> run recommendation function -> return X most similar available users -> friend request -> if approved, open communication channel between users

  DATABASE MODELS:

    User - username, email, password
    Schedule - [however we define the schedule]
    Chat - Users (User[]), Content (String[])
    Profile - ref->User, ref-Schedule, Partners (User[]), Chats (Chat[])

  THOUGHTS:

    UI should conform to the shape of your data structures

    frontends and backends both exist on servers, but frontend servers talk once and retire, while backend servers need to keep talking (processing) indefinitely

    monorepos: can both frontend and backend exist in one codebase? if so, what are the typical arguments against?
*/