import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { HStack, VStack, Link, Text, Box, Flex } from '@chakra-ui/layout';
import { API_URL, btnStyles, outlineSecondaryButtonStyle } from '../../utils';
import { countStyle } from './profileStyles';
import { PostCard } from '../../posts/components/PostCard/PostCard';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { usePostSelector } from '../../posts/postSlice';
import { useAuthentication } from '../../authentication/authenticationSlice';
import axios from 'axios';
export const Profile = () => {
	const [userDetails, setUserDetails] = useState(null);
	const [postsDetails, setPosts] = useState([]);
	const { userName } = useParams();
	const { userName: viewerUserName } = useAuthentication();

	const posts = usePostSelector();
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
				setPosts(postsResponse);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [userName, posts]);

	const getButton = () => {
		return viewerUserName === userName ? (
			<Button {...btnStyles} {...outlineSecondaryButtonStyle}>
				Edit Profile
			</Button>
		) : (
			<Button {...btnStyles} {...outlineSecondaryButtonStyle}>
				{userDetails.followedByViewer ? 'Following' : 'Follow'}
			</Button>
		);
	};
	return (
		<>
			{userDetails && (
				<Box maxW='40rem' margin='auto'>
					<Flex
						pb='2rem'
						mb='2rem'
						borderBottom='1px solid'
						borderColor='gray.600'>
						<Avatar
							size='2xl'
							mr='2rem'
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
							<PostCard post={post} />
						))}
					</Box>
				</Box>
			)}
		</>
	);
};
