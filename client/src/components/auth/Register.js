import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {}
	};

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		this.props.registerUser(newUser,this.props.history);
	};

	render() {
		const {errors} = this.state;
		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Регистрация</h1>
							<p className="lead text-center">Создание аккаунта</p>
							<form noValidate onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="text"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.name
										})}
										placeholder="Имя"
										name="name"
										value={this.state.name}
										onChange={this.onChange}
									/>
									{errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
								</div>
								<div className="form-group">
									<input
										type="email"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.email
										})}
										placeholder="Email"
										name="email"
										value={this.state.email}
										onChange={this.onChange}
									/>
									<small className="form-text text-muted">На сайте используется граватар-Email</small>
									{errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
								</div>
								<div className="form-group">
									<input
										type="password"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.password
										})}
										placeholder="Пароль"
										name="password"
										value={this.state.password}
										onChange={this.onChange}
									/>
									{errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
								</div>
								<div className="form-group">
									<input
										type="password"
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.password2
										})}
										placeholder="Подтверждение пароля"
										value={this.state.password2}
										name="password2"
										onChange={this.onChange}
									/>
									{errors.password2 && (<div className='invalid-feedback'>{errors.password2}</div>)}
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

Register.proptypes = {
	registerUser: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {registerUser})(withRouter(Register));
