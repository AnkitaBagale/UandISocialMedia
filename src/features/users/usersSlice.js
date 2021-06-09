import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils';

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
	const {
		data: { response },
	} = await axios.get(`${API_URL}/social-profiles`);
	return response;
});

export const usersSlice = createSlice({
	name: 'users',
	initialState: {
		users: [],
	},
	reducers: {},
	extraReducers: {
		[loadUsers.fulfilled]: (state, action) => {
			state.users = action.payload;
		},
		[loadUsers.rejected]: (state, action) => {
			console.log(action.error.message);
		},
	},
});

export const useUsers = () => useSelector((state) => state.users);
export default usersSlice.reducer;
