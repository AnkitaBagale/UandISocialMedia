import { Box } from '@chakra-ui/layout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PostCard } from './components/PostCard/PostCard';
import { loadPosts, usePostSelector } from './postSlice';

export const Posts = () => {
	const { posts, status } = usePostSelector();
	const dispatch = useDispatch();

	useEffect(() => {
		if (status === 'idle') {
			dispatch(loadPosts());
		}
	}, [status, dispatch]);
	return (
		<Box maxW='40rem' margin='auto'>
			{posts.map((post) => (
				<PostCard post={post} />
			))}
		</Box>
	);
};
