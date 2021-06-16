import { useState } from 'react';
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
	Box,
	FormLabel,
	Textarea,
	Avatar,
	AvatarBadge,
} from '@chakra-ui/react';
import {
	inputWrapperStyle,
	labelStyle,
	InputStyle,
	mdAvatarStyle,
} from '../styles';
import { updateProfileBtnClicked, useProfile } from './profileSlice';
import { UploadImage } from '../posts/UploadImage';
import { useDispatch } from 'react-redux';
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from '../utils/constants';

export const UpdateProfileForm = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		profileDetails: { bio, link, name, userName, avatar: profileAvatar },
	} = useProfile();

	const [inputBio, setBio] = useState(bio);
	const [inputLink, setLink] = useState(link);
	const intialMedia = {
		fileName: 'avatar',
		url: profileAvatar,
	};
	const [media, setMedia] = useState(intialMedia);
	const [deleteToken, setToken] = useState('');

	const dispatch = useDispatch();

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
			setMedia(intialMedia);
		} catch (error) {
			console.log(error);
			setToken('');
			setMedia(intialMedia);
		}
	};

	const updateProfile = async () => {
		try {
			const dispatchResponse = await dispatch(
				updateProfileBtnClicked({
					userName,
					inputBio,
					inputLink,
					avatar: media.url,
				}),
			);
			if (dispatchResponse.meta.requestStatus === 'fulfilled') {
				onClose();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const clearUpdates = async () => {
		if (deleteToken) {
			await deleteImage();
		}
		setBio(bio);
		setLink(link);
	};

	return (
		<>
			<Button variant='outlineSecondary' onClick={onOpen}>
				Edit Profile
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent mx='1rem'>
					<ModalCloseButton
						top='0.25rem'
						left='1rem'
						size='lg'
						onClick={clearUpdates}
					/>

					<ModalBody
						pb={0}
						mt='3rem'
						borderTop='1px solid'
						borderColor='gray.600'>
						<Box w='100%' mt='1rem'>
							<Box {...inputWrapperStyle}>
								<FormLabel {...labelStyle}>Avatar</FormLabel>
								<Box w='100%'>
									<Avatar {...mdAvatarStyle} name={userName} src={media?.url}>
										<AvatarBadge border='none'>
											<UploadImage
												iconClass='fas fa-camera'
												setMedia={setMedia}
												setToken={setToken}
											/>
										</AvatarBadge>
									</Avatar>
								</Box>
							</Box>

							<FormControl id='name' {...inputWrapperStyle}>
								<FormLabel {...labelStyle}>Name</FormLabel>
								<Box w='100%'>
									<Input
										type='text'
										variant='unstyled'
										{...InputStyle}
										value={name}
										isReadOnly
									/>
								</Box>
							</FormControl>
							<FormControl id='username' {...inputWrapperStyle}>
								<FormLabel {...labelStyle}>Username</FormLabel>
								<Box w='100%'>
									<Input
										variant='unstyled'
										type='text'
										{...InputStyle}
										value={userName}
										isReadOnly
									/>
								</Box>
							</FormControl>
							<FormControl id='website' {...inputWrapperStyle}>
								<FormLabel {...labelStyle}>Website</FormLabel>
								<Box w='100%'>
									<Input
										type='text'
										{...InputStyle}
										value={inputLink}
										onChange={(e) => setLink(e.target.value)}
										placeholder='Website'
									/>
								</Box>
							</FormControl>
							<FormControl id='bio' {...inputWrapperStyle}>
								<FormLabel {...labelStyle}>Bio</FormLabel>
								<Box w='100%'>
									<Textarea
										type='text'
										{...InputStyle}
										value={inputBio}
										onChange={(e) => setBio(e.target.value)}
										placeholder='Write something about you..'
									/>
								</Box>
							</FormControl>
						</Box>
					</ModalBody>

					<ModalFooter>
						<Button onClick={updateProfile} variant='solidPrimary'>
							Update
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
