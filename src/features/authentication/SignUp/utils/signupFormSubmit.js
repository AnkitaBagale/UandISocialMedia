import { signupBtnClicked } from '../../authenticationSlice';
import { checkSignUpFormValidity } from './checkSignUpFormValidity';

export const signupFormSubmit = async ({
	formState,
	formDispatch,
	dispatch,
}) => {
	formDispatch({ type: 'RESET_ERRORS' });

	if (checkSignUpFormValidity(formState, formDispatch)) {
		const signUpDetails = {
			firstname: formState.firstName,
			lastname: formState.lastName,
			email: formState.email,
			userName: formState.userName,
			password: formState.password,
		};
		dispatch(signupBtnClicked(signUpDetails));
	}
};
