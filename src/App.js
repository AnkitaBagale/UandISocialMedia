import React, { useEffect } from 'react';
import { Routes, useLocation } from 'react-router';
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
import { Box } from '@chakra-ui/layout';

import { UandISignUp } from './features/authentication/UandISignUp/UandISignUp';
import {
	loadPosts,
	storeSharedPost,
	usePostSelector,
} from './features/posts/postSlice';

function App() {
	const {
		authentication: { token },
	} = useAuthentication();
	const dispatch = useDispatch();
	const { status, sharedPost } = usePostSelector();
	const sharedQuery = new URLSearchParams(useLocation().search);

	if (token) {
		setAuthorizationHeader(token);
	}

	useEffect(() => {
		dispatch(storeSharedPost({ title: sharedQuery.get('title') }));
	}, [dispatch]);

	useEffect(() => {
		setAxiosErrorHandler(dispatch);
	}, [dispatch, token]);

	useEffect(() => {
		if (token) {
			dispatch(loadUsers());
			dispatch(loadPosts());
		}
	}, [dispatch, token]);

	console.log({ sharedPost });

	return (
		<Box>
			<Nav />
			<Box padding='2rem 1.5rem' minHeight='70vh'>
				<Routes>
					<PrivateRoute path='/' element={<Posts />} />
					<PrivateRoute path='/profile/:userName' element={<Profile />} />

					<PublicRoute path='/login' element={<Login />} />
					<PublicRoute path='/signup' element={<SignUp />} />
					<PublicRoute path='/u-and-i-signup' element={<UandISignUp />} />
				</Routes>
			</Box>
			<Footer />
		</Box>
	);
}

export default App;
