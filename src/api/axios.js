import axios from 'axios';

// All TMDB endpoints used across the app are relative to this base URL,
// e.g. axios.get(requests.fetchTrending) hits
// https://api.themoviedb.org/3/trending/all/week?api_key=...
const instance = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
});

export default instance;
