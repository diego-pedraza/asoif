import React from 'react';
import Loading from './Loading';
import { v4 as uuidv4 } from 'uuid';
import { useGlobalContext } from '../context';

import { Link } from 'react-router-dom';

const Table = () => {
	const {
		loading,
		pageSize,
		handlePageSize,
		data: characters,
	} = useGlobalContext();

	if (loading) {
		return <Loading />;
	}
	return (
		<>
			<form>
				<div className='form-control'>
					<label htmlFor='resultsSize'>Results per Page</label>
					<select
						name='pageSize'
						id='resultsSize'
						value={pageSize}
						onChange={(e) => handlePageSize(e.target.value)}
					>
						<option value='5'>5</option>
						<option value='10'>10</option>
						<option value='15'>15</option>
						<option value='20'>20</option>
						<option value='25'>25</option>
					</select>
				</div>
			</form>
			<table>
				<thead>
					<tr>
						<th>Name or Aliases</th>
						<th>Gender</th>
						<th>Culture</th>
						<th>Books</th>
						<th>Season</th>
					</tr>
				</thead>
				<tbody>
					{characters.map((character) => {
						const {
							name,
							gender,
							aliases,
							culture,
							books,
							tvSeries,
						} = character;
						return (
							<tr key={uuidv4()}>
								<td>{`${name}${
									name && aliases && aliases.toString() !== '' ? ', ' : ''
								}${aliases}`}</td>
								<td>{`${gender || 'Unknown'}`}</td>
								<td>{`${culture || 'Unknown'}`}</td>
								<td className='wider-cell'>
									{books.map((book) => {
										const bookId = book.substring(book.lastIndexOf('/') + 1);
										return (
											<Link
												to={`/books/${bookId}`}
												key={bookId}
												className='book-link'
											>
												{bookId}
											</Link>
										);
									})}
								</td>
								<td className='wider-cell'>
									{tvSeries.map((season) => {
										return (
											<span key={uuidv4()}>
												{season.slice(season.length - 1)}
											</span>
										);
									})}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
};

export default Table;
