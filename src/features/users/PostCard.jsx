import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Box, ButtonGroup, IconButton, Text } from '@chakra-ui/react';
import { likeButtonClicked, userLikesClicked } from '../posts/postSlice';
import {
	postCardUserInfoStyle,
	postCardWrapperStyle,
	smallAvatarStyle,
	postCardContentStyle,
	postCardFooterStyle,
	postActionButtonsWrapperStyle,
	userNameInCaptionStyle,
} from '../styles';
import Linkify from 'react-linkify';

export const PostCard = ({ post, setPosts }) => {
	const getColorForIconButton = (criteria) =>
		criteria ? 'pink.800' : 'gray.500';

	const getLikesText = (totalLikes) => {
		return totalLikes === 0 ? (
			<Box
				className='link-text'
				as='button'
				onClick={() => dispatch(likeButtonClicked({ postId: post._id }))}>
				Be the first to like this
			</Box>
		) : (
			<Box
				className='link-text'
				as='button'
				onClick={() => dispatch(userLikesClicked({ postId: post._id }))}>
				Liked by {post?.totalLikes} people
			</Box>
		);
	};

	const dispatch = useDispatch();

	const likeBtnClickedInUserProfile = async () => {
		const dispatchResponse = await dispatch(
			likeButtonClicked({ postId: post._id }),
		);

		if (dispatchResponse.meta.requestStatus === 'fulfilled') {
			setPosts((posts) =>
				posts.map((userPost) => {
					if (userPost._id !== post._id) {
						return userPost;
					}
					return {
						...userPost,
						likedByViewer: !userPost.likedByViewer,
						totalLikes: userPost.likedByViewer
							? userPost.totalLikes - 1
							: userPost.totalLikes + 1,
					};
				}),
			);
		}
	};
	return (
		<>
			<Box {...postCardWrapperStyle}>
				<Box {...postCardUserInfoStyle}>
					<Avatar
						{...smallAvatarStyle}
						name={post?.userId?.userName}
						src='https://bit.ly/broken-link'
					/>
					<Link className='link-text' to={`/profile/${post?.userId?.userName}`}>
						{post?.userId?.userName}
					</Link>
				</Box>
				<Text {...postCardContentStyle} className='post-content'>
					<Linkify
						properties={{
							target: '_blank',
						}}>
						{post?.content}
					</Linkify>
				</Text>
				<Box {...postCardFooterStyle}>
					<ButtonGroup {...postActionButtonsWrapperStyle}>
						<IconButton
							onClick={likeBtnClickedInUserProfile}
							color={getColorForIconButton(post?.likedByViewer)}
							variant='actionBtnIcon'
							aria-label='Search database'
							icon={<i className='fas fa-heart icon-btn'></i>}
						/>
						<IconButton
							color='gray.500'
							variant='actionBtnIcon'
							aria-label='Search database'
							icon={<i className='fas fa-share-alt icon-btn'></i>}
						/>
					</ButtonGroup>
					{getLikesText(post?.totalLikes)}
					<Box pt='0.5rem'>
						<Link
							to={`/profile/${post?.userId?.userName}`}
							className='link-text'>
							<Text {...userNameInCaptionStyle}>{post?.userId?.userName}</Text>
						</Link>
						{post?.caption}
					</Box>

					<Box pt='0.5rem' color='gray.500'>
						{post?.time}
					</Box>
				</Box>
			</Box>
		</>
	);
};
