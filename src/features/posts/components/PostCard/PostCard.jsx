import { Avatar, Box, ButtonGroup, IconButton, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeButtonClicked, saveButtonClicked } from '../../postSlice';
import {
	postCardUserInfoStyle,
	postCardWrapperStyle,
	smallAvatarStyle,
	smallAvatarLabelStyle,
	postCardContentStyle,
	postCardFooterStyle,
	postActionButtonsWrapperStyle,
	iconButtonStyle,
	userNameInCaptionStyle,
} from './postCardStyle';

export const PostCard = ({ post }) => {
	const getColorForIconButton = (criteria) =>
		criteria ? 'pink.800' : 'gray.500';

	const dispatch = useDispatch();
	return (
		<>
			<Box {...postCardWrapperStyle}>
				<Box {...postCardUserInfoStyle}>
					<Avatar
						{...smallAvatarStyle}
						name={post.userId.userName}
						src='https://bit.ly/tioluwani-kolawole'
					/>
					<Link to={`/profile/${post.userId._id}`} {...smallAvatarLabelStyle}>
						{post.userId.userName}
					</Link>
				</Box>
				<Text {...postCardContentStyle}>{post.content}</Text>
				<Box {...postCardFooterStyle}>
					<ButtonGroup {...postActionButtonsWrapperStyle}>
						<IconButton
							onClick={() => dispatch(likeButtonClicked({ postId: post._id }))}
							color={getColorForIconButton(post.likedByViewer)}
							{...iconButtonStyle}
							aria-label='Search database'
							icon={<i className='fas fa-heart icon-btn'></i>}
						/>
						<IconButton
							onClick={() => dispatch(saveButtonClicked({ postId: post._id }))}
							color={getColorForIconButton(post.savedByViewer)}
							{...iconButtonStyle}
							aria-label='Search database'
							icon={<i className='fas fa-bookmark icon-btn'></i>}
						/>
						<IconButton
							color='gray.500'
							{...iconButtonStyle}
							aria-label='Search database'
							icon={<i className='fas fa-share-alt icon-btn'></i>}
						/>
					</ButtonGroup>
					<Box>{`Liked by ${post.totalLikes} people`}</Box>
					<Box pt='0.5rem'>
						<Text {...userNameInCaptionStyle}>{post.userId.userName}</Text>
						{post.caption}
					</Box>

					<Box pt='0.5rem' color='gray.500'>
						{post.time}
					</Box>
				</Box>
			</Box>
		</>
	);
};
