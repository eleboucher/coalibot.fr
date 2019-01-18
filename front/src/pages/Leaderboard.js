import React from "react";

import getDate from "../utils/getDate";
import Layout from "../components/Layout";
import axios from "../config/axios";
import Spinner from "../components/Spinner";
import Grid from "../components/Grid";
class Leaderboard extends React.Component {
  state = {
    data: [],
    date: this.props.date || "2018-11",
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
    const { loading } = this.state;
    return (
      <Layout>
        <Grid>{loading ? <Spinner /> : <p>done</p>}</Grid>
      </Layout>
    );
  }
}
export default getDate(Leaderboard);
