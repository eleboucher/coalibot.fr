import styled, { css } from "styled-components";

const Button = styled.button`
  padding: 0.25em 1em;
  background: transparent;

  display: inline-flex;
  align-items: center;
  font-weight: 600;

  cursor: pointer;
  border: 2px solid var(--primary);
  color: var(--primary);
  text-decoration: none;

  ${props =>
    props.primary &&
    css`
      border: none;
      background: var(--primary);
      color: var(--lightText);
    `}
`;

export default Button;
