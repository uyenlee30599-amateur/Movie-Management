import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Banner from '../../components/Banner/Banner';
import MovieList from '../../components/MovieList/MovieList';
import MovieDetail from '../../components/MovieDetail/MovieDetail';
import requests from '../../api/requests';
import './Browse.css';

function Browse() {
	const [selectedMovie, setSelectedMovie] = useState(null);

	// Clicking the poster that is already open closes the detail view again;
	// clicking a different poster swaps to that movie's detail.
	const handleMovieClick = (movie) => {
		setSelectedMovie((prev) =>
			prev && prev.id === movie.id ? null : movie
		);
	};

	const handleClose = () => setSelectedMovie(null);

	return (
		<div className="app browse">
			<NavBar />
			<Banner />

			<div className="browse__lists">
				<MovieList
					isLargeRow
					fetchUrl={requests.fetchNetflixOriginals}
					onMovieClick={handleMovieClick}
				/>
				<MovieList
					title="Xu hướng"
					fetchUrl={requests.fetchTrending}
					onMovieClick={handleMovieClick}
				/>
				<MovieList
					title="Xếp hạng cao"
					fetchUrl={requests.fetchTopRated}
					onMovieClick={handleMovieClick}
				/>
				<MovieList
					title="Hành động"
					fetchUrl={requests.fetchActionMovies}
					onMovieClick={handleMovieClick}
				/>
				<MovieList
					title="Hài"
					fetchUrl={requests.fetchComedyMovies}
					onMovieClick={handleMovieClick}
				/>
				<MovieList
					title="Kinh dị"
					fetchUrl={requests.fetchHorrorMovies}
					onMovieClick={handleMovieClick}
				/>
				<MovieList
					title="Lãng mạn"
					fetchUrl={requests.fetchRomanceMovies}
					onMovieClick={handleMovieClick}
				/>
				<MovieList
					title="Tài liệu"
					fetchUrl={requests.fetchDocumentaries}
					onMovieClick={handleMovieClick}
				/>
			</div>

			{selectedMovie && (
				<MovieDetail movie={selectedMovie} onClose={handleClose} />
			)}
		</div>
	);
}

export default Browse;
