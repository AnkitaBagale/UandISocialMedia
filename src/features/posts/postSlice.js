import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils';

export const loadPosts = createAsyncThunk('posts/loadPosts', async () => {
	const {
		data: { response },
	} = await axios.get(`${API_URL}/posts`);
	return response;
});

export const createPostBtnClicked = createAsyncThunk(
	'posts/createPostBtnClicked',
	async ({ post }) => {
		const {
			data: { response },
		} = await axios.post(`${API_URL}/posts`, {
			...post,
		});
		return response;
	},
);

export const likeButtonClicked = createAsyncThunk(
	'posts/likeButtonClicked',
	async ({ postId }) => {
		const {
			data: { isLiked },
		} = await axios.post(`${API_URL}/posts/${postId}/likedby`);
		return { postId, isLiked };
	},
);

export const userLikesClicked = createAsyncThunk(
	'posts/userLikesClicked',
	async ({ postId }) => {
		const {
			data: { response },
		} = await axios.get(`${API_URL}/posts/${postId}/likedby`);
		return response;
	},
);
export const postSlice = createSlice({
	name: 'posts',
	initialState: {
		posts: [],
		status: 'idle',
		usersWhoLikedPost: [],
		showLikesContainer: false,
	},
	reducers: {
		closeBtnInLikesContainerClicked: (state, action) => {
			state.showLikesContainer = false;
			state.usersWhoLikedPost = [];
		},
		followBtnClickedByViewer: (state, action) => {
			if (action.payload.followedByViewer) {
				state.posts.push(...action.payload.posts);
				state.posts.sort((post1, post2) => post2.createdAt - post1.createdAt);
			} else {
				state.posts = state.posts.filter(
					({ _id }) =>
						action.payload.posts.findIndex((post) => post._id === _id) === -1,
				);
			}
		},
	},
	extraReducers: {
		[loadPosts.fulfilled]: (state, action) => {
			state.posts = action.payload;
			state.status = 'succeeded';
		},
		[loadPosts.rejected]: (state, action) => {
			console.log(action.error.message);
			state.status = 'failed';
		},
		[createPostBtnClicked.fulfilled]: (state, action) => {
			state.posts.unshift(action.payload);
		},
		[createPostBtnClicked.rejected]: (state, action) => {
			console.log(action.error.message);
		},
		[likeButtonClicked.fulfilled]: (state, action) => {
			const index = state.posts.findIndex(
				(post) => post._id === action.payload.postId,
			);
			if (index !== -1) {
				state.posts[index].likedByViewer = action.payload.isLiked;
				state.posts[index].totalLikes = action.payload.isLiked
					? state.posts[index].totalLikes + 1
					: state.posts[index].totalLikes - 1;
			}
		},
		[likeButtonClicked.rejected]: (state, action) => {
			console.log(action.error.message);
		},
		[userLikesClicked.fulfilled]: (state, action) => {
			state.showLikesContainer = true;
			state.usersWhoLikedPost = action.payload;
		},
		[userLikesClicked.rejected]: (state, action) => {
			console.log(action.error.message);
		},
	},
});

export default postSlice.reducer;
export const { closeBtnInLikesContainerClicked, followBtnClickedByViewer } =
	postSlice.actions;
export const usePostSelector = () => useSelector((state) => state.posts);
