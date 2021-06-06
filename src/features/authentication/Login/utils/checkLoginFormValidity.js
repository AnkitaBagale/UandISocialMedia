export const checkLoginFormValidity = (formState, formDispatch) => {
	let errorFlag = true;

	if (formState.email === '' || !/^.+@.+\.com$/.test(formState.email)) {
		formDispatch({
			type: 'SET_EMAIL_ERROR',
			payload: 'Please enter valid email id',
		});
		errorFlag = false;
	}
	if (formState.password === '') {
		formDispatch({
			type: 'SET_PASSWORD_ERROR',
			payload: 'Please enter password',
		});
		errorFlag = false;
	}

	return errorFlag;
};
