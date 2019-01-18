import React from "react";
import Button from "./Button";
import axios from "../config/axios";

const request = () => {
  axios.get("/logout").catch(console.log);
};
const Logout = () => <Button onClick={request}>Logout</Button>;

export default Logout;
