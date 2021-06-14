import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Avatar } from '@chakra-ui/avatar';
import { Button, IconButton } from '@chakra-ui/button';
import { HStack, VStack, Link, Text, Box, Flex } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';

import {
	countStyle,
	profileAvatarStyle,
	profileDetailsWrapperStyle,
} from '../styles';
import { PostCard } from './PostCard';
import {
	logoutUser,
	useAuthentication,
} from '../authentication/authenticationSlice';
import { UpdateProfileForm } from './UpdateProfileForm';
import { FollowersContainer } from '../followersUsers/FollowersContainer';
import { FollowingContainer } from '../followingUsers/FollowingContainer';
import {
	followBtnClicked,
	loadUserPosts,
	loadUserProfile,
	resetProfile,
	useProfile,
} from './profileSlice';

export const Profile = () => {
	const { userName } = useParams();
	const { profileDetails, postsDetails } = useProfile();
	const {
		authentication: { userName: viewerUserName },
	} = useAuthentication();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUserProfile(userName));
		dispatch(loadUserPosts(userName));
		return () => dispatch(resetProfile());
	}, [userName, dispatch]);

	const getButton = () => {
		return viewerUserName === userName ? (
			<>
				<UpdateProfileForm />
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
				onClick={() =>
					dispatch(followBtnClicked({ userName, posts: postsDetails }))
				}>
				{profileDetails.followedByViewer ? 'Following' : 'Follow'}
			</Button>
		);
	};

	return (
		<>
			{profileDetails && (
				<Box maxW='40rem' margin='auto'>
					<Flex {...profileDetailsWrapperStyle}>
						<Avatar
							{...profileAvatarStyle}
							name={profileDetails.userName}
							src='https://bit.ly/broken-link'
						/>
						<Box>
							<HStack alignItems='center' mb='1rem'>
								<Text pr='1.5rem' fontSize='2xl' fontWeight='300'>
									{profileDetails.userName}
								</Text>
								{getButton()}
							</HStack>

							<HStack spacing='1.5rem' mb='1rem'>
								<Text>
									<Text {...countStyle}>{postsDetails.length}</Text>
									posts
								</Text>
								<Text>
									<Text {...countStyle}>{profileDetails.count.followers}</Text>
									<FollowersContainer userName={userName} />
								</Text>
								<Text>
									<Text {...countStyle}>{profileDetails.count.following}</Text>
									<FollowingContainer userName={userName} />
								</Text>
							</HStack>
							<VStack alignItems='left' spacing='0.25rem'>
								<Text fontWeight='500'>{profileDetails.name}</Text>
								<Text>{profileDetails.bio}</Text>
								<Link color='blue.600' href={profileDetails.link} isExternal>
									{profileDetails.link}
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
