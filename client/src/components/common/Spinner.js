import React from 'react';
import spinner from '../../img/spinner.gif';

const Spinner = () => {
	return (
		<img
			src={spinner}
			alt='Loading...'
			style={{width: '80px', display: 'block', margin: 'auto'}}
		/>
	)
};

export default Spinner;