import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { darken } from "polished";

// REDUX ACTIONS
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

// ASSETS
import fsmLogo from "../../img/fsm-green2.png";
import mag from "../../img/sprite.svg";

// UTILS
import { Button } from "../elements";
import { primary, black, lightblack, lighterblack, white } from "../../utils";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      search__input: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.authReducer;
    const { user } = this.props.authReducer;

    const outState = (
      <nav className="user-nav">
        <div className="user-nav__auth">
          <Link to="/login">Login</Link>
        </div>
        <div className="user-nav__auth-action">
          <Link to="/register">
            <Button.SignUp>Sign Up</Button.SignUp>
          </Link>
        </div>
      </nav>
    );

    const inState = (
      <nav className="user-nav">
        <div className="user-nav__auth">
          <Link to={`/users/${user.id}/${user.name}`}>{user.name}</Link>
        </div>
        <div className="user-nav__auth-action">
          <Link to="#" onClick={this.onLogoutClick}>
            Logout
          </Link>
        </div>
      </nav>
    );

    return (
      <NavbarStyled>
        <Link to="/">
          <img src={fsmLogo} className="logo" alt="Full Stack Musician" />
        </Link>
        <form action="#" className="search">
          <input
            className="search__input"
            type="text"
            name="search__input"
            placeholder="Search"
            value={this.state.name}
            onChange={this.onChange}
          />
          <button className="search__button">
            <svg className="search__icon">
              <use xlinkHref={`${mag}#icon-magnifying-glass`} />
            </svg>
          </button>
        </form>
        {isAuthenticated ? inState : outState}
      </NavbarStyled>
    );
  }
}

const NavbarStyled = styled.header`
  height: 9rem;
  background-color: ${lighterblack};
  border-bottom: 1px solid ${primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;

  .logo {
    height: 8.25rem;
    margin: 1rem 0 0 2.5rem;
  }

  .search {
    flex: 0 0 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: red; */

    &__input {
      font-family: inherit;
      font-size: inherit;
      background-color: ${white};
      /* border-color: ${primary}; */
      color: inherit;
      padding: 0.7rem 2rem;
      border-radius: 100px;
      width: 90%;
      transition: all 0.2s;
      margin-right: -3.25rem;

      &:focus {
        outline: none;
        width: 100%;
        /* background-color: ${darken(0.05, white)}; */
      }

      &::-webkit-input-placeholder {
        font-weight: 100;
        color: ${lightblack};
      }
    }

    /* &__input:focus + &__button {
            background-color: red;
        } */

    &__button {
      border: none;
      background-color: ${white};

      &:focus {
        outline: none;
      }

      &:active {
        transform: translateY(2px);
      }
    }

    &__icon {
      height: 2rem;
      width: 2rem;
      fill: ${black};
    }
  }

  .user-nav {
    display: flex;
    align-items: center;
    align-self: stretch;
    font-size: 1.4rem;

    & > * {
      padding: 0 2rem;
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
    }

    & > *:hover {
      background-color: ${darken(0.1, white)};
    }

    a,
    a:visited {
      text-decoration: none;
      color: ${black};
    }
  }
`;

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
