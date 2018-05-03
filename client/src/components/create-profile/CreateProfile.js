import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateProfile extends Component {
	state = {
		displaySocialInputs: false,
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: '',
		errors: {}
	};

	render() {
		return (
			<div className='create-profile'>
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Создать профиль</h1>
							<p className='lead text center'>
								Введите всю необходимую информацию
							</p>
							<small className='d-block pb-3'>* = обязательные поля</small>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps,null)(CreateProfile);