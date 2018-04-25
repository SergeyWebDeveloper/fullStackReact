import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {loginUser} from '../../actions/authAction';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {}
	};

	componentWillReceiveProps(nextProps){
		if(nextProps.auth.isAuthenticated){
			this.props.history.push('/dashboard');
		}
		if(nextProps.errors){
			this.setState({
				errors: nextProps.errors
			})
		}
	}

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password,
		};
		this.props.loginUser(userData);
	};

	render() {
		const {errors} = this.state;
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Логин</h1>
							<p className="lead text-center">Войти в аккаунт</p>
							<form noValidate onSubmit={this.onSubmit}>
								<div className="form-group">
									<input
										type="email"
										className={classnames('form-control form-control-lg',{
											'is-invalid': errors.email
										})}
										placeholder="Email адрес"
										name="email"
										onChange={this.onChange}
										value={this.state.email}
									/>
									{errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
								</div>
								<div className="form-group">
									<input
										type="password"
										className={classnames('form-control form-control-lg',{
											'is-invalid': errors.password
										})}
										placeholder="Пароль"
										name="password"
										onChange={this.onChange}
										value={this.state.password}
									/>
									{errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
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

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (store) => ({
	auth: store.auth,
	errors: store.errors
});

export default connect(mapStateToProps,{loginUser})(Login);