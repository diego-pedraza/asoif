import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Book from './components/Book';

function App() {
	return (
		<Switch>
			<Route path='/' exact>
				<Home />
			</Route>
			<Route path='/books/:id' children={<Book />} />
		</Switch>
	);
}

export default App;
