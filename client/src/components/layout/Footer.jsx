import React from "react";
import styled from "styled-components";

// STYLES

const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  font-size: 0.7em;
  color: #ddd;
  background: #00cc88;

  a {
    color: #ddd;
    cursor: pointer;
    transition: color 200ms;

    &:hover {
      color: white;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      Copyright &copy; {new Date().getFullYear()}{" "}
      <a href="https://joelaul.dev" target="_blank">
        Joe Lauletta
      </a>
    </StyledFooter>
  );
};

export default Footer;
