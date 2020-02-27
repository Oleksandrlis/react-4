import React, { Component } from "react";
import services from "../services/services";
import { Link } from "react-router-dom";

export default class MoviePage extends Component {
  state = {
    movies: [],
    value: ""
  };

  getValue = e => {
    this.setState({ value: e.target.value });
  };

  fetchMovies = value => {
    services
      .searchMovies(value)
      .then(data => this.setState({ movies: data.data.results }));
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value === "") {
      return;
    }
    console.log(this.props.history.location.pathname);
    this.props.history.push(`?query=${this.state.value}`);
    this.fetchMovies(this.state.value);
    this.setState({ value: "" });
  };

  ////goBack не работает, строка без ?query=value,
  render() {
    const { movies, value } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={value} onChange={this.getValue} type="search"></input>
          <button type="submit">Search</button>
        </form>
        <ul>
          {movies.length !== 0 ? (
            <>
              {movies.map(item => (
                <li key={item.id}>
                  <Link id={item.id} to={`/movies/${item.id}`}>
                    {item.original_title}
                  </Link>
                </li>
              ))}
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    );
  }
}
