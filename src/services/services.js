import axios from "axios";

const baseUrl = `https://api.themoviedb.org/3`;
const keyApi = `7dbf79a7ec9fee0ed11175b6a2c600f3`;

export default {
  async getTrending() {
    try {
      const data = await axios
        .get(`${baseUrl}/trending/movie/day?api_key=${keyApi}`)
        .then(data => data.data.results);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async searchMovies(value) {
    try {
      return await axios.get(
        `${baseUrl}/search/movie?api_key=${keyApi}&query=${value}`
      );
    } catch (error) {
      console.log(error);
    }
  },

  async getMovieDetails(id) {
    try {
      return await axios.get(`${baseUrl}/movie/${id}?api_key=${keyApi}`);
    } catch (error) {
      console.log(error);
    }
  },

  async getCasts(id) {
    try {
      const data = await axios
        .get(`${baseUrl}/movie/${id}/credits?api_key=${keyApi}`)
        .then(data => data.data.cast);
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  async getReviews(id) {
    try {
      return await axios.get(
        `${baseUrl}/movie/${id}/reviews?api_key=${keyApi}&language=en-US&page=1`
      );
    } catch (error) {
      console.log(error);
    }
  }
};
