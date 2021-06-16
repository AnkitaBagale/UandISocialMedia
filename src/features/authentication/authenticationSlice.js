import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { updateProfileBtnClicked } from '../profile/profileSlice';
import { API_URL } from '../utils';
import { setAuthorizationHeader } from './utils/setAuthorizationHeader';
import {
	getLocalStorage,
	setLocalStorage,
	updateSessionDetailsInLocalStorage,
} from './utils/setLocalStorage';

export const loginBtnClicked = createAsyncThunk(
	'authenticate/loginBtnClicked',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const {
				data: { response },
			} = await axios({
				method: 'POST',
				url: `${API_URL}/social-profiles/login`,
				headers: { email, password },
			});
			return { userDetails: response };
		} catch (error) {
			const message = error.response.data.message;
			return rejectWithValue(message);
		}
	},
);

export const signupBtnClicked = createAsyncThunk(
	'authenticate/signupBtnClicked',
	async (userDetails, { rejectWithValue }) => {
		try {
			const {
				data: { response },
			} = await axios({
				method: 'POST',
				url: `${API_URL}/social-profiles/signup`,
				data: { ...userDetails },
			});
			return response;
		} catch (error) {
			const message = error.response.data.message;
			return rejectWithValue(message);
		}
	},
);

export const loadNotifications = createAsyncThunk(
	'authenticate/loadNotifications',
	async () => {
		const {
			data: { response },
		} = await axios({
			method: 'GET',
			url: `${API_URL}/social-profiles/notifications`,
		});
		return response;
	},
);

export const logoutUser = createAction('authentication/logoutUser');

export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState: {
		authentication: getLocalStorage(),
		signUp: {
			signUpStatus: 'idle',
			signUpError: '',
		},
		notifications: [],
	},
	reducers: {},
	extraReducers: {
		[logoutUser]: (state) => {
			Object.assign(state.authentication, {
				token: '',
				name: '',
				userName: '',
				userId: '',
				avatar: '',
			});
			state.notifications = [];
			localStorage?.removeItem('session');
		},
		[loginBtnClicked.fulfilled]: (state, action) => {
			Object.assign(state.authentication, { ...action.payload.userDetails });
			setLocalStorage(action.payload.userDetails);
			setAuthorizationHeader(action.payload.userDetails.token);
		},
		[loginBtnClicked.rejected]: (state, action) => {
			console.log(action.error.message);
		},
		[signupBtnClicked.pending]: (state, action) => {
			state.signUp.signUpStatus = 'loading';
		},

		[signupBtnClicked.fulfilled]: (state, action) => {
			state.signUp.signUpStatus = 'success';
		},
		[signupBtnClicked.rejected]: (state, action) => {
			state.signUp.signUpStatus = 'failure';
			state.signUp.signUpError = action.payload;
		},
		[updateProfileBtnClicked.fulfilled]: (state, action) => {
			state.authentication.avatar = action.payload.avatar;
			updateSessionDetailsInLocalStorage(action.payload.avatar);
		},
		[loadNotifications.fulfilled]: (state, action) => {
			state.notifications = action.payload;
		},
		[loadNotifications.rejected]: (state, action) => {
			console.log(action.error.message);
		},
	},
});

export default authenticationSlice.reducer;
export const useAuthentication = () =>
	useSelector((state) => state.authentication);
