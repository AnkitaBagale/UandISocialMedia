import { Box, Flex } from '@chakra-ui/layout';
import { useAuthentication } from '../authentication/authenticationSlice';
import { SearchBar } from '../users/SearchBar';
import { DesktopNav } from './DesktopNav';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { navWrapperStyle } from '../styles';

export const Nav = () => {
	const {
		authentication: { token },
	} = useAuthentication();
	return (
		token && (
			<Box position='fixed' width='100%' top='0' zIndex={3}>
				<Flex {...navWrapperStyle}>
					<Logo />
					<SearchBar />
					<DesktopNav />
				</Flex>
				<MobileNav />
			</Box>
		)
	);
};
