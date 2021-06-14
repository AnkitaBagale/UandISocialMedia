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
import {
	removeFromFollowersBtnClicked,
	useProfile,
} from '../profile/profileSlice';
import { useDispatch } from 'react-redux';
import {
	followBtnClickedInFollowersList,
	loadFollowers,
	resetFollowers,
	useFollowers,
} from './followersUsersSlice';

export const FollowersContainer = ({ userName }) => {
	const { profileDetails } = useProfile();
	const { followersDetails } = useFollowers();
	const dispatch = useDispatch();
	const followersCount = profileDetails?.count?.followers;
	const { isOpen, onClose, onOpen } = useDisclosure();
	const {
		authentication: { token, userName: viewerName },
	} = useAuthentication();

	useEffect(() => {
		if (token && followersCount) {
			dispatch(loadFollowers(userName));
		}
		return () => {
			dispatch(resetFollowers());
		};
	}, [token, userName, followersCount, dispatch]);

	const getFollowButton = (
		followedByViewer,
		userNameFromFollowList,
		viewerName,
	) => {
		if (viewerName === userName) {
			return (
				<Button
					onClick={() =>
						dispatch(
							removeFromFollowersBtnClicked({
								userName: userNameFromFollowList,
							}),
						)
					}
					variant='outlineSecondary'>
					Remove
				</Button>
			);
		}
		if (userNameFromFollowList === viewerName) {
			return '';
		}
		return (
			<Button
				onClick={() =>
					dispatch(
						followBtnClickedInFollowersList({
							userName: userNameFromFollowList,
							viewerName,
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
				followers
			</Box>
			<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
				<ModalOverlay />
				<ModalContent mx='1rem'>
					<ModalHeader textAlign='center'>Followers</ModalHeader>
					<ModalCloseButton {...modalCloseBtnStyle} onClick={onClose} />
					<ModalBody {...modalBodyStyle}>
						{followersDetails.length === 0 ? (
							<Text>No Followers yet</Text>
						) : (
							followersDetails.map(({ userName, followedByViewer }) => {
								return (
									<Flex key={userName} {...userCardWrapperStyle}>
										<Link to={`/profile/${userName}`}>
											<Flex alignItems='center'>
												<Avatar
													{...mdAvatarStyle}
													name={userName}
													src='https://bit.ly/broken-link'
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
