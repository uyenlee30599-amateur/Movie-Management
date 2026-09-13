// Your TMDB API key, read from the .env file (see .env.example).
// Create React App only exposes env vars prefixed with REACT_APP_.
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Base URLs used to build full poster / backdrop image URLs.
// "original" is used for banner-sized backdrops, "w500" for grid posters.
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
export const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const requests = {
	fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
	fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
	fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
	fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
	fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
	fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
	fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
	fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
	fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};

export const buildVideoUrl = (movieId, mediaType = 'movie') =>
	`/${mediaType}/${movieId}/videos?api_key=${API_KEY}`;

export const buildSearchUrl = (query) =>
	`${requests.fetchSearch}&query=${encodeURIComponent(query)}`;

export default requests;
