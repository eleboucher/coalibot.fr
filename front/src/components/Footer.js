import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Button from "./Button";

const Wrapper = styled(Grid)`
  background-color: var(--primary);
  color: var(--lightText);
  grid-auto-flow: dense;
  grid-row-gap: 50px;
  margin-top: 70px;
  padding: 100px 0 70px;
`;

const Header = ({ children }) => {
  return (
    <>
      <Wrapper>
        <span>Footer</span>
      </Wrapper>
    </>
  );
};

export default Header;
