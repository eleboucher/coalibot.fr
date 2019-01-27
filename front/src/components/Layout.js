import React from "react";
import Footer from "./Footer";
import styled from "styled-components";
import SideBar from "./SideBar";

const Content = styled.div`
  flex: 1 1 0%;
  margin-left: 220px;
  @media (max-width: 768px) {
    margin-left: 0;
    align-self: center;
    margin-top: 54px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <SideBar />
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Layout;
