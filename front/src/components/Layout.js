import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";

const Content = styled.div`
  padding: 0 20px;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

export default Layout;
