import { React, useState } from 'react';
import styled from 'styled-components';

// import { connect } from 'react-redux';
// import { registerUser } from "../../actions/authActions";

import { FORM_ITEMS } from './constants'
import { serverUrl } from '../../utils';

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
  }
  
  const handleRegister = async () => {
    let res = null; // Initialize to a default value
  
    try {
      res = await fetch(`${serverUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      if (!res.ok) {
        console.log(`HTTP response code: ${res.status}`);
        // Handle non-OK response here if needed
      } else {
        // Extract and log specific data from the response if needed
        const responseData = await res.json();
        console.log(responseData);
      }
    } catch (error) {
      console.error('Error in fetch', error);
      // Handle fetch error
    }
  
    // Ensure that the following line is uncommented and properly integrated
    // this.props.registerUser(formData, this.props.history);
  };

  return (
    <>
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

// REDUX

/* 
const mapStateToProps = state => ({
  authReducer: state.authReducer,
  errorReducer: state.errorReducer
});

export default connect(
  () => {},
  { registerUser }
)(Register); 
*/