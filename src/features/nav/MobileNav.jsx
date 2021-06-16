import { Link } from 'react-router-dom';
import { Flex, IconButton } from '@chakra-ui/react';
import { mobileNavWrapperStyle } from '../styles';
import { ComposePostForm } from '../posts/ComposePostForm';
import { Notification } from './Notification';

export const MobileNav = () => {
	return (
		<Flex {...mobileNavWrapperStyle}>
			<Link to='/'>
				<IconButton
					variant='iconBtn'
					icon={<i className='nav-icon fas fa-home icon-btn-nav-item'></i>}
				/>
			</Link>
			<ComposePostForm />

			<Notification />
		</Flex>
	);
};
