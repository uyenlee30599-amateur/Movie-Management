import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from '../../api/axios';
import { IMAGE_BASE_URL, buildVideoUrl } from '../../api/requests';
import './MovieDetail.css';

const youtubeOpts = {
	height: '400',
	width: '100%',
	playerVars: {
		autoplay: 0,
	},
};

function MovieDetail({ movie, onClose }) {
	const [trailerKey, setTrailerKey] = useState(null);

	useEffect(() => {
		let isMounted = true;
		setTrailerKey(null);

		async function fetchVideo() {
			try {
				// TV shows (Netflix Originals come from /discover/tv) and movies use
				// different endpoints, so pick the right media type per item.
				const mediaType = movie.media_type === 'tv' || movie.first_air_date
					? 'tv'
					: 'movie';
				const request = await axios.get(buildVideoUrl(movie.id, mediaType));
				const videos = request.data.results || [];

				const trailer = videos.find(
					(v) => v.site === 'YouTube' && v.type === 'Trailer'
				);
				const teaser = videos.find(
					(v) => v.site === 'YouTube' && v.type === 'Teaser'
				);
				const chosen = trailer || teaser;

				if (isMounted && chosen) setTrailerKey(chosen.key);
			} catch (error) {
				console.error('Error fetching trailer:', error);
			}
		}

		if (movie) fetchVideo();
		return () => {
			isMounted = false;
		};
	}, [movie]);

	if (!movie) return null;

	return (
		<div className="movieDetail__overlay" onClick={onClose}>
			<div
				className="movieDetail__content"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					className="movieDetail__close"
					onClick={onClose}
					aria-label="Close"
				>
					×
				</button>

				{trailerKey ? (
					<YouTube
						videoId={trailerKey}
						opts={youtubeOpts}
						className="movieDetail__trailer"
					/>
				) : movie.backdrop_path ? (
					<img
						className="movieDetail__backdrop"
						src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
						alt={movie.title || movie.name}
					/>
				) : null}

				<div className="movieDetail__info">
					<h2 className="movieDetail__title">
						{movie.title || movie.name}
					</h2>
					{movie.vote_average != null && (
						<span className="movieDetail__rating">
							★ {movie.vote_average.toFixed(1)} / 10
						</span>
					)}
					<p className="movieDetail__overview">{movie.overview}</p>
				</div>
			</div>
		</div>
	);
}

export default MovieDetail;
