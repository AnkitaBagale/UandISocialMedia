import {
	FormControl,
	FormErrorMessage,
	Box,
	Input,
	InputRightElement,
	Button,
	Heading,
	FormLabel,
	Text,
} from '@chakra-ui/react';
import { useReducer } from 'react';
import {
	formWrapperStyle,
	inputWrapperStyle,
	inputRightElementWrapperStyle,
	InputStyle,
	inputRightElementStyle,
	inputRightElementIconStyle,
	headingStyle,
	btnStyles,
	solidPrimaryButtonStyle,
	labelStyle,
	overlayBoxStyle,
	apiErrorStyle,
	apiErrorSymbolStyle,
} from '../../utils';
import { ViewIcon, ViewOffIcon, WarningTwoIcon } from '@chakra-ui/icons';

import { signupFormReducer, initialFormState } from './reducers';
import { signupFormSubmit } from './utils';

import { useDispatch } from 'react-redux';
import { useAuthentication } from '../authenticationSlice';
import Loader from 'react-loader-spinner';

import { ThankYouScreen } from '../ThankYouScreen';

export const SignUp = () => {
	const [formState, formDispatch] = useReducer(
		signupFormReducer,
		initialFormState,
	);

	const {
		signUp: { signUpStatus, signUpError },
	} = useAuthentication();

	const dispatch = useDispatch();

	const onFocusClearError = (action) => {
		formDispatch({ type: action.type, payload: '' });
	};

	// const loginUser = async () => {
	// 	formDispatch({ type: 'RESET_ERRORS' });
	// 	if (checkLoginFormValidity(formState, formDispatch)) {
	// 		dispatch(
	// 			loginBtnClicked({
	// 				email: formState.email,
	// 				password: formState.password,
	// 			}),
	// 		);
	// 	}
	// };

	return (
		<>
			{signUpStatus === 'success' ? (
				<ThankYouScreen message='Thank you for signing up!' />
			) : (
				<Box {...formWrapperStyle}>
					<Heading {...headingStyle}>SIGN UP</Heading>
					<Text pb='2rem' textAlign='center'>
						Fill below form to sign up and enjoy full benifits of U&I Quiz
					</Text>

					<Box position='relative'>
						{signUpStatus === 'loading' && (
							<Box {...overlayBoxStyle}>
								<Loader
									type='TailSpin'
									color='#ff3f6c'
									height={80}
									width={80}
								/>
							</Box>
						)}
						<Box>
							<FormControl
								id='firstName'
								isRequired
								{...inputWrapperStyle}
								isInvalid={!!formState.firstNameError}>
								<FormLabel {...labelStyle}>First Name</FormLabel>
								<Box w='100%'>
									<Input
										type='text'
										{...InputStyle}
										placeholder='Enter your first name'
										value={formState.firstName}
										onChange={(e) =>
											formDispatch({
												type: 'SET_FIRST_NAME',
												payload: e.target.value,
											})
										}
										onFocus={() =>
											onFocusClearError({
												type: 'SET_FIRST_NAME_ERROR',
												payload: '',
											})
										}
									/>
									<FormErrorMessage>
										{formState.firstNameError}
									</FormErrorMessage>
								</Box>
							</FormControl>

							<FormControl
								id='lastName'
								isRequired
								{...inputWrapperStyle}
								isInvalid={!!formState.lastNameError}>
								<FormLabel {...labelStyle}>Last Name</FormLabel>
								<Box w='100%'>
									<Input
										type='text'
										{...InputStyle}
										placeholder='Enter your last name'
										value={formState.lastName}
										onChange={(e) =>
											formDispatch({
												type: 'SET_LAST_NAME',
												payload: e.target.value,
											})
										}
										onFocus={() =>
											onFocusClearError({
												type: 'SET_LAST_NAME_ERROR',
												payload: '',
											})
										}
									/>
									<FormErrorMessage>{formState.lastNameError}</FormErrorMessage>
								</Box>
							</FormControl>

							<FormControl
								id='email'
								isRequired
								{...inputWrapperStyle}
								isInvalid={!!formState.emailError}>
								<FormLabel {...labelStyle}>Email address</FormLabel>
								<Box w='100%'>
									<Input
										type='email'
										{...InputStyle}
										placeholder='example@example.com'
										value={formState.email}
										onChange={(e) =>
											formDispatch({
												type: 'SET_EMAIL',
												payload: e.target.value,
											})
										}
										onFocus={() =>
											onFocusClearError({
												type: 'SET_EMAIL_ERROR',
												payload: '',
											})
										}
									/>
									<FormErrorMessage>{formState.emailError}</FormErrorMessage>
								</Box>
							</FormControl>

							<FormControl
								id='userName'
								isRequired
								{...inputWrapperStyle}
								isInvalid={!!formState.userNameError}>
								<FormLabel {...labelStyle}>Username</FormLabel>
								<Box w='100%'>
									<Input
										type='text'
										{...InputStyle}
										placeholder='Enter username'
										value={formState.userName}
										onChange={(e) =>
											formDispatch({
												type: 'SET_USERNAME',
												payload: e.target.value,
											})
										}
										onFocus={() =>
											onFocusClearError({
												type: 'SET_USERNAME_ERROR',
												payload: '',
											})
										}
									/>
									<FormErrorMessage>{formState.userNameError}</FormErrorMessage>
								</Box>
							</FormControl>

							<FormControl
								id='password'
								isRequired
								{...inputWrapperStyle}
								isInvalid={!!formState.passwordError}>
								<FormLabel {...labelStyle}>Password</FormLabel>
								<Box w='100%'>
									<Input
										type={formState.showPassword ? 'type' : 'password'}
										{...InputStyle}
										placeholder='Enter password'
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

							<Box mt='2rem'>
								<Button
									onClick={() => {
										signupFormSubmit({ formState, formDispatch, dispatch });
									}}
									{...btnStyles}
									{...solidPrimaryButtonStyle}>
									Submit
								</Button>
							</Box>
						</Box>
					</Box>

					{signUpStatus === 'failure' && (
						<Box {...apiErrorStyle}>
							<WarningTwoIcon {...apiErrorSymbolStyle} />
							{signUpError}
						</Box>
					)}
				</Box>
			)}
		</>
	);
};
