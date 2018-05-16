import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

class ProfileCreds extends Component {
	render() {
		const {experience, education} = this.props;
		const expItems = experience.map(exp => (
			<li key={exp._id} className='list-group-item'>
				<h4>{exp.company}</h4>
				<p>
					<Moment format='YYYY/MM/DD'>{exp.from}</Moment> -
					{exp.to === null ? ' по НВ.' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
				</p>
				<p><strong>Позиция:</strong> {exp.title}</p>
				{exp.location === '' ? null : (<p><strong>Местоположение: {exp.location}</strong></p>)}
				{exp.description === '' ? null : (<p><strong>Описание: {exp.description}</strong></p>)}
			</li>
		));
		const eduItems = education.map(edu => (
			<li key={edu._id} className='list-group-item'>
				<h4>{edu.school}</h4>
				<p>
					<Moment format='YYYY/MM/DD'>{edu.from}</Moment> -
					{edu.to === null ? ' по НВ.' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
				</p>
				<p><strong>Степень:</strong> {edu.degree}</p>
				<p><strong>Где учишься:</strong> {edu.fieldofstudy}</p>
				{edu.description === '' ? null : (<p><strong>Описание: {edu.description}</strong></p>)}
			</li>
		));
		return (
			<div className='row'>
				<div className="col-md-6">
					<h3 className="text-center text-info">Опыт</h3>
					{expItems.length>0 ? (
						<ul className='list-group'>{expItems}</ul>
					) :
						<p className="text-center">Нет опыта</p>
					}
				</div>
				<div className="col-md-6">
					<h3 className="text-center text-info">Образование</h3>
					{eduItems.length>0 ? (
							<ul className='list-group'>{eduItems}</ul>
						) :
						<p className="text-center">Нет опыта</p>
					}
				</div>
			</div>
		);
	}
}

export default ProfileCreds;
