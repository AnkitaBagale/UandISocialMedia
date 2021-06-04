export const btnStyles = {
	px: '1.5rem',
	py: '0.5rem',
	borderRadius: 'md',
	height: 'auto',
	fontWeight: 'normal',
	_focus: {
		boxShadow: '0 0 0 2px black',
	},
};

export const solidPrimaryButtonStyle = {
	color: 'gray.100',
	bg: 'pink.800',
	_hover: { bg: 'pink.900' },
	_active: {
		bg: 'pink.900',
		transform: 'scale(0.98)',
		borderColor: 'pink.900',
	},
};

export const outlineSecondaryButtonStyle = {
	color: 'gray.800',
	border: '1px solid',
	borderColor: 'gray.600',
	_hover: { bg: 'gray.600', color: 'gray.900' },
	_active: {
		bg: 'gray.600',
		transform: 'scale(0.98)',
		borderColor: 'gray.600',
		color: 'gray.900',
	},
};
