import { Avatar } from '@chakra-ui/avatar';
import { Button, IconButton } from '@chakra-ui/button';
import { HStack, VStack, Link, Text, Box, Flex } from '@chakra-ui/layout';
import { API_URL, btnStyles, outlineSecondaryButtonStyle } from '../utils';
import { countStyle } from './profileStyles';
import { PostCard } from '../posts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { usePostSelector } from '../posts/postSlice';
import {
	logoutUser,
	useAuthentication,
} from '../authentication/authenticationSlice';
import { UpdateProfileForm } from './UpdateProfileForm';
import axios from 'axios';
import { Tooltip } from '@chakra-ui/tooltip';
import { useDispatch } from 'react-redux';

export const Profile = () => {
	const [userDetails, setUserDetails] = useState(null);
	const [postsDetails, setPosts] = useState([]);
	const { userName } = useParams();
	const { userName: viewerUserName } = useAuthentication();
	const dispatch = useDispatch();
	const { posts } = usePostSelector();
	useEffect(() => {
		(async () => {
			try {
				const {
					data: { response },
				} = await axios.get(`${API_URL}/social-profiles/${userName}`);
				setUserDetails(response);
				const postsResponse = posts.filter(
					(post) => post.userId.userName === userName,
				);
				console.log({ postsResponse });
				setPosts(postsResponse);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [userName, posts]);

	const followBtnClicked = async (userName, setUserDetails) => {
		try {
			const { status } = await axios.post(
				`${API_URL}/social-profiles/${userName}/followers`,
			);
			if (status === 200) {
				setUserDetails((userDetails) => ({
					...userDetails,
					followedByViewer: !userDetails.followedByViewer,
					count: {
						...userDetails.count,
						followers: userDetails.followedByViewer
							? userDetails.count.followers - 1
							: userDetails.count.followers + 1,
					},
				}));
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
				<Tooltip hasArrow label='Logout' bg='red.600'>
					<IconButton
						onClick={() => dispatch(logoutUser())}
						aria-label='logout'
						icon={<i className='fas fa-sign-out-alt icon-btn'></i>}
					/>
				</Tooltip>
			</>
		) : (
			<Button
				onClick={() => followBtnClicked(userName, setUserDetails)}
				{...btnStyles}
				{...outlineSecondaryButtonStyle}>
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
									<Text {...countStyle}>{userDetails.count.posts}</Text>
									posts
								</Text>
								<Text>
									<Text {...countStyle}>{userDetails.count.followers}</Text>
									followers
								</Text>
								<Text>
									<Text {...countStyle}>{userDetails.count.following}</Text>
									following
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
							<PostCard key={post._id} post={post} />
						))}
					</Box>
				</Box>
			)}
		</>
	);
};
