import React from 'react'
import ReactDOM from 'react-dom/client'

// GLOBAL STYLES

import "./globals.css";

// COMPONENTS

import Home from "./components/Home";

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
      <Home />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
