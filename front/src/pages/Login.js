import React from "react";
import styled from "styled-components";
import Button from "../components/Button";

const LoginButton = styled(Button)`
  position: absolute;
  top: 50%;
`;

const CenteredDiv = styled.div`
  text-align: center;
`;

const Login = () => (
  <CenteredDiv>
    <LoginButton as="a" href="http://localhost:3000/api/login" primary>
      Login
    </LoginButton>
  </CenteredDiv>
);

export default Login;
