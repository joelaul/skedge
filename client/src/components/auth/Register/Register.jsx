import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { FORM_ITEMS } from './constants'
import { registerUser } from "../../../ctx/features/auth/authActions";
import RegisterNotice from './RegisterNotice';

// STYLES

const StyledRegister = styled.div`
`;

// COMPONENT

const Register = () => {  
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {
      name: "",
      email: "",
      password: ""
    }
  );
  
  useEffect(() => {
    if (status == 'succeeded') setTimeout(() => navigate('/login'), 500);
  });

  const handleChange = (e) => {
    setFormData(
      {
        ...formData, 
        [e.target.name]: e.target.value 
      }
    );
  };
  const handleKeyPress = (e) =>    {
    if (e.key == 'Enter') handleRegister();
  };
  
  const handleRegister = async () => {
    dispatch(registerUser(formData));
  };

  return (
    <>
      <h1>Join Skedge</h1>

      <RegisterNotice />

      <form noValidate>
      
        <div className="form">
          {FORM_ITEMS.map(({ title, camel, placeholder }) => (
            <div 
              key={camel}
            >
                <label>{`${title}: ` }</label>
                <input
                  name={camel}
                  type={camel == 'password' ? 'password' : undefined}
                  placeholder={placeholder}
                  value={formData[`${camel}`]}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                >
                </input>
            </div>
          ))}
        </div>

      </form>

      <div className="cta">
          <button onClick={handleRegister}>
            🚀 Get Started
          </button>

          <p> 
            Click above to sign up!
          </p>
      </div>
    </>
  )
}

export default Register