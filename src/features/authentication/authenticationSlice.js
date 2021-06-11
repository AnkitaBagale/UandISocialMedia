import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils';
import { setAuthorizationHeader } from './utils/setAuthorizationHeader';
import { getLocalStorage, setLocalStorage } from './utils/setLocalStorage';

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

export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState: {
		authentication: getLocalStorage(),
		signUp: {
			signUpStatus: 'idle',
			signUpError: '',
		},
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
			console.log({ error: action });
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
	},
});

export const { logoutUser } = authenticationSlice.actions;
export default authenticationSlice.reducer;
export const useAuthentication = () =>
	useSelector((state) => state.authentication);
