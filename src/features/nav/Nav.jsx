import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/layout';
import { useAuthentication } from '../authentication/authenticationSlice';
import { SearchBar } from '../users/SearchBar';
import { DesktopNav } from './DesktopNav';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { iconWrapperStyle, navWrapperStyle } from '../styles';

export const Nav = () => {
	const { isOpen, onToggle } = useDisclosure();
	const {
		authentication: { token },
	} = useAuthentication();
	return (
		token && (
			<Box position='fixed' width='100%' top='0' zIndex={3}>
				<Flex {...navWrapperStyle}>
					<Flex alignItems='center'>
						<Flex {...iconWrapperStyle}>
							<IconButton
								onClick={onToggle}
								icon={<HamburgerIcon w={6} h={6} />}
								variant={'ghost'}
								aria-label={'Toggle Navigation'}
							/>
						</Flex>
						<Flex display={{ base: 'none', md: 'flex' }}>
							<Logo />
						</Flex>
					</Flex>

					<SearchBar />

					<DesktopNav />
				</Flex>

				<MobileNav isOpen={isOpen} onToggle={onToggle} />
			</Box>
		)
	);
};
