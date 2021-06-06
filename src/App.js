import React, { useEffect } from 'react';
import './App.css';
import { Posts } from './features/posts/Posts';
import { Footer } from './features/footer/Footer';
import { Nav } from './features/nav/Nav';
import { Profile } from './features/users/components/Profile';
import { Routes, useNavigate } from 'react-router';
import { Login } from './features/authentication';
import { PrivateRoute } from './features/authentication/PrivateRoute';
import { PublicRoute } from './features/authentication/PublicRoute';
import { useAuthentication } from './features/authentication/authenticationSlice';
import { setAuthorizationHeader } from './features/authentication/utils/setAuthorizationHeader';
import { setAxiosErrorHandler } from './features/authentication/utils/setAxiosErrorHandler';

function App() {
	const { token } = useAuthentication();
	const navigate = useNavigate();
	if (token) {
		setAuthorizationHeader(token);
	}
	useEffect(() => {
		setAxiosErrorHandler(navigate);
	}, [setAxiosErrorHandler]);
	return (
		<div>
			<Nav />
			<div className='App'>
				<Routes>
					<PrivateRoute path='/' element={<Posts />} />
					<PrivateRoute path='/profile/:userName' element={<Profile />} />

					<PublicRoute path='/login' element={<Login />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
