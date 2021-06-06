import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';

export const store = configureStore({
	reducer: {
		posts: postReducer,
		authentication: authenticationReducer,
	},
});
