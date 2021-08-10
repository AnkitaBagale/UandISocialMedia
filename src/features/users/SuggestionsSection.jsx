import { Box, Divider, GridItem, Text } from '@chakra-ui/react';
import { useAuthentication } from '../authentication/authenticationSlice';
import { UserHorizontalCard } from './UserHorizontalCard';
import { useUsers } from './usersSlice';

export const SuggestionsSection = () => {
	const {
		authentication: { name, userName, avatar },
	} = useAuthentication();
	const { users } = useUsers();

	const getFiveUnfollowedUser = (users) => {
		let unfollowedUsers = users.filter(
			(user) => !user.followedByViewer && userName !== user.userName,
		);
		if (unfollowedUsers.length > 5) {
			return [
				unfollowedUsers[0],
				unfollowedUsers[1],
				unfollowedUsers[2],
				unfollowedUsers[3],
				unfollowedUsers[4],
			];
		}
		return unfollowedUsers;
	};

	return (
		<GridItem display={{ md: 'block', base: 'none' }} overflowY='auto'>
			<Box position='sticky'>
				<UserHorizontalCard userDetails={{ name, userName, avatar }} />
				<Divider my='1rem' />
				<Text color='gray.500' fontWeight='500' mb='1rem'>
					Suggestions for you
				</Text>
				{getFiveUnfollowedUser(users).map((user) => (
					<Box mb='0.8rem' key={user.userName}>
						<UserHorizontalCard userDetails={user} />
					</Box>
				))}
			</Box>
		</GridItem>
	);
};
