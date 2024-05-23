import React from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux';

import { NAV_ITEMS } from './constants';
import { classNames } from '../../../lib/css/classNames';

import logo from '../../../assets/img/logo.png';

// STYLES

const StyledNav = styled.div`
  display: flex;
  justify-content: space-between;
  height: 45px;
  margin: 0 0 30px 0;
  padding: 10px;

  background: #00cc88;

  a {
    color: #ddd;
    cursor: pointer;
    transition: color 200ms;

    &:hover {
      color: white;
    }
  }

  img {
      cursor: pointer;
  }
  
  .nav-logo {
    display: absolute;
    height: 40px;
    top: 100px;
    left: 50px;
    // border-radius: 50%;

      a {
        &:active {
          border: 10px solid #000;
        }
      }
  }

  .nav-items {
    display: flex;
    align-items: center;

    .nav-item {
      padding: 0 10px 0 5px;
    }
  
  }
  .current > a {
    padding: 5px;
    color: white;
    background: #00a36d;
    border-radius: 5px; 
  }
`

const Nav = () => {
  const {currentUser, error, status } = useSelector((state) => state.auth);

  const pathname = location.pathname;
  const isCurrent = (href) => pathname == href;

  const inState = (
    <div className="nav-items">
      {currentUser.toString()}
    </div>
  );

  const outState = (
    <div className="nav-items">
      {NAV_ITEMS.map(({ title, href }) => (
        <div 
          key={title}
          className={classNames('nav-item',
              isCurrent(href) && 'current'
          )}
        >
            <a href={href}>{title}</a>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <StyledNav>
        <div>
          <a href="/">
            <img className="nav-logo" src={logo}/>
          </a>
        </div>
        {'user is logged in' ? outState : inState}
      </StyledNav>
    </>
  )
}

export default Nav