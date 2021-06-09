import { CloseIcon } from '@chakra-ui/icons';
import { VStack, Slide, Box, IconButton, Avatar } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthentication } from '../authentication/authenticationSlice';

export const NAV_ITEMS = [
	{
		label: 'Home',
		href: '/',
	},
	{
		label: 'Dashboard',
		href: '/dashboard',
	},
];

export const MobileNav = ({ isOpen, onToggle }) => {
	const {
		authentication: { userName },
	} = useAuthentication();
	return (
		<Slide direction='left' left='0' top='0' in={isOpen} style={{ zIndex: 10 }}>
			<Box
				overflowY='auto'
				backgroundColor='white'
				height='100vh'
				width='80vw'
				boxShadow='0 0 10px 4px rgb(0 0 0 / 5%)'>
				<Box
					bg='violet.900'
					minH='4rem'
					p='1rem 0.5rem 1rem 0'
					textAlign='left'>
					<IconButton
						borderRadius='full'
						_hover={{
							bg: 'gray.700',
						}}
						_active={{
							bg: 'gray.700',
						}}
						bg='transparent'
						position='sticky'
						color='white'
						top='0'
						left='calc(100% - 1rem)'
						onClick={onToggle}
						icon={<CloseIcon w={4} h={4} />}
					/>
					<Link to={`/profile/${userName}`}>
						<Avatar
							name={userName}
							position='relative'
							left='-1rem'
							src='https://bit.ly/broken-link'
						/>
					</Link>
				</Box>

				<VStack alignItems='left' p='1.5rem' spacing='1.5rem'>
					<NavLink to='/' activeClassName='primary-text-color' end>
						Home
					</NavLink>
					<NavLink to='/' activeClassName='primary-text-color' end>
						Search
					</NavLink>
					<NavLink to='/notification' activeClassName='primary-text-color'>
						Notification
					</NavLink>
					<NavLink to='/profile' activeClassName='primary-text-color'>
						Profile
					</NavLink>
				</VStack>
			</Box>
		</Slide>
	);
};
