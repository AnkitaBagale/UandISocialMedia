import { useReducer, useRef } from 'react';
import { useDispatch } from 'react-redux';
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

import {
	errorSymbolStyle,
	errorWrapperStyle,
	InputStyle,
	mdAvatarStyle,
} from '../styles';
import { createPostBtnClicked } from './postSlice';
import {
	initialStateOfPostForm,
	newPostFormReducer,
	ACTIONS,
} from './reducer/newPostFormReducer';
import { useAuthentication } from '../authentication/authenticationSlice';

export const ComposePostForm = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef();
	const dispatch = useDispatch();
	const [formState, formDispatch] = useReducer(
		newPostFormReducer,
		initialStateOfPostForm,
	);
	const {
		authentication: { userName },
	} = useAuthentication();

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
				caption: formState.caption,
				content: formState.content,
			};
			dispatch(createPostBtnClicked({ post: newPostDetails }));
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
				variant='iconBtn'
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