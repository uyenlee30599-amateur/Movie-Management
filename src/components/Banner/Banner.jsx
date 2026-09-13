import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import requests, { IMAGE_BASE_URL } from '../../api/requests';
import './Banner.css';

function truncate(str, n) {
	if (!str) return '';
	return str.length > n ? str.substring(0, n - 1) + '...' : str;
}

function Banner() {
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		let isMounted = true;

		async function fetchBannerMovie() {
			try {
				const request = await axios.get(requests.fetchNetflixOriginals);
				const results = request.data.results || [];
				const randomMovie =
					results[Math.floor(Math.random() * (results.length - 1))];
				if (isMounted) setMovie(randomMovie);
			} catch (error) {
				console.error('Error fetching banner movie:', error);
			}
		}

		fetchBannerMovie();
		return () => {
			isMounted = false;
		};
	}, []);

	if (!movie) return <header className="banner banner--loading" />;

	return (
		<header
			className="banner"
			style={{
				backgroundImage: movie.backdrop_path
					? `url(${IMAGE_BASE_URL}${movie.backdrop_path})`
					: 'none',
			}}
		>
			<div className="banner__contents">
				<h1 className="banner__title">
					{movie.title || movie.name || movie.original_name}
				</h1>
				<div className="banner__buttons">
					<button className="banner__button banner__button--play">
						Play
					</button>
					<button className="banner__button banner__button--list">
						My List
					</button>
				</div>
				<p className="banner__description">
					{truncate(movie.overview, 200)}
				</p>
			</div>
			<div className="banner__fadeBottom" />
		</header>
	);
}

export default Banner;
