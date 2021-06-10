import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { mdAvatarStyle } from '../styles';

export const UserHorizontalCard = ({ userDetails: { userName, name } }) => {
	return (
		<Link to={`/profile/${userName}`}>
			<Flex mt='0.8rem' mb='0.8rem' alignItems='center'>
				<Avatar
					{...mdAvatarStyle}
					name={userName}
					src='https://bit.ly/broken-link'
				/>
				<Box>
					<Text fontSize='0.9rem' fontWeight={500}>
						{userName}
					</Text>
					<Text fontSize='0.9rem' color='gray.500'>
						{name}
					</Text>
				</Box>
			</Flex>
		</Link>
	);
};
