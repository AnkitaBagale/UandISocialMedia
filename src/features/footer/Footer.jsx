import { ButtonGroup, IconButton } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';
import { socialShareIcons } from './socialShareIcons';
import {
	buttonGroupStyle,
	copyRightTextStyle,
	footerWrapperStyle,
	iconStyle,
} from './footerStyles';
import { useAuthentication } from '../authentication/authenticationSlice';

export const Footer = () => {
	const {
		authentication: { token },
	} = useAuthentication();
	return (
		token && (
			<>
				<Box textAlign='center' as='footer' {...footerWrapperStyle}>
					<Text fontSize='1rem' letterSpacing='0.5px'>
						Made with{' '}
						<Text as='span' color='pink.800'>
							&lt;/&gt;
						</Text>{' '}
						by Ankita Bagale
					</Text>
					<ButtonGroup {...buttonGroupStyle}>
						{socialShareIcons.map(({ className, link, name }) => (
							<IconButton
								as='a'
								key={className}
								href={link}
								aria-label={name}
								{...iconStyle}
								icon={<i className={className}></i>}
							/>
						))}
					</ButtonGroup>

					<Text {...copyRightTextStyle}>
						© 2021 U
						<Text as='span' color='pink.800' fontSize='0.75rem'>
							&
						</Text>
						I Designs
					</Text>
				</Box>
			</>
		)
	);
};
