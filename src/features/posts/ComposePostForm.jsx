import { useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { UploadImage } from './UploadImage';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	FormControl,
	Input,
	IconButton,
	Avatar,
	Box,
	Flex,
	Textarea,
	TagCloseButton,
	Tag,
	TagLabel,
} from '@chakra-ui/react';

import {
	errorSymbolStyle,
	errorWrapperStyle,
	InputStyle,
	mdAvatarStyle,
} from '../styles';
import {
	createPostBtnClicked,
	storeSharedPost,
	usePostSelector,
} from './postSlice';
import {
	initialStateOfPostForm,
	newPostFormReducer,
	ACTIONS,
} from './reducer/newPostFormReducer';
import { useAuthentication } from '../authentication/authenticationSlice';
import { useLocation, useNavigate } from 'react-router';
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from '../utils/constants';

export const ComposePostForm = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [deleteToken, setToken] = useState('');
	const [media, setMedia] = useState(null);
	const initialRef = useRef();
	const dispatch = useDispatch();
	const [formState, formDispatch] = useReducer(
		newPostFormReducer,
		initialStateOfPostForm,
	);
	const {
		authentication: { userName, token },
	} = useAuthentication();
	const sharedQuery = new URLSearchParams(useLocation().search);
	const sharedPostTitle = sharedQuery.get('title');
	const { sharedPost } = usePostSelector();

	const {
		SET_CAPTION,
		SET_CONTENT,
		SET_CONTENT_ERROR,
		CLEAR_ERRORS,
		CLEAR_FORM,
	} = ACTIONS;

	const postButtonClicked = async () => {
		formDispatch({
			type: CLEAR_ERRORS,
		});
		if (/^\s*$/.test(formState.content)) {
			formDispatch({
				type: SET_CONTENT_ERROR,
				payload: { error: 'Please fill post content!' },
			});
		} else {
			const newPostDetails = {
				caption: formState.caption,
				content: formState.content,
				media: media ? media.url : '',
			};
			const { meta } = await dispatch(
				createPostBtnClicked({ post: newPostDetails }),
			);
			if (meta.requestStatus === 'fulfilled') {
				formDispatch({
					type: CLEAR_FORM,
				});
				setMedia(null);
				setToken('');
				onClose();
				if (sharedPostTitle) {
					navigate('/');
				}
			}
		}
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (token && sharedPost) {
			(() => {
				onOpen();
				formDispatch({ type: SET_CONTENT, payload: { content: sharedPost } });
				formDispatch({
					type: SET_CAPTION,
					payload: { caption: 'Great Learning Experience!' },
				});
				dispatch(storeSharedPost({ title: null }));
			})();
		}
	}, [token, sharedPost, SET_CAPTION, SET_CONTENT, dispatch, onOpen]);
	const deleteImage = async () => {
		try {
			const formData = new FormData();
			formData.append('upload_preset', CLOUDINARY_PRESET);
			formData.append('token', deleteToken);
			await fetch(`${CLOUDINARY_URL}/delete_by_token`, {
				method: 'POST',
				body: formData,
			});
			setToken('');
			setMedia(null);
		} catch (error) {
			console.log(error);
			setToken('');
			setMedia(null);
		}
	};

	const clearPostForm = async () => {
		formDispatch({
			type: CLEAR_FORM,
		});
		if (deleteToken) {
			await deleteImage();
		}
		onClose();
		if (sharedPostTitle) {
			navigate('/');
		}
	};

	return (
		<>
			<IconButton
				onClick={onOpen}
				variant='iconBtn'
				icon={<i className='fas fa-plus-circle icon-btn-nav-item'></i>}
			/>

			<Modal
				closeOnOverlayClick={false}
				initialFocusRef={initialRef}
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay />
				<ModalContent mx='1rem'>
					<ModalCloseButton
						top='0.25rem'
						left='1rem'
						size='lg'
						onClick={clearPostForm}
					/>
					<ModalBody
						pb={0}
						mt='3rem'
						borderTop='1px solid'
						borderColor='gray.600'>
						<Flex mt='1rem'>
							<Avatar
								{...mdAvatarStyle}
								name={userName}
								src='https://bit.ly/broken-link'
							/>
							<Box w='100%'>
								<FormControl>
									<Input
										{...InputStyle}
										ref={initialRef}
										value={formState.caption}
										onChange={(e) =>
											formDispatch({
												type: SET_CAPTION,
												payload: { caption: e.target.value },
											})
										}
										placeholder='Add Caption here..'
									/>
								</FormControl>

								<FormControl mt={4}>
									<Textarea
										isRequired
										{...InputStyle}
										value={formState.content}
										onChange={(e) =>
											formDispatch({
												type: SET_CONTENT,
												payload: { content: e.target.value },
											})
										}
										placeholder="What's happening?"
										isInvalid={!!formState.contentError}
									/>
									{formState.contentError && (
										<Box {...errorWrapperStyle}>
											<WarningTwoIcon {...errorSymbolStyle} />
											{formState.contentError}
										</Box>
									)}
								</FormControl>
								<Box>
									{media && (
										<Box as='span'>
											<Tag variant='outline'>
												<i className='fas fa-file-image'></i>
												<TagLabel pl='0.25rem'>{media.fileName}</TagLabel>
												<TagCloseButton onClick={deleteImage} />
											</Tag>
										</Box>
									)}
									<UploadImage setToken={setToken} setMedia={setMedia} />
								</Box>
							</Box>
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button onClick={postButtonClicked} variant='solidPrimary'>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
