const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
	let errors = {};

	data.email=!isEmpty(data.email) ? data.email : '';
	data.password=!isEmpty(data.password) ? data.password : '';


	if(!Validator.isEmail(data.email)){
		errors.email='Поле Email некорректно';
	}

	if(Validator.isEmpty(data.password)){
		errors.password='Поле Password не может быть пустым';
	}

	if(Validator.isEmpty(data.email)){
		errors.email='Поле Email не может быть пустым';
	}


	return {
		errors,
		isValid: isEmpty(errors)
	};
};