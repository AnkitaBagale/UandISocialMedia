export const setLocalStorage = (sessionDetails) => {
	localStorage?.setItem('session', JSON.stringify(sessionDetails));
};

export const getLocalStorage = () => {
	const defaultValues = { token: '', name: '', userName: '', userId: '' };
	return JSON.parse(localStorage.getItem('session')) || defaultValues;
};
