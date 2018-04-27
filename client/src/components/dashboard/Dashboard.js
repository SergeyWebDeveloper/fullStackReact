import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCurrentProfile} from '../../actions/profileAction';

import Spinner from '../common/Spinner';

class Dashboard extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	}

	render() {
		const {user} = this.props.auth;
		const {profile, loading} = this.props.profile;
		let dashboardConent;
		if (profile === null || loading) {
			dashboardConent = <Spinner/>
		} else {
			//check have user profile
			if (Object.keys(profile).length > 0) {
				dashboardConent = <h4>Список профилей.</h4>
			} else {
				dashboardConent = (
					<div>
						<p className="lead text-muted">Добро пожаловать {user.name}</p>
						<p>К сожалению, Вы пока не имеете профиля. <br/>
							Пожалуйста, добавьте информацию о себе</p>
						<Link
							to='/create-profile'
							className='btn btn-lg btn-info'>Создать профиль</Link>
					</div>
				)
			}
		}
		return (
			<div className='dashboard'>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1 className="display-4">Стена профилей</h1>
							{dashboardConent}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);