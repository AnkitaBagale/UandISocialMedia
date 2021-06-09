export const initialFormState = {
	email: '',
	userName: '',
	firstName: '',
	lastName: '',
	password: '',
	showPassword: false,
	emailError: '',
	userNameError: '',
	firstNameError: '',
	lastNameError: '',
	passwordError: '',
};

export const signupFormReducer = (formState, action) => {
	switch (action.type) {
		case 'SET_EMAIL': {
			return { ...formState, email: action.payload };
		}
		case 'SET_USERNAME': {
			return { ...formState, userName: action.payload };
		}
		case 'SET_FIRST_NAME': {
			return { ...formState, firstName: action.payload };
		}
		case 'SET_LAST_NAME': {
			return { ...formState, lastName: action.payload };
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
		case 'SET_USERNAME_ERROR': {
			return { ...formState, userNameError: action.payload };
		}
		case 'SET_FIRST_NAME_ERROR': {
			return { ...formState, firstNameError: action.payload };
		}
		case 'SET_LAST_NAME_ERROR': {
			return { ...formState, lastNameError: action.payload };
		}
		case 'SET_PASSWORD_ERROR': {
			return { ...formState, passwordError: action.payload };
		}
		case 'RESET_ERRORS': {
			return {
				...formState,
				emailError: '',
				userNameError: '',
				firstNameError: '',
				lastNameError: '',
				passwordError: '',
			};
		}

		default:
			throw Error('Invalid Action');
	}
};
