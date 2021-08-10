export const setLocalStorage = (sessionDetails) => {
	localStorage?.setItem('session', JSON.stringify(sessionDetails));
};

export const getLocalStorage = () => {
	const defaultValues = {
		token: '',
		name: '',
		userName: '',
		userId: '',
		avatar: '',
	};
	return JSON.parse(localStorage.getItem('session')) || defaultValues;
};

export const updateSessionDetailsInLocalStorage = (avatar) => {
	const userDetails = JSON.parse(localStorage?.getItem('session'));
	userDetails.avatar = avatar;
	localStorage?.setItem('session', JSON.stringify(userDetails));
};
