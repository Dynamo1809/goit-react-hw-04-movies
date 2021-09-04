const { default: axios } = require("axios");

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '043a319a5ded78ae4153c317aa19d672';

export function fetchPopularMovies() {
  return axios(`${BASE_URL}trending/movie/week?api_key=${API_KEY}`);
};


export function fetchMoviesByName(searchName = '') {
  return axios(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${searchName}`);
};

export function fetchMoviesInfo(id) {
  return axios(`${BASE_URL}movie/${id}?api_key=${API_KEY}`);
};

export function fetchMoviesCast(id) {
  return axios(`${BASE_URL}movie/${id}/credits?api_key=${API_KEY}`);
};

export function fetchMoviesRewiews(id) {
  return axios(`${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}`);
};

// const request = 'https://developers.themoviedb.org/3/movies/get-movie-reviews?api_key=043a319a5ded78ae4153c317aa19d672'