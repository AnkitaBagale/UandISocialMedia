import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils';
import { setAuthorizationHeader } from './utils/setAuthorizationHeader';
import { getLocalStorage, setLocalStorage } from './utils/setLocalStorage';

export const loginBtnClicked = createAsyncThunk(
	'authenticate/loginBtnClicked',
	async ({ email, password }) => {
		console.log('i was in thunk');
		const {
			data: { response },
		} = await axios({
			method: 'POST',
			url: `${API_URL}/social-profiles/login`,
			headers: { email: email, password: password },
		});
		return { userDetails: response };
	},
);
export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState: {
		authentication: getLocalStorage(),
	},
	reducers: {},
	extraReducers: {
		[loginBtnClicked.fulfilled]: (state, action) => {
			Object.assign(state.authentication, { ...action.payload.userDetails });
			setLocalStorage(action.payload.userDetails);
			setAuthorizationHeader(action.payload.userDetails.token);
		},
		[loginBtnClicked.rejected]: (state, action) => {
			console.log(action.error);
		},
	},
});

export default authenticationSlice.reducer;
export const useAuthentication = () =>
	useSelector((state) => state.authentication.authentication);
