import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Button from "./Button";

const Wrapper = styled(Grid)`
  grid-area: footer;
  background-color: var(--primary);
  color: var(--lightText);
  grid-auto-flow: dense;
`;

const Footer = ({ children }) => {
  return (
    <>
      <Wrapper>
        <span>Footer</span>
      </Wrapper>
    </>
  );
};

export default Footer;
