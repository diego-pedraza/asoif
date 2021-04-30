import React from 'react';
import { useGlobalContext } from '../context';

const Filters = () => {
	const { updateFilters, filters } = useGlobalContext();
	const { nameAlias, gender } = filters;
	return (
		<form className='filter-form' onSubmit={(e) => e.preventDefault()}>
			<div className='form-control'>
				<input
					type='text'
					className='name-filter-input'
					placeholder='Filter by Name or Alias'
					name='nameAlias'
					value={nameAlias}
					onChange={(e) => updateFilters(e)}
				/>
			</div>

			<div className='form-control'>
				<label htmlFor='gender'>Gender</label>
				<select
					id='gender'
					className='gender-select'
					name='gender'
					value={gender}
					onChange={(e) => updateFilters(e)}
				>
					<option value='male'>Male</option>
					<option value='female'>Female</option>
					<option value='all'>All</option>
				</select>
			</div>
		</form>
	);
};

export default Filters;
