import { Avatar } from '@chakra-ui/avatar';
import { IconButton } from '@chakra-ui/button';
import { Box, HStack } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { currentUser } from '../../database/database';
import { ComposePostForm } from '../newPost/ComposePostForm';
import { avatarWrapperStyle, avatarStyle, iconNavItemStyle } from './navStyles';

export const DesktopNav = () => {
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
						{...iconNavItemStyle}
						icon={<i className='nav-icon fas fa-home icon-btn-nav-item'></i>}
					/>
				</Link>
				<Link to='/search'>
					<IconButton
						{...iconNavItemStyle}
						icon={<i className='fas fa-search icon-btn-nav-item'></i>}
					/>
				</Link>
				<Link to='/notification'>
					<IconButton
						{...iconNavItemStyle}
						icon={<i className='far fa-bell icon-btn-nav-item'></i>}
					/>
				</Link>
				<Link to={`/profile/${currentUser._id}`}>
					<Box {...avatarWrapperStyle}>
						<Avatar
							{...avatarStyle}
							name={currentUser.userName}
							src='https://bit.ly/broken-link'
						/>
					</Box>
				</Link>
			</HStack>
		</HStack>
	);
};
