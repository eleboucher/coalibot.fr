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
  box-shadow: 0 2px 6px rgba(170, 185, 200, 0.4);
  ${props =>
    props.primary &&
    css`
      border: none;
      background: var(--primary);
      color: var(--lightText);
    `}
`;

export default Button;
