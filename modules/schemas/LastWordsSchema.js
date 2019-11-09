import * as yup from 'yup';

const LastWordsSchema = yup.object().shape({
	lastWords: yup.string()
		.required('Please enter your last words')
});

export default LastWordsSchema