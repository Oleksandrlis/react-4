import React, { Component, Suspense, lazy } from "react";
import { Route, Link, Switch } from "react-router-dom";
import services from "../../services/services";
import Loader from "react-loader-spinner";

const Cast = lazy(() => import("./cast/Cast"));
const Reviews = lazy(() => import("./reviews/Reviews"));

const getIdFromProps = props => props.match.params.movieId;

export default class MovieDetailsPage extends Component {
  state = {
    movie: null,
    cast: [],
    reviews: []
  };

  componentDidMount = () => {
    const id = getIdFromProps(this.props);
    services
      .getMovieDetails(id)
      .then(data => this.setState({ movie: data.data, id: id }));
  };

  handleCast = () => {
    services
      .getCasts(this.state.id)
      .then(data => this.setState({ cast: data }));
  };

  handleRewiews = () => {
    services
      .getReviews(this.state.id)
      .then(data => this.setState({ reviews: data.data.results }));
  };

  handleGoBack = () => {
    //this.props.history.push("/");
    this.props.history.goBack();
  };

  render() {
    const { movie, cast, reviews } = this.state;
    return (
      <div>
        {movie && (
          <>
            <button type="button" onClick={this.handleGoBack}>
              Go back
            </button>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.original_title}
            />
            <h2>{movie.original_title}</h2>

            <p>Use score : {Math.round(movie.popularity)}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <ul>
              {movie.genres !== 0 && (
                <>
                  {movie.genres.map(item => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </>
              )}
            </ul>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link
                  to={`${this.props.match.path}/cast`}
                  onClick={this.handleCast}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={`${this.props.match.path}/reviews`}
                  onClick={this.handleRewiews}
                >
                  Reviews
                </Link>
              </li>
            </ul>
            <Suspense
              fallback={
                <Loader
                  type="Puff"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  timeout={3000}
                />
              }
            >
              <Switch>
                <Route
                  path={`${this.props.match.path}/cast`}
                  render={() => <Cast cast={cast} />}
                />
                <Route
                  path={`${this.props.match.path}/reviews`}
                  render={() => <Reviews reviews={reviews} />}
                />
              </Switch>
            </Suspense>
          </>
        )}
      </div>
    );
  }
}
