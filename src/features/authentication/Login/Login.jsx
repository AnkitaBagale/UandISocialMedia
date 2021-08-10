import { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
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
	SimpleGrid,
	Img,
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
	logoTitleStyle,
	AndSymbolStyle,
	logoTaglineStyle,
} from '../../styles';
import { checkLoginFormValidity } from './utils';
import { loginFormReducer, initialFormState } from './reducers';
import { loginBtnClicked } from '../authenticationSlice';
import logo from '../../../assets/logo.png';
import promo from '../../../assets/promo.gif';

export const Login = () => {
	const [formState, formDispatch] = useReducer(
		loginFormReducer,
		initialFormState,
	);

	const dispatch = useDispatch();

	const onFocusClearError = (action) => {
		formDispatch({ type: action.type, payload: '' });
	};

	const loginUser = async (formState) => {
		formDispatch({ type: 'RESET_ERRORS' });
		if (checkLoginFormValidity(formState, formDispatch)) {
			formDispatch({ type: 'SET_STATUS', payload: 'loading' });
			const dispatchResponse = await dispatch(
				loginBtnClicked({
					email: formState.email,
					password: formState.password,
				}),
			);

			if (dispatchResponse.meta.requestStatus === 'rejected') {
				formDispatch({
					type: 'SET_API_ERROR',
					payload: dispatchResponse.payload,
				});
			}
		}
	};

	return (
		<SimpleGrid columns={[1, 1, 2]}>
			<Img display={{ base: 'none', md: 'block' }} src={promo} />
			<Box padding='0rem 1.5rem 2rem'>
				<Box {...formWrapperStyle} boxShadow='none' mb={0}>
					<Heading {...headingStyle} fontSize='x-large'>
						<Box as='span' {...logoTitleStyle}>
							U
							<Box as='span' {...AndSymbolStyle}>
								&
							</Box>
							I
						</Box>
						<Box {...logoTaglineStyle} display='block'>
							LET'S TALK
						</Box>
					</Heading>

					<Box position='relative'>
						<Box>
							{formState.status === 'loading' && (
								<Box {...overlayBoxStyle}>
									<Loader
										type='TailSpin'
										color='#ff3f6c'
										height={80}
										width={80}
									/>
								</Box>
							)}
							<FormControl
								id='email'
								isRequired
								{...inputWrapperStyle}
								isInvalid={!!formState.emailError}>
								<Box w='100%'>
									<Input
										type='email'
										{...InputStyle}
										placeholder='Enter your email here'
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
								variant='blockOutline'
								mt='2rem'
								onClick={() => {
									formDispatch({
										type: 'SET_PASSWORD',
										payload: 'test@test.com',
									});
									formDispatch({
										type: 'SET_EMAIL',
										payload: 'Test1234',
									});
									loginUser({ email: 'test@test.com', password: 'Test1234' });
								}}>
								Login with Test Credentials
							</Button>

							<Button
								variant='blockPrimary'
								mt='1rem'
								onClick={() => {
									loginUser(formState);
								}}>
								Login
							</Button>
							{formState.status === 'failure' && (
								<Box {...apiErrorStyle}>
									<WarningTwoIcon {...apiErrorSymbolStyle} />
									{formState.apiError}
								</Box>
							)}

							<DividerWithTextOverlay />
							<LoginWithUandIOption />
						</Box>
					</Box>
				</Box>
				<SignUpOption />
			</Box>
		</SimpleGrid>
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
		<Box mt='2rem' w='100%' textAlign='center'>
			<Link to='/u-and-i-signup'>
				<Box
					as='span'
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
			</Link>
		</Box>
	);
};

export const SignUpOption = () => {
	return (
		<Box {...formWrapperStyle} boxShadow='none' pt={0} mt={0}>
			<Box textAlign='center'>
				Don't have an account?
				<Text as='button' color='pink.800' fontWeight='500'>
					<Link className='link-text' to='/signup'>
						Sign up
					</Link>
				</Text>
			</Box>
		</Box>
	);
};
