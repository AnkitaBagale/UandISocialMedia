import { useDisclosure } from '@chakra-ui/hooks';
import { Text } from '@chakra-ui/layout';

import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal';
import { useDispatch } from 'react-redux';
import { UserHorizontalCard } from '../../users/UserHorizontalCard';
import { closeBtnInLikesContainerClicked, usePostSelector } from '../postSlice';

export const LikesContainer = () => {
	const { isOpen, onClose } = useDisclosure({ isOpen: true });
	const { usersWhoLikedPost } = usePostSelector();
	const dispatch = useDispatch();

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign='center'>Likes</ModalHeader>
					<ModalCloseButton
						top='0.75rem'
						left='1rem'
						size='lg'
						onClick={() => dispatch(closeBtnInLikesContainerClicked())}
					/>
					<ModalBody pb='0.5rem' borderTop='1px solid' borderColor='gray.600'>
						{usersWhoLikedPost.length === 0 ? (
							<Text>No likes yet</Text>
						) : (
							usersWhoLikedPost.map((user) => (
								<UserHorizontalCard userDetails={user} />
							))
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
