import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import moment from 'moment';
import { useParams, Link } from 'react-router-dom';

const Book = () => {
	const { id } = useParams();
	const baseUrl = 'https://www.anapioficeandfire.com/api/';
	const [loading, setLoading] = useState(true);
	const [bookData, setBookData] = useState([]);

	const getBookData = async (url) => {
		setLoading(true);
		const response = await fetch(url);
		const data = await response.json();
		setBookData(data);
		setLoading(false);
	};

	useEffect(() => {
		const url = `${baseUrl}/books/${id}`;
		getBookData(url);
	}, [id]);

	if (loading) {
		return <Loading />;
	}
	return (
		<main>
			<header>
				<h1>{bookData.name || `Book: ${id}`}</h1>
			</header>
			<section className='section-center'>
				<h4>ISBN:</h4>
				<p>{bookData.isbn || 'Unknown'}</p>
				<h4>Number of Pages:</h4>
				<p>{bookData.numberOfPages}</p>
				<h4>Release date:</h4>
				<p>{moment(bookData.released).format('MMM Do, YYYY')}</p>

				<div className='btn-container'>
					<Link to='/' className='btn'>
						back to Home Page
					</Link>
				</div>
			</section>
		</main>
	);
};

export default Book;
