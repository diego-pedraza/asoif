import React from 'react';
import loadingGif from '../images/preloader.gif';

const Loading = () => {
	return (
		<div className='loading-container'>
			<img src={loadingGif} alt='Loading spinner' />
		</div>
	);
};

export default Loading;
