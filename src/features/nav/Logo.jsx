import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { logoTitleStyle, AndSymbolStyle, logoTaglineStyle } from './navStyles';

export const Logo = () => {
	return (
		<Link to='/' className='link-no-style'>
			<Box as='span' {...logoTitleStyle}>
				U
				<Box as='span' {...AndSymbolStyle}>
					&
				</Box>
				I
			</Box>
			<Box {...logoTaglineStyle}>LET'S DESIGN TOGETHER</Box>
		</Link>
	);
};
