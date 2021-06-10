import { useReducer } from 'react';
import {
	FormControl,
	FormErrorMessage,
	Box,
	Input,
	InputRightElement,
	Button,
	Heading,
	Image,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, WarningTwoIcon } from '@chakra-ui/icons';
import {
	formWrapperStyle,
	inputWrapperStyle,
	inputRightElementWrapperStyle,
	InputStyle,
	inputRightElementStyle,
	inputRightElementIconStyle,
	headingStyle,
	apiErrorStyle,
	apiErrorSymbolStyle,
	overlayBoxStyle,
} from '../../styles';
import { checkUandILoginFormValidity } from './utils';
import { loginFormReducer, initialFormState } from './reducers';
import { API_URL } from '../../utils';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import logo from '../../../assets/logo.png';

export const UandILogin = ({ setUserDetails, setStatus }) => {
	const [formState, formDispatch] = useReducer(
		loginFormReducer,
		initialFormState,
	);

	const onFocusClearError = (action) => {
		formDispatch({ type: action.type, payload: '' });
	};

	const verifyUser = async () => {
		try {
			formDispatch({ type: 'RESET_ERRORS' });
			if (checkUandILoginFormValidity(formState, formDispatch)) {
				formDispatch({ type: 'SET_STATUS', payload: 'loading' });
				const {
					data: { response },
				} = await axios({
					method: 'POST',
					url: `${API_URL}/social-profiles/uandi-signup-verification`,
					headers: {
						email: formState.email,
						password: formState.password,
					},
				});
				setUserDetails(response);
				formDispatch({ type: 'SET_STATUS', payload: '' });
				setStatus('PHASE1_SUCCESS');
			}
		} catch (error) {
			console.log({ error });
			const message = error?.response?.data?.message || 'Please try again!';
			formDispatch({ type: 'SET_API_ERROR', payload: message });
		}
	};

	return (
		<>
			<Box {...formWrapperStyle}>
				<Heading {...headingStyle}>
					<Image d='inline-block' src={logo} ht='2rem' w='2rem' mr='0.5rem' />
					Login
				</Heading>
				<Box position='relative'>
					{formState.status === 'loading' && (
						<Box {...overlayBoxStyle}>
							<Loader type='TailSpin' color='#ff3f6c' height={80} width={80} />
						</Box>
					)}

					<Box>
						<FormControl id='email' isRequired {...inputWrapperStyle}>
							<Box w='100%'>
								<Input
									type='email'
									{...InputStyle}
									placeholder='Enter your email here'
									value={formState.email}
									onChange={(e) =>
										formDispatch({ type: 'SET_EMAIL', payload: e.target.value })
									}
									onFocus={() =>
										onFocusClearError({ type: 'SET_EMAIL_ERROR', payload: '' })
									}
								/>
							</Box>
						</FormControl>

						<FormControl
							id='password'
							isRequired
							{...inputWrapperStyle}
							isInvalid={!!formState.passwordError}>
							<Box w='100%'>
								<Input
									type={formState.showPassword ? 'type' : 'password'}
									{...InputStyle}
									placeholder='Enter your password here'
									value={formState.password}
									onChange={(e) =>
										formDispatch({
											type: 'SET_PASSWORD',
											payload: e.target.value,
										})
									}
									onFocus={() =>
										onFocusClearError({
											type: 'SET_PASSWORD_ERROR',
											payload: '',
										})
									}
								/>
								<InputRightElement {...inputRightElementWrapperStyle}>
									<Button
										onClick={() => formDispatch({ type: 'SHOW_PASSWORD' })}
										{...inputRightElementStyle}>
										{formState.showPassword ? (
											<ViewIcon {...inputRightElementIconStyle} />
										) : (
											<ViewOffIcon {...inputRightElementIconStyle} />
										)}
									</Button>
								</InputRightElement>
								<FormErrorMessage>{formState.passwordError}</FormErrorMessage>
							</Box>
						</FormControl>

						<Button
							variant='blockPrimary'
							mt='2rem'
							onClick={() => {
								verifyUser();
							}}>
							Login
						</Button>
					</Box>

					{formState.status === 'failure' && (
						<Box {...apiErrorStyle}>
							<WarningTwoIcon {...apiErrorSymbolStyle} />
							{formState.apiError}
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
};
