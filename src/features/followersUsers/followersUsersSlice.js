import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils';

export const loadFollowers = createAsyncThunk(
	'profile/loadFollowers',
	async (userName) => {
		const {
			data: { response },
		} = await axios.get(`${API_URL}/social-profiles/${userName}/followers`);
		return response;
	},
);

export const followBtnClickedInFollowersList = createAsyncThunk(
	'profile/followBtnClickedInFollowersList',
	async ({ userName }) => {
		const {
			data: { isAdded },
		} = await axios.post(`${API_URL}/social-profiles/${userName}/followers`);
		return { isAdded, userName };
	},
);

const followersUsersSlice = createSlice({
	name: 'followersUsers',
	initialState: {
		followersDetails: [],
	},
	reducers: {
		resetFollowers: (state) => {
			state.followersDetails = [];
		},
	},
	extraReducers: {
		[loadFollowers.fulfilled]: (state, action) => {
			if (action.payload) {
				state.followersDetails = action.payload;
			}
		},
		[loadFollowers.rejected]: (state, action) => {
			console.log(action.error.message);
		},
		[followBtnClickedInFollowersList.fulfilled]: (state, action) => {
			const index = state.followersDetails.findIndex(
				(user) => user.userName === action.payload.userName,
			);

			if (index !== -1) {
				state.followersDetails[index].followedByViewer = action.payload.isAdded;
			}
		},
	},
});

export const { resetFollowers } = followersUsersSlice.actions;
export default followersUsersSlice.reducer;
export const useFollowers = () => useSelector((state) => state.followers);
