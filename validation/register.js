const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	if (!Validator.isLength(data.name, {min: 2, max: 30})) {
		errors.name = 'Имя должно содержать от 2 до 30 символов';
	}
	return {
		errors,
		isValid: isEmpty(errors)
	};
};