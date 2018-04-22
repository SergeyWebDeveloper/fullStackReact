const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
	let errors = {};

	data.school = !isEmpty(data.school) ? data.school : '';
	data.degree = !isEmpty(data.degree) ? data.degree : '';
	data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
	data.from = !isEmpty(data.from) ? data.from : '';

	if (Validator.isEmpty(data.school)) {
		errors.school = 'Поле школы обязательно для заполнения';
	}

	if (Validator.isEmpty(data.degree)) {
		errors.degree = 'Поле обязательно к заполнению';
	}

	if (Validator.isEmpty(data.fieldofstudy)) {
		errors.fieldofstudy = 'Поле обязательно к заполнению';
	}

	if (Validator.isEmpty(data.from)) {
		errors.from = 'Поле обязательно к заполнению';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};