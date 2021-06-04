import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice';

export const store = configureStore({
	reducer: {
		posts: postReducer,
	},
});
