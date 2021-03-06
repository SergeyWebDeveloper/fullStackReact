import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {deletePost, addLike, removeLike} from '../../actions/postActions';

class PostItem extends Component {

	onDeleteClick = id => {
		this.props.deletePost(id);
	};

	onLikeClick = id => {
		this.props.addLike(id);
	};

	onUnlikeClick = id => {
		this.props.removeLike(id);
	};

	findUserLike(likes) {
		const {auth} = this.props;
		if (likes.filter(like => like.user === auth.user.id).length > 0) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		const {post, auth, showAction} = this.props;
		return (
			<div className="card card-body mb-3">
				<div className="row">
					<div className="col-md-2">
						<img
							className="rounded-circle d-none d-md-block"
							src={post.avatar}
							alt={post.name}
						/>
						<br/>
						<p className="text-center">{post.name}</p>
					</div>
					<div className="col-md-10">
						<p className="lead">{post.text}</p>
						{showAction ? (<div>
							<button
								type="button"
								className="btn btn-light mr-1"
								onClick={this.onLikeClick.bind(null, post._id)}
							>
								<i className={classnames('fas fa-thumbs-up', {
									'text-info': this.findUserLike(post.likes)
								})}/>
								<span className="badge badge-light">{post.likes.length}</span>
							</button>
							<button
								type="button"
								className="btn btn-light mr-1"
								onClick={this.onUnlikeClick.bind(null, post._id)}
							>
								<i className="text-secondary fas fa-thumbs-down"/>
							</button>
							<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
								Комментарии
							</Link>
							{post.user === auth.user.id ? (
								<button
									className='btn btn-danger mr-1'
									type='button'
									onClick={this.onDeleteClick.bind(null, post._id)}
								>
									<i className="fas fa-times"/>
								</button>) : null}
						</div>) : null}
					</div>
				</div>
			</div>
		);
	}
}

PostItem.defaultProps = {
	showAction: true
};

PostItem.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	showAction: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);
