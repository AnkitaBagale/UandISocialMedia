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
import { modalBodyStyle, modalCloseBtnStyle } from '../styles';
import { UserHorizontalCard } from '../users/UserHorizontalCard';
import { closeBtnInLikesContainerClicked, usePostSelector } from './postSlice';

export const LikesContainer = () => {
	const { isOpen, onClose } = useDisclosure({ isOpen: true });
	const { usersWhoLikedPost } = usePostSelector();
	const dispatch = useDispatch();

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
				<ModalOverlay />
				<ModalContent mx='1rem'>
					<ModalHeader textAlign='center'>Likes</ModalHeader>
					<ModalCloseButton
						{...modalCloseBtnStyle}
						onClick={() => dispatch(closeBtnInLikesContainerClicked())}
					/>
					<ModalBody {...modalBodyStyle}>
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
