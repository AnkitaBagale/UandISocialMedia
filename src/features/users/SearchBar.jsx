import { FormControl } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input, InputRightElement } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import { Popover, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import { useRef, useState } from 'react';
import {
	inputRightElementStyle,
	inputRightElementWrapperStyle,
	InputStyle,
} from '../styles';
import { useUsers } from './usersSlice';
import { UserHorizontalCard } from './UserHorizontalCard';

const searchUsers = (users, searchedWord) => {
	if (searchedWord) {
		return users.filter(
			({ userName, name }) =>
				userName.includes(searchedWord) || name.includes(searchedWord),
		);
	}
	return users;
};

export const SearchBar = () => {
	const { onOpen, onClose, isOpen } = useDisclosure();
	const inputSearchRef = useRef(null);
	const { users } = useUsers();

	const [searchedWord, setSearchedWord] = useState('');

	const usersToDisplay = searchUsers(users, searchedWord);
	return (
		<Box pl='1rem'>
			<Popover
				flip={true}
				initialFocusRef={inputSearchRef}
				isOpen={isOpen}
				placement='bottom'
				closeOnBlur={false}>
				<PopoverTrigger>
					<FormControl>
						<Input
							ref={inputSearchRef}
							onClick={onOpen}
							{...InputStyle}
							placeholder='search'
							value={searchedWord}
							onChange={(e) => {
								setSearchedWord(e.target.value);
							}}
						/>
						<InputRightElement {...inputRightElementWrapperStyle}>
							{isOpen ? (
								<Box
									as='button'
									onClick={() => {
										onClose();
										setSearchedWord('');
									}}
									{...inputRightElementStyle}>
									<i className='fas fa-times'></i>
								</Box>
							) : (
								<Box as='button' onClick={onOpen} {...inputRightElementStyle}>
									<i className='fas fa-search'></i>
								</Box>
							)}
						</InputRightElement>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent maxH='80vh' overflowY='auto' pr='1rem' pl='1rem'>
					<Box>
						{usersToDisplay.length === 0 ? (
							<Text color='gray.500'>No user found!</Text>
						) : (
							usersToDisplay.map((user) => (
								<Box
									w='100%'
									key={user._id}
									as='button'
									textAlign='left'
									onClick={onClose}>
									<UserHorizontalCard userDetails={user} />
								</Box>
							))
						)}
					</Box>
				</PopoverContent>
			</Popover>
		</Box>
	);
};
