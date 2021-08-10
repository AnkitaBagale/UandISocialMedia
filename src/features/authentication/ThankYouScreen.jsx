import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/button';
import { Box, Heading, Text } from '@chakra-ui/layout';
import { formWrapperStyle, headingStyle } from '../styles';

export const ThankYouScreen = ({ message }) => {
	return (
		<Box textAlign='center' {...formWrapperStyle}>
			<Heading {...headingStyle}>{message}</Heading>
			<Text mb='1rem' fontSize='x-large'>
				Please login to continue.
			</Text>
			<Link to='/login'>
				<Button as='span' variant='solidPrimary'>
					Login
				</Button>
			</Link>
		</Box>
	);
};
