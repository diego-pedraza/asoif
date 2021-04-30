import React from 'react';

import Table from './Table';
import Filters from './Filters';
import Pagination from './Pagination';

const Home = () => {
	return (
		<main>
			<header>
				<h1>A Song of Ice and Fire</h1>
			</header>
			<section className='section section-center'>
				<Filters />
				<Table />
				<Pagination />
			</section>
		</main>
	);
};

export default Home;
