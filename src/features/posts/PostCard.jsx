import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Avatar,
	Box,
	ButtonGroup,
	IconButton,
	Text,
	Image,
} from '@chakra-ui/react';
import { userLikesClicked } from './postSlice';
import Linkify from 'react-linkify';
import {
	postCardUserInfoStyle,
	postCardWrapperStyle,
	smallAvatarStyle,
	postCardContentStyle,
	postCardFooterStyle,
	postActionButtonsWrapperStyle,
	userNameInCaptionStyle,
	postMediaStyle,
} from '../styles';
import { likeButtonClicked } from '../profile/profileSlice';

export const PostCard = ({ post }) => {
	const getColorForIconButton = (criteria) =>
		criteria ? 'pink.700' : 'gray.500';

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

	return (
		<>
			<Box {...postCardWrapperStyle}>
				<Box {...postCardUserInfoStyle}>
					<Avatar
						{...smallAvatarStyle}
						name={post?.userId?.userName}
						src={post?.userId?.avatar}
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
				{post?.media && <Image {...postMediaStyle} src={post?.media} />}
				<Box {...postCardFooterStyle}>
					<ButtonGroup {...postActionButtonsWrapperStyle}>
						<IconButton
							onClick={() => dispatch(likeButtonClicked({ postId: post._id }))}
							color={getColorForIconButton(post?.likedByViewer)}
							variant='actionBtnIcon'
							aria-label='like'
							icon={<i className='fas fa-heart icon-btn'></i>}
						/>
					</ButtonGroup>
					{getLikesText(post?.totalLikes)}
					<Box pt='0.5rem'>
						<Link
							to={`/profile/${post?.userId?.userName}`}
							className='link-text'>
							<Text {...userNameInCaptionStyle}>{post?.userId?.userName}</Text>
						</Link>
						<Linkify properties={{ target: '_blank' }}>{post?.caption}</Linkify>
					</Box>

					<Box pt='0.5rem' color='gray.500'>
						{post?.time}
					</Box>
				</Box>
			</Box>
		</>
	);
};
