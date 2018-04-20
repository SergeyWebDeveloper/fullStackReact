const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};
	data.name=!isEmpty(data.name) ? data.name : '';
	data.email=!isEmpty(data.email) ? data.email : '';
	data.password=!isEmpty(data.password) ? data.password : '';
	data.password2=!isEmpty(data.password2) ? data.password2 : '';

	if (!Validator.isLength(data.name, {min: 2, max: 30})) {
		errors.name = 'Имя должно содержать от 2 до 30 символов';
	}

	if(Validator.isEmpty(data.name)){
		errors.name='Поле Name не может быть пустым';
	}

	if(Validator.isEmpty(data.email)){
		errors.email='Поле Email не может быть пустым';
	}

	if(!Validator.isEmail(data.email)){
		errors.email='Поле Email некорректно';
	}

	if(Validator.isEmpty(data.password)){
		errors.password='Поле Password не может быть пустым';
	}

	if(!Validator.isLength(data.password,{min: 6, max: 30})){
		errors.password='Поле Password должно содержать от 6 до 30 символов';
	}

	if(Validator.isEmpty(data.password2)){
		errors.password2='Поле Password не может быть пустым';
	}

	if(!Validator.equals(data.password,data.password2)){
		errors.password2='Пароли не совпадают';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};