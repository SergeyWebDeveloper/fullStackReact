import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
	render() {
		const {profile} = this.props;
		const firstName = profile.user.name.trim().split(' ')[0];
		const skills = profile.skills.map((skill)=>(
			<div key={skill} className='p-3'>
				<i className="fa fa-check" /> {skill}
			</div>
		));

		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-light mb-3">
						<h3 className="text-center text-info">{firstName} биография</h3>
						{isEmpty(profile.bio) ? <span>{firstName} не имеет биографии.</span> : (<p className="lead">{profile.bio}</p>)}
						<hr />
						<h3 className="text-center text-info">Навыки:</h3>
						<div className="row">
							<div className="d-flex flex-wrap justify-content-center align-items-center">
								{skills}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

ProfileAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileAbout;