import { Box } from '@chakra-ui/layout';
import { PostCard } from './components/PostCard/PostCard';
import { usePostSelector } from './postSlice';

export const Posts = () => {
	const posts = usePostSelector();

	return (
		<Box maxW='40rem' margin='auto'>
			{posts.map((post) => (
				<PostCard post={post} />
			))}
		</Box>
	);
};
