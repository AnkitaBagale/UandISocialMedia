import {
	FormControl,
	FormErrorMessage,
	Box,
	Input,
	InputRightElement,
	Button,
	Heading,
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
} from '../../utils';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { checkLoginFormValidity } from './utils';
import { signupFormReducer, initialFormState } from './reducers';
import { btnStyles, solidPrimaryButtonStyle } from '../../utils';
import { useDispatch } from 'react-redux';

export const SignUp = () => {
	const [formState, formDispatch] = useReducer(
		signupFormReducer,
		initialFormState,
	);

	// const dispatch = useDispatch();

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
			<Box {...formWrapperStyleProps}>
				<Heading {...headingStyleProps}>SIGN UP</Heading>
				<Text pb='2rem' textAlign='center'>
					Fill below form to sign up and enjoy full benifits of U&I Quiz
				</Text>
				<Box>
					{/* <Box position='relative'> */}
					{/* <Box {...overlayBoxStyleProps}>
						<Loader type='TailSpin' color='#ff3f6c' height={80} width={80} />
					</Box> */}

					<Box>
						<FormControl
							id='firstName'
							isRequired
							{...inputWrapperStyleProps}
							isInvalid={!!formState.firstNameError}>
							<FormLabel {...labelStyleProps}>First Name</FormLabel>
							<Box w='100%'>
								<Input
									type='text'
									{...InputStyleProps}
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
								<FormErrorMessage>{formState.firstNameError}</FormErrorMessage>
							</Box>
						</FormControl>

						<FormControl
							id='lastName'
							isRequired
							{...inputWrapperStyleProps}
							isInvalid={!!formState.lastNameError}>
							<FormLabel {...labelStyleProps}>Last Name</FormLabel>
							<Box w='100%'>
								<Input
									type='text'
									{...InputStyleProps}
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
							{...inputWrapperStyleProps}
							isInvalid={!!formState.emailError}>
							<FormLabel {...labelStyleProps}>Email address</FormLabel>
							<Box w='100%'>
								<Input
									type='email'
									{...InputStyleProps}
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
							id='password'
							isRequired
							{...inputWrapperStyleProps}
							isInvalid={!!formState.passwordError}>
							<FormLabel {...labelStyleProps}>Password</FormLabel>
							<Box w='100%'>
								<Input
									type={formState.showPassword ? 'type' : 'password'}
									{...InputStyleProps}
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
								<InputRightElement {...eyeIconButtonWrapperStyleProps}>
									<Button
										onClick={() => formDispatch({ type: 'SHOW_PASSWORD' })}
										{...eyeIconButtonStyleProps}>
										{formState.showPassword ? (
											<ViewIcon {...eyeIconStyleProps} />
										) : (
											<ViewOffIcon {...eyeIconStyleProps} />
										)}
									</Button>
								</InputRightElement>
								<FormErrorMessage>{formState.passwordError}</FormErrorMessage>
							</Box>
						</FormControl>

						<Box mt='2rem'>
							<Button
								onClick={() => {}}
								{...btnStyleProps}
								{...blockButtonStyleProps}>
								Submit
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};
