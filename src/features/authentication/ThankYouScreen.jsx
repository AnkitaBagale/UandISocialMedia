import { Button } from '@chakra-ui/button';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { btnStyles, headingStyle, solidPrimaryButtonStyle } from '../utils';

export const ThankYouScreen = ({ message }) => {
	return (
		<Box textAlign='center'>
			<Heading {...headingStyle}>{message}</Heading>
			<Text mb='1rem' fontSize='x-large'>
				Please login to continue.
			</Text>
			<Link to='/login'>
				<Button as='span' {...btnStyles} {...solidPrimaryButtonStyle}>
					Login
				</Button>
			</Link>
		</Box>
	);
};
