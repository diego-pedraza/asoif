import React, { useState, useEffect } from 'react';
import parse from 'parse-link-header';
import Table from './Table';

function App() {
	const baseUrl = 'https://www.anapioficeandfire.com/api/';

	const [page, setPage] = useState('1');
	const [pageSize, setPageSize] = useState('10');
	const [paginationUrls, setPaginationUrls] = useState({});
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const getData = async (finalUrl) => {
		const response = await fetch(finalUrl);
		const data = await response.json();
		setPaginationUrls(await parse(response.headers.get('link')));
		setData(data);
		setLoading(false);
	};

	useEffect(() => {
		const url = `${baseUrl}/characters?page=${page}&pageSize=${pageSize}`;
		getData(url);
	}, [page, pageSize]);

	return (
		<main>
			<div className='section-title'>
				<h1>{loading ? 'Loading...' : 'A Song of Ice and Fire: Characters'}</h1>
				<div className='underline'></div>
			</div>
			{/* TODO:
                Add Section with search bar (let's make it as big as the table) + Results per page?
                Right bellow add (centered) Results per page
                Filter by: radio button? (gender)
             */}
			<section className='section-center'>
				<Table characters={data} />
			</section>
			<section>
				{!loading && (
					<div className='btn-container'>
						{Object.entries(paginationUrls).map((item) => {
							return (
								<button
									key={item[0]}
									className='pagination-btn'
									onClick={() => {
										setPage(item[1].page);
									}}
								>
									{item[0]}
								</button>
							);
						})}
					</div>
				)}
			</section>
		</main>
	);
}

export default App;
