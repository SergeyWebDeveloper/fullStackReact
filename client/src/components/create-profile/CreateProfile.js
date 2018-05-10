import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile} from '../../actions/profileAction';

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

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	};

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({errors: nextProps.errors})
		}
	}

	onSubmit = (e) => {
		e.preventDefault();
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			githubusername: this.state.githubusername,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		};
		this.props.createProfile(profileData,this.props.history);
	};

	showAndHideSocialIcons = () => {
		this.setState(prevState => ({
			displaySocialInputs: !prevState.displaySocialInputs
		}))
	};

	render() {
		const {errors,displaySocialInputs} = this.state;
		let socialInputs;
		if(displaySocialInputs){
			socialInputs=(
				<div>
					<InputGroup
						placeholder='Twitter Url'
						name='twitter'
						value={this.state.twitter}
						onChange={this.onChange}
						icon='fab fa-twitter'
						error={errors.twitter}
					/>

					<InputGroup
						placeholder='Facebook Url'
						name='facebook'
						value={this.state.facebook}
						onChange={this.onChange}
						icon='fab fa-facebook'
						error={errors.facebook}
					/>

					<InputGroup
						placeholder='LinkedIn Url'
						name='linkedin'
						value={this.state.linkedin}
						onChange={this.onChange}
						icon='fab fa-linkedin'
						error={errors.linkedin}
					/>

					<InputGroup
						placeholder='Youtube Url'
						name='youtube'
						value={this.state.youtube}
						onChange={this.onChange}
						icon='fab fa-youtube'
						error={errors.youtube}
					/>

					<InputGroup
						placeholder='Instagram Url'
						name='instagram'
						value={this.state.instagram}
						onChange={this.onChange}
						icon='fab fa-instagram'
						error={errors.instagram}
					/>
				</div>
			)
		}
		const options = [
			{label: 'Выберите профессию', value: 0},
			{label: 'Developer', value: 'Developer'},
			{label: 'Junior Developer', value: 'Junior Developer'},
			{label: 'Senior Developer', value: 'Senior Developer'},
			{label: 'Manager', value: 'Manager'},
			{label: 'Student', value: 'Student'},
			{label: 'Instructor', value: 'Instructor'},
			{label: 'Intern', value: 'Intern'},
			{label: 'Other', value: 'Other'}
		];
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
							<form
								onSubmit={this.onSubmit}
							>
								<TextFieldGroup
									placeholder='*Поле обязательно для заполнения'
									name='handle'
									value={this.state.handle}
									onChange={this.onChange}
									error={errors.handle}
									info='Уникальные данные для Вашего профиля'
								/>
								<SelectListGroup
									name='status'
									value={this.state.status}
									onChange={this.onChange}
									error={errors.status}
									options={options}
									info='Ваша карьера'
								/>
								<TextFieldGroup
									placeholder='Компания'
									name='company'
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
									info='Укажите Вашу компанию'
								/>
								<TextFieldGroup
									placeholder='Веб-сайт'
									name='website'
									value={this.state.website}
									onChange={this.onChange}
									error={errors.website}
									info='Введите URL Вашего сайта'
								/>
								<TextFieldGroup
									placeholder='Местоположение'
									name='location'
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
									info='Введите Ваш город'
								/>
								<TextFieldGroup
									placeholder='*Ваши навыки'
									name='skills'
									value={this.state.skills}
									onChange={this.onChange}
									error={errors.skills}
									info='Укажите Ваши навыки через запятую (HTML,CSS,JS,PHP)'
								/>
								<TextFieldGroup
									placeholder='Github-username'
									name='githubusername'
									value={this.state.githubusername}
									onChange={this.onChange}
									error={errors.githubusername}
									info='Если вы хотите просмотреть последние 5 репозиториев, оставьте username'
								/>
								<TextAreaFieldGroup
									placeholder='Короткая биография'
									name='bio'
									value={this.state.bio}
									onChange={this.onChange}
									error={errors.bio}
									info='Расскажите немного о себе'
								/>
								<div className="mb-3">
									<button
										type='button'
										className="btn btn-light"
										onClick={this.showAndHideSocialIcons}
									>
										Добавить социальные сети
									</button>
									<span className="text-muted">Опционально</span>
								</div>
								{socialInputs}
								<input
									type='submit'
									value='Submit'
									className='btn btn-info btn-block mt-4'
								/>
							</form>
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

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));