import { useReducer } from 'react';
import { FormControl, Box, Input, Button, Heading } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import {
	formWrapperStyle,
	inputWrapperStyle,
	InputStyle,
	headingStyle,
	apiErrorStyle,
	apiErrorSymbolStyle,
	overlayBoxStyle,
} from '../../styles';
import { usernameFormState, signupFormReducer } from './reducers';
import { API_URL } from '../../utils';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { checkSignUpFormValidity } from './utils';

export const UsernameCreationForm = ({ userDetails, setStatus }) => {
	const [formState, formDispatch] = useReducer(
		signupFormReducer,
		usernameFormState,
	);

	const signupUser = async () => {
		try {
			formDispatch({ type: 'RESET_ERRORS' });
			if (checkSignUpFormValidity(formState, formDispatch)) {
				formDispatch({ type: 'SET_STATUS', payload: 'loading' });
				await axios({
					method: 'POST',
					url: `${API_URL}/social-profiles/uandi-signup`,
					data: {
						userId: userDetails.userId,
						userName: formState.userName,
					},
				});

				formDispatch({ type: 'SET_STATUS', payload: '' });
				setStatus('PHASE2_SUCCESS');
			}
		} catch (error) {
			console.log({ error });
			const message = error?.response?.data?.message || 'Please try again!';
			formDispatch({ type: 'SET_USERNAME_ERROR', payload: message });
		}
	};

	return (
		<>
			<Box {...formWrapperStyle}>
				<Heading {...headingStyle}>Create Account</Heading>
				<Box position='relative'>
					{formState.status === 'loading' && (
						<Box {...overlayBoxStyle}>
							<Loader type='TailSpin' color='#ff3f6c' height={80} width={80} />
						</Box>
					)}

					<Box>
						<FormControl id='name' {...inputWrapperStyle}>
							<Box w='100%'>
								<Input
									type='text'
									{...InputStyle}
									value={userDetails.firstname + ' ' + userDetails.lastname}
									isReadOnly
								/>
							</Box>
						</FormControl>

						<FormControl id='userName' isRequired {...inputWrapperStyle}>
							<Box w='100%'>
								<Input
									type='userName'
									{...InputStyle}
									placeholder='Enter your username here'
									value={formState.userName}
									onChange={(e) =>
										formDispatch({
											type: 'SET_USERNAME',
											payload: e.target.value,
										})
									}
								/>
							</Box>
						</FormControl>

						<Button
							variant='blockPrimary'
							mt='2rem'
							onClick={() => {
								signupUser();
							}}>
							Sign Up
						</Button>
					</Box>

					{formState.status === 'failure' && (
						<Box {...apiErrorStyle}>
							<WarningTwoIcon {...apiErrorSymbolStyle} />
							{formState.userNameError}
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
};
