import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { logoutUser } from '../authentication/authenticationSlice';
import { followBtnClicked } from '../followersUsers/followersUsersSlice';
import {
	deletePostBtnClicked,
	likeButtonClicked,
} from '../profile/profileSlice';
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
		sharedPost: null,
		status: 'idle',
		usersWhoLikedPost: [],
		showLikesContainer: false,
	},
	reducers: {
		closeBtnInLikesContainerClicked: (state, action) => {
			state.showLikesContainer = false;
			state.usersWhoLikedPost = [];
		},
		storeSharedPost: (state, action) => {
			state.sharedPost = action.payload;
		},
	},
	extraReducers: {
		[logoutUser]: (state, action) => {
			state.posts = [];
			state.status = 'idle';
			state.usersWhoLikedPost = [];
			state.showLikesContainer = false;
		},
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
				action.payload.isLiked
					? state.posts[index].totalLikes++
					: state.posts[index].totalLikes--;
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
		[followBtnClicked.fulfilled]: (state, action) => {
			if (action.payload.isAdded) {
				state.posts.push(...action.payload.posts);
				state.posts.sort((post1, post2) => post2.createdAt - post1.createdAt);
			} else {
				state.posts = state.posts.filter(
					({ _id }) => !action.payload.posts.find((post) => post._id === _id),
				);
			}
		},
		[deletePostBtnClicked.fulfilled]: (state, action) => {
			const index = state.posts.findIndex(
				(post) => post._id === action.payload,
			);
			if (index !== -1) {
				state.posts.splice(index, 1);
			}
		},
	},
});

export default postSlice.reducer;
export const { closeBtnInLikesContainerClicked, storeSharedPost } =
	postSlice.actions;
export const usePostSelector = () => useSelector((state) => state.posts);
