export const colors = {
	pink: {
		900: '#e63961',
		800: '#ff3f6c',
		700: '#FF6589',
		400: 'rgb(234, 234, 236,0.6)',
		300: '#ffd9e2',
		100: '#fff7f9',
	},
	gray: {
		900: '#282c3f',
		800: '#3f4049',
		700: '#696b79',
		600: '#d8d8da',
		500: '#8c8c92',
		400: '#eaeaec',
		300: '#f5f5f6',
		100: 'white',
	},
	violet: {
		900: '#282c3f',
		300: '#a7a7a7',
	},
};

export const fonts = {
	heading: 'Roboto',
	body: 'Roboto',
};

export const Button = {
	baseStyle: {
		py: '0.5rem',
		minW: 10,
		borderRadius: 'md',
		fontWeight: 'normal',
		_focus: {
			boxShadow: '0 0 0 2px black',
		},
	},
	variants: {
		solidPrimary: {
			height: 'auto',
			px: '1.5rem',
			color: 'gray.100',
			bg: 'pink.700',
			_hover: { bg: 'pink.900' },
			_active: {
				bg: 'pink.900',
				transform: 'scale(0.98)',
				borderColor: 'pink.900',
			},
		},
		outlineSecondary: {
			color: 'gray.800',
			border: '1px solid',
			px: '1.5rem',
			height: 'auto',
			borderColor: 'gray.600',
			_hover: { bg: 'gray.600', color: 'gray.900' },
			_active: {
				bg: 'gray.600',
				transform: 'scale(0.98)',
				borderColor: 'gray.600',
				color: 'gray.900',
			},
		},
		blockPrimary: {
			w: '100%',
			d: 'block',
			height: 'auto',
			px: '1.5rem',
			color: 'gray.100',
			bg: 'pink.700',
			_hover: { bg: 'pink.900' },
			_active: {
				bg: 'pink.900',
				transform: 'scale(0.98)',
				borderColor: 'pink.900',
			},
		},
		blockOutline: {
			d: 'block',
			w: '100%',
			border: '1px solid',
			color: 'pink.800',
			borderColor: 'pink.700',
			borderRadius: 'base',
			_hover: { bg: 'pink.800', color: 'white' },
			_active: {
				bg: 'pink.800',
				color: 'white',
				transform: 'scale(0.98)',
			},
		},
		footerExternalLink: {
			mt: '1rem',
			mb: '1rem',
			as: 'a',
			target: '_blank',
			fontSize: '1.5rem',
			width: '1.5rem',
			height: '1.5rem',
			_hover: {
				color: 'pink.900',
				bg: 'transparent',
			},
			_active: {
				color: 'pink.900',
				bg: 'transparent',
			},
		},
		actionBtnIcon: {
			minW: '1.2rem',
			h: '1.2rem',
			my: '0.5rem',
			color: 'gray.500',
		},
		iconBtn: {
			as: 'span',
			minW: '1.5rem',
			color: 'gray.700',
			height: '1.5rem',
			_hover: {
				color: 'pink.900',
			},
			_active: {
				color: 'pink.900',
			},
		},
	},
};

export const components = { Button };
