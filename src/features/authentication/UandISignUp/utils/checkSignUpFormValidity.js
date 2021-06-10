export const checkSignUpFormValidity = (formState, formDispatch) => {
	let errorFlag = true;
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
	return errorFlag;
};
