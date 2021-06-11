import { Box } from '@chakra-ui/layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PostCard } from './PostCard';
import { LikesContainer } from './LikesContainer';
import { loadPosts, usePostSelector } from './postSlice';
import { useAuthentication } from '../authentication/authenticationSlice';

// const data = [
// 	{
// 		_id: '1',
// 		userName: 'xyz',
// 		name: 'xyz',
// 	},
// 	{
// 		_id: '1',
// 		userName: 'xyz',
// 		name: 'xyz',
// 	},
// 	{
// 		_id: '1',
// 		userName: 'xyz',
// 		name: 'xyz',
// 	},
// 	{
// 		_id: '1',
// 		userName: 'xyz',
// 		name: 'xyz',
// 	},
// 	{
// 		_id: '1',
// 		userName: 'xyz',
// 		name: 'xyz',
// 	},
// 	{
// 		_id: '1',
// 		userName: 'xyz',
// 		name: 'xyz',
// 	},
// 	{
// 		_id: '1',
// 		userName: 'xyz',
// 		name: 'xyz',
// 	},
// 	{
// 		_id: '1',
// 		userName: 'xyz',
// 		name: 'xyz',
// 	},
// 	{
// 		_id: '1',
// 		userName: 'xyz',
// 		name: 'xyz',
// 	},
// 	{
// 		_id: '1',
// 		userName: 'xyz',
// 		name: 'xyz',
// 	},
// 	{
// 		_id: '1',
// 		userName: 'xyz',
// 		name: 'xyz',
// 	},
// 	{
// 		_id: '1',
// 		userName: 'xyz',
// 		name: 'xyz',
// 	},
// ];

export const Posts = () => {
	const { posts, status, showLikesContainer } = usePostSelector();
	const {
		authentication: { token },
	} = useAuthentication();
	const dispatch = useDispatch();

	useEffect(() => {
		if (status === 'idle' && token) {
			dispatch(loadPosts());
		}
	}, [status, dispatch, token]);
	return (
		<>
			<Box maxW='40rem' margin='auto'>
				{posts.map((post) => (
					<PostCard post={post} />
				))}
			</Box>
			{showLikesContainer && <LikesContainer />}
		</>
	);
};
