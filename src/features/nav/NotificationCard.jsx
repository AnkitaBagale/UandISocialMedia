import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { mdAvatarStyle } from '../styles';

export const NotificationCard = ({ activity }) => {
	const link = `/profile/${activity.activityUserId.userName}`;
	return (
		<Link to={link}>
			<Flex mt='0.4rem' mb='0.4rem' alignItems='center'>
				<Avatar
					{...mdAvatarStyle}
					name={activity.activityUserId.userName}
					src={activity.activityUserId.avatar}
				/>
				<Box>
					<Text fontSize='0.9rem' fontWeight={500}>
						{activity.activityUserId.userName}
					</Text>
					<Text fontSize='0.9rem' color='gray.500'>
						{activity.activityTitle}
						<Text as='em'>
							{activity?.likedPost?.caption &&
								`: ${activity?.likedPost?.caption}`}
						</Text>
					</Text>
				</Box>
			</Flex>
		</Link>
	);
};
