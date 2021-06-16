import { Box, Text } from '@chakra-ui/layout';
import { Grid, GridItem } from '@chakra-ui/react';
import { PostCard } from './PostCard';
import { usePostSelector } from './postSlice';
import { SuggestionsSection } from '../users/SuggestionsSection';

export const Posts = () => {
	const { posts } = usePostSelector();
	return (
		<>
			<Grid
				margin='auto'
				templateColumns={{ md: '3fr 1fr', base: '1fr' }}
				gap='2rem'
				justifyContent='space-around'>
				<GridItem
					overflowY={{ md: 'auto' }}
					maxH={{ md: 'calc(100vh - 7rem)' }}>
					{posts.length === 0 ? (
						<Text textAlign='center'>No Posts Yet</Text>
					) : (
						<Box maxW='40rem' margin='auto'>
							{posts.map((post) => (
								<PostCard key={post._id} post={post} />
							))}
						</Box>
					)}
				</GridItem>
				<SuggestionsSection />
			</Grid>
		</>
	);
};
