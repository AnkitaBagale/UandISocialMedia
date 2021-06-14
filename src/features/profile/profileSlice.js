import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
	followBtnClickedInFollowersList,
	removeFromFollowersBtnClicked,
} from '../followersUsers/followersUsersSlice';
import { followBtnClickedInFollowingList } from '../followingUsers/followingUsersSlice';

import { API_URL } from '../utils';

export const loadUserProfile = createAsyncThunk(
	'profile/loadUserProfile',
	async (userName) => {
		const {
			data: { response },
		} = await axios.get(`${API_URL}/social-profiles/${userName}`);

		return response;
	},
);

export const loadUserPosts = createAsyncThunk(
	'profile/loadUserPosts',
	async (userName) => {
		const {
			data: { response },
		} = await axios.get(`${API_URL}/posts/${userName}`);

		return response;
	},
);

export const loadFollowing = createAsyncThunk(
	'profile/loadFollowing',
	async (userName) => {
		const {
			data: { response },
		} = await axios.get(`${API_URL}/social-profiles/${userName}/following`);
		return response;
	},
);

export const updateProfileBtnClicked = createAsyncThunk(
	'profile/updateProfileBtnClicked',
	async ({ userName, inputBio, inputLink }) => {
		const {
			data: { response },
		} = await axios.post(`${API_URL}/social-profiles/${userName}`, {
			bio: inputBio,
			link: inputLink,
		});
		return response;
	},
);

export const followBtnClicked = createAsyncThunk(
	'profile/followBtnClicked',
	async ({ userName, posts = [] }) => {
		const {
			data: { isAdded },
		} = await axios.post(`${API_URL}/social-profiles/${userName}/followers`);
		return { isAdded, posts };
	},
);

export const likeButtonClicked = createAsyncThunk(
	'posts/likeButtonClicked',
	async ({ postId, updateProfile = false }) => {
		const {
			data: { isLiked },
		} = await axios.post(`${API_URL}/posts/${postId}/likedby`);
		return { postId, isLiked, updateProfile };
	},
);

const profileSlice = createSlice({
	name: 'profile',
	initialState: {
		profileDetails: null,
		postsDetails: [],
	},
	reducers: {
		resetProfile: (state, action) => {
			state.profileDetails = null;
			state.postsDetails = [];
		},
	},
	extraReducers: {
		[loadUserProfile.fulfilled]: (state, action) => {
			state.profileDetails = action.payload;
		},
		[loadUserProfile.rejected]: (state, action) => {
			console.log(action.error.message);
		},
		[loadUserPosts.fulfilled]: (state, action) => {
			if (action.payload) {
				state.postsDetails = action.payload;
			}
		},
		[loadUserPosts.rejected]: (state, action) => {
			console.log(action.error.message);
		},

		[updateProfileBtnClicked.fulfilled]: (state, action) => {
			state.profileDetails.bio = action.payload.bio;
			state.profileDetails.link = action.payload.link;
		},
		[updateProfileBtnClicked.rejected]: (state, action) => {
			console.log(action.error.message);
		},
		[followBtnClicked.fulfilled]: (state, action) => {
			action.payload.isAdded
				? state.profileDetails.count.followers++
				: state.profileDetails.count.followers--;

			state.profileDetails.followedByViewer = action.payload.isAdded;
		},
		[followBtnClicked.rejected]: (state, action) => {
			console.log(action.error.message);
		},

		[likeButtonClicked.fulfilled]: (state, action) => {
			if (action.payload.updateProfile) {
				const index = state.postsDetails.findIndex(
					(post) => post._id === action.payload.postId,
				);
				if (index !== -1) {
					state.postsDetails[index].likedByViewer = action.payload.isLiked;
					action.payload.isLiked
						? state.postsDetails[index].totalLikes++
						: state.postsDetails[index].totalLikes--;
				}
			}
		},
		[likeButtonClicked.rejected]: (state, action) => {
			console.log(action.error.message);
		},

		[followBtnClickedInFollowersList.fulfilled]: (state, action) => {
			if (action.payload.viewerName === state.profileDetails.userName) {
				action.payload.isAdded
					? state.profileDetails.count.following++
					: state.profileDetails.count.following--;
			}
		},
		[followBtnClickedInFollowingList.fulfilled]: (state, action) => {
			console.log(action.payload.viewerName, state.profileDetails.userName);
			if (action.payload.viewerName === state.profileDetails.userName) {
				action.payload.isAdded
					? state.profileDetails.count.following++
					: state.profileDetails.count.following--;

				console.log(current(state));
			}
		},
		[removeFromFollowersBtnClicked.fulfilled]: (state, action) => {
			state.profileDetails.count.followers--;
		},
		[removeFromFollowersBtnClicked.rejected]: (state, action) => {
			console.log(action.error.message);
		},
	},
});

export default profileSlice.reducer;

export const { resetProfile } = profileSlice.actions;

export const useProfile = () => useSelector((state) => state.profile);
