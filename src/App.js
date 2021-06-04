import React from 'react';
import './App.css';
import { Posts } from './features/posts/Posts';
import { Footer } from './features/footer/Footer';
import { Nav } from './features/nav/Nav';
import { Profile } from './features/users/components/Profile';
import { Route, Routes } from 'react-router';

function App() {
	return (
		<div>
			<Nav />
			<div className='App'>
				<Routes>
					<Route path='/' element={<Posts />} />
					<Route path='/profile/:id' element={<Profile />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
