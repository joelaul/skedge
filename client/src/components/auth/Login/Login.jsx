import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { FORM_ITEMS } from './constants';
import { loginUser } from "../../../ctx/features/auth/authActions";
import LoginNotice from './LoginNotice';

// STYLES

const StyledLoginWrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  
  display: flex;
  flex-direction: column;
  align-contents: center;

  a {
    color: #00CC88;

    &:hover {
      transform: scale(103%);
    }

    &.link-register {
      margin: 20px;
    }
  }
`
const StyledLoginCard = styled.div`
  border: 1px solid #DDDDDD80;
  border-radius: 7px;

  p {
    font-size: 0.85em;
    margin-top: 30px;
  }
`;

// COMPONENT

const Login = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status == 'succeeded') navigate('/dashboard');
  }, [status]);

  const [formData, setFormData] = useState(
    {
      name: "",
      email: "",
      password: ""
    }
  );

  const [errors, setErrors] = useState([]);
  const [empty, setEmpty] = useState(true);

  const handleChange = (e) => {
    setFormData(
      {
        ...formData, 
        [e.target.name]: e.target.value 
      }
    );
  };
  const handleEnterKey = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  const handleLogin = async () => {
    // setEmpty(isEmpty(formData));
    dispatch(loginUser(formData));
    navigate('/dashboard');
  };
  
  return (
    <StyledLoginWrapper>
      <StyledLoginCard>

        <h1>Log in to your account</h1>

        {(status == 'failed' || status == 'succeeded') &&
          <LoginNotice 
            errors={errors}
            empty={empty}
          >
          </LoginNotice>
        }

        <form noValidate>
        
          <div className="form">
            {FORM_ITEMS.map(({ title, camel, placeholder }) => (
              <div 
                key={camel}
              >
                  <input
                    name={camel}
                    type={camel == 'password' ? 'password' : undefined}
                    placeholder={placeholder}
                    value={formData[`${camel}`]}
                    onChange={handleChange}
                    onKeyPress={handleEnterKey}
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
              By clicking "Log in" I am consenting to Skedge's <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
            </p>
        </div>
      </StyledLoginCard>

      <a 
        className="link-register" 
        href="/register"
      >
        Create a new account »
      </a>
    </StyledLoginWrapper>
  )
}

export default Login