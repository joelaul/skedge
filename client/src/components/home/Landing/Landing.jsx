import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styled from "styled-components";

import { FORM_TOP_ITEMS } from "./constants";
import { clientUrl, serverUrl } from "../../../constants";

import cameron from "../../../assets/img/cameron.png";

// STYLES

const StyledHero = styled.div`
  // background-image: url("../../public/hero.png");

  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    max-width: 500px;

    span {
      color: #ddd;
    }
  }
`;

const Landing = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    goals: "",
    timeConstraints: "",
    workStyle: "",
    personality: "",
  });

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async () => {
    console.log(formData);

    const res = await fetch(serverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <>
      <StyledHero>
        <h1>
          <span>Skedge</span> - a social productivity app.
        </h1>

        <div className="cameron">
          <a href={clientUrl}>
            <img src={cameron} className="cameron" />
          </a>
        </div>
      </StyledHero>

      <form noValidate>
        <div className="form top">
          {FORM_TOP_ITEMS.map(({ title, camel, placeholder }) => (
            <div key={camel}>
              <label>{`${title}: `}</label>
              <input
                name={camel}
                placeholder={placeholder}
                value={formData[`${camel}`]}
                onChange={handleChange}
              ></input>
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
        <button onClick={handleGenerate}>🚀 Get Started</button>

        <p>Click above to generate your schedule and find a Skedge partner!</p>
      </div>
    </>
  );
};

export default Landing;
