import { useRef, useState } from 'react';
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
} from '@chakra-ui/react';
import { inputWrapperStyle, labelStyle, InputStyle } from '../styles';

export const UpdateProfileForm = ({
	userDetails: { bio, link, name, userName },
	updateProfile,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef();
	const [inputBio, setBio] = useState(bio);
	const [inputLink, setLink] = useState(link);

	return (
		<>
			<Button variant='outlineSecondary' onClick={onOpen}>
				Edit Profile
			</Button>
			<Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton top='0.25rem' left='1rem' size='lg' />
					<ModalBody
						pb={0}
						mt='3rem'
						borderTop='1px solid'
						borderColor='gray.600'>
						<Box w='100%' mt='1rem'>
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
										ref={initialRef}
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
						<Button
							onClick={() =>
								updateProfile(userName, inputBio, inputLink, onClose)
							}
							variant='solidPrimary'>
							Update
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
