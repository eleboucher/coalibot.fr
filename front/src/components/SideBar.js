import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Logout from "./Logout";

const Wrapper = styled.aside`
  width: 220px;
  position: fixed;
  height: 100%;
  top: 0px;
  left: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: var(--lightPrimary);
  color: var(--lightText);
  @media (max-width: 768px) {
    left: 0px;
    right: 0px;
    height: 54px;
    bottom: auto;
    width: auto;
    align-items: center;
    flex-direction: row;
  }
`;

const Links = styled.div`
  align-self: center;
  display: flex;

  flex-direction: inherit;
  justify-content: space-between;

  align-items: center;
`;

const Title = styled.div`
  position: relative;
  /* margin-top: 2rem; */
  align-self: center;
  /* margin-bottom: 100px; */
`;

const SideBar = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Title>
          <span>CoaliZone</span>
        </Title>
        <Links>
          <span>Home</span>
          <span>LeaderBoard</span>
          <Logout />
        </Links>
      </Wrapper>
    </>
  );
};

export default SideBar;
