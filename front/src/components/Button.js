import styled, { css } from "styled-components";

const Button = styled.button`
  padding: 0.25em 1em;
  background: white;

  display: inline-flex;
  align-items: center;
  font-weight: 600;

  cursor: pointer;
  border: 2px solid var(--primary);
  color: var(--primary);
  text-decoration: none;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  ${props =>
    props.primary &&
    css`
      border: none;
      background: var(--primary);
      color: var(--lightText);
    `}
`;

export default Button;
