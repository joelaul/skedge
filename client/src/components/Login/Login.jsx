import { React, useState } from 'react';
import styled from 'styled-components';

import { FORM_ITEMS } from './constants'
import { serverUrl } from '../../utils';

import LoginNotice from './LoginNotice';

// STYLES

const StyledLoginWrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  
  display: flex;
  flex-direction: column;
  align-contents: center;

  a {
    margin: 20px;
    color: #00CC88;
  }
`

const StyledLoginCard = styled.div`
  border: 1px solid #DDDDDD80;
  border-radius: 7px;
  text-align:;

  p {
    font-size: 0.9em;
    margin-top: 40px;
  }
`;

// COMPONENT

const Login = () => {
  const [formData, setFormData] = useState(
    {
      name: "",
      email: "",
      password: ""
    }
  );
  const [empty, setEmpty] = useState(true);
  const [errors, setErrors] = useState([]);

  const isEmpty = (obj) => {
    return Object.values(obj).every(value => value === "");
  }

  const handleChange = (e) => {
    setFormData(
      {
        ...formData, 
        [e.target.name]: e.target.value 
      }
    );
  };
  
  const handleKeyPress = (e) => {
    if (e.key == 'Enter') handleLogin();
  };
  
  // Move to ../../actions/authActions.js
  const handleLogin = async () => {
    setEmpty(isEmpty(formData));

    let res = null;  
    try {
      res = await fetch(`${serverUrl}/users/login`, {
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
  
    // this.props.LoginUser(formData, this.props.history);
  };

  return (
    <>

    <StyledLoginWrapper>

      <StyledLoginCard>

        <h1>Log in to your account</h1>

        <LoginNotice 
          errors={errors}
          empty={empty}
        >
        </LoginNotice>

        <form noValidate>
        
          <div className="form">
            {FORM_ITEMS.map(({ title, camel, placeholder }) => (
              <div 
                key={camel}
              >
                  {/* <label>{`${title}: ` }</label> */}
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
            <button onClick={handleLogin}>
              Log in
            </button>

            <p> 
              By clicking "Log in" I am consenting to the Terms of Service and Privacy Policy
            </p>
        </div>
      </StyledLoginCard>

      <a 
        className="link-createnew" 
        href="/register"
      >
        Create a new account »
      </a>

    </StyledLoginWrapper>
    
    </>
  )
}

export default Login

/* REDUX

// import { connect } from 'react-redux';
// import { loginUser } from "../../actions/authActions";

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  errorReducer: state.errorReducer
});

export default connect(
  () => {},
  { LoginUser }
)(Login); 
*/