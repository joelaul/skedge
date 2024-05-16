import styled from "styled-components";
import { above, black } from "../../utils";

export const Heading = styled.h1`
  font-size: 2rem;
  color: ${black};
  ${above.large`
        color:${black};
    `}
`;
