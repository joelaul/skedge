import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Provider from "react-redux";
// import store from "./store";

// STYLES

import "./globals.css";

// COMPONENTS

// Layout
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer";

// Routes
import Landing from "./components/Landing/Landing";
import Explore from "./components/Explore";
import Blog from "./components/Blog"
import Login from "./components/Login";
import Register from "./components/Register";

// Main
const App = () => {

  /* 

    CORE FUNCTIONALITY:

      Non-user -> Landing
      User -> Dashboard

      Set form data state
      
      Action - generateSchedule()
        fetch() POST form data to API -> AI services -> generate schedule text -> format + assign weights for recommendation

      Action - findPartners()
        fetch() POST user schedule data (weight, etc) -> query database -> run recommendation function -> return X most similar available users -> friend request -> if approved, open communication channel between users

    DATABASE MODELS:

      User - username, email, password
      Schedule - [however we define the schedule]
      Chat - Users (User[]), Content (String[])
      Profile - ref->User, ref-Schedule, Partners (User[]), Chats (Chat[])

  */
   
  return (
    <>
    {/* <Provider> */}
        <Nav />
        <Router>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/explore" element={<Explore />}></Route>
            <Route path="/blog" element={<Blog />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes>
        </Router>
        <Footer />
      {/* </Provider> */}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)