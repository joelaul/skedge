import React from 'react'
import styled from 'styled-components'

// STYLES

const StyledNav = styled.div`

    display: flex;
    justify-content: space-between;
    margin: 0 0 30px 0;
    padding: 10px;

    background: #00CC88;

    a {
        color: black;
        cursor: pointer;
        transition: color 200ms;

        &:hover {
            color: white;
        }
    }

    img {

    }

    .nav-items {
        display: flex;
        padding: 0 5px 0 5px;   

        .item {
        
        }
    }
`

export default function Nav() {
  return (
    <>
        <StyledNav>

            <div className="nav-logo">
                <img alt="Skedge">
                </img>
            </div>

            <div className="nav-items">
                <div className="nav-items item">
                    <a>About</a>
                </div>
                <div className="nav-items item">
                    <a>Blog</a>
                </div>
                <div className="nav-items item">
                    <a>Login</a>
                </div>
                <div className="nav-items item">
                    <a>Register</a>
                </div>
            </div>

        </StyledNav>
    </>
  )
}