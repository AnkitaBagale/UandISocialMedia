import { useEffect } from 'react';

import { useDisclosure } from '@chakra-ui/hooks';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import {
	mdAvatarStyle,
	modalBodyStyle,
	modalCloseBtnStyle,
	userCardWrapperStyle,
} from '../styles';

import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal';
import { useAuthentication } from '../authentication/authenticationSlice';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {
	followBtnClickedInFollowingList,
	loadFollowing,
	resetFollowing,
	useFollowing,
} from './followingUsersSlice';

export const FollowingContainer = ({ userName }) => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const {
		authentication: { userName: viewerName, token },
	} = useAuthentication();
	const { followingDetails } = useFollowing();
	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			dispatch(loadFollowing(userName));
		}
		return () => {
			dispatch(resetFollowing());
		};
	}, [dispatch, userName, token]);

	const getFollowButton = (followedByViewer, userFromList, viewerName) => {
		if (userFromList === viewerName) {
			return '';
		}
		return (
			<Button
				onClick={() =>
					dispatch(
						followBtnClickedInFollowingList({
							userName: userFromList,
							viewerName,
							profileUserName: userName,
						}),
					)
				}
				variant='outlineSecondary'>
				{followedByViewer ? 'Following' : 'Follow'}
			</Button>
		);
	};

	return (
		<>
			<Box as='button' onClick={onOpen}>
				following
			</Box>
			<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
				<ModalOverlay />
				<ModalContent mx='1rem'>
					<ModalHeader textAlign='center'>Following</ModalHeader>
					<ModalCloseButton {...modalCloseBtnStyle} onClick={onClose} />
					<ModalBody {...modalBodyStyle}>
						{followingDetails.length === 0 ? (
							<Text>No one following yet</Text>
						) : (
							followingDetails.map(({ userName, followedByViewer, avatar }) => {
								return (
									<Flex key={userName} {...userCardWrapperStyle}>
										<Link to={`/profile/${userName}`}>
											<Flex alignItems='center'>
												<Avatar
													{...mdAvatarStyle}
													name={userName}
													src={avatar}
												/>
												<Box>
													<Text fontSize='0.9rem' fontWeight={500}>
														{userName}
													</Text>
												</Box>
											</Flex>
										</Link>
										{getFollowButton(followedByViewer, userName, viewerName)}
									</Flex>
								);
							})
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
