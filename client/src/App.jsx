import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// GLOBAL STYLES

import "./globals.css";

// COMPONENTS

// Layout

import Nav from "./components/Nav"

// Routes

import Landing from "./components/Landing";

const App = () => {

  /* 

    CORE FUNCTIONALITY:

      Non-user -> Get Started route
      User -> Dashboard route

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
      <BrowserRouter>
        <Nav />
        <Landing />
      </BrowserRouter>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
