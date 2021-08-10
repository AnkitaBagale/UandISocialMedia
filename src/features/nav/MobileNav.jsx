import { Link } from 'react-router-dom';
import { Flex, IconButton } from '@chakra-ui/react';
import { mobileNavWrapperStyle } from '../styles';
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

			<Notification />
		</Flex>
	);
};
