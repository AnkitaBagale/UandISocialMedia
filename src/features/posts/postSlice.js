import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { posts } from '../../database/database';

export const postSlice = createSlice({
	name: 'posts',
	initialState: { posts: posts },
	reducers: {
		createPostButtonClicked: (state, action) => {
			state.posts.push(action.payload.post);
		},
		likeButtonClicked: (state, action) => {
			const index = state.posts.findIndex(
				(post) => post._id === action.payload.postId,
			);

			const currentLikedState = state.posts[index].likedByViewer;
			state.posts[index].likedByViewer = !currentLikedState;
			state.posts[index].totalLikes = currentLikedState
				? state.posts[index].totalLikes - 1
				: state.posts[index].totalLikes + 1;
		},
		saveButtonClicked: (state, action) => {
			const index = state.posts.findIndex(
				(post) => post._id === action.payload.postId,
			);
			state.posts[index].savedByViewer = !state.posts[index].savedByViewer;
		},
	},
});

export const { createPostButtonClicked, likeButtonClicked, saveButtonClicked } =
	postSlice.actions;

export default postSlice.reducer;

export const usePostSelector = () => useSelector((state) => state.posts.posts);
