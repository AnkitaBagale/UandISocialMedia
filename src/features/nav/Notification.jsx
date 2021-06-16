import { useAuthentication } from '../authentication/authenticationSlice';

import { useDisclosure } from '@chakra-ui/hooks';

import { Box, Text } from '@chakra-ui/layout';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	PopoverCloseButton,
	PopoverArrow,
} from '@chakra-ui/popover';
import { IconButton } from '@chakra-ui/button';
import { NotificationCard } from './NotificationCard';

export const Notification = () => {
	const { notifications } = useAuthentication();
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<Popover
			flip={true}
			isOpen={isOpen}
			onOpen={onOpen}
			onClose={onClose}
			placement='bottom'
			closeOnBlur={false}>
			<PopoverTrigger>
				<IconButton
					variant='iconBtn'
					icon={<i className='far fa-bell icon-btn-nav-item'></i>}
				/>
			</PopoverTrigger>
			<PopoverContent maxH='80vh' overflowY='auto' p='1rem'>
				<PopoverArrow />
				<PopoverCloseButton />
				<Box onClick={onClose}>
					{notifications.length === 0 ? (
						<Text p='1rem 0' color='gray.500'>
							No activity found..
						</Text>
					) : (
						notifications.map((activity) => (
							<Box
								w='100%'
								key={activity._id}
								as='button'
								textAlign='left'
								onClick={onClose}>
								<NotificationCard activity={activity} />
							</Box>
						))
					)}
				</Box>
			</PopoverContent>
		</Popover>
	);
};
