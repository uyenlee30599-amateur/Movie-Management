import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { IMAGE_BASE_URL, POSTER_BASE_URL } from '../../api/requests';
import './MovieList.css';

// isLargeRow: renders vertical posters (poster_path) instead of the default
// horizontal backdrops (backdrop_path). Used for the "Original" row.
function MovieList({ title, fetchUrl, isLargeRow = false, onMovieClick }) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		let isMounted = true;

		async function fetchData() {
			try {
				const request = await axios.get(fetchUrl);
				if (isMounted) setMovies(request.data.results || []);
			} catch (error) {
				console.error(`Error fetching movie list (${title}):`, error);
			}
		}

		fetchData();
		return () => {
			isMounted = false;
		};
	}, [fetchUrl, title]);

	if (movies.length === 0) return null;

	return (
		<div className="movieList">
			{title && <h2 className="movieList__title">{title}</h2>}
			<div className="movieList__row hideScrollbar">
				{movies.map((movie) => {
					const imagePath = isLargeRow
						? movie.poster_path
						: movie.backdrop_path;
					if (!imagePath) return null;

					return (
						<img
							key={movie.id}
							className={
								isLargeRow
									? 'movieList__poster movieList__poster--large'
									: 'movieList__poster'
							}
							src={`${isLargeRow ? POSTER_BASE_URL : IMAGE_BASE_URL}${imagePath}`}
							alt={movie.title || movie.name}
							loading="lazy"
							onClick={() => onMovieClick(movie)}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default MovieList;
