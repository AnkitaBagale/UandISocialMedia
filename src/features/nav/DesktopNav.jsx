import { Link } from 'react-router-dom';
import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import { Box, HStack } from '@chakra-ui/layout';
import { useAuthentication } from '../authentication/authenticationSlice';
import { ComposePostForm } from '../posts/ComposePostForm';
import { avatarWrapperStyle, avatarStyle } from '../styles';

export const DesktopNav = () => {
	const {
		authentication: { userName },
	} = useAuthentication();
	return (
		<HStack ml={10} spacing='1rem' alignItems='center'>
			<ComposePostForm />
			<HStack
				display={{ base: 'none', md: 'flex' }}
				ml={10}
				spacing='1rem'
				alignItems='center'>
				<Link to='/'>
					<IconButton
						variant='iconBtn'
						icon={<i className='nav-icon fas fa-home icon-btn-nav-item'></i>}
					/>
				</Link>

				<Link to='/notification'>
					<IconButton
						variant='iconBtn'
						icon={<i className='far fa-bell icon-btn-nav-item'></i>}
					/>
				</Link>
				<Link to={`/profile/${userName}`}>
					<Box {...avatarWrapperStyle}>
						<Avatar
							{...avatarStyle}
							name={userName}
							src='https://bit.ly/broken-link'
						/>
					</Box>
				</Link>
			</HStack>
		</HStack>
	);
};
