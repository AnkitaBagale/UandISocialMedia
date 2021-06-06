import { createSlice } from '@reduxjs/toolkit';

export const loadUsers = createAsyncThunk('posts/loadUsers', async () => {
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
