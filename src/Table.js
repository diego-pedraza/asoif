import React from 'react';

const Table = ({ characters }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Name - Alias</th>
					<th>Gender</th>
					<th>Culture</th>
					<th>Books</th>
					<th>Season</th>
				</tr>
			</thead>
			<tbody>
				{characters.map((character) => {
					const {
						url,
						name,
						gender,
						aliases,
						culture,
						books,
						tvSeries,
					} = character;
					return (
						<tr key={url}>
							<td>{`${name}${
								name && aliases && aliases.toString() !== '' ? ', ' : ''
							}${aliases}`}</td>
							<td>{`${gender || 'Unknown'}`}</td>
							<td>{`${culture || 'Unknown'}`}</td>
							<td className='wider-cell'>
								<span>
									{`${books.map((book) => {
										return book.slice(book.length - 1);
									})}`}
								</span>
							</td>
							<td className='wider-cell'>
								<span>
									{`${tvSeries.map((season) => {
										return season.slice(season.length - 1);
									})}`}
								</span>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Table;
