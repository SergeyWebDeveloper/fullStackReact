import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {loginUser} from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {}
	};

	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			this.props.history.push('/dashboard');
		}
	}

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
								<TextFieldGroup
									type="email"
									placeholder="Email адрес"
									name="email"
									onChange={this.onChange}
									value={this.state.email}
									error={errors.email}
								/>
								<TextFieldGroup
									type="password"
									placeholder="Пароль"
									name="password"
									onChange={this.onChange}
									value={this.state.password}
									error={errors.password}
								/>
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
