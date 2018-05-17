import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addPost} from '../../actions/postActions';

class PostForm extends Component {
	state = {
		text: '',
		errors: {}
	};


	componentWillReceiveProps(nextProps) {
		if(nextProps.errors){
			this.setState({errors: nextProps.errors})
		}
	}


	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	};

	onSubmit = (e) => {
		e.preventDefault();
		const {user} = this.props.auth;
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};
		this.props.addPost(newPost);
		this.setState({
			text: '',
			errors: {}
		});
	};

	render() {
		const {errors} = this.state;
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">
						Что-то написать...
					</div>
					<div className="card-body">
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<TextAreaFieldGroup
									name='text'
									value={this.state.text}
									onChange={this.onChange}
									error={errors.text}
									placeholder='Создать пост'
								/>
							</div>
							<button type="submit" className="btn btn-dark">Отправить</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

PostForm.propTypes = {
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth
});

export default connect(mapStateToProps, {addPost})(PostForm);
