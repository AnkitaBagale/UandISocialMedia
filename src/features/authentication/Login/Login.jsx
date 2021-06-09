import {
	FormControl,
	FormErrorMessage,
	Box,
	Input,
	InputRightElement,
	Button,
	Heading,
	Divider,
	Text,
	Image,
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
import { loginFormReducer, initialFormState } from './reducers';
import { btnStyles, solidPrimaryButtonStyle } from '../../utils';
import { loginBtnClicked } from '../authenticationSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
export const Login = () => {
	const [formState, formDispatch] = useReducer(
		loginFormReducer,
		initialFormState,
	);

	const dispatch = useDispatch();

	const onFocusClearError = (action) => {
		formDispatch({ type: action.type, payload: '' });
	};

	const loginUser = async () => {
		formDispatch({ type: 'RESET_ERRORS' });
		if (checkLoginFormValidity(formState, formDispatch)) {
			dispatch(
				loginBtnClicked({
					email: formState.email,
					password: formState.password,
				}),
			);
		}
	};

	return (
		<>
			<Box {...formWrapperStyle}>
				<Heading {...headingStyle}>LOGIN</Heading>
				<Box position='relative'>
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

						<Box mt='2rem' w='100%'>
							<Button
								w='100%'
								onClick={() => {
									loginUser();
								}}
								{...btnStyles}
								{...solidPrimaryButtonStyle}>
								Login
							</Button>
						</Box>

						<DividerWithTextOverlay />
						<LoginWithUandIOption />
					</Box>
				</Box>
			</Box>
			<SignUpOption />
		</>
	);
};

export const DividerWithTextOverlay = () => {
	return (
		<Box position='relative'>
			<Divider mt='2rem' borderColor='gray.500' />
			<Text
				fontSize='0.8rem'
				color='gray.500'
				position='absolute'
				top='-1.25rem'
				left='calc(50% - 1.6875rem)'
				bg='white'
				p='0.5rem 1rem'>
				OR
			</Text>
		</Box>
	);
};

export const LoginWithUandIOption = () => {
	return (
		<Box mt='2rem' w='100%'>
			<Box
				as='button'
				w='100%'
				color='pink.800'
				fontWeight='500'
				fontSize='0.9rem'>
				<Image
					d='inline-block'
					src={logo}
					ht='1.5rem'
					w='1.5rem'
					mr='0.25rem'
				/>
				Log in with U&I
			</Box>
		</Box>
	);
};

export const SignUpOption = () => {
	return (
		<Box {...formWrapperStyle}>
			<Box textAlign='center'>
				Don't have an account?
				<Text as='button' color='pink.700' fontWeight='500'>
					<Link className='link-text' to='/signup'>
						Sign up
					</Link>
				</Text>
			</Box>
		</Box>
	);
};
