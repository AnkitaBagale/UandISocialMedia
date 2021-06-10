import React, { useEffect } from 'react';
import { Routes } from 'react-router';
import { useDispatch } from 'react-redux';
import { loadUsers } from './features/users/usersSlice';

import { useAuthentication } from './features/authentication/authenticationSlice';
import {
	Posts,
	Footer,
	Nav,
	Profile,
	Login,
	PrivateRoute,
	PublicRoute,
	setAuthorizationHeader,
	setAxiosErrorHandler,
	SignUp,
} from './features';
import './App.css';
import { UandISignUp } from './features/authentication/UandISignUp/UandISignUp';

function App() {
	const {
		authentication: { token },
	} = useAuthentication();
	const dispatch = useDispatch();

	if (token) {
		setAuthorizationHeader(token);
	}

	useEffect(() => {
		setAxiosErrorHandler(dispatch);
	}, [dispatch, token]);

	useEffect(() => {
		if (token) {
			dispatch(loadUsers());
		}
	}, [dispatch, token]);

	return (
		<div>
			<Nav />
			<div className='App'>
				<Routes>
					<PrivateRoute path='/' element={<Posts />} />
					<PrivateRoute path='/profile/:userName' element={<Profile />} />

					<PublicRoute path='/login' element={<Login />} />
					<PublicRoute path='/signup' element={<SignUp />} />
					<PublicRoute path='/u-and-i-signup' element={<UandISignUp />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
