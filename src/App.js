import React, { useEffect } from 'react';
import { Routes, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { loadUsers } from './features/users/usersSlice';
import { LikesContainer } from './features/posts/LikesContainer';

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
	const sharedQuery = new URLSearchParams(useLocation().search);
	const sharedPostTitle = sharedQuery.get('title');
	const { showLikesContainer } = usePostSelector();

	if (token) {
		setAuthorizationHeader(token);
	}

	useEffect(() => {
		if (sharedPostTitle) {
			dispatch(storeSharedPost({ title: sharedPostTitle }));
		}
	}, [dispatch, sharedPostTitle]);

	useEffect(() => {
		setAxiosErrorHandler(dispatch);
	}, [dispatch, token]);

	useEffect(() => {
		if (token) {
			dispatch(loadUsers());
			dispatch(loadPosts());
		}
	}, [dispatch, token]);

	return (
		<Box>
			<Nav />
			<Box padding='2rem 1.5rem' minHeight='70vh' mt='5rem'>
				{showLikesContainer && <LikesContainer />}
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
