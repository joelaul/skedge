import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledError = styled.div`
    margin: 10px auto;
    padding: 3px;
    width: 300px;

    background: firebrick;
    font-size: 0.8em;
    border-radius: 3px;
`

const StyledSuccess = styled.div`
    margin: 10px auto;
    padding: 3px;
    width: 300px;

    background: darkgreen;
    font-size: 0.8em;
    border-radius: 3px;
`

const LoginNotice = () => {
    const { status, errors, loading } = useSelector((state) => state.auth);
    const errorsValues = Object.values(errors);
  return (
    <>
    {status == 'failed'
    ?
        errorsValues.map((value, index) => (
            <StyledError key={index}>
                {value}
            </StyledError>
        ))
    :
    loading 
    ?
        <StyledSuccess>
            Logging in...
        </StyledSuccess>
    :
        undefined
    }
    </>
  )
}

export default LoginNotice