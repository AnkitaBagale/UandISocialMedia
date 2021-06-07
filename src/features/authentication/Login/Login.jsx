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
	eyeIconButtonWrapperStyle,
	InputStyle,
	eyeIconButtonStyle,
	eyeIconStyle,
	headingStyle,
} from '../utils';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { checkLoginFormValidity } from './utils';
import { loginFormReducer, initialFormState } from './reducers';
import { btnStyles, solidPrimaryButtonStyle } from '../../utils';
import { loginBtnClicked } from '../authenticationSlice';
import { useDispatch } from 'react-redux';

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
								<InputRightElement {...eyeIconButtonWrapperStyle}>
									<Button
										onClick={() => formDispatch({ type: 'SHOW_PASSWORD' })}
										{...eyeIconButtonStyle}>
										{formState.showPassword ? (
											<ViewIcon {...eyeIconStyle} />
										) : (
											<ViewOffIcon {...eyeIconStyle} />
										)}
									</Button>
								</InputRightElement>
								<FormErrorMessage>{formState.passwordError}</FormErrorMessage>
							</Box>
						</FormControl>

						<Box mt='2rem'>
							<Button
								onClick={() => {
									loginUser();
								}}
								{...btnStyles}
								{...solidPrimaryButtonStyle}>
								Login
							</Button>
						</Box>
					</Box>
					{/* <p>
						sign up here <Link to='/signup'>Signup</Link>
					</p> */}
					{/* {formState.status === 'LOADING' && (
						<Box {...overlayBoxStyle}>
							<Loader type='TailSpin' color='#ff3f6c' height={80} width={80} />
						</Box>
					)} */}
				</Box>
			</Box>
		</>
	);
};
