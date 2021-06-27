import { Link } from 'react-router-dom';
import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import { Box, HStack } from '@chakra-ui/layout';
import { useAuthentication } from '../authentication/authenticationSlice';
import { ComposePostForm } from '../posts/ComposePostForm';
import { avatarWrapperStyle, avatarStyle } from '../styles';
import { Notification } from './Notification';

export const DesktopNav = () => {
	const {
		authentication: { userName, avatar },
	} = useAuthentication();
	return (
		<HStack spacing='1rem' alignItems='center'>
			<ComposePostForm />
			<HStack
				display={{ base: 'none', md: 'flex' }}
				spacing='1rem'
				alignItems='center'>
				<Link to='/'>
					<IconButton
						variant='iconBtn'
						icon={<i className='nav-icon fas fa-home icon-btn-nav-item'></i>}
					/>
				</Link>

				<Notification />
			</HStack>
			<Link to={`/profile/${userName}`}>
				<Box {...avatarWrapperStyle}>
					<Avatar {...avatarStyle} name={userName} src={avatar} />
				</Box>
			</Link>
		</HStack>
	);
};
