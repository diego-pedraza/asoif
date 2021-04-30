import React from 'react';
import { useGlobalContext } from '../context';

const Pagination = () => {
	const { loading, paginationUrls, handlePagination } = useGlobalContext();

	if (!loading) {
		return (
			<div className='btn-container'>
				{Object.entries(paginationUrls).map((item) => {
					return (
						<button
							key={item[0]}
							className='pagination-btn'
							onClick={() => {
								handlePagination(item[1].page);
							}}
						>
							{item[0]}
						</button>
					);
				})}
			</div>
		);
	}
	return <div></div>;
};

export default Pagination;
