import { React, useState } from 'react';
import styled from 'styled-components';

import { FORM_TOP_ITEMS } from './constants';

import logo from '/pfp/cameron.jpg'

const Hero = styled.div`
  // background-image: url("../../public/hero.png");

  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    max-width: 500px;

    span {
      color: #DDD
    }
  }
`;

const Landing = () => { 
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
          <span>Skedge</span> - a social productivity app.
        </h1>

        <div className="logo">
          <a href="http://localhost:5173">
            <img src={logo} className="logo"/>
          </a>
        </div>
      </Hero>

      <form noValidate>

        <div className="form top">

          {FORM_TOP_ITEMS.map(({ title, camel, placeholder }) => (
            <div 
              key={camel}
            >
                <label>{`${title}: ` }</label>
                <input
                  name={camel}
                  placeholder={placeholder}
                  value={formData[`${camel}`]}
                  onChange={handleChange}
                >
                </input>
            </div>
          ))}
          
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
            🚀 Get Started
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

export default Landing