import React from "react";
import Footer from "./Footer";
import styled from "styled-components";
import SideBar from "./SideBar";

const Content = styled.div`
  grid-area: content;

  min-height: 200vh;
  width: 100%;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
    "sidebar content content content"
    "sidebar content content content"
    "sidebar content content content";

  height: 100vh;

  @media (max-width: 700px) {
    grid-template-areas:
      "sidebar sidebar sidebar sidebar"
      "content content content content"
      "content content content content";
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 80px repeat(2, 1fr);

    justify-items: center;
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
