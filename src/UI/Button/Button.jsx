import React from 'react';
import './Button.scss';

const Button = ({ text, onClick = null }) => {
	return (
		<button onClick={onClick} className='Button'>
			{text}
		</button>
	);
};

export default Button;
