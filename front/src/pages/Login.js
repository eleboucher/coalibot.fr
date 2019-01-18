import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

const CenteredDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => (
  <CenteredDiv>
    <Button as="a" href="http://localhost:3000/api/login" primary>
      Login
    </Button>
  </CenteredDiv>
);

export default Login;
