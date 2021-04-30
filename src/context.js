import React, { useState, useContext, useEffect } from 'react';

import parse from 'parse-link-header';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const baseUrl = 'https://www.anapioficeandfire.com/api/';

	const [page, setPage] = useState('1');
	const [pageSize, setPageSize] = useState('10');
	const [paginationUrls, setPaginationUrls] = useState({});
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [localData, setLocalData] = useState([]);

	const [filters, setFilters] = useState({
		nameAlias: '',
		gender: 'all',
	});

	const handlePagination = (page) => {
		setPage(page);
	};

	const handlePageSize = (pageSize) => {
		setPageSize(pageSize);
	};

	const updateFilters = (e) => {
		let elementName = e.target.name;
		let elementValue = e.target.value;
		const newFilter = { ...filters, [elementName]: elementValue };
		setFilters(newFilter);
	};

	useEffect(() => {
		setData(localData);
		const { nameAlias, gender } = filters;
		let tempData = [...localData];

		if (nameAlias) {
			tempData = tempData.filter((character) => {
				let { name, aliases } = character;
				let orgNameAlias = `${name}${
					name && aliases && aliases.toString() !== '' ? ', ' : ''
				}${aliases}`;
				return orgNameAlias.toLowerCase().includes(nameAlias.toLowerCase());
			});
		}
		if (gender !== 'all') {
			tempData = tempData.filter((character) => {
				let { gender: originalGender } = character;
				return originalGender.toLowerCase() === gender.toLowerCase();
			});
		}
		setData(tempData);
	}, [filters, localData]);

	const getData = async (finalUrl) => {
		setLoading(true);
		const response = await fetch(finalUrl);
		const data = await response.json();
		const parsedLink = await parse(response.headers.get('link'));
		parsedLink && setPaginationUrls(parsedLink);
		setData(data);
		setLocalData(data);
		setLoading(false);
	};

	useEffect(() => {
		const url = `${baseUrl}/characters?page=${page}&pageSize=${pageSize}`;
		getData(url);
	}, [page, pageSize]);

	return (
		<AppContext.Provider
			value={{
				data,
				loading,
				paginationUrls,
				handlePagination,
				pageSize,
				handlePageSize,
				filters,
				updateFilters,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
