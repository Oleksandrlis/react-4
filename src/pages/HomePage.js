import React, { Component } from "react";
import services from "../services/services";
import { Link } from "react-router-dom";

export default class HomePage extends Component {
  state = {
    trendingMovies: []
  };

  componentDidMount() {
    services.getTrending().then(data => {
      this.setState({ trendingMovies: data });
    });
  }

  render() {
    const { trendingMovies } = this.state;
    return (
      <div>
        <h1>Trending today</h1>
        <ul>
          {trendingMovies.map(item => (
            <li key={item.id}>
              <Link id={item.id} to={`/movies/${item.id}`}>
                {item.original_title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
