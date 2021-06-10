export const initialFormState = {
	email: '',
	password: '',
	showPassword: false,
	emailError: '',
	passwordError: '',
};

export const loginFormReducer = (formState, action) => {
	switch (action.type) {
		case 'SET_EMAIL': {
			return { ...formState, email: action.payload };
		}
		case 'SET_PASSWORD': {
			return { ...formState, password: action.payload };
		}
		case 'SHOW_PASSWORD': {
			return { ...formState, showPassword: !formState.showPassword };
		}

		case 'SET_EMAIL_ERROR': {
			return { ...formState, emailError: action.payload };
		}
		case 'SET_PASSWORD_ERROR': {
			return { ...formState, passwordError: action.payload };
		}
		case 'RESET_ERRORS': {
			return { ...formState, emailError: '', passwordError: '' };
		}

		default:
			throw Error('Invalid Action');
	}
};
