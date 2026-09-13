import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import SearchForm from '../../components/SearchForm/SearchForm';
import ResultList from '../../components/ResultList/ResultList';
import MovieDetail from '../../components/MovieDetail/MovieDetail';
import axios from '../../api/axios';
import { buildSearchUrl } from '../../api/requests';
import './Search.css';

function Search() {
	const [movies, setMovies] = useState([]);
	const [searched, setSearched] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState(null);

	const handleSearch = async (query) => {
		if (!query) {
			setMovies([]);
			setSearched(false);
			return;
		}

		try {
			const request = await axios.get(buildSearchUrl(query));
			setMovies(request.data.results || []);
			setSearched(true);
		} catch (error) {
			console.error('Error searching movies:', error);
			setMovies([]);
			setSearched(true);
		}
	};

	const handleMovieClick = (movie) => {
		setSelectedMovie((prev) =>
			prev && prev.id === movie.id ? null : movie
		);
	};

	return (
		<div className="app search">
			<NavBar />

			<div className="search__content">
				<SearchForm onSearch={handleSearch} />
				<ResultList
					movies={movies}
					searched={searched}
					onMovieClick={handleMovieClick}
				/>
			</div>

			{selectedMovie && (
				<MovieDetail
					movie={selectedMovie}
					onClose={() => setSelectedMovie(null)}
				/>
			)}
		</div>
	);
}

export default Search;
