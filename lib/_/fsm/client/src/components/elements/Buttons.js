import styled from "styled-components";
import { darken } from "polished";
import { secondary, primary, elevation } from "../../utils";

export const Button = styled.button`
  padding: 5px 20px;
  border-radius: 4px;
  color: white;
  font-size: inherit;
  border: none;
  background: ${primary};
  cursor: pointer;
  ${elevation[1]};
  transition: 0.3s ease all;

  &:hover {
    ${elevation[2]};
    background: ${darken(0.2, secondary)};
  }

  &:focus {
    outline: 0;
  }
`;

const SignUpButton = styled(Button)`
  background: ${primary};

  &:hover {
    background: ${darken(0.2, primary)};
  }
`;

const DeleteButton = styled(Button)`
  background: tomato;
`;

Button.SignUp = SignUpButton;
Button.Delete = DeleteButton;
