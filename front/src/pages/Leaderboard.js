import React from "react";
import styled, { css } from "styled-components";
import Button from "../components/Button";
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

  &:hover {
    background-color: rgb(169, 169, 169, 0.5);
  }
  justify-items: center;
  cursor: pointer;

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

const Login = styled.div`
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
      return { svg: "", color: "lightgrey" };
  }
};

const TabWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0;
  :first-child {
    margin-left: 5px;
  }
`;

const TabYear = styled(Button)`
  margin: 0 2px;
  border: none;
  ${props =>
    props.selected &&
    css`
      background: var(--secondary);
      color: white;
    `};
`;

class Leaderboard extends React.Component {
  state = {
    data: [],
    date: this.props.date || "2017-11",
    years: [
      "2018-11",
      "2018-04",
      "2017-11",
      "2017-04",
      "2016-11",
      "2015-11",
      "2014-11",
      "2013-11"
    ],
    loading: true
  };

  componentDidMount() {
    this.onChangeDate(this.state.date);
  }

  onChangeDate = date => {
    this.setState({ loading: true, data: [], date });
    axios.get("/leaderboard/getByYear/" + date).then(({ data }) => {
      this.setState({ data, loading: false });
    });
  };

  render() {
    const { loading, data } = this.state;

    const DataTable = data.map((elem, index) => {
      const coal = elem.coalition
        ? getCoalitonData(elem.coalition.toLowerCase())
        : "";

      return (
        <Table
          key={elem.login}
          onClick={() =>
            (window.location.href = `https://profile.intra.42.fr/users/${
              elem.login
            }`)
          }
        >
          <Rank>{index + 1}</Rank>
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
          {elem.coalition && (
            <Coalition src={coal.svg} color={coal.color} alt={elem.coalition} />
          )}
        </Table>
      );
    });
    const TabData = () => (
      <TabWrapper>
        {this.state.years.map(elem => (
          <TabYear
            key={elem}
            onClick={() => {
              this.onChangeDate(elem);
            }}
            selected={elem === this.state.date}
          >
            {elem}
          </TabYear>
        ))}
      </TabWrapper>
    );
    return (
      <Layout>
        <Wrapper>
          <TabData />
          {loading ? <Spinner /> : DataTable}
        </Wrapper>
      </Layout>
    );
  }
}
export default getDate(Leaderboard);
