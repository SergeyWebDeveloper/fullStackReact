import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import {addExperience} from '../../actions/profileAction';


class AddExperience extends Component {
	state = {
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
		errors: {},
		disabled: false
	};

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({errors: nextProps.errors})
		}
	}

	onSubmit = (e) => {
		e.preventDefault();
		const expData = {
			company: this.state.company,
			title: this.state.title,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			description: this.state.description,
			current: this.state.current
		};
		this.props.addExperience(expData,this.props.history);
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onCheck = () => {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	};

	render() {
		console.log('add-experience', this.props);
		const {errors} = this.state;

		return (
			<div className='add-experience'>
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to='/dashboard' className='btn btn-light'>Назад</Link>
							<h1 className="display-4 text-center">Опыт работы</h1>
							<small className="d-block pb3">* Обязательные поля</small>
							<form
								onSubmit={this.onSubmit}
							>
								<TextFieldGroup
									placeholder='* Компания'
									name='company'
									value={this.state.company}
									onChange={this.onChange}
									error={errors.company}
								/>
								<TextFieldGroup
									placeholder='* Описание'
									name='title'
									value={this.state.title}
									onChange={this.onChange}
									error={errors.title}
								/>
								<TextFieldGroup
									placeholder='Местоположение'
									name='location'
									value={this.state.location}
									onChange={this.onChange}
									error={errors.location}
								/>
								<h6>С какой даты:</h6>
								<TextFieldGroup
									placeholder='с какого числа'
									name='from'
									type='date'
									value={this.state.from}
									onChange={this.onChange}
									error={errors.from}
								/>
								<h6>По какую дату: </h6>
								<TextFieldGroup
									placeholder='по какое'
									type='date'
									name='to'
									value={this.state.to}
									onChange={this.onChange}
									error={errors.to}
									disabled={this.state.disabled ? 'disabled' : ''}
								/>
								<div className="form-check mb-4">
									<input
										type="checkbox"
										className='form-check-input'
										value={this.state.current}
										name='current'
										checked={this.state.current}
										onChange={this.onCheck}
										id='current'
									/>
									<label
										htmlFor="current"
										className="form-check-label"
									>Текущее место работы</label>
								</div>
								<TextAreaFieldGroup
									placeholder='Описание работы'
									name='description'
									value={this.state.description}
									onChange={this.onChange}
									error={errors.description}
									info='Расскажите поподробнее чем вы занимаетесь'
								/>
								<input
									type="submit"
									value='Отправить'
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

AddExperience.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps,{addExperience})(withRouter(AddExperience));
