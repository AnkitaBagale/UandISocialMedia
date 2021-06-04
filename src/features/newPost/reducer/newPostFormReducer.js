export const initialStateOfPostForm = {
	caption: '',
	content: '',
	contentError: '',
};

export const ACTIONS = {
	SET_CAPTION: 'SET_CAPTION',
	SET_CONTENT: 'SET_CONTENT',
	SET_CONTENT_ERROR: 'SET_CONTENT_ERROR',
	CLEAR_ERRORS: 'CLEAR_ERRORS',
	CLEAR_FORM: 'CLEAR_FORM',
};

export const newPostFormReducer = (state, { type, payload }) => {
	const {
		SET_CAPTION,
		SET_CONTENT,
		SET_CONTENT_ERROR,
		CLEAR_ERRORS,
		CLEAR_FORM,
	} = ACTIONS;

	switch (type) {
		case SET_CAPTION: {
			return { ...state, caption: payload.caption };
		}
		case SET_CONTENT: {
			return { ...state, content: payload.content };
		}
		case SET_CONTENT_ERROR: {
			return { ...state, contentError: payload.error };
		}
		case CLEAR_ERRORS: {
			return { ...state, contentError: '' };
		}
		case CLEAR_FORM: {
			return initialStateOfPostForm;
		}
		default:
			throw new Error('Invalid Action');
	}
};
