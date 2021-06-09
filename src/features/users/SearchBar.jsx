import { FormControl } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input, InputRightElement } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import {
	Popover,
	PopoverArrow,
	PopoverContent,
	PopoverTrigger,
} from '@chakra-ui/popover';
import { useRef, useState } from 'react';
import {
	inputRightElementStyle,
	inputRightElementWrapperStyle,
	InputStyle,
} from '../utils';
import { useUsers } from './usersSlice';
import { searchUsers } from './searchUsers';
import { UserHorizontalCard } from './UserHorizontalCard';

export const SearchBar = () => {
	const { onOpen, onToggle, isOpen } = useDisclosure();
	const inputSearchRef = useRef(null);
	const { users } = useUsers();

	const [searchedWord, setSearchedWord] = useState('');

	const usersToDisplay = searchUsers(users, searchedWord);
	return (
		<Box ml='1rem'>
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
							<Box as='button' onClick={onToggle} {...inputRightElementStyle}>
								{isOpen ? (
									<i className='fas fa-times'></i>
								) : (
									<i className='fas fa-search'></i>
								)}
							</Box>
						</InputRightElement>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent maxH='80vh' overflowY='auto' pr='1rem' pl='1rem'>
					<PopoverArrow />
					<Box>
						{usersToDisplay.length === 0 ? (
							<Text color='gray.500'>No user found!</Text>
						) : (
							usersToDisplay.map((user) => (
								<UserHorizontalCard key={user._id} userDetails={user} />
							))
						)}
					</Box>
				</PopoverContent>
			</Popover>
		</Box>
	);
};