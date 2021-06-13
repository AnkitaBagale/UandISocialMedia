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

export const FollowingContainer = ({
	userName,
	followingCount,
	setUserDetails,
}) => {
	const [followingDetails, setFollowingDetails] = useState([]);
	const { isOpen, onClose, onOpen } = useDisclosure();
	const {
		authentication: { token, userName: viewerName },
	} = useAuthentication();

	const followBtnClicked = async (userFromList) => {
		try {
			const {
				status,
				data: { isAdded },
			} = await axios.post(
				`${API_URL}/social-profiles/${userFromList}/followers`,
			);
			if (status === 200) {
				if (userName === viewerName) {
					setUserDetails((user) => ({
						...user,
						count: {
							...user.count,
							following: isAdded
								? user.count.following + 1
								: user.count.following - 1,
						},
					}));
					return;
				}
				setFollowingDetails((users) =>
					users.map((user) =>
						user.userName !== userFromList
							? user
							: {
									...user,
									followedByViewer: !user.followedByViewer,
							  },
					),
				);
			} else {
				throw new Error('failed!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getFollowButton = (followedByViewer, userFromList, viewerName) => {
		if (userFromList === viewerName) {
			return '';
		}
		return (
			<Button
				onClick={() => followBtnClicked(userFromList)}
				variant='outlineSecondary'>
				{followedByViewer ? 'Following' : 'Follow'}
			</Button>
		);
	};

	useEffect(() => {
		if (token && followingCount) {
			(async () => {
				const {
					data: { response },
				} = await axios.get(`${API_URL}/social-profiles/${userName}/following`);
				setFollowingDetails(response);
			})();
		}
	}, [token, userName, followingCount]);

	return (
		<>
			<Box as='button' onClick={onOpen}>
				following
			</Box>
			<Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
				<ModalOverlay />
				<ModalContent mx='1rem'>
					<ModalHeader textAlign='center'>Following</ModalHeader>
					<ModalCloseButton
						top='0.75rem'
						left='1rem'
						size='lg'
						onClick={onClose}
					/>
					<ModalBody pb='0.5rem' borderTop='1px solid' borderColor='gray.600'>
						{followingDetails.length === 0 ? (
							<Text>No one following yet</Text>
						) : (
							followingDetails.map(({ userName, followedByViewer }) => {
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
