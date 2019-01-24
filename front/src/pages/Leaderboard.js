import React from "react";
import styled, { css } from "styled-components";

import getDate from "../utils/getDate";
import Layout from "../components/Layout";
import axios from "../config/axios";
import Spinner from "../components/Spinner";
import alliance from "../img/alliance.svg";
import assembly from "../img/assembly.svg";
import federation from "../img/federation.svg";
import order from "../img/order.svg";

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-areas: "rank photo login level coalition";
  margin-top: 20px;
  @media (max-width: 700px) {
    grid-template-areas: "rank login level" "nothing photo coalition";
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    justify-items: center;
  }
`;

const Rank = styled.span`
  grid-area: rank;
  align-self: center;
`;
const Photo = styled.img`
  grid-area: photo;
  height: 64px;
  width: 64px;
  border-radius: 50%;
  object-fit: cover;
`;
const Login = styled.span`
  grid-area: login;
  align-self: center;
`;

const Level = styled.span`
  grid-area: level;
  align-self: center;
`;

const Coalition = styled.img`
  grid-area: coalition;
  height: 64px;
  width: 64px;
  object-fit: contain;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const getCoalitonData = coal => {
  switch (coal) {
    case "assembly":
      return { svg: assembly, color: "#a060d2" };
    case "federation":
      return { svg: federation, color: "#4180db" };
    case "order":
      return { svg: order, color: "#ff694f" };
    case "alliance":
      return { svg: alliance, color: "#34c47f" };
    default:
      return { svg: "", color: "transparant" };
  }
};
class Leaderboard extends React.Component {
  state = {
    data: [],
    date: this.props.date || "2017-11",
    years: ["2018-11", "2018-04", "2017-11", "2017-04", "2016-11"],
    loading: true
  };

  componentDidMount() {
    const { date } = this.state;
    this.setState({ loading: true, data: [] });
    axios.get("/leaderboard/getByYear/" + date).then(({ data }) => {
      this.setState({ data, loading: false });
    });
  }

  render() {
    const { loading, data } = this.state;

    const DataTable = data.map((elem, index) => {
      const coal = getCoalitonData(elem.coalition.toLowerCase());

      return (
        <Table key={elem.login}>
          <Rank>{index + 1} #</Rank>
          <Photo
            src={`https://cdn.intra.42.fr/users/${elem.login}.jpg`}
            alt={elem.login}
          />
          <Login>{elem.login}</Login>
          <Level>
            {elem.level.toLocaleString(undefined, {
              minimumIntegerDigits: 2,
              minimumFractionDigits: 2
            })}
          </Level>
          <Coalition src={coal.svg} color={coal.color} />
        </Table>
      );
    });
    return (
      <Layout>
        <Wrapper>{loading ? <Spinner /> : DataTable}</Wrapper>
      </Layout>
    );
  }
}
export default getDate(Leaderboard);
