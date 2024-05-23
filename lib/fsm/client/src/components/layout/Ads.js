import React from "react";
import styled from "styled-components";

// UTILS
import { elevation, white } from "../../utils";

const Ads = () => {
  return (
    <AdsStyled>
      <div className="Ad">I'm an ad</div>
      <div className="Ad">I'm an ad</div>
      <div className="Ad">I'm an ad</div>
      <div className="Ad">I'm an ad</div>
      <div className="Ad">I'm an ad</div>
    </AdsStyled>
  );
};

const AdsStyled = styled.div`
  /* background-color: yellowgreen; */
  flex: 1;
  display: flex;
  flex-direction: column;

  .Ad {
    background-color: ${white};
    ${elevation[1]};
    padding: 3rem;
    margin-bottom: 3.5rem;
  }
`;

export default Ads;
