const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
	let errors = {};

	data.handle = !isEmpty(data.handle) ? data.handle : '';
	data.status = !isEmpty(data.status) ? data.status : '';
	data.skills = !isEmpty(data.skills) ? data.skills : '';

	if (!Validator.isLength(data.handle, {min: 2, max: 40})) {
		errors.handle = 'Должно содержаться от 2 до 40 символов';
	}

	if (Validator.isEmpty(data.handle)) {
		errors.handle = 'Поле профиля обязательно';
	}

	if (Validator.isEmpty(data.status)) {
		errors.status = 'Поле статуса обязательно';
	}

	if (Validator.isEmpty(data.skills)) {
		errors.skills = 'Поле навыков обязательно';
	}

	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = 'URL не валидный';
		}
	}

	if (!isEmpty(data.youtube)) {
		if (!Validator.isURL(data.youtube)) {
			errors.youtube = 'URL не валидный';
		}
	}

	if (!isEmpty(data.twitter)) {
		if (!Validator.isURL(data.twitter)) {
			errors.twitter = 'URL не валидный';
		}
	}

	if (!isEmpty(data.facebook)) {
		if (!Validator.isURL(data.facebook)) {
			errors.facebook = 'URL не валидный';
		}
	}

	if (!isEmpty(data.linkedin)) {
		if (!Validator.isURL(data.linkedin)) {
			errors.linkedin = 'URL не валидный';
		}
	}

	if (!isEmpty(data.instagram)) {
		if (!Validator.isURL(data.instagram)) {
			errors.instagram = 'URL не валидный';
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};