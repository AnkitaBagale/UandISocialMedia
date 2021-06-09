export const searchUsers = (users, searchedWord) => {
	if (searchedWord) {
		return users.filter(
			({ userName, name }) =>
				userName.includes(searchedWord) || name.includes(searchedWord),
		);
	}
	return users;
};
