export const initialFormState = {
	email: '',
	password: '',
	showPassword: false,
	status: '',
	emailError: '',
	passwordError: '',
	apiError: '',
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
		case 'SET_STATUS': {
			return { ...formState, status: action.payload };
		}
		case 'SET_EMAIL_ERROR': {
			return { ...formState, emailError: action.payload };
		}
		case 'SET_PASSWORD_ERROR': {
			return { ...formState, passwordError: action.payload };
		}
		case 'RESET_ERRORS': {
			return { ...formState, emailError: '', passwordError: '', apiError: '' };
		}
		case 'SET_API_ERROR': {
			return { ...formState, apiError: action.payload, status: 'FAILURE' };
		}
		default:
			throw Error('Invalid Action');
	}
};
