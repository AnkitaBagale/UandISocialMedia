import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils';
import { setAuthorizationHeader } from './utils/setAuthorizationHeader';
import { getLocalStorage, setLocalStorage } from './utils/setLocalStorage';

export const loginBtnClicked = createAsyncThunk(
	'authenticate/loginBtnClicked',
	async ({ email, password }) => {
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
	reducers: {
		logoutUser: (state) => {
			Object.assign(state.authentication, {
				token: '',
				name: '',
				userName: '',
				userId: '',
			});
			localStorage?.removeItem('session');
		},
	},
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

export const { logoutUser } = authenticationSlice.actions;
export default authenticationSlice.reducer;
export const useAuthentication = () =>
	useSelector((state) => state.authentication.authentication);
