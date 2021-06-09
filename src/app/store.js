import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice';
import usersReducer from '../features/users/usersSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';

export const store = configureStore({
	reducer: {
		posts: postReducer,
		authentication: authenticationReducer,
		users: usersReducer,
	},
});
