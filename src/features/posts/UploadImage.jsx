import { useDropzone } from 'react-dropzone';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	Text,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Box,
	IconButton,
} from '@chakra-ui/react';
import { uploadImageWrapperStyle } from '../styles/uploadImageStyles';
import { CLOUDINARY_PRESET, CLOUDINARY_URL } from '../utils/constants';

export const UploadImage = ({ setToken, setMedia, iconClass }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const onDrop = async (acceptedFiles) => {
		const formData = new FormData();
		const file = acceptedFiles[0];
		formData.append('file', file);
		formData.append('upload_preset', CLOUDINARY_PRESET);
		const response = await fetch(`${CLOUDINARY_URL}/image/upload`, {
			method: 'POST',
			body: formData,
		});
		const res = await response.json();
		setToken(res.delete_token);
		setMedia({ fileName: res.original_filename, url: res.url });
		onClose();
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		accept: 'image/jpeg, image/png, image/gif, image/jpg',
		maxSize: 1e7,
	});

	return (
		<>
			<IconButton
				variant='actionBtnIcon'
				onClick={onOpen}
				icon={<i className={`${iconClass} icon-btn-nav-item`}></i>}
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent mx='1rem'>
					<ModalCloseButton top='0.25rem' left='1rem' size='lg' />
					<ModalBody
						pb={0}
						mt='3rem'
						borderTop='1px solid'
						borderColor='gray.600'>
						<div {...getRootProps()}>
							<input {...getInputProps()} />

							<Box {...uploadImageWrapperStyle}>
								{isDragActive ? (
									<Text as='span' color='gray.500'>
										Drag the files here...
									</Text>
								) : (
									<Text as='span' color='gray.500'>
										Drag 'n' drop some files here, or click to select files
									</Text>
								)}
							</Box>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
