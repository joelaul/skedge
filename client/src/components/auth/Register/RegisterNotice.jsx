import React from 'react';
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

const RegisterNotice = ({errors, empty}) => {
  return (
    <>
    {errors.length > 0
    ?
        errors.map((message, index) => (
            <StyledError key={index}>
                {message}
            </StyledError>
        ))
    :   
        !empty && 
        <StyledSuccess>
            Account created!
        </StyledSuccess>
    }
    </>
  )
}

export default RegisterNotice