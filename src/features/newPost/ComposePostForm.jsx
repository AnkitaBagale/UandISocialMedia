import { WarningTwoIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import { useReducer, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from '../../database/database';
import { iconNavItemStyle } from '../nav/navStyles';
import { btnStyles, solidPrimaryButtonStyle } from '../utils/buttonStyles';
import {
	errorSymbolStyle,
	errorWrapperStyle,
	InputStyle,
	mdAvatarStyle,
} from './formStyle';
import { createPostButtonClicked } from '../posts/postSlice';
import {
	initialStateOfPostForm,
	newPostFormReducer,
	ACTIONS,
} from './reducer/newPostFormReducer';

import { v4 as uuidv4 } from 'uuid';
export const ComposePostForm = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef();
	const dispatch = useDispatch();
	const [formState, formDispatch] = useReducer(
		newPostFormReducer,
		initialStateOfPostForm,
	);

	const {
		SET_CAPTION,
		SET_CONTENT,
		SET_CONTENT_ERROR,
		CLEAR_ERRORS,
		CLEAR_FORM,
	} = ACTIONS;

	const postButtonClicked = () => {
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
				_id: uuidv4(),
				caption: formState.caption,
				content: formState.content,
				totalLikes: 0,
				likedByViewer: false,
				savedByViewer: false,
				userId: {
					_id: currentUser._id,
					name: currentUser.name,
					userName: currentUser.userName,
				},
				time: new Date().toDateString(),
			};
			dispatch(createPostButtonClicked({ post: newPostDetails }));
			formDispatch({
				type: CLEAR_FORM,
			});
			onClose();
		}
	};

	return (
		<>
			<IconButton
				onClick={onOpen}
				{...iconNavItemStyle}
				icon={<i className='fas fa-plus-circle icon-btn-nav-item'></i>}
			/>

			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton top='0.25rem' left='1rem' size='lg' />
					<ModalBody
						pb={0}
						mt='3rem'
						borderTop='1px solid'
						borderColor='gray.600'>
						<Flex mt='1rem'>
							<Avatar
								{...mdAvatarStyle}
								name={currentUser.userName}
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
							</Box>
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button
							onClick={postButtonClicked}
							{...btnStyles}
							{...solidPrimaryButtonStyle}>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
