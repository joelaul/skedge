import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// ASSETS
import sprites from "../../img/sprite.svg";

// UTILS
import { white, primary } from "../../utils";

const Sidebar = () => {
  return (
    <SidebarStyled>
      <ul className="side-nav">
        <li className="side-nav__item">
          <Link to="/" className="side-nav__link">
            <svg className="side-nav__icon">
              <use xlinkHref={`${sprites}#icon-home`} />
            </svg>
            <span>Home</span>
          </Link>
        </li>
        <li className="side-nav__item">
          <Link to="/" className="side-nav__link">
            <svg className="side-nav__icon">
              <use xlinkHref={`${sprites}#icon-price-tag`} />
            </svg>
            <span>Tags</span>
          </Link>
        </li>
        <li className="side-nav__item">
          <Link to="/" className="side-nav__link">
            <svg className="side-nav__icon">
              <use xlinkHref={`${sprites}#icon-slideshare`} />
            </svg>
            <span>Users</span>
          </Link>
        </li>
      </ul>

      <div className="legal">&copy; 2019 by Fullstack Musician.</div>
    </SidebarStyled>
  );
};

const SidebarStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .side-nav {
    font-size: 1.4rem;
    list-style: none;
    margin-top: 3.5rem;

    &__item {
    }

    &__link:link,
    &__link:visited {
      color: ${white};
      text-decoration: none;
      text-transform: uppercase;
      display: block;
      padding: 1.5rem 3rem;

      display: flex;
      align-items: center;
    }

    &__link:hover {
      color: ${primary};
    }

    &__icon {
      width: 1.75rem;
      height: 1.75rem;
      margin-right: 2rem;
      fill: currentColor;
    }
  }

  .legal {
    font-size: 1.2rem;
    text-align: center;
    padding: 2.5rem;
    color: ${white};
  }
`;

export default Sidebar;
