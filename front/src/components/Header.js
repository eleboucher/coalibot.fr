import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Logout from "./Logout";

const Wrapper = styled(Grid)`
  height: 80px;
  align-content: center;
  background-color: var(--primary);
  color: var(--lightText);
`;

const Links = styled.div`
  grid-column: -1 / span 4;

  justify-self: end;
`;
const Title = styled.span`
  grid-column: span 4 / 1;
`;
const Header = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Title>CoaliZone</Title>
        <Links>
          <Logout />
        </Links>
      </Wrapper>
    </>
  );
};

export default Header;
