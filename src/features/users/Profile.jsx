import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Avatar } from '@chakra-ui/avatar';
import { Button, IconButton } from '@chakra-ui/button';
import { HStack, VStack, Link, Text, Box, Flex } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';

import { API_URL } from '../utils';
import { countStyle } from '../styles';
import { PostCard } from './PostCard';
import {
	logoutUser,
	useAuthentication,
} from '../authentication/authenticationSlice';
import { UpdateProfileForm } from './UpdateProfileForm';
import { FollowersContainer } from './FollowersContainer';
import { FollowingContainer } from './FollowingContainer';
import { followBtnClickedByViewer } from '../posts/postSlice';

export const Profile = () => {
	const [userDetails, setUserDetails] = useState(null);
	const [postsDetails, setPosts] = useState([]);
	const { userName } = useParams();
	const {
		authentication: { userName: viewerUserName },
	} = useAuthentication();
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			try {
				const {
					data: { response },
				} = await axios.get(`${API_URL}/social-profiles/${userName}`);
				setUserDetails(response);
			} catch (error) {
				console.log(error);
			}
		})();

		(async () => {
			try {
				const {
					data: { response },
				} = await axios.get(`${API_URL}/posts/${userName}`);
				setPosts(response);
			} catch (error) {
				console.log(error);
			}
		})();

		return () => setUserDetails(null);
	}, [userName]);

	const followBtnClicked = async (userName, setUserDetails) => {
		try {
			const {
				status,
				data: { isAdded },
			} = await axios.post(`${API_URL}/social-profiles/${userName}/followers`);
			if (status === 200) {
				setUserDetails((userDetails) => ({
					...userDetails,
					followedByViewer: isAdded,
					count: {
						...userDetails.count,
						followers: isAdded
							? userDetails.count.followers + 1
							: userDetails.count.followers - 1,
					},
				}));

				dispatch(
					followBtnClickedByViewer({
						posts: postsDetails,
						followedByViewer: isAdded,
					}),
				);
			} else {
				throw new Error('failed!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateProfile = async (userName, inputBio, inputLink, cleanup) => {
		try {
			const {
				data: { response },
				status,
			} = await axios.post(`${API_URL}/social-profiles/${userName}`, {
				bio: inputBio,
				link: inputLink,
			});
			if (status === 200) {
				setUserDetails((userDetails) => ({
					...userDetails,
					bio: response.bio,
					link: response.link,
				}));
				cleanup();
			} else {
				throw new Error('failed!');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getButton = () => {
		return viewerUserName === userName ? (
			<>
				<UpdateProfileForm
					userDetails={userDetails}
					updateProfile={updateProfile}
				/>
				<Tooltip hasArrow label='Logout' bg='pink.900'>
					<IconButton
						variant='iconBtn'
						onClick={() => dispatch(logoutUser())}
						aria-label='logout'
						icon={<i className='fas fa-sign-out-alt icon-btn'></i>}
					/>
				</Tooltip>
			</>
		) : (
			<Button
				variant='outlineSecondary'
				onClick={() => followBtnClicked(userName, setUserDetails)}>
				{userDetails.followedByViewer ? 'Following' : 'Follow'}
			</Button>
		);
	};

	return (
		<>
			{userDetails && (
				<Box maxW='40rem' margin='auto'>
					<Flex
						flexWrap='wrap'
						pb='2rem'
						mb='2rem'
						borderBottom='1px solid'
						borderColor='gray.600'>
						<Avatar
							size='2xl'
							mr={{ md: '2rem', sm: '0' }}
							mb='2rem'
							name={userDetails.userName}
							src='https://bit.ly/broken-link'
						/>
						<Box>
							<HStack alignItems='center' mb='1rem'>
								<Text pr='1.5rem' fontSize='2xl' fontWeight='300'>
									{userDetails.userName}
								</Text>
								{getButton()}
							</HStack>

							<HStack spacing='1.5rem' mb='1rem'>
								<Text>
									<Text {...countStyle}>{postsDetails.length}</Text>
									posts
								</Text>
								<Text>
									<Text {...countStyle}>{userDetails.count.followers}</Text>
									<FollowersContainer
										userName={userName}
										followersCount={userDetails.count.followers}
										setUserDetails={setUserDetails}
									/>
								</Text>
								<Text>
									<Text {...countStyle}>{userDetails.count.following}</Text>
									<FollowingContainer
										userName={userName}
										followingCount={userDetails.count.following}
										setUserDetails={setUserDetails}
									/>
								</Text>
							</HStack>
							<VStack alignItems='left' spacing='0.25rem'>
								<Text fontWeight='500'>{userDetails.name}</Text>
								<Text>{userDetails.bio}</Text>
								<Link color='blue.600' href={userDetails.link} isExternal>
									{userDetails.link}
								</Link>
							</VStack>
						</Box>
					</Flex>
					<Box>
						{postsDetails.map((post) => (
							<PostCard key={post._id} post={post} setPosts={setPosts} />
						))}
					</Box>
				</Box>
			)}
		</>
	);
};
