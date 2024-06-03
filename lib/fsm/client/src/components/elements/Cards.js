import styled from "styled-components";
import {
  black,
  lighterblack,
  primary,
  primary_light,
  white,
} from "../../utils";

export const Card = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${lighterblack};

  .card {
    &__heading,
    &__heading > *:link,
    &__heading > *:visited {
      margin-right: auto;
      font-size: 2.25rem;
      font-weight: 300;
      /* text-transform: uppercase; */
      /* letter-spacing: 1px; */
      padding: 1.5rem;
      text-decoration: none;
      color: ${black};
    }

    &__user {
      font-size: 1.2rem;
      display: flex;

      &-button {
        border: none;
        color: ${primary};
        font-size: inherit;
        cursor: pointer;
        border-bottom: 1px solid currentColor;
        display: inline-block;
        background-color: transparent;
        transition: all 0.2s;

        &:hover {
          color: ${primary_light};
        }
      }
    }

    &__rating {
      background-color: ${primary};
      margin-left: 3rem;
      color: ${white};
      align-self: stretch;
      padding: 0 2.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      &-answers {
        font-size: 2.25rem;
        font-weight: 300;
      }

      &-likes {
        font-size: 0.8rem;
        text-transform: uppercase;
      }
    }
  }
`;
