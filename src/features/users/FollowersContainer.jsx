import axios from 'axios';
import { useEffect, useState } from 'react';

import { useDisclosure } from '@chakra-ui/hooks';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { mdAvatarStyle } from '../styles';

import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/modal';
import { API_URL } from '../utils';
import { useAuthentication } from '../authentication/authenticationSlice';
import { Button } from '@chakra-ui/react';

export const FollowersContainer = ({
	userName,
	followersCount,
	setUserDetails,
}) => {
	const [followersDetails, setFollowersDetails] = useState([]);
	const { isOpen, onClose, onOpen } = useDisclosure();
	const {
		authentication: { token, userName: viewerName },
	} = useAuthentication();

	const followBtnClicked = async (userNameFromFollowList) => {
		try {
			const { status } = await axios.post(
				`${API_URL}/social-profiles/${userNameFromFollowList}/followers`,
			);

			if (status === 200) {
				setFollowersDetails((users) =>
					users.map((user) => {
						if (user.userName !== userNameFromFollowList) {
							return user;
						}

						return {
							...user,
							followedByViewer: !user.followedByViewer,
						};
					}),
				);
			} else {
				throw new Error('failed!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeBtnClicked = async (userNameFromFollowList) => {
		try {
			const { status } = await axios.post(
				`${API_URL}/social-profiles/${userNameFromFollowList}/following`,
			);
			if (status === 200) {
				setUserDetails((user) => ({
					...user,
					count: {
						...user.count,
						followers: user.count.followers - 1,
					},
				}));
			} else {
				throw new Error('failed!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getFollowButton = (
		followedByViewer,
		userNameFromFollowList,
		viewerName,
	) => {
		if (viewerName === userName) {
			return (
				<Button
					onClick={() => removeBtnClicked(userNameFromFollowList)}
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
				onClick={() => followBtnClicked(userNameFromFollowList)}
				variant='outlineSecondary'>
				{followedByViewer ? 'Following' : 'Follow'}
			</Button>
		);
	};

	useEffect(() => {
		if (token && followersCount) {
			(async () => {
				const {
					data: { response },
				} = await axios.get(`${API_URL}/social-profiles/${userName}/followers`);
				setFollowersDetails(response);
			})();
		}
	}, [token, userName, followersCount]);

	return (
		<>
			<Box as='button' onClick={onOpen}>
				followers
			</Box>
			<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
				<ModalOverlay />
				<ModalContent mx='1rem'>
					<ModalHeader textAlign='center'>Followers</ModalHeader>
					<ModalCloseButton
						top='0.75rem'
						left='1rem'
						size='lg'
						onClick={onClose}
					/>
					<ModalBody pb='0.5rem' borderTop='1px solid' borderColor='gray.600'>
						{followersDetails.length === 0 ? (
							<Text>No Followers yet</Text>
						) : (
							followersDetails.map(({ userName, followedByViewer }) => {
								return (
									<>
										<Flex
											key={userName}
											mt='0.8rem'
											mb='0.8rem'
											alignItems='center'
											justifyContent='space-between'>
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
									</>
								);
							})
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
