import { React, useState } from 'react';
import styled from 'styled-components';

import { FORM_ITEMS } from './constants'
import { serverUrl } from '../../../constants';
import { isEmpty } from '../../../lib/util/isEmpty';

import RegisterNotice from './RegisterNotice';

// STYLES

const StyledRegister = styled.div``;

// COMPONENT

const Register = () => {
  const [formData, setFormData] = useState(
    {
      name: "",
      email: "",
      password: ""
    }
  );
  const [empty, setEmpty] = useState(true);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setFormData(
      {
        ...formData, 
        [e.target.name]: e.target.value 
      }
    );
  };
  
  const handleKeyPress = (e) => {
    if (e.key == 'Enter') handleRegister();
  };
  
  // TODO(joe): Move to ctx/features/auth/authActions.js
  const handleRegister = async () => {
    setEmpty(isEmpty(formData));

    let res = null;  
    try {
      res = await fetch(`${serverUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors([...Object.values(data)]);
        console.log(`Server error. HTTP status code: ${res.status}`);
      } else {
        setErrors([]);
      }
    } catch (error) {
      console.error('Fetch unsuccessful.', error);
    }
  
    // this.props.registerUser(formData, this.props.history);
  };

  return (
    <>

      <h1>Join Skedge</h1>

      <RegisterNotice 
        errors={errors}
        empty={empty}
      >
      </RegisterNotice>

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