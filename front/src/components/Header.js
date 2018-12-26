import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Button from "./Button";
const Wrapper = styled(Grid)`
  background-color: var(--primary);
  color: var(--lightText);
  width: 100%;
  padding-top: 72px;
  padding-bottom: 100px;
  margin-bottom: 70px;
  position: relative;

  justify-items: start;
`;

const Header = ({ children }) => {
  return (
    <>
      <Wrapper>
        <span>CoaliZone</span>
      </Wrapper>
    </>
  );
};

export default Header;
