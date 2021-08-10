import { Box, Text } from '@chakra-ui/layout';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formWrapperStyle } from '../../styles';
import { ThankYouScreen } from '../ThankYouScreen';
import { UandILogin } from './UandILogin';
import { UsernameCreationForm } from './UsernameCreationForm';

export const UandISignUp = () => {
	const [userDetails, setUserDetails] = useState(null);
	const [status, setStatus] = useState('');

	return (
		<Box padding='2rem 1.5rem'>
			{status === 'PHASE2_SUCCESS' ? (
				<ThankYouScreen message='Thank you for signing up!' />
			) : (
				<>
					{status === 'PHASE1_SUCCESS' ? (
						<UsernameCreationForm
							userDetails={userDetails}
							setStatus={setStatus}
						/>
					) : (
						<UandILogin setUserDetails={setUserDetails} setStatus={setStatus} />
					)}
					<SignUpOrLoginOption />
				</>
			)}
		</Box>
	);
};

export const SignUpOrLoginOption = () => {
	return (
		<Box {...formWrapperStyle}>
			<Box textAlign='center'>
				Not a user of U&I?
				<Text as='button' color='pink.800' fontWeight='500'>
					<Link className='link-text' to='/signup'>
						Sign up
					</Link>
				</Text>
			</Box>
			<Box textAlign='center'>
				Already have an account?
				<Text as='button' color='pink.800' fontWeight='500'>
					<Link className='link-text' to='/login'>
						Login
					</Link>
				</Text>
			</Box>
		</Box>
	);
};
