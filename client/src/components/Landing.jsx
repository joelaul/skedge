import { React, useState } from 'react';
import logo from '/pfp/cameron.jpg'
import styled from 'styled-components';

const Hero = styled.div`
  // background-image: url("../../public/hero.png");
  background-size: 700%;

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    max-width: 500px;
  }
`;

const Home = () => { 
  const [formData, setFormData] = useState(
    {
      goals: "",
      timeConstraints: "",
      workStyle: "",
      personality: ""
    }
  );

  const handleChange = (e) => {
    setFormData(
      {
        ...formData, 
        [e.target.name]: e.target.value 
      }
    );
  };
  
  const handleGenerate = async () => {
    console.log(formData);

    const res = await fetch("http://localhost:8000", 
    { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
        body: JSON.stringify(formData)
    });

  };

  return (
    <>
      <Hero>
        <h1>
          <span >Skedge</span> - a social productivity app.
          </h1>

        <div className="logo">
          <a href="http://localhost:5173">
            <img src={logo} className="logo"/>
          </a>
        </div>
      </Hero>

      <form noValidate>

        <div className="form top">
          <div>
            <label htmlFor="goals">Goals: </label>
            <input 
              name="goals"
              placeholder="I want to pop off"
              value={formData.goals}
              onChange={handleChange}
            >
            </input>
          </div>
          
          <div>
            <label>Time constraints: </label>
            <input 
              name="timeConstraints"
              placeholder="I have a part-time job"
              value={formData.timeConstraints}
              onChange={handleChange}
            ></input>
          </div>

          <div>
            <label>Work style: </label>
            <input 
              name="workStyle"
              placeholder="I'm detail-oriented"            
              value={formData.workStyle}
              onChange={handleChange}
            ></input>
          </div>

          <div>
            <label>Personality: </label>
            <input 
              name="personality"
              placeholder="I'm sexually free"            
              value={formData.personality}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="form bottom">
          <label>Email: </label>
          <input type="email"></input>

          <label> Password: </label>
          <input type="password"></input>
        </div>

      </form>

      <div className="cta">

          <button onClick={handleGenerate}>
            Get Started
          </button>

          <p> 
            Click above to generate your schedule and find a Skedge partner!
          </p>

      </div>

     {/*  <p className="help">
          Stuck on filling out the form? Click on the Skedge logo for help
      </p> */}
    </>
  )
}

export default Home