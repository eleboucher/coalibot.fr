import React from "react";
import styled from "styled-components";
import { Link as RawLink } from "react-router-dom";

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
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: var(--lightPrimary);
  color: var(--lightText);
  padding: 12px 19px 2px;

  @media (max-width: 768px) {
    left: 0px;
    right: 0px;
    height: 54px;
    bottom: auto;
    width: auto;
    align-items: center;
    flex-direction: row;
    padding: 0px;
    flex-wrap: wrap;
  }
`;

const Title = styled.span`
  text-align: center;
  font-size: 24px;
  font-weight: 800px;
  align-self: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Bottom = styled.div`
  align-self: center;
  margin-bottom: 2rem;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Link = styled(RawLink)`
  text-decoration: none;
  color: var(--lightText);
`;

const NavLink = styled.div`
  margin: 8px 0;

  @media (max-width: 768px) {
    margin: 0 0 0 0.5rem !important;
  }
`;

const Head = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: inherit;
  flex: 1 1 0%;

  @media (max-width: 768px) {
    margin: 0;
    & > ${Link} {
      align-self: center;
    }
  }
`;

const SideBar = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Head>
          <Title as={Link} to="/">
            CoaliZone
          </Title>
          <NavLink as={Link} to="/">
            Home
          </NavLink>
          <NavLink as={Link} to="/dashboard">
            LeaderBoard
          </NavLink>
        </Head>
        <Bottom>
          <Logout />
        </Bottom>
      </Wrapper>
    </>
  );
};

export default SideBar;
