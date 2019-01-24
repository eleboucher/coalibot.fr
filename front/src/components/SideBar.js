import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Logout from "./Logout";

const Wrapper = styled.div`
  grid-area: sidebar;

  position: fixed;
  width: 200px;
  top: 0;
  left: 0;
  height: 100vh;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* box-shadow: 4px 4px black; */
  background-color: var(--lightPrimary);
  color: var(--lightText);
`;

const Links = styled.div`
  justify-self: end;
`;

const Title = styled.span``;

const SideBar = ({ children }) => {
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

export default SideBar;
