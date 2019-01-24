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
  height: 100%;

  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: var(--lightPrimary);
  color: var(--lightText);

  @media (max-width: 700px) {
    width: 100%;
    height: 80px;
    flex-direction: row;
    left: unset;
  }
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
