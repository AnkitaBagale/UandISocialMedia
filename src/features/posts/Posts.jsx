import { Box } from '@chakra-ui/layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PostCard } from './PostCard';
import { LikesContainer } from './PostCard/LikesContainer';
import { loadPosts, usePostSelector } from './postSlice';

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
	const { posts, status } = usePostSelector();
	const { showLikesContainer } = usePostSelector();
	const dispatch = useDispatch();

	useEffect(() => {
		if (status === 'idle') {
			dispatch(loadPosts());
		}
	}, [status, dispatch]);
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
