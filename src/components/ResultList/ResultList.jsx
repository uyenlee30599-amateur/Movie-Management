import React from 'react';
import { POSTER_BASE_URL } from '../../api/requests';
import './ResultList.css';

function ResultList({ movies, searched, onMovieClick }) {
	if (!searched) return null;

	if (movies.length === 0) {
		return (
			<div className="resultList">
				<h2 className="resultList__title">Search Result</h2>
				<p className="resultList__empty">
					Không tìm thấy kết quả nào phù hợp.
				</p>
			</div>
		);
	}

	return (
		<div className="resultList">
			<h2 className="resultList__title">Search Result</h2>
			<div className="resultList__grid">
				{movies.map((movie) =>
					movie.poster_path ? (
						<img
							key={movie.id}
							className="resultList__poster"
							src={`${POSTER_BASE_URL}${movie.poster_path}`}
							alt={movie.title}
							loading="lazy"
							onClick={() => onMovieClick(movie)}
						/>
					) : null
				)}
			</div>
		</div>
	);
}

export default ResultList;
