export const usernameFormState = {
	userName: '',
	userNameError: '',
	status: '',
};

export const signupFormReducer = (formState, action) => {
	switch (action.type) {
		case 'SET_USERNAME': {
			return { ...formState, userName: action.payload };
		}

		case 'SET_USERNAME_ERROR': {
			return { ...formState, userNameError: action.payload, status: 'failure' };
		}

		case 'SET_STATUS': {
			return { ...formState, status: action.payload };
		}
		case 'RESET_ERRORS': {
			return {
				...formState,
				userNameError: '',
			};
		}

		default:
			throw Error('Invalid Action');
	}
};
