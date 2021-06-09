import axios from 'axios';
import { logoutUser } from '../authenticationSlice';

export const setAxiosErrorHandler = (dispatch) => {
	const UNAUTHORIZED = 401;
	axios.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error?.response?.status === UNAUTHORIZED) {
				dispatch(logoutUser());
			}
			return Promise.reject(error);
		},
	);
};
