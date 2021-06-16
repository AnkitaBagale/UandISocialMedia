import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	Avatar,
	Box,
	ButtonGroup,
	IconButton,
	Text,
	Image,
	Flex,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { userLikesClicked } from '../posts/postSlice';
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
import Linkify from 'react-linkify';
import { deletePostBtnClicked, likeButtonClicked } from './profileSlice';
import { useAuthentication } from '../authentication/authenticationSlice';

export const PostCard = ({ post }) => {
	const dispatch = useDispatch();
	const {
		authentication: { userName },
	} = useAuthentication();

	const getColorForIconButton = (criteria) =>
		criteria ? 'pink.700' : 'gray.500';

	const getLikesText = (totalLikes) => {
		return totalLikes === 0 ? (
			<Box
				className='link-text'
				as='button'
				onClick={() =>
					dispatch(likeButtonClicked({ postId: post._id, updateProfile: true }))
				}>
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

	const showDeleteBtn = post?.userId?.userName === userName;

	return (
		<>
			<Box {...postCardWrapperStyle}>
				<Flex {...postCardUserInfoStyle} justifyContent='space-between'>
					<Flex alignItems='center'>
						<Avatar
							{...smallAvatarStyle}
							name={post?.userId?.userName}
							src={post?.userId?.avatar}
						/>
						<Link
							className='link-text'
							to={`/profile/${post?.userId?.userName}`}>
							{post?.userId?.userName}
						</Link>
					</Flex>
					{showDeleteBtn && (
						<IconButton
							onClick={() =>
								dispatch(deletePostBtnClicked({ postId: post._id }))
							}
							variant='iconBtn'
							icon={<DeleteIcon />}
						/>
					)}
				</Flex>
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
							onClick={() =>
								dispatch(
									likeButtonClicked({ postId: post._id, updateProfile: true }),
								)
							}
							color={getColorForIconButton(post?.likedByViewer)}
							variant='actionBtnIcon'
							aria-label='like'
							icon={<i className='fas fa-heart icon-btn'></i>}
						/>

						<IconButton
							variant='actionBtnIcon'
							aria-label='share'
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
