export const checkSignUpFormValidity = (formState, formDispatch) => {
	let errorFlag = true;

	if (
		formState.firstName === '' ||
		!/^[a-zA-Z]+(\s*\w*)*$/.test(formState.firstName)
	) {
		formDispatch({
			type: 'SET_FIRST_NAME_ERROR',
			payload: 'Please enter valid first name',
		});
		errorFlag = false;
	}
	if (
		formState.lastName === '' ||
		!/^[a-zA-Z]+(\s*\w*)*$/.test(formState.lastName)
	) {
		formDispatch({
			type: 'SET_LAST_NAME_ERROR',
			payload: 'Please enter valid last name',
		});
		errorFlag = false;
	}
	if (formState.email === '' || !/^.+@.+\.com$/.test(formState.email)) {
		formDispatch({
			type: 'SET_EMAIL_ERROR',
			payload: 'Please enter valid email id',
		});
		errorFlag = false;
	}
	if (
		formState.userName === '' ||
		!/^[a-zA-Z]+(\s*\w*)*$/.test(formState.userName)
	) {
		formDispatch({
			type: 'SET_USERNAME_ERROR',
			payload: 'Please enter user name',
		});
		errorFlag = false;
	}
	if (
		formState.password === '' ||
		!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(
			formState.password,
		)
	) {
		formDispatch({
			type: 'SET_PASSWORD_ERROR',
			payload:
				'Password length should contain minimum 8 characters (at least one capital, small letter and number)',
		});
		errorFlag = false;
	}

	return errorFlag;
};
